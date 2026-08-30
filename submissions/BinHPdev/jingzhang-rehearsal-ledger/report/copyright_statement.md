# 版权与原创声明 / Copyright and Originality Statement

## 原创性 / Originality

本投稿包的全部内容——正文、英文译稿、空间结构、场景卡、演练机制、风险矩阵、概念空间节点、
图件、A3 文册、A0 展板与离线 HTML 展示页——均为本次投稿由参赛者 `BinHPdev` 使用
Claude Opus 5（`claude-opus-5`）原创生成，未复制他人方案。

All content in this package — the main text, the English translation, the spatial structure,
the scenario cards, the rehearsal mechanism, the risk matrix, the concept spatial notes, the
figures, the A3 booklet, the A0 boards, and the offline HTML exhibit — was originally produced
for this submission by participant `BinHPdev` using Claude Opus 5 (`claude-opus-5`).
No other entrant's work was copied.

## 生成方式 / How the artefacts were produced

- `geometry/*.geojson`：由参赛者编写的确定性生成脚本，从 `brief/site-package/geometry/provisional_boundaries.geojson`
  推导。同一输入产生同一输出，坐标在 EPSG:4548 下按 1 mm 网格对齐。
- `metrics.json`：全部数值由脚本从**已写入磁盘的** GeoJSON 与 `simulation.json` 复算，非手工填写。
- `simulation.json`：固定 seed = 20260824 的离线合成任务轨迹。**不调用在线模型，不接入真实机器人，
  不使用任何个人数据。** 读数为离线合成结果，非现场实测。
- `assets/figures/*.png`：使用 Matplotlib 从提交的 GeoJSON 与 metrics 渲染，非截图、非外部素材。
- `drawings/*.pdf`：由上述图件与文本在本地合成，未使用外部模板。
- `visual/index.html`：手写 HTML/CSS，无框架、无外部依赖。

## 字体与资产 / Fonts and assets

**图件与 PDF。** `assets/figures/*.png` 与 `drawings/*.pdf` 使用 macOS 系统自带字体
Hiragino Sans GB 与 Arial Unicode MS 进行**本地光栅化/内嵌渲染**，字体文件本身未作为独立文件再分发。

**HTML 的中文字形。** `report/proposal.html`、`report/proposal.en.html`、`visual/index.html`
与 `visual/index.en.html` 内嵌了一份**按本包实际用字裁剪的 Noto Sans SC 子集**，
以 `data:` URI 形式写在各文件的 `@font-face` 中：

| 项 | 值 |
|---|---|
| 原始字体 | Noto Sans SC，Version 2.004（`hotconv 1.0.118`） |
| 版权 | Copyright 2014-2021 Adobe (http://www.adobe.com/)，Reserved Font Name `Source` |
| 许可 | SIL Open Font License, Version 1.1（全文见本文件末尾） |
| 取得方式 | Google Fonts 开源字体库 `ofl/notosanssc/NotoSansSC[wght].ttf` |
| 本包的修改 | 以 `fontTools.varLib.instancer` 固化 `wght=400` 与 `wght=700` 两个字重，再以 `pyftsubset` 裁剪至本包实际出现的字符，输出 WOFF2 |
| 再分发形式 | base64 编码内嵌于上述四个 HTML 文件，不作为独立字体文件提交 |
| CSS 字体族名 | `JZSansSC` |

**为什么内嵌而不是外链。** 评审环境以 headless Chromium 从 `file://` 打开 HTML。
Chromium 对 `file://` 使用不透明来源，字体是 CORS-enabled 请求，因此相对路径的字体文件会被拦截；
仓库同时禁止任何远程字体。`data:` URI 是唯一在该环境下必然生效、且不产生任何网络请求的方式。
本包实测：内嵌后与系统苹方渲染的同一串汉字存在 31522 像素差异，证明浏览器采用的是内嵌字形而非系统回退。

**OFL 合规说明。** 本包对该字体只做了实例化与子集化，属 OFL 允许的 Modified Version；
按 OFL 第 3 条不得使用 Reserved Font Name，故 CSS 字体族命名为 `JZSansSC`，
既不含保留名 `Source`，也不使用 `Noto` 名义发布；字体未被单独出售，
版权声明与许可全文随本包提供。

**Fonts (English).** The four HTML deliverables embed a subset of **Noto Sans SC v2.004**
(Copyright 2014-2021 Adobe, Reserved Font Name `Source`, SIL Open Font License 1.1) as a
base64 `data:` URI inside `@font-face`. The font was instanced to weights 400 and 700 with
`fontTools.varLib.instancer` and subset to the characters this package actually uses with
`pyftsubset`, then encoded as WOFF2. It is embedded because the review environment opens the
HTML from a `file://` URI in headless Chromium, where relative font files are CORS-blocked and
remote fonts are forbidden by this repository; a `data:` URI is the only reliably offline path.
As a Modified Version under OFL clause 3 it is not published under the Reserved Font Name: the
CSS family is `JZSansSC`. The full licence text is reproduced at the end of this file.

未使用任何未授权的图片、商标、人物肖像、论文图像或第三方素材库内容。
No unlicensed images, trademarks, portraits, paper figures, or third-party stock assets are used.

## 第三方开放贡献的署名 / Attribution for third-party open contributions

本方案的「AI-off 等价服务基准」概念参考了仓库上游 Issue #2549 公开的
**服务等价基准 SEB v0.5.0**，该贡献由其作者以 **CC BY-SA 4.0** 授予任何方案采用。
本方案对该概念的实例化（`simulation.json` 中的 `baselines.ai_off_equivalent` 与相关正文段落）
按 CC BY-SA 4.0 的相同方式共享条款提供，并在此标注来源与许可。

The "AI-off equivalent service baseline" concept draws on the **Service Equivalence Baseline
v0.5.0** published in upstream Issue #2549, granted by its author under **CC BY-SA 4.0** for any
proposal to adopt. This proposal's instantiation of that concept (`baselines.ai_off_equivalent`
in `simulation.json` and the related prose) is offered under the same ShareAlike terms, with the
source and licence attributed here.

## 数据边界 / Data boundary

本方案只使用官方公开资料与仓库内已登记的机器可读资料。
未使用、未声称使用任何非公开规划图件、内部控制指标、企业未公开经营数据或个人隐私数据。
临时几何的精度限制已在正文、`assumptions.json`、`sources.json` 与自检结果中一致标注。

Only public official materials and repository-registered machine-readable materials are used.
No non-public planning drawings, internal control indicators, non-public corporate operating
data, or personal data are used or claimed.

## 责任边界 / Boundary of responsibility

本方案全部空间落地、活动运营、品牌传播与政策机制内容，均为**概念建议、参考方案，
可供专业团队深化研究**，不替代法定规划，不构成政府审定结论、实施承诺或投资安排。
作者对事实、引用、版权与最终表达负责。

All spatial, event, branding, and policy content is a **conceptual suggestion, a reference
scheme, material for professional teams to develop further**. It does not replace statutory
planning and is not a government decision, an implementation commitment, or an investment
arrangement. The author is responsible for facts, citations, copyright, and final expression.

## 许可 / Licence

`COMMUNITY-DISPLAY-ONLY` —— 允许本仓库及其公开展示页展示本方案；其他用途请联系作者。

---

## 内嵌字体许可全文 / Full licence text for the embedded font

以下为 `report/*.html` 与 `visual/*.html` 内嵌的 Noto Sans SC 子集所适用的许可全文，
随本包提供以满足 SIL Open Font License 1.1 的随附要求。

```text
Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```
