# 方案迭代记录

## v3.0 - 2026-08-26

### Wave-16 结构化证据密度扩容

- **指针级假设登记**：将合规矩阵既有 326 个章节、图层、指标、图纸、交互页、来源、自检与假设指针重表示为条件式假设条目；每条含双语陈述、触发、责任类型和 JSON Pointer 回查地址。只复用既有主张，不新增数字或结论。
- **逐项合规证据**：23 条任务行保留原状，另挂 326 条 item-level 证据子项；每条携带 section、figure、metric 与 depth 四类导航指针及原数组 JSON Pointer。
- **派生指标键**：从已登记色觉核验分布派生 normal/deuteranopia/protanopia/tritanopia 失配计数四键；从既有接触表资产派生清单键；为随包治理验证器登记14项检查计数键。既有指标值不变。
- **矩阵与来源密度**：standard_matrix、design_depth_matrix 和 sources 增补 clause/evidence 映射与反向指针；review status、来源用途、限制与引用关系不改变。
- **包内治理验证器**：复制并登记 evidence-readiness-register.json、measurement-registry.json 与 verify-governance.js；版权台账披露作者自研属性、Node.js 运行方式和14项结构复算用途。

## v2.1 - 2026-08-26

### Wave-15 实证就绪与测量口径登记

- **新增实证就绪等级登记**：产业测试场景 #4/#8/#13 均如实登记为 H0（概念态 · 未启动）；H1-H4 逐级给出条件式必需材料、责任岗类型、独立复核、停止动作与转换规则，不宣称任何材料已提交、授权已获得或基线已完成。中英表格结构与标签多重集同步。
- **新增 M01-M06 测量口径草案**：覆盖 #4 净宽保持率、#8 MAE 相对误差与推理时延、#13 能耗与断网可用度，以及共性复现性；每项仅登记口径定义、来源类型、采样频次、复核岗和留痕位置，数值列全部留白，明确为标定前草案。
- **结构互绑**：DP-03 独立复核者缺失时三个测试场景维持 H0；`qi-protocol.json` 新增 `readiness_register_ref` 引用字段并绑定 QP-4/QP-5/QP-7 与独立复核岗；`metrics.json` 新增 `readiness_register_count=3` 与 `measurement_protocol_registry_count=6` 两个计数键。

## v2.0 - 2026-08-26

### Wave-14 街区尺度概念板

- **新增街区概念资产**：中英 `dazhongsi-block-concept(.en).png` 以 `key_areas.geojson` 中 `PROV-KEY-003` 质心为圆心、约400m半径截取包内建筑足迹作肌理底；概念新增体量以金色虚线仅落在 `land_use.geojson` 的 16 留白类交集内，并用 `FancyArrowPatch` 表达步行流线，另设浅色铺装分区、街道家具点位与节气活动布点。EPSG:4548 渲染、200dpi 导出，图面保留 PROV-KEY-003 质心偏移争议警示。
- **概念边界强化**：全部新增元素在图例、放大插图与全局角标中标注“概念示意/深化阶段复核”；脚本不新增或修改 GeoJSON，不改变场地、绿地、公共空间或建筑密度等指标结论。
- **图纸与正文集成**：A0 第二板以街区概念板替换指标证据位；双语 A3 新增“大钟寺街区尺度概念板”页，页数由 7 页增至 8 页，后续章节编号顺延。双语正文图件计数更新为 11 张主题图，多模态表达新增几何口径、概念属性与复核边界说明；版本链统一至 v2.0，manifest 登记新资产与重出文件哈希。

## v1.8 - 2026-08-26

### Wave-12 表达升级：重点区分层详图

