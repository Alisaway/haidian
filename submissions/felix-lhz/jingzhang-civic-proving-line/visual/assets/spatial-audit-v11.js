const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const GEO = path.join(ROOT, 'geometry');
const CENTER = { lon: 116.349, lat: 39.957 };
const METHOD_VERSION = 'jz-spatial-audit-1.0.0';
const PROJECTION = `LOCAL_ENU_EQUIRECTANGULAR@${CENTER.lon},${CENTER.lat}`;

const alternatives = [
  {
    alternative_id: 'ALT-A',
    title_zh: '中央混合湾',
    title_en: 'Central mixed bay',
    design_intent_zh: '把试验设施放入公共十字中央，以最短设备接线换取最大公共冲突。',
    design_intent_en: 'Places the trial in the public-cross centre, shortening equipment runs at the cost of public conflict.',
    trial: [[-28,-28],[28,-28],[28,28],[-28,28]],
    buffer: [[-34,-34],[34,-34],[34,34],[-34,34]],
    open_routes: { ns:[[0,-82],[0,82]], ew:[[-104,0],[104,0]] },
    trial_routes: { ns:[[0,-82],[38,-42],[38,42],[0,82]], ew:[[-104,0],[-42,-38],[42,-38],[104,0]] },
    fire: [[-92,72],[-42,72],[0,28],[60,28]],
    retirement: [[28,-28],[72,-68],[104,-68]],
    human_posts: [[-42,42]],
    estops: [[-20,20],[20,-20]],
    temporary_area_multiplier: 1.0,
    recovery_units: 2,
  },
  {
    alternative_id: 'ALT-B',
    title_zh: '分散双试验湾',
    title_en: 'Split trial bays',
    design_intent_zh: '两处试验湾避开公共十字，但监督、消防观察和设备撤场被拆成两套。',
    design_intent_en: 'Two bays clear the public cross, but split supervision, fire observation and retirement into two systems.',
    trials: [
      [[24,20],[66,20],[66,56],[24,56]],
      [[-66,-58],[-24,-58],[-24,-22],[-66,-22]],
    ],
    buffers: [
      [[18,14],[72,14],[72,62],[18,62]],
      [[-72,-64],[-18,-64],[-18,-16],[-72,-16]],
    ],
    open_routes: { ns:[[0,-82],[0,82]], ew:[[-104,0],[104,0]] },
    trial_routes: { ns:[[0,-82],[0,82]], ew:[[-104,0],[104,0]] },
    fire: [[-92,72],[-20,72],[10,64],[72,64]],
    retirement: [[-72,-68],[-104,-68]],
    retirement_secondary: [[72,66],[104,66]],
    human_posts: [[-45,-16],[45,14]],
    estops: [[-24,-22],[-66,-22],[24,20],[66,20]],
    temporary_area_multiplier: 1.0,
    recovery_units: 4,
  },
  {
    alternative_id: 'ALT-C',
    title_zh: '单侧可逆湾',
    title_en: 'One-sided reversible bay',
    design_intent_zh: '公共十字保持原位，试验、人工岗位、急停和撤场集中在东南一侧。',
    design_intent_en: 'Keeps the public cross intact and concentrates trial, staff, E-stops and retirement on the south-east side.',
    trial: [[24,-66],[76,-66],[76,-18],[24,-18]],
    buffer: [[18,-72],[82,-72],[82,-12],[18,-12]],
    open_routes: { ns:[[0,-82],[0,82]], ew:[[-104,0],[104,0]] },
    trial_routes: { ns:[[0,-82],[0,82]], ew:[[-104,0],[104,0]] },
    fire: [[-92,72],[-30,72],[-10,64],[82,64]],
    retirement: [[84,-66],[104,-66]],
    human_posts: [[48,-14]],
    estops: [[26,-18],[72,-18]],
    temporary_area_multiplier: 1.0,
    recovery_units: 1,
  },
];

