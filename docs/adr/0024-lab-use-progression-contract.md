# ADR-0024: Model each Lab use as a progression contract

## Status

Accepted

## Date

2026-08-12

## Context

The learning path previously stored `primary_labs` and `supporting_labs` as
lists of IDs. Those lists answered where a Lab appeared, but not what a learner
gained by doing it at that level. A reused Lab could therefore look like
padding, and a maintainer could add a second placement without declaring a new
capability, inspectable artifact, or stronger acceptance rule.

The content matrix describes thematic progression in prose, but it is not the
canonical asset-assignment source and does not enumerate every current Lab.
Maintaining reuse deltas there would create a second relationship registry.

## Decision

1. Replace `primary_labs` and `supporting_labs` with one `lab_uses` list on
   every level in learning-path schema version 2.
2. Require every use to declare `id`, `relation`, `first_seen`, and bilingual
   `new_capability`, `new_artifact`, and `new_acceptance` values.
3. Require exactly one primary Lab per level, complete coverage of all
   registered Labs, stable `first_seen` values, and individually distinct
   capability, artifact, and acceptance deltas whenever a Lab appears at
   another level.
4. Add negative fixtures for missing delta fields, false first-seen claims,
   repeated deltas, and levels without one primary Lab.
5. Generate the deltas into the public learning-path data and show them in the
   level panel. The canonical contract, not a hand-maintained display table,
   owns the relationship.

## Alternatives considered

### Add prose notes only to the content matrix

Rejected. The matrix is useful synthesis but is not consumed by navigation or
the site and does not cover every Lab as an independent mapping.

### Add a separate Lab-reuse registry

Rejected. A second file would duplicate level, Lab, and relation identity and
could drift from the learning path.

### Forbid reuse entirely

Rejected. Deliberate spiral practice is valuable when the later use changes
the learner's responsibility and evidence. Lab 003 moves from a first-pass
claim table at L3 to independent adjudication at L5; those are not the same
exercise contract.

## Consequences

- New curriculum volume cannot be justified by placing the same Lab in another
  level without a concrete learning and evidence delta.
- Readers can see why a Lab is introduced or reused instead of inferring the
  progression from chapter titles.
- Contract edits are larger because pedagogical intent is now explicit.
- Structural completeness still does not prove that a Lab ran or taught the
  intended capability; runtime and learner evidence remain separate gates.

## Evidence boundary

The validator proves coverage, shape, first-seen consistency, and textual
distinctness of declared Lab-use deltas. It does not prove instructional
quality, execution, learner mastery, independent review, or transfer.
