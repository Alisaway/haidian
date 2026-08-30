#!/usr/bin/env node
"use strict";

/**
 * Validate the FP01 executable-design contract without claiming field execution.
 *
 * This standard-library-only verifier checks the contract and its synthetic
 * receipt fixtures as structural evidence. It does not simulate people,
 * measure service performance, authorize a site, or verify an implemented
 * pilot.
 *
 * Usage:
 *   node visual/assets/verify-fp01-contract.js [contract.json] [--json]
 */

const fs = require("node:fs");
const path = require("node:path");

const REQUIRED_EVENT_CLASSES = new Set([
  "success",
  "refusal",
  "human_takeover",
  "exit_restoration",
]);
const REQUIRED_GATE_IDS = new Set(["D0", "D30", "D60", "D90", "D100"]);
const REQUIRED_SITE_IDS = new Set([
  "ROOM-TEST-001",
  "PUBLIC-TEST-001",
  "PROV-KEY-002",
]);
const REQUIRED_RIGHTS = new Set(["appeal", "deletion", "exit"]);
const REQUIRED_RECEIPT_FIELDS = new Set([
  "receipt_id",
  "event_class",
  "fixture_status",
  "synthetic_case_ref",
  "smartphone_required",
  "ai_only_path",
  "ai_assistance_state",
  "human_confirmation",
  "service_outcome",
  "rights",
  "expected_state_transition",
  "direct_personal_data",
]);
const FORBIDDEN_DIRECT_IDENTIFIER_KEYS = new Set([
  "name",
  "full_name",
  "email",
  "phone",
  "postal_address",
  "government_id",
  "id_card",
  "passport_number",
  "wechat_id",
  "device_id",
  "ip_address",
  "biometric_template",
  "face_image",
  "raw_free_text",
]);
const FORBIDDEN_EXECUTION_KEYS = new Set([
  "signed_at",
  "executed_at",
  "deployed_at",
  "implemented_at",
  "observed_at",
  "measured_at",
  "fieldwork_date",
  "procurement_reference",
  "award_reference",
  "observed_value",
  "measured_value",
]);
const POSITIVE_EXECUTION_CLAIMS = [
  "contract was signed",
  "contract has been signed",
  "service was deployed",
  "pilot was implemented",
  "baseline was measured",
  "threshold was achieved",
  "government approved this pilot",
  "合同已签署",
  "服务已部署",
  "试点已实施",
  "基线已测得",
  "门槛已达成",
  "已完成删除",
  "项目已获批",
];
const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const CN_MOBILE_RE = /(^|\D)1[3-9]\d{9}(?!\d)/;
const CN_ID_RE = /(^|\D)\d{17}[0-9Xx](?!\d)/;

class ValidationFailure extends Error {}

function requireCondition(condition, message) {
  if (!condition) throw new ValidationFailure(message);
}

function requireObject(value, pointer) {
  requireCondition(
    value !== null && typeof value === "object" && !Array.isArray(value),
    `${pointer} must be an object`,
  );
  return value;
}

function requireArray(value, pointer) {
  requireCondition(Array.isArray(value), `${pointer} must be an array`);
  return value;
}

function requireFields(object, fields, pointer) {
  const missing = [...fields].filter((field) => !Object.hasOwn(object, field));
  requireCondition(
    missing.length === 0,
    `${pointer} missing required fields: ${missing.sort().join(", ")}`,
  );
}

function setEquals(actual, expected) {
  return actual.size === expected.size && [...actual].every((item) => expected.has(item));
}

function requireExactSet(values, expected, pointer) {
  const actual = new Set(values);
  requireCondition(
    actual.size === values.length,
    `${pointer} must not contain duplicate values`,
  );
  requireCondition(
    setEquals(actual, expected),
    `${pointer} must contain exactly: ${[...expected].sort().join(", ")}`,
  );
}

function walk(value, pointer = "$") {
  const nodes = [{ pointer, key: null, value }];
  if (Array.isArray(value)) {
    value.forEach((child, index) => nodes.push(...walk(child, `${pointer}[${index}]`)));
  } else if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      nodes.push({ pointer: `${pointer}.${key}`, key, value: child });
      nodes.push(...walk(child, `${pointer}.${key}`).slice(1));
    }
  }
  return nodes;
}

