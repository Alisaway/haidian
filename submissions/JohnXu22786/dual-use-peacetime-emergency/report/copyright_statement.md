# Copyright, provenance and complete rights ledger

This is a package-level evidence ledger, not a legal clearance opinion. The one status contract below is shared by `proposal.md`, `proposal.en.md`, `sources.json`, `manifest.json`, the reports, the visual indexes and every generated derivative. A citation gives no permission to reproduce a source-page asset, and a concept label gives no approval, partnership, trademark or implementation right. No unresolved third-party asset is retained in this deliverable: no third-party photograph, screenshot, map tile, external logo, external drawing or long quotation is embedded.

## Ledger fields and package boundary

The controlled statuses are:

- `evidence_backed_package_display_only`: author/generation method, source/input, boundary, allowed use, restriction and SHA-256 evidence are recorded for repository/community `COMMUNITY-DISPLAY-ONLY` display and attributed concept adaptation only. It is not public-release, commercial, engineering or legal clearance.
- `evidence_backed_provisional_display_only`: the same evidence boundary applies to provisional geometry/data; values are concept geometry, not an official survey, ownership record, statutory polygon or performance result.
- `license_verified_scoped_embedding_only`: the local Noto Sans SC file has a pinned hash and the complete SIL OFL 1.1 text below; use is limited to the stated offline HTML and figure/PDF rendering/redistribution conditions.
- `citation_only_no_asset_rights`: an external page or case is used for attributed facts/mechanism references only; its page layout, image, map, logo, dataset and brand are not included.
- `internal_codename_prior_rights_unchecked`: names and the working mark remain internal codenames until a separate prior-rights/trademark search and clearance; no clearance is claimed.
- `reproducibility_record_not_redistributed`: local build/validation code and dependency records document how this package was made; they are not claimed as package assets or as professional approval.

The word `verified` in an external case row means only that a short public fact was checked against the named first-party page; it never means that the page, logo, image, dataset or other source asset is licensed for reuse. Rights decisions use the explicit status vocabulary above and the `rights_contract` in `sources.json`; no source-row review label overrides that contract.

The current-round diagrams, text edits, HTML/PDF packaging and working mark were made directly in Codex and built deterministically from package geometry, metrics, labels and short cited facts. Historical provenance of retained provisional geometry is separately marked as historical and does not mean the current round invoked that tool. For every package path, the SHA-256 is recorded in `manifest.json` at `files[path].sha256` after the final deterministic build; this ledger and the source IDs below are the human-readable evidence anchors.

## Complete path-level asset ledger

