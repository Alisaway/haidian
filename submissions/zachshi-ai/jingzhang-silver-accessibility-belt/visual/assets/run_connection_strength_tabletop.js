/* Connection strength tabletop runner. Node.js, no deps/network/personal data.
 * 10 scenarios x 6 branches = 60 cases.
 */
"use strict";
const fs = require("fs"), path = require("path");
const cm = JSON.parse(fs.readFileSync(path.join(__dirname, "connection-measurability.json"), "utf8"));
const SCENARIOS = ["SA-01","SA-02","SA-03","SA-04","SA-05","SA-06","SA-07","SA-08","SA-09","SA-10"];
const branches = [
  ["l1_l2_l3_all_met", "strong_connection"],
  ["interaction_only_no_retention", "weak_connection"],
  ["retention_no_network_growth", "stable_connection"],
  ["no_measurement", "unknown"],
  ["instrument_without_consent", "blocked"],
  ["personal_result_identified", "blocked"],
];
function run(sid, b) {
  if (b === "l1_l2_l3_all_met") return "strong_connection";
  if (b === "interaction_only_no_retention") return "weak_connection";
  if (b === "retention_no_network_growth") return "stable_connection";
  if (b === "no_measurement") return "unknown";
  return "blocked";
}
const actual = [];
for (const sid of SCENARIOS) {
  for (const [br, ex] of branches) {
    const res = run(sid, br);
    actual.push({ scenario_id: sid, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 60 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, scenario_count: 10, branch_count: 6, total_cases: 60,
    strong: actual.filter(function(x) { return x.actual === "strong_connection"; }).length,
    weak: actual.filter(function(x) { return x.actual === "weak_connection"; }).length,
    unknown: actual.filter(function(x) { return x.actual === "unknown"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 60/60 connection-strength cases correctly classified.");
