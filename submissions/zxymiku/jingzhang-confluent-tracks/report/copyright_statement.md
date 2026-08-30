# 版权与生成声明 / Copyright and Generation Statement

本文件声明「合辙京张 CONFLUENT TRACKS」提交包中全部生成与第三方素材的来源、生成方法、权利边界与已知限制。

## 生成方法 / Generation Method

- **几何数据（geometry/*.geojson）**：由作者编写 Python 脚本（`dev/scripts/gen_geometry.py`，shapely + pyproj）从 `brief/site-package/geometry/provisional_boundaries.geojson` 派生生成，采用网格裁剪法生成当前可复核的用地分区；边界覆盖细部仍以官方红线复核为准。坐标 EPSG:4326，面积复算 EPSG:4548。
- **指标（metrics.json）**：由 `dev/scripts/gen_metrics.py` 从上述 GeoJSON 在 EPSG:4548 下复算，与 `scripts/spatial_review.py` 的复算口径一致（先投影后 union）。
- **必需图件（assets/figures/*.png，中英各 5 张）**：由 `dev/scripts/composite_figures.py`（matplotlib + PIL）从 GeoJSON 与 metrics 派生光栅化渲染。文本渲染采用开源 SIL OFL 1.1 许可的 `Noto Sans SC`（思源/Noto 黑体）字体，纯栅格像素输出，卡片与图例经自适应排版完全消除文字碰撞重叠。
- **自定义封面（assets/media/cover.webp 与 cover.png）**：由 PIL 纯几何与开源矢量字形合成，深青蓝底 + 黄铜金人字形道岔 + 人文橙/机器人青并进箭头 + 中英文标题。
- **报告 HTML（report/proposal.html 与 .en.html）**：由 `scripts/render_proposal_html.py` 从 proposal.md 渲染；两页均加载包内 `../visual/assets/cjk-font.css`，由 `@font-face` 使用 data URL 内嵌 Noto Sans SC WOFF2 子集，覆盖本提交四份 HTML 出现的全部 Unicode 字符，并以 Noto/Source Han/Arial/sans-serif 作为可靠回退；无 CDN、无外部 WebFont、无审查机预装字体依赖。
- **A3/A0 PDF（drawings/*.pdf，中英各 2 个）**：由 reportlab 生成，中文字形采用 Google Noto Sans SC（SIL OFL 1.1）TrueType 字体进行矢量子集化直接嵌入，确保客户端正确渲染中文字符；英文使用 `Helvetica`，所有指标严格回溯 geometry/metrics。
- **可视化页（visual/index.html 与 .en.html）**：手写静态 HTML + 离线 SVG，加载同目录 `assets/cjk-font.css` 中的内嵌 Noto Sans SC WOFF2 子集；字体覆盖标题、正文、导航、按钮、指标单位、状态区、图例、SVG 标签及替代文本。页面无 CDN、无 iframe、无外部 API。

## 工具链与字体许可 / Toolchain & Font Licensing

- Python 3.13 / shapely 2.1.2 / pyproj / matplotlib 3.11.1 / reportlab 5.0.0 / Pillow / jsonschema（requirements-review.txt）。
- **字体许可策略**：
  1. **Web 与 HTML 报告**：采用 Noto Sans SC 2.004（Google/Adobe，SIL OFL 1.1）。完整源 TTF 的 SHA-256 为 `a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`；构建时按四份 HTML 的实际 Unicode 字符集合生成 WOFF2 子集并以 data URL 写入 `visual/assets/cjk-font.css`（当前 CSS SHA-256 `daf03caa79d1a99d13c9a4acfd596377b63f1eaafbbf81bca6a324b50b2920f2`）。四页通过本地 `<link>` 引用同一字体资产，`@font-face` 设置 `font-display:block`，并对正文、表格、表单控件、导航、指标、图例、`svg text/tspan` 等统一覆盖；无需系统字体或网络。字体内容改变时必须重建子集并刷新本登记及 manifest；
  2. **PNG 分析图件**：由 Matplotlib 使用本地 SIL OFL 1.1 许可的 `Noto Sans SC` 字体渲染并直接光栅化为像素，不捆绑任何专有商业字体库；
  3. **PDF 文册与展板**：使用开源 SIL OFL 1.1 许可的 `Noto Sans SC` TrueType 字体进行内嵌子集化输出，支持离线展示；实际发布前仍需在目标环境抽查字体回退与嵌入效果。

## 第三方生成视觉主体 / Third-Party Visuals（可选增强层）

封面、朝圣地标渲染图与场景卡氛围图的视觉主体严格遵循开源征集要求：

- 提示词由本方案作者编写，无第三方版权素材输入。
- 图中人物均为无辨识度剪影，无真实人脸、无个人生物识别信息。
- 无真实商业商标、企业 logo、可辨识商业建筑牌匾或车牌。
- 所有地标与场景图均为概念设计渲染，不代表现状、不代表已批准或已建成。
- 中文文字标注层由本地脚本叠加，确保双语准确、与 metrics.json 数值一致。

## 权利边界 / Rights Boundary

- 本方案为开源征集的概念建议，遵循仓库 COMMUNITY-DISPLAY-ONLY 许可。
- 不使用未清权的字体文件、版权图片、商业商标、人物肖像、学术论文专有图件或涉密材料。
- 不冒充现状、居民意见、官方边界、法定审批或实测工程数据。
- provisional 临时几何保留精度警示与官方数据发布后的复算触发条件，不作为官方红线或精确面积依据。

## 已知限制 / Known Limitations

- 官方精确红线与三处重点区 polygon 未取得，全部空间结论为 provisional rough，数据置信度为 low。
- 控规指标保持 unknown/null，需待官方详细控制性规划发布后复核深化。
