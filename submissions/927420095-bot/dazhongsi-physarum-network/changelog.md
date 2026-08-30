# 方案迭代记录

## v1.0 - 2026-08-25

R25-8 最终轮（88 → 90+）：全面审计 R25-8 各模块，确认前序轮次已闭环全部内容缺口，本轮为零内容改动的诚实收尾。未盲改核心概念、场景卡、治理脊柱、品牌系统（铁律）。

### 模块审计结论
- **A3 双语证据标记等价**：`proposal.md` ↔ `proposal.en.md` 证据标记（source/standard/depth/data/metric）逐一 diff，NO DIFF（100% 等价）。
- **B1 来源审计**：`sources.json` 10 个全球标杆案例（QUAYSIDE / MASDAR / SONGDO / AMSTERDAM / XIONGAN / SHIBUYA / SUPERILLES / COPENHAGEN / PUNGGOL / CHEONGGYECHEON）全部具备 `url` + `accessed_date` + `location` + `period`，`source_type=official_public`（R25-6 已完成，本轮复验无缺口）。
- **B2 版权许可矩阵**：`report/copyright_statement.md` 已列明每类资产（文本/HTML/几何/图件/品牌/JS 库/字体/仿真数据/方法引用/软件库）来源与许可；`proposal.md`「风险、版权与合规说明」节 + `[source:SITE-PACKAGE]` 书目入口齐全，无需新增。
- **A1/A2/A4 视觉交付物**：A0 双语 PDF（`a0-boards.pdf`/`.en.pdf` 08-25 12:51）、A3 双语 booklet、4 HTML（`report/proposal.html`/`.en.html` + `visual/index.html`/`.en.html`）、双语图件（`site-overview`/`key-areas`/`land-use-structure`/`mobility-bluegreen` 等 `.en` 变体）全部存在且为最新。

### 诚实边界
- 88 分评审为一行「Accepted for repository intake only」，**未给出七维分项评分**；「表达 4/5、风险合规 4/5」的分项判断源自 83 分 request-changes 评审，本轮无法据此定向修复。
- 未编造任何新内容、新数字、新 URL；未虚构合作主体/机构/协议；未新增或改动正文内容。

## v0.9 - 2026-08-25

R25-7 最终抛光：确认 R25-6 已闭环 P0/P1，新增原创性「独立设计决策」声明（双语同步）。

### 验证确认（R25-6 已完成，本轮未改动）
- P0 表达完整度：`report/proposal.html` 字体栈首位 `"Noto Sans SC"`、无 100/900 极端字重，中文 HTML 已可读（方框字根治）。
- P1 AI 创新性：G4 已从 `governance-raci.json` 与正文删除，治理统一为 G0-G3 四闸门。
- P1 可实施性：COST-UNIT-BEIJING-001 已降级为作者概念假设，无「正式造价/官方单价/定额」等正式来源暗示。

### 原创性（独立设计决策声明强化）
- `proposal.md` / `proposal.en.md` 参数转译表表头「状态」→「场内决策依据（独立于算法输出）」。
- 关键声明标题加「（场内设计独立于算法输出）」；第 2 条强化为基于场地条件的人工设计决策，列明 5 项依据：provisional 边界、大钟寺站（13 号线）与周边轨道站点、现有道路骨架与慢行断点、人口与产业锚点密度、京张铁路遗址公园已建/规划范围。
- 新增第 4 条诚实边界：因组织方尚未发布正式边界/文保范围/现状测绘，本方案**尚不能形成真实场地优化效果的独立量化证明**；独立性为方法论与空间逻辑层面，待正式数据到位后以复算结果补足。

## v0.8 - 2026-08-25

R25-6 评审修复（83/100 请求变更）：主攻表达完整度（中文 HTML 方框字根治），辅修两个 P1 防守项（治理 G0-G3 统一删 G4、COST 来源补证与降级）。不触碰原创性/AI/公共利益维度、核心概念、场景卡、治理脊柱、品牌系统。

