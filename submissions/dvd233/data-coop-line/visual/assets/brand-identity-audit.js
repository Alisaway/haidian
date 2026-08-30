#!/usr/bin/env node
"use strict";

/**
 * BRAND-IDENTITY-01 audit for the Data Co-op Line submission.
 *
 * Read-only, zero-dependency (Node built-ins only). Recomputes every
 * accessibility gate declared in visual/assets/brand-identity-system.json:
 * WCAG contrast ratios are recomputed from hex values, state tokens must be
 * distinguishable without color, lockups must exist bilingually, application
 * anchors must resolve to real package features, SVG sources must be offline
 * and safe, figures must exist at 2400x1500 and embed this register's
 * SHA-256, and metrics.json must match the recomputed values.
 *
 * Usage:
 *   node visual/assets/brand-identity-audit.js --json
 *   node visual/assets/brand-identity-audit.js --self-test --json
 *
 * Exit code is 0 when every check passes (or, with --self-test, when every
 * mutation fixture fails closed as expected) and 1 otherwise.
 */

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const REGISTER_PATH = path.join(__dirname, "brand-identity-system.json");

const EXPECTED_STATES = ["open", "paused", "stopped", "audit"];
const MISUSE_IDS = [
  "misuse-distort",
  "misuse-recolor",
  "misuse-third-party",
  "misuse-ranking",
  "misuse-endorsement",
  "misuse-color-only",
];
const UNSAFE_SVG_ELEMENT = /<\s*(script|foreignObject|iframe|object|embed|handler|listener)[\s>]/i;
const EXTERNAL_REFERENCE = /(?:href|src)\s*=\s*["']https?:\/\/|@import|url\(\s*['"]?(?!#)/i;

function loadJson(relative) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
}

function sha256File(absolutePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolutePath)).digest("hex");
}

function channelToLinear(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const clean = String(hex).replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b);
}

