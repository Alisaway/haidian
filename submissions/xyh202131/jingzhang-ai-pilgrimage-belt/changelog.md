# 方案迭代记录 / Changelog

## v85.0 - 2026-08-30

**页内跳转定位反馈 / In-page Destination Orientation**

- 已有能力：中英文体验台已提供跳到正文、三种按时长阅读入口、九项粘性主导航、七类角色入口和三处原型入口，并为目标区预留粘性导航偏移。
- 真实缺口：修复前，页内链接只移动视口，目标 section 或 prototype 没有可见定位反馈；键盘、放大或注意力受限的读者在长页跳转后，可能难以迅速确认落点。
- 必须冻结：冻结“双轨京张 / Twin-Track Jing-Zhang”、三种不可互换原型、JZ-AIOS、G0—G3、四轴、三载体、证据门、权利边界及 12/8/3/36；不改正文、报告、图件、媒体、四份 PDF、几何、指标或现实状态。
- 本轮实施：为两种语言的主面板和三处原型增加仅在 URL fragment 命中时出现的高对比定位轮廓；不使用 JavaScript，不改变内容、布局、打印输出或证据层。只闭合长页跳转后的可见方向感。

- Existing capability: both workbenches already provide skip-to-main, three time-based reading entries, nine sticky navigation routes, seven persona entries and three prototype routes, with sticky-header offsets reserved at their destinations.
- Real gap: before repair, in-page links moved the viewport without visibly identifying the destination panel or prototype. Keyboard, zoomed or attention-limited readers could therefore struggle to confirm where a long-page jump had landed.
- Must remain frozen: Twin-Track Jing-Zhang, the three non-interchangeable prototypes, JZ-AIOS, G0-G3, four axes, three carriers, evidence gates, rights boundaries and 12/8/3/36. Proposals, reports, figures, media, all four PDFs, geometry, metrics and real-world status remain unchanged.
- Implemented this round: added a high-contrast orientation outline to main panels and the three prototypes only when their URL fragment is active. No JavaScript is used, and content, layout, print output and the evidence layer remain unchanged. This closes visible orientation after long-page navigation only.

## v84.0 - 2026-08-30

**高频审阅控件触达闭合 / Review-control Target Closure**

- 已有能力：中英文体验台已提供键盘焦点、移动端 44px 导航、首屏审阅包、全页图纸图谱和媒体文字替代入口。
- 真实缺口：修复前，桌面端语言切换、九项粘性主导航和两项原尺寸 PDF 入口仅依赖字体与内边距形成高度，没有显式 44px 最小触达约束；字体度量、缩放或系统替代字体变化时，高频审阅路径可能缩到推荐触达线以下。
- 必须冻结：冻结“双轨京张 / Twin-Track Jing-Zhang”、三种不可互换原型、JZ-AIOS、G0—G3、四轴、三载体、证据门、权利边界及 12/8/3/36；不改正文、报告、图件、四份 PDF、媒体、几何、指标或现实状态。
- 本轮实施：为两种语言的语言切换、粘性主导航和全页图谱 PDF 入口加入显式 44px 最小高度与居中布局；既有焦点、离线、减少动态、窄屏和打印规则不变。只闭合高频审阅控件的触达几何，不新增内容或事实主张。

- Existing capability: both workbenches already provide keyboard focus, 44px mobile navigation, first-view review-pack links, all-page drawing atlases and direct media text alternatives.
- Real gap: before repair, the desktop language switch, nine-item sticky navigation and two full-size PDF routes derived their height only from font metrics and padding, with no explicit 44px minimum target. Font substitution, zoom or metric changes could therefore shrink these frequent review paths below the recommended target line.
- Must remain frozen: Twin-Track Jing-Zhang, the three non-interchangeable prototypes, JZ-AIOS, G0-G3, four axes, three carriers, evidence gates, rights boundaries and 12/8/3/36. Proposals, reports, figures, all four PDFs, media, geometry, metrics and real-world status remain unchanged.
- Implemented this round: added an explicit 44px minimum height and centred layout to each language switch, sticky primary-navigation item and drawing-atlas PDF route. Existing focus, offline, reduced-motion, narrow-screen and print behaviour remains unchanged. This closes review-control target geometry only and adds no content or factual claim.

## v83.0 - 2026-08-30

**媒体文字替代直达 / Direct Access to Media Text Alternatives**

- 已有能力：中英文体验台中的 54 秒无声概念动态图解均有默认双语字幕、始终可见的静态故事板，并在包内登记了完整双语文字稿与权利说明。
- 真实缺口：修复前，播放器可以读取 VTT，但页面没有可见的文字稿入口；不播放视频的读者无法主动打开可复制、可由屏幕阅读器线性读取的八镜文字替代，字幕文件也只能由播放器间接访问。
- 必须冻结：冻结“双轨京张 / Twin-Track Jing-Zhang”、三种不可互换原型、JZ-AIOS、G0—G3、四轴、三载体、证据门、权利边界及 12/8/3/36；不改视频、字幕、文字稿内容、正文、报告、图件、四份 PDF、几何、指标或现实状态。
- 本轮实施：在两份体验台的动态图解旁增加可见的双语文字稿/权利说明入口和字幕下载入口；两项控制均保留 44px 触达、键盘焦点、离线、减少动态与打印可读性。只闭合既有媒体的无障碍发现路径，不新增媒体、事实、结果或许可结论。

- Existing capability: the 54-second silent conceptual motion diagram in each workbench already provides default bilingual captions, an always-visible static storyboard, and a package-declared bilingual transcript with rights notes.
- Real gap: before repair, the player could consume the VTT but the page exposed no visible transcript route. Readers who declined playback could not deliberately open the copyable, screen-reader-linear eight-shot text alternative, while the caption file was reachable only indirectly through the player.
- Must remain frozen: Twin-Track Jing-Zhang, the three non-interchangeable prototypes, JZ-AIOS, G0-G3, four axes, three carriers, evidence gates, rights boundaries and 12/8/3/36. The video, captions, transcript content, proposals, reports, figures, all four PDFs, geometry, metrics and real-world status remain unchanged.
- Implemented this round: added visible transcript/rights and caption-download routes beside the motion diagram in both workbenches. Both controls preserve 44px targets, keyboard focus, offline use, reduced-motion behaviour and print readability. This closes discovery of existing media alternatives only; it adds no media, fact, result or licence conclusion.

## v82.0 - 2026-08-30

**小屏表格阅读提示 / Narrow-screen Table Reading Cue**

- 已有能力：中英文图文报告均提供 15 章目录、完整审阅包快捷入口和 20 组可内部横向滚动的数据表；表格保留全部专业列，不以移动端摘要替代证据。
- 真实缺口：390 px 小屏实渲确认页面本身没有横向溢出，但表格最小宽度为 520 px，读者必须在表格内部横向滚动；此前没有可见提示，容易把未显示的右侧列误判为裁切或缺失。
- 必须冻结：冻结“双轨京张 / Twin-Track Jing-Zhang”、三种不可互换原型、JZ-AIOS、G0—G3、四轴、三载体、证据门、权利边界及 12/8/3/36；不改主张、表格内容、几何、指标、图件、PDF 或现实状态。
- 本轮实施：在两份图文报告的章节目录后加入仅在小屏显示的双语阅读提示，明确“表格内部横向滚动、页面其他部分纵向阅读”；打印时隐藏提示。未新增数据、媒体、依赖或事实主张。

## v81.0 - 2026-08-30

**图文报告审阅工具栏 / Illustrated-report Review Toolbar**

- 已有能力：中英文体验台首屏已经提供完整审阅包入口，两份图文报告也具备双语切换、15 项章节索引、专业交接深链、离线 CJK、键盘与打印回退。
- 真实缺口：修复前，从体验台进入长报告后，封面附近只有语言切换；返回对应体验台、打开同语言 A3/A0、进入专业交接都需要滚动查找正文链接或依赖浏览器后退，完整审阅包形成单向入口。
- 必须冻结：proposal、visual 内容、图件、四份 PDF、9 个几何文件、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 均不变。
- 本轮实施：在两份报告摘要后增加同构语义工具栏，一跳返回对应语言体验台、打开 A3、打开 A0、进入既有专业交接或切换语言；44px 目标、键盘焦点、移动端单列、减少动态、离线和打印规则同步成立。只闭合审阅导航，不新增主张、来源、资产或现实状态。

- Existing capability: both workbench first views already expose the complete review pack, while both illustrated reports provide language switching, a 15-item chapter index, a professional-handoff deep link, package-local CJK, keyboard access and print fallback.
- Real gap: after entering a long report from the workbench, the area near the cover previously offered only a language switch. Returning to the matching workbench, opening the same-language A3/A0 publications or entering professional handoff required finding links later in the report or relying on browser history, leaving the complete review pack as a one-way entry.
- Must remain frozen: the proposals, visual content, figures, all four PDFs, nine geometry files, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review are unchanged.
- Implemented this round: added a matching semantic toolbar after each report summary, providing one-step routes back to the language-matched workbench, A3 booklet, A0 boards, existing professional handoff and the other language. The controls preserve 44px targets, keyboard focus, single-column mobile reflow, reduced motion, offline operation and print behaviour. This closes review navigation only and adds no claim, source, asset or real-world status.

## v80.0 - 2026-08-30

**图文报告章节索引 / Illustrated-report Chapter Index**

- 已有能力：两份长报告已提供键盘可见的正文跳转、双语切换、语义表格、包内 CJK 字体、离线与打印回退，并可直达既有专业交接入口。
- 真实缺口：修复前，两份报告各有 15 个二级章节，但除正文根节点外没有章节片段；普通读者、键盘用户与评审者只能线性滚动，无法从封面附近直接进入某一正式章节，也不能复制稳定章节链接。
- 必须冻结：proposal、visual、图件、四份 PDF、9 个几何文件、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 均不变。
- 本轮实施：在中英文报告封面后增加对应的 15 项语义目录，为每个二级章节配置一一对应的稳定片段，并同步两列桌面、单列移动端、键盘、减少动态与打印规则。只改善报告导航，不新增主张、来源、资产或现实状态。

- Existing capability: both long reports already provide a keyboard-visible content skip, language switch, semantic tables, package-local CJK font, offline and print fallbacks, and a direct route to the existing professional handoff.
- Real gap: before repair, each report had 15 second-level chapters but no chapter fragments beyond the document root. Ordinary readers, keyboard users and reviewers had to scroll linearly, could not enter a formal chapter directly from near the cover, and could not copy a stable chapter link.
- Must remain frozen: the proposals, visual pages, figures, all four PDFs, nine geometry files, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review are unchanged.
- Implemented this round: added a matching 15-item semantic index after each report cover, assigned one stable fragment to every second-level chapter, and synchronized two-column desktop, one-column mobile, keyboard, reduced-motion and print behaviour. This improves report navigation only and adds no claim, source, asset or real-world status.

## v79.0 - 2026-08-30

**图文报告评审交接深链 / Illustrated-report Review-handoff Deep Link**

- 已有能力：中英文体验台已有稳定的 `#handoff` 专业交接段，收束八问、合成回放和责任门；两份图文报告也保持离线、包内 CJK、零 JavaScript、语义表格和打印可读。
- 真实缺口：修复前，权威正文中的两处 Markdown 链接没有被仓库报告渲染器转换；最终中英文报告各显示一段原样 `[文字](路径)`，不能点击。即使人工提取路径，报告位于 `report/`，原路径也缺少一级 `../`，且声明的 `#review-handoff` 片段不存在，因此“唯一后台入口”在最终报告中实际断开。
- 必须冻结：visual、图件、四份 PDF、9 个几何文件、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 均不变。
- 本轮实施：正文改用可审查的显式包内路径；两份最终报告将同一短语生成为真正的相对链接，分别指向既有的 `../visual/index.html#handoff` 与 `../visual/index.en.html#handoff`。只修复证据导航，不新增主张、来源、资产或现实状态。

