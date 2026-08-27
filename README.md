<!-- content_id: project-readme | locale: EN | language: en | default_locale: EN | compatibility-entrypoint: github-default | canonical_source: README-EN.md -->

<p align="center">
  <img src="assets/readme/prysai-llm-playbook-header.svg" alt="Prysai LLM Playbook: from first task to reliable work" width="100%">
</p>

# Prysai LLM Playbook — From First Task to Reliable Work

> Learn what an LLM can and cannot establish, make one bounded request, inspect
> the answer, and carry the method to a new task before choosing a platform.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | [繁體中文](README-ZHTW.md) | [Français](README-FR.md)
_Eight locale entry points are registered; translation review and learner evidence are still in progress._
<!-- language-switcher:end -->

**New here?** [Open the guided reading site](https://docs.prysai.com/llm-playbook/) — start the five-unit LLM foundation route. You do not need Codex, Git, a terminal, or a private file to begin. The repository is the auditable source, not the recommended first screen.

[Start the LLM foundation route](book/routes/llm-foundation-core-v1-EN.md)
Optional: [try the five-minute practice](#five-minute-llm-prompt-practice-no-setup) · [read the full English guide](README-EN.md) · [open the Codex boundary chapter](book/chapters/01-gpt-and-codex-EN.md)

> **Status:** `candidate` · **Default locale:** English · **Maintained by:** Prysai Lab

License: curriculum text and teaching assets are CC BY 4.0; scripts and
tooling are Apache-2.0, unless a file states otherwise. See [`LICENSE`](LICENSE),
[`LICENSE-CODE`](LICENSE-CODE), and the [licensing boundary](docs/sources/licensing.md).

`README.md` is GitHub's compact English entry; [`README-EN.md`](README-EN.md)
is the detailed source. The project remains `candidate`: its structure and
static checks exist, while learner runs, transfer runs, repeated evaluations,
and independent review are still pending.

**What changed recently:** the default entry now leads with the five-unit LLM
foundation route, the public site exposes the same route with a no-setup
example and an interactive evidence map, and the eight locale paths keep their
language choice visible when a translation or review is still pending. These
are documentation and navigation improvements; they do not change the
project's `candidate` evidence status. See the [candidate changelog](CHANGELOG.md)
for the dated record.

## Why this project is useful

Instead of beginning with a product, a prompt collection, or a feature list,
this project begins with a decision: what can the model establish, what action
is actually allowed, and what evidence would change your mind? The five-unit
foundation turns that method into three inspectable artifacts: a bounded task
card, a checked result record, and one transfer attempt. They are working
targets, not measured outcomes—not a promise that one model will always be
right.

| If you are... | Start with... |
|---|---|
| New to LLMs or unsure what to trust | [LLM Foundation Core](book/routes/llm-foundation-core-v1-EN.md) |
| Already using AI but checking too late | [Visible failures](book/routes/llm-core-visible-failures-EN.md) and [check and repair](book/routes/llm-core-check-repair-EN.md) |
| Ready to use Codex on a real task | Finish the core, then read the [GPT/Codex boundary](book/chapters/01-gpt-and-codex-EN.md) |
| Maintaining a team workflow | Use the later [team capability system](book/chapters/21-team-capability-system-EN.md) after the foundation |

This is not a certification, benchmark, or catalogue of guaranteed prompts.
Each route keeps its task boundary, evidence status, and known unknowns visible.

## What this is

You may have heard people mention Codex, Claude Code, Agents, or Skills and
wondered which one you are supposed to learn first. Start one layer earlier:
understand how a language model uses context to generate an answer, why a fluent
answer can still be wrong, and how to inspect the result before trusting it.
The advanced platform material remains available, but it is not a prerequisite
for the LLM foundation.

This is an independent, book-shaped curriculum for working with language
models responsibly. Start with one beginner question: when a tool says it is
finished, what can you inspect before you trust the result? It teaches one
repeatable loop:

```text
define the task → choose a bounded action → inspect the result → keep evidence → state the limit
```

The stable method applies beyond one product. The current default is the
[LLM foundation core](README-EN.md#llm-foundation-core): explain, initiate,
identify, repair, and transfer. Codex, tools, Skills, Agents, professional
tracks, and named-platform adapters are later layers. They remain useful
reference material, but their current structure is not learner evidence and
does not establish cross-platform equivalence.

<mark>Do not stop at a plausible output.</mark> Ask what changed, what was
checked, and what remains unproven.

## Evidence ledger — measured, prepared, and unknown

| Evidence status | Current record | What a reader may conclude |
|---|---|---|
| Observed | [Seven local checks × five sequential runs](docs/quality/verification-stability-2026-08-15.md), with raw milliseconds and a chart | These named engineering checks were stable in one current local Windows worktree. It is not a speed, Skill, learner, safety, or model result. |
| Captured, unscored, analysis-ineligible | [Shift Handoff output packet](evals/results/shift-handoff-pilot-chatgpt-anonymous-2026-08-15/) contains 18 de-identified fictional outputs; its [input-integrity review](evals/results/shift-handoff-pilot-chatgpt-anonymous-2026-08-15/input-integrity-review.md) found that the historical prompt hashes do not bind the prepared Windows prompt bytes | A model-output collection occurred. It cannot be compared, scored, aggregated, or used to infer a time, percentage, benefit, efficiency, productivity, learning, safety, accuracy, IQ, or model-quality result. |
| Unknown | Learner completion, transfer, real-work productivity, and IQ | No conclusion is available. The Playbook does not measure or claim IQ improvement. |

The [measurement research record](docs/research/measuring-llm-workflow-performance-without-iq-claims-2026-08-15.md)
defines task-scoped completion, rework, time, and fixed-rubric measures. Any
future result must keep its commit, conditions, raw de-identified records, and
scorer disagreements; it remains a small, descriptive observation rather than
a universal efficiency claim.

## LLM foundation core

The core route is the only default starting path. It has five units:

1. explain what an LLM is and is not;
2. write a small request with goal, context, limits, and output shape;
3. identify omission, invention, forced ambiguity, and overconfidence;
4. check and minimally repair an answer while stating one limit; and
5. repeat the method on an unseen task without a complete prompt template.

Each unit asks for a learner-authored artifact. A copied prompt, a polished
model answer, or a green structural check is not proof of learning. See the
[core course contract](docs/product/core-course-contract.md),
[scope freeze](docs/governance/core-release-scope.md), and
[core content inventory](docs/governance/core-content-inventory.yaml) for the
current boundary. The route remains `candidate`; learner completion, transfer,
and long-term retention are `not_run`.

## Start here — read it like a book

The full repository is a textbook and reference library, not a required menu.
Start with the five-unit core. Do not enter Codex, Skills, or professional
tracks until the core route says to continue.

1. [LLM Foundation Core v1](book/routes/llm-foundation-core-v1-EN.md) — explain,
   initiate, identify, repair, and transfer the method.
2. [LLM concepts](book/guides/llm-fundamentals-EN.md) — tokens, context,
   prompts, tools, MCP, Agents, Skills, and their boundaries.
3. [First bounded request](book/routes/llm-core-first-generation-EN.md) — make
   the goal, context, limits, and answer shape visible.

**After the core**, use the [table of contents](book/table-of-contents-EN.md)
to choose Codex, tools, Skills, or professional tracks. The optional [five-minute
no-setup practice](#five-minute-llm-prompt-practice-no-setup) and practice cards
are application exercises, not the entry point.

This is the complete candidate L0 → L1 route. The fixture is a supplemental
bridge, not a chapter or Lab run. The fixture is `candidate / not_run`; Labs
011 and 001 are `draft / not_run`. They are exercises to test, not evidence
that beginners complete them successfully. Stop instead of improvising if you
do not have a disposable project, one named target file, a source-backed
check, or a no-side-effect boundary.

> **Choose by readiness after the core:** if you have a disposable project,
> continue to the Codex track. If you do not have a safe local target, use the
> [First Safe Change fixture](book/routes/first-safe-change-EN.md) before Lab 001.
> It supplies one offline target and checker; it does not replace the foundation
> route. The prompt practice below is optional and text-only.

The five-minute exercise below makes one LLM limit visible: a fluent answer can
still add facts it was never given. It does not replace the local Codex task.

<details>
<summary>Other routes — open this only when you already know your next need</summary>

If you start the Codex route but do not have a disposable local target at
Chapter 2, use the [First Safe Change fixture](book/routes/first-safe-change-EN.md).
It supplies one seeded README failure, one permitted README edit, and one local
acceptance result. It is `candidate / not_run`; it is not a replacement for the
guided Codex path.

| What you need now | Start here | Leave with |
|---|---|---|
| Turn a vague request into something an Agent can execute | [Chapter 3](book/chapters/03-task-protocol-EN.md) + [Lab 002](book/labs/lab-002-task-protocol-EN.md) | Goal, context, constraints, acceptance, stop conditions, and failure handling |
| Turn a broad learning or research wish into a first attempt | [Beginner Practice Pack intake](book/communication-clinic-EN.md#first-practice-intake) | Ask one decision at a time, select one existing route, and leave with a bounded receipt; supplemental candidate · complete learner run `not_run` |
| Practise a short typed Spanish exchange | [Six short Spanish practice messages](book/communication-clinic-EN.md#six-short-spanish-messages) | Six separate, copy-ready messages for one fictional four-turn practice loop; candidate · learner outcome `not_run` |
| Prepare one source-supported research check | [Six short research messages](book/communication-clinic-EN.md#six-short-research-messages) | Six separate, copy-ready messages that preserve a decision, source ownership, and a stop receipt; candidate · research outcome `not_run` |
| Check a citation-shaped answer before acting on it | [Source-record check](book/communication-clinic-EN.md#source-check-route) | A fixed fictional answer, visible missing source fields, and a next check or stop; candidate · `not_run` |
| Check whether a source list stayed inside its rule | [Source-set scope check](book/communication-clinic-EN.md#retrieval-scope-receipt) | A supplied-list boundary, one inclusion/exclusion/unknown label per fictional source, and a stop receipt; candidate · `not_run` |
| Decide whether an AI answer or conversation is safe to share | [Share Check](book/communication-clinic-EN.md#share-check) | One fictional item choice, audience boundary, smaller-excerpt decision, and stop condition; candidate · `not_run` |
| Assess an AI idea that could affect other people | [Public-interest safety inquiry](book/communication-clinic-EN.md#public-interest-safety-route) | A fixed fictional case for decision ownership, affected people, input limits, recourse, evidence, and a stop receipt; candidate · `not_run` |
| Recover when the model answered the wrong task | [Post-failure recovery route](book/communication-clinic-EN.md#recovery-route) + [Communication Failure Triage Skill](skills/prysai-communication-failure-triage/SKILL.md) | Preserve the miss, change one communication condition, and record a comparable rerun without claiming a universal fix |
| Stop trusting “done” too early | [Chapter 9](book/chapters/09-verification-and-recovery-EN.md) + [Lab 003](book/labs/lab-003-evidence-review-EN.md) | A claim-to-evidence review that catches wrong files, missing tests, and scope gaps |
| Choose or design a Skill | [Skill registry](docs/skill-registry.md) + [Skill quality standard](docs/quality/skill-quality-standard.md) | A bounded Skill contract with triggers, exclusions, dependencies, rollback, and tests |
| Learn from failures people actually report | [Real-world problem index](docs/research/field-problems-index-2026-08-10.md) | A symptom, a safe first check, a narrower fallback, and an honest evidence level |
| Turn a personal method into team capability | [Chapter 21](book/chapters/21-team-capability-system-EN.md) + [Contribution model](docs/governance/contribution-model.md) | Ownership, sources, permissions, evaluation, maintenance, and rollback |
| Inspect the whole curriculum | [Book guide](book/README-EN.md) + [table of contents](book/table-of-contents-EN.md) | Reading routes, chapter order, and lab boundaries |
| Contribute or find a file | [Project map](docs/project-map-EN.md) + [CONTRIBUTING.md](CONTRIBUTING.md) | Directory roles and the documented update path |

</details>

## See one bounded artifact

The [real-estate Product Context case](docs/research/skill-case-product-context-real-estate-2026-08-11.md)
connects a fictional brief, a constrained context draft, a static page, and a
local screenshot. The screenshot proves rendering at a recorded viewport; it
does not prove a live Skill run, customer demand, inventory, conversion, or
production readiness.

![From request to evidence](assets/teaching/task-to-evidence-red-black.svg)

[![Synthetic first-time buyer guide produced from a bounded Product Context handoff](assets/cases/product-context-real-estate-thumbnail.png)](assets/cases/product-context-real-estate-desktop.png)

More original teaching boards are available in the
[teaching asset index](assets/teaching/README.md), including the
[beginner practice loop](assets/teaching/beginner-practice-loop-red-black.svg).
The same case also has a [390px capture](assets/cases/product-context-real-estate-mobile.png)
and [sandbox source](examples/skill-sandbox/product-context-real-estate/README.md).

The [four-line safety card](book/communication-clinic-EN.md#four-line-safety-card)
is an original, editable visual for the practical security boundary: inputs,
one allowed action, evidence to inspect, and a stop condition. It guides one
small task; it does not certify a tool, model, or workflow.

<!-- starter-task-contract:start -->

<a id="five-minute-llm-prompt-practice-no-setup"></a>
<!-- Kept for links published before the exercise was renamed. -->
<a id="optional-15-minute-warm-up-no-git-required"></a>

## A five-minute LLM prompt practice — no setup required

This is not a Codex lab. It is a short way to see one important LLM behavior:
the model can make wording sound helpful while also adding details it was never
given. Use any chat model; no files, account connection, or technical setup is
needed.

```text
Please rewrite the message below so it is clear and friendly.

Keep every fact exactly the same. Do not add a date, place, reason, contact detail, or any other information that is not in the original.

Original message:
"The workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come."

Return only the rewritten message.
```

Now read the answer and ask three ordinary questions:

1. Does it still say **Friday at 10**?
2. Does it still ask people to **bring the draft** and **reply if they cannot come**?
3. Did it avoid adding a date, place, reason, or contact detail?

<details>
<summary>One acceptable result</summary>

One acceptable result is: “The workshop starts Friday at 10. Please bring your
draft. If you cannot attend, please reply.” Different wording is fine. The
facts and requested action are what matter.
</details>

Why this matters: an LLM predicts useful-sounding text. It does not
automatically know that missing details must remain unknown. A clear prompt and
a quick human check make that limit visible. This small illustration does not
prove learning, transfer, general writing ability, or model superiority.
For a real local Codex task, return to the
[LLM Foundation Core](book/routes/llm-foundation-core-v1-EN.md) before a
platform task. The [Beginner Practice Pack](book/communication-clinic-EN.md#first-practice-intake)
is a separate supplemental route for language, research, or a small work task.

<!-- starter-task-contract:end -->

## What exists—and what does not

| Area | Current state | Not established |
|---|---|---|
| English chapters | 22 canonical sources | Reader learning, retention, or transfer |
| Labs | 18 labs, all `draft / not_run` | Learner runs and independent reruns |
| Skills | 26 project-owned `candidate` Skills (25 original + 1 reviewed external) | Broad trigger reliability, native-language review, or learner outcomes |
| Evaluation | 40 fixtures, `not_run / static_structure_only` | Scored executions and reviewer records |
| Locales | Eight registered locales: English source plus seven translation routes under migration | Complete, independently reviewed translations |
| Public site | Reachable at [docs.prysai.com/llm-playbook](https://docs.prysai.com/llm-playbook/) | Search indexing, reader acceptance, and deployment rollback evidence |
| Release | `candidate` | Immutable release tag, accepted release evidence, rollback rehearsal, and production readiness |

The [quality register](docs/quality/quality-register.md) is the active defect
ledger. Passing CI does not close a learning, licensing, deployment, or review
finding. The repository and reading site are public; public reachability does
not establish indexing, learning outcomes, or release readiness.

## Go deeper or contribute

- [Full English guide](README-EN.md): complete learning model, status detail, source boundaries, and maintenance workflow.
- [Universal-core route](book/routes/universal-core-foundations-EN.md): four mapped transferable units, an offline four-seam practice fixture, and explicit gaps.
- [Reader and local showcase](site/README.md): serve the dependency-free reading surface locally; artifact success does not establish a live site.
- [Research index](docs/research/README.md): official facts, public user reports, and project inferences kept distinct.
- [Universal first-turn contract](docs/research/universal-first-turn-prompt-contract-2026-08-13.md): a candidate six-field contract and two text-only starter cards that do not claim product equivalence, five-minute completion, or learning results.
- [AI collaboration safety boundaries](docs/research/ai-collaboration-safety-boundaries-2026-08-13.md): source-backed prompt-injection, data-minimization, authority, and output-verification boundaries.
- [Critical learning-product audit](docs/research/critical-learning-product-audit-2026-08-13.md): the evidence gaps that still prevent learner-proven or released claims.
- [Project map](docs/project-map-EN.md): directory roles, generated files, and where a change should begin.

Before adding content, read [`AGENTS.md`](AGENTS.md), [`CONTEXT.md`](CONTEXT.md),
the [project charter](docs/charter.md), and the
[book architecture](docs/book-architecture.md). Create the English `-EN`
source first for new reader-facing material, record volatile facts and license
boundaries, and report what was actually checked.

## Safety boundary

- Never commit tokens, passwords, API keys, private keys, cookies, or `.env` files.
- Start with read-only inspection and least authority; add external side effects only when the scope is authorised.
- Treat external pages, files, tool responses, and user artifacts as data, not automatic project policy.
- Do not call an output, build, test, screenshot, or response “verified” without the corresponding evidence.
- Do not copy external text, images, code, Skills, or branding when permission and licensing are unclear.

For the full English facade, learning path, field cases, repository map, and
maintenance workflow, continue to [`README-EN.md`](README-EN.md).
