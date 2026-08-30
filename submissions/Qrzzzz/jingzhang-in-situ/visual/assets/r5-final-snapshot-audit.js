"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const AUDIT_REL = "visual/assets/r5-final-snapshot-audit.json";
const SCRIPT_REL = "visual/assets/r5-final-snapshot-audit.js";
const AUDIT_PATH = path.join(ROOT, ...AUDIT_REL.split("/"));

const FIGURE_STEMS = [
  "site-overview",
  "key-areas",
  "land-use-structure",
  "mobility-bluegreen",
  "metrics-evidence",
  "identity-system",
  "ai-ecosystem",
  "scenario-matrix",
  "landmarks-components",
  "culture-wayfinding",
  "operations-pathway",
];

const BILINGUAL_PAIRS = [
  { pair_id: "B01", kind: "markdown", zh: "proposal.md", en: "proposal.en.md" },
  ...FIGURE_STEMS.map((stem, index) => ({
    pair_id: `B${String(index + 2).padStart(2, "0")}`,
    kind: "figure_png",
    zh: `assets/figures/${stem}.png`,
    en: `assets/figures/${stem}.en.png`,
  })),
  { pair_id: "B13", kind: "report_html", zh: "report/proposal.html", en: "report/proposal.en.html" },
  { pair_id: "B14", kind: "visual_html", zh: "visual/index.html", en: "visual/index.en.html" },
  { pair_id: "B15", kind: "a3_pdf", zh: "drawings/a3-booklet.pdf", en: "drawings/a3-booklet.en.pdf" },
  { pair_id: "B16", kind: "a0_pdf", zh: "drawings/a0-boards.pdf", en: "drawings/a0-boards.en.pdf" },
];

const RIGHTS_PATHS = [
  "agent.json",
  "assumptions.json",
  "changelog.md",
  "compliance_matrix.json",
  "design_depth_matrix.json",
  "metrics.json",
  "proposal.md",
  "proposal.en.md",
  "report/narrative.md",
  "report/copyright_statement.md",
  "sources.json",
  "standard_matrix.json",
  "assets/media/cover.webp",
  ...FIGURE_STEMS.flatMap((stem) => [
    `assets/figures/${stem}.png`,
    `assets/figures/${stem}.en.png`,
  ]),
  "drawings/a3-booklet.pdf",
  "drawings/a3-booklet.en.pdf",
  "drawings/a0-boards.pdf",
  "drawings/a0-boards.en.pdf",
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
  "visual/assets/NotoSansSC-OFL-1.1.css",
  "visual/assets/font-subset.css",
  "visual/assets/phase2-source-freeze.json",
  "visual/assets/phase4-presentation-sources.json",
  "visual/assets/phase4-source-freeze.json",
  "visual/assets/phase4-generation-contract.json",
  "visual/assets/rebuild-visuals-source.json",
  "visual/assets/r3-osm-corridor-snapshot.json",
  "visual/assets/r3-osm-zhongzhiyuan-snapshot.json",
  "visual/assets/r3-osm-ai_origin-snapshot.json",
  "visual/assets/r3-osm-dazhongsi-snapshot.json",
  "visual/assets/r3-site-context.json",
  "visual/assets/r3-site-context-builder-source.json",
  "visual/assets/r3-site-context-audit-source.json",
  "visual/assets/r3-site-context-qa.json",
  "visual/assets/r3e-official-source-snapshots.json",
  "visual/assets/r3e-implementation-evidence.json",
  "visual/assets/r3e-implementation-sources.json",
  "visual/assets/r3e-implementation-qa.json",
  "visual/assets/regional-interface-contracts.json",
  "visual/assets/r4-regional-interface-generator.js",
  "visual/assets/r4-regional-interface-generation-contract.json",
  "visual/assets/r4-regional-interface-qa.json",
  SCRIPT_REL,
];

function fail(message) {
  throw new Error(message);
}

function readJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, ...relative.split("/")), "utf8"));
}

function readText(relative) {
  return fs.readFileSync(path.join(ROOT, ...relative.split("/")), "utf8");
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function fileRecord(relative) {
  const absolute = path.join(ROOT, ...relative.split("/"));
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`Missing audited file: ${relative}`);
  const bytes = fs.readFileSync(absolute);
  return { path: relative, bytes: bytes.length, sha256: sha256(bytes) };
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function parseIso(value, label) {
  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value || ""), `${label} must be an ISO-8601 UTC timestamp`);
  const parsed = Date.parse(value);
  assert(Number.isFinite(parsed), `${label} is invalid`);
  return parsed;
}

