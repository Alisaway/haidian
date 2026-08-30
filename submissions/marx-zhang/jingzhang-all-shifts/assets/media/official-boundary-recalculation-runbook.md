# 官方边界发布后的独立复算工作包

**工作簿**：`visual/assets/official-boundary-recalculation-workbook.json`
**状态**：`not_activated`
**采用边界**：`optional_crosswalk_concept_only`
**基线提交**：`818ddc11b2bfcb330d52e9b1f63d8102e37f67a2`

## 一、这份工作包做什么

这是一份“官方边界发布后即可启动”的独立复算手册。它把后续动作固定为：登记官方输入、冻结当前临时基线、验证几何和版本、以等面积坐标复算边界依赖指标、追踪受影响图件和叙述、再做一次独立证据链复核。

它**现在没有被激活**。当前包仍使用 `geometry/site_boundary.geojson` 与 `geometry/key_areas.geojson` 的临时粗略范围；现有 `metrics.json` 中的边界面积、绿色/公共空间比例和重点区数量也仍是临时几何或概念图层推导。正式 polygon 尚未进入本包，因此本手册不替换任何 geometry，也不制造“官方红线”。

This is a ready-to-run independent recalculation manual for the moment when an official boundary is published. It registers the official inputs, freezes the current provisional baseline, validates geometry and vintage, recalculates boundary-dependent metrics in an equal-area CRS, traces affected drawings and narrative, and performs an independent evidence-chain recheck.

It is **not activated yet**. The package still uses the provisional rough extents in `geometry/site_boundary.geojson` and `geometry/key_areas.geojson`. Boundary area, green/public-space ratios and key-area count in `metrics.json` remain derived from provisional geometry or concept layers. No official polygon is in this package, so this manual does not replace geometry or create an “official redline”.

## 二、启动条件与当前停止条件

只有同时满足以下条件，才把工作簿从 `not_activated` 切换为 `intake_pending`：

1. 组织方或正式数据持有人发布总体边界 polygon。
2. 同一发布口径下的三处重点区 polygon 可取得，并有稳定 ID/名称。
3. 能回溯到 source-of-record，并记录发布者、发布/取得时间、版本、范围、CRS、单位、SHA-256 与许可/使用边界。
4. 输入可以被独立复核，而不是只有截图、底图、点位、手绘红线或无法还原的网页状态。

在此之前，`STOP-BOUNDARY-001` 生效：不替换边界、不发布精确官方面积、不写法定控制表、不把概念层升级为现状层。

The workbook may move from `not_activated` to `intake_pending` only when the site polygon, three key-area polygons and complete provenance metadata are available from the organizer or source-of-record. Until then, `STOP-BOUNDARY-001` applies: do not replace geometry, publish precise official areas, write statutory-control tables or upgrade concept layers into existing layers.

## 三、输入登记表

收到正式数据后，先登记原始字节，再做任何转换。下面的字段是最低登记要求；完整机器字段见工作簿的 `input_contract`。

| 输入 | 必填信息 | 当前状态 | 不能用什么替代 |
| --- | --- | --- | --- |
| 官方总体边界 | source-of-record、URL/档案、版本、发布日期、取得时间、SHA-256、CRS/EPSG、单位、范围、许可 | 未提供 | 截图、底图、点位 buffer、手绘红线 |
| 三处重点区 | 稳定 ID/名称、同一版本口径、几何、CRS、范围、SHA-256 | 未提供 | 从新闻文字或概念图猜位置 |
| 发布与授权元数据 | 发布者、数据用途、是否规划控制、可复用范围、版本 vintage | 未提供 | 把“官方发布”泛化成“官方批准” |
| 专题/控制图层 | 仅在要计算 FAR、高度、密度、交通、消防、文保等时按需提供 | 未提供 | 由边界或概念图反推 |

官方边界发布不自动等于规划控制发布。它可能只说明项目范围；是否为法定红线、建设用地、管理范围或其他口径，必须以发布元数据为准。

An official boundary release does not automatically equal a planning-control release. It may define only a project or management extent. Whether it is a statutory redline, buildable land, management area or another scope must be taken from the publication metadata.

## 四、独立复算流程

### 1. 冻结临时基线

保存本工作包中 `baseline_snapshot` 的文件、hash、指标值和当前状态。至少包含：

- `metrics.json`：当前 `site_area_sqm = 11412825.386`、`building_footprint_area_sqm = 310807.184`、`green_ratio = 0.123423`、`public_space_ratio = 0.073281`、`key_area_count = 3`；
- `geometry/site_boundary.geojson`：当前临时总体边界；
- `geometry/key_areas.geojson`：当前临时重点区；
- `assumptions.json`、`sources.json` 与 `visual/assets/evidence-chain-review.json`。

先记旧值，再写新值。任何 delta 都必须能回到旧 hash、新 hash、公式和范围说明。

### 2. 登记与冻结官方输入

把官方原始文件复制到一个有版本的输入归档，并记录：发布页或档案引用、发布者、发布与取得日期、版本、CRS、单位、scope statement、许可/使用依据、原始 SHA-256。原始字节只读保存；等面积转换只能生成派生副本，不能覆盖原始文件。

若总体边界和重点区来自不同版本或不同发布口径，进入 `STOP-BOUNDARY-002`，先暂停。

### 3. 做几何 QA

按工作簿 `geometry_acceptance_tests` 执行 `GEO-001` 至 `GEO-009`：

- 检查 source-of-record 和元数据是否完整；
- 检查 CRS/EPSG 与单位；
- 检查闭合、有效、无自交、无零面积碎片和未解释的重复覆盖；
- 说明总体边界是单部件还是多部件，避免 dissolve/merge 双计；
- 核对重点区 ID、数量和名称，确认其落在总体边界内；
- 检查所有专题图层的 vintage，禁止把不同版本静默混用；
- 记录所有修复动作，保留修复前 hash；
- 缺少正式控制图层时，不推导 FAR、高度、密度、权属、消防、交通或文保结论。

几何 QA 通过只意味着“输入可用于派生复算”，不意味着规划、设计、施工或运营已经获批。

### 4. 用等面积坐标复算

面积计算在适合该区域的等面积 CRS 中完成，原始 CRS 与派生 CRS 都写入运行记录。主要公式如下：

| 指标 | 复算公式 | 输入不足时的状态 |
| --- | --- | --- |
| `site_area_sqm` | `area(equal_area(official_site_boundary))` | `provisional_only` |
| `key_area_count` | `count(unique(official_key_area_id))` | `provisional_only` |
| `building_footprint_area_sqm` | `sum(area(intersection(buildings, official_site_boundary)))` | 无建筑层则 `unknown`；概念建筑层则 `conceptual_clipped` |
| `green_space_area_sqm` | `sum(area(intersection(green_space, official_site_boundary)))` | 无有来源的绿色图层则 `unknown` |
| `green_ratio` | `green_space_area_sqm / site_area_sqm` | 概念绿色图层则 `conceptual_ratio` |
| `public_space_ratio` | `public_space_area_sqm / site_area_sqm` | 概念公共空间图层则 `conceptual_ratio` |
| `floor_area_ratio` | `total_floor_area_sqm / official_site_area_sqm` | 没有官方控制和总建筑面积时保持 `unknown` |

`green_ratio` 与 `public_space_ratio` 必须同时写明分子、分母、裁切关系、图层语义和范围；不能仅因分母换成正式边界，就把概念图层结果写成法定绿地率、公共服务覆盖率或绩效结果。

### 5. 追踪受影响交付物

边界改变后，不只改 `metrics.json`。逐项检查：

- `geometry/site_boundary.geojson`、`geometry/key_areas.geojson`；
- `geometry/buildings.geojson`、`green_space.geojson`、`public_space.geojson`、`land_use.geojson`、`phasing.geojson`、`roads.geojson`、`constraints.geojson`；
- `assets/figures/` 中的范围图、指标图、重点区图、交通/蓝绿图及其英文版本；
- `report/`、`visual/index.html`、`visual/index.en.html`、`proposal.md`、`proposal.en.md`；
- `drawings/` 中涉及边界、面积、重点区、图例和文字稿的图纸；
- `visual/assets/evidence-chain-review.json`、`metrics.json`、`manifest.json`、`self_check.json`。

