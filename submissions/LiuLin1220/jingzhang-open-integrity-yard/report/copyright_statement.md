# 版权与来源声明 / Copyright and Source Statement

## 投稿者与生成方式

本投稿的方向由 GitHub 投稿者 `LiuLin1220` 确认。中文与英文文本、表格、结构化设计、合成安全演练、离线页面及自制图件由 OpenAI Codex 生成、编辑或结构化，并由投稿者在公开提交前承担最终核对责任。`LiuLin1220` 已明确选择在其有权授权的范围内，以 `CC-BY-4.0` 提供本投稿的原创材料；这一授权选择不裁断不同法域中 AI 生成材料的可版权性或权利归属，本声明也不作法律结论。

The direction was confirmed by GitHub contributor `LiuLin1220`. Chinese and English prose, tables, structured design, synthetic safety exercise, offline pages, and self-made figures were generated, edited, or structured by OpenAI Codex. The contributor remains responsible for final review before publication. `LiuLin1220` has explicitly selected `CC-BY-4.0` for original submission material to the extent the contributor can grant those rights. That choice does not decide copyright subsistence or ownership of AI-generated material in every jurisdiction, and this statement is not a legal conclusion.

## 第三方与官方资料

官方公告、Agent 任务书、仓库场地包、公开规范和一手指南只用于必要的事实摘要、机制参考和引用。投稿未复制第三方图表、地图瓦片、Logo、人物肖像、论文图像、企业标识或大段原文，也未把字体作为独立文件放入投稿包；PDF 字体子集与图中栅格化字形的许可边界在下一节单独披露。每项来源的发布者、URL/本地路径、访问日期、允许用途、限制和转化方式记录在 `sources.json`。外部工程来源只支撑机制，不支撑京张空间事实、政府承诺、认证或生产部署。

Official announcements, the Agent taskbook, repository site package, public specifications, and primary guidance are used only for necessary factual summary, mechanism reference, and citation. No third-party diagram, map tile, logo, portrait, paper figure, company mark, or long passage is copied, and no standalone font file is placed in the submission. PDF font subsets and rasterized glyphs are disclosed separately below. `sources.json` records publisher, URL/path, access date, permitted use, limitation, and transformation. External engineering sources do not establish Jing-Zhang spatial facts, government commitments, certification, or production deployment.

2026-08-14 的 OSM/Overpass 记录只对公告命名的四条道路作街道中线背景核对。`sources.json` 登记固定查询与响应 SHA-256、抓取时点、处理方法和限制；本包不再分发原始响应，只报告派生距离统计并保留 `© OpenStreetMap contributors` 与 ODbL 1.0 边界。该背景记录不是正式来源、道路红线、官方边界、评分输入或 provisional geometry 的纠错依据。

The 14 August 2026 OSM/Overpass record is limited to a street-centreline background cross-check for four roads named in the announcement. `sources.json` records the fixed query and response SHA-256 values, timestamp, method, and limits. The raw response is not redistributed; only derived distance statistics are reported with `© OpenStreetMap contributors` and the ODbL 1.0 boundary. This background record is not a formal source, road redline, official boundary, scoring input, or correction to provisional geometry.

## 字体与构建依赖 / Fonts and Build Dependencies

最终公开候选图件和四份 PDF 使用 `NotoSansSC-Regular.ttf` 与 `NotoSansSC-Bold.ttf`。PDF 仅嵌入实际使用字形的 Noto Sans SC 子集，PNG 只包含栅格化字形像素；投稿包不包含独立 TTF。上游 `notofonts/noto-cjk` 的 Sans 许可文件明确采用 SIL Open Font License 1.1，并允许在遵守其条件时嵌入字体；本投稿不暗示字体作者背书。早期本地中间版曾使用 Microsoft YaHei，但它不是最终构建输入，最终四份 PDF 不应再包含 Microsoft YaHei 子集。若最终验收仍检出 `MicrosoftYaHei`、`Microsoft YaHei` 或其他未登记嵌入字体，应停止公开 PR 并重新生成，而不能把验收失败解释为已清权。[source:FONT-NOTO-SANS-CJK]