- Existing capability: both workbenches already have a stable `#handoff` professional-handoff section that converges the eight-question map, synthetic replay and duty gates; both illustrated reports remain offline, package-local CJK, zero-JavaScript, semantically tabulated and printable.
- Real gap: before repair, the repository report renderer did not convert the two Markdown links in the authoritative proposals. Each final report displayed literal `[label](path)` text that could not be activated. Even a manually extracted path was one `../` short from the `report/` directory, and the claimed `#review-handoff` fragment did not exist, so the single back-stage entry was actually broken in the final report.
- Must remain frozen: the visual pages, figures, all four PDFs, nine geometry files, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review are unchanged.
- Implemented this round: the proposals now expose auditable package-local paths, while each final report turns the same phrase into a real relative link to the existing `../visual/index.html#handoff` or `../visual/index.en.html#handoff` target. This repairs evidence navigation only and adds no claim, source, asset or real-world status.

## v78.0 - 2026-08-30

**离线图文报告语义导航 / Offline Illustrated-report Semantic Navigation**

- 已有能力：中英文体验台已有语义导航、键盘路径与完整审阅包入口，两份图文报告也已恢复包内 CJK 字体并保持离线、零 JavaScript和打印可读。
- 真实缺口：修复前，两份长报告各有 20 张数据表、76 个表头，但 20/20 表格均无可访问标题、76/76 表头均无显式列范围；页面也没有跳过封面直达正文的入口。视觉阅读可用，但屏幕阅读器必须线性穿过封面，且表格上下文依赖浏览器推断。
- 必须冻结：proposal、visual、图件、四份 PDF、9 个几何文件、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 均不变。
- 本轮实施：为两份报告增加键盘可见的正文跳转、可聚焦正文目标、20/20 隐藏表题和 76/76 `scope="col"` 列头；打印时隐藏跳转控件。修改只补语义关系，不新增主张、来源、资产或现实状态。

- Existing capability: both workbenches already provide semantic navigation, keyboard routes and a complete-review-pack entry, while both illustrated reports retain package-local CJK rendering, offline operation, zero JavaScript and printable layout.
- Real gap: before repair, each long report contained 20 data tables and 76 headers, yet 20/20 tables had no accessible caption and 76/76 headers had no explicit column scope. There was also no way to skip the cover and reach the report body. Visual reading worked, but screen-reader users had to traverse the cover linearly and table context depended on browser inference.
- Must remain frozen: the proposals, visual pages, figures, all four PDFs, nine geometry files, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review are unchanged.
- Implemented this round: added a keyboard-visible skip link, a focusable main target, 20/20 hidden table captions and 76/76 `scope="col"` headers to each report; the skip control is suppressed in print. The change adds semantic relationships only, with no new claim, source, asset or real-world status.

## v77.1 - 2026-08-30

**报告离线 CJK 回归修复 / Offline Report CJK Regression Repair**

- PR #4225 exact-head 评审确认两份 report HTML 在本轮重渲后丢失包内 CJK 字体入口；无系统 CJK 字体的评审预览因此出现方框字。字体子集、OFL 声明与两份 visual 的加载链仍然存在，问题不是缺字或新增资产。
- 在中英文报告中恢复同一个 `../visual/assets/offline-cjk-font.css`；并以 SHA-256 不变的既有 OFL 源字体将四个最终 HTML 的完整字符并集更新为 1162 个码点。两次新进程 WOFF2 构建字节一致，四面缺字为 0，且保持离线、零远程字体、零 JavaScript。修复不改变正文、图件、PDF、几何、指标或现实状态。
- 12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 保持冻结。

- The PR #4225 exact-head review confirmed that the latest report render dropped the package-local CJK font entry from both report HTML files, producing tofu in a review environment without system CJK fonts. The subset, OFL notice and both visual-page loading paths remained present; this was not a missing-glyph or new-asset problem.
- Restored the same `../visual/assets/offline-cjk-font.css` link in both reports and refreshed the four-final-HTML character union to 1162 code points from the same SHA-256-stable OFL source. Two fresh-process WOFF2 builds are byte-identical, all four surfaces have zero missing glyphs, and operation remains offline with zero remote font and zero JavaScript. The repair changes no proposal text, figure, PDF, geometry, metric or real-world status.
- The 12/8/3/36 counts, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review remain frozen.

## v77.0 - 2026-08-30

**全页图纸审阅图谱 / All-page Drawing Review Atlas**

- 修复前，离线体验台可以直接打开四份完整 PDF，但评审包只独立预览各自第一页；其余 40 页必须另开 PDF 才能确认页数、顺序、版式连续性和中英配对。
- 从既有四份 PDF 确定性派生四张全页缩略图谱，并在中英文证据段分别展示 A3 14/14 页与 A0 8/8 板；每张图谱回链原尺寸 PDF，并明确小字以原 PDF 为准、图谱不新增设计证据。
- 本轮不修改四份 PDF、既有设计图件、几何、规划指标或现实状态；proposal、report 与权利登记仅同步新增四个图谱路径后的 162/162 精确包处置事实，T-02 结果仅同步 `sources.json` 的确定性输入哈希。新增图谱仅提高审阅可达性；12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 保持冻结。

- Before repair, the offline workbench linked all four complete PDFs directly, but the review packet independently previewed only each first page. The remaining 40 pages required opening the PDFs before page count, order, publication continuity and bilingual pairing could be checked.
- Deterministically derived four all-page atlases from the existing PDFs. The Chinese and English evidence sections now show their A3 14/14-page and A0 8/8-board sequences, link each atlas back to its full-size PDF, and state that small text remains authoritative only in the source PDF and the atlas adds no design evidence.
- This round changes no PDF, existing design figure, geometry, planning metric or real-world status; proposal, report and rights registers only synchronize the 162/162 exact-package disposition after adding four atlas paths, while the T-02 result only synchronizes the deterministic input hash for `sources.json`. The atlases improve review reachability only; 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review remain frozen.

## v76.0 - 2026-08-30

**首屏白话状态判读 / Plain-language First-view Status**

- 修复前，中英文体验台已经在首屏披露 G0、临时粗略几何、非批准、未现场测试与现实结果 0，但三条压缩标签仍要求普通读者理解状态缩写并自行拼接“现在有什么、没有什么、为什么不能启动”。
- 在两种语言首屏增加四格白话判读：可审阅成果、地图用途边界、现实零状态和当前 NO-GO 裁决。每格同时使用标题与完整句子，不依赖颜色传达意义；桌面四列、窄屏两列、移动端单列和打印均保持可读。
- 本轮只改善既有状态的快速理解，不新增主张、来源、角色、任务、场景、项目、几何、指标、媒体或现实结果；proposal、report、图件和四份 PDF 不受影响。12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 与独立人工双语复核 0/8 保持冻结。

- Before repair, both workbenches already disclosed G0, provisional rough geometry, no approval, no field test and zero real-world results in the first view. Yet three compressed pills still required an ordinary reader to decode status shorthand and assemble what exists, what does not, and why launch remains forbidden.
- Added a four-part plain-language reading to both first views: reviewable artefacts, the map-use boundary, real-world zero status and the current NO-GO ruling. Every item uses a heading and complete sentence, so meaning does not depend on colour. It remains readable in four desktop columns, two narrow columns, one mobile column and print.
- This round improves only rapid understanding of existing status. It adds no claim, source, role, task, scene, project, geometry, metric, media or real-world result; proposals, reports, figures and all four PDFs are unaffected. The 12/8/3/36 counts, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review remain frozen.

## v75.0 - 2026-08-30

**原型深链焦点交接 / Prototype Deep-link Focus Transfer**

- 修复前，七张角色卡已经能以精确片段标识跳到正确原型并显示落点提示，但键盘激活后焦点仍回落到页面主体；中英文 14 次角色路径测试均出现地址与视觉落点正确、辅助技术焦点未随行的问题。
- 为中英文三处既有原型容器增加程序化焦点能力。浏览器处理片段导航时会将焦点交给 VERIFY、CO-CREATE 或 PUBLISH 的实际落点；实现保持零 JavaScript，沿用既有 `:target` 提示，并保留键盘、减少动态与打印兼容。
- 本轮只修复深链焦点关系，不新增角色、任务、场景、空间裁决、来源、媒体、几何、指标、成熟度或现实结果；proposal、report、图件和四份 PDF 不受影响。12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 和独立人工双语复核 0/8 保持冻结。

- Before repair, all seven persona cards reached the correct prototype through an exact fragment and exposed a visible landing cue, but keyboard activation returned focus to the page body. Across 14 bilingual role-route trials, the URL and visual destination were correct while assistive-technology focus did not follow.
- Made the three existing prototype containers in each visual language programmatically focusable. Native fragment navigation now transfers focus to the actual VERIFY, CO-CREATE or PUBLISH destination. The implementation remains zero-JavaScript, retains the existing `:target` cue, and preserves keyboard, reduced-motion and print behaviour.
- This round repairs only the deep-link focus relationship. It adds no role, task, scene, spatial ruling, source, media, geometry, metric, maturity or real-world outcome; proposals, reports, figures and all four PDFs are unaffected. The 12/8/3/36 counts, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review remain frozen.

## v74.0 - 2026-08-30

**角色卡精确落点 / Persona-card Exact Destinations**

- 修复前，七张角色卡已经说明对应任务、原型、场景、非 AI 路径和停止条件，但所有“进入原型”按钮都跳到同一个三处体验节顶部；读者仍需再次辨认 VERIFY、CO-CREATE 或 PUBLISH，快速入口没有完成最后一跳。
- 为中英文三处原型增加稳定的 `prototype-verify`、`prototype-cocreate`、`prototype-publish` 锚点，将七张角色卡分别直达正确原型，并用 `:target` 边框与阴影确认落点。页面保持零 JavaScript、离线、键盘可达、减少动态和打印兼容。
- 本轮只修复导航关系，不新增角色、任务、场景、空间裁决、来源、媒体、几何、指标、成熟度或现实结果；proposal、report、图件和四份 PDF 不受影响。12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0 和独立人工双语复核 0/8 保持冻结。

- Before repair, the seven persona cards already named their task, prototype, scene, non-AI route and stop condition, but every “enter prototype” control landed at the top of the same three-place section. Readers still had to identify VERIFY, CO-CREATE or PUBLISH again, so the quick entry did not complete its final jump.
- Added stable `prototype-verify`, `prototype-cocreate` and `prototype-publish` destinations to both visual languages, routed all seven persona cards to the correct prototype, and used a `:target` border and shadow to confirm the landing point. The pages remain zero-JavaScript, offline, keyboard-reachable, reduced-motion aware and print-compatible.
- This round changes navigation only. It adds no role, task, scene, spatial ruling, source, media, geometry, metric, maturity or real-world outcome; proposals, reports, figures and all four PDFs are unaffected. The 12/8/3/36 counts, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties and 0/8 independent human bilingual review remain frozen.

## v73.0 - 2026-08-30

**角色到任务的快速入口 / Persona-to-task Quick Entry**

- 修复前，方案正文已定义开源开发者、高校师生、创业团队、企业服务团队、周边居民、老年人与行动不便者、游客与国际访客七类角色，离线体验台也已展示三处原型和 12 个场景；但首屏只有统一的普通任务路径，不同读者仍需自行判断“我的任务先看哪里”。
- 在中英文离线体验台增加七张角色入口卡。每张卡只复用既有角色、日常任务、三处不可互换原型、现有场景编号、完整非 AI 路径和停止条件；3 分钟入口与主导航均可键盘直达，桌面四列、1050 px 两列、760 px 单列、44 px 触控目标、减少动态和打印回退同步成立。
- 角色不是权限等级，也不新增用户画像、个体数据、现场反馈或部署结果。本轮不改 proposal、report、图件、媒体、来源、几何、指标或四份 PDF；geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0、独立人工双语复核 0/8 和组件级权利边界保持冻结。

