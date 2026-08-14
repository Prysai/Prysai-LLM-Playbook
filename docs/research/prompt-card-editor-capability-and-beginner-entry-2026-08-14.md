<!-- content_id: prompt-card-editor-capability-and-beginner-entry-2026-08-14 | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-14 -->

# Prompt Card Editor: evidence boundary and one beginner entry

**Record label:** 2026-08-14
**Status:** `candidate` research record; the project-authored textual Prompt
Card Editor Skill and its proposed card schema exist. No local card-editor UI
or preview has been implemented, no card has been sent to a model, and no card
has been tried by a learner.
**Owner:** curriculum-maintainer
**Next review:** 2026-09-14, or before an editor is implemented, an external
card is imported, a card is presented as a learner intervention, or a
product-specific claim is made.

## Question and scope

Should this project add a **Prompt Card Editor**: a project-authored,
human-editable form for saving a small, low-risk request and its inspection
receipt? If so, which fields need to be visible to make a reusable card easier
to review without claiming that a model will follow it or that a learner will
benefit from it?

In this record, a *prompt card* is a short request record for a person to
inspect, revise, and optionally copy into a product themselves. It is **not**
a model feature, Skill, tool, Agent, authorization grant, product adapter,
execution log, or evidence that an action occurred. A card becomes
out-of-scope for this proposed editor when it needs access to a file, account,
connector, browser, code runner, private record, real person, payment,
publication, high-stakes decision, or other external side effect. Such work
must move to a route with an explicit authority and evidence boundary.

The narrow design question is about ordinary text-only drafting. It does not
ask whether one wording is better than another, whether an LLM can teach a
skill, or whether different vendors interpret the same request alike.

## Evidence classes and claim boundary

| Evidence class | Use in this record | It does not establish |
| --- | --- | --- |
| official fact | A source owner's product-scoped guidance on prompt instructions, context, response shaping, and evaluation. | A rule for another product, a required editor schema, correct output, or learning benefit. |
| public user report | One author's visible description of an interaction friction. | Prevalence, a root cause, product behavior, a supported fix, or a learner need. |
| local reproduction | None; `not_run`. | Any editor behavior, model response, user result, or accessibility result. |
| project inference | A conservative, inspectable card schema and publication boundary. | That the schema is necessary, sufficient, effective, secure, or ready to ship. |
| not-established claim | A claim for which the reviewed material provides no direct support. | A reason to silently convert a desired feature into a fact. |

The official sources are owned by different organizations and describe their
own products. Reading them together does not make their models, interfaces,
accounts, tools, context behavior, data controls, availability, or results
equivalent.

## What the reviewed first-party guidance supports—and does not

Within their separate product scopes, the three official pages discuss making
instructions specific, supplying relevant context or examples, shaping the
requested response, and evaluating prompt behavior. Anthropic additionally
asks an author to define success criteria and a test before prompt
optimization. Those are official, product-scoped facts recorded in the source
ledger below.

They support this narrow **project inference**: a reusable beginner card is
more reviewable when a reader can point to a small outcome, the material the
request may rely on, the response wanted, and the check to apply before calling
the reply useful.

They do **not** prescribe a universal prompt-card form, guarantee that a model
will observe a field, show that a card improves a prompt, or establish learning
or productivity results. The first-party prompt pages reviewed here also do
not establish that an editor must record card origin or license; those fields
come from this project's publication and rights boundary, not from model
performance evidence.

## Two narrowly retained public signals

The following public pages returned ordinary public web responses when accessed
on 2026-08-14. Their content remains with the original publishers. This record
uses only original, narrow summaries; it copies no forum prose, prompt,
screenshot, attachment, account information, or configuration.

| ID | Public report | Narrow signal retained | It does not establish |
| --- | --- | --- | --- |
| R1 | OpenAI Developer Community, [Long instruction prompt on short input data][R1] | One author raised a recurring interaction in which stable instruction material is much longer than the changing input. | A context-window diagnosis, a memory claim, a cost claim, prevalence, or an editor remedy. |
| R2 | GitHub Community, [Reducing out-of-context queries to the LLM][R2] | One author raised concern about requests being separated from the context needed to answer them. | A product defect, a general LLM behavior claim, frequency, or a validated workflow. |

