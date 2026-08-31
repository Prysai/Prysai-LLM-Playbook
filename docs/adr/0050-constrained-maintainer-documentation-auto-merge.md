# ADR-0050: Constrain maintainer documentation auto-merge

## Status

Proposed

## Date

2026-08-30

## Context

The project needs a low-friction route for a trusted maintainer to publish
small documentation corrections without turning every pull request into an
unreviewed write path. The repository is public, its pull-request workflows
process contributor-controlled content, and the active GitHub Ruleset requires
an approving review, resolved review threads, signed commits, CodeQL, and code
quality checks. The repository also needs a read-only pull-request contract to
make the objective PR-body and DCO intake repeatable. The host Ruleset now
requires the candidate-evidence, repository-security, and pull-request-contract
checks against the latest base code.

The accounts `uuzzrm` and `Prysai-Lab` are the explicitly designated authors
for this route. A live GitHub API check on 2026-08-30 reported both accounts as
active administrators of the `Prysai` organization. That observation is used
to justify the current explicit entries, not to create a dynamic role-based
rule: a future membership or permission change must not silently expand an
automated write capability.

## Decision

Add `.github/workflows/maintainer-pr-automerge.yml` as a trusted
`workflow_run` workflow. It runs after the named quality, security, and
pull-request contract workflows complete, uses the default-branch workflow
definition, and does not check out or execute the pull-request ref.

The workflow may act only when all of the following are true:

1. the exact head SHA belongs to one open, non-draft PR into `main`;
2. the PR author is `uuzzrm` or `Prysai-Lab`, and the source repository is the
   main repository, the `uuzzrm` fork, or the `Prysai-Lab` fork;
3. a new PR title starts with `[maintainer-doc]` and its body contains the
   repository's complete disclosure headings. PRs created before the #66
   rollout cutoff (`2026-08-31T00:14:52Z`) use a one-time migration path for
   historical metadata, require a valid GitHub cryptographic signature on
   every commit, and require an existing maintainer approval for the exact
   current head SHA;
4. every changed path is an added or modified regular Markdown file under
   `book/`, with no deletion, rename, symlink, traversal-shaped segment, or
   more than 25 files or 1,500 changed lines; and
5. the quality, security, and pull-request contract workflows completed
   successfully for that exact SHA.

After the eligibility checks, the workflow submits a clearly labeled bot
approval if the current head lacks one, re-reads the PR to confirm that the
identity and exact head SHA have not changed, then requests GitHub's native
Squash Auto-merge. The active Ruleset continues to decide whether the PR can
merge. The bot approval is a workflow signal, not independent human review.
The workflow does not use an admin bypass or issue a direct merge. If the PR
changes between these API calls, stale-review dismissal and the Ruleset's
required checks remain the final merge gates.

The workflow declares only `actions: read`, `contents: write`, and
`pull-requests: write`. Its third-party Actions are pinned to full commit SHAs
and their source/license decisions are recorded in the asset register.

## Alternatives considered

### Use `pull_request_target` with write permissions

Rejected. A write-capable workflow sharing a trust boundary with
contributor-controlled pull-request content would make a workflow or checkout
mistake materially more dangerous. The trusted `workflow_run` route keeps the
write job separate and executes only repository-owned JavaScript in the
workflow step; it still rechecks the untrusted PR metadata and diff through the
GitHub API.

### Infer eligibility from organization-admin status

Rejected. Roles can change independently of this repository and a dynamic role
check would widen the author set without a reviewed repository change. The
current two explicit entries are a reviewed snapshot; add another specific
login through a separate security review if the project later needs another
trusted author.

### Merge directly with an admin bypass

Rejected. It would bypass the Ruleset instead of allowing GitHub to evaluate
required checks, signatures, threads, and review state. Native auto-merge keeps
the final merge decision with the host's configured protections.

### Run a broad autonomous review bot

Rejected for this first route. A general bot would need a larger content,
dependency, permission, and failure model. The current route is deliberately
limited to small book Markdown changes; non-allowlisted work remains manual.

## Consequences

- Eligible new `uuzzrm` and `Prysai-Lab` documentation PRs can receive the bot
  signal and wait in native Squash Auto-merge after all three required
  workflows pass. Existing PRs from before the rollout can use the one-time
  migration path only when a maintainer has already approved their current
  head; this avoids retroactively rewriting historical PR bodies and commits.
- A PR title opt-in, disclosure headings, exact SHA checks, file allowlist, and
  size limits reduce accidental enrollment but do not replace human judgment.
- Workflow, security, script, dependency, release, site, asset, deletion,
  rename, symlink, and other non-allowlisted changes remain on the manual
  review path, including this configuration change.
- The workflow can be rolled back by reverting or removing this file through
  the protected review path. Existing auto-merge requests must be inspected
  separately; reverting the workflow does not rewrite Git history or undo a
  merge that already happened.

## Evidence boundary

This ADR records a proposed repository design. Local static validation and
fixture tests establish only the declared source contract. The migration path
was added after the #66 rollout was observed to block pre-existing PRs. It
requires a valid GitHub cryptographic signature on every historical commit but
does not certify missing DCO trailers or rewrite commit messages. It has
not yet been runtime-tested from `main` against the full set of open PRs, and
the new strict path has not yet been validated by a newly created eligible PR.
Live GitHub settings may drift and must be rechecked before treating the route
as production-ready.

## Sources

- [GitHub: Events that trigger workflows — `workflow_run`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_run)
- [GitHub: Workflow syntax — `permissions`](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#permissions)
- [GitHub: Automatically merging a pull request](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/automatically-merging-a-pull-request)
- [GitHub: Approving a pull request with required reviews](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
- [GitHub: Managing auto-merge for pull requests](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository)
