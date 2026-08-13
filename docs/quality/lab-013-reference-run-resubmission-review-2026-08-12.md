# Lab 013 reference-run resubmission independent review

**Review date:** 2026-08-12  
**Reviewer role:** independent packet reviewer  
**Rubric:** `lab-013-v1-review-1`  
**Run ID:** `lab-013-reference-20260813T051018Z`  
**Disposition:** **accepted**  
**Scope:** frozen `examples/lab-013-v1`, immutable
`.work/lab-013-reference-resubmission` packet, the frozen review rubric, and
Lab 013 acceptance only

## Decision

The resubmission is accepted as one deterministic maintainer reference packet.
The packet now preserves the invalid artifact, the exact recovery delta, three
product-tree manifests, a bounded action trace, and a cleanup receipt. Those
additions make the failed attempt and bounded recovery independently
reconstructable within the fixture. The publication claim is now correctly
classified as `not_observed`, rather than promoted to a supported fact.

This acceptance is deliberately narrow. It is not learner evidence, a Codex or
model run, a transfer run, publication evidence, rollback-rehearsal evidence,
or production/readiness evidence.

## Independent reconciliation

I recomputed and compared the packet's hashes and state transitions.

- All nine declared fixture SHA-256 hashes match the frozen fixture.
- The preserved failed artifact matches
  `9cbd891779abbaf14e43b0aca6cafda5a14af9c9a343e983c23ebb22742dd9b1`.
- The final artifact matches
  `020c2caa8e86a8ee2940b87a7e8403bf5fa2106421b27307308edbd28e3b7831`.
- The rollback target matches the frozen seed hash
  `ba6626ef57033347929d00093b02059361bc70d72318b88fc453e5d626970169`.
- Baseline, failed, and recovered manifests contain the same two product paths.
  `README.md` is unchanged; only `release-notes/next.md` changes.
- `recovery.diff` adds exactly the diagnosed CHG-102/EV-102 ledger row and
  removes nothing.
- The intentional-failure log records exit code `1` and identifies the missing
  CHG-102 ID, summary, and EV-102 evidence. The recovery log records exit code
  `0`.
- The cleanup receipt uses the same target ID as the run record, says the one
  temporary root existed before cleanup, and records it absent afterward.
- CP0 through CP4 are present; CP3 is honestly recorded as
  `failed_then_recovered`.

## Rubric results

| Criterion | Result | Evidence and limit |
|---|---|---|
| `changed-path-boundary` | accepted | The three manifests reconcile the complete two-file product tree across baseline, failure, and recovery. Only the allowed `release-notes/next.md` hash changes; `change.diff` targets the same path. This establishes the boundary of the deterministic temporary product represented by the packet, not any external environment. |
| `checkpoint-reconciliation` | accepted | CP0-CP4 exist in the run record, CP3 preserves failure and recovery, and the action log records definition, planning, failed validation, bounded repair, passing validation, and handoff. The packet consistently records review as pending at handoff. |
| `failed-attempt-preserved` | accepted | The invalid release note is present, its recomputed hash matches both the run record and failed manifest, and the failure log preserves raw diagnostics and exit code `1`. |
| `bounded-recovery` | accepted | The failure-to-recovery diff contains one added line for CHG-102/EV-102 and no removal. The failed and recovered manifests corroborate the two artifact hashes, and the fixed validator then exits `0`. |
| `claim-scope` | accepted | Artifact creation and focused-check success have direct packet evidence. Learner and transfer claims remain `not_run`. `publication-not-run` is `not_observed` and explicitly bounded to the forbidden-action declaration and local trace; publication remains in `unknowns`. This does not prove the absence of publication outside that trace. |
| `rollback-and-next-check` | accepted | The rollback target matches the frozen seed, and the smallest next check is this independent rubric reconciliation. The packet identifies a rollback target only; it does not claim or prove a rollback rehearsal. |

## Prior rejection resolution

| Prior issue | Resolution |
|---|---|
| Failed artifact absent | `artifacts/failed-release-note.md` is present and its hash reconciles. |
| Recovery boundary not independently provable | `artifacts/recovery.diff` and the failed/recovery manifests show exactly one diagnosed addition. |
| Circular publication evidence | The claim is now `not_observed`; its evidence is explicitly limited to the local runner trace, and publication remains unknown. |
| Transient product-tree boundary absent | Baseline, failed, and recovery manifests account for both files in the temporary product tree. |
| Cleanup only self-reported in the run record | `cleanup-receipt.json` binds the stable redacted target ID and before/after existence observations to one temporary root. |
| Action trace did not cover the workflow | The new log covers CP0/CP1 setup, the failed check, the bounded repair and passing check, and CP4 handoff. |

## Artifact and acceptance-contract review

The final release note contains every frozen required heading and phrase, both
required change IDs, their exact ledger summaries, and EV-101/EV-102. None of
the frozen forbidden phrases appears. The attempt order is
`intentional-failure` then `bounded-recovery`, with required exit codes `1`
then `0`. The run record includes all five required claim IDs and all five
required checkpoints.

The action log is sufficient for this narrow reference-packet decision, but it
should not be treated as tamper-proof audit telemetry or evidence about actions
outside the deterministic runner. Likewise, the cleanup receipt is a bounded
runner-produced observation, not independent operating-system attestation.
These limits do not contradict the frozen acceptance contract because the
packet makes no broader positive claim.

## Status boundary

This review does not modify the raw packet, the first rejected review, the lab
source, or any governance status. `accepted` means only that the resubmitted
deterministic maintainer packet satisfies rubric `lab-013-v1-review-1` within
its stated evidence limit. Lab 013 remains draft/not-run unless and until the
separate learner-run and status-governance requirements are met.