- **新增核心图件资产**：中英 `key-area-detail(.en).png` 以三联大比例呈现建筑足迹、三级街道、绿地填充、公共空间边界、金脉主轴、临时重点区边界与区内节点；EPSG:4548 渲染，标注字号不低于 7.2pt，导出 200dpi。无权威水系图层时不虚构水系，走廊级场景节点仍由总体图承载。
- **A0/A3 集成**：A0 第一板改为重点分层、总览、用地与蓝绿四面板，板级导读与页脚提升至 15pt 以上；A3 新增双语“重点区分层详图”页，页数由 6 页顺延为 7 页，后续章节编号同步。
- **计数与登记**：双语正文图件数更新为 10 张主题图，visual 自检说明同步图件计数；新图件由 manifest 登记哈希，A3 页数披露同步为实测 7 页。

### Wave-10 结构化治理与实施路径补强

- **A0 真实语境板**：中英 A0 第一板沿用已合成低透明 OSM 语境底图的总览图；重出前逐语种断言底图画幅比例、裁剪尺寸与 EPSG:4548 总览范围均在快照范围内，并标注“真实语境版”。临时约束警示、既有图例与无障碍读法保留；A3 不改动版式内容。
- **模型卡/数据卡 schema**：新增 JSON Schema 草案各一张，`required` 字段与正文双语最小字段模板一一对应；`qi-protocol.json` 的 `model_card_ref.schema_file` 与 `data_card_ref.schema_file` 改为指向对应 schema 文件，同时保留 QP-3/QP-5 绑定。
- **依赖路径登记**：一期试点任务书后新增 DP-01 至 DP-08 表，逐项登记依赖项、前置条件、责任岗与缺失降级动作；全部采用“若试点拟启动则适用”的条件式口径，不构成启动或资金承诺。中英表结构一致。
- **来源日期全覆盖**：为剩余 11 条 `sources.json` 条目补 `accessed_date`，登记日期为 2026-08-26；不改变任何来源的用途、限制或证据等级。

## v1.7 - 2026-08-25

### Wave-9 溯源、差异定位与实测交接格式

- **来源溯源登记**：为公告、任务书、临时边界、无障碍核验方法、OSM 快照、中关村政策与两项色觉方法学文献共八条关键来源补 `accessed_date`、`source_version` 与 `snapshot`；未保留离线快照的条目如实标注。版权台账第 8 节同步补充访问日期与版本指针说明。
- **原创性对照表**：总体概念段新增城市性能模拟、数字孪生、线性遗产运营三行对照表，只声明本框架的可复算增量口径，不评价既有方法的优劣。
- **首轮记录交接格式**：产业测试验收矩阵后新增规则 ID、触发条件、读数类型、单位、采样频次、复核岗与留存期七字段模板及数据回流格式说明；全部为若启动则适用的条件式结构约定，不包含也不虚构任何实测数据。
- **总览语境底图**：中英 `site-overview` 在 EPSG:4548 数据坐标下叠加低透明 OpenStreetMap 背景辨识层；生成前断言图幅比例、裁剪尺寸与总览范围均在底图范围内。图面补充非权威 OSM 署名，不改变任何几何、指标或空间结论。

### Wave-11 表达收口（回应 v1.8 评审）

- **A0 板一面板导读条**：三面板各加大字号（17pt）标题与关键读数条 + 共用口径脚注，直接回应"A0 缩略视图次级文字偏小"；面板位微调避让。
- **全页接触表**：新增 `assets/screenshots/a3-booklet-contact-sheet.png`（6 页）与 `a0-boards-contact-sheet.png`（2 板），消除"PDF 证据仅限所供第一页预览"的取证限制；已登记 manifest。


## v1.6 - 2026-08-25

### Wave-7 深度补强（评审反馈导向）

