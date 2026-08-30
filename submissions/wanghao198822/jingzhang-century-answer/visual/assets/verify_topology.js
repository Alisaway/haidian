/* verify_topology.js — 分区图层拓扑核验（覆盖缺口 / 重叠）
 * -------------------------------------------------------------------------
 * 依赖（同目录、本地）：geo_core.js、data/geo_layers.js、data/metrics_snapshot.js
 * 挂载点：window.CA_verifyTopology(options) -> 结构化结果对象（不碰 DOM）
 *
 * 做什么（四件事）：
 *   1. 覆盖缺口：area(site_boundary 减去 union(land_use.features))，
 *      与 metrics.json 的 land_use_coverage_gap_sqm 比对（正文声明 0.398 平方米）。
 *   2. 最大重叠：land_use 全部无序要素对的相交面积取最大值，
 *      与 metrics.json 的 land_use_max_overlap_sqm 比对（正文声明 0.087 平方米）。
 *   3. 覆盖率与要素数，以及 phasing 图层的同口径覆盖缺口。
 *   4. 几何卫生：环闭合、无内环（洞）、无退化、是否越出场地边界。
 *
 * 布尔运算口径见 geo_core.js：耳切三角化 + Sutherland-Hodgman 凸裁剪 + 容斥原理，
 * 对本包这类简单多边形是精确解，不是采样近似。
 * 比对用未取整的复算值直接与登记值相减，容差 1e-3 平方米（登记值保留 3 位小数）。
 */
