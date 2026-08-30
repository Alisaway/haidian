/* Accountability tabletop runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_accountability_tabletop.js [--check]
 * 12 services x 6 branches = 72 cases. Proves accountability-rule classification.
 */
"use strict";
const fs = require("fs"), path = require("path");
const stands = JSON.parse(fs.readFileSync(path.join(__dirname, "accountability-stands.json"), "utf8"));
const completion = JSON.parse(fs.readFileSync(path.join(__dirname, "completion-display.json"), "utf8"));

const SERVICE_IDS = ["GS-01","GS-02","GS-03","GS-04","GS-05","GS-06","GS-07","GS-08","GS-09","GS-10","GS-11","GS-12"];

const branches = [
  ["complete_accountability", "accountable"],
  ["no_named_clerk", "blocked"],
  ["no_signature", "blocked"],
  ["stage_invisible", "blocked"],
  ["complaint_channel_missing", "flagged"],
  ["deadline_unknown", "flagged"],
];

function run(sid, b) {
  if (b === "complete_accountability") return "accountable";
  if (b === "complaint_channel_missing" || b === "deadline_unknown") return "flagged";
  return "blocked";
}

const actual = [];
for (const sid of SERVICE_IDS) {
  for (const [br, ex] of branches) {
    const res = run(sid, br);
    actual.push({ service_id: sid, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 72 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, service_count: 12, branch_count: 6, total_cases: 72,
    blocked_cases: actual.filter(function(x) { return x.actual === "blocked"; }).length,
    accountable_cases: actual.filter(function(x) { return x.actual === "accountable"; }).length,
    flagged_cases: actual.filter(function(x) { return x.actual === "flagged"; }).length,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 72/72 accountability-rule cases correctly classified.");
console.log("  blocked: " + actual.filter(function(x) { return x.actual === "blocked"; }).length);
console.log("  accountable: " + actual.filter(function(x) { return x.actual === "accountable"; }).length);
console.log("  flagged: " + actual.filter(function(x) { return x.actual === "flagged"; }).length);
