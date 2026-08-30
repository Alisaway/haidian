# 方案迭代记录

方案：京张生长网络 JINGZHANG ADAPTIVE COMMONS
投稿包：`yaoyaoxie/jingzhang-adaptive-commons`（目标路径 `submissions/yaoyaoxie/jingzhang-adaptive-commons/`）

## v0.1 - 2026-08-25

- 形成概念方案初稿《京张生长网络》：一条公共主轴、三类功能片区、六类分布式节点、五层复合网络；以分布式生物网络的连接与更新规律作为底层生成逻辑。
- 产出研究底稿：生成逻辑研究（证据成熟度分级）与评审维度拓扑。
- 影响：确立“分布式公共基础设施网络”的总体方向，后续版本未改变该基本盘。

## v0.2 - 2026-08-25

- 新增设计判准三问（连接、交换、生长），全部空间判断须经判准检查。
- 三类功能片区正式对应公告三处重点区域（众智园 192.1 ha / AI 原点 104.3 ha / 大钟寺 72.0 ha），形成“育—传—用—还”交换链。
- 新增核心剖面“京张生长断面”与资源旅程“一块构件的九步循环”。
- 三个验证项目（P1 生态基线、P2 AI 社区服务、P3 循环材料）升级为含基线、对照、责任人、继续/停止/恢复条款的可证伪协议。
- 生成五张核心图概念版（基于 provisional 几何与概念推演）。
- 影响：方案从概念框架进入可检验的结构模型；图件与正文均标注 provisional 属性。

## v0.3 - 2026-08-25

- 内容补充：按官方口径补“三区两翼”（西侧中关村科技服务翼、东侧小月河场景赋能翼）、8 个全球案例表、12 张场景卡深化、长期运营四机制、三片区场地专属要点。
- 空间数据：以仓库 provisional 边界为基础，程序化派生 7 个设计图层，形成完整 9 个 GeoJSON 图层；拓扑校验（闭合、无自交、无重叠、覆盖）通过。
- 指标：三项核心指标复算入库——site_area_sqm=11,412,825.4、green_ratio=0.2796、public_space_ratio=0.1111（全部 provisional、低置信度）；控规相关指标一律登记 unknown。
- 展示：生成 23 页离线展示页 `visual/index.html`（中文版）。
- 包装：补齐 manifest.json、agent.json、metrics.json、assumptions.json、sources.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json 与版权合规声明；proposal.md 重组为 13 章正式结构。
- 影响：形成完整证据链；双语版、图纸与官方自检列入 v1.0 计划。

## v1.0 - 2026-08-26

- 双语补齐：`proposal.en.md`、五张 `*.en.png`、`visual/index.en.html`、`drawings/` A3 文册与 A0 展板双语 PDF、`report/proposal.html` 与 `report/proposal.en.html` 全部生成入库。
- 打包合规整改（对照官方四门检查）：`proposal.md` 补齐 front matter（author_github/license/summary/version）；`metrics.json`、`standard_matrix.json`、`compliance_matrix.json`、`design_depth_matrix.json` 按官方 schema 补齐 schema_version 与必填证据数组；`standard_matrix.json` 标准 ID 对齐官方登记库（PROJECT-OFFICIAL-ANNOUNCEMENT、PROJECT-AGENT-OPEN-CALL-TASKBOOK、MOHURD-URBAN-DESIGN-MEASURES、MOHURD-CONTROL-DETAILED-PLANNING、MNR-LAND-USE-CLASSIFICATION-GUIDE），正文 [depth:] 标记同步改用官方深度项 ID。
- 几何口径修正：`site_boundary.geojson` 仅保留总体设计范围（PROV-SITE-001），统筹研究范围（PROV-RESEARCH-001）与重点区域汇总范围（PROV-KEY-SCOPE-001）移入 `constraints.geojson`（REGULATORY_CONTROL 图层），使用地分区与指标复算口径同官方 spatial_review 一致；复算结果 site_area_sqm=11,412,825.386、green_ratio=0.279551、public_space_ratio=0.111097，与 metrics.json 一致。
- 展示页整改：字体改为本地化内嵌（`visual/assets/fonts.css`），消除全部远程请求；`visual/index.html` 补齐官方要求的十四个必备内容区块（总览地图、三层范围、重点区域、用地分区、交通慢行、蓝绿公共空间、建筑、更新项目、AI 场景、核心指标、任务覆盖、自检状态、来源、假设）与 `green_ratio`、`public_space_ratio` 的 data-metric 数值锚点。
- 目录规范：按投稿目录白名单移出过程性文件（本地分析记录与生成脚本不进入投稿包）。
- 措辞合规：修订版权说明中一处易引发误读的否定性表述。
- 影响：投稿包进入 ready_for_review 状态，四门自检（deterministic/spatial/visual/professional）全部通过并持久化 `self_check.json`。

## v1.0.1 - 2026-08-26

- 修复：`geometry/land_use.geojson` 的 `land_use_code` 从方案功能分类（residential_support 等）改为官方用地用海分类数字代码子集（自然资发〔2023〕234号：0701/0802/0804/0901/1401/1403），方案功能分类移入 `functional_group` 字段保留；响应 CI submission-validation 的确定性校验反馈。
- 影响：仅数据字段口径修正，几何、面积与指标不变；四门自检重跑通过。

## v1.0.2 - 2026-08-26