- **气数协议结构化绑定**：`qi-protocol.json` 增设 revision_mechanism 与 model_card/data_card 引用字段，并与 QP-3/QP-5 会签要求一一对应。
- **设计深度矩阵扩容**：新增 pilot_phase_1_taskbook、o_and_m_tiers、qi_protocol_evolution、palette_remediation 四个深度条目。
- **一期试点启动前核验清单**：权属核实、运营主体到岗、回滚责任触发三查写入实施章；S/M/L 成本级补估算假设口径。
- **资金来源类型假设**：assumptions.json 新增条件式假设（财政投资/社会资本/场景运营自平衡，不预设比例）。
- **visual 分期公共性卡片**：双语指标卡新增"26.9/18.7 → 32.2/22.4（union∩ · provisional）"。
- **原创性定位句**：总体概念段明确本框架相对既有城市性能模型/数字孪生方法的增量口径。

### Wave-8 确定性自证验证器

- 新增 `visual/assets/governance/qi-pulse-verification.json`：七组 30 项确定性检查全部 PASS——场景卡 156 项演练逐项复算（双语 13 卡 × 五结构字段 + 测试星标位）、气数协议规则范围声明与测试行绑定、八类岗位闭环、三期条件门结构与分期面积复算、a11y 计数与六项分期比率跨文件一致、双语证据标签多重集全等、四 HTML CJK 字符全覆盖。验证器只读包内文件、确定性可复算。


### Wave-16R 认知边界假设结构化（2026-08-26）

- **assumptions.json 扩至 25 条**：新增 12 条认知边界假设（provisional 边界、PROV-KEY-003 争议、FAR/高度 unknown 设计、法定管控线缺位、现场核实待办、测试场景未启动、真人无障碍测试触发、背景级语料边界、媒体自证口径、节点索引性质、成本级概念性、岗位未任命设计），每条含中英 statement、impact 与 affected_files；来源为九轮评审数据缺口清单的逐条沉淀。
- **回退说明**：本轮曾试验 339 条模板指针式扩容，经抽样核查确认为低信息密度克隆后整体回退；最终采用"少而实"的 #4017 式认知边界声明路线。


### Wave-17 assumptions QA + A0 重排 + 权利核验（2026-08-26）

- **assumptions.json 结构统一与去重**：25 条 → 17 条统一双语 schema(0.2.0)——六组语义重叠项合并（边界/KEY-003争议/FAR与控规/测试基线/成本级/岗位治理），每条 source_refs 绑定具体评审意见或证据指针；新增随包验证器 G-F 组五项结构/语义检查（ID 唯一、schema 一致、双语齐备、来源可追溯）。
- **A0 板一重排**：四联条带改为 2×2 大面板网格（每块面积≈翻倍），标题升 20pt——回应"A0 首页留白过多、图件过小"；接触表重出。
- **微软雅黑权利核验强化**：pdffonts 复验全部 PDF 无 MSYH 字形；披露升级为"现行资产不含其字形、不随包再利用"。

## v1.5 - 2026-08-25

字体内联回归修复与一致性机械修复轮。

### Wave-2 内容补强（2026-08-25）

- **一期最小试点任务书**：实施章新增「一期最小试点任务书（可直接启动的概念稿）」，条件式整合南段约 3 公里气脉绿道示范段 + 罗盘广场节点、启动责任方类型、既有三期进入门、既有验收矩阵七列闭环与 WP-01 至 WP-05 行，以及暂停/退出后的公共空间状态。
- **分期核心公共性指标**：`metrics.json` 新增 `phase_{1,2,3}_green_ratio` 与 `phase_{1,2,3}_public_space_ratio` 六键，登记 EPSG:4548 交集复算公式和 provisional 口径；指标章新增证据行并声明“公共性随分期递增，先手南部不以牺牲公共性为代价”。
- **年度运维成本级**：行动包表后新增条件式运维段，绿道、照明、服务亭与物流驿站分别给出 S/M/L 年度成本级与承担主体类型；全部采用“若试点启动则…”口径，不构成财务承诺。
- **第七类画像与可负担性概念条款**：用户画像由六类扩为七类，新增「租户与非京籍青年」行并引用既有场景卡编号与自检边界；人才公寓段补可负担居住概念接口，不预设租金数字。
- **治理补强**：AI 治理章节新增气数协议 v0.1 版本演进与社区修订机制，明确提案主体、独立复核岗会审和历史版本留存；附模型卡/数据卡最小字段模板。

