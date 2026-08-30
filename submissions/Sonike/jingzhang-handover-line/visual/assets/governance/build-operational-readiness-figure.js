#!/usr/bin/env node
"use strict";

/*
 * Deterministically builds bilingual F/07 from the implementation handoff
 * register. It visualises design-time operating readiness without converting
 * any future appointment, commissioning check or field baseline into fact.
 */

const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OUT = path.join(PKG, "assets/figures");
const register = JSON.parse(fs.readFileSync(path.join(HERE, "implementation-handoff-register.json"), "utf8"));
const feasibility = JSON.parse(fs.readFileSync(path.join(HERE, "p0-pre-feasibility-envelope.json"), "utf8"));
const metrics = JSON.parse(fs.readFileSync(path.join(PKG, "metrics.json"), "utf8")).metrics;
const fontCss = fs.readFileSync(path.join(HERE, "noto-cjk-subset.css"), "utf8");
const fontMatch = fontCss.match(/base64,([^\)]+)/);
if (!fontMatch || !GlobalFonts.register(Buffer.from(fontMatch[1], "base64"), "JZHandoverCJK")) {
  throw new Error("unable to register the package-owned OFL Noto CJK WOFF2 subset");
}

const C = {
  coal: "#171a18", ink: "#252a27", bone: "#f2eddf", paper: "#fbf8ef",
  grid: "#d4cdbd", muted: "#5b625d", red: "#c72d1e", redFill: "#e64b3c",
  cyan: "#00746f", cyanFill: "#00a79f", yellow: "#83660a", yellowFill: "#f1c64a",
  blue: "#365f82", paleBlue: "#dce8ed", paleRed: "#f3ded8", paleGreen: "#dcebe6",
  paleYellow: "#f5e8b9", white: "#ffffff",
};

function fail(message) { process.stderr.write(`${message}\n`); process.exit(1); }
function near(actual, expected, tolerance = 1e-6) {
  return Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
}
function exactSet(actual, expected) {
  return Array.isArray(actual) && actual.length === expected.length && expected.every((item) => actual.includes(item));
}

