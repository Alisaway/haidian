#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Simulator = require("./digital-user-simulator.js");
const Evolution = require("./public-evolution.js");

const context = {window: {}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "story-baseline.generated.js"), "utf8"), context);
const baseline = context.window.ECS_STORY_BASE.baseline;
const first = Evolution.buildEvolution(baseline, Simulator.runPopulation(baseline));
const replay = Evolution.buildEvolution(baseline, Simulator.runPopulation(baseline));

let passed = 0;
function test(name, callback) { callback(); passed += 1; console.log(`ok ${passed} - ${name}`); }

test("three public rounds are deterministic", () => assert.deepEqual(replay, first));
test("rounds contain three initial, three recombined and three final variants", () => {
  assert.equal(first.variants.filter((variant) => variant.round === 1).length, 3);
  assert.equal(first.variants.filter((variant) => variant.round === 2).length, 3);
  assert.equal(first.variants.filter((variant) => variant.round === 3).length, 3);
});
test("every variant is tested in all four scenarios with 100 explicit user outcomes", () => {
  assert.equal(first.runs.length, 36);
  first.runs.forEach((run) => assert.equal(run.routes.length, 100));
});
test("lineage reaches one current recommendation and two conditional alternatives", () => {
  assert.equal(first.current_recommendation_id, "R3-CURRENT-PHENOTYPE");
  assert.equal(first.conditional_alternative_ids.length, 2);
  const current = first.variants.find((variant) => variant.id === first.current_recommendation_id);
  assert.equal(current.parent_ids.length, 3);
});
test("selection events only target spatial, facility, rule or agent objects", () => {
  first.selection_events.forEach((event) => assert.equal(event.human_subject, false));
  assert(!JSON.stringify(first.selection_events).includes("eliminate_user"));
});
test("failed permanent construction enters the fossil archive with unknown evidence", () => {
  assert.equal(first.fossil_archive.length, 1);
  assert.equal(first.fossil_archive[0].object_id, "PERMANENT-STATION-HALL");
  assert.equal(first.fossil_archive[0].evidence.status, "unknown");
});
test("public-value conflict requires human confirmation but no manual winner assembly", () => {
  assert.equal(first.human_interventions.length, 1);
  assert(first.human_interventions[0].human_confirmation_required);
  assert.equal(first.recommendation_rule.aggregate_metric, null);
});
test("each round and scenario keeps a non-empty Pareto archive", () => first.pareto_archives.forEach((archive) => assert(archive.plan_ids.length > 0)));
test("round two is derived from evidence-state crossover rather than complete predefined variants", () => {
  assert.equal(first.generation_method.manual_variant_assembly, false);
  first.variants.filter((variant) => variant.round === 2).forEach((variant) => {
    assert.equal(variant.generated_by, "AG-ADAPTATION+crossover_rule");
    assert(variant.simulated_changes.every((change) => Array.isArray(change.generated_from_gene_ids)));
  });
});
test("changing a parent-gene decision changes the generated descendants", () => {
  const decisions = Evolution.evaluateParentGenes(first.runs.filter((run) => ["A-DIRECT-LINK", "B-PUBLIC-LIFE", "C-TIME-SHARE"].includes(run.plan_id)));
  const original = Evolution.deriveRound2Variants(decisions);
  const withoutCommons = Evolution.deriveRound2Variants(decisions.map((item) => item.object_id === "GENE-OLD-STATION-COMMONS" ? {...item, action: "exit"} : item));
  assert(original.some((variant) => variant.gene_ids.includes("GENE-OLD-STATION-COMMONS")));
  assert(withoutCommons.every((variant) => !variant.gene_ids.includes("GENE-OLD-STATION-COMMONS")));
});
test("the generated current phenotype contains traceable spatial objects, nodes and a relational section", () => {
  const current = first.variants.find((variant) => variant.id === first.current_recommendation_id);
  assert(current.spatial_objects.length >= 5);
  assert.equal(current.node_details.length, 3);
  assert.equal(current.typical_section.status, "relational_not_dimensioned");
  assert(current.typical_section.unknowns.includes("verified_road_redline"));
});

console.log(`# ${passed} tests passed`);
