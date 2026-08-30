# Copyright and Provenance Statement / 版权与来源说明

## Authorship and permitted use / 创作与使用

The proposal text, page layouts, diagrams, parametric concept drawings, PDF composition and offline HTML were produced for this submission by the declared Codex agent under the direction and final review authority of Tianxiao Cheng (`IgnoranceSmile`). The package license is `COMMUNITY-DISPLAY-ONLY`; inclusion in this repository does not convert third-party source material into an unrestricted licence. OpenStreetMap source and database-derived evidence in `visual/assets/evidence-osm-*` and `visual/assets/evidence-building-inventory.json` are expressly excluded from that package licence and remain governed by ODbL 1.0.

本方案的正文、版式、图解、参数化概念图纸、PDF 与离线网页由已申报的 Codex agent 在 Tianxiao Cheng（`IgnoranceSmile`）确定方向并保留最终审核权的条件下完成。投稿包使用 `COMMUNITY-DISPLAY-ONLY`；公开展示不改变任何第三方资料原有的权利边界。`visual/assets/evidence-osm-*` 及 `visual/assets/evidence-building-inventory.json` 中的 OpenStreetMap 源数据与数据库派生证据不适用上述包级许可，仍遵循 ODbL 1.0。

## Source material / 来源资料

- Competition announcements, task materials, standards excerpts and user-cleared records are used only for the purposes and within the limitations recorded in `sources.json`.
- The repository provisional polygons remain generation and discussion constraints. They are not official boundaries, cadastral records or approvals.
- OpenStreetMap geometry is a frozen orientation source attributed to OpenStreetMap contributors under ODbL 1.0. It is not an official planning or engineering base.
- Twelve primary-source records for the six international cases are retained as `citation_only` links and factual metadata. No case-study webpage, image or attachment is copied into the package, and the records do not support a site-specific planning-control conclusion.
- No remote map tiles, case-study photographs, company logos or uncleared commercial basemap screenshots are embedded in the formal package.

赛事公告、任务材料、标准摘录与用户已清权资料只在 `sources.json` 登记的用途和限制内使用。仓库临时 polygon 不是官方红线、地籍或批准文件。OpenStreetMap 几何仅用于冻结定位，并按 ODbL 1.0 归属 OpenStreetMap contributors。六个国际案例的十二条一手来源只以 `citation_only` 链接与事实元数据登记，不复制案例网页、图片或附件，也不用于支撑本场地规划控制结论。正式包不包含远程地图瓦片、案例照片、企业标识或未清权商业底图截图。

## Generated concept visualisations / 生成式概念体验图

Three 16:9 images were generated on 2026-08-29 with OpenAI Image Generation through Codex. They depict a research refront, the AI Origin demonstrator and a generic station-city arrival. They are design intentions, not site photographs, evidence of existing conditions or approved works. Every use in the A3/A0 files and offline HTML is overprinted or captioned `CONCEPT VISUALIZATION / NOT EXISTING OR APPROVED`.

三张 16:9 图像于 2026-08-29 通过 Codex 内置 OpenAI Image Generation 生成，分别表达科研复面、AI 原点样段和通用站城到达场景。它们不是现场照片、现状证据或已批准工程；A3/A0 与离线网页均标注“概念体验图 / 非现状、非批准方案”。

| Asset | Upstream PNG SHA-256 (not distributed) | Delivered WebP SHA-256 | Boundary |
| --- | --- | --- | --- |
| `visual/assets/hero-research-concept.webp` | `c02e81a97adfa1a91b1ef3f37ad69e5e097b0be3a1d6213bd86095fe5b1f946f` | `8dd29034fe54d23dd090601831e86e62755ea4644476f57503c59243d66c59d5` | conceptual research-front experience |
| `visual/assets/hero-ai-origin-concept.webp` | `85021a90e7e843974ba2e43394a610fdbabf700919cc7dd1fb5a8f6dc56b3d8c` | `d8dd8771ce860e2d5801f0c184e00afd56cd9ef322d96cfd2c07f6963576b81c` | conceptual AI Origin experience |
| `visual/assets/hero-dazhongsi-concept.webp` | `a89d006097415abb5150d0cdd55cdc1329a1c1a61ccb7830712a8665af40b8f2` | `64ed57925d72a6549ac4a41856db7ee18431852e6c04fa94d5174b9d94cbe381` | generic station-city concept; not a verified Dazhongsi view |

The complete normalized prompts, known and unrecorded generation fields, upstream-output hashes, conversion settings and delivered hashes are retained in `visual/assets/evidence-generated-visuals.json`. The WebP files were converted with Pillow in RGB mode at `quality=82`, `method=6`, without resizing.

## Fonts and software / 字体与软件

The PDF builder uses locally installed Noto Sans SC and system Latin fonts as embedded PDF subsets. Raster figures contain rendered text. For reliable offline Chinese in the four HTML pages, the package distributes `visual/assets/jingzhang-cjk.css`, which contains a glyph-reduced WOFF2 Modified Version derived from the official Noto Sans CJK SC Regular 2.004 source (`NotoSansCJKsc-Regular.otf`, source SHA-256 `2c76254f6fc379fddfce0a7e84fb5385bb135d3e399294f6eeb6680d0365b74b`). Copyright is © 2014–2021 Adobe. The font is licensed under SIL Open Font License 1.1; the CSS human-readable header carries the copyright, exact upstream URL and hash, subset hash/tool record, Modified Version name, and the complete licence text. No raw `.otf`, `.ttf`, `.woff`, or `.woff2` file is distributed, and no remote font is requested.

PDF 构建器将本地 Noto Sans SC 与系统西文字体以 PDF 子集形式嵌入，栅格图件的文字已转为像素。为保证四份 HTML 在无中文系统字体的离线评审环境中可读，本包发布 `visual/assets/jingzhang-cjk.css`：其中是由官方 Noto Sans CJK SC Regular 2.004 源字体按实际 HTML 字符缩减、转换的 WOFF2 Modified Version。版权为 © 2014–2021 Adobe，许可为 SIL OFL 1.1。CSS 可读头部完整登记了版权、官方源链接与哈希、子集哈希与工具、修改版名称及 OFL 1.1 全文。本包不发布原始 `.otf` / `.ttf` / `.woff` / `.woff2` 文件，也不发起远程字体请求。Build and validation scripts use repository code plus ReportLab, Pillow, pypdf, fontTools and Poppler. The HTML pages load no remote script, image, iframe, tracker or API.

## Responsibility boundary / 责任边界

AI assisted research, drafting, diagramming, image generation and checking. The participant retains design-direction choice and submission approval. Property, planning, structure, fire, accessibility and engineering conclusions require the responsible professionals and authorities; this package does not claim those approvals.
