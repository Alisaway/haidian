#!/usr/bin/env node
/* Fail-closed browser QA for the two mandatory Chinese HTML entries.
 * Requires Playwright. Prints JSON and exits non-zero on font loading, tofu,
 * replacement-character, offline-resource, image, console or overflow errors.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const packageRoot = path.resolve(__dirname, '..', '..');
const pages = [
  ['visual', path.join(packageRoot, 'visual', 'index.html')],
  ['report', path.join(packageRoot, 'report', 'proposal.html')],
];
const family = 'JZG Noto Sans SC';
const sample = '京张生长网高校企业街区孵化社群';
const previewDir = process.argv[2] ? path.resolve(process.argv[2]) : null;

(async () => {
  if (previewDir) fs.mkdirSync(previewDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const failures = [];
  for (const [label, filePath] of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const consoleErrors = [];
    const requestFailures = [];
    const remoteRequests = [];
    page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('requestfailed', request => requestFailures.push(request.url()));
    page.on('request', request => { if (/^https?:/i.test(request.url())) remoteRequests.push(request.url()); });
    await page.goto(pathToFileURL(filePath).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const runtime = await page.evaluate(({ family, sample }) => {
      const bodyFamily = getComputedStyle(document.body).fontFamily;
      const faces = Array.from(document.fonts)
        .filter(face => face.family.replace(/["']/g, '') === family)
        .map(face => ({ family: face.family, status: face.status, weight: face.weight }));
      const glyphSignature = char => {
        const canvas = document.createElement('canvas');
        canvas.width = 96; canvas.height = 96;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.fillStyle = '#000'; context.textBaseline = 'top';
        context.font = `64px "${family}"`;
        context.fillText(char, 8, 6);
        return canvas.toDataURL('image/png');
      };
      const signatures = Array.from(sample, glyphSignature);
      const missingSignature = glyphSignature(String.fromCodePoint(0x10FFFF));
      const text = document.body.innerText || '';
      return {
        document_fonts_status: document.fonts.status,
        font_check: document.fonts.check(`32px "${family}"`, sample),
        computed_body_font_family: bodyFamily,
        matching_faces: faces,
        cjk_text_characters: (text.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length,
        replacement_characters: (text.match(/[\ufffd\u25a1]/g) || []).length,
        sampled_glyphs: Array.from(sample).length,
        unique_glyph_signatures: new Set(signatures).size,
        glyphs_equal_to_missing_signature: signatures.filter(value => value === missingSignature).length,
        horizontal_overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        broken_images: Array.from(document.images)
          .filter(image => !image.complete || image.naturalWidth === 0)
          .map(image => image.getAttribute('src')),
      };
    }, { family, sample });
    const entryFailures = [];
    if (runtime.document_fonts_status !== 'loaded') entryFailures.push('document-fonts-not-loaded');
    if (!runtime.font_check) entryFailures.push('local-font-check-failed');
    if (!runtime.computed_body_font_family.includes(family)) entryFailures.push('local-font-not-computed-body-font');
    if (!runtime.matching_faces.length || runtime.matching_faces.some(face => face.status !== 'loaded')) entryFailures.push('local-font-face-not-loaded');
    if (runtime.unique_glyph_signatures < runtime.sampled_glyphs - 2) entryFailures.push('possible-tofu-repeated-glyphs');
    if (runtime.glyphs_equal_to_missing_signature) entryFailures.push('glyph-equals-missing-character');
    if (runtime.replacement_characters) entryFailures.push('replacement-character-present');
    if (runtime.cjk_text_characters < 100) entryFailures.push('large-chinese-text-block-missing');
    if (runtime.horizontal_overflow) entryFailures.push('horizontal-overflow');
    if (runtime.broken_images.length || consoleErrors.length || requestFailures.length || remoteRequests.length) entryFailures.push('offline-resource-or-runtime-error');
    if (previewDir) await page.screenshot({ path: path.join(previewDir, `html-zh-${label}.png`), fullPage: false });
    results.push({ entry: label, path: path.relative(packageRoot, filePath).replace(/\\/g, '/'), ...runtime, console_errors: consoleErrors, request_failures: requestFailures, remote_requests: remoteRequests, failures: entryFailures });
    failures.push(...entryFailures.map(failure => `${label}:${failure}`));
    await page.close();
  }
  await browser.close();
  const record = { schema_version: '1.0.0', status: failures.length ? 'fail' : 'pass', engine: 'Playwright Chromium headless', font_family_required: family, han_sample: sample, pages: results, failures };
  process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
  process.exitCode = failures.length ? 1 : 0;
})().catch(error => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exitCode = 1;
});
