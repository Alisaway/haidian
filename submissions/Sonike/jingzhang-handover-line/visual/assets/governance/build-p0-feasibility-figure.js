#!/usr/bin/env node
"use strict";

/*
 * Rebuilds the bilingual F/05 implementation board from the machine-readable
 * P0 delivery contract and pre-feasibility envelope. The board distinguishes
 * participant planning inputs from field evidence and refuses to render if the
 * arithmetic or external-evidence boundary drifts.
 */

const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OUT = path.join(PKG, "assets/figures");
const envelope = JSON.parse(fs.readFileSync(path.join(HERE, "p0-pre-feasibility-envelope.json"), "utf8"));
const delivery = JSON.parse(fs.readFileSync(path.join(HERE, "p0-delivery-contract.json"), "utf8"));
const metrics = JSON.parse(fs.readFileSync(path.join(PKG, "metrics.json"), "utf8")).metrics;

for (const [file, family] of [
  ["/System/Library/Fonts/Hiragino Sans GB.ttc", "Hiragino Sans GB"],
  ["/System/Library/Fonts/Supplemental/Arial.ttf", "Arial"],
]) {
  try { GlobalFonts.registerFromPath(file, family); } catch (_) {}
}

const C = {
  coal: "#171a18", ink: "#252a27", bone: "#f2eddf", paper: "#fbf8ef",
  grid: "#d4cdbd", muted: "#5b625d", red: "#c72d1e", redFill: "#e64b3c",
  cyan: "#00746f", cyanFill: "#00a79f", yellow: "#83660a", yellowFill: "#f1c64a",
  blue: "#365f82", paleBlue: "#dce8ed", paleRed: "#f3ded8", paleGreen: "#dcebe6",
  paleYellow: "#f5e8b9", disabled: "#a29e94", white: "#ffffff",
};

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function checkData() {
  const spatial = envelope.reference_spatial_envelope;
  const capacity = envelope.capacity_and_queue_screening;
  const cost = envelope.participant_cost_sensitivity_90_day;
  const kit = envelope.component_sensitivity_schedule;
  const kitLow = kit.reduce((sum, item) => sum + item.quantity * item.unit_rate_low_cny, 0);
  const kitHigh = kit.reduce((sum, item) => sum + item.quantity * item.unit_rate_high_cny, 0);
  const totalLow = cost.included_cost_lines.reduce((sum, item) => sum + item.low_cny, 0);
  const totalHigh = cost.included_cost_lines.reduce((sum, item) => sum + item.high_cny, 0);
  const checks = [
    [spatial.screening_control_envelope.area_sqm, 7.2 * 7.2, "control envelope"],
    [spatial.reversible_operating_patch.area_sqm, 6 * 6, "operating patch"],
    [capacity.screening_capacity_persons, Math.floor(36 / 2.4), "screening capacity"],
    [capacity.buffered_task_slots_per_day, 2 * 4 * 60 / 10 * 0.75, "buffered task slots"],
    [envelope.reference_operating_roster.staffed_seat_hours_90_day, 4 * 5 * 13 * 3, "staffed hours"],
    [kitLow, 17720, "kit low"], [kitHigh, 57000, "kit high"],
    [totalLow, cost.sensitivity_subtotal_low_cny, "cost low"],
    [totalHigh, cost.sensitivity_subtotal_high_cny, "cost high"],
    [delivery.current_evidence.real_participant_observations, 0, "real observations"],
    [delivery.procurement.total_budget_cny, null, "formal budget"],
  ];
  for (const [actual, expected, label] of checks) {
    if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`);
  }
  if (delivery.activation_state !== "not_started" || envelope.activation_state !== "design_reference_not_field_verified") {
    fail("P0 activation boundary drifted");
  }
  if (delivery.procurement.quote_slots.some((item) => item.amount_cny !== null || item.vendor !== null)) {
    fail("quote slots must remain blank before real procurement");
  }
  if (envelope.alternative_comparison.length !== 4) fail("alternative count must remain four");
}

function font(ctx, size, weight = 400, family = "Hiragino Sans GB") {
  ctx.font = `${weight} ${size}px "${family}"`;
}

function text(ctx, value, x, y, size, weight = 400, colour = C.ink, align = "left") {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = colour;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(String(value), x, y);
  ctx.restore();
}

function wrap(ctx, value, x, y, maxWidth, lineHeight, size, weight = 400, colour = C.muted, maxLines = 3) {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = colour;
  ctx.textBaseline = "alphabetic";
  const chunks = String(value).split(/\s+/);
  const isCjk = !String(value).includes(" ");
  const units = isCjk ? Array.from(String(value)) : chunks;
  let line = "";
  let lineCount = 0;
  let yy = y;
  for (let index = 0; index < units.length; index += 1) {
    const unit = units[index];
    const separator = isCjk || !line ? "" : " ";
    const trial = `${line}${separator}${unit}`;
    if (ctx.measureText(trial).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      lineCount += 1;
      if (lineCount >= maxLines) break;
      line = unit;
      yy += lineHeight;
    } else line = trial;
  }
  if (line && lineCount < maxLines) ctx.fillText(line, x, yy);
  ctx.restore();
}

function rounded(ctx, x, y, w, h, r, fill, stroke = null, width = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}

function line(ctx, x1, y1, x2, y2, colour, width = 1, dash = []) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

function dimension(ctx, x1, y1, x2, y2, label, vertical = false) {
  line(ctx, x1, y1, x2, y2, C.red, 1.5);
  if (vertical) {
    line(ctx, x1 - 6, y1, x1 + 6, y1, C.red, 1.5);
    line(ctx, x2 - 6, y2, x2 + 6, y2, C.red, 1.5);
    ctx.save(); ctx.translate(x1 - 12, (y1 + y2) / 2); ctx.rotate(-Math.PI / 2);
    text(ctx, label, 0, 0, 12, 800, C.red, "center"); ctx.restore();
  } else {
    line(ctx, x1, y1 - 6, x1, y1 + 6, C.red, 1.5);
    line(ctx, x2, y2 - 6, x2, y2 + 6, C.red, 1.5);
    text(ctx, label, (x1 + x2) / 2, y1 - 9, 12, 800, C.red, "center");
  }
}

function person(ctx, x, y, colour, radius = 9) {
  ctx.fillStyle = colour;
  ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.paper; ctx.lineWidth = 2; ctx.stroke();
}

const copy = {
  zh: {
    kicker: "F / 05 · P0 预可行性包络",
    title: "一张桌，先算清再进场",
    subtitle: "空间 × 容量 × 班次 × 成本 × 备选｜尺寸为概念筛选，金额为参赛者敏感性试算",
    planTitle: "7.2 m 控制包络 / 6.0 m 可撤工作面",
    planNote: "无新雨棚 · 无固定土建 · 两处开口 · 1.8 m 连续环线",
    operating: "运营上限",
    people: "公众（含陪同）",
    roles: "同时在岗角色",
    queue: "排队停止线",
    slots: "缓冲任务槽 / 日",
    evidence: "证据边界",
    evidenceLine: "离线 12/12 · 接管 48/48 · 现场 0/12 · 报价 0/3 · 预算 NULL",
    costTitle: "90 天参赛者敏感性",
    costValue: "约 12万—29万元",
    costNote: "不含场地、保险、税费、法定专业服务、永久工程与未查明公用事业",
    opexTitle: "年度运维敏感性",
    opexValue: "约 30万—65万元 / 年",
    reserve: "撤场储备 10%",
    remove: "4 h 撤场目标｜尚未实测",
    alternatives: "四个真实备选 / 没有方案可以绕过八道门",
    alt: ["既有人工底盘", "单面移动服务车", "双面公开交接桌", "借用既有室内房间"],
    altTag: ["不启动 P0", "小边界", "参考方案", "天气 / 市政回退"],
    footer: "FIELD 0 / 12 · FORMAL BUDGET NULL · INSURANCE NULL · PROFESSIONAL SIGN-OFF 0",
  },
  en: {
    kicker: "F / 05 · P0 PRE-FEASIBILITY ENVELOPE",
    title: "ONE TABLE · CALCULATE BEFORE ENTRY",
    subtitle: "SPACE × CAPACITY × ROSTER × COST × ALTERNATIVES | CONCEPT DIMENSIONS · PARTICIPANT SENSITIVITY",
    planTitle: "7.2 m CONTROL ENVELOPE / 6.0 m REVERSIBLE PATCH",
    planNote: "NO NEW CANOPY · NO FIXED WORKS · TWO OPENINGS · 1.8 m CLEAR LOOP",
    operating: "OPERATING CAP",
    people: "PUBLIC incl. companion",
    roles: "SIMULTANEOUS ROLE SEATS",
    queue: "QUEUE STOP LINE",
    slots: "BUFFERED TASK SLOTS / DAY",
    evidence: "EVIDENCE BOUNDARY",
    evidenceLine: "OFFLINE 12/12 · TAKEOVER 48/48 · FIELD 0/12 · QUOTES 0/3 · BUDGET NULL",
    costTitle: "90-DAY PARTICIPANT SENSITIVITY",
    costValue: "CNY 0.12-0.29m",
    costNote: "EXCLUDES SITE, INSURANCE, TAX, STATUTORY PROFESSIONAL WORK, PERMANENT WORKS AND UNKNOWN UTILITIES",
    opexTitle: "ANNUAL OPEX SENSITIVITY",
    opexValue: "CNY 0.30-0.65m / YEAR",
    reserve: "10% REMOVAL RESERVE",
    remove: "4 h REMOVAL TARGET · NOT FIELD-TESTED",
    alternatives: "FOUR REAL ALTERNATIVES / NONE BYPASSES THE EIGHT GATES",
    alt: ["EXISTING HUMAN FLOOR", "SINGLE-FACE CART", "TWO-FACE HANDOVER TABLE", "BORROWED INDOOR ROOM"],
    altTag: ["DO NOT START P0", "SMALL PATCH", "REFERENCE SCHEME", "WEATHER / UTILITY FALLBACK"],
    footer: "FIELD 0 / 12 · FORMAL BUDGET NULL · INSURANCE NULL · PROFESSIONAL SIGN-OFF 0",
  },
};

function drawPlan(ctx, lang, x, y, size) {
  const t = copy[lang];
  rounded(ctx, x, y, size, size, 16, C.paper, C.coal, 2);
  const control = size - 52;
  const cx = x + 26, cy = y + 28;
  ctx.save();
  ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([8, 7]);
  ctx.strokeRect(cx, cy, control, control); ctx.restore();
  const patch = control * (6 / 7.2);
  const px = cx + (control - patch) / 2, py = cy + (control - patch) / 2;
  ctx.fillStyle = C.paleGreen; ctx.fillRect(px, py, patch, patch);
  ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.strokeRect(px, py, patch, patch);
  const islandW = patch * (2.4 / 6), islandH = patch * (1.2 / 6);
  const ix = px + (patch - islandW) / 2, iy = py + (patch - islandH) / 2;
  rounded(ctx, ix, iy, islandW, islandH, 8, C.coal);
  text(ctx, lang === "zh" ? "交出" : "OUT", ix + islandW * 0.25, iy + islandH * 0.64, 12, 800, C.white, "center");
  text(ctx, lang === "zh" ? "接入" : "IN", ix + islandW * 0.75, iy + islandH * 0.64, 12, 800, C.white, "center");
  line(ctx, ix + islandW / 2, iy + 5, ix + islandW / 2, iy + islandH - 5, C.white, 1);

  const publicPoints = [
    [px + patch * .18, py + patch * .20], [px + patch * .40, py + patch * .18],
    [px + patch * .62, py + patch * .18], [px + patch * .82, py + patch * .25],
    [px + patch * .82, py + patch * .75], [px + patch * .62, py + patch * .82],
    [px + patch * .38, py + patch * .82], [px + patch * .18, py + patch * .73],
  ];
  publicPoints.forEach(([qx, qy], index) => person(ctx, qx, qy, index < 6 ? C.cyanFill : C.yellowFill, 8));
  person(ctx, ix + islandW * .25, iy - 14, C.redFill, 9);
  person(ctx, ix + islandW * .75, iy - 14, C.redFill, 9);
  person(ctx, ix + islandW + 24, iy + islandH / 2, C.blue, 9);

  ctx.fillStyle = C.paper;
  ctx.fillRect(cx - 4, cy + control / 2 - 26, 9, 52);
  ctx.fillRect(cx + control - 4, cy + control / 2 - 26, 9, 52);
  line(ctx, cx - 1, cy + control / 2 - 27, cx + 24, cy + control / 2 - 44, C.red, 2);
  line(ctx, cx + control + 1, cy + control / 2 + 27, cx + control - 24, cy + control / 2 + 44, C.red, 2);

  dimension(ctx, cx, cy - 14, cx + control, cy - 14, "7.2 m");
  dimension(ctx, px, py + patch + 17, px + patch, py + patch + 17, "6.0 m");
  dimension(ctx, px - 17, py, px - 17, py + patch, "6.0 m", true);
  text(ctx, t.planTitle, x + 26, y + size + 29, lang === "zh" ? 16 : 13, 800, C.coal);
  text(ctx, t.planNote, x + 26, y + size + 52, lang === "zh" ? 12 : 10, 600, C.muted);
}

function metricCard(ctx, x, y, w, h, value, label, colour) {
  rounded(ctx, x, y, w, h, 12, C.paper, C.grid, 1);
  ctx.fillStyle = colour; ctx.fillRect(x, y, 8, h);
  text(ctx, value, x + 25, y + 43, 32, 800, colour);
  wrap(ctx, label, x + 25, y + 67, w - 40, 17, 11, 700, C.muted, 2);
}

function drawFigure(lang) {
  const t = copy[lang];
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bone; ctx.fillRect(0, 0, 1600, 1000);
  for (let x = 0; x <= 1600; x += 40) line(ctx, x, 0, x, 1000, `${C.grid}80`, 1);
  for (let y = 0; y <= 1000; y += 40) line(ctx, 0, y, 1600, y, `${C.grid}80`, 1);

  text(ctx, t.kicker, 64, 57, lang === "zh" ? 19 : 16, 800, C.red);
  text(ctx, t.title, 64, 112, lang === "zh" ? 44 : 38, 800, C.coal);
  text(ctx, t.subtitle, 64, 146, lang === "zh" ? 16 : 12, 600, C.muted);
  rounded(ctx, 1200, 37, 336, 84, 10, C.coal);
  text(ctx, t.evidence, 1222, 68, 12, 800, C.yellowFill);
  wrap(ctx, t.evidenceLine, 1222, 91, 292, 16, lang === "zh" ? 11 : 9, 700, C.white, 2);

  drawPlan(ctx, lang, 64, 183, 468);

  const mx = 584, my = 183, gap = 15, mw = 210, mh = 102;
  text(ctx, t.operating, mx, my + 16, 14, 800, C.red);
  metricCard(ctx, mx, my + 32, mw, mh, "8", t.people, C.cyan);
  metricCard(ctx, mx + mw + gap, my + 32, mw, mh, "3", t.roles, C.red);
  metricCard(ctx, mx, my + 32 + mh + gap, mw, mh, "6", t.queue, C.yellow);
  metricCard(ctx, mx + mw + gap, my + 32 + mh + gap, mw, mh, "36", t.slots, C.blue);

  const costY = my + 32 + (mh + gap) * 2 + 22;
  rounded(ctx, mx, costY, 952, 224, 16, C.paper, C.coal, 2);
  ctx.fillStyle = C.redFill; ctx.fillRect(mx, costY, 12, 224);
  text(ctx, t.costTitle, mx + 32, costY + 40, 13, 800, C.red);
  text(ctx, t.costValue, mx + 32, costY + 88, lang === "zh" ? 35 : 32, 800, C.coal);
  wrap(ctx, t.costNote, mx + 32, costY + 119, 420, 18, lang === "zh" ? 11 : 9, 600, C.muted, 3);
  line(ctx, mx + 475, costY + 24, mx + 475, costY + 200, C.grid, 1);
  text(ctx, t.opexTitle, mx + 505, costY + 40, 13, 800, C.cyan);
  text(ctx, t.opexValue, mx + 505, costY + 84, lang === "zh" ? 28 : 25, 800, C.coal);
  rounded(ctx, mx + 505, costY + 112, 180, 54, 8, C.paleYellow);
  text(ctx, t.reserve, mx + 595, costY + 145, 12, 800, C.yellow, "center");
  rounded(ctx, mx + 701, costY + 112, 219, 54, 8, C.paleBlue);
  text(ctx, t.remove, mx + 810, costY + 138, lang === "zh" ? 11 : 9, 800, C.blue, "center");
  wrap(ctx, lang === "zh" ? "人员工时是主要变量；总预算、保险和真实报价仍为空。" : "STAFF HOURS DOMINATE · FORMAL BUDGET, INSURANCE AND REAL QUOTES REMAIN NULL.", mx + 505, costY + 193, 414, 16, lang === "zh" ? 11 : 9, 700, C.muted, 2);

  const altY = 770;
  text(ctx, t.alternatives, 64, altY - 19, lang === "zh" ? 15 : 12, 800, C.red);
  const aw = 355, ag = 17;
  const fills = [C.paleBlue, C.paleYellow, C.paleGreen, C.paleRed];
  const colours = [C.blue, C.yellow, C.cyan, C.red];
  for (let i = 0; i < 4; i += 1) {
    const x = 64 + i * (aw + ag);
    rounded(ctx, x, altY, aw, 117, 12, C.paper, C.grid, 1);
    ctx.fillStyle = colours[i]; ctx.fillRect(x, altY, 8, 117);
    rounded(ctx, x + 24, altY + 19, 49, 26, 13, fills[i]);
    text(ctx, `A${i}`, x + 48, altY + 38, 12, 800, colours[i], "center");
    text(ctx, t.alt[i], x + 88, altY + 39, lang === "zh" ? 15 : 11, 800, C.coal);
    wrap(ctx, t.altTag[i], x + 24, altY + 76, aw - 48, 16, lang === "zh" ? 12 : 10, 700, C.muted, 2);
    if (i === 2) {
      rounded(ctx, x + aw - 76, altY + 17, 55, 28, 14, C.redFill);
      text(ctx, lang === "zh" ? "选中" : "SELECT", x + aw - 49, altY + 36, lang === "zh" ? 11 : 9, 800, C.white, "center");
    }
  }

  line(ctx, 64, 925, 1536, 925, C.redFill, 2);
  text(ctx, t.footer, 64, 953, lang === "zh" ? 12 : 10, 800, C.red);
  text(ctx, lang === "zh" ? "参考方案 / 非工程签认 / 非市场报价 / 非实施批准" : "REFERENCE SCHEME / NOT ENGINEERING SIGN-OFF / NOT MARKET QUOTES / NOT IMPLEMENTATION APPROVAL", 64, 978, lang === "zh" ? 11 : 9, 600, C.muted);
  text(ctx, "JING-ZHANG HANDOVER LINE / PACKAGE v2.0", 1533, 976, 11, 800, C.muted, "right");
  return canvas;
}

checkData();
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "metrics-evidence.png"), drawFigure("zh").toBuffer("image/png"));
fs.writeFileSync(path.join(OUT, "metrics-evidence.en.png"), drawFigure("en").toBuffer("image/png"));
process.stdout.write(`${path.join(OUT, "metrics-evidence.png")}\n`);
process.stdout.write(`${path.join(OUT, "metrics-evidence.en.png")}\n`);
