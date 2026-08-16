# User-declared context continuity after corrections: public-friction source receipt

**Status:** candidate research record / `not_run`
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Owner:** curriculum-maintainer
**Next review:** 2026-09-15, or before this record is used to describe a
ChatGPT feature, introduce a continuity workflow, run a learner exercise, or
make an effectiveness claim.

## Research question and narrow scope

What do a small number of recent, traceable public feature requests reveal
about the *user-declared* information a beginner may want to review after a
long chat contains corrections, rejected ideas, or changed constraints?

This receipt records three individual signals from public threads on the
OpenAI Developer Community. It is not an investigation of ChatGPT internals,
conversation retention, context selection, memory, summarization, export,
thread creation, or response behavior. No account, chat, model call,
transcript, user study, browser interaction, or local reproduction was used.

The word `context` in this record describes the authors' requests and the
learner-visible material they proposed reviewing. It does not name or expose a
model's internal state.

## Overlap check

Before selecting this slice, this research checked
[the field-problems index](field-problems-index-2026-08-10.md) and the recent
source receipts in `docs/research/`. They already cover, among other topics,
long-task interruption checkpoints, recurring-work handoffs, shared-link
scope, capacity reports, prompt shaping, source checks, and learner-outcome
claim boundaries.

Those records do not use the three canonical thread IDs in the ledger below.
This receipt therefore does not repeat their source reports. Its deliberately
narrow delta is **how a user describes corrections, rejected material, and
unresolved items when preparing a reviewable continuation boundary**. It does
not add a named-product procedure or conclude that any existing route is
insufficient.

## Evidence classes and limits

| Evidence class | Meaning here | Does not establish |
| --- | --- | --- |
| `public user report` | A person made a dated request or described a concern in a public Community thread. | A product fact, platform behavior, cause, defect, prevalence, representative user need, or user outcome. |
| `project integration question` | An original Prysai question about where a bounded teaching pattern might fit. | A new Skill, an admitted curriculum change, a mechanism, or a successful intervention. |
| `not_run` | No Prysai participant, model, account, chat, or product operation was observed. | Reliability, safety, continuity, learning, productivity, recovery, or transfer. |

Three threads are still three individual signals. Shared vocabulary across
posts does not make the reports independent measurements or prove that the
described concern affects another person, plan, product surface, model, or
time period. The posts do not establish that their authors are beginners;
"beginner" is only the intended curriculum-integration audience, not a source
finding.

## Traceable public signals

