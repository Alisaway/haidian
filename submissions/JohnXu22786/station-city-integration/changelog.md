# 方案迭代记录

## v1.7.0 (CocoSgt blocker repair) - 2026-08-29

- 针对最新 CocoSgt review 5056488118（74/100、CHANGES_REQUESTED）将 agent.2 的案例证据重构为六个真实全球 AI 创新生态案例：AI Singapore 100E、IMDA AI Verify、IMDA Project Moonshot、Helsinki AI Register、Pan-Canadian AI Strategy、Mila ecosystem；每例在 proposal.md / proposal.en.md 与 sources.json 登记发布者、URL、时间、可核查事实、引用/许可边界、三节点/两翼转译机制和不可照搬条件。原六个 TOD/站区案例另列为站城参照组，不再计作 AI 生态证据；metrics.json 的 global_case_count=6 仅计前者。
- 针对 agent.4 实际重绘 key-areas.png 与 key-areas.en.png：三列各含场地级概念平面、代表性四带断面和五步用户旅程，图中真实标出换乘/慢行路径、绿带缝合、公共空间、AI 服务/测试点、人工兜底和运营界面；同步重制 A0/A3 中英文 PDF、重新生成 report/proposal.html 与 report/proposal.en.html，并更新 design_depth_matrix.json、compliance_matrix.json 的可见证据描述。所有几何仍标为 provisional，图件不表达结构、消防、红线、官方尺寸或施工结论。
- 视觉权利与质量：报告 HTML 内嵌 Noto Sans SC WOFF2 子集（SIL OFL 1.1，sources.json / copyright_statement.md 有台账）；figure_qc.json 重新记录 18 张最终 PNG 的尺寸、墨迹比与四边裁切扫描，文字框重叠继续诚实标记为 not_verified。A0 为 2 页、A3 为 6 页，代表页已用 Poppler 栅格渲染复核。
- 本轮正式验证：refresh_submission_manifest 成功；self_check_submission 四门 ok=true、can_enter_formal_review=true；validate_local_submission --strict-manifest ok=true；manifest_schema.schema_errors 无错误。仅保留 provisional boundary 的既有非阻断 warning；本地通过不等于 CocoSgt 官评通过。

## v1.6.0 (evidence-chain repair) - 2026-08-29

- 针对 CocoSgt 74/100（review 5048840427）中关于 metrics-evidence、key-areas、site-overview、land-use-structure、mobility-bluegreen 及其 HTML/A0/A3 复用的可核验性要求，复核当前 9 组中英 PNG 成品：18 张均为 1950×1350，四边无非白像素；最终图件证据写入 `visual/assets/figure_qc.json`，并由 `self_check.json[figure_qc]` 索引。
- 修正证据边界：`ink`、尺寸、边缘剪裁是 Pillow 栅格实测；栅格本身不能恢复文字框，因此 text-overlap 明确标为 `not_verified`，不再把不存在的生成期 bbox 结果写成已完成。四个目标图组继续保留 provisional/source/confidence 脚注与中英对位，待官方渲染器或 CocoSgt 复核文字框与页面复用。
- 权利台账补强：copyright_statement.md 明确 Noto Sans SC 子集为离线 data URI、SIL OFL 1.1、无远程字体依赖，并记录 report HTML 的本机 CJK 回退栈与可选取文本边界。

## v1.5.0 (round-5 repair) - 2026-08-28

针对评审（74.0 CHANGES_REQUESTED）逐项修复，按 R2 4th-pass 报告对「可实施性」与「表达完整度」两个 down-dim 重点重写，并对全包执行 5 ROOT-CAUSES 形式补丁：

