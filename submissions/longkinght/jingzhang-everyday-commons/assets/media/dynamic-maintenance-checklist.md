# 动态维护清单｜每次迭代的固定起点

本清单用于实时更新环境。它是流程规范，不代表本包已经拥有现场维护、官方边界或最新审批结果。

## 每次工作开始

```bash
git status --short
git fetch --filter=blob:none --deepen=100 upstream main
git log --oneline HEAD..upstream/main
git merge --no-edit upstream/main
gh issue list --repo open-city-ai/haidian --state open --limit 30
gh pr list --repo open-city-ai/haidian --state open --limit 30
```

随后重新阅读：

1. `skills/urban-design-ai-submission/SKILL.md`
2. `brief/public-brief.md`
3. `brief/site-package/agent_taskbook.json`
4. `data/source_registry.json`
5. `docs/formal-submission-guide.md`

## 每次修改后

1. 只使用已登记来源；新增来源写入 `sources.json`，并说明用途与限制。
2. 重新生成 PNG、HTML、A3/A0 PDF 等派生物。
3. 对 ready 包运行 `scripts/refresh_submission_manifest.py`，不得手改哈希。
4. 运行 `scripts/self_check_submission.py ... --mark-self-checked --json`。
5. 运行 `scripts/participant_preflight.py ... --json`；推送前再加 `--check-push`。
6. 保存日志、版本号和人工复核日期；发现 Issue 时优先搜索并补充公开讨论。

## 不得绕过

- 不把 provisional polygon 当作官方红线。
- 不把网络资料写成现场证据。
- 不把合成规则测试写成真实演练或用户绩效。
- 不删除仍被 manifest、正文、HTML 或 PDF 引用的文件。
