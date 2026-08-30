# 版权与生成说明 / Copyright and Generation Statement

## 成果权利

本投稿由参赛发起人指导，使用 OpenAI GPT-5 family via Codex 进行公开资料调研、事实校核、方案综合、文字与结构化成果生成。方案名称“京张开物 / Jing-Zhang Open Works / JZ Works”、JZ-PATCH 城市补丁协议、五张核心图、离线 HTML、A3 文册与 A0 展板为本次投稿原创表达。

本包采用 `COMMUNITY-DISPLAY-ONLY` 声明，仅授权开源征集仓库为评审、展示、讨论和版本协作目的保存与展示；不自动授权第三方商业再利用、品牌注册、工程建设或将本方案解释为政府批准文件。最终参赛署名和授权主体需在提交 GitHub PR 前由用户确认。

## 外部资料

- 外部公开资料只以文字引用和 URL 进入 `sources.json`；核心图与 PDF 未嵌入外部地图截图、遥感图、第三方照片、人物肖像、企业商标或远程图片。
- 仓库临时边界来自 `brief/site-package/geometry/provisional_boundaries.geojson`，仅用于生成、可视化与自检；不主张其为官方红线。
- 国际案例仅提取机制，不复制其图片、版式、指标或空间方案。

## 字体与工具链

- 屏幕图使用本机 Microsoft YaHei / Arial；PDF 使用本机 SimHei / Arial。上述系统字体仅嵌入生成的图像或 PDF，不在投稿包中再分发字体文件。
- 为修复离线评审环境的中文缺字，中文 `visual/index.html` 与 `report/proposal.html` 各自嵌入只覆盖本包所用字符的 Noto Sans SC 回退子集。它由系统安装的 Noto Sans SC Variable Font 机械子集化而来，原始版权标记为 `© 2014-2021 Adobe`，字体名表保留 SIL Open Font License 1.1 声明及许可链接 `http://scripts.sil.org/OFL`；子集不作为本方案原创字体主张。
- 回退子集以 HTML 内联 data URL 存在，不作为独立投稿文件，也不请求远程字体、脚本、接口或跟踪器。正文始终使用该离线子集保证可读；标题在有华文宋体/宋体的系统中保留原设计字体，否则回退到同一子集。
- 图件使用 Pillow 生成；PDF 使用 ReportLab 生成；PDF 复核使用 pypdf/pdfplumber 与 Poppler 渲染工具。投稿包不再分发这些依赖。
- `report/proposal.html` 由仓库 `scripts/render_proposal_html.py` 生成；`manifest.json` 与哈希由 `scripts/finalize_submission.py` 更新。

## AI 与人工责任

AI 参与不替代作者对事实、版权、空间主张和提交权限的责任。所有来源、数值和空间结论按“官方 / 临时 / 背景 / 设计建议”分级；发现事实不对应时应修改方案、降级主张或保留 unknown，不得用生成内容补齐事实缺口。

## English summary

The participant-directed package was researched and generated with OpenAI GPT-5 family via Codex. The identity, JZ-PATCH protocol, five core figures, offline HTML and PDF layouts are original to this submission. External sources enter only as text citations and URLs; no external basemap, photograph, portrait or company mark is embedded. System fonts are embedded in outputs but not redistributed. A package-local Noto Sans SC glyph subset is included solely as an offline CJK fallback under SIL Open Font License 1.1; its embedded name table retains the upstream copyright and licence notice. AI assistance does not transfer responsibility for facts, rights, spatial claims or submission authority.
