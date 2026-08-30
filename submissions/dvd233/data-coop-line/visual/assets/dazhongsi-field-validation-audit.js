#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const assetsDir = __dirname;
const submissionDir = path.resolve(assetsDir, "..", "..");
const expectedPackId = "DAZHONGSI-FIELD-OPS-01";
const expectedMvpId = "DAZHONGSI-MVP-01";
const expectedFrozenMainSha = "a756675fa04d18aadfe606c89233f6efc0f19535";
const packRelative = "visual/assets/dazhongsi-field-validation-pack.json";
const checks = [];
let ok = true;

function check(id, condition, details) {
  const passed = Boolean(condition);
  checks.push({ id, passed, details });
  if (!passed) ok = false;
}

function readCarrier(relative, encoding = null) {
  const absolute = path.join(submissionDir, relative);
  try {
    const value = fs.readFileSync(absolute, encoding || undefined);
    check(`FILE_EXISTS:${relative}`, true, relative);
    return value;
  } catch (error) {
    check(`FILE_EXISTS:${relative}`, false, `${relative}: ${error.code || error.message}`);
    return null;
  }
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function countValue(value, target) {
  if (value === target) return 1;
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + countValue(item, target), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce((sum, item) => sum + countValue(item, target), 0);
  }
  return 0;
}

function unique(values) {
  return new Set(values).size === values.length;
}

const packBytes = readCarrier(packRelative);
let pack = {};
let packSha256 = null;
if (packBytes) {
  packSha256 = crypto.createHash("sha256").update(packBytes).digest("hex");
  try {
    pack = JSON.parse(packBytes.toString("utf8"));
    check("PACK_JSON_VALID", true, packRelative);
  } catch (error) {
    check("PACK_JSON_VALID", false, error.message);
  }
} else {
  check("PACK_JSON_VALID", false, "pack unavailable");
}

check("PACK_ID", pack.pack_id === expectedPackId, pack.pack_id);
check("MVP_ID", pack.mvp_id === expectedMvpId, pack.mvp_id);
check("PACK_HASH_SHA256", typeof packSha256 === "string" && /^[0-9a-f]{64}$/.test(packSha256), packSha256);
check("FROZEN_MAIN_SHA", pack.frozen_main_sha === expectedFrozenMainSha, pack.frozen_main_sha);
check("TEMPLATE_STATE", pack.template_state === "not_observed", pack.template_state);
check("FIELDWORK_AUTHORITY_UNKNOWN", pack.fieldwork_authorization_status === "unknown", pack.fieldwork_authorization_status);
check(
  "EVIDENCE_BOUNDARY",
  typeof pack.evidence_boundary?.statement_zh === "string"
    && typeof pack.evidence_boundary?.statement_en === "string"
    && pack.evidence_boundary.statement_zh.includes("不含现场观察")
    && pack.evidence_boundary.statement_en.includes("no field observations"),
  pack.evidence_boundary,
);
check("SCENARIO_SCOPE", same(pack.concept_refs?.scenario_ids, ["SCN-05", "SCN-09", "SCN-10"]), pack.concept_refs?.scenario_ids);

const expectedObservationEnums = ["not_observed", "observed", "invalidated"];
const expectedVerificationEnums = ["unknown", "verified", "failed", "not_applicable"];
const expectedWorkflowEnums = ["not_observed", "ready_for_field_review", "running", "paused", "stopped", "ready_for_resume", "closed"];
const expectedSignatureEnums = ["not_signed", "signed", "declined"];
check("OBSERVATION_ENUM", same(pack.status_enums?.observation, expectedObservationEnums), pack.status_enums?.observation);
check("VERIFICATION_ENUM", same(pack.status_enums?.verification, expectedVerificationEnums), pack.status_enums?.verification);
check("WORKFLOW_ENUM", same(pack.status_enums?.workflow, expectedWorkflowEnums), pack.status_enums?.workflow);
check("SIGNATURE_ENUM", same(pack.status_enums?.signature, expectedSignatureEnums), pack.status_enums?.signature);

const expectedPointIds = ["CP-ENTRANCE-01", "CP-ACCESS-01", "CP-SCN-05", "CP-SCN-09", "CP-SCN-10"];
const points = pack.collection_points || [];
check("COLLECTION_POINTS", same(points.map((item) => item.point_id), expectedPointIds), points.map((item) => item.point_id));
for (const point of points) {
  check(`POINT_UNOBSERVED:${point.point_id}`, point.observed_location === null && point.verification_status === "unknown", point);
}

