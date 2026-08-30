# 方案迭代记录

## v8.1 - 2026-08-28

### 远端评审离线字体修复

- 按 PR #4109 评审截图复现：Windows 本机系统字体掩盖了 `report/proposal*.html` 未加载离线 CJK 字体的问题；英文 visual 的“中文”切换标签也未命中已嵌入字体。
- 先用最新官方渲染器重建双语 report HTML，再显式加载本地 `visual/assets/cjk-font.css`，并将 `P1NotoSansSC` 置于报告字体链首位；英文 visual 的中文切换标签补充 `lang="zh"` 与定向字体规则。
- 从 Google Fonts 官方 Noto Sans SC 可变字体生成 400 字重的离线 WOFF 子集，字符集合覆盖两份 report 与两份 visual HTML；不依赖 CDN、远程字体、评审机缓存或特定系统字体。

## v8.0 - 2026-08-28

### 实施基线

- 基线为已合并 PR #4068 的投稿树；回退提交为 `17b18d669d52f476998c1e7d0171547f1026ab5d`。
- 在最新 `upstream/main` 上复测，deterministic、spatial、visual、professional 四门均通过，`participant_preflight --check-push` 通过。
- 基线包体为 36.0 MiB；中英文 A0 各 3 页，中英文 A3 各 16 页。

### 本轮目标

- 重排中英文 A0 三板的远距层级：总体英雄板、三地对比板、旗舰实施板。
- 增加大钟寺资源、容量、FTE、ROM CAPEX、年度 OPEX 与 no-build 对照的可复算包络。
- 在不改变核心几何、主命题、三类载体、五态治理、临时边界和大钟寺唯一旗舰的前提下，压缩包体并同步全部派生物。

### 真实性边界

- 新增面积、容量、人员和成本参数均为参与者假设或由参与者假设计算的低置信数量级，不是现场测量、北京报价、预算、采购、审批、运营主体承诺或建设承诺。
- 任一新版本若未通过完整门禁、双语视觉复核或包体门槛，应回退到上述 v7 基线。

### M2 · 大钟寺资源与运营包络

- 从 `geometry/phasing.geojson` 的 D1–D3 概念几何在 EPSG:4548 下复算 Micro / Base / Extended / No-build 四情景。
- 新增双语资源图与机器可读合同；容量、开放、FTE、CNY ROM CAPEX/OPEX 均保留公式、输入、单位、舍入、低/基准/高范围、决策门和重算触发。
- No-build 继续保留公共净线、人工窗口、座椅、遮荫、导视和人工服务；所有价格和运营输入均为低置信参与者假设。
- 公开各情景展示舍入前 FTE 并以其复算 OPEX；补齐 No-build CAPEX 三项构成与固定人工服务 OPEX 的低/基准/高输入。

### M1 · 双语 A0 终评三板

- A0-01 改为总体英雄板：冻结核心命题，保留两纵五横三室、大钟寺人物尺度主视觉与 5 / 12 / 7 / 1102 m² / 90 天；删除绿地率、完整 RACI 和重复免责声明。
- A0-01 将已登记权利链的 `08-dazhongsi-active.webp` 作为 ≥120 ppi 人物尺度窗口，与矢量五缝、旁置接口和唯一旗舰标识组成 43.5% 英雄区；英文统一为 `TWO LONGITUDINAL INTERFACES`。
- A0-02 改为同尺度三地对比板：只保留三组平面、剖面、失败、人工角色、构件和恢复路径，删除八张气氛图平铺与重复空卡。
- A0-02 英文北部短标签统一为 `ZHONGZHIYUAN (NORTH)`。
- A0-03 改为旗舰实施板：同机位 BASE / ACTIVE / FREEZE / RETURN、五段 90 天、人物任务链、公式级资源范围和六项停止指标同板呈现。
- 中英文逐板等义；每板只保留一次临时边界 / NOT APPROVED 底栏，A3、视频、HTML 与 JS 均未修改。

### M3 · 包体保守瘦身

- 中英文 `grounded-hero-visuals` 保持 2000 × 1125 px，以 Pillow 256 色自适应调色板、MEDIANCUT、Floyd–Steinberg 抖动和 PNG `compress_level=9` 重编码；不删除双语、审计或版权资产，不修改视频与四份 PDF。
- 两图由 1,882,278 / 1,897,950 bytes 降至 634,520 / 634,066 bytes；包含本轮版权与变更记录后包体为 34,880,809 bytes（33.265 MiB）。重复哈希组保持原登记，不新增重复资产。
- 双语 A3 各 16 页均实际渲染复核；既有整页嵌入图约 132.02 ppi，本轮未重做 A3、未改变其分辨率，也未引入新的色带、缺字或视觉退化。

### M4 · 跨载体实施同步

- 中英文 visual 的 implementation 段新增 `Micro / Base / Extended / No-build` 四情景静态资源包络图与等义摘要；Base 面积、容量、FTE、CAPEX ROM、年度 OPEX ROM 全部与 `visual/assets/dazhongsi-operating-envelope.json` 一致。
- 所有数字继续标注为参与者低置信假设，不是北京报价、预算、审批、采购或承诺；No-build 保留公共净线、导视、座椅/遮荫、人工窗口与人工服务后备。未新增 JS 交互类型，未重做 A3、视频或生成式 report HTML。

### 冷读门 · A0 主级短语修复

- A0-01 中英文主级短语明确为 `TWO REMOVABLE LONGITUDINAL INTERFACES` / “两条可撤南北接口”，同步页眉和结构索引短标签，不改变英雄区、照片尺寸或核心几何。
- A0-03 将 `HUMAN TAKEOVER + SAFE RETURN` / “人工接管 + 安全回归”提升至与四态、90天同级的主标题；其余版式、状态图、资源模型和停止指标不变。
