# S01 Human–AI Symbiotic Scenario: 24 Synthetic Rule Tests

> `synthetic_rule_test` | deterministic desk-based protocol test | not a field rehearsal, real-user test or performance measurement.

## Result

- Rule version: `s01-symbiotic-protocol-v1.0`
- Matrix: 4 personas × 3 time windows × 2 route states = 24 cases
- Rule conformance: 24/24
- Parallel release: 4 cases, only when the route and weekday daytime service are verified
- Safe AI pause with the ordinary path retained: 20 cases
- Actual completion, waiting, accessibility continuity and satisfaction: `not_measured`

## Case-level audit table

This is the minimum human-reviewable record for every case. `parallel` releases the AI and ordinary paths together; `pause` withholds the AI path while fixed wayfinding, a paper route and published human-service status remain available. Human decisions match the gate state in every row. Spatial actions call F01 entry marker, F02 fixed map, F03 paper route, F04 human/phone entry, F05 status board and F06 anonymous receipt.

| Case | Persona | Time | Route state | Gate | Triggered rule | Result |
| --- | --- | --- | --- | --- | --- | --- |
| S01-T01 | wheelchair user | weekday day | verified open | parallel | R01 route and service window verified | pass |
| S01-T02 | wheelchair user | weekday day | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T03 | wheelchair user | night | verified open | pause | R03 unverified night service stops release | pass |
| S01-T04 | wheelchair user | night | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T05 | wheelchair user | weekend | verified open | pause | R03 unverified weekend service stops release | pass |
| S01-T06 | wheelchair user | weekend | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T07 | older low-digital user | weekday day | verified open | parallel | R01 route and service window verified | pass |
| S01-T08 | older low-digital user | weekday day | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T09 | older low-digital user | night | verified open | pause | R03 unverified night service stops release | pass |
| S01-T10 | older low-digital user | night | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T11 | older low-digital user | weekend | verified open | pause | R03 unverified weekend service stops release | pass |
| S01-T12 | older low-digital user | weekend | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T13 | caregiver with child | weekday day | verified open | parallel | R01 route and service window verified | pass |
| S01-T14 | caregiver with child | weekday day | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T15 | caregiver with child | night | verified open | pause | R03 unverified night service stops release | pass |
| S01-T16 | caregiver with child | night | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T17 | caregiver with child | weekend | verified open | pause | R03 unverified weekend service stops release | pass |
| S01-T18 | caregiver with child | weekend | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T19 | first-time visitor | weekday day | verified open | parallel | R01 route and service window verified | pass |
| S01-T20 | first-time visitor | weekday day | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T21 | first-time visitor | night | verified open | pause | R03 unverified night service stops release | pass |
| S01-T22 | first-time visitor | night | segment blocked | pause | R02 blocked segment stops AI release | pass |
| S01-T23 | first-time visitor | weekend | verified open | pause | R03 unverified weekend service stops release | pass |
| S01-T24 | first-time visitor | weekend | segment blocked | pause | R02 blocked segment stops AI release | pass |

## Finding

The protocol withholds AI route advice whenever a segment is blocked. It also pauses AI when night or weekend service hours are unverified. Every case retains fixed wayfinding, a paper route and published human-service status; none requires an account, facial data or continuous tracking.

“24/24 pass” means only that the protocol produced the expected release or pause state for synthetic inputs. It does not show real-user performance. Any limited live use still needs site, accessibility, privacy-safety and accountable-entity sign-off.
