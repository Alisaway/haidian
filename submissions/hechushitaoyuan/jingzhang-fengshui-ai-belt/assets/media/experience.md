# 「气脉生长」概念视频 · 文稿与权利说明 / Concept Video: Transcript and Rights

**文件**：`assets/media/experience.mp4`（1280×720，24 fps，24 秒，无声）
**字幕**：`experience.vtt`（中文）、`experience.en.vtt`（英文）
**海报帧**：`experience-poster.png`（取自视频收官帧，确定性导出）

## 生成方法 / Generation

本视频为**概念氛围表达（concept ambience），非空间依据**。画面由 matplotlib 逐帧确定性渲染：底图（用地淡彩、建筑灰块、道路细线、临时边界虚线）一次渲染自投稿包 `geometry/*.geojson`；金脊生长动画沿 `roads.geojson` 中真实绿脊中心线（401 点）按弧长推进；三处重点区取自 `key_areas.geojson` 质心；十三个场景节点沿脊线等弧长布点，三颗朱砂星标示产业测试验证场景（#4、#8、#13）；罗盘与人字形符号与品牌图件同源。视频编码使用本地 ffmpeg（H.264，yuv420p）。无网络请求、无第三方素材、无生成式图像模型参与。

The video is a **conceptual ambience piece, not spatial evidence**. Every frame is deterministically rendered by matplotlib: the static base (muted land-use tints, building greys, road hairlines, dashed provisional boundary) is rendered once from the package `geometry/*.geojson`; the gold spine grows along the real greenway centreline (401 points) by arc length; the three key areas use `key_areas.geojson` centroids; thirteen scenario nodes sit at equal arc length along the spine, with three cinnabar stars marking the industry test scenarios (#4, #8, #13); the compass and herringbone mark share the brand figure's construction. Encoded locally with ffmpeg (H.264, yuv420p). No network access, no third-party assets, no generative image models.

## 分镜与字幕逐句对照 / Shot list and captions

| 时段 | 画面 | 中文字幕 | English caption |
| --- | --- | --- | --- |
| 0–3 s | 标题淡入，宣纸底与用地淡彩静帧 | 京张气脉 · 风水AI —— 第二次堪舆 | Jing-Zhang Qi-Pulse · Fengshui AI — the Second Site-Reading |
| 3–9 s | 金脊自南向北生长 | 金脊生长：9.7 公里气脉绿道纵贯南北（临时几何口径） | The gold spine grows: 9.7 km greenway, north to south (provisional basis) |
| 9–13 s | 脊线完成，五带底色显现 | 三区五带沿脉展开：玄武 · 明堂 · 朱雀 | Three areas, five bands unfold along the pulse |
| 13–17 s | 三重点区圆环脉冲并标注 | 三处重点区次第点亮（provisional，待正式数据复核） | Three key areas light up in turn (provisional; recheck on official data) |
| 17–20.5 s | 十三场景节点依次点亮 | 十三张场景卡沿脉落位，其中产业测试验证场景 ×3 | Thirteen scenario cards land along the pulse — three industry testbeds |
| 20.5–24 s | 罗盘与人字形收尾 | 概念氛围表达 · 非空间依据 · 详见 proposal.md 与 visual/index.html | Conceptual ambience · not spatial evidence · see proposal.md and visual/index.html |

## 权利 / Rights

- 视频及海报帧按包级 `COMMUNITY-DISPLAY-ONLY` 许可提交本次征集展示与评审。
- HTML 交付物按 SIL OFL 1.1 内联分发 Noto Sans SC woff2 字符子集（base64 嵌入各 HTML 与 visual/assets/fonts.css），保证无 CJK 字体环境离线正确渲染；中文图件 PDF 由 matplotlib 本地渲染并嵌入 Noto Sans SC 子集，英文图件 PDF 使用内置 DejaVu Sans；不随包分发任何可安装字体原件。
- 详细生成链与工具链版本见 `report/copyright_statement.md` 与 `sources.json` 条目 `SRC-MEDIA-RENDER-V11`。
