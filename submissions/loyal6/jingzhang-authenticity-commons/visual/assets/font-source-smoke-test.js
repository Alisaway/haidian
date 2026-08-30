#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "../..");
const read = p => fs.readFileSync(path.join(root,p),"utf8");
const sha = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const coverage = JSON.parse(read("visual/assets/font-coverage.json"));
const css = read("visual/assets/cjk-font.css");
const payload = Buffer.from(css.match(/data:font\/woff2;base64,([A-Za-z0-9+/=]+)/)[1],"base64");
assert.equal(payload.subarray(0,4).toString(),"wOF2");
assert.equal(sha(payload),coverage.woff2_sha256);
assert(!/url\(\s*["']?(https?:)?\/\//i.test(css),"remote CSS resource");
const checks = coverage.entry_checks.map(row => {
  const html = read(row.path);
  assert.equal(sha(Buffer.from(html,"utf8")),row.sha256,row.path+": stale glyph coverage");
  assert.deepEqual(row.missing_codepoints,[],row.path+": missing glyphs");
  const expected = row.path.startsWith("report/") ? "../visual/assets/cjk-font.css" : "assets/cjk-font.css";
  assert(html.includes('href="'+expected+'"'),row.path+": local font missing");
  assert(!/<(?:script|img|link|iframe)\b[^>]*(?:src|href)=["'](?:https?:)?\/\//i.test(html),row.path+": remote runtime");
  if(row.path.startsWith("report/")) assert(!/<script\b/i.test(html),row.path+": report must be script-free");
  if(row.path==="report/proposal.en.html") assert(html.includes("中文"),"Chinese return link missing");
  if(["report/proposal.html","visual/index.html"].includes(row.path)) for(const text of ["京张验真公地","公众判据","临时边界","概念建议","待授权实测"]) assert(html.includes(text),row.path+": critical content missing: "+text);
  return {path:row.path,sourceAndGlyphCoverage:true,scriptFree:!/<script\b/i.test(html)};
});
assert.equal(checks.length,4,"four primary entries including embedded bilingual annexes");
console.log(JSON.stringify({ok:true,scope:"source_and_glyph_coverage_not_visual_certification",fontBytes:payload.length,checks},null,2));
