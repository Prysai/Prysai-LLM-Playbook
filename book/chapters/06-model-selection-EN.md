<!-- content_id: chapter-06-model-selection | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-11 -->

# Chapter 6: Model Choice Is Not Model Worship

**Status:** `candidate`. The comparison protocol below is written and
source-bounded, but this repository has not run its fixed task set. Model
performance, cost, latency, capacity, stability, and overall ranking remain
`not_run`.

## The problem this chapter solves

Model selection is often replaced by a slogan: “Use the best model.” Real work
needs a narrower question:

> For this task, on this surface, with this provider, context, tool set,
> permission boundary, time budget, and acceptance rubric, which candidate meets
> the minimum requirement—and is there enough evidence to expand the trial?

If a candidate is unavailable on the chosen surface, or if two runs use
different inputs, tools, permissions, or reasoning settings, there is no clean
model comparison. A beautiful demo can show that one configuration produced one
result. It cannot establish a universal ranking or overall value.

## Learning objectives

By the end of this chapter, you should be able to:

- choose the task and work surface before choosing a model;
- verify model availability in the actual account, workspace, provider, and
  session rather than inferring it from a catalog or picker;
- separate model ID, provider, reasoning effort, context, tools, permissions,
  and acceptance criteria as different comparison variables;
- run a low-risk, three-task smoke comparison without changing conditions to
  rescue one candidate;
- preserve capacity, provider-mismatch, and long-wait failures as evidence;
  and
- state what the experiment proves, what it does not prove, and when to stop.

## A real-world entry point: model choice fails in ordinary ways

The project’s [Codex field research](../../docs/research/field-problems-codex.md)
collects public GitHub Issues and other public discussions. These reports are
symptoms, not official diagnoses or local reproductions. They are valuable
because they expose the assumptions people make when a model choice goes
wrong.

| Public symptom | What the reporter observed | What it does **not** prove | First safe response |
|---|---|---|---|
| A model picker changes `model` but leaves a custom `model_provider` | The visible model and effective provider can form an invalid pair | That the picker, provider, or model is universally broken | Read the effective `model` and `model_provider` together; preserve a redacted config diff before correcting it |
| The selected model is at capacity | A task stops before a complete result, and later prompts may meet a partial state | That the model is low quality, or that retrying means the first attempt finished | Save the checkpoint, diff, logs, and tests; classify the state before continuing |
| A Windows command remains in `Working` | The UI shows activity but no verifiable output arrives | That the formatter, Agent, or model is still making useful progress | Apply the timeout/stop rule, interrupt safely, inspect the worktree, and rerun only a bounded check |

The original links, dates, versions, evidence levels, and uncertainty notes are
in the [model-selection research record](../../docs/research/codex-model-selection-official-facts-2026-08-11.md).
The project did not execute the commands or workarounds from those reports.

### How to use a real report without turning it into folklore

For each symptom, keep four labels separate:

1. **User report:** what a person says happened in a named environment.
2. **Independent report:** whether another user describes a similar symptom.
3. **Official confirmation:** a maintainer response, official documentation,
   release note, or other first-party evidence.
4. **Playbook evidence:** what this project actually reproduced.

In the three examples above, the first two labels may be present, but this
project has no local reproduction and no official root-cause confirmation to
upgrade them into a guaranteed fix. That changes the action: preserve evidence
and narrow the next check instead of promising a magic setting.

## 1. Model choice is a configuration decision

### Availability comes before quality

Use two separate gates:

```text
official product documentation
→ actual account / workspace / organization authorization
→ target surface and provider
→ model visible in this session
→ harmless request succeeds
→ required tool is callable
→ task result is verified
```

Each arrow has a different claim. A model can be described by an official page
and still be unavailable to an account. It can appear in a picker and still
fail when the provider receives the request. A successful text response can
still fail to prove that the file, terminal, browser, or connector needed by
the task is available.

Use these fields in a candidate card:

```text
candidate_id:
model_id:
provider:
surface: Local | Worktree | Cloud
entry: desktop | CLI | IDE | web | API | other
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:
model_visible_evidence:
harmless_request_evidence:
```

`not_observed` is a valid result. It means the check was not performed or did
not leave usable evidence. It is safer than filling the form with a guess.

### Product positioning is a starting hypothesis

