# Offline CJK font notice

The offline HTML pages embed character subsets of **Noto Sans CJK SC** so that the package does not depend on a maintainer workstation's installed fonts or on a CDN. The Chinese report and visual index use larger page-specific subsets; the English pages embed the smaller subset needed for their Chinese language-switch and transcript labels. These are not separate project font families.

- Upstream: https://github.com/notofonts/noto-cjk
- Font license: SIL Open Font License 1.1
- Delivery boundary: package-local offline rendering only; no external protocol, implementation or endorsement claim is attached to the font asset.
