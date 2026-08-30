# 版权、来源与再分发声明

本台账用于本次投稿包的路径级权利核验，不构成法律意见或不侵权保证。`COMMUNITY-DISPLAY-ONLY` 是本投稿的展示许可标签，不能覆盖第三方字体、工具、数据或平台条款。公开可访问、第一方发布或由生成式工具产生，也不自动等于允许复制、嵌入、修改或再分发；每项资产仍须按下表的权利基础和限制单独判断。

## 1. 台账字段与状态

最终发布前，每个路径必须具备：作者或权利人、来源 URL 或本地输入路径、创建/生成/修改日期、生成与转换方法、工具/模型及精确版本、输入资产及 SHA-256、许可证或许可依据、是否嵌入或再分发、署名位置、生成式内容状态、限制、证据路径、输出 SHA-256、复核人和复核日期。

状态只有三种：

- `cleared`：已取得可核验的原创、许可或再分发依据，并已完成最终文件哈希对账。
- `needs_evidence`：来源或限制已知，但仍缺精确版本、哈希、许可副本、嵌入证明或人工复核。
- `replace`：无法证明权利，或许可与当前嵌入/再分发方式冲突；发布前必须替换或移除。

## 2. 正文、JSON 与表格

| 精确路径 | 作者/生成方式 | 来源与许可基础 | 嵌入/再分发 | 限制 | 状态 |
|---|---|---|---|---|---|
| `proposal.md`; `proposal.en.md`; `report/narrative.md` | 投稿者在 Codex 辅助下编写和修订 | 投稿者原创表达；事实和案例仅按 `sources.json` 的逐项边界引用；投稿标签 `COMMUNITY-DISPLAY-ONLY` | 随投稿包再分发 | AI 辅助不构成不侵权保证；最终中英文版本已于 2026-08-29 在全部来源与衍生物成型后，对照专名、主张强度、数字、编号、来源/限制和图位完成终稿复核 | `cleared`；逐路径 SHA-256 与结论见 `visual/assets/r5-final-snapshot-audit.json` |
| `agent.json`; `manifest.json`; `self_check.json`; `metrics.json`; `assumptions.json`; `sources.json`; `compliance_matrix.json`; `standard_matrix.json`; `design_depth_matrix.json`; `visual/assets/phase2-source-freeze.json`; `visual/assets/regional-interface-contracts.json`; `visual/assets/r4-regional-interface-generation-contract.json`; `visual/assets/r5-final-snapshot-audit.json` | 投稿者与仓库脚本生成/维护的结构化元数据 | 仓库 schema、任务书与已登记来源；R4 五域功能、合同字段与验收/停止规则为投稿者原创设计假设；R5 只登记最终快照的来源分组、权利/双语复核范围和路径哈希，不复制外部机构内部材料、其他投稿表达、图件或专有资产 | 随投稿包再分发 | schema、合同或哈希完整不代表外部对象授权、合作、数据、能力或运行事实；五域当前固定为 5 合同 / 0 授权 / 0 运行 / 0 真实交换 | `cleared`；最终 SHA-256 由 manifest 与 R5 审计逐路径记录 |

`sources.json` 中的全球案例仅允许短篇事实转述、署名和链接，不复制网页图片、Logo、地图、长段文字或版式，也不在本地镜像页面。案例机制属于 `background_only`，不得替代本地现状、法定控制、合作承诺或绩效证据。

两组 OSM 证据不可混写：2026-08-14 的早期边界错位核对只在仓库依据说明中保留 query/response hash，原始响应未登记、不可随包重放，是 0% 遗址公园相交和 667 m 命名道路平均偏移两项低置信度警示的唯一来源。R3 于 2026-08-28 另行增加一条 `background_only` OSM/Overpass 来源：四个固定查询、原始响应、检索时间、原始/压缩/派生哈希、转换链与 ODbL 1.0 署名均随包保存、可重放；它只支持道路、铁路线索、公园、地标和粗粒度建筑肌理识别，不回填 0%/667 m，不改变既有来源等级，也不进入 required design GeoJSON。逐组边界见 `sources.json#/r5_evidence_separation`。

