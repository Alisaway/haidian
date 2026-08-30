(function (root, factory) {
  const simulator = typeof module === "object" && module.exports ? require("./digital-user-simulator.js") : root.ECSDigitalUserSimulator;
  const evolution = typeof module === "object" && module.exports ? require("./public-evolution.js") : root.ECSPublicEvolution;
  const api = factory(simulator, evolution);
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ECSSensitivityAnalysis = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (Simulator, Evolution) {
  "use strict";
  const SEEDS = Object.freeze([20260820, 20260821, 20260822, 20260823, 20260824]);

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function runCurrent(baseNetwork, users, variant, scenarios) { return scenarios.map((scenario) => Simulator.runScenario(baseNetwork, variant, scenario, users)); }
  function metric(runs, scenarioId, key) { return runs.find((run) => run.scenario_id === scenarioId)?.metrics[key] ?? null; }
  function range(values) { const finite = values.filter(Number.isFinite); return finite.length ? {min:Math.min(...finite),max:Math.max(...finite)} : {min:null,max:null}; }

  function parameterCases(baseNetwork, baseUsers, current) {
    const cases = [
      {id:"CROWD-LOW",label_zh:"相对拥挤压力 -30%",label_en:"Relative crowd pressure -30%",users:baseUsers,scenarios:Simulator.SCENARIOS.map((item)=>({...item,crowd_factor:item.crowd_factor*.7})),variant:current},
      {id:"CROWD-HIGH",label_zh:"相对拥挤压力 +30%",label_en:"Relative crowd pressure +30%",users:baseUsers,scenarios:Simulator.SCENARIOS.map((item)=>({...item,crowd_factor:item.crowd_factor*1.3})),variant:current},
      {id:"WALK-SLOW",label_zh:"全体步行速度 -15%",label_en:"Walking speed -15%",users:baseUsers.map((user)=>({...user,speed:user.speed*.85})),scenarios:Simulator.SCENARIOS,variant:current},
      {id:"OPEN-SHORT",label_zh:"主通道 20:00 关闭",label_en:"Primary link closes at 20:00",users:baseUsers,scenarios:Simulator.SCENARIOS,variant:{...current,simulated_changes:current.simulated_changes.map((change)=>change.type==="connector"&&/PRIMARY/.test(change.id)?{...change,open_hours:[7,20]}:change)}},
      {id:"QUIET-STRICT",label_zh:"夜间安静避让权重提高",label_en:"Higher night-time quiet avoidance",users:baseUsers,scenarios:Simulator.SCENARIOS.map((item)=>item.id==="EVENING-QUIET"?{...item,quiet_weight:1.4}:item),variant:current}
    ];
    return cases.map((item)=>{
      const runs=runCurrent(baseNetwork,item.users,item.variant,item.scenarios);
      return {id:item.id,label_zh:item.label_zh,label_en:item.label_en,evidence_status:"sensitivity_design",metrics:{am_median_distance_m:metric(runs,"AM-COMMUTE","median_distance_m"),am_median_time_s:metric(runs,"AM-COMMUTE","median_travel_time_s"),closure_arrival_rate:metric(runs,"PARTIAL-CLOSURE","arrival_rate"),closure_accessible_failures:metric(runs,"PARTIAL-CLOSURE","accessible_failures"),evening_quiet_affected_users:metric(runs,"EVENING-QUIET","quiet_conflict_count"),daily_dwell_nodes:metric(runs,"DAILY-LIFE","reached_dwell_node_count"),peak_crowd_proxy_edges:metric(runs,"AM-COMMUTE","overloaded_edge_count")}};
    });
  }

  function runSensitivity(baseline) {
    const seedRuns = SEEDS.map((seed)=>{
      const round1=Simulator.runPopulation(baseline,{seed});
      const result=Evolution.buildEvolution(baseline,round1);
      const current=result.variants.find((variant)=>variant.id===result.current_recommendation_id);
      const runs=result.runs.filter((run)=>run.plan_id===result.current_recommendation_id);
      return {seed,current_gene_ids:current.gene_ids,generated_parent_ids:current.parent_ids,metrics:{closure_arrival_rate:metric(runs,"PARTIAL-CLOSURE","arrival_rate"),closure_accessible_failures:metric(runs,"PARTIAL-CLOSURE","accessible_failures"),daily_dwell_nodes:metric(runs,"DAILY-LIFE","reached_dwell_node_count"),evening_quiet_affected_users:metric(runs,"EVENING-QUIET","quiet_conflict_count"),am_median_distance_m:metric(runs,"AM-COMMUTE","median_distance_m"),peak_crowd_proxy_edges:metric(runs,"AM-COMMUTE","overloaded_edge_count")}};
    });
    const baseNetwork=Simulator.buildNetwork(baseline.features||[]);
    const baseRound1=Simulator.runPopulation(baseline,{seed:SEEDS[0]});
    const baseEvolution=Evolution.buildEvolution(baseline,baseRound1);
    const current=baseEvolution.variants.find((variant)=>variant.id===baseEvolution.current_recommendation_id);
    const cases=parameterCases(baseNetwork,baseRound1.users,current);
    const geneFrequency={}; seedRuns.forEach((run)=>run.current_gene_ids.forEach((id)=>{geneFrequency[id]=(geneFrequency[id]||0)+1;}));
    const closureRange=range([...seedRuns.map((run)=>run.metrics.closure_arrival_rate),...cases.map((item)=>item.metrics.closure_arrival_rate)]);
    const accessibleRange=range([...seedRuns.map((run)=>run.metrics.closure_accessible_failures),...cases.map((item)=>item.metrics.closure_accessible_failures)]);
    const dwellRange=range([...seedRuns.map((run)=>run.metrics.daily_dwell_nodes),...cases.map((item)=>item.metrics.daily_dwell_nodes)]);
    const distanceRange=range([...seedRuns.map((run)=>run.metrics.am_median_distance_m),...cases.map((item)=>item.metrics.am_median_distance_m)]);
    const crowdRange=range([...seedRuns.map((run)=>run.metrics.peak_crowd_proxy_edges),...cases.map((item)=>item.metrics.peak_crowd_proxy_edges)]);
    const closureText=closureRange.min===closureRange.max?`${Math.round(closureRange.min*100)}%`:`${Math.round(closureRange.min*100)}%–${Math.round(closureRange.max*100)}%`;
    const dwellText=dwellRange.min===dwellRange.max?`${dwellRange.min}`:`${dwellRange.min}–${dwellRange.max}`;
    return {schema_version:"1.0.0",evidence_status:"sensitivity_design",not_observed_performance:true,seeds:SEEDS,seed_runs:seedRuns,parameter_cases:cases,gene_frequency:geneFrequency,stable_conclusions:[{id:"STABLE-BACKUP",stable:(geneFrequency["GENE-REDUNDANT-ROUTE"]||0)===SEEDS.length,statement_zh:"入口关闭证据在全部种子中触发备用路径基因。",statement_en:"Entrance-closure evidence triggers the backup-route gene under every seed."},{id:"STABLE-CLOSURE",stable:closureRange.min>=.95,statement_zh:`入口关闭到达率在全部扰动中保持 ${closureText}。`,statement_en:`Closure arrival remains ${closureText} across all perturbations.`},{id:"STABLE-ACCESS",stable:accessibleRange.max===0,statement_zh:"已知台阶条件下无障碍失败保持为 0；未知坡度不在此结论内。",statement_en:"Known-step accessibility failures remain zero; unknown slopes are outside this claim."},{id:"STABLE-DWELL",stable:dwellRange.min>=1,statement_zh:`公共停留节点在扰动中始终有 ${dwellText} 个被路径触达。`,statement_en:`${dwellText} public dwell nodes remain reached across perturbations.`}],sensitive_outputs:[{id:"SENSITIVE-TRAVEL",range:distanceRange,statement_zh:"绝对路径长度与时间随人群组成、速度和开放条件变化，不作为承诺。",statement_en:"Absolute path length and time vary with population, speed and opening assumptions."},{id:"SENSITIVE-CROWD",range:crowdRange,statement_zh:"拥挤边数量对容量代理敏感，只用于方案内比较。",statement_en:"Crowded-edge counts are sensitive to capacity proxies and only support within-model comparison."}],unknowns:["observed_pedestrian_flow","verified_sidewalk_width","verified_slope","verified_gate_hours","representative_public_feedback"]};
  }
  return {SEEDS,runSensitivity};
});
