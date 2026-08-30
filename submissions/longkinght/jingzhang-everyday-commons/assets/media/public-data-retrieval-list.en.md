# Public Data Retrieval List

This ledger defines background material and pending checks only. It does not turn unavailable values into predicted benefits or replace formal planning data. At each iteration: sync main, reread the official instructions, check Issues/PRs, update the source ledger and rerun self-checks.

| Data layer | Preferred public source / retrieval entry | Fields to record | Current status and limit |
|---|---|---|---|
| District population | Beijing/Haidian statistical communiques, yearbooks and subdistrict releases | Administrative definition, year, spatial unit, URL, access date, licence | Background only; align year and spatial definition before use; never a ridership forecast |
| Rail and ridership scale | Beijing transport, rail operator or government operating information | Station, time window, definition, flow vs. section count, URL, access date | Record scale and definition only; keep unknown without an official definition |
| POI and public services | Government service directories, open maps or licensed institutional data | POI type, positional precision, update date, licence, deduplication method | Find service gaps and pending checks only; no personal or unauthorised data |
| Regulatory plan and land use | Public planning, control-plan search and formal plan sheets | Plan number, version, parcel/road definition, URL, access date | Provisional geometry is not a control plan; recalculate area, land use and intensity when released |
| Accessibility and human service | Government service guides, station-facility notes and professional field checklist | Entry, ramp/lift, service hours, human entry, verifier/date | Online material is not field evidence; keep pending without field verification |

## Common registration rules

- Record source, use, limitation, access date, spatial/time definition and reuse permission.
- A link that cannot be publicly verified stays an internal retrieval task and is not added as a factual source in `sources.json`.
- Before any population, ridership, POI or control-plan value enters a figure or metric, a human reviewer records its version; otherwise write pending/unknown.
- Do not collect personal data, continuous trajectories, face information or unauthorised internal planning material.
