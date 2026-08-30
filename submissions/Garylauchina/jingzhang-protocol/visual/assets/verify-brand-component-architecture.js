#!/usr/bin/env node
"use strict";

/**
 * Validate the Jing-Zhang brand, contribution-record, landmark, and reversible
 * public-space component architecture without claiming delivery.
 *
 * This verifier uses Node.js standard-library modules only. A PASS proves that
 * the proposal-internal architecture is complete and cross-referenced. It does
 * not prove authorization, siting, accountable operators, funding,
 * procurement, construction, operation, awards, measured outcomes, or public
 * benefit.
 *
 * Usage:
 *   node visual/assets/verify-brand-component-architecture.js [architecture.json] [--json]
 */

const fs = require("node:fs");
const path = require("node:path");

const EXPECTED_MASTER_BRAND = Object.freeze({
  name_zh: "京张，再次开路",
  name_en: "JING-ZHANG BREAKS NEW GROUND",
});
const EXPECTED_LOGO_ELEMENTS = new Set([
  "RAILWAY_TRUNK",
  "FORWARD_BRANCH",
  "RETURN_SWITCHBACK",
  "OPEN_BRACKET",
  "HUMAN_NODE",
]);
const EXPECTED_LAYER_IDS = new Set([
  "L1_MASTER_BRAND",
  "L2_FLAGSHIP_FAMILY",
  "L3_OPERATING_RHYTHM",
  "L4_CONTRIBUTION_RECORD",
  "L5_SPATIAL_EXPRESSION",
]);
const EXPECTED_FLAGSHIP_IDS = new Set(["FP01", "FP02", "FP03", "FP04", "FP05"]);
const EXPECTED_RITUALS = new Map([
  ["OR01", "quarterly"],
  ["OR02", "semiannual"],
  ["OR03", "annual"],
  ["OR04", "continuous"],
]);
const EXPECTED_CONTRIBUTION_CATEGORIES = new Set([
  "public_problem",
  "open_build",
  "independent_verification",
  "rights_stewardship",
  "failure_correction_and_capability_return",
]);
const EXPECTED_LANDMARKS = new Map([
  ["LM01", ["协议零号站", "Protocol Station Zero"]],
  ["LM02", ["城市智能试验场", "Civic AI Test Yard"]],
  ["LM03", ["京张贡献档案馆", "Jing-Zhang Commons Ledger"]],
]);
const EXPECTED_OPERATION_IDS = new Set([
  "OP-AI-CITY-API",
  "OP-TRUSTED-COMPACT",
  "OP-SEVEN-INTERFACES",
  "OP-CAPABILITY-RETURN",
]);
const EXPECTED_INTERFACE_IDS = new Set(["I1", "I2", "I3", "I4", "I5", "I6", "I7"]);
const EXPECTED_COMPONENTS = new Map([
  ["M01", ["选择门", "Choice Gate"]],
  ["M02", ["来源牌", "Provenance Panel"]],
  ["M03", ["有人台", "Staffed Desk"]],
  ["M04", ["回执坞", "Receipt Dock"]],
  ["M05", ["急停界面", "Emergency-Stop Interface"]],
  ["M06", ["贡献轨", "Contribution Rail"]],
]);
const EXPECTED_HOLD_POINT_IDS = new Set(["H0", "H1", "H2", "H3", "H4"]);
const EMPTY_EVIDENCE_FIELDS = new Set([
  "named_accountable_entities",
  "confirmed_operators",
  "budget_amounts",
  "procurement_facts",
  "confirmed_sites",
  "field_observations",
  "measured_outcomes",
  "current_awardees",
  "official_endorsements",
]);
const PROHIBITED_EXECUTION_FIELDS = new Set([
  "named_operator",
  "named_accountable_entity",
  "confirmed_operator",
  "budget_amount",
  "budget_value",
  "procurement_reference",
  "procurement_award",
  "construction_completion_date",
  "observed_value",
  "measured_value",
  "current_awardee",
  "official_endorsement",
]);

