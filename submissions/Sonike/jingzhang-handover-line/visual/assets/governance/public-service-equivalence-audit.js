#!/usr/bin/env node
/* 京张交接线 · 公共服务等价合同审计器（离线、只读） */
"use strict";
const fs = require("fs");
const path = require("path");

const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const resolveIn = (base, rel, key) => {
  if (OVERLAY) {
    const candidate = path.join(OVERLAY, key || rel);
    if (fs.existsSync(candidate)) return candidate;
  }
  return path.join(base, rel);
};
const readPkg = (rel) => JSON.parse(fs.readFileSync(resolveIn(PKG, rel), "utf8"));
const readHere = (rel) => JSON.parse(fs.readFileSync(
  resolveIn(HERE, rel, path.join("visual/assets/governance", rel)), "utf8"));

const contract = readHere("public-service-equivalence-contract.json");
const suite = readHere("shift-ledger-suite.json");
const simulation = readPkg("simulation.json");
const metrics = readPkg("metrics.json").metrics;
const errors = [];
const exactSet = (actual, expected) =>
  Array.isArray(actual) && actual.length === expected.length && expected.every((item) => actual.includes(item));

const EXPECTED_MODES = [
  "nonvisual_or_screen_reader",
  "keyboard_only_or_no_pointer",
  "low_vision_or_colour_vision",
  "reduced_mobility_or_wheelchair",
  "older_user_or_cognitive_load",
  "non_chinese_or_multilingual",
  "no_smartphone_or_no_app",
  "algorithm_or_data_refusal",
];
const EXPECTED_ROUTES = ["smart_layer_optional", "human_service_floor"];
const EXPECTED_RULES = {
  same_core_outcome_target: true,
  same_queue_priority_target: true,
  price_premium_max_cny: 0,
  basic_safety_information_parity_target: true,
  personal_smartphone_or_app_required: false,
  algorithm_or_data_refusal_penalty_prohibited: true,
  human_takeover_required: true,
  complaint_and_stop_receipt_required: true,
};

if (contract.evidence_level !== "E2_design_requirement_fixture") errors.push("evidence_level 必须保持为 E2 设计需求夹具");
if (contract.activation_state !== "specified_not_observed") errors.push("activation_state 不得写成已观察或已启用");
for (const [key, expected] of Object.entries(EXPECTED_RULES)) {
  if (!contract.public_service_rules || contract.public_service_rules[key] !== expected) {
    errors.push(`公共服务规则 ${key} 应为 ${JSON.stringify(expected)}`);
  }
}

const ledgers = Array.isArray(suite.ledgers) ? suite.ledgers : [];
const tasks = Array.isArray(simulation.tasks) ? simulation.tasks : [];
const routes = Array.isArray(contract.scenario_routes) ? contract.scenario_routes : [];
if (ledgers.length !== 12) errors.push(`交接账 ${ledgers.length} 条，应为 12`);
if (tasks.length !== 12) errors.push(`simulation 任务 ${tasks.length} 条，应为 12`);
if (routes.length !== 12) errors.push(`基础路线 ${routes.length} 条，应为 12`);
if (new Set(routes.map((item) => item.scenario_id)).size !== routes.length) errors.push("基础路线 scenario_id 有重复");

let humanFloorChannels = 0;
let validScenarioRoutes = 0;
for (let i = 1; i <= 12; i += 1) {
  const id = `SCN-${String(i).padStart(2, "0")}`;
  const route = routes.find((item) => item.scenario_id === id);
  const task = tasks.find((item) => item.scenario_id === id);
  const ledger = ledgers.find((item) => item.scenario_anchor && item.scenario_anchor.scenario_id === id);
  const local = [];
  if (!route) local.push("合同基础路线缺失");
  if (!task) local.push("simulation 任务缺失");
  if (!ledger) local.push("交接账缺失");
  if (route && route.design_state !== "specified_not_observed") local.push("design_state 不是 specified_not_observed");
  if (route && task && route.base_route_zh !== task.human_fallback_zh) local.push("基础路线与 simulation 人工兜底不一致");
  if (route && route.ledger_pointer !== `visual/assets/governance/shift-ledger-suite.json#${id}`) local.push("ledger_pointer 不一致");
  if (ledger) {
    const floor = ledger.human_service_floor || {};
    const channels = Array.isArray(floor.channels) ? floor.channels : [];
    humanFloorChannels += channels.length;
    if (floor.must_exist_before_smart_layer !== true) local.push("人工底线未声明先于智能层");
    if (floor.device_free_access !== true) local.push("未声明无需个人设备");
    if (!String(floor.floor_rule_zh || "").includes("拒绝智能服务不得降低")) local.push("缺少拒绝不降级规则");
    if (route && !String(floor.floor_rule_zh || "").includes(route.base_route_zh)) local.push("人工底线未绑定合同基础路线");
    if (channels.length !== 2) local.push(`人工渠道 ${channels.length} 条，应为 2`);
    if (channels.some((channel) => channel.proof_state !== "not_observed")) local.push("人工渠道被写成已观察");
  }
  if (local.length) errors.push(`${id}: ${local.join("；")}`);
  else validScenarioRoutes += 1;
}

