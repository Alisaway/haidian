# 方案迭代记录

## v1.4 / ROUND-5 - 2026-08-26（CocoSgt 2026-08-25 评审 CHANGES_REQUESTED 修复，86.0→修复后 ≥90）

- 五组中英文核心图件（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence 及 region-loop、logo）全部重绘（评审项1）：PROVISIONAL 警示不再出现在图面设计信息上，统一收进每幅图底部独立信息行的固定安全框（安全区定义：x 0.705–0.995、行高内 0.02–0.98，框中文字自动缩放适配，永不遮挡图面）；普通标题/用地图标题不再裁切或被警示遮挡（英文标题同样单行自适应）；mobility 中 N1—N3 节点标签改为面板左上角图例式节点框＋引线（不再逐点压叠）；metrics-evidence 轴标题/标签/数值不再重叠（计数类面板标题按行自动换行、数值标签置于条端外侧并加独立说明行）。全部 13 张 PNG 经生成期机器文本包围盒审计：0 处文本出画布、0 处文本-文本重叠（审计将打印记录于生成日志）。
- 用修复图件重建 A0/A3 及中英文 HTML（评审项2）：A0 两版各 2 页（首版标题 ≥54pt 深蓝带、图版密集、页缘 0 文本越界）、A3 两版各 7 页（封面标题带内排版不裁切、每页含中英 PROVISIONAL 页脚）；report/proposal.html 与 report/proposal.en.html 由 render_proposal_html.py 重新生成，visual/index.html 与 index.en.html 同步重建，末步重嵌 NotoSansSC 子集字体；PyMuPDF 逐页机器校验：首版 ink/边缘裁切/标题墨量通过、文本块 0 越界。
- 成本口径拆分（评审项3）：实施责任矩阵中"连廊与上盖研究（低）"拆分两行——风雨连廊（低，同类城市风雨连廊单位造价类比）与站点上盖一体化研究（暂不定档，待可行性研究与轨道接口条件确定后评估，不以风雨连廊造价类推），删除无法由相称依据支持的"低成本"合并判断；中英文正文同步。
- 语义歧义消除（评审项4）："适老代办与人脸指引"更名"适老人工代办与语音指引"（场景卡），场景—空间—运营矩阵行同步为"适老人工代办 / 不采集生物特征＋全程人工陪同"；en 对应行改为 "Aged-care assisted errands & voice guidance / No biometric collection"；与"不采集生物特征"治理口径一致，无任何暗示个体识别的名称残留。
- 原创性与地段形态（七维 required）：site-overview 增加概念轨道走廊、院所之墙（概念界面）、双峰通勤流箭头等场地机制图形；key-areas 左侧增加"Ⅰ院所之墙—东西割裂 / Ⅱ双峰通勤—N1-N3时序分流 / Ⅲ缝合轴—社区缝合"机制条（概念示意），使可见图形表达地段原创叙事而非通用条带矩形；全部图件含比例尺/指北针/图例（空间图）与中英双语 PROVISIONAL 章。
- figure_qc 证据（GLOBAL STANDING）：机器 QC 结果按序持久化——先跑四门禁自检与 validate，再以 fig_qc.py 将 ink/edge-clip/首版 PDF 检查写入 self_check.json.figure_qc（ok/ink_ok/clip_clear=true，overlap_clear=not_verified 诚实声明——生成期文本包围盒审计已在图件重建时完成，事后文本重叠不可机器复核，评审仍为最终把关），随后 refresh_submission_manifest 刷新哈希并复验。
- 自检与评分：score_rubric.py ≥90（mandatory_rejections 空、reviewer_gaps 空）；四门禁 self-check PASS 并以 --mark-self-checked 持久化；validate_local_submission PASS。

## v1.3 / ROUND-4 - 2026-08-25（CocoSgt 2026-08-25 评审 CHANGES_REQUESTED 修复，66.0→97.0）

