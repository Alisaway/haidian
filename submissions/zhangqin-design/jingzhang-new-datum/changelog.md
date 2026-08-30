# 方案迭代记录

## v3.0 — 英文成果逐页消除叠图叠字（本地候选，未推送）

- 逐页渲染核查英文 A3（29 页）、A0（6 页）、节点图册（5 页）与剖面运营图册（5 页），确认叠图源自英文节点页底部重复覆盖层，并沿引用链传播至 A3 与 A0。
- 从同一方案的干净矢量底稿重建 5 张英文节点页，删除重复白卡、色条和文字层，保留方案平面、场景、运营链、风险复核及就地 AI 概念图声明。
- 将干净节点页同步替换至英文 A3 第 10/12/14/16/18 页；完整遮除并重排第 3/5/7 页被左裁的图内标题，避免用半透明或错位叠层掩盖问题。
- 重建英文 A0 第 2 板为一张总览加五张节点页的 3×2 矢量网格，所有面板在固定边界内等比缩放，不再继承旧节点图层冲突。
- 重新输出三套英文接触表并人工检查全部 45 页；未发现新的叠图、叠字、越界、黑块或空白页。

## v2.9 — 85分评审最终可读性阻断修复（本地候选，未推送）

- 为 `report/proposal.html`、`report/proposal.en.html`、`visual/index.html` 与 `visual/index.en.html` 统一加载本地内嵌的 Noto Sans SC 字体子集；子集按四个离线页面的实际字符重建，断网环境不依赖系统 CJK 字体。
- 对四个 HTML 的全部可见字符执行字形覆盖核对，中文标题、正文、图注、概念图警示和语言切换文字均为零缺失字形。
- 修复英文 A3 首页第三张信息卡的左侧裁切，完整恢复 “THREE FIELDS” 与 “Validation + co-creation + urban release”，其余 28 页保持不变。
- 重新输出英文 A3 首页预览并进行肉眼核对；修改后仍需刷新 manifest、运行四门自检与推送前检查，正式推送须经主创建筑师授权。

## v2.8 — 成果要求对标与空白/重复页压缩（本地候选，未推送）

- 将中英文 A3 从 36 页压缩为 29 页：保留前 9 页核心叙事，删除 5 张重复单场景页，以 5 张节点证据页和 5 张剖面—运营页形成“一节点一证据链”。
- 重建 A3-20–29，逐项覆盖生态与 6 个案例、区域六类流、5 类人物与 10 个场景、3 项测试与双轨公共服务、7 类组件与 3 座地标、文化品牌、实施矩阵、年度运营、指标风险及七项评分导航。
- 重建中英文 A0-04–06，将原空白区域替换为生态协同、案例转译、三区原型、三座可运营地标、组件库、实施/退出、年度活动和七步转化证据。
- 补齐节点图册与剖面运营图册原空白卡片，增加指标、运营、人工接管、风险触发和恢复状态，减少同图跨页重复。
- 重新同步中英文报告、展示页与 `compliance_matrix.json` 的 A3-20–29 / A0-04–06 页码索引，并为 agent.3 增加独立证据入口。
- PDF 内嵌 SIL OFL 1.1 授权的 Noto Sans CJK SC 子集字体，消除中文缺字方框和英文标题异常字距；字体来源、许可和使用边界已登记。

## v2.7 — 66分专业评审意见定向修复（本地候选，未推送）

- 补齐三大定位、五大功能、三区两翼与人才/算力/最小必要数据/资本服务/场景/公共服务六类流的协同矩阵。
- 新增6个一手来源全球案例的“可比条件—采用机制—不可移植边界—京张转译”，以及5个区域建议接口；所有合作状态均明确为未确认。
- 中英文同步新增七类公共空间组件、四层品牌导视、JZ-01–06/T1–T3/年度活动实施矩阵和七步参与转化流程。
- 重建中英文总体、慢行与三片区图；英文三片区图改为三个不同的平面—剖面—场景面板。
- 中英文A3新增31–36页、A0新增04–06板；全部8份图纸PDF逐页增加AI概念图属性标识。
- 离线HTML捆绑Noto Sans SC子集字体，更新中英文报告和展示页，并在合规矩阵增加精确页码/锚点索引。

