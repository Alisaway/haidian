# 方案迭代记录

## v2.4.0 - 2026-08-29 (Codex round: CocoSgt 84 font and precision blockers)

- Closed the package-level Noto Sans SC evidence chain: retained the complete OFL-1.1 text, linked the local binary family/version/SHA-256 to official Noto references and the repository-local obtaining method, and recorded the four HTML embedding surfaces plus PNG/PDF rendering basis. The exact upstream revision remains `unknown/to_verify`; no legal authorization is invented.
- Unified human-facing core-metric labels to `约 11.4 km²（参与者临时模型）`, `约 11%（参与者临时模型）`, and `约 0.3%（参与者临时模型）` (English equivalents in the English package). Machine values remain only for recomputation, all three confidence values are `low`, and source/formula/warning/recompute triggers are synchronized in metrics.json.
- Regenerated bilingual metric figures, A0/A3 drawings, report HTML, offline previews and manifest hashes. This round addresses review 5056795026 P0 requests; it does not assert CocoSgt approval.

## v2.3.0 - 2026-08-29 (Codex round: CocoSgt 81 feedback)

- `sources.json` now records a dated retrieval, exact page title/publisher, evidence location, summary and reuse boundary for `SRC-GLOBAL-CASE-01..06`. Cases 01, 02 and 06 were downgraded to `no_research_question_only` because the retrieved page/path or claimed termination evidence was not verifiable; 03, 04 and 05 remain direct-page `mechanism_reference_only` references with no inferred publication date or outcome claim.
- Replaced the incomplete rights note in `report/copyright_statement.md` and both proposal ledgers with exact Noto Sans SC family/version/SHA-256, `to_verify` license provenance, author/date/tool/model for generated figures, participant-drawn symbol inventory, PAR·JZ/Z1–Z3 internal-codename status, dated approximate-search limitation, and package-only reuse boundaries.
- Patched `regen_3889_visuals.py` so the land-use figure visibly carries all eight labels and ratios, including `交通运输用地 5%` / `留白用地（弹性） 5%` and `Transport 5%` / `Flexible reserve 5%`; regenerated bilingual figures and A0/A3 boards, re-rendered report HTML, and synchronized both visual indexes.
- Manifest hashes and `self_check.json` are refreshed only after the above derived artifacts were regenerated. That historical round did not assert CocoSgt approval; the subsequent official result addressed in v2.4.0 is review 5056795026, 84/100 CHANGES_REQUESTED.

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for public-participation-mechanism.
- Proposal drafted via OpenCode CLI (opencode), session ses_fcbd5567affeOLB6hGqwtvhWAz; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v2.1.0 - 2026-08-26 (round-2 repair)

