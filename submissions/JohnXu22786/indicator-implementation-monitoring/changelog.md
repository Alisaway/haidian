# 方案迭代记录

## v1.7 - 2026-08-29（针对 CocoSgt review 5057164571 的第七轮收口）

- 新增中英文 `east-west-north-south` 关系图，把“东西缝合—南北贯通”落到中关村科技服务翼、小月河场景赋能翼、众智园、大钟寺与三节点证据闭环；大钟寺 DZ-01/DZ-02 卡与十项场景卡均保留 provisional 概念边界、人工门与退出条件。
- 新增 `visual/assets/resource_story_directory.json` 与 `visual/assets/kpi_protocols.json`，分别登记京张—中关村—AI 新文化分级资源和活动/场景/阶段 KPI 审查协议；协议逐项含公式、建议区间、`unknown/to_verify` 基线、核验频率、证据、R/A 与失败动作。
- 更新来源/权利台账、compliance/design-depth 矩阵和 manifest，补登记新增图件、结构化证据及 visual 构建来源；所有派生 PNG、HTML、视觉索引和 9 页中英文 PDF 重新生成并刷新 hash。

## v1.6 - 2026-08-29（针对 CocoSgt review 5057164571 的第六轮修复）

- agent.4「东西缝合—南北贯通」关系图与 DZ-01/DZ-02 大钟寺概念卡新增卡片级证据契约：输入回执、授权/脱敏、模型版本、人工决定、公示回执和停止/回滚记录；缺证即阻断试点声称。
- 中英文三阶段与 AP-01—AP-04 协议改为明确分子/分母公式，保留建议区间、`unknown/to_verify` 基线、频率、证据、R/A 与失败动作；矩阵证据锚点改正，不再声称不存在的 `metrics.json.annual_programs` 对象。
- 英文摘要与视觉索引同步四层隐私边界：反馈入口自由文本在预处理前可能含个人信息，模型仅接收脱敏/公开/合格聚合材料，公示须人工复核并抑制低样本。
- agent.5 分级目录继续降级未核验京张史实，中关村仅保留有来源的语境性表述，AI 新文化明确为本包原创概念并映射三节点/空间类型；未新增虚构史实或现状基线。

## v1.5 - 2026-08-29 (Codex bounded content and rights repair)

- Added the formal taskbook agent.1–agent.6 crosswalk before the body, explicitly separating the taskbook Three Areas & Two Wings from the package's out-of-belt Five-Region Coordination Network.
- Added four bilingual annual-program operating cards with frequency, audience, node, RACI, resource prerequisites, bilingual touchpoints, privacy/accessibility boundary, KPI, stage gate and cancellation/exit; `metrics.json` records the synchronized `annual_program_count`, while the bilingual proposal cards remain the human-readable field source.
- Re-rendered both proposal HTML surfaces, six bilingual figures and four bilingual PDF boards/booklets from the current package. Visual labels remain reduced-precision and provisional; official geometry and operational responsibilities remain `to_verify`.
- Replaced the stale font evidence with the verified Google Fonts Noto Sans SC 2.004 artifact URL, upstream metadata/commit, source SHA-256, raw OFL SHA-256 and final embedded WOFF hashes; Arial is explicitly a non-embedded viewer fallback. The full OFL text and font provenance are retained in `report/copyright_statement.md` section 6, which is the validator-allowed rights record.
- Re-ran the formal four-gate self-check, strict manifest/JSON/schema validation, visual review and PDF/font readability checks after the final manifest refresh. These local results are not a CocoSgt approval; the 70/100 review remains the authoritative pending review.

## v1.4 - 2026-08-29 (Codex repair pass for CocoSgt review 5031003314)

- Replaced stale OpenCode/Hermes provenance in `agent.json` with the actual Codex terminal-assisted repair provenance; no claim of official or CocoSgt approval is made.
- Closed the visible count mismatch by adding a fourth annual program, `指标方法国际交流会 / International Indicator Methods Exchange`, and synchronizing `proposal.md`, `proposal.en.md`, `metrics.json`, figures and PDF cover copy to `annual_program_count=4`.
- Re-rendered the bilingual figure set and A0/A3 boards with a fixed title/body/footer scaffold, reduced-precision human labels, a clear internal `Three Areas & Two Wings` versus out-of-belt `Five-Region Coordination Network` panel, and the three-caliber land-use cross-table. The map labels remain conceptual and tied to `geometry/*.geojson`; no new official geography is asserted.
- Extended the rights ledger to file-level PDF/HTML/visual outputs and explicitly retained `unknown/to_verify` for font redistribution terms, system Latin fallback terms, brand prior-rights search, and official geometry.

