from __future__ import annotations

import sys
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / "scripts"))

from source_registry_utils import summarize_source_registry  # noqa: E402


def source(source_id: str, review_status: str, formal_use: str) -> dict[str, object]:
    return {
        "source_id": source_id,
        "title": source_id,
        "publisher": "Publisher",
        "authority_level": "A0",
        "review_status": review_status,
        "usable_for_formal": formal_use,
        "topics": ["test"],
        "allowed_uses": ["test"],
        "prohibited_uses": ["formal use before review"],
        "url": "https://example.com/source",
    }


class SourceRegistrySummaryTests(unittest.TestCase):
    def test_needs_review_takes_precedence_over_use_bucket(self) -> None:
        registry = {
            "sources": [
                source("DRAFT-BACKGROUND", "needs_review", "background_only"),
                source("DRAFT-NO", "needs_review", "no"),
                source("APPROVED-BACKGROUND", "approved", "background_only"),
                source("PROVISIONAL", "provisional", "provisional_only"),
            ]
        }

        summary = summarize_source_registry(registry)

        self.assertEqual(
            [item["source_id"] for item in summary["needs_review_sources"]],
            ["DRAFT-BACKGROUND", "DRAFT-NO"],
        )
        self.assertEqual(
            [item["source_id"] for item in summary["background_sources"]],
            ["APPROVED-BACKGROUND"],
        )
        self.assertEqual(
            [item["source_id"] for item in summary["provisional_sources"]],
            ["PROVISIONAL"],
        )
        self.assertEqual(summary["counts"]["by_review_status"]["needs_review"], 2)
        self.assertEqual(summary["counts"]["by_usable_for_formal"]["background_only"], 2)


if __name__ == "__main__":
    unittest.main()
