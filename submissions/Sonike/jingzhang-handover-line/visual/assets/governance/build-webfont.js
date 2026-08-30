#!/usr/bin/env node
"use strict";

/*
 * Deterministically build the package-local CJK web-font CSS.
 *
 * The repository permits CSS/JS/JSON below visual/assets, but does not permit
 * a bare WOFF2 under assets/.  This builder therefore subsets the registered
 * Noto source, embeds the resulting WOFF2 as a local CSS data URI, and writes
 * separate hash-bound coverage and OFL/notice metadata JSON.  It never uses
 * the network.
 *
 * Rebuild:
 *   PYTHON=python3 node build-webfont.js \
 *     --source-font /path/to/NotoSansCJKsc-Medium.otf \
 *     [--license-file /path/to/noto-cjk/Sans/LICENSE]
 *
 * Reattach and verify an existing, already sufficient subset after rebuilding
 * report HTML (does not create or expand font glyphs):
 *   node build-webfont.js --reuse-existing-subset
 *
 * When --license-file is omitted, the builder reuses the hash-bound full OFL
 * text already present in noto-cjk-subset.rights.json. This keeps an offline
 * rebuild self-contained without weakening the fixed licence checksum.
 *
 * Python needs fontTools with WOFF2/Brotli support.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { spawnSync } = require("child_process");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
// Official noto-cjk main/Sans/OTF/SimplifiedChinese binary. Keep the checksum
// fail-closed: a future upstream binary change must be reviewed and recorded
// before it can alter the delivered subset.
const SOURCE_SHA256 = "ca094f6b0001fb048ca39ddd797a0cdb0179e1e55c6561e111c49c3e6a61d7b7";
const LICENSE_SHA256 = "6a73f9541c2de74158c0e7cf6b0a58ef774f5a780bf191f2d7ec9cc53efe2bf2";
const FAMILY = "JZHandoverCJK";
const CSS_REL = "visual/assets/governance/noto-cjk-subset.css";
const COVERAGE_REL = "visual/assets/governance/noto-cjk-subset.coverage.json";
const RIGHTS_REL = "visual/assets/governance/noto-cjk-subset.rights.json";
const PAGES = [
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
];
const GLYPH_SOURCES = [
  ...PAGES,
  "visual/assets/governance/build-p0-feasibility-figure.js",
  "visual/assets/governance/build-implementation-handoff-figure.js",
  "visual/assets/governance/build-operational-readiness-figure.js",
  "visual/assets/governance/build-delivery-pdfs.js",
];
const REPORT_PAGES = PAGES.slice(0, 2);
const REPORT_LINK = '<link rel="stylesheet" href="../visual/assets/governance/noto-cjk-subset.css">';
const REPORT_STAMP = '<p class="package-stamp">PACKAGE v2.0</p>';
const REPORT_STAMP_CSS = [
  ".package-stamp {",
  "  margin: 12px 0 0;",
  "  color: var(--accent);",
  "  font: 700 12px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, \"Liberation Mono\", \"JZHandoverCJK\", monospace;",
  "  letter-spacing: 0.08em;",
  "}",
].join("\n");

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index < 0 || !process.argv[index + 1]) throw new Error(`缺参数 ${name}`);
  return path.resolve(process.argv[index + 1]);
}

function optionalArgument(name) {
  const index = process.argv.indexOf(name);
  return index < 0 || !process.argv[index + 1] ? null : path.resolve(process.argv[index + 1]);
}

function runPython(python, args) {
  const result = spawnSync(python, args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) {
    throw new Error([result.stderr, result.stdout].filter(Boolean).join("\n").trim() || `Python 退出 ${result.status}`);
  }
  return result.stdout;
}

/* The repository's generic Markdown renderer intentionally emits no
 * submission-specific font or package identity. Restore this package shell
 * deterministically before collecting glyphs so a later report rebuild cannot
 * silently drop the offline CJK dependency or the visible v2.0 stamp. */