## v2.6 — principal-approved direct English A0 translation

- Replaced the reconstructed English A0 set with a direct English translation of the principal-approved Chinese v34 A0 master.
- Preserved the original three-board layout, drawings, image positions, colour bands, frames, proportions and visual hierarchy; only the Chinese presentation text was translated.
- Retained the already accepted 22-page English A3 booklet without re-layout or drawing replacement.
- Refreshed the submission manifest and persisted self-check after the English A0 replacement.

## v2.5 — English A0 colour-bar alignment correction

- Removed all secondary colour bars that had been overlaid across A3-derived image crops and caused duplicated or drifting headers.
- Kept only the board header bands and the three equal-width area bands on Board 02; every other image now starts and ends inside a fixed unoverlapped frame.
- Rechecked all board baselines, equal-column widths, scene-frame edges and title-band coordinates after submission compression.
- Left the accepted English A3 booklet unchanged.

## v2.4 — clean English A0 reconstruction

- Rebuilt only the English A0 set after principal review; the accepted English A3 booklet remains unchanged.
- Removed the raster-overlay workflow that caused residual Chinese text, label collisions and panel misalignment.
- Reconstructed all three English A0 boards from the accepted English A3 plans, scenes and analytical diagrams while preserving the approved three-board narrative: overall proposition, three areas/five nodes, and delivery/governance.
- Applied fixed host frames and exact aspect-ratio crops so every plan and scene remains inside its intended panel without stretching, overlap or drift.
- Rendered and inspected the compressed three-board PDF for residual Chinese narrative text, incorrect crops, clipped headings, blank/black image regions and A0 page dimensions.

## v2.3 — same-layout English drawing rebuild

- Replaced the interim side-panel English companions with same-layout English A0 and A3 drawings derived directly from the latest Chinese masters.
- Preserved the Chinese masters' page geometry, image scale, card positions, analytical diagrams, scene order, K1-K5 identifiers, and JZ-01-JZ-06 implementation sequence.
- Replaced principal Chinese headings, narratives, operational labels, captions, governance terms, and board information bands inside their original text areas; no English sidebar or reduced Chinese-board thumbnail remains.
- Retained stable plan identifiers and base-map proper-name evidence where changing the underlying raster plan would compromise spatial fidelity.
- Rendered all 22 A3 pages and all three A0 boards after compression and checked page order, clipping, blank/black regions, image integrity, and print dimensions.

## v2.2 — latest English A0/A3 synchronization

- Replaced the superseded five-board English A0 set with a three-board English companion aligned to the approved latest Chinese A0 master.
- Replaced the superseded 25-page English A3 booklet with a 22-page edition (cover plus 21 design pages) aligned page-for-page with the latest Chinese booklet.
- Rebuilt English copy for the current spatial structure, K1-K5 nodes, JZ-01-JZ-06 implementation packages, KPI system, and open-city governance loop.
- Preserved stable drawing identifiers and the conceptual-status, official-data recalculation, and professional-confirmation qualifications.
- Re-rendered and visually checked every English page for order, clipping, blank or black regions, and submission-scale legibility.

## v2.1 — principal-designer A3 consolidation and review-response update

- Replaced the Chinese A3 booklet with the principal-designer-approved 21-page design set plus a new cover, delivered as one 22-page A3 landscape PDF.
- Replaced the previous five-page Chinese A0 file with the principal-designer-approved three-board set covering the overall datum structure, three fields and five urban datums, and public-choice governance and implementation.
- Expanded the Chinese A3 evidence chain for global case transfer, personas, AI industry ecology, mobility and blue-green systems, three key areas, five K-nodes, public infrastructure, culture, JZ-01–JZ-06 implementation, and open-city governance.
- Removed repeated scenario images from the revised A3 sequence and strengthened plan, system, phasing, operator, trigger, fallback, stop, and exit-condition explanations.
- Added exact A3 page references for agent.1–agent.6 in `compliance_matrix.json` and reran manifest refresh, four-gate self-check, and participant preflight before push.

## v1.9 — countable people, scenarios, landmarks, and delivery gates

