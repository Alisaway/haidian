(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.JZACCorrection = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  function evaluate(record) {
    const receipt = record && record.receipt;
    if (!receipt || !receipt.asset_data_recovery_record) return { state: "retire", reason: "recovery_record_missing" };
    for (const key of ["accountable_role", "independent_reviewer", "pause_record", "evidence_basis", "review_result", "product_retest_task", "procurement_update"]) {
      if (typeof receipt[key] !== "string" || !receipt[key].trim()) return { state: "pause", reason: key + "_missing" };
    }
    if (record.status !== "synthetic_drill_not_field_result" || record.case?.live_public_release !== false) {
      return { state: "pause", reason: "synthetic_boundary_required" };
    }
    const channels = record.original_channels;
    if (!Array.isArray(channels) || channels.length !== 2) return { state: "pause", reason: "channel_inventory_incomplete" };
    if (channels.some(c => !c || typeof c !== "object")) return { state: "pause", reason: "invalid_channel_receipt" };
    const originalIds = record.case.original_channel_ids;
    if (!Array.isArray(originalIds) || originalIds.length !== 2 || new Set(originalIds).size !== 2 || originalIds.some(id => typeof id !== "string" || !id.trim())) return { state: "pause", reason: "original_publication_inventory_missing" };
    if (new Set(channels.map(c => c.id)).size !== channels.length) return { state: "pause", reason: "duplicate_channel" };
    if (channels.some(c => !originalIds.includes(c.id))) return { state: "pause", reason: "not_the_original_channels" };
    if (receipt.independent_reviewer.trim() === receipt.accountable_role.trim()) return { state: "pause", reason: "reviewer_conflict" };
    if (channels.some(c => !c.id || !c.pause_status || !c.correction_status || c.acknowledged !== true)) {
      return { state: "pause", reason: "channel_receipt_incomplete" };
    }
    const coverage = receipt.same_channel_correction_status;
    if (!coverage || coverage.required_channels !== channels.length || coverage.corrected_channels !== channels.length || coverage.coverage_ratio !== 1) {
      return { state: "pause", reason: "coverage_mismatch" };
    }
    const recovery = receipt.asset_data_recovery_record;
    if (["temporary_label_restored", "offline_cache_cleared", "synthetic_test_material_isolated"].some(k => recovery[k] !== true)) {
      return { state: "retire", reason: "recovery_incomplete" };
    }
    return { state: "synthetic_complete", reason: "not_authorized_for_field_use" };
  }
  function inject(record, field) {
    const copy = JSON.parse(JSON.stringify(record));
    if (field === "original_channels") delete copy.original_channels;
    else delete copy.receipt[field];
    return copy;
  }
  return { evaluate, inject };
});