function prepareReportPages() {
  const plainStack = 'font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;';
  const localStack = 'font-family: "JZHandoverCJK", -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;';
  for (const relative of REPORT_PAGES) {
    const target = path.join(PKG, relative);
    let text = fs.readFileSync(target, "utf8");
    if (!text.includes(REPORT_LINK)) {
      if (!text.includes("<title>")) throw new Error(`${relative} 缺 <title>，无法插入本地字体链接`);
      text = text.replace("<title>", `${REPORT_LINK}\n<title>`);
    }
    if (!text.includes(localStack)) {
      if (!text.includes(plainStack)) throw new Error(`${relative} 找不到可验证的 body 字体栈`);
      text = text.replace(plainStack, localStack);
    }
    if (!text.includes(REPORT_STAMP_CSS)) {
      const cssAnchor = ".translation-link a { color: var(--accent); font-weight: 700; }";
      if (!text.includes(cssAnchor)) throw new Error(`${relative} 找不到版本标识样式锚点`);
      text = text.replace(cssAnchor, `${REPORT_STAMP_CSS}\n${cssAnchor}`);
    }
    if (!text.includes(REPORT_STAMP)) {
      const summary = /<p class="summary">[^<]*<\/p>/;
      if (!summary.test(text)) throw new Error(`${relative} 找不到版本标识内容锚点`);
      text = text.replace(summary, (match) => `${match}\n${REPORT_STAMP}`);
    }
    fs.writeFileSync(target, text);
  }
}

function requiredCodepoints() {
  const wanted = new Set();
  for (let cp = 0x20; cp < 0x7f; cp += 1) wanted.add(cp);
  wanted.add(0x00a0);
  for (const relative of GLYPH_SOURCES) {
    const text = fs.readFileSync(path.join(PKG, relative), "utf8");
    for (const character of text) {
      const cp = character.codePointAt(0);
      if (cp > 0x7f) wanted.add(cp);
    }
  }
  return [...wanted].sort((a, b) => a - b);
}

