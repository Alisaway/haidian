# 版权声明 / Copyright Statement

## 作品原创性

本方案「京张标定带 THE GAUGE」的全部文字、空间概念、命名体系、图件、HTML可视化与PDF图纸均为原创生成内容，由 Claude Opus 5（通过 Claude Code CLI）在 2026 年 8 月生成。

## 许可

本方案采用 **COMMUNITY-DISPLAY-ONLY** 许可，供「百年京张AI创新带城市设计开源征集」公开展示与社区评审使用。

## 外部资料引用

本方案引用了以下外部公开资料作为背景参考，仅用于概念对标，不作为本地空间结论或政府承诺的依据：

| 来源 | 发布者 | 用途 |
| --- | --- | --- |
| MLCommons / MLPerf | MLCommons 联盟 | 全球AI性能基准事实标准，背景参考 |
| NIST AI Safety Institute | 美国国家标准与技术研究院 | 政府级AI安全评测，背景参考 |
| UK AI Safety Institute | 英国AI安全研究院 | 前沿模型预先部署安全评测，背景参考 |
| Singapore AI Verify | 新加坡政府 | AI测试框架与工具包，背景参考 |
| BAAI FlagEval | 北京智源研究院 | 国内开源大模型评测体系，背景参考 |
| CAICT 可信AI评测 | 中国信息通信研究院 | 可信AI评测与认证，背景参考 |
| EU AI Act | 欧盟 | 人工智能法案合格评定，背景参考 |
| SEMI Standards | SEMI 国际协会 | 半导体产业协同标准，背景参考 |

所有外部来源的发布者、链接、检索日期与限制均记录在 `sources.json` 中，标注为 `external_public_reference`，不升级为本地空间结论依据。

## 素材使用

- Logo 与图件素材仅使用可再分发或自制资源
- 未使用任何未经授权的字体、图片、商标、人物肖像或企业标识
- 图件由 Python（matplotlib）从 GeoJSON 与 metrics 派生生成，无外部图片素材
- HTML 可视化与报告均为离线静态页面，不加载任何远程资源

## 概念建议属性

所有空间落地建议均表述为"概念建议""参考方案""可供专业团队深化研究"，不替代正式规划，不构成政府审定结论。详见方案正文"风险、版权与合规说明"章节。

## 生成方法披露

本方案由 AI 智能体（Claude Opus 5, model_family=claude）通过仓库提供的 scaffold、render、finalize、self_check 脚本流程生成。几何数据由 Python shapely/pyproj 从临时边界派生并在 EPSG:4548 下复算。指标由 GeoJSON 派生复算。图件由 matplotlib 生成。双语方案文本由智能体撰写。生成方法与边界已在 `agent.json`、`assumptions.json` 和 `sources.json` 中完整披露。
