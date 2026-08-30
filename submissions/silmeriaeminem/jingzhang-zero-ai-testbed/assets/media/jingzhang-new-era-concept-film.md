# 视频文字稿与权利说明 — Jingzhang New Era Concept Film

## 视频元数据

- 文件名：`jingzhang-new-era-concept-film.mp4`
- 时长：29.49 秒
- 分辨率：1920×1080（输出帧率 30 fps）
- 编码：H.264 (libx264, crf 28, preset slow) / AAC 128 kbps
- 文件大小：11.6 MB（远低于 20 MiB 单文件上限）

## 内容描述

29 秒概念短片，以"京张新纪元·创想AI时轨"方案为表达对象。画面以紫蓝色调的京张铁路隧道与 AI 数据流为核心视觉：百年京张的隧道空间向前延伸，AI 数据粒子与代码字符如同光带穿越其间，象征从 1909 京张铁路到 AI 时代的时空穿越。视频最后定格于封面"京张新纪元·创想AI时轨"标题。

## 完整旁白文本

视频使用 13 组中英双语字幕（由方案参与者用剪映烧录于画面），完整内容如下。

### 中文（13 句）

> 百年京张的岁月脉络里，
> 一条钢铁轨线如同生长的脉络，
> 以全新布局铺展出这座城市，
> 奔涌向前的创新壮阔版图。
> 在真实铁轨铺展的工业脉络之上，
> 人与智能机器并肩共行于同轨。
> 旧老厂房挣脱岁月尘壳，
> 蝶变为AI创新场域，
> 让 人与机器深度交融共生，
> 共赴未来新境。
> 穿越1909的岁月征程，
> 锚定2026的前行航向，
> 奔赴2049的壮阔坦途。

### English (13 sentences)

> In the long history of Beijing-Zhangjiakou Railway,
> a steel rail line is like a growing vein,
> With a new layout, the city is depicted.
> the magnificent innovation map of this city.
> On the industrial context of the real railway tracks,
> People and intelligent machines walk side by side on the track.
> The old factory buildings break free from the dust of years
> transformed into AI innovation fields.
> It allows people and machines to deeply integrate.
> Go to the future together
> Through the journey of one thousand nine hundred and nine,
> anchoring the forward course of twenty twenty-six,
> and head towards the broad and smooth road of twenty forty-nine.

## 字幕时间轴

字幕以独立 `.vtt` 文件提供（`jingzhang-new-era-concept-film.vtt`，UTF-8，以 `WEBVTT` 头开始），共 13 个 cue，中英双语逐句对照，时间戳与视频帧对应；以下表格为辅助展示。

| 起 | 止 | 中文 | English |
|---|---|---|---|
| 00:00.000 | 00:02.300 | 百年京张的岁月脉络里 | In the long history of Beijing-Zhangjiakou Railway, |
| 00:02.300 | 00:04.500 | 一条钢铁轨线如同生长的脉络 | a steel rail line is like a growing vein, |
| 00:04.500 | 00:06.700 | 以全新布局铺展出这座城市 | With a new layout, the city is depicted. |
| 00:06.700 | 00:08.900 | 奔涌向前的创新壮阔版图 | the magnificent innovation map of this city. |
| 00:08.900 | 00:11.100 | 在真实铁轨铺展的工业脉络之上 | On the industrial context of the real railway tracks, |
| 00:11.100 | 00:13.300 | 人与智能机器并肩共行于同轨 | People and intelligent machines walk side by side on the track. |
| 00:13.300 | 00:15.500 | 旧老厂房挣脱岁月尘壳 | The old factory buildings break free from the dust of years |
| 00:15.500 | 00:17.700 | 蝶变为AI创新场域 | transformed into AI innovation fields. |
| 00:17.700 | 00:19.900 | 让 人与机器深度交融共生 | It allows people and machines to deeply integrate. |
| 00:19.900 | 00:22.100 | 共赴未来新境 | Go to the future together |
| 00:22.100 | 00:24.300 | 穿越1909的岁月征程 | Through the journey of one thousand nine hundred and nine, |
| 00:24.300 | 00:26.900 | 锚定2026的前行航向 | anchoring the forward course of twenty twenty-six, |
| 00:26.900 | 00:29.490 | 奔赴2049的壮阔坦途 | and head towards the broad and smooth road of twenty forty-nine. |