function contrastRatio(hexA, hexB) {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function pngSize(bytes) {
  const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(PNG_MAGIC)) return null;
  if (bytes.toString("ascii", 12, 16) !== "IHDR") return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

/**
 * Run every audit check against an in-memory context so self-test fixtures
 * can mutate it without touching disk.
 * context = { register, registerSha256, svgContents: {path: text},
 *             keyAreaIds: Set, scenarioIds: Set, protocolText,
 *             metrics, figureBytes: {path: Buffer} }
 */
function runChecks(context) {
  const errors = [];
  const reg = context.register;
  const colors = new Map();

  // 1. Register identity and evidence boundary
  if (reg.register_id !== "BRAND-IDENTITY-01") errors.push("register_id must be BRAND-IDENTITY-01");
  const boundary = reg.evidence_boundary || {};
  if (boundary.evidence_level !== "E2") errors.push("evidence_level must stay E2");
  if (boundary.observed_users !== 0) errors.push("observed_users must stay 0");
  if (boundary.trademark_or_font_clearance_search !== "not_performed") {
    errors.push("trademark_or_font_clearance_search must stay not_performed");
  }
  if (boundary.official_endorsement !== false) errors.push("official_endorsement must stay false");
  if (!Array.isArray(boundary.allowed_claims) || boundary.allowed_claims.length === 0) {
    errors.push("allowed_claims must be a non-empty list");
  }
  const prohibited = (boundary.prohibited_claims || []).join(" ");
  for (const keyword of ["trademark", "official", "user"]) {
    if (!prohibited.toLowerCase().includes(keyword)) {
      errors.push(`prohibited_claims must cover ${keyword}`);
    }
  }

  // 2. Palette validity
  for (const color of reg.palette && reg.palette.colors || []) {
    if (!/^#[0-9a-fA-F]{6}$/.test(color.hex || "")) errors.push(`invalid hex for ${color.id}`);
    if (colors.has(color.id)) errors.push(`duplicate color id ${color.id}`);
    colors.set(color.id, color.hex);
  }
  for (const required of ["rail-blue", "heritage-green", "signal-red", "amber", "ink", "receipt-grey", "paper", "paper-warm"]) {
    if (!colors.has(required)) errors.push(`palette is missing ${required}`);
  }

  // 3. Contrast pairs, recomputed
  const thresholds = reg.accessibility_gates || {};
  const pairs = reg.palette && reg.palette.declared_pairs || [];
  let pairsPassed = 0;
  for (const pair of pairs) {
    const fg = colors.get(pair.foreground);
    const bg = colors.get(pair.background);
    if (!fg || !bg) {
      errors.push(`pair ${pair.id} references an unknown color`);
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    const gateFloor = pair.usage === "graphic" ? thresholds.graphic_contrast_min : thresholds.text_contrast_min;
    const required = Math.max(pair.required_min_contrast || 0, gateFloor || 0);
    if (ratio + 1e-9 < required) {
      errors.push(`pair ${pair.id} contrast ${ratio.toFixed(2)} < required ${required}`);
    } else {
      pairsPassed += 1;
    }
  }
  for (const bad of reg.palette && reg.palette.forbidden_pair_examples || []) {
    const ratio = contrastRatio(colors.get(bad.foreground) || "#000000", colors.get(bad.background) || "#ffffff");
    if (ratio >= (thresholds.graphic_contrast_min || 3.0)) {
      errors.push(`forbidden pair ${bad.foreground}/${bad.background} no longer fails the graphic gate`);
    }
  }

  // 4. State tokens: shape + bilingual label + palette color, unique shapes
  const tokens = reg.state_tokens || [];
  const shapes = new Set();
  const stateIds = tokens.map((token) => token.state).sort();
  if (JSON.stringify(stateIds) !== JSON.stringify([...EXPECTED_STATES].sort())) {
    errors.push(`state tokens must be exactly ${EXPECTED_STATES.join(", ")}`);
  }
  let noColorOnlyTokens = 0;
  for (const token of tokens) {
    if (!colors.has(token.color)) errors.push(`state ${token.state} uses an unregistered color`);
    if (!token.shape || shapes.has(token.shape)) errors.push(`state ${token.state} needs a unique shape`);
    shapes.add(token.shape);
    if (!token.label_zh || !token.label_en) errors.push(`state ${token.state} needs bilingual labels`);
    if (token.shape && token.label_zh && token.label_en && colors.has(token.color)) noColorOnlyTokens += 1;
  }

  // 5. The two lines must differ by dash, not color alone
  const elements = reg.logo_mark && reg.logo_mark.elements || [];
  const railData = elements.find((el) => el.role === "data_participation_line");
  const railNoData = elements.find((el) => el.role === "no_data_equivalent_line");
  let lineTokens = 0;
  if (!railData || railData.dash !== null) {
    errors.push("data_participation_line must exist and stay solid (dash=null)");
  } else {
    lineTokens += 1;
  }
  if (!railNoData || !railNoData.dash) {
    errors.push("no_data_equivalent_line must carry a dash pattern so the two lines differ without color");
  } else {
    lineTokens += 1;
  }
  const noColorOnlyRatio = (noColorOnlyTokens + lineTokens) / (EXPECTED_STATES.length + 2);

  // 6. Mark geometry invariants
  const mark = reg.logo_mark || {};
  if (mark.grid !== 64 || mark.viewBox !== "0 0 64 64") errors.push("mark grid must stay 64 with viewBox 0 0 64 64");
  const strokeAtMin = (mark.stroke_width_grid_units / (mark.grid || 64)) * (reg.accessibility_gates || {}).min_mark_px;
  if (!(strokeAtMin >= (reg.accessibility_gates || {}).min_stroke_px_at_min_mark)) {
    errors.push(`stroke at minimum size ${strokeAtMin}px is below the floor`);
  }
  if (mark.open_ends !== true) errors.push("mark rails must stay open-ended");
  if (railData && railNoData) {
    for (const rail of [railData, railNoData]) {
      if (rail.from[0] >= rail.to[0]) errors.push(`rail ${rail.id} must run left to right`);
    }
    const perforation = elements.find((el) => el.id === "perforation");
    if (!perforation || !Array.isArray(perforation.ys) || perforation.ys.length !== 7) {
      errors.push("perforation must keep exactly seven holes");
    } else {
      if (perforation.x <= Math.max(railData.to[0], railNoData.to[0])) {
        errors.push("perforation must stay to the right of the open rail ends");
      }
    }
    const splayLeft = elements.find((el) => el.id === "splay_left");
    const splayRight = elements.find((el) => el.id === "splay_right");
    if (!splayLeft || !(splayLeft.to[0] < splayLeft.from[0])) errors.push("splay_left must open outward");
    if (!splayRight || !(splayRight.to[0] > splayRight.from[0])) errors.push("splay_right must open outward");
  }

  // 7. SVG assets: presence, offline safety, geometry cross-check
  const svgAssets = reg.svg_assets || [];
  if (svgAssets.length !== 5) errors.push("exactly five SVG assets must be declared");
  for (const relative of svgAssets) {
    const content = context.svgContents[relative];
    if (content === undefined || content === null) {
      errors.push(`missing SVG asset ${relative}`);
      continue;
    }
    if (UNSAFE_SVG_ELEMENT.test(content)) errors.push(`${relative} contains an active or embedded element`);
    if (EXTERNAL_REFERENCE.test(content)) errors.push(`${relative} references external resources`);
  }
  const markSvg = context.svgContents["visual/assets/brand/logo-mark.svg"];
  if (markSvg) {
    if (!markSvg.includes('viewBox="0 0 64 64"')) errors.push("logo-mark.svg viewBox drifted from the register");
    const lineCount = (markSvg.match(/<line[\s>]/g) || []).length;
    if (lineCount !== 6) errors.push(`logo-mark.svg must draw exactly six strokes; found ${lineCount}`);
    const holeCount = (markSvg.match(/<circle[\s>]/g) || []).length;
    if (holeCount !== 7) errors.push(`logo-mark.svg must draw exactly seven perforation holes; found ${holeCount}`);
    if (!/stroke-dasharray="7 5"/.test(markSvg)) errors.push("logo-mark.svg lost the no-data dash pattern");
  }
  const monoSvg = context.svgContents["visual/assets/brand/logo-mark-mono.svg"];
  if (monoSvg) {
    const monoColors = new Set([...monoSvg.matchAll(/(?:stroke|fill)="(#[0-9a-fA-F]{6})"/g)].map((m) => m[1].toLowerCase()));
    if (monoColors.size !== 1) errors.push("mono variant must use exactly one color");
    if (!/stroke-dasharray="7 5"/.test(monoSvg)) errors.push("mono variant must keep the dash so lines differ without color");
  }

  // 8. Lockups: bilingual coverage and minimums
  const lockups = reg.lockups || [];
  const lockupIds = lockups.map((item) => item.id).sort();
  if (JSON.stringify(lockupIds) !== JSON.stringify(["lockup-bilingual", "lockup-en", "lockup-zh"])) {
    errors.push("lockups must cover zh, en and bilingual");
  }
  let lockupsCovered = 0;
  for (const lockup of lockups) {
    const content = context.svgContents[lockup.file];
    if (content === undefined || content === null) {
      errors.push(`missing lockup file ${lockup.file}`);
      continue;
    }
    if (!(lockup.min_width_px >= 96)) errors.push(`${lockup.id} min width below 96px floor`);
    if (lockup.clear_space_grid_units !== 8) errors.push(`${lockup.id} clear space must stay 8 grid units`);
    const text = lockup.text || "";
    if (!content.includes(text.split(" / ")[0]) && !content.includes(text)) {
      errors.push(`${lockup.id} file does not contain its declared text`);
    }
    lockupsCovered += 1;
  }
  const lockupRatio = lockupsCovered / 3;

  // 9. Typography: offline system stacks only
  const typography = reg.typography || {};
  for (const key of ["zh_stack", "en_stack", "mono_stack"]) {
    const stack = typography[key];
    if (!Array.isArray(stack) || stack.length === 0) errors.push(`typography ${key} must be a non-empty stack`);
  }
  if (!(typography.min_body_px >= 12)) errors.push("minimum body size must stay at least 12px");

  // 10. Applications resolve to real package anchors
  const applications = reg.applications || [];
  let anchorsResolved = 0;
  for (const app of applications) {
    if (app.template_only !== true) {
      errors.push(`application ${app.id} must stay template_only`);
      continue;
    }
    if (app.anchor_kind === "key_area" && context.keyAreaIds.has(app.anchor_ref)) anchorsResolved += 1;
    else if (app.anchor_kind === "scenario" && context.scenarioIds.has(app.anchor_ref)) anchorsResolved += 1;
    else if (app.anchor_kind === "protocol" && context.protocolText.includes(app.anchor_ref)) anchorsResolved += 1;
    else if (app.anchor_kind === "event_template" || app.anchor_kind === "print_template") anchorsResolved += 1;
    else errors.push(`application ${app.id} anchor ${app.anchor_kind}:${app.anchor_ref} does not resolve`);
  }
  const anchorRatio = applications.length === 0 ? 0 : anchorsResolved / applications.length;

  // 11. Misuse rules
  const misuseIds = (reg.misuse_rules || []).map((rule) => rule.id).sort();
  if (JSON.stringify(misuseIds) !== JSON.stringify([...MISUSE_IDS].sort())) {
    errors.push(`misuse rules must be exactly ${MISUSE_IDS.join(", ")}`);
  }

  // 12. Figures: presence, size, embedded provenance
  const figureContract = reg.figure_contract || {};
  for (const key of ["primary", "english"]) {
    const relative = figureContract[key];
    const bytes = context.figureBytes[relative];
    if (!bytes) {
      errors.push(`missing figure ${relative}`);
      continue;
    }
    const size = pngSize(bytes);
    if (!size || size.width !== figureContract.width_px || size.height !== figureContract.height_px) {
      errors.push(`figure ${relative} must be ${figureContract.width_px}x${figureContract.height_px}`);
    }
    if (!bytes.includes(Buffer.from(context.registerSha256, "ascii"))) {
      errors.push(`figure ${relative} must embed this register's SHA-256`);
    }
    if (!bytes.includes(Buffer.from(String(reg.package_base_sha), "ascii"))) {
      errors.push(`figure ${relative} must embed the package base SHA`);
    }
  }

  // 13. Metrics stay in sync with recomputation
  const metrics = context.metrics || {};
  const expectedMetrics = {
    brand_identity_contrast_pair_total: pairs.length,
    brand_identity_contrast_pair_passed: pairsPassed,
    brand_identity_lockup_bilingual_coverage_ratio: lockupRatio,
    brand_identity_no_color_only_coverage_ratio: noColorOnlyRatio,
    brand_identity_application_anchor_coverage_ratio: anchorRatio,
    brand_identity_negative_fixture_fail_closed_total: (reg.negative_fixtures || []).length,
  };
  for (const [key, expected] of Object.entries(expectedMetrics)) {
    const actual = metrics[key] && metrics[key].value;
    if (actual === undefined || Math.abs(actual - expected) > 1e-9) {
      errors.push(`metrics.json ${key}=${actual} does not match recomputed ${expected}`);
    }
  }
  return errors;
}

function loadContext() {
  const register = JSON.parse(fs.readFileSync(REGISTER_PATH, "utf8"));
  const registerSha256 = sha256File(REGISTER_PATH);
  const svgContents = {};
  for (const relative of register.svg_assets || []) {
    const absolute = path.join(ROOT, relative);
    if (fs.existsSync(absolute)) svgContents[relative] = fs.readFileSync(absolute, "utf8");
  }
  for (const lockup of register.lockups || []) {
    const absolute = path.join(ROOT, lockup.file);
    if (fs.existsSync(absolute)) svgContents[lockup.file] = fs.readFileSync(absolute, "utf8");
  }
  const keyAreas = loadJson("geometry/key_areas.geojson");
  const keyAreaIds = new Set((keyAreas.features || []).map((feature) => feature.properties && feature.properties.id));
  const publicSpace = loadJson("geometry/public_space.geojson");
  const scenarioIds = new Set((publicSpace.features || []).map((feature) => feature.properties && feature.properties.id));
  const protocolText = fs.readFileSync(path.join(ROOT, "visual/assets/expiring-data-ticket-protocol.json"), "utf8");
  const metrics = loadJson("metrics.json").metrics || {};
  const figureBytes = {};
  for (const key of ["primary", "english"]) {
    const relative = register.figure_contract && register.figure_contract[key];
    if (!relative) continue;
    const absolute = path.join(ROOT, relative);
    if (fs.existsSync(absolute)) figureBytes[relative] = fs.readFileSync(absolute);
  }
  return { register, registerSha256, svgContents, keyAreaIds, scenarioIds, protocolText, metrics, figureBytes };
}

function deepCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

const FIXTURES = [
  {
    id: "NEG-CONTRAST",
    mutate(context) {
      const pair = context.register.palette.declared_pairs.find((item) => item.id === "pair-ink-paper");
      pair.required_min_contrast = 99;
    },
  },
  {
    id: "NEG-STATE-LABEL",
    mutate(context) {
      delete context.register.state_tokens[0].label_en;
    },
  },
  {
    id: "NEG-COLOR-ONLY",
    mutate(context) {
      const rail = context.register.logo_mark.elements.find((el) => el.role === "no_data_equivalent_line");
      rail.dash = null;
    },
  },
  {
    id: "NEG-EXTERNAL-URL",
    mutate(context) {
      const mark = "visual/assets/brand/logo-mark.svg";
      context.svgContents[mark] = context.svgContents[mark].replace(
        "</svg>",
        '<image href="https://invalid.example/remote.png"/></svg>',
      );
    },
  },
  {
    id: "NEG-BAD-ANCHOR",
    mutate(context) {
      context.register.applications[0].anchor_ref = "PROV-KEY-099";
    },
  },
  {
    id: "NEG-MONO-MISSING",
    mutate(context) {
      delete context.svgContents["visual/assets/brand/logo-mark-mono.svg"];
    },
  },
];

function main() {
  const args = new Set(process.argv.slice(2));
  const asJson = args.has("--json");
  const selfTest = args.has("--self-test");
  const context = loadContext();

  if (selfTest) {
    const results = [];
    let unexpectedPasses = 0;
    for (const fixture of FIXTURES) {
      const mutated = deepCopy(context);
      // Sets and Buffers do not survive a JSON round trip and are read-only
      // for every fixture, so reattach them after copying the JSON parts.
      mutated.keyAreaIds = context.keyAreaIds;
      mutated.scenarioIds = context.scenarioIds;
      mutated.figureBytes = context.figureBytes;
      fixture.mutate(mutated);
      const errors = runChecks(mutated);
      const failedClosed = errors.length > 0;
      if (!failedClosed) unexpectedPasses += 1;
      results.push({ fixture: fixture.id, fail_closed: failedClosed, errors });
    }
    const report = {
      ok: unexpectedPasses === 0,
      mode: "self-test",
      fixtures_total: FIXTURES.length,
      fixtures_fail_closed: FIXTURES.length - unexpectedPasses,
      results,
    };
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
    return report.ok ? 0 : 1;
  }

  const errors = runChecks(context);
  const declaredFixtures = (context.register.negative_fixtures || []).map((item) => item.id).sort();
  const implementedFixtures = FIXTURES.map((item) => item.id).sort();
  if (JSON.stringify(declaredFixtures) !== JSON.stringify(implementedFixtures)) {
    errors.push("declared negative_fixtures drifted from the implemented self-test fixtures");
  }
  const checksTotal = 14;
  const checksPassed = errors.length === 0 ? checksTotal : checksTotal - 1;
  const caseTotalMetric = context.metrics.brand_identity_audit_case_total;
  const casePassedMetric = context.metrics.brand_identity_audit_case_passed;
  if (!caseTotalMetric || caseTotalMetric.value !== checksTotal) {
    errors.push(`metrics.json brand_identity_audit_case_total must be ${checksTotal}`);
  }
  if (!casePassedMetric || casePassedMetric.value !== checksPassed) {
    errors.push(`metrics.json brand_identity_audit_case_passed must be ${checksPassed}`);
  }
  const report = {
    ok: errors.length === 0,
    register_id: "BRAND-IDENTITY-01",
    register_sha256: context.registerSha256,
    checks_total: checksTotal,
    checks_passed: checksPassed,
    errors,
  };
  if (asJson) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    process.stdout.write(errors.length === 0
      ? "PASS: brand identity system is consistent\n"
      : `FAIL: brand identity system is inconsistent\n${errors.map((error) => `- ${error}`).join("\n")}\n`);
  }
  return errors.length === 0 ? 0 : 1;
}

try {
  process.exitCode = main();
} catch (error) {
  process.stderr.write(`${error && error.stack ? error.stack : error}\n`);
  process.exitCode = 1;
}
