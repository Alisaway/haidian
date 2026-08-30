#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ASSET_DIR = __dirname;
const PACKAGE_DIR = path.resolve(ASSET_DIR, "../..");
const REVIEW_PATH = path.join(ASSET_DIR, "evidence-chain-review.json");
const SOURCE_PATH = path.join(PACKAGE_DIR, "sources.json");
const METRICS_PATH = path.join(PACKAGE_DIR, "metrics.json");
const AUDIT_PATH = path.join(ASSET_DIR, "three-area-operations-audit.json");
const FIXTURE_DIR = path.join(ASSET_DIR, "evidence-chain-fixtures");

const REQUIRED_CLAIM_FIELDS = [
  "claim_id",
  "claim_zh",
  "claim_en",
  "claim_status",
  "evidence_state",
  "review_decision",
  "source_refs",
  "snapshot_refs",
  "metric_refs",
  "responsible_roles",
  "stop_condition_ids",
  "boundary_flags",
  "review_test",
];

const REQUIRED_BOUNDARY_FLAGS = [
  "external_level_claim",
  "official_endorsement",
  "deployment_authorized",
  "field_data",
  "performance_result",
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function fail(message, errors) {
  errors.push(message);
}

function validateReferenceArray(value, allowed, label, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${label} must be a non-empty array`, errors);
    return;
  }
  for (const id of value) {
    if (typeof id !== "string" || !allowed.has(id)) fail(`${label} references unknown ${id || "<missing>"}`, errors);
  }
}

function validateBoundaryFlags(flags, label, errors) {
  if (!flags || typeof flags !== "object") {
    fail(`${label}: boundary_flags are required`, errors);
    return;
  }
  for (const key of REQUIRED_BOUNDARY_FLAGS) {
    if (flags[key] !== false) fail(`${label}: boundary flag ${key} must be false`, errors);
  }
}

function validateClaim(claim, context, errors) {
  const labelPrefix = typeof context === "string" ? context : context.label || "review";
  const label = `${labelPrefix}:${claim?.claim_id || "<missing-claim>"}`;
  if (!claim || typeof claim !== "object" || Array.isArray(claim)) {
    fail(`${label}: claim must be an object`, errors);
    return;
  }
  for (const field of REQUIRED_CLAIM_FIELDS) {
    if (claim[field] === undefined || claim[field] === null || claim[field] === "") {
      fail(`${label}: missing ${field}`, errors);
    }
  }
  if (claim.adoption_status !== "optional_crosswalk_concept_only") {
    fail(`${label}: adoption_status must remain optional_crosswalk_concept_only`, errors);
  }
  if (!new Set(["pending_professional_confirmation", "pending_participant_agreement", "design_research_hypothesis"]).has(claim.claim_status)) {
    fail(`${label}: unsupported claim_status ${claim.claim_status || "<missing>"}`, errors);
  }
  if (!new Set(["provisional_package_record", "package_structure_only", "protocol_semantics_only"]).has(claim.evidence_state)) {
    fail(`${label}: unsupported evidence_state ${claim.evidence_state || "<missing>"}`, errors);
  }
  if (!new Set(["retain_with_boundary", "hold_pending_evidence"]).has(claim.review_decision)) {
    fail(`${label}: review_decision must retain_with_boundary or hold_pending_evidence`, errors);
  }
  validateReferenceArray(claim.source_refs, context.sourceIds, `${label}.source_refs`, errors);
  validateReferenceArray(claim.snapshot_refs, context.snapshotIds, `${label}.snapshot_refs`, errors);
  validateReferenceArray(claim.metric_refs, context.metricIds, `${label}.metric_refs`, errors);
  validateReferenceArray(claim.stop_condition_ids, context.stopIds, `${label}.stop_condition_ids`, errors);
  if (!Array.isArray(claim.responsible_roles) || claim.responsible_roles.length === 0 || claim.responsible_roles.some((role) => typeof role !== "string" || !role.trim())) {
    fail(`${label}.responsible_roles must contain named accountable role types`, errors);
  }
  validateBoundaryFlags(claim.boundary_flags, label, errors);
}

function validateSnapshots(review, sourceIds, errors) {
  if (!Array.isArray(review.source_snapshots) || review.source_snapshots.length === 0) {
    fail("source_snapshots must be a non-empty array", errors);
    return new Map();
  }
  const snapshots = new Map();
  for (const snapshot of review.source_snapshots) {
    const id = snapshot?.id;
    if (!id || snapshots.has(id)) {
      fail(`duplicate or missing snapshot id: ${id || "<missing>"}`, errors);
      continue;
    }
    snapshots.set(id, snapshot);
    if (!snapshot.path || path.posix.isAbsolute(snapshot.path) || snapshot.path.split("/").includes("..")) {
      fail(`${id}: snapshot path must be relative and stay inside the package`, errors);
      continue;
    }
    const localPath = path.join(PACKAGE_DIR, ...snapshot.path.split("/"));
    if (!fs.existsSync(localPath)) {
      fail(`${id}: snapshot file is missing: ${snapshot.path}`, errors);
    } else if (sha256(localPath) !== snapshot.sha256) {
      fail(`${id}: sha256 mismatch (expected ${snapshot.sha256}, got ${sha256(localPath)})`, errors);
    }
    validateReferenceArray(snapshot.source_refs, sourceIds, `${id}.source_refs`, errors);
    if (!snapshot.snapshot_kind) fail(`${id}: snapshot_kind is required`, errors);
  }
  return snapshots;
}

function validateFixture(fixture, context) {
  const errors = [];
  if (!fixture || typeof fixture !== "object") {
    errors.push("fixture must be an object");
  } else {
    if (!fixture.fixture_id) errors.push("fixture_id is required");
    if (!new Set(["pass", "reject"]).has(fixture.expected_result)) errors.push("expected_result must be pass or reject");
    validateClaim(fixture.claim, { ...context, label: "fixture" }, errors);
    if (fixture.expected_result === "reject" && errors.length === 0) errors.push("reject fixture must exercise a boundary or chain failure");
  }
  const actualResult = errors.length === 0 ? "pass" : "reject";
  return {
    fixture_id: fixture?.fixture_id || "<missing>",
    expected_result: fixture?.expected_result,
    actual_result: actualResult,
    ok: fixture?.expected_result === actualResult,
    errors,
  };
}

const errors = [];
const review = readJson(REVIEW_PATH);
const sources = readJson(SOURCE_PATH);
const metrics = readJson(METRICS_PATH);
const audit = readJson(AUDIT_PATH);
const sourceIds = new Set((sources.sources || []).map((source) => source.id).filter(Boolean));
const metricIds = new Set(Object.keys(metrics.metrics || {}));
const stopIds = new Set((review.stop_conditions || []).map((stop) => stop.id).filter(Boolean));

if (review.status !== "independent_offline_recheck") fail("review status must remain independent_offline_recheck", errors);
if (review.source_of_record !== "visual/assets/evidence-chain-review.json") fail("review source_of_record must point to the local review asset", errors);
if (review.boundary_contract?.adoption_status !== "optional_crosswalk_concept_only") fail("review boundary contract must remain optional_crosswalk_concept_only", errors);
if (audit.evidence_chain_review?.path !== "visual/assets/evidence-chain-review.json") fail("audit asset must point to the evidence-chain review", errors);
if (audit.evidence_chain_review?.adoption_boundary !== "optional_crosswalk_concept_only") fail("audit evidence-chain boundary must remain optional_crosswalk_concept_only", errors);

const snapshots = validateSnapshots(review, sourceIds, errors);
const context = { sourceIds, snapshotIds: new Set(snapshots.keys()), metricIds, stopIds };
if (!Array.isArray(review.claims) || review.claims.length < 5) {
  fail("review must contain at least five claim records", errors);
} else {
  const claimIds = new Set();
  for (const claim of review.claims) {
    if (claimIds.has(claim?.claim_id)) fail(`duplicate claim id: ${claim.claim_id}`, errors);
    claimIds.add(claim?.claim_id);
    validateClaim({ ...claim, adoption_status: review.boundary_contract?.adoption_status }, context, errors);
  }
}

const fixtureFiles = fs.readdirSync(FIXTURE_DIR).filter((name) => name.endsWith(".json")).sort();
const fixtureResults = fixtureFiles.map((name) => validateFixture(readJson(path.join(FIXTURE_DIR, name)), context));
for (const result of fixtureResults) {
  if (!result.ok) errors.push(`${result.fixture_id}: expected ${result.expected_result}, got ${result.actual_result}`);
}

const output = {
  ok: errors.length === 0,
  review_id: review.review_id,
  claim_count: Array.isArray(review.claims) ? review.claims.length : 0,
  snapshot_count: snapshots.size,
  fixture_count: fixtureResults.length,
  fixture_results: fixtureResults,
  errors,
};
console.log(JSON.stringify(output, null, 2));
process.exitCode = output.ok ? 0 : 1;