At the 2026-08-11 source check, the official Codex models page describes the
recommended GPT-5.6 choices broadly like this:

| Official positioning | A reasonable starting hypothesis | What still needs testing |
|---|---|---|
| Sol: complex, open-ended work with extra analysis and polish | Try it when ambiguity, judgment, or high-value review dominates | First-pass rate, duration, cost, stability, and tool behavior on your task set |
| Terra: pragmatic everyday workhorse | Try it for ordinary work that needs strong reasoning and tool use | Whether it clears your acceptance threshold under your actual constraints |
| Luna: clear, repeatable, high-volume work | Try it for extraction, classification, transformation, and structured summaries | Whether its result remains acceptable after context, provider, effort, and review costs are included |

These are product descriptions, not Playbook benchmark results. The official
page also warns that higher reasoning effort can improve complex work while
taking longer and using more tokens. Start with the lowest effort that meets
the acceptance rubric; raise it only when the task needs more planning,
analysis, or checking. Record the setting as part of the run.

`Max` and `Ultra` are not free quality labels. The official page describes Max
as giving one task more reasoning time and Ultra as using subagents for
separable complex work. They change the workflow and resource envelope, so an
Ultra run is not a model-only comparison with a single-agent run.

### Model, provider, and surface are a tuple

Do not write a candidate as only `model = ...`. A useful comparison identity is:

```text
(model_id, provider, surface, entry, account_scope, reasoning_effort,
 context_fingerprint, tools_and_versions, permission_profile)
```

If any core member changes, either compare a different workflow or mark the
run `not_comparable` and rerun both sides under the new contract.

The official documentation describes a shared `config.toml` route for local
desktop, CLI, and IDE defaults, while Cloud chats have a different default-model
boundary. A config file is only configuration evidence. Read back the effective
provider and model, then make a harmless request before treating the tuple as
active.

## 2. Decide in the right order

Do not start with a favorite model. Use this sequence:

```text
define task and risk
→ choose Local / Worktree / Cloud
→ choose the entry point and provider
→ verify target access and model availability
→ freeze context, tools, permissions, effort, and acceptance
→ run the same task set
→ inspect comparable / not_comparable rows
→ expand, stop, or collect more evidence
```

### Classify the task first

The task class tells you what “good enough” means:

- **Understand and extract:** find structured values in material;
- **Transform and generate:** rewrite, summarize, classify, or format under a
  fixed schema;
- **Plan and judge:** handle constraints, trade-offs, and uncertainty;
- **Code and use tools:** inspect, edit, run, and repair a repository;
- **Research and review:** find sources, reconcile claims, and expose gaps;
  and
- **Create and design:** preserve a style across feedback rounds.

A candidate that passes extraction may still be the wrong choice for a
multi-file repair or a high-risk evidence review. The acceptance rubric must
match the task class.

### Lock the surface and risk boundary

Choose the smallest environment that can provide the required evidence. Keep
synthetic or redacted inputs local when the task does not need remote execution.
Use a disposable Worktree when current uncommitted work must be isolated. Use
Cloud only when the repository, environment, network, secrets, and review path
are approved and observable.

Model choice cannot compensate for a missing file, unavailable connector,
incorrect checkout, or unauthorized write. If the environment is wrong, stop at
the surface decision instead of “testing” the model under unequal conditions.

## 3. Write a candidate card before running

Use one card per candidate or workflow:

```text
candidate_id:
model_id / provider:
surface: Local | Worktree | Cloud
entry:
account_or_workspace_scope:
surface_available: yes | no | not_observed
availability_evidence:
not_available_reason:

reasoning_effort_or_config:
task_set_version: three-task-smoke-v1
context_fingerprint:
tools_and_versions:
permission_profile:
acceptance_rubric_version:
cost_basis: actual | credits | token_only | not_observed
known_capacity_or_network_issue:

not_comparable: true | false
not_comparable_reason:
conclusion_status: not_run | candidate | disputed
```

Before the first run, freeze:

- the exact task inputs and their version;
- the surface, entry point, provider, model, and effort setting;
- the relevant context and tool versions;
- permissions and allowed side effects;
- the acceptance rubric and reviewer;
- the time boundary and retry budget; and
- the cost measurement basis.

Do not change a prompt, add context, grant a tool, raise effort, or widen a
permission for only one candidate. If the task contract changes, increment the
version and rerun both candidates.