| Path / asset set | Author / rightsholder | Source / input | Licence / version | Public display and adaptation | Attribution | Generator / model / terms |
|---|---|---|---|---|---|---|
| `proposal.md` | JohnXu22786 | Taskbook, official/cited source summaries, package geometry, review ID 5058033387 | Original concept text; `COMMUNITY-DISPLAY-ONLY` | Repository review and concept adaptation with attribution; no official or implementation use | JohnXu22786; cite `sources.json` IDs for external facts | Direct Codex repair; Codex runtime model ID not exposed; current task permits repository review, no third-party text beyond short attributed facts |
| `proposal.en.md` | JohnXu22786 | English translation of `proposal.md` and same evidence | Original translation; `COMMUNITY-DISPLAY-ONLY` | Same as Chinese proposal; human equivalence review remains required | JohnXu22786; source IDs retained | Direct Codex repair and deterministic translation edit; same terms |
| `report/narrative.md` | JohnXu22786 | Structured package records, five case records, scenario/test summaries | Original evidence supplement; package display only | Offline review and adaptation as a concept evidence note | JohnXu22786; source IDs in table | Direct Codex repair; no external generated media |
| `report/proposal.html` | JohnXu22786 / repository | `proposal.md`, local package PNGs, local embedded Noto subset | Local rendered wrapper; build-time dependencies not redistributed | Offline display and review; no remote loading or public legal publication implied | JohnXu22786 plus cited source IDs | `render_proposal_html.py`, direct Codex repair; local Python/Markdown renderer; no external HTML assets |
| `report/proposal.en.html` | JohnXu22786 / repository | `proposal.en.md`, English local PNGs, local embedded Noto subset | Local rendered wrapper; build-time dependencies not redistributed | Offline display and review; same boundary | JohnXu22786 plus cited source IDs | `render_proposal_html.py`, direct Codex repair; no remote HTML assets |
| `visual/index.html` | JohnXu22786 / repository | `metrics.json`, six local Chinese PNGs, embedded Noto subset | Original offline index; build-time dependencies not redistributed | Offline display and review; adaptation only as package concept | JohnXu22786; source IDs in package | `build_3885_visual.py`, direct Codex repair; no remote images, fonts or scripts |
| `visual/index.en.html` | JohnXu22786 / repository | `metrics.json`, six local English PNGs, embedded Noto subset | Original offline index; build-time dependencies not redistributed | Offline display and review; same boundary | JohnXu22786; source IDs in package | `build_3885_visual.py`, direct Codex repair; no remote assets |
| `assets/figures/site-overview.png` and `site-overview.en.png` | JohnXu22786 | Package labels, provisional geometry and concept relationships | Original deterministic diagram; PNG output | Repository display and concept adaptation with attribution; not a survey/redline | JohnXu22786 | `build_3885_outputs.py`; direct Codex-labelled build; Matplotlib/Pillow; no third-party basemap |
| `assets/figures/ai-ecosystem.png` and `ai-ecosystem.en.png` | JohnXu22786 | Five first-party case summaries in `sources.json`, eight support conditions and proposal mechanisms | Original deterministic diagram; citation-only case facts | Repository display and concept adaptation; no case-party endorsement or partnership implied | JohnXu22786; cite C01/C02/C03/C04/C07 | `build_3885_outputs.py`; direct Codex repair; no logos, screenshots or copied case graphics; exact runtime model ID not exposed |
| `assets/figures/key-areas.png` and `key-areas.en.png` | JohnXu22786 | Provisional node geometry and proposal tasks | Original deterministic diagram | Repository display and concept adaptation; locations remain provisional | JohnXu22786 | `build_3885_outputs.py`; Matplotlib/Pillow; no third-party imagery |
| `assets/figures/land-use-structure.png` and `land-use-structure.en.png` | JohnXu22786 | Proposal concept shares and metric boundary note | Original deterministic diagram | Repository display and concept adaptation; not existing/statutory/geometric land use | JohnXu22786 | `build_3885_outputs.py`; Matplotlib/Pillow; no map or external data |
| `assets/figures/mobility-bluegreen.png` and `mobility-bluegreen.en.png` | JohnXu22786 | Package concept route relationships and provisional geometry | Original deterministic diagram | Repository display and concept adaptation; no right-of-way or capacity claim | JohnXu22786 | `build_3885_outputs.py`; Matplotlib/Pillow; no third-party map |
| `assets/figures/metrics-evidence.png` and `metrics-evidence.en.png` | JohnXu22786 | `metrics.json` and its formulas | Original deterministic diagram | Repository display and concept adaptation; not measured performance | JohnXu22786 | `build_3885_outputs.py`; Matplotlib/Pillow; data boundary remains in `metrics.json` |
| `assets/figures/logo-brand.png` and `logo-brand.en.png` | JohnXu22786 | Current-round original geometric working mark and package name | Original package working mark; no trademark clearance claimed | Internal/repository concept display only; public or commercial use requires a fresh name/mark search and clearance | JohnXu22786; “original deterministic working mark” | `build_3885_outputs.py`; direct Codex repair; no external logo, font image or brand asset; not registered and not an endorsement |
| `drawings/a0-boards.pdf` and `a0-boards.en.pdf` | JohnXu22786 | Six local figure pairs composed into two language-specific boards | Original compilation; PDF export version generated 2026-08-29 | Offline review and concept adaptation; not construction/statutory drawings | JohnXu22786; embedded source IDs in figures | `build_3885_outputs.py`; Matplotlib/Pillow PDF export; embeds only listed local diagrams and text |
| `drawings/a3-booklet.pdf` and `a3-booklet.en.pdf` | JohnXu22786 | Six local figure pairs composed into language-specific booklets | Original compilation; PDF export version generated 2026-08-29 | Offline review and concept adaptation; professional review required | JohnXu22786; embedded source IDs in figures | `build_3885_outputs.py`; Matplotlib/Pillow PDF export; no third-party PDF pages or images |
| `geometry/buildings.geojson`, `constraints.geojson`, `green_space.geojson`, `key_areas.geojson`, `land_use.geojson`, `phasing.geojson`, `public_space.geojson`, `roads.geojson`, `site_boundary.geojson` | JohnXu22786 / repository package | Provisional concept geometry; no third-party basemap or asserted personal data | `PACKAGE-GEOMETRY`; repository-display-only, provisional, non-redline | Machine validation and concept display only; adaptation must retain provisional/non-official notice; not a survey, ownership or approval record | JohnXu22786; cite `PACKAGE-GEOMETRY` | Historical package provenance records `dsh-haidian-agent` / DeepSeek V4 Flash via DeepSeek Harness; current repair did not call or regenerate that tool; terms permit this repository concept display only and do not clear external reuse |
| `metrics.json` | JohnXu22786 / repository package | Geometry calculations and package content counts | Original package record; repository display | Audit/reproducibility and concept discussion; not an official inventory | JohnXu22786; geometry/source IDs | Direct Codex edit and deterministic checks; no external dataset embedded |
| `assumptions.json` | JohnXu22786 / repository package | Taskbook, missing-data boundaries and proposal assumptions | Original package record; repository display | Audit/reproducibility and concept discussion; not a professional opinion | JohnXu22786; cited source IDs | Direct Codex edit; no external asset embedded |
| `sources.json` | JohnXu22786 / repository package | Official URLs, source snapshots/records, asset provenance and rights boundaries | Citation registry; each source retains its own terms | Citation and short attributed fact summaries only; no page asset reproduction | Publisher named in each source row; package author maintains registry | Direct Codex edit; URL facts checked against first-party pages for C01/C02/C03/C04/C07; no screenshots or copied page layout |
| `manifest.json` | JohnXu22786 / repository package | Package file inventory, hashes and translation links | Original audit metadata; repository display | Reproducibility and review only | JohnXu22786 | Local deterministic manifest refresh; no external content |
| `self_check.json`, `compliance_matrix.json`, `design_depth_matrix.json`, `standard_matrix.json`, `changelog.md` | JohnXu22786 / repository package | Package validation results, taskbook mapping and history | Original audit metadata; repository display | Review and reproducibility only; checks are not professional approval | JohnXu22786; source IDs retained | Local validation/build scripts and direct Codex repair; results do not change upstream rights |
| `build_3885_outputs.py`, `build_3885_visual.py`, `push_package.py` and `valroot/scripts/{render_proposal_html.py,refresh_submission_manifest.py,self_check_submission.py,validate_local_submission.py,validate_submission.py,spatial_review.py,visual_review.py,professional_review.py,manifest_schema.py}` | Repository maintainers / JohnXu22786 current-round edits | Local package build, manifest, render, schema and four-gate validation workflow | Repository code and each dependency's own licence; scripts are execution-only and not package deliverables | May be inspected and run for this repository task; adaptation must preserve repository licence/attribution and must not be presented as professional approval | Repository maintainers; current repair by JohnXu22786 via Codex | Direct Codex edit/review plus local deterministic scripts; exact external runtime model ID not asserted; no external harness or third-party code copied into package assets |

