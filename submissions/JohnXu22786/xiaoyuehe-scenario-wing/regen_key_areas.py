"""Regenerate key-areas.en.png with non-overlapping legend layout.

The current key-areas.en.png has the bottom legend items (Landmarks / Scenario
bays / Roads / Green / Water channel / Scope) overlapping with the bilingual
note text and the PROVISIONAL red box. We rebuild the figure with a wider
3-column legend row above the note and the PROVISIONAL banner, so the
bottom area is non-overlapping and easy to read at preview/print scale.
"""
import json
import os
from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Rectangle
from matplotlib.lines import Line2D

PKG = Path("C:/Users/22786/.dsh/haidian-marathon/valroot/submissions/JohnXu22786/xiaoyuehe-scenario-wing")
GEO = PKG / "geometry"

# Load the geometry
import shapefile  # pyshp is bundled? maybe not.
try:
    from shapely.geometry import shape
    import json as _json
    def load_layer(name):
        gj = _json.loads((GEO / f"{name}.geojson").read_text(encoding="utf-8"))
        return [(f["properties"].get("id", f.get("id", "?")), shape(f["geometry"]), f["properties"]) for f in gj["features"]]
except Exception as e:
    print("fallback:", e)
    load_layer = None


def legend_marker(label, color, marker="s", linestyle="-"):
    return Line2D([0], [0], marker=marker, color=color, linestyle=linestyle,
                  markersize=10, linewidth=2, label=label)


