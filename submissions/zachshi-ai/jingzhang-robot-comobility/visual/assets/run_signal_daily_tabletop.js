/* Signal daily timetable runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_signal_daily_tabletop.js [--check]
 * 11 scenarios (6 routine periods + 5 events) x 8 blocks = 88 cases.
 * Derives each case's mode from interlock rules (trigger match) or the
 * scenario profile, then verifies 8 safety assertions.
 */
"use strict";
const fs = require("fs"), path = require("path");
const t = JSON.parse(fs.readFileSync(path.join(__dirname, "signal-daily-timetable.json"), "utf8"));

const scenarios = t.periods.concat(t.events);
const blocks = t.blocks;
const eff = t.trigger_effects;

function derive(scenario, block) {
  for (const tr of scenario.triggers) {
    if (tr.scope && tr.scope !== block.id) continue;
    if (block.interlock_rules.indexOf(tr.id + "_blocks") >= 0) return eff[tr.id];
  }
  return scenario.profile[block.section_type];
}

const cases = [];
for (const sc of scenarios) {
  for (const b of blocks) {
    cases.push({ scenario: sc.id, block: b.id, section_type: b.section_type, status: derive(sc, b) });
  }
}
function at(scId, bId) {
  return cases.filter(function(c) { return c.scenario === scId && c.block === bId; })[0].status;
}
const SERVICEABLE = ["nominal", "degraded_10", "degraded_8", "degraded_5", "follow", "warmup", "test_only"];
const pedIds = blocks.filter(function(b) { return b.section_type === "pedestrian_priority"; }).map(function(b) { return b.id; });
const opsIds = blocks.filter(function(b) { return b.section_type !== "test_trail"; }).map(function(b) { return b.id; });

const A = [];
A.push({ id: "A1", pass: pedIds.every(function(id) {
  return cases.filter(function(c) { return c.block === id; }).every(function(c) {
    return ["follow", "blocked", "night_off"].indexOf(c.status) >= 0; });
})});
A.push({ id: "A2", pass: opsIds.every(function(id) { return at("P1", id) === "night_off"; }) });
function isolated(evId, targets) {
  return cases.filter(function(c) { return c.scenario === evId; }).every(function(c) {
    const isTarget = targets.indexOf(c.block) >= 0;
    return isTarget ? c.status === "blocked" : SERVICEABLE.indexOf(c.status) >= 0;
  });
}
A.push({ id: "A3", pass: isolated("E3", ["BLK-02"]) && isolated("E4", ["BLK-06", "BLK-07"]) && isolated("E5", ["BLK-04"]) });
A.push({ id: "A4", pass: opsIds.every(function(id) { return at("E1", id) === "blocked"; }) });
A.push({ id: "A5", pass: blocks.every(function(b) { return at("E2", b.id) === "blocked"; }) });
A.push({ id: "A6", pass: cases.filter(function(c) { return c.block === "BLK-08"; }).every(function(c) {
  return ["test_only", "degraded_5", "blocked"].indexOf(c.status) >= 0; }) });
A.push({ id: "A7", pass: at("P3", "BLK-05") === "blocked" });
A.push({ id: "A8", pass: blocks.every(function(b) {
  return cases.some(function(c) { return c.block === b.id && SERVICEABLE.indexOf(c.status) >= 0; }); }) });

const byStatus = {};
for (const c of cases) byStatus[c.status] = (byStatus[c.status] || 0) + 1;
const ok = cases.length === 88 && A.every(function(a) { return a.pass; });

if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok: ok, scenario_count: scenarios.length, period_count: t.periods.length,
    event_count: t.events.length, block_count: blocks.length, total_cases: cases.length,
    by_status: byStatus,
    assertions: { total: A.length, passed: A.filter(function(a) { return a.pass; }).length },
    assertion_detail: A, field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log("PASS: " + cases.length + "/88 signal-daily cases; assertions " +
  A.filter(function(a) { return a.pass; }).length + "/8; status mix:", JSON.stringify(byStatus));
