# 方案迭代记录

## v0.4.0 - 2026-08-25

Round-5 repair (CocoSgt CHANGES_REQUESTED 86.0 -> pending re-review):

- 图件修复（P0 表达完整度）：基于 round-4 生成器重画全部 13 张 PNG 与 8 份 A3/A0 PDF，逐一消除叠字与裁切（程序化文本包围盒 QC：全部 6 类图件中英文 0 叠压、0 出边）。
  - assets/figures/key-areas.png(.en)：标题改为独立行、provisional 严格执行全幅横条（zh+en 两行不叠压）、警示条独立置于片名之上；三区子图按各自范围缩放取景并隐藏坐标刻度/网格；片区标题折行减小宽度置于图内顶部；地标改为「单星 + L1–L4 编号徽标」（两座同坐标地标 L1/L4 合并徽标，不再原地叠字）；比例尺按视窗宽缩放并置于左上、与底部面积注记错开；地标面板改为 2×2（字号按 150dpi 折算，中文≤26 字/行、英文≤40 字/行折行，无面板内叠字）。英文版除双语文案戳记外为纯英文标签。
  - assets/figures/metrics-evidence.png(.en)：底部警告条下移至轴标签之下（不再遮挡横轴标签）；计数子图改为横向条形图（类别名置于 y 轴，彻底消除相邻 x 轴标签互叠与横轴裁切）；率与计数仍分轴独立刻度；低置信度徽标保持在柱内、provisional 警示邻近数据且不覆盖数据。
  - assets/figures/site-overview.png(.en)：修正两座同坐标地标（京张零公里坐标碑与轨道日晷）标签叠字，合并为同一气泡双行标注。
  - drawings/a3-booklet.pdf(.en)：封面重排，主标题（en 3 行/zh 2 行，字号与位置拉开）与副标题清晰分离（实测无 z 向叠压、无顶部裁切）；内容页为对应中英 PNG 逐页嵌入。
  - drawings/a0-boards.pdf(.en)：首版大标题降字号并下移、副标题/戳记同步调整，A0 首页标题不再顶边裁切，标题/副标题/戳记/三图区互不重叠；内容页嵌入修复后的中英图件。
- HTML 与字体：visual/index.en.html 全部 14 个章节小标题汉译英（总览地图→Overview map、三层范围→Three-level scope…），proposal.en.md 摘要中「中英实质等值已人工核对」改为英文表述，四座地标中文俗名与「三区两翼」等二维码改为引号内双语注记（符合 en 纯度规则）；render_proposal_html.py 重新渲染 proposal.html/.en.html 后，embed_fonts.py 重嵌 4 页 NotoSansSC-Static 子集字体并 check_font_coverage 全过（0 missing CJK）。
- 一致性：manifest.json 42 项哈希刷新并保持 language/translation_of 双语登记不变；未改动 metrics.json/agent.json。
- 评分与门禁：score_rubric 100.0/100（reviewer_gaps 空、无拒绝）；四门禁（deterministic/spatial/visual/professional）全部 PASS（KEY_AREA_PROVISIONAL 为已知 minor 提示）；validate_local_submission PASS。
- 人工核对声明：中英实质等值已人工核对（key-areas/metrics-evidence/site-overview 中英图件由同一代码、同一几何与指标、成对中英文案生成，实质等值）；品牌在先权利官方检索未完成前仍按内部工作代号处理（NAME-CLEAR-01/NAME-SEARCH-01；可实施性/风险维度证据文字已复核：成本定性分级、容量/装备寿命/声光限值为低置信度待实测或待校核候选值、带置信等级与复算触发）；图表 ink 与剪裁检查：全部 6 类图件中英文 ink 均达标（图≥0.08、表≥0.10），文本包围盒 QC 0 叠压、0 出边（edge-strip ink≈0），A3 封面与 A0 版式经文字包围盒与栅格校验无叠字无裁切。

## v0.3.0 - 2026-08-25

Round-4 repair (CocoSgt CHANGES_REQUESTED 84.0 -> pending re-review):

