#!/usr/bin/env python3
"""Read-only sweep of all submission metrics.json files.

Produces a long-format table (one row per package per metric) and a summary
JSON that reports coverage, units, status, confidence, and outlier COUNTS
only - never package paths, authors, or slugs. The summary is safe to
publish; the long table is a local reproducibility artifact and must not be
committed with author-identifying columns.

Usage:
    python3 tools-metrics-scan.py --repo <repo-root> --out-dir <dir> \
        --date YYYYMMDD --sha <commit-sha>
"""

from __future__ import annotations

import argparse
import csv
import gzip
import json
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

VALID_STATUS = {"known", "unknown", "not_applicable"}
VALID_UNITS = {"sqm", "m", "ratio", "count", "index", "none"}
# schema_version is an open string attribute in the schema: only versions
# observed across the field may appear verbatim, everything else collapses
# into an anonymous other bucket (counts only, never the value itself).
KNOWN_SCHEMA_VERSIONS = {"0.1.0", "0.2.0", "0.1.1", "1.0", "1.10.0"}
RATIO_SANITY = (0.0, 1.0)
FAR_SANITY_MAX = 12.0
HEIGHT_SANITY_MAX_M = 300.0


def is_ratio_metric(key: str) -> bool:
    """True when the metric key is a ratio (suffix/segment `ratio`)."""
    lower = key.lower()
    return lower.endswith("_ratio") or "_ratio_" in lower or lower.endswith("ratio")


def is_share_ratio(key: str, unit) -> bool:
    """True when the ratio is a share/coverage (0-1 semantics).

    Not every ratio belongs in [0,1]: floor_area_ratio is a FAR (sanity max
    12), network_detour_ratio and street-wall height/width ratios are
    routinely >1. Also skip percentage units (pct/percent) - a 10 pct
    control is not a 0-1 ratio violation. Substring pitfalls: 'acceleration'
    contains 'ratio'.
    """
    if unit and ("pct" in str(unit).lower() or "percent" in str(unit).lower()):
        return False
    if not is_ratio_metric(key):
        return False
    if is_far_metric(key, unit):
        return False
    lower = key.lower()
    if any(p in lower for p in ("detour", "street_wall", "height_width", "width")):
        return False
    return any(p in lower for p in ("green", "public_space", "coverage", "_share", "open_space", "utilization", "renewal", "vacancy", "occupancy"))


def is_far_metric(key: str, unit=None) -> bool:
    """True for floor-area-ratio keys. Unit must not be an area unit:
    keys like phasing_far_area_sqm are phase areas ('far' = far-term
    phase), not floor-area-ratio values, and would otherwise trip the
    FAR sanity bound as false positives."""
    if unit and "sqm" in str(unit).lower():
        return False
    lower = key.lower()
    return "floor_area_ratio" in lower or lower.endswith("_far") or "_far_" in lower


def is_height_metric(key: str) -> bool:
    lower = key.lower()
    # height controls (m), excluding derived ratios like street-wall height/width
    return "height" in lower and not is_ratio_metric(key)


# From brief/site-package/ranges/planning_limits.json known_official_area_values
OFFICIAL_AREA_SQM = {
    "coordinated_research_area_sqm": 43600000,
    "overall_design_area_sqm": 11400000,
    "key_detailed_design_area_sqm": 3684000,
    "zhongzhiyuan_ai_acceleration_area_sqm": 1921000,
    "beijing_ai_origin_community_sqm": 1043000,
    "dazhongsi_ai_industry_cluster_sqm": 720000,
}

