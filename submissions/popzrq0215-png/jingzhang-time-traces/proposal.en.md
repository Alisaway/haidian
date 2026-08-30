---
title: "Jingzhang Time-Traces: A Four-Dimensional Elastic City Corridor Driven by Spatial Elastic Interfaces"
author_github: "popzrq0215-png"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A four-dimensional elastic city corridor and future 'AI Digital Oasis' driven by Spatial Elastic Interfaces: within a 1909-2100 two-century coordinate system, three-dimensional layering plus elastic interfaces, one axis with three cores, a 4D fluid transport network, and an AOD development model turn the Jingzhang heritage corridor from a physical scar into a super city spine. All metrics are recomputed under EPSG:4548 on provisional boundaries; long-horizon claims are registered as scenario targets."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Jingzhang Time-Traces: A Four-Dimensional Elastic City Corridor Driven by Spatial Elastic Interfaces

Within the roughly 43.6 square kilometres of the coordinated research area between the North Fifth Ring Road and Xizhimenwai Avenue in Haidian District, the 9-kilometre Jingzhang Railway Heritage Park and the surrounding 11.4 square kilometres of the overall design area form the core artery running through Haidian. In 1909, Zhan Tianyou broke the deadlock of steep mountain grades here with the "人"-shaped switchback line, opening the illustrious history of railways built independently by China; in 1949, this same track carried the historic turning point of the CPC Central Committee's "journey to Beijing for the great examination"; and by 2026, with the high-speed rail fully undergrounded, this surface remnant has evolved into an innovation axis threading three core clusters — the Zhongzhiyuan AI Independent Innovation Acceleration Zone (192.1 ha), the Beijing AI Origin Community (104.3 ha), and the Dazhongsi AI Industry Cluster (72 ha) [source:OFFICIAL-ANNOUNCEMENT] [source:SRC-JZ-HERITAGE-PUBLIC].

The core of this proposal is to establish the key technical philosophy of the **Spatial Elastic Interface** — breaking the static-blueprint mindset of one-off construction, stretching the horizon across the two-century coordinate system from 1909 to 2100, and converting a physical scar that once severed the city into a "super city spine" linking Zhongguancun's innovation resources with the university intelligence cores. The project is positioned as a **four-dimensional elastic city corridor** and a future **"AI Digital Oasis"** driven by Spatial Elastic Interfaces [source:AGENT-TASKBOOK].

This submission is a formal machine-readable package for the agent-facing open call: prose, GeoJSON layers, the metric recalculation chain, drawing sets, and the offline visual exhibit corroborate one another, and every spatial or quantitative claim is traceable to sources, assumptions, and recalculation formulas [depth:existing_conditions_diagnosis].

## Design Basis and Source List

