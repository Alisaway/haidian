#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OUT = path.join(PKG, "assets/figures");

for (const font of [
  ["/System/Library/Fonts/Hiragino Sans GB.ttc", "Hiragino Sans GB"],
  ["/System/Library/Fonts/Supplemental/Songti.ttc", "Songti SC"],
]) {
  try { GlobalFonts.registerFromPath(font[0], font[1]); } catch (_) {}
}

const C = {
  coal: "#161918", ink: "#161918", bone: "#f1ecdf", paper: "#faf7ef",
  grid: "#d8d1c2", muted: "#606560", red: "#e64b3c", cyan: "#00a79f",
  yellow: "#f1c64a", blue: "#3b6486", green: "#6c9a72", orange: "#d98546",
  redText: "#c72d1e", cyanText: "#00746f", yellowText: "#83660a", greenText: "#4d7349",
  lavender: "#a9aac5", wait: "#f1dfcf", walk: "#d9eee9", stop: "#f4dda0",
  rail: "#383d3a", barrier: "#8ab08d", machine: "#a9b7c7", rest: "#bfd3b7",
};

function font(ctx, size, weight = 400, family = "Hiragino Sans GB") {
  ctx.font = `${weight} ${size}px "${family}"`;
}

function text(ctx, value, x, y, size, weight = 400, color = C.ink, align = "left") {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(value, x, y);
  ctx.restore();
}

function wrap(ctx, value, x, y, maxWidth, lineHeight, size, weight = 400, color = C.muted) {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = color;
  ctx.textBaseline = "alphabetic";
  let line = "";
  let yy = y;
  for (const char of value) {
    const trial = line + char;
    if (ctx.measureText(trial).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = char;
      yy += lineHeight;
    } else line = trial;
  }
  if (line) ctx.fillText(line, x, yy);
  ctx.restore();
  return yy;
}

function rounded(ctx, x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
}

function line(ctx, x1, y1, x2, y2, color, width = 1, dash = []) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

function person(ctx, x, groundY, color = C.ink, scale = 1) {
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2 * scale;
  ctx.beginPath(); ctx.arc(x, groundY - 39 * scale, 6 * scale, 0, Math.PI * 2); ctx.fill();
  line(ctx, x, groundY - 32 * scale, x, groundY - 15 * scale, color, 2 * scale);
  line(ctx, x, groundY - 25 * scale, x - 8 * scale, groundY - 18 * scale, color, 2 * scale);
  line(ctx, x, groundY - 25 * scale, x + 8 * scale, groundY - 18 * scale, color, 2 * scale);
  line(ctx, x, groundY - 15 * scale, x - 7 * scale, groundY, color, 2 * scale);
  line(ctx, x, groundY - 15 * scale, x + 7 * scale, groundY, color, 2 * scale);
  ctx.restore();
}

function wheelchair(ctx, x, groundY, color = C.blue) {
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, groundY - 12, 12, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(x - 3, groundY - 42, 5, 0, Math.PI * 2); ctx.fill();
  line(ctx, x - 3, groundY - 36, x + 3, groundY - 22, color, 2);
  line(ctx, x + 3, groundY - 22, x + 16, groundY - 22, color, 2);
  line(ctx, x + 3, groundY - 22, x - 7, groundY - 16, color, 2);
  ctx.restore();
}

function tree(ctx, x, groundY, scale = 1) {
  line(ctx, x, groundY, x, groundY - 38 * scale, C.coal, 3 * scale);
  ctx.fillStyle = C.green;
  for (const [dx, dy, r] of [[0,-55,21],[-15,-46,15],[15,-45,16]]) {
    ctx.beginPath(); ctx.arc(x + dx * scale, groundY + dy * scale, r * scale, 0, Math.PI * 2); ctx.fill();
  }
}

function machine(ctx, x, groundY, accent) {
  rounded(ctx, x - 18, groundY - 35, 36, 28, 5, C.paper, accent, 2);
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.arc(x - 8, groundY - 4, 5, 0, Math.PI * 2); ctx.arc(x + 10, groundY - 4, 5, 0, Math.PI * 2); ctx.fill();
  line(ctx, x, groundY - 35, x + 8, groundY - 47, accent, 2);
  ctx.beginPath(); ctx.arc(x + 10, groundY - 49, 3, 0, Math.PI * 2); ctx.fill();
}