function checkData() {
  const ext = register.current_external_evidence || {};
  const roster = register.operating_roster_coverage || {};
  const packages = register.delivery_packages || [];
  const alternatives = register.alternative_gate_binding || [];
  const twoKey = register.two_key_release_control || {};
  const checks = register.commissioning_and_decommissioning_checks || [];
  const baseline = register.future_field_baseline_protocol || {};
  if (register.claim_state !== "PARTICIPANT_DESIGN_HANDOFF_READY" ||
      register.activation_state !== "EXTERNAL_HOLD_NOT_STARTED") fail("handoff state drifted");
  if (Object.entries(ext).some(([key, value]) => {
    if (key === "approved_budget_cny") return value !== null;
    return typeof value === "boolean" ? value !== false : value !== 0;
  })) fail("external evidence must remain false, zero or null");
  if (!(roster.simultaneous_role_seats === 3 && roster.public_open_hours_per_year === 1000 &&
      roster.staffed_seat_hours_per_year === 3000 && roster.productive_hours_per_fte_year_assumption === 1680 &&
      roster.leave_training_factor === 1.2 && near(roster.calculated_minimum_coverage_fte, 2.143, 0.001) &&
      roster.planning_coverage_fte === 3 && roster.minimum_roster_headcount_for_break_cover === 4 &&
      roster.current_named_roster_headcount === 0 && roster.appointment_status === "HOLD_UNAPPOINTED")) {
    fail("operating roster calculation or HOLD boundary drifted");
  }
  if (packages.length !== 6 || packages.some((item) => item.status !== "HOLD" ||
      !String(item.quantity_basis || "").trim() || !String(item.acceptance_test || "").trim())) {
    fail("six package acceptance definitions are incomplete");
  }
  if (alternatives.length !== 4 || alternatives.some((item) =>
      !Array.isArray(item.alternative_advantage_dimensions) || item.alternative_advantage_dimensions.length < 3 ||
      !Array.isArray(item.fallback_gate_ids) || !String(item.gate_rule || "").trim())) {
    fail("alternative advantages or fallback gates are incomplete");
  }
  if (twoKey.required_key_count !== 2 || twoKey.current_valid_key_receipt_count !== 0 ||
      twoKey.current_status !== "HOLD_UNAPPOINTED" || !Array.isArray(twoKey.keys) || twoKey.keys.length !== 2 ||
      twoKey.keys.some((item) => item.current_named_holder !== null || item.appointment_receipt !== null)) {
    fail("two-key release must remain unappointed with zero receipts");
  }
  if (!exactSet(checks.map((item) => item.check_id), Array.from({ length: 8 }, (_, i) => `C0${i + 1}`)) ||
      checks.some((item) => item.current_status !== "HOLD_UNEXECUTED" || item.receipt !== null)) {
    fail("commissioning checks must remain unexecuted");
  }
  if (baseline.periods.length !== 5 || baseline.forms.length !== 7 || baseline.field_observation_count !== 0 ||
      baseline.authorised_participant_count !== 0 || baseline.values !== null) fail("future field baseline boundary drifted");
  const expectedMetrics = {
    p0_staffed_seat_hours_per_year: 3000, p0_calculated_minimum_coverage_fte: 2.143,
    p0_planning_coverage_fte: 3, p0_minimum_roster_headcount: 4,
    implementation_package_acceptance_test_count: 6,
    implementation_named_fallback_gate_binding_count: 4,
    implementation_two_key_control_count: 2, implementation_two_key_receipt_count: 0,
    implementation_commissioning_check_count: 8, implementation_commissioning_executed_count: 0,
    implementation_future_baseline_period_count: 5, implementation_future_baseline_form_count: 7,
  };
  for (const [id, expected] of Object.entries(expectedMetrics)) {
    if (!metrics[id] || metrics[id].value !== expected) fail(`metric ${id} drifted`);
  }
  if (feasibility.current_external_evidence.roster_appointment_receipt_count !== 0 ||
      feasibility.current_external_evidence.commissioning_execution_count !== 0 ||
      feasibility.current_external_evidence.future_baseline_observation_count !== 0) {
    fail("P0 external evidence boundary drifted");
  }
}

function font(ctx, size, weight = 400) { ctx.font = `${weight} ${size}px "JZHandoverCJK"`; }
function text(ctx, value, x, y, size, weight = 400, colour = C.ink, align = "left") {
  ctx.save(); font(ctx, size, weight); ctx.fillStyle = colour; ctx.textAlign = align;
  ctx.textBaseline = "alphabetic"; ctx.fillText(String(value), x, y); ctx.restore();
}
function wrap(ctx, value, x, y, maxWidth, lineHeight, size, weight = 400, colour = C.muted, maxLines = 3) {
  ctx.save(); font(ctx, size, weight); ctx.fillStyle = colour; ctx.textBaseline = "alphabetic";
  const source = String(value); const isCjk = !source.includes(" ");
  const units = isCjk ? Array.from(source) : source.split(/\s+/);
  let lineValue = ""; let lineCount = 0; let yy = y;
  for (const unit of units) {
    const separator = isCjk || !lineValue ? "" : " ";
    const trial = `${lineValue}${separator}${unit}`;
    if (ctx.measureText(trial).width > maxWidth && lineValue) {
      ctx.fillText(lineValue, x, yy); lineCount += 1;
      if (lineCount >= maxLines) break;
      lineValue = unit; yy += lineHeight;
    } else lineValue = trial;
  }
  if (lineValue && lineCount < maxLines) ctx.fillText(lineValue, x, yy);
  ctx.restore();
}
function rounded(ctx, x, y, w, h, r, fill, stroke = null, width = 1) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}
function line(ctx, x1, y1, x2, y2, colour, width = 1, dash = []) {
  ctx.save(); ctx.strokeStyle = colour; ctx.lineWidth = width; ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
}
function arrow(ctx, x1, y1, x2, y2, colour, width = 2) {
  line(ctx, x1, y1, x2, y2, colour, width);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save(); ctx.translate(x2, y2); ctx.rotate(angle); ctx.fillStyle = colour;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-9, -5); ctx.lineTo(-9, 5); ctx.closePath(); ctx.fill(); ctx.restore();
}