const expectedRoutes = ["ROUTE-ARRIVAL-ACCESS-01", "ROUTE-DATA-PARTICIPATION-01", "ROUTE-NO-DATA-EQUIVALENT-01"];
const routes = pack.field_routes || [];
check("FIELD_ROUTES", same(routes.map((item) => item.route_id), expectedRoutes), routes.map((item) => item.route_id));
const measurementContracts = {
  journey_time: ["sample_count", "seconds", "started_at", "ended_at"],
  failure: ["attempts", "failures", "rate", "failure_codes"],
  price: ["cny"],
  accessibility: ["step_free", "obstruction_count", "assistive_notes"],
  human_takeover: ["triggered", "successful", "success_rate", "response_seconds"],
};
for (const route of routes) {
  check(`ROUTE_STATE:${route.route_id}`, route.route_status === "not_observed" && route.observed_path_geojson === null, route);
  check(`ROUTE_POINTS_KNOWN:${route.route_id}`, (route.point_ids || []).every((pointId) => expectedPointIds.includes(pointId)), route.point_ids);
  for (const [metric, fields] of Object.entries(measurementContracts)) {
    const record = route.measurements?.[metric];
    check(`MEASUREMENT_STATE:${route.route_id}:${metric}`, record?.status === "not_observed", record?.status);
    for (const field of fields) {
      check(`MEASUREMENT_NULL:${route.route_id}:${metric}:${field}`, record?.[field] === null, record?.[field]);
    }
  }
}

const roles = pack.raci?.roles || [];
const roleIds = roles.map((role) => role.role_id);
check("RACI_ROLE_COUNT", roles.length === 6 && unique(roleIds), roleIds);
for (const role of roles) {
  check(`RACI_UNASSIGNED:${role.role_id}`, role.assigned_entity === null && role.assignment_status === "unknown", role);
}
const activities = pack.raci?.activities || [];
check("RACI_ACTIVITY_COUNT", activities.length === 6, activities.map((item) => item.activity_id));
for (const activity of activities) {
  const assignmentKeys = Object.keys(activity.assignments || {});
  const values = Object.values(activity.assignments || {});
  check(`RACI_ONE_ACCOUNTABLE:${activity.activity_id}`, values.filter((value) => value === "A").length === 1, values);
  check(`RACI_HAS_RESPONSIBLE:${activity.activity_id}`, values.includes("R"), values);
  check(`RACI_ALLOWED_VALUES:${activity.activity_id}`, values.every((value) => ["R", "A", "C", "I"].includes(value)), values);
  check(`RACI_ALL_ROLES:${activity.activity_id}`, same(assignmentKeys, roleIds), assignmentKeys);
}

const workflow = pack.workflow_control || {};
check("WORKFLOW_NOT_STARTED", workflow.current_state === "not_observed", workflow.current_state);
for (const field of ["started_at", "stopped_at", "resumed_at", "closed_at"]) {
  check(`WORKFLOW_NULL:${field}`, workflow[field] === null, workflow[field]);
}
const startConditions = workflow.start_conditions || [];
const stopTriggers = workflow.stop_triggers || [];
const resumeConditions = workflow.resume_conditions || [];
check("START_CONDITION_COUNT", startConditions.length === 6, startConditions.map((item) => item.condition_id));
check("STOP_TRIGGER_COUNT", stopTriggers.length === 6, stopTriggers.map((item) => item.trigger_id));
check("RESUME_CONDITION_COUNT", resumeConditions.length === 4, resumeConditions.map((item) => item.condition_id));
for (const condition of startConditions) {
  check(`START_UNKNOWN:${condition.condition_id}`, condition.status === "unknown", condition.status);
}
for (const trigger of stopTriggers) {
  check(`STOP_UNOBSERVED:${trigger.trigger_id}`, trigger.status === "not_observed", trigger.status);
}
for (const condition of resumeConditions) {
  check(`RESUME_UNKNOWN:${condition.condition_id}`, condition.status === "unknown", condition.status);
}

