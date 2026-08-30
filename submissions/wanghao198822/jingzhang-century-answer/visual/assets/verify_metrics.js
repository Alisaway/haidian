/* verify_metrics.js — 页面数值与 metrics.json 一致性核验
 * -------------------------------------------------------------------------
 * 依赖（同目录、本地）：data/metrics_snapshot.js
 * 挂载点：window.CA_verifyMetrics(options) -> 结构化结果对象
 *
 * 做什么：
 *   扫描当前页面里所有 [data-metric] 元素，把 data-value 与 metrics.json 逐项比对。
 *   这与甲方 scripts/visual_review.py（VISUAL_PACKAGING 门）的判据同源：
 *     - data-value 必须是有限数值；
 *     - 对应指标必须在 metrics.json 中登记且 status="known"；
 *     - 数值必须与 metrics.json 一致（相对容差 1 ppm，与甲方脚本一致）；
 *     - site_area_sqm / green_ratio / public_space_ratio 三项必须出现。
 *
 * 本脚本只读 DOM，不修改 DOM；渲染由调用方负责。
 * options.root 可指定扫描根节点（默认 document）。
 */
(function (root) {
  "use strict";

  var VERSION = "1.0.0";
  var REQUIRED = ["site_area_sqm", "green_ratio", "public_space_ratio"];

  function verify(options) {
    var opt = options || {};
    var snap = root.CA_METRICS_SNAPSHOT;
    var scope = opt.root || (typeof document !== "undefined" ? document : null);
    var result = {
      script: "verify_metrics",
      version: VERSION,
      ok: false,
      run_at: new Date().toISOString(),
      metrics_source_sha256: snap ? snap.source_sha256 : null,
      relative_tolerance: 1e-6,
      required_metrics: REQUIRED.slice(),
      summary: { declarations: 0, passed: 0, failed: 0, elements_without_value: 0 },
      items: [],
      missing_required: [],
      errors: []
    };
    if (!snap) {
      result.errors.push("缺少依赖：data/metrics_snapshot.js 未加载");
      return result;
    }
    if (!scope) {
      result.errors.push("没有可扫描的 DOM（本脚本需要在浏览器中运行）");
      return result;
    }

    var metrics = snap.metrics_json.metrics;
    var nodes = scope.querySelectorAll("[data-metric]");
    var seen = {};

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var id = node.getAttribute("data-metric");
      var raw = node.getAttribute("data-value");
      if (raw === null) {
        result.summary.elements_without_value++;
        continue;
      }
      result.summary.declarations++;
      var value = Number(raw);
      var m = metrics[id];
      var item = {
        id: id,
        declared_raw: raw,
        declared: value,
        expected: m && typeof m.value === "number" ? m.value : null,
        unit: m ? m.unit : null,
        status: m ? m.status : "unregistered",
        text: (node.textContent || "").trim().slice(0, 40),
        pass: false,
        problem: null
      };
      if (!isFinite(value)) {
        item.problem = "data-value 不是有限数值";
      } else if (!m) {
        item.problem = "metrics.json 中没有登记该指标";
      } else if (m.status !== "known") {
        item.problem = 'metrics.json 中 status="' + m.status + '"，不得在页面上渲染成数值';
      } else if (typeof m.value !== "number") {
        item.problem = "metrics.json 中没有数值 value";
      } else {
        var tol = Math.max(Math.abs(m.value) * 1e-6, 1e-6);
        item.delta = value - m.value;
        item.tolerance = tol;
        if (Math.abs(item.delta) > tol) item.problem = "与 metrics.json 数值不一致";
        else item.pass = true;
      }
      if (item.pass) result.summary.passed++;
      else result.summary.failed++;
      seen[id] = true;
      result.items.push(item);
    }

    for (var r = 0; r < REQUIRED.length; r++) {
      if (!seen[REQUIRED[r]]) result.missing_required.push(REQUIRED[r]);
    }

    result.ok =
      result.summary.failed === 0 &&
      result.missing_required.length === 0 &&
      result.errors.length === 0 &&
      result.summary.declarations > 0;
    result.headline =
      "页面数值核验 " +
      result.summary.passed +
      "/" +
      result.summary.declarations +
      " 项与 metrics.json 一致" +
      (result.missing_required.length ? "；缺少必填指标 " + result.missing_required.join("、") : "");
    return result;
  }

  verify.VERSION = VERSION;
  verify.REQUIRED = REQUIRED;
  root.CA_verifyMetrics = verify;
  if (typeof module === "object" && module.exports) module.exports = verify;
})(typeof window !== "undefined" ? window : globalThis);
