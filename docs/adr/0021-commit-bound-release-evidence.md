# ADR-0021: Generate commit-bound release evidence in CI

## Status

Accepted

## Date

2026-08-12

## Context

The repository has many focused validators and a machine-readable quality
ledger, but a maintainer still has to combine their outputs manually. A green
workflow does not state the exact release decision, active blockers, source
freshness, rollback boundary, or known blind spots in one reviewable artifact.

Committing a generated packet that claims to describe `HEAD` would be
self-referential: adding the packet changes the commit SHA, so its recorded SHA
would immediately be stale. A packet generated before the commit would instead
describe the parent tree while appearing current.

## Decision

1. Store the stable evidence schema, command matrix, release metadata, and
   blind spots in `docs/governance/release-evidence.yaml`.
2. Use `scripts/build_release_evidence.py --check` to validate that checked-in
   contract without running the full suite.
3. In CI, run the command matrix against the actual `GITHUB_SHA`, preserve one
   log per command, and generate `release-evidence.json` plus
   `release-evidence.md` as workflow artifacts.
4. Upload the packet even when a gate fails, so failure evidence is not lost.
5. Derive `blocked` when any named gate fails. When all named static gates pass,
   retain the maturity declared by `content-status.yaml`; static success cannot
   promote `candidate` to `verified`.
6. Keep active quality findings, overdue review dates, unavailable rollback
   metadata, and untested surfaces visible in every packet.

## Alternatives considered

### Commit a current release report

Rejected. A report containing the current commit SHA cannot be committed into
that same commit without becoming stale. Removing the SHA would lose the most
important identity boundary.

### Treat the GitHub Actions check page as the evidence packet

Rejected. It is tied to a commit, but it does not combine release policy,
quality blockers, freshness, rollback state, and blind spots into a portable
record.

### Record every local validation result in governance YAML

Rejected. Local results are environment- and time-specific. Writing them into
the stable contract would create noisy hand-edited claims and invite stale
evidence.

### Promote maturity when all static commands pass

Rejected. Static consistency does not establish lab execution, evaluation
results, translation review, learner outcomes, deployment, accessibility, or
production readiness.

## Consequences

- Every CI run can preserve a portable report tied to its exact candidate SHA.
- Gate scope and blind spots become explicit instead of being inferred from a
  long workflow file.
- Failed runs still provide structured diagnostics and command logs.
- The repository does not contain a misleading pseudo-current evidence file.
- Release metadata remains honestly `unreleased` with no rollback target until
  a reviewed release tag and rollback decision exist.

## Evidence boundary

The packet proves that the named commands produced the recorded exit codes for
one commit in one runner environment. It does not prove broader runtime,
learning, translation, accessibility, deployment, security, or user outcomes.
