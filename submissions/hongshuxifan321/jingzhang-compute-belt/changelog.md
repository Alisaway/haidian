# 方案迭代记录

## v1.4-fixes-r7 - 2026-08-25（六轮评审 89/100 — 6 项必改 + 13 项详细修复全部落地）

六轮评审（91→89：新扣分点=英文图件溢出/对比度、生硬翻译、画像缺参与式验证）；6 项「必须完成的下一步」已逐项落地：

- **① 英文核心图溢出与截切（根因修复）**：英文标题不再预设字号与条宽硬排版——`title_bar` 改为按渲染宽度自动缩字号（96% 阈值，双语通用防复发）；图例卡从「固定 3 列」改为 `legend_card` 按 renderer 实测标签宽度自适应分列 + 超宽自动降字号（9→8.5→8→7.5），实测 en 总览图例行宽 0.822/0.657 < 0.925 上限，6 张图全检不再溢出；「Provisional boundary (non-official)」缩为「(unofficial)」
- **② 底部临时边界字样与 PDF 首屏小字**：图底来源条 #98A2B5→#6B7893、8.5→9.5pt；边界标签 8→8.5pt 加深；metrics-evidence 底部来源行 7→9pt、经济推导警示 8→9pt（缩略态仍可读）；A3 note 10.5→12、副标题 11→12.5、指标表 11→12；A0 note 12→14、副标题 16→17.5、指标表 10→11.5（zh/en PDFs）
- **③ 英文表达修正**：「Scenario living」→「Scenario-led living」「Open-source accel.」→「Open-source acceleration」「Honor wall·Gallery」→「Honor wall & Gallery」；中文图件对应词保持不变
- **④ 双语等价性核对表（新增）**：`report/bilingual-equivalence-checklist.md` —— 13 项人工核对清单（关键主张/指标及单位/来源层级/低置信度警告/场景编号/审批限定/图位/术语）+ 图件与 PDF 配对说明，manifest 登记
- **⑤ 来源分层显式区分**：proposal「设计依据」新增三分层说明段（approved_formal / self_collected_review 待核 / provisional_only），强调自采来源不构成法定控制、既定合作或官方背书（zh/en）；图件 footer 改为「几何与任务书（approved）· 海淀 2025 统计公报与 OSM（自采待核）」（zh/en）
- **⑥ 实施台账深化 + 数据保护矩阵**：新增 M1—M7 七阶段里程碑表（现状调查→合规准备(DPIA+参与式验证门禁)→建设自检→受控试验/基线观测(卡1/4 6 个月、卡2 3 个月、卡3 首月)→基线校准→开放扩展→年度演进；参与式验证与 DPIA 为 M2/M3 门禁、不得后补）；新增卡 1—7、卡 10 数据保护矩阵（数据类别/用途/最小化/90 天拟议留存与删除/访问控制/DPIA 待确认）（zh/en）
- **⑦ 参与式验证门禁**：五类画像标注「待验证初稿（待验证状态）」；新增参与式验证节——试点前强制门禁 + 人群与方法（长者/残障/照护者/师生/居民/一线服务人员，巡回调研/焦点小组/无障碍走查）+ 可核验结果回填机制 + 明确声明「不虚构验证结果或居民意见，画像与满意度类指标为拟议值」（zh/en）
- **⑧ 关键区索引卡密度**：fig3 场景列表 9.5→10.5pt、卡标题 11.5→12.5、副标题位次上移（六轮「信息密度偏低」剩余项）
- 说明：六轮评审未再出现 r5 的 compliance_matrix 错位问题（r6 已修）；「参与式验证」为唯一需要在实施现场完成的项目，本方案以门禁+机制+「待验证初稿」诚实标注响应，不虚构结果

## v1.4-fixes-r6 - 2026-08-24（五轮评审 91/100 — 错位修正 + 参数口径 + 来源分级标识）

五轮 91.0/100（回到最高分）；4 条必改已全部落地：

