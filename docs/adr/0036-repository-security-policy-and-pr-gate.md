# ADR-0036: Add a read-only repository security policy and PR gate

## Status

Accepted. This decision adds a candidate static policy; it does not enable a
GitHub Ruleset or branch protection.

## Date

2026-08-14

## Context

The project already has a source-aware contribution guide, a quality workflow
that runs on pull requests, SHA-pinned GitHub Actions, and Dependabot updates
for npm and Actions. It did not have a public private-disclosure path, one
machine-checkable repository-security policy, or a dedicated PR security gate.

The project processes untrusted files, external source material, and proposed
workflow changes. A check must therefore prevent common accidental regressions
without running with repository secrets, write permissions, approval powers,
or the authority to merge a pull request.

On 2026-08-14, the repository's official Settings > Rulesets screen allowed a
Ruleset to be drafted but stated that it would not be enforced on this private
organization repository until the organization upgraded to GitHub Team. A
local workflow cannot honestly claim to be enforced branch protection while
that host-side capability is unavailable.

## Decision

1. Publish `SECURITY.md` with a private-reporting route, data-minimization
   boundary, and honest response expectations.
2. Make `docs/governance/repository-security-policy.yaml` the canonical policy
   for PR automation, elevated review paths, first-party sources, and the
   current Ruleset blocker.
3. Require every workflow that evaluates a pull request to declare only
   `contents: read`, avoid persisted checkout credentials, and avoid
   `pull_request_target`, secrets, and write-scoped permissions. Run the
   dedicated `.github/workflows/security-policy.yml` on `pull_request` and
   pushes to `main` under the same read-only boundary.
4. Require all Actions to remain full-SHA pinned. The validator also checks for
   unsafe workflow pipes, credential-shaped tracked files, and common
   credential markers.
5. Add an explicit security-review section to the pull-request template.
6. Do not install a third-party bot that comments, approves, changes, or merges
   PRs. Dependabot remains the existing dependency-update bot; its PRs receive
   the same human review and checks as any other change.
7. Record the official `protect-main` Ruleset configuration as a planned
   host-side step: an empty default bypass list; pull requests with one human
   approval and resolved threads; observed successful checks; blocked force
   pushes; and restricted deletion. When enforcement becomes available,
   confirm exact status-check names from a successful run before saving it.

## Alternatives considered

### Use `pull_request_target` to obtain broader access

Rejected. The policy evaluates untrusted pull-request content. A read-only
`pull_request` workflow has a smaller credential and privilege boundary, and
the checks do not need write access, secrets, or automatic review comments.

### Add a third-party AI review bot immediately

Rejected. It would add an external supply-chain, permission, data-egress, and
review-authority decision before the project has a scoped policy or host-side
Ruleset enforcement. A deterministic local gate is smaller and auditable.

### Treat an enabled CI workflow as branch protection

Rejected. A green workflow can be ignored until a host-side Ruleset or branch
protection explicitly makes it required. The current account-plan blocker must
remain visible.

## Consequences

- Contributors receive a clear private-reporting route and an explicit
  security-review prompt in every PR.
- PRs and pushes to main gain a separate read-only static security check.
- The policy can detect only declared patterns. It cannot identify every
  secret, dependency vulnerability, account compromise, malicious maintainer,
  server-header gap, or runtime flaw.
- Maintainers must review high-risk paths manually and must not treat a passed
  workflow as an approval, merge authorization, or production-security claim.
- Future Ruleset activation requires a fresh host-side check, exact status
  names, and an explicit decision; it is not implied by this ADR.

## Sources and evidence boundary

The policy records three first-party GitHub documentation URLs, an access date,
owner, and next review in
[`repository-security-policy.yaml`](../governance/repository-security-policy.yaml).
This ADR records a repository policy and static gate, not a security audit or
security certification.