The final public-candidate figures and four PDFs use `NotoSansSC-Regular.ttf` and `NotoSansSC-Bold.ttf`. PDFs embed only Noto Sans SC subsets for used glyphs, while PNGs contain rasterized glyph pixels; no standalone TTF is included. The upstream Sans license in `notofonts/noto-cjk` is SIL Open Font License 1.1 and expressly permits embedding subject to its conditions; no endorsement by the font authors is implied. Earlier local intermediates used Microsoft YaHei, but it is not a final build input and the final four PDFs must contain no Microsoft YaHei subset. If final acceptance still detects `MicrosoftYaHei`, `Microsoft YaHei`, or another unregistered embedded font, the public pull request must stop for regeneration; the failed check must not be represented as clearance. [source:FONT-NOTO-SANS-CJK]

| 依赖 / Dependency | 锁定版本或文件 / Pinned version or files | 许可证 / License | 是否随投稿再分发 / Redistribution in submission | 用途 / Purpose |
| --- | --- | --- | --- | --- |
| Noto Sans SC | `Regular`/`Bold` TTF；SHA-256 见 `sources.json` | OFL-1.1 | 不分发独立字体；PDF 子集嵌入、PNG 栅格化 / no standalone font; PDF subsets and raster glyphs only | 图件与 PDF 字体 / figure and PDF typography |
| Python | 3.12.12 | PSF License Version 2 | 不随包分发 / not distributed | 几何、生成、渲染、校验编排 / geometry, generation, rendering, validation orchestration |
| Pillow | 12.3.0 | MIT-CMU | 不随包分发；只交付生成结果 / not distributed; outputs only | PNG 生成与文字排版 / PNG generation and text layout |
| ReportLab | 4.4.9 | BSD-style ReportLab license | 不随包分发；只交付 PDF / not distributed; PDFs only | A3/A0 与字体子集嵌入 / A3/A0 generation and font subsetting |
| pyproj | 3.7.2 | MIT | 不随包分发 / not distributed | 临时几何坐标变换 / provisional coordinate transformation |
| Shapely | 2.1.2 | BSD-3-Clause | 不随包分发；只交付派生 GeoJSON / not distributed; derived GeoJSON only | 拓扑、面积、长度与派生几何 / topology, area, length, derived geometry |
| jsonschema | 4.26.0 | MIT | 不随包分发 / not distributed | 审核环境 Schema 校验 / review-environment schema validation |
| OpenSSL CLI | 3.5.7 | Apache-2.0 | 不分发程序或私钥；仅交付合成公钥、签名与摘要 / no executable or private key; synthetic public evidence only | 合成 Ed25519 签名生成与验证 / synthetic Ed25519 signing and verification |
| 仓库校验、review 与 report renderer 脚本 / repository validation, review, and report-renderer scripts | commit `759146b05836336dea97c858f6d8c65d882e6c28` | 未发现仓库根级许可，需复核 / no root license found; review required | 未复制进投稿目录 / not copied into the submission | 双语 report HTML、finalize 合同与各项自检 / bilingual report HTML, finalize contract, and checks |
| 本地证据与资产生成器 / local evidence and asset generators | 基于 commit `759146b…` 的两份未提交源文件；精确 SHA-256 只在 `sources.json.toolchain_inventory` 维护 / two uncommitted sources on the base commit; exact hashes are maintained only in the machine-readable inventory | 不属于当前方案内容许可的授权范围；源代码再分发须有单独代码许可 / excluded from the submission-content license; source redistribution requires a separate code license | 不随当前投稿包分发 / not distributed in the current package | GeoJSON、证据、图件、PDF 与 visual HTML / GeoJSON, evidence, figures, PDFs, and visual HTML |

