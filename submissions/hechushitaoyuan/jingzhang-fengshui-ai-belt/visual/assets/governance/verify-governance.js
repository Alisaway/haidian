#!/usr/bin/env node
"use strict";

/**
 * Qi-Pulse governance verifier — validates the package's own governance
 * artifacts as structural evidence. Standard-library only.
 *
 * Mirrors the honesty-enforcement design of in-package verifiers: registers
 * must keep execution-value fields empty while they are not achieved; any
 * fabricated value FAILS the check.
 *
 * Usage:
 *   node verify-governance.js [packageDir] [--json]
 *   (packageDir defaults to two levels up from this script's location,
 *    i.e. when placed at visual/assets/governance/ inside the package)
 */

const fs = require("node:fs");
const path = require("node:path");

let pkg = process.argv[2] && !process.argv[2].startsWith("--")
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../../..");

if (path.basename(pkg) !== "jingzhang-fengshui-ai-belt") {
  const candidate = path.join(pkg, "submissions/hechushitaoyuan/jingzhang-fengshui-ai-belt");
  if (fs.existsSync(candidate)) pkg = candidate;
}

const results = [];
function check(group, id, desc, ok, detail = "") {
  results.push({ group, id, desc, status: ok ? "PASS" : "FAIL", detail: String(detail).slice(0, 300) });
}
function read(rel) {
  return JSON.parse(fs.readFileSync(path.join(pkg, rel), "utf8"));
}

function main() {
  // ---------- G-A 气数协议 ----------
  const qp = read("visual/assets/governance/qi-protocol.json");
  check("A", "QP-RULES", "气数协议规则 = 7 条", (qp.rules || []).length === 7, `got ${(qp.rules || []).length}`);
  check("A", "QP-STEPS", "四步协议", (qp.steps || []).length === 4, `got ${(qp.steps || []).length}`);

  // ---------- G-B 岗位规格 ----------
  const rs = read("visual/assets/governance/role-spec.json");
  const roles = rs.roles || [];
  check("B", "ROLE-COUNT", "岗位 = 8 类", roles.length === 8, `got ${roles.length}`);
  const mutual = roles.some(r => JSON.stringify(r).includes("互斥"));
  check("B", "ROLE-MUTEX", "存在互斥规则声明", mutual);

  // ---------- G-C 就绪登记（诚实强制） ----------
  const regPath = "visual/assets/governance/evidence-readiness-register.json";
  const reg = read(regPath);
  const scenarios = Object.entries(reg.scenarios || {});
  check("C", "RD-COUNT", "三个测试场景均有登记", scenarios.length === 3, `got ${scenarios.length}`);
  let honest = true; let gatesOk = true;
  for (const [name, s] of scenarios) {
    if (s.current_level !== "H0") honest = false;
    for (const g of s.gates || []) {
      if (g.status !== "未达成") honest = false;
      if (!g.gate || !/^H[1-4]$/.test(g.gate)) gatesOk = false;
      for (const k of ["required_materials", "responsible_roles", "review_requirement"]) {
        if (typeof g[k] !== "string" || g[k].length < 4) gatesOk = false;
      }
    }
  }
  check("C", "RD-HONEST", "全部场景如实处于 H0 且升级状态=未达成（诚实强制：任何'达成'即失败）", honest && gatesOk);
  const forbiddenValueFields = ["baseline_result", "measured_value", "authorization_record", "calibration_data"];
  const leak = JSON.stringify(reg).toLowerCase();
  const fabricated = forbiddenValueFields.some(f => {
    const re = new RegExp(`"${f}"\\s*:\\s*"(?!")`, "i");
    return re.test(leak);
  });
  check("C", "RD-NO-FABRICATION", "登记表不含任何已执行/已授权类字段值", !fabricated);

  // ---------- G-D 测量口径（数值留白强制） ----------
  const mr = read("visual/assets/governance/measurement-registry.json");
  const protos = mr.protocols || [];
  check("D", "M-COUNT", "测量口径 = 6 项 M01-M06", protos.length === 6, `got ${protos.length}`);
  const blankValues = protos.every(p => p.value === null || p.value === undefined || p.value === "");
  check("D", "M-BLANK", "全部数值留白（标定前不预设数字，诚实强制）", blankValues);
  const defOk = protos.every(p => typeof p.definition === "string" && p.definition.length > 10);
  check("D", "M-DEF", "每项口径含定义与复核岗", defOk);

  // ---------- G-E 跨文件一致性 ----------
  const m = read("metrics.json").metrics;
  check("E", "X-RD-METRIC", "metrics.readiness_register_count 与场景数一致",
    (m.readiness_register_count || {}).value === scenarios.length,
    `metric=${(m.readiness_register_count || {}).value}`);
  check("E", "X-QP-METRIC", "metrics.qi_protocol_rule_count 与协议一致",
    (m.qi_protocol_rule_count || {}).value === (qp.rules || []).length);
  const aj = read("visual/assets/a11y-color-check.json");
  check("E", "X-A11Y", "a11y 失配计数跨文件一致",
    aj.summary.total_fails === (m.a11y_color_pair_fail_count || {}).value,
    `json=${aj.summary.total_fails} metric=${(m.a11y_color_pair_fail_count || {}).value}`);
  const cards = (m.scenario_card_count || {}).value;
  check("E", "X-CARDS", "metrics.scenario_card_count = 13", cards === 13, `got ${cards}`);

  const total = results.length;
  const passed = results.filter(r => r.status === "PASS").length;

  const out = {
    schema_version: "1.0",
    verifier: "verify-governance v1.0 (node std-lib only)",
    generated_at: new Date().toISOString(),
    summary: { total_checks: total, passed, failed: total - passed },
    checks: results,
  };
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(out, null, 1));
  } else {
    for (const r of results) {
      console.log(`${r.status === "PASS" ? "✅" : "❌"} [${r.group}] ${r.id}: ${r.desc}${r.status === "FAIL" ? " | " + r.detail : ""}`);
    }
    console.log(`\n${passed}/${total} PASS`);
  }

  if (process.argv.includes("--emit-json")) {
    const outPath = path.join(pkg, "visual/assets/governance/qi-pulse-governance-verification.json");
    fs.writeFileSync(outPath, JSON.stringify(out, null, 1), "utf8");
    console.log("written ->", path.relative(process.cwd(), outPath));
  }
  process.exitCode = passed === total ? 0 : 1;
}

main();