# Metric keys that are safe to publish VERBATIM in the anonymous summary:
# the official known area values plus the well-known keys observed across
# the full-field sweep (see the last refreshed summary's top_metric_keys).
# metric_key is an open attribute in the schema - any other key is
# unverified free text and must only ever appear aggregated (counts only).
CONTROLLED_METRIC_KEYS = frozenset(OFFICIAL_AREA_SQM) | frozenset({
    "site_area_sqm", "green_ratio", "public_space_ratio", "key_area_count",
    "building_footprint_area_sqm", "floor_area_ratio", "public_space_area_sqm",
    "green_space_area_sqm", "persona_count", "building_density",
    "building_height_m", "total_floor_area_sqm", "scenario_node_count",
    "renewal_project_count", "scenario_card_count", "landmark_count",
    "phase_count", "phase_1_area_sqm", "road_area_sqm", "phase_2_area_sqm",
})

REQUIRED_FIELDS = ("status", "value", "unit", "source_files", "formula", "confidence")
LONG_FIELDS = (
    "pkg", "author", "slug", "metric_key", "norm_key", "concept",
    "status", "value", "value_is_num", "unit", "confidence", "formula",
    "reason", "n_source_files", "n_assumptions", "has_breakdown",
    "n_breakdown", "missing_required", "missing_fields", "n_extra_fields",
    "formula_mentions_epsg", "formula_mentions_4548",
    "schema_version", "units_area", "units_length", "model_family",
    "entry_ok", "entry_problem",
)


def norm_key(metric_key: str) -> str:
    """Normalize a metric key by stripping trailing units like _sqm/_m."""
    key = metric_key
    for suffix in ("_sqm", "_m2", "_km2", "_m", "_ha", "_ratio", "_count", "_pct"):
        if key.endswith(suffix):
            return key[: -len(suffix)]
    return key


def concept_of(key: str) -> str:
    """Coarse concept bucket for a normalized key, for coverage stats."""
    k = key.lower()
    if "area" in k:
        return "area"
    if "length" in k or "network" in k or "road" in k or "trail" in k or "path" in k:
        return "mobility"
    if "ratio" in k or "density" in k or "far" in k or "height" in k:
        return "intensity"
    if "green" in k or "open" in k or "public" in k or "park" in k:
        return "green_public"
    if "count" in k or "number" in k or "node" in k or "scenario" in k or "case" in k:
        return "counts"
    return "other"


def is_num(value) -> bool:
    if isinstance(value, bool):
        return False
    if isinstance(value, (int, float)):
        return True
    if isinstance(value, str):
        try:
            float(value)
            return True
        except ValueError:
            return False
    return False


