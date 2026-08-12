# Current quality register

This is the current defect ledger for the candidate release. A review report
is not a closed defect: every item needs a remediation record and fresh
evidence.

| ID | Severity | Area | Current finding | Required evidence to close | Status |
|---|---|---|---|---|---|
| Q-001 | P0 | Release | No learner lab has a recorded run; all 17 labs are `draft/not_run`. | Fixed input, run log, artifact, failure branch, and independent review for L0, L1, L3, and L6. | open |
| Q-002 | P0 | Release | The 39 evaluation fixtures are `not_run/static_structure_only`. | Frozen environment, scored executions, threshold, and reviewer record. | open |
| Q-003 | P0 | Licensing | The repository had no root license or complete asset boundary. | Root LICENSE, licensing policy, source register, and contribution notice. | resolved for candidate; recheck assets |
| Q-004 | P1 | English path | Four labs remain migration-pending in the English route. | English source plus review for Labs 005, 008, 009, and 010, or an explicit route-only downgrade. | in progress; four of eight migrations completed |
| Q-005 | P1 | Curriculum | Reused labs do not consistently state the new capability, artifact, and acceptance delta. | Matrix fields `first_seen`, `new_capability`, `new_artifact`, and `new_acceptance`, reviewed per reuse. | open |
| Q-006 | P1 | Locales | Non-English records describe planned coverage, not completed translation. | Separate route, file, translation, and language-review states; generated missing-file report. | open |
| Q-007 | P1 | Facts | Fast-changing product claims have uneven review dates and no URL reachability gate. | Fresh source checks with scope, owner, checked date, and risk-based next review. | open |
| Q-008 | P2 | Navigation | TOC display titles and chapter H1 titles have aliases without a canonical map. | Generated title map consumed by TOC, reader, and search index. | open |
| Q-009 | P2 | Teaching depth | Chapter size and experiment depth vary sharply; learning time and required artifact are not consistent. | Per-chapter time, prerequisite, artifact, failure, transfer, and learner review record. | open |
| Q-010 | P2 | Cases | Several field reports are summaries rather than structured case cards with evidence level and reproduction status. | Symptom, version, date, source, evidence level, local reproduction, safe check, and stop condition. | open |

The release decision is `candidate / static checks passed / runtime evidence
pending`. Open P0 or P1 items block a `verified` or `production-ready` claim.
