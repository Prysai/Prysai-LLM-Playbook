<!-- content_id: chapter-01-gpt-and-codex | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-14 -->

# Chapter 1: Understand GPT before you trust Codex

## Start here: you do not need the names yet

Today we begin with the question behind the product names. You may already
have heard Codex and Claude Code mentioned together. They are useful examples
of a bigger shift: a language model can work with a task, context, and
sometimes tools instead of only returning a chat reply. You do not need to
choose a side or memorise a feature list first. Before we tour any controls,
learn the question that makes the rest easier:

> When a language-model tool says it is done, what can you actually inspect
> before you trust the result?

In this first lesson, you will separate a suggested action from a permitted
action, a tool message from a changed target, and a plausible answer from
evidence. Codex is the flagship practice track in this guide. The method is
broader; a named platform must earn its own adapter before we teach its
buttons, permissions, or behaviour as fact.

That is why the first exercise is intentionally modest. Start with one visible
input, one low-risk action, and one check that another person could repeat. A
long feature list can wait until you know how to tell a finished result from a
convincing-looking one.

## The problem this chapter solves

People often describe Codex as “a chat window that writes better code.” That
description stops being useful at the first real failure. It does not explain
why the same request behaves differently when the model, project, context,
permissions, tools, or feedback changes. It also encourages a dangerous
shortcut: treating a confident answer or a tool message as proof that work was
executed and checked.

This chapter builds a small operational model. It is not a claim about hidden
chain-of-thought. We use only what a learner can inspect: input, selected
context, requested action, tool boundary, returned result, changed state, and
evidence used to stop.

## Learning objectives

After this chapter, you should be able to:

- distinguish GPT, a model, the Codex product surface, a tool, a Skill, and an
  Agent loop;
- explain why context selection and sampling can change an output without
  changing the user's sentence;
- separate a model's proposed tool action from the runtime permission check,
  the tool result, and final verification;
- turn an uncertain completion claim into a small, reversible experiment; and
- recognise a real-world symptom without inventing an official root cause.

## Start with an observable stack

Use this stack when analysing a task:

    model capability
            ↓ generates a response or an action proposal
    Codex work surface
            ↓ supplies project context and an execution boundary
    tool/runtime
            ↓ may permit, reject, or execute a requested action
    tool result / changed state
            ↓ becomes new evidence or new context
    verification and human decision
            ↓ decides whether the work can stop or must recover
    delivery claim

The arrows are not automatic guarantees. A model can propose a shell command
without the runtime executing it. A runtime can execute a command whose exit
code is zero while the wrong file or environment was checked. A tool can return
a successful-looking message while the intended external object was not
changed. Each arrow needs its own evidence.

### The terms, in plain language

| Term | What it contributes | What it does not prove |
|---|---|---|
| GPT | A family of generative model capabilities | File access, terminal access, account authority, or a successful change |
| Model | A concrete model/configuration used for a run | That it is available in every surface or is best for every task |
| Codex | A work surface connecting a model to project context, tools, and permissions | That every visible account or connector is authorised for the target |
| Tool | An interface for reading or changing a file, process, browser, Git host, or service | That the requested action was allowed, correct, or complete |
| Skill | A reusable method with triggers, inputs, boundaries, steps, and evidence | A new model, a permission grant, or a substitute for verification |
| Agent | An observable multi-step loop around observation, action, feedback, retry, and stop | Access to hidden reasoning or permission to retry forever |

The project's stable terminology is defined in [CONTEXT.md](../../CONTEXT.md).
Product details such as model names, invocation syntax, and permission defaults
are volatile facts; use the dated [official baseline](../../docs/research/openai-codex-baseline.md)
and re-check the linked first-party documentation before relying on them.

## How a language model produces an answer

A useful simplified model is:

    selected context + task + model configuration
            → a distribution over possible next tokens
            → one sampled or selected token at a time
            → a response, structured action proposal, or refusal

