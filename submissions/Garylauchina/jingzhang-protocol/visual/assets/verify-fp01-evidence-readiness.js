#!/usr/bin/env node
"use strict";

/**
 * Validate the FP01 H0-H4 evidence-readiness register without claiming that
 * any external evidence exists. This standard-library-only verifier requires
 * every fieldwork, entity, budget, procurement, professional-review,
 * rehearsal, authorization, and outcome field to remain null or empty in the
 * submitted V0.12 register.
 *
 * Usage:
 *   node visual/assets/verify-fp01-evidence-readiness.js [register.json] [--json]
 */

const fs = require("node:fs");
const path = require("node:path");

const EXPECTED_GATE_IDS = ["H0", "H1", "H2", "H3", "H4"];
const EXPECTED_BASELINE_IDS = new Set(["D0-B01", "D0-B02", "D0-B03", "D0-B04", "D0-B05", "D0-B06"]);
const EXPECTED_REHEARSAL_EVENTS = new Set(["success", "refusal", "human_takeover", "exit_restoration"]);
const EXPECTED_REVIEW_IDS = new Set(["PR01", "PR02", "PR03", "PR04", "PR05"]);
const EXPECTED_CARRIER_CHECKLIST = new Set([
  "location_and_boundary",
  "ownership_or_use_permission",
  "existing_condition_and_dimensions",
  "heritage_constraints",
  "fire_and_egress",
  "utilities_and_energy",
  "transport_and_loading",
  "accessibility",
  "reversibility_and_restoration",
]);
const EXPECTED_ACCOUNTABILITY_ROLES = new Set([
  "accountable_service_owner_role",
  "site_or_asset_owner_role",
  "accountable_operating_role",
  "human_service_role",
  "data_rights_and_security_role",
  "independent_evaluation_role",
  "appeal_decision_role",
  "budget_authority_role",
  "procurement_and_legal_review_role",
  "public_evidence_custodian_role",
  "separate_authorizing_role",
]);
const EMPTY_BOUNDARY_FIELDS = new Set([
  "confirmed_sites",
  "named_accountable_entities",
  "confirmed_operators",
  "budget_amounts",
  "procurement_facts",
  "professional_approvals",
  "field_observations",
  "rehearsal_records",
  "measured_outcomes",
  "official_authorizations",
]);
const EXTERNAL_VALUE_KEYS = new Set([
  "decision_record_reference",
  "decision_date",
  "decision_signatories",
  "source_reference",
  "file_reference",
  "issuer_or_observer",
  "collected_at",
  "reviewed_at",
  "actual_value",
  "verification_result",
  "protocol_reference",
  "observer_role_acceptance",
  "observation_start",
  "observation_end",
  "sample_size",
  "candidate_count",
  "confirmed_carrier",
  "survey_reference",
  "ownership_or_permission_reference",
  "constraint_register_reference",
  "named_entities",
  "accepted_responsibilities",
  "conflict_of_interest_declarations",
  "signatures",
  "currency",
  "capital_budget_amount",
  "operating_budget_amount",
  "contingency_amount",
  "funding_source",
  "cost_basis_reference",
  "procurement_or_collaboration_route",
  "procurement_reference",
  "legal_review_reference",
  "budget_authority_signoff",
  "reviewer_name",
  "qualification_reference",
  "review_date",
  "report_reference",
  "independent_evaluator",
  "conflict_of_interest_declaration",
  "observed_at",
  "observed_value",
  "evidence_reference",
  "failure_or_uncertainty",
  "remedy_result",
  "separate_authorization_reference",
  "authorizing_entity",
  "authorizing_signatory",
  "authorized_scope",
  "authorization_date",
  "authorization_expiry",
  "revocation_route",
  "stop_trigger_acceptance",
  "staffed_baseline_restoration_record",
  "case_handover_record",
  "data_disposition_record",
  "asset_return_record",
  "public_record_handover",
]);
const PROHIBITED_POSITIVE_CLAIMS = [
  "fieldwork completed",
  "operator confirmed",
  "budget approved",
  "procurement awarded",
  "professional review passed",
  "rehearsal completed",
  "authorization granted",
  "outcome achieved",
  "现场调研已完成",
  "运营主体已确认",
  "预算已批准",
  "采购已授标",
  "专业审查已通过",
  "演练已完成",
  "已正式授权",
  "成效已实现",
];
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const CN_MOBILE_RE = /(^|\D)1[3-9]\d{9}(?!\d)/;
const CN_ID_RE = /(^|\D)\d{17}[0-9Xx](?!\d)/;

