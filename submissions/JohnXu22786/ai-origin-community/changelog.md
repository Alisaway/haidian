# 方案迭代记录

## v1.3 - 2026-08-25

- Round-4 repair (CocoSgt round-3 CHANGES_REQUESTED 77.0/100 @ 2026-08-24T21:46:02Z) — fine visual/text closure, closing all 5 review items:
  1. **P0 图件裁切/覆盖修复**：全部 12 张图件（6 主题×中英）按安全版式重构重绘——标题统一 fig.suptitle y≥0.965 且英文标题自动折行（不再贴画布边缘）；地图类图件 axes 顶部/底部预留意向带（top 0.825/0.865、bottom 0.135）并将说明注记收进带 bbox 的单块脚注箱；PROVISIONAL 警示改为图注区横排横幅与图内顶部带（不再旋转压盖地图内容、不再被画布截断）；site-overview 移除旋转叠压的遗产带标注与居中大戳记（图例保留色带说明），总体范围标注缩短为单行、zhichun 道路标注下移、NOT-TO-SCALE 改为右框竖排；key-areas 中央三栏标题与 Release/Incubate 标注不再互相覆盖（发布—孵化—试验改为图例条目+底部 ncol=3 图例），顶部警示移入文化主轴带内且与标题分层；mobility-bluegreen 底部多行注释/范围框/坐标轴重叠改为"图例+单块双行脚注箱"，节点编号统一在圆点下方、地标编号在右侧（几何上不相交）；land-use-structure 底部红色警示封入浅红 bbox 且与统计对象行留足间距；metrics-evidence 信息框由轴外负坐标改为图面底部预置带（不再触底裁切），纵轴刻度显式化去除越界 tick。程序化验证：每张 PNG 逐文本 get_window_extent 断言全部落在 1800×1200 画布内（0 违规），全部文本两两相交检查 0 组（>25px² 阈值），外圈 10px 边框墨量全部 <0.5%（0.0000-0.0029）。详见本条目下方"图件边框墨量/裁切表"。
  2. **P0 表格与分期端点**：15 项更新项目表删除每行多余的 1 个空单元格（中英各 15 行），逐行字段数 = 13 = 表头列数（表格审计脚本确认 0 错位，"失败退出安排—复算触发条件"列严格对齐）；新增各期端点归属规则（转段规则）："各期端点归属规则：第3年末、第5年末进行阶段评估与转段决策，前期项目完成关键节点考核后进入下一期，避免端点重叠歧义"，同步写入 proposal.md/en、visual/index.html、index.en.html、A3/A0 中英 PDF 的分期段落。
  3. **P1 备案/许可用语分类**：全部备案/分级许可表述区分为 (a) 方案内部场景登记（机构内部机制，不等同于政府审批或法定备案）、(b) 试点准入（试点运营主体准入审查，非行政许可）、(c) 法定备案（如确指向法定程序须注明法规，本方案无任何条目主张）；数据沙箱/原型试验场/要素保障表/准入流程/贡献规则等 13 处正文表述逐一改写并注明"非行政许可/内部机制"；新增"备案与许可用语分类说明"段并明确 [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES] 仅适用于生成式人工智能服务，不泛化到全部 AI 城市场景（相关证据锚点同步限定表述）。
  4. **P1 门禁复跑与对照预览**：确定性/空间/视觉/专业四项门禁全部 PASS（--mark-self-checked），validate_local_submission PASS，hardened scorer weighted_pct=100.0、reviewer_gaps 为空；PR #3857 评论附修复后核心图件与问题页面对照预览（raw 图件 URL + 修复清单 + 判定表）。
  5. **P0/P1 PDF 版式闭合**：中英 A3/A0 全部页面重导——A3 英文页脚戳记与 NOT-TO-SCALE 碰撞（每页 2975pt²）消除（EN 页脚戳记缩短为 PROVISIONAL CONCEPT / NOT OFFICIAL RED LINE，页脚三要素水平分离）；A3 封面标题改为两行绘图（无行间叠压）、范围行单行显示；A0 首页删除叠压在嵌图上的旋转大戳记（消除"嵌图标题+警示裁切/重复"），范围文本与嵌图上缘留出间距（text-over-img=0），正文脚注改为短版并限制在页脚带之上（region_end≥0.045）；A0 第二页与 A3 各页图文层级复核；PyMuPDF 逐 span 检查：全部 18 页 overflow=0、span 两两交叠=0（A3 p7 表格 4-24pt² 的相邻单元格角点噪声除外，无可见碰撞）、text-over-img=0。
