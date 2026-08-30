# Formal Narrative

This narrative documents the round-2 package assembly evidence for the PR author's own records: bilingual equivalence, figure-QC generation-time checks, and the file-level consistency chain. Geometry, metrics, matrices, drawings and visual/index.html remain cross-checked deliverables; authoritative machine evidence lives in self_check.json, metrics.json, sources.json and the matrices.

## Version 2 bilingual package (round 2)

- Every display counterpart has an English variant: proposal.en.md (registered language=en, translation_of=proposal.md in manifest.json), 7 English figures (assets/figures/*.en.png), drawings/a0-boards.en.pdf and drawings/a3-booklet.en.pdf, report/proposal.en.html and visual/index.en.html. All are registered in manifest.json with language=en and translation_of pointing at the exact zh primary path.
- Human side-by-side equivalence check (documented, performed by the author on 2026-08-26):
  1. All 13 canonical zh sections have a matching English section with the same content order (headings checked one-to-one).
  2. Numerals were checked statement by statement: 43.6 km2 / 11.4 km2 / 368.4 ha; 25/20/15/10/10/10/5/5 land shares; 6 global cases; 10 scenario cards; 3 test protocols; 4 annual events; 5 personas; 3 landmarks. Every number appearing in proposal.en.md matches proposal.md.
  3. Discipline words translated consistently: provisional, recompute, anonymized aggregation, human review, no excessive surveillance, internal working codename, participant provisional model data.
  4. Figure pairs (zh/en) use the same layout and data; only label language differs.
- en HTML pages contain no functional Chinese characters (brand wordmarks are rendered in ASCII, e.g. "PAR-JZ"); validated by deterministic CJK scan in check_font_coverage.py and manual review.

## Figure generation-time QC (round 2)

- All figures were regenerated at figsize (12,8), 150 dpi, with constrained manual layout: titles >= 18 pt, labels/legends >= 13 pt, annotations >= 11 pt.
- Generation-time text-bbox overlap check: every Text artist's window extent (including legends and figure-level texts) was measured pairwise at render time; zero overlapping pairs remain in all 15 figures (machine record in self_check.json figure_qc.figures[*].text_bbox_overlaps == []).
- Ink and edge-clip measured per figure (PIL/numpy, pixels < 200 luminance; outer 10 px band < 2% ink): maps/diagrams >= 0.08, charts >= 0.10 (see figure_qc figures[*].ink / edge_clip_ratio).
- Every figure carries the bilingual PROVISIONAL stamp and source note; spatial figures carry legend/scale/north where applicable.

## Consistency chain

- Land use single caliber: 8 classes and ratios appear identically in proposal.md (section Land Use), land-use-structure(.en).png, both HTML pages, both PDF deck sets and metrics.json land_ratio_* metrics; aggregation formula and recompute trigger stated in text.
- Counts agree across proposal.md, metrics.json, figures and visual pages: global_case_count=6, scenario cards=10, industry_test_scenario_count=3, annual_program_count=4, persona_count=5, landmark_count=3.
- compliance_matrix.json (23 items) and design_depth_matrix.json (15 items) each carry distinct evidence_summary_zh pointing at concrete sections, figures, geometry layers, metrics and tables; report_sections point at the sections that actually contain the evidence.

## Scope honesty

- Official three-tier scopes are cited at the official announcement caliber (coordinated ~43.6 km2 / overall ~11.4 km2 / key ~368.4 ha) and the package's own sub-scope is located under them explicitly.
- All geometry-derived values are participant provisional model data, displayed at reduced precision only, with recompute triggers; the package claims no authoritative data and gives no FAR/height/investment conclusions.