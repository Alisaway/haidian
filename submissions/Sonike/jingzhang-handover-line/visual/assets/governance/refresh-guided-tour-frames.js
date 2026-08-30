#!/usr/bin/env node
"use strict";

/* Replaces only the two F/05 shot intervals in each existing guided tour.
 * Audio is stream-copied. The first interval receives the current P0
 * pre-feasibility board; the later refusal narration receives F/12, whose
 * visible REFUSED / smart-layer-off state matches the spoken claim.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const FFMPEG = "/opt/homebrew/bin/ffmpeg";
const FFPROBE = "/opt/homebrew/bin/ffprobe";

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) fail(`${command} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

for (const tool of [FFMPEG, FFPROBE]) if (!fs.existsSync(tool)) fail(`missing dependency: ${tool}`);

function duration(file) {
  return Number(run(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file]).trim());
}

function rebuild(lang) {
  const suffix = lang === "en" ? ".en" : "";
  const source = path.join(PKG, `assets/media/guided-tour${suffix}.mp4`);
  const feasibility = path.join(PKG, `assets/figures/metrics-evidence${suffix}.png`);
  const refusal = path.join(PKG, `assets/figures/shift-ledger${suffix}.png`);
  for (const file of [source, feasibility, refusal]) if (!fs.existsSync(file)) fail(`missing input: ${file}`);
  const before = duration(source);
  const work = fs.mkdtempSync(path.join(os.tmpdir(), `jz-guided-${lang}-`));
  const output = path.join(work, path.basename(source));
  const filter = [
    "[1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0xf2eddf,format=rgba[feas]",
    "[2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0xf2eddf,format=rgba[refuse]",
    "[0:v][feas]overlay=0:0:enable='between(t,22.8,42.0)'[v1]",
    "[v1][refuse]overlay=0:0:enable='between(t,147.1,167.0)',format=yuv420p[vout]",
  ].join(";");
  run(FFMPEG, [
    "-y", "-i", source, "-loop", "1", "-i", feasibility, "-loop", "1", "-i", refusal,
    "-filter_complex", filter, "-map", "[vout]", "-map", "0:a:0",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-r", "12",
    "-c:a", "copy", "-t", before.toFixed(3), "-movflags", "+faststart", output,
  ]);
  const after = duration(output);
  if (Math.abs(before - after) > 0.02) fail(`${lang}: duration drift ${before} -> ${after}`);
  fs.renameSync(output, source);
  fs.rmSync(work, { recursive: true, force: true });
  process.stdout.write(`${source} (${after.toFixed(3)} s)\n`);
}

rebuild("zh");
rebuild("en");