def verify_snapshot_sha(repo_root: Path, declared_sha: str) -> tuple[bool, str]:
    """Verify --sha against the repo HEAD so a typo cannot mislabel a snapshot.

    Returns (ok, detail). ok=False when git metadata is unavailable or the
    declared sha does not match the actual HEAD of the scanned checkout.
    """
    try:
        result = subprocess.run(
            ["git", "-C", str(repo_root), "rev-parse", "HEAD"],
            capture_output=True, text=True, timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        return False, f"git unavailable for {repo_root}: {exc}"
    if result.returncode != 0:
        return False, f"cannot resolve HEAD in {repo_root}: {result.stderr.strip()}"
    actual = result.stdout.strip()
    if actual == declared_sha:
        return True, actual
    return False, f"declared --sha {declared_sha} does not match repo HEAD {actual}"


# File names that participate in the scan statistics. Everything else under
# submissions/ is irrelevant to the snapshot and is ignored by the
# dirty-worktree guard (a sparse-checkout checkout shows every unmatched
# tracked path as deleted, which must not block a legitimate scan).
SCANNABLE_SUFFIXES = ("metrics.json", "manifest.json", "agent.json", "proposal.md")


def check_worktree_clean(repo_root: Path, scan_subdir: str = "submissions/") -> tuple[bool, str]:
    """Fail-closed guard: nothing that participates in the scan may differ
    from HEAD.

    scan() reads the working tree (not the declared commit's object content),
    so a snapshot claiming ``sha_verified_against_head=true`` is only honest
    when every path that feeds the statistics is byte-identical to the
    commit - no tracked modifications to scannable files, no untracked
    additions. Returns (ok, detail). There is deliberately no opt-out:
    dirty-tree scans must not produce a publishable summary.

    Deleted (D) entries for non-scannable files are expected under
    sparse-checkout checkouts and are not treated as dirty.
    """
    try:
        result = subprocess.run(
            ["git", "-C", str(repo_root), "status", "--porcelain", "--", scan_subdir],
            capture_output=True, text=True, timeout=30,
        )
    except (OSError, subprocess.TimeoutExpired) as exc:
        return False, f"git unavailable for {repo_root}: {exc}"
    if result.returncode != 0:
        return False, f"cannot check worktree status in {repo_root}: {result.stderr.strip()}"
    dirty = []
    for line in result.stdout.splitlines():
        if not line.strip():
            continue
        path = line[3:].strip()
        # Deletion can appear in either column ("D " = index/sparse-checkout
        # removal, " D" = worktree removal); non-scannable deletions are
        # expected under sparse-checkout and never block a scan.
        if "D" in line[:2] and not path.endswith(SCANNABLE_SUFFIXES):
            continue
        dirty.append(line)
    if dirty:
        sample = " | ".join(dirty[:5])
        return False, (
            f"worktree is not clean under {scan_subdir} ({len(dirty)} "
            f"changed/untracked path(s), e.g. {sample}); a snapshot claiming "
            f"the declared --sha would read dirty bytes - refusing to run"
        )
    return True, "worktree clean"


def _out_dir_inside_worktree(out_dir: Path, repo_root: Path) -> bool:
    """True when out-dir, under any path spelling, lands inside the scanned
    worktree. Path.resolve() normalizes relative-vs-absolute mixes and
    symlinks; strict=False resolves the existing parent prefix when the
    out-dir itself does not exist yet. A resolve failure fails closed."""
    try:
        out_real = out_dir.resolve(strict=False)
        repo_real = repo_root.resolve(strict=False)
    except OSError:
        return True
    return out_real.is_relative_to(repo_real)


def parse_metrics_file(path: Path) -> tuple[dict | None, str | None]:
    """Return (parsed_json, error). parsed_json is None on failure."""
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f), None
    except json.JSONDecodeError as exc:
        return None, f"json decode error: {exc}"
    except OSError as exc:
        return None, f"read error: {exc}"


def read_model_family(pkg_dir: Path) -> str | None:
    """Best-effort model family from agent.json or manifest.json, if present."""
    for name in ("agent.json", "manifest.json"):
        path = pkg_dir / name
        if not path.is_file():
            continue
        try:
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
            if not isinstance(data, dict):
                continue
            family = data.get("model_family")
            if isinstance(family, str) and family:
                return family
            detail = data.get("model_detail") or data.get("model")
            if isinstance(detail, str) and detail:
                return detail
        except (json.JSONDecodeError, OSError):
            continue
    return None