## Current status-by-path ledger (authoritative)

The compact attribution table above is retained for continuity; this table is the authoritative status reconciliation for review 5058033387. Every delivered path appears once. `Manifest hash` means the final `manifest.json` entry for that exact path; `ledger/source` means this record plus the named `sources.json` entry are the evidence anchors.

| Exact path | Status | Author or generation / source-input | Licence or authorization basis | Allowed use and restrictions | Evidence |
|---|---|---|---|---|---|
| `agent.json` | `evidence_backed_package_display_only` | JohnXu22786; agent metadata | Original package record; `COMMUNITY-DISPLAY-ONLY` | Review/reproducibility only; no unrecorded model or rights claim | Manifest hash; ledger/source |
| `proposal.md` | `evidence_backed_package_display_only` | JohnXu22786; taskbook, cited facts, package geometry | Original concept text; `COMMUNITY-DISPLAY-ONLY` | Repository/community display and attributed concept adaptation only; no official, commercial or implementation use | Manifest hash; `ASSET-PROVENANCE-CODEX-20260829` |
| `proposal.en.md` | `evidence_backed_package_display_only` | JohnXu22786; substantive translation of `proposal.md` | Original translation; `COMMUNITY-DISPLAY-ONLY` | Same boundary; human bilingual equivalence review remains required | Manifest hash; `ASSET-PROVENANCE-CODEX-20260829` |
| `report/copyright_statement.md` | `evidence_backed_package_display_only` | JohnXu22786; rights evidence and OFL proof | Original ledger; embedded OFL text retains its own terms | Repository review/attribution only; not a legal opinion | Manifest hash; ledger/source |
| `report/narrative.md` | `evidence_backed_package_display_only` | JohnXu22786; package records and cited case summaries | Original evidence supplement; `COMMUNITY-DISPLAY-ONLY` | Offline review and concept adaptation only; no case-party endorsement | Manifest hash; `ASSET-PROVENANCE-CODEX-20260829` |
| `report/proposal.html` | `evidence_backed_package_display_only` | JohnXu22786; proposal, local Chinese figures, local font subset | Local derived HTML; package display boundary | Offline display only; no remote loading or public legal publication implied | Manifest hash; renderer + local-resource scan |
| `report/proposal.en.html` | `evidence_backed_package_display_only` | JohnXu22786; English proposal, local English figures, local font subset | Local derived HTML; package display boundary | Offline display only; no remote loading or public legal publication implied | Manifest hash; renderer + local-resource scan |
| `visual/index.html` | `evidence_backed_package_display_only` | JohnXu22786; local metrics and Chinese figures | Original offline index; package display boundary | Offline review and attributed concept adaptation only; no remote assets | Manifest hash; visual builder + local-resource scan |
| `visual/index.en.html` | `evidence_backed_package_display_only` | JohnXu22786; local metrics and English figures | Original offline index; package display boundary | Same boundary; no remote assets | Manifest hash; visual builder + local-resource scan |
| `assets/figures/site-overview.png` | `evidence_backed_package_display_only` | JohnXu22786; labels and provisional geometry | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Concept display/adaptation only; not a survey/redline | Manifest hash; build script; no basemap |
| `assets/figures/site-overview.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English labels and provisional geometry | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Same boundary; not a survey/redline | Manifest hash; build script; no basemap |
| `assets/figures/ai-ecosystem.png` | `evidence_backed_package_display_only` | JohnXu22786; C01/C02/C03/C04/C07 citation summaries | Original deterministic diagram; external records are citation-only | No endorsement, partnership or case-party asset use | Manifest hash; build script; no logo/screenshot |
| `assets/figures/ai-ecosystem.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English case summaries | Original deterministic diagram; external records are citation-only | Same boundary; no endorsement, partnership or case-party asset use | Manifest hash; build script; no logo/screenshot |
| `assets/figures/key-areas.png` | `evidence_backed_package_display_only` | JohnXu22786; provisional nodes and tasks | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Concept display/adaptation only; locations remain provisional | Manifest hash; build script; no external imagery |
| `assets/figures/key-areas.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English provisional nodes and tasks | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Same boundary; locations remain provisional | Manifest hash; build script; no external imagery |
| `assets/figures/land-use-structure.png` | `evidence_backed_package_display_only` | JohnXu22786; concept shares and metric boundary | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Concept display/adaptation only; not existing/statutory/geometric land use | Manifest hash; build script; no external data |
| `assets/figures/land-use-structure.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English concept shares and boundary | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Same boundary; not existing/statutory/geometric land use | Manifest hash; build script; no external data |
| `assets/figures/mobility-bluegreen.png` | `evidence_backed_package_display_only` | JohnXu22786; concept routes and provisional geometry | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Concept display/adaptation only; no right-of-way or capacity claim | Manifest hash; build script; no third-party map |
| `assets/figures/mobility-bluegreen.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English concept routes and geometry | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Same boundary; no right-of-way or capacity claim | Manifest hash; build script; no third-party map |
| `assets/figures/metrics-evidence.png` | `evidence_backed_package_display_only` | JohnXu22786; `metrics.json` formulas and counts | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Audit/review and concept adaptation only; not measured performance | Manifest hash; build script; metrics boundary |
| `assets/figures/metrics-evidence.en.png` | `evidence_backed_package_display_only` | JohnXu22786; English metrics labels and formulas | Original deterministic diagram; `COMMUNITY-DISPLAY-ONLY` | Same boundary; not measured performance | Manifest hash; build script; metrics boundary |
| `assets/figures/logo-brand.png` | `internal_codename_prior_rights_unchecked` | JohnXu22786; deterministic working mark and package name | Original mark record; no trademark authorization or clearance | Internal/repository concept display only; no registration, commercial use or endorsement claim | Manifest hash; build script; prior-rights search required |
| `assets/figures/logo-brand.en.png` | `internal_codename_prior_rights_unchecked` | JohnXu22786; English working-mark label | Original mark record; no trademark authorization or clearance | Same boundary; no registration, commercial use or endorsement claim | Manifest hash; build script; prior-rights search required |
| `drawings/a0-boards.pdf` | `evidence_backed_package_display_only` | JohnXu22786; six local Chinese diagram inputs | Original compilation; `COMMUNITY-DISPLAY-ONLY` | Offline review and attributed concept adaptation only; not construction/statutory drawings | Manifest hash; PDF build; local inputs only |
| `drawings/a0-boards.en.pdf` | `evidence_backed_package_display_only` | JohnXu22786; six local English diagram inputs | Original compilation; `COMMUNITY-DISPLAY-ONLY` | Same boundary; not construction/statutory drawings | Manifest hash; PDF build; local inputs only |
| `drawings/a3-booklet.pdf` | `evidence_backed_package_display_only` | JohnXu22786; six local Chinese diagram inputs | Original compilation; `COMMUNITY-DISPLAY-ONLY` | Offline review and attributed concept adaptation only; professional review required | Manifest hash; PDF build; local inputs only |
| `drawings/a3-booklet.en.pdf` | `evidence_backed_package_display_only` | JohnXu22786; six local English diagram inputs | Original compilation; `COMMUNITY-DISPLAY-ONLY` | Same boundary; professional review required | Manifest hash; PDF build; local inputs only |
| `geometry/buildings.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Machine validation/concept display; not survey, ownership or approval evidence | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/constraints.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not statutory controls | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/green_space.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not official green-space inventory | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/key_areas.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; node locations remain provisional | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/land_use.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not existing/statutory land-use data | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/phasing.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not a funding/construction schedule | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/public_space.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not a public-ownership/accessibility record | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/roads.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional concept only | Same boundary; not right-of-way, traffic or emergency-capacity evidence | Manifest hash; source `PACKAGE-GEOMETRY` |
| `geometry/site_boundary.geojson` | `evidence_backed_provisional_display_only` | JohnXu22786; retained historical package geometry | `PACKAGE-GEOMETRY`; provisional rough boundary only | Concept envelope only; not official boundary, parcel or ownership record | Manifest hash; source `PACKAGE-GEOMETRY` |
| `metrics.json` | `evidence_backed_provisional_display_only` | JohnXu22786; geometry calculations and package counts | Original derived package record; provisional values | Reproducibility/concept discussion only; not official inventory or measured KPI | Manifest hash; deterministic formulas |
| `assumptions.json` | `evidence_backed_package_display_only` | JohnXu22786; taskbook and explicit missing-data boundaries | Original package record; `COMMUNITY-DISPLAY-ONLY` | Review/concept discussion only; unknowns remain open | Manifest hash; source references |
| `sources.json` | `evidence_backed_package_display_only` | JohnXu22786; URLs, source records, provenance and rights boundaries | Original citation/rights registry; external terms remain source-specific | Citation and short attributed facts only; no page-asset reproduction | Manifest hash; source-level status fields |
| `manifest.json` | `evidence_backed_package_display_only` | JohnXu22786; inventory, translation links and hashes | Original audit metadata; `COMMUNITY-DISPLAY-ONLY` | Reproducibility/review only; machine status is in `validation_claim.extensions.x-rights-status` | Manifest self-entry has no hash by schema; ledger evidence |
| `self_check.json` | `evidence_backed_package_display_only` | JohnXu22786; persisted local gate outputs | Original audit metadata; no approval grant | Packaging evidence only; not CocoSgt approval, legal compliance or professional sign-off | Manifest hash; local gates |
| `compliance_matrix.json` | `evidence_backed_package_display_only` | JohnXu22786; taskbook mapping and safeguards | Original audit metadata; `COMMUNITY-DISPLAY-ONLY` | Review/reproducibility only; not compliance certification | Manifest hash; local gates |
| `design_depth_matrix.json` | `evidence_backed_package_display_only` | JohnXu22786; task coverage and evidence mapping | Original audit metadata; `COMMUNITY-DISPLAY-ONLY` | Review/reproducibility only; not design approval | Manifest hash; local gates |
| `standard_matrix.json` | `evidence_backed_package_display_only` | JohnXu22786; standards/method references | Original audit metadata; citation boundaries apply | Review/reproducibility only; not regulatory compliance or endorsement | Manifest hash; local gates |
| `changelog.md` | `evidence_backed_package_display_only` | JohnXu22786; package history | Original audit history; repository display | Audit history only; historical tool references do not authorize current use | Manifest hash; direct Codex repair |

