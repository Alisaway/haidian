---
title: "Jing-Zhang Temporal Stitch"
author_github: "blackboxo"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "This proposal takes the urban interface stitching along the 9 km corridor of the Jing-Zhang Railway Heritage Park as its core design object. It establishes 9 spatiotemporal suture nodes and implements boundary repair and temporal rhythm orchestration through a four-layer AI closed loop (diagnosis–generation–orchestration–monitoring), enabling the same interface to serve different populations at different times of day, responding to the east-west urban fracture caused by a century of railway severance."
tracks: ["ai-traffic-walkability", "civic-agent-governance", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "ai-health-service-navigation", "ai-cultural-guide"]
---

# Jing-Zhang Temporal Stitch

## Design Basis and Data Inventory

This proposal takes the *Pre-qualification Announcement for the International Scheme Solicitation for Urban Design of the Centennial Jing-Zhang AI Innovation Belt*, issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, as its primary basis, supplemented by the machine-readable provisional rough boundaries, key areas, enumerations, metrics, and source inventories maintained by the maintainers in `brief/site-package/` [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK]. All spatial judgments rely on the evidence chain constructed from `design_brief.json`, `agent_taskbook.json`, `allowed_design_space.json`, `sources.json`, and `data/source_registry.json`. Design depth follows the requirements for urban design at the regulatory detailed planning level; textual narrative and GeoJSON, metric tables, drawings, and HTML presentations cross-reference each other [depth:existing_conditions_diagnosis].

Data usage boundaries: `data/source_registry.json` registers usage restrictions for public, rights-cleared, and provisional data. Seven datasets are available for formal use, one for background reference, and one for provisional use only. This proposal does not elevate background_only or provisional_only data to official boundaries, statutory controls, or implementation commitments [source:SOURCE-REGISTRY].

