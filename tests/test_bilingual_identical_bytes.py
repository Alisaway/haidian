import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from validate_submission import (  # noqa: E402
    ValidationReport,
    format_report,
    validate_bilingual_display,
)


PRIMARY_FRONT_MATTER = """---
title: "示例方案"
author_github: "alice"
language: "zh"
translation_file: "proposal.en.md"
---

# 示例方案

正文。
"""

TRANSLATED_FRONT_MATTER = """---
title: "Sample proposal"
author_github: "alice"
language: "en"
translation_of: "proposal.md"
---

# Sample proposal

Body.
"""

FIGURE_BYTES = b"\x89PNG\r\n\x1a\n" + b"figure-with-labels" * 8


class BilingualIdenticalBytesTests(unittest.TestCase):
    """Byte-identical bilingual artifacts are a hint, never a verdict."""

    def build_package(
        self,
        root: Path,
        base: str,
        *,
        translated_figure: bytes = FIGURE_BYTES,
        primary_language: str = "zh",
        translated_language: str = "en",
        declare_translation_of: bool = True,
        primary_front_matter: str = PRIMARY_FRONT_MATTER,
    ) -> tuple[list[str], dict]:
        """Write the smallest package that reaches the bilingual display check."""
        package = root / base
        (package / "assets/figures").mkdir(parents=True, exist_ok=True)
        (package / "proposal.md").write_text(primary_front_matter, encoding="utf-8")
        (package / "proposal.en.md").write_text(TRANSLATED_FRONT_MATTER, encoding="utf-8")
        (package / "assets/figures/site-overview.png").write_bytes(FIGURE_BYTES)
        (package / "assets/figures/site-overview.en.png").write_bytes(translated_figure)

        def digest(rel: str) -> str:
            return hashlib.sha256((package / rel).read_bytes()).hexdigest()

        figure_item = {
            "path": "assets/figures/site-overview.en.png",
            "role": "proposal_figure",
            "language": translated_language,
            "sha256": digest("assets/figures/site-overview.en.png"),
        }
        if declare_translation_of:
            figure_item["translation_of"] = "assets/figures/site-overview.png"
        manifest = {
            "files": [
                {"path": "proposal.md", "role": "narrative", "language": "zh", "sha256": digest("proposal.md")},
                {
                    "path": "proposal.en.md",
                    "role": "narrative",
                    "language": "en",
                    "translation_of": "proposal.md",
                    "sha256": digest("proposal.en.md"),
                },
                {
                    "path": "assets/figures/site-overview.png",
                    "role": "proposal_figure",
                    "language": primary_language,
                    "sha256": digest("assets/figures/site-overview.png"),
                },
                figure_item,
            ]
        }
        changed = [f"{base}/assets/figures/site-overview.en.png"]
        return changed, manifest

    def run_check(self, root: Path, base: str, changed: list[str], manifest: dict) -> ValidationReport:
        report = ValidationReport()
        report.changed_files = list(changed)
        validate_bilingual_display(report, root, base, manifest)
        return report

    def identical_notices(self, report: ValidationReport) -> list[str]:
        return [warning for warning in report.warnings if "byte-identical" in warning]

    def test_identical_translated_figure_raises_a_single_notice(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            report = self.run_check(root, base, changed, manifest)
            notices = self.identical_notices(report)
            self.assertEqual(1, len(notices), report.warnings)
            self.assertIn("assets/figures/site-overview.en.png", notices[0])
            self.assertIn("`assets/figures/site-overview.png`", notices[0])
            self.assertIn("language=neutral", notices[0])
            self.assertIn("docs/formal-submission-guide.md", notices[0])
            self.assertIn("does not block review", notices[0])

    def test_neutral_primary_declaration_suppresses_the_notice(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base, primary_language="neutral")
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual([], self.identical_notices(report))

    def test_neutral_counterpart_declaration_suppresses_the_notice(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base, translated_language="neutral")
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual([], self.identical_notices(report))

    def test_translated_figure_with_different_bytes_is_not_reported(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(
                root, base, translated_figure=FIGURE_BYTES + b"english-labels"
            )
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual([], self.identical_notices(report))

    def test_language_suffix_pair_without_translation_of_is_reported(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base, declare_translation_of=False)
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual(1, len(self.identical_notices(report)), report.warnings)

    def test_package_without_declared_language_is_not_inspected(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(
                root,
                base,
                primary_front_matter='---\ntitle: "示例方案"\nauthor_github: "alice"\n---\n\n# 示例方案\n\n正文。\n',
            )
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual([], report.warnings)
            self.assertEqual([], report.errors)

    def test_parent_traversal_manifest_path_is_not_read(self) -> None:
        """An unsafe manifest entry must not make the advisory read outside the package."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            outside = root / "outside-secret.png"
            outside.write_bytes(FIGURE_BYTES)
            manifest["files"].append(
                {
                    "path": "../../../outside-secret.png",
                    "role": "proposal_figure",
                    "language": "en",
                    "translation_of": "assets/figures/site-overview.png",
                }
            )
            report = self.run_check(root, base, changed, manifest)
            notices = self.identical_notices(report)
            self.assertTrue(all("outside-secret" not in notice for notice in notices), notices)
            self.assertTrue(all(".." not in notice for notice in notices), notices)

    def test_absolute_manifest_path_is_not_read(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            outside = root / "absolute-secret.png"
            outside.write_bytes(FIGURE_BYTES)
            manifest["files"].append(
                {
                    "path": str(outside),
                    "role": "proposal_figure",
                    "language": "en",
                    "translation_of": "assets/figures/site-overview.png",
                }
            )
            report = self.run_check(root, base, changed, manifest)
            notices = self.identical_notices(report)
            self.assertTrue(all("absolute-secret" not in notice for notice in notices), notices)

    def test_symlinked_manifest_path_is_not_read(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            sentinel = root / "sentinel.png"
            sentinel.write_bytes(FIGURE_BYTES)
            link = root / base / "assets/figures/site-overview.link.en.png"
            try:
                link.symlink_to(sentinel)
            except (OSError, NotImplementedError):
                self.skipTest("symbolic links are not available on this platform")
            manifest["files"].append(
                {
                    "path": "assets/figures/site-overview.link.en.png",
                    "role": "proposal_figure",
                    "language": "en",
                    "translation_of": "assets/figures/site-overview.png",
                }
            )
            report = self.run_check(root, base, changed, manifest)
            notices = self.identical_notices(report)
            self.assertTrue(all("site-overview.link.en.png" not in notice for notice in notices), notices)

    def test_declared_and_worktree_digests_are_never_mixed(self) -> None:
        """Declared digests are Git blob digests; worktree hashing must not be compared to them."""
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            for item in manifest["files"]:
                if item["path"] == "assets/figures/site-overview.en.png":
                    # Simulate a Git-blob digest that differs from the worktree bytes
                    # (the CRLF case) while the other side declares nothing.
                    item["sha256"] = hashlib.sha256(b"git-blob-form").hexdigest()
                if item["path"] == "assets/figures/site-overview.png":
                    item.pop("sha256", None)
            report = self.run_check(root, base, changed, manifest)
            # Both sides fall back to worktree bytes, so the identical pair is still found.
            self.assertEqual(1, len(self.identical_notices(report)), report.warnings)

    def test_notice_never_changes_the_pass_verdict(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            base = "submissions/alice/ai-urban-loop"
            changed, manifest = self.build_package(root, base)
            report = self.run_check(root, base, changed, manifest)
            self.assertEqual(1, len(self.identical_notices(report)), report.warnings)
            self.assertEqual([], report.errors)
            self.assertTrue(report.ok)
            self.assertIn("Result: PASS", format_report(report))

    def test_existing_submission_packages_keep_passing(self) -> None:
        packages = [
            path.parent
            for path in sorted(ROOT.glob("submissions/*/*/manifest.json"))
        ]
        if not packages:
            self.skipTest("no submission packages checked out")
        for package in packages:
            with self.subTest(package=package.name):
                proposal_dir = package.relative_to(ROOT).as_posix()
                try:
                    manifest = json.loads((package / "manifest.json").read_text(encoding="utf-8"))
                except (UnicodeDecodeError, json.JSONDecodeError):
                    continue
                report = ValidationReport()
                report.changed_files = [f"{proposal_dir}/proposal.md"]
                validate_bilingual_display(report, ROOT, proposal_dir, manifest)
                self.assertEqual([], report.errors)
                self.assertTrue(report.ok)

    def test_command_line_run_on_an_identical_pair_still_exits_zero(self) -> None:
        candidates = []
        for manifest_path in sorted(ROOT.glob("submissions/*/*/manifest.json")):
            package = manifest_path.parent
            proposal_dir = package.relative_to(ROOT).as_posix()
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            report = ValidationReport()
            report.changed_files = [f"{proposal_dir}/proposal.md"]
            validate_bilingual_display(report, ROOT, proposal_dir, manifest)
            if self.identical_notices(report):
                candidates.append((proposal_dir, manifest.get("agent", {})))
        if not candidates:
            self.skipTest("no checked-out package carries a byte-identical bilingual pair")
        proposal_dir, _ = candidates[0]
        author = proposal_dir.split("/")[1]
        completed = subprocess.run(
            [
                sys.executable,
                str(ROOT / "scripts" / "validate_submission.py"),
                "--repo-root",
                str(ROOT),
                "--pr-author",
                author,
                "--changed-file",
                f"{proposal_dir}/proposal.md",
            ],
            capture_output=True,
            text=True,
        )
        self.assertIn("byte-identical", completed.stdout)
        self.assertIn("Result: PASS", completed.stdout)
        self.assertEqual(0, completed.returncode, completed.stdout)


if __name__ == "__main__":
    unittest.main()
