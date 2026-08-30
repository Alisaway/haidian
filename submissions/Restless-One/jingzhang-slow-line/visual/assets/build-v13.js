#!/usr/bin/env node
'use strict';

/*
 * Deterministic v1.3 builder for P0-ALL-STOP-01.
 * Source: visual/assets/v13-implementation.json plus the existing submission files.
 * Outputs: two fixed bilingual figures, bilingual proposal/visual HTML inputs,
 * four PDFs, and synchronized evidence records. No network access is used.
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
const { PDFDocument } = require('pdf-lib');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA_PATH = path.join(__dirname, 'v13-implementation.json');
const DATA = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const FIGURES = path.join(ROOT, 'assets', 'figures');
const DRAWINGS = path.join(ROOT, 'drawings');

const C = {
  ink: '#14263a',
  navy: '#173a54',
  blue: '#1f6d8f',
  cyan: '#8fd2d5',
  green: '#527f67',
  paleGreen: '#dbe8de',
  yellow: '#f0be3e',
  paleYellow: '#f7e8aa',
  red: '#ba3a35',
  paleRed: '#f2d8d4',
  paper: '#f4f0e5',
  white: '#fffdf8',
  grey: '#66727d',
  light: '#d8d5cb',
  rail: '#5b5752',
  ground: '#e6dfd1'
};

const FONT_CJK = '/System/Library/Fonts/STHeiti Medium.ttc';
const FONT_LATIN = '/System/Library/Fonts/Supplemental/Arial.ttf';
const FONT_LATIN_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf';
if (fs.existsSync(FONT_CJK)) GlobalFonts.registerFromPath(FONT_CJK, 'SlowLineCJK');
if (fs.existsSync(FONT_LATIN)) GlobalFonts.registerFromPath(FONT_LATIN, 'SlowLineLatin');
if (fs.existsSync(FONT_LATIN_BOLD)) GlobalFonts.registerFromPath(FONT_LATIN_BOLD, 'SlowLineLatinBold');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function write(rel, value) {
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, value);
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function writeJson(rel, value) {
  write(rel, JSON.stringify(value, null, 2) + '\n');
}

function uniqPush(array, value) {
  if (!Array.isArray(array)) return;
  if (!array.includes(value)) array.push(value);
}

function rounded(ctx, x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function font(ctx, size, bold = false, lang = 'en') {
  const family = lang === 'zh' ? 'SlowLineCJK' : (bold ? 'SlowLineLatinBold' : 'SlowLineLatin');
  ctx.font = `${bold ? '700' : '400'} ${size}px "${family}"`;
}

function splitLines(ctx, text, maxWidth, lang = 'en') {
  const raw = String(text ?? '');
  if (!raw) return [''];
  const tokens = lang === 'zh' ? Array.from(raw) : raw.split(/\s+/).map((t, i) => i ? ` ${t}` : t);
  const lines = [];
  let line = '';
  for (const token of tokens) {
    const candidate = line + token;
    if (line && ctx.measureText(candidate).width > maxWidth) {
      lines.push(line.trim());
      line = lang === 'zh' ? token : token.trimStart();
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

function text(ctx, value, x, y, maxWidth, size, color = C.ink, bold = false, lang = 'en', lineHeight = 1.25, maxLines = null) {
  font(ctx, size, bold, lang);
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  const lines = splitLines(ctx, value, maxWidth, lang);
  const shown = maxLines ? lines.slice(0, maxLines) : lines;
  if (maxLines && lines.length > maxLines && shown.length) {
    let last = shown[shown.length - 1];
    while (last && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
    shown[shown.length - 1] = last + '…';
  }
  shown.forEach((line, index) => ctx.fillText(line, x, y + index * size * lineHeight));
  return shown.length * size * lineHeight;
}

function label(ctx, value, x, y, bg, color, lang = 'en') {
  font(ctx, 16, true, lang);
  const w = ctx.measureText(value).width + 18;
  rounded(ctx, x, y, w, 28, 6, bg);
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x + 9, y + 14);
  return w;
}

function panel(ctx, x, y, w, h, titleValue, lang = 'en', accent = C.blue) {
  rounded(ctx, x, y, w, h, 14, C.white, C.light, 1.5);
  ctx.fillStyle = accent;
  ctx.fillRect(x, y, 8, h);
  text(ctx, titleValue, x + 22, y + 14, w - 40, 22, C.ink, true, lang, 1.1, 2);
}

function line(ctx, x1, y1, x2, y2, color = C.ink, width = 2, dash = []) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, color = C.ink, width = 2) {
  line(ctx, x1, y1, x2, y2, color, width);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  for (const end of [[x2, y2, angle], [x1, y1, angle + Math.PI]]) {
    const [x, y, a] = end;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 9 * Math.cos(a - Math.PI / 6), y - 9 * Math.sin(a - Math.PI / 6));
    ctx.lineTo(x - 9 * Math.cos(a + Math.PI / 6), y - 9 * Math.sin(a + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
}

function dimension(ctx, x1, y1, x2, y2, value, lang = 'en', offset = 0) {
  const vertical = Math.abs(x2 - x1) < Math.abs(y2 - y1);
  const ox = vertical ? offset : 0;
  const oy = vertical ? 0 : offset;
  arrow(ctx, x1 + ox, y1 + oy, x2 + ox, y2 + oy, C.red, 1.6);
  const mx = (x1 + x2) / 2 + ox;
  const my = (y1 + y2) / 2 + oy;
  rounded(ctx, mx - 34, my - 13, 68, 26, 5, C.paper);
  font(ctx, 15, true, lang);
  ctx.fillStyle = C.red;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, mx, my);
  ctx.textAlign = 'left';
}

function titleBand(ctx, lang, kicker, titleValue, sub) {
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, ctx.canvas.width, 92);
  text(ctx, kicker, 40, 10, 760, 16, C.yellow, true, lang, 1.05, 1);
  text(ctx, titleValue, 40, 38, 1010, 32, C.white, true, lang, 1.05, 1);
  text(ctx, sub, 1110, 16, 440, 16, '#dfe8ec', false, lang, 1.25, 3);
}

function buildSiteRelation(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:500 场地关系｜仅作候选点筛查' : '1:500 SITE RELATION | CANDIDATE SCREENING ONLY', lang, C.green);
  const ix = x + 28, iy = y + 52, iw = w - 56, ih = h - 72;
  ctx.fillStyle = C.paleGreen;
  ctx.fillRect(ix, iy, iw * 0.26, ih);
  for (let yy = iy + 10; yy < iy + ih; yy += 30) {
    line(ctx, ix + 36, yy, ix + 36, yy + 16, C.rail, 4);
    line(ctx, ix + 58, yy, ix + 58, yy + 16, C.rail, 4);
    line(ctx, ix + 28, yy + 8, ix + 66, yy + 8, C.rail, 2);
  }
  ctx.fillStyle = '#c9ddd3';
  ctx.fillRect(ix + iw * 0.26, iy, iw * 0.18, ih);
  ctx.fillStyle = '#d8cdb8';
  ctx.fillRect(ix + iw * 0.44, iy, iw * 0.18, ih);
  ctx.fillStyle = '#eee8da';
  ctx.fillRect(ix + iw * 0.62, iy, iw * 0.38, ih);
  line(ctx, ix + iw * 0.50, iy, ix + iw * 0.50, iy + ih, C.blue, 7);
  for (let yy = iy + 10; yy < iy + ih; yy += 24) line(ctx, ix + iw * 0.48, yy, ix + iw * 0.52, yy, C.white, 2);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 7]);
  ctx.strokeRect(ix + iw * 0.55, iy + ih * 0.28, iw * 0.34, ih * 0.44);
  ctx.restore();
  line(ctx, ix + iw * 0.78, iy + ih * 0.5, ix + iw * 0.5, iy + ih * 0.5, C.yellow, 7);
  text(ctx, lang === 'zh' ? '遗产铁路\n不跨越' : 'HERITAGE RAIL\nNO CROSSING', ix + 4, iy + 6, iw * 0.23, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '绿化缓冲' : 'GREEN\nBUFFER', ix + iw * 0.27, iy + 6, iw * 0.14, 11, C.ink, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '既有慢行\n净宽实测 TBC' : 'EXISTING ROUTE\nWIDTH TBC', ix + iw * 0.45, iy + 6, iw * 0.16, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '社区界面\n权属/消防 TBC' : 'COMMUNITY EDGE\nRIGHTS/FIRE TBC', ix + iw * 0.66, iy + 6, iw * 0.3, 11, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '18×12 m P0\n概念包络\n无坐标 / 不放样' : '18×12 m P0\nNO COORDS\nDO NOT SET OUT', ix + iw * 0.58, iy + ih * 0.34, iw * 0.28, 11, C.red, true, lang, 1.08, 4);
}

function buildPlan(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:100 条件式平面｜设计假设，可移动/缩小/暂停/拆除' : '1:100 CONDITIONAL PLAN | ASSUMPTIONS; MOVE / SHRINK / PAUSE / REMOVE', lang, C.blue);
  const ox = x + 42, oy = y + 76;
  const scale = Math.min((w - 84) / 18, (h - 122) / 12);
  const pw = 18 * scale, ph = 12 * scale;
  const X = m => ox + m * scale;
  const Y = m => oy + m * scale;
  ctx.fillStyle = C.ground;
  ctx.fillRect(ox, oy, pw, ph);
  ctx.fillStyle = '#d6ded9';
  ctx.fillRect(X(0), Y(0.5), pw, 3 * scale);
  ctx.fillStyle = '#efeadf';
  ctx.fillRect(X(5.5), Y(4), 12 * scale, 8 * scale);
  ctx.save();
  ctx.strokeStyle = C.blue;
  ctx.lineWidth = 3;
  ctx.setLineDash([9, 7]);
  ctx.strokeRect(X(5.5), Y(4), 12 * scale, 8 * scale);
  ctx.restore();
  ctx.fillStyle = C.yellow;
  ctx.fillRect(X(14.2), Y(3.5), 3.2 * scale, 0.14 * scale);
  ctx.fillStyle = C.paleRed;
  ctx.fillRect(X(14.2), Y(3.64), 3.2 * scale, 2 * scale);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 5]);
  ctx.strokeRect(X(14.2), Y(3.64), 3.2 * scale, 2 * scale);
  ctx.restore();
  ctx.fillStyle = '#c7d8e0';
  ctx.fillRect(X(14.6), Y(6.2), 2.4 * scale, 1.8 * scale);
  ctx.strokeStyle = C.blue;
  ctx.lineWidth = 2;
  ctx.strokeRect(X(14.6), Y(6.2), 2.4 * scale, 1.8 * scale);
  ctx.fillStyle = C.paleYellow;
  ctx.fillRect(X(6), Y(5), 4.8 * scale, 3.6 * scale);
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 3;
  ctx.strokeRect(X(6), Y(5), 4.8 * scale, 3.6 * scale);
  ctx.fillStyle = C.navy;
  ctx.fillRect(X(6.4), Y(6.2), 2.4 * scale, 0.8 * scale);
  ctx.fillStyle = C.paleGreen;
  ctx.fillRect(X(6.4), Y(9.4), 2.4 * scale, 0.7 * scale);
  ctx.fillStyle = C.green;
  for (let i = 0; i < 3; i++) ctx.fillRect(X(6.45 + i * 0.75), Y(9.45), 0.55 * scale, 0.55 * scale);
  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 5]);
  ctx.strokeRect(X(11), Y(4), 3 * scale, 8 * scale);
  ctx.restore();
  ctx.fillStyle = C.ink;
  ctx.fillRect(X(0), Y(3.5), pw, 0.3 * scale);
  for (let xx = X(0); xx < X(18); xx += 10) {
    ctx.fillStyle = (Math.floor((xx - X(0)) / 10) % 2) ? C.white : C.yellow;
    ctx.fillRect(xx, Y(3.5), 10, 0.3 * scale);
  }
  for (const cx of [10.1, 7.6]) {
    ctx.beginPath();
    ctx.arc(X(cx), Y(cx === 10.1 ? 6.6 : 8.2), 0.9 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = C.red;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const deskX = X(7.6), deskY = Y(6.6);
  line(ctx, deskX, deskY, X(0.4), Y(1.8), C.red, 1.4, [5, 5]);
  line(ctx, deskX, deskY, X(17.6), Y(1.8), C.red, 1.4, [5, 5]);
  line(ctx, deskX, deskY, X(15.8), Y(3.5), C.red, 1.4, [5, 5]);
  rounded(ctx, X(7.65), Y(6.28), 12, 12, 6, C.red);
  rounded(ctx, X(13.85), Y(4.05), 16, 16, 8, C.red);
  rounded(ctx, X(9.7), Y(5.25), 16, 16, 8, C.red);
  text(ctx, lang === 'zh' ? '有效慢行净宽 3.0 m｜任何构件 0 侵占' : '3.0 m effective clear route | 0 object encroachment', X(0.4), Y(0.8), 10.8 * scale, 16, C.ink, true, lang, 1.1, 2);
  text(ctx, lang === 'zh' ? '服务桌 2.4×0.8 m' : 'desk 2.4×0.8 m', X(6.45), Y(6.25), 2.25 * scale, 12, C.white, true, lang, 1, 2);
  text(ctx, lang === 'zh' ? 'D1.8 回转' : 'D1.8 turn', X(9.25), Y(6.0), 1.7 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '机器人停靠\n2.4×1.8 m' : 'robot bay\n2.4×1.8 m', X(14.75), Y(6.45), 2.1 * scale, 12, C.ink, true, lang, 1.1, 3);
  text(ctx, lang === 'zh' ? '不可进入区 3.2×2.0 m' : 'NO-ENTRY 3.2×2.0 m', X(14.3), Y(4.0), 3 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '3.0 m 拆除通道' : '3.0 m removal route', X(11.1), Y(10.8), 2.8 * scale, 12, C.red, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '座椅 3 + 轮椅同伴位 1' : '3 seats + 1 wheelchair companion bay', X(6.2), Y(10.25), 4.6 * scale, 12, C.green, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '概念值守视线 ≤15 m｜真人响应仍须实测' : 'concept sightline ≤15 m | human response field-TBC', X(5.7), Y(4.05), 7.8 * scale, 11, C.red, false, lang, 1.05, 2);
  dimension(ctx, X(0), Y(0.18), X(18), Y(0.18), '18.0 m', lang);
  dimension(ctx, X(0.2), Y(0.5), X(0.2), Y(3.5), '3.0 m', lang, -16);
  dimension(ctx, X(17.8), Y(0), X(17.8), Y(12), '12.0 m', lang, 10);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  ctx.strokeRect(ox, oy, pw, ph);
  label(ctx, lang === 'zh' ? 'NOT_AUTHORIZED / HOLD' : 'NOT_AUTHORIZED / HOLD', ox + 8, oy + ph - 36, C.red, C.white, lang);
}

function buildSection(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:50 断面｜净宽、接口与可撤回构件' : '1:50 SECTION | CLEARANCES, INTERFACES, REVERSIBLE COMPONENTS', lang, C.yellow);
  const ix = x + 28, base = y + h - 42, usable = w - 56;
  const total = 12;
  const S = usable / total;
  ctx.fillStyle = C.ground;
  ctx.fillRect(ix, base - 16, usable, 16);
  ctx.fillStyle = '#d6ded9';
  ctx.fillRect(ix, base - 30, 3 * S, 14);
  ctx.fillStyle = C.paleYellow;
  ctx.fillRect(ix + 3.6 * S, base - 28, 3.6 * S, 12);
  ctx.fillStyle = C.paleRed;
  ctx.fillRect(ix + 7.2 * S, base - 28, 1.5 * S, 12);
  line(ctx, ix, base - 30, ix + usable, base - 30, C.ink, 2);
  line(ctx, ix + 3 * S, base - 42, ix + 3 * S, base - 15, C.yellow, 8);
  ctx.strokeStyle = C.yellow;
  ctx.lineWidth = 5;
  ctx.strokeRect(ix + 4.0 * S, base - 150, 3.0 * S, 120);
  ctx.fillStyle = C.navy;
  ctx.fillRect(ix + 4.35 * S, base - 72, 1.7 * S, 30);
  ctx.fillStyle = C.green;
  ctx.fillRect(ix + 6.25 * S, base - 48, 0.65 * S, 18);
  line(ctx, ix + 7.2 * S, base - 150, ix + 7.2 * S, base - 30, C.red, 2, [6, 5]);
  text(ctx, lang === 'zh' ? '3.0 m 有效慢行' : '3.0 m clear route', ix + 4, base - 64, 2.8 * S, 14, C.ink, true, lang, 1.05, 2);
  text(ctx, lang === 'zh' ? '0.6 m 构件退距' : '0.6 m object setback', ix + 3.05 * S, base - 92, 0.9 * S, 13, C.red, true, lang, 1.05, 4);
  text(ctx, lang === 'zh' ? '3.6 m 遮蔽/服务区\n净高概念 2.4 m' : '3.6 m shelter/service\nconcept clear height 2.4 m', ix + 4.05 * S, base - 138, 2.9 * S, 13, C.ink, true, lang, 1.1, 4);
  text(ctx, lang === 'zh' ? '1.5 m 维护/拆除净空' : '1.5 m maintenance/removal clearance', ix + 7.25 * S, base - 118, 1.4 * S, 13, C.red, true, lang, 1.1, 5);
  text(ctx, lang === 'zh' ? '应急基线净宽、坡度、排水、照度均 TBC；不得因 P0 缩减' : 'Emergency baseline width, slope, drainage, and lighting are TBC and cannot be reduced by P0', ix + 8.85 * S, base - 112, 3.0 * S, 13, C.grey, true, lang, 1.1, 6);
  dimension(ctx, ix, base + 14, ix + 3 * S, base + 14, '3.0 m', lang);
  dimension(ctx, ix + 3 * S, base + 14, ix + 3.6 * S, base + 14, '0.6 m', lang);
  dimension(ctx, ix + 3.6 * S, base + 14, ix + 7.2 * S, base + 14, '3.6 m', lang);
  dimension(ctx, ix + 7.2 * S, base + 14, ix + 8.7 * S, base + 14, '1.5 m', lang);
}

function buildNode(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '1:20 关键接口｜可逆' : '1:20 KEY INTERFACE | REVERSIBLE', lang, C.red);
  const ix = x + 28, base = y + h - 42;
  ctx.fillStyle = '#aaa49b';
  ctx.fillRect(ix, base - 24, w - 56, 24);
  ctx.fillStyle = '#d8d3c7';
  ctx.fillRect(ix, base - 38, w - 56, 14);
  ctx.fillStyle = C.yellow;
  ctx.fillRect(ix + 42, base - 48, 52, 10);
  ctx.fillStyle = C.navy;
  ctx.fillRect(ix + 112, base - 118, 18, 80);
  ctx.fillStyle = C.ink;
  ctx.fillRect(ix + 90, base - 42, 62, 14);
  line(ctx, ix + 230, base - 40, ix + 230, base - 132, C.blue, 8);
  line(ctx, ix + 230, base - 132, ix + 280, base - 132, C.blue, 4);
  ctx.beginPath();
  ctx.arc(ix + 280, base - 132, 12, 0, Math.PI * 2);
  ctx.fillStyle = C.yellow;
  ctx.fill();
  line(ctx, ix + 170, base - 42, ix + 205, base - 42, C.red, 4);
  rounded(ctx, ix, y + 58, 132, 48, 6, '#eef1ef');
  rounded(ctx, ix + 148, y + 58, 140, 48, 6, '#eef1ef');
  rounded(ctx, ix, y + 112, 132, 48, 6, C.paleRed);
  rounded(ctx, ix + 148, y + 112, 140, 48, 6, '#e6eef2');
  text(ctx, lang === 'zh' ? '可逆防滑层\n材料/坡度 TBC' : 'REVERSIBLE LAYER\nMATERIAL/SLOPE TBC', ix + 8, y + 66, 116, 10, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '保护垫+压重底座\n无穿透固定' : 'WEIGHTED BASE\nNO PENETRATION', ix + 156, y + 66, 124, 10, C.ink, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '触觉+高对比\n做法 TBC' : 'TACTILE+CONTRAST\nDETAIL TBC', ix + 8, y + 120, 116, 10, C.red, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '照明/电源 TBC\n线缆不穿净宽' : 'LIGHT/POWER TBC\nNO CABLE ON ROUTE', ix + 156, y + 120, 124, 10, C.blue, true, lang, 1.05, 3);
  text(ctx, lang === 'zh' ? '排水口/流向：实测后定' : 'DRAIN/OUTFALL: AFTER BASELINE', ix + 154, base - 18, w - 220, 10, C.grey, false, lang, 1.05, 2);
}

function buildDimensionRegister(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '尺寸表｜仅作假设' : 'DIMENSIONS | ASSUMPTIONS ONLY', lang, C.red);
  const rows = [
    ['D01', '18×12 m', lang === 'zh' ? '筛查包络' : 'screening envelope'],
    ['D02', '12×8 m', lang === 'zh' ? '可逆地面' : 'reversible ground'],
    ['D03', '3.0 m', lang === 'zh' ? '有效净宽' : 'effective clear width'],
    ['D04', 'D1.8 m', lang === 'zh' ? '回转空间' : 'turning space'],
    ['D05', '2.4 m', lang === 'zh' ? '服务桌长度' : 'desk length'],
    ['D06', '≤15 m', lang === 'zh' ? '概念视线' : 'concept sightline'],
    ['D07', '2.4×1.8 m', lang === 'zh' ? '机器人包络' : 'robot bay'],
    ['D08', '3.2×2.0 m', lang === 'zh' ? '不可进入区' : 'no-entry zone'],
    ['D09', '0.6 m', lang === 'zh' ? '构件退距' : 'object setback'],
    ['D10', '1.5 m', lang === 'zh' ? '维护净空' : 'work clearance'],
    ['D11', '3.0 m', lang === 'zh' ? '拆除通道' : 'removal route'],
    ['D12', '17.28 m²', lang === 'zh' ? '可拆遮蔽' : 'shelter area']
  ];
  const startY = y + 51;
  rows.forEach((row, i) => {
    const yy = startY + i * 15.2;
    if (i % 2 === 0) {
      ctx.fillStyle = '#f0ede5';
      ctx.fillRect(x + 18, yy - 1, w - 36, 15);
    }
    text(ctx, row[0], x + 24, yy, 42, 10, C.red, true, lang, 1, 1);
    text(ctx, row[1], x + 72, yy, 82, 10, C.ink, true, lang, 1, 1);
    text(ctx, row[2], x + 160, yy, w - 180, 10, C.grey, false, lang, 1, 1);
  });
  rounded(ctx, x + 18, y + h - 43, w - 36, 32, 5, C.paleRed);
  text(ctx, lang === 'zh' ? 'TBC：触觉/对比、照明、排水、应急净宽、容量' : 'TBC: tactile/contrast, light, drainage, emergency width, capacity', x + 24, y + h - 36, w - 48, 10, C.red, true, lang, 1.05, 2);
}

function buildConditions(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '失败条件 → 可审计动作' : 'FAILURE CONDITION → AUDITABLE ACTION', lang, C.navy);
  const items = lang === 'zh' ? [
    ['移动 MOVE', '权属/文保/消防/管线/排水冲突', '筛出记录 + 新候选点基线'],
    ['缩小 SHRINK', '不削弱净宽、人工等价、维护和退出', '重算尺寸/BOQ/排班并重跑检查'],
    ['暂停 PAUSE', '排班、审计、天气、照明、维护或投诉缺口', '停用记录 + 人工接管 + 重启决定'],
    ['拆除 REMOVE', '安全关键失败、等价缺失、退出失败或群体拒绝', '事件包 + T12 拆除恢复记录'],
    ['恢复 RESTORE', '第 90 天结束或任何拆除指令', '前后对照 + 缺陷关闭 + 验收']
  ] : [
    ['MOVE', 'rights / heritage / fire / utility / drainage conflict', 'screen-out + new candidate baseline'],
    ['SHRINK', 'only if clear route, equivalence, maintenance, exit stay intact', 'recalculate dimensions / BOQ / roster'],
    ['PAUSE', 'roster, audit, weather, light, maintenance, complaint gap', 'stop log + human takeover + restart decision'],
    ['REMOVE', 'critical safety failure, missing equivalence, failed exit, group rejection', 'incident pack + T12 removal/restoration'],
    ['RESTORE', 'day 90 or any removal instruction', 'before/after + closure + acceptance']
  ];
  const rowH = (h - 72) / 5;
  items.forEach((item, i) => {
    const yy = y + 52 + i * rowH;
    label(ctx, item[0], x + 22, yy + 5, i >= 3 ? C.red : C.navy, C.white, lang);
    text(ctx, item[1], x + 150, yy + 4, 300, 11, C.ink, true, lang, 1.1, 3);
    text(ctx, item[2], x + 458, yy + 4, w - 480, 11, C.grey, false, lang, 1.1, 3);
    if (i < 4) line(ctx, x + 20, yy + rowH - 2, x + w - 20, yy + rowH - 2, C.light, 1);
  });
}

async function buildKeyFigure(lang) {
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 1600, 1000);
  titleBand(ctx, lang,
    lang === 'zh' ? '固定评审图 03 / v1.3 P0 可实施性' : 'FIXED REVIEW FIGURE 03 / v1.3 P0 FEASIBILITY',
    lang === 'zh' ? 'P0-ALL-STOP-01｜尺寸化首启单元' : 'P0-ALL-STOP-01 | DIMENSIONED LAUNCH UNIT',
    lang === 'zh' ? 'NOT_AUTHORIZED · HOLD\n非定位概念筛查 · 不可放样/采购' : 'NOT_AUTHORIZED · HOLD\nUnlocated screening concept · no set-out/procurement');
  buildSiteRelation(ctx, 32, 112, 500, 246, lang);
  buildPlan(ctx, 32, 376, 804, 592, lang);
  buildSection(ctx, 854, 112, 714, 246, lang);
  buildNode(ctx, 854, 376, 344, 286, lang);
  buildDimensionRegister(ctx, 1216, 376, 352, 286, lang);
  buildConditions(ctx, 854, 680, 714, 288, lang);
  const out = path.join(FIGURES, lang === 'zh' ? 'key-areas.png' : 'key-areas.en.png');
  fs.writeFileSync(out, await canvas.encode('png'));
}

function drawTimeline(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '90 天 → 12 项连续任务 → G0—G5' : '90 DAYS → 12 CONTINUOUS TASKS → G0—G5', lang, C.blue);
  const taskNamesZh = ['角色/停权', '候选点筛查', '现场基线', '付费共设', '条件设计', '专业复核', '中性采购', '全尺样机', '安装演练', '限时小试', '独立决策', '拆除恢复'];
  const taskNamesEn = ['roles/stop', 'site screen', 'baseline', 'paid co-design', 'conditional design', 'professional review', 'neutral procurement', 'full mock-up', 'install/rehearse', 'limited trial', 'independent decision', 'remove/restore'];
  const names = lang === 'zh' ? taskNamesZh : taskNamesEn;
  const innerX = x + 24, innerY = y + 62, cellW = (w - 48) / 6, cellH = (h - 84) / 2;
  DATA.tasks.forEach((task, i) => {
    const row = Math.floor(i / 6), col = i % 6;
    const cx = innerX + col * cellW, cy = innerY + row * cellH;
    rounded(ctx, cx + 3, cy + 2, cellW - 8, cellH - 10, 8, i >= 9 ? C.paleYellow : '#eef1ef', i === 8 ? C.red : C.light, i === 8 ? 2.5 : 1);
    text(ctx, task.task_id, cx + 11, cy + 10, cellW - 22, 13, C.red, true, lang, 1, 1);
    text(ctx, names[i], cx + 11, cy + 28, cellW - 22, 14, C.ink, true, lang, 1.1, 2);
    const gateText = i === 8 ? 'G0–G4' : task.required_gates.join('+');
    text(ctx, `${task.window} · ${gateText}`, cx + 11, cy + cellH - 33, cellW - 22, 11, C.grey, false, lang, 1, 1);
    if (col < 5) arrow(ctx, cx + cellW - 12, cy + cellH / 2, cx + cellW - 2, cy + cellH / 2, C.blue, 1.4);
  });
}

function drawRolesAndGates(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '责任与停止权｜全部 unassigned/conditional' : 'ACCOUNTABILITY + STOP POWER | ALL unassigned/conditional', lang, C.red);
  const roles = lang === 'zh' ? [
    ['执行', 'R-P0-EXEC'], ['最终签放/恢复验收', 'A-P0-RIGHTS'], ['立即叫停', '共同设计 / 服务 / 安全'], ['人工接管', 'R-P0-SERVICE'], ['拆除恢复', 'R-P0-INSTALL'], ['独立证据审查', 'R-P0-EVAL']
  ] : [
    ['execute', 'R-P0-EXEC'], ['final release/restoration acceptance', 'A-P0-RIGHTS'], ['immediate stop', 'co-design / service / safety'], ['human takeover', 'R-P0-SERVICE'], ['remove/restore', 'R-P0-INSTALL'], ['independent evidence review', 'R-P0-EVAL']
  ];
  roles.forEach((r, i) => {
    const yy = y + 58 + i * 27;
    text(ctx, r[0], x + 22, yy, w * 0.52, 13, C.grey, false, lang, 1, 1);
    text(ctx, r[1], x + w * 0.52, yy, w * 0.43, 13, C.ink, true, lang, 1, 1);
  });
  const gateY = y + h - 84;
  ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'].forEach((g, i) => {
    const gx = x + 22 + i * ((w - 44) / 6);
    rounded(ctx, gx, gateY, (w - 58) / 6, 31, 6, C.red);
    text(ctx, g, gx + 8, gateY + 7, 48, 14, C.white, true, lang, 1, 1);
  });
  text(ctx, lang === 'zh' ? '默认 6/6 关闭；公众/工作人员可触发实体急停，无惩罚。' : '6/6 default closed; any user/worker may activate the physical stop without penalty.', x + 22, gateY + 40, w - 44, 12, C.red, true, lang, 1.1, 2);
}

function drawBoq(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '不计价 BOQ｜16 行均可由平面/任务推导' : 'NON-PRICED BOQ | 16 PLAN/TASK-DERIVED LINES', lang, C.green);
  const qtyDisplay = ['1 set', '17.3 m²', '96 m²', '1 desk', '2 units', '1 rack', '5 points', '18 m', '3.2 m', '6.4 m²', '3+1 bay', '4 points', '1+2 pts', '1+4 checks', '13 visits', '1 lot'];
  const shortEn = [
    'Frame', 'Shelter', 'Reversible ground', 'Staffed desk', 'E-stop ×2', 'Paper rack',
    'Wayfinding points', 'Tactile / contrast edge', 'Robot stop line', 'Robot no-entry marking',
    'Seating + companion bay', 'Lighting points', 'Interface cabinet + points',
    'Install + four checks', 'Maintenance visits', 'Remove + restore'
  ];
  const compact = DATA.boq.map((q, i) => [q.boq_id, lang === 'zh' ? q.item_zh : shortEn[i], qtyDisplay[i]]);
  const cols = 2, rows = 8, colW = (w - 42) / cols;
  compact.forEach((row, i) => {
    const col = Math.floor(i / rows), rr = i % rows;
    const xx = x + 20 + col * colW, yy = y + 56 + rr * 39;
    if (rr % 2 === 0) {
      ctx.fillStyle = '#f0ede5';
      ctx.fillRect(xx, yy - 3, colW - 10, 35);
    }
    text(ctx, row[0], xx + 5, yy, 58, 11, C.red, true, lang, 1, 1);
    text(ctx, row[1], xx + 63, yy, colW - 155, 12, C.ink, true, lang, 1.05, 2);
    text(ctx, row[2], xx + colW - 86, yy, 78, 11, C.grey, false, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '单价 / 正式总价 / 报价单位 / 基准日：null / TBC' : 'Unit rates / formal total / quotation entity / basis date: null / TBC', x + 24, y + h - 38, w - 48, 13, C.red, true, lang, 1.1, 2);
}

function drawCost(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '参数化成本｜8 组件 / 0 单价' : 'PARAMETRIC COST | 8 PARTS / 0 RATES', lang, C.yellow);
  text(ctx, 'C_P0 = REV + HUMAN + CO-DESIGN + ACCESS/SAFETY + PRIVACY/EVAL + O&M + REMOVE/RESTORE + RESERVE', x + 22, y + 56, w - 44, 13, C.ink, true, lang, 1.18, 5);
  const startY = y + 133;
  DATA.cost_model.components.forEach((c, i) => {
    const yy = startY + i * 27;
    rounded(ctx, x + 22, yy, 106, 21, 4, i === 7 ? C.red : C.navy);
    text(ctx, c.cost_id.replace('C_', ''), x + 29, yy + 4, 94, 10, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? c.label_zh : c.label_en, x + 140, yy + 2, w - 162, 11, C.ink, true, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '敏感性：开放工时、天数、班次重叠、FTE 生产工时、共同设计支持、BOQ 数量、恢复面积、预备费率。' : 'Sensitivity: hours, open days, shift overlap, productive FTE hours, co-design support, BOQ quantities, remediation area, contingency.', x + 22, y + h - 73, w - 44, 12, C.grey, false, lang, 1.15, 4);
  label(ctx, 'null / TBC', x + 22, y + h - 34, C.red, C.white, lang);
}

function drawAcceptance(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '两层验收｜A：6 通过 / 2 暂停｜B：12 暂停' : 'ACCEPTANCE | A: 6P / 2H | B: 12H', lang, C.red);
  const current = DATA.acceptance_current_package;
  const startY = y + 58;
  current.forEach((m, i) => {
    const yy = startY + i * 30;
    const hold = m.current_status.startsWith('HOLD');
    rounded(ctx, x + 20, yy, 54, 22, 5, hold ? C.red : C.green);
    text(ctx, m.metric_id.replace('P0-', ''), x + 26, yy + 5, 44, 11, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? m.label_zh : m.label_en, x + 84, yy + 1, w - 180, 12, C.ink, true, lang, 1.05, 2);
    text(ctx, hold ? 'HOLD' : 'PASS', x + w - 82, yy + 3, 60, 12, hold ? C.red : C.green, true, lang, 1, 1);
  });
  const fieldY = startY + 8 * 30 + 10;
  rounded(ctx, x + 20, fieldY, w - 40, h - (fieldY - y) - 20, 8, C.paleRed, C.red, 1.5);
  text(ctx, lang === 'zh' ? 'B｜必须等待现场基线：轮椅、低视力、无智能手机老人用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班、真实成本。' : 'B | FIELD BASELINE REQUIRED: wheelchair, low vision, no-smartphone time, human response, conflicts, noise, lighting, drainage, microclimate, residents, roster, actual cost.', x + 34, fieldY + 14, w - 68, 13, C.red, true, lang, 1.18, 7);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价缺失或无法退出 => 整体 HOLD；不得用平均值覆盖。' : 'Any group safety-critical failure, missing equivalent, or failed exit => whole unit HOLD; no averaging away failure.', x + 34, y + h - 55, w - 68, 13, C.ink, true, lang, 1.18, 4);
}

function drawA3FocusStrip(ctx, x, y, w, lang, mode) {
  rounded(ctx, x, y, w, 64, 12, C.navy);
  const value = mode === 'tasks'
    ? (lang === 'zh'
      ? 'P0-ALL-STOP-01 | D00-D90 | 12 项连续任务 | 8 个责任槽位 | G0-G5 默认关闭 | 当前 HOLD'
      : 'P0-ALL-STOP-01 | D00-D90 | 12 CONTINUOUS TASKS | 8 ROLE SLOTS | G0-G5 DEFAULT CLOSED | HOLD')
    : (lang === 'zh'
      ? '16 行不计价 BOQ | 8 类参数化成本 | A 层 6 PASS / 2 HOLD | B 层 12 HOLD | 价格 null/TBC'
      : '16 NON-PRICED BOQ LINES | 8 PARAMETRIC COST PARTS | LAYER A 6 PASS / 2 HOLD | LAYER B 12 HOLD | PRICES null/TBC');
  text(ctx, value, x + 24, y + 20, w - 48, 18, C.white, true, lang, 1.15, 2);
}

function drawA3TaskFocus(ctx, x, y, w, h, lang) {
  drawA3FocusStrip(ctx, x, y, w, lang, 'tasks');
  const timelineY = y + 78;
  const timelineH = 500;
  panel(ctx, x, timelineY, w, timelineH, lang === 'zh' ? '90 天交付任务链 | 每项均带时间、责任、Gate 与退出证据' : '90-DAY DELIVERY CHAIN | TIME, RESPONSIBILITY, GATE + EXIT EVIDENCE', lang, C.blue);
  const taskNamesZh = ['角色与停权', '候选点筛查', '现场基线', '付费共同设计', '条件设计', '专业复核', '中性采购', '全尺样机', '安装与演练', '限时小试', '独立决策', '拆除与恢复'];
  const taskNamesEn = ['roles + stop power', 'candidate screen', 'site baseline', 'paid co-design', 'conditional design', 'professional review', 'neutral procurement', 'full-scale mock-up', 'install + rehearse', 'limited trial', 'independent decision', 'remove + restore'];
  const names = lang === 'zh' ? taskNamesZh : taskNamesEn;
  const gap = 10;
  const innerX = x + 24;
  const innerY = timelineY + 66;
  const cellW = (w - 48 - gap * 5) / 6;
  const cellH = (timelineH - 84 - gap) / 2;
  DATA.tasks.forEach((task, i) => {
    const row = Math.floor(i / 6), col = i % 6;
    const cx = innerX + col * (cellW + gap), cy = innerY + row * (cellH + gap);
    const alert = i === 8;
    rounded(ctx, cx, cy, cellW, cellH, 10, i >= 9 ? C.paleYellow : '#eef1ef', alert ? C.red : C.light, alert ? 2.5 : 1.2);
    text(ctx, task.task_id, cx + 12, cy + 10, cellW - 24, 15, C.red, true, lang, 1, 1);
    text(ctx, names[i], cx + 12, cy + 34, cellW - 24, 18, C.ink, true, lang, 1.08, 2);
    text(ctx, `${task.window} | ${task.required_gates.join('+')}`, cx + 12, cy + 83, cellW - 24, 13, C.grey, true, lang, 1.05, 1);
    text(ctx, `R: ${task.responsible_role}`, cx + 12, cy + 111, cellW - 24, 12, C.ink, false, lang, 1.05, 2);
    text(ctx, `A: ${task.accountable_role}`, cx + 12, cy + 146, cellW - 24, 12, C.ink, false, lang, 1.05, 2);
    if (col < 5) arrow(ctx, cx + cellW + 1, cy + cellH / 2, cx + cellW + gap - 1, cy + cellH / 2, C.blue, 1.5);
  });

  const rolesY = timelineY + timelineH + 18;
  const rolesH = y + h - rolesY;
  panel(ctx, x, rolesY, w, rolesH, lang === 'zh' ? '责任交接与立即停止权 | 8 个槽位全部 unassigned/conditional' : 'ACCOUNTABILITY HAND-OFF + IMMEDIATE STOP POWER | ALL 8 SLOTS unassigned/conditional', lang, C.red);
  const cols = 4, roleGap = 10;
  const roleW = (w - 48 - roleGap * 3) / cols;
  DATA.roles.forEach((role, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const rx = x + 24 + col * (roleW + roleGap), ry = rolesY + 58 + row * 66;
    rounded(ctx, rx, ry, roleW, 56, 8, '#eef1ef', C.light, 1);
    text(ctx, role.role_id, rx + 10, ry + 8, roleW - 20, 13, C.red, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? role.role_zh : role.role_en, rx + 10, ry + 27, roleW - 20, 13, C.ink, true, lang, 1.05, 2);
  });
  const gateY = rolesY + rolesH - 78;
  text(ctx, lang === 'zh' ? '卡片用于快速导航；每个 task_id 的输入、输出、HOLD 与恢复/退出证据均保留在交付台账。' : 'Cards are a reading index; every task_id retains input, output, HOLD and recovery/exit evidence in the delivery register.', x + 24, gateY - 34, w - 48, 13, C.grey, false, lang, 1.08, 2);
  ['G0', 'G1', 'G2', 'G3', 'G4', 'G5'].forEach((gate, i) => {
    const gx = x + 24 + i * ((w - 48) / 6);
    rounded(ctx, gx, gateY, (w - 68) / 6, 31, 6, C.red);
    text(ctx, gate, gx + 12, gateY + 6, 60, 16, C.white, true, lang, 1, 1);
  });
  text(ctx, lang === 'zh' ? '任一公众或工作人员可无惩罚触发实体急停；G0-G5 默认 6/6 关闭。' : 'Any user or worker may activate the physical stop without penalty; G0-G5 remain 6/6 default closed.', x + 24, rolesY + rolesH - 39, w - 48, 14, C.red, true, lang, 1.1, 2);
}

function drawA3BoqFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '不计价 BOQ | 16 行均可回溯至平面、断面或任务' : 'NON-PRICED BOQ | 16 LINES TRACE TO PLAN, SECTION OR TASK', lang, C.green);
  const qty = ['1 set', '17.3 m²', '96 m²', '1 desk', '2 units', '1 rack', '5 points', '18 m', '3.2 m', '6.4 m²', '3+1 bay', '4 points', '1+2 pts', '1+4 checks', '13 visits', '1 lot'];
  const shortEn = ['Frame', 'Shelter', 'Reversible ground', 'Staffed desk', 'E-stop facilities', 'Paper rack', 'Wayfinding points', 'Tactile / contrast edge', 'Robot stop line', 'Robot no-entry marking', 'Seating + companion bay', 'Lighting points', 'Interface cabinet + points', 'Install + four checks', 'Maintenance visits', 'Remove + restore'];
  const gap = 14, colW = (w - 40 - gap) / 2, rowH = (h - 104) / 8;
  DATA.boq.forEach((item, i) => {
    const col = Math.floor(i / 8), row = i % 8;
    const xx = x + 20 + col * (colW + gap), yy = y + 58 + row * rowH;
    if (row % 2 === 0) { ctx.fillStyle = '#f0ede5'; ctx.fillRect(xx, yy - 3, colW, rowH - 3); }
    text(ctx, item.boq_id, xx + 5, yy + 4, 62, 13, C.red, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.item_zh : shortEn[i], xx + 72, yy + 3, colW - 174, 14, C.ink, true, lang, 1.05, 2);
    text(ctx, qty[i], xx + colW - 92, yy + 4, 86, 13, C.grey, false, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '市场单价、报价主体、货币、正式总价与基准日：null / TBC' : 'Market rates, quotation entity, currency, formal total and basis date: null / TBC', x + 24, y + h - 36, w - 48, 14, C.red, true, lang, 1.05, 2);
}

function drawA3CostFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '参数化成本 | 8 组件，0 个市场单价' : 'PARAMETRIC COST | 8 PARTS, 0 MARKET RATES', lang, C.yellow);
  text(ctx, 'C_P0 = REV + HUMAN + CO-DESIGN + ACCESS/SAFETY', x + 22, y + 55, w - 44, 15, C.ink, true, lang, 1.05, 1);
  text(ctx, '+ PRIVACY/EVAL + O&M + REMOVE/RESTORE + RESERVE', x + 22, y + 76, w - 44, 15, C.ink, true, lang, 1.05, 1);
  const gap = 12, colW = (w - 44 - gap) / 2, startY = y + 108, rowH = 47;
  DATA.cost_model.components.forEach((item, i) => {
    const col = Math.floor(i / 4), row = i % 4;
    const xx = x + 22 + col * (colW + gap), yy = startY + row * rowH;
    rounded(ctx, xx, yy, colW, 38, 7, '#eef1ef');
    rounded(ctx, xx + 6, yy + 7, 116, 24, 5, i === 7 ? C.red : C.navy);
    text(ctx, item.cost_id.replace('C_', ''), xx + 13, yy + 11, 102, 11, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.label_zh : item.label_en, xx + 132, yy + 8, colW - 142, 13, C.ink, true, lang, 1.05, 2);
  });
  text(ctx, lang === 'zh' ? '敏感性：开放工时、天数、班次重叠、FTE、付费参与支持、BOQ 数量、恢复面积、预备费率。' : 'Sensitivity: opening hours, days, shift overlap, FTE, paid participation support, BOQ quantities, restoration area and reserve rate.', x + 22, y + h - 82, w - 150, 13, C.grey, false, lang, 1.12, 3);
  label(ctx, 'null / TBC', x + w - 132, y + h - 48, C.red, C.white, lang);
}

function drawA3AcceptanceFocus(ctx, x, y, w, h, lang) {
  panel(ctx, x, y, w, h, lang === 'zh' ? '两层验收 | A：6 PASS / 2 HOLD | B：12 HOLD' : 'TWO-LAYER ACCEPTANCE | A: 6 PASS / 2 HOLD | B: 12 HOLD', lang, C.red);
  const startY = y + 68, rowH = 48;
  DATA.acceptance_current_package.forEach((item, i) => {
    const yy = startY + i * rowH;
    const hold = item.current_status.startsWith('HOLD');
    rounded(ctx, x + 22, yy, 62, 28, 6, hold ? C.red : C.green);
    text(ctx, item.metric_id.replace('P0-', ''), x + 30, yy + 7, 50, 13, C.white, true, lang, 1, 1);
    text(ctx, lang === 'zh' ? item.label_zh : item.label_en, x + 98, yy + 2, w - 208, 16, C.ink, true, lang, 1.08, 2);
    text(ctx, hold ? 'HOLD' : 'PASS', x + w - 92, yy + 5, 70, 14, hold ? C.red : C.green, true, lang, 1, 1);
    line(ctx, x + 22, yy + rowH - 7, x + w - 22, yy + rowH - 7, C.light, 1);
  });
  const fieldY = startY + 8 * rowH + 8;
  rounded(ctx, x + 22, fieldY, w - 44, h - (fieldY - y) - 22, 10, C.paleRed, C.red, 1.5);
  text(ctx, lang === 'zh' ? 'B 层必须等待现场基线：轮椅、低视力、无智能手机老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班与真实成本。' : 'LAYER B REQUIRES FIELD BASELINES: wheelchair, low vision, no-smartphone time to staffed help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, roster and actual cost.', x + 42, fieldY + 22, w - 84, 16, C.red, true, lang, 1.22, 8);
  rounded(ctx, x + 42, fieldY + 126, w - 84, 82, 8, C.white, C.light, 1);
  text(ctx, lang === 'zh' ? '可审计字段（按 metric_id）：公式 → 数据源 → 阈值状态 → 责任角色 → 当前状态 → 触发条件' : 'AUDIT FIELDS (BY metric_id): formula → data source → threshold state → responsible role → current status → trigger', x + 58, fieldY + 144, w - 116, 14, C.navy, true, lang, 1.18, 3);
  text(ctx, lang === 'zh' ? '合成任务、虚构人物旅程和普通意见不得代替 B 层现场绩效。' : 'Synthetic tasks, fictional journeys and general opinions cannot substitute for Layer-B field performance.', x + 58, fieldY + 181, w - 116, 13, C.grey, false, lang, 1.12, 2);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价服务缺失或无法退出 => 整体 HOLD；不得以平均值覆盖。' : 'Any group safety-critical failure, missing equivalent service or failed exit => whole unit HOLD; no averaging away failure.', x + 42, y + h - 72, w - 84, 15, C.ink, true, lang, 1.18, 4);
}

function drawA3DeliveryFocus(ctx, x, y, w, h, lang) {
  drawA3FocusStrip(ctx, x, y, w, lang, 'delivery');
  const contentY = y + 84;
  const gap = 20;
  const leftW = Math.round(w * 0.52);
  const rightX = x + leftW + gap;
  const rightW = w - leftW - gap;
  drawA3BoqFocus(ctx, x, contentY, leftW, 420, lang);
  drawA3CostFocus(ctx, x, contentY + 440, leftW, h - 524, lang);
  drawA3AcceptanceFocus(ctx, rightX, contentY, rightW, h - 84, lang);
}

async function buildMetricsFigure(lang) {
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, 1600, 1000);
  titleBand(ctx, lang,
    lang === 'zh' ? '固定评审图 05 / v1.3 实施证据' : 'FIXED REVIEW FIGURE 05 / v1.3 IMPLEMENTATION EVIDENCE',
    lang === 'zh' ? 'P0 任务链、工程量、成本与验收' : 'P0 TASKS, QUANTITIES, COST + ACCEPTANCE',
    lang === 'zh' ? 'P0-ALL-STOP-01 · 90 天 · G0—G5\n可失败、可停止、可退出' : 'P0-ALL-STOP-01 · 90 days · G0—G5\nfail · stop · exit');
  rounded(ctx, 32, 106, 1536, 62, 12, C.navy);
  const summary = lang === 'zh'
    ? '30 秒：216 m² 概念包络｜3.0 m 净宽｜12 任务｜16 行 BOQ｜8 类成本｜角色未指派｜价格 null/TBC｜当前 NOT_AUTHORIZED + HOLD'
    : '30 SEC: 216 m² concept envelope | 3.0 m clear | 12 tasks | 16 BOQ lines | 8 costs | roles unassigned | prices null/TBC | NOT_AUTHORIZED + HOLD';
  text(ctx, summary, 54, 124, 1492, 18, C.white, true, lang, 1.18, 2);
  drawTimeline(ctx, 32, 186, 980, 322, lang);
  drawRolesAndGates(ctx, 1030, 186, 538, 322, lang);
  drawBoq(ctx, 32, 526, 618, 442, lang);
  drawCost(ctx, 668, 526, 420, 442, lang);
  drawAcceptance(ctx, 1106, 526, 462, 442, lang);
  const out = path.join(FIGURES, lang === 'zh' ? 'metrics-evidence.png' : 'metrics-evidence.en.png');
  fs.writeFileSync(out, await canvas.encode('png'));
}

function metricEntry(value, unit, formula, assumptions = ['A-P0-DIM-001'], confidence = 'high') {
  return {
    status: 'known', value, unit,
    source_files: ['visual/assets/v13-implementation.json'], formula, confidence, assumptions,
    interpretation: 'Conditional P0 concept-source value; not a field measurement, approved engineering parameter, supplier quote, or authorization.'
  };
}

function updateMetrics() {
  const metrics = readJson('metrics.json');
  const m = metrics.metrics;
  Object.assign(m, {
    p0_screening_envelope_area_sqm: metricEntry(216, 'sqm', '18.0 * 12.0'),
    p0_reversible_ground_area_sqm: metricEntry(96, 'sqm', '12.0 * 8.0'),
    p0_clear_route_width_m: metricEntry(3, 'm', 'concept effective clear-route width', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_wheelchair_turn_diameter_m: metricEntry(1.8, 'm', 'concept clear turning-circle diameter', ['A-P0-DIM-001', 'A-P0-CODESIGN-001'], 'medium'),
    p0_staffed_desk_length_m: metricEntry(2.4, 'm', 'concept demountable desk length'),
    p0_staffed_sightline_m: metricEntry(15, 'm', 'maximum concept plan sightline; not response-time performance', ['A-P0-DIM-001', 'A-P0-FIELD-001'], 'medium'),
    p0_robot_bay_area_sqm: metricEntry(4.32, 'sqm', '2.4 * 1.8'),
    p0_robot_no_entry_area_sqm: metricEntry(6.4, 'sqm', '3.2 * 2.0'),
    p0_component_setback_m: metricEntry(0.6, 'm', 'concept minimum setback outside effective route', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_maintenance_clearance_m: metricEntry(1.5, 'm', 'concept working clearance around demountable components', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_removal_access_width_m: metricEntry(3, 'm', 'concept removal-access width; no vehicle authorization', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_canopy_area_sqm: metricEntry(17.28, 'sqm', '4.8 * 3.6', ['A-P0-DIM-001', 'A-P0-SITE-001'], 'medium'),
    p0_task_chain_count: metricEntry(12, 'count', 'count(v13-implementation.tasks)', ['A-P0-ROLE-001']),
    p0_role_slot_count: metricEntry(8, 'count', 'count(v13-implementation.roles)', ['A-P0-ROLE-001']),
    p0_boq_line_count: metricEntry(16, 'count', 'count(v13-implementation.boq)', ['A-P0-COST-001']),
    p0_tbc_interface_count: metricEntry(6, 'count', 'count(v13-implementation.tbc_interfaces)', ['A-P0-SITE-001']),
    p0_cost_component_count: metricEntry(8, 'count', 'count(v13-implementation.cost_model.components)', ['A-P0-COST-001']),
    p0_market_rate_known_count: metricEntry(0, 'count', 'count(cost rates where verified market rate is non-null)', ['A-P0-COST-001']),
    p0_current_package_check_count: metricEntry(8, 'count', 'count(v13-implementation.acceptance_current_package)', ['A-P0-FIELD-001']),
    p0_current_package_pass_count: metricEntry(6, 'count', 'count(current package checks with current_status starting PASS)', ['A-P0-FIELD-001']),
    p0_current_package_hold_count: metricEntry(2, 'count', 'count(current package checks with current_status starting HOLD)', ['A-P0-FIELD-001']),
    p0_field_check_hold_count: metricEntry(12, 'count', 'count(field checks with current_status starting HOLD)', ['A-P0-FIELD-001']),
    p0_gate_default_closed_ratio: metricEntry(1, 'ratio', 'default_closed_gates / 6', ['A-PILOT-001', 'A-P0-ROLE-001']),
    p0_route_obstruction_count: metricEntry(0, 'count', 'count(BOQ object boxes intersecting concept 18.0 m x 3.0 m clear route)', ['A-P0-DIM-001']),
    p0_malformed_input_hold_ratio: metricEntry(1, 'ratio', 'malformed-input tests resulting in HOLD / malformed-input tests', ['A-SIMULATION-001']),
    p0_exit_evidence_slot_count: metricEntry(6, 'count', 'count(T12 required exit/restoration evidence slots)', ['A-P0-ROLE-001'])
  });
  m.p0_market_price_total = {
    status: 'unknown', value: null, unit: 'currency', source_files: ['visual/assets/v13-implementation.json'],
    formula: 'sum(verified BOQ quantity_i * verified unit_rate_i) + services + reserve', confidence: 'unknown', assumptions: ['A-P0-COST-001'],
    reason: 'All market unit rates, currency, quotation entities, funding commitment, and estimate basis date remain null/TBC.'
  };
  m.p0_staffing_fte = {
    status: 'unknown', value: null, unit: 'FTE', source_files: ['visual/assets/v13-implementation.json'],
    formula: 'confirmed staffed opening hours / operator-confirmed productive hours per FTE', confidence: 'unknown', assumptions: ['A-P0-ROLE-001', 'A-P0-COST-001'],
    reason: 'No operator, authorized opening hours, roster, or productive-hours assumption has been accepted.'
  };
  m.p0_formal_total_cost = {
    status: 'unknown', value: null, unit: 'currency', source_files: ['visual/assets/v13-implementation.json'],
    formula: DATA.cost_model.formula, confidence: 'unknown', assumptions: ['A-P0-COST-001'],
    reason: 'Quantities are concept-derived but market rates, professional fees, funding, tax basis, and site-specific restoration scope are not available.'
  };
  writeJson('metrics.json', metrics);
}

function updateAssumptions() {
  const file = readJson('assumptions.json');
  const additions = [
    {
      id: 'A-P0-DIM-001', status: 'conditional_design_assumption',
      statement: 'P0-ALL-STOP-01 dimensions are transparent concept-screening assumptions derived from the stated 18 m x 12 m envelope and component relationships. They are not copied from another submission, are not site measurements, and are not claimed as statutory or signed engineering minima.',
      impact: 'They support clash checks, quantity derivation, and hand-off only. Every site- and standard-sensitive parameter remains subject to competent professional review.',
      recalculation_trigger: 'Candidate site survey, applicable public-standard confirmation, paid accessibility co-design, equipment selection, or any geometry change.'
    },
    {
      id: 'A-P0-SITE-001', status: 'TBC_no_candidate_site',
      statement: 'P0-ALL-STOP-01 has no nominated site, coordinates, rights holder, measured section, emergency baseline, utilities, drainage, lighting, noise, or microclimate record.',
      impact: 'Authorization stays NOT_AUTHORIZED and every field metric stays HOLD. The 1:500 relation is screening logic, not a site plan.',
      recalculation_trigger: 'Authorized candidate-site baseline and rights/heritage/fire/utilities review.'
    },
    {
      id: 'A-P0-ROLE-001', status: 'unassigned_conditional',
      statement: 'All eight execution, accountability, stop, human-takeover, installation, survey, and independent-evaluation role slots are unassigned/conditional.',
      impact: 'No gate may open, no public operation may begin, and no restoration may be accepted until written role acceptance and authority limits are recorded.',
      recalculation_trigger: 'Written acceptance by real competent parties without implying government authorization.'
    },
    {
      id: 'A-P0-COST-001', status: 'null_TBC_no_market_pricing',
      statement: 'The BOQ contains concept-derived quantities only. Currency, unit rates, quotation entities, estimate basis date, formal total, funding commitment, productive FTE hours, and restoration reserve are null/TBC.',
      impact: 'The cost model supports parameter and sensitivity hand-off but no price, budget, supplier, or funding claim.',
      recalculation_trigger: 'Nominated site, verified quantities, neutral procurement route, auditable market rates, professional cost plan, and funding authority.'
    },
    {
      id: 'A-P0-FIELD-001', status: 'HOLD_no_field_baseline',
      statement: 'The two-layer acceptance matrix distinguishes eight package-checkable items from twelve field-dependent metrics. Current package results are six PASS and two HOLD; all twelve field metrics remain HOLD.',
      impact: 'Synthetic tasks, concept paths, and fictional journeys cannot be presented as wheelchair, low-vision, older-person, response-time, conflict, environmental, acceptance, roster, or real-cost performance.',
      recalculation_trigger: 'G0-G3 evidence, paid co-design preregistration, authorized field data, named operator, and independent evaluation.'
    },
    {
      id: 'A-P0-CODESIGN-001', status: 'paid_codesign_required',
      statement: 'The 1.8 m turning assumption and all tactile, contrast, service-desk, response, and group thresholds must be tested with paid affected participants and accessibility professionals.',
      impact: 'Concept dimensions cannot substitute for lived-experience acceptance or professional compliance review.',
      recalculation_trigger: 'Accessible full-size mock-up and participant-approved task protocol.'
    }
  ];
  for (const item of additions) {
    const index = file.assumptions.findIndex(a => a.id === item.id);
    if (index >= 0) file.assumptions[index] = item; else file.assumptions.push(item);
  }
  writeJson('assumptions.json', file);
}

const METRIC_REF_BY_DIM = {
  'P0-D01': 'p0_screening_envelope_area_sqm', 'P0-D02': 'p0_reversible_ground_area_sqm',
  'P0-D03': 'p0_clear_route_width_m', 'P0-D04': 'p0_wheelchair_turn_diameter_m',
  'P0-D05': 'p0_staffed_desk_length_m', 'P0-D06': 'p0_staffed_sightline_m',
  'P0-D07': 'p0_robot_bay_area_sqm', 'P0-D08': 'p0_robot_no_entry_area_sqm',
  'P0-D09': 'p0_component_setback_m', 'P0-D10': 'p0_maintenance_clearance_m',
  'P0-D11': 'p0_removal_access_width_m', 'P0-D12': 'p0_canopy_area_sqm'
};

function safeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

function summaryBlock(lang) {
  const zh = lang === 'zh';
  return `<!-- V1.3_P0_SUMMARY_START -->\n### ${zh ? '30 秒 P0 实施摘要' : '30-second P0 implementation summary'}\n\n> **P0-ALL-STOP-01 · ${zh ? '条件式首启单元' : 'conditional launch unit'} · \`NOT_AUTHORIZED\` · \`HOLD\`**\n> ${zh ? '216 m² 非定位概念筛查包络，保留 3.0 m 有效慢行净宽；12 项任务、16 行不计价 BOQ、8 类成本组件。8 项包内验收目前 6 PASS / 2 HOLD，12 项现场验收全部 HOLD；8 个责任槽位均为 unassigned/conditional，市场单价、正式总价、报价单位与基准日均为 null/TBC。任一群体安全关键失败、等价服务缺失或无法退出，整体继续 HOLD。' : 'A 216 m² unlocated concept-screening envelope preserves a 3.0 m effective slow-route width; 12 tasks, 16 non-priced BOQ lines, and 8 cost components. Eight package checks currently show 6 PASS / 2 HOLD, while all 12 field checks remain HOLD. All 8 role slots are unassigned/conditional; market rates, formal total, quotation entity, and basis date are null/TBC. One group safety-critical failure, missing equivalent service, or failed exit keeps the whole unit on HOLD.'}\n\n${zh ? '固定入口：尺寸与接口见下文及 `assets/figures/key-areas.png`；任务、工程量、成本与验收见 `assets/figures/metrics-evidence.png`。这些是可复算交接证据，不是现场绩效、许可或工程签章。' : 'Fixed entry points: dimensions and interfaces appear below and in `assets/figures/key-areas.en.png`; tasks, quantities, cost, and acceptance appear in `assets/figures/metrics-evidence.en.png`. These are recomputable hand-off evidence, not field performance, permission, or engineering sign-off.'} [metric:p0_screening_envelope_area_sqm] [metric:p0_clear_route_width_m] [metric:p0_task_chain_count] [metric:p0_boq_line_count] [metric:p0_cost_component_count] [metric:p0_role_slot_count] [metric:p0_current_package_check_count] [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_field_check_hold_count]\n<!-- V1.3_P0_SUMMARY_END -->`;
}

function implementationBlock(lang) {
  const zh = lang === 'zh';
  const dRows = DATA.dimensions.map(d => {
    const ref = METRIC_REF_BY_DIM[d.dimension_id];
    return `| ${d.dimension_id} | ${safeCell(zh ? d.label_zh : d.label_en)} | ${safeCell(d.derivation)} [metric:${ref}] | ${safeCell(zh ? d.basis_zh : d.basis_en)} | \`${d.confirmation_role}\` / ${safeCell(d.trigger)} |`;
  }).join('\n');
  const taskZh = ['角色与停权登记', '候选点筛查', '现场基线', '付费共同设计', '条件设计与 BOQ', '许可/专业复核', '中性采购与方法书', '全尺样机与急停', '安装及 AI-off 演练', '限时小试', '独立评估与决策', '拆除、恢复、验收'];
  const taskRows = DATA.tasks.map((t, i) => {
    const title = zh ? taskZh[i] : t.outputs.slice(0, 2).join('; ');
    return `| ${t.task_id} | ${t.window} | \`${t.responsible_role}\` | \`${t.accountable_role}\` | ${safeCell(title)} | ${t.required_gates.join('+')} | ${safeCell(t.hold_conditions.join('; '))} | ${safeCell(t.recovery_or_exit_evidence.join('; '))} |`;
  }).join('\n');
  const boqRows = DATA.boq.map(q => `| ${q.boq_id} | ${safeCell(zh ? q.item_zh : q.item_en)} | ${q.quantity} ${q.unit} | ${safeCell(q.derivation)} | \`null/TBC\` |`).join('\n');
  const aRows = DATA.acceptance_current_package.map(m => `| ${m.metric_id} | ${safeCell(zh ? m.label_zh : m.label_en)} | ${safeCell(m.formula)} | ${safeCell(m.data_source)} | ${safeCell(m.threshold_status)} | \`${m.responsible_role}\` | **${m.current_status}** | ${safeCell(m.trigger_condition)} |`).join('\n');
  const bRows = DATA.acceptance_field.map(m => `| ${m.metric_id} | ${safeCell(zh ? m.label_zh : m.label_en)} | ${safeCell(m.formula)} | ${safeCell(m.data_source)} | ${safeCell(m.threshold_status)} | \`${m.responsible_role}\` | **${m.current_status}** | ${safeCell(m.trigger_condition)} |`).join('\n');
  const roleLines = DATA.roles.map(r => `- \`${r.role_id}\` — ${zh ? r.role_zh : r.role_en}: \`${r.assignment}\`; ${r.authority}`).join('\n');
  const costLines = DATA.cost_model.components.map(c => `- \`${c.cost_id}\` ${zh ? c.label_zh : c.label_en}: \`${c.formula}\`; value = \`null\`.`).join('\n');
  const metricRefs = '[metric:p0_tbc_interface_count]';
  return `<!-- V1.3_P0_IMPLEMENTATION_START -->\n### ${zh ? 'v1.3 P0-ALL-STOP-01：尺寸化、责任化、数量化' : 'v1.3 P0-ALL-STOP-01: dimensioned, accountable, quantified'}\n\n${zh ? '稳定对象 ID 为' : 'The stable object ID is'} \`P0-ALL-STOP-01\`. ${zh ? '它仍是无坐标、非定位、不可放样、不可采购的概念筛查单元；当前状态同时为' : 'It remains a coordinate-free, unlocated concept-screening unit that cannot be set out or procured; its current states are'} \`NOT_AUTHORIZED\`, \`HOLD\`, ${zh ? '角色' : 'roles'} \`unassigned/conditional\`, ${zh ? '价格' : 'prices'} \`null/TBC\`. ${zh ? '图件按 1:500 场地关系、1:100 平面、1:50 断面和 1:20 关键接口表达同一对象，但比例只说明图面关系与设计假设，不冒充正式选址或工程设计。' : 'The same object is shown at 1:500 site relation, 1:100 plan, 1:50 section, and 1:20 key interface. The scales communicate drawing relationships and assumptions only, never formal siting or engineering design.'}\n\n![${zh ? 'P0-ALL-STOP-01 场地关系、平面、断面、关键接口与条件动作' : 'P0-ALL-STOP-01 site relation, plan, section, key interface, and conditional actions'}](assets/figures/key-areas${zh ? '' : '.en'}.png)\n\n#### ${zh ? '尺寸登记：每一个数都带依据和确认触发' : 'Dimension register: every number has a basis and confirmation trigger'}\n\n| ID | ${zh ? '对象' : 'Object'} | ${zh ? '数值/推导' : 'Value / derivation'} | ${zh ? '设计假设边界' : 'Design-assumption boundary'} | ${zh ? '确认角色 / 触发' : 'Confirmation role / trigger'} |\n| --- | --- | --- | --- | --- |\n${dRows}\n\n${zh ? '六类现场接口继续为 TBC：触觉做法、高对比与夜间可读性、照度/眩光/电力容量、坡度/排水/出水口、应急净宽与消防控制、设备电力/数据/充电与线缆保护。任何线缆不得穿越有效路径；既有应急净宽不得因 P0 缩减；没有文保/管线/结构许可时不做穿透式固定。' : 'Six site interfaces remain TBC: tactile detail, contrast and night readability, lighting/glare/power, slope/drainage/outfall, emergency width/fire control, and power/data/charging/cable protection. No cable may cross the effective route; P0 cannot reduce the existing emergency width; no penetrating fixing is allowed without heritage, utility, and structural clearance.'} ${metricRefs}\n\n#### ${zh ? '权力与责任：执行、签放、叫停、接管、拆除与验收分开' : 'Authority and responsibility: execution, release, stop, takeover, removal, and acceptance are separated'}\n\n${roleLines}\n\n${zh ? '最终签放槽位是场地权利方/委托责任槽位，但不得绕过无障碍、消防、结构、电气、隐私、安全与独立证据记录。付费共同设计牵头、人工服务运营、当班安全/隐私角色拥有平行立即叫停权；任何使用者或工作人员都可无惩罚触发实体急停。人工接管由人工服务运营角色执行；安装恢复角色负责拆除、清运和地面恢复；场地责任槽位对恢复验收负责，独立评估角色只签证据完整性，不冒充政府或工程批准。' : 'The site-rights/commissioning slot holds final release accountability but cannot bypass accessibility, fire, structural, electrical, privacy, safety, or independent evidence. Paid co-design, staffed service, and on-duty safety/privacy roles hold equal immediate-stop power; any user or worker may activate the physical stop without penalty. The staffed operator performs takeover; the installation/restoration role dismantles, removes, and restores; the accountable site slot accepts restoration, while the independent evaluator signs evidence completeness only—not government or engineering approval.'}\n\n#### ${zh ? '90 天交付任务链' : '90-day delivery task chain'}\n\n| task_id | ${zh ? '窗口' : 'Window'} | ${zh ? '责任角色' : 'Responsible'} | ${zh ? 'Accountable' : 'Accountable'} | ${zh ? '输入/输出摘要' : 'Input/output summary'} | Gate | HOLD | ${zh ? '恢复或退出证据' : 'Recovery or exit evidence'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${taskRows}\n\n${zh ? '任务链共 12 项，保持 D00—D90 研究窗与 G0—G5 六道证据门。G0—G5 默认 6/6 关闭；T09 只有在路径侵占为 0、审计与 AI-off 等价均达到 12/12、错误输入 1/1 触发 HOLD 后才可能请求 G4，而不是自动放行。当前合成台账仍为审计 11/12、AI-off 等价 11/12，因此 P0 继续 HOLD。' : 'The chain contains 12 tasks within D00–D90 and retains G0–G5. All six gates default closed. T09 may request—but never automatically receive—G4 only after route encroachment is zero, audit and AI-off equivalence are both 12/12, and malformed input triggers HOLD in 1/1 tests. The present synthetic ledger remains 11/12 for audit and 11/12 for AI-off equivalence, so P0 remains on HOLD.'} [metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count] [metric:p0_malformed_input_hold_ratio]\n\n#### ${zh ? '不计价工程量清单' : 'Non-priced bill of quantities'}\n\n| boq_id | ${zh ? '项目' : 'Item'} | ${zh ? '数量' : 'Quantity'} | ${zh ? '推导' : 'Derivation'} | ${zh ? '计价状态' : 'Pricing state'} |\n| --- | --- | --- | --- | --- |\n${boqRows}\n\n${zh ? 'BOQ 共 16 行，覆盖构架、地面、人工桌、急停、纸本、多通道导视、座椅/遮蔽、照明、设备接口、安装、维护和拆除恢复。数量能从 1:100 平面、1:50 断面、1:20 节点或 90 天任务直接复算；市场单价已取得项为 0，货币、报价单位、正式总价与估算基准日仍为 null/TBC。' : 'The 16-line BOQ covers frame, ground, staffed desk, emergency stops, paper, multi-channel wayfinding, seating/shelter, lighting, equipment interfaces, installation, maintenance, and removal/restoration. Every quantity can be recomputed from the 1:100 plan, 1:50 section, 1:20 node, or 90-day tasks. Verified market-rate count is 0; currency, quotation entity, formal total, and estimate basis date remain null/TBC.'} [metric:p0_boq_line_count] [metric:p0_market_rate_known_count]\n\n#### ${zh ? '参数化成本模型：公式完整，价格不造' : 'Parametric cost model: complete formula, no fabricated prices'}\n\n\`${DATA.cost_model.formula}\`\n\n${costLines}\n\n${zh ? '人员公式为' : 'Staffing formula:'} \`${DATA.cost_model.staffing_formula}\`. ${zh ? '敏感性至少覆盖开放工时、开放天数、班次重叠、每 FTE 生产工时、付费参与与支持、BOQ 数量、恢复面积和预备费率。市场价格总额、所需 FTE 与正式总价都保持 unknown/null，只有具名场地、运营者、专业造价团队、报价来源、基准日和资金授权到位后才可计算。' : 'Sensitivity covers opening hours, open days, shift overlap, productive hours per FTE, paid participation/support, BOQ quantities, remediation area, and contingency. Market-price total, required FTE, and formal total all remain unknown/null until a named site, operator, professional cost team, rate sources, basis date, and funding authority exist.'} [metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte] [metric:p0_formal_total_cost]\n\n#### ${zh ? '两层验收 A：当前包内即可判断' : 'Two-layer acceptance A: checkable in the current package'}\n\n| metric_id | ${zh ? '指标' : 'Metric'} | ${zh ? '公式' : 'Formula'} | ${zh ? '数据源' : 'Data source'} | ${zh ? '阈值状态' : 'Threshold state'} | ${zh ? '责任' : 'Responsible'} | ${zh ? '当前状态' : 'Current state'} | ${zh ? '触发' : 'Trigger'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${aRows}\n\n${zh ? 'A 层 8 项当前为 6 PASS / 2 HOLD。HOLD 项就是演练中公开保留的审计缺口与人工桌关闭失败；只有补齐记录、修正人工服务并重跑同一固定任务，状态才可能改变。退出/恢复的 6 个证据槽位已在流程中完整定义，但真实执行仍属于 B 层现场证据。' : 'Layer A currently records 6 PASS / 2 HOLD across eight checks. The HOLD items are the disclosed audit gap and staffed-desk closure failure. Status changes only after closing the record gap, correcting staffed service, and rerunning the same fixed tasks. Six exit/restoration evidence slots are fully specified, but actual execution remains field evidence.'} [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_exit_evidence_slot_count]\n\n#### ${zh ? '两层验收 B：必须等待现场基线' : 'Two-layer acceptance B: field baseline required'}\n\n| metric_id | ${zh ? '指标' : 'Metric'} | ${zh ? '公式' : 'Formula'} | ${zh ? '数据源' : 'Data source'} | ${zh ? '阈值状态' : 'Threshold state'} | ${zh ? '责任' : 'Responsible'} | ${zh ? '当前状态' : 'Current state'} | ${zh ? '触发' : 'Trigger'} |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${bRows}\n\n${zh ? 'B 层 12 项全部 HOLD：没有真实轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班或真实成本数据。合成任务、虚构人物旅程和普通意见均不得代替它们。任一群体出现安全关键失败、等价服务缺失或无法退出时，整体 HOLD，不得用平均值覆盖。' : 'All 12 Layer-B items remain HOLD: there is no real wheelchair/low-vision task evidence, older-person time to staffed help, human response, flow conflict, noise, lighting, drainage, microclimate, resident acceptance, roster, or actual cost data. Synthetic tasks, fictional journeys, and general opinions cannot substitute. Any group safety-critical failure, missing equivalent, or failed exit places the whole unit on HOLD; averages cannot override it.'} [metric:p0_field_check_hold_count]\n\n![${zh ? 'P0 任务链、工程量、成本结构和两层验收矩阵' : 'P0 task chain, quantities, cost structure, and two-layer acceptance matrix'}](assets/figures/metrics-evidence${zh ? '' : '.en'}.png)\n<!-- V1.3_P0_IMPLEMENTATION_END -->`;
}

function replaceMarked(source, start, end, block, anchor) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex >= 0 && endIndex >= startIndex) {
    return source.slice(0, startIndex) + block + source.slice(endIndex + end.length);
  }
  const anchorIndex = source.indexOf(anchor);
  if (anchorIndex < 0) throw new Error(`anchor not found: ${anchor}`);
  return source.slice(0, anchorIndex) + block + '\n\n' + source.slice(anchorIndex);
}

function updateProposal(rel, lang) {
  const zh = lang === 'zh';
  let source = read(rel);
  source = source.replace(/^<!-- V1\.3_P0_(?:SUMMARY|IMPLEMENTATION)_(?:START|END) -->\n?/gm, '');
  source = source.replace(
    zh
      ? /\n?### 30 秒 P0 实施摘要[\s\S]*?(?=\n## 设计依据与资料清单)/
      : /\n?### 30-second P0 implementation summary[\s\S]*?(?=\n## Design Basis and Source Inventory)/,
    ''
  );
  source = source.replace(
    zh
      ? /\n?### v1\.3 P0-ALL-STOP-01：尺寸化、责任化、数量化[\s\S]*?(?=\n### 同一任务、逐组验收)/
      : /\n?### v1\.3 P0-ALL-STOP-01: dimensioned, accountable, quantified[\s\S]*?(?=\n### Same task, group-by-group acceptance)/,
    ''
  );
  source = source.replace(/iteration: "[^"]+"/, 'iteration: "v1.3-p0-feasibility"');
  source = replaceMarked(source, '<!-- V1.3_P0_SUMMARY_START -->', '<!-- V1.3_P0_SUMMARY_END -->', summaryBlock(lang), zh ? '## 设计依据与资料清单' : '## Design Basis and Source Inventory');
  source = replaceMarked(source, '<!-- V1.3_P0_IMPLEMENTATION_START -->', '<!-- V1.3_P0_IMPLEMENTATION_END -->', implementationBlock(lang), zh ? '### 同一任务、逐组验收' : '### Same task, group-by-group acceptance');
  source = source.replace(
    '[metric:p0_screening_envelope_area_sqm] [metric:p0_clear_route_width_m] [metric:p0_task_chain_count] [metric:p0_boq_line_count] [metric:p0_cost_component_count] [metric:p0_role_slot_count] [metric:p0_current_package_check_count] [metric:p0_current_package_pass_count] [metric:p0_current_package_hold_count] [metric:p0_field_check_hold_count]',
    '[metric:p0_role_slot_count] [metric:p0_current_package_check_count]'
  );
  source = source.replace(
    '[metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count] [metric:p0_malformed_input_hold_ratio]',
    `[metric:p0_task_chain_count] [metric:p0_gate_default_closed_ratio] [metric:p0_route_obstruction_count]\n\n${zh ? '错误输入测试必须保持 1/1 触发 HOLD；失败时不能用其他任务的平均结果覆盖。' : 'Malformed-input testing must remain 1/1 for triggering HOLD; failure cannot be averaged away by other task results.'} [metric:p0_malformed_input_hold_ratio]`
  );
  source = source.replace(
    '[metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte] [metric:p0_formal_total_cost]',
    `[metric:p0_cost_component_count] [metric:p0_market_price_total] [metric:p0_staffing_fte]\n\n${zh ? '正式总价保持 null，不能由概念数量反推成报价或资金承诺。' : 'The formal total remains null and cannot be inferred from concept quantities as a quotation or funding commitment.'} [metric:p0_formal_total_cost]`
  );
  source = source.replace(/^!\[[^\n]*\]\(assets\/figures\/pilot-protocol(?:\.en)?\.png\)\n+/m, '');
  source = source.replace(/v1\.0-v1\.2/g, 'v1.0-v1.3').replace(/v1\.0–v1\.2/g, 'v1.0–v1.3');
  source = source.replace(/^<!-- V1\.3_P0_(?:SUMMARY|IMPLEMENTATION)_(?:START|END) -->\n?/gm, '');
  write(rel, source);
}

function updateSpatial() {
  const file = readJson('spatial.json');
  const item = {
    id: 'p0-all-stop-01', type: 'node', title: 'P0-ALL-STOP-01 条件式全停门', title_en: 'P0-ALL-STOP-01 Conditional All-Stop Gate',
    summary: '非定位、可撤回的尺寸化首启单元；只用于 18 m x 12 m 概念筛查包络、责任、工程量、失败停止和恢复交接，不含坐标或授权。',
    summary_en: 'Unlocated, reversible, dimensioned launch unit for an 18 m x 12 m concept-screening envelope, accountability, quantities, failure stops, and restoration hand-off; no coordinates or authorization.',
    source: 'visual/assets/v13-implementation.json + proposal.md', public_level: 'provisional', linked_scenarios: ['ai-traffic-walkability'], order: 8,
    geometry: { mode: 'concept', label: 'Unlocated representative all-stop-gate screening relationship; NOT_AUTHORIZED and HOLD' }
  };
  const index = file.items.findIndex(i => i.id === item.id);
  if (index >= 0) file.items[index] = item; else file.items.push(item);
  file.summary = '表达一条概念慢线、三处可转移慢场、三座公共地标与一个非定位 P0 条件式全停门；P0 尺寸只作概念筛查和交接，不包含坐标、红线、权属、工程线位、授权或审定指标。';
  writeJson('spatial.json', file);
}

function updateMatrices() {
  const complianceV13 = 'v1.3 以 P0-ALL-STOP-01 同源登记 1:500/1:100/1:50/1:20、12 项任务、16 行 BOQ、8 类成本和两层验收；状态保持 NOT_AUTHORIZED/HOLD，现场与价格数据不补造。';
  const depthV13 = 'v1.3 增加稳定对象 P0-ALL-STOP-01 的尺寸、接口、责任、任务、数量、成本和两层验收闭环；complete 仅表示包内表达完整，不表示现场、许可、角色或价格已取得。';
  const compliance = readJson('compliance_matrix.json');
  const targetReqs = new Set(['1.5.2.3', '1.5.2.4', '1.5.3.required', '1.5.3.2', 'agent.3', 'agent.4', 'agent.6']);
  for (const req of compliance.requirements) {
    if (!targetReqs.has(req.requirement_id)) continue;
    for (const ref of ['assets/figures/key-areas.png', 'assets/figures/metrics-evidence.png', 'drawings/a3-booklet.pdf', 'drawings/a0-boards.pdf']) uniqPush(req.drawing_refs, ref);
    uniqPush(req.metric_refs, 'p0_task_chain_count');
    uniqPush(req.metric_refs, 'p0_boq_line_count');
    uniqPush(req.metric_refs, 'p0_current_package_hold_count');
    uniqPush(req.assumption_ids, 'A-P0-DIM-001');
    uniqPush(req.assumption_ids, 'A-P0-ROLE-001');
    uniqPush(req.assumption_ids, 'A-P0-FIELD-001');
    const baseSummary = (req.evidence_summary_zh || '').split(complianceV13).join('').replace(/\s{2,}/g, ' ').trim();
    req.evidence_summary_zh = `${baseSummary} ${complianceV13}`.trim();
  }
  writeJson('compliance_matrix.json', compliance);

  const depth = readJson('design_depth_matrix.json');
  const targetDepth = new Set(['traffic_rail_slow_parking', 'municipal_new_infrastructure', 'blue_green_public_space', 'three_key_area_detailed_design', 'renewal_project_list', 'phasing_implementation', 'metrics_recalculation', 'risk_missing_data']);
  for (const item of depth.items) {
    if (!targetDepth.has(item.item_id)) continue;
    for (const ref of ['assets/figures/key-areas.png', 'assets/figures/metrics-evidence.png', 'drawings/a3-booklet.pdf', 'drawings/a0-boards.pdf']) uniqPush(item.drawing_refs, ref);
    uniqPush(item.metric_refs, 'p0_screening_envelope_area_sqm');
    uniqPush(item.metric_refs, 'p0_clear_route_width_m');
    uniqPush(item.metric_refs, 'p0_task_chain_count');
    uniqPush(item.metric_refs, 'p0_boq_line_count');
    uniqPush(item.metric_refs, 'p0_field_check_hold_count');
    uniqPush(item.assumption_ids, 'A-P0-DIM-001');
    uniqPush(item.assumption_ids, 'A-P0-SITE-001');
    uniqPush(item.assumption_ids, 'A-P0-COST-001');
    const baseSummary = (item.evidence_summary_zh || '').split(depthV13).join('').replace(/\s{2,}/g, ' ').trim();
    item.evidence_summary_zh = `${baseSummary} ${depthV13}`.trim();
  }
  writeJson('design_depth_matrix.json', depth);
}

function updateAgentAndSources() {
  const agent = readJson('agent.json');
  agent.generated_with = agent.generated_with.replace('v1.0-v1.2', 'v1.0-v1.3');
  const v13Note = 'v1.3 added the source-controlled P0-ALL-STOP-01 dimension set, 12-task hand-off chain, non-priced quantities, parametric cost model, two-layer acceptance matrix, fixed review figures, first-screen summaries, and rebuilt bilingual PDFs while keeping roles, prices, authorization, and field data on HOLD.';
  const baseNote = agent.generation_note.split(v13Note).join('').replace(/\s{2,}/g, ' ').trim();
  agent.generation_note = baseNote.replace(/Human account owner authorization/, `${v13Note} Human account owner authorization`);
  writeJson('agent.json', agent);

  const sources = readJson('sources.json');
  const additions = [
    { id: 'TOOL-NAPI-RS-CANVAS', title: '@napi-rs/canvas', authority_level: 'presentation_only', source_type: 'software_tool', url: 'https://github.com/Brooooooklyn/canvas', accessed_at: '2026-08-30', rights: 'MIT; used locally for deterministic bilingual raster figure and board composition', allowed_uses: ['presentation rendering'], prohibited_uses: ['site fact', 'engineering evidence', 'field performance'] },
    { id: 'TOOL-PDF-LIB', title: 'pdf-lib', authority_level: 'presentation_only', source_type: 'software_tool', url: 'https://pdf-lib.js.org/', accessed_at: '2026-08-30', rights: 'MIT; used locally to assemble rasterized bilingual review pages into PDF', allowed_uses: ['PDF assembly'], prohibited_uses: ['site fact', 'engineering evidence', 'professional sign-off'] }
  ];
  for (const item of additions) {
    const index = sources.sources.findIndex(s => s.id === item.id);
    if (index >= 0) sources.sources[index] = item; else sources.sources.push(item);
  }
  writeJson('sources.json', sources);
}

function updateChangelogAndNarrative() {
  let changelog = read('changelog.md');
  const block = `<!-- V1.3_CHANGELOG_START -->\n## v1.3 - 2026-08-30\n\n- 在不改变“让城市跟上最慢的人 / THE SLOW LINE”概念的前提下，建立稳定对象 \`P0-ALL-STOP-01\`，状态保持 \`NOT_AUTHORIZED\`、\`HOLD\`、\`unassigned/conditional\` 与 \`null/TBC\`。\n- 新增同源 1:500 场地关系、1:100 平面、1:50 断面和 1:20 关键接口；12 项尺寸均注明概念假设、确认角色与触发条件，不冒充实测、法定最小值或专业签章。\n- 将 90 天研究窗与 G0—G5 展开为 12 项连续任务，分离执行、最终签放、立即叫停、人工接管、拆除恢复和独立证据复核。\n- 增加 16 行不计价 BOQ、8 组件参数化成本模型和敏感性变量；所有市场单价、货币、报价单位、总价、基准日与资金承诺继续为 null/TBC。\n- 建立两层验收：包内 8 项当前 6 PASS / 2 HOLD，现场 12 项全部 HOLD。审计 11/12 与 AI-off 等价 11/12 的不利读数继续阻断 G4。\n- 将尺寸、任务、Gate、BOQ、成本和验收折入固定 \`key-areas\` 与 \`metrics-evidence\` 中英图；在双语 HTML 首屏与四份 PDF 第一页加入 30 秒 P0 摘要。\n- A3 第 3/4 页改为同源原生重排：第 3 页专读任务、责任和 Gate，第 4 页专读 BOQ、成本和两层验收，消除重复整图并提升人工翻阅可读性。\n- 增加可重复构建源 \`visual/assets/v13-implementation.json\` 与脚本 \`visual/assets/build-v13.js\`，由同一数据源重建图件、正文证据、可视化与 PDF。\n<!-- V1.3_CHANGELOG_END -->`;
  changelog = replaceMarked(changelog, '<!-- V1.3_CHANGELOG_START -->', '<!-- V1.3_CHANGELOG_END -->', block, '## v1.2 - 2026-08-29');
  write('changelog.md', changelog);

  let narrative = read('report/narrative.md');
  narrative = narrative.replace('更新日期：2026-08-29', '更新日期：2026-08-30');
  const nblock = `<!-- V1.3_NARRATIVE_START -->\n## v1.3 P0 可实施性升级（2026-08-30）\n\n最新 96/100 复核中唯一未满分项为可实施性 4/5。本轮不增加概念、场景、Logo、人物或国际案例，只把原有非定位全停门升级为稳定对象 \`P0-ALL-STOP-01\`：12 项透明尺寸假设、四种比例关系、12 项任务、8 个未指派责任槽位、16 行不计价 BOQ、8 类参数化成本、8 项包内验收和 12 项现场验收。\n\n当前结果刻意不是“全绿”：包内路径、侵占、非 AI 覆盖、Gate 默认关闭、错误输入 HOLD 与退出流程等 6 项成立；审计完整度和 AI-off 人工等价仍为 11/12，因此 2 项 HOLD。现场轮椅/低视力任务、老人取得人工服务用时、真人响应、人流冲突、噪声、照明、排水、微气候、居民接受、排班与真实成本没有基线，12 项继续 HOLD。这个差异是本轮可实施性证据的核心，不以合成任务或虚构旅程替代现实表现。\n\n固定评审入口已改为 \`key-areas\` 的同源 P0 尺寸图与 \`metrics-evidence\` 的任务—数量—成本—验收图；视觉 HTML 首屏和 A0/A3 第一页均显示 30 秒摘要。所有派生成果由 \`visual/assets/v13-implementation.json\` 和 \`visual/assets/build-v13.js\` 重建，随后再由仓库报告渲染与四门自检收口。\n<!-- V1.3_NARRATIVE_END -->`;
  narrative = replaceMarked(narrative, '<!-- V1.3_NARRATIVE_START -->', '<!-- V1.3_NARRATIVE_END -->', nblock, '## 0. 成果阅读入口');
  narrative = narrative.replace(/v1\.2 评审修复 \| 当前 PR 待复评/g, 'v1.2 评审修复 | 已完成复核').replace(/v1\.2 的结果仍以绑定新 exact head 的复评为准。/g, 'v1.2 最新复核为 96/100；本轮只处理其中可实施性 4/5。');
  write('report/narrative.md', narrative);
}

function updateManifestEntries() {
  const manifest = readJson('manifest.json');
  manifest.generated_at = new Date().toISOString();
  manifest.validation_claim.self_checked = false;
  const entries = [
    { path: 'visual/assets/v13-implementation.json', role: 'evidence_data', required: false, language: 'neutral', sha256: null },
    { path: 'visual/assets/build-v13.js', role: 'verification_script', required: false, language: 'neutral', sha256: null }
  ];
  for (const item of entries) {
    const index = manifest.files.findIndex(f => f.path === item.path);
    if (index >= 0) manifest.files[index] = { ...manifest.files[index], ...item }; else manifest.files.push(item);
  }
  writeJson('manifest.json', manifest);
}

function updateVisualHtml(rel, lang) {
  const zh = lang === 'zh';
  let html = read(rel);
  const css = `<!-- V1.3_P0_CSS_START --><style>
    .hero{min-height:620px;height:auto!important;padding:48px 5vw!important;display:block!important;background:linear-gradient(135deg,#10283c 0%,#173a54 60%,#1f6d8f 100%)!important;}
    .hero-copy{max-width:1180px!important;margin:0 auto!important;}
    .p0-hero-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:14px;margin-top:26px;}
    .p0-hero-card{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.23);border-radius:14px;padding:18px;color:#fff;}
    .p0-hero-card h3{margin:0 0 9px;color:#f0be3e;font-size:18px;}
    .p0-hero-card p{margin:0;color:#f6f4ed;line-height:1.55;font-size:15px;}
    .p0-status{display:inline-flex;gap:9px;flex-wrap:wrap;margin-top:14px;}
    .p0-status b{padding:7px 10px;border-radius:8px;background:#ba3a35;color:#fff;font-size:13px;letter-spacing:.04em;}
    .p0-status b.neutral{background:#527f67;}
    @media(max-width:850px){.p0-hero-grid{grid-template-columns:1fr}.hero{min-height:0}}
  </style><!-- V1.3_P0_CSS_END -->`;
  html = replaceMarked(html, '<!-- V1.3_P0_CSS_START -->', '<!-- V1.3_P0_CSS_END -->', css, '</head>');
  const hero = `<header class="hero">
    <div class="hero-copy">
      <div class="eyebrow">${zh ? '京张慢线 · v1.3 P0 可实施性' : 'THE SLOW LINE · v1.3 P0 FEASIBILITY'}</div>
      <h1>${zh ? '让城市跟上最慢的人' : 'Keep pace with the slowest person'}</h1>
      <p class="lead">P0-ALL-STOP-01 · ${zh ? '尺寸可核验、责任可交接、失败可停止、退出可恢复' : 'dimensioned, accountable, stoppable, restorable'}</p>
      <div class="p0-status"><b>NOT_AUTHORIZED</b><b>HOLD</b><b class="neutral">unassigned/conditional</b><b class="neutral">prices null/TBC</b></div>
      <div class="p0-hero-grid">
        <div class="p0-hero-card"><h3>${zh ? '30 秒 P0 摘要' : '30-second P0 summary'}</h3><p>${zh ? '216 m² 非定位概念筛查包络；3.0 m 有效慢行净宽；12 项任务、16 行不计价 BOQ、8 类参数化成本。不是现场实测、选址、许可或工程签章。' : '216 m² unlocated concept envelope; 3.0 m effective clear route; 12 tasks, 16 non-priced BOQ lines, and 8 parametric cost components. Not field measurement, siting, permission, or engineering sign-off.'}</p></div>
        <div class="p0-hero-card"><h3>${zh ? '当前包内可判断' : 'Checkable now'}</h3><p><span data-metric="p0_current_package_pass_count" data-value="6">6 PASS</span> / <span data-metric="p0_current_package_hold_count" data-value="2">2 HOLD</span>${zh ? '。审计与 AI-off 等价仍为 11/12，因此不得请求 G4。' : '. Audit and AI-off equivalence remain 11/12, so G4 cannot be requested.'}</p></div>
        <div class="p0-hero-card"><h3>${zh ? '仍待现实条件' : 'External conditions still HOLD'}</h3><p><span data-metric="p0_field_check_hold_count" data-value="12">12/12 HOLD</span>${zh ? '：现场使用、真人响应、冲突、环境、居民接受、排班与真实成本。任一群体关键失败，整体 HOLD。' : ': field use, human response, conflicts, environment, residents, roster, and real cost. One group critical failure holds the whole unit.'}</p></div>
      </div>
    </div>
  </header>`;
  html = html.replace(/<header class="hero">[\s\S]*?<\/header>/, hero);
  html = html.replace(/v1\.2/g, 'v1.3').replace(/2026-08-29/g, '2026-08-30');
  const fixedSection = `<section class="alt" id="p0-fixed-evidence"><h2>${zh ? 'P0 固定评审证据' : 'P0 fixed review evidence'}</h2><p>${zh ? '同一数据源生成尺寸/接口图与任务/工程量/成本/验收图；关键信息不再只存在于独立试点附图。' : 'The same source generates the dimension/interface figure and the task/quantity/cost/acceptance figure; key evidence no longer lives only in a separate pilot appendix.'}</p><div class="grid2"><div class="card"><img src="../assets/figures/key-areas${zh ? '' : '.en'}.png" alt="P0 dimensioned launch unit"></div><div class="card"><img src="../assets/figures/metrics-evidence${zh ? '' : '.en'}.png" alt="P0 task quantities cost acceptance"></div></div></section>`;
  if (!html.includes('id="p0-fixed-evidence"')) html = html.replace('</header>', `</header>\n${fixedSection}`);
  write(rel, html);
}

async function imageFor(rel) {
  return loadImage(path.join(ROOT, rel));
}

function fitRect(img, x, y, w, h) {
  const scale = Math.min(w / img.width, h / img.height);
  const nw = img.width * scale, nh = img.height * scale;
  return { x: x + (w - nw) / 2, y: y + (h - nh) / 2, w: nw, h: nh };
}

function drawPdfHeader(ctx, lang, pageTitle, pageNo, format) {
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = C.navy;
  ctx.fillRect(0, 0, ctx.canvas.width, 180);
  text(ctx, lang === 'zh' ? '京张慢线 / THE SLOW LINE' : 'THE SLOW LINE', 80, 35, ctx.canvas.width * 0.56, 46, C.white, true, lang, 1, 1);
  text(ctx, pageTitle, 80, 96, ctx.canvas.width * 0.72, 30, C.yellow, true, lang, 1.1, 2);
  text(ctx, `${format} · v1.3 · ${String(pageNo).padStart(2, '0')}`, ctx.canvas.width - 520, 54, 430, 24, '#dce5e8', true, lang, 1, 1);
}

function drawThirtySecond(ctx, lang, x, y, w, h) {
  rounded(ctx, x, y, w, h, 18, C.navy);
  text(ctx, lang === 'zh' ? '30 秒 P0 实施摘要' : '30-SECOND P0 IMPLEMENTATION SUMMARY', x + 28, y + 22, w - 56, 30, C.yellow, true, lang, 1, 1);
  text(ctx, 'P0-ALL-STOP-01 · NOT_AUTHORIZED · HOLD', x + 28, y + 66, w - 56, 23, C.white, true, lang, 1, 1);
  text(ctx, lang === 'zh' ? '216 m² 概念包络｜3.0 m 净宽｜12 任务｜16 BOQ｜8 成本｜6 PASS / 2 HOLD｜现场 12/12 HOLD｜角色未指派｜价格 null/TBC' : '216 m² concept envelope | 3.0 m clear | 12 tasks | 16 BOQ | 8 costs | 6 PASS / 2 HOLD | field 12/12 HOLD | roles unassigned | prices null/TBC', x + 28, y + 105, w - 56, 22, C.white, false, lang, 1.3, 3);
  text(ctx, lang === 'zh' ? '任一群体安全关键失败、等价缺失或无法退出 => 整体 HOLD' : 'Any group safety-critical failure, missing equivalent, or failed exit => whole unit HOLD', x + 28, y + h - 48, w - 56, 19, '#f5d2ce', true, lang, 1.1, 2);
}

async function makePdfPage(lang, spec, width, height, pageNo, format) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  drawPdfHeader(ctx, lang, spec.title, pageNo, format);
  if (spec.summary) drawThirtySecond(ctx, lang, 70, 210, width - 140, 240);
  const top = spec.summary ? 485 : 215;
  if (spec.focus === 'tasks') {
    drawA3TaskFocus(ctx, 70, top, width - 140, height - top - 80, lang);
  } else if (spec.focus === 'delivery') {
    drawA3DeliveryFocus(ctx, 70, top, width - 140, height - top - 80, lang);
  } else if (spec.images.length === 1) {
    const img = await imageFor(spec.images[0]);
    const rect = fitRect(img, 70, top, width - 140, height - top - 80);
    rounded(ctx, rect.x - 8, rect.y - 8, rect.w + 16, rect.h + 16, 16, C.white, C.light, 2);
    ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
  } else {
    const gap = 34;
    const count = spec.images.length;
    const cols = count > 2 ? 2 : count;
    const rows = Math.ceil(count / cols);
    const cellW = (width - 140 - gap * (cols - 1)) / cols;
    const cellH = (height - top - 90 - gap * (rows - 1)) / rows;
    for (let i = 0; i < count; i++) {
      const img = await imageFor(spec.images[i]);
      const col = i % cols, row = Math.floor(i / cols);
      const rect = fitRect(img, 70 + col * (cellW + gap), top + row * (cellH + gap), cellW, cellH);
      rounded(ctx, rect.x - 7, rect.y - 7, rect.w + 14, rect.h + 14, 14, C.white, C.light, 2);
      ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
    }
  }
  text(ctx, lang === 'zh' ? '概念建议 · 非定位 · 非工程图 · 未授权 · 现实条件按 TBC/HOLD 管理' : 'Concept proposal · unlocated · not engineering · not authorized · real conditions managed as TBC/HOLD', 70, height - 48, width - 140, 16, C.grey, false, lang, 1, 1);
  return canvas.encode('png');
}

async function buildPdf(lang, format) {
  const zh = lang === 'zh';
  const isA0 = format === 'A0';
  const width = isA0 ? 3370 : 1684;
  const height = isA0 ? 2384 : 1191;
  const specs = isA0 ? [
    { title: zh ? 'P0-ALL-STOP-01｜尺寸化首启单元' : 'P0-ALL-STOP-01 | DIMENSIONED LAUNCH UNIT', summary: true, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? '任务链、工程量、成本与验收' : 'TASKS, QUANTITIES, COST + ACCEPTANCE', summary: false, images: [`assets/figures/metrics-evidence${zh ? '' : '.en'}.png`] },
    { title: zh ? '总体空间、场地校准与慢行系统' : 'OVERALL SPACE, SITE GROUNDING + SLOW MOBILITY', summary: false, images: [`assets/figures/site-grounding${zh ? '' : '.en'}.png`, `assets/figures/site-overview${zh ? '' : '.en'}.png`, `assets/figures/land-use-structure${zh ? '' : '.en'}.png`, `assets/figures/mobility-bluegreen${zh ? '' : '.en'}.png`] }
  ] : [
    { title: zh ? 'P0-ALL-STOP-01｜30 秒实施摘要' : 'P0-ALL-STOP-01 | 30-SECOND IMPLEMENTATION SUMMARY', summary: true, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? 'P0 尺寸、断面与接口' : 'P0 DIMENSIONS, SECTION + INTERFACE', summary: false, images: [`assets/figures/key-areas${zh ? '' : '.en'}.png`] },
    { title: zh ? '任务、责任与六道证据门' : 'TASKS, ACCOUNTABILITY + SIX GATES', summary: false, focus: 'tasks', images: [] },
    { title: zh ? '不计价工程量、成本与两层验收' : 'NON-PRICED QUANTITIES, COST + TWO-LAYER ACCEPTANCE', summary: false, focus: 'delivery', images: [] },
    { title: zh ? '场地校准｜方位、事实、叠加分开' : 'SITE GROUNDING | ORIENTATION, FACT, OVERLAY SEPARATED', summary: false, images: [`assets/figures/site-grounding${zh ? '' : '.en'}.png`] },
    { title: zh ? '一线三慢场六全停门' : 'ONE LINE, THREE YARDS, SIX ALL-STOP GATES', summary: false, images: [`assets/figures/site-overview${zh ? '' : '.en'}.png`, `assets/figures/land-use-structure${zh ? '' : '.en'}.png`] },
    { title: zh ? '慢行、蓝绿与公共服务底线' : 'SLOW MOBILITY, BLUE-GREEN + PUBLIC-SERVICE FLOORS', summary: false, images: [`assets/figures/mobility-bluegreen${zh ? '' : '.en'}.png`] },
    { title: zh ? '离线演练｜失败继续可见' : 'OFFLINE REHEARSAL | FAILURES REMAIN VISIBLE', summary: false, images: [`assets/figures/simulation-rehearsal${zh ? '' : '.en'}.png`, `assets/figures/pilot-protocol${zh ? '' : '.en'}.png`] }
  ];
  const pdf = await PDFDocument.create();
  pdf.setTitle(zh ? '京张慢线 v1.3 P0 可实施性' : 'The Slow Line v1.3 P0 Feasibility');
  pdf.setAuthor('Restless-One with Codex');
  pdf.setSubject('P0-ALL-STOP-01 conditional implementation evidence');
  pdf.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)');
  pdf.setProducer('pdf-lib (https://github.com/Hopding/pdf-lib)');
  const fixedPdfDate = new Date('2026-08-30T00:00:00Z');
  pdf.setCreationDate(fixedPdfDate);
  pdf.setModificationDate(fixedPdfDate);
  for (let i = 0; i < specs.length; i++) {
    const png = await makePdfPage(lang, specs[i], width, height, i + 1, format);
    const embedded = await pdf.embedPng(png);
    const pageWidth = isA0 ? 3370.39 : 1190.55;
    const pageHeight = isA0 ? 2383.94 : 841.89;
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawImage(embedded, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  }
  const name = isA0 ? 'a0-boards' : 'a3-booklet';
  const out = path.join(DRAWINGS, `${name}${zh ? '' : '.en'}.pdf`);
  fs.writeFileSync(out, await pdf.save({ useObjectStreams: false }));
}

async function main() {
  updateAssumptions();
  updateMetrics();
  updateProposal('proposal.md', 'zh');
  updateProposal('proposal.en.md', 'en');
  updateSpatial();
  updateMatrices();
  updateAgentAndSources();
  updateChangelogAndNarrative();
  await buildKeyFigure('zh');
  await buildKeyFigure('en');
  await buildMetricsFigure('zh');
  await buildMetricsFigure('en');
  updateVisualHtml('visual/index.html', 'zh');
  updateVisualHtml('visual/index.en.html', 'en');
  await buildPdf('zh', 'A0');
  await buildPdf('en', 'A0');
  await buildPdf('zh', 'A3');
  await buildPdf('en', 'A3');
  updateManifestEntries();
  process.stdout.write(JSON.stringify({ ok: true, version: DATA.package_version, object_id: DATA.object_id, outputs: ['key-areas zh/en', 'metrics-evidence zh/en', 'visual index zh/en', 'A0 zh/en', 'A3 zh/en'] }, null, 2) + '\n');
}

main().catch(error => {
  console.error(error.stack || String(error));
  process.exit(1);
});