const STRUCTURAL_BOUNDARY =
  "Structural PASS only: zero external evidence gates are verified; no fieldwork, entity, budget, procurement, professional review, rehearsal, authorization, or outcome is proven.";

class ValidationFailure extends Error {}

function requireCondition(condition, message) {
  if (!condition) throw new ValidationFailure(message);
}

function requireObject(value, pointer) {
  requireCondition(value !== null && typeof value === "object" && !Array.isArray(value), `${pointer} must be an object`);
  return value;
}

function requireArray(value, pointer) {
  requireCondition(Array.isArray(value), `${pointer} must be an array`);
  return value;
}

function requireString(value, pointer) {
  requireCondition(typeof value === "string" && value.trim().length > 0, `${pointer} must be a non-empty string`);
  return value;
}

function requireFields(object, fields, pointer) {
  const missing = [...fields].filter((field) => !Object.hasOwn(object, field));
  requireCondition(missing.length === 0, `${pointer} missing required fields: ${missing.sort().join(", ")}`);
}

function setEquals(actual, expected) {
  return actual.size === expected.size && [...actual].every((value) => expected.has(value));
}

function requireExactSet(values, expected, pointer) {
  const actual = new Set(values);
  requireCondition(actual.size === values.length, `${pointer} must not contain duplicates`);
  requireCondition(setEquals(actual, expected), `${pointer} must contain exactly: ${[...expected].sort().join(", ")}`);
}

function byUniqueField(items, field, pointer) {
  const result = new Map();
  items.forEach((value, index) => {
    const item = requireObject(value, `${pointer}[${index}]`);
    const id = requireString(item[field], `${pointer}[${index}].${field}`);
    requireCondition(!result.has(id), `${pointer} contains duplicate ${field}: ${id}`);
    result.set(id, item);
  });
  return result;
}

function walk(value, pointer = "$") {
  const nodes = [{ pointer, key: null, value }];
  if (Array.isArray(value)) {
    value.forEach((child, index) => nodes.push(...walk(child, `${pointer}[${index}]`)));
  } else if (value !== null && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => {
      nodes.push({ pointer: `${pointer}.${key}`, key, value: child });
      nodes.push(...walk(child, `${pointer}.${key}`).slice(1));
    });
  }
  return nodes;
}

function checkEnvelope(register) {
  requireFields(register, new Set([
    "$schema", "artifact_id", "artifact_version", "pilot_id", "contract_id",
    "title_zh", "title_en", "language_contract", "artifact_status",
    "advancement_rule", "hold_points", "d0_baseline_register",
    "candidate_carrier_intake", "accountability_register",
    "cost_and_procurement_register", "professional_review_register",
    "controlled_rehearsal_register", "authorization_and_exit_register",
    "evidence_boundary", "structural_claims", "verification",
  ]), "$");
  requireCondition(register.$schema === "local://jingzhang/fp01-evidence-readiness/v1", "unexpected $schema");
  requireCondition(register.artifact_id === "FP01-EVIDENCE-READINESS-001", "unexpected artifact_id");
  requireCondition(register.artifact_version === "v0.12", "artifact_version must be v0.12");
  requireCondition(register.pilot_id === "FP01", "pilot_id must be FP01");
  requireCondition(register.contract_id === "FP01-CONTRACT-001", "contract_id mismatch");
  requireCondition(register.language_contract === "embedded_bilingual_fields", "language_contract mismatch");
  requireString(register.title_zh, "$.title_zh");
  requireString(register.title_en, "$.title_en");
}