R3-E 于 2026-08-28 以 append-only 方式增加八条主管部门/政府公开网页或标准公告元数据，只保存发布者、URL、发布日期/检索日期、响应或附件哈希、用途与禁止用途，不再分发网页正文或标准附件。其允许用途仅为定位规划、权属查询、文保、无障碍、消防和慢行专业审查接口；页面可公开访问不等于授予正文/附件再分发权，也不等于项目级 GIS/CAD、专业签章、运营授权或批准。`visual/assets/r3e-official-source-snapshots.json#/rights_contract` 将 `full_response_bodies_redistributed`、`geometry_generation_allowed` 与 `professional_or_approval_claim_allowed` 均固定为 `false`。

## 3. GeoJSON 与空间数据

| 精确路径 | 作者/来源 | 状态与允许用途 | 禁止用途 | 权利状态 |
|---|---|---|---|---|
| `geometry/site_boundary.geojson`; `geometry/key_areas.geojson` | 从仓库登记的 `DATA-SRC-PROVISIONAL-BOUNDARIES-20260605` 派生；其依据为官方公告文字、位置线索和约面积 | `provisional_only`、`low`；仅用于临时生成、离线展示、入口自检和醒目标注的方案内容评审 | 官方红线、精确空间证据、法定或工程结论、审批、权属、控规或实施依据 | 版权/再分发 `cleared`；数据权威仍为 `provisional_only`，正式几何到位后必须替换并全量重算 |
| `geometry/buildings.geojson`; `geometry/green_space.geojson`; `geometry/land_use.geojson`; `geometry/phasing.geojson`; `geometry/public_space.geojson`; `geometry/roads.geojson` | 投稿者/agent 在临时范围内原创生成的多要素概念设计层；输入链为本包 GeoJSON、assumptions、metrics 与 proposal | `design-target` / `candidate_not_surveyed`；用于表达可回退方案和现场核验计划 | 不得称为测绘现状、审定用地、道路红线、批准建筑、工程线位、预算或工期承诺；OSM 背景数据未复制进 required design layers | 版权/再分发 `cleared`；最终哈希由 manifest 记录，数据权威限制保持不变 |
| `geometry/constraints.geojson` | 投稿者/agent 维护的刻意空集合 | 登记未取得官方控规、权属、道路、文保、市政等几何的缺口 | 不得以推定线代替 `official_constraint` | `cleared` 作为缺口说明；若将来加入要素须重新清权 |
| `visual/assets/r3-osm-*-snapshot.json`; `visual/assets/r3-site-context.json`; `visual/assets/r3-site-context-builder-source.json` | OpenStreetMap contributors；固定 Overpass 查询的原始响应以确定性 XZ+base64 随包保存，再由内嵌 Python 源投影到 EPSG:4548 并派生表达层 | ODbL 1.0；可用于 `background/open-data-derived` 场地识别与共同尺度比较；图内和 HTML 均保留 `© OpenStreetMap contributors` 署名 | 测绘、官方边界/道路红线、宗地/权属、文保控制线、法定用地、无障碍/安全/容量/法律/批准结论，或写入 required design GeoJSON | `cleared` 用于 ODbL 背景数据再分发；数据权威固定为 `background_only`，不受 `COMMUNITY-DISPLAY-ONLY` 收窄 |

GeoJSON 中的数值小数位只服务机器复算，不提高来源权威；对公众展示必须使用合理约数和临时状态说明。

## 4. F01—F11 双语图件

所有图件均由投稿者/agent 本地绘制，不使用远程地图瓦片、商业底图截图、图库照片、企业 Logo 或未授权图标。R3 的 F01—F04 明确使用随包、可重放并按 ODbL 1.0 清权署名的 OSM 开放矢量背景；该背景与 required design GeoJSON 隔离并醒目标为 `open-data-derived`。当前图件由本地 Pillow 流程生成；生成源、精确版本、字体、输入和每张输出 SHA-256 均须登记。

