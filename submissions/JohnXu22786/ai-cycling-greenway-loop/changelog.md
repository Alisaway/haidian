# 方案迭代记录

## v0.3.0 - 2026-08-30

- 按 CocoSgt 81/100 复审逐项修正计数口径：统一为 12 张 AI 场景卡 + 3 个 AI 地标 = 15 个场景节点，并同步正文、指标、图表、HTML、PDF 与预览。
- 增加 scenario_card_count=12 与 scenario_node_count=15 的显式指标登记；比例与计数在指标图中分组呈现，保留 provisional 几何与官方数据发布后整体复算边界。
- 使用嵌入式 Noto Sans SC 处理英文 HTML 中的中文主名称，并用 CJK 字体重制双语指标图与同模板英文 A0/A3 输出；完成逐页可读性、剪裁与哈希复核。

## v0.2.0 - 2026-08-29

- 接续 PR #4082 在 reviewed SHA `bea0817211b59af377affaca62480e30d8309978` 的 CocoSgt 70/100 CHANGES_REQUESTED；修复依据、原文、包 SHA 与逐项映射记录于 `visual/assets/repair_evidence.json`。
- 新增区域—功能—节点—协作接口矩阵，逐项覆盖三大定位、五大功能、三区两翼及北纬社区、未来科学城、怀柔科学城、经开区、京津冀，并写明概念输入、输出、参与方和非承诺边界。
- 将 T01—T03 改为拟验证协议，补齐对象、样本/时段、单位、基线/TBD、阈值、误差分群、人工复核、失败处置与停止条件；未测试内容未写成结果。
- 为 S01—S12 补充最小数据生命周期；展示类场景明确无个体数据输入。三处节点改为可转化概念卡，记录设计深度边界、无障碍、运营与退出条件。
- 补充 agent.2 要素保障与 agent.6 活动—评估—转化—退出路径；土地、资金、人才、算力、数据、场景和合作均保持待核/建议属性。
- 重制五张英文配对图，修复地图比例、断词、裁切和 ratio/count 混轴误读，并重新生成英文 HTML、A0/A3 与预览。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for ai-cycling-greenway-loop.
- Proposal drafted via OpenCode CLI (opencode), session oc-ridejz-1; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).