- 评审阻断修复 1/4：将 Noto Serif CJK SC 2.003 按中英报告和展示页实际字符重新生成 SIL OFL 1.1 WOFF2 子集，并继续以内嵌 data URI 交付；中文 `report/proposal.html` 与英文对应页改为加载包内 `visual/assets/fonts.css`，不依赖系统 CJK 字体或远程字体。
- 可见性验证：使用 Chromium 对中文 report 按连续视口分页截图、对 `visual/index.html` 每个 slide 逐页截图，同时检查内嵌字体 cmap 覆盖全部可见字符及网络请求为零。
- 生成说明同步：修正 `agent.json` 与版权声明，登记本轮 OpenAI Codex 评审修复、官方脚本运行和字体来源/许可边界。
- 影响：仅修复离线中文阅读通道与生成记录；正文论证、法定指标状态、provisional 几何及派生指标不变。
- 评审阻断修复 2/4：新增原创 `assets/figures/jingzhang-growth-mark.svg`，以京张双轨、“人”字分叉、交换节点与开口回流环构成母品牌标志；中英正文与展示页同步补齐色彩、字号、最小尺寸、净空、单色/双语规则，以及 agent.5 导视、agent.6 活动品牌和 L1–L3 载体的主从关系。
- 授权登记：版权声明补充 SVG 生成方式、第三方图形排除、复用和背书边界；`compliance_matrix.json` 关闭 agent.1 标志图形缺口。
- 评审阻断修复 3/4：中英正文第 3 章新增区域创新协同矩阵，逐项覆盖北纬社区、未来科学城、怀柔科学城、经开区与京津冀的候选交换资源、概念接口、牵头主体类型、回流机制和证据等级。
- 协同纪律：全部接口均标为 T+C 概念建议，明确未取得合作协议、数据授权、资源清单、资金、政策或实施承诺；对象名称不作为合作成立证据。
- 评审阻断修复 4/4：中英正文第 6 章新增 agent.2 八要素保障矩阵，逐项登记土地、空间、产业、资金、人才、算力、数据、场景的概念载体、主体类型、开放规则、公共回报、风险边界与待核实数据。
- 保障纪律：资金、算力、土地、政策与场景许可均标为未承诺；任一要素未确认合法来源、责任主体、全生命周期成本和公共回报时，不进入实施清单。

## v1.0.3 - 2026-08-26

- 第二轮评审修复 A：按主仓库 `data/source_registry.json` 统一来源登记；任务书改用 `DATA-SRC-AGENT-TASKBOOK-20260518`（approved、usable_for_formal=yes），临时边界改用 `DATA-SRC-PROVISIONAL-BOUNDARIES-20260605`（provisional、usable_for_formal=provisional_only），同步正文、来源表、合规矩阵、标准矩阵和设计深度矩阵。
- 来源边界：未纳入中央登记的政府报道继续只作 background，正文明确其不承担红线、控规、工程可行性、正式实施或政府承诺证明。
- 第二轮评审修复 B：`manifest.validation_claim.known_blockers` 清空；八类组织方数据缺口和正式资料到位后的复算、重绘、专项复核条件继续完整保留在 `assumptions.json` 的逐项 trigger 中，不把外部数据缺口伪装为已解决。
- 标准状态：按主仓库 `brief/site-package/standards/standards.json` 更新五项正式标准的 reference 状态、访问日期、登记路径与独立 source ID；`review_status=addressed` 仍仅表示方案已响应，不宣称持证专业条文审查完成。
- 第二轮评审修复 C：proposal front matter、agent 元数据、双语 report/visual、核心总图及四份双语 PDF 的投稿发布版本统一为 `v1.0.3`，发布日期统一为 `2026-08-26`；中英首屏均醒目标明“公开共创建议、非正式规划、非工程结论、非官方批准”。
- 版本字段说明：`manifest.site_package_version=0.1.0` 保持为组织方 site-package 契约版本，不代表方案发布版本；方案发布版本记录于 proposal front matter 与 `manifest.agent.submission_release_version`。
- 生成物同步：重绘中英文 `site-overview` 核心总图，重建 A3 中英文 14 页文册和 A0 中英文 7 板 PDF；版本、日期和发布状态均由项目生成源输出，未直接编辑 PDF 二进制。
- 更新评审修复 D：新增第 6.5 节 agent.4“荣誉展示体系＋公共空间组件库”独立成果，明确四类候选展示的公共价值标准、开放提名、证据审核、异议、展期、年度复核和撤下机制；候选展示不等于授牌、排名、机构参与或背书。
- agent.4 空间与组件：建立 L1 记忆、L2 数据/失败档案、L3 开放作品及轻量公共站的空间映射，以及 H 展示档案、R 停留交流、W 导视服务三类可逆组件；补齐无障碍信息层级、核心信息非手机独占、版权登记、争议暂停、修订留痕和许可前不落地红线，并同步中英 visual 与 A3/A0 生成源。
- 更新评审修复 E：统一统筹研究范围证据链。`A-BOUNDARY-001`、compliance 1.4.1、中英正文和 `metrics.json` 现一致说明：官方 polygon 缺失，但 `constraints.geojson#PROV-RESEARCH-001` 临时粗略轮廓存在，并已按 `polygon_area` 在 EPSG:4548 下完成 43,609,232.558 平方米的低置信度概念复算。
- 复算纪律：该数值仅用于与公告约 43.6 平方公里作量级校核，不是官方面积、红线或控制依据；组织方发布带版本、坐标系、精度与适用范围说明的正式 polygon 后，触发替换、全指标复算、中英图件重绘、manifest 刷新和差异报告。
