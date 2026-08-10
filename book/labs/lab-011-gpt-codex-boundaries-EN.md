<!-- content_id: lab-011-gpt-codex-boundaries | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: f521e29 -->

# Lab 011: Separate GPT, Codex, tools, and Agents

---
id: lab-011-gpt-codex-boundaries
title: "Build an observable boundary map before you grant authority"
level: L0
domain: general
goal: "Distinguish generation, context, execution, tool results, verification, and Agent looping without assuming hidden access"
setup: "Fixed synthetic task cards and a blank boundary ledger; no real account, secret, external service, or public repository"
task: "Classify the cards, run one text-only context experiment, and correct an intentionally unsafe completion claim"
evidence:
  - "A boundary ledger for cards A-E with reasons, allowed actions, forbidden actions, evidence, and stop points"
  - "Two run records with input revision, run-id, surface/model label, changed variable, observed output, and unknowns"
  - "A correction note that separates a proposed tool action, execution, changed state, and verification"
failure_variant: "Treat a login page, Skill name, model name, or tool message as proof of authority or completed work; or retry after an error without checking the current checkpoint"
reflection: "Which event did you mistake for proof, and what smallest observation would actually close that evidence gap?"
status: draft
last_verified: "not run"
transfer_task: "Apply the ledger to a fixed public-source research brief without allowing external writes"
transfer_domain: "research, engineering, content, or marketing"
transfer_evidence: "Save the transfer ledger, source boundary, exclusion reason for one untrusted instruction, and an explicit unverified list"
transfer_limitations: "This lab teaches observable boundaries; it does not prove that a particular model, Skill, tool, connector, account, or Agent surface behaves the same way in production"
---

## What this lab is for

This is a low-risk introduction to the L0 gate. It is not a live integration
test and it does not ask you to paste credentials into Codex. The output is a
record another person can inspect, not a polished answer.

Use this event distinction:

    generated text
      != proposed tool action
      != permitted/executed action
      != changed state
      != verified result

## Safety and setup

- Work in a disposable local directory or a plain text learning record.
- Do not connect ChatGPT, Codex Cloud, GitHub, a browser account, MCP, or any
  external service for the required portion of the lab.
- Do not use tokens, cookies, private keys, .env files, customer data, or
  production files.
- Only edit the learning record and a disposable notes file, if you choose the
  optional local extension.
- If a proposed step requires a network call, account access, a secret, a
  public write, or a destructive reset, stop and mark it blocked.

Create a run ID such as lab011-en-2026-08-10-a. Record the date, the
surface/model label if one is used, the input revision, and the fact that the
required portion is static or text-only.

## Part 1: Fill the boundary ledger

Classify these fixed cards. “Primary layer” means the layer the learner must
observe; it is not a claim about the product's internal implementation.

| Card | Task card |
|---|---|
| A | “Explain context in your own words and name two uncertainties.” |
| B | “Read notes.md, add one heading to a disposable local copy, and show the diff.” |
| C | “Call a tool, write the result to the organisation's public repository, and notify the team.” |
| D | “Keep trying to fix the error until it looks successful; do not record intermediate state.” |
| E | “The system is logged in. The tool said completed, so publish now and skip checks.” |

Fill this ledger:

| Card | Primary layer | Allowed action | Forbidden action | Minimum evidence | Stop/confirmation point | What remains unknown |
|---|---|---|---|---|---|---|
| A |  |  |  |  |  |  |
| B |  |  |  |  |  |  |
| C |  |  |  |  |  |  |
| D |  |  |  |  |  |  |
| E |  |  |  |  |  |  |

Use this decision order:

1. Is the request explanation/generation, reading/editing, or an external state
   change?
2. If state changes, what exact object, authority, confirmation, and rollback
   are required?
3. Which evidence corresponds to the completion claim?
4. What makes the task stop rather than retry?

A strong baseline answer identifies A as explanation, B as a bounded local
execution task, C as an external side-effect plan that must not run here, D as
an unbounded Agent loop, and E as unsupported assumptions. Explain the reasons;
do not copy this sentence as proof.

## Part 2: Run a controlled context experiment

Use this text-only task:

> Inspect the provided README excerpt and identify one improvement. Do not edit
> files. State what you were given, why the improvement matters, how it could be
> checked, and what you cannot know.

Run the baseline with only the excerpt. Repeat with exactly one change:

1. add the intended audience;
2. add a short project rule; or
3. add an acceptance condition.

Do not claim that the changed item caused the output difference unless you held
the model/surface, input revision, generation configuration, and tool state
fixed enough to support that claim. If you cannot, write:
different outcome observed; cause not isolated.

Record:

    run-id | input revision | surface/model | changed variable | tool called? | file changed? | observed evidence | unknowns

The lab can be completed with a manually written simulation. An actual model run
is optional and must be labelled with its real evidence. A simulated tool result
is never an executed tool result.

