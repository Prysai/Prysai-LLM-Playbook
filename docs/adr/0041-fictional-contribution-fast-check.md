# ADR-0041: separate fictional contribution checks from full release evidence

## Status

Accepted.

## Date

2026-08-15

## Context

The contribution protocol allows a deliberately narrow public PR route for
original fictional fixtures, deterministic validators, and text-only protocols.
The normal quality workflow produces a full commit-bound release-evidence
packet, including browser checks and the whole candidate matrix. That is the
right gate for a curriculum, workflow, release, license, or security change,
but it is disproportionate for a PR that adds one self-contained fictional
test material folder.

Reducing review latency cannot permit untrusted PR code to access write tokens,
secrets, models, a network, or an automatic merge path. It also must not let a
contributor mix a fixture with unrelated files and accidentally skip the full
quality workflow.

## Decision

1. A dedicated `Fast test-material checks` workflow runs on PRs that touch
   `evals/contributions/**`. It has read-only `contents` and pull-request
   metadata permissions, keeps checkout credentials out of Git configuration,
   checks out the target branch's validator separately from the PR data, and
   uses that trusted validator for static receipt/material validation plus its
   owned regression tests. It refuses a fast route whose GitHub file list
   includes anything outside one contribution folder.
2. The full quality workflow ignores a pull request only when **all** changed
   paths are beneath `evals/contributions/**`. Any mixed-scope PR continues to
   run the full release-evidence matrix.
3. The fast workflow does not execute contributor-written validators, call a
   model, make a network request, or approve/merge a PR. The material validator
   rejects orphaned files, symbolic links, unlisted attachments, the receipt as
   material, non-text bytes, personal/raw-evidence declarations, and outcome
   claims.
4. The repository provides an offline scaffold and a concise maintainer review
   procedure. These reduce form errors and review reconstruction; they do not
   change the current license, create a DCO/CLA, or establish host-side
   enforcement.

## Alternatives considered

### Run the full release matrix for every fictional fixture

Rejected. It turns a safe, small fixture correction into a browser-install and
whole-project operation, slowing volunteer feedback without testing the
contributor's specific boundary more deeply.

### Execute the contributor's validator in the fast workflow

Rejected. A static fast route should not run arbitrary new PR code merely to
claim a quicker review. A maintainer can inspect and, if appropriate, run a
focused validator in a clean, authorized environment.

### Add a bot that labels, approves, or merges fast-route PRs

Rejected. The repository's host Ruleset is not currently enforceable and a bot
cannot establish originality, rights, privacy, task value, or evidence quality.

## Consequences

- A genuine one-folder fictional-material PR has a smaller read-only CI path.
- Any attempt to combine it with code, policy, license, or other project work
  remains subject to the full quality workflow.
- Maintainers retain responsibility for rights, relevance, and merge decisions.
- Real learner and model evidence remain on the restricted path and cannot use
  this workflow to close Q-001 or Q-002.

## Evidence boundary

This decision improves review routing and static file-boundary checks. It does
not prove a contribution's authorship, legal sufficiency, model behavior,
learner effect, productivity, efficiency, safety, IQ, host Ruleset enforcement,
or release readiness.
