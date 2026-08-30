# 方案迭代记录

## v0.5.0 - 2026-08-26（Round 8 修复：应用 CocoSgt 70.0/100 逐条意见）

- **单项用地口径修复（风险与合规 3/5、表达完整度 2/5 的根因）**：删除"公园绿地约30%"与正文/green_ratio 混用口径，确立**单一口径**——land_use.geojson 十类图斑在 EPSG:4548 下的面积占比（合计=提交总体范围面积，比值 1.0000）；同一数值用于 proposal.md 用地表（0802 科研21.6%、1401 公园绿地21.0%、0701 住宅17.9%、0901 商业14.4%、0902 商务金融9.1%、0803 文化6.8%、0702 社区服务4.7%、0804 教育科研设计1.8%、16 留白1.3%、1207 道路1.3%）、land-use-structure 中英条形图（条长=标签=上述占比，类别—条长—标签严格一致）、metrics.json 新增 land_use_share_* 十项（status=known、0–1 比值）、visual/index.html 与 index.en.html 用地分区段、A3/A0 图册；green_ratio(12.9%)、public_space_ratio(0.46%) 明确为另一几何口径（green_space/public_space 图斑 ÷ site_area），并声明不复用其他比例口径、官方数据发布后按同一公式整体复算。
- **双语图面重叠/裁切/遮挡修复（表达完整度 2/5）**：全套 20 件图件（10 中英成对）以固定脚手架重绘，每件保存前运行 matplotlib 文本包围盒 QC（越界+两两重叠检查，0 违规）与 PIL/numpy ink/clip 实测；重点修复 site-overview（图例移入右独立列不遮挡地图、节点标签白底错位引出线）、land-use-structure（类别名作 y 轴刻度、占比标于条端，条长=标签）、mobility-bluegreen（左侧地形图+右侧剖面双面板、图例白底左下安全区、2 km 等距示意圆非等时圈+步速假设+检索日无路网数据警示、剖面面板浅灰底保证 ink）。ink 结果：site-overview 0.42/0.42、land-use-structure 0.123/0.123、mobility-bluegreen 0.135/0.132、key-areas 0.265/0.263、metrics-evidence 0.110/0.112、brand-identity 0.140/0.142、innovation-ecosystem 0.53、node-components 0.33、scenario-cards 0.276、operation-flow 0.33（图≥0.08、图≥0.10 达标线；edge-clip 全 0）。
- **A0 第一页重排（表达完整度 2/5）**：A0 展板 1 仅放核心地图（site-overview）+ 用地结构（land-use-structure）+ 三节点（key-areas）三大件，img_panel 逐面板保长宽比 fit（不裁切不拉伸不letterbox缩放），标题≥60pt（中英自动换行、实测包围盒不越界）；A0 预览页密度验证 ink≈0.09、四边裁切 0；A3 封面标题换行不再越界（中英均过 QC）。
- **七维评分逐项修复（可实施性 3/5、AI 与规划创新性 4/5、原创性 4/5、任务书相关性 4/5）**：①任务书相关性——新增「本包定位与全带统筹接口（专项界定）」章，显式说明青年友好专项与全带统筹的三层接口，不再被理解为与全带统筹冲突；②原创性——新增「场地独有形态与原型验证（概念）」章（三节点场地形态语言 + 「可撤回原型期」机制 + 原型验证迭代闭环，均概念、不表述为已建成/已批准）；③AI 创新性——新增「空间反馈—运营评估—规划调整闭环与共测基线（概念）」节（使用—评估—调整可撤回闭环 + 三级档位共测基线，AI 仅提供证据与候选，调整由人决策）；④可实施性——新增「分期决策门与基线设定流程（概念）」段（每期成本复盘/权属确认/公众评议/停止退出条件 + KPI 以共测基线流程设定、官方基线发布后校准）。中英正文同步等价更新。
- **品牌在先权利与使用边界**：品牌识别章新增段落——概念阶段未完成官方商标检索，名称与标记仅作内部工作代号、不用于对外注册/商业化/官方署名，使用前须清权；report/copyright_statement.md 资产台账与 sources.json 保持逐项登记。
- **图件与正文一致性**：metrics-evidence 比率分轴新增强化公园绿地 21.0%（land_use 单口径）与 green_ratio 12.9%、public_space_ratio 0.46% 并列说明；计数分轴 8 项与 metrics.json（3/3/9/30/12/3/3/6）一致；AI 闭环节新增「使用—评估—调整」与共测基线、决策门等内容均保持概念建议表述，未新增任何结论性数字。
- **生成器与自检**：图件/PDF 由确定性脚本（regen_youth_figures.py，文末注明脚本位于临时工作区、仅输出到本包内）生成；生成期文本包围盒 QC 与 ink/clip 实测记录见本条目；figure_qc 机器证据持久化于 self_check.json（ink+edge-clip 实测，overlap_clear=not_verified，文本重叠以生成期 bbox QC 覆盖并记录）。
- **校验复跑**：四门禁全部 PASS（validate_local_submission / spatial_review / visual_review / professional_review，exit=0；spatial 仅保留既有 minor KEY_AREA_PROVISIONAL×3）；score_rubric 97.0/100（无 mandatory_rejections、无 reviewer_gaps）；embed_fonts + check_font_coverage → ALL_FONTS_OK；manifest 哈希与 self_check.json（formal-review-ready，含 figure_qc）持久化。