**Conservative implication:** a card editor may help a person distinguish what
is stable, what is supplied for this turn, and what answer is requested. That
is a review aid, not a cure for missing context, persistence, or response
quality.

## Candidate field decision

The table is a proposed project schema, not a vendor requirement. `Required`
means required for a **shared or published project card**. A private scratch
draft may remain incomplete, but the editor should visibly mark missing fields
rather than invent them.

| Field | Candidate editor treatment | Basis | Boundary |
| --- | --- | --- | --- |
| **Bounded outcome** | Required. Ask for one observable session result, not a broad aspiration. | Official guidance and project inference. | It does not promise completion, mastery, fluency, or usefulness. |
| **Supplied context** | Required. Separate material supplied now from facts the model must not assume. | Official guidance and R1/R2 as narrow friction signals. | It does not make the material accurate, sufficient, private, or persistent across turns. |
| **Requested response** | Required. State a response shape, size, sequence, or decision needed. | Official guidance and project inference. | It does not make the response correct, complete, or compliant. |
| **Limits / action boundary** | Required. State excluded data, forbidden actions, and whether the card is text-only. | Project safety boundary; prompt guidance supports visible constraints but does not itself grant authority. | A field cannot create consent, product permission, privacy, or a safe external action. |
| **Check** | Required. Name what to compare, ask, or verify before accepting a reply. | Official evaluation guidance and project inference. | A self-check, confidence label, or citation-shaped answer is not verification. |
| **Receipt** | Required. Save the prompt version, response status, unresolved item, and next safe action or stop. | Project inference. | It is not proof of a model run, task completion, learning, or transfer. |
| **Version** | Required for a saved reusable card; record a stable card ID, revision, and what changed. | Project reproducibility inference. | Versioning does not prove that the new text is better or tested. |
| **Origin** | Required before sharing, importing, or publishing. Use a controlled value such as `self-authored`, `project-authored`, `adapted-with-documented-permission`, or `reference-only-not-reusable`. | Project provenance rule. | An origin label is not a copyright license, permission, or quality mark. |
| **License** | Required before sharing, importing, or publishing. Record the applicable project license or a documented external license/permission; block publication when it is unknown. | Project rights rule. | It does not settle legal questions or authorize a use outside the stated terms. |

### Why version, origin, and license are conditional

A beginner writing one unsent personal draft does not need a licensing lecture
before learning to name an outcome and a check. The editor can default such a
draft to `origin: self-authored` and `license: not declared for publication`.

The stricter fields become necessary when a card is saved as project material,
shared with others, generated from another record, or imported from an external
project. At that point another person needs to know which revision they are
reviewing and whether the text is reusable. This is a documentation and rights
control, not a claim about model effectiveness.

## Candidate capability boundary

If implemented later, the smallest responsible capability is a **local card
editor and preview**, not a prompt-execution assistant:

1. It lets a reader enter the nine fields above and shows `visible`, `missing`,
   `unclear`, or `out_of_scope` beside each one.
2. It exports only the reader-authored text and a compact receipt; it does not
   send a request to an LLM, browser, account, connector, or remote service.
3. It keeps a card in `draft` until required shared-card fields are present.
   It must not silently add facts, sources, constraints, or license terms.
4. It prevents a card marked `reference-only-not-reusable` or
   `license: unknown` from being offered as a copy-ready shared template.
5. It displays a stop notice when a user adds private data, a target system,
   an external action, or a high-stakes decision. The notice routes the work to
   an appropriate authority-aware workflow; it does not diagnose or solve the
   new task.

This candidate boundary deliberately gives the editor no hidden model call,
account access, automatic safety judgment, data-retention claim, publishing
authority, or quality score. Those capabilities would require a separate
product specification, privacy review, implementation evidence, accessibility
testing, threat analysis, and controlled user evaluation.

## One original beginner card entry

The entry below is project-authored and intentionally non-product-specific. It
is a low-risk drafting exercise, not an instruction copied from a vendor or
community source. It gives a novice a visible first use of each field without
claiming the response is correct.

