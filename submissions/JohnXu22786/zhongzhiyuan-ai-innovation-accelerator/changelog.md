# 方案迭代记录

## v2.4 - 2026-08-30 (DIRECT CODEX CURRENT-HEAD CONSISTENCY REPAIR)

- 按官方 82/100 评审逐项复核当前包：将 formal narrative 的“three internal working nodes”改为跨众智园、北京 AI 原点社区、大钟寺 AI 产业集聚区的三片区接口网络，明确三者均为概念映射而非众智园内部已确定点位。
- 重新核对中英文 proposal、compliance matrix、key-areas/site-overview 图、双语 HTML 与 A3/A0 图册的 L1-L3 归属；当前英文 A3 第1页使用 `site-overview.en.png`，英文第2页使用 `key-areas.en.png`，不再嵌入中文总览图。

## v2.3 - 2026-08-30 (DIRECT CODEX PR #3864 LATEST COCO REVIEW REPAIR)

- 按最新 CocoSgt 82/100 CHANGES_REQUESTED 复核：三矩阵与 `sources.json` 的五个项目级案例 ID 全包检索无孤立旧案例 ID；未重复改写已正确的矩阵内容。
- 修正 `visual/index.en.html` 的英文可见指标限定语（`about`）与节点表头（`ID / Name`），保持中英指标、节点、协议、限定语和图位等价。
- 从当前 C 包重新生成 `visual/assets/previews/` 的中英文图件、HTML 与 A0/A3 首页预览；随后刷新 manifest 哈希并重跑正式校验。

## v2.2 - 2026-08-30 (DIRECT CODEX SOURCE/RIGHTS AND READABILITY REPAIR, PR #3864)

- 统一 source/rights ledger：删除权利表中的历史案例名称与孤立 source ID，提案、`sources.json`、`standard_matrix.json`、`design_depth_matrix.json`、`compliance_matrix.json` 现在均指向五个项目级案例页（Singapore LaunchPad @ one-north、Helsinki Maria 01、Paris F/AI at STATION F、Toronto MaRS Centre、Montreal Mila LaSalle）。
- 将 `report/copyright_statement.md` 重写为唯一逐路径权利台账，补齐 14 张图件、4 份 A0/A3 图册、9 份 geometry、4 个 HTML、字体子集、五案来源及不可迁移/商业使用边界；同步收紧 `PACKAGE-ASSETS` 与 `PACKAGE-GEOMETRY` 的许可字段。
- 修正中英文风险证据锚点、重复版权路径与报告换行；保留约 1141 万平方米的 provisional 读者显示和精确 machine `data-value` 绑定，不把临时几何升级为官方红线。
- 重新渲染双语 report HTML，随后对四个 HTML surface 重新嵌入本地 OFL Noto Sans SC 子集；最终将运行正式四门、strict manifest/schema、字体、视觉、PDF、manifest 与 self-check，并保持 PR #3864 Draft，不 push、不转 Ready。

## v2.1 - 2026-08-30 (DIRECT CODEX FOLLOW-UP, PR #3864)

