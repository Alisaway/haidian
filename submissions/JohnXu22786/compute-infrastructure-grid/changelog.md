# 方案迭代记录

## v1.5 - 2026-08-25（CocoSgt 复评 74.0 第五轮返修：消除阻断性表达缺陷，恢复正式评审资格）

- **P0 中文 A3/A0 PDF 字体嵌入与字形渲染修复**（drawings/a3-booklet.pdf、a0-boards.pdf 及 .en 版）：弃用 Heiti 回退字体，全部 PDF 改为 matplotlib PdfPages + Noto Sans SC 静态字重（400/700，fontTools instancer 自 refs/fonts 与 Windows VF 生成）嵌入子集；A0 首页标题 66pt（≥60pt）、A3 首页标题 30pt 不被裁切；逐页机器复核：pymupdf 提取文本非空、无 U+FFFD、字体名均为 NotoSansSC 子集（无 Heiti）、每页文本窗体重叠与越界为 0；A0 首页 ink≈0.11-0.12。
- **P0 用地统计单一口径统一**（proposal.md / proposal.en.md / metrics.json / land-use-structure*.png / metrics-evidence*.png / visual/index.html + index.en.html / 4 个 PDF）：全包统一为 5 个聚合类别（科研 0802≈35%、公园绿地 1401≈21%、商务金融 0902≈19%、商业 0901≈15%、城镇住宅 0701≈10%，合计≈100%，低精度约数），聚合公式 share_i=Σ类面积/场地面积（EPSG:4548，置信度 low，官方数据发布后同式复算）；明确 land_use.geojson 的 27 个 GeoJSON 分区要素（land_use_zone_count=27）与 5 个聚合类别（land_use_class_count=5，metrics.json 新增并登记公式）含义不同、不互替；正文/图件/HTML/图纸/指标全部同一口径；旧图件中的“9类”“用地分区24”等错误口径随图件重生成一并消除。
- **P1 图件布局重构**（assets/figures/site-overview、key-areas、mobility-bluegreen 的 zh+en）：采用本包既有“走廊旋转视图 N→右”惯例（与 visual/index.html 示意图一致）将南北向狭长走廊旋转为横向，消除原图过度缩小与左右大留白；图例移至图下 3 列、指北针与比例尺置于空白带、provisional 印章固定左上、注记为固定行高标签+引线；标题 20pt、正文标签≥13pt、图例≥12.5pt、注记≥11.5pt；生成期文本 bbox 两两重叠与画布越界检查全部为 0；ink 0.10-0.154（地图≥0.08、图表≥0.10 机器门槛）全部达标；land-use-structure 与 metrics-evidence 图表左侧标签不再被裁切（按语言加宽左边距）。
- **P1 中英文配对图实质等价**：同一生成器同一数据（27 要素、5 类占比、27/5 口径说明、公告三层范围、provisional 警告），zh 用中文标签、en 用英文标签（en 图零中文）；A0/A3 图纸随图件同步双语；人工核对类别、数值、单位、节点、警告与图位列一致后重跑确定性/空间/视觉/专业四门禁与 scorer，并重新生成 16 张真实渲染预览。
- **表达完整度护栏**：自检包新增 figure_qc 机器证据（移入 self_check.json[figure_qc]，删除根目录孤立 figure_qc.json——其不属于确定性门禁白名单且此前导致校验失败）：ink 覆盖率、10px 边缘裁切探针（PIL/numpy）与生成期文本 bbox 重叠/越界（matplotlib renderer 逐文本两两比较）实测数据齐全，ok/ink_ok/clip_clear/overlap_clear 全绿。
- **en 页面零中文**：proposal.en.md 删除“算力智环”“让算力成环…”等中文夹注（改为英文表述并注明中文版见 zh 文件），render_proposal_html.py 重新生成后替换语言切换锚文案，report/proposal.en.html 与 visual/index.en.html 实测 0 个 CJK 字符；visual zh/en 页新增 27/5 口径说明与两张 data-metric 卡（land_use_zone_count=27、land_use_class_count=5，与 metrics.json 一致）。
- **文件级变更**：proposal.md（§用地计数口径说明）、proposal.en.md（同口径+英文化）、metrics.json（新增 land_use_class_count；land_use_zone_count 公式/假设明确化）、assets/figures/*（10 张图件全量重生成并删除未声明的 *.zh.png 冗余副本）、drawings/*（4 个 PDF 重生成）、report/proposal.html + proposal.en.html（重渲染+WOFF1 嵌入，check_font_coverage ALL_FONTS_OK）、visual/index.html + index.en.html（清理 7 个重复 @font-face 块、新增口径卡）、visual/assets/previews/*（16 张重渲染）、self_check.json（四门禁结果 + figure_qc 机器证据）、manifest.json（41 项哈希刷新、移除 .zh.png 条目）、changelog.md（本条）。
- **门禁结果**：score_rubric.py weighted_pct=100.0 / mandatory_rejections=[] / reviewer_gaps=[]；四门禁（确定性+空间+视觉+专业）全过；validate_local_submission ok=True（仅 site_boundary provisional 常规提醒）；check_font_coverage ALL_FONTS_OK。

## v1.2 - 2026-08-25（第二轮评审返修：视觉阻断项）

- **HTML 中文字体改为 WOFF1 双字重子集嵌入（修复方框缺字）**：弃用 woff2+CFF 子集（评审渲染器判为方框）；改为从 Noto Sans SC 可变字体实例化 Regular(400)/Bold(700) 静态字形（glyf），按各 HTML 可见文本子集化后以 `data:font/woff;base64`(WOFF1) 的 @font-face 嵌入，font-family-first + `!important` 覆盖；latin/CJK/西文全覆盖，四个 HTML 页面经 check_font_coverage 验证 0 missing。
- **图件重生成**（site-overview / key-areas / mobility-bluegreen / land-use-structure / metrics-evidence 等 15 张）：统一(12,8)@150dpi 画布与字体大小关系，消除标题/图例/注记/比例尺重叠；全部图件保留醒目 provisional 警示章；中文慢行图图例补充“绿地率约12.2%”、“公共空间率约0.4%”口径；英文图件左侧标签裁切、比例尺文字压线修复，标注 100% 英文。
- **中文 A0/A3 图纸重排**：A0 首图保留核心总图，A3 首图为封面（页面标题 42pt/30pt 不裁切），图纸上增设 provisional 警示章；用 PyMuPDF 逐页提取文字核查无缺字方框并通过 QA。
- **双语 HTML 补齐**：report/proposal.en.html 与 visual/index.en.html 两个双语页面存在，全部 5 张英文图件（*.en.png）正确引用；英文 HTML 页面无功能性中文残留。
- **预览更新**：visual/assets/previews/ 更新 16 张（html-zh/en 与 visual-zh/en 为真实渲染的整页截图，fig-* 为图件原图，pdf-a0/a3-*-p1 为 PDF 第一页真实栅格）。
- **门禁结果**：四门禁全部 PASS；scorer weighted_pct=100.0；check_font_coverage ALL_FONTS_OK；manifest 中英文合同条目与哈希已同步。

## v1.1 - 2026-08-25（双语 V2 补齐）

- **双语合同（V2）**：proposal.md 增加 bilingual_contract_version="1" 与 translation_file=proposal.en.md；proposal.en.md 增加 language/translation_of 前置声明；5 张英文图件（*.en.png）、英文 A0/A3 图纸（a0-boards.en.pdf / a3-booklet.en.pdf）、英文提案 HTML（report/proposal.en.html）、英文可视化页（visual/index.en.html）全部补齐并在 manifest.json 中登记。
- **HTML 中文字体嵌入**：report/proposal.html 与 visual/index.html（中文版优先）以 Noto Sans SC（SIL OFL 1.1）嵌入 base64 woff2 数据字体（font-family-first），中文不再依赖系统字体；补充可访问性细节（skip-link 与 :focus-visible 焦点样式）。
- **agent.1-agent.6 内容补齐**：品牌识别与视觉规范（Logo/VI）章节加入 logo-cmpjz.png；八个公开案例逐案登记于 sources.json 并写入正文表格；场景卡 10 张；三处文旅地标（智算中枢/边缘智能站/算电协同园）；年度活动品牌 3 项；慢行与无障碍导览、文化叙事与国际传播文案；实施与长期运营矩阵（最小试点/前置条件/责任主体/合作接口/阶段闸门/KPI/维护/反馈/退出恢复）。
- **图件重生成**：全部图件与 A0/A3 图册重生成（统一底色与字体），A3/A0 加入 provisional 警示章并重新排版；中文图件标题字号增大，图例与比例尺统一。
- **计数统一**：proposal.md、metrics.json、compliance_matrix.json 与 visual/index.html 之间 persona_count=6、scenario_card_count=10、industry_test_scenario_count=3、annual_program_count=3、global_case_count=8 对齐。
- **实施与运营矩阵**：三节点试点实施矩阵与长期运营矩阵补齐（责任主体/合作接口/阶段闸门/KPI/维护/反馈/退出恢复），manifest data_confidence 声明为 medium。
- **专业表达合规**：去掉“权威数据”表述改为参与者临时模型数据；把“拟设”机构表述改为未来数据与算力统筹协调机制（概念）；口径与公告一致（按公告自算，非官方核发）。
- **公告口径**：三层范围按公告表述 统筹约43.6km² / 总体设计约11.4km² / 重点区域约368.4公顷，本包几何标注 provisional。
- **权属与来源**：新增 report/copyright_statement.md 并登记资产与字体权利；sources.json 逐案登记发布者/链接/日期/主张/许可边界。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for compute-infrastructure-grid.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcda127f0ffeN38Q60NmetnHtD; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v1.4 - 2026-08-25 (fleet C r4)

- 用地统一为单一分类口径（五类概念分区 35/21/19/15/10%），proposal.md、land-use-structure 图、HTML、PDF 与 metrics 口径一致，并写明聚合与复算规则。
- 全部中英文图件重新生成：消除标题/provisional 警示框/注记/比例尺/指标标签的重叠与裁切，英文图件中文标签全面翻译。
- visual/index.html 与 index.en.html 四流机制图左右裁切与文字叠压修复，响应式人工检查声明。
- A0/A3 第一页重新排版，核心图件在目标纸张尺寸可读，减少无效留白；中英文 PDF 逐页质检声明。
- 措辞修正：GeoJSON/metrics 仅标注为参与者临时模型数据；重点区面积表述改为与公告口径一致（按公告自算，非官方核发）；删除机构“拟设”表述。
- 预览更新：visual/assets/previews/ 16 张真实渲染（html-zh/en、visual-zh/en、4 个 PDF 首页、8 张图件预览）。
- 重新运行确定性校验、空间审查、视觉包装检查和专业证据检查，全部 PASS；中英文文件使用同一组修复后数据与术语。