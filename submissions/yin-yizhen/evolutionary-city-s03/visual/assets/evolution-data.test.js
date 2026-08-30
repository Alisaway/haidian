#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {load, validate} = require("./validate-data.js");
const Engine = require("./evolution-engine.js");

const clone = (value) => JSON.parse(JSON.stringify(value));
const data = load();
const result = Engine.run(data);
let passed = 0;
function test(name, callback) {
  callback();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

test("configuration passes semantic validation", () => assert.deepEqual(validate(clone(data)), []));
test("digital-user contract declares 100 users, three variants and four scenarios", () => {
  assert.equal(data.digital_user_simulation.population.reduce((sum, group) => sum + group.count, 0), 100);
  assert.equal(data.digital_user_simulation.variant_ids.length, 3);
  assert.equal(data.digital_user_simulation.scenario_ids.length, 4);
  assert.equal(data.digital_user_simulation.single_aggregate_metric, false);
});
test("fixed seed reproduces the same archive and lineage", () => {
  const replay = Engine.run(data);
  assert.deepEqual(replay.niche_archive, result.niche_archive);
  assert.deepEqual(replay.lineage_events, result.lineage_events);
});
test("D1-D40 produce exactly 1,440 tested individuals", () => assert.equal(result.tested_individual_count, 1440));
test("every generated geometry is valid and inside the conceptual boundary", () => {
  result.individuals.forEach((individual) => assert.equal(Engine.validateGeometry(individual.cells, data).valid, true, individual.id));
});
test("locked slow-layer cells remain byte-for-byte stable", () => {
  const baseline = new Map(data.evolutionary_cells.filter((cell) => cell.locked).map((cell) => [cell.id, cell]));
  result.individuals.forEach((individual) => baseline.forEach((cell, id) => {
    const current = individual.cells.find((candidate) => candidate.id === id);
    assert(current, `${individual.id} lost ${id}`);
    assert.deepEqual(current.rect, cell.rect);
    assert.equal(current.program, cell.program);
  }));
});
test("the archive preserves multiple niches and no global winner", () => {
  assert(result.niche_count >= 4);
  assert.equal(result.no_global_winner, true);
  assert.equal(data.niche_archive.global_ranking, false);
});
test("every exit, replacement and dormancy has a reason and lineage event", () => {
  assert.equal(result.selection_events.length, 1440);
  result.selection_events.forEach((event) => assert(event.reason));
  assert(result.fossil_ids.length > 0);
});
test("a forbidden single fitness field is rejected", () => {
  const changed = clone(data);
  changed.engine.fitness = 1;
  assert(validate(changed).some((error) => error.includes("single-score")));
});
test("agents cannot modify the constitution or delete failure memory", () => {
  assert(data.agent_policies.every((agent) => !agent.can.includes("modify_constitution")));
  assert(data.agent_policies.find((agent) => agent.id === "AG-MEMORY").cannot.includes("delete_failure"));
});
test("human intervention recomputes only affected lineages", () => {
  const event = result.human_interventions[0];
  assert(event.affected_individual_ids.length > 0);
  assert(event.preserved_individual_ids.length > 0);
  assert.equal(event.recomputation_scope, "affected_lineages_only");
});
test("three stress tests use the same engine but produce different signatures", () => {
  const tests = Engine.runTransferTests(data);
  assert.equal(tests.length, 3);
  assert.equal(new Set(tests.map((item) => JSON.stringify(item.signature))).size, 3);
  tests.forEach((item) => assert.equal(item.tested_individual_count, 96));
});
test("R1 is a D40 niche specimen with a traceable ancestry", () => {
  assert(result.r1_phenotype_id.startsWith("S03-D40-"));
  const lineage = Engine.traceLineage(result, result.r1_phenotype_id);
  assert.equal(lineage[0].id, "S03-D0-I000");
  assert.equal(lineage.at(-1).id, result.r1_phenotype_id);
});
test("generated offline bundle declares the current source hash", () => {
  const proposalRoot = path.resolve(__dirname, "..", "..");
  const raw = fs.readFileSync(path.join(proposalRoot, "simulation.json"));
  const digest = crypto.createHash("sha256").update(raw).digest("hex");
  const generated = fs.readFileSync(path.join(__dirname, "data.generated.js"), "utf8");
  assert(generated.includes(`Source SHA-256: ${digest}`));
  assert(generated.includes(`window.EVOLUTION_DATA_SHA256="${digest}"`));
});

console.log(`# ${passed} tests passed`);
