# 版权声明与逐项权利说明（Copyright Statement and Per-Item Rights Ledger）

本声明与 sources.json 中的资产许可条目（ASSET-FONT-NOTO-SANS-SC、ASSET-CODE-BUILD-SCRIPTS、PACKAGE-GEOMETRY 等）共同构成逐项权利与生成来源证明。全部内容为概念建议，不构成任何现实世界版权、商标或审批的替代证明。

## 1. 文本与图件：原创与生成方式

- 正文（proposal.md、proposal.en.md、report/narrative.md）由声明在 agent.json 中的智能体（opencode 非交互会话，生成提示驱动）原创撰写并经结构编辑；无整段复制自第三方文本。
- 全部图件（assets/figures/ 下 8 幅中文 + 8 幅英文 PNG）与图册/展板（drawings/ 下 A3、A0 各中英两版 PDF）由本包生成脚本基于本包 geometry 数据原创绘制（matplotlib，Noto Sans SC 字体）；生成方式、文本包围盒检查与 ink/边缘裁剪机器测量记录于 self_check.json[figure_qc] 与本仓库 changelog。
- HTML 页面（report/proposal.html、report/proposal.en.html、visual/index.html、visual/index.en.html）由自有/仓库模板代码生成，无第三方前端依赖、无远程脚本、无远程字体（字体以 data URI 子集化嵌入）。
- geometry/ 下 GeoJSON 为本方案自产概念设计几何（见 sources.json 的 PACKAGE-GEOMETRY 条目：生成方式、局限与 provisional 属性）。

## 2. 字体与代码许可

- 字体：Noto Sans SC（SIL Open Font License 1.1，Google/Adobe Noto 项目）。OFL 1.1 允许嵌入与再分发；本包以 pyftsubset/varLib 子集化后 base64 嵌入 4 个 HTML 页面，并以同一字体渲染图件与 PDF。来源与许可登记于 sources.json 的 ASSET-FONT-NOTO-SANS-SC。
- 代码：方案生成与验证脚本为组织方仓库许可下的脚本与自有代码（无第三方前端依赖），登记于 ASSET-CODE-BUILD-SCRIPTS。

## 3. 地图与数据复用条款

- 地图仅使用：组织方公开资料（公告与任务书，仅文本口径，见 DATA-SRC-OFFICIAL-ANNOUNCEMENT-2026-05-09、DATA-SRC-AGENT-TASKBOOK-2026-05-18）与仓库维护者发布的 provisional 几何（DATA-SRC-PROVISIONAL-BOUNDARIES-2026-06-05，明确非官方红线）。未复制任何第三方地图瓦片、底图或素材。
- 五个对标案例（北京、上海、新加坡、日本、芬兰）仅按公开渠道概述机制方向，逐案登记发布者、链接、日期、许可与"不搬用"边界（sources.json CASE-* 条目与 proposal.md 风险章节表格），不复制页面版式、图片、标识或文本。
- 本包自产 provisional 几何仅用于展示与讨论，官方边界与控规数据发布后按已声明公式复算替换。

## 4. 第三方素材清单

- 第三方素材仅两项：Noto Sans SC 字体（OFL 1.1）与生成式 AI 服务管理暂行办法等官方公开文本（仅引用表述，见 DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES 的 allowed/prohibited uses）。其余全部为自产素材。无第三方图片、图标或地图素材。

## 5. Logo 与名称在先权利检索

- 品牌名「暖灶智环 KIT·JZ」与「一坊一圃一灶」为原创概念命名。概念阶段未完成官方商标检索：名称与标识按内部工作代号处理，在先权利检索完成前不对外注册、不用于正式商业使用；对外展示均标注概念属性（proposal.md 品牌章节与 visual 页面均已明示）。

## 6. 无法清权内容的处理

- 无无法清权的内容保留：所有引用均为公开渠道或自产，且每个引用均标注"仅机制方向/仅文本口径"边界；若后续发现任何条目权利存疑，将按本声明第 5 节原则替换或移除。
