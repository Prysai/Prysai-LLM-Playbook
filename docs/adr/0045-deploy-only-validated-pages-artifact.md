# ADR-0045: Deploy only the validated Pages artifact

## Status

Accepted. The repository security policy remains `candidate`; this decision
narrows the deployment job's code and credential boundary but does not certify
the external deployment host.

## Date

2026-08-18

## Context

The Pages workflow builds and validates one bounded static artifact in its
read-only `build` job, then publishes GitHub Pages and Docs from downstream
jobs. The Docs deployment job also checked out the repository, installed the
runtime, and rebuilt the artifact while its environment exposed
`DOCS_DEPLOY_SSH_KEY`. That duplicated build authority inside a secret-bearing
job and made the deployment key job's execution surface larger than necessary.

## Decision

The Docs deployment job downloads the `pages-candidate-${{ github.sha }}`
artifact produced by the required `build` job and publishes that artifact
without checking out source code or running the repository's build scripts.
Its job token is limited to `actions: read`, and the artifact action is pinned
to a full commit SHA. The artifact remains the single validated input for both
publishing paths.

## Alternatives considered

### Rebuild inside the Docs deployment job

Rejected. Rebuilding beside a deployment secret duplicates code execution and
could make the published bytes differ from the artifact already validated by
the build job.

### Upload a second Docs-specific artifact

Rejected. A second artifact would create another publication source and weaken
the single-artifact integrity boundary without providing a user-visible
benefit.

### Pass the repository checkout into the deployment job

Rejected. The deployment job needs static bytes, not repository history or
build tooling; source checkout and dependency execution should remain outside
the secret-bearing job.

## Consequences

- The Docs job depends on the build job's named artifact and cannot publish if
  that artifact is missing.
- The Docs secret-bearing job has no repository checkout or Python setup.
- Artifact download is a read-only Actions API operation, while the SSH key
  remains available only to the final deployment steps.
- The external Docs environment still needs an explicit protected-branch and
  approval policy in GitHub; that host-side setting is outside this commit.

## Evidence boundary

- [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- [`docs/adr/0016-github-pages-artifact-boundary.md`](0016-github-pages-artifact-boundary.md)
- [`docs/adr/0044-live-host-security-controls-and-publishing-boundaries.md`](0044-live-host-security-controls-and-publishing-boundaries.md)
- [`scripts/build_pages_artifact.py`](../../scripts/build_pages_artifact.py)