- Before repair, the proposals already defined seven roles—open-source developers, university faculty and students, startup teams, enterprise service teams, nearby residents, older people and people with reduced mobility, and tourists and international visitors—and the offline workbench already exposed three prototypes and 12 scenes. Yet its first view offered only one generic ordinary-task route, leaving each reader to infer where their own task should start.
- Added seven role-entry cards to both offline visual pages. Every card reuses only an existing role, everyday task, non-exchangeable prototype, scene ID, complete non-AI path and stop condition. The three-minute route and primary navigation are keyboard-reachable, with four desktop columns, two columns at 1050 px, single-column 760 px reflow, 44 px targets, reduced-motion behaviour and print fallback.
- Roles are not permission tiers and add no user profiling, individual data, field feedback or deployment result. This round changes no proposal, report, figure, media, source, geometry, metric or PDF. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties, 0/8 independent human bilingual review and component-specific rights boundaries remain frozen.

## v72.0 - 2026-08-30

**完整审阅包首屏入口 / First-view Complete Review Pack**

- 修复前，离线体验台首屏已提供 30 秒、3 分钟和 15 分钟渐进阅读路径，但完整图文报告与 A3/A0 出版物仍只存在于投稿目录或页尾证据区；截止前审阅者无法从首屏一跳进入完整出版工件。
- 在中英文首屏分别增加完整审阅包入口，直达对应语言的图文报告、A3 手册、A0 展板和证据索引；同步补齐两种语言页尾的出版物链接。入口支持键盘聚焦、44 px 触控目标、390 px 单列回流、减少动态与打印回退。
- 不新增正文主张、图件、媒体、来源、几何、指标或 PDF。geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0、独立人工双语复核 0/8、权利边界和四份 PDF 均保持冻结。

- Before repair, the offline workbench hero already offered 30-second, three-minute and 15-minute progressive routes, but the complete illustrated report and A3/A0 publications remained reachable only through the package tree or the footer evidence area. A deadline reviewer could not enter the full publication set in one step from the first view.
- Added a complete-review-pack entry to each language's hero, linking directly to the matching illustrated report, A3 booklet, A0 boards and evidence index; both evidence footers now expose the publication links as well. The entries retain keyboard focus, 44 px targets, 390 px single-column reflow, reduced motion and print fallback.
- No proposal claim, figure, media, source, geometry, metric or PDF is added. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties, 0/8 independent human bilingual review, rights boundaries and all four PDFs remain frozen.

## v71.0 - 2026-08-29

**渐进阅读入口 / Progressive Reading Routes**

- 修复前，首屏已经声明“30 秒 / 3 分钟 / 15 分钟”三种阅读深度，但它们只是不可操作的标签；读者仍需从同一条八段导航自行猜测入口，时间承诺没有形成可用路径。
- 将中英文三种阅读深度改为可点击、可键盘聚焦并带有目的说明的入口：30 秒进入五动作与七项非 AI 权利，3 分钟进入三区同屏、五步旅程与四态，15 分钟从空间系统继续追到 12 场景、8 项目、专业交接与证据。
- 不新增正文主张、图件、媒体、来源、几何、指标或 PDF。geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0、独立人工双语复核 0/8、权利边界和四份 PDF 均保持冻结。

- Before repair, the hero already promised 30-second, three-minute and 15-minute reading depths, but they were inert labels. Readers still had to guess an entry from the same eight-section navigation, so the time promise did not form a usable route.
- Converted the three bilingual reading depths into clickable, keyboard-focusable entries with explicit destinations: 30 seconds opens the five actions and seven non-AI rights; three minutes opens the one-board comparison, five-action journeys and four states; 15 minutes starts at the spatial system and continues through 12 scenes, eight projects, professional handoff and evidence.
- No proposal claim, figure, media, source, geometry, metric or PDF is added. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties, 0/8 independent human bilingual review, rights boundaries and all four PDFs remain frozen.

## v70.0 - 2026-08-29

**三区同屏判读入口 / Three-place One-board Reading Entry**

- 修复前，既有 `spatial-atlas` 已经并列三处原型，但它位于“空间系统”层；读者需要先穿过各自展开的五步旅程，才能在同一画面比较三种不能互换的空间裁决。
- 将既有、已登记的中英空间图谱前移到“三处体验”入口，并补上同屏判读说明：绿色普通地面不能中断，蓝色验证只能旁置，珊瑚色故障只隔离验证对象；众智园、原点社区和大钟寺分别处理通行、撤回和通勤风险，不能彼此替代。
- 不新增或重绘图件、媒体、PDF、来源、几何或指标；`spatial-atlas` 仍在空间系统中作为总体关系阅读。geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0、独立人工双语复核 0/8、权利边界和四份 PDF 均保持冻结。

- Before repair, the existing `spatial-atlas` already placed three prototypes side by side, but it appeared only in the spatial-system layer. A reader had to pass the expanded five-action journeys before comparing the three non-exchangeable spatial rulings on one page.
- Moved the existing registered Chinese/English spatial atlas to the entry of “Three places” and added a one-board reading key: green ordinary ground cannot stop, blue testing stays beside it, and coral failure isolates only the test object. Zhongzhiyuan, Origin Community and Dazhongsi address passage, withdrawal and commuting risks respectively and cannot replace one another.
- No figure, media, PDF, source, geometry or metric is added or redrawn; the `spatial-atlas` remains in the spatial-system layer for overall-relations reading. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties, 0/8 independent human bilingual review, rights boundaries and all four PDFs remain frozen.

## v69.0 - 2026-08-28

**人本任务 Demo 深化 / Human-task Demo Depth**

- 修复前可见 demo 只有 6 个线性段落，三处原型主要依赖一张图，12 个场景和 8 个项目只以数字标签出现；上一轮评审状态修复也未修改 `visual/index*.html`，因此用户看到的体验边界确实没有扩大。
- 将中英文离线 demo 重构为 8 个可导航层级：普通任务、三处体验、四态、空间系统、12 场景、8 项目、专业交接和证据。三处原型逐项展开“到达—理解—完成—纠正或撤回—离开”、普通—验证—故障—恢复及不可删除条件，所有折叠组默认展开并可用键盘切换。
- 复用现有 9 组中英图件和既有概念视频，不新增媒体或外部来源；页面仍为零 JavaScript、零远程依赖、无自动播放，并保留静态回退、离线 CJK 字体、390px 响应式、44px 导航目标、减少动态和完整打印内容。
- 扩大的是可见体验深度，不是空间、事实或实施边界。geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、责任接受 0、独立人工双语复核 0/8、PDF 和权利边界保持冻结。

- Before repair, the visible demo contained only six linear sections, the three prototypes depended mainly on one figure, and the 12 scenes and eight projects appeared only as count labels. The previous review-state repair did not change `visual/index*.html`, so the visible experience boundary had indeed not expanded.
- Rebuilt both offline visual pages into eight navigable levels: ordinary task, three place experiences, four states, spatial system, 12 scenes, eight projects, professional handoff and evidence. Each prototype now exposes arrive-understand-complete-correct or withdraw-leave, Ordinary-Test-Failure-Restore, and non-removable conditions. Every disclosure group is open by default and remains keyboard-toggleable.
- Reused nine existing bilingual figure families and the existing concept video without adding media or external sources. The pages retain zero JavaScript, zero remote dependency, no autoplay, static fallback, offline CJK font, 390px responsiveness, 44px navigation targets, reduced-motion support and complete print content.
- What expands is visible experience depth, not spatial, factual or implementation scope. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted duties, 0/8 independent human bilingual review, PDFs and rights boundaries remain frozen.

## v68.0 - 2026-08-28

**评审状态与精确版本绑定 / Review-state Exact-head Binding**

- 修复前 `data-gap-closure-register.json` 把已被后续评审取代的 `708215…` request-changes 标成“最新 exact head 评审”，同时将实际 HUMAN-EQ-01—08 的人工双语抽样误写为 7 项；这会让审计者无法区分当前包状态、历史外部结论和新 head 尚未受评三种状态。
- 将两次已完成外部评审改为按 `reviewed_head` 绑定的历史快照，保留旧版六项行动记录但明确其已被后续评审取代；当前包状态只由当前 exact head 的 `manifest.json` 与 `self_check.json` 给出，任何新字节都不会继承前序外部 verdict。
- 将双语人工抽样统一为 HUMAN-EQ-01—08 共 8 项，并在评审交接索引中加入当前状态、外部评审、前序历史与未受评新 head 的显式判读规则。
- 本轮只夯实审计语义：不改 proposal、report、visual 页面、图件、媒体或四份 PDF，不改变 geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、专业接责 0、独立人工复核 0/8 或权利边界。

- Before repair, `data-gap-closure-register.json` labelled the superseded `708215…` request-changes decision as the “latest exact-head review” and described the HUMAN-EQ-01—08 bilingual human sample contract as seven items. A reviewer therefore could not reliably separate current package state, completed historical external decisions and a new head that has not yet been externally reviewed.
- Rebound both completed external reviews to their exact `reviewed_head` values, retained the six old action records as superseded history, and made the current exact-head `manifest.json` and `self_check.json` the only authorities for current package state. Any later byte change does not inherit a predecessor external verdict.
- Aligned the human bilingual sample contract to eight items, HUMAN-EQ-01 through HUMAN-EQ-08, and added explicit interpretation rules for current state, external review, predecessor history and an unreviewed new head to the review handoff index.
- This round only strengthens audit semantics. It does not alter the proposal, reports, visual pages, figures, media or four PDFs, nor geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted professional duties, 0/8 independent human review or rights boundaries.

## v67.0 - 2026-08-28

**审计入口闭合 / Audit Entry Closure**

- 修复前 `changelog.md` 以 `## v66.1` 开头，唯一文档级标题落在第 101 行；最新版本先于文档身份出现，不符合投稿 Skill 的 validator-feedback reference 对 changelog 首行标题的结构合同。
- 将唯一双语标题恢复到首个非空行，保持全部历史版本正文和顺序；确定性回归检查验证标题唯一且位于首行、版本标题格式正确、版本号唯一并按新到旧排列。
- 本轮只修复审计入口；不改 proposal、report、visual、图件、媒体或四份 PDF，不改变 geometry、`metrics.json`、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、专业接责 0、独立人工复核 0/8 或权利边界。

- Before repair, `changelog.md` began with `## v66.1`, while its sole document title appeared at line 101. The newest entries therefore preceded the document identity and did not satisfy the changelog leading-title contract in the submission Skill's validator-feedback reference.
- Restored the sole bilingual title as the first nonblank line while preserving every historical entry and its order. A deterministic regression check verifies one leading title, valid version-heading syntax, unique versions and newest-first ordering.
- This round changes only the audit entry. It does not alter the proposal, reports, visuals, figures, media or four PDFs, nor geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional boundaries, zero real outcomes, zero accepted professional duties, 0/8 independent human review or rights boundaries.

## v66.1 - 2026-08-28

**精确包权利计数口径统一 / Exact-package Rights Count Alignment**

