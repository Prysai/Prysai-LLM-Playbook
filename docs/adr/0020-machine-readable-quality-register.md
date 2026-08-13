# ADR-0020: Make the quality register a machine-readable release contract

## Status

Accepted

## Date

2026-08-12

## Context

The project has many review reports and a current Markdown defect ledger. The
ledger names real P0, P1, and P2 gaps, but CI cannot verify its IDs, evidence
paths, resolution records, or relationship to the maturity declared in
`content-status.yaml`. A contributor could therefore mark the project
`verified` while the same register still contains active P0 release blockers.

Treating every known defect as an unconditional CI failure would create the
opposite problem: an honestly labeled `candidate` could never keep a visible
backlog on its main branch. The gate must validate truthfulness, not pretend
that unfinished work does not exist.

## Decision

1. Store the canonical defect ledger in
   `docs/governance/quality-register.yaml` as JSON-compatible YAML.
2. Generate `docs/quality/quality-register.md` for human review with
   `scripts/build_quality_register.py`.
3. Require stable IDs, controlled severity and status values, per-item owner,
   opened and next-review dates, explicit supersession, existing evidence
   paths, and a resolution scope for every resolved item.
4. Derive the release decision from the active defects and the canonical
   project maturity:
   - active P0 or P1 items prohibit `verified`;
   - any active P0, P1, or P2 item prohibits `production-ready`;
   - `draft` and `candidate` may retain visible active defects when their
     public status remains honest.
5. Run the generated-file and release-claim check in CI.

## Alternatives considered

### Keep the Markdown table as the only source

Rejected. It is easy to read but difficult to validate without inventing a
fragile Markdown parser, and it cannot safely drive release policy.

### Fail CI whenever any quality item is open

Rejected. A candidate curriculum needs a truthful, versioned backlog on its
main branch. The purpose of the gate is to stop maturity overclaiming, not to
hide known work on feature branches.

### Put all defect details inside `content-status.yaml`

Rejected. Artifact maturity and defect lifecycle are related but distinct
contracts with different fields, owners, and review workflows. The quality
register consumes project maturity instead of overloading it.

### Use GitHub Issues as the sole release source

Rejected for the current private, unpublished phase. Repository-local release
evidence must remain reviewable offline and travel with the curriculum. A
future issue synchronizer may project this source into GitHub without making
the network service canonical.

## Consequences

- Quality IDs and evidence paths become testable and reviewable in pull
  requests.
- The human ledger cannot silently drift from the machine release decision.
- A future maturity upgrade will fail until blocking defects are resolved with
  evidence.
- Maintainers must edit the governance source and regenerate the Markdown
  projection rather than hand-editing the table.
- The register still does not prove that a lab, evaluation, translation, or
  learner test succeeded; those artifacts must exist before an item is closed.

## Evidence boundary

The gate proves structural integrity of the defect ledger and consistency
between active blockers and the declared maturity. It does not prove product
quality by itself, and a green result must never be described as resolution of
the active defects.