const copy = {
  zh: {
    kicker: "F / 07 · 运营就绪控制面",
    title: "三席四人排班，双钥匙才开层",
    subtitle: "排班算术 × 双重否决 × 逐包验收 × 失败回退 × 调试退役 × 未来现场基线",
    state: "设计就绪 / 外部未启动",
    rosterTitle: "三席覆盖｜把开放时数换成可复算人力",
    rosterSteps: [["1,000 h", "年度公众开放假设"], ["× 3", "同时在岗角色席位"], ["3,000 h", "年度岗位小时"], ["÷ 1,680 × 1.2", "产能与休训系数"], ["2.143 → 3 FTE", "覆盖下限与规划余量"], ["最少 4 人", "三席＋轮休替班"]],
    rosterHold: "具名人员 0 · 任命回执 0 · 目标漏班 0 h（规划目标，非实绩）",
    keyTitle: "双钥匙放行｜任一缺失或否决，智能层保持关闭",
    keys: [["K1", "服务连续性", "未来 R10", "人工底盘 / 排班 / 维护 / 回滚"], ["K2", "权利安全否决", "未来 R11", "安全 / 无障碍 / 拒绝 / 最小数据"]],
    keyState: "0 / 2 有效回执 · 持有人 NULL · SMART LAYER OFF",
    packageTitle: "六个交付包｜每包都有数量依据＋验收测试",
    packageNames: ["资料权属", "现场基线", "协同设计", "预算采购", "预装调试", "运营退役"],
    alternativeTitle: "四种载体｜优势必须绑定失败回退门",
    alternativeNames: [["A0", "既有人工底盘", "任一适用门 HOLD"], ["A1", "移动推车", "G07 / G08"], ["A2", "双面交接桌", "G01—G12 全闭合"], ["A3", "借用室内房", "G08"]],
    bottomLeft: "8 项调试／退役检查",
    bottomLeftLine: "场外配置 · 装配开口 · 三席四人 · 无设备同任务 · 双钥匙回滚 · 删除投诉 · 压力检查 · 撤除恢复",
    bottomRight: "5 时段 × 7 张未来基线表",
    bottomRightLine: "常态 / 峰值 / 天气 / 低照度 / 断电断网 × 路径 / 队列 / 无 AI / 无障碍 / 停删 / 维护 / 恢复",
    footer: "执行 0/8 · 授权参与者 0 · 现场观察 0 · 基线值 NULL · 报价 0/3 · 预算 NULL · 保险 0 · 签认 0",
    boundary: "参赛者运营准备度设计 / 不是任命、调试记录、现场观察、报价、预算、许可或专业签认",
  },
  en: {
    kicker: "F / 07 · OPERATING-READINESS CONTROL PLANE",
    title: "THREE SEATS · FOUR PEOPLE · TWO KEYS TO OPEN",
    subtitle: "ROSTER MATH × DUAL VETO × PACKAGE ACCEPTANCE × FALLBACK × COMMISSIONING × FUTURE BASELINE",
    state: "DESIGN READY / EXTERNAL NOT STARTED",
    rosterTitle: "THREE-SEAT COVERAGE · TURN OPEN HOURS INTO RECALCULABLE LABOUR",
    rosterSteps: [["1,000 h", "planned public hours / year"], ["× 3", "simultaneous role seats"], ["3,000 h", "staffed seat-hours / year"], ["÷ 1,680 × 1.2", "productive time + leave/training"], ["2.143 → 3 FTE", "calculated floor + planning cover"], ["MIN 4 PEOPLE", "three seats + break cover"]],
    rosterHold: "NAMED PEOPLE 0 · APPOINTMENT RECEIPTS 0 · TARGET UNCOVERED HOURS 0 (PLAN, NOT PERFORMANCE)",
    keyTitle: "TWO-KEY RELEASE · ONE MISSING KEY OR ONE VETO KEEPS THE SMART LAYER OFF",
    keys: [["K1", "SERVICE CONTINUITY", "FUTURE R10", "human floor / roster / maintenance / rollback"], ["K2", "RIGHTS + SAFETY VETO", "FUTURE R11", "safety / access / refusal / minimum data"]],
    keyState: "0 / 2 VALID RECEIPTS · HOLDERS NULL · SMART LAYER OFF",
    packageTitle: "SIX DELIVERY PACKAGES · EACH HAS A QUANTITY BASIS + ACCEPTANCE TEST",
    packageNames: ["AUTHORITY + TITLE", "FIELD BASELINE", "COORDINATED DESIGN", "BUDGET + BUY", "PREASSEMBLY", "OPERATE + RETIRE"],
    alternativeTitle: "FOUR CARRIERS · ADVANTAGES MUST BIND TO NAMED FALLBACK GATES",
    alternativeNames: [["A0", "EXISTING HUMAN FLOOR", "ANY GATE HOLD"], ["A1", "MOBILE CART", "G07 / G08"], ["A2", "TWO-FACE TABLE", "ALL G01-G12"], ["A3", "BORROWED ROOM", "G08"]],
    bottomLeft: "8 COMMISSIONING / RETIREMENT CHECKS",
    bottomLeftLine: "OFF-SITE CONFIG · ASSEMBLY + OPENINGS · 3 SEATS / 4 PEOPLE · NO-DEVICE SAME TASK · TWO-KEY ROLLBACK · DELETE + COMPLAINT · STRESS · REMOVE + RESTORE",
    bottomRight: "5 PERIODS × 7 FUTURE BASELINE FORMS",
    bottomRightLine: "ORDINARY / PEAK / WEATHER / LOW LIGHT / OUTAGE × ROUTE / QUEUE / NO-AI / ACCESS / STOP-DELETE / MAINTENANCE / RESTORE",
    footer: "EXECUTED 0/8 · AUTHORISED PARTICIPANTS 0 · FIELD OBSERVATIONS 0 · VALUES NULL · QUOTES 0/3 · BUDGET NULL · INSURANCE 0 · SIGN-OFF 0",
    boundary: "PARTICIPANT OPERATING-READINESS DESIGN / NOT APPOINTMENT, COMMISSIONING RECORD, FIELD OBSERVATION, QUOTE, BUDGET, PERMIT OR SIGN-OFF",
  },
};

