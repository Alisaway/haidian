# 方案迭代记录

## v1.3 - 2026-08-18

- **双轨公测制**（人类共创者输入）：公测广场准入流程产品化——内测/公测双轨样本按比例配置、放量单元按场景性质分（网络型服务按"线路×时段"而非路口）、投诉率+人工接管+重复使用率三指标、多方熔断+市民 agent 代理投诉、智能体民意征集（非法定表决）、年检红线+末位退出。中英正文新增专节。
- **全文去 AI 味打磨**：削减修辞密度与金句，抽象判断改为具体空间与数字表述（中英同步）。
- **PDF 修复**：四份 A3/A0 PDF 经 qpdf 内核重写并线性化（fast web view），修复画廊内嵌查看器"未能加载 PDF 文档"问题。

## v1.2 - 2026-08-17

- **真实底图**：经 Overpass API 提取 OpenStreetMap 现状要素（快速路/主干/次干、铁路、地铁线与车站、水系、公园），以 EXISTING_PRIMARY_ROAD / EXISTING_RAIL / EXISTING_WATER 现状条件图层登记进 constraints.geojson（ODbL 署名），五张图纸与 A3/A0 全部改为真实场地底图上绘制——回应交叉评审"空间明确性"短板。
- 删除 v1.0 中自绘的示意铁路中线（CONS-RAIL-001），以真实 OSM 数据取代。
- sources.json 新增 OSM-BASEMAP 来源记录；正文版权章节与参考资料同步更新（中英）。

## v1.1 - 2026-08-13

- 依据 Codex 独立交叉评审（13维 7.0/10）完成一轮修订：
- 概念升级：依据人字形折返"两车换向"史实，把"人拉AI推"固定主从升级为**牵引权换向协议**（默认人拉AI推；低风险已过评测场景可显式换向、公示、可撤回），新增 L0-L3 牵引权分级。
- 史实与术语：英文 double-heading 更正为 push-pull / front-and-rear traction；青龙桥荣誉道标注纪念性命名（遗址在昌平-延庆）。
- 数据修正：缝合支路补至13条与正文一致；大钟寺前广场与人字口01重叠消除（公共空间声明/复算漂移清零）；PUBLIC-007 锚点修正；绿地引用改指 land_use_1401；manifest 置信度 high→medium。
- 合规消毒：全文"必须/一律/通过才能/年检/租金优惠/街道办运营/拆除"等表述改为建议/候选/待有权部门决定；区域协同段重写为三条可验证候选协同链。

## v1.0 - 2026-08-13

- 初次提交「京张人字线 The REN Line」formal 方案包：以詹天佑人字形铁路"双机牵引"为第一性概念，组织一脊两轨九口三站。
- First formal submission of "The REN Line": Zhan Tianyou's zigzag double-heading translated into one spine, two tracks, nine REN switches, three stations.
- 完整用地剖分（60 个地块，无重叠无缝隙）、205 个概念建筑基底、三期分期、约束提示层；全部指标在 EPSG:4548 复算。
- 中英双语：proposal / 五图 / visual / A3·A0 全部成对（bilingual contract v1）。
- 已知缺口：官方边界与控规条件缺失，全部空间结论为概念建议，待官方数据发布后整包重算（见 assumptions.json）。
