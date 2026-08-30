#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const Simulator = require("./digital-user-simulator.js");

const assets = __dirname;
const baselinePath = path.join(assets, "story-baseline.generated.js");
const outputPath = path.join(assets, "digital-user-data.generated.js");
const context = {window: {}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(baselinePath, "utf8"), context, {filename: baselinePath});
const source = context.window.ECS_STORY_BASE;
if (!source || !source.baseline) throw new Error("story-baseline.generated.js did not expose ECS_STORY_BASE.baseline");
const result = Simulator.runPopulation(source.baseline);
fs.writeFileSync(outputPath, `window.ECS_DIGITAL_USER_DATA=${JSON.stringify(result)};\n`, "utf8");
console.log(JSON.stringify({
  output: path.basename(outputPath),
  users: result.user_count,
  network: result.network_summary,
  variants: result.variants.length,
  scenarios: result.scenarios.length,
  runs: result.runs.length
}, null, 2));