function drawRoster(ctx, lang, x, y, w, h) {
  const t = copy[lang]; rounded(ctx, x, y, w, h, 14, C.paper, C.coal, 2);
  text(ctx, t.rosterTitle, x + 24, y + 35, lang === "zh" ? 15 : 11, 800, C.red);
  const gap = 10; const cardW = (w - 48 - gap * 5) / 6;
  t.rosterSteps.forEach(([value, label], index) => {
    const xx = x + 24 + index * (cardW + gap); const yy = y + 61;
    rounded(ctx, xx, yy, cardW, 104, 9, index === 5 ? C.coal : index % 2 ? C.paleBlue : C.paleGreen, C.grid, 1);
    text(ctx, value, xx + cardW / 2, yy + 38, lang === "zh" ? 17 : 14, 800, index === 5 ? C.yellowFill : (index % 2 ? C.blue : C.cyan), "center");
    wrap(ctx, label, xx + 10, yy + 65, cardW - 20, 14, lang === "zh" ? 9 : 7, 700, index === 5 ? C.white : C.muted, 3);
    if (index < 5) arrow(ctx, xx + cardW + 2, yy + 52, xx + cardW + gap - 2, yy + 52, C.red, 1.5);
  });
  rounded(ctx, x + 24, y + h - 45, w - 48, 28, 14, C.paleRed);
  text(ctx, t.rosterHold, x + w / 2, y + h - 25, lang === "zh" ? 10 : 7.5, 800, C.red, "center");
}