- **① compliance_matrix 1.5.2.2-1.5.2.5 evidence 错位修正**：四条 evidence_summary 与标题整条串位（2.2「城市更新」写了交通、2.3「交通市政」写了蓝绿、2.4「活力带」写了市政、2.5「风貌」写了更新分期）——根因=build_matrices.py EV 常量当年手工排序错位——已改常量并逐条对应（更新框架/交通市政/遗址公园活力带/城市风貌）
- **② 实施台账参数口径**：CAPEX/OPEX 量级列标注「待专业测算」、90 天留存标注「（拟）」，表尾明确「粗略估、假设状态待确认、DPIA 落定适用条件与法定依据」（zh/en）
- **③ 来源分级统一标识**：sources.json 全部 27 条新增 `registry_tier`：approved_formal（5：site package/公告/任务书/中央表）/ provisional_only（3：临时边界类）/ self_collected_review（19：公报、OSM、案例、区域、历史类）——与 source_registry_summary 分级口径一致
- **④ 剖面/节点概念原型图**（呼应五轮「表达完整度/原创性」剩余扣分）：新增第 6 图 local-prototypes（zh/en）——三重点区三层界面原型（受控评测层—公共界面—观察连廊；数字界面—人性化柜台—社工值守；开放市场—无障碍阶梯—疏散通道），非施工图声明；A3 加第 4 页、visual 页加图块、方案正文「重点区局部空间原型」节（zh/en）
- **⑤ A0/A3 文字可读性**（五轮「缩小后文字偏细」）：A3 副标题 9.5→11、note 9→10.5、表格 10→11；A0 副标题 14→16、note 10→12、表格 9→10

## v1.4-fixes-r5 - 2026-08-24（四轮评审 89/100 非阻断 P1-P3 落地）

四轮评审明确标注「非阻断、优先级 1-5」；P1-P3 已落地，P4（等正式几何）为等待项、P5（空间原型/剖面图）说明为后续深化方向：

- **P1 来源等级一致性**：国办发〔2020〕45 号在中央 source_registry 为 `usable_for_formal=background_only`，与本包 standard_matrix 原 `mandatory=true` 矛盾——已改为 `mandatory=false` 并注明「背景政策参照、非法定控制条件」，正文「符合…要求」改「符合无障碍法要求；参照 45 号文作为背景政策」（zh/en）
- **P2 指标口径入字段**：metrics.json 两经济指标新增 `display_label`（zh/en 完整口径与禁止用途）；proposal 数据节段尾补一句「两个派生指标为背景指标…详见 display_label」（zh/en）
- **P3 实施台账**：运营包节新增「实施台账」表（卡 1-4 × 前置调查/许可类型/概念角色/CAPEX-OPEX 量级/周期/保险/退出恢复与数据删除），量级标注为同类项目粗估、非报价非预算（zh/en）

## v1.4-fixes-r4 - 2026-08-24（三轮评审 89/100 — 最后 2 条可执行项落地）

三轮评审（91→89，扣分点为评审机器自我限定项而非内容缺口）：可实施性已确认「RACI、KPI 观测窗口、采样与第三方审计规则、成本类别以及退出恢复机制」；余下可执行项已落地：

- **metrics-evidence 缩略态警示**：经济推导面板警示字号 5.8→7、颜色 #B45309→#B00020（缩略阅读可见）、与 x 轴标签间距消除（bars 区上移 + 警示移至面板底部）；zh 2 行 / en 3 行文本均不出面板
- **关键区索引卡密度**：三卡场景列表各补一行基线/审计句（S1 6 个月/S2 3 个月验收、卡 4 六个月观测月报、开放日半年度+年度复盘），对应「运营包」KPI 基线规则
- 其余三条（正式边界后替换几何、场景启动前确认 RACI/保险、后续版本等价）为等待性质，回复与后续版本声明

## v1.4-fixes-r2 - 2026-08-24（付费 AI 评审 88/100 request-changes → 8 项必改全部落地）

付费评审（exact head 788266805）四门本地 Gate 全 PASS；建议 request-changes 的 8 项「必须完成的下一步」已逐项响应：