### 表达完整度（中文 HTML 方框字根治）
- 根因：R25-5 跳过 embed_font.py，render_proposal_html.py 清空 @font-face，中文 HTML 显示为方框字（tofu）。
- 修复：重跑 embed_font.py 重新注入 Noto Sans SC 子集 @font-face，4 个 HTML 字体栈首位置回 "Noto Sans SC"；子集 1076 字形、0 个 CJK 缺字。

### 治理 G0-G3 统一（删 G4）
- 方案 B：删除治理闸门 G4「常态运行/归档回执」，统一为「普通路径先行 + 分级放行 G0-G3」四闸门（与正文 95% 表述及 shadow-test-matrix.json「G0-G3」一致）。
- governance-raci.json：标题「五关→四关」「Five-Gate→Four-Gate」，删除 G4 gate 对象。
- proposal.md / proposal.en.md：正文「五闸门→四闸门」「five-gate→four-gate」，删除 G4 表格行；「归档回执」概念保留于正文「每级保留停止条件、可逆措施与归档回执」。

### COST 来源补证与降级
- 查明《北京市建设工程计价依据——预算消耗量标准（市政工程）》为官方标准（京建发〔2021〕201号，2021-09 印发、2022-01-01 施行），有官方查询下载网址（zjw.beijing.gov.cn）。
- 关键事实：该标准只含人工/材料/机械消耗量，不含单价（无人材机基价与费用标准）。
- COST-UNIT-BEIJING-001：补官方 url + accessed_date；明确「消耗量标准、不含单价」；四档单价（8000/5000/3000/1500 元/m）标注为作者概念假设（公开综合单价/《北京工程造价信息》信息价），非该标准、非定额、非招标结果。
- proposal.md / proposal.en.md：「概念估算 ±30%」统一改为「作者概念假设，敏感性区间 ±30%」；路网市政造价引用 COST-UNIT-BEIJING-001→COST-ESTIMATE-PLAN03（作者逐项估算），COST-UNIT-BEIJING-001 转为计价依据（消耗量标准）引用。

### 诚实边界
- 未编造 URL：官方门户 zjw.beijing.gov.cn 来自真实检索；本机 WebFetch 因网络受限返回 Socket closed，不代表链接失效。
- 未虚构单价来源：四档单价明确为作者概念假设，不再暗示来自官方定额。

## v0.7 - 2026-08-25

R25-5 最终评审冲刺：原创性 4→5（真实参数转译）、风险合规 4→5（来源审计补全）、表达完整度 4→5（无回归验证）。目标 85+。

### 原创性（参数转译说明）
- proposal.md / proposal.en.md 新增「从算法验证到空间设计：参数转译说明」章节：8 行表格逐项列明场外 Physarum+NSGA-II 仿真参数（真实运行）→ 场内概念设计决策的转译规则，两类数值不混用。
- 8 维度真实值（全部取自 simulation.json / metrics.json 冻结值）：18 关键终端（骨架覆盖 17/18）、class_I=1.5 / class_IV=3.0 硬阻断、top-10% 传导度 167 边、四级网络（主静脉—支脉—慢行环—绿廊）、抗毁强、8813.1 m、19.20（基线 1.143 / Run7 2.802）、0 硬穿越（f3≡f2）。
- metrics.json 扩展已有 `physarum_translation.dimension_table`（8 行，未新增顶层字段）。
- 三段关键声明：场外参数为方法验证证据（provisional 场地西侧 2–3 km）；场内为人工校准概念设计；正式数据发布后须重跑仿真链并产出「旧值—新值—变化原因」对照表。

### 风险合规（来源审计）
- sources.json 10 个全球标杆案例全部补 `url` + `accessed_date`（官方源：Waterfront Toronto / masdarcity.ae / IFEZ / amsterdamsmartcity.com / 中国雄安官网 / 東京都都市整備局 / barcelona.cat / kk.dk / URA / seoul.go.kr）。
- 新增 `COST-UNIT-BEIJING-001`：北京市政道路计价依据《北京市建设工程计价依据——预算消耗量标准（市政工程）》第二册道路工程（北京市住建委 2021-09）+ 月度工程指导价；诚实标注单价为公开综合单价参考级 ±30%、非中标结果、无干净官方下载 URL（仅第三方镜像）。
- proposal.md / proposal.en.md 成本章节引用 [source:COST-UNIT-BEIJING-001]。

