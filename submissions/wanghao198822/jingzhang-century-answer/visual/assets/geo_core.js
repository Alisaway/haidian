/* geo_core.js — 京张·世纪应答 提交包内置几何核算内核
 * -------------------------------------------------------------------------
 * 用途：在浏览器里、完全离线地，把 geometry/*.geojson 的经纬度坐标投影到
 *       EPSG:4548（CGCS2000 / 3-degree Gauss-Kruger CM 117E），并复算面积、
 *       长度、并集、交集与差集面积。口径与 metrics.json 的生成口径一致：
 *       metrics.json 由 pyproj(EPSG:4326 -> EPSG:4548) + shapely 计算，
 *       本文件用同一投影参数的 Kruger 六阶级数（与 PROJ 的 etmerc 同一族）实现。
 *
 * 无外部依赖、无网络访问、无 DOM 依赖。挂载点：window.CA_geo
 *
 * 精度说明（已实测，见 build-staging/R-展示页矢量化报告.md）：
 *   本实现与 pyproj 在本包全部 172 个几何顶点上的最大坐标偏差 < 1e-6 m。
 *
 * 多边形布尔运算说明：
 *   本包所有面要素均为简单多边形且无内环（洞）。内核先用耳切法把每个多边形
 *   拆成互不重叠的三角形，再用 Sutherland-Hodgman 做「凸多边形裁剪凸多边形」，
 *   最后用容斥原理求并集面积。三角形是凸的，因此每一步裁剪都是精确的；
 *   同一多边形的三角形互不重叠，因此交集可以按三角形组合逐项求和。
 *   若遇到带洞多边形，内核会抛出异常而不是给出错误结果。
 */
