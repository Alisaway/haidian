# S01 Human–AI Symbiotic Protocol

## Purpose

This companion file makes S01 “rail-to-park accessible arrival” auditable as parallel AI and human/offline paths. It is a conceptual evaluation protocol, not a field rehearsal record and not evidence that a service is live.

## One public task

From rail arrival to the park entrance, a person should receive guidance that is understandable, choice-preserving and reversible. AI may provide a sourced and versioned suggestion; human help, phone, paper route and fixed wayfinding must complete the same basic task independently.

## Minimum state machine

| State | Entry condition | Public interface | Human/offline path | Stop condition |
|---|---|---|---|---|
| `PENDING_CLEARANCE` | Sources, boundary and ordinary-service baseline await clearance | Do not publish as an available route | Fixed wayfinding and desk | Any critical source is missing |
| `READY_FOR_REVIEW` | Source, spatial anchor and human entry are readable | Show version and uncertainty | Paper, phone and human-equivalent path | No named review role |
| `AI_PAUSED` | Inaccessible segment, unverified service hours or conflicting information | Show AI PAUSED and reason | Ordinary path remains open | Ordinary path cannot complete the task either |
| `RESTORED` | Human review complete and wrong information withdrawn | Show restored version and date | Continue human/offline entry | Review evidence incomplete |

## Fixed rules

1. AI has recommendation authority only; it cannot release a route, accessibility service or public-safety decision directly.
2. No account is required; no face data or continuous individual tracking is collected.
3. Unexplained risk, missing human access, unclear privacy boundaries or a version conflict immediately enters `AI_PAUSED`.
4. Every pause, takeover, restoration and exit records source, version, review date and accountable role; the accountable entity remains pending until official inputs arrive.

## Evaluation boundary

The current 24/24 means deterministic rules conform to this state machine. It does not mean field accessibility, completion rate, waiting time or satisfaction. Before real use, field baselines, accessibility-professional review, privacy/safety review and accountable-entity sign-off are required.
