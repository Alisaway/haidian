"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
if (process.argv.length !== 3 || process.argv[2] !== "--check") { console.error("Usage: node visual/assets/check-ai-review-layer.js --check"); process.exit(2); }
const packageDir = path.resolve(__dirname, "..", "..");
const errors = [];
const fail = (message) => errors.push(message);
const readJson = (relative) => { try { return JSON.parse(fs.readFileSync(path.join(packageDir, relative), "utf8")); } catch (error) { fail(`${relative}: ${error.message}`); return {}; } };
const digest = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const history = [[89,"53ae6be5a3787ab225f187d6d39342cddbd6db6343d5558eb99d7a06a12fedb0"],[84,"34aeb29893414ae9eeace69348abf21fc4addbc511abfb0b23efb1364ebb4b9a"],[88,"5431dfdfd6e6fde1df6e68f66a48a737eef71eaf87abc38a8f57ef683bd68603"]];
const dimensionIds = ["brief_alignment","originality","ai_planning_innovation","implementation_feasibility","public_interest_inclusion","risk_compliance","expression_completeness"];
const old13 = ["0698f1a54aa0664d9ad346bd8174c3b20c6f02dd2076c8718914ccff25b068c9","1b3772b2251c73300e4da0b8a824ae0d89bfbcf24cf4cffe1a4a3992c9abdf9f"];
const page15 = ["35f096801673a461e1a351c5024be1225da4ced193cc28c046466471b3ec9307","0a80ee7b298d76bf67186ef602276f22e994657fc27134a7ce024f77ee6a5173"];
const ar013ClearanceStatus = "cleared_for_participant_declared_noncommercial_review_scope_without_provider_terms_evidence";
const ar013EvidenceScope = "generation_lineage_and_participant_limited_release_authorization";

const layer = readJson("visual/assets/ai-review-layer.json");
if (!Array.isArray(layer.review_history) || layer.review_history.length !== 3) fail("review_history must contain exactly 89, 84, 88");
else history.forEach(([score, hash], i) => { const item=layer.review_history[i]; if(item?.score_total!==score||item?.package_sha256!==hash||item?.historical!==true) fail(`review_history[${i}] must preserve ${score} and its SHA`); if("review_id" in item) fail(`review_history[${i}] must not invent review_id`); });
if (layer.review_history?.filter(x=>x.latest_historical===true).length!==1 || layer.review_history?.[2]?.latest_historical!==true) fail("only 88 may be latest_historical");
if(layer.latest_historical_review?.score_total!==88||layer.latest_historical_review?.package_sha256!==history[2][1]) fail("latest_historical_review must be 88 and its exact SHA");
const candidate=layer.current_candidate;
if(candidate?.review_state!=="unreviewed"||candidate?.score_total!==null||candidate?.formal_review!==false) fail("current_candidate must be unreviewed/null/not formal review");
if(candidate?.package_state!=="ready_for_maintainer_re_review"||candidate?.participant_remediation_status?.maintainer_re_review_required!==true||candidate?.participant_remediation_status?.publication_clearance!==true) fail("candidate must be cleared for limited scope and ready for required maintainer re-review");
const snap=layer.historical_84_review_snapshot;
if(snap?.score_total!==84||snap?.package_sha256!==history[1][1]) fail("84 rubric snapshot must bind score and SHA");
const rubric=snap?.rubric_dimensions;
if(!Array.isArray(rubric)||rubric.map(x=>x.id).join("|")!==dimensionIds.join("|")) fail("84 snapshot must retain seven ordered rubric dimensions");
else rubric.forEach((x,i)=>{if(!Number.isInteger(x.score)||x.score<0||x.score>x.score_max||!x.findings?.length||!x.evidence?.length||!x.boundaries?.length) fail(`84 rubric dimension ${i} is incomplete`);});
if(layer.rights_summary?.clearance_complete!==true||layer.rights_summary?.publication_clearance!==true||layer.rights_summary?.root_publication_evidence_gap_count!==0||layer.rights_summary?.root_publication_evidence_gap_ids?.length!==0) fail("layer rights summary must be true/true with no root gap");
const boundary=`${candidate?.claim_boundary||""} ${layer.rights_summary?.claim_boundary||""}`.toLowerCase();
for(const term of ["maintainer re-review","formal professional review","legal or statutory approval","commercial-use authorization","redistribute source assets independently"]) if(!boundary.includes(term)) fail(`claim boundary must disclaim ${term}`);

