(function () {
  "use strict";

  const dataNode = document.getElementById("patch-ui-data");
  if (!dataNode) return;

  let data;
  try {
    data = JSON.parse(dataNode.textContent);
  } catch (error) {
    document.documentElement.classList.add("data-error");
    return;
  }

  const lang = document.body.dataset.lang === "en" ? "en" : "zh";
  const copy = {
    zh: {
      canvas: {
        eyebrow: "无地理坐标关系剖面 · 仅作概念比较",
        station: "大钟寺站界面",
        street: "城市街道",
        barrier: "交通与界面阻隔命题",
        baseline: "京张公共基线",
        unknown: "现场证据缺口",
        noRoute: "非现状路线",
        context: "开放资料上下文 / 待现场核验",
        notScale: "NOT TO SCALE · NO ALIGNMENT",
        modeBaseline: "BASELINE / 只登记关系与未知",
        modeA: "A / 运行先行概念",
        modeB: "B / 地面缝合概念",
        modeC: "C / 结构类型仅作预留",
        staffed: "人工协助",
        wayfinding: "固定导视",
        signal: "时段 / 信号",
        accessible: "连续无障碍链条",
        openEdge: "界面开放",
        rest: "遮荫与停留",
        structure: "跨越 / 下穿类型",
        blocked: "前置资料缺失 · 当前退出",
        relationship: "站 → 街 → 公共基线"
      },
      aria: {
        baseline: "无地理坐标的关系剖面。站点与京张公共基线之间存在待核交通和界面阻隔，路线在现场证据缺口处停止。",
        A: "无地理坐标的关系剖面。方案 A 以人工协助、固定导视和时段或信号试验作为可逆概念动作，仍被证据门锁定。",
        B: "无地理坐标的关系剖面。方案 B 概念性表达连续无障碍链条、地面过街、界面开放和休息节点，仍被证据门锁定。",
        C: "无地理坐标的关系剖面。方案 C 只保留跨越或下穿类型，不绘制线位；因强制工程资料缺失而退出当前清单。"
      },
      normalized: "归一化：100%（输入合计 {sum}）",
      equalFallback: "全部权重为零，计算暂用等权；资料锁仍有效。",
      sensitivityOverlap: "当前权重下，{top}的假设中点最高（{score}%），但与{second}区间重叠。偏好不稳定，且不是推荐。",
      sensitivitySeparated: "当前权重下，{top}的类型假设中点最高（{score}%）；资料锁仍禁止选择，改变权重可能改变偏好。",
      sensitivityDetail: "色带仅编码概念类型先验，不是现场绩效、成本或安全预测。C 因强制前置资料缺失退出当前清单。",
      bandAria: "{name}的概念假设加权区间为 {low} 到 {high} 分；{gate}；不是现场绩效预测。"
    },
    en: {
      canvas: {
        eyebrow: "NON-GEOREFERENCED RELATIONAL SECTION · CONCEPT COMPARISON ONLY",
        station: "Dazhongsi station interface",
        street: "City street",
        barrier: "Traffic and edge-barrier question",
        baseline: "Jingzhang public baseline",
        unknown: "Field-evidence gap",
        noRoute: "Not an existing route",
        context: "Open-data context / field verification pending",
        notScale: "NOT TO SCALE · NO ALIGNMENT",
        modeBaseline: "BASELINE / RELATIONS AND UNKNOWNS ONLY",
        modeA: "A / OPERATIONS-FIRST CONCEPT",
        modeB: "B / AT-GRADE REWEAVE CONCEPT",
        modeC: "C / STRUCTURAL CLASS HELD IN RESERVE",
        staffed: "Staffed help",
        wayfinding: "Fixed wayfinding",
        signal: "Time / signal",
        accessible: "Continuous accessible chain",
        openEdge: "Opened interface",
        rest: "Shade and rest",
        structure: "Overpass / underpass class",
        blocked: "Prerequisites missing · gated out",
        relationship: "Station → street → public baseline"
      },
      aria: {
        baseline: "Non-georeferenced relational section. An unverified traffic and edge barrier lies between the station and Jingzhang public baseline; the route stops at a field-evidence gap.",
        A: "Non-georeferenced relational section. Option A uses staffed help, fixed wayfinding and a time or signal trial as reversible concept moves, and remains evidence-locked.",
        B: "Non-georeferenced relational section. Option B conceptually shows a complete accessible chain, at-grade crossing, opened interface and rest point, and remains evidence-locked.",
        C: "Non-georeferenced relational section. Option C retains an overpass or underpass class without an alignment and is gated out because mandatory engineering evidence is missing."
      },
      normalized: "Normalized: 100% (input total {sum})",
      equalFallback: "All weights are zero, so the display temporarily uses equal weights; the evidence lock remains active.",
      sensitivityOverlap: "Under the current weights, {top} has the highest hypothesis midpoint ({score}%), but its band overlaps {second}. The preference is unstable and is not a recommendation.",
      sensitivitySeparated: "Under the current weights, {top} has the highest type-hypothesis midpoint ({score}%); the evidence lock still prohibits selection, and other weights may change the preference.",
      sensitivityDetail: "Bands encode conceptual type priors only, not site performance, cost or safety forecasts. C is gated out because mandatory prerequisites are missing.",
      bandAria: "The conceptual weighted hypothesis band for {name} is {low} to {high}; {gate}; not a site-performance forecast."
    }
  }[lang];

  const state = { mode: "baseline" };
  const canvas = document.getElementById("patchCanvas");
  const canvasStage = document.getElementById("canvasStage");
  const context = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  const modeTabs = Array.from(document.querySelectorAll(".mode-tab"));
  const modePanel = document.getElementById("mode-panel");
  const modeTitle = document.getElementById("modeTitle");
  const modeDescription = document.getElementById("modeDescription");
  const modeGate = document.getElementById("modeGate");
  const weightInputs = Array.from(document.querySelectorAll('#weightForm input[type="range"]'));
  const normalizedTotal = document.getElementById("normalizedTotal");
  const sensitivityHeadline = document.getElementById("sensitivityHeadline");
  const sensitivityDetail = document.getElementById("sensitivityDetail");
  const resetWeights = document.getElementById("resetWeights");

  function format(template, values) {
    return Object.keys(values).reduce(
      (result, key) => result.replaceAll("{" + key + "}", String(values[key])),
      template
    );
  }

  function setCanvasFont(ctx, size, weight, mono) {
    const family = mono
      ? 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
      : lang === "zh"
        ? '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
        : '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.font = `${weight} ${size}px ${family}`;
  }

  function fitText(ctx, text, x, y, maxWidth, fontSize, weight, color, align) {
    let size = fontSize;
    setCanvasFont(ctx, size, weight, false);
    while (size > 10 && ctx.measureText(text).width > maxWidth) {
      size -= 1;
      setCanvasFont(ctx, size, weight, false);
    }
    ctx.fillStyle = color;
    ctx.textAlign = align || "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y, maxWidth);
  }

  function line(ctx, points, color, width, dash) {
    ctx.beginPath();
    ctx.setLineDash(dash || []);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point[0], point[1]);
      else ctx.lineTo(point[0], point[1]);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function node(ctx, x, y, radius, color, inner) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = inner || "#1c211d";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function hatch(ctx, x, y, width, height, color) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.38;
    ctx.lineWidth = 1;
    for (let offset = -height; offset < width + height; offset += 14) {
      ctx.beginPath();
      ctx.moveTo(x + offset, y + height);
      ctx.lineTo(x + offset + height, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawArrow(ctx, fromX, fromY, toX, toY, color, width, dashed) {
    line(ctx, [[fromX, fromY], [toX, toY]], color, width, dashed ? [9, 8] : []);
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const size = 10 + width;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - Math.cos(angle - 0.55) * size, toY - Math.sin(angle - 0.55) * size);
    ctx.lineTo(toX - Math.cos(angle + 0.55) * size, toY - Math.sin(angle + 0.55) * size);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawCanvas() {
    if (!context || !canvasStage) return;

    const bounds = canvasStage.getBoundingClientRect();
    const width = Math.max(320, Math.round(bounds.width));
    const height = Math.max(380, Math.round(bounds.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const sx = (value) => (value / 1000) * width;
    const sy = (value) => (value / 560) * height;
    const compact = width < 620;
    const labelSize = compact ? 11 : 13;
    const smallSize = compact ? 9 : 11;

    context.fillStyle = "#1c211d";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(196, 204, 197, 0.12)";
    context.lineWidth = 1;
    for (let x = 40; x < 1000; x += 60) {
      context.beginPath();
      context.moveTo(sx(x), 0);
      context.lineTo(sx(x), height);
      context.stroke();
    }
    for (let y = 70; y < 560; y += 58) {
      context.beginPath();
      context.moveTo(0, sy(y));
      context.lineTo(width, sy(y));
      context.stroke();
    }

    fitText(context, copy.canvas.eyebrow, sx(38), sy(34), sx(640), smallSize, 700, "#9aa19b", "left");
    fitText(context, copy.canvas.notScale, sx(962), sy(34), sx(280), smallSize, 700, "#ef8f7e", "right");

    context.fillStyle = "#2b302b";
    context.fillRect(sx(45), sy(90), sx(210), sy(338));
    context.fillRect(sx(270), sy(90), sx(160), sy(338));
    context.fillRect(sx(735), sy(90), sx(220), sy(338));
    context.strokeStyle = "#596059";
    context.lineWidth = 1;
    context.strokeRect(sx(45), sy(90), sx(210), sy(338));
    context.strokeRect(sx(270), sy(90), sx(160), sy(338));
    context.strokeRect(sx(735), sy(90), sx(220), sy(338));

    context.fillStyle = "rgba(73, 106, 88, 0.42)";
    context.fillRect(sx(790), sy(70), sx(112), sy(392));
    context.strokeStyle = "#79a28a";
    context.setLineDash([8, 7]);
    context.strokeRect(sx(790), sy(70), sx(112), sy(392));
    context.setLineDash([]);

    context.fillStyle = "#343a34";
    context.fillRect(sx(430), sy(190), sx(305), sy(160));
    context.strokeStyle = "#858b85";
    context.lineWidth = 2;
    context.strokeRect(sx(430), sy(190), sx(305), sy(160));
    line(context, [[sx(430), sy(235)], [sx(735), sy(235)]], "#777e77", 1, []);
    line(context, [[sx(430), sy(305)], [sx(735), sy(305)]], "#777e77", 1, []);

    fitText(context, copy.canvas.station, sx(74), sy(122), sx(175), labelSize, 700, "#f0f1ee", "left");
    fitText(context, copy.canvas.street, sx(292), sy(122), sx(120), labelSize, 700, "#d7dbd7", "left");
    fitText(context, copy.canvas.barrier, sx(580), sy(165), sx(270), labelSize, 700, "#c8cdc8", "center");
    fitText(context, copy.canvas.baseline, sx(846), sy(106), sx(190), labelSize, 700, "#cfe2d5", "center");
    fitText(context, copy.canvas.context, sx(52), sy(450), sx(560), smallSize, 500, "#858d86", "left");

    node(context, sx(145), sy(286), compact ? 18 : 23, "#d8ddd8", "#1c211d");
    node(context, sx(846), sy(286), compact ? 18 : 23, "#79a28a", "#1c211d");
    setCanvasFont(context, compact ? 9 : 11, 700, true);
    context.fillStyle = "#e1e4e1";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("S", sx(145), sy(286));
    context.fillText("P", sx(846), sy(286));

    const routeY = sy(286);
    const gapStart = sx(448);
    const gapEnd = sx(698);
    const stationX = sx(170);
    const parkX = sx(818);

    if (state.mode === "baseline") {
      drawArrow(context, stationX, routeY, gapStart - sx(18), routeY, "#b4bbb5", 4, true);
      drawArrow(context, gapEnd + sx(12), routeY, parkX, routeY, "#b4bbb5", 4, true);
      hatch(context, gapStart, sy(205), gapEnd - gapStart, sy(130), "#e76856");
      line(context, [[gapStart, sy(205)], [gapStart, sy(335)]], "#e76856", 3, [7, 6]);
      line(context, [[gapEnd, sy(205)], [gapEnd, sy(335)]], "#e76856", 3, [7, 6]);
      fitText(context, copy.canvas.unknown, (gapStart + gapEnd) / 2, sy(270), gapEnd - gapStart - 18, labelSize, 700, "#f29b8c", "center");
      fitText(context, copy.canvas.noRoute, (gapStart + gapEnd) / 2, sy(374), sx(230), smallSize, 600, "#a8aea9", "center");
      fitText(context, copy.canvas.modeBaseline, sx(50), sy(510), sx(500), smallSize, 700, "#d0d5d1", "left");
    }

    if (state.mode === "A") {
      drawArrow(context, stationX, routeY, parkX, routeY, "#c18a26", 5, false);
      context.fillStyle = "rgba(168, 120, 31, 0.18)";
      context.fillRect(sx(457), sy(205), sx(224), sy(130));
      context.strokeStyle = "#c18a26";
      context.setLineDash([7, 6]);
      context.strokeRect(sx(457), sy(205), sx(224), sy(130));
      context.setLineDash([]);
      [[480, copy.canvas.staffed], [570, copy.canvas.wayfinding], [660, copy.canvas.signal]].forEach((item, index) => {
        node(context, sx(item[0]), routeY, compact ? 8 : 11, "#c18a26", "#1c211d");
        fitText(context, item[1], sx(item[0]), sy(index % 2 === 0 ? 380 : 155), sx(120), smallSize, 650, "#e6c98e", "center");
        line(context, [[sx(item[0]), sy(index % 2 === 0 ? 356 : 179)], [sx(item[0]), routeY + (index % 2 === 0 ? 14 : -14)]], "#8f6e31", 1, []);
      });
      fitText(context, copy.canvas.modeA, sx(50), sy(510), sx(500), smallSize, 700, "#e6c98e", "left");
    }

    if (state.mode === "B") {
      drawArrow(context, stationX, routeY, parkX, routeY, "#4b73df", 7, false);
      for (let x = 505; x <= 625; x += 22) {
        line(context, [[sx(x), sy(238)], [sx(x), sy(334)]], "#dfe6fa", compact ? 2 : 3, []);
      }
      context.fillStyle = "rgba(36, 72, 184, 0.24)";
      context.fillRect(sx(676), sy(225), sx(94), sy(122));
      context.strokeStyle = "#6f91ec";
      context.strokeRect(sx(676), sy(225), sx(94), sy(122));
      node(context, sx(723), routeY, compact ? 10 : 14, "#6f91ec", "#1c211d");
      fitText(context, copy.canvas.accessible, sx(565), sy(152), sx(260), labelSize, 700, "#c9d6fa", "center");
      fitText(context, copy.canvas.openEdge, sx(723), sy(380), sx(135), smallSize, 650, "#a9bcf1", "center");
      fitText(context, copy.canvas.rest, sx(846), sy(394), sx(170), smallSize, 650, "#a8ccb3", "center");
      fitText(context, copy.canvas.modeB, sx(50), sy(510), sx(500), smallSize, 700, "#a9bcf1", "left");
    }

    if (state.mode === "C") {
      context.beginPath();
      context.setLineDash([11, 8]);
      context.strokeStyle = "#d45a49";
      context.lineWidth = 5;
      context.moveTo(stationX, routeY);
      context.bezierCurveTo(sx(370), sy(278), sx(465), sy(75), sx(590), sy(75));
      context.bezierCurveTo(sx(715), sy(75), sx(730), sy(278), parkX, routeY);
      context.stroke();
      context.setLineDash([]);
      const lockX = sx(590);
      const lockY = sy(150);
      context.strokeStyle = "#ef7c6a";
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(lockX - 18, lockY - 18);
      context.lineTo(lockX + 18, lockY + 18);
      context.moveTo(lockX + 18, lockY - 18);
      context.lineTo(lockX - 18, lockY + 18);
      context.stroke();
      hatch(context, sx(445), sy(205), sx(270), sy(130), "#e76856");
      fitText(context, copy.canvas.structure, sx(590), sy(54), sx(320), labelSize, 700, "#f0a296", "center");
      fitText(context, copy.canvas.blocked, sx(580), sy(270), sx(250), labelSize, 700, "#f6a99d", "center");
      fitText(context, copy.canvas.modeC, sx(50), sy(510), sx(540), smallSize, 700, "#f0a296", "left");
    }

    fitText(context, copy.canvas.relationship, sx(950), sy(510), sx(360), smallSize, 600, "#a7aea8", "right");
    canvas.setAttribute("aria-label", copy.aria[state.mode]);
    canvasStage.classList.add("canvas-ready");
  }

  function setMode(mode, moveFocus) {
    if (!data.modes[mode]) return;
    state.mode = mode;
    modeTabs.forEach((tab) => {
      const active = tab.dataset.mode === mode;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });

    const modeData = data.modes[mode];
    modeTitle.textContent = modeData.title;
    modeDescription.textContent = modeData.description;
    modeGate.textContent = modeData.gate;
    modeGate.classList.toggle("is-excluded", mode === "C");
    const activeTab = document.getElementById("tab-" + mode);
    modePanel.setAttribute("aria-labelledby", activeTab.id);
    drawCanvas();
  }

  modeTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setMode(tab.dataset.mode, false));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % modeTabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + modeTabs.length) % modeTabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = modeTabs.length - 1;
      else return;
      event.preventDefault();
      setMode(modeTabs[nextIndex].dataset.mode, true);
    });
  });

  function readWeights() {
    const raw = {};
    let total = 0;
    weightInputs.forEach((input) => {
      const value = Number(input.value);
      raw[input.name] = value;
      total += value;
      const output = document.getElementById("output-" + input.name);
      if (output) output.value = value;
    });
    const fallback = total === 0;
    const divisor = fallback ? weightInputs.length : total;
    const normalized = {};
    weightInputs.forEach((input) => {
      normalized[input.name] = fallback ? 1 / weightInputs.length : raw[input.name] / divisor;
    });
    normalizedTotal.textContent = fallback ? copy.equalFallback : format(copy.normalized, { sum: total });
    return normalized;
  }

  function scoreOption(option, weights) {
    let low = 0;
    let high = 0;
    Object.keys(weights).forEach((objective) => {
      const band = option.bands[objective];
      low += weights[objective] * band[0];
      high += weights[objective] * band[1];
    });
    return { low: low * 100, high: high * 100, midpoint: ((low + high) / 2) * 100 };
  }

  function updateSensitivity() {
    const weights = readWeights();
    const results = Object.entries(data.options).map(([id, option]) => ({
      id,
      option,
      score: scoreOption(option, weights)
    }));

    results.forEach((result) => {
      const row = document.querySelector(`.candidate-row[data-option="${result.id}"]`);
      if (!row) return;
      const band = row.querySelector(".band-range");
      const value = row.querySelector(".band-value");
      band.style.left = `${result.score.low.toFixed(1)}%`;
      band.style.width = `${Math.max(1.5, result.score.high - result.score.low).toFixed(1)}%`;
      value.textContent = `${Math.round(result.score.low)}–${Math.round(result.score.high)}`;
      row.setAttribute("aria-label", format(copy.bandAria, {
        name: result.option.name,
        low: Math.round(result.score.low),
        high: Math.round(result.score.high),
        gate: result.option.gate
      }));
    });

    const viable = results.filter((result) => result.id !== "C").sort((a, b) => b.score.midpoint - a.score.midpoint);
    const top = viable[0];
    const second = viable[1];
    const overlaps = top.score.low <= second.score.high && second.score.low <= top.score.high;
    sensitivityHeadline.textContent = format(
      overlaps ? copy.sensitivityOverlap : copy.sensitivitySeparated,
      {
        top: top.option.name,
        second: second.option.name,
        score: Math.round(top.score.midpoint)
      }
    );
    sensitivityDetail.textContent = copy.sensitivityDetail;
  }

  weightInputs.forEach((input) => input.addEventListener("input", updateSensitivity));
  resetWeights.addEventListener("click", () => {
    data.objectives.forEach((objective) => {
      const input = document.querySelector(`#weightForm input[name="${objective.id}"]`);
      if (input) input.value = objective.default;
    });
    updateSensitivity();
  });

  if (context) {
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(drawCanvas);
      observer.observe(canvasStage);
    } else {
      window.addEventListener("resize", drawCanvas);
    }
    drawCanvas();
  }

  updateSensitivity();
})();