function building(ctx, x, groundY, accent, mode) {
  const w = 82, h = mode === "civic" ? 176 : 208;
  ctx.fillStyle = C.paper; ctx.strokeStyle = C.coal; ctx.lineWidth = 3;
  ctx.fillRect(x, groundY - h, w, h); ctx.strokeRect(x, groundY - h, w, h);
  ctx.fillStyle = accent;
  ctx.fillRect(x + 8, groundY - 58, w - 16, 44);
  ctx.fillStyle = C.paper;
  ctx.fillRect(x + 16, groundY - 49, w - 32, 20);
  const floors = mode === "civic" ? 3 : 4;
  for (let f = 1; f < floors; f++) {
    const yy = groundY - h + 25 + (f - 1) * 37;
    ctx.fillStyle = C.lavender;
    ctx.fillRect(x + 12, yy, 22, 16); ctx.fillRect(x + 48, yy, 22, 16);
  }
  text(ctx, mode === "en" ? "STAFFED" : "有人窗口", x + w / 2, groundY - 32, 9, 700, C.coal, "center");
}

function polygonRings(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  return [];
}

const boundary = JSON.parse(fs.readFileSync(path.join(PKG, "geometry/site_boundary.geojson"), "utf8")).features[0];
const keyAreas = JSON.parse(fs.readFileSync(path.join(PKG, "geometry/key_areas.geojson"), "utf8")).features;
const allCoords = polygonRings(boundary.geometry).flat();
const minX = Math.min(...allCoords.map(p => p[0])), maxX = Math.max(...allCoords.map(p => p[0]));
const minY = Math.min(...allCoords.map(p => p[1])), maxY = Math.max(...allCoords.map(p => p[1]));

