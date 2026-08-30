---
title: "Jing-Zhang AI Spine — Urban Design for the Century-Long Jing-Zhang AI Innovation Belt"
author_github: "xiongtianji"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_file: "proposal.md"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A formal AI urban-design proposal package generated on the basis of provisional boundaries and structured self-check requirements; revised per the review comments (PR #3265): corrected metric credibility annotations, restructured the compliance-matrix evidence, embedded an open-source font to fix missing glyphs, and supplemented the depth-level content for agent.1–agent.6 (naming/VI/cases/scenarios/pilgrimage landmarks/implementation pathway). Precision warnings and recalculation requirements are retained; the organizer's data gaps do not block content scoring."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
revision_note: "v2 revision: responding to the two review comments from CocoSgt and anselasimov-web (PR #3265), primarily fixing the credibility-annotation contradiction, the near-duplicate compliance matrix, and the missing Chinese/English glyphs, while deepening the bespoke deliverables for agent.1–agent.6's six tasks."
---

# Jing-Zhang AI Spine — Urban Design for the Century-Long Jing-Zhang AI Innovation Belt

> **Version and status note (provisional boundary)**: This proposal is generated on the basis of the **provisional** coarse boundary provided by the organizer. All areas, ratios, building footprints, and project counts are **indicative**; confidence is uniformly marked as `low`, and values have been rounded to avoid creating a misleading impression of "survey-grade precision." Once the official polygon is released, a full recalculation must be performed. This status note is presented consistently in the main text, the HTML, the A3/A0 boards, and `sources.json` [source:SOURCE-REGISTRY].

## Design Basis and Source Inventory

This formal proposal takes as its primary basis the *Pre-Qualification Announcement for the International Urban-Design Scheme Solicitation for the Century-Long Jing-Zhang AI Innovation Belt*, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources. It further takes as machine-readable basis the maintained organizer-registered provisional coarse boundary, key areas, enumerations, metrics, and source inventory found in `brief/site-package/`. Before generating the proposal, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to establish the task list, scope, source-use map, and gap inventory. All design judgments must be decomposed into traceable sources, recalculable metrics, verifiable layers, and manually reviewable assumptions. The announcement requires the proposal to reach the urban-design depth of a regulatory detailed plan and the urban-design depth of a comprehensive implementation plan; therefore narrative text cannot substitute for GeoJSON, metric tables, the A3 booklet, the A0 display board, and the HTML digital presentation deliverables.

The proposal is not an independent vision document; rather, it organizes deliverables starting from the announcement, the agent-oriented task book, and the site materials. This section only places the most critical bases alongside the judgments [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. The complete source and standard coverage are preserved separately in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`, and the machine indices are not repeated in the main text.

The usage boundaries of the source registry are as follows [source:SOURCE-REGISTRY]:

- data/source_registry.json registers the usage boundaries of public, copyright-cleared, and provisional materials.
- Current registration summary: 7 formal-usable sources, 1 background source, 1 provisional-only source.
- The agent must not upgrade background_only or provisional_only materials into official boundary, statutory regulatory plan, formal scoring basis, or government implementation commitment.

`data/processed/agent_fact_pack.md` is the reading-navigation layer of this proposal, not a new authoritative source [source:PROCESSED-FACT-PACK]. It helps the agent organize the three-tier scope, the three key areas, the announcement tasks, agent.1–agent.6, source availability, and missing-data items into a readable proposal; factual judgments must still return to the registered original materials [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK], and the complete source relationships are preserved in `sources.json`.

![Source evidence chain and submission-package relationship diagram](assets/figures/site-overview.png)

When the official `SITE_BOUNDARY` or the three `KEY_AREA` polygons are not yet available, this scaffold uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a provisional formal package. The `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the submission package must both be marked as `provisional_constraint`, `official_boundary=false`; they may only be used for proposal generation, self-check, visualization, and design discussion, and cannot serve as official redline, approval basis, precise-area basis, or statutory control conclusion. The organizer's data gap itself does not block content scoring; once official polygons replace them, the site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated.

The scorable status generated by this scaffold is: **provisional boundary, with precision warnings retained and pending recalculation upon official data release; does not block content scoring**. Therefore, the spatial structure, scenarios, projects, and metrics in the main text are written according to the principle of "discussable, reviewable, and recalculable after replacement by official boundaries"; once the official boundary and key-area polygons are updated, the agent must re-run the scaffold, the self-check, and the drawing/HTML generation, rather than replacing only a single file.

Boundary interpretation can return to the overall scope layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. The three key areas are verified via independent layers and count metrics [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count].

## Three-Tier Scope Working Framework

The proposal organizes its work according to the three tiers defined in the announcement: the overarching research scope concerns the 43.6 km² AI industry ecosystem, strategic positioning, innovation chain, and future urban form; the overall design scope concerns the 11.4 km² urban district and industrial area within 1–2 km around the Jing-Zhang Heritage Park, requiring an urban-renewal overall framework, industrial spatial layout, transport and municipal support, and urban-character control; the key-area scope concerns the 368.4 ha of three detailed-design areas, requiring explicit functional programs, building scale, retain/renovate/demolish classification, public-space connectivity, and traffic organization. The three tiers are mapped item by item in `compliance_matrix.json`, ensuring that announcement sections 1.3, 1.4, 1.5 and the mandatory tasks of agent.1–agent.6 each have a section, layer, metric, drawing, and HTML evidence.

The depth items of the three-tier working framework are governed by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence is anchored to [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; task basis is anchored to [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; and the scope index is navigated via the three-tier scope table of `project_scope_summary.csv` in [source:PROCESSED-FACT-PACK].

![Three-tier scope and spatial working framework diagram](assets/figures/land-use-structure.png)

The three tiers of work are not mutually isolated sets of drawings. The overarching research determines the industry-chain and urban-form judgments; the overall design translates those judgments into renewal projects, spatial structure, and facility capacity; and the key-area detailed design verifies the implementability of specific parcels, buildings, traffic, public space, and AI application scenarios. When generating the proposal, the agent must first lock down the official or provisional boundary and constraints adopted by the current submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculate metrics from these layers and explain in the main text which conclusions remain constrained by the provisional boundary. Any area, ratio, scale, or project count that cannot be recalculated from structured data must not be written into a formal conclusion.

The overall concept proposed by this proposal is the "Jing-Zhang Symbiotic AI Belt": with the Jing-Zhang Heritage Park as the historical and public-space spine, the three key areas — Zhongzhi Park, Beijing AI Origin Community, and Dazhongsi — as innovation anchors, and universities, enterprises, communities, and rail stations as the everyday network, forming the spatial organization of "one belt, three cores, multiple scenario nodes, and a blue-green slow-mobility composite loop." Here "one belt" is not an additionally drawn new redline, but a translation of the three announcement tiers into a working method; "three cores" correspond to the three key areas; "multiple scenario nodes" correspond to operable nodes of AI + public services, industry services, and urban life; and the "composite loop" corresponds to the linkage of slow mobility, green space, public space, and activity routes.

| Tier | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Overarching research scope | How to organize the AI industry ecosystem and future urban form | Establish an innovation chain of "university origination – open-source collaboration – enterprise translation – public experience – international dissemination" | compliance_matrix.json, standard_matrix.json |
| Overall design scope | How to put industry space, urban renewal, transport & municipal, and character on the map | Expressed jointly by land-use, building, road, green-space, public-space, and phasing layers | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-area scope | How the three areas reach detailed-design depth | Propose positioning, spatial actions, AI scenarios, and implementation dependencies respectively | [data:geometry/key_areas.geojson#PROV-KEY-001], #PROV-KEY-002, #PROV-KEY-003 |

## Overall Concept and Naming System (agent.1)

The agent-oriented task book requires that "the naming scheme and logo design should serve overall recognizability." This proposal provides a naming system with bilingual correspondence that can be further deepened, avoiding stopping at slogans.

**Chinese naming system**
- Master brand: **Jing-Zhang AI Spine (京张智脊)** — a pun on "the spine of the Jing-Zhang Railway and the spine of AI innovation," emphasizing the continuous backbone of the historical corridor and the future industry.
- Sub-brand / event brand: **Jing-Zhang Symbiotic AI Belt (京张智脉共生带)** (concept layer, not a redline).
- The three key areas reuse the task-book positioning and add identifying names: Zhongzhi Park (众智园, AI self-innovation accelerator), Beijing AI Origin Community (北京 AI 原点社区, translation & talent community), Dazhongsi AI Industry Cluster (大钟寺 AI 产业聚集区, intelligent economy & international exchange district).
- Annual event brand: **Global AI Week · Jing-Zhang Line (全球 AI 活动周 · 京张线)**.

**English naming system**
- Master brand: **Jing-Zhang AI Spine** (京张智脊).
- Concept layer: **Jing-Zhang Symbiotic AI Belt**.
- Key areas: **Zhongzhi Park** (AI self-innovation accelerator), **Beijing AI Origin Community** (translation & talent community), **Dazhongsi AI Industry Cluster** (intelligent economy & international exchange).
- Annual program: **Global AI Week · Jing-Zhang Line**.

The naming logic strings "railway heritage – open-source collaboration – industry translation – public experience – international dissemination" into a memorable narrative line, serving the unified recognizability of the key areas, event routes, and pilgrimage landmarks [source:AGENT-TASKBOOK].

## Visual Identity System and Logo Directions (agent.1)

This proposal does not submit a final logo file, but provides **logo directions, color zoning, and visual hierarchy** for a professional team to deepen [source:AGENT-TASKBOOK].

- **Logo direction A (spine line)**: Compose an upward spine line from the negative space of the "herringbone" zigzag of the Jing-Zhang Railway, embedding a square node in the middle segment to represent AI compute / open-source grid; can be two-color (deep ink green + signal orange).
- **Logo direction B (symbiotic loop)**: With the Jing-Zhang Heritage Park slow-mobility loop as the outer ring, embed three points representing the three key areas; the break in the ring represents the "slow-mobility breakpoints yet to be connected," echoing renewal project JZ-01.
- **Color zoning (consistent with land-use / functional bands)**: AI R&D innovation band = signal orange (#E8590C); Jing-Zhang blue-green park spine = Jing-Zhang green (#2F6B4F); industry service & commerce composite band = intelligence blue (#1C5D99); community-support band = warm gray (#6B6B6B).
- **Visual hierarchy**: master mark + area sub-mark + event mark + pilgrimage-landmark seal. All graphics, icons, fonts, and images must be copyright-cleared; the font uses the open-source **Noto Sans SC (SIL OFL 1.1)**, registered in `report/copyright_statement.md`.

## Three Zones, Two Wings Synergy Framework (agent.1)

The task book requires a response to the "five major functions" and the "three zones, two wings" synergy. This proposal defines the "three zones" as **the overarching research zone, the overall design zone, and the key detailed-design zone** — three working tiers; the "two wings" are defined as the **innovation-origination wing (universities / institutes / open source)** and the **industry-translation wing (enterprises / capital / international)**, which meet at the key areas via the Jing-Zhang AI Spine.

- **Five major functions ↔ spatial anchors**: AI R&D innovation (Zhongzhi Park / intelligence-blue band); industry services & commerce (Dazhongsi / intelligence-blue band); public space & blue-green (Jing-Zhang Heritage Park spine); talent living & translation (Origin Community / warm-gray band); international exchange & exhibition (Dazhongsi international roadshow + Global AI Week).
- **Synergy loop**: university origination → open-source collaboration (Origin Community) → enterprise translation (Zhongzhi Park / Dazhongsi) → public experience (Heritage Park spine) → international dissemination (AI Week) → return flow of talent and capital. This loop is locatable in [data:geometry/land_use.geojson#LU-001] and [data:geometry/phasing.geojson#PHASE-001].
- Synergy diagram: see `assets/figures/land-use-structure.png` (redrawn, with geographic base, scale bar, and orientation).

## Regional Innovation Synergy Mechanism (agent.1)

The Jing-Zhang AI Spine is not a closed park, but a node in a regional innovation network. This proposal clarifies its synergy relationships and interfaces with surrounding innovation carriers [source:OFFICIAL-ANNOUNCEMENT]:

- **Beiwei Community / Beitai Area**: Share talent and open space via slow mobility and rail connection, serving as an overflow recipient for "near-campus translation."
- **Future Science City**: Form a "testing – pilot – scenario" division on autonomous-model testing and safety-governance sandboxes (JZ-02/JZ-05), avoiding redundant construction.
- **Huairou Science City**: Establish a data–compute synergy interface on public data from scientific facilities and low-carbon compute, echoing the "data-element parlor."
- **Beijing Economic-Technological Development Area (BDA)**: Receive the incubation outcomes of Jing-Zhang on enterprise translation, international roadshows, and manufacturing support.
- **Beijing–Tianjin–Hebei synergy**: Use "Global AI Week · Jing-Zhang Line" as the annual interface, linking Tianjin and Hebei's compute and industrial hinterland, forming the division narrative of "R&D in Jing-Zhang, translation in Beijing–Tianjin–Hebei."

The above relationships are all **synergy suggestions / reference schemes**, not confirmed government arrangements, and must be deepened by a professional team and confirmed officially.

## Overarching Research Scope: Industry and Future-City Research

The core task of the overarching research scope is to build a world-class AI innovation ecosystem. The proposal should sort out Haidian's universities and institutes, leading enterprises, compute/algorithm/data factors, incubation platforms, listed companies, unicorns, and technology-service resources, and propose a spatial synergy framework for the AI innovation chain, industry chain, talent chain, and urban-service chain. The naming scheme and logo design should serve the overall recognizability of the "century-long Jing-Zhang cultural belt, urban AI-life experience belt, and AI convergence-innovation belt," not merely stop at slogans, and should explain the connection with the industry ecosystem, public space, and cultural resources. The agent-oriented task book also requires a response to the "five major functions" and the "three zones, two wings" synergy, forming a naming system, visual identity, overall spatial-structure diagram, scenario opening, and operating mechanism that can be further deepened; this section must mark with [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] that these requirements come from the agent open-call task, not from statutory planning control.

The overarching research does not add pseudo-precise new redlines; through the urban character, public space, and building-layout coordination required by [standard:MOHURD-URBAN-DESIGN-MEASURES], it reconnects to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure], explaining that the industry strategy must ultimately land in a visible, reviewable spatial structure.

Future urban-form research should answer how artificial intelligence changes work, life, socializing, learning, transport, and public services. The proposal should turn AI transport systems, continuous green space, innovation-service facilities, and an internationalized living-and-working atmosphere into locatable functional zones, nodes, corridors, and scenarios, rather than describing a technological vision in vague terms. The agent should write industry-strategy metrics, AI innovation index, talent density, spatial-supply types, and AI + vertical-application key areas into the indicator system, marking which are official, which are design suggestions, and which still await formal-data calibration. If global AI innovation events, developer communities, open scenarios, or pilgrimage routes are proposed, they must be written as "concept suggestion / reference scheme / for a professional team to deepen," and must not be written as already-confirmed government events or implementation arrangements.

## Global AI Innovation Corridor Cases (agent.2)

To establish a reference frame for learning, this proposal reviews 6 global AI / innovation-district cases, extracting lessons and warnings relevant to Jing-Zhang (all are public-material overviews, not precise benchmarking) [source:OFFICIAL-ANNOUNCEMENT]:

| # | Case | Type | Transferable lesson | Warning for Jing-Zhang |
| --- | --- | --- | --- | --- |
| 1 | Shenzhen-Hong Kong Science & Technology Innovation Cooperation Zone (Hetao) | Cross-border sci-tech park | Coordinate Shenzhen–Hong Kong with "one belt, one zone"; open collaboration under the new system of nationwide mobilization | Avoid redundant construction; clarify division of labor with Huairou / Future |
| 2 | Seoul Pangyo Techno Valley | Enterprise-led innovation city | Leading firms + venture capital + talent community in compact mix | Prevent "bedroom community"; must supplement public space & slow mobility |
| 3 | Singapore Jurong Innovation District (JID) | Industry-research-living integrated park | Industry–R&D–living–green 20-minute composite rings | Green space & public space must be front-loaded, not patched on |
| 4 | Amsterdam Zuidas / Amsterdam Smart City | Station-oriented innovation district | Rail integration + city-level data platform + citizen participation | Data governance must presuppose privacy and manual review |
| 5 | Boston Kendall Square | University-origination innovation district | MIT spillover + near-campus translation + open-lab network | Near-campus translation must share benefits with the community; prevent gentrification |
| 6 | Paris Station F / innovation district | Existing-building activation | Activate old factories as open-source & startup hub, low-cost start | Existing-building renewal must resolve ownership & fire-safety preconditions |
| 7 | Helsinki Kalasatama | New-district data foundation | Open data + digital twin supporting operations | Digital twin depends on official base map; Jing-Zhang recalculates with provisional first |
| 8 | Toronto Quayside (Sidewalk lesson) | Failure warning | Over-reliance on single-firm data governance triggered public backlash | Jing-Zhang insists on data minimization, manual review, public priority |

Case conclusion: A successful AI innovation belt = **compact mix + rail integration + front-loaded green space + credible data governance + public priority**; the commonality of failure = opaque data governance, absent public space, conflict with community interests. These lessons feed directly into the "seven-element safeguard mechanism" below.

## AI Innovation Ecosystem Map (agent.2)

This proposal uses an "innovation ecosystem map" to describe the relationships among actors, resources, and scenarios (diagram in the extended page of `assets/figures/metrics-evidence.png` and `visual/index.html`):

- **Origination layer**: Universities and institutes such as Tsinghua, Peking, CAS; open-source communities; new-type R&D institutions.
- **Translation layer**: Zhongzhi Park (autonomous-model testing / standards), Origin Community (outcome incubation / open-source release), Dazhongsi (corporate HQ / international roadshow).
- **Factor layer**: Compute (edge compute station JZ-05), data (data-element parlor), algorithm (open-source models), capital (venture capital / government funds), talent (talent zone).
- **Service layer**: Enterprise-service copilot, AI life-service model street, legal / IP / investment-financing services.
- **Experience layer**: Jing-Zhang Heritage Park spine, AI pilgrimage landmarks, Global AI Week route.
- **Governance layer**: Safety-governance sandbox, data minimization, manual review, open sources.

The map is expressed as a "feedback loop": experience and governance flow back to origination and translation, forming a self-reinforcing ecosystem.

## Seven-Element Safeguard Mechanism (agent.2)

The task book requires establishing a synergy mechanism of "land – space – industry – capital – talent – compute – data – scenario." This proposal gives the safeguard logic and responsibility interfaces for eight elements (with "space" listed separately):

| Element | Mechanism | Spatial / institutional anchor | Responsible interface (suggested) |
| --- | --- | --- | --- |
| Land | Stock renewal prioritized; retain/renovate/demolish classified supply | Origin Community / Dazhongsi ground-floor programs | Haidian renewal platform + ownership entity |
| Space | Blue-green slow-mobility composite loop linking three cores | Jing-Zhang Heritage Park spine + slow-mobility breakpoint stitching JZ-01 | Parks / transport departments |
| Industry | Leading + startup + open-source three-tier enterprise matrix | Zhongzhi Park / Dazhongsi / Origin Community | Industry authority |
| Capital | Government-fund guidance + venture capital + scenario procurement | AI Week / testing-scenario procurement | Finance / state-owned platform |
| Talent | Talent zone + open-source reputation + near-campus translation | Origin Community talent services | HR / education departments |
| Compute | Edge compute station + regional compute synergy | JZ-05 + Huairou Science City interface | Compute operators |
| Data | Data-element parlor (authorized / auditable) | Dazhongsi data parlor | Data group / compliance |
| Scenario | 10 scenario cards + 3 testing-validation scenarios | All-belt nodes | Operating entity (see scenario cards) |

This mechanism is a **design suggestion / reference scheme**; the specific lead parties, funding, and approvals must be confirmed by the officials and a professional team.

## Overall Design Scope: Urban Renewal and Regulatory-Plan-Depth Urban Design

The overall design scope must reach the urban-design depth of a regulatory detailed plan. The proposal must propose the urban-renewal overall spatial structure, low-efficiency-space identification, renewal-project list, implementation-policy suggestions, industry-function ratios, spatial-organization mode, total building scale, and comprehensive carrying-capacity assessment. `geometry/land_use.geojson` should fully cover the design boundary without overlap; `geometry/buildings.geojson` should express renewed or retained building footprints; `geometry/roads.geojson` should express micro-circulation, slow mobility, and rail-connection relationships; `metrics.json` should recalculate core areas, ratios, and layer counts.

This section decomposes the regulatory-plan-depth content into reviewable objects per [standard:MOHURD-CONTROL-DETAILED-PLANNING]: [data:geometry/land_use.geojson#LU-001] expresses the land-use structure, [data:geometry/buildings.geojson#BLDG-001] expresses the building footprint, [data:geometry/roads.geojson#ROAD-001] expresses the traffic organization, [metric:building_footprint_area_sqm] is used to verify the building footprint area, and [depth:land_use_layout] and [depth:development_intensity_controls] govern the deliverable depth.

The overall design must also support transport, rail, municipal, and supporting facilities. The proposal should propose spatial layout and implementation pathways around rail-station integration, road micro-circulation, non-motorized-vehicle parking, parking supply, innovation-service platforms, talent life services, new infrastructure, distributed energy, and edge compute. Content involving building height, development intensity, road redlines, setback lines, and facility standards, where official control conditions are not yet available, must be written as "pending confirmation of formal regulatory conditions," and must not pass off agent-estimated values as approved metrics.

## Key-Area Detailed Design

Key-area detailed design is mandatory. The Zhongzhi Park AI self-innovation accelerator should propose a detailed scheme around the national AI platform, full-stack self-innovation, standards formulation, safety governance, industry exhibition, external transport, Qinghe culture, a low-carbon green innovation-interaction environment, and green-space AI scenarios. The Beijing AI Origin Community should propose a detailed scheme around near-campus innovation, outcome incubation and translation, talent zone, open-source system, brand events, building retain/renovate/demolish, outcome exhibition and release, living-support amenities, campus-park slow-mobility connection, and rail-station integration. The Dazhongsi AI Industry Cluster should propose a detailed scheme around leading enterprises, agents, smart terminals, content consumption, data elements, digital assets, commercial services, planned-green-space composite use, Dazhongsi-station integration, and four-quadrant pedestrian connectivity at intersections.

The three key-area detailed designs must reference [data:geometry/key_areas.geojson#PROV-KEY-001], #PROV-KEY-002, #PROV-KEY-003, and be checked by [depth:three_key_area_detailed_design] for whether they reach the depth of a comprehensive implementation plan. If it only describes "building a demonstration zone" without evidence of function, building, traffic, public space, and implementation projects, it should be regarded as incomplete.

![Three key areas index and design-task diagram](assets/figures/key-areas.png)

The three key areas must appear in `geometry/key_areas.geojson`. If the repository already provides official polygons, they should be used as `official_constraint`; if official polygons are missing, `provisional_constraint` may be used temporarily, but the main text, HTML, sources, assumptions, and self_check must state that it cannot serve as a formal scoring or approval basis. `compliance_matrix.json` should separately cover announcement sections 1.5.3.1, 1.5.3.2, 1.5.3.3. The design expression should include functional program, building scale, building form, retain/renovate/demolish classification, public-space system, traffic organization, slow-mobility connectivity, and implementation projects. The HTML page should be able to switch among the three key areas; the A3 booklet and A0 board should at least include the key-area master plan, partial details, and metric notes.

| Key area | Design positioning | Spatial action | AI industry & operating scenarios | Evidence reference |
| --- | --- | --- | --- | --- |
| Zhongzhi Park AI self-innovation accelerator | Garden-style full-stack self-innovation district | Strengthen the Qinghe interface, industry exhibition, low-carbon innovation interaction, and external-transport organization; use green space to host open testing and standards-governance exhibition | Autonomous-model testing, standards-formulation workshop, safety-governance exhibition, low-carbon compute experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |
| Beijing AI Origin Community | Near-campus outcome-translation & talent community | Organize campus–park–district slow-mobility stitching; supplement outcome-release, talent services, living amenities, and open-source collaboration space | Open-source community, outcome release, talent-zone services, near-campus incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster | Urban intelligent-economy & international-exchange district | Around Dazhongsi-station integration, four-quadrant pedestrian connectivity, commercial services, and key-enterprise public-environment renewal | Agent & smart-terminal exhibition, content consumption, data elements & international roadshow | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count] |

## AI Innovation Ecosystem, Talent Personas, and AI+ Scenarios (agent.3 / agent.4)

The proposal establishes spatial-demand personas for AI talent and enterprises, covering R&D office, open-source collaboration, outcome release, enterprise services, talent living, social learning, consumer life, sports & leisure, and international exchange. AI+ scenarios are formed around the transport, service, consumption, healthcare, education, legal, and life-service directions proposed in the announcement. Each scenario must state its service object, spatial location, data source, privacy boundary, manual-review mechanism, and operating entity [source:AGENT-TASKBOOK].

### User Personas (including inclusive groups)

| User persona | Typical need | Spatial response | Privacy / self-check boundary |
| --- | --- | --- | --- |
| Open-source developer | Release, collaborate, test, community reputation | Origin Community open-release hall, public code wall, nighttime collaboration space | Do not collect personal behavioral trajectories; activity data only aggregated statistics |
| Startup team | Low-cost office, compute access, product testbed | Zhongzhi Park shared test field, edge-compute service point | Compute and data services require separate authorization |
| Leading-enterprise visitor | Exhibition, business, international reception, talent recruiting | Dazhongsi international roadshow parlor, rail connection | Enterprise marks and cases must be copyright-cleared |
| Nearby resident | Commuting, leisure, community services, low-disturbance renewal | Jing-Zhang Heritage Park slow-mobility loop, embedded community services | Do not use resident profiles for commercial recommendation |
| University faculty & students | Outcome translation, cross-campus collaboration, daily slow mobility | Campus–park slow-mobility stitching, outcome-translation station | Campus data and research results require authorization |
| **Elderly** | Accessibility, clear guidance, human service | Continuous accessible path, human service desk, voice guidance | Non-digital service degradation channel |
| **Children** | Safety, play, educational experience | Park safe-activity zone, AI education experience point | Do not collect children's biometric features |
| **Persons with disabilities** | Continuous accessibility, facility reachability | Accessible ramp / elevator, continuous tactile paving, wheelchair reach | Machine-vision check cannot replace compliance acceptance |
| **Low digital-literacy users** | Simple interface, human assistance | Human service desk, paper / voice alternative | Provide non-digital service degradation |
| **Night-shift workers** | Safe lighting, nighttime reachability, low disturbance | Tiered nighttime lighting, 24h slow-mobility connectivity | Use only aggregated safety data, no personal profiling |

### Ten AI Scenario Cards (upgraded: with data / privacy / review / entity / maturity / failure-degradation / KPI)

| Card | Name / carrier | Input data | Privacy boundary | Manual review | Operating entity (suggested) | Tech maturity | Failure degradation | KPI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Open-release hall | Origin Community | Public code-contribution metadata | Aggregated only, no personal trajectory | Community moderator review | Open-source foundation + community | TRL7 | Switch to offline release | ≥50 releases / year |
| 02 Safety-governance sandbox | Zhongzhi Park | Authorized models / test sets | Test data stored in isolation | Red team + expert review | Standards body + park | TRL6 | Pause testing and manual takeover | ≥20 models tested / year |
| 03 Edge-compute station | Overall nodes | Energy / load aggregation | Do not collect user content | O&M inspection | Compute operator | TRL5 | Switch to regional compute | Station availability ≥99% |
| 04 AI slow-mobility navigation | Heritage Park spine | Anonymous crowd / breakpoints | No personal identification | Planner weekly review | Parks + transport | TRL7 | Static signage | Breakpoint identification ≥90% |
| 05 Dazhongsi international roadshow parlor | Dazhongsi | Public enterprise info | Cases must be copyright-cleared | Brand review | Operating company | TRL8 | Switch to online roadshow | ≥30 roadshows / year |
| 06 Qinghe low-carbon innovation corridor | Zhongzhi Park riverside | Energy / stormwater aggregation | No personal involvement | Environment engineer review | Park + water authority | TRL6 | Conventional green-space maintenance | Carbon emission ↓ ≥5% / year |
| 07 Near-campus outcome-translation street | Origin Community | Public outcomes / patents | Outcomes require authorization | Legal review | University + incubator | TRL7 | Switch to online matchmaking | ≥40 translations / year |
| 08 Data-element parlor | Dazhongsi | Authorized datasets | Authorization + auditable | Compliance-officer review | Data group | TRL6 | Pause and go offline | Compliant circulation ≥10 themes |
| 09 AI life-service model street | Community / commerce | Aggregated service requests | No personal profiling | Subdistrict review | Subdistrict + operator | TRL7 | Human service desk | Satisfaction ≥80% |
| 10 Global AI Week route | Belt public space | Event aggregated data | No personal collection | Security + organizing committee | Event organizing committee | TRL8 | Diversion / flow control | ≥50,000 participants / year |

### At least 3 industry testing-validation scenarios (clearly marked)

- **T1 Autonomous-model open testing** (Zhongzhi Park): Conduct safety / performance benchmark testing of autonomous large models in the sandbox, output an auditable report; validate the "testing – pilot – scenario" closed loop.
- **T2 Edge-compute public-benefit pilot** (JZ-05): Deploy low-power inference at the station, validate local-processing latency and energy consumption for privacy-sensitive scenarios.
- **T3 Slow-mobility breakpoint AI identification** (JZ-01): Use anonymous sensors + manual review to validate breakpoint-identification accuracy, forming a reusable renewal list.

### AI Pilgrimage Landmarks (at least 3)

1. **Tsinghua Garden Station Memory Stop**: Starting from the site of the Jing-Zhang Railway's Tsinghua Garden Station, telling the spatiotemporal dialogue between the "herringbone" railway and the AI spine.
2. **Wall of Origin**: A real-time visualization wall of open-source contributions in the Origin Community, serving as a developer "pilgrimage" and honor-display node.
3. **Spine Eye**: An AI art installation / observation deck above Dazhongsi Station, becoming an international-roadshow and urban check-in point.
4. (Alternative) **Low-Carbon Innovation Beacon**: A zero-carbon exhibition tower on the Qinghe interface of Zhongzhi Park.

### Honor-Display System

Establish a three-tier honor system of "contribution wall + annual ranking + open-source reputation badge": the contribution wall displays individual / team open-source and scenario contributions; the annual ranking is released at the AI Week; the open-source reputation badge is a digital / physical badge that can be further deepened. All portraits and cases must be copyright-cleared [source:AGENT-TASKBOOK].

### Public-Space Component Library

Provide a reusable public-space "component" list (not fixed drawings, for deepening): ① slow-mobility stitching node, ② open-release hall module, ③ continuous-accessible-path module, ④ low-carbon innovation interaction pavilion, ⑤ data-element parlor module, ⑥ AI education experience point, ⑦ nighttime safe-lighting unit, ⑧ pilgrimage-landmark seal. Each component is marked with applicable area, minimum scale, and verifiable metrics, entering [data:geometry/public_space.geojson#PUBLIC-001].

AI scenarios must land in spatial and governance boundaries: public-space scenarios reference [data:geometry/public_space.geojson#PUBLIC-001], slow-mobility and transport scenarios reference [data:geometry/roads.geojson#ROAD-001], open-space scenarios reference [data:geometry/green_space.geojson#GREEN-001] and [metric:public_space_ratio], [metric:green_ratio]. The agent-generated AI-governance suggestions must obey the principles of data minimization, open sources, explainability, and manual review; the urban agent may assist in identifying slow-mobility breakpoints, public-space heatmaps, facility maintenance, enterprise-service needs, and event-safety risks, but cannot replace planning approval, cannot output unauthorized personal profiles, and cannot claim official implementation commitments.

## Land Use, Building Scale, and Retain/Renovate/Demolish Scheme

The land-use scheme should be expressed per public standards such as territorial spatial survey, planning, and use-control classification, forming a complete, closed, seamless land-use zoning. The building scheme should distinguish retained, renovated, renewed, newly built, or to-be-confirmed objects, and clarify the suggested tiers for building footprint, function, scale, character, roof, massing, and height control. If current-building, ownership, regulatory-plan, and engineering conditions are missing, the proposal can only propose a method and a to-be-calibrated list, and must not fabricate retain/renovate/demolish conclusions.

Land-use classification is based on [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; building height, massing, interface, and character control are managed by [depth:height_massing_character]; the retain/renovate/demolish method is managed by [depth:retain_renovate_demolish]. The main evidence for land use and buildings is [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], and [metric:building_footprint_area_sqm].

Building-scale and intensity metrics must be consistent with `metrics.json` and the layers. If total building scale, FAR, building height, building density, green ratio, setback line, and building control line lack official conditions, `status=unknown` should be used uniformly, and the to-be-supplied conditions, current assumptions, and recalculation path after formal data arrive should be stated in `reason` / `assumptions`, without using fixed values to create a sense of precision. The A3 booklet should give the renewal-project list and metric-verification table; the A0 board should clearly express the key spatial structure and key areas; the HTML page should provide linked viewing of metrics and layers.

## Transport, Rail, Municipal, and Public-Service Facilities

The transport scheme should respond to the announcement's requirements for rail-station integration, road micro-circulation, slow-mobility breakpoints, external transport, parking, non-motorized-vehicle parking, and green-transport systems. The focus should cover the North 5th Ring Road, the Jing-Zhang Heritage Park cross-ring-node, Wudaokou, Qinghua East Road West Exit, Dazhongsi Station, and the transport connections around key enterprises. The road and slow-mobility layers should stay within the submission boundary and cross-check with public space, green space, industry nodes, and key areas; if the submission boundary is provisional, the transport conclusions can only serve as provisional design discussion.

The transport and municipal professional depths are governed respectively by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure]; layer evidence references [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/constraints.geojson#CONSTRAINTS]. When road redlines, pipelines, fire safety, and municipal conditions are missing, they should be explained as to-be-supplied through assumptions, rather than written as approved conditions.

![Transport slow-mobility and blue-green public-space composite-system diagram](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover AI industry-service facilities, innovation-service platforms, talent life-service facilities, new infrastructure, distributed energy, edge compute, and the integration of traditional municipal facilities. The proposal should explain facility standards, spatial layout, service radius, operating model, and phased-implementation logic. When engineering materials such as pipelines, energy, drainage, flood control, and fire safety are missing, they should be listed as formal deepening preconditions.

## Blue-Green Space, Public Space, and Urban Character (agent.5)

The blue-green space scheme should take the Jing-Zhang Heritage Park vitality belt as its skeleton, coordinate the travel needs of the Qinghe River, Xiaoyue River, surrounding universities, enterprises, and communities, and propose a north–south through, east–west connected system of walkways, cycle paths, and green space. The proposal should identify slow-mobility breakpoints, over-ring-road nodes, and the south and north landscape nodes of the park, and propose composite-use strategies for parking, sports, innovation interaction, technology testing, application exhibition, and public services.

The blue-green public space is jointly verified by the design-depth items and the green-space and public-space layers [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The green-space and public-space ratios are explained in the main text for their design significance (green_ratio ≈ 0.123, public_space_ratio ≈ 0.073, both provisional recalculated values), with the complete recalculation preserved in `metrics.json`; the coordination of urban character, public space, and building control returns to the professional standard matrix [standard:MOHURD-URBAN-DESIGN-MEASURES].

The urban-character scheme blends the historical culture of the Jing-Zhang Railway, the Zhongguancun innovation culture, and the AI innovation culture, and uses cultural resources such as the Tsinghua Garden railway station and the Beijing Film Academy to propose guidance on urban tone, building character, roof form, massing, interface, and public art. Wayfinding signage, cultural symbols, international-dissemination narrative, AI pilgrimage landmarks, the contribution wall, and the honor-display system have been given directions in the agent.4 / agent.1 sections; all brands, fonts, images, portraits, and enterprise marks must have copyright-cleared sources. Character control should distinguish official control, design suggestions, and to-be-confirmed conditions, and must strictly refrain from giving pseudo-precise control lines without cultural-heritage-protection or regulatory-plan basis.

## Renewal-Project List, Implementation Policy, and Phasing Plan (agent.6)

The implementation scheme forms a reviewable renewal-project list, stating project location, type, function, responsible entity, dependency conditions, implementation phase, risk, and evaluation metrics. Policy suggestions cover urban-renewal coordinated implementation, spatial supply, operating mechanism, industry services, public participation, data governance, and property-rights coordination. `geometry/phasing.geojson` expresses the phasing scope, and `compliance_matrix.json` links each task with phasing and drawings.

The project list and phasing depth are managed by [depth:renewal_project_list] and [depth:phasing_implementation], with phasing spatial evidence [data:geometry/phasing.geojson#PHASE-001]. Without ownership, funding, implementation entity, and approval path, the proposal must write it as an implementation risk, not a landing commitment.

| Project | Name | Type | Suggested lead | Collaborators | Time window | Resource need | Min. pilot scale | Phase KPI | Risk gate | Exit mechanism |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Heritage Park slow-mobility breakpoint stitching | Public space / transport | Haidian parks + transport | Subdistrict, volunteers | Near term (0–12 mo) | Under-bridge space permit, slow-mobility design | 1 breakpoint demo segment | Breakpoint identification ≥90% | Redline / ownership undecided → pause | Switch to routine maintenance |
| JZ-02 | Zhongzhi Park Qinghe innovation interface | Blue-green / industry exhibition | Zhongzhi Park operator | Water, ecology | Near–mid term | River blue line, flood-control conditions | 200m demo interface | Carbon emission ↓ ≥5% | Flood control unapproved → shrink scale | Switch to green-space maintenance |
| JZ-03 | Origin Community near-campus outcome-translation street | Renewal / industry service | University + incubator | Subdistrict, IP | Near–mid term | Campus boundary, ground-floor program | 1 block | ≥40 translations / year | Ownership dispute → segment | Switch to online matchmaking |
| JZ-04 | Dazhongsi Station four-quadrant pedestrian connectivity | Rail integration / slow mobility | Rail + transport | Municipal, enterprise | Mid term (12–36 mo) | Station integration, pipelines | 1 intersection quadrant | Pedestrian connectivity ≥95% | Pipeline conflict → revise scheme | Switch to signal optimization |
| JZ-05 | AI public service & edge-compute node | New infrastructure / public service | Compute operator | Energy, compliance | Near–mid term | Energy, safety entity | 3 stations | Availability ≥99% | Energy exceeds limit → derate | Switch to regional compute |
| JZ-06 | Global AI Week public route | Operation / brand | Event organizing committee | Culture-tourism, public security | Annual continuous | Public-space permit, copyright clearance | 1 annual route | ≥50,000 / year | Safety / copyright → flow control | Switch to online event |

Phasing is distinct from the 100-day solicitation design period: the solicitation period is the time requirement for submitting deliverables, while the implementation phasing is the advancement path for urban renewal and project construction. The proposal proposes near-term pilots, mid-term renewal, and long-term governance framework, and marks which content can be started first with lightweight facilities, operating activities, and service platforms, and which must wait for confirmation of formal regulatory-plan, municipal, transport, and ownership conditions.

### Annual AI Innovation Event System

- **Global AI Week · Jing-Zhang Line**: Annual flagship event, linking heritage culture – open-source community – industry exhibition – international roadshow, serving as the international-attraction and public-experience entry point.
- **Open-release season / standards workshop**: Quarterly, hosted by the Origin Community and Zhongzhi Park.
- **Scenario open day**: Monthly, opening testing scenarios (T1–T3) for enterprises and the public to experience.
- **Developer-community operation**: Maintain activity via the Wall of Origin, contribution ranking, and reputation badges, providing documentation, compute quota, and exhibition slots.
- **International-attraction translation path**: AI Week → roadshow parlor → landing services (legal / IP / investment-financing) → translation tracking, forming an "experience – matchmaking – landing" closed loop.

The above events and operations are all **concept suggestions / reference schemes**; frequency, responsibility boundaries, and translation paths must be confirmed by a professional team and the officials, and must not be written as already-confirmed government arrangements.

## Indicator System, Area Recalculation, and Compliance Matrix

The indicator system should at least include overall-design-scope area, key-area area, green-space and public-space ratios, building footprint, renewal-project count, AI scenario nodes, slow-mobility connectivity metrics, industry-space metrics, talent-service metrics, and self-check status. All known metrics must be recalculable from GeoJSON or trusted sources; unknown metrics must give the reason and formal-submission preconditions. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for formal self-check.

Metric recalculation follows the unified design-depth requirement [depth:metrics_recalculation]. The main text focuses on explaining the design meaning of the metrics; the complete values, formulas, source files, and confidence are preserved in `metrics.json` (currently provisional recalculation: site_area ≈ 11.41 km², green_ratio ≈ 0.123, public_space_ratio ≈ 0.073, building_footprint ≈ 0.31 km², key_area_count = 3, all confidence `low`).

![Core-metric recalculation and evidence-chain diagram](assets/figures/metrics-evidence.png)

The compliance matrix is the master file for task responsiveness. Every announcement task and agent_taskbook task must correspond to a report section, layer, metric, drawing, HTML page, source, assumption, and self-check item. This version separately references the bespoke deliverables for agent.1–agent.6 (naming / VI, cases / map / mechanism, scenario cards / testing scenarios, public-space component library / pilgrimage landmarks, cultural narrative, implementation pathway / event system), no longer mapping all tasks to the same set of evidence. If any mandatory task of announcement 1.3, 1.4, 1.5 or agent.1–agent.6 is not covered, the proposal must not enter formal professional scoring.

When formally deepening, the agent should also divide each metric into three categories: the first is spatial metrics directly recalculable from submitted geometry; the second is control metrics needing official regulatory-plan or task-book attachments (FAR, height, density, setback, redline, facility standards, currently `unknown`); the third is performance metrics needing continuous calibration by operational or industry data (AI innovation index, talent density, satisfaction, accessibility, participation, usage frequency). The three categories of metrics enter `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively, to avoid mistakenly writing operational vision as approved planning conditions.

## Risk, Copyright, and Compliance Statement

**Bilingual requirement.** The main proposal file may use Chinese or English, but a complete corresponding translation must be provided via `proposal.en.md`; the A3/A0, HTML, and text-bearing drawings must also provide corresponding-language copies. All image, drawing, icon, data, and code assets must state their source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. The HTML pages must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behavior (this package's HTML has embedded open-source fonts, zero external-network dependency).

The risk and missing-data list are jointly verified by the risk-depth item, the constraint layer, and the site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]. The official-boundary, key-area, regulatory-plan, road, parcel, building, municipal, cultural-heritage, and public-service gaps listed in `missing_data_checklist.csv` must enter `assumptions.json`, the self-check, and the main-text risk section. Any conclusion lacking official regulatory-plan, road-redline, ownership, municipal, fire-safety, or cultural-heritage conditions must be downgraded to a to-be-confirmed item; the complete professional check is preserved in the standard matrix.

This proposal does not claim official approval, approved regulatory plan, final land ownership, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression; maintainers and professional reviewers may request rework or rejection based on self-check results, spatial review, and the compliance matrix.

## References

- brief/public-brief.md
- brief/site-package/design_brief.json
- brief/site-package/allowed_design_space.json
- brief/site-package/enums/
- brief/site-package/ranges/planning_limits.json
- data/processed/agent_fact_pack.md
- data/processed/project_scope_summary.csv
- data/processed/agent_task_requirements.csv
- data/processed/source_use_matrix.csv
- data/processed/missing_data_checklist.csv
- Complete machine index: see `sources.json`, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, and `design_depth_matrix.json`
- The bibliography entries in this section are based on the site-package registration; full provenance and licenses are in the structured source list [source:SITE-PACKAGE]
