#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-era-continuity-maintenance-contract.json'), 'utf8'));
const errors = [];
const expectedStages = ['BASE', 'BOOST', 'BLACKOUT', 'BEQUEST'];
const stages = contract.stages || [];
if (stages.length !== 4 || stages.map(x => x.stage_id).join('|') !== expectedStages.join('|')) {
  errors.push('stages must be BASE, BOOST, BLACKOUT, BEQUEST in order');
}
if (new Set(stages.map(x => x.stage_id)).size !== stages.length) errors.push('stage IDs must be unique');
for (const stage of stages) {
  for (const key of ['name', 'decision', 'acceptance', 'retained_public_assets']) {
    if (!stage[key] || (Array.isArray(stage[key]) && stage[key].length === 0)) errors.push(`${stage.stage_id || 'stage'} missing ${key}`);
  }
}

const areas = contract.key_areas || [];
if (areas.length !== 3 || new Set(areas.map(x => x.area_id)).size !== 3) errors.push('key_areas must contain three unique areas');
for (const area of areas) {
  if (!area.name || !area.ordinary_entry || !area.maintenance_focus) errors.push(`${area.area_id || 'area'} missing readable fields`);
  if (!Array.isArray(area.spatial_refs) || area.spatial_refs.length < 2) errors.push(`${area.area_id || 'area'} missing spatial refs`);
}

const seams = contract.seams || [];
if (seams.length !== 6 || new Set(seams.map(x => x.seam_id)).size !== 6) errors.push('seams must contain six unique handoff seams');
for (const seam of seams) {
  if (!expectedStages.includes(seam.from_stage) || !expectedStages.includes(seam.to_stage)) errors.push(`${seam.seam_id || 'seam'} references unknown stage`);
  if (!seam.name || !seam.check) errors.push(`${seam.seam_id || 'seam'} missing name or check`);
}

const roles = contract.maintenance_roles || [];
if (roles.length !== 7 || new Set(roles.map(x => x.role_id)).size !== 7) errors.push('maintenance_roles must contain seven unique roles');
for (const role of roles) if (!role.role || !role.owns) errors.push(`${role.role_id || 'role'} missing ownership`);

const components = contract.offline_components || [];
if (components.length !== 7 || components.some(x => x.fallback === undefined)) errors.push('offline_components must contain seven fallback components');

const sequence = contract.review_sequence || [];
if (sequence.length !== 12 || sequence.map(x => x.window).join('|') !== Array.from({length: 12}, (_, i) => `W${String(i + 1).padStart(2, '0')}`).join('|')) {
  errors.push('review_sequence must contain W01 through W12');
}
if (sequence.some(x => x.status !== 'design_target' || !x.focus || !x.exit_gate)) errors.push('review_sequence must remain conceptual and gated');

const negatives = contract.negative_replay || [];
if (negatives.length !== 6 || negatives.some(x => x.expected_decision !== 'HOLD')) errors.push('negative_replay must contain six HOLD fixtures');
const positives = contract.positive_control || [];
if (positives.length !== 4) errors.push('positive_control must contain four fixtures');

const status = contract.status || {};
for (const [key, expected] of Object.entries({decision: 'HOLD', operational_status: 'not_authorized_not_run', authorizations: 0, field_data: false, baseline: 'unknown', result_status: 'not_run', network_calls: 0})) {
  if (status[key] !== expected) errors.push(`status.${key} must be ${expected}`);
}
if (status.performance_results !== null) errors.push('performance_results must remain null');
const boundary = contract.boundary || {};
if (boundary.not_an_official_score !== true || boundary.field_observations !== 0 || boundary.performance_results !== null || boundary.official_boundary !== false) {
  errors.push('boundary must remain non-operational');
}

const output = {
  ok: errors.length === 0,
  contract_id: contract.contract_id,
  stages: stages.length,
  key_areas: areas.length,
  seams: seams.length,
  maintenance_roles: roles.length,
  offline_components: components.length,
  review_windows: sequence.length,
  negative_replay: `${negatives.length}/${negatives.length}`,
  positive_control: positives.length,
  authorizations: status.authorizations,
  field_data: status.field_data,
  baseline: status.baseline,
  result_status: status.result_status,
  decision: status.decision,
  errors
};
console.log(JSON.stringify(output, null, 2));
process.exitCode = errors.length ? 1 : 0;