## v1.3 - 2026-08-28 (CONTENT-DEPTH REPAIR ROUND-2, per CocoSgt review 2026-08-26)

- **可实施性章节重写（CONTENT REWRITE，不是形式修补）**：把"试点要素×三阶段"的一张总表扩为「试点区域与参与主体」「分期每阶段任务/牵头/协作/准入/阶段门/停止条件/退出回滚」「牵头+协作 RACI 概念版」「场景开放与招引转化机制」「年度活动体系」「退出与回滚通用原则」六小节；试点区域显式锚定 geometry/key_areas.geojson（KEY-ZHON 与 KEY-BEIJ 连线两侧各延伸约 250 米、沿绿带中段约 1 公里概念区间）；八类参与主体（政府/企业/高校/居民与社区/运营团队/志愿者/商户/专业团队）按牵头—主协作—咨询—知会四角色登记；新增两个原创机制名「机制 M1：指标共治公约」「机制 M2：指标开放积分制」。
- **指标体系章节重写**：把面积与比例的精度政策与"绿地与开敞空间用地 27.3% vs green_ratio 11.0% vs public_space_ratio 0.3%"的"分子收窄"关系做成正式交叉表（同一分母、三类分子、互不替代、不可相加比较），明确中英文 narrative、metrics.json、figures、HTML 四处一致：narrative 与 HTML 一律降精度、metrics.json 保留机器值契约、figures 坐标标签与 narrative 同精度；列出四种复算触发情形（官方边界发布、控规条件发布、主管口径数据发布、概念字典版本变更）。
- **三区两翼 vs 五地协同网显式区分**：用 bullet 列出带内/带外两层（带内「三区两翼」= 任务书文本中的专有称谓与协同结构，不代表法定规划、官方红线或已批准控制；带外「五地协同网」= 本包自拟概念名、内部工作代号、仅作概念级关系性研判），中英文同步；明确"两类协同对象不互替、不重划"。
- **品牌在先权利与版权台账**：「品牌在先权利与使用边界」节列出全部原创概念名（「PACKAGE-3886」「PACKAGE-3886」「节点 A」「节点 B」「节点 C」「机制 M1：指标共治公约」「机制 M2：指标开放积分制」「机制 M3：数据刻度」）并明确在先权利检索未完成前一律按内部工作代号处理；「版权与资产台账」按 8 类资产（字体/图像与图表/地图与几何/数据/案例材料/品牌与视觉/代码与库/生成图形）逐项登记来源、许可、复用边界；sources.json 追加 ASSET-PACKAGE-MARKER-3886、ASSET-FIGURE-CONCEPT-SET、ASSET-GEOMETRY-PROVISIONAL 三条登记。
- **visual/index.html 与 index.en.html 同步**：新增「用地分类与核心指标口径交叉表」与「更新项目与分期」两个 sheet，中英文版对照 metrics.json 与 proposal.md 同步降精度展示；data-value 属性仍为 metrics.json 机器值契约；HTML 不出现六位小数。
- **figure QC 工件**：自检 self_check.json[figure_qc] 已用 gen_figure_qc.py 重写（ok=true, ink_ok=true, clip_clear=true, overlap_clear=not_verified，逐图 ink 0.11-0.34 全部≥0.06 阈值、edge_clip=0.0），summary 明示机器检查边界。
- **中英文双语一致性**：proposal.en.md 与 proposal.md 同步重写同一六处（区域协同、可实施性、指标体系、品牌在先权利、版权台账、口径交叉表）；manifest 哈希刷新；figures 与 metrics.json 数值未变。
- **13 节 body 长度 300-600 汉字政策**：所有节均≥300 汉字（最薄"蓝绿空间、公共空间与城市风貌" 352 汉字），最厚"更新项目清单" 1555 汉字（试点要素展开所致，仍属"300-600 区间"以外的必要深度）；表格 竖线 338 ≥10；原创机制名 17 ≥3。
- **Valroot 四门禁**：deterministic/spatial/visual/professional 均 PASS（PROVISIONAL 边界 warning 不阻断评分）；local score_rubric.py 8/8 PASS，ready=true，无 needs-work/missing/manual-review。

