# 版权与许可声明

方案：京张共证廊 / Jingzhang Commons Gallery  
投稿：`submissions/beibei-csfan/jingzhang-commons-rail/`  
日期：2026-08-30

## 1. 原创内容

本包中由投稿者及具名 Agent（Cursor Grok Commons Gallery Agent / Grok 4.6）生成的方案正文、矩阵、自绘分析图、概念几何（`geometry_role=design_proposal`）版权归投稿者。

许可意向：本次开源征集展示与评审使用 **COMMUNITY-DISPLAY-ONLY**。本声明不构成对 open-city-ai/haidian 仓库整体许可证的断言。

## 2. 概念属性

全部空间、运营、品牌与政策内容均为概念建议、参考方案或可供专业团队深化研究的材料，不是法定规划、批准文件、投资承诺或已建成记录。

生成或绘制的效果图为解释层，不是现场照片、测绘成果或居民意见证据。

## 3. 第三方资料

| 资产 | 来源 | 许可 | 是否再分发 | 限制 |
|------|------|------|------------|------|
| 临时场地与三重点区 polygon | 仓库 `brief/site-package/geometry/provisional_boundaries.geojson` | 仓库展示 | 否，仅引用 | 不得当作 official 红线 |
| 资格预审公告 | 北京市规划和自然资源委员会海淀分局 | 官方公开 | 否 | 只引任务与约面积 |
| 用地分类代码 | 自然资发〔2023〕234号子集（场地包枚举） | 官方公开 | 否 | 设计模型，非已批图则 |
| 专业标准本地快照 | `brief/site-package/standards/references/` | 官方公开摘录 | 否 | 以 source_url 为准 |
| OSM 背景核对 | OpenStreetMap contributors | ODbL 1.0 | 否 | 仅背景，不作红线 |

未列入上表的第三方素材不得进入本包。本包未嵌入第三方 Logo、未复制他人投稿正文或独特坐标。

## 4. 生成媒体

| 文件 | 工具/模型 | 参考素材 | 合成 | 权利备注 |
|------|-----------|----------|------|----------|
| assets/figures/site-overview.png 及 .en.png | draw skill / Venus 图像池 | 无他人方案图 | 是 | 概念总图 |
| assets/figures/land-use-structure.png 及 .en.png | 同上 | 无 | 是 | 概念结构图 |
| assets/figures/key-areas.png 及 .en.png | 同上 | 无 | 是 | 概念分区图 |
| assets/figures/mobility-bluegreen.png 及 .en.png | 同上 | 无 | 是 | 概念交通蓝绿图 |
| assets/figures/ecosystem-map.png 及 .en.png | 同上 | 无 | 是 | agent.2 生态图谱（概念） |
| assets/figures/component-library.png 及 .en.png | 同上 | 无 | 是 | agent.4 组件库（概念） |
| assets/figures/culture-signage.png 及 .en.png | 同上 | 无 | 是 | agent.5 导视层级（概念） |
| assets/figures/operations-calendar.png 及 .en.png | 同上 | 无 | 是 | agent.6 运营节奏（概念） |
| assets/figures/jingjinji-interfaces.png 及 .en.png | 同上 | 无 | 是 | 京津冀条件接口（概念） |
| assets/figures/ai-architecture.png 及 .en.png | 同上 | 无 | 是 | 概念 AI 技术架构（未部署） |
| assets/figures/inclusion-space.png 及 .en.png | 同上 | 无 | 是 | 包容性空间落点（概念） |
| assets/figures/rights-ledger.png 及 .en.png | 同上 | 无 | 是 | 权利台账可见图（概念） |
| assets/figures/international-campaign.png 及 .en.png | 同上 | 无 | 是 | 国际传播战役卡（概念） |

无肖像、无未授权商标、无私人室内、无爬取的平台原图。

## 5. AI 使用声明

- Agent 名称：Cursor Grok Commons Gallery Agent
- GitHub：beibei-csfan
- 模型家族：grok
- 具体型号：Cursor Grok 4.6
- 几何复算：Python + shapely + pyproj，EPSG:4548
- 图件：`/root/.cursor/skills/draw`（draw_batch）

生成范围：概念与叙事由模型起草，几何由脚本按临时边界剖分并复算，图件由提示词生成。人类裁定场地判断、临时性披露与合规边界。

未使用非公开规划、未上传个人隐私、未将输出表述为政府批准、未写入密钥。

## 6. 字体与工具链

- HTML 离线中文：文泉驿微米黑（WenQuanYi Micro Hei / Droid Sans Fallback）字符子集以 `data:font/woff2` 内嵌于 `report/proposal.html`、`visual/index.html` 及其英译页，Apache License 2.0。不依赖 CDN，不依赖评审机系统字体，不单独存放 `.woff2` 文件。
- PDF：PyMuPDF 按 A3/A0 点阵嵌入图件；正文 HTML 由官方 `render_proposal_html.py` 生成后注入 `@font-face`。
- 图件：`/root/.cursor/skills/draw`（draw_batch / draw.py），制图日期 2026-08-30。
- 构建：Python 3、官方 `finalize_submission.py` / `refresh_submission_manifest.py` / `self_check_submission.py`
- 不把密钥写入仓库

## 7. 联系

权利问题请通过 GitHub Issue 联系 `beibei-csfan`，或按主办方要求发送至 contact@open-city.ai（仅不适合公开的事项）。
