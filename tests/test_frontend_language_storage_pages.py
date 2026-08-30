from __future__ import annotations

import json
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class FrontendLanguageStoragePageTests(unittest.TestCase):
    def run_language_harness(self, page: str, stored: str | None, browser: str | None, *, fail_get: bool = False, fail_set: bool = False) -> dict:
        source = (ROOT / page).read_text(encoding="utf-8")
        start = source.index("// ── i18n engine") if page == "index.html" else source.index("function normalizeLanguage")
        end = source.index("const STATUS_META", start)
        helper = source[start:end]
        harness_source = helper + "\nglobalThis.__language = lang; globalThis.__initial = initialLanguage; globalThis.__remember = rememberLanguage;"
        encoded_harness_source = json.dumps(harness_source)
        script = f"""
const vm = require('vm');
const storage = {{
  value: {json.dumps(stored)},
  writes: [],
  getItem() {{ if ({str(fail_get).lower()}) throw new Error('blocked'); return this.value; }},
  setItem(key, value) {{ if ({str(fail_set).lower()}) throw new Error('blocked'); this.value = value; this.writes.push([key, value]); }}
}};
const context = {{ localStorage: storage, navigator: {{ language: {json.dumps(browser)} }} }};
vm.runInNewContext({encoded_harness_source}, context);
let remembered = null;
try {{ context.__remember('en'); remembered = {{value: storage.value, writes: storage.writes}}; }} catch (error) {{ remembered = {{error: String(error)}}; }}
console.log(JSON.stringify({{initial: context.__language, afterWrite: remembered}}));
"""
        completed = subprocess.run(["node", "-e", script], text=True, capture_output=True, check=False)
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)
        return json.loads(completed.stdout)

    def test_both_pages_normalize_stored_language_and_browser_fallback(self) -> None:
        for page in ("index.html", "submissions.html"):
            with self.subTest(page=page):
                self.assertEqual(self.run_language_harness(page, "en", "zh-CN")["initial"], "en")
                self.assertEqual(self.run_language_harness(page, "zh-CN", "zh-CN")["initial"], "zh")
                self.assertEqual(self.run_language_harness(page, "invalid", "fr-FR")["initial"], "en")
                self.assertEqual(self.run_language_harness(page, None, "zh-Hant")["initial"], "zh")

    def test_both_pages_survive_storage_read_and_write_errors(self) -> None:
        for page in ("index.html", "submissions.html"):
            with self.subTest(page=page):
                result = self.run_language_harness(page, "en", "en", fail_get=True, fail_set=True)
                self.assertEqual(result["initial"], "en")
                self.assertNotIn("error", result["afterWrite"])


if __name__ == "__main__":
    unittest.main()