def render(out_path: Path, lang: str):
    if lang == "zh":
        title = "Three Node Index & Design Tasks (Concept)"
    else:
        title = "Three Node Index & Design Tasks (Concept)"
    # Both versions share the English title for the EN variant
    if out_path.name == "key-areas.png":
        title = "三节点索引与设计任务图（概念）"

    # Load real geometry
    pub = load_layer("public_space") if load_layer else []
    roads = load_layer("roads") if load_layer else []
    key_areas = load_layer("key_areas") if load_layer else []
    site = load_layer("site_boundary") if load_layer else []

    fig = plt.figure(figsize=(15, 10))
    ax = fig.add_axes([0.05, 0.18, 0.55, 0.72])
    ax.set_xlim(4568000, 4571500)
    ax.set_ylim(394200, 397200)
    ax.set_aspect("equal")
    ax.axis("off")

    # Plot scope (orange dashed)
    if site:
        for _f, g, _p in site:
            xs, ys = g.exterior.xy
            ax.plot(xs, ys, color="#c2703d", linewidth=2, linestyle=(0, (6, 4)), alpha=0.95)

    # Plot key areas as light fill
    for _f, g, p in key_areas:
        if g.geom_type == "Polygon":
            xs, ys = g.exterior.xy
            ax.fill(xs, ys, color="#fdebd0", alpha=0.6)
        elif g.geom_type == "MultiPolygon":
            for gg in g.geoms:
                xs, ys = gg.exterior.xy
                ax.fill(xs, ys, color="#fdebd0", alpha=0.6)

    # Plot roads
    for _f, g, _p in roads:
        if g.geom_type == "LineString":
            xs, ys = g.coords.xy
            ax.plot(xs, ys, color="#41546b", linewidth=2.0, alpha=0.85)

    # Plot public spaces (squares for scenario, stars for landmarks)
    for _f, g, p in pub:
        cx, cy = g.centroid.x, g.centroid.y
        if p.get("scenario_type") == "ai_landmark":
            ax.plot(cx, cy, marker="*", markersize=20, color="#1f3b73", zorder=5)
        else:
            color = "#f5a04a" if p.get("scenario_type") == "scenario_bay" else "#7eb38c"
            ax.add_patch(Rectangle((cx - 30, cy - 30), 60, 60, color=color, alpha=0.85, zorder=4))

    # North arrow
    ax.annotate("N", xy=(4571100, 396800), xytext=(4571100, 396500),
                arrowprops=dict(arrowstyle="-|>", color="#1f3b73", lw=2),
                fontsize=14, ha="center", color="#1f3b73", weight="bold")

    # Scale bar
    ax.add_patch(Rectangle((4568050, 394300), 250, 25, color="#1a1a1a"))
    ax.text(4568175, 394200, "0.5 km", ha="center", fontsize=11, color="#1a1a1a")
    if lang == "en":
        ax.text(4568175, 394100, "Scale bar (concept)", ha="center", fontsize=9, color="#555")
    else:
        ax.text(4568175, 394100, "比例尺（概念）", ha="center", fontsize=9, color="#555")

    # Title
    fig.suptitle(title, fontsize=18, y=0.96, weight="bold")

    # Right panel: Node roles
    if lang == "en":
        ptext = ax.text
        node_text = [
            ("Node roles (P0 / N1 / N2 / N3)", "header"),
            ("P0 Riverside Roadshow Plaza", "subheader"),
            ("Stage, lounge, terraces, honour board", "body"),
            ("", "blank"),
            ("N1 AI Science Station", "subheader"),
            ("Interactive devices - student volunteer guides - offline captions", "body"),
            ("", "blank"),
            ("N2 Scenario Test Bench", "subheader"),
            ("12 scenario bays (rotating/pop-up) - data feedback interface", "body"),
            ("", "blank"),
            ("N3 Community Co-Lab", "subheader"),
            ("AI health service - senior access, attended staff on site", "body"),
        ]
    else:
        node_text = [
            ("节点分工（P0 / N1 / N2 / N3）", "header"),
            ("P0 滨水路演广场", "subheader"),
            ("路演舞台 · 会客厅 · 预制看台 · 荣誉榜", "body"),
            ("", "blank"),
            ("N1 AI科普驿站", "subheader"),
            ("展教装置 · 学生志愿讲解 · 离线展签", "body"),
            ("", "blank"),
            ("N2 场景试验台", "subheader"),
            ("12 个场景卡位（轮换/快闪）· 数据回传接口", "body"),
            ("", "blank"),
            ("N3 社区共验场", "subheader"),
            ("AI 健康服务 · 长者可及 · 人工值守", "body"),
        ]
    panel_x = 0.66
    panel_w = 0.30
    panel_ax = fig.add_axes([panel_x, 0.18, panel_w, 0.72])
    panel_ax.axis("off")
    panel_ax.set_xlim(0, 1)
    panel_ax.set_ylim(0, 1)
    y = 0.96
    for txt, kind in node_text:
        if kind == "header":
            panel_ax.text(0.05, y, txt, fontsize=14, weight="bold", color="#1a1a1a")
            y -= 0.07
        elif kind == "subheader":
            panel_ax.text(0.05, y, txt, fontsize=12, weight="bold", color="#1f3b73")
            y -= 0.05
        elif kind == "body":
            panel_ax.text(0.05, y, txt, fontsize=10.5, color="#1a1a1a")
            y -= 0.05
        else:
            y -= 0.015

    # Node labels on the map
    labels = {
        "P0 Riverside Roadshow Plaza": (4569750, 396900),
        "N1 AI Science Station": (4569750, 395800),
        "N2 Scenario Test Bench": (4570100, 396100),
        "N3 Community Co-Lab": (4569750, 394800),
    }
    if lang == "en":
        for txt, (x, y2) in labels.items():
            ax.annotate(txt, xy=(x, y2), fontsize=10.5, color="#1f3b73", weight="bold")

    # Legend - clean 3-column grid, well above note and PROVISIONAL banner
    legend_y = 0.10
    legend_items = [
        ("Landmarks (3)", "#1f3b73", "*"),
        ("Scenario bays (12)", "#f5a04a", "s"),
        ("Roads", "#41546b", "-"),
        ("Green", "#7eb38c", "s"),
        ("Water channel", "#5aa3d6", "s"),
        ("Scope (provisional)", "#c2703d", "--"),
    ]
    col_w = 0.16
    for i, (label, color, mk) in enumerate(legend_items):
        col = i % 3
        row = i // 3
        x = 0.05 + col * col_w
        y2 = legend_y - row * 0.025
        if mk == "*":
            fig.text(x, y2, "★", color=color, fontsize=14)
        elif mk == "s":
            fig.text(x, y2, "■", color=color, fontsize=12)
        elif mk == "-":
            fig.text(x, y2, "▬", color=color, fontsize=12)
        elif mk == "--":
            fig.text(x, y2, "┄", color=color, fontsize=12)
        fig.text(x + 0.022, y2, label, fontsize=10, color="#1a1a1a")

    # Note - placed below legend
    if lang == "en":
        note = "Note: concept figure; node polygons from public_space.geojson (not the district overlays). N2* = node cluster"
    else:
        note = "注：本图为概念建议，节点示意多边形来自 public_space.geojson；与 key_areas.geojson 三处区级重点区域叠加层无关。"
    fig.text(0.05, 0.05, note, fontsize=10, color="#222")

    # PROVISIONAL banner
    fig.text(0.05, 0.025, "PROVISIONAL concept boundaries - NOT official redlines - recalculate after official data release",
             fontsize=10.5, color="#b03030", weight="bold",
             bbox=dict(boxstyle="round,pad=0.4", facecolor="#fff5f5", edgecolor="#b03030", linewidth=1))

    fig.savefig(out_path, dpi=120, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print(f"wrote {out_path.name}")


def main():
    figs = PKG / "assets" / "figures"
    render(figs / "key-areas.png", "zh")
    render(figs / "key-areas.en.png", "en")


if __name__ == "__main__":
    main()
