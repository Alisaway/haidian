# 版权声明 / Copyright Statement

## 方案版权

本方案《京张·智廊：从铁路走廊到智能走廊》（JingZhang AI Corridor: From Railway Corridor to AI Corridor）由 Claude Agent 基于百年京张 AI 创新带城市设计开源征集活动的公开资料独立生成。

## 开源许可

本方案作为 [open-city-ai/haidian](https://github.com/open-city-ai/haidian) 开源征集活动的参与作品，遵循该仓库规定的开源许可协议提交。

## 数据来源

- 空间边界数据使用仓库提供的临时粗略边界（provisional boundary），不等同于官方红线
- 交通数据来自公开渠道（北京地铁运营年报、高德交通、CJJ37-2012 等），已注明来源
- 全球案例数据来自公开资料研究

## 素材与工具权利清理

- **字体**：报告 HTML（report/proposal.html 及英文版、visual/index.html 及英文版）已内嵌 OFL 许可的 Noto Sans SC（SIL Open Font License 1.1，chinese-simplified 子集，Regular 400，版本 2.004，来源 @fontsource/noto-sans-sc 5.0.18）以保证离线渲染无中文方框，许可全文见文末「SIL Open Font License 1.1（字体许可全文）」章节；SVG 图件仍使用系统 CJK 字体栈。未引入商业字体，无字体授权风险。
- **生成图件**：全部图件由 AI Agent 基于仓库提供的临时边界与公开数据生成，未使用第三方受版权保护的图纸、渲染或照片素材。
- **第三方案例**：全球案例（硅谷、伦敦、特拉维夫、广州 APM、杭州城市大脑等）来自公开资料，仅作背景类比与经验借鉴，已在 sources.json 中逐条注明来源与"背景用途"边界，未复制第三方受版权保护的图文。
- **代码依赖**：分析脚本使用 Python 标准库及 matplotlib、cairosvg、Pillow 等开源许可（PSF/BSD/MIT 类）依赖，未引入专有或未授权代码。

## 免责声明

1. 本方案所有空间建议均为**概念建议**，不构成正式规划审定结论、政府承诺或投资承诺
2. 使用的临时边界数据基于公告推算，待正式 GIS/CAD 数据发布后需重新复算
3. 引用数据按 sources.json 来源分级登记（approved / needs_review / provisional），正式证据仅来自 approved 级来源，其余均标注为背景参考或假设；生成内容已说明生成方式
4. 本方案不替代专业规划机构的正式规划设计

## AI 生成声明

本方案的文本、空间分析、指标计算和可视化内容由 AI Agent（Claude）生成。所有 AI 生成内容已经过人工审阅，但可能存在基于模型推理的不确定性。方案中明确标注了数据置信度等级（high / medium / low / conceptual），供评审参考。

## SIL Open Font License 1.1（字体许可全文）

内嵌字体 Noto Sans SC（版本 2.004，Regular 400，chinese-simplified 子集）版权归 Adobe 及 Noto 项目所有（`(c) 2014-2021 Adobe, with Reserved Font Name 'Source'. Noto is a trademark of Google LLC.`），依据 SIL Open Font License 1.1 授权分发。许可全文如下：

---

SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE

The goals of the Open Font License (OFL) are to stimulate worldwide development of collaborative font projects, to support the font creation efforts of academic and linguistic communities, and to provide a free and open framework in which fonts may be shared and improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and redistributed freely as long as they are not sold by themselves. The fonts, including any derivative works, can be bundled, embedded, redistributed and/or sold with any software provided that any reserved names are not used by derivative works. The fonts and derivatives, however, cannot be released under any other type of license. The requirement for fonts to remain under this license does not apply to any document created using the fonts or their derivatives.

DEFINITIONS

"Font Software" refers to the set of files released by the Copyright Holder(s) under this license and clearly marked as such. This may include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the copyright statement(s).

"Original Version" refers to the collection of Font Software components as distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting, or substituting -- in part or in whole -- any of the components of the Original Version, by changing formats or by porting the Font Software to a new environment.

"Author" refers to any designer, engineer, programmer, technical writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS

Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled, redistributed and/or sold with any software, provided that each copy contains the above copyright notice and this license. These can be included either as stand-alone text files, human-readable headers or in the appropriate machine-readable metadata fields within text or binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written permission is granted by the corresponding Copyright Holder. This restriction only applies to the primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software shall not be used to promote, endorse or advertise any Modified Version, except to acknowledge the contribution(s) of the Copyright Holder(s) and the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this license, and must not be distributed under any other license. The requirement for fonts to remain under this license does not apply to any document created using the Font Software.

TERMINATION

This license becomes null and void if any of the above conditions are not met.

DISCLAIMER

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.

---

*Generated: 2026-08-14*
*Agent: Claude Agent*
*Proposal: jingzhang-origin-belt*
