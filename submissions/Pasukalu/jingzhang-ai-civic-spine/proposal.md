---
title: "京张AI公民脊线 / Jing-Zhang AI Civic Spine"
author_github: "Pasukalu"
language: "zh"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.en.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "基于 provisional boundary 和结构化自检要求生成的 formal AI 城市设计方案包;保留精度警示和复算要求,但组织方数据缺口不阻断内容评分。"
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# 京张AI公民脊线 / Jing-Zhang AI Civic Spine

## 设计依据与资料清单

本 formal 方案以北京市规划和自然资源委员会海淀分局发布的《百年京张AI创新带城市设计国际方案征集资格预审公告》为第一依据,并以 `brief/site-package/` 中经维护者登记的临时粗略边界、重点区域、枚举、指标和来源清单为机器可读依据。AI agent 在生成方案前必须读取 `design_brief.json`、`allowed_design_space.json`、`sources.json`、`enums/`、`ranges/`、`schemas/`、`data/source_registry.json` 和 `data/processed/agent_fact_pack.md`,并用 `project_scope_summary.csv`、`agent_task_requirements.csv`、`source_use_matrix.csv`、`missing_data_checklist.csv` 建立任务、范围、资料用途和缺口清单。所有设计判断都要拆分为可追溯来源、可复算指标、可校验图层和可人工复核假设。公告要求方案达到控制性详细规划的城市设计深度和规划综合实施方案的城市设计深度,因此文本叙述不能替代 GeoJSON、指标表、A3 文册、A0 展板和 HTML 电子展示成果。

方案不是独立愿景文本,而是从公告、面向智能体任务书和场地资料出发组织成果;本节只把最关键依据放在判断旁边 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]。完整来源和标准覆盖分别保存在 `sources.json`、`standard_matrix.json` 与 `design_depth_matrix.json`,不在正文重复机器索引。

资料登记表的使用边界如下 [source:SOURCE-REGISTRY]:

- data/source_registry.json 登记公开、清权与临时资料的用途边界。
- 当前登记摘要:formal 可用资料 7 条,背景资料 1 条,provisional-only 资料 1 条。
- agent 不得把 background_only 或 provisional_only 资料升级为 official boundary、法定控规、正式评分依据或政府实施承诺。

`data/processed/agent_fact_pack.md` 是本方案的阅读导航层,不是新的权威来源 [source:PROCESSED-FACT-PACK]。它帮助 agent 把三层范围、三处重点区、公告任务、agent.1-agent.6、资料可用性和缺资料事项组织成可读方案;事实判断仍需回到已登记的原始材料 [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK],完整来源关系由 `sources.json` 保存。

![资料证据链与提交包关系图](assets/figures/site-overview.png)

本脚手架在官方 `SITE_BOUNDARY` 或三处 `KEY_AREA` 尚未取得时,使用 `brief/site-package/geometry/provisional_boundaries.geojson` 生成临时 formal 包。提交包中的 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 均必须标注为 `provisional_constraint`、`official_boundary=false`,只能用于方案生成、自检、可视化和设计讨论,不能作为 official redline、审批依据、精确面积依据或法定控制结论。该组织方数据缺口本身不阻断内容评分;替换 official polygons 后,site boundary、key areas、land use、roads、green space、public space、buildings、phasing 和 metrics 均需重算。

本次脚手架生成的可评分状态为:**临时边界,保留精度警示并待正式数据发布后复算;不阻断内容评分**。因此,正文中的空间结构、场景、项目和指标均按"可讨论、可复核、可替换官方边界后重算"的原则写入;当官方边界和重点区 polygon 更新后,agent 必须重新运行脚手架、自检和图纸/HTML生成,不能只替换单个文件。

边界解释可回到总体范围图层和面积复算 [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]。三处重点区则由独立图层和数量指标核对 [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]。这意味着读者可以从正文进入证据,但不必先读一串机器编号。

## 三层范围工作框架

方案按照公告确定的三个层次组织工作:统筹研究范围关注 43.6 平方公里的AI产业生态、战略定位、创新链和未来城市形态;总体设计范围关注 11.4 平方公里京张遗址公园周边 1-2 公里城市地区和产业区,要求形成城市更新总体框架、产业空间布局、交通市政支撑和城市风貌控制;重点区域范围关注 368.4 公顷三处详细设计地区,要求明确功能业态、建筑规模、拆改留分类、公共空间连通和交通组织。三层范围在 `compliance_matrix.json` 中逐条映射,保证公告 1.3、1.4、1.5 与 agent.1-agent.6 的必选任务都有章节、图层、指标、图纸和 HTML 证据。