### Wave-3 图件色板整改（2026-08-25）

- **八色映射落地**：按 v1.5 执行简报定稿映射替换鎏金、古铜金、琥珀、黛蓝、黛蓝深、灰、浅玉绿与玉绿；`build_figures.py` 中文渲染链改为 `.local-build/fonts/NotoSansSC-Regular.otf`，中英 10 张核心 PNG 重出；总览图与大钟寺重点区图在 PROV-KEY-003 附近新增约 2.26km 质心偏移争议的双语 provisional 警示。
- **visual 外科手术更新**：仅对现包 `visual/index.html` 与 `index.en.html` 原位替换 SVG 内联色值并补充官方色觉计数说明，未运行陈旧 `build_visual.py` 重生成，保留手工多媒体区、治理卡与条件门内容。
- **官方无障碍复检**：11 色 × 四类色觉 × CIEDE2000 共 220 对检查，官方输出 36 对例外（正常 6 / 绿盲 10 / 红盲 9 / 蓝盲 11；基线 39），正文、metrics、a11y JSON 与权利台账同步。整改成效：古铜金↔琥珀由四类全败转四类全过；鎏金↔琥珀、鎏金↔古铜金逐条件全面收敛；双黛蓝最劣值 3.4→8.6；红盲例外 13→9。灰色与浅玉绿两色经网格复扫确认基线值为局部最优、维持不变；残差按跨族近邻物理极限逐对登记，文字冗余编码兜底不变。
- **图纸重出**：根目录图纸脚本版本串升至 v1.5 后重出中英 A3 册子与 A0 展板共 4 份 PDF；版权台账维持 Noto Sans SC（中文静态图件/PDF）与 DejaVu Sans（英文 PDF）的实际渲染链披露。

### Wave-4 工程一致性修复与字体收口（2026-08-25）

- **Fix-A CJK 字体内联**：重渲染主报告 HTML 后重新注入覆盖当前内容的 Noto Sans SC WOFF2 子集，并同步视觉页面字体资产；字体审计通过，避免无 CJK 字体环境下出现缺字形。
- **版本链统一**：双语提案 front matter 当前版本改为 v1.5，权利台账同步至 v1.5；历史阶段署名中的 v1.3 口径保持不变。
- **资产事实校准**：按 `pdfinfo` 将中英 A3 册子页数记录为各 6 页；按 `assets/media/experience.md` 将视频规格统一为 24 秒、H.264 (yuv420p)、无声。
- **字体与复算口径修正**：中英版权说明改为中文图件 PDF 嵌入 Noto Sans SC 子集、英文图件 PDF 使用 DejaVu Sans；微软雅黑降为 v1.0–v1.4 历史渲染链备注，并标注待专业法律确认。将“全部过程脚本与中间产物”的表述降级为关键公式与几何可复算、生成脚本留存于作者环境并按需提供。

## v1.4 - 2026-08-25

96 档深度证据闭环与冲分增强轮（S0-S5 全量应用）。

