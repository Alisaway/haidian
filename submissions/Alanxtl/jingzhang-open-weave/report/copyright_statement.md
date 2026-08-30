# 版权、来源与生成说明

本方案的正文、Logo 方向、图示布局和场景卡为 Codex·Open Weave Agent 在本地生成的概念性设计内容。五张核心图、四张空间效果图、HTML 页面和 A3/A0 PDF 均由投稿包自身的 GeoJSON、metrics.json、矩阵和自检状态派生。四张空间效果图由 AI 生成并经本地编辑，用于明确表达 AI 慢行导航、模型测试与审计、共学工作台、有人值守终端等概念载体；它们不是现状照片、官方效果图或最终建筑定稿，不复制第三方图片、地图瓦片、企业 Logo、人物肖像或论文图像。

空间几何只使用仓库维护者提供的临时粗略边界和本包自生成的设计图层，并在 `sources.json` 与 `assumptions.json` 中声明 provisional 限制。全球案例只用官方公开页面作为背景机制参考，不把案例指标转译为海淀事实。

图形使用本机系统字体进行栅格化；为保证离线 HTML 在没有中文系统字体的评审环境中仍可读，四个 HTML 页面均内嵌了 `OpenWeaveSans` 的 WOFF2 Unicode 子集（Noto Sans SC），不依赖外部字体文件。该字体由 Noto Project Authors 按 SIL Open Font License 1.1 发布，来源与权利边界记录在本声明中。PDF 为图片化展示稿，HTML 不依赖 CDN、远程字体、外部脚本、地图瓦片、iframe、API 或追踪代码。若进入后续深化，所有品牌、字体、公共艺术和活动物料仍需独立完成版权、商标、文保、无障碍和安全审查。

所有空间、运营、政策和活动内容均为概念建议、参考方案或可供专业团队深化研究，不构成官方规划、批准红线、投资承诺、政府活动安排或工程结论。

## COMMUNITY-DISPLAY-ONLY 授权范围 / License scope

投稿 front matter 的 `license: COMMUNITY-DISPLAY-ONLY` 表示：本包可以作为本次征集、社区评审、专业评审和非商业作品展示的完整投稿包被查看、下载和引用；它不自动授予商业使用、施工实施、招商宣传、商标注册、独立素材销售或将方案包装成政府/机构背书的权利。具体范围如下，不能证明权利来源的第三方素材不得复用。

The submission front matter declares `license: COMMUNITY-DISPLAY-ONLY`. This permits the complete package to be viewed, downloaded, cited and shown for this call, community review, professional review and non-commercial work display. It does not grant commercial use, construction, investment marketing, trademark registration, standalone asset sale or government/institutional endorsement. Third-party material without a proven right boundary must not be reused.

| 资产 / Asset | 评审展示 / Review display | 专业深化 / Professional refinement | 编辑复用 / Editorial reuse | 二次发布 / Secondary publication | 署名 / Attribution |
| --- | --- | --- | --- | --- | --- |
| 正文、原创结构图、场景卡、原创 SVG / proposal text, original diagrams, scenario cards and original SVG | 允许 / allowed | 可作为非商业工作底稿，不等于实施授权 / non-commercial working reference only, not implementation permission | 须保留上下文、版本和限制语 / keep context, version and limitations | 需书面许可 / written permission required | `Alanxtl / Codex·Open Weave Agent` |
| 四张 AI 生成并本地编辑的空间效果图 / four AI-generated and locally edited perspective renders | 允许随投稿包展示 / allowed with package | 仅可作为概念参考，不得当作现状或定稿 / concept reference only, not existing or final design | 不得单独裁切为商业宣传 / no standalone commercial crop | 需书面许可并保留 AI/概念说明 / written permission plus AI/concept note | `Alanxtl / Codex·Open Weave Agent`; AI-generated/local edit note |
| 投稿包 GeoJSON、metrics、矩阵和复算文件 / package GeoJSON, metrics, matrices and recalculation files | 允许审查 / allowed for review | 可用于复算、校核和专业接续，不代表清权数据 / allowed for checking and handoff, not cleared official data | 需说明 provisional/conceptual 状态 / state provisional/conceptual status | 需书面许可 / written permission required | package path + `Alanxtl` |
| OpenWeaveSans WOFF2 子集 / OpenWeaveSans WOFF2 subset | 随 HTML 离线展示 / embedded for offline HTML | 按 Noto Sans SC 的 SIL OFL 1.1 单独遵守 / follow Noto Sans SC SIL OFL 1.1 separately | 保留许可证和版权说明 / retain license notice | 按字体许可证和书面许可分别判断 / assess separately | Noto Project Authors + SIL OFL 1.1 |
| 公开来源、标准和案例机制 / public sources, standards and case mechanisms | 按来源页面展示 / show under source pages | 仅在原许可和用途边界内使用 / use within original license and scope | 不得把背景机制写成海淀事实 / do not turn background mechanisms into Haidian facts | 逐项查原来源 / check each original source | 原来源 + `sources.json` |