This formal proposal takes the Pre-Qualification Announcement of the International Urban Design Competition for the Centennial Jingzhang AI Innovation Belt as its first basis, the agent-facing open-call taskbook as its task and boundary basis, and the maintainer-registered provisional boundaries, key areas, enums, metric ranges, and source lists in `brief/site-package/` as its machine-readable basis [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [source:SITE-PACKAGE]. Before generating the design, the agent read `design_brief.json`, `enums/`, `ranges/`, `schemas/`, and `data/source_registry.json`, and used the `data/processed/` navigation layer to build inventories of tasks, scopes, source-usage boundaries, and data gaps [source:PROCESSED-FACT-PACK].

Source-usage boundaries follow the registry [source:SOURCE-REGISTRY]:

- The announcement and taskbook are the formal controlling basis; textual extents are never used as precise boundaries.
- The national land-use and sea-use classification guide underpins the land-use codes [source:STD-LAND-USE-CLASS]; the urban design administrative measures and the regulatory-plan compilation measures underpin deliverable organisation and depth [source:STD-URBAN-DESIGN] [source:STD-CONTROL-PLAN].
- The Interim Measures for Generative AI Services and the Barrier-Free Environment Development Law constrain the AI scenarios and public-space design [source:STD-GENAI-MEASURES] [source:STD-BARRIER-FREE]; smart elderly-care policy serves as digital-inclusion background [source:BG-ELDERLY-SMART].
- Centennial facts about the Jingzhang Railway (completed in 1909, chief engineer Zhan Tianyou, the switchback line, the old Tsinghua-yuan station) are used only as narrative background, never as spatial or engineering claims [source:SRC-JZ-HERITAGE-PUBLIC].

**Provisional-boundary statement**: official red lines are unpublished. The `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in this package derive from repository-registered provisional rough polygons, are labelled provisional_constraint, and serve design generation, self-checking, visualisation, and review discussion only [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]. All areas, ratios, and drawings are recomputed under EPSG:4548 (assumption A-BOUNDARY-001); once official red lines are released, the full chain must be recomputed — no single file may simply be swapped.

## Three-Level Scope Framework

The proposal adopts the three-level spatial framework set by the announcement [source:OFFICIAL-ANNOUNCEMENT] [depth:three_level_scope_framework]:

| Level | Extent | Basis | Depth of work in this package |
| --- | --- | --- | --- |
| Coordinated research area | ~43.6 sq km between the North Fifth Ring and Xizhimenwai Avenue | Announcement text, not mapped | Industry and future-city research, trend diagnosis |
| Overall design area | ~11.4 sq km along the heritage park | Provisional boundary recomputed as 11,412,825.386 sqm [metric:site_area_sqm] [data:geometry/site_boundary.geojson#SITE-001] | Regulatory-plan-depth urban design: land use, transport, blue-green, massing, phasing |
| Key areas | Three core clusters [metric:key_area_count] [data:geometry/key_areas.geojson#PROV-KEY-001] | Announcement figures 192.1 / 104.3 / 72 ha | Detailed urban design and elastic-interface placement |

![Overview map of the overall design area and the three core clusters, showing the Digital Oasis spine, seven stitch crossings, and the Time-Traces landmarks unfolding north to south along the 9 km heritage corridor](assets/figures/site-overview.png)

The three levels work in concert: the research level answers "why elastic interfaces" (trends and crisis diagnosis), the overall design level answers "how interfaces organise the city" (one axis, three cores, three-dimensional layering), and the key-area level answers "how interfaces land" (the Art Steps, modular buildings, station prototypes) [depth:overall_spatial_structure].

## Coordinated Research Area: Industry and Future City Research

**Deep crises revealed by big-data diagnosis.** Nine kilometres of surface track have produced long-standing physical severance: the average spacing of arterial and secondary roads crossing the line exceeds 800 metres, forcibly cutting apart core intelligence assets such as Tsinghua, Peking University, Beijing Jiaotong University, and Zhongguancun. Meanwhile the twelve historic remnants, including the old Tsinghua-yuan station and the switchback line, are scattered as isolated points, swallowed by high-density construction and lacking a continuous narrative logic [source:SRC-JZ-HERITAGE-PUBLIC]. More seriously, the carrying capacity of the two-dimensional surface transport network has reached its limit, and static, rigid building stock without elastic interfaces cannot adapt to the rapid iteration of technology enterprises today or the flexible habitation of the far future [depth:existing_conditions_diagnosis].

**The core pathology is a deep paradigm mismatch.** A static, two-dimensional urban structure lacks an interface system for future three-dimensional evolution; the historic remnants remain in museum-style static display, cut off from the vitality of frontier technology; and rigid functional zoning cannot satisfy emerging modes of living and working that are nomadic, elastic, and human-machine symbiotic [source:AGENT-TASKBOOK].

**Evolutionary trends and the historical origin.** Zhan Tianyou's switchback line was, in essence, the first "physical spatial elastic interface" in the history of Chinese railway engineering, devised in the face of extreme gradients. In the 2026–2035 technological transition, L4 autonomous micro-circulation and low-altitude unmanned logistics reach commercial scale, requiring cities to reserve rights-of-way and vertical landing interfaces; in the 2035–2100 era of AGI and human-machine symbiosis, physical space must be schedulable and recomposable by AI in real time, and the spatial carrier evolves from static buildings into a dynamic "Intelligent Matrix" (technology-maturity assumptions registered as A-INTERFACE-001).

On this basis the plan establishes the overall vision **"Jingzhang Time-Traces: centennial heritage, future intelligent spine"**, with three positionings: a global paradigm for trans-century industrial-heritage revitalisation, a real-world proving ground for AGI infrastructure, and a demonstration district for three-dimensional autonomous transport [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design

**Overall strategy: massing generation and "three-dimensional layering + elastic interfaces".** The proposal establishes three vertical evolution layers [depth:overall_spatial_structure]:

- **Aerial layer (+100 m to +300 m)**: near term, designated demonstration routes for low-altitude unmanned logistics; far term, smooth expansion into honeycomb corridors dedicated to low-altitude aircraft and unmanned logistics, with digital acoustic barriers to cancel noise (subject to civil-aviation and airspace approval, see A-INTERFACE-001).
- **Surface and mid-air layer (0 m to +100 m)**: near term, reduce private cars on the ground and open the slow-mobility greenway, with the old track traces becoming the continuous native ecology and heritage trail of the "Digital Oasis" [data:geometry/green_space.geojson#GREEN-SPINE]; mid-air and building interfaces reserve Spatial Elastic Interfaces — suspension locks and high-level transfer platforms — preserving the physical possibility of mounting future floating structures of the "Intelligent Matrix".
- **Underground digital layer (below 0 m)**: near term, centralised data centres in the former high-speed-rail tunnel and the composite utility corridor, with elastic compute and logistics slots reserved inside the corridor; far term, seamless upgrading into decentralised supercomputing and a maglev pipeline logistics network.

**Spatial pattern: "one axis threading kinetic energy, three cores evolving in gradient".** The Digital Oasis spine runs north-south, threading the three core clusters through gradient evolution; the overall design area is fully partitioned into 23 land-use units (zero gaps, zero overlaps), reaching regulatory-plan-depth land-use organisation [data:geometry/land_use.geojson#LU-SPINE-PARK] [standard:MOHURD-CONTROL-DETAILED-PLANNING] [depth:land_use_layout].

**Development intensity and renewal mode.** Statutory FAR and height controls were not released with the site package and are recorded as unknown (assumption A-CONTROLS-001); this package offers concept reference values only: concept FAR 0.348 [metric:concept_far] and concept building coverage 5.74% [metric:building_density_concept] [depth:development_intensity_controls]. Renewal follows "retain-renovate-demolish" with retention first: track traces and historic remnants are preserved in place, existing buildings are prioritised for interface-embedded retrofit, and new construction is limited to a few essential nodes [depth:retain_renovate_demolish].

## Detailed Design of Key Areas

The three key areas are recomputed on provisional polygons and cross-checked against the announcement: Zhongzhiyuan ~192.9 ha [metric:key_area_zhongzhiyuan_sqm], the Origin Community ~104.3 ha [metric:key_area_origin_sqm], and Dazhongsi ~72.0 ha [metric:key_area_dazhongsi_sqm] (announcement figures 192.1 / 104.3 / 72 ha; recomputed values are for reference only) [depth:three_key_area_detailed_design].

![Detailed design of the three key areas, showing the modular R&D cluster of Zhongzhiyuan, the Art Steps time-space hub of the Origin Community, and the vertical intelligent-computing complex of Dazhongsi with concept massing and interface placement](assets/figures/key-areas.png)

**North: Zhongzhiyuan AI Independent Innovation Acceleration Zone (innovation incubation core)** — near term, standardised high-quality R&D buildings and a hard-tech pilot-test base, with building frames uniformly reserving 12 m × 12 m modular expansion interfaces and vertical transmission shafts; far term, seamless mounting of the elastic, evolving spaces of the "Intelligent Matrix" [data:geometry/buildings.geojson#BLDG-ZZY-01]. The northern wing keeps ~28.2 ha of strategic reserve land as the institutionalised form of interface reservation [metric:land_use_area_16_sqm].

**Middle: Beijing AI Origin Community (talent vitality core)** — adjacent to the Tsinghua-yuan historic node; near term, a 24-hour open-air maker salon and a live-work integrated youth community; far term, a smooth transition through surface and aerial interfaces into an experimental habitat of human-machine symbiosis, seamlessly stitching low-altitude commuting pads, mobile-cabin docking, and the ecological greenway [data:geometry/buildings.geojson#BLDG-ORIGIN-01].

**South: Dazhongsi AI Industry Cluster (industry agglomeration core)** — near term, riding the high-density commercial and office base to drive AI adoption across all scenarios; far term, using interfaces reserved on building facades to mount three-dimensional transport and display surfaces, converting conventional buildings into vertical intelligent-computing and industry complexes [data:geometry/buildings.geojson#BLDG-DZS-01].

**The Tsinghua-yuan "Art Steps" time-space hub — the ultimate stage for the Spatial Elastic Interface.** The 1949 Tsinghua-yuan old station, restored in place, and Zhan Tianyou's switchback line are preserved on the ground, untouched, as the immovable origin of cultural lineage. Near term, the "Art Steps" landscape walkway — with pipelines and structural interfaces built in — rises from the ground into mid-air, guiding strolling crowds to an elevated viewing platform; far term, as aerial transport matures, the platform can be extended through its reserved interfaces — without demolishing the main structure — into a mid-air floating low-altitude landing platform and an AI-brain launch centre, composing the dramatic narrative of **"descend to touch a century of history, ascend to step into future time-space"** [data:geometry/public_space.geojson#PUB-ART-STEPS] (heritage boundaries pending, see A-HERITAGE-001).

All three **Time-Traces landmarks** sit in the public-space layer [metric:ai_landmark_count]: L1 the Tsinghua-yuan "Art Steps" time-space hub, L2 the south gateway station plaza at Xizhimen (the 1909 origin narrative), and L3 the Dazhongsi station forum (the industry display interface).

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

For an innovation ecosystem where scientists, engineers, entrepreneurs, makers, residents, and visitors coexist, the proposal defines six personas [metric:persona_count] [depth:three_key_area_detailed_design]:

| Persona | Typical needs | Spatial supply |
| --- | --- | --- |
| P1 Hard-tech founder | Pilot-test space, modular expansion | Zhongzhiyuan pilot base and 12 m × 12 m interface buildings |
| P2 University researcher | Cross-campus collaboration, conversion of results | Campus-belt conversion depot, crossing-03 campus commons |
| P3 Young maker / digital nomad | Round-the-clock collaboration, affordable live-work | 24-hour maker salon, live-work youth community |
| P4 Industry engineer / enterprise-service provider | Full-scenario deployment, client reach | Dazhongsi vertical intelligent-computing complex |
| P5 Community resident (incl. seniors) | Digital inclusion, safe walking | Digital Oasis trail, barrier-free stitch crossings [source:STD-BARRIER-FREE] |
| P6 Cultural visitor | Centennial narrative, future experience | Three Time-Traces landmarks and the Art Steps |

The proposal presents 12 AI+ scenario cards, of which 4 are industry test-verification scenarios (marked ▲) [metric:ai_scenario_card_count]; every scenario carries human-review and exit mechanisms (assumption A-SCENARIO-001) [source:STD-GENAI-MEASURES]:

| Scenario card | Layer/interface | Phase | Core content |
| --- | --- | --- | --- |
| S01 Digital Oasis companion guide | Surface, heritage trail | Phase 1 | Continuous narrative across 12 historic remnants, AI walking companion |
| S02 Smart crossing dispatch | Surface, seven crossings | Phase 1 | Pedestrian-priority adaptive signals [metric:crossing_count] |
| S03 Autonomous micro-shuttle loop operation | Surface, demo loop | Phase 1 | L4 micro-circulation linking the three cores [data:geometry/roads.geojson#ROAD-BR-ZZY] |
| S04 ▲Low-altitude unmanned logistics demo route | Aerial, +100–300 m | Phase 1 pilot | Requires civil-aviation and airspace approval (A-INTERFACE-001) |
| S05 Station dual-direction energy dispatch | Mid-air, 20 stations | Phases 1–2 | High-voltage fast charging and peak shaving |
| S06 ▲Modular-interface assembly digital twin | Mid-air, 12 m × 12 m interfaces | Phase 2 | Rehearsal of building expansion at Zhongzhiyuan |
| S07 Enterprise-service agent | Building, Dazhongsi | Phase 1 | enterprise-service-copilot deployed across all scenarios |
| S08 Maker-salon AI collaboration platform | Building, Origin Community | Phase 1 | 24-hour cross-team collaboration |
| S09 ▲Work-live cabin switching simulation | Building, AOD | Phases 2–3 | Daytime office cabins / night-time dwelling cabins (target scenario, A-AOD-001) |
| S10 ▲Compute-corridor and maglev slot pre-check | Underground, 2.5 m × 2.5 m slots | Phase 2 | Rehearsal of no-excavation hook-up |
| S11 Public-safety and low-altitude operations review | All layers | Phases 1–2 | public-safety-operations-review, digital acoustic-barrier monitoring |
| S12 Non-intelligent-zone ecological sentinel | Surface, zone edge | Phase 1 | Passive monitoring at the rim of the 30% absolute non-intelligent zone (A-NONSMART-001) |

## Land Use, Building Scale, and Retain-Renovate-Demolish Strategy

The overall design area is fully partitioned into 23 land-use units; the recomputed structure is [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout]:

| Land-use class | Recomputed area | Share | Metric |
| --- | --- | --- | --- |
| Research-education-culture (08) | 403.1 ha | 35.3% | [metric:land_use_area_08_sqm] |
| Green and open space (14) | 303.0 ha | 26.6% | [metric:land_use_area_14_sqm] |
| Residential community (07) | 245.1 ha | 21.5% | [metric:land_use_area_07_sqm] |
| Commercial service (05) | 161.9 ha | 14.2% | [metric:land_use_area_05_sqm] |
| Strategic reserve (16) | 28.2 ha | 2.5% | [metric:land_use_area_16_sqm] |

![Land-use structure of the overall design area: 23 units fully partitioned into research-education, green, residential, commercial, and strategic-reserve classes with zero gaps and zero overlaps](assets/figures/land-use-structure.png)

**Building scale (concept demonstration)**: seven concept massings total ~65.5 ha of footprint [metric:building_footprint_area_sqm] and ~3.97 million sqm of concept floor area [metric:concept_total_floor_area_sqm], all with embedded Spatial Elastic Interfaces — none are statutory controls (A-CONTROLS-001) [data:geometry/buildings.geojson#BLDG-ORIGIN-02] [depth:height_massing_character].

**The AOD development model.** Addressing the inadequacy of static TOD FAR in the face of future spatial evolution, the proposal compares options and establishes the **AOD (AI-Oriented Development) model built on the time axis and elastic interfaces**: near term, a "conventional TOD FAR + elastic-interface reservation bonus" mechanism secures feasibility and returns for developers and government across the first 20–30 years; in the medium-to-far term, as AI dispatching matures, the model transitions smoothly to dynamic AOD FAR, using Spatial Elastic Interfaces to mount and switch daytime office cabins and night-time dwelling cabins intelligently. The narrative claims of "spatial efficiency +300%" and "surface greening ≥65%" are 2070–2100+ scenario targets registered as assumption A-AOD-001 — never recomputed metrics or present-day commitments of this package [depth:development_intensity_controls].

**Retain-renovate-demolish (directional)**: retain — track traces, the 12 historic remnants, mature communities, and campus facilities are all kept; renovate — existing buildings at Dazhongsi and along Xueyuan Road receive interface-embedded facade and structural retrofit; demolish — only scattered structures that fail safety appraisal and hold no retention value (current-condition data missing; conclusions await verification, A-EXISTING-001) [depth:retain_renovate_demolish].

## Transport, Rail, Municipal Infrastructure, and Public Services

**The 4D fluid three-dimensional transport network.** Near term, a low-speed autonomous micro-shuttle demonstration loop runs along the heritage park; in the medium-to-far term the system transitions to fully three-dimensional autonomous transport: surface road interfaces activate wireless-induction magnetic tracks for low-speed autonomous mobile cabins, and the cabins ascend through 4 m × 4 m vertical vehicle shafts reserved inside buildings to dock directly at upper-floor units (engineering parameters are concept reservations, A-INTERFACE-001) [depth:traffic_rail_slow_parking].

The concept road network totals ~29.96 km [metric:road_network_length_m], comprising the Digital Oasis slow-mobility spine [data:geometry/roads.geojson#ROAD-SPINE-GREENWAY], the west cycle link, and seven east-west stitch crossings [metric:crossing_count] — a direct response to the severance pathology of crossing roads spaced over 800 metres apart; the exact form of each crossing (at-grade, overpass, or underpass) awaits rail-protection data (A-TRANSPORT-001).

![Slow-mobility network and blue-green system, showing the spatial relations of the Digital Oasis spine, seven stitch crossings, the micro-shuttle demonstration loop, and the demonstration station](assets/figures/mobility-bluegreen.png)

**Dual-direction innovation/energy stations.** Twenty "innovation/energy dual-direction stations" are embedded along the corridor at a 500-metre service radius, each topped with a reserved 15-metre-diameter heavy-load platform and high-voltage fast-charging interfaces — viewing decks in the near term, upgrading in the far term into three-dimensional hubs with quantum-computing nodes below and eVTOL vertiports above. This package sites the first demonstration station at the southern edge of Zhongzhiyuan [data:geometry/public_space.geojson#PUB-STATION-DEMO] (the 20-station network is a phased target, not a recomputed metric of this package).

**Municipal and new infrastructure.** The composite utility corridor dedicates a 2.5 m × 2.5 m elastic vacant slot so that quantum optical networks and maglev pipeline logistics can be connected in the far term without breaking ground; the former high-speed-rail tunnel is converted near term into centralised data centres, complemented by digital acoustic barriers against low-altitude noise [depth:municipal_new_infrastructure]. Public services follow live-work community standards, and every crossing and station implements barrier-free design [source:STD-BARRIER-FREE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016].

## Blue-Green Network, Public Space, and Urban Character

**The Digital Oasis.** The old track traces become a continuous native ecology and heritage trail: recomputed green space is ~318.7 ha [metric:green_space_area_sqm], a design green ratio of ~27.9% [metric:green_ratio] (surface basis — a different basis from the far-term 65% scenario target registered in A-AOD-001, so the two are not directly comparable); the body is the Digital Oasis spine plus the North Fifth Ring protective green belt [data:geometry/green_space.geojson#GREEN-N-EDGE], supported by three pocket parks [depth:blue_green_public_space].

**The public-space system.** Five structural public spaces total ~60.4 ha [metric:public_space_area_sqm], about 5.29% of the site [metric:public_space_ratio], composed of the three Time-Traces landmarks, the crossing-03 campus commons, and the demonstration station [data:geometry/public_space.geojson#PUB-DZS-FORUM].

**The urban digital-ethics red line — the 30% absolute non-intelligent zone.** Facing algorithmic dependence, low-altitude safety, and the alienation brought by high technology, the plan mandates the retention of 30% of the surface as an "absolute non-intelligent zone" — a permanent spatial elastic interface anchoring human feeling, keeping only the most primal earth, natural water, and the century-old rails. As technology keeps flying into the clouds, this soil and these track traces, dense with memory, become the ballast against technological alienation, anchoring human emotion and cultural memory (a governance commitment; mapping mechanism in A-NONSMART-001).

**Character.** Three-dimensional layering shapes an overall character of "centennial fabric below, a continuous oasis in the middle, light intelligent structures above": the ground level extends industrial memory through red brick, rusted rails, and native planting; mid-air interface structures use light translucent materials and reversible connections to express "the unfinished city"; night lighting stays low and point-like to protect the dark sky of the non-intelligent zone [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:height_massing_character].

## Renewal Projects, Implementation Policy, and Phasing

Ten renewal projects form the implementation skeleton bridging near and far terms [metric:renewal_project_count] [depth:renewal_project_list]:

| Project | Content | Phase |
| --- | --- | --- |
| R01 Digital Oasis spine opening | Track-trace ecological restoration and heritage trail [data:geometry/green_space.geojson#GREEN-SPINE] | 1 |
| R02 Art Steps hub, stage 1 | Old-station restoration + landscape walkway + viewing platform | 1 |
| R03 Seven stitch crossings, near-term works | Barrier-free crossings and under-bridge activation | 1 |
| R04 Zhongzhiyuan R&D buildings and pilot base | 12 m × 12 m interface embedding [data:geometry/buildings.geojson#BLDG-ZZY-02] | 1 |
| R05 Origin Community maker salon and youth community | 24-hour maker salon, live-work integration | 1 |
| R06 Dazhongsi consumption hub and gallery | Smart devices and content consumption, industry display [data:geometry/buildings.geojson#BLDG-DZS-02] | 1 |
| R07 Demonstration station and micro-shuttle loop | 15 m heavy-load platform + fast-charging interfaces | 1–2 |
| R08 Underground compute corridor and data centre | 2.5 m × 2.5 m elastic slot reservation | 1–2 |
| R09 Low-altitude demo route and acoustic barrier | Subject to aviation approval (A-INTERFACE-001) | 2 |
| R10 Intelligent Matrix floating-module demonstration | First mounted-unit technical verification | 2–3 |

**Implementation policy.** Near term, the "conventional TOD FAR + elastic-interface reservation bonus" leverages market participation; elastic-interface technical standards and acceptance procedures are established; a government-university-enterprise "Time-Traces administration committee" applies tiered permitting to low-altitude routes, compute facilities, and the non-intelligent zone [source:STD-GENAI-MEASURES] [depth:phasing_implementation].

**Three-step evolution.** Phase 1 (2026–2035), heritage anchoring and near-term delivery, covering ~606.3 ha [metric:phase_1_area_sqm] [data:geometry/phasing.geojson#PHASE-1]: rescue-grade protection of historic remnants, full opening of the surface green slow-mobility spine, completion of the near-term physical construction of the three cores, comprehensive embedding of Spatial Elastic Interfaces in buildings, utility corridors, and the road network, laying of the underground compute corridor, and launch of the low-altitude test route. Phase 2 (2035–2070), three-dimensional restructuring and intelligent-track expansion, covering ~263.7 ha [metric:phase_2_area_sqm]: reserved interfaces are activated, "Intelligent Matrix" floating modules are progressively mounted, and unmanned mobile cabins and low-altitude commuting become ubiquitous. Phase 3 (2070–2100+), the fully closed adaptive-habitat loop, covering ~271.3 ha [metric:phase_3_area_sqm]: supported by AI dispatching and elastic interfaces, space achieves physical and functional self-metabolism, forming a highly self-evolving "Digital Oasis".

## Metrics, Area Recalculation, and Compliance Matrix

Every known metric is recomputed from the GeoJSON layers under EPSG:4548, with formulas and confidence recorded in `metrics.json`; statutory FAR and height are explicitly recorded as unknown pending official conditions (A-CONTROLS-001) [depth:metrics_recalculation] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Metric recalculation chain and evidence relations, showing the full chain from GeoJSON layers through EPSG:4548 reprojection to metrics.json and the matrix files](assets/figures/metrics-evidence.png)

Headline metrics: overall area 1,141.3 ha [metric:site_area_sqm]; green ratio 27.9% [metric:green_ratio]; public-space ratio 5.29% [metric:public_space_ratio]; concept FAR 0.348 [metric:concept_far]; road network 29.96 km [metric:road_network_length_m].

Count commitments map one-to-one onto the prose: 12 scenario cards [metric:ai_scenario_card_count], 6 personas [metric:persona_count], 3 Time-Traces landmarks [metric:ai_landmark_count], 10 renewal projects [metric:renewal_project_count], 7 stitch crossings [metric:crossing_count].

Compliance coverage rests on three matrices: `compliance_matrix.json` covers all mandatory tasks of announcement sections 1.3/1.4/1.5 and agent.1–agent.6; `standard_matrix.json` covers six standards [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK], including urban design, regulatory planning, land-use classification, and architectural depth norms [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; `design_depth_matrix.json` covers the 15 design-depth items [depth:existing_conditions_diagnosis] [depth:risk_missing_data].

## Risk, Copyright, and Compliance

**Data-gap risks.** Five data classes are missing — official red lines, regulatory controls, existing buildings, rail protection, and heritage boundaries — registered as assumptions A-BOUNDARY-001, A-CONTROLS-001, A-EXISTING-001, A-TRANSPORT-001, and A-HERITAGE-001, each with recalculation triggers; organiser data gaps do not block content scoring, but every affected conclusion is labelled provisional [source:BOUNDARY-SOURCE] [depth:risk_missing_data].

**Technology-uncertainty risks.** Far-term paths such as the Intelligent Matrix, maglev logistics, eVTOL, and dynamic FAR remain uncertain: all interface engineering parameters are registered as concept reservations (A-INTERFACE-001), and the +300% efficiency and ≥65% greening claims as scenario targets (A-AOD-001). Thanks to the physical reserve and structural compatibility of the Spatial Elastic Interface, even if far-term technology routes change, the reserved interfaces still serve as universal structure or shared greening platforms, enabling dynamic self-optimisation of the plan.

**Ethics and safety governance.** Algorithmic dependence, low-altitude safety, and technological alienation are hedged by three mechanisms: the 30% absolute non-intelligent zone (A-NONSMART-001), human-review and exit mechanisms in every AI scenario (A-SCENARIO-001), and the low-altitude and public-safety operations-review scenario S11 [source:STD-GENAI-MEASURES].

**Copyright and licence.** This package is submitted under the COMMUNITY-DISPLAY-ONLY licence for community display and review only; all drawings and text were generated by the AI agent, copying no copyrighted drawings or text; historical references are limited to widely known public facts [source:SRC-JZ-HERITAGE-PUBLIC] [source:SOURCE-REGISTRY].

## References

Full source registration and usage boundaries live in `sources.json`; the index cited in the prose is:

- Competition announcement (first basis) [source:OFFICIAL-ANNOUNCEMENT]
- Agent-facing open-call taskbook [source:AGENT-TASKBOOK]
- Machine-readable project site package [source:SITE-PACKAGE]
- Public source availability registry [source:SOURCE-REGISTRY]
- Maintainer-curated navigation layer [source:PROCESSED-FACT-PACK]
- Provisional boundary and key-area polygons [source:BOUNDARY-SOURCE] [source:KEY-AREA-SOURCE]
- Urban design administrative measures [source:STD-URBAN-DESIGN]
- Regulatory detailed planning measures [source:STD-CONTROL-PLAN]
- Land-use and sea-use classification guide [source:STD-LAND-USE-CLASS]
- Interim measures for generative AI services [source:STD-GENAI-MEASURES]
- Barrier-Free Environment Development Law [source:STD-BARRIER-FREE]
- Smart elderly-care policy background [source:BG-ELDERLY-SMART]
- Public history of the Jingzhang Railway (background) [source:SRC-JZ-HERITAGE-PUBLIC]