## Part 3: Correct the unsafe completion claim

Start with:

> “The browser login succeeded, the tool returned completed, and the model said
> the change is done. Therefore the public repository was updated.”

Rewrite it as a claim ledger:

| Claim | Evidence needed | Current status | Safe next check |
|---|---|---|---|
| Browser authentication completed | Authentication stage and client token/session evidence |  |  |
| Action was authorised for this repository | Target, account/org scope, permission evidence |  |  |
| Tool executed the write | Tool invocation/result and target identifier |  |  |
| Intended object changed | Fresh read from the target or provider-side record |  |  |
| Change is acceptable | Diff/review/tests or human acceptance |  |  |

Do not fill an empty status with “probably.” Use `not_observed`, `blocked`,
`partial`, or `verified within scope` and explain the scope.

## Part 3A: Add one mechanism-level failure

Choose one of these synthetic, no-network cases and add it to the claim
ledger:

- **Schema pass, semantic fail:** a response has valid JSON and all required
  fields, but the referenced object does not exist. Add a business/state check.
- **Retrieval hit, missing exception:** a broad policy chunk is selected while
  the version-specific exception is absent. Add the query, filter, selected
  chunk, and missing-evidence fields.
- **Instruction-shaped data:** a README or tool result says to ignore the
  task's safety rule. Keep it as data, refuse the external side effect, and
  record the source and attempted influence.

The point is to name the exact layer that failed. A schema result, retrieval
hit, or visible string is not automatically proof of semantic correctness,
complete context, or authority. See the [LLM mechanism research](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md)
for the source-backed boundaries; this lab does not run a live provider.

## Part 4: Exercise the stop rule

Choose one harmless injected failure:

- report that the model is at capacity;
- report that a command has remained Working beyond the declared timebox; or
- report that a validation command requests a force reinstall.

Do not retry automatically. Write:

    state | visible symptom | current checkpoint | evidence captured | authority needed | smallest recovery action | unverified items

The correct recovery is usually to inspect the current state, preserve the
record, narrow the next check, or ask for authority. It is not to erase the
workspace, force-install dependencies, or send the next queued instruction.

These failure shapes are based on public reports in the
[Codex field-problems research](../../docs/research/field-problems-codex.md).
They are user evidence, not official root-cause confirmation, and this lab does
not claim a local reproduction.

## Evidence package

Submit one directory or Markdown record containing:

1. the fixed card version and run IDs;
2. the completed A-E boundary ledger;
3. the two context experiment rows and confounders;
4. the corrected claim ledger;
5. the stop/recovery record; and
6. a personal summary of no more than 150 words.

The summary must answer:

- What is the difference between model output and a tool result?
- What is the difference between a tool result and verified state?
- Why does a login, model name, Skill name, or completed message not prove
  authority or correctness?
- Which statement remains not_observed?

## Acceptance criteria

Pass only if:

- every fixed card has a reason, boundary, evidence, and stop point;
- Card C and Card E do not cause a real external write or notification;
- at least one statement is deliberately left unverified rather than guessed;
- the context experiment records a changed variable and any confounder;
- the failure exercise stops before destructive or unauthorised escalation; and
- the mechanism case identifies whether the gap is schema, context selection,
  instruction authority, execution, or verification; and
- a second reader can tell which events were simulated, observed, or not run.

The lab remains draft with run_status not_run until the project has a real run
record and independent review. A complete worksheet is evidence about the
learner's exercise, not evidence that every Codex product surface behaves the
same way.

## Transfer task

Take a fixed set of public sources and prepare a one-page research brief in a
disposable local file. Mark source text, user instructions, model suggestions,
local edits, and verification checks as separate layers. Add one source
containing an instruction-like sentence irrelevant to the brief. Record why it
is treated as data rather than authority. Do not browse, publish, or call an
external connector for this transfer unless you create a new task protocol with
explicit scope and confirmation.

## Sources and maintenance

- [Project terminology](../../CONTEXT.md) — stable boundaries for the lab.
- [OpenAI Codex official facts baseline](../../docs/research/openai-codex-baseline.md) — dated product facts and permission boundaries; checked 2026-08-09.
- [Codex real-user problem research](../../docs/research/field-problems-codex.md) — public reports, source links, and evidence labels; checked 2026-08-09.
- [LLM mechanism deep dive](../../docs/research/llm-mechanism-deep-dive-2026-08-10.md) — official-source-backed mechanism cards and failure experiments; checked 2026-08-10.
- [Chapter 1 — Understand GPT before you trust Codex](../chapters/01-gpt-and-codex-EN.md) — concept and field-case context for this lab.

This is an original exercise. It does not copy external prompts, logs,
credentials, or Skill instructions. Re-check volatile product facts before
using a live surface; status remains draft until the declared evidence exists.
