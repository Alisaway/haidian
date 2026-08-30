#!/usr/bin/env node
"use strict";

/*
 * Offline CJK web-font gate.
 *
 * A clean-browser review exposed that macOS system fonts had hidden a missing
 * CJK dependency. The repository permits CSS/JS/JSON in visual/assets but not
 * a bare WOFF2 under assets/, so the font is embedded in a package-local CSS
 * data URI. This gate decodes the actual WOFF2 payload, binds it to coverage,
 * OFL, notice, source and manifest records, and requires every HTML entry point
 * to load the shared CSS. JZ_AUDIT_OVERLAY supports defect injection.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const CSS_REL = "visual/assets/governance/noto-cjk-subset.css";
const COVERAGE_REL = "visual/assets/governance/noto-cjk-subset.coverage.json";
const RIGHTS_REL = "visual/assets/governance/noto-cjk-subset.rights.json";
const BUILD_REL = "visual/assets/governance/build-webfont.js";
const FAMILY = "JZHandoverCJK";
const LICENSE_SHA256 = "6a73f9541c2de74158c0e7cf6b0a58ef774f5a780bf191f2d7ec9cc53efe2bf2";
const PAGES = [
  { path: "report/proposal.html", href: "../visual/assets/governance/noto-cjk-subset.css", primary: true, interactive: false },
  { path: "report/proposal.en.html", href: "../visual/assets/governance/noto-cjk-subset.css", primary: false, interactive: false },
  { path: "visual/index.html", href: "assets/governance/noto-cjk-subset.css", primary: true, interactive: true },
  { path: "visual/index.en.html", href: "assets/governance/noto-cjk-subset.css", primary: false, interactive: true },
];
const MONO_FALLBACK_MARKER = "/* CJK_MONO_FALLBACK_V1 */";
const MONO_FALLBACK_SELECTORS = [
  ".status", ".hero:after", ".eyebrow", ".hero-meta b", ".shift-line em",
  ".kicker", ".caption", ".scope-card:before", ".yard .code", ".yard h4",
  ".scenario-head .big", ".scenario .id", ".phase strong", ".metric strong",
  ".check b", ".check em", ".end small", ".sw-kicker", ".sw-stats b",
  ".off-k", ".off-s", ".reviewbar .rb-k", ".sw-btns button", ".reviewbar button",
];