- 定向回应 PR #4123 对 exact head `3f1dc3e1d61d6348d9f89eb0b299fe5c357fe37b` 的 request-changes：当前包实际共有 158 个路径，其中 `manifest.json` 由最终 PR exact head 绑定，另外 157 个非 manifest 路径由 manifest 的 `files[].sha256` 绑定。
- 将 `sources.json`、manifest 权利/发布扩展、source-rights 证据和 submission-use 矩阵统一为 158/158 总路径与 157 个非 manifest 哈希记录；R65 的 157/156 数字仅作为历史快照，不再表述为当前状态。
- `sources.json` 字节变化触发 T-02 fail-closed 输入校验，已按原脚本确定性重放并更新输入哈希；结果仍为 10/10、4/4、13/13，现实服务调用仍为 0。
- 回归检查发现 R66 新增政策文字带来 9 个不在 R59 离线字体子集中的汉字；使用既有登记且 SHA-256 不变的 OFL Noto 源字体，将子集从 1147 扩至 1156 个码点。两次新进程 WOFF2 字节一致，四个最终 HTML 的 CJK 缺字重新归零。
- 不改 proposal、HTML、visual、PDF、geometry、规划指标、12/8/3/36、G0/NO-GO、provisional、现实结果 0、专业接责 0 或独立法律/商标审查 0；本轮无新媒体。

- Targeted PR #4123's request-changes on exact head `3f1dc3e1d61d6348d9f89eb0b299fe5c357fe37b`: the current package contains 158 paths. The final PR exact head binds `manifest.json`, while manifest `files[].sha256` binds the other 157 non-manifest paths.
- Aligned `sources.json`, manifest rights/release extensions, source-rights evidence and the submission-use matrix to 158/158 total paths and 157 non-manifest hash records. R65's 157/156 figures remain historical snapshots and are no longer phrased as current state.
- The `sources.json` byte change triggered T-02's fail-closed input check, so the original runner deterministically replayed and refreshed the input hash. Results remain 10/10, 4/4 and 13/13 with zero real-service calls.
- Regression QA found nine R66 policy-text glyphs absent from the R59 offline subset. Using the previously registered OFL Noto source with the unchanged SHA-256, the subset expands from 1,147 to 1,156 code points. Two fresh WOFF2 builds are byte-identical, restoring zero missing CJK glyphs across all four final HTML surfaces.
- Proposal, HTML, visual, PDFs, geometry, planning metrics, 12/8/3/36, G0/NO-GO, provisional status, zero real outcomes, zero accepted professional duty and zero independent legal/trademark review remain unchanged. No media is added.

## v66.0 - 2026-08-28

**政策—公共任务防误读层 / Policy-to-Public-Task Firewall**

- 前序 PR #4104 已合并并进入最新 canonical `main`，同投稿包开放 PR 为 0、独立工作树洁净；在复读最新规则、任务书、中央来源登记与社区状态后复跑六闸基线。
- 修复前可复现缺口：包内已有 49 条来源而正文仍写 48，且政策方向散落在正文和来源元数据中，没有一个结构化入口同时回答适用范围、普通任务、G1 前置、停止规则和禁止推论。
- 新增六条双语政策—公共任务映射并同步 proposal、report、visual、A3-13、A0-07：政策只设置进入门，不替代批准、责任、伙伴承诺、执法权、现场结果或专业接责。
- 明确三项易误读边界：无障碍法第三十九条只限列举公共服务事项；适老化方案继续为 `background_only`；生成式 AI 投诉链不得虚构法定天数或一般退出权。内容标识只在实际生成传播时触发。
- 来源登记由 49 增至 52；新增一份投稿方原创结构化登记表后，逐路径权利清单由 157/157 更新为 158/158，政策原文、网页布局与标识不嵌入、不重新许可。
- A3 仍为 14+14 页、A0 仍为 8+8 页，主导航仍为六项，本轮无新媒体。geometry、全部空间与数值规划指标、12/8/3/36、G0/NO-GO、provisional、现实结果 0、专业接责 0、独立法律/商标审查 0 均冻结；`metrics.json` 只同步当前精确包权利说明中的 158/158 路径数，不改指标值、分母或置信度。

- Predecessor PR #4104 was merged into the latest canonical `main`; no same-package PR remained open and the isolated worktree was clean. Current rules, taskbook, central source registry and community state were re-read before all six baseline gates were rerun.
- Reproducible before-gap: the package contained 49 source records while the proposal still said 48, and policy direction was dispersed across prose and source metadata without one structured route covering scope, ordinary task, G1 prerequisite, stop rule and prohibited inference.
- Added six bilingual policy-to-public-task mappings and synchronized proposal, report, visual, A3-13 and A0-07. Policy sets an entry gate; it does not replace approval, responsibility, a partner commitment, enforcement authority, field outcome or accepted professional duty.
- Closed three high-risk misreadings: Barrier-Free Environment Construction Law Article 39 stays limited to listed public-service matters; the elderly smart-technology plan remains `background_only`; and the generative-AI complaint chain creates no fabricated statutory day count or general opt-out. Content labelling is conditional on actual generation and distribution.
- Source records rise from 49 to 52. With one new contributor-authored structured register, path rights coverage rises from 157/157 to 158/158; policy text, page layout and marks are neither embedded nor relicensed.
- A3 remains 14+14 pages, A0 remains 8+8, navigation remains six items and no media is added. Geometry, every spatial and numeric planning metric, 12/8/3/36, G0/NO-GO, provisional status, zero real outcomes, zero accepted professional duty and zero independent legal/trademark review remain frozen. `metrics.json` changes only the current exact-package rights explanation to 158/158 paths; no metric value, denominator or confidence changes.

## v65.1 - 2026-08-28

**当前精确包权利状态消歧 / Current Exact-Package Rights Disambiguation**

- 定向回应 PR #4104 对 exact head `ac29622e886672f145ac16612548d70f1e31cc15` 的 request-changes：旧 `time_museum_uncleared_content_count` 把“独立法律审计尚未完成”误写成“任何公开展示前阻断”，与现行 157/157 投稿方路径处置冲突。
- 将该指标严格限定为当前 manifest 绑定包内“无投稿方再分发处置的时间博物馆图像或文本路径”，值为 0；未来馆藏、口述史、公共装置、策展和新增媒体仍须逐项登记，独立法律/逐文件法律/商标审查继续为 false。
- 明确最终 PR exact head → `manifest.json` Git blob → 156 个非 manifest 路径 SHA-256 的版本链；manifest 不写自哈希以避免循环。路径清单继续覆盖 157/157，并同步作者/权利人、来源、许可/处理、署名、转换、允许用途和限制。
- 补齐 `source-governance-register.json` 漏掉的自编四态媒体来源，来源治理与 `sources.json`、source-rights 统一为 49/49；第三方页面继续仅引用，不复制或重新许可。
- 更新 R65 已重建的四份 PDF、双语报告与双语 visual 的路径级转换记录。既有 PDF/HTML/visual 字节和页数不变，因为其可见权利声明已经正确；geometry、全部空间和数值规划指标、12/8/3/36、G0/NO-GO、provisional 和现实结果 0 不变。

- Targeted PR #4104's request-changes on exact head `ac29622e886672f145ac16612548d70f1e31cc15`: the legacy `time_museum_uncleared_content_count` incorrectly turned an absent independent legal audit into a blocker before any public display, contradicting the current 157/157 contributor path decisions.
- The metric now counts only current manifest-bound time-museum image or text paths lacking a contributor redistribution decision; its value is 0. Future collections, oral histories, installations, curatorial content and added media still require individual records, while independent legal/file-level legal/trademark review remains false.
- The version chain is explicit: final PR exact head -> `manifest.json` Git blob -> SHA-256 for 156 non-manifest paths; the manifest omits a circular self-hash. The 157/157 inventory retains author/rightsholder, source, licence/handling, attribution, transformation, permitted use and limits.
- Added the missing package-authored four-state media source to `source-governance-register.json`, aligning source, governance and source-rights coverage at 49/49. Third-party pages remain citation-only and are neither copied nor relicensed.
- Updated path-level transformation records for the four R65 PDFs, paired reports and paired visuals. Existing PDF/HTML/visual bytes and page counts remain unchanged because their visible rights statement was already correct; geometry, every spatial and numeric planning metric, 12/8/3/36, G0/NO-GO, provisional status and zero real results remain unchanged.

## v65.0 - 2026-08-28

**独立人工复核交接 / Independent Human Review Handoff**

- 前序 PR #4088 已合并并进入最新 canonical `main`；同投稿包无开放 PR，工作树洁净，最新规则、任务书、来源登记、社区动态和六闸基线均已复核。
- 修复前可复现缺口：双语包有 8 个 HUMAN-EQ 样本，但执行顺序只写到 07；清单仅藏在深层 JSON，前台和固定页也未显示当前 0/8、未签署及 fail-closed 规则。
- 将 HUMAN-EQ-01—08 组织为唯一顺序，要求先在最终 PR exact head 上按 `manifest.json` 记录哈希；任一空值、无法判断或未关闭重大差异均阻断签署，机器 PASS 不替代人工判断。
- 在不增加主导航、媒体或页数的前提下，同步双语 proposal/report/visual，并在 A3-14 与 A0-07 原页加入八项清单及 0/8 状态。三原型、四态、非 AI 路径与专业否决保持原义。
- 本轮无新媒体、来源、场景、项目、重点区、治理合同或现实人物；geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、专业接责 0 和独立人工签署 0/8 均冻结。

- Predecessor PR #4088 was merged into the latest canonical `main`; there was no open same-package PR, the worktree was clean, and current rules, taskbook, source registry, community state and all six baseline gates were rechecked.
- Reproducible before-gap: the bilingual packet contained eight HUMAN-EQ samples, but its execution order stopped at 07. The worksheet was buried in deep JSON, and neither the frontstage nor fixed pages exposed 0/8, not-signed or fail-closed status.
- HUMAN-EQ-01-08 now form the sole order. A reviewer first records artifact hashes from `manifest.json` on the final PR exact head. Any null, cannot-determine or unresolved material discrepancy blocks signoff; machine PASS never replaces human judgement.
- Paired proposal, report and visual surfaces were synchronized, and A3-14/A0-07 now carry the eight-item route and 0/8 status without adding navigation, media or pages. The three prototypes, four states, non-AI path and professional veto retain their meaning.
- No media, source, scene, project, key area, governance contract or real person was added. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional status, zero real results, zero accepted professional duty and 0/8 independent-human signoff remain frozen.

## v64.0 - 2026-08-27

**责任接收门：从人本任务到可拒绝的专业接责 / Duty Acceptance: From Human Task to Refusable Professional Responsibility**

- 在 canonical `main` `0558e48f98a92c9cfce43e947a44f8350da180a6` 上确认前序 PR #4086 已合并并进入祖先链，同投稿包开放 PR 为 0，工作树洁净；重新完整读取最新 README、Skill、任务书、中央来源登记、正式投稿指南和社区 Issues/PR，再跑六闸基线。该 SHA 比开工基线多合入一份其他投稿，不改变本包规则或文件。
- 前序评审为 94/100、无阻断项；剩余可控弱项集中在可实施性与风险合规。修复前 E01 只显示一个候选和七张关闭卡片，不能在图上直接回答谁应接责、缺项时如何拒绝、故障时普通任务是否继续。
- 在原路径重构双语 `review-professional-handoff` SVG/PNG：把既有 H01—H07 组织为“责任/运营—公共同权—独立复测”三类角色和“权限范围—现场安全恢复—同权独立判断”三道裁决门。任一项缺失即拒绝现实启动；七项全部关闭也只允许考虑 G1，不自动授权、批准或重启。
- 同步中英文 proposal、report、visual、A3/A0、交接候选、评审索引和双语等价记录；前台现直接显示当前现实接责 0/7、批准 0、现场执行 0，以及普通路径、纸面/人工同任务服务、纠错、投诉、撤回与离开继续。
- A3 保持 14+14 页、A0 保持 8+8 页；两次新进程构建逐文件字节一致。本轮无新媒体、来源、场景、项目、重点区、治理合同或页面；geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0 和独立现实复测 0 均冻结。

