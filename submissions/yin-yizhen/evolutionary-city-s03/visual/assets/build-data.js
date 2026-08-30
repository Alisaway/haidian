#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const proposalRoot = path.resolve(__dirname, "..", "..");
const input = path.join(proposalRoot, "simulation.json");
const output = path.join(__dirname, "data.generated.js");
const raw = fs.readFileSync(input);
const data = JSON.parse(raw.toString("utf8"));
const digest = crypto.createHash("sha256").update(raw).digest("hex");
const banner = `/* GENERATED FILE — do not edit.\n * Source: ../../simulation.json\n * Source SHA-256: ${digest}\n */\n`;
const payload = JSON.stringify(data);
fs.writeFileSync(output, `${banner}window.EVOLUTION_DATA=${payload};\nwindow.EVOLUTION_DATA_SHA256="${digest}";\n`, "utf8");
console.log(`Built visual/assets/data.generated.js from simulation.json (${digest.slice(0, 12)}).`);
