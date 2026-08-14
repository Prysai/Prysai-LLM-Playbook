<!-- content_id: project-readme | locale: EN | language: en | default_locale: EN | compatibility-entrypoint: github-default | canonical_source: README-EN.md -->

<p align="center">
  <img src="assets/readme/codex-field-guide-header.svg" alt="Codex: From First Task to Real Work — from problem to evidence" width="100%">
</p>

# Codex: From First Task to Real Work

> Learn a transferable method for turning a plausible answer into a bounded,
> checkable result—then practise it most deeply in Codex.

<!-- language-switcher:start -->
**Languages:** [English](README-EN.md) | [简体中文](README-ZH.md) | [Español](README-ES.md) | [日本語](README-JA.md) | [한국어](README-KO.md) | [Deutsch](README-DE.md) | 繁體中文（尚未提供）
<!-- language-switcher:end -->

[Start the recommended Codex path](#the-recommended-first-codex-path) · [Try the optional 15-minute warm-up](#optional-15-minute-warm-up-no-git-required) · [Read the full English guide](README-EN.md)

> **Status:** `candidate` · **Default language:** English · **Maintained by:** Prysai Lab

License: curriculum text and teaching assets are CC BY-NC 4.0 unless a file
states otherwise. See [`LICENSE`](LICENSE) and the [licensing boundary](docs/sources/licensing.md).

`README.md` is the short English GitHub entry. The detailed source is
[`README-EN.md`](README-EN.md). The project is a candidate: its structure and
static checks exist, but learner runs, transfer runs, repeated evaluations, and
independent review are still pending.

## What this is

This is an independent, book-shaped curriculum for working with language
models responsibly. It teaches one repeatable loop:

```text
define the task → choose a bounded action → inspect the result → keep evidence → state the limit
```

The stable method applies beyond one product. The deepest current practice is
the Codex track: files, tools, Skills, Agents, verification, and team adoption.
Platform-specific actions belong in evidence-gated adapters; this guide does
not claim that every platform behaves the same.

<mark>Do not stop at a plausible output.</mark> Ask what changed, what was
checked, and what remains unproven.

## The recommended first Codex path

If you opened this project to make a real local change with Codex, take one
sequence rather than choosing among the whole catalogue:

1. Read [Chapter 1](book/chapters/01-gpt-and-codex-EN.md) to separate a model,
   Codex, tools, Skills, Agents, and evidence.
2. Run [Lab 011](book/labs/lab-011-gpt-codex-boundaries-EN.md) to label what a
   static task card can and cannot establish about generation, execution,
   verification, and external effects.
3. Read [Chapter 2](book/chapters/02-first-safe-task-EN.md). If you do not
   have a disposable project yet, use the offline [First Safe Change fixture](book/routes/first-safe-change-EN.md)
   before choosing one reversible local file change.
4. Run [Lab 001](book/labs/lab-001-first-safe-task-EN.md): inspect first,
   edit `README.md` only after confirmation, then keep the diff, focused check,
   and an explicit unverified list.

This is the complete candidate L0 → L1 route. The fixture is a supplemental
bridge, not a chapter or Lab run. Labs 011 and 001 are
`draft / not_run`: they are candidate exercises, not evidence that beginners
complete them successfully. Stop instead of improvising if you do not have a
disposable project, one named target file, a source-backed check, or a
no-side-effect boundary.

The warm-up below is optional. It rehearses one evidence habit without setup;
it does not replace the local Codex task.

## Choose your starting point

| Your goal | Start here | Leave with |
|---|---|---|
| Make a first reversible local Codex change | [Recommended Codex path](#the-recommended-first-codex-path) | One mental model, one bounded task card, a small diff, a focused check, and an unverified list |
| Need a safe local file before using a project | [First Safe Change fixture](book/routes/first-safe-change-EN.md) | One intentionally failing README check, one scoped edit, and a modest local receipt |
| Rehearse the checking habit without a project | [Optional 15-minute warm-up](#optional-15-minute-warm-up-no-git-required) | One fictional message, three human checks, and a bounded receipt |
| Build a reliable request | [Chapter 3](book/chapters/03-task-protocol-EN.md) + [Lab 002](book/labs/lab-002-task-protocol-EN.md) | Goal, context, constraints, acceptance, stop, and recovery conditions |
| Practise language, research, or a small work task | [Beginner Practice Pack](book/communication-clinic-EN.md) | An attempt, focused correction, variation, and evidence boundary |
| Draft or check a first text-only request for any LLM surface | [Universal first-turn contract](docs/research/universal-first-turn-prompt-contract-2026-08-13.md) + [First-Turn Check](skills/prysai-first-turn-check/SKILL.md) | Six visible fields, two candidate cards, and a bounded before-send inspection |
| Start an unfamiliar task without handing over control | [Four-line safety card](book/communication-clinic-EN.md#four-line-safety-card) | Name allowed input, one action, inspectable evidence, and a stop condition before the task can widen |
| Inspect the whole curriculum | [Book guide](book/README-EN.md) + [table of contents](book/table-of-contents-EN.md) | Reading routes, chapter order, and lab boundaries |
| Contribute or find a file | [Project map](docs/project-map-EN.md) + [CONTRIBUTING.md](CONTRIBUTING.md) | Directory roles and the documented update path |

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

<a id="optional-15-minute-warm-up-no-git-required"></a>

## Optional 15-minute warm-up — no Git required

Use any chat model. The source message is already filled in, so your first job
is to judge one result rather than invent files, commands, or acceptance tests.

```text
You are revising a fictional short message. Do not use tools, files, browsing, or outside facts.

Source message:
"Hi, the workshop changed. It starts Friday at 10. Bring the draft. Tell me if you cannot come."

Rewrite it as a clear message to workshop participants. Preserve every fact in the source. Do not invent a calendar date, time zone, venue, deadline, sender, reason for the change, contact method, or any other detail. If a detail is missing, leave it unstated rather than guessing.

Return only the revised message. The reader will check it.
```

Before comparing with an example, record three independent judgments about
your answer: facts kept, action kept, and nothing invented. Mark each one
`PASS`, `FAIL`, or `UNSURE`. Keep the answer and the words that support each
judgment in your own chat; this repository does not receive them.

If one check fails, copy this rescue prompt:

```text
Keep the fictional source and your previous answer in view.

My first failed or uncertain check is: [paste check 1, 2, or 3 here].

Do three things only:
1. quote the words in your previous answer that caused the failure or uncertainty;
2. explain the mismatch in one sentence;
3. return one corrected message, changing only what is necessary.

Do not add any fact that is absent from the source. If the source does not contain a detail, leave it unstated rather than guessing.
```

<details>
<summary>Compare with one acceptable shape after you record your three checks</summary>

One acceptable shape is: “The workshop starts Friday at 10. Please bring your
draft. If you cannot attend, please reply.” Your wording may differ. This is
an illustration, not a score for your answer or evidence that you learned the
method.
</details>

The 15-minute label is a target; beginner completion time has not been measured.
Your receipt is deliberately modest: attempted; checked here; help used;
corrected; and not proven. This exercise records one checked attempt. It does
not prove learning, transfer, general writing ability, or model superiority.
For a real local Codex task, return to the
[recommended path](#the-recommended-first-codex-path): Chapter 1 → Lab 011
→ Chapter 2 → First Safe Change fixture → Lab 001. The [Beginner Practice Pack](book/communication-clinic-EN.md#first-practice-intake)
is a separate supplemental route for language, research, or a small work task.

If you are an authorised pilot participant, use the
[Field Report form](https://github.com/Prysai/Codex-Field-Guide/issues/new?template=field-report.yml)
to share a sanitized first-task observation. It is a private intake route, not
support, proof of a bug, or learner-outcome evidence; see the
[feedback contract](docs/quality/public-beta-feedback-contract-v1.md).

<!-- starter-task-contract:end -->

## What exists—and what does not

| Area | Current state | Not established |
|---|---|---|
| English chapters | 22 canonical sources | Reader learning, retention, or transfer |
| Labs | 18 labs, all `draft / not_run` | Learner runs and independent reruns |
| Skills | 14 project-owned `candidate` Skills | Broad trigger reliability or learner outcomes |
| Evaluation | 40 fixtures, `not_run / static_structure_only` | Scored executions and reviewer records |
| Locales | English source plus five migration routes | Complete, independently reviewed translations |
| Release | `candidate` | Public deployment, a release tag, or production readiness |

The [quality register](docs/quality/quality-register.md) is the active defect
ledger. Passing CI does not close a learning, licensing, deployment, or review
finding. The repository is private and no public Pages URL is established.

## Go deeper or contribute

- [Full English guide](README-EN.md): complete learning model, status detail, source boundaries, and maintenance workflow.
- [Universal-core route](book/routes/universal-core-foundations-EN.md): four mapped transferable units and their explicit gaps.
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
