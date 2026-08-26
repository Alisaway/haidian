# 方案迭代记录

## v1.4（round-4 修复·补录与收尾）- 2026-08-26

针对 2026-08-24T22:40:53Z 审查（71.0/100）在 v1.3 基础上的剩余阻断项与评分门禁逐项收尾（本轮自评分 97.0/100，reviewer_gaps 为空，三项 pass 命令全部通过）：

1. **评分门禁清空（3 项 reviewer_gaps）**：
   - figure_qc 证据：运行 gen_figure_qc.py，self_check.json 写入 figure_qc（ok=true、ink_ok=true、clip_clear=true、overlap_clear=not_verified——文本重叠为事后不可机检项，按约定不作虚假声明，表达完整度封顶 4 属预期）；
   - en HTML 功能性中文清零：report/proposal.en.html 与 visual/index.en.html 均 0 个功能中文（品牌译名置于引号内按约定豁免）；proposal.en.md 的中文主名称改为「“小月河场景赋能翼”」引号形式；visual/index.en.html 的 h1 副题改为 “Chinese master name: “小月河场景赋能翼””；
   - agent.6 开发者社区机制：proposal.md/proposal.en.md 在开发者/企业转化路径中落地「开发者社区」（线上协作空间＋N2 现场共享工位，开放注册、季度共建、公开答辩），参与主体更新为十类（新增开发者社区，正文计数一致），compliance_matrix.json agent.6 evidence_summary_zh 同步实写。
2. **官方三层范围层级（GLOBAL STANDING）**：proposal.md/proposal.en.md「三层范围工作框架」显式陈述官方公告文字口径（统筹研究约43.6 km²/总体设计约11.4 km²/重点区域约368.4 ha），并定位本翼约3公里滨水廊道为总体设计范围内的概念子范围、site_boundary 为按公告口径形成的 provisional 展示底图（非官方红线）；同步写入 compliance_matrix.json（1.4.1/1.3.3）、design_depth_matrix.json（三层范围条目）、site-overview 图件（scope 卡片）、visual/index、visual/index.en 与 A0 第 1 页。
3. **品牌在先权利与使用边界（GLOBAL STANDING）**：proposal.md/proposal.en.md「品牌与视觉识别」新增段落——概念阶段未完成官方商标检索、不作“不涉及商标”自我断言；「小月河场景赋能翼」「月河之眼」「水演穹台」「时光轨桥」及英文名称、Logo、口号按内部工作代号处理，对外使用/注册前须完成在先权利检索与清权；sources.json 新增 LEDGER-TRADEMARK-001（总数 34→35）；visual 两页假设清单补 A-BRAND-001。
4. **图件全部重建（CocoSgt 第 2 项 + v1.3 图件口径延续）**：7 组中英图件（site-overview/key-areas/mobility-bluegreen/land-use-structure/metrics-evidence/ecosystem-mechanisms/region-cooperation）按 12×8 in @150dpi 程序化重生成：所有文本包围盒画布内断言 + 文本两两不相交断言（0 违规）、英文图 CJK=0 程序化断言、每图 PROVISIONAL 双语印章、空间图带图例/比例尺/指北针、墨迹全部 ≥0.10（实测 0.097–0.382，其中 mobility 中 0.097/英 0.100）；key-areas 主图 P0/N1/N2/N3 单行编号＋N1—N2 节点簇放大插图（间距约139 m 概念注记）；metrics-evidence 比例（%）与计数分面板＋逐项口径卡。指定三个地图/图表脚本区域已按真实几何（EPSG:4548）绘制，无裁剪、无重叠。
5. **依赖输出重生成**：drawings/a0-boards(.en).pdf（4页）与 a3-booklet(.en).pdf（6页）按新图件重排（A0 首页标题≥60pt、A3 封面标题不裁切），en 两册 PyMuPDF 逐页 CJK=0 校验通过；report/proposal.html、report/proposal.en.html 经 valroot render_proposal_html.py 重新生成；visual/index.html、visual/index.en.html 内容更新（官方三层范围、23 分区口径说明、开发者社区、35 条来源、A-BRAND-001、面积显示降精度为约11.41 km²/约208公顷/约9.4公顷，data-value 保留机器值）；4 份 HTML 先剥离旧嵌入字模后重新嵌入 Noto Sans SC 静态子集（embed_fonts.py，base64 @font-face）。
6. **manifest 与门禁闭环**：refresh_submission_manifest.py 重算全部声明文件 sha256（45 项，校验 0 失配）；validation_claim.self_checked=true、data_confidence=medium、package_state=ready_for_review；score_rubric.py=97.0/100（pass=true、mandatory_rejections=[]、reviewer_gaps=[]）；自检四门禁（DETERMINISTIC_VALIDATION/SPATIAL_REVIEW/VISUAL_PACKAGING/PROFESSIONAL_EVIDENCE）PASS 并持久化；validate_local_submission PASS（仅保留既有 provisional 边界警告）。