版权、商标、文保、无障碍和安全审查仍是后续专业条件；本表是投稿包的权利边界声明，不是现实世界许可证明。

## AI pilot—项目包首轮交接交叉表 / First-round AI pilot handoff crosswalk

本表是概念性专业交接底稿，不是现场授权、采购文件、工程图或运营任命。`scenario_id` 沿用 `proposal.md` 的场景卡编号；凡写“待确认”的资料，在正式条件到位前不得转为公众运行。

This is a conceptual professional handoff worksheet, not a site authorization, procurement document, engineering drawing or appointment. `scenario_id` follows the scenario-card numbering in `proposal.en.md`; anything marked pending must not become public operation before formal conditions are confirmed.

| 空间节点 / Spatial node | `scenario_id` / 场景 | 项目包 / Package | RACI（拟定 / proposed） | 最小数据 / Minimum data | 人工基线 / Manual baseline | 停止条件 / Stop trigger | 归档证据 / Archive evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 众智园标准治理客厅 / Zhongzhiyuan standards commons | `SC-02` 安全治理沙盒 / safety sandbox | JZ-02 | R 标准治理 / A 测试运营 / C 隐私安全 / I 公众 | 公开规则、问题卡、授权边界、版本号；不收个人识别字段 / public rules, problem card, consent boundary, version; no identifying fields | 人工规则审查 + 纸面流程 / human rule review + paper flow | 未授权字段、无法解释偏差或审计缺口 / unauthorized field, unexplained bias or audit gap | 规则卡、版本 diff、人工结论、撤回记录 / rule card, version diff, human conclusion, withdrawal record |
| 遗址慢行主轴 / Heritage slow-mobility spine | `SC-04` AI 慢行导航 / AI walking guide | JZ-01 | R 交通 / A 城市设计 / C 无障碍、社区 / I 公众 | 路线版本、公开障碍信息、无障碍与老年需求；不得隐藏跟踪 / route version, public barrier information, accessibility and older-adult needs; no hidden tracking | 纸面地图 + 电话/人工问询 / paper map + phone/human inquiry | 误导、障碍遗漏、投诉未接管或人工接管失败 / misdirection, missed barrier, unresolved complaint or failed handover | 走查表、路线版本、问题单、投诉与回滚记录 / walk audits, route version, issue log, complaint and rollback record |
| 大钟寺数据会客厅 / Dazhongsi data commons lounge | `SC-08` 数据要素会客厅 / data commons lounge | JZ-05 | R 数据治理 / A 运营 / C 隐私、版权 / I 公众 | 字段白名单、授权摘要、删除责任；个人字段为 0 / field allowlist, authorization summary, deletion owner; personal fields = 0 | 人工授权清单 + 脱敏展示 / manual authorization list + redacted display | 来源断裂、越权访问或无法删除 / broken provenance, overreach or failed deletion | 字段白名单、授权摘要、脱敏检查、删除证明 / allowlist, authorization summary, redaction check, deletion proof |
| 全带公共路线 / Civic route across the belt | `SC-10` 全球 AI 活动周 / global AI week | JZ-08 | R 活动运营 / A 公共安全 / C 无障碍、版权、区域接口 / I 访客 | 场地授权、容量、无障碍、安全、版权清单 / venue authorization, capacity, accessibility, safety and copyright checklist | 人工路线踏勘 + 值守/应急演练 / manual route walk + duty/emergency drill | 清单缺项、容量/安全未知或授权不足 / missing item, unknown capacity/safety or insufficient authorization | 单场清单、值守表、演练记录、公众反馈、年度复盘 / event checklist, duty log, drill record, public feedback, annual retrospective |
| AI 原点人工服务节点 / AI Origin staffed service node | `PUBLIC-ACCESS-01` 人工问询与退出 / staffed inquiry and opt-out | JZ-03 + JZ-05 | R 社区联络 / A 服务运营 / C 无障碍、消防 / I 居民 | 服务时段、纸面路线、电话、投诉入口、值守替代人 / service hours, paper route, phone, complaint route, substitute staff | 人工柜台 + 纸面/电话路径 / staffed desk + paper/phone path | 无值守、无替代路径、投诉无法接收或无法退出 / no staff, no alternative, inaccessible complaint or opt-out | 排班表、纸面表单、投诉/退出记录、人工接管复盘 / roster, paper forms, complaint/opt-out record, handover retrospective |
| 大钟寺贡献墙 / Dazhongsi contribution wall | `OPEN-CONTRIB-01` 公开贡献记录 / open contribution record | JZ-06 | R 知识治理 / A 文化叙事 / C 版权、文保、贡献者 / I 公众 | 公开贡献内容、署名授权、匿名选项、撤回状态、来源 / public contribution, attribution consent, anonymous option, withdrawal state, provenance | 人工来源复核 + 匿名版本记录 / human provenance review + anonymous version record | 授权不清、来源不明或无法撤回 / unclear consent, missing provenance or impossible withdrawal | 授权记录、版本日志、匿名化结果、撤回证明 / consent record, version log, anonymization result, withdrawal proof |