## 生成方法 / 来源 / 权利

- **画面来源**：视频画面由方案参与者使用 AI 视频生成工具创作；源文件为 `C:/Users/Administrator/Videos/8月26日(1)/8月26日(1).mp4`，原始时长 29.49 秒、1920×1080、50 fps、约 46.6 MB。
- **字幕烧录**：视频内的中英双语字幕由方案参与者使用剪映烧录于画面，本仓库不修改也不重新烧录字幕；字幕文本与本文件文字稿逐句一致。
- **后期压缩**：本仓库以 ffmpeg（version N-87130，2017 年构建）将源视频压缩至 1920×1080、30 fps、H.264（libx264, crf 28, preset slow）、AAC 128 kbps，输出 11.6 MB；仅做格式与码率调整，不改变画面内容、不改变字幕；启用 `-movflags +faststart` 便于边播边下。
- **封面海报**：海报由方案参与者独立生成（源文件 `8月26日(1)-封面.jpg`，1918×1080，2.0 MB），ffmpeg 缩放至 1600 宽、JPEG q=4（229 KB），作为视频 poster 与可选 `cover_image`。
- **独立字幕**：按官方 `multimodal-presentation` 规范提供独立的 UTF-8 `.vtt` 字幕文件（`jingzhang-new-era-concept-film.vtt`），以 `WEBVTT` 头开始，13 个 cue，中英双语逐句对照，时间戳与视频帧对应；该文件可作为播放器的可选字幕轨道和屏幕阅读器友好的辅助文本。
- **音频**：源视频音轨保留，未额外添加音乐或语音；播放器以 `preload="metadata"` 暴露元数据，不自动播放（移除或省略 `autoplay` 属性）。
- **合成状态**：本视频为概念示意短片（concept film），属于提案的表达层多媒体材料，不反映现场真实场景、不构成已实施项目的证据，也未经任何官方背书。
- **版权**：视频画面与封面由方案参与者创作并授权本仓库使用；字幕文本由方案参与者拟定（剪映编辑）并采用 CC BY 4.0（署名：刘德成 / silmeriaeminem）；方案名称"京张新纪元·创想AI时轨"为本方案独立命名，与第三方商标无关。

## 已知限制

- 视频时长仅 29.49 秒，用于概念表达，不替代完整的方案文本、图纸、GeoJSON 或报告 HTML。
- 字幕中提到的"AI 创新场域""人与机器深度交融""1909/2026/2049"等意象，对应本方案 `proposal.md` 与 `proposal.en.md` 中"时轨"框架的横向时间轴与三轨并行结构；具体实施层面仍表述为"概念建议""参考方案""可供专业团队深化研究"。
- 源视频为 50 fps，压缩后降至 30 fps；29 秒概念片内容未包含快速运动场景，该降帧不影响内容理解。
- 字幕与旁白为方案表达层材料，不构成对官方规划结论、土地权属或工程实施的判断。

## 无障碍清单

- [x] 双语 `.vtt` 字幕文件（中英逐句对照，UTF-8，WEBVTT 头）
- [x] 独立 Markdown 文字稿（本文件）
- [x] 视频 `<video>` 元素未设置 `autoplay`（仅 `preload="metadata"` 与可见控件）
- [x] 海报替代文本在播放失败/无音频场景下可用
- [x] 颜色对比与字体大小在字幕区已留有合理余量（最终页面渲染以 `report/proposal.html` 与 `visual/index.html` 为准）