function checkPendingStatus(register) {
  const status = requireObject(register.artifact_status, "$.artifact_status");
  const expected = {
    readiness_status: "pending_external_evidence",
    verified_gate_count: 0,
    gate_count: 5,
    authorization_status: "not_authorized",
    fieldwork_status: "not_conducted",
    operator_confirmation_status: "unconfirmed",
    budget_status: "unknown",
    procurement_status: "not_procured",
    professional_review_status: "not_conducted",
    rehearsal_status: "not_conducted",
    outcome_status: "unknown",
  };
  requireFields(status, new Set([...Object.keys(expected), "scope_note_zh", "scope_note_en"]), "$.artifact_status");
  Object.entries(expected).forEach(([field, expectedValue]) => {
    requireCondition(status[field] === expectedValue, `$.artifact_status.${field} must be ${JSON.stringify(expectedValue)}`);
  });
  requireString(status.scope_note_zh, "$.artifact_status.scope_note_zh");
  requireString(status.scope_note_en, "$.artifact_status.scope_note_en");
}

function checkAdvancementRule(register) {
  const rule = requireObject(register.advancement_rule, "$.advancement_rule");
  requireCondition(JSON.stringify(rule.sequence) === JSON.stringify(EXPECTED_GATE_IDS), "advancement sequence must be H0-H4");
  requireCondition(rule.default_state === "pending_external_evidence", "default gate state mismatch");
  requireCondition(rule.gate_pass_rule === "all_required_evidence_items_independently_verifiable_and_gate_decision_cosigned", "gate pass rule mismatch");
  requireCondition(rule.failed_or_missing_rule === "stop_and_remain_concept_only", "missing evidence must stop the concept");
  requireCondition(rule.no_self_certification === true, "self-certification must be prohibited");
  requireCondition(rule.no_structural_pass_as_delivery_claim === true, "structural PASS must not become a delivery claim");
  requireCondition(rule.separate_authorization_after_h3 === true, "H4 must be separate authorization after H3");
  requireString(rule.rule_zh, "$.advancement_rule.rule_zh");
  requireString(rule.rule_en, "$.advancement_rule.rule_en");
}

function checkHoldPoints(register) {
  const holdPoints = requireArray(register.hold_points, "$.hold_points");
  const byId = byUniqueField(holdPoints, "hold_point_id", "$.hold_points");
  requireExactSet([...byId.keys()], new Set(EXPECTED_GATE_IDS), "$.hold_points[].hold_point_id");

  let evidenceItemCount = 0;
  EXPECTED_GATE_IDS.forEach((gateId, gateIndex) => {
    const gate = byId.get(gateId);
    requireString(gate.name_zh, `$.hold_points.${gateId}.name_zh`);
    requireString(gate.name_en, `$.hold_points.${gateId}.name_en`);
    requireCondition(gate.status === "pending_external_evidence", `${gateId} must remain pending_external_evidence`);
    requireCondition(gate.decision_state === "not_evaluated", `${gateId} must remain not_evaluated`);
    requireCondition(gate.advancement_allowed === false, `${gateId} must not allow advancement`);
    requireCondition(gate.missing_evidence_action === "stop_and_remain_concept_only", `${gateId} missing evidence action mismatch`);
    const expectedPrerequisites = EXPECTED_GATE_IDS.slice(0, gateIndex);
    requireCondition(
      JSON.stringify(gate.prerequisite_hold_points) === JSON.stringify(expectedPrerequisites),
      `${gateId} prerequisite chain mismatch`,
    );
    const roles = requireArray(gate.responsible_role_classes, `$.hold_points.${gateId}.responsible_role_classes`);
    requireCondition(roles.length >= 3 && roles.every((role) => typeof role === "string" && role.endsWith("_role")), `${gateId} needs role-class accountability`);
    const evidenceItems = requireArray(gate.required_evidence, `$.hold_points.${gateId}.required_evidence`);
    requireCondition(evidenceItems.length === 3, `${gateId} must define exactly three evidence items`);
    const expectedEvidenceIds = new Set([`${gateId}-E01`, `${gateId}-E02`, `${gateId}-E03`]);
    requireExactSet(evidenceItems.map((item) => item.evidence_id), expectedEvidenceIds, `$.hold_points.${gateId}.required_evidence[].evidence_id`);
    evidenceItems.forEach((item, index) => {
      const pointer = `$.hold_points.${gateId}.required_evidence[${index}]`;
      requireString(item.name_zh, `${pointer}.name_zh`);
      requireString(item.name_en, `${pointer}.name_en`);
      requireString(item.evidence_class, `${pointer}.evidence_class`);
      const minimum = requireArray(item.minimum_content, `${pointer}.minimum_content`);
      requireCondition(minimum.length >= 4 && minimum.every((value) => typeof value === "string" && value.length > 0), `${pointer}.minimum_content is incomplete`);
      requireCondition(item.status === "pending_external_evidence", `${pointer}.status must remain pending_external_evidence`);
      ["source_reference", "file_reference", "issuer_or_observer", "collected_at", "reviewed_at", "actual_value", "verification_result"].forEach((field) => {
        requireCondition(item[field] === null, `${pointer}.${field} must be null`);
      });
      evidenceItemCount += 1;
    });
  });
  requireCondition(byId.get("H4").separate_authorization_required === true, "H4 must require separate authorization");
  return evidenceItemCount;
}

