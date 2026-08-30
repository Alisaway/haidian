(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.CityGenomeEngine = api;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const EPSILON = 1e-7;
  const DEFAULT_OPERATORS = [
    "OP-SPLIT", "OP-MERGE", "OP-SHIFT", "OP-NETWORK",
    "OP-PROGRAM-TIME", "OP-PUBLIC-SPACE", "OP-HERITAGE"
  ];
  const VECTOR_KEYS = [
    "accessibility", "public_value", "heritage_continuity",
    "climate_resilience", "feasibility", "reversibility", "evidence_confidence"
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
  }

  function round(value, digits = 4) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
  }

  function createRng(seed) {
    let state = (Number(seed) || 1) >>> 0;
    return function random() {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(items, rng) {
    if (!items.length) return null;
    return items[Math.floor(rng() * items.length) % items.length];
  }

  function weightedPick(weights, rng) {
    const entries = Object.entries(weights).filter(([, value]) => value > 0);
    const total = entries.reduce((sum, [, value]) => sum + value, 0);
    let cursor = rng() * total;
    for (const [id, value] of entries) {
      cursor -= value;
      if (cursor <= 0) return id;
    }
    return entries.at(-1)?.[0] || DEFAULT_OPERATORS[0];
  }

  function rectToPolygon(rect) {
    const [x, y, width, height] = rect;
    return [
      [round(x), round(y)],
      [round(x + width), round(y)],
      [round(x + width), round(y + height)],
      [round(x), round(y + height)],
      [round(x), round(y)]
    ];
  }

  function area(rect) {
    return rect[2] * rect[3];
  }

  function overlapArea(left, right) {
    const width = Math.min(left[0] + left[2], right[0] + right[2]) - Math.max(left[0], right[0]);
    const height = Math.min(left[1] + left[3], right[1] + right[3]) - Math.max(left[1], right[1]);
    return width > EPSILON && height > EPSILON ? width * height : 0;
  }

  function rectEqual(left, right) {
    return left.length === right.length && left.every((value, index) => Math.abs(value - right[index]) < EPSILON);
  }

  function prepareCell(cell) {
    return {
      ...clone(cell),
      origin_id: cell.origin_id || cell.id,
      polygon: rectToPolygon(cell.rect),
      entrance_count: cell.entrance_count ?? (cell.permeability > 0.6 ? 3 : 1),
      heritage_visibility: cell.heritage_visibility ?? (String(cell.program).includes("heritage") ? 0.72 : 0.18),
      quiet_window_start: cell.quiet_window_start ?? 22,
      conceptual_setback: cell.conceptual_setback ?? 0.35,
      time_mutations: cell.time_mutations ?? 0
    };
  }

  function validateGeometry(cells, config) {
    const errors = [];
    const boundary = config.city_input.boundary;
    const baseline = new Map(config.evolutionary_cells.map((cell) => [cell.id, prepareCell(cell)]));
    const ids = new Set();
    cells.forEach((cell) => {
      if (ids.has(cell.id)) errors.push({code: "duplicate_cell_id", target: cell.id});
      ids.add(cell.id);
      const [x, y, width, height] = cell.rect;
      if (![x, y, width, height].every(Number.isFinite)) errors.push({code: "non_numeric_geometry", target: cell.id});
      if (width < 2.5 || height < 2.5) errors.push({code: "cell_below_minimum_size", target: cell.id});
      if (x < boundary.x - EPSILON || y < boundary.y - EPSILON ||
          x + width > boundary.x + boundary.width + EPSILON ||
          y + height > boundary.y + boundary.height + EPSILON) {
        errors.push({code: "outside_conceptual_boundary", target: cell.id, rule_id: "HC-01"});
      }
      const original = baseline.get(cell.id);
      if (original?.locked) {
        if (!rectEqual(original.rect, cell.rect) || original.program !== cell.program ||
            original.open_hours !== cell.open_hours || original.permeability !== cell.permeability) {
          errors.push({code: "locked_cell_changed", target: cell.id, rule_id: "HC-02"});
        }
      }
      cell.polygon = rectToPolygon(cell.rect);
    });
    for (let index = 0; index < cells.length; index += 1) {
      for (let other = index + 1; other < cells.length; other += 1) {
        if (overlapArea(cells[index].rect, cells[other].rect) > EPSILON) {
          errors.push({code: "illegal_overlap", target: `${cells[index].id}|${cells[other].id}`});
        }
      }
    }
    const baselineLockedIds = config.evolutionary_cells.filter((cell) => cell.locked).map((cell) => cell.id);
    baselineLockedIds.filter((id) => !ids.has(id)).forEach((id) => {
      errors.push({code: "locked_cell_missing", target: id, rule_id: "HC-02"});
    });
    return {valid: errors.length === 0, errors};
  }

  function mutationCommand({id, generation, parentId, operatorId, agentId, targets, parameters, sources, reversible = true}) {
    return {
      id,
      generation,
      parent_ids: [parentId],
      operator_id: operatorId,
      agent_id: agentId,
      target_ids: targets,
      source_ids: sources,
      reversible,
      parameters
    };
  }

  function mutableCells(cells) {
    return cells.filter((cell) => !cell.locked);
  }

  function executeSplit(cells, context) {
    const candidates = mutableCells(cells).filter((cell) => cell.rect[2] >= 8 || cell.rect[3] >= 8);
    const target = pick(candidates, context.rng);
    if (!target) return {error: "no_splittable_cell"};
    const index = cells.findIndex((cell) => cell.id === target.id);
    const vertical = target.rect[2] >= target.rect[3];
    const ratio = 0.42 + context.rng() * 0.16;
    const first = prepareCell({...clone(target), id: `${target.id}.a${context.serial}`});
    const second = prepareCell({...clone(target), id: `${target.id}.b${context.serial}`});
    if (vertical) {
      first.rect[2] = round(target.rect[2] * ratio, 3);
      second.rect[0] = round(target.rect[0] + first.rect[2], 3);
      second.rect[2] = round(target.rect[2] - first.rect[2], 3);
    } else {
      first.rect[3] = round(target.rect[3] * ratio, 3);
      second.rect[1] = round(target.rect[1] + first.rect[3], 3);
      second.rect[3] = round(target.rect[3] - first.rect[3], 3);
    }
    first.public_ratio = clamp(first.public_ratio + 0.03);
    second.public_ratio = clamp(second.public_ratio - 0.02);
    first.polygon = rectToPolygon(first.rect);
    second.polygon = rectToPolygon(second.rect);
    cells.splice(index, 1, first, second);
    return {targets: [target.id], parameters: {orientation: vertical ? "vertical" : "horizontal", ratio: round(ratio)}, cells};
  }

  function mergeCandidates(cells) {
    const candidates = [];
    const mutable = mutableCells(cells);
    for (let index = 0; index < mutable.length; index += 1) {
      for (let other = index + 1; other < mutable.length; other += 1) {
        const left = mutable[index];
        const right = mutable[other];
        const sameRow = Math.abs(left.rect[1] - right.rect[1]) < EPSILON && Math.abs(left.rect[3] - right.rect[3]) < EPSILON;
        const sameColumn = Math.abs(left.rect[0] - right.rect[0]) < EPSILON && Math.abs(left.rect[2] - right.rect[2]) < EPSILON;
        const horizontalGap = Math.max(left.rect[0], right.rect[0]) - Math.min(left.rect[0] + left.rect[2], right.rect[0] + right.rect[2]);
        const verticalGap = Math.max(left.rect[1], right.rect[1]) - Math.min(left.rect[1] + left.rect[3], right.rect[1] + right.rect[3]);
        if ((sameRow && horizontalGap >= -EPSILON && horizontalGap <= 2.1) ||
            (sameColumn && verticalGap >= -EPSILON && verticalGap <= 2.1)) candidates.push([left, right]);
      }
    }
    return candidates;
  }

  function executeMerge(cells, context) {
    const pair = pick(mergeCandidates(cells), context.rng);
    if (!pair) return {error: "no_mergeable_pair"};
    const [left, right] = pair;
    const x = Math.min(left.rect[0], right.rect[0]);
    const y = Math.min(left.rect[1], right.rect[1]);
    const maxX = Math.max(left.rect[0] + left.rect[2], right.rect[0] + right.rect[2]);
    const maxY = Math.max(left.rect[1] + left.rect[3], right.rect[1] + right.rect[3]);
    const merged = prepareCell({
      ...clone(area(left.rect) >= area(right.rect) ? left : right),
      id: `${left.origin_id}+${right.origin_id}.m${context.serial}`,
      origin_id: [left.origin_id, right.origin_id].sort().join("+"),
      rect: [x, y, round(maxX - x, 3), round(maxY - y, 3)],
      public_ratio: round((left.public_ratio + right.public_ratio) / 2),
      permeability: round((left.permeability + right.permeability) / 2),
      evidence_confidence: round(Math.min(left.evidence_confidence, right.evidence_confidence)),
      time_mutations: round((left.time_mutations + right.time_mutations) / 2),
      locked: false
    });
    const remaining = cells.filter((cell) => cell.id !== left.id && cell.id !== right.id);
    merged.polygon = rectToPolygon(merged.rect);
    remaining.push(merged);
    cells.splice(0, cells.length, ...remaining);
    return {targets: [left.id, right.id], parameters: {gap_absorbed: true}, cells};
  }

  function executeShift(cells, context) {
    const target = pick(mutableCells(cells), context.rng);
    if (!target) return {error: "no_mutable_cell"};
    const axis = context.rng() > 0.5 ? 0 : 1;
    const direction = context.rng() > 0.5 ? 1 : -1;
    const delta = round((0.35 + context.rng() * 0.65) * direction, 3);
    target.rect[axis] = round(target.rect[axis] + delta, 3);
    target.rect[axis + 2] = round(target.rect[axis + 2] - delta * 0.35, 3);
    target.polygon = rectToPolygon(target.rect);
    return {targets: [target.id], parameters: {axis: axis === 0 ? "x" : "y", delta}, cells};
  }

  function executeNetwork(cells, context) {
    const target = pick(mutableCells(cells), context.rng);
    if (!target) return {error: "no_mutable_cell"};
    const delta = context.rng() > 0.25 ? 0.06 : -0.05;
    target.permeability = round(clamp(target.permeability + delta, 0.12, 0.94));
    target.entrance_count = Math.max(1, Math.min(6, target.entrance_count + (delta > 0 ? 1 : -1)));
    return {targets: [target.id], parameters: {permeability_delta: delta, entrance_count: target.entrance_count}, cells};
  }

  function executeProgramTime(cells, context) {
    const target = pick(mutableCells(cells), context.rng);
    if (!target) return {error: "no_mutable_cell"};
    const programs = ["daily_service", "shared_ground_floor", "cycle_waiting", "heritage_wayfinding", "quiet_daily_life", "ai_public_service"];
    const nextProgram = pick(programs.filter((program) => program !== target.program), context.rng);
    const hourDelta = context.rng() > 0.5 ? 2 : -2;
    target.program = nextProgram;
    target.open_hours = Math.max(6, Math.min(24, target.open_hours + hourDelta));
    target.time_mutations = round(target.time_mutations + 1);
    if (nextProgram === "quiet_daily_life") target.quiet_window_start = Math.min(target.quiet_window_start, 20);
    return {targets: [target.id], parameters: {program: nextProgram, open_hours: target.open_hours}, cells};
  }

  function executePublicSpace(cells, context) {
    const target = pick(mutableCells(cells), context.rng);
    if (!target) return {error: "no_mutable_cell"};
    const delta = context.rng() > 0.35 ? 0.07 : -0.05;
    target.public_ratio = round(clamp(target.public_ratio + delta, 0.16, 0.9));
    target.conceptual_setback = round(clamp(target.conceptual_setback + delta * 0.8, 0.1, 0.9));
    return {targets: [target.id], parameters: {public_ratio_delta: delta}, cells};
  }

  function executeHeritage(cells, context) {
    const candidates = mutableCells(cells).filter((cell) => cell.rect[0] > 48 || String(cell.program).includes("heritage"));
    const target = pick(candidates.length ? candidates : mutableCells(cells), context.rng);
    if (!target) return {error: "no_mutable_cell"};
    target.heritage_visibility = round(clamp(target.heritage_visibility + 0.08, 0, 0.96));
    target.reversibility = round(clamp(target.reversibility + 0.02));
    return {targets: [target.id], parameters: {wayfinding: "reversible_railway_time_layer"}, cells};
  }

  const EXECUTORS = {
    "OP-SPLIT": ["AG-CELL", executeSplit],
    "OP-MERGE": ["AG-CELL", executeMerge],
    "OP-SHIFT": ["AG-CELL", executeShift],
    "OP-NETWORK": ["AG-NETWORK", executeNetwork],
    "OP-PROGRAM-TIME": ["AG-PROGRAM-TIME", executeProgramTime],
    "OP-PUBLIC-SPACE": ["AG-FORM-PUBLIC", executePublicSpace],
    "OP-HERITAGE": ["AG-HERITAGE", executeHeritage]
  };

  function executeMutation(parent, operatorId, context, config) {
    const cells = parent.cells.map(prepareCell);
    const [agentId, executor] = EXECUTORS[operatorId] || [];
    if (!executor) return {accepted: false, reason: "unknown_operator"};
    const result = executor(cells, context);
    const commandId = `CMD-D${String(context.generation).padStart(2, "0")}-${String(context.serial).padStart(3, "0")}`;
    if (result.error) {
      return {
        accepted: false,
        command: mutationCommand({id: commandId, generation: context.generation, parentId: parent.id, operatorId, agentId, targets: [], parameters: {attempt: result.error}, sources: ["EVD-001"], reversible: true}),
        reason: result.error
      };
    }
    const command = mutationCommand({
      id: commandId,
      generation: context.generation,
      parentId: parent.id,
      operatorId,
      agentId,
      targets: result.targets,
      parameters: result.parameters,
      sources: ["EVD-001", "EVD-006"],
      reversible: true
    });
    const geometry = validateGeometry(result.cells, config);
    if (!geometry.valid) return {accepted: false, command, reason: geometry.errors[0].code, geometry_errors: geometry.errors};
    return {accepted: true, command, cells: result.cells};
  }

  function average(items, field) {
    return items.reduce((sum, item) => sum + Number(item[field] || 0), 0) / Math.max(1, items.length);
  }

  function evaluate(cells, scenario, transferProfile = {}) {
    const mutable = cells.filter((cell) => !cell.locked);
    const permeability = average(cells, "permeability");
    const publicRatio = average(cells, "public_ratio");
    const heritage = average(cells, "heritage_visibility");
    const reversibility = average(cells, "reversibility");
    const evidence = average(cells, "evidence_confidence");
    const hours = average(cells, "open_hours") / 24;
    const cellPenalty = Math.max(0, cells.length - 18) * 0.012;
    const slopePenalty = Number(transferProfile.slope_pressure || 0) * (1 - permeability) * 0.22;
    const floodBenefit = Number(transferProfile.flood_pressure || 0) * publicRatio * 0.18;
    const heritagePressure = Number(transferProfile.heritage_lock || 0) * heritage * 0.12;
    const vectors = {
      accessibility: clamp(permeability * 0.66 + scenario.mobility * 0.18 + publicRatio * 0.16 - slopePenalty),
      public_value: clamp(publicRatio * 0.5 + permeability * 0.24 + hours * 0.18 + scenario.public_service * 0.08),
      heritage_continuity: clamp(heritage * 0.72 + scenario.quiet * 0.12 + heritagePressure + (mutable.some((cell) => cell.program === "heritage_wayfinding") ? 0.08 : 0)),
      climate_resilience: clamp(publicRatio * 0.48 + scenario.climate * 0.24 + reversibility * 0.1 + floodBenefit),
      feasibility: clamp(reversibility * 0.48 + evidence * 0.4 + 0.12 - cellPenalty),
      reversibility: clamp(reversibility),
      evidence_confidence: clamp(evidence)
    };
    Object.keys(vectors).forEach((key) => { vectors[key] = round(vectors[key]); });
    return vectors;
  }

  function descriptors(cells, transferProfile = {}) {
    const mutable = cells.filter((cell) => !cell.locked);
    const averageArea = mutable.reduce((sum, cell) => sum + area(cell.rect), 0) / Math.max(1, mutable.length);
    const permeability = average(mutable, "permeability");
    const temporalMutation = average(mutable, "time_mutations");
    const fineNeed = Number(transferProfile.fine_grain_need || 0);
    const grainValue = averageArea * (1 - fineNeed * 0.25);
    return {
      spatial_grain: grainValue < 125 ? "fine" : grainValue < 190 ? "medium" : "coarse",
      public_permeability: permeability < 0.45 ? "low" : permeability < 0.57 ? "medium" : "high",
      temporal_plasticity: temporalMutation < 0.18 ? "low" : temporalMutation < 0.72 ? "medium" : "high"
    };
  }

  function nicheKey(descriptor) {
    return `${descriptor.spatial_grain}|${descriptor.public_permeability}|${descriptor.temporal_plasticity}`;
  }

  function paretoDominates(left, right) {
    const noWorse = VECTOR_KEYS.every((key) => left[key] >= right[key] - EPSILON);
    const strictlyBetter = VECTOR_KEYS.some((key) => left[key] > right[key] + EPSILON);
    return noWorse && strictlyBetter;
  }

  function signature(individual) {
    return [
      individual.cells.length / 24,
      average(individual.cells, "public_ratio"),
      average(individual.cells, "permeability"),
      average(individual.cells, "open_hours") / 24,
      average(individual.cells, "heritage_visibility")
    ];
  }

  function distance(left, right) {
    const a = signature(left);
    const b = signature(right);
    return round(Math.sqrt(a.reduce((sum, value, index) => sum + ((value - b[index]) ** 2), 0)), 6);
  }

  function archiveDecision(candidate, archive, capacity) {
    const key = candidate.niche;
    const entries = archive.get(key) || [];
    if (!entries.length) return {action: "retain", reason: "new_niche", removed: []};
    const dominated = entries.filter((entry) => paretoDominates(candidate.evaluation, entry.evaluation));
    const dominators = entries.filter((entry) => paretoDominates(entry.evaluation, candidate.evaluation));
    if (dominators.length) return {action: "exit", reason: "pareto_dominated_in_niche", removed: []};
    if (dominated.length) return {action: "replace", reason: "pareto_dominance", removed: dominated.map((entry) => entry.id)};
    if (entries.length < capacity) return {action: "retain", reason: "nondominated_diversity", removed: []};
    const candidateNovelty = Math.min(...entries.map((entry) => distance(candidate, entry)));
    const noveltyRows = entries.map((entry) => ({entry, novelty: Math.min(...entries.filter((other) => other.id !== entry.id).map((other) => distance(entry, other)))}));
    noveltyRows.sort((left, right) => left.novelty - right.novelty || left.entry.id.localeCompare(right.entry.id));
    const weakest = noveltyRows[0];
    const evidenceFloor = weakest.entry.evaluation.evidence_confidence - 0.05;
    if (candidateNovelty > weakest.novelty + 0.015 && candidate.evaluation.evidence_confidence >= evidenceFloor) {
      return {action: "replace", reason: "necessary_novelty", removed: [weakest.entry.id], novelty_distance: candidateNovelty};
    }
    return {action: "dormant", reason: "insufficient_novelty_for_full_niche", removed: [], novelty_distance: candidateNovelty};
  }

  function cellMatchesOrigins(cell, originIds) {
    return originIds.some((origin) => String(cell.origin_id).split("+").includes(origin));
  }

  function interventionAt(generation, config, archive) {
    const intervention = (config.human_interventions || []).find((item) => item.generation === generation);
    if (!intervention) return null;
    const affected = [];
    const preserved = [];
    const baseline = new Map(config.evolutionary_cells.map((cell) => [cell.id, prepareCell(cell)]));
    archive.forEach((entries) => entries.forEach((individual) => {
      const isAffected = individual.cells.some((cell) => {
        if (!cellMatchesOrigins(cell, intervention.affected_cell_ids)) return false;
        const origins = String(cell.origin_id).split("+");
        const source = baseline.get(origins[0]);
        if (!source) return true;
        return cell.id !== source.id || cell.program !== source.program || cell.open_hours !== source.open_hours ||
          Math.abs(cell.public_ratio - source.public_ratio) > EPSILON || Math.abs(cell.permeability - source.permeability) > EPSILON;
      });
      (isAffected ? affected : preserved).push(individual.id);
    }));
    if (!affected.length && preserved.length > 1) affected.push(preserved.shift());
    if (!preserved.length && affected.length > 1) preserved.push(affected.pop());
    if (affected.length) {
      archive.forEach((entries, key) => {
        archive.set(key, entries.filter((entry) => !affected.includes(entry.id)));
        if (!archive.get(key).length) archive.delete(key);
      });
    }
    return {
      ...clone(intervention),
      affected_individual_ids: affected,
      preserved_individual_ids: preserved,
      recomputation_scope: "affected_lineages_only"
    };
  }

  function chooseScenario(config, generation, index) {
    const scenarios = config.scenarios || [];
    return scenarios[(generation + index) % scenarios.length];
  }

  function pickParent(archive, rng, baseline) {
    const living = [...archive.values()].flat();
    return clone(pick(living.length ? living : [baseline], rng));
  }

  function archiveSnapshot(archive) {
    return Object.fromEntries([...archive.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([key, entries]) => [key, entries.map((entry) => entry.id)]));
  }

  function chooseSpecimen(generationRows, archive, targetNiche = "medium|high|high") {
    const viableRows = generationRows.filter((item) => item.status === "retain" || item.status === "replace");
    const rowExact = viableRows.filter((item) => item.niche === targetNiche);
    const exact = archive.get(targetNiche) || [];
    const pool = rowExact.length ? rowExact : viableRows.length ? viableRows : exact.length ? exact : [...archive.values()].flat();
    if (!pool.length) return generationRows[0]?.id || null;
    return [...pool].sort((left, right) =>
      right.evaluation.evidence_confidence - left.evaluation.evidence_confidence ||
      right.evaluation.reversibility - left.evaluation.reversibility ||
      left.id.localeCompare(right.id)
    )[0].id;
  }

  function adaptOperatorWeights(weights, rejectionCounts) {
    const next = {...weights};
    DEFAULT_OPERATORS.forEach((operator) => {
      const failures = rejectionCounts[operator] || 0;
      next[operator] = round(clamp((next[operator] || 1) * (failures > 5 ? 0.82 : 1.025), 0.22, 2.4));
    });
    return next;
  }

  function run(config, options = {}) {
    const seed = options.seed ?? config.random_seed;
    const rng = createRng(seed);
    const generationCount = options.generations ?? config.engine.digital_generations;
    const offspringCount = options.offspring ?? config.engine.offspring_per_generation;
    const capacity = options.archiveCapacity ?? config.engine.archive_capacity_per_niche;
    const transferProfile = options.transferProfile || {};
    const baselineCells = config.evolutionary_cells.map(prepareCell);
    const baselineScenario = config.scenarios[0];
    const baseline = {
      id: "S03-D0-I000",
      generation: 0,
      parent_ids: [],
      status: "baseline",
      command: null,
      cells: baselineCells,
      evaluation: evaluate(baselineCells, baselineScenario, transferProfile),
      descriptors: descriptors(baselineCells, transferProfile)
    };
    baseline.niche = nicheKey(baseline.descriptors);

    const archive = new Map([[baseline.niche, [baseline]]]);
    const individualMap = new Map([[baseline.id, baseline]]);
    const fossils = [];
    const selectionEvents = [];
    const lineageEvents = [{id: "LIN-D0", generation: 0, type: "birth", individual_id: baseline.id, reason: "evidence_baseline"}];
    const generationSummaries = [{generation: 0, born: 1, retained: 1, replaced: 0, dormant: 0, exited: 0, niche_count: 1, archive: archiveSnapshot(archive), specimen_id: baseline.id}];
    const interventions = [];
    let operatorWeights = Object.fromEntries(DEFAULT_OPERATORS.map((operator) => [operator, 1]));
    const agentHistory = [];

    for (let generation = 1; generation <= generationCount; generation += 1) {
      if (!options.skipInterventions) {
        const intervention = interventionAt(generation, config, archive);
        if (intervention) interventions.push(intervention);
      }
      const rows = [];
      const rejectionCounts = {};
      const counts = {retain: 0, replace: 0, dormant: 0, exit: 0};
      for (let index = 0; index < offspringCount; index += 1) {
        const parent = pickParent(archive, rng, baseline);
        const operatorId = weightedPick(operatorWeights, rng);
        const serial = (generation - 1) * offspringCount + index + 1;
        const context = {rng, generation, serial};
        const mutation = executeMutation(parent, operatorId, context, config);
        const id = `S03-D${String(generation).padStart(2, "0")}-I${String(index + 1).padStart(3, "0")}`;
        if (!mutation.accepted) {
          rejectionCounts[operatorId] = (rejectionCounts[operatorId] || 0) + 1;
          const rejected = {
            id,
            generation,
            parent_ids: [parent.id],
            status: "exit",
            command: mutation.command,
            cells: parent.cells,
            evaluation: parent.evaluation,
            descriptors: parent.descriptors,
            niche: parent.niche,
            death_reason: mutation.reason,
            geometry_errors: mutation.geometry_errors || []
          };
          rows.push(rejected);
          individualMap.set(id, rejected);
          fossils.push(rejected);
          counts.exit += 1;
          selectionEvents.push({id: `SEL-${id}`, generation, individual_id: id, action: "exit", reason: mutation.reason, removed_ids: []});
          lineageEvents.push({id: `LIN-${id}`, generation, type: "death", individual_id: id, parent_ids: [parent.id], operator_id: operatorId, reason: mutation.reason});
          continue;
        }
        const scenario = chooseScenario(config, generation, index);
        const candidate = {
          id,
          generation,
          parent_ids: [parent.id],
          status: "testing",
          command: mutation.command,
          cells: mutation.cells,
          scenario_id: scenario.id,
          evaluation: evaluate(mutation.cells, scenario, transferProfile),
          descriptors: descriptors(mutation.cells, transferProfile)
        };
        candidate.niche = nicheKey(candidate.descriptors);
        const decision = archiveDecision(candidate, archive, capacity);
        candidate.status = decision.action;
        candidate.selection_reason = decision.reason;
        rows.push(candidate);
        individualMap.set(id, candidate);
        const entries = archive.get(candidate.niche) || [];
        if (decision.action === "replace") {
          const removed = entries.filter((entry) => decision.removed.includes(entry.id));
          removed.forEach((entry) => {
            entry.status = "replaced";
            entry.death_reason = decision.reason;
            fossils.push(entry);
          });
          archive.set(candidate.niche, [...entries.filter((entry) => !decision.removed.includes(entry.id)), candidate]);
        } else if (decision.action === "retain") {
          archive.set(candidate.niche, [...entries, candidate]);
        } else {
          candidate.death_reason = decision.reason;
          fossils.push(candidate);
        }
        counts[decision.action] += 1;
        selectionEvents.push({
          id: `SEL-${id}`,
          generation,
          individual_id: id,
          niche: candidate.niche,
          action: decision.action,
          reason: decision.reason,
          removed_ids: decision.removed,
          novelty_distance: decision.novelty_distance ?? null,
          vector: candidate.evaluation
        });
        lineageEvents.push({
          id: `LIN-${id}`,
          generation,
          type: decision.action === "dormant" ? "dormancy" : decision.action === "exit" ? "death" : "birth",
          individual_id: id,
          parent_ids: [parent.id],
          operator_id: operatorId,
          agent_id: mutation.command.agent_id,
          reason: decision.reason
        });
      }
      operatorWeights = adaptOperatorWeights(operatorWeights, rejectionCounts);
      agentHistory.push({generation, operator_weights: {...operatorWeights}, rejected_commands: {...rejectionCounts}});
      generationSummaries.push({
        generation,
        born: offspringCount,
        retained: counts.retain,
        replaced: counts.replace,
        dormant: counts.dormant,
        exited: counts.exit,
        niche_count: archive.size,
        archive: archiveSnapshot(archive),
        specimen_id: chooseSpecimen(rows, archive)
      });
    }

    const individuals = [...individualMap.values()];
    const living = [...archive.values()].flat();
    const finalRows = individuals.filter((item) => item.generation === generationCount && (item.status === "retain" || item.status === "replace"));
    const r1PhenotypeId = chooseSpecimen(finalRows, archive);
    const r1Phenotype = individualMap.get(r1PhenotypeId) || living[0] || baseline;
    return {
      seed,
      generation_count: generationCount,
      offspring_per_generation: offspringCount,
      tested_individual_count: generationCount * offspringCount,
      individuals,
      individual_by_id: Object.fromEntries(individuals.map((item) => [item.id, item])),
      generations: generationSummaries,
      niche_archive: archiveSnapshot(archive),
      niche_count: archive.size,
      living_ids: living.map((item) => item.id),
      fossil_ids: [...new Set(fossils.map((item) => item.id))],
      selection_events: selectionEvents,
      lineage_events: lineageEvents,
      human_interventions: interventions,
      agent_history: agentHistory,
      r1_phenotype_id: r1Phenotype.id,
      r1_phenotype: r1Phenotype,
      no_global_winner: true
    };
  }

  function runTransferTests(config) {
    return (config.transfer_tests || []).map((test, index) => {
      const result = run(config, {
        seed: config.random_seed + 1000 + index,
        generations: 8,
        offspring: 12,
        archiveCapacity: 2,
        transferProfile: test.input_shift,
        skipInterventions: true
      });
      const phenotype = result.r1_phenotype;
      return {
        id: test.id,
        name_zh: test.name_zh,
        type: test.type,
        expected_adaptation_zh: test.expected_adaptation_zh,
        niche_count: result.niche_count,
        cell_count: phenotype.cells.length,
        descriptors: phenotype.descriptors,
        signature: signature(phenotype).map((value) => round(value, 3)),
        phenotype_cells: phenotype.cells,
        tested_individual_count: result.tested_individual_count
      };
    });
  }

  function traceLineage(result, individualId) {
    const chain = [];
    let current = result.individual_by_id[individualId];
    const guard = new Set();
    while (current && !guard.has(current.id)) {
      guard.add(current.id);
      chain.unshift(current);
      current = current.parent_ids?.length ? result.individual_by_id[current.parent_ids[0]] : null;
    }
    return chain;
  }

  function diffCells(before, after) {
    const left = new Map(before.map((cell) => [cell.id, cell]));
    const right = new Map(after.map((cell) => [cell.id, cell]));
    const added = [...right.keys()].filter((id) => !left.has(id));
    const removed = [...left.keys()].filter((id) => !right.has(id));
    const changed = [...right.keys()].filter((id) => left.has(id) && JSON.stringify(left.get(id)) !== JSON.stringify(right.get(id)));
    return {added, removed, changed};
  }

  return {
    VECTOR_KEYS,
    createRng,
    rectToPolygon,
    validateGeometry,
    paretoDominates,
    nicheKey,
    run,
    runTransferTests,
    traceLineage,
    diffCells
  };
});