function drawGeo(ctx, feature, box, fill, stroke, width = 1) {
  const sx = box.w / (maxX - minX), sy = box.h / (maxY - minY), s = Math.min(sx, sy);
  const ox = box.x + (box.w - (maxX - minX) * s) / 2;
  const oy = box.y + (box.h - (maxY - minY) * s) / 2;
  for (const ring of polygonRings(feature.geometry)) {
    ctx.beginPath();
    ring.forEach((p, i) => {
      const px = ox + (p[0] - minX) * s;
      const py = oy + (maxY - p[1]) * s;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke();
  }
}

function locator(ctx, x, y, w, h, index, accent) {
  rounded(ctx, x, y, w, h, 10, C.bone, C.grid, 1);
  const box = { x: x + 10, y: y + 9, w: w - 20, h: h - 18 };
  drawGeo(ctx, boundary, box, "#f7f3e8", C.muted, 1);
  keyAreas.forEach((f, i) => drawGeo(ctx, f, box, i === index ? `${accent}88` : "#c9c6bd88", i === index ? accent : C.muted, i === index ? 2.5 : 1));
  line(ctx, x + w - 17, y + 15, x + w - 17, y + 34, C.coal, 2);
  text(ctx, "N", x + w - 17, y + 13, 9, 700, C.coal, "center");
}

const yards = [
  {
    zh: "众智园 · 研制交接场", en: "ZHONGZHIYUAN · BUILD YARD", chain: "BUILD→VERIFY",
    accent: C.red, textAccent: C.redText, ratio: "2.16", formZh: "纵向测试廊", formEn: "LONG TEST CORRIDOR",
    total: "15.4 m", vals: { a1:2.0,a2:2.5,a3:1.2,ar:0.3,b:1.435,c:1.5,d:2.5,e:4.0 },
    moveZh: "机器压在一侧，公众沿线观察", moveEn: "MACHINES TO ONE SIDE · PUBLIC PATH CONTINUES",
  },
  {
    zh: "AI 原点社区 · 开源交接场", en: "AI ORIGIN · OPEN YARD", chain: "VERIFY→SHARE",
    accent: C.cyan, textAccent: C.cyanText, ratio: "1.18", formZh: "近方协作场", formEn: "SQUARE COLLABORATION FIELD",
    total: "17.1 m", vals: { a1:2.5,a2:3.0,a3:1.5,ar:1.0,b:0.6,c:1.5,d:2.0,e:5.0 },
    moveZh: "交接十字把技术、社区、记录放在同一平面", moveEn: "TECH · COMMUNITY · RECORDS SHARE ONE PLANE",
  },
  {
    zh: "大钟寺 · 城市交接场", en: "DAZHONGSI · CIVIC YARD", chain: "SHARE→SERVE",
    accent: C.yellow, textAccent: C.yellowText, ratio: "0.59", formZh: "横向城市客厅", formEn: "TRANSVERSE CIVIC ROOM",
    total: "15.1 m", vals: { a1:3.5,a2:3.0,a3:1.5,ar:0.5,b:0.6,c:0,d:0,e:6.0 },
    moveZh: "机器带归零，等候与树荫成为主角", moveEn: "MACHINE LANE ZERO · WAITING AND SHADE LEAD",
  },
];

function drawSection(ctx, yard, cardX, cardY, lang) {
  const v = yard.vals;
  const baseX = cardX + 120, groundY = cardY + 474, scale = 17;
  building(ctx, cardX + 28, groundY, yard.accent, lang === "en" ? "en" : (v.d === 0 ? "civic" : "zh"));
  const segs = [
    ["A1", v.a1, C.wait], ["A2", v.a2, C.walk], ["A3", v.a3, C.stop], ["A+", v.ar, "#ead8cb"],
    ["B", v.b, C.rail], ["C", v.c, C.barrier], ["D", v.d, C.machine], ["E", v.e, C.rest],
  ];
  let cursor = baseX;
  const positions = {};
  for (const [id, metres, color] of segs) {
    if (metres <= 0) { positions[id] = [cursor, cursor]; continue; }
    const ww = metres * scale;
    ctx.fillStyle = color; ctx.fillRect(cursor, groundY - 42, ww, 42);
    ctx.strokeStyle = C.paper; ctx.lineWidth = 1; ctx.strokeRect(cursor, groundY - 42, ww, 42);
    positions[id] = [cursor, cursor + ww]; cursor += ww;
  }
  line(ctx, cardX + 20, groundY, cardX + 420, groundY, C.coal, 3);
  person(ctx, (positions.A1[0] + positions.A1[1]) / 2, groundY, C.ink, .78);
  wheelchair(ctx, (positions.A2[0] + positions.A2[1]) / 2, groundY, C.blue);
  const stopX = (positions.A3[0] + positions.A3[1]) / 2;
  line(ctx, stopX, groundY - 2, stopX, groundY - 72, yard.accent, 4);
  rounded(ctx, stopX - 11, groundY - 74, 22, 18, 4, yard.accent);
  text(ctx, "×", stopX, groundY - 60, 13, 700, C.coal, "center");
  if (v.b > 0) {
    const bx = (positions.B[0] + positions.B[1]) / 2;
    line(ctx, bx - 4, groundY - 38, bx - 4, groundY, C.paper, 2);
    line(ctx, bx + 4, groundY - 38, bx + 4, groundY, C.paper, 2);
  }
  if (v.c > 0) {
    const cx = (positions.C[0] + positions.C[1]) / 2;
    for (let yy = groundY - 8; yy > groundY - 38; yy -= 10) line(ctx, cx - 8, yy, cx + 8, yy - 8, C.coal, 1.5);
  }
  if (v.d > 0) machine(ctx, (positions.D[0] + positions.D[1]) / 2, groundY, yard.accent);
  const ex = (positions.E[0] + positions.E[1]) / 2;
  tree(ctx, ex, groundY, .82);

  line(ctx, baseX, groundY + 18, cursor, groundY + 18, C.coal, 1.5);
  line(ctx, baseX, groundY + 12, baseX, groundY + 24, C.coal, 1.5);
  line(ctx, cursor, groundY + 12, cursor, groundY + 24, C.coal, 1.5);
  text(ctx, yard.total, (baseX + cursor) / 2, groundY + 39, 18, 700, yard.textAccent, "center");

  const labels = lang === "zh"
    ? [["A", `${(v.a1+v.a2+v.a3+v.ar).toFixed(1)} 人工界面`], ["B", `${v.b} 轨道`], ["C", v.c ? `${v.c} 隔离` : "0 隔离"], ["D", v.d ? `${v.d} 机器` : "0 机器"], ["E", `${v.e} 绿荫`]]
    : [["A", `${(v.a1+v.a2+v.a3+v.ar).toFixed(1)} HUMAN`], ["B", `${v.b} RAIL`], ["C", v.c ? `${v.c} BUFFER` : "0 BUFFER"], ["D", v.d ? `${v.d} MACHINE` : "0 MACHINE"], ["E", `${v.e} SHADE`]];
  let lx = cardX + 28;
  labels.forEach(([id, label], i) => {
    const ww = i === 0 ? 108 : 70;
    text(ctx, id, lx, groundY + 76, 12, 800, [C.redText,C.coal,C.greenText,C.blue,C.greenText][i]);
    text(ctx, label, lx, groundY + 94, lang === "zh" ? 11 : 9, 600, C.muted);
    lx += ww;
  });

  const offY = cardY + 642;
  line(ctx, cardX + 28, offY, cardX + 432, offY, C.grid, 1);
  text(ctx, lang === "zh" ? "智能层关闭后" : "SMART LAYER OFF", cardX + 28, offY + 28, 11, 800, C.blue);
  text(ctx, lang === "zh" ? "人工窗口＋步行面＋轨道线索＋绿荫继续工作" : "COUNTER + PATH + RAIL TRACE + SHADE REMAIN", cardX + 28, offY + 53, lang === "zh" ? 13 : 10, 700, C.coal);
  const bx = cardX + 28, by = offY + 68, bw = 58;
  [["A",C.wait,true],["B",C.rail,true],["C",C.barrier,v.c===0],["D",C.machine,v.d===0],["E",C.rest,true]].forEach(([id,color,on],i) => {
    ctx.globalAlpha = on ? 1 : .2; ctx.fillStyle = color; ctx.fillRect(bx + i*(bw+8), by, bw, 13); ctx.globalAlpha = 1;
    text(ctx, id, bx + i*(bw+8) + bw/2, by + 31, 10, 800, on ? C.ink : C.muted, "center");
  });
}

function drawFigure(lang) {
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bone; ctx.fillRect(0, 0, 1600, 1000);
  ctx.strokeStyle = `${C.grid}88`; ctx.lineWidth = 1;
  for (let x = 0; x <= 1600; x += 40) line(ctx, x, 0, x, 1000, `${C.grid}88`, 1);
  for (let y = 0; y <= 1000; y += 40) line(ctx, 0, y, 1600, y, `${C.grid}88`, 1);

  text(ctx, "F / 03", 64, 62, 21, 800, C.redText);
  text(ctx, lang === "zh" ? "三场三剖面" : "THREE YARDS · THREE SECTIONS", 64, 119, lang === "zh" ? 46 : 40, 800, C.coal);
  text(ctx,
    lang === "zh" ? "从封闭测试到城市客厅：机器带逐段消失，人的公共界面逐段变厚"
      : "FROM CONTROLLED TESTING TO A CIVIC ROOM · MACHINE SPACE RECEDES AS THE HUMAN EDGE DEEPENS",
    64, 153, lang === "zh" ? 18 : 14, 500, C.muted);
  text(ctx, lang === "zh" ? "同一协议，不同场所" : "ONE PROTOCOL · THREE URBAN CHARACTERS", 1534, 78, 13, 800, C.redText, "right");

  yards.forEach((yard, i) => {
    const x = 64 + i * 502, y = 180, w = 470, h = 758;
    rounded(ctx, x, y, w, h, 18, C.paper, C.coal, 2);
    ctx.fillStyle = yard.accent; ctx.fillRect(x, y, w, 13);
    text(ctx, `0${i+1}`, x + 26, y + 54, 18, 800, yard.textAccent);
    text(ctx, lang === "zh" ? yard.zh : yard.en, x + 68, y + 54, lang === "zh" ? 22 : 13, 800, C.coal);
    text(ctx, yard.chain, x + 26, y + 85, 13, 800, yard.textAccent);
    text(ctx, `${lang === "zh" ? "长宽比" : "ASPECT"} ${yard.ratio}`, x + 26, y + 120, 12, 800, C.muted);
    text(ctx, lang === "zh" ? yard.formZh : yard.formEn, x + 26, y + 148, lang === "zh" ? 19 : 14, 800, C.coal);
    locator(ctx, x + 340, y + 28, 100, 126, i, yard.accent);
    wrap(ctx, lang === "zh" ? yard.moveZh : yard.moveEn, x + 26, y + 180, 390, lang === "zh" ? 23 : 18, lang === "zh" ? 14 : 11, 600, C.muted);
    text(ctx, lang === "zh" ? "参考断面 / 非道路红线" : "REFERENCE SECTION / NOT A ROAD REDLINE", x + 26, y + 236, 10, 800, C.redText);
    drawSection(ctx, yard, x, y, lang);
  });

  line(ctx, 64, 966, 1536, 966, C.red, 2);
  text(ctx, lang === "zh" ? "概念尺寸；正式红线、纵坡、无障碍、消防、文保与结构条件须由有权专业团队复核"
    : "CONCEPT DIMENSIONS · REDLINES, GRADIENT, ACCESSIBILITY, FIRE, HERITAGE AND STRUCTURE REQUIRE AUTHORISED PROFESSIONAL REVIEW",
    64, 990, lang === "zh" ? 12 : 9, 600, C.muted);
  text(ctx, "JING-ZHANG HANDOVER LINE / PACKAGE v2.0", 1536, 990, 11, 800, C.muted, "right");
  return canvas;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "key-areas.png"), drawFigure("zh").toBuffer("image/png"));
fs.writeFileSync(path.join(OUT, "key-areas.en.png"), drawFigure("en").toBuffer("image/png"));
console.log(path.join(OUT, "key-areas.png"));
console.log(path.join(OUT, "key-areas.en.png"));
