# Failed LLM interaction recovery: public-demand record

**Access date:** 2026-08-13

**Status:** scoped public-report synthesis

**Local reproduction:** `not_run`

**Owner / next review:** communication-systems maintainer / 2026-09-12

## Question

Is there enough public evidence to justify a beginner-facing route for a reply
that ignored the current task, constraints, or visible project instructions?

## Evidence boundary

The sources below are public issue reports submitted to vendor repositories.
They establish only that named reporters described these symptoms and that the
issues had the recorded public state when checked. They do not establish root
cause, prevalence, present reproducibility, vendor confirmation, or that a
prompt repair will solve the reported case. Issue titles are retained as
identifiers; issue prose, attachments, prompts, and proposed workarounds are not
copied into the curriculum.

## Public reports inspected

| Surface | Public identifier and reporter-described symptom | State checked 2026-08-13 | What it does not prove |
| --- | --- | --- | --- |
| OpenAI Codex | [#35719 — “Codex Ignored Explicit Execution Instructions, Exhausted Usage, and Misreported”](https://github.com/openai/codex/issues/35719) | open | That the title's causal interpretation is correct or generally reproducible |
| OpenAI Codex | [#31336 — “Assistant reprocesses previous prompt.”](https://github.com/openai/codex/issues/31336) | open | Why the earlier prompt was followed or that every queued-turn symptom has one cause |
| OpenAI Codex | [#23496 — “Skill instructions to use subagents are ignored unless repeated in the prompt”](https://github.com/openai/codex/issues/23496) | open | That repeating instructions is a universal or safe remedy |
| OpenAI Codex | [#34021 — “New message queue request is ignored”](https://github.com/openai/codex/issues/34021) | open | That the report is a model-only failure rather than a turn-state or product seam |
| OpenAI Codex | [#25792 — “Context compaction forgets AGENTS rules: task progress can jump from 97% back to 42%”](https://github.com/openai/codex/issues/25792) | open | The internal mechanism, prevalence, or current-version behavior |
| Anthropic Claude Code | [#72651 — “Model ignores loaded CLAUDE.md instructions: skips mandatory research before infrastructure actions”](https://github.com/anthropics/claude-code/issues/72651) | open | That loaded context was the sole controlling condition or that the report transfers to another product |
| Anthropic Claude Code | [#81480 — “Agent repeatedly ignores explicit user instructions, introduces unrequested technologies, wastes tokens”](https://github.com/anthropics/claude-code/issues/81480) | open | A general model ranking, frequency, or confirmed cause |
| Anthropic Claude Code | [#9796 — “[BUG] Context compaction erases .claude/project-context.md instructions”](https://github.com/anthropics/claude-code/issues/9796) | open | That the reporter's mechanism label is confirmed or current |
| Anthropic Claude Code | [#28469 — “Opus 4.6 comprehensive regression: loops, memory loss, ignored instructions - daily professional user report”](https://github.com/anthropics/claude-code/issues/28469) | open | Population-level regression, cross-user incidence, or transfer to Codex |

## Synthesis

The recurring observable seam is not “bad prompting” in general. It is a
post-failure evidence problem: the reader has an original request, some visible
context, an actual reply or artifact, and an expected outcome that differ.
Across two named product repositories, reporters used different causal labels
for symptoms involving old-turn continuation, ignored constraints, and missing
project instructions. That variation makes root-cause teaching inappropriate,
but it supports a product-neutral recovery method that begins with comparison.

**Confidence: medium for the teaching need.** Nine reports across two public
repositories are enough to show that the symptom class is not invented for the
book. They are still self-selected reports from technical users, not a
representative sample, and cannot support a prevalence or effectiveness claim.

## Teaching implication

The curriculum should teach the learner to:

1. preserve the request, visible context, actual reply, and expected result;
2. classify no more than two observable mismatches;
3. avoid claims about hidden reasoning, system prompts, or platform defects;
4. change one request condition that directly addresses one mismatch;
5. hold the remaining working conditions fixed for a comparable rerun; and
6. record `improved_on_this_case`, `unchanged`, `regressed`, or
   `not_comparable` rather than “resolved.”

This is a project inference implemented as a candidate teaching route. The
route itself has no stored learner run and no evidence of cross-model
effectiveness.