const receipts = pack.evidence_receipts || [];
const evidenceIds = receipts.map((item) => item.evidence_id);
check("EVIDENCE_RECEIPT_COUNT", receipts.length === 11 && unique(evidenceIds), evidenceIds);
for (const receipt of receipts) {
  check(
    `EVIDENCE_UNOBSERVED:${receipt.evidence_id}`,
    receipt.status === "not_observed"
      && receipt.collected_at === null
      && receipt.file_ref === null
      && receipt.sha256 === null
      && receipt.signed_by === null,
    receipt,
  );
}
const referencedEvidenceIds = [
  ...points.map((item) => item.evidence_id),
  ...startConditions.map((item) => item.evidence_id),
  ...stopTriggers.map((item) => item.decision_evidence_id),
  ...resumeConditions.map((item) => item.evidence_id),
];
check("EVIDENCE_REFERENCES_RESOLVE", referencedEvidenceIds.every((evidenceId) => evidenceIds.includes(evidenceId)), referencedEvidenceIds);

const signoffs = pack.signoff_slots || [];
check("SIGNOFF_SLOT_COUNT", signoffs.length === 6 && same(signoffs.map((slot) => slot.role_id), roleIds), signoffs.map((slot) => slot.role_id));
for (const slot of signoffs) {
  check(
    `SIGNOFF_EMPTY:${slot.role_id}`,
    slot.status === "not_signed"
      && slot.name === null
      && slot.organization === null
      && slot.signed_at === null
      && slot.signature_ref === null,
    slot,
  );
}

check("NO_OBSERVED_ENUM", countValue(pack, "observed") === 1, { enum_declaration_only: countValue(pack, "observed") });
check("NO_VERIFIED_ENUM", countValue(pack, "verified") === 1, { enum_declaration_only: countValue(pack, "verified") });
check("NO_SIGNED_ENUM", countValue(pack, "signed") === 1, { enum_declaration_only: countValue(pack, "signed") });

const textCarriers = [
  ["proposal.md", "assets/figures/dazhongsi-field-validation-pack.png"],
  ["proposal.en.md", "assets/figures/dazhongsi-field-validation-pack.en.png"],
  ["report/proposal.html", "dazhongsi-field-validation-pack.png"],
  ["report/proposal.en.html", "dazhongsi-field-validation-pack.en.png"],
  ["visual/index.html", "dazhongsi-field-validation-pack.png"],
  ["visual/index.en.html", "dazhongsi-field-validation-pack.en.png"],
];
for (const [relative, figureRef] of textCarriers) {
  const text = readCarrier(relative, "utf8");
  check(`CARRIER_PACK_ID:${relative}`, text !== null && text.includes(expectedPackId), relative);
  check(`CARRIER_PACK_HASH:${relative}`, text !== null && packSha256 !== null && text.includes(packSha256), relative);
  check(`CARRIER_FIGURE:${relative}`, text !== null && text.includes(figureRef), figureRef);
}

const binaryCarriers = [
  ["assets/figures/dazhongsi-field-validation-pack.png", "png"],
  ["assets/figures/dazhongsi-field-validation-pack.en.png", "png"],
  ["drawings/a3-booklet.pdf", "pdf"],
  ["drawings/a3-booklet.en.pdf", "pdf"],
  ["drawings/a0-boards.pdf", "pdf"],
  ["drawings/a0-boards.en.pdf", "pdf"],
];
for (const [relative, kind] of binaryCarriers) {
  const bytes = readCarrier(relative);
  check(`BINARY_PACK_ID:${relative}`, bytes !== null && bytes.includes(Buffer.from(expectedPackId, "ascii")), relative);
  check(`BINARY_PACK_HASH:${relative}`, bytes !== null && packSha256 !== null && bytes.includes(Buffer.from(packSha256, "ascii")), relative);
  if (kind === "png") {
    const pngSignature = bytes?.subarray(0, 8).toString("hex");
    const width = bytes && bytes.length >= 24 ? bytes.readUInt32BE(16) : null;
    const height = bytes && bytes.length >= 24 ? bytes.readUInt32BE(20) : null;
    check(`PNG_SIGNATURE:${relative}`, pngSignature === "89504e470d0a1a0a", pngSignature);
    check(`PNG_DIMENSIONS:${relative}`, width === 2400 && height === 1500, { width, height });
  }
}

const output = {
  ok,
  submission_id: pack.submission_id || null,
  pack_id: pack.pack_id || expectedPackId,
  frozen_main_sha: pack.frozen_main_sha || null,
  pack_sha256: packSha256,
  template_state: pack.template_state || null,
  summary: {
    passed: checks.filter((item) => item.passed).length,
    failed: checks.filter((item) => !item.passed).length,
    routes: routes.length,
    collection_points: points.length,
    evidence_receipts: receipts.length,
    signoff_slots: signoffs.length,
    observed_values: 0,
  },
  checks,
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
process.exit(ok ? 0 : 1);
