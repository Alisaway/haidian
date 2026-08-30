#!/usr/bin/env python3
"""Regression tests for tools-metrics-scan.py (stdlib only, no pip deps).

Locks the boundaries discussed in the PR review:

- missing/null unit and non-enum unit are counted separately
  (`unit_missing` vs `unit_not_in_enum`, mutually exclusive)
- pct/percent units are excluded from the 0-1 share-ratio sanity check
- `*_far_area_sqm` phase-area keys are not treated as floor-area-ratio
- `--sha` mismatch is rejected unless `--allow-sha-mismatch` is passed,
  and an unverified snapshot is recorded in the summary
- dirty worktree (tracked modification or untracked package/file under
  submissions/) is ALWAYS refused - no flag can bypass the guard
- the publishable summary never echoes unverified free text (metric keys
  outside the controlled vocabulary, non-enum status/unit/confidence)
- the identifiers csv.gz is off by default, requires
  `--write-local-identifiers`, and is refused inside the scanned worktree

Run: python3 contrib/test_tools_metrics_scan.py
"""
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load_tool():
    """Load tools-metrics-scan.py by file path (hyphenated name is not importable)."""
    spec = importlib.util.spec_from_file_location(
        "tools_metrics_scan", HERE / "tools-metrics-scan.py"
    )
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return mod


def make_metrics(entries: dict) -> dict:
    return {
        "schema_version": 1,
        "units": {"area": "sqm", "length": "m"},
        "metrics": entries,
    }


def entry(value, unit=None, status="known"):
    """A valid-shaped metric entry; unit omitted entirely when None is passed
    explicitly, so a missing field can be distinguished from JSON null."""
    e = {
        "status": status,
        "value": value,
        "unit": unit,
        "source_files": [],
        "formula": "",
        "confidence": "high",
    }
    if unit is None:
        del e["unit"]
    return e


def run_scan(tmp_dir: Path, metrics: dict, write_identifiers: bool = False) -> dict:
    """Write a fake repo under tmp_dir, run the scan, return the summary."""
    pkg = tmp_dir / "submissions" / "author" / "slug"
    pkg.mkdir(parents=True)
    (pkg / "metrics.json").write_text(
        json.dumps(metrics, ensure_ascii=False), encoding="utf-8"
    )
    out = tmp_dir / "out"
    tool = load_tool()
    tool.scan(tmp_dir, out, "20260812", "deadbeef", sha_verified=True,
              write_identifiers=write_identifiers)
    summary_path = out / "metrics-fullfield-20260812.summary.json"
    return json.loads(summary_path.read_text(encoding="utf-8"))


# ---- helpers for real-git-repo tests ----

def git(repo: Path, *args: str) -> None:
    subprocess.run(["git", "-C", str(repo), *args], check=True,
                   capture_output=True, text=True)


def init_repo(repo: Path) -> None:
    repo.mkdir(parents=True)
    git(repo, "init", "-q")
    git(repo, "config", "user.name", "test")
    git(repo, "config", "user.email", "test@example.com")


def commit_all(repo: Path, message: str = "test commit") -> str:
    git(repo, "add", "-A")
    git(repo, "commit", "-q", "-m", message)
    out = subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"],
                         capture_output=True, text=True, check=True)
    return out.stdout.strip()


def write_pkg_metrics(repo: Path, author: str, slug: str, metrics: dict) -> Path:
    pkg = repo / "submissions" / author / slug
    pkg.mkdir(parents=True, exist_ok=True)
    path = pkg / "metrics.json"
    path.write_text(json.dumps(metrics, ensure_ascii=False), encoding="utf-8")
    return path


