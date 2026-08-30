/* verify_geometry.js — 几何复算核验（任何人可独立跑）
 * -------------------------------------------------------------------------
 * 依赖（同目录、全部本地）：geo_core.js、data/geo_layers.js、data/metrics_snapshot.js
 * 挂载点：window.CA_verifyGeometry(options) -> 结构化结果对象（不碰 DOM）
 *
 * 做什么：
 *   把 metrics.json 里每一条 status="known" 的指标，按它自己声明的 formula
 *   重新算一遍——用包内 geometry/*.geojson 的原始坐标、和 metrics.json 相同的
 *   投影口径（EPSG:4326 -> EPSG:4548）——然后逐项比对登记值。
 *
 * 关键点：本脚本不读任何「预先算好的答案」。formula 字符串来自 metrics.json 本身，
 *   由本脚本解析后执行；解析不了的公式一律进 skipped 并写明原因，不假装通过。
 *
 * 比对口径：用未取整的复算值与 metrics.json 的登记值直接相减，容差取登记值自身的
 *   取整位数（formula 末尾 round(..., N) 的 N）：N=3 -> 1e-3、N=6 -> 1e-6，
 *   计数类要求完全相等。先取整再比对会把 5e-4 的取整误差放大成 1e-3 的假失败，
 *   所以这里不那样做。
 */
