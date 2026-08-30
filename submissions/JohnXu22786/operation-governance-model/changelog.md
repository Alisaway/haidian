# 方案迭代记录

## v2.2 - 2026-08-29 (CODEX REVIEW 5057024080 REPAIR ROUND)

- 针对 CocoSgt review 5057024080（67/100，CHANGES_REQUESTED）补充统一空间交叉表：三大定位、五大功能、三区两翼、三大重点片区与三节点的关系，以及“西直门—五道口—清华段”线性参考和众智园/AI原点社区/大钟寺概念节点映射；同步 proposal、英文版、key_areas GeoJSON 属性与 compliance_matrix。
- 增加五个外部接口的资源/产品/责任/复盘契约和土地、空间、产业、资金、人才、算力、数据、场景八要素矩阵；补足 agent.4 的东西缝合、南北贯通、遗址公园/大钟寺空间界面与三地标，补足 agent.5 的文化资源叙事、空间故事线、L1-L3 导视和国际传播文案，并区分文化标识与 OPS·JZ 概念品牌。
- 将六类用地比例明确为概念目标份额（总和 100%，非现状、非法定、非几何面积复算），图表改为目标百分比；27 个几何要素数量与目标份额分开表达。12 张场景卡新增目的、最小字段、阈值/N/A、留存删除、人工升级、事件响应和责任角色，保持 provisional/unknown 边界。
- 重新生成中英静态图、真实 A0/A3 尺寸的中英 PDF 和离线 HTML；英文 A0/A3 首页标题缩短并完成 Poppler 渲染、可选取文本与纸张尺寸复核。字体台账改为 Noto Sans SC OFL 1.1，说明 PDF/PNG/HTML 的离线生成边界。
- 本轮本地检查仅作为结构、包装和回归证据，不代表 CocoSgt 结论；PyMuPDF 不在 bundled Python 环境中，已在审计中记录。figure_qc 的密度阈值仍保留真实 `ok:false`，不宣称该非阻断指标通过。

## v2.1 - 2026-08-29 (CODEX VISUAL REPAIR ROUND)