- Confirmed on canonical `main` `0558e48f98a92c9cfce43e947a44f8350da180a6` that predecessor PR #4086 was merged and in the ancestry, with zero same-package open PRs and a clean worktree. Re-read the latest README, skill, taskbook, central source registry, formal guide and community Issues/PRs before rerunning all six baseline gates. This SHA adds one unrelated submission after the initial gate and changes no rule or file in this package.
- The predecessor review scored 94/100 with no blocker; the remaining contributor-controlled weakness was concentrated in implementability and risk/compliance. Before repair, E01 showed one candidate and seven closed cards but did not directly answer who should accept duty, how a missing item triggers refusal, or whether ordinary tasks continue during fault.
- Rebuilt the paired `review-professional-handoff` SVG/PNG files in place. Existing H01-H07 conditions are now organized as three role groups—accountability/operations, public parity and independent retest—and three decision groups—authority/scope, field/safety/recovery and parity/independent judgement. Any missing item refuses real-world start; all seven closed only permits considering G1, never automatic authorization, approval or restart.
- Synchronized paired proposal, report, visual, A3/A0, candidate packet, review index and bilingual-equivalence record. The frontstage now states real acceptance 0/7, approvals 0 and field execution 0, while the ordinary route, printed/staffed same-task service, correction, complaint, withdrawal and exit continue.
- A3 remains 14+14 pages and A0 remains 8+8 pages; two fresh processes produced byte-identical files. No media, source, scenario, project, key area, governance contract or page was added; geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional status, zero real results and zero independent real-world retests remain frozen.

## v63.0 - 2026-08-27

**一人一事一处：人本任务前台 / One Person, One Task, One Place**

- 在 canonical `main` `e89d6b70b0448111641088c89bf33bca2068f801` 上确认前序 PR #4055 已合并、进入祖先链，同包开放 PR 为 0。开工前重读最新 README、Skill、任务书、来源登记和正式投稿指南，并复跑基线闸门。
- 建立修复前 RED：既有普通生活图对“到达—理解—完成—纠正或撤回—离开”的显式命中为 0/0/1/0/4，visual 为 0/0/2/0/0。系统机制清楚，但普通人的完整任务不是唯一首答。
- 在原路径重制中英普通生活旅程 SVG/PNG 与概念海报，使三处分别以工作人员验证旁路、社区纠正/撤回、通勤离场连续性回答同一五动作链；匿名站立与轮椅符号只是概念角色，不是真实人员、意见或无障碍结果。
- 双语 proposal、report、visual 和四份 PDF 改为先回答“一人一事一处”，再展开空间裁决、三原型、四态和专业候选。visual 仍为六项导航、零 JavaScript、零远程依赖、无自动播放和静态回退。
- A3 仍为 14+14 页，A0 仍为 8+8 页；44/44 页有可提取文本，双次新进程构建字节一致。四个最终 HTML 均加载包内 CJK 字体、缺字 0、外部资源 0、横向溢出 0。
- 本轮无新媒体类型或路径；只重建既有海报，既有 MP4/VTT/文字稿及 54 秒编辑节奏未变。来源状态、geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、专业接责 0 与独立现实复测 0 均未改变。

- Confirmed on canonical `main` `e89d6b70b0448111641088c89bf33bca2068f801` that predecessor PR #4055 was merged and in the ancestry, with zero same-package open PRs. Re-read the latest README, skill, taskbook, source registry and formal guide before rerunning baseline gates.
- Established reproducible RED evidence: explicit arrive-understand-complete-correct-or-withdraw-leave hits were 0/0/1/0/4 in the ordinary-life figure and 0/0/2/0/0 in the visual. The system was clear, but an ordinary person's complete task was not the unique first answer.
- Rebuilt the paired ordinary-life SVG/PNG figures and existing poster in place. The three places now answer the same five-action chain through a staffed verification bypass, neighbourhood correction/withdrawal and commuter exit continuity. Anonymous standing and wheeled symbols are conceptual roles, not real people, feedback or accessibility results.
- Reordered paired proposal, report, visual and four PDFs to answer one person-one task-one place before the ruling, prototypes, four states and handoff candidate. The visual retains six navigation items, zero JavaScript, zero remote dependencies, no autoplay and static fallback.
- A3 remains 14+14 pages and A0 remains 8+8 pages; 44/44 pages expose extractable text and two fresh-process builds are byte-identical. All four final HTML surfaces load the package-local CJK font with zero missing glyphs, external resources or horizontal overflow.
- No new media type or path was added; only the existing poster was rebuilt, while the MP4, VTT, transcript and 54-second editorial pacing remain unchanged. Source status, geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional status, zero real results, zero accepted professional duty and zero independent real-world retests remain unchanged.

## v62.1 - 2026-08-27

**R62 离线 CJK 回归闭合 / R62 Offline CJK Regression Closure**

- 针对 PR #4055 当前 exact-head 评审的唯一参与者可控阻断项，重新建立修复前 RED：R62 重渲后，两份 visual 仍加载包内字体子集，但 `report/proposal.html` 与 `report/proposal.en.html` 的字体链接再次丢失；这证明旧台账的“已关闭”不能替代对最终消费者的复测。
- 在两份最终报告中恢复 `../visual/assets/offline-cjk-font.css`，并将四个最终 HTML 作为同一回归集合。全新 Chromium 逐页确认 `document.fonts.status=loaded`、计算字体为 `JZ Noto CJK Offline`、核心中文串检查为真，外部 HTTP(S) 资源请求为 0；中英文报告和 visual 截图冷读未见方框字。
- 由于仓库通用 renderer 暂无投稿包级样式钩子，本轮不越权修改共享脚本；后续每次重渲均必须在 manifest 刷新前复跑“四表面字体链接 + 字体加载 + 截图冷读”回归，不能只相信登记表或机器 schema PASS。
- 本修复不增加媒体、页面、主张、事实或成熟度，不改变 geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、批准 0、专业接责 0、独立现实复测 0 或权利边界。

- Reproduced the sole contributor-controlled blocker on the current exact head of PR #4055. After the R62 rebuild, both visual pages still loaded the local font subset, but the stylesheet link had again disappeared from `report/proposal.html` and `report/proposal.en.html`. A historical “closed” register therefore did not substitute for retesting final consumers.
- Restored `../visual/assets/offline-cjk-font.css` in both final reports and treated all four HTML surfaces as one regression set. Fresh Chromium checks confirm `document.fonts.status=loaded`, computed family `JZ Noto CJK Offline`, a true core-Chinese-string font check and zero external HTTP(S) resource requests; cold-read screenshots of both reports and both visual pages show no tofu.
- The shared repository renderer currently exposes no package-level stylesheet hook, so this repair does not alter out-of-scope shared scripts. Every future rerender must repeat the four-surface link, font-load and screenshot checks before manifest refresh; a register or schema PASS alone is insufficient.
- This repair adds no media, page, claim, fact or maturity upgrade and changes no geometry, `metrics.json`, 12/8/3/36 count, G0/NO-GO, provisional status, zero real outcomes, zero approvals, zero accepted professional duties, zero independent real-world retests or rights boundary.

## v62.0 - 2026-08-26

**出版身份与首屏一致性 / Publication Identity and First-screen Coherence**

- 在最新 canonical `main` `52d499a313ba9e54a1fca18ca62cf0693e8d70ec` 上确认前序 PR #4036 已合并并进入祖先链、同包开放 PR 为 0。修复前 RED 显示：正文版本为 61.0、最新记录为 61.1，但 visual 与四份 PDF 的 44/44 页仍把 `R60` 当作当前评审标签；两份报告各有两个一级标题，中文 visual 首屏还把结论末字“侧。”孤立成行。
- 将前台身份改为不随轮次漂移的 `G0 概念稿 · 评审版 / G0 CONCEPT · REVIEW EDITION`，后台审计版本统一为 62.0；R59—R61 的历史标签继续保留在 changelog、溯源和方法记录中，不抹除真实演进。
- 两份报告现各保留一个文档级 H1，首段裁决降为 H2；中英文 visual 首屏各使用两条语义完整的标题行。五档视口（1440×900、1280×800、768×1024、390×844、320×568）的双语浏览器复测共发现 0 项问题，并覆盖无 JavaScript、减少动态、键盘、静态回退、离线资源和打印相关入口。
- 不增加页数地重建 A3 14+14 页与 A0 8+8 页，44/44 页改用稳定评审标签；两次新进程构建逐字节一致。最终 SHA-256：中文 A3 `17244b82ba85d21e77bd65559f7156c4f62c0bc73a6e8b40503f5bbca818a429`，英文 A3 `f62f06b03924bec5a8b34f7bfdd786f3effb624b27d307aa25c61a02fbef5864`，中文 A0 `a839288f62ea4aef4c7a6ec2469cbcda0cbf49fee363b7149c430a0d83093b30`，英文 A0 `7c093179837d1ee4c4ad3c003f2e270a009589658b9b28b2a8986ffabaccf75d`。
- 本轮无新媒体、事实、场景、项目、重点区或页面。geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、专业接责 0、独立现实复测 0 及分组件权利边界均保持不变。

- Confirmed on canonical `main` `52d499a313ba9e54a1fca18ca62cf0693e8d70ec` that predecessor PR #4036 is merged and in the ancestry, with zero same-package open PRs. Reproducible RED evidence found proposal revision 61.0 and changelog revision 61.1 while both visual pages and all 44 PDF pages still presented `R60` as the current review label; each report had two document-level H1 headings, and the Chinese visual hero orphaned its final character pair on a separate line.
- Replaced volatile frontstage identity with `G0 概念稿 · 评审版 / G0 CONCEPT · REVIEW EDITION` and aligned backstage audit revision to 62.0. Historical R59-R61 labels remain in the changelog, provenance and method records as an accurate evolution trail.
- Each report now has one document H1 and an H2 opening ruling; both visual heroes use two semantically complete title lines. Bilingual browser retesting at 1440×900, 1280×800, 768×1024, 390×844 and 320×568 found zero issues and covered no-JavaScript, reduced-motion, keyboard, static fallback, offline-resource and print-related routes.
- Rebuilt the 14+14 A3 pages and 8+8 A0 boards without adding pages; all 44 pages use the stable review label. Two fresh processes produced byte-identical files. Final SHA-256: ZH A3 `17244b82ba85d21e77bd65559f7156c4f62c0bc73a6e8b40503f5bbca818a429`; EN A3 `f62f06b03924bec5a8b34f7bfdd786f3effb624b27d307aa25c61a02fbef5864`; ZH A0 `a839288f62ea4aef4c7a6ec2469cbcda0cbf49fee363b7149c430a0d83093b30`; EN A0 `7c093179837d1ee4c4ad3c003f2e270a009589658b9b28b2a8986ffabaccf75d`.
- No media, fact, scenario, project, key area or page was added. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional status, zero real results, zero accepted professional duties, zero independent real-world retests and component-specific rights boundaries remain unchanged.

## v61.1 - 2026-08-26

**离线报告 CJK 阻断修复 / Offline Report CJK Blocker Repair**

- 复核 PR #4036 当前评审的唯一参与者可控阻断项，建立修复前 RED：`report/proposal.html` 与 `report/proposal.en.html` 均未接入包内 `visual/assets/offline-cjk-font.css`，而两份 visual 已接入；问题是报告导出链丢失字体链接，不是缺少字体子集。
- 在两份报告原路径接入同一 OFL WOFF2 子集，不改正文、图件、PDF、visual 信息结构或事实。字体 cmap 对四个最终 HTML 可见非 ASCII 字符的覆盖为 1015/1015、19/19、249/249、3/3，缺失 0。
- 使用全新 Chromium 内存配置经 `127.0.0.1` 本地静态服务打开中英文报告；`document.fonts.status=loaded`、计算字体为 `JZ Noto CJK Offline`、核心中文串字体检查为真，人工截图未见方框。唯一控制台错误为未提供非必需 `favicon.ico`，不影响报告内容或字体。
- 本修复不增加媒体、页面、主张或成熟度，不改变 geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、批准 0、专业接责 0、独立现实复测 0 或权利边界。

