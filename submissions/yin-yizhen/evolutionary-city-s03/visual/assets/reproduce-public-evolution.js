#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Simulator = require("./digital-user-simulator.js");
const PublicEvolution = require("./public-evolution.js");
const Sensitivity = require("./sensitivity-analysis.js");

function runScript(name, context) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, name), "utf8"), context, {filename: name});
}

function isolated(name, property) {
  const context = {window: {}};
  vm.createContext(context);
  runScript(name, context);
  return context.window[property];
}

const story = isolated("story-baseline.generated.js", "ECS_STORY_BASE");
const expectedDigital = JSON.parse(JSON.stringify(isolated("digital-user-data.generated.js", "ECS_DIGITAL_USER_DATA")));
const generatedDigital = Simulator.runPopulation(story.baseline);
assert.deepEqual(generatedDigital, expectedDigital, "digital-user generated data does not match a fixed-seed replay");

const context = {window: {}};
vm.createContext(context);
[
  "public-evolution-core.generated.js",
  "public-evolution-runs-1.generated.js",
  "public-evolution-runs-2.generated.js",
  "public-evolution.generated.js"
].forEach((name) => runScript(name, context));
const expectedEvolution = JSON.parse(JSON.stringify(context.window.ECS_PUBLIC_EVOLUTION));
const generatedEvolution = JSON.parse(JSON.stringify(PublicEvolution.buildEvolution(story.baseline, generatedDigital)));
assert.deepEqual(generatedEvolution, expectedEvolution, "three-round generated data does not match a fixed-seed replay");
const expectedSensitivity = JSON.parse(JSON.stringify(isolated("sensitivity.generated.js", "ECS_SENSITIVITY")));
const generatedSensitivity = JSON.parse(JSON.stringify(Sensitivity.runSensitivity(story.baseline)));
assert.deepEqual(generatedSensitivity, expectedSensitivity, "sensitivity data does not match its five-seed replay");

console.log(JSON.stringify({
  ok: true,
  random_seed: generatedEvolution.random_seed,
  network: generatedDigital.network_summary,
  digital_users: generatedDigital.user_count,
  parent_variants: generatedDigital.variants.length,
  scenarios: generatedDigital.scenarios.length,
  public_round_variants: generatedEvolution.variants.length,
  simulation_runs: generatedEvolution.runs.length,
  route_outcomes: generatedEvolution.runs.reduce((sum, run) => sum + run.routes.length, 0),
  current_recommendation: generatedEvolution.current_recommendation_id,
  aggregate_metric: generatedEvolution.recommendation_rule.aggregate_metric,
  sensitivity_seeds: generatedSensitivity.seed_runs.length,
  sensitivity_cases: generatedSensitivity.parameter_cases.length,
  stable_conclusions: generatedSensitivity.stable_conclusions.filter((item) => item.stable).length
}, null, 2));