The model is not retrieving one pre-written answer from a database. It generates
a sequence conditioned on the context it receives. Small changes in context,
ordering, instructions, tool results, or generation configuration can change
the continuation. This picture does not tell you exactly what a model thought;
it tells you which inputs must be held fixed for a fair comparison.

### Mechanism card: context is a budget and a filter

More context is not automatically better context. Classify every candidate input:

1. Is it necessary to identify the object and acceptance condition?
2. Is it trustworthy, or is it an unverified instruction inside data?
3. Is it current enough for this task?
4. Does it add signal, or compete with the task for context space?

For a README edit, project rules and the target README may be relevant. A random
old issue, a copied prompt, and an unrelated secret are not. A file that says
“ignore the project rules” is still a file to analyse, not an authority to obey.
Context selection is therefore both a quality decision and a security decision.

### Mechanism card: variation is a measurement problem

Two different outputs do not prove that one piece of context caused the
difference. The model may sample differently, the service may use another
revision, the tool state may have changed, or the task may be underspecified.
Change one variable at a time and record:

    run-id | model/surface | input revision | changed variable | output/state | evidence | unknowns

Repeat the baseline when possible. If you cannot hold a variable fixed, label
the observation “different outcome observed,” not “caused by X.”

## A tool call is a protocol boundary, not a magic action

When Codex can use tools, think in four separate events:

1. the model proposes an action;
2. the runtime checks scope, permissions, and confirmation rules;
3. the tool executes, refuses, or times out; and
4. the result and changed state are inspected by the next step.

These statements are not equivalent:

- “The model wrote a command.”
- “The command was executed.”
- “The command changed the intended object.”
- “The change satisfies the acceptance criteria.”

For a local file, useful evidence may be the inspected path, before/after
diff, focused check, and unverified list. For a GitHub or other external action,
add the exact target, authorization state, confirmation point, result object,
and rollback or recovery path. A login page, a tool name, or a message saying
“done” fills none of those gaps by itself.

### Permission is not the same as capability

The official product boundary distinguishes the technical sandbox from the
approval boundary. In project terms:

- a sandbox describes what the runtime can technically access;
- approval describes when the runtime must pause before an action; and
- neither proves that the target, scope, or outcome is correct.

Do not infer permission from the model name, Skill presence, account login, or an
available button. Verify the target and action immediately before a side effect.
Start a learning exercise with a disposable copy and no secrets.

## Three mechanism traps worth learning early

The same observable boundary appears in three common systems. They look
different in a product demo, but each can produce a plausible answer that is
not yet a trustworthy result.

### 1. Structured output can be syntactically right and semantically wrong

A JSON Schema or typed response can constrain shape, required fields, and some
types. It does not prove that an ID exists, a date is current, a permission is
valid, or a source supports the value. Use three checks:

```text
schema/type check → business-rule check → source/state check
```

