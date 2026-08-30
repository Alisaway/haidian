/* draw_map.js — 从 geojson 现场绘制的矢量制图模块
 * -------------------------------------------------------------------------
 * 依赖（同目录、全部本地）：data/geo_layers.js、geo_core.js
 * 挂载点：window.CA_draw(containerEl, view, options) -> {svg, ...}
 *
 * 设计约定：
 *   1. 本模块只负责「把 geojson 画成 SVG」，不负责页面版式、动效与主题。
 *      尺寸、配色、是否画图例/比例尺/指北针，全部由调用方通过 options 决定。
 *   2. 所有默认值都可被 options 覆盖；不写死任何页面级样式，不改动容器以外的 DOM。
 *   3. 坐标先用 geo_core 投影到 EPSG:4548（米），再等比线性映射到视口，
 *      因此比例尺是按投影后的真实米数标注的，不是按经纬度粗算的。
 *   4. provisional（临时/粗略）几何一律降级表达为虚线，并在图例中注明。
 *
 * 无网络访问、无外部字体、无第三方库。
 */
(function (root) {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";

  /* ---------- 默认配色：国铁绿 / 黄铜 ---------- */
  var DEFAULT_PALETTE = {
    brand: "#2F6B4F", // 国铁绿
    brass: "#A8763E", // 黄铜
    ink: "#1F2A24",
    muted: "#8A9A92",
    water: "#3E6E86",
    line: "#2F6B4F"
  };

  /* ---------- 视图定义：每个视图显式列出用到的图层 ---------- */
  var VIEWS = {
    overview: {
      title_zh: "总览地图", title_en: "Overview map",
      layers: ["site_boundary", "green_space", "public_space", "roads", "key_areas"]
    },
    tiers: {
      title_zh: "三层范围", title_en: "Three-tier scope",
      layers: ["site_boundary", "key_areas", "roads"]
    },
    key_areas: { title_zh: "重点区域", title_en: "Key areas", layers: ["site_boundary", "key_areas"] },
    land_use: { title_zh: "用地分区", title_en: "Land-use zoning", layers: ["site_boundary", "land_use"] },
    mobility: { title_zh: "交通慢行", title_en: "Mobility & slow traffic", layers: ["site_boundary", "roads"] },
    bluegreen: {
      title_zh: "蓝绿公共空间", title_en: "Blue-green & public space",
      layers: ["site_boundary", "green_space", "public_space"]
    },
    buildings: {
      title_zh: "建筑", title_en: "Buildings",
      layers: ["site_boundary", "public_space", "buildings"]
    },
    renewal: {
      /* 更新项目 = 本方案实际落地的空间载体：公共空间节点 + 新建/改造建筑 */
      title_zh: "更新项目", title_en: "Renewal projects",
      layers: ["site_boundary", "key_areas", "public_space", "buildings"]
    },
    phasing: { title_zh: "分期", title_en: "Phasing", layers: ["site_boundary", "phasing", "roads"] }
  };

  /* ---------- 图层缺省画法 ---------- */
  function defaultStyles(p) {
    return {
      site_boundary: {
        fill: "none",
        stroke: p.ink,
        strokeWidth: 1.6,
        dash: "7 4",
        z: 90
      },
      key_areas: {
        fill: p.brass,
        fillOpacity: 0.12,
        stroke: p.brass,
        strokeWidth: 1.4,
        dash: "5 3",
        z: 60
      },
      land_use: { fillOpacity: 0.72, stroke: "#ffffff", strokeWidth: 0.6, z: 10 },
      green_space: {
        fill: p.brand,
        fillOpacity: 0.55,
        stroke: p.brand,
        strokeWidth: 0.8,
        z: 20
      },
      public_space: {
        fill: p.brass,
        fillOpacity: 0.85,
        stroke: p.brass,
        strokeWidth: 0.9,
        z: 40
      },
      buildings: { fill: p.ink, fillOpacity: 0.9, stroke: p.ink, strokeWidth: 0.6, z: 50 },
      roads: { fill: "none", stroke: p.line, strokeWidth: 2, z: 70 },
      phasing: { fillOpacity: 0.45, stroke: "#ffffff", strokeWidth: 0.8, z: 15 },
      constraints: { fill: "none", stroke: p.muted, strokeWidth: 1, dash: "3 3", z: 80 }
    };
  }

  /* 用地代码 -> 颜色与中文名（GB/T 21010 大类口径，仅用于图面区分） */
  /* 用地代码与中文名以正文口径为准：文化(0803)、商业(0901)、科研(0802)、居住(0701)、
     科教(0804)、商务(0902)、公园绿地(1401)、防护/滨水绿地(1402)、留白(16)。
     参见 proposal.md「用地、建筑规模与拆改留方案」一节与 land_use.geojson 各要素 name_zh。 */
  var LAND_USE_CLASS = {
    "0701": { color: "#C9AE86", label: "居住用地", label_en: "Residential" },
    "0802": { color: "#5C7C9E", label: "科研用地", label_en: "Research" },
    "0803": { color: "#8B6FA8", label: "文化用地", label_en: "Cultural" },
    "0804": { color: "#7FA0B8", label: "科教用地", label_en: "Education & science" },
    "0901": { color: "#C2607A", label: "商业用地", label_en: "Commercial" },
    "0902": { color: "#9E6350", label: "商务金融用地", label_en: "Business & finance" },
    "1401": { color: "#2F6B4F", label: "公园绿地", label_en: "Park green space" },
    "1402": { color: "#3E6E86", label: "防护/滨水绿地", label_en: "Buffer / waterfront green" },
    "16": { color: "#B9BAB0", label: "留白用地", label_en: "Reserved blank land" }
  };

  var PHASE_CLASS = {
    phase_1: { color: "#2F6B4F", label: "一期", label_en: "Phase 1" },
    phase_2: { color: "#A8763E", label: "二期", label_en: "Phase 2" },
    phase_3: { color: "#6E7F76", label: "三期", label_en: "Phase 3" }
  };

  var ROAD_CLASS = {
    greenway: { color: "#2F6B4F", label: "慢行主线", label_en: "Main slow-mobility line", width: 2.6 },
    cycleway: { color: "#A8763E", label: "低速物流/自行车", label_en: "Low-speed logistics / cycle", width: 1.8 },
    pedestrian: { color: "#3E6E86", label: "东西向缝合步行线", label_en: "East-west suture walkway", width: 1.6 }
  };

  /* ---------- 工具 ---------- */
  function el(name, attrs, parent) {
    var node = document.createElementNS(NS, name);
    if (attrs) {
      for (var k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] !== null && attrs[k] !== undefined) {
          node.setAttribute(k, String(attrs[k]));
        }
      }
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var src = arguments[i];
      if (!src) continue;
      for (var k in src) {
        if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
      }
    }
    return target;
  }

  function isProvisional(props) {
    if (!props) return false;
    return (
      props.official_boundary === false ||
      props.boundary_precision === "provisional_rough" ||
      props.geometry_role === "provisional_constraint" ||
      props.concept === true
    );
  }

  function featureClass(layerName, props) {
    if (layerName === "land_use") return LAND_USE_CLASS[props.land_use_code] || null;
    if (layerName === "green_space") return LAND_USE_CLASS[props.land_use_code] || null;
    if (layerName === "phasing") return PHASE_CLASS[props.phase] || null;
    if (layerName === "roads") return ROAD_CLASS[props.road_class] || null;
    return null;
  }

  /* ---------- 主函数 ---------- */
  function draw(container, view, options) {
    if (!container) throw new Error("CA_draw: 需要一个容器元素");
    var geo = root.CA_geo;
    var data = root.CA_GEO_DATA;
    if (!geo || !data) throw new Error("CA_draw: 请先加载 geo_core.js 与 data/geo_layers.js");

    var opt = options || {};
    var lang = opt.lang === "en" ? "en" : "zh";
    var T = lang === "en" ? TEXT.en : TEXT.zh;
    var palette = assign({}, DEFAULT_PALETTE, opt.palette);
    var styles = assign({}, defaultStyles(palette), opt.styles);

    var spec = typeof view === "string" ? VIEWS[view] : null;
    var layerNames = spec ? spec.layers.slice() : null;
    if (!layerNames && Array.isArray(view)) layerNames = view.slice();
    if (!layerNames && typeof view === "string" && data.layers[view]) layerNames = [view];
    if (!layerNames) throw new Error("CA_draw: 未知视图 " + view);

    var width = opt.width || container.clientWidth || 900;
    var pad = opt.padding === undefined ? 26 : opt.padding;
    /* 走廊型场地南北长约 9.7 公里、东西宽约 1.3 公里；rotate: 0 | 90 | -90
       允许调用方把长卷横过来做带状图（比例尺与指北针会同步旋转）。 */
    var rotate = opt.rotate === 90 ? 90 : opt.rotate === -90 ? -90 : 0;

    /* 1. 收集要素并投影 */
    var items = [];
    for (var li = 0; li < layerNames.length; li++) {
      var name = layerNames[li];
      var layer = data.layers[name];
      /* 图层名拼错就直接报错，不静默画一张空图 */
      if (!layer || !layer.features) throw new Error("CA_draw: 未知图层 " + name);
      for (var fi = 0; fi < layer.features.length; fi++) {
        var f = layer.features[fi];
        if (!f.geometry) continue;
        items.push({ layer: name, feature: f, props: f.properties || {} });
      }
    }
    /* constraints 图层按数据缺口声明为空是合法状态：画一张只有取景与制图配件的空图，
       并在返回值里标 empty=true，由调用方决定怎么提示。fitTo:"view" 时无框可取，才报错。 */
    if (!items.length && opt.fitTo === "view") {
      throw new Error("CA_draw: 视图 " + view + " 没有要素，无法用 fitTo:\"view\" 取景");
    }

    /* 2. 建立 投影米 -> 视口 的等比映射（以整个包的场地边界为默认取景框） */
    var frameGeoms = [];
    var frameSource = opt.fitTo === "view" ? items : null;
    if (frameSource) {
      for (var i2 = 0; i2 < frameSource.length; i2++) frameGeoms.push(frameSource[i2].feature.geometry);
    } else {
      var sb = data.layers.site_boundary;
      for (var i3 = 0; i3 < sb.features.length; i3++) frameGeoms.push(sb.features[i3].geometry);
      for (var i4 = 0; i4 < items.length; i4++) frameGeoms.push(items[i4].feature.geometry);
    }
    var box = projectedBBox(geo, frameGeoms, rotate);
    var spanX = box[2] - box[0];
    var spanY = box[3] - box[1];
    /* 调用方不指定高度时，按数据本身的长宽比给出自然高度（夹在 0.4—4 倍宽度之间），
       避免线性走廊被塞进一个横向画框后只剩一条细缝。 */
    var height = opt.height || Math.round(width * Math.min(4, Math.max(0.4, spanY / spanX)));
    var scale = Math.min((width - 2 * pad) / spanX, (height - 2 * pad) / spanY);
    var offX = (width - spanX * scale) / 2;
    var offY = (height - spanY * scale) / 2;

    function toXY(lonlat) {
      var p = rotatePoint(geo.projectLonLat(lonlat[0], lonlat[1]), rotate);
      return [offX + (p[0] - box[0]) * scale, height - (offY + (p[1] - box[1]) * scale)];
    }

    /* 3. 建 SVG */
    var svg = el("svg", {
      viewBox: "0 0 " + width + " " + height,
      width: opt.svgWidth || "100%",
      height: opt.svgHeight || null,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": opt.ariaLabel || viewTitle(spec, lang, view),
      "data-ca-view": typeof view === "string" ? view : "custom"
    });
    if (opt.className) svg.setAttribute("class", opt.className);
    if (opt.background) el("rect", { x: 0, y: 0, width: width, height: height, fill: opt.background }, svg);

    var titleNode = el("title", {}, svg);
    titleNode.textContent = opt.ariaLabel || viewTitle(spec, lang, view);

    /* 4. 按 z 序绘制 */
    items.sort(function (a, b) {
      var za = (styles[a.layer] && styles[a.layer].z) || 0;
      var zb = (styles[b.layer] && styles[b.layer].z) || 0;
      return za - zb;
    });

    var legend = [];
    var legendSeen = {};
    var groups = {};

    for (var k = 0; k < items.length; k++) {
      var it = items[k];
      var st = styles[it.layer] || {};
      var cls = featureClass(it.layer, it.props);
      var prov = isProvisional(it.props);
      var g = groups[it.layer];
      if (!g) {
        g = el("g", { "data-layer": it.layer }, svg);
        groups[it.layer] = g;
      }
      var stroke = st.stroke || (cls ? cls.color : palette.ink);
      var fill = st.fill !== undefined ? st.fill : cls ? cls.color : palette.brand;
      var strokeWidth = cls && cls.width ? cls.width : st.strokeWidth || 1;
      var dash = prov ? st.dash || "6 4" : st.dash || null;

      var geomType = it.feature.geometry.type;
      var d = pathData(it.feature.geometry, toXY);
      if (!d) continue;
      var node = el(
        "path",
        {
          d: d,
          fill: geomType === "LineString" || geomType === "MultiLineString" ? "none" : fill,
          "fill-opacity": st.fillOpacity === undefined ? 1 : st.fillOpacity,
          stroke: stroke,
          "stroke-width": strokeWidth,
          "stroke-dasharray": dash,
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          "data-feature-id": it.feature.id || it.props.id || "",
          "data-layer": it.layer,
          "data-provisional": prov ? "true" : "false"
        },
        g
      );
      if (opt.minMarkerPx) {
        var sb2 = screenBBox(it.feature.geometry, toXY);
        if (sb2 && Math.max(sb2[2] - sb2[0], sb2[3] - sb2[1]) < opt.minMarkerPx) {
          el(
            "circle",
            {
              cx: ((sb2[0] + sb2[2]) / 2).toFixed(2),
              cy: ((sb2[1] + sb2[3]) / 2).toFixed(2),
              r: (opt.minMarkerPx / 2).toFixed(2),
              fill: fill === "none" ? stroke : fill,
              "fill-opacity": st.fillOpacity === undefined ? 1 : st.fillOpacity,
              stroke: stroke,
              "stroke-width": strokeWidth,
              "data-marker": "true",
              "data-layer": it.layer,
              "data-feature-id": it.feature.id || ""
            },
            g
          );
        }
      }
      var nm = it.props.name_zh || it.feature.id || it.layer;
      var tt = el("title", {}, node);
      tt.textContent = nm + (prov ? T.provisionalTag : "");

      var clsLabel = cls ? (lang === "en" && cls.label_en ? cls.label_en : cls.label) : null;
      var key = cls ? it.layer + "/" + clsLabel : it.layer;
      if (!legendSeen[key]) {
        legendSeen[key] = true;
        legend.push({
          layer: it.layer,
          label: clsLabel || layerLabel(it.layer, lang),
          color: cls ? cls.color : fill === "none" ? stroke : fill,
          dashed: !!dash,
          line: geomType === "LineString" || geomType === "MultiLineString" || fill === "none"
        });
      }
    }

    /* 5. 制图配件（可关） */
    var showLegend = opt.legend !== false;
    var showScale = opt.scaleBar !== false;
    var showNorth = opt.northArrow !== false;
    var fontFamily = opt.fontFamily || 'system-ui,"Noto Sans CJK SC","Microsoft YaHei",sans-serif';
    var annoColor = opt.annotationColor || palette.ink;

    var legendPos = opt.legendPosition || { x: pad, y: pad };
    if (showLegend && legend.length)
      drawLegend(svg, legend, { x: legendPos.x, y: legendPos.y, font: fontFamily, color: annoColor });
    if (showScale) drawScaleBar(svg, { width: width, height: height, pad: pad, scale: scale, font: fontFamily, color: annoColor });
    /* 指北针跟随 rotate：地图逆时针转 90 度时北在屏幕右侧 */
    if (showNorth)
      drawNorth(svg, { width: width, pad: pad, color: annoColor, font: fontFamily, label: T.north, angle: rotate });

    var hasProvisional = items.some(function (x) {
      return isProvisional(x.props);
    });
    if (hasProvisional && opt.provisionalNote !== false) {
      var note = el(
        "text",
        {
          x: pad,
          y: height - pad + 12,
          "font-size": opt.fontSize || 10,
          "font-family": fontFamily,
          fill: opt.mutedColor || palette.muted
        },
        svg
      );
      note.textContent = T.provisionalNote;
    }

    if (opt.replace !== false) container.innerHTML = "";
    container.appendChild(svg);

    return {
      svg: svg,
      view: typeof view === "string" ? view : "custom",
      title_zh: spec ? spec.title_zh : null,
      title_en: spec ? spec.title_en : null,
      lang: lang,
      width: width,
      height: height,
      layers: layerNames,
      featureCount: items.length,
      empty: items.length === 0,
      legend: legend,
      rotate: rotate,
      metersPerPixel: 1 / scale,
      projectedBBox: box,
      hasProvisional: hasProvisional
    };
  }

  var LAYER_LABELS = {
    zh: {
      site_boundary: "总体设计范围（临时）",
      key_areas: "重点区域（临时）",
      land_use: "用地分区",
      green_space: "绿地",
      public_space: "公共空间节点",
      buildings: "建筑（概念）",
      roads: "慢行线（概念）",
      phasing: "分期",
      constraints: "约束要素"
    },
    en: {
      site_boundary: "Overall design scope (provisional)",
      key_areas: "Key areas (provisional)",
      land_use: "Land-use zoning",
      green_space: "Green space",
      public_space: "Public-space nodes",
      buildings: "Buildings (concept)",
      roads: "Slow-mobility lines (concept)",
      phasing: "Phasing",
      constraints: "Constraint features"
    }
  };

  var TEXT = {
    zh: {
      north: "N",
      provisionalTag: "（临时/概念口径，虚线表达）",
      provisionalNote: "虚线 = 临时/概念口径几何，非官方红线，待正式边界发布后复算"
    },
    en: {
      north: "N",
      provisionalTag: " (provisional / concept geometry, drawn dashed)",
      provisionalNote:
        "Dashed = provisional or concept geometry, not an official redline; recompute once official boundaries are published"
    }
  };

  function layerLabel(name, lang) {
    var table = LAYER_LABELS[lang === "en" ? "en" : "zh"];
    return table[name] || name;
  }

  function viewTitle(spec, lang, view) {
    if (!spec) return String(view);
    return lang === "en" && spec.title_en ? spec.title_en : spec.title_zh;
  }

  function rotatePoint(p, rotate) {
    if (rotate === 90) return [p[1], -p[0]];
    if (rotate === -90) return [-p[1], p[0]];
    return p;
  }

  function projectedBBox(geo, geometries, rotate) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    function walk(c) {
      if (!c || !c.length) return;
      if (typeof c[0] === "number") {
        var p = rotatePoint(geo.projectLonLat(c[0], c[1]), rotate);
        if (p[0] < b[0]) b[0] = p[0];
        if (p[1] < b[1]) b[1] = p[1];
        if (p[0] > b[2]) b[2] = p[0];
        if (p[1] > b[3]) b[3] = p[1];
        return;
      }
      for (var i = 0; i < c.length; i++) walk(c[i]);
    }
    for (var i = 0; i < geometries.length; i++) if (geometries[i]) walk(geometries[i].coordinates);
    return b;
  }

  function screenBBox(geometry, toXY) {
    var b = [Infinity, Infinity, -Infinity, -Infinity];
    function walk(c) {
      if (!c || !c.length) return;
      if (typeof c[0] === "number") {
        var p = toXY(c);
        if (p[0] < b[0]) b[0] = p[0];
        if (p[1] < b[1]) b[1] = p[1];
        if (p[0] > b[2]) b[2] = p[0];
        if (p[1] > b[3]) b[3] = p[1];
        return;
      }
      for (var i = 0; i < c.length; i++) walk(c[i]);
    }
    walk(geometry.coordinates);
    return isFinite(b[0]) ? b : null;
  }

  function pathData(geometry, toXY) {
    var t = geometry.type;
    var c = geometry.coordinates;
    var d = [];
    function ring(r) {
      for (var i = 0; i < r.length; i++) {
        var p = toXY(r[i]);
        d.push((i === 0 ? "M" : "L") + p[0].toFixed(2) + " " + p[1].toFixed(2));
      }
      d.push("Z");
    }
    function line(r) {
      for (var i = 0; i < r.length; i++) {
        var p = toXY(r[i]);
        d.push((i === 0 ? "M" : "L") + p[0].toFixed(2) + " " + p[1].toFixed(2));
      }
    }
    if (t === "Polygon") for (var i = 0; i < c.length; i++) ring(c[i]);
    else if (t === "MultiPolygon") for (var j = 0; j < c.length; j++) for (var k = 0; k < c[j].length; k++) ring(c[j][k]);
    else if (t === "LineString") line(c);
    else if (t === "MultiLineString") for (var m = 0; m < c.length; m++) line(c[m]);
    else if (t === "Point") {
      var p0 = toXY(c);
      d.push("M" + (p0[0] - 3).toFixed(2) + " " + p0[1].toFixed(2) + "a3 3 0 1 0 6 0a3 3 0 1 0 -6 0");
    } else return null;
    return d.join(" ");
  }

  function drawLegend(svg, entries, o) {
    var g = el("g", { "data-anno": "legend" }, svg);
    var rowH = 15;
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      var y = o.y + 10 + i * rowH;
      if (e.line) {
        el(
          "line",
          {
            x1: o.x,
            y1: y - 3,
            x2: o.x + 16,
            y2: y - 3,
            stroke: e.color,
            "stroke-width": 2.4,
            "stroke-dasharray": e.dashed ? "5 3" : null
          },
          g
        );
      } else {
        el(
          "rect",
          {
            x: o.x,
            y: y - 9,
            width: 16,
            height: 10,
            fill: e.color,
            "fill-opacity": 0.75,
            stroke: e.color,
            "stroke-width": 1,
            "stroke-dasharray": e.dashed ? "4 3" : null
          },
          g
        );
      }
      var t = el(
        "text",
        { x: o.x + 22, y: y, "font-size": 10.5, "font-family": o.font, fill: o.color },
        g
      );
      t.textContent = e.label;
    }
    return g;
  }

  function drawScaleBar(svg, o) {
    /* 选一个整数米的条长，使其像素宽度接近视口宽度的 1/5 */
    var target = (o.width - 2 * o.pad) / 5;
    var candidates = [100, 200, 250, 500, 1000, 2000, 2500, 5000];
    var meters = candidates[0];
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i] * o.scale <= target) meters = candidates[i];
    }
    var px = meters * o.scale;
    var g = el("g", { "data-anno": "scalebar" }, svg);
    var x = o.width - o.pad - px;
    var y = o.height - o.pad;
    el("line", { x1: x, y1: y, x2: x + px, y2: y, stroke: o.color, "stroke-width": 1.6 }, g);
    el("line", { x1: x, y1: y - 4, x2: x, y2: y + 4, stroke: o.color, "stroke-width": 1.6 }, g);
    el("line", { x1: x + px, y1: y - 4, x2: x + px, y2: y + 4, stroke: o.color, "stroke-width": 1.6 }, g);
    el("line", { x1: x + px / 2, y1: y - 3, x2: x + px / 2, y2: y + 3, stroke: o.color, "stroke-width": 1.2 }, g);
    var t = el(
      "text",
      { x: x + px, y: y - 7, "text-anchor": "end", "font-size": 10.5, "font-family": o.font, fill: o.color },
      g
    );
    t.textContent = meters >= 1000 ? meters / 1000 + " km" : meters + " m";
    return g;
  }

  function drawNorth(svg, o) {
    var x = o.width - o.pad - 8;
    var y = o.pad + 6;
    var cx = x;
    var cy = y + 11;
    var angle = o.angle || 0;
    var g = el("g", { "data-anno": "north" }, svg);
    /* 箭头随 rotate 一起转，"N" 字保持正立并挪到箭头所指的一侧 */
    var arrow = el("g", { transform: angle ? "rotate(" + angle + " " + cx + " " + cy + ")" : null }, g);
    el("path", { d: "M" + x + " " + (y + 22) + "L" + x + " " + y + "L" + (x - 6) + " " + (y + 9) + "Z", fill: o.color }, arrow);
    el(
      "path",
      {
        d: "M" + x + " " + (y + 22) + "L" + x + " " + y + "L" + (x + 6) + " " + (y + 9) + "Z",
        fill: "none",
        stroke: o.color,
        "stroke-width": 1.2
      },
      arrow
    );
    var rad = (angle * Math.PI) / 180;
    var tipX = cx + 11 * Math.sin(rad);
    var tipY = cy - 11 * Math.cos(rad);
    var lx = cx + (tipX - cx) * 1.9;
    var ly = cy + (tipY - cy) * 1.9 + 3.6;
    var t = el(
      "text",
      { x: lx.toFixed(1), y: ly.toFixed(1), "text-anchor": "middle", "font-size": 10.5, "font-family": o.font, fill: o.color },
      g
    );
    t.textContent = o.label || "N";
    return g;
  }

  draw.views = VIEWS;
  draw.palette = DEFAULT_PALETTE;
  draw.landUseClasses = LAND_USE_CLASS;
  draw.phaseClasses = PHASE_CLASS;
  draw.roadClasses = ROAD_CLASS;
  draw.VERSION = "1.0.0";

  root.CA_draw = draw;
})(typeof window !== "undefined" ? window : globalThis);
