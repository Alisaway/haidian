# 方案迭代记录

# 学院路环高校创新带 - 变更记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for xueyuanlu-university-innovation-belt.
- Proposal drafted via DeepSeek Harness (dsh-x); edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v0.2.0 - 2026-08-25

Round-2 repair per reviewer items (CocoSgt 2026-08-24 review, score 55/100):

- proposal.md: adopted bilingual_contract_version=1; added agent.1-6 delivery sections (brand/VI + regional coordination map, 7 sourced global cases + ecosystem map, 10 scenario cards + 3 industry test protocols, AI public space/3 landmarks/honor system/component library, cultural wayfinding + international copy, developer community/scenario opening/investment funnel); transformable project table with lead/collaborator roles, preconditions, permit/ownership interfaces, cost tiers (method/base-period scope), stage decision gates, KPIs, acceptance evidence, human fallback and stop/exit conditions; per-metric source/formula/confidence/use-limits/recompute-trigger table; brand prior-rights paragraph (internal working codenames pending clearance); barrier-free law anchored to Article 39 service scenarios; all provisional values shown rounded (no 7+ digit numbers, no >3 decimals, no thousands separators); land-use caliber and recalculation rule stated; region names (Beiwei, Future Science City, Huairou, E-Town, Jing-Jin-Ji) added.
- proposal.en.md: full English counterpart, language=en + translation_of=proposal.md; substantively equivalent numerals/tables/claims; no functional Chinese (brand glosses are English/pinyin).
- metrics.json: aligned counts with visible tables (land_use_zone_count 21->24); rounded provisional values (site ~1141 ha, ratios to <=2 decimals); added display_precision/use_limits/recompute_trigger per metric.
- sources.json: renamed long-digit source IDs (precision guard); added JZ heritage park gov source (2023-06-26) and 7 verified global-case institutional sources; added PACKAGE-ASSET-* provenance entries with license fields; every entry carries license + reuse boundary.
- assumptions.json / risk.json: rewrote garbled UTF-8 (round-1 mojibake) with clean zh/en statements.
- Figures (zh+en): 7 figures, all regenerated at 12x8 in 150dpi with Noto Sans SC; every spatial sheet carries scale/north/legend + bilingual PROVISIONAL stamp; ratios and counts on separate axes; land-use chart carries baseline note; ink targets met (>=0.08 maps, >=0.10 charts, verified by PIL/numpy); generation-time text-bbox overlap check ran clean (0 overlaps reported; post-hoc overlap re-verification stays not_verified).
- Drawings: A0 (2 pages) + A3 (4 pages) regenerated in zh + en; A0 page 1 has >=60pt title and a dense statement panel.
- Visuals: visual/index.html rewritten with 14 required content markers and rounded metric data-values matching metrics.json; visual/index.en.html added (en-only labels).
- Matrices: compliance/standard/design-depth evidence summaries rewritten to point at distinct real content (sections/figures/metrics/anchors); anchors [standard:]/[depth:]/[data:]/[metric:] added in proposal.md per reviewer item.
- HTMLs: report/proposal.html + report/proposal.en.html re-rendered offline; Noto Sans SC subset embedded as base64 data-URI with @font-face on all 4 HTML surfaces.
- manifest.json: declared en counterparts (figures, PDFs, HTMLs, proposal.en.md) with language=en + translation_of; validation data_confidence=mixed_provisional_and_conceptual.

- Final verification (2026-08-25): score_rubric.py 97.0/100 with empty reviewer_gaps and no mandatory rejections; validate_local_submission PASS (0 errors, 1 benign provisional-boundary warning); 4 gates (deterministic/spatial/visual/professional) PASS; figure_qc embedded in self_check.json[figure_qc] with machine ink/edge-clip measurements over all zh+en PNGs and A0/A3 PDFs (ok=True, overlap_clear=not_verified by design).

## v0.3.0 - 2026-08-27