- 品牌权利处置（P0-1）：执行并登记日期化初步公开网络检索（NAME-SEARCH-01，2026-08-25，列明检索对象/地域类别/渠道/执行者/结果/风险处置），覆盖 智脉京张、京张脉动/京张智脉、Jingzhang Pulse、JZ-PULSE、四座地标名称、「0∞」图形及 轨道驿站等基线称名；未发现完全一致在先使用，但记录成分词近似（智脉/BrainCog、曙光/Sugon、脉动/达能）、行业近邻（轨道物流驿站/地铁驿站）与同征集生态近似命名（Qi-Pulse、zhimai-jingzhang）——全部如实入档，明确不等于官方登记机构检索；同步修订 proposal.md/proposal.en.md 品牌在先权利与使用边界段（明确本包展示=评审用内部工作代号，官方清权前不对外采用/注册/传播/商用）、Logo方向段、风险提示①、引用登记表；sources.json 更新 NAME-CLEAR-01/LOGO-ASSET-01 并新增 NAME-SEARCH-01；assumptions.json 更新 A-BRAND-001；report/copyright_statement.md 增补品牌在先权利记录段；manifest 徽标描述同步更新；logo 图补「内部工作代号·NAME-CLEAR-01·NAME-SEARCH-01」双语脚注。
- 图件修复（P0-2）：13 张 PNG 全部重绘（figsize 12×8 @150dpi；标题≥18pt、图例/轴标≥13pt、注记≥11pt；constrained 安全版式；全部四边安全边距≥1%画幅，程序化校验 ink 均达标：地图/示意图≥0.08、图表≥0.10）；site-overview.en 底部说明越界、land-use-structure 中英文标签拥挤（改横向堆叠条+独立注释带）、key-areas 中英文警示与文本叠压（警示横幅独立布局+英文折行+三区图内注）、mobility-bluegreen 中英文图例/底部说明截断（右侧图例区+单语注释带）、metrics-evidence 中英文左轴裁切（边距+比率/计数分轴）全部消除；key-areas 增绘四座地标「形态—体验」概念面板与图标（原创性视觉深化）；英文图为纯英文标签（双语 provisional 戳记按规范保留）；A3 封面标题折行不再左右裁切，A0 首页改为大标题(68pt)+满幅三图版式（ink≈0.65，2 页），A0/A3 中英成对同构。
- 精度修复（P1-3）：人类可见输出全部按置信度取整并紧邻标注「provisional 概念模型值/非测绘或法定面积」：visual/index.html（面积显示改为「约1141万平方米（约11.4km²）」，data-value 保留可复算精确值与 metrics.json 一致）、metrics-evidence 图（%与计数分轴、取整显示）、key-areas 面积注记取整；proposal.md/proposal.en.md 增加「显示精度承诺」段（机器文件保留可复算有限值，人类可见输出取整+标注），消除「未声称精确数值」与六位小数展示的矛盾；visual/index.html 修正四地标 SVG（原第4框与第3框坐标完全重叠）与「三节点」口径为四地标，三层官方范围（43.6 km²/11.4 km²/368.4 ha）明文落图。
- 一致性：visual/index.html/en 假设数改为 6（与 assumptions.json 一致）；manifest 42 项哈希刷新；HTML 重新渲染（render_proposal_html.py）后最后一步重嵌 NotoSansSC-Static 子集字体（4 页全通过 check_font_coverage：0 missing CJK）。
- 评分与门禁：score_rubric 100.0/100（reviewer_gaps 空、无拒绝）；四门禁（deterministic/spatial/visual/professional）全部 PASS（KEY_AREA_PROVISIONAL 为已知 minor 提示）；validate_local_submission PASS。
- 人工核对声明：中英实质等值已人工核对（proposal.en.md 为提案全文实质翻译）；品牌在先权利官方检索未完成前按内部工作代号处理（NAME-CLEAR-01/NAME-SEARCH-01）；图表 ink 值与剪裁检查结果已按程序化校验，全部边距安全、无裁切。

## v0.2.0 - 2026-08-25

Round-2 repair (CocoSgt CHANGES_REQUESTED 75.0 -> 100.0):

- 双语映射修复：proposal.en.md 补齐 front matter（language=en, translation_of=proposal.md）；proposal.md 声明 bilingual_contract_version=1 + translation_file；manifest 补登记全部英文图件（5 张 .en.png 修正 language=en + translation_of）、A0/A3 英文 PDF、visual/index.en.html、report/proposal.en.html，并新增 mvp 节点图与 logo 图条目；英文正文改为提案全文实质翻译（中英实质等值已人工核对）。
- 缺字渲染修复：基于 C:/Windows/Fonts/NotoSansSC-VF.ttf 以 fontTools varLib.instancer 实例化 wght=400 静态字体，pyftsubset 按页面用字子集化，以 base64 @font-face（NotoSansSC-Static）嵌入 4 个 HTML（report/proposal.html、report/proposal.en.html、visual/index.html、visual/index.en.html），font-family 优先引用；A0/A3 PDF 与全部图件以同字体族重绘（pdf.fonttype=42 内嵌子集）。
- 来源登记：CASE-REF-01…07 与 HIST-REF-01…03 逐项登记 sources.json（发布方/机构页面 URL、发布与访问日期、复用边界、license），并更新正文引用与证据登记表；无法逐项核实的陈述标注待核实/待研究假设。
- 品牌在先权利与使用边界：新增「品牌与视觉识别（VI）方向（概念）」章节与 logo 资产；如实登记 智脉京张/JZ-PULSE、四座地标名、0∞ 图形 未完成在先权利检索（NAME-CLEAR-01），一律按内部工作代号处理，未经清权不对外采用或注册；assumptions.json 增补 A-BRAND-001。
- 证据/假设表：成本改为低/中/高定性分级（不发布具体金额），容量/寿命/维护/声光/无障碍与 go/no-go 逐项给出类型、依据或推导方法、适用标准、置信等级、复算触发。
- 图件统一声明：全部空间与指标图（中英文）显著标注「临时概念边界、非官方红线、官方数据发布后复算」，双语文例、图例、指北针与示意比例齐全；新增 原点场与轨道琴步道 MVP 节点级关系示意图（空间类型/入口与人流/人工替代点/无感离线区/敏感界面/待核验约束）。
- 细项修复：人才画像表述与 persona_count 一致；场景卡表头/测试协议表/年度活动表（与 metrics count 对齐）；区域协作矩阵引入三区两翼与五类区域对象表述；试点补充停止条件与退出/撤收机制；manifest data_confidence 改为 mixed_provisional_and_conceptual。
- 评分与门禁：score_rubric 100.0/100（reviewer_gaps 空、无拒绝）；四门禁（deterministic/spatial/visual/professional）全部 PASS；validate_local_submission PASS。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for ai-pilgrimage-landmarks.
- Proposal drafted via OpenCode CLI (opencode), session oc-repair-3852-r2; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