- **中文 HTML 缺字（□）**：评审渲染环境无 CJK 字体。修复：包内新增 `assets/fonts/` Noto Sans CJK SC 子集字体（SIL OFL 1.1，400/700，按方案文本子集化约 900KB），`report/proposal.html` 与 `visual/index.html` 均以 `@font-face` 内嵌引用 + 字体栈补「Noto Sans SC」回退；子集已对全部 HTML 字符 950/950 覆盖验证
- **8 个 CASE-* 案例来源补全**：sources.json 逐项补 title/publisher/url/published_at/reuse_boundary（官方页 URL 均已重新核实）；「Cambridge The Foundry」事实修正——实为马萨诸塞州剑桥市（MA）市属社区艺术与 STEAM 中心（免费社区界面+滑动费率免卡预约），非创新区，zh/en 案例表同步订正
- **开篇区级口径**：proposal.md/en.md 开篇「走廊两侧集聚北京 60%…17.9%」改为「这条走廊所在的海淀区集聚…（均全区级统计口径，2025 公报，非走廊沿线实测）」；数据节结语「走廊两侧已是 AI 要素最密集城区」→「海淀区已是北京 AI 要素最密集城区」
- **两个经济推导指标**：tech_contract_strength_index 与 lab_density_per_research_area 增补「地理范围不匹配」与「禁止用途」披露（分子=全区口径、分母=临时概念范围，二者不构成对应；仅作探索性背景指标，不得用于场地绩效/实施/投资判断）
- **分区口径统一**：design_depth_matrix「九个无缝拼合分区」与 compliance_matrix「用地 9 分区」→「十四个/14 分区」（生成脚本常量未同步所致，已改 build_matrices 常量防复发）
- **图面**：key-areas 底部说明改图底全局单条（原三卡内 6pt 文字互相挤压重叠）；A3 竖图改竖盒布局（消除左右留白与页中空白带）+ 单图页全宽横盒；A0 右列 2×2 分格匹配图幅比例；表字号与警示说明字号统一放大
- **中英实质等价**：本轮全部改动 zh/en 成对同步；结构对齐复核 42/42 标题、157/157 表格行

## v1.4-fixes - 2026-08-24（评审后全面审查修复）

全面审查（引用闭环 + 双语等值 + 原生视觉图纸复核）后集中修复：

- **用地结构修正（核心）**：`build_geometry` 西侧分割多边形与临时边界实际范围（116.34°E 起）无交集，致 6 个分区（含 4 个 0802 科研用地）静默落空、全场约 49% 落入「16 留白」。修复后 land_use 为 14 个无缝拼合分区（覆盖差 0.0），三区边界直接取自 key_areas 临时框（与 `key_areas.geojson` 共享边界坐标）；编码按《国土空间调查、规划、用途管制用地用海分类指南》（2023）：0802 科研（众智园/研发配套/原点社区）、05 产业商业（中关村翼/西翼/大钟寺）、0701 居住、1401 公园绿地；「教育科研 0802」混码修正（教育=0803，高校共址圈按主导用途计入科研 0802）；中关村科技服务翼用途改 05（商务金融语义）；文本「九个/九区」→「十四个」、图例与图题改为由 geojson 动态计数（防再次漂移）；全边段 densify（~55m）消除投影弦差 sliver（修复前 4 处 1.6-3.3㎡ overlap 被上游 `LAND_USE_OVERLAP`(major) 拦截，现 0）
- **constraints.geojson**：保持空壳占位（上游 layer 枚举无 CONSTRAINT 码；空 FeatureCollection 为合法形态）
- **双语与语义修复**：`visual/index.en.html` 改用 .en.png 图 + figcaption 中文尾缀去除（v1.2-3 只修了 PDF）；land-use-structure.en.png 图内分区标签英文化（v1.2-3 复查漏网的图内中文标签）；en 术语统一（Zhongzhi Garden→Zhongzhiyuan、XiaoYue wing→XiaoYue River wing、Industry/Commerce→Industry-commerce）；卡 4/7 与「服务极」承载关系一句话澄清（服务极=值守组织，实体柜台位于中关村翼/小月河翼）
- **data 锚点**：proposal「#SITE-001」→「#PROV-SITE-001」（与 geojson 实际 id 对齐）
- **版本标识统一**：front matter iteration 与 visual 页统一为 v1.4（zh 原 v1 / en 原 v0.1 / visual 原 v0.1 三处不一致）
- **图面用字**：site-overview「产业集聚」→「产业聚集」（与术语表统一）；mobility 图例补「京包线(老京张线)」蓝虚线项
- **版面与文案**：a3-booklet 核心指标表仅第一页绘制（原三页重复）；visual 页「来源/自检状态」标签重复前缀去除；缺口登记表述改指上游 brief missing-data checklist
- **验证**：几何覆盖差 0.0；指标复算值不变（site/green/public/buildings/roads 全部一致）；四门 self-check 通过（spatial 仅 3 条临时边界声明 minor）；preflight PASS；图纸 en 无中文残留（原生视觉复核）