| 图号 | 中文路径 | 英文路径 | 当前状态与限制 |
|---|---|---|---|
| F01 | `assets/figures/site-overview.png` | `assets/figures/site-overview.en.png` | R3 重生成；OSM 背景显示京张铁路/遗址公园线索、道路、公园与已清权地标，叠加 12 条候选、0 条已踏勘和 3 处 provisional 重点区；EPSG:4548 坐标格、北针和 1000 m 图示比例尺可复算，但不是测绘或工程线位 |
| F02 | `assets/figures/land-use-structure.png` | `assets/figures/land-use-structure.en.png` | R3 重生成；开放背景上透明叠加同边界情景分区，缺口/重叠为 0；不是审定用地、宗地、文保控制或控规 |
| F03 | `assets/figures/key-areas.png` | `assets/figures/key-areas.en.png` | R3 重生成；三处使用相同 1000 m×650 m EPSG:4548 图幅和 200 m 图示比例尺，显示不同道路/铁路/公园/建筑肌理、CX 与 5+3 设计动作；边界仍 `provisional_only` |
| F04 | `assets/figures/mobility-bluegreen.png` | `assets/figures/mobility-bluegreen.en.png` | R3 重生成；开放背景定位 CX01—CX12，只深化 CX02/CX05/CX10，并直接说明大钟寺场地条件→CX10→`SC10 + IM06 only`→Human Takeover；其余九条保持 candidate/not surveyed |
| F05 | `assets/figures/metrics-evidence.png` | `assets/figures/metrics-evidence.en.png` | Phase 2 重生成；显示可复算计数、负/零/未知结果、来源哈希和重算触发链 |
| F06 | `assets/figures/identity-system.png` | `assets/figures/identity-system.en.png` | 已生成；Logo 为原创几何，不使用铁路标识、企业商标或未授权字标 |
| F07 | `assets/figures/ai-ecosystem.png` | `assets/figures/ai-ecosystem.en.png` | R4 重生成；内部八要素回路保持主视觉，RI01—RI05 仅以空心、虚线、断开的未授权插口呈现；不复制对象 Logo、地图或视觉资产 |
| F08 | `assets/figures/scenario-matrix.png` | `assets/figures/scenario-matrix.en.png` | 已生成；场景、角色、数据流和界面符号均为原创示意 |
| F09 | `assets/figures/landmarks-components.png` | `assets/figures/landmarks-components.en.png` | 已生成；地标、组件库和贡献展示为概念设计，不使用第三方人物肖像、Logo 或荣誉标志 |
| F10 | `assets/figures/culture-wayfinding.png` | `assets/figures/culture-wayfinding.en.png` | 已生成；六级导视符号为原创，专名、固定状态词与双语文本于 2026-08-29 随最终 11 幅图对完成人工复核 |
| F11 | `assets/figures/operations-pathway.png` | `assets/figures/operations-pathway.en.png` | R4 重生成；5/0/0 readiness 为独立状态块，不进入九状态生命周期或投诉路径；运营主体、资金、审批、外部授权与服务能力均不写成既定承诺 |

F01—F04 由 R3 合法演进的 Phase 2 扩展源从同一 required GeoJSON/metrics 与隔离的 OSM 背景重建；F05 与 F06—F11 哈希不变。四份 PDF 和双语 HTML 再由 Phase 4 同批生成；最终哈希由 `manifest.json` 逐路径记录，任何重渲染都会触发重新核验。

## 5. PDF 与 HTML

