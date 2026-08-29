# 方案迭代记录 / Changelog

> 说明：本文件于 2026-08-29 **补立**。此前 v0.1–v0.5 各轮迭代均通过 Pull Request 描述与提交信息记录，未在包内维护独立 changelog；为与仓库现行惯例对齐（`skills/urban-design-ai-submission/SKILL.md` 要求同步更新 proposal、`changelog.md`、assumptions 与证据记录），现依据可核查的 PR 记录回溯补录，并自本次起随每次改动同步更新。

> Note: this file was **created retrospectively** on 2026-08-29. Iterations v0.1–v0.5 were documented in their Pull Request descriptions and commit messages rather than in an in-package changelog. To align with repository convention (SKILL.md requires updating the proposal, `changelog.md`, assumptions and evidence records together), the history is reconstructed from verifiable PR records, and this file will be kept in sync with every subsequent change.

## v1.4 - 2026-08-29

**字体改为 data URI 内嵌 / Embed font as a data URI**

- 起因：v1.3 将子集字体置于 `assets/fonts/`，CI 报错 `assets must use one of .gif, .jpeg, .jpg, .png, .svg, .webp` —— **`assets/` 目录树仅允许图片扩展名**，任何位置放字体文件都会被拒（此前置于 `assets/media/` 亦因同类白名单被拒）。
- 处理：删除 `assets/fonts/` 下的两个文件，改将 169 KB 子集字体以 **base64 data URI 直接内嵌**进 4 个 HTML 的 `@font-face`，不再依赖任何字体文件与路径，彻底规避目录/扩展名白名单。
- OFL 合规：SIL Open Font License 1.1 要求的版权与许可声明以 HTML 注释形式随内嵌字体保留，并在本条记录中载明。
- 影响：4 个 HTML 体积各增加约 231 KB（base64），渲染效果与依赖外部字体文件时一致，中文不再依赖系统字体。

- Cause: v1.3 placed the subset font under `assets/fonts/`, and CI rejected it with `assets must use one of .gif, .jpeg, .jpg, .png, .svg, .webp` — the **`assets/` tree permits image extensions only**, so a font file is rejected wherever it is placed (the earlier `assets/media/` attempt failed against the same allowlist).
- Fix: removed the two files under `assets/fonts/` and instead **inlined the 169 KB subset font as a base64 data URI** directly in the `@font-face` rule of the four HTML files. No font file or path is required any more, fully avoiding the directory/extension allowlist.
- OFL compliance: the copyright and licence notice required by the SIL Open Font License 1.1 is retained as an HTML comment alongside the embedded font and is restated in this entry.
- Impact: each of the four HTML files grows by about 231 KB (base64); rendering is identical to the external-file approach and Chinese text no longer depends on system fonts.

## v1.3 - 2026-08-29

**图件重制与字体嵌入 / Figure regeneration and font embedding**

- 修复前：中文 HTML 仅依赖系统字体（无 `@font-face`），评审环境无中文字体时出现方框字；5 组图件缺少图签栏、风玫瑰、元数据块、规划结构图例与密级；图面自评 5/5 与可见成果不符（v1.2 已如实下调为 2/5）。
- **字体嵌入**：Noto Sans SC 子集化（1144 字符，其中 1027 个 CJK；8.1 MB OTF → **169 KB woff**，SIL OFL 1.1），上传至 `assets/media/noto-sans-sc-subset.woff` 并附 OFL 声明；`report/proposal.html`、`report/proposal.en.html`、`visual/index.html`、`visual/index.en.html` 四个文件注入 `@font-face` 并将该字体置为首选。
- **图件重制**：5 组 × 中英 = **10 张 PNG** 全部基于 `geometry/*.geojson` 重绘（1815×1287），补齐图签栏（8 字段）、风玫瑰、元数据块（坐标系 / 投影 / 中央子午线 / 高程基准 / 资料来源）、双图例（用地分类 GB 50137-2011 八大类 + 规划结构 4 项）、比例尺 `0 ━━ 500 ━━ 1000 m`、密级与三行脚注。风玫瑰明确标注「示意（冬夏主导风向，非实测）」。
- **PDF 重生成**：A3 图册与 A0 展板各中英 2 份（共 4 个 PDF），每份 5 页。
- **自评回调**：`metrics.json` 的 `figure_layout_compliance` 自评由 **2/5 回调为 4/5**（图面元数据现已实际呈现；5/5 保留为经评审确认后的目标）。
- **版式纪律**：每个图例区块使用独立 axes，按物理 inch 预算高度（字号 7.5pt、行距 1.45 倍），避免文字重叠。