function resolveIn(relative) {
  if (OVERLAY) {
    const candidate = path.join(OVERLAY, relative);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(PKG, relative);
}

function readText(relative) { return fs.readFileSync(resolveIn(relative), "utf8"); }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function decodeEntities(text) {
  const named = {
    amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: "\u00a0",
    ldquo: "\u201c", rdquo: "\u201d", lsquo: "\u2018", rsquo: "\u2019",
    ndash: "\u2013", mdash: "\u2014", times: "\u00d7", ge: "\u2265", le: "\u2264",
    Delta: "\u0394", rarr: "\u2192", middot: "\u00b7",
  };
  return text.replace(/&#(x[0-9a-f]+|\d+);|&([a-zA-Z]+);/g, (all, numeric, name) => {
    if (numeric) {
      const cp = numeric[0].toLowerCase() === "x" ? parseInt(numeric.slice(1), 16) : parseInt(numeric, 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : all;
    }
    return Object.prototype.hasOwnProperty.call(named, name) ? named[name] : all;
  });
}

function visibleCodepoints(html) {
  const text = decodeEntities(html)
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<style\b[^>]*>[^]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[^]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  const out = new Set();
  for (const character of text) {
    const cp = character.codePointAt(0);
    if (cp > 0x7f && !(cp >= 0xfe00 && cp <= 0xfe0f)) out.add(cp);
  }
  return out;
}

const errors = [];
let cssBuffer = null;
let fontBuffer = null;
let coverage = null;
let rightsMetadata = null;

try {
  cssBuffer = fs.readFileSync(resolveIn(CSS_REL));
  const css = cssBuffer.toString("utf8");
  const match = css.match(/url\(["']?data:font\/woff2;base64,([A-Za-z0-9+/=]+)["']?\)\s*format\(["']woff2["']\)/i);
  if (!match) errors.push(`${CSS_REL}: 缺 WOFF2 data URI`);
  else {
    fontBuffer = Buffer.from(match[1], "base64");
    if (fontBuffer.subarray(0, 4).toString("ascii") !== "wOF2") errors.push(`${CSS_REL}: data URI 不是 WOFF2`);
    if (fontBuffer.length < 50000 || fontBuffer.length > 2 * 1024 * 1024) errors.push(`${CSS_REL}: WOFF2 体积异常 ${fontBuffer.length} bytes`);
  }
  if (!new RegExp(`font-family\\s*:\\s*["']?${FAMILY}["']?`, "i").test(css)) errors.push(`${CSS_REL}: 字体族不是 ${FAMILY}`);
  if (!/font-display\s*:\s*block/i.test(css)) errors.push(`${CSS_REL}: 须使用 font-display:block`);
} catch (error) { errors.push(`${CSS_REL}: 缺失或不可读（${error.code || error.message}）`); }

try { coverage = JSON.parse(readText(COVERAGE_REL)); }
catch (error) { errors.push(`${COVERAGE_REL}: 缺失、不可读或 JSON 非法（${error.code || error.message}）`); }
try { rightsMetadata = JSON.parse(readText(RIGHTS_REL)); }
catch (error) { errors.push(`${RIGHTS_REL}: 缺失、不可读或 JSON 非法（${error.code || error.message}）`); }

if (fontBuffer && cssBuffer && coverage) {
  if (coverage.font_sha256 !== sha256(fontBuffer)) errors.push(`${COVERAGE_REL}: font_sha256 与 CSS 内字体不一致`);
  if (coverage.css_sha256 !== sha256(cssBuffer)) errors.push(`${COVERAGE_REL}: css_sha256 与交付 CSS 不一致`);
  if (coverage.css_path !== CSS_REL || coverage.rights_path !== RIGHTS_REL) errors.push(`${COVERAGE_REL}: 路径登记不准`);
  if (coverage.family !== FAMILY) errors.push(`${COVERAGE_REL}: family 应为 ${FAMILY}`);
  if (!Array.isArray(coverage.codepoints) || !coverage.codepoints.length) errors.push(`${COVERAGE_REL}: codepoints 为空`);
}

if (rightsMetadata) {
  const license = rightsMetadata.license || {};
  const notice = ((rightsMetadata.notice || {}).text || "");
  if (license.identifier !== "OFL-1.1" || !String(license.text || "").includes("SIL OPEN FONT LICENSE Version 1.1")) errors.push(`${RIGHTS_REL}: 缺 OFL 1.1 正文`);
  if (sha256(Buffer.from(license.text || "")) !== LICENSE_SHA256 || license.text_sha256 !== LICENSE_SHA256) errors.push(`${RIGHTS_REL}: OFL 正文与 Noto CJK 官方 Sans/LICENSE 不一致`);
  if (!notice.includes("Copyright © 2014-2021 Adobe") || !notice.includes("SIL Open Font License, Version 1.1")) errors.push(`${RIGHTS_REL}: 版权通知不完整`);
  if (fontBuffer && (((rightsMetadata.font_payload || {}).sha256 !== sha256(fontBuffer)) || rightsMetadata.font_payload.bytes !== fontBuffer.length)) errors.push(`${RIGHTS_REL}: 字体负载哈希或字节数不一致`);
}

const covered = new Set(coverage && Array.isArray(coverage.codepoints) ? coverage.codepoints : []);
let requiredCount = 0;
for (const page of PAGES) {
  let html;
  try { html = readText(page.path); }
  catch (error) { errors.push(`${page.path}: 缺失或不可读`); continue; }
  const link = new RegExp(`<link\\b[^>]*rel=["']stylesheet["'][^>]*href=["']${escapeRegExp(page.href)}["'][^>]*>`, "i");
  if (!link.test(html)) errors.push(`${page.path}: 缺本地 CJK 字体 CSS 链接 ${page.href}`);
  if (!new RegExp(`font-family\\s*:[^;{}]*${FAMILY}`, "i").test(html)) errors.push(`${page.path}: 页面样式未使用 ${FAMILY}`);
  if (page.primary && !new RegExp(`body\\s*\\{[^}]*font-family\\s*:\\s*["']?${FAMILY}["']?`, "is").test(html)) errors.push(`${page.path}: 中文 body 必须把 ${FAMILY} 放在字体栈首位`);
  if (page.interactive) {
    const markerAt = html.indexOf(MONO_FALLBACK_MARKER);
    const styleEnd = markerAt < 0 ? -1 : html.indexOf("</style>", markerAt);
    const fallbackRule = markerAt < 0 || styleEnd < 0 ? "" : html.slice(markerAt, styleEnd);
    if (!fallbackRule) errors.push(`${page.path}: 缺 CJK-safe 等宽字体回退规则`);
    else {
      const missingSelectors = MONO_FALLBACK_SELECTORS.filter((selector) => !fallbackRule.includes(selector));
      if (missingSelectors.length) errors.push(`${page.path}: CJK-safe 等宽回退漏选择器 ${missingSelectors.slice(0, 5).join("、")}`);
      const declaration = fallbackRule.match(/font-family\s*:\s*([^;}]+)/i);
      if (!declaration || !declaration[1].includes(FAMILY) || !/monospace/i.test(declaration[1]) || !/!important/i.test(declaration[1])) {
        errors.push(`${page.path}: 等宽标签未显式回退到 ${FAMILY}`);
      }
    }
    const invalidInherit = [...html.matchAll(/font\s*:\s*([^;{}]+)/gi)]
      .map((match) => match[1].trim())
      .filter((value) => value !== "inherit" && /\binherit\b/i.test(value));
    if (invalidInherit.length) errors.push(`${page.path}: 存在无效 font shorthand inherit（${invalidInherit[0]}）`);
  }
  const codepoints = visibleCodepoints(html);
  requiredCount += codepoints.size;
  const missing = [...codepoints].filter((cp) => !covered.has(cp));
  if (missing.length) errors.push(`${page.path}: 子集缺 ${missing.slice(0, 8).map((cp) => `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`).join("、")}${missing.length > 8 ? ` 等 ${missing.length} 字` : ""}`);
}

try {
  const manifest = JSON.parse(readText("manifest.json"));
  const entries = new Map((manifest.files || []).map((item) => [item.path, item]));
  for (const relative of [CSS_REL, COVERAGE_REL, RIGHTS_REL, BUILD_REL]) {
    const item = entries.get(relative);
    if (!item) errors.push(`manifest.json: 未登记 ${relative}`);
    else if (relative === CSS_REL && cssBuffer && item.sha256 !== sha256(cssBuffer)) errors.push(`manifest.json: ${relative} sha256 不一致`);
  }
  const rights = ((manifest.rights_inventory || {}).assets || []).find((item) => item.asset_class === "web_font_assets");
  if (!rights) errors.push("manifest.json#rights_inventory: 缺 web_font_assets 权利登记");
  else if (rights.rights_holder !== "Google_Adobe_Noto_contributors" || rights.licence !== "OFL-1.1" || rights.licence_text_location !== `${RIGHTS_REL}#license.text`) errors.push("manifest.json#rights_inventory: Web 字体权利人、许可或正文位置登记不准");
} catch (error) { errors.push(`manifest.json: 无法核验 Web 字体登记（${error.message}）`); }

try {
  const sources = JSON.parse(readText("sources.json")).sources || [];
  const source = sources.find((item) => item.id === "FONT-NOTO-WEB");
  if (!source) errors.push("sources.json: 缺 FONT-NOTO-WEB 来源登记");
  else if (fontBuffer && !(source.collection_method || "").includes(sha256(fontBuffer))) errors.push("sources.json#FONT-NOTO-WEB: 未登记交付字体 sha256");
} catch (error) { errors.push(`sources.json: 无法核验 FONT-NOTO-WEB（${error.message}）`); }

const result = {
  ok: errors.length === 0,
  family: FAMILY,
  css_path: CSS_REL,
  font_bytes: fontBuffer ? fontBuffer.length : null,
  font_sha256: fontBuffer ? sha256(fontBuffer) : null,
  pages_checked: PAGES.length,
  visible_codepoint_sets_checked: requiredCount,
  interactive_mono_fallback_selectors_checked: MONO_FALLBACK_SELECTORS.length,
  errors,
};

if (process.argv.includes("--json")) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else if (result.ok) process.stdout.write(`PASS  ${PAGES.length} 页使用本地 ${FAMILY}；CSS 内 WOFF2 ${result.font_bytes} bytes；字形与权利链通过\n`);
else for (const error of errors) process.stderr.write(`FAIL  ${error}\n`);
process.exit(result.ok ? 0 : 1);