| 精确路径 | 生成链 | 嵌入资产 | 许可与限制 | 状态 |
|---|---|---|---|---|
| `drawings/a3-booklet.pdf`; `drawings/a3-booklet.en.pdf`; `drawings/a0-boards.pdf`; `drawings/a0-boards.en.pdf` | Phase 4 由 `visual/assets/phase4-presentation-sources.json#/sources/0` 的冻结内嵌源生成；R4 再由实体、可审阅的 `visual/assets/r4-regional-interface-generator.js` 在内存中施加仅限 IM12/F07/F11 的双语补丁并经 Chromium CDP 输出。wrapper 同时从已登记 Phase 3 源恢复干净 F11 基底，避免重复叠加；输入/输出哈希记录在 R4 生成合同 | 已登记图件、可选择文本和 Noto Sans SC PDF 子集字体；没有新增外部图片、地图、Logo、字体或远程资源 | Node/Playwright/Chromium 只承担本地确定性渲染；四份 PDF 复核页面数量/尺寸、结构树、书签、语言、阅读顺序、渲染像素、可读文本与嵌入字体链，不声明 whole-file bit-for-bit 或 PDF/UA 合规 | `cleared`；任何重渲染后须重跑生成合同、PDF/HTML QA、manifest 与 self-check |
| `report/proposal.html`; `report/proposal.en.html`; `visual/index.html`; `visual/index.en.html` | 仓库/本地渲染脚本生成的离线 HTML | 本地图件、本地 CSS、`visual/assets/font-subset.css` 中的本地字体数据，以及复用 `assets/figures/identity-system.png` 的本地 favicon | 不使用 CDN、远程脚本、远程地图瓦片、iframe 或远程字体；四份 HTML 均显式声明本地 favicon，不产生隐式 `/favicon.ico` 请求 | `cleared`，网络、应用资源与缺字检查通过；双语语义仍按独立人工复核处理 |

## 6. 字体

