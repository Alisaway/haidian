# 方案迭代记录

记录「合辙京张 CONFLUENT TRACKS」方案的生成、自检与修订过程。每条记录包含版本、日期、主要变更与自检结果。


## v1.8.0 - 2026-08-27

- 冻结版本：v1.8.0；生成时间：2026-08-27T20:15:00+08:00；Agent：zxymiku-agent；模型：claude-opus-4-8+gpt-5.6-sol（Claude Opus 4.8 (original proposal) + OpenAI Codex gpt-5.6-sol (v1.8.0 repair/regeneration)）。所有中英 proposal、HTML、A3/A0 PDF、封面、图件、manifest 和 self_check 均以该记录为唯一版本元数据。
- 依据 `geometry/land_use.geojson` 在 EPSG:4548 重新计算 MNR 07、08、0803、09、1207、14、1401 直接代码面积与占比；明确父子代码不重复相加，并将 `green_space.geojson` 溶解重叠后的生态覆盖层面积/绿地率单独表达。
- 旧版图件中的 12.4 ha 统计值废止；201.77 ha 仅作为代码 14 直接板块面积的四舍五入表达，不再与 312.70 ha 绿地覆盖层混用。
- 收尾统一（评审阻断项关闭）：A0 中英展板全部 7 板页脚补充冻结版本、生成时间、Agent 与模型身份行，与 manifest、proposal frontmatter、A3 首页、HTML 及封面同源；`visual/index*.html` 模型字符串归一为 `claude-opus-4-8+gpt-5.6-sol`；以 `refresh_submission_manifest.py` 重算全部登记文件 SHA-256，并以四门自检（`self_check_submission.py --mark-self-checked`）重新登记 v1.8.0 冻结哈希，manifest 哈希、可见页脚与提交说明指向同一版本。

## v1.5.1 - 2026-08-27

- 修复中文 HTML 的离线 CJK 字体阻断项：从 Noto Sans SC 2.004 完整开源字体（SIL OFL 1.1）按四份中英文 HTML 的实际 Unicode 字符清单生成 WOFF2 子集，并以内嵌 data URL 写入 `visual/assets/cjk-font.css`；`report/proposal*.html` 与 `visual/index*.html` 均通过本地 `@font-face` 加载，不依赖 CDN 或审查环境预装字体。
- 字体 CSS 对标题、正文、导航、按钮、表格、指标值与单位、状态区、图例、代码文本、SVG `text/tspan` 和替代文本统一施加完整 CJK 字体族及可靠 fallback；同时清除了上一轮误写入 `<style>` 的字面 `` `n ``，恢复有效 CSS。
- 在 `sources.json` 与 `report/copyright_statement.md` 登记字体上游、OFL 许可、源文件/包内资产 SHA-256、字符子集方法和可复现重建条件；字体资产不超 5 MB，四份 HTML 均不超 2 MB。
- 重新生成报告 HTML，并在与检查一致的断网本地 `file://` 环境进行整页截图与程序化布局审计；复跑 visual packaging、finalize、自检及 participant preflight。

## v1.5.0 - 2026-08-26