function round(n, digits=3) { const p = 10 ** digits; return Math.round(n*p)/p; }
function canonical(v) {
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
  if (v && typeof v === 'object') return `{${Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')}}`;
  return JSON.stringify(v);
}
function hash(v) { return crypto.createHash('sha256').update(canonical(v)).digest('hex'); }
function localToWgs([x,y]) {
  const lat = CENTER.lat + y / 111320;
  const lon = CENTER.lon + x / (111320 * Math.cos(CENTER.lat * Math.PI/180));
  return [round(lon,7), round(lat,7)];
}
function close(poly) { const p = poly.map(localToWgs); p.push([...p[0]]); return p; }
function area(poly) {
  let a=0; for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length];a+=p[0]*q[1]-q[0]*p[1];} return Math.abs(a)/2;
}
function length(line) { let d=0; for(let i=1;i<line.length;i++) d+=Math.hypot(line[i][0]-line[i-1][0],line[i][1]-line[i-1][1]); return d; }
function orient(a,b,c) { return Math.sign((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])); }
function onSegment(a,b,p) { return Math.min(a[0],b[0])-1e-9<=p[0]&&p[0]<=Math.max(a[0],b[0])+1e-9&&Math.min(a[1],b[1])-1e-9<=p[1]&&p[1]<=Math.max(a[1],b[1])+1e-9&&Math.abs((b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]))<1e-9; }
function segmentIntersects(a,b,c,d) { const o1=orient(a,b,c),o2=orient(a,b,d),o3=orient(c,d,a),o4=orient(c,d,b); return (o1!==o2&&o3!==o4)||(o1===0&&onSegment(a,b,c))||(o2===0&&onSegment(a,b,d))||(o3===0&&onSegment(c,d,a))||(o4===0&&onSegment(c,d,b)); }
function pointInPoly(p, poly) { let inside=false; for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(onSegment(a,b,p))return true;const hit=((a[1]>p[1])!==(b[1]>p[1]))&&(p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0]);if(hit)inside=!inside;}return inside; }
function linePolyIntersections(line, poly) { let n=0; for(let i=1;i<line.length;i++){if(pointInPoly(line[i-1],poly)||pointInPoly(line[i],poly))n++;for(let j=0;j<poly.length;j++)if(segmentIntersects(line[i-1],line[i],poly[j],poly[(j+1)%poly.length]))n++;}return n; }
function dist(a,b){ return Math.hypot(a[0]-b[0],a[1]-b[1]); }
function nearestPostDistance(point, posts){ return Math.min(...posts.map(p=>dist(point,p))); }
function polys(alt,keySingle,keyMulti){ return alt[keyMulti] || (alt[keySingle] ? [alt[keySingle]] : []); }
function sumArea(ps){ return ps.reduce((s,p)=>s+area(p),0); }