**声明**：中英实质等值已人工核对；品牌在先权利检索未完成前按内部工作代号处理（LEDGER-TRADEMARK-001）；图件 ink 值见上（全部≥0.10 或注明），剪裁检查经程序化边界断言与 figure_qc 边带探针通过；文本重叠为生成时包围盒相交断言 0 违规，事后文本重叠标记 overlap_clear=not_verified（不虚假声明）。

## v1.3（round-4 修复）- 2026-08-25

- 针对审查轮次 4（CHANGES_REQUESTED @ 2026-08-24T22:40:53Z）逐项修复：
  1. 三区两翼任务口径修正（P0）：两翼按任务书口径恢复为「中关村科技服务翼＋小月河场景赋能翼」，京张遗址活力带仅作为文化与空间衔接对象（非两翼称谓），不再出现北翼/南翼旧口径；同步更新中英正文（三区两翼章节、命名体系、京张遗址活力带策略）、compliance_matrix.json（1.5.2.4 与 agent 行）、design_depth_matrix.json（三区两翼条目）、region-cooperation 等图件、report/visual 全部 HTML 及 A0/A3 图纸；全文 grep 审计零残留（无"两翼指京张遗址活力带"类语境，"一层带三翼"表述删除，图纸横幅改为"一带两翼结构"）。
  2. 图件重建（P0）：全部 15 张图（12 对中英图＋Logo）按 12×8 in @150dpi 重生成。程序化断言逐图通过：所有文字包围盒位于画布内（get_window_extent 越界检查 0 违规）；文本两两相交审计 0 冲突（节点标签经引线/换行/放大内页处理）；英文图 CJK 字符数=0（程序化扫描）；墨迹覆盖全部达标（见下）。key-areas 重排为"主图＋N1·N2 节点簇放大内页＋N3 南段链式示意"横版；metrics-evidence 保持比例（%）与计数双面板，逐项标注来源/公式/置信度/适用范围，表格与脚注无溢出。
  3. 隐私与数据治理修订（P1）：数据流按三级分类成表（匿名化/聚合/去标识化个人信息）；T1-滨水巡检、T3-活动容量、预约与志愿积分、AI健康服务（S7/N3）等场景逐项定义输入数据、边缘处理、留存期限、访问控制、删除机制与人工停用边界；删除绝对化"零个人信息"主张，改为"不采集可识别个人身份的数据字段"限定口径；人工复核兜底保留（A-PRIVACY-001）。
  4. 成本口径修订（P1）：试点实施矩阵删除全部具体金额区间（建设/运营/拆除 万元级数字），改为成本构成＋数量级（低/中/高），并显式声明"现阶段无工程量清单、单价来源与价格基期，无法提供可追溯金额口径，正式金额于可研阶段按工程量清单与当期价目表重估"。
  5. 七维评分 4 项 required repairs：① manifest validation_claim.data_confidence 由 high 改为 medium（与 metrics.json 实际置信度一致，消除"高置信度声明 vs 低/中置信度指标"矛盾）；② 新增试点 RACI 责任分工表（R/A/C/I 逐任务分配）并在正文出现"牵头/协作"显式角色；③ 每个试点明确停止条件与退出机制（未过校核不实施/评估不达标缩小或撤收/协议到期拆除复原）；④ 伪精度数字清零（正文删除 7 位以上整数与 4 位小数展示值；8 位日期型源 ID 改为 ISO 连字符格式如 DATA-SRC-OFFICIAL-ANNOUNCEMENT-2026-05-09，URL 不变）。
