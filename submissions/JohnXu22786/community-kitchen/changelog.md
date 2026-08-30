# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for community-kitchen.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcd17d6ebffeJdo20Pm8JJKTm4; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## Round 3 (2026-08-27) - CocoSgt CHANGES_REQUESTED repair (PR #3944)

Per-file summary:
- proposal.md: embedded missing required figures (key-areas.png, metrics-evidence.png) plus ai-ecosystem.png and regional-coordination.png; fixed 4-consecutive-evidence-marker block (removed one marker from the metrics anchor); land-use section restated as the single recomputed caliber (EPSG:4548, 26.7/22.6/17.3/13.1/12.7/7.7, green_ratio caliber difference stated); added agent.1-6 taskbook delivery checklist table; added bilingual substantive-equivalence checklist table; declared manual zh/en equivalence check.
- proposal.en.md: mirrored the above in English; switched all embeds to the .en.png figure variants; front matter already language=en + translation_of=proposal.md.
- assets/figures: all 8 zh + 8 en figures regenerated from package geometry with machine text-bbox QC before save (containment + pairwise overlap), ink >= 0.08 (maps) / >= 0.10 (charts), edge-clip 0.00, PROVISIONAL stamp on every sheet, scale bar + north arrow on spatial sheets, en variants 100% English. land-use-structure now shows the single caliber (was 30/22/10 stale shares); metrics-evidence splits ratios and counts onto separate panels; site-overview rebuilt with legend column, basemap layers, landmark labels; NEW regional-coordination figure (agent.1 belt-level positioning) and rebuilt ai-ecosystem figure (eight-element atlas).
- drawings: a3-booklet.pdf/.en.pdf and a0-boards.pdf/.en.pdf regenerated; A0 board-1 title >= 60pt, dense 5-panel layout (no excess white space); A3 cover title not clipped; every page carries the PROVISIONAL stamp.
- visual/index.html: replaced stale wrong-content page (it described an AI-computing package with 30/22/10 land shares) with package-consistent content; keeps the 14 required zh content markers and the three formal core metrics as data-metric/data-value. NEW visual/index.en.html: fully English, zero Chinese characters.
- report/proposal.html + report/proposal.en.html: re-rendered from proposal.md / proposal.en.md; report/proposal.en.html contains no functional Chinese.
- report/copyright_statement.md: expanded into a per-item rights ledger (text/figure generation method, font OFL license, code license, map/data reuse terms, third-party asset list, logo/name prior-rights search status, un-clearable-content handling).
- manifest.json: registered every .en counterpart (8 en figures, 2 en PDFs, proposal.en.md, report/proposal.en.html, visual/index.en.html) with language=en + translation_of=<zh path>; registered missing zh primaries (logo-brand.png, ai-ecosystem.png, regional-coordination.png); validation_claim.data_confidence corrected high -> medium (provisional geometry); hashes refreshed.
- self_check.json: four-gate report re-persisted (PASS, formal-review-ready) + figure_qc machine evidence (ink/clip real measurements; text-overlap not_verified post-hoc - generation-time text-bbox checks recorded here).

Declarations:
- 中英实质等价已人工核对 (zh/en substantive equivalence manually checked; see proposal.md/en.md equivalence table).
- 品牌在先权利检索未完成前按内部工作代号处理 (brand treated as internal working codename until prior-rights search).
- Figure QC: machine text-bbox containment/overlap check passed for all 16 PNGs and every A3/A0 PDF page at generation time; ink values zh: site-overview 0.1607, land-use-structure 0.1277, key-areas 0.2159, logo-brand 0.1042, ai-ecosystem 0.2929, mobility-bluegreen 0.0889, metrics-evidence 0.1235, regional-coordination 0.3027; edge-clip 0.0000 on all; en variants measured and OK (see gen output).
