#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const REGISTER_PATH = path.join(__dirname, 'implementation-readiness-register.json');
const EXPECTED_PROJECTS = ['C-01', 'C-02', 'C-03', 'C-04', 'C-05', 'C-06', 'C-07', 'C-08', 'C-09'];
const EXPECTED_GATES = ['GATE-0', 'GATE-1', 'GATE-2', 'GATE-3'];
const EXPECTED_ROLES = [
  'field_validation_lead',
  'site_operator',
  'accessibility_reviewer',
  'data_and_licence_reviewer',
  'safety_and_stop_reviewer',
  'evidence_custodian',
];
const FORBIDDEN_CURRENT_STATUSES = new Set(['verified', 'observed', 'confirmed', 'signed', 'implemented', 'ready_for_operation']);

function readRegister() {
  return JSON.parse(fs.readFileSync(REGISTER_PATH, 'utf8'));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function add(errors, condition, message) {
  if (!condition) errors.push(message);
}

function audit(register) {
  const errors = [];
  add(errors, isObject(register), 'register must be an object');
  if (!isObject(register)) return errors;

  add(errors, register.register_id === 'IMPLEMENTATION-READINESS-01', 'wrong register_id');
  add(errors, register.evidence_level === 'E2_design_handoff_only', 'evidence level must remain E2_design_handoff_only');
  add(errors, register.current_status === 'not_ready_for_field_operation', 'current status must remain not_ready_for_field_operation');
  add(errors, isObject(register.truth_boundary), 'truth_boundary is required');
  if (isObject(register.truth_boundary)) {
    add(errors, register.truth_boundary.field_authorization === 'unknown', 'field authorization must remain unknown');
    add(errors, register.truth_boundary.observed_workflow === 'not_observed', 'observed workflow must remain not_observed');
    add(errors, register.truth_boundary.operator_assignment === 'unknown', 'operator assignment must remain unknown');
    add(errors, register.truth_boundary.professional_confirmation === 'unknown', 'professional confirmation must remain unknown');
    add(errors, register.truth_boundary.signoff_status === 'not_signed', 'signoff status must remain not_signed');
    add(errors, register.truth_boundary.implementation_commitment === 'not_confirmed', 'implementation commitment must remain not_confirmed');
  }

  const gates = register.implementation_gates;
  add(errors, Array.isArray(gates), 'implementation_gates must be an array');
  if (Array.isArray(gates)) {
    add(errors, JSON.stringify(gates.map((gate) => gate.gate_id)) === JSON.stringify(EXPECTED_GATES), 'gate IDs are incomplete or out of order');
    for (const gate of gates) {
      add(errors, isObject(gate), 'each gate must be an object');
      if (!isObject(gate)) continue;
      add(errors, !FORBIDDEN_CURRENT_STATUSES.has(gate.current_status), `${gate.gate_id} has an over-strong current status`);
      add(errors, gate.owner_entity === null, `${gate.gate_id} owner_entity must remain null`);
      add(errors, gate.owner_status === 'unknown', `${gate.gate_id} owner_status must remain unknown`);
      add(errors, Array.isArray(gate.entry_requirements) && gate.entry_requirements.length > 0, `${gate.gate_id} needs entry requirements`);
      add(errors, Array.isArray(gate.exit_artifacts) && gate.exit_artifacts.length > 0, `${gate.gate_id} needs exit artifacts`);
      add(errors, Array.isArray(gate.stop_if) && gate.stop_if.length > 0, `${gate.gate_id} needs stop conditions`);
    }
  }

  const projects = register.projects;
  add(errors, Array.isArray(projects), 'projects must be an array');
  if (Array.isArray(projects)) {
    add(errors, JSON.stringify(projects.map((project) => project.project_id)) === JSON.stringify(EXPECTED_PROJECTS), 'project IDs are incomplete or out of order');
    for (const project of projects) {
      add(errors, isObject(project), 'each project must be an object');
      if (!isObject(project)) continue;
      add(errors, project.current_status === 'template_only', `${project.project_id} must remain template_only`);
      add(errors, project.accountable_entity === null, `${project.project_id} accountable_entity must remain null`);
      add(errors, project.accountable_status === 'unknown', `${project.project_id} accountable_status must remain unknown`);
      add(errors, Array.isArray(project.pilot_area_refs) && project.pilot_area_refs.length > 0, `${project.project_id} needs a pilot-area reference`);
      add(errors, Array.isArray(project.outputs) && project.outputs.length > 0, `${project.project_id} needs outputs`);
      add(errors, Array.isArray(project.acceptance_metrics) && project.acceptance_metrics.length > 0, `${project.project_id} needs acceptance metrics`);
      add(errors, Array.isArray(project.exit_artifacts) && project.exit_artifacts.length > 0, `${project.project_id} needs exit artifacts`);
      add(errors, Array.isArray(project.stop_conditions) && project.stop_conditions.length > 0, `${project.project_id} needs stop conditions`);
    }
  }

  const roles = register.role_slots;
  add(errors, Array.isArray(roles), 'role_slots must be an array');
  if (Array.isArray(roles)) {
    add(errors, JSON.stringify(roles.map((role) => role.role_slot)) === JSON.stringify(EXPECTED_ROLES), 'role slots are incomplete or out of order');
    for (const role of roles) {
      add(errors, isObject(role), 'each role slot must be an object');
      if (!isObject(role)) continue;
      add(errors, role.entity === null, `${role.role_slot} entity must remain null`);
      add(errors, role.status === 'unknown', `${role.role_slot} status must remain unknown`);
      add(errors, role.signoff_status === 'not_signed', `${role.role_slot} signoff must remain not_signed`);
    }
  }

  const clusters = register.handoff_clusters;
  add(errors, Array.isArray(clusters) && clusters.length === 6, 'exactly six handoff clusters are required');
  if (Array.isArray(clusters)) {
    for (const cluster of clusters) {
      add(errors, isObject(cluster), 'each handoff cluster must be an object');
      if (!isObject(cluster)) continue;
      add(errors, !FORBIDDEN_CURRENT_STATUSES.has(cluster.current_status), `${cluster.cluster_id} has an over-strong current status`);
      add(errors, Array.isArray(cluster.required_artifacts) && cluster.required_artifacts.length > 0, `${cluster.cluster_id} needs required artifacts`);
      add(errors, typeof cluster.prohibited_claim === 'string' && cluster.prohibited_claim.length > 0, `${cluster.cluster_id} needs a prohibited-claim boundary`);
    }
  }

  return errors;
}

function result(ok, errors, extra = {}) {
  return {
    ok,
    register_id: 'IMPLEMENTATION-READINESS-01',
    evidence_level: 'E2_design_handoff_only',
    current_status: 'not_ready_for_field_operation',
    counts: { gates: EXPECTED_GATES.length, projects: EXPECTED_PROJECTS.length, role_slots: EXPECTED_ROLES.length, handoff_clusters: 6 },
    errors,
    ...extra,
  };
}

function main() {
  const args = new Set(process.argv.slice(2));
  const json = args.has('--json');
  let register;
  try {
    register = readRegister();
  } catch (error) {
    const output = result(false, [`cannot read register: ${error.message}`]);
    console.log(JSON.stringify(output, null, 2));
    return 1;
  }

  const errors = audit(register);
  if (args.has('--self-test')) {
    const mutation = JSON.parse(JSON.stringify(register));
    mutation.projects[0].accountable_status = 'confirmed';
    const mutationErrors = audit(mutation);
    if (mutationErrors.length === 0) errors.push('self-test mutation did not fail closed');
    const output = result(errors.length === 0, errors, { self_test: { mutation: 'actor_confirmation', failed_closed: mutationErrors.length > 0 } });
    console.log(JSON.stringify(output, null, 2));
    return errors.length === 0 ? 0 : 1;
  }

  const output = result(errors.length === 0, errors);
  if (json || args.size === 0) console.log(JSON.stringify(output, null, 2));
  else console.log(output.ok ? 'PASS' : `FAIL\n${errors.join('\n')}`);
  return output.ok ? 0 : 1;
}

process.exitCode = main();