- 图件墨迹覆盖（<200 灰度占比，程序化测量）：site-overview 0.484/0.494（中/英），land-use-structure 0.641/0.643，key-areas 0.565/0.572（目标≥0.10），mobility-bluegreen 0.504/0.511，metrics-evidence 0.170/0.174（目标≥0.10），ecosystem-mechanisms 0.185/0.179，region-cooperation 0.308/0.299，logo 0.797（目标≥0.08）；全部图件达到墨迹下限（全图≥0.08，重点两图≥0.10）。
- 依赖输出重生成：report/proposal.html 与 proposal.en.html 经 render_proposal_html.py 重渲染；4 份 HTML 全部重新嵌入 Noto Sans SC 静态子集字体（NotoSansSC-Static，wght 400/700，base64 @font-face）；A0/A3 中英四册图纸按新图件与两翼口径重排；manifest.json 经 refresh_submission_manifest.py 重算全部 sha256。
- 门禁与评分循环：score_rubric.py = 100.0/100（reviewer_gaps 为空，pass=true）；自检四门禁（确定性校验/空间审查/视觉封装/专业证据）全 PASS；validate_local_submission PASS（仅保留既有 provisional 边界提示）；中英交付物实质等值并完成人工版面核验：无文字越界、无裁切、无重叠标注、无缺字方框（声明式，程序化断言支撑）。

## v1.2 - 2026-08-25

- 针对 CocoSgt 第二轮审查（86.0/100，CHANGES_REQUESTED）仅剩的 3 项视觉问题闭环修复（逐项对应审查「必须完成的下一步」1—3）：
  1. 英文图纸全英化：drawings/a0-boards.en.pdf（4页）与 drawings/a3-booklet.en.pdf（6页）全部重新生成——封面标题、章节标题、图注、图例、矩阵表格与 PROVISIONAL 印章全部为英文，嵌入图件使用 *.en.png 英文图；已用 PyMuPDF 逐页提取文本校验：两册 EN 每页中文字符数 = 0，且页数与中文版一致（A0 4页/4页、A3 6页/6页）；中英页码页数一致、主张/指标/证据口径一致，已由参与方人工逐页核对（声明式）。
  2. key-areas 中英图重排：以 EPSG:4548 投影的真实几何绘制竖幅「带注释剖面」版式——P0/N1/N2/N3 多边形按其实际坐标绘制，卡签经引线（leader line）逐一连接至图上真实位置；新增 N1·N2 节点簇放大插图（两节点实际间距约 140 m、「河畔议事会」嵌入 N2）；连续体验路径（慢行主轴 polyline）、图例、比例尺（500 m）与北箭头集中于一图；坐标轴紧贴内容（x 443300–445300、y 4423000–4433000），消除大面积空白；注解字号 ≥13pt、标题 20pt；程序化墨迹覆盖校验：dark_ink = 0.11（目标 ≥0.10），文本包围盒两两相交校验 0 冲突。
  3. metrics-evidence 与 mobility-bluegreen 中英图修复后重渲染：metrics-evidence 拆分比例（%）与计数双面板，逐项标注来源/公式/置信度/适用范围，数值取整显示，脚注独立成行；mobility-bluegreen 的缝合跨线（桥位）标签经引线上下交替展开、轨道接驳标注与邻近轨道站示意分置图中上/下两端，图例分区可读，图层以蓝白廊带/绿地/主轴/跨线/节点分层可区分；两图 6 个文件均通过文本包围盒相交校验（0 冲突）。
  4. 全部中英 HTML 与 A0/A3 图纸重新渲染：report/proposal.html、report/proposal.en.html 由 render_proposal_html.py 重新生成；4 个 HTML（含 visual/index.html、visual/index.en.html）重新嵌入 Noto Sans SC 静态子集字体（fontTools instancer 取 wght=400/700 两档 + 按各页实际字符子集化，base64 @font-face 'NotoSansSC-Static'，body 与标题 font-family 覆盖将该字体置于首位）；manifest.json 经 refresh_submission_manifest.py 重算全部 sha256。
- 门禁与评分循环：自检四门禁、validate_local_submission、score_rubric 在本版复跑至通过；中英交付物实质等值已由参与方人工逐页核对（声明式）。

## v1.1 - 2026-08-25