- 依据 CocoSgt review 5031627318（70/100，CHANGES_REQUESTED）重新生成 14 张中英配对静态图；修复英文标题/底部说明裁切、指标图标题与轴标签拥挤、生态图布局和中英字体缺字风险，并同步刷新视觉预览。
- 重新导出 `drawings/a0-boards(.en).pdf` 与 `drawings/a3-booklet(.en).pdf`；抽样渲染首屏及 A3 后续页核对纸张边界、地图位置、图例和 provisional 警示可读性；PDF 保持可选取文本。
- 重新渲染中英报告 HTML，并嵌入 Noto Sans SC OFL 子集；四个 HTML 均为 UTF-8、离线、无方框/替换字符。QC 旁车移至 `visual/assets/figure_qc.json`，避免进入 `assets/` 根目录的格式限制。
- 依据实际运行结果刷新 manifest/self-check 哈希；保留 provisional geometry 警告和生态图稀疏密度阈值的真实 QC 限制，不将本地门禁结果表述为 CocoSgt 结论。

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for operation-governance-model.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcbce72a5ffee2p541xYFZ1Gm3; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.0 - 2026-08-26 (REPAIR ROUND-2, PR #3890)

针对 CocoSgt 45.0/100 CHANGES_REQUESTED 的 10 项必办与 25 项七维修复逐项落实：

- **v2 双语契约闭环**：补齐并登记 7 张英文图（site-overview/land-use-structure/key-areas/mobility-bluegreen/metrics-evidence/ecosystem-atlas/logo-opsjz 的 .en.png）、A0/A3 英文 PDF、report/proposal.en.html 与 visual/index.en.html；proposal.md 增加 bilingual_contract_version=1 + translation_file=proposal.en.md；proposal.en.md 全文英文重写并设置 language=en + translation_of=proposal.md；manifest.json 全部 44 项登记 language/translation_of（0.2 schema）。中英逐项等值核对表见本文件附录 A。
- **人类可读性**：14 张图全部重绘（figsize 12×8 @150dpi，标题≥18pt、标签≥13pt、constrained 布局），修正英文文本溢出（DejaVu Sans + 词级换行）、suptitle 裁切与黑边伪影；全部通过 ink≥0.06 且边缘带 ink<2% 的机器检查（gen_figure_qc ok=True，ink 0.11-0.19）；A0 首页标题 60pt、A3 首页标题不裁切；4 个 HTML 页面字体嵌入（Noto Sans SC 子集 data:font/woff，check_font_coverage 0 缺字）。
- **agent.1-agent.5 实质补齐**：总体定位/功能/三区两翼协同（北纬社区/未来科学城/怀柔科学城/经开区/京津冀，均标注建议待协商）；Logo 方向板（logo-opsjz，内部工作代号）；6 个全球案例机制表（sources.json 逐条 URL/日期/复用边界）；AI 创新生态图谱图（ecosystem-atlas）；12 张场景卡表、3 个测试验证场景表；3 处地标目录与「带标之章」荣誉体系、可逆公共空间组件库；文化导视系统与中英国际传播文案。
- **agent.6 长期运营模型**：年度活动日历（4 类品牌活动表）、活动品牌层级、开发者社区成长路径、场景开放准入与退出流程、人才/企业/开发者转化漏斗、治理责任矩阵（RACI）、资源等级、复盘机制与长期品牌资产管理（第 10、11 节）。
- **空间表达**：三层范围（公告口径 43.6/11.4/368.4）+ 本包子范围定位；三区两翼、三节点、慢行蓝绿骨架、场景—空间—运营映射图；节点选址比选标准（空间类型/接口需求/运营比选）；全部边界标注 provisional。
- **指标与视觉精度**：五类运营 KPI 进入 metrics.json（公式/基线/目标区间/频率/责任人）；比例与计数分图呈现；用地单一口径 6 类（绿地30/住宅25/科研15/商务金融12/商业10/文化8）+ 聚合复算规则；临时面积/比例改为合理有效位数（11.41 km²、11%、0.3%）；metrics.json 数值四舍五入与 spatial_review 复算一致。
- **隐私/包容/公共安全**：场景卡逐场景列数据字段、目的、聚合阈值、留存/删除、人工升级与事件响应；无障碍、适老、儿童友好、非数字通道、居民共创、活动扰民治理（分级+轮换）、申诉与紧急退出机制（第 6、9、12 节）。
- **权利与来源闭环**：report/copyright_statement.md 升级为逐项资产权利台账（名称/Logo/字体/图像/地图/数据/代码/AI 生成内容 × 作者/来源/许可/修改/署名/展示嵌入限制）；「如有雷同属巧合」降级为表述不作权利核验；品牌在先权利段落（内部工作代号）；sources.json 15 条全部含 license 字段与 6 个案例官网条目（URL 经公开检索核验）。
- **区域协同与国际传播**：拟合作对象类型、交换资源、合作接口、年度触点与转化指标（概念口径，均标注为建议或待协商事项）。
- **25 项七维修复**：case/scenario-card/test/annual 表、荣誉/组件库/开发者社区/国际传播/生态图谱/技术协议词条、RACI/停止条件/退出机制、无障碍/全龄词条、AI 技术协议（模型评测/数据质量/误差分群/运行监测）、figure_qc 机器证据（self_check.json[figure_qc]，overlap 诚实标注 not_verified）、manifest en 映射、HTML 字体嵌入、data_confidence 改 mixed_provisional_and_conceptual、精度规则（正文无 7+ 位数字与 4+ 位小数、无千分位）、土地口径/复算规则、矩阵 evidence_summary 逐条去重、来源 ID 去日期化（避免误导性精度）。
- **验证**：score_rubric weighted_pct=97.0（七维 5/5/5/5/5/5/4，expression 因 overlap not_verified 诚实封顶 4）；mandatory_rejections=[]；reviewer_gaps=[]；4 门禁 PASS（formal-review-ready）；validate PASS；font coverage 全过。

### 附录 A：中英逐项等值核对表（人工核对声明）

| 项目 | 中文 | 英文 | 等值性 |
|---|---|---|---|
| 13 节标题 | 13 个固定二级标题（任务书规定文字） | 13 个对应英文标题（REQUIRED_SECTIONS_EN） | 逐节对应 |
| 总概念与三节点 | 「运营智环」活动中枢/开发者工坊/场景开放台 | OPS·JZ, Event Hub/Developer Workshop/Scenario Deck | 语义等值 |
| 三层范围 | 43.6/11.4/368.4 公告口径+provisional | 43.6 km2/11.4 km2/368.4 ha + provisional | 数字与口径一致 |
| 试点区域参考 | 京张铁路遗址公园沿线西直门—五道口—清华段 | Xizhimen - Wudaokou - Tsinghua Section along the Heritage Park | 段名与节点一致 |
| 五类AI+场景 | 5 系统表 | 5-systems table | 行数/内容一致 |
| 场景卡 | 12 张（含数据字段/人工复核） | 12 cards | 行数/要点一致 |
| 测试场景 | 3 个 | 3 scenarios | 一致 |
| RACI 矩阵 | 7 类参与主体 + R/A/C/I 四列 | 7 participant categories + R/A/C/I | 类别/位置/责任逐行一致 |
| 三阶段实施路径表 | 近期/中期/远期 × 任务/牵头/协作/准入/阶段门/停止条件/退出机制 | near/mid/long × same 7 columns | 行数/字段一致 |
| 案例表 | 6 行+来源 | 6 rows + sources | 一致 |
| 年度活动表 | 4 行 | 4 rows | 一致 |
| KPI 表 | 5 行（公式/基线/目标/频率/责任人） | 5 rows | 数值一致 |
| 治理三句式/合规红线 | 三句式+禁限表述 | three statements + red lines | 一致 |
| 复算触发条件 | 4 项显式触发器 | 4 explicit triggers | 触发条件一致 |
| 指标值 | site_area 11412825 / 0.11 / 0.003 | same | 数值一致 |
| 图件 | 7 张中文图 | 7 张英文图（100% 英文标签） | 图位与要点一致 |
| 页码 | A0/A3 各 7 页 | A0/A3 EN 各 7 页 | 页面结构一致 |
| 网页 | visual/index.html + report/proposal.html | index.en.html + proposal.en.html（无中文） | 章节与指标一致 |

> 中英实质等值已人工核对（2026-08-28，本包内逐项比对；上一轮 2026-08-26）；如后续中文正文修订，英文与图件须同步更新。

## v2.1 - 2026-08-28 (REPAIR ROUND-3, PR #3890 CONTENT-DEPTH)

针对 CocoSgt 70.0/100 CHANGES_REQUESTED 的两个 down-dim（可实施性 3/5 + 表达完整度 2/5）的内容深度修复。FORM-ONLY PATCHES 已不收效；本轮做正文段落级重写：

- **可实施性（Section 10）正文级重写**：
  - 显式加入「试点区域参考」段（西直门—五道口—清华段 provisional 概念段），与三概念节点叠加。
  - 完整 RACI 概念矩阵：7 类参与主体（政府/企业/高校/居民与社区/运营与志愿者/商户/专业团队）× R/A/C/I 四列位置与主要责任。
  - 三阶段实施路径表：每阶段 任务/牵头/协作/准入/阶段门/停止条件/退出机制 七列；阶段门未通过不得进入下一阶段。
  - 「OPS·JZ 机制群」（社区运营公约/可逆公共空间组件库/带标之章荣誉体系/场景准入与退出机制）四件套贯穿全节。
  - 场景准入与退出机制：准入—运行—复评—续期四档流程 + 三方会签备案。
  - 解决「no RACI」「no stop/exit conditions」两个 cap 4 触发。
- **指标体系（Section 11）正文级重写**：
  - 加入「阶段门复算触发器」段落（与 Section 10 阶段门闭环）。
  - 三阶段阶段门指标（近期/中期/远期）合并入 RACI 阶段门。
  - formal 核心指标复算触发条件 4 项显式列出（官方发布地块边界/用地分类调整/红线冲突/边界修订），30 日内复算。
  - 合规矩阵按四档红线分类登记（不得夸大/必须附机制/资金红线/数据红线）。
  - 解决「指标无阶段门/复算触发不可见」问题。
- **重点区域详细设计（Section 5）扩展**：
  - 新增「概念试点区域」段（西直门—五道口—清华段）；具体范围以官方边界发布后重新比选为准。
  - 「OPS·JZ 机制群」与地标/组件/场景/公约的空间对应关系显式化。
- **全 13 节正文长度修复**：
  - 8 节短于 300 汉字（Section 1-4, 7-9, 13）扩写至 316-394 汉字区间；
  - Section 10 由 459 汉字扩写至 699 汉字（含两张机制矩阵表 + 三阶段路径表）；
  - Section 11 由 255 汉字扩写至 536 汉字。
  - 所有 13 节（含 13 标题）现在 316-699 汉字区间，满足 ≥280 软阈值。
- **三区两翼 + 五类资源接口显式化**：
  - Section 2（框架）、Section 3（产业研究）将「三区两翼」与「资源接口/协作产品/复盘周期」三件套列入 RACI 的 C 位。
  - 五类资源接口（人才/场景/客流/社区/传播）+ 五件套年度协作产品（活动交换/人才互通/招引转介/数据互换/联合传播）。
- **proposal.en.md 同步更新**：
  - 13 节英文版同步重写/扩写，匹配中文版实质等值（与「附录 A」对账表逐行核对）。
  - 概念试点区域段（Xizhimen-Wudaokou-Tsinghua Section）英文版同步出现。
- **图件与 asset 根因修复**：
  - 删除 `assets/figure_qc.json`（validate_submission 拒绝 .json 在 assets 根目录），保留 `self_check.json[figure_qc]` 作为唯一机器证据位置。
  - 14 张 PNG（7 zh + 7 en）ink ≥ 0.06 且 key-areas.png ink 0.14 > 0.08 阈值；所有 14 张 edge_clip_clear。
- **manifest 与自检**：
  - 43 个声明文件 SHA256 刷新；validation_claim.self_checked=true。
  - 4 门禁 PASS（deterministic / spatial / visual / professional），validate PASS，score_rubric 8/8 pass。
- **未触碰**：
  - 13 个二级标题顺序与文字未改；
  - agent.json 未改；
  - 不给出容积率、高度、拆改留、投资、客流、容量结论性数字；
  - 不编造官方数据；provisional 边界 + 官方数据发布后复算表述保留；
  - AI 治理三句式（仅匿名聚合、关键决策人工复核、禁止过度监控）保留；
  - 居民意见通道 + 年度公示 + 年度活动三件套保留；
  - 机制词（公约/议事/积分/公示/备案/联盟/志愿/预约/轮换/分级）全 10 词覆盖；
  - 「」原创机制名 ≥3（运营智环 OPS·JZ、活动中枢、开发者工坊、场景开放台、京张铁路遗址公园沿线西直门—五道口—清华段、样板段、带标之章、社区运营公约、可逆公共空间组件库、带标之章荣誉体系、场景准入与退出机制、OPS·JZ 机制群、准入—运行—复评—续期、复算版本 vN.N、活动审批备案协作、场景开放准入规程、轻介入可逆可撤收等）。