const STRUCTURAL_BOUNDARY =
  "Structural PASS only: no authorization, siting, operator, budget, procurement, construction, operation, award, measured outcome, or public-benefit claim is verified.";

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

function requireString(value, pointer) {
  requireCondition(typeof value === "string" && value.trim().length > 0, `${pointer} must be a non-empty string`);
  return value;
}

function requireBilingual(object, pointer, zhField = "name_zh", enField = "name_en") {
  requireString(object[zhField], `${pointer}.${zhField}`);
  requireString(object[enField], `${pointer}.${enField}`);
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
  requireCondition(
    setEquals(actual, expected),
    `${pointer} must contain exactly: ${[...expected].sort().join(", ")}`,
  );
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

function checkCoreEnvelope(architecture) {
  requireFields(
    architecture,
    new Set([
      "$schema",
      "artifact_id",
      "artifact_version",
      "title_zh",
      "title_en",
      "language_contract",
      "artifact_status",
      "master_brand",
      "logo_direction",
      "brand_architecture_layers",
      "flagship_programs",
      "operating_rituals",
      "honor_system",
      "landmarks",
      "cross_cutting_operations",
      "components",
      "delivery_hold_points",
      "evidence_boundary",
      "structural_claims",
    ]),
    "$",
  );
  requireCondition(
    architecture.$schema === "local://jingzhang/brand-component-architecture/v1",
    "unexpected $schema",
  );
  requireCondition(
    architecture.artifact_id === "BRAND-COMPONENT-ARCHITECTURE-001",
    "unexpected artifact_id",
  );
  requireCondition(architecture.language_contract === "embedded_bilingual_fields", "language_contract mismatch");
  requireBilingual(architecture, "$", "title_zh", "title_en");

  const status = requireObject(architecture.artifact_status, "$.artifact_status");
  const expected = {
    architecture_status: "concept_only",
    authorization_status: "not_authorized",
    official_identity_status: "not_official_identity",
    operator_confirmation_status: "unconfirmed",
    site_survey_status: "not_conducted",
    procurement_status: "not_procured",
    budget_status: "unknown",
    measurement_status: "not_measured",
    outcome_status: "unknown",
  };
  requireFields(status, new Set([...Object.keys(expected), "scope_note_zh", "scope_note_en"]), "$.artifact_status");
  Object.entries(expected).forEach(([field, expectedValue]) => {
    requireCondition(status[field] === expectedValue, `$.artifact_status.${field} must be ${expectedValue}`);
  });
  requireBilingual(status, "$.artifact_status", "scope_note_zh", "scope_note_en");
}

function checkSingleMasterBrand(architecture) {
  const brand = requireObject(architecture.master_brand, "$.master_brand");
  requireCondition(brand.brand_count === 1, "master_brand.brand_count must be 1");
  requireCondition(brand.brand_id === "BRAND-MASTER-JZ-001", "master brand ID mismatch");
  requireCondition(brand.name_zh === EXPECTED_MASTER_BRAND.name_zh, "master brand Chinese name mismatch");
  requireCondition(brand.name_en === EXPECTED_MASTER_BRAND.name_en, "master brand English name mismatch");
  requireCondition(brand.role === "single_master_brand", "master brand role must be single_master_brand");
  requireCondition(brand.status === "concept_only", "master brand must remain concept_only");
  requireBilingual(brand, "$.master_brand", "promise_zh", "promise_en");
  requireBilingual(brand, "$.master_brand", "endorsement_rule_zh", "endorsement_rule_en");
}

function checkSingleLogoDirection(architecture) {
  const logo = requireObject(architecture.logo_direction, "$.logo_direction");
  requireCondition(logo.direction_count === 1, "logo_direction.direction_count must be 1");
  requireCondition(logo.logo_id === "LOGO-JZ-SWITCH-001", "logo ID mismatch");
  requireCondition(logo.name_zh === "开路符", "logo Chinese direction name must be 开路符");
  requireCondition(logo.name_en === "JZ SWITCH MARK", "logo English direction name must be JZ SWITCH MARK");
  requireCondition(logo.role === "single_identity_direction", "logo role must be single_identity_direction");
  requireCondition(logo.status === "concept_only", "logo direction must remain concept_only");
  requireCondition(logo.final_logo === false && logo.official_emblem === false, "logo cannot be final or official");
  requireBilingual(logo, "$.logo_direction", "design_rule_zh", "design_rule_en");
  const elements = byUniqueField(requireArray(logo.elements, "$.logo_direction.elements"), "element_id", "$.logo_direction.elements");
  requireExactSet([...elements.keys()], EXPECTED_LOGO_ELEMENTS, "$.logo_direction.elements[].element_id");
  elements.forEach((element, elementId) => {
    requireBilingual(element, `$.logo_direction.elements.${elementId}`);
    requireBilingual(element, `$.logo_direction.elements.${elementId}`, "meaning_zh", "meaning_en");
  });
  const constraints = new Set(requireArray(logo.application_constraints, "$.logo_direction.application_constraints"));
  for (const required of ["one_system_mark_only", "professional_identity_design_pending", "no_government_emblem_or_endorsement_claim"]) {
    requireCondition(constraints.has(required), `logo application constraint missing: ${required}`);
  }
}

function checkFiveLayerArchitecture(architecture) {
  const layers = byUniqueField(
    requireArray(architecture.brand_architecture_layers, "$.brand_architecture_layers"),
    "layer_id",
    "$.brand_architecture_layers",
  );
  requireExactSet([...layers.keys()], EXPECTED_LAYER_IDS, "$.brand_architecture_layers[].layer_id");
  layers.forEach((layer, layerId) => {
    requireBilingual(layer, `$.brand_architecture_layers.${layerId}`);
    requireCondition(
      requireArray(layer.member_refs, `$.brand_architecture_layers.${layerId}.member_refs`).length > 0,
      `${layerId} must contain member refs`,
    );
  });
  requireExactSet(layers.get("L2_FLAGSHIP_FAMILY").member_refs, EXPECTED_FLAGSHIP_IDS, "L2 flagship refs");
  requireExactSet(layers.get("L3_OPERATING_RHYTHM").member_refs, new Set(EXPECTED_RITUALS.keys()), "L3 ritual refs");
  requireCondition(
    layers.get("L4_CONTRIBUTION_RECORD").member_refs.length === 1 &&
      layers.get("L4_CONTRIBUTION_RECORD").member_refs[0] === "CONTRIBUTION-RECORD-JZ-001",
    "L4 must reference the single contribution record",
  );
}

function checkFiveFlagships(architecture) {
  const flagships = byUniqueField(
    requireArray(architecture.flagship_programs, "$.flagship_programs"),
    "flagship_id",
    "$.flagship_programs",
  );
  requireExactSet([...flagships.keys()], EXPECTED_FLAGSHIP_IDS, "$.flagship_programs[].flagship_id");
  flagships.forEach((flagship, flagshipId) => {
    requireBilingual(flagship, `$.flagship_programs.${flagshipId}`);
    requireString(flagship.capability_role, `$.flagship_programs.${flagshipId}.capability_role`);
    requireCondition(
      flagship.family_relationship === "descriptor_under_master_brand",
      `${flagshipId} must remain a descriptor under the master brand`,
    );
    requireCondition(flagship.status === "concept_only", `${flagshipId} must remain concept_only`);
  });
}

function checkFourOperatingRituals(architecture) {
  const rituals = byUniqueField(
    requireArray(architecture.operating_rituals, "$.operating_rituals"),
    "ritual_id",
    "$.operating_rituals",
  );
  requireExactSet([...rituals.keys()], new Set(EXPECTED_RITUALS.keys()), "$.operating_rituals[].ritual_id");
  EXPECTED_RITUALS.forEach((cadence, ritualId) => {
    const ritual = rituals.get(ritualId);
    requireCondition(ritual.cadence === cadence, `${ritualId} cadence must be ${cadence}`);
    requireBilingual(ritual, `$.operating_rituals.${ritualId}`);
    requireBilingual(ritual, `$.operating_rituals.${ritualId}`, "purpose_zh", "purpose_en");
    requireCondition(
      ritual.status === "proposed_not_scheduled" || ritual.status === "proposed_not_operating",
      `${ritualId} must remain proposed and not active`,
    );
  });
}

function checkNonRankingHonorSystem(architecture) {
  const honor = requireObject(architecture.honor_system, "$.honor_system");
  requireCondition(honor.record_id === "CONTRIBUTION-RECORD-JZ-001", "contribution record ID mismatch");
  requireCondition(honor.name_zh === "京张贡献谱", "honor-system Chinese name mismatch");
  requireCondition(honor.name_en === "Jing-Zhang Contribution Record", "honor-system English name mismatch");
  requireCondition(
    honor.honor_system_type === "non_ranking_evidence_based_contribution_record",
    "honor system must be an evidence-based non-ranking contribution record",
  );
  requireCondition(honor.status === "concept_only", "honor system must remain concept_only");
  requireCondition(honor.ranking_people === false && honor.competitive_ranking === false, "honor system cannot rank people");
  requireCondition(
    requireArray(honor.current_awardees, "$.honor_system.current_awardees").length === 0,
    "honor system cannot contain current awardees",
  );
  requireCondition(
    requireArray(honor.current_recognized_contributors, "$.honor_system.current_recognized_contributors").length === 0,
    "honor system cannot contain current recognized contributors",
  );
  requireBilingual(honor, "$.honor_system", "recognition_rule_zh", "recognition_rule_en");
  const categories = byUniqueField(
    requireArray(honor.categories, "$.honor_system.categories"),
    "category_id",
    "$.honor_system.categories",
  );
  requireExactSet([...categories.keys()], EXPECTED_CONTRIBUTION_CATEGORIES, "$.honor_system.categories[].category_id");
  categories.forEach((category, categoryId) => {
    requireBilingual(category, `$.honor_system.categories.${categoryId}`);
    requireBilingual(category, `$.honor_system.categories.${categoryId}`, "evidence_zh", "evidence_en");
  });
}

function checkThreeLandmarks(architecture) {
  const landmarks = byUniqueField(requireArray(architecture.landmarks, "$.landmarks"), "landmark_id", "$.landmarks");
  requireExactSet([...landmarks.keys()], new Set(EXPECTED_LANDMARKS.keys()), "$.landmarks[].landmark_id");
  EXPECTED_LANDMARKS.forEach(([nameZh, nameEn], landmarkId) => {
    const landmark = landmarks.get(landmarkId);
    requireCondition(landmark.name_zh === nameZh && landmark.name_en === nameEn, `${landmarkId} bilingual name mismatch`);
    requireString(landmark.feature_ref, `$.landmarks.${landmarkId}.feature_ref`);
    requireBilingual(landmark, `$.landmarks.${landmarkId}`, "role_zh", "role_en");
    requireCondition(landmark.site_status === "provisional_pending_survey", `${landmarkId} site must remain provisional`);
    requireCondition(landmark.status === "concept_only", `${landmarkId} must remain concept_only`);
  });
}

function checkCrossCuttingOperations(architecture) {
  const operations = requireObject(architecture.cross_cutting_operations, "$.cross_cutting_operations");
  requireCondition(operations.status === "operating_layer_not_brand", "cross-cutting layer status mismatch");
  requireCondition(operations.is_secondary_brand === false, "cross-cutting operations cannot be a secondary brand");
  requireCondition(operations.brand_name_claim === false, "cross-cutting operations cannot make a brand-name claim");
  requireBilingual(operations, "$.cross_cutting_operations", "boundary_zh", "boundary_en");

  const items = byUniqueField(requireArray(operations.items, "$.cross_cutting_operations.items"), "operation_id", "$.cross_cutting_operations.items");
  requireExactSet([...items.keys()], EXPECTED_OPERATION_IDS, "$.cross_cutting_operations.items[].operation_id");
  items.forEach((item, operationId) => {
    requireBilingual(item, `$.cross_cutting_operations.items.${operationId}`);
    requireString(item.role, `$.cross_cutting_operations.items.${operationId}.role`);
    requireCondition(item.brand_role === "none", `${operationId} cannot act as a brand`);
    requireCondition(item.status === "concept_only", `${operationId} must remain concept_only`);
  });

  const interfaces = byUniqueField(
    requireArray(operations.trusted_interfaces, "$.cross_cutting_operations.trusted_interfaces"),
    "interface_id",
    "$.cross_cutting_operations.trusted_interfaces",
  );
  requireExactSet([...interfaces.keys()], EXPECTED_INTERFACE_IDS, "$.cross_cutting_operations.trusted_interfaces[].interface_id");
  interfaces.forEach((item, interfaceId) => {
    requireBilingual(item, `$.cross_cutting_operations.trusted_interfaces.${interfaceId}`);
    requireCondition(item.status === "concept_only", `${interfaceId} must remain concept_only`);
  });
}

function checkSixComponentsAndRequiredFields(architecture) {
  const components = byUniqueField(requireArray(architecture.components, "$.components"), "component_id", "$.components");
  requireExactSet([...components.keys()], new Set(EXPECTED_COMPONENTS.keys()), "$.components[].component_id");
  EXPECTED_COMPONENTS.forEach(([nameZh, nameEn], componentId) => {
    const component = components.get(componentId);
    requireCondition(component.name_zh === nameZh && component.name_en === nameEn, `${componentId} bilingual name mismatch`);
    requireFields(
      component,
      new Set([
        "interface_refs",
        "flagship_refs",
        "landmark_refs",
        "reversibility",
        "accessibility",
        "power_data_mode",
        "installation_prerequisites",
        "removal_return_rule",
        "status",
      ]),
      `$.components.${componentId}`,
    );
    requireBilingual(component, `$.components.${componentId}`, "purpose_zh", "purpose_en");
    requireCondition(component.status === "concept_only", `${componentId} must remain concept_only`);
  });
}

function checkComponentMappings(architecture) {
  const components = byUniqueField(requireArray(architecture.components, "$.components"), "component_id", "$.components");
  const interfaceCoverage = new Set();
  const flagshipCoverage = new Set();
  const landmarkCoverage = new Set();

  components.forEach((component, componentId) => {
    const interfaceRefs = requireArray(component.interface_refs, `$.components.${componentId}.interface_refs`);
    const flagshipRefs = requireArray(component.flagship_refs, `$.components.${componentId}.flagship_refs`);
    const landmarkRefs = requireArray(component.landmark_refs, `$.components.${componentId}.landmark_refs`);
    requireCondition(interfaceRefs.length > 0, `${componentId} must map at least one interface`);
    requireCondition(flagshipRefs.length > 0, `${componentId} must map at least one flagship`);
    requireCondition(landmarkRefs.length > 0, `${componentId} must map at least one landmark`);
    requireCondition(new Set(interfaceRefs).size === interfaceRefs.length, `${componentId} interface refs must be unique`);
    requireCondition(new Set(flagshipRefs).size === flagshipRefs.length, `${componentId} flagship refs must be unique`);
    requireCondition(new Set(landmarkRefs).size === landmarkRefs.length, `${componentId} landmark refs must be unique`);
    interfaceRefs.forEach((value) => {
      requireCondition(EXPECTED_INTERFACE_IDS.has(value), `${componentId} has unknown interface ref: ${value}`);
      interfaceCoverage.add(value);
    });
    flagshipRefs.forEach((value) => {
      requireCondition(EXPECTED_FLAGSHIP_IDS.has(value), `${componentId} has unknown flagship ref: ${value}`);
      flagshipCoverage.add(value);
    });
    landmarkRefs.forEach((value) => {
      requireCondition(EXPECTED_LANDMARKS.has(value), `${componentId} has unknown landmark ref: ${value}`);
      landmarkCoverage.add(value);
    });
    requireExactSet(
      requireArray(component.installation_prerequisites, `$.components.${componentId}.installation_prerequisites`),
      EXPECTED_HOLD_POINT_IDS,
      `$.components.${componentId}.installation_prerequisites`,
    );
  });

  requireCondition(setEquals(interfaceCoverage, EXPECTED_INTERFACE_IDS), "component mapping must cover all seven interfaces");
  requireCondition(setEquals(flagshipCoverage, EXPECTED_FLAGSHIP_IDS), "component mapping must cover all five flagships");
  requireCondition(setEquals(landmarkCoverage, new Set(EXPECTED_LANDMARKS.keys())), "component mapping must cover all three landmarks");
}

function checkComponentReversibilityAndRights(architecture) {
  const components = byUniqueField(requireArray(architecture.components, "$.components"), "component_id", "$.components");
  components.forEach((component, componentId) => {
    const reversible = requireObject(component.reversibility, `$.components.${componentId}.reversibility`);
    requireCondition(reversible.demountable === true, `${componentId} must be demountable`);
    requireCondition(reversible.fixed_construction_claim === false, `${componentId} cannot claim fixed construction`);
    requireBilingual(reversible, `$.components.${componentId}.reversibility`, "description_zh", "description_en");

    const accessibility = requireObject(component.accessibility, `$.components.${componentId}.accessibility`);
    requireCondition(accessibility.professional_review_status === "pending", `${componentId} accessibility review must remain pending`);
    requireCondition(accessibility.non_digital_route_required === true, `${componentId} must retain a non-digital route`);
    requireBilingual(accessibility, `$.components.${componentId}.accessibility`, "requirements_zh", "requirements_en");

    const powerData = requireObject(component.power_data_mode, `$.components.${componentId}.power_data_mode`);
    requireString(powerData.mode, `$.components.${componentId}.power_data_mode.mode`);
    requireCondition(powerData.fixed_utility_claim === false, `${componentId} cannot claim fixed utility capacity`);
    requireCondition(powerData.personal_data_required === false, `${componentId} cannot require personal data`);
    requireCondition(powerData.network_required_for_core_rights === false, `${componentId} core rights cannot depend on network access`);

    const removal = requireObject(component.removal_return_rule, `$.components.${componentId}.removal_return_rule`);
    requireString(removal.trigger, `$.components.${componentId}.removal_return_rule.trigger`);
    requireBilingual(removal, `$.components.${componentId}.removal_return_rule`, "action_zh", "action_en");
    requireString(removal.completion_evidence, `$.components.${componentId}.removal_return_rule.completion_evidence`);
    requireCondition(removal.status === "proposed_not_executed", `${componentId} removal rule must remain unexecuted`);
  });
}

function checkFiveDeliveryHoldPoints(architecture) {
  const holdPoints = byUniqueField(
    requireArray(architecture.delivery_hold_points, "$.delivery_hold_points"),
    "hold_point_id",
    "$.delivery_hold_points",
  );
  requireExactSet([...holdPoints.keys()], EXPECTED_HOLD_POINT_IDS, "$.delivery_hold_points[].hold_point_id");
  holdPoints.forEach((holdPoint, holdPointId) => {
    requireBilingual(holdPoint, `$.delivery_hold_points.${holdPointId}`);
    requireCondition(holdPoint.status === "pending_evidence", `${holdPointId} must remain pending evidence`);
    requireCondition(holdPoint.decision_state === "not_evaluated", `${holdPointId} cannot claim an evaluated decision`);
    requireCondition(
      holdPoint.missing_evidence_action === "stop_and_remain_concept_only",
      `${holdPointId} must stop and remain concept_only when evidence is missing`,
    );
    const roles = requireArray(holdPoint.responsible_role_classes, `$.delivery_hold_points.${holdPointId}.responsible_role_classes`);
    requireCondition(roles.length >= 3, `${holdPointId} requires at least three role classes`);
    requireCondition(new Set(roles).size === roles.length, `${holdPointId} role classes must be unique`);
    roles.forEach((role, index) => {
      requireCondition(
        typeof role === "string" && role.endsWith("_role"),
        `$.delivery_hold_points.${holdPointId}.responsible_role_classes[${index}] must be an unnamed role class`,
      );
    });
    const evidenceZh = requireArray(holdPoint.required_evidence_zh, `$.delivery_hold_points.${holdPointId}.required_evidence_zh`);
    const evidenceEn = requireArray(holdPoint.required_evidence_en, `$.delivery_hold_points.${holdPointId}.required_evidence_en`);
    requireCondition(evidenceZh.length >= 3 && evidenceZh.length === evidenceEn.length, `${holdPointId} requires aligned bilingual evidence lists`);
    evidenceZh.forEach((value, index) => requireString(value, `$.delivery_hold_points.${holdPointId}.required_evidence_zh[${index}]`));
    evidenceEn.forEach((value, index) => requireString(value, `$.delivery_hold_points.${holdPointId}.required_evidence_en[${index}]`));
  });
  requireCondition(holdPoints.get("H4").separate_authorization_required === true, "H4 must require separate authorization");
}

function checkNoInventedExecutionEvidence(architecture) {
  const boundary = requireObject(architecture.evidence_boundary, "$.evidence_boundary");
  requireFields(boundary, new Set([...EMPTY_EVIDENCE_FIELDS, "rule_zh", "rule_en"]), "$.evidence_boundary");
  EMPTY_EVIDENCE_FIELDS.forEach((field) => {
    requireCondition(
      requireArray(boundary[field], `$.evidence_boundary.${field}`).length === 0,
      `$.evidence_boundary.${field} must stay empty`,
    );
  });
  requireBilingual(boundary, "$.evidence_boundary", "rule_zh", "rule_en");

  walk(architecture).forEach((node) => {
    if (node.key && PROHIBITED_EXECUTION_FIELDS.has(node.key)) {
      const emptyArray = Array.isArray(node.value) && node.value.length === 0;
      requireCondition(
        node.value === null || node.value === false || node.value === "unknown" || emptyArray,
        `${node.pointer} is an execution-evidence field and must be null, false, unknown, or empty`,
      );
    }
  });
}

function checkStructuralClaims(architecture) {
  const claims = requireObject(architecture.structural_claims, "$.structural_claims");
  const expected = {
    brand_architecture_layer_count: architecture.brand_architecture_layers.length,
    master_brand_count: architecture.master_brand.brand_count,
    logo_direction_count: architecture.logo_direction.direction_count,
    flagship_pilot_count: architecture.flagship_programs.length,
    operating_rhythm_count: architecture.operating_rituals.length,
    operating_ritual_count: architecture.operating_rituals.length,
    contribution_category_count: architecture.honor_system.categories.length,
    honor_evidence_category_count: architecture.honor_system.categories.length,
    landmark_count: architecture.landmarks.length,
    trusted_interface_count: architecture.cross_cutting_operations.trusted_interfaces.length,
    reversible_public_space_component_count: architecture.components.length,
    delivery_hold_point_count: architecture.delivery_hold_points.length,
    component_mapping_coverage_ratio: 1.0,
  };
  requireFields(claims, new Set([...Object.keys(expected), "claim_boundary_zh", "claim_boundary_en"]), "$.structural_claims");
  Object.entries(expected).forEach(([field, expectedValue]) => {
    requireCondition(claims[field] === expectedValue, `$.structural_claims.${field} must be ${expectedValue}`);
  });
  requireBilingual(claims, "$.structural_claims", "claim_boundary_zh", "claim_boundary_en");
}

const CHECKS = Object.freeze([
  { id: "core_boundary", label: "bilingual concept-only envelope", run: checkCoreEnvelope },
  { id: "master_brand", label: "one master brand", run: checkSingleMasterBrand },
  { id: "logo_direction", label: "one JZ SWITCH MARK direction with five required elements", run: checkSingleLogoDirection },
  { id: "brand_layers", label: "five-layer brand and spatial architecture", run: checkFiveLayerArchitecture },
  { id: "flagships", label: "five concept-only flagship programs", run: checkFiveFlagships },
  { id: "operating_rituals", label: "four proposed operating rituals", run: checkFourOperatingRituals },
  { id: "honor_system", label: "non-ranking contribution record with five evidence categories and no awardees", run: checkNonRankingHonorSystem },
  { id: "landmarks", label: "three provisional concept landmarks", run: checkThreeLandmarks },
  { id: "cross_cutting_operations", label: "AI City API, compact, seven interfaces, and return mechanism are not brands", run: checkCrossCuttingOperations },
  { id: "components", label: "six named components with all required fields", run: checkSixComponentsAndRequiredFields },
  { id: "component_mappings", label: "complete interface, flagship, landmark, and hold-point mappings", run: checkComponentMappings },
  { id: "component_rights", label: "demountable, accessible, offline-capable, and returnable component rules", run: checkComponentReversibilityAndRights },
  { id: "delivery_hold_points", label: "five pending hold points with stop rules and unnamed role classes", run: checkFiveDeliveryHoldPoints },
  { id: "evidence_boundary", label: "no invented operators, budgets, procurement, sites, observations, awards, or outcomes", run: checkNoInventedExecutionEvidence },
  { id: "structural_claims", label: "declared structural counts equal machine-readable contents", run: checkStructuralClaims },
]);

function validate(architecture) {
  const results = CHECKS.map((check) => {
    try {
      check.run(architecture);
      return { id: check.id, label: check.label, ok: true };
    } catch (error) {
      return {
        id: check.id,
        label: check.label,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
  const passed = results.filter((result) => result.ok).length;
  return {
    ok: passed === results.length,
    passed,
    total: results.length,
    summary: `${passed === results.length ? "PASS" : "FAIL"} ${passed}/${results.length}`,
    checks: results,
    boundary: STRUCTURAL_BOUNDARY,
  };
}

function parseArgs(argv) {
  let json = false;
  const positional = [];
  argv.forEach((argument) => {
    if (argument === "--json") json = true;
    else if (argument === "--help" || argument === "-h") positional.push("--help");
    else if (argument.startsWith("--")) throw new Error(`unknown option: ${argument}`);
    else positional.push(argument);
  });
  if (positional.includes("--help")) return { help: true, json, file: null };
  if (positional.length > 1) throw new Error("expected at most one architecture JSON path");
  return {
    help: false,
    json,
    file: positional[0] || path.join(__dirname, "brand-component-architecture.json"),
  };
}

function printHelp() {
  process.stdout.write(
    [
      "Usage:",
      "  node visual/assets/verify-brand-component-architecture.js [architecture.json] [--json]",
      "",
      STRUCTURAL_BOUNDARY,
      "",
    ].join("\n"),
  );
}

function printResult(result, jsonMode, file) {
  const payload = {
    artifact_path: path.resolve(file),
    artifact_id: "BRAND-COMPONENT-ARCHITECTURE-001",
    valid: result.ok,
    summary: result.summary,
    passed: result.passed,
    total: result.total,
    checks: result.checks,
    boundary: result.boundary,
  };
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return;
  }
  process.stdout.write(`${result.summary} — ${payload.artifact_id}\n`);
  result.checks.forEach((check) => {
    process.stdout.write(`${check.ok ? "✓" : "✗"} ${check.id}: ${check.label}${check.ok ? "" : ` — ${check.error}`}\n`);
  });
  process.stdout.write(`Boundary: ${result.boundary}\n`);
}

function printFatal(error, jsonMode, file) {
  const message = error instanceof Error ? error.message : String(error);
  if (jsonMode) {
    process.stdout.write(
      `${JSON.stringify(
        {
          artifact_path: file ? path.resolve(file) : null,
          artifact_id: "BRAND-COMPONENT-ARCHITECTURE-001",
          valid: false,
          summary: "ERROR 0/0",
          error: message,
          boundary: STRUCTURAL_BOUNDARY,
        },
        null,
        2,
      )}\n`,
    );
  } else {
    process.stderr.write(`ERROR — ${message}\nBoundary: ${STRUCTURAL_BOUNDARY}\n`);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return 0;
    }
    const raw = fs.readFileSync(options.file, "utf8");
    const architecture = JSON.parse(raw);
    const result = validate(requireObject(architecture, "$"));
    printResult(result, options.json, options.file);
    return result.ok ? 0 : 1;
  } catch (error) {
    printFatal(error, Boolean(options && options.json), options && options.file);
    return 2;
  }
}

if (require.main === module) process.exitCode = main();

module.exports = { validate };