采用 **Noto Sans SC / Noto Sans CJK SC** 的本地子集，许可证为 [SIL Open Font License 1.1](https://github.com/notofonts/noto-cjk/blob/main/Sans/LICENSE)，官方上游为 [notofonts/noto-cjk](https://github.com/notofonts/noto-cjk)。OFL 允许使用、嵌入、修改和再分发，但再分发副本须附带版权与许可证文本，字体不能脱离软件单独售卖，修改版须遵守 Reserved Font Name 条款，且不得暗示字体作者背书。

实际权利记录：

- `visual/assets/font-subset.css`：包含两个本地 `@font-face` WOFF2 data URI；源为 Noto Sans SC 2.004，源文件 SHA-256 为 `d68bafcb48a2707749396aa12bbbd833cb70401f3a9a689fd2902c7e0d295964`，CSS SHA-256 由最终 manifest 记录。
- `visual/assets/NotoSansSC-OFL-1.1.css`：在允许的离线资产格式内，以可直接阅读的版权注释随包提供上游字体版权声明与完整 SIL OFL 1.1 文本；该文件已纳入 manifest，不承担运行时样式。
- PNG/PDF 使用从同一源文件固定化的静态字重；静态 TTF 不作为独立文件随包分发，PDF 中仅嵌入实际使用的子集。
- 子集由固定的 fontTools 4.63.0 与 Brotli 1.2.0 生成，图件由 Pillow 12.2.0 生成，PDF 由 ReportLab 5.0.0 生成；运行时不依赖操作系统字体。最终 `font-subset.css` 的两个实际 WOFF2 data URI 会被重新解码并直接读取 raw OpenType `head` 表，`created` 与 `modified` 均固定为 `2082840000`。在这组固定依赖、固定字符集与固定源哈希下，两个新鲜环境须逐字节复现；改变工具版本、字符集或源文件仍须重新核验，不外推为跨版本保证。

Noto Sans SC 以 SIL OFL 1.1 许可使用、修改、嵌入和再分发；本节保留官方上游与许可证链接、源版本、源哈希、子集方法和限制。四份 HTML、全部 PNG 和四份 PDF 已核对为同一 Noto 字体链，未使用或分发 Microsoft YaHei。字体链状态为 `cleared`；任何源版本、字符集或生成工具变化都会触发重新核验。

## 7. 封面状态

Phase 4 新增 `assets/media/cover.webp`。它不是照片、测绘底图、效果图或外部生成式图像，而是 `visual/assets/phase4-presentation-sources.json#/sources/0/source` 中的 `coverHtml`，按同对象的 `restore_as=phase4-presentation-generator.mjs` 临时恢复后，用本包已清权的 Noto Sans SC 字体、SC01/SC05/SC10 与 SC10+IM06 既有编号、三处原型文字和统一状态线型，在 1600×900 本地 HTML/CSS 画布上确定性排版并由 Playwright/Chromium 截图生成。该内嵌源完整 UTF-8/LF 字节 SHA-256 为 `a80e1ff0726278d072cb56c782a01ae895bc1b2c6bf5323f166d197a52a4cdb7`；不存在同名投稿包内实体脚本。没有调用远程图片、地图瓦片、第三方 Logo、图库、ImageGen 或外部视觉素材。

封面中英文文本成对，直接声明“只由包内已清权矢量与证据图形派生”和“不得作为现场观察、测绘、官方红线、批准方案或实施证据”。它只承担 3 秒项目识别和评审导航；不新增事实、几何、边界、证据等级、实施状态或官方身份。生成输入、输出哈希和禁止用途记录在 `visual/assets/phase4-generation-contract.json` 与最终 manifest；任何脚本、字体、字符集或语义变化都会使既有清权状态退回待复核。

## 8. 代码、工具与第三方库

| 路径/工具 | 用途 | 许可证/权利边界 | 状态 |
|---|---|---|---|
| `scripts/render_proposal_html.py`; `scripts/scaffold_ai_submission.py` | 仓库 HTML/投稿脚手架与渲染流程 | 最终实时上游基线 `349a767d157798a6f1ec6d0e12ed97cabdacdb05`；不把工具权利误写成输出内容许可 | `cleared` 作为生成证据；脚本本身不随投稿包重复分发 |
| `visual/assets/rebuild-visuals-source.json` | 当前 F01—F11、PDF、visual HTML 与字体子集生成器的可审阅 Python 源码快照 | 因投稿白名单不接受 `.py`，以 JSON 的 `source` 字段随包分发并纳入 manifest；还原后的 Python 源 SHA-256 为 `54fdc9bf0241f4bb4f98420c408af8c9e43edf87c5d3c31ef67f71578aa0b8cf`。JSON 同时保存精确工具版本、字体哈希、F08 carrier 合同、Git blob/LF 字节域及 PDF/WOFF2 非 bit-exact 边界 | `cleared`；最终路径于 2026-08-29 纳入 R5 权利审计，审阅者可直接提取并运行 |
| `visual/assets/phase2-spatial-evidence-source.json`; `visual/assets/phase2-visual-generator-source.json` | Phase 2 GeoJSON/metrics/source-freeze 与 F01—F05/HTML/PDF 的可审阅 Python 源码快照 | 以允许的 JSON `source` 字段分发，分别保存源 SHA、恢复文件名、依赖版本与生成合同；前者不抓取网络空间数据，后者复用已登记 Noto 字体链 | `cleared`；最终 JSON 与生成输出 SHA-256 由 manifest 记录 |
| `visual/assets/phase4-presentation-sources.json#/sources/0`; `visual/assets/phase4-presentation-sources.json#/sources/1` | Phase 4 封面、A3/A0、HTML 可访问层、字体子集和生成冻结合同的内嵌可运行源对象；分别声明 `restore_as=phase4-presentation-generator.mjs` 与 `restore_as=phase4-font-subset.py`，不是投稿包内实体脚本路径 | 两个对象的 `source` UTF-8/LF 字节 SHA-256 分别为 `a80e1ff0726278d072cb56c782a01ae895bc1b2c6bf5323f166d197a52a4cdb7` 与 `4cdee69c5e326142abe607e62ce5438c534846fd613ad1860e24ecface3cebae`；只读取本包已登记图件、布局/图号登记表、隔离的 R3 开放背景和冻结权威输入，禁止把派生表达写回 GeoJSON、metrics、协议或治理权威文件 | `cleared`；JSON Pointer、`restore_as` 与嵌入字节哈希由 `phase4-source-freeze.json#/phase3_phase4_handoff/embedded_source_rights` 机器核验；工具链、输入/输出 SHA-256 和不可变边界由 `phase4-generation-contract.json` 记录 |
| `visual/assets/r3e-implementation-sources.json#/sources/0/source_lines` | R3-E 六类实施证据审计源；对象声明 `restore_as=r3e-implementation-audit.py`，不是投稿包内实体脚本路径 | 按行以 UTF-8/LF 恢复后的完整字节 SHA-256 为 `a34aa8f5fd6b2c708eb0627dbb9fac6eba6ac40fd52a370e323a7672c021fedd`；只读核对官方来源边界、append-only 台账、冻结输入、CX 归一化数量、未知成本、责任缺口、桌面专业清单与合成演练，并提供七个内存篡改负例 | `cleared`；不得把审计结果称作官方评分、专业签署、现场演练或批准 |
| `visual/assets/r3e-implementation-sources.json#/sources/1/source_lines` | R3-E Phase 4 表达覆盖源；对象声明 `restore_as=r3e-presentation-overlay.mjs`，不是投稿包内实体脚本路径 | 按行以 UTF-8/LF 恢复后的完整字节 SHA-256 为 `df9f9fb6142b886f2b8cbbf77a8d40c900f0bc9dca72acdce146d4041ebb86a2`；在内存中补丁化已冻结的 Phase 4 生成源，只把“动作→证据→责任/成本→验收/停止”接入现有 F08/F11、A0/A3 和双语 HTML，并硬断言四入口各有且仅有一个实施证据区；不写回 required geometry、metrics、proposal 或 Phase 3 权威文件 | `cleared`；JSON Pointer、`restore_as`、嵌入字节哈希与禁止用途由 `phase4-source-freeze.json#/r3e_implementation_evidence` 机器核验 |
| `visual/assets/r4-regional-interface-generator.js` | R4 实体生成/审计 wrapper；恢复已登记 Phase 3 F11 基底，生成 F07/F11 双语 PNG，在内存中补丁化冻结的 R3-E/Phase 4 源并重建四 PDF 与四 HTML，同时复算 RI01—RI05、5/0/0、双语必填字段与输入/输出 SHA-256 | 投稿者/agent 原创代码；只读取随包已登记 JSON、内嵌生成源、本地字体与本地图件，不联网、不抓取新数据、不加载第三方视觉资产，不改变 geometry、来源等级、SC/IM 编号、唯一首用或外部授权状态 | `cleared`；精确实体文件 SHA-256、工具版本和生成输出哈希由最终 manifest 与 R4 生成合同记录 |
| `visual/assets/r5-final-snapshot-audit.js`; `visual/assets/r5-final-snapshot-audit.json` | R5 最终快照审计器及其持久结果；在全部来源检索和 R4 生成结束后枚举权利范围及中英成对范围，复核两组 OSM 不替代规则，并记录逐路径 SHA-256、字节数、日期和结论 | 投稿者/agent 原创审计代码与元数据；只读本包文件，不联网、不改变任何设计、来源等级、权利条件或专业判断 | `cleared`；任何已审计路径字节变化都会使 `--check` 失败并要求重新人工复核 |
| `visual/assets/r3e-official-source-snapshots.json`; `visual/assets/r3e-implementation-evidence.json`; `visual/assets/r3e-implementation-qa.json` | 投稿者/agent 编制的来源元数据、实施就绪支持合同与可复算 QA | 只包含短篇事实转述、官方链接/哈希、设计目标、公式、状态、缺口和合成桌面测试；八个外部网页/附件正文不随包再分发 | `cleared` 用于本包结构化元数据；外部内容仍受各发布者权利声明约束，且不得生成官方几何、价格承诺、专业意见、运营绩效或批准结论 |
| Playwright 1.62.1；Chromium 151.0.7922.34 | 本地封面截图、离线 HTML 浏览器 QA 与四份 tagged PDF 生成 | Apache-2.0 / Chromium 项目许可；只作渲染与检查，不带入远程内容、商标或输出事实 | `cleared`；当前四 HTML 远程请求、追踪与外部资源均为 0；两份 report 为无脚本原生 details，两份 Visual 才加载本地 `visual.js` |
| Pillow 12.2.0 | PNG 绘制 | MIT-CMU 类许可；工具许可不改变输入数据或输出内容权利 | `cleared` |
| ReportLab 5.0.0 | PDF 生成 | BSD 类许可；工具许可不替代嵌入字体权利，本包字体权利单列核验 | `cleared` |
| fontTools 4.63.0 | 字体固定化与 WOFF2 子集 | MIT 类许可；输出继续受 Noto Sans SC 的 OFL 1.1 约束 | `cleared` |
| Brotli 1.2.0 | WOFF2 压缩后端 | MIT 类许可；只参与字体子集字节编码，不改变 Noto Sans SC 的 OFL 1.1 约束 | `cleared` |

本轮静态盘点未发现四份 HTML 加载 CDN、远程 JavaScript、远程 CSS、远程地图瓦片、iframe 或图库图片，也未发现独立第三方图标包；这是当前文件快照的技术观察，不是永久权利保证。任何后续新增的图标、地图、照片、字体、组件或外部库都必须先新增台账条目。

## 9. 发布前封口检查

2026-08-29 的 R4 只深化 IM12 五域候选接口及其 F07/F11 表达：RI01—RI05、两项状态计数、四幅重生成图件、四 HTML 和四 PDF 均来自本包登记的参与者原创合同与本地生成链。没有新增第三方素材、外部数据或现实合作证据；5 合同 / 0 授权 / 0 运行 / 0 真实交换只证明候选机制已写成，不构成外部对象能力、合作意向、授权、交换、运营、采购、审批、实施、专业签署或 PDF/UA 认证。R6 随后只重排 F01 指标卡、来源/限制说明与 A3 图面空间，没有新增或提升任何主张、几何、指标、来源等级、授权、运行、专业签署或现场证据。R5 在全部 R6 衍生文件成型后重新完成最终审计，逐路径覆盖 2026-08-28 OSM 快照、R3-E 元数据、字体/OFL、22 幅图、4 HTML、4 PDF、封面与结构化证据，并完成同日双语等价复核；精确范围、时间和哈希以 `visual/assets/r5-final-snapshot-audit.json` 为准。

1. 以最终 manifest 展开全部文件路径，禁止用无边界通配符掩盖遗漏。
2. 核对 F01—F11 中英文实际文件名、生成输入、字体和输出哈希。
3. 核对 `visual/assets/font-subset.css` 的 data-URI 子集、OFL 来源记录，并保持 HTML 网络请求为零。
4. 用 PDF 字体检查工具确认四份 PDF 仅嵌入 Noto 子集，且许可证记录一致。
5. 保留 Pillow、ReportLab、fontTools、Brotli 与随包渲染脚本证据；PDF 只按页面像素/版式/字体链复现，WOFF2 只按 glyph/cmap/字体属性/渲染像素复现，均不宣称整文件字节一致；未完成权利核验的可选封面已移除。
6. 最终人工双语等价审查须在全部衍生物生成后覆盖 13 章顺序、主命题、四个一级消息、十项 claim、三处 5+3、三代表横断面、指标与负结果、两组 OSM 的不替代关系、SC/CX/IM/AP/U/C/TVS 与 F/T 编号、来源/限制、22 幅图位、4 HTML 和 4 PDF。
7. 对照最终 SHA-256 更新本台账；任何文件重渲染后原有清权状态自动退回 `needs_evidence`，直至重新复核。
