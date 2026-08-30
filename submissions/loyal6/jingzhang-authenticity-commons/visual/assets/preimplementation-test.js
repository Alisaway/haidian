"use strict";

const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "preimplementation-package.json");
const evidence = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const zoneArea = evidence.reference_test_fit.zones.reduce((sum, zone) => sum + zone.area_sqm, 0);
const shareTotal = evidence.procurement_cost_plan.packages.reduce(
  (sum, item) => sum + item.reference_share_percent,
  0
);
const gateIds = new Set(evidence.external_gates.map((gate) => gate.id));
const mappedBranches = evidence.conditional_implementation_branches.every((branch) =>
  branch.trigger_gates.every((gateId) => gateIds.has(gateId))
);
const allGatesHold = evidence.external_gates.every((gate) => gate.status === "HOLD");
const schedule = evidence.staffing_screening.reference_90_day_schedule;
const expectedStaffHours =
  schedule.window_hours *
  schedule.windows_per_week *
  schedule.weeks *
  evidence.staffing_screening.minimum_concurrent_seats;

const checks = [
  {
    id: "P0_ZONE_AREA",
    passed: zoneArea === evidence.reference_test_fit.envelope.area_sqm,
    observed: zoneArea,
    expected: evidence.reference_test_fit.envelope.area_sqm
  },
  {
    id: "P0_COST_SHARES",
    passed: shareTotal === 100 && shareTotal === evidence.procurement_cost_plan.share_total_percent,
    observed: shareTotal,
    expected: 100
  },
  {
    id: "P0_GATES_HOLD",
    passed: allGatesHold && evidence.acceptance_evidence.field_release === false,
    observed: evidence.external_gates.filter((gate) => gate.status === "HOLD").length,
    expected: evidence.external_gates.length
  },
  {
    id: "P0_BRANCH_GATE_MAPPING",
    passed: mappedBranches,
    observed: evidence.conditional_implementation_branches.length,
    expected: 4
  },
  {
    id: "P0_STAFF_HOURS",
    passed: schedule.reference_staff_hours === expectedStaffHours,
    observed: schedule.reference_staff_hours,
    expected: expectedStaffHours
  }
];

const result = {
  schema_version: "1.0",
  source: "preimplementation-package.json",
  passed: checks.every((check) => check.passed),
  checks
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (!result.passed) process.exitCode = 1;
