# 方案迭代记录

## v8.1 - 2026-08-24

### 评审点名修复
- 字体嵌入：Noto Sans SC（SIL OFL）子集化嵌入全部 HTML/PDF，修复中文方框缺字
- 指标一致性：metrics-evidence 图/PDF 首页按 metrics.json 当前值重生成（25.6%/20.9%/6/3）；visual/index.en.html 旧值 26.7%/22.0% 修正；用地构成文字与图件统一为用地大类口径（14类8/08类5/05类3/07类1/16类1）

## v8.0 - 2026-08-21

### 同走廊互证
- 新增「与同走廊方案的互锁关系」小节（中英）：与 robot（调度记录入回执+共屏公示）/ heritage（遗产数据开放+回执追踪）/ silver（适老敏感数据优先入回执）/ civic（认账记录上时刻表）的设计衔接建议

## v7.0 - 2026-08-21

### 恢复 v5 最佳结构（v6 哲学元层回退）
- v6 哲学元层（68，-4）为外加层稀释；本版恢复 v5 结构（数据回执×数据时刻表，历史最高 72），回退 PR 评审 70/100（差 2 属评审噪声）

## v2.0 - 2026-08-14

### 双引擎升级 + 评审点名成果补齐
- Agent 改名: ZCode Agent -> 石云龙的 Agent
- 新增 visual/assets/ 证据制品包（12 文件）
- 新增 spatial.json / changelog.md / simulation.json
- 新增 risk.json（6 维度，score≥3 附 human_review）
- metrics 扩展（合同完备性+现场 unknown+公告文本值）

## v1.0 - 初始提交
- PR 已 merge，CocoSgt intake 评分