- Reproduced the sole contributor-controlled blocker in the current PR #4036 review. Before repair, both `report/proposal.html` and `report/proposal.en.html` omitted the package-local `visual/assets/offline-cjk-font.css`, while both visual pages already loaded it. The fault was a dropped report-font link, not a missing subset.
- Connected both reports to the same OFL WOFF2 subset in place, without changing proposal text, figures, PDFs, visual information architecture or facts. The font cmap covers 1015/1015, 19/19, 249/249 and 3/3 visible non-ASCII characters across the four final HTML surfaces, with zero missing glyphs.
- Opened both reports in a fresh in-memory Chromium profile through a `127.0.0.1` local static server. `document.fonts.status=loaded`, the computed family is `JZ Noto CJK Offline`, the core Chinese-string font check is true, and screenshot inspection finds no tofu. The only console error is the non-required missing `favicon.ico`, unrelated to report content or fonts.
- This repair adds no media, page, claim or maturity upgrade and changes no geometry, `metrics.json`, 12/8/3/36 count, G0/NO-GO, provisional status, zero real outcomes, zero approvals, zero accepted professional duties, zero independent real-world retests or rights boundary.

## v61.0 - 2026-08-26

**评审可见信息效率 / Reviewer-visible Information Efficiency**

- 在 canonical `main` `48a4d3cfe6af8b0bd42964e5a38fbeae1698e702` 上确认前序 PR #4033 已合并、进入祖先链且同包开放 PR 为 0。前序 AI 评审为 93/100，唯一投稿方可控的持续弱项是“信息密度偏高、概念重复”，因此本轮只修复人类阅读层，不新增方案方向。
- 先建立可复现 RED 合同：中文/英文正文分别为 51,149 / 135,381 字符；高频重复为“连续日常轨”12/9、“非 AI”45/60、`G0` 50/50、`NO-GO` 22/23、“专业交接”9/9。合同同时锁定 13 章顺序、全部图件位置、全部唯一 source/standard/depth/data/metric/assumption 标记和核心真实性句。
- 将开篇、三层框架、指标、风险和后台追证改成“一处主答案 + 按需证据”，删除轮次说明和同义重复；正文降至 45,495 / 116,491 字符，分别缩短 11.0% / 14.0%。高频边界词全部低于预设上限，而来源、假设、指标、图件和 13 章结构零丢失。
- 保持“双轨京张”、三种不可互换原型、普通—验证—故障—恢复、JZ-AIOS、12/8/3/36、G0/NO-GO、临时边界、现实结果 0、公共同权、权利边界和专业否决的实质等价；未改变 geometry、`metrics.json`、visual、图件、媒体或 A3/A0 页数。
- 本轮无新媒体。后续独立人工双语确认、官方几何、现场基线、审批、现实责任接受、独立现实复测、法律/商标审查继续为外部开放条件，不以更短正文换取状态升级。

- Confirmed on canonical `main` `48a4d3cfe6af8b0bd42964e5a38fbeae1698e702` that predecessor PR #4033 was merged and in the ancestry with zero same-package open PRs. Its 93/100 AI review left one contributor-controllable weakness: dense information and repeated concepts. This round therefore repairs only the human reading layer and adds no design direction.
- Established a reproducible RED contract first. Chinese/English proposals measured 51,149 / 135,381 characters, with repeated key terms counted before editing. The contract simultaneously froze the 13-chapter order, every figure position, every unique source/standard/depth/data/metric/assumption marker, and the core truth-boundary sentences.
- Re-edited the opening, scope framework, metrics, risk and back-stage trace as “one primary answer plus evidence on demand,” removing round meta-copy and synonymous restatement. The texts now measure 45,495 / 116,491 characters, 11.0% / 14.0% shorter. Repeated boundary terms stay below their preset ceilings while evidence markers, figures and formal structure remain complete.
- Preserved Twin-Track Jing-Zhang, three non-interchangeable prototypes, Ordinary—Verification—Fault—Recovery, JZ-AIOS, 12/8/3/36, G0/NO-GO, provisional geometry, zero real outcomes, public parity, rights boundaries and professional veto with material bilingual equivalence. Geometry, `metrics.json`, visual, figures, media and A3/A0 page counts are unchanged.
- No new media was added. Independent human bilingual confirmation, official geometry, field baselines, approvals, accepted real responsibility, independent real-world retesting and legal/trademark review remain external open conditions; shorter prose does not upgrade status.

## v60.0 - 2026-08-26

**出版可访问性与 A0 远读重构 / Publication Accessibility and A0 Distance-read Recomposition**

- 在最新 canonical `main` `eab8b0c0f6c653992b46f764f4fe435fb4758524` 上复跑串行门和基线；前序 PR #3998 已合并并进入祖先链，同包开放 PR 为 0。修复前自动证据确认：390px 中英文 visual 主导航分别需要 631px / 706px，四份 PDF 共 44 页均无可提取正文。
- 将中英文 visual 的六项主导航在窄屏改为 3×2 完整网格，保留 44px 触达高度、键盘焦点、无 JavaScript、减少动态、打印和静态回退；390px 实测不再横向溢出。
- 在不增加页数、不改变可见正文事实的前提下，从同一确定性源重建 A3 14+14 页与 A0 8+8 页。可见标签继续由本地 Noto CJK 栅格层确定性呈现，同时嵌入 OFL 最小语义字形子集；44/44 页均有可搜索/复制文本、书签和元数据，但不声明 tagged PDF/UA 或无障碍达标。
- A0 第 6 板收束为“项目门—气候维护—全年运营”，第 7 板收束为“证据图—专业交接—四条边界”，第 8 板改为远距离可读的唯一结论与四项状态裁决；彩色缩略图、灰度、全尺寸和中英配对人工 QA 未见裁切、越界、方框或警示弱化。
- 两次独立新进程构建逐字节一致：中文 A3 `8d9958e516a3e73882e71b9472fcc3829aa4b4cb8580b18e42a75682835626c4`，英文 A3 `66361087a18951e3ef5fb35bb575dd1f41c02d342729f5d9b88126a77ef11e5e`，中文 A0 `a1fd334fca8112e362a9a90e05e590b8c6927a82f4fa9ed8df28d4b35e398291`，英文 A0 `b1daad98af2123b2944a35f4e4dd53e276b8605577078a0a0f1b4d372073238e`。
- 本轮无新媒体，不改变 geometry、`metrics.json`、12/8/3/36、G0/NO-GO、provisional、现实结果 0、批准 0、专业接责 0、独立现实复测 0 或未来装置/品牌/专业实施边界。

- Re-ran the serial gate and baseline on canonical `main` `eab8b0c0f6c653992b46f764f4fe435fb4758524`. Predecessor PR #3998 is merged and in the ancestry, with zero same-package open PRs. Automated before-evidence confirmed 631px / 706px navigation widths at a 390px viewport and zero extractable body text across all 44 PDF pages.
- Reflowed the six-item bilingual visual navigation into a complete 3×2 narrow-screen grid with 44px targets, keyboard focus, zero JavaScript, reduced-motion, print and static-fallback behavior retained. The 390px tests no longer overflow horizontally.
- Rebuilt the 14+14 A3 pages and 8+8 A0 boards from one deterministic source without adding pages or changing visible factual claims. Visible labels remain deterministic local Noto CJK raster layers, while an OFL minimal semantic glyph subset is embedded. All 44 pages now expose searchable/copyable text, outlines and metadata; tagged PDF/UA or accessibility conformance is not claimed.
- Re-composed A0 board 6 as project gate - climate maintenance - year-round operations, board 7 as evidence picture - professional handoff - four boundaries, and board 8 as one distance-readable conclusion plus four state rulings. Color thumbnail, grayscale, full-size and bilingual-pair human QA found no clipping, overflow, tofu or weakened warnings.
- Two independent fresh processes produced byte-identical PDFs: ZH A3 `8d9958e516a3e73882e71b9472fcc3829aa4b4cb8580b18e42a75682835626c4`; EN A3 `66361087a18951e3ef5fb35bb575dd1f41c02d342729f5d9b88126a77ef11e5e`; ZH A0 `a1fd334fca8112e362a9a90e05e590b8c6927a82f4fa9ed8df28d4b35e398291`; EN A0 `b1daad98af2123b2944a35f4e4dd53e276b8605577078a0a0f1b4d372073238e`.
- No new media was added. Geometry, `metrics.json`, 12/8/3/36, G0/NO-GO, provisional status, zero real results, zero approvals, zero accepted professional duties, zero independent real-world retests and future installation/branding/professional-implementation boundaries are unchanged.

## v59.1 - 2026-08-25

**当前精确投稿包权利闭合 / Current Exact-package Rights Closure**

- 关闭评审指出的状态矛盾：当前精确投稿包 157/157 个路径均补齐作者/权利人、来源、许可或处理、署名、变更、再分发和例外列，并明确可按组件条款用于仓库评审、展示与再分发；不存在单一整包许可。
- CC BY 4.0、MIT、ODbL、OFL、citation-only 与仓库临时输入边界保持分立；独立法律意见、独立逐文件法律审计和商标审查仍未提供，未来公共装置、品牌发布和专业实施仍未授权。
- 同步中英文 proposal、visual、报告、来源、图件、A3/A0、权利台账、发布矩阵、Agent、双语等价、self-check 与 manifest；geometry、metrics、12/8/3/36、G0/NO-GO、provisional、现实结果 0 和 H01—H07 未接受均未改变。

- Closed the review-identified state contradiction. All 157/157 paths in the current exact package now record author/rightsholder, source, licence or handling, attribution, transformation, redistribution and exceptions. The package may be reviewed, displayed and redistributed under component-specific terms; no single package-wide licence exists.
- CC BY 4.0, MIT, ODbL, OFL, citation-only and repository provisional-input boundaries remain separate. Independent legal advice, independent file-level legal audit and trademark review remain absent; future public installation, brand release and professional implementation remain unauthorized.
- Synchronized bilingual proposals, visual, reports, sources, figures, A3/A0, rights ledger, release matrix, Agent, bilingual equivalence, self-check and manifest. Geometry, metrics, 12/8/3/36, G0/NO-GO, provisional, zero real results and unaccepted H01—H07 are unchanged.

## v59.0 - 2026-08-25

**四态空间体验化 / Four-state Spatial Experience**

- 将既有“普通—验证—故障—恢复”关系重绘为一条连续普通地面、旁侧验证、只停验证对象的故障点和回到普通任务的恢复序列；三处原型继续以平行带/旁侧庭、一街两院四撤回点、四向十字/路外厅区分。
- 新增投稿方原创概念封面、54 秒无声双语动态图解、双语 VTT、双语文字稿和镜头合同；54 秒仅为编辑节奏。visual 保持六项导航、零 JavaScript、无远程依赖、无自动播放，并始终显示静态回退。
- 从同一确定性源重建中英文 A3 各 14 页、A0 各 8 页；两次新进程四份 PDF 字节一致，四态新图已进入指定页，44 页机器与人工 QA 通过。
- 媒体由 Python/Pillow/Chrome/FFmpeg 与登记字体本地确定性生成，不访问网络、不调用模型 API、不含外部媒体、音乐、配音或音轨。逐路径权利、自编来源、双语等价和专业交接记录已同步。
- 本轮不新增事实、场景、项目、重点区、治理合同或成熟度；geometry、`metrics.json`、12/8/3/36、G0 / NO-GO、provisional、现实结果 0、H01—H07 未接受、`not_fully_cleared`、独立清权 0 与商标审查 0 均不变。