- Rebuilt the five-persona page with stable P1–P5 IDs, K-node locations, time-based journeys, accessibility/fallback requirements, and visible targets.
- Rebuilt the ten AI scenario cards with stable S01–S10 IDs, exact K-node locations, users, operators, guardrails, fallback or exit conditions, and public-value targets.
- Anchored three public landmarks as L1–L3 at K3/K4/K5 and added the annual archive, public timeline, charter forum, honor display, review, and reversible-release functions.
- Replaced generic phasing with G0–G3 delivery gates, accountable actor classes, closure conditions, stop rules, professional review, and approved project-entity responsibilities.
- Removed the obsolete deterministic HOLD/scaffold statement and aligned the bilingual compliance page with the current formal four-gate validation state.
- Corrected the final A3 export manifest so the rebuilt P1–P5, S01–S10, L1–L3, and G0–G3 pages are actually embedded in both frozen booklets; the booklets now contain 25 A3 pages.
- Replaced the internal `No push / Pull Request` workflow instruction on the jury-facing compliance page with a concise authorship and evidence-status disclosure.

## v1.8 — traceability and eligibility-page repair

- Replaced the sparse seven-task card page with a bilingual requirement–drawing–scene/target–operator/phase trace matrix.
- Linked all seven brief workstreams to visible spatial evidence and stable K1–K5 targets rather than narrative claims alone.
- Removed the obsolete `scaffold` process statement from the public eligibility page and aligned it with the actual four-gate formal-package status.
- Kept Agent generation, human principal-design review, provisional geometry, copyright, unknowns, and professional-review boundaries explicit.

## v1.7 — orthographic overall design study plan

- Replaced the oblique montage as the principal overall drawing with a bilingual orthographic design study plan anchored to the calibrated road, railway, waterway, station, and place-name context.
- Made the three differentiated fields and five stable K1–K5 datums directly traceable to the node atlas, sections, scenes, targets, and implementation records.
- Added north arrow, conceptual-scale qualification, source and license note, plan legend, provisional-boundary warning, and explicit limits on FAR, height, demolition, and road-line claims.
- Added differentiated morphology rules for retained/adapted validation fabric, open ground floors and shared courts, and station-oriented public-release interfaces.
- Rebuilt Chinese and English A0/A3 packages from the same geometry; the former oblique montage remains supporting evidence rather than the authoritative overall plan.

## v1.6 — bilingual node evidence closure

- Added one visible, node-specific design target to every Chinese and English node page so the claimed plan–section–scene–operation–metric–risk chain is jury-visible.
- Cropped the shared plan sources to remove embedded Chinese `概念平面` badges from the English node atlas and A3 flagship pages without changing geometry or orientation.
- Expanded the English provisional-boundary footer to preserve the Chinese requirement for principal-designer review before formal submission or professional development.
- Rebuilt the bilingual node atlases, A3 booklets, and A0 boards; final release remains subject to independent pixel re-review and package preflight.

## v0.6 - 2026-08-17

- 将中英文 A3 文册重建为真实 A3 横向尺寸（420×297mm），各 10 页。
- 将中英文 A0 展板重建为真实 A0 横向尺寸（1189×841mm），各 5 张，一张核心图对应一块展板。
- 首轮渲染发现 PDF 中文字体缺字，改用高分辨率栅格化文字页并重新嵌入，完成中英文逐页接触表与高分辨率抽检。
- A3 文册新增人物画像、十场景、三测试与三地标、实施分期、资格安全五类完整页面。
- PDF 采用 JPEG 优化嵌入，在保持图面清晰的同时将投稿包总量由 44.35MB 降至 23.25MB，满足 40MiB changed-file 上限。
- 四道复核继续通过；当前唯一 blocking 仍为主动保留的 `package_state=scaffold`。

## v0.5 - 2026-08-16

- 将来源清单扩展为十类可审查来源，逐条记录发布者、权威等级、许可/权利、允许用途和禁止用途。
- 增加 OSM contextual map、Agent-generated assets 和 Noto CJK font 的来源与许可说明，明确其不能支撑官方空间或事实结论。
- 将假设从一条通用控规说明扩展为八类：边界、控规、拆改留、交通、AI场景、历史文化、实施和生成视觉；每条包含影响与复算触发条件。
- 按 23 项任务、6 项专业标准和 15 项设计深度重新挂接差异化假设，避免所有矩阵只引用同一通用条目。
- 重写版权、来源和生成媒体声明，明确 OpenStreetMap、字体、Agent 生成图、人物活动、离线 HTML 和替换义务。
- 增加双语等义、来源权利和无虚假审批三项自检；完整校核继续仅保留 `package_state=scaffold` 主动阻断。