(function (root) {
  "use strict";

  /* ---------- 1. 投影：EPSG:4326 -> EPSG:4548 ---------- */
  /* CGCS2000 椭球 (= GRS80): a = 6378137, 1/f = 298.257222101
   * 投影：横轴墨卡托，中央经线 117E，k0 = 1，东偏 500000，北偏 0 */
  var ELL_A = 6378137.0;
  var ELL_INV_F = 298.257222101;
  var LON0 = 117.0;
  var K0 = 1.0;
  var FALSE_E = 500000.0;
  var FALSE_N = 0.0;

  var F = 1.0 / ELL_INV_F;
  var N = F / (2.0 - F);

  /* 子午线弧长半径 A（Kruger 级数到 n^6） */
  var RECT_A =
    (ELL_A / (1 + N)) *
    (1 +
      Math.pow(N, 2) / 4 +
      Math.pow(N, 4) / 64 +
      Math.pow(N, 6) / 256);

  /* alpha 系数（Kruger 正解，六阶） */
  var ALPHA = [
    N / 2 -
      (2 * N * N) / 3 +
      (5 * Math.pow(N, 3)) / 16 +
      (41 * Math.pow(N, 4)) / 180 -
      (127 * Math.pow(N, 5)) / 288 +
      (7891 * Math.pow(N, 6)) / 37800,
    (13 * Math.pow(N, 2)) / 48 -
      (3 * Math.pow(N, 3)) / 5 +
      (557 * Math.pow(N, 4)) / 1440 +
      (281 * Math.pow(N, 5)) / 630 -
      (1983433 * Math.pow(N, 6)) / 1935360,
    (61 * Math.pow(N, 3)) / 240 -
      (103 * Math.pow(N, 4)) / 140 +
      (15061 * Math.pow(N, 5)) / 26880 +
      (167603 * Math.pow(N, 6)) / 181440,
    (49561 * Math.pow(N, 4)) / 161280 -
      (179 * Math.pow(N, 5)) / 168 +
      (6601661 * Math.pow(N, 6)) / 7257600,
    (34729 * Math.pow(N, 5)) / 80640 -
      (3418889 * Math.pow(N, 6)) / 1995840,
    (212378941 * Math.pow(N, 6)) / 319334400
  ];

  var D2R = Math.PI / 180;
  var TWO_SQRT_N = (2 * Math.sqrt(N)) / (1 + N);

  function atanh(x) {
    return 0.5 * Math.log((1 + x) / (1 - x));
  }

  /* 经纬度（度）-> EPSG:4548 平面坐标（米） */
  function projectLonLat(lon, lat) {
    var phi = lat * D2R;
    var lam = (lon - LON0) * D2R;
    var sinPhi = Math.sin(phi);
    var t = Math.sinh(atanh(sinPhi) - TWO_SQRT_N * atanh(TWO_SQRT_N * sinPhi));
    var xiP = Math.atan2(t, Math.cos(lam));
    var etaP = atanh(Math.sin(lam) / Math.sqrt(1 + t * t));
    var xi = xiP;
    var eta = etaP;
    for (var j = 1; j <= 6; j++) {
      var a = ALPHA[j - 1];
      xi += a * Math.sin(2 * j * xiP) * Math.cosh(2 * j * etaP);
      eta += a * Math.cos(2 * j * xiP) * Math.sinh(2 * j * etaP);
    }
    return [FALSE_E + K0 * RECT_A * eta, FALSE_N + K0 * RECT_A * xi];
  }

  /* ---------- 2. 环 / 多边形基础 ---------- */

  function projectRing(ring) {
    var out = [];
    for (var i = 0; i < ring.length; i++) {
      out.push(projectLonLat(ring[i][0], ring[i][1]));
    }
    return out;
  }

  /* 去掉重复的闭合点，返回开放环 */
  function openRing(ring) {
    var r = ring.slice();
    while (
      r.length > 1 &&
      r[0][0] === r[r.length - 1][0] &&
      r[0][1] === r[r.length - 1][1]
    ) {
      r.pop();
    }
    return r;
  }

  /* 鞋带公式，返回有符号面积（逆时针为正） */
  function signedArea(ring) {
    var r = openRing(ring);
    var s = 0;
    for (var i = 0, n = r.length; i < n; i++) {
      var p = r[i];
      var q = r[(i + 1) % n];
      s += p[0] * q[1] - q[0] * p[1];
    }
    return s / 2;
  }

  function ringArea(ring) {
    return Math.abs(signedArea(ring));
  }

  function bbox(pts) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    for (var i = 0; i < pts.length; i++) {
      if (pts[i][0] < b[0]) b[0] = pts[i][0];
      if (pts[i][1] < b[1]) b[1] = pts[i][1];
      if (pts[i][0] > b[2]) b[2] = pts[i][0];
      if (pts[i][1] > b[3]) b[3] = pts[i][1];
    }
    return b;
  }

  function bboxDisjoint(a, b) {
    return a[2] < b[0] || b[2] < a[0] || a[3] < b[1] || b[3] < a[1];
  }

  /* ---------- 3. 耳切三角化（简单多边形，无洞） ---------- */

  function triangulate(ring) {
    var pts = openRing(ring);
    if (pts.length < 3) return [];
    /* 统一为逆时针 */
    if (signedArea(pts) < 0) pts = pts.slice().reverse();
    var idx = [];
    for (var i = 0; i < pts.length; i++) idx.push(i);

    function cross(o, a, b) {
      return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }
    function pointInTri(p, a, b, c) {
      var d1 = cross(a, b, p);
      var d2 = cross(b, c, p);
      var d3 = cross(c, a, p);
      return d1 >= 0 && d2 >= 0 && d3 >= 0;
    }

    var tris = [];
    var guard = 0;
    while (idx.length > 3 && guard++ < 10000) {
      var clipped = false;
      for (var k = 0; k < idx.length; k++) {
        var i0 = idx[(k + idx.length - 1) % idx.length];
        var i1 = idx[k];
        var i2 = idx[(k + 1) % idx.length];
        var a = pts[i0];
        var b = pts[i1];
        var c = pts[i2];
        if (cross(a, b, c) <= 0) continue; /* 反射角或退化，不是耳 */
        var ok = true;
        for (var m = 0; m < idx.length; m++) {
          var im = idx[m];
          if (im === i0 || im === i1 || im === i2) continue;
          if (pointInTri(pts[im], a, b, c)) {
            ok = false;
            break;
          }
        }
        if (!ok) continue;
        tris.push([a, b, c]);
        idx.splice(k, 1);
        clipped = true;
        break;
      }
      if (!clipped) break; /* 退化多边形，停止 */
    }
    if (idx.length === 3) {
      tris.push([pts[idx[0]], pts[idx[1]], pts[idx[2]]]);
    }
    return tris.filter(function (t) {
      return ringArea(t) > 0;
    });
  }

  /* ---------- 4. Sutherland-Hodgman：凸裁剪凸 ---------- */

  function clipConvex(subject, clip) {
    var out = subject;
    var cl = openRing(clip);
    if (signedArea(cl) < 0) cl = cl.slice().reverse();
    for (var i = 0, n = cl.length; i < n && out.length > 0; i++) {
      var a = cl[i];
      var b = cl[(i + 1) % n];
      var input = out;
      out = [];
      var ex = b[0] - a[0];
      var ey = b[1] - a[1];
      function side(p) {
        return ex * (p[1] - a[1]) - ey * (p[0] - a[0]);
      }
      for (var j = 0; j < input.length; j++) {
        var cur = input[j];
        var prev = input[(j + input.length - 1) % input.length];
        var sc = side(cur);
        var sp = side(prev);
        if (sc >= 0) {
          if (sp < 0) out.push(intersect(prev, cur, a, b));
          out.push(cur);
        } else if (sp >= 0) {
          out.push(intersect(prev, cur, a, b));
        }
      }
    }
    return out;
  }

  function intersect(p1, p2, a, b) {
    var x1 = p1[0],
      y1 = p1[1],
      x2 = p2[0],
      y2 = p2[1];
    var x3 = a[0],
      y3 = a[1],
      x4 = b[0],
      y4 = b[1];
    var den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return [x2, y2];
    var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  }

  /* ---------- 5. 几何 -> 投影后的不重叠凸片集合 ---------- */

  function geomPieces(geometry) {
    var type = geometry && geometry.type;
    var coords = geometry && geometry.coordinates;
    var polys = [];
    if (type === "Polygon") polys = [coords];
    else if (type === "MultiPolygon") polys = coords;
    else return [];
    var pieces = [];
    for (var i = 0; i < polys.length; i++) {
      var rings = polys[i];
      if (rings.length > 1) {
        throw new Error(
          "geo_core: 检测到带内环（洞）的多边形，本内核不支持，拒绝给出可能错误的面积"
        );
      }
      var tris = triangulate(projectRing(rings[0]));
      for (var t = 0; t < tris.length; t++) pieces.push(tris[t]);
    }
    return pieces;
  }

  function piecesArea(pieces) {
    var s = 0;
    for (var i = 0; i < pieces.length; i++) s += ringArea(pieces[i]);
    return s;
  }

  /* 两组互不重叠凸片的交 = 所有配对裁剪结果（仍然互不重叠） */
  function intersectPieces(pa, pb) {
    var out = [];
    for (var i = 0; i < pa.length; i++) {
      var ba = bbox(pa[i]);
      for (var j = 0; j < pb.length; j++) {
        if (bboxDisjoint(ba, bbox(pb[j]))) continue;
        var r = clipConvex(pa[i], pb[j]);
        if (r.length >= 3 && ringArea(r) > 0) out.push(r);
      }
    }
    return out;
  }

  /* 容斥原理求并集面积；空交集剪枝 */
  function unionAreaOfPieceSets(sets) {
    var total = 0;
    function rec(start, accum, sign) {
      total += sign * piecesArea(accum);
      for (var j = start; j < sets.length; j++) {
        var next = intersectPieces(accum, sets[j]);
        if (next.length === 0) continue;
        rec(j + 1, next, -sign);
      }
    }
    for (var i = 0; i < sets.length; i++) rec(i + 1, sets[i], 1);
    return total;
  }

  /* ---------- 6. 对外几何 API ---------- */

  function geomArea(geometry) {
    return piecesArea(geomPieces(geometry));
  }

  function geomLength(geometry) {
    var type = geometry && geometry.type;
    var coords = geometry && geometry.coordinates;
    var lines = [];
    if (type === "LineString") lines = [coords];
    else if (type === "MultiLineString") lines = coords;
    else return 0;
    var total = 0;
    for (var i = 0; i < lines.length; i++) {
      var pr = projectRing(lines[i]);
      for (var j = 1; j < pr.length; j++) {
        var dx = pr[j][0] - pr[j - 1][0];
        var dy = pr[j][1] - pr[j - 1][1];
        total += Math.sqrt(dx * dx + dy * dy);
      }
    }
    return total;
  }

  function unionArea(geometries) {
    var sets = [];
    for (var i = 0; i < geometries.length; i++) {
      var p = geomPieces(geometries[i]);
      if (p.length) sets.push(p);
    }
    if (!sets.length) return 0;
    return unionAreaOfPieceSets(sets);
  }

  function intersectionArea(g1, g2) {
    return piecesArea(intersectPieces(geomPieces(g1), geomPieces(g2)));
  }

  /* area(A 减去 union(B...)) */
  function differenceArea(gA, gBList) {
    var pa = geomPieces(gA);
    var sets = [];
    for (var i = 0; i < gBList.length; i++) {
      var inter = intersectPieces(pa, geomPieces(gBList[i]));
      if (inter.length) sets.push(inter);
    }
    var covered = sets.length ? unionAreaOfPieceSets(sets) : 0;
    return piecesArea(pa) - covered;
  }

  /* ---------- 7. 绘图辅助：经纬度包络与线性映射 ---------- */

  function lonLatBBox(geometries) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    function walk(c) {
      if (!c || !c.length) return;
      if (typeof c[0] === "number") {
        if (c[0] < b[0]) b[0] = c[0];
        if (c[1] < b[1]) b[1] = c[1];
        if (c[0] > b[2]) b[2] = c[0];
        if (c[1] > b[3]) b[3] = c[1];
        return;
      }
      for (var i = 0; i < c.length; i++) walk(c[i]);
    }
    for (var i = 0; i < geometries.length; i++) {
      if (geometries[i]) walk(geometries[i].coordinates);
    }
    return b;
  }

  root.CA_geo = {
    VERSION: "1.0.0",
    CRS_FROM: "EPSG:4326",
    CRS_TO: "EPSG:4548",
    CRS_NOTE:
      "CGCS2000 / 3-degree Gauss-Kruger CM 117E；与 metrics.json 的 pyproj+shapely 口径一致",
    projectLonLat: projectLonLat,
    projectRing: projectRing,
    signedArea: signedArea,
    ringArea: ringArea,
    triangulate: triangulate,
    clipConvex: clipConvex,
    geomPieces: geomPieces,
    geomArea: geomArea,
    geomLength: geomLength,
    unionArea: unionArea,
    intersectionArea: intersectionArea,
    differenceArea: differenceArea,
    lonLatBBox: lonLatBBox
  };

  if (typeof module === "object" && module.exports) module.exports = root.CA_geo;
})(typeof window !== "undefined" ? window : globalThis);
