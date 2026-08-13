# Lab 008 deterministic reference review

**Review date:** 2026-08-13

**Fixture:** `examples/lab-008-v1`

**Run ID:** `lab-008-reference-7cea231affd4ff48`
**Mode:** maintainer self-review of code, packet, and negative fixtures

## Decision

Accept the deterministic packet as a maintainer reference run for Lab 008.
Keep the Lab `draft`, its learner run `not_run`, and its transfer run `not_run`.
This is the maintainer's release decision against the fixed project rubric. It
is not an independent human review, learner assessment, or reviewer-agreement
record.

The first brief was correctly rejected with exit `1`. It treated source count
as confidence, used inaccessible and fabricated records as support, generalized
beyond release 4.2, omitted disagreement and unknowns, and claimed zero
downtime. The corrected brief passed with exit `0` only after it:

- limited the decision to the synthetic Orion 4.2 record;
- used only the current, scope-matched source as direct support;
- preserved the scope-matched 4.2 disagreement between the current and
  superseded records without rewriting either source;
- kept zero downtime and other-release applicability unknown;
- rejected the inaccessible record and fabricated citation candidate;
- recorded limitations, next check, source-budget stop, hashes, diff, and
  cleanup.

## Checks performed

- Inspected every fixture input, the runner, validator, and test file.
- Re-ran the complete reference test suite.
- Confirmed two positive paths, twelve negative/boundary checks, and
  byte-for-byte deterministic repeated output.
- Read the preserved initial and corrected validator logs.
- Reconciled the run record's input, baseline, brief, artifact, and cleanup
  hashes with the generated packet.
- Confirmed the runner has no network path, reads no credentials, and rejects
  output outside a specific child of repository `.work`.

## Supported claim

For the frozen synthetic packet, the project can repeatedly demonstrate a
research failure and correction: an overclaimed brief is rejected, while the
declared bounded conclusion passes the fixed validator.

## Claims not supported

This review does not establish model behavior, learner independence, live web
research quality, source completeness outside the fixture, cross-domain
transfer, real Orion behavior, zero downtime, or production readiness. It is
implementation evidence for a teaching fixture, not learning-outcome evidence.