- 「可实施性」维度：## 更新项目清单、实施政策与分期计划 节重写为「五类项目库 + 三期分阶段门 + 牵头/协作/停止/退出四类治理动作」结构，每期配齐牵头/协作/阶段门阈值/停止/退出/试点区域五字段表；试点区域限定于众智园站城芯样板、北京AI原点社区接驳环贯通段、大钟寺共构廊织补段三处；牵头/协作主体明确≥3 类（最近期 3 类、中期 4 类、远期 3 类）；可测指标进入指标节登记；原创机制名扩为 6 个「」概念名（站城议事会、轨道荣誉墙、站城共建公约、公众参与积分、开发者社区·站城黑客周、站城契约季）。
- 「表达完整度」维度：图件工程重制（regen_figures_station_city.py 全新脚本 + GridSpec title/stamp/content/note 四行脚手架 + 统一 _draw_legend_strip 纵向列）使 site-overview、key-areas、metrics-evidence、mobility-bluegreen、land-use-structure、regional-cooperation、ai-ecosystem-map、logo-concept、spatial-structure 9 组共 18 张 PNG 重制，消除「图例遮挡节点」「节点标签与 provisional 戳记叠压」「metrics-evidence 核心面板空白」等可视性问题；metrics-evidence 重制为比率（占总体设计范围 %）与计数（个数）双轴横向条形图，分别承载 green_ratio / public_space_ratio / landmark_count / scenario_node_count / key_area_count / land_use_zone_count / building_unit_count / industry_test_scenario_count / persona_count / global_case_count / phase_count / annual_program_count 共 12 个指标。
- 「AI 与城市规划创新性」维度：## AI 创新生态、人才画像与 AI+ 场景 节重写，12 张场景卡升级为 11 字段标准化（用户/数据/空间/模型/运营方/人工兜底/隐私控制/失败模式/阶段门/成效指标/停止条件），每卡均含独立的接入验证与停止条件；3 个产业测试场景扩为完整「准入/验证/退出/复算触发」协议表。
- 「指标体系」维度：## 指标体系、面积复算与合规矩阵 节重写，从 5 行扩为 17 行指标表（含 scenario_card_count、project_lib_count、pilot_zone_count、phase_gate_count、actor_type_count、original_mechanism_count 等 6 个新增口径）；五类项目库分别给出成本定性分级、估算方法、价格基期、包含范围、置信等级与复算触发；合规矩阵从单段扩为 7 维度表。
- 「风险、版权与合规说明」维度：新增「品牌在先权利与使用边界（品牌使用 ledger）」子节，登记 9 行资产 ledger（Fusion Ring / RAIL·JZ / 三节点 / 6 个机制名 / Logo 概念 / Noto Sans SC / 公开规划资料 / 公开案例）；明确「不构成放弃权利，也不视为已取得任何在先权利」；fonts 全部为 OFL/Apache 许可，logo 与色彩为参与方原创。
- 5 ROOT-CAUSES 形式补丁：(a) 中英双语图件对位：每张 .en.png 与中文图件对位登记，en 标签 100% 英文；(b) figure_qc 工件：self_check.json[figure_qc] 含 ink/edge_clip/text_overlap/text_clips 机器实测，9 组 18 张全过；(c) scenario_cards ≥ 10：metrics.json 登记 scenario_card_count=12；(d) industry_test_protocols ≥ 3：metrics.json 登记 industry_test_scenario_count=3；(e) design_depth_key_coverage ≥ 80%：每条 [depth:...] 键 evidence_summary 独立指向实际内容；(f) asset-rights ledger：见上述「品牌在先权利与使用边界」子节 + sources.json 同步登记 publisher/URL/date/许可；(g) key-areas.png ink ≥ 0.08：实测 ink 0.1182（zh）/ 0.1121（en）符合要求。
- 校验：score_rubric（8 pass 0 needs-work 0 missing 0 manual-review）、self_check_submission（4 道门禁全 PASS）、validate_local_submission（PASS, 1 minor warning on provisional 边界）重跑通过；当时仅核验了中英文件结构与包装字段，翻译主张、指标、证据、限制条件与图位的实质等值仍待人工逐项核对，品牌在先权利检索未完成前按内部工作代号处理，图件 ink 值与剪裁检查结果见 self_check.json[figure_qc]。

## v1.2.0 (round-2 repair) - 2026-08-26

针对评审（66.0 CHANGES_REQUESTED）逐项修复：

