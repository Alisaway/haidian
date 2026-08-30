#!/usr/bin/env node
/**
 * SEB Localized Tabletop Runner — Jing-Zhang AI Innovation Belt (v1.8 adoption)
 * Zero-dependency offline validator for the localized SEB criteria set.
 * Mirror of the upstream SEB tabletop-run pattern (lqqk7, CC BY-SA 4.0).
 *
 * Run:  node seb-localized-tabletop-run.js
 * Exit 0 = all fixtures as expected. Exit 1 = failure. Exit 2 = spec incompatibility.
 * This proves only that the criteria are self-consistent and executable on the
 * fixtures; it does NOT prove any service is running, adopted, approved or
 * government-committed (see provenance.evidence_class = concept_only).
 */
"use strict";
const fs = require("fs");
const path = require("path");

function load(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf8"));
}

const spec = load("seb-localized-spec.json");
const fixtures = load("seb-localized-fixtures.json").fixtures;

// -- version compatibility check (mirrors upstream: must be 0.1.0) --
if (spec.version !== "0.1.0") {
  console.error("SPEC_VERSION_INCOMPATIBLE: expected 0.1.0, got " + spec.version);
  process.exit(2);
}

const REQUIRED = ["ai_off_path", "human_handoff", "gate_id", "operating_mode", "responsible_role"];
const SAME_SYSTEM_TOKENS = ["online", "线上", "self-service", "自助", "同系统", "线上办理", "网上"];
const GATE_BY_LEVEL = { "L0": "G0", "L1": "G1", "L2": "G2", "L3": "G3", "L4": "G3" };

function checkSlot(slot) {
  const problems = [];
  for (const f of REQUIRED) {
    const v = slot[f];
    if (typeof v !== "string" || v.trim() === "") {
      problems.push("MISSING_FIELD:" + f);
    }
  }
  const off = (slot.ai_off_path || "").toLowerCase();
  for (const tok of SAME_SYSTEM_TOKENS) {
    if (off.includes(tok.toLowerCase())) {
      problems.push("SAME_SYSTEM_PATH:" + tok);
      break;
    }
  }
  const lvl = slot.operating_mode;
  const expectedGate = GATE_BY_LEVEL[lvl];
  if (expectedGate && slot.gate_id !== expectedGate) {
    problems.push("GATE_MISMATCH:" + lvl + " requires " + expectedGate + " got " + slot.gate_id);
  }
  return problems;
}

let pass = 0, reject = 0, mismatch = 0;
for (const fx of fixtures) {
  const problems = checkSlot(fx.slot);
  const isExpectedPass = fx.expect === "pass" && problems.length === 0;
  const isExpectedReject = fx.expect === "reject" && problems.length > 0;
  if (isExpectedPass) { pass++; console.log("PASS " + fx.fixture_id); }
  else if (isExpectedReject) {
    reject++;
    console.log("REJECT " + fx.fixture_id + " (" + problems.join("; ") + ") expected=reject");
  } else {
    mismatch++;
    console.log("MISMATCH " + fx.fixture_id + " expected=" + fx.expect + " problems=" + (problems.join("; ") || "none"));
  }
}
console.log("---");
console.log("fixtures=" + fixtures.length + " pass=" + pass + " reject=" + reject + " mismatch=" + mismatch);
if (mismatch > 0 || fixtures.length !== pass + reject) {
  process.exit(1);
}
process.exit(0);
