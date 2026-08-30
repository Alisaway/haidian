#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Simulator = require("./digital-user-simulator.js");

const context = {window: {}};
vm.createContext(context);
const baselinePath = path.join(__dirname, "story-baseline.generated.js");
vm.runInContext(fs.readFileSync(baselinePath, "utf8"), context);
const baseline = context.window.ECS_STORY_BASE.baseline;

let passed = 0;
function test(name, callback) {
  callback();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

const first = Simulator.runPopulation(baseline);
const replay = Simulator.runPopulation(baseline);

test("fixed seed reproduces the same users and routes", () => assert.deepEqual(replay, first));
test("population contains the declared 40/25/20/15 user mix", () => assert.deepEqual(first.user_type_counts, {commuter: 40, resident: 25, heritage_visitor: 20, accessible: 15}));
test("the public OSM snapshot derives a non-empty walkable graph", () => {
  assert(first.network_summary.node_count > 500);
  assert(first.network_summary.edge_count > 500);
});
test("A, B and C each run all four scenarios", () => {
  assert.equal(first.variants.length, 3);
  assert.equal(first.scenarios.length, 4);
  assert.equal(first.runs.length, 12);
});
test("every one of the 100 users has an explicit outcome in every run", () => first.runs.forEach((run) => {
  assert.equal(run.routes.length, 100);
  run.routes.forEach((route) => assert(["arrived", "failed"].includes(route.status)));
}));
test("successful routes only use declared graph edges", () => {
  const base = Simulator.buildNetwork(baseline.features);
  first.variants.forEach((variant) => {
    const network = Simulator.applyVariant(base, variant).network;
    first.runs.filter((run) => run.plan_id === variant.id).forEach((run) => run.routes.forEach((route) => {
      route.edge_ids.forEach((edgeId) => assert(network.edges.has(edgeId), `${run.plan_id}/${route.user_id} used missing ${edgeId}`));
    }));
  });
});
test("step-free users never traverse a known inaccessible edge", () => {
  const base = Simulator.buildNetwork(baseline.features);
  first.variants.forEach((variant) => {
    const network = Simulator.applyVariant(base, variant).network;
    first.runs.filter((run) => run.plan_id === variant.id).forEach((run) => run.routes.filter((route) => route.user_type === "accessible").forEach((route) => {
      route.edge_ids.forEach((edgeId) => assert.notEqual(network.edges.get(edgeId).step_free, false));
    }));
  });
});
test("night-only and partial-closure scenarios do not use closed connectors", () => {
  const cNight = first.runs.find((run) => run.plan_id === "C-TIME-SHARE" && run.scenario_id === "EVENING-QUIET");
  cNight.routes.forEach((route) => assert(!route.edge_ids.includes("simulated:C-DAY-GATE")));
  first.runs.filter((run) => run.scenario_id === "PARTIAL-CLOSURE").forEach((run) => run.routes.forEach((route) => {
    assert(!route.edge_ids.some((id) => /simulated:.*(?:STATION|METRO|PRIMARY)/.test(id)));
  }));
});
test("unknown empirical inputs stay explicit and climate evidence stays null", () => {
  assert(first.unknowns.some((item) => item.field === "real_public_feedback"));
  first.runs.forEach((run) => assert.equal(run.metrics.climate_evidence, null));
});
test("no resident, community, business or human group is an elimination object", () => {
  const serialized = JSON.stringify(first);
  assert(!serialized.includes("eliminated_user"));
  assert(!serialized.includes("淘汰居民"));
});

console.log(`# ${passed} tests passed`);