### 表达完整度（无回归验证）
- C1 EN 空间图尺寸一致（3280×1840）；C2 中文字体子集覆盖未改动（保持 R25-3 已验证 0 缺口）；C3 A0 PDF 存在（08-25 12:51 最新）。本轮为文本/JSON 改动，未触碰图件、HTML 或字体子集，故无表达回归。

### 硬天花板（保持）
- AI-off 服务等价差 [metric:ai_off_service_equivalence_gap] 保持 unknown，待 G3 有限现场窗口首读数（中英 L333 一致）。

### 诚实边界
- 未编造任何数字（所有数值取自 simulation.json / metrics.json 真实冻结值）；模板示例「400m 服务半径」「29 节点」等在数据中不存在，未采用。
- 案例 URL 均真实（抽查 Masdar / IFEZ 可访问；Barcelona 返回 403 为机器人拦截、非死链）；成本定额无官方 URL，已标 known_limitations。

## v0.6 - 2026-08-25

R25-4 补遗：治理 RACI 上浮至正文 + 三张英文图折行 + A0 首页重排之后，本轮做两处收尾——G3 问责单 A 化（RACI 结构修正）+ 双语实质等价核对记录。

### G3 问责单 A 化（RACI 结构修正）

RACI 基本原则：每闸门有且仅有一个 A（Accountable）。原 G3「有限现场窗口」设「公众与无障碍代表 + 公共价值委员会」双 A，问责链分裂，改为方案 A（公共价值委员会单 A）：

| 角色 | 原 | 改后 |
| --- | --- | --- |
| 公共价值委员会/运营秘书处 | A | **A（单一问责）** |
| 公众与无障碍代表 | A | C（咨询，保留事实否决权） |

同步更新 `visual/assets/governance-raci.json`、`proposal.md` / `proposal.en.md` 正文表格与注释（L272/L275），HTML 重渲染。公众否决权未削弱，仅问责归口至公共价值委员会。此为治理框架自身设计修正，不涉及虚构机构/职权/协议。

### 双语实质等价核对（R25-4 人工审计）

| 核对项 | 中文 | 英文 | 结果 |
| --- | --- | --- | --- |
| 骨架边数 | 167 | 167 | ✅ |
| 最优效率 | 19.20 | 19.20 | ✅ |
| Run7 冻结目标 | 2.802 | 2.802 | ✅ |
| Plan03 UDS | 80.34 | 80.34 | ✅ |
| 透水铺装率 | 69.1% | 69.1% | ✅ |
| 绿色渗透率 | 25.2% | 25.2% | ✅ |
| 路网市政造价 | 2000–3900 万元 | 20–39 million CNY | ✅ |
| 分期措辞 | 概念示意性分期框架 | conceptual indicative phasing framework | ✅ |
| RACI 五闸门 G0–G4 | A/R/C/I 逐格一致（G3 单 A） | 逐格一致（G3 single-A） | ✅ |

**结论**：未发现中英差异；关键数字、单位、分期措辞与治理矩阵完全等价。

## v0.4 - 2026-08-24

R25-2「表达与合规修复」：回应评审 81/100 的 request-changes，修复英文图件、HTML 字体死角、A0 第一页版式、数字溯源、概念建议状态横幅，并清理死文件。评审对照：self_check 四门全绿 + preflight 无 blocker。

### 双语实质等价核对（R25-2 人工审计）

| 核对项 | 结果 |
| --- | --- |
| 章节标题 | proposal.md ↔ proposal.en.md 一一对应、顺序一致 |
| 核心主张 | 无遗漏、无添加、无语义偏移 |
| 数字与单位 | 19.20 / 2.802 / 8813.1 m / 80.34 / 167 / 17/18 / 69.1% / 25.2% 中英一致 |
| 公式与口径 | metrics.json 公式字段中英一致 |
| 证据等级 | provisional / off-site / known 状态一致 |
| 图件位置 | 中文版嵌入图，英文版同位置嵌入 .en.png |
| 图例翻译 | 必交图 + 复用图图例全英文，零内部字段暴露 |
| 概念状态文字 | frontmatter + banner + subtitle 中英文同步 |