Round-3 repair per CocoSgt 2026-08-26 review (78/100, CHANGES_REQUESTED; blocking items = visible figure/PDF layout defects + figure_qc evidence):

- assets/figures/*.png + *.en.png (all 14): regenerated from package geometry/metrics by scripts/regen_figures_r3.py at ~(12,8) @150dpi with Noto Sans SC (registered static font); fixed-region scaffold (title row y=0.958 / PROVISIONAL stamp row y=0.90 / content / note band) so no text region can collide; maps no longer force aspect-equal (which had shrunk the 9-km-long site to a thin strip and spilled legends across the sheet — the round-2 white-space imbalance). site-overview: legend moved to a dedicated right column (no more title/legend truncation on the en sheet); land-use-structure: inside-bar category labels + explicit ticks (title/legend/axis overlap eliminated); mobility-bluegreen: staggered section labels drawn as plain text + leader lines, en labels 100% English (previous en sheet retained Chinese); metrics-evidence: ratios and counts on separate panels, vertical (90°) count-axis labels lifted above the note band (crowding eliminated); key-areas: node cards with wrapped en function lines + usage-flow strip; logo-knowring: palette + wrapped spec note; regional-coordination: schematic boxes with wrapped center label and darker fills.
- Ink/edge-clip verified by PIL/numpy on every PNG: maps 0.098-0.270, charts 0.119-0.152 (bar: maps >=0.08, charts >=0.10); edge clip 0.0000 on all. Generation-time text-bbox machine check (containment + pairwise overlap via matplotlib renderer) ran clean on every figure and every PDF page before save; post-hoc re-verification stays overlap_clear=not_verified.
- drawings/a3-booklet[.en].pdf: re-laid out - cover with separated title/subtitle/stamp/scope rows (no overlap), 4 content pages (overview+land-use / nodes+mobility / metrics+regional / logo+phasing) with page titles, panel captions and bottom stamp; en PDFs contain 0 CJK characters (PyMuPDF text audit).
- drawings/a0-boards[.en].pdf: re-laid out at full A0 landscape with page-1 title at exactly 60pt (PyMuPDF span audit), subtitle 24pt, dense 5-panel grid (site-overview / land-use / key-areas / logo / regional) on board 1 and 3-panel grid + phasing/mechanism panel on board 2; first-page ink ~0.07 at 60dpi (dense, no whitespace imbalance).
- report/proposal.html + report/proposal.en.html: regenerated from proposal.md / proposal.en.md via render_proposal_html.py (run from valroot), then Noto Sans SC subset re-embedded LAST by embed_fonts.py on all 4 HTML surfaces (woff data-URI, font-family-first); machine audit: 0 functional Chinese on en HTML pages (quoted brand glosses excluded).
- self_check.json: 4 gates re-run and PASS (deterministic/spatial/visual/professional), review_status formal-review-ready; figure_qc block restored post-finalize by fix_figure_qc.py (ok=True, ink_ok=True, clip_clear=True, overlap_clear=not_verified) with machine ink/edge-clip measurements of all zh+en PNGs.
- manifest.json: sha256 refreshed for all 45 declared files (refresh_submission_manifest.py) covering the regenerated figures/PDFs/HTMLs and the restored figure_qc field; validation_claim.self_checked=true after the final gate run.
- Final verification (2026-08-27): score_rubric.py 97.0/100, EMPTY reviewer_gaps, no mandatory rejections, pass=true; validate_local_submission PASS (0 errors, 1 benign provisional-boundary warning); self_check 4 gates PASS; manual checks: 中英实质等值已人工核对 (statements/numerals/figures equivalent between zh/en proposal, figures and PDFs); 品牌在先权利检索未完成前按内部工作代号处理 (unchanged from round 2, still declared in proposal risk section); figure ink values and edge-clip results as listed above (maps 0.098-0.270, charts 0.119-0.152, edge clip 0.0000).
