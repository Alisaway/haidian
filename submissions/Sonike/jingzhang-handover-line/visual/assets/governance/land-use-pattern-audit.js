#!/usr/bin/env node
"use strict";

/* Read-only audit for the non-colour land-use encoding added after
 * A-CONTRAST-001. It decodes the two source PNGs directly and renders page 2
 * of all four review PDFs at 72 dpi. Every one of the seven land-use codes
 * must retain its original fill colour and carry its own deterministic
 * texture in the plan and legend (plus the mix bar in F/02).
 *
 * No network or third-party Node package is used. Poppler's pdftoppm is the
 * same review-facing renderer used for the visual PDF checks.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const zlib = require("zlib");
const { spawnSync } = require("child_process");

const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const EXPECTED_CODES = ["0802", "0804", "09", "0701", "0702", "0803", "1401"];
const EXPECTED_PATTERNS = ["vertical", "diagonal_back", "dash", "horizontal", "diagonal_forward", "crosshatch", "dots"];
const FIGURES = ["assets/figures/land-use-structure.png", "assets/figures/land-use-structure.en.png"];
const PDFS = ["drawings/a0-boards.pdf", "drawings/a0-boards.en.pdf", "drawings/a3-booklet.pdf", "drawings/a3-booklet.en.pdf"];

function resolveIn(relative) {
  if (OVERLAY) {
    const candidate = path.join(OVERLAY, relative);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(PKG, relative);
}

function paeth(left, up, upperLeft) {
  const estimate = left + up - upperLeft;
  const dl = Math.abs(estimate - left), du = Math.abs(estimate - up), dul = Math.abs(estimate - upperLeft);
  if (dl <= du && dl <= dul) return left;
  return du <= dul ? up : upperLeft;
}

function pngRgbFile(file) {
  const input = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!input.subarray(0, 8).equals(signature)) throw new Error(`${file}: not a PNG`);
  let offset = 8, width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  while (offset + 12 <= input.length) {
    const length = input.readUInt32BE(offset);
    const type = input.subarray(offset + 4, offset + 8).toString("ascii");
    const data = input.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9]; interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    offset += length + 12;
  }
  if (bitDepth !== 8 || ![2, 6].includes(colorType) || interlace !== 0 || !width || !height) {
    throw new Error(`${file}: unsupported PNG depth/type/interlace ${bitDepth}/${colorType}/${interlace}`);
  }
  const channels = colorType === 2 ? 3 : 4;
  const stride = width * channels;
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  if (inflated.length !== height * (stride + 1)) throw new Error(`${file}: invalid inflated length`);
  const rgb = Buffer.alloc(width * height * 3);
  let sourceOffset = 0;
  let previous = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset++];
    const row = Buffer.alloc(stride);
    for (let x = 0; x < stride; x += 1) {
      const raw = inflated[sourceOffset + x];
      const left = x >= channels ? row[x - channels] : 0;
      const up = previous[x];
      const upperLeft = x >= channels ? previous[x - channels] : 0;
      let predictor = 0;
      if (filter === 1) predictor = left;
      else if (filter === 2) predictor = up;
      else if (filter === 3) predictor = Math.floor((left + up) / 2);
      else if (filter === 4) predictor = paeth(left, up, upperLeft);
      else if (filter !== 0) throw new Error(`${file}: unknown PNG filter ${filter}`);
      row[x] = (raw + predictor) & 0xff;
    }
    for (let x = 0; x < width; x += 1) {
      const source = x * channels, target = (y * width + x) * 3;
      rgb[target] = row[source]; rgb[target + 1] = row[source + 1]; rgb[target + 2] = row[source + 2];
    }
    sourceOffset += stride;
    previous = row;
  }
  return { width, height, rgb };
}

function onPattern(pattern, x, y) {
  if (pattern === "vertical") return x % 10 < 2;
  if (pattern === "diagonal_back") return ((x - y) % 12 + 12) % 12 < 2;
  if (pattern === "dash") return y % 10 < 2 && x % 14 < 8;
  if (pattern === "horizontal") return y % 10 < 2;
  if (pattern === "diagonal_forward") return (x + y) % 12 < 2;
  if (pattern === "crosshatch") return (x + y) % 14 < 1 || ((x - y) % 14 + 14) % 14 < 1;
  if (pattern === "dots") return x % 10 < 2 && y % 10 < 2;
  return false;
}

function samePixel(rgb, offset, target) {
  return rgb[offset] === target[0] && rgb[offset + 1] === target[1] && rgb[offset + 2] === target[2];
}

const errors = [];
let report = null;
try { report = JSON.parse(fs.readFileSync(resolveIn("visual/assets/governance/figure-contrast-report.json"), "utf8")); }
catch (error) { errors.push(`figure-contrast-report.json unreadable: ${error.message}`); }

let encodings = [];
if (report) {
  const section = report.non_color_redundancy || {};
  encodings = Array.isArray(section.land_use_encodings) ? section.land_use_encodings : [];
  if (section.status !== "implemented_pending_real_user_validation") errors.push("non-colour status must retain the pending-real-user-validation boundary");
  if (section.base_colours_unchanged !== true) errors.push("base_colours_unchanged must be true");
  if (section.real_user_testing_completed !== false) errors.push("real_user_testing_completed must remain false until evidence exists");
  if (section.carriers_expected !== 6) errors.push("carriers_expected must be 6");
  const codes = encodings.map((item) => item.code);
  const patterns = encodings.map((item) => item.pattern_id);
  if (JSON.stringify(codes) !== JSON.stringify(EXPECTED_CODES)) errors.push(`encoding codes are ${JSON.stringify(codes)}`);
  if (JSON.stringify(patterns) !== JSON.stringify(EXPECTED_PATTERNS)) errors.push(`pattern mapping is ${JSON.stringify(patterns)}`);
  if (new Set(patterns).size !== 7) errors.push("the seven pattern IDs are not unique");
  for (const item of encodings) {
    const expected = item.base_rgb.map((value, index) => Math.round(value * 0.6 + [22, 25, 24][index] * 0.4));
    if (JSON.stringify(item.pattern_rgb) !== JSON.stringify(expected)) errors.push(`${item.code}: pattern_rgb does not use the registered 40% coal mix`);
  }
}

const details = [];
let regionChecks = 0;
function auditCarrier(label, image, kind) {
  for (const item of encodings) {
    let total = 0, base = 0, patterned = 0, misplaced = 0;
    const regions = kind === "figure" ? [0, 0, 0] : [0, 0];
    for (let y = 0; y < image.height; y += 1) {
      for (let x = 0; x < image.width; x += 1) {
        const offset = (y * image.width + x) * 3;
        const isBase = samePixel(image.rgb, offset, item.base_rgb);
        const isPattern = samePixel(image.rgb, offset, item.pattern_rgb);
        if (!isBase && !isPattern) continue;
        total += 1;
        if (isPattern) {
          patterned += 1;
          if (!onPattern(item.pattern_id, x, y)) misplaced += 1;
          if (kind === "figure") {
            if (x < image.width * 0.15) regions[0] += 1;
            else if (x < image.width * 0.5) regions[1] += 1;
            else regions[2] += 1;
          } else if (x < image.width * 0.38) regions[0] += 1;
          else regions[1] += 1;
        } else base += 1;
      }
    }
    const ratio = total ? patterned / total : 0;
    const minimum = kind === "figure" ? 500 : 80;
    if (total < minimum) errors.push(`${label}/${item.code}: only ${total} fill pixels found`);
    if (patterned < 12 || ratio < 0.015 || ratio > 0.38) errors.push(`${label}/${item.code}: pattern coverage ${patterned}/${total} (${ratio.toFixed(3)})`);
    if (base <= patterned) errors.push(`${label}/${item.code}: base fill no longer remains dominant`);
    if (misplaced) errors.push(`${label}/${item.code}: ${misplaced} pattern pixels fall outside its deterministic texture`);
    regions.forEach((count, index) => {
      regionChecks += 1;
      if (count < 3) errors.push(`${label}/${item.code}: pattern absent from region ${index + 1}`);
    });
    details.push({ carrier: label, code: item.code, pattern_id: item.pattern_id, fill_pixels: total, pattern_pixels: patterned, pattern_ratio: Number(ratio.toFixed(4)), region_pattern_pixels: regions });
  }
}

for (const relative of FIGURES) {
  try { auditCarrier(relative, pngRgbFile(resolveIn(relative)), "figure"); }
  catch (error) { errors.push(`${relative}: ${error.message}`); }
}

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "jz-pattern-audit-"));
try {
  for (let index = 0; index < PDFS.length; index += 1) {
    const relative = PDFS[index];
    const prefix = path.join(temporary, `pdf-${index}`);
    const rendered = spawnSync("pdftoppm", ["-f", "2", "-l", "2", "-singlefile", "-png", "-r", "72", resolveIn(relative), prefix], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
    if (rendered.status !== 0) { errors.push(`${relative}: pdftoppm failed: ${(rendered.stderr || "").trim()}`); continue; }
    try { auditCarrier(`${relative}#page=2`, pngRgbFile(`${prefix}.png`), "pdf"); }
    catch (error) { errors.push(`${relative}: ${error.message}`); }
  }
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }

const result = {
  ok: errors.length === 0,
  carriers_checked: FIGURES.length + PDFS.length,
  land_use_codes_checked: encodings.length,
  code_carrier_pairs_checked: details.length,
  pattern_region_checks: regionChecks,
  base_colours_unchanged: report && report.non_color_redundancy ? report.non_color_redundancy.base_colours_unchanged : null,
  real_user_testing_completed: report && report.non_color_redundancy ? report.non_color_redundancy.real_user_testing_completed : null,
  errors,
  details,
};

if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else if (result.ok) process.stdout.write(`PASS  ${result.land_use_codes_checked} 类用地 × ${result.carriers_checked} 个载体，${result.pattern_region_checks} 个纹理区域检查全部通过；真实用户共测仍未完成\n`);
else for (const error of errors) process.stderr.write(`FAIL  ${error}\n`);
process.exit(result.ok ? 0 : 1);
