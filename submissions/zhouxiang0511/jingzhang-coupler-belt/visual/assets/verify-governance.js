#!/usr/bin/env node
"use strict";

/**
 * verify-governance.js — deterministic audit for governance-protocol.json
 *
 * Checks the Co-Intelligence Covenant (CEC-12): every scenario gate must bind
 * a public task, an AI limited role, minimum data, a human final authority,
 * a no-AI fallback, stop triggers, and an exit asset. Emits coverage metrics.
 *
 * Usage:
 *   node visual/assets/verify-governance.js
 */

const fs = require("fs");
const path = require("path");

const base = __dirname;
const inputPath = path.join(base, "governance-protocol.json");
const auditPath = path.join(base, "governance-audit.json");

let data;
try {
  data = JSON.parse(fs.readFileSync(inputPath, "utf8"));
} catch (err) {
  console.error("cannot read governance-protocol.json:", err.message);
  process.exit(2);
}

const gates = Array.isArray(data.gate_records) ? data.gate_records : [];
const required = Array.isArray(data.required_gate_fields) ? data.required_gate_fields : [];

const issues = [];
const uniqueIds = new Set();

for (const gate of gates) {
  if (uniqueIds.has(gate.id)) issues.push(`duplicate gate id: ${gate.id}`);
  uniqueIds.add(gate.id);
  for (const field of required) {
    const value = gate[field];
    const empty = value === undefined || value === null || value === "" ||
      (Array.isArray(value) && value.length === 0);
    if (empty) issues.push(`${gate.id}: missing ${field}`);
  }
}

const coverage = (field) =>
  gates.length === 0
    ? 0
    : gates.filter((gate) => {
        const value = gate[field];
        return value !== undefined && value !== null && value !== "" &&
          (!Array.isArray(value) || value.length > 0);
      }).length / gates.length;

// governance non-negotiables
const forbidden = new Set(data.governance && data.governance.non_negotiables || []);
const requiredRules = [
  "no_biometric_identification",
  "no_individual_credit_scoring",
  "no_automated_admission_denial",
  "accessible_manual_service_always_available",
  "public_log_and_appeal_channel_required",
  "master_switch_in_human_hands",
];
for (const rule of requiredRules) {
  if (!forbidden.has(rule)) issues.push(`missing governance rule: ${rule}`);
}

// structural counts
if (gates.length !== 12) issues.push(`expected 12 gate records, found ${gates.length}`);
if ((data.field_tests || []).length !== 3) issues.push("expected 3 field tests");
if ((data.implementation_projects || []).length !== 5) issues.push("expected 5 first-100-days projects");

const audit = {
  schema_version: "1.0.0",
  protocol_id: data.protocol_id,
  checked_input: path.basename(inputPath),
  status: issues.length === 0 ? "PASS" : "FAIL",
  generated_by: "verify-governance.js",
  deterministic: true,
  counts: {
    gate_records: gates.length,
    field_tests: (data.field_tests || []).length,
    implementation_projects: (data.implementation_projects || []).length,
  },
  coverage: {
    human_authority: coverage("human_final_authority"),
    manual_fallback: coverage("no_ai_fallback"),
    minimum_data: coverage("minimum_data"),
    stop_triggers: coverage("stop_triggers"),
    exit_asset: coverage("exit_asset"),
  },
  issues,
};

fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2) + "\n", "utf8");
console.log(JSON.stringify({ status: audit.status, coverage: audit.coverage, counts: audit.counts }, null, 2));
process.exit(audit.status === "PASS" ? 0 : 1);