function checkD0Baseline(register) {
  const baseline = requireObject(register.d0_baseline_register, "$.d0_baseline_register");
  requireCondition(baseline.status === "pending_external_evidence", "D0 baseline must remain pending external evidence");
  ["protocol_reference", "observer_role_acceptance", "observation_start", "observation_end"].forEach((field) => {
    requireCondition(baseline[field] === null, `$.d0_baseline_register.${field} must be null`);
  });
  const metrics = requireArray(baseline.metrics, "$.d0_baseline_register.metrics");
  const byId = byUniqueField(metrics, "baseline_id", "$.d0_baseline_register.metrics");
  requireExactSet([...byId.keys()], EXPECTED_BASELINE_IDS, "$.d0_baseline_register.metrics[].baseline_id");
  metrics.forEach((metric, index) => {
    const pointer = `$.d0_baseline_register.metrics[${index}]`;
    requireString(metric.name_zh, `${pointer}.name_zh`);
    requireString(metric.name_en, `${pointer}.name_en`);
    requireCondition(["ratio", "minutes"].includes(metric.unit), `${pointer}.unit is unsupported`);
    requireCondition(metric.actual_value === null, `${pointer}.actual_value must be null`);
    requireCondition(metric.sample_size === null, `${pointer}.sample_size must be null`);
    requireCondition(metric.source_reference === null, `${pointer}.source_reference must be null`);
    requireCondition(metric.status === "pending_external_evidence", `${pointer}.status must remain pending`);
  });
  return metrics.length;
}

function checkCarrierAndAccountability(register) {
  const carrier = requireObject(register.candidate_carrier_intake, "$.candidate_carrier_intake");
  requireCondition(carrier.status === "pending_external_evidence", "candidate carrier intake must remain pending");
  requireExactSet(requireArray(carrier.checklist, "$.candidate_carrier_intake.checklist"), EXPECTED_CARRIER_CHECKLIST, "$.candidate_carrier_intake.checklist");
  const accountability = requireObject(register.accountability_register, "$.accountability_register");
  requireCondition(accountability.status === "pending_external_evidence", "accountability register must remain pending");
  requireExactSet(requireArray(accountability.roles, "$.accountability_register.roles"), EXPECTED_ACCOUNTABILITY_ROLES, "$.accountability_register.roles");
}

function checkCostAndProfessionalReviews(register) {
  const cost = requireObject(register.cost_and_procurement_register, "$.cost_and_procurement_register");
  requireCondition(cost.status === "pending_external_evidence", "cost and procurement register must remain pending");
  const professional = requireObject(register.professional_review_register, "$.professional_review_register");
  requireCondition(professional.status === "pending_external_evidence", "professional reviews must remain pending");
  const reviews = requireArray(professional.reviews, "$.professional_review_register.reviews");
  const byId = byUniqueField(reviews, "review_id", "$.professional_review_register.reviews");
  requireExactSet([...byId.keys()], EXPECTED_REVIEW_IDS, "$.professional_review_register.reviews[].review_id");
  reviews.forEach((review, index) => {
    requireString(review.discipline, `$.professional_review_register.reviews[${index}].discipline`);
    ["reviewer_name", "qualification_reference", "review_date", "verification_result", "report_reference"].forEach((field) => {
      requireCondition(review[field] === null, `$.professional_review_register.reviews[${index}].${field} must be null`);
    });
  });
  return reviews.length;
}

