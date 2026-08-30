#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const Sensitivity=require("./sensitivity-analysis.js");
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,"story-baseline.generated.js"),"utf8"),context);
const baseline=context.window.ECS_STORY_BASE.baseline;const first=Sensitivity.runSensitivity(baseline);const replay=Sensitivity.runSensitivity(baseline);
let passed=0;function test(name,callback){callback();passed+=1;console.log(`ok ${passed} - ${name}`);}
test("five seeds and five parameter cases reproduce exactly",()=>{assert.deepEqual(replay,first);assert.equal(first.seed_runs.length,5);assert.equal(first.parameter_cases.length,5);});
test("backup-route gene survives every seed",()=>assert.equal(first.gene_frequency["GENE-REDUNDANT-ROUTE"],5));
test("closure arrival stays above the declared threshold",()=>assert(first.stable_conclusions.find((item)=>item.id==="STABLE-CLOSURE").stable));
test("known-step accessibility remains stable without claiming unknown slopes",()=>{assert(first.stable_conclusions.find((item)=>item.id==="STABLE-ACCESS").stable);assert(first.unknowns.includes("verified_slope"));});
test("absolute travel and crowd outputs remain labelled sensitive",()=>{assert.equal(first.sensitive_outputs.length,2);assert(first.sensitive_outputs.every((item)=>item.range.min!==null));});
test("no sensitivity output is labelled observed performance",()=>assert.equal(first.not_observed_performance,true));
console.log(`# ${passed} tests passed`);