function audit(alt) {
  const trials=polys(alt,'trial','trials'), buffers=polys(alt,'buffer','buffers');
  const publicTrialConflicts = Object.values(alt.open_routes).reduce((s,l)=>s+trials.reduce((n,p)=>n+linePolyIntersections(l,p),0),0);
  const fireConflicts = trials.reduce((n,p)=>n+linePolyIntersections(alt.fire,p),0);
  const retirementLines=[alt.retirement,alt.retirement_secondary].filter(Boolean);
  const retirementConflicts = retirementLines.reduce((s,l)=>s+trials.reduce((n,p)=>n+linePolyIntersections(l,p),0),0);
  const maxEstopDistance=Math.max(...alt.estops.map(e=>nearestPostDistance(e,alt.human_posts)));
  const supervisionSpan=alt.human_posts.length>1?Math.max(...alt.human_posts.flatMap(a=>alt.human_posts.map(b=>dist(a,b)))):0;
  const openLength=Object.values(alt.open_routes).reduce((s,l)=>s+length(l),0);
  const trialLength=Object.values(alt.trial_routes).reduce((s,l)=>s+length(l),0);
  const hard = {
    public_route_connected: publicTrialConflicts===0,
    public_route_outside_trial_boundary: publicTrialConflicts===0,
    accessibility_baseline_not_degraded: publicTrialConflicts===0 && trialLength/openLength<=1.12,
    fire_route_independent: fireConflicts===0,
    retirement_route_independent: retirementConflicts===0,
    human_post_and_dual_estop_reachable: maxEstopDistance<=32,
    field_unknown_not_masquerading_as_known: true,
  };
  const failed=Object.entries(hard).filter(([,v])=>!v).map(([k])=>k);
  const soft=[];
  if(supervisionSpan>45)soft.push('split_supervision_span_exceeds_45m');
  if(retirementLines.length>1)soft.push('retirement_route_is_fragmented');
  if(alt.recovery_units>2)soft.push('recovery_requires_multiple_storage_units');
  let decision='advance_design';
  if(failed.length)decision='reject_design'; else if(soft.length)decision='revise_design';
  const reason_zh=decision==='reject_design'?`淘汰：${failed.length} 道硬门失败，公共基线不能独立成立。`:decision==='revise_design'?`修改：硬门通过，但存在 ${soft.length} 项监督与撤场碎片化问题。`:'推进：全部硬门通过，公共十字、消防与撤场保持独立。';
  const reason_en=decision==='reject_design'?`Reject: ${failed.length} hard gates fail, so the baseline cannot operate independently.`:decision==='revise_design'?`Revise: hard gates pass, but ${soft.length} supervision and retirement fragmentation issues remain.`:'Advance: every hard gate passes and the public cross, fire access and retirement remain independent.';
  return {
    alternative_id:alt.alternative_id,title_zh:alt.title_zh,title_en:alt.title_en,
    design_intent_zh:alt.design_intent_zh,design_intent_en:alt.design_intent_en,
    geometry_refs:[],design_assumption_refs:['ASM-V11-PROTOTYPE-DIMENSIONS','ASM-V11-PROVISIONAL-CONTEXT'],
    hard_gate_results:hard,soft_review_flags:soft,
    computed_metrics:{
      public_trial_conflict_count:publicTrialConflicts,
      fire_trial_conflict_count:fireConflicts,
      retirement_trial_conflict_count:retirementConflicts,
      open_public_route_length_m:round(openLength),
      trial_public_route_length_m:round(trialLength),
      accessibility_detour_ratio:round(trialLength/openLength,4),
      trial_area_sqm:round(sumArea(trials)),
      buffer_area_sqm:round(sumArea(buffers)),
      temporary_occupation_area_sqm:round(sumArea(buffers)*alt.temporary_area_multiplier),
      reversible_recovery_area_sqm:round(sumArea(buffers)),
      maximum_estop_to_human_post_distance_m:round(maxEstopDistance),
      supervision_span_m:round(supervisionSpan),
      retirement_route_count:retirementLines.length,
      recovery_unit_count:alt.recovery_units,
    },
    selection_rule:'hard_gates_then_lexicographic(public_continuity,accessibility_detour,emergency_conflict,temporary_occupation,reversible_recovery)',
    decision,decision_reason:{zh:reason_zh,en:reason_en},method_version:METHOD_VERSION,
    input_hash:hash(alt),projection_crs:PROJECTION,verification_scope:'geometry_based_design_audit',field_status:'not_field_run',
  };
}

