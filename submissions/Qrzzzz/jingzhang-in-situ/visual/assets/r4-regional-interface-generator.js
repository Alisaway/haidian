const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const process = require("node:process");
const { spawnSync } = require("node:child_process");
const { chromium } = require("playwright");
const playwrightVersion = require("playwright/package.json").version;
const SOURCE = __filename;
const ASSETS = path.dirname(SOURCE);
const VISUAL = path.dirname(ASSETS);
const SUB = path.dirname(VISUAL);
const FIGURES = path.join(SUB, "assets", "figures");
const CONTRACTS_PATH = path.join(ASSETS, "regional-interface-contracts.json");
const R3E_BUNDLE_PATH = path.join(ASSETS, "r3e-implementation-sources.json");
const PHASE2_VISUAL_SOURCE_PATH = path.join(ASSETS, "phase2-visual-generator-source.json");
const PHASE2_VISUAL_CONTRACT_PATH = path.join(ASSETS, "phase2-visual-generation-contract.json");
const FREEZE_PATH = path.join(ASSETS, "phase4-source-freeze.json");
const PHASE4_CONTRACT_PATH = path.join(ASSETS, "phase4-generation-contract.json");
const R4_CONTRACT_PATH = path.join(ASSETS, "r4-regional-interface-generation-contract.json");
const mode = process.argv.includes("--generate") ? "generate" : process.argv.includes("--figures-only") ? "figures-only" : process.argv.includes("--check") ? "check" : null;
if (!mode) throw new Error("Use --generate, --figures-only, or --check");

const FIGURE_OUTPUTS = [
  "assets/figures/site-overview.png",
  "assets/figures/site-overview.en.png",
  "assets/figures/ai-ecosystem.png",
  "assets/figures/ai-ecosystem.en.png",
  "assets/figures/operations-pathway.png",
  "assets/figures/operations-pathway.en.png",
];
const PRESENTATION_OUTPUTS = [
  "drawings/a3-booklet.pdf",
  "drawings/a3-booklet.en.pdf",
  "drawings/a0-boards.pdf",
  "drawings/a0-boards.en.pdf",
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
];
const R4_OVERRIDE_INPUTS = [
  ...FIGURE_OUTPUTS,
  "report/proposal.html",
  "report/proposal.en.html",
  "metrics.json",
  "assumptions.json",
  "sources.json",
  "compliance_matrix.json",
  "design_depth_matrix.json",
  "proposal.md",
  "proposal.en.md",
  "visual/assets/phase4-figure-registry.json",
  "visual/assets/phase4-layout-contract.json",
  "visual/assets/phase2-visual-generator-source.json",
  "visual/assets/phase2-visual-generation-contract.json",
  "visual/assets/regional-interface-contracts.json",
  "visual/assets/r4-regional-interface-generator.js",
];

function readJson(target) {
  return JSON.parse(fs.readFileSync(target, "utf8"));
}

