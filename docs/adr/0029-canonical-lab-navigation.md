# ADR-0029: Generate all Lab footers from one catalog order

## Status

Accepted

## Date

2026-08-13

## Context

The project has 18 canonical English Labs, but only a few had adjacent links.
Those links were hand-written, used chapter markers, disagreed on navigation
labels, and sometimes added a special index link. Readers could finish a Lab
without a reliable route to the next exercise, while maintainers had no check
that all Lab identities appeared exactly once.

The learning path cannot safely double as a linear Lab order. It records
capability progression: Labs can first appear at different levels, be reused
with stronger evidence, or remain supporting practice. A browsing sequence is
useful, but it must not imply prerequisites, required completion, or mastery.

## Decision

1. Keep `docs/governance/lab-navigation.yaml` as the ordered catalog of the 18
   canonical English Lab sources.
2. Generate one footer in every source with
   `scripts/build_lab_navigation.py`, replacing only the marked Lab block and
   migrating the small set of legacy hand-written blocks.
3. The first Lab exposes only Next, middle Labs expose Previous and Next, and
   the last Lab exposes only Previous. `book/labs/README-EN.md` remains the
   complete index.
4. Validate identity, numbering, exact H1, complete English-source coverage,
   unique paths, footer cardinality, and resolved adjacent targets.
5. Keep level placement and evidence gates in `learning-path.yaml`; keep locale
   identity and translation state in `locale-matrix.yaml`.

## Alternatives considered

### Keep writing links by hand

Rejected. The partial implementation already drifted in marker names, labels,
and index behavior, and it offered no complete-coverage check.

### Infer order from filenames

Rejected. Filenames happen to be numbered today but do not state the editorial
meaning or the boundary between browsing order and learning progression.

### Use the learning path as the order

Rejected. Its primary and supporting relations are not a flat sequence, and a
reused Lab can have more than one level-specific contract.

### Generate navigation for incomplete translations

Rejected for this decision. Silent fallback would overstate localization
completeness. A future localized Lab navigation adapter must consume the
locale matrix and expose missing translations explicitly.

## Consequences

- Every English Lab has predictable adjacent navigation in GitHub Markdown and
  the Reader without requiring JavaScript.
- A reorder starts in one machine-readable file and becomes a stale-output
  failure until regenerated.
- Catalog continuity improves without changing any Lab's maturity, run status,
  level relation, or graduation requirement.
- Localized Lab navigation remains incomplete and must not be described as
  delivered by this change.

## Evidence boundary

The generator, validator, fixtures, local-link check, and Reader inspection can
prove structural continuity for the declared sources. They do not prove that
a learner ran a Lab, understood it, retained it, transferred it, or followed
the catalog in numerical order.
