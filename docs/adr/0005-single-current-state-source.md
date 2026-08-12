# ADR-0005: Use one machine-readable current-state source

## Status

Accepted

## Date

2026-08-09

## Context

The project has several maintained surfaces: 22 chapters, 17 labs, 7 Skills,
38 evaluation tasks across 15 tracks, a bilingual public site, and source and
license records. Their counts and maturity states are repeated in indexes,
quality reports, and page copy. Repetition makes it easy for an old review
snapshot to look like the current state.

## Decision

Maintain `docs/governance/content-status.yaml` as the single current-state
source for counts, artifact status, run status, review status, owners, review
dates, and evidence paths. Validate it with
`scripts/validate_content_status.py` and run that validator in local checks and
continuous integration.

Historical quality reports remain immutable evidence. They may describe the
state observed at their review date, but current pages and maintenance work
must link to a current-state review and the status source.

## Alternatives considered

### Keep counts in each page and report

Rejected: duplicated numbers drift, and a reader cannot tell which copy is
current without manually comparing every file.

### Generate the status file from every content file

Rejected for now: generation could derive counts and paths, but maturity,
run, license, and review states require human evidence and should not be
inferred from file presence alone.

### Use only a prose current-state report

Rejected: prose is useful for interpretation, but a validator needs stable
fields and paths to catch omissions before publication.

## Consequences

- Maintainers update the status source in the same change as a count or status change.
- The validator catches missing items, stale paths, invalid dates, and unsafe status upgrades.
- The source deliberately keeps `draft`, `candidate`, `verified`, and `production-ready` separate from fact statuses.
- The file is a maintenance contract, not evidence that labs, evaluations, or browser behavior have run.