## Non-package build inputs and code evidence

These paths are named because the review requested build code, font and generation evidence. They are not additional delivered package files and are not silently covered by the package license.

| Exact path | Status | Author/source | Licence or authorization basis | Allowed use and restrictions | Evidence |
|---|---|---|---|---|---|
| `refs/fonts/NotoSansSC-Static.ttf` | `license_verified_scoped_embedding_only` | Noto Project Authors; official upstream record in `sources.json` | SIL OFL 1.1; local SHA-256 `628654215A32E94C84F830237918DAB66D74E73D303349E16AA921F3F29809D9`; full text below | Embed/render in offline HTML and local figures/PDFs while retaining OFL notice; does not clear package text, marks or source assets | Font metadata/hash; source `FONT-NOTOSANSC-OFL-20260829` |
| `build_3885_outputs.py` | `reproducibility_record_not_redistributed` | JohnXu22786 current-round edits; repository build | Repository code and dependency terms; no external asset license implied | Run/inspect for this repository task; no professional-approval claim | Direct Codex edit; source `BUILD-DEPENDENCIES-20260829` |
| `build_3885_visual.py` | `reproducibility_record_not_redistributed` | JohnXu22786 current-round edits; repository build | Repository code and dependency terms | Run/inspect for this repository task; no external asset license implied | Direct Codex edit; deterministic local inputs |
| `push_package.py` | `reproducibility_record_not_redistributed` | Repository maintainer / JohnXu22786 | Repository helper; execution-only | Inspect/run for this authorized same-branch repair; does not grant rights to package contents | Existing local Git Data API helper |
| `valroot/scripts/render_proposal_html.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository build code and dependency terms | Deterministic local render only; not a content/legal license | Existing local script |
| `valroot/scripts/refresh_submission_manifest.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Hash refresh only; not approval | Existing local script |
| `valroot/scripts/self_check_submission.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Packaging evidence only; not approval | Existing local gate |
| `valroot/scripts/validate_local_submission.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Packaging evidence only; not approval | Existing local gate |
| `valroot/scripts/validate_submission.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Packaging evidence only; not approval | Existing local gate |
| `valroot/scripts/spatial_review.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Spatial packaging evidence only; not survey/approval | Existing local gate |
| `valroot/scripts/visual_review.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Visual packaging evidence only; not design approval | Existing local gate |
| `valroot/scripts/professional_review.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Professional-scope evidence only; not professional sign-off | Existing local gate |
| `valroot/scripts/manifest_schema.py` | `reproducibility_record_not_redistributed` | Repository maintainers / JohnXu22786 | Repository validation code and dependency terms | Schema validation only | Existing local schema helper |

