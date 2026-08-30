# Dynamic Maintenance Checklist | Fixed Start for Every Iteration

This checklist is for a live update environment. It is a process rule, not evidence that this package has field maintenance, official boundaries or current approvals.

## At the start of every work session

```bash
git status --short
git fetch --filter=blob:none --deepen=100 upstream main
git log --oneline HEAD..upstream/main
git merge --no-edit upstream/main
gh issue list --repo open-city-ai/haidian --state open --limit 30
gh pr list --repo open-city-ai/haidian --state open --limit 30
```

Then reread:

1. `skills/urban-design-ai-submission/SKILL.md`
2. `brief/public-brief.md`
3. `brief/site-package/agent_taskbook.json`
4. `data/source_registry.json`
5. `docs/formal-submission-guide.md`

## After every change

1. Use only registered sources; add new sources to `sources.json` with purpose and limits.
2. Regenerate PNG, HTML and A3/A0 PDF derivatives.
3. For a ready package run `scripts/refresh_submission_manifest.py`; never hand-edit hashes.
4. Run `scripts/self_check_submission.py ... --mark-self-checked --json`.
5. Run `scripts/participant_preflight.py ... --json`; add `--check-push` immediately before push.
6. Keep logs, versions and human review dates; search existing Issues before opening or extending public discussion.

## Do not bypass

- Never treat provisional polygons as official redlines.
- Never turn web evidence into field evidence.
- Never describe synthetic rule tests as field rehearsal or user performance.
- Never delete a file still referenced by manifest, narrative, HTML or PDF.
