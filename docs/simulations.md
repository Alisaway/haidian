# 场景演练台账

`simulation.json` 用可复算的任务台账说明 AI 场景在离线演练中的真实读数。它不是效果承诺，也不代表现场实测；它的价值在于**任何人都能从任务记录重新算出你声称的聚合值**。

演练可以失败。台账里出现失败任务、超预算任务和审计缺口不会扣分；把算不出来的数写成漂亮结论才会被校验阻断。

## 使用方式

复制 `templates/simulation.json` 到方案目录：

```text
submissions/<github-login>/<proposal-slug>/simulation.json
```

本文件是可选成果。一旦提交，`scripts/validate_submission.py` 会检查它与 `metrics.json` 是否自洽。

## 什么时候是阻断错误

校验严格度由包状态决定（见 `scripts/validate_submission.py` 中的 `strict_simulation`）：

| 包状态 | 不一致的后果 |
| --- | --- |
| `package_state: "ready_for_review"` | **阻断错误** |
| 采用双语契约（`bilingual_contract_version: "1"`）的包 | **阻断错误** |
| 其他历史 legacy 包 | 警告，保持兼容 |

新投稿两个条件都满足，因此**任何不一致都会阻断合并**。

## 任务字段

`tasks` 必须是非空的对象数组，`task_count` 必须等于 `tasks.length`。

每条任务记录按需要提供以下字段。**只需要提供你实际声明的指标所依赖的字段**——没有声明 `energy_budget_violations`，就不必给每条任务写能耗预算。

| 字段 | 类型 | 支撑的指标 |
| --- | --- | --- |
| `task_id` | string | 任务标识，便于逐条复核 |
| `outcome` | string（非空） | `simulation_success_rate` |
| `dispatch_schema_valid` | boolean | `tool_schema_pass_rate` |
| `audit_complete` | boolean | `audit_completeness` |
| `energy_used_kwh` / `energy_budget_kwh` | number | `energy_budget_violations` |
| `replan_seconds` | number | 参赛者自算的 `replan_p95_seconds` |
| `scenario_id` | string | 关联 `scenarios/*.json` 标准场景 |

## 保留指标名与推导规则

在 `metrics.json` 中使用下列保留指标名时，其 `source_files` 必须包含 `simulation.json`，且数值必须与任务台账逐项一致：

| 指标名 | 推导规则 |
| --- | --- |
| `simulation_task_count` | `tasks.length` |
| `simulation_success_rate` | `outcome == "success"` 或以 `_success` 结尾的任务数 ÷ 总任务数 |
| `tool_schema_pass_rate` | `dispatch_schema_valid == true` 的任务数 ÷ 总任务数 |
| `energy_budget_violations` | `energy_used_kwh > energy_budget_kwh` 的任务计数 |
| `audit_completeness` | `audit_complete == true` 的任务数 ÷ 总任务数 |

`replan_p95_seconds` 不由校验器推导，但如果同时出现在 `metrics.json` 和 `baselines.urban_llm_harness` 中，两者必须相等。请在文件中写明百分位算法（模板使用 `replan_p95_method`）。

未声明为 `known`、或 `source_files` 未包含 `simulation.json` 的指标不参与本项校验。

## baselines 规则

`baselines.urban_llm_harness` 被定义为**任务台账的镜像**。以下键若同时出现在 `metrics.json`（且已声明 `simulation.json` 为来源）与该基线中，必须相等：

`success_rate`、`tool_schema_pass_rate`、`high_risk_intercept_rate`、`energy_budget_violations`、`replan_p95_seconds`、`audit_completeness`

**其他评测口径必须放在不同的、有说明的基线名下**，不能在同一个保留指标名下并列两个结果。模板中的 `ai_off_equivalent` 就是这种用法：它记录"AI 关闭后仍可用"的人工兜底基准，与 Harness 是不同口径，因此不参与镜像校验。

指标不适用时写 `null` 并附说明，不要编造数值：

```json
"high_risk_intercept_rate": null,
"high_risk_metric_note": "not_applicable: 本任务清单未包含高风险拦截用例"
```

如果同时提交 `visual/assets/evaluation-baseline.json`，其 `metrics.<baseline_name>.<key>` 必须与 `simulation.json` 中同名基线的同名键一致。

## 让演练结果被读到

`simulation.json` 影响确定性校验，但**当前的评审输入不包含本文件的内容**（构成见 `scripts/review_submission.py` 的 `build_review_input()`：送入的是 `proposal.md`、`manifest.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json` 与三个矩阵）。

因此：**演练的方法、读数和不利结论必须在 `proposal.md` 里叙述出来**，并用 `[metric:...]` 引回 `metrics.json` 中的对应指标。只提交文件而不在正文说明，评审读不到。

## 常见错误

- `task_count` 与 `tasks.length` 不一致。
- 声明了 `simulation_success_rate`，但部分任务缺少 `outcome` 或写成空字符串。
- 把成功率写成期望值而不是从台账算出的值。
- 把现场实测口径和离线合成口径并列在 `urban_llm_harness` 下。
- 指标不适用时填 `0` 或 `1.0` 而不是 `null` 加说明。
- 只提交文件，正文完全不提演练方法与读数。

## English Quick Reference

`simulation.json` is an optional task ledger proving that claimed AI-scenario aggregates are recomputable from individual task records. Failures, budget overruns, and audit gaps are expected content; unverifiable claims are not.

- `task_count` must equal `tasks.length`; `tasks` must be a non-empty array of objects.
- Reserved metric names (`simulation_task_count`, `simulation_success_rate`, `tool_schema_pass_rate`, `energy_budget_violations`, `audit_completeness`) are recomputed from the ledger whenever the matching `metrics.json` entry is `known` and declares `simulation.json` in `source_files`.
- A success is `outcome == "success"` or any outcome ending in `_success`. An energy violation is `energy_used_kwh > energy_budget_kwh`.
- `baselines.urban_llm_harness` mirrors the task-derived aggregates. Record any other evaluation scope under a different, documented baseline name.
- Use `null` plus a note for metrics that do not apply. Never invent a number.
- For `ready_for_review` packages and packages under the bilingual contract, any inconsistency is a blocking error rather than a warning.
- The review input does not include this file. Narrate the method, readings, and adverse findings in `proposal.md` and cite them with `[metric:...]`.