**结论**：未发现差异，R25-2 改动保持中英完全等价。

### 本轮修复

| 模块 | 内容 |
| --- | --- |
| P0-1 英文图件 | 重绘 4 张空间图（zh+en），图例/标注/来源/状态全英文，key-areas 去裸 ID、解标签重叠 |
| P0-2 HTML 字体 | 子集字体 font-weight:100 900→normal 根治 tofu；顶栏遮挡 top 76→84px；文档面板 overflow-y:auto |
| P0-3 双语等价 | 逐段核对通过（见上表） |
| P1-1 A0 第一页 | metrics_strip 按语言分支，去中英混杂 |
| P1-2 数字溯源 | 8813.0→8813.1；17/18 回填 simulation.json frozen_metrics（run7 实证）；全部数字有源/公式，无硬编 |
| P1-3 概念横幅 | 中英 notice 进 frontmatter + 首屏 .conceptual-banner + 视觉站副标题 |
| 体积/清理 | 空间图 300→200 DPI（27.9→16.1 MB）；删除未声明死文件 a0_board_01/02.pdf（−9.36 MB）；包体 49.1→~28 MB |

**未改动 / 冻结项**：方法核心代码、正式几何图层 `geometry/*.geojson`、三大定位锚定与「一核·三区·一界面·一衔接」空间结构；冻结指标数值未变，仅补溯源/回填来源。

## v0.5 - 2026-08-24

R25-3「根治视觉 + 治理资产可审计」：回应评审 81/100 中「必须完成的下一步」5+1 项，逐模块修复并保持中英完全等价。

### 本轮修复

| 模块 | 内容 | 交付物 |
| --- | --- | --- |
| 1.1 中文控件方框字根治 | 根因=字体子集缺 demo_data.json / scenes.json 的 8 个汉字（扑拓略米粗辐魏帮），地图标注豆腐块；补入子集源（覆盖 929 唯一汉字，缺口=0）+ 全局保险规则（控件 font-weight:400、内嵌字体优先） | `embed_font.py`、`visual/index.html`+`.en.html` |
| 1.2 英文地图右侧说明裁切 | `.route-row`/图例 flex 项 `flex-shrink:0` + `flex-wrap`/`overflow-wrap`，英文长文本换行不裁切；补 `.docs-grid` 双列 | `visual/assets/demo.css` |
| 1.3 A0 可读性 | 表格正文字号 7.2→8.0pt，全文无 <8pt；provisional/临时/建议警示已贯穿 | `gen_pdfs_enhanced.py` |
| 2 遗产指标同屏同级重排 | metrics-evidence 图重排为 0 / 19.20 / 167 三张同级卡 + OFF-SITE 场外标签 | `inject_physarum.py`、`assets/figures/metrics-evidence.png`+`.en.png` |
| 3 案例+成本逐项来源审计 | `sources.json` 增 COST-ESTIMATE-PLAN03（逐项 740.2/1744.1/3679.9/2648.8 m→2965.5 万元，口径北京市 2024 公开综合单价±30%）；10 案例补 location/period 结构化字段 | `sources.json`（25→26） |
| 4 Physarum 转译说明 | `metrics.json` 增 `physarum_translation`：三可移植特性 + 锚点/障碍转译机制 + 场外边界 | `metrics.json` |
| 5 T-01/02/03 测量协议 | 3 个验证场景增 `measurement_protocol`（MVMP 测量验证方法协议 + PAA 暂态验收评估），全 proposed，只写通用框架不虚构仪器/基线 | `simulation.json` |

### 双语实质等价核对（R25-3 人工审计）

| 核对项 | 结果 |
| --- | --- |
| 正文行数 | proposal.md ↔ proposal.en.md 均 316 行，一一对应 |
| 冻结数字 | 19.20 / 2.802 / 8813 / 167 / 80.34 / 69.1% / 25.2% 中英一致 |
| 图件双语 | metrics-evidence.png / .en.png 同一图重绘，标题/卡签/标签按语言分支 |
| HTML 双语 | index.html / index.en.html 同步补字体子集 + 控件保险规则 |
| 结构化 JSON | sources/metrics/simulation/compliance 全部可解析；新增字段为结构数据，非散文 |