class UnitEnumSplitTest(unittest.TestCase):
    def test_missing_and_non_enum_units_are_counted_separately(self):
        metrics = make_metrics({
            # valid enum unit: no outlier
            "site_area_sqm": entry(100, "sqm"),
            # unit field entirely absent
            "no_unit_field": entry(1),
            # unit is JSON null
            "null_unit": entry(1, None),
            # declared but invalid enum string
            "bad_unit": entry(1, "hectare"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        counts = summary["outlier_counts_only"]
        self.assertEqual(counts["unit_missing"], 2, "absent + null unit")
        self.assertEqual(counts["unit_not_in_enum"], 1, "declared invalid unit")
        # distributions must agree: only None and "hectare" fall outside the enum
        others = summary["distributions"]["unit"]["other_values"]
        self.assertEqual(others["total_count"], 3, "None x2 + hectare x1")
        self.assertEqual(others["n_distinct_values"], 2)
        # privacy boundary: the non-enum string itself must never be echoed
        self.assertNotIn("hectare", json.dumps(summary, ensure_ascii=False))

    def test_valid_units_do_not_trigger_either_counter(self):
        metrics = make_metrics({
            "site_area_sqm": entry(100, "sqm"),
            "road_length_m": entry(2000, "m"),
            "node_count": entry(3, "count"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        counts = summary["outlier_counts_only"]
        self.assertEqual(counts["unit_missing"], 0)
        self.assertEqual(counts["unit_not_in_enum"], 0)


class SanityBoundaryTest(unittest.TestCase):
    def test_pct_units_excluded_from_share_ratio_check(self):
        metrics = make_metrics({
            # 1.5 with pct unit must NOT trip the 0-1 share check
            "green_coverage_ratio": entry(1.5, "pct"),
            # same value with ratio unit SHOULD trip it
            "green_coverage_ratio_ratio": entry(1.5, "ratio"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        self.assertEqual(summary["outlier_counts_only"]["ratio_outside_0_1"], 1)

    def test_phasing_far_area_sqm_is_not_a_far_value(self):
        metrics = make_metrics({
            # phase area in sqm: 500k is a legitimate phase area, not FAR
            "phasing_far_area_sqm": entry(500000, "sqm"),
            # genuine FAR above the 12.0 sanity max
            "floor_area_ratio": entry(15.0, "ratio"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        self.assertEqual(summary["outlier_counts_only"]["far_above_12"], 1)


class PrivacyBoundaryTest(unittest.TestCase):
    def test_free_text_never_appears_in_publishable_summary(self):
        """The maintainer's repro: email/path-style strings in metric key,
        status, unit and confidence must not be echoed anywhere in the
        serialized summary, while controlled keys stay visible."""
        leak = "alice@example.invalid"
        e = entry(1, leak, status=leak)
        e["confidence"] = leak
        metrics = make_metrics({
            "contact_alice_example_invalid": e,
            # controlled key must remain verbatim in coverage stats
            "site_area_sqm": entry(100, "sqm"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        text = json.dumps(summary, ensure_ascii=False)
        self.assertNotIn(leak, text, "email string leaked into summary")
        self.assertNotIn("contact_alice_example_invalid", text,
                         "uncontrolled metric key leaked into summary")
        # status/unit/confidence other buckets count but never name the value
        self.assertIn("n_distinct_values", summary["distributions"]["unit"]["other_values"])
        self.assertNotIn("top", summary["distributions"]["unit"]["other_values"])
        self.assertNotIn("top", summary["distributions"]["confidence"]["other_values"])
        # controlled keys still reported verbatim
        self.assertIn("site_area_sqm", text)
        # uncontrolled keys collapsed into the aggregate bucket
        self.assertEqual(
            summary["coverage"]["other_metric_keys"]["n_distinct_keys"], 1)

    def test_uncontrolled_keys_collapse_but_counts_stay_closed(self):
        metrics = make_metrics({
            "site_area_sqm": entry(100, "sqm"),
            "mystery_key_xyz": entry(1, "sqm"),
            "mystery_key_abc": entry(2, "sqm"),
        })
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        other = summary["coverage"]["other_metric_keys"]
        self.assertEqual(other["n_distinct_keys"], 2)
        self.assertEqual(other["n_entries"], 2)
        # total entries must still be closed against the snapshot
        self.assertEqual(summary["snapshot"]["n_metric_entries"], 3)

    def test_controlled_key_illegal_status_and_schema_version_never_echoed(self):
        """The maintainer's second repro: with a CONTROLLED key, an illegal
        status and an illegal root schema_version must still never be echoed -
        root_structure.schema_versions and coverage.top_key_status_cross both
        bucket them anonymously."""
        leak = "alice@example.invalid"
        metrics = make_metrics({
            "site_area_sqm": entry(100, "sqm", status=leak),
        })
        metrics["schema_version"] = leak
        with tempfile.TemporaryDirectory() as td:
            summary = run_scan(Path(td), metrics)
        text = json.dumps(summary, ensure_ascii=False)
        self.assertNotIn(leak, text, "injected string leaked into summary")
        # schema_versions: only the known enum appears verbatim
        sv = summary["root_structure"]["schema_versions"]
        self.assertEqual(sv["declared_enum"], {})
        self.assertEqual(sv["other_values"]["total_count"], 1)
        self.assertEqual(sv["other_values"]["n_distinct_values"], 1)
        # status cross of a controlled key: enum + anonymous other only
        cross = summary["coverage"]["top_key_status_cross"]["site_area_sqm"]
        self.assertEqual(cross["other"]["total_count"], 1)
        self.assertEqual(cross["other"]["n_distinct_values"], 1)
        self.assertNotIn(leak, json.dumps(cross, ensure_ascii=False))
        # the controlled key itself still reported verbatim
        self.assertIn("site_area_sqm", text)


class SnapshotShaTest(unittest.TestCase):
    def test_sha_mismatch_rejected_unless_allow_flag(self):
        tool = load_tool()
        with tempfile.TemporaryDirectory() as td:
            repo = Path(td)  # not a git repo: HEAD cannot resolve
            ok, detail = tool.verify_snapshot_sha(repo, "deadbeef")
            self.assertFalse(ok)
            self.assertIn("cannot resolve HEAD", detail)
            # not a git repo -> worktree guard fails closed, even with the flag
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo), "--out-dir", str(repo / "o"),
                           "--date", "20260812", "--sha", "deadbeef",
                           "--allow-sha-mismatch"])

    def test_clean_repo_matching_sha_runs_and_records_verified(self):
        tool = load_tool()
        with tempfile.TemporaryDirectory() as td:
            repo = Path(td) / "repo"
            init_repo(repo)
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(100, "sqm")}))
            sha = commit_all(repo)
            out = repo / "out"
            tool.main(["--repo", str(repo), "--out-dir", str(out),
                       "--date", "20260812", "--sha", sha])
            summary = json.loads(
                (out / "metrics-fullfield-20260812.summary.json").read_text(encoding="utf-8"))
            self.assertIs(summary["snapshot"]["sha_verified_against_head"], True)
            self.assertEqual(summary["snapshot"]["sha"], sha)

    def test_sha_mismatch_with_allow_flag_records_unverified(self):
        tool = load_tool()
        with tempfile.TemporaryDirectory() as td:
            repo = Path(td) / "repo"
            init_repo(repo)
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(100, "sqm")}))
            commit_all(repo)
            out = repo / "out"
            tool.main(["--repo", str(repo), "--out-dir", str(out),
                       "--date", "20260812", "--sha", "deadbeef",
                       "--allow-sha-mismatch"])
            summary = json.loads(
                (out / "metrics-fullfield-20260812.summary.json").read_text(encoding="utf-8"))
            self.assertIs(summary["snapshot"]["sha_verified_against_head"], False)


class DirtyWorktreeTest(unittest.TestCase):
    def _ready_repo(self) -> tuple[Path, str]:
        repo = Path(tempfile.mkdtemp()) / "repo"
        init_repo(repo)
        write_pkg_metrics(repo, "author", "slug",
                          make_metrics({"site_area_sqm": entry(100, "sqm")}))
        sha = commit_all(repo)
        return repo, sha

    def test_dirty_tracked_file_refused_even_with_allow_flag(self):
        """The maintainer's repro: modify a tracked metrics.json without
        committing, re-run with the ORIGINAL head sha - must refuse and
        produce no publishable summary, even with --allow-sha-mismatch."""
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            out = repo / "out"
            # clean run first: produces a summary
            tool.main(["--repo", str(repo), "--out-dir", str(out),
                       "--date", "20260812", "--sha", sha])
            # now dirty the tracked file without committing
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(1, "sqm")}))
            out2 = repo / "out2"
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo), "--out-dir", str(out2),
                           "--date", "20260812", "--sha", sha,
                           "--allow-sha-mismatch"])
            # fail-closed: no publishable summary was written
            self.assertFalse((out2 / "metrics-fullfield-20260812.summary.json").exists())
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_untracked_package_refused(self):
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            write_pkg_metrics(repo, "author2", "slug2",
                              make_metrics({"site_area_sqm": entry(50, "sqm")}))
            out = repo / "out"
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo), "--out-dir", str(out),
                           "--date", "20260812", "--sha", sha])
            self.assertFalse((out / "metrics-fullfield-20260812.summary.json").exists())
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_deleted_non_scannable_file_does_not_block(self):
        """Sparse-checkout checkouts report unmatched tracked paths as
        deleted; those files do not feed the statistics and must not block
        a legitimate scan. A deleted scannable file (metrics.json) MUST."""
        tool = load_tool()
        repo = Path(tempfile.mkdtemp()) / "repo"
        init_repo(repo)
        try:
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(100, "sqm")}))
            (repo / "submissions" / "author" / "slug" / "assets").mkdir()
            (repo / "submissions" / "author" / "slug" / "assets" / "fig.png").write_text("x")
            sha = commit_all(repo)
            # delete a NON-scannable tracked file -> scan may proceed
            (repo / "submissions" / "author" / "slug" / "assets" / "fig.png").unlink()
            out = repo / "out"
            tool.main(["--repo", str(repo), "--out-dir", str(out),
                       "--date", "20260812", "--sha", sha])
            self.assertTrue((out / "metrics-fullfield-20260812.summary.json").exists())
            # now delete a SCANNABLE tracked file -> must refuse
            (repo / "submissions" / "author" / "slug" / "metrics.json").unlink()
            out2 = repo / "out2"
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo), "--out-dir", str(out2),
                           "--date", "20260812", "--sha", sha])
            self.assertFalse((out2 / "metrics-fullfield-20260812.summary.json").exists())
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)


