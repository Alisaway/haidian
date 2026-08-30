# 著作权与生成说明 / Copyright and Generation Statement

- 正文、双语译文、空间图层、离线 HTML、图件、封面与 PDF 由 OpenAI Codex（GPT-5 系列）于 2026-08-12 至 2026-08-26 基于仓库公开或清权材料生成；V4 保留原方案核心与稳定几何，仅增量补齐实施、任务映射、条件项和权利证据。
- Figures, cover, raster PDFs, geometry, and offline HTML were generated locally from package data. V4 keeps the core design and stable geometry while adding implementation, task mapping, conditional follow-ups, and rights evidence.
- 图件不含商业地图瓦片、外部照片、人物肖像、企业商标或远程字体。Microsoft YaHei（`msyh.ttc` / `msyhbd.ttc`）与 Arial（`arial.ttf` / `arialbd.ttf`）只作为本机 Windows 系统字体栅格化；这些字体文件没有进入投稿包。A0/A3 是栅格页面 PDF，不嵌入字体程序。
- 四份 HTML 为保证受信任 Linux/Chromium 离线截图显示中文，内联嵌入 Noto Sans SC Regular/Bold 的 WOFF2 字符子集，CSS 族名为非保留名称 `TG CJK`。子集只含本包 HTML 实际字符，不请求远程字体；原字体/子集 SHA-256、覆盖结果和上游 commit 见 `visual/assets/webfont-coverage-evidence.json`。字体依据 SIL Open Font License 1.1 再分发，完整版权通知与许可证附于本文末尾。
- Generation/verification tools: Pillow 12.3.0 (HPND), Shapely 2.1.2 (BSD-3-Clause), pyproj 3.7.2 (MIT), fontTools 4.63.0, Brotli 1.2.0, imageio-ffmpeg 0.6.0 (BSD-2-Clause), and FFmpeg. They were used locally; no library or executable is redistributed. The only embedded Font Software is the documented Noto Sans SC OFL-1.1 subset.
- 六个外部案例仅以文字概括机制，链接、发布者与用途限制见 `sources.json`。概念表达不代表案例方或主办方背书。
- 投稿采用仓库要求的 `COMMUNITY-DISPLAY-ONLY` 声明；最终权利与使用边界以征集规则和仓库条款为准。
- V2 对同场已合并方案只进行公开评分维度、成果深度与验证方法的对标；未复制其文字、图片、概念名称、空间方案、几何、代码、数据、口号或版式。六门校译法由本稿原有“译场—三译院—六道公共门”母题独立深化。
- V2 的 `visual/assets/synthetic-proof-cases.json` 全部是为规则测试编写的匿名合成案例，不包含真实居民、真实工单、现场绩效、个人数据或运营授权。
- V3 的 72 平方米校译单元、城市校样回执、双轨括号识别系统、新增图件与演示视频均为本稿独立设计并在本地程序化生成；未复制其他投稿、政府文件、企业项目、照片、人物、地图瓦片或第三方视觉资产。
- V3 的 MP4 由 Pillow 与 imageio-ffmpeg 本地合成，采用无声、无自动播放的可控演示，并配有中英字幕轨和文本转录；包内不含外部音乐、配音或影像素材。
- `visual/assets/synthetic-inclusive-journeys.json` 中 12 条路径均为匿名合成测试，不代表真实参与、真实残障体验、现场服务水平或主管部门认可。
- V4 新增的评审导航、MVP 实施契约图、任务书响应图、任务索引与契约审计均为本方案数据和机制的程序化派生；没有复制其他投稿的文字、视觉构图、代码、数据或专有机制。
- 六个外部案例仅复用可核查事实和运营机制的转述；逐项 URL、访问日期、证据等级、用途、限制、复用范围与“不再分发第三方资产”声明见 `sources.json`。没有下载或嵌入案例页面的图片、地图、PDF 页面、Logo、字体或版式。
- 包内全部文本、图形、视频画面、字幕和转录均不含个人数据；没有真人图像、声音、问卷、工单或无障碍真人测试记录。所有参与旅程均明确为匿名合成。

## 资产权利闭环 / Asset Rights Closure

| 资产 | 来源与生成 | 权利/许可处理 | 再分发状态 |
| --- | --- | --- | --- |
| 正文与中英译文 | OpenAI Codex 基于本包证据独立编写 | `COMMUNITY-DISPLAY-ONLY` 投稿声明 | 仅随投稿展示 |
| GeoJSON / metrics / matrices | 仓库临时几何 + 本方案推导与复算 | 保留 provisional / public / cleared 边界 | 随包提供机器证据 |
| PNG / WebP / Logo / 回执 | Pillow 本地程序化绘制 | 原创图形；无第三方媒体 | 随包提供，不含字体文件 |
| A0 / A3 PDF | 上述原创栅格页面组合 | 无嵌入字体程序、外部图像或远程资源 | 随包提供 |
| MP4 / VTT / transcript | 原创逐帧画面，imageio-ffmpeg / FFmpeg 编码 | 无声、无人物、无外部音乐/影像；字幕与权利稿齐全 | 随包提供视频成品，不分发工具 |
| HTML | 本地静态 HTML/CSS + 内联 Noto Sans SC 字符子集 | OFL-1.1；无 CDN、远程请求、外部脚本、iframe、表单、API、追踪 | 随包离线提供，完整许可附后 |
| 六个外部案例 | 官方/机构页面 | 只作引用和机制转述 | 不再分发任何案例资产 |

## Noto Sans SC 字体版权与许可证 / Font Copyright and License

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
redistribute, and sell modified and unmodified copies of the Font Software,
subject to the following conditions:

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
Software shall not be used to promote, endorse or advertise any Modified
Version, except to acknowledge the contribution(s) of the Copyright
Holder(s) and the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to remain
under this license does not apply to any document created using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are not met.

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
