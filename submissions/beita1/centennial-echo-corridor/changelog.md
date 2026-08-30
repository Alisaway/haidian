# 方案迭代记录

## v1.1 - 2026-08-25（回应 CocoSgt 2026-08-23 评审意见，PR #3849）

- 【字体】修复离线评审环境中文 HTML 方框问题：report/proposal.html、report/proposal.en.html、visual/index.html、visual/index.en.html 内嵌按实际字符集子集化的 Noto Sans SC woff2（字重 400/700，base64 内联，SIL OFL 1.1，子集依许可重命名为 EchoBelt Han Subset）；许可登记于 sources.json（FONT-NOTO-SANS-SC）与 report/copyright_statement.md。
- 【图件】修复 assets/figures/key-areas.en.png 底部三栏标题跨栏重叠（面板内硬换行）与 land-use-structure.en.png 右侧说明裁切；同步再生全部引用这些图件的 HTML、A3、A0 成果。
- 【区域协同】新增区域创新协同矩阵（中关村AI北纬社区 / 未来科学城 / 怀柔科学城 / 经开区 / 京津冀）：事实句逐条引注新登记的官方背景来源（SRC-BJ-STIC-REGULATION、SRC-AI-BEIWEI-RECRUIT、SRC-BEIWEI-ORIGIN-OPC），其余均明确标为待协商的概念机制，不编造合作事实。
- 【实施】EB-01–EB-08 扩展为实施级建议矩阵（建议责任主体类型、前置资料、试点交付物、验收指标建议、暂停/退出触发、复盘输出）；场景卡03–06新增三阶段「阶段门」表（含数据责任链与退出触发）；全部表述为建议而非已批准安排，不预设伪精确阈值。
- 【空间与品牌】新增图6（assets/figures/key-area-sections.png/.en.png）：三处重点区差异化空间原型与概念断面；新增图7（assets/figures/brand-identity.png/.en.png）：Logo构成、变体色彩与四类概念应用；两图均登记进 manifest 并双语配对。
- 【包容性】新增公众参与与包容性机制段：理事会参与频次建议、异议处理通道、儿童/长者专场试用、无数字设备替代流程。
- 【双语】中英正文逐节/逐图/逐表同步修订并复核实质等价（指标、来源、临时边界警示、三区名称面积、场景治理限制）；重新渲染中英 HTML 与 A3/A0，重跑四道本地门。
- 【不变】临时边界警示（official_boundary=false、boundary_precision=provisional_rough）全部保留；容积率/总建筑规模/高度维持待正式数据补齐；几何与指标未变。

## v1.0 - 2026-08-23

- 初始正式提交：「京张回响带 The Echo Belt」完整双语提案包（proposal_format_version 2，bilingual_contract_version 1）。
- 文化叙事主线「汽笛、钟声、代码——三种回响」；空间结构「一脊两翼三区」；三个AI朝圣地标概念建议（原点 / 回响之门 / 钟鸣）。
- 基于仓库临时边界（PROV-SITE-001 与 PROV-KEY-001/002/003）以 shapely 无缝剖分生成 30 个用地单元、14 处绿地、6 处公共空间、20 处概念建筑组团、12 条概念线路与 3 期分期；全部面积在 EPSG:4548 复算。
- 三项核心视觉指标（site_area_sqm / green_ratio / public_space_ratio）known 且与 visual/index.html 的 data-value 一致；容积率、建筑高度等管控指标保持待正式数据补齐并说明原因。
- 五张核心图纸中英两版由本包 GeoJSON 与指标程序化派生；A3 文册与 A0 展板中英四份 PDF；离线双语 visual 评审板（含 Canvas 回响动画、键盘可达、reduced-motion 静态回退）。
- 合规矩阵覆盖公告 1.3/1.4/1.5 全部 17 项与 agent.1–agent.6；标准矩阵覆盖全部强制标准并如实登记 MOHURD-ARCH-DESIGN-DEPTH-2016 资料缺口；设计深度矩阵 15 项必需项 complete。
- 新增 6 个全球AI创新生态案例来源（背景用途）、2 个政府背景来源、工具链与生成封面的许可记录；constraints 图层如实保持为空并声明控制条件数据缺口。
- 生成参赛封面 assets/media/cover.webp（AI生成概念示意，manifest.cover_image 登记）。
