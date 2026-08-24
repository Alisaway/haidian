# 方案迭代记录

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