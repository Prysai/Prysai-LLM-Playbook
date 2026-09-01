# ADR-0051: Isolate post-merge publication concurrency

## Status

Accepted. This decision changes workflow scheduling only; it does not remove
the protected Docs environment review or promote any content maturity status.

## Date

2026-08-31

## Context

The Pages workflow runs after a push to `main`, which includes a pull request
merge. One workflow run builds a bounded artifact and publishes it to the
GitHub Pages environment, the optional Hugging Face Space, and the separate
`docs.prysai.com` host. The Docs host is protected by the
`docs-prysai-production` environment and a required `uuzzrm` reviewer.

The workflow previously used one workflow-wide `pages` concurrency group.
When the Docs job waited for that environment review, the waiting run held the
same group as the build and Pages/Hugging Face work. Later merges therefore
queued behind an external approval even when the independent publication jobs
could have completed.

## Decision

1. Run the workflow on every push to `main`, without a content-path filter, so
   a merged pull request always creates a fresh candidate and publication
   attempt. `workflow_dispatch` remains available for an explicit retry.
2. Keep the build concurrency group separate and cancel superseded builds for
   the same ref. The newest main candidate is the only build that needs to
   continue.
3. Download the validated `pages-candidate-${{ github.sha }}` artifact in a
   dedicated Hugging Face job. Its token is limited to `actions: read`, and its
   concurrency group is independent of Pages and Docs.
4. Keep GitHub Pages in its own serialized deployment group. Keep Hugging Face
   in its own serialized publication group so a provider upload is not
   canceled mid-mutation. Keep Docs publication and its public-byte verifier
   in one protected `docs-prysai-production` job. The build job supplies the
   verifier as a separate, non-public artifact, so the secret-bearing job does
   not check out or execute repository source while it publishes and then
   verifies the same Pages candidate.
5. Treat the GitHub repository UI as a direct view of `main`; it needs no
   separate deployment job. `prysai.com` is a separately owned public host and
   is not changed by this workflow.

## Alternatives considered

### Keep one workflow-wide group

Rejected: an environment approval on one surface blocks unrelated publication
jobs and makes every later merge appear stale.

### Remove Docs environment protection

Rejected: the required reviewer and branch policy are the host-side safety
boundary for a secret-bearing external deployment.

### Rebuild independently for each host

Rejected: separate builds could publish different bytes. Every host consumes
the one validated Pages candidate artifact instead.

## Consequences

- Every merge to `main` triggers a workflow run, including merges that do not
  change reader-facing files.
- Pages and Hugging Face can finish while Docs waits for its required review.
- A newer build supersedes an older in-progress build; each external
  publication group remains serialized so an approved transfer or provider
  upload is not interrupted mid-mutation. Docs verification runs immediately
  after its publish step in the same protected job, avoiding cross-workflow
  ordering races between a verifier and a newer publication.
- A successful workflow still does not prove that the external host is serving
  the candidate until the post-publish public verifier succeeds.

## Evidence boundary

- [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
- [`docs/governance/repository-security-policy.yaml`](../governance/repository-security-policy.yaml)
- [`docs/adr/0045-deploy-only-validated-pages-artifact.md`](0045-deploy-only-validated-pages-artifact.md)
- [`docs/adr/0048-post-publish-public-artifact-check.md`](0048-post-publish-public-artifact-check.md)
- [GitHub Actions concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [`workflow_run` security boundary](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run)

## Source record

| Source | Accessed | Scope | Owner | Next review |
| --- | --- | --- | --- | --- |
| [GitHub Actions concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency) | 2026-08-31 | Job and workflow concurrency groups, pending-run behavior, and cancellation semantics | governance-maintainer | 2026-09-30 |
| [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-actions) | 2026-08-31 | Pages artifact deployment workflow and deployment action boundary | governance-maintainer | 2026-09-30 |
| [`workflow_run` security boundary](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run) | 2026-08-31 | Trusted workflow event and default-branch execution considerations | governance-maintainer | 2026-09-30 |
