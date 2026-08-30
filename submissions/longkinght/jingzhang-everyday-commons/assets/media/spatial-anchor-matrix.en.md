# Spatial Anchor Matrix | Three Zones, Three Stations, Five Segments

This matrix turns the three key areas from names into reviewable spatial interfaces. Anchors are design proposals, not built facilities; boundary, ownership, accessibility continuity, operating roles and night/weekend availability remain subject to human verification.

| ID | Key area / station | Entry | Service node | Human fallback | Observation / feedback | Accountable role (TBC) | Stop condition |
|---|---|---|---|---|---|---|---|
| KEY-001 / ST-01 | Zhongzhiyuan / Verification | Evidence Yard entry | Enterprise-service interface | Park human desk | Slow-robot observation line and incident log | Park service, safety observer, professional reviewer | Do not release before route/role/access review; conflict or failed emergency stop means stop |
| KEY-002 / ST-02 | AI Origin Community / Commons | Symbiotic Living Room entry | Community learning and care entry | Paper, phone, community desk | Review point and anonymous mailbox | Community service, content reviewer, access reviewer | Missing human entry, stale source or unclear privacy boundary takes AI navigation offline |
| KEY-003 / ST-03 | Dazhongsi / Conversion | First-Use Concourse entry | Public consumption and rail–park wayfinding | Ordinary wayfinding and human advice | Review mailbox and public feedback point | Station service, public wayfinding, merchant/professional reviewer | Stop if ordinary access is hidden, the route breaks or account/face capture is forced |

## Three stations / five segment IDs

| Segment | Spatial relation | Primary action | Related stations |
|---|---|---|---|
| SEG-01 | Rail arrival | Entry recognition, accessible first metre, paired ordinary path | ST-03 |
| SEG-02 | Heritage park | Cultural guidance, observation line, low-speed public experience | ST-03 / ST-01 |
| SEG-03 | Daily community | Learning, care, service navigation and human referral | ST-02 |
| SEG-04 | Park work | Enterprise service, first use and professional review | ST-01 / ST-02 |
| SEG-05 | Public experience | Feedback, review, version display and exit archive | ST-01 / ST-02 / ST-03 |

## Minimum review record

`anchor_id`, `station_id`, `segment_id`, `entry_status`, `human_fallback_status`, `accessibility_check`, `service_hours`, `responsible_role`, `stop_condition`, `evidence_url_or_file`, `reviewer`, `review_date`, `version`.

When any field is missing, the interface remains provisional and must not be described as a completed facility.