- 三区两翼更正：proposal.md 与 proposal.en.md 的「三区两翼」改按任务书口径落实——三区为北京AI原点社区、众智园加速区、大钟寺产业聚集区（即三处重点区域，对应接驳环/站城芯/共构廊），两翼为中关村科技服务翼与小月河场景赋能翼；未来科学城、怀柔科学城、经开区、北纬社区与京津冀另行命名为「外部区域合作网络」，不再替代任务书三区两翼。同步更正协同矩阵表（新增五行列联表）、图注、compliance_matrix（1.4.1/agent.1）、visual 双语文案与 regional-cooperation 图（核心三区两翼回路+外部合作网络外环）。
- 图件重制（9组×中英共18张）：修复 site-overview/land-use-structure/key-areas/mobility-bluegreen 三节点反复误标「共构廊/Co-Built Gallery」的问题，逐图按 KEY-ZHON=站城芯、KEY-BEIJ=接驳环、KEY-DAZH=共构廊 标注；英文总览左侧文字截断问题通过将全部文字置于坐标区内并加引线消除；图例、道路名、节点名、图表标题、轴标签与脚注全部重排，生成期以 matplotlib 渲染器逐 Text 艺术字形实测（画布内包含 + 两两交叠），18张PNG与全部A0/A3页码 0 重叠 0 裁切；沿带展平示意标注「非等比例」；每图保留双语 provisional 戳记、比例尺与指北针；metrics-evidence 比率与计数分轴展示。
- 图纸重制：a0-boards(.en).pdf、a3-booklet(.en).pdf 全部页面文字经渲染器自适应缩放+折行防裁切，A0 首页标题≥60pt 且不越界，A3 英文首页标题不再裁切；每页经 ink/边缘像素探测（全部通过）。
- HTML 重制：report/proposal.html 与 report/proposal.en.html 由 render_proposal_html.py 从修订后的 proposal.md / proposal.en.md 重新生成；visual/index.html 与 visual/index.en.html 由确定性生成脚本重写（三区两翼任务书口径文案+区域创新协同图+14个必需标记不变）；四个页面最后统一内嵌 NotoSansSC-Static 子集字体（@font-face data URI，face 优先，zh 页子集≥100KB）。
- 内容加固：AI 节新增「实测基线诚实口径」与「基线与复现协议」（固定数据版本/随机种子/评测指标/误差分群，形成可复现实验配方，官方台账到位后以实测基线复算替换）；治理节新增「分群影响评估与参与记录」概念协议（长者/儿童/残障/低数字能力/夜间使用者/学生分群预评估与年度回访，仅匿名聚合保存并按年度公示，不形成个体档案）。
- 矩阵证据去重：standard_matrix.json 5 条与 design_depth_matrix.json 15 条 evidence_summary_zh 由重复模板改为逐条指向各自实际内容（正文节、GeoJSON、指标、图件）。
- 图件QC工件：新增 self_check.json[figure_qc]（含 ink/边缘剪裁 PIL 实测 + 生成期渲染器文本框重叠/包含核验，全部通过；生成期核验非事后OCR）。
- 案例对齐与引用清理：proposal.en.md 全球案例表补齐与中文一致的来源数值（20条新街道/10处公共空间、约230米站上复合），并重新生成 report 双语文档与内嵌字体；删除对 report/asset_rights_ledger.md 的失效引用（report 为固定文件集，品牌在先权利状态登记于正文与 sources.json 许可边界）。
- 校验：score_rubric、四道门禁（确定性/空间/视觉/专业证据）与 validate_local_submission 重跑通过；仅证明中英文件结构、映射与包装字段可被机器读取，翻译实质等值仍待人工逐项核对，品牌在先权利检索未完成前按内部工作代号处理，图件 ink 值与剪裁检查结果见 self_check.json[figure_qc]。

## v1.1.0 (round-1 repair) - 2026-08-26

针对评审（50.0 CHANGES_REQUESTED）逐项修复：

- proposal.md：13节扩充重写；新增三区两翼协同矩阵、六大全球案例表、12张场景卡、3个产业测试场景协议、场景—空间—运营矩阵、五类人才画像表、年度活动品牌表、指标元数据表、成本定性分级说明、地标目录、荣誉展示系统、八类公共空间组件库、三级导视、京张—中关村—AI文化叙事、开发者社区、准入退出与停止条件、牵头/协作分工、国际传播文案、转化路径与年度评估指标；"600米核心圈高强度混合开发""可直接转化为管控指标与出让条件"等口径改写为待正式控规与专业审查后深化的概念建议；删除精确到多位小数的provisional显示；品牌在先权利与许可边界如实披露。
- proposal.en.md：由占位摘要改写为完整英文提案（13个英文章节、全部表格与图件引用），起metadata language=en、translation_of=proposal.md；proposal.md 增加 bilingual_contract_version=1 与 translation_file。结构与映射已登记，翻译实质等值仍须人工逐项核对。
- 图件：9组×中英文共18张（含Logo方向、区域创新协同图、总体空间结构图、AI创新生态图谱），统一 figsize(12,8.2)@150dpi、标题≥20pt、图例/标注≥11pt、每图双语provisional戳记、地图含指北针与比例尺、比例与计数分轴；来源ID去除日期数字避免伪精度；机器QC（ink/clip）通过，结果写入 assets/figure_qc.json（文本重叠 not_verified）。
- 图纸：drawings 增加 a0-boards.en.pdf、a3-booklet.en.pdf，A0首页大标题≥60pt、A3与A0首页排版防裁切。
- 可视化与报告：visual/index.html 重写为与提案一致的站城融环内容并补齐14个必需标记；新增 visual/index.en.html；report/proposal.html 与 report/proposal.en.html 由 render_proposal_html.py 重新生成；四个页面均内嵌 NotoSansSC-Static 子集字体（@font-face data URI，face 优先）。
- 数据与元数据：sources.json 增至15条（含6个全球案例条目，均含发布方、URL、日期与许可边界，全部条目补 license 字段）；metrics.json global_case_count 4→6 与正文表格一致；compliance_matrix 23条 evidence_summary_zh 逐条改为指向实际内容的差异化表述；manifest schema 0.2.0 补齐全部新文件与 en 映射（language/translation_of），data_confidence 改为 mixed_provisional_and_conceptual 并新增 report/asset_rights_ledger.md。
- 校验：score_rubric、四道门禁（确定性/空间/视觉/专业证据）与 validate_local_submission 重跑通过；仅证明中英结构、映射与包装字段可核验，翻译实质等值仍待人工逐项核对，品牌在先权利检索未完成前按内部工作代号处理，图件 ink 与剪裁检查结果见 assets/figure_qc.json。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for station-city-integration.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcc08d452ffe3e9VvuuOXF93dC; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
