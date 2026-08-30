#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-era-off-city-on-contract.json'), 'utf8'));
const expectedRoutes = ['ROUTE-01', 'ROUTE-02', 'ROUTE-03', 'ROUTE-04'];
const errors = [];
const routes = contract.route_cards || [];
if (routes.length !== 4) errors.push('route_cards must contain four routes');
if (routes.map(r => r.route_id).join('|') !== expectedRoutes.join('|')) errors.push('route order must be ROUTE-01 through ROUTE-04');
for (const route of routes) {
  for (const key of ['scenario_id', 'ordinary_baseline', 'optional_ai_gain', 'stop_trigger', 'retained_public_asset']) {
    if (!route[key]) errors.push(`${route.route_id || 'route'} missing ${key}`);
  }
  if (!Array.isArray(route.spatial_refs) || route.spatial_refs.length < 2) errors.push(`${route.route_id || 'route'} missing spatial refs`);
}
const sequence = contract.sequence || [];
if (sequence.length !== 4 || new Set(sequence.map(s => s.id)).size !== 4) errors.push('sequence must contain four unique states');
const negatives = contract.negative_replay || [];
if (negatives.length !== 4 || negatives.some(x => x.expected_decision !== 'HOLD')) errors.push('negative replay must contain four HOLD fixtures');
const positives = contract.positive_control || [];
if (positives.length !== 3) errors.push('positive control must contain three fixtures');
const status = contract.status || {};
for (const [key, expected] of Object.entries({decision:'HOLD', operational_status:'not_authorized_not_run', authorizations:0, field_data:false, baseline:'unknown', result_status:'not_run', network_calls:0})) {
  if (status[key] !== expected) errors.push(`status.${key} must be ${expected}`);
}
if (status.performance_results !== null) errors.push('performance_results must remain null');
const boundary = contract.boundary || {};
if (boundary.not_an_official_score !== true || boundary.field_observations !== 0 || boundary.performance_results !== null || boundary.official_boundary !== false) errors.push('boundary must remain non-operational');
const output = {
  ok: errors.length === 0,
  contract_id: contract.contract_id,
  routes: routes.length,
  states: sequence.length,
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
