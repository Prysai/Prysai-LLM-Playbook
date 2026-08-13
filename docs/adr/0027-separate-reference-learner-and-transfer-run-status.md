# ADR-0027: Separate reference, learner, and transfer run status

## Status

Accepted

## Date

2026-08-12

## Context

The content-status contract used one Lab `run_status` at corpus and item level.
That field has historically meant learner execution: all 17 Labs were
`not_run`, and the project correctly refused to claim learner outcomes.

The executable-example program now has one bounded maintainer reference run for
Lab 013. It proves that the fixed example, failure, recovery, and assertions can
execute in the recorded environment. It is not a learner run and contains no
cross-task transfer evidence. Projecting that reference into the old field
would erase this distinction and could falsely weaken the Lab runtime blocker.

## Decision

1. Add three independent Lab projections to `content-status.yaml` at item and
   aggregate level: `reference_run_status`, `learner_run_status`, and
   `transfer_run_status`.
2. Use `not_run`, `partial`, and `completed` for aggregate projections. Item
   records currently use `not_run` or `completed`; `partial` remains available
   for a future explicitly bounded item record.
3. Keep legacy `run_status` during migration as an exact compatibility alias
   for `learner_run_status`. It can never reflect maintainer reference or
   transfer evidence.
4. Derive aggregate projections from all 17 item records. One completed
   reference run produces corpus `reference_run_status: partial`, not
   `completed`.
5. Accept a completed projection only when the executable-example registry has
   the matching reference, learner, or transfer evidence projected to the same
   Lab path. A completed reference uses `completed_reference_run`; learner and
   transfer use their independent named fields.
6. Require completed learner evidence before any transfer status can move from
   `not_run`. Reference evidence cannot promote learner, transfer, Lab maturity,
   project maturity, or release status.
7. Add negative fixtures for reference-to-learner promotion, legacy-alias
   drift, transfer without learner completion, false aggregate completion, and
   unregistered reference or learner completion.

## Alternatives considered

### Change Lab 013 `run_status` to completed

Rejected. Existing consumers and quality language interpret it as learner
execution, so this would turn a maintainer reference into learner evidence.

### Keep the reference run only in its separate manifest

Rejected. That preserves the evidence boundary but makes the canonical current
status unable to report useful executable progress.

### Use one status plus an evidence-class label

Rejected. A consumer can ignore the label and still treat the status as a
monotonic completion value. Independent projections make invalid promotion a
contract error.

### Remove the legacy field immediately

Rejected for this migration. Existing locale, site, completeness, quality, and
reader consumers still read `run_status`. Keeping it as a learner-only alias
preserves their honest `not_run` behavior while consumers migrate explicitly.

## Consequences

- The project can show that one maintainer reference executes without changing
  the claim that learner and transfer runs are absent.
- Status maintenance requires updating the appropriate evidence registry before
  a projection can change.
- Consumers that only understand `run_status` continue to receive the learner
  state and therefore fail safely.
- New consumers should select the named projection rather than inventing a
  combined completion score.
- The schema stays at version 1 for the additive compatibility period. Removing
  or changing `run_status` semantics later requires a schema-version migration.

## Evidence boundary

The validator proves field presence, controlled values, aggregate derivation,
legacy alias consistency, transfer dependency, and registration of completed
maintainer references. Its fixtures prove the named invalid projections fail.

It does not independently replay the reference run, identify a learner,
establish learner independence, review learning quality, demonstrate a transfer
task, or close any runtime or release finding.