function byUniqueField(items, field, pointer) {
  const map = new Map();
  for (let index = 0; index < items.length; index += 1) {
    const item = requireObject(items[index], `${pointer}[${index}]`);
    requireCondition(typeof item[field] === "string" && item[field], `${pointer}[${index}].${field} is required`);
    requireCondition(!map.has(item[field]), `${pointer} contains duplicate ${field}: ${item[field]}`);
    map.set(item[field], item);
  }
  return map;
}

function checkTopLevel(contract) {
  requireFields(contract, new Set([
    "$schema", "artifact_id", "artifact_version", "contract_id", "pilot_id",
    "title_zh", "title_en", "artifact_status", "single_problem_rule",
    "service_problem", "design_persona", "site_binding", "spatial_prototypes",
    "service_channels", "accountability_roles", "service_catalogue_contract",
    "service_journey", "d0_human_service_baseline", "work_packages",
    "contract_gates", "contract_clauses", "design_thresholds",
    "data_minimization", "receipt_contract", "illustrative_receipts",
    "exit_and_restoration_protocol", "verification",
  ]), "$");
  requireCondition(contract.$schema === "local://jingzhang/fp01-contract-evidence/v1", "unexpected $schema");
  requireCondition(contract.artifact_id === "FP01-CONTRACT-EVIDENCE-001", "unexpected artifact_id");
  requireCondition(contract.contract_id === "FP01-CONTRACT-001", "unexpected contract_id");
  requireCondition(contract.pilot_id === "FP01", "unexpected pilot_id");
  requireCondition(Boolean(contract.title_zh) && Boolean(contract.title_en), "bilingual titles are required");
}

function checkUnexecutedBoundary(contract) {
  const status = requireObject(contract.artifact_status, "$.artifact_status");
  const expected = {
    proposal_status: "proposed_not_executed",
    contract_status: "concept_template_unexecuted",
    authorization_status: "not_authorized",
    procurement_status: "not_procured",
    deployment_status: "not_deployed",
    fieldwork_status: "not_conducted",
    measurement_status: "pending_measurement",
    outcome_status: "unknown",
  };
  requireFields(status, new Set(Object.keys(expected)), "$.artifact_status");
  for (const [key, expectedValue] of Object.entries(expected)) {
    requireCondition(status[key] === expectedValue, `$.artifact_status.${key} must be ${JSON.stringify(expectedValue)}`);
  }
  for (const node of walk(contract)) {
    if (node.key && FORBIDDEN_EXECUTION_KEYS.has(node.key)) {
      requireCondition(node.value === null, `${node.pointer} is an execution-evidence field and must be null`);
    }
    if (typeof node.value === "string") {
      const lower = node.value.toLocaleLowerCase("en-US");
      for (const phrase of POSITIVE_EXECUTION_CLAIMS) {
        requireCondition(
          !lower.includes(phrase.toLocaleLowerCase("en-US")),
          `${node.pointer} contains prohibited positive execution claim: ${JSON.stringify(phrase)}`,
        );
      }
    }
  }
}

