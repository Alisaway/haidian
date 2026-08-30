#!/usr/bin/env node
/** Read-only verifier for the Jingzhang derived-figure package lineage. */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PACKAGE_DIR = path.resolve(__dirname, "..", "..");
const LINEAGE_PATH = path.join(PACKAGE_DIR, "visual", "assets", "render-lineage.json");
const ANALYSIS_DIR = path.join(PACKAGE_DIR, "assets", "analysis-18");
const SOURCE_ENV = "JINGZHANG_V13_SOURCE_DIR";
const TEXT_SUFFIXES = new Set([".css", ".csv", ".geojson", ".html", ".js", ".json", ".md", ".svg", ".tsv", ".txt", ".xml", ".yaml", ".yml"]);
const FORBIDDEN_MARKERS = ["UNCLEARED" + " EMBEDDED MEDIA", "DO_" + "NOT_PUBLISH", "INTERNAL REVIEW" + " ONLY"];
const SANITIZED_ASSETS = [
  "assets/source-v13-clean/jingzhang_analysis_v13_pilot_13_dazhongsi.clean.svg",
  "assets/source-v13-clean/jingzhang_analysis_v13_pilot_14_origin.clean.svg",
  "assets/source-v13-clean/page13-abstract-base.png",
];

function rel(file) {
  return path.relative(PACKAGE_DIR, file).replaceAll(path.sep, "/");
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function pngSize(file) {
  const bytes = fs.readFileSync(file);
  if (bytes.length < 24 || bytes.readUInt32BE(0) !== 0x89504e47 || bytes.toString("ascii", 1, 4) !== "PNG") {
    throw new Error("not a readable PNG");
  }
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

function emit(value) {
  process.stdout.write(JSON.stringify(value));
}

function loadLineage() {
  const data = JSON.parse(fs.readFileSync(LINEAGE_PATH, "utf8"));
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("render-lineage.json must contain an object");
  return data;
}

function sourceOutput(record) {
  return path.join(ANALYSIS_DIR, String(record.filename));
}

function dryRun(lineage) {
  const sourceRoot = process.env[SOURCE_ENV];
  const sourceLabel = sourceRoot ? path.resolve(sourceRoot) : `[${SOURCE_ENV} unset]`;
  const sourcePages = Array.isArray(lineage.source_pages) ? lineage.source_pages : [];
  const coreFigures = Array.isArray(lineage.core_figures) ? lineage.core_figures : [];
  emit({
    mode: "dry-run",
    ok: true,
    package: PACKAGE_DIR,
    lineage: rel(LINEAGE_PATH),
    mappings: {
      source_pages: sourcePages.map((r) => ({ source: path.join(sourceLabel, String(r.filename)), output: rel(sourceOutput(r)) })),
      core_figures: coreFigures.map((r) => ({ source_page_ids: r.source_page_ids || [], output: String(r.path || "") })),
    },
    checks: [
      "recorded outputs exist",
      "recorded output SHA-256 values match",
      "recorded output dimensions match",
      "core-figure bottom-12-percent differences are positive",
      "package text and SVG text contain no forbidden release markers",
      "package-local sanitized SVG and PNG sources are readable",
      `external V13 required files and PNG hashes (${sourceRoot ? "enabled" : "skipped: environment variable absent"})`,
    ],
  });
}

function checkRecordedOutputs(lineage) {
  const records = [];
  const failures = [];
  for (const record of Array.isArray(lineage.source_pages) ? lineage.source_pages : []) records.push(["source_page", sourceOutput(record), record]);
  for (const record of Array.isArray(lineage.core_figures) ? lineage.core_figures : []) records.push(["core_figure", path.resolve(PACKAGE_DIR, String(record.path)), record]);
  for (const [kind, file, record] of records) {
    const label = `${kind}:${rel(file)}`;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      failures.push(`${label}: missing`);
      continue;
    }
    if (sha256(file) !== record.current_output_sha256) failures.push(`${label}: SHA-256 mismatch`);
    try {
      const actual = pngSize(file);
      if (JSON.stringify(actual) !== JSON.stringify(record.output_size)) failures.push(`${label}: size ${JSON.stringify(actual)} != ${JSON.stringify(record.output_size)}`);
    } catch (error) {
      failures.push(`${label}: unreadable image (${error.message})`);
    }
  }
  return { name: "recorded_outputs", status: failures.length ? "failed" : "passed", checked: records.length, ...(failures.length ? { failures } : {}) };
}

function checkCoreFigureDifferences(lineage) {
  const records = Array.isArray(lineage.core_figures) ? lineage.core_figures : [];
  const failures = records.flatMap((record) => {
    const value = record.bottom_12_diff_from_e6b8151e6_percent;
    return typeof value === "number" && Number.isFinite(value) && value > 0 ? [] : [`${record.path || "record"}: bottom-12-percent difference is not positive`];
  });
  return { name: "core_figure_bottom_12_diff", status: failures.length ? "failed" : "passed", checked: records.length, ...(failures.length ? { failures } : {}) };
}

function walkFiles(root) {
  const result = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...walkFiles(file));
    else result.push(file);
  }
  return result;
}