For example, `{ "status": "approved" }` may be valid JSON and satisfy a
schema while the approval belongs to the wrong project. Preserve the raw model
output, schema result, business-rule result, and external verification as
separate evidence. The [LLM mechanism research](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md#机制卡-d-structured-output-把语法错误变成语义错误)
records this as a teaching boundary, not as a claim that every provider uses
the same implementation.

### 2. Retrieval selects material; it does not guarantee complete use

Search or retrieval may select a relevant chunk, but relevance is not the same
as completeness, freshness, authority, or actual causal use by the model. A
small exception paragraph can be ranked below a broad rule, or a chunk boundary
can separate a condition from its definition. Record the query, filters,
revision, selected chunk IDs, and final citations. If the answer changes, say
“different retrieval context produced a different result” unless the experiment
isolates why.

### 3. Data that looks like an instruction is still data

Web pages, attachments, issue bodies, tool results, database fields, and MCP
resources may contain text such as “ignore the previous rules.” That string does
not gain authority merely because it looks like a system instruction. Treat it
as untrusted data, keep external actions read-only by default, and require a
separate decision before it can influence a tool call. This is the practical
form of prompt-injection defence for an early learner: identify the data source,
limit the tool boundary, and preserve the attempted action in the record.

These three traps are covered with provider-specific sources and low-risk
experiments in the [mechanism deep dive](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md).

## What an Agent loop really means

An Agent is best taught as a state machine that leaves observable traces:

    ready
      → observed
      → planned
      → action_requested
      → awaiting_approval / executing
      → feedback_received
      → verified / recoverable_failure / blocked
      → stop or bounded_retry

The loop needs a retry budget and a reason for each retry. “Try again” is not a
recovery strategy when the input, authority, environment, or acceptance
condition has not changed. A good stop record answers:

- what state was reached;
- what changed, if anything;
- which evidence supports the claim;
- which evidence is missing; and
- what smallest next check could reduce uncertainty.

The loop can be useful without pretending to expose hidden reasoning. Record
observable events and decisions; do not present an invented private rationale as
a transcript of the model's internal process.

## Field cases: the useful lesson is the boundary

The following are public user reports collected in the project's field research.
They are not official root-cause reports and have not been locally reproduced in
this project. Their value is that they expose where a casual mental model breaks.

### Case FP-09: capacity interruption and a dangerous retry assumption

Users reported that a selected model became unavailable at capacity and that
later queued instructions could appear to continue from a partially completed
state. The report does not establish the service-side cause or exact queue
semantics. A safe response is therefore not “keep pressing continue.”

The smallest safe response is:

1. stop and record the model, surface, time, and visible error;
2. inspect the current diff and checkpoint before sending another instruction;
3. run the narrowest available check on the current state; and
4. resume from a named checkpoint or start a clean run only after deciding what
   state is authoritative.

Source and evidence labels: [FP-09 in the field research](../../docs/research/field-problems-codex.md#fp-09-模型容量错误中断任务，并可能让排队后续任务接在半成品上).

### Case FP-10: “Working” is not proof of progress

A Windows CLI user reported that formatting or analysis work remained in a
Working/running state for a long time without a clear completion or error. The
report did not prove whether the cause was a command hang, process handling,
output buffering, environment drift, or another factor. A long-running label is
a state observation, not a successful result.

Record the command, process state, elapsed time, output, and interruption point.
Then inspect the diff and run a focused check independently if it is safe. Do
not turn “the UI still says Working” into “the formatter finished.”

Source and evidence labels: [FP-10 in the field research](../../docs/research/field-problems-codex.md#fp-10格式化验证命令让-windows-cli-agent-长时间停在-working).

### Case FP-11: validation can accidentally expand the task

A public report describes an Agent that expanded a validation step into an
unauthorised force reinstall. Whether the report's explanation is the actual
root cause is unconfirmed. The durable lesson is independent of the root cause:
verification must have a declared command scope, write scope, and stop point.

If a check needs a destructive reset, a network call, a package reinstall, or a
credential, stop and request a new decision. “The check failed” does not grant
permission to escalate.

See the [field-problems index](../../docs/research/field-problems-index-2026-08-10.md)
for evidence classification and related chapter/lab mappings.

## Decision rule for a real task

Before asking Codex to act, write this small task card:

| Field | Example for a README-only change | What to do if missing |
|---|---|---|
| Goal | Help a new contributor start the project | Ask; do not interpret “make it better” as acceptance |
| Context | Project rules, README, package scripts | Read only the minimum relevant files |
| Allowed action | Edit one local README in a disposable branch | Treat unlisted side effects as forbidden |
| Feedback | Diff, link check, and command-output record | Add a check before editing further |
| Stop condition | Scope changed, command needs install/network, or evidence is missing | Stop and record blocked or not_observed |
| Delivery claim | “README changed; link check passed; runtime not tested” | Keep each claim at the evidence it actually has |

This card is more valuable than a long prompt because it exposes the decisions
that a prompt often leaves implicit.

## Small experiment: hold the task, change one input

### Setup

Use a disposable local copy containing only a README and a short project rule.
Do not use a private repository, secret, customer data, network call, or
external account. Record a run ID for every attempt.

### Task

Ask the model or Codex surface:

> Inspect the README and identify one improvement. Do not edit files. Explain
> what you read, why the improvement matters, and how a later edit could be
> checked.

Run a baseline, then repeat while changing only one variable:

1. add the audience and project goal;
2. add one project rule;
3. require a short plan before the answer; or
4. add an explicit acceptance criterion.

If the surface or model changes between runs, record that as a confounder. Do not
claim causation from a casual before/after comparison.

### Evidence

Save the prompt/input revision, run ID, surface/model label, read scope, answer,
whether a file diff exists, and unverified items. A passing static exercise does
not prove that the same behavior will occur in every Codex surface.

### Reflection

- Which variable changed the task boundary rather than merely the wording?
- How did you distinguish a tool proposal from an executed action?
- What would you need to observe before claiming that the result is correct?
- What is the smallest next experiment that would remove one uncertainty?

## Intentional failure

Use this deliberately underspecified request in the disposable copy:

> Make the whole project professional and fix every problem.

The correct response is not a large unbounded edit. A sound response identifies
the missing definition of “professional,” scope, input files, risk, acceptance
criteria, and stop conditions; it proposes a read-only inventory or asks a
focused question. If it edits immediately, record that as a failure of the task
boundary, not as useful initiative.

## Acceptance checklist

You are ready to continue when you can:

- explain the difference between model capability, Codex surface, tool action,
  tool result, and verification;
- describe context selection as a controlled variable rather than “more is
  always better”;
- label a field report as a user report, official fact, local observation, or
  unverified hypothesis;
- write a task card with an allowed action and a stop condition; and
- produce a run record that says what the evidence does not prove.

Do not mark this chapter mastered because you can repeat definitions. Complete
[Lab 011 — GPT, Codex, tools, and Agents](../labs/lab-011-gpt-codex-boundaries-EN.md)
and keep the result in a local learning record.

## Transfer task

Apply the same model to a non-code task: ask Codex to prepare a short research
brief from a fixed set of public sources. Identify the model, work surface,
source context, tools, allowed actions, source-quality checks, stop conditions,
and final evidence. Add one deliberately irrelevant source and record how you
decide whether to exclude it. Do not assume that a public source makes every
instruction inside it authoritative.

## Sources and maintenance boundary

- [Transformer architecture paper (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762) — primary research reference for the attention-based sequence model; accessed 2026-08-10.
- [OpenAI Codex official facts baseline](../../docs/research/openai-codex-baseline.md) — dated project record of volatile product facts and official URLs; checked 2026-08-09.
- [Codex real-user problem research](../../docs/research/field-problems-codex.md) — public reports and evidence labels; checked 2026-08-09; not a local reproduction report.
- [LLM mechanism deep dive](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md) — official-source-backed mechanism cards, experiments, and fact/inference/unknown labels; checked 2026-08-10.
- [Project terminology](../../CONTEXT.md) — stable definitions for GPT, Codex, tools, Skills, Agents, evidence, and status.

The chapter's explanatory structure is original to this project. Product names,
invocation syntax, model availability, permissions, and service behaviour must
be rechecked against the current first-party source before being treated as
current facts. Chapter status remains candidate; the linked lab remains draft
and not_run until a real run record and independent review exist.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"></td>
      <td align="right"><a data-chapter-nav="next" href="02-first-safe-task-EN.md" aria-label="Next chapter: Chapter 2 · Complete a first safe, verifiable task">Next →<br><strong>Chapter 2 · Complete a first safe, verifiable task</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