function checkControlledRehearsal(register) {
  const rehearsal = requireObject(register.controlled_rehearsal_register, "$.controlled_rehearsal_register");
  requireCondition(rehearsal.status === "pending_external_evidence", "controlled rehearsal must remain pending");
  requireCondition(rehearsal.protocol_reference === null, "controlled rehearsal protocol_reference must be null");
  requireCondition(rehearsal.independent_evaluator === null, "independent evaluator must be null");
  requireCondition(rehearsal.conflict_of_interest_declaration === null, "conflict declaration must be null");
  const events = requireArray(rehearsal.events, "$.controlled_rehearsal_register.events");
  requireExactSet(events.map((event) => event.event_class), EXPECTED_REHEARSAL_EVENTS, "$.controlled_rehearsal_register.events[].event_class");
  events.forEach((event, index) => {
    const pointer = `$.controlled_rehearsal_register.events[${index}]`;
    requireCondition(event.run_status === "not_conducted", `${pointer}.run_status must be not_conducted`);
    ["observed_at", "observed_value", "evidence_reference", "failure_or_uncertainty", "remedy_result"].forEach((field) => {
      requireCondition(event[field] === null, `${pointer}.${field} must be null`);
    });
  });
  return events.length;
}

function checkAuthorizationAndBoundary(register) {
  const authorization = requireObject(register.authorization_and_exit_register, "$.authorization_and_exit_register");
  requireCondition(authorization.status === "pending_external_evidence", "authorization and exit register must remain pending");
  const boundary = requireObject(register.evidence_boundary, "$.evidence_boundary");
  EMPTY_BOUNDARY_FIELDS.forEach((field) => {
    requireCondition(Array.isArray(boundary[field]) && boundary[field].length === 0, `$.evidence_boundary.${field} must be an empty array`);
  });
  requireString(boundary.rule_zh, "$.evidence_boundary.rule_zh");
  requireString(boundary.rule_en, "$.evidence_boundary.rule_en");
}

function checkNoInventedExternalEvidence(register) {
  walk(register).forEach((node) => {
    if (node.key && EXTERNAL_VALUE_KEYS.has(node.key)) {
      requireCondition(node.value === null, `${node.pointer} is an external-evidence field and must be null`);
    }
    if (typeof node.value === "string") {
      const normalized = node.value.toLocaleLowerCase("en-US");
      PROHIBITED_POSITIVE_CLAIMS.forEach((claim) => {
        requireCondition(!normalized.includes(claim.toLocaleLowerCase("en-US")), `${node.pointer} contains prohibited positive execution claim: ${JSON.stringify(claim)}`);
      });
      requireCondition(!EMAIL_RE.test(node.value), `${node.pointer} contains an email address`);
      requireCondition(!CN_MOBILE_RE.test(node.value), `${node.pointer} contains a Chinese mobile number`);
      requireCondition(!CN_ID_RE.test(node.value), `${node.pointer} contains a Chinese ID-like value`);
    }
  });
}

function checkStructuralClaims(register, counts) {
  const claims = requireObject(register.structural_claims, "$.structural_claims");
  const expected = {
    evidence_gate_count: 5,
    evidence_gate_definition_coverage_ratio: 1.0,
    verified_evidence_gate_count: 0,
    required_evidence_item_count: counts.evidenceItemCount,
    d0_baseline_metric_definition_count: counts.baselineMetricCount,
    controlled_rehearsal_event_class_count: counts.rehearsalEventCount,
    external_evidence_artifact_verified_count: 0,
  };
  Object.entries(expected).forEach(([field, value]) => {
    requireCondition(claims[field] === value, `$.structural_claims.${field} must be ${value}`);
  });
  requireString(claims.claim_boundary_zh, "$.structural_claims.claim_boundary_zh");
  requireString(claims.claim_boundary_en, "$.structural_claims.claim_boundary_en");
}