function checkForbiddenMarkers() {
  const failures = [];
  let checked = 0;
  for (const file of walkFiles(PACKAGE_DIR)) {
    if (!TEXT_SUFFIXES.has(path.extname(file).toLowerCase())) continue;
    checked += 1;
    let text;
    try { text = fs.readFileSync(file, "utf8"); } catch (error) { failures.push(`${rel(file)}: unreadable text (${error.message})`); continue; }
    for (const marker of FORBIDDEN_MARKERS) if (text.includes(marker)) failures.push(`${rel(file)}: contains forbidden release marker`);
  }
  return { name: "forbidden_release_markers", status: failures.length ? "failed" : "passed", checked, ...(failures.length ? { failures } : {}) };
}

function checkSanitizedAssets() {
  const failures = [];
  for (const item of SANITIZED_ASSETS) {
    const file = path.join(PACKAGE_DIR, item);
    if (!fs.existsSync(file)) { failures.push(`${item}: missing`); continue; }
    try {
      if (file.endsWith(".svg")) {
        const text = fs.readFileSync(file, "utf8");
        if (!/<svg(?:\s|>)/i.test(text)) throw new Error("missing SVG root");
      } else pngSize(file);
    } catch (error) { failures.push(`${item}: unreadable (${error.message})`); }
  }
  return { name: "sanitized_package_sources", status: failures.length ? "failed" : "passed", checked: SANITIZED_ASSETS.length, ...(failures.length ? { failures } : {}) };
}

function checkExternalSource(lineage) {
  const raw = process.env[SOURCE_ENV];
  if (!raw) return { name: "external_v13_source", status: "skipped", reason: `${SOURCE_ENV} is not set` };
  const sourceDir = path.resolve(raw);
  const failures = [];
  const contract = lineage.source_contract || {};
  const required = Array.isArray(contract.required_files) ? contract.required_files : [];
  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) failures.push(`source directory is missing: ${sourceDir}`);
  for (const filename of required) if (!fs.existsSync(path.join(sourceDir, String(filename)))) failures.push(`required file missing: ${filename}`);
  let hashesChecked = 0;
  for (const record of Array.isArray(lineage.source_pages) ? lineage.source_pages : []) {
    const file = path.join(sourceDir, String(record.filename));
    if (!fs.existsSync(file)) continue;
    hashesChecked += 1;
    if (sha256(file) !== record.source_png_sha256) failures.push(`${record.filename}: source SHA-256 mismatch`);
  }
  return { name: "external_v13_source", status: failures.length ? "failed" : "passed", source_dir: sourceDir, required_files_checked: required.length, png_hashes_checked: hashesChecked, ...(failures.length ? { failures } : {}) };
}

function check(lineage) {
  const checks = [checkRecordedOutputs(lineage), checkCoreFigureDifferences(lineage), checkForbiddenMarkers(), checkSanitizedAssets(), checkExternalSource(lineage)];
  const ok = checks.every((item) => item.status !== "failed");
  emit({ mode: "check", ok, package: PACKAGE_DIR, lineage: rel(LINEAGE_PATH), checks });
  process.exitCode = ok ? 0 : 1;
}

const mode = process.argv[2];
if (mode !== "--dry-run" && mode !== "--check") {
  process.stderr.write("usage: rebuild_derived_figures.js --dry-run|--check\n");
  process.exitCode = 2;
} else {
  try {
    const lineage = loadLineage();
    if (mode === "--dry-run") dryRun(lineage); else check(lineage);
  } catch (error) {
    emit({ mode: mode.slice(2), ok: false, package: PACKAGE_DIR, checks: [{ name: "render_lineage", status: "failed", failures: [error.message] }] });
    process.exitCode = 1;
  }
}