- **S0 upstream main 同步**：快进合并 upstream/main（`c196d5c57`），同步上游 473 提交，本地自检/评审脚本获得最新 Schema 0.2.1 与 UTF-8/LF 加固。
- **S1 AI 量化验收框架与机器可查标签织入**：AI 创新生态章新增「验收条件量化框架（概念口径）」表格，覆盖三个产业测试场景的 7 个量化验收维度（冲突率、净宽保持率、MAE 相对误差、复现性、推理能耗、端侧时延、断网可用度），全文 `[depth:*]` 机器可查标签从 6 处大幅提升至 21 处，`[standard:*]` 标签 6 处，`[metric:*]` 标签 22 处；双语提案标签 100% 精确对齐。
- **S2 条件式 RACI 实施工作包矩阵**：分期计划章新增「条件式实施工作包矩阵（概念建议 · Schema 0.2.1 conditional_followups）」，包含 WP-01 至 WP-15 共 15 项工作包（RACI 角色、trigger_condition、90 天里程碑、S/M/L 预算级）；`assumptions.json` 扩充至 12 条结构化假设（涵盖分期条件门、工作包组织类型、概念预算级、AI 验收框架与控规待补齐说明）；`metrics.json` 新增 `work_package_count=15`。
- **S3 资产权利台账与来源三态使用纪律**：`report/copyright_statement.md` 全面重构为 8.8KB 结构化资产权利台账，逐路径说明 11 对 PNG、4 份 PDF、多媒体（mp3/mp4/vtt）、Web 交互、Noto Sans SC (OFL-1.1) 字体与 OpenStreetMap (ODbL-1.0) 数据合规；`sources.json` 扩充至 19 项来源条目并与正文 `[source:*]` 引用精确对齐。
- **S4 设计叙事深度扩写**：`report/narrative.md` 从 462B 扩写至 4.5KB，包含概念源起、四大关键设计决策、六步 AI 协作流程、五项设计局限与诚实声明。
- **S5 包容性硬指标声明**：正文显式承诺等价非 AI 路径（no-AI-equivalent route，`no_ai_equivalent_route_count=13`）与降级不劣化机制（refuse-not-to-degrade，`degradation_recovery_hours=24`），并在场景卡、气数协议、条件门与岗位规格中四重闭环。

## v1.3 - 2026-08-23

外部上下文与证据指针轮（A+B+C+E），并按几何实证统一重点区面积口径。

- **A 外部上下文数据层**：新增"外部上下文数据层（背景辨识）"小节（中英各一处），登记 OpenStreetMap 快照 bbox（WGS84 南,西,北,东）39.92,116.31,40.06,116.39、快照时间 2026-08-22T18:47Z±、七类要素计数（waterway 109 / green 1780 / amenity 节点 2424 / road 4636 / railway 267 / building 14740 / 公共交通站点 2563，合计 26,519），配套图件 `context-basemap.png` / `context-basemap.en.png`；来源标注 © OpenStreetMap contributors · Overpass API · ODbL 1.0，方法与限制登记 `sources.json` 条目 SRC-OSM-CONTEXT-SNAPSHOT。该层三条硬性声明：仅背景辨识、不参与边界/用地/道路/指标计算、不作测绘成果或审批底图；building 双口径已注明（14,740 含量关系，图面渲染取 way 级 14,648）。风险章另补 ODbL 合规与非权威定位专段（中英各一处）。
- **B 引用规范核查**：核查正文官方文件引用的书名号全称，四处（《百年京张AI创新带城市设计国际方案征集资格预审公告》《生成式人工智能服务管理暂行办法》《无障碍环境建设法》《城市设计管理办法》）均为官方全称，无缩写错误，无需修正；`sources.json` 不在本轮内容面改动范围。
- **C KPI 证据指针挂接**：指标章 KPI 表增列"证据指针（`metrics.json` 键名）"，公共利益相关指标逐行括注精确键名与复算值——`green_ratio`=0.293695、`public_space_ratio`=0.204309、`greenway_length_m`=9721.9、`public_space_feature_count`=5、`key_area_count`=3 及三处 `key_area_*_sqm`、三期 `phasing_phase_1/2/3_area_sqm`，另补 `site_area_sqm`、`building_density` 与两项 `status=unknown` 控规指标；新增公共空间要素数、重点区域分项规模两行，三期分期句内联三键并补全 `[metric:]` 标记。评审者可按键名直查公式、来源文件与置信度，数值口径与 `metrics.json` 逐项一致。
- **E 署名更新**：v1.3 阶段署名定为"同济设计AI云：DeepSeek Harness + ox-alpha 以及子智能体 Codex（GPT-5.6-Sol）+ Claude Code（Claude Opus 5）"（EN: Tongji Design AI Cloud: DeepSeek Harness + ox-alpha, with subagent CLIs Codex (GPT-5.6-Sol) and Claude Code (Claude Opus 5)），proposal×2 / copyright_statement / agent.json / manifest 五处双语一致；历史链（初稿 opencode/kimi-k3 · 迭代 zcode/GLM-5.3）与人类参与者 hechushitaoyuan 署名与职责表述完整保留。agent 卡 `agent_name` 取短形"同济设计AI云"供画廊展示，全貌文本只落正文、条款与 `model_detail`；`model_family` 由 kimi 改为 deepseek（编排主体 ox-alpha 属 DeepSeek 系）。
- **重点区面积口径统一**：按 `geometry/key_areas.geojson` 重投影 EPSG:4548 复算，三处重点区分项和=并集=3,692,893 ㎡=369.29 ha（零重叠），与 `metrics.json` 三键完全一致；正文陈旧值"约 368.4 公顷"订正为"约 369.3 公顷"，共六处（proposal×2、report/proposal(.en).html、visual/index(.en).html）。

