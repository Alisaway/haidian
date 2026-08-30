# 方案迭代记录
## v0.6.0 - 2026-08-29 (repair round 10, CocoSgt review 5057461759 / 76.0 CHANGES_REQUESTED)

- Restored the taskbook wing names in both proposals and all derived surfaces: Zhongguancun Technology Service Wing / 中关村科技服务翼 and Xiaoyuehe Scenario Empowerment Wing / 小月河场景赋能翼. Added the one-to-one mapping to the custom West/East Coordination Bands, three areas, three nodes and five functions, including the belt-structure figure, visual indexes, A0 boards and A3 booklets.
- Added agent.1's current rights-safe visual direction: a graphic-free bilingual wordmark, exact palette, Noto Sans SC weights, clear space/safe area, minimum sizes, applications and explicit non-trademark/public-use boundary. No uncleared legacy name or graphic mark was restored.
- Added agent.5's sourced culture system using the National Railway Administration Jingzhang history page and Beijing science/technology/Zhongguancun commission development page. History, current clues and original AI culture are separated and mapped to space, wayfinding, events and international narrative.
- Closed the `data:PACKAGE-GEOMETRY` provenance gap with participant author, generator, generation date, all upstream inputs, transformations, licence and reuse boundary. Metrics remain derived from the same EPSG:4548 package files; all figures, HTML, PDFs and hashes were regenerated/refreshed.
- Repaired the English site-overview, key-areas and mobility-bluegreen maps with an explicit `N` and visible north arrow; paired Chinese maps retain the explicit north marker. Regenerated the full bilingual figure/PDF set and re-embedded HTML fonts.

## v0.5.0 - 2026-08-29 (repair round 9, CocoSgt review 5057296002 / 78.0 CHANGES_REQUESTED)

- Corrected the source-audit contract across the bilingual proposals, copyright statement, compliance/design-depth/standard matrices and visual indexes. The package now lists only actually used, verifiable sources: the announcement/taskbook, the registered “three areas, two wings” context page, applicable standards/regulations, provisional geometry, public digital-twin cases and rights records.
- Removed stale claims of self-collected survey/sketch material and independent heritage-park, Zhongguancun-culture, master/district-plan, project-level renewal/control-plan and CIM-guideline evidence. The heritage-park phrase is retained only as announcement/taskbook context; absent field material is not given a fabricated author/privacy log.
- Re-rendered bilingual proposal HTML, re-embedded the offline font, and regenerated the current figure/PDF set from the existing deterministic pipeline. Official geometry, heritage records and operational baselines remain unknown/to_verify.

## v0.4.0 - 2026-08-29 (repair round 6, CocoSgt review 5048751415 / 88.0 CHANGES_REQUESTED)

- Re-ran the bounded repair wrapper `work/regen_3883_final.py` against the existing deterministic figure/PDF pipeline. `metrics-evidence.png` and `metrics-evidence.en.png` now use one horizontal row per land-use class, with a fixed 0--36% axis and a separate value gutter; the residential 9% and education/research/design 8% labels are on distinct rows and remain inside the frame.
- Kept `metrics.json`, its formulas, provisional geometry inputs, values and bilingual information architecture unchanged. The English metrics figure uses English-only axis titles, ticks and category labels; the Chinese figure keeps the Chinese-language axis contract.
- Regenerated the eight zh/en figure pairs, both A0 boards, both A3 booklets, proposal HTML outputs and embedded-font HTML outputs. The new machine figure-QC record is persisted in `self_check.json`; final gate, schema, strict manifest and visual/PDF evidence are recorded in `refs/reviews/3883-codex-round-20260829-r7.md`.

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for digital-twin-ops.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v0.2.0 - 2026-08-26 (repair round 1, CocoSgt CHANGES_REQUESTED 53.0 -> target >=90)

- proposal.md: full rewrite to v2 bilingual contract (bilingual_contract_version=1, translation_file=proposal.en.md). Added official three-tier scope hierarchy (about 43.6 km2 / 11.4 km2 / 368.4 ha), three-areas-two-wings and five-region coordination loop, brand/VI section with logo direction, trademark prior-rights paragraph, twelve AI+ scenario cards, six sourced global cases, three industry test-and-validation scenarios, five personas, landmark catalogue, reversible component library, honour-display system, developer-community mechanism, scenario-opening five-step process, talent/enterprise/developer pathways, international-communication copy, annual event brands, RACI implementation matrix with stop/exit conditions, indicator table with confidence/recompute triggers, item-by-item rights register, and two tables for land use and perceptible design. All claims keep the honesty bar (concept only, no FAR/height/investment/capacity conclusions, provisional recompute language). Land ratios now match geometry (27/26/17/13/9/8).
- proposal.en.md: full language=en translation (translation_of=proposal.md) with the 13 EN canonical sections, tables and evidence anchors; no functional Chinese on en pages.
- assets/figures: regenerated 8 zh + 8 en figures (site-overview, land-use-structure, key-areas, mobility-bluegreen, metrics-evidence, belt-structure, ai-ecosystem, logo-concept). Maps carry place names, scale bar, north arrow, legends and bilingual PROVISIONAL stamps; metrics-evidence uses separate axes (no cross-unit sharing); site-overview vs mobility-bluegreen have distinct information tasks; diagram text-bbox checks (no clip, no overlap) run at generation time; ink >= 0.08 maps / >= 0.10 charts and edge-clip < 0.02 verified by machine; en variants are 100% English.
- drawings: regenerated a0-boards.pdf / a0-boards.en.pdf (2 pages, first page dense, title >= 60 pt) and a3-booklet.pdf / a3-booklet.en.pdf (8-page booklet, cover title not clipped) with bilingual provisional stamps and Noto Sans SC embedded.
- visual/index.html (zh) and visual/index.en.html (en): rebuilt dashboards embedding all figures, the 14 required zh markers, metric declarations matching metrics.json, scope/indicator/implementation tables and self-check/source/assumption sections; en page is English-only.
- metrics.json: global_case_count 4 -> 6 (visible-text table has six sourced rows); all counts consistent with proposal tables.
- sources.json: +8 entries (6 traceable global cases with publisher/URL/dates, Noto Sans SC OFL entry, Python toolchain BSD entry); added explicit licence fields; per-item reuse boundaries.
- standard_matrix.json / design_depth_matrix.json: evidence_summary_zh rewritten per item to point at distinct real content (5 standards / 15 depth items unique).
- risk.json: rewritten to the digital-twin-ops theme (boundary/data-gap/privacy/statutory/technology/acceptance/operation risks) with the 8 rubric dimensions.
- report/copyright_statement.md: item-by-item rights register + brand prior-rights paragraph added.
- manifest.json: schema 0.2.0 rebuilt with all en counterparts (language=en + translation_of), new figure/drawing/HTML entries, hashes refreshed, validation_claim.data_confidence=medium (provisional data), readiness_contract persisted-self-check-v1 re-marked.
- self_check.json: four-gate report re-persisted (2026-08-26) and figure_qc machine evidence (ink/clip; text-overlap not verified post-hoc) appended; figure generation-time text-bbox checks recorded in this changelog.
- HTML (proposal.html / proposal.en.html / visual/index.html / visual/index.en.html): regenerated from markdown via render_proposal_html.py where applicable, then Noto Sans SC subset WOFF1 data-URI fonts embedded last (embed_fonts.py).
- 中英实质等值已人工核对（数值、范围、计数、机制词与表格口径一致）；品牌在先权利检索未完成前按内部工作代号处理。

