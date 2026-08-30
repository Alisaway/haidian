(() => {
  "use strict";
  const STORY = window.EVOLUTIONARY_STORY_DATA;
  const EVO = window.ECS_PUBLIC_EVOLUTION;
  const DIGITAL = window.ECS_DIGITAL_USER_DATA;
  const SENSITIVITY = window.ECS_SENSITIVITY;
  const LANG = document.documentElement.dataset.lang === "en" ? "en" : "zh";
  const root = document.getElementById("story-root");
  const progress = document.getElementById("story-progress");
  const expert = document.getElementById("expert-panel");
  const sourceDrawer = document.getElementById("source-drawer");
  if (!STORY || !EVO || !DIGITAL || !SENSITIVITY) {
    root.innerHTML = `<div class="loading"><b>${LANG === "en" ? "The local simulation package is incomplete." : "本地模拟数据包不完整。"}</b><span>${LANG === "en" ? "No network request will be attempted." : "页面不会尝试联网补齐。"}</span></div>`;
    return;
  }

  const B = STORY.baseline;
  const LEGACY = STORY.evolution;
  const SOURCES = STORY.evidence.sources;
  const VARIANTS = new Map(EVO.variants.map((item) => [item.id, item]));
  const RUNS = new Map(EVO.runs.map((item) => [`${item.plan_id}:${item.scenario_id}`, item]));
  const TYPES = {commuter: ["通勤者", "Commuters"], resident: ["居民", "Residents"], heritage_visitor: ["旧站访客", "Old-station visitors"], accessible: ["无障碍角色", "Step-free users"]};
  const TYPE_COUNT = {commuter: 40, resident: 25, heritage_visitor: 20, accessible: 15};
  const TYPE_COLOR = {commuter: "#7fb9aa", resident: "#d7b46a", heritage_visitor: "#b7c4b9", accessible: "#f0eee5"};
  const SCENARIOS = {"AM-COMMUTE": ["早高峰通勤", "Morning commute"], "DAILY-LIFE": ["日常公共生活", "Everyday public life"], "EVENING-QUIET": ["傍晚活动与安静", "Evening activity and quiet"], "PARTIAL-CLOSURE": ["入口临时关闭", "Temporary entrance closure"]};
  const PUBLIC_IDS = EVO.public_story.find((item) => item.round === 1).variant_ids;
  if (LANG === "zh") PUBLIC_IDS.forEach((id, index) => { VARIANTS.get(id).letter = ["甲", "乙", "丙"][index]; });
  const ROUND2_IDS = EVO.public_story.find((item) => item.round === 2).variant_ids;
  const ROUND3_IDS = EVO.public_story.find((item) => item.round === 3).variant_ids;
  const PUBLIC_SELECTION_EVENTS = ["GENE-TRANSVERSE-ROUTE", "GENE-OLD-STATION-COMMONS", "GENE-QUIET-PROTOCOL", EVO.current_recommendation_id, "PERMANENT-STATION-HALL"].map((id) => EVO.selection_events.find((event) => event.object_id === id)).filter(Boolean);
  if (!EVO.genes.some((gene) => gene.id === EVO.current_recommendation_id)) EVO.genes.push({id:EVO.current_recommendation_id,label_zh:"当前公共适应路径",label_en:"Current public adaptation route"});
  if (!EVO.genes.some((gene) => gene.id === "PERMANENT-STATION-HALL")) EVO.genes.push({id:"PERMANENT-STATION-HALL",label_zh:"永久站厅构筑物",label_en:"Permanent station hall"});
  const state = {planId: PUBLIC_IDS[0], scenarioId: "AM-COMMUTE", types: new Set(Object.keys(TYPES)), playing: false, frame: null, started: 0};

  const t = (zh, en) => LANG === "en" ? en : zh.replaceAll("AI Agent", "智能体").replaceAll("Agent", "智能体").replaceAll("AI", "人工智能");
  const pair = (value) => value?.[LANG === "en" ? 1 : 0] || value?.[0] || "";
  const esc = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  function project(coordinate) { const [a, b, c, d] = B.bbox; return [((coordinate[0] - a) / (c - a)) * 1200, 700 - ((coordinate[1] - b) / (d - b)) * 700]; }
  function linePath(coordinates, close = false) { return coordinates.map(project).map((point, index) => `${index ? "L" : "M"}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(" ") + (close ? " Z" : ""); }
  function geometryPath(geometry) {
    if (!geometry) return "";
    if (geometry.type === "LineString") return linePath(geometry.coordinates);
    if (geometry.type === "MultiLineString") return geometry.coordinates.map((line) => linePath(line)).join(" ");
    if (geometry.type === "Polygon") return geometry.coordinates.map((ring) => linePath(ring, true)).join(" ");
    if (geometry.type === "MultiPolygon") return geometry.coordinates.flatMap((polygon) => polygon.map((ring) => linePath(ring, true))).join(" ");
    return "";
  }
  function featurePoint(feature) {
    if (feature.geometry.type === "Point") return project(feature.geometry.coordinates);
    const ring = feature.geometry.type === "Polygon" ? feature.geometry.coordinates[0] : [];
    if (!ring.length) return null;
    const sum = ring.reduce((value, coordinate) => [value[0] + coordinate[0], value[1] + coordinate[1]], [0, 0]);
    return project([sum[0] / ring.length, sum[1] / ring.length]);
  }
  function baseMap() {
    const order = {park: 0, building: 1, road: 2, railway: 3, heritage: 4, anchor: 5};
    return B.features.filter((feature) => order[feature.properties.kind] !== undefined).sort((left, right) => order[left.properties.kind] - order[right.properties.kind]).map((feature) => {
      const kind = feature.properties.kind;
      if (feature.geometry.type === "Point") {
        if (!/(五道口|清华园)/i.test(feature.properties.name || "")) return "";
        const point = featurePoint(feature);
        return `<circle class="map-feature map-anchor" data-feature-id="${esc(feature.id)}" cx="${point[0]}" cy="${point[1]}" r="5"></circle>`;
      }
      const major = feature.properties.name === "成府路" || feature.properties.highway === "secondary" ? " major" : "";
      return `<path class="map-feature map-${kind}${major}" data-feature-id="${esc(feature.id)}" d="${geometryPath(feature.geometry)}"></path>`;
    }).join("");
  }
  function labels() {
    return [[t("清华园旧站", "Old Tsinghuayuan Station"), [116.3257003, 39.9903338]], [t("五道口站", "Wudaokou Station"), [116.3317163, 39.9913979]], [t("成府路", "Chengfu Road"), [116.3364, 39.9918]]].map(([text, coordinate]) => { const p = project(coordinate); return `<g class="map-label-group"><circle cx="${p[0]}" cy="${p[1]}" r="4"></circle><text x="${p[0] + 10}" y="${p[1] - 10}">${esc(text)}</text></g>`; }).join("");
  }
  function planOverlay(planId) {
    const variant = VARIANTS.get(planId);
    return (variant?.simulated_changes || []).map((change) => {
      if (change.type === "connector") return `<path class="design-connector" d="${linePath([change.from, change.to])}"></path>`;
      if (change.type === "dwell_node") { const p = project(change.coordinate); return `<g class="design-dwell"><circle cx="${p[0]}" cy="${p[1]}" r="17"></circle><circle cx="${p[0]}" cy="${p[1]}" r="5"></circle></g>`; }
      return "";
    }).join("");
  }
  function spatialObjectOverlay(planId) {
    const variant = VARIANTS.get(planId);
    return (variant?.spatial_objects || []).map((object) => {
      const geometry = object.geometry;
      if (geometry.type === "LineString") {
        const className = object.type === "ground_floor_interface" ? "object-ground-floor" : object.id === "OBJ-BACKUP" ? "object-backup" : "object-path";
        return `<path class="spatial-object ${className}" data-spatial-object="${esc(object.id)}" d="${linePath(geometry.coordinates)}"></path>`;
      }
      if (geometry.type === "Point") {
        const point = project(geometry.coordinates);
        const className = object.type === "operating_zone" ? "object-operating" : "object-public-space";
        return `<g class="spatial-object ${className}" data-spatial-object="${esc(object.id)}"><circle cx="${point[0]}" cy="${point[1]}" r="12"></circle><text x="${point[0] + 16}" y="${point[1] + 5}">${esc(LANG === "en" ? object.name_en : object.name_zh)}</text></g>`;
      }
      return "";
    }).join("");
  }
  function routeOverlay(run, markers) {
    if (!run) return "";
    const routes = run.routes.filter((route) => state.types.has(route.user_type));
    const successful = routes.filter((route) => route.status === "arrived" && route.coordinates.length > 1);
    const step = Math.max(1, Math.floor(successful.length / 24));
    const paths = successful.map((route) => `<path class="user-route type-${route.user_type}" d="${linePath(route.coordinates)}"></path>`).join("");
    const people = markers ? successful.filter((_, index) => index % step === 0).slice(0, 24).map((route) => { const p = project(route.coordinates[0]); return `<circle class="digital-user type-${route.user_type}" data-coordinates="${esc(JSON.stringify(route.coordinates))}" cx="0" cy="0" r="5" style="--user-color:${TYPE_COLOR[route.user_type]};transform:translate(${p[0]}px,${p[1]}px)"></circle>`; }).join("") : "";
    return paths + people;
  }
  function mapSvg({planId = null, run = null, markers = false, title = "S03", detailed = false} = {}) { return `<svg class="real-map v6-map" viewBox="0 0 1200 700" role="img" aria-label="${esc(title)}"><rect width="1200" height="700" fill="#101411"></rect>${baseMap()}${planOverlay(planId)}${detailed ? spatialObjectOverlay(planId) : ""}${routeOverlay(run, markers)}${labels()}</svg>`; }
  function mapFrame(title, options = {}) { const detailed = options.detailed || options.planId === EVO.current_recommendation_id; return `<article class="map-frame"><header><span>${options.planId ? t("设计推演 · 非已实施", "DESIGN SIMULATION · NOT IMPLEMENTED") : t("公开数据快照 · 开放数据库许可", "PUBLIC DATA SNAPSHOT · ODbL")}</span><b>${esc(title)}</b></header><div class="map-canvas">${mapSvg({...options, detailed, title})}</div><footer><span>${t("点击现状对象查看来源", "Click existing objects for sources")}</span><b>${t("© 开放街图贡献者 · 开放数据库许可 1.0", "© OpenStreetMap contributors · ODbL 1.0")}</b></footer></article>`; }
  function chapter(number, title, lead) { return `<div class="chapter-intro"><span>${number}</span><div><p>${t("一步看懂", "ONE STEP AT A TIME")}</p><h2>${esc(title)}</h2><p>${esc(lead)}</p></div></div>`; }
  const next = (target) => `<button class="story-continue" data-next="${target}">${t("继续看下一步", "Continue")}</button>`;
  const variantName = (id) => { const item = VARIANTS.get(id); return LANG === "en" ? item.name_en : item.name_zh; };
  const variantIntent = (id) => { const item = VARIANTS.get(id); return LANG === "en" ? item.intent_en || item.condition_en : item.intent_zh || item.condition_zh; };
  const variantMark = (id) => LANG === "en" ? (VARIANTS.get(id).letter || id) : ({"A-DIRECT-LINK":"甲","B-PUBLIC-LIFE":"乙","C-TIME-SHARE":"丙"}[id] || "方案");
  const geneLabels = (variant) => (variant.gene_ids || []).map((id) => EVO.genes.find((gene) => gene.id === id)?.[LANG === "en" ? "label_en" : "label_zh"] || id);
  const stateLabel = (value) => LANG === "en" ? value.replaceAll("_", " ") : ({fast_reversible:"快层可逆",medium_professional_review:"中层专业审查",medium_conditional:"中层条件实施"}[value] || "待专业确认");
  const generatedLabel = (value) => LANG === "en" ? value : ({variation_agents:"变异智能体群","AG-ADAPTATION+crossover_rule":"适应智能体与交叉规则","QD-archive+AG-ADAPTATION":"非支配档案与适应智能体"}[value] || "确定性生成规则");
  const objectLabel = (id) => LANG === "en" ? id : ({"R3-CURRENT-PHENOTYPE":"当前公共适应路径","PERMANENT-STATION-HALL":"永久站厅构筑物"}[id] || id);
  const uncertaintyLabel = (value) => LANG === "en" ? value.replaceAll("_", " ") : ({verified_entrance:"经核实入口",fire_access:"消防条件",station_clearance:"站口净空",kerb_geometry:"路缘几何",ownership:"权属",door_positions:"门位",verified_road_redline:"经核实道路红线",sidewalk_width:"人行宽度",cycle_width:"骑行宽度",ground_floor_setback:"首层退界",gate_position:"入口位置"}[value] || "待专业确认");
  const layerLabel = (value) => LANG === "en" ? value.toUpperCase() : ({slow:"慢层",medium:"中层",fast:"快层"}[value] || value);
  const failureLabel = (value) => LANG === "en" ? value.replaceAll("_", " ") : ({no_walkable_route:"没有可用步行路径",no_step_free_route:"没有可用无障碍路径",anchor_not_connected:"起点或终点未接入路网",broken_predecessor_chain:"路径链中断"}[value] || "路径无法成立");
  const runFor = () => RUNS.get(`${state.planId}:${state.scenarioId}`);
  function actionLabel(action) { return ({retain:t("保留","RETAIN"),adjust:t("调整","ADJUST"),exit:t("退出","EXIT"),birth:t("新生","BIRTH"),recombine:t("重组","RECOMBINE"),dormant:t("休眠","DORMANT")})[action] || action.toUpperCase(); }
  function spatialDetails(variant) {
    const focusCopy = {heritage_visibility:["历史显影","heritage visibility"],dwell:["停留","dwell"],quiet_after_20:["20:00后安静","quiet after 20:00"],transfer:["换乘","transfer"],shade:["遮阴","shade"],timed_curb:["分时路缘","timed curb"],conditional_opening:["条件开放","conditional opening"],offline_service:["线下服务","offline service"],delivery_window:["装卸窗口","delivery window"]};
    const section = variant.typical_section;
    return `<section class="spatial-depth"><header><span>${t("空间深化", "SPATIAL DEPTH")}</span><h3>${t("一张总平面、三个节点、一条不编造尺寸的剖面", "One plan, three nodes and one section without invented dimensions")}</h3><p>${t("所有位置为真实地图关系上的概念推演；门位、红线、坡度和精确宽度仍待专业确认。", "All locations are conceptual moves on real map relations; gates, redlines, slopes and exact widths await professional confirmation.")}</p></header><div class="object-register">${(variant.spatial_objects || []).map((object, index) => `<article><span>${String(index + 1).padStart(2,"0")}</span><b>${esc(LANG === "en" ? object.name_en : object.name_zh)}</b><small>${esc(stateLabel(object.state))}</small></article>`).join("")}</div><div class="node-details">${(variant.node_details || []).map((node, index) => `<article><div class="node-orbit"><i></i><b>0${index + 1}</b></div><h4>${esc(LANG === "en" ? node.name_en : node.name_zh)}</h4><p>${node.focus.map((item) => esc(pair(focusCopy[item]))).join(" · ")}</p><small>${t("待确认", "unknown")}: ${node.unknowns.map((item) => esc(uncertaintyLabel(item))).join(" / ")}</small></article>`).join("")}</div><div class="typical-section"><header><b>${t("典型横向剖面", "Typical transverse section")}</b><span>${t("关系性剖面 · 不声明精确宽度", "Relational section · no exact-width claim")}</span></header><div>${(section?.bands || []).map((band) => `<article class="layer-${band.layer}"><span>${esc(LANG === "en" ? band.label_en : band.label_zh)}</span><small>${layerLabel(band.layer)}</small></article>`).join("")}</div><p>${t("待确认", "unknown")}: ${(section?.unknowns || []).map((item) => esc(uncertaintyLabel(item))).join(" · ")}</p></div></section>`;
  }

  function render() {
    const main = VARIANTS.get(EVO.current_recommendation_id);
    root.innerHTML = `
    <section class="story-section v6-hero" id="start"><div class="hero-statement"><p class="eyebrow">S03 · ${t("成府路—五道口—清华园旧站", "CHENGFU ROAD—WUDAOKOU—OLD TSINGHUAYUAN STATION")}</p><h1>${t("让很多种城市方案先被生活检验，再把真正好用的部分组合起来。", "Let everyday life test many city plans, then combine the parts that actually work.")}</h1><p class="hero-explain">${t("多个 AI Agent 提出三种不同空间方案，100 个数字使用者分别在里面通勤、生活、参观和无障碍出行。不好用的空间策略退出，有效部分进入下一轮。", "Multiple AI Agents propose three spatial plans. One hundred digital users commute, live, visit and make step-free journeys through each. Weak spatial strategies exit; useful parts enter the next round.")}</p><div class="one-line-flow"><b>${t("三种方案", "3 plans")}</b><i></i><b>${t("100个数字使用者", "100 digital users")}</b><i></i><b>${t("发现空间问题", "problems exposed")}</b><i></i><b>${t("组合新方案", "parts recombined")}</b></div><button class="hero-action" data-next="place">${t("从真实地点开始", "Start with the real place")}</button></div><div class="hero-map">${mapFrame(t("S03真实公开数据起点", "Real public-data starting point"))}<div class="hero-count"><strong>3</strong><span>${t("轮演化", "rounds")}</span><strong>36</strong><span>${t("次情景测试", "scenario tests")}</span></div></div></section>

    <section class="story-section v6-section" id="place">${chapter("01", t("先看清楚：这是哪里？", "First: where is this?"), t("交通、大学街区、铁路遗产与居民日常生活在一条横向路径上叠在一起。", "Transport, university districts, railway heritage and everyday life overlap along one transverse route."))}<div class="place-layout">${mapFrame(t("五道口站—成府路—清华园旧站", "Wudaokou—Chengfu Road—Old Station"))}<div class="plain-facts"><article><b>${t("五道口站", "Wudaokou Station")}</b><p>${t("公开地图能定位站点和道路，但没有可验证的真实客流。", "Public maps locate the station and roads; verified pedestrian flows are unavailable.")}</p></article><article><b>${t("清华园旧站", "Old Tsinghuayuan Station")}</b><p>${t("铁路历史、旧站和遗产空间是锁定条件，不能被方案淘汰。", "Railway history, the old station and heritage space are locked conditions.")}</p></article><article class="unknown"><b>${t("目前不知道", "Currently unknown")}</b><p>${t("正式红线、产权、门位、坡度、消防、实时人流与真实公众反馈。未知不补造。", "Statutory boundaries, ownership, gates, slopes, fire access, observed flows and real feedback. Unknowns stay unknown.")}</p></article></div></div>${next("variants")}</section>

    <section class="story-section v6-section" id="variants">${chapter("02", t("智能体先提出三种完全不同的尝试", "AI begins with three very different attempts"), t("它们不是三个终局，而是第一轮父本。", "They are not final plans; they are first-generation parents."))}<div class="variant-triptych">${PUBLIC_IDS.map((id) => { const v = VARIANTS.get(id); return `<button class="public-variant" data-plan-preview="${id}"><span>${variantMark(id)}</span><h3>${esc(variantName(id))}</h3><p>${esc(variantIntent(id))}</p><div>${mapSvg({planId: id, title: variantName(id)})}</div><small>${geneLabels(v).map(esc).join(" · ")}</small></button>`; }).join("")}</div><p class="section-rule">${t("变化对象只能是路径、公共空间、首层接口、设施与开放规则；居民和社区永远不是淘汰对象。", "Only paths, public spaces, ground-floor interfaces, facilities and opening rules may change. Residents and communities are never elimination objects.")}</p>${next("agents")}</section>

    <section class="story-section v6-section" id="agents">${chapter("03", t("智能体生成方案，数字使用者把问题走出来", "AI makes plans; digital users walk the problems into view"), t("小人不是装饰动画：每一个都有起点、终点、速度、需求和可复现路径。", "The people are not decorative animation: each has an origin, destination, speed, need and reproducible route."))}<div class="agent-roles"><article><span>01</span><b>${t("空间智能体", "Spatial Agent")}</b><p>${t("改变分析单元、公共空间和首层接口。", "Changes analytical cells, public space and ground-floor interfaces.")}</p></article><article><span>02</span><b>${t("路径智能体", "Path Agent")}</b><p>${t("提出入口、横向连接和备用通道。", "Proposes entrances, transverse links and backups.")}</p></article><article><span>03</span><b>${t("时间智能体", "Time Agent")}</b><p>${t("调整开放、装卸和夜间安静规则。", "Adjusts opening, delivery and quiet rules.")}</p></article><article><span>04</span><b>${t("模拟智能体", "Simulation Agent")}</b><p>${t("让100个数字使用者寻路，记录到达、绕行和失败。", "Routes 100 digital users and records arrival, detour and failure.")}</p></article></div><div class="user-population"><div class="population-number"><strong>100</strong><span>${t("个固定种子的数字使用者", "seeded digital users")}</span></div>${Object.entries(TYPES).map(([type, label]) => `<div><i style="--user-color:${TYPE_COLOR[type]}"></i><b>${pair(label)}</b><span>${TYPE_COUNT[type]}</span></div>`).join("")}</div><p class="section-rule">${t("数字使用者只是透明测试工具，不代表真实居民意见。", "Digital users are transparent test instruments, not substitutes for public opinion.")}</p>${next("laboratory")}</section>

    <section class="story-section v6-lab" id="laboratory">${chapter("04", t("现在，让他们真的走一遍", "Now let them actually walk"), t("选择方案、情景和人物类型，播放真实坐标上的路径。", "Choose a plan, scenario and user types, then play routes on real coordinates."))}<div class="lab-shell"><div class="lab-controls"><fieldset><legend>${t("1 · 选择方案", "1 · Choose a plan")}</legend>${PUBLIC_IDS.map((id) => `<button data-lab-plan="${id}">${VARIANTS.get(id).letter} · ${esc(variantName(id))}</button>`).join("")}</fieldset><fieldset><legend>${t("2 · 选择情景", "2 · Choose a scenario")}</legend>${Object.entries(SCENARIOS).map(([id, label]) => `<button data-scenario="${id}">${esc(pair(label))}</button>`).join("")}</fieldset><fieldset><legend>${t("3 · 看哪些人", "3 · Show user types")}</legend>${Object.entries(TYPES).map(([type, label]) => `<button data-user-type="${type}" class="active"><i style="--user-color:${TYPE_COLOR[type]}"></i>${esc(pair(label))}</button>`).join("")}</fieldset><button class="lab-play" id="lab-play">${t("播放100人模拟", "Play 100-user simulation")}</button><p>${t("拥挤是相对占用代理；没有实测流量、路宽或容量时，不输出工程级结论。", "Crowding is a relative occupancy proxy. Without measured flow, width or capacity, no engineering claim is made.")}</p></div><div class="lab-stage" id="lab-stage"></div><aside class="lab-readout" id="lab-readout"></aside></div>${next("selection")}</section>

    <section class="story-section v6-section" id="selection">${chapter("05", t("不合适的策略为什么退出？", "Why do weak strategies exit?"), t("先看具体失败，再决定保留、调整、重组或退出哪个空间基因。", "See the concrete failure first, then retain, adjust, recombine or exit the spatial gene."))}<div class="selection-events">${PUBLIC_SELECTION_EVENTS.map((event) => `<article class="event-${event.action}"><span>${actionLabel(event.action)}</span><h3>${esc(EVO.genes.find((gene) => gene.id === event.object_id)?.[LANG === "en" ? "label_en" : "label_zh"] || event.object_id)}</h3><p>${esc(LANG === "en" ? event.reason_en : event.reason_zh)}</p>${event.human_confirmation_required ? `<b>${t("需要人类判断公共价值", "Human public-value judgement required")}</b>` : ""}</article>`).join("")}</div><div class="no-score"><strong>${t("没有总分冠军", "No total-score champion")}</strong><p>${t("到达、绕行、无障碍、拥挤、停留和安静证据并列展示。AI不能用隐藏权重替代城市判断。", "Arrival, detour, accessibility, crowding, dwelling and quiet remain parallel evidence. AI cannot replace judgement with hidden weights.")}</p></div><div class="sensitivity-proof"><header><span>SENSITIVITY</span><h3>${t("换一组人、改变参数，核心结论还成立吗？", "Do the conclusions survive new users and changed assumptions?")}</h3><p>${t("5 个随机种子 + 5 组参数扰动；仍是设计推演，不是现场校准。", "Five random seeds plus five parameter perturbations; still design simulation, not field calibration.")}</p></header><div class="stable-results">${SENSITIVITY.stable_conclusions.map((item) => `<article><i></i><b>${t("稳定", "STABLE")}</b><p>${esc(LANG === "en" ? item.statement_en : item.statement_zh)}</p></article>`).join("")}</div><div class="sensitive-results">${SENSITIVITY.sensitive_outputs.map((item) => `<article><b>${t("对假设敏感", "ASSUMPTION-SENSITIVE")}</b><p>${esc(LANG === "en" ? item.statement_en : item.statement_zh)}</p><code>${item.range.min} — ${item.range.max}</code></article>`).join("")}</div></div>${next("evolution")}</section>

    <section class="story-section v6-section" id="evolution">${chapter("06", t("三轮以后，优点怎样聚到一起？", "After three rounds, how do useful parts come together?"), t("点击每一轮，看父代、基因和空间变化。", "Open each round to see parents, genes and spatial change."))}<div class="round-tabs"><button data-round="1" class="active"><span>01</span>${t("三种初始尝试", "Initial attempts")}</button><button data-round="2"><span>02</span>${t("优点重组", "Genes recombined")}</button><button data-round="3"><span>03</span>${t("当前推荐", "Current recommendation")}</button></div><div class="round-stage" id="round-stage"></div><div class="lineage-sentence"><b>A</b><span>${t("连续通行", "connection")}</span><i></i><b>B</b><span>${t("公共停留", "public life")}</span><i></i><b>C</b><span>${t("分时运营", "time sharing")}</span><i></i><strong>${t("公共适应路径", "Public adaptation route")}</strong></div>${next("outcome")}</section>

    <section class="story-section v6-outcome" id="outcome">${chapter("07", t("最后交出的，是一套可以继续深化的城市设计", "The result is an urban design ready for deeper review"), t("它不是永久终局，也不是AI自动批准的城市。", "It is neither a permanent endpoint nor an AI-approved city."))}<div class="outcome-layout"><div class="final-map">${mapFrame(t("当前推荐：公共适应路径", "Current recommendation: Public adaptation route"), {planId: main.id})}</div><div class="final-design-list"><p class="outcome-label">${t("当前主推荐", "CURRENT RECOMMENDATION")}</p><h3>${esc(LANG === "en" ? main.name_en : main.name_zh)}</h3><ul><li>${t("成府路—旧站连续横向步行路径", "Continuous Chengfu Road–old station walking route")}</li><li>${t("五道口站口与沿街接口改善", "Improved station and street interface")}</li><li>${t("清华园旧站公共客厅与历史显影", "Old-station commons and visible railway history")}</li><li>${t("首层公共接口与可撤回设施", "Public ground-floor interfaces and reversible facilities")}</li><li>${t("开放、装卸和夜间安静分时规则", "Timed opening, delivery and quiet rules")}</li><li>${t("主路径失效时的备用连接", "Backup connection when the main route fails")}</li></ul><div class="human-gates"><b>${t("以下事项必须由人决定", "Humans must decide")}</b><p>${t("法律与文保、公共权利冲突、不可逆建设、公共资源、证据不足和Agent失准。", "Law and heritage, public-rights conflicts, irreversible construction, public resources, evidence gaps and Agent failure.")}</p></div></div></div><div class="final-three"><article><span>01</span><b>${t("主推荐方案", "Main recommendation")}</b><p>${t("当前证据下可继续专业深化的可逆组合。", "A reversible combination for professional development.")}</p></article><article><span>02</span><b>${t("两个条件型方案", "Two conditional alternatives")}</b><p>${t("通勤优先与安静生活情景继续保留。", "Commute-priority and quiet-life adaptations remain.")}</p></article><article><span>03</span><b>${t("演化记忆", "Evolution memory")}</b><p>${t("成功、失败和未知都不会被删除。", "Success, failure and unknowns are never erased.")}</p></article></div><figure class="experience-film"><figcaption><b>${t("90 秒看懂完整演化", "Understand the full evolution in 90 seconds")}</b><span>${t("无声 · 本地视频 · 带字幕 · 不自动播放", "Silent · local video · captioned · no autoplay")}</span></figcaption><video controls preload="metadata" poster="../assets/media/cover.webp"><source src="../assets/media/experience.mp4" type="video/mp4"><track kind="captions" src="../assets/media/experience.vtt" srclang="zh" label="中文" default>${t("浏览器不支持视频时，请阅读文字稿。", "If video is unsupported, read the transcript.")}</video><a href="../assets/media/experience.md">${t("查看文字稿与权利说明", "Read transcript and rights note")}</a></figure><p class="closing-line">${t("城市不是被AI一次画完的，而是在证据、使用与人的判断中持续长成。", "The city is not drawn once by AI; it keeps growing through evidence, use and human judgement.")}</p><div class="final-actions"><button class="hero-action" data-next="start">${t("重新看一遍", "Replay")}</button><button class="expert-action" data-open-expert>${t("查看专家数据", "Open expert data")}</button></div></section>`;
    document.querySelector(".v6-hero")?.insertAdjacentHTML("afterend", `<section class="intent-visual"><header><span>${t("设计意向图", "DESIGN INTENT")}</span><div><h2>${t("公共适应路径：让铁路历史、日常生活与持续试验共处", "Public adaptation route: heritage, everyday life and continued testing")}</h2><p>${t("图像生成模型生成的概念模型图 · 非现状照片 · 不用于测绘、面积或审批判断", "Image 2 conceptual model · not an existing photograph · not for survey, area or approval claims")}</p></div></header><img src="../assets/media/design-intent-s03.webp" alt="${t("S03公共适应路径设计意向模型图", "Conceptual model of the S03 public adaptation route")}"><footer><a href="../assets/media/design-intent-s03.md">${t("查看生成方法与使用边界", "Read generation method and limitations")}</a></footer></section>`);
    document.querySelector(".sensitivity-proof > header > span").textContent = t("敏感性验证", "SENSITIVITY");
    if (LANG === "zh") document.querySelectorAll(".lineage-sentence > b").forEach((item, index) => { item.textContent = ["甲", "乙", "丙"][index]; });
    document.querySelector("#evolution .chapter-intro")?.insertAdjacentHTML("afterend", `<figure class="evolution-tableau"><img src="../assets/media/evolution-tableau.webp" alt="${t("三代城市演化模型台设计意向图", "Three-generation urban evolution tableau")}"><figcaption><b>${t("三代演化模型台", "Three-generation evolution tableau")}</b><span>${t("设计意向 · 非空间证据 · 所有基因层贴地表达", "Design intent · not spatial evidence · all gene layers shown at grade")}</span></figcaption></figure>`);
    document.querySelector(".final-three")?.insertAdjacentHTML("beforebegin", spatialDetails(main));
    document.querySelector(".node-details")?.insertAdjacentHTML("afterend", `<div class="node-render-gallery"><figure><img src="../assets/media/node-old-station.webp" alt="${t("清华园旧站公共客厅设计意向图", "Old-station commons design-intent image")}"><figcaption><b>${t("清华园旧站公共客厅", "Old-station commons")}</b><span>${t("设计意向 · 非现状照片", "Design intent · not an existing photograph")}</span></figcaption></figure><figure><img src="../assets/media/node-wudaokou.webp" alt="${t("五道口站口适应界面设计意向图", "Wudaokou adaptive interface design-intent image")}"><figcaption><b>${t("五道口站口适应界面", "Wudaokou adaptive interface")}</b><span>${t("设计意向 · 非现状照片", "Design intent · not an existing photograph")}</span></figcaption></figure></div>`);
    renderLab(); renderRound(1); bindEvents();
  }

  function visibleRoutes(run) { return run.routes.filter((route) => state.types.has(route.user_type)); }
  function renderLab() {
    const run = runFor(); const stage = document.getElementById("lab-stage"); const readout = document.getElementById("lab-readout");
    if (!run || !stage || !readout) return;
    stopAnimation(false);
    stage.innerHTML = mapSvg({planId: state.planId, run, markers: true, title: variantName(state.planId)});
    const routes = visibleRoutes(run); const arrived = routes.filter((route) => route.status === "arrived"); const failed = routes.filter((route) => route.status !== "arrived");
    const distances = arrived.map((route) => route.distance_m).filter(Number.isFinite).sort((left, right) => left - right);
    const filteredMedian = distances.length ? distances[Math.floor((distances.length - 1) / 2)] : null;
    readout.innerHTML = `<p>${t("当前测试", "CURRENT TEST")}</p><h3>${esc(variantName(state.planId))}</h3><b>${esc(pair(SCENARIOS[state.scenarioId]))}</b><dl><div><dt>${t("显示人数", "Users")}</dt><dd>${routes.length}</dd></div><div><dt>${t("到达", "Arrived")}</dt><dd>${arrived.length}</dd></div><div><dt>${t("失败", "Failed")}</dt><dd>${failed.length}</dd></div><div><dt>${t("所选人群中位路径", "Selected-user median")}</dt><dd>${filteredMedian ?? t("待确认", "unknown")} ${t("米", "m")}</dd></div><div><dt>${t("全体拥挤边代理", "All-user crowd proxy")}</dt><dd>${run.metrics.overloaded_edge_count}</dd></div><div><dt>${t("方案停留节点", "Plan dwell nodes")}</dt><dd>${run.metrics.reached_dwell_node_count}</dd></div></dl>${failed.length ? `<div class="failure-callout"><b>${t("为什么失败", "Why routes failed")}</b><p>${Object.entries(run.failure_reasons).map(([reason, count]) => `${count} × ${esc(failureLabel(reason))}`).join("<br>")}</p></div>` : `<div class="success-callout">${t("本次所有显示角色都有可达路径；这不等于真实环境已经无障碍。", "All shown users found a route; this does not prove real-world accessibility.")}</div>`}<small>${esc(LANG === "en" ? run.disclaimer_en : run.disclaimer_zh)}</small>`;
    document.querySelectorAll("[data-lab-plan]").forEach((button) => button.classList.toggle("active", button.dataset.labPlan === state.planId));
    document.querySelectorAll("[data-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.scenario === state.scenarioId));
    bindMapSources();
  }
  function markerPosition(coordinates, value) {
    const points = coordinates.map(project); if (points.length < 2) return points[0] || [0, 0];
    const lengths = points.slice(1).map((point, index) => Math.hypot(point[0] - points[index][0], point[1] - points[index][1])); const total = lengths.reduce((sum, n) => sum + n, 0); let target = total * value;
    for (let index = 0; index < lengths.length; index += 1) { if (target <= lengths[index]) { const ratio = lengths[index] ? target / lengths[index] : 0; return [points[index][0] + (points[index + 1][0] - points[index][0]) * ratio, points[index][1] + (points[index + 1][1] - points[index][1]) * ratio]; } target -= lengths[index]; }
    return points.at(-1);
  }
  function animate(timestamp) { if (!state.playing) return; if (!state.started) state.started = timestamp; const value = ((timestamp - state.started) % 9000) / 9000; document.querySelectorAll(".digital-user").forEach((marker) => { const point = markerPosition(JSON.parse(marker.dataset.coordinates), value); marker.style.transform = `translate(${point[0]}px,${point[1]}px)`; }); state.frame = requestAnimationFrame(animate); }
  function startAnimation() { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; state.playing = true; state.started = 0; document.getElementById("lab-play").textContent = t("暂停模拟", "Pause simulation"); state.frame = requestAnimationFrame(animate); }
  function stopAnimation(label = true) { state.playing = false; if (state.frame) cancelAnimationFrame(state.frame); state.frame = null; state.started = 0; if (label && document.getElementById("lab-play")) document.getElementById("lab-play").textContent = t("播放100人模拟", "Play 100-user simulation"); }

  function renderRound(round) {
    const ids = round === 1 ? PUBLIC_IDS : round === 2 ? ROUND2_IDS : ROUND3_IDS; const stage = document.getElementById("round-stage"); if (!stage) return;
    stage.innerHTML = `<div class="round-grid">${ids.map((id) => { const variant = VARIANTS.get(id); const lineage = EVO.lineage_events.find((item) => item.variant_id === id); const main = id === EVO.current_recommendation_id; return `<article class="round-specimen ${main ? "main-specimen" : ""}"><header><span>${main ? t("当前主推荐", "CURRENT RECOMMENDATION") : `${t("第", "ROUND ")}${round}${t("轮", "")}`}</span><h3>${esc(variantName(id))}</h3></header><div>${mapSvg({planId: id, title: variantName(id)})}</div><p>${variant.parent_ids?.length ? `${t("父代", "Parents")}: ${variant.parent_ids.map((parent) => esc(variantName(parent) || parent)).join(" + ")}` : t("第一轮父本", "First-round parent")}</p><small>${(lineage?.gene_ids || []).map((gene) => esc(EVO.genes.find((item) => item.id === gene)?.[LANG === "en" ? "label_en" : "label_zh"] || gene)).join(" · ")}</small></article>`; }).join("")}</div>`;
    stage.querySelectorAll(".round-specimen").forEach((article, index) => article.insertAdjacentHTML("afterbegin", `<p class="generated-by">${t("生成来源", "GENERATED BY")} · ${esc(generatedLabel(VARIANTS.get(ids[index]).generated_by || "variation_agents"))}</p>`));
    document.querySelectorAll("[data-round]").forEach((button) => button.classList.toggle("active", Number(button.dataset.round) === round)); bindMapSources();
  }

  function renderExpert() {
    expert.innerHTML = `<button id="expert-close">${t("关闭", "Close")}</button><p class="chapter-label">EXPERT MODE</p><h2>${t("数据、算法与完整谱系", "Data, algorithm and full lineage")}</h2><details open><summary>${t("任务书六项集中索引", "Six taskbook requirements")}</summary><div><p><b>agent.1</b> · ${t("三大定位、五大功能、三区两翼和区域协同", "positionings, functions, areas, wings and regional synergy")}</p><p><b>agent.2</b> · ${t("六个具名全球案例与创新生态链", "six named global cases and the innovation chain")}</p><p><b>agent.3</b> · ${t("十张场景卡、五类画像和三类产业测试", "ten scenarios, five personas and three industry tests")}</p><p><b>agent.4</b> · ${t("三个文化节点、荣誉体系与六类公共空间组件", "three landmarks, honor system and six public-space components")}</p><p><b>agent.5</b> · ${t("铁路—中关村—开源智能叙事、导视与国际表达", "railway–Zhongguancun–open AI narrative, wayfinding and communication")}</p><p><b>agent.6</b> · ${t("现实代门槛、开发者社区、长期运营与转化路径", "real-world gates, developer community, long-term operation and conversion")}</p><p><a href="assets/taskbook-index.json">${t("打开机器可读任务书索引", "Open the machine-readable taskbook index")}</a></p></div></details><details open><summary>${t("数字使用者模拟", "Digital-user simulation")}</summary><div><code class="expert-code">seed=${EVO.random_seed}\nusers=100\npublic_variants=3\nscenarios=4\nthree_round_variants=9\nsimulation_runs=${EVO.runs.length}\naggregate_metric=null</code><p>${esc(EVO.disclaimer_zh)}</p></div></details><details><summary>${t("36次方案—情景运行", "36 plan–scenario runs")}</summary><div><table class="expert-table"><thead><tr><th>Plan</th><th>Scenario</th><th>Arrival</th><th>Median m</th><th>Access fail</th><th>Crowd</th><th>Quiet</th></tr></thead><tbody>${EVO.runs.map((run) => `<tr><td>${esc(run.plan_id)}</td><td>${esc(run.scenario_id)}</td><td>${run.metrics.arrival_rate}</td><td>${run.metrics.median_distance_m}</td><td>${run.metrics.accessible_failures}</td><td>${run.metrics.overloaded_edge_count}</td><td>${run.metrics.quiet_conflict_count}</td></tr>`).join("")}</tbody></table></div></details><details><summary>${t("保留、调整与退出", "Retention, adjustment and exit")}</summary><div>${EVO.selection_events.map((event) => `<p><b>${esc(event.action)} · ${esc(event.object_id)}</b><br>${esc(event.reason_zh)}</p>`).join("")}</div></details><details><summary>${t("公开来源与未知", "Public sources and unknowns")}</summary><div>${DIGITAL.unknowns.map((item) => `<p><b>${esc(item.field)}</b><br>${esc(item.impact)}</p>`).join("")}</div></details><details><summary>${t("研究层：40代、1,440个体", "Research layer: 40 generations, 1,440 individuals")}</summary><div><p>${t("完整质量—多样性研究保留在专家层，不再占据公众故事。", "The full quality-diversity study remains in expert mode.")}</p><code class="expert-code">seed=${LEGACY.random_seed}\ngenerations=${LEGACY.generation_count}\noffspring_per_generation=${LEGACY.offspring_per_generation}\ntested_individuals=${LEGACY.tested_individual_count}</code></div></details>`;
    expert.querySelector("details")?.insertAdjacentHTML("afterend", `<details><summary>${t("生成规则与敏感性", "Generation rules and sensitivity")}</summary><div><code class="expert-code">round1=${EVO.generation_method.round1}\nround2=${EVO.generation_method.round2}\nround3=${EVO.generation_method.round3}\nmanual_variant_assembly=${EVO.generation_method.manual_variant_assembly}\nseeds=${SENSITIVITY.seeds.join(",")}\nparameter_cases=${SENSITIVITY.parameter_cases.length}</code><table class="expert-table"><tbody>${SENSITIVITY.parameter_cases.map((item) => `<tr><th>${esc(LANG === "en" ? item.label_en : item.label_zh)}</th><td>closure ${item.metrics.closure_arrival_rate}</td><td>access ${item.metrics.closure_accessible_failures}</td><td>crowd ${item.metrics.peak_crowd_proxy_edges}</td></tr>`).join("")}</tbody></table><p>${t("敏感性测试不是现场校准；它只判断哪些模型内结论对假设稳定。", "Sensitivity testing is not field calibration; it only identifies model conclusions stable to assumptions.")}</p></div></details>`);
    expert.querySelector("#expert-close")?.addEventListener("click", closeExpert);
  }
  function openExpert() { renderExpert(); expert.hidden = false; document.getElementById("expert-toggle").setAttribute("aria-expanded", "true"); }
  function closeExpert() { expert.hidden = true; document.getElementById("expert-toggle").setAttribute("aria-expanded", "false"); }
  function showSource(id) { const feature = B.features.find((item) => item.id === id); if (!feature) return; const p = feature.properties; const source = SOURCES.find((item) => item.source_id === p.source_id) || SOURCES[0]; sourceDrawer.innerHTML = `<button id="source-close">${t("关闭", "Close")}</button><p class="chapter-label">SOURCE / EVIDENCE</p><h3>${esc(p.name || p.kind)}</h3><p><b>${esc(p.evidence_status)}</b> · ${esc(p.geometry_role)}</p><code>${esc(p.osm_type || "feature")}/${esc(p.osm_id || feature.id)}</code><ul><li>${esc(source.title_zh || source.source_id)}</li><li>${esc(source.license || p.license)}</li><li>${esc(source.limitations_zh || t("公开地图定位参考", "Public-map reference"))}</li></ul>`; sourceDrawer.hidden = false; sourceDrawer.querySelector("#source-close")?.addEventListener("click", () => { sourceDrawer.hidden = true; }); }
  function bindMapSources() { document.querySelectorAll("[data-feature-id]").forEach((node) => node.addEventListener("click", () => showSource(node.dataset.featureId))); }
  function bindEvents() {
    document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.next)?.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"})));
    document.querySelectorAll("[data-lab-plan]").forEach((button) => button.addEventListener("click", () => { state.planId = button.dataset.labPlan; renderLab(); }));
    document.querySelectorAll("[data-scenario]").forEach((button) => button.addEventListener("click", () => { state.scenarioId = button.dataset.scenario; renderLab(); }));
    document.querySelectorAll("[data-user-type]").forEach((button) => button.addEventListener("click", () => { const type = button.dataset.userType; if (state.types.has(type) && state.types.size > 1) state.types.delete(type); else state.types.add(type); button.classList.toggle("active", state.types.has(type)); renderLab(); }));
    document.getElementById("lab-play")?.addEventListener("click", () => state.playing ? stopAnimation() : startAnimation());
    document.querySelectorAll("[data-round]").forEach((button) => button.addEventListener("click", () => renderRound(Number(button.dataset.round))));
    document.querySelectorAll("[data-open-expert]").forEach((button) => button.addEventListener("click", openExpert));
    document.getElementById("expert-toggle")?.addEventListener("click", () => expert.hidden ? openExpert() : closeExpert()); bindMapSources();
  }
  function renderProgress() {
    const chapters = [["start", t("一句话", "Idea")], ["place", t("地点", "Place")], ["variants", t("三种方案", "Plans")], ["agents", t("AI与小人", "AI + users")], ["laboratory", t("亲自测试", "Test")], ["selection", t("保留与退出", "Selection")], ["evolution", t("三轮演化", "Evolution")], ["outcome", t("最终方案", "Outcome")]];
    progress.innerHTML = chapters.map(([id, label], index) => `<a href="#${id}"><span>${String(index).padStart(2, "0")}</span>${esc(label)}</a>`).join("");
    const links = [...progress.querySelectorAll("a")]; const observer = new IntersectionObserver((entries) => { const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (current) links.forEach((link) => link.classList.toggle("active", link.hash === `#${current.target.id}`)); }, {threshold: [0.18, 0.5], rootMargin: "-16% 0px -52% 0px"}); document.querySelectorAll(".story-section").forEach((section) => observer.observe(section));
  }
  render(); renderProgress();
})();