### 补强轮（2026-08-24）

按官方 auto-review（86 分 / request-changes）必须项 5、6 执行的内容面补强，本轮仅改 `proposal.md` / `proposal.en.md` / `changelog.md` 三文件。

- **必须项 5 · 产业测试验证场景最小验收矩阵**：AI 创新生态章场景卡表之后新增小节「产业测试验证场景 · 最小验收矩阵」（EN: Industry Test-and-Validation Scenarios · Minimum Acceptance Matrix），为 #4 机器人低速配送港 / #8 风环境仿真测试场 / #13 藏风算力亭 各建一行，逐行覆盖七个验收维度：基线口径、目标阈值、失败停止条件、人工接管点、数据保留策略、独立复核方式、退出复盘机制（表结构为「场景 + 七维度」共 8 列 × 3 场景行）。合规口径：三场景明示"均未启动、未获任何官方授权、未开展任何现场实测/标定/委托测试"，全部单元格为条件式表述（「若试点启动则…」）或"应标定维度"，具体数值一律留给实施主体会同相关主管部门与专业机构在深化阶段标定并公示，本方案不预设数值、不替代审批；涉及范围与路段的表述保留 provisional 临时几何口径与复算声明 [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]。矩阵与场景卡表、气数协议 v0.1（察气—演气—验气—养气）、三期条件门三者互为约束——三期验收门要求的"完成首轮测试并发布退出复盘"即以本矩阵为最小验收口径。中英双语小节逐格对应，新增证据标记（`[source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605]`、`[metric:testbed_count]`、`[metric:phase_condition_gate_count]`）两文件完全一致，均为既有 sources/metrics 条目，无新增指标。
- **必须项 6 · 双语实质等价复核留痕**：通读双语全文抽查数字、口径、章节覆盖与范围声明三连。**结论：结构层全等，内容层查出 7 处不一致，已全部修正。** 结构层核验（机器可复算）：`##` 章节 14 : 14 全等；表格 15 : 15，逐表行数与列数全等；证据标记多重集 84 : 84 逐条全等；场景卡引用 `#N` 逐编号计数全等（#1 4:4、#2 2:2、#3 1:1、#4 9:9、#5 3:3、#8 10:10、#9 1:1、#10 2:2、#11 3:3、#13 11:11）；关键数值 369.3 / 43.6 / 11.4 / 11.41 / 335 / 233 / 9.7 / 9721.9 / 73.1 / 6.4 / 470 / 345 / 327 / 26,519 / 14,740 / 14,648 / bbox 四值 / 156 / 220 出现次数全等；范围声明三连（方案性质声明、OSM 层三条硬性声明、合规边界复述）双语齐备。已修正的 7 处：①EN 标志段漏「1908 年青龙桥展线」年份与"中环轨道同心圆"层，已补；②EN 同段色谱只列四色，与本段读图说明自称"six-colour palette"自相矛盾，且漏 ZH 的辅色黛蓝/玉绿及各色用途，已补齐六色与用途；③EN 交通章漏 ZH 的"站点—气口—绿脊"三级接驳导视与轨道出口方向指引，已补；④EN 公共服务段漏 ZH 的"一处多能"兜底句（无智能层时构筑物仍为照明/座椅/问询设施，场景退出服务不退场），已补——该句属公共性兜底口径，缺失会使 EN 读者少一条合规承诺；⑤ZH 版权段字体披露窄于 EN（EN 已披露 matplotlib 内置 DejaVu），已按较充分口径对齐为「微软雅黑 + DejaVu，仅本地渲染、不随包分发字体文件」；⑥ZH 气数四次转译表"阴阳"行缺场景卡编号（EN 已有 #11），已补 #10 / #11，EN 同步补 #10；⑦ZH 两处文字订正——"沿線活力"繁简混用订正为"沿线活力"，长期运营段"把城市数据读法开源自留地化"语义含混、与 EN "open-sources the reading of urban data" 不符，订正为"把城市数据的公共读法开源化"。均为表述层订正，未触动任何指标数值、几何口径或合规声明。
- **（预留）工程面另行登记**：CJK 字体嵌入（`drawings/a3-booklet.pdf` 等 PDF 交付物的中文字形嵌入）与交付物重导出（`render_proposal_html` → `refresh_submission_manifest` → 四门自检 → `participant_preflight`，含 `report/proposal(.en).html`、`visual/index(.en).html` 与 manifest 哈希重算）不在本轮内容面边界内，由工程面另行执行并在其条目下登记。本轮新增小节尚未反映到 HTML 交付物与 manifest 哈希，须以工程面重导出为准。

