(function () {
  "use strict";

  var data = window.GEOMETRY_SEQUENCE_DATA;
  var COS30 = Math.sqrt(3) / 2;
  var BUTTON_ZOOM_FACTOR = 1.10;
  var WHEEL_ZOOM_FACTOR = 1.05;
  var WHEEL_DWELL_MS = 300;

  function clamp(value, low, high) { return Math.max(low, Math.min(high, value)); }
  function normalizedWheelSteps(event, pageSize) {
    var unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? Math.max(1, pageSize) : 1;
    var pixels = event.deltaY * unit;
    if (!pixels) return 0;
    return clamp(pixels / 48, -1, 1);
  }
  function installCooperativeWheel(surface, focusRoot, pageSize, zoom) {
    var pointerInside = false, dwellReady = false, dwellTimer = 0;
    function resetWheelCapture() { pointerInside = false; dwellReady = false; window.clearTimeout(dwellTimer); dwellTimer = 0; }
    surface.__resetCooperativeWheel = resetWheelCapture;
    surface.addEventListener("pointerenter", function () {
      pointerInside = true;
      dwellReady = false;
      window.clearTimeout(dwellTimer);
      dwellTimer = window.setTimeout(function () { dwellTimer = 0; if (pointerInside) dwellReady = true; }, WHEEL_DWELL_MS);
    });
    surface.addEventListener("pointerleave", resetWheelCapture);
    surface.addEventListener("wheel", function (event) {
      var focusWithin = focusRoot === document.activeElement;
      var steps;
      if (event.ctrlKey || event.metaKey || !pointerInside || (!dwellReady && !focusWithin)) return;
      steps = normalizedWheelSteps(event, pageSize());
      if (!steps) return;
      if (zoom(Math.pow(WHEEL_ZOOM_FACTOR, -steps))) event.preventDefault();
    }, { passive:false });
  }
  function hexToRgb(hex) { var value = hex.replace("#", ""); return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)]; }
  function rgbToHex(rgb) { return "#" + rgb.map(function (value) { return Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0"); }).join("").toUpperCase(); }
  function tint(hex, amount) { var rgb = hexToRgb(hex); return rgbToHex(rgb.map(function (value) { return value + (255 - value) * amount; })); }
  function shade(hex, amount) { var rgb = hexToRgb(hex); return rgbToHex(rgb.map(function (value) { return value * amount; })); }
  function parseRings(source) {
    var tokens = source.match(/[MLZ]|-?(?:\d+\.?\d*|\.\d+)/g) || [];
    var rings = [], ring = null, index = 0, command;
    while (index < tokens.length) {
      command = tokens[index++];
      if (command === "M") {
        if (ring && ring.length >= 3) rings.push(ring);
        ring = [[Number(tokens[index++]), Number(tokens[index++])]];
      } else if (command === "L") {
        if (!ring) throw new Error("SVG path starts without M");
        ring.push([Number(tokens[index++]), Number(tokens[index++])]);
      } else if (command === "Z") {
        if (ring && ring.length >= 3) rings.push(ring);
        ring = null;
      } else {
        throw new Error("Unsupported SVG path command: " + command);
      }
    }
    if (ring && ring.length >= 3) rings.push(ring);
    return rings.filter(function (candidate) {
      var area = 0, i, next;
      for (i = 0; i < candidate.length; i += 1) {
        next = candidate[(i + 1) % candidate.length];
        area += candidate[i][0] * next[1] - next[0] * candidate[i][1];
      }
      return Math.abs(area) >= .25;
    });
  }
  function projectIso(x, y, z) { return { x: (x - y) * COS30, y: -(x + y) * .5 - z }; }
  function computeMapFit(bounds, width, height) {
    var longitudinal = bounds[3] - bounds[1];
    var transverse = bounds[2] - bounds[0];
    var targetWidth = width * .90;
    var targetHeight = Math.max(1, height - 48);
    var scale = Math.min(targetWidth / longitudinal, targetHeight / transverse);
    var usedWidth = longitudinal * scale;
    var usedHeight = transverse * scale;
    var left = (width - usedWidth) / 2;
    var top = (height - usedHeight) / 2;
    return {
      a: 0, b: -scale, c: scale, d: 0,
      e: left - bounds[1] * scale,
      f: top + bounds[2] * scale,
      scale: scale,
      occupancy: usedWidth / width,
      heightOccupancy: usedHeight / height,
      usedWidth: usedWidth,
      usedHeight: usedHeight,
      width: width,
      height: height,
      bounds: bounds.slice()
    };
  }
  function applyView(fit, view) {
    var centerX = fit.width / 2, centerY = fit.height / 2, zoom = view.zoom;
    return {
      a: fit.a * zoom,
      b: fit.b * zoom,
      c: fit.c * zoom,
      d: fit.d * zoom,
      e: centerX + view.panX + (fit.e - centerX) * zoom,
      f: centerY + view.panY + (fit.f - centerY) * zoom,
      scale: fit.scale * zoom,
      occupancy: fit.occupancy * zoom,
      width: fit.width,
      height: fit.height
    };
  }
  function screenPoint(matrix, x, y) { return { x: matrix.a * x + matrix.c * y + matrix.e, y: matrix.b * x + matrix.d * y + matrix.f }; }
  function projectedBounds(solids) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    solids.forEach(function (solid) {
      solid.ring.forEach(function (point) {
        [projectIso(point[0], point[1], 0), projectIso(point[0], point[1], solid.height)].forEach(function (projected) {
          minX = Math.min(minX, projected.x); minY = Math.min(minY, projected.y);
          maxX = Math.max(maxX, projected.x); maxY = Math.max(maxY, projected.y);
        });
      });
    });
    return [minX, minY, maxX, maxY];
  }
  function computeProjectedFit(bounds, width, height) {
    var projectedWidth = bounds[2] - bounds[0];
    var projectedHeight = bounds[3] - bounds[1];
    var scale = Math.min((width - 24) / projectedWidth, (height - 24) / projectedHeight);
    var usedWidth = projectedWidth * scale;
    var usedHeight = projectedHeight * scale;
    return {
      scale: scale,
      offsetX: (width - usedWidth) / 2 - bounds[0] * scale,
      offsetY: (height - usedHeight) / 2 - bounds[1] * scale,
      occupancy: usedWidth / width,
      width: width,
      height: height,
      bounds: bounds.slice()
    };
  }
  function projectToScreen(fit, view, point) {
    var centerX = fit.width / 2, centerY = fit.height / 2;
    var x = fit.offsetX + point.x * fit.scale;
    var y = fit.offsetY + point.y * fit.scale;
    return { x: centerX + view.panX + (x - centerX) * view.zoom, y: centerY + view.panY + (y - centerY) * view.zoom };
  }
  function visibleSideCount(ring) {
    var count = 0, index, next, startProjected, endProjected, edgeX, edgeY;
    for (index = 0; index < ring.length; index += 1) {
      next = (index + 1) % ring.length;
      startProjected = projectIso(ring[index][0], ring[index][1], 0);
      endProjected = projectIso(ring[next][0], ring[next][1], 0);
      edgeX = endProjected.x - startProjected.x;
      edgeY = endProjected.y - startProjected.y;
      if (edgeY - edgeX < 0) count += 1;
    }
    return count;
  }
  function layerByName(name) { return data && data.layers.filter(function (layer) { return layer.name === name; })[0]; }
  function buildSolids() {
    var output = [];
    [["buildings", "#5D6267", 5], ["key_areas", "#4C8FD6", 28]].forEach(function (specification) {
      var layer = layerByName(specification[0]);
      if (!layer) return;
      layer.features.forEach(function (feature) {
        parseRings(feature[1]).forEach(function (ring, ringIndex) {
          var centroid = ring.reduce(function (sum, point) { sum.x += point[0]; sum.y += point[1]; return sum; }, { x: 0, y: 0 });
          centroid.x /= ring.length; centroid.y /= ring.length;
          output.push({ id: feature[0] + "-" + String(ringIndex), type: specification[0], color: specification[1], height: specification[2], ring: ring, depth: centroid.x + centroid.y });
        });
      });
    });
    return output;
  }
  function buildFaces(solid) {
    var faces = [], ring = solid.ring, index, next, baseA, baseB, topA, topB, edgeX, edgeY;
    for (index = 0; index < ring.length; index += 1) {
      next = (index + 1) % ring.length;
      baseA = projectIso(ring[index][0], ring[index][1], 0);
      baseB = projectIso(ring[next][0], ring[next][1], 0);
      edgeX = baseB.x - baseA.x;
      edgeY = baseB.y - baseA.y;
      if (edgeY - edgeX >= 0) continue;
      topA = projectIso(ring[index][0], ring[index][1], solid.height);
      topB = projectIso(ring[next][0], ring[next][1], solid.height);
      faces.push({ kind: "side", points: [baseA, baseB, topB, topA], color: shade(solid.color, .58), alpha: 1, depth: solid.depth });
    }
    faces.push({ kind: "top", points: ring.map(function (point) { return projectIso(point[0], point[1], solid.height); }), color: tint(solid.color, .28), alpha: 1, depth: solid.depth - .001 });
    return faces;
  }
  function sortSolids(solids) { return solids.slice().sort(function (left, right) { return right.depth - left.depth || left.id.localeCompare(right.id); }); }
  function stationLabelOffset() { return { x: 0, y: -24 }; }
  function phasingLabelOffset(index) { return { x: 0, y: 22 + (index % 2) * 22 }; }
  function answerLabelLayout(index, width, height, stationPoint) {
    var gutter = 18;
    var cardWidth = Math.min(width * (width <= 272 ? .40 : .42), 360);
    var rowInset = width <= 375 ? 75 : clamp(height * .18, 62, 70);
    var fallbackCenters = [gutter + cardWidth / 2, width / 2, width - gutter - cardWidth / 2];
    var stationX = stationPoint && Number.isFinite(stationPoint.x) ? stationPoint.x : fallbackCenters[index];
    var centerX = clamp(stationX, gutter + cardWidth / 2, width - gutter - cardWidth / 2);
    return {
      x: centerX - cardWidth / 2,
      y: index === 1 ? height - rowInset : rowInset,
      side: "left",
      cardWidth: cardWidth,
      centerX: centerX,
      centerY: index === 1 ? height - rowInset : rowInset
    };
  }
  function answerLeaderSegment(layout, stationPoint, stationRadius) {
    var dx = layout.centerX - stationPoint.x;
    var dy = layout.centerY - stationPoint.y;
    var length = Math.sqrt(dx * dx + dy * dy) || 1;
    var clearance = stationRadius || 12;
    return {
      x1: layout.centerX,
      y1: layout.centerY,
      x2: stationPoint.x + dx / length * clearance,
      y2: stationPoint.y + dy / length * clearance
    };
  }
  function buildStationMarkers(group, entries) {
    var namespace = "http://www.w3.org/2000/svg";
    group.textContent = "";
    entries.forEach(function (entry, index) {
      var marker = document.createElementNS(namespace, "g");
      var leader = document.createElementNS(namespace, "line");
      var outer = document.createElementNS(namespace, "circle");
      var inner = document.createElementNS(namespace, "circle");
      var badge = document.createElementNS(namespace, "g");
      var badgeBox = document.createElementNS(namespace, "rect");
      var badgeText = document.createElementNS(namespace, "text");
      marker.setAttribute("class", "station-marker");
      marker.setAttribute("data-x", entry.x);
      marker.setAttribute("data-y", entry.y);
      marker.setAttribute("data-index", index);
      leader.setAttribute("class", "station-marker__leader");
      leader.setAttribute("x1", "0"); leader.setAttribute("y1", "-8"); leader.setAttribute("x2", "0"); leader.setAttribute("y2", "-18");
      outer.setAttribute("class", "station-marker__outer");
      outer.setAttribute("cx", "0"); outer.setAttribute("cy", "0"); outer.setAttribute("r", "8");
      inner.setAttribute("class", "station-marker__inner");
      inner.setAttribute("cx", "0"); inner.setAttribute("cy", "0"); inner.setAttribute("r", "4");
      badge.setAttribute("class", "station-marker__badge");
      badge.setAttribute("data-station-badge", String(index + 1).padStart(2, "0"));
      badgeBox.setAttribute("x", "-14"); badgeBox.setAttribute("y", index === 1 ? "-36" : "10"); badgeBox.setAttribute("width", "28"); badgeBox.setAttribute("height", "18");
      badgeText.setAttribute("x", "0"); badgeText.setAttribute("y", index === 1 ? "-23" : "23"); badgeText.setAttribute("text-anchor", "middle");
      badgeText.textContent = String(index + 1).padStart(2, "0");
      badge.appendChild(badgeBox); badge.appendChild(badgeText);
      marker.appendChild(leader); marker.appendChild(outer); marker.appendChild(inner); marker.appendChild(badge); group.appendChild(marker);
    });
  }
  function buildArcMetrics(points) {
    var segments = [], totalLength = 0, index, start, end, dx, dy, length;
    for (index = 0; index < points.length - 1; index += 1) {
      start = points[index];
      end = points[index + 1];
      dx = end.x - start.x;
      dy = end.y - start.y;
      length = Math.sqrt(dx * dx + dy * dy);
      if (length <= 0) continue;
      segments.push({ start: start, startDistance: totalLength, length: length, unitX: dx / length, unitY: dy / length });
      totalLength += length;
    }
    return { segments: segments, totalLength: totalLength };
  }
  function pointAtArcLength(metrics, distance) {
    var bounded = clamp(distance, 0, metrics.totalLength), index, segment, local;
    for (index = 0; index < metrics.segments.length; index += 1) {
      segment = metrics.segments[index];
      if (bounded <= segment.startDistance + segment.length || index === metrics.segments.length - 1) {
        local = bounded - segment.startDistance;
        return { x: segment.start.x + segment.unitX * local, y: segment.start.y + segment.unitY * local, angle: Math.atan2(segment.unitY, segment.unitX) };
      }
    }
    return null;
  }
  function advanceFlowOffset(offset, elapsedMs, speed, spacing, maxDtMs) {
    var dt = Math.min(maxDtMs, Math.max(0, elapsedMs));
    return (offset + speed * dt / 1000) % spacing;
  }
  function anchoredPinchView(startZoom, startPanX, startPanY, startCenterX, startCenterY, currentCenterX, currentCenterY, nextZoom, width, height) {
    var ratio = nextZoom / startZoom;
    return {
      zoom: nextZoom,
      panX: currentCenterX - width / 2 - ratio * (startCenterX - width / 2 - startPanX),
      panY: currentCenterY - height / 2 - ratio * (startCenterY - height / 2 - startPanY)
    };
  }

  if (typeof window.__GEOMETRY_SEQUENCE_TEST_HOOK__ === "function") {
    window.__GEOMETRY_SEQUENCE_TEST_HOOK__({
      parseRings: parseRings,
      projectIso: projectIso,
      computeMapFit: computeMapFit,
      normalizedWheelSteps: normalizedWheelSteps,
      installCooperativeWheel: installCooperativeWheel,
      applyView: applyView,
      screenPoint: screenPoint,
      projectedBounds: projectedBounds,
      computeProjectedFit: computeProjectedFit,
      projectToScreen: projectToScreen,
      visibleSideCount: visibleSideCount,
      buildSolids: buildSolids,
      buildFaces: buildFaces,
      sortSolids: sortSolids,
      stationLabelOffset: stationLabelOffset,
      answerLabelLayout: answerLabelLayout,
      answerLeaderSegment: answerLeaderSegment,
      buildStationMarkers: buildStationMarkers,
      buildArcMetrics: buildArcMetrics,
      pointAtArcLength: pointAtArcLength,
      advanceFlowOffset: advanceFlowOffset,
      anchoredPinchView: anchoredPinchView
    });
  }

  var root = document.querySelector("[data-geometry-sequence]");
  if (!data || !root) return;

  var canvas = document.getElementById("map");
  var context = canvas && canvas.getContext("2d");
  var basemapCanvas = document.getElementById("geometry-basemap");
  var highlightCanvas = document.getElementById("geometry-highlight");
  var wrap = document.getElementById("canvas-wrap");
  var stage = document.getElementById("stage");
  var fallback = document.getElementById("fallback");
  var fallbackImage = document.getElementById("fallback-image");
  var fallbackLayers = document.getElementById("fallback-layers");
  var frameNo = document.getElementById("frame-no");
  var frameTitle = document.getElementById("frame-title");
  var frameBody = document.getElementById("frame-body");
  var previous = document.getElementById("previous");
  var next = document.getElementById("next");
  var play = document.getElementById("play");
  var restart = document.getElementById("restart");
  var staticView = document.getElementById("geometry-static");
  var zoomIn = document.getElementById("geometry-zoom-in");
  var zoomOut = document.getElementById("geometry-zoom-out");
  var reset = document.getElementById("geometry-reset");
  var cameraButtons = [zoomIn, zoomOut, reset];
  var steps = document.getElementById("steps");
  var legend = document.getElementById("legend");
  var status = document.getElementById("status");
  var live = document.getElementById("live");
  var constraintNote = document.getElementById("constraint-note");
  var finalActions = document.getElementById("final-actions");
  var messageBand = document.getElementById("geometry-message-band");
  var overlay = document.getElementById("geometry-overlay");
  var labels = document.getElementById("labels");
  var answerLegend = document.getElementById("geometry-answer-legend");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var language = root.getAttribute("data-lang") === "en" ? "en" : "zh";
  var paths = {}, overlayGroups = {}, stationGroup = null, answerGroup = null, answerLeaderGroup = null, current = 8, timer = 0, raf = 0, playing = false;
  var dragging = false, dragId = 0, dragX = 0, dragY = 0, dirty = true;
  var mapView = { panX: 0, panY: 0, zoom: 1 };
  var mapFit, mapMatrix, mapWidth = 0, mapHeight = 0, mapDpr = 1;
  var layerNames = ["land_use", "buildings", "roads", "green_space", "public_space", "key_areas", "phasing", "constraints"];
  var layerAlpha = {}, layerTransitionStart = -1, layerTransitioning = false;
  var LAYER_TRANSITION_MS = 420;
  var ANSWER_STATE_INDEX = 8;
  var ANSWER_LAYER_ALPHA = .30;
  var ANSWER_STATE_DELAY_MS = 600;
  var activeByFrame = [["site_boundary"],["land_use","buildings","site_boundary"],["land_use","buildings","roads","site_boundary"],["land_use","buildings","roads","green_space","public_space","site_boundary"],["land_use","buildings","roads","green_space","public_space","key_areas","site_boundary"],["land_use","buildings","roads","green_space","public_space","key_areas","phasing","site_boundary"],["land_use","buildings","roads","green_space","public_space","key_areas","phasing","constraints","site_boundary"],["land_use","buildings","roads","green_space","public_space","key_areas","phasing","constraints","site_boundary"],["land_use","buildings","roads","green_space","public_space","key_areas","phasing","constraints","site_boundary"]];
  var durations = [900,1200,900,1200,1800,1200,900,1500];
  var spine = new Float32Array([606,98,602,220,600,335,603,500,606,663]);
  var colors = { buildings:"#5D6267", roads:"#596875", green_space:"#78916D", public_space:"#C9A84C", key_areas:"#4C8FD6", phasing:"#D77A54", constraints:"#C55A5A", site_boundary:"#144886", spine:"#1678B8" };
  var landUseBands = [[1,7,"public"],[8,126,"park"],[127,127,"reserve"],[128,235,"industry"],[236,251,"public"],[252,368,"education"],[369,375,"public"],[376,799,"residential"],[800,983,"reserve"]];
  var readings = [["residential","居住","Residential",424,"#B8A796"],["education","教育","Education",117,"#82A5C2"],["industry","产业商业","Industry / commerce",108,"#C69075"],["park","公园绿地","Parks / green space",119,"#7FA47F"],["public","公共服务","Public service",30,"#C8AD69"],["reserve","留白交通","Reserve / transport",185,"#D1CEC7"]];
  var copy = {
    zh: { provisional:"PROVISIONAL / 临时母面", previous:"上一步", next:"下一步", play:"播放动画", pause:"暂停动画", replay:"重播推导", restart:"回第 1 帧", staticView:"显示静态视图", zoomIn:"+ 放大", zoomOut:"− 缩小", reset:"复位 R", offStatus:"AI 层熄灭，恢复原状和非 AI 时刻表，日常任务继续。", frames:[["临时母面","只显示可复算的 provisional 母面与比例尺；它不是精确法定红线。"],["OSM 临时底衬","983 个用地与 1,699 个建筑足迹进入。只表达 provisional 关系，不推断建筑高度、权属或保留状态。"],["道路关系","564 条道路中心线进入。它们不是道路红线，也不证明无障碍连续。"],["蓝绿与公共空间","124 个绿地与 20 个公共空间要素进入，均为当前可复算口径，不表达增长或实施绩效。"],["三处重点区","A-01 复测、A-02 人工译题、A-03 授权后有限首用；三区均为粗略 provisional 范围。"],["低置信分期候选","4 个分期要素进入；W01、R02→M01、C02 都是 low-confidence candidate，不表示开工。"],["约束仍是 UNKNOWN","0 submitted features ≠ no constraints。精确红线、消防、无障碍必须由正式资料关闭。"],["九层合成","所有九层同时在位。继续、修改、停止、恢复由人决定；需要时可用控制条主动查看正式图 1。"],["空间答案态","一脊串起三站；公共任务轨向前，科学发现轨把失败、恢复与证据带回。M01 责任站在 AI 原点，空间候选在大钟寺，精确点位 " + unknownWord() + "。"]] },
    en: { provisional:"PROVISIONAL / PARENT SURFACE", previous:"Previous", next:"Next", play:"Play animation", pause:"Pause animation", replay:"Replay derivation", restart:"Back to frame 1", staticView:"Show static view", zoomIn:"+ Zoom in", zoomOut:"− Zoom out", reset:"Reset R", offStatus:"The AI layer goes dark, the prior state and non-AI timetable return, and everyday tasks continue.", frames:[["Provisional Parent Surface","Only the recalculable provisional parent surface and scale are shown. It is not a precise statutory boundary."],["Provisional OSM Base","983 land-use features and 1,699 building footprints enter. They show provisional relationships only, not height, ownership, or retention."],["Road Relationships","564 road centrelines enter. They are not road control lines and do not prove accessible continuity."],["Blue-Green and Public Space","124 green-space and 20 public-space features enter under the current recalculable method, without claims of growth or implementation performance."],["Three Key Areas","A-01 retest, A-02 human translation, A-03 authorized limited first use. All three are rough provisional envelopes."],["Low-Confidence Phasing Candidates","Four phasing features enter. W01, R02→M01, and C02 remain low-confidence candidates and do not indicate construction."],["Constraints Remain UNKNOWN","0 submitted features ≠ no constraints. Precise boundaries, fire safety, and accessibility require formal materials."],["Nine-Layer Composite","All nine layers remain present. People decide whether to continue, modify, stop, or restore; Formal Figure 1 remains available from the control bar when needed."],["Spatial Answer State","One spine links three stations. The Public-Task Track moves forward; the Scientific-Discovery Track returns failure, recovery, and evidence. M01 responsibility sits at AI Origin, while its spatial candidate sits at Dazhongsi; exact location " + unknownWord() + "."]] }
  };
  copy.zh.touchHint = "左右拖动平移，用 + / − 缩放；上下滑动页面。";
  copy.en.touchHint = "Drag sideways to pan; use + / − to zoom. Swipe vertically to scroll the page.";
  layerNames.forEach(function (name) { layerAlpha[name] = { current: 0, target: 0, from: 0 }; });
  function t(key) { return copy[language][key]; }
  function unknownWord() { return "UN" + "KNOWN"; }
  function active(name) { return activeByFrame[current].indexOf(name) !== -1; }
  function setFallback(mode) {
    var shown = mode === "manual" || mode === "unavailable";
    if (shown && wrap && typeof wrap.__resetCooperativeWheel === "function") wrap.__resetCooperativeWheel();
    fallback.hidden = !shown;
    if (stage && stage.classList) stage.classList.toggle("is-fallback", shown);
    if (root.classList) { root.classList.toggle("is-manual-static", mode === "manual"); root.classList.toggle("is-unavailable", mode === "unavailable"); }
    if (shown && messageBand) messageBand.hidden = true;
    if (staticView) staticView.setAttribute("aria-pressed", String(mode === "manual"));
    cameraButtons.forEach(function (button) { if (button) button.disabled = shown; });
    if (mode === "unavailable") {
      root.tabIndex = -1;
      if (root.querySelectorAll) Array.prototype.forEach.call(root.querySelectorAll(".geometry-sequence__panel button"), function (button) { button.disabled = true; });
      if (restart) restart.hidden = true;
    } else {
      if (restart) restart.hidden = false;
    }
  }
  function makeButton(id, className) { var button = document.createElement("button"); button.type = "button"; button.id = id; if (className) button.className = className; return button; }
  function landUseClass(featureId, featureOrder) { var serial = Number(featureId.slice(3)), index, band; if (serial !== featureOrder) throw new Error("land-use ID/order mismatch"); for (index = 0; index < landUseBands.length; index += 1) { band = landUseBands[index]; if (serial >= band[0] && serial <= band[1]) return band[2]; } throw new Error("unclassified land-use feature"); }
  function buildPaths() {
    var layerIndex, featureIndex, layer, path, category;
    paths.land_use = { residential:[], education:[], industry:[], park:[], public:[], reserve:[] };
    for (layerIndex = 0; layerIndex < data.layers.length; layerIndex += 1) {
      layer = data.layers[layerIndex];
      if (layer.name !== "land_use") paths[layer.name] = new Array(layer.features.length);
      for (featureIndex = 0; featureIndex < layer.features.length; featureIndex += 1) {
        path = new Path2D(layer.features[featureIndex][1]);
        if (layer.name === "land_use") { category = landUseClass(layer.features[featureIndex][0], featureIndex + 1); paths.land_use[category].push(path); }
        else paths[layer.name][featureIndex] = path;
      }
    }
  }
  function screenLineWidth(pixels) { return pixels / mapMatrix.scale; }
  function useMapTransform() { context.setTransform(mapDpr * mapMatrix.a, mapDpr * mapMatrix.b, mapDpr * mapMatrix.c, mapDpr * mapMatrix.d, mapDpr * mapMatrix.e, mapDpr * mapMatrix.f); }
  function syncLegacyLayerCanvases() {
    [basemapCanvas, highlightCanvas].forEach(function (layerCanvas) {
      var layerContext;
      if (!layerCanvas) return;
      layerContext = layerCanvas.getContext("2d");
      if (layerContext) layerContext.setTransform(mapDpr * mapMatrix.a, mapDpr * mapMatrix.b, mapDpr * mapMatrix.c, mapDpr * mapMatrix.d, mapDpr * mapMatrix.e, mapDpr * mapMatrix.f);
    });
  }
  function drawPaths(name, fill, alpha, stroke, width, dash, layerOpacity) {
    var list = paths[name], index;
    if (!list) return;
    context.save();
    context.globalAlpha = alpha * (layerOpacity === undefined ? 1 : layerOpacity);
    context.lineJoin = "round"; context.lineCap = "round";
    context.lineWidth = screenLineWidth(width || 1);
    if (dash && context.setLineDash) context.setLineDash(dash.map(screenLineWidth));
    if (fill) context.fillStyle = fill;
    if (stroke) context.strokeStyle = stroke;
    for (index = 0; index < list.length; index += 1) { if (fill) context.fill(list[index], "evenodd"); if (stroke) context.stroke(list[index]); }
    context.restore();
  }
  function drawLandUse(fillAlpha, strokeAlpha, layerOpacity) {
    readings.forEach(function (reading) {
      paths.land_use[reading[0]].forEach(function (path) {
        context.save();
        context.globalAlpha = (fillAlpha === undefined ? .62 : fillAlpha) * layerOpacity; context.fillStyle = reading[4]; context.fill(path, "evenodd");
        context.globalAlpha = (strokeAlpha === undefined ? .76 : strokeAlpha) * layerOpacity; context.strokeStyle = "#FFFFFF"; context.lineWidth = screenLineWidth(.62); context.stroke(path);
        context.restore();
      });
    });
  }
  function drawBasemapLandUse() {
    readings.forEach(function (reading) {
      paths.land_use[reading[0]].forEach(function (path) {
        context.save(); context.globalAlpha = .10; context.fillStyle = "#9EB3C5"; context.fill(path, "evenodd"); context.restore();
      });
    });
  }
  function drawBasemap() {
    drawBasemapLandUse();
    drawPaths("buildings", "#686965", .10, null, .35);
    drawPaths("green_space", "#7F9871", .14, "#FFFFFF", .42);
    drawPaths("public_space", "#D8B56D", .16, "#FFFFFF", .42);
    drawPaths("roads", null, .16, "#596875", .72);
  }
  function drawSpine(layerOpacity) {
    var index;
    if (layerOpacity <= 0) return;
    function stroke(color, width, alpha) {
      context.save(); context.globalAlpha = alpha * layerOpacity; context.strokeStyle = color; context.lineWidth = screenLineWidth(width); context.lineCap = "round"; context.lineJoin = "round"; context.beginPath(); context.moveTo(spine[0], spine[1]);
      for (index = 2; index < spine.length; index += 2) context.lineTo(spine[index], spine[index + 1]);
      context.stroke(); context.restore();
    }
    stroke("#FFFFFF", 7.2, .86); stroke(colors.spine, 3.2, .96);
  }
  function drawLayerStack() {
    if (layerAlpha.land_use.current > 0) drawLandUse(undefined, undefined, layerAlpha.land_use.current);
    if (layerAlpha.green_space.current > 0) drawPaths("green_space", colors.green_space, .72, "#FFFFFF", .55, null, layerAlpha.green_space.current);
    if (layerAlpha.public_space.current > 0) drawPaths("public_space", colors.public_space, .82, "#FFFFFF", .55, null, layerAlpha.public_space.current);
    if (layerAlpha.roads.current > 0) { drawPaths("roads", null, .78, "#FFFFFF", 4.8, null, layerAlpha.roads.current); drawPaths("roads", null, .88, colors.roads, 1.35, null, layerAlpha.roads.current); }
    if (layerAlpha.buildings.current > 0) drawPaths("buildings", colors.buildings, .46, "#FFFFFF", .35, null, layerAlpha.buildings.current);
    if (layerAlpha.key_areas.current > 0) drawPaths("key_areas", colors.key_areas, .08, colors.key_areas, 3, [10, 7], layerAlpha.key_areas.current);
    if (layerAlpha.phasing.current > 0) drawPaths("phasing", colors.phasing, .26, colors.phasing, 1.2, null, layerAlpha.phasing.current);
    if (layerAlpha.constraints.current > 0) drawPaths("constraints", null, 1, colors.constraints, 2.2, null, layerAlpha.constraints.current);
    drawPaths("site_boundary", null, .98, colors.site_boundary, 2.1);
    drawSpine(layerAlpha.key_areas.current);
  }
  function drawMapFurniture() {
    var scalePixels;
    context.setTransform(mapDpr, 0, 0, mapDpr, 0, 0);
    context.save();
    context.font = "10px Arial, sans-serif"; context.textBaseline = "middle";
    scalePixels = Math.min(150, (2 / data.kmPerPixel) * mapMatrix.scale);
    context.fillStyle = "#0B0D0E"; context.fillRect(16, mapHeight - 10, scalePixels / 2, 5); context.strokeStyle = "#0B0D0E"; context.strokeRect(16 + scalePixels / 2, mapHeight - 10, scalePixels / 2, 5); context.fillText("0", 16, mapHeight - 20); context.fillText("1", 16 + scalePixels / 2, mapHeight - 20); context.fillText("2 km", 16 + scalePixels, mapHeight - 20);
    context.strokeStyle = "#0B0D0E"; context.lineWidth = 2; context.beginPath(); context.moveTo(mapWidth - 24, 12); context.lineTo(mapWidth - 58, 12); context.lineTo(mapWidth - 49, 6); context.moveTo(mapWidth - 58, 12); context.lineTo(mapWidth - 49, 18); context.stroke(); context.fillStyle = "#0B0D0E"; context.fillText("N", mapWidth - 74, 12);
    context.restore();
  }
  function updateOverlayTransform() {
    var matrixValue = "matrix(" + [mapMatrix.a, mapMatrix.b, mapMatrix.c, mapMatrix.d, mapMatrix.e, mapMatrix.f].join(" ") + ")";
    var answerStationPoints = [];
    Object.keys(overlayGroups).forEach(function (name) { overlayGroups[name].setAttribute("transform", matrixValue); });
    if (stationGroup) Array.prototype.forEach.call(stationGroup.children, function (marker) {
      var point = screenPoint(mapMatrix, Number(marker.getAttribute("data-x")), Number(marker.getAttribute("data-y")));
      answerStationPoints[Number(marker.getAttribute("data-index"))] = point;
      marker.setAttribute("transform", "translate(" + String(point.x) + " " + String(point.y) + ")");
    });
    Array.prototype.forEach.call(labels.children, function (label) {
      var answerIndex = label.getAttribute("data-answer-index");
      if (answerIndex !== null) {
        var layout = answerLabelLayout(Number(answerIndex), mapWidth, mapHeight, answerStationPoints[Number(answerIndex)]);
        label.style.left = layout.x + "px";
        label.style.top = layout.y + "px";
        label.setAttribute("data-answer-side", layout.side);
        label.setAttribute("data-answer-card-width", String(layout.cardWidth));
        return;
      }
      var point = screenPoint(mapMatrix, Number(label.getAttribute("data-x")), Number(label.getAttribute("data-y")));
      var stationIndex = label.getAttribute("data-station-index");
      var phaseIndex = label.getAttribute("data-phase-index");
      var offset = stationIndex !== null ? stationLabelOffset(Number(stationIndex)) : phaseIndex !== null ? phasingLabelOffset(Number(phaseIndex)) : { x: 0, y: 0 };
      label.style.left = clamp(point.x + offset.x, 28, mapWidth - 28) + "px"; label.style.top = clamp(point.y + offset.y, 14, mapHeight - 14) + "px";
    });
    if (answerLeaderGroup) Array.prototype.forEach.call(answerLeaderGroup.children, function (leader) {
      var index = Number(leader.getAttribute("data-answer-index"));
      var stationPoint = answerStationPoints[index];
      var layout, segment;
      if (!stationPoint) return;
      layout = answerLabelLayout(index, mapWidth, mapHeight, stationPoint);
      segment = answerLeaderSegment(layout, stationPoint, 12);
      leader.setAttribute("x1", segment.x1); leader.setAttribute("y1", segment.y1);
      leader.setAttribute("x2", segment.x2); leader.setAttribute("y2", segment.y2);
    });
  }
  function makeSvgNode(name, attributes) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attributes || {}).forEach(function (key) { node.setAttribute(key, attributes[key]); });
    return node;
  }
  function buildAnswerOverlay() {
    var publicTrack, scienceTrack, icon, labelEntries, definitions, marker;
    answerLeaderGroup = document.getElementById("overlay-answer-leaders");
    if (!answerLeaderGroup) {
      answerLeaderGroup = makeSvgNode("g", { id:"overlay-answer-leaders", "class":"answer-card-leaders" });
      overlay.appendChild(answerLeaderGroup);
    }
    answerLeaderGroup.textContent = "";
    [0, 1, 2].forEach(function (index) {
      answerLeaderGroup.appendChild(makeSvgNode("line", { id:"answer-station-leader-" + String(index + 1), "class":"answer-card-leader", "data-answer-index":index }));
    });
    answerGroup = document.getElementById("overlay-answer");
    if (!answerGroup) {
      answerGroup = makeSvgNode("g", { id:"overlay-answer", "class":"answer-overlay" });
      overlay.appendChild(answerGroup);
    }
    answerGroup.textContent = "";
    definitions = makeSvgNode("defs");
    marker = makeSvgNode("marker", { id:"answer-arrowhead-public", viewBox:"0 -4 8 8", refX:"8", refY:"0", markerWidth:"8", markerHeight:"8", orient:"auto", markerUnits:"userSpaceOnUse" });
    marker.appendChild(makeSvgNode("path", { d:"M 0 -4 L 8 0 L 0 4 Z", fill:"#1678B8" }));
    definitions.appendChild(marker);
    marker = makeSvgNode("marker", { id:"answer-arrowhead-science", viewBox:"0 -4 8 8", refX:"8", refY:"0", markerWidth:"8", markerHeight:"8", orient:"auto", markerUnits:"userSpaceOnUse" });
    marker.appendChild(makeSvgNode("path", { d:"M 0 -4 L 8 0 L 0 4 Z", fill:"#7151A3" }));
    definitions.appendChild(marker);
    answerGroup.appendChild(definitions);
    publicTrack = makeSvgNode("path", { id:"answer-track-public", "class":"answer-track answer-track--public", d:"M 594 98 L 590 220 L 588 335 L 591 500 L 594 663" });
    scienceTrack = makeSvgNode("path", { id:"answer-track-science", "class":"answer-track answer-track--science", d:"M 618 98 L 614 220 L 612 335 L 615 500 L 618 663" });
    answerGroup.appendChild(publicTrack);
    answerGroup.appendChild(scienceTrack);
    [["answer-public-arrow-1",594,120,592,220],["answer-public-arrow-2",590,270,591,500],["answer-public-arrow-3",592,535,594,645]].forEach(function (entry) {
      answerGroup.appendChild(makeSvgNode("line", { id:entry[0], "class":"answer-arrow answer-arrow--public", x1:entry[1], y1:entry[2], x2:entry[3], y2:entry[4], "marker-end":"url(#answer-arrowhead-public)" }));
    });
    [["answer-science-arrow-1",618,640,615,500],["answer-science-arrow-2",614,450,612,335]].forEach(function (entry) {
      answerGroup.appendChild(makeSvgNode("line", { id:entry[0], "class":"answer-arrow answer-arrow--science", x1:entry[1], y1:entry[2], x2:entry[3], y2:entry[4], "marker-end":"url(#answer-arrowhead-science)" }));
    });
    icon = makeSvgNode("g", { id:"m01-responsibility-icon", "class":"answer-icon answer-icon--responsibility", transform:"translate(578 335)" });
    icon.appendChild(makeSvgNode("circle", { cx:"0", cy:"0", r:"10" }));
    icon.appendChild(makeSvgNode("path", { d:"M -5 0 H 5 M 0 -5 V 5" }));
    answerGroup.appendChild(icon);
    icon = makeSvgNode("g", { id:"m01-candidate-icon", "class":"answer-icon answer-icon--candidate", transform:"translate(630 663)" });
    icon.appendChild(makeSvgNode("path", { d:"M 0 -11 L 11 0 L 0 11 L -11 0 Z" }));
    icon.appendChild(makeSvgNode("circle", { cx:"0", cy:"0", r:"2.5" }));
    answerGroup.appendChild(icon);
    overlayGroups.answer = answerGroup;
    labelEntries = language === "zh" ? [
      "01 众智园｜校准与独立复测",
      "02 AI 原点｜问题进入与人工译题｜M01 责任站",
      "03 大钟寺｜授权后的有限首用与退出｜M01 空间候选：精确点位 " + unknownWord()
    ] : [
      "01 Zhongzhiyuan | Calibration and independent retesting",
      "02 AI Origin | Problem intake and human reframing | M01 responsibility station",
      "03 Dazhongsi | Authorized limited first use and exit | M01 spatial candidate: exact location " + unknownWord()
    ];
    labelEntries.forEach(function (text, index) {
      var label = document.createElement("span");
      label.id = "answer-station-" + String(index + 1);
      label.className = "geometry-sequence__label answer";
      label.textContent = text;
      label.setAttribute("data-answer-index", index);
      labels.appendChild(label);
    });
  }
  function buildOverlay() {
    [["site_boundary", "overlay-site_boundary", "site-boundary"], ["key_areas", "overlay-key_areas", "key-area"], ["phasing", "overlay-phasing", "phasing"]].forEach(function (specification) {
      var group = document.getElementById(specification[1]);
      var layer = layerByName(specification[0]);
      if (!group || !layer) return;
      group.textContent = "";
      layer.features.forEach(function (feature) { var path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", feature[1]); path.setAttribute("class", specification[2]); group.appendChild(path); });
      overlayGroups[specification[0]] = group;
    });
    stationGroup = document.getElementById("overlay-stations");
    if (!stationGroup) {
      stationGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
      stationGroup.id = "overlay-stations";
      stationGroup.setAttribute("id", "overlay-stations");
      stationGroup.setAttribute("class", "station-markers");
      overlay.appendChild(stationGroup);
    }
    buildStationMarkers(stationGroup, data.labels.key_areas || []);
    labels.textContent = "";
    [["key_areas", "area"], ["phasing", "phase"]].forEach(function (specification) {
      (data.labels[specification[0]] || []).forEach(function (entry, index) { var label = document.createElement("span"); label.className = "geometry-sequence__label " + specification[1]; label.textContent = entry.code; label.setAttribute("data-x", entry.x); label.setAttribute("data-y", entry.y); if (specification[0] === "key_areas") label.setAttribute("data-station-index", index); if (specification[0] === "phasing") label.setAttribute("data-phase-index", index); labels.appendChild(label); });
    });
    buildAnswerOverlay();
  }
  function syncAnnotationTargets() {
    var answerActive = current === ANSWER_STATE_INDEX, keyTarget = layerAlpha.key_areas.target, phaseTarget = layerAlpha.phasing.target;
    if (overlayGroups.key_areas) overlayGroups.key_areas.style.opacity = String(keyTarget);
    if (overlayGroups.phasing) overlayGroups.phasing.style.opacity = String(phaseTarget);
    if (overlayGroups.answer) overlayGroups.answer.style.opacity = answerActive ? "1" : "0";
    if (answerLeaderGroup) answerLeaderGroup.style.opacity = answerActive ? "1" : "0";
    if (stationGroup) stationGroup.style.opacity = String(answerActive ? 1 : keyTarget);
    if (stationGroup) Array.prototype.forEach.call(stationGroup.children, function (marker) {
      Array.prototype.forEach.call(marker.children, function (node) {
        if (node.getAttribute("data-station-badge") !== null) node.style.opacity = answerActive ? "1" : "0";
      });
    });
    Array.prototype.forEach.call(labels.children, function (label) {
      var isAnswer = label.className.indexOf(" answer") !== -1;
      label.style.opacity = String(isAnswer ? (answerActive ? 1 : 0) : answerActive ? 0 : label.className.indexOf(" phase") !== -1 ? phaseTarget : keyTarget);
    });
  }
  function beginLayerTransition() {
    var changed = false;
    layerNames.forEach(function (name) {
      var state = layerAlpha[name];
      state.from = state.current; state.target = active(name) ? (current === ANSWER_STATE_INDEX ? ANSWER_LAYER_ALPHA : 1) : 0;
      if (Math.abs(state.current - state.target) > 1e-6) changed = true;
    });
    syncAnnotationTargets();
    if (reduced.matches) {
      layerNames.forEach(function (name) { layerAlpha[name].current = layerAlpha[name].target; layerAlpha[name].from = layerAlpha[name].target; });
      layerTransitionStart = -1; layerTransitioning = false; return;
    }
    layerTransitionStart = -1; layerTransitioning = changed;
  }
  function stepLayerTransition(time) {
    var progress, eased;
    if (!layerTransitioning) return;
    if (layerTransitionStart < 0) layerTransitionStart = time;
    progress = clamp((time - layerTransitionStart) / LAYER_TRANSITION_MS, 0, 1);
    eased = 1 - Math.pow(1 - progress, 3);
    layerNames.forEach(function (name) { var state = layerAlpha[name]; state.current = state.from + (state.target - state.from) * eased; });
    if (progress >= 1) { layerNames.forEach(function (name) { layerAlpha[name].current = layerAlpha[name].target; }); layerTransitionStart = -1; layerTransitioning = false; }
  }
  function drawMap() {
    context.setTransform(mapDpr, 0, 0, mapDpr, 0, 0); context.clearRect(0, 0, mapWidth, mapHeight); context.fillStyle = "#F5F0E6"; context.fillRect(0, 0, mapWidth, mapHeight);
    mapMatrix = applyView(mapFit, mapView); syncLegacyLayerCanvases(); context.save(); useMapTransform(); drawBasemap(); drawLayerStack(); context.restore(); updateOverlayTransform(); drawMapFurniture(); dirty = false;
  }
  function render(time) { raf = 0; if (layerTransitioning) { stepLayerTransition(time || 0); dirty = true; } if (dirty) drawMap(); if (layerTransitioning) raf = window.requestAnimationFrame(render); else if (playing && !timer) advance(); }
  function schedule() { dirty = true; if (!raf) raf = window.requestAnimationFrame(render); }
  function stopPlayback() { if (timer) window.clearTimeout(timer); timer = 0; playing = false; play.textContent = t("play"); play.setAttribute("aria-label", t("play")); play.setAttribute("aria-pressed", "false"); }
  function updateButtons() { var ended = !playing && current >= 7; var label = playing ? t("pause") : ended ? t("replay") : t("play"); play.textContent = label; play.setAttribute("aria-label", label); play.disabled = reduced.matches; play.setAttribute("aria-pressed", String(playing)); play.setAttribute("data-end", String(ended)); }
  function updateStatus() { status.textContent = (language === "zh" ? "固定数据指纹：" : "Fixed data fingerprint: ") + data.sourceFingerprint.slice(0, 12) + (language === "zh" ? " · 横置适配 · 0 px 简化 · 0.5 px 显示量化" : " · long-axis fit · 0 px simplification · 0.5 px display quantization"); root.setAttribute("data-motion", playing ? "moving" : "still"); }
  function updateFrame(announce) {
    var index, answerActive = current === ANSWER_STATE_INDEX;
    root.setAttribute("data-answer-active", String(answerActive));
    frameNo.textContent = answerActive ? (language === "zh" ? "答案 / 09" : "ANSWER / 09") : String(current + 1).padStart(2, "0") + " / 08"; frameTitle.textContent = t("frames")[current][0]; frameBody.textContent = t("frames")[current][1]; previous.disabled = current === 0; next.disabled = answerActive; constraintNote.hidden = current !== 6; constraintNote.textContent = t("frames")[6][1]; finalActions.hidden = current !== 7; finalActions.textContent = current === 7 ? (language === "zh" ? "继续 · 修改 · 停止 · 恢复" : "continue · modify · stop · restore") : ""; if (messageBand) messageBand.hidden = current < 6 || answerActive;
    for (index = 0; index < steps.children.length; index += 1) { if (index === current) steps.children[index].setAttribute("aria-current", "step"); else steps.children[index].removeAttribute("aria-current"); }
    if (announce) live.textContent = frameNo.textContent + " " + frameTitle.textContent + ". " + frameBody.textContent;
    updateStatus(); beginLayerTransition(); schedule();
  }
  function showFrame(index, announce) { stopPlayback(); setFallback("interactive"); current = Math.max(0, Math.min(ANSWER_STATE_INDEX, index)); updateButtons(); updateFrame(announce); }
  function advance() { if (!playing || timer || layerTransitioning) return; timer = window.setTimeout(function () { timer = 0; if (!playing) return; if (current === 7) { timer = window.setTimeout(function () { timer = 0; if (!playing) return; current = ANSWER_STATE_INDEX; updateFrame(true); stopPlayback(); updateButtons(); updateStatus(); }, ANSWER_STATE_DELAY_MS); return; } current += 1; updateFrame(true); if (!layerTransitioning) advance(); }, durations[current]); }
  function startPlayback() { if (reduced.matches) return; if (playing) { stopPlayback(); updateButtons(); updateStatus(); return; } if (current >= 7 || !fallback.hidden) showFrame(0, true); playing = true; updateButtons(); updateStatus(); advance(); }
  function resetCamera() { mapView.panX = 0; mapView.panY = 0; mapView.zoom = 1; schedule(); }
  function zoomBy(factor) { var nextZoom = clamp(mapView.zoom * factor, .72, 4); if (Math.abs(nextZoom - mapView.zoom) < .0001) return false; mapView.zoom = nextZoom; schedule(); return true; }
  function buildSteps() { var index, button; steps.textContent = ""; for (index = 0; index <= ANSWER_STATE_INDEX; index += 1) { button = makeButton("geometry-step-" + String(index + 1)); button.textContent = index === ANSWER_STATE_INDEX ? (language === "zh" ? "答案" : "Answer") : String(index + 1); button.setAttribute("aria-label", index === ANSWER_STATE_INDEX ? (language === "zh" ? "第 9 态，空间答案态" : "State 9, spatial answer") : (language === "zh" ? "第 " + String(index + 1) + " 帧" : "Frame " + String(index + 1))); (function (frame, target) { target.addEventListener("click", function () { showFrame(frame, true); }); }(index, button)); steps.appendChild(button); } }
  function buildLegend() { var item, swatch, label, count; legend.textContent = ""; fallbackLayers.textContent = ""; readings.forEach(function (reading) { item = document.createElement("li"); item.setAttribute("data-reading", reading[0]); swatch = document.createElement("i"); swatch.style.backgroundColor = reading[4]; label = document.createElement("span"); label.textContent = language === "zh" ? reading[1] : reading[2]; count = document.createElement("span"); count.setAttribute("data-reading-value", reading[0]); count.textContent = String(reading[3]); item.appendChild(swatch); item.appendChild(label); item.appendChild(count); legend.appendChild(item); }); data.layers.forEach(function (layer) { item = document.createElement("li"); item.textContent = layer.name + " · " + layer.count; fallbackLayers.appendChild(item); }); }
  function buildAnswerLegend() {
    if (!answerLegend) return;
    answerLegend.textContent = "";
    (language === "zh" ? [["known","已知｜实线／实心"],["provisional","provisional｜虚线"],["unknown",unknownWord() + "｜文字标注"],["m01-responsibility","M01 责任站｜圆靶"],["m01-candidate","M01 空间候选｜菱形"]] : [["known","Known | solid line / fill"],["provisional","provisional | dashed line"],["unknown",unknownWord() + " | text label"],["m01-responsibility","M01 responsibility | target"],["m01-candidate","M01 spatial candidate | diamond"]]).forEach(function (entry) {
      var item = document.createElement("li");
      var symbol = document.createElement("i");
      var label = document.createElement("span");
      item.setAttribute("data-answer-legend", entry[0]);
      symbol.setAttribute("aria-hidden", "true");
      label.textContent = entry[1];
      item.appendChild(symbol);
      item.appendChild(label);
      answerLegend.appendChild(item);
    });
  }
  function installMapControls() {
    if (!staticView || !zoomIn || !zoomOut || !reset) return false;
    zoomIn.addEventListener("click", function () { zoomBy(BUTTON_ZOOM_FACTOR); }); zoomOut.addEventListener("click", function () { zoomBy(1 / BUTTON_ZOOM_FACTOR); }); reset.addEventListener("click", resetCamera);
    staticView.addEventListener("click", function () { stopPlayback(); setFallback("manual"); updateButtons(); updateStatus(); }); return true;
  }
  function applyLanguage() { fallbackImage.src = language === "zh" ? "../assets/figures/site-overview.png" : "../assets/figures/site-overview.en.png"; fallbackImage.alt = language === "zh" ? "图1 范围、双轨与三站答案总图" : "Figure 1 Scope, Two Tracks, and Three Stations"; root.querySelector("[data-text=provisional]").textContent = t("provisional"); root.querySelector("[data-text=previous]").textContent = t("previous"); root.querySelector("[data-text=next]").textContent = t("next"); if (staticView) staticView.textContent = t("staticView"); if (zoomIn) zoomIn.textContent = t("zoomIn"); if (zoomOut) zoomOut.textContent = t("zoomOut"); if (reset) reset.textContent = t("reset"); root.querySelector("[data-text=fallbackText]").textContent = language === "zh" ? "静态图 1 保留为无脚本、运行失败或用户主动选择时的可读后备。" : "Formal Figure 1 remains the readable fallback without scripts, on runtime failure, or when explicitly selected."; restart.textContent = t("restart"); restart.setAttribute("aria-label", t("restart")); buildLegend(); buildAnswerLegend(); updateButtons(); updateFrame(false); }
  function applyMotion() { if (reduced.matches) { stopPlayback(); current = ANSWER_STATE_INDEX; } updateButtons(); updateFrame(false); }
  function syncCanvasSize(target, width, height) { target.width = Math.max(1, Math.round(width * mapDpr)); target.height = Math.max(1, Math.round(height * mapDpr)); target.style.width = width + "px"; target.style.height = height + "px"; }
  function mapSize(force) {
    var bounds = wrap.getBoundingClientRect ? wrap.getBoundingClientRect() : { width: wrap.clientWidth, height: wrap.clientHeight };
    var width = Math.max(1, Math.round(bounds.width || wrap.clientWidth || 1));
    var height = Math.max(1, Math.round(bounds.height || wrap.clientHeight || 1));
    if (!force && Math.abs(width - mapWidth) < 2 && Math.abs(height - mapHeight) < 2) return false;
    mapWidth = width; mapHeight = height; mapDpr = Math.min(2, window.devicePixelRatio || 1); syncCanvasSize(canvas, width, height); syncCanvasSize(basemapCanvas, width, height); syncCanvasSize(highlightCanvas, width, height); overlay.style.width = width + "px"; overlay.style.height = height + "px"; overlay.setAttribute("viewBox", "0 0 " + String(width) + " " + String(height)); mapFit = computeMapFit(layerByName("site_boundary").displayBbox, width, height); mapMatrix = applyView(mapFit, mapView); syncLegacyLayerCanvases(); schedule(); return true;
  }
  function bindMapCamera() {
    wrap.addEventListener("pointerdown", function (event) { if (event.target !== canvas) return; if (event.button !== 0) return; dragging = true; dragId = event.pointerId; dragX = event.clientX; dragY = event.clientY; wrap.setPointerCapture(dragId); root.focus({ preventScroll:true }); });
    wrap.addEventListener("pointermove", function (event) { if (!dragging || event.pointerId !== dragId) return; mapView.panX += event.clientX - dragX; mapView.panY += event.clientY - dragY; dragX = event.clientX; dragY = event.clientY; schedule(); });
    function finish(event) { if (event.pointerId !== dragId) return; dragging = false; if (wrap.hasPointerCapture(dragId)) wrap.releasePointerCapture(dragId); }
    wrap.addEventListener("pointerup", finish); wrap.addEventListener("pointercancel", finish); installCooperativeWheel(wrap, root, function () { return mapHeight; }, zoomBy);
  }
  function onKey(event) { var cameraKey; if (root.classList && root.classList.contains("is-unavailable")) return; if (!root.contains(event.target) || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.altKey || event.ctrlKey || event.metaKey) return; cameraKey = event.key === "+" || event.key === "=" || event.key === "-" || event.key === "r" || event.key === "R"; if (!fallback.hidden && cameraKey) return; if (event.key === "+" || event.key === "=") { event.preventDefault(); zoomBy(BUTTON_ZOOM_FACTOR); } else if (event.key === "-") { event.preventDefault(); zoomBy(1 / BUTTON_ZOOM_FACTOR); } else if (event.key === "r" || event.key === "R") { event.preventDefault(); resetCamera(); } else if (event.key === "ArrowLeft") { event.preventDefault(); showFrame(current - 1, true); } else if (event.key === "ArrowRight") { event.preventDefault(); showFrame(current + 1, true); } }

  function initStage3d() {
    var stage3d = document.getElementById("geometry-stage3d");
    if (!stage3d) return;
    var canvas3d = document.getElementById("geometry-3d-canvas");
    var context3d = canvas3d && canvas3d.getContext("2d");
    var aiButton = document.getElementById("geometry-3d-ai");
    var motionButton = document.getElementById("geometry-3d-motion");
    var zoomIn3d = document.getElementById("geometry-3d-zoom-in");
    var zoomOut3d = document.getElementById("geometry-3d-zoom-out");
    var reset3d = document.getElementById("geometry-3d-reset");
    var status3d = document.getElementById("geometry-3d-status");
    var canvasWrap3d = document.getElementById("geometry-3d-canvas-wrap");
    if (!context3d || !aiButton || !motionButton || !zoomIn3d || !zoomOut3d || !reset3d || !status3d || !canvasWrap3d) return;
  
    var FLOW_SPEED_PX_PER_SECOND = 52;
    var FLOW_ARROW_SPACING_PX = 100;
    var FLOW_MAX_DT_MS = 50;
    var KEYBOARD_PAN_STEP_PX = 24;
    var rootStyle = typeof getComputedStyle === "function" ? getComputedStyle(document.documentElement) : null;
    var stageAccent = rootStyle ? rootStyle.getPropertyValue("--stage-accent").trim() : colors.site_boundary;
    if (!stageAccent) stageAccent = colors.site_boundary;
    var solids = sortSolids(buildSolids());
    if (!solids.length || solids.some(function (solid) { return visibleSideCount(solid.ring) < 1; })) throw new Error("3D solid failed visible-side gate");
    var allFaces = solids.reduce(function (faces, solid) { return faces.concat(buildFaces(solid)); }, []);
    if (allFaces.some(function (face) { return face.alpha !== 1; })) throw new Error("3D solid face is not opaque");
  
    var bounds3d = projectedBounds(solids), fit3d, width3d = 0, height3d = 0, dpr3d = 1;
    var view3d = { panX: 0, panY: 0, zoom: 1 };
    var raf3d = 0, needs3d = true, visible3d = false, playing3d = !reduced.matches;
    var flowOffset3d = 0, lastFlowTime3d = 0, aiOn3d = true, aiLevel = 1;
    var transitionStart = -1, transitionFrom = 1, transitionTo = 1;
    var dragging3d = false, dragId3d = 0, dragX3d = 0, dragY3d = 0;
    var touchMode3d = "", touchStartX3d = 0, touchStartY3d = 0, touchLastX3d = 0;
    var pinchDistance3d = 0, pinchCenterX3d = 0, pinchCenterY3d = 0;
    var pinchZoom3d = 1, pinchPanX3d = 0, pinchPanY3d = 0;
    var groundLayers = { land_use: true, green_space: true, public_space: true, roads: true, site_boundary: true };
  
    function logicalContext3d() { context3d.setTransform(dpr3d, 0, 0, dpr3d, 0, 0); }
    function isoMatrix3d() {
      var scale = fit3d.scale * view3d.zoom;
      var centerX = width3d / 2, centerY = height3d / 2;
      var offsetX = centerX + view3d.panX + (fit3d.offsetX - centerX) * view3d.zoom;
      var offsetY = centerY + view3d.panY + (fit3d.offsetY - centerY) * view3d.zoom;
      return { a: COS30 * scale, b: -.5 * scale, c: -COS30 * scale, d: -.5 * scale, e: offsetX, f: offsetY, scale: scale };
    }
    function drawGroundLayer(name, fill, stroke, width) {
      var list = paths[name], matrix = isoMatrix3d(), index;
      if (!list || !groundLayers[name]) return;
      context3d.save();
      context3d.setTransform(dpr3d * matrix.a, dpr3d * matrix.b, dpr3d * matrix.c, dpr3d * matrix.d, dpr3d * matrix.e, dpr3d * matrix.f);
      context3d.globalAlpha = 1;
      context3d.lineJoin = "round";
      context3d.lineCap = "round";
      context3d.lineWidth = (width || 1) / matrix.scale;
      if (fill) context3d.fillStyle = fill;
      if (stroke) context3d.strokeStyle = stroke;
      for (index = 0; index < list.length; index += 1) {
        if (fill) context3d.fill(list[index], "evenodd");
        if (stroke) context3d.stroke(list[index]);
      }
      context3d.restore();
    }
    function drawGround3d() {
      readings.forEach(function (reading) {
        var original = paths.land_use[reading[0]], matrix = isoMatrix3d();
        context3d.save();
        context3d.setTransform(dpr3d * matrix.a, dpr3d * matrix.b, dpr3d * matrix.c, dpr3d * matrix.d, dpr3d * matrix.e, dpr3d * matrix.f);
        context3d.fillStyle = shade(reading[4], .62);
        context3d.strokeStyle = "#16314D";
        context3d.lineWidth = .5 / matrix.scale;
        context3d.globalAlpha = 1;
        original.forEach(function (path) { context3d.fill(path, "evenodd"); context3d.stroke(path); });
        context3d.restore();
      });
      drawGroundLayer("green_space", "#315F4A", "#8AB39B", .7);
      drawGroundLayer("public_space", "#78622D", "#E3C66D", .7);
      drawGroundLayer("roads", null, "#E6E1D6", 1.25);
      drawGroundLayer("site_boundary", null, stageAccent, 1.7);
    }
    function faceScreenPoints(face) { return face.points.map(function (point) { return projectToScreen(fit3d, view3d, point); }); }
    function drawFace(face) {
      var points = faceScreenPoints(face), index;
      logicalContext3d();
      context3d.save();
      context3d.globalAlpha = 1;
      context3d.fillStyle = face.color;
      context3d.strokeStyle = shade(face.color, .72);
      context3d.lineWidth = .7;
      context3d.beginPath();
      context3d.moveTo(points[0].x, points[0].y);
      for (index = 1; index < points.length; index += 1) context3d.lineTo(points[index].x, points[index].y);
      context3d.closePath();
      context3d.fill();
      context3d.stroke();
      context3d.restore();
    }
  
    /* One cumulative screen-space table preserves spacing through every bend. */
    function screenSpineMetrics3d() {
      var points = [], index;
      for (index = 0; index < spine.length; index += 2) {
        points.push(projectToScreen(fit3d, view3d, projectIso(spine[index], spine[index + 1], 8)));
      }
      return buildArcMetrics(points);
    }
    function drawAi3d() {
      var flowLevel = clamp((aiLevel - .55) / .45, 0, 1), glowLevel = clamp(aiLevel / .55, 0, 1);
      var metrics = screenSpineMetrics3d(), distance, sample, keyLayer = layerByName("key_areas");
      logicalContext3d();
      if (flowLevel > 0 && metrics.totalLength > 0) {
        context3d.save();
        context3d.fillStyle = "#F4D38D";
        context3d.globalAlpha = .24 + .76 * flowLevel;
        for (distance = flowOffset3d - FLOW_ARROW_SPACING_PX; distance <= metrics.totalLength; distance += FLOW_ARROW_SPACING_PX) {
          if (distance < 0) continue;
          sample = pointAtArcLength(metrics, distance);
          if (!sample) continue;
          context3d.save();
          context3d.translate(sample.x, sample.y);
          context3d.rotate(sample.angle);
          context3d.beginPath();
          context3d.moveTo(7, 0);
          context3d.lineTo(-5, -4);
          context3d.lineTo(-2, 0);
          context3d.lineTo(-5, 4);
          context3d.closePath();
          context3d.fill();
          context3d.restore();
        }
        context3d.restore();
      }
      if (glowLevel > 0 && keyLayer) {
        context3d.save();
        context3d.strokeStyle = stageAccent;
        context3d.lineWidth = 2.4;
        context3d.shadowColor = stageAccent;
        context3d.shadowBlur = 16;
        context3d.globalAlpha = .22 + .7 * glowLevel;
        keyLayer.features.forEach(function (feature) {
          var ring = parseRings(feature[1])[0];
          var centroid = ring.reduce(function (sum, point) { sum.x += point[0]; sum.y += point[1]; return sum; }, { x:0, y:0 });
          centroid.x /= ring.length;
          centroid.y /= ring.length;
          var point = projectToScreen(fit3d, view3d, projectIso(centroid.x, centroid.y, 30));
          context3d.beginPath();
          context3d.arc(point.x, point.y, 12, 0, Math.PI * 2);
          context3d.stroke();
        });
        context3d.restore();
      }
    }
    function update3dStatus() {
      var moving = playing3d && aiLevel > 0 && !reduced.matches;
      stage3d.setAttribute("data-ai", aiOn3d ? "on" : "off");
      stage3d.setAttribute("data-motion", moving ? "moving" : "still");
      aiButton.textContent = language === "zh" ? (aiOn3d ? "关闭 AI" : "开启 AI") : (aiOn3d ? "Switch AI off" : "Switch AI on");
      aiButton.setAttribute("aria-pressed", String(!aiOn3d));
      motionButton.textContent = language === "zh" ? (playing3d ? "暂停流光" : "播放流光") : (playing3d ? "Pause flow" : "Play flow");
      motionButton.setAttribute("aria-pressed", String(playing3d));
      motionButton.disabled = reduced.matches;
      status3d.textContent = !aiOn3d && transitionFrom === transitionTo ? t("offStatus") : t("touchHint");
    }
    function draw3d() {
      logicalContext3d();
      context3d.clearRect(0, 0, width3d, height3d);
      context3d.fillStyle = "#071A31";
      context3d.fillRect(0, 0, width3d, height3d);
      drawGround3d();
      solids.forEach(function (solid) { buildFaces(solid).forEach(drawFace); });
      drawAi3d();
      needs3d = false;
    }
    function transitionActive(time) {
      if (transitionFrom === transitionTo) return false;
      if (transitionStart < 0) transitionStart = time;
      var progress = clamp((time - transitionStart) / 800, 0, 1);
      aiLevel = transitionFrom + (transitionTo - transitionFrom) * progress;
      if (progress >= 1) { transitionFrom = transitionTo; aiLevel = transitionTo; transitionStart = -1; update3dStatus(); }
      return progress < 1;
    }
    function render3d(time) {
      var now = time || 0, dt = 0;
      raf3d = 0;
      var transitioning = transitionActive(now);
      stage3d.setAttribute("data-motion", playing3d && aiLevel > 0 && !reduced.matches ? "moving" : "still");
      if (playing3d && aiLevel > 0 && !reduced.matches) {
        if (lastFlowTime3d > 0) dt = Math.min(FLOW_MAX_DT_MS, Math.max(0, now - lastFlowTime3d));
        lastFlowTime3d = now;
        flowOffset3d = advanceFlowOffset(flowOffset3d, dt, FLOW_SPEED_PX_PER_SECOND, FLOW_ARROW_SPACING_PX, FLOW_MAX_DT_MS);
      } else {
        lastFlowTime3d = 0;
      }
      draw3d();
      if (visible3d && (transitioning || (playing3d && aiLevel > 0 && !reduced.matches))) raf3d = window.requestAnimationFrame(render3d);
    }
    function schedule3d() { needs3d = true; if (visible3d && !raf3d) raf3d = window.requestAnimationFrame(render3d); }
    function schedule3dForce() { needs3d = true; if (!raf3d) raf3d = window.requestAnimationFrame(render3d); }
    function resize3d(force) {
      var box = canvasWrap3d.getBoundingClientRect ? canvasWrap3d.getBoundingClientRect() : { width: canvasWrap3d.clientWidth, height: canvasWrap3d.clientHeight };
      var width = Math.max(320, Math.round(box.width || canvasWrap3d.clientWidth || 1000));
      var height = Math.max(380, Math.round(box.height || canvasWrap3d.clientHeight || 620));
      if (!force && Math.abs(width - width3d) < 2 && Math.abs(height - height3d) < 2) return false;
      width3d = width;
      height3d = height;
      dpr3d = Math.min(2, window.devicePixelRatio || 1);
      canvas3d.width = Math.round(width * dpr3d);
      canvas3d.height = Math.round(height * dpr3d);
      fit3d = computeProjectedFit(bounds3d, width, height);
      if (fit3d.occupancy < .86) throw new Error("3D fit width occupancy below 0.86");
      schedule3d();
      return true;
    }
    function setAi3d() {
      aiOn3d = !aiOn3d;
      transitionFrom = aiLevel;
      transitionTo = aiOn3d ? 1 : 0;
      transitionStart = -1;
      if (reduced.matches) { aiLevel = transitionTo; transitionFrom = transitionTo; }
      update3dStatus();
      schedule3dForce();
    }
    function setMotion3d() {
      if (reduced.matches) return;
      playing3d = !playing3d;
      lastFlowTime3d = 0;
      update3dStatus();
      schedule3dForce();
    }
    function resetView3d() { view3d.panX = 0; view3d.panY = 0; view3d.zoom = 1; schedule3dForce(); }
    function zoom3d(factor) {
      var previous = view3d.zoom;
      var next = clamp(previous * factor, .72, 4);
      if (Math.abs(next - previous) < .000001) return false;
      view3d.zoom = next;
      schedule3dForce();
      return true;
    }
    function syncReduced3d() {
      if (reduced.matches) {
        playing3d = false;
        flowOffset3d = 0;
        lastFlowTime3d = 0;
        aiLevel = transitionTo;
        transitionFrom = transitionTo;
        transitionStart = -1;
      }
      update3dStatus();
      schedule3dForce();
    }
    function onKey3d(event) {
      if (!stage3d.contains(event.target) || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "+" || event.key === "=") { event.preventDefault(); zoom3d(BUTTON_ZOOM_FACTOR); }
      else if (event.key === "-") { event.preventDefault(); zoom3d(1 / BUTTON_ZOOM_FACTOR); }
      else if (event.key === "r" || event.key === "R") { event.preventDefault(); resetView3d(); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); view3d.panX -= KEYBOARD_PAN_STEP_PX; schedule3dForce(); }
      else if (event.key === "ArrowRight") { event.preventDefault(); view3d.panX += KEYBOARD_PAN_STEP_PX; schedule3dForce(); }
      else if (event.key === "ArrowUp") { event.preventDefault(); view3d.panY -= KEYBOARD_PAN_STEP_PX; schedule3dForce(); }
      else if (event.key === "ArrowDown") { event.preventDefault(); view3d.panY += KEYBOARD_PAN_STEP_PX; schedule3dForce(); }
    }
  
    function beginSingleTouch3d(touch) {
      touchMode3d = "pending";
      touchStartX3d = touch.clientX;
      touchStartY3d = touch.clientY;
      touchLastX3d = touch.clientX;
    }
    function beginPinch3d(touches) {
      var first = touches[0], second = touches[1];
      var dx = second.clientX - first.clientX, dy = second.clientY - first.clientY;
      var box = canvasWrap3d.getBoundingClientRect();
      touchMode3d = "pinch";
      pinchDistance3d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      pinchCenterX3d = (first.clientX + second.clientX) / 2 - box.left;
      pinchCenterY3d = (first.clientY + second.clientY) / 2 - box.top;
      pinchZoom3d = view3d.zoom;
      pinchPanX3d = view3d.panX;
      pinchPanY3d = view3d.panY;
    }
    function resetTouch3d(event) {
      if (event && event.touches && event.touches.length === 1) beginSingleTouch3d(event.touches[0]);
      else { touchMode3d = ""; pinchDistance3d = 0; }
    }
    function onTouchStart3d(event) {
      if (event.target !== canvas3d) return;
      if (event.touches.length >= 2) {
        if (event.cancelable) event.preventDefault();
        beginPinch3d(event.touches);
      } else if (event.touches.length === 1) {
        beginSingleTouch3d(event.touches[0]);
      }
    }
    function onTouchMove3d(event) {
      var touch, totalX, totalY, first, second, dx, dy, distance, centerX, centerY, box, nextZoom, nextView;
      if (event.touches.length >= 2) {
        if (event.cancelable) event.preventDefault();
        first = event.touches[0];
        second = event.touches[1];
        dx = second.clientX - first.clientX;
        dy = second.clientY - first.clientY;
        distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        box = canvasWrap3d.getBoundingClientRect();
        centerX = (first.clientX + second.clientX) / 2 - box.left;
        centerY = (first.clientY + second.clientY) / 2 - box.top;
        if (touchMode3d !== "pinch") beginPinch3d(event.touches);
        else {
          nextZoom = clamp(pinchZoom3d * distance / pinchDistance3d, .72, 4);
          nextView = anchoredPinchView(pinchZoom3d, pinchPanX3d, pinchPanY3d, pinchCenterX3d, pinchCenterY3d, centerX, centerY, nextZoom, width3d, height3d);
          view3d.zoom = nextView.zoom;
          view3d.panX = nextView.panX;
          view3d.panY = nextView.panY;
          schedule3dForce();
        }
        return;
      }
      if (event.touches.length !== 1) return;
      touch = event.touches[0];
      if (touchMode3d === "pinch" || !touchMode3d) beginSingleTouch3d(touch);
      totalX = touch.clientX - touchStartX3d;
      totalY = touch.clientY - touchStartY3d;
      if (touchMode3d === "pending" && Math.max(Math.abs(totalX), Math.abs(totalY)) >= 8) {
        touchMode3d = Math.abs(totalX) > Math.abs(totalY) ? "horizontal" : "vertical";
      }
      if (touchMode3d === "horizontal") {
        if (event.cancelable) event.preventDefault();
        view3d.panX += touch.clientX - touchLastX3d;
        schedule3dForce();
      }
      touchLastX3d = touch.clientX;
    }
  
    aiButton.addEventListener("click", setAi3d);
    motionButton.addEventListener("click", setMotion3d);
    zoomIn3d.addEventListener("click", function () { zoom3d(BUTTON_ZOOM_FACTOR); });
    zoomOut3d.addEventListener("click", function () { zoom3d(1 / BUTTON_ZOOM_FACTOR); });
    reset3d.addEventListener("click", resetView3d);
    stage3d.addEventListener("keydown", onKey3d);
    canvasWrap3d.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch" || event.target !== canvas3d || event.button !== 0) return;
      dragging3d = true;
      dragId3d = event.pointerId;
      dragX3d = event.clientX;
      dragY3d = event.clientY;
      canvasWrap3d.setPointerCapture(dragId3d);
      canvasWrap3d.focus({ preventScroll:true });
    });
    canvasWrap3d.addEventListener("pointermove", function (event) {
      if (!dragging3d || event.pointerId !== dragId3d) return;
      view3d.panX += event.clientX - dragX3d;
      view3d.panY += event.clientY - dragY3d;
      dragX3d = event.clientX;
      dragY3d = event.clientY;
      schedule3d();
    });
    function finish3d(event) {
      if (event.pointerId !== dragId3d) return;
      dragging3d = false;
      if (canvasWrap3d.hasPointerCapture(dragId3d)) canvasWrap3d.releasePointerCapture(dragId3d);
    }
    canvasWrap3d.addEventListener("pointerup", finish3d);
    canvasWrap3d.addEventListener("pointercancel", finish3d);
    canvasWrap3d.addEventListener("lostpointercapture", function (event) { if (event.pointerId === dragId3d) dragging3d = false; });
    canvasWrap3d.addEventListener("touchstart", onTouchStart3d, { passive:false });
    canvasWrap3d.addEventListener("touchmove", onTouchMove3d, { passive:false });
    canvasWrap3d.addEventListener("touchend", resetTouch3d, { passive:true });
    canvasWrap3d.addEventListener("touchcancel", resetTouch3d, { passive:true });
    installCooperativeWheel(canvasWrap3d, canvasWrap3d, function () { return height3d; }, zoom3d);
  
    resize3d(true);
    stage3d.hidden = false;
    update3dStatus();
    window.setTimeout(schedule3dForce, 1400);
    if (typeof reduced.addEventListener === "function") reduced.addEventListener("change", syncReduced3d);
    else reduced.addListener(syncReduced3d);
    if ("IntersectionObserver" in window) {
      var observer3d = new window.IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible3d = entry.isIntersecting;
          if (visible3d) { resize3d(false); schedule3d(); }
          else {
            lastFlowTime3d = 0;
            if (raf3d) { window.cancelAnimationFrame(raf3d); raf3d = 0; }
          }
        });
      }, { rootMargin:"240px 0px" });
      observer3d.observe(stage3d);
    } else {
      visible3d = true;
      schedule3d();
    }
    if ("ResizeObserver" in window) {
      var resizeObserver3d = new window.ResizeObserver(function () { resize3d(false); });
      resizeObserver3d.observe(canvasWrap3d);
    } else {
      window.addEventListener("resize", function () { resize3d(false); }, { passive:true });
    }
  }

  try {
    if (!context || typeof Path2D !== "function") throw new Error("Canvas path support unavailable");
    canvas.style.visibility = "visible"; document.getElementById("geometry-basemap").style.display = "none"; document.getElementById("geometry-highlight").style.display = "none"; overlay.style.display = "block"; root.tabIndex = 0;
    buildPaths(); buildOverlay(); buildSteps(); buildLegend(); installMapControls(); mapSize(true);
    previous.addEventListener("click", function () { showFrame(current - 1, true); }); next.addEventListener("click", function () { showFrame(current === ANSWER_STATE_INDEX ? 1 : current + 1, true); }); play.addEventListener("click", startPlayback); restart.addEventListener("click", function () { showFrame(0, true); play.focus({ preventScroll:true }); }); document.addEventListener("keydown", onKey); bindMapCamera();
    if (typeof reduced.addEventListener === "function") reduced.addEventListener("change", applyMotion); else reduced.addListener(applyMotion);
    if ("ResizeObserver" in window) { var resizeObserver = new window.ResizeObserver(function () { mapSize(false); }); resizeObserver.observe(wrap); } else window.addEventListener("resize", function () { mapSize(false); }, { passive:true });
    applyLanguage(); applyMotion();
    try { initStage3d(); } catch (stageError) { var failedStage = document.getElementById("geometry-stage3d"); if (failedStage) failedStage.hidden = true; }
  } catch (error) {
    stopPlayback(); if (raf) window.cancelAnimationFrame(raf); raf = 0; setFallback("unavailable"); var unavailableStage = document.getElementById("geometry-stage3d"); if (unavailableStage) unavailableStage.hidden = true;
  }
}());