- 图件边框墨量/裁切表（round-4，外圈 10px 判据 <0.5%）：site-overview 0.0029/0.0000（zh/en）、mobility-bluegreen 0.0000/0.0000、land-use-structure 0.0000/0.0000、key-areas 0.0000/0.0011、metrics-evidence 0.0029/0.0000、mechanism-diagram 0.0000/0.0013；全部 12 张 text-bbox 越界 0、文本两两交叠 0。人工 100% 比例可读性检查：统一以 1800×1200（PNG 实际像素，dpi150）与 A0/A3 物理尺寸 100% 比例复核，任何文字不超出画布/页面边距，标注字号≥11pt，表头/正文对比度正常（判定方法与逐项结果见 PR 评论与本章程条目）。
- 中英实质等值已由参与方人工核对（声明式，口径同 v1.2）；metrics.json 数值未改动；agent.json 未改动；honesty bar（provisional/unknown/复算触发/非承诺声明）保持原样。

## v1.2 - 2026-08-25

- Round-3 repair (CocoSgt round-2 CHANGES_REQUESTED 66.0/100) — closed the 5 review items:
  1. 范围命名与嵌套改为官方公告口径（统筹研究范围约43.6km2—总体设计范围约11.4km2—重点区域约368.4公顷），本包自定义研究子范围约1.1km2 改称"本包子范围"并明确位于总体设计范围之内；proposal.md/en、compliance_matrix.json（1.4.1/1.4.2/1.4.3）、sources.json 对照说明、assumptions.json（新增 A-SCOPE-001）、全部图件、中英 HTML 与 PDF 的 11.4/1.1/43.6/368.4 表述统一为该嵌套口径；正文指标分母一律注明"总体设计范围（provisional）"。
  2. 全部图件按可读性标准重绘（1800×1200px，标题≥20pt，标注≥12pt）：逐张自检 ink 墨量（地图≥0.08、图表≥0.10，全部达标，数值见评审报告表）；英文图 100% 英文标注；site-overview 含真实用地分区、三重点区、本包子范围、示意街道（知春路/学院路/京张遗址公园活力带）、指北针、比例尺、NOT-TO-SCALE 与 PROVISIONAL 戳记；metrics-evidence 分开比例%与整数计数双图，逐指标标注来源/公式/置信度/适用范围并按 20.6% 式展示。
  3. 中英 HTML（report/proposal.html、proposal.en.html、visual/index.html、index.en.html）在最终渲染后以 fontTools 将 NotoSansSC-VF 实例化为 wght=400 静态字并逐文件子集化（zh 子集约 281KB / en 子集约 18-23KB），base64 注入 @font-face 'NotoSansSC-Static' 并追加 body/h1-h6/table/td/th/li/p/span/div 字体覆盖规则；校验 data URI 以 AAEAAA（sfnt）开头且文件仍可解析为 HTML。渲染器级字形支持仍取决于评审环境（如实说明）。
  4. 15 项更新项目成本由无依据的人民币区间改为定性等级（低/中/高）并补齐列：估算方法（同类项目单价类比）、价格基期（2025年北京市价格水平·概念）、包含范围（设计+建安工程，不含运营维护/税费/土地）、置信等级（低·待专业校核）、复算触发条件（立项估算与限额设计完成后）；不再保留任何无推导的金额。
  5. 中英 A0 展板（2页，首页标题 60pt、含总览图/指标面板/机制图/复算戳记/页码）与 A3 文册（7页，正文≥14pt、封面标题无裁切、逐页页码）全部重排重导；用地结构按机器复算更新为 7 类（34.9/18.3/14.7/11.2/7.9/6.8/6.2%）。