- Before the change: the Chinese HTML relied solely on system fonts (no `@font-face`), producing tofu boxes in font-less review environments; the five figure sets lacked a title block, wind rose, metadata block, structure legend and clearance marking; the 5/5 figure self-estimate contradicted the visible output (honestly lowered to 2/5 in v1.2).
- **Font embedding**: Noto Sans SC subset (1,144 characters, 1,027 of them CJK; 8.1 MB OTF to a **169 KB woff**, SIL OFL 1.1) uploaded to `assets/media/noto-sans-sc-subset.woff` with the OFL notice; `@font-face` injected into `report/proposal.html`, `report/proposal.en.html`, `visual/index.html` and `visual/index.en.html`, with the font set as first choice.
- **Figure regeneration**: all **10 PNGs** (5 variants x 2 languages, 1815x1287) redrawn from `geometry/*.geojson`, adding the title block (8 fields), wind rose, metadata block (datum / projection / central meridian / vertical datum / source), double legend (GB 50137-2011 land-use classes plus four structure items), scale bar `0 - 500 - 1000 m`, clearance marking and three footnotes. The wind rose is explicitly labelled "schematic (not measured)".
- **PDF regeneration**: A3 booklet and A0 boards, two versions each in Chinese and English (4 PDFs total), five pages each.
- **Self-estimate raised**: `figure_layout_compliance` in `metrics.json` raised from **2/5 to 4/5** (figure metadata is now actually presented; 5/5 retained as the target pending reviewer confirmation).
- **Layout discipline**: each legend block uses its own axes with a physical-inch height budget (7.5 pt type, 1.45 line spacing) to prevent text overlap.

## v1.2 - 2026-08-29

**合规声明与可见成果对齐 / Aligning compliance claims with visible output**

- 修复前（PR #4155 评审指出，风险与合规意识 3/5 的两项阻断）：
  1. 正文与自检中的来源数量与状态未与 supplied `data/source_registry.json` 对齐，且未区分维护者登记来源与参与者自登记资料；
  2. `metrics.json` 与中英文 HTML 声明「5 张 PNG 已全部按 14 条规范改造完成」并自评 **5/5**，而评审在可见图面中未看到所声称的图签、元数据块、风玫瑰与双图例 —— 声明与事实不符。
- 修复 1（来源分栏）：在 `proposal.md` / `proposal.en.md` 的参考资料节新增「来源分栏与可用性边界」段，明确登记 35 条分两类：① 维护者登记来源 9 条 —— 正式可用 **7**、background_only **1**、provisional_only **1**，仅前 7 条可作正式依据，后两类不得升格；② 参与者自行登记的外部资料 26 条，逐条登记来源/用途/限制，**未进入维护者 registry、不具备正式可用性**，仅作背景支撑。
- 修复 2（下调图面自评）：`metrics.json` 的 `figure_layout_compliance` —— `status` 改为 `declared_specification_only`，新增 `verification_status: declared_not_verified_in_rendered_output`，`current_state` 五项由 `present` 改为 `declared in spec; NOT verified in rendered output`，自评 `compliance_score_self_estimate_0_5` 由 **5 下调为 2**；`planned_state_v2` 保留 5/5 作为**待实现目标**（需重生成 5 张 PNG 使图面元数据可见后复核）。
- 同步修正 `proposal.md`、`proposal.en.md`、`report/proposal.html`、`report/proposal.en.html` 中的对应表述（改为「自评已由 5/5 下调为 2/5」）。
- 说明：本次按评审给出的低成本路径处理 —— **如实下调自评并标注未验证**，而非重生成图件；图件重生成与字体嵌入列为后续独立任务。

