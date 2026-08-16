---
name: prysai-llm-comparison-protocol
description: >
  Plan or review a fair, task-scoped comparison between two named LLM,
  model-provider, or workflow candidates. Use when someone asks which option is
  better, faster, cheaper, or worth expanding and the answer must preserve
  fixed conditions, raw evidence, unavailable cases, and a narrow conclusion.
  Do not use to admit a named platform lesson, retrieve current product facts,
  run a model without authorization, or publish a general ranking.
---

# LLM Comparison Protocol

Turn “which is better?” into one inspectable decision. This Skill plans or
reviews a comparison; it does not execute models, spend budget, expose private
inputs, or turn a small result into a leaderboard.

## Freeze the decision

Require a decision ID and owner; exactly two candidate cards; one changed
variable; fixed task set, inputs, order, rubric, repetitions, and score owner;
plus a context fingerprint, tools and versions, permissions, budget or cost
basis, availability window, log location, retention boundary, stop condition,
and a not-comparable condition.

Return blocked if a candidate, acceptance rule, permission boundary, cost
basis, or owner is missing. Do not silently normalize differences in account,
plan, region, rate limit, tools, system context, or output format.

Hand off named product commands, permissions, or runtime behavior to
prysai-platform-adapter-review. Hand off current price, availability, or
product facts to prysai-source-investigator. Hand off a completed comparison
claim audit to prysai-evidence-review.

## Use one fixed surface

Use the project-owned three-task-smoke-v1 package at
evals/candidates/three-task-smoke-v1/ when its synthetic inputs fit the
decision. Run its local validator before any external execution. The package
provides frozen input, hashes, expected output shape, and a run-record
template; it contains no model result and makes no benchmark claim.

If the package does not fit, define a new task contract before running either
candidate. Do not change inputs, rubric, context, tools, permission level,
budget, or stop rule after seeing one result. A changed condition is a new
comparison, not a retry under the old decision.

## Preserve an honest run record

Planning and static fixture checks are R0. An authorized reversible local run
is R1. A provider, account, network, paid API, shared repository, or external
service run is R2 and needs an explicit target, data boundary, budget, owner,
rollback or cleanup, and confirmation.

For each candidate and task, preserve a run ID, attempt ID, candidate ID, task
ID, input hash, context fingerprint, tools and versions, permissions, cost
basis, availability event, raw-output location, validation, human score,
result state, not-comparable reason, and limitation. Keep initial output
immutable. A controlled rework gets a new attempt ID.

Capacity error, unavailable surface, permission mismatch, input-hash drift,
tool-version drift, or missing raw output is evidence to preserve, not a blank
cell to hide.

## Limit the conclusion

Classify each row as comparable, not-comparable, or not-run. Then return only
one decision:

- worth-expanding: the declared task-level evidence supports a separately
  planned larger comparison;
- do-not-expand-yet: observed evidence fails the declared gate or has a
  material unresolved fault;
- insufficient-evidence: inputs, conditions, evidence, score, or
  comparability are incomplete.

Do not name a universal winner, publish a general rank, infer capability from
availability, infer reliability from one success, compare unlike costs, or
convert an unrun protocol into model-performance evidence.

## Return the comparison receipt

Return decision ID, decision owner, comparison variable, candidate cards,
frozen conditions, task set and input hashes, acceptance and scoring, run
status, comparable rows, not-comparable rows, decision, evidence, unknowns,
handoff, risk, content status, and this limit: task-scoped candidate decision
only; not a product ranking, benchmark, runtime guarantee, learner outcome,
or production recommendation.

## Maintenance record

- `source`: original Prysai Lab method derived from the fixed
  three-task-smoke fixture and Chapters 6 and 19
- `license`: original rewrite; model and product documentation plus execution
  records remain reference-only under `docs/sources/asset-register.md`
- `owner`: evaluation-maintainer
- `version`: `0.1.0`
- `review_date`: `2026-09-14`
- `content_status`: `candidate`
