#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const assetsDir = __dirname;
const submissionDir = path.resolve(assetsDir, "..", "..");
const repoRoot = path.resolve(submissionDir, "..", "..", "..");
const registerPath = path.join(assetsDir, "site-evidence-register.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function byId(features, id) {
  return features.find((feature) => feature.id === id);
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

const register = readJson(registerPath);
const checks = [];
let ok = true;

function check(id, condition, details) {
  const passed = Boolean(condition);
  checks.push({ id, passed, details });
  if (!passed) ok = false;
}

for (const source of register.source_assets) {
  const absolute = path.join(repoRoot, source.path);
  check(`SOURCE_EXISTS:${source.source_id}`, fs.existsSync(absolute), source.path);
  if (fs.existsSync(absolute) && source.sha256) {
    const actual = sha256(absolute);
    check(`SOURCE_HASH:${source.source_id}`, actual === source.sha256, { expected: source.sha256, actual });
  }
}

const frozenSource = readJson(path.join(repoRoot, "brief", "site-package", "geometry", "provisional_boundaries.geojson"));
const sourceFeatures = frozenSource.features;
for (const mapping of register.scope_geometry_checks) {
  const submitted = readJson(path.join(submissionDir, mapping.submitted_path));
  const actualFeature = byId(submitted.features, mapping.submitted_feature_id);
  const sourceFeature = byId(sourceFeatures, mapping.source_feature_id);
  const geometryMatch = actualFeature && sourceFeature && stableJson(actualFeature.geometry) === stableJson(sourceFeature.geometry);
  check(`GEOMETRY_MATCH:${mapping.submitted_feature_id}`, geometryMatch, {
    submitted: mapping.submitted_path,
    source: `${mapping.source_path}#${mapping.source_feature_id}`,
  });
}

const constraints = readJson(path.join(submissionDir, register.official_control_geometry.constraints_path));
check(
  "CONSTRAINT_FEATURE_COUNT",
  Array.isArray(constraints.features) && constraints.features.length === register.official_control_geometry.expected_feature_count,
  { expected: register.official_control_geometry.expected_feature_count, actual: constraints.features?.length },
);
check(
  "CONSTRAINT_GAP_STATUS",
  constraints.data_gap?.status === register.official_control_geometry.gap_status,
  { expected: register.official_control_geometry.gap_status, actual: constraints.data_gap?.status },
);
const actualMissing = [...(constraints.data_gap?.missing_layers || [])].sort();
const expectedMissing = [...register.official_control_geometry.missing_layers].sort();
check("MISSING_LOCKED_LAYERS", stableJson(actualMissing) === stableJson(expectedMissing), { expected: expectedMissing, actual: actualMissing });

const sources = readJson(path.join(submissionDir, "sources.json"));
for (const sourceId of ["OFFICIAL-ANNOUNCEMENT", "BOUNDARY-SOURCE", "KEY-AREA-SOURCE"]) {
  const source = sources.sources.find((item) => item.id === sourceId);
  check(`SOURCE_RECORD:${sourceId}`, source && source.allowed_uses?.length > 0 && source.prohibited_uses?.length > 0, {
    found: Boolean(source),
    allowed_use_count: source?.allowed_uses?.length || 0,
    prohibited_use_count: source?.prohibited_uses?.length || 0,
  });
}

const output = {
  ok,
  submission_id: register.submission_id,
  frozen_main_sha: register.frozen_main_sha,
  checks,
  summary: {
    passed: checks.filter((item) => item.passed).length,
    failed: checks.filter((item) => !item.passed).length,
    provisional_geometry_matches: register.scope_geometry_checks.length,
    official_constraint_features: constraints.features.length,
  },
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
process.exit(ok ? 0 : 1);
