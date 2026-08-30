#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(
  process.env.OPEN_PULSE_EQUIVALENCE_ROOT || path.resolve(__dirname, '../..')
);
const read = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const atlas = read('visual/assets/open-pulse-service-equivalence-atlas.json');
const scenarios = read('visual/assets/scenario-operation-matrix.json');
const operations = read('visual/assets/operations-matrix.json');
const nodes = read('visual/assets/key-area-node-plans.json');
const personas = read('visual/assets/persona-and-inclusion-matrix.json');
const gate = read('visual/assets/gates/29-non-ai-equivalence.json');
const tabletop = read('visual/assets/open-pulse-tabletop-contract.json');

const errors = [];
const same = (actual, expected, label) => {
  if (actual !== expected) errors.push(`${label}: expected ${expected}, got ${actual}`);
};
const has = (set, value, label) => {
  if (!set.has(value)) errors.push(`${label}: missing ${value}`);
};
const expectedIds = (prefix, count) => Array.from(
  { length: count },
  (_, index) => `${prefix}${String(index + 1).padStart(2, '0')}`
);
const assertIds = (rows, key, expected, label) => {
  if (!Array.isArray(rows)) {
    errors.push(`${label}: expected an array`);
    return [];
  }
  const ids = rows.map((row) => row && row[key]);
  if (ids.length !== expected.length) {
    errors.push(`${label}: expected ${expected.length} rows, got ${ids.length}`);
  }
  if (new Set(ids).size !== ids.length) {
    errors.push(`${label}: IDs must be unique`);
  }
  if (JSON.stringify(ids) !== JSON.stringify(expected)) {
    errors.push(`${label}: expected ordered IDs ${expected.join(', ')}`);
  }
  return ids;
};

same(atlas.schema_version, 'open-pulse-service-equivalence-atlas-v1', 'atlas schema');
same(atlas.operational_status, 'not_authorized_not_run', 'operational status');
same(atlas.baseline, 'unknown', 'baseline');
same(atlas.result_status, 'not_run', 'result status');
same(atlas.decision, 'HOLD', 'decision');
same(atlas.authorizations, 0, 'authorizations');
same(atlas.field_data, false, 'field data');
same(atlas.performance_results, null, 'performance results');
same(atlas.network_calls, 0, 'network calls');
same(gate.gate_id, 'GATE-29', 'equivalence gate');
same(tabletop.contract_id, 'OP-S02-TABLETOP-001', 'tabletop contract');

const scenarioIds = assertIds(scenarios.rows, 'scenario_id', expectedIds('S', 14), 'scenario IDs');
const operationIds = assertIds(operations.packages, 'action_id', expectedIds('OP-', 8), 'operation IDs');
const nodeIds = assertIds(nodes.nodes, 'id', expectedIds('NODE-', 3), 'node IDs');
const personaIdsList = assertIds(personas.personas, 'id', expectedIds('P-', 8), 'persona IDs');
const routeIds = assertIds(atlas.route_cards, 'id', ['R-01', 'R-02', 'R-03'], 'route IDs');
const negativeIds = assertIds(
  atlas.negative_replay,
  'fixture_id',
  ['EQ-N01', 'EQ-N02', 'EQ-N03', 'EQ-N04'],
  'negative fixture IDs'
);
const scenarioRows = new Map((scenarios.rows || []).map((row) => [row.scenario_id, row]));
const operationRows = new Map((operations.packages || []).map((row) => [row.action_id, row]));
const nodeRows = new Map((nodes.nodes || []).map((row) => [row.id, row]));
const personaIds = new Set(personaIdsList);
same(scenarioIds.length, 14, 'scenario row count');
same(operationIds.length, 8, 'operation row count');
same(nodeIds.length, 3, 'node count');
same(personaIdsList.length, 8, 'persona count');
same(routeIds.length, 3, 'route card count');
same((atlas.receipt_steps || []).length, 5, 'receipt step count');
same(negativeIds.length, 4, 'negative fixture count');

for (const route of atlas.route_cards) {
  has(nodeRows, route.node_id, `${route.id} node`);
  has(scenarioRows, route.scenario_id, `${route.id} scenario`);
  has(operationRows, route.operation_id, `${route.id} operation`);
  const node = nodeRows.get(route.node_id);
  if (node && node.site_ref !== route.site_ref) errors.push(`${route.id}: site ref does not match node`);
  if (!Array.isArray(route.persona_ids)) {
    errors.push(`${route.id}: persona_ids must be an array`);
  } else if (new Set(route.persona_ids).size !== route.persona_ids.length) {
    errors.push(`${route.id}: persona_ids must be unique`);
  } else {
    for (const persona of route.persona_ids) has(personaIds, persona, `${route.id} persona`);
  }
  for (const field of ['ordinary_route', 'ai_gain', 'stop_rule', 'restore_rule']) {
    if (!route[field]) errors.push(`${route.id}: missing ${field}`);
  }
}

const expectedSteps = ['EQ-01', 'EQ-02', 'EQ-03', 'EQ-04', 'EQ-05'];
if (JSON.stringify(atlas.receipt_steps.map((step) => step.id)) !== JSON.stringify(expectedSteps)) {
  errors.push('receipt step order is not deterministic');
}
if (!Array.isArray(atlas.positive_control)) {
  errors.push('positive control set must be an array');
} else {
  if (JSON.stringify(atlas.positive_control) !== JSON.stringify(['R-01', 'R-02', 'R-03'])) {
    errors.push('positive control set changed');
  }
  for (const routeId of atlas.positive_control) {
    if (!routeIds.includes(routeId)) errors.push(`positive control route missing: ${routeId}`);
  }
}
const expectedNegativeDecisions = new Map([
  ['EQ-N01', ['ordinary_route_missing', 'hold_and_keep_public_service']],
  ['EQ-N02', ['accountable_human_missing', 'reject_ai_gain']],
  ['EQ-N03', ['stop_or_appeal_missing', 'freeze_and_restore']],
  ['EQ-N04', ['recovery_receipt_missing', 'do_not_scale']]
]);
for (const fixture of atlas.negative_replay || []) {
  const expected = expectedNegativeDecisions.get(fixture.fixture_id);
  if (!expected) {
    errors.push(`negative fixture is not registered: ${fixture.fixture_id}`);
    continue;
  }
  same(fixture.input, expected[0], `${fixture.fixture_id} input`);
  same(fixture.decision, expected[1], `${fixture.fixture_id} decision`);
}

const result = {
  ok: errors.length === 0,
  atlas_id: atlas.atlas_id,
  route_cards: atlas.route_cards.length,
  source_scenarios: scenarioIds.length,
  source_operations: operationIds.length,
  source_nodes: nodeIds.length,
  source_personas: personaIdsList.length,
  receipt_steps: atlas.receipt_steps.length,
  negative_replay: `${atlas.negative_replay.length}/${atlas.negative_replay.length}`,
  positive_control: atlas.positive_control.length,
  authorizations: atlas.authorizations,
  field_data: atlas.field_data,
  baseline: atlas.baseline,
  result_status: atlas.result_status,
  decision: atlas.decision,
  errors
};
process.stdout.write(JSON.stringify(result, null, 2) + '\n');
process.exitCode = errors.length ? 1 : 0;
