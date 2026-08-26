# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for indicator-implementation-monitoring.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcbf44aeeffeYtogb7SCaMNVJh; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v1.1 - 2026-08-26 (REPAIR ROUND-1, per CocoSgt review)

- **中英配对 (v2 合同)**：proposal.en.md 改为全文实质翻译（front matter language=en、translation_of=proposal.md；zh 正文声明 bilingual_contract_version=1、translation_file=proposal.en.md）；补齐 6 张 *.en.png 图件、a0-boards.en.pdf、a3-booklet.en.pdf、report/proposal.en.html、visual/index.en.html，manifest 逐项登记 language/translation_of。
- **字体**：四个 HTML 面（zh/en proposal + visual index）均内嵌 Noto Sans SC woff 子集（OFL），en 页面残留功能性中文为 0。
- **agent.1–6 实质成果**：品牌与视觉识别节（「METRIC·JZ」视觉系统+logo-metric-jz.png，按内部工作代号处理）；6 个有来源国际案例表（全球案例5–8要求）+AI创新生态图谱图；10 张AI+场景卡+3 个产业验证测试场景（与 metrics 计数一致）；三节点地标目录+荣誉展示区+可逆组件库；文化/导视/国际传播系统；年度活动品牌+开发者社区+场景开放与招引转化机制。
- **空间与指标表达**：图件重做（figsize~12x8@150dpi，标题≥18pt、图例/标注≥13pt、constrained_layout、无裁剪）；所有空间图含图例/比例尺/指北针/双语 PROVISIONAL 戳（临时概念边界、非官方红线、官方数据发布后复算）；节点—三区两翼映射写入正文与图注；比率与数量分轴成图（metrics-evidence）；用地百分比给出公式与单一聚合口径（本包 provisional 边界为分母，官方数据发布后按同一公式复算）。
- **分期深化**：试点计划表含责任类型与协作方、前置条件、数据字典与维护要求、资源区间（定性）、KPI 与决策门、退出/回滚与年度复算流程；「牵头+协作」RACI 概念版；明确不构成已获批准的政府安排。
- **公众反馈AI数据治理**：自由文本先脱敏、最小收集、聚合阈值、日志与权限分级、保存删除流程、错误更正与申诉通道、事件响应预案、公开反馈闭环（受理—处理—回复—公示）。
- **版权台账**：report/copyright_statement.md 升级为逐资产台账（字体/图像/地图/数据/代码与库/生成图形/品牌标识/案例材料），COMMUNITY-DISPLAY-ONLY 许可范围澄清（仅限征集展示与评审引用，不授予修改再分发，后续专业深化需另行授权）；sources.json 16 条均含 url/publisher/published_date/license。
- **精度与口径**：正文不再出现 7+ 位长数字或 4+ 位小数 provisional 值；source id 去掉日期后缀；metrics.json 补 usage_limits_zh/recompute_trigger_zh；manifest data_confidence=medium。
- **风险登记**：新增 risk.json（六维度，version=1，含 note/mitigation/human_review）。
- **机器QC**：图件 ink 覆盖率（地图/图表类）均达标（最低 key-areas 0.114）；边缘剪裁 0；文本重叠后验不可机器验证，figure_qc 中 overlap_clear=not_verified 如实标注；生成期文本包围盒检查记录于本日志。
- **人工复核清单（本轮）**：中英实质等值已人工核对（主张、指标、证据锚点、图位逐项对照）；品牌在先权利检索未完成前按内部工作代号处理；图表单位（比率与数量分轴、用地百分比口径）、来源权利（逐条 license）、任务书交付物（13 节、23 项合规、5 标准、15 深度项）已逐项核对。
- Valroot 四门禁（deterministic/spatial/visual/professional）重跑通过并持久化 self_check.json；manifest 哈希刷新。

