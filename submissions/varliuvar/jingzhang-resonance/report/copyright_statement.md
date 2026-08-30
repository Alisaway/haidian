# 版权、生成内容与公开边界说明

## 本包原创成果

`proposal.md`、结构化 JSON/GeoJSON 的方案表达、V13 分析图的自制版式、五张核心图、A3/A0 图册、离线 HTML、节点设计记录与自制图形由本项目的人类协作者与 AI agent 共同整理。工作流协作 agent 为 zcode、Codex、Ima；概念生成由 Fable、DeepSeek、Kimi3、Hunyuan3、OpusT5 共同完成；详细规划图与设计图由 Fable5、GPT-5.6 共同完成。

## AI 生成视觉

附件含 Tokai、Oskyi、GPT-image 等生成或编辑图。它们统一按“视觉意向 / 研究表达 / 非现状 / 非测绘 / 非法定方案”使用，不得描述为现场摄影、测绘成果、已建方案或政府批准方案。

逐资产或资产组盘点已经写入 `visual/assets/asset-rights-ledger.json`。AR-013 共登记 34 条生成或编辑组件记录 / 22 个唯一嵌入块：32/20 精确映射到六个 Tokai gpt-image-2 运行，2/2 精确映射到第 14 页 Oskyi 运行。Tokai 归档没有 provider response ID 和服务条款文件，因此相应字段保持 `null`，另以本地归档键、response/preflight/metadata/image 哈希、脚本变换和像素匹配记录支撑；不把本地键冒充服务商 ID，也不把参与者发布范围冒充服务商条款。

## 第三方与公开资料

任务书、公告、规范和国际案例仅按 `sources.json` 引用。当前包没有识别到独立的街景或案例图片文件。AR-010 中来自 N04 `/export` 静态捕获的派生图已有随包 Esri item、条款摘要和引用指引快照，适用署名为 “Sources: Esri, Vantor, Earthstar Geographics, and the GIS User Community”。N01 页 13 原有瓦片服务拼接已移除，并由参与者自制抽象底板替换；该替换记录与成品哈希见 `visual/assets/asset-rights-ledger.json` 和 `visual/assets/esri-evidence-index.json`。包内不发布原始瓦片、离线底图包或可独立复用的源图。工作名称和 Logo 方向的正式商标审查仅在未来公开品牌使用时触发。字体单列使用 Noto Sans SC 子集，并随包保留 SIL OFL 1.1 许可文本。代码依赖审计只发现 Node.js 内置模块，没有打包第三方代码库。

## AI Review Layer 权利台账

机器评审专用记录分为三份：`asset-rights-ledger.json` 负责来源、创作者角色、许可、工具、变换和哈希；`asset-clearance-disposition.json` 负责公开处置；`brand-model-provenance.json` 负责品牌、模型与现有 run 证据。公开处置使用 `cleared_with_evidence`、`replaced_with_cleared_asset`、`excluded_from_public_package` 和 `unresolved_pending_permission_or_replacement`；未知项不会写成已清权。

本次候选包已闭合 R1/R2：第 13 页两处百度图片搜索裁切已由参与者自制矢量抽象表达替换并从当前派生物移除；第 15 页两处 Esri 组件已按哈希精确归入 AR-010；AR-013 已完成 34/22 的混合服务商证据映射。`package_publication_state=cleared_for_declared_scope_pending_maintainer_re_review`、`publication_clearance=true` 仅适用于本 PR 与非商业静态社区评审范围，不表示商业清权、专业评审准入、维护者批准或更广范围发布授权。

## 提交许可

本包的中英文 proposal front matter 使用 `COMMUNITY-DISPLAY-ONLY`；该字段不在 manifest 中。该许可只覆盖本项目有权处分的文字、结构、数据整理与自制视觉，不替代第三方权利人的授权。任何公开发布、商业使用、再许可或衍生传播都需按来源逐项核验。

## 合规声明

方案不使用秘密地图、非公开政府数据、企业内部数据或个人隐私；不虚构官方背书、资金承诺、审批状态或实施结果。涉及权属、控规、工程、交通、水务、文保、消防、无障碍与公共安全的内容均为待专业团队深化的概念建议。
