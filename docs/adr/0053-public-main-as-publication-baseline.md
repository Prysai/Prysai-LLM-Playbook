# ADR-0053: Use public `main` as the publication baseline

## Status

Accepted. This decision defines the evidence boundary for maintenance and
publication claims. It does not promote the curriculum beyond `candidate` and
does not authorize a deployment.

## Date

2026-09-09

## Context

The repository has several kinds of state that are easy to confuse:

- the public `main` branch and its completed checks;
- a local checkout with uncommitted work;
- isolated candidate branches and worktrees; and
- the bytes currently served by each public host.

Those states are not interchangeable. During this review, public `main` was
`196b1a71b16e03d5171c74e93af0af8779b61d9e`, while the shared local checkout
was the dirty branch `uuzzrm/native-copy-polish-20260828` at
`52717e2002082332758d74ca5e42d41762351527`. The local checkout was 229
commits behind and 57 commits ahead of public `main` in the reviewed graph,
and it contained uncommitted changes. Treating that checkout as the release
source would make it difficult to tell which content had actually reached the
public repository.

The project also publishes through separate surfaces. A successful workflow
job proves the named job's work, not that every public origin serves the same
bytes. The Docs host has a post-publish byte verifier; the Hugging Face and
GitHub Pages surfaces have their own publication boundaries and should remain
separate observations.

## Decision

1. The full SHA of public `main` is the only default baseline for a claim about
   the public repository or a release candidate. A local branch may be a
   development candidate, but it must be named as such.
2. Candidate work that can affect publication starts from a clean isolated
   worktree based on the current public `main`. The shared dirty checkout is
   preserved as user work and is not a publication or release-evidence source.
3. Maintenance reports separate four evidence layers:
   - source state: commit, diff, and working-tree cleanliness;
   - engineering state: named validators, tests, security checks, and Actions
     conclusions;
   - artifact state: the bounded site or release artifact built from the
     candidate commit; and
   - public state: the URL, host, route set, browser observation, or exact
     bytes that were actually checked.
4. A generated file is a projection. Maintainers edit its canonical source,
   regenerate the projection, and report both checks separately.
5. Branch and worktree cleanup requires an explicit inventory and mapping
   first. This ADR does not authorize deleting branches, worktrees, or user
   files merely because they are old or unreferenced.

## Alternatives considered

### Use the newest local checkout

Rejected: a dirty checkout can contain work that is not in the public branch,
untracked audit output, or changes from unrelated tasks. It is useful for
development and diagnosis, but it is not a stable publication baseline.

### Use the latest candidate branch as the public baseline

Rejected: a candidate branch has not reached the protected public branch until
the required review and checks have completed. It must be reported as a
candidate SHA and not as public state.

### Treat a green workflow as proof of deployment

Rejected: workflow success is scoped to the jobs and artifacts named by that
run. A public origin still requires an independent reachability, route, or
byte check, depending on the claim.

## Consequences

- Future maintenance reports can identify one reproducible public baseline
  without discarding local work.
- A PR can be reviewed against a clean parent and can state exactly which
  evidence layer it reached.
- Publication records may contain several honest outcomes: CI passed, an
  artifact was built, one host was synchronized, another host was not checked,
  or a public byte comparison is still pending.
- Branch and worktree cleanup remains a separate, deliberate operation with
  its own inventory and authorization.

## Evidence boundary

This decision improves state attribution. It does not establish learner
outcomes, translation quality, model quality, security completeness, public
indexing, or production readiness. The current project remains `candidate`,
and the core route and learner evidence remain `not_run` where the status
records say so.

## Source record

| Source | Accessed | Scope | Owner | Next review |
| --- | --- | --- | --- | --- |
| [Public repository commit](https://github.com/Prysai/Prysai-LLM-Playbook/commit/196b1a71b16e03d5171c74e93af0af8779b61d9e) | 2026-09-09 | Public `main` baseline and merged content state | release-maintainer | 2026-10-09 |
| [Quality workflow run](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34354663990) | 2026-09-09 | Candidate evidence and release-evidence gate for the baseline commit | release-maintainer | 2026-10-09 |
| [Security workflow run](https://github.com/Prysai/Prysai-LLM-Playbook/actions/runs/34354663945) | 2026-09-09 | Repository-security workflow for the baseline commit | governance-maintainer | 2026-10-09 |
| [Repository ruleset](https://github.com/Prysai/Prysai-LLM-Playbook/rules/20903386) | 2026-09-09 | Required signatures, review, status checks, CodeQL, code quality, and thread resolution | governance-maintainer | 2026-10-09 |
| [GitHub Actions concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency) | 2026-09-09 | Publication job concurrency and cancellation boundary | release-maintainer | 2026-10-09 |
| [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-actions) | 2026-09-09 | Artifact-based Pages publication boundary | site-maintainer | 2026-10-09 |

No external prose, code, image, or other asset was adapted for this ADR. The
repository's existing license and source-register boundaries remain in force.
