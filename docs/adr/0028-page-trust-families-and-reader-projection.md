# ADR-0028: Extend Page Trust by family and project it in the Reader

## Status

Accepted

## Date

2026-08-13

## Context

Page Trust v2 covered the 22 canonical English chapters. The public curriculum
also links a guide, 18 Labs, and two application routes, but readers could not
see their status, scope, review window, or known limitation. Copying identical
owner and review metadata into every Lab record would make routine maintenance
a shotgun edit.

## Decision

Page Trust schema v3 preserves the original 22/22 chapter invariant and adds
three independently counted families: guides, Labs, and application routes.
Each family owns defaults for only `canonical_locale`, `owner`, `reviewed_at`,
`next_review`, and `reuse_boundary`. A record may override only those fields.
Identity, path, status, fact risk, curriculum scope, platforms, concepts,
applicability, sources, and limitations remain explicit per page and are
validator-enforced.

The Reader may show one restrained Trust record containing status and scope,
next review, and one declared limitation. It consumes effective values in this
order: family defaults, record overrides, record fields. A missing record hides
the card; a registry request or parse failure shows `unavailable` so absence and
data failure are not confused.

## Alternatives considered

- Duplicate all family metadata on every page: rejected because review-window
  changes would require repeated edits with no page-specific meaning.
- Replace chapter records with family records: rejected because it would weaken
  the existing 22/22 canonical chapter contract.
- Keep Trust governance-only: rejected because readers would continue seeing
  maturity language without the page's review date or stated limitation.

## Consequences

- The registry and Reader share a small inheritance contract that must be tested
  together whenever schema fields change.
- Family counts do not add to or redefine the 22 canonical chapter count.
- Public visibility improves inspectability but does not promote any page,
  validate source semantics, or establish runtime and learner outcomes.
- The current mobile and desktop Reader render remains a candidate local-browser
  observation; publication still follows the release-readiness contract.

## Evidence boundary

The registry validator and negative fixtures establish schema, identity, path,
default/override, and declared-field consistency. The scoped browser review
establishes one local Reader rendering. Neither proves freshness after the
review date, license compatibility, translation quality, accessibility across
assistive technology, user trust, public deployment, or production readiness.
