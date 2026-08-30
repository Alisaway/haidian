# Asset Rights and Copyright Statement

## 1. Scope and responsibility

Author and submitting account: `cf3901646`. Producing agent: the AI agent declared in `agent.json`.

This ledger covers **every one of the 42 files** in `submissions/cf3901646/jingzhang-rising/`. It is written to be checked, not to be trusted: each row names the actual production method so that a reviewer can re-derive the asset from the package itself.

This package is a **conceptual design submission**. It contains no commissioned photography, no aerial or satellite imagery, no map tiles, no third-party logos or trademarks, no portraits or identifiable persons, no proprietary or licensed datasets, no CAD or survey drawings, no purchased templates, and no remote web assets. Nothing in this package is an official planning approval, a statutory redline, or a government commitment.

If contrary evidence is found for any item below, the submitter will correct or remove that item.

## 1a. Licence scope and the single reuse rule

`COMMUNITY-DISPLAY-ONLY` is the licence for **every asset class in this package without exception**: body text, figures, drawings, geometry, structured JSON, HTML deliverables, the cover plate, and the brand and visual identity system (naming, wordmark, herringbone motif, four-origin names, palette, component library).

- It grants **display and review rights only**. It grants no reuse, redistribution, adaptation, sublicensing or commercial right.
- This package contains **no open-source licence grant and no non-commercial reuse grant**. Where the proposal text recommends that the organiser publish the visual identity under a public licence, that is a recommendation to the rights holder, not a grant made here.
- **Single third-party exception**: the embedded Droid Sans Fallback subset is governed by the Apache License 2.0 (section 4), not by `COMMUNITY-DISPLAY-ONLY`.
- Any use separately licensed by the rights holder must credit `cf3901646` and "JINGZHANG RISING", and must retain the provisional-boundary and non-statutory notices.

`manifest.json`, `proposal.md` section 7, `proposal.en.md` section 7 and this statement all carry the same rule; if any future revision changes one of them, all four must change together.

## 2. Asset ledger