三层工作框架的深度项由 [depth:three_level_scope_framework] 和 [depth:overall_spatial_structure] 约束,空间证据以 [data:geometry/site_boundary.geojson#SITE-001] 与 [data:geometry/key_areas.geojson#PROV-KEY-001] 为准,任务依据以 [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] 为准,范围索引以 [source:PROCESSED-FACT-PACK] 中 `project_scope_summary.csv` 的三层范围表为导航。

![三层范围与空间工作框架图](assets/figures/land-use-structure.png)

三层工作不是互相割裂的图纸集合。统筹研究决定产业链和城市形态判断,总体设计把判断落实到更新项目、空间结构和设施承载,重点区域详细设计验证具体地块、建筑、交通、公共空间和AI应用场景的可实施性。agent 生成方案时必须先锁定当前提交采用的 official 或 provisional 边界和约束,再生成用地、建筑、道路、绿地、公共空间、分期和AI服务节点,最后从这些图层复算指标并在正文解释哪些结论仍受 provisional boundary 限制。任何无法从结构化数据复算的面积、比例、规模或项目数量,不得写入正式结论。

本方案提出**"京张AI公民脊线"(Jing-Zhang AI Civic Spine)**的核心概念:将京张铁路遗址公园视为一条从历史走向未来的"公民脊线"--它不仅是物理空间上的南北轴线,更是AI时代城市治理、创新生态和公共生活的神经中枢。脊线串联众智园(自主创新加速)、AI原点社区(成果转化与人才)和大钟寺(产业与国际交往)三个核心节点,向东通过小月河场景赋能翼连接生活场景,向西通过中关村科技服务翼链接资本与知产服务。

命名体系:"公民脊线"取意三重--**公**共利益优先、**民**生为本、**脊**梁承重。英文 Civic Spine 同时传达公民性和结构性。视觉识别方向建议以京张铁路人字形轨道为母题,结合电路板走线意象,形成可延展的模块化Logo系统,适用于路牌、APP、活动海报和荣誉墙。

| 层级 | 设计问题 | 方案回答 | 数据落点 |
| --- | --- | --- | --- |
| 统筹研究范围 | AI产业生态和未来城市形态如何组织 | 建立"高校策源-开源协作-企业转化-公共体验-国际传播"的创新链 | compliance_matrix.json、standard_matrix.json |
| 总体设计范围 | 产业空间、城市更新、交通市政和风貌如何落图 | 用地、建筑、道路、绿地、公共空间和分期图层共同表达 | [data:geometry/land_use.geojson#LU-001]、[data:geometry/roads.geojson#ROAD-001] |
| 重点区域范围 | 三处片区如何达到详细设计深度 | 分别提出定位、空间动作、AI场景和实施依赖 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003] |

## 统筹研究范围产业与未来城市研究

统筹研究范围的核心任务是构建世界级 AI 创新生态体系。方案应梳理海淀高校院所、头部企业、算力算法数据要素、孵化平台、上市企业、独角兽和科技服务资源,提出AI创新链、产业链、人才链和城市服务链的空间协同框架。命名方案和 logo 设计应服务于"百年京张文化带、都市AI生活体验带、AI融合创新带"的整体辨识度,不能只停留在口号,应说明与产业生态、公共空间和文化资源的关联。面向智能体任务书还要求回应"五大功能"和"三区两翼"协同,形成可继续深化的命名系统、视觉识别、总体空间结构图、场景开放和运营机制;本节必须用 [source:AGENT-TASKBOOK] 与 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] 标注这些要求来自 agent 开源征集任务,而不是法定规划控制。