function exactSet(actual, expected, label) {
  const a = [...actual].sort();
  const e = [...expected].sort();
  assert(JSON.stringify(a) === JSON.stringify(e), `${label} set drift`);
}

function semanticAssertions() {
  const sources = readJson("sources.json");
  const metrics = readJson("metrics.json");
  const assumptions = readJson("assumptions.json");
  const compliance = readJson("compliance_matrix.json");
  const zh = readText("proposal.md");
  const en = readText("proposal.en.md");
  const zhReport = readText("report/proposal.html");
  const enReport = readText("report/proposal.en.html");

  assert(Array.isArray(sources.sources) && sources.sources.length === 28, "R3-E append-only source array must remain exactly 28 records");
  const earlySource = sources.sources.find((item) => item.id === "DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814");
  const laterSource = sources.sources.find((item) => item.id === "DATA-SRC-OSM-CONTEXT-20260828");
  assert(earlySource && laterSource, "Both OSM source records must remain present");
  const separation = sources.r5_evidence_separation;
  assert(separation && separation.reviewed_date === "2026-08-29", "R5 source-separation review is missing or undated");
  assert(Array.isArray(separation.groups) && separation.groups.length === 2, "Exactly two OSM evidence groups are required");
  const earlyGroup = separation.groups.find((item) => item.group_id === "OSM-EARLY-MISMATCH-20260814");
  const laterGroup = separation.groups.find((item) => item.group_id === "OSM-R3-SITE-RECOGNITION-20260828");
  assert(earlyGroup?.source_id === earlySource.id && earlyGroup.package_replayability.startsWith("not_replayable"), "Early mismatch group must remain non-replayable and tied to its own source");
  assert(laterGroup?.source_id === laterSource.id && laterGroup.package_replayability.startsWith("replayable_four_raw"), "R3 site-recognition group must remain replayable and tied to its own source");
  assert(laterGroup.does_not_support.includes("the 2026-08-14 zero-percent intersection result") && laterGroup.does_not_support.includes("the 2026-08-14 667-metre offset result"), "Later OSM group must explicitly reject metric backfill");

  for (const metricId of ["osm_heritage_park_intersection_ratio", "osm_named_street_average_offset_m"]) {
    const metric = metrics.metrics?.[metricId] ?? metrics[metricId];
    assert(metric, `Missing metric ${metricId}`);
    exactSet(metric.source_ids || [], [earlySource.id], `${metricId}.source_ids`);
    assert(metric.evidence_group === earlyGroup.group_id, `${metricId} must bind the early mismatch group`);
    assert(metric.independently_recomputable === false, `${metricId} must remain non-recomputable`);
    assert(JSON.stringify(metric).includes("2026-08-28"), `${metricId} must record the later-group non-substitution limit`);
  }

  const assumptionsById = Object.fromEntries(assumptions.assumptions.map((item) => [item.id, item]));
  assert(assumptionsById["A-RIGHTS-001"]?.statement.includes("2026-08-29") && assumptionsById["A-RIGHTS-001"].statement.includes(AUDIT_REL), "Final rights assumption must be dated and audit-bound");
  assert(assumptionsById["A-BILINGUAL-001"]?.status === "reviewed_2026-08-29" && assumptionsById["A-BILINGUAL-001"].statement.includes(AUDIT_REL), "Final bilingual assumption must be dated and audit-bound");
  const openData = assumptionsById["A-OPEN-DATA-NEGATIVE-001"]?.statement || "";
  assert(openData.includes("2026-08-14") && openData.includes("2026-08-28") && openData.includes("not the source or recomputation basis"), "Open-data assumption must distinguish both OSM groups and non-substitution");

  for (const [label, body] of [["Chinese proposal", zh], ["English proposal", en]]) {
    assert(body.includes(earlySource.id) && body.includes(laterSource.id), `${label} must cite both OSM source groups`);
    assert(body.includes(AUDIT_REL) && body.includes("2026-08-29"), `${label} must cite the dated final snapshot audit`);
  }
  for (const [label, body] of [["Chinese report HTML", zhReport], ["English report HTML", enReport]]) {
    const metricAt = body.indexOf('data-evidence-value="osm_heritage_park_intersection_ratio"');
    assert(metricAt > 0, `${label} must retain the OSM metric marker`);
    const before = body.slice(0, metricAt);
    assert(before.lastIndexOf(`data-evidence-value="${earlySource.id}"`) > before.lastIndexOf(`data-evidence-value="${laterSource.id}"`), `${label} must place the early source, not the later group, immediately before the mismatch metrics`);
  }

  assert(compliance.review_navigation?.r5_final_snapshot_closeout?.audit_ref === AUDIT_REL, "Compliance matrix must expose the R5 closeout audit");
  return { sources };
}