| ID | Evidence class and source | Canonical URL and access date | Narrow signal retained | Individual-signal limitation |
| --- | --- | --- | --- | --- |
| U1 | `public user report`; original post on the OpenAI Developer Community, titled *Feature Suggestion: Drift Detection & Instruction Integrity Tools* (posted 2026-07-03). | [Community thread U1](https://community.openai.com/t/feature-suggestion-drift-detection-instruction-integrity-tools/1385598), accessed 2026-08-15. | One author requested a visible way to compare a response with previously declared rules or constraints. | The request does not demonstrate that a response drifted, identify a product mechanism, show a common problem, or show that a comparison would help. |
| U2 | `public user report`; original post on the OpenAI Developer Community, titled *Feature request: Exportable, auditable context checkpoints for long conversations* (posted 2026-06-28). | [Community thread U2](https://community.openai.com/t/feature-request-exportable-auditable-context-checkpoints-for-long-conversations/1385175), accessed 2026-08-15. | One author requested an editable, human-reviewable checkpoint for a long conversation, including a way to distinguish retained information from corrections and open questions. | The request does not document what a product currently retains, exports, omits, summarizes, or makes available; it also does not establish a user outcome. |
| U3 | `public user report`; original post on the OpenAI Developer Community, titled *Feature request: Compact long ChatGPT conversations into a clean new thread* (posted 2026-05-30). | [Community thread U3](https://community.openai.com/t/feature-request-compact-long-chatgpt-conversations-into-a-clean-new-thread/1382084), accessed 2026-08-15. | One author requested a clean continuation that separates active material from decisions or claims the author regards as superseded or invalidated. | The request does not prove that old material remains active, that a clean continuation is available, or that any separation improves correctness, efficiency, or safety. |

The source pages and their metadata were reachable on the stated access date.
Thread visibility, thread status, post counts, moderation state, and any later
product change are not treated as evidence in this receipt.

## Route mapping and candidate integration question

Three existing Prysai routes are adjacent but own different seams:

| Existing route | What it already owns | Boundary relative to these signals |
| --- | --- | --- |
| [Communication Failure Triage](../../skills/prysai-communication-failure-triage/SKILL.md) | A preserved response mismatch, direct evidence, one minimal repair, and a controlled rerun. | It starts after a concrete request/reply mismatch is available; it does not prepare a list of earlier corrections before a new conversation turn. |
| [Interruption Checkpoint](../../skills/prysai-interruption-checkpoint/SKILL.md) | The first safe decision after a visible interruption and an unclear completion state. | It preserves the last inspectable artifact; it does not classify a series of earlier facts as active, superseded, or unresolved. |
| [Shift Handoff](../../skills/prysai-shift-handoff/SKILL.md) | A stable card and one current item for recurring, text-only work. | It separates stable criteria from a changing item and explicitly makes no memory claim; it does not provide a dedicated correction-and-reversal receipt for a long chat. |

This creates a **candidate integration question**, not a new route: would an
offline, user-authored *continuity receipt* help a learner prepare supplied
material before a fresh, separately authorized task? If later evaluated, the
smallest possible receipt could contain only:

```text
active user-supplied facts and constraints:
corrections, rejected ideas, or superseded items:
unresolved or unknown items:
one next low-risk action:
```

The fields would be learner-authored labels for visible material. The receipt
would not be a model-context export, a source of truth for a product, a repair
of a chat, a record of hidden state, or a permission to send a new prompt.
It is intentionally not introduced as a Skill, exercise, product feature, or
claim of a curriculum gap resolved.

## Explicit non-claims

This source receipt does **not** establish that:

- ChatGPT, another OpenAI product, or any other LLM retains, loses, compresses,
  retrieves, summarizes, exposes, or follows any particular information in a
  conversation;
- a visible transcript differs from a model's working material, or that a
  correction, retraction, negation, constraint, rejected idea, or source has
  any particular technical effect;
- U1, U2, or U3 describe a defect, current feature set, support position,
  security property, privacy property, common beginner problem, or a need
  shared by a user population;
- a checkpoint, handoff, comparison, compacted thread, or continuity receipt
  prevents an error, preserves information, detects drift, restores work,
  improves an answer, reduces effort, or improves learning; or
- any learner can create, understand, use, or transfer the candidate receipt
  successfully.

The threads also do not provide a valid basis for medical, legal, financial,
employment, educational-assessment, privacy, security, or records-retention
advice.

## Source and reuse boundary

This is original Prysai wording. It preserves only each source's public title,
date, canonical URL, and a minimal factual description of the author's
feature request. It does not copy post prose, examples, proposed interface
text, screenshots, product assets, code, account data, transcripts, personal
details, credentials, or instructions from the threads.

The linked Community pages remain reference-only material under their owners'
terms. This receipt adds no external asset, dependency, account requirement,
or license grant to the Playbook. It does not alter
`docs/sources/asset-register.md`; no external material is imported or reused
as a project asset.

## Stop receipt and review trigger

- `research_status`: `candidate`
- `local_reproduction`: `not_run`
- `learner_evidence`: `not_run`
- `product_behavior_evidence`: `not_run`
- `curriculum_change`: `not_proposed`
- `next_smallest_check`: Before any reader-facing change, define one fictional,
  text-only receipt with a scoring rule and independent review plan. Do not
  open a chat, use an account, upload material, or collect participant data
  under this source receipt.
- `review_trigger`: Recheck the canonical threads before citing them again, and
  obtain a separately scoped official source before stating any named-product
  capability or limitation.