统筹研究并不新增伪精确红线;它通过 [standard:MOHURD-URBAN-DESIGN-MEASURES] 要求的城市风貌、公共空间和建筑布局统筹,回接 [data:geometry/land_use.geojson#LU-001]、[data:geometry/public_space.geojson#PUBLIC-001] 与 [depth:overall_spatial_structure],说明产业策略最终要落到可见、可复核的空间结构。

未来城市形态研究应回答人工智能如何改变工作、生活、社交、学习、交通和公共服务。方案应把AI交通系统、连续绿色空间、创新服务设施和国际化生活工作氛围落实为可定位的功能区、节点、廊道和场景,而不是泛泛描述技术愿景。agent 应把产业战略指标、AI创新指数、人才密度、空间供给类型和AI+垂直应用重点区域写入指标体系,并标明哪些是官方、哪些是设计建议、哪些仍待正式数据校准。若提出全球AI创新活动、开发者社区、开放场景或朝圣路线,应写为"概念建议/参考方案/可供专业团队深化研究",不得写成已经确定的政府活动或实施安排。

### 全球AI创新生态案例研究（agent.2）

本方案研究了8个全球AI创新生态案例，提炼可转化为空间、运营和场景机制的经验：

| 案例 | 城市 | 核心经验 | 空间转化启示 |
|------|------|----------|-------------|
| King's Cross | 伦敦 | 铁路遗产更新、Google Campus、中央圣马丁、12年持续运营 | 铁路遗产与科技共生，公民脊线主轴直接参考 |
| Silicon Valley | 圣何塞 | 校企旋转门、风险资本密集、开源文化 | 校园-社区-产业无界融合，众智园参考 |
| Kendall Square | 波士顿 | MIT创新区、生物医药密集、步行尺度 | 研究机构与公共空间高密度交织，AI原点社区参考 |
| Shibuya Q-WA | 东京 | AI城市实验室、数据驱动公共空间 | 公共空间作为AI测试场，小月河场景赋能翼参考 |
| Digital Media City | 首尔 | 数字媒体产业集群、公共文化设施联动 | 产业与文化设施并重，大钟寺国际交往节点参考 |
| One-North | 新加坡 | 生物医药+科技混合、One-North公园绿地一体化 | 产业与绿地公园一体化，蓝绿系统参考 |
| 南山科技园 | 深圳 | 产业链完整、政府引导、企业主体 | 全栈产业链空间组织，中关村科技服务翼参考 |
| 中关村现有生态 | 北京 | 高校密集、创业活跃、政策先行 | 在地经验直接延续，两翼赋能参考 |

这些案例的共同启示是：成功的AI创新生态需要研究机构、公共空间、产业空间和生活空间的高密度混合，需要连续的步行和骑行网络，需要文化叙事来凝聚身份认同，需要长期的社区运营而非一次性建设。King's Cross 的铁路遗产更新经验对京张遗址公园尤其直接相关——其12年分阶段更新、历史建筑激活与新建混合、公共空间作为社区粘合剂的做法，为公民脊线的分期实施提供了可借鉴的路径 [source:AGENT-TASKBOOK]。

### AI创新生态图谱

AI创新生态图谱将上述经验转化为四个维度：基础研究层（高校、实验室、开源社区）、产业孵化层（加速器、联合办公、中试空间）、资本服务层（VC、政策基金、科技服务）和场景应用层（测试场地、展示空间、公共体验）。四层在空间上分别对应众智园的研发用地、AI原点社区的孵化空间、中关村科技服务翼的资本服务和小月河场景赋能翼的场景测试 [depth:industry_space_mapping]。

图谱还梳理了人才、科研、产业、算力、数据和场景六类要素的流动关系：高校输出人才和基础研究→孵化平台承接转化→产业空间承载企业成长→资本服务加速规模化→场景应用验证和迭代。这一链条在空间上表现为从众智园→AI原点社区→大钟寺→小月河翼的串联流动，与公民脊线的空间结构高度吻合 [source:AGENT-TASKBOOK]。

### 三区两翼协同框架

基于案例研究和生态图谱，本方案提出三区两翼协同框架：

- **众智园（自主创新加速）** ↔ 基础研究层：承接清华、北航等高校科研转化，对标 Kendall Square 的研究-公共空间高密度交织模式。
- **AI原点社区（成果转化与人才）** ↔ 产业孵化层：提供孵化器、联合办公和人才生活空间，对标 King's Cross 的多功能混合更新。
- **大钟寺（产业与国际交往）** ↔ 资本服务层 + 场景应用层：承载VC、科技服务和国际路演，对标 Digital Media City 的产业-文化联动。
- **小月河场景赋能翼** ↔ 场景应用层：AI+生活场景测试和公共体验，对标 Shibuya Q-WA 的数据驱动公共空间。
- **中关村科技服务翼** ↔ 资本服务层：链接中关村现有资本、知产和服务生态，对标南山科技园的产业链组织。

区域协同方面，方案概念建议与北纬社区（生活服务补充）、未来科学城（能源与AI交叉）、怀柔科学城（大科学装置与基础研究）、经开区（产业化落地）和京津冀（区域算力与数据要素流通）建立合作接口，具体合作模式有待正式协商，不构成已确定安排 [source:AGENT-TASKBOOK]。

## 总体设计范围城市更新与控规深度城市设计

总体设计范围要求达到控制性详细规划的城市设计深度。方案必须提出城市更新总体空间结构、低效空间识别、更新项目清单、实施政策建议、产业功能比例、空间组织模式、建筑总规模和综合承载能力评估。`geometry/land_use.geojson` 应完整覆盖设计边界且无重叠,`geometry/buildings.geojson` 应表达更新建筑基底或保留建筑基底,`geometry/roads.geojson` 应表达微循环、慢行和轨道接驳关系,`metrics.json` 应复算核心面积、比例和图层数量。

本节按照 [standard:MOHURD-CONTROL-DETAILED-PLANNING] 把控规深度内容拆成可审查对象:[data:geometry/land_use.geojson#LU-001] 表达用地结构,[data:geometry/buildings.geojson#BLDG-001] 表达建筑基底,[data:geometry/roads.geojson#ROAD-001] 表达交通组织,[metric:building_footprint_area_sqm] 用于复核建筑基底面积,[depth:land_use_layout] 与 [depth:development_intensity_controls] 约束成果深度。

总体设计还必须支撑交通、轨道、市政和配套设施。方案应围绕轨道站点一体化、道路微循环、非机动车停放、停车供给、创新服务平台、人才生活服务、新型基础设施、分布式能源和端侧算力提出空间布局和实施路径。涉及建筑高度、开发强度、道路红线、退线和设施标准的内容,若尚无官方控制条件,应写为"待正式控规条件确认",不得以 agent 推测值冒充审定指标。

## 重点区域详细设计

重点区域详细设计是必选项。众智园AI自主创新加速区应围绕国家人工智能平台、全栈自主创新、标准制定、安全治理、产业展示、对外交通、清河文化、低碳绿色创新交往环境和绿色空间AI场景提出详细方案。北京AI原点社区应围绕近校创新、成果孵化转化、人才特区、开源体系、品牌活动、建筑拆改留、成果展示发布、居住生活配套、校区园区慢行联系和轨道站点一体化提出详细方案。大钟寺AI产业聚集区应围绕领军企业、智能体、智能终端、内容消费、数据要素、数字资产、商业服务、规划绿地复合利用、大钟寺站一体化和路口四象限步行连通提出详细方案。

三处重点区域详细设计必须引用 [data:geometry/key_areas.geojson#PROV-KEY-001]、[data:geometry/key_areas.geojson#PROV-KEY-002]、[data:geometry/key_areas.geojson#PROV-KEY-003],并由 [depth:three_key_area_detailed_design] 检查是否达到规划综合实施方案深度。若只描述"打造示范区"而没有功能、建筑、交通、公共空间和实施项目证据,应被视为未完成。

![三处重点区域索引与设计任务图](assets/figures/key-areas.png)

三处重点区域必须在 `geometry/key_areas.geojson` 中出现。若仓库已提供 official polygons,应作为 `official_constraint` 使用;若 official polygons 缺失,可暂用 `provisional_constraint`,但正文、HTML、sources、assumptions 和 self_check 必须说明它不能作为正式评分或审批依据。`compliance_matrix.json` 应分别覆盖公告 1.5.3.1、1.5.3.2、1.5.3.3。设计表达应包含功能业态、建筑规模、建筑形态、拆改留分类、公共空间系统、交通组织、慢行连通和实施项目。HTML 页面应能切换查看三处重点区域,A3 文册和 A0 展板应至少包含重点片区总图、局部详图和指标说明。

| 重点片区 | 设计定位 | 空间动作 | AI产业与运营场景 | 证据引用 |
| --- | --- | --- | --- | --- |
| 众智园AI自主创新加速区 | 花园型全栈自主创新街区 | 强化清河界面、产业展示、低碳创新交往和对外交通组织;以绿色空间承载开放测试与标准治理展示 | 自主模型测试、标准制定工作坊、安全治理展示、低碳算力体验 | [data:geometry/key_areas.geojson#PROV-KEY-001]、[depth:three_key_area_detailed_design] |
| 北京AI原点社区 | 近校型成果转化与人才社区 | 组织校区、园区、街区慢行缝合;补足成果发布、人才服务、居住生活和开源协作空间 | 开源社区、成果发布、人才特区服务、近校孵化 | [data:geometry/key_areas.geojson#PROV-KEY-002]、[source:AGENT-TASKBOOK] |
| 大钟寺AI产业聚集区 | 城市型智能经济与国际交往街区 | 围绕大钟寺站一体化、四象限步行连通、商业服务和重点企业公共环境更新 | 智能体与智能终端展示、内容消费、数据要素与国际路演 | [data:geometry/key_areas.geojson#PROV-KEY-003]、[metric:key_area_count] |

## AI 创新生态、人才画像与 AI+ 场景

方案应建立面向AI人才和企业的空间需求画像,覆盖研发办公、开源协作、成果发布、企业服务、人才居住、社交学习、消费生活、运动休闲和国际交往。AI+场景应围绕公告提出的交通、服务、消费、医疗、教育、法律、生活服务等方向,形成产业发展场景和AI赋能城市功能场景。每个场景应说明服务对象、空间位置、数据来源、隐私边界、人工复核机制和运营主体。

AI 场景必须落到空间和治理边界:公共空间场景引用 [data:geometry/public_space.geojson#PUBLIC-001],慢行与交通场景引用 [data:geometry/roads.geojson#ROAD-001],开放空间场景引用 [data:geometry/green_space.geojson#GREEN-001] 和 [metric:public_space_ratio]、[metric:green_ratio]。这些引用让评审者知道场景不是口号,而是位于具体图层和指标中的设计对象。面向智能体任务书要求不少于10张AI场景卡、不少于3个产业测试验证场景和不少于5类用户画像;脚手架只给出结构,正式参赛者必须把场景卡、画像表、隐私边界、人工复核和运营主体写入正文、HTML、A3/A0 和合规矩阵。

| 用户画像 | 典型需求 | 空间响应 | 自检边界 |
| --- | --- | --- | --- |
| 开源开发者 | 发布、协作、测试、社区声誉 | 原点社区开源发布厅、公共代码墙、夜间协作空间 | 不采集个人行为轨迹;活动数据只做聚合统计 |
| 初创团队 | 低成本办公、算力入口、产品试验场 | 众智园共享测试场、端侧算力服务点、标准治理咨询 | 算力和数据服务需另行授权 |
| 头部企业访客 | 展示、商务、国际接待、人才招聘 | 大钟寺国际路演客厅、轨道站点接驳、重点企业周边公共空间 | 企业标识和案例须清权 |
| 周边居民 | 通勤、休闲、社区服务、低扰动更新 | 京张遗址公园慢行环、社区服务嵌入、夜间照明和活动分级 | 不将居民画像用于商业推荐 |
| 高校师生 | 成果转化、跨校协作、日常慢行 | 校区-园区慢行缝合、成果转化驿站、AI教育体验点 | 校园数据和科研成果需授权 |

| 场景卡 | 空间载体 | 设计说明 |
| --- | --- | --- |
| 01 开源发布厅 | 北京AI原点社区 | 面向高校、开源社区和初创团队,提供成果发布、代码贡献展示和小型路演空间。**产业测试验证场景**:开源模型合规发布流程验证 |
| 02 安全治理沙盒 | 众智园 | 将标准制定、安全评测、模型红队测试转译为可参观、可预约、可监管的展示和协作节点。**产业测试验证场景**:AI安全标准测试与认证 |
| 03 端侧算力驿站 | 总体设计范围节点 | 与公共服务、企业服务和低碳能源策略结合,作为待深化的新型基础设施原型 |
| 04 AI慢行导航 | 京张遗址公园活力带 | 用可解释导视和低侵入传感帮助识别慢行断点、拥挤节点和无障碍需求 |
| 05 大钟寺国际路演客厅 | 大钟寺AI产业聚集区 | 服务智能体、智能终端和内容消费企业的展示、洽谈、媒体发布和国际交流 |
| 06 清河低碳创新廊 | 众智园临清河界面 | 把绿色空间、雨洪、步行骑行和AI展示结合,作为园区公共客厅 |
| 07 近校成果转化街 | 北京AI原点社区 | 面向高校成果转化,组织孵化、展示、法务、知识产权和投融资服务 |
| 08 数据要素会客厅 | 大钟寺片区 | 以合规、授权、可审计为前提，展示数据要素和数字资产流通的城市服务界面。**产业测试验证场景**：数据要素合规流通测试 |
| 09 AI生活服务样板街 | 社区与商业交汇处 | 将医疗、教育、法律、生活服务等AI+场景落到可运营的小尺度街区空间 |
| 10 全球AI活动周路线 | 一带公共空间系统 | 形成从遗址文化、开源社区、产业展示到国际路演的可步行、可传播体验路线 |

agent 生成的AI治理建议必须遵守数据最小化、公开来源、可解释和人工复核原则。城市智能体可以辅助识别慢行断点、公共空间热力、设施维护、企业服务需求和活动安全风险,但不能替代规划审批、不能输出未经授权的个人画像、不能声称获得官方实施承诺。所有AI场景节点应进入结构化图层或合规矩阵,便于评审者看到它们与产业、空间和公共利益之间的关系。

## 用地、建筑规模与拆改留方案

用地方案应依据国土空间调查、规划、用途管制分类等公开标准表达,形成完整、闭合、无缝的用地分区。建筑方案应区分保留、改造、更新、新建或待确认对象,明确建筑基底、功能、规模、风貌、屋顶、体量和高度控制的建议层级。若缺少现状建筑、权属、控规和工程条件,方案只能提出方法和待校准清单,不能编造拆改留结论。

用地分类依据 [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE],建筑高度、体量、界面和风貌控制由 [depth:height_massing_character] 管理,拆改留方法由 [depth:retain_renovate_demolish] 管理。用地和建筑的主要证据是 [data:geometry/land_use.geojson#LU-001]、[data:geometry/buildings.geojson#BLDG-001] 和 [metric:building_footprint_area_sqm]。

建筑规模和强度指标必须与 `metrics.json` 和图层一致。若总建筑规模、容积率、建筑高度、建筑密度、绿地率、退线和建筑控制线缺少官方条件,应在指标体系中列为 unknown 或 pending_control,不得用固定数值制造精确感。A3 文册应给出更新项目清单和指标复核表,A0 展板应把关键空间结构和重点片区表达清楚,HTML 页面应提供指标和图层联动查看。

## 交通、轨道、市政与公共服务设施

交通方案应回应公告对轨道站点一体化、道路微循环、慢行断点、对外交通、停车、非机动车停放和绿色交通系统的要求。重点应覆盖北五环、京张遗址公园跨环路节点、五道口、清华东路西口、大钟寺站及重点企业周边交通联系。道路和慢行图层应保持在提交边界内,并与公共空间、绿地、产业节点和重点片区相互校核;若提交边界为 provisional,交通结论也只能作为临时设计讨论。

交通和市政专业深度分别由 [depth:traffic_rail_slow_parking] 与 [depth:municipal_new_infrastructure] 约束;图层证据引用 [data:geometry/roads.geojson#ROAD-001]、[data:geometry/public_space.geojson#PUBLIC-001] 和 [data:geometry/constraints.geojson#CONSTRAINTS]。当道路红线、管线、消防和市政条件缺失时,应通过 assumptions 说明待补,而不是把策略写成审定条件。

![交通慢行与蓝绿公共空间复合系统图](assets/figures/mobility-bluegreen.png)

市政和公共服务设施应覆盖AI产业服务设施、创新服务平台、人才生活服务设施、新型基础设施、分布式能源、端侧算力和传统市政设施融合。方案应说明设施标准、空间布局、服务半径、运营模式和分期实施逻辑。缺少管线、能源、排水、防洪、消防等工程资料时,应列为正式深化前置条件。

## 蓝绿空间、公共空间与城市风貌

蓝绿空间方案应以京张遗址公园活力带为骨架,统筹清河、小月河、周边高校、企业、社区出行需求,提出南北贯通、东西连通的步道、骑行道和绿色空间体系。方案应识别慢行断点、上跨环路节点、公园南端和北端景观节点,提出停车、体育、创新交往、科技测试、应用展示和公共服务复合利用策略。

蓝绿公共空间由设计深度项和绿地、公共空间图层共同校核 [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]。绿地与公共空间比例在正文解释设计意义,完整复算保存在 `metrics.json`;城市风貌、公共空间和建筑控制的统筹则回到专业标准矩阵 [standard:MOHURD-URBAN-DESIGN-MEASURES]。

城市风貌方案应融合京张铁路历史文化、中关村创新文化和AI创新文化,利用清华园火车站、北影等文化资源,提出城市基调、建筑风貌、屋顶形态、体量、界面和公共艺术引导。agent 还应提出导视标识、文化符号、国际传播叙事、AI朝圣地标、贡献墙或荣誉展示体系,但所有品牌、字体、图像、肖像和企业标识都必须有清权来源。风貌控制应分清官方管控、设计建议和待确认条件,严禁在没有文保或控规依据时给出伪精确控制线。

## 更新项目清单、实施政策与分期计划

实施方案应形成可审查的更新项目清单,说明项目位置、类型、功能、责任主体、依赖条件、实施阶段、风险和评估指标。政策建议应覆盖城市更新统筹实施、空间供给、运营机制、产业服务、公共参与、数据治理和产权协同。`geometry/phasing.geojson` 应表达分期范围,`compliance_matrix.json` 应把每个任务与分期和图纸挂接。

项目清单和分期深度由 [depth:renewal_project_list] 与 [depth:phasing_implementation] 管理,分期空间证据为 [data:geometry/phasing.geojson#PHASE-001]。如果没有权属、资金、实施主体和审批路径,方案必须把它写成实施风险,而不是承诺落地。

| 项目编号 | 项目名称 | 类型 | 主要依赖 | 证据引用 |
| --- | --- | --- | --- | --- |
| JZ-01 | 京张遗址公园慢行断点缝合 | 公共空间/交通 | 道路红线、桥下空间、交通组织复核 | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | 众智园清河创新界面 | 蓝绿空间/产业展示 | 河道蓝线、生态和防洪条件 | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | 原点社区近校成果转化街 | 城市更新/产业服务 | 校区边界、权属、首层业态 | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | 大钟寺站四象限步行连通 | 轨道一体化/慢行 | 轨道站点、道路交叉口、市政管线 | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI公共服务与端侧算力节点 | 新基建/公共服务 | 能源、算力、安全和运营主体 | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | 全球AI活动周公共路线 | 运营/品牌 | 公共空间许可、活动安全、版权清权 | [data:geometry/phasing.geojson#PHASE-001] |

分期应与 100 天征集设计周期形成区分:征集周期是提交成果的时间要求,实施分期是城市更新和项目建设的推进路径。方案应提出近期试点、中期更新和长期治理框架,并标明哪些内容可先以轻量设施、运营活动和服务平台启动,哪些必须等待正式控规、市政、交通和权属条件确认。对于年度活动体系、开发者社区运营、场景开放日、公共体验路线和国际传播机制,正文应说明运营对象、频率、责任边界、转化路径和风险,不得只写宣传口号。

## 指标体系、面积复算与合规矩阵

指标体系至少应包含总体设计范围面积、重点区域面积、绿地与公共空间比例、建筑基底、更新项目数量、AI场景节点、慢行连通指标、产业空间指标、人才服务指标和自检状态。所有 known 指标必须能从 GeoJSON 或可信来源复算;unknown 指标必须给出原因和正式提交前置条件。`scripts/spatial_review.py` 和 `scripts/visual_review.py` 的结果是 formal 自检的重要证据。

指标复算遵循统一的设计深度要求 [depth:metrics_recalculation]。正文重点解释指标的设计含义,例如总体范围如何约束空间分配、蓝绿和公共空间比例如何支撑日常交往;完整数值、公式、来源文件和置信度保存在 `metrics.json`。示例关键指标可由总体范围和绿地数据复核 [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001]。

![核心指标复算与证据链图](assets/figures/metrics-evidence.png)

合规矩阵是任务响应性的主控文件。每条公告任务和 agent_taskbook 任务必须对应到报告章节、图层、指标、图纸、HTML 页面、来源、假设和自检项。未能覆盖公告 1.3、1.4、1.5 或 agent.1-agent.6 的任一必选任务,方案不得进入 formal professional scoring。

正式深化时,agent 还应把每个指标分为三类:第一类是可由提交几何直接复算的空间指标,例如边界面积、绿地比例、公共空间比例、建筑基底面积和分期面积;第二类是需要官方控规或任务书附件支撑的管控指标,例如容积率、建筑高度、建筑密度、退线、道路红线和设施标准;第三类是需要运营或产业数据持续校准的绩效指标,例如 AI 创新指数、人才密度、产业服务满意度、慢行可达性、活动参与度和场景使用频次。三类指标应分别进入 `metrics.json`、`assumptions.json` 和 `compliance_matrix.json`,避免把运营愿景误写成审定规划条件。

## 风险、版权与合规说明

**要求双语言。** 方案主文件可使用中文或英文,但必须通过 `proposal.en.md` 或 `proposal.zh.md` 提供完整对照译文;A3/A0、HTML 和含文字图件也必须提供对应语言副本,并优先使用 `docs/terminology-glossary.md` 的赛事推荐译法。v2 包缺少任一必需译稿、语言映射或有效文件时,finalize 与 CI 会阻断提交。所有图片、图纸、图标、数据和代码资产必须在 `sources.json` 或 `report/copyright_statement.md` 中说明来源、许可和授权状态。HTML 页面不得加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API,不得跟踪评审者行为。

风险和缺资料清单由风险深度项、约束图层和场地包共同校核 [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]。`missing_data_checklist.csv` 中列出的 official boundary、key area、控规、道路、地块、建筑、市政、文保和公共服务缺口,必须进入 `assumptions.json`、自检和正文风险章节。任何缺少官方控规、道路红线、权属、市政、消防或文保条件的结论,都必须降级为待确认事项;完整专业核对保存在标准矩阵中。

本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施。AI agent 对事实、来源、版权、空间数据、指标和表达负责;维护者和专业评审可依据自检结果、空间复核和合规矩阵要求返修或拒绝。

## 参考资料

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- 完整机器索引:见 `sources.json`、`metrics.json`、`compliance_matrix.json`、`standard_matrix.json` 与 `design_depth_matrix.json`
- 本节书目入口依据场地包登记,完整出处和许可见结构化来源清单 [source:SITE-PACKAGE]

## AI 公共空间、朝圣地标与智能原生新业态（agent.4）

京张遗址公园AI公共空间系统以"开发者散步道"为骨架，从北五环清华园火车站遗址向南延伸至大钟寺，串联10个AI场景节点和3个AI朝圣地标 [data:geometry/public_space.geojson#PUBLIC-001] [data:geometry/green_space.geojson#GREEN-001]。

### AI 朝圣地标（3个）

| 地标 | 位置 | 设计概念 | 空间载体 |
| --- | --- | --- | --- |
| 🛤️ 开源成果展示廊 | 京张遗址公园沿线 | 展示全球AI开源贡献里程碑，沿铁轨遗迹设置可更新的代码贡献墙和项目时间轴 | [data:geometry/public_space.geojson#PUBLIC-001] |
| 🏆 智能体贡献荣誉墙 | AI原点社区 | 首批参与真实城市设计的Agent与贡献者碑刻，可持续更新，每年新增 | [data:geometry/public_space.geojson#PUBLIC-002] |
| 🚂 百年京张记忆广场 | 清华园火车站遗址 | 从人字铁路到人机交汇的文化叙事节点，设置铁路遗迹、AI时间胶囊和互动装置 | [data:geometry/public_space.geojson#PUBLIC-005] |

东西缝合策略：通过五道口-大钟寺骑行联络道（[data:geometry/roads.geojson#ROAD-002]）和小月河场景赋能绿带（[data:geometry/green_space.geojson#GREEN-003]）实现东西向慢行连通。南北贯通以京张遗址公园慢行主轴（[data:geometry/roads.geojson#ROAD-001]）为核心，缝合北五环跨环路节点。

大钟寺智能原生消费与商务场景围绕大钟寺站一体化展开，通过四象限步行连通（JZ-04项目）整合展示、商务、消费功能 [data:geometry/key_areas.geojson#PROV-KEY-003]。

荣誉展示体系：碑刻形式、数字标牌和可更新展示墙三类组件组成公共空间组件库，支持年度更新和社区提名。

## 百年京张文化、中关村文化与AI新文化融合叙事（agent.5）

### 文化叙事框架

本方案构建三层文化叠合叙事 [source:AGENT-TASKBOOK]：

1. **百年京张文化层**——以詹天佑人字铁路为原点，串联清华园火车站遗址、铁路工人社区记忆，形成从工业遗产到AI创新的时空轴线。文化载体包括：铁路遗迹保护展示、历史照片数字墙、京张铁路工程师故事路线。
2. **中关村创新文化层**——以"电子一条街到AI创新带"的演进为线索，在中关村科技服务翼设置创新里程碑节点，展示从PC时代到AI时代的产业迭代。文化载体包括：中关村创新记忆走廊、科技成果年表、创业者口述史采集站。
3. **AI新文化层**——以"人机共生城市"为命题，在AI原点社区和众智园设置AI艺术装置、生成式城市记忆墙和Agent协作广场。文化载体包括：AI生成公共艺术、Agent贡献碑刻、开源代码可视化墙。

### 导视与符号系统

导视系统采用"轨道电路"视觉语言：以铁路轨距为模数、电路走线为图形逻辑，形成可延展的标识族。色彩体系建议：京张绿（历史）、中关村蓝（创新）、AI紫（未来）三色协奏。所有标识需清权字体和图形来源 [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]。

### 国际传播叙事

英文品牌名"Jing-Zhang AI Civic Spine"直接传达公民性和结构性双关。国际传播口号建议：*"From Zhan Tianyou's rail to AI's trail — a century of civic innovation."* 传播素材应区分投稿状态和实施状态，不把概念方案描述为已批准或已建成。

## 全球AI创新活动体系与长期运营（agent.6）

### 年度活动体系

| 活动 | 频率 | 时间 | 空间载体 | 运营主体 |
| --- | --- | --- | --- | --- |
| 全球AI活动周 | 年度（概念建议） | 10月（拟议） | 一带公共空间全轴 | 概念建议：open-city.ai 发起，待与海淀区协商共建模式 |
| 京张AI开源马拉松 | 年度·春季 | 4月 | AI原点社区 | 开源社区联合 |
| AI安全治理峰会 | 年度 | 9月 | 众智园安全治理沙盒 | 产学研联合 |
| Agent城市设计双年展 | 两年一度 | 11月 | 大钟寺国际路演客厅 | open-city.ai |
| 开发者散步日 | 月度 | 每月首日 | 京张遗址公园慢行主轴 | 社区自治 |

### 开发者社区运营机制

建立"京张AI公民开发者计划"：开放API、场景数据沙盒和公共空间预约系统。贡献者通过代码提交、场景设计、Issue反馈和活动参与积累声誉值，年度优秀贡献者在荣誉墙更新。运营资金建议采取政府引导+企业赞助+开源基金三方共担 [source:AGENT-TASKBOOK]。

### 场景开放运营机制

AI场景采用"准入-测试-评估-推广"四阶段开放机制。准入阶段由运营委员会审核隐私、安全和公共利益；测试阶段在指定公共空间试运行3-6个月；评估阶段采集用户反馈和绩效数据；推广阶段向更多节点复制。所有场景须保留人工复核通道 [depth:risk_missing_data]。

### 国际传播和招引转化

通过全球AI活动周吸引国际团队，概念建议设置"AI入驻服务引导窗口"（待研究的服务原型，非已确定政策安排），探索对接科创政策和产业空间的可行路径。转化路径（概念框架）：活动参与→项目路演→孵化评估→空间匹配→政策对接研究。以上均为概念建议/参考方案/可供专业团队深化研究，不构成已确定承诺或政府实施安排 [source:AGENT-TASKBOOK]。

### 长期品牌资产

品牌资产包括：年度活动IP、开发者社区声誉体系、荣誉墙碑刻、公共空间组件库和AI场景方法论。这些资产进入公共知识库，供后续Agent、专业团队和公众持续使用 [source:AGENT-TASKBOOK]。

