# ADR-0052: Keep timely Reader notes candidate-only at admission

## Status

Accepted. This decision defines the active admission boundary for the
`timely-source-first` profile. It does not promote the Grok Bot note or any
other content to a verified or production-ready state.

## Date

2026-09-03

## Context

Time-sensitive Reader notes combine volatile product facts, dated sources,
source ownership, translation state, and a maintenance deadline. The project
already has artifact maturity states (`draft`, `candidate`, `verified`, and
`production-ready`) and separate claim states (`current`, `stale`, `disputed`,
and `removed`). A new field-note validator must not turn a complete Markdown
shape or a passing source check into a maturity promotion.

The first timely-content PR introduces a stricter `timely-source-first`
admission profile, but it does not yet define learner, repeated runtime,
independent review, or production evidence sufficient for `verified`. A
withdrawn note also should not remain in the active Reader matrix while marked
`removed`.

## Decision

1. An active `timely-source-first` Reader note is admitted with
   `content_status: candidate` only.
2. `verified` is not an implicit next state. A future change must define the
   required evidence, reviewer, scope, and rollback behavior in a separate
   contract before the validator accepts that promotion.
3. `removed` is a removal action rather than an active matrix state. Remove the
   `reader_content` record, regenerate `site/locale-manifest.js` and
   `site/search-index.js`, and retain the dated research file when it remains
   useful for audit history.
4. Claim-level `fact_status` remains independent. A note can be a candidate
   artifact while its rows are `current`, `unverified`, `candidate`, `stale`,
   `disputed`, or `removed` within their declared scopes.

## Alternatives considered

### Accept `verified` because the source table passes

Rejected: source-backed and structurally complete does not establish runtime,
learner, transfer, independent-review, or production evidence.

### Keep `removed` in the active Reader matrix

Rejected: generated projections could continue to expose a withdrawn item or
make removal depend on every consumer interpreting the status identically.

### Use one status vocabulary for artifacts and claims

Rejected: a current external fact is not the same object as a verified
learning artifact, and conflating them makes freshness and maturity claims
ambiguous.

## Consequences

- The timely validator intentionally has a narrower status vocabulary than the
  project-wide artifact vocabulary.
- A future verified promotion will require a new, reviewable contract instead
  of a one-line status edit.
- Removing a note requires a coordinated matrix/projection update, while the
  historical source record can remain available for provenance.

## Evidence boundary

- [`docs/governance/timely-content-policy.md`](../governance/timely-content-policy.md)
- [`docs/templates/timely-content.md`](../templates/timely-content.md)
- [`scripts/validate_timely_content.py`](../../scripts/validate_timely_content.py)
- [`docs/governance/content-status.yaml`](../governance/content-status.yaml)
- [`CONTEXT.md`](../../CONTEXT.md)

This ADR records an admission rule. It is not evidence that the Grok Bot note
is verified, that the sources will remain current, or that the Playbook has
learner, transfer, runtime, or production evidence.
