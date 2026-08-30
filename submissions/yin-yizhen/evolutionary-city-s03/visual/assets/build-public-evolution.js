#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const PublicEvolution = require("./public-evolution.js");

function readWindowScript(name, property) {
  const context = {window: {}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, name), "utf8"), context, {filename: name});
  return context.window[property];
}

const story = readWindowScript("story-baseline.generated.js", "ECS_STORY_BASE");
const round1 = readWindowScript("digital-user-data.generated.js", "ECS_DIGITAL_USER_DATA");
const result = PublicEvolution.buildEvolution(story.baseline, round1);
const core = {...result};
delete core.runs;
const midpoint = Math.ceil(result.runs.length / 2);
const outputs = {
  core: path.join(__dirname, "public-evolution-core.generated.js"),
  part1: path.join(__dirname, "public-evolution-runs-1.generated.js"),
  part2: path.join(__dirname, "public-evolution-runs-2.generated.js"),
  assembly: path.join(__dirname, "public-evolution.generated.js")
};
fs.writeFileSync(outputs.core, `window.ECS_PUBLIC_EVOLUTION_CORE=${JSON.stringify(core)};\n`, "utf8");
fs.writeFileSync(outputs.part1, `window.ECS_PUBLIC_EVOLUTION_RUNS_1=${JSON.stringify(result.runs.slice(0, midpoint))};\n`, "utf8");
fs.writeFileSync(outputs.part2, `window.ECS_PUBLIC_EVOLUTION_RUNS_2=${JSON.stringify(result.runs.slice(midpoint))};\n`, "utf8");
fs.writeFileSync(outputs.assembly, "window.ECS_PUBLIC_EVOLUTION={...window.ECS_PUBLIC_EVOLUTION_CORE,runs:[...window.ECS_PUBLIC_EVOLUTION_RUNS_1,...window.ECS_PUBLIC_EVOLUTION_RUNS_2]};\n", "utf8");
console.log(JSON.stringify({
  outputs: Object.fromEntries(Object.entries(outputs).map(([key, value]) => [key, {file: path.basename(value), bytes: fs.statSync(value).size}])),
  rounds: result.public_story.length - 1,
  variants: result.variants.length,
  simulation_runs: result.runs.length,
  current_recommendation: result.current_recommendation_id,
  selection_events: result.selection_events.length
}, null, 2));
