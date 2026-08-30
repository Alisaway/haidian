const fs = require('fs');
const path = require('path');

const assets = __dirname;
const submission = path.resolve(assets, '..', '..');
const read = (relative) => JSON.parse(fs.readFileSync(path.join(submission, relative), 'utf8'));

const assumptions = read('assumptions.json');
const sources = read('sources.json');
const compliance = read('compliance_matrix.json');
const standards = read('standard_matrix.json');
const taskbook = read('visual/assets/taskbook-response-index.json');
const pilot = read('visual/assets/pilot-operations-plan.json');
const knownStandards = new Set(standards.standards.map((item) => item.standard_id));

const taskOutputs = taskbook.tasks.flatMap((task) => task.output_evidence);
const allEvidenceLocated = taskOutputs.every((item) =>
  item.proposal_sections.length > 0 &&
  item.figure_refs.length > 0 &&
  item.structured_refs.length > 0 &&
  item.source_ids.length > 0
);
const activityAccountability = pilot.raci_activities.every((item) =>
  typeof item.accountable === 'string' && item.accountable.length > 0
);
const supplierNeverApproves = pilot.raci_activities.every((item) => item.accountable !== 'ai_supplier');
const standardNamespaceClean = compliance.requirements.every((item) =>
  Array.isArray(item.standard_ids) &&
  item.standard_ids.length > 0 &&
  item.standard_ids.every((id) => knownStandards.has(id)) &&
  item.source_ids.every((id) => !knownStandards.has(id))
);
const sourceRightsClosed = sources.sources.every((item) =>
  item.last_verified_date && item.evidence_level && item.use_class &&
  item.rights_status && item.material_reused && item.license_or_reuse_note &&
  item.purpose_zh && item.limitations_zh
);
const followupsStructured = assumptions.conditional_followups.every((item) =>
  item.blocking_now === false && item.trigger && item.owner && item.action_zh && item.action_en
);

const checks = {
  no_current_participant_blockers_declared: assumptions.current_participant_controlled_blockers.length === 0,
  nine_conditional_followups_structured: assumptions.conditional_followups.length === 9 && followupsStructured,
  all_sources_have_rights_and_use_closure: sourceRightsClosed,
  six_agent_tasks_mapped: taskbook.task_count === 6 && taskbook.tasks.length === 6,
  thirty_one_required_outputs_mapped: taskbook.required_output_count === 31 && taskbook.mapped_output_count === 31 && taskOutputs.length === 31,
  every_task_output_has_human_and_machine_evidence: allEvidenceLocated,
  compliance_standard_namespace_clean: standardNamespaceClean,
  eight_mvp_launch_gates: pilot.launch_conditions.length === 8,
  seven_raci_roles_and_single_accountability: pilot.raci_roles.length === 7 && activityAccountability,
  supplier_never_self_approves: supplierNeverApproves,
  minimum_data_contract_forbids_identity_and_biometrics: pilot.minimum_data_contract.forbidden_by_default.includes('name') && pilot.minimum_data_contract.forbidden_by_default.includes('biometric'),
  human_and_no_ai_paths_are_explicit: pilot.human_scope.length >= 4 && Boolean(pilot.no_ai_fallback.service),
  six_exception_routes_defined: pilot.exception_playbook.length === 6,
  four_degradation_modes_defined: pilot.degradation_modes.length === 4,
  eight_acceptance_metrics_separate_current_from_field_evidence: pilot.acceptance_metrics.length === 8 && pilot.acceptance_metrics.every((item) => item.current_evidence && item.field_status && item.evidence_artifact),
  exit_restores_public_use_without_supplier_lock_in: pilot.exit_and_public_reuse.retain_for_public_use.length >= 4 && pilot.exit_and_public_reuse.lock_in_rule.includes('without the AI supplier')
};

const result = {
  generated_by: 'visual/assets/run-v4-contract-audit.js',
  network_access: false,
  participant_authored_audit: true,
  review_agent_decision: false,
  review_contract_target: 'advisory_review.schema.json 0.2.1',
  check_count: Object.keys(checks).length,
  pass_count: Object.values(checks).filter(Boolean).length,
  checks,
  counts: {
    sources: sources.sources.length,
    conditional_followups: assumptions.conditional_followups.length,
    agent_tasks: taskbook.tasks.length,
    required_outputs: taskbook.required_output_count,
    mapped_outputs: taskbook.mapped_output_count,
    launch_gates: pilot.launch_conditions.length,
    raci_roles: pilot.raci_roles.length,
    acceptance_metrics: pilot.acceptance_metrics.length
  },
  limitations: [
    'This audit checks package structure only and cannot decide the Review Agent score or publication recommendation.',
    'Field pilot, human accessibility testing, authorization, and official geometry remain untriggered conditional follow-ups.'
  ]
};

fs.writeFileSync(path.join(assets, 'v4-contract-audit-evidence.json'), JSON.stringify(result, null, 2) + '\n');
if (result.pass_count !== result.check_count) process.exitCode = 1;
console.log(`Translation Grounds V4 contract audit: ${result.pass_count}/${result.check_count} checks passed`);
