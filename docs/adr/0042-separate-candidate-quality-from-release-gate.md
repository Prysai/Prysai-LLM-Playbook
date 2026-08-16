# ADR-0042: Separate candidate quality from formal release gating

## Status

Accepted.

## Date

2026-08-15

## Context

The quality workflow runs the complete commit-bound evidence matrix on every
ordinary `main` push and most pull requests. Its packet builder deliberately
returns a passing process result when the tested commands pass and derives a
candidate decision such as `candidate` or `not_ready`; it returns non-zero only
when a matrix gate is blocked.

The previous workflow discarded that distinction. It ran the packet with
`continue-on-error` and then failed the whole Quality check whenever the packet
step was not successful. Since `release-readiness.yaml` honestly declares this
unpublished project `not_ready`, normal documentation and translation changes
appeared as failed quality checks even when their structure, security, content,
and browser gates passed.

ADR-0021 and ADR-0026 require an exact, operational release decision. They do
not say that an honest candidate must look like a failed build.

## Decision

1. The normal `quality.yml` workflow remains the complete candidate-evidence
   matrix. It uploads and summarizes the packet, including its explicit
   `not_ready` decision, but does not turn that decision into a generic quality
   failure.
2. Add `release-gate.yml`, a manual workflow requiring an exact reviewed
   candidate SHA. It checks out that SHA with full history and runs the same
   evidence builder without `continue-on-error`; a missing tag, accepted packet,
   rollback target, rehearsal, or any other release evidence therefore fails
   the formal gate.
3. Both workflows retain read-only repository permissions, SHA-pinned Actions,
   non-persisted checkout credentials, generated evidence artifacts, and a
   human-readable summary.
4. A candidate-quality success must be described as named checks passing on one
   candidate SHA. It is never a release, tag, deployment, learner outcome, or
   production-readiness claim.

## Alternatives considered

### Keep failing Quality until the first release

Rejected. It makes an honest operational gap indistinguishable from a broken
translation, unsafe dependency, failed browser check, or regression. Reviewers
cannot prioritize the actual problem from a permanently red status.

### Remove release evidence from ordinary CI

Rejected. Candidate packets remain valuable records of the exact checks and
blind spots for a commit. Removing them would reduce traceability.

### Make every main push a release attempt

Rejected. A release requires explicit version, review, tag, rollback, and
approval decisions. Routine editorial changes are not implicit releases.

## Consequences

- Main and pull-request Quality results become interpretable: red means one of
  the candidate matrix gates failed; an explicit packet still records whether
  release operations are ready.
- Formal-release enforcement remains stricter, not weaker: it has its own
  manual entry point and fails until the operational record is genuinely ready.
- A future host Ruleset may require candidate Quality and the manual gate as
  separate checks, but this repository does not claim that host-side enforcement
  is configured today.

## Evidence boundary

A green candidate Quality run proves only its named candidate checks passed and
the generated packet was produced for that commit. A green formal gate proves
only the declared release-evidence contract passed for its reviewed SHA.

Neither result proves public deployment, rollback success in a hosted system,
translation fluency, learner outcomes, model reliability, security against all
threats, adoption, or popularity.
