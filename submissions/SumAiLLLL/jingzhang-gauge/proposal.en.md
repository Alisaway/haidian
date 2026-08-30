---
title: "Jing-Zhang Gauge: Calibration as the Hinge Between a Century of Self-Determined Surveying and the AI Era of Benchmark Innovation"
author_github: "SumAiLLLL"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "The historic achievement of the Jing-Zhang Railway was an act of self-determined calibration — Zhan Tianyou's team independently completed the Guan'gou survey and established the 1435mm standard gauge. The AI era faces a parallel calibration problem: without public benchmarks there is no self-reliant innovation, without alignment there is no accountability, without evaluation arenas there are no pilgrimage landmarks. This proposal makes calibration a visible spatial institution: one spine (a 9.4km benchmark corridor), three yards (Zhongzhiyuan Calibration Yard / AI Origin Alignment Square / Dazhongsi Gauge Gate), five gates (interoperability access gates), and two wings (Zhongguancun service wing + Xiaoyuehe scenario wing), with eight global AI benchmarking cases, ten scenario cards, three pilgrimage landmarks, and a long-term operation mechanism."
tracks: ["civic-agent-governance", "jingzhang-heritage-narrative", "enterprise-services-ecosystem"]
scenarios: ["ai-traffic-walkability", "ai-cultural-guide", "ai-health-service-navigation", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed"]
iteration: "v0.1"
---

# Jing-Zhang Gauge: Calibration as the Hinge Between a Century of Self-Determined Surveying and the AI Era of Benchmark Innovation

> Belt name: **Jing-Zhang Gauge** (**THE GAUGE**)
> In one sentence: the historical core of the Jing-Zhang Railway is self-determined calibration, and the core of AI self-reliant innovation is also calibration — without public benchmarks there is no comparability, without alignment there is no accountability. This belt makes calibration a visible spatial institution.

Most "AI + city" proposals discuss how intelligence is displayed. This proposal discusses how intelligence is **measured, aligned, and admitted**: models need benchmarks for comparability, AI services need alignment for accountability, and intelligent native businesses need interoperability access for market entry. These "calibration" problems are exactly what the Jing-Zhang Railway solved a century ago — Zhan Tianyou's team, without foreign engineering guidance, independently completed the Guan'gou survey, slope determination, and established the 1435mm standard gauge on terrain foreigners judged impassable. This was the first large-scale self-determined calibration in China's modern engineering history. Today, Haidian clusters three key areas along this 9km heritage park — Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi. This proposal renames "calibration" as a spatial institution connecting history and future: the Calibration Yard, the Benchmark Spine, the Alignment Square, and the Gauge Gate.

## Design Basis and Source Inventory

The first basis of this proposal is the "Prequalification Announcement for the Centennial Jing-Zhang AI Innovation Belt International Urban Design Open Call" issued by the Beijing Municipal Planning and Natural Resources Commission Haidian Branch, which defines the 43.6 km² coordinated research area, the 11.4 km² overall design area, the 368.4-hectare key detailed design area, and the three positionings and design tasks [source:OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]. The second basis is the open-call taskbook for global agents, which specifies the six required tasks agent.1 through agent.6, the five functions, the three areas and two wings, the ten co-creation principles, and the boundary clause that "all spatial recommendations are conceptual suggestions" [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Honest statement on boundaries**: No downloadable, coordinate-verifiable official precise redline is currently available through public channels. The Haidian Branch announcement gives the areas, textual extent descriptions, and key area names, sequence, and areas, but no boundary map or spatial data; the Beijing Science and Technology Park Auction bidding page has a "prequalification document" download portal that requires a password [source:BOUNDARY-SOURCE]. This proposal uses the repository's registered provisional rough boundary as the generation base, derived from the announcement's textual extents, road names, and approximate areas, checked in EPSG:4548 [data:geometry/site_boundary.geojson#SITE-001]. The three key areas are likewise provisional [data:geometry/key_areas.geojson#KEY-ZZY]. All geometries are marked `official_boundary=false`, `geometry_role=provisional_constraint`, for concept generation, visualization, and self-check only — not as official redline, approval basis, or precise area basis; once the official polygon is published, land use, roads, green space, public space, buildings, phasing, and all metrics must be recomputed end-to-end [depth:existing_conditions_diagnosis].

Materials are tiered by use: official announcements and national standards marked `usable_for_formal` in `data/source_registry.json` are used for scope, task, and normative judgments; provisional boundaries marked `provisional_only` are for generation and display only; policy documents marked `background_only` are for narrative and design orientation only [source:SOURCE-REGISTRY]. This proposal independently collected eight external public sources (MLCommons/MLPerf, NIST AI Safety Institute, UK AI Safety Institute, Singapore AI Verify, BAAI FlagEval, CAICT trusted AI assessment, EU AI Act conformity assessment, SEMI semiconductor standards), all with recorded publisher, URL, retrieval date, and limitations, marked as background reference in `sources.json`, not as basis for local spatial conclusions; specific citations appear in the case table below.

![Figure 1 Overall spatial structure: Jing-Zhang Gauge](assets/figures/site-overview.png)

## Three-Level Scope Framework

The three levels are not three drawings at different scales of the same type, but three different questions [depth:three_level_scope_framework].

**The 43.6 km² coordinated research area** answers a judgment question: what calibration needs must planning respond to that AI brings to the city? This proposal's answer is threefold — **benchmarks** (models need public benchmarks for comparability, giving self-reliant innovation a measuring stick), **alignment** (AI services need alignment and human review for accountability, giving governance voice a fulcrum), and **access** (intelligent native businesses need interoperability access for market entry, giving pilgrimage landmarks a landing point). These three determine that the innovation belt cannot be merely an image project, but a calibration infrastructure institution.

**The 11.4 km² overall design area** answers an organization question: how does this roughly 9.4km north-south, 1.2km east-west belt organize three key areas, two wings, and沿线 communities into a continuous calibration system. The framework is "one spine, three yards, five gates": a benchmark corridor slow-mobility spine along the Jing-Zhang heritage park, three calibration yards (Zhongzhiyuan eval track, AI Origin benchmark plaza, Dazhongsi gauge gate), and five interoperability access gauge gates [metric:spine_length_m] [metric:calibration_yard_count]. The recomputed site area is 11.41 km², consistent with the announced ~11.4 km² [metric:site_area_sqm].

**The 368.4-hectare key detailed design area** answers a verification question: can the three areas make the calibration system visible, usable, and auditable. The recomputed areas of the three provisional zones are 192.9, 104.3, and 72.0 hectares, totaling 369.3 hectares, all within 0.5% of announced values [metric:key_area_total_area_sqm] [data:geometry/key_areas.geojson#KEY-ZZY]. The three key areas each take on different stages of the calibration system: Zhongzhiyuan is the "Calibration Yard" (full-stack self-reliant evaluation and benchmark publishing), the AI Origin Community is the "Benchmark Spine" (world-class evaluation industry and ecosystem), and Dazhongsi is the "Gauge Gate" (interoperability access for intelligent native businesses).

The transmission between levels is unidirectional: the research level's judgments determine the overall level's framework, which determines the key level's specific actions; conversely, problems exposed at the key level (e.g., interoperability technical thresholds) should flow back to correct upper-level judgments, not be masked. Currently unavailable data on existing buildings, ownership, utilities, and rail must be recorded in the pending list, not filled with speculation [depth:risk_missing_data].

![Figure 2 Land use structure and three-level scope](assets/figures/land-use-structure.png)

## Coordinated Research Area: Industry and Future-City Research

### Overall Concept and Naming System

**Belt name**: Jing-Zhang Gauge (THE GAUGE). "Gauge" in English means both "railway gauge" and "measuring/calibration" — a double meaning immediately understood by international readers [depth:overall_spatial_structure]. The Chinese "标定" (calibration) refers both to engineering calibration (Zhan Tianyou's survey) and AI calibration (benchmark/alignment/evaluation). This naming is not giving a road a pleasant name, but naming an urban institution: on this belt, the "gauge" of AI — its benchmarks, alignment, and access — is a visible, debatable, revisable public matter.

The naming system is drawn entirely from railway surveying and calibration vocabulary, giving it both historical roots and international legibility:

| Term | Jing-Zhang prototype | Spatial content |
| --- | --- | --- |
| Calibration Yard | Zhan Tianyou's Guan'gou survey field | A visitable AI evaluation and benchmark-testing venue |
| Benchmark Spine | Milestone system | The calibration main spine along the heritage park, linking evaluation nodes, 9.4km slow-mobility spine |
| Alignment Square | Station forecourt | A public space for AI alignment and human review, with publicly audible alignment deliberation |
| Gauge Gate | Level crossing | Spatialized interoperability and standards access, the gateway for intelligent native businesses |
| Milestone | Milestone | The honor-display and contributor-record system along the benchmark corridor |

**Visual identity and Logo direction**: The motif is the "gauge" parallel double line — two parallel lines representing the 1435mm standard gauge, with a surveying cross (a simplified geometry of Zhan Tianyou's surveying instruments) embedded between them. The fork point thickens, representing a calibration node. Colors draw from the Jing-Zhang engineering palette: survey red (calibration/key), rail gray (boundary/buildings), Guan'gou green (green space/ecology), benchmark blue (public space/water), signal yellow (nodes/access). Fonts, images, and trademarks must use redistributable or self-made resources; unauthorized use of others' marks is prohibited [depth:height_massing_character]. The three positionings (Centennial Jing-Zhang Cultural Belt, Urban AI Life Experience Belt, AI Convergence Innovation Belt) are respectively borne by the cultural narrative system, the calibration yard and public space system, and the industry and scenario system; the mapping of five functions and three areas + two wings appears in the next section.

### Three Positionings, Five Functions, and Three Areas + Two Wings Synergy Loop

The three positionings' mapping: the Centennial Jing-Zhang Cultural Belt is borne by the cultural narrative system — Zhan Tianyou's self-determined surveying heritage, gauge history, and milestone culture form a century-long narrative from "surveying calibration" to "AI calibration" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]; the Urban AI Life Experience Belt is borne by the calibration yard and public space system — visitable eval tracks and alignment squares make "how AI is measured and constrained" an experienceable public life; the AI Convergence Innovation Belt is borne by the industry and scenario system — evaluation, benchmarking, and alignment form a complete innovation industry chain.

The five functions' spatial placement: AI full-stack self-reliant innovation lands at Zhongzhiyuan Calibration Yard — self-reliant evaluation infrastructure is the prerequisite for full-stack self-reliance; world-class AI innovation ecosystem lands at the AI Origin Benchmark Spine — evaluation industry clustering forms an ecosystem; AI+ scenario empowerment lands at the Xiaoyuehe Scenario Wing — outdoor testing and scenario calibration; intelligent AI vibrant city lands along the Benchmark Spine — calibration yards as public space activate urban vitality; AI governance global voice lands at the Alignment Square — public alignment deliberation and human-intervention devices make "who calibrates AI" a visible public governance [source:AGENT-TASKBOOK].

The three areas + two wings synergy loop: the northern Zhongzhiyuan bears AI full-stack self-reliant innovation and AI governance global voice (Calibration Yard + dispatch hub); the central AI Origin Community bears the world-class AI innovation ecosystem (Benchmark Spine + evaluation industry); the southern Dazhongsi bears intelligent native new businesses (Gauge Gate + interoperability access). The western Zhongguancun Technology Service Wing bears globalized factor allocation and Zhongguancun IP and capital empowerment; the eastern Xiaoyuehe Scenario Wing bears AI scenario empowerment and outdoor testing calibration [depth:overall_spatial_structure]. The two wings are not passive appendages: the Zhongguancun wing provides capital, IP, and internationalization channels for the Calibration Yard, and the Xiaoyuehe wing provides real-scenario outdoor verification for calibration. At the Beijing-Tianjin-Hebei level, benchmark mutual recognition and evaluation industry coordination fall under industry and technology authority; this proposal only reserves spatial-side interfaces and makes no resource allocation conclusions.

### Global AI Innovation Ecosystem Cases (agent.2)

This proposal benchmarks eight global AI evaluation and safety practices, all publicly verifiable real cases, recorded in `sources.json` as background reference:

1. **MLCommons / MLPerf**: The de facto global AI performance benchmark standard maintained by the MLCommons consortium, covering training and inference, widely adopted by major chip and cloud vendors [source:MLCOMMONS-MLPERF]. Spatial mapping: Benchmark Spine — the industry benchmark where evaluation industry clusters.
2. **NIST AI Safety Institute** (US): The US government's AI safety evaluation body, which has conducted safety evaluations of multiple frontier models [source:NIST-AISI]. Spatial mapping: Calibration Yard — a visitable government-level evaluation venue.
3. **UK AI Safety Institute** (UK): One of the first government bodies globally to conduct pre-deployment safety evaluations of frontier models [source:UK-AISI]. Spatial mapping: Alignment Square — a public reference for government-level alignment deliberation.
4. **Singapore AI Verify**: Singapore's government-led AI testing framework and toolkit, emphasizing interoperability and trustworthiness [source:SINGAPORE-AI-VERIFY]. Spatial mapping: Gauge Gate — an international reference for interoperability access.
5. **BAAI FlagEval** (Beijing): A domestic open-source large-model evaluation system maintained by the Beijing Academy of Artificial Intelligence [source:BAAI-FLAGEVAL]. Spatial mapping: Zhongzhiyuan — a domestic precedent for self-determined calibration.
6. **CAICT Trusted AI Assessment** (China): The China Academy of Information and Communications Technology's trusted AI evaluation and certification system [source:CAICT-AI-ASSESSMENT]. Spatial mapping: Gauge Gate — a domestic reference for compliance evaluation.
7. **EU AI Act Conformity Assessment**: The EU Artificial Intelligence Act's conformity assessment system, making AI system access a statutory procedure [source:EU-AI-ACT]. Spatial mapping: Gauge Gate — a reference for statutory-level access.
8. **SEMI Semiconductor Standards**: The semiconductor industry's mature model of industry-collaborative benchmarking, covering equipment, materials, and process interoperability [source:SEMI-STANDARDS]. Spatial mapping: Dazhongsi — a reference for industry-collaborative calibration.

The common thread across these eight cases: they all turn "calibration" from an internal corporate behavior into a public or quasi-public institution. This proposal does not transplant them, but finds a "visitable, audible, accessible" local form for them in Chinese urban space. All cases are background reference only, not basis for local spatial conclusions or government commitments [depth:overall_spatial_structure].

### Comprehensive Planning and Territorial Space Planning Innovation

This proposal's innovation suggestion for territorial space planning: classify "AI calibration infrastructure" as a new type of infrastructure category in planning. Traditional planning infrastructure lists cover roads, rail, utilities, and energy; this proposal suggests adding "evaluation benchmark infrastructure" — calibration yards, benchmark corridors, and alignment squares serve the role of innovation infrastructure in the AI era, much like stations and water stops in the railway era [standard:MOHURD-URBAN-DESIGN-MEASURES]. This suggestion is conceptual and does not constitute a regulatory plan adjustment or statutory planning judgment [depth:development_intensity_controls].

## Overall Design Area: Urban Renewal and Regulatory-Plan-Depth Urban Design

### Spatial Structure: One Spine, Three Yards, Five Gates, Two Wings

**One Spine — Benchmark Spine**: A roughly 9.4km continuous slow-mobility main spine organized along the Jing-Zhang heritage park, fully accessible and weather-independent [metric:spine_length_m] [data:geometry/roads.geojson#ROAD-001]. The heritage park is itself a real project under construction — public information indicates it is about 9km long, with Phase 1 opened in 2023 and Phase 2 starting in late 2024. This proposal is not drawing lines on empty land, but proposing a functional upgrade for a public space taking shape: upgrading a simple green belt into a Benchmark Spine by implanting calibration nodes along it.

**Three Yards — Three Calibration Yards**: Each key area has one calibration yard, taking on different stages of the calibration system. Zhongzhiyuan Calibration Yard is the "evaluation track" — a visitable AI evaluation venue where the public can see what benchmarks models are running; AI Origin Alignment Square is the "benchmark release plaza" — a public venue for alignment deliberation and benchmark release; Dazhongsi Gauge Gate is the "interoperability portal" — the access gateway and interoperability testing ground for intelligent native businesses [metric:calibration_yard_count] [data:geometry/public_space.geojson#PS-001].

**Five Gates — Five Gauge Gates**: Five interoperability access nodes arranged along the Benchmark Spine, each serving as both an east-west stitching link and a standards access interface. Each Gauge Gate carries one interoperability testing function and has a forecourt as public space [metric:gauge_gate_count] [data:geometry/roads.geojson#ROAD-002]. The crossing form (at-grade, ramp, or bridge) is an engineering judgment to be determined by professional teams in conjunction with rail, utility, and heritage conditions; this proposal makes no engineering conclusions.

**Two Wings**: The western Zhongguancun Technology Service Wing bears globalized factor allocation and capital/IP empowerment; the eastern Xiaoyuehe Scenario Wing bears scenario empowerment and outdoor testing calibration [depth:overall_spatial_structure]. The two wings' relationship to the three areas is supportive, not subordinate: the Zhongguancun wing provides capital and internationalization channels for the Calibration Yard, and the Xiaoyuehe wing provides real-scenario verification for calibration.

### Urban Renewal Framework

The renewal follows a "densify along the spine, permeate toward the wings" framework: the 300m on either side of the Benchmark Spine is prioritized for renewal to form a continuous public interface; mixed-use nodes are placed at both ends of each Gauge Gate to avoid renewal happening only on one side. Land-use partitioning divides the overall design area into 15 fully-covering, zero-overlap polygons across six land-use codes [data:geometry/land_use.geojson#LU-001] [metric:land_use_area_by_code] [depth:land_use_layout].

The character-control principle is "low-key infrastructure, clear public nodes" — calibration yards and landmarks may have recognizability, while ordinary blocks emphasize interface continuity and ground-floor activity, avoiding the whole belt being covered by a single style [depth:height_massing_character]. Building height, density, and floor area ratio fall under statutory regulatory planning authority; no approved control values exist in public materials, so this proposal gives no control conclusions, only indicative massing to test the scale of spatial ideas [metric:floor_area_ratio] [depth:development_intensity_controls].

## Key Area Detailed Design

The three key areas' detailed design follows the same logic: first establish public space and Gauge Gates, then functions and massing, then AI scenario access points [depth:three_key_area_detailed_design].

![Figure 3 Three key areas detailed design](assets/figures/key-areas.png)

### Zhongzhiyuan AI Self-Reliant Innovation Acceleration Area (North, 192.1 ha)

**Positioning**: The "Calibration Yard" for full-stack self-determined calibration, and the governance hub of this belt [metric:key_area_zhongzhiyuan_ai_acceleration_area_sqm].

**Spatial actions**: First, the **Calibration Yard** — leveraging the larger block scale of the northern section, organize repeatedly modifiable pilot and evaluation land, arranging AI benchmark testing like marshalling — group, test-run, review; this section is predominantly research land with extensive reserved white-land, leaving room for compute and evaluation facilities, avoiding writing uncertainty as conclusion [data:geometry/land_use.geojson#LU-001]. Second, the **dispatch hub** — a publicly accessible building in the central public square of the area, with a large screen publicly displaying the running AI task queue of this belt, with an explicit human-intervention device and appeal channel, making "who calibrates AI" visible public governance. Third, the **north interface** — reserving a coordination channel toward the North Fifth Ring and Qinghe direction, echoing Beijing-Hebei research and pilot resource synergy.

**AI scenario access**: The Calibration Yard mainly accesses three scenarios — benchmark evaluation guidance, red-team drill yard, and unmanned delivery calibration track (see AI+ Scenarios chapter). These three scenarios share the visitable eval track and public forecourt, making evaluation not a black box but a publicly audible activity.

**Pending data**: The ownership, structure, and preservation value of existing factories and courtyards are key to whether the Calibration Yard can be placed; this is not in public materials and must be determined by professional teams on-site [depth:retain_renovate_demolish]. Regulatory FAR, building height, and density control values are missing; this proposal gives no control conclusions [metric:official_floor_area_ratio].

### Beijing AI Origin Community (Middle, 104.3 ha)

**Positioning**: The "Benchmark Spine" for the world-class AI innovation ecosystem, an evaluation industry cluster area [metric:key_area_beijing_ai_origin_community_sqm].

**Spatial actions**: First, the **Benchmark Spine** — organizing an evaluation industry cluster belt along the heritage park, arranging benchmark release, evaluation services, and model alignment toolchains into a continuous industry interface [data:geometry/land_use.geojson#LU-006]. Second, the **Alignment Square** — a publicly audible alignment deliberation plaza in the area center, with periodic public deliberation on AI alignment and safety sandbox, and human-review channels and appeal entry [data:geometry/public_space.geojson#PS-002]. Third, **mixed housing** — arranging a mixed residential area on the east side, putting evaluation engineers, developers, and community residents together in a walkable "work-life-test" community.

**AI scenario access**: The Alignment Square mainly accesses three scenarios — model drift monitoring station, AI health service navigation calibration, and youth evaluation lab. The Benchmark Spine accesses the enterprise compliance evaluation Copilot and cultural guide benchmark set.

**Pending data**: The retain/renovate/demolish classification of existing residential and industrial buildings, and rail station access conditions, must be determined by professional teams in conjunction with regulatory plans and site conditions [depth:retain_renovate_demolish].

### Dazhongsi AI Industry Cluster Area (South, 72.0 ha)

**Positioning**: The "Gauge Gate" for intelligent native new businesses, a market access and interoperability testing area [metric:key_area_dazhongsi_ai_industry_cluster_sqm].

**Spatial actions**: First, the **Gauge Gate** — a ceremonial portal plaza for interoperability access at the area's gateway, both a spatial node and an institutional one: intelligent native businesses entering this belt must pass interoperability testing, with results and access status public [data:geometry/public_space.geojson#PS-003]. Second, **intelligent native consumption and commerce** — leveraging Dazhongsi's existing commercial position to organize smart-native consumer experiences and business service scenarios, giving new technology a real market outlet [data:geometry/land_use.geojson#LU-012]. Third, **cultural display** — arranging cultural land as a carrier for Gauge Gate cultural display and brand narrative.

**AI scenario access**: The Gauge Gate mainly accesses the unmanned delivery calibration track and enterprise compliance evaluation Copilot, and serves as the southern starting point of the international communication narrative.

**Pending data**: The commercial ownership around Dazhongsi Station and the Dazhongsi heritage protection scope are key to whether the Gauge Gate portal can be placed; they must be determined by professional teams in conjunction with heritage and commercial conditions [depth:risk_missing_data].

## AI Innovation Ecosystem, Personas, and AI+ Scenarios

### AI Scenario Cards (agent.3, no fewer than 10)

This proposal designs ten AI scenario cards, each with scenario-space-operation mapping and privacy and human-review boundaries. The first six reuse registered scenarios from `scenarios/*.json`; the last four are custom scenarios, spatially mapped to different nodes of the calibration system:

| # | Scenario card | Track | Spatial node | Privacy & human-review boundary |
|---|---|---|---|---|
| 1 | AI benchmark evaluation guidance | jingzhang-heritage-narrative | Zhongzhiyuan Calibration Yard visitable track | Evaluation process public, model weights not; guidance text reviewed by evaluation and cultural personnel |
| 2 | Model drift monitoring station | civic-agent-governance | AI Origin Alignment Square | Monitoring data anonymized; human reviews drift thresholds and downgrade decisions; appeal channel |
| 3 | AI red-team drill yard | robotics+civic-governance | Zhongzhiyuan Calibration Yard | Red-team results anonymized before release; testing does not replace safety filing or assessment |
| 4 | Unmanned delivery calibration track | robot-delivery-low-speed | Dazhongsi Gauge Gate | Low-speed, supervised; route suggestions not approved transport plans; human takeover & e-stop |
| 5 | Slow-mobility accessibility calibration | ai-traffic-walkability | Benchmark Spine | Data representativeness noted; auto-judgment does not replace field survey [source:SCENARIO-AI-TRAFFIC] |
| 6 | Enterprise compliance evaluation Copilot | enterprise-services-ecosystem | Gauge Gate | Policy explanation not legal advice; human consultation channel retained [source:SCENARIO-ENTERPRISE-COPILOT] |
| 7 | AI health service navigation calibration | ai-public-services | AI Origin Community | Health content is public-service navigation only; reviewed by medical and data-security personnel [source:SCENARIO-AI-HEALTH] |
| 8 | Public safety review yard | public-safety-operations-review | Alignment Square | Only assists in identifying issues for human review; does not replace safety operations decisions [source:SCENARIO-PUBLIC-SAFETY] |
| 9 | Cultural guide benchmark set | ai-cultural-guide | Milestone | Historical accuracy and copyright reviewed by cultural and copyright personnel; AI content not conflated with fact [source:SCENARIO-AI-CULTURAL-GUIDE] |
| 10 | Youth evaluation lab | youth-friendly-public-space | AI Origin Community | Youth participation requires guardianship and informed consent; data anonymized |

Each card follows a "scenario-space-operation" mapping: the scenario defines what the AI service does, the space defines which node of the calibration system it lands on, and the operation defines when it runs, who is responsible, and how to stop it. All scenarios have human-review channels and e-stop mechanisms; immature technology must not be written as fully deployable, and test scenarios must not be written as approved operations [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Industry Test/Validation Scenarios (no fewer than 3)

1. **Model benchmark release yard** (Zhongzhiyuan Calibration Yard): Periodically publish and update AI evaluation benchmarks, organize reproducible benchmark testing; benchmarked against MLCommons/MLPerf and BAAI FlagEval's public mode, but localized as a visitable urban activity [source:MLCOMMONS-MLPERF] [source:BAAI-FLAGEVAL].
2. **Interoperability access testing** (Dazhongsi Gauge Gate): Intelligent native businesses must pass interoperability testing before entering this belt, with results and access status public; benchmarked against Singapore AI Verify and EU AI Act conformity assessment logic, but localized as a spatialized gateway [source:SINGAPORE-AI-VERIFY] [source:EU-AI-ACT].
3. **Alignment and safety sandbox** (AI Origin Alignment Square): Conduct public-auditable AI alignment deliberation and safety sandbox testing at the plaza, with human-intervention devices and appeal channels; benchmarked against NIST AISI and UK AISI government-level evaluation logic, but localized as a public governance venue [source:NIST-AISI] [source:UK-AISI].

### User Personas (no fewer than 5)

1. **Benchmark engineer**: Works at Zhongzhiyuan Calibration Yard and Benchmark Spine, designing, running, and maintaining AI evaluation benchmarks; needs a visitable eval track and reproducible test environment.
2. **Red-team researcher**: Conducts red-team drills at the Calibration Yard, finding AI system vulnerabilities and alignment defects; needs repeatedly modifiable pilot land and anonymized result channels.
3. **Small AI team developer**: Flows between the AI Origin Community and Gauge Gate, developing, evaluating, and accessing intelligent native applications; needs low-threshold evaluation services, compliance Copilot, and interoperability testing channels.
4. **Policy and compliance officer**: Works at the Alignment Square and Gauge Gate, reviewing AI service alignment and access; needs publicly audible deliberation venues and human-review channels.
5. **Belt corridor resident and visitor**: Lives along or visits the Benchmark Spine, both a beneficiary and a supervisor of AI services; needs walkable, accessible, appealable public space and milestone narrative.

### AI Pilgrimage Landmarks (agent.4, no fewer than 3)

1. **Calibration Yard** (Zhongzhiyuan): A visitable AI evaluation track where the public can see what benchmarks models are running, making "how AI is measured" a publicly observable activity [data:geometry/public_space.geojson#PS-001].
2. **Alignment Square** (AI Origin Community): A publicly audible alignment deliberation and human-intervention device, making "who aligns AI" a visible, debatable, stoppable public governance [data:geometry/public_space.geojson#PS-002].
3. **Gauge Gate** (Dazhongsi): A ceremonial portal for interoperability access, making "how intelligent native businesses gain access" a visible, auditable spatial institution [data:geometry/public_space.geojson#PS-003].

The three landmarks are not independent buildings but the spatialization of three stages of the calibration system: the Calibration Yard governs "measurement," the Alignment Square governs "constraint," and the Gauge Gate governs "access." The honor-display system places milestones along the Benchmark Spine, inscribing contributors and benchmark versions, echoing the co-creation principles of "public knowledge accumulation" and "contributor memory" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The public-space component library includes calibration nodes, benchmark display walls, evaluation stands, alignment review seats, and Gauge Gate components, for reuse by professional teams in deepening.

## Land Use, Building Scale, and Retain/Renovate/Demolish

### Land Use Structure

The overall design area's land use is partitioned into 15 fully-covering, zero-overlap polygons across six land-use codes [data:geometry/land_use.geojson#LU-001] [metric:land_use_area_by_code] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. The land-use logic follows the calibration system: the Zhongzhiyuan north section is predominantly research land (0802) with reserved white land (16) for evaluation and piloting; the AI Origin middle section mixes research land (0802) and residential land (0701) for a "work-life-test" structure; the Dazhongsi south section is predominantly commercial service land (05) and cultural land (0803) for intelligent native consumption and commerce. Along the heritage park, park green space (1401) and plaza land (1403) form the Benchmark Spine green vein [depth:land_use_layout].

### Building Scale and Retain/Renovate/Demolish

There are 35 building footprints with floors assigned by land-use type: research 8 floors, commercial 6, residential 12, cultural 4, white land 1 (temporary test facilities) [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm]. The indicative total FAR is 0.031, well below typical urban development intensity, because this proposal retains extensive white land and park green space, not pursuing high-density development but leaving ample room for calibration infrastructure and public space [metric:floor_area_ratio]. This value is indicative massing only and does not constitute a regulatory FAR conclusion [metric:official_floor_area_ratio].

The retain/renovate/demolish classification must be based on existing building ownership, structure, and preservation value — data not currently in public materials [depth:retain_renovate_demolish]. This proposal's principle: prioritize renewal along both sides of the Benchmark Spine for a continuous public interface; prioritize public space at the three calibration yard locations rather than new buildings; arrange no specific construction on white land until official data is supplemented. Specific conclusions must be determined by professional teams in conjunction with regulatory plans and site conditions; this proposal gives no parcel-level retain/renovate/demolish judgments [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## Transportation, Rail, Utilities, and Public Services

### Transportation and Slow Mobility

The Benchmark Spine is this belt's transportation backbone: a 9.4km north-south slow-mobility main spine, fully accessible, pedestrian and cycling priority [metric:spine_length_m] [data:geometry/roads.geojson#ROAD-001] [standard:MOHURD-URBAN-DESIGN-MEASURES]. The five Gauge Gates also serve as east-west stitching links, reconnecting the two sides severed by the railway for a century; stitching links are pedestrian priority, and the crossing form is an engineering judgment. Road area is estimated with a 12m bilateral buffer for indicative metrics only and does not represent road redline [metric:road_area_sqm] [metric:road_ratio].

### Rail Access

The three key areas are near rail stations (Zhongzhiyuan near Wudaokou and Qinghua East Road, AI Origin near Wudaokou, Dazhongsi near Dazhongsi Station), but precise station placement and access conditions must be determined by professional teams in conjunction with rail and utility conditions; this proposal makes no engineering conclusions [depth:risk_missing_data].

### Utilities and Public Services

The compute, power, and cooling needed by calibration yards fall under utility and energy authority; this proposal only reserves spatial-side interfaces — leaving white land for compute and evaluation facilities. Public service facilities are arranged along the Benchmark Spine, including AI health service navigation calibration, cultural guide benchmark set, and youth evaluation lab access points [source:AGENT-TASKBOOK]. Barrier-free environment construction must comply with the Barrier-Free Environment Construction Law, with its human-service requirements strictly understood per Article 39's enumerated scenarios [standard:BARRIER-FREE-ENVIRONMENT-LAW]. Elderly smart-technology service scenarios reference State Council General Office Document [2020] No. 45, but are not written as legal obligations still in force in 2026 [standard:ELDERLY-SMART-TECH-PLAN-2020-45].

![Figure 4 Blue-green public space and slow-mobility system](assets/figures/mobility-bluegreen.png)

## Blue-Green Space, Public Space, and Urban Character

### Blue-Green Space

The heritage park green vein runs through the entire belt along the Benchmark Spine, as this belt's ecological spine [data:geometry/green_space.geojson#GREEN-001] [metric:green_space_area_sqm]. Each key area has one node green space, forming stoppable green points in key sections. The green ratio is 22.7%, recomputed under the provisional boundary and subject to recomputation once the official polygon is published [metric:green_ratio]. The Xiaoyuehe River and the Xiaoyuehe Scenario Wing carry water-green coupled outdoor testing calibration [depth:blue_green_public_space].

### Public Space

The public space system consists of three calibration yard forecourts and five gauge gate forecourts [data:geometry/public_space.geojson#PS-001] [metric:public_space_area_sqm] [metric:public_space_ratio]. Public space is not residual building space — the calibration yard and gauge gate forecourts are established before buildings, making "how AI is measured and admitted" the theme of public life [standard:MOHURD-URBAN-DESIGN-MEASURES]. The heritage protection belt runs along the Benchmark Spine; the protection scope falls under heritage authority, and this proposal makes no precise heritage control conclusions [data:geometry/constraints.geojson#CON-001].

### Urban Character

The character-control principle is "low-key infrastructure, clear public nodes" [depth:height_massing_character]. The Calibration Yard, Alignment Square, and Gauge Gate may have recognizability — they are this belt's public landmarks; ordinary blocks emphasize interface continuity, ground-floor activity, and human scale. The signage and symbol system uses the gauge double-line and surveying-cross motif, the same family as the overall Logo but differentiated at cultural narrative nodes [depth:height_massing_character]. Colors draw from the Jing-Zhang engineering palette, avoiding the whole belt being covered by a single style.

## Renewal Project List, Implementation Policy, and Phasing

### Renewal Project List

The renewal projects are organized by the calibration system into five types: ① Calibration Yard and eval track construction (Zhongzhiyuan); ② Benchmark Spine and Alignment Square construction (AI Origin); ③ Gauge Gate and interoperability testing ground construction (Dazhongsi); ④ Benchmark Spine slow-mobility spine and stitching link completion (entire belt); ⑤ Milestone honor-display system (entire belt) [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_area_sqm]. Each project is marked as a conceptual suggestion and does not constitute investment estimation, development sequencing, or approval judgment [standard:MOHURD-CONTROL-DETAILED-PLANNING].

### Implementation Policy

The implementation policy suggestions focus on three points: first, include "AI calibration infrastructure" in the new-type infrastructure list, securing planning and land guarantees for calibration yards and benchmark corridors; second, establish a public system for benchmark release and interoperability access, referencing the institutional logic of MLCommons and EU AI Act but localized [source:MLCOMMONS-MLPERF] [source:EU-AI-ACT]; third, retain human-intervention and appeal mechanisms, so calibration does not become unquestionable power [standard:GENERATIVE-AI-INTERIM-MEASURES]. These policy suggestions are conceptual and do not constitute confirmed government decisions or implementation arrangements [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Phasing

Phasing is divided into four phases by north-south order [data:geometry/phasing.geojson#PHASE-001] [metric:phasing_area_sqm]:

| Phase | Scope | Main content |
|---|---|---|
| Phase 1 | Zhongzhiyuan Calibration Yard startup | Calibration Yard and eval track, dispatch hub, north interface |
| Phase 2 | Benchmark Spine through-section | Slow-mobility spine, stitching links, milestone honor system |
| Phase 3 | AI Origin evaluation industry | Alignment Square, Benchmark Spine industry belt, mixed housing |
| Phase 4 | Dazhongsi Gauge Gate closing | Gauge Gate, interoperability testing ground, intelligent native commerce |

Phasing is a conceptual sequence suggestion and does not constitute development sequencing or approval judgment; it must be determined by professional teams in conjunction with regulatory plans, funding, and site conditions [depth:implementation_phasing].

## Indicator System, Area Recomputation, and Compliance Matrix

### Metric Recomputation

All spatial metrics are recomputed from GeoJSON in EPSG:4548, not copied from narrative text [metric:site_area_sqm] [metric:green_ratio] [metric:floor_area_ratio]. Site area is 11.41 km², consistent with the announced ~11.4 km²; the three key areas total 369.3 hectares, 0.24% off the announced 368.4 hectares; the Benchmark Spine is 9716m [metric:spine_length_m]. Five official regulatory control indicators (FAR, building height, building density, green ratio, setback) are marked `status:"unknown"` because no approved control values exist in public materials, pending official data [metric:official_floor_area_ratio] [metric:official_building_height_m] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

![Figure 5 Core metrics evidence dashboard](assets/figures/metrics-evidence.png)

### Compliance Matrix

`compliance_matrix.json` covers all tasks in announcement sections 1.3, 1.4, 1.5 and the six required tasks agent.1 through agent.6, each with coverage status, corresponding proposal section, and evidence files [depth:compliance_matrix] [data:compliance_matrix.json]. `standard_matrix.json` covers five mandatory-for-formal standards and four non-mandatory standards [depth:standard_matrix]. `design_depth_matrix.json` marks all required depth items as complete [depth:design_depth_matrix]. Complete machine-audit-layer records are in these three matrix files; the narrative does not transcribe them line by line [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

## Risk, Copyright, and Compliance

### Risk

- **Boundary uncertainty**: Provisional boundaries are currently used, with spatial uncertainty relative to the official precise redline; end-to-end recomputation is required once the official polygon is published [depth:risk_missing_data] [assumptions:provisional_boundary].
- **Missing regulatory controls**: Five official regulatory control indicators are missing; this proposal gives no control conclusions, and indicative massing is only for scale verification [metric:official_floor_area_ratio].
- **External case compliance**: Eight international cases are background reference only, not basis for local spatial conclusions or government commitments, with full provenance recorded [source:MLCOMMONS-MLPERF].
- **Conceptual suggestion attribute**: All spatial recommendations are conceptual suggestions, reference schemes, or material for professional teams to deepen; they do not replace formal planning and do not constitute government-approved conclusions [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

### Copyright

All content in this proposal is original or based on public materials; external cases are background reference with attribution; no infringing materials; COMMUNITY-DISPLAY-ONLY license. Logo and figure materials use only redistributable or self-made resources; unauthorized use of fonts, images, trademarks, persons, or corporate marks is prohibited [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]. The copyright statement is in `report/copyright_statement.md`.

### Compliance Boundary

This proposal does not give: regulatory plan adjustments, FAR, building height, building intensity or other statutory planning judgments; parcel-level retain/renovate/demolish plans; road alignment, rail alignment, bridge/tunnel engineering, utility pipelines or other engineering schemes; underground space feasibility, energy load, utility capacity or other professional calculations; land ownership, investment estimation, development sequencing, or approval judgments. All spatial recommendations are worded as "conceptual suggestions," "reference schemes," or "material for professional teams to deepen" [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:MOHURD-CONTROL-DETAILED-PLANNING].

## References

All sources are fully recorded in `sources.json` [source:SOURCE-REGISTRY]; the main sources are:

- Official announcement: Beijing Municipal Planning and Natural Resources Commission Haidian Branch, Prequalification Announcement
- Agent open-call taskbook: six required tasks, ten co-creation principles, three areas + two wings
- Provisional boundary derivation and public-source verification record
- Eight global AI evaluation benchmark and safety cases (MLCommons/MLPerf, NIST AISI, UK AISI, Singapore AI Verify, BAAI FlagEval, CAICT, EU AI Act, SEMI)
- Public source registry: `data/source_registry.json`
- Complete source, assumption, metric, geometry, compliance, standard, and design-depth records in `sources.json`, `assumptions.json`, `metrics.json`, `geometry/*.geojson`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`