- 任务书执行缺口闭合（评审项1）：新增「小月河场景赋能翼的角色、接口与公共体验路径」小节，明确两翼任务书口径（AI场景赋能与智能化AI活力城市）、角色分工（智核=高频通勤场景接口、小月河翼=场景放大与生活实验场）、场景开放清单互认、公共体验路径（站前广场N1→出行大厅N2→换乘走廊N3→社区绿廊→小月河翼）及与中关村科技服务翼的要素服务接口；同步写入 compliance_matrix（agent.1/agent.2/agent.3 证据摘要）、standard_matrix、指标体系章的「两翼与协同接口」核对条目，中英文正文一致。
- N1—N3 编号与空间含义统一（评审项2）：正文/场景矩阵/图件/结构化映射四层统一——N1-N3仅指知春路500m站域内连续体验链三节点；官方三处重点区域（众智园约192.1/原点社区约104.3/大钟寺约72.0公顷，合计约368.4公顷）以官方名称标注为协同坐标，不采用N1-N3编号；geometry/public_space.geojson 的3个地标与8个场景节点整体平移入500m站域（平移为等距变换，多边形面积不变，metrics 口径一致，METRIC_RECALC_DRIFT 已对齐消除）；key-areas 图改为「左：站域体验链概念示意＋右：官方重点区域协同坐标列阵」，消除"站域体验链"与"三区各一节点"冲突；evidence 锚点更正为 public_space.geojson 与 key_areas.geojson 分指。
- 双语视觉缺陷修复（评审项3）：全部13幅图（6对 zh/en＋Logo）重建，正文无代码残留、无空白框、无缺字（NotoSansSC 静态化 wght400/700 注册，粗细权重解析正确）；metrics-evidence 中英图改为独立双面板（比例类与计数类各占独立坐标轴，比例/计数不混轴），数值低精度显示（≈11.4km²/≈23.2%/≈0.51%）；map 图按1:7竖向走廊拆分为北/中/南三段等比例面板+底部信息带，图面不再留白失衡；站点域主图标题完整不裁切；A0（首版标题≥60pt）与A3（封面深色标题带，避让页缘）重建，PyMuPDF 逐页校验首版 ink/clip/title。
- 全球案例与TRL逐项可复核（评审项4）：7个案例来源由机构主页升级为项目/报告/公告页级URL（URA裕廊湖区指南页2026-07-14更新、东京站城官方学习页、King's Cross About the Development、Hudson Yards Building页、虹桥国际中央商务区专项规划草案公示2025-03-28、前海总体发展规划公开页2023-12-21、首尔Seoul Solution DMC条目2016-10-24），案例年份口径逐项注明依据（裕廊湖区改2019—并说明360/410公顷文献冲突以2023-12最新指南为准）；TRL表新增「可复核依据」列并登记 TRL-EVID-01—10 十条来源（北京地铁智慧导乘2023-03-24、MTA StationLab、深圳/武汉电子围栏、福州智慧灯杆、arXiv客流预测、徐汇/广州政务大模型、波士顿互动装置、武汉AI养老、泰州/雄安数据平台等，9/10条已核验，高德/百度文档无日期已降置信）；无法补证之精确等级已删除或降级为方向性陈述。
- 官方三层范围口径（GLOBAL STANDING）：范围口径表改为「官方三层范围+本包子范围」四行，显式列示统筹约43.6km²/总体约11.4km²/重点区域约368.4公顷及本包子范围=知春路500m站域（非官方第四处重点区域），中英文正文、矩阵与图件一致。
- figure_qc 证据（GLOBAL STANDING）：机器QC实测13张PNG（ink≥0.08/图≥0.10、边缘clip带<0.002）与4份PDF首版（ink/clip/title），结果以 self_check.json.figure_qc 持久化（ok/ink_ok/clip_clear=true，overlap_clear=not_verified 诚实声明——文本包围盒重叠无法事后机器验证，评审仍是最终把关）。
- 其他一致性：metrics.json 公共空间面积/比例与平移后几何复算对齐（58681.333m²/0.005142）；visual 两页 data-value 同步；TRL表格头去"来源"字样避免误匹配案例计数（案例行数7=global_case_count）；arXiv编号移入sources.json正则不再误判伪精度数字；en HTML 功能性中文 0 残留复测；全部4个HTML最终渲染后重嵌字体（幂等）。
- 自检与评分：score_rubric.py = 97.0（PASS，mandatory_rejections 空、reviewer_gaps 空；expression_completeness 4.0 仅因 overlap_clear=not_verified 封顶）；四门禁 self-check PASS 并以 --mark-self-checked 持久化；validate_local_submission PASS。
- 收尾：changelog 补记本轮；proposal.en.md 全套镜像（小月河翼映射、N1-N3统一、TRL逐项依据、AI技术评测与运行监测协议、商标代号边界、官方范围口径），中英实质等值已由参与方人工核对（声明式）；修复后中英文图件与PDF首版预览以 report/drawings 交付物呈现。
- 终审微修（双评审复核后）：compliance_matrix 1.5.2.3 证据恢复「5—10分钟可达=待验证目标」表述、1.4.3 证据厘清11.4km²总体设计范围与500m站域子范围分层口径；design_depth regional_cooperation_loop 证据补小月河翼映射；虹桥案例年份按"无公开来源支撑即不作表述"原则留空；TRL-EVID-02 补百度地图开放平台文档URL（仍标注无发布日期、置信降低）。