## HTML and PDF embedded-resource inventory

The four HTML files listed above contain only local relative figure links and a derived, embedded Noto Sans SC subset; they load no external URL, image, font, script, map tile or stylesheet. The four PDFs embed the six local diagram families listed above and local text rendered by the build environment; they contain no external PDF page, screenshot, map tile, photograph or logo. The two logo files are standalone working-mark assets and are not silently used as third-party identity.

## Font proof and exact local font record

The generator font is `refs/fonts/NotoSansSC-Static.ttf` (local SHA-256 `628654215A32E94C84F830237918DAB66D74E73D303349E16AA921F3F29809D9`). Font metadata identifies family `Noto Sans SC`, Regular, with name-table version string `2.04;241114210130;non-release` and the package records the family as Noto Sans SC 2.004 metadata. The official upstream reference is recorded in `sources.json`; the complete SIL OFL 1.1 proof is embedded below in this permitted `copyright_statement.md`. Its canonical embedded-license hash is `d184e640966b6dd478a45ad203be855e9b45ef8087ff02afcc330eba062dcde8` (UTF-8 bytes after trimming surrounding whitespace and appending one LF). Only a derived subset is embedded into the offline HTML, and the font is used to render the local PNG/PDF figures. OFL permission is not expanded to the surrounding text, logo, names or cited source-page assets.

