# 资产权利、生成链与再分发台账 · 京张气脉 · 风水AI

> Asset rights, provenance, attribution, redistribution, and replacement ledger
> 台账日期：2026-08-26｜适用对象：`submissions/hechushitaoyuan/jingzhang-fengshui-ai-belt/` v2.0

## 0. 台账效力与状态口径

- 本台账逐路径说明本提交实际发布的图像、PDF、HTML、音频、视频、字体、空间数据，以及只在本地生成环境中使用而**未随投稿再分发**的脚本和依赖。文件身份以同一提交版本的 `manifest.json` SHA-256 为准；任一资产内容或哈希改变后，本台账和 manifest 必须一起复核、刷新并重新自检。
- `公开许可已核对` 表示已核对发布者的开放许可文本（如 OFL-1.1、ODbL-1.0、CC-BY-4.0），并核对当前用途。`参与者原创声明` 表示 `hechushitaoyuan` 对选择、编排、设计判断和本地生成结果承担提交责任，机器检查不能独立证明现实世界的著作权归属。`待人工/专业确认` 不得解释为已清权。
- 本台账记录的参与者授权范围限于本投稿在 PR、仓库方案页、评审、展览及本项目后续深化中的必要存储、复制和展示；本台账本身不扩大任何第三方许可。若本成果被认定为正式应征成果，公告第 8.1 条的共同知识产权、署名、项目内使用和展示规则优先适用；超出本项目的复用须另行取得应征人及相应主办/承办主体的确认。
- 本台账不是律师意见、商标注册检索、肖像授权书或权属证明。它把可核事实、参与者声明和未完成事项分开记录，不用“待查”冒充“已清权”。

## 1. 责任主体与 AI 生成披露

| 项目 | 记录 | 权利/限制状态 |
| --- | --- | --- |
| 提交责任主体 | GitHub 账号 `hechushitaoyuan`；本提交在该账号分支与 PR 下发布 | 参与者对提交、来源声明和后续异议处理负责 |
| 团队与署名 | 同济设计AI云：DeepSeek Harness + ox-alpha 以及子智能体 Codex（GPT-5.6-Sol）+ Claude Code（Claude Opus 5）[Tongji Design AI Cloud: DeepSeek Harness + ox-alpha, with subagent CLIs Codex (GPT-5.6-Sol) and Claude Code (Claude Opus 5)] | 见 `agent.json` 中的完整署名与工具链披露 |
| 早期生成链 | 初稿由 opencode (kimi-k3) 辅助完成，迭代由 zcode (GLM-5.3) 深化，v1.3~v1.5 由 DSH/ox-alpha 协调 | 人类参与者全程参与并审定设计判断、空间结构与合规红线 |
| 图像生成方式 | 最终 11 对中英 PNG 全部由本地 Python/Matplotlib 脚本从提交包 GeoJSON 确定性绘制；未使用扩散模型、第三方照片拼贴、商业截图或未授权效果图 | 本批 PNG 的可审计输入限于本地 GeoJSON 和 OSM 开放数据低对比背景 |
| 音频生成方式 | 中英双语音频导览由 Windows 内置语音合成引擎（System.Speech，Huihui/Zira 音色）从本地台本逐句离线生成后经 ffmpeg 转码为 mp3；配套 WebVTT 字幕 | 合成语音，非真人录音，零第三方音效，零商业配乐，不含可识别个人生物信息 |
| 视频生成方式 | 概念视频由 Matplotlib 逐帧从 GeoJSON 几何确定性渲染后经本地 ffmpeg 离线编码为 H.264 mp4；配套中英 WebVTT 字幕 | 零网络请求，零第三方视频片段，分镜脚本见 `assets/media/experience.md` |
| 人工权利确认 | 机器已完成文件、依赖、字体嵌入、远程资源和可见第三方素材检查 | 现实世界权属和公告条款由提交者作最终承诺 |

## 2. 图像资产（11 对中英 PNG）逐路径台账

### 2.1 共用生成链

- 绘图环境：Python 3.10+、Matplotlib 3.8+、Pillow 10.0+、Shapely 2.0+、pyproj 3.6+。所有 PNG 具有确定性可复现性。
- 结构化输入：提交包 `geometry/*.geojson`、`metrics.json`、`assumptions.json` 及矩阵；场地与三重点区来自仓库明确标注的 provisional geometry，其余用地、体量、中心线、绿地、公共空间和分期是参与者概念设计模型。
- 版权与第三方：图面主要内容为参与者原创概念设计；背景包含按 ODbL 1.0 署名的 OpenStreetMap 低对比地理语境（见第 6 节）。无第三方商业地图、航拍照片、论文图件或企业 Logo。