function main() {
  const reuseExisting = process.argv.includes("--reuse-existing-subset");
  if (reuseExisting) {
    prepareReportPages();
    const wanted = requiredCodepoints();
    const coveragePath = path.join(PKG, COVERAGE_REL);
    const coverage = JSON.parse(fs.readFileSync(coveragePath, "utf8"));
    const covered = new Set(Array.isArray(coverage.codepoints) ? coverage.codepoints : []);
    const missing = wanted.filter((cp) => !covered.has(cp));
    if (missing.length) {
      throw new Error(`现有 WOFF2 缺 ${missing.length} 个码位，必须提供 --source-font 重建：${missing.slice(0, 8).map((cp) => `U+${cp.toString(16).toUpperCase()}`).join(", ")}`);
    }
    coverage.pages = PAGES;
    coverage.glyph_sources = GLYPH_SOURCES;
    coverage.requested_codepoint_count = wanted.length;
    coverage.reuse_verification = "existing subset reattached after report render; every currently visible codepoint is covered; no glyph payload was changed";
    fs.writeFileSync(coveragePath, `${JSON.stringify(coverage, null, 2)}\n`);
    process.stdout.write(`reused ${CSS_REL}; all ${wanted.length} requested codepoints are already covered\n`);
    return;
  }
  const source = argument("--source-font");
  const licenseFile = optionalArgument("--license-file");
  const python = process.env.PYTHON || "python3";
  const sourceBuffer = fs.readFileSync(source);
  const licenseText = licenseFile
    ? fs.readFileSync(licenseFile, "utf8")
    : JSON.parse(fs.readFileSync(path.join(PKG, RIGHTS_REL), "utf8")).license.text;
  if (sha256(sourceBuffer) !== SOURCE_SHA256) throw new Error("原始 OTF sha256 不匹配");
  if (sha256(Buffer.from(licenseText)) !== LICENSE_SHA256) throw new Error("OFL 正文 sha256 不匹配");

  prepareReportPages();
  const wanted = requiredCodepoints();
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "jz-webfont-"));
  const output = path.join(temporary, "NotoSansCJKsc-Medium.subset.woff2");
  try {
    runPython(python, [
      "-m", "fontTools.subset", source,
      `--output-file=${output}`,
      "--flavor=woff2",
      `--unicodes=${wanted.map((cp) => `U+${cp.toString(16).toUpperCase()}`).join(",")}`,
      "--layout-features=*",
      "--name-IDs=*",
      "--name-languages=*",
      "--notdef-glyph",
      "--notdef-outline",
      "--recommended-glyphs",
      "--no-hinting",
      "--no-recalc-timestamp",
    ]);

    const probe = [
      "import json, sys",
      "from fontTools.ttLib import TTFont",
      "font = TTFont(sys.argv[1], recalcTimestamp=False)",
      "covered = sorted(set().union(*(set(table.cmap.keys()) for table in font['cmap'].tables)))",
      "name = font['name']",
      "value = lambda key: (name.getDebugName(key) or '').strip()",
      "print(json.dumps({'codepoints': covered, 'copyright': value(0), 'version': value(5), 'licence': value(13)}, ensure_ascii=False))",
    ].join("\n");
    const metadata = JSON.parse(runPython(python, ["-c", probe, output]));
    const covered = new Set(metadata.codepoints);
    const missing = wanted.filter((cp) => !covered.has(cp));
    if (missing.length) throw new Error(`交付 WOFF2 缺 ${missing.length} 个请求码位`);

    const font = fs.readFileSync(output);
    if (font.subarray(0, 4).toString("ascii") !== "wOF2") throw new Error("输出不是 WOFF2");
    const fontHash = sha256(font);
    const css = [
      "/* Noto Sans CJK SC subset; SIL OFL 1.1.",
      `   Rights and full licence: ${RIGHTS_REL} */`,
      "@font-face {",
      `  font-family: \"${FAMILY}\";`,
      `  src: url(\"data:font/woff2;base64,${font.toString("base64")}\") format(\"woff2\");`,
      "  font-weight: 500;",
      "  font-style: normal;",
      "  font-display: block;",
      "}",
      "",
    ].join("\n");
    const cssBuffer = Buffer.from(css);
    fs.writeFileSync(path.join(PKG, CSS_REL), cssBuffer);

    const coverage = {
      schema_version: "1.0.0",
      family: FAMILY,
      font_container: "WOFF2 embedded as a local CSS data URI",
      css_path: CSS_REL,
      payload_locator: "data:font/woff2;base64",
      css_sha256: sha256(cssBuffer),
      font_sha256: fontHash,
      font_bytes: font.length,
      source_filename: path.basename(source),
      source_sha256: SOURCE_SHA256,
      source_version: metadata.version,
      source_url: "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Medium.otf",
      copyright: metadata.copyright,
      licence: metadata.licence,
      rights_path: RIGHTS_REL,
      pages: PAGES,
      glyph_sources: GLYPH_SOURCES,
      requested_codepoint_count: wanted.length,
      delivered_codepoint_count: metadata.codepoints.length,
      codepoints: metadata.codepoints,
      generator: "fontTools subset; WOFF2/Brotli; CSS data URI; no network access",
    };
    fs.writeFileSync(path.join(PKG, COVERAGE_REL), `${JSON.stringify(coverage, null, 2)}\n`);

    const noticeText = "Noto Sans CJK SC Medium — Copyright © 2014-2021 Adobe (http://www.adobe.com/).\nNoto is a trademark of Google Inc. The embedded WOFF2 is a character subset of NotoSansCJKsc-Medium.otf and remains licensed solely under the SIL Open Font License, Version 1.1. No endorsement by Adobe, Google, or any contributor is implied.\n";
    const rights = {
      schema_version: "1.0.0",
      component: "Noto Sans CJK SC Medium character subset",
      rights_holder: "Google / Adobe / Noto contributors",
      css_path: CSS_REL,
      font_payload: { format: "WOFF2", sha256: fontHash, bytes: font.length },
      license: {
        identifier: "OFL-1.1",
        source_url: "https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE",
        text_sha256: LICENSE_SHA256,
        text: licenseText,
      },
      notice: { text: noticeText },
      author_grant_excluded: true,
    };
    fs.writeFileSync(path.join(PKG, RIGHTS_REL), `${JSON.stringify(rights, null, 2)}\n`);
    process.stdout.write(`built ${CSS_REL} (${font.length} WOFF2 bytes; ${fontHash})\n`);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

try { main(); }
catch (error) { process.stderr.write(`FAIL  ${error.message}\n`); process.exit(1); }