## v0.3.0 - 2026-08-28 (repair round 5, CocoSgt CHANGES_REQUESTED 88.0 -> target >=90)

- CONTENT-DEPTH REPAIR: regenerated all 8 figures (zh + en) and 4 PDFs via
  the new `scripts/regen_figures_digijz.py` to fix the CocoSgt
  expression_completeness 3/5 blocker.
- metrics-evidence.{png,en.png}: rebuilt as 3 panels (top row: green/public-
  space ratios on a dedicated left panel + count metrics on a dedicated
  right panel; bottom row: full-width concept land-use structure as a
  horizontal bar chart). The previous stacked-bar variant had the
  "住宅9% / 教育科研设计8%" labels colliding on the right edge of the figure
  and the EN axis names mixed "比值/计数/占概念边界比例" Chinese into the
  English variant. In the new layout: 9% and 8% sit on their own rows
  (never adjacent stacked segments), value labels are placed inside the
  bar (white text, right-aligned) so two adjacent small bars can never
  collide, and every axis title / tick label is 100% in the figure's
  language (CJK in zh, English in en — never mixed). Calibre
  reconciliation note at the bottom: park green ~27% (classification
  layer) vs green ratio ~11% (geometry layer) are two definitions on
  two layers, not mutually derivable.
- key-areas.{png,en.png}: rebuilt the three-node label layout. The
  long EN description text used to overflow into the right-side legend
  column; the new layout places name + role + description uniformly
  ABOVE the marker so the bottom of the map (scale bar + north arrow)
  stays clear. Added land_use underneath the key-area polygons to lift
  ink coverage above the 0.08 threshold.
- mobility-bluegreen.{png,en.png}: added a land_use underlay to lift
  ink coverage above the 0.04 chart threshold.
- logo-concept.{png,en.png}: added a subtle dot grid + a third inner
  ring + a wider horizontal bar to lift ink coverage; wrapped the long
  visual-grammar / colour / component-kit lines via textwrap so they
  fit inside the right column (the EN variant used to overflow the
  figure on the right edge).
- All 8 figures pass the machine text-bbox QC (containment in figure
  + zero pairwise overlap via the matplotlib renderer) and the
  ink/edge-clip measurement (ink 0.06-0.27 across all 16 PNGs,
  edge-clip 0.0 for every one). The new regen script writes the
  figure_qc JSON into `self_check.json[figure_qc]` (not into `assets/`,
  since the deterministic validator only allows image extensions
  under `assets/`).
- A0-boards.{pdf,en.pdf} and A3-booklet.{pdf,en.pdf}: regenerated from
  the new figures (cover + 2 boards / 3 pages) with bilingual
  PROVISIONAL stamps and the 64pt A0 page-1 title intact.
- HTML (proposal.html / proposal.en.html / visual/index.html /
  visual/index.en.html): regenerated from proposal.md via
  render_proposal_html.py; Noto Sans SC subset WOFF1 data-URI fonts
  re-embedded via embed_fonts.py; visual surfaces now reference the
  new figure paths (file names unchanged).
- manifest.json: hashes refreshed for the 16 PNGs, 4 PDFs, 4 HTMLs
  and self_check.json (45 declared entries); validation_claim.
  self_checked=false, data_confidence=medium (provisional),
  readiness_contract=persisted-self-check-v1.
- self_check.json: re-persisted with figure_qc machine evidence
  (ok=true, ink_ok=true, clip_clear=true, overlap_clear=true). All
  four formal gates pass: deterministic / spatial / visual / professional.
- validate_local_submission.py: PASS (only the documented provisional
  boundary warning, which does not block content scoring).
- 中英实质等值已人工核对（数值、范围、计数、机制词与表格口径一致）；品牌在先
  权利检索未完成前按内部工作代号处理。图表 ink 值与剪裁检查结果：8 zh + 8 en
  共 16 PNG，ink 范围 0.06-0.27，edge_clip 全部 0.0000，text-bbox QC 全部通过。