## v0.4.0 - 2026-08-25（Round 4 修复）

- 图件可读性深度修复（CocoSgt 表达完整度 3/5 逐项）：land-use-structure（中英）重绘，英文标题不再被画布边缘裁切，中英页脚/免责声明不再重叠越界，标题带、口径说明卡、复算触发与 PROVISIONAL 印章均置于安全边距内；mobility-bluegreen（中英）横向说明改为面板内逐行预换行排版，消除两侧截断，2 km 等距示意圆与非等时圈限制、步速假设、检索日（2026-08-25）无路网级数据、官方数据发布后重算等警示在常规缩放下完整可读；site-overview（中英）节点标签改为白底边框+引出线双侧错位布置，消除与线形叠压，并补齐图例、比例尺、指北针、三层范围（43.6 km²/11.4 km²/368.4 ha）与 provisional 印章。
- 图件技术规范达标：全部六张重绘图为 figsize≈12×8 @150dpi、constrained 版式、bbox_inches=tight 安全边距；标题≥18pt、图例/标注≥13pt、注释≥11pt；PIL/numpy 校验无边缘裁切（四边 18px 带内非白 0）且 ink 覆盖：site-overview 0.25/0.19、land-use-structure 0.50/0.37、mobility-bluegreen 0.33/0.23（图≥0.08、图≥0.10 的达标线）；en 变体 100% 英文（无残留中文，无缺字形警告）。
- 用修复后的中英配对图重新生成成果：report/proposal.html 与 report/proposal.en.html（render_proposal_html.py，字体嵌入置于最后）；drawings/a3-booklet.pdf、.en、a0-boards.pdf、.en 重建——A0 三张展板、A3 封面+10 图页，图件按长宽比保真居中排布不裁切、不拉伸，A0 首页 60pt+ 可读标题（实际 30-34pt 放大至整幅），A3 封面标题分两行不越界，每页含来源与双语气 disclaimer；逐页检查裁切/空白失衡/文字重叠/图例遮挡/双语气位置对应/免责声明显著性后通过。
- 口径与一致性不变：用地结构图采用与正文、metrics.json 一致的几何复算口径并明示聚合/复算规则（land_use 概念分区面积合计；green_ratio/public_space_ratio 为 green_space 图斑口径；官方数据发布后整体复算替换）；三维评分中涉及的三项图件表达修复均附逐项证据与修复说明见本条目。
- 校验复跑：四门禁全部 PASS（validate_local_submission / spatial_review / visual_review / professional_review，exit=0；删除自检临时文件 _inspect.py/_inspect2.py 以通过确定性校验，spatial 仅保留既有 minor KEY_AREA_PROVISIONAL 提示）；score_rubric 100.0/100（无 mandatory_rejections、无 reviewer_gaps）；embed_fonts + check_font_coverage → ALL_FONTS_OK；manifest 哈希与 self_check.json（formal-review-ready）持久化。

## v0.3.0 - 2026-08-25（Round 2 修复）