| 资产路径 (ZH / EN) | 生成输入与第三方成分 | 许可与署名 | 限制及替换触发 |
| --- | --- | --- | --- |
| `assets/figures/site-overview[.en].png` | 概念 GeoJSON + OSM 低对比语境 | 参与者原创声明；OSM 部分为 ODbL 1.0，图内保留 `© OpenStreetMap contributors` | 官方正式边界发布后重新渲染替换 |
| `assets/figures/land-use-structure[.en].png` | 概念用地划分、公共界面 + OSM 低对比语境 | 参与者原创声明；OSM 为 ODbL 1.0 | 控规正式方案发布后重新标定 |
| `assets/figures/key-areas[.en].png` | 三处 provisional 重点区设计与剖切线 + OSM 语境 | 参与者原创声明；OSM 为 ODbL 1.0 | 重点区官方红线与高程到位后整体替换 |
| `assets/figures/mobility-bluegreen[.en].png` | 气脉绿道中心线、蓝绿网络、停留点 + OSM 语境 | 参与者原创声明；OSM 为 ODbL 1.0 | 交通与园林专项批复后重绘 |
| `assets/figures/metrics-evidence[.en].png` | 从提交 GeoJSON 与 metrics.json 绘制 | 参与者原创声明；纯数据柱与结构图，不含 OSM 几何 | 指标复算或模型更新时重绘 |
| `assets/figures/phasing-renewal[.en].png` | 三期概念分期与六项行动包 | 参与者原创声明 | 实施时序与条件门调整时重绘 |
| `assets/figures/scenario-cards[.en].png` | 十三张 AI+ 场景卡全景及三张产业测试星标 | 参与者原创声明 | 场景卡清单演进时重绘 |
| `assets/figures/cultural-narrative[.en].png` | 三层时间（筋骨/气血/神魂）与空间语法 | 参与者原创声明 | 叙事框架调整时重绘 |
| `assets/figures/context-basemap[.en].png` | OSM 地理语境大图 | 编排原创 + OSM ODbL 1.0 | 仅作大区位背景，不作测绘成果 |
| `assets/figures/logo-identity[.en].png` | 方案标识系统与视觉规范 | 参与者原创声明 | 视觉规范演进时重绘 |

## 3. 图纸资产（4 份 PDF）逐路径台账

| 路径 | 页数 / 生成链 | 字体与第三方内容 | 再分发与限制 |
| --- | --- | --- | --- |
| `drawings/a3-booklet.pdf` | 8 页；ReportLab / Matplotlib 编译；中英图件、重点区细化、重点区分层详图、大钟寺街区概念板、场景卡表与指标排版 | 中文图件 PDF 本地渲染并嵌入 Noto Sans SC 子集；包含 OSM 静态语境，无外部商业图片 | 可随投稿分发/打印；保留 OSM 署名与 provisional 提示 |
| `drawings/a3-booklet.en.pdf` | 8 页；英文版 A3 册子，与中文册同源 | 英文图件 PDF 本地渲染并使用内置 DejaVu Sans | 可随投稿分发/打印；保留 OSM 署名与 provisional 提示 |
| `drawings/a0-boards.pdf` | 2 页；矢量排版输出；设计总图与系统展开 | 系统字体本地渲染；无外部照片 | 可随投稿分发/打印；provisional 警示保留 |
| `drawings/a0-boards.en.pdf` | 2 页；英文版 A0 展板 | 同上 | 同上 |

## 4. 多媒体资产（音频、视频、海报）逐路径台账

| 路径 | 规格 / 生成链 | 许可与来源 | 限制及使用边界 |
| --- | --- | --- | --- |
| `assets/media/audio-guide-zh.mp3` | 约 2.2 分钟；Windows 离线语音合成（Huihui 音色）转码 mp3 | 参与者原创文本 + 本地合成语音；无商业配乐 | 概念导览音频，非真人播音；可随包公开分发 |
| `assets/media/audio-guide-en.mp3` | 约 2.2 分钟；Windows 离线语音合成（Zira 音色）转码 mp3 | 同上 | 同上 |
| `assets/media/audio-guide-zh.vtt` / `en.vtt` | WebVTT 格式双语逐句时间轴字幕 | 参与者原创文本；CC-BY-4.0 | 无限制 |
| `assets/media/experience.mp4` | 24 秒；Matplotlib 逐帧渲染 + 本地 ffmpeg H.264 (yuv420p) 无声编码 | 参与者原创概念动画；无第三方视频 | 概念氛围视频，非工程三维渲染；可随包分发 |
| `assets/media/experience.vtt` / `en.vtt` | 体验视频双语字幕 | 参与者原创文本；CC-BY-4.0 | 无限制 |
| `assets/media/cover.png` | 方案封面图；Matplotlib 从提交几何渲染 | 参与者原创声明 | 可作项目展示封面 |
| `assets/media/experience-poster.png` | 体验海报；从体验视频关键帧抽取 | 参与者原创声明 | 可作视频占位海报 |

## 5. Web 交互与字体资产台账

