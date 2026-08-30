# 方案迭代记录

## v0.1 - 2026-08-29

- Replaced the copied visual-identity direction with the unique `jingzhang-ai-food-systems` theme: AI food systems, civic markets, shared kitchens and food learning.
- Added the three-district / three-kitchen / two-wing / two-market / one-loop spatial and industry structure.
- Added 6 traceable public case references, 12 scenario cards, 3 industry test protocols, 7 personas, public-interest safeguards and annual operations.
- Rebuilt bilingual proposal text, visual index, six original figure pairs and four bilingual PDF drawings using a local Noto font.
- Reconciled formal `site_area_sqm`, `green_ratio` and `public_space_ratio` values across geometry, `metrics.json` and visual `data-value` attributes; all remain provisional.
- Replaced agent metadata so this package records direct Codex assembly without an external harness or background agent.
- Self-check reports and manifest hashes are generated only after final package validation.

## v0.2 - 2026-08-29

- Added explicit spatial/geometric evidence registration for `SITE-001` and the three key areas; official boundaries, ownership and controls remain `unknown/to_verify`.
- Expanded all 12 scenario cards and all 3 industry test protocols to show inputs, model and human review, outputs, responsibility, metrics and exit conditions.
- Added a machine-readable requirements traceability block covering agent.1-agent.6, all 13 review dimensions, disabled items and boundary clauses.
- Added 12 operational metrics as honest `unknown` values plus an operational-baseline assumption; no local scorer result is treated as CocoSgt review.
- Updated the phase language to near 1-3 years, mid 3-5 years and long 5-10 years with stage gates.

## v0.3 - 2026-08-29

- Addressed CocoSgt review `5056078656` for the current `fc8ca23` submission: rebuilt `site-overview` and `key-areas` figure pairs with explicit bilingual node names, functions, wing connections and non-statutory warnings; English B/C cards no longer overlap, truncate or overflow.
- Rebuilt the bilingual A0 and A3 PDF boards from the corrected local figures and re-rendered the report HTML from the current proposal text.
- Embedded per-page Noto Sans SC WOFF subsets into all four HTML surfaces using the local source `NotoSansSC-Static.ttf`; recorded the source version, SHA-256, OFL metadata and each embedded subset hash in `visual/assets/asset_rights_ledger.json`. No independent font authorization is claimed.
- Ran the offline preview generator; HTML/PDF raster previews were skipped because Playwright and PyMuPDF are not installed, while eight local figure previews were refreshed. Formal gates and manifest hashes are rerun after this entry.

## v0.4 - 2026-08-29 (CocoSgt review 5056189027)

- Closed the two visual blockers in the 83/100 `CHANGES_REQUESTED` review: moved the site-overview evidence loop into a dedicated band below the three color blocks, reserved text bands inside every card, and rewrapped bilingual labels so bullets are complete and unobscured.
- Re-exported the bilingual site-overview/key-areas figures and rebuilt the bilingual A0/A3 boards from those figures. A0 page 1 now has one board-level title band, one fully visible status label, and local panel titles without the former global overlay; title, explanatory text, footnote and provisional warning were checked at a 90-dpi screen/print proxy.
- Re-rendered both report HTML files and re-embedded the local Noto Sans SC WOFF subsets. Font source/version/SHA-256, OFL metadata, and embedded subset hashes remain in `visual/assets/asset_rights_ledger.json`; no unverified authorization is claimed.
- Refreshed the eight local figure previews and manifest. Playwright and PyMuPDF are unavailable in the bundled runtime, so HTML/PDF raster preview generation remains an honest skip; direct `pdftoppm` A0 first-page inspection was used instead.
- Re-ran formal self-check, strict manifest validation, manifest schema, four independent review gates, and font coverage. Local checks are not CocoSgt scoring; official review remains authoritative.
