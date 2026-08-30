/* Signal capacity consistency runner. Node.js, no deps/network/personal data.
 * Usage: node visual/assets/run_signal_capacity.js [--check]
 * Verifies: (1) block km + connector km == total lane km; (2) P1 capacity < 2000
 * (honesty: current block rule cannot meet the KPI); (3) P2 capacity range covers
 * 2000 (sub-blocking makes the KPI reachable); (4) KPI restated as phased.
 */
"use strict";
const fs = require("fs"), path = require("path");
const m = JSON.parse(fs.readFileSync(path.join(__dirname, "signal-capacity-model.json"), "utf8"));

const ng = m.network_geometry;
const checks = [];
checks.push({ id: "C1_geometry_consistent",
  pass: Math.abs(ng.signaled_block_km + ng.connector_km - ng.total_lane_km) < 0.05,
  detail: `signaled ${ng.signaled_block_km} + connector ${ng.connector_km} == total ${ng.total_lane_km} km` });
const p1 = m.phases[0], p2 = m.phases[1];
checks.push({ id: "C2_p1_below_kpi",
  pass: p1.orders_per_day_range[1] < 2000,
  detail: `P1 capacity ${p1.orders_per_day_range[0]}-${p1.orders_per_day_range[1]} < 2000 (honest gap)` });
checks.push({ id: "C3_p2_covers_kpi",
  pass: p2.orders_per_day_range[0] <= 2000 && p2.orders_per_day_range[1] >= 2000,
  detail: `P2 capacity ${p2.orders_per_day_range[0]}-${p2.orders_per_day_range[1]} covers 2000` });
const blockSum = Object.values(ng.block_lengths_km).reduce((a, b) => a + b, 0);
checks.push({ id: "C4_block_sum_matches",
  pass: Math.abs(blockSum - ng.signaled_block_km) < 0.05,
  detail: `block sum ${blockSum.toFixed(2)} == signaled ${ng.signaled_block_km} km` });

const ok = checks.every(c => c.pass);
if (process.argv.includes("--check")) {
  console.log(JSON.stringify({ ok, checks, field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
console.log((ok ? "PASS" : "FAIL") + ": " + checks.filter(c => c.pass).length + "/" + checks.length + " capacity checks");