function checkSingleProblem(contract) {
  const rule = requireObject(contract.single_problem_rule, "$.single_problem_rule");
  requireCondition(rule.service_problem_scenario_id === "S07", "S07 must be the only user service problem");
  requireCondition(rule.evaluation_scenario_id === "S03", "S03 must be evaluation only");
  requireCondition(rule.interface_support_scenario_id === "S04", "S04 must be interface support only");
  const roles = requireArray(rule.scenario_roles, "$.single_problem_rule.scenario_roles");
  const byId = byUniqueField(roles, "scenario_id", "$.single_problem_rule.scenario_roles");
  requireExactSet([...byId.keys()], new Set(["S03", "S04", "S07"]), "$.single_problem_rule.scenario_roles[].scenario_id");
  const userServices = roles.filter((item) => item.is_user_service_problem === true);
  requireCondition(userServices.length === 1 && userServices[0].scenario_id === "S07", "exactly S07 must be marked as the user service problem");
  requireCondition(byId.get("S07").role === "only_user_service_problem", "S07 role mismatch");
  requireCondition(byId.get("S03").role === "evaluation_only" && byId.get("S03").is_user_service_problem === false, "S03 role mismatch");
  requireCondition(byId.get("S04").role === "interface_support_only" && byId.get("S04").is_user_service_problem === false, "S04 role mismatch");

  const problem = requireObject(contract.service_problem, "$.service_problem");
  requireCondition(problem.problem_id === "FP01-S07-PROBLEM-001", "service problem ID mismatch");
  requireCondition(problem.status === "design_question_not_field_verified", "service problem must remain field-unverified");
  requireCondition(problem.service_scope === "learning_or_career_service_discovery_and_human_confirmed_referral", "service scope mismatch");
  requireCondition(problem.success_definition_status === "proposed_not_measured", "success definition must remain unmeasured");
  requireCondition(Boolean(problem.question_zh) && Boolean(problem.question_en), "bilingual design question required");
}

function checkPersonaAndSite(contract) {
  const persona = requireObject(contract.design_persona, "$.design_persona");
  requireCondition(persona.persona_id === "FP01-PERSONA-COMPOSITE-001", "persona ID mismatch");
  requireCondition(persona.persona_type === "fictional_composite_design_persona", "persona must be a fictional composite");
  for (const field of ["is_real_person", "is_research_participant", "is_fieldwork_subject"]) {
    requireCondition(persona[field] === false, `$.design_persona.${field} must be false`);
  }
  requireCondition(persona.evidence_basis === "design_reasoning_only_not_empirical_user_research", "persona evidence boundary mismatch");
  requireCondition(Array.isArray(persona.direct_identifiers) && persona.direct_identifiers.length === 0, "persona must contain no direct identifiers");
  requireCondition(persona.mobility_mode_status === "synthetic_accessibility_design_test_condition", "mobility mode must remain a synthetic test condition");
  const needs = new Set(requireArray(persona.design_needs, "$.design_persona.design_needs"));
  for (const need of ["no_smartphone_required", "non_ai_catalogue_available", "human_confirmation_before_referral", "exit_and_baseline_restoration"]) {
    requireCondition(needs.has(need), `design persona missing required need: ${need}`);
  }

  const site = requireObject(contract.site_binding, "$.site_binding");
  requireCondition(site.provisional === true && site.official_siting === false, "site must be provisional and not officially sited");
  requireCondition(site.binding_status === "provisional_concept_binding", "site binding status mismatch");
  requireCondition(site.survey_status === "unknown" && site.ownership_status === "unknown" && site.operating_permission_status === "unknown", "site survey, ownership, and permission must remain unknown");
  requireExactSet(requireArray(site.required_feature_ids, "$.site_binding.required_feature_ids"), REQUIRED_SITE_IDS, "$.site_binding.required_feature_ids");
  const featureMap = byUniqueField(requireArray(site.features, "$.site_binding.features"), "feature_id", "$.site_binding.features");
  requireExactSet([...featureMap.keys()], REQUIRED_SITE_IDS, "$.site_binding.features[].feature_id");
}

