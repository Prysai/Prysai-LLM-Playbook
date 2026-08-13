---
name: prysai-platform-adapter-review
description: >
  Audit a proposed tutorial or workflow for Codex, Claude Code, Grok, ChatGPT,
  Gemini, Copilot, or another LLM platform against a platform-adapter contract.
  Use when deciding whether platform-specific content adds a sourced,
  runnable, maintainable delta from the universal LLM core. Do not use for a
  general model ranking or to infer equivalent commands and permissions.
---

# Platform Adapter Review

Decide whether a named-platform lesson earns its name. A platform page must
teach a real product delta; a feature list with the vendor changed does not.

## Freeze the claim

Record the platform, surface, account or plan boundary, version/date, reader
outcome, universal core prerequisite, proposed status, and exact claims under
review. Split mixed-platform claims unless one fixed comparison task and rubric
make them genuinely comparable.

## Inspect the adapter contract

Require explicit answers for:

1. `surface`: chat, desktop, CLI, IDE, web, API, or another entry;
2. `context_injection`: files, rules, conversation state, retrieval, or user
   artifacts;
3. `actions`: what the surface can observe or change;
4. `authority`: permissions, confirmations, sandbox, account, billing, and
   external side effects;
5. `persistence`: what survives a turn, session, task, or project;
6. `control_loop`: observable planning, tool use, feedback, retries, and
   delegation;
7. `verification_surface`: diffs, logs, citations, previews, tests, traces, or
   external state;
8. `failure_modes`: product-specific misunderstandings and degradation paths;
9. `volatile_facts`: authoritative URL, access date, scope, owner, and next
   review;
10. `transfer_lab`: fixed inputs, safe actions, acceptance, cleanup, failure,
    and evidence limit.

Mark an item `not_applicable` only with a reason. Mark it `unknown` when no
current source or run supports an answer.

## Apply evidence gates

Separate three evidence classes:

- official fact: current first-party documentation or source owned by the
  platform;
- observed behavior: a preserved run with platform configuration and visible
  actions;
- field signal: a public report that establishes a symptom or need only.

Community posts cannot satisfy an official-fact gate. Documentation cannot
prove the user's account, runtime, or outcome. One successful run cannot prove
universal behavior, reliability, superiority, or learner transfer.

Reject unsupported equivalence. Matching product labels such as Agent, tool,
memory, project, Skill, or search do not establish identical semantics. Compare
only a fixed task with the same inputs, acceptance criteria, risk boundary, and
review rubric; retain configuration differences and `not_comparable` results.

## Decide the disposition

Return one of:

- `admit_candidate`: every required delta, source, run, failure, owner, review
  date, and evidence limit exists;
- `draft_source_gap`: a material volatile claim lacks first-party support;
- `draft_run_gap`: the contract is sourced but has no bounded execution;
- `merge_into_core`: no meaningful platform delta remains;
- `quarantine`: licensing, safety, privacy, or provenance is unclear;
- `retire`: the adapter is stale, ownerless, duplicated, or no longer useful.

Do not promote a page because login succeeded, a command exists, or prose
looks complete. A `candidate` adapter is still not verified learner transfer or
production guidance.

## Report the review

Lead with the disposition and the single strongest reason. Then provide the
contract matrix, unsupported claims, source/run/license gaps, duplication with
the universal core, required next experiment, owner, next review date, and
what passing would still not prove. Keep the format proportional to the number
of claims; do not force ceremonial headings onto a one-claim review.

## Maintenance record

- `source`: original Prysai Lab method implementing ADR-0025 and the gold
  content admission boundary
- `license`: original rewrite; vendor documentation and community reports stay
  reference-only unless separately licensed
- `owner`: platform-adapter maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-12`
- `content_status`: `candidate`
