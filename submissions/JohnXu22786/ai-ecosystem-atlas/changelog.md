# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for ai-ecosystem-atlas.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v1.1 - 2026-08-26 (Repair Round-1)

- **proposal.md / proposal.en.md**：按评审意见全面重写。补齐三层官方口径（43.6 km²/11.4 km²/368.4 ha）与本包子范围定位；三大定位—五大功能—三区两翼协同回路与区域协同机制表（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）；品牌识别与视觉系统（Logo方向/色彩/字体/三级品牌/国际传播文案）；五类用户画像；RACI责任矩阵、试点选择逻辑、停止条件与退出机制；AI技术协议（模型评测/数据质量/误差分群/运行监测）；运营与长期机制（活动品牌/开发者社区/场景开放准入/公共体验运营/国际合作转化/内容治理/设施维护/长期资金定性分级，不给精确金额）；「图谱荣誉柱」与「图谱公共空间组件库」；东西缝合与南北贯通策略；京张与中关村文化资源三层叙事与三级导视；10张场景卡、3个产业测试验证场景、8个有来源案例对标（sources.json 逐条登记发布者/URL/日期/复用边界）；品牌在先权利与使用边界声明（内部工作代号）。全部保持概念建议表述，不构成已确定决策。
- **metrics.json**：新增 scenario_card_count=10，global_case_count 4→8（与案例表可见文本一致），其余值不变。
- **sources.json**：由9条扩至25条（历史SRC-*、案例CASE-*、资产ASSET-*），全部含发布者、URL、发布/检索日期与复用边界；字体版权（Noto Sans SC，SIL OFL 1.1）与生成软件许可（Python/matplotlib/Pillow/numpy/fontTools）登记于版权声明。
- **compliance_matrix/standard_matrix/design_depth_matrix**：证据摘要改为逐条指向真实内容，不再复用套话；标准与深度矩阵覆盖全部必填ID。
- **report/copyright_statement.md**：改写为版权声明与资产权利清单（品牌在先权利、字体与软件依赖许可、案例使用边界、资产逐项登记）。
- **report/narrative.md / report/proposal.html / report/proposal.en.html**：叙事更新；报告由 render_proposal_html.py 从 proposal.md / proposal.en.md 重新渲染，随后按规范嵌入 Noto Sans SC 子集字体（fontTools 实例化＋pyftsubset，base64 @font-face，font-family 优先引用，proposal.html 内嵌字形块 225,296 字节 ≥100KB），无远程资源。
- **visual/index.html / visual/index.en.html**：重建为双语可视化总览页（14项中文内容标记齐全，data-metric 与 metrics.json 数值一致，@font-face 子集字体内嵌）；en 页无功能性中文。
- **assets/figures**：12张图件（6主题×中英）＋logo-jz.png 全部重新生成，figsize 12×8 @150dpi（logo 4.2×4.2），标题/标签/注记字号达到规范（≥18/13/11pt），每张含图例、指北、比例或范围说明与双语 PROVISIONAL 警示（临时概念边界·非官方红线·官方数据发布后复算）；比例与计数分列轴、用地百分比改为有计算依据的情景区间；机器 QC（ink≥0.10、文本包围盒重叠=0、画布剪裁=0、边缘裁切<0.02）全部通过，证据写入 self_check.json[figure_qc]。
- **drawings**：a0-boards（4页，首页标题60pt）与 a3-booklet（7页）中英各一版，由确定性脚本生成，页数非空、体积合规（≤10MB）。
- **manifest.json**：新增12个双语/新资产条目（6张 en 图、ecosystem-map、logo、en 图纸×2、en 报告、en 可视化页），language=zh/en/neutral 与 translation_of 按要求映射；data_confidence 改为 mixed_provisional_and_conceptual（provisional+概念口径，诚实标注）。
- **自检与证据**：四门自检（确定性校验/空间审查/视觉包装/专业证据）通过并持久化；figure_qc 机器图件质检证据写入 self_check.json；中英实质等价已人工核对；品牌在先权利检索未完成前按内部工作代号处理（无官方商标检索完成声明）。
- **双语映射清单**：proposal.en.md↔proposal.md；6×(zh png)↔(.en png)；a0/a3 en pdf↔zh pdf；report/proposal.en.html↔proposal.html；visual/index.en.html↔index.html。
- **任务书交付物索引**：agent.1（总体概念/功能统筹/协同总图/品牌）→ 统筹研究与品牌章节＋site-overview；agent.2（生态图谱/案例/要素机制）→ AI章节＋ecosystem-map；agent.3（10场景卡/3测试场景）→ AI章节两张表；agent.4（地标/荣誉/组件库）→ 重点区域章节；agent.5（文化系统/导视/国际传播）→ 蓝绿章节与品牌章节；agent.6（活动与长期运营）→ 实施章节，全部标注建议。
- **来源/权利清单**：见 sources.json（25条）与 report/copyright_statement.md 资产权利清单。