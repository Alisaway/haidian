---
title: "THE JING-ZHANG COUPLER BELT: STANDARD INTERFACES, COUPLE AND UNCOUPLE, ONE URBAN CONSIST / 京张车钩带"
summary: "Translating the century-old engineering wisdom of the railway automatic coupler into an urban protocol for the AI innovation belt: every AI scenario is one car of a consist, and must carry a standard interface confirmed by a named human before it can couple onto the city train. Standard interfaces, safe coupling, buffered degradation, and rule-based re-marshalling. One consist, one city; every car can come safely and leave cleanly."
author_github: "xiaopi668"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
tracks: ["civic-agent-governance", "enterprise-services-ecosystem", "youth-friendly-public-space"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review", "robot-delivery-low-speed", "ai-cultural-guide", "ai-health-service-navigation"]
iteration: "v0.1"
---

# The Jing-Zhang Coupler Belt: Standard Interfaces, Couple and Uncouple, One Urban Consist

> **STANDARD INTERFACES · COUPLE AND UNCOUPLE · ONE URBAN CONSIST.** In early railway operation, cars were coupled by manual pins: hard to release in danger and prone to breakaways. The automatic coupler turned coupling into one standardised mechanical act — quick to couple, ready to uncouple, and able to re-marshal, while buffer gear gave every impact some margin. This proposal translates that century of engineering wisdom into an urban protocol for the AI innovation belt: **every AI scenario is one car of a consist. It must carry a standard interface and be coupled by a named human confirmation before it can join the city train. Standard interfaces, safe coupling, buffered degradation, and rule-based re-marshalling.** [assumption:A-COUPLER-001] [assumption:A-COUPLER-HISTORY-001] [source:COUPLER-HISTORY-REF]

## Executive Summary

The Jing-Zhang Railway (1905–1909), engineered under Zhan Tianyou, was the first trunk line built entirely by China's own efforts, and a live site of railway standardisation: unified gauge, unified bridge-and-roadway practice, unified parts inspection, so that "how a railway is built" became reproducible engineering knowledge [source:OFFICIAL-JINGZHANG-HISTORY]. Today part of this century-old main line has become the Jing-Zhang Railway Heritage Park: Phase I, 2.5 km and 16.8 ha between Qinghua East Road and Zhichun Road, restored the old alignment, repaired the Qinghuayuan station building, and used old rails, switches and locomotives to stitch the city back together [source:OFFICIAL-PARK-PHASE1-2023]. Our question is: **when the AI innovation belt welcomes new models, new robots and new scenarios every day, what guarantees that they connect safely, stop decisively and withdraw cleanly?** The answer is not a more complex platform but an older component: the coupler.

This proposal takes the automatic coupler as its core mechanism and organises the whole belt as **one consist, three cars, two wings, six couplers**: a coupling main line along the old railway (the Heritage Park vitality belt) is the public spine of the whole train; the three key areas become three cars — Zhongzhiyuan = the locomotive (full-stack power and test traction), AI Origin = the head car (driving cab and open-source decisions), Dazhongsi = the freight-and-passenger car (industry landing and daily life); the Zhongguancun technology-service wing = the depot (maintenance, standards and capital services), and the Xiaoyuehe scenario-empowerment wing = the test track (scenario testing and feedback); six "coupler nodes" of public space along the spine carry coupling, uncoupling and buffer display between scenarios and the city [data:geometry/constraints.geojson#CX-001] [metric:coupler_node_count] [metric:site_area_sqm]. Each AI scenario is one "car": whether its interface is standard, who confirms the coupling, whether the city keeps running after a disconnect, and whether the buffer gear works on failure — all are written into each scenario card's **coupling route table** [metric:coupling_route_table_coverage_ratio].

The coupler is not a new system; it makes "connection" a visible, reversible, auditable object: **a standard interface (data / permission / audit), named human confirmation, buffered degradation, and an uncoupling procedure — none may be missing.** Allowed tasks, data boundaries, human review, shutdown conditions and exit flows are registered in each card's route table. AI is a car, not the track; without a standard interface and human confirmation, no model, however strong, may casually couple onto the city train.

Spatially, this proposal partitions the provisional overall scope of about 11.4 km² into 24 conceptual land-use units with full coverage (recalculated in EPSG:4548) [data:geometry/land_use.geojson] [metric:land_use_parcel_count]; the concept green ratio is about 21.1% and public-space ratio about 5.8% [data:geometry/green_space.geojson] [metric:green_ratio] [metric:public_space_ratio]; the coupling spine plus wing greenways total about 19.4 km [metric:spine_length_m], with six coupler nodes as the spatial skeleton [data:geometry/public_space.geojson#CP-01] [metric:coupler_node_count]. All geometry is based on the repository's provisional rough boundary; the whole chain must be recalculated when official polygons are released [data:geometry/site_boundary.geojson#PROV-SITE-001] [assumption:A-BOUNDARY-001].

Implementation starts with "two couplers, three cars" rather than the whole line at once: Zhongzhiyuan first runs one enclosed test coupler and a test-track area, Dazhongsi one open experience coupler; AI Origin starts in shadow mode with an interface clinic and model explanation workshop [metric:phasing_stage_count]. Every car closes with four acceptance phrases: **is the interface publicly visible; is coupling confirmed by a named person; does ordinary service continue after a disconnect; do data and equipment leave cleanly after uncoupling.** [data:risk.json] [depth:risk_missing_data]

![Master view: main line, three cars, two wings and six coupler nodes](assets/figures/site-overview.png)

## Design Basis and Source Inventory

The evidence is organised in four layers.

The first layer is the official announcement and the agent taskbook, which define the three scope levels, three positionings, five functions, three areas and two wings, and six agent tasks — the controlling basis of this response [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The second layer is publicly released facts from Beijing and Haidian authorities on the park and railway heritage, used to establish "what exists and why renewal is needed" [source:OFFICIAL-PARK-PHASE1-2023] [source:OFFICIAL-JINGZHANG-HISTORY]; AI-industry and agent-policy information is used only as industrial context, never inferred to specific parcels [source:OFFICIAL-AGENTIC-AI-2026] [source:OFFICIAL-AI-ORIGIN-2026].

The third layer is the repository site package, source registry and provisional geometry, used for reproducible design [source:SITE-PACKAGE] [source:SOURCE-REGISTRY] [source:DATA-SRC-PROVISIONAL-BOUNDARIES-20260605].

The fourth layer is popular-science material on the coupler mechanism and overseas cases; only the interface-standardisation, buffered-degradation and reversible-connection mechanisms are extracted, and no foreign institution or figure is transplanted as a Beijing standard [source:COUPLER-HISTORY-REF] [source:CASE-NIST-AI-RMF]; other cases serve only as mechanism comparison [source:CASE-AMSTERDAM-SENSING] [source:CASE-UNHABITAT-PEOPLE] [source:CASE-SEOUL-OIL-TANK] [source:CASE-SINGAPORE-PUNGGOL].

| Source status | What this version may do | What this version will never do | Evidence that triggers the next version |
|---|---|---|---|
| Official announcement & taskbook | Define scope, tasks, depth, language | Assume current owners, investment or approvals | Official supplements and annexes |
| Official public facts (park phase I, railway history, AI industry) | Establish "what exists, why renew" background | Infer parcel-level or engineering alignments | Official surveys and project data |
| Provisional scope and nine GeoJSON layers | Topology checks, concept partition, area recalculation | Official redlines, ownership, demolition or engineering conclusions | Official polygons and survey results |
| Coupler mechanism & overseas cases | Extract interface, buffer, uncoupling mechanisms | Transplant foreign institutions or figures | Chinese law and professional teams |

The coupler mechanism facts come from public popular-science entries: automatic couplers remove the manual pin, couple reliably, uncouple quickly, support re-marshalling, and buffer gear absorbs coupling and running impacts [source:COUPLER-HISTORY-REF] [assumption:A-COUPLER-HISTORY-001]. This proposal borrows only the mechanism; it does not claim that any railway regulation applies to AI services, and it does not write the "urban coupler" as a statutory approval system [assumption:A-COUPLER-001].

The complete source, metric, standard, depth and task indexes live in sources.json, metrics.json and the three matrices; the prose keeps only claims-adjacent references. The current scope and key areas remain provisional geometry, with precision and replacement conditions disclosed as they are [data:geometry/site_boundary.geojson#PROV-SITE-001] [assumption:A-BOUNDARY-001].

## Three-Level Scope Framework

The three levels are not three independent plans but one transmission chain of the coupler logic from industrial strategy to space to pilots [depth:three_level_scope_framework].

| Level | Core question | Delivered in this version | Boundary that must not be crossed |
|---|---|---|---|
| Coordinated research area | How do AI industry, talent, public problems and regional partners interconnect through standard interfaces | Coupler ecosystem, 7 cases, 5 personas, annual events | No fabricated partners, firms, funds or landing |
| Overall design area | How the corridor keeps the order of "can couple, can uncouple, can re-marshal" through technology turnover | One consist, three cars, two wings, six couplers, 24 land-use units | Provisional PROV-SITE-001 is not an official redline |
| Key detailed design areas | How an AI trial couples safely, degrades with buffer, uncouples cleanly | 12 scenario route tables, three car profiles, 10 project packages | Provisional rectangles are not parcels, ownership or engineering scope |

Each level closes with the same acceptance sentence: **is the interface publicly visible; is coupling confirmed by a named person; does the city keep running without it; who restores after uncoupling and how is it audited.** If the coordination level has no real public problem and recipient, it does not enter the overall level; if the overall level has no ordinary human path, it does not enter the key level; if the key level has no buffered degradation, maintainer and uncoupling procedure, it does not enter pilots [depth:risk_missing_data].

The provisional overall scope is about 11.4 km² [metric:site_area_sqm]; the three key areas are roughly positioned as rectangular placeholders by the announcement's names, order and approximate areas [data:geometry/key_areas.geojson#PROV-KEY-001] [assumption:A-KEYAREA-001] [metric:key_area_total_sqm]. When official polygons arrive, versions must be locked, all layers re-clipped, areas and ratios recalculated, scenarios and projects re-attributed, bilingual figures and PDFs updated, and a difference log published [depth:metrics_recalculation] [assumption:A-BOUNDARY-001].

## Coordinated Research Area: Industry and Future-City Study

The taskbook's three positionings are translated here into three "coupling modes" [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]:

| Positioning | Coupler translation | Five functions landing |
|---|---|---|
| Centennial Jing-Zhang cultural belt | From "build the first railway with our own hands" to "build trusted interface infrastructure with our own hands" | Global voice in AI governance |
| Urban AI life-experience belt | The public compares "coupler-free ordinary service" with "coupler-bearing AI service" on the same main line | New AI+ scenario paradigm; intelligent vibrant AI city |
| AI integration innovation belt | R&D, test, open source, transformation and public use run in "couple-run-buffer-uncouple" order | Full-stack independent innovation; world-class AI ecosystem |

**The coupler loop of three areas and two wings.** The Zhongzhiyuan locomotive issues "test coupling", validating embodied intelligence, edge compute and safe uncoupling in enclosed couplers and on the test track [source:OFFICIAL-AI-TESTFIELD-2026] [source:OFFICIAL-EMBODIED-PARK-2025]; the AI Origin head car issues "open-source coupling", releasing validated models, adapters and documentation as reusable public parts [source:OFFICIAL-AI-ORIGIN-2026]; the Dazhongsi freight-and-passenger car issues "operation coupling", running public-facing industry experiences and life services in open couplers. The Zhongguancun wing provides law, standards, capital and professional-service directions; the Xiaoyuehe wing provides public problems, ecology and life feedback; the wings never bypass the three cars' confirmation gates [depth:three_key_area_detailed_design].

Regional collaboration only proposes to-be-agreed "inputs — shareable outputs" and fabricates no partners: the northern community may raise residents' problems, Future Science City may offer test-method directions, Huairou Science City calibration directions, the Economic-Technological Development Area engineering and manufacturing feedback, and the Beijing-Tianjin-Hebei region receives only de-localised protocols, failure packages and version diffs. No coordinates, personal data, approval conclusions or partnership names flow across regions by default [assumption:A-PRIVACY-001].

**Seven global ecosystem cases condensed into seven transferable mechanisms** [metric:ai_ecosystem_case_count] [assumption:A-ECOSYSTEM-001]:

| Case/framework | Transferable mechanism | Jing-Zhang translation | Explicitly not copied |
|---|---|---|---|
| Punggol Digital District [source:CASE-SINGAPORE-PUNGGOL] | Open platform, mixed industry-university-city, live-environment testing | Three cars validated by enclosed / semi-open / open types | Not its new-town scale, investment or central platform |
| NIST AI RMF [source:CASE-NIST-AI-RMF] | Lifecycle risk and retirement records | Coupler lifecycle = couple-run-buffer-uncouple | Framework does not replace professional safety duty |
| Amsterdam Responsible Sensing [source:CASE-AMSTERDAM-SENSING] | Sensor design from freedom, control and privacy | Sensors need visible purpose, interface and plug-pull rights | Public space is not a default data source |
| UN-Habitat People-Centred [source:CASE-UNHABITAT-PEOPLE] | Digital public goods, inclusion, small pilots | Coupler-free ordinary service runs alongside coupler-bearing AI | Non-binding guidance is not an approval basis |
| Seoul Oil Tank Culture Park [source:CASE-SEOUL-OIL-TANK] | Industrial heritage into public cultural space | Couplers, switches, locomotives become touchable memories | Not its building forms or retrofit conclusions |
| History of automatic coupler adoption [source:COUPLER-HISTORY-REF] | Standard interfaces, reliable coupling, reversible uncoupling | Urban coupler = named-human-confirmed standard interface | Railway regulations are not claimed to apply directly |
| Jing-Zhang construction history [source:OFFICIAL-JINGZHANG-HISTORY] | Independent design, unified standards, precise survey | "Build AI interfaces with our own hands" engineering narrative | Historic facts are not extrapolated to engineering conclusions |

**Naming, Logo and visual identity** revolve around "one standard coupler": Chinese name 京张车钩带, English name THE JING-ZHANG COUPLER BELT, international slogan STANDARD INTERFACES · COUPLE AND UNCOUPLE · ONE URBAN CONSIST. The logo direction is an abstract symbol of an automatic-coupler end face engaging a half-ring: the main hook represents the public main line, ring grooves represent the three interfaces of data / permission / audit, and the half-ring gap represents uncouplability; colours are sleeper brown, weathering-steel grey, signal vermilion and steel cyan — red only for "stop/uncouple", cyan for "couple/pass", grey for "standard part". The name and logo are conceptual directions, not official signage [assumption:A-VERB-001].
## Overall Design Area: Urban Renewal at Regulatory-Plan Urban-Design Depth

The overall structure is "**one consist, three cars, two wings, six couplers**": a coupling main line along the old railway direction (the Jing-Zhang Heritage Park vitality belt) joins three cars — Zhongzhiyuan = the locomotive, AI Origin = the head car, Dazhongsi = the freight-and-passenger car [data:geometry/roads.geojson#RD-001] [metric:spine_length_m]; six coupler nodes CP-01—CP-06 are placed along the line, prioritising east-west stitching while handling coupling confirmation and buffer display [data:geometry/public_space.geojson#CP-01] [metric:coupler_node_count]; the overall spatial structure is directly supported by the constraints layer [depth:overall_spatial_structure].

![Land-use partition, main line and three-car structure](assets/figures/land-use-structure.png)

24 conceptual land-use units use official classification codes and fully cover provisional PROV-SITE-001 without gaps or overlaps [data:geometry/land_use.geojson#LU-001] [metric:land_use_parcel_count] [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]. Research, industry and public services sit near the three cars; housing and community services spread across the two wings; the main line stays publicly continuous as park green and plaza land [depth:land_use_layout] [standard:MOHURD-URBAN-DESIGN-MEASURES]. "Cars" and "coupler nodes" are operational overlay labels; they do not change land use.

**The three cars are differentiated by risk type:** the Zhongzhiyuan locomotive is the "test car" — robots and sensors appear only in physically enclosed couplers, and ordinary paths and fire lanes are never test variables [assumption:A-DELIVERY-001]; the AI Origin head car is the "open-source semi-open car" — the front porch holds only public, reusable, recallable versions, while intellectual property and trade secrets stay in the controlled back room; the Dazhongsi freight-and-passenger car is the "operation open car" — AI services only add value, never make final decisions, and real payments, medical, legal, enforcement and scoring stay with humans [depth:traffic_rail_slow_parking] [assumption:A-AI-001].

**Six coupler nodes CP-01—CP-06** are simultaneously east-west stitching seams and coupling handover points: each seam connects residential areas and campuses on both sides pedestrian-first, and the node plaza carries "interface display — human confirmation — public inquiry" [data:geometry/public_space.geojson#CP-01] [metric:coupler_node_count]. A coupler node is not a security checkpoint but "connection made visible": physical interface lists, named confirmers, and inquiry screens showing only coupling status and validity periods, never collecting passers-by's personal data [depth:blue_green_public_space] [assumption:A-PRIVACY-001].

**The urban renewal order** is: preserve existing public value → repair passage, shade, drainage and human services → install reversible components → shadow-run coupler-bearing AI → audit → decide to keep, modify or remove. Building height, FAR, density, setbacks, parking, municipal capacity and demolition volumes are uniformly recorded as unknown; concept massing is not a statutory control value [assumption:A-CONTROLS-001] [depth:development_intensity_controls]. FAR, height and statutory green ratio await official control conditions; they are not back-solved or estimated [metric:floor_area_ratio] [metric:building_height_control_m] [metric:green_ratio_statutory].

## Key Area Detailed Design

All three key areas use the organiser's provisional rough polygons; rectangle edges do not represent roads, parcels or ownership [data:geometry/key_areas.geojson#PROV-KEY-001] [assumption:A-KEYAREA-001].

![Three-car profiles: test locomotive, open-source head car, operation freight-and-passenger car](assets/figures/key-areas.png)

| Key area | Car | Coupling type | Spatial profile | First scenarios |
|---|---|---|---|---|
| Zhongzhiyuan AI acceleration area | Locomotive | Test coupling (enclosed) | Public observation garden — touchable safety library — enclosed test coupler — isolated logistics | SCN-01—04 |
| Beijing AI Origin community | Head car | Open-source coupling (semi-open) | No-account front porch — repair long table — open parts wall — controlled cab back room | SCN-05—08 |
| Dazhongsi AI industry cluster | Freight-and-passenger car | Operation coupling (open) | All-day ordinary paths — tactile map — staffed counter — time-boxed synthetic sandbox | SCN-09—12 |

**Zhongzhiyuan = the locomotive.** Embodied intelligence, edge compute and red-team tests happen only in enclosed couplers with physical boundaries, human emergency stops and isolated logistics; the public observation garden is a "safety library" rather than a brand grandstand — visitors can touch test obstacles, read failure causes and compare offline modes [source:OFFICIAL-AI-TESTFIELD-2026] [source:OFFICIAL-EMBODIED-PARK-2025]. Passing a test is not regulatory or product approval; energy capacity, platform qualification, responsible parties and ecological conditions need separate verification [depth:three_key_area_detailed_design].

**AI Origin = the head car.** The space centres on "repair" rather than "showcase": a public long table hosts open-source issue clinics, interface adaptation, bilingual model explanations and youth reverse-mentorship; model cards, adapters, failure archives and maintenance manuals are permanent contents of the open parts wall [source:OFFICIAL-AI-ORIGIN-2026] [source:OFFICIAL-AGENTIC-AI-2026]. When AI stops, the table, tools, manuals, paper flows and human networks still run.

**Youth-friendliness as a cross-cutting principle.** Youth-friendliness is not a single scenario but a standing mechanism of space and governance: SCN-08 reverse mentorship upgrades to a standing "Youth Co-Governance Forum", with a physical "youth coupler node" beside the AI Origin public long table; youth participate not only as learners but as co-designers and reviewers of the coupler mechanism — regularly reviewing route-table drafts and the Uncoupling Festival retrospective. Seats and procedures are designed by the operations team under current youth-participation practice, with no statutory powers presumed [assumption:A-VERB-001].

**Dazhongsi = the freight-and-passenger car.** Begin with ground floor, first floor and static information; do not replace site investigation with engineering imaginings of viaducts or underground links; tactile maps, staffed counters and the Jing-Zhang memory trail are available all day, and consumer agents appear only in synthetic transactions with step-by-step human confirmation [source:OFFICIAL-PARK-PHASE1-2023] [depth:height_massing_character]. If the ordinary path is blocked, real payment is connected, the staffed counter is empty or complaints are unavailable, the scenario uncouples and stops immediately.

## AI Innovation Ecosystem, Personas and AI+ Scenarios

Five persona classes are not marketing labels but inputs to coupling-permission design [metric:persona_count]: R&D and open-source maintainers; startups and product teams; park users and residents; elderly and disabled users; international visitors and regional partners. No class may consent on behalf of another; the passage, quiet and ordinary services of non-participants come first [assumption:A-AI-001].

**The public as co-governors (conceptual mechanism).** Three mechanisms lift the public from "served" to "co-governor": ① a Public Coupling Review Panel — open couplers involving public space and services randomly select public representatives (with guaranteed seats for elderly and disabled representatives) before coupling, and their opinions inform the coupling decision; ② a Physical Coupler Cognition Toolkit — permanent display and loan points for large-print flowcharts, physical models and simplified operating cards; ③ Non-technical Experience Officers — the AI Origin head car reserves standing experience-officer seats for elderly residents, teenagers and other non-technical publics to review model explanations and failure archives. Quotas, sampling methods and effect are designed by operations and legal teams under current public-participation institutions; automatic adoption is not promised [assumption:A-VERB-001].

**12 scenario cards, each bound to a coupling route table** [metric:scenario_card_count] [metric:coupling_route_table_coverage_ratio]:

| ID | Scenario | Car/node | Allowed tasks | Data boundary | Human review | Buffer & uncoupling path | Type |
|---|---|---|---|---|---|---|---|
| SCN-01 | Automatic-coupling endurance test | Zhongzhiyuan CP-06 | Multi-agent couple/uncouple loop drills | Synthetic field data only | Named release by safety officer | Paper safety boundary + emergency uncouple | Industry test |
| SCN-02 | Buffer-gear calibration test | Zhongzhiyuan test coupler | Impact/full-load/disconnect calibration | Aggregated energy readings only | Operator reviews envelope | Manual run table + backup buffer | Industry test |
| SCN-03 | Uncoupling & emergency-stop drill | Zhongzhiyuan / test track | Emergency uncouple under power/network loss | No personal data | Disclosure-duty review | Failure card + manual uncoupling procedure | Industry test |
| SCN-04 | Edge-compute offline resilience | Zhongzhiyuan enclosed coupler | Offline/degraded/energy comparison | Aggregated energy readings only | Operator reviews envelope | Manual run table + phone-block | Industry test |
| SCN-05 | Open-source coupler clinic | AI Origin CP-04 | Issue triage, interface dependency check | Public codebases only | Maintainer sign-in review | Repair manual + issue tickets | Public |
| SCN-06 | Bilingual model explanation workshop | AI Origin CP-04 | Draft plain-language explanations & diffs | No training-data upload | Professional review before release | EN/ZH terminology card templates | Public |
| SCN-07 | City-service interoperability sandbox | AI Origin CP-03 | Synthetic ticket check & handover | Synthetic data only | Service desk reviews handover | Open adapters + paper flows | Public |
| SCN-08 | Youth reverse-mentorship | AI Origin CP-03 | Voluntary learning-partner matching | Minimal necessary, exit anytime | Guardian informed (minors) | Paper task cards + tool catalogue | Public |
| SCN-09 | Barrier-free dual-track navigation | Dazhongsi CP-01 | Temporary-obstacle and route assistance | No location retention | On-site verification of ordinary route | Tactile static map + hotline | Public |
| SCN-10 | Public-service triage counter | Dazhongsi CP-02 | Public catalogue search & material hints | No sensitive material retention | Staffed counter review | Paper catalogue + phone paths | Public |
| SCN-11 | Jing-Zhang memory co-reading | Dazhongsi CP-02 | Rights-cleared archive search & multilingual explain | Rights-cleared public archive only | Historical-fact review | Physical timeline + recall cards | Public |
| SCN-12 | Consumer-agent plug-pull sandbox | Dazhongsi CP-01 | Synthetic budgets with stepwise confirmation | No real-payment connection | Human confirms each step | Manual comparison board + complaint entry | Public |

The route table is a mandatory field of every card: allowed tasks, forbidden tasks, data boundary, human review, buffer trigger, uncoupling flow and coupling type — none may be missing. Generative AI services comply with the Interim Measures for the Management of Generative AI Services on content and responsibility [standard:GENERATIVE-AI-INTERIM-MEASURES] [source:DATA-SRC-GENERATIVE-AI-INTERIM-MEASURES]; accessibility scenarios follow the Barrier-Free Environment Construction Law and the State Council's Doc. 45 elderly-friendly requirements, keeping ordinary paths, paper flows and staffed counters [standard:BARRIER-FREE-ENVIRONMENT-LAW] [standard:ELDERLY-SMART-TECH-PLAN-2020-45]; the official texts of both documents are registered in the source index [source:DATA-SRC-BARRIER-FREE-ENVIRONMENT-LAW] [source:DATA-SRC-ELDERLY-SMART-TECH-PLAN-2020-45].

**Electronic coupler and AI technical architecture (conceptual direction).** The electronic coupler is suggested as a "standard interface + versioned connection" structure: coupling generates a connection credential carrying a named-confirmer identifier and a hash chain; verification collects no personal identity; uncoupling writes physical and data-withdrawal records; the concrete cryptography, anti-tamper and mutual-recognition protocols are designed by data and information-security professionals under current standards [assumption:A-COUPLER-001]. Model deployment follows an "edge-first, cloud-registered, edge-disconnectable" tiered strategy: testing areas run edge and near-edge inference first, with offline drills mandatory; model admission needs performance baseline, safety testing and a failure archive; version upgrades pass C0—C7 gates [depth:municipal_new_infrastructure]. Data pipelines process only public or authorised data; cleaning, de-identification and deletion flows are written into the route table [assumption:A-PRIVACY-001].

**Electronic-coupler field prototype and route comparison (conceptual).** For engineering evaluation, the electronic coupler should carry at least: coupler_id, confirmer, coupled_at, expires_at, platform_id, model_hash, route_table_ref, buffer_trigger, uncouple_status. At least three comparable technical directions exist for attestation and verification: a centralised database (simple, low cost, single-point risk), consortium-chain attestation (auditable, multi-agency recognition, higher cost and operations), and zero-knowledge privacy verification (no extra information exposed, highest technical threshold); their merits, costs and applicable ranges are for data and information-security professionals to evaluate with pilot scale. This package makes no choice [assumption:A-COUPLER-001].

**Coupler boundary for non-spatial AI services.** For pure data services that do not occupy public space (remote inference, backend models), the coupler mechanism applies as a "data coupler": it authorises only public/authorised dataset entry and output, never cross-region movement of personal sensitive data; if the service output eventually enters public-space display or interaction, it upgrades to the spatial coupler of the corresponding node [assumption:A-COUPLER-001] [assumption:A-PRIVACY-001].

Each card also records the "buffer trigger and uncoupling flow": how equipment powers down, how data is deleted or archived, how human flows take over, and where the failure archive lives [depth:municipal_new_infrastructure] [depth:retain_renovate_demolish]. Field-performance metrics stay null until a licensed baseline exists — no 0, no 100%, no estimates [metric:live_service_success_rate] [assumption:A-METRICS-001].

## Land Use, Building Scale and Retain/Renovate/Demolish Logic

24 conceptual land-use units close inside provisional PROV-SITE-001; they are not statutory areas [data:geometry/land_use.geojson#LU-001] [metric:site_area_sqm]. The land-use structure layers along the main line: research and industry sit around the three cars, housing/education/community services across the wings, and the main line stays publicly continuous as park green (1401) and plaza (1403), with reversible test buffers kept at the nodes [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [depth:land_use_layout].

The building layer holds only conceptual massing placeholders; the total footprint of about 953,000 m² is used for internal relationship diagnosis [data:geometry/buildings.geojson#BLDG-001] [metric:building_footprint_area_sqm] [assumption:A-BUILDING-001]. Before any real building enters the proposal, surveys of current condition, age, structure, ownership, fire safety, heritage, leases, ground-floor accessibility and maintenance are completed in order; the decision tree has four exits only — retain as-is, repair, reversible adaptive reuse, or re-justify — and defaults to retention when evidence is insufficient, producing no demolition list [depth:retain_renovate_demolish] [metric:construction_demolition_scale].

All three car types put the public layer outermost and on the ground floor: the locomotive's observation garden does not cross the testing area; the head car's public long table does not enter the controlled data back room; the freight-and-passenger car's tactile map and staffed counter do not depend on commercial tenants. Smart equipment is mounted only on reversible plug-in rails; at expiry, cables, bases and data are uncoupled and removed together, leaving no fences, dead ends, blank screens or unmaintained "digital ruins" [depth:height_massing_character].

## Transport, Rail, Municipal and Public-Service Facilities

With current data, the transport strategy establishes only two things: keep one ordinary public slow-traffic spine along the main line, and prioritise repairing six east-west seams [data:geometry/roads.geojson#RD-001] [metric:spine_length_m]. Wing service corridors are conceptual connections, not engineering alignments [metric:flank_road_length_m]; detailed transport organisation is a professional matter; this package expresses connectivity intent only [depth:traffic_rail_slow_parking]. These are intentions, not alignments; rail safety, road redlines, passenger flow, junctions, parking, viaducts and underground links must be judged by transport and rail professionals [assumption:A-CONTROLS-001].

![Main-line slow spine, six east-west seams and the blue-green public network](assets/figures/mobility-bluegreen.png)

Low-speed robots appear only in physically controlled test couplers in Zhongzhiyuan, where named safety officers can stop, push and isolate; ordinary park paths, accessible clear widths and fire lanes are never "intelligent logistics efficiency" test variables [assumption:A-DELIVERY-001]. SCN-09 navigation must also publish tactile static maps and on-site verified routes; algorithmic suggestions do not replace traffic-safety responsibility [standard:BARRIER-FREE-ENVIRONMENT-LAW].

Municipal and digital infrastructure follows "ordinary systems first, smart plugins after": stormwater, lighting, emergency, communications, power and fire services run independently to professional standards; sensors, edge computing, robots and models connect through one reversible plug-in rail, registering power, network, data, maintainer and plug-pull actions [depth:municipal_new_infrastructure]. After network loss, blackout or supplier exit, offline lamps, manual rain gauges, paper catalogues and staffed counters continue the minimum service — the city's "manual uncoupling" mode.

Public services insist on four parallel paths: on-site humans, paper materials, telephone and no-account digital entrances. AI may search and translate, but not make medical diagnoses, legal conclusions, welfare entitlement, credit scores, enforcement or real-payment decisions [assumption:A-AI-001] [standard:GENERATIVE-AI-INTERIM-MEASURES]. Staffing, shifts, maintenance, insurance and continuing budgets for any pilot remain unknown until authorised [assumption:A-RESOURCES-001].
## Blue-Green Space, Public Space and Urban Character

Within the provisional scope, concept green space is about 2,405,000 m², a ratio of about 21.1%, and concept public space about 664,000 m², a ratio of about 5.8% — internal recalculation only [data:geometry/green_space.geojson#GR-001] [metric:green_ratio] [metric:green_space_area_sqm]. The public-space ratio and blue-green design depth are covered by the corresponding layer and depth item [data:geometry/public_space.geojson#CP-01] [metric:public_space_ratio] [metric:public_space_area_sqm] [depth:blue_green_public_space]. Ecology, trees, soil, stormwater, river channels, maintenance and heritage conditions have not yet formed special conclusions.

The blue-green system is the carrier of "coupler-free public dividends": continuous shade and rest, readable stormwater, quiet edges, ordinary walking and maintainable materials — none depends on AI. No automatic control may write unverified data directly into drainage or ecological facility actions [assumption:A-DELIVERY-001].

**Four AI pilgrimage landmarks** [metric:landmark_count], all reversible, none presupposing new buildings; actions attached to heritage fabric require heritage review [source:OFFICIAL-PARK-PHASE1-2023] [depth:height_massing_character]:

| Landmark | Location | Content | Meaning |
|---|---|---|---|
| Coupler Tower | Zhongzhiyuan CP-06 observation garden | Touchable automatic-coupler wall + failure archive | Trust in standard interfaces |
| Coupling Bell | AI Origin CP-04 long table | Old station clock + coupling schedule board + contributor roster | Rhythm of human confirmation |
| Switchman Memory Gallery | Mid-spine coupler node | Oral histories and tools of railway switchmen/dispatchers | Memory of ordinary workers |
| Marshalling Lamp Array | Dazhongsi CP-01 platform | Reversible lamp array; red-stop, cyan-go mapped to coupling state | Connection status as public language |

The honour-display system records not only success but also repairs, suspensions, negative results, maintenance labour and public corrections — the core of coupler culture: an interface's value also lies in being cleanly uncoupled. Streetscape uses sleeper brown, weathering steel, light wood, mineral paving and replaceable metal parts; interfaces are low-brightness, switchable and free of giant screens [standard:MOHURD-URBAN-DESIGN-MEASURES]. AI-generated concept imagery expresses only material tone and human scenarios; it does not evidence buildings, boundaries, vegetation, headcounts or implementation results [source:IMAGEGEN-CONCEPT-COUPLER] [assumption:A-CULTURE-001].

## Renewal Project List, Implementation Policy and Phasing

Ten project packages can each be paused independently [metric:renewal_project_count] [depth:renewal_project_list]:

| Project | Core delivery | Entry conditions | Default action on failure |
|---|---|---|---|
| PRJ-01 Coupler-system sandbox | Coupling route-table schema, samples & coupling flow | Legal, data, public review | Archive; no site entry |
| PRJ-02 Main-line public spine audit | Ordinary passage, rest, static wayfinding & human-help baseline | Official scope & site walkthrough | Publish gaps; no AI hookup |
| PRJ-03 Zhongzhiyuan test coupler | One enclosed test coupler + test-track area | Liability, energy, ecology, safety | Stop testing, restore, publish failure |
| PRJ-04 Dazhongsi open coupler | One open experience coupler + staffed counter | Transport, ownership, consumer rights, accessibility | Keep ordinary services only |
| PRJ-05 Coupler-node seam repairs | Six east-west stitches + interface display points | Ownership, transport, heritage, accessibility review | Maintain status quo & isolate risk |
| PRJ-06 AI Origin shadow clinic | Open-source interface clinic & model explanation workshop | Site, IP, fire safety, operations | Return to paper clinic |
| PRJ-07 Reversible component library | Plug-in rails, offline lamps, manual rain gauges, etc. | G0—G5 | Uncouple, remove, restore |
| PRJ-08 Four pilgrimage landmarks | Reversible landmarks + contribution/failure archives | Source, copyright, heritage, maintenance | No permanent display |
| PRJ-09 Coupling issuance monitoring | Connection lifecycle & audit records | Data, law, independent evaluation | Stop issuance & publish |
| PRJ-10 Uncoupling Festival | Annual degradation drill & open retrospective | Permits, staff, budget, safety | Shrink, postpone or cancel |

**Phasing** [data:geometry/phasing.geojson#PH-001] [metric:phasing_stage_count] [depth:phasing_implementation]: near term (couplers first) — one Zhongzhiyuan test coupler plus one Dazhongsi open coupler start first, and the coupler system and audit run in the sandbox; mid term (open-source through-connection) — AI Origin open-source clinic, model explanation workshop and coupler-node seams are completed, and the whole line finishes ordinary-baseline audit; far term (normal operation) — all couplers operate with couplers, publishing quarterly "coupling reports" (coupling, buffering, uncoupling and failure-archive statistics).

**Coupler governance organisation (conceptual).** Operation is suggested to be shared by four named roles; any missing role stops issuance: the Confirmer (reviews route tables and confirms coupling), the Node Officer (verifies handover at nodes), the Auditor (independently reviews coupling/uncoupling records), and the Main-Line Guardian (maintains ordinary services and the manual buffer path). The four roles may be held by existing public bodies, communities and professional institutions; concrete duties, powers and legal responsibility are designed by professional teams under current institutions, with no new establishments presumed [assumption:A-COUPLER-001].

**Brand & wayfinding application guidelines (direction).** To carry the coupler emblem from cover into the site, three application tiers are proposed for later design development: Tier-1 wayfinding (coupler plaza entrances) uses the coupler-face ring emblem with red/cyan "coupled / uncoupled" status light-boxes, with night brightness kept clear of railway sightlines; Tier-2 (scenario car entrances) uses waybill QR plates with the three-interface icon, bilingual copy at heights serving wheelchairs and children alike; Tier-3 (main-line slow spine) uses only sleeper-toned ground markings and small plaques, with no advertising extension. All wayfinding elements are reversibly installed and match heritage-buffer material requirements [assumption:A-COUPLER-001].

**Public participation agreement (draft key points).** To make the mechanisms above executable, the operations team should publish a one-page "Coupling Public Participation Agreement (Draft)" before the pilot. Key points: representative recruitment runs in parallel via neighbourhood-committee notices, on-site QR codes in the park and an online form, with fixed terms and exit rules; minors participate only with guardian informed consent, and the youth co-governance forum has a designated adult liaison; a quarterly accessibility field test invites disabled users to walk the coupler plazas and counters, with results fed into the failure archive; public review comments receive written replies in three categories — adopted / partially adopted / not adopted with reasons — within 15 working days; appeals are taken at the staffed counter or by phone and forwarded to the auditor for re-check within 5 working days. All of these are process-design suggestions and impose no procedural obligation on any institution [assumption:A-COUPLER-001].

**Scenario admission C0—C7 gates.** Coupling issuance proceeds in seven steps: route-table registration → coupler-free ordinary baseline runs → coupler-bearing shadow run → limited coupling under named human duty → normal operation → independent audit passed → annual coupling credential issued. Every level requires the previous level's evidence loop; any failure returns to the previous level; no skips and no parallel endorsements [depth:phasing_implementation].

**C0—C7 admission criteria template & record specification (framework).** To make the gates auditable, each admission level should register five columns - criterion type, measurement method, pass threshold, review cadence, evidence retention; threshold VALUES are calibrated by the professional team once a licensed baseline exists, while this version fixes only the framework and measurement definitions [depth:phasing_implementation]. Examples: C2 shadow-run criterion = N disconnection drills all routed through the ordinary path (N and sampling window calibrated post-authorisation); C4 routine operation = 100 percent human-review coverage with traceable records; C6 independent audit = double-blind waybill re-check agreement rate meets target. Evidence retention: waybills, reviews and failure cards stored in the same JSON schema as the package; retention period and personal-data minimisation are set by the data-protection owner. Outage-recovery records use a unified field template: event ID / coupler node / trigger time / degradation path / recovery time / named confirmer / linked failure-card ID. Appeal escalation ladder: staffed counter or phone intake, auditor re-check within 5 working days, quarterly public panel reconsideration, public retrospective at the annual Uncoupling Festival.

**Pilot staffing and budget magnitude (conceptual estimate).** The minimum running staffing for two pilot couplers: 1 Confirmer per coupler (may double as Node Officer), 1 Main-Line Guardian, 1 part-time Auditor — about 5–7 full-time-equivalent posts in year one; the coupler-system sandbox (PRJ-01) minimum start condition is a route-table schema, one simulated coupling environment and one 12-week exercise, with budget magnitude estimated by reference to routine public consultation and digital projects. All figures are conceptual estimates; they are not investment, procurement or fiscal commitments [assumption:A-RESOURCES-001].

**Pilot startup responsibility–evidence–resource baseline (PRJ-01/PRJ-02 and the two first-run coupler nodes).** Provided so a professional team can pick it up directly; all entries are conceptual suggestions [assumption:A-COUPLER-001] [assumption:A-RESOURCES-001]:

| Work item | Lead role (candidate direction) | Key deliverable evidence | Resource scale (concept) | Completion criterion |
|---|---|---|---|---|
| Coupling waybill schema finalization | Confirmer (lead candidate: development & planning bureau) | Schema doc, 3 mock waybills, public-readable explainer | 1 part-time architect × 6 weeks | Passed public review session, archived |
| Baseline walkover survey (PRJ-02) | Main-line guardian (candidates: city management / parks) | Segment-by-segment access/rest/help-point ledger, gap photo library | 2 surveyors × 4 weeks + 1 reviewer | Gap list published for 30 days |
| Test coupler site & safety envelope | Node keeper (candidate: park operator) | Site plan, fencing & fire review, power connection plan | Reversible components only where possible | Safety sign-off + shadow-run permit |
| Staffed counter at open coupler | Node keeper + confirmer dual staffing | Duty roster, accessible-route check, complaint-response pledge | 2 people per opening day | Accessibility & consumer-rights review passed |
| Audit & failure archive | Auditor (candidate: third-party body) | Monthly coupling/uncoupling records, public failure archive page | 1 part-time auditor (ongoing) | First monthly report publicly downloadable |

All roles above are concretizations of the four named roles; their appointment mode and legal responsibility are determined by the professional team under current rules; no statutory duty is assigned to any department here.

**Pilot lead and authorisation path (conceptual suggestion).** It is suggested that initial pilots are coordinated by the relevant Haidian district government departments (e.g. development-reform, planning, urban management or park management) under their current duties as the candidate direction for the ultimate coupling-confirmation duty-holder; the four named roles get draft job descriptions and authorisation lists defining duties and accountability, and the way roles are filled (concurrent posts/purchased services/volunteers) is determined by professional teams under current institutions. All are deepening directions, not arrangements or authorisation commitments to any department [assumption:A-COUPLER-001] [assumption:A-VERB-001].

**Pilot start checklist (conceptual).** Entry conditions become checkable items: responsible subject confirmed, energy capacity verified, ecology and heritage assessed, safety plan filed, accessibility reviewed, ordinary baseline walked through, uncoupling drill passed once — any unchecked item stops issuance [assumption:A-COUPLER-001].

**Cost and scale boundaries.** Staffing, shifts, maintenance, insurance and budgets remain unknown until authorised [assumption:A-RESOURCES-001]; this package only promises an "independently pausable" package structure, not investment estimates or fiscal commitments [assumption:A-VERB-001].

Project maturity G0—G7 and scenario admission C0—C7 are two independent gates: one scenario passing does not endorse another; one project having budget cannot bypass "no coupler, no coupling". Annual operations have four rhythms: a weekly open-source interface clinic; a monthly uncoupling/degradation drill (12 per year belt-wide) [metric:fallback_drill_count]; a quarterly coupling report co-published by independent evaluators, maintainers and affected publics; and an annual "Uncoupling Festival" — bilingual display of coupling, buffering, uncoupling and repairs, making open retrospectives the belt's most durable brand event. The developer/enterprise conversion path is not "roadshow-to-investment" but "public problem — ordinary baseline — coupler-bearing gain — buffer drill — open assets — professional adoption" [source:CASE-UNHABITAT-PEOPLE] [assumption:A-EVENT-001].

## Indicator System, Area Recalculation and Compliance Matrix

Indicators sit in three layers.
- **Provisional-geometry diagnosis**: scope, green and public-space ratios have formulas but no statutory effect [metric:site_area_sqm] [metric:green_ratio] [metric:public_space_ratio]; concept building footprint is recalculated from geometry [metric:building_footprint_area_sqm] [metric:spine_length_m]; wing service corridors and key-area areas are in the corresponding metrics [metric:flank_road_length_m] [metric:key_area_total_sqm].
- **Coupler-mechanism completeness**: node, car and scenario-card counts are countable from in-package JSON [metric:coupler_node_count] [metric:scenario_card_count]; persona classes are in the persona chapter [metric:persona_count].
  - Ecosystem cases and landmarks are counted in the ecology and character chapters [metric:ai_ecosystem_case_count] [metric:landmark_count]; renewal projects and land-use units in the project-list chapter [metric:renewal_project_count] [metric:land_use_parcel_count].
  - Route-table coverage and industry-test scenarios are mechanism acceptance indicators [metric:industry_test_scenario_count] [metric:coupling_route_table_coverage_ratio]; annual drills and phasing are in the operations chapter [metric:fallback_drill_count] [metric:phasing_stage_count].
- **Field effects**: service success rate, recovery time and burden distribution are all null for now [metric:live_service_success_rate].

![Coupler-mechanism completeness and the evidence boundary of field unknowns](assets/figures/metrics-evidence.png)

Spatial indicators are recalculated in EPSG:4548 with sources, formulas, units and confidence recorded item by item, closed-loop with the spatial review script [depth:metrics_recalculation].

The compliance matrix covers 17 official announcement items (1.3/1.4/1.5) plus agent.1—agent.6, with the taskbook and announcement as the two controlling bases [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

The standard matrix covers 5 mandatory and 4 extended standards, registering urban-design and regulatory-plan scopes separately [standard:MOHURD-URBAN-DESIGN-MEASURES] [standard:MOHURD-CONTROL-DETAILED-PLANNING]; land-use classification and architectural design depth are also responded to item by item [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016]. The design-depth matrix covers 15 professional items [depth:existing_conditions_diagnosis] [depth:metrics_recalculation].

After official polygons arrive, full recalculation is required — not just editing title numbers [assumption:A-BOUNDARY-001]; field indicators stay null until a licensed baseline exists — no 0, no 100%, no estimates [assumption:A-METRICS-001].

## Risk, Copyright and Compliance

The worst failure is not wrong model output but **the interface system failing while AI services keep occupying public space without confirmation**. The following are therefore hard stops: no standard interface; no named human confirmation; no buffered human flow; personal sensitive data crossing boundaries; AI making final decisions without human review; public paths, accessible widths or fire lanes occupied by tests; equipment installed without physical removal capability; heritage, green, blue-line or traffic-safety constraints unreviewed [data:risk.json] [depth:risk_missing_data].

**Emergency response plans for three high-risk scenarios (conceptual).** Interface-system failure: switch immediately to manual uncoupling flows, suspend AI services at all couplers, take over with physical couplers and paper ledgers, audit and publish within 48 hours; AI-service boundary crossing: the Main-Line Guardian physically isolates, disconnects data writes, freezes output, archives per the failure-file process and uncouples; supplier exit or outage: power down and remove reversible plug-in rails, take over with open adapters and maintenance manuals, and delete or archive data per the route table. Independent auditors are suggested to be held by qualified third-party institutions in data, operations and planning, at least quarterly, plus extra audits after major failures [assumption:A-COUPLER-001].

**Self-risk assessment of the coupler mechanism (conceptual).** Four risks need defending: abuse of coupling-confirmation power (confirmations without clear refusal criteria harming fairness), forgery or impersonation of interface credentials, system outage paralyzing authorisation, and administrative-inefficiency bottlenecks. Principle-level defences include: confirmation decisions leave traces and accept audit review; credentials use verifiable, recallable designs; system outage auto-falls-back to manual flows; confirmation time limits and publication requirements are written into the institutional draft. The coupler system is explicitly an **auxiliary** to the existing urban public-safety emergency system, not a replacement: major public-safety events are handled by the current emergency system; the coupler mechanism only handles AI-service coupling and uncoupling [assumption:A-COUPLER-001] [assumption:A-AI-001].

Information and assets are used only within publicly reviewable boundaries [assumption:A-PRIVACY-001]; privacy, copyright, authorisation and implementation risks are reviewed by named humans; anything with insufficient evidence stays pending rather than being completed by model inference. All spatial proposals are conceptual suggestions, reference schemes or material for professional teams to deepen; they do not replace statutory planning and do not constitute government approval, project initiation, procurement, cooperation, investment attraction or implementation commitments [assumption:A-VERB-001].

Text, structured assets, five core figures, HTML, PDFs and interactive arrangements are original works for this submission; concept experience imagery and the cover are produced by a local rendering pipeline, re-cropped, re-toned and laid out after manual review for text, with model, date, prompt, use, conversion, rights and limitations recorded per asset [source:IMAGEGEN-CONCEPT-COUPLER]. Generated images are concept/presentation only — not evidence of current conditions, maps, figures, engineering or public opinion. Fonts, code, media, sources and third-party rights are registered in report/copyright_statement.md and visual/assets/rights-ledger.json.

The offline pages load no CDN, remote fonts, map tiles, APIs, iframes, forms or trackers; interactions are keyboard-operable, honour reduced motion and have static fallbacks; video never autoplays and provides poster, WebVTT captions and Markdown transcripts. The Chinese and English prose, core figures, HTML and PDFs are independently isomorphic and non-contradictory.

## References

1. Beijing Municipal Commission of Planning and Natural Resources, Haidian Branch, Pre-qualification Announcement of the International Solicitation for the Centennial Jing-Zhang AI Innovation Belt Urban Design, 2026-05-09.
2. National Museum of China, description of the instruments Zhan Tianyou used to survey the Jing-Zhang Railway, 2021-03-30.
3. Beijing Municipal Forestry and Parks Bureau, Jing-Zhang Railway Heritage Park (Phase I) fully completed and opened, 2023-06-26.
4. Beijing Municipal Commission of Planning and Natural Resources, public interpretation of the Jing-Zhang Railway Heritage Park plan, 2021-12-16.
5. Haidian District People's Government / Zhongguancun Science City, public information on the Beijing AI Origin Community, 2026-01-05.
6. Beijing Municipal Science & Technology Commission / Zhongguancun Administrative Committee, public information on the Beijing Embodied AI Industrial Park, 2025-02-28.
7. Beijing Municipal People's Government, public policy documents on AI agents, 2026-07-23.
8. Public popular-science entries on the automatic coupler and Jing-Zhang railway standardisation, accessed 2026-08-23.
9. JTC Corporation, Punggol Digital District public materials; NIST AI RMF Playbook; City of Amsterdam Responsible Sensing; UN-Habitat People-Centred Smart Cities; Seoul Oil Tank Culture Park — mechanism comparison only.
10. Repository site package: brief/site-package/, data/source_registry.json, brief/site-package/geometry/provisional_boundaries.geojson.

The machine index is sources.json and the three matrices; this package has not scraped or embedded source pages' images, map tiles, logos, videos, fonts or long excerpts — citations use factual summaries and mechanism comparisons only [source:SITE-PACKAGE] [source:SOURCE-REGISTRY].