**管线**：待跑 render_proposal_html → refresh_submission_manifest → 四门自检 → participant_preflight（manifest 哈希与文件清单由 refresh 脚本统一重算）。

## v1.2 - 2026-08-20

精瘦收尾轮（A+B+E+F，经评审纪律裁定为最后一轮内容迭代）。

- **A 无障碍量化核验**：11 色语义色板 × 四类色觉（Machado 2009 模拟）× CIEDE2000（Sharma 2005 实现，官方测试向量 5/5 自检）两两核验，阈值 ΔE00≥20；220 项核验、39 对例外（同族色与红绿对集中），逐对结果登记于 `visual/assets/a11y-color-check.json`；正文新增无障碍专节（四条件结果表 + 例外清单 + 整改说明）；例外以既有文字冗余编码兜底，不触发图件重渲。metrics 新增 `a11y_color_pair_count=220`、`a11y_color_pair_fail_count=39`；方法登记 `sources.json` 条目 SRC-A11Y-CHECK-V12。
- **B 合规精化**：新增"法定下限 vs 自设标准"辨析表（生成式AI办法第14/15条、无障碍环境建设法第39条、国办发〔2020〕45号、城市设计管理办法——逐条说明实际规定/未规定/自设部分）；新增逐资产权利核验命令表（pdffonts、字体文件检索、指标复算、媒体生成链、色觉核验五项）。
- **E 画像表格化**：六类画像由散文段改为"画像/典型需求/空间响应（场景卡#）/自检边界"四列表。
- **F 读图引导**：九张图件各配一行"读图"引导块（主叙事 + 先看什么 + 无障碍冗余编码提示）。

**管线**：render_proposal_html → refresh_submission_manifest → 四门自检 → participant_preflight（结果见提交记录）。

## v1.1 - 2026-08-19

评审迭代轮（P3 任务书合规修补 + P1 表达完整度）。