| 路径 | 内容与许可 | 来源与证据 |
| --- | --- | --- |
| `visual/index.html` / `index.en.html` | 双语独立交互面板；纯原生 HTML/CSS/JS（零外部 CDN 依赖，完全离线可用） | 参与者原创编排；MIT 兼容 |
| `visual/assets/fonts.css` | Noto Sans SC 字符子集 WOFF2 内嵌（Base64） | Google Fonts / notofonts；开源许可 **SIL Open Font License 1.1 (OFL-1.1)**；文件头部完整保留版权声明与许可证文本 |
| `visual/assets/a11y-color-check.json` | 11 色色板在 4 类色觉下的 CIEDE2000 色差核验结果与 36 对例外清单 | 参与者量化核验结果；方法参考 Machado (2009) 与 Sharma (2005) |
| `visual/assets/governance/qi-protocol.json` | 气数协议 v0.1 规则集与 156 项离线确定性演练自检记录 | 参与者概念治理框架设计 |
| `visual/assets/governance/role-spec.json` | 八类运营岗位规格（全部 assignment_status=unassigned） | 参与者概念岗位设计 |
| `visual/assets/governance/evidence-readiness-register.json`、`measurement-registry.json`、`verify-governance.js` | 作者自研治理证据三件套：前两者分别登记 H0-H4 就绪口径与 M01-M06 测量口径且执行值留白；验证器为 Node.js 标准库程序，运行 `node visual/assets/governance/verify-governance.js <packageDir> --json` 可复算14项结构检查，用于拒绝虚构“已达成/已实测”状态 | 参与者原创声明；随包分发仅供包内治理证据复算，不构成任何授权、实测或运营承诺 |

## 6. OpenStreetMap 数据合规声明

- 本方案在背景图层与空间语境中使用了 OpenStreetMap 开放地理数据。
- 数据集标识：`SRC-OSM-CONTEXT-SNAPSHOT`（登记于 `sources.json`）。
- 数据版权：**© OpenStreetMap contributors**。
- 数据许可：**Open Database License 1.0 (ODbL 1.0)**（https://opendatacommons.org/licenses/odbl/1.0/）。
- 署名履行：所有包含 OSM 背景的 PNG 图件均在图面或图例中显式保留 `© OpenStreetMap contributors` 署名标识；本台账与 `sources.json` 完整记录获取时间窗与边界范围。
- 派生与隔离：提交包中的 9 层 GeoJSON 几何（用地、绿地、公共空间、道路、分期、重点区等）为参与者原创设计模型，非 OSM 数据的派生数据库；OSM 仅作为外部背景对照层（background_only）。

## 7. 字体许可合规说明

- **Web 界面**：使用开源字体 **Noto Sans SC**，遵循 **SIL Open Font License 1.1**。字体以字符子集方式嵌入 `visual/assets/fonts.css`，保留了完整的 OFL-1.1 版权声明。根据 OFL 第 1 条与第 5 条，字体子集的打包与随 Web 页面分发完全符合许可条款。
- **PDF 与静态图件**：中文图件 PDF 在本地渲染并嵌入 Noto Sans SC 子集；英文图件 PDF 在本地渲染并使用内置 DejaVu Sans。微软雅黑仅存在于 v1.0–v1.4 历史渲染链备注中：现行 v2.x 全部资产（PDF/图件/HTML/媒体）经 pdffonts 与资产清单核验，不含微软雅黑字形，该字体文件亦不随包分发、不再用于任何新资产渲染；其历史许可适用性仍标注为待专业法律确认。本提交未分发任何独立字体安装文件（.ttf/.ttc/.woff2 的可安装字体原件）。

## 8. 第三方资料与标准规范引用纪律

- 所有引用的国家标准（GB/T、CJJ、JGJ 等）、法律法规（《无障碍环境建设法》等）及政策文件均属于公开法律法规与国家标准文献，仅作为规划设计参考依据（background_only），不构成对标准文本本身的再分发。
- 历史文献（京张铁路史料、清华园车站旧址）均来自公开权威记载，仅支撑文化叙事，不作为法定测绘依据。
- 全部来源均已在 `sources.json` 中明确登记其 `source_type`（official_public / background_only / provisional_only / user_provided_cleared / repository_public_registry / repository_processed_reference / agent_inferred_from_public_data），并按来源等级执行使用纪律。
- 关键来源登记访问日期与版本指针；若未保留离线快照，则该限制如实标注。
- Key sources register their access date and version pointer; where no offline snapshot is retained, that limitation is stated explicitly.

## 9. 权利声明结论

1. 本提交包就其登记于本台账与 sources.json 的资产，声明可审计的权利来源与生成链条；未登记的第三方系统字体（本地渲染用途）按其 EULA 的 Print/Preview 正当使用口径处理，该解释待专业法律确认。
2. 未使用未授权商业素材与未清权网络图片；包内登记资产的生成方法均可按台账复核，生成脚本于作者环境留存（深化阶段按需提供），不随包分发。
3. 参与者 `hechushitaoyuan` 对全包原创内容的版权声明与合规性承担提交责任。
