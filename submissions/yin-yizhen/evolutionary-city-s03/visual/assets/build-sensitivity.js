#!/usr/bin/env node
"use strict";
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const Sensitivity=require("./sensitivity-analysis.js");
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,"story-baseline.generated.js"),"utf8"),context);
const result=Sensitivity.runSensitivity(context.window.ECS_STORY_BASE.baseline);
const output=path.join(__dirname,"sensitivity.generated.js");fs.writeFileSync(output,`window.ECS_SENSITIVITY=${JSON.stringify(result)};\n`,"utf8");
console.log(JSON.stringify({output:path.basename(output),seeds:result.seed_runs.length,cases:result.parameter_cases.length,stable:result.stable_conclusions.filter((item)=>item.stable).length,sensitive:result.sensitive_outputs.length},null,2));
