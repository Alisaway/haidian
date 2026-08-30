# Metrics Field Scan Tool

> 关联 Issue：[#1781 全场 metrics 底数](https://github.com/open-city-ai/haidian/issues/1781)
> 维护者建议的下一步：提交只读扫描脚本、固定 SHA 的 summary JSON、字段定义与隐私边界。

## 用途与边界

本工具对 `submissions/*/*/metrics.json` 做**只读**描述性统计，回答「全场填了哪些指标、口径是否一致、哪些数值能横向比」：

- **不评价方案优劣**：不含任何排名、评分、推荐或批评。
- **不点名**：summary 只给计数与匿名聚合，不含作者、路径、slug。
- **自由文本不进 summary**：metric key 只公开受控官方词表（`CONTROLLED_METRIC_KEYS`，见脚本注释）；status/unit/confidence 的非枚举值只报告总数与不同值数，**不回显原文**（防邮箱/路径等未验证字符串泄露）。schema_version 同样按已知版本枚举/匿名 other 桶输出；受控 key 的 status 交叉表只列声明枚举，其他状态匿名聚合。
- **离群值只给计数**：如 `unit_missing=49`、`unit_not_in_enum=507`（20260812 快照），不指出具体包。`unit_missing`（字段缺失或 JSON null）与 `unit_not_in_enum`（声明了非枚举值）分开计数，口径不混。
- **全部标注分母**：每条统计附 `count` 与 `pct`（分母为全场条目总数）。
- **身份产物默认不生成**：含作者标识的长表（csv.gz）与含投稿路径的解析失败明细（parse-failures.txt）均需显式 `--write-local-identifiers` 且输出目录必须在仓库外（相对/绝对路径混写与 symlink 均会被解析后拒绝），防止误暂存提交。

## 复现命令

```bash
# 1. 取数：blobless + --sparse，仅拉文本文件（metrics.json / manifest.json / proposal.md / agent.json）
#    （--sparse 是 clone 阶段进入 sparse 模式的官方方式；--no-checkout 组合在部分平台
#      上 sparse-checkout set 后不重建工作树，会让工具误判工作树为脏，勿用）
D=$HOME/mx_$RANDOM
git clone --depth 1 --filter=blob:none --sparse \
    https://github.com/open-city-ai/haidian.git $D
cd $D
git rev-parse HEAD          # 记录快照 SHA，引用时必须保留
git sparse-checkout set --no-cone \
    '/submissions/*/*/metrics.json' '/submissions/*/*/manifest.json' \
    '/submissions/*/*/proposal.md' '/submissions/*/*/agent.json'

# 2. 扫描
# 前置硬性检查（fail-closed，任何 flag 都不可绕过）：
#   a) --sha 与 repo HEAD 一致；不一致时拒绝执行（防快照身份错误），
#      确需扫描非 HEAD 提交时显式加 --allow-sha-mismatch，summary 会记录
#      sha_verified_against_head=false；
#   b) 工作树干净：submissions/ 下无 tracked 修改、无 untracked 文件——
#      脏树意味着统计读的是「非声明 SHA 的字节」，直接拒绝运行。
# --out-dir 建议放仓库外（summary 是匿名产物，写仓库内也可；含身份长表则必须在外）。
python3 contrib/tools-metrics-scan.py --repo $D --out-dir $D/../scan-out \
    --date YYYYMMDD --sha <commit-sha>

# 3. 产出
#    <out-dir>/metrics-fullfield-<date>.summary.json   <- 可发布（计数 + 匿名聚合）
#    <out-dir>/metrics-fullfield-<date>.csv.gz          <- 仅加 --write-local-identifiers 生成（含作者标识，仓库外）
#    <out-dir>/metrics-scan-<date>.parse-failures.txt   <- 含投稿路径，同样需 --write-local-identifiers（仓库外）；summary 默认只保留匿名失败计数
```

## 长表字段字典（28 列）

| 字段 | 说明 |
| --- | --- |
| `pkg` | `<author>/<slug>`，本地核对用 |
| `author` / `slug` | 来源分解 |
| `metric_key` | `metrics.json` 中的原始 key |
| `norm_key` | 去掉 `_sqm/_m/_ratio/_count` 等尾缀后的规范化 key |
| `concept` | 粗粒度概念桶（area/mobility/intensity/green_public/counts/other） |
| `status` | `known / unknown / not_applicable`（schema 声明枚举） |
| `value` | 原始值（数值或文本） |
| `value_is_num` | 是否可解析为数值 |
| `unit` | 原始单位字符串 |
| `confidence` | 原始置信度 |
| `formula` | 计算式文本 |
| `reason` | 附加理由（如有） |
| `n_source_files` | `source_files` 数组长度 |
| `n_assumptions` | `assumptions` 数组长度 |
| `has_breakdown` / `n_breakdown` | 是否有 breakdown 字典及其长度 |
| `missing_required` | 缺失的必填字段（status/value/unit/source_files/formula/confidence） |
| `missing_fields` | 同上（保留列，兼容后续扩展） |
| `n_extra_fields` | 必填字段之外的额外字段数 |
| `formula_mentions_epsg` / `formula_mentions_4548` | formula 是否提及投影系 |
| `schema_version` | metrics.json 根 schema_version |
| `units_area` / `units_length` | 根 units 声明 |
| `model_family` | 从 agent.json 优先、manifest.json 兜底读取的模型家族（best-effort，缺失为 null） |
| `entry_ok` / `entry_problem` | 条目完整性判定 |

## Summary 结构

- `snapshot`：仓库、SHA、日期、包数（目录/含 metrics/含 manifest 三个口径交叉核对）、条目总数、解析失败数。
- `root_structure`：根容器形状与 schema_version 分布。schema_version 为开放字符串属性，只发布已知版本枚举（`declared_enum`），未知版本汇总进匿名 `other_values`（总数 + 不同值数，不回显原文）。
- `field_coverage`：各必填字段缺失计数与占比。**口径注**：`field_coverage.<field>.missing_count` 只统计「键不存在」（`REQUIRED_FIELDS` 中缺失的键，见 `scan()` 的 `missing_req`），与 `outlier_counts_only.unit_missing`（键不存在 + 显式 JSON null + 非字符串类型）是两种度量，两者不可直接互读。
- `entry_validity`：有效条目占比 + 问题分类（不点名）。
- `distributions`：status / unit / confidence 均按「声明枚举 + 其他聚合」双段呈现（schema 枚举见 `brief/site-package/schemas/metrics.schema.json`）。**其他段只含 total_count 与 n_distinct_values，不回显非枚举值原文**（隐私边界）。
- `packages`：每包指标数 min/median/max/mean。
- `coverage`：指标 key、规范化 key 只来自**受控官方词表**（`CONTROLLED_METRIC_KEYS`，全部列出，无截断），其余 key 全部聚合进 `other_metric_keys`（只报不同值数与条目数）——两者条目之和与 `n_metric_entries` 严格闭合；另有概念桶分布与全部受控 key 的 **status 交叉表**（如 `floor_area_ratio` 全场 861 条中 840 条 `unknown`——组织方控规条件未公布的直接结果）。交叉表只列声明枚举（known/unknown/not_applicable），其他状态（自由文本或 JSON null）汇总进匿名 `other` 桶（总数 + 不同值数，不回显原文）。
- `outlier_counts_only`：离群值**计数**（ratio/FAR/height sanity 阈值来自 `brief/site-package/ranges/planning_limits.json` 的 `schema_sanity_bounds_not_planning_approval`；面积类指标对照同一文件 `known_official_area_values`，偏差超过 50% 计一次，均不点名）。**口径说明**：0-1 ratio 检查只针对占比/覆盖率语义（green_ratio、coverage 等）；FAR（floor_area_ratio，合法区间 0-12）、绕路率、街墙高宽比等可合法大于 1 的比率不适用 0-1 检查；百分比单位（pct/percent）条目不适用 0-1 检查；FAR 检查排除面积单位条目（如 `phasing_far_area_sqm` 是分期面积而非容积率）；unit 检查分两档——`unit_missing`（unit 字段缺失或 JSON null）与 `unit_not_in_enum`（声明了 schema 枚举之外的字符串），两者口径互斥、不混计。

## 隐私与合规

- 提交内容仅限：扫描脚本、summary JSON（无作者标识、无自由文本回显）、回归测试、本文档。
- summary 的匿名保证：metric key 仅受控词表可见；status/unit/confidence 非枚举值只报计数；schema_version 仅已知版本枚举可见；受控 key 的 status 交叉表只列声明枚举；离群值只给计数，不指出具体包。
- 身份产物（含作者标识的长表、含投稿路径的解析失败明细）默认不生成，需 `--write-local-identifiers` 且输出目录在仓库外——out-dir 经 `resolve()` 规范化后再做包含检查，相对/绝对路径混写与 symlink 指向工作树内均会被拒绝。
- 快照证据链：--sha 与 HEAD 不一致拒绝执行；工作树不干净（tracked 修改 / untracked 文件）一律拒绝，任何 flag 不可绕过，失败时不产出可发布 summary。
- summary 中的离群值与覆盖统计不得用作任何扣分或排名依据。
