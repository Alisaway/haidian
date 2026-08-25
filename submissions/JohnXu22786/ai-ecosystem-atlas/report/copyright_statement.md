# 版权声明与资产权利清单（Copyright Statement and Asset Rights Ledger）

## 一、总体声明
本包内全部正文、几何、图件、图纸、HTML 与可视化页面均由已声明的 AI 智能体（deepseek-v4-flash via DeepSeek Harness，dsh-x bridge）生成，或使用来源清权文件与公开资料（逐条登记于 sources.json）。本方案全部内容为概念建议、参考方案，不构成行政审批依据，不构成容积率、建筑高度、拆改留或工程可行性结论。visual/index.html 不加载任何远程资源。

## 二、品牌在先权利与使用边界
概念阶段未完成官方商标检索。「图谱京张 · ATLAS」「ATLAS·JZ」「图谱馆」「生态雷达站」「共创图谱廊」等名称与图形仅作为内部工作代号（internal working codenames），在权利清查完成前：不对外申请注册、不用于商业使用、不宣称任何既有权利；若与既有标识雷同属巧合，发现后立即调整。品牌相关资产（logo-jz.png 及图件中的品牌字样）随本包仅限评审与展示使用。

## 三、字体与软件依赖许可
- 字体：Noto Sans SC（Google，SIL Open Font License 1.1）——本包 HTML 中嵌入的字体子集由 fontTools 从本机可变字体（C:/Windows/Fonts/NotoSansSC-VF.ttf）实例化（wght=400）并子集化（pyftsubset，仅含页面实际使用字形）后 base64 内嵌；OFL 许可允许嵌入与再分发，许可声明随本文件保留。来源登记：ASSET-FONT-NOTO-SC。
- 图件与图纸生成软件：Python（PSF License）、matplotlib（PSF/BSD 兼容）、Pillow（HPND）、numpy（BSD）、fontTools（MIT/OFL 兼容）。以上均为开源许可，随成果使用不产生额外权利负担。
- 生成方式：全部图件、PDF、QC 数据由确定性脚本（matplotlib + PIL/numpy + fontTools）从本包 geometry 与正文生成；生成过程可复现。来源登记：ASSET-GENERATED-MEDIA。

## 四、案例与外部资料使用边界
8 条国际/国内对标案例（纬壹 one-north、巴塞罗那 22@、首尔 DMC、伦敦东区科技城、深圳湾科技生态园、杭州未来科技城、上海张江人工智能岛、广州琶洲试验区）均逐条登记于 sources.json（CASE-ONENORTH 等），含发布者、URL、发布/检索日期与复用边界；仅作机制对照与设计叙事参考，不作现状依据，不引用其投资与统计数字进入本方案结论。京张铁路历史、京张高铁开通、遗址公园、海淀分区规划、中关村示范区等史实条目（SRC-*）仅作叙事与背景引用。无法证明来源的材料已替换或删除。

## 五、资产清单（Asset Rights Ledger）
| 资产 | 来源/生成方式 | 许可/边界 | 登记 |
|---|---|---|---|
| 正文 proposal.md / proposal.en.md | AI 生成，原创 | COMMUNITY-DISPLAY-ONLY，概念建议 | package narrative |
| 几何 geometry/*.geojson | AI 生成设计（源自组织方 provisional 边界） | provisional_only，非红线 | PACKAGE-GEOMETRY |
| 图件 assets/figures/*.png（含 .en 与 logo-jz.png） | matplotlib 确定性脚本生成 | COMMUNITY-DISPLAY-ONLY；Logo 按内部工作代号处理 | ASSET-GENERATED-MEDIA / ASSET-LOGO-JZ |
| 图纸 drawings/*.pdf（含 .en） | matplotlib PdfPages 生成 | COMMUNITY-DISPLAY-ONLY | ASSET-GENERATED-MEDIA |
| HTML（report/*.html、visual/index*.html） | render_proposal_html.py 渲染后嵌入字体子集 | 离线自包含，无远程资源 | ASSET-GENERATED-MEDIA / ASSET-FONT-NOTO-SC |
| 字体子集（内嵌于 HTML） | Noto Sans SC 子集化 | SIL OFL 1.1 | ASSET-FONT-NOTO-SC |
| 对标案例信息 | 官方/第一方/明确署名媒体报道页 | 机制参考，非现状依据 | CASE-* 系列 |
| 官方公告/任务书/规范/史实页 | 组织方清权文件与公开政府页 | 按 sources.json 使用边界 | DATA-SRC-* / SRC-* 系列 |

## 六、合规声明
引用公开资料均标注发布者、链接与检索日期；案例引用注明来源并取得授权；图谱内容不作个体或企业排名定性；AI 生成内容遵守生成式人工智能服务管理相关要求，关键决策人工复核；数字平台遵循数据安全与个人信息保护要求；正式实施前须完成多部门联审、文物保护与安全评估。