function drawKeys(ctx, lang, x, y, w, h) {
  const t = copy[lang]; rounded(ctx, x, y, w, h, 14, C.coal);
  text(ctx, t.keyTitle, x + 24, y + 35, lang === "zh" ? 14 : 10, 800, C.yellowFill);
  const gap = 14; const cardW = (w - 48 - gap) / 2;
  t.keys.forEach(([id, title, role, lineValue], index) => {
    const xx = x + 24 + index * (cardW + gap), yy = y + 60;
    rounded(ctx, xx, yy, cardW, 118, 10, index ? "#2b302e" : "#343936", C.grid, 1);
    rounded(ctx, xx + 12, yy + 12, 50, 29, 14, C.paleRed);
    text(ctx, id, xx + 37, yy + 32, 11, 800, C.red, "center");
    text(ctx, title, xx + 72, yy + 30, lang === "zh" ? 11 : 8.5, 800, C.white);
    text(ctx, role, xx + 14, yy + 63, lang === "zh" ? 10 : 8, 800, C.yellowFill);
    wrap(ctx, lineValue, xx + 14, yy + 87, cardW - 28, 15, lang === "zh" ? 8.5 : 7, 600, C.grid, 2);
  });
  rounded(ctx, x + 24, y + h - 45, w - 48, 28, 14, C.red);
  text(ctx, t.keyState, x + w / 2, y + h - 25, lang === "zh" ? 10 : 8, 800, C.white, "center");
}

function drawPackages(ctx, lang, x, y, w, h) {
  const t = copy[lang]; rounded(ctx, x, y, w, h, 14, C.paper, C.coal, 2);
  text(ctx, t.packageTitle, x + 24, y + 34, lang === "zh" ? 14 : 10, 800, C.red);
  const gap = 9; const cardW = (w - 48 - gap * 2) / 3; const cardH = 69;
  t.packageNames.forEach((name, index) => {
    const col = index % 3, row = Math.floor(index / 3);
    const xx = x + 24 + col * (cardW + gap), yy = y + 55 + row * (cardH + 8);
    rounded(ctx, xx, yy, cardW, cardH, 8, row ? C.paleBlue : C.paleGreen, C.grid, 1);
    text(ctx, `WP0${index + 1}`, xx + 13, yy + 24, 10, 800, index % 2 ? C.blue : C.cyan);
    text(ctx, name, xx + 66, yy + 24, lang === "zh" ? 10 : 7.2, 800, C.ink);
    text(ctx, lang === "zh" ? "数量依据 ✓  验收测试 ✓  状态 HOLD" : "BASIS ✓  TEST ✓  STATUS HOLD", xx + 13, yy + 51, lang === "zh" ? 8 : 6.7, 700, C.red);
  });
}

function drawAlternatives(ctx, lang, x, y, w, h) {
  const t = copy[lang]; rounded(ctx, x, y, w, h, 14, C.paper, C.coal, 2);
  text(ctx, t.alternativeTitle, x + 22, y + 34, lang === "zh" ? 13 : 9.3, 800, C.red);
  t.alternativeNames.forEach(([id, name, gate], index) => {
    const yy = y + 55 + index * 39;
    rounded(ctx, x + 22, yy, 48, 28, 14, index === 2 ? C.paleGreen : C.paleBlue);
    text(ctx, id, x + 46, yy + 20, 9, 800, index === 2 ? C.cyan : C.blue, "center");
    text(ctx, name, x + 82, yy + 20, lang === "zh" ? 9.5 : 7.2, 800, C.ink);
    text(ctx, gate, x + w - 20, yy + 20, lang === "zh" ? 8.5 : 6.8, 800, C.red, "right");
  });
}

