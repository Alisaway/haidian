# S01 轨道—公园无障碍到达｜100日试点就绪设计

## 状态与边界｜Status and boundary

本文件把 S01 深化为 **pilot-ready design / 试点就绪设计**。它没有声称场地授权、责任主体签约、工程可行性、真实用户测试、现场绩效或100日计划已经执行。范围为大钟寺轨道站公共出口信息点至遗址公园公共入口；当前几何和路径关系仍为概念性、待现场核验。

This file develops S01 into a **pilot-ready design**. It does not claim site authorization, accountable-entity commitment, engineering feasibility, real-user testing, field performance or execution of the 100-day plan. Its conceptual task runs from a Dazhongsi rail-exit information point to a public heritage-park entrance; the geometry and route remain subject to field verification.

## 完整任务与普通基线｜Task and ordinary baseline

同一任务是“从站口获得可理解路径并抵达公园入口”。普通路径常设存在：固定且带版本日期的无障碍路线图、无需账号和设备的连续导视、纸面路线、可发现的电话/人工求助，以及路径不明时的“待核验”状态。AI关闭后，这些设施继续完成基本任务，不增加费用或申诉门槛。

The shared task is to obtain an understandable route at the station exit and reach the park entrance. The permanent ordinary baseline is a dated fixed accessible-route map, continuous account-free wayfinding, a paper route, discoverable phone/human help, and a visible “pending verification” state when information is uncertain. These complete the essential task when AI is off.

## 第一米构件｜First-metre components

| ID | 构件 / Component | 普通路径 / Ordinary path | AI开启时 / With AI | 失败动作 / Failure action |
|---|---|---|---|---|
| F01 | 共生门牌 / Symbiotic Marker | 普通路线、纸面和人工入口 | 可选AI入口、版本和数据边界 | 撤下AI入口，普通信息保留 |
| F02 | 固定路线总图 / Fixed route map | 无设备理解路径 | AI建议的公共基线 | 标记待核验段，转人工 |
| F03 | 纸面路线 / Paper route | 离线完成任务 | 与AI版本编号对应 | 版本冲突时使用已核验普通基线 |
| F04 | 人工/电话求助 / Human or phone help | 直接答疑和协助 | 接收转人工请求 | 无响应则暂停AI建议 |
| F05 | 版本状态牌 / Version-status board | 普通服务状态 | 规则版本、更新时间、暂停原因 | 显示“AI暂停—普通服务可用” |
| F06 | 匿名反馈回执 / Anonymous review receipt | 纸面或电话反馈 | 匿名编号和分类建议 | 错误分类转人工并停用自动分类 |

## 数据—决定—空间闭环｜Data–decision–space loop

`公开/人工核验输入 → AI路径建议 → 具名值守角色复核 → 门牌/总图/纸面/状态牌同步 → 匿名回执 → 纠错、回退或恢复`

`public and human-verified inputs → AI route suggestion → review by a named duty role → synchronized marker/map/paper/status action → anonymous receipt → correction, fallback or restoration`

- 输入只使用公开设施信息、人工核验记录、服务时段和版本日期，不采集人脸或连续个体轨迹。
- AI最多给出一条主要建议和一条普通替代，并显示来源、版本和不确定性。
- AI不承担放行职责；没有可解释来源、人工值守或普通路径时，AI入口保持暂停。
- 任一公共界面版本不一致，全部AI入口暂停，F02—F04普通服务继续。
- 公开回执只记录匿名编号、问题类型、版本、人工结论和修复/关闭原因。

- Inputs are limited to public facility information, human verification, service hours and version dates; no face or continuous individual trajectory is collected.
- AI provides at most one primary suggestion and one ordinary alternative, with source, version and uncertainty.
- AI never releases itself. Without explainable sources, a duty role or an ordinary path, it remains paused.
- Any version mismatch pauses every AI entry while F02–F04 continue.
- The public receipt records only an anonymous ID, issue type, version, human decision and repair/closure reason.

## 100日四阶段｜Four stages over 100 days

| 阶段 / Stage | 日程 / Days | 交付 / Deliverable | 放行 / Gate |
|---|---:|---|---|
| A 基线与清权 / Baseline and source clearance | 1—20 | 来源、普通服务基线、待核验段、暂停模板 | 来源和普通路径均可读，否则不前进 |
| B 合成/桌面验证 / Synthetic and tabletop validation | 21—45 | 24个合成案例、失败覆盖表、修订记录 | 阻断级错误均有回退；不外推现场绩效 |
| C 试点就绪装配 / Pilot-ready assembly | 46—75 | F01—F06规格、RACI、资源、指标、状态和回执模板 | 场地、无障碍、隐私和责任角色未签收前不得使用 |
| D 拟议有限使用与退出准备 / Proposed limited-use and exit preparation | 76—100 | 拟议运行、暂停、恢复、撤回和数据删除脚本 | 只有外部责任主体依法确认后才另行决定是否执行 |

The 24 synthetic cases combine four situations (wheelchair, cane/slow movement, child or bulky luggage, ordinary visitor), three time conditions (weekday daytime, night, weekend) and two route states (normal, one broken segment). They test logic only and do not substitute for participation by real users.

## 角色与资源｜Roles and resources

待确认角色包括项目协调、无障碍复核、站点服务、内容/数据维护、隐私安全、现场值守/设施维护。AI模块不承担批准（A）角色。

Planning quantities are two entry/version boards, one fixed route map, two paper-route points, one accessible human/phone help point, six provisional direction markers, one anonymous feedback/version ledger and one optional AI explanation interface. These quantities prepare review and quotation; they are not construction quantities, supplier quotes, budgets or procurement commitments.

人脸识别、强制账号、连续个体轨迹、自动处罚、健康诊断和无人工接管的自动决定不纳入。金额保持待询价，专业人员远程或异步复核仍待完成。

## 设计阈值｜Design targets

当前基线和实际绩效均为 **not measured / 未测量**。以下只在获准测试后测量：普通路径可发现率≥90%；AI与普通路径完成率差≤5个百分点；拒绝AI的额外等待≤2分钟；人工入口可发现率≥90%；错误信息30分钟内同步改正或撤下；回退成功率≥95%；无障碍关键段通过率100%；隐私事件0；公开界面版本不一致率0；无需账号和人脸的基本任务覆盖率100%。

All baselines and actual performance remain **not measured**. These are design targets, not achieved results.

## 暂停、恢复和退出｜Pause, restore and exit

普通路径不可见、AI经过待核验段、版本不一致、人工入口无人响应、出现个人信息、无法拒绝AI或无障碍复核发现实质风险，均立即暂停AI入口。恢复必须具备修复证据、普通路径复核、对应专业复核、版本同步和具名批准。退出撤回可移动AI构件和非必要数据，保留固定普通导视、纸面和人工服务，并公开未结问题与资产去向。

The AI entry pauses if the ordinary path disappears, a route crosses an unverified segment, versions conflict, human help is unavailable, personal data is exposed, refusal is impossible, or accessibility review finds material risk. Reopening requires repair evidence, ordinary-path review, relevant professional review, version synchronization and named approval. Exit removes movable AI elements and unnecessary data while keeping ordinary wayfinding, paper and human service.
