#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { evaluate, inject } = require("./correction-engine");
const fixtureBytes = fs.readFileSync(path.join(__dirname, "correction-receipt-demo.json"));
const fixture = JSON.parse(fixtureBytes);
const clone = () => JSON.parse(JSON.stringify(fixture));
const tests = [];
function check(name, input, expected) {
  const actual = evaluate(input);
  assert.equal(actual.state, expected, name);
  tests.push({ name, expected, actual: actual.state, reason: actual.reason, passed: true });
}
check("complete synthetic fixture", fixture, "synthetic_complete");
for (const row of fixture.fail_closed_tests) check("remove " + row.removed_field, inject(fixture, row.removed_field), row.expected_state);
const unacked = clone(); unacked.original_channels[1].acknowledged = false;
check("one original channel unacknowledged", unacked, "pause");
const duplicate = clone(); duplicate.original_channels[1].id = duplicate.original_channels[0].id;
check("duplicate channel cannot count twice", duplicate, "pause");
const falseCoverage = clone(); falseCoverage.receipt.same_channel_correction_status.corrected_channels = 1;
check("receipt and channel counts must agree", falseCoverage, "pause");
const pendingRecovery = clone(); pendingRecovery.receipt.asset_data_recovery_record.offline_cache_cleared = false;
check("uncleared cache blocks restoration", pendingRecovery, "retire");
const live = clone(); live.case.live_public_release = true;
check("synthetic fixture cannot authorize live publication", live, "pause");
const replaced = clone(); replaced.original_channels[1].id = "CHANNEL-NEW-UNRELATED";
check("two receipts on different channels do not satisfy same-channel correction", replaced, "pause");
const noInventory = clone(); delete noInventory.case.original_channel_ids;
check("publication inventory cannot be omitted", noInventory, "pause");
const conflicted = clone(); conflicted.receipt.independent_reviewer = conflicted.receipt.accountable_role;
check("same accountable and reviewing role cannot count as independent", conflicted, "pause");
const nullChannel = clone(); nullChannel.original_channels[0] = null;
check("malformed channel receipt fails closed without a crash", nullChannel, "pause");
console.log(JSON.stringify({ ok: true, scope: "local_synthetic_software_test_not_field_performance", fixture_sha256: crypto.createHash("sha256").update(fixtureBytes).digest("hex"), tests }, null, 2));
