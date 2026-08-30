# 版权与合规声明

方案：京张生长网络 JINGZHANG ADAPTIVE COMMONS
投稿包：`yaoyaoxie/jingzhang-adaptive-commons`
发布版本：v1.0.3  
发布日期：2026-08-26

## 1. AI 生成说明

本投稿包初稿文本、几何数据、图件与 HTML 展示页由 AI agent（kimi-code-cli，模型 kimi）生成；打包校验与 2026-08-26 评审阻断修复使用本地 Python 工具、官方投稿脚本及 OpenAI Codex。生成与修订过程仅使用公开资料、征集公告与任务书事实、仓库 provisional 边界几何，以及公开学术文献作为背景参考。内容未经注册城市规划师或其他持证专业人员逐条专业复核。

## 2. 素材清权

- 五张核心图（`assets/figures/*.png`）、原创标志（`assets/figures/jingzhang-growth-mark.svg`）与展示页（`visual/index.html`）均为本包自产。图件由项目脚本（`figures/scripts/`、`tools/build_geometry.py`，均为项目根过程脚本，未随包提交）从本包 GeoJSON 与指标派生绘制；标志由 OpenAI Codex 以基础 SVG path/circle 原创绘制，将京张双轨、“人”字分叉、交换节点与开口回流环组合为纯几何图形，不含脚本、外链、嵌入资源或第三方图形。
- 未使用商业地图底图、新闻图片、网络图片、第三方 Logo、肖像或论文插图。
- 原创标志随本投稿文本与图件供征集评审和公开讨论使用；不得暗示主办方、铁路机构或其他组织背书，不得将字体名称或第三方商标并入标志。第三方复用须保留本声明，并自行核对名称与商标冲突。
- 全球案例与学术文献仅以文字形式引用结论并登记来源（`sources.json`），未复制其图表。
- 字体：中文报告与展示页共同使用 Noto Serif CJK SC 2.003 可变字体的本地子集，标签使用 IBM Plex Mono 本地子集；两者均按 SIL Open Font License 1.1 使用。Noto 原字体来自官方 `notofonts/noto-cjk` 仓库（`Serif/Variable/TTF/NotoSerifCJKsc-VF.ttf`），字体元数据登记 OFL 1.1 与许可链接；本项目使用 fontTools 按中英报告和展示页实际字符生成 WOFF2 子集，以 base64 data-URI 内嵌于 `visual/assets/fonts.css`。`report/proposal*.html` 仅链接该包内 CSS，所有页面零远程请求；字体名称仅用于标识原字体来源，不主张字体商标或原作权。

## 3. 概念方案属性

- 本方案为公开征集框架下的概念性共创建议，不构成法定规划、控制性详细规划、审批依据或工程结论。
- 全部空间落地建议均为“概念建议 / 参考方案”，供专业团队深化研究；不表示控规调整、容积率、建筑高度、拆改留、工程线位、投资测算或开发时序的任何确定结论。
- 全部几何为 provisional（`official_boundary=false`、`geometry_role=provisional_constraint`、精度 `provisional_rough`）；派生指标为概念设计模型值，正式官方资料发布后必须复算。

## 4. 不宣称官方立场

- 本方案未获得也不宣称获得主办、承办或征集组织机构的批准、背书或实施承诺。
- 通过本地检查（自检 PASS，如后续取得）仅表示投稿包具备进入机器检查与内容评审的基础条件，不代表专业质量认定、正式入选或工程可实施。

## 5. 数据与隐私

- 方案不使用来源受限的图件、企业私有数据、个人隐私或未授权资料。
- 方案中 AI 场景的数据治理原则（数据最小化、人工兜底、可申诉、可退出）为设计承诺，具体合规设计须在深化阶段由法律与数据合规专业复核。

## 6. 再利用

本包文本与图件供征集评审与公开讨论使用；第三方引用须保留来源与本声明。其他参与者的名称、文本、图面、几何或机制未被本包复制使用。