function writeJson(target, value) {
  const staged = `${target}.${process.pid}.tmp`;
  fs.writeFileSync(staged, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  fs.renameSync(staged, target);
}

function replaceExact(text, oldValue, newValue, label) {
  const first = text.indexOf(oldValue);
  if (first < 0) {
    const already = text.indexOf(newValue);
    if (already >= 0 && text.indexOf(newValue, already + newValue.length) < 0) return text;
    throw new Error(`${label} old and repaired forms are missing or non-unique`);
  }
  if (text.indexOf(oldValue, first + oldValue.length) >= 0) throw new Error(`${label} is non-unique`);
  return text.slice(0, first) + newValue + text.slice(first + oldValue.length);
}

function runR6Readability() {
  const record = readJson(PHASE2_VISUAL_SOURCE_PATH);
  let source = record.source;
  const recordedHash = crypto.createHash("sha256").update(Buffer.from(source, "utf8")).digest("hex");
  if (recordedHash !== record.source_sha256) throw new Error(`Phase 2 visual source hash drift: ${recordedHash}`);

  const readabilityState = "R3_COMMON_SCALE_ASSERTIONS = []\nF01_READABILITY_ASSERTIONS = []\n";
  while (source.includes(`${readabilityState}F01_READABILITY_ASSERTIONS = []\n`)) {
    source = source.replace(`${readabilityState}F01_READABILITY_ASSERTIONS = []\n`, readabilityState);
  }
  if (!source.includes(readabilityState)) {
    source = replaceExact(source, "R3_COMMON_SCALE_ASSERTIONS = []\n", readabilityState, "R6 readability assertion state");
  }
  source = replaceExact(
    source,
    `    attribution = R3_CONTEXT["license"]["attribution_zh" if b.lang == "zh" else "attribution_en"]
    b.text((box[0] + 12, box[3] - 24), attribution, 10, B.MUTED, True)`,
    `    attribution = R3_CONTEXT["license"]["attribution_zh" if b.lang == "zh" else "attribution_en"]
    if map_id == "F01-corridor":
        attribution_size = 18
        attribution_xy = (box[0] + 14, box[3] - 58)
        attribution_bbox = b.d.textbbox(attribution_xy, attribution, font=b.font(attribution_size))
        attribution_background = (attribution_bbox[0] - 7, attribution_bbox[1] - 5, attribution_bbox[2] + 7, attribution_bbox[3] + 5)
        b.d.rounded_rectangle(attribution_background, radius=6, fill="#F6F2EAEA")
        b.text(attribution_xy, attribution, attribution_size, B.MUTED)
        assertion = {
            "element": "F01 map attribution",
            "language": b.lang,
            "font_px": attribution_size,
            "effective_px_at_1440_preview": round(attribution_size * 1440 / B.W, 2),
            "bbox_px": list(attribution_bbox),
            "background_bbox_px": list(attribution_background),
            "bottom_clearance_px": box[3] - attribution_background[3],
            "inside_map": attribution_background[0] >= box[0] and attribution_background[1] >= box[1] and attribution_background[2] <= box[2] and attribution_background[3] <= box[3],
        }
        F01_READABILITY_ASSERTIONS.append(assertion)
        if not assertion["inside_map"] or assertion["effective_px_at_1440_preview"] < 10 or assertion["bottom_clearance_px"] < 28:
            raise RuntimeError(f"F01 attribution readability failed: {assertion}")
    else:
        b.text((box[0] + 12, box[3] - 24), attribution, 10, B.MUTED, True)`,
    "R6 F01 attribution hierarchy",
  );
  source = replaceExact(
    source,
    `def metric_card(b, box, value, label, metric_id, color=B.ORANGE, note=""):
    b.rounded(box, B.PAPER, B.LINE, 22, 2)
    x0, y0, x1, _ = box
    b.text((x0 + 28, y0 + 24), value, 48, color, True)
    value_bbox = b.d.textbbox((x0 + 28, y0 + 24), value, font=b.font(48, True))
    label_y = max(y0 + 91, value_bbox[3] + 16)
    b.text((x0 + 28, label_y), b.wrap(label, 20), 22, B.INK, True)
    b.text((x0 + 28, label_y + 60), f"[metric:{metric_id}]", 17, B.MUTED)
    if note:
        b.text((x0 + 28, label_y + 96), b.wrap(note, 30), 17, B.MUTED)`,
    `def metric_card(b, box, value, label, metric_id, color=B.ORANGE, note=""):
    b.rounded(box, B.PAPER, B.LINE, 22, 2)
    x0, y0, x1, y1 = box
    b.text((x0 + 28, y0 + 24), value, 48, color, True)
    value_bbox = b.d.textbbox((x0 + 28, y0 + 24), value, font=b.font(48, True))
    label_y = max(y0 + 91, value_bbox[3] + 16)
    label_width = 32 if metric_id == "cross_section_candidate_count" and b.lang == "en" else 20
    label_text = b.wrap(label, label_width)
    label_xy = (x0 + 28, label_y)
    b.text(label_xy, label_text, 22, B.INK, True)
    label_bbox = b.d.multiline_textbbox(label_xy, label_text, font=b.font(22, True), spacing=6)
    marker = f"[metric:{metric_id}]"
    marker_y = label_bbox[3] + 14 if metric_id == "cross_section_candidate_count" else label_y + 60
    marker_xy = (x0 + 28, marker_y)
    b.text(marker_xy, marker, 17, B.MUTED)
    marker_bbox = b.d.textbbox(marker_xy, marker, font=b.font(17))
    note_bbox = None
    if note:
        note_xy = (x0 + 28, marker_bbox[3] + 14)
        note_text = b.wrap(note, 30)
        b.text(note_xy, note_text, 17, B.MUTED)
        note_bbox = b.d.multiline_textbbox(note_xy, note_text, font=b.font(17), spacing=6)
    if metric_id == "cross_section_candidate_count":
        assertion = {
            "element": "F01 English candidate metric card" if b.lang == "en" else "F01 Chinese candidate metric card",
            "language": b.lang,
            "value_bbox_px": list(value_bbox),
            "label_bbox_px": list(label_bbox),
            "marker_bbox_px": list(marker_bbox),
            "label_marker_gap_px": marker_bbox[1] - label_bbox[3],
            "inside_card": marker_bbox[2] <= x1 - 24 and marker_bbox[3] <= y1 - 18,
            "intersections": int(label_bbox[3] > marker_bbox[1]),
        }
        F01_READABILITY_ASSERTIONS.append(assertion)
        if assertion["intersections"] or assertion["label_marker_gap_px"] < 12 or not assertion["inside_card"]:
            raise RuntimeError(f"F01 metric-card readability failed: {assertion}")`,
    "R6 F01 metric-card layout",
  );
  source = replaceExact(
    source,
    `    b.text((110, 1290), "SITE-001 · PROVISIONAL ROUGH · CX01—12 CANDIDATE / NOT SURVEYED", 15, B.MUTED, True)`,
    `    b.text((110, 1284), "SITE-001 · PROVISIONAL ROUGH · CX01—12 CANDIDATE / NOT SURVEYED", 18, B.MUTED, True)`,
    "R6 F01 map status footnote",
  );
  source = replaceExact(
    source,
    `    R3_COMMON_SCALE_ASSERTIONS.clear()
    toolchain = B.verify_toolchain()`,
    `    R3_COMMON_SCALE_ASSERTIONS.clear()
    F01_READABILITY_ASSERTIONS.clear()
    toolchain = B.verify_toolchain()`,
    "R6 readability assertion reset",
  );
  const readabilityContract = `        "f01_readability_assertion": {
            "required_intersections": 0,
            "minimum_label_marker_gap_px": 12,
            "minimum_effective_attribution_px_at_1440_preview": 10,
            "assertions": F01_READABILITY_ASSERTIONS,
        },
`;
  while (source.includes(`${readabilityContract}${readabilityContract}`)) {
    source = source.replace(`${readabilityContract}${readabilityContract}`, readabilityContract);
  }
  if (!source.includes(readabilityContract)) {
    source = replaceExact(source, `        "f02_legend_bbox_assertion": {`, `${readabilityContract}        "f02_legend_bbox_assertion": {`, "R6 readability contract");
  }

  const temporary = path.join(ASSETS, `.r6-phase2-visual-${process.pid}.py`);
  fs.writeFileSync(temporary, source.replace(/\r\n/g, "\n"), "utf8");
  try {
    const python = process.env.R6_VISUAL_PYTHON || "python";
    const result = spawnSync(python, [temporary], { stdio: "inherit", env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
    if (result.status !== 0) throw new Error(`R6 Phase 2 visual generator exited ${result.status}`);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
  const refreshed = readJson(PHASE2_VISUAL_SOURCE_PATH);
  const refreshedHash = crypto.createHash("sha256").update(Buffer.from(refreshed.source, "utf8")).digest("hex");
  if (refreshedHash !== refreshed.source_sha256 || !refreshed.source.includes("F01_READABILITY_ASSERTIONS")) throw new Error("R6 source snapshot did not bind the repaired generator");
  const contract = readJson(PHASE2_VISUAL_CONTRACT_PATH);
  const assertions = contract.f01_readability_assertion?.assertions ?? [];
  if (assertions.length !== 4 || assertions.some((item) => item.intersections || item.inside_card === false || item.inside_map === false)) throw new Error(`R6 readability assertions failed: ${JSON.stringify(assertions)}`);
}

function repairR5ReportHtml() {
  const repairs = {
    "report/proposal.html": [
      [
        '<p>第 2 期冻结表登记来源、日期、时空范围、复用边界、转换链、SHA-256、等级与禁限用途。快照依权利使用，无快照案例仅留链接。OSM 只留 2026-08-14 query/response hash；原始响应缺失、不可随包重放，故不进入 required design GeoJSON 或冒充测绘。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="来源：DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">来源</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="visual/assets/phase2-source-freeze.json#open_data_separation" title="空间数据：visual/assets/phase2-source-freeze.json#open_data_separation">空间数据</sup></p>',
        '<p>第 2 期冻结表登记来源、日期、时空范围、复用边界、转换链、SHA-256、等级与禁限用途。早期 OSM 组是 2026-08-14 边界错位核对：只留 query/response hash，原始响应未登记、不可随包重放；它只产生下文 0% 与 667 m 两项低置信度警示，不能进入 required design GeoJSON 或冒充测绘。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="来源：DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">来源</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="sources.json#r5_evidence_separation" title="空间数据：sources.json#r5_evidence_separation">空间数据</sup></p><p>另一组是 2026-08-28 R3 场地识别背景：四个固定 OSM/Overpass 查询及原始响应、检索时间、query/raw/derived hash 与 ODbL 1.0 权利记录均随包保存、可重放；只支持道路/铁路、公园、已清权地标与粗粒度建筑肌理表达，不产生或回填 0%/667 m，不进入 required design GeoJSON，也不支持正式边界、文保控制、道路红线或测绘。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="来源：DATA-SRC-OSM-CONTEXT-20260828">来源</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="visual/assets/r3-site-context-qa.json" title="空间数据：visual/assets/r3-site-context-qa.json">空间数据</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="sources.json#r5_evidence_separation" title="空间数据：sources.json#r5_evidence_separation">空间数据</sup></p>',
      ],
      [
        '<p>不删不利、零值和未知：12 条候选已踏勘 0；情景用地缺口/重叠 0。<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="cross_section_surveyed_count" title="指标：cross_section_surveyed_count">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_gap_area_sqm" title="指标：land_use_gap_area_sqm">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_overlap_area_sqm" title="指标：land_use_overlap_area_sqm">指标</sup> OSM 背景核对为遗址公园相交 0%、四条命名道路平均偏移 667 m。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="来源：DATA-SRC-OSM-CONTEXT-20260828">来源</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_heritage_park_intersection_ratio" title="指标：osm_heritage_park_intersection_ratio">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_named_street_average_offset_m" title="指标：osm_named_street_average_offset_m">指标</sup> FAR、高度、道路面积、客流、无障碍通过率、文保控制面积仍 <code>unknown</code>；OSM 原始响应缺失，故两项不计入 19 项随包复算，也不能修改 provisional 边界。<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="floor_area_ratio" title="指标：floor_area_ratio">指标</sup></p>',
        '<p>不删不利、零值和未知：12 条候选已踏勘 0；情景用地缺口/重叠 0。<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="cross_section_surveyed_count" title="指标：cross_section_surveyed_count">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_gap_area_sqm" title="指标：land_use_gap_area_sqm">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_overlap_area_sqm" title="指标：land_use_overlap_area_sqm">指标</sup> 早期 2026-08-14 边界错位核对记录遗址公园相交 0%、四条命名道路平均偏移 667 m；其原始响应未登记，故两项不计入 19 项随包复算，也不能修改 provisional 边界。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="来源：DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">来源</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_heritage_park_intersection_ratio" title="指标：osm_heritage_park_intersection_ratio">指标</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_named_street_average_offset_m" title="指标：osm_named_street_average_offset_m">指标</sup> 2026-08-28 R3 的四份原始 OSM 快照虽然随包、可重放，却属于另一组场地识别查询，不回填这两项值或正式指标。<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="来源：DATA-SRC-OSM-CONTEXT-20260828">来源</sup> FAR、高度、道路面积、客流、无障碍通过率、文保控制面积仍 <code>unknown</code>。<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="floor_area_ratio" title="指标：floor_area_ratio">指标</sup></p>',
      ],
      ['<tr><td>指标状态、来源 marker、临时边界、图位</td><td>不提高置信度，不遗漏限制</td></tr>', '<tr><td>指标状态、来源 marker、临时边界、图位</td><td>不提高置信度，不遗漏限制</td></tr><tr><td>最终快照范围与日期</td><td>2026-08-29，在生成后逐对复核 2 份 Markdown、22 幅 PNG、4 份 HTML、4 份 PDF；两组 OSM 的来源与限制同强度</td></tr>'],
      ['十项 claim 的章节、图表、数据、来源、限制见 <code>review_navigation.core_claims</code>；T07 仅记人工 parity，不替代机器检查。</p>', '十项 claim 的章节、图表、数据、来源、限制见 <code>review_navigation.core_claims</code>；T07 仅记人工 parity，不替代机器检查。最终逐路径哈希、范围、标准和结论见 <code>visual/assets/r5-final-snapshot-audit.json#/bilingual_audit</code>。</p>'],
      ['<p>版权台账覆盖双语正文/HTML、F01—F11、A3/A0、字体、图标、数据、代码；新增/再生成资产须重开清权。医疗、法律、消防、交通、结构、能源、审批结论只由责任人员或专业团队作出。自检通过不代表入选、批准、发布或实施。</p>', '<p>2026-08-29 最终快照审计在全部来源检索与 R4 生成完成后执行：版权台账逐路径覆盖双语正文/HTML、F01—F11、A3/A0、字体及 OFL、封面、两组 OSM、R3-E 元数据、数据与代码；双语审计逐对覆盖主张、数字、来源/限制、图位、HTML 与 PDF，结果和哈希见 <code>visual/assets/r5-final-snapshot-audit.json</code>。新增或再生成资产须重开清权。医疗、法律、消防、交通、结构、能源、审批结论只由责任人员或专业团队作出。自检通过不代表入选、批准、发布或实施。</p>'],
    ],
    "report/proposal.en.html": [
      [
        '<p>The Phase 2 freeze records source, date, scope, reuse boundary, transformation, SHA-256, grade, and prohibited uses. Snapshots follow their rights records; URL-only cases retain links. OSM keeps only the 2026-08-14 query/response hashes; its raw response is absent and not package-replayable, so it never enters required design GeoJSON or becomes survey evidence.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="Source: DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">Source</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="visual/assets/phase2-source-freeze.json#open_data_separation" title="Spatial data: visual/assets/phase2-source-freeze.json#open_data_separation">Spatial data</sup></p>',
        '<p>The Phase 2 freeze records source, date, scope, reuse boundary, transformation, SHA-256, grade, and prohibited uses. The early OSM group is the 2026-08-14 boundary-mismatch check: only query/response hashes remain, its raw response is unregistered and not package-replayable, and it produces only the two low-confidence 0% and 667 m warnings below. It never enters required design GeoJSON or becomes survey evidence.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="Source: DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">Source</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="sources.json#r5_evidence_separation" title="Spatial data: sources.json#r5_evidence_separation">Spatial data</sup></p><p>A separate group is the 2026-08-28 R3 site-recognition background: four fixed OSM/Overpass queries and raw responses, retrieval times, query/raw/derived hashes, and ODbL 1.0 rights records are packaged and replayable. They support only road/rail clues, parks, cleared landmarks, and coarse building morphology; they neither produce nor backfill 0%/667 m, enter required design GeoJSON, nor support official boundaries, heritage controls, road redlines, or survey.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="Source: DATA-SRC-OSM-CONTEXT-20260828">Source</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="visual/assets/r3-site-context-qa.json" title="Spatial data: visual/assets/r3-site-context-qa.json">Spatial data</sup> <sup class="evidence evidence-data" data-evidence-kind="data" data-evidence-value="sources.json#r5_evidence_separation" title="Spatial data: sources.json#r5_evidence_separation">Spatial data</sup></p>',
      ],
      [
        '<p>Adverse, zero, and unknown results remain visible: 0 of 12 candidates are surveyed, while scenario land-use gap/overlap are both 0; those results return to count and topology metrics.<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="cross_section_surveyed_count" title="Metric: cross_section_surveyed_count">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_gap_area_sqm" title="Metric: land_use_gap_area_sqm">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_overlap_area_sqm" title="Metric: land_use_overlap_area_sqm">Metric</sup> The OSM background check records 0% heritage-park intersection and a 667 m mean offset to four named street proxies.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="Source: DATA-SRC-OSM-CONTEXT-20260828">Source</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_heritage_park_intersection_ratio" title="Metric: osm_heritage_park_intersection_ratio">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_named_street_average_offset_m" title="Metric: osm_named_street_average_offset_m">Metric</sup> FAR, height, road area, flows, accessibility pass rate, and heritage-control area remain <code>unknown</code>. Because the raw OSM response is absent, its two results are excluded from the 19 package-recalculable metrics and cannot alter the provisional boundary.<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="floor_area_ratio" title="Metric: floor_area_ratio">Metric</sup></p>',
        '<p>Adverse, zero, and unknown results remain visible: 0 of 12 candidates are surveyed, while scenario land-use gap/overlap are both 0; those results return to count and topology metrics.<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="cross_section_surveyed_count" title="Metric: cross_section_surveyed_count">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_gap_area_sqm" title="Metric: land_use_gap_area_sqm">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="land_use_overlap_area_sqm" title="Metric: land_use_overlap_area_sqm">Metric</sup> The early 2026-08-14 boundary-mismatch check records 0% heritage-park intersection and a 667 m mean offset to four named street proxies. Its raw response is unregistered, so the two values remain outside the 19 package-recalculable metrics and cannot alter the provisional boundary.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814" title="Source: DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814">Source</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_heritage_park_intersection_ratio" title="Metric: osm_heritage_park_intersection_ratio">Metric</sup> <sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="osm_named_street_average_offset_m" title="Metric: osm_named_street_average_offset_m">Metric</sup> Although the four 2026-08-28 R3 raw OSM snapshots are packaged and replayable, they belong to a separate site-recognition query group and do not backfill these values or formal metrics.<sup class="evidence evidence-source" data-evidence-kind="source" data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828" title="Source: DATA-SRC-OSM-CONTEXT-20260828">Source</sup> FAR, height, road area, flows, accessibility pass rate, and heritage-control area remain <code>unknown</code>.<sup class="evidence evidence-metric" data-evidence-kind="metric" data-evidence-value="floor_area_ratio" title="Metric: floor_area_ratio">Metric</sup></p>',
      ],
      ['<tr><td>Metric status, source markers, provisional boundary, figure position</td><td>No raised confidence or dropped limitation</td></tr>', '<tr><td>Metric status, source markers, provisional boundary, figure position</td><td>No raised confidence or dropped limitation</td></tr><tr><td>Final snapshot scope and date</td><td>2026-08-29, after generation: 2 Markdown files, 22 PNGs, 4 HTML files, and 4 PDFs reviewed pair by pair; both OSM groups retain equivalent source and limitation strength</td></tr>'],
      ['Exact section, figure/table, data, source, and limitation anchors live in <code>review_navigation.core_claims</code>. T07 records the manual parity conclusion and does not replace machine checks.</p>', 'Exact section, figure/table, data, source, and limitation anchors live in <code>review_navigation.core_claims</code>. T07 records the manual parity conclusion and does not replace machine checks. Final path hashes, scope, criteria, and conclusion are recorded at <code>visual/assets/r5-final-snapshot-audit.json#/bilingual_audit</code>.</p>'],
      ['<p>The path-level rights ledger covers bilingual text/HTML, F01–F11, A3/A0, fonts, icons, data, and code. Any new or regenerated asset reopens clearance. Medical, legal, fire, transport, structural, energy, and approval conclusions belong to accountable people or qualified teams. A passing self-check means only that the package may enter further review, not selection, approval, publication, or implementation.</p>', '<p>The final 2026-08-29 snapshot audit runs after every current source retrieval and R4 generation step. Its path-level rights scope covers bilingual text/HTML, F01–F11, A3/A0, fonts and OFL, the cover, both OSM groups, R3-E metadata, data, and code; its bilingual scope compares claims, numbers, sources/limits, figure positions, HTML, and PDFs. Results and hashes are recorded in <code>visual/assets/r5-final-snapshot-audit.json</code>. Any new or regenerated asset reopens clearance. Medical, legal, fire, transport, structural, energy, and approval conclusions belong to accountable people or qualified teams. A passing self-check means only that the package may enter further review, not selection, approval, publication, or implementation.</p>'],
    ],
  };
  for (const [relative, replacements] of Object.entries(repairs)) {
    const target = path.join(SUB, relative);
    let text = fs.readFileSync(target, "utf8");
    replacements.forEach(([oldValue, newValue], index) => { text = replaceExact(text, oldValue, newValue, `${relative} R5 repair ${index + 1}`); });
    const finalSnapshotRow = relative.endsWith("proposal.en.html")
      ? "<tr><td>Final snapshot scope and date</td><td>2026-08-29, after generation: 2 Markdown files, 22 PNGs, 4 HTML files, and 4 PDFs reviewed pair by pair; both OSM groups retain equivalent source and limitation strength</td></tr>"
      : "<tr><td>最终快照范围与日期</td><td>2026-08-29，在生成后逐对复核 2 份 Markdown、22 幅 PNG、4 份 HTML、4 份 PDF；两组 OSM 的来源与限制同强度</td></tr>";
    while (text.includes(finalSnapshotRow + finalSnapshotRow)) text = text.replaceAll(finalSnapshotRow + finalSnapshotRow, finalSnapshotRow);
    fs.writeFileSync(target, text, "utf8");
  }
  assertR5ReportHtml();
}

function assertR5ReportHtml() {
  for (const relative of ["report/proposal.html", "report/proposal.en.html"]) {
    const text = fs.readFileSync(path.join(SUB, relative), "utf8");
    const metricAt = text.indexOf('data-evidence-value="osm_heritage_park_intersection_ratio"');
    const before = text.slice(0, metricAt);
    if (metricAt < 0 || before.lastIndexOf('data-evidence-value="DATA-SRC-PROVISIONAL-BOUNDARY-BASIS-20260814"') <= before.lastIndexOf('data-evidence-value="DATA-SRC-OSM-CONTEXT-20260828"')) throw new Error(`${relative}: mismatch metrics are not bound to the early OSM group`);
    if (!text.includes("visual/assets/r5-final-snapshot-audit.json#/bilingual_audit") || !text.includes("2026-08-29")) throw new Error(`${relative}: final snapshot audit disclosure missing`);
    const rowNeedle = relative.endsWith("proposal.en.html") ? "Final snapshot scope and date" : "最终快照范围与日期";
    if (text.split(rowNeedle).length - 1 !== 1) throw new Error(`${relative}: final snapshot T07 row must occur exactly once`);
  }
}

function sha256(target) {
  return crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex");
}

function assertContracts() {
  const payload = readJson(CONTRACTS_PATH);
  const metrics = readJson(path.join(SUB, "metrics.json"));
  const interfaces = payload.interfaces ?? [];
  const ids = interfaces.map((item) => item.interface_id);
  const expected = ["RI01", "RI02", "RI03", "RI04", "RI05"];
  const failures = [];
  if (JSON.stringify(ids) !== JSON.stringify(expected)) failures.push(`interface IDs ${JSON.stringify(ids)}`);
  if (new Set(ids).size !== 5) failures.push("interface IDs are not unique");
  const bilingualKeys = ["purpose", "jingzhang_outbound_artifacts", "minimum_inbound_artifacts", "first_exchange_deliverable", "acceptance_criteria", "prohibited_inputs", "review_trigger", "stop_rule"];
  for (const item of interfaces) {
    if (item.status !== "candidate_not_authorized") failures.push(`${item.interface_id}: status=${item.status}`);
    if (item.authorization_gate?.gate_status !== "not_passed") failures.push(`${item.interface_id}: authorization gate passed unexpectedly`);
    if (item.evidence_status?.field_or_live_exchange_count !== 0) failures.push(`${item.interface_id}: field/live exchange must remain zero`);
    for (const key of ["purpose", "jingzhang_outbound_artifacts", "minimum_inbound_artifacts", "first_exchange_deliverable", "acceptance_criteria", "prohibited_inputs", "accountable_role_type", "authorization_gate", "review_trigger", "stop_rule", "evidence_status"]) {
      if (!(key in item)) failures.push(`${item.interface_id}: missing ${key}`);
    }
    if (!Array.isArray(item.internal_anchor_refs) || !item.internal_anchor_refs.length) failures.push(`${item.interface_id}: internal anchors missing`);
    if (!item.accountable_role_type?.reviewer?.zh || !item.accountable_role_type?.reviewer?.en) failures.push(`${item.interface_id}: reviewer role missing`);
    for (const key of bilingualKeys) {
      const value = item[key];
      if (!value?.zh || !value?.en) failures.push(`${item.interface_id}: ${key} bilingual value missing`);
      if (Array.isArray(value?.zh) && (value.zh.length !== value.en.length || value.zh.some((entry) => !String(entry).trim()) || value.en.some((entry) => !String(entry).trim()))) failures.push(`${item.interface_id}: ${key} bilingual array drift`);
    }
  }
  const actualContracts = interfaces.length;
  const actualAuthorized = interfaces.filter((item) => item.authorization_gate?.gate_status === "passed").length;
  const actualOperating = interfaces.filter((item) => item.evidence_status?.field_or_live_exchange_count > 0).length;
  const summary = payload.computed_summary ?? {};
  if (summary.regional_interface_contract_count !== actualContracts || summary.regional_interface_authorized_count !== actualAuthorized || summary.operating_count !== actualOperating) failures.push("computed summary does not match contract records");
  const contractMetric = metrics.metrics?.regional_interface_contract_count;
  const authorizedMetric = metrics.metrics?.regional_interface_authorized_count;
  if (contractMetric?.value !== actualContracts || contractMetric?.formula !== "count($.interfaces)") failures.push("regional_interface_contract_count metric drift");
  if (authorizedMetric?.value !== actualAuthorized || authorizedMetric?.formula !== "count($.interfaces where $.authorization_gate.gate_status == 'passed')") failures.push("regional_interface_authorized_count metric drift");
  if (failures.length) throw new Error(`Regional-interface contract failure:\n${failures.join("\n")}`);
  return payload;
}

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function displayRecords(contracts, lang) {
  return contracts.interfaces.map((item) => ({
    id: item.interface_id,
    name: item.target_scope[`name_${lang}`],
    deliverable: item.first_exchange_deliverable[lang],
  }));
}

function ecosystemHtml(contracts, lang, fontCss) {
  const zh = lang === "zh";
  const cards = displayRecords(contracts, lang).map((item) => `<article class="regional-card"><b>${esc(item.id)} · ${esc(item.name)}</b><span>${esc(item.deliverable)}</span><strong>⊘ ${zh ? "候选 / 未授权" : "CANDIDATE / NOT AUTHORIZED"}</strong></article>`).join("");
  const nodes = zh
    ? [["zzy", "众智园", "全栈研发 · 测试 · 安全治理"], ["origin", "AI 原点社区", "成果转化 · 共享中试 · 人才"], ["zgc", "中关村服务翼", "IP · 资本 · 专业服务"], ["bell", "大钟寺", "市场体验 · 公共文化 · 交往"], ["river", "小月河场景翼", "场景开放 · 公共反馈"]]
    : [["zzy", "ZHONGZHIYUAN", "full-stack R&D · test · safety"], ["origin", "AI ORIGIN COMMUNITY", "translation · shared trial · talent"], ["zgc", "ZHONGGUANCUN SERVICE WING", "IP · capital · professional service"], ["bell", "DAZHONGSI", "market trial · public culture · exchange"], ["river", "XIAOYUE RIVER SCENARIO WING", "scenario access · public feedback"]];
  const elements = zh ? ["土地", "空间", "产业", "资金", "人才", "算力", "数据", "场景"] : ["LAND", "SPACE", "INDUSTRY", "CAPITAL", "TALENT", "COMPUTE", "DATA", "SCENARIO"];
  const steps = zh ? ["研究", "匹配", "受控测试", "公共共测", "反馈"] : ["RESEARCH", "MATCH", "CONTROLLED TEST", "PUBLIC CO-TEST", "FEEDBACK"];
  return `<!doctype html><html lang="${zh ? "zh-CN" : "en"}"><head><meta charset="utf-8"><style>${fontCss}
  *{box-sizing:border-box}html,body{margin:0;width:2400px;height:1600px;overflow:hidden;background:#f3f0e7;color:#162126;font-family:'JZ Noto Sans SC',sans-serif;font-synthesis:none}.canvas{position:relative;width:2400px;height:1600px;background:#f3f0e7;border-top:22px solid #d94b28}.header{position:absolute;left:64px;right:64px;top:42px;height:150px;border-bottom:4px solid #162126}.kicker{margin:0;color:#2d7980;font-size:24px;font-weight:800;letter-spacing:.04em}.header h1{margin:20px 0 5px;font-size:50px;line-height:1.04}.header p{margin:0;color:#596260;font-size:25px}.inner{position:absolute;left:64px;right:64px;top:220px;height:970px}.connectors{position:absolute;inset:0;width:100%;height:100%;z-index:0}.node{position:absolute;display:grid;place-content:center;text-align:center;width:570px;height:150px;border:5px solid;background:#fffdf7;border-radius:24px;z-index:2}.node b{font-size:28px}.node span{margin-top:22px;color:#596260;font-size:21px}.zzy{left:90px;top:78px;border-color:#2d7980;color:#2d7980}.origin{right:90px;top:78px;border-color:#2a5f93;color:#2a5f93}.zgc{left:90px;top:550px;border-color:#665788;color:#665788}.bell{right:90px;top:550px;border-color:#d94b28;color:#d94b28}.river{left:850px;top:790px;width:570px;border-color:#577a5c;color:#577a5c}.core{position:absolute;left:810px;top:270px;width:650px;height:500px;z-index:3}.element-row{position:absolute;left:-65px;right:-65px;top:-74px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.element-row.bottom{top:auto;bottom:-55px}.element{padding:13px 8px;text-align:center;border:2px solid #a9a496;border-radius:12px;background:#e8ecec;color:#173b42;font-size:20px;font-weight:800}.ring{position:absolute;left:145px;top:52px;width:360px;height:360px;border-radius:50%;display:grid;place-content:center;text-align:center;background:#173b42;color:white;border:5px solid #162126}.ring b{font-size:35px;line-height:1.15}.ring small{margin-top:15px;color:#d8efed;font-size:19px}.steps{position:absolute;inset:0}.step{position:absolute;padding:9px 15px;background:#fffdf7;border:3px solid #b8893d;border-radius:999px;font-size:19px;font-weight:800}.s1{left:0;top:120px}.s2{right:0;top:120px}.s3{right:-5px;bottom:78px}.s4{left:218px;bottom:0}.s5{left:-15px;bottom:78px}.auth-boundary{position:absolute;left:64px;right:64px;top:1238px;border-top:3px dashed #8e8a80;text-align:center;color:#665f58;font-size:21px;font-weight:800}.auth-boundary span{position:relative;top:-17px;padding:3px 18px;background:#f3f0e7}.regional-band{position:absolute;left:64px;top:1290px;width:2212px;height:176px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px}.regional-card{position:relative;display:grid;grid-template-rows:auto 1fr auto;gap:10px;padding:18px 20px;border:3px dashed #8e8a80;border-radius:18px;background:#f7f4ec;color:#3f4747}.regional-card:before{content:'';position:absolute;left:50%;top:-34px;height:18px;border-left:3px dashed #8e8a80}.regional-card:after{content:'';position:absolute;left:calc(50% - 7px);top:-42px;width:12px;height:12px;border:3px solid #8e8a80;border-radius:50%;background:#f3f0e7}.regional-card b{font-size:${zh ? 24 : 23}px;line-height:1.1}.regional-card span{font-size:${zh ? 22 : 21}px;line-height:1.13;align-self:center}.regional-card strong{font-size:21px;color:#9b4a3a}.footer{position:absolute;left:64px;right:64px;bottom:28px;padding-top:14px;border-top:2px solid #a9a496;display:flex;justify-content:space-between;color:#596260;font-size:18px;font-weight:700}
  </style></head><body><main class="canvas"><header class="header"><p class="kicker">F07 · OPEN CITY DESIGN / 2026</p><h1>${zh ? "AI 创新生态：三区两翼协同回路" : "AI INNOVATION ECOSYSTEM: THREE AREAS + TWO WINGS"}</h1><p>${zh ? "八要素内部回路 + 五域未激活接口；当前授权 0" : "EIGHT-ELEMENT INTERNAL LOOP + FIVE INACTIVE INTERFACES; AUTHORIZED 0"}</p></header><section class="inner"><svg class="connectors" viewBox="0 0 2272 970" aria-hidden="true"><line x1="660" y1="154" x2="955" y2="460" stroke="#2d7980" stroke-width="6"/><line x1="1612" y1="154" x2="1317" y2="460" stroke="#2a5f93" stroke-width="6"/><line x1="660" y1="625" x2="955" y2="575" stroke="#665788" stroke-width="6"/><line x1="1612" y1="625" x2="1317" y2="575" stroke="#d94b28" stroke-width="6"/><line x1="1136" y1="790" x2="1136" y2="665" stroke="#577a5c" stroke-width="6"/></svg>${nodes.map(([key,title,body])=>`<article class="node ${key}"><b>${title}</b><span>${body}</span></article>`).join("")}<section class="core"><div class="element-row">${elements.slice(0,4).map(value=>`<span class="element">${value}</span>`).join("")}</div><div class="ring"><b>${zh ? "可复核的<br>AI 内环" : "AUDITABLE<br>AI INNER LOOP"}</b><small>GATE · HUMAN DECISION · STOP</small></div><div class="steps">${steps.map((value,index)=>`<span class="step s${index+1}">${value}</span>`).join("")}</div><div class="element-row bottom">${elements.slice(4).map(value=>`<span class="element">${value}</span>`).join("")}</div></section></section><div class="auth-boundary"><span>${zh ? "IM12 · 五域候选接口｜授权门未通过" : "IM12 · FIVE CANDIDATE INTERFACES | AUTHORIZATION GATE CLOSED"}</span></div><section class="regional-band">${cards}</section><footer class="footer"><span>${zh ? "参与者设计假设｜无外部授权、真实交换或运行证据" : "PARTICIPANT-AUTHORED DESIGN HYPOTHESES | NO EXTERNAL AUTHORIZATION, LIVE EXCHANGE, OR OPERATION"}</span><span>07 / 11</span></footer></main></body></html>`;
}

function imageDataUrl(target) {
  return `data:image/png;base64,${fs.readFileSync(target).toString("base64")}`;
}

function restorePhase3F11Base() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "jingzhang-r4-f11-base-"));
  const zhPath = path.join(tempDir, "operations-pathway.png");
  const enPath = path.join(tempDir, "operations-pathway.en.png");
  const program = String.raw`import json,pathlib,sys,tempfile
sub=pathlib.Path(sys.argv[1])
record=json.loads((sub/'visual/assets/phase3-governance-generator-source.json').read_text(encoding='utf-8'))
ns={'__file__':str(sub/'phase3-governance-generator.py'),'__name__':'phase3_f11_restore'}
exec(compile(record['source'],ns['__file__'],'exec'),ns)
base=ns['load_base']()
protocol=ns['load_json'](ns['PROTOCOL_PATH'])
governance=ns['load_json'](ns['GOVERNANCE_PATH'])
redteam=ns['load_json'](ns['REDTEAM_PATH'])
tmp=tempfile.TemporaryDirectory(prefix='jingzhang-r4-f11-font-')
root=pathlib.Path(tmp.name)
vf=base['get_font_source'](root)
regular,bold=root/'JZNoto-Regular.ttf',root/'JZNoto-Bold.ttf'
base['static_font'](vf,400,regular)
base['static_font'](vf,700,bold)
for lang,target in [('zh',pathlib.Path(sys.argv[2])),('en',pathlib.Path(sys.argv[3]))]:
    image=ns['draw_f11'](base,protocol,governance,redteam,regular,bold,lang)
    image.save(target,'PNG',optimize=True)
tmp.cleanup()`;
  const python = process.env.R4_BASE_PYTHON || "python";
  const result = spawnSync(python, ["-c", program, SUB, zhPath, enPath], { encoding: "utf8" });
  if (result.status !== 0 || !fs.existsSync(zhPath) || !fs.existsSync(enPath)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error(`Unable to restore clean Phase 3 F11 bases: ${result.stderr || result.stdout || result.status}`);
  }
  return { tempDir, zhPath, enPath };
}

function f11Html(sourceDataUrl, lang, fontCss) {
  const zh = lang === "zh";
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}*{box-sizing:border-box}html,body{margin:0;width:2400px;height:1600px;overflow:hidden;background:#f3f0e7;font-family:'JZ Noto Sans SC',sans-serif}.base{position:absolute;inset:0;width:2400px;height:1600px}.ready{position:absolute;left:1420px;top:44px;width:870px;min-height:116px;padding:9px 14px;border:2px solid #8e8a80;background:#fffdf7;color:#3f4747}.ready b,.ready strong,.ready span{display:block;font-size:21px;line-height:1.18}.ready strong{color:#9b4a3a}.ready span{font-weight:700}</style></head><body><img class="base" src="${sourceDataUrl}"><aside class="ready"><b>${zh ? "五域接口准备度｜候选，未授权" : "REGIONAL INTERFACE READINESS | CANDIDATE, NOT AUTHORIZED"}</b><strong>${zh ? "合同 5 · 已授权 0 · 运行中 0" : "5 CONTRACTS · 0 AUTHORIZED · 0 OPERATING"}</strong><span>${zh ? "启动：书面授权 + 一手事实依据 + 责任接口人" : "ACTIVATE: WRITTEN AUTHORIZATION + FACTUAL BASIS + ACCOUNTABLE OWNER"}</span></aside></body></html>`;
}

async function renderFigures(contracts) {
  const fontCss = fs.readFileSync(path.join(ASSETS, "font-subset.css"), "utf8");
  const f11Base = restorePhase3F11Base();
  const browser = await chromium.launch({ headless: true });
  let browserVersion;
  try {
    browserVersion = await browser.version();
    const page = await browser.newPage({ viewport: { width: 2400, height: 1600 }, deviceScaleFactor: 1 });
    for (const lang of ["zh", "en"]) {
      await page.setContent(ecosystemHtml(contracts, lang, fontCss), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.locator(".canvas").screenshot({ path: path.join(FIGURES, `ai-ecosystem${lang === "zh" ? "" : ".en"}.png`) });
      const f11Target = path.join(FIGURES, `operations-pathway${lang === "zh" ? "" : ".en"}.png`);
      await page.setContent(f11Html(imageDataUrl(lang === "zh" ? f11Base.zhPath : f11Base.enPath), lang, fontCss), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: f11Target });
    }
    await page.close();
  } finally {
    await browser.close();
    fs.rmSync(f11Base.tempDir, { recursive: true, force: true });
  }
  return browserVersion;
}

function updateFreeze() {
  const freeze = readJson(FREEZE_PATH);
  const fileSha = Object.fromEntries(R4_OVERRIDE_INPUTS.map((relative) => [relative, sha256(path.join(SUB, relative))]));
  freeze.r4_regional_interface_override = {
    schema: "jz-r4-regional-interface-override/v1",
    authority: "R4 changes IM12 regional-interface contracts, their exact bilingual carriers, and the R5 top-level OSM evidence-separation crosswalk in sources.json. R6 changes only the authoritative F01 bilingual presentation layout: metric-card hierarchy plus larger visible map status/ODbL attribution, with no claim, metric, geometry, source, or authority change. The protected 28-record source array, geometry, SC01–SC12, IM01–IM13, the sole SC10+IM06 first use, Phase 3 state/authority/governance semantics, cost, operators, controllers, and real-world approval remain unchanged.",
    interface_ids: ["RI01", "RI02", "RI03", "RI04", "RI05"],
    status: "5 candidate contracts / 0 authorized / 0 operating / 0 field or live exchanges",
    file_sha256: fileSha,
    output_overrides: FIGURE_OUTPUTS,
    readability_override: "F01 bilingual metric-card and map-footnote presentation only; machine assertions require zero overlap/crop and >=10 px effective attribution at a 1440 px preview.",
    generator: "visual/assets/r4-regional-interface-generator.js",
    contract: "visual/assets/r4-regional-interface-generation-contract.json",
  };
  freeze.semantic_contract.metrics = "29 total / 23 known / 6 unknown / 21 independently recomputable; Phase 2 spatial summary remains 21 known / 19 independently recomputable";
  freeze.allowed_phase4_mutation.scope = "presentation layer plus bounded R4 IM12 regional-interface structured authority";
  freeze.allowed_phase4_mutation.files = `${freeze.allowed_phase4_mutation.files}; R4 contracts, IM12 pointer, two contract-state metrics, F07, F11 readiness, bilingual proposal/registry/layout carriers`;
  freeze.allowed_phase4_mutation.restriction = "No geometry, source claim, approval, external capability, partnership, appointment, cost, SC13, IM14, F12, additional flagship, or additional first use.";
  const finalCandidate = freeze.phase3_phase4_handoff?.final_candidate;
  if (finalCandidate) {
    for (const relative of ["assets/figures/operations-pathway.en.png", "assets/figures/operations-pathway.png"]) if (!finalCandidate.allowed_phase4_output_overrides.includes(relative)) finalCandidate.allowed_phase4_output_overrides.push(relative);
    for (const relative of ["assets/figures/ai-ecosystem.en.png", "assets/figures/ai-ecosystem.png"]) if (!finalCandidate.allowed_post_phase3_protected_overrides.includes(relative)) finalCandidate.allowed_post_phase3_protected_overrides.push(relative);
    for (const relative of ["assets/figures/site-overview.en.png", "assets/figures/site-overview.png"]) if (!finalCandidate.allowed_post_phase3_protected_overrides.includes(relative)) finalCandidate.allowed_post_phase3_protected_overrides.push(relative);
    finalCandidate.phase3_outputs_preserved_byte_for_byte = finalCandidate.phase3_outputs_preserved_byte_for_byte.filter((relative) => !relative.includes("operations-pathway"));
    finalCandidate.r4_owner_contract = "visual/assets/r4-regional-interface-generation-contract.json";
  }
  writeJson(FREEZE_PATH, freeze);
}

function replacementCommand(needle, replacement, label) {
  return `source=replaceOnce(source,${JSON.stringify(needle)},${JSON.stringify(replacement)},${JSON.stringify(label)});`;
}

function patchR3eOverlay(program) {
  const auditNeedle = "fs.writeFileSync(auditTemp,sourceText(auditRecord),'utf8');";
  const auditOld = "    protected = work['protected_baseline']['files']\n    protected_results = {}\n    for relative, expected in protected.items():\n        actual = sha256(sub / relative)\n        protected_results[relative] = {'expected': expected, 'actual': actual, 'match': expected == actual}\n        fail_if(actual != expected, f'protected input drift {relative}', failures)";
  const auditNew = "    protected = work['protected_baseline']['files']\n    r4_overrides = freeze.get('r4_regional_interface_override', {}).get('file_sha256', {})\n    protected_results = {}\n    for relative, expected in protected.items():\n        required = r4_overrides.get(relative, expected)\n        actual = sha256(sub / relative)\n        protected_results[relative] = {'historical_expected': expected, 'expected': required, 'actual': actual, 'match': required == actual, 'r4_override': relative in r4_overrides}\n        fail_if(actual != required, f'protected input drift {relative}', failures)";
  const auditPdfOld = "    fail_if(not pdf_hashes_match, 'R3-E PDF carrier hashes are not bound to the generation contract', failures)";
  const auditPdfNew = "    fail_if(not pdf_hashes_match and not freeze.get('r4_regional_interface_override'), 'R3-E PDF carrier hashes are not bound to the generation contract', failures)";
  const auditReplacement = `let auditSource=sourceText(auditRecord);\n    auditSource=auditSource.replace(${JSON.stringify(auditOld)},${JSON.stringify(auditNew)});\n    auditSource=auditSource.replace(${JSON.stringify(auditPdfOld)},${JSON.stringify(auditPdfNew)});\n    if(!auditSource.includes("r4_overrides = freeze.get('r4_regional_interface_override'")||!auditSource.includes("not pdf_hashes_match and not freeze.get('r4_regional_interface_override')"))throw new Error('R4 audit patch failed');\n    fs.writeFileSync(auditTemp,auditSource,'utf8');`;
  const auditIndex = program.indexOf(auditNeedle);
  if (auditIndex < 0 || program.indexOf(auditNeedle, auditIndex + auditNeedle.length) >= 0) throw new Error("R3-E audit materialization point missing or non-unique");
  program = program.slice(0, auditIndex) + auditReplacement + program.slice(auditIndex + auditNeedle.length);
  const commands = [];
  commands.push(replacementCommand(
    'const R3E_SOURCES_PATH = path.join(ASSETS, "r3e-official-source-snapshots.json");',
    'const R3E_SOURCES_PATH = path.join(ASSETS, "r3e-official-source-snapshots.json");\nconst R4_CONTRACTS_PATH = path.join(ASSETS, "regional-interface-contracts.json");\nconst R4_GENERATOR_PATH = path.join(ASSETS, "r4-regional-interface-generator.js");',
    "R4 paths",
  ));
  commands.push(replacementCommand(
    'if (!figure.includes("data-zoom-src")) figure += button;',
    'figure = figure.replace(/<button class="zoom-trigger"[\\s\\S]*?<\\/button>/, button);\n    figure = figure.replace(/<p class="f01-source-note"[\\s\\S]*?<\\/p>/, "");\n    if (!figure.includes("data-zoom-src")) figure += button;\n    if (item.id === "F01") { const note = lang === "zh" ? "图内来源与限制：© OpenStreetMap 贡献者 · ODbL 1.0；开放资料推导背景，非测绘、法定控制或道路红线。SITE-001 与 CX01—12 均为临时 / 候选状态。" : "In-figure source + limits: © OpenStreetMap contributors · ODbL 1.0; open-data-derived context, not survey, statutory control, or road redline. SITE-001 and CX01–12 remain provisional / candidate."; figure += `<p class="f01-source-note">${esc(note)}</p>`; }',
    "R4 zoom metadata refresh",
  ));
  commands.push(replacementCommand(
    ".zoom-trigger{display:block;width:calc(100% - 2rem);margin:.7rem 1rem 1rem;padding:.62rem;border:2px solid var(--ink);background:white;color:var(--ink);font:inherit;font-weight:800;cursor:pointer}",
    ".zoom-trigger{display:block;width:calc(100% - 2rem);margin:.7rem 1rem 1rem;padding:.62rem;border:2px solid var(--ink);background:white;color:var(--ink);font:inherit;font-weight:800;cursor:pointer}.f01-source-note{display:block;margin:.2rem 1rem 1rem;padding:.7rem .8rem;border-left:5px solid var(--orange);background:#f7f2e8;color:var(--muted);font-size:max(.9rem,12px);line-height:1.45;font-weight:700}",
    "R6 visual F01 readable source note CSS",
  ));
  commands.push(replacementCommand(
    'html = html.replace(figurePattern, `$1<strong>${item.id} · ${esc(title)}</strong><span>${esc(summary)}</span>$2`);',
    'const readableSourceNote = item.id === "F01" ? `<small class="f01-source-note">${esc(lang === "zh" ? "图内来源与限制：© OpenStreetMap 贡献者 · ODbL 1.0；开放资料推导背景，非测绘、法定控制或道路红线。SITE-001 与 CX01—12 均为临时 / 候选状态。" : "In-figure source + limits: © OpenStreetMap contributors · ODbL 1.0; open-data-derived context, not survey, statutory control, or road redline. SITE-001 and CX01–12 remain provisional / candidate.")}</small>` : "";\n    html = html.replace(figurePattern, `$1<strong>${item.id} · ${esc(title)}</strong><span>${esc(summary)}</span>${readableSourceNote}$2`);',
    "R6 report F01 readable source note",
  ));
  commands.push(replacementCommand(
    ".phase4-guide p{margin:.8rem 0}",
    ".phase4-guide p{margin:.8rem 0}.proposal-figure .f01-source-note{display:block;margin-top:.65rem;padding:.7rem .8rem;border-left:5px solid #b53a21;background:#f7f2e8;color:#596260;font-size:max(.9rem,12px);line-height:1.45;font-weight:700}",
    "R6 report F01 source note CSS",
  ));
  commands.push(replacementCommand(
    "let R3E_QA = null;",
    "let R3E_QA = null;\nlet R4_CONTRACTS = null;",
    "R4 state",
  ));
  const helper = `function r4Readiness(lang) {\n  const title = lang === "zh" ? "五域接口准备度｜候选 / 未授权" : "REGIONAL INTERFACE READINESS | CANDIDATE / NOT AUTHORIZED";\n  const stats = lang === "zh" ? "合同 5 · 已授权 0 · 运行中 0" : "5 CONTRACTS · 0 AUTHORIZED · 0 OPERATING";\n  const gate = lang === "zh" ? "启动：书面授权 + 一手事实 + 责任接口人" : "ACTIVATE: WRITTEN AUTHORIZATION + FACTUAL BASIS + ACCOUNTABLE OWNER";\n  return \`<article class="regional-readiness"><p><b>\${title}</b><strong>\${stats}</strong><span>\${gate}</span></p></article>\`;\n}\n\n`;
  commands.push(replacementCommand(
    "function f11ProtocolFigure(item, lang, protocols, redTeam, format, extra = \"\") {",
    `${helper}function f11ProtocolFigure(item, lang, protocols, redTeam, format, extra = "") {`,
    "R4 readiness helper",
  ));
  commands.push(replacementCommand(
    '<aside class="governance-cards"><article><h3>',
    '<aside class="governance-cards">${r4Readiness(lang)}<article><h3>',
    "R4 F11 readiness insertion",
  ));
  commands.push(replacementCommand(
    '"16 项红队；13 项 fail / stop / unknown 保留。6 个指标 unknown；12/12 controller unknown；法律、无障碍、安全、现场、运营主体、正式批准未完成或未授权。"',
    '"13 项 fail / stop / unknown 保留；6 个指标、12/12 controller、法律、无障碍、安全、现场、运营主体与批准仍未完成。"',
    "R4 compact Chinese F11 boundary",
  ));
  commands.push(replacementCommand(
    '"16 red-team tests; 13 retained fail / stop / unknown. Six metrics unknown; 12/12 controllers unknown; legal, access, safety, site, operator, and approval incomplete or unauthorized."',
    '"13 fail / stop / unknown retained; six metrics, 12/12 controllers, and legal, access, safety, site, operator, and approval remain incomplete."',
    "R4 compact English F11 boundary",
  ));
  commands.push(replacementCommand(
    ".governance-cards p{margin:0;font-weight:700}",
    ".governance-cards p{margin:0;font-weight:700}.regional-readiness{background:#f7f2e8}.regional-readiness p b,.regional-readiness p strong,.regional-readiness p span{display:block}.regional-readiness p b,.regional-readiness p strong{color:#9b4a3a}",
    "R4 F11 readiness CSS",
  ));
  commands.push(replacementCommand(
    ".governance-cards{min-height:0;display:grid;grid-template-rows:repeat(3,minmax(0,1fr))}",
    ".governance-cards{min-height:0;display:grid;grid-template-rows:repeat(4,minmax(0,1fr))}",
    "R4 F11 readiness governance card",
  ));
  commands.push(replacementCommand(
    '  const image = dataUrl(path.join(SUB, item.paths[lang]));\n  return `<section class="figure-card ${className}" aria-labelledby="${item.id.toLowerCase()}-title"><img src="${image}" alt="${esc(alt)}"><div class="figure-caption"><strong id="${item.id.toLowerCase()}-title">${item.id} · ${esc(title)}</strong><span>${esc(judgment)}</span></div></section>`;',
    '  const image = dataUrl(path.join(SUB, item.paths[lang]));\n  const sourceNote = item.id === "F01" ? `<small class="f01-source-copy">${esc(lang === "zh" ? "来源与限制：© OpenStreetMap 贡献者 · ODbL 1.0；开放资料背景，非测绘 / 法定控制 / 道路红线；SITE-001 与 CX01—12 为临时 / 候选。" : "Source + limits: © OpenStreetMap contributors · ODbL 1.0; open-data context, not survey / statutory control / road redline; SITE-001 and CX01–12 are provisional / candidate.")}</small>` : "";\n  return `<section class="figure-card ${className}" aria-labelledby="${item.id.toLowerCase()}-title"><img src="${image}" alt="${esc(alt)}"><div class="figure-caption"><strong id="${item.id.toLowerCase()}-title">${item.id} · ${esc(title)}</strong><span>${esc(judgment)}</span>${sourceNote}</div></section>`;',
    "R6 PDF F01 source note carrier",
  ));
  commands.push(replacementCommand(
    ".figure-card .figure-caption span{color:${COLORS.muted};font-weight:700}",
    ".figure-card .figure-caption span{color:${COLORS.muted};font-weight:700}.f01-source-copy{display:none}",
    "R6 PDF F01 source note base CSS",
  ));
  commands.push(replacementCommand(
    ".a3-page .figure-card .figure-caption{min-height:16mm;padding:3mm 4mm}",
    ".a3-page .figure-card .figure-caption{min-height:16mm;padding:3mm 4mm}.a3-page.figure-f01 .figure-card{grid-template-rows:minmax(0,1fr) auto}.a3-page.figure-f01 .figure-card .figure-caption{display:block;min-height:11mm;padding:2mm 3mm;border-top:.8mm solid ${COLORS.orange};background:#f7f2e8}.a3-page.figure-f01 .figure-card .figure-caption strong,.a3-page.figure-f01 .figure-card .figure-caption span{display:none}.a3-page.figure-f01 .f01-source-copy{display:block;color:${COLORS.muted};font-size:8.5pt;line-height:1.2;font-weight:700}",
    "R6 A3 F01 duplicate caption removal",
  ));
  commands.push(replacementCommand(
    "const failures = [];\n  const protectedFiles = freeze.protected_phase2_inputs.files;",
    "const failures = [];\n  const r4Overrides = freeze.r4_regional_interface_override?.file_sha256 ?? {};\n  const protectedFiles = freeze.protected_phase2_inputs.files;",
    "R4 freeze override map",
  ));
  commands.push(replacementCommand(
    "if (actual !== record.expected_sha256) failures.push(`${relative}: ${actual}`);",
    "const required = r4Overrides[relative] ?? record.expected_sha256;\n    if (actual !== required) failures.push(`${relative}: ${actual}`);",
    "R4 protected override",
  ));
  commands.push(replacementCommand(
    "for (const [relative, expected] of Object.entries(freeze.authoritative_semantic_inputs_sha256)) {\n    const target = path.join(SUB, relative);\n    const actual = fs.existsSync(target) ? sha256(target) : \"missing\";\n    if (actual !== expected) failures.push(`${relative}: ${actual}`);\n  }",
    "for (const [relative, expected] of Object.entries(freeze.authoritative_semantic_inputs_sha256)) {\n    const target = path.join(SUB, relative);\n    const actual = fs.existsSync(target) ? sha256(target) : \"missing\";\n    const required = r4Overrides[relative] ?? expected;\n    if (actual !== required) failures.push(`${relative}: ${actual}`);\n  }",
    "R4 semantic override",
  ));
  commands.push(replacementCommand(
    "for (const [relative, expected] of Object.entries(contract.output_sha256)) {\n    const target = path.join(SUB, relative);\n    const actual = fs.existsSync(target) ? sha256(target) : \"missing\";\n    if (actual !== expected) failures.push(`${relative}: ${actual}`);\n  }",
    "const r4OutputOverrides = readJson(FREEZE_PATH).r4_regional_interface_override?.file_sha256 ?? {};\n  for (const [relative, expected] of Object.entries(contract.output_sha256)) {\n    const target = path.join(SUB, relative);\n    const actual = fs.existsSync(target) ? sha256(target) : \"missing\";\n    const required = r4OutputOverrides[relative] ?? expected;\n    if (actual !== required) failures.push(`${relative}: ${actual}`);\n  }",
    "R4 Phase 4 output override",
  ));
  commands.push(replacementCommand(
    '"assets/media/cover.webp",',
    '"assets/media/cover.webp",\n  "assets/figures/ai-ecosystem.png",\n  "assets/figures/ai-ecosystem.en.png",\n  "assets/figures/operations-pathway.png",\n  "assets/figures/operations-pathway.en.png",',
    "R4 figure outputs",
  ));
  commands.push(replacementCommand(
    'if (!R3E_QA.ok || R3E_QA.tabletop_assertions.passed !== 6 || R3E_QA.tabletop_assertions.field_tests !== 0) throw new Error("R3-E implementation QA drift");',
    'if (!R3E_QA.ok || R3E_QA.tabletop_assertions.passed !== 6 || R3E_QA.tabletop_assertions.field_tests !== 0) throw new Error("R3-E implementation QA drift");\n  R4_CONTRACTS = readJson(R4_CONTRACTS_PATH);\n  if (R4_CONTRACTS.interfaces.length !== 5 || R4_CONTRACTS.interfaces.some(item => item.status !== "candidate_not_authorized" || item.authorization_gate.gate_status !== "not_passed")) throw new Error("R4 regional-interface contract drift");',
    "R4 contract load",
  ));
  commands.push(replacementCommand(
    '"visual/assets/r3e-implementation-sources.json",',
    '"visual/assets/r3e-implementation-sources.json",\n    "visual/assets/regional-interface-contracts.json",\n    "visual/assets/r4-regional-interface-generator.js",',
    "R4 contract inputs",
  ));
  commands.push(replacementCommand(
    "r3e_implementation_evidence_contract: {",
    "r4_regional_interface_contract: { authority: R4_CONTRACTS.authority, interface_ids: R4_CONTRACTS.interfaces.map(item => item.interface_id), status: R4_CONTRACTS.computed_summary, activation: R4_CONTRACTS.computed_summary.activation_condition },\n    r3e_implementation_evidence_contract: {",
    "R4 generation contract field",
  ));
  commands.push(replacementCommand(
    "presentation_only: true,\n      structured_authority_changed: false,",
    "presentation_only: false,\n      structured_authority_changed: true,\n      structured_change_scope: \"IM12 candidate regional-interface contracts and two state-count metrics only\",",
    "R4 authority declaration",
  ));
  const needle = "const temp=path.join(ASSETS,`.r3e-phase4-${process.pid}.mjs`);";
  const replacement = `${commands.join("\n")}\n${needle}`;
  const index = program.indexOf(needle);
  if (index < 0 || program.indexOf(needle, index + needle.length) >= 0) throw new Error("R3-E overlay insertion point missing or non-unique");
  return program.slice(0, index) + replacement + program.slice(index + needle.length);
}

function runR3e(modeName) {
  const bundle = readJson(R3E_BUNDLE_PATH);
  const record = bundle.sources.find((item) => item.restore_as === "r3e-presentation-overlay.mjs");
  if (!record) throw new Error("R3-E overlay source missing");
  const original = `${record.source_lines.join("\n")}\n`;
  const actual = crypto.createHash("sha256").update(Buffer.from(original, "utf8")).digest("hex");
  if (actual !== record.source_sha256) throw new Error(`R3-E overlay hash drift: ${actual}`);
  const patched = patchR3eOverlay(original);
  const temporary = path.join(ASSETS, `.r4-r3e-overlay-${process.pid}.mjs`);
  fs.writeFileSync(temporary, patched, "utf8");
  try {
    const args = [temporary, "--submission", SUB, modeName === "check" ? "--check" : "--generate"];
    const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env });
    if (result.status !== 0) throw new Error(`Patched R3-E overlay exited ${result.status}`);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
}

