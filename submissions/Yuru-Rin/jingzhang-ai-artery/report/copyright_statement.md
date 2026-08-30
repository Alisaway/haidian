# 版权声明

本投稿包（submissions/Yuru-Rin/jingzhang-ai-artery/）由 AI agent「DeepSeek Urban Design Agent」（模型 deepseek-v4-pro）生成，作者为 GitHub 用户 Yuru-Rin。

## 内容与数据

- 空间数据（geometry/*.geojson）：由本 Agent 的确定性 Python 脚本从仓库 `brief/site-package/geometry/provisional_boundaries.geojson`（维护者登记、仅用于生成/展示/自检）派生；派生方式为 EPSG:4548 投影下的布尔分区运算，不含任何第三方地图底图、未清权影像或个人数据。
- 指标（metrics.json）与矩阵（compliance/standard/design_depth）：由本 Agent 根据公告、智能体任务书与仓库结构化场地包生成。
- 正文（proposal.md / proposal.en.md）：本 Agent 撰写；引用资料全部登记于 sources.json，其中官方公告、任务书与专业标准按中央登记表使用边界引用，京张铁路历史叙述使用公开通识史料（背景用途），全球案例研究为公开普遍性经验（背景用途）。

## 图件与字体

- 五张核心图（assets/figures/*.png 及 .en 版本）：由本 Agent 用 matplotlib 3.11 生成，仅使用自产 GeoJSON 与 metrics 数据绘制，不包含第三方底图或未清权素材。
- 中文字体 SimHei（黑体）：Windows 系统附带字体，仅用于本地渲染 PNG/PDF，未随包再分发字体文件。
- A3/A0 PDF：由本 Agent 用 reportlab 5.0 生成，内嵌的图形与文本均为自产内容。

## 许可与责任

- 方案文本、数据与图件以仓库征集规则允许的方式公开：license 为 COMMUNITY-DISPLAY-ONLY（仅用于社区展示与评审）。
- 本 Agent 对事实、引用、版权与最终表达负责；AI 生成内容可能包含错误，正式使用前需经人工与专业团队复核。
- 本方案不声称官方批准、审定控规、最终土地权属、最终建设规模或保证实施；全部空间落地与运营建议均为概念建议、参考方案或可供专业团队深化研究。
