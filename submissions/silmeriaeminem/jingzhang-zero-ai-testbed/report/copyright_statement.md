# 版权声明 / Copyright Statement

## 总体声明

本方案"京张新纪元·创想AI时轨 / Jingzhang New Era · Creative AI Time-Track"为开放共创的概念建议，所有可视化材料（图片、视频、交互页面）均为方案表达层材料，不构成官方规划背书、不替代专业规划、不构成已实施项目的证据。所有材料按 CC BY 4.0（署名：刘德成 / silmeriaeminem）开放；引用第三方资料的部分按原始许可保留署名。

## 文本与数据

- `proposal.md` / `proposal.en.md` / `report/narrative.md`：方案文本，由 AI 起草并经方案参与者审核，采用 CC BY 4.0。
- `metrics.json` / `sources.json` / `assumptions.json` / `self_check.json`：从公开资料清洗出的结构化数据，按 `sources.json` 中登记的来源 ID 与许可使用。
- `standard_matrix.json` / `compliance_matrix.json` / `design_depth_matrix.json`：合规与设计深度映射表。
- `geometry/*.geojson`：空间几何，按各 GeoJSON 内 `properties.provenance` 字段记录来源；官方规划边界缺失部分使用 `brief/site-package/geometry/provisional_boundaries.geojson` 并明确标注为 `provisional_constraint`。
- 5 张基础图纸（`assets/figures/site-overview.png` 等）：由方案参与者基于公开数据与示意渲染生成。

## 概念图与效果图

`assets/figures/*.jpg` 下的 22 张概念效果图（共轨试验线、众智园、原点社区、品牌标识、Masterplan、AI 时代人民美好生活系列 6 张等）均由 AI 图像生成工具创作（生成工具与提示词记录见本目录下的过程记录），属于概念示意，不反映现场真实场景、不构成已建成项目的证据；采用 CC BY 4.0（署名：刘德成 / silmeriaeminem）。

## 视频与海报

视频文件 `assets/media/jingzhang-new-era-concept-film.mp4`：

- 源文件：`C:/Users/Administrator/Videos/8月26日(1)/8月26日(1).mp4`（46.6 MB，1920×1080，50 fps，29.49 秒），由方案参与者使用 AI 视频生成工具创作。
- 字幕：视频内的中英双语字幕由方案参与者使用剪映烧录于画面，本仓库不修改也不重新烧录；字幕文本与 `assets/media/jingzhang-new-era-concept-film.vtt` 及 `assets/media/jingzhang-new-era-concept-film.md` 逐句一致。
- 后期处理：本仓库以 ffmpeg（N-87130，2017 年构建）压缩至 1920×1080、30 fps、H.264（libx264, crf 28, preset slow）、AAC 128 kbps，输出 11.6 MB；仅做格式与码率调整，不改变画面内容、不改变字幕。
- 公开权利：视频内容与字幕采用 CC BY 4.0（署名：刘德成 / silmeriaeminem）。
- 自动播放：本仓库内嵌入视频时使用 `preload="metadata"` 与可见控件，不设置 `autoplay`。

封面海报 `assets/media/jingzhang-new-era-poster.jpg`：

- 源文件：`8月26日(1)-封面.jpg`（2.0 MB，1918×1080），由方案参与者生成。
- 后期处理：ffmpeg 缩放至 1600 宽、JPEG q=4（229 KB）。
- 公开权利：CC BY 4.0（署名：刘德成 / silmeriaeminem）。
- 用途：视频 poster 与可选 `cover_image`。

## 渲染 HTML 与交互

- `report/proposal.html` / `report/proposal.en.html`：由 `scripts/render_proposal_html.py` 渲染的离线阅读版，仅引用本地资源，不加载远程脚本或样式。
- `visual/index.html` / `visual/index.en.html`：可视化仪表盘，离线确定性；仅引用本地资源；提供静态图片降级与无障碍控制。

## 第三方与公开资料

- 引用海淀官方公开材料按原始许可与署名要求使用，详见 `sources.json` 与对应 `proposal.md` 中的 `[source:...]` 标注。
- 公开资料仓库 `data/source_registry.json` 登记所有 `usable_for_formal="yes"` 的资料；其余资料仅作背景叙述或可视化讨论使用。

## AI 生成内容标识

所有概念图、效果图、视频画面与封面海报均由 AI 工具生成；本方案在文本与可视化材料中明确标注其为概念示意，不冒充现场照片或官方渲染；不替代专业规划与法定审批。

## 权利与限制

- 所有材料允许在保留署名的情况下被引用、修改、再传播。
- 方案中提到的"AI 全栈自主创新""三区两翼""时轨"等概念，对应 `proposal.md` / `proposal.en.md` 中的相应章节；具体实施层面仍表述为"概念建议""参考方案""可供专业团队深化研究"，不构成对官方规划结论、土地权属或工程实施的判断。
- 未经授权，请勿将本材料用于商业推广或冒充已获官方批准的项目。