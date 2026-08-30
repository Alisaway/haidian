#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const input = process.argv.find((arg) => arg.endsWith(".json")) || path.join(__dirname, "fp01-delivery-control.json");
const artifact = JSON.parse(fs.readFileSync(input, "utf8"));
const checks = [];

function check(id, label, condition) {
  checks.push({ id, label, status: condition ? "pass" : "fail" });
}

function unique(values) {
  return new Set(values).size === values.length;
}

function allNull(object, keys) {
  return keys.every((key) => object[key] === null);
}

check(
  "envelope",
  "V0.12 bilingual concept-delivery-control envelope",
  artifact.schema_version === "0.1.0" &&
    artifact.artifact_id === "FP01-DELIVERY-CONTROL-001" &&
    artifact.artifact_version === "v0.12" &&
    artifact.artifact_status === "concept_delivery_control_model_unexecuted" &&
    Boolean(artifact.title_zh) &&
    Boolean(artifact.title_en)
);

const boundary = artifact.claim_boundary || {};
check(
  "claim_boundary",
  "no survey, actual quantity, price, budget, entity, sign-off, or field result is claimed",
  [
    "actual_site_dimensions_verified",
    "actual_quantity_verified",
    "unit_price_verified",
    "budget_authorized",
    "named_entity_committed",
    "professional_signoff_obtained",
    "field_result_obtained"
  ].every((key) => boundary[key] === false) && Boolean(boundary.zh) && Boolean(boundary.en)
);

const prototypes = artifact.three_key_area_interface_prototypes || [];
check(
  "three_area_interfaces",
  "three distinct concept interfaces retain null site and professional evidence",
  prototypes.length === 3 &&
    unique(prototypes.map((item) => item.area_id)) &&
    prototypes.every((item) =>
      item.status === "pending_site_and_professional_evidence" &&
      item.reference_test_envelope &&
      item.reference_test_envelope.status === "concept_design_test_envelope_not_site_dimension" &&
      Number(item.reference_test_envelope.length_m) > 0 &&
      Number(item.reference_test_envelope.width_m) > 0 &&
      Array.isArray(item.component_refs) &&
      item.component_refs.length > 0 &&
      allNull(item, ["actual_site_dimension_m", "survey_reference", "professional_review_reference"])
    )
);

const methods = artifact.d0_measurement_methods || [];
check(
  "d0_methods",
  "six D0 methods define event boundaries, formula, missingness, and reporting without actuals",
  methods.length === 6 &&
    unique(methods.map((item) => item.baseline_id)) &&
    methods.every((item) =>
      item.status === "method_defined_actual_pending" &&
      Boolean(item.observation_start) &&
      Boolean(item.observation_end) &&
      Boolean(item.formula) &&
      Boolean(item.missingness_rule) &&
      Boolean(item.reporting) &&
      item.actual_sample_size === null &&
      item.actual_value === null
    )
);

const observation = artifact.formative_observation_protocol || {};
check(
  "formative_boundary",
  "planned formative floor is explicit and is not represented as a real sample or statistical proof",
  observation.status === "concept_protocol_requires_ethics_operator_and_user_review" &&
    observation.planned_minimum_valid_task_sessions === 30 &&
    observation.planned_minimum_service_days === 3 &&
    Array.isArray(observation.coverage_requirements) &&
    observation.coverage_requirements.length >= 6 &&
    Boolean(observation.inference_boundary_zh) &&
    Boolean(observation.inference_boundary_en) &&
    allNull(observation, ["actual_valid_task_sessions", "actual_service_days", "protocol_approval_reference"])
);

const raci = artifact.hold_point_raci || [];
check(
  "raci",
  "H0-H4 each have role-class RACI and empty external sign-off slots",
  raci.length === 5 &&
    JSON.stringify(raci.map((item) => item.hold_point_id)) === JSON.stringify(["H0", "H1", "H2", "H3", "H4"]) &&
    raci.every((item) =>
      ["accountable", "responsible", "consulted", "informed"].every((key) => Array.isArray(item[key]) && item[key].length > 0) &&
      item.status === "roles_defined_signoff_pending" &&
      allNull(item, ["signatory_name", "acceptance_date"])
    )
);

