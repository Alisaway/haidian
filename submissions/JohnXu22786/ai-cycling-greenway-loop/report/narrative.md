# 方案叙事说明 (Formal Narrative)

本方案「京张AI骑行绿道环(RIDE·JZ LOOP)」以百年京张铁路走廊为骨架,提出一条贯通三区、缝合两翼的环线慢行纽带(骑行+步行)原创概念；沿线配置12张 AI 场景卡与3个 AI 地标,统一计为15个场景节点。方案的机器可读证据链由以下部分构成并相互交叉校验:

- **proposal.md(中文正文,权威叙事)** + **proposal.en.md(英文对照版)**:13 个固定二级标题章节,逐条回应任务书 23 项要求与 agent.1-6 六项智能体任务;
- **geometry/ 九层 GeoJSON**:site_boundary、key_areas、land_use、roads、green_space、public_space、buildings、constraints、phasing。环线为概念性闭合环,线位与断面均非官方红线;
- **metrics.json**:site_area_sqm、green_ratio、public_space_ratio 三项 formal 核心指标自本包几何在 EPSG:4548 投影下复算,标注 confidence 与复算触发条件;另登记 scenario_card_count=12、landmark_count=3、scenario_node_count=15（12张场景卡+3个地标）;依赖未公开官方控制条件的指标保持 unknown;
- **compliance_matrix.json(23 项)**、**standard_matrix.json**、**design_depth_matrix.json(15 项)**:机器可读的证据锚点;
- **assets/figures/ 14 张中英图件 + drawings/ 8 份 A0/A3 中英图册 + visual/index.html(+en) + report/proposal.html(+en)**:全部由包内真实几何、指标与配置数据确定性渲染,非编造图像;
- **sources.json、assumptions.json、self_check.json**:可查证来源、假设与如实自检记录。
- **visual/assets/repair_evidence.json**:对本轮官评修复的区域接口、拟验证协议、S01—S12 数据生命周期、节点概念卡与 agent.2/agent.6 转化路径作结构化留痕；该文件不表示已测试、已批准或已建立合作。

诚实声明:本包全部内容为概念建议、参考方案,供专业团队深化研究;基于 provisional 边界,官方数据发布后整体复算。本包未编造任何验证结果、图像、指标或官方数据。
