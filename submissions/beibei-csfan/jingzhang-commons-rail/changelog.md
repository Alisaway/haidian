# 方案迭代记录

## v1.2.0 - 2026-08-30

按 PR #4262 第二轮 AI Agent 评审（七维 86.0/100，review 5060465504，针对 ee98ac948）返修并自行迭代：

- P0：重绘 `land-use-structure.en.png`（清除乱码/重复绿地率，图例与中文代码对齐）；重绘 `mobility-bluegreen.en.png`（删除残留字，NOT TO SCALE，9042.827 m 只标南北主脊）；压缩并重绘 `key-areas.en.png` 至 API cap 4 MiB 以下；同步英语 PDF/HTML。
- 自行迭代：中文总图去掉「规划范围」口吻；中文用地图去掉英文残留；中文慢行图「共测廊下」命名；EN 运营图改为技术表；EN 生态图去掉 GECIRID 乱码环；正文增加跨园区可核验接口表（不编造 MOU）。
- 三项核心指标仍为 `11412825.386` / `0.259513` / `0.118607`。

## v1.1.0 - 2026-08-30

按 PR #4262 AI Agent 评审（七维 64.0/100，request-changes）返修：

- P0：离线嵌入文泉驿微米黑子集；重排 A3/A0 使首面主图铺满；中英图统一用地代码、南北 9042.827 m、公共空间率命名；删除 Cadastral / Official Green Ratio / 模板比 0.123423；图签改为 beibei-csfan · 概念建议 · 2026-08-30。
- P1：补齐 agent.2 八案落点与七要素闭环、agent.4 组件库、agent.5 导视层级、agent.6 年度运营包，并新增四对概念图。
- 三项核心指标仍为 `11412825.386` / `0.259513` / `0.118607`，不引用脚手架模板比。

## v1.0.0 - 2026-08-30

- 选定京张共证廊 / Jingzhang Commons Gallery，避开循证轨与 EBIP 等已占用品牌。
- 用官方临时边界自剖分几何；三项核心 `11412825.386` / `0.259513` / `0.118607`。
- 替换脚手架正文、五图中英、A3/A0、离线 visual；许可 COMMUNITY-DISPLAY-ONLY。
- 更正作者 login 为 beibei-csfan，路径迁至 submissions/beibei-csfan/jingzhang-commons-rail。