const translations=readJson("visual/assets/english-figure-translation.json");
for(const [index,page] of (translations.pages||[]).entries()) {
  const source=String(page?.source||"");
  if(!source) fail(`translation page ${index}: source is required`);
  if(/INTERNAL RESEARCH|内部研究/i.test(source)) fail(`translation page ${index}: obsolete research label remains in source`);
  if(/^[A-Za-z]:[\\/]/.test(source)) fail(`translation page ${index}: source must not be an absolute local path`);
  if(!source.startsWith("external-v13-source/")&&!source.startsWith("submissions\\varliuvar\\jingzhang-resonance\\assets\\source-v13-clean\\")) fail(`translation page ${index}: source must use a traceable neutral source identifier`);
}

const ledger=readJson("visual/assets/asset-rights-ledger.json");
const ar013=ledger.asset_groups?.find(x=>x.id==="AR-013"); const ar010=ledger.asset_groups?.find(x=>x.id==="AR-010");
const counts={component_record_count:34,unique_embedded_block_count:22,tokai_component_record_count:32,tokai_unique_embedded_block_count:20,oskyi_component_record_count:2,oskyi_unique_embedded_block_count:2};
for(const [key,value] of Object.entries(counts)) if(ar013?.component_lineage_summary?.[key]!==value) fail(`AR-013 ${key} must be ${value}`);
const records=ledger.component_level_records||[]; const tokai=records.filter(x=>x.provider?.provider==="Tokai"); const oskyi=records.filter(x=>x.provider?.provider==="Oskyi");
if(records.length!==34||tokai.length!==32||new Set(tokai.map(x=>x.source_embedded_sha256)).size!==20||oskyi.length!==2||new Set(oskyi.map(x=>x.source_embedded_sha256)).size!==2) fail("ledger population must be 34/22 = Tokai 32/20 + Oskyi 2/2");
const oskyiRun=ar013?.run_evidence;
if(oskyiRun?.api_url!=="https://api.oskyi.com/v1/chat/completions"||!String(oskyiRun?.response_id||"").startsWith("chatcmpl-")||![oskyiRun?.preflight_sha256,oskyiRun?.response_sha256,oskyiRun?.metadata_sha256].every(x=>/^[0-9a-f]{64}$/.test(String(x||"")))) fail("AR-013 Oskyi run evidence is incomplete");
oskyi.forEach(x=>{if(x.run_evidence_ref!=="asset_groups[id=AR-013].run_evidence") fail(`${x.asset_id}: Oskyi component must reference AR-013 run evidence`);});
records.forEach(x=>{const clearance=x.clearance||{}; if(/pending/i.test(String(clearance.status||""))||/pending/i.test(String(clearance.basis||""))) fail(`${x.asset_id}: component clearance must not remain pending`); if(clearance.status!==ar013ClearanceStatus||clearance.evidence_scope!==ar013EvidenceScope||clearance.provider_terms_basis!==null||clearance.commercial_or_standalone_reuse!==false) fail(`${x.asset_id}: limited participant-release clearance semantics are invalid`); if(!String(clearance.output_use_basis||"").includes("Participant-controlled inputs")) fail(`${x.asset_id}: output-use basis is missing`);});
tokai.forEach(x=>{if(x.provider.provider_response_id!==null||x.generation_record?.provider_response_id!==null) fail(`${x.asset_id}: Tokai provider id must be null`); if(!x.provider.local_archive_key||x.provider.local_archive_key!==x.generation_record?.local_archive_key) fail(`${x.asset_id}: independent local archive key is invalid`); if(x.provider_terms_evidence!==null) fail(`${x.asset_id}: provider terms evidence must be null`);});
const ar013Semantics=ledger.disposition_semantics?.ar013_cleared_with_evidence;
if(ar013?.clearance_state!=="cleared_for_declared_limited_review_scope"||ar013?.public_disposition!=="cleared_with_evidence"||ar013?.evidence_scope!==ar013EvidenceScope||ar013?.provider_terms_evidence!==null||ar013?.provider_terms_authorization_claimed!==false||ar013?.commercial_or_standalone_reuse!==false) fail("AR-013 group clearance semantics are invalid");
if(ar013Semantics?.evidence_scope!==ar013EvidenceScope||ar013Semantics?.provider_terms_evidence!==null||ar013Semantics?.provider_terms_authorization_claimed!==false||ar013Semantics?.commercial_or_standalone_reuse!==false||!/participant/i.test(ar013Semantics?.meaning||"")) fail("AR-013 cleared_with_evidence semantics must mean lineage plus participant limited release, not provider terms");
page15.forEach(hash=>{if(!ar010?.exact_component_mappings?.some(x=>x.embedded_raster_sha256===hash)) fail(`page15 ${hash} must map exactly to AR-010`); if(records.some(x=>x.source_embedded_sha256===hash)) fail(`page15 ${hash} must not remain in AR-013`);});
try { const svg=fs.readFileSync(path.join(packageDir,"assets/source-v13-clean/jingzhang_analysis_v13_pilot_13_dazhongsi.clean.svg"),"utf8"); const hashes=[...svg.matchAll(/data:image\/[a-zA-Z0-9.+-]+;base64,([^"'\s]+)/g)].map(m=>digest(Buffer.from(m[1],"base64"))); old13.forEach(hash=>{if(svg.includes(hash)||hashes.includes(hash)) fail(`old page13 hash remains: ${hash}`);}); } catch(error){fail(`page13 clean SVG: ${error.message}`);}

const disposition=readJson("visual/assets/asset-clearance-disposition.json"); const sources=readJson("sources.json"); const compliance=readJson("compliance_matrix.json"); const depth=readJson("design_depth_matrix.json"); const finalGates=readJson("visual/assets/final-gates.json");
const sourceSummary=sources.sources?.find(x=>x.id==="AI-REVIEW-LAYER")?.ai_review_input_summary;
const complianceSummary=compliance.requirements?.find(x=>x.requirement_id==="agent.6")?.ai_review_structured_summary;
const depthSummary=depth.items?.map(x=>x.ai_review_structured_summary).find(x=>x?.score_total===88&&x?.candidate_review_state==="unreviewed");
for(const [label,value] of [["sources",sourceSummary],["compliance",complianceSummary],["depth",depthSummary]]) { const h=value?.historical_reviews; if(value?.score_total!==88||value?.reviewed_baseline_sha256!==history[2][1]||value?.previous_reviewed_baseline_score_total!==84||!Array.isArray(h)||h.map(x=>typeof x==="number"?x:x.score_total).join(",")!=="89,84,88"||value?.candidate_review_state!=="unreviewed"||value?.candidate_score_total!==null||value?.publication_clearance!==true||value?.publication_state!=="cleared_for_declared_scope_pending_maintainer_re_review") fail(`${label} review/clearance state is not synchronized`); }
if(disposition.clearance_complete!==true||disposition.publication_clearance!==true||disposition.package_publication_state!=="cleared_for_declared_scope_pending_maintainer_re_review") fail("disposition final true state is not synchronized");
const ar013Decision=disposition.decisions?.find(x=>x.asset_group_id==="AR-013");
if(disposition.disposition_semantics?.ar013_evidence_scope!==ar013EvidenceScope||disposition.disposition_semantics?.ar013_provider_terms_evidence!==null||disposition.disposition_semantics?.ar013_provider_terms_authorization_claimed!==false||ar013Decision?.clearance_status!==ar013ClearanceStatus||ar013Decision?.evidence_scope!==ar013EvidenceScope||ar013Decision?.provider_terms_evidence!==null||ar013Decision?.provider_terms_authorization_claimed!==false||ar013Decision?.commercial_or_standalone_reuse!==false) fail("disposition AR-013 limited-scope semantics are not synchronized");
const sourceSemantics=sources.sources?.find(x=>x.id==="ASSET-RIGHTS-LEDGER")?.ar013_clearance_semantics;
if(sourceSemantics?.status!==ar013ClearanceStatus||sourceSemantics?.evidence_scope!==ar013EvidenceScope||sourceSemantics?.provider_terms_evidence!==null||sourceSemantics?.provider_terms_authorization_claimed!==false||sourceSemantics?.commercial_or_standalone_reuse!==false) fail("sources AR-013 limited-scope semantics are not synchronized");
if(layer.rights_summary?.ar013_clearance_semantics?.status!==ar013ClearanceStatus||layer.rights_summary?.ar013_clearance_semantics?.provider_terms_evidence!==null||layer.rights_summary?.ar013_clearance_semantics?.commercial_or_standalone_reuse!==false) fail("AI review layer AR-013 limited-scope semantics are not synchronized");
const rightsGate=finalGates.gate_authorities?.find(x=>x.gate_id==="RIGHTS_AND_PUBLICATION");
if(rightsGate?.evidence_scope!==ar013EvidenceScope||rightsGate?.provider_terms_evidence!==null||rightsGate?.provider_terms_authorization_claimed!==false||rightsGate?.commercial_or_standalone_reuse!==false) fail("final gates AR-013 limited-scope semantics are not synchronized");
if(ledger.coverage_contract?.clearance_complete!==true||ledger.summary?.publication_clearance!==true||ledger.package_publication_state!=="cleared_for_declared_scope_pending_maintainer_re_review") fail("ledger final true state is not synchronized");

if(errors.length){errors.forEach(x=>console.error(`ERROR: ${x}`));console.error(`FAIL: ${errors.length} error(s)`);process.exit(1);}
console.log("PASS: review history, current candidate, R1 split, page 13/15, and cross-file final clearance are consistent.");