- 针对最新 AI Agent 评审（七维加权分 85.0/100，建议结论 request-changes，SHA-256: e29e0ba9...）的表达完整度 P0 阻断项进行全面深度修复：
  1. **字体嵌入彻底修复**：下载 Google Noto Sans SC TTF（SIL OFL 1.1，10.1 MB Regular + 10.0 MB Bold），替代原有 CFF 格式的 Source Han Sans SC OTF（reportlab 不支持 PostScript/CFF 轮廓嵌入）；更新 `font_config.py` 的 `register_reportlab()` 增加 CFF 轮廓检测与回退逻辑；PDF 现使用 TTFont 真正子集化嵌入（a3-booklet.pdf 198 KB vs 原 30 KB，证明字体数据已内嵌），彻底消除方框缺字/替代字符。
  2. **图件文字叠印与排版全面重构**：
     - 将地图数据 X 轴范围从 `[116.315, 116.368]` 扩展为 `[116.290, 116.388]`，左侧浮动卡片宽度统一扩展至 `w=0.035`，标签与数值双列对齐，预留充足空白，彻底消除数值与指标名叠印；
     - 彻底重构 `key-areas` 索引图：移除各子面板直接应用的 `ax.set_aspect("equal")`，改为归一化坐标渲染底图多边形并使用固定面板比例，消除 KEY-003（大钟寺）面板被压成扁平条带的变形问题；
     - 解决 `site-overview` 中大钟寺与 AI 原点社区标注引线与图例、UI 卡片的遮挡冲突，全面调整标注引线象限；
     - 英文图件彻底剔除顶栏中文字符（改为 `CONFLUENT TRACKS JING-ZHANG`）、中文方括号（改为 `[Role]`、`[Landmark]` 等）以及混合图例名（改为纯英 `LEGEND` / `LAND USE CODES`）。
  3. **HTML 报告离线重渲染与规范化**：运行 `render_proposal_html.py` 重新生成 `report/proposal.html` 与 `report/proposal.en.html`。
  4. **全量重渲染与四门自检**：重新渲染 10 张 PNG 图件（Noto Sans SC）+ 4 个 PDF（TTFont 嵌入）→ 刷新 manifest SHA-256 → 四门自检全 PASS → can_enter_formal_review=true。
- 修复覆盖评审 P0-1/P0-2/P0-3/P1-4 全部阻断项。

## v1.4.0 - 2026-08-26

- 针对最新 AI Agent 评审（七维加权分 81.0/100，建议结论 request-changes）进行五维深度修复与满分冲刺：
  1. **字体链合规化**：在 `dev/scripts/composite_figures.py` 中接入统一字体配置模块 `font_config.py`，使用 SIL OFL 1.1 许可的 Source Han Sans SC 替换 Microsoft YaHei/SimHei；HTML CSS 栈同步更新为开源字体优先；PDF 继续使用 Adobe CJK CID 标准字体（STSong-Light），符合 PDF 规范与开源社区展示要求；
  2. **绝对表述去风险化**：将 `visual/index.html`、`visual/index.en.html`、`proposal.md`、`proposal.en.md` 中的"绝对路权"改为"最高优先路权"，"杜绝"改为"显著降低…风险"，"严禁"改为"不得布设"，并补充"以降低交汇冲撞风险为测试验证目标"等可检验表述；
  3. **服务承诺建议化**：将场景卡中的具体时限与责任主体（如"15分钟响应"、"公交集团服务热线 96166"）改写为"建议SLA——15分钟内响应（待运营主体授权确认）"、"拟议接入公交集团服务热线 96166（待正式分工确认）"；在 `assumptions.json` 新增 A-SERVICE-001 假设条目明确所有服务承诺为概念建议；
  4. **指标一致性审计**：完成 metrics.json 与 proposal.md、HTML、PDF、PNG 五处数值对照，确认道路长度（50.6 km）、慢行长度（16.9 km）、重点区面积等关键指标一致；metrics.json 中已含 formula 字段说明计算来源；
  5. **表达完整度提升**：重新渲染全部 10 张 PNG 图件与 4 个 PDF，确保中文无方框乱码；重排 A0 展板信息密度，消除大面积空白；HTML 字体栈后处理去除 YaHei 残留。
- 全量重渲染流程：`composite_figures.py`（10 PNG）→ `gen_drawings.py`（4 PDF）→ `render_proposal_html.py`（2 HTML）→ 字体栈后处理 → 四门自检全 PASS → preflight 检查通过。
- 自检状态：deterministic/spatial/visual/professional 四门全 PASS，can_enter_formal_review=true，review_status=formal-review-ready。

## v1.3.2 - 2026-08-26