function checkSpatialPrototypes(contract) {
  const prototypes = requireArray(contract.spatial_prototypes, "$.spatial_prototypes");
  requireCondition(prototypes.length === 3, "spatial_prototypes must contain exactly three scales");
  const byScale = byUniqueField(prototypes, "scale_id", "$.spatial_prototypes");
  requireExactSet([...byScale.keys()], new Set(["SCALE-1-500", "SCALE-1-100", "SCALE-1-50"]), "$.spatial_prototypes[].scale_id");
  const expectedDrawings = new Map([
    ["SCALE-1-500", "1:500"],
    ["SCALE-1-100", "1:100"],
    ["SCALE-1-50", "1:50"],
  ]);
  for (const [scaleId, prototype] of byScale) {
    const pointer = `$.spatial_prototypes.${scaleId}`;
    requireCondition(prototype.drawing_scale === expectedDrawings.get(scaleId), `${pointer}.drawing_scale mismatch`);
    requireCondition(prototype.status === "concept_spatial_prototype_not_executed", `${pointer} must remain unexecuted`);
    requireCondition(prototype.dimension_status === "concept_dimension_pending_survey", `${pointer} dimension status mismatch`);
    requireCondition(prototype.official_siting === false && prototype.existing_condition_claim === false, `${pointer} cannot claim official siting or existing conditions`);
    requireCondition(prototype.survey_status === "pending", `${pointer} survey must remain pending`);
    requireCondition(prototype.primary_binding_feature_id === "ROOM-TEST-001", `${pointer} must bind ROOM-TEST-001`);
    const dimensions = requireArray(prototype.concept_dimensions, `${pointer}.concept_dimensions`);
    requireCondition(dimensions.length > 0, `${pointer} requires concept dimensions`);
    dimensions.forEach((dimension, index) => {
      const item = requireObject(dimension, `${pointer}.concept_dimensions[${index}]`);
      requireFields(item, new Set(["dimension_id", "dimension", "value", "unit", "status"]), `${pointer}.concept_dimensions[${index}]`);
      requireCondition(item.status === "concept_dimension_pending_survey", `${pointer}.concept_dimensions[${index}].status mismatch`);
    });
  }
}

function checkHumanAndNonAiChannels(contract) {
  const channels = requireObject(contract.service_channels, "$.service_channels");
  requireCondition(channels.smartphone_required === false, "smartphone must not be required");
  requireCondition(channels.ai_only_path_allowed === false, "AI-only path must not be allowed");
  requireCondition(channels.ai_assistance_optional === true, "AI assistance must remain optional");
  requireCondition(channels.account_required_for_entry === false, "account must not be required for entry");
  const requiredChannels = new Set(requireArray(channels.required_channels, "$.service_channels.required_channels"));
  for (const channel of ["staffed_walk_in_desk", "paper_or_staffed_non_ai_catalogue", "human_confirmation_and_appeal_desk"]) {
    requireCondition(requiredChannels.has(channel), `missing required human/non-AI channel: ${channel}`);
  }
  requireCondition(/named service professional/i.test(channels.human_authority_rule), "named human service authority rule required");

  const roles = byUniqueField(requireArray(contract.accountability_roles, "$.accountability_roles"), "role_id", "$.accountability_roles");
  for (const roleId of ["FP01-ROLE-SERVICE-PROFESSIONAL", "FP01-ROLE-APPEAL", "FP01-ROLE-DATA-RIGHTS", "FP01-ROLE-PROCUREMENT"]) {
    requireCondition(roles.has(roleId), `missing accountable human role: ${roleId}`);
    requireCondition(roles.get(roleId).status === "unconfirmed_design_role", `${roleId} must remain an unconfirmed design role`);
  }
}

function checkD0Baseline(contract) {
  const baseline = requireObject(contract.d0_human_service_baseline, "$.d0_human_service_baseline");
  requireCondition(baseline.baseline_id === "FP01-D0-HUMAN-BASELINE-001", "D0 baseline ID mismatch");
  requireCondition(baseline.definition_status === "proposed_control_pending_site_confirmation", "D0 definition must remain proposed");
  requireCondition(baseline.knowledge_status === "unknown", "D0 knowledge status must be unknown");
  requireCondition(baseline.measurement_status === "pending_measurement", "D0 measurement must remain pending");
  requireCondition(baseline.actual_service_status === "unknown", "actual D0 service status must be unknown");
  requireCondition(baseline.actual_values_claimed === false, "D0 must not claim actual values");
  requireCondition(Boolean(baseline.comparison_service_zh) && Boolean(baseline.comparison_service_en), "bilingual D0 human/non-AI comparison service required");
  const measurements = requireArray(baseline.baseline_measurements, "$.d0_human_service_baseline.baseline_measurements");
  requireCondition(measurements.length > 0, "D0 baseline measurements are required");
  measurements.forEach((measurement, index) => {
    const pointer = `$.d0_human_service_baseline.baseline_measurements[${index}]`;
    const item = requireObject(measurement, pointer);
    requireCondition(item.knowledge_status === "unknown", `${pointer}.knowledge_status must be unknown`);
    requireCondition(item.measurement_status === "pending_measurement", `${pointer}.measurement_status must be pending_measurement`);
    requireCondition(item.actual_value === null, `${pointer}.actual_value must be null`);
  });
}