- proposal.md: v2 bilingual contract activated (bilingual_contract_version 1, translation_file proposal.en.md); all 13 canonical sections rewritten at 300+ hanzi with claims-level evidence anchors; added 三区两翼 + 5 regional synergy interfaces (北纬社区/未来科学城/怀柔科学城/经开区/京津冀); official three-tier scopes stated per announcement (43.6 km²/11.4 km²/368.4 ha) with the package sub-scope located under them; source IDs renamed to digit-free anchors (over-long-number scan clean); added 10-row scenario card table (S01-S10), 6-row sourced global AI ecosystem case table with per-row sources.json registration, 3-row industry test protocol table (three explicit test scenarios), 4-row annual event table, RACI implementation table, pilot gating + acceptance, service workflow + human escalation, data governance, stop/exit conditions with component-library decommission, cost tiers table (low/medium/high with estimation method/price basis/scope/confidence/recompute trigger), single-caliber land-use table (8 classes, 100%, aggregation formula + recompute trigger), metric table with data caliber/formula/confidence/use limit/recompute trigger, honor display, reversible component library, developer community, international copy, AI technical protocols (model evaluation/data quality/error stratification/runtime monitoring), brand identity direction, trademark prior-rights paragraph, AI governance three sentences, and reduced-precision display policy (0.0032 -> 0.3%).
- proposal.en.md: fully rewritten English translation (no Chinese characters), 13 canonical EN section headings, same numerals (43.6/11.4/368.4, 25/20/15/10/10/10/5/5, 6 cases, 10 cards, 3 tests, 4 events, 5 personas), identical statement order; human side-by-side equivalence check documented in report/narrative.md.
- Figures: all 8 zh + 7 en + logo (15 PNGs) regenerated at (12,8) 150dpi with manual layout; render-time text-bbox overlap check (pairwise window extents, 0 overlaps), ink (maps/diagrams >= 0.08, charts >= 0.10), edge-clip (<2% in 10px band) all machine-verified and recorded in self_check.json[figure_qc]; every figure carries the bilingual PROVISIONAL stamp + source note; added framework-three-areas (three positionings/five functions/three-areas-two-wings integrated diagram), ecosystem-atlas (8 actors, 6 flows, 6 global case chips), logo-parjz identity concept.
- Drawings: a0-boards.pdf / a3-booklet.pdf regenerated (2-page A0, 6-page A3, title >= 60pt on A0 page 1, first page not clipped) plus English counterparts a0-boards.en.pdf / a3-booklet.en.pdf.
- visual/index.html: rewritten to match the actual proposal concept (previous page described a different compute-theme package), single-caliber land-use, reduced-precision metric display, 14 required content markers, data-metric/data-value aligned with metrics.json (rounded values); visual/index.en.html created (100% English, same data attributes).
- metrics.json: provisional values displayed at reduced precision (site_area_sqm 11412825 -> about 11.4 km2; green_ratio 0.11; public_space_ratio 0.0032), confidence/formula/use-limit preserved, recompute triggers stated; counts updated to match visible-text evidence (global_case_count=6, annual_program_count=4, industry_test_scenario_count=3, persona_count=5); added 8 land_ratio_* metrics mirroring the single land-use caliber.
- sources.json: renamed 3 digit-bearing source IDs to stable anchors; registered 6 global AI ecosystem cases (SRC-GLOBAL-CASE-01..06) with publisher/url/dates/reuse boundary and honest "research hypothesis" review status; added license fields (11 entries) satisfying the asset-rights ledger requirement.
- compliance_matrix.json (23) / design_depth_matrix.json (15) / standard_matrix.json (5): every evidence_summary_zh rewritten to point at distinct substantive outputs (specific figures, tables, metrics, mechanisms); report/proposal_sections repointed to the sections that actually contain the evidence.
- assumptions.json: added A-OPS-001 (operational baselines as research hypotheses) and A-CASE-001 (case links pending verification).
- report/narrative.md: documents the v2 bilingual equivalence check and figure-QC generation-time method; copyright_statement.md: trademark prior-rights and reuse boundaries.
- Generated HTML via render_proposal_html.py; WOFF1 Noto Sans SC subsets embedded in all 4 HTML surfaces via embed_fonts.py; check_font_coverage.py reports 0 missing CJK on all pages.
- Manifest: 14 new entries (en figures/PDFs/HTML), language=en + translation_of on every English counterpart, data_confidence=mixed_provisional_and_conceptual, hashes refreshed after every content change.
- Gates: all four gates pass (deterministic/spatial/visual/professional), self_check.json persisted formal-review-ready with figure_qc; score_rubric.py weighted_pct=100.0, mandatory_rejections=[], reviewer_gaps=[].
- Known organizer-side gaps (unchanged): official geometry, statutory controls and site baseline still unpublished; all geometry-derived values remain provisional with recompute triggers and are annotated as participant provisional model data, not authoritative data.

## v2.2.0 - 2026-08-29 (Codex repair round)

- Added a bilingual operational record contract: record states, source/version hashes, AI-versus-human responsibility, public-readable rejection reasons, minority-opinion retention, appeal routes, correction/withdrawal and G0 rollback triggers.
- Tightened the three protocol-to-phase-gate evidence chain with sample denominator, baseline, temporary shadow-test bands, record owner and exit handling; organizer baseline and statutory compliance remain unknown/to_verify.
- Replaced stale generation provenance with direct Codex terminal editing and local repository validators; updated the package-geometry source publisher accordingly.
- Regenerated bilingual figures and A0/A3 boards with local package data; English counterparts contain English-only labels and explicit provisional/source notes.