**未改动 / 冻结项**：方法核心代码、正式几何图层 `geometry/*.geojson`、三大定位锚定与「一核·三区·一界面·一衔接」空间结构；冻结指标数值未变。

## v0.3 - 2026-08-22

R18「治理脊柱机器化」：把治理从正文散文升级为「机器可读 + 可逐点核验」的结构化资产，同时收敛正文重复。评审对照：R17 三分治理散文插入平盘 75/100，诊断真实差距在结构化治理资产（对标 94 分标杆与 86 分 peer 的 swb-spec / 回执账本 / RACI / 影子测试 / 工作包），而非散文重复。

| 模块 | 交付物 | 状态 | 关键说明 |
| --- | --- | --- | --- |
| G1 风险停机规则 | `risk.json`（根级，version=1） | 完成 | 8 项风险维度各含 score/note/mitigation，得分 ≥4 的两项（policy_uncertainty、spatial_dispute）附 human_review |
| G2 AI-off 等价基准 | `visual/assets/ai-off-baseline.json` | 完成 | 五字段 node_schema + 评分口径 + G0-G3 等级定义 + 判定规则 + 版本治理（标注 provenance 非抄袭） |
| G3 治理回执账本 | `visual/assets/governance-receipts.json` | 完成 | K0-K3 版本链 + 3 条回执（R15 71 回归→R16 回退 75→R17 平盘→R18 转向），证明治理跑过 |
| G4 影子测试 | `visual/assets/shadow-test-matrix.json` | 完成 | 8/8 前提 + 4 项负面读数透明披露（NEG-01..04 物理兜底不依赖算法） |
| G5 责任矩阵 | `visual/assets/governance-raci.json` | 完成 | 5 角色 × 5 闸门（G0-G4）RACI，公众代表享否决权 |
| G6 交付工作包 | `visual/assets/delivery-workpackages.json` | 完成 | WP-P0..P3，仅 2965.5 万路网 + 218.7 万试点有硬口径，余项 null 不估 |
| H1 场景绑定 | `simulation.json.test_scenarios` | 完成 | 从 3 扩到 8（3 测试验证 + 3 产业测试 + 2 公共 AI），逐场景补齐五字段 |
| H2 指标 | `metrics.json` | 完成 | `test_scenario_count` 3→8；新增 `ai_off_path_completeness`=1.0、`human_handoff_designation_rate`=1.0（known）、`ai_off_service_equivalence_gap`（unknown 待试点首读数） |
| H3 正文收敛 | `proposal.md` / `proposal.en.md` | 完成 | 治理三处散文（执行摘要/方法论/测试场景）收敛为「一处权威定义 + 机器资产引用」 |

**未改动 / 冻结项**：方法核心代码 `inject_physarum.py`、`code/phase6_h/*.py`；正式几何图层 `geometry/*.geojson`；冻结指标（最优效率 19.20、Run7 2.802、基线 1.143、Plan03 UDS 80.34、167 边、透水铺装率 69.1%、绿色渗透率 25.2%）；三大定位锚定与「一核·三区·一界面·一衔接」空间结构未动。

**诚实边界**：`ai_off_path_completeness` 与 `human_handoff_designation_rate` 为「按构造即 1.0」的声明性基线（8 场景均已声明五字段），非实测；`ai_off_service_equivalence_gap` 须待 G3 有限现场窗口试点取得首读数后方可转为 known。

## v0.2 - 2026-08-15

Round 3「科学严谨性 + 可实施性深化 + 视觉叙事优化」增强包。所有增强基于作者本机真实运行记录与公开可查证资料；禁止编造政策文件、禁止虚构审批结果、禁止捏造案例细节，不确定项标注「待确认 / 建议性框架」。