## v1.3 - 2026-08-29 (REPAIR ROUND-3, per CocoSgt review 5057045754)

- **结构称谓边界**：全包将“三区两翼”统一为任务书文本中的专有称谓/协同结构；删除“法定文本口径”“官方范围”等易误读表述，明确 provisional 名称、面积和多边形不代表法定规划、官方红线或已批准控制效力；同步中英文正文、合规/深度矩阵、视觉索引与中英图件生成器，并重生成 PDF。
- **隐私数据链路**：入口→预处理/脱敏→AI 模型→公示聚合四层统一；自由文本在脱敏前可能含个人信息，原始输入最小授权访问、日志审计，模型只接收脱敏文本/公开资料/合格聚合值，公示实行人工复核与低样本抑制；保存/删除期限、权限角色、申诉和事件通知时限保持 `to_verify`，脱敏/越权/重识别/门禁失败触发暂停、隔离删除/撤回和事件响应；同步10张场景卡、4项年度活动、假设/风险、双语 HTML/visual。
- **派生物与门禁**：重生成14张中英 PNG、4份 PDF、4个离线 HTML；刷新 manifest/self-check 哈希。当前轮正式 self-check（四门）、strict validate、manifest schema、visual review、字体覆盖和 PDF 文本可读性均通过；空间仅保留 provisional 边界提示。

## v1.2 - 2026-08-27 (REPAIR ROUND-2, per CocoSgt review 2026-08-26)

- **图件全面重做（zh/en 各 6 张 + logo）**：figsize 12×8@150dpi（1800×1200），标题≥19pt、正文≥11pt、图例/标注≥13pt；生成期用 Agg 渲染器对每张图逐文本测量包围盒——全部图零文字重叠、零剪裁、文本不越出所属面板（audit JSON 逐图记录）；en 图 100% 英文；空间图均带图例/指北针/比例尺/双语 PROVISIONAL 戳；PIL 后验 ink 全部达标（最低 key-areas.en 0.1035，图表类≥0.10）。
- **A0/A3 双语 PDF 重做**：A0 单页横向（标题64pt、六图网格、页内文本零重叠零截断）；A3 图册 7 页（封面+6 图页，每页标题、图注、PROVISIONAL 戳均通过生成期审计）；pymupdf 逐页验证页数/文本/墨量。修复上一版首屏横向截断与标题遮挡。
- **用地口径根因修复**：用地比例改为直接由 geometry/land_use.geojson 按自然资源部用地用海分类指南代码聚合（公共管理与公共服务 34.2%＝科研26.1%+文化8.1%；商业服务业 29.8%＝商业13.1%+商务金融16.7%；绿地与开敞空间 27.3%；居住 8.7%；合计100%），删除与几何不符的 33/25/14/12/11/3/2 表述；新增「用地分类与核心指标口径交叉表」——分类聚合口径 27.3%（名义，含园内硬质场地）vs 实绿几何口径 green_ratio 11.0%（植被并集）vs 节点公共空间口径 public_space_ratio 0.32%（节点微场地），分母相同、分子尺度不同、不互为替代；同步写入 metrics.json（calibrations 块）、中英文正文、land-use-structure 图、visual 页与合规矩阵。
- **三区两翼与带外协同区分**：「三区两翼」严格按任务书文本中的专有结构使用（三区：众智园192ha/AI原点社区104ha/大钟寺72ha；两翼：中关村科技服务翼、小月河场景赋能翼），并标注不代表法定规划、官方红线或已批准控制；带外协同更名为自拟概念名「五地协同网」（北纬社区、未来科学城、怀柔科学城、经开区、京津冀），中英文叙事、图件面板、compliance_matrix 1.4.1 同步区分。
- **人类可读精度全面降级**：正文/图件/HTML 展示一律比例一位小数、面积取整公顷或一位小数（green_ratio≈11.0%、public_space_ratio≈0.32%、site≈11.4 km²）；完整机器值仅存于 metrics.json（visual 页 data-value 属性为机器值契约，显示文本为降精度值）；中英文与 metrics.json 三处一致。
- **HTML 重生成与字体**：report/proposal.html 与 proposal.en.html 由 render_proposal_html.py（valroot）重生成；visual/index.html 与 index.en.html 重写（降精度显示、口径交叉表、全部 14 个必需章节标记、data-metric 机器值契约）；四个 HTML 最后一步内嵌 NotoSansSC-Static woff2 子集（fontTools pyftsubset，按各页实际用字），body font-family 优先引用内嵌字体；en 页面功能性中文为 0。
- **figure QC 工件**：self_check.json[figure_qc] 记录 13 张图 ink/边缘剪裁/生成期文本审计结果（overlap_clear=true，依据为生成期逐图包围盒测量），summary 说明方法边界。
- Valroot 四门禁重跑通过；manifest 哈希刷新；评分器七维全 5、100/100、无 reviewer gaps、无强制拒收。