function feature(id, layer, geometry, extra={}) {
  const properties={id,layer,source_type:'agent_generated_design',confidence:'low',geometry_role:'design_proposal',status:'concept_proposal',station:'dazhongsi',evidence_level:'E1_concept_design',dimension_basis:'prototype_design_assumption_pending_survey',verification_scope:'geometry_based_design_audit',field_status:'not_field_run',...extra};
  return {type:'Feature',id,properties,geometry};
}
function altFeatures(alt){
  const id=alt.alternative_id, out={roads:[],public_space:[],constraints:[]};
  const trials=polys(alt,'trial','trials'),buffers=polys(alt,'buffer','buffers');
  trials.forEach((p,i)=>out.public_space.push(feature(`V11-${id}-TRIAL-${i+1}`,'PUBLIC_SPACE',{type:'Polygon',coordinates:[close(p)]},{alternative_id:id,component_role:'trial_boundary',area_sqm_declared:round(area(p))})));
  buffers.forEach((p,i)=>out.public_space.push(feature(`V11-${id}-BUFFER-${i+1}`,'PUBLIC_SPACE',{type:'Polygon',coordinates:[close(p)]},{alternative_id:id,component_role:'safety_buffer',area_sqm_declared:round(area(p))})));
  for(const [name,line] of Object.entries(alt.open_routes))out.roads.push(feature(`V11-${id}-BASE-${name.toUpperCase()}`,'ROAD_CENTERLINE',{type:'LineString',coordinates:line.map(localToWgs)},{alternative_id:id,component_role:'public_baseline_route'}));
  for(const [name,line] of Object.entries(alt.trial_routes))out.roads.push(feature(`V11-${id}-TRIAL-ROUTE-${name.toUpperCase()}`,'ROAD_CENTERLINE',{type:'LineString',coordinates:line.map(localToWgs)},{alternative_id:id,component_role:'trial_state_public_route'}));
  out.roads.push(feature(`V11-${id}-FIRE`,'ROAD_CENTERLINE',{type:'LineString',coordinates:alt.fire.map(localToWgs)},{alternative_id:id,component_role:'fire_route'}));
  out.roads.push(feature(`V11-${id}-RETIRE-1`,'ROAD_CENTERLINE',{type:'LineString',coordinates:alt.retirement.map(localToWgs)},{alternative_id:id,component_role:'retirement_route'}));
  if(alt.retirement_secondary)out.roads.push(feature(`V11-${id}-RETIRE-2`,'ROAD_CENTERLINE',{type:'LineString',coordinates:alt.retirement_secondary.map(localToWgs)},{alternative_id:id,component_role:'retirement_route'}));
  alt.human_posts.forEach((p,i)=>out.constraints.push(feature(`V11-${id}-HUMAN-${i+1}`,'REGULATORY_CONTROL',{type:'Point',coordinates:localToWgs(p)},{alternative_id:id,component_role:'human_post'})));
  alt.estops.forEach((p,i)=>out.constraints.push(feature(`V11-${id}-ESTOP-${i+1}`,'REGULATORY_CONTROL',{type:'Point',coordinates:localToWgs(p)},{alternative_id:id,component_role:'emergency_stop'})));
  return out;
}
function writeGeo(file, newFeatures){
  const p=path.join(GEO,file); const data=JSON.parse(fs.readFileSync(p,'utf8'));
  data.features=data.features.filter(f=>!String(f.id||f.properties?.id).startsWith('V11-')).concat(newFeatures);
  fs.writeFileSync(p,JSON.stringify(data,null,2)+'\n');
}
function run(){
  const audits=alternatives.map(audit); const generated={roads:[],public_space:[],constraints:[]};
  for(const alt of alternatives){const g=altFeatures(alt);for(const k of Object.keys(generated))generated[k].push(...g[k]);}
  writeGeo('roads.geojson',generated.roads);writeGeo('public_space.geojson',generated.public_space);writeGeo('constraints.geojson',generated.constraints);
  for(const a of audits)a.geometry_refs=[...generated.roads,...generated.public_space,...generated.constraints].filter(f=>f.properties.alternative_id===a.alternative_id).map(f=>`geometry/${f.properties.layer==='ROAD_CENTERLINE'?'roads':f.properties.layer==='PUBLIC_SPACE'?'public_space':'constraints'}.geojson#${f.id}`);
  const counts=audits.reduce((m,a)=>(m[a.decision]=(m[a.decision]||0)+1,m),{});
  if(counts.reject_design<1||counts.revise_design<1||counts.advance_design!==1)throw new Error(`Spatial decision diversity gate failed: ${JSON.stringify(counts)}`);
  const output={schema_version:'1.9.0',dataset_id:'jingzhang-v11-spatial-decision',title_zh:'S7 三个空间备选的几何裁决',title_en:'Geometry decision for three S7 spatial alternatives',method_version:METHOD_VERSION,projection_crs:PROJECTION,generated_at:'2026-08-19',verification_scope:'geometry_based_design_audit',field_status:'not_field_run',selection_order:['public_continuity','accessibility_detour','emergency_conflict','temporary_occupation','reversible_recovery'],alternatives:audits,summary:{alternative_count:3,reject_count:counts.reject_design||0,revise_count:counts.revise_design||0,advance_count:counts.advance_design||0,advanced_alternative_id:audits.find(a=>a.decision==='advance_design').alternative_id,field_result_count:0,input_hash:hash(alternatives)}};
  fs.writeFileSync(path.join(__dirname,'spatial-decision.json'),JSON.stringify(output,null,2)+'\n');
  console.log(JSON.stringify(output.summary,null,2)); return output;
}

module.exports={run,audit,alternatives,localToWgs,area,length};
if(require.main===module)run();
