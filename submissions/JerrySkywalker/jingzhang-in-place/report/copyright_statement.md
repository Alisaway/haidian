# Copyright, source and generation statement

## Scope

This package contains participant-directed text, concept geometry, diagrams, offline HTML and PDF layouts generated deterministically in this run. They are conceptual design communication, not observed site photography, survey drawings, parcel maps, statutory controls or engineering documents.

## Source and reuse boundary

Public sources are indexed in `sources.json`. Facts are paraphrased and cited by source ID only. No source images, maps, logos, commercial map tiles, screenshots, third-party diagrams, peer submission figures, private data, or long copied text are redistributed. International references are background methods only and do not evidence a Jing-Zhang claim.

## Fonts and technical assets

The final report and visual HTML load `visual/assets/jingzhang-local-font.css`, a package-local CSS asset that embeds the WOFF2 subset as a `data:font/woff2` URI and declares it first as `JZ Noto Sans SC Local`. It is a deterministic subset of Google Fonts' Noto Sans SC variable font (`https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf`, source SHA-256 `a3041811a78c361b1de50f953c805e0244951c21c5bd412f7232ef0d899af0da`; subset WOFF2 SHA-256 `ed5833050a35693805e3fdf4a7d3e81fc3c0341e1bb2b292daa8ab38e67c2355`), built with FontTools 4.63.0 from the static raw character union of `report/proposal.html`, `report/proposal.en.html`, `visual/index.html`, and `visual/index.en.html`. The current four-surface union has 992 codepoints: 990 printable codepoints plus U+000A layout control, including 886 CJK codepoints. The final subset cmap contains all 990 printable codepoints and every required CJK glyph; the layout control does not require a glyph. The build and coverage method are recorded here because the current submission contract permits CSS but not standalone font, license or receipt file extensions.

Noto Sans SC is redistributed here under the SIL Open Font License 1.1. Its license permits bundling and redistribution; the source license records the reserved name `Source`, which this package does not use. The package-local subset makes Chinese rendering independent of a host-installed CJK font and requires neither a CDN nor network access. PDFs may contain their own display-only embedded subsets. All visual and report HTML remain offline and contain no CDN, remote font, API, tracker, iframe, form, remote media or online map dependency.

## AI and human responsibility

The Owner directed the candidate, constraints and working direction. AI/Codex supported public-source research, structured design generation, deterministic production and validation. The Owner selected Jing-Zhang In Place as the participant's final submission candidate. This internal selection is not a competition result, award claim, official adoption, implementation approval, or government endorsement. No unverified credential or professional sign-off is claimed.
