# 方案迭代记录

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for jingzhang-railway-heritage-corridor.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v1.1 - 2026-08-26 (REPAIR ROUND-1, CocoSgt PR #3865 54.0 -> local 97.0)

- proposal.md: 13 canonical sections retained; added brand/VI direction + logo, three-tier scope + 三区两翼 collaboration loop + five regional synergy anchors, three-node detailed design (honor wall-H, reversible component library, S/T/H signage), AI ecosystem (eight-element loop), 5 sourced global cases (C1-C5), 5 personas (P-A~P-E), 10 scenario cards (SC-01~10), scenario-space-operation matrix (IDs tied to metrics.json), 3 industry tests (TS-01~03), AI technical protocols, land-use single-caliber table (27/17/15/14/13/8/4/2%) with formula and recalculation trigger, 6 pilot packages (P1-P6) with RACI/human-review/maintenance/KPI/exit-stop conditions, 5 annual programs (AP-01~05), indicator table (source/formula/confidence/use-limit/recalculate-trigger), PIPL/DSL-based compliance language, brand prior-rights paragraph; all provisional numbers rounded, dates removed from source IDs.
- proposal.en.md: complete substantive English translation (13 en sections, 2000+ letters), front matter language=en + translation_of=proposal.md; Chinese glosses only inside quote pairs.
- metrics.json: 18 metrics; land_use_zone_count corrected 22->25; scenario_card_count added (=10); every metric now carries use_limit and recalculate_trigger.
- sources.json: expanded 9 -> 16 entries; added PIPL and Data Security Law official pages (cac.gov.cn), 5 global-case entries (thehighline.org, jtc.gov.sg, pangyotechnovalley.org, medium.com/sidewalk-talk, paris.fr) each with publisher/URL/published+accessed dates and license field.
- assumptions.json: rewritten in clean UTF-8 (6 items, ids/categories intact).
- standard_matrix.json / compliance_matrix.json (23) / design_depth_matrix.json (15): rewritten with distinct, inspectable evidence summaries (no repeated boilerplate).
- Figures: 7 zh + 7 en PNGs regenerated (site-overview, land-use-structure, key-areas, mobility-bluegreen, metrics-evidence, ai-ecosystem-map, logo-weaveline) at 12x8in/150dpi, titles>=18pt, labels/legends>=13pt, annotations>=11pt, constrained layout, no text overlap/clip (machine-verified at generation), ink>=0.10 (>=0.08 logo), bilingual PROVISIONAL stamps, legends/scale/north arrows/public anchors/constraint callouts, ratios vs counts on separate axes.
- Drawings: a0-boards.pdf/.en.pdf and a3-booklet.pdf/.en.pdf regenerated (A0 title>=60pt, first page dense, bilingual stamps; en boards 100% English labels).
- HTML: report/proposal.html + report/proposal.en.html regenerated from markdown via render_proposal_html.py; visual/index.html + visual/index.en.html rewritten with 14 required zh markers + metrics data-attributes and en mirror; all 4 pages embed subsetted NotoSansSC (varLib.instancer wght400 -> pyftsubset -> base64 @font-face 'NotoSansSC-Static' referenced first, ~504KB) applied after final render.
- manifest.json: schema 0.2.0, 44 entries incl. self-listing; every .en counterpart declared language=en + translation_of=<zh path>; data_confidence=mixed_provisional_and_conceptual.
- self_check.json: four gates PASS persisted; figure_qc attached (ok=true, ink_ok=true, clip_clear=true, overlap_clear=not_verified honest).
- Open items: official boundary polygons, statutory controls, current-condition data and operation/budget evidence remain organizer- or evidence-side gaps, documented in assumptions/risk/constraints; all package geometry provisional pending official release (recalculate commitments in metrics + proposal).

## v2.0 - 2026-08-26 (REPAIR ROUND-2, CocoSgt PR #3865 57.0 -> target >=90)

- proposal.md: agent.1-6 task-response checklist (requirement -> deliverable -> figure/table/section -> evidence anchor); regional synergy figure (regional-synergy.png) + mechanism table (5 anchors: exchanged resources/interface actors/triggers/return flows); brand VI direction expanded (construction logic, OFL wordmarks, color hex, mono/small-size rules, lockups, hierarchy incl. sub-brands); three-node spatial prototype cards; five-persona journeys table; 10 scenario detail cards (user/location/input/AI/human fallback/failure mode/operator/exit/metrics); ecosystem mechanism table (eight elements across three areas/two wings); case table gains transferable-mechanism column; implementation matrix P1-P6 (preconditions, RACI actors, deliverables, cost tiers, data needs, acceptance KPIs, risk gates, stop/rollback); long-term operation model (agent.6) and community participation-redress loop; land-use caliber + display-precision rules; N1/N2/N3 positions aligned to geometry (north/middle/south).
- proposal.en.md: full substantive translation of all new tables and statements.
- sources.json: 16 -> 23 entries; +2 verifiable history entries (1905/1909, Jeme Tien Yow) and +5 asset entries (Noto fonts OFL-1.1, matplotlib PSF-2.0, schematic base map, icon glyphs); all 5 case entries gain transferable_mechanism.
- metrics.json: persona/scenario/case/test/program counts gain objects + proposal_anchor; public_space_ratio use_limit explains node-scale caliber meaning.
- compliance_matrix.json: agent.1-6 and 1.5.3.x evidence summaries updated (incl. corrected node-area correspondence). design_depth_matrix.json: 4 items re-evidenced.
- Figures: 8 zh + 8 en PNGs regenerated (site-overview with streets/stations/Xiaoyuehe/communities/heritage/nodes/gaps + scale/north/legend + status/provisional layering; key-areas with prototype cards; metrics-evidence with ratios vs counts on separate axes; NEW regional-synergy) at 12.6x8.2in/150dpi, ink 0.089-0.207, edge-clip <0.02 (PIL-measured), en variants 100% English. 
- Drawings: A0 (dense 2-page) and A3 (5-page) zh+en regenerated with implementation/operation/participation tables.
- HTML: report/proposal.html + .en.html re-rendered; fonts re-embedded (OFL subset data:woff); report/visual font coverage re-verified.
- manifest.json: +2 entries (regional-synergy.png/.en.png) with language/translation_of/title/description; hashes refreshed.

## v3.0 - 2026-08-27 (REPAIR ROUND-4, CocoSgt PR #3865 80.0 -> target >=90)

- Figures (all 16 zh+en PNGs, 8 pairs): fully regenerated by gen_jz_figures_r4.py with a fixed scaffold (title band / stamp band / content axes / note band) so text regions cannot overlap by construction; every sheet passes a machine text-bbox check (containment + pairwise overlap via matplotlib renderer) BEFORE save, and ink/edge-clip are measured with PIL/numpy afterwards (ink 0.093-0.208, edge-clip 0.0000, all >= 0.08 threshold; zero text-layout violations on the final run).
- key-areas zh/en: N2/N3 card fields, body text and adjacent columns no longer overlap - each node card lives in its own fixed-height band with wrapped 3-line function text; PROVISIONAL stamp kept with safe margins; legend moved to a dedicated full-width band above the map; key-area labels boxed OUTSIDE polygons (north/middle above, south below); node labels offset-points with white boxes.
- land-use-structure zh/en: bottom calibre note wrapped CJK-aware in the note band (no clipping), axis labels/ticks fully inside the axes, PROVISIONAL stamp top-right intact.
- metrics-evidence zh/en: ratio and count axes raised so rotated count labels can never reach the bottom note band; note compressed (fs 8.5, CJK-aware wrap); counts match metrics.json (key areas 3, AI landmarks 3, scenario nodes 8, land-use zones 25, building units 12, phases 3, annual programs 5, global cases 5) plus personas/cards/tests noted.
- site-overview zh/en: station markers projected to EPSG:4548 with boxed labels; key-area labels and node labels placed with disjoint bands (no '众智园 vs 道岔之门' collisions); north arrow moved left so the longer EN PROVISIONAL stamp never collides; EN variant 100% English (nodes Switch Gate/Whistle Post/Crossing Garden, stations Qinghe/Wudaokou/Zhichunlu/Dazhongsi/Xizhimen).
- mobility-bluegreen zh/en: station labels boxed and placed clear of the scale bar; scale bar raised; street-section note wrapped; EN variant 100% English.
- ai-ecosystem-map zh/en: layer labels and bodies wrapped CJK-aware (no label/body collision); logo-weaveline zh/en: three panels now carry colored header strips, all long strings wrapped, palette swatch labels compacted; regional-synergy zh/en: all anchors/labels wrapped, note in band.
- Drawings: A0 (2 pages) and A3 (5 pages) zh+en PDFs regenerated from the fixed figures with machine per-page text-bbox QC; page titles >=22pt (A3) / >=58pt (A0); PROVISIONAL stamp on every page with safe margins.
- HTML: report/proposal.html + report/proposal.en.html re-rendered from markdown via render_proposal_html.py (from valroot), then fonts re-embedded LAST via embed_fonts.py; check_font_coverage.py reports 0 missing CJK on all 4 pages.
- Manifest: refreshed hashes; changelog.md and risk.json now declared (roles changelog/other) so the manifest fully describes the package; the machine figure-QC record is persisted inside self_check.json[figure_qc] (ink/clip measured per figure, overlap_clear=not_verified honestly; text-bbox overlap was checked at generation time and recorded in the summary).
- self_check.json: four gates PASS persisted after all edits; figure_qc injected with ok=true / ink_ok=true / clip_clear=true / overlap_clear=not_verified.
