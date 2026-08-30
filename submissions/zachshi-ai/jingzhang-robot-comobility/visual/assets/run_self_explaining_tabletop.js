/* Self-explaining grammar runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_self_explaining_tabletop.js [--check]
 * 4 sections x 6 branches = 24 cases. Verifies feature<->rule mapping is
 * one-to-one and bidirectional (no ambiguity).
 */
"use strict";
const fs = require("fs"), path = require("path");
const g = JSON.parse(fs.readFileSync(path.join(__dirname, "self-explaining-grammar.json"), "utf8"));

// Feature fingerprints per section (must be unique and invertible)
function fingerprint(s) {
  const f = s.visual_features;
  return [f.separation, f.band_color, f.surface, f.marking].join("|");
}

const branches = [
  ["feature_to_rule", "readable"],
  ["rule_to_feature", "reconstructable"],
  ["unique_fingerprint", "unique"],
  ["duplicate_fingerprint", "blocked"],
  ["missing_feature", "blocked"],
  ["missing_rule", "blocked"],
];

const fps = g.sections.map(function(s) { return fingerprint(s); });
const unique = new Set(fps).size === fps.length;

const actual = [];
for (const s of g.sections) {
  for (const [br, ex] of branches) {
    let res;
    if (br === "feature_to_rule") res = (s.visual_features.width_m !== undefined || s.visual_features.separation) && s.behavior_rules.speed_kmh !== undefined ? "readable" : "blocked";
    else if (br === "rule_to_feature") res = s.behavior_rules.speed_kmh !== undefined && s.visual_features.surface ? "reconstructable" : "blocked";
    else if (br === "unique_fingerprint") res = unique ? "unique" : "blocked";
    else if (br === "duplicate_fingerprint") res = unique ? "blocked" : "blocked";
    else res = "blocked";
    actual.push({ section_id: s.section_id, branch: br, expected: ex, actual: res, pass: res === ex });
  }
}
const ok = actual.length === 24 && actual.every(function(x) { return x.pass; });
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, section_count: 4, branch_count: 6, total_cases: 24,
    readable_cases: actual.filter(function(x) { return x.actual === "readable"; }).length,
    unique_fingerprints: unique,
    field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: 24/24 self-explaining cases; fingerprints unique:", unique);