class IdentifiersOptInTest(unittest.TestCase):
    def _ready_repo(self) -> tuple[Path, str]:
        repo = Path(tempfile.mkdtemp()) / "repo"
        init_repo(repo)
        write_pkg_metrics(repo, "author", "slug",
                          make_metrics({"site_area_sqm": entry(100, "sqm")}))
        sha = commit_all(repo)
        return repo, sha

    def test_csv_gz_off_by_default(self):
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            out = repo / "out"
            tool.main(["--repo", str(repo), "--out-dir", str(out),
                       "--date", "20260812", "--sha", sha])
            self.assertTrue((out / "metrics-fullfield-20260812.summary.json").exists())
            self.assertFalse(list(out.glob("*.csv.gz")),
                             "identifiers table must not be written by default")
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_csv_gz_opt_in_outside_worktree(self):
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            outside = repo.parent / "outside-out"
            tool.main(["--repo", str(repo), "--out-dir", str(outside),
                       "--date", "20260812", "--sha", sha,
                       "--write-local-identifiers"])
            gz_files = list(outside.glob("*.csv.gz"))
            self.assertEqual(len(gz_files), 1, "opt-in outside worktree writes csv.gz")
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_csv_gz_refused_inside_worktree(self):
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            out = repo / "out"
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo), "--out-dir", str(out),
                           "--date", "20260812", "--sha", sha,
                           "--write-local-identifiers"])
            self.assertFalse(list(out.glob("*.csv.gz")),
                             "no identifiers table inside the worktree")
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_relative_repo_absolute_outdir_inside_refused(self):
        """Path-spelling bypass repro: --repo as a relative path with
        --out-dir as an absolute path inside the repo must still be refused
        (a lexical is_relative_to check misses this mix; resolve() catches it)."""
        import shutil
        tool = load_tool()
        with tempfile.TemporaryDirectory() as td:
            repo = Path(td) / "repo"
            init_repo(repo)
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(100, "sqm")}))
            sha = commit_all(repo)
            cwd = Path.cwd()
            try:
                os.chdir(Path(td))
                with self.assertRaises(SystemExit):
                    tool.main(["--repo", "repo",
                               "--out-dir", str(repo / "private-out"),
                               "--date", "20260812", "--sha", sha,
                               "--write-local-identifiers"])
                self.assertFalse(
                    list((repo / "private-out").glob("*.csv.gz")),
                    "no identifiers table via relative/absolute path mix")
            finally:
                os.chdir(cwd)
                shutil.rmtree(Path(td), ignore_errors=True)

    def test_symlink_outdir_inside_refused(self):
        """A symlink pointing into the worktree must not bypass the
        outside-worktree boundary (resolve() follows the link)."""
        tool = load_tool()
        repo, sha = self._ready_repo()
        try:
            inside_link = repo.parent / "inside-link"
            try:
                inside_link.symlink_to(repo, target_is_directory=True)
            except OSError:
                self.skipTest("symlinks unavailable on this platform")
            with self.assertRaises(SystemExit):
                tool.main(["--repo", str(repo),
                           "--out-dir", str(inside_link / "o"),
                           "--date", "20260812", "--sha", sha,
                           "--write-local-identifiers"])
            self.assertFalse(list((inside_link / "o").glob("*.csv.gz")),
                             "no identifiers table through a symlink")
        finally:
            import shutil
            shutil.rmtree(repo.parent, ignore_errors=True)

    def test_parse_failures_require_opt_in_outside_worktree(self):
        """Parse-failure detail carries submission paths: off by default
        (anonymous count only), written only with --write-local-identifiers
        to an out-dir outside the worktree."""
        tool = load_tool()
        with tempfile.TemporaryDirectory() as td:
            repo = Path(td) / "repo"
            init_repo(repo)
            write_pkg_metrics(repo, "author", "slug",
                              make_metrics({"site_area_sqm": entry(100, "sqm")}))
            (repo / "submissions" / "author" / "bad").mkdir(parents=True)
            (repo / "submissions" / "author" / "bad" / "metrics.json").write_text(
                "{broken", encoding="utf-8")
            sha = commit_all(repo)
            outside = repo.parent / "outside-out"
            try:
                out1 = repo / "out1"
                tool.main(["--repo", str(repo), "--out-dir", str(out1),
                           "--date", "20260812", "--sha", sha])
                s1 = json.loads(
                    (out1 / "metrics-fullfield-20260812.summary.json").read_text(encoding="utf-8"))
                self.assertEqual(s1["snapshot"]["n_parse_failures"], 1)
                self.assertFalse(list(out1.glob("*.parse-failures.txt")),
                                 "no parse-failure detail without opt-in")
                tool.main(["--repo", str(repo), "--out-dir", str(outside),
                           "--date", "20260812", "--sha", sha,
                           "--write-local-identifiers"])
                self.assertEqual(len(list(outside.glob("*.parse-failures.txt"))), 1)
            finally:
                import shutil
                shutil.rmtree(repo.parent, ignore_errors=True)


if __name__ == "__main__":
    unittest.main(verbosity=2)
