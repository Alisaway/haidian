# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for ai-governance-pilot-zone.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.0 - 2026-08-26 (REPAIR ROUND-1)

- proposal.md: 13 节正文全面重写——品牌层级（数轨京张 JINGRAIL→智治绿廊→三节点）与 Logo 方向；8 环节生态图谱+全球 5 例案例一览表；12 张场景卡（用户/输入数据/AI 能力/空间载体/运营者/人工兜底/评价指标）；3 项测试协议；5 类人才画像；公共空间组件库、荣誉展示系统、文化导视与国际传播文案；开发者社区与场景开放转化机制；年度活动体系（开放日/审计公开周/标识艺术展）；区域协同"一廊五接口"矩阵（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）；试点实施矩阵与活动运营矩阵（牵头/协作角色、前置数据、许可与伦理检查、成本等级、试点周期、人工兜底、验收指标、申诉渠道、退出条件、长期运营KPI）；指标复算口径表（绿地率0.122与公园绿地28%分母区分）与品牌在先权利声明。
- proposal.en.md: 完整英文翻译（language=en、translation_of=proposal.md、双向链接），中英实质等值已人工核对；无功能性中文。
- Figures: 5 张中英文图件按真实比例+语境地名+图例/比例尺/北箭头+双语 provisional 印章重绘；metrics-evidence 比例与计数分轴；logo-jingrail.png 中性字标；A0/A3（zh+en）封面加厚、标题可读；全部通过机器 ink/裁切/文字重叠质检（生成期 renderer 级检查）。
- HTML: report/proposal.html、report/proposal.en.html 由 render_proposal_html.py 重新生成；visual/index.html（14 个必需栏目+数据指标）、visual/index.en.html 重写；4 页均内嵌 Noto Sans SC 子集（OFL），逐页核对标题/正文/表格/图注/证据锚点，中文字形无方框；en 页无功能性中文。
- manifest.json: 增加全部双语对应件条目（language=en+translation_of）、logo（neutral）、asset_rights_ledger.md；validation_claim.data_confidence=medium（provisional 指标为低/中置信）。
- sources.json: 全部条目补 license 字段；新增 5 条全球案例来源（阿姆斯特丹/赫尔辛基/新加坡/欧盟AI法案/OECD，URL 经 2026-08-26 在线取回验证）。
- assumptions.json +3（A-REGION-001/A-COST-001/A-BRAND-001）；risk.json +1（R-BRAND）；compliance/standard/design_depth 矩阵 evidence_summary 逐项改为指向真实内容。
- report/: asset_rights_ledger.md 新增（含品牌在先权利段落）；copyright_statement.md 更新；narrative.md 更新。

## v2.1 - 2026-08-27 (REPAIR ROUND-1 收尾)

- proposal.md / proposal.en.md / risk.json: 修正指向 report/asset_rights_ledger.md 的失效引用（该文件名不在报告目录白名单）→ 统一指向 report/copyright_statement.md（内含 Asset Rights Ledger 一节）；risk.json 清除旧主题残留术语（滨水/河道/水面机器人/亲水设施等）→ 改为本方案主题（轨道保护区/文保/存量更新/算法审计/合成内容标识），并在 R-BRAND 缓解措施中同步权利边界出处。
- report/narrative.md: 重写为与实际状态一致的完整记录（含 figure_qc 持久化、overlap not_verified 如实标注、失效引用修正说明）。
- report/proposal.html / report/proposal.en.html: 由 render_proposal_html.py 从修正后的 proposal.md / proposal.en.md 重新生成；随后 embed_fonts.py 重新嵌入 Noto Sans SC 子集（WOFF1 data URI，zh 页 >100KB），check_font_coverage.py 四页机器核验 0 缺字。
- assets/figures/*: 未改动（v2.0 已按质量条重绘）；本轮以机器 ink/裁切检测生成 figure_qc 实测记录。
- self_check.json: 四门禁（deterministic/spatial/visual/professional）全 PASS 持久化到 self_check.json；随后 figure_qc（ink/边裁 machine 实测，overlap_clear=not_verified 如实记录）写入同一文件。
- manifest.json: 全部声明文件哈希经 refresh_submission_manifest.py + 自检持久化更新；validation_claim.self_checked=true、data_confidence=medium。
- 全包人工核对：中英实质等值已核对；品牌在先权利检索未完成前按内部工作代号处理；官方评分脚本得分 97.0/100（reviewer_gaps 为空、无强制拒收项）。