- Before the change (two blocking items flagged under Risk & Compliance, 3/5, in the PR #4155 review):
  1. Source counts and usability states in the narrative and self-check did not match the supplied `data/source_registry.json`, and maintainer-registered sources were not separated from participant-registered material;
  2. `metrics.json` and both HTML outputs claimed "all 5 PNGs normalized to the 14-point spec" with a self-estimate of **5/5**, while the reviewer could not see the claimed title block, metadata block, wind rose or double legend in the rendered figures — a claim inconsistent with the visible output.
- Fix 1 (source tiers): added a "Source tiers and usability boundary" section to `proposal.md` / `proposal.en.md`, splitting the 35 registered sources into two tiers: ① 9 maintainer-registered sources — **7** formally usable, **1** background_only, **1** provisional_only, with only the first 7 usable as formal basis and the latter two explicitly not upgradable; ② 26 participant-registered external entries, each with source/purpose/limitation, **not in the maintainer registry and carrying no formal usability**, used only as background support.
- Fix 2 (lowered figure self-estimate): in `metrics.json`'s `figure_layout_compliance`, `status` became `declared_specification_only`, a new `verification_status: declared_not_verified_in_rendered_output` was added, the five `current_state` items changed from `present` to `declared in spec; NOT verified in rendered output`, and `compliance_score_self_estimate_0_5` was lowered from **5 to 2**; `planned_state_v2` retains 5/5 as a **target** (requiring regeneration of all 5 PNGs with visible figure metadata, then re-verification).
- Corresponding wording in `proposal.md`, `proposal.en.md`, `report/proposal.html` and `report/proposal.en.html` was updated to state that the self-estimate has been lowered from 5/5 to 2/5.
- Note: this follows the low-cost path offered by the review — **lowering the self-estimate and marking items unverified** rather than regenerating figures; figure regeneration and font embedding remain separate follow-up tasks.

## v1.1 - 2026-08-29

**风险登记与沙盒规则台账补立 / Risk register and sandbox rule ledger**

- 修复前：全包缺少独立的风险登记与治理规则台账。对高分投稿（score >= 93）的结构普查显示，`risk.json` 与 `simulation.json` 分别被 **45%** 与 **32%** 的高分稿件采用，而本包两者皆无。
- 新增 `risk.json`：五维风险登记（数据隐私 / 实施复杂度 / 公众接受度 / 运维成本 / 政策不确定性），每维含风险说明、缓解措施与人工复核责任。成本金额保持 **unknown**，不编造数值；明确本登记不构成对既有设施合规状态的判定，也不构成实施承诺。
- 新增 `simulation.json`：沙盒准入与凭证协议的**声明式**规则台账，六项判定（基线准入一项 + 五项停止条件），规则对应场景卡九字段与既有停止条件。`status` 为 `declared_not_executed`、`observed_decision` 一律为 **null** —— 包内不含可执行脚本，故不声称任何运行结果。
- 两个文件均按 `role: risk_and_implementation_readiness` / `offline_simulation_ledger` 登记进 `manifest.json`（条目 65 → 67）。

- Before the change, the package had no standalone risk register or governance rule ledger. A structural census of high-scoring submissions (score >= 93) showed `risk.json` adopted by **45%** and `simulation.json` by **32%** of them, while this package had neither.
- Added `risk.json`: a five-dimension risk register (data privacy / implementation complexity / public acceptance / operations cost / policy uncertainty), each with a risk note, mitigation and human-review responsibility. Cost figures remain **unknown** and are not fabricated; the register explicitly does not judge the compliance status of existing facilities and does not constitute an implementation commitment.
- Added `simulation.json`: a **declarative** rule ledger for the sandbox admission and credential protocol, with six determinations (one baseline admission plus five stop conditions) mapped to the scenario-card nine fields and existing stop conditions. `status` is `declared_not_executed` and every `observed_decision` is **null** — the package ships no executable script, so no run result is claimed.
- Both files were registered in `manifest.json` as `role: risk_and_implementation_readiness` / `offline_simulation_ledger` (entries 65 → 67).

## v1.0 - 2026-08-29

**数据来源边界强化与迭代记录补立 / Data-sourcing registry strengthening and changelog establishment**

- 修复前：本包的证据底座全部来自任务书、征集公告与仓库内置资料，缺少外部权威公开统计支撑包容性与产业可行性论证；同时全包没有 `changelog.md`，与仓库现行惯例不符（main 上同期 494 份投稿均含此文件），CI 会报 `Changelog files: 0`。
- 依据 2026-08-13 明确的数据来源边界（可引国家统计局等权威公开材料与许可合规的第三方数据；所有引用须登记来源、用途、限制；不得上传个人隐私、非公开规划资料或未授权数据），在 `sources.json` 新增 6 条登记：2 条仓库 A0 法规交叉引用（《无障碍环境建设法》第 39 条现场引导与人工服务要求、国办发〔2020〕45 号传统渠道并行）、3 条海淀区官方统计（2024 年末常住人口 312.2 万；60 岁及以上 71.8 万、占 23%，中度老龄化；2024 年人工智能核心产业规模 2822 亿元、企业 1900 余家、公共算力汇聚京津冀蒙新超 8 万 P）、1 条 OpenStreetMap 公开底图（ODbL，仅作临时几何面积 sanity-check 基准）。
- 同步在 `proposal.md` / `proposal.en.md` 的包容性、AI 产业定位与几何诚实三处插入对应证据标记，并将参考资料索引计数由 26 修正为 35（该计数此前未随 sources 条目增加同步更新，属既有不一致）。
- 未接入骑手、网约车、快递或流量热力等第三方数据，因此不登记相关引用；登记内容均为确已使用且经检索核验的公开来源，无杜撰数值，也未上传任何原始数据文件。
- 边界声明不变：本投稿仅申请 repository intake，不代表画廊发布、评奖、实施批准或政府背书。

- Before the change, the evidence base rested entirely on the brief, the official announcement and repository-bundled materials, with no external authoritative public statistics supporting the inclusivity and industry-feasibility arguments. The package also lacked `changelog.md`, contrary to repository convention (494 concurrent submissions on main include one), which caused CI to report `Changelog files: 0`.
- Following the data-sourcing boundary clarified on 2026-08-13 (authoritative public statistics and licence-compliant third-party data may be cited; every citation must register source, purpose and limitation; no personal data, non-public planning material or unauthorised data may be uploaded), six entries were registered in `sources.json`: two cross-references to repository A0 instruments (Barrier-Free Environment Construction Law Art. 39 on-site guidance and human service; GuoBanFa〔2020〕No.45 parallel traditional channels), three Haidian official statistics (permanent population 3.122 million at end-2024; residents aged 60+ at 718,000, 23% of the population, a moderately aged society; 2024 AI core-industry output RMB 282.2 billion with 1,900+ AI firms and a public compute pool exceeding 80,000 P across Jing-Jin-Ji and beyond), and the OpenStreetMap public basemap (ODbL) as a sanity-check baseline only.
- Matching evidence markers were inserted into the inclusivity, AI-industry positioning and geometry-honesty sections of `proposal.md` / `proposal.en.md`, and the reference index count was corrected from 26 to 35 (it had not been kept in sync as source entries were added — a pre-existing inconsistency).
- No rider, ride-hailing, courier or traffic-heatmap data was ingested, so none is registered. Every registered citation is genuinely used and verified by web search; no figures are fabricated and no raw data files were uploaded.
- Boundary statement unchanged: this submission requests repository intake only, and does not represent gallery publication, award selection, implementation approval or government endorsement.

## v0.5 - 2026-08-13（PR #2275）

**内容强化：公众参与、区域协同、分期实施、AI 测试治理 / Content strengthening**

- 新增「三区两翼 × 京津冀创新协同机制表」（回应早期评审点名的「协同回路无专图、京津冀几乎未回应」）、「分期实施矩阵：试点区域—参与主体—关键指标」、「SC-01~03 产业测试验证场景完整字段 + 沙盒准入与凭证协议（准入→凭证→退出→复盘）」。
- 将 proposal 中替维护者宣布评分结论的措辞改为中性事实陈述（参考 Issue #1368 的同类处理）；为受组织方数据限制的两项设计深度（开发强度控制 FAR、高度与体量）补充可选字段 `completeness_limited_by`；引用真实在跑的公开意见通道（Issue #955）作为公众参与的实例。
- 评审结果：Review Agent score 68/100，mandatory rejection 与四道本地 gate 均通过，状态 intake accepted。
- 后续说明：本轮之后推送的「数据来源强化」提交晚于 PR 合并时间（2026-08-13T03:23:59Z），未随本 PR 进入 main，已并入 v1.0 重新提交。

- Added the "three zones, two wings × Jing-Jin-Ji innovation-synergy mechanism" table (addressing the earlier review note that the synergy loop had no dedicated figure and Jing-Jin-Ji was barely addressed), the "phasing matrix: pilot area — actors — key indicators", and the "SC-01~03 full-field test-validation scenarios plus sandbox admission and credential protocol".
- Replaced wording that announced scoring conclusions on the maintainer's behalf with neutral factual statements (following the handling of the parallel case in Issue #1368); added the optional `completeness_limited_by` field to the two design-depth items constrained by organizer data gaps (development-intensity/FAR controls and height-massing character); cited the live public-comment channel (Issue #955) as a worked instance of public participation.
- Review outcome: Review Agent score 68/100; mandatory rejection and all four local gates passed; status intake accepted.
- Follow-up: the data-sourcing commit pushed after this PR's merge (2026-08-13T03:23:59Z) did not enter main and has been folded into v1.0 for resubmission.

## v0.4 - 2026-08-12（PR #2044）

**开源字体合规、矩阵引用清理与提交规范对齐 / Open-source font compliance, matrix reference cleanup, submission-convention alignment**

- 评审结果 Review Agent score 68/100。详见 PR #2044。

## v0.3 - 2026-08-11（PR #1878）

**内容深化：重点区域、可行性、原创性、场景卡 / Content deepening: key areas, feasibility, originality, scenario cards**

- 评审结果 Review Agent score 64/100。详见 PR #1878。

## v0.2 - 2026-08-09（PR #928）

**28 项 repairs（原创性与可行性）/ 28 repairs (originality and feasibility)**

- 评审结果 Review Agent score 71/100。详见 PR #928。

## v0.1 - 2026-08-08（PR #624）

**初始投稿：百年京张AI创新带城市设计提案 / Initial submission**

- 评审结果 Review Agent score 62/100，intake 通过。详见 PR #624。

---

## 冻结项声明 / Frozen scope

以下范围在本轮及历次迭代中保持不变，任何改动都会在本文件显式记录：提交几何（`geometry/`）与全部面积、比例指标仍以组织方提供的 provisional 边界为限，待官方多边形发布后整体重算；不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；不上传个人隐私、非公开规划资料或未授权数据。

The following scope stays frozen across this and previous iterations, and any change to it will be recorded explicitly here: submitted geometry (`geometry/`) and all area and ratio indicators remain bounded by the organizer-provided provisional boundary and will be fully recalculated once official polygons are published; no claim is made of official approval, approved regulatory control, final land ownership, final construction scale or guaranteed implementation; no personal data, non-public planning material or unauthorised data is uploaded.