| Files | Author / production method | Source and clearance basis | Reuse restriction |
| --- | --- | --- | --- |
| `proposal.md`, `proposal.en.md` | Original bilingual design narrative written for this submission by the declared AI agent under author direction. Both languages are natively written, not machine round-tripped. | Factual inputs limited to the public entries registered in `sources.json` (14 records: the seven organizer/repository entries `SITE-PACKAGE`, `SOURCE-REGISTRY`, `PROCESSED-FACT-PACK`, `BOUNDARY-SOURCE`, `KEY-AREA-SOURCE`, `OFFICIAL-ANNOUNCEMENT`, `AGENT-TASKBOOK`, plus `STANDARDS-INDEX` and the six approved-registry public legal and policy texts), plus publicly published historical facts cited inline. Every external URL in `sources.json` appears in the repository's approved `data/source_registry.json`. No text is copied from another submission, publication, or website. | `COMMUNITY-DISPLAY-ONLY`. Do not present as approved planning. |
| `geometry/*.geojson` (9 layers: site boundary, key areas, land use, buildings, roads, green space, public space, constraints, phasing) | Agent-generated conceptual geometry, constructed locally with Shapely and reprojected with PyProj. No imported survey, cadastral, CAD, or commercial GIS layer. | Boundary input is `brief/site-package/geometry/provisional_boundaries.geojson`, registered in `sources.json` as **provisional**. Every layer carries `official_boundary: false` and `geometry_role: "provisional_constraint"`. | Provisional and discussion use only. **Not** an official redline, statutory control, precise-area basis, engineering survey, or property record. |
| `metrics.json`, `assumptions.json`, `self_check.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, `manifest.json`, `agent.json`, `sources.json` | Machine-derived. All 33 metrics are back-computed from the GeoJSON layers above in EPSG:4548; three values that cannot be derived are recorded as `status: unknown` rather than estimated. | Derived solely from this package's own geometry. Independently reproducible by a third party from the shipped layers. | Figures are conceptual outputs of provisional geometry; do not quote as surveyed quantities. |
| `assets/figures/*.png` (10 files, 5 plates x zh/en) | Original diagrams. The plates are authored as inline SVG built directly from this package's GeoJSON and metrics, then rasterised locally with MuPDF from that same markup, so the raster preview and the inline vector cannot drift apart. Vector-style drawing only - **no photographic layer, no downloaded image, no scanned material, and no AI image-generation model was used at any point.** | Derived only from package geometry, package metrics, and the public task inputs in `sources.json`. | Same display-only license. Do not crop out the provisional-boundary or data-source notes. |
| `drawings/a3-booklet.pdf`, `a3-booklet.en.pdf`, `a0-boards.pdf`, `a0-boards.en.pdf` | Original PDF page layouts composed locally with PyMuPDF from the same inline SVG figures. The sheets are **fully vector** (zero raster images) and every typeface is embedded as a subset, so the Chinese pages render on a machine with no CJK system font. | No imported drawing, CAD file, map, photograph, or commercial layout template. The embedded CJK face is disclosed in section 4. | Same display-only license. Printed output remains conceptual and provisional. |
| `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, `visual/index.en.html` | Original static HTML with inline CSS and inline SVG, assembled locally. | **Zero remote dependencies**: no CDN, no external script, no remote web font, no remote map tile, no iframe, no analytics or tracking, no network request of any kind. Opens correctly from a local filesystem with networking disabled. The one embedded typeface is an Apache-2.0 subset inlined as a `data:` URI and is disclosed in section 4. | Same display-only license. |
| `assets/media/cover.png` | Original cover plate rendered by a local Matplotlib pipeline. | Derived only from package geometry and package text. | Same display-only license. |
| Name, wordmark and graphic system - "Jingzhang Rising", the ascending stroke motif, the 1909-1949-1980-2026 origin sequence, the colour palette, node codes and wayfinding wording | Original conceptual naming and graphic wording created for this submission. | No third-party mark, logo, mascot, typeface design, character, photograph, or registered trademark is incorporated. The character-form motif is used as a **public historical and typographic reference**, not as a copy of any existing identity. | Do not imply sponsorship, trademark registration, exclusivity, or organizer endorsement. |

## 3. Audio disclosure

**This package contains no audio and no video.** An earlier revision shipped a bilingual proposal film with synthetic narration; it has been withdrawn in full, together with its captions, transcripts and posters, because its narration asserted historical claims this package could not verify and the audio could not be re-recorded. Nothing in the current package plays sound or moving image.

- No human voice was recorded, imitated or cloned; no biometric voice sample was ever supplied.
- No music, sampled recording, ambient sound or sound effect is present.
- No voice model, service credential or TTS software is redistributed.
- Every remaining deliverable is a static file: text, vector drawings, raster figures and offline HTML.

## 4. Typeface disclosure

Two typefaces are used, and one of them is redistributed inside this package. The change from the previous revision is deliberate: the earlier build relied on `Microsoft YaHei` being installed on the reader's machine, so on a host without a CJK system font every Chinese page degraded to question marks and tofu boxes.

| Typeface | Licence | How it is used | Redistributed here? |
| --- | --- | --- | --- |
| **Droid Sans Fallback** (`Droid Sans Fallback Regular`) | Apache License 2.0 | Supplies every CJK glyph in the HTML deliverables, the raster figure previews and the A3/A0 PDFs. | **Yes**, as a glyph subset. |
| **Helvetica / Nimbus Sans** (PDF base-14 standard family) | Standard PDF base font; the Nimbus Sans metric equivalent is AGPL/GPL with a font exception | Latin text in the vector drawings and the raster figure previews. | Only the glyph subset the drawings need, embedded by the PDF writer. |

Precise position:

- **The redistributed CJK face is Droid Sans Fallback, licensed under the Apache License 2.0**, which permits redistribution and modification (including subsetting) provided the licence is preserved. It is obtained from the MuPDF/PyMuPDF distribution used to build this package. Attribution: Droid Sans Fallback, © Google Inc., Apache License 2.0.
- **HTML output embeds a subset of that face as a `data:` URI** in a single `@font-face` rule named `JZR Sans`, appended to the end of each CSS font stack. The subset carries only the ~1,470 code points this package actually prints. Nothing is downloaded: the pages still make **zero network requests** and open correctly from a local filesystem with networking disabled.
- **PDF output embeds only the glyph subsets** required to display the sheets. Both `a3-booklet*.pdf` and `a0-boards*.pdf` report every font as embedded.
- **PNG output contains no font data at all** - glyphs are rasterised to pixels during rendering.
- **`Microsoft YaHei` and `PingFang SC` remain first in the CSS stacks** so a reader who has them keeps their preferred rendering; they are named as local preferences only and no Microsoft font file is copied, embedded, or redistributed anywhere in this package.
- The cover plate was rendered in an earlier build with `Microsoft YaHei` read from the build machine's system font directory; that output is rasterised pixels and carries no font data.

Anyone rebuilding this package can substitute any openly licensed CJK family (for example Noto Sans CJK / Source Han Sans, SIL Open Font License 1.1). Layout does not depend on the specific typeface: every label position is computed from measured glyph advances at build time.

## 5. Software and build-chain notices

The package was built locally with Python and the following open-source libraries, used strictly as **build-time tools**: PyMuPDF / MuPDF (SVG-to-vector-PDF conversion, sheet composition and raster preview rendering), `fontTools` (subsetting the Apache-2.0 CJK face disclosed in section 4), Shapely (geometry construction and clip-path baking), PyProj (EPSG:4548 reprojection), NumPy (numeric arrays), and Matplotlib (the cover plate and the earlier figure builds).

- Apart from the Apache-2.0 Droid Sans Fallback subset disclosed in section 4, none of these libraries, their source code, their bundled fonts, their binaries, or their brand assets are redistributed in this submission. Only the rendered output is submitted.
- Earlier revisions used `edge-tts` and `imageio-ffmpeg` to produce the proposal film. That film has been withdrawn (section 3); neither tool contributes to any current deliverable, and no binary from either was ever included in the package.
- No third-party code is executed by any delivered HTML file.

## 6. Sources, standards and citation limits

`sources.json` registers seven organizer-published inputs. Citing a public standard, an official announcement, or an organizer material does **not** transfer copyright in that material and does not authorise republication beyond the conceptual use declared here. Where a standard is referenced for design-depth purposes without a verified public source, it is recorded as such in `sources.json` and `standard_matrix.json` rather than being claimed as cleared.

No classified, internal, personal, private, or non-public spatial data is included. No official endorsement, approval outcome, statutory conclusion, or implementation commitment is claimed or implied anywhere in this package.

## 7. Verification and removal rule

Before any reuse outside this submission, verify the current source, licence, attribution, and applicable organizer terms for the specific asset. **Remove or replace any asset whose authorship, source, or reuse right cannot be demonstrated from this package.** The submitter will act on any substantiated rights objection without requiring the objector to prove damage.