- Rebuilt Ordinary—Verification—Fault—Recovery as continuous ordinary ground, side verification, a fault point that stops only proof objects, and recovery back to the ordinary task. The three prototypes remain distinct as parallel bands/side court, one street/two courts/four withdrawals, and four-way cross/off-route hall.
- Added a contributor-authored conceptual cover, a silent 54-second bilingual motion diagram, bilingual VTT, bilingual transcript and shot contract; 54 seconds is editorial pacing only. The visual retains six navigation items, zero JavaScript, no remote dependency, no autoplay, and an always-visible static fallback.
- Rebuilt the 14+14 A3 pages and 8+8 A0 boards from one deterministic source. Two fresh processes produced byte-identical PDFs; the R59 storyboard is embedded in the designated pages and all 44 pages passed machine and human-view QA.
- Media was produced locally and deterministically with Python/Pillow/Chrome/FFmpeg and the registered font, with no network, model API, external media, music, voice or audio stream. Path-level rights, the package-authored source, bilingual equivalence and professional handoff records are synchronized.
- This revision adds no fact, scenario, project, key area, governance contract or maturity claim. Geometry, `metrics.json`, 12/8/3/36, G0 / NO-GO, provisional, real results 0, unaccepted H01—H07, `not_fully_cleared`, independent clearance 0 and trademark review 0 remain unchanged.

## v58.5 - 2026-08-24

**下一评审缺口预防与出版去重 / Anticipatory Review-Gap and Publication De-duplication**

- 反向审计实际评审可见入口，识别并修复 A3 中五组“页题不同、正文画面相同”的出版缺陷；从同一确定性源完整重建中英文 A3 各 14 页与 A0 各 8 页，不增加页数，并对全部页面执行正文指纹去重与逐页渲染检查。
- 以投稿方原创图解在原路径重制“普通生活旅程”：众智园是连续旁路与旁置验证庭，原点社区是一街两院四个撤回节点，大钟寺是四向通勤与路外人工服务；人物仅为通用比例符号，不是现场人员、公众反馈、无障碍结果或建成证据。
- 压缩 visual 首屏高度，30 秒入口先展示概念和空间图；补充跳转主内容、键盘焦点和五张首要图件的双语描述性替代文本。许可提示改为按组件陈述，继续明确整包公共或专业复用受条款和独立审计阻断。
- 将正文、visual、交接索引和 Agent 溯源版本统一为 58.5；历史 RED 基线增加机器可读的“修复前记录”语义和当前处理摘要，避免把历史缺口误读为当前失败。
- 本轮没有新增生成媒体，不改变 geometry、`metrics.json`、12/8/3/36、G0 / NO-GO、provisional、现实结果 0、审批 0、专业接责 0 或权利未完全清结边界。

- Reverse-audited the surfaces actually exposed to review and repaired five A3 pairs whose page titles differed while their body images were identical. Rebuilt the 14-page Chinese and English A3 books and the 8-board Chinese and English A0 sets from one deterministic source, without adding pages, then checked body-image fingerprints and rendered every page.
- Rebuilt the contributor-authored ordinary-life journey in place: Zhongzhiyuan uses a continuous bypass and side verification court; Origin Community uses one street, two courts and four withdrawal nodes; Dazhongsi uses a four-way commute and off-route staffed service. Human figures are generic scale symbols, not site participants, public feedback, accessibility results or built evidence.
- Reduced the visual hero height so the first 30-second view reaches spatial content; added a main-content skip target, keyboard focus and bilingual descriptive alt text for the five primary figures. Licence language is now component-scoped while package-wide public or professional reuse remains blocked pending terms and independent audit.
- Aligned proposal, visual, handoff-index and agent-provenance revisions at 58.5. The historical RED baseline now declares its before-state role and current disposition so old findings cannot be mistaken for current failures.
- This revision adds no generated media and changes no geometry, `metrics.json`, 12/8/3/36 count, G0 / NO-GO, provisional, zero-real-result, zero-approval, zero-professional-acceptance or not-fully-cleared boundary.

## v58.4 - 2026-08-24

**96 分 exact-head 评审的预注册与发布硬门 / Preregistration and Release Gates for the Exact-Head 96-Point Review**

- 将唯一候选 `JZ-05 × SCENE-011 × T-02` 的专业包升级到 2.1.0：只有责任接受、准确批准范围和合法现场准入同时成立后，才能填写带日期踏勘、普通/非 AI 同任务基线、高峰/静音窗观察、无障碍共测、分母/阈值锁定与四类恢复对象。所有现实字段继续为空或 0，禁止从目标、行业值或 T-02 合成回放倒填。
- 为任何未来公共装置、永久地标或外部品牌发布增加九项权利硬门，覆盖作者与贡献记录、CC BY/MIT、OSM ODbL、OFL 字体、第三方内容、商标/史实、生成内容标识、无障碍替代与撤回下架；当前公共装置和外部品牌部署均为 0。
- 固定正式评审的精简入口为“一条裁决—三种原型—四种状态—一个候选”，后台来源、权利、现场采集、双语抽检和数据缺口登记只按需展开；阅读顺序的压缩不改变 G0、provisional、not to scale、not approved 和现实结果 0。
- 将独立人工双语抽检细化为七项、固定 exact head 后执行的签核合同，增加差异严重度定义和 fail-closed 规则；投稿方预检发现的实质差异为 0，但人工结果、身份和签名仍保持空白。
- 将最新评论六项公开行动逐条绑定到交付路径，并单列可实施性、权利发布和双语实质等价三类仍需外部完成的事实边界。几何、`metrics.json`、12/8/3/36、PDF、图像和媒体均未改变。

- Upgraded the sole `JZ-05 × SCENE-011 × T-02` candidate packet to 2.1.0. A dated walk-through, ordinary/same-task non-AI baseline, peak/quiet observations, accessibility co-test, denominator/threshold lock and four restoration objects can be populated only after duty acceptance, exact approval and lawful site access. Every real field remains null or zero; targets, industry values and the T-02 synthetic replay cannot backfill them.
- Added a nine-item rights gate for any future public installation, permanent landmark or external brand release, covering authorship, CC BY/MIT, OSM ODbL, OFL fonts, third-party content, trademark/history, generated-content labeling, accessible alternatives and takedown. Current public-installation and external-brand deployment counts remain zero.
- Fixed the concise formal-review route as one ruling, three prototypes, four states and one candidate, with source, rights, field-intake, bilingual and gap registers opened on demand. A shorter reading order does not alter G0, provisional, not-to-scale, not-approved or zero-real-result status.
- Expanded the independent human bilingual sample into a seven-item exact-head execution and signoff contract with discrepancy severity and fail-closed rules. Contributor precheck finds zero material discrepancy, while human results, identity and signature remain blank.
- Bound the six published exact-head actions to delivery paths and separated feasibility, public-release rights and substantive bilingual equivalence conditions that still require external completion. Geometry, `metrics.json`, 12/8/3/36 counts, PDFs, figures and media are unchanged.

## v58.3 - 2026-08-24

**96 分评审的专业交接落实 / Professional Handoff Response to the 96-Point Review**

- 把 `JZ-05 × SCENE-011 × T-02` 从简短候选摘要扩展为单一专业审查包，集中呈现来源维护责任、正式程序边界、人工窗口、普通任务基线、无障碍/公共同权共测、唯一主指标及分母、四项停止硬门、批准范围和独立复测计划。
- 将 H01—H07 逐项写成可签署的关闭条件，并为 D01—D08 建立八条候选材料记录，具备来源/接收者、保管者、专业审查者、日期、版本、定位符、哈希、质量门和处置字段；真实附件、责任接受、批准、现场值和独立复测仍为 0，不以目标或模拟值填充。
- 为独立人工中英文实质等价抽检准备七项签核包，覆盖摘要、三原型、全部可见数字与结构化指标、来源等级、G0/批准边界、图号/版位和实施门；签名字段保持空白，不冒充人工确认。
- 继续冻结 geometry、`metrics.json`、12/8/3/36 计数、四份 PDF 页数、媒体与权利边界；10/10 T-02 合成回放不写成服务准确率。

- Expanded `JZ-05 × SCENE-011 × T-02` from a short candidate summary into one professional review packet covering source maintenance, formal-procedure limits, staffed window, ordinary-task baseline, accessibility/public-parity co-test, the sole primary metric and denominator, four stop hard gates, approval scope and independent retest.
- Turned H01-H07 into signable closure conditions and created eight candidate-scoped D01-D08 material records with source/receiver, custodian, professional reviewer, date, version, locator, hash, quality-gate and disposition fields. Real attachments, duty acceptance, approvals, field values and independent retest remain zero and are not filled with targets or simulations.
- Prepared a seven-item independent human bilingual sampling/signoff packet covering the summary, three prototypes, every visible number and structured metric, source classes, G0/approval limits, figure/page positions and implementation gates. Signature fields remain empty and no human confirmation is claimed.
- Geometry, `metrics.json`, 12/8/3/36 counts, all four PDF page counts, media and rights boundaries remain frozen; the 10/10 T-02 synthetic replay is not service accuracy.

## v58.2 - 2026-08-24

**93 分 exact-head 评审定向修复 / Exact-Head 93-Point Review Repair**

- 将英文主稿中的中文品牌名从代码语义改为正文强调，消除 Linux/打包预览对等宽字体回退的依赖；本地离线 CJK 子集仍明确覆盖“`双轨京张`”全部字形。
- 把区域协同从一段角色枚举改为六行条件式接力矩阵。北纬社区只作为与原点社区并列但不可互换的社区语境对照点；所有外部节点继续为未确认可选角色，只接收最小 G0 任务/协议与匿名或合成证据包，没有书面接责、合法数据边界、普通任务基线及适用 H01—H07 时不启动。
- 将双语实质等价记录扩展为八项关键主张的逐项位置映射，覆盖总纲、三原型、四态、冻结计数、G0/NO-GO、区域接力、权利来源和定页出版。明确标注这是投稿方侧 Agent 审校；独立人工确认与认证翻译尚未提供，不作虚假闭合。
- 本次不改变 geometry、`metrics.json`、12/8/3/36 计数、四份 PDF 页数或既有媒体状态；区域接力为正文澄清，不制造伙伴、现场、批准、预算、现实结果或成熟度升级。

- Changed the Chinese brand name in the English source from code semantics to ordinary emphasized text, removing dependence on platform monospace fallback while retaining explicit glyph coverage in the local offline CJK subset.
- Replaced the regional-coordination role list with a six-row conditional relay matrix. Beiwei Community is only an optional community-context comparator beside, not interchangeable with, Origin Community. Every external node remains unconfirmed and accepts only a minimum G0 task/protocol plus anonymized or synthetic evidence; no relay starts without written role acceptance, a lawful data boundary, an ordinary-task baseline and applicable H01-H07 materials.
- Expanded the bilingual material-equivalence record into an eight-claim location map covering the thesis, prototypes, four states, frozen counts, G0/NO-GO, regional relay, rights/sources and fixed-page publication. It explicitly remains contributor-side agent QA; independent human confirmation and certified translation are not provided.
- This repair changes no geometry, `metrics.json`, 12/8/3/36 count, PDF page count or media status, and creates no partnership, field result, approval, budget or maturity advancement.

## v58.1 - 2026-08-24

**评审可读性与权利证据定向修复 / Targeted Readability and Rights-Evidence Repair**

