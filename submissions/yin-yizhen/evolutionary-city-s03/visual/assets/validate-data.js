#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const Engine = require("./evolution-engine.js");

const REQUIRED_TOP_LEVEL = [
  "city_input", "constitution", "evolutionary_cells", "genomes", "individuals",
  "agent_policies", "evaluation_vectors", "behavior_descriptors", "niche_archive",
  "selection_events", "lineage_events", "human_interventions", "real_world_cycles",
  "digital_user_simulation", "transfer_tests"
];
const REQUIRED_AGENTS = [
  "AG-EVIDENCE", "AG-CONSTITUTION", "AG-CELL", "AG-NETWORK", "AG-PROGRAM-TIME",
  "AG-FORM-PUBLIC", "AG-HERITAGE", "AG-MOBILITY", "AG-CLIMATE", "AG-PUBLIC-VALUE",
  "AG-DIGITAL-USE", "AG-FEASIBILITY", "AG-RISK", "AG-MEMORY", "AG-ADAPTATION", "GEOMETRY-KERNEL", "QD-CONTROLLER"
];
const FORBIDDEN_EXACT_KEYS = new Set(["score", "scores", "fitness", "fitness_score", "total_score", "ranking", "rank", "winner"]);

function uniqueIds(items, owner, errors) {
  if (!Array.isArray(items) || !items.length) {
    errors.push(`${owner}: must be a non-empty array`);
    return new Set();
  }
  const ids = items.map((item) => item.id);
  if (ids.some((id) => !id)) errors.push(`${owner}: every item requires an id`);
  if (new Set(ids).size !== ids.length) errors.push(`${owner}: duplicate ids`);
  return new Set(ids);
}

