#!/usr/bin/env node
/*
 * verify-network.js — 独立复算慢行网连通性结论
 *
 * 为什么有这个文件:本方案最核心的一条结论(低速机器人法定路权网络碎裂成 62 个
 * 互不相连的分量、五家适老机构网络可达数为 0、最短三处空隙合计 56 米)是算出来的,
 * 不是看出来的。声称"可复算"而评审无法复算,等于没说。本脚本只依赖 Node 标准库,
 * 只读包内 geometry/,把该结论从头再算一遍并与 metrics.json 逐项比对。
 *
 * 它是对 analysis_network.py(Python + shapely + pyproj)的独立重实现。
 * 两套实现互不共享代码,只共享输入数据与方法说明,因此比对结果同时是一次交叉验证。
 *
 * 用法(在提交包根目录):  node visual/assets/verify-network.js
 * 退出码:0 = 全部落在容差内;1 = 有项目超出容差。
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PKG = path.resolve(__dirname, '..', '..');
const SNAP = 8.0;          // 端点吸附容差(米),与 Python 实现一致
const SPEED_KMH = 15.0;    // 《北京市无人配送车道路测试与商业示范管理办法(试行)》上限

// ---------------------------------------------------------------------------
// EPSG:4326 -> EPSG:4548 (CGCS2000 / 3-degree Gauss-Kruger CM 117E)
// 横轴墨卡托正解,GRS80 椭球,中央经线 117°,比例因子 1,假东 500000,假北 0。
// 公式取自 Snyder, Map Projections — A Working Manual (USGS PP1395), §8。
// ---------------------------------------------------------------------------
const A = 6378137.0;
const F = 1 / 298.257222101;
const E2 = 2 * F - F * F;
const EP2 = E2 / (1 - E2);
const K0 = 1.0;
const FE = 500000.0;
const LON0 = (117.0 * Math.PI) / 180.0;

function project(lon, lat) {
  const phi = (lat * Math.PI) / 180;
  const lam = (lon * Math.PI) / 180;
  const sp = Math.sin(phi);
  const cp = Math.cos(phi);
  const tp = Math.tan(phi);

  const N = A / Math.sqrt(1 - E2 * sp * sp);
  const T = tp * tp;
  const C = EP2 * cp * cp;
  const Aa = (lam - LON0) * cp;

  const M =
    A *
    ((1 - E2 / 4 - (3 * E2 * E2) / 64 - (5 * E2 * E2 * E2) / 256) * phi -
      ((3 * E2) / 8 + (3 * E2 * E2) / 32 + (45 * E2 * E2 * E2) / 1024) * Math.sin(2 * phi) +
      ((15 * E2 * E2) / 256 + (45 * E2 * E2 * E2) / 1024) * Math.sin(4 * phi) -
      ((35 * E2 * E2 * E2) / 3072) * Math.sin(6 * phi));

  const A2 = Aa * Aa;
  const x =
    FE +
    K0 * N * (Aa + ((1 - T + C) * A2 * Aa) / 6 +
      ((5 - 18 * T + T * T + 72 * C - 58 * EP2) * A2 * A2 * Aa) / 120);
  const y =
    K0 *
    (M + N * tp * (A2 / 2 + ((5 - T + 9 * C + 4 * C * C) * A2 * A2) / 24 +
      ((61 - 58 * T + T * T + 600 * C - 330 * EP2) * A2 * A2 * A2) / 720));
  return [x, y];
}

// ---------------------------------------------------------------------------
// 读图层
// ---------------------------------------------------------------------------
function load(name) {
  return JSON.parse(fs.readFileSync(path.join(PKG, 'geometry', name), 'utf8'));
}

// 与 Python 的 real_features 一致:按 layer 过滤,并排除 agent_generated_design
function lines(fc, layer) {
  const out = [];
  for (const f of fc.features) {
    const p = f.properties || {};
    if (p.layer !== layer) continue;
    if (p.source_type === 'agent_generated_design') continue;
    const g = f.geometry;
    const parts = g.type === 'LineString' ? [g.coordinates]
      : g.type === 'MultiLineString' ? g.coordinates : [];
    for (const c of parts) {
      if (c.length >= 2) out.push(c.map(([lo, la]) => project(lo, la)));
    }
  }
  return out;
}

function points(fc, layer) {
  const out = [];
  for (const f of fc.features) {
    const p = f.properties || {};
    if (p.layer !== layer) continue;
    if (p.source_type === 'agent_generated_design') continue;
    const g = f.geometry;
    if (g.type === 'Point') out.push({ name: p.name_zh || p.id, xy: project(g.coordinates[0], g.coordinates[1]) });
  }
  return out;
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function polyLength(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]);
  return L;
}

// ---------------------------------------------------------------------------
// 打断:把所有线在两两交点处切开(planarize)
// 只连首尾端点会把一张网误判成一堆碎片,这是必须做的一步。
// ---------------------------------------------------------------------------
function segIntersect(p1, p2, p3, p4) {
  const d1x = p2[0] - p1[0], d1y = p2[1] - p1[1];
  const d2x = p4[0] - p3[0], d2y = p4[1] - p3[1];
  const den = d1x * d2y - d1y * d2x;
  if (Math.abs(den) < 1e-12) return null;          // 平行/共线不处理
  const t = ((p3[0] - p1[0]) * d2y - (p3[1] - p1[1]) * d2x) / den;
  const u = ((p3[0] - p1[0]) * d1y - (p3[1] - p1[1]) * d1x) / den;
  if (t < -1e-9 || t > 1 + 1e-9 || u < -1e-9 || u > 1 + 1e-9) return null;
  return t;
}

function bbox(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  return [x0, y0, x1, y1];
}
const bboxHit = (a, b, pad) =>
  a[0] - pad <= b[2] && b[0] - pad <= a[2] && a[1] - pad <= b[3] && b[1] - pad <= a[3];

const TOUCH_EPS = 0.5;   // 顶点重合判定容差(米)

function planarize(polys) {
  const boxes = polys.map(bbox);
  const cuts = polys.map((p) => p.map(() => []));   // 每段上的切分参数

  // (1) 真实交叉:两段在内部相交
  for (let i = 0; i < polys.length; i++) {
    for (let j = i + 1; j < polys.length; j++) {
      if (!bboxHit(boxes[i], boxes[j], 1)) continue;
      const P = polys[i], Q = polys[j];
      for (let a = 1; a < P.length; a++) {
        for (let b = 1; b < Q.length; b++) {
          const t = segIntersect(P[a - 1], P[a], Q[b - 1], Q[b]);
          if (t === null) continue;
          const u = segIntersect(Q[b - 1], Q[b], P[a - 1], P[a]);
          if (u === null) continue;
          if (t > 1e-9 && t < 1 - 1e-9) cuts[i][a].push(t);
          if (u > 1e-9 && u < 1 - 1e-9) cuts[j][b].push(u);
        }
      }
    }
  }

  // (2) 顶点相接:两条线在顶点处相碰,不产生"段内交点"。
  // 丁字口(他线端点落在本线内部顶点)和共顶点都属于这一类。
  // 漏掉它就会把连通的网判成一堆碎片——这是本脚本第一版的方法错误。
  const CELL = 4.0;
  const vGrid = new Map();
  polys.forEach((P, i) => {
    for (const [x, y] of P) {
      const k = `${Math.floor(x / CELL)}|${Math.floor(y / CELL)}`;
      if (!vGrid.has(k)) vGrid.set(k, []);
      vGrid.get(k).push([x, y, i]);
    }
  });
  const touchesOther = (x, y, self) => {
    const gx = Math.floor(x / CELL), gy = Math.floor(y / CELL);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = vGrid.get(`${gx + dx}|${gy + dy}`);
        if (!arr) continue;
        for (const [ex, ey, owner] of arr) {
          if (owner === self) continue;
          if (Math.hypot(ex - x, ey - y) <= TOUCH_EPS) return true;
        }
      }
    }
    return false;
  };
  const vertexSplit = polys.map((P, i) => {
    const s = new Set();
    for (let a = 1; a < P.length - 1; a++) {
      if (touchesOther(P[a][0], P[a][1], i)) s.add(a);
    }
    return s;
  });

  const pieces = [];
  for (let i = 0; i < polys.length; i++) {
    const P = polys[i];
    let cur = [P[0]];
    for (let a = 1; a < P.length; a++) {
      const ts = cuts[i][a].slice().sort((x, y) => x - y);
      for (const t of ts) {
        const pt = [P[a - 1][0] + t * (P[a][0] - P[a - 1][0]),
                    P[a - 1][1] + t * (P[a][1] - P[a - 1][1])];
        cur.push(pt);
        if (cur.length >= 2) pieces.push(cur);
        cur = [pt];
      }
      cur.push(P[a]);
      // 在与他线端点重合的内部顶点处断开
      if (a < P.length - 1 && vertexSplit[i].has(a)) {
        if (cur.length >= 2) pieces.push(cur);
        cur = [P[a]];
      }
    }
    if (cur.length >= 2) pieces.push(cur);
  }
  return pieces;
}

// ---------------------------------------------------------------------------
// 建图:端点按 SNAP 吸附成节点,并查集求连通分量
// ---------------------------------------------------------------------------
function buildGraph(pieces, snap) {
  const nodes = [];
  const grid = new Map();
  const key = (x, y) => `${Math.floor(x / snap)}|${Math.floor(y / snap)}`;
  function nodeAt(x, y) {
    const gx = Math.floor(x / snap), gy = Math.floor(y / snap);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const arr = grid.get(`${gx + dx}|${gy + dy}`);
        if (!arr) continue;
        for (const idx of arr) if (dist(nodes[idx], [x, y]) <= snap) return idx;
      }
    }
    const idx = nodes.length;
    nodes.push([x, y]);
    const k = key(x, y);
    if (!grid.has(k)) grid.set(k, []);
    grid.get(k).push(idx);
    return idx;
  }

  const edges = [];
  for (const p of pieces) {
    const a = nodeAt(p[0][0], p[0][1]);
    const b = nodeAt(p[p.length - 1][0], p[p.length - 1][1]);
    if (a !== b) edges.push([a, b, polyLength(p)]);
  }

  const parent = nodes.map((_, i) => i);
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const uni = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; };
  for (const [a, b] of edges) uni(a, b);

  const comps = new Map();
  nodes.forEach((_, i) => {
    const r = find(i);
    if (!comps.has(r)) comps.set(r, { nodes: [], length: 0 });
    comps.get(r).nodes.push(i);
  });
  for (const [a, , w] of edges) comps.get(find(a)).length += w;

  const list = [...comps.values()].sort((x, y) => y.nodes.length - x.nodes.length);
  return { nodes, edges, comps: list };
}

function dijkstra(nodes, edges, src) {
  const adj = nodes.map(() => []);
  for (const [a, b, w] of edges) { adj[a].push([b, w]); adj[b].push([a, w]); }
  const d = new Float64Array(nodes.length).fill(Infinity);
  d[src] = 0;
  const seen = new Uint8Array(nodes.length);
  const pq = [[0, src]];
  while (pq.length) {
    pq.sort((x, y) => x[0] - y[0]);
    const [du, u] = pq.shift();
    if (seen[u]) continue;
    seen[u] = 1;
    for (const [v, w] of adj[u]) {
      if (du + w < d[v]) { d[v] = du + w; pq.push([d[v], v]); }
    }
  }
  return d;
}

// ---------------------------------------------------------------------------
function main() {
  const roads = load('roads.geojson');
  const green = load('green_space.geojson');
  const publicSp = load('public_space.geojson');

  const cycle = lines(roads, 'ROAD_CENTERLINE');
  const river = lines(green, 'EXISTING_WATER');
  const elderly = points(publicSp, 'SCENARIO_NODE');

  const totalLen = cycle.reduce((s, p) => s + polyLength(p), 0);
  const pieces = planarize(cycle);
  const { nodes, edges, comps } = buildGraph(pieces, SNAP);

  const big = comps[0];
  const bigShare = big.nodes.length / nodes.length;

  // 候选驿站:最大分量中最贴近河道的节点
  const riverPts = river.flat();
  let depot = null, depotD = Infinity;
  for (const n of big.nodes) {
    for (const rp of riverPts) {
      const dd = dist(nodes[n], rp);
      if (dd < depotD) { depotD = dd; depot = n; }
    }
  }
  const dd = dijkstra(nodes, edges, depot);
  const compOf = new Map();
  comps.forEach((c, i) => c.nodes.forEach((n) => compOf.set(n, i)));

  let reachable = 0;
  const elderlyRows = [];
  for (const e of elderly) {
    let best = null, bd = Infinity;
    for (let i = 0; i < nodes.length; i++) {
      const t = dist(nodes[i], e.xy);
      if (t < bd) { bd = t; best = i; }
    }
    const sameComp = compOf.get(best) === 0;
    const net = sameComp ? dd[best] : Infinity;
    const ok = sameComp && Number.isFinite(net) && bd <= 100;
    if (ok) reachable++;
    elderlyRows.push({ name: e.name, straight: bd, net, sameComp });
  }

  // 关键缺口:其余分量到最大分量的最短空隙
  const gaps = [];
  for (let ci = 1; ci < Math.min(comps.length, 9); ci++) {
    let bd = Infinity;
    for (const n of comps[ci].nodes) {
      for (const m of big.nodes) {
        const t = dist(nodes[n], nodes[m]);
        if (t < bd) bd = t;
      }
    }
    gaps.push({ ci, d: bd, len: comps[ci].length });
  }
  gaps.sort((a, b) => a.d - b.d);
  const top3 = gaps.slice(0, 3);
  const gapSum = top3.reduce((s, g) => s + g.d, 0);
  const unlocked = top3.reduce((s, g) => s + g.len, 0);

  // ------------------------------------------------------------------
  const M = JSON.parse(fs.readFileSync(path.join(PKG, 'metrics.json'), 'utf8')).metrics;
  const claim = (k) => (M[k] ? M[k].value : null);

  // 容差取紧:两套实现本应逐项吻合。留 0.5% 只是给投影级数展开与浮点求和的余量,
  // 计数类一律要求完全相等。放松容差等于让这份复算失去意义。
  const checks = [
    ['cycleway_total_length_m', totalLen, claim('cycleway_total_length_m'), 0.005, 'm'],
    ['cycleway_segments_total', cycle.length, claim('cycleway_segments_total'), 0.0, 'count'],
    ['cycleway_network_connected_components', comps.length, claim('cycleway_network_connected_components'), 0.0, 'count'],
    ['cycleway_largest_component_length_m', big.length, claim('cycleway_largest_component_length_m'), 0.005, 'm'],
    ['cycleway_largest_component_share', bigShare, claim('cycleway_largest_component_share'), 0.01, 'ratio'],
    ['elderly_facilities_network_reachable', reachable, claim('elderly_facilities_network_reachable'), 0.0, 'count'],
    ['gap_closure_length_m', gapSum, claim('gap_closure_length_m'), 0.01, 'm'],
    ['gap_closure_unlocked_network_m', unlocked, claim('gap_closure_unlocked_network_m'), 0.005, 'm'],
  ];

  console.log('MoonTrack — 慢行网连通性结论独立复算');
  console.log('MoonTrack — independent recomputation of the cycleway connectivity findings\n');
  console.log('输入 / input : geometry/roads.geojson, green_space.geojson, public_space.geojson');
  console.log(`方法 / method: EPSG:4548 → node at crossings → snap endpoints ${SNAP} m → union-find + Dijkstra`);
  console.log('实现 / impl  : Node standard library only; independent of analysis_network.py (shapely/pyproj)\n');
  console.log(`  noded pieces ${pieces.length} · graph nodes ${nodes.length} · edges ${edges.length}\n`);

  const pad = (s, n) => String(s).padEnd(n);
  const num = (v) => (typeof v === 'number' ? (Math.abs(v) < 1 ? v.toFixed(4) : v.toFixed(1)) : String(v));
  console.log(pad('metric', 44) + pad('recomputed', 14) + pad('metrics.json', 14) + 'verdict');
  console.log('-'.repeat(84));
  let bad = 0;
  for (const [name, got, want, tol, unit] of checks) {
    if (want === null) { console.log(pad(name, 44) + pad(num(got), 14) + pad('(未声明)', 14) + '跳过'); continue; }
    const denom = Math.abs(want) > 1e-9 ? Math.abs(want) : 1;
    const rel = Math.abs(got - want) / denom;
    const ok = rel <= tol + 1e-12;
    if (!ok) bad++;
    console.log(pad(name, 44) + pad(num(got), 14) + pad(num(want), 14) +
      (ok ? `match  (${(rel * 100).toFixed(2)}% ≤ ${(tol * 100).toFixed(1)}%)`
          : `★MISMATCH (${(rel * 100).toFixed(2)}% > ${(tol * 100).toFixed(1)}%)`));
  }

  console.log('\n五家适老机构沿法定路权的可达性 / elderly-care facilities over legal right-of-way:');
  for (const r of elderlyRows) {
    const net = r.sameComp && Number.isFinite(r.net) ? `${r.net.toFixed(0)} m` : '不在同一连通分量';
    console.log(`  ${pad(r.name || '(无名)', 28)}直线 ${r.straight.toFixed(0).padStart(5)} m   网络 ${net}`);
  }
  console.log(`  网络可达数 = ${reachable} / ${elderly.length}`);

  console.log('\n最短三处空隙 / the three shortest gaps:');
  for (const g of top3) {
    console.log(`  ${g.d.toFixed(0).padStart(5)} m  →  并入 ${(g.len / 1000).toFixed(2)} km`);
  }
  console.log(`  合计补建 ${gapSum.toFixed(0)} m，主网 ${(big.length / 1000).toFixed(2)} km → ${((big.length + unlocked) / 1000).toFixed(2)} km`);

  console.log(`\n说明:计数类要求完全相等,长度类留 0.5% 给投影级数展开与浮点求和。`);
  console.log(`这些数对吸附容差(${SNAP} m)与打断实现是敏感的——见 assumptions.json 的`);
  console.log(`A-NET-001 / A-NET-002。本脚本复现的是同一方法下的同一结论,不是方法无关的真值。`);
  console.log(`换一个吸附容差会得到另一组数字,这一点方案正文已写明。`);
  console.log(bad === 0
    ? '\n结果:全部落在容差内。 / Result: every check within tolerance.'
    : `\n结果:${bad} 项超出容差。 / Result: ${bad} check(s) out of tolerance.`);
  process.exit(bad === 0 ? 0 : 1);
}

main();
