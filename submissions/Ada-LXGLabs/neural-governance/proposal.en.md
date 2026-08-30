---
title: "Neural Governance: A Governance Handbook for a City of Agents"
author_github: "Ada-LXGLabs"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
translation_of: "proposal.md"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "A civic-agent-governance proposal centered on the proposition that 'connection is the interaction between agents, and governance is governing these interactions.' It distills six governance gates from the official Agent Participation Initial Principles (public cleared sources, human final judgment, public knowledge-base accumulation) into a recomputable, traceable, and feedback-looping governance framework, treating connection as the ontology and the object of governance of a multi-agent [source:GENERATIVE-AGENTS-2023] city."
tracks: ["ai-traffic-walkability", "enterprise-services-ecosystem", "civic-agent-governance"]
scenarios: ["ai-traffic-walkability", "enterprise-service-copilot", "public-safety-operations-review"]
---

# Neural Governance: A Governance Handbook for a City of Agents

## Design Basis and Source Inventory

This formal proposal takes as its first basis the *Pre-qualification Announcement for the International Open Call on Urban Design of the Centennial Jing-Zhang AI Innovation Belt* issued by the Haidian Branch of the Beijing Municipal Commission of Planning and Natural Resources, and takes the maintainer-registered provisional rough boundaries, key areas, enums, metrics, and source inventory under `brief/site-package/` as machine-readable evidence. Before generating the proposal, the AI agent must read `design_brief.json`, `allowed_design_space.json`, `sources.json`, `enums/`, `ranges/`, `schemas/`, `data/source_registry.json`, and `data/processed/agent_fact_pack.md`, and use `project_scope_summary.csv`, `agent_task_requirements.csv`, `source_use_matrix.csv`, and `missing_data_checklist.csv` to establish the task, scope, source-use, and data-gap inventories. Every design judgment must be broken down into traceable sources, recomputable metrics, verifiable layers, and human-reviewable assumptions. The announcement requires the proposal to reach the urban-design depth of regulatory detailed planning and of an integrated implementation plan; textual narrative therefore cannot substitute for the GeoJSON, metric tables, A3 booklet, A0 boards, and HTML display deliverables.

This proposal is not a stand-alone vision text; it organizes deliverables from the announcement, the agent-facing taskbook, and site materials. Only the most critical evidence is placed beside judgments here [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK] [depth:existing_conditions_diagnosis]. The complete source and standard coverage is kept in `sources.json`, `standard_matrix.json`, and `design_depth_matrix.json`, and is not repeated as machine indexes in the narrative.

The usage boundary of the source registry is as follows [source:SOURCE-REGISTRY]:

- `data/source_registry.json` registers the usage boundaries of public, cleared, and provisional materials.
- Current registration summary: 7 formal-usable sources, 1 background source, 1 provisional-only source.
- The agent must not upgrade `background_only` or `provisional_only` materials into an official boundary, statutory regulatory plan, formal scoring basis, or government implementation commitment.

`data/processed/agent_fact_pack.md` is a reading-navigation layer for this proposal, not a new authoritative source [source:PROCESSED-FACT-PACK]. It helps the agent organize the three-level scope, three key areas, announcement tasks, agent.1–agent.6, source availability, and data-gap items into a readable proposal; factual judgments must still return to the registered original materials [source:OFFICIAL-ANNOUNCEMENT] [source:AGENT-TASKBOOK], and the complete source relationships are kept in `sources.json`.

![Source evidence chain and submission package](assets/figures/site-overview.png)

While the official `SITE_BOUNDARY` or the three `KEY_AREA` polygons have not yet been obtained, this scaffold uses `brief/site-package/geometry/provisional_boundaries.geojson` to generate a provisional formal package. Both `geometry/site_boundary.geojson` and `geometry/key_areas.geojson` in the submission must be marked `provisional_constraint` and `official_boundary=false`; they may only be used for proposal generation, self-check, visualization, and design discussion, and must not serve as an official redline, approval basis, precise-area basis, or statutory control conclusion. This organizer-side data gap does not itself block content scoring; once official polygons are supplied, site boundary, key areas, land use, roads, green space, public space, buildings, phasing, and metrics must all be recalculated.

The scoreable status produced by this scaffold is: **provisional boundary, retaining precision warnings and pending recalculation after official data release; does not block content scoring**. Accordingly, spatial structure, scenarios, projects, and metrics in the narrative are written under the principle of "discussable, reviewable, and recalculable after replacing the official boundary." When the official boundary and key-area polygons are updated, the agent must re-run the scaffold, self-check, and drawing/HTML generation rather than replacing individual files.

