# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for age-friendly-renovation.
- Proposal drafted via direct Codex CLI (direct Codex), session ses_fcbba44e9ffeax0hbWbUUzlmyR; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.0 round-3 - 2026-08-30 (REPAIR ROUND-3, per CocoSgt CHANGES_REQUESTED)

### proposal.md / proposal.en.md
- Unified brand「颐养智环 AGE·JZ」；删除任何残留命名；补品牌与视觉识别、导视与总体结构（agent.1）。
- 新增：10张场景卡表（SC-01..SC-10）、3个产业测试验证场景表、6条全球案例表（含来源列）、6行年度活动表、5类人才画像（人读文本与 metrics persona_count 对齐）、AI质量保障清单表、场景级数据治理清单表、三节点实施卡表（颐行廊/颐养小院/智龄馆，含[standard:]/[depth:]锚点）。
- 新增三区两翼协同回路与跨区域合作（北纬/未来科学城/怀柔/经开区/京津冀）；荣誉展示、可逆组件库、开发者社区、国际传播、RACI与试点停止/退出条件；用地单一口径+绿地生态层口径说明；AI技术协议四元（模型评测/数据质量/误差分群/运行监测）。
- 证据锚点改短ID（去日期后缀），与 sources.json 条目一一对应；proposal.en.md 重写为忠实的英文翻译（language=en、translation_of=proposal.md），无残留中文。

### figures (assets/figures/)
- 重新绘制全部9张图的中英双版（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence / ai-ecosystem / scenario-cards / logo-agejz / regional-coordination）。
- 空间图带图例、比例尺、指北针与中英双语 PROVISIONAL 印章；metrics-evidence 比例与计数分轴；land-use-structure 采用单一用地口径并与 metrics.json 口径一致。
- 生成时 text-bbox 重叠检查（0 对 >15% 重叠）+ PIL ink/edge-clip 实测（全部 ink≥0.06），结果写入 self_check.json[figure_qc]（overlap_clear=True，依据真实生成时测量）。

### drawings/
- 重新生成 a3-booklet.pdf、a0-boards.pdf 及英文版 a3-booklet.en.pdf、a0-boards.en.pdf；A0 首版标题≥60pt、版式更密、英文版纯英文。

### report/ + visual/
- 重新生成 report/proposal.html 与英文版 proposal.en.html（render_proposal_html.py）；重建 visual/index.html 与英文版 visual/index.en.html（全部14个必需章节/中文标记保留、数据属性与 metrics.json 一致、无远程资源）。
- 4个HTML页面全部内嵌 Noto Sans SC 子集字体（data:font，无缺字）；en HTML 无功能中文。

### JSON / 机器件
- sources.json：source_id 去日期后缀并与文内锚点一致；新增6条方向性案例条目（待核验）；全部条目加 license 字段。
- metrics.json：global_case_count=6、annual_program_count=6、新增 scenario_card_count=10、persona_count=5；各指标加 data_source/display_rule/recompute_trigger；green_ratio 口径说明。
- compliance_matrix.json：agent.1–6 证据摘要更新为逐项产物（品牌VI/生态图谱+八类机制/10场景卡+3测试/荣誉+组件库/叙事+国际传播/开发者社区+退出机制）；source_ids/assumption_ids 一致。
- standard_matrix.json / design_depth_matrix.json：证据摘要去重并指向各实义内容；assumption_ids 增 A-STOP-001。
- assumptions.json：新增 A-STOP-001（试点停止/退出）、更新 A-IP-001（内部工作代号）。
- manifest.json：data_confidence 改为 medium（与 provisional/low~medium 指标一致）；补全部英文对应件与新增文件条目（language=en + translation_of）；新增 report/proposal.en.html、visual/index.en.html。

### 人工核对声明
- 中英实质等值已人工核对（proposal.en.md 与 proposal.md 主张、指标、图位、证据锚点、风险措辞逐项对照）。
- 品牌在先权利检索未完成前按内部工作代号处理。
- 图表 ink 值与剪裁检查结果记录于 self_check.json[figure_qc]（全部 ink≥0.06、edge-clip 干净、text-overlap 0 对）。

## v2.0 round-3 review-update - 2026-08-30 (reviewer 反馈修复)

- visual/index.html 与 visual/index.en.html：图片路径修正为 `../assets/figures/`，9 张图中英双版全部正常加载（此前相对路径解析为 visual/assets/figures/ 导致 6 张图加载失败）。
- metrics.json：为全部 low/medium 置信度指标补 data_source/display_rule/recompute_trigger 字段。
- proposal.md：补「儿童友好」等全龄、无障碍、适老、包容措辞。
- proposal.en.md：实施卡章节标题降级为 `###`，与中文结构一致。
- 四项 gate（deterministic/spatial/visual/professional）全部 PASS；validate_local_submission PASS；scorer weighted_pct=100.0、mandatory_rejections=[]、reviewer_gaps=[]；字体嵌入与覆盖检查 ALL_FONTS_OK。


- Round 4 (2026-08-30, direct Codex): read CocoSgt 59.0 before editing; unified AGE·JZ nodes, added cooperation/AI validation/implementation-prerequisite matrices, upgraded six case sources to specific primary pages, rewrote data governance as proposed bases pending legal review, rebuilt all bilingual figures and fixed-layout A0/A3 outputs.

## 1.3 - 2026-08-30 - Direct Codex repair for CocoSgt review 5060700524

- Added six first-party global AI ecosystem comparisons and an explicit land/space/industry/funding/talent/compute/data/scenario mechanism map; retained six aging-policy entries as `background_only`.
- Added the east–west stitch × north–south care-axis spatial response, the Dazhongsi intelligent-native consumer/business interface, named operators, human fallback, and stop conditions in both narratives and the regional figure.
- Replaced the blanket “anonymized aggregation only” claim with a layered personal-information model across summaries, assumptions, scenario cards, risk text and rights statement.
- Removed repeated bilingual blocks, split the fused land-use and transport headings, regenerated bilingual figures and real A0/A3 PDFs, and refreshed offline visual surfaces.
- No remote branch, PR state, review, push or Antigravity path was touched.