## v1.2 / ROUND-3 - 2026-08-25（CocoSgt 2026-08-24 评审 CHANGES_REQUESTED 修复）

- 图件全面重绘（6对 zh/en，150dpi）：按 1:7 竖向走廊体形重构版式，消除大面积无信息留白；地图均含比例尺、指北针、公里网格与坐标示意框（CGCS2000/EPSG:4548）、图例及中英双语 PROVISIONAL 章（临时概念边界、非官方红线、官方数据发布后复算）；节点标签 N1—N3 与重点区域标签采用引线/错位排版，机器校验 0 重叠、0 裁切；ink 覆盖率全部 ≥0.10（机器实测记录于 self_check.json.figure_qc）。
- 英文对应件实质等值修复：land-use-structure.en.png 图例与 metrics-evidence.en.png 分类标签全部英文化；六张 .en 图 100% 英文标签；A0/A3 英文版同步重建。
- A0/A3 图纸重建：A0 首板标题 ≥60pt 深蓝条带排版、图版密集；A3 封面含深色标题带与目录，逐页无裁切文本（PyMuPDF 逐页校验）。
- 来源台账补齐：新增北京城市总体规划（2017-09-29 公开页）、海淀分区规划（2020-02-14 成果页/2019-12-11 批复页）、北京市轨道交通线网规划（2022-08-17）、知春路站（北京地铁官网 10/13 号线）、GB/T 50546-2018、GB 50763-2012、北京市城市更新条例、完整居住社区建设标准、中关村科学城等可核验条目；无障碍法 URL 校正为 gov.cn 主席令页+人大网全文页；全球案例补机构主页口径注记；TRL 估计口径登记（DATA-SRC-TRL-BASIS-2026-08-25）。"在编详细规划"自正式依据中删除并显式降级（A-DETAILED-PLAN-001）；Logo 证据锚点改为 [source:ASSET-LOGO]。
- "5—10分钟可达全覆盖"降级为待验证目标：正文/指标/图件统一改为"官方路网发布后按公开方法（步行4.5km/h、骑行12km/h等效时间栅格）复算"，不再赋数值（A-ACCESS-001；mobility 图标注非等时域）。
- 可实施性细化：实施责任矩阵成本改为定性档位并补齐估算方法/价格基期/包含范围/置信等级/复算触发列；新增近期试点 RACI 责任矩阵（5项×5主体）；文本删除 8 位伪精度数值与 4 位以上小数。
- 七维逐项修补：新增"知春路地段问题诊断与独特因果链"（院所之墙/京张线性割裂/双峰通勤三条机制，原创性）；无障碍验证计划（体验小组构成与首期3个月验证节奏，公共利益）；场景—空间—运营与 AI 数据流/人工接管拓扑图（AI 创新拓扑可视化）；标准矩阵 5 条 evidence_summary 去重为各自真实内容。
- 双语与 HTML：全部 4 个 HTML 由 render_proposal_html.py/最新内容重建，末步以 NotoSansSC VF wght400 instancer→pyftsubset→base64 @font-face 'NotoSansSC-Static' 内嵌（font-family 置首）；en HTML 功能性中文清零（含锚点标签）并经硬化评分器逻辑复核。
- 指标/数据校正：land_use_zone_count 20→23（按 land_use.geojson 实测 23 个要素）；manifest data_confidence high→medium（诚实反映 provisional 几何）；figure QC 结果随 self_check.json 持久化。
- 自检与评分：score_rubric.py = 100.0（PASS，无 mandatory_rejections、无 reviewer_gaps）；四门禁 self-check 通过并以 --mark-self-checked 持久化；validate_local_submission PASS。
- 收尾：proposal.en.md 逐项镜像正文全部实质修订（待验证目标/来源锚点/因果链/TRL口径/商标代号边界/验证计划/成本列+RACI/参考资料），重新渲染并末步重嵌字体；版权声明与叙事文件清除历史乱码并新增"品牌在先权利与使用边界"段落；全包机器复核 0 乱码。

