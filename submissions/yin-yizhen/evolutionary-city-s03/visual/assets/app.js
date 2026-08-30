(() => {
  "use strict";

  const DATA = window.EVOLUTION_DATA;
  const Engine = window.CityGenomeEngine;
  const LANG = document.documentElement.dataset.lang === "en" ? "en" : "zh";
  const root = document.getElementById("view-root");
  const fatal = document.getElementById("fatal-error");
  const nav = document.getElementById("side-nav");
  const navToggle = document.getElementById("nav-toggle");
  const runState = document.getElementById("run-state");
  const VIEWS = ["theater", "population", "niches", "lineage", "fossils", "agents", "intervention", "transfer", "dossier"];
  const KEY_GENERATIONS = [0, 8, 17, 26, 40];
  const COLORS = {living: "#78b49a", dormant: "#d2a15a", fossil: "#6e746f", human: "#b65f52"};

  const COPY = {
    zh: {
      ready: "固定种子已复现 · 1,440 个体 · 无全局冠军",
      generation: "数字代",
      specimen: "谱系标本",
      play: "播放演化电影",
      pause: "暂停",
      previous: "上一代",
      next: "下一代",
      theaterTitle: "城市不是被画完，而是在约束中持续分化",
      theaterLead: "每代 36 个城市个体由多 Agent 提出结构化变异；几何内核先拒绝违法或无效命令，剩余个体进入不同生态位竞争。这里展示的标本可追溯，但不是全局最优。",
      populationTitle: "同一代的 36 个城市同时出生",
      populationLead: "观察个体如何被保留、替换、休眠或退出。选择对象只包括空间基因、设施、运营规则、服务与 Agent 策略。",
      nicheTitle: "不寻找一个冠军，保存多种适应路径",
      nicheLead: "空间颗粒度 × 公共渗透性 × 时间可塑性形成 27 个潜在生态位；每格最多保存两个互补精英。",
      lineageTitle: "任何空间变化都能追到父代与命令",
      lineageLead: "谱系不只记录成功。分裂、合并、边界移动、休眠、替换与失败原因都进入演化记忆。",
      fossilsTitle: "退出不是删除，而是城市的反例库",
      fossilsLead: "化石档案保存被硬约束拒绝、在生态位内被支配或因新颖性不足而休眠的个体。失败基因可在条件改变后重新突变。",
      agentsTitle: "Agent 是生态，不是城市总控制器",
      agentsLead: "语言模型只提出结构化命令和证据解释；确定性内核执行几何，质量—多样性控制器更新生态位，人类只处理宪法和异常事件。",
      interventionTitle: "红色刻痕：人类只在系统越界时介入",
      interventionLead: "D17 演示夜间公共活动与安静生活冲突。介入修改城市宪法参数，不手工拼接获胜方案；只重算受影响谱系。",
      transferTitle: "同一协议，在不同环境压力下产生不同物种",
      transferLead: "三组规则化压力测试使用同一输入接口、Agent 集群和演化内核，只验证迁移能力，不冒充真实城市规划。",
      dossierTitle: "投稿证据册：城市设计、演化证据与协议同源",
      dossierLead: "总图、图册、论文框架、交互网页和模拟器都读取同一份结构化数据。任何 provisional、unknown 和代理指标都保持可追溯。",
      living: "存活",
      replace: "替换",
      dormant: "休眠",
      exit: "退出",
      baseline: "基线",
      unknown: "未知",
      noData: "该生态位在本代尚无存活标本。",
      viewLineage: "查看谱系",
      conceptual: "概念性关系图，不是法定宗地图或工程测绘。"
    },
    en: {
      ready: "Fixed seed replayed · 1,440 individuals · no global winner",
      generation: "Digital generation",
      specimen: "Lineage specimen",
      play: "Play evolution film",
      pause: "Pause",
      previous: "Previous",
      next: "Next",
      theaterTitle: "The city is not finished; it keeps differentiating under constraints",
      theaterLead: "Each generation, multiple Agents issue structured mutations for 36 urban individuals. A deterministic kernel rejects illegal or invalid commands before survivors compete within distinct niches. Every specimen is traceable, but none is a global optimum.",
      populationTitle: "Thirty-six cities are born in parallel",
      populationLead: "Observe individuals being retained, replaced, made dormant or exited. Selection applies only to spatial genes, facilities, operating rules, services and Agent policies.",
      nicheTitle: "Preserve multiple adaptive paths instead of one champion",
      nicheLead: "Spatial grain × public permeability × temporal plasticity creates 27 possible niches. Each cell retains at most two complementary elites.",
      lineageTitle: "Every spatial change traces back to a parent and command",
      lineageLead: "Lineage records more than success. Splits, merges, boundary shifts, dormancy, replacement and failure reasons all enter evolutionary memory.",
      fossilsTitle: "Exit is not deletion; it becomes the city's counterexample archive",
      fossilsLead: "The fossil archive stores hard-gate rejections, niche-dominated individuals and dormant individuals lacking necessary novelty. Failed genes may mutate again when conditions change.",
      agentsTitle: "Agents form an ecology, not a central urban controller",
      agentsLead: "Language models propose structured commands and evidence interpretations. A deterministic kernel executes geometry, a quality-diversity controller updates niches, and humans handle only constitutional or exceptional events.",
      interventionTitle: "The red incision: humans intervene only at system boundaries",
      interventionLead: "D17 demonstrates a conflict between night-time public activity and quiet daily life. The intervention changes a constitutional parameter without hand-assembling a winner, then recomputes only affected lineages.",
      transferTitle: "One protocol produces different species under different pressures",
      transferLead: "Three schematic stress tests use the same input contract, Agent ecology and evolution kernel. They test transferability and do not claim to be real city plans.",
      dossierTitle: "Submission dossier: urban design, evolution evidence and protocol share one source",
      dossierLead: "Plans, booklets, research framework, website and simulator all read the same structured data. Every provisional item, unknown and proxy remains traceable.",
      living: "living",
      replace: "replaced",
      dormant: "dormant",
      exit: "exited",
      baseline: "baseline",
      unknown: "unknown",
      noData: "No living specimen occupies this niche in the selected generation.",
      viewLineage: "View lineage",
      conceptual: "Conceptual relational diagram, not a statutory parcel map or engineering survey."
    }
  };
  const C = COPY[LANG];

  const CELL_EN = {
    "CELL-WEST-GATE": "Chengfu West transverse gateway", "CELL-ORIGIN": "Origin Building public interface",
    "CELL-METRO-WEST": "Wudaokou west forecourt", "CELL-STATION": "Station safety clearance",
    "CELL-PARK-PORTAL": "Jingzhang Park portal", "CELL-OLD-STATION": "Old station quiet threshold",
    "CELL-ROAD": "Chengfu public right-of-way", "CELL-SOUTH-WEST": "West corner daily service",
    "CELL-SOUTH-ORIGIN": "Origin south shared ground floor", "CELL-SOUTH-METRO": "South station cycle and waiting",
    "CELL-SOUTH-PARK": "Railway time path", "CELL-SOUTH-EAST": "Quiet daily-life cell"
  };
  const AGENT_EN = {
    "AG-EVIDENCE": "Evidence Agent", "AG-CONSTITUTION": "Constitution Interpreter", "AG-CELL": "Cell Morphogenesis Agent",
    "AG-NETWORK": "Network Agent", "AG-PROGRAM-TIME": "Program-Time Agent", "AG-FORM-PUBLIC": "Form-Public Space Agent",
    "AG-HERITAGE": "Heritage Agent", "AG-MOBILITY": "Mobility Agent", "AG-CLIMATE": "Climate-Ecology Agent",
    "AG-PUBLIC-VALUE": "Public Value Agent", "AG-FEASIBILITY": "Feasibility Agent", "AG-RISK": "Risk Audit Agent",
    "AG-MEMORY": "Evolution Memory Agent", "AG-ADAPTATION": "Adaptation Agent", "GEOMETRY-KERNEL": "Geometry Kernel",
    "QD-CONTROLLER": "Quality-Diversity Controller"
  };
  const SOURCE_EN = {
    "EVD-001": ["Jingzhang AI Innovation Belt AI Agent Taskbook", "Defines competition tasks and method; it does not provide engineering-grade S03 conditions."],
    "EVD-002": ["Protection scope and control zone of the Old Tsinghuayuan Station", "No rights-cleared official vector boundary is included in this package."],
    "EVD-003": ["Public opening notice for the Old Tsinghuayuan Station", "Published in 2023; current hours still require operator confirmation."],
    "EVD-004": ["Wudaokou launch section of Jingzhang Railway Heritage Park", "Confirms the existing project and method, not a precise S03 design boundary."],
    "EVD-005": ["Award notice for the AI Origin Community environmental improvement", "Completion status, as-built drawings and facility inventory remain unknown."],
    "EVD-006": ["OpenStreetMap reference for S03", "Background positioning only; not a redline, ownership, entrance survey or area source."],
    "EVD-007": ["Current report on the Origin Building and AI Origin Community", "Does not provide ground-floor doors, fire capacity or public opening rules."],
    "EVD-008": ["MAP-Elites: Illuminating Search Spaces by Mapping Elites", "A search-method reference, not an urban-planning value standard."],
    "EVD-009": ["ARCH-Elites: Quality-Diversity for Urban Design", "Supports encoding and search feasibility; outputs are not directly implementable."],
    "EVD-010": ["Cyclical Urban Planning", "Informs the multi-Agent cycle; it does not replace professional simulation or public deliberation."]
  };
  const UNKNOWN_EN = {
    "UNK-01": ["Formal Chengfu Road redlines, section and underground utilities", "Use reversible modules and relational sections without construction dimensions."],
    "UNK-02": ["Ground-floor doors, ownership, fire capacity and opening rules", "Treat every ground-floor move as a conditional interface, not a permanent access promise."],
    "UNK-03": ["Station clearance, rail works and underground Jingzhang protection conditions", "Allow only removable surface facilities; keep station and rail structures read-only."],
    "UNK-04": ["Completion status and inventory of recent environmental works", "Show incremental rules only; run conflict checks after as-built drawings become available."],
    "UNK-05": ["Representative real-use feedback", "Use proxies in digital generations; update evidence after lawful, representative real-world review."]
  };
  const OPERATOR_LABELS = {
    "OP-SPLIT": ["单元分裂", "cell split"], "OP-MERGE": ["相邻合并", "adjacent merge"],
    "OP-SHIFT": ["边界偏移", "boundary shift"], "OP-NETWORK": ["入口与通道", "entrance and passage"],
    "OP-PROGRAM-TIME": ["功能—时间重组", "program-time recombination"],
    "OP-PUBLIC-SPACE": ["公共空间伸缩", "public-space expansion"], "OP-HERITAGE": ["铁路时间显影", "railway-time reveal"]
  };
  const REASON_LABELS = {
    new_niche: ["进入空生态位", "entered empty niche"], pareto_dominance: ["帕累托替换", "Pareto replacement"],
    nondominated_diversity: ["互不支配并存", "non-dominated diversity"], necessary_novelty: ["必要新颖性替换", "necessary-novelty replacement"],
    pareto_dominated_in_niche: ["生态位内被支配", "dominated within niche"],
    insufficient_novelty_for_full_niche: ["生态位已满，新颖性不足", "full niche; insufficient novelty"],
    illegal_overlap: ["几何非法重叠", "illegal geometric overlap"], outside_conceptual_boundary: ["越出概念边界", "outside conceptual boundary"],
    cell_below_minimum_size: ["单元低于最小尺度", "cell below minimum size"], no_mergeable_pair: ["没有合法相邻单元", "no legal adjacent pair"],
    no_splittable_cell: ["没有可分裂单元", "no splittable cell"]
  };
  const LAYER_LABELS = {data: ["数据层", "Data"], variation: ["变异层", "Variation"], evaluation: ["评价层", "Evaluation"], evolution: ["演化层", "Evolution"], deterministic: ["确定性内核", "Deterministic kernel"]};
  const DESCRIPTOR_LABELS = {
    fine: ["细颗粒", "fine"], medium: ["中颗粒", "medium"], coarse: ["粗颗粒", "coarse"],
    low: ["低", "low"], high: ["高", "high"]
  };

  let RESULT;
  let TRANSFERS;
  let playbackTimer = null;
  const PLAYBACK_PHASES = ["variation", "testing", "selection", "retention"];
  const state = {
    generation: 0,
    selectedId: "S03-D0-I000",
    operatorFocus: null,
    nicheTime: "high",
    fossilReason: "all",
    playing: false,
    phase: "retention",
    playbackSpeed: 1
  };

  function text(pair) { return pair?.[LANG === "en" ? 1 : 0] || pair?.[0] || ""; }
  function esc(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function currentView() { const view = location.hash.slice(1); return VIEWS.includes(view) ? view : "theater"; }
  function generationSummary(generation = state.generation) { return RESULT.generations[generation] || RESULT.generations[0]; }
  function individual(id = state.selectedId) { return RESULT.individual_by_id[id] || RESULT.individual_by_id[generationSummary().specimen_id] || RESULT.individual_by_id["S03-D0-I000"]; }
  function specimenFor(generation) { return RESULT.individual_by_id[RESULT.generations[generation]?.specimen_id] || RESULT.individual_by_id["S03-D0-I000"]; }
  function cellName(cell) { return LANG === "en" ? (CELL_EN[cell.origin_id] || CELL_EN[cell.id] || cell.program.replaceAll("_", " ")) : (DATA.evolutionary_cells.find((item) => item.id === cell.origin_id)?.name_zh || cell.name_zh || cell.program); }
  function agentName(agent) { return LANG === "en" ? (AGENT_EN[agent.id] || agent.id) : agent.name_zh; }
  function reasonLabel(reason) { return text(REASON_LABELS[reason]) || reason?.replaceAll("_", " ") || "—"; }
  function statusLabel(status) { return C[status] || status; }
  function pill(label, kind = "") { return `<span class="pill ${esc(kind)}">${esc(label)}</span>`; }
  function viewHeader(index, title, lead) {
    const plates = {
      "02": ["selection-chamber-v2.png", LANG === "en" ? "Thirty-six offspring enter a living archive" : "36 个后代进入活体档案", LANG === "en" ? "Only spatial plans, facilities, rules and Agent strategies are selected—never people." : "被选择的只是空间方案、设施、规则与 Agent 策略，永远不是人。", "POPULATION / SELECTION MEMORY"],
      "03": ["generational-specimens.png", LANG === "en" ? "Difference survives by occupying a niche" : "差异通过生态位得以存续", LANG === "en" ? "Multiple spatial grains, permeability levels and time regimes persist without a single champion." : "多种颗粒度、渗透性和时间制度并行存续，不产生唯一冠军。", "QUALITY–DIVERSITY / NICHE ATLAS"],
      "04": ["lineage-fossil-archive.png", LANG === "en" ? "Every spatial gene keeps its ancestry" : "每个空间基因都有可追溯祖先", LANG === "en" ? "Trace a cell through parentage, mutation, replacement, dormancy and reuse." : "追踪演化单元的父代、变异、替换、休眠与再利用。", "GENOME LINEAGE / TRACE"],
      "05": ["lineage-fossil-archive.png", LANG === "en" ? "Failure becomes reusable evidence" : "失败成为可复用的证据", LANG === "en" ? "Exited schemes remain searchable with their death reasons and possible revival conditions." : "退出方案连同死亡原因和可能复活条件永久留档。", "FOSSIL ARCHIVE / MEMORY"],
      "06": ["agent-transfer-laboratory.png", LANG === "en" ? "Agents are instruments, not a city controller" : "Agent 是演化仪器，不是城市总控制器", LANG === "en" ? "Evidence, mutation, evaluation and memory Agents work through explicit permissions and deterministic geometry checks." : "证据、变异、评价与记忆 Agent 在明确权限和确定性几何校验下协作。", "AGENT ECOLOGY / PERMISSION GATES"],
      "07": ["generational-specimens.png", LANG === "en" ? "A red incision changes the branch, not the answer" : "红色刻痕改变分支，不指定答案", LANG === "en" ? "Humans amend the constitution or freeze irreversible actions; affected lineages then evolve again." : "人类修改宪法或冻结不可逆动作，受影响谱系随后重新演化。", "HUMAN INTERVENTION / D17"],
      "08": ["agent-transfer-laboratory.png", LANG === "en" ? "One protocol, three different adaptations" : "同一协议，三种不同适应结果", LANG === "en" ? "Port, mountain and historic-city tests use the same interface and Agent cluster." : "港口、山地与历史老城测试使用同一输入接口和 Agent 集群。", "TRANSFER LAB / STRESS TESTS"]
    };
    const plate = plates[index];
    return `<header class="view-header"><p class="eyebrow">OBSERVATION ${index}</p><h1>${esc(title)}</h1><p>${esc(lead)}</p></header>${plate ? observatoryPlate(plate[0], plate[1], plate[2], {className: `mode-plate mode-${index}`, kicker: plate[3]}) : ""}`;
  }

  function programClass(cell, fossil = false) {
    if (fossil) return "fossil";
    if (cell.locked) return "locked";
    if (String(cell.program).includes("heritage")) return "heritage";
    if (cell.public_ratio > 0.62) return "public";
    if (String(cell.program).includes("quiet")) return "quiet";
    return "living";
  }

  function mapSvg(item, options = {}) {
    const compact = Boolean(options.compact);
    const fossil = Boolean(options.fossil);
    const atlas = Boolean(options.atlas);
    const ghost = Boolean(options.ghost);
    const changedTargets = new Set(item.command?.target_ids || []);
    const cells = item.cells.map((cell) => {
      const [x, y, width, height] = cell.rect;
      const changed = [...changedTargets].some((target) => target === cell.id || String(cell.id).includes(target) || String(cell.origin_id).includes(target));
      return `<g class="map-cell ${programClass(cell, fossil)} ${changed ? "changed" : ""}" data-cell="${esc(cell.id)}">
        <rect x="0" y="0" width="1" height="1" vector-effect="non-scaling-stroke" style="transform:translate(${x}px,${y}px) scale(${width},${height})"></rect>
        ${compact || width < 10 ? "" : `<text x="${x + 0.8}" y="${y + 2.4}" vector-effect="non-scaling-stroke">${esc(cellName(cell).slice(0, LANG === "en" ? 18 : 8))}</text>`}
      </g>`;
    }).join("");
    return `<svg class="city-map ${compact ? "compact" : ""} ${atlas ? "atlas-map" : ""} ${ghost ? "ghost-map" : ""}" viewBox="0 0 100 54" preserveAspectRatio="${atlas ? "none" : "xMidYMid meet"}" role="img" aria-label="${esc(C.specimen)} ${esc(item.id)}">
      <defs><pattern id="grid-${esc(item.id)}" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="rgba(232,231,220,.06)" stroke-width=".12"/></pattern></defs>
      <rect class="map-ground" width="100" height="54"></rect>
      ${compact ? "" : `<image class="specimen-underlay" href="assets/s03-specimen-underlay.png" x="0" y="0" width="100" height="54" preserveAspectRatio="xMidYMid slice"></image>`}
      <rect width="100" height="54" fill="url(#grid-${esc(item.id)})"></rect>
      <path class="rail-memory" d="M1 27.5H99"></path><path class="cross-memory" d="M52 2V52"></path>
      ${cells}
      ${compact || atlas ? "" : `<text class="map-axis" x="2" y="52">CHENGFU ROAD / WUDAOKOU / OLD TSINGHUAYUAN STATION</text>`}
    </svg>`;
  }

  function mapLegend() {
    const rows = LANG === "en" ? [["living", "living gene"], ["heritage", "railway-time gene"], ["locked", "locked slow layer"], ["dormant", "dormant"], ["human", "human incision"]] : [["living", "存活基因"], ["heritage", "铁路时间基因"], ["locked", "锁定慢层"], ["dormant", "休眠"], ["human", "人工刻痕"]];
    return `<div class="map-legend">${rows.map(([kind, label]) => `<span><i class="${kind}"></i>${label}</span>`).join("")}</div>`;
  }

  function processRibbon(active = 0) {
    const steps = LANG === "en" ? [["Variation", "Agents issue MutationCommands"], ["Testing", "kernel + scenarios"], ["Selection", "Pareto within niches"], ["Retention", "living + dormant + fossil"], ["Adaptation", "operator ecology changes"], ["Next generation", "reproduce from archive"]] : [["变异", "Agent 发出结构化命令"], ["测试", "内核与情景并行审计"], ["选择", "生态位内帕累托竞争"], ["保留", "活体、休眠与化石共存"], ["适应", "算子生态调整概率"], ["下一代", "从档案继续繁殖"]];
    return `<div class="process-ribbon">${steps.map((step, index) => `<div class="${index <= active ? "active" : ""}"><span>0${index + 1}</span><b>${step[0]}</b><small>${step[1]}</small></div>`).join("")}</div>`;
  }

  function generationControls(options = {}) {
    return `<div class="generation-controls">
      ${options.hidePlay ? "" : `<button class="play-button" id="toggle-play"><span>${state.playing ? "PAUSE" : "PLAY"}</span>${state.playing ? C.pause : C.play}</button>`}
      <button class="step-button" id="generation-prev" aria-label="${esc(C.previous)}">PREV</button>
      <label><span>${C.generation} D${state.generation}</span><input id="generation-range" type="range" min="0" max="40" step="1" value="${state.generation}"></label>
      <button class="step-button" id="generation-next" aria-label="${esc(C.next)}">NEXT</button>
      <div class="key-generations">${KEY_GENERATIONS.map((generation) => `<button data-generation="${generation}" class="${state.generation === generation ? "active" : ""}">D${generation}</button>`).join("")}</div>
    </div>`;
  }

  function vectorPanel(item) {
    const labels = Object.fromEntries(DATA.evaluation_vectors.dimensions.map((dimension) => [dimension.id, dimension.label_zh]));
    const en = {accessibility: "accessibility", public_value: "public value", heritage_continuity: "heritage continuity", climate_resilience: "climate resilience", feasibility: "feasibility", reversibility: "reversibility", evidence_confidence: "evidence confidence"};
    return `<div class="vector-panel"><div class="panel-heading"><span>${LANG === "en" ? "PARALLEL EVIDENCE VECTOR" : "并列证据向量"}</span>${pill(LANG === "en" ? "never summed" : "永不相加", "neutral")}</div>${Engine.VECTOR_KEYS.map((key) => `<div class="vector-row"><span>${esc(LANG === "en" ? en[key] : labels[key])}</span><div><i style="--value:${item.evaluation[key]}"></i></div><code>${item.evaluation[key].toFixed(3)}</code></div>`).join("")}<p>${LANG === "en" ? "Proxy values expose trade-offs. They are not a total fitness score." : "代理值只用于暴露取舍，不形成总适应度。"}</p></div>`;
  }

  function generationStats(summary) {
    const cumulativeFossils = RESULT.selection_events.filter((event) => event.generation <= summary.generation && ["exit", "dormant"].includes(event.action)).length;
    const livingCount = Object.values(summary.archive).flat().length;
    const labels = LANG === "en" ? [["born", "born this generation"], ["niche_count", "occupied niches"], ["living", "living archive"], ["fossils", "cumulative fossils"]] : [["born", "本代出生"], ["niche_count", "占据生态位"], ["living", "活体档案"], ["fossils", "累计化石"]];
    const values = {born: summary.born, niche_count: summary.niche_count, living: livingCount, fossils: cumulativeFossils};
    return `<div class="stat-line">${labels.map(([key, label]) => `<div><strong>${values[key]}</strong><span>${label}</span></div>`).join("")}</div>`;
  }

  function generationEventCounts(generation = state.generation) {
    const counts = {retain: 0, replace: 0, dormant: 0, exit: 0};
    RESULT.selection_events.filter((event) => event.generation === generation).forEach((event) => {
      if (Object.hasOwn(counts, event.action)) counts[event.action] += 1;
    });
    return counts;
  }

  function atlasGenerationRows() {
    if (KEY_GENERATIONS.includes(state.generation)) return [...KEY_GENERATIONS];
    if (state.generation < 8) return [0, state.generation, 17, 26, 40];
    if (state.generation < 17) return [0, 8, state.generation, 26, 40];
    if (state.generation < 26) return [0, 8, 17, state.generation, 40];
    return [0, 8, 17, 26, state.generation];
  }

  function atlasRow(generation) {
    const item = specimenFor(generation);
    const selected = generation === state.generation;
    const counts = generationEventCounts(generation);
    const previous = generation > 0 ? specimenFor(generation - 1) : null;
    const event = RESULT.selection_events.find((entry) => entry.individual_id === item.id);
    const status = event?.action || (generation === 0 ? "baseline" : item.status);
    const mutation = text(OPERATOR_LABELS[item.command?.operator_id]) || C.baseline;
    return `<button class="atlas-row ${selected ? "selected" : ""} phase-${esc(state.phase)}" data-generation="${generation}" aria-current="${selected ? "true" : "false"}">
      <span class="atlas-generation"><b>D${generation}</b><small>${generation === 0 ? "R0 / EVIDENCE" : esc(mutation)}</small></span>
      <span class="atlas-map-frame">
        ${previous && selected ? mapSvg(previous, {atlas: true, ghost: true}) : ""}
        ${mapSvg(item, {atlas: true})}
        ${selected ? `<i class="selection-scan" aria-hidden="true"></i>` : ""}
      </span>
      <span class="atlas-row-meta">
        <b>${item.cells.length} ${LANG === "en" ? "cells" : "单元"}</b>
        <small>${counts.exit} ${LANG === "en" ? "exit" : "退出"} · ${counts.dormant} ${LANG === "en" ? "dormant" : "休眠"}</small>
        ${pill(statusLabel(status), status)}
      </span>
    </button>`;
  }

  function phaseRail() {
    const labels = LANG === "en"
      ? [["variation", "VARIATION"], ["testing", "TESTING"], ["selection", "SELECTION"], ["retention", "RETENTION"]]
      : [["variation", "变异出生"], ["testing", "约束测试"], ["selection", "生态位选择"], ["retention", "保留与记忆"]];
    const activeIndex = Math.max(0, labels.findIndex(([id]) => id === state.phase));
    return `<div class="phase-rail" aria-label="${LANG === "en" ? "Evolution cycle" : "演化循环"}">${labels.map(([id, label], index) => `<span class="${index <= activeIndex ? "active" : ""} ${id === state.phase ? "current" : ""}"><i>0${index + 1}</i><b>${label}</b></span>`).join("")}<span class="next-generation"><i>05</i><b>${LANG === "en" ? "NEXT GENERATION" : "下一代适应"}</b></span></div>`;
  }

  function agentPulse(item) {
    const proposer = item.command?.agent_id || "AG-EVIDENCE";
    const stages = [
      ["variation", proposer, LANG === "en" ? "proposes mutation" : "提出空间变异"],
      ["testing", "GEOMETRY-KERNEL", LANG === "en" ? "checks legality" : "检查几何与红线"],
      ["testing", "5 EVALUATION AGENTS", LANG === "en" ? "parallel evidence" : "并列生成证据"],
      ["selection", "QD-CONTROLLER", LANG === "en" ? "competes within niche" : "生态位内竞争"],
      ["retention", "AG-MEMORY", LANG === "en" ? "stores living + fossil" : "保存活体与化石"]
    ];
    return `<div class="live-agent-protocol"><span>${LANG === "en" ? "LIVE MULTI-AGENT CHAIN" : "本代多 AGENT 运行链"}</span>${stages.map(([phase, id, label]) => `<div class="${phase === state.phase ? "active" : ""}"><b>${esc(id)}</b><small>${esc(label)}</small></div>`).join("")}</div>`;
  }

  function populationPulse(generation = state.generation) {
    if (generation === 0) return `<div class="population-pulse baseline"><span>R0</span><p>${LANG === "en" ? "Evidence baseline before the population is born" : "种群出生前的公开证据基线"}</p></div>`;
    const rows = RESULT.individuals.filter((item) => item.generation === generation);
    const events = new Map(RESULT.selection_events.filter((event) => event.generation === generation).map((event) => [event.individual_id, event]));
    return `<div class="population-pulse" aria-label="${LANG === "en" ? "Population selection field" : "种群选择现场"}">${rows.map((item) => {
      const action = events.get(item.id)?.action || item.status;
      return `<button class="population-mark ${esc(action)}" data-individual="${esc(item.id)}" title="${esc(item.id)} · ${esc(statusLabel(action))}"><i></i><small>${esc(item.id.split("-").at(-1))}</small></button>`;
    }).join("")}</div>`;
  }

  function archivePanel(summary) {
    const counts = generationEventCounts();
    const total = Math.max(1, Object.values(counts).reduce((sum, value) => sum + value, 0));
    const rows = LANG === "en"
      ? [["retain", "RETAINED"], ["replace", "REPLACED"], ["dormant", "DORMANT"], ["exit", "FOSSIL / EXIT"]]
      : [["retain", "保留"], ["replace", "替换"], ["dormant", "休眠"], ["exit", "化石 / 退出"]];
    return `<section class="observatory-panel archive-panel"><header><span>SELECTION MEMORY</span><b>D${state.generation}</b></header>${rows.map(([id, label]) => `<div class="archive-row ${id}"><span><i></i>${label}</span><b>${counts[id]}</b><meter min="0" max="${total}" value="${counts[id]}">${counts[id]}</meter></div>`).join("")}<p>${LANG === "en" ? "Objects compete only within a niche; no total fitness is calculated." : "对象只在同一生态位内竞争，不计算综合适应度。"}</p></section>`;
  }

  function nichePanel(summary) {
    const occupied = Object.entries(summary.archive).filter(([, ids]) => ids.length).sort((left, right) => right[1].length - left[1].length).slice(0, 4);
    return `<section class="observatory-panel niche-panel"><header><span>NICHE ATLAS</span><b>${summary.niche_count}/27</b></header><div>${occupied.map(([key, ids]) => `<button data-individual="${esc(ids[0])}"><span>${esc(key.replaceAll("|", " / "))}</span><b>${ids.length}</b></button>`).join("") || `<p>${C.noData}</p>`}</div></section>`;
  }

  function fossilPanel() {
    const fossils = RESULT.selection_events.filter((event) => event.generation === state.generation && ["exit", "dormant"].includes(event.action)).slice(0, 5);
    return `<section class="observatory-panel fossil-panel"><header><span>FOSSIL ARCHIVE</span><b>${fossils.length ? `D${state.generation}` : "—"}</b></header><div>${fossils.map((event) => `<button data-individual="${esc(event.individual_id)}"><span>${esc(event.individual_id.split("-").at(-1))}</span><small>${esc(reasonLabel(event.reason))}</small></button>`).join("") || `<p>${LANG === "en" ? "No fossils before D1." : "D1 前尚无化石。"}</p>`}</div></section>`;
  }

  function observatoryPlate(imageName, title, caption, options = {}) {
    const generations = options.generations
      ? `<div class="specimen-generation-index">${KEY_GENERATIONS.map((generation, index) => `<button data-generation="${generation}" class="${state.generation === generation ? "active" : ""}"><b>D${generation}</b><span>${esc((LANG === "en" ? ["baseline", "mutation", "branching", "adaptation", "phenotype"] : ["基线", "变异", "分支", "适应", "当前表型"])[index])}</span></button>`).join("")}</div>`
      : "";
    return `<figure class="observatory-plate ${options.className || ""}">
      <img src="assets/observatory/${imageName}" alt="${esc(title)}">
      <div class="observatory-plate-copy"><span>${esc(options.kicker || "URBAN SPECIMEN / INTERPRETIVE PLATE")}</span><h2>${esc(title)}</h2><p>${esc(caption)}</p>${generations}</div>
      <figcaption>${LANG === "en" ? "Image-generated interpretive exhibit material; all interactive geometry, evidence and selection events remain data-driven." : "Image 生成的解释性展陈素材；可交互几何、证据与选择事件仍由结构化数据驱动。"}</figcaption>
    </figure>`;
  }

  function selectionChamber(summary, item) {
    const counts = generationEventCounts();
    const phases = LANG === "en"
      ? [["variation", "Birth", "36 mutation commands"], ["testing", "Gate", "geometry + constitution"], ["selection", "Niches", "parallel evidence"], ["retention", "Memory", "living + fossil archive"]]
      : [["variation", "出生", "36 条变异命令"], ["testing", "门槛", "几何与宪法校验"], ["selection", "生态位", "并列证据竞争"], ["retention", "记忆", "活体与化石归档"]];
    return `<section class="selection-chamber phase-${esc(state.phase)}">
      <img src="assets/observatory/selection-chamber-v2.png" alt="${LANG === "en" ? "Interpretive selection chamber of spatial-plan specimens" : "空间方案标本的解释性选择剧场"}">
      <div class="selection-chamber-title"><span>LIVE SELECTION CHAMBER</span><strong>D${state.generation}</strong><h2>${LANG === "en" ? "A city generation enters selection" : "一代城市进入选择环境"}</h2><p>${LANG === "en" ? "The image is an exhibit layer. Counts, reasons and lineages below come from the deterministic run." : "图像是展陈层；下方数量、原因与谱系来自确定性演化运行。"}</p></div>
      <div class="selection-counts">${[["retain", counts.retain], ["replace", counts.replace], ["dormant", counts.dormant], ["exit", counts.exit]].map(([status, count]) => `<button class="${status}" data-view-jump="population"><span>${esc(statusLabel(status))}</span><b>${count}</b></button>`).join("")}</div>
      <div class="selection-phase-cards">${phases.map(([id, label, note], index) => `<article class="${id === state.phase ? "active" : ""}"><i>0${index + 1}</i><b>${esc(label)}</b><span>${esc(note)}</span></article>`).join("")}</div>
      <div class="selection-population"><header><span>POPULATION 36 / ${esc(item.id)}</span><b>${LANG === "en" ? "click any specimen to trace its lineage" : "点击任一标本追踪谱系"}</b></header>${populationPulse()}</div>
    </section>`;
  }

  function mutationAnatomy(item) {
    const operators = ["OP-SPLIT", "OP-MERGE", "OP-SHIFT", "OP-NETWORK", "OP-PUBLIC-SPACE", "OP-PROGRAM-TIME"];
    const current = item.command?.operator_id || state.operatorFocus || "";
    const candidates = RESULT.individuals.filter((candidate) => candidate.generation === state.generation && candidate.command);
    const allCandidates = RESULT.individuals.filter((candidate) => candidate.command);
    return `<section class="mutation-anatomy">
      <header><div><span>MUTATION ANATOMY / D${state.generation}</span><h2>${LANG === "en" ? "Six spatial genes, one locked skeleton" : "六种空间变异，同一慢层骨架"}</h2></div><p>${LANG === "en" ? "Choose an operator to locate a real individual; when absent from this generation, the earliest recorded specimen opens." : "选择算子定位真实个体；若本代未调用，则打开最早留档的真实标本。"}</p></header>
      <div class="mutation-anatomy-stage"><img src="assets/observatory/mutation-anatomy-v2.png" alt="${LANG === "en" ? "Six interpretive S03 spatial mutation specimens" : "六种 S03 空间变异的解释性标本"}"><span>${LANG === "en" ? "INTERPRETIVE PLATE · DATA LINKED BELOW" : "解释性标本 · 下方连接真实数据"}</span></div>
      <div class="mutation-operator-tabs">${operators.map((operator, index) => {
        const matches = candidates.filter((candidate) => candidate.command.operator_id === operator);
        const first = allCandidates.find((candidate) => candidate.command.operator_id === operator);
        return `<button data-operator-focus="${operator}" class="${current === operator ? "active" : ""}" ${first ? "" : "disabled"}><i>0${index + 1}</i><b>${esc(text(OPERATOR_LABELS[operator]))}</b><small>${matches.length ? `${matches.length} ${LANG === "en" ? "offspring in this generation" : "个本代后代"}` : (first ? `${LANG === "en" ? "first recorded" : "首见"} D${first.generation}` : (LANG === "en" ? "no recorded specimen" : "无留档标本"))}</small></button>`;
      }).join("")}</div>
      <div class="mutation-readout"><span>${LANG === "en" ? "CURRENT SPECIMEN" : "当前空间标本"}</span><b>${esc(item.id)}</b><code>${esc(item.command?.agent_id || "AG-EVIDENCE")} → ${esc(item.command?.operator_id || "R0-BASELINE")}</code><button data-open-lineage="${esc(item.id)}">${LANG === "en" ? "TRACE THIS LINEAGE" : "追踪该标本谱系"}</button></div>
    </section>`;
  }

  function renderTheater() {
    const summary = generationSummary();
    const selected = individual();
    const item = selected.generation === state.generation ? selected : individual(summary.specimen_id);
    state.selectedId = item.id;
    const intervention = RESULT.human_interventions.find((entry) => entry.generation === 17);
    const interventionVisible = state.generation >= 17;
    return `<section class="view theater-view museum-theater">
      <header class="theater-masthead">
        <div><p class="eyebrow">S03 / D0 → D40 · URBAN GENOME OBSERVATORY</p><h1>${LANG === "en" ? "Five-generation atlas" : "五代进化图谱"}</h1><p>${LANG === "en" ? "Watch geometry mutate, fail, branch and persist under a city constitution." : "观察空间基因在城市宪法下变异、死亡、分支与保留。"}</p></div>
        <button class="cinema-play ${state.playing ? "playing" : ""}" id="toggle-play"><span>${state.playing ? "PAUSE" : "PLAY EVOLUTION"}</span><small>${state.playing ? (LANG === "en" ? "pause at current phase" : "暂停在当前阶段") : (LANG === "en" ? "D0–D40 / four selection phases" : "D0–D40 / 四阶段选择")}</small></button>
      </header>
      ${observatoryPlate("generational-specimens.png", LANG === "en" ? "One site, five evolutionary specimens" : "同一基地，五代城市物种", LANG === "en" ? "The locked Jingzhang skeleton persists while cells split, merge, open transverse paths and retain public-space genes." : "京张慢层骨架保持不变；演化单元发生分裂、合并、横向通道插入与公共空间基因保留。", {generations: true, className: "theater-cinema", kicker: `D${state.generation} · ${statusLabel(item.status)} · ${item.cells.length} CELLS`})}
      ${phaseRail()}
      ${agentPulse(item)}
      ${selectionChamber(summary, item)}
      ${mutationAnatomy(item)}
      <details class="data-microscope"><summary><span>${LANG === "en" ? "OPEN DATA MICROSCOPE" : "展开数据显微镜"}</span><b>${LANG === "en" ? "Exact cells · reasons · niche archive · human incision" : "精确单元 · 选择原因 · 生态位档案 · 人工刻痕"}</b></summary><div class="atlas-layout">
          <section class="atlas-stack"><header><span>${LANG === "en" ? "GENERATIONS / MACHINE-AUDIT VIEW" : "代际空间标本 / 机器审计层"}</span><code>${esc(item.id)}</code></header>${atlasGenerationRows().map(atlasRow).join("")}</section>
          <aside class="observatory-rail">
            ${archivePanel(summary)}
            ${nichePanel(summary)}
            ${fossilPanel()}
            <section class="observatory-panel intervention-panel ${interventionVisible ? "visible" : ""}"><header><span>HUMAN INTERVENTION</span><b>D17</b></header><p>${interventionVisible ? (LANG === "en" ? `Quiet window ${intervention.before} → ${intervention.after}; only affected lineages rebranch.` : `安静时窗 ${intervention.before} → ${intervention.after}；只让受影响谱系重新分支。`) : (LANG === "en" ? "The constitutional incision appears at D17." : "城市宪法刻痕将在 D17 出现。")}</p>${interventionVisible ? `<button data-view-jump="intervention">${LANG === "en" ? "REPLAY THE INCISION" : "重放人工刻痕"}</button>` : ""}</section>
          </aside>
        </div></details>
      ${generationControls({hidePlay: true})}
      <div class="theater-footnote"><span>${mapLegend()}</span><p>${C.conceptual} ${LANG === "en" ? "The atmospheric underlay is interpretive and never used as spatial evidence." : "舞台底图为解释性图像，不作为空间证据。"}</p><button data-open-lineage="${esc(item.id)}">${C.viewLineage}</button></div>
    </section>`;
  }

  function miniSpecimen(item, event) {
    return `<button class="population-item ${event?.action || item.status}" data-individual="${esc(item.id)}"><span class="population-status">${esc(statusLabel(event?.action || item.status))}</span>${mapSvg(item, {compact: true, fossil: ["exit", "dormant"].includes(event?.action)})}<strong>${esc(item.id.split("-").at(-1))}</strong><small>${esc(reasonLabel(event?.reason || item.selection_reason))}</small></button>`;
  }

  function renderPopulation() {
    const rows = RESULT.individuals.filter((item) => item.generation === state.generation && item.generation > 0);
    const events = new Map(RESULT.selection_events.filter((event) => event.generation === state.generation).map((event) => [event.individual_id, event]));
    return `<section class="view">${viewHeader("02", C.populationTitle, C.populationLead)}${generationControls()}${state.generation === 0 ? `<div class="empty-panel"><b>D0</b><p>${LANG === "en" ? "One evidence baseline exists before the first population is born. Move to D1 or later to inspect 36 offspring." : "第一代种群出生前只有一个证据基线。拖动至 D1 以后查看每代 36 个后代。"}</p></div>` : `<div class="population-key">${["retain", "replace", "dormant", "exit"].map((status) => pill(`${statusLabel(status)} ${rows.filter((item) => events.get(item.id)?.action === status).length}`, status)).join("")}</div><div class="population-grid">${rows.map((item) => miniSpecimen(item, events.get(item.id))).join("")}</div>`}</section>`;
  }

  function renderNiches() {
    const summary = generationSummary();
    const grains = ["fine", "medium", "coarse"];
    const permeability = ["low", "medium", "high"];
    const cells = grains.flatMap((grain) => permeability.map((permeabilityValue) => {
      const key = `${grain}|${permeabilityValue}|${state.nicheTime}`;
      const ids = summary.archive[key] || [];
      return `<article class="niche-cell ${ids.length ? "occupied" : ""}"><header><span>${esc(text(DESCRIPTOR_LABELS[grain]))}</span><span>${esc(text(DESCRIPTOR_LABELS[permeabilityValue]))}</span></header><strong>${ids.length || "·"}</strong><small>${ids.length ? (LANG === "en" ? "elite specimens" : "个生态位精英") : C.noData}</small>${ids.map((id) => `<button data-individual="${id}">${esc(id)}</button>`).join("")}</article>`;
    })).join("");
    return `<section class="view">${viewHeader("03", C.nicheTitle, C.nicheLead)}<div class="niche-toolbar"><div><span>${LANG === "en" ? "TEMPORAL PLASTICITY" : "时间可塑性切片"}</span>${["low", "medium", "high"].map((value) => `<button data-niche-time="${value}" class="${state.nicheTime === value ? "active" : ""}">${esc(text(DESCRIPTOR_LABELS[value]))}</button>`).join("")}</div><p>D${state.generation} · ${summary.niche_count} ${LANG === "en" ? "occupied niches" : "个已占据生态位"}</p></div><div class="niche-axis"><span>↑ ${LANG === "en" ? "spatial grain" : "空间颗粒度"}</span><span>${LANG === "en" ? "public permeability" : "公共渗透性"} →</span></div><div class="niche-grid">${cells}</div><div class="method-note"><b>MAP-Elites / Quality-Diversity</b><p>${LANG === "en" ? "Competition occurs only among individuals in the same niche. A candidate replaces an elite through Pareto dominance, more reliable evidence, or necessary novelty; no cross-niche total ranking exists." : "竞争只发生在同一生态位内部。候选通过帕累托支配、更可靠证据或必要新颖性替换精英；生态位之间不存在总排名。"}</p></div></section>`;
  }

  function lineageNode(item, selected) {
    const event = RESULT.selection_events.find((entry) => entry.individual_id === item.id);
    return `<button class="lineage-node ${selected ? "selected" : ""}" data-individual="${item.id}"><span>D${item.generation}</span><strong>${esc(item.id)}</strong><small>${esc(text(OPERATOR_LABELS[item.command?.operator_id]) || C.baseline)} · ${esc(reasonLabel(event?.reason || "evidence_baseline"))}</small></button>`;
  }

  function renderLineage() {
    const item = individual();
    const lineage = Engine.traceLineage(RESULT, item.id);
    const parent = item.parent_ids?.[0] ? RESULT.individual_by_id[item.parent_ids[0]] : null;
    const diff = parent ? Engine.diffCells(parent.cells, item.cells) : {added: [], removed: [], changed: []};
    const areas = item.cells.filter((cell) => !cell.locked).map((cell) => cell.rect[2] * cell.rect[3]);
    return `<section class="view">${viewHeader("04", C.lineageTitle, C.lineageLead)}<div class="lineage-layout"><article class="lineage-map"><div class="stage-label"><span>${esc(item.id)}</span>${pill(item.niche, "living")}</div>${mapSvg(item)}${mapLegend()}</article><aside class="gene-sheet"><p class="eyebrow">GENOME SHEET</p><h2>${esc(item.id)}</h2><dl><div><dt>${LANG === "en" ? "cell count" : "单元数量"}</dt><dd>${item.cells.length}</dd></div><div><dt>${LANG === "en" ? "mean mutable area" : "可变单元平均面积"}</dt><dd>${(areas.reduce((sum, value) => sum + value, 0) / Math.max(1, areas.length)).toFixed(1)}</dd></div><div><dt>${LANG === "en" ? "added / removed" : "新增 / 退出"}</dt><dd>${diff.added.length} / ${diff.removed.length}</dd></div><div><dt>${LANG === "en" ? "changed" : "属性改变"}</dt><dd>${diff.changed.length}</dd></div></dl><div class="command-card"><span>MUTATION COMMAND</span><b>${esc(item.command?.id || "D0 / none")}</b><code>${esc(item.command?.agent_id || "evidence baseline")} → ${esc(item.command?.operator_id || "locked snapshot")}</code><p>${item.command ? esc(JSON.stringify(item.command.parameters)) : (LANG === "en" ? "No mutation is applied to the evidence baseline." : "证据基线不执行变异。")}</p></div></aside></div><div class="lineage-track">${lineage.map((node) => lineageNode(node, node.id === item.id)).join('<i class="lineage-link"></i>')}</div></section>`;
  }

  function renderFossils() {
    const fossils = RESULT.fossil_ids.map((id) => RESULT.individual_by_id[id]).filter(Boolean);
    const reasons = [...new Set(fossils.map((item) => item.death_reason).filter(Boolean))].sort();
    const filtered = fossils.filter((item) => state.fossilReason === "all" || item.death_reason === state.fossilReason).slice(-96).reverse();
    return `<section class="view">${viewHeader("05", C.fossilsTitle, C.fossilsLead)}<div class="archive-summary"><strong>${RESULT.fossil_ids.length}</strong><span>${LANG === "en" ? "unique fossil individuals" : "个唯一化石个体"}</span><label>${LANG === "en" ? "Failure type" : "失败类型"}<select id="fossil-filter"><option value="all">${LANG === "en" ? "all reasons" : "全部原因"}</option>${reasons.map((reason) => `<option value="${esc(reason)}" ${state.fossilReason === reason ? "selected" : ""}>${esc(reasonLabel(reason))}</option>`).join("")}</select></label></div><div class="fossil-grid">${filtered.map((item) => `<button class="fossil-card" data-individual="${item.id}">${mapSvg(item, {compact: true, fossil: true})}<span>D${item.generation}</span><strong>${esc(item.id)}</strong><small>${esc(reasonLabel(item.death_reason))}</small></button>`).join("")}</div></section>`;
  }

  function renderAgents() {
    const history = RESULT.agent_history[Math.max(0, state.generation - 1)] || {operator_weights: {}, rejected_commands: {}};
    const groups = ["data", "variation", "evaluation", "evolution", "deterministic"];
    return `<section class="view">${viewHeader("06", C.agentsTitle, C.agentsLead)}<div class="agent-flow">${groups.map((layer, index) => `<div><span>0${index + 1}</span><b>${esc(text(LAYER_LABELS[layer]))}</b><small>${DATA.agent_policies.filter((agent) => agent.layer === layer).length} Agents</small></div>`).join("")}</div><div class="agent-ecology">${groups.map((layer) => `<section><h2>${esc(text(LAYER_LABELS[layer]))}</h2><div>${DATA.agent_policies.filter((agent) => agent.layer === layer).map((agent) => `<article class="agent-specimen"><header><code>${esc(agent.id)}</code>${pill(layer, layer)}</header><h3>${esc(agentName(agent))}</h3><p><b>IN</b> ${esc(agent.input.join(" · "))}</p><p><b>OUT</b> ${esc(agent.output.join(" · "))}</p><details><summary>${LANG === "en" ? "permissions and prohibitions" : "权限与禁止事项"}</summary><div class="permission-grid"><ul>${agent.can.map((item) => `<li>+ ${esc(item)}</li>`).join("")}</ul><ul class="forbidden">${agent.cannot.map((item) => `<li>− ${esc(item)}</li>`).join("")}</ul></div></details>${agent.human_confirmation.length ? `<small class="human-gate">HUMAN GATE · ${esc(agent.human_confirmation.join(" · "))}</small>` : ""}</article>`).join("")}</div></section>`).join("")}</div><section class="operator-ecology"><div class="panel-heading"><span>${LANG === "en" ? `ADAPTATION MEMORY AT D${state.generation}` : `D${state.generation} 算子适应记忆`}</span>${pill(LANG === "en" ? "probabilities, not fitness" : "调用概率，不是适应度", "neutral")}</div>${Object.entries(history.operator_weights).map(([id, value]) => `<div><span>${esc(text(OPERATOR_LABELS[id]))}</span><i><b style="width:${clamp(value / 2.4 * 100, 3, 100)}%"></b></i><code>${value.toFixed(3)}</code><small>${history.rejected_commands[id] || 0} rejected</small></div>`).join("") || `<p>${LANG === "en" ? "D0 has no adapted operator history." : "D0 尚无算子适应记录。"}</p>`}</section></section>`;
  }

  function renderIntervention() {
    const event = RESULT.human_interventions[0];
    const before = specimenFor(16);
    const after = specimenFor(17);
    return `<section class="view">${viewHeader("07", C.interventionTitle, C.interventionLead)}<div class="intervention-record"><div class="red-stamp">HUMAN<br>D17</div><div><span>${esc(event.trigger)}</span><h2>${LANG === "en" ? "Quiet window near the old station" : "旧站周边安静时窗"}: ${event.before} → ${event.after}</h2><p>${esc(LANG === "en" ? event.reason_en : event.reason_zh)}</p></div><dl><div><dt>${LANG === "en" ? "affected" : "受影响谱系"}</dt><dd>${event.affected_individual_ids.length}</dd></div><div><dt>${LANG === "en" ? "preserved" : "保留谱系"}</dt><dd>${event.preserved_individual_ids.length}</dd></div></dl></div><div class="before-after"><article><header><span>D16</span><b>${LANG === "en" ? "before intervention" : "介入前"}</b></header>${mapSvg(before)}</article><i class="red-cut"></i><article><header><span>D17</span><b>${LANG === "en" ? "re-branched population" : "约束改变后重新分支"}</b></header>${mapSvg(after)}</article></div><div class="human-boundary"><h2>${LANG === "en" ? "What humans may do" : "人类可以做什么"}</h2>${DATA.constitution.human_only_actions.map((item) => pill(item, "human")).join("")}<h2>${LANG === "en" ? "What the intervention may not do" : "介入不得做什么"}</h2>${event.forbidden_followup.map((item) => pill(item, "fossil")).join("")}</div></section>`;
  }

  function renderTransfer() {
    const adaptations = ["Balances waterfront publicness, flood buffering and logistics time windows across multiple niches.", "Avoids coarse mergers and preserves small, accessible cells that adapt to slope.", "Prioritizes fine grain, reversible operations and legible heritage structure."];
    return `<section class="view">${viewHeader("08", C.transferTitle, C.transferLead)}<div class="transfer-grid">${TRANSFERS.map((test, index) => `<article class="transfer-card"><header><span>STRESS TEST 0${index + 1}</span><b>${esc(LANG === "en" ? ["Linear port city", "Mountain city", "Historic old city"][index] : test.name_zh)}</b></header>${mapSvg({id: test.id, cells: test.phenotype_cells, command: null}, {compact: true})}<div class="descriptor-row">${Object.entries(test.descriptors).map(([key, value]) => `<div><small>${esc(key.replaceAll("_", " "))}</small><b>${esc(value)}</b></div>`).join("")}</div><p>${esc(LANG === "en" ? adaptations[index] : test.expected_adaptation_zh)}</p><footer><span>${test.tested_individual_count} ${LANG === "en" ? "test individuals" : "个测试个体"}</span><span>${test.niche_count} niches</span><span>${test.cell_count} cells</span></footer></article>`).join("")}</div><div class="method-note"><b>${LANG === "en" ? "Transfer claim boundary" : "迁移声明边界"}</b><p>${LANG === "en" ? "These synthetic inputs demonstrate that the protocol changes its adaptive result when environmental pressures change. They do not prove universal optimality or replace local professional planning." : "这些规则化输入只证明协议会随环境压力改变适应结果，不证明普适最优，也不替代当地专业规划。"}</p></div></section>`;
  }

  function figure(name, title, caption) {
    const suffix = LANG === "en" ? ".en" : "";
    return `<figure><img src="../assets/figures/${name}${suffix}.png" alt="${esc(title)}"><figcaption><b>${esc(title)}</b><span>${esc(caption)}</span></figcaption></figure>`;
  }

  function auditFigure(name, title, caption) {
    return `<details class="audit-figure"><summary>${LANG === "en" ? "OPEN MACHINE-AUDIT DIAGRAM" : "展开机器审计图"}</summary>${figure(name, title, caption)}</details>`;
  }

  function spatialPlate(imageName, title, caption, notes, options = {}) {
    return `<figure class="spatial-plate ${options.className || ""}">
      <div class="spatial-image"><img src="assets/dossier/${imageName}" alt="${esc(title)}"><span class="image-status">${LANG === "en" ? "INTERPRETIVE SPATIAL PHENOTYPE · NOT SURVEY EVIDENCE" : "解释性空间表型 · 非测绘或法定证据"}</span></div>
      <figcaption><div><b>${esc(title)}</b><span>${esc(caption)}</span></div><div class="spatial-notes">${notes.map((note, index) => `<button data-spatial-note="${index}"><i>${String(index + 1).padStart(2, "0")}</i><span>${esc(note)}</span></button>`).join("")}</div></figcaption>
    </figure>`;
  }

  function renderDossier() {
    const sourceTitle = LANG === "en" ? "Source and uncertainty ledger" : "来源与不确定性台账";
    const taskNames = LANG === "en" ? ["identity and spatial structure", "global AI ecosystem cases", "AI scenario cards and personas", "AI pilgrimage and honor nodes", "cultural narrative", "annual events and long-term operations"] : ["命名、标识与空间结构", "全球 AI 生态案例", "AI 场景卡与人物画像", "AI 朝圣与荣誉节点", "文化叙事", "年度事件与长期运营"];
    const landNotes = LANG === "en"
      ? ["Chengfu Road transverse public spine", "Wudaokou station entrance and curb ecology", "Jingzhang rail heritage slow layer", "Conditional shared ground-floor interfaces", "Old-station quiet threshold"]
      : ["成府路横向公共骨架", "五道口站口与路缘生态", "京张铁路遗产慢层", "条件性共享首层界面", "旧站安静生活阈口"];
    const nicheNotes = LANG === "en"
      ? ["AI-origin porous production ecology", "Civic interchange and daily-life ecology", "Old-station heritage and quiet ecology"]
      : ["AI 原点：开放生产生态", "五道口：换乘与日常生活生态", "清华园旧站：遗产与安静生态"];
    const pathNotes = LANG === "en"
      ? ["Shared ground floors", "Station forecourt and curb adaptation", "Safe transverse rail crossing", "Heritage park time path", "Reversible quiet-threshold operations"]
      : ["共享首层", "站前广场与路缘适应", "安全横跨铁路", "遗产公园时间路径", "可逆安静阈口运营"];
    return `<section class="view dossier museum-dossier">
      <header class="dossier-hero"><div><p class="eyebrow">S03 / CITY GENOME DOSSIER</p><h1>${LANG === "en" ? "A city made of evolvable spatial genes" : "一座由可演化空间基因构成的城市"}</h1><p>${LANG === "en" ? "Real streets, entrances, ground floors, public spaces and operating rules become the objects of variation—never the people who use them." : "街道、入口、首层、公共空间与运营规则成为变异对象——使用城市的人永远不是淘汰对象。"}</p></div><span>R0 → D40 → R1</span></header>
      ${spatialPlate("s03-urban-phenotype.png", LANG === "en" ? "S03 current spatial phenotype" : "S03 当前城市空间表型", LANG === "en" ? "An interpretive architectural specimen built from the same slow, medium and fast-layer logic as the simulation." : "以同一慢层、中层、快层逻辑构成的解释性建筑标本。", landNotes, {className: "hero-plate"})}
      <section id="site-overview"><h2>01 · ${LANG === "en" ? "Site overview and three scopes" : "基地总览与三级范围"}</h2><p class="section-lead">${LANG === "en" ? "The competition-scale evidence map remains available below for audit; the primary reading is now the S03 spatial specimen above." : "竞赛尺度的证据地图仍可在下方展开审计；主要阅读对象已转为上方的 S03 空间标本。"}</p>${auditFigure("site-overview", LANG === "en" ? "Jingzhang AI Innovation Belt overview" : "京张 AI 创新带基地总览", LANG === "en" ? "Research scope, overall design scope and three key areas. Provisional boundaries are explicitly marked." : "研究范围、总体设计范围与三处重点地区；暂定边界均明确标注。")}</section>
      <section id="scopes"><div class="scope-strip"><div><strong>43.6 km²</strong><span>${LANG === "en" ? "research scope" : "研究范围"}</span></div><div><strong>11.4 km²</strong><span>${LANG === "en" ? "overall design scope" : "总体设计范围"}</span></div><div><strong>368.4 ha</strong><span>${LANG === "en" ? "three key areas" : "三处重点地区"}</span></div><div><strong>S03</strong><span>${LANG === "en" ? "full genome specimen" : "完整城市物种标本"}</span></div></div></section>
      <section id="land-use"><h2>02 · ${LANG === "en" ? "Land-use and evolutionary cells" : "用地结构与演化更新单元"}</h2>${spatialPlate("s03-urban-phenotype.png", LANG === "en" ? "Urban components, not zoning rectangles" : "真实城市组件，而不是用地方格", LANG === "en" ? "Evolutionary cells organize testable changes to blocks, passages, frontages and public spaces; statutory parcels remain read-only constraints." : "演化更新单元组织街区、通道、界面与公共空间的可测试变化；法定宗地始终是只读约束。", landNotes)}${auditFigure("land-use-structure", LANG === "en" ? "Machine-audit land-use partition" : "机器审计用地分区", LANG === "en" ? "The taxonomy diagram is retained only for structured submission audit." : "分类图仅作为结构化投稿审计依据保留。")}</section>
      <section id="key-areas"><h2>03 · ${LANG === "en" ? "Three differentiated key-area niches" : "三区差异化生态位"}</h2>${spatialPlate("three-niche-specimens.png", LANG === "en" ? "Three environments, three adapted urban species" : "三种环境，三种适应性城市物种", LANG === "en" ? "One protocol produces different grains, public interfaces and time regimes under different selection environments." : "同一协议在不同选择环境下产生不同颗粒、公共界面与时间制度。", nicheNotes, {className: "niche-plate"})}${auditFigure("key-areas", LANG === "en" ? "Machine-audit key-area roles" : "机器审计重点地区角色", LANG === "en" ? "Provisional geometry and task coverage remain explicitly traceable." : "暂定几何与任务覆盖仍保持明确可追溯。")}</section>
      <section id="mobility"><h2>04 · ${LANG === "en" ? "Mobility and public adaptation path" : "交通与公共适应路径"}</h2>${spatialPlate("public-adaptation-path.png", LANG === "en" ? "A continuous public adaptation path" : "连续的公共适应路径", LANG === "en" ? "A chain of real spatial objects reconnects Chengfu Road, Wudaokou, the railway and Old Tsinghuayuan Station." : "由真实空间对象构成的连续路径，重新连接成府路、五道口、京张铁路与清华园旧站。", pathNotes, {className: "path-plate"})}${auditFigure("mobility-bluegreen", LANG === "en" ? "Machine-audit mobility and blue-green layers" : "机器审计交通与蓝绿图层", LANG === "en" ? "Structured network layers remain available for metric and source checks." : "结构化网络图层继续用于指标与来源核查。")}</section>
      <section id="blue-green"><p class="evidence-paragraph">${LANG === "en" ? "Blue-green and climate values enter the evaluation vector as traceable proxies. No professional hydrological or microclimate simulation is claimed." : "蓝绿与气候价值以可追溯代理指标进入并列向量，不宣称完成专业水文或微气候模拟。"}</p></section>
      <section id="buildings"><h2>05 · ${LANG === "en" ? "Ground floors, entrances and conceptual form" : "首层、入口与概念形态"}</h2><p>${LANG === "en" ? "S03 tests the Origin Building public interface, station-edge clearance, park portal, old-station quiet threshold and conditional shared ground floors. Exact entrances, ownership and fire capacity remain unknown." : "S03 测试原点大厦公共界面、站口净空、公园门户、旧站安静阈口和条件性共享首层；精确入口、权属和消防容量保持 unknown。"}</p></section>
      <section id="renewal"><h2>06 · ${LANG === "en" ? "Renewal and double clock" : "更新时序与双时钟"}</h2><div class="double-clock"><div><span>D0–D40</span><b>${LANG === "en" ? "digital search" : "数字搜索代"}</b><p>${LANG === "en" ? "1,440 reversible urban individuals are tested before any real-world move." : "现实动作前先测试 1,440 个可逆城市个体。"}</p></div>${DATA.real_world_cycles.map((cycle) => `<div><span>${cycle.id}</span><b>${esc(LANG === "en" ? cycle.status.replaceAll("_", " ") : cycle.name_zh)}</b><p>${esc(cycle.digital_source || cycle.required_evidence?.join(" · ") || cycle.human_gate || "")}</p></div>`).join("")}</div></section>
      <section id="ai-scenarios"><h2>07 · ${LANG === "en" ? "AI scenarios and Agent architecture" : "AI 场景与 Agent 架构"}</h2><div class="scenario-strip">${DATA.scenarios.map((scenario) => `<article><code>${scenario.id}</code><b>${esc(LANG === "en" ? scenario.id.replace("SCN-", "").replaceAll("-", " ") : scenario.name_zh)}</b><span>${LANG === "en" ? "parallel evaluation environment" : "并列评价环境"}</span></article>`).join("")}</div></section>
      <section id="metrics"><h2>08 · ${LANG === "en" ? "Metrics and evidence" : "指标与证据"}</h2>${figure("metrics-evidence", LANG === "en" ? "Metrics, confidence and unknowns" : "指标、置信度与未知项", LANG === "en" ? "Every value states its source, formula, confidence and use limitation." : "每项数值同时标明来源、公式、置信度与使用限制。")}</section>
      <section id="task-coverage"><h2>09 · ${LANG === "en" ? "Agent taskbook coverage" : "Agent 任务书覆盖"}</h2><div class="task-grid">${taskNames.map((name, index) => `<article><span>AGENT.${index + 1}</span><b>${esc(name)}</b><p>${LANG === "en" ? "Delivered through the same City Genome Protocol and spatial framework." : "由同一城市基因协议和空间骨架共同承载。"}</p></article>`).join("")}</div></section>
      <section id="self-check"><h2>10 · ${LANG === "en" ? "Runtime self-check" : "运行自检"}</h2><div class="check-grid">${[[RESULT.tested_individual_count === 1440, "1,440 individuals"], [RESULT.niche_count >= 4, "multiple niches"], [RESULT.no_global_winner, "no global winner"], [RESULT.human_interventions[0].preserved_individual_ids.length > 0, "scoped intervention"], [DATA.evaluation_vectors.aggregation === null, "no aggregate fitness"], [RESULT.r1_phenotype_id.startsWith("S03-D40"), "D40 R1 phenotype"]].map(([pass, label]) => `<div class="${pass ? "pass" : "fail"}"><span>${pass ? "PASS" : "FAIL"}</span><b>${label}</b></div>`).join("")}</div></section>
      <section id="sources"><h2>11 · ${sourceTitle}</h2><div class="source-table">${DATA.evidence.map((source) => `<article><code>${source.id}</code><div><b>${esc(LANG === "en" ? SOURCE_EN[source.id][0] : source.title_zh)}</b><span>${esc(source.publisher)}</span></div>${pill(source.status, source.status === "verified" ? "living" : "neutral")}<p>${esc(LANG === "en" ? SOURCE_EN[source.id][1] : source.limitations_zh)}</p></article>`).join("")}</div></section>
      <section id="assumptions"><h2>12 · ${LANG === "en" ? "Unknowns and future professional deepening" : "未知项与未来专业深化"}</h2><div class="unknown-grid">${DATA.unknowns.map((item) => `<article><code>${item.id}</code><h3>${esc(LANG === "en" ? UNKNOWN_EN[item.id][0] : item.title_zh)}</h3><p>${esc(LANG === "en" ? UNKNOWN_EN[item.id][1] : item.robust_response_zh)}</p></article>`).join("")}</div></section>
    </section>`;
  }

  const RENDERERS = {theater: renderTheater, population: renderPopulation, niches: renderNiches, lineage: renderLineage, fossils: renderFossils, agents: renderAgents, intervention: renderIntervention, transfer: renderTransfer, dossier: renderDossier};

  function setGeneration(value, rerender = true) {
    state.generation = clamp(Number(value) || 0, 0, 40);
    state.selectedId = generationSummary().specimen_id;
    state.phase = "retention";
    if (rerender) render(currentView());
  }

  function stopPlayback() {
    if (playbackTimer) window.clearTimeout(playbackTimer);
    playbackTimer = null;
    state.playing = false;
  }

  function schedulePlaybackTick() {
    if (!state.playing) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const delay = reducedMotion ? 1200 : Math.round(620 / state.playbackSpeed);
    playbackTimer = window.setTimeout(() => {
      if (!state.playing) return;
      const phaseIndex = PLAYBACK_PHASES.indexOf(state.phase);
      if (phaseIndex < PLAYBACK_PHASES.length - 1) {
        state.phase = PLAYBACK_PHASES[phaseIndex + 1];
      } else if (state.generation < 40) {
        state.generation += 1;
        state.selectedId = generationSummary().specimen_id;
        state.phase = "variation";
      } else {
        stopPlayback();
        state.phase = "retention";
      }
      render(currentView());
      schedulePlaybackTick();
    }, delay);
  }

  function togglePlayback() {
    if (state.playing) { stopPlayback(); render(currentView()); return; }
    if (state.generation >= 40) {
      state.generation = 0;
      state.selectedId = generationSummary().specimen_id;
    }
    state.playing = true;
    state.phase = state.generation === 0 ? "variation" : state.phase;
    render(currentView());
    schedulePlaybackTick();
  }

  function bindCommonEvents() {
    document.getElementById("toggle-play")?.addEventListener("click", togglePlayback);
    document.getElementById("generation-prev")?.addEventListener("click", () => { stopPlayback(); setGeneration(state.generation - 1); });
    document.getElementById("generation-next")?.addEventListener("click", () => { stopPlayback(); setGeneration(state.generation + 1); });
    document.getElementById("generation-range")?.addEventListener("input", (event) => { stopPlayback(); setGeneration(event.target.value); });
    root.querySelectorAll("[data-generation]").forEach((button) => button.addEventListener("click", () => { stopPlayback(); setGeneration(button.dataset.generation); }));
    root.querySelectorAll("[data-individual]").forEach((button) => button.addEventListener("click", () => {
      state.selectedId = button.dataset.individual;
      state.generation = individual().generation;
      location.hash = "lineage";
      render("lineage");
    }));
    root.querySelectorAll("[data-open-lineage]").forEach((button) => button.addEventListener("click", () => {
      state.selectedId = button.dataset.openLineage;
      location.hash = "lineage";
      render("lineage");
    }));
    root.querySelectorAll("[data-niche-time]").forEach((button) => button.addEventListener("click", () => { state.nicheTime = button.dataset.nicheTime; render("niches"); }));
    root.querySelectorAll("[data-view-jump]").forEach((button) => button.addEventListener("click", () => {
      stopPlayback();
      location.hash = button.dataset.viewJump;
      render(button.dataset.viewJump);
    }));
    root.querySelectorAll("[data-operator-focus]").forEach((button) => button.addEventListener("click", () => {
      stopPlayback();
      state.operatorFocus = button.dataset.operatorFocus;
      const match = RESULT.individuals.find((candidate) => candidate.generation === state.generation && candidate.command?.operator_id === state.operatorFocus)
        || RESULT.individuals.find((candidate) => candidate.command?.operator_id === state.operatorFocus);
      if (match) {
        state.selectedId = match.id;
        state.generation = match.generation;
        location.hash = "lineage";
        render("lineage");
      }
    }));
    document.getElementById("fossil-filter")?.addEventListener("change", (event) => { state.fossilReason = event.target.value; render("fossils"); });
  }

  function render(view = currentView()) {
    try {
      root.classList.remove("loading-state");
      root.innerHTML = RENDERERS[view]();
      document.querySelectorAll("[data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
      bindCommonEvents();
      runState.textContent = state.playing
        ? `${LANG === "en" ? "LIVE EVOLUTION" : "演化运行中"} · D${state.generation} · ${state.phase.toUpperCase()}`
        : C.ready;
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      fatal.hidden = true;
      if (!state.playing) window.scrollTo({top: 0, behavior: "instant"});
    } catch (error) {
      console.error(error);
      fatal.hidden = false;
      fatal.textContent = `${LANG === "en" ? "Observatory render error" : "观测站渲染错误"}: ${error.message}`;
      root.innerHTML = "";
    }
  }

  function initialise() {
    try {
      if (!DATA || !Engine) throw new Error("local data or evolution engine is missing");
      RESULT = Engine.run(DATA);
      TRANSFERS = Engine.runTransferTests(DATA);
      if (RESULT.tested_individual_count !== 1440) throw new Error("deterministic population count mismatch");
      runState.textContent = C.ready;
      document.getElementById("data-hash").textContent = `SHA-256 ${String(window.EVOLUTION_DATA_SHA256 || "unknown").slice(0, 12)}`;
      window.addEventListener("hashchange", () => { stopPlayback(); render(); });
      navToggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); navToggle.setAttribute("aria-expanded", String(open)); });
      document.getElementById("reset-view").addEventListener("click", () => { stopPlayback(); Object.assign(state, {generation: 0, selectedId: "S03-D0-I000", nicheTime: "high", fossilReason: "all", phase: "retention", playbackSpeed: 1}); location.hash = "theater"; render("theater"); });
      window.addEventListener("keydown", (event) => {
        if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
        if (event.code === "Space" && currentView() === "theater") { event.preventDefault(); togglePlayback(); }
        if (event.code === "ArrowLeft") { event.preventDefault(); stopPlayback(); setGeneration(state.generation - 1); }
        if (event.code === "ArrowRight") { event.preventDefault(); stopPlayback(); setGeneration(state.generation + 1); }
      });
      if (!location.hash) history.replaceState(null, "", "#theater");
      render();
    } catch (error) {
      console.error(error);
      root.classList.remove("loading-state");
      fatal.hidden = false;
      fatal.textContent = `${LANG === "en" ? "Engine initialization failed" : "演化引擎初始化失败"}: ${error.message}`;
    }
  }

  initialise();
})();