const fixtures = Array.isArray(contract.accessibility_requirement_fixtures)
  ? contract.accessibility_requirement_fixtures : [];
if (fixtures.length !== EXPECTED_MODES.length) errors.push(`无障碍需求夹具 ${fixtures.length} 条，应为 ${EXPECTED_MODES.length}`);
if (new Set(fixtures.map((item) => item.task_id)).size !== fixtures.length) errors.push("无障碍 task_id 有重复");
if (!exactSet(fixtures.map((item) => item.mode), EXPECTED_MODES)) errors.push("八类无障碍需求模式集合不一致");

let validFixtures = 0;
for (const item of fixtures) {
  const local = [];
  if (!EXPECTED_MODES.includes(item.mode)) local.push(`未知 mode ${item.mode}`);
  if (!exactSet(item.required_routes, EXPECTED_ROUTES)) local.push("required_routes 不完整");
  if (!Array.isArray(item.required_design_features) || item.required_design_features.length < 3) local.push("设计要件少于 3 项");
  if (!Array.isArray(item.required_field_evidence) || item.required_field_evidence.length < 2) local.push("待采现场证据少于 2 项");
  if (!String(item.task_zh || "").trim() || !String(item.task_en || "").trim()) local.push("中英任务说明缺失");
  if (!String(item.stop_condition_zh || "").includes("关闭智能层")) local.push("停止条件未明确关闭智能层");
  if (item.status !== "specified_not_observed") local.push("status 不是 specified_not_observed");
  if (item.observed_user_count !== 0) local.push("observed_user_count 必须保持 0，直至真实证据到位");
  if (item.pass_claimed !== false) local.push("pass_claimed 必须为 false");
  if (local.length) errors.push(`${item.task_id || "未知任务"}: ${local.join("；")}`);
  else validFixtures += 1;
}

const summary = contract.summary || {};
const expectedSummary = {
  scenario_count: 12,
  scenarios_with_no_ai_base_route: 12,
  scenario_route_coverage_ratio: 1,
  human_floor_channels_specified: 24,
  accessibility_requirement_fixture_count: 8,
  accessibility_requirement_fixture_coverage_ratio: 1,
  real_user_observation_count: 0,
  real_user_pass_count: 0,
  field_test_status: "not_observed",
  professional_confirmation_status: "not_started",
};
for (const [key, expected] of Object.entries(expectedSummary)) {
  if (summary[key] !== expected) errors.push(`summary.${key} 应为 ${JSON.stringify(expected)}，实为 ${JSON.stringify(summary[key])}`);
}
if (validScenarioRoutes !== 12) errors.push(`完整基础路线 ${validScenarioRoutes}/12`);
if (humanFloorChannels !== 24) errors.push(`人工底线渠道 ${humanFloorChannels} 条，应为 24`);
if (validFixtures !== 8) errors.push(`完整无障碍需求夹具 ${validFixtures}/8`);

const expectedMetrics = {
  no_ai_equivalent_scenario_count: 12,
  no_ai_equivalent_service_target_ratio: 1,
  algorithm_refusal_no_penalty_scenario_count: 12,
  accessibility_requirement_fixture_task_count: 8,
  accessibility_requirement_fixture_coverage_ratio: 1,
  real_user_accessibility_observation_count: 0,
  real_user_accessibility_pass_count: 0,
};
for (const [id, expected] of Object.entries(expectedMetrics)) {
  const value = metrics[id] && metrics[id].value;
  if (value !== expected) errors.push(`metrics.${id} 应为 ${expected}，实为 ${JSON.stringify(value)}`);
}

const result = {
  ok: errors.length === 0,
  scenarios_checked: routes.length,
  no_ai_base_routes_valid: validScenarioRoutes,
  human_floor_channels_checked: humanFloorChannels,
  accessibility_requirement_fixtures_checked: fixtures.length,
  accessibility_requirement_fixtures_valid: validFixtures,
  public_service_rules_checked: Object.keys(EXPECTED_RULES).length,
  real_user_observation_count: summary.real_user_observation_count,
  real_user_pass_count: summary.real_user_pass_count,
  field_test_status: summary.field_test_status,
  errors,
};

if (process.argv.includes("--json")) console.log(JSON.stringify(result, null, 2));
else if (result.ok) console.log("PASS  12/12 无 AI 基础路线、24 条人工渠道与 8/8 无障碍需求夹具完整；真实用户观察 0、通过 0");
else {
  console.error("FAIL  公共服务等价合同不一致");
  for (const error of errors) console.error(`- ${error}`);
}
process.exit(result.ok ? 0 : 1);