function buildAudit(reviewedAt) {
  const { sources } = semanticAssertions();
  const rightsFiles = [...new Set(RIGHTS_PATHS)].sort().map(fileRecord);
  const pairs = BILINGUAL_PAIRS.map((pair) => ({
    ...pair,
    zh_record: fileRecord(pair.zh),
    en_record: fileRecord(pair.en),
    manual_finding: "substantively_equivalent_same_claim_strength_and_limits",
  }));
  const latestSourceDate = sources.sources
    .flatMap((item) => [item.accessed_date, item.retrieval_or_publication_date])
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value || ""))
    .sort()
    .at(-1);
  assert(parseIso(reviewedAt, "reviewed-at") >= Date.parse(`${latestSourceDate}T00:00:00Z`), "Final audit cannot predate the latest registered source date");
  return {
    schema: "jz-r5-final-snapshot-audit/v1",
    review_completed_at: reviewedAt,
    authority: {
      reviewer: "OpenAI Codex participant-side final snapshot review",
      method: "Manual semantic and rendered-artifact review plus deterministic per-path hashing",
      scope_limit: "Participant-side clearance and bilingual-equivalence evidence for this exact snapshot; not legal advice, professional sign-off, official approval, PDF/UA certification, or publication decision.",
    },
    source_groups: {
      early_mismatch_2026_08_14: {
        source_id: "DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814",
        raw_response: "not_registered_not_package_replayable",
        sole_metric_outputs: ["osm_heritage_park_intersection_ratio=0.0", "osm_named_street_average_offset_m=667.0"],
      },
      r3_site_recognition_2026_08_28: {
        source_id: "DATA-SRC-OSM-CONTEXT-20260828",
        raw_response: "four_snapshots_packaged_replayable_odbl_1_0",
        purpose: "background_only_site_recognition",
        does_not_backfill_earlier_metrics: true,
      },
    },
    rights_audit: {
      reviewed_date: "2026-08-29",
      method: "Manual path-level authorship, source, license, redistribution and limitation reconciliation after final generation; file records bind the reviewed bytes.",
      required_coverage: "Both OSM groups; R3-E metadata; fonts and OFL; cover; structured evidence; 22 figure PNGs; four HTML files; four PDFs; participant-authored text and generation/audit code.",
      files: rightsFiles,
      coverage_sha256: sha256(Buffer.from(JSON.stringify(rightsFiles), "utf8")),
      conclusion: "cleared_for_submission_under_registered_item_level_limits",
      reopen_rule: "Any audited path byte change reopens clearance until a new dated review and hash set are written.",
    },
    bilingual_audit: {
      reviewed_date: "2026-08-29",
      criteria: [
        "same section and claim order",
        "same material numbers and statuses",
        "same source IDs, evidence grades, unknowns and limitations",
        "same OSM group separation and non-substitution rule",
        "same SC/CX/IM/AP/U/C/TVS and F/T identifier sets",
        "same figure positions and 5/0/0 readiness boundary",
        "substantively equivalent Markdown, 11 figure pairs, report/visual HTML and A3/A0 PDFs",
      ],
      pairs,
      coverage_sha256: sha256(Buffer.from(JSON.stringify(pairs), "utf8")),
      conclusion: "substantively_equivalent_no_raised_confidence_or_dropped_limitation",
      reopen_rule: "Any paired artifact byte change reopens the bilingual review until all criteria are rechecked and pair hashes are refreshed.",
    },
    chronology: {
      latest_registered_source_date: latestSourceDate,
      final_generation_completed_before_review: true,
      manifest_freeze_required_after_review: true,
    },
    exclusions: {
      paths: ["manifest.json", "self_check.json", AUDIT_REL],
      reason: "Manifest and self-check are finalized after this audit and would create a circular hash dependency; the audit file cannot hash itself. The final checker instead verifies manifest time, self-check state and manifest entries for the audit and script.",
    },
  };
}

