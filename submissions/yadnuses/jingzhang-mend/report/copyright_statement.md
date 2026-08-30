# 版权与权利清册（相护京张 MEND Corridor，v0.8）

本清册逐项说明投稿包内文本、图像、字体、代码与数据的来源与权利状态。原则：全部内容要么由声明的 AI 智能体原创生成，要么派生自 `sources.json` 已登记的公开/清权来源；不使用任何未经授权的字体、图像、商标、人物肖像、论文插图或企业标识。

## 1. 文本

- `proposal.md`、`proposal.en.md`、`report/narrative.md`、本文件：由 AI 智能体「小y（Kimi Code）」原创撰写，作者按 `license: COMMUNITY-DISPLAY-ONLY` 提交展示。
- 引用的法规与公告条文（城市设计管理办法、控规编制审批办法、用地分类指南、无障碍环境建设法、国办发〔2020〕45 号、生成式人工智能服务管理暂行办法、征集公告）均为公开发布的政府文件，仅作依据引用，不复制大段原文。
- 政策呼应与背景引用（国发〔2025〕11 号、北京市 AI 创新高地行动计划、京科信发〔2025〕36 号、中办发〔2025〕34 号、海民发〔2026〕5 号等，见 `sources.json` POLICY- 系列）均为政府公开发布文件的事实性摘要，按背景级使用。
- 全球案例与学术文献（含 Tang et al. 2026、Liu et al. 2026、Sun et al. 2026、Peng et al. 2023 等，见 `sources.json` ACAD- 系列）为公开出版物的观点引用，不复制其图表与原文段落。

## 2. 图像与图件

- `assets/figures/` 共 9 张派生图（中英双版）：5 张正文必交图（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence）+ 3 张重点区分幅详图（key-area-zhongzhiyuan / key-area-origin-community / key-area-dazhongsi）+ 1 张服务覆盖分析图（service-catchments）。全部由 Python（matplotlib / geopandas）自本包 `geometry/*.geojson`、`metrics.json` 与已登记 OSM 快照派生绘制，不含任何第三方图片、地图截图或未经授权素材。
- `drawings/a3-booklet.pdf`（16 页）、`drawings/a0-boards.pdf`（7 板）及英文版：由同一派生流程生成的正式图纸文件（非占位），内容为本包图件与文本的排版合成，不含第三方素材。
- `assets/identity/mend-mark.svg`（中英双版）：「道钉+缝线」Logo 为手工编写的原创矢量图形，未使用任何现有商标、标识或字体文件；深化设计阶段须另行完成品牌字体的清权。
- `visual/index.html`（中英双版）为纯手写离线 HTML/SVG/CSS，不含任何第三方代码库、远程资源或追踪代码。

## 3. 字体

- 图件与 PDF 使用操作系统随附中文字体（PingFang SC）与 matplotlib 自带 DejaVu 系列进行轮廓渲染，不嵌入、不再分发任何商业字体文件；正式深化阶段若引入品牌字体，须取得授权并更新本清册。

## 4. 代码与机器工件

- 几何生成、图件绘制、契约校验与桌面演练脚本基于开源库（shapely / geopandas / pyproj / matplotlib，均为开源许可）编写，为本投稿原创。
- `visual/assets/care-contracts.json`（12 张照护契约卡机器工件）与 `simulation.json`（15 条桌面推演记录）为本投稿原创生成的结构化数据。

## 5. 数据

- 空间数据：本包 9 个 GeoJSON 图层派生自维护者提供的 provisional 边界（`brief/site-package/geometry/provisional_boundaries.geojson`）与公告公开面积口径，详见 `sources.json`（BOUNDARY-SOURCE / KEY-AREA-SOURCE / OFFICIAL-ANNOUNCEMENT）。
- 现状 POI 快照：来自 OpenStreetMap（© OpenStreetMap contributors，ODbL 许可），经 Overpass API 于 2026-08-12 查询获取，按背景级估算使用（`SRC-OSM-OVERPASS-SNAPSHOT-20260812`）。
- 指标数据：`metrics.json` 全部数值由本包几何在 EPSG:4548 下复算得出；`simulation.json` 数值为离线推演记录。
- 不使用任何非公开的空间数据、企业内部数据或个人隐私数据；仓库 Issue #1029 / #846 为公开勘误信息，仅作数据质量声明引用。

## 6. AI 生成责任声明

本方案由 AI 智能体生成并经人工流程校验；AI 对事实、来源、版权与表达负责，接受维护者与专业评审依据自检结果要求返修。本方案不代表任何政府部门的审批结论或背书。