function checkGatesAndClauses(contract) {
  const gates = requireArray(contract.contract_gates, "$.contract_gates");
  requireCondition(gates.length === 5, "contract_gates must contain exactly five gates");
  const gatesById = byUniqueField(gates, "gate_id", "$.contract_gates");
  requireExactSet([...gatesById.keys()], REQUIRED_GATE_IDS, "$.contract_gates[].gate_id");
  for (const [gateId, gate] of gatesById) {
    requireCondition(gate.status === "proposed_not_executed", `${gateId} must remain unexecuted`);
    requireCondition(gate.decision === "pending", `${gateId} decision must remain pending`);
    requireCondition(typeof gate.required_output === "string" && gate.required_output.length > 0, `${gateId} required_output is missing`);
  }
  requireCondition(/separately_authorized/.test(gatesById.get("D100").required_output), "D100 must require separate authorization");

  const clauses = requireArray(contract.contract_clauses, "$.contract_clauses");
  requireCondition(clauses.length === 12, "contract_clauses must contain exactly C01-C12");
  const clausesById = byUniqueField(clauses, "clause_id", "$.contract_clauses");
  const expectedClauses = new Set(Array.from({ length: 12 }, (_, index) => `C${String(index + 1).padStart(2, "0")}`));
  requireExactSet([...clausesById.keys()], expectedClauses, "$.contract_clauses[].clause_id");
  for (const [clauseId, clause] of clausesById) {
    requireCondition(clause.status === "proposed_not_executed", `${clauseId} must remain unexecuted`);
    requireCondition(clause.acceptance_state === "pending", `${clauseId} acceptance must remain pending`);
    requireCondition(Array.isArray(clause.evidence_paths) && clause.evidence_paths.length > 0, `${clauseId} needs evidence paths`);
  }
}

function checkJourneyCatalogueAndLimits(contract) {
  const journey = requireArray(contract.service_journey, "$.service_journey");
  requireCondition(journey.length === 7, "service journey must contain J01-J07");
  const steps = byUniqueField(journey, "step_id", "$.service_journey");
  requireExactSet([...steps.keys()], new Set(["J01", "J02", "J03", "J04", "J05", "J06", "J07"]), "$.service_journey[].step_id");
  journey.forEach((step, index) => {
    requireCondition(Boolean(step.action_zh) && Boolean(step.action_en), `$.service_journey[${index}] requires bilingual actions`);
    requireCondition(Boolean(step.human_or_non_ai_control), `$.service_journey[${index}] requires a human/non-AI control`);
  });

  const problem = requireObject(contract.service_problem, "$.service_problem");
  const excluded = new Set(requireArray(problem.excluded_decisions, "$.service_problem.excluded_decisions"));
  for (const decision of ["admission_eligibility", "employment_eligibility", "hiring_or_rejection", "automated_ranking_of_people"]) {
    requireCondition(excluded.has(decision), `missing prohibited automated decision: ${decision}`);
  }
  const catalogue = requireObject(contract.service_catalogue_contract, "$.service_catalogue_contract");
  requireCondition(catalogue.status === "illustrative_structure_pending_accountable_source", "service catalogue must remain illustrative");
  requireCondition(catalogue.illustrative_reference_is_live_service === false, "illustrative catalogue cannot claim a live service");
  const liveCount = requireObject(catalogue.live_catalogue_entry_count, "$.service_catalogue_contract.live_catalogue_entry_count");
  requireCondition(liveCount.knowledge_status === "unknown" && liveCount.actual_value === null, "live catalogue count must remain unknown/null");

  const packages = byUniqueField(requireArray(contract.work_packages, "$.work_packages"), "scenario_id", "$.work_packages");
  requireExactSet([...packages.keys()], new Set(["S03", "S04", "S07"]), "$.work_packages[].scenario_id");
  requireCondition(packages.get("S07").role === "service_delivery_problem", "S07 work package role mismatch");
  requireCondition(packages.get("S03").role === "independent_evaluation", "S03 work package role mismatch");
  requireCondition(packages.get("S04").role === "interface_support", "S04 work package role mismatch");
}