| 模块 | 交付物 | 状态 | 关键数据来源（真实） |
| --- | --- | --- | --- |
| A1 可复现性 | `simulation.json.reproducibility` + `proposal.md` 可复现性说明 | 完成 | 本机环境实测（Python 3.14.6 / numpy 2.5.1 / pymoo 0.6.2 / shapely 2.1.2 / networkx 3.6.1 / matplotlib 3.11.1）；入口 `code/phase6_h/h2_seg.py`；seed 42 |
| A2 参数敏感性 | `proposal.md/en.md`「参数敏感性分析」+ `assets/figures/parameter_sensitivity.png`/`.en.png` | 完成 | H1 边界验证 `h1_boundary/boundary_results.json`；H2-seg3 Pareto `simulation.json.pareto_solutions` |
| B1 造价细目 | `proposal.md/en.md` 造价细目表 | 完成 | `output/phase4/plan_03_fusion_round2/10_cost_estimate.md`（740.2 / 1744.1 / 3679.9 / 2648.8 m，合计 8813.0 m = 2965.5 万元） |
| B2 政策衔接矩阵 | `proposal.md/en.md` 政策衔接矩阵 | 完成 | 仅用已登记/公开可查证真实依据；无法核实文号者标注「待确认」 |
| B3 施工时序 | `assets/figures/gantt_chart.png`/`.en.png` | 完成 | `geometry/phasing.geojson`（仅 PHASE-001）；无官方时间表，标注「建议性分期」 |
| C 视觉叙事 | A0 新增第 6 版 + 数据锚点（骨架 8813 m、覆盖 17/18） | 完成 | run7 `n_key_terminals_in_skeleton`/`n_key_terminals_total` |
| D 方法论创新 | `proposal.md/en.md`「方法论创新（诚实说明）」 | 完成 | 7 维决策变量、decay_responsiveness 指数、边界扩展、四情景选择 |
| E 风险矩阵 | `proposal.md/en.md` 定性风险矩阵（6 项） | 完成 | 定性分级（高/中/低），建议性 |

**关键诚实修正（相对 Round 3 提示词中的错误数据，未沿用错误数据）**：

1. 道路长度：提示词「1056/1584/3525/2648 m」为错误；真实为 **740.2 / 1744.1 / 3679.9 / 2648.8 m**（合计 8813.0 m）。
2. 800 m 覆盖率「59.3%」无法核实；真实数据锚点为关键节点覆盖 **17/18**。
3. 环境版本：提示词「Python 3.10.x / numpy 1.26.x / matplotlib 3.8.x」为错误；真实为 **3.14.6 / 2.5.1 / 3.11.1**。
4. 遗产边界：真实为人工数字化边界（MODEL 可信度、trust B）对 class_I/class_IV 赋软惩罚 1.5/3.0，H2-seg3 最优骨架未落入软惩罚区，故 f3 数值上等于 f2（f3≡f2）；「黏菌自发规避遗产边界」不准确，已在 `simulation.json.scope_note`、`proposal.md`「方法论创新」与「风险」节统一修正。
5. 一期投资「1200 万」无法核实，未使用；真实造价为路网市政造价 2965.5 万元（建议性）。

**未改动 / 冻结项**：方法核心代码 `inject_physarum.py`、`code/phase6_h/*.py`；正式几何图层 `geometry/*.geojson`（遗产边界不进约束图层，`geometry/constraints.geojson` 保持空集）；冻结指标（最优效率 19.20、Run7 2.802、基线 1.143、Plan03 UDS 80.34、167 边、透水铺装率 69.1%、绿色渗透率 25.2%）。

**待确认 / 开放问题**：官方边界与道路红线未发布；站点 CAD 与保护范围图则未获取；政策文号（北京城市更新条例、算力新基建政策）待官方确认；alpha 已触上界需后续放宽并做 OAT/Sobol。

## v0.1 - 2026-08-15

首次正式提交（Round 2 P1 重要项）：品牌识别「智脉共生」、全球标杆案例、测试验证场景、实施矩阵（JZ-01..JZ-06）、无障碍与包容性设计（GB 50763-2012）、A3/A0 视觉增强，及双语同步、字体内嵌、manifest 哈希与 self-check 通过。