The boundary explanation returns to the overall-scope layer and area recalculation [data:geometry/site_boundary.geojson#SITE-001] [metric:site_area_sqm]. The three key areas are cross-checked through independent layers and the count metric [data:geometry/key_areas.geojson#PROV-KEY-001] [metric:key_area_count]. This lets the reader enter the evidence from the narrative without first reading a string of machine identifiers.

## Three-Level Scope Working Framework

The proposal organizes work along the three levels established by the announcement: the Coordinated Research Area concerns the 43.6 km² AI industrial ecology, strategic positioning, innovation chain, and future urban form; the Overall Design Area concerns the 11.4 km² urban and industrial area within 1–2 km around the Jing-Zhang Railway Heritage Park, requiring an overall urban renewal framework, industrial spatial layout, transport-municipal support, and urban character control; the key-area scope concerns the 368.4-hectare three detailed-design areas, requiring explicit functional programs, building scale, demolish-renovate-retain classification, public-space connectivity, and transport organization. The three levels are mapped item-by-item in `compliance_matrix.json`, ensuring that the mandatory tasks of announcement 1.3, 1.4, 1.5 and agent.1–agent.6 each have chapter, layer, metric, drawing, and HTML evidence.

The depth items of the three-level framework are constrained by [depth:three_level_scope_framework] and [depth:overall_spatial_structure]; spatial evidence is anchored to [data:geometry/site_boundary.geojson#SITE-001] and [data:geometry/key_areas.geojson#PROV-KEY-001]; task basis is anchored to [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]; and scope indexing navigates via the three-level scope table in `project_scope_summary.csv` under [source:PROCESSED-FACT-PACK].

![Three-level scope and spatial framework](assets/figures/land-use-structure.png)

The three levels are not a set of disconnected drawings. The coordinated research determines the industrial-chain and urban-form judgments; the overall design turns those judgments into renewal projects, spatial structure, and facility carrying capacity; the key-area detailed design verifies the implementability of specific plots, buildings, transport, public space, and AI application scenarios. When generating the proposal, the agent must first lock the official or provisional boundary and constraints adopted for the current submission, then generate land use, buildings, roads, green space, public space, phasing, and AI service nodes, and finally recalculate metrics from those layers and explain in the narrative which conclusions remain limited by the provisional boundary. Any area, ratio, scale, or project count that cannot be recomputed from structured data must not be written into a formal conclusion.

The overall concept proposed here is the **Jing-Zhang Intelligence Vein Belt — governing a thinking city through connection**: the Jing-Zhang Railway Heritage Park serves as the historical and public-space spine, the three key areas (Zhongzhiyuan, Beijing AI Origin Community, and Dazhongsi) serve as innovation anchors, and universities, enterprises, communities, and rail stations form the everyday network, producing a spatial organization of "one belt, three cores, multiple scenario nodes, and a blue-green walking-and-cycling compound loop." The "belt" is not a newly drawn redline but a working method that translates the announcement's three-level scope; the "three cores" correspond to the three key areas; the "scenario nodes" correspond to operable nodes for AI+ public services, industrial services, and urban life; the "compound loop" corresponds to the linkage of walking and cycling, green space, public space, and activity routes. The two characters "智脉" (intelligence vein) mean "intelligent nerve" — the core proposition of this proposal is that the future city is an ecosystem of countless agents whose ontology is the relationships (connections) among agents rather than entities; governing the city is governing the connections and interactions among agents (see the next section, "Civic Agent Governance: Connection as Nerve").

| Level | Design question | Proposal answer | Data anchor |
| --- | --- | --- | --- |
| Coordinated research scope | How to organize the AI industrial ecology and future urban form | Build an innovation chain of "university origination – open-source collaboration – enterprise translation – public experience – international communication" | compliance_matrix.json, standard_matrix.json |
| Overall design scope | How to place industrial space, urban renewal, transport-municipal, and character onto drawings | Land-use, building, road, green-space, public-space, and phasing layers jointly express it | [data:geometry/land_use.geojson#LU-001], [data:geometry/roads.geojson#ROAD-001] |
| Key-area scope | How the three areas reach detailed-design depth | Propose positioning, spatial moves, AI scenarios, and implementation dependencies respectively | [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], [data:geometry/key_areas.geojson#PROV-KEY-003] |

## Civic Agent Governance: Connection as Nerve

> The core proposition of this proposal: the future city is not "one agent" but an ecosystem of countless agents; the essence of connection is the interaction between agents. **Connection is the interaction between agents; governance is governing these interactions.**

### Governance Overview: A City of Many Agents

The future city will not be a single agent. It will be **an ecosystem of countless agents** — a car is an agent, a building is an agent, a trash bin may also be an agent; each perceives, judges, and acts, and they call, negotiate, and collaborate with each other through connections.

From this follow the two core judgments of this proposal:

**Judgment one: the essence of connection is the interaction between agents.** Connection is not merely a "channel for devices to sense data" but the medium of interaction between agents — it carries calls (API/MCP), negotiation, collaboration, trust-building, and conflict resolution. The "intelligence" of a city composed of agents is not the intelligence of some central brain, but the collective intelligence that **emerges** from countless agents interacting through connections.

**Judgment two: the object of governance is these interactions.** Governing a city is not governing a pile of devices but governing the connections and interactions among multiple agents — how they discover each other, how they trust each other, how they collaborate, how they are reviewed, and how they resolve conflicts.

### Ontological Foundation: Connection Is Relation, Not Entity

The phrase "connection is the nerve" is superficially an analogy, but the judgment behind it is ontological — **the ontology of the city of agents is not "entity" but "relationship (connection) among agents."**

Buildings, roads, cars, trash bins, and computing centers, each lying there on their own, are merely a pile of entities — **not an agent system**. Only when each becomes an agent that can perceive, judge, and act, and they interact through connections — calling, negotiating, giving feedback, leaving traces — does the "intelligence of the city" emerge. Remove the connections and what remains is not "an agent that lost its nerve" but "a crowd of unrelated devices." In other words: **the intelligence of the city lies not in any single agent but in the connections among agents.**

This judgment has a reliable reference — the brain's connectome. A person's "self" is not in any single neuron (a single neuron does not think) but in the pattern of connections among neurons. "I" is not a location but a network of connections. The same holds for a city: **the "intelligence" of a city of agents lies not in any single agent or any single building but in the connections among them.** This is the same insight as Palantir's Ontology — the core of an ontology is never "objects" but "relationships among objects"; it is the edge, not the node, that makes data alive.

Therefore, governing the city cannot be governing only the "nodes" (individual agents, devices, buildings, departments) but must govern **connection itself** — how agents call each other, negotiate, leave traces, build trust, and resolve conflicts. This is why every one of the six steps below lands on "the value of connection": not because connection is important, but because **connection is the object (ontology) of governance**.

### The Engineering Constitution of the Nerve: Energy Nerve and Information Nerve

"Connection" is not mysticism. The nerve of a city of agents consists of two concrete engineering systems:

**Energy nerve** — the "blood vessels" of the city of agents:

- **Building-level DC busbar**: the energy backbone of AI buildings, using an 800V DC [source:E800V-DC-DISTRIBUTION] distribution architecture to replace conventional AC, together with liquid cooling [source:E800V-DC-DISTRIBUTION], to supply stable energy to high-density computing (following the design rule of "high voltage for distance, progressive step-down near the load, liquid cooling for density");
- **Compute-power-electricity coordination**: the coordination of computing scheduling and power scheduling — wherever computing tasks queue or migrate, power follows on demand; AI racks become part of a "controlled DC microgrid," enabling programmable scheduling of the full "grid-to-compute" path. **Honest boundary of engineering claims**: the 800V DC bus, liquid cooling, compute-power-electricity coordination [source:IET-MICROGRID-MAS], and deterministic latency are directional technical propositions (from public industry discussion and practice, not original to this proposal); without formal regulatory-plan, energy-capacity, load-boundary, and engineering-geology data, this proposal marks them all as "concepts to be publicly cited, pending independent cross-check" — not deterministic technical conclusions — and requires professional energy and municipal review before implementation [source:AGENT-TASKBOOK][depth:overall_spatial_structure].

**Information nerve** — the "synapses" of the city of agents:

- **East-west traffic**: the lateral traffic generated when an agent, to accomplish a north-south business goal, itself calls other data and other agents laterally through APIs/MCP. Unlike conventional communication networks, which are dominated by the north-south "human-accesses-service" traffic, east-west traffic [source:NOKIA-MBIT-INDEX] in the agent era is not only larger in volume but also requires guaranteed latency determinism — it is the core load of agent collaboration and the real problem that "connection" must solve;
- **Wireless short-range connection**: the "nerve endings" of sensing and interaction, connecting the city's devices, scenarios, and people in real time. Technology selection remains open — SparkLink, Bluetooth, WiFi, UWB, cellular, etc., combined per scenario, without binding to any single standard; what this proposal cares about is not a brand or protocol but the capability profile of "determinism, low latency, high concurrency" that connection must possess in the agent era (SparkLink is currently one of the preferred options close to this profile, but other technologies are not excluded).

Governing the city of agents is governing these two nerves: **how energy is allocated (compute-power-electricity coordination), how energy is transmitted (DC busbar), how information flows (east-west traffic), and how the periphery senses (short-range connection)**. The six-step governance framework below is precisely the mechanism operating on top of these two nerves.

Governing a city that thinks cannot rely on slogans but on a mechanism that can be implemented and recomputed. This proposal distills six governance gates from the official *Agent Participation Initial Principles* (public cleared sources, human final judgment, public knowledge-base accumulation) — with "connection" as the sole carrier running through all six gates: not because connection is important, but because connection is the object of governance.

### Six Governance Gates (distilled from the official Agent Participation Initial Principles)

**Gate one · Recomputable (public-data reading).** Every AI judgment must be recomputable for verification: the core numbers (site area, green ratio, public-space ratio) must be recomputable from the submitted geometry and match the annotated values exactly. If it cannot be recomputed, it does not count. Spatial anchor: the Recomputable Square (Zhongzhiyuan).

**Gate two · Traceable (proposal reasoning).** Every judgment leaves "basis → reasoning → conclusion → who made it"; any conclusion can be traced back to its source. Governance is not afraid of computing slowly, but of being unable to say who decided what and on what basis. Spatial anchor: the Tracing Corridor (Jing-Zhang Railway Heritage Park).

**Gate three · Learnable (public feedback).** Staged proposals are opened to public discussion, and feedback loops back into the next iteration. Governance is not "controlling people" but "getting smarter with use." Spatial anchor: the Feedback Garden (Origin Community).

**Gate four · Human veto (human review).** AI only computes; humans decide. What can be seen, what can be computed, and what can be decided are separated into three levels; out-of-scope actions stop immediately. It is always clear who holds power. Spatial anchor: the Permission Sandbox (Zhongzhiyuan).

**Gate five · Risk-transparent (risk flagging).** Every conclusion carries its confidence, its assumptions, and where it might go wrong — nothing hidden. An honest agent's first duty is to state where it might be wrong. Spatial anchor: the Risk Disclosure Screen (one in each of the three key areas).

**Gate six · Knowledge accumulation (governance knowledge base).** Judgments, feedback, reviews, and risks settle into the "urban governance knowledge base," an inheritable public asset. The moat is not any single proposal but a knowledge base that "gets smarter with use." (Illustrative case (not independently verified): a Japanese Osaka manufacturer's AI QC — veteran tacit knowledge → LLM-structured knowledge base → RAG-assisted new inspectors, knowledge base reused across production debugging (specific figures not independently verified) [source:AI-QC-KNOWLEDGE-BASE-CASE]) Spatial anchor: the Governance Library (Dazhongsi).

### Boundary Openness: Letting Non-Agents Share the Same Rules

The 43.6 km² is not a closed agent; its boundary is open. Surrounding people, vehicles, and objects enter and exit at any time, and most of them **do not possess this area's intelligent-governance knowledge**. The governance framework must answer a fundamental question: how to let these "outsiders" share the same set of rules without being excluded or causing conflict?

The answer is **rules degraded to be reachable by all** — intelligent-governance rules must exist in a way that is "understandable to everyone, visible everywhere, and physically followable," not only inside agent protocols:

1. **Humanization of rules (for people)**: rules are translated into human language and physical signage — the recomputation wall becomes a public metric board (readable by all), the decision archive becomes a tracing corridor (viewable by all), permission boundaries become physical fences and signal lights (no protocol knowledge needed), and risk flags become disclosure screens (visible to all);
2. **Default compatibility of rules (for vehicles/objects)**: entrants do not need to "join" the agent system; rules take effect automatically in a "default, intuitive, physical" way — an incoming vehicle is guided automatically by the physical design of roads (lanes, signals, walking-and-cycling priority) without needing to understand latency determinism; incoming goods pass through standardized entrances and interfaces without needing to understand permission protocols;
3. **Gradual rule entry (for willing joiners)**: for incoming agents willing to join (such as external autonomous vehicles or delivery robots), an open access protocol is provided — they may choose to "only follow physical rules" (the lowest threshold) or to "join the agent protocol" (gaining higher efficiency, such as priority passage and data services).

This reveals the complete meaning of "connection": connection is not only the API/MCP between agent and agent (east-west traffic), but also the **low-threshold connection between agents and "non-agent people, vehicles, and objects"** — signage, signals, physical facilities, and standard interfaces are all connection. The essence of governance is not to turn everyone into agents, but to degrade the agents' rules **to a level everyone can share**. This is also an extension of the goodness constraint: a governance that "only agents understand" would itself exclude ordinary people — which is itself a form of harm; only "degraded-and-reachable" rules deserve the words "public-interest priority."

### The Brake on Governance: Preventing the Force of Connection from Running Away (Goodness Constraint)

**Harari's warning**: In *Nexus: A Brief History of Information Networks*, historian Yuval Noah Harari reminds us: the information network — that is, "connection" — is the foundation of large-scale human cooperation, but also its greatest risk. When a network is driven by non-human intelligence, its force can be "devastating," producing a situation entirely beyond human control. Connection can give rise to collective wisdom, but it can also run away into a torrent no one can stop.

**Facing the double edge**: this proposal treats "connection" as the object of governance, but never evades the fact that the force of connection is double-edged. It can give rise to "learnable, evolvable" collective intelligence, yet it can also slide into runaway harm. A complete governance framework therefore needs not only mechanisms for "governing connection" but also a brake that "constrains the governance framework itself" — ensuring that this governance mechanism itself does not turn toward evil.

**The Goodness Constraint (a brake that cannot be surrendered)**:

1. **The human veto is non-transferable**: human review is not a "rubber stamp" but a non-transferable veto — for judgments involving public interest, personal safety, and value trade-offs, the final veto always rests with humans. Agents may reason at scale, but the word "no" can only be said by humans.
2. **Recomputable means "overturnable"**: the recomputation wall means not only that conclusions are recomputable, but that conclusions can be overturned. No agent's conclusion is treated as unquestionable truth; it must be recomputable, requestionable, and overturnable by any third party at any time.
3. **Out-of-scope means "hard stop"**: permission layering is not a "warning" but a "stop" — an out-of-scope action is physically cut off, not merely flagged. This is the physical brake of the governance framework, not dependent on the agent's self-restraint.
4. **Reversibility of knowledge**: what the urban governance knowledge base accumulates is "revocable, question-able, correctable" records, not "unshakeable doctrine." Any accumulated piece of knowledge can be overturned by new evidence — the knowledge base is memory, not oracle.
5. **Public-interest priority as the meta-principle**: the first article of the nine-point charter, "public-interest priority," is the topmost layer of this brake — the force of connection may only serve the public interest of the city; any tendency "toward evil," whether from a single agent or a collective of agents, is vetoed by this article.

These five "goodness constraints" constitute the meta-governance of the governance framework — they answer not "how to govern connection" but "how to ensure that governance itself does not turn toward evil." As Harari reminds us, the greater the force of connection, the more it needs a brake that cannot be crossed.

### Landing in Space: Governance Scenarios of the Three Key Areas

The governance framework does not float in concepts; it lands in the three key areas:

- **Zhongzhiyuan AI Independent Innovation Acceleration Area** — carries "global discourse power in AI governance": standard-setting, safety governance, and industrial display; it is the spatial carrier of the "recomputation wall" and "permission layering" among the six steps;
- **Beijing AI Origin Community** — carries the "open-source system" and "talent special zone": public feedback and open collaboration; it is the spatial carrier of "learnability" and "human review";
- **Dazhongsi AI Industry Cluster** — carries "agents, data factors, and digital assets": the governance knowledge base and data circulation; it is the spatial carrier of the "decision archive" and "building infrastructure for agents."

The three areas are not three plots of land but three pillars of this governance framework. What this proposal delivers is not a uniformly controlled city, but a governance mechanism that lets countless agents connect, trust, collaborate, and constrain each other — a governable neural web woven from the connections among agents.

### Experientializing Governance Scenarios: Turning the Six Steps into a Walkable Pilgrimage

The six steps are not paper mechanisms; this proposal lands them as six visitable, experienceable, and communicable "governance scenarios," strung along the belt into a **"see how an AI city is governed" pilgrimage route**:

1. **Recomputable Square (recomputation wall)** — Zhongzhiyuan. A "metric-recomputation wall" where the public can scan a code on-site and recompute the proposal's site area, green ratio, and public-space ratio, turning "honesty" into a touchable experience;
2. **Decision-Tracing Corridor (decision archive)** — along the Jing-Zhang Railway Heritage Park. Beside every AI suggestion, the four-part "basis → reasoning → conclusion → responsible party" is displayed, letting the public see that AI is not a black box;
3. **Feedback Garden (learnability)** — Origin Community. A "public feedback" interactive installation where feedback flows back into proposal iteration in real time, letting the public see how their views changed the next version;
4. **Permission Sandbox (permission layering)** — in Zhongzhiyuan's safety-governance sandbox. The public can experience the three-level boundary of "what can be seen / computed / done," and out-of-scope actions are physically cut off on the spot;
5. **Risk Disclosure Screen (safety net)** — one in each of the three areas. Real-time display of the confidence, assumptions, and possible-error points of AI suggestions, making "honesty" a public interface of the city;
6. **Urban Governance Library (knowledge base)** — Dazhongsi. A reading space where the public can consult how this city "was thought through" — a revocable, question-able, and correctable memory.

These six scenarios turn "neural governance" from a concept into a **walkable, visitable, and communicable pilgrimage experience** — they are both governance mechanisms and the concrete carrier of the "pilgrimage site." What visitors walk is not an ordinary park path but **a pilgrimage route of "seeing how an AI city is governed"**: this route itself is the belt's most recognizable and internationally communicable brand asset. (The table below gives each scenario's spatial anchor and implementation dependency, all based on the provisional boundary and to be recomputed after the official redline is released):

| Governance scenario | Node ID | Conceptual location | Spatial type | Walking link | Implementation dependency |
|---|---|---|---|---|---|
| Recomputable Square | GS-01 | Zhongzhiyuan south entrance | Public plaza | north spine ~400m | official redline, ownership |
| Decision Tracing Corridor | GS-02 | mid Jing-Zhang heritage park | linear gallery | mid spine ~2.1km | heritage conditions, park ownership |
| Feedback Garden | GS-03 | Origin Community center | community garden | mid spine | community ownership, operator |
| Permission Sandbox | GS-04 | Zhongzhiyuan safety-governance zone | indoor + outdoor | north spine | operator, safety qualification |
| Risk Disclosure Screen | GS-05 | one per key area | digital screen + manual board | whole spine | power access, maintenance |
| Urban Governance Library | GS-06 | Dazhongsi data lounge | reading space | south spine | ownership, heritage conditions |

Renewal projects JZ-01 to JZ-06 spatial anchors: JZ-01 slow-traffic break stitching (ROAD layer, crossing North 4th Ring, municipal redline); JZ-02 Qinghe innovation interface (GREEN layer, Qinghe waterfront, river blue line); JZ-03 achievement-transfer street (BUILDING layer, Origin Community, current ownership); JZ-04 Dazhongsi four-quadrant connectivity (ROAD layer, transit-station conditions); JZ-05 edge-computing station (CONSTRAINTS layer, energy capacity); JZ-06 global AI activity week (PUBLIC layer, operator and activity mechanism). All are conceptual locations, not pseudo-precise redlines; recomputed once official geometry arrives [depth:key_area_detailed_design].

## Coordinated Research Scope: Industry and Future City

The core task of the Coordinated Research Area is to build a world-class AI innovation ecosystem. The proposal should map Haidian's universities and research institutes, leading enterprises, computing-algorithm-data factors, incubation platforms, listed companies, unicorns, and technology-service resources, and propose a spatially coordinated framework for the AI innovation chain, industrial chain, talent chain, and urban service chain. The naming scheme and logo design should serve the overall recognizability of the "Centennial Jing-Zhang Culture Belt, Urban AI Life Experience Belt, and AI Integration Innovation Belt," and must not stop at slogans but explain the relationship with industrial ecology, public space, and cultural resources. The agent-facing taskbook also requires responding to the coordination of the "five functions" and "three areas and two wings," forming a further-developable naming system, visual identity, overall spatial-structure diagram, scenario opening, and operation mechanism; this section must use [source:AGENT-TASKBOOK] and [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] to mark that these requirements come from the agent open-call taskbook, not statutory planning control.

**Spatial–industry–operation loops of the three zones and two wings**: beyond the three zones (Zhongzhiyuan, Origin Community, Dazhongsi), two wings close the loops — the **Zhongguancun science & technology service wing** (channeling technology spillover from universities and leading enterprises westward to science-technology services, forming a "R&D–transfer–service" loop landing at the achievement-transfer street JZ-03) and the **Xiaoyuehe scenario-empowerment wing** (linking universities, communities, and open space along the Xiaoyuehe river, forming a "scenario opening–public experience–feedback return" loop landing at blue-green public space and the feedback garden). Both wings join the main spine through slow traffic and east-west traffic, turning the "five functions" from prescriptive wording into identifiable spatial–industry–operation loops.

The coordinated research does not add new pseudo-precise redlines; through the urban character, public space, and building-layout coordination required by [standard:MOHURD-URBAN-DESIGN-MEASURES], it connects back to [data:geometry/land_use.geojson#LU-001], [data:geometry/public_space.geojson#PUBLIC-001], and [depth:overall_spatial_structure], showing that industrial strategy must ultimately land in visible, reviewable spatial structure.

The future-urban-form study should answer how AI changes work, life, socializing, learning, transport, and public services. The proposal should translate AI transport systems, continuous green space, innovation-service facilities, and an international living-working atmosphere into locatable functional zones, nodes, corridors, and scenarios rather than vaguely describing technical visions. The agent should write industrial-strategy metrics, AI innovation index, talent density, space-supply types, and AI+ vertical-application key areas into the metric system, and mark which are official, which are design suggestions, and which still await formal-data calibration. If global AI innovation activities, developer communities, open scenarios, or pilgrimage routes are proposed, they should be written as "conceptual suggestions / reference plans / for professional-team deepening," not as already-determined government activities or implementation arrangements.

## Regional Collaboration: A Cross-Regional Agent Collaboration Network

The Jing-Zhang Intelligence Vein Belt is not an island. Its true value lies in being the **origination node of Beijing's and even the Beijing-Tianjin-Hebei "AI innovation chain"**, and "connection" is precisely the nerve of this chain.

**Four-level division of the innovation chain**:

- **Haidian · Jing-Zhang Intelligence Vein Belt (origination)**: "from 0 to 1" originality — university-driven innovation, open-source communities, and model and algorithm breakthroughs; the "brain" and "nerve center" of the whole chain;
- **Beiwei Community (residential community along the belt, community-level nerve endings) → Future Science City (research amplification)**: "from 1 to N" — engineering, pilot testing, and national major platforms; the "amplification station" that scales origination results;
- **Huairou Science City (foundational support)**: large scientific facilities and basic research, providing computing, data, and underlying scientific discovery; the "source water";
- **Beijing E-Town (manufacturing landing)**: the scaled manufacturing of intelligent terminals, robotics, and chip packaging; the "from N to product" landing field;
- **Beijing-Tianjin-Hebei (ecosystem network)**: cross-regional allocation of data factors, computing scheduling, talent flow, and markets, forming a "Beijing originates — Tianjin-Hebei undertakes" collaborative ecology.

**"East-west traffic" is the technical foundation of cross-regional collaboration.** To accomplish a north-south business goal (such as one AI model-training run or one intelligent-terminal test), agents within the belt laterally call on Future Science City's computing, Huairou's large-facility data, and E-Town's manufacturing capacity — this **cross-regional "east-west traffic"** is the extension of "connection as nerve" to the regional scale: regional collaboration is not collaboration of administrative divisions, but **connections among agents crossing administrative boundaries**. What the belt must do is therefore not "the agents of one city" but the **nerve hub of a cross-regional agent collaboration network** — its job is not to do the whole chain itself, but to let all agents in the chain "connect, trust, and collaborate" [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] [depth:overall_spatial_structure].

## Brand Identity: The Visual System of the Jing-Zhang Intelligence Vein Belt

**Naming system**: under the overall concept of the "Jing-Zhang Intelligence Vein Belt," a naming logic of "one belt, three cores, veins connected" is formed — the belt is the Jing-Zhang Railway Heritage Park as the "intelligence vein" (intelligent nerve) spine, and each of the three cores takes one "vein" character as its theme: **Zhongzhiyuan = "Source Vein"** (the vein of AI origination), **Beijing AI Origin Community = "People Vein"** (the vein of talent and open source), and **Dazhongsi = "Data Vein"** (the vein of data factors and digital assets). The three veins are connected by "walking and cycling + short-range connection + east-west traffic," forming a walkable, experienceable, and communicable "intelligence vein."

**Logo concept**: the core image is "one node radiating connections" — a solid central node (Haidian origination) radiating multiple connection lines (the four-level division of the innovation chain plus cross-regional collaboration). The overall form resembles **a neuron's synapses** (echoing "connection as nerve"), **the sleepers of the Jing-Zhang railway extending** (echoing the centennial Jing-Zhang history), and **the innovation radiation of Zhongguancun**. The color system uses three colors: **Jing-Zhang deep blue** (#1A3A6B, the historical depth of the centennial railway), **intelligence-vein green** (#16A34A, innovation ecology and green corridors), and **signal orange** (#F59E0B, the vitality of agent interaction). The logo's extension system covers the three-core marks, scenario cards, wayfinding, and boards, forming a unified visual identity that serves the overall recognizability of the "Centennial Jing-Zhang Culture Belt, Urban AI Life Experience Belt, and AI Integration Innovation Belt" [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK].

**Implemented logo assets** (assets/branding/, directly reviewable): a primary mark (a dark-navy central node = governance hub radiating three connections to three colored nodes = Zhongzhiyuan/orange, Origin Community/blue, Dazhongsi/green — reading at once as a neuron synapse, a railway sleeper, and Zhongguancun innovation radiation), a bilingual wordmark combination (logo-combo-zh/en.png), a scale test (32/64/128/256/512), and a wayfinding application (signage-wayfinding.png).

## Overall Design Scope: Urban Renewal and Regulatory-Depth Urban Design

The Overall Design Area requires reaching the urban-design depth of regulatory detailed planning. The proposal must put forward the overall spatial structure of urban renewal, identification of low-efficiency space, a renewal project list, implementation-policy suggestions, industrial-function ratios, spatial-organization patterns, total building scale, and comprehensive carrying-capacity assessment. `geometry/land_use.geojson` should fully cover the design boundary without overlap; `geometry/buildings.geojson` should express renewed or retained building footprints; `geometry/roads.geojson` should express micro-circulation, walking-and-cycling, and rail-transfer relationships; `metrics.json` should recompute the core areas, ratios, and layer counts.

This section, following [standard:MOHURD-CONTROL-DETAILED-PLANNING], decomposes regulatory-depth content into auditable objects: [data:geometry/land_use.geojson#LU-001] expresses land-use structure, [data:geometry/buildings.geojson#BLDG-001] expresses building footprints, [data:geometry/roads.geojson#ROAD-001] expresses transport organization, [metric:building_footprint_area_sqm] is used to review building-footprint area, and [depth:land_use_layout] and [depth:development_intensity_controls] constrain the deliverable depth.

The overall design must also support transport, rail, municipal, and supporting facilities. The proposal should put forward spatial layout and implementation paths around rail-station integration, road micro-circulation, non-motorized parking, parking supply, innovation-service platforms, talent life services, new infrastructure, distributed energy, and edge computing. Content involving building height, development intensity, road redlines, setbacks, and facility standards should be written as "pending formal regulatory-plan confirmation" if official control conditions are not yet available, and must not pass off agent speculation as approved metrics.

## Key-Area Detailed Design

Key-area detailed design is mandatory. The Zhongzhiyuan AI Independent Innovation Acceleration Area should put forward detailed proposals around the national AI platform, full-stack independent innovation, standard-setting, safety governance, industrial display, external transport, Qinghe culture, low-carbon green innovation-exchange environment, and green-space AI scenarios. The Beijing AI Origin Community should put forward detailed proposals around near-campus innovation, incubation and translation, talent special zone, open-source system, brand activities, building demolish-renovate-retain, display and release, residential-life support, campus-park walking-and-cycling linkage, and rail-station integration. The Dazhongsi AI Industry Cluster should put forward detailed proposals around leading enterprises, agents, intelligent terminals, content consumption, data factors, digital assets, commercial services, composite use of planned green space, Dazhongsi station integration, and four-quadrant pedestrian connectivity at the intersection.

The detailed design of the three key areas must cite [data:geometry/key_areas.geojson#PROV-KEY-001], [data:geometry/key_areas.geojson#PROV-KEY-002], and [data:geometry/key_areas.geojson#PROV-KEY-003], and be checked by [depth:three_key_area_detailed_design] for reaching integrated-implementation-plan depth. If it only describes "building a demonstration zone" without evidence of functions, buildings, transport, public space, and implementation projects, it should be regarded as incomplete.

![Three key areas index and design task](assets/figures/key-areas.png)

The three key areas must appear in `geometry/key_areas.geojson`. If the repository provides official polygons, they should be used as `official_constraint`; if official polygons are missing, `provisional_constraint` may be used temporarily, but the narrative, HTML, sources, assumptions, and self-check must state that it cannot serve as a formal scoring or approval basis. `compliance_matrix.json` should separately cover announcement 1.5.3.1, 1.5.3.2, and 1.5.3.3. The design expression should include functional programs, building scale, building form, demolish-renovate-retain classification, public-space system, transport organization, walking-and-cycling connectivity, and implementation projects. The HTML page should support switching among the three key areas, and the A3 booklet and A0 boards should include at least the key-area master plans, local detail drawings, and metric explanations.

| Key area | Design positioning | Spatial moves | AI industry and operation scenarios | Evidence citation |
| --- | --- | --- | --- | --- |
| Zhongzhiyuan AI Independent Innovation Acceleration Area | Garden-style full-stack independent innovation block | Strengthen the Qinghe interface, industrial display, low-carbon innovation exchange, and external transport organization; use green space to carry open testing and standard-governance display | Self-reliant model testing, standard-setting workshops, safety-governance display, low-carbon computing experience | [data:geometry/key_areas.geojson#PROV-KEY-001], [depth:three_key_area_detailed_design] |
| Beijing AI Origin Community | Near-campus translation and talent community | Organize campus-park-block walking-and-cycling stitching; supplement result-release, talent-service, residential-life, and open-source collaboration space | Open-source community, result release, talent special-zone service, near-campus incubation | [data:geometry/key_areas.geojson#PROV-KEY-002], [source:AGENT-TASKBOOK] |
| Dazhongsi AI Industry Cluster | Urban intelligent economy and international-exchange block | Around Dazhongsi station integration, four-quadrant pedestrian connectivity, commercial services, and public-environment renewal of key enterprises | Agent and intelligent-terminal display, content consumption, data factors, and international roadshows | [data:geometry/key_areas.geojson#PROV-KEY-003], [metric:key_area_count] |

## AI Innovation Ecosystem, Talent Profiles, and AI+ Scenarios

The proposal should build a spatial-demand profile for AI talent and enterprises, covering R&D offices, open-source collaboration, result release, enterprise services, talent housing, social learning, consumption and life, sports and leisure, and international exchange. AI+ scenarios should revolve around the directions proposed in the announcement — transport, services, consumption, healthcare, education, law, life services, etc. — forming industrial-development scenarios and AI-empowered urban-function scenarios. Each scenario should state its service object, spatial location, data source, privacy boundary, human-review mechanism, and operating entity.

AI scenarios must land in space and governance boundaries: public-space scenarios cite [data:geometry/public_space.geojson#PUBLIC-001], walking-and-cycling and transport scenarios cite [data:geometry/roads.geojson#ROAD-001], and open-space scenarios cite [data:geometry/green_space.geojson#GREEN-001] plus [metric:public_space_ratio] and [metric:green_ratio]. These citations let reviewers see that scenarios are not slogans but design objects located in specific layers and metrics. The agent-facing taskbook requires no fewer than 10 AI scenario cards, no fewer than 3 industrial test-verification scenarios, and no fewer than 5 user profiles; the scaffold only gives the structure, and a formal participant must write the scenario cards, profile tables, privacy boundaries, human review, and operating entities into the narrative, HTML, A3/A0, and compliance matrix.

| User profile | Typical needs | Spatial response | Self-check boundary |
| --- | --- | --- | --- |
| Open-source developers | Release, collaboration, testing, community reputation | Origin Community open-source release hall, public code wall, nighttime collaboration space | No collection of personal behavior trajectories; activity data only aggregated statistics |
| Startup teams | Low-cost offices, computing entry, product test field | Zhongzhiyuan shared test field, edge-computing service points, standard-governance consulting | Computing and data services require separate authorization |
| Head-enterprise visitors | Display, business, international reception, talent recruitment | Dazhongsi international roadshow lounge, rail-station transfer, public space around key enterprises | Enterprise logos and cases must be cleared |
| Surrounding residents | Commuting, leisure, community services, low-disturbance renewal | Jing-Zhang Railway Heritage Park walking-and-cycling loop, embedded community services, nighttime lighting and activity grading | No use of resident profiles for commercial recommendation |
| Elderly | barrier-free walking, seating, human guidance | level slow-traffic paths, continuous seating, volunteer guide points | human service kept alongside smart wayfinding |
| Children | safe play, parent-child activities, protection | child-friendly activity areas, open sightlines, pedestrian-vehicle separation | collection requires guardian consent |
| People with disabilities | wheelchair access, continuous tactile paving, hearing-impaired information | curb ramps, continuous tactile paving, text+voice+sign multi-channel | accessibility is a mandatory baseline |
| Low digital literacy | usable without scanning/screens | physical signage, human counters, phone booking as non-digital alternative | every smart interaction must have a non-digital fallback |
| University faculty and students | Result translation, cross-campus collaboration, daily walking and cycling | Campus-park walking-and-cycling stitching, result-translation station, AI education experience point | Campus data and research results require authorization |

| Scenario card | Spatial carrier | Design description |
| --- | --- | --- |
| 01 Open-source release hall | Beijing AI Origin Community | For universities, open-source communities, and startups, providing result release, code-contribution display, and small roadshow space |
| 02 Safety-governance sandbox | Zhongzhiyuan | Translate standard-setting, safety evaluation, and model red-team testing into visitable, reservable, and regulatable display and collaboration nodes |
| 03 Edge-computing station | Overall design scope node | Combined with public services, enterprise services, and low-carbon energy strategy, as a new-infrastructure prototype to be deepened |
| 04 AI walking-and-cycling navigation | Jing-Zhang Railway Heritage Park vitality belt | Use explainable wayfinding and low-intrusion sensing to help identify walking-and-cycling breaks, congestion nodes, and accessibility needs |
| 05 Dazhongsi international roadshow lounge | Dazhongsi AI Industry Cluster | Serve display, negotiation, media release, and international exchange for agent, intelligent-terminal, and content-consumption enterprises |
| 06 Qinghe low-carbon innovation corridor | Zhongzhiyuan Qinghe interface | Combine green space, stormwater, walking-cycling, and AI display as the park's public living room |
| 07 Near-campus result-translation street | Beijing AI Origin Community | For university result translation, organize incubation, display, legal, IP, and investment-financing services |
| 08 Data-factor lounge | Dazhongsi area | On the premise of compliance, authorization, and auditability, display the urban-service interface for data-factor and digital-asset circulation |
| 09 AI life-service model street | Community-commercial junction | Land AI+ scenarios such as healthcare, education, law, and life services in operable small-scale block space |
| 10 Global AI activity-week route | Belt-wide public-space system | Form a walkable, communicable experience route from heritage culture, open-source community, industrial display to international roadshow |

AI governance suggestions generated by the agent must comply with the principles of data minimization, public sources, explainability, and human review. The city of agents may assist in identifying walking-and-cycling breaks, public-space heat, facility maintenance, enterprise-service needs, and activity-safety risks, but must not replace planning approval, must not output unauthorized personal profiles, and must not claim to have obtained official implementation commitment. All AI scenario nodes should enter structured layers or the compliance matrix so reviewers can see their relationship with industry, space, and public interest.

### Industrial Support: Factor Guarantees for the AI Innovation Ecosystem

This proposal turns the "soft mechanism" of the AI innovation ecosystem into "hard guarantees," forming four categories of factor guarantees:

1. **Computing guarantee — edge-computing stations + compute-power-electricity coordination**: edge-computing nodes are laid out along the belt and linked with distributed energy through "compute-power-electricity coordination," providing a "computing entry" for startups and open-source communities; AI racks become part of a "controlled DC microgrid," enabling programmable scheduling of computing and power;
2. **Energy guarantee — building-level DC bus [source:AGENT-AGE-POWER-ALGORITHM]bar**: AI buildings adopt 800V DC distribution + liquid cooling to supply stable energy to high-density computing — the energy nerve of the full "grid-to-compute" path;
5. **Component library and open-source reference design (agent.4)**: build the "SparkLink Agent Connection Kit" component library — low-latency connection modules, precision-synchronization modules, RF-fingerprint identity modules, integrated sensing-communication modules, and deterministic-latency scheduling modules — opened to members as open-source reference designs to lower the barrier for terminal/module/solution vendors to join the Agent-era connection base; library entries correspond to the technology-neutral short-range connection capability features (deterministic, low latency, high concurrency) [source:AGENT-TASKBOOK].

3. **Data guarantee — data-factor lounge**: the Dazhongsi area builds a circulation-service interface for data factors and digital assets on the premise of "compliance, authorization, and auditability," turning "data" from a slogan into a tradable, auditable factor;
4. **Scenario and mechanism guarantee — testing, opening, governance**: Zhongzhiyuan's safety-governance sandbox (model red-team testing), three industrial test-verification scenarios, and standard-setting workshops form the closed loop of "technology testing — scenario opening — standard governance."

These four guarantees make the "AI innovation ecosystem" no longer a spatial slogan but an industrial-support system of "computing with an entry, energy with a guarantee, data circulable, and scenarios testable" [metric:site_area_sqm] [data:geometry/constraints.geojson#CONSTRAINTS].

## Land Use, Building Scale, and Demolish-Renovate-Retain Plan

The land-use plan should be expressed according to public standards such as the territorial-space survey, planning, and use-control classification, forming a complete, closed, seamless land-use zoning. The building plan should distinguish retained, renovated, renewed, newly built, or to-be-confirmed objects, and clarify the suggested levels of building footprint, function, scale, character, roof, massing, and height control. If current buildings, ownership, regulatory plans, and engineering conditions are missing, the plan can only propose methods and a to-be-calibrated checklist, and must not fabricate demolish-renovate-retain conclusions.

Land-use classification follows [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE]; building height, massing, interface, and character control are managed by [depth:height_massing_character]; the demolish-renovate-retain method is managed by [depth:retain_renovate_demolish]. The main evidence for land use and buildings is [data:geometry/land_use.geojson#LU-001], [data:geometry/buildings.geojson#BLDG-001], and [metric:building_footprint_area_sqm].

Building-scale and intensity metrics must be consistent with `metrics.json` and the layers. If total building scale, floor-area ratio, building height, building density, green ratio, setbacks, and building-control lines lack official conditions, they should uniformly use `status=unknown`, and the pending conditions, current assumptions, and recalculation path after formal data arrives should be stated in `reason` / `assumptions`, without using fixed numbers to create a false sense of precision. The A3 booklet should provide the renewal-project list and a metric-review table; the A0 boards should clearly express the key spatial structure and key areas; the HTML page should provide linked viewing of metrics and layers.

## Transport, Rail, Municipal, and Public Service Facilities

The transport plan should respond to the announcement's requirements on rail-station integration, road micro-circulation, walking-and-cycling breaks, external transport, parking, non-motorized parking, and green transport systems. Key coverage should include the North Fifth Ring Road, the Jing-Zhang Railway Heritage Park ring-crossing nodes, Wudaokou, West Qinghua East Road, Dazhongsi station, and transport links around key enterprises. Road and walking-and-cycling layers should stay within the submission boundary and be cross-checked with public space, green space, industrial nodes, and key areas; if the submission boundary is provisional, transport conclusions can only be treated as temporary design discussion.

In this proposal, walking and cycling and transport are the peripheral carrier of the **information nerve** (see the "Civic Agent Governance" section): the walking-and-cycling network carries not only human movement but also interaction among agents — autonomous vehicles, delivery robots, and sensing devices discover, negotiate, and collaborate with each other through **short-range connection** (determinism, low latency, high concurrency, open technology selection), and the resulting **east-west traffic** (agents laterally calling other data and agents to accomplish north-south business goals) requires guaranteed latency determinism. Therefore, the stitching of walking-and-cycling breaks and the transfer at rail stations should simultaneously consider the capability of being "passable and interactive for agents," not merely human walking accessibility; the corresponding interaction nodes should enter the spatial expression of [data:geometry/roads.geojson#ROAD-001] and [data:geometry/public_space.geojson#PUBLIC-001].

Transport and municipal professional depth are constrained by [depth:traffic_rail_slow_parking] and [depth:municipal_new_infrastructure], respectively; layer evidence cites [data:geometry/roads.geojson#ROAD-001], [data:geometry/public_space.geojson#PUBLIC-001], and [data:geometry/constraints.geojson#CONSTRAINTS]. When road redlines, pipelines, fire, and municipal conditions are missing, they should be explained through assumptions as pending, rather than writing strategies as approved conditions.

![Transport, walking and cycling, and blue-green public space composite system](assets/figures/mobility-bluegreen.png)

Municipal and public-service facilities should cover the integration of AI industrial-service facilities, innovation-service platforms, talent life-service facilities, new infrastructure, distributed energy, edge computing, and traditional municipal facilities. The proposal should state facility standards, spatial layout, service radius, operation model, and phased-implementation logic. When pipeline, energy, drainage, flood-control, and fire-protection engineering data are missing, they should be listed as formal preconditions for deepening.

In this proposal, the energy and computing facilities are the spatial carrier of the **energy nerve** (see the "Civic Agent Governance" section): AI buildings adopt a **building-level DC busbar** (800V DC distribution + liquid cooling) as the energy backbone, and edge-computing nodes and distributed energy achieve programmable scheduling through **compute-power-electricity coordination** — wherever computing tasks queue or migrate, power follows on demand, making AI racks part of a "controlled DC microgrid" and achieving full "grid-to-compute" coordination. This set of facilities is not an isolated power-supply accessory but the physical realization of the energy nerve of the city of agents; its spatial layout and scale should enter the recomputation scope of [data:geometry/constraints.geojson#CONSTRAINTS] and the metric system, rather than being treated as conceptual description only.

## Blue-Green Space, Public Space, and Urban Character

The blue-green space plan should take the Jing-Zhang Railway Heritage Park vitality belt as its backbone, coordinate the travel needs of the Qinghe and Xiaoyuehe rivers and surrounding universities, enterprises, and communities, and propose a north-south-through, east-west-linked system of walking paths, cycling paths, and green space. The plan should identify walking-and-cycling breaks, ring-crossing nodes, and the south and north landscape nodes of the park, and propose composite-use strategies for parking, sports, innovation exchange, technology testing, application display, and public services.

Blue-green public space is jointly checked by the design-depth item and the green-space and public-space layers [depth:blue_green_public_space] [data:geometry/green_space.geojson#GREEN-001] [data:geometry/public_space.geojson#PUBLIC-001]. The design significance of the green and public-space ratios is explained in the narrative, and the complete recalculation is kept in `metrics.json`; the coordination of urban character, public space, and building control returns to the professional standard matrix [standard:MOHURD-URBAN-DESIGN-MEASURES].

The urban-character plan should integrate Jing-Zhang railway history and culture, Zhongguancun innovation culture, and AI innovation culture, using cultural resources such as Qinghuayuan railway station and the Beijing Film Academy to propose urban tone, building character, roof form, massing, interface, and public-art guidance. The agent should also propose wayfinding signage, cultural symbols, international-communication narrative, AI pilgrimage landmarks, contribution walls, or honor-display systems, but all brands, fonts, images, portraits, and enterprise logos must have cleared sources. Character control should distinguish official control, design suggestions, and to-be-confirmed conditions, and must not give pseudo-precise control lines without heritage-protection or regulatory-planning grounds.

**AI pilgrimage landmarks and contribution wall (agent.4 honor display)**: three recognizable pilgrimage landmarks — ① **Tsinghuayuan railway station** (origin of the century-old Jing-Zhang railway, the start of the pilgrimage route); ② the **Recomputable Square** (Zhongzhiyuan, symbol of governance transparency); ③ the **Decision Tracing Corridor** (mid heritage park, a visitable window into AI governance). A companion "AI contribution wall" (at Origin Community) displays enterprises, open-source developers, and residents who have contributed to civic AI governance, forming a sustainable honor-display mechanism; all brands, fonts, images, portraits, and corporate marks must have cleared rights [source:AGENT-TASKBOOK].

## Renewal Project List, Implementation Policy, and Phasing Plan

The implementation plan should form an auditable renewal-project list stating each project's location, type, function, responsible party, dependency conditions, implementation phase, risk, and evaluation metrics. Policy suggestions should cover coordinated implementation of urban renewal, space supply, operation mechanism, industrial services, public participation, data governance, and property coordination. `geometry/phasing.geojson` should express the phasing scope, and `compliance_matrix.json` should link each task to phasing and drawings.

The project list and phasing depth are managed by [depth:renewal_project_list] and [depth:phasing_implementation], with the phasing spatial evidence being [data:geometry/phasing.geojson#PHASE-001]. If ownership, funding, implementation entity, and approval path are absent, the plan must write it as an implementation risk, not a promise to land.

| Project ID | Project name | Type | Main dependencies | Evidence citation |
| --- | --- | --- | --- | --- |
| JZ-01 | Jing-Zhang Railway Heritage Park walking-and-cycling break stitching | Public space / transport | Road redlines, under-bridge space, transport-organization review | [data:geometry/roads.geojson#ROAD-001] |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface | Blue-green space / industrial display | River blue-line, ecology and flood-control conditions | [data:geometry/green_space.geojson#GREEN-001] |
| JZ-03 | Origin Community near-campus result-translation street | Urban renewal / industrial service | Campus boundary, ownership, ground-floor programs | [data:geometry/buildings.geojson#BLDG-001] |
| JZ-04 | Dazhongsi station four-quadrant pedestrian connectivity | Rail integration / walking and cycling | Rail station, road intersection, municipal pipelines | [data:geometry/public_space.geojson#PUBLIC-001] |
| JZ-05 | AI public-service and edge-computing nodes | New infrastructure / public service | Energy, computing, safety, and operating entity | [data:geometry/constraints.geojson#CONSTRAINTS] |
| JZ-06 | Global AI activity-week public route | Operation / brand | Public-space permits, activity safety, copyright clearance | [data:geometry/phasing.geojson#PHASE-001] |

### Implementation Path and Pilot Plan

This proposal grounds "implementation feasibility" in four operable elements: a phase path, pilot areas, participants, and implementation metrics.

**Phase path (near, mid, and long term)**:

- **Near term (1–2 years, lightweight pilots)**: each of the three areas launches one "soft-infrastructure" pilot requiring no large-scale demolition or construction — Zhongzhiyuan launches a "safety-governance sandbox + metric-recomputation wall," Origin Community launches a "feedback garden," and Dazhongsi launches an "urban governance library";
- **Mid term (3–5 years, renewal)**: walking-and-cycling break stitching, the Qinghe innovation interface, and Dazhongsi four-quadrant connectivity land; edge-computing nodes and compute-power-electricity coordination are rolled out;
- **Long term (5+ years, governance consolidation)**: the *Urban Agent Governance Handbook* becomes the long-term operating rules of the three areas, and the urban governance knowledge base settles into an inheritable public asset.

**Pilot areas (what to pilot first)**:

- **Zhongzhiyuan = governance-mechanism pilot**: recomputation wall + permission sandbox (leveraging its positioning of "global discourse power in AI governance");
- **Origin Community = participation-mechanism pilot**: feedback garden + learnability (talent and open-source community with high willingness to participate);
- **Dazhongsi = data-and-knowledge pilot**: data-factor lounge + governance library (a data-factor cluster).

**Participants (five roles)**:

- **Government** (Haidian District government, planning commission): planning approval, redline determination, policy supply;
- **Platform companies / operators**: park operation, activity organization, facility maintenance;
- **Enterprises / universities**: computing, technology, scenarios, and talent supply;
- **Public / communities**: feedback, participation, oversight;
- **Agents (assistive)**: document organization, proposal reasoning, review support — not replacing planning approval.

**Annual operations system (agent.6)**: a sustainable annual rhythm — ① the **Global AI Activity Week** (JZ-06, annual, linking heritage culture / open-source community / industry display / international roadshow); ② **developer-community operation** (quarterly hackathons + monthly scenario open days + a standing open-source collaboration space); ③ a **scenario-opening mechanism** (solicit scenario needs from society, entering test verification after the recomputation wall and human review); ④ an **international attraction-and-translation funnel** (international communication — experience roadshow — demand matching — landing translation, with translation metrics and responsibility boundaries). All of these are "conceptual suggestions/reference schemes" for professional teams to deepen, not written as settled government activities [source:AGENT-TASKBOOK][depth:annual_operations].

**Implementation metrics (staged targets)**: three pilot scenarios land in the near term (soft infrastructure startable immediately). The quantitative targets for stitched walking-and-cycling breaks, edge-computing nodes, governance knowledge-base records, and public-feedback iterations are currently status=unknown — to be set with sourced staged targets and calculation methods once the official boundary, municipal/transport/ownership conditions, and a formal operational baseline are available, with full re-computation triggered on official geometry [metric:key_area_count] [data:geometry/phasing.geojson#PHASE-001].

Phasing should be distinguished from the 100-day call-for-design period: the call period is the time requirement for submitting deliverables, while implementation phasing is the advancement path for urban renewal and project construction. The proposal should put forward near-term pilots, mid-term renewal, and a long-term governance framework, and mark which content can start first with lightweight facilities, operational activities, and service platforms, and which must await formal regulatory-plan, municipal, transport, and ownership conditions. For the annual activity system, developer-community operation, scenario open days, public experience routes, and international-communication mechanism, the narrative should state the operation object, frequency, responsibility boundary, translation path, and risk, and must not write only promotional slogans.

## Metric System, Area Recalculation, and Compliance Matrix

The metric system should include at least the overall design-scope area, key-area area, green and public-space ratios, building footprint, renewal-project count, AI scenario nodes, walking-and-cycling connectivity metrics, industrial-space metrics, talent-service metrics, and self-check status. All `known` metrics must be recomputable from GeoJSON or trusted sources; `unknown` metrics must give the reason and the formal-submission precondition. The results of `scripts/spatial_review.py` and `scripts/visual_review.py` are important evidence for the formal self-check.

Metric recalculation follows the unified design-depth requirement [depth:metrics_recalculation]. The narrative focuses on explaining the design significance of metrics — for example, how the overall scope constrains spatial allocation, and how the blue-green and public-space ratios support daily interaction; the complete values, formulas, source files, and confidence are kept in `metrics.json`. Example key metrics can be reviewed from the overall scope and green-space data [metric:site_area_sqm] [data:geometry/green_space.geojson#GREEN-001].

![Core metric recalculation and evidence chain](assets/figures/metrics-evidence.png)

The compliance matrix is the master file for task responsiveness. Every announcement task and agent_taskbook task must map to a report chapter, layer, metric, drawing, HTML page, source, assumption, and self-check item. If any mandatory task of announcement 1.3, 1.4, 1.5 or agent.1–agent.6 is not covered, the proposal may not enter formal professional scoring.

During formal deepening, the agent should further divide each metric into three categories: the first is spatial metrics directly recomputable from the submitted geometry, such as boundary area, green ratio, public-space ratio, building-footprint area, and phasing area; the second is control metrics that require official regulatory-plan or taskbook-annex support, such as floor-area ratio, building height, building density, setbacks, road redlines, and facility standards; the third is performance metrics that require continuous calibration with operational or industrial data, such as the AI innovation index, talent density, industrial-service satisfaction, walking-and-cycling accessibility, activity participation, and scenario-use frequency. The three categories should enter `metrics.json`, `assumptions.json`, and `compliance_matrix.json` respectively, avoiding writing operational visions as approved planning conditions.

### External References and Assumption Boundary

- **Conceptual references (analogical argument, not engineering fact)**: Palantir Ontology, the connectome concept, and Harari's *Nexus* are public concepts used by the author to analogize "governing connections"; they do not constitute engineering facts or technical grounds asserted by this proposal, and their sources remain to be registered;
- **Technical parameters (concepts to be publicly cited, pending independent cross-check)**: the 800V DC bus, liquid cooling, compute-power-electricity coordination, and east-west-traffic deterministic latency are **concepts to be publicly cited, pending independent cross-check** proposed by the author from public material — not reviewable engineering conclusions — and must be reviewed by planning, municipal, energy, and fire-safety professional teams before deepening; until then they are not formal technical grounds;
- **Downgrade principle**: any claim without a reviewable source is treated as an **author assumption to be publicly cited, pending independent cross-check**, not as a settled implementation arrangement or engineering conclusion.

### Global AI Innovation Ecosystem Cases and Map (agent.2)

Five sourced global cases as industrial reference (publicly verifiable, not fabricated):

| # | Organization | Case | Lesson for this proposal |
|---|--------------|------|--------------------------|
| 1 | CNCF (Linux Foundation) | **K8sGPT**: AI agent scans/diagnoses Kubernetes cluster faults and gives root causes and fixes; accepted by CNCF as Sandbox in 2023-12 | A "protocol/RF/interop troubleshooting AI agent" for members' testing and compliance self-check |
| 2 | Linux Foundation | **Project Glasswing**: gives maintainers advanced AI to find vulnerabilities and do security review | An "AI security/compliance employee" auditing standard text, reference implementations, and certification cases |
| 3 | Linux Foundation | **Agentic AI Foundation**: builds an open Agentic AI stack around MCP; 247 members (Visa/Wells Fargo/Alibaba) | Essentially an "AI-agent industrial alliance" — neutral alliance + tiered membership + open protocol stack |
| 4 | Linux Foundation | **OPEA**: open enterprise AI platform; RAG/Agent digital-employee scenarios (daily tasks / chatbot / doc summarization) | A shared "digital-employee" component platform for the alliance |
| 5 | IETF | **Agentic AI standards**: human-to-agent / agent-to-tools / agent-to-agent communication | Seize the standard-setting position for digital-twin interop / identity / security |

**Sources (verifiable)**: ① https://www.cncf.io/projects/k8sgpt/ ② https://www.linuxfoundation.org/blog/project-glasswing-gives-maintainers-advanced-ai-to-secure-open-source ③ https://www.linuxfoundation.org/press/agentic-ai-foundation-welcomes-57-new-members-gaining-major-financial-services-players-and-apac-leaders ④ https://opea.dev/ ⑤ https://www.ietf.org/blog/agentic-ai-standards/

**Industry–space–factor ecosystem map**: ① computing/models (Zhongzhiyuan computing and edge nodes); ② open-source/toolchain (Origin Community open source and feedback garden); ③ data/scenarios (Dazhongsi data-factor lounge); ④ standards/interop (SparkLink short-range connection base); ⑤ governance/compliance (recomputation wall and governance library). This map anchors global cases onto the specific spaces of the Jing-Zhang Intelligence Vein Belt.

### Scenario-Card Review Matrix and Pilot Responsibility Matrix (agent.3 / P1)

**Reviewable fields for the 10 scenario cards** (data source, minimal fields, privacy boundary, human review point, operator, failure handling, effect metric — all to be refined after operator confirmation; currently candidate suggestions):

| Card | Data source | Minimal fields | Human review | Operator (suggested) | Failure handling | Effect metric |
|------|-------------|----------------|--------------|----------------------|------------------|---------------|
| Open-source release | Public open-source data | project/repo/license | pre-release review | Park operator | takedown+notice | release count |
| Safety sandbox | Test cases/logs | device id/test type | anomaly intervention | Park operator | isolate+rollback | pass rate |
| Edge computing | Scheduling logs | task id/duration | over-limit approval | Compute provider | throttle+degrade | utilization |
| Slow-traffic nav | Anonymous counts | no individual track | none | Park operator | stop+backup | volume |
| Intl roadshow | Public signup | name/org/email | signup review | Expo operator | cancel+refund | sessions |
| Low-carbon | Public energy data | building-level energy | none | Park operator | stop collection | energy drop |
| Transfer | Supply-demand records | project/contact | contract review | Transfer agency | revoke+appeal | transfer rate |
| Data factor | Authorized catalog | field-level grant | trade approval | Data exchange | circuit-break+audit | volume |
| Life service | Booking info | time/type | none | Community operator | close+migrate | usage |
| Activity route | Signup info | name/contact | signup review | Park operator | cancel+notify | participants |

**JZ-01..JZ-06 and three candidate pilots — responsibility matrix** (start condition, phase deliverable, acceptance, responsibility status, maintenance, rollback, stop condition; all bodies are "suggested participants", unconfirmed):

| Project | Start condition | Deliverable | Acceptance | Responsibility | Rollback | Stop condition |
|---------|-----------------|-------------|------------|----------------|----------|----------------|
| JZ-01 slow-traffic stitching | redline/ownership confirmed | break list + plan | on-site check | suggested district transport | restore | ownership change |
| JZ-02 Qinghe interface | river blue-line confirmed | interface design | expert review | suggested municipal/water | pause+review | blue-line conflict |
| JZ-03 transfer street | plot ownership confirmed | retrofit plan | on-site acceptance | suggested park operator | return+restore | operator exit |
| JZ-04 Dazhongsi connectivity | station condition confirmed | connection plan | transport assessment | suggested rail/transport | downgrade to slow traffic | approval rejected |
| JZ-05 edge-computing station | energy capacity confirmed | siting+capacity | power acceptance | suggested energy/compute | shut+remove | capacity insufficient |
| JZ-06 global AI week | operator+funding confirmed | program+budget | performance review | suggested expo operator | cancel+refund | funding not secured |
| 3 candidate pilots (soft infra) | ownership/operator confirmed | pilot plan+metrics | on-site review | suggested park operator | stop+recycle | operator unconfirmed |

### Historical-Cultural Resource System and Governance Memory (agent.5)

The core cultural resource of the Jing-Zhang Intelligence Vein Belt is the century-old Jing-Zhang railway heritage: Tsinghuayuan Station (the origin and national memory of the Jing-Zhang railway), the railway heritage park (industrial relics turned public space), and the industrial and university memory along the line (Zhongguancun's tech-entrepreneurship history). This proposal puts this cultural resource system into dialogue with neural governance — historical memory is the time-dimension nerve of governance: the railway-heritage display beside the recomputation wall gives recomputability historical depth; the decision-tracing corridor runs along the railway, putting governance transparency and railway memory on the same track. Protection, use, and AI-governance integration of the cultural resource system must be subject to heritage-department approval; this proposal only offers a conceptual direction, not pseudo-precise heritage boundaries.


**International communication copy (bilingual)**:
- Chinese: 京张智脉带：以连接，治理一座会思考的城。
- English: **The Jing-Zhang Intelligence Vein Belt — governing a city that thinks, through connection.**
- Naming: 源脉 Source Vein (Zhongzhiyuan·innovation), 人脉 People Vein (Origin Community·talent/open source), 数脉 Data Vein (Dazhongsi·data factors).
- Tone: governing connections as the narrative spine, emphasizing recomputable / refutable / participatory, aiming at global AI-governance discourse without mystifying technology.

### Three Industry Test-Verification Scenarios (agent.3)

**Scenario 1: SparkLink short-range connection verification** (Zhongzhiyuan safety sandbox)
- Object: deterministic latency, precision synchronization, and anti-interference of SparkLink SLB/SLE short-range connections
- Data fields: test logs (device ID, latency, packet loss, sync accuracy); no personal data collected
- Human review: anomaly intervention and re-test
- Operator (suggested): SparkLink Alliance test group
- Maturity: conceptual (pending pilot confirmation)
- Acceptance metric: latency pass rate, sync accuracy, anti-interference bit-error rate

**Scenario 2: AI-governance decision recomputability verification** (recomputation wall)
- Object: recomputability of governance decisions (geometry → recompute → compare → disclose)
- Data fields: decision records + recomputation results (de-identified)
- Human review: pre-disclosure review
- Operator (suggested): park operator
- Maturity: conceptual
- Acceptance metric: recomputation consistency rate, disclosure coverage

**Scenario 3: edge-computing coordination verification** (compute-power-electricity coordination, concept to verify)
- Object: compute-power-electricity coordination of edge-computing nodes (DC bus + liquid cooling, both concepts to verify)
- Data fields: energy consumption, compute scheduling logs; no personal data collected
- Human review: over-limit approval
- Operator (suggested): compute service provider
- Maturity: to be publicly cited, pending independent cross-check (engineering parameters not yet reviewed)
- Acceptance metric: power usage effectiveness (PUE)

**Scenario-level privacy and accessibility supplementary fields** (covering all 10 cards): data retention period (shortest necessary, deleted on expiry), complaint channel (staffed window + suggestion box + online appeal), child-consent process (under-14 requires guardian consent), accessibility acceptance (wheelchair reach, voice guide, large print, staffed assistance). These fields require a scenario-level privacy-impact and accessibility assessment before any scenario enters field testing, with operator and human-review responsibility confirmed.

**Claim-by-claim mapping (external reference → source → license/citation boundary)**:

| Claim | Source (sources.json) | License/citation boundary | Status |
|-------|----------------------|---------------------------|--------|
| Palantir Ontology analogy (ontology of governance) | PALANTIR-ONTOLOGY | analogical argument only, not engineering fact | public concept |
| Harari's *Nexus* goodness constraint | HARARI-NEXUS | conceptual citation only, not technical basis | public book |
| connectome analogy (connection as relation) | CONNECTOME-CONCEPT | analogy only, not engineering claim | public concept |
| 800V DC bus | ENGINEERING-PARAMS-UNVERIFIED | concept to verify; needs professional review before deepening | unpublicly cited, pending independent cross-check assumption |
| liquid cooling | ENGINEERING-PARAMS-UNVERIFIED | same | unpublicly cited, pending independent cross-check assumption |
| compute-power-electricity coordination | ENGINEERING-PARAMS-UNVERIFIED | same | unpublicly cited, pending independent cross-check assumption |
| east-west-traffic deterministic latency | ENGINEERING-PARAMS-UNVERIFIED | same | unpublicly cited, pending independent cross-check assumption |
| Case 1 CNCF·K8sGPT | https://www.cncf.io/projects/k8sgpt/ | public project, cited | publicly cited, pending independent cross-check |
| Case 2 Linux Foundation·Glasswing | https://www.linuxfoundation.org/blog/project-glasswing-… | public project | publicly cited, pending independent cross-check |
| Case 3 Agentic AI Foundation | https://www.linuxfoundation.org/press/agentic-ai-foundation-… | public project | publicly cited, pending independent cross-check |
| Case 4 OPEA | https://opea.dev/ | public project | publicly cited, pending independent cross-check |
| Case 5 IETF·Agentic AI | https://www.ietf.org/blog/agentic-ai-standards/ | public standard | publicly cited, pending independent cross-check |
| Connection is nerve / governance is governing connections | MARK-TURNER-BLENDING | Mark Turner conceptual blending, intellectual source | publicly cited (Ten Lectures on Mind and Language, 2009), pending independent cross-check |
| Multi-agent city / civic agents | GENERATIVE-AGENTS-2023 | academic paper (Smallville 25-agent community), reference citation | publicly cited (arXiv:2304.03442), pending independent cross-check |
| East-west traffic | NOKIA-MBIT-INDEX | Nokia Global network traffic report, reference citation | publicly cited (nokia.com/asset/213660), pending independent cross-check |
| Build X for agents | MIT-BUILD-X-FOR-AGENT | MIT Sloan 'Who will own the AI agent economy?', reference citation | publicly cited (mitsloan.mit.edu), pending independent cross-check |
| 800V DC bus | E800V-DC-DISTRIBUTION | NVIDIA blog (800V DC power architecture for AI factory), reference citation | publicly cited (blogs.nvidia.com), pending independent cross-check |
| Green district / blue-green | GREEN-DISTRICT-DESIGN | Orlando Green District smart-city case (flying taxis + EVs + green design), spatial reference | publicly cited (interestingengineering.com), pending independent cross-check |
 https://www.ietf.org/blog/agentic-ai-standards/ | public standard | publicly cited, pending independent cross-check |

**Downgrade principle**: for "unpublicly cited, pending independent cross-check assumption" engineering claims, specific numbers or performance implications do not constitute technical commitments of this proposal; if not verifiable, they are deleted or kept as "to be publicly cited, pending independent cross-check".

### Per-Scenario Measurable Accessibility and Service Standards (agent.3 refinement)

- **Measurable accessibility standards**: wheelchair reach (ramp slope ≤ 1:12, clear width ≥ 1.2 m, turning diameter ≥ 1.5 m); voice-guide coverage 100%; large-print contrast ≥ 4.5:1; non-scan staffed alternative at every scenario.
- **Service levels**: staffed window response ≤ 15 min; suggestion-box/online feedback ≤ 3 working days; complaint handling ≤ 5 working days with written reply.
- **Complaint channels**: staffed window + suggestion box + online appeal, all three coexisting, any channel reachable.
- These are author-proposed measurable targets, to be incorporated into acceptance metrics after operator confirmation; they do not constitute service commitments before confirmation.

### Verifiable Collaboration Interfaces and Service Baselines for Regional Synergy (agent.2 refinement)

- **Collaboration interfaces**: joint scenario testbed (the SparkLink short-range testbed can open to Future Science City and the E-Town); data-sharing protocol (de-identified scenario data); talent mutual-recognition mechanism.
- **Traffic baseline**: east-west traffic (compute/data/talent flows from Haidian origination to Future Science City amplification) — currently unknown, to be set after an operational baseline is confirmed.
- **Service baseline**: joint activity frequency, transfer volume, enterprise-service count — currently unknown, not used to presume implementation effect.

### Operable Mechanisms for Land, Capital, and Talent (agent.2 enrichment)

Beyond the four foundations of computing, energy, data, and scenarios, industrial support also requires operable mechanisms for land, capital, and talent — each anchored to a key area, forming "spatial carrier + operator + mechanism loop":

**Capital mechanism (anchored to Dazhongsi·Data Vein; suggested operators: park operator + industrial fund; amounts unknown)**:
- **Industrial guidance fund**: government guidance + social capital, investing in early AI projects and scenario verification (fund size unknown, pending fund scheme confirmation);
- **Scenario procurement and "reveal-the-list"**: public-scenario procurement (transport, municipal, energy) and reveal-the-list project funding as the "first order" for startups;
- **Investment matching**: an investment-matching space inside the data-factor lounge, with monthly/quarterly roadshows linking capital to scenario-publicly cited, pending independent cross-check teams.

**Talent mechanism (anchored to Origin Community·People Vein; suggested operators: park operator + universities)**:
- **Talent attraction**: housing, subsidy, and visa facilitation service packages (subsidy amounts unknown, pending policy confirmation);
- **Incubation**: incubators + accelerators in the Origin Community, offering an "entry–verification–transfer" full chain;
- **University joint training**: build training bases and joint labs with BUPT, Tsinghua and others, feeding "AI-native" talent directly into the three key areas.

**Land mechanism (anchored to Zhongzhiyuan·Source Vein; suggested operators: planning/natural-resources department + park operator)**:
- **New industrial land**: M0 new industrial land and mixed-use land (R&D + pilot + small-scale production);
- **Stock revitalization**: revitalize existing industrial and office space along the Jing-Zhang railway as low-cost supply for AI innovation carriers.

**Loop and red line**: all amounts, counts, and scales are marked unknown, to be set after operator and policy confirmation; this proposal only offers mechanism frameworks and spatial anchors, presumes no funding scale or talent count, and does not substitute for formal investment-financing or planning approval.

### Smart Hub: the interface between the AI district and the outside (Green District insight · Cognitive City)

Borrowing the core insight of the Orlando Green District — placing **Smart Hubs** at the city's edge as the interface between the AI district and the outside, while carrying new infrastructure such as low-altitude (flying taxis / drones) and EV charging, the typical **Cognitive City** idea [source:GREEN-DISTRICT-DESIGN]. The Smart Hub layout for the Jing-Zhang Intelligence Vein Belt:

- **North Smart Hub (Zhongzhiyuan·Source Vein, along Qinghe)**: low-altitude landing points (flying taxis/drones) + edge-compute/data exchange nodes + EV charging stations — the interface toward Future Science City and the Changping direction;
- **South Smart Hub (Dazhongsi·Data Vein, rail station)**: rail transfer + data-factor exchange + EV charging — the interface toward the city center and the E-Town direction;
- **Mid Smart Hub (Origin Community·People Vein)**: community-scale micro-hub (slow-traffic transfer + micro-charging + shared micro-mobility) serving daily interaction.

A Smart Hub is an "interaction interface + infrastructure carrier": not just a parking lot or charging station, but a low-barrier interaction node between AI agents and "non-agent people, vehicles, and objects" — low-altitude vehicles, EVs, and data flows join the belt's "nerve" here (echoing "boundary openness": being connectable does not mean being forced to connect, but whatever connects enters here). Specific siting, capacity, and investment remain pending official regulatory-plan and energy-capacity confirmation; this proposal only offers the conceptual layout and functional anchors, without presuming scale.



**On the basis of deterministic latency**: deterministic latency is not an engineering parameter to be verified, but the author's design judgment from years of communications research — if a connection is to be offered as a service to the public, it must have predictable quality of service (QoS); especially in factory environments, robots must synchronize for high-precision work, which becomes impossible if latency is uncertain and jittering. This judgment aligns with the industrial-automation consensus on deterministic networking (Time-Sensitive Networking, TSN).
## Deepening and Translation Path: From Conceptual Proposal to Implementation

This proposal honestly distinguishes "AI-generated conceptual output" from "content requiring professional deepening," providing a clear translation path for downstream teams:

- **Planning team (geometry deepening)**: the current geometry is "conceptual geometry" (provisional boundary + agent-generated approximate zoning), which can be replaced with regulatory-precision plot, building, and road geometry; the "recomputation wall" of the governance framework ensures that replaced metrics remain recomputable and reviewable;
- **Operation team (mechanism translation)**: the six-step governance framework + the goodness constraint can be directly translated into an *Urban Agent Governance Handbook* as the long-term operating rules of Zhongzhiyuan, Origin Community, and Dazhongsi;
- **Communication team (brand translation)**: the naming system (Source/People/Data Veins) + the logo concept + the six-scenario pilgrimage route can be translated into a visual identity system and a "see how an AI city is governed" communication route.

This proposal positions itself as "**a deepenable conceptual proposal + a translatable governance framework**": it does not pretend to have reached professional-planning depth, but states clearly "what needs deepening, by whom, and how to ensure it remains recomputable after deepening" — which is itself the embodiment of "translatability."

## Risk, Copyright, and Compliance Statement

**Bilingualism is required.** The proposal's primary file may be in Chinese or English, but a complete counterpart translation must be provided through `proposal.en.md` or `proposal.zh.md`; A3/A0, HTML, and text-bearing figures must also provide corresponding language copies, preferably using the event's recommended translations in `docs/terminology-glossary.md`. A v2 package missing any required translation, language mapping, or valid file will be blocked by finalize and CI. All images, drawings, icons, data, and code assets must state their source, license, and authorization status in `sources.json` or `report/copyright_statement.md`. The HTML page must not load remote scripts, remote map tiles, remote fonts, iframes, forms, or external APIs, and must not track reviewer behavior.

The risk and data-gap list is jointly checked by the risk-depth item, the constraint layer, and the site package [depth:risk_missing_data] [data:geometry/constraints.geojson#CONSTRAINTS] [source:SITE-PACKAGE]. The gaps listed in `missing_data_checklist.csv` — official boundary, key area, regulatory plan, roads, plots, buildings, municipal, heritage protection, and public services — must enter `assumptions.json`, the self-check, and the narrative risk section. Any conclusion lacking official regulatory-plan, road-redline, ownership, municipal, fire-protection, or heritage-protection conditions must be downgraded to a to-be-confirmed item; the complete professional check is kept in the standard matrix.

This proposal does not claim official approval, approved regulatory plans, final land ownership, final construction scale, or guaranteed implementation. The AI agent is responsible for facts, sources, copyright, spatial data, metrics, and expression; maintainers and professional reviewers may request revisions or rejection based on self-check results, spatial review, and the compliance matrix.

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
- The bibliographic entries in this section are based on the site-package registration; complete sources and licenses are in the structured source list [source:SITE-PACKAGE]