function checkReceipts(contract) {
  const receiptContract = requireObject(contract.receipt_contract, "$.receipt_contract");
  requireExactSet(requireArray(receiptContract.required_event_classes, "$.receipt_contract.required_event_classes"), REQUIRED_EVENT_CLASSES, "$.receipt_contract.required_event_classes");
  requireExactSet(requireArray(receiptContract.required_fields, "$.receipt_contract.required_fields"), REQUIRED_RECEIPT_FIELDS, "$.receipt_contract.required_fields");
  requireExactSet(requireArray(receiptContract.rights_required_on_every_receipt, "$.receipt_contract.rights_required_on_every_receipt"), REQUIRED_RIGHTS, "$.receipt_contract.rights_required_on_every_receipt");
  requireCondition(/synthetic fixtures/i.test(receiptContract.execution_boundary), "receipt execution boundary must identify synthetic fixtures");

  const receipts = requireArray(contract.illustrative_receipts, "$.illustrative_receipts");
  requireCondition(receipts.length === 4, "illustrative_receipts must contain exactly four fixtures");
  const byClass = byUniqueField(receipts, "event_class", "$.illustrative_receipts");
  requireExactSet([...byClass.keys()], REQUIRED_EVENT_CLASSES, "$.illustrative_receipts[].event_class");
  for (const [eventClass, receipt] of byClass) {
    const pointer = `$.illustrative_receipts.${eventClass}`;
    requireFields(receipt, REQUIRED_RECEIPT_FIELDS, pointer);
    requireCondition(receipt.fixture_status === "illustrative_not_observed", `${pointer} must remain an unobserved fixture`);
    requireCondition(/^SYNTHETIC-FP01-CASE-[A-Z]$/.test(receipt.synthetic_case_ref), `${pointer}.synthetic_case_ref must be synthetic`);
    requireCondition(receipt.smartphone_required === false && receipt.ai_only_path === false, `${pointer} must preserve smartphone-free and non-AI access`);
    const confirmation = requireObject(receipt.human_confirmation, `${pointer}.human_confirmation`);
    requireCondition(confirmation.required === true && Boolean(confirmation.authority_role), `${pointer} requires accountable human confirmation`);
    const outcome = requireObject(receipt.service_outcome, `${pointer}.service_outcome`);
    requireCondition(outcome.eligibility_decision_made === false, `${pointer} cannot make an eligibility decision`);
    const rights = requireObject(receipt.rights, `${pointer}.rights`);
    requireExactSet(Object.keys(rights), REQUIRED_RIGHTS, `${pointer}.rights`);
    for (const right of REQUIRED_RIGHTS) {
      requireCondition(requireObject(rights[right], `${pointer}.rights.${right}`).available === true, `${pointer} must make ${right} available`);
    }
    const directData = requireObject(receipt.direct_personal_data, `${pointer}.direct_personal_data`);
    requireCondition(directData.present === false && Array.isArray(directData.fields) && directData.fields.length === 0, `${pointer} must contain no direct personal data`);
  }
}