- 响应 PR #3932 exact-head 评审：为中英 report/visual 共用一份本地 Noto Sans SC WOFF2 子集，覆盖四份 HTML 的完整字符并集与符号字符；干净 Chromium 截图不再出现中文方框，仍保持离线、无 JavaScript、无远程字体。
- 英文 `site-overview` 的页首长标题、说明与面板标题改为有界短句/双行说明，并同步重建英文 PNG 与引用它的 A3/A0；不改变空间事实、数字或冻结几何。
- 删除中英正文重复的第 13 章提示；两版仍保持 13 个正式章节、同一图件位置和证据边界。
- 定向复核 `CASE-22AT` 与 `CASE-KINGS-CROSS`：前者在 Barcelona 市政府页面确认可访问；后者原 workspace URL 仍为 403，改用同一项目运营方可访问的公共咨询页。两者继续仅作背景比较，不承担海淀控制、现实绩效或成熟度证据。
- 新增覆盖当前分发树每个路径的投稿方权利清单，记录 CC BY 4.0、MIT、ODbL、OFL、仓库临时输入与 citation-only 处理。独立法律意见、独立逐文件审计和商标检索仍为 0，不冒充外部专业结论。
- 新增双语实质等价记录与数据缺口关闭登记：投稿方可控的字体、越界、来源新鲜度、权利清单和双语审校已经闭合；官方 polygon/CAD/控规、现场审计、责任接收、预算、批准、真实复测和独立清权继续保持 unknown/0，且逐项记录责任来源、触发器和禁止替代物。
- 全页接触表进一步发现旧构建器的 CJK cmap 让中文版页眉/页题/页脚显示成错误汉字；改用 OFL 静态字面生成本地 2× 透明文字层，四份 PDF 保持 14+14 与 8+8 页并通过两次新进程字节一致构建。最终 SHA-256：中文 A3 `8f25771d6b943458805cf4bfc7db8038c5c5ea281d546352538da0f6076c93a5`、英文 A3 `4c0f273492f21c398904f7ff904c7354c996ce5a8cbaabed6bb28b19e6f3fee4`、中文 A0 `5fbc7f86c920cff1f3064fa81f4285ac2d9e5f2c343d0c3d32b3d9b2461ba0b8`、英文 A0 `4472306577021d01b80a34ba2a0efb4a94db4b4d7adbd73912c851b43444ca61`。

- Responded to the exact-head PR #3932 review by sharing one local Noto Sans SC WOFF2 subset across both report and visual counterparts. It covers the complete four-HTML character union and symbols; clean Chromium screenshots show no CJK tofu while the package remains offline, script-free and remote-font-free.
- Rebounded the English `site-overview` header, explanatory copy and panel heading, then rebuilt the English PNG and the A3/A0 outputs that cite it. No spatial fact, count or frozen geometry changed.
- Removed the duplicated Chapter 13 cue in both proposals while preserving all 13 formal chapters, figure positions and evidence boundaries.
- Narrowly refreshed `CASE-22AT` and `CASE-KINGS-CROSS`. The Barcelona City Council page is accessible; the former King's Cross workspace URL remains 403 and is replaced by an accessible public-consultation page from the same project operator. Both remain background comparisons only.
- Added a contributor rights decision for every current distribution path across CC BY 4.0, MIT, ODbL, OFL, repository provisional input and citation-only classes. Independent legal advice, independent file-level audit and trademark search remain zero.
- Added material bilingual-equivalence evidence and a data-gap closure register. Contributor-controlled typography, clipping, source freshness, rights inventory and bilingual review gaps are closed; official polygons/CAD/controls, field audit, accepted responsibility, budget, approvals, real retest and independent clearance remain unknown/zero with named source, trigger and invalid substitute.
- Full-page contact sheets exposed an additional legacy CJK cmap defect in Chinese page headers/titles/footers. Local 2x transparent text layers generated from OFL static faces replace that faulty mapping. The four PDFs retain 14+14 and 8+8 pages and match byte-for-byte across two fresh-process builds. Final SHA-256: ZH A3 `8f25771d6b943458805cf4bfc7db8038c5c5ea281d546352538da0f6076c93a5`; EN A3 `4c0f273492f21c398904f7ff904c7354c996ce5a8cbaabed6bb28b19e6f3fee4`; ZH A0 `5fbc7f86c920cff1f3064fa81f4285ac2d9e5f2c343d0c3d32b3d9b2461ba0b8`; EN A0 `4472306577021d01b80a34ba2a0efb4a94db4b4d7adbd73912c851b43444ca61`.

## v58.0 - 2026-08-24

**终稿收敛重建 / Final Convergence Rebuild**

- 从 canonical `main@37f5541dfab74d7f89aa0f57bf1c64ab542b036b` 建立新分支；前序 PR #3904 已关闭并由本轮替代，同包无其他开放 PR，开工树洁净。
- 修复前基线写入 `visual/assets/convergence-baseline.json`：156 个路径、23,720,803 字节、双语正文各 640 行、四份 PDF 共 44 页、9 个可选媒体路径；九份 geometry 与 `metrics.json` 的 Git-blob SHA-256 被锁定。RED-01—04 是投稿方编辑/包审查，不是公众反馈、专家意见、现场观察、审批或评审结果。
- 权利与来源不再用互相矛盾的总开关表达。`report/copyright_statement.md` 完整记录投稿方内容 CC BY 4.0、代码 MIT、OSM ODbL、Noto Sans SC OFL 与第三方排除；48 条来源保留中央正式/临时/背景、投稿方自采或包内自编身份。独立法律意见、逐文件独立权利审计和商标检索仍为 0，不冒充专业结论。
- 清退 9 个非必要模型媒体路径与 10 个旧漫游/样式/重复入口。新增双语普通生活、四态和专业交接三组原创静态 SVG/PNG；visual 收束为 6 个导航、6 个可见段落、0 JavaScript、0 远程资源、0 autoplay，并显式覆盖总览、三层范围、重点区、用地、交通、蓝绿、建筑、更新项目、AI 场景、指标、任务、自检和假设。
- 仅把既有 `JZ-05 × SCENE-011 × T-02` 设为 pre-G1 专业核验候选。其 10 个合成回放、10 个决策匹配与 4/4 停止恢复分支不升级成熟度；H01—H07 任一缺失、拒绝或过期均保持 G0 / NO-GO，现实服务、现场测试、批准、采购、责任接受与恢复时长均为 0 或 unknown。
- 四份 PDF 不增页，保持 A3 14+14、A0 8+8，共 44 页。首次逐页 QA 发现页眉/页脚字体子集 glyph ID 错位，修复后重建；空白页、替换字形与加密页均为 0。两次新进程逐文件字节一致：中文 A3 `8c176a11e728495e95e701ba45d0df47c610836fe00ce53c5be3fca1c3bfcec5`、英文 A3 `c4b08b805115eed429dc632d8caf7912bd2b9e0c90e0f51447332c1506d72828`、中文 A0 `186ee3983dade183dce138472d6708d36c8350d45200c267bc57a940f807c910`、英文 A0 `c03f457c268191e313ea3d73c8e188074d310ac30a97f7671a72ab7428d2cfcb`。
- 最终树保留 148 个路径，双语正文各 642 行。十个冻结对象（九份 geometry 与 `metrics.json`）SHA-256 与基线 10/10 一致；12/8/3/36、唯一“双轨京张”、三处不可互换原型、JZ-AIOS、G0—G3、四轴、三载体、NO-GO、provisional、现实结果 0、完整非 AI 路径、故障只停验证叠层、恢复非授权/批准/G1 与专业否决全部冻结。
- T-02 为 10/10 exact、4/4 停止恢复分支、13/13 控制项，模型/网络/现实服务调用均为 0。严格评分、空间、视觉、专业、marked self-check、participant preflight、manifest、作者与范围检查绑定最终 exact head；临时边界警告按真实性要求保留。

- Built from canonical `main@37f5541dfab74d7f89aa0f57bf1c64ab542b036b`; closed PR #3904 is replaced, no competing package PR existed, and the start tree was clean.
- The RED baseline records 156 paths, 23,720,803 bytes, 640 lines in each proposal, 44 PDF pages, nine optional media paths and ten frozen geometry/metrics blob hashes. The four findings are contributor editorial/package audits, not public feedback, expert opinion, field observation, approval or a jury result.
- Component rights are explicit: CC BY 4.0 for contributor content, MIT for contributor code, ODbL for OSM derivatives, OFL for the embedded Noto Sans SC subset, and third-party exclusions. Forty-eight sources retain their central or package-local governance status. Independent legal advice, file-level audit and trademark search remain zero.
- Nine optional model-media paths and ten obsolete walkthrough/style/redundant entrances are removed. Three bilingual original static SVG/PNG families carry ordinary life, four states and professional handoff. The visual has six navigation items, six visible sections, zero JavaScript, zero remote resource and zero autoplay.
- Only `JZ-05 × SCENE-011 × T-02` is named as a pre-G1 professional review candidate. Any missing, rejected or expired H01-H07 item keeps G0 / NO-GO; no field result, approval, procurement, accepted duty, duration or G1 is claimed.
- Four PDFs keep 14+14 A3 and 8+8 A0 pages. Full-page QA exposed and repaired a subset-glyph mapping defect. The four byte-identical hashes are recorded above; blank, replacement-glyph and encrypted pages are zero.
- The final tree retains 148 paths and both proposals have 642 lines. All ten frozen geometry/metrics hashes match baseline. T-02 is 10/10 exact, 4/4 stop/recovery and 13/13 controls with zero model, network or real-service call.

## 历史索引 / Historical index

为保持人读可用并满足 Markdown 256 KiB 上限，v56.0—v2.4 的重复长篇中英记录在 v58 收束为索引。完整原文仍在本轮基线提交 `37f5541dfab74d7f89aa0f57bf1c64ab542b036b` 的 `changelog.md` 中，可逐行恢复和比较；本索引不改变当时事实、边界或提交 SHA。

To keep the log human-readable and below the 256 KiB Markdown gate, repeated bilingual prose for v56.0–v2.4 is compacted into this index. The complete prior text remains recoverable at baseline commit `37f5541dfab74d7f89aa0f57bf1c64ab542b036b`; this index does not alter historical facts, boundaries or commit SHAs.

- 2026-08-23: v56.0 — 已批规划语境对位与前台图件去重。
- 2026-08-21: v55.0 — 海淀日常证据化与前后台压缩；v54.0 — 空间裁决前置与前台去元叙事。
- 2026-08-20: v53.0 — 评审图集完整性与定页出版终审；v52.0 — 公共地面详细设计图集；v51.0 — 人尺度行动剖面；v50.0 — 终稿证据缺口关闭；v49.0 — 城市代谢与退出成本。
- 2026-08-19: v48.0 — 最终预检与提交冻结；v47.0 — PDF 出版终审；v46.1/v46.0 — 证据新鲜度与现场对位；v45.0 — 视听真实性；v44.0 — 可访问公共信号。
- 2026-08-18: v43.0 — 实施移交矩阵；v42.0 — 故障治理写回；v41.0 — 非 AI 同任务服务蓝图；v40.0 — 冷读修复。
- 2026-08-17: v39.0 — 冷读基线；v38.0/v37.0 — 前序终稿链收束。
- 2026-08-15: v36.0—v22.0 — 权利、专业交接、维护、失败、气候、公共利益、可逆构件与出版多轮深化。
- 2026-08-14: v21.0—v19.0 — 终稿视觉、证据与双语质量深化。
- 2026-08-13: v18.0—v12.0 — 普通生活、四态、三处原型、视觉与移交合同深化。
- 2026-08-12: v11.0—v5.0 — 运营、场景、文化、产业、AI 基础设施与空间系统深化。
- 2026-08-11—10: v4.0—v2.5 — 早期方案与正式包结构演进。
- 2026-08-09: v2.4 — 初始正式化记录。

所有历史轮次均受当时仓库规则与其记录的 provisional/G0/rights 边界约束；较早的“就绪”表述不得覆盖 v59 当前分层许可、来源治理、现实结果 0 与 H01—H07 未接受状态。