## v1.3 - 2026-08-14

竞品深读（8 方案，含算力/验证/治理三组）后针对性补齐三项，单一增量 PR，不动结构、数据与图纸。

- **三期实施补「依赖条件」**：每期列出「依赖什么条件、何时可启动」（一期依赖遗址公园建成段衔接与社区协商，服务类不涉控规审批可先行；二期依赖场地权属确认与试点准入规则发布；三期依赖轨道交通专项数据、运营主体与报批），可实施性从「分期叙述」升级为「可核验陈述」
- **新增「年度可演进循环」**：「可演进」落成年度动作——春季统计公报发布后更新数据底数（统计公报/官方边界/控规条件到位情况）→ 秋季算带开放日发布「上年度验证结果 + 下一年度路线更新」→ 场景卡成熟度升降级与指标复算；与停用阈值—试点闸门联动，任何一年可基于公开证据核对承诺兑现
- **新增「AI 治理可见性」小节**：公共任务队列公示（众智园值守厅公示屏）+ 人工中止通道（值班员一键中止 + 公众申诉入口，中止留痕）+ 失败运行档案（开源成果展示廊公开展示被中止任务与下线原因，脱敏）——治理从后台规则变为可看见、可旁听、可中止的公共空间，与场景卡值守表共用责任主体与记录体系
- **双语同步**：proposal.en.md 同步三处；report/proposal.html + proposal.en.html 重渲染
- **校验**：self-check 四门 PASS → preflight PASS → 上游 validate_submission（模拟 CI）PASS

## v1.2-4 - 2026-08-12

合并入库后小修三项（仓库全区域巡查发现，打包单 PR）。

- **用字统一**：proposal.md「大钟寺 AI 产业集聚区」→「大钟寺 AI 产业聚集区」（与术语表/compliance_matrix 统一，术语表明确「聚集区」统一译为 Industry Cluster；英文 Dazhongsi AI Industry Cluster 此前已一致）
- **新增 risk.json**（role=other + role_detail=risk_matrix，可选项）：8 风险维度全量（数据隐私/实施复杂度/公众接受度/运维成本/政策不确定性/空间争议/技术成熟度/公平与包容性），内容转自正文「风险、版权与合规说明」章节；政策不确定性与实施复杂度评 4 分并带 human_review 路径，与「控规条件缺失、指标保持 unknown」口径一致
- **新增 spatial.json**（role=other + role_detail=spatial_nodes，可选项）：6 个概念空间对象（三区两翼节点 3 + 主廊道/文化廊道 2 + 两翼协同区域 1），geometry 全部 mode=concept 仅文字标注，不含任何坐标、红线或审定指标；linked_scenarios 挂接仓库场景注册表（robot-delivery-low-speed / ai-traffic-walkability / ai-cultural-guide）
- **manifest.json**：45 → 47 文件（新增 risk/spatial 两个可选项）
- **校验**：schema 校验通过 → self-check 四门 PASS → preflight PASS

## v1.2-3 - 2026-08-12

图纸双语修复（评审「表达完整度」点名扣分点：英文图含中文，v1 遗留）。

