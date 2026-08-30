# 资产权利与生成记录 / Asset Rights and Generation Ledger

记录日期：2026-08-30
确认主体：参赛者 `longkinght` / H&S
适用范围：百年京张 AI 创新带城市设计开源征集投稿、GitHub 展示、组织方公开展陈及相应的裁切、缩放和版式派生。

> 参赛者确认下列提示词由本人提供或授权，并授权生成结果用于本次征集。该确认不构成官方背书、商标可注册性意见、独占权保证或本征集以外的无限商业再许可。

## A01 — 64K×京张 Logo

- 最终文件：`assets/figures/logo-64k-jingzhang.png`
- 生成日期：2026-08-30
- 生成服务：OpenAI ImageGen（通过 Codex 内置图像生成服务调用）
- 具体模型标识：客户端未暴露；不虚构型号
- 输入：仅下列文本提示词；未使用参考图片、照片、第三方 Logo 或上传素材
- 人工处理：生成后仅做透明底转白底、白边整理、等比适配与 PNG 压缩；未改变铁路 / 电路 × 的构图
- 权利确认：参赛者确认提示词权限，并授权本次征集公开展示及必要派生排版
- SHA-256：`034bf97f2dc68a5d0dfb7fe47598475fcf83d93eda0edfdd566745205d1f96ff`

### 公开提示词（原文）

> 横版极简品牌 Logo，白色背景，扁平矢量印刷风格，图形带轻微丝网拓印 / 凸版印刷 / 油墨不均质感。以 "×" 为视觉核心的横版图形。× 左半部分由暖橙色铁路钢轨与枕木抽象构成，右半部分由青绿色 PCB 电路走线、焊点、电子节点抽象构成；两侧在中轴附近留有细微竖线空白，不真正相交，表现“平行共生”。整体线条统一、几何规整，清晰保持标准 × 轮廓。左侧大字 “64K”，粗体几何无衬线 / 等宽风格；右侧大字 “京张”，粗体现代黑体；深炭灰色无版权文字。下方居中小字 “百年京张 AI 创新带”，左右各一条细横线。整体风格为瑞士国际主义平面设计 + 20世纪工业印刷标识，简洁、克制、专业，适合作为方案主 logo、封面标题、路演演示首页。不要 3D，不要渐变，不要发光，不要复杂装饰，不要背景场景。

## A02 — 64K×京张 AI 概念主图

- 最终文件：`assets/figures/hero-64k-concept.png`
- 生成日期：2026-08-30
- 生成服务：OpenAI ImageGen（通过 Codex 内置图像生成服务调用）
- 具体模型标识：客户端未暴露；不虚构型号
- 输入：仅下列文本提示词；未使用参考图片、现场照片、第三方建筑图或人物肖像
- 人工处理：仅作 16:9 适配、等比裁切与 PNG 压缩；网页另叠加文字和 Logo
- 权利确认：参赛者授权本次征集公开展示及必要派生排版
- 性质限制：AI 概念意象；不是现场照片、现状记录、审批方案、测绘结果或建成承诺
- SHA-256：`febec64ef835174940cb80e99772b35cf04c24dae234e639dac987a1485c9cec`

### Public prompt (verbatim generation record)

> Use case: stylized-concept
> Asset type: wide landscape hero image for the 64K × Jingzhang urban-design proposal, offline HTML cover, A3/A0 cover, and GitHub gallery
> Primary request: Create an original conceptual architectural visualization of the Jingzhang railway heritage corridor transformed into a public AI innovation commons. Retain two parallel historic railway tracks as the central memory line. Add a continuous public green spine, low-rise adaptive-reuse brick industrial buildings, lightweight contemporary pavilions, shaded pedestrian paths, accessible ramps, small community gathering spaces, and visible ordinary human service points. Express two parallel public-service paths without literal signage: a warm orange human/offline path and a cyan-teal AI-advice path, running side by side and remaining independently usable. The scene should communicate public benefit, reversible intervention, heritage respect, everyday use, and a calm future-facing atmosphere.
> Scene/backdrop: dense Haidian urban neighborhood context at blue hour, with restrained residential silhouettes in the distance; this is a concept visualization, not a site photograph
> Subject: railway heritage park and public innovation commons, with diverse pedestrians including older adults, families, wheelchair users, young researchers, and service staff
> Style/medium: high-end architectural competition concept rendering with editorial realism; original image, no copied building identity
> Composition/framing: wide 16:9 aerial-oblique view along the railway axis; strong depth; clear central corridor; generous darker negative space in the lower-left for white cover typography; important buildings and people remain away from the edges
> Lighting/mood: calm blue hour, warm interior lighting, dignified and believable rather than cinematic spectacle
> Color palette: deep charcoal and blue-gray city, warm brick and human-service orange, restrained cyan-teal interface accents, natural green landscape
> Constraints: no text, no logo, no watermark, no identifiable real person, no official emblems, no claim of an existing or approved built condition; keep railway heritage legible; all interventions appear lightweight and reversible
> Avoid: futuristic megastructures, skyscraper fantasy, neon cyberpunk, excessive glow, autonomous vehicles dominating the scene, surveillance imagery, face-recognition cameras, giant screens, 3D logo, gradients as graphic overlays, copied reference architecture

## A03 — 离线中文字体

- 载体：以内嵌 WOFF2 data URL 写入 `visual/index*.html` 与 `report/proposal*.html`
- 字体：Noto Sans SC variable font 的投稿字符子集
- 上游：`https://github.com/notofonts/noto-cjk`
- 许可：SIL Open Font License 1.1
- 许可文件：`assets/media/OFL-NotoSansSC.md`
- 处理：使用 fontTools 4.62.1 / WOFF2 子集化；仅保留投稿中实际使用字符，未更名为官方完整字体
- 用途：`visual/index*.html` 与 `report/proposal*.html` 离线中文显示；无远程字体或本机字体依赖
- SHA-256：`4c2e5b595ef72e68f1203a9a93dfa1f8b74dd49658263369669da1c875016077`

## A04 — 数据派生图、封面与 A0/A3

- 文件范围：`assets/figures/*.png`（A01/A02除外）、`drawings/*.pdf`
- 作者与方法：H&S / Codex 原创排版；Node.js + Sharp + Playwright
- 输入：包内 GeoJSON、`metrics.json`、三张矩阵、方案文本、A01 Logo 与 A02 主图
- 外部素材：无未登记摄影、底图、插画、第三方网页截图或参考投稿图件
- 权利边界：解释性概念图与版式派生物；不是法定规划、测绘成果或现场绩效证据

## 可复核声明

`sources.json` 记录 A01—A04 的用途与限制；`report/copyright_statement.md` 给出整体许可边界。任何新增照片、字体、地图、品牌、模型输出或第三方图件必须在合入前新增独立台账行，不得沿用本记录概括授权。