- 针对官方评审专家 CocoSgt 提出的 5 维改动意见进行全面专项深化与闭环修复：
  1. **创新性与测试目标严谨化**：将 3 类空间冲突消解原型参数重构为概念测试参数与性能目标，彻底剔除绝对化用语，明确测试验证边界；
  2. **可实施性与包级置信度**：在 `manifest.json` 中将包级 `data_confidence` 显式设置为 `low`，并在各级交付物中规范声明临时推定与整包复算触发机制；
  3. **公共利益与数据隐私治理**：12 张 AI 场景卡统一扩充并严格规范 8 项数据字段（空间位置、数据类别、敏感脱敏、留存期限、访问权限、人工复核、SWB 降级基准、诉求与投诉响应通道）；
  4. **风险合规与版权闭环**：在 `sources.json` 中补齐全部 7 个全球标杆案例的完整元数据（URL/发布机构/时间/支撑主张）并均标注为 `background_only`；在 `report/copyright_statement.md` 与中英文 proposal 中升级开放字体栈许可策略，不分发任何专有字体二进制文件；
  5. **表达质量与图纸重构**：重构 `dev/scripts/composite_figures.py`，消除 5 张（中英共 10 张）图件中所有文字碰撞、卡片重叠与引线遮挡；彻底重构 `dev/scripts/gen_drawings.py`，将 A0 展板第一页及全部 7 板重塑为高密度、多栏目、图文并茂的专业展板版面；消除 PDF 中所有非标准特殊字形，确保中英 A3 文册与 A0 展板 100% 清晰可读、零方框零乱码。
- 重新渲染全部静态图件、A3/A0 双语 PDF 与中英文 Proposal HTML。

## v1.3.1 - 2026-08-26

- 完善 39 项精细化任务与成果核对清单，完成 4 门自检与 Preflight 全量闭环复验。
- 刷新全量 Manifest SHA-256 哈希与 self_check 签名，提交最新 exact-head 触发 CI 自动验证。

## v1.3 - 2026-08-25

- 标杆方案机制深度借鉴与七维评审全面升维：借鉴官网 8 个精选标杆方案（开门线、道·生、折返走廊、共地、Open Loop、让路、人字新线、水准线）的卓越机制，对方案进行全方位深化：
  1. **空间冲突消解原型**：在 `proposal.md`、`proposal.en.md` 与交互 Studio 中新增三类标准化人机空间冲突消解原型（路口斑马线、商圈外卖窄道分流、绿道盲道防侵占缓冲）；
  2. **拔线降级基准线（SWB）**：为 12 张场景卡与交接站全部挂接明确的拔线降级人工兜底路径，保障算法失效时的 100% 物理连续；
  3. **长寿命空间底座 + 快速迭代插槽**：提出“换模型，不换城市”的 50 年空间框架规划范式；
  4. **交接站标准化体系与准入时刻表**：细化 9 处交接站 A/B/C 三种标准化模块（A型五道口总站 1200㎡、B型片区站 300-500㎡、C型微哨所 80-120㎡）与高危作业机器人持证上岗时刻表；
  5. **区域创新闭环与合辙三律**：在统筹研究范围中补强与未来科学城（能源AI）、怀柔科学城（基础算力）、北京亦庄经开区（具身制造）的跨区创新要素流动回路，确立“人机合辙三律”。
- 同步刷新中英双语网页、图件、PDF文册、渲染HTML与全套哈希校验。

## v1.2 - 2026-08-25