```text
card_id: beginner-ordinary-message-revision
title: Revise one ordinary message without adding facts
status: proposed / not_run
version: 0.1
origin: project-authored
license: CC BY-NC 4.0 (project teaching material)

bounded outcome:
  Turn the supplied three fictional notes into one friendly message of no more
  than four sentences.

supplied context:
  - The meeting starts at 3:00 p.m.
  - I will arrive about ten minutes late.
  - I will bring the printed notes.

requested response:
  Write one draft message. Then list, separately, every detail you added that
  was not in the notes.

limits / action boundary:
  Use only the supplied notes. Do not browse, contact anyone, make a decision
  for me, claim the message was sent, or include personal information.

check:
  Show two lists: `preserved facts` and `added or uncertain details`. If a fact
  is missing or changed, say `needs revision` instead of guessing.

receipt:
  Stop after one draft and the two lists. Keep the draft, the check result, and
  one next action: revise it myself, ask a person, or stop.
```

### What this entry can and cannot show

If an authorized future learner run records the card and response, it could at
most show that a participant attempted one specified drafting exchange in one
declared environment. It would not show that the message is appropriate,
accurate, delivered, understood, safe, legal, private, persuasive, or useful;
that the learner understands prompt design; or that the method transfers to a
new task. No such run exists for this record.

## Evidence needed before implementation or effectiveness claims

Before an editor moves from proposal to implementation, define its data flow,
local-versus-remote storage, export behavior, publication controls, keyboard
and screen-reader behavior, error handling, and proof that a `reference-only`
card cannot be misrepresented as reusable. Verify the implementation against
that specification.

Before claiming a learning or prompt-quality benefit, run an authorized,
consented evaluation with a declared beginner population, original inputs,
fixed low-risk tasks, retained card revisions and receipts, independent review
criteria, and a later unseen transfer task. Compare completion and error
patterns against a stated baseline. No model evaluation, learner run, transfer
task, independent review, or accessibility evaluation was performed here.

## Explicit non-claims

This record does **not** establish that:

- a Prompt Card Editor should be built, is valuable, or is ready for release;
- its fields are universal, optimal, complete, or interpreted consistently by
  OpenAI, Anthropic, Google, Microsoft, Meta, or any other provider;
- a visible outcome, context, response request, constraint, check, or receipt
  causes a model to follow a request or produce a correct result;
- the two public reports are common, current, reproducible, product defects,
  or fixed by a card editor;
- the beginner card improves writing, communication, learning, safety,
  productivity, source quality, retention, or transfer; or
- a version, origin, or license field proves authorship, permission, legal
  compliance, quality, security, privacy, or a completed task.

## Source and rights ledger

All pages below were accessed on **2026-08-14** (America/Los_Angeles). The
official pages are volatile and scoped to the owner’s documented products. The
public reports are individual public statements, not product documentation.
This is an original Prysai Lab synthesis. It copies no external prose, prompt,
example, code, image, screenshot, attachment, identity, credential, account
setting, or configuration.

| ID | Evidence class | Source owner and URL | Accessed | Scoped use in this record | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI, [Prompt engineering][O1] | 2026-08-14 | Product-scoped discussion of instructions, context, examples, response guidance, and prompt evaluation. | A universal schema, another product's behavior, correctness, or a user benefit. |
| O2 | official fact | Anthropic, [Prompt engineering overview][O2] | 2026-08-14 | Product-scoped guidance to define success criteria and an empirical test before prompt optimization. | A required card field, cross-platform equivalence, or a valid learner assessment. |
| O3 | official fact | Google AI for Developers, [Prompt design strategies][O3] | 2026-08-14 | Product-scoped guidance on direct, specific instructions, context, and examples. | A model response, persistent context, source correctness, or effectiveness of this card. |
| R1 | public user report | OpenAI Developer Community, [Long instruction prompt on short input data][R1] | 2026-08-14 | One author's reported stable-instruction/changing-input concern. | Cause, frequency, a vendor behavior claim, or a supported remedy. |
| R2 | public user report | GitHub Community, [Reducing out-of-context queries to the LLM][R2] | 2026-08-14 | One author's reported concern about inadequate context around a query. | A product defect, prevalence, diagnosis, or an editor outcome. |
| P1 | project inference | This record's field table and proposed local editor boundary | 2026-08-14 | Candidate design for an inspectable, non-executing project capability. | Need, efficacy, usability, security, or production readiness. |
| L1 | local reproduction | None; `not_run` | 2026-08-14 | Records that no model, editor, learner, or external action was used. | Any behavior or outcome result. |

[O1]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O2]: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
[O3]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[R1]: https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381
[R2]: https://github.com/orgs/community/discussions/67504