This proposal uses the provisional rough boundaries in `brief/site-package/geometry/provisional_boundaries.geojson` to generate the design scheme. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` are annotated as `provisional_constraint` with `official_boundary=false`, used solely for scheme generation, self-checking, and visualization discussion. A comprehensive recalculation is required once official precise boundaries are released [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm].

![Jing-Zhang Temporal Stitch overall concept and evidence chain](assets/figures/site-overview.png)

## Core Design Proposition: Why Stitching

Since the Jing-Zhang Railway commenced service in 1909, it has divided Haidian's northwestern area into eastern and western halves for over a century. In 2026, the Jing-Zhang Heritage Park opened [source:PARK-OPENING-2026] (see assumptions.json#ASM-PARK-OPENING), and a 9 km green corridor reconnected north-south public life; however, the boundary conditions on both sides of the park—walls, grade differences, road cross-sections, visual blind spots, and management fences—continue to obstruct east-west daily movement of numerous community residents on both sides (the number of communities on both sides and the affected population are design assumptions based on extrapolation from the resident population of streets along the corridor in the publicly available Haidian District Statistical Yearbook 2023; specific numbers require confirmation through community census; see assumptions.json#ASM-008). The core proposition of this proposal is: **not to design the park interior, but to focus on designing every interface between the park and the city**, introducing a temporal dimension so that the same interface serves different populations at different times of day [depth:overall_spatial_structure].

This is not an abstract concept. From Wudaokou to Dazhongsi, pedestrian accessibility for communities on both sides of the park is significantly reduced (the specific reduction magnitude requires determination through formal network analysis; preliminary estimates are based on OpenStreetMap 2024-06 road network data and QGIS Network Analysis shortest path analysis, data license ODbL, analysis scope covering residential-to-commercial/public-service facility paths within a 500 m buffer on both sides of the park; this analysis has not been independently reviewed and precise values await formal data completion for confirmation). Every street opening blocked by walls, slopes, or railings is a specific spatial design object that can be repaired.

## Three-Level Scope Working Framework

The scheme is organized according to the three levels specified in the announcement [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]:

| Level | Area | Design Question | Our Response |
| --- | --- | --- | --- |
| Coordinated Research Scope | 43.6 km² | AI industrial ecology and innovation chain | Establishing "suture economics"—innovation spillover value generated by interface repair |
| Overall Design Scope | 11.4 km² | Urban renewal and spatial structure | 9 suture nodes + triple temporal orchestration system |
| Key Area Scope | 368.4 ha | Detailed design depth | Interface repair detail drawings and temporal matrices for three key areas |

The three-level scope is delineated by the provisional boundaries of [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]. Coordinated research determines innovation chain and urban morphology judgments; overall design translates judgments into renewal projects and spatial structure; key areas verify implementability of specific parcels, buildings, transportation, and public space [depth:three_level_scope_framework].

![Three-level scope and suture node distribution](assets/figures/land-use-structure.png)

## agent.1 Overall Concept and Functional Coordination Design for the Belt

### Naming System and Overall Concept

**Primary Name**: Jing-Zhang Temporal Stitch (京张缝合·时间织补)

**Naming Logic**: "Stitch" (缝合) responds to the spatial fact of a century of railway severance—a precise operation in urban design professional terminology; "Temporal Weave" (时间织补) introduces the fourth dimension, indicating that AI's core value lies not only in optimizing space but in orchestrating time. The naming system forms a cultural resonance with the historical actions of Zhan Tianyou in constructing and operating the Jing-Zhang Railway—a century ago, temporal orchestration made the railway run; a century later, temporal orchestration makes repaired urban interfaces operate efficiently [source:AGENT-TASKBOOK] [source:ZHAN-TIANYOU-RAILWAY-HISTORY].

**English Name**: Jing-Zhang Temporal Stitch — "temporal" simultaneously means "of time" and "temple/critical node," implying that each suture point is a critical acupoint of the urban organism.

**Logo Direction** (conceptual proposal, for professional team refinement): Based on the "I-beam" cross-section of railway tracks, with both ends curved inward to form the shape of a stitching needle, embedding clock-hand imagery in the needle's eye. Colors drawn from Jing-Zhang Railway stone gray and Haidian technology blue gradient.

### Three Major Positioning Responses

| Positioning | Our Interpretation | Spatial Anchoring |
| --- | --- | --- |
| Centennial Jing-Zhang Cultural Belt | Railway severance → suture repair → temporal orchestration cultural narrative | Memory Anchor nodes |
| Metropolitan AI Living Experience Belt | 24-hour full-cycle urban interface services | 9-node Day Clock system |
| AI Convergence Innovation Belt | AI diagnosis + generation + orchestration + monitoring four-layer closed loop | Data Suture nodes |

### Five Major Functional Responses

1. **AI Full-Stack Indigenous Innovation System** → Zhongzhi Park full-stack testing and boundary diagnosis AI model training
2. **World-Class AI Innovation Ecosystem** → 9-node open ecosystem, each node an independently operable innovation unit
3. **AI+ Scenario Empowerment New Paradigm** → Interface repair scenarios serve as AI deployment scenarios (diagnosis/generation/scheduling/monitoring)
4. **Intelligent AI Vibrant City** → Triple clock system keeps urban interfaces active around the clock
5. **AI Governance Global Discourse Power** → Ethical framework and open protocol for public space AI orchestration

### Three-District Two-Wing Coordination

The three districts achieve east-west connectivity through suture nodes, while the two wings achieve functional complementarity through temporal orchestration [data:geometry/key_areas.geojson#PROV-KEY-001]:

| Coordination Unit | Object | Resource Flow | Spatial Interface | Cooperation Mechanism (non-binding) |
| --- | --- | --- | --- | --- |
| **Three-District Linkage** | | | | |
| Zhongzhi Park ↔ AI Origin | Full-stack innovation enterprises ↔ university incubation teams | Computing power sharing, model open-sourcing | Knowledge Permeation Node → Entrepreneurship Incubation Node | Joint laboratory agreement (pending negotiation) |
| AI Origin ↔ Dazhongsi | Transfer teams ↔ commercial operators | Product roadshows, scenario pilots | Tidal Interlace Node → Commercial Suture Node | Scenario open-day mechanism |
| Zhongzhi Park ↔ Dazhongsi | Research outputs ↔ market demand | Technology transfer, joint development | Data Suture Node network | Annual technology matching conference |
| **Two Wings** | | | | |
| Xiaoyue River Scenario Empowerment Wing | Qinghe riverside communities, ecological corridor | Ecological monitoring data, community feedback | Nature Permeation Node, Health Suture Node | Community co-governance committee (recommended) |
| Zhongguancun Technology Service Wing | Zhongguancun enterprises, service platforms | Technology services, talent pipeline | Entrepreneurship Incubation Node, Knowledge Permeation Node | Resident enterprise technology service agreements |
| **External Area Coordination** | | | | |
| Beiwei Community | Surrounding residential community residents | Public service sharing, community feedback | Intergenerational Weave Node, Health Suture Node | Regular interface via community council |
| Future Science City | Changping research institutions | Technology cooperation, talent exchange | No direct spatial interface | Online collaboration platform (recommended) |
| Huairou Science City | Large-scale scientific facilities/fundamental research | Data sharing, joint projects | No direct spatial interface | Jing-Zhang Corridor joint seminar |
| Economic Development Zone | Industrialization enterprises | Technology commercialization, product deployment | No direct spatial interface | Technology matching platform |
| Beijing-Tianjin-Hebei | Tianjin/Hebei AI industry clusters | Regional innovation network | Jing-Zhang high-speed rail transport linkage | Regional AI Innovation Alliance (proposed) |

Two-Wing definition: The Xiaoyue River Scenario Empowerment Wing is oriented along the Qinghe ecological corridor, connecting surrounding communities' health, education, and ecological needs through Nature Permeation Nodes and Health Suture Nodes; the Zhongguancun Technology Service Wing uses Zhongguancun Software Park and university science parks as hinterland, exporting technology services and innovation resources through Knowledge Permeation Nodes and Entrepreneurship Incubation Nodes. The two wings do not create new spatial redlines but leverage existing node functional radiation to achieve coordination.

### Overall Spatial Structure

This proposal puts forward the spatial organization concept of "One Corridor, Nine Needles, Three Clocks in Coordination" (conceptual proposal, for professional team refinement):

- **One Corridor**: The 9 km Jing-Zhang Heritage Park linear corridor (public space main axis [source:OFFICIAL-ANNOUNCEMENT])
- **Nine Needles**: 9 suture nodes distributed at urban interface fracture points on both sides of the corridor
- **Three Clocks**: Day Clock / Season Clock / Chronicle Clock—a three-layer temporal orchestration system managed by the unified AI scheduling hub

The spatial structure does not create new redlines but identifies repairable interface breakpoints on existing park boundaries, achieving repair through three layers: physical stitching (ramps, openings, lighting), functional stitching (cross-boundary activity programming), and systemic stitching (data flows and governance protocols).

## Coordinated Research Scope: Industry and Future City Research

### Global AI Innovation Ecosystem Case Studies

| No. | Case | City | Core Mechanism | Inspiration for This Proposal | Source |
| --- | --- | --- | --- | --- | --- |
| 1 | High Line Effect | New York | Linear park catalyzing innovation agglomeration (background inspiration) | Conceptual reference for linear corridor restructuring | [source:CASE-HIGH-LINE] |
| 2 | Barcelona Superblocks | Barcelona | Block-unit temporal allocation (commuting vs. leisure) | Conceptual precedent for temporal orchestration | [source:CASE-BARCELONA-SUPERBLOCKS] |
| 3 | Helsinki Smart Kalasatama | Helsinki | Project's own stated goal: "save residents 1 hour/day" (project vision, not verified outcome) | Reference for time optimization as smart city goal-setting | [source:CASE-HELSINKI-KALASATAMA] |
| 4 | Seoul Cheonggyecheon | Seoul | E-W urban stitching after elevated highway removal | Conceptual reference for post-infrastructure interface repair | [source:CASE-SEOUL-CHEONGGYECHEON] |
| 5 | Singapore One-North | Singapore | Industry-academia-residential mixed full-cycle blocks | Reference for functional mixing + temporal orchestration | [source:CASE-SINGAPORE-ONENORTH] |
| 6 | Sidewalk Labs Quayside | Toronto | Dynamic curbs/variable-function streets (project cancelled) | Technical concept for multi-period switching | [source:CASE-SIDEWALK-QUAYSIDE] |
| 7 | Shenzhen Qianhai | Shenzhen | AI governance + open platform + industrial agglomeration | Background reference for AI belt governance in Chinese context | [source:CASE-SHENZHEN-QIANHAI] |
| 8 | MIT Media Lab Living Lab | Boston | University-adjacent community as continuous experiment field | Conceptual reference for living laboratory operations | [source:CASE-MIT-LIVING-LAB] |

Note: All cases above are background inspiration only (background_only). They do not serve as direct evidence or commitment basis for this proposal's outcomes. Any quantitative claims from these cases are the original projects' own statements, not independently verified by this proposal, and cannot be transferred as expected outcomes for this project.

### AI Innovation Ecosystem Map

This proposal constructs the 9 suture nodes as different functional segments along the AI innovation chain (conceptual proposal):

- **Data Layer**: Data Suture Nodes responsible for sensor network and citizen feedback data aggregation
- **Algorithm Layer**: Zhongzhi Park AI Acceleration Zone providing model training and computing power support
- **Application Layer**: Each of the 9 nodes' AI diagnosis/generation/orchestration/monitoring systems
- **Feedback Layer**: Health Suture Nodes, Commercial Suture Nodes, etc. feeding back usage effectiveness data
- **Governance Layer**: AI Origin Community providing open protocols and ethical review frameworks

### Zhongzhi Park Full-Stack Indigenous System

Zhongzhi Park, as the northern anchor (192.1 ha), carries the spatial platform function of the AI full-stack indigenous innovation system. The suture nodes "Knowledge Permeation Node" (PUBLIC-001) and "Tidal Interlace Node" (PUBLIC-002) are located within the Zhongzhi Park area, achieving: east-boundary knowledge spillover and community sharing, tidal commuting optimization at the southern transport hub, and day-night functional switching between the industrial park and surrounding residential communities [data:geometry/key_areas.geojson#PROV-KEY-001].

### Industrial Space and Land, Computing Power, and Data Mechanisms

The core hypothesis of suture economics: the repair of each interface fracture point can release the synergistic value of land on both sides (conceptual proposal, pending economic evaluation verification). Computing power deployment for the AI four-layer system recommends adopting an edge computing mode—each suture node equipped with edge inference chips, with the Zhongzhi Park hub providing model training computing power. Data collection follows the principle of minimum necessity, collecting only anonymized pedestrian density, environmental indicators, and facility utilization rates.

## AI Innovation Ecosystem, Talent Profiles, and AI+ Scenarios

### AI Scenario Cards (12)

| No. | Scenario Name | Suture Node | Clock Layer | Target Users | AI Capability | Privacy Boundary |
| --- | --- | --- | --- | --- | --- | --- |
| SC-01 | Smart Morning Exercise Passage Opening | Tidal Interlace Node | Day Clock | Morning exercisers | Pedestrian flow prediction → gate scheduling | Count only, no identity recognition |
| SC-02 | Commute Micro-Circulation Optimization | Tidal Interlace Node | Day Clock | Commuters | Real-time flow → route suggestions | Anonymous heatmaps only |
| SC-03 | Midday Knowledge Sharing | Knowledge Permeation Node | Day Clock | University faculty-students / community residents | Topic matching → space reservation | Voluntary participation, no identity collection |
| SC-04 | After-School Safety Corridor | Intergenerational Weave Node | Day Clock | Students / parents | Route safety assessment → lighting scheduling | No individual trajectory tracking |
| SC-05 | Night Running Safety Lighting | Health Suture Node | Day Clock | Night runners | Motion detection → light following | Presence sensing only, no recording |
| SC-06 | Seasonal Functional Switching | Nature Permeation Node | Season Clock | All residents | Weather prediction → facility form transformation | No personal data |
| SC-07 | Holiday Market Orchestration | Commercial Suture Node | Season Clock | Merchants / consumers | Foot traffic prediction → stall allocation | Voluntary merchant registration |
| SC-08 | Community Co-Creation Diagnosis | Data Suture Node | Chronicle Clock | Community residents | Satisfaction analysis → improvement suggestions | Anonymous feedback |
| SC-09 | Heritage Immersive Interpretation | Memory Anchor Node | Day Clock | Visitors / citizens | Spatial recognition → content delivery | User-initiated activation |
| SC-10 | Entrepreneurship Pop-Up Space | Entrepreneurship Incubation Node | Season Clock | Startup teams | Demand matching → space allocation | Team self-declaration |
| SC-11 | Age-Friendly Route Planning | Intergenerational Weave Node | Day Clock | Elderly residents | Slope/distance assessment → route suggestions | No location tracking |
| SC-12 | Real-Time Carbon Sink Accounting | Nature Permeation Node | Season Clock | Administrators / public | Vegetation monitoring → carbon sink visualization | Environmental data, no privacy risk |

### AI Industry Test Verification Scenarios (4)

| Verification Scenario | Test Content | Success Criteria | Suggested Operator |
| --- | --- | --- | --- |
| Automatic Boundary Obstacle Diagnosis | Computer vision model identifying wall/grade/railing types | Classification accuracy ≥ 90% | Zhongzhi Park AI enterprise (pending recruitment) |
| Temporal Rhythm Prediction | Predicting pedestrian flow at each node/period based on historical data | MAPE ≤ 15% | AI Origin Community university teams |
| Parametric Repair Scheme Generation | Automatically generating design schemes based on obstacle types | Expert review pass rate ≥ 70% | Industry-academia-research consortium |
| Satisfaction Closed-Loop Feedback | Citizen feedback → AI analysis → improvement suggestions → effectiveness verification | Iteration cycle ≤ 30 days | Local sub-district office + technical support |

### User Profiles (6 types)

| Profile | Typical Schedule | Interface Need | Clock Response | Spatial Response |
| --- | --- | --- | --- | --- |
| University Researcher | 9:00-22:00 laboratory | Crossing the park to nearby dining/sports | Midday/evening open passages | Knowledge Permeation Node |
| Commuting Professional | 7:30/18:30 subway | Rapid park crossing | Expand passages during peak commute | Tidal Interlace Node |
| Parent with Children | 15:30-17:00 school pickup | Safe crossing + children's activities | Special management during school dismissal | Intergenerational Weave Node |
| Retired Resident | 6:00-8:00 morning exercise | Barrier-free access + rest | Early morning opening + age-friendly facilities | Health Suture Node |
| Entrepreneur | Flexible hours | Temporary office + social | Weekday daytime priority | Entrepreneurship Incubation Node |
| Outside Visitor | Irregular | Guided tour + experience + consumption | Weekend/holiday capacity expansion | Memory Anchor Node |

### Scenario-Space-Operations Mapping

Each scenario is bound to a specific suture node location and cannot be transplanted to other projects. Scenario operations follow a "AI recommendation – human confirmation – public feedback" triple governance structure; all decisions involving changes to public space management authority require local government approval (conceptual proposal) [source:AGENT-TASKBOOK].

## Blue-Green Space, Public Space, and Urban Landscape

### East-West Stitching and North-South Connectivity Strategy

The core spatial action of this proposal: **east-west stitching**. Given that north-south connectivity has already been achieved by the Heritage Park, the focus is on resolving the east-west fracture left by a century of railway severance. The strategy is as follows (conceptual proposal, for professional team refinement) [depth:three_key_area_detailed_design]:

**Physical Stitching Layer**:
- Removal of non-essential wall segments (requires ownership confirmation and safety assessment)
- Grade reduction: installing barrier-free ramps at interfaces with grade differences ≥ 1.5 m
- Addition of pedestrian crossing facilities: adding safety islands at road cross-sections ≥ 40 m
- Supplementary lighting: eliminating nighttime passage blind spots

**Functional Stitching Layer**:
- Cross-interface activity programming: extending park activities to streets beyond the park
- Commercial synergy: park-side entrances forming linkages with facing commercial streets
- Service permeation: public service facilities within the park radiating to communities on both sides

**Systemic Stitching Layer**:
- Sensor networks monitoring interface usage efficiency
- AI real-time scheduling of interface functional modes
- Citizen feedback driving iterative improvement

### 9 Suture Node Public Space Design

| Node | Suggested Location | Boundary Obstacle Type | Stitching Approach | Temporal Orchestration |
| --- | --- | --- | --- | --- |
| Knowledge Permeation Node | Zhongzhi Park east boundary / university zone | Wall + management fence | Openable knowledge gallery | Daytime academic / nighttime community |
| Tidal Interlace Node | Metro station interface | Wide road cross-section | Dynamic right-of-way allocation | Morning-evening commute / daytime leisure |
| Entrepreneurship Incubation Node | Industrial park boundary | Access control + wall | Street-level ground floor opening | Weekday entrepreneurship / weekend market |
| Intergenerational Weave Node | Between school and elderly care facilities | Railing + grade difference | Shared ramp garden | School dismissal hours / daily rest |
| Nature Permeation Node | Ecological corridor interface | Drainage facility severance | Rain garden + ecological bridge | Dry season passage / rainy season flood storage |
| Commercial Suture Node | Facing commercial street | Parking lot severance | Market plaza + outdoor seating zone | Midday dining / nighttime culture |
| Memory Anchor Node | Railway heritage point | Heritage protection fence | Transparent display + AR overlay | Daytime exhibition / nighttime light art |
| Health Suture Node | Adjacent to hospital / rehabilitation facility | Grade difference + blind spot | Rehabilitation trail + barrier-free passage | All-day accessibility |
| Data Suture Node | Adjacent to community service center | Information discontinuity | Digital interactive installation | Full-cycle data collection |

### AI Pilgrimage Landmarks (3, conceptual proposal)

1. **Needle of Time** — Tidal Interlace Node: A dynamically rotating metal sculpture that adjusts its orientation based on real-time pedestrian flow direction—both artwork and physical manifestation of the AI scheduling system
2. **Eye of the Stitch** — Data Suture Node: A ring-shaped LED screen embedded in the ground, displaying real-time urban interface passage data in the shape of a needle's eye
3. **Zhan Tianyou Timetable** — Memory Anchor Node: A digital recreation of Zhan Tianyou's original railway timetable, transformed into a visualization portal for the contemporary urban temporal orchestration system

### Public Space Component Library (agent.4)

Suture node public spaces are composed of the following standardized components; each node selects and combines components based on specific obstacle types and site conditions:

| Component Category | Component Name | Specification Range | Applicable Obstacle | No-AI Fallback |
| --- | --- | --- | --- | --- |
| Passage Component | Barrier-free ramp | Slope ≤ 1:12, width ≥ 2.4 m | Grade difference ≥ 0.3 m | Fixed ramp, permanently effective |
| Passage Component | Pedestrian overpass/underpass | Span ≤ 30 m | Wide road cross-section | Fixed infrastructure |
| Passage Component | Safety island | Width ≥ 2 m, spacing ≤ 50 m | Road cross-section ≥ 30 m | Fixed traffic facility |
| Interface Component | Openable exhibition gallery | Modular, unit 3 m × 4 m | Wall / management fence | Maintain open state |
| Interface Component | Transparent fence | Height ≤ 1.2 m, transparency ≥ 60% | Heritage/safety fence | Fixed transparent fence |
| Interface Component | Ground-floor pilotis | Clear height ≥ 3.6 m, depth ≥ 6 m | Enclosed building ground floor | Permanent building retrofit |
| Lighting Component | Pedestrian lighting strip | Illuminance ≥ 20 lux, color temperature 3000-4000 K | Nighttime blind spots | Fixed timer-controlled lighting |
| Lighting Component | Motion-following lamp | Detection radius 5 m, response ≤ 0.5 s | Low-traffic nighttime segments | Full-night constant-on mode |
| Resting Component | Modular seating | ≥ 2 groups per 50 m | Passage paths | Fixed seating |
| Resting Component | Shelter structure | Sheltered area ≥ 12 m² | Climate-exposed nodes | Fixed rain canopy/sunshade |
| Information Component | Multi-sensory wayfinding | Visual + tactile + auditory | Information discontinuity interfaces | Fixed signage |
| Information Component | Digital interactive screen | Outdoor protection grade IP65 | Data Suture Nodes | Static information display |
| Ecological Component | Rain garden | Storage capacity ≥ 50 m³/ha | Drainage severance | Natural infiltration function |
| Ecological Component | Ecological stepping stone | Width ≥ 3 m green belt | Ecological corridor breakpoints | Permanent vegetation |

### Honor Display System

An honor display system is established for intelligent agents, developers, and community participants who contribute high-quality AI urban interface repair solutions: the Data Suture Node features a "Contributors Wall" displaying real-time author information for optimal repair schemes; quarterly selection of "Best Stitching Solution"; and permanent display of winning works from annual AI design marathons.

## Transportation, Rail Transit, Municipal Infrastructure, and Public Service Facilities

### Cultural Narrative Core: Three Leaps of Temporal Orchestration

The cultural narrative of this proposal is built upon the behavioral thread of "temporal orchestration" running through a century [source:AGENT-TASKBOOK]:

**First Leap (1909)**: Zhan Tianyou oversaw the completion of the Jing-Zhang Railway, marking the first time Chinese people independently compiled an operational timetable (ref: *Zhan Tianyou and Chinese Railways*, China Railway Press, 2019 revised edition; this statement is a cultural narrative summary, and the specific claim of "the first" relies on railway history academic consensus for its uniqueness determination). Temporal orchestration enabled the railway to serve the Chinese people—a landmark moment of Chinese mastery over modern temporal order.

**Second Leap (1980s-2020s)**: Zhongguancun innovation culture transformed "time" into "iteration speed"—rapid prototyping, agile development, continuous integration. Time was no longer just an operational schedule but an innovation rhythm.

**Third Leap (2026+)**: AI Temporal Stitch extends temporal orchestration from transportation/code to urban public space—the same physical space achieves optimal multi-period, multi-population, multi-function allocation through AI scheduling.

### Spatial Cultural System

- **Memory Anchor Node Cluster**: In-situ display of railway heritage elements distributed along the 9 km corridor, including old platform foundations, rail cross-sections, and signal equipment replicas
- **Temporal Scale System**: Time markers embedded in the ground at 9 suture nodes, recording key historical moments at each location (opening date, decommissioning date, park opening date, stitch repair date)
- **Cultural Lens Installation**: AR technology overlaying historical scenes, allowing pedestrians at the same location to see the railway operations of a century ago

### Wayfinding and Signage System Direction

Recommended adoption of "timetable aesthetics" (conceptual proposal, for professional design team refinement):
- Typography: Monospace font family, echoing the typographic tradition of railway timetables
- Color: Railway Gray (#4A4A4A) + Haidian Blue (#0066CC) + Temporal Gold (#C4A35A)
- Iconography: Graphic fusion of sewing needle / clock hands / rail cross-section
- Information architecture: Grid layout like a timetable, clearly marking "current period function" and "next period function"

### International Communication Narrative

Core storyline: "The city that stitches time" — a city that has stitched together time. From Zhan Tianyou's timetable to AI's temporal stitch, Beijing Haidian demonstrates how humanity uses the wisdom of different eras to orchestrate the temporal dimension of urban life.

## Renewal Project Inventory, Implementation Policy, and Phasing Plan

The phasing plan corresponds to the three-phase strategy in `geometry/phasing.geojson` [data:geometry/phasing.geojson#PHASE-001] [source:AGENT-TASKBOOK]:

- **Near-term (1-3 years)**: Priority repair of Commercial Suture Node, Memory Anchor Node, Health Suture Node, and Data Suture Node—4 nodes (southern segment, Dazhongsi area; PUBLIC-006/007/008/009)
- **Mid-term (3-5 years)**: Advancing Knowledge Permeation Node and Tidal Interlace Node—2 nodes (northern segment, Zhongzhi Park area; PUBLIC-001/002)
- **Long-term (5-10 years)**: Completing Entrepreneurship Incubation Node, Intergenerational Weave Node, and Natural Permeation Node—3 nodes (central segment, AI Origin Community; PUBLIC-003/004/005)

The near-term selection of the southern segment first is because the Dazhongsi area has high commercial vitality, strong public perception, and rapid visible outcomes; the long-term deferral of the central segment's intergenerational and health nodes reflects their involvement of sensitive facilities (schools, elderly care) requiring more thorough community consultation.

### Annual Activity System (conceptual proposal)

| Quarter | Activity Name | Content | Corresponding Clock |
| --- | --- | --- | --- |
| Q1 Spring | Jing-Zhang Stitching Design Marathon | AI + urban interface repair scheme competition | Chronicle Clock (annual evaluation) |
| Q2 Summer | Full-Time City Festival | 24-hour non-stop urban public activities | Day Clock (full-cycle experience) |
| Q3 Autumn | AI Temporal Orchestration Developer Conference | Technical sharing + open API release | Chronicle Clock (technology iteration) |
| Q4 Winter | Community Stitching Report Release | Annual interface repair effectiveness data publication | Season Clock (cycle summary) |

### Developer Community Operations

- **Open API**: Interface diagnosis models, temporal orchestration engines, and effectiveness monitoring data are all exposed as APIs, allowing third-party developers to build applications
- **Dataset sharing**: Anonymized urban interface usage data released as open datasets supporting academic research and entrepreneurship
- **Contributor incentives**: Developers who submit valid repair solutions earn "Stitch Contribution Points," redeemable for shared space usage rights at Zhongzhi Park
- **Monthly Open-Source Day**: AI Origin Community hosts monthly open-source collaboration events to review the operational performance of deployed solutions

### AI Scenario Open Operations

Each suture node establishes an independent operations unit following a "platform + ecosystem" model (conceptual proposal):
- Base platform maintained by local jurisdiction government/industrial park
- Scenario applications competitively tenured by enterprises/communities/developers
- AI scheduling hub provides unified coordination of temporal resource allocation
- Quarterly evaluation eliminates underperforming scenarios and introduces new ones

### Long-term Operations and Internationalization

- **Three-year target**: Complete physical repair and AI system deployment of the 4 near-term suture nodes (Dazhongsi area)
- **Five-year target**: Develop a replicable "Urban Interface AI Suture" methodology and technical standards
- **Ten-year target**: Export experience to cities worldwide with similar railway severance issues (conceptual proposal; no policy commitments made)

International dissemination strategy: Each year, select 1-2 international cities with railway/highway severance issues for "Suture Sister City" dialogue and exchange.

### Activity Brand and Communication Visual System (agent.6)

**Activity brand system** (conceptual proposal, for professional design teams to further develop):
- Master brand: "Jing-Zhang Stitch" / 京张缝合 — unified across all activity communications
- Sub-brands: Stitch-a-thon, 24h City Festival, Temporal Dev Conf, Annual Stitch Report
- Visual hammer: Animated graphic of sewing needle passing through rail tracks, paired with three-color clock hands (Day Clock gold / Season Clock green / Era Clock blue)
- Communication material templates: Event poster (vertical A1), social media card (1080×1080), long-form graphic template, short video intro (5s animation)

**Activity → Developer → Enterprise/Talent → Scenario Pilot Conversion Path**:

| Phase | Target | Touchpoint | Conversion Action | Success Metric |
| --- | --- | --- | --- | --- |
| 1. Event acquisition | Public/developers/students | Marathon/hackathon/open day | Register, submit proposals | Participant count, proposal submissions |
| 2. Community retention | Active participants | Monthly Open-Source Day, online community | Join developer community, contribute code | Active contributors, merged PRs |
| 3. Enterprise matching | Teams with product intent | Roadshow, Demo Day | Incubation space residency, signed partnerships | Resident teams, signed contracts |
| 4. Talent attraction | AI/urban design professionals | Career fairs, internship programs | Employment/collaboration/retention | Talent residency rate |
| 5. Scenario pilot | Mature teams/enterprises | Node operation rights bidding | Deploy scenario, operational testing | Scenarios launched, user satisfaction |

Each phase establishes clear exit conditions and next-step guidance to prevent event traffic from failing to convert into actual scenario implementation.

## Land Use, Building Scale, and Retention/Renovation/Demolition Strategy

This proposal adopts "micro-renewal" as its core strategy, focusing on repairing interface accessibility rather than large-scale demolition and reconstruction [depth:development_intensity_controls].

### Land Use Layout

`geometry/land_use.geojson` provides complete coverage of the 11.4 km² design boundary, divided into Scientific Research and Education Land (northern section), Industry Innovation Land (north-central section), Mixed-Use Land (central section), Commercial Service Land (south-central section), and Residential Land (southern section). The Jing-Zhang Heritage Park corridor traverses the entire area, forming the primary public space axis [data:geometry/land_use.geojson#LU-001].

### Building Scale and Retention/Renovation/Demolition

Building renewal strategy within suture node areas (approximately 300-500m radius per node) (conceptual proposal, pending property ownership verification and professional assessment):
- **Retain**: Heritage-protected buildings, community public facilities, schools, hospitals, and other public service buildings
- **Renovate**: Wall segments converted to operable interfaces, ground-floor street frontages converted to semi-open spaces, rooftops converted to green platforms
- **Demolish**: Non-essential wall segments, abandoned temporary facilities (requiring safety assessment and property ownership confirmation)
- **New construction**: Suture node public space structures (ramps, lighting, signage, interactive installations)

Floor area ratio, building height, development intensity, and other regulatory control indicators remain `status=unknown` due to lack of official control conditions; they will be recalculated once formal regulatory conditions are provided [metric:building_footprint_area_sqm]. Current building footprints in `geometry/buildings.geojson` are representative illustrations only and do not constitute accurate existing building coverage.

### Industrial Space Supply

The 9 suture nodes do not add large-scale industrial buildings; instead, they release collaborative value from existing stock through interface repair. Zhongzhi Park's wall repair opens the park's ground-floor spaces to the community (conceptual estimate: usable public interface increment estimated at km-scale based on wall length × ground-floor depth; precise value pending on-site survey); AI Origin Community's campus-park suture reduces walking distances (conceptual estimate: based on network topology shortening ratio; precise value pending network analysis); Dazhongsi's four-quadrant pedestrian connectivity raises commercial service accessibility (conceptual proposal; improvement magnitude pending transport modeling validation).

Data gaps: Precise building footprints, property ownership information, regulatory control conditions, and structural safety assessments are all pending items. The above renewal strategies represent directional design recommendations only [source:OFFICIAL-ANNOUNCEMENT].

## Urban Renewal and Regulatory-Depth Urban Design for the Overall Design Area

### Spatial Structure

The spatial structure of the overall design area (11.4 km²) follows the pattern "One Corridor, Nine Needles; East-West Mending; Three Clocks Synergy" [data:geometry/land_use.geojson#LU-001] [depth:land_use_layout]:

- **One Corridor**: The Jing-Zhang Heritage Park 9km linear green public space main axis [source:OFFICIAL-ANNOUNCEMENT]
- **Nine Needles**: 9 suture nodes distributed at urban interface fracture points along park boundaries
- **East-West Mending**: Radiating 300-500m in both directions from each suture node, forming "needle-eye influence zones"
- **Three Clocks Synergy**: AI scheduling hub providing unified orchestration of Day/Season/Era three-layer temporal rhythms

### Land Use Structure and Renewal Strategy

`geometry/land_use.geojson` provides complete coverage of the design boundary. Land classification follows current national standards, with an added "Interface Transition Land" category marking suture node areas. The renewal strategy centers on "micro-renewal" — no large-scale demolition and reconstruction, focusing on repairing interface accessibility (conceptual proposal; specific retention/renovation/demolition decisions pending property ownership verification and professional assessment) [depth:development_intensity_controls].

### Land Use, Building Scale, and Retention/Renovation/Demolition Strategy

This proposal's building renewal strategy adopts "interface-layer micro-renewal" as its core principle (conceptual proposal, for professional teams to further develop). Within the 300m influence radius of the 9 suture nodes, buildings facing the interface receive categorized treatment [data:geometry/buildings.geojson#BLDG-001]:

**Retain category** (conceptual suggested proportion: majority): Structurally sound and functionally appropriate buildings are retained as-is, with only improvements to ground-floor street frontage transparency and public accessibility — removing unnecessary walls, creating ground-level setbacks or outdoor seating areas.

**Renovate category** (conceptual suggested proportion: minority): Structurally sound but functionally mismatched buildings undergo internal functional adjustment — converting ground-floor enclosed office/warehouse spaces to semi-public service spaces (exhibition corridors, community services, co-working), achieving functional suturing. Renovation does not involve structural reinforcement or major facade modifications, keeping investment intensity low.

**Pending assessment category** (conceptual suggested proportion: very few): Buildings with questionable structural safety or direct conflicts with suture corridors are marked as "pending professional structural assessment and property ownership negotiation"; this proposal does not make demolition determinations.

Note: The retain/renovate/pending-assessment category ratios are directional conceptual suggestions; precise proportions require determination through as-built surveys and professional assessment.

Total building volume control follows the "no total increase, optimize interfaces" principle (conceptual proposal) — suture repair is not incremental development but stock optimization. Specific FAR and building heights cannot be provided due to lack of official regulatory conditions, maintained in unknown status in metrics.json with explanations [metric:building_footprint_area_sqm]. The 9 suture nodes' new public space area is a conceptual order-of-magnitude estimate (based on average node influence radius 300m × 9 nodes × interface linear length extrapolation; precise area pending detailed design determination), primarily from linear space released through wall demolition and publicized area from ground-floor functional conversion, without involving new large-volume buildings.

### Transportation and Slow Mobility System

The core of the transportation system design is "east-west accessibility repair" [data:geometry/roads.geojson#ROAD-001]:
- Add or widen east-west pedestrian corridors at the 9 suture nodes
- Tidal Weave Needle nodes implement dynamic right-of-way allocation during morning/evening peak hours (conceptual proposal, requiring traffic engineering validation)
- Slow mobility system runs through all suture nodes, seamlessly connecting to park internal slow-traffic paths
- Rail transit station connections prioritize optimizing the "last kilometer" on both east and west sides of the park

![Transportation, Slow Mobility, and Blue-Green Space System](assets/figures/mobility-bluegreen.png)

### Blue-Green Space Supplement

Natural Infiltration Needle nodes combine stormwater management with interface suturing — drainage direction transforms from barrier to connection:
- Park internal drainage facilities transform into rain gardens at interfaces, infiltrating toward communities on both sides [data:geometry/green_space.geojson#GREEN-001]
- Green coverage ratio calculated from design model based on provisional boundary (pending recalculation after formal data provision) [metric:green_ratio]
- Urban character control centers on "interface visibility" — reducing wall/fence heights at suture nodes to increase visual permeability

## Key Area Detailed Design

### Zhongzhi Park AI Independent Innovation Acceleration Zone (192.1 ha)

**Design positioning**: East-west interface opening of a garden-type full-stack independent innovation district [data:geometry/key_areas.geojson#PROV-KEY-001]

**Suture nodes**: Knowledge Permeation Node (PUBLIC-001) + Tidal Interlace Node (PUBLIC-002)

**Spatial actions** (conceptual proposal):
- East boundary: Remove non-security wall segments; install "Knowledge Exhibition Corridor" — operable display spaces serving as academic poster/achievement release venues during daytime and community cultural activity venues at night
- North boundary: Qinghe ecological interface repair; convert drainage infrastructure into waterfront promenades connecting both banks
- Interior: While preserving industrial functions, convert street-facing ground floors to semi-open spaces allowing community residents to pass through
- AI system: Boundary barrier diagnostic model is trained and validated at this node, forming reusable identification capabilities

**Temporal programming**: Weekdays 9:00-18:00 prioritize industrial functions with open corridors for passage; after 18:00, switch to community activity mode with Knowledge Exhibition Corridor converting to cultural activity space.

### Beijing AI Origin Community (104.3 ha)

**Design positioning**: Full-time opening of a campus-adjacent incubation and talent community [data:geometry/key_areas.geojson#PROV-KEY-002]

**Suture nodes**: Entrepreneurship Incubation Node (PUBLIC-003) + Intergenerational Weave Node (PUBLIC-004) + Natural Permeation Node (PUBLIC-005)

**Spatial actions** (conceptual proposal):
- Campus-park interface: Add slow-mobility connections allowing faculty and students to reach incubation spaces within 5 minutes
- Park-community interface: Ground-floor street frontages configured as co-working and community service composite spaces
- School-elderly care interface: Shared ramped garden — student activity space during after-school hours, elderly fitness area during remaining hours
- Rail transit station integration: Optimize station entrance/exit connections with park/community circulation routes

**Temporal programming**: Semester/vacation switching mode — semester prioritizes teaching, research, and incubation; winter/summer vacations switch to public access and entrepreneurship marathon mode.

### Dazhongsi AI Industry Cluster Zone (72 ha)

**Design positioning**: Interface activation of an urban-type intelligent economy and international exchange district [data:geometry/key_areas.geojson#PROV-KEY-003]

**Suture nodes**: Commercial Suture Node (PUBLIC-006) + Memory Anchor Node (PUBLIC-007) + Health Suture Node (PUBLIC-008) + Data Suture Node (PUBLIC-009)

**Spatial actions** (conceptual proposal):
- Dazhongsi Station integration: Optimize four-quadrant pedestrian connectivity, eliminating ground-level crossing barriers
- Commercial interface: Convert parking lot barriers into market squares hosting AI experience + cultural consumption
- Dazhongsi historical node: Install railway heritage transparent exhibition hall with AR-overlaid historical scenes
- Data Suture Needle: Install interactive devices at community service centers to collect and display urban suturing performance

**Temporal programming**: Weekdays serve business/roadshow/enterprise services; weekends switch to public experience/cultural markets/AI interactive exhibitions. "Great Bell" (Dazhong) itself is a cultural metaphor for time — using it as an anchor to establish a "City Clock Plaza" that broadcasts current urban interface operational status via sound-and-light installations every hour.

![Three Key Area Suture Design](assets/figures/key-areas.png)

## Metrics System, Area Recalculation, and Compliance Matrix

Core metrics are based on provisional boundary design model geometry recalculation (provisional; pending recalculation after formal data provision) [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]:

| Metric | Current Design Model Value | Status | Source | Notes |
| --- | --- | --- | --- | --- |
| Site area | 11,412,825 m² | provisional | geometry/site_boundary.geojson EPSG:4548 | Pending official boundary replacement |
| Green coverage ratio | 24.17% (0.241741) | provisional | geometry/green_space.geojson area recalculation | Current design model geometry calculation |
| Public space ratio | 10.44% (0.104389) | provisional | geometry/public_space.geojson area recalculation | Current design model geometry calculation |
| Suture node count | 9 | known | Design proposal | Fixed design parameter |
| East-west new corridors | 9 (1 main corridor per node) | conceptual proposal | 9 nodes × 1 primary east-west corridor | Pending site survey; additional secondary corridors possible in detailed design |
| Temporal programming plans | 27 sets | conceptual proposal | 9 nodes × 3 clock layers (Day/Season/Era) | Concept-level definition |

Note: Green coverage ratio and public space ratio are area recalculation results from currently submitted geometry (EPSG:4548 projection), not planning target values. Planning targets will be set after formal regulatory conditions are determined.

Other metrics (FAR, building height, etc.) remain in unknown status due to lack of official control conditions, with explanations provided. The complete metrics system is stored in `metrics.json` and not fully repeated in the main text.

![Metrics Evidence and Design Model Relationship](assets/figures/metrics-evidence.png)

## AI Four-Layer Closed-Loop System Architecture

This proposal's AI system is not a stack of scenarios but a complete closed-loop workflow:

**Layer 1 · Diagnose**:
- Computer vision models automatically identify and classify urban interface barriers (walls/elevation changes/railings/blind spots/wide cross-sections)
- Input: Street-level imagery, satellite imagery, citizen reports
- Output: Barrier classification, severity scoring, repair priority ranking

**Layer 2 · Generate**:
- Parametric design models automatically generate repair solutions based on barrier types
- Input: Barrier diagnosis results, site constraints, design codes
- Output: Ramp design parameters, lighting layout solutions, corridor dimension recommendations

**Layer 3 · Schedule**:
- Temporal rhythm engine optimizes multi-period functional allocation for each suture node
- Input: Historical pedestrian flow data, weather forecasts, activity calendars, resident preferences
- Output: 24-hour functional switching timetable, seasonal pattern recommendations

**Layer 4 · Monitor**:
- Sensor network + citizen feedback system continuously evaluates suturing effectiveness
- Input: Traffic volume, dwell time, satisfaction scores, complaint rates
- Output: Effectiveness assessment reports, improvement recommendations, Era Clock decision basis

The system follows the "physical improvements remain effective when AI is shut down" principle (SEB standard) — even if the AI system ceases operation, completed physical improvements such as ramps, lighting, and corridors continue serving residents. AI only enhances the efficiency of these physical spaces; it does not make physical spaces dependent on AI to function.

### AI Four-Layer System Control Table

| Layer | Input Sources & Permissions | Output Purpose | Confidence Threshold | Human Reviewer | Non-Automatable Decisions | Failure Fallback | Appeal/Correction |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Diagnostic | Street imagery (municipal authorization), satellite imagery (commercial license), citizen voluntary reports | Barrier classification, priority ranking | Classification confidence ≥0.85 for database entry | Local jurisdiction urban management division | Barrier determination and demolition decisions | Manual patrol + fixed-cycle inspection | Citizen 12345 hotline + online feedback |
| Generative | Barrier diagnosis results, design code library, site constraints | Repair solution suggestions (not final designs) | Expert review approval rate ≥70% | Registered planner/architect | Solution adoption and construction permits | Standard solution template library | Design review committee reconsideration |
| Scheduling | Historical pedestrian statistics (anonymized), weather API, activity calendar | Period function switching recommendations | MAPE ≤15% for automatic execution | Node operations manager | Emergency mode switching, large event scheduling | Fixed timetable (embedded in physical signage) | Resident committee quarterly review |
| Monitoring | Anonymous counters, environmental sensors, satisfaction surveys | Effectiveness reports, improvement recommendations | Data coverage ≥80% for report generation | Project management office | Remediation decisions and budget allocation | Quarterly manual sampling survey | Public data dashboard + public suggestion box |

**Non-automatable boundary**: Decisions involving public space management authority changes, wall demolition, road redline adjustments, heritage protection zone modifications, and emergency safety responses must never be automatically executed by AI and require local jurisdiction government approval. Dynamic right-of-way and gate controls are currently testing recommendations pending professional validation, not presented as permitted systems.

### AI Pilot Testing Protocol & Stop Conditions

| Test Phase | Duration | Entry Gate | Stop Condition (any trigger = halt) | Post-Stop Action | Recovery Condition |
| --- | --- | --- | --- | --- | --- |
| T0-Sandbox | 4 weeks | Single node deployed + ethics review passed | Misclassification >20%; latency >5s; any safety incident | Revert to fixed schedule, preserve logs for audit | Root cause fixed + independent retest passed |
| T1-Limited Trial | 12 weeks | T0 passed + local government approval | Confidence <0.85 for 3 consecutive days; MAPE >15% for 7 days; complaint rate >5% | AI suggestions suspended, manual takeover of all scheduling | Re-tuning then re-enter T0 |
| T2-Open Operation | Ongoing | T1 passed + expert panel review + community notice with no objection | Quarterly satisfaction <60%; any AI auto-execution breaching non-automatable boundary | Downgrade to T1 mode, initiate incident investigation | Investigation conclusion + remediation verification + re-notice |

**Fail-closed design goal (not an engineering safety conclusion)**: All AI layers default to OFF during power failure, network interruption, or system anomaly. Spaces revert to safest open state (passages open, lights on, no access control). This is a design goal, not a verified engineering safety guarantee. Residual risks include but are not limited to: security system coupling in extreme scenarios, gate/access-control hardware jam, UPS failure during outage. The following acceptance criteria must ALL pass during T0 pilot before fail-closed effectiveness can be confirmed: (1) power-loss drills covering all passages and gate devices; (2) property management designates and trains manual unlock responsible persons; (3) combined extreme weather/device failure/network outage simulation; (4) third-party safety assessor issues acceptance report. Until above acceptance is complete, no claim of "AI failure cannot lock spaces" shall be made.

**Non-AI control requirement**: During T1, at least 1 node of the same type must remain as non-AI control group (physical improvements + fixed schedule only) for comparative effectiveness measurement. If difference lacks statistical significance, do not upgrade to T2.

### Element Responsibility Matrix

| Element | Provider (proposed) | Consumer | Spatial Carrier | Zhongguancun Tech Service Wing Role | AI Origin Community Role |
| --- | --- | --- | --- | --- | --- |
| Land | Local jurisdiction government (allocation/transfer) | Node operator | 9 suture node public spaces | Provide ground-floor publicization renovation land in parks | University boundary open land |
| Space | Park management + property management | Scenario operators + citizens | Interface-adjacent public space | Park street-facing interface opening | Campus-enterprise interface shared space |
| Funding | Fiscal special funds + social capital (pending application) | Construction + operations | - | Enterprise CSR investment (voluntary) | University research funding matching |
| Talent | Universities/enterprises/social recruitment | AI system development and operations | Zhongzhi Park, AI Origin | Provide technology talent input channel | Provide industry-academia-research conversion platform |
| Computing | Zhongzhi Park AI enterprises (pending recruitment) | Model training and inference | Zhongzhi Park hub + edge nodes | Enterprise computing resource sharing (pending negotiation) | University HPC access (pending negotiation) |
| Data | Municipal sensors + citizen feedback | AI four-layer closed loop | Data Suture Needle network | Data governance technical support | Data science talent cultivation |
| Scenario access | Local jurisdiction government authorization | Resident enterprises/developers | Individual node operation units | Enterprise scenario pilot channel | Student entrepreneurship project incubation |

Note: All elements marked "pending recruitment," "pending negotiation," or "pending discussion" are intentional design recommendations and are not presented as secured resources. Actual implementation requires investment attraction, agreement signing, and administrative approval processes.

## Nine-Node Spatial Master Table

The following is the sole authoritative mapping; narrative text, drawings, implementation cards, compliance matrix, and GeoJSON all defer to this table:

| Node ID | Node Name | PUBLIC ID | Key Area Assignment | Associated Scenarios | Implementation Phase |
| --- | --- | --- | --- | --- | --- |
| N-01 | Knowledge Permeation Node | PUBLIC-001 | Zhongzhi Park AI Acceleration Zone | SC-03 Midday Knowledge Sharing | Phase 2 (mid-term, 3-5 years) |
| N-02 | Tidal Interlace Node | PUBLIC-002 | Zhongzhi Park AI Acceleration Zone | SC-01 Smart Morning Exercise, SC-02 Commute Micro-Circulation | Phase 2 (mid-term, 3-5 years) |
| N-03 | Entrepreneurship Incubation Node | PUBLIC-003 | AI Origin Community | SC-10 Entrepreneurship Pop-Up Space | Phase 3 (long-term, 5-10 years) |
| N-04 | Intergenerational Weave Node | PUBLIC-004 | AI Origin Community | SC-04 After-School Safety Corridor, SC-11 Age-Friendly Route | Phase 3 (long-term, 5-10 years) |
| N-05 | Natural Permeation Node | PUBLIC-005 | AI Origin Community | SC-06 Seasonal Functional Switching, SC-12 Real-Time Carbon Sink | Phase 3 (long-term, 5-10 years) |
| N-06 | Commercial Suture Node | PUBLIC-006 | Dazhongsi AI Industry Cluster | SC-07 Holiday Market Orchestration | Phase 1 (near-term, 1-3 years) |
| N-07 | Memory Anchor Node | PUBLIC-007 | Dazhongsi AI Industry Cluster | SC-09 Heritage Immersive Interpretation | Phase 1 (near-term, 1-3 years) |
| N-08 | Health Suture Node | PUBLIC-008 | Dazhongsi AI Industry Cluster | SC-05 Night Running Safety Lighting, SC-11 Age-Friendly Route | Phase 1 (near-term, 1-3 years) |
| N-09 | Data Suture Node | PUBLIC-009 | Dazhongsi AI Industry Cluster | SC-08 Community Co-Creation Diagnosis | Phase 1 (near-term, 1-3 years) |

Note: Nodes are numbered north-to-south along the corridor (PUBLIC-001 highest latitude, PUBLIC-009 lowest). Zhongzhi Park has 2 nodes, AI Origin 3, and Dazhongsi 4—the asymmetric distribution reflects Dazhongsi's higher commercial density and diverse interface types, as well as near-term priority for the high-visibility southern segment.

## Nine-Node Point-by-Point Implementation Cards

| Node | Provisional Location/Layer ID | Current Barrier Evidence | Beneficiary Population | Physical Action | AI Action | Ownership & Professional Dependencies | No-AI Fallback | Near-term Verifiable KPI |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Knowledge Infiltration Needle | PUBLIC-001, Zhongzhi Park east boundary | Walls + management fencing (pending on-site survey to confirm type) | University faculty/students, surrounding residents | Operable exhibition corridor, supplemental lighting | Topic matching → space reservation | Park property ownership confirmation | Exhibition corridor remains open, fixed display boards | Daily pedestrian throughput increase |
| Tidal Interlace Node | PUBLIC-002, Zhongzhi Park southern transport hub | Wide road cross-section (pending traffic engineering measurement) | Commuters, surrounding residents | Safety islands, widened sidewalks | Real-time flow → route recommendations | Traffic management authority approval | Fixed safety islands + traffic signals | Morning peak crossing time reduction |
| Entrepreneurship Incubation Node | PUBLIC-003, AI Origin industrial park boundary | Access control + walls (pending ownership verification) | Entrepreneurs, community residents | Ground-floor street-facing open renovation | Demand matching → space allocation | Industrial park operator agreement | Ground floor permanently open | Resident startup teams count |
| Intergenerational Weave Node | PUBLIC-004, AI Origin school-elderly care facility interface | Railings + elevation difference (pending accessibility assessment) | Students, elderly residents, parents | Shared ramped garden | Path safety assessment → lighting | School/elderly care facility management | Ramps + fixed lighting | Accessible passage satisfaction |
| Natural Permeation Node | PUBLIC-005, AI Origin southern ecological corridor interface | Drainage facility barrier (pending municipal documentation) | All residents, ecosystem | Rain garden + ecological bridge | Weather forecast → facility configuration | Water authority, parks and greening bureau | Natural infiltration, permanent vegetation | Stormwater retention volume, biodiversity |
| Commercial Suture Needle | PUBLIC-006, Dazhongsi commercial street | Parking lot barrier (pending ownership confirmation) | Consumers, merchants, tourists | Market square + outdoor seating area | Footfall prediction → stall allocation | Commercial property owner, urban management | Fixed outdoor seating zones | Weekend footfall, merchant revenue |
| Memory Anchor Needle | PUBLIC-007, railway heritage points | Heritage protection fencing (pending heritage authority confirmation) | Tourists, citizens, researchers | Transparent display installation | Spatial recognition → content delivery | Heritage protection authority approval | Fixed display boards + QR codes | Visitor dwell time |
| Health Suture Node | PUBLIC-008, Dazhongsi area adjacent to hospital/rehabilitation facility | Elevation difference + blind spots (pending accessibility audit) | Elderly residents, rehabilitation patients | Rehabilitation trail + accessible corridor | Motion detection → light following | Health commission, hospital management | Fixed accessible corridor + constant lighting | Accessible passage rate |
| Data Suture Needle | PUBLIC-009, community service center | Information disconnect (pending community research) | All community residents | Digital interactive device | Satisfaction analysis → improvement recommendations | Sub-district office | Fixed information screen + suggestion box | Resident participation rate, feedback loop time |

Note: All items marked "pending on-site survey," "pending ownership verification," or "pending professional assessment" are prerequisite confirmation items for the design proposal; items pending survey are not presented as established facts.

## KPI Baselines, Measurement Cycles & Acceptance Thresholds

| KPI Indicator | Node | Baseline Assumption | Measurement Method | Cycle | Near-term Threshold | Data Source |
| --- | --- | --- | --- | --- | --- | --- |
| Daily pedestrian count | N-01 Knowledge | Pending baseline (scenario assumption: ~0 when walled) | IR counter + manual sampling | Weekly→Monthly | ≥200/day within 6 months | On-site sensor (pending) |
| Peak-hour crossing time | N-02 Tidal | Pending traffic baseline | GPS float car + pedestrian timing | Daily→Quarterly | ≥15% reduction from baseline | Traffic mgmt platform (pending) |
| Startup teams hosted | N-03 Entrepreneurship | Pending baseline (scenario assumption: 0 when closed) | Tenancy agreement registry | Monthly | ≥5 teams within Year 1 | Industrial park ledger |
| Accessibility satisfaction | N-04 Intergenerational | Pending barrier-free audit | Quarterly survey + observation | Quarterly | ≥75% (≥3.75/5 scale) | Community survey (pending) |
| Stormwater retention | N-05 Nature | Pending water authority data | Flow meter + level sensor | Post-storm 48h report | ≥60% retention for 50mm events | Water monitoring system (pending) |
| Weekend footfall | N-06 Commercial | Pending commercial baseline | Video counting (no face capture) | Weekly→Monthly | ≥30% increase from baseline | Commercial operator data |
| Visitor dwell time | N-07 Memory | Pending tourism baseline | IR thermal imaging aggregate count + manual timing sample (no device ID read) | Monthly | Average ≥15 minutes | On-site observation records (pending) |
| Barrier-free pass rate | N-08 Health | Pending accessibility review | Success rate (manual + sensor) | Monthly | Wheelchair/walker success ≥95% | Observation + complaint records |
| Resident participation rate | N-09 Data | Total residents (pending) | Interactions / total residents | Monthly→Quarterly | Quarterly rate ≥10% | Community service platform |

Note: All baselines marked "pending" must be surveyed within 3 months of project launch. Thresholds shown are recommendations; formal thresholds require tripartite confirmation (owner, operator, community representatives). Measurement methods follow data minimization principles: no WiFi probes, Bluetooth beacons, or any device-identifier-reading methods (MAC address, IMEI, etc.) are used; no cross-temporal or cross-node individual correlation is performed. All pedestrian flow and dwell-time measurements use non-individual-traceable methods only (IR thermal imaging aggregate counting, video counting outputting headcount only without storing footage, manual sampling).

## Public Service Inclusivity and Failure Fallback Table

| Scenario | No-phone/no-account access | On-site human alternative | Continuous accessible passage | Emergency/safety mode | Multi-sensory information | Public appeal |
| --- | --- | --- | --- | --- | --- | --- |
| Corridor opening | Fixed timetable posted at entrance | On-duty staff manual operation | Ramps + handrails available at all times | Default to open during power failure | Tactile ground + voice prompts | 12345 hotline |
| Period function switching | Fixed signage showing current/next period | On-site manager guidance | Switching does not affect passage function | Lock to passage mode during emergencies | Lighting colors + audio signals | Community council |
| AI route recommendations | Fixed wayfinding signage system | Volunteer/security verbal guidance | All routes are accessible | Physical signage effective when recommendation system stops | Tactile paths + voice navigation poles | Online/offline feedback boxes |
| Space reservation | On-site queuing/first-come-first-served | Service desk manual registration | Wheelchair corridor + elevator | Open for use when reservation system fails | Number display + voice announcement | Local jurisdiction sub-district complaint window |
| Nighttime lighting | No phone/account required | Fixed lighting always on | Continuous lighting without gaps | Backup battery ≥4h during power failure | Light/dark contrast + reflective strips | Repair hotline signage |
| Market activities | On-site participation without registration | Manual cashier/information desk | No steps + wide corridors | Extreme weather cancellation notice | Scent + sound + visual | On-site feedback form |
| Data collection | Anonymous counting requires no personal interaction | Does not depend on personal devices | Sensors do not obstruct passage | Sensor failure does not affect space use | N/A (passive collection) | Data use disclosure + objection channel |

**Core principle**: All suture node physical space functions do not depend on smart devices or personal accounts. The AI system enhances efficiency but does not constitute a usage barrier. During any device/system failure, spaces default to the safest, most open state (always open, always lit, no access control).

## Data Governance Table

| Governance Dimension | Rule |
| --- | --- |
| Purpose limitation | Used solely for interface usage efficiency assessment and period function optimization; not used for individual profiling or commercial marketing |
| Minimum fields | Anonymous headcount, environmental temperature/humidity, illuminance, noise, facility usage frequency; no facial, gait, or device ID collection |
| Retention period | Raw streams deleted within 24h after real-time data aggregation; statistical results retained ≤3 years |
| Access roles | Operations engineers (real-time data), project management office (statistical reports), public (aggregated dashboard); individuals cannot access raw streams |
| Re-identification protection | Headcount output only when ≥5 persons; time granularity ≥15min; spatial granularity ≥node-level (not precise to individual seats) |
| Model/vendor boundary | Models deployed only on-premises/private cloud; no raw data transmitted to third parties; vendor contracts must include data non-retention clauses |
| Deletion and correction | Residents may request deletion of their voluntarily submitted feedback; anonymous data does not support individual deletion |
| Human review | Any data-driven space management decision must be confirmed by local jurisdiction staff before execution |
| Individual tracking prohibition | Cross-period and cross-node correlation of individuals prohibited; movement trajectory recording prohibited; facial/voiceprint recognition prohibited |

## Risk, Copyright, and Compliance Statement

This section describes the proposal's data risks, legal boundaries, and compliance status [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [source:SOURCE-REGISTRY].

### Spatial Data Risk

All spatial data in this proposal is generated based on provisional approximate boundaries. After formal precise boundaries are released, the following must be fully recalculated: site_boundary, key_areas, land_use, roads, green_space, public_space, buildings, phasing, and all metrics. Until then, all areas, ratios, and project quantities are design model reference values and do not constitute legal conclusions.

### Conceptual Proposal Attribution Statement

All spatial design content in this proposal constitutes open co-creation suggestions and reference solutions for professional planning teams to further develop and study. It does not replace professional planning, nor does it supersede government approval and statutory review processes. Content involving building retention/renovation/demolition, road redlines, facility configuration, and industry introduction all require subsequent validation.

### Copyright Statement

- Proposal text, drawings, and data structures: COMMUNITY-DISPLAY-ONLY
- Referenced data sources listed in `sources.json`
- No unauthorized fonts, images, trademarks, or corporate logos used
- AI-generated content produced with assistance from Claude (Anthropic), containing no restricted materials

## Compliance Matrix and Self-Check

Complete coverage relationships for announcement items 1.3, 1.4, 1.5, and agent.1-agent.6 are stored in `compliance_matrix.json`. Professional standards coverage is stored in `standard_matrix.json`. Design depth completion status is stored in `design_depth_matrix.json`. These three matrix files, together with this main text, form a "humans read narrative, machines check structure" dual-layer verification system [depth:compliance_and_standards_response].

## References

The complete source list is stored in `sources.json`; the following are primary references:

1. Haidian Branch, Beijing Municipal Commission of Planning and Natural Resources, "Centennial Jing-Zhang AI Innovation Belt Urban Design International Proposal Call Prequalification Announcement," May 9, 2026 [source:OFFICIAL-ANNOUNCEMENT]
2. Open Call Task Brief for Global AI Agents: Centennial Jing-Zhang AI Innovation Belt Urban Design, May 18, 2026 [source:AGENT-TASKBOOK]
3. Repository site-package: design_brief.json, agent_taskbook.json, allowed_design_space.json [source:SITE-PACKAGE]
4. Public data source registry: data/source_registry.json [source:SOURCE-REGISTRY]
5. Provisional approximate boundary: brief/site-package/geometry/provisional_boundaries.geojson [source:PROVISIONAL-BOUNDARIES]
6. Ministry of Housing and Urban-Rural Development, "Urban Design Management Measures"
7. Beijing Urban Design Guidelines and related standards
8. Jan Gehl, *Cities for People*, Island Press, 2010 (temporal allocation and public space design theory)
9. Kevin Lynch, *The Image of the City*, MIT Press, 1960 (urban interface and accessibility theory)