def scan(repo_root: Path, out_dir: Path, date_stamp: str, sha: str,
         sha_verified: bool = True, write_identifiers: bool = False) -> None:
    pkg_dirs = sorted((repo_root / "submissions").glob("*/*"))
    metrics_paths = [p / "metrics.json" for p in pkg_dirs if (p / "metrics.json").is_file()]
    manifest_paths = [p / "manifest.json" for p in pkg_dirs if (p / "manifest.json").is_file()]
    proposal_paths = [p / "proposal.md" for p in pkg_dirs if (p / "proposal.md").is_file()]

    n_pkgs = len(pkg_dirs)
    rows: list[dict] = []
    parse_failures: list[tuple[str, str]] = []  # (path, error) - local only
    root_shape = Counter()
    schema_versions = Counter()
    per_pkg_metric_count = []
    field_missing: Counter = Counter()
    entry_problems = Counter()
    outliers: Counter = Counter()

    for path in metrics_paths:
        data, err = parse_metrics_file(path)
        if err:
            parse_failures.append((str(path), err))
            continue
        # root structure check
        if not isinstance(data, dict):
            parse_failures.append((str(path), "root not a dict"))
            continue
        keys = tuple(sorted(k for k in ("schema_version", "units", "metrics") if k in data))
        root_shape[keys] += 1
        sv = data.get("schema_version")
        schema_versions[str(sv)] += 1
        units = data.get("units") if isinstance(data.get("units"), dict) else {}
        metrics = data.get("metrics")
        if not isinstance(metrics, dict):
            parse_failures.append((str(path), "metrics not a dict"))
            continue
        author = path.parent.parent.name
        slug = path.parent.name
        pkg = f"{author}/{slug}"
        model_family = read_model_family(path.parent)
        per_pkg_metric_count.append(len(metrics))
        for key, entry in metrics.items():
            if not isinstance(entry, dict):
                entry_problems["non-dict metric entry"] += 1
                continue
            row = {
                "pkg": pkg, "author": author, "slug": slug,
                "metric_key": key, "norm_key": norm_key(key),
                "concept": concept_of(key),
            }
            status = entry.get("status")
            value = entry.get("value")
            unit = entry.get("unit")
            confidence = entry.get("confidence")
            source_files = entry.get("source_files")
            formula = entry.get("formula")
            assumptions = entry.get("assumptions")
            breakdown = entry.get("breakdown")

            missing_req = [f for f in REQUIRED_FIELDS if f not in entry]
            missing_all = [f for f in LONG_FIELDS if f in REQUIRED_FIELDS and f not in entry]
            row.update({
                "status": status if isinstance(status, str) else None,
                "value": value if value is not None else None,
                "value_is_num": is_num(value),
                "unit": unit if isinstance(unit, str) else None,
                "confidence": confidence if isinstance(confidence, str) else None,
                "formula": formula if isinstance(formula, str) else None,
                "reason": entry.get("reason") if isinstance(entry.get("reason"), str) else None,
                "n_source_files": len(source_files) if isinstance(source_files, list) else 0,
                "n_assumptions": len(assumptions) if isinstance(assumptions, list) else 0,
                "has_breakdown": breakdown is not None,
                "n_breakdown": len(breakdown) if isinstance(breakdown, dict) else 0,
                "missing_required": ",".join(missing_req) if missing_req else "",
                "missing_fields": ",".join(missing_all) if missing_all else "",
                "n_extra_fields": len(set(entry) - set(REQUIRED_FIELDS + ("reason", "assumptions", "breakdown"))),
                "formula_mentions_epsg": bool(formula and "EPSG" in formula),
                "formula_mentions_4548": bool(formula and "4548" in formula),
                "schema_version": str(sv),
                "units_area": units.get("area") if isinstance(units.get("area"), str) else None,
                "units_length": units.get("length") if isinstance(units.get("length"), str) else None,
                "model_family": model_family,
                "entry_ok": not missing_req and entry.get("status") in VALID_STATUS,
                "entry_problem": "",
            })
            if not row["entry_ok"]:
                if status in VALID_STATUS:
                    # enum values are a fixed vocabulary - safe to name
                    entry_problems[f"status={status}"] += 1
                else:
                    # free text: aggregate only, never echo the value
                    entry_problems["status_not_in_enum"] += 1
            for f in missing_req:
                field_missing[f] += 1
            if row["status"] not in VALID_STATUS:
                outliers["status_not_in_enum"] += 1
            if row["unit"] is None:
                # field absent or not a string (e.g. JSON null): field absence,
                # not a declared invalid value - counted separately so the
                # summary can distinguish "no unit declared" from "bad unit"
                outliers["unit_missing"] += 1
            elif row["unit"] not in VALID_UNITS:
                outliers["unit_not_in_enum"] += 1
            # numeric sanity (counts only)
            if row["value_is_num"]:
                v = float(value)
                if is_share_ratio(key, unit) and not (RATIO_SANITY[0] <= v <= RATIO_SANITY[1]):
                    outliers["ratio_outside_0_1"] += 1
                if is_far_metric(key, unit) and v > FAR_SANITY_MAX:
                    outliers["far_above_12"] += 1
                if is_height_metric(key) and v > HEIGHT_SANITY_MAX_M:
                    outliers["height_above_300m"] += 1
            # area sanity vs the official known values in planning_limits.json:
            # flag entries that deviate more than 50% from the official figure.
            # Counts only - this catches e.g. a site area entered as the
            # 43.6 sqkm research scope instead of the 11.4 sqkm design area.
            if key in OFFICIAL_AREA_SQM and row["value_is_num"]:
                official = OFFICIAL_AREA_SQM[key]
                if v <= 0 or abs(v - official) / official > 0.5:
                    outliers[f"area_deviation_over_50pct_{key}"] += 1
            rows.append(row)

    # ---- summary (publishable: counts and anonymized stats only) ----
    n_entries = len(rows)
    per_pkg = sorted(per_pkg_metric_count)
    # Only controlled official keys may appear verbatim; any other metric key
    # is unverified free text (open attribute in the schema) and is collapsed
    # into an aggregate "other" bucket - counts only, never the key itself.
    # The controlled vocabulary is small (26 keys) and fixed: list ALL of
    # them so that top_metric_keys + other_metric_keys exactly reconciles
    # against n_metric_entries (no truncation gap for reviewers to chase).
    top_metric_keys = Counter(
        r["metric_key"] for r in rows if r["metric_key"] in CONTROLLED_METRIC_KEYS
    ).most_common()
    top_norm_keys = Counter(
        r["norm_key"] for r in rows if r["metric_key"] in CONTROLLED_METRIC_KEYS
    ).most_common()
    n_other_metric_keys = len({r["metric_key"] for r in rows} - CONTROLLED_METRIC_KEYS)
    n_other_metric_entries = sum(
        1 for r in rows if r["metric_key"] not in CONTROLLED_METRIC_KEYS
    )
    concept_cover = Counter(r["concept"] for r in rows)
    status_dist = Counter(r["status"] for r in rows)
    unit_dist = Counter(r["unit"] for r in rows)
    confidence_dist = Counter(r["confidence"] for r in rows)
    # per-key status cross tabulation for the controlled metric keys only
    key_status = defaultdict(Counter)
    for r in rows:
        if r["metric_key"] in CONTROLLED_METRIC_KEYS:
            key_status[r["metric_key"]][r["status"]] += 1

    def enum_summary(dist: Counter, valid_values: set[str]) -> dict:
        """Split a distribution into the declared enum (with counts) and an
        anonymous 'other' bucket. Non-enum values are free text: the summary
        reports only their total count and the number of distinct values,
        never the values themselves (privacy boundary)."""
        declared = {k: v for k, v in dist.most_common() if k in valid_values}
        others = {k: v for k, v in dist.most_common() if k not in valid_values}
        return {
            "declared_enum": declared,
            "other_values": {
                "total_count": sum(others.values()),
                "n_distinct_values": len(others),
            },
        }

    def status_cross_summary(dist: Counter) -> dict:
        """Per-key status cross for controlled keys: only the declared status
        enum appears verbatim; any other status (free text, or JSON null)
        collapses into an anonymous other bucket - counts only, never the
        value itself (privacy boundary)."""
        declared = {s: c for s, c in sorted(dist.items()) if s in VALID_STATUS}
        others = {s: c for s, c in dist.items() if s not in VALID_STATUS}
        return {
            **declared,
            "other": {
                "total_count": sum(others.values()),
                "n_distinct_values": len(others),
            },
        }

    def pct(n: int) -> float:
        return round(100.0 * n / n_entries, 2) if n_entries else 0.0

    summary = {
        "snapshot": {
            "repository": "open-city-ai/haidian",
            "sha": sha,
            "sha_verified_against_head": sha_verified,
            "date": date_stamp,
            "n_packages_total_dirs": n_pkgs,
            "n_packages_with_metrics": len(metrics_paths),
            "n_packages_with_manifest": len(manifest_paths),
            "n_packages_with_proposal": len(proposal_paths),
            "n_metric_entries": n_entries,
            "n_parse_failures": len(parse_failures),
        },
        "root_structure": {
            "container_shapes": {",".join(k) if k else "(empty)": v for k, v in root_shape.most_common()},
            "schema_versions": enum_summary(schema_versions, KNOWN_SCHEMA_VERSIONS),
        },
        "field_coverage": {
            f: {"missing_count": c, "missing_pct": pct(c)} for f, c in field_missing.most_common()
        },
        "entry_validity": {
            "valid_entries": sum(1 for r in rows if r["entry_ok"]),
            "valid_pct": pct(sum(1 for r in rows if r["entry_ok"])),
            "problem_breakdown": {
                k: {
                    "count": v,
                    "explanation": (
                        "metric entry is not a dict" if k == "non-dict metric entry"
                        else (
                            "entry status is outside the declared enum "
                            "(known/unknown/not_applicable); the status value "
                            "is free text and is not echoed (privacy)"
                            if k == "status_not_in_enum"
                            else "entry has a declared-valid status but is missing one or more required fields (status/value/unit/source_files/formula/confidence)"
                        )
                    ),
                }
                for k, v in entry_problems.most_common()
            },
        },
        "distributions": {
            "status": enum_summary(status_dist, VALID_STATUS),
            "unit": enum_summary(unit_dist, VALID_UNITS),
            "confidence": enum_summary(confidence_dist, {"high", "medium", "low", "unknown"}),
        },
        "packages": {
            "metrics_per_pkg": {
                "min": per_pkg[0] if per_pkg else None,
                "median": per_pkg[len(per_pkg) // 2] if per_pkg else None,
                "max": per_pkg[-1] if per_pkg else None,
                "mean": round(sum(per_pkg) / len(per_pkg), 2) if per_pkg else None,
            },
        },
        "coverage": {
            "top_metric_keys": [{k: v} for k, v in top_metric_keys],
            "top_normalized_keys": [{k: v} for k, v in top_norm_keys],
            "other_metric_keys": {
                "n_distinct_keys": n_other_metric_keys,
                "n_entries": n_other_metric_entries,
            },
            "concept_buckets": {k: {"count": v, "pct": pct(v)} for k, v in concept_cover.most_common()},
            "top_key_status_cross": {
                k: status_cross_summary(key_status[k])
                for k, _ in top_metric_keys
            },
        },
        "outlier_counts_only": {
            "status_not_in_enum": outliers["status_not_in_enum"],
            "unit_missing": outliers["unit_missing"],
            "unit_not_in_enum": outliers["unit_not_in_enum"],
            "ratio_outside_0_1": outliers["ratio_outside_0_1"],
            "far_above_12": outliers["far_above_12"],
            "height_above_300m": outliers["height_above_300m"],
            **{k: v for k, v in outliers.items() if k.startswith("area_deviation")},
            "note": "counts only; no package is named or ranked",
            "sanity_sources": (
                "bounds from brief/site-package/ranges/planning_limits.json "
                "schema_sanity_bounds_not_planning_approval; ratio check applies "
                "to share/coverage ratios only (FAR, detour and street-wall "
                "height/width ratios have their own legitimate ranges and are "
                "excluded; percentage-unit entries are excluded); FAR check "
                "excludes area-valued keys (e.g. phasing_far_area_sqm is a "
                "phase area, not a floor-area-ratio); area deviation threshold: "
                ">50% off the official known area value in the same file "
                "(known_official_area_values)"
            ),
        },
        "privacy_boundary": (
            "This summary contains aggregate counts only. It does not contain "
            "package paths, authors, slugs, or any ranking. Metric keys are "
            "published verbatim only when they belong to the controlled "
            "official vocabulary (CONTROLLED_METRIC_KEYS); all other keys, "
            "and all non-enum status/unit/confidence values, appear only as "
            "counts (total and number of distinct values) - never verbatim. "
            "schema_version appears verbatim only for the known versions "
            "observed across the field (KNOWN_SCHEMA_VERSIONS); the per-key "
            "status cross for controlled keys lists only the declared status "
            "enum (known/unknown/not_applicable), any other status collapsing "
            "into an anonymous other count. The long-format table and the "
            "parse-failure detail carry identifying paths and are local "
            "artifacts, written only with --write-local-identifiers to a "
            "directory outside the scanned worktree, and must never be "
            "committed."
        ),
    }

    out_dir.mkdir(parents=True, exist_ok=True)
    summary_path = out_dir / f"metrics-fullfield-{date_stamp}.summary.json"
    # newline="" keeps LF on Windows: CRLF line endings have broken CI
    # checksum validation before (see issue #1062), so artifacts stay LF.
    with open(summary_path, "w", encoding="utf-8", newline="") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    if write_identifiers:
        # Local artifacts (identifiers long table, parse-failure detail) carry
        # package paths/authors: refuse ANY spelling of an in-worktree out-dir
        # (relative-vs-absolute mixes and symlinks are resolved first) so a
        # stray `--out-dir contrib` can never be staged/committed by accident.
        if _out_dir_inside_worktree(out_dir, repo_root):
            raise SystemExit(
                f"refusing to write local artifacts into the scanned worktree "
                f"({out_dir}); choose an out-dir outside the repo, e.g. a "
                f"temp dir"
            )
        long_path = out_dir / f"metrics-fullfield-{date_stamp}.csv.gz"
        with gzip.open(long_path, "wt", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=LONG_FIELDS)
            writer.writeheader()
            writer.writerows(rows)
        if parse_failures:
            # Parse-failure detail contains submission paths: same opt-in and
            # same outside-worktree boundary as the identifiers table; the
            # summary keeps only the anonymous failure count.
            with open(out_dir / f"metrics-scan-{date_stamp}.parse-failures.txt", "w", encoding="utf-8") as f:
                for path, err in parse_failures:
                    f.write(f"{path}\t{err}\n")

    print(json.dumps(summary["snapshot"], ensure_ascii=False, indent=2))
    print(f"wrote {summary_path}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", required=True, help="repository root containing submissions/")
    parser.add_argument("--out-dir", required=True, help="output directory")
    parser.add_argument("--date", required=True, help="snapshot date YYYYMMDD")
    parser.add_argument("--sha", required=True, help="commit sha of the snapshot")
    parser.add_argument(
        "--allow-sha-mismatch",
        action="store_true",
        help="proceed even when --sha does not match the repo HEAD; the summary "
        "then records sha_verified_against_head=false. Never bypasses the "
        "dirty-worktree guard.",
    )
    parser.add_argument(
        "--write-local-identifiers",
        action="store_true",
        help="also write the long-format table (pkg/author/slug/model_family) "
        "as csv.gz. Off by default; refused when out-dir is inside the scanned "
        "worktree.",
    )
    args = parser.parse_args(argv)
    repo = Path(args.repo)
    # Fail-closed: a dirty worktree would make the scan read bytes that do
    # not belong to the declared commit - no flag can override this.
    clean, clean_detail = check_worktree_clean(repo)
    if not clean:
        parser.error(clean_detail)
    verified, detail = verify_snapshot_sha(repo, args.sha)
    if not verified and not args.allow_sha_mismatch:
        parser.error(detail)
    if not verified:
        print(f"WARNING: {detail}; summary marks the snapshot as unverified")
    scan(repo, Path(args.out_dir), args.date, args.sha,
         sha_verified=verified, write_identifiers=args.write_local_identifiers)
    return 0


if __name__ == "__main__":
    sys.exit(main())