- **build_pdfs.py 修复**：A3/A0 英文版 PDF 此前硬编码嵌入中文图（`site-overview.png` 等无 `.en` 后缀，仅外层标题切语言）→ 新增 `fig_for()` 按语言选 `.en.png`；`__main__` 补跑 `build_a0("en")`（此前漏调，`a0-boards.en.pdf` 实为旧版产物）
- **验证**：mcp-vision（qwen-vl-max）复查 4 页英文 PDF——图内标题/图例/地图标注全英文，无中文残留
- **校验**：self-check 四门 PASS → preflight PASS

## v1.2-2 - 2026-08-12

审查遗留补齐（assumptions 证据链挂接）。

- **5 条 assumption 挂接矩阵链路**：A-BUILDING-004/A-BUILDINGS-001（概念建筑体量）→ compliance 1.4.2 + depth retain_renovate_demolish/height_massing_character + standard MOHURD-ARCH-DESIGN-DEPTH-2016；A-DATA-005（轨道/市政待确认）→ compliance 1.5.2.3 + depth traffic_rail_slow_parking/municipal_new_infrastructure/risk_missing_data + standard MOHURD-CONTROL-DETAILED-PLANNING；A-ECONOMIC-003（经济指标推导）→ compliance 1.5.1.1 + depth metrics_recalculation；A-ZHONGZHI-002（众智命名推断）→ compliance 1.5.3.1 + depth overall_spatial_structure
- **校验**：self-check 四门 PASS → preflight PASS

## v1.2-1 - 2026-08-12

全面审查修复（standard 引用闭环缺口）。

- **standard_matrix 补 3 条**：BARRIER-FREE-ENVIRONMENT-LAW（无障碍环境建设法）、ELDERLY-SMART-TECH-PLAN-2020-45（国办发〔2020〕45 号）、GENERATIVE-AI-INTERIM-MEASURES（生成式 AI 办法）——正文 [standard:] 引用的法规此前未登记矩阵（v1 遗留）
- **proposal 双语**：合规章节补「专业标准遵循」段（城市设计管理办法/控规办法/用地分类指南 3 标记）；用地节补建筑设计深度规定标记；参考资料 19-20 补无障碍法+适老方案
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-5 - 2026-08-12

文化叙事来源补强（评审「数据缺口」维度：1909 历史叙事缺可核查一级来源）。

- **sources.json 新增 3 个 JHZ-\* 来源**：北京市档案馆《京张路工撮影》（1909 年官方影像档案 178 张，一级档案）、人民网「历史上的今天」（1909-09-24 全线通车 / 10-02 南口典礼 / 201.2km / 最大坡度 33‰ / 693 万两造价）、中国新闻网《百年京张的历史跨越》（人字形折返线、竖井开凿法、青龙桥站）
- **proposal.md/en.md**：开篇补「1909-09-24 通车、10-02 南口典礼」史实并挂来源；命名体系段补「人字形折返线+竖井法攻克关沟段 33‰」史实内核；场景卡 8「一级来源待补登记」→ 已登记（sources.json JHZ-*）；参考资料 16-18
- **compliance_matrix**：agent.5 source_ids 补 3 个 JHZ-*
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-4 - 2026-08-12

品牌 VI 体系（评审「原创性」维度点名缺失：Logo 构图/比例/单色版/最小尺寸/字体/应用样例）。

- **新增 assets/branding/ 三图**（build_branding.py 生成，脚本 git exclude，图内中英双语标注；qwen-vl-max 目视审查通过）：
  - `logo-construction.png`：标志构图规范——6a×6a 标准网格（a=4mm，安全区 8a×8a）、人字展线与数据总线 1:1 分割、展线坡度 33‰（青龙桥史实，象征变形）、「值」字负形标注、主色 #22304E
  - `logo-mono.png`：单色正形/深底负形 + 最小尺寸标尺（web ≥32px ｜ 印刷 ≥8mm）
  - `brand-application.png`：应用样例拼版——名片/导视牌/开放日横幅/网页头图，含字级标注
- **字体方案**：中文思源黑体（Noto Sans SC，SIL OFL）+ 西文 Inter（OFL），三级字级（标题/正文/标注）
- **proposal.md/en.md**：命名体系小节补 VI 规范段 + 三图嵌入；compliance_matrix agent.1 evidence 更新；manifest 登记 3 个 visualization 文件
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-3 - 2026-08-12