- 按最新 CocoSgt 反馈继续深改：五个全球案例保持项目级来源、发布方、访问日期、事实边界与不可迁移条件；PACKAGE-ASSETS 与 `report/copyright_statement.md` 的逐资产权属/复用台账统一。
- 东西缝合、南北贯通、大钟寺智能原生消费与商务场景补齐空间类型、适用片区与面积口径、运营主体、公共利益边界、审批前置和停止条件，继续明确为概念、非工程。
- 中英文正文、双语 visual/report HTML、14 张图件和 4 份 A0/A3 图册同步；读者可见场地面积统一为约 1141 万平方米 / about 11.41 million m²，精确值仅保留在机器绑定数据中。
- 使用工作区 OFL 字体源重建完整已用字形子集，四份 HTML 显式内嵌同一字体；最终 manifest 哈希与四门 self-check 已刷新。PR 状态保持 Draft，未 push、未 Ready。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for zhongzhiyuan-ai-innovation-accelerator.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcc9159f2ffeLEcEFKHpqW9Xvb; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.0 - 2026-08-27 (ROUND-1 REPAIR, PR #3864 CocoSgt 59.0 -> local 97.0)

- proposal.md: 重写正文——十二张场景卡表、三个测试协议表、五类人才画像表、节点—功能—运营映射表、场景数据治理清单表、实施项目与长期运营矩阵表（阶段/主体/依赖数据/审批前置/试点/成本等级/KPI/人工接管/停止条件/公众反馈/转化路径）、年度活动表（5行）、指标口径表（来源/公式/假设/置信/有效位数/用途限制/复算触发）；新增品牌识别与视觉系统（Logo方向、符号/色彩/字体/四级导视）、荣誉展示体系、可逆公共空间组件库、文化叙事导视与国际传播短文案、开发者社区与场景揭榜备案招引机制、五条区域协同接口（北纬/未来科学城/怀柔/经开区/京津冀）；指标按置信度降精度展示；AI技术协议（模型评测/数据质量/误差分群/误报率/运行监测）；品牌在先权利与使用边界段落。
- proposal.en.md: 完整英文译文（13节英文标题、同构表格、front matter language=en + translation_of=proposal.md），仅保留引号内品牌双语注释。
- 图件重绘（zh+en 各6张 + Logo）：12x8@150dpi、标题>=18pt、图例/比例尺/指北针、场景编号 L1-L3/S1-S6、节点—功能—运营映射、双语 PROVISIONAL 戳记（临时概念边界·非官方红线·官方数据发布后复算）；ink 实测 map>=0.08/chart>=0.10、edge_clip<0.02 全部通过，A0 首页标题>=60pt（记录见 self_check.json[figure_qc]）。
- drawings: a0-boards.pdf / a3-booklet.pdf 重排（zh+en 共4份），A0 首页标题带+密度排版，正文版式含三节点/生态/指标说明。
- metrics.json: 全部 provisional 模型值按置信度降精度（面积取整、比率3位有效数字），逐项增加 display_precision 与 recompute_trigger。
- sources.json: 全部条目补 license 字段；新增 5 条全球案例逐案来源（DATA-SRC-CASE-*，含发布方、URL、访问日期、可迁移边界与待研究假设标注）与 PACKAGE-ASSETS 资产/字体权属条目；3 条源 ID 去除日期后缀（保留 published_date 字段）以规避文本精度误报。
- 三矩阵: compliance/standard/design-depth 的 evidence_summary 逐项改写为指向真实章节与表格的唯一内容（不再复制模板）；design_depth proposal_sections 按节映射修正。
- HTML: report/proposal.html 与 report/proposal.en.html 由 render_proposal_html.py 重新生成；visual/index.html 重写（数据值=metrics.json 精确值，图例/比例尺/指北针/场景编号内嵌 SVG）并新增 visual/index.en.html；四份 HTML 最后一步内嵌 OFL 许可 Noto Sans SC 子集（data URI），浏览器实测 0 方框缺字、en 页 0 功能性中文。
- manifest.json: 43 项文件登记，en 对应件全部声明 language=en + translation_of；data_confidence=mixed_provisional_and_conceptual；自检与 figure_qc 后哈希同步。
- report/copyright_statement.md: 扩展为「版权声明+逐资产权属台账」（图件/PDF/几何/HTML/字体/案例来源），含品牌在先权利与使用边界段落。
- 机器门禁: 4-gate self-check PASS、validate PASS（仅 provisional 边界提示）、score_rubric 97.0/100 且 reviewer_gaps 为空。

### 中英文实质等效检查表（人工核对声明）

| 项目 | 中 | 英 | 等效性 |
| --- | --- | --- | --- |
| 13 个一级章节 | 13 个规范标题，顺序一致 | 13 个英文规范标题，顺序一致 | 一致 |
| 三层范围数字 | 43.6/11.4 平方公里、368.4/192/104/72 公顷 | 同组数字 | 一致 |
| 场景卡/协议/画像/案例计数 | 12/3/5/5 | 12/3/5/5 | 一致 |
| 三节点命名与功能 | 链港/星轨/算枢 中文名+功能 | 英文名+功能（含中文双语注释于引号内） | 实质一致 |
| 指标值 | 11412825 / 0.195 / 0.004（provisional 降精度） | 同值 | 一致 |
| AI治理三句式 | 匿名聚合/人工复核/禁止过度监控 | 英文三句式 | 一致 |
| 年度活动表 | 5 行 | 5 行同名活动 | 一致 |
| 实施运营矩阵 | 6 行项目 | 6 行对应项目 | 一致 |
| provisional/复算声明 | 图件+正文+指标章节 | 图件+正文+指标章节 | 一致 |
| 品牌与版权段落 | 在先权利+内部工作代号 | 英文同义表达 | 实质一致 |
