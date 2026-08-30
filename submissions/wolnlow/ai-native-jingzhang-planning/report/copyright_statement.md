# Copyright, Sources, and Generated-Media Statement

## 1. Declared use and asset-level closure

This formal package is released only under `COMMUNITY-DISPLAY-ONLY`. The current deliverable contains **61 visible or published assets**: 52 PNG figures/basemaps, one embedded-font stylesheet, four PDFs, and four HTML pages. Every item is recorded in `visual/assets/asset_rights_register.json` with its hash, creator or generator, tool/model where applicable, inputs, third-party components, permission basis, attribution, allowed use, restrictions, and clearance state. `visual/assets/asset_rights_verification.json` verifies coverage and file hashes. A package-level statement is not used as a substitute for this item-level record.

Proposal text, translations, project diagrams, scenario cards, matrices, GeoJSON, JSON, HTML composition, and PDF composition were produced for this submission through AI-assisted drafting and human/orchestrator review. Public facts and background mechanisms are itemized in `sources.json`; citation does not transfer third-party ownership or imply endorsement.

## 2. Map and earth-observation backgrounds

- Five basemap images contain modified Copernicus Sentinel-2 L2A data (2026) accessed through Microsoft Planetary Computer. Attribution accompanies each asset record and every formal atlas/composite in which the imagery appears through `D2SRC-SHARED-014` and `visual/assets/base-map-manifest.json`; the unannotated raw PNGs are registered source assets rather than stand-alone publication plates. Use is limited to 10 m contextual imagery and issue discovery—not surveying, statutory boundaries, ownership, road or station-entrance geometry, engineering alignment, or approval evidence.
- OpenStreetMap contributor data, where referenced, is attributed under ODbL and is limited to background place-name/transport lookup and uncertainty checks. It does not create approved geometry or routes; see `D2SRC-SHARED-015`.
- Submitted site and key-area polygons are maintainer-provided/design-provisional geometry. They do not establish ownership, official-boundary status, or legal authority.

## 3. Generated visuals, brands, marks, people, and heritage media

The ten AI-generated bilingual method diagrams and the shared panoramic cover are registered in `visual/assets/generated_visuals_manifest.json` and `visual/assets/hero_image_manifest.json`. The records include output hashes, dimensions, the OpenAI built-in image-generation route, the model-disclosure limit, hashed participant-controlled visual reference inputs, final generation specifications, and post-processing. The user requested “GPT Image 2”; the platform tool did not expose an exact backend model identifier, so the record does not invent one. Under the OpenAI Terms of Use, output ownership is assigned to the user to the extent permitted by applicable law; the submission does not claim that output is unique or free from every possible resemblance. Human review found no intentional third-party logo, readable brand, archival photograph, or identifiable real person in these outputs.

“京张智脉共生带 / Jingzhang Smart Pulse Co-living Belt”, “当城市开始思考——百年京张的AI原生城市文明试验场 / When the City Begins to Think—A Century of Jingzhang as an AI-Native Urban Civilization Testbed”, and the “evidence line” logo grammar are original **research candidates**, not registered marks, approved public brands, or evidence of endorsement. Company, institution, model, and place names appear only as nominative references in research text; third-party logos are excluded. Trademark conflict, language, accessibility, and public-recognition checks remain a future gate before registration, signage, or commercial/public launch.

Unlicensed archival railway photographs, third-party portraits, and protected institutional marks have been removed or excluded from the formal package. Any later heritage photograph, excerpt, portrait, logo, or translated title requires item-level permission and attribution before inclusion.

Generated or composited visuals communicate relationships, atmosphere, components, or user actions only. They do not prove existing conditions, exact siting, ownership, constructability, approval, deployment, operation, or performance. A prompt or image cannot upgrade an evidence state.

## 4. Offline font and production chain

All four HTML pages load the package-local `visual/assets/cjk-font.css`, which embeds a renamed/subsetted WOFF2 derived from **Noto Sans SC**. The upstream font is distributed under the SIL Open Font License 1.1; upstream commit, source hash, license text, transformation, embedded-font hash, CSS hash, naming, attribution, and permissions are recorded in `visual/assets/cjk-font-license.json`. The PDF and deterministic PNG production chain was regenerated with the same OFL-cleared Noto Sans SC source; the prior proprietary-system-font dependency was removed.

The HTML contains no CDN, remote font, remote script, remote tile request, iframe, form, analytics, or external API dependency. PNG/PDF/HTML outputs are generated through repository-local Python scripts and bundled libraries. Artifact hashes are recorded in `manifest.json`; any regeneration must refresh the manifest, rights register, bilingual audit, offline-render audit, and submission checks.

## 5. Attribution, permissions, and limits

- **Attribution:** Copernicus Sentinel data and OpenStreetMap contributors are credited where used; Noto Sans SC is credited under SIL OFL 1.1; project-original and generated assets require no public credit beyond this statement for the declared repository/community display.
- **Allowed now:** review, repository/community display, and non-commercial discussion of this submitted research package.
- **Not granted:** construction, engineering reliance, statutory use, commercial licensing, trademark registration, governmental endorsement, sublicensing of third-party data, or reuse outside the applicable source licenses and `COMMUNITY-DISPLAY-ONLY` terms.
- **Future trigger:** newly introduced assets, permanent branding, public signage, commercial reuse, or a scope beyond this repository/community display must pass a new item-level rights and professional review.

## 中文摘要

本正式包仅按 `COMMUNITY-DISPLAY-ONLY` 用途发布。当前61项可见/发布资产（52幅PNG、1个内嵌字体样式、4份PDF、4个HTML）均在 `visual/assets/asset_rights_register.json` 逐项登记哈希、作者/生成者、工具与模型、输入来源、第三方要素、许可依据、署名、允许用途、限制和清权状态，并由 `asset_rights_verification.json` 核验覆盖率与文件哈希。

五幅底图使用经处理的2026年Copernicus Sentinel-2 L2A数据；OSM仅用于背景定位和不确定性核对；二者均不支撑法定边界、权属、道路站口、工程路线或审批结论。十幅中英AI方法图与共享全景封面已登记生成路径、输入哈希、提示规格和后处理；平台未暴露确切后端模型名，因此不虚构模型信息。正式包排除了未经授权的历史照片、可识别人像和第三方Logo。

四个HTML使用包内嵌的Noto Sans SC子集字体，依据SIL Open Font License 1.1清权，且不依赖CDN、远程字体、脚本、瓦片、iframe、表单或API；PDF和确定性PNG也已改用同一OFL字体源重新生成。候选名称、传播母题与Logo语法仅为原创研究方向，不是注册商标、正式公共品牌或政府背书；进入注册、导视、商业或更广泛公共发布前必须重新完成逐资产、商标、语言和无障碍审查。所有生成图仅表达关系、氛围、组件或用户动作，不证明现状、精确落位、可建性、批准、部署、运行或绩效。