visual 视觉对齐（图新视觉 #22304E 系）。

- **visual/index.html + index.en.html 色板对齐**（build_visual.py 生成，脚本 git exclude）：`--navy` #1B2A4A → #22304E（图 INK 墨蓝主文字）、`--green` #3FA66B → #3E8E63（图 GREEN_D）、`--coral` #E05B4B → #A93F35（图 CORAL）、阴影 rgba(27,42,74) → rgba(34,48,78)；`--amber` #E8A33D 与图一致未动
- **生成器可复现验证**：重跑 build_visual.py 后 diff 仅颜色 6 处/页，无内容漂移
- **校验**：self-check 四门 PASS → preflight PASS

## v1.1-2 - 2026-08-12

区域协同补强（评审「任务书相关性」维度缺口，任务书 agent.1「区域创新协同关系」）。

- **proposal 新增「区域协同：算带如何嵌入京畿创新网络」小节**（统筹研究范围章）：按「分工—流量—接口」三层论证与中关村AI北纬社区、未来科学城、怀柔科学城、经开区（亦庄）、京津冀的协同关系——分工表 5 行（公开定位 + 建议角色 + 与算带接口）、三类要素流（人才/算力/数据与场景）、四个合作机制接口（评测互认/测试协同/展示联动/数据沙盒）；全部协作机制标注为概念建议，不声称既定合作
- **sources.json 新增 6 个 REGION-\* 来源**：北纬社区（海淀区政府）、未来科学城（昌平区政府）、怀柔科学城（人民网）、亦庄（北京国际科技创新中心官网）、京津冀算力一张网（经济参考报）、北京算力规划（人民网）
- **compliance_matrix**：agent.1 与 1.4.1 的 evidence_summary_zh 与 source_ids 同步更新（新增 REGION-* 覆盖）
- **双语同步**：proposal.en.md 等值章节（Regional Synergy）+ 参考资料 10-15（zh/en 各 6 条）
- **校验**：self-check 四门 PASS → preflight PASS

## v1 - 2026-08-12

正式提交包（42 文件，11.8 MiB，formal-review-ready）。

- **方案定型**：京张算带 / Jing-Zhang Compute Belt（一脊五段两翼 + 知识溢出空间编排论证）
- **总审缺口修复**（2026-08-11）：sources.json 增补 11 个证据锚点；compliance_matrix 覆盖 23 项任务；design_depth_matrix 补齐 15 项；assumptions 增至 6 条；copyright_statement 具体化素材来源与边界声明
- **视觉体系升级**（2026-08-11/12）：10 张图全量重渲染——地图类图（总体概念/用地结构/交通蓝绿）改为低饱和城市设计色板 + 圆角卡片 + 隐藏科学坐标轴（比例尺/指北针替代）+ 徽章式标签；重点区域索引改为信息图卡片；指标图改为仪表盘面板（双轴、圆头柱）；双语图同步
- **媒体层**：新增 AI 生成封面概念图 `assets/media/cover.webp`（qwen-image-2.0-pro，解释层非证据，manifest.cover_image 启用）
- **证据披露补充**：assumptions.json 新增 A-BUILDINGS-001（11 栋概念建筑体量 disclosure）；copyright_statement 补充字体与渲染说明
- **图纸同步**：A3/A0 PDF 重渲染（嵌入新视觉图，配色与调色板对齐，版本号 v1）
- **校验**：self-check 四门 PASS（formal-review-ready）→ preflight PASS

## v0.1 - 2026-08-11

首轮成稿。

- scaffold 替换：proposal 正文（双语）、几何九层（GeoJSON，临时边界 provisional_rough）、指标复算（EPSG:4548）、矩阵（compliance/standards/design_depth）、五图首版、A3/A0 PDF、visual 离线页
- 数据：海淀 2025 统计公报 + OSM（ODbL）+ 任务书，来源登记于 sources.json
- 首轮 self-check 四门 PASS 后进入终审
