import json
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    ValidationReport,
    validate_simulation_consistency,
)


TEMPLATE_PATH = REPO_ROOT / "templates" / "simulation.json"
PROPOSAL_DIR = "submissions/alice/demo"


def load_template() -> dict:
    return json.loads(TEMPLATE_PATH.read_text(encoding="utf-8"))


def metrics_payload(**overrides: object) -> dict:
    """Metrics that declare simulation.json as their source, matching the template."""
    metrics = {
        "simulation_task_count": {"status": "known", "value": 8, "unit": "count"},
        "simulation_success_rate": {"status": "known", "value": 0.875, "unit": "ratio"},
        "tool_schema_pass_rate": {"status": "known", "value": 1.0, "unit": "ratio"},
        "energy_budget_violations": {"status": "known", "value": 1, "unit": "count"},
        "audit_completeness": {"status": "known", "value": 0.875, "unit": "ratio"},
        "replan_p95_seconds": {"status": "known", "value": 6.4, "unit": "seconds"},
    }
    for metric in metrics.values():
        metric["source_files"] = ["simulation.json"]
    metrics.update(overrides)
    return {"metrics": metrics}


def run_validation(
    simulation: dict, metrics: dict, *, strict: bool = True
) -> ValidationReport:
    report = ValidationReport()
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        base = root / PROPOSAL_DIR
        base.mkdir(parents=True)
        simulation_path = base / "simulation.json"
        metrics_path = base / "metrics.json"
        simulation_path.write_text(
            json.dumps(simulation, ensure_ascii=False), encoding="utf-8"
        )
        metrics_path.write_text(
            json.dumps(metrics, ensure_ascii=False), encoding="utf-8"
        )
        validate_simulation_consistency(
            report,
            root,
            PROPOSAL_DIR,
            metrics_path,
            simulation_path,
            strict=strict,
        )
    return report


class SimulationTemplateTests(unittest.TestCase):
    def test_template_aggregates_are_recomputable(self) -> None:
        """The shipped template must pass strict validation against matching metrics."""
        report = run_validation(load_template(), metrics_payload())
        self.assertTrue(report.ok, report.errors)
        self.assertEqual(report.errors, [])

    def test_template_task_count_matches_tasks(self) -> None:
        template = load_template()
        self.assertEqual(template["task_count"], len(template["tasks"]))

    def test_template_reports_adverse_readings(self) -> None:
        """The template must demonstrate honest reporting, not a perfect run."""
        template = load_template()
        tasks = template["tasks"]
        self.assertTrue(
            any(task["energy_used_kwh"] > task["energy_budget_kwh"] for task in tasks),
            "template should include at least one energy budget violation",
        )
        self.assertTrue(
            any(task["audit_complete"] is False for task in tasks),
            "template should include at least one incomplete audit",
        )
        self.assertTrue(
            any(task["outcome"] == "failure" for task in tasks),
            "template should include at least one failed task",
        )

    def test_template_marks_inapplicable_metric_as_null(self) -> None:
        harness = load_template()["baselines"]["urban_llm_harness"]
        self.assertIsNone(harness["high_risk_intercept_rate"])
        self.assertIn("not_applicable", harness["high_risk_metric_note"])


class SimulationConsistencyTests(unittest.TestCase):
    def test_task_count_mismatch_is_blocking(self) -> None:
        simulation = load_template()
        simulation["task_count"] = 7
        report = run_validation(simulation, metrics_payload())
        self.assertFalse(report.ok)
        self.assertTrue(
            any("does not match tasks.length" in error for error in report.errors),
            report.errors,
        )

    def test_metric_value_must_match_task_derived_value(self) -> None:
        metrics = metrics_payload(
            simulation_success_rate={
                "status": "known",
                "value": 1.0,
                "unit": "ratio",
                "source_files": ["simulation.json"],
            }
        )
        report = run_validation(load_template(), metrics)
        self.assertFalse(report.ok)
        self.assertTrue(
            any(
                "metrics.simulation_success_rate=1.0 does not match" in error
                for error in report.errors
            ),
            report.errors,
        )

    def test_missing_outcome_blocks_declared_success_rate(self) -> None:
        simulation = load_template()
        simulation["tasks"][0].pop("outcome")
        report = run_validation(simulation, metrics_payload())
        self.assertFalse(report.ok)
        self.assertTrue(
            any("cannot be recomputed" in error for error in report.errors),
            report.errors,
        )

    def test_harness_baseline_must_mirror_task_ledger(self) -> None:
        simulation = load_template()
        simulation["baselines"]["urban_llm_harness"]["success_rate"] = 0.99
        report = run_validation(simulation, metrics_payload())
        self.assertFalse(report.ok)
        self.assertTrue(
            any("conflicts with baselines.urban_llm_harness" in error for error in report.errors),
            report.errors,
        )

    def test_separate_baseline_scope_is_allowed(self) -> None:
        """A differently-named baseline may hold a different evaluation scope."""
        simulation = load_template()
        simulation["baselines"]["ai_off_equivalent"]["success_rate"] = 0.42
        report = run_validation(simulation, metrics_payload())
        self.assertTrue(report.ok, report.errors)

    def test_metric_without_simulation_source_is_ignored(self) -> None:
        metrics = metrics_payload(
            simulation_success_rate={
                "status": "known",
                "value": 1.0,
                "unit": "ratio",
                "source_files": ["report/narrative.md"],
            }
        )
        report = run_validation(load_template(), metrics)
        self.assertTrue(report.ok, report.errors)

    def test_legacy_package_downgrades_to_warning(self) -> None:
        simulation = load_template()
        simulation["task_count"] = 7
        report = run_validation(simulation, metrics_payload(), strict=False)
        self.assertTrue(report.ok, report.errors)
        self.assertTrue(
            any("legacy simulation remains compatible" in warning for warning in report.warnings),
            report.warnings,
        )


if __name__ == "__main__":
    unittest.main()
