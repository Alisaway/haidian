(function (root, factory) {
  const simulator = typeof module === "object" && module.exports ? require("./digital-user-simulator.js") : root.ECSDigitalUserSimulator;
  const api = factory(simulator);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ECSPublicEvolution = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (Simulator) {
  "use strict";
  if (!Simulator) throw new Error("ECSDigitalUserSimulator is required before ECSPublicEvolution");

  const GENES = Object.freeze({
    transverse_route: gene("GENE-TRANSVERSE-ROUTE", "A-DIRECT-LINK", "path_strategy", "连续横向步行路径", "Continuous transverse walking route", "connection"),
    station_interface: gene("GENE-STATION-INTERFACE", "A-DIRECT-LINK", "spatial_rule", "站口—成府路清晰接口", "Legible station–Chengfu Road interface", "connection"),
    step_free_priority: gene("GENE-STEP-FREE", "A-DIRECT-LINK", "service_rule", "无障碍优先", "Step-free priority", "connection"),
    old_station_commons: gene("GENE-OLD-STATION-COMMONS", "B-PUBLIC-LIFE", "public_space", "旧站公共客厅", "Old-station commons", "public_life"),
    metro_stay: gene("GENE-METRO-STAY", "B-PUBLIC-LIFE", "facility", "站口停留与遮阴", "Metro-edge stay and shade", "public_life"),
    public_edge: gene("GENE-PUBLIC-EDGE", "B-PUBLIC-LIFE", "ground_floor_rule", "首层公共接口", "Public ground-floor interface", "public_life"),
    timed_access: gene("GENE-TIMED-ACCESS", "C-TIME-SHARE", "operating_rule", "分时开放通道", "Timed-access passage", "time_sharing"),
    quiet_protocol: gene("GENE-QUIET-PROTOCOL", "C-TIME-SHARE", "operating_rule", "夜间安静协议", "Night-time quiet protocol", "time_sharing"),
    delivery_window: gene("GENE-DELIVERY-WINDOW", "C-TIME-SHARE", "operating_rule", "分时装卸窗口", "Timed delivery window", "time_sharing"),
    redundant_route: gene("GENE-REDUNDANT-ROUTE", "adaptation", "path_strategy", "关键通道冗余", "Redundant critical route", "connection")
  });
  const GENE_BY_ID = new Map(Object.values(GENES).map((item) => [item.id, item]));
  const PARENT_GENE_IDS = Object.freeze({
    "A-DIRECT-LINK": [GENES.transverse_route.id, GENES.station_interface.id, GENES.step_free_priority.id],
    "B-PUBLIC-LIFE": [GENES.old_station_commons.id, GENES.metro_stay.id, GENES.public_edge.id],
    "C-TIME-SHARE": [GENES.timed_access.id, GENES.quiet_protocol.id, GENES.delivery_window.id]
  });
  const DIRECTIONS = Object.freeze({arrival_rate: "max", median_distance_m: "min", p90_distance_m: "min", accessible_failures: "min", overloaded_edge_count: "min", quiet_conflict_count: "min", reached_dwell_node_count: "max"});

  function gene(id, source, objectType, labelZh, labelEn, family) { return {id, source, object_type: objectType, label_zh: labelZh, label_en: labelEn, family}; }
  function unique(values) { return [...new Set(values)]; }
  function runVariants(baseNetwork, users, variants, scenarios = Simulator.SCENARIOS) {
    const runs = [];
    variants.forEach((variant) => scenarios.forEach((scenario) => runs.push(Simulator.runScenario(baseNetwork, variant, scenario, users))));
    return runs;
  }
  function scenarioVector(runs, planId, scenarioId) { return runs.find((run) => run.plan_id === planId && run.scenario_id === scenarioId)?.metrics || null; }
  function dominates(left, right) {
    let strictlyBetter = false;
    for (const [metric, direction] of Object.entries(DIRECTIONS)) {
      const a = left?.[metric], b = right?.[metric];
      if (a === null || b === null || a === undefined || b === undefined) continue;
      if (direction === "max") { if (a < b) return false; if (a > b) strictlyBetter = true; }
      else { if (a > b) return false; if (a < b) strictlyBetter = true; }
    }
    return strictlyBetter;
  }
  function paretoSet(runs, variants, scenarioId) {
    return variants.filter((candidate) => {
      const current = scenarioVector(runs, candidate.id, scenarioId);
      return current && !variants.some((other) => other.id !== candidate.id && dominates(scenarioVector(runs, other.id, scenarioId), current));
    }).map((variant) => variant.id);
  }

  function evaluateParentGenes(round1Runs) {
    const aClosure = scenarioVector(round1Runs, "A-DIRECT-LINK", "PARTIAL-CLOSURE");
    const bDaily = scenarioVector(round1Runs, "B-PUBLIC-LIFE", "DAILY-LIFE");
    const bPeak = scenarioVector(round1Runs, "B-PUBLIC-LIFE", "AM-COMMUTE");
    const cDaily = scenarioVector(round1Runs, "C-TIME-SHARE", "DAILY-LIFE");
    const cEvening = scenarioVector(round1Runs, "C-TIME-SHARE", "EVENING-QUIET");
    const decisions = [
      decision(GENES.transverse_route.id, "adjust", "A-DIRECT-LINK", "PARTIAL-CLOSURE", {arrival_rate: aClosure.arrival_rate}, `直连在入口关闭时到达率降至 ${aClosure.arrival_rate}，保留连接方向并要求备用路径。`, `Arrival falls to ${aClosure.arrival_rate} under entrance closure. Retain the connection but require a backup.`),
      decision(GENES.station_interface.id, "retain", "A-DIRECT-LINK", "AM-COMMUTE", {}, "站口—成府路接口作为公共通行骨架保留。", "Retain the station–Chengfu interface as public-access structure."),
      decision(GENES.step_free_priority.id, "retain", "A-DIRECT-LINK", "AM-COMMUTE", {accessible_failures: 0}, "已知网络条件下无障碍角色没有使用台阶，规则保留；未标注坡度仍为 unknown。", "No step-free user traverses known steps, so the rule remains; untagged slopes stay unknown."),
      decision(GENES.old_station_commons.id, bDaily.reached_dwell_node_count > 0 ? "retain" : "dormant", "B-PUBLIC-LIFE", "DAILY-LIFE", {reached_dwell_node_count: bDaily.reached_dwell_node_count}, `旧站公共客厅被模拟路径触达，作为公共生活基因保留。`, "Simulated paths reach the old-station commons, so the public-life gene is retained."),
      decision(GENES.metro_stay.id, bDaily.reached_dwell_node_count > 1 ? "retain" : "adjust", "B-PUBLIC-LIFE", "DAILY-LIFE", {reached_dwell_node_count: bDaily.reached_dwell_node_count}, "站口停留节点被触达，但夜间容量需随安静规则调整。", "The metro dwell node is reached, but its evening capacity must follow the quiet protocol."),
      decision(GENES.public_edge.id, bPeak.overloaded_edge_count > 90 ? "adjust" : "retain", "B-PUBLIC-LIFE", "AM-COMMUTE", {overloaded_edge_count: bPeak.overloaded_edge_count}, `高峰相对拥挤边为 ${bPeak.overloaded_edge_count}，保留公共接口但提高疏散与容量要求。`, `The peak crowd proxy reaches ${bPeak.overloaded_edge_count}; retain the public interface but raise capacity requirements.`),
      decision(GENES.timed_access.id, cDaily.arrival_rate === 1 ? "retain" : "adjust", "C-TIME-SHARE", "DAILY-LIFE", {arrival_rate: cDaily.arrival_rate, median_distance_m: cDaily.median_distance_m}, "白天分时通道保持完整到达，作为时间基因保留。", "Timed daytime access preserves complete arrival and is retained."),
      decision(GENES.quiet_protocol.id, cEvening.quiet_conflict_count > 0 ? "adjust" : "retain", "C-TIME-SHARE", "EVENING-QUIET", {quiet_conflict_count: cEvening.quiet_conflict_count}, `原夜间规则仍记录 ${cEvening.quiet_conflict_count} 次安静敏感边接触，缩短活动时段并降低夜间停留容量。`, `The original evening rule records ${cEvening.quiet_conflict_count} contacts with quiet-sensitive edges; shorten activity hours and reduce evening dwell capacity.`, true),
      decision(GENES.delivery_window.id, "retain", "C-TIME-SHARE", "DAILY-LIFE", {}, "装卸窗口不改变慢层几何，作为可逆运营基因保留。", "The delivery window does not alter slow-layer geometry and remains a reversible operating gene.")
    ];
    if (aClosure.arrival_rate < 0.95) decisions.push(decision(GENES.redundant_route.id, "birth", "adaptation", "PARTIAL-CLOSURE", {trigger_arrival_rate: aClosure.arrival_rate}, "适应 Agent 根据单点失效证据生成备用通道基因。", "The Adaptation Agent creates a backup-route gene from single-point failure evidence."));
    return decisions;
  }
  function decision(objectId, action, sourcePlan, scenarioId, evidence, reasonZh, reasonEn, human = false) {
    return {id: `SEL-R1-${objectId}`, round: 1, object_id: objectId, action, source_plan_id: sourcePlan, scenario_id: scenarioId, evidence, reason_zh: reasonZh, reason_en: reasonEn, human_subject: false, human_confirmation_required: human};
  }
  function activeGenes(decisions) { return decisions.filter((item) => ["retain", "adjust", "birth"].includes(item.action)).map((item) => item.object_id); }

  function operationsFor(geneIds, round, index) {
    const genes = new Set(geneIds);
    const prefix = `R${round}-${index}`;
    const changes = [];
    if (genes.has(GENES.transverse_route.id) || genes.has(GENES.timed_access.id)) changes.push({id: `${prefix}-PRIMARY`, type: "connector", from: [116.3257003,39.9903338], to: [116.3314511,39.99152], step_free: genes.has(GENES.step_free_priority.id), relative_capacity: genes.has(GENES.public_edge.id) ? 1.2 : 1.05, open_hours: genes.has(GENES.timed_access.id) ? [6,22] : null, reversible: true, generated_from_gene_ids: geneIds});
    if (genes.has(GENES.redundant_route.id)) changes.push({id: `${prefix}-BACKUP`, type: "connector", from: [116.3261551,39.9903164], to: [116.3311838,39.9926874], step_free: true, relative_capacity: .8, reversible: true, generated_from_gene_ids: [GENES.redundant_route.id]});
    if (genes.has(GENES.station_interface.id) || genes.has(GENES.step_free_priority.id)) changes.push({id: `${prefix}-STATION-EDGE`, type: "edge_policy", match_name: "成府路", cost_factor: .86, step_free: genes.has(GENES.step_free_priority.id), relative_capacity: genes.has(GENES.public_edge.id) ? 1.18 : 1.05, reversible: true, generated_from_gene_ids: geneIds.filter((id) => [GENES.station_interface.id,GENES.step_free_priority.id,GENES.public_edge.id].includes(id))});
    if (genes.has(GENES.old_station_commons.id)) changes.push({id: `${prefix}-OLD-COMMONS`, type: "dwell_node", coordinate: [116.3257003,39.9903338], dwell_capacity: 28, open_hours: genes.has(GENES.quiet_protocol.id) ? [8,20] : null, reversible: true, generated_from_gene_ids: [GENES.old_station_commons.id]});
    if (genes.has(GENES.metro_stay.id)) changes.push({id: `${prefix}-METRO-STAY`, type: "dwell_node", coordinate: [116.3317163,39.9913979], dwell_capacity: genes.has(GENES.quiet_protocol.id) ? 20 : 32, quiet_sensitive: true, open_hours: genes.has(GENES.quiet_protocol.id) ? [6,20] : null, reversible: true, generated_from_gene_ids: [GENES.metro_stay.id, ...(genes.has(GENES.quiet_protocol.id) ? [GENES.quiet_protocol.id] : [])]});
    if (genes.has(GENES.public_edge.id)) changes.push({id: `${prefix}-PUBLIC-EDGE`, type: "edge_policy", match_highway: ["pedestrian","footway","path"], cost_factor: .92, relative_capacity: 1.12, reversible: true, generated_from_gene_ids: [GENES.public_edge.id]});
    if (genes.has(GENES.quiet_protocol.id)) changes.push({id: `${prefix}-QUIET`, type: "edge_policy", match_name: "成府路", quiet_sensitive: true, cost_factor: .96, reversible: true, generated_from_gene_ids: [GENES.quiet_protocol.id]});
    if (genes.has(GENES.delivery_window.id)) changes.push({id: `${prefix}-DELIVERY`, type: "operating_rule", open_hours: [10,16], reversible: true, generated_from_gene_ids: [GENES.delivery_window.id]});
    return changes;
  }
  function spatialObjects(geneIds) {
    const genes = new Set(geneIds), objects = [];
    if (genes.has(GENES.transverse_route.id)) objects.push({id:"OBJ-TRANSVERSE",type:"path",name_zh:"旧站—成府路—五道口连续路径",name_en:"Old station–Chengfu–Wudaokou route",geometry:{type:"LineString",coordinates:[[116.32570,39.99033],[116.3279,39.99105],[116.33145,39.99152]]},state:"fast_reversible",evidence_status:"simulated_design"});
    if (genes.has(GENES.redundant_route.id)) objects.push({id:"OBJ-BACKUP",type:"path",name_zh:"入口关闭时的备用连接",name_en:"Backup link under entrance closure",geometry:{type:"LineString",coordinates:[[116.32616,39.99032],[116.3287,39.99185],[116.33118,39.99269]]},state:"fast_reversible",evidence_status:"simulated_design"});
    if (genes.has(GENES.old_station_commons.id)) objects.push({id:"OBJ-OLD-COMMONS",type:"public_space",name_zh:"清华园旧站公共客厅",name_en:"Old-station commons",geometry:{type:"Point",coordinates:[116.32570,39.99033]},state:"medium_professional_review",evidence_status:"simulated_design"});
    if (genes.has(GENES.metro_stay.id)) objects.push({id:"OBJ-METRO-EDGE",type:"public_space",name_zh:"五道口站口停留与遮阴",name_en:"Wudaokou station-edge stay and shade",geometry:{type:"Point",coordinates:[116.33172,39.99140]},state:"fast_reversible",evidence_status:"simulated_design"});
    if (genes.has(GENES.public_edge.id)) objects.push({id:"OBJ-GROUND-FLOOR",type:"ground_floor_interface",name_zh:"成府路沿街首层公共接口",name_en:"Chengfu Road public ground-floor interface",geometry:{type:"LineString",coordinates:[[116.3271,39.99112],[116.3309,39.99151]]},state:"medium_conditional",evidence_status:"simulated_design"});
    if (genes.has(GENES.delivery_window.id)) objects.push({id:"OBJ-TIMED-CURB",type:"operating_zone",name_zh:"站口分时装卸与安静路缘",name_en:"Timed delivery and quiet curb",geometry:{type:"Point",coordinates:[116.3320,39.99134]},state:"fast_reversible",evidence_status:"simulated_design"});
    return objects;
  }
  function sectionDefinition() { return {id:"SECTION-S03-TRANSVERSE",status:"relational_not_dimensioned",unknowns:["verified_road_redline","sidewalk_width","cycle_width","ground_floor_setback","gate_position"],bands:[{id:"GROUND-FLOOR",label_zh:"北侧首层接口",label_en:"North ground-floor interface",layer:"medium"},{id:"WALK",label_zh:"连续步行与无障碍边",label_en:"Continuous walking and step-free edge",layer:"fast"},{id:"ROAD",label_zh:"成府路基本通行",label_en:"Chengfu Road movement",layer:"slow"},{id:"CYCLE-STAY",label_zh:"骑行、停留与遮阴",label_en:"Cycling, stay and shade",layer:"fast"},{id:"PARK-PORTAL",label_zh:"京张遗址公园门户",label_en:"Jingzhang heritage-park portal",layer:"slow"}]}; }
  function nodeDefinitions() { return [{id:"NODE-OLD",name_zh:"清华园旧站公共客厅",name_en:"Old-station commons",focus:["heritage_visibility","dwell","quiet_after_20"],unknowns:["verified_entrance","fire_access"]},{id:"NODE-METRO",name_zh:"五道口站口适应界面",name_en:"Wudaokou adaptive interface",focus:["transfer","shade","timed_curb"],unknowns:["station_clearance","kerb_geometry"]},{id:"NODE-GROUND",name_zh:"成府路首层公共接口",name_en:"Chengfu ground-floor interface",focus:["conditional_opening","offline_service","delivery_window"],unknowns:["ownership","door_positions"]}]; }

  function deriveRound2Variants(decisions) {
    const surviving = new Set(activeGenes(decisions));
    const pairings = [["A-DIRECT-LINK","B-PUBLIC-LIFE"],["B-PUBLIC-LIFE","C-TIME-SHARE"],["A-DIRECT-LINK","C-TIME-SHARE"]];
    const names = [["连通公共客厅","Linked commons"],["分时公共客厅","Timed commons"],["分时韧性连接","Time-resilient link"]];
    return pairings.map((parents, index) => {
      let geneIds = unique(parents.flatMap((parent) => PARENT_GENE_IDS[parent]).filter((id) => surviving.has(id)));
      if (parents.includes("A-DIRECT-LINK") && surviving.has(GENES.redundant_route.id)) geneIds.push(GENES.redundant_route.id);
      geneIds = unique(geneIds);
      return {id:`R2-GENERATED-${index+1}`,round:2,parent_ids:parents,name_zh:names[index][0],name_en:names[index][1],generated_by:"AG-ADAPTATION+crossover_rule",gene_ids:geneIds,simulated_changes:operationsFor(geneIds,2,index+1),spatial_objects:spatialObjects(geneIds)};
    });
  }
  function chooseConditional(round2Variants, round2Runs, mode) {
    const viable = round2Variants.filter((variant) => Simulator.SCENARIOS.every((scenario) => scenarioVector(round2Runs,variant.id,scenario.id).accessible_failures === 0));
    const sorted = [...viable].sort((left,right) => {
      const l = scenarioVector(round2Runs,left.id,mode === "direct" ? "AM-COMMUTE" : "EVENING-QUIET");
      const r = scenarioVector(round2Runs,right.id,mode === "direct" ? "AM-COMMUTE" : "EVENING-QUIET");
      if (mode === "direct") return (l.median_distance_m-r.median_distance_m)||(l.overloaded_edge_count-r.overloaded_edge_count)||left.id.localeCompare(right.id);
      return (l.quiet_conflict_count-r.quiet_conflict_count)||(r.reached_dwell_node_count-l.reached_dwell_node_count)||(l.overloaded_edge_count-r.overloaded_edge_count)||left.id.localeCompare(right.id);
    });
    return sorted[0] || round2Variants[0];
  }
  function deriveRound3Variants(round2Variants, round2Runs) {
    const archiveIds = unique(Simulator.SCENARIOS.flatMap((scenario) => paretoSet(round2Runs,round2Variants,scenario.id)));
    const archive = round2Variants.filter((variant) => archiveIds.includes(variant.id));
    let mainGenes = unique(archive.flatMap((variant) => variant.gene_ids));
    for (const family of ["connection","public_life","time_sharing"]) if (!mainGenes.some((id) => GENE_BY_ID.get(id)?.family === family)) {
      const fallback = Object.values(GENES).find((item) => item.family === family); if (fallback) mainGenes.push(fallback.id);
    }
    const directParent = chooseConditional(round2Variants,round2Runs,"direct");
    const quietParent = chooseConditional(round2Variants,round2Runs,"quiet");
    const plans = [
      {id:"R3-CURRENT-PHENOTYPE",name_zh:"公共适应路径",name_en:"Public adaptation route",role:"current_recommendation",parent_ids:archiveIds,gene_ids:unique(mainGenes)},
      {id:"R3-DIRECT-CONDITIONAL",name_zh:"通勤优先条件型",name_en:"Commute-priority conditional",role:"conditional_alternative",parent_ids:[directParent.id],gene_ids:directParent.gene_ids,condition_zh:"入口权属、开放和无障碍条件经专业确认，且高峰通行优先。",condition_en:"Verified access, opening and step-free conditions with peak movement prioritised."},
      {id:"R3-QUIET-CONDITIONAL",name_zh:"安静生活条件型",name_en:"Quiet-life conditional",role:"conditional_alternative",parent_ids:[quietParent.id],gene_ids:quietParent.gene_ids,condition_zh:"夜间安静优先、活动规模受限且分时运营可靠。",condition_en:"Night-time quiet prioritised, limited activity scale and reliable timed operation."}
    ];
    return plans.map((plan,index) => ({...plan,round:3,generated_by:"QD-archive+AG-ADAPTATION",simulated_changes:operationsFor(plan.gene_ids,3,index+1),spatial_objects:spatialObjects(plan.gene_ids),typical_section:index===0?sectionDefinition():undefined,node_details:index===0?nodeDefinitions():undefined}));
  }
  function round2Events(round3Variants, round3Runs) {
    const main = round3Variants[0], closure = scenarioVector(round3Runs,main.id,"PARTIAL-CLOSURE");
    return [
      {id:"SEL-R2-ARCHIVE",round:2,object_id:main.id,action:"recombine",reason_zh:`四个情景的非支配档案共同贡献 ${main.gene_ids.length} 个基因，自动形成当前表型。`,reason_en:`Non-dominated archives across four scenarios contribute ${main.gene_ids.length} genes to the current phenotype.`,evidence:{arrival_rate_under_closure:closure.arrival_rate},human_subject:false},
      {id:"SEL-R2-PERMANENT-BUILD",round:2,object_id:"PERMANENT-STATION-HALL",action:"exit",reason_zh:"证据不足且属于不可逆建设，未进入下一轮；需正式门位、产权、消防与工程审查。",reason_en:"Insufficient evidence and irreversible construction keep this object out; verified gates, ownership, fire access and engineering review are required.",evidence:{status:"unknown",missing:["verified_gate","ownership","fire_access","engineering_review"]},human_subject:false}
    ];
  }

  function buildEvolution(baseline, round1Data) {
    const users = round1Data?.users || Simulator.generateUsers();
    const baseNetwork = Simulator.buildNetwork(baseline.features || []);
    const round1Variants = Simulator.VARIANTS.map((variant) => ({...variant,round:1,parent_ids:[],gene_ids:PARENT_GENE_IDS[variant.id],generated_by:"variation_agents"}));
    const round1Runs = round1Data?.runs || runVariants(baseNetwork,users,round1Variants);
    const round1Decisions = evaluateParentGenes(round1Runs);
    const round2Variants = deriveRound2Variants(round1Decisions);
    const round2Runs = runVariants(baseNetwork,users,round2Variants);
    const round3Variants = deriveRound3Variants(round2Variants,round2Runs);
    const round3Runs = runVariants(baseNetwork,users,round3Variants);
    const selectionEvents = [...round1Decisions,...round2Events(round3Variants,round3Runs)];
    const allVariants = [...round1Variants,...round2Variants,...round3Variants];
    const allRuns = [...round1Runs,...round2Runs,...round3Runs];
    return {
      schema_version:"2.0.0",random_seed:Simulator.SEED,title_zh:"三轮城市演化",title_en:"Three rounds of urban evolution",
      generation_method:{round1:"variation_agents",round2:"evidence_state+crossover_rule",round3:"pareto_archive+family_coverage+adaptation_agent",manual_variant_assembly:false,language_model_geometry_execution:false},
      public_story:[{round:0,label_zh:"真实现状",label_en:"Real baseline",object:"public_evidence"},{round:1,label_zh:"三种尝试",label_en:"Three attempts",variant_ids:round1Variants.map((v)=>v.id)},{round:2,label_zh:"证据驱动重组",label_en:"Evidence-driven recombination",variant_ids:round2Variants.map((v)=>v.id)},{round:3,label_zh:"当前推荐",label_en:"Current recommendation",variant_ids:round3Variants.map((v)=>v.id)}],
      genes:Object.values(GENES),variants:allVariants,runs:allRuns,
      pareto_archives:[1,2,3].flatMap((round)=>{const variants=allVariants.filter((v)=>v.round===round),runs=round===1?round1Runs:round===2?round2Runs:round3Runs;return Simulator.SCENARIOS.map((scenario)=>({round,scenario_id:scenario.id,plan_ids:paretoSet(runs,variants,scenario.id)}));}),
      selection_events:selectionEvents,
      lineage_events:allVariants.map((variant)=>({id:`LINEAGE-${variant.id}`,variant_id:variant.id,round:variant.round,parent_ids:variant.parent_ids,gene_ids:variant.gene_ids,status:variant.role||"tested",generated_by:variant.generated_by})),
      current_recommendation_id:"R3-CURRENT-PHENOTYPE",conditional_alternative_ids:["R3-DIRECT-CONDITIONAL","R3-QUIET-CONDITIONAL"],
      recommendation_rule:{aggregate_metric:null,hard_requirements:["all_scenarios_route_tested","no_known_step_free_failure","heritage_lock_unchanged","reversible_first","one_gene_from_each_public_need"],explanation_zh:"主推荐由四情景非支配档案的基因并集、三类公共需求覆盖和可逆优先规则生成；不是预写总分冠军。",explanation_en:"The recommendation is generated from the gene union of four scenario Pareto archives, coverage of three public-need families and reversibility-first rules—not a prewritten total-score winner."},
      fossil_archive:selectionEvents.filter((event)=>event.action==="exit"),human_interventions:selectionEvents.filter((event)=>event.human_confirmation_required),
      disclaimer_zh:"所有路线、使用和反馈均为设计推演，不代表真实公众意见或实施结果。",disclaimer_en:"All routes, use and feedback are design simulations, not real public opinion or implementation results."
    };
  }
  return {GENES,DIRECTIONS,dominates,paretoSet,evaluateParentGenes,deriveRound2Variants,deriveRound3Variants,buildEvolution};
});