function checkVerification(register) {
  const verification = requireObject(register.verification, "$.verification");
  requireCondition(verification.runtime === "nodejs_standard_library_only", "verification runtime mismatch");
  requireCondition(verification.script === "visual/assets/verify-fp01-evidence-readiness.js", "verification script path mismatch");
  requireCondition(verification.command === "node visual/assets/verify-fp01-evidence-readiness.js", "verification command mismatch");
  requireCondition(verification.passing_claim === "structural_completeness_and_zero_verified_external_evidence_only", "verification passing claim mismatch");
  requireString(verification.disclaimer_zh, "$.verification.disclaimer_zh");
  requireString(verification.disclaimer_en, "$.verification.disclaimer_en");
}

function validate(register) {
  const checks = [];
  function run(id, label, callback) {
    callback();
    checks.push({ id, label, status: "pass" });
  }

  let evidenceItemCount = 0;
  let baselineMetricCount = 0;
  let rehearsalEventCount = 0;
  let professionalReviewCount = 0;
  run("envelope", "V0.12 bilingual evidence-readiness envelope", () => checkEnvelope(register));
  run("pending_status", "all implementation and outcome statuses remain pending, unconfirmed, or unknown", () => checkPendingStatus(register));
  run("advancement_rule", "ordered H0-H4 gates with no bypass, self-certification, or automatic authorization", () => checkAdvancementRule(register));
  run("hold_points", "complete H0-H4 evidence definitions and stop rules", () => { evidenceItemCount = checkHoldPoints(register); });
  run("d0_baseline", "six unmeasured D0 baseline definitions", () => { baselineMetricCount = checkD0Baseline(register); });
  run("carrier_accountability", "carrier checklist and role-class accountability without named entities", () => checkCarrierAndAccountability(register));
  run("cost_professional", "empty cost/procurement fields and five pending professional reviews", () => { professionalReviewCount = checkCostAndProfessionalReviews(register); });
  run("controlled_rehearsal", "four required rehearsal event classes with no observed results", () => { rehearsalEventCount = checkControlledRehearsal(register); });
  run("authorization_boundary", "separate authorization, exit, handover, and empty evidence boundary", () => checkAuthorizationAndBoundary(register));
  run("anti_fabrication", "no external-evidence values, positive execution claims, or direct identifiers", () => checkNoInventedExternalEvidence(register));
  run("structural_claims", "structural counts reconcile while verified external evidence remains zero", () => checkStructuralClaims(register, { evidenceItemCount, baselineMetricCount, rehearsalEventCount }));
  run("verification", "standard-library verifier metadata and bounded PASS claim", () => checkVerification(register));

  return {
    status: "pass",
    artifact_id: register.artifact_id,
    artifact_version: register.artifact_version,
    hold_point_count: register.hold_points.length,
    required_evidence_item_count: evidenceItemCount,
    d0_baseline_metric_definition_count: baselineMetricCount,
    professional_review_definition_count: professionalReviewCount,
    controlled_rehearsal_event_class_count: rehearsalEventCount,
    verified_evidence_gate_count: 0,
    external_evidence_artifact_verified_count: 0,
    checks,
    disclaimer: STRUCTURAL_BOUNDARY,
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    process.stdout.write("Usage: node visual/assets/verify-fp01-evidence-readiness.js [register.json] [--json]\n");
    return;
  }
  const jsonOutput = args.includes("--json");
  const positional = args.filter((arg) => arg !== "--json");
  requireCondition(positional.length <= 1, "expected at most one register path");
  const registerPath = positional[0] ? path.resolve(positional[0]) : path.join(__dirname, "fp01-evidence-readiness.json");
  const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
  const result = validate(register);
  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  process.stdout.write(`PASS ${result.artifact_id} ${result.artifact_version}\n`);
  result.checks.forEach((check) => process.stdout.write(`  [PASS] ${check.id}: ${check.label}\n`));
  process.stdout.write(`  hold points: ${result.hold_point_count}; required evidence items: ${result.required_evidence_item_count}; verified gates: 0\n`);
  process.stdout.write(`  ${result.disclaimer}\n`);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`FAIL ${message}\n`);
  process.exitCode = 1;
}
