from __future__ import annotations

import csv
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


def write_csv(path: Path, rows: list[dict[str, str]], fields: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


class SourceRegistryDraftTests(unittest.TestCase):
    def test_malformed_url_is_skipped_without_aborting_valid_rows(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "data").mkdir()
            existing_path = root / "data" / "source_registry.json"
            existing_path.write_text(
                json.dumps(
                    {
                        "schema_version": "0.1.0",
                        "updated_date": "2026-06-07",
                        "sources": [{"source_id": "BROKEN", "url": "https://[::1"}],
                    }
                ),
                encoding="utf-8",
            )
            seed_path = root / "seed.csv"
            write_csv(
                seed_path,
                [
                    {
                        "id": "broken_001",
                        "title": "Malformed IPv6 URL",
                        "url": "https://[",
                    },
                    {
                        "id": "broken_002",
                        "title": "Malformed netloc URL",
                        "url": "https://example.com：443/source",
                    },
                    {
                        "id": "broken_003",
                        "title": "Nonnumeric port URL",
                        "url": "https://example.com:bad/source",
                    },
                    {
                        "id": "broken_004",
                        "title": "Out-of-range port URL",
                        "url": "https://example.com:99999/source",
                    },
                    {
                        "id": "broken_005",
                        "title": "Whitespace in hostname URL",
                        "url": "https://exa mple.com/source",
                    },
                    {
                        "id": "broken_006",
                        "title": "Whitespace in path URL",
                        "url": "https://example.com/path with spaces",
                    },
                    {
                        "id": "valid_001",
                        "title": "Valid source",
                        "url": "https://example.com/source",
                    },
                ],
                ["id", "title", "url"],
            )
            out_path = root / "draft.json"

            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "prepare_source_registry_draft.py"),
                    "--repo-root",
                    str(root),
                    "--input",
                    str(seed_path),
                    "--existing-registry",
                    str(existing_path),
                    "--out",
                    str(out_path),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )

            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            self.assertNotIn("Traceback", completed.stderr)
            summary = json.loads(completed.stdout)
            self.assertEqual(summary["source_count"], 1)
            self.assertEqual(summary["skipped_invalid_urls"], 6)
            self.assertEqual(summary["validation_errors"], [])
            draft = json.loads(out_path.read_text(encoding="utf-8"))
            self.assertEqual(["DRAFT-VALID-001"], [source["source_id"] for source in draft["sources"]])

    def test_seed_csv_generates_needs_review_draft_and_skips_existing_urls(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "data").mkdir()
            existing = {
                "schema_version": "0.1.0",
                "updated_date": "2026-06-07",
                "sources": [
                    {
                        "source_id": "EXISTING",
                        "url": "https://example.com/existing.html"
                    }
                ]
            }
            existing_path = root / "data" / "source_registry.json"
            existing_path.write_text(json.dumps(existing), encoding="utf-8")
            seed_path = root / "seed.csv"
            write_csv(
                seed_path,
                [
                    {
                        "id": "project_001",
                        "priority": "P0",
                        "type": "auto_html",
                        "title": "已存在资料",
                        "url": "https://example.com/existing.html",
                        "topic": "project",
                        "notes": "should be skipped",
                    },
                    {
                        "id": "policy_001",
                        "priority": "P0",
                        "type": "auto_html",
                        "title": "北京市人工智能行动计划",
                        "url": "https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/t20260407_4576089.html",
                        "topic": "ai_policy",
                        "notes": "formal candidate",
                    },
                ],
                ["id", "priority", "type", "title", "url", "topic", "notes"],
            )
            out_path = root / "draft.json"
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "prepare_source_registry_draft.py"),
                    "--repo-root",
                    str(root),
                    "--input",
                    str(seed_path),
                    "--existing-registry",
                    str(existing_path),
                    "--out",
                    str(out_path),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            summary = json.loads(completed.stdout)
            self.assertEqual(summary["source_count"], 1)
            draft = json.loads(out_path.read_text(encoding="utf-8"))
            source = draft["sources"][0]
            self.assertEqual(source["source_id"], "DRAFT-POLICY-001")
            self.assertEqual(source["review_status"], "needs_review")
            self.assertEqual(source["usable_for_formal"], "background_only")
            self.assertIn("formal evidence before review_status", "\n".join(source["prohibited_uses"]))

    def test_keyed_api_seed_is_restricted_and_not_formal_usable(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "data").mkdir()
            (root / "data" / "source_registry.json").write_text(
                json.dumps({"schema_version": "0.1.0", "updated_date": "2026-06-07", "sources": []}),
                encoding="utf-8",
            )
            seed_path = root / "seed.csv"
            write_csv(
                seed_path,
                [
                    {
                        "id": "opendata_008",
                        "priority": "P0",
                        "type": "keyed_api",
                        "title": "公交站点API文档",
                        "url": "https://data.beijing.gov.cn/cms/web/bjdata/api/dataDoc.jsp?contentID=17453",
                        "topic": "transport",
                        "notes": "需userKey",
                    }
                ],
                ["id", "priority", "type", "title", "url", "topic", "notes"],
            )
            out_path = root / "draft.json"
            completed = subprocess.run(
                [
                    sys.executable,
                    str(REPO_ROOT / "scripts" / "prepare_source_registry_draft.py"),
                    "--repo-root",
                    str(root),
                    "--input",
                    str(seed_path),
                    "--existing-registry",
                    str(root / "data" / "source_registry.json"),
                    "--out",
                    str(out_path),
                    "--json",
                ],
                capture_output=True,
                text=True,
                check=False,
            )
            self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
            source = json.loads(out_path.read_text(encoding="utf-8"))["sources"][0]
            self.assertEqual(source["public_access_status"], "restricted_or_unknown")
            self.assertEqual(source["usable_for_formal"], "no")
            self.assertIn("access rights", "\n".join(source["prohibited_uses"]))


if __name__ == "__main__":
    unittest.main()