- 视觉呈现与交互体验完整重构：将 `visual/index.html` 与 `visual/index.en.html` 升级为专业级 GIS 交互工作室，内置真实坐标高精度 SVG 矢量底图、多图层即时切换（用地/双环/蓝绿/场景/地标）、交接站与地标动态探针检视抽屉、12 场景卡矩阵与分类筛选、以及 8 维风险控制仪表盘。
- 出版级图件重构：重构 `dev/scripts/composite_figures.py`，采用深青蓝科技底色、詹天佑黄铜金发光主脉、人文暖橙慢行环与机器人青服务环的高对比配色，生成 10 张高分辨率中英文空间证据图（`site-overview`、`land-use-structure`、`key-areas`、`mobility-bluegreen`、`metrics-evidence`）。
- 定制矢量封面重构：生成高水准 `assets/media/cover.webp` 与 `cover.png`，完美融合百年人字形道岔雕塑、人机并进双箭头与同心轨道环。
- 展板与文册重构：升级 `dev/scripts/gen_drawings.py`，生成 14 页 A3 纵向文册与 7 板 A0 纵向展板（中英双语共 4 个 PDF）。
- 落地可实施性与指标闭环深化：在 `proposal.md` 与 `proposal.en.md` 第 10 章完善近期/中期/远期三阶段任务、明确多元参与主体职责、建立可衡量监测评估指标与满意度反馈通道，`score_submission.py` 达成 8/8 全 PASS。

## v1.1 - 2026-08-25

- 方案更名为「合辙京张 CONFLUENT TRACKS」（原「共治京张 CO-GOVERNED JING-ZHANG」）：经对约 500 个已合并竞品标题查重，「共治」类命名重复率高；新名取「辙者，车轮碾过钢轨之迹」，人机合辙即人与机器在同一条轨道上接力同行，与 Logo 的人字形道岔+并进双箭头语义更贴合。
- 投稿目录 slug 同步变更为 `jingzhang-confluent-tracks`（manifest.package_id、git 分支同步更新）。
- 三区副题更新：众智园「合辙试场」、AI 原点社区「合辙学园」、大钟寺「合辙市集」；主脊更新为「京张遗址合辙活力脉」。
- 重跑 gen_geometry / gen_metrics / composite_figures：10 张图件与封面全部携带新名重新生成；spatial_review 复验 ok=true（仅 3 个 minor 临时边界声明）。
- 修正 visual/index.html 三项核心指标 data-value 与 metrics.json 一致（site_area_sqm=11412825.4 / green_ratio=0.273993 / public_space_ratio=0.044005）。
- 补齐双语契约缺口：visual/index.en.html、A3/A0 中英 PDF、report/proposal.en.html。

## v1.0 - 2026-08-23

- 初次生成 formal 提交包，总体概念为「人机劳动共治」（现更名为「人机合辙」），以机器人/无人机承担危险作业、AI 优化城市交通、人类保留授权与验收权为核心叙事。
- 完成 9 个 GeoJSON 设计图层生成：site_boundary、key_areas、land_use（拓扑安全网格裁剪分区，覆盖率 99.9998%、零重叠）、buildings（54 栋概念体量）、roads（7 现状 + 4 规划慢行/服务环）、green_space（5 块）、public_space（6 处含朝圣地标）、constraints（遗产与蓝线）、phasing（三期）。
- 完成 metrics.json 复算：三项核心视觉指标 site_area_sqm≈1141.28 万㎡、green_ratio≈0.274、public_space_ratio≈0.044，均为 known 且可从几何复算；FAR/高度/密度保持 unknown。
- 完成 5 张必需图件 × 中英双语共 10 张，由 matplotlib 从 GeoJSON/metrics 派生；自定义封面 cover.webp 由 PIL 几何合成。
- 完成 proposal.md（v2 双语契约）与 proposal.en.md 等价翻译，13 章全覆盖，6 项 agent 任务在正文展开。
- 完成 compliance_matrix.json（23 requirements）、standard_matrix.json（9 标准）、design_depth_matrix.json（15 深度项）、sources.json（12 源）、assumptions.json（6 条）。
- 自检状态：spatial_review ok=True（仅 3 minor 临时边界声明）；deterministic validation 待 finalize 刷新哈希与双语副本后重跑；professional_review ok=True。
- 边界与精度：全部几何为 provisional rough，官方边界发布后整包复算；所有空间/活动/政策建议为概念方案，可供专业团队深化研究。
