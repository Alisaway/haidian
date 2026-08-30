# 方案迭代记录

## v1.3 - 2026-08-20

### Structured deliverables (scoring enhancement)
- Added risk.json: 8-dimension structured risk matrix with scores, mitigation measures, and human review requirements for high-risk dimensions (implementation_complexity=4, policy_uncertainty=4)
- Added spatial.json: 13 concept-level spatial items (6 nodes, 4 corridors, 3 areas) with geometry.mode=concept, linked to proposal scenarios
- Added simulation.json: 12 verification tasks with 33 assertions (all pass), covering scenario, persona, landmark, case, project, risk, spatial, and metric validation

### Proposal enhancement (7 scoring dimensions)
- proposal.md: added AI Scenario Data-Governance Audit Table (12 scenarios with data source, privacy boundary, AI role, human review, automation level)
- proposal.md: added Public Interest and Inclusion Safeguards section (vulnerable groups, public participation, non-AI professional accessibility)
- proposal.md: added Verifiable Pilot Pathways and Stakeholders table (4 pilot projects with entry conditions, acceptance gates, rollback conditions)
- proposal.md: added Structured Risk Matrix section referencing risk.json and simulation.json
- proposal.en.md: synced all new sections with English translations

### Manifest
- 3 new files registered in manifest.json (risk.json, spatial.json, simulation.json)
- SHA256 hashes recalculated for all modified files

## v1.2 - 2026-08-20

### Visual interactivity
- visual/index.html: added smooth scroll navigation, scroll-triggered fade-in animations (IntersectionObserver), image lightbox viewer, back-to-top button, and nav active highlighting
- visual/index.en.html: synced all interactivity features with Chinese version

### Proposal depth
- proposal.md: expanded Land Use section with retain-renovate-demolish ratio estimates and 5 building strategy details
- proposal.md: expanded Transport section with road classification system and public service facility allocation per key area
- proposal.en.md: synced all expanded content with English translation

## v1.1 - 2026-08-20

### Fixes
- Land use code 05 (湿地) corrected to 09 (商业服务业用地) per upstream enum update
- self_check.json schema_version aligned from 0.1.0 to 0.2.0
- Bilingual frontmatter tracks synced (proposal.en.md had 5 tracks, now matches proposal.md's 3)
- Unified blue-green metaphor to "工字形" in both zh and en versions
- Visual index.html metric display: green_ratio and public_space_ratio now show 12.34%/7.33% consistently (was 12.3%/7.3% in cards vs 12.34%/7.33% in table)

### Geometry enrichment
- buildings.geojson: expanded from 1 feature to 5, with building_strategy tags (retain/renovate/renew/new)
- roads.geojson: expanded from 1 LineString to 5, including slow-mobility spine, station connection, east-west connector, and blue-green loop
- constraints.geojson: filled from 0 features to 3, adding heritage protection zone, railway corridor buffer, and TOD influence area

### Audit matrices
- design_depth_matrix.json: each of 15 items now has differentiated evidence (proposal_sections, geometry_refs, metric_refs, evidence_summary_zh)
- compliance_matrix.json: each of 23 requirements now has per-requirement evidence mapping
- standard_matrix.json: data_gap item evidence_summary corrected to acknowledge the gap

### Visual
- visual/index.en.html: fully translated from Chinese to English (was a byte-for-byte copy)
- 5 English figure PNGs regenerated with all-English text (were identical MD5 copies of Chinese versions)
- 2 English PDFs (a3-booklet.en.pdf, a0-boards.en.pdf) regenerated with English content and embedded English figures
- cover_image field added to manifest.json with assets/media/cover.jpg as media_poster

### Metrics
- metrics.json: expanded from 6 to 15 metrics (added key area areas, building count, road segments, scenario count)
- visual/index.html: metrics display unified to 12.34%/7.33% across cards and table

### Manifest
- All SHA256 hashes recalculated for modified files
- cover_image field and media_poster file entry added
- manifest.json entry excluded from SHA256 (circular dependency)

## v1.0 - 2026-08-10

### Initial submission
- Bilingual proposal (proposal.md / proposal.en.md)
- 9 GeoJSON layers, 5 design figures, A3/A0 PDFs
- Offline interactive visualization page
- Complete evidence chain with 4-gate self-check
- Passed CI and merged via PR #1349