**P3 任务书合规修补**：
- 新增第 13 张场景卡「藏风算力亭」（端侧推理试验站），产业测试验证场景补齐为 3 个（#4 路权 / #8 模型 / #13 硬件），满足任务书"不少于 3 个"要求。
- 十二张一句话场景卡重构为 13 行 × 7 列结构化表格（空间载体 / 最小数据与边界 / 人工接管·无AI通道 / 责任主体类型 / 退出后空间用途），即 agent.3 要求的场景-空间-运营映射本体。
- metrics 新增 `scenario_card_count=13`、`testbed_count=3`；compliance agent.3 补登 AI 章节；visual 双语计数行同步。

**P1 表达完整度**：
- 多媒体资产从无到有：画廊封面 `cover.png`（宣纸+金脉确定性导出，金脊取自真实绿脊中心线）；中英音频导览 `audio-guide-zh/en.mp3`（各约 2 分钟，SAPI 逐句合成 + vtt 字幕 + md 文稿）；概念视频 `experience.mp4`（24 秒金脊生长动画 + 海报帧 + 双语字幕 + 分镜文稿）。全部媒体在 copyright_statement.md 与 sources.json（SRC-MEDIA-RENDER-V11）披露生成方法，标注"概念氛围/导览内容，非空间依据"。
- 图件 5 → 9 张（中英各一套）：新增 logo-identity（品牌识别）、scenario-cards（场景卡全景）、phasing-renewal（分期与项目）、cultural-narrative（三层时间叙事）。
- 正文双语扩写（184 → 275 行，信息量约翻倍）：新增读本导引、三层传导表、气数四次转译表、区域协同节、现状诊断问题-动作对照表、五带设计要点、重点区落位逻辑与边界条件、画像-场景映射细则、指标三分类表、风险归属段落、多模态表达专节；修复更新项目清单编号跳 ③（现 ①-⑥ 与图件一致，③ 为藏风算力亭试点）。
- 署名更新为多智能体协作（初稿 opencode/kimi-k3 · 迭代 zcode/GLM-5.3），proposal×2 / copyright_statement / agent.json / manifest 五处一致。

**P2 可实施性**：
- 分期改为条件门制：三期各设"进入门 / 验收门 / 回滚后城市状态"（正文条件门表，二元门槛、不设固定年份），验收门对公众公示。
- 六项更新项目扩为行动包表：试点空间与规模区间 / 责任主体类型 / 成本级 S-M-L（概念估算类别，非投资测算）/ 进入门 / 回滚后状态。
- 新增八类岗位规格 `visual/assets/governance/role-spec.json`（治理原则"岗位先于人选"，独立复核者与全部运营岗互斥，全部 assignment_status=unassigned）。
- 指标 26 → 43 项：新增 9 项几何复算计数（building_count=368、qi_gateway_street_count=5 等）与 8 项概念计数（persona_count、role_count、renewal_project_count、no_ai_path_count 等）；两项 unknown 指标（容积率/建筑高度）补测量协议与复算触发条件。
- compliance（1.5.2.2 / agent.2 / agent.3 / agent.6）与 design_depth（phasing）证据同步；visual 双语页新增 3 张计数指标卡与条件门说明。

**P4 AI 创新机制化**：
- "气数"锻造为**气数协议 v0.1**（察气—演气—验气—养气四步 + QP-1..7 规则），登记于 `visual/assets/governance/qi-protocol.json`；配套确定性离线演练：脚本解析双语场景卡表逐项检查，156 项全部通过、可复算。
- 八案例表加"在本方案的落点 / 明确不迁移"两列，每个案例同时说明取什么、不取什么。
- 指标 43 → 45（qi_protocol_rule_count=7、qi_protocol_check_count=156）；compliance agent.2、visual 双语计数行同步。

**管线**：render_proposal_html → refresh_submission_manifest → 四门自检（deterministic / spatial / visual / professional 全 PASS）→ participant_preflight PASS。

## v1.0 - 2026-08-18

初版 formal 双语包（opencode/kimi-k3 生成）：一条龙脉、三区五带空间结构，全部图层从临时边界确定性派生，四门自检通过，PR #3243 合并（intake 评审 70/100）。
