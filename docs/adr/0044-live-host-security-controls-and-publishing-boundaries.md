# ADR-0044: Bind live host security controls to publishing boundaries

## Status

Accepted. The repository security policy remains `candidate`; host settings are
evidence about the observed GitHub configuration, not a security certification.

## Date

2026-08-18

## Context

The repository contains a static reader and GitHub Actions publishing paths.
The local security gate already checked content, workflow syntax, and secret
shapes, but it did not enforce two important boundaries: every checkout had to
disable persisted credentials, and a manually dispatched workflow using a
secret had to prove that it was operating on `main`. The live GitHub API also
showed that host controls had changed since the earlier policy record: the
repository Ruleset was active, Secret Scanning and Push Protection were
enabled, Actions SHA pinning was enabled, and non-provider pattern scanning
remained disabled.

## Decision

1. Require `persist-credentials: false` on every `actions/checkout` step.
2. Require manually dispatched workflows that use secrets to guard the secret
   path with `github.ref == 'refs/heads/main'`.
3. Keep deployment jobs and their environment permissions separate from the
   read-only build job; a workflow dispatch may build, but it may publish only
   on the reviewed `main` ref.
4. Scan every candidate text file up to a bounded 25 MiB limit and fail closed
   when a larger text file needs an explicit review, rather than silently
   skipping it. This covers the current 5.2 MiB generated search index.
5. Record live host settings with their bypasses and disabled controls. Do not
   infer host enforcement from a green workflow.

## Alternatives considered

### Keep the old private-plan Ruleset record

Rejected. The authenticated API showed a public repository with an active
Ruleset. Retaining the old statement would make the security report stale and
would hide the current always-bypass actor.

### Allow manual dispatch to publish any checked-out ref

Rejected. A secret-bearing deployment path must not be reachable merely by
selecting an arbitrary commit or branch in a workflow dispatch.

### Skip large generated files

Rejected. Generated files can contain embedded URLs, paths, or credentials.
The bounded limit is high enough for the current artifact and fails closed
above the limit.

## Consequences

- A future workflow must declare its checkout credential boundary explicitly.
- Manual release testing on a non-`main` ref can still build review artifacts,
  but it cannot use the publishing secret path.
- The repository keeps a deterministic local detector even though GitHub's
  non-provider pattern scanning is disabled.
- The active Ruleset's always-bypass role remains a material host-side limit
  and must be reviewed before a stronger release claim.

## Evidence boundary

- [`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
- [`scripts/test_validate_repository_security.py`](../../scripts/test_validate_repository_security.py)
- [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml)
- [`docs/security/sensitive-information-audit-2026-08-18.md`](../security/sensitive-information-audit-2026-08-18.md)