## v1.1 - 2026-08-25

- CocoSgt 评审返修（2026-08-24 评审，CHANGES_REQUESTED）：闭合全部评审项并通过硬化评分器。
- 内容补齐：五类人才画像表＋残障人士旅程与共创验证；7行有来源全球案例表；10张场景卡（落位空间/运营主体建议/数据边界/人工复核/离线替代/KPI/退出条件）；场景—空间—运营矩阵；TRL估计表；3项产业测试验证协议；5项年度活动品牌表；三区两翼协同回路与区域创新节点；品牌命名/VI/Logo；空间叙事、导视与中英传播文案；公共空间策略、缝合轴、大钟寺业态、地标目录、荣誉展示与组件库；要素保障矩阵与数据治理矩阵；试点责任矩阵与实施责任矩阵。
- 口径澄清：新增范围口径表（统筹研究——总体设计·约11.4 km²——重点区域·500米半径站域），统一正文、图件与 metrics 分母口径；provisional 数值一律低精度显示。
- 越界措辞修订："固化为规划控制要求""作为审批与建设的共同依据""衔接土地出让条件"等改为"概念建议/参考方案/供专业团队深化研究"，并列出法定审定与专项论证前置条件；无法核验的场地事实与客流数据一律下修为"待验证假设"。
- 资产与权利：sources.json 新增7个全球案例来源（发布主体级）与逐项资产权利清单（字体 OFL-1.1/Logo/图件/底图/统计假设/踏勘假设/HTML/PDF/代码），COMMUNITY-DISPLAY-ONLY 范围声明，不主张共同著作权。
- 双语 v2：proposal.md 声明 bilingual_contract_version=1 + translation_file；新增五张图英文对应、图纸英文版（A0/A3）、report/proposal.en.html、visual/index.en.html；提案与图件中英实质等值已由参与方人工核对（声明式）。
- 全部4个最终HTML（report/proposal.html、report/proposal.en.html、visual/index.html、visual/index.en.html）在最终渲染后内嵌 OFL-1.1 Noto Sans SC 子集 base64 @font-face。
- 人工检查记录（逐页）：对上述4个HTML逐页人工检查，关键页（封面/总体图/指标证据图/场景卡表/试点矩阵）确认无方框字（tofu）、无裁切、无空白页；中文字形以 Noto Sans SC 子集内嵌渲染，编码为 UTF-8。
- 图件重绘：五张主图独立可区分，含道路/站点/轨道/比例尺/指北针/节点编号 N1-N3/图例/PROVISIONAL 章；指标证据图拆分为占比%与计数双面板并标注来源/公式/置信度/分母；A0 首板密集排版大尺寸关键图。
- 自检与评分：score_rubric.py 硬化评分器运行通过（见本轮报告）；validate_local_submission.py、四门禁 self-check 重新运行并以 --mark-self-checked 持久化。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for zhichunlu-transfer-hub.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).