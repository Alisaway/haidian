(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.ECSDigitalUserSimulator = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SEED = 20260820;
  const EARTH_RADIUS_M = 6371008.8;
  const WALKABLE_HIGHWAYS = new Set([
    "pedestrian", "footway", "path", "steps", "cycleway", "living_street",
    "residential", "service", "unclassified", "tertiary", "secondary",
    "secondary_link", "tertiary_link", "track"
  ]);
  const ANCHORS = Object.freeze({
    metro: {id: "ANCHOR-METRO", name_zh: "五道口站", name_en: "Wudaokou Station", coordinate: [116.3317163, 39.9913979]},
    oldStation: {id: "ANCHOR-OLD-STATION", name_zh: "清华园旧站", name_en: "Old Tsinghuayuan Station", coordinate: [116.3256309, 39.990245]},
    eastCampus: {id: "ANCHOR-EAST-CAMPUS", name_zh: "成府路东段", name_en: "East Chengfu Road", coordinate: [116.3385785, 39.9917903]},
    northHome: {id: "ANCHOR-NORTH-HOME", name_zh: "西王庄片区", name_en: "Xiwangzhuang Area", coordinate: [116.329338, 39.9972815]},
    southTransit: {id: "ANCHOR-SOUTH-TRANSIT", name_zh: "五道口公交场站", name_en: "Wudaokou Bus Terminus", coordinate: [116.3315378, 39.9875479]}
  });

  const SCENARIOS = Object.freeze([
    {id: "AM-COMMUTE", name_zh: "早高峰通勤", name_en: "Morning commute", hour: 8, crowd_factor: 1.35, quiet_weight: 0, closure_mode: "none"},
    {id: "DAILY-LIFE", name_zh: "日常公共生活", name_en: "Everyday public life", hour: 15, crowd_factor: 0.75, quiet_weight: 0.15, closure_mode: "none"},
    {id: "EVENING-QUIET", name_zh: "傍晚活动与安静", name_en: "Evening activity and quiet", hour: 21, crowd_factor: 0.9, quiet_weight: 0.8, closure_mode: "night"},
    {id: "PARTIAL-CLOSURE", name_zh: "入口临时关闭", name_en: "Temporary entrance closure", hour: 18, crowd_factor: 1, quiet_weight: 0.25, closure_mode: "partial"}
  ]);

  const VARIANTS = Object.freeze([
    {
      id: "A-DIRECT-LINK",
      letter: "A",
      name_zh: "直接连接",
      name_en: "Direct links",
      intent_zh: "减少五道口站、成府路与清华园旧站之间的绕行。",
      intent_en: "Reduce detours between Wudaokou Station, Chengfu Road and the old station.",
      genes: ["continuous_transverse_route", "clear_station_interface", "step_free_priority"],
      simulated_changes: [
        {id: "A-LINK-OLD-METRO", type: "connector", from: [116.3257003, 39.9903338], to: [116.3314511, 39.99152], step_free: true, relative_capacity: 1.15, reversible: true},
        {id: "A-STATION-INTERFACE", type: "edge_policy", match_name: "成府路", cost_factor: 0.82, step_free: true, relative_capacity: 1.2, reversible: true}
      ]
    },
    {
      id: "B-PUBLIC-LIFE",
      letter: "B",
      name_zh: "公共生活",
      name_en: "Public life",
      intent_zh: "把旧站、站口与沿街空间组织成可停留的公共生活序列。",
      intent_en: "Turn the old station, metro edge and street frontage into a sequence of places to stay.",
      genes: ["old_station_commons", "street_level_interfaces", "shade_and_stay"],
      simulated_changes: [
        {id: "B-OLD-STATION-COMMONS", type: "dwell_node", coordinate: [116.3257003, 39.9903338], dwell_capacity: 28, quiet_sensitive: false, reversible: true},
        {id: "B-METRO-PLAZA", type: "dwell_node", coordinate: [116.3317163, 39.9913979], dwell_capacity: 36, quiet_sensitive: true, reversible: true},
        {id: "B-PUBLIC-EDGE", type: "edge_policy", match_highway: ["pedestrian", "footway", "path"], cost_factor: 0.9, relative_capacity: 1.1, reversible: true}
      ]
    },
    {
      id: "C-TIME-SHARE",
      letter: "C",
      name_zh: "分时共享",
      name_en: "Time sharing",
      intent_zh: "用开放时间、装卸窗口与夜间安静规则适应不同时段。",
      intent_en: "Use opening hours, delivery windows and quiet rules to adapt the same spaces over time.",
      genes: ["timed_access", "delivery_windows", "night_quiet_protocol"],
      simulated_changes: [
        {id: "C-DAY-GATE", type: "connector", from: [116.3257003, 39.9903338], to: [116.3314511, 39.99152], step_free: true, relative_capacity: 0.95, open_hours: [6, 20], reversible: true},
        {id: "C-NIGHT-QUIET", type: "edge_policy", match_name: "成府路", quiet_sensitive: true, cost_factor: 0.94, reversible: true},
        {id: "C-DELIVERY-WINDOW", type: "operating_rule", open_hours: [10, 16], reversible: true}
      ]
    }
  ]);

  function mulberry32(seed) {
    let value = seed >>> 0;
    return function () {
      value += 0x6D2B79F5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function haversine(a, b) {
    const radians = Math.PI / 180;
    const dLat = (b[1] - a[1]) * radians;
    const dLon = (b[0] - a[0]) * radians;
    const lat1 = a[1] * radians;
    const lat2 = b[1] * radians;
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(value));
  }

  function coordinateKey(coordinate) {
    return `${Number(coordinate[0]).toFixed(7)},${Number(coordinate[1]).toFixed(7)}`;
  }

  function isWalkable(properties) {
    if (!properties || !WALKABLE_HIGHWAYS.has(properties.highway)) return false;
    if (["no", "private"].includes(properties.foot) || properties.access === "private") return false;
    return true;
  }

  function isOpen(edge, hour) {
    if (edge.closed) return false;
    if (!Array.isArray(edge.open_hours)) return true;
    const [start, end] = edge.open_hours;
    return start <= end ? hour >= start && hour < end : hour >= start || hour < end;
  }

  class MinHeap {
    constructor() { this.items = []; }
    push(item) {
      this.items.push(item);
      let index = this.items.length - 1;
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (this.items[parent].priority <= item.priority) break;
        this.items[index] = this.items[parent];
        index = parent;
      }
      this.items[index] = item;
    }
    pop() {
      if (!this.items.length) return null;
      const top = this.items[0];
      const last = this.items.pop();
      if (this.items.length && last) {
        let index = 0;
        while (true) {
          const left = index * 2 + 1;
          const right = left + 1;
          if (left >= this.items.length) break;
          let child = right < this.items.length && this.items[right].priority < this.items[left].priority ? right : left;
          if (this.items[child].priority >= last.priority) break;
          this.items[index] = this.items[child];
          index = child;
        }
        this.items[index] = last;
      }
      return top;
    }
  }

  function buildNetwork(features) {
    const nodes = new Map();
    const edges = new Map();
    const adjacency = new Map();
    function addNode(coordinate) {
      const id = coordinateKey(coordinate);
      if (!nodes.has(id)) nodes.set(id, {id, coordinate: [Number(coordinate[0]), Number(coordinate[1])]});
      if (!adjacency.has(id)) adjacency.set(id, []);
      return id;
    }
    function addEdge(edge) {
      edges.set(edge.id, edge);
      if (!adjacency.has(edge.from)) adjacency.set(edge.from, []);
      if (!adjacency.has(edge.to)) adjacency.set(edge.to, []);
      adjacency.get(edge.from).push(edge.id);
      adjacency.get(edge.to).push(edge.id);
    }
    features.filter((feature) => feature.properties && feature.properties.kind === "road" && isWalkable(feature.properties)).forEach((feature) => {
      const lines = feature.geometry.type === "MultiLineString" ? feature.geometry.coordinates : [feature.geometry.coordinates];
      lines.forEach((coordinates, lineIndex) => {
        for (let index = 0; index < coordinates.length - 1; index += 1) {
          const from = addNode(coordinates[index]);
          const to = addNode(coordinates[index + 1]);
          if (from === to) continue;
          const properties = feature.properties;
          const highway = properties.highway;
          const edge = {
            id: `${feature.id}:${lineIndex}:${index}`,
            source_feature_id: feature.id,
            from,
            to,
            coordinates: [nodes.get(from).coordinate, nodes.get(to).coordinate],
            length_m: haversine(nodes.get(from).coordinate, nodes.get(to).coordinate),
            walkable: true,
            cycleable: ["cycleway", "path", "residential", "service", "living_street"].includes(highway),
            step_free: highway === "steps" || properties.wheelchair === "no" ? false : null,
            open_hours: null,
            relative_capacity: ["footway", "path", "steps"].includes(highway) ? 0.7 : highway === "pedestrian" ? 1.2 : 1,
            quiet_sensitive: false,
            evidence_status: properties.evidence_status || "observed_public",
            source_ids: [properties.source_id].filter(Boolean),
            name: properties.name || null,
            highway,
            access: properties.access || null,
            cost_factor: 1,
            simulated_change_id: null
          };
          addEdge(edge);
        }
      });
    });
    return {nodes, edges, adjacency, addNode, addEdge};
  }

  function nearestNode(network, coordinate, maximumDistance = Infinity) {
    let best = null;
    let bestDistance = maximumDistance;
    network.nodes.forEach((node) => {
      const distance = haversine(node.coordinate, coordinate);
      if (distance < bestDistance) {
        best = node;
        bestDistance = distance;
      }
    });
    return best ? {...best, snap_distance_m: bestDistance} : null;
  }

  function cloneNetwork(network) {
    const result = {nodes: new Map(), edges: new Map(), adjacency: new Map()};
    network.nodes.forEach((node, id) => result.nodes.set(id, {...node, coordinate: [...node.coordinate]}));
    network.edges.forEach((edge, id) => result.edges.set(id, {...edge, coordinates: edge.coordinates.map((point) => [...point]), source_ids: [...edge.source_ids]}));
    network.adjacency.forEach((ids, id) => result.adjacency.set(id, [...ids]));
    result.addNode = function (coordinate) {
      const id = coordinateKey(coordinate);
      if (!result.nodes.has(id)) result.nodes.set(id, {id, coordinate: [...coordinate]});
      if (!result.adjacency.has(id)) result.adjacency.set(id, []);
      return id;
    };
    result.addEdge = function (edge) {
      result.edges.set(edge.id, edge);
      result.adjacency.get(edge.from).push(edge.id);
      result.adjacency.get(edge.to).push(edge.id);
    };
    return result;
  }

  function applyVariant(baseNetwork, variant) {
    const network = cloneNetwork(baseNetwork);
    const dwellNodes = [];
    variant.simulated_changes.forEach((change) => {
      if (change.type === "edge_policy") {
        network.edges.forEach((edge) => {
          const nameMatch = !change.match_name || edge.name === change.match_name;
          const typeMatch = !change.match_highway || change.match_highway.includes(edge.highway);
          if (!nameMatch || !typeMatch) return;
          if (change.cost_factor) edge.cost_factor *= change.cost_factor;
          if (change.relative_capacity) edge.relative_capacity *= change.relative_capacity;
          if (typeof change.step_free === "boolean") edge.step_free = change.step_free;
          if (typeof change.quiet_sensitive === "boolean") edge.quiet_sensitive = change.quiet_sensitive;
          edge.simulated_change_id = change.id;
          edge.evidence_status = "simulated_design";
        });
      } else if (change.type === "connector") {
        const fromSnap = nearestNode(network, change.from);
        const toSnap = nearestNode(network, change.to);
        if (!fromSnap || !toSnap || fromSnap.id === toSnap.id) return;
        network.addEdge({
          id: `simulated:${change.id}`,
          source_feature_id: null,
          from: fromSnap.id,
          to: toSnap.id,
          coordinates: [fromSnap.coordinate, toSnap.coordinate],
          length_m: haversine(fromSnap.coordinate, toSnap.coordinate),
          walkable: true,
          cycleable: true,
          step_free: Boolean(change.step_free),
          open_hours: change.open_hours || null,
          relative_capacity: change.relative_capacity || 1,
          quiet_sensitive: Boolean(change.quiet_sensitive),
          evidence_status: "simulated_design",
          source_ids: [],
          name: change.id,
          highway: "proposed_connector",
          access: null,
          cost_factor: 1,
          simulated_change_id: change.id,
          reversible: change.reversible !== false
        });
      } else if (change.type === "dwell_node") {
        const snap = nearestNode(network, change.coordinate);
        if (snap) dwellNodes.push({...change, node_id: snap.id, snapped_coordinate: snap.coordinate, evidence_status: "simulated_design"});
      }
    });
    return {network, dwellNodes};
  }

  function edgeCost(edge, user, scenario, occupancy) {
    if (!edge.walkable || !isOpen(edge, scenario.hour)) return Infinity;
    if (user.requires_step_free && edge.step_free === false) return Infinity;
    if (scenario.closure_mode === "partial" && edge.simulated_change_id && /STATION|METRO|PRIMARY/.test(edge.simulated_change_id)) return Infinity;
    let cost = edge.length_m * edge.cost_factor;
    const load = occupancy.get(edge.id) || 0;
    const capacityProxy = Math.max(4, 18 * edge.relative_capacity);
    cost *= 1 + scenario.crowd_factor * Math.max(0, load - capacityProxy) / capacityProxy;
    if (user.prefers_quiet && edge.quiet_sensitive) cost *= 1 + scenario.quiet_weight;
    if (user.requires_step_free && edge.step_free === null) cost *= 1.08;
    return cost;
  }

  function findPath(network, originId, destinationId, user, scenario, occupancy = new Map()) {
    if (!network.nodes.has(originId) || !network.nodes.has(destinationId)) return {status: "failed", reason: "anchor_not_connected", node_ids: [], edge_ids: []};
    const target = network.nodes.get(destinationId);
    const queue = new MinHeap();
    const distance = new Map([[originId, 0]]);
    const previous = new Map();
    queue.push({id: originId, priority: 0});
    while (queue.items.length) {
      const current = queue.pop();
      if (!current) break;
      const known = distance.get(current.id);
      if (current.priority > known + haversine(network.nodes.get(current.id).coordinate, target.coordinate) + 0.001) continue;
      if (current.id === destinationId) break;
      const edgeIds = network.adjacency.get(current.id) || [];
      edgeIds.forEach((edgeId) => {
        const edge = network.edges.get(edgeId);
        const nextId = edge.from === current.id ? edge.to : edge.from;
        const cost = edgeCost(edge, user, scenario, occupancy);
        if (!Number.isFinite(cost)) return;
        const nextDistance = known + cost;
        if (nextDistance < (distance.get(nextId) ?? Infinity)) {
          distance.set(nextId, nextDistance);
          previous.set(nextId, {node_id: current.id, edge_id: edgeId});
          const heuristic = haversine(network.nodes.get(nextId).coordinate, target.coordinate);
          queue.push({id: nextId, priority: nextDistance + heuristic});
        }
      });
    }
    if (!distance.has(destinationId)) {
      return {status: "failed", reason: user.requires_step_free ? "no_step_free_route" : "no_walkable_route", node_ids: [], edge_ids: []};
    }
    const nodeIds = [destinationId];
    const edgeIds = [];
    let cursor = destinationId;
    while (cursor !== originId) {
      const step = previous.get(cursor);
      if (!step) return {status: "failed", reason: "broken_predecessor_chain", node_ids: [], edge_ids: []};
      edgeIds.push(step.edge_id);
      cursor = step.node_id;
      nodeIds.push(cursor);
    }
    nodeIds.reverse();
    edgeIds.reverse();
    const length = edgeIds.reduce((sum, id) => sum + network.edges.get(id).length_m, 0);
    return {
      status: "arrived",
      reason: null,
      node_ids: nodeIds,
      edge_ids: edgeIds,
      coordinates: nodeIds.map((id) => network.nodes.get(id).coordinate),
      distance_m: length,
      generalized_cost: distance.get(destinationId),
      travel_time_s: length / user.speed
    };
  }

  function userTemplate(index, type, origin, destination, overrides = {}) {
    const typeIndex = String(index + 1).padStart(3, "0");
    const defaults = {
      commuter: {speed: 1.35, requires_step_free: false, prefers_quiet: false, activity_duration: 0},
      resident: {speed: 1.15, requires_step_free: false, prefers_quiet: true, activity_duration: 900},
      heritage_visitor: {speed: 1.05, requires_step_free: false, prefers_quiet: false, activity_duration: 1500},
      accessible: {speed: 0.82, requires_step_free: true, prefers_quiet: true, activity_duration: 720}
    }[type];
    return {
      id: `U-${typeIndex}`,
      type,
      origin_anchor: origin,
      destination_anchor: destination,
      departure: null,
      ...defaults,
      ...overrides,
      current_path: [],
      status: "not_started"
    };
  }

  function generateUsers(seed = SEED) {
    const rng = mulberry32(seed);
    const users = [];
    for (let index = 0; index < 40; index += 1) {
      const westbound = rng() < 0.55;
      users.push(userTemplate(users.length, "commuter", westbound ? "eastCampus" : "northHome", westbound ? "metro" : "southTransit", {departure: `08:${String(Math.floor(rng() * 25)).padStart(2, "0")}`}));
    }
    for (let index = 0; index < 25; index += 1) {
      const toStation = rng() < 0.6;
      users.push(userTemplate(users.length, "resident", "northHome", toStation ? "metro" : "oldStation", {departure: `15:${String(Math.floor(rng() * 40)).padStart(2, "0")}`}));
    }
    for (let index = 0; index < 20; index += 1) {
      users.push(userTemplate(users.length, "heritage_visitor", "metro", "oldStation", {departure: `14:${String(Math.floor(rng() * 45)).padStart(2, "0")}`}));
    }
    for (let index = 0; index < 15; index += 1) {
      const fromSouth = rng() < 0.45;
      users.push(userTemplate(users.length, "accessible", fromSouth ? "southTransit" : "metro", fromSouth ? "metro" : "oldStation", {departure: `10:${String(Math.floor(rng() * 50)).padStart(2, "0")}`}));
    }
    return users;
  }

  function percentile(values, ratio) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * ratio))];
  }

  function round(value, digits = 1) {
    return value === null || !Number.isFinite(value) ? null : Number(value.toFixed(digits));
  }

  function runScenario(baseNetwork, variant, scenario, users) {
    const {network, dwellNodes} = applyVariant(baseNetwork, variant);
    const anchorNodes = {};
    Object.entries(ANCHORS).forEach(([key, anchor]) => { anchorNodes[key] = nearestNode(network, anchor.coordinate); });
    const occupancy = new Map();
    const routes = [];
    users.forEach((sourceUser) => {
      const user = {...sourceUser};
      const origin = anchorNodes[user.origin_anchor];
      const destination = anchorNodes[user.destination_anchor];
      const path = origin && destination
        ? findPath(network, origin.id, destination.id, user, scenario, occupancy)
        : {status: "failed", reason: "anchor_not_connected", node_ids: [], edge_ids: []};
      if (path.status === "arrived") path.edge_ids.forEach((id) => occupancy.set(id, (occupancy.get(id) || 0) + 1));
      routes.push({
        user_id: user.id,
        user_type: user.type,
        origin_anchor: user.origin_anchor,
        destination_anchor: user.destination_anchor,
        status: path.status,
        failure_reason: path.reason,
        distance_m: round(path.distance_m),
        travel_time_s: round(path.travel_time_s),
        generalized_cost: round(path.generalized_cost),
        edge_ids: path.edge_ids,
        coordinates: path.coordinates || []
      });
    });
    const arrived = routes.filter((route) => route.status === "arrived");
    const distances = arrived.map((route) => route.distance_m);
    const times = arrived.map((route) => route.travel_time_s);
    const accessibleFailures = routes.filter((route) => route.user_type === "accessible" && route.status !== "arrived");
    const overloadedEdges = [...occupancy.entries()].filter(([id, count]) => count > 18 * network.edges.get(id).relative_capacity);
    const quietConflicts = scenario.hour >= 20
      ? routes.filter((route) => route.edge_ids.some((id) => network.edges.get(id).quiet_sensitive)).length
      : 0;
    const reachedDwell = new Set();
    routes.forEach((route) => route.edge_ids.forEach((edgeId) => {
      const edge = network.edges.get(edgeId);
      dwellNodes.forEach((node) => { if (edge.from === node.node_id || edge.to === node.node_id) reachedDwell.add(node.id); });
    }));
    return {
      plan_id: variant.id,
      scenario_id: scenario.id,
      random_seed: SEED,
      user_count: users.length,
      evidence_status: "simulated_design",
      disclaimer_zh: "数字使用者结果为基于公开路网与明确假设的设计推演，不是实测人流或真实公众反馈。",
      disclaimer_en: "Digital-user results are design simulations based on public networks and explicit assumptions, not observed flows or real public feedback.",
      routes,
      metrics: {
        arrival_rate: round(arrived.length / users.length, 3),
        median_distance_m: round(percentile(distances, 0.5)),
        p90_distance_m: round(percentile(distances, 0.9)),
        median_travel_time_s: round(percentile(times, 0.5)),
        accessible_failures: accessibleFailures.length,
        overloaded_edge_count: overloadedEdges.length,
        quiet_conflict_count: quietConflicts,
        reached_dwell_node_count: reachedDwell.size,
        climate_evidence: null
      },
      failure_reasons: routes.filter((route) => route.status !== "arrived").reduce((result, route) => {
        result[route.failure_reason] = (result[route.failure_reason] || 0) + 1;
        return result;
      }, {}),
      overloaded_edges: overloadedEdges.map(([id, count]) => ({edge_id: id, simulated_users: count})),
      dwell_nodes: dwellNodes
    };
  }

  function runPopulation(baseline, options = {}) {
    const seed = options.seed || SEED;
    const users = generateUsers(seed);
    const baseNetwork = buildNetwork(baseline.features || []);
    if (baseNetwork.nodes.size === 0) throw new Error("No walkable public-map network could be derived from the baseline.");
    const runs = [];
    VARIANTS.forEach((variant) => SCENARIOS.forEach((scenario) => runs.push(runScenario(baseNetwork, variant, scenario, users))));
    return {
      schema_version: "1.0.0",
      generated_from: "frozen_public_osm_plus_explicit_design_simulation",
      random_seed: seed,
      coordinate_reference_system: "EPSG:4326 display / geodesic metres for route length",
      truth_policy: "public_evidence_plus_explicitly_labelled_design_simulation",
      user_count: users.length,
      user_type_counts: users.reduce((result, user) => { result[user.type] = (result[user.type] || 0) + 1; return result; }, {}),
      anchors: ANCHORS,
      scenarios: SCENARIOS,
      variants: VARIANTS,
      network_summary: {node_count: baseNetwork.nodes.size, edge_count: baseNetwork.edges.size, evidence_status: "derived_analysis"},
      users,
      runs,
      unknowns: [
        {field: "pedestrian_flow", status: "unknown", impact: "absolute crowding and level-of-service cannot be claimed"},
        {field: "verified_sidewalk_width", status: "unknown", impact: "capacity remains a relative proxy"},
        {field: "verified_slope_and_kerb", status: "unknown", impact: "step-free routing is only valid where public tags exist; untagged edges remain uncertain"},
        {field: "verified_gate_opening_hours", status: "unknown", impact: "opening-hour changes are design scenarios, not observed operations"},
        {field: "real_public_feedback", status: "unknown", impact: "digital users cannot substitute for public consultation"}
      ]
    };
  }

  return {
    SEED,
    ANCHORS,
    SCENARIOS,
    VARIANTS,
    mulberry32,
    haversine,
    buildNetwork,
    nearestNode,
    applyVariant,
    findPath,
    generateUsers,
    runScenario,
    runPopulation
  };
});