function writeR4Contract(contracts, browserVersion) {
  const inputs = [
    "visual/assets/regional-interface-contracts.json",
    "visual/assets/r4-regional-interface-generator.js",
    "visual/assets/phase4-figure-registry.json",
    "visual/assets/phase4-layout-contract.json",
    "visual/assets/phase2-visual-generator-source.json",
    "visual/assets/phase2-visual-generation-contract.json",
    "visual/assets/phase3-governance-generator-source.json",
    "visual/assets/rebuild-visuals-source.json",
    "visual/assets/phase3-protocol-contracts.json",
    "visual/assets/phase3-data-governance.json",
    "visual/assets/phase3-red-team.json",
    "assumptions.json",
    "metrics.json",
    "sources.json",
    "compliance_matrix.json",
    "design_depth_matrix.json",
    "proposal.md",
    "proposal.en.md",
  ];
  const outputs = [...FIGURE_OUTPUTS, ...PRESENTATION_OUTPUTS, "visual/assets/phase4-source-freeze.json", "visual/assets/phase4-generation-contract.json"];
  const payload = {
    schema: "jz-r4-regional-interface-generation-contract/v1",
    generated_at: "2026-08-29",
    authority: {
      implementation_item: "IM12",
      claim: "CL07",
      interface_ids: contracts.interfaces.map((item) => item.interface_id),
      status: "candidate_not_authorized",
      no_new_ids: "No SC13, IM14, F12, fourth flagship, or additional first use.",
      no_real_world_claim: "No external capability, partnership, appointment, exchange, operation, procurement, approval, or implementation is evidenced.",
    },
    toolchain: { node: process.version, playwright: playwrightVersion, chromium: browserVersion },
    visual_contract: {
      canvas_px: [2400, 1600],
      f01_r6: "candidate metric value / label / marker use measured non-overlapping bboxes; map status and OSM/ODbL attribution are 18 px, with the attribution on an opaque support and equivalent to >=10 px at a 1440 px image preview; report/visual HTML repeat source and limits at >=12 CSS px, while A3 replaces the duplicate title/judgment caption with an 8.5 pt source/limit line",
      f07: "existing internal loop retains dominant visual weight; five hollow dashed interfaces remain physically disconnected below a closed authorization boundary",
      f11: "readiness is a separate header block in standalone F11 and a separate governance card in native A3/A0, never a lifecycle state or complaint-path overlay; it reports 5 contracts / 0 authorized / 0 operating",
      standalone_png_minimum_new_text_px: 21,
      native_a3_readiness_minimum_pt: 8,
      native_a0_readiness_minimum_pt: 18,
      state_not_color_only: true,
    },
    input_sha256: Object.fromEntries(inputs.map((relative) => [relative, sha256(path.join(SUB, relative))])),
    output_sha256: Object.fromEntries(outputs.map((relative) => [relative, sha256(path.join(SUB, relative))])),
  };
  writeJson(R4_CONTRACT_PATH, payload);
}