## 中英实质等值人工核对清单 / Bilingual substantive-equivalence checklist

核对日期 / Review date: 2026-08-25。范围 / Scope: `proposal.md`, `proposal.en.md`, paired HTML, paired core figures, `metrics.json`, A3/A0 labels. 方法 / Method: section-by-section and figure-slot comparison; this records authoring QA, not legal, planning or accessibility certification.

| 核对项 / Check | 中文位置 / Chinese evidence | English position / English evidence | 结果 / Result |
| --- | --- | --- | --- |
| 项目名称与叙事 / project name and narrative | 开源织城、百年京张 AI Civic Loop | Open Weave, Centennial Jingzhang AI Civic Loop | PASS |
| 三层范围与三处重点区 / three scope levels and three key areas | 三层范围章节、重点区域章节 | Three-Level Scope Framework, Detailed Design of Key Areas | PASS |
| 指标与限制 / metrics and limitations | 三项核心指标；FAR/height 待正式数据 | same metric keys and values; FAR/height pending official data | PASS |
| 十张场景卡 / ten scenario cards | 01—10 场景表 | 01—10 scenario table | PASS |
| 四个优先 pilot / four priority pilots | 02、04、08、10 验收表 | 02, 04, 08, 10 acceptance table | PASS |
| 五层 AI 架构与接口字段 / five-layer architecture and fields | 五层架构、`scenario_id` 等字段 | same layers and field meanings | PASS |
| 八个项目包与区域接口 / packages and regional interfaces | JZ-01—JZ-08、五类区域接口 | JZ-01—JZ-08 and five regional interfaces | PASS |
| 人工边界、停止条件与 provisional 警示 / human boundary, stops and provisional warnings | 纸面、电话、人工、投诉、退出、回滚 | paper, phone, staffed desk, complaint, opt-out and rollback | PASS |
| 图件、图位、版权与授权 / figure slots, rights and license | 中英配对图、`COMMUNITY-DISPLAY-ONLY` 矩阵 | paired figures and same rights matrix | PASS |
| 现场试点启动条件 / field-pilot start conditions | 无障碍、老年、社区、交通、安全、文保、隐私、运维联合走查表 | accessibility, older-adult, community, mobility, safety, heritage, privacy and operations walk-through table | PASS |

未发现影响含义的中英文主张、指标、限制条件、证据引用或图位差异。正式边界、现场阈值、合作授权和实际无障碍仍须由主管部门、专业团队与真实用户复核。

No meaning-changing difference was found in claims, metrics, limitations, evidence references or figure slots. Formal geometry, field thresholds, partner authorization and real-world accessibility still require review by authorities, professional teams and real users.