function validate(data) {
  const errors = [];
  if (data.schema_version !== "2.0.0") errors.push("schema_version: expected 2.0.0");
  REQUIRED_TOP_LEVEL.filter((key) => !(key in data)).forEach((key) => errors.push(`root: missing ${key}`));
  if (data.engine?.digital_generations !== 40) errors.push("engine: digital_generations must be 40");
  if (data.engine?.offspring_per_generation !== 36) errors.push("engine: offspring_per_generation must be 36");
  if (data.engine?.single_aggregate_metric !== false) errors.push("engine: a single aggregate metric is forbidden");
  if (data.evaluation_vectors?.aggregation !== null) errors.push("evaluation_vectors: aggregation must remain null");
  if (data.niche_archive?.global_ranking !== false) errors.push("niche_archive: global ranking must remain false");

  const evidenceIds = uniqueIds(data.evidence, "evidence", errors);
  uniqueIds(data.unknowns, "unknowns", errors);
  const cellIds = uniqueIds(data.evolutionary_cells, "evolutionary_cells", errors);
  const agentIds = uniqueIds(data.agent_policies, "agent_policies", errors);
  REQUIRED_AGENTS.filter((id) => !agentIds.has(id)).forEach((id) => errors.push(`agent_policies: missing ${id}`));

  (data.evolutionary_cells || []).forEach((cell) => {
    if (!["slow", "medium", "fast"].includes(cell.layer)) errors.push(`${cell.id}: invalid layer`);
    if (cell.layer === "slow" && cell.locked !== true) errors.push(`${cell.id}: slow layer must be locked`);
    if (!Array.isArray(cell.rect) || cell.rect.length !== 4 || !cell.rect.every(Number.isFinite)) errors.push(`${cell.id}: rect must contain four numbers`);
  });
  const baselineGeometry = data.evolutionary_cells ? Engine.validateGeometry(data.evolutionary_cells.map((cell) => ({...cell})), data) : {valid: false, errors: []};
  baselineGeometry.errors.forEach((error) => errors.push(`evolutionary_cells: ${error.code} ${error.target}`));

  const operatorAgentIds = new Set((data.genomes?.mutation_operators || []).map((operator) => operator.agent_id));
  operatorAgentIds.forEach((id) => { if (!agentIds.has(id)) errors.push(`mutation operator: missing agent ${id}`); });
  const commandRequired = new Set(data.mutation_command_contract?.required || []);
  ["agent_id", "operator_id", "target_ids", "source_ids", "reversible", "parameters", "generation", "parent_ids"].forEach((field) => {
    if (!commandRequired.has(field)) errors.push(`MutationCommand: missing required field ${field}`);
  });

  (data.agent_policies || []).forEach((agent) => {
    ["input", "output", "can", "cannot", "human_confirmation"].forEach((field) => {
      if (!Array.isArray(agent[field])) errors.push(`${agent.id}: ${field} must be an array`);
    });
    if (agent.can?.includes("modify_constitution")) errors.push(`${agent.id}: agents cannot modify the constitution`);
    if (agent.can?.includes("approve_irreversible_construction")) errors.push(`${agent.id}: agents cannot approve irreversible construction`);
  });
  const constitutionAgent = (data.agent_policies || []).find((agent) => agent.id === "AG-CONSTITUTION");
  if (!constitutionAgent?.cannot?.includes("modify_constitution")) errors.push("AG-CONSTITUTION: modify_constitution must be forbidden");
  const memoryAgent = (data.agent_policies || []).find((agent) => agent.id === "AG-MEMORY");
  if (!memoryAgent?.cannot?.includes("delete_failure")) errors.push("AG-MEMORY: delete_failure must be forbidden");

  (data.human_interventions || []).forEach((event) => {
    if (!event.affected_cell_ids?.every((id) => cellIds.has(id))) errors.push(`${event.id}: affected cell does not exist`);
    if (!event.allowed_followup?.includes("preserve_unaffected_archive")) errors.push(`${event.id}: must preserve unaffected archive`);
  });
  if ((data.transfer_tests || []).length !== 3) errors.push("transfer_tests: exactly three schematic stress tests are required");
  const digital = data.digital_user_simulation || {};
  if ((digital.population || []).reduce((sum, group) => sum + Number(group.count || 0), 0) !== 100) errors.push("digital_user_simulation: population must total 100");
  if ((digital.variant_ids || []).length !== 3) errors.push("digital_user_simulation: exactly three public variants are required");
  if ((digital.scenario_ids || []).length !== 4) errors.push("digital_user_simulation: exactly four public scenarios are required");
  if (digital.single_aggregate_metric !== false) errors.push("digital_user_simulation: a single aggregate metric is forbidden");
  if (!(digital.forbidden_selection_objects || []).includes("DigitalUser")) errors.push("digital_user_simulation: DigitalUser must be a forbidden selection object");
  (data.evidence || []).forEach((item) => {
    if (!item.url || !item.status || !item.limitations_zh) errors.push(`${item.id}: url, status and limitations_zh are required`);
  });
  if (!evidenceIds.has("EVD-008") || !evidenceIds.has("EVD-009") || !evidenceIds.has("EVD-010")) errors.push("evidence: core evolutionary method references are missing");

  function walk(value, location = "root") {
    if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${location}[${index}]`));
    if (!value || typeof value !== "object") return;
    Object.entries(value).forEach(([key, child]) => {
      if (FORBIDDEN_EXACT_KEYS.has(key.toLowerCase())) errors.push(`${location}.${key}: single-score, ranking and winner fields are forbidden`);
      walk(child, `${location}.${key}`);
    });
  }
  walk(data);
  return errors;
}

function load(file = path.resolve(__dirname, "..", "..", "simulation.json")) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

if (require.main === module) {
  const data = load(process.argv[2] ? path.resolve(process.argv[2]) : undefined);
  const errors = validate(data);
  if (errors.length) {
    console.error(`City Genome data validation failed (${errors.length}):`);
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }
  console.log(`City Genome data validation passed: ${data.evolutionary_cells.length} seed cells, ${data.agent_policies.length} policies, ${data.transfer_tests.length} transfer tests.`);
}

module.exports = {load, validate};