function checkDataMinimization(contract) {
  const policy = requireObject(contract.data_minimization, "$.data_minimization");
  for (const field of ["direct_personal_data_allowed", "central_raw_personal_data_pool_allowed", "raw_free_text_allowed_in_receipt", "biometric_data_allowed"]) {
    requireCondition(policy[field] === false, `$.data_minimization.${field} must be false`);
  }
  requireCondition(policy.retention_period_status === "unknown_pending_legal_and_operational_review", "retention period must remain unresolved");
  requireCondition(policy.retention_period_value === null, "retention period value must be null");
  requireExactSet(requireArray(policy.prohibited_direct_identifier_fields, "$.data_minimization.prohibited_direct_identifier_fields"), FORBIDDEN_DIRECT_IDENTIFIER_KEYS, "$.data_minimization.prohibited_direct_identifier_fields");
  const allowedPayload = new Set(requireArray(policy.allowed_receipt_payload_fields, "$.data_minimization.allowed_receipt_payload_fields"));
  for (const forbidden of FORBIDDEN_DIRECT_IDENTIFIER_KEYS) {
    requireCondition(!allowedPayload.has(forbidden), `forbidden identifier is allowed in receipt payload: ${forbidden}`);
  }
  for (const node of walk(contract)) {
    if (node.key && FORBIDDEN_DIRECT_IDENTIFIER_KEYS.has(node.key)) {
      const emptyArray = Array.isArray(node.value) && node.value.length === 0;
      requireCondition(node.value === null || node.value === "" || emptyArray, `${node.pointer} contains a direct identifier value`);
    }
    if (typeof node.value === "string") {
      requireCondition(!EMAIL_RE.test(node.value), `${node.pointer} appears to contain an email address`);
      requireCondition(!CN_MOBILE_RE.test(node.value), `${node.pointer} appears to contain a Chinese mobile number`);
      requireCondition(!CN_ID_RE.test(node.value), `${node.pointer} appears to contain a Chinese ID number`);
    }
  }
}

function checkExitRestoration(contract) {
  const protocol = requireObject(contract.exit_and_restoration_protocol, "$.exit_and_restoration_protocol");
  requireCondition(protocol.status === "proposed_not_executed", "exit protocol must remain unexecuted");
  const triggers = new Set(requireArray(protocol.trigger_routes, "$.exit_and_restoration_protocol.trigger_routes"));
  for (const trigger of ["user_requests_exit", "user_requests_human_takeover", "authorization_missing_or_withdrawn"]) {
    requireCondition(triggers.has(trigger), `exit protocol missing trigger: ${trigger}`);
  }
  const sequence = requireArray(protocol.required_sequence, "$.exit_and_restoration_protocol.required_sequence");
  for (const step of [
    "pause_optional_ai_assistance",
    "hand_control_to_named_human_role",
    "restore_staffed_and_non_ai_catalogue_path",
    "issue_portable_exit_receipt",
    "obtain_separate_completion_or_exception_acknowledgement",
  ]) {
    requireCondition(sequence.includes(step), `exit protocol missing required step: ${step}`);
  }
  requireCondition(/D0 baseline/i.test(protocol.non_degradation_rule), "exit must preserve the D0 human/non-AI baseline");
  requireCondition(protocol.actual_restoration_status === "unknown_pending_measurement", "actual restoration status must remain unknown");
  const exitReceipt = requireArray(contract.illustrative_receipts, "$.illustrative_receipts").find((receipt) => receipt.event_class === "exit_restoration");
  requireCondition(Boolean(exitReceipt), "exit-restoration receipt fixture is missing");
  requireCondition(exitReceipt.ai_assistance_state === "disabled_by_exit_request_in_fixture", "exit fixture must disable AI assistance");
  requireCondition(exitReceipt.expected_state_transition.includes("human_and_non_ai_baseline_restored"), "exit fixture must expect restoration of the human/non-AI baseline");
  requireCondition(exitReceipt.rights.exit.restoration_target === "human_and_non_ai_baseline", "exit right restoration target mismatch");
}

function checkVerificationScope(contract) {
  const verification = requireObject(contract.verification, "$.verification");
  requireCondition(verification.script === "visual/assets/verify-fp01-contract.js", "verification script path mismatch");
  requireCondition(verification.command === "node visual/assets/verify-fp01-contract.js", "verification command mismatch");
  requireCondition(verification.runtime === "nodejs_standard_library_only", "verification runtime must be Node.js standard library only");
  requireCondition(verification.verified_claim_scope === "structure_and_fixture_contract_only", "verification claim scope must remain structural only");
  const excluded = new Set(requireArray(verification.excluded_verification_claims, "$.verification.excluded_verification_claims"));
  for (const claim of [
    "contract_execution", "government_authorization", "site_confirmation",
    "service_operation", "baseline_value", "threshold_attainment",
    "deletion_completion", "public_benefit",
  ]) {
    requireCondition(excluded.has(claim), `verification scope must exclude: ${claim}`);
  }
}

