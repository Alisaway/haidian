# Narrative

REPAIR ROUND-1 (2026-08-26 → 2026-08-27): 本包按 proposal_format_version=2 双语合同完成整备——五张英文图件、A0/A3英文版、英文HTML与英文visual页面全部补齐；proposal.en.md 的 language=en / translation_of=proposal.md 及 manifest 对应映射已修正；所有 HTML 内嵌 OFL 许可的 Noto Sans SC 子集（embed_fonts.py 逐页嵌入，check_font_coverage.py 机器核验 0 缺字）。图件按"真实比例+语境地名+图例/比例尺/北箭头+双语 provisional 印章"重绘；机器质检结果持久化于 self_check.json[figure_qc]（ink/边缘裁切实测；文字重叠为生成期检查，事后无法机器复核，已如实标注 not_verified）。内容层面：品牌层级（数轨京张 JINGRAIL→智治绿廊→三节点）与 Logo 方向、8环节生态图谱+5例全球案例表、12张场景卡+3项测试协议+5类人才画像、公共空间组件库、荣誉展示系统、文化导视与国际传播文案、年度活动体系、开发者社区与场景开放转化机制、"一廊五接口"区域协同矩阵（北纬社区/未来科学城/怀柔科学城/经开区/京津冀）、试点与活动实施/运营矩阵（牵头/协作、前置数据、许可与伦理、成本等级、周期、人工兜底、验收、申诉、退出、长期KPI）均已写入正文；指标复算口径（绿地率0.122与公园绿地28%分母区分）与品牌在先权利声明（内部工作代号，权利边界见 copyright_statement.md 的 Asset Rights Ledger 一节）已落实。全部内容保持概念建议属性，不构成政府承诺或投资承诺。

2026-08-27 收尾：修正 proposal.md/proposal.en.md/risk.json 中指向 report/asset_rights_ledger.md 的失效引用（该路径不在报告目录白名单内）→ 统一为 report/copyright_statement.md（内含 Asset Rights Ledger）；risk.json 清除残留的旧主题术语（滨水/河道/水面机器人等），替换为本方案主题（轨道保护/文保/存量更新/算法审计等）；proposal.html 与 proposal.en.html 重新渲染并重新嵌入字体；四门禁自检通过并持久化（manifest.validation_claim.self_checked=true）；figure_qc 实测写入 self_check.json；官方评分脚本得分 97.0/100（评审缺口为空、无强制拒收项）。

中英实质等值已人工核对；品牌在先权利检索未完成前全部名称按内部工作代号处理；图表 ink 与裁切检查结果见 self_check.json[figure_qc]。