## 4. Experiment: three-task smoke comparison

**Experiment status:** `not_run`. This is an exercise protocol, not evidence
that this repository has run a model comparison.

### Setup

Choose two candidates that have `surface_available: yes` on the same surface.
Use synthetic, non-sensitive input. Do not use production data, real secrets,
external writes, publication, push, deployment, or a paid connector. Run each
task once initially and allow at most one pre-declared, same-format rework.

Freeze `task_set_version: three-task-smoke-v1`, both candidate cards, one
acceptance rubric, raw-output locations, log locations, and a stop condition for
unavailability, capacity interruption, permission mismatch, input drift, or
tool-version drift.

### Fixed tasks

| ID | Synthetic input | Required output | Frozen acceptance |
|---|---|---|---|
| `smoke-1-extract` | Text containing `owner: Lin`, `due: 2026-08-15`, `status: candidate`, and two irrelevant sentences | JSON containing only `owner`, `due`, and `status` | Parseable JSON; all three values exact; no extra fields or prose |
| `smoke-2-transform` | Three Markdown release notes: add an export, fix an empty heading, and a known limitation that PDF is unsupported | A three-column table: `type / content / status` | All three facts retained; the limitation remains a limitation; only the requested table is emitted |
| `smoke-3-evidence` | Claims that “the build succeeded, so the feature is live” and “login succeeded, so the repository is readable,” with build and login evidence but no deployment or repository-read evidence | An audit table: `claim / evidence present / gap / status` | Neither claim is marked verified; the missing deployment and resource-read evidence are named; status is `candidate` or `unconfirmed` |

Do not replace a task with a prettier demo for one candidate. If an input must
change, increment the task-set version and rerun both sides.

### Task

1. Complete and preserve both candidate cards before invoking either candidate.
2. Verify availability in the chosen surface and record the evidence location.
3. Run candidate A and B in the same task order with the same inputs and
   acceptance rubric.
4. Save raw outputs before human editing. Record events, duration, cost basis,
   and error category.
5. If a run fails, allow only the pre-declared controlled rework. Do not turn
   repeated blind retries into a hidden success metric.
6. Review every `not_comparable` row before calculating any summary.
7. End with only `worth expanding`, `do not expand yet`, or `insufficient
   evidence`, plus the limits and next-run conditions.

### Evidence

The comparison record should contain at least:

```text
run_id | candidate_id | task_id | model_id | provider | surface | entry
surface_available | availability_evidence
reasoning_effort_or_config | context_fingerprint | tools_and_versions
permission_profile | first_pass | rework_count | duration
cost_basis | cost_observed | error_type | reviewer_score
comparable | not_comparable_reason | raw_evidence
```

Another reviewer should be able to rebuild the three inputs, conditions, and
acceptance criteria. Do not use an empty cell, an estimate, or the other
candidate’s output to fill an interrupted run. Token counts are not currency
unless the chosen cost basis explicitly defines that conversion.

## 5. Failure variants and safe recovery

| Failure variant | Why the result is not comparable | Safe handling |
|---|---|---|
| Candidate is not visible or callable on the chosen surface | There is no same-surface run to compare | Record `surface_available: no` or `not_observed`; stop that candidate and do not score unavailability as model quality |
| Model picker and provider disagree | The request may not have used the intended model | Preserve a redacted effective-config diff; correct the tuple or change the comparison to a provider/workflow test |
| Capacity error interrupts one run | Output and duration are incomplete, and the next attempt may start from a partial state | Save the error and checkpoint; classify `blocked` or `not_comparable`; rerun both sides only under a declared condition |
| A command waits without a verifiable event | A `Working` label is not a result | Apply the timeout rule, interrupt, inspect diff and process state, and record verification as missing |
| One side receives extra context, a higher effort, or a new tool | The independent variable is no longer only the model | Mark `not_comparable`, preserve both records, and rerun with the frozen contract |
| One attractive demo is used to announce an overall winner | Sample size and conclusion scope do not match | Return to `candidate` or `insufficient evidence`; expand task classes and repetitions before widening the claim |

The realistic response to a capacity or long-wait failure is not “keep clicking
until it works.” It is: preserve the last known state, identify whether the task
was complete, partial, or unknown, then choose a bounded recovery. A new
conversation can be a recovery surface, but it does not inherit proof from the
old conversation.