function drawBottom(ctx, lang, x, y, w, h, titleValue, detail, count, colour, fill) {
  rounded(ctx, x, y, w, h, 14, fill, C.coal, 2);
  text(ctx, count, x + 24, y + 52, 34, 800, colour);
  text(ctx, titleValue, x + 112, y + 34, lang === "zh" ? 14 : 10, 800, C.ink);
  wrap(ctx, detail, x + 112, y + 61, w - 140, 16, lang === "zh" ? 9 : 7, 600, C.muted, 3);
}

function drawFigure(lang) {
  const t = copy[lang]; const canvas = createCanvas(1600, 1000); const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bone; ctx.fillRect(0, 0, 1600, 1000);
  for (let xx = 0; xx <= 1600; xx += 40) line(ctx, xx, 0, xx, 1000, `${C.grid}80`);
  for (let yy = 0; yy <= 1000; yy += 40) line(ctx, 0, yy, 1600, yy, `${C.grid}80`);
  text(ctx, t.kicker, 64, 54, lang === "zh" ? 18 : 14, 800, C.red);
  text(ctx, t.title, 64, 105, lang === "zh" ? 39 : 29, 800, C.coal);
  text(ctx, t.subtitle, 64, 138, lang === "zh" ? 14 : 10, 700, C.muted);
  rounded(ctx, 1244, 35, 292, 84, 10, C.coal);
  text(ctx, t.state, 1390, 70, lang === "zh" ? 13 : 10, 800, C.yellowFill, "center");
  text(ctx, lang === "zh" ? "0 任命 / 0 执行 / 0 观察" : "0 APPOINTED / 0 EXECUTED / 0 OBSERVED", 1390, 96, lang === "zh" ? 10 : 8, 700, C.white, "center");

  drawRoster(ctx, lang, 64, 170, 850, 236);
  drawKeys(ctx, lang, 938, 170, 598, 236);
  drawPackages(ctx, lang, 64, 430, 920, 227);
  drawAlternatives(ctx, lang, 1008, 430, 528, 227);
  drawBottom(ctx, lang, 64, 681, 724, 150, t.bottomLeft, t.bottomLeftLine, "0 / 8", C.red, C.paleRed);
  drawBottom(ctx, lang, 812, 681, 724, 150, t.bottomRight, t.bottomRightLine, "5 × 7", C.cyan, C.paleGreen);

  rounded(ctx, 64, 854, 1472, 80, 12, C.coal);
  text(ctx, lang === "zh" ? "证据边界" : "EVIDENCE BOUNDARY", 88, 881, 11, 800, C.yellowFill);
  text(ctx, t.footer, 88, 912, lang === "zh" ? 13 : 9.6, 800, C.white);
  line(ctx, 64, 958, 1536, 958, C.redFill, 2);
  text(ctx, t.boundary, 64, 984, lang === "zh" ? 10 : 7.5, 700, C.muted);
  text(ctx, "JING-ZHANG HANDOVER LINE / PACKAGE v2.0 / F07", 1536, 984, 10, 800, C.muted, "right");
  return canvas;
}

checkData();
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "operational-readiness.png"), drawFigure("zh").toBuffer("image/png"));
fs.writeFileSync(path.join(OUT, "operational-readiness.en.png"), drawFigure("en").toBuffer("image/png"));
process.stdout.write(`${path.join(OUT, "operational-readiness.png")}\n`);
process.stdout.write(`${path.join(OUT, "operational-readiness.en.png")}\n`);
