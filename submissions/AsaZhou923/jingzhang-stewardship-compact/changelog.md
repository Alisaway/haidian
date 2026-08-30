# 方案迭代记录 / Changelog

## v1.1 - 2026-08-21

- Corrected LU-001, “城市型智能服务与公共前厅 / Urban AI services and public exchange,” from numeric land-use code `05` to `09` after the official 2023 classification table was repaired in [PR #3017](https://github.com/open-city-ai/haidian/pull/3017): `05` means wetland and `09` means commercial service land.
- Preserved the polygon coordinates, declared area, concept name, palette, all spatial metrics, and every provisional-boundary limitation. This is a machine-readable semantic correction, not a statutory land-use change, precise-area claim, or retroactive scoring claim.
- The bilingual land-use figures, visual pages, reports, and PDFs do not display the numeric code and remain visually and semantically unchanged; only the GeoJSON classification, manifest hash, and persisted self-check are regenerated.
- Revalidated the package against the current exact-front-matter, source, bilingual, local-image containment, PNG-integrity, SVG-safety, spatial, visual, and professional-evidence rules.