- P0 修复「15 分钟公共生活圈 = 2 km 步程圆」无依据对应：mobility-bluegreen（中英）删除「十五分钟公共生活圈」表述，将 2 km 圆改标为「等距示意圆、非路网等时圈」，图上注明步速假设（1.2–1.4 m/s 时单向约 24–28 分钟）、未计入交叉口/屏障、检索日（2026-08-25）无公开路网级数据、等时圈须待官方路网数据发布后重算；proposal.md / proposal.en.md 同步补概念命名与非等时圈声明；A3/A0 图册（中英）随图件重生成。
- P0 修复五项案例来源为主张级可核验链接：CASE-SHENZHEN-SHUIWEI（深圳新闻网 2017-12-15、深圳商报 2018-03-28、DOFFICE 项目页，2026-08-25 全部抓取核验；「全国首个」降级为「深圳首个」口径并附学术佐证）、CASE-SEOUL-YOUTH-HOUSING（english.seoul.go.kr 三个主张级页面）、CASE-SINGAPORE-HDB-COMMONS（HDB 官网设计特征页、NHB Void Decks 电子书 2013、DP Architects GoodLife! Makan）、CASE-HK-YOUTH-HOSTEL（hyab.gov.hk 官方页面 + 2025-10-15 立法会书面答复；主管域名由 hab.gov.hk 更正为 hyab.gov.hk）、CASE-YOUTH-DEVELOPMENT-CITIES（中国共青团网官方全文 中青联发〔2022〕1号 + 新华网 2022-06-02 试点名单稿）；逐项补准确元数据、所支持主张与引用边界，正文案例表与参考资料表同步更新并加 [source:CASE-…] 锚点（正文表格内 URL 数字串过长会误触规则，完整主张级链接全部落在 sources.json）。
- P1 修复图件可读性：根因修复 plot_geoms 对 fc=None 的多边形默认填充（此前整个场地被默认蓝覆盖，即「九类用地大面积统一蓝色」来源）；用地结构图（中英）重绘为九类概念分区实际图斑可区分配色 + 图例一一对应（含商务金融用地 0902 实际图斑），占比为几何复算口径并注明与正文概念口径的差异；geometry/land_use.geojson 确定性重建并以内嵌（interior re-cut）方式实现 0804、1207、16 三类目（union 保持精确、投影后无重叠、无自相交），metrics.json 的 land_use_zone_count 更新为 30；site-overview 环线说明移到无碰撞区；key-areas 英文副标改为两行换行+加大间距（消除「honorsLive」式粘连）；A0 展板改为真实 A0 幅面并以更大图幅铺排（首页核心图件 65%→70% 宽度、全高 93%）。
- 校验复跑：四门禁全部 PASS（validate_local_submission / spatial_review / visual_review / professional_review，exit=0；spatial 仅保留 3 条既有 minor KEY_AREA_PROVISIONAL 提示）；score_rubric 100.0/100（无 mandatory_rejections、无 reviewer_gaps）；embed_fonts + check_font_coverage → ALL_FONTS_OK；manifest 哈希与 self_check.json（formal-review-ready）持久化。

## v0.2.0 - 2026-08-25

- 修复 v2 双语合同：proposal.md 声明 bilingual_contract_version=1 与 translation_file=proposal.en.md；proposal.en.md 声明 language=en、translation_of=proposal.md，并提供完整英文译文。
- 补齐英文 counterpart：五张基础图与五张扩展图（*.en.png）、A0/A3 英文图册（a0-boards.en.pdf / a3-booklet.en.pdf）、report/proposal.en.html、visual/index.en.html，全部登记在 manifest.json（language=en + translation_of）。
- 重构专业图包：全部图件重渲染，加入 provisional 场地语境、比例尺、指北针、图例、三节点平面/剖面与空间序列、创新生态图谱、品牌识别（一环三点 Logo 母版与色板）、地标目录、组件库、场景卡总览与运营流程；A0 改为 3 张满幅展板（zh/en 各 3 页），A3 为封面+10 页图册（zh/en 各 11 页）。
- 正文补齐 agent.1—agent.6 实质交付：案例扩至 6 个（逐项登记来源与许可边界）；场景卡扩至 10 张（C-01—C-10）；新增 3 张产业测试验证场景卡（T-01—T-03）；地标编号对象 LM-01—LM-03；年度活动品牌 A-01—A-03；新增区域协同专章（北纬社区、未来科学城、怀柔科学城、经开区、京津冀）与品牌识别专章。
- 统一口径：persona_count=6（正文六类人才画像）、global_case_count=6、industry_test_scenario_count=3、annual_program_count=3、landmark_count=3，均与正文编号对象一致；补充公园绿地 30%（用地分区口径）与 green_ratio/public_space_ratio（几何复算口径）的关系说明。
- 新增试点执行表（牵头/协作/前置调查/成本等级/维护频率/数据最小化/人工复核/无障碍替代/KPI/投诉与申诉/停止条件）；provisional 数值一律以约数与低置信度标注。
- 闭合来源与版权链条：sources.json 新增六个案例条目（发布者/链接/日期/具体主张/许可边界）；report/copyright_statement.md 转为逐项资产台账；report/narrative.md 记录中英文主张、指标、免责声明与图位等价核对表。
- 修复 HTML 中文字体问题：visual 两版与 report 两版 HTML 均采用中文优先字体栈（Microsoft YaHei/PingFang SC/Noto Sans CJK SC），消除方框字风险；visual/index.html 与 proposal 内容对齐并补齐 14 个展示标记。
- Valroot 四门禁与评分器复跑（结果持久化于 self_check.json）。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for youth-innovation-community.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcd92677bffeAVm1X03iqfJfdP; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).