(function (root) {
  "use strict";

  var VERSION = "1.1.0";

  /* metrics.json 里出现的、不是几何图层名的标识符别名 */
  var LAYER_ALIAS = {
    key_detailed_design_areas: "key_areas" /* 重点详细设计区 = key_areas 图层 */
  };

  /* 交由 verify_topology.js 复算的公式特征与指标 */
  var TOPOLOGY_HINT = /difference\(|intersection\(/;
  var TOPOLOGY_IDS = {
    land_use_coverage_gap_sqm: 1,
    land_use_coverage_ratio: 1,
    land_use_max_overlap_sqm: 1,
    phase_coverage_gap_sqm: 1
  };

  var RE = {
    featureArea: /^round\(area\(project\(([a-z_]+)\.feature\[([A-Za-z0-9\-]+)\],\s*EPSG:4326->EPSG:4548\)\),\s*\d+\)$/,
    unionAreaProj: /^round\(area\(project\(union\(([a-z_]+)\.features\),\s*EPSG:4326->EPSG:4548\)\),\s*\d+\)$/,
    unionArea: /^round\(area\(union\(([a-z_]+)\.features\)\),\s*\d+\)$/,
    unionAreaWhere: /^round\(area\(union\(([a-z_]+)\.features\s+where\s+properties\.([a-z_]+)\s*==\s*"([^"]+)"\)\),\s*\d+\)$/,
    featureLength: /^round\(length\(project\(([a-z_]+)\.feature\[([A-Za-z0-9\-]+)\],\s*EPSG:4326->EPSG:4548\)\),\s*\d+\)$/,
    sumLengthProj: /^round\(sum\(length\(project\(([a-z_]+)\.features,\s*EPSG:4326->EPSG:4548\)\)\),\s*\d+\)$/,
    sumLengthWhere: /^round\(sum\(length\(([a-z_]+)\.features\s+where\s+properties\.([a-z_]+)\s*==\s*"([^"]+)"\)\),\s*\d+\)$/,
    count: /^count\(([a-z_]+)(?:\.features)?\)$/,
    ratio: /^round\(([a-z0-9_]+)\s*\/\s*([a-z0-9_]+),\s*(\d+)\)$/,
    perKm: /^round\(([a-z0-9_]+)\s*\/\s*\(([a-z0-9_]+)\s*\/\s*1000\),\s*(\d+)\)$/,
    deviationPct: /^round\(\(([a-z0-9_]+)\s*-\s*announced_area_sqm\)\s*\/\s*announced_area_sqm\s*\*\s*100,\s*(\d+)\);\s*announced_area_sqm\s*=\s*([0-9.]+)/,
    reported: /^reported_value\(/,
    digits: /,\s*(\d+)\)(?:;|\s*$)/
  };

  function layerOf(data, name) {
    var key = LAYER_ALIAS[name] || name;
    return data.layers[key] || null;
  }

  function featureById(layer, id) {
    for (var i = 0; i < layer.features.length; i++) {
      var f = layer.features[i];
      if (f.id === id || (f.properties && f.properties.id === id)) return f;
    }
    return null;
  }

  function geomOf(f) {
    return f.geometry;
  }

  function toleranceFor(m) {
    if (m.unit === "count") return 0;
    var d = String(m.formula || "").match(RE.digits);
    return d ? Math.pow(10, -parseInt(d[1], 10)) : 1e-6;
  }

  function verify(options) {
    var opt = options || {};
    var geo = root.CA_geo;
    var data = root.CA_GEO_DATA;
    var snap = root.CA_METRICS_SNAPSHOT;
    var result = {
      script: "verify_geometry",
      version: VERSION,
      ok: false,
      run_at: new Date().toISOString(),
      crs: geo ? geo.CRS_FROM + " -> " + geo.CRS_TO : null,
      crs_note: geo ? geo.CRS_NOTE : null,
      metrics_source_sha256: snap ? snap.source_sha256 : null,
      geometry_source_sha256: data ? data.source_sha256 : null,
      tolerance_rule: "容差 = 10^(-N)，N 取 metrics.json 公式末尾 round(..., N) 的位数；计数类要求完全相等",
      summary: { total: 0, passed: 0, failed: 0, skipped: 0 },
      items: [],
      skipped: [],
      errors: []
    };
    if (!geo || !data || !snap) {
      result.errors.push("缺少依赖：需要 geo_core.js、data/geo_layers.js、data/metrics_snapshot.js");
      return result;
    }
    if (opt.toleranceScale) result.tolerance_rule += "（调用方放大系数 " + opt.toleranceScale + "）";

    var metrics = snap.metrics_json.metrics;
    var ids = Object.keys(metrics);
    var computed = {}; /* 本脚本自己算出来的值，供派生指标使用 */
    var deferred = [];

    /* ---------- 第一遍：直接由几何得到的指标 ---------- */
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var m = metrics[id];
      if (!m || m.status !== "known") {
        result.skipped.push({
          id: id,
          reason: "status=" + (m ? m.status : "missing") + "，非 known 指标不参与几何复算",
          reason_en: "status=" + (m ? m.status : "missing") + " — not a known metric; excluded from geometric recomputation",
          formula: m ? m.formula : null
        });
        continue;
      }
      var f = String(m.formula || "");
      if (TOPOLOGY_IDS[id]) {
        result.skipped.push({ id: id, reason: "布尔拓扑类指标，由 verify_topology.js 复算", reason_en: "boolean-topology metric; recomputed by verify_topology.js", formula: f });
        continue;
      }
      var mm;
      var value = null;
      var kind = null;
      var note = null;
      try {
        if ((mm = f.match(RE.featureArea))) {
          kind = "feature_area";
          value = geo.geomArea(mustFeature(data, mm[1], mm[2]).geometry);
        } else if ((mm = f.match(RE.unionAreaProj)) || (mm = f.match(RE.unionArea))) {
          kind = "union_area";
          value = geo.unionArea(mustLayer(data, mm[1]).features.map(geomOf));
        } else if ((mm = f.match(RE.unionAreaWhere))) {
          kind = "union_area_filtered";
          var selA = filterFeatures(mustLayer(data, mm[1]), mm[2], mm[3]);
          note = "参与合并的要素 " + selA.length + " 个";
          value = geo.unionArea(selA.map(geomOf));
        } else if ((mm = f.match(RE.featureLength))) {
          kind = "feature_length";
          value = geo.geomLength(mustFeature(data, mm[1], mm[2]).geometry);
        } else if ((mm = f.match(RE.sumLengthProj))) {
          kind = "sum_length";
          value = sumLength(geo, mustLayer(data, mm[1]).features);
        } else if ((mm = f.match(RE.sumLengthWhere))) {
          kind = "sum_length_filtered";
          var selB = filterFeatures(mustLayer(data, mm[1]), mm[2], mm[3]);
          note = "参与求和的要素 " + selB.length + " 个";
          value = sumLength(geo, selB);
        } else if ((mm = f.match(RE.count))) {
          kind = "count";
          if (LAYER_ALIAS[mm[1]]) note = "别名：" + mm[1] + " -> " + LAYER_ALIAS[mm[1]] + ".features";
          value = mustLayer(data, mm[1]).features.length;
        } else if (RE.ratio.test(f) || RE.perKm.test(f) || RE.deviationPct.test(f)) {
          deferred.push(id);
          continue;
        } else if (RE.reported.test(f)) {
          result.skipped.push({ id: id, reason: "来源登记值（reported_value），不由几何推导，须回 sources.json 核对", reason_en: "reported_value from a registered source, not derived from geometry; check against sources.json", formula: f });
          continue;
        } else if (TOPOLOGY_HINT.test(f)) {
          result.skipped.push({ id: id, reason: "布尔拓扑类公式，由 verify_topology.js 复算", reason_en: "boolean-topology formula; recomputed by verify_topology.js", formula: f });
          continue;
        } else {
          result.skipped.push({ id: id, reason: "本脚本未实现该公式形态，需人工核对", reason_en: "formula shape not implemented by this script; verify by hand", formula: f });
          continue;
        }
      } catch (err) {
        var msg = err && err.message ? err.message : String(err);
        result.errors.push(id + ": " + msg);
        result.skipped.push({ id: id, reason: "复算出错：" + msg, reason_en: "recomputation error: " + msg, formula: f });
        continue;
      }
      computed[id] = value;
      pushItem(result, id, m, kind, value, note, opt);
    }

    /* ---------- 第二遍：派生指标（分母/分子取本脚本已复算的值） ---------- */
    for (var j = 0; j < deferred.length; j++) {
      var did = deferred[j];
      var dm = metrics[did];
      var df = String(dm.formula || "");
      var r;
      try {
        if ((r = df.match(RE.ratio))) {
          var a = resolve(computed, metrics, r[1]);
          var b = resolve(computed, metrics, r[2]);
          if (a === null || b === null || !b.value) {
            result.skipped.push({ id: did, reason: "分子或分母无法解析（" + r[1] + " / " + r[2] + "）", reason_en: "numerator or denominator could not be parsed (" + r[1] + " / " + r[2] + ")", formula: df });
            continue;
          }
          push2(result, did, dm, "derived_ratio", a.value / b.value, srcNote(r[1], a, r[2], b), opt, computed);
        } else if ((r = df.match(RE.perKm))) {
          var a2 = resolve(computed, metrics, r[1]);
          var b2 = resolve(computed, metrics, r[2]);
          if (a2 === null || b2 === null || !b2.value) {
            result.skipped.push({ id: did, reason: "分子或分母无法解析（" + r[1] + " / " + r[2] + "）", reason_en: "numerator or denominator could not be parsed (" + r[1] + " / " + r[2] + ")", formula: df });
            continue;
          }
          push2(result, did, dm, "derived_per_km", a2.value / (b2.value / 1000), srcNote(r[1], a2, r[2], b2), opt, computed);
        } else if ((r = df.match(RE.deviationPct))) {
          var a3 = resolve(computed, metrics, r[1]);
          var announced = parseFloat(r[3]);
          if (a3 === null || !announced) {
            result.skipped.push({ id: did, reason: "无法解析被比较项 " + r[1], reason_en: "could not parse the compared item " + r[1], formula: df });
            continue;
          }
          push2(
            result,
            did,
            dm,
            "derived_deviation_percent",
            ((a3.value - announced) / announced) * 100,
            "对照公告面积 " + announced + " 平方米；" + r[1] + " 取自" + a3.origin,
            opt,
            computed
          );
        }
      } catch (err2) {
        result.errors.push(did + ": " + (err2 && err2.message ? err2.message : String(err2)));
      }
    }

    result.summary.total = result.items.length;
    result.summary.skipped = result.skipped.length;
    for (var k = 0; k < result.items.length; k++) {
      if (result.items[k].pass) result.summary.passed++;
      else result.summary.failed++;
    }
    result.ok = result.summary.failed === 0 && result.errors.length === 0 && result.summary.total > 0;
    result.headline =
      "几何复算 " +
      result.summary.passed +
      "/" +
      result.summary.total +
      " 项通过，跳过 " +
      result.summary.skipped +
      " 项（非几何来源、unknown 或交由拓扑脚本）";
    return result;

    /* ---------- 内部工具 ---------- */
    function mustLayer(d, name) {
      var l = layerOf(d, name);
      if (!l) throw new Error("找不到图层 " + name);
      return l;
    }
    function mustFeature(d, layerName, fid) {
      var l = mustLayer(d, layerName);
      var ft = featureById(l, fid);
      if (!ft) throw new Error("找不到要素 " + layerName + "[" + fid + "]");
      return ft;
    }
    function filterFeatures(layer, key, val) {
      return layer.features.filter(function (x) {
        return x.properties && String(x.properties[key]) === val;
      });
    }
    function sumLength(g, features) {
      var t = 0;
      for (var s = 0; s < features.length; s++) t += g.geomLength(features[s].geometry);
      return t;
    }
    function resolve(comp, met, name) {
      if (Object.prototype.hasOwnProperty.call(comp, name)) {
        return { value: comp[name], origin: "本脚本复算值" };
      }
      var mt = met[name];
      if (mt && mt.status === "known" && typeof mt.value === "number") {
        return { value: mt.value, origin: "metrics.json 登记值（该项非几何推导，本脚本无法复算）" };
      }
      return null;
    }
    function srcNote(n1, a, n2, b) {
      return n1 + " 取自" + a.origin + "；" + n2 + " 取自" + b.origin;
    }
    function push2(res, id, m, kind, value, note, o, comp) {
      comp[id] = value;
      pushItem(res, id, m, kind, value, note, o);
    }
    function pushItem(res, id, m, kind, value, note, o) {
      var exp = m.value;
      var tol = toleranceFor(m) * (o.toleranceScale || 1);
      var delta = value - exp;
      var digits = String(m.formula || "").match(RE.digits);
      var nd = digits ? parseInt(digits[1], 10) : 6;
      res.items.push({
        id: id,
        kind: kind,
        unit: m.unit,
        expected: exp,
        computed: value,
        computed_rounded: m.unit === "count" ? value : Math.round(value * Math.pow(10, nd)) / Math.pow(10, nd),
        delta: delta,
        tolerance: tol,
        pass: Math.abs(delta) <= tol,
        formula: m.formula,
        note: note || null
      });
    }
  }

  verify.VERSION = VERSION;
  root.CA_verifyGeometry = verify;
  if (typeof module === "object" && module.exports) module.exports = verify;
})(typeof window !== "undefined" ? window : globalThis);
