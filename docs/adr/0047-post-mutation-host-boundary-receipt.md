# ADR-0047: Record the post-mutation host boundary receipt

## Status

Accepted. This ADR supersedes the current-state host observation from
ADR-0044; ADR-0044 remains the historical record of the earlier bypass
configuration and the decisions made under it.

## Date

2026-08-18

## Context

The repository security audit recorded the GitHub Ruleset and deployment
environment before a final host-side mutation. That historical record was
accurate for the change window but became stale after the permanent bypass
actor was removed. The current host state must be recorded separately from the
pre-mutation evidence, and the repository must continue to distinguish host
settings from repository-file guarantees.

## Decision

1. Treat Ruleset `20903386` as active with an empty bypass-actor list. Its
   deletion, non-fast-forward, required-signature, CodeQL, code-quality, and
   pull-request rules remain enabled.
2. Treat `docs-prysai-production` as a protected deployment environment with a
   required `uuzzrm` reviewer, `can_admins_bypass: false`, and a custom branch
   policy whose only allowed branch is `main`.
3. Keep GitHub non-provider Secret Scanning patterns recorded as disabled after
   the authenticated enable request returned `disabled`. The repository-local
   detector and its focused fixtures remain the compensating control.
4. Recheck these host settings before each release. They are evidence receipts,
   not versioned enforcement and not a security certification.
5. Keep the Pages workflow on full-SHA Action pins and update the known legacy
   Node.js 20 Action pins to the Node.js 24-based releases used by the current
   workflow. The local security gate rejects those legacy pins in future diffs.

## Alternatives considered

### Keep the pre-mutation bypass observation as current state

Rejected. It would make the repository's current security documentation claim a
bypass still exists after the live API showed an empty list.

### Claim GitHub non-provider scanning is enabled

Rejected. The authenticated API continued to report `disabled`; a local
detector cannot be presented as a hosted GitHub feature.

### Treat the deployment environment as repository-only protection

Rejected. Reviewer requirements and branch policies are host-side settings and
can drift independently of workflow files.

## Consequences

- Ordinary writes are expected to use the protected review path, subject to
  future host drift.
- Docs publication requires a reviewer approval and the `main` branch policy;
  the workflow still consumes only the validated Pages artifact.
- The security report can cite both the historical pre-mutation observation
  and the current post-mutation receipt without conflating them.
- The local security gate now has 43 focused fixtures and blocks the known
  legacy Node.js 20 Action pins.

## Evidence boundary

- [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml)
- [`SECURITY.md`](../../SECURITY.md)
- [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- [`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
- [`scripts/test_validate_repository_security.py`](../../scripts/test_validate_repository_security.py)
- [`docs/security/sensitive-information-audit-2026-08-18.md`](../security/sensitive-information-audit-2026-08-18.md)
- [Successful Pages/Docs run 32197540773](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/32197540773)