完整的机器可读依赖清单、用途、本地构建边界、再分发状态和字体/构建脚本哈希见 `sources.json.toolchain_inventory`。双语 report HTML 已由固定 commit `759146b…` 中未修改的仓库 renderer 生成；本地证据与资产生成器以精确 SHA-256 固定，但不随投稿包分发。工具许可证不自动决定投稿内容许可；`LiuLin1220` 已于 2026-08-10 为有权授权的原创投稿材料选择 `CC-BY-4.0`，第三方材料仍适用各自条款。

The complete machine-readable dependency inventory, purpose, local build boundary, redistribution status, and font/build-script hashes are recorded in `sources.json.toolchain_inventory`. The bilingual report HTML was generated by the unmodified repository renderer at fixed commit `759146b…`; the local evidence and asset generators are pinned by exact SHA-256 values but are not distributed in the submission. Tool licenses do not determine the submission-content license; on 2026-08-10, `LiuLin1220` selected `CC-BY-4.0` for original submission material to the extent the contributor can grant those rights, while third-party material remains under its own terms.

## 自制图、空间数据与合成证据

核心图由本投稿自己的 GeoJSON、指标和矩阵派生，不使用远程底图或远程资产。总体设计范围和三处重点区的源 geometry 是仓库明确标注的 provisional data，只能用于概念定位、临时复算、图示和自检；该数据状态不因重新绘图而升级。所有制品、组件、权限、漏洞、下游影响、召回、人工兜底和恢复记录均为虚构、非可利用的合成证据，不指向真实组织或系统。

Core figures are derived from this submission's GeoJSON, metrics, and matrices without remote basemaps or remote assets. The source geometry for the ODA and three key areas is explicitly provisional repository data and remains limited to concept location, temporary recalculation, diagrams, and self-checks. Redrawing does not raise its authority. Every artifact, component, permission, vulnerability, downstream effect, recall, fallback, and recovery record is fictional, non-exploitable evidence that identifies no real organization or system.

## 许可状态

除另有标注外，本投稿中的原创文本、表格、结构化设计、合成数据和自制图件，在投稿者有权授权的范围内，由 `LiuLin1220` 按 Creative Commons Attribution 4.0 International（`CC-BY-4.0`）提供：<https://creativecommons.org/licenses/by/4.0/>。推荐署名为“LiuLin1220，京张开源验真场 / Jing-Zhang Open Integrity Yard”；复用者须提供许可链接、注明是否修改，且不得暗示背书。该授权不覆盖第三方来源、标准、商标、字体、仓库代码或投稿者控制范围外的其他权利。专业机构资格预审公告的知识产权条款是否适用于普通 Agent GitHub PR 尚未得到证明，本投稿不作推定。

Except where otherwise noted, original text, tables, structured design, synthetic data, and self-made figures in this submission are offered by `LiuLin1220` under Creative Commons Attribution 4.0 International (`CC-BY-4.0`) to the extent the contributor can grant those rights: <https://creativecommons.org/licenses/by/4.0/>. Suggested credit is “LiuLin1220, Jing-Zhang Open Integrity Yard”; reusers must link the license, indicate whether changes were made, and must not imply endorsement. This grant excludes third-party sources, standards, trademarks, fonts, repository code, and rights outside the contributor's control. It has not been established that the professional-institution prequalification announcement's intellectual-property terms govern an ordinary Agent GitHub pull request.

## 离线与隐私

阅读版与可视化版不得加载远程脚本、字体、地图瓦片、iframe、表单或外部 API，也不得跟踪评审者。若后续增加任何资产，须先登记来源、许可和限制，并重新完成离线与版权检查。

Rendered and visual versions must load no remote script, font, map tile, iframe, form, or external API and must not track reviewers. Any later asset must be registered with source, license, and limitation before offline and copyright checks are rerun.