const boq = artifact.concept_installation_boq || {};
const boqItems = boq.items || [];
check(
  "design_test_boq",
  "M01-M06 have positive design-test quantities while actual quantities and prices remain null",
  boq.status === "design_test_quantities_only_not_actual_boq" &&
    boqItems.length === 6 &&
    JSON.stringify(boqItems.map((item) => item.component_ref)) === JSON.stringify(["M01", "M02", "M03", "M04", "M05", "M06"]) &&
    boqItems.every((item) =>
      Number(item.design_test_quantity) > 0 &&
      allNull(item, ["actual_quantity", "verified_unit_cost_cny", "verified_amount_cny"])
    )
);

check(
  "cost_boundary",
  "cost breakdown and calculation rule exist without invented budget, funding, route, or sign-off",
  Array.isArray(boq.cost_breakdown_structure) &&
    boq.cost_breakdown_structure.length === 7 &&
    Boolean(boq.calculation_rule) &&
    Boolean(boq.cost_basis_requirement) &&
    allNull(boq, [
      "capital_budget_amount_cny",
      "operating_budget_amount_cny",
      "contingency_amount_cny",
      "funding_source",
      "procurement_route",
      "legal_review_reference",
      "budget_authority_signoff"
    ])
);

const steps = artifact.critical_dependency_path || [];
const stepIds = steps.map((item) => item.step_id);
check(
  "critical_path",
  "ten ordered dependencies use valid references and retain empty actual dates",
  steps.length === 10 &&
    unique(stepIds) &&
    steps.every((item) =>
      Array.isArray(item.depends_on) &&
      item.depends_on.every((dependency) => stepIds.includes(dependency)) &&
      Array.isArray(item.may_run_in_parallel_with) &&
      item.may_run_in_parallel_with.every((parallel) => stepIds.includes(parallel)) &&
      item.status === "not_started" &&
      allNull(item, ["actual_start", "actual_finish"])
    )
);

const index = new Map(steps.map((item, position) => [item.step_id, position]));
check(
  "dependency_order",
  "every dependency precedes its consumer and no self-dependency is present",
  steps.every((item) => item.depends_on.every((dependency) => index.get(dependency) < index.get(item.step_id)))
);

const claims = artifact.structural_claims || {};
check(
  "structural_claims",
  "declared structural counts reconcile and external actual counts remain zero",
  claims.key_area_interface_prototype_count === prototypes.length &&
    claims.d0_measurement_method_count === methods.length &&
    claims.d0_measurement_method_coverage_ratio === 1.0 &&
    claims.hold_point_raci_count === raci.length &&
    claims.hold_point_raci_coverage_ratio === 1.0 &&
    claims.design_test_boq_item_count === boqItems.length &&
    claims.critical_dependency_step_count === steps.length &&
    claims.actual_boq_verified_item_count === 0 &&
    claims.verified_external_signoff_count === 0
);

check(
  "verification",
  "standard-library verifier metadata and bounded PASS claim",
  artifact.verification &&
    artifact.verification.script === "visual/assets/verify-fp01-delivery-control.js" &&
    artifact.verification.runtime === "Node.js standard library only" &&
    Boolean(artifact.verification.pass_claim)
);

const failed = checks.filter((item) => item.status === "fail");
const result = {
  status: failed.length === 0 ? "pass" : "fail",
  artifact_id: artifact.artifact_id,
  artifact_version: artifact.artifact_version,
  checks_passed: checks.length - failed.length,
  checks_total: checks.length,
  key_area_interface_prototype_count: prototypes.length,
  d0_measurement_method_count: methods.length,
  hold_point_raci_count: raci.length,
  design_test_boq_item_count: boqItems.length,
  critical_dependency_step_count: steps.length,
  actual_boq_verified_item_count: claims.actual_boq_verified_item_count,
  verified_external_signoff_count: claims.verified_external_signoff_count,
  checks,
  disclaimer: "Structural PASS only: no site, actual quantity, unit price, budget, entity, sign-off, authorization, field result, or implementation is verified."
};

process.stdout.write(`${JSON.stringify(result, null, process.argv.includes("--json") ? 2 : 0)}\n`);
process.exitCode = failed.length === 0 ? 0 : 1;