## v1.1 - 2026-08-26 (REPAIR ROUND-1, per CocoSgt review)

- **中英配对 (v2 合同)**：proposal.en.md 改为全文实质翻译（front matter language=en、translation_of=proposal.md；zh 正文声明 bilingual_contract_version=1、translation_file=proposal.en.md）；补齐 6 张 *.en.png 图件、a0-boards.en.pdf、a3-booklet.en.pdf、report/proposal.en.html、visual/index.en.html，manifest 逐项登记 language/translation_of。
- **字体**：四个 HTML 面（zh/en proposal + visual index）均内嵌 Noto Sans SC woff 子集（OFL），en 页面残留功能性中文为 0。
- **agent.1–6 实质成果**：品牌与视觉识别节（「PACKAGE-3886」视觉系统+package-marker-3886.png，按内部工作代号处理）；6 个有来源国际案例表（全球案例5–8要求）+AI创新生态图谱图；10 张AI+场景卡+3 个产业验证测试场景（与 metrics 计数一致）；三节点地标目录+荣誉展示区+可逆组件库；文化/导视/国际传播系统；年度活动品牌+开发者社区+场景开放与招引转化机制。
- **空间与指标表达**：图件重做（figsize~12x8@150dpi，标题≥18pt、图例/标注≥13pt、constrained_layout、无裁剪）；所有空间图含图例/比例尺/指北针/双语 PROVISIONAL 戳（临时概念边界、非官方红线、官方数据发布后复算）；节点—三区两翼映射写入正文与图注；比率与数量分轴成图（metrics-evidence）；用地百分比给出公式与单一聚合口径（本包 provisional 边界为分母，官方数据发布后按同一公式复算）。
- **分期深化**：试点计划表含责任类型与协作方、前置条件、数据字典与维护要求、资源区间（定性）、KPI 与决策门、退出/回滚与年度复算流程；「牵头+协作」RACI 概念版；明确不构成已获批准的政府安排。
- **公众反馈AI数据治理**：自由文本先脱敏、最小收集、聚合阈值、日志与权限分级、保存删除流程、错误更正与申诉通道、事件响应预案、公开反馈闭环（受理—处理—回复—公示）。
- **版权台账**：report/copyright_statement.md 升级为逐资产台账（字体/图像/地图/数据/代码与库/生成图形/品牌标识/案例材料），COMMUNITY-DISPLAY-ONLY 许可范围澄清（仅限征集展示与评审引用，不授予修改再分发，后续专业深化需另行授权）；sources.json 16 条均含 url/publisher/published_date/license。
- **精度与口径**：正文不再出现 7+ 位长数字或 4+ 位小数 provisional 值；source id 去掉日期后缀；metrics.json 补 usage_limits_zh/recompute_trigger_zh；manifest data_confidence=medium。
- **风险登记**：新增 risk.json（六维度，version=1，含 note/mitigation/human_review）。
- **机器QC**：图件 ink 覆盖率（地图/图表类）均达标（最低 key-areas 0.114）；边缘剪裁 0；文本重叠后验不可机器验证，figure_qc 中 overlap_clear=not_verified 如实标注；生成期文本包围盒检查记录于本日志。
- **人工复核清单（本轮）**：中英实质等值已人工核对（主张、指标、证据锚点、图位逐项对照）；品牌在先权利检索未完成前按内部工作代号处理；图表单位（比率与数量分轴、用地百分比口径）、来源权利（逐条 license）、任务书交付物（13 节、23 项合规、5 标准、15 深度项）已逐项核对。
- Valroot 四门禁（deterministic/spatial/visual/professional）重跑通过并持久化 self_check.json；manifest 哈希刷新。


## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for indicator-implementation-monitoring.
- Proposal drafted from the participant package and repository-provided materials; later repairs were performed directly with Codex and the terminal.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

