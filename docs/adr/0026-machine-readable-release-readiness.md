# ADR-0026: Gate release readiness with explicit operational evidence

## Status

Superseded by [ADR-0049: keep maintainer-only release controls out of public artifacts](0049-maintainer-only-release-controls.md)

## Date

2026-08-12

## Context

The commit-bound release evidence packet records gates for an exact candidate
SHA, active quality findings, freshness, blind spots, and a rollback boundary.
It intentionally leaves the current metadata as `unreleased` and
`unavailable`. An internal maintainer checklist also names versioning, a
changelog, an immutable tag, a rollback target, and a rehearsal, but it is a
human checklist rather than a semantic contract.

The final paragraph of this ADR originally kept that human checklist in the
public repository. ADR-0049 supersedes that publication choice: the checklist
was maintainer-only operational material and is no longer a repository or
Pages source. The machine-readable contract and the dated evidence records
remain the public, reviewable boundary.

This leaves a professional-looking failure mode: arbitrary non-empty version
and rollback strings satisfy the release-evidence schema, while a changelog,
tag target, reviewed candidate SHA, or rehearsal record may not exist. Adding
empty release files would make the repository look more complete without
making recovery possible.

Quality findings Q-008, Q-009, and Q-010 remain navigation, teaching-depth,
and field-case work. They can block `production-ready` under the existing
quality policy, but they are not substitutes for release operations. Q-011 is
the direct release gap and remains unresolved.

## Decision

1. Add `docs/governance/release-readiness.yaml` as the canonical operational
   readiness record for version, changelog, release tag, reviewed release
   evidence, rollback rehearsal, and maintenance policy.
2. Record missing evidence explicitly. The current decision is `not_ready`;
   there is no selected version, changelog, reviewed tag, accepted release
   packet, rollback target, or rehearsal record.
3. Add `scripts/validate_release_readiness.py`. A `ready` decision requires all
   six dimensions, no known gaps, matching declared version and tag, matching
   tag and evidence SHAs, existing referenced files, and a tag that resolves in
   the current Git checkout.
4. Add negative fixtures proving that an unsupported `ready` decision, an
   invented reviewed tag, a missing rehearsal record, and tag/evidence SHA
   disagreement fail.
5. Run the validator and fixtures inside commit-bound release evidence. The
   resulting green gate proves the record is honest and internally consistent;
   while its decision is `not_ready`, it does not prove release readiness.
6. Keep the evidence packet as exact-run output. It does not duplicate or
   replace the readiness decision. The former repository checklist is removed
   under ADR-0049; public contributors should use the readiness and evidence
   contracts instead.

## Alternatives considered

### Create a CHANGELOG and version immediately

Rejected. A file and number selected only to satisfy appearance would not have
a reviewed release scope, tag, evidence packet, or rollback rehearsal.

### Treat the latest successful CI commit as a rollback target

Rejected. A green candidate is not necessarily a reviewed release, and a
commit identifier alone does not establish that restoration was attempted or
that hosted and repository state can be recovered.

### Put all release state in the human checklist

Rejected. Checkboxes cannot enforce tag existence, SHA agreement, referenced
records, or contradictory readiness claims.

### Close Q-011 when the new validator passes

Rejected. The validator currently proves that required operational evidence is
missing and represented honestly. Q-011 needs the actual version decision,
reviewed tag and evidence, and rollback rehearsal.

## Consequences

- Release operations have one inspectable state instead of being inferred from
  prose and placeholder strings.
- A future maintainer cannot declare `ready` while leaving an operational
  dimension pending or pointing to a nonexistent local record.
- CI needs the relevant Git tag in its checkout when a reviewed tag is
  declared; the workflow checkout policy must be adjusted and verified at that
  time if tags are not available.
- Q-011 moves from an unstructured absence to an actively gated gap, but stays
  unresolved.
- Q-008, Q-009, and Q-010 retain their existing scopes and statuses; this ADR
  provides no title map, chapter-depth evidence, or additional field-case
  reproduction.

## Evidence boundary

A passing validator proves that the readiness record follows the declared
schema and does not make the tested contradictory claims. In the current
`not_ready` state, it proves only that missing evidence is explicit.

It does not create a changelog, select a version, review or sign a tag, accept a
workflow artifact, rehearse rollback, restore a hosted site, prove maintenance
capacity, or make the project releasable.