function checkR4() {
  const contracts = assertContracts();
  const contract = readJson(R4_CONTRACT_PATH);
  const failures = [];
  for (const [relative, expected] of Object.entries(contract.input_sha256)) {
    const target = path.join(SUB, relative);
    const actual = fs.existsSync(target) ? sha256(target) : "missing";
    if (actual !== expected) failures.push(`input ${relative}: ${actual}`);
  }
  for (const [relative, expected] of Object.entries(contract.output_sha256)) {
    const target = path.join(SUB, relative);
    const actual = fs.existsSync(target) ? sha256(target) : "missing";
    if (actual !== expected) failures.push(`output ${relative}: ${actual}`);
  }
  if (contract.authority.interface_ids.join(",") !== contracts.interfaces.map((item) => item.interface_id).join(",")) failures.push("interface authority IDs drift");
  assertR5ReportHtml();
  if (failures.length) throw new Error(`R4 generation contract drift:\n${failures.join("\n")}`);
  runR3e("check");
  console.log(JSON.stringify({ ok: true, interfaces: 5, authorized: 0, operating: 0, outputs: Object.keys(contract.output_sha256).length }, null, 2));
}

async function main() {
  if (mode === "check") {
    checkR4();
  } else {
    const contracts = assertContracts();
    runR6Readability();
    const browserVersion = await renderFigures(contracts);
    updateFreeze();
    if (mode === "figures-only") {
      console.log(JSON.stringify({ ok: true, figures: FIGURE_OUTPUTS, browser: browserVersion }, null, 2));
    } else {
      runR3e("generate");
      repairR5ReportHtml();
      updateFreeze();
      writeR4Contract(contracts, browserVersion);
      console.log(JSON.stringify({ ok: true, interfaces: 5, authorized: 0, operating: 0, figures: FIGURE_OUTPUTS.length, presentations: PRESENTATION_OUTPUTS.length }, null, 2));
    }
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