## Reflection

Answer from the cards and raw evidence, not from memory:

- Which task changed the expand/stop decision?
- Which difference could come from the model, and which could come from the
  surface, provider, context, tool, permission, capacity, or reviewer?
- Where would a faster or cheaper output still fail the acceptance rubric?
- Which sentences are official product positioning, and which are observations
  from this smoke run?
- If you have only one attractive demo, what exactly prevents a general ranking?

## Transfer

Move the same comparison fields to one of these tasks:

- the same model on Local and Worktree;
- document conversion with a strict output schema;
- research-source reconciliation with citations and an unknowns column; or
- a low-risk code inspection with a read-only tool boundary.

Freeze a new task-set version and domain-specific acceptance rubric. Do not copy
the model choice or the three-task result into the new domain. State which
conclusions remain task-level and which claims must be discarded.

## Chapter evidence

The intended delivery is two candidate cards, a frozen task set and rubric,
initial raw runs and any controlled rework, a comparison table, typed error
records, and an expand/stop decision. Until those records exist, the chapter
must retain `not_run`; official positioning and a single demo cannot substitute
for evaluation evidence.

## Sources and maintenance boundary

| Fact or method boundary | Source | Accessed | Applies to | Owner / next review |
|---|---|---:|---|---|
| Official model positioning, reasoning guidance, local defaults, Cloud model boundary, and deprecation notices | [Codex models](https://learn.chatgpt.com/docs/models.md) | 2026-08-11 | The official documentation at the access date; not account-level proof or a benchmark | `facts-maintainer` / 2026-09-11 |
| CLI surface and local repository workflow | [Codex CLI](https://learn.chatgpt.com/docs/cli.md) | 2026-08-11 | Official CLI documentation; not this session’s effective configuration | `facts-maintainer` / 2026-09-11 |
| Cloud environment, setup, logs, and review boundaries | [Codex Cloud](https://learn.chatgpt.com/docs/cloud.md) | 2026-08-11 | Official Cloud documentation; setup is not agent-stage completion | `facts-maintainer` / 2026-09-11 |
| Public model/provider, capacity, and long-wait symptoms | [Field problem record](../../docs/research/codex-model-selection-official-facts-2026-08-11.md) | 2026-08-11 | User reports and project guidance; no local reproduction or official root-cause claim | `curriculum-maintainer` / 2026-09-11 |
| Fixed-task comparison method | [Evaluation chapter](19-evaluate-models-and-workflows-EN.md) and this chapter’s `three-task-smoke-v1` | 2026-08-11 | Playbook method; no completed model runs yet | `evaluation-maintainer` / 2026-09-11 |

Model IDs, surface matrices, prices, capacity, configuration syntax, provider
support, effort controls, and deprecation notices can change. When they do,
refresh the first-party sources, then update the fact-impact registry, research
record, this chapter, affected evaluation fixtures, and status source. Keep
official positioning, user symptoms, and local runtime evidence in separate
sentences.

## Acceptance checklist

- [ ] I can define the task, risk, surface, provider, and acceptance rubric
      before naming a model.
- [ ] I can record actual availability evidence instead of inferring access
      from a model catalog, config value, or picker label.
- [ ] I can fill two candidate cards with model, provider, effort, context,
      tools, permissions, cost basis, and task-set version.
- [ ] I can run or correctly block the six initial executions in
      `three-task-smoke-v1` without changing one side’s conditions.
- [ ] I can preserve provider mismatch, capacity, and long-wait evidence and
      distinguish recovery from verification.
- [ ] I can report only task-scoped observations and explain why one demo cannot
      prove an overall ranking or value-for-money claim.
- [ ] I can state that this chapter is still `candidate` and its experiment and
      model evaluation are still `not_run`.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="05-choose-the-codex-surface-EN.md" aria-label="Previous chapter: Chapter 5 · Choose the right Codex surface">← Previous<br><strong>Chapter 5 · Choose the right Codex surface</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="07-skills-plugins-and-tools-EN.md" aria-label="Next chapter: Chapter 7 · How Skills, Plugins, MCP, and tools divide the work">Next →<br><strong>Chapter 7 · How Skills, Plugins, MCP, and tools divide the work</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
