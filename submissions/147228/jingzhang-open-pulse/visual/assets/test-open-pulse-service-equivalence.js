#!/usr/bin/env node
const assert = require('assert');
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const runner = path.join(__dirname, 'run-open-pulse-service-equivalence.js');
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'open-pulse-equivalence-'));
const tempAssets = path.join(tempRoot, 'visual', 'assets');
fs.mkdirSync(path.join(tempAssets, 'gates'), { recursive: true });

const requiredFiles = [
  'open-pulse-service-equivalence-atlas.json',
  'scenario-operation-matrix.json',
  'operations-matrix.json',
  'key-area-node-plans.json',
  'persona-and-inclusion-matrix.json',
  'open-pulse-tabletop-contract.json'
];
for (const file of requiredFiles) {
  fs.copyFileSync(path.join(__dirname, file), path.join(tempAssets, file));
}
fs.copyFileSync(
  path.join(__dirname, 'gates', '29-non-ai-equivalence.json'),
  path.join(tempAssets, 'gates', '29-non-ai-equivalence.json')
);

const run = () => childProcess.spawnSync(process.execPath, [runner], {
  env: { ...process.env, OPEN_PULSE_EQUIVALENCE_ROOT: tempRoot },
  encoding: 'utf8'
});
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(tempAssets, file), 'utf8'));
const writeJson = (file, value) => fs.writeFileSync(
  path.join(tempAssets, file),
  `${JSON.stringify(value, null, 2)}\n`
);
const expectFailure = (label, mutate) => {
  const baseline = readJson(label.file);
  const mutated = JSON.parse(JSON.stringify(baseline));
  mutate(mutated);
  writeJson(label.file, mutated);
  const result = run();
  assert.notStrictEqual(result.status, 0, `${label.name} should fail closed`);
  writeJson(label.file, baseline);
};

try {
  assert.strictEqual(run().status, 0, 'baseline fixture should pass');

  expectFailure({
    name: 'duplicate scenario ID',
    file: 'scenario-operation-matrix.json'
  }, (value) => { value.rows[1].scenario_id = value.rows[0].scenario_id; });

  expectFailure({
    name: 'unknown positive route',
    file: 'open-pulse-service-equivalence-atlas.json'
  }, (value) => { value.positive_control[0] = 'R-99'; });

  expectFailure({
    name: 'unregistered negative decision',
    file: 'open-pulse-service-equivalence-atlas.json'
  }, (value) => { value.negative_replay[0].decision = 'pass'; });

  process.stdout.write(JSON.stringify({ ok: true, negative_cases: 3 }) + '\n');
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
