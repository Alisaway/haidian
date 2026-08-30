#!/usr/bin/env node
"use strict";

// Recompute public aggregates in simulation.json using Node.js stdlib only.
const fs = require("fs");
const path = require("path");

const simulationPath = path.resolve(__dirname, "..", "..", "simulation.json");
const data = JSON.parse(fs.readFileSync(simulationPath, "utf8"));
const tasks = data.tasks;

if (data.task_count !== tasks.length) {
  throw new Error("task_count does not match tasks.length");
}

const successful = tasks.filter(
  (task) => task.outcome === "success" || task.outcome.endsWith("_success"),
).length;
const schemaPass = tasks.filter((task) => task.dispatch_schema_valid).length;
const auditComplete = tasks.filter((task) => task.audit_complete).length;
const highRisk = tasks.filter((task) => task.high_risk);
const intercepted = highRisk.filter((task) => task.release_decision === "hold").length;

const computed = {
  simulation_task_count: tasks.length,
  simulation_success_rate: successful / tasks.length,
  tool_schema_pass_rate: schemaPass / tasks.length,
  audit_completeness: auditComplete / tasks.length,
  high_risk_intercept_rate: intercepted / highRisk.length,
};

const expected = {
  simulation_success_rate: data.baselines.urban_llm_harness.success_rate,
  tool_schema_pass_rate: data.baselines.urban_llm_harness.tool_schema_pass_rate,
  audit_completeness: data.baselines.urban_llm_harness.audit_completeness,
  high_risk_intercept_rate: data.baselines.street_pass_guard.high_risk_intercept_rate,
};

for (const [key, value] of Object.entries(expected)) {
  if (computed[key] !== value) {
    throw new Error(`${key}: computed=${computed[key]} declared=${value}`);
  }
}

process.stdout.write(JSON.stringify({ status: "PASS", computed }, null, 2) + "\n");