## v0.4 - 2026-08-16

- 新增完整英文 `proposal.en.md`，保持 13 个必需章节、核心主张、指标、证据引用和图件位置与中文主稿对应。
- 按赛事术语表统一项目、三层范围、三片区、规划、AI场景、评审状态和临时边界译法。
- 生成五张真正翻译的英文核心图、英文离线 `visual/index.en.html` 和英文阅读版 `report/proposal.en.html`。
- 生成英文 A3/A0 审查 PDF，各含五张英文核心图；正式纸张规格和完整排版仍在下一阶段深化。
- 将全部双语文件写入 manifest 并同步 draft hashes；双语文件缺失、语言映射和 stale hash 阻断已清除。
- 当前确定性校验仅剩 `package_state=scaffold` 一项主动保留的阻断；在来源、版权、矩阵和正式图纸完成前不提前放行。

## v0.3 - 2026-08-16

- 重制五张正式中文核心图：总体设计总览、用地—形态—产业结构、三片区详细设计、交通—蓝绿—公共空间系统、指标证据链。
- 五图统一为 2400×1350 像素竞赛图面，补入标题层级、图例、来源、临时范围状态和空间判断。
- 将三片区图从同质化标签调整为“开放验证园—近校共创街—城市发布坊”三种形态及运营原型。
- 修正脚手架 `metrics.json` 对临时范围置信度的错误描述：核心面积及比例统一降为 low confidence，并增加官方范围发布后的复算触发条件。
- 五图替换后，空间、视觉指标、专业证据三项复核继续通过；仅保留三处临时重点片区 minor 警示。

## v0.2 - 2026-08-16

- 将生成脚手架的通用概念替换为“京张新刻度 / JINGZHANG NEW DATUM”。
- 锁定“一脊五尺三场”空间结构：一条京张遗址创新公共脊、五条东西向创新刻度、三类 AI 公共场景场。
- 补齐 10 张本地 AI 场景卡与赛事 6 类标准场景的交叉映射。
- 补齐 5 类人物画像的 24 小时使用链、3 个产业测试验证场景、3 个 AI 朝圣地标与年度运营机制。
- 将空白图纸替换为 21 页中文审查文册和 5 页中文审查展板；正式 A3/A0 规格及英文对照仍待制作。
- 完成空间、视觉指标和专业证据复核；三项复核通过，临时重点片区保留 minor 警示。
- 保持 `package_state=scaffold`，未推送、未开 PR、未对外投稿。

## v0.1 - 2026-08-16

- 按最新主分支的 formal package 契约创建本地投稿目录。
- 载入临时粗略总体范围及三处重点片区，建立九类空间图层和三项核心可复算指标。
- 建立正式合规基线，识别双语、版权、场景注册、模型声明、图纸和最终放行闸门。
## v1.5 — bilingual node-geometry unification

- Rebuilt all five Chinese and English node-atlas pages from one authoritative plan crop and one shared scene anchor per node.
- Removed the generic English four-block schematic that contradicted the map-derived Chinese node plans.
- Rebuilt A3 flagship pages 8–10 from the same node-atlas and section sources in both languages.
- Preserved language-specific titles and operational text while locking plan geometry, scene, section, metric, and risk positions.
## v2.0 — frozen bilingual card-contract closure

- Replaced ambiguous narrow color markers with separate, fully visible P/S/T/L identifier pills in the final Chinese and English A3 exports.
- Completed operator, risk, human fallback, exit, and target fields for all five personas, three validation testbeds, and three civic landmarks.
- Rebuilt and rendered final A3 pages 13–17 at 170 dpi in both languages; mandatory identifiers, headings, and card bodies remain inside their card and page bounds.
- Retained the distinction between formal-review readiness, independent jury review, human release authorization, and provisional geometry.