const CHECKS = [
  ["01_top_level_contract_identity", checkTopLevel],
  ["02_unexecuted_and_unauthorized_boundary", checkUnexecutedBoundary],
  ["03_single_problem_and_scenario_roles", checkSingleProblem],
  ["04_fictional_persona_and_provisional_site", checkPersonaAndSite],
  ["05_three_scale_spatial_prototypes", checkSpatialPrototypes],
  ["06_human_and_non_ai_service_channels", checkHumanAndNonAiChannels],
  ["07_d0_unknown_null_baseline", checkD0Baseline],
  ["08_five_gates_and_c01_c12", checkGatesAndClauses],
  ["09_journey_catalogue_and_decision_limits", checkJourneyCatalogueAndLimits],
  ["10_four_synthetic_receipt_classes", checkReceipts],
  ["11_no_direct_personal_data", checkDataMinimization],
  ["12_exit_and_baseline_restoration", checkExitRestoration],
  ["13_structural_verification_scope", checkVerificationScope],
];

function parseArguments(argv) {
  let jsonOutput = false;
  let input = null;
  for (const argument of argv) {
    if (argument === "--json") {
      jsonOutput = true;
    } else if (argument === "--help" || argument === "-h") {
      return { help: true, jsonOutput, input };
    } else if (argument.startsWith("-")) {
      throw new Error(`unknown option: ${argument}`);
    } else if (input === null) {
      input = argument;
    } else {
      throw new Error(`unexpected argument: ${argument}`);
    }
  }
  return { help: false, jsonOutput, input };
}

function emitFatal(message, jsonOutput, inputPath = null) {
  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify({ status: "error", input: inputPath, error: message }, null, 2)}\n`);
  } else {
    process.stderr.write(`ERROR: ${message}\n`);
  }
}

function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    emitFatal(error.message, false);
    process.exitCode = 2;
    return;
  }
  if (options.help) {
    process.stdout.write("Usage: node visual/assets/verify-fp01-contract.js [contract.json] [--json]\n");
    return;
  }

  const inputPath = options.input
    ? path.resolve(process.cwd(), options.input)
    : path.join(__dirname, "fp01-contract.json");
  let contract;
  try {
    contract = requireObject(JSON.parse(fs.readFileSync(inputPath, "utf8")), "$");
  } catch (error) {
    emitFatal(`cannot load contract: ${error.message}`, options.jsonOutput, inputPath);
    process.exitCode = 2;
    return;
  }

  const results = CHECKS.map(([id, check]) => {
    try {
      check(contract);
      return { id, status: "pass" };
    } catch (error) {
      return { id, status: "fail", message: error.message };
    }
  });
  const passed = results.filter((result) => result.status === "pass").length;
  const failed = results.length - passed;
  const report = {
    artifact_id: contract.artifact_id || null,
    contract_id: contract.contract_id || null,
    input: inputPath,
    verified_claim_scope: "structure_and_fixture_contract_only",
    status: failed === 0 ? "pass" : "fail",
    passed,
    failed,
    total: results.length,
    checks: results,
    disclaimer: "A passing result is structural evidence only; it does not prove authorization, field execution, service performance, or public benefit.",
  };

  if (options.jsonOutput) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    process.stdout.write(`FP01 contract structural verifier\nInput: ${inputPath}\n`);
    for (const result of results) {
      const label = result.status === "pass" ? "PASS" : "FAIL";
      process.stdout.write(`${label} ${result.id}${result.message ? `: ${result.message}` : ""}\n`);
    }
    process.stdout.write(`${report.status.toUpperCase()}: ${passed}/${results.length} structural checks passed.\n`);
    process.stdout.write(`${report.disclaimer}\n`);
  }
  if (failed > 0) process.exitCode = 1;
}

main();