## Build dependency record

The current local build used Python 3.12.13, Matplotlib 3.11.1, Pillow 12.3.0, Shapely 2.1.2, pyproj 3.7.2, jsonschema 4.26.0, ReportLab 4.4.9 and fontTools 4.63.0. They are build-time dependencies and are not redistributed in this package. Their project license boundaries are recorded here for reproducibility: Python Software Foundation License; Matplotlib project license; HPND/PIL; BSD-style Shapely; MIT-style pyproj; MIT jsonschema; ReportLab BSD-style terms; and MIT fontTools. This record does not license the proposal, source pages, geometry or working mark.

## Embedded Noto Sans SC OFL 1.1 proof

Copyright The Noto Project Authors (https://github.com/notofonts/noto-cjk)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL permits the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The fonts,
including any derivative works, can be bundled, embedded, redistributed
and/or sold with any software provided that any reserved names are not used
by derivative works. The fonts and derivatives, however, cannot be released
under any other type of license. The requirement for fonts to remain under
this license does not apply to any document created using the fonts or their
derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright Holder(s)
under this license and clearly marked as such. This may include source files,
build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the copyright
statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting, or
substituting—in part or in whole—any of the components of the Original
Version, by changing formats or by porting the Font Software to a new
environment.

"Author" refers to any designer, engineer, programmer, technical writer or
other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining a copy
of the Font Software, to use, study, copy, merge, embed, modify, redistribute,
and sell modified and unmodified copies of the Font Software, subject to the
following conditions:

1) Neither the Font Software nor any of its individual components, in Original
   or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
   redistributed and/or sold with any software, provided that each copy
   contains the above copyright notice and this license. These can be included
   either as stand-alone text files, human-readable headers or in the
   appropriate machine-readable metadata fields within text or binary files
   as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font Name(s)
   unless explicit written permission is granted by the corresponding
   Copyright Holder. This restriction only applies to the primary font name
   as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software
   shall not be used to promote, endorse or advertise any Modified Version,
   except to acknowledge the contribution(s) of the Copyright Holder(s) and
   the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole, must be
   distributed entirely under this license, and must not be distributed under
   any other license. The requirement for fonts to remain under this license
   does not apply to any document created using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT,
TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL,
INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.

## External case and source boundaries

The five counted cases are C01 Helsinki AI Register, C02 Dutch Government Algorithm Register, C03 Singapore AI Verify, C04 UK AI Security Institute and C07 NIST AI RMF. Their official URLs, publication or undated status, access date, facts verified, citation/licence boundary, transferable mechanism and non-copy condition are in `sources.json`; the package reproduces no logo, screenshot, record, dataset, toolkit or long quotation. C05 and C06 remain non-counted background references. The station/space precedent group is separate and is not used to inflate `global_case_count`.

## AI-generated material, data and unresolved-use controls

Current-round text edits, diagrams, HTML/PDF packaging and the replacement working mark were made directly in Codex; the exact runtime model identifier is not asserted beyond the agent card. The deterministic build uses only package geometry, metrics, labels and short attributed case facts. No external AI-generated image or unlicensed generated media is retained. The existing provisional geometry is retained as a repository concept asset with its historical provenance explicitly marked; it is not presented as an official map or as a freely reusable third-party asset. No personal/private operational dataset is included.

Before any public, commercial or live operational use, obtain separate clearance for names/marks, rights, privacy, accessibility, heritage, fire, ownership, engineering, public records, data retention, professional responsibility and emergency authority. Until then, `COMMUNITY-DISPLAY-ONLY` and all `provisional`/`to_verify` labels remain binding package boundaries.