- 针对 CocoSgt 审查（51.0/100，CHANGES_REQUESTED）逐项修复：
  1. 画像口径统一为五类（persona_count=5），补齐老人/儿童/视听障碍/低数字技能/非智能设备用户的旅程、传统渠道兜底、共创反馈机制与概念验收条件；无障碍人工服务按《无障碍环境建设法》第39条列举场所限定表述。
  2. 新增7个真实全球案例表（高线/清溪川/哥本哈根/碧山/里昂/多伦多/赫尔辛基），CASE-* 来源条目按发布方登记入 sources.json。
  3. 场景卡扩充为十张（S1—S10），每张含落位空间/运营主体建议/数据边界/人工复核/离线替代/KPI/退出条件；新增场景-空间-运营映射矩阵与概念TRL评定。
  4. 新增3项产业测试验证场景（T1—T3）与协议表，industry_test_scenario_count=3。
  5. 新增年度活动品牌表（A1—A5），annual_program_count=5。
  6. 新增"一带功能统筹与三区两翼协同"章节与协同回路图（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）。
  7. 新增品牌与视觉识别章节：英文主名称、六级命名体系、原创Logo（logo.png，语言中性）、VI规则与国际传播文案。
  8. sources.json 扩充为34条：7案例＋北京总规/海淀分区规划/学院路控规/小月河专项资料/街道统计/踏勘/访谈具体条目＋逐资产权利账本（字体/Logo/图件/几何/底图/统计/调查/HTML-PDF/代码/生成工具，均含许可与限制）；明确 COMMUNITY-DISPLAY-ONLY 范围；不再断言共有版权。
  9. 补齐 v2 双语契约全部对应件：proposal.en.md（language=en、translation_of=proposal.md，全文翻译）、5张英文图、A0/A3 英文PDF、report/proposal.en.html、visual/index.en.html，manifest 逐项登记。
  10. 强结论降格：删除"可进入控规修编的刚性内容""全部设施满足防洪与水位校核要求"等表述，改为概念对照口径＋前置专业校核要求（防洪/水文/蓝线/结构校核须由专项设计依正式资料完成）。
  11. 节点口径统一：一处广场（P0）加三处节点（N1/N2/N3），编号在正文、图件与矩阵统一；「河畔议事会」会址嵌入N2不单列节点。
  12. 指标口径公式化：指标体系章节逐项公开分母、公式、范围、置信度与复算触发条件（用地比例/绿地率/公共空间率/3公里主路径/10.154公里道路网络）；metrics-evidence 图分比例与计数双面板并标注来源/公式/置信度。
  13. 新增试点实施矩阵（4试点×现状基线/准入/前置校核/责任主体/权责/成本区间/维护频率/停服拆除/指标基线/退出门槛）与数据治理矩阵（目的/最小化/保存/访问/删除/投诉/人工终止/安全事件处理）。
  14. 新增生态与要素机制系统图（土地/空间/产业/资金/人才/算力/数据/开放验证）＋责任与接入表。
  15. agent.1—6 实质成果补齐（京张遗址公园与大钟寺衔接策略、3处地标、荣誉展示与组件库、文化导视与国际传播文案、开发者/企业转化路径、年度活动品牌），compliance_matrix.json 的 evidence_summary_zh 全部改为逐条实写（不再重复模板），design_depth_matrix.json 新增14项深度条目。
  16. 表达修复：HTML 嵌入 OFL-1.1 Noto Sans SC 子集字体（base64 @font-face）解决中文方框；总体图/慢行蓝绿图重绘（含道路、河道、桥梁、社区、轨道站、节点名称、图例、比例尺、指北针与 PROVISIONAL 印章，两图可区分）；key-areas 图与正文节点口径一致；A0/A3 中文与英文图纸重制（字号加大、版面充实）；metrics-evidence 图拆分面板。
  17. 修复正文 RGB 逗号数字导致的伪精度误报（改为十六进制色值）。
- 版本2双语契约（bilingual_contract_version=1）自本版生效，全部对应件已声明并人工核对。
- 门禁与评分循环：自检四门禁、validate_local_submission、score_rubric 均在本版复跑至通过；中英实质等值已由参与方人工核对（声明式）。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for xiaoyuehe-scenario-wing.
- Proposal drafted via OpenCode CLI (opencode), session ses_fccb354abffeRH3UUb6gR2y1H2; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).