对每个对象记录三种结果之一：`update`（已更新）、`unchanged_with_reason`（核对后无需更新并写明原因）、`hold`（数据不足，不能发布）。地图、图纸和中英文页面必须人工抽查，不能只靠 JSON 校验。

### 6. 更新独立证据链

所有边界依赖主张都按以下顺序补链：

> 主张 → 来源 ID → 原始字节快照 → 指标/公式 → 责任角色 → 停止条件 → 复核决定

例如，边界面积主张需要绑定新的官方边界 source/snapshot、等面积公式、独立空间复核角色和 `STOP-BOUNDARY-002`；如果绿色图层仍是概念图层，还要把 `green_ratio` 标为 `conceptual_ratio`，不能借边界发布升级语义。

协议交叉映射继续保持 `optional_crosswalk_concept_only`。正式边界发布不会自动带来外部 SEB/Switchback 等级、正式采用、现场性能、部署授权或政府背书。

### 7. 运行本地门并请求人工复核

内容更新完成后再刷新 manifest；自检应作为最后一个本地步骤。沿用仓库的本地验证入口，至少覆盖：

1. submission validator 与 strict manifest；
2. manifest schema；
3. evidence-chain checker（含正例与越界负例）；
4. protocol crosswalk checker；
5. `self_check_submission.py`；
6. Git diff 空白检查、包体积门；
7. 中英文页面、图纸首页、地图图例和概念状态标签人工抽查。

只有上述结果都通过，并由维护者/组织方记录接收决定，工作簿才可进入 `recalculated_package_ready` 或 `maintainer_accepted`。`maintainer_accepted` 仍只表示仓库接收，不表示获奖、画廊发布、实施授权或政府背书。

## 五、责任角色与停止条件

| 角色 | 责任边界 |
| --- | --- |
| `official_spatial_data_owner` | 确认 source-of-record、发布范围、版本、坐标和使用边界 |
| `participant_submission_author` | 登记输入、保留原始字节、执行派生复算、更新包内交付物 |
| `independent_spatial_reviewer` | 独立检查几何、CRS、包含关系、版本与面积算法 |
| `independent_evidence_reviewer` | 复核主张—来源—快照—指标—角色—停止条件链条 |
| `professional_urban_design_reviewer` | 判断专题图层是否足以支持专业/规划语义 |
| `visual_reviewer` | 抽查中英文页面、地图、图纸和数值同步 |
| `maintainer_or_organizer` | 作仓库接收决定，不把接收写成授权或背书 |

任何下列情况都停止相关发布：

- 官方文件不可追溯、缺版本/CRS/范围/hash；
- 几何无效、重点区越界、不同 vintage 混用；
- 概念图层被写成现状、法定或实测结果；
- 受影响地图、图纸、报告和中英文页面不同步；
- manifest、schema、证据链、自检或包体积门失败；
- 文案越过 `optional_crosswalk_concept_only`，出现外部等级、实施授权、现场性能或官方背书。

## 六、复算记录最小模板

每次启动生成一个 `OBR-RUN-YYYYMMDD-NNN` 记录，至少填：

```text
run_id:
activated_at:
activated_by:
official_source_refs:
raw_input_hashes:
crs_and_units:
geometry_qa_decisions:
layer_vintages:
metric_deltas:
artifact_decisions:
evidence_chain_decisions:
stop_conditions_checked:
local_validation_logs:
visual_spot_check:
maintainer_decision:
```

这份模板的目的，是让另一个复核者能够从同一组原始字节重做计算、理解每一项变化，并知道什么条件下必须暂停；它不是规划许可申请，也不是运营授权书。

The purpose of this record is reproducibility: another reviewer should be able to rerun the calculation from the same raw bytes, understand every change and see when the process must stop. It is not a planning application or an operating authorization.