(function (root) {
  "use strict";

  var VERSION = "1.1.0";

  function verify(options) {
    var opt = options || {};
    var geo = root.CA_geo;
    var data = root.CA_GEO_DATA;
    var snap = root.CA_METRICS_SNAPSHOT;
    var result = {
      script: "verify_topology",
      version: VERSION,
      ok: false,
      run_at: new Date().toISOString(),
      method:
        "耳切三角化 + Sutherland-Hodgman 凸裁剪 + 容斥原理；EPSG:4326 -> EPSG:4548 后计算，与 metrics.json 同口径",
      tolerance_abs: opt.toleranceAbs === undefined ? 1e-3 : opt.toleranceAbs,
      checks: [],
      overlap_pairs: [],
      hygiene: [],
      summary: { total: 0, passed: 0, failed: 0 },
      errors: []
    };
    if (!geo || !data || !snap) {
      result.errors.push("缺少依赖：需要 geo_core.js、data/geo_layers.js、data/metrics_snapshot.js");
      return result;
    }

    var metrics = snap.metrics_json.metrics;
    var lu = data.layers.land_use.features;
    var ph = data.layers.phasing.features;
    var site = data.layers.site_boundary.features[0];

    try {
      var siteArea = geo.unionArea([site.geometry]);

      /* --- 1. 用地覆盖缺口 --- */
      var gap = geo.differenceArea(site.geometry, lu.map(geomOf));
      addCheck(
        result,
        "land_use_coverage_gap_sqm",
        "用地图层未覆盖场地的缺口面积",
        gap,
        numOf(metrics, "land_use_coverage_gap_sqm"),
        "sqm",
        "area(difference(union(site_boundary), union(land_use.features)))"
      );

      /* --- 2. 覆盖率（与 metrics.json 公式同形） --- */
      addCheck(
        result,
        "land_use_coverage_ratio",
        "用地图层对场地的覆盖率",
        (siteArea - gap) / siteArea,
        numOf(metrics, "land_use_coverage_ratio"),
        "ratio",
        "(site_area_sqm - land_use_coverage_gap_sqm) / site_area_sqm",
        1e-9
      );

      /* --- 3. 逐对重叠 --- */
      var maxOverlap = 0;
      for (var i = 0; i < lu.length; i++) {
        for (var j = i + 1; j < lu.length; j++) {
          var a = geo.intersectionArea(lu[i].geometry, lu[j].geometry);
          if (a > 0) {
            result.overlap_pairs.push({ a: lu[i].id, b: lu[j].id, area_sqm: round(a, 6) });
            if (a > maxOverlap) maxOverlap = a;
          }
        }
      }
      result.overlap_pairs.sort(function (x, y) {
        return y.area_sqm - x.area_sqm;
      });
      addCheck(
        result,
        "land_use_max_overlap_sqm",
        "用地要素两两相交的最大面积",
        maxOverlap,
        numOf(metrics, "land_use_max_overlap_sqm"),
        "sqm",
        "max(area(intersection(a, b)) for every unordered pair a,b of land_use.features)"
      );

      /* --- 4. 要素计数 --- */
      addCheck(
        result,
        "land_use_parcel_count",
        "用地要素个数",
        lu.length,
        numOf(metrics, "land_use_parcel_count"),
        "count",
        "count(land_use.features)",
        0
      );

      /* --- 5. 分期图层同口径覆盖缺口 --- */
      addCheck(
        result,
        "phase_coverage_gap_sqm",
        "分期图层未覆盖场地的缺口面积",
        geo.differenceArea(site.geometry, ph.map(geomOf)),
        numOf(metrics, "phase_coverage_gap_sqm"),
        "sqm",
        "area(difference(union(site_boundary), union(phasing.features)))"
      );

      /* --- 6. 几何卫生 --- */
      checkHygiene(result, geo, lu, site, "land_use");
      checkHygiene(result, geo, ph, site, "phasing");
      if (!result.hygiene.length) {
        result.hygiene.push({
          id: "*",
          layer: "land_use + phasing",
          level: "info",
          message:
            lu.length + " 个用地要素、" + ph.length + " 个分期要素：环均闭合、无内环、无退化、未越出场地边界"
        });
      }
    } catch (err) {
      result.errors.push(err && err.message ? err.message : String(err));
    }

    result.summary.total = result.checks.length;
    for (var c = 0; c < result.checks.length; c++) {
      if (result.checks[c].pass) result.summary.passed++;
      else result.summary.failed++;
    }
    var hardHygiene = result.hygiene.filter(function (h) {
      return h.level === "error";
    });
    result.ok = result.summary.failed === 0 && result.errors.length === 0 && hardHygiene.length === 0;
    result.headline =
      "拓扑核验 " +
      result.summary.passed +
      "/" +
      result.summary.total +
      " 项通过；用地重叠要素对 " +
      result.overlap_pairs.length +
      " 组，最大 " +
      (result.overlap_pairs.length ? result.overlap_pairs[0].area_sqm : 0) +
      " 平方米";
    return result;
  }

  function geomOf(f) {
    return f.geometry;
  }

  function round(v, n) {
    var p = Math.pow(10, n);
    return Math.round(v * p) / p;
  }

  function numOf(metrics, id) {
    var m = metrics[id];
    return m && m.status === "known" && typeof m.value === "number" ? m.value : null;
  }

  function checkHygiene(result, geo, features, site, layerName) {
    for (var k = 0; k < features.length; k++) {
      var f = features[k];
      var g = f.geometry;
      var polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
      for (var p = 0; p < polys.length; p++) {
        var rings = polys[p];
        var outer = rings[0];
        var closed =
          outer.length > 3 &&
          outer[0][0] === outer[outer.length - 1][0] &&
          outer[0][1] === outer[outer.length - 1][1];
        if (!closed) result.hygiene.push({ id: f.id, layer: layerName, level: "error", message: "外环未闭合" });
        if (rings.length > 1)
          result.hygiene.push({ id: f.id, layer: layerName, level: "error", message: "含内环（洞），本核验内核不支持，需人工复核" });
        if (geo.triangulate(geo.projectRing(outer)).length === 0)
          result.hygiene.push({ id: f.id, layer: layerName, level: "error", message: "多边形退化，无法三角化" });
      }
      var outside = geo.differenceArea(g, [site.geometry]);
      if (outside > 1) {
        result.hygiene.push({
          id: f.id,
          layer: layerName,
          level: "warning",
          message: "有 " + round(outside, 3) + " 平方米落在临时场地边界之外"
        });
      }
    }
  }

  /* 核验面板是双语页面共用的。英文页此前把这五个中文标签原样印出来了——
     这是「任何人可独立核对」那一节的主表，是最不该只有中文的地方。 */
  var LABEL_EN = {
    land_use_coverage_gap_sqm: "Site area not covered by the land-use layer",
    land_use_coverage_ratio: "Land-use layer coverage of the site",
    land_use_max_overlap_sqm: "Largest pairwise intersection among land-use features",
    land_use_parcel_count: "Number of land-use features",
    phase_coverage_gap_sqm: "Site area not covered by the phasing layer"
  };

  function addCheck(result, id, label, computed, expected, unit, formula, tol) {
    var t = tol === undefined ? result.tolerance_abs : tol;
    var delta = expected === null ? null : computed - expected;
    result.checks.push({
      id: id,
      label: label,
      label_en: LABEL_EN[id] || label,
      unit: unit,
      computed: computed,
      computed_rounded: unit === "count" ? computed : round(computed, unit === "ratio" ? 9 : 3),
      expected: expected,
      delta: delta,
      tolerance: t,
      formula: formula,
      pass: expected !== null && Math.abs(delta) <= t
    });
  }

  verify.VERSION = VERSION;
  root.CA_verifyTopology = verify;
  if (typeof module === "object" && module.exports) module.exports = verify;
})(typeof window !== "undefined" ? window : globalThis);