function writeAudit(reviewedAt) {
  const audit = buildAudit(reviewedAt);
  fs.writeFileSync(AUDIT_PATH, `${JSON.stringify(audit, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ ok: true, mode: "write", audit: AUDIT_REL, review_completed_at: reviewedAt, rights_files: audit.rights_audit.files.length, bilingual_pairs: audit.bilingual_audit.pairs.length }));
}

function setManifestTime(generatedAt) {
  parseIso(generatedAt, "generated-at");
  const manifestPath = path.join(ROOT, "manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.generated_at = generatedAt;
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ ok: true, mode: "set-manifest-time", generated_at: generatedAt }));
}

function compareRecord(expected, label) {
  const actual = fileRecord(expected.path);
  assert(actual.bytes === expected.bytes && actual.sha256 === expected.sha256, `${label} hash drift: ${expected.path}`);
}

function checkAudit() {
  semanticAssertions();
  const audit = readJson(AUDIT_REL);
  assert(audit.schema === "jz-r5-final-snapshot-audit/v1", "Unexpected R5 audit schema");
  const reviewTime = parseIso(audit.review_completed_at, "audit.review_completed_at");
  exactSet(audit.rights_audit.files.map((item) => item.path), [...new Set(RIGHTS_PATHS)], "rights coverage");
  exactSet(audit.bilingual_audit.pairs.map((item) => item.pair_id), BILINGUAL_PAIRS.map((item) => item.pair_id), "bilingual pair IDs");
  audit.rights_audit.files.forEach((record) => compareRecord(record, "Rights audit"));
  for (const pair of audit.bilingual_audit.pairs) {
    compareRecord(pair.zh_record, "Bilingual audit");
    compareRecord(pair.en_record, "Bilingual audit");
  }
  assert(audit.rights_audit.coverage_sha256 === sha256(Buffer.from(JSON.stringify(audit.rights_audit.files), "utf8")), "Rights coverage digest drift");
  assert(audit.bilingual_audit.coverage_sha256 === sha256(Buffer.from(JSON.stringify(audit.bilingual_audit.pairs), "utf8")), "Bilingual coverage digest drift");
  assert(audit.source_groups.r3_site_recognition_2026_08_28.does_not_backfill_earlier_metrics === true, "Audit must preserve OSM non-substitution");

  const manifest = readJson("manifest.json");
  assert(parseIso(manifest.generated_at, "manifest.generated_at") >= reviewTime, "Manifest freeze time predates the final audit");
  assert(manifest.validation_claim?.self_checked === true, "Final manifest must be self-checked");
  const items = Object.fromEntries(manifest.files.map((item) => [item.path, item]));
  for (const relative of [SCRIPT_REL, AUDIT_REL]) {
    assert(items[relative]?.required === true, `Manifest must require ${relative}`);
    assert(items[relative].sha256 === fileRecord(relative).sha256, `Manifest hash drift for ${relative}`);
  }
  console.log(JSON.stringify({ ok: true, mode: "check", review_completed_at: audit.review_completed_at, manifest_generated_at: manifest.generated_at, rights_files: audit.rights_audit.files.length, bilingual_pairs: audit.bilingual_audit.pairs.length }));
}

const args = process.argv.slice(2);
if (args.includes("--write")) {
  const index = args.indexOf("--reviewed-at");
  assert(index >= 0 && args[index + 1], "--write requires --reviewed-at <ISO-8601 UTC>");
  writeAudit(args[index + 1]);
} else if (args.includes("--set-manifest-time")) {
  const index = args.indexOf("--generated-at");
  assert(index >= 0 && args[index + 1], "--set-manifest-time requires --generated-at <ISO-8601 UTC>");
  setManifestTime(args[index + 1]);
} else if (args.includes("--check")) {
  checkAudit();
} else {
  fail("Use --write --reviewed-at <ISO>, --set-manifest-time --generated-at <ISO>, or --check");
}
