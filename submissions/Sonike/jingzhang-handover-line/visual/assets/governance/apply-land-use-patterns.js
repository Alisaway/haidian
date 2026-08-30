#!/usr/bin/env node
"use strict";

/* Pixel-idempotent builder for the audited F/02 land-use textures.
 *
 * The submission format permits JavaScript, but not Python source files,
 * below visual/assets. This small Node entry point runs the embedded offline
 * Pillow/ReportLab rebuild routine. Set PYTHON when those packages live in a
 * non-default interpreter. The read-only companion audit remains pure Node.
 *
 * Rebuild:
 *   node apply-land-use-patterns.js --json
 */

const path = require("path");
const { spawnSync } = require("child_process");

const PACKAGE = path.resolve(__dirname, "../../..");
const PYTHON_SOURCE = String.raw`
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

PACKAGE = Path(sys.argv[1]).resolve()
HERE = PACKAGE / "visual" / "assets" / "governance"
REPORT = HERE / "figure-contrast-report.json"
FIGURES = PACKAGE / "assets" / "figures"
DRAWINGS = PACKAGE / "drawings"

def on_pattern(pattern, x, y):
    if pattern == "vertical": return x % 10 < 2
    if pattern == "diagonal_back": return (x - y) % 12 < 2
    if pattern == "dash": return y % 10 < 2 and x % 14 < 8
    if pattern == "horizontal": return y % 10 < 2
    if pattern == "diagonal_forward": return (x + y) % 12 < 2
    if pattern == "crosshatch": return (x + y) % 14 < 1 or (x - y) % 14 < 1
    if pattern == "dots": return x % 10 < 2 and y % 10 < 2
    raise ValueError(f"unknown pattern: {pattern}")

def load_encodings():
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    return report["non_color_redundancy"]["land_use_encodings"]

def patterned_layer(image, encodings, transparent):
    source = image.convert("RGB")
    output = Image.new("RGBA", image.size, (0, 0, 0, 0)) if transparent else image.convert("RGBA")
    source_pixels = source.load()
    output_pixels = output.load()
    lookup = {tuple(item["base_rgb"]): item for item in encodings}
    changed = {item["code"]: 0 for item in encodings}
    width, height = image.size
    for y in range(height):
        for x in range(width):
            item = lookup.get(source_pixels[x, y])
            if item is None or not on_pattern(item["pattern_id"], x, y):
                continue
            output_pixels[x, y] = (*tuple(item["pattern_rgb"]), 255)
            changed[item["code"]] += 1
    return output, changed

def apply_png(target, encodings):
    image = Image.open(target)
    result, changed = patterned_layer(image, encodings, False)
    total = sum(changed.values())
    if total:
        temporary = target.with_name(f".{target.name}.pattern.tmp.png")
        result.convert("RGB").save(temporary, format="PNG", optimize=True)
        os.replace(temporary, target)
    return {"path": str(target.relative_to(PACKAGE)), "changed_pixels": total, "by_code": changed}

def pdf_page_size(target):
    result = subprocess.run(
        ["pdfinfo", "-f", "2", "-l", "2", str(target)],
        check=True, capture_output=True, text=True)
    match = re.search(r"Page\s+2 size:\s+([0-9.]+)\s+x\s+([0-9.]+)\s+pts", result.stdout)
    if not match: raise RuntimeError(f"cannot read page 2 size from {target}")
    return float(match.group(1)), float(match.group(2))

def apply_pdf(target, encodings):
    with tempfile.TemporaryDirectory(prefix="jz-land-use-pattern-") as temp_name:
        temp = Path(temp_name)
        prefix = temp / "page"
        subprocess.run(
            ["pdftoppm", "-f", "2", "-l", "2", "-singlefile", "-png", "-r", "72", str(target), str(prefix)],
            check=True, capture_output=True)
        rendered = Image.open(prefix.with_suffix(".png"))
        layer, changed = patterned_layer(rendered, encodings, True)
        total = sum(changed.values())
        if not total:
            return {"path": str(target.relative_to(PACKAGE)), "changed_pixels": 0, "by_code": changed}
        overlay_png = temp / "overlay.png"
        layer.save(overlay_png, format="PNG", optimize=True)
        overlay_pdf = temp / "overlay.pdf"
        width, height = pdf_page_size(target)
        pdf = canvas.Canvas(str(overlay_pdf), pagesize=(width, height), pageCompression=1)
        pdf.drawImage(ImageReader(str(overlay_png)), 0, 0, width=width, height=height, mask="auto")
        pdf.showPage()
        pdf.save()
        output = target.with_name(f".{target.name}.pattern.tmp.pdf")
        subprocess.run(
            ["qpdf", "--overlay", str(overlay_pdf), "--from=1", "--to=2", "--", str(target), str(output)],
            check=True, capture_output=True)
        os.replace(output, target)
        return {"path": str(target.relative_to(PACKAGE)), "changed_pixels": total, "by_code": changed}

encodings = load_encodings()
results = []
for name in ["land-use-structure.png", "land-use-structure.en.png"]:
    results.append(apply_png(FIGURES / name, encodings))
for name in ["a0-boards.pdf", "a0-boards.en.pdf", "a3-booklet.pdf", "a3-booklet.en.pdf"]:
    results.append(apply_pdf(DRAWINGS / name, encodings))
payload = {
    "ok": True,
    "carriers": len(results),
    "changed_pixels": sum(item["changed_pixels"] for item in results),
    "results": results,
}
if "--json" in sys.argv[2:]: print(json.dumps(payload, ensure_ascii=False, indent=2))
else:
    for item in results: print(f"{item['changed_pixels']:>7}  {item['path']}")
`;

const python = process.env.PYTHON || "python3";
const result = spawnSync(python, ["-c", PYTHON_SOURCE, PACKAGE, ...process.argv.slice(2)], {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exit(result.status === null ? 1 : result.status);
