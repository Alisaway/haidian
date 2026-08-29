# Copyright Statement, Asset Rights Ledger and License Boundary

## 1. License boundary (COMMUNITY-DISPLAY-ONLY)

This package is licensed under **COMMUNITY-DISPLAY-ONLY**. Scope, in plain terms:

- **Permitted**: browsing, demonstration, presentation and review citation within the display and review context of this open call (including offline HTML/PDF rendering of this submission); viewing in this repository.
- **Not granted**: modification and redistribution rights beyond the above; commercial use of any original concept names, marks or graphics; further professional deepening, reuse or derivative work based on this package's original content. Any later professional deepening requires separate written authorization and license confirmation from the participant.
- This license does not affect the legal status of underlying third-party materials listed in section 2, each of which remains subject to its own terms.

## 2. Asset-level rights ledger

| Asset class | Items in this package | Origin / source | License / reuse boundary |
| --- | --- | --- | --- |
| Fonts | Subset-embedded Noto Sans SC (WOFF data URI) in report/proposal.html, report/proposal.en.html, visual/index.html, visual/index.en.html | Official Google Fonts artifact `https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf`; version `2.004`; source SHA-256 `a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`; upstream commit `523d033d6cb47f4a80c58a35753646f5c3608a78` | SIL Open Font License 1.1; complete text and provenance record are retained in this file, section 6; raw OFL SHA-256 `1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9`; final subset hashes are listed in section 6 |
| Images & charts | `assets/figures/*.png` (seven zh/en figure pairs plus neutral logo; including `east-west-north-south`) | Self-produced by the declared Codex agent with deterministic matplotlib/PIL rendering; no third-party image or basemap is included | Participant-authored concept output; COMMUNITY-DISPLAY-ONLY; no commercial reuse or official/surveyed claim |
| Maps & geometry | geometry/*.geojson | Self-produced provisional geometry; no unauthorized basemap used; derived from organizer-provided provisional repository geometry and official text scopes | Provisional repository data for concept/visualization only (see sources.json DATA-SRC-PROVISIONAL-BOUNDARIES-20260605) |
| Data | metrics.json, matrices, sources.json | Public-caliber citations only; no non-public or measured monitoring data | Citation with attribution; no implied reuse rights |
| HTML renderer / template / CSS / scripts | Inline CSS and output markup in report/*.html and visual/index*.html; build inputs `valroot/scripts/render_proposal_html.py`, `valroot/scripts/build_zjw_visual.py`, `work/regen_3886_visuals.py`, `work/build_3886_visual.py`, and `scripts/embed_fonts.py` | Inline output CSS/markup is participant-authored for this package. Repository-local builders and the fontTools subsetting helper are build-only inputs, not redistributed; no third-party template, remote stylesheet or script bundle is embedded. Their use is recorded for repository/PR display generation only; standalone reuse remains `to_verify` | Submitted output: COMMUNITY-DISPLAY-ONLY. No independent redistribution claim is made for build tools; component-level record is in sources.json ASSET-HTML-BUILD-SOURCES-3886 |
| Code & libraries | fontTools, matplotlib, PIL/numpy and geometry helpers used during local build | Open-source libraries used as build dependencies; no library source is bundled in this package | Each library remains under its own license; no third-party library branding or code is embedded in the submitted HTML/PDF |
| Generated graphics | All figures, diagrams, boards and HTML surfaces, including the new east-west-north-south relation diagram and DZ scenario-card surfaces | AI-assisted and authored by the declared Codex agent from package text/geometry; generation scripts and output hashes are recorded by the manifest/audit | Original participant concept output; COMMUNITY-DISPLAY-ONLY; no external or commercial reuse |
| Package marker | `PACKAGE-3886` marker and neutral geometric frame | Self-generated neutral package identifier substituted because no credible prior-rights conclusion is asserted | COMMUNITY-DISPLAY-ONLY for this call/review; no trademark, registration, commercial or external-publication claim |
| Case materials | Six international cases summarized in proposal.md and sources.json | Public government/academic pages (URLs, published and accessed dates registered item by item) | Summary-level methodological reference with attribution; no image reuse; no outcome-data claims |

## 3. Dated rights-review record for displayed identifiers

The only identifier intentionally displayed after this repair is the neutral package marker `PACKAGE-3886`. The former concept names and mark are not displayed in the proposal, figures, PDF boards, HTML reports or visual index, and this package makes no clearance claim for them.

| Field | Record |
| --- | --- |
| Review date | 2026-08-29 |
| Database(s) searched | None; no trademark database result is relied upon for this package marker |
| Jurisdiction / category | Not applicable to a neutral package identifier; no jurisdictional or Nice-class clearance conclusion is asserted |
| Search expression | Not performed; `PACKAGE-3886` is used only as a package/review locator and not as a proposed brand |
| Similar results | Not assessed; no similarity or non-infringement conclusion is made |
| Reviewer | JohnXu22786 / Codex implementation audit |
| Conclusion | No prior-rights clearance conclusion. The former names/mark were removed from displayed surfaces and replaced with the neutral marker. |
| This-call display licence scope | `COMMUNITY-DISPLAY-ONLY`: display, offline review and citation inside this call/PR only; no registration, commercial use, external publication, redistribution or derivative branding. |

This is an audit record and not a legal opinion. Any future public-facing name, abbreviation or graphic mark requires a new dated search record and written rights decision before use.

## 4. File-level ledger and unresolved checks

The following file families are individually registered in `sources.json`: `drawings/a0-boards.pdf`, `drawings/a0-boards.en.pdf`, `drawings/a3-booklet.pdf`, `drawings/a3-booklet.en.pdf`, `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, and `visual/index.en.html`. They are Codex-rendered outputs from this package's own text, geometry and figures, and include the seven bilingual figure pairs and new structured records `visual/assets/resource_story_directory.json` and `visual/assets/kpi_protocols.json`. Their repository/PR use remains COMMUNITY-DISPLAY-ONLY; no external publication, resale, derivative editing or trademark use is cleared. The actual Noto Sans SC source file, metadata, subset hashes, complete OFL text and embedding basis are recorded in this file, section 6, and `sources.json`.

No third-party basemap, stock image, icon pack, template, portrait or external font file is claimed as included. The brand prior-rights search, official geometry, and any third-party clearance remain `to_verify` before implementation.

## 5. No misattribution statement

All submitted text, geometry, diagrams, PDFs and static HTML assets are generated by the declared AI agent or use cleared public/user-provided sources listed in sources.json. No remote assets are required by any HTML surface; no unauthorized third-party images, portraits, trademarks or copyrighted materials are included. Resemblance to any existing mark is coincidental and prior-rights clearance precedes any formal use.

## 6. Verification

The asset ledger above is reflected in sources.json `license` fields and the build provenance record. Rights review was performed on the package evidence only; this document is not a legal opinion and does not constitute proof of trademark clearance or official geometry.

## 7. Font evidence and complete OFL 1.1 text

The actual source binary is the official Google Fonts Noto Sans SC artifact above, family **Noto Sans SC**, version `2.004`, SHA-256 `a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`. Final WOFF data-URI subset SHA-256 values are: `report/proposal.html` `a576d227d4c0794312004cf5741094d1b5961bfcd2e86c7df82bbf1a3f41d887`; `report/proposal.en.html` `d9331f53a8e81576391e9a22ef0002ebb78372bb3bcb02c857d535e305edaf1b`; `visual/index.html` `5b6c2f54c77f2705d58379e8a0a073c210d7403be6580a54c162d53a1a1ae6bf`; `visual/index.en.html` `3e9a7dd7902f2b7c17f8dcdbec545122396afd447b6979ba64742a11a7bc3b9c`. The complete OFL text is retained in this file below with raw-license SHA-256 `1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9`. Arial is not embedded and is not claimed as a package asset; the CSS fallback is a viewer/system fallback only. The source and subset records are also registered in sources.json `ASSET-FONT-NOTO-SANS-SC`.

The subset is produced with fontTools `pyftsubset` from the official source binary and restricted to characters visible in each offline HTML surface. The source file is a local build input only; the standalone source font is not claimed as a package asset. OFL 1.1 permits embedding and redistribution of modified font software when the license notice is retained. The complete text is retained here because the submission contract allows this report file:

### SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

#### PREAMBLE

The goals of the Open Font License (OFL) are to stimulate worldwide development of collaborative font projects, to support the font creation efforts of academic and linguistic communities, and to provide a free and open framework in which fonts may be shared and improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and redistributed freely as long as they are not sold by themselves. The fonts, including any derivative works, can be bundled, embedded, redistributed and/or sold with any software provided that any reserved names are not used by derivative works. The fonts and derivatives, however, cannot be released under any other type of license. The requirement for fonts to remain under this license does not apply to any document created using the fonts or their derivatives.

#### DEFINITIONS

"Font Software" refers to the set of files released by the Copyright Holder(s) under this license and clearly marked as such. This may include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the copyright statement(s).

"Original Version" refers to the collection of Font Software components as distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting, or substituting - in part or in whole - any of the components of the Original Version, by changing formats or by porting the Font Software to a new environment.

"Author" refers to any designer, engineer, programmer, technical writer or other person who contributed to the Font Software.

#### PERMISSION & CONDITIONS

Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components, in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled, redistributed and/or sold with any software, provided that each copy of the Font Software contains the above copyright notice and this license. These can be included either as stand-alone text files, human-readable headers or in the appropriate machine-readable metadata fields within text or binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written permission is granted by the corresponding Copyright Holder. This restriction only applies to the primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software shall not be used to promote, endorse or advertise any Modified Version, except to acknowledge the contribution(s) of the Copyright Holder(s) and the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this license, and must not be distributed under any other license. The requirement for fonts to be released under this license does not apply to any document created using the Font Software.

#### TERMINATION

This license becomes null and void if any of the above conditions are not met.

#### DISCLAIMER

THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.
