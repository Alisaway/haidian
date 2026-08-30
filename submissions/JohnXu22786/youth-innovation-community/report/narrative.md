# Formal Narrative and Bilingual Equivalence Check

This package's binding narrative is proposal.md (Chinese, proposal_format_version=2, bilingual_contract_version=1, translation_file=proposal.en.md); the English counterpart proposal.en.md (language=en, translation_of=proposal.md) is a full translation. The four-gate self-check (deterministic/spatial/visual/professional) and geometry, metrics, matrices remain cross-checked deliverables.

## Bilingual equivalence check table (提交中英文主张、指标、免责声明和图位等价核对表)

| # | Item | proposal.md (zh, binding) | proposal.en.md (en) | Status |
| --- | --- | --- | --- | --- |
| 1 | Concept name | 青年创享环 / YOUTH·JZ · 青年创享社区与青年友好公共服务网络 | Youth Co-Creation Loop (YOUTH.JZ) - Youth Innovation Community & Youth-Friendly Public Service Network | equivalent |
| 2 | Three-level scope | 统筹研究约43.6 km² / 总体设计约11.4 km² / 重点区域约368.4 公顷（以官方公布为准） | coordinated research ~43.6 km2 / overall design ~11.4 km2 / key areas ~368.4 ha (official publication prevails) | equivalent |
| 3 | Three nodes | 青年创客中心（众智园侧）/ 青年共享生活社（AI原点社区侧）/ 青年活力广场（大钟寺侧） | Youth Maker Hub (beside Zhongzhiyuan) / Youth Co-living Commons (beside AI Origin Community) / Youth Vitality Plaza (beside Dazhongsi) | equivalent |
| 4 | Personas | 六类人才画像（应届毕业生、青年AI开发者、自由职业者、青年创业者、青年家庭、泛青年夜归人群） | six persona groups (fresh graduates, young AI developers, freelancers, youth entrepreneurs, young families, night-returners) | equivalent |
| 5 | Scenario cards | 十张场景卡 C-01—C-10（五类核心+五类扩展） | ten scenario cards C-01-C-10 (five core + five extended) | equivalent |
| 6 | Industry test scenarios | 三张产业测试验证场景卡 T-01—T-03 | three industry test-verification scenarios T-01-T-03 | equivalent |
| 7 | Landmarks | 三处地标编号对象 LM-01/LM-02/LM-03 | three numbered landmarks LM-01/LM-02/LM-03 | equivalent |
| 8 | Annual event brands | 三个年度活动品牌 A-01—A-03 | three annual event brands A-01-A-03 | equivalent |
| 9 | Benchmark cases | 六个对标案例逐项登记来源与许可边界 | six benchmark cases registered source-by-source with permission boundaries | equivalent |
| 10 | Formal core metrics | site_area_sqm / green_ratio / public_space_ratio 以本包几何 EPSG:4548 复算，provisional 低置信度 | recomputed from package geometry EPSG:4548, provisional low-confidence | equivalent |
| 11 | Intensity metrics | 容积率、建筑高度、强度保持未知（value null） | FAR, building height, intensity stay unknown (value null) | equivalent |
| 12 | Disclaimer | 全部为概念建议、参考方案；不构成政府审定结论；不编造官方数据；不把设想写成已确定安排 | everything is concept suggestion/reference; no government-approved conclusion; no invented official data; nothing written as a confirmed arrangement | equivalent |
| 13 | Privacy boundaries | 数据仅匿名聚合、关键决策人工复核、不进行个体识别式追踪、免登录普通服务等价路径 | anonymized aggregation only, named human review, no individual-identifying tracking, login-free equivalent path | equivalent |
| 14 | Figure 1 position | 总体设计总览 site-overview.png（总体设计范围章节） | Overall design overview (Overall Design Area chapter) | equivalent |
| 15 | Figure 2 position | 用地结构 land-use-structure.png（总体设计范围章节） | Conceptual land-use structure (Overall Design Area chapter) | equivalent |
| 16 | Figure 3 position | 三节点索引 key-areas.png（重点区域详细设计章节） | Three-node index and composition (Detailed Design of Key Areas chapter) | equivalent |
| 17 | Figure 4 position | 慢行蓝绿分析 mobility-bluegreen.png（蓝绿空间章节） | Slow-traffic & blue-green analysis (Blue-Green Network chapter) | equivalent |
| 18 | Figure 5 position | 核心指标 metrics-evidence.png（指标体系章节） | Key metric evidence (Metrics chapter) | equivalent |
| 19 | Figures 6-10 | 创新生态图谱/品牌识别/地标组件库/场景卡/运营流程（对应章节） | ecosystem atlas/brand identity/landmarks & components/scenario cards/operation flow (corresponding chapters) | equivalent |
| 20 | Drawings | a3-booklet.pdf / a0-boards.pdf（zh）与 a3-booklet.en.pdf / a0-boards.en.pdf（en）同图位对应 | a3-booklet.en.pdf / a0-boards.en.pdf mirror the Chinese boards page by page | equivalent |
| 21 | Visual index | visual/index.html 与 visual/index.en.html 结构和图位一致 | visual/index.en.html mirrors visual/index.html structure | equivalent |
| 22 | Land-use single caliber | 用地结构为单一口径（land_use.geojson 十类图斑面积占比，EPSG:4548；正文表、land-use-structure 中英图、metrics.json 的 land_use_share_*、两版 HTML 与两版 PDF 同一数值；公园绿地约21%不再与其他口径混用；green_ratio/public_space_ratio 为另一几何口径，对象不同） | land-use structure uses one single caliber (area share of the ten land_use classes, EPSG:4548; identical in the proposal table, land-use-structure zh/en figures, the land_use_share_* metrics, both HTML pages and both PDFs; parks & green about 21% is no longer mixed with any other caliber; green_ratio/public_space_ratio are a different geometry scope with different objects) | equivalent |

## Verification note

- 指标核对：metrics.json 中 persona_count=6、global_case_count=6、industry_test_scenario_count=3、annual_program_count=3、landmark_count=3 均与中英文正文的编号对象逐项对应；三项 formal 核心指标（site_area_sqm、green_ratio、public_space_ratio）由 spatial_review 以同一几何复算校验。
- 免责声明核对：中英文均声明 provisional 边界、低置信度、复算触发条件和"概念建议/参考方案"属性，无差别、无淡化。
- 图位核对：中英文正文的图件引用路径一一对应（assets/figures/*.png 与 *.en.png），图册与展板 en 版逐页对应 zh 版。
- 局限：本表为提交方的自核记录；正式评审时如需，可对中英文逐段做人工等价复核。