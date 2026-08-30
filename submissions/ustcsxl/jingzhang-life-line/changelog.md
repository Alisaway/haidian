# 方案迭代记录

> **当前唯一冻结成果版本：v1.5.0（2026-08-27）**。以下 v1.0—v1.4.2 条目仅为历史变更记录，不代表当前交付中并存多个版本。

## v1.5.0 - 2026-08-27

- 以完整二进制成果替代上一轮仅 8 个文本文件的局部补丁，确保修正后的 PNG、PDF 与 WebP 实际进入提交。
- 中文 HTML 的所有人眼可见文字改用 CJK-safe 栅格或字形轮廓；页面不依赖系统中文字体，语义文本与指标标记仍保留。
- 使用不溢出的中英文三态服务序列，并提交修正后的 `key-areas.en.png` 与 `metrics-evidence.en.png`。
- 将 proposal、manifest、report、visual、A3/A0、核心图和补充图统一冻结为 `v1.5.0`。
- 不修改 GeoJSON、核心面积比例、法定控制判断或现实运营承诺。

## 历史版本

## v1.0 - 2026-08-26

- 完成“京张生命线”双语正式方案包。
- 建立一条连续服务生命线、三座韧性站、十二张可降级场景卡和六类人物画像。
- 生成九类 GeoJSON、可复算指标、23 项任务覆盖、专业标准与设计深度矩阵。
- 生成五组双语图件、双语 A3 图册、双语 A0 展板、双语离线阅读版与展示页。
- 重构 A0/A3 的竞赛级视觉系统：强化封面主张、图文层级、地图占比、三站原型、场景矩阵、服务状态与实施时间线；减少无效留白和重复卡片。
- 将 72 小时明确限定为待演练的设计目标；加入断网、断电、漂移、误报、拥挤与无障碍阻断的失败注入。
- 保持 provisional geometry、法定控规、竣工状态、市政容量、成本与运营承诺的显式边界。
## v1.1 - 2026-08-26

- Rebuilt all four A0/A3 PDFs as a competition-grade editorial system.
- Replaced sparse report-like pages with full-canvas hierarchy, vector maps, stronger station prototypes, scenario/evidence grids, and a gated implementation narrative.
- Kept Chinese and English page structures semantically aligned.
- Refreshed the gallery cover to match the redesigned visual system.


## v1.2 - 2026-08-26

- Added three legible spatial prototype plans for the resilience test yard, public care station and continuity depot.
- Added normal/degraded/human failure ladders and visible handover logic to A0 Board 03 and A3 pages 05-07.
- Enriched all twelve scenario cards with concise manual or account-free fallback paths.
- Refined competition typography with editorial serif headings while preserving the established colour and evidence system.
- Re-rendered all four bilingual PDFs and verified page geometry, embedded fonts, PDFium output and a Poppler spot check.


## v1.4 - 2026-08-26

- 用 Noto Sans CJK SC 构建期字形轮廓重建中文 report/visual 可见层；不分发字体文件，并保留同位可搜索语义文本。
- 新增五类区域协同接口矩阵，逐项定义交换资源、接口机制、证据状态、责任建议、进入/停止闸门和非承诺边界。
- 新增三座韧性站实施级矢量图，标出入口/出口、人工接管、公众/物流流线、无障碍路径、隔离/急停、服务组件与 S01-S12 映射。
- 将实施路径深化为 Y1-01 至 Y1-03 三项首年可逆试点，补充验收证据、Go/No-Go、RACI、生命周期成本、停止和回滚。
- 同步中英文正文、指标、仿真合同、假设、来源、合规矩阵、专业深度矩阵、标准矩阵、版权说明与 manifest。

## v1.4.1 - 2026-08-27

- Replaced the mandatory bilingual `key-areas.png` pair with implementation-grade station diagrams.
- Folded the five-interface regional matrix into the mandatory land-use figure pair and the first-year pilot evidence into the mandatory metrics figure pair.
- Appended bilingual regional, station and pilot evidence sheets to A0/A3 PDFs so the repairs are visible in every principal review channel.
- Re-rendered HTML and PDF evidence, refreshed all manifest hashes and prepared an exact-head self-check workflow.


## v1.4.2 - 2026-08-27

- Made the complete Markdown-derived report visible and open by default in both offline HTML versions; transparent semantic text is no longer used as a substitute for human reading.
- Added specific alternative text, responsive navigation, source/assumption/self-check links and a reduced-motion service-state sequence.
- Added a bilingual generated concept storyboard for normal, degraded and human-takeover public-service states, clearly separated from factual evidence.
- Removed the remaining CJK tofu from the English evidence-gate title and shortened the crowded north-station heading.
- Regenerated the affected mandatory English PNGs and replaced the corresponding vector pages in the English A0/A3 PDFs.
- Prepared the package as a post-merge patch with `self_checked=false`; the application script runs the current upstream render, manifest refresh, four-gate self-check, strict validation and push preflight before commit and PR creation.