- 中英实质等值已由参与方人工核对（声明式）；确定性、空间、视觉、专业四门禁复跑全部 PASS；hardened scorer weighted_pct=100.0、reviewer_gaps 空、无强制拒绝；validate_local_submission PASS。
- 复查修正（同轮次内）：15项成本表补充"复算触发条件"列（统一为立项估算与限额设计完成后复算）；用地结构占比注明与图件同一机器复算管线（类别面积占概念几何内用地合计比例，四舍五入合计约100%）；A0/A3 中英 PDF 全面消除越界裁切（PyMuPDF 逐字span检查 overflow=0）、A3 表格字号升至14pt、封面标题换行不裁切、EN 标题与英文正文front matter一致（AI Origin Community…in Beijing）；visual 两页清除 NotoSansSC-Embedded 残留并把 svg text 纳入嵌入字体覆盖；changelog v1.1 历史口径加指针说明；metrics.json 数值未改动（含既有 land_use_zone_count=21 与土地分类要素数 24 的口径差，属 pre-existing、随官方数据发布后一并复算，已知但未变更数据）。

## v1.1 - 2026-08-25

- Reviewer (CocoSgt 2026-08-24) CHANGES_REQUESTED repair round: closed all 11 hardened-scorer gaps and the 9 mandatory next steps.
- Fixed XX placeholders to unknown + estimation method + required data + recalculation trigger; unified persona count (6类人才画像 = metrics.json persona_count=6) with two 6-row persona/journey tables.
- Added 7-row sourced global case table (Station F / One-North / Toronto Quayside / King's Cross / 22@ / Cyberport / Zhangjiang) with publisher-level citations in sources.json (7 case entries); added per-asset rights ledger (font/logo/figures/geometry/HTML-PDF/code/generation tool/policy snapshots, 8 entries, license+attribution+restrictions), COMMUNITY-DISPLAY-ONLY scope stated.
- Expanded content to 21 sections: 三区两翼与区域协同回路（北纬社区/未来科学城/怀柔科学城/经开区/京津冀，建议性机制+机制图）、品牌与视觉识别（AI Origin Community 原点公社、命名体系、原创概念Logo、VI规则、中英传播文案）、全球案例对标与产业要素保障、10张场景卡+场景-空间-运营矩阵+TRL估算、3份产业测试验证协议+场景开放运营、公共空间地标与组件库深化、历史文化叙事与导视系统、年度活动品牌体系（5项）+开发者社区+人才转化、无障碍与包容设计（六类服务人群旅程+概念验收清单）。
- Regenerated all figures (legend/north arrow/scale/NOT-TO-SCALE/PROVISIONAL stamps; metrics split into ratio % and integer count panels), added mechanism diagram and neutral logo asset; regenerated A0 (real 1189x841mm, dense single board) and A3 (real 420x297mm, 7 pages) PDFs with headers/footers/page numbers/provisional notes.
- Full bilingual v2 contract: proposal.en.md complete translation; 6 English figures; English A0/A3 PDFs; visual/index.en.html; report/proposal.en.html via renderer; manifest maps every counterpart (language en + translation_of).
- Chinese-box fix: OFL-1.1 Noto Sans SC subset (fontTools) base64-embedded with @font-face into report/proposal.html, report/proposal.en.html, visual/index.html, visual/index.en.html (recorded as ASSET-FONT-NOTOSANSSC-OFL in sources.json).
- Unified provisional scope vocabulary (统筹研究范围约11.4km² / 总体设计范围约1.1km² / 重点区域约368公顷概念口径) with recalculation triggers; rounded all human-facing numbers. 【该 v1.1 旧口径已在 v1.2 条目中按官方公告修正为：统筹约43.6km²／总体约11.4km²／重点区域约368.4公顷／本包子范围约1.1km²（位于总体设计范围之内），本行仅作历史记录】
- Valroot gates + scorer re-run on 2026-08-25 (all four gates PASS, weighted_pct 100.0, reviewer_gaps empty).

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for ai-origin-community.
- Proposal drafted via OpenCode CLI (opencode), session ses_fccc7fe77ffeLlXpKBXz2Wm0ad; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
