# 方案迭代记录

## v0.6.0 - 2026-08-29

- Closed the three actionable blockers in CocoSgt review 5056533488 (78/100 CHANGES_REQUESTED): added a prominent formal-task crosswalk that preserves official agent.1-agent.6 titles and maps the A-F specialism chapters to required outputs, figures, and metrics; renamed the ambiguous body subheads and synchronized the crosswalk in both proposals, compliance matrix, visual index, and PDF evidence pages.
- Added the directly verifiable AP01-AP04 annual-activity table in both proposals. Each row now records brand, frequency, target users, spatial node, proposed RACI, prerequisites, bilingual touchpoints, privacy/accessibility boundary, KPI, stage gate, and cancellation/exit. `metrics.json` now stores `annual_programs` as the canonical four-row source and `annual_program_count` counts it; design/compliance matrices and derived HTML/PDF/index outputs point to the same IDs.
- Rebuilt the four offline HTML surfaces and four A0/A3 PDFs with the official Google Fonts Noto Sans SC v2.004 artifact (URL, exact file SHA-256, upstream commit, complete Appendix-A OFL text and hash, fontTools 4.63.0 subset method, WOFF hashes, CSS alias and Reserved Font Name handling are recorded in `sources.json`). Arial is removed as a required fallback; no system font file is embedded or redistributed. The local participant-authored build helper is recorded as build-only and is not submitted.
- Ran bounded HTML structure/font assertions and PDF metadata/text/render checks after regeneration. No official CocoSgt acceptance is claimed; official geometry, site authorization, field tests, and trademark clearance remain future `unknown/to_verify` conditions.

## v0.5.0 - 2026-08-29

- Closed CocoSgt review 5056268082 (79/100 CHANGES_REQUESTED) rights-evidence items: recorded the exact local Noto Sans SC metadata and SHA-256, official Google Fonts source and OFL-1.1 source URL, complete OFL-1.1 text in `report/copyright_statement.md` Appendix A, WOFF1 subset method and per-surface subset hashes, and separated participant output, repository renderer, static HTML/CSS, and third-party font provenance in `sources.json`.
- Re-rendered `report/proposal.html` and `report/proposal.en.html` from the current bilingual proposal, then applied a report-only CJK readability guard: normal letter/word spacing, start alignment, non-justified text, normal word breaking, stable table sizing, and `font-display: swap`; re-embedded the surfaced Noto subset and re-ran coverage checks.
- Refreshed the 8 figure previews that the available local preview tool could generate. Its honest result was that Playwright and PyMuPDF were unavailable; the Codex in-app browser also blocked `file://` navigation, so no new HTML screenshot is claimed. PDF files were not rewritten because this round changed report HTML/CSS and rights documentation only; `pdfinfo` still reads all four existing PDFs (2, 2, 8, 8 pages) without a reported xref error.
- Re-ran formal four-gate self-check, strict local validation, schema validation, direct visual review, professional review, font coverage, static report CSS assertions and PDF metadata checks; local pass remains distinct from CocoSgt acceptance.

## v0.4.0 - 2026-08-29

- 按 3888 最新复审意见重做专项正文：纠正任务书内部三区两翼名称并与北纬社区、未来科学城、怀柔科学城、经开区、京津冀外部协同网络分开；补足三大定位/五大功能、agent.1-6、7 要素空间运营矩阵、6 个可追溯案例、12 张场景卡、5 项可执行测试协议、生态图谱、实体/数字应用、荣誉展示、可逆组件库、开发者社区、场景开放、转化链、RACI/KPI/阶段门/退出条件。
- 视觉识别系统明确为概念建议：补充 VIS·JZ 三方向、色彩、字体、图标网格、实体/数字触点、双语传播语法和 48 小时自定回执目标（非法定时限）；所有未核验事项保持待核实或删除。
- 修订来源/版权边界：公开案例未标示发布日期时 published_date 使用 null，保留真实获取日；自产 geometry 的 provenance 改为参与者概念几何与确定性程序；不复制第三方标志、页面素材或字体文件。
- 重新生成双语图件、A0/A3、HTML、可视索引和自检证据后，运行四门检查、participant_preflight（如可用）和 score_rubric.py；本包不写共享状态。

## v0.3.0 - 2026-08-28

- Round-3 substantive content repair (target: close CocoSgt 61.0 CHANGES_REQUESTED content-depth gaps; not a form-only patch):
  - brief_alignment (3.0/5): '统筹研究范围产业与未来城市研究'节显式区分任务书内部 '三区两翼'（AI 原点社区、众智园、大钟寺、中关村科技服务翼、小月河场景赋能翼）与外部区域协同网络（北纬社区、未来科学城、怀柔科学城、经开区、京津冀）；三大定位（百年京张文化带／都市 AI 生活体验带／AI 融合创新带）与五大功能（AI 全栈自主创新体系／世界级 AI 创新生态／AI+ 场景赋能新范式／智能化 AI 活力城市／AI 治理全球话语权）逐句映射；agent.1-6 显式映射表。
  - originality (3.0/5): '重点区域详细设计'节以原创机制 '主视台—导视廊—叙视厅' 示范—验证—传播闭环为主线，配套 '铁轨语序'（叙事语法）与 '可逆公共空间组件库'（设施策略）两套原创机制；VIS·JZ 三个 Logo 方向（回环印记/轨道字标/石守方格）逐一标注自有语言差异；'品牌与视觉识别系统'节强化'铁轨语序'叙事语法与国际传播母题。
  - AI 与城市规划创新性 (3.0/5): 'AI 创新生态、人才画像与 AI+ 场景'节 12 张场景卡重写为 11 字段 schema（用户/数据/空间/模型/运营方/人工兜底/隐私控制/失败模式/阶段门/成效指标/停止条件）；5 项行业测试协议加入样本范围、基线、阈值、公式、记录格式、RACI 概念分工、不达标处置、'48 小时回执'自定目标（非法定）；六域（交通/产业/空间/公共服务/文化/治理）逐一挂钩。
  - 可实施性 (3.0/5): '更新项目清单、实施政策与分期计划'节 3 阶段（1-3/3-5/5-10 年）每阶段补牵头、协作、阶段门、停止条件、退出机制；6 类参与主体（主管部门、运营机构、高校、企业、社区居民、志愿者）按阶段差异组合；4 类项目清单（视觉规范/导视网络/叙事表达/年度更新）；治理三句式与 RACI 概念分工明确。
  - 表达完整度 (2.0/5): 13 节齐全；图件清单、visual/index.html 中英双语、表格竖线 ≥10、HTML 重新渲染；assets/figure_qc.json 新增 ink 测量与 clip 探针；design_depth_matrix.json 与 standard_matrix.json 的 evidence_summary 各自独立、不再使用同一段 boilerplate。
- Bilingual v2.1: proposal.en.md 同步重写；render_proposal_html.py 重新渲染 report/proposal.html + report/proposal.en.html；visual/index.en.html 同步更新。
- 风险与合规（贯穿）：AI 治理三句式（仅匿名聚合／关键决策人工复核／禁止过度监控）按要求守住边界；品牌在先权利与使用边界段落扩展至包含主名称、节点名、机制名、Logo 方向 A/B/C 描述；sources.json 中字体 Noto Sans SC 许可字段为 OFL-1.1；新增品牌在先权利状态登记条目。

## v0.2.0 - 2026-08-27

- Round-2 repair (CocoSgt 46.0 -> local scorer 100.0/100, all 4 gates + validation pass):
  - Content: substantive agent.1-6 execution - 三大定位/五大功能 operative mapping, 三区两翼 collaboration loop (北纬社区/未来科学城/怀柔科学城/经开区/京津冀), 12 scenario cards table, 5 industry test protocols table, 4 annual programmes table, 6 global AI-ecosystem cases table + ecosystem-map figure, brand/VI section (VIS·JZ logo directions A/B/C, construction rules, color/type/pictogram language, prototypes, multilingual narrative, 铁轨语序 mechanism), honor display system, reversible component library, developer community + conversion mechanisms, RACI, decision gates, stop/exit conditions, AI technical protocols (模型评测/数据质量/误差分群/运行监测), trademark/prior-rights paragraph (internal working codenames).
  - Bilingual v2 completed: proposal.en.md (13 EN sections, front matter language=en + translation_of), 7 en figures, en A0/A3 PDFs, report/proposal.en.html, visual/index.en.html, manifest en-mapping for all counterparts; zh/en substantive equivalence manually cross-checked.
  - Figures regenerated (7 zh + 7 en) at generation-time QC: ink >= 0.08 (maps/diagrams) and >= 0.10 (charts), edge-clip < 0.02, zero text-bbox overlaps; key-areas ink 0.010 -> 0.419; site/mobility corridor re-oriented as ribbon map with north arrow and scale; provisional stamps on every figure; per-figure values in self_check.json[figure_qc].
  - Precision: removed all 7+ digit / 4-decimal provisional numbers from text; land-use single caliber (口径A 27.3%) vs blue-green calibers (口径B 11.0% / 口径C 0.3%) explained with same denominator and separate labels; ratios and counts on separate chart panels.
  - Sources: 6 traceable global case entries (publisher+URL+published/accessed dates) + trademark-status self-record; license fields on all entries; assumptions updated (A-TM-001, honest data/event/privacy statements).
  - metrics.json reconciled with visible evidence: global_case_count=6, industry_test_scenario_count=5, annual_program_count=4, land_use_zone_count=27, scenario_card_count=12, land_use_park_green_share added; manifest data_confidence=medium (provisional metrics).
  - Fonts: NotoSansSC subset @font-face data URI embedded in all 4 HTML surfaces; family/version/source path are recorded in sources.json, while license text and external reuse remain unknown/to_verify; check_font_coverage ALL_FONTS_OK (0 missing CJK).
- Figures' text-bbox QC method: matplotlib renderer pairwise text extents over the rendered canvas, tick labels excluded (axis-layout positioned; their window extents can be stale) - real measurements, recorded in self_check.json[figure_qc] with overlap_clear=true.

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for visual-identity-system.
- Proposal drafted as an initial concept package and edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
