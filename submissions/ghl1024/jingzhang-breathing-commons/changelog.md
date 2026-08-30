# 方案迭代记录

Jing-Zhang Breathing Commons / Changelog

## v0.18 - 2026-08-26

- 根据 PR #3910 专业评审意见，为中文 report/visual 离线 HTML 内嵌 OFL 授权的 Noto CJK 字体，修复无系统中文字体环境中的方框字，并在 sources/copyright 中记录字体来源与仅用于呈现的边界。
- 将 `breathing_spine_length_m` 在双语图纸、HTML 与离线可视化中统一为一位小数（`9,242.5 m`），保持与 `metrics.json` 的 `9242.5` 一致。
- 增加北纬社区、未来科学城、怀柔科学城、经开区和京津冀协同节点的区域协同接口矩阵；所有对象均标为概念建议/待协商，不新增合作承诺或空间事实。

## v0.17 - 2026-08-25

- 根据 PR #3910 的确定性 CI 反馈，将新提交的 manifest 从兼容线 `schema_version=0.1.0` 迁移到当前前向契约 `0.2.0`。
- 将 `visual/assets/review-evidence.json` 的自定义角色 `review_evidence` 映射为规范角色 `evidence_data`，保持文件内容与公共价值验收语义不变。
- 本次不改变正文、图纸、geometry、空间指标或精度声明；迁移后重新刷新全部声明哈希并运行四道自检与 push preflight。

## v0.16 - 2026-08-20

- 修正封面与双语 A3/A0 的状态用语：将可能被误解为“已完成人工评审”的 `HUMAN-REVIEWED` / `人工复核` 改为 `HUMAN REVIEW REQUIRED` / `需人工复核`，并在封面深色信息区内分行排布，避免超出背景导致低对比度。
- 对齐上游新增的 PNG 深度完整性规则，重建中英文图纸后通过结构、CRC、scanline/filter、zlib 和解压预算校验。
- 复核新合并方案的“运维责任”与“失败可记录”表达；本方案继续以三肺、12 个可暂停场景、无 AI 等价路径与六道公共价值验收门作为差异化证据，不引入未经证实的目标值。
- 本次不改变 geometry 和空间指标；边界与三处重点区仍为 provisional，六道验收门仍为 `not_run`，人工与专业责任角色仍为 TBC。

## v0.15 - 2026-08-18

- 对照上游新公开的数值断言审查，反查正文与结构化指标：新增 `land_use_zone_count=5` 与 `concept_building_count=6`，均直接由提交 GeoJSON 要素计数，不再只依赖正文和图层锚点。
- 在双语正文、指标证据图、离线交互指标栏与验收数量清单中同步这两项量，使“五个概念用地区、六个概念建筑载体”可由评审入口直接复核。
- 本次不改变任何 geometry；边界和三处重点区继续为 provisional，概念建筑数量不代表现状建筑、获批建设量或实施承诺。

## v0.14 - 2026-08-17

- 经用户确认，将参赛身份从 `pending-github-login` 绑定为 GitHub 登录名 `ghl1024`，并将双语提案、Agent 卡和 manifest 使用同一身份。
- 正式包在本地按 `submissions/ghl1024/jingzhang-breathing-commons/` 路径生成并执行 finalize、自检；本次不包含 fork、push、PR、评论或 GitHub 设置变更。
- 身份绑定不改变方案几何、指标、来源、精度声明或专业确认边界。

## v0.13 - 2026-08-17

- 将三个重点区图件由纯文字任务卡升级为三幅北向局部概念总平：直接叠加本方案已有的概念建筑、蓝绿空间、道路和与重点区实际相交的场景节点，并增加北针与 200 m 比例尺；其余节点保持在廊道总图原位。
- 图面继续明确使用 provisional key-area geometry，不补造现状底图、现状建筑、权属或法定控制线；空间深化因此可审阅，但不冒充现场核实或审批成果。
- 保留三处重点区各自的公共任务、空间动作、复核责任和统一停止协议，使“清算验证、跨代生活、城市交换”的差异可同时从空间图层和治理证据读取。

## v0.12 - 2026-08-17

- 对齐官方修正后的国土空间用途枚举：将 `LU-BREATH-01` 的商业服务业用地代码由误用的 `05` 改为 `09`；`05` 现明确表示湿地。
- 本次只修正机器可读分类语义，不改变该概念分区的几何、面积、名称、功能、图面位置或任何法定控制主张。
- GitHub 用户改名别名仅影响已有投稿目录的身份兼容；v0.12 当时尚未绑定登录名，因此仍保持 identity-neutral scaffold。

## v0.11 - 2026-08-16

- 对齐新增 formal visual metrics contract：`site_area_sqm`、`green_ratio` 与 `public_space_ratio` 继续由提交 GeoJSON 复算并在图纸中镜像有限数值，同时将 provisional 派生值的置信度由 `medium` 调整为 `low`。
- 复核合规矩阵命名空间：`source_ids` 未混入专业标准 ID，标准继续由 `standard_matrix.json` 独立声明；无需伪造或迁移引用。
- 官方边界与三处重点区 polygon 仍未发布；新增 OSM 街道中心线交叉检查仅为背景提示，不升级临时几何的精度、来源地位或法律效力。

## v0.10 - 2026-08-15

- 根据公开评审中的可访问性问题，修正中英文渲染报告的同名双 `<h1>`，并在构建链中增加单一主标题断言。
- 复核新增指标类型规则：三项视觉核心指标继续使用从提交 GeoJSON 复算的有限数值，法定强度类指标继续保持 `unknown`。
- 官方边界与三处重点区 polygon 仍未发布；大钟寺临时矩形继续仅作 provisional constraint，不解释为已核实站点四至。

## v0.9 - 2026-08-14

- 将狭长临时边界由调试式竖向地图重构为“北向向右”的廊道序列，并补充公共界面断面、完整服务旅程与差异化三肺任务。
- 新增 `visual/assets/review-evidence.json`：六道公共价值验收门、TBC 责任角色、扩展/保留/退出规则，以及不虚构造价的数量与成本边界。
- A3 新增 90 天验收契约页；A0 拆分为空间命题与实施证据两张板；离线可视化新增验收模式。
- 保持 SITE_BOUNDARY 与三处 KEY_AREA 为 provisional，控规强度、现场绩效与本地成本保持 unknown。

## v0.8 - 2026-08-11

- 建立“一脊、三肺、两翼、六单元”空间框架、12 张可暂停场景卡与三阶段实施路径。
- 生成双语报告、图件、A3/A0、离线可视化和四闸自检证据链。

---

v0.18 embeds the OFL-licensed Noto CJK font for offline Chinese readability, standardizes the breathing-spine length at one decimal place across output surfaces, and adds a regional collaboration interface matrix with all five relationships marked conceptual and pending negotiation. Geometry and statutory limitations remain unchanged.
