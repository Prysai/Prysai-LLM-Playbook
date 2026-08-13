# Lab 013 reference-run independent review

**Review date:** 2026-08-12  
**Reviewer role:** independent packet reviewer  
**Rubric:** `lab-013-v1-review-1`  
**Run ID:** `lab-013-reference-20260813T050509Z`  
**Disposition:** **rejected**  
**Scope:** frozen `examples/lab-013-v1`, complete
`.work/lab-013-reference-current` packet, the frozen review rubric, and Lab
013 acceptance only

## Decision

The final release-note artifact satisfies the frozen content rules, all
declared fixture hashes match the frozen fixture, and the final artifact and
rollback hashes reconcile. The packet is nevertheless rejected as an
independently reviewable Lab 013 reference run because three material evidence
claims cannot be reconstructed from the packet:

1. the failed artifact is represented only by a hash and validator log, so the
   reviewer cannot inspect what actually failed;
2. the bounded recovery is described as “add only CHG-102,” but no failed
   artifact or failure-to-recovery diff proves that this was the only recovery
   change; and
3. `publication-not-run` is marked `supported` by the release note's own
   “Publication: not run” sentence. That sentence is the claim, not independent
   evidence that no publication action occurred. The status should remain
   `not_run`/`not_observed` unless an appropriate action trace exists.

The cleanup result is also asserted only as booleans in `run-record.json`; no
cleanup receipt, sandbox inventory, or independently checkable temporary path
remains in the packet. This does not prove cleanup failed, but it prevents this
review from accepting the cleanup claim.

## Hash reconciliation

I recomputed SHA-256 hashes from the files supplied for review.

- All nine `fixture_hashes` entries match the current frozen fixture.
- Final artifact declared and recomputed:
  `020c2caa8e86a8ee2940b87a7e8403bf5fa2106421b27307308edbd28e3b7831`.
- Rollback target declared and frozen seed recomputed:
  `ba6626ef57033347929d00093b02059361bc70d72318b88fc453e5d626970169`.
- The packet declares failed-artifact hash
  `9cbd891779abbaf14e43b0aca6cafda5a14af9c9a343e983c23ebb22742dd9b1`,
  but the corresponding failed artifact is absent, so that hash cannot be
  independently reconciled.

The repository revision is recorded as
`6333b3acc74df7f5fc8851e2633b3c3c2de087db`; this review did not use repository
history outside the allowed evidence set to promote that declaration into an
independently confirmed claim.

## Rubric results

| Criterion | Result | Evidence and limit |
|---|---|---|
| `changed-path-boundary` | accepted for final diff; transient scope unverified | `artifacts/change.diff` contains one target, `product/release-notes/next.md`, corresponding to declared `release-notes/next.md`. There is no before/after product-tree manifest proving no other transient product write occurred. |
| `checkpoint-reconciliation` | accepted | CP0-CP4 all exist. CP3 is honestly `failed_then_recovered`; hashes, allowed path, forbidden actions, attempts, unknowns, rollback, and next check are available elsewhere in the same run record. |
| `failed-attempt-preserved` | rejected | `intentional-failure.log` preserves exit code `1` and three missing CHG-102 diagnostics, and the action log records the event. The invalid artifact itself is not in the packet, so its declared hash and exact contents cannot be reviewed. |
| `bounded-recovery` | rejected | `bounded-recovery.log` preserves exit code `0`; the action log says only CHG-102 summary and EV-102 were added. Without the failed artifact or a failure-to-recovery diff, that limited change is not independently provable. |
| `claim-scope` | rejected | Artifact creation and focused-check success have matching files. Learner and transfer claims remain `not_run`, and unknowns correctly include learner independence, transfer, Codex behavior, publication, and reader outcome. However, `publication-not-run` is incorrectly `supported` by the artifact that makes the same assertion; this is circular evidence. |
| `rollback-and-next-check` | disputed | The rollback hash exactly matches the frozen seed and the next check correctly asks for independent review. No rollback rehearsal is claimed. Cleanup is only self-reported and cannot be checked from the packet. |

## Acceptance-contract review

### Supported

- Goal and local candidate scope are explicit in the frozen change request.
- Only the final declared product path appears in the preserved diff.
- CP0 through CP4 are present.
- The real failure log records exit code `1`; the recovery log records exit
  code `0`.
- The fixed check names the missing CHG-102 ID, ledger summary, and EV-102
  evidence before the passing attempt.
- The final artifact contains all required headings, both required change IDs,
  both ledger summaries, EV-101/EV-102, and the required limitation phrases.
- None of the frozen forbidden phrases appears in the final artifact.
- The packet keeps learner execution, transfer, Codex behavior, publication,
  and reader outcome outside its positive evidence scope.
- The rollback target and smallest next check are explicit.

### Not sufficiently supported

- The failed artifact and exact recovery delta are not preserved.
- The action log has two recovery-related events, but it is not a complete
  append-only trace from CP0 through CP4 and cannot independently prove the
  absence of other actions.
- The final changed-path boundary is visible; the full temporary product-tree
  boundary is not.
- Removal of the temporary product and the cleanup target are not
  independently evidenced.
- No transfer task was run, as correctly recorded.
- No fresh learner or Codex run occurred; the packet is explicitly a
  deterministic maintainer reference run.

## Required correction before resubmission

Produce a new run packet; do not edit this raw packet or rewrite its history.
The resubmission should:

1. preserve the invalid release note as a named artifact and bind its hash;
2. preserve a diff from invalid artifact to recovered artifact, proving the
   recovery changed only the diagnosed CHG-102/EV-102 content;
3. preserve before/failure/recovery product-tree path-and-hash manifests;
4. classify `publication-not-run` as `not_run` or support it with an
   independently appropriate action trace rather than the release note's own
   statement;
5. record a redacted but stable temporary target identifier and a cleanup
   receipt showing the exact target checked and absent; and
6. keep the failed packet immutable when producing the corrected run.

## Status boundary

This review does not modify the raw packet or any governance status. The
disposition is `rejected` for the frozen reference packet under rubric
`lab-013-v1-review-1`. It does not claim that the runner malfunctioned, that the
final release note is invalid, or that Lab 013 cannot be run successfully.
It means only that this packet does not yet support all of the independent
review claims required for acceptance.
