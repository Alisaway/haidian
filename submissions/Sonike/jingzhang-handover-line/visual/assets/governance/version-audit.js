#!/usr/bin/env node
"use strict";

/* Pure-Node integrity gate for the visible v2.0 package identity.
 * Binary figures and PDFs are bound to their independently generated stamp
 * reports by SHA-256; HTML and tactile SVG deliverables are checked directly.
 * JZ_AUDIT_OVERLAY lets audit-selftest.js inject defects without touching the
 * submission package. No network or third-party module is used.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const zlib = require("zlib");
const { spawnSync } = require("child_process");

const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const LABEL = "JING-ZHANG HANDOVER LINE / PACKAGE v2.0";
const STATIC = [
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
  "assets/tactile/tactile-corridor-map.svg",
  "assets/tactile/tactile-corridor-map.en.svg",
];
const A0_EMBEDDED_FIGURES = [
  {
    pdf: "drawings/a0-boards.pdf",
    figures: ["assets/figures/site-overview.png", "assets/figures/key-areas.png"],
  },
  {
    pdf: "drawings/a0-boards.en.pdf",
    figures: ["assets/figures/site-overview.en.png", "assets/figures/key-areas.en.png"],
  },
];

function resolveIn(rel) {
  if (OVERLAY) {
    const candidate = path.join(OVERLAY, rel);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(PKG, rel);
}

function read(rel) { return fs.readFileSync(resolveIn(rel)); }
function json(rel) { return JSON.parse(read(rel).toString("utf8")); }
function sha256(rel) { return crypto.createHash("sha256").update(read(rel)).digest("hex"); }

function paeth(left, up, upperLeft) {
  const estimate = left + up - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const upDistance = Math.abs(estimate - up);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= upDistance && leftDistance <= upperLeftDistance) return left;
  return upDistance <= upperLeftDistance ? up : upperLeft;
}

function pngRgb(relative) {
  const input = read(relative);
  if (!input.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    throw new Error("不是 PNG");
  }
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idat = [];
  while (offset + 12 <= input.length) {
    const length = input.readUInt32BE(offset);
    const type = input.subarray(offset + 4, offset + 8).toString("ascii");
    const data = input.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    offset += length + 12;
  }
  if (bitDepth !== 8 || ![2, 6].includes(colorType) || interlace !== 0 || !width || !height) {
    throw new Error(`只支持非交错 8-bit RGB/RGBA，实际 depth=${bitDepth} type=${colorType} interlace=${interlace}`);
  }
  const channels = colorType === 2 ? 3 : 4;
  const stride = width * channels;
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  if (inflated.length !== height * (stride + 1)) throw new Error("PNG 解压长度异常");
  const rgb = Buffer.alloc(width * height * 3);
  let sourceOffset = 0;
  let previous = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[sourceOffset];
    sourceOffset += 1;
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
      else if (filter !== 0) throw new Error(`未知 PNG filter ${filter}`);
      row[x] = (raw + predictor) & 0xff;
    }
    for (let x = 0; x < width; x += 1) {
      const source = x * channels;
      const target = (y * width + x) * 3;
      if (channels === 4 && row[source + 3] !== 255) throw new Error("PNG 含非不透明像素，不能直接与 PDF RGB 比较");
      rgb[target] = row[source];
      rgb[target + 1] = row[source + 1];
      rgb[target + 2] = row[source + 2];
    }
    sourceOffset += stride;
    previous = row;
  }
  return { width, height, rgb };
}

function ppmRgb(file) {
  const input = fs.readFileSync(file);
  let offset = 0;
  function token() {
    while (offset < input.length) {
      if (input[offset] === 35) {
        while (offset < input.length && input[offset] !== 10) offset += 1;
      } else if (input[offset] <= 32) offset += 1;
      else break;
    }
    const start = offset;
    while (offset < input.length && input[offset] > 32 && input[offset] !== 35) offset += 1;
    return input.subarray(start, offset).toString("ascii");
  }
  const magic = token();
  const width = Number(token());
  const height = Number(token());
  const maximum = Number(token());
  if (magic !== "P6" || maximum !== 255 || !width || !height) throw new Error("pdfimages 未输出 8-bit PPM");
  if (input[offset] === 13 && input[offset + 1] === 10) offset += 2;
  else if (input[offset] <= 32) offset += 1;
  else throw new Error("PPM header 与像素数据之间缺少空白分隔符");
  const rgb = input.subarray(offset);
  if (rgb.length !== width * height * 3) throw new Error("PPM 像素长度异常");
  return { width, height, rgb };
}

function auditA0EmbeddedFigures() {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "jz-a0-figures-"));
  let matches = 0;
  try {
    for (let pairIndex = 0; pairIndex < A0_EMBEDDED_FIGURES.length; pairIndex += 1) {
      const pair = A0_EMBEDDED_FIGURES[pairIndex];
      const prefix = path.join(temporary, `a0-${pairIndex}`);
      const extracted = spawnSync("pdfimages", ["-f", "1", "-l", "1", resolveIn(pair.pdf), prefix], { encoding: "utf8" });
      if (extracted.status !== 0) {
        errors.push(`${pair.pdf}: pdfimages 无法提取第 1 页图件（${(extracted.stderr || "").trim()}）`);
        continue;
      }
      const files = fs.readdirSync(temporary)
        .filter((name) => name.startsWith(`a0-${pairIndex}-`) && name.endsWith(".ppm"))
        .sort()
        .map((name) => path.join(temporary, name));
      if (files.length !== pair.figures.length) {
        errors.push(`${pair.pdf}: 第 1 页应恰含 ${pair.figures.length} 张 RGB 图件，实际 ${files.length}`);
        continue;
      }
      for (let index = 0; index < pair.figures.length; index += 1) {
        try {
          const expected = pngRgb(pair.figures[index]);
          const actual = ppmRgb(files[index]);
          const same = expected.width === actual.width && expected.height === actual.height && expected.rgb.equals(actual.rgb);
          if (!same) errors.push(`${pair.pdf}: 第 1 页内嵌 ${pair.figures[index]} 与当前 v2.0 源图像素不一致`);
          else matches += 1;
        } catch (error) { errors.push(`${pair.pdf}: 无法核验 ${pair.figures[index]}（${error.message}）`); }
      }
    }
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
  return matches;
}

const errors = [];

let figures = null;
try { figures = json("visual/assets/governance/version-stamp-report.json"); }
catch (error) { errors.push(`version-stamp-report.json 无法读取：${error.message}`); }
if (figures) {
  if (figures.package_version !== "v2.0" || figures.visible_label !== LABEL) errors.push("图件版本报告不是 v2.0");
  if (figures.legacy_visible_version_allowed !== false) errors.push("图件版本报告未禁止旧可见版本");
  if (figures.figure_count !== 26 || !Array.isArray(figures.figures) || figures.figures.length !== 26) {
    errors.push("图件版本报告必须恰含 26 张图件");
  }
  for (const item of figures.figures || []) {
    try {
      if (sha256(item.path) !== item.file_sha256) errors.push(`${item.path}: 与 v2.0 图件版本报告哈希不符`);
    } catch (error) { errors.push(`${item.path}: 缺失或不可读`); }
  }
}

let pdfs = null;
try { pdfs = json("visual/assets/governance/pdf-version-report.json"); }
catch (error) { errors.push(`pdf-version-report.json 无法读取：${error.message}`); }
if (pdfs) {
  if (pdfs.package_version !== "v2.0" || pdfs.ok !== true) errors.push("PDF 版本报告不是通过状态的 v2.0");
  if (pdfs.pdf_count !== 4 || pdfs.page_count !== 38 || !Array.isArray(pdfs.pdfs) || pdfs.pdfs.length !== 4) {
    errors.push("PDF 版本报告必须恰含 4 套、38 页");
  }
  if (pdfs.a0_embedded_figure_pixel_matches !== 4) errors.push("PDF 版本报告必须登记 A0 首页内嵌图 4/4 像素一致");
  for (const item of pdfs.pdfs || []) {
    if (item.package_v2_hits !== item.pages || item.legacy_v1_15_hits !== 0) {
      errors.push(`${item.path}: 可检索包版本命中数不是 ${item.pages}/0`);
    }
    try {
      if (sha256(item.path) !== item.sha256) errors.push(`${item.path}: 与 v2.0 PDF 版本报告哈希不符`);
    } catch (error) { errors.push(`${item.path}: 缺失或不可读`); }
  }
}

for (const rel of STATIC) {
  try {
    const text = read(rel).toString("utf8");
    if (!text.includes("PACKAGE v2.0")) errors.push(`${rel}: 缺可见 PACKAGE v2.0`);
    if (text.includes("PACKAGE v1.15")) errors.push(`${rel}: 仍含旧可见 PACKAGE v1.15`);
  } catch (error) { errors.push(`${rel}: 缺失或不可读`); }
}

const a0EmbeddedFigurePixelMatches = auditA0EmbeddedFigures();

const result = {
  ok: errors.length === 0,
  package_version: "v2.0",
  figure_count: figures ? figures.figure_count : null,
  pdf_count: pdfs ? pdfs.pdf_count : null,
  pdf_page_count: pdfs ? pdfs.page_count : null,
  static_deliverables_checked: STATIC.length,
  a0_embedded_figure_pixel_matches: a0EmbeddedFigurePixelMatches,
  errors,
};

if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else if (result.ok) process.stdout.write(`PASS  26 张图件、4 套 38 页 PDF、${STATIC.length} 份静态载体及 A0 首页 4 张内嵌图统一为 PACKAGE v2.0\n`);
else for (const error of errors) process.stderr.write(`FAIL  ${error}\n`);
process.exit(result.ok ? 0 : 1);
