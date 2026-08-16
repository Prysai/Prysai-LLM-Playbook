# Prompt-based language practice and source-aware web research: source receipt

**Status:** research candidate; `not_run`

**Accessed:** 2026-08-16 (America/Los_Angeles)

**Owner:** Prysai Lab curriculum maintainer

**Next review:** 2026-09-16, or before this record is used to make a
product-specific statement, publish a reader-facing exercise, or report a
learner, source-quality, safety, or workflow outcome.

## Question and deliberately narrow scope

What can high-trust source-owner material support for two beginner activities
that use ordinary text prompts?

1. A learner writes a short, fictional language response, receives limited
   feedback, and retains their own attempt for later inspection.
2. A learner uses an LLM-enabled research surface or an LLM to prepare a web
   research plan, then distinguishes a visible citation from the source set
   and evidence actually available for review.

This receipt concerns the design of a **candidate practice boundary**, not the
effectiveness of an LLM tutor, a browsing tool, a prompt, or a course. It does
not test a model, use an account, collect participant data, retrieve web
results, evaluate citations, or compare products. It excludes voice and
pronunciation assessment, placement or certification, sensitive personal data,
uploads, code execution, and legal, medical, financial, employment, or other
consequential decisions.

## Evidence classes and claim boundary

| Evidence class | Use here | It does not establish |
| --- | --- | --- |
| official instructional guidance | A source owner describes instructional practices or information-literacy frames. | That an LLM implements those practices, or that this activity improves learning. |
| official product guidance | A product owner documents a prompt or web-search surface. | Cross-product equivalence, a current feature on another surface, answer correctness, or user outcomes. |
| project inference | Prysai turns the bounded observations into a small, inspectable activity shape. | That the activity works, is safe, or is ready for publication. |
| `not_run` | No local model, learner, retrieval, or source-check activity occurred. | Any behavior, quality, speed, learning, retention, transfer, or safety result. |

## What the source record supports — and only that

### A. Short language practice should preserve the learner's own attempt

The U.S. Institute of Education Sciences / What Works Clearinghouse practice
guide discusses spacing learning over time and quizzing or retrieval practice
as instructional recommendations [O1]. Those are instructional-design facts,
not LLM-tutoring results. OpenAI's prompt-engineering guide discusses testing
and evaluating prompts as prompts and models change [O2]. That is
product-specific developer guidance, not a language-learning study.

**Bounded project inference:** a text-only candidate activity can ask the
learner to make a small written attempt before seeing an optional model example;
it can retain the original attempt, disclosed assistance, and a self-authored
revision. If a later check is authorized, the learner can attempt a changed
scenario after a declared interval. This design preserves artifacts that could
be inspected later. It does not prove that the learner learned, retained, or
can transfer the language.

The activity must not assign a level, certify correctness, assess pronunciation,
or claim that a few prompts, one week, or any fixed schedule produces fluency.
An answer that looks polished may still depend on assistance and may still
contain an error.

### B. A citation is not a complete research record

The Association of College and Research Libraries describes information
literacy through frames including *Authority Is Constructed and Contextual*,
*Research as Inquiry*, and *Searching as Strategic Exploration* [O3]. These
frames support treating source choice and inquiry as matters to examine, not
as proof that a formatted answer is correct.

For the OpenAI Responses API web-search surface, the owner documentation
distinguishes inline citations from a `sources` field that can identify the
consulted URLs; it also documents domain filtering and approximate
user-location controls [O4]. This is a volatile, API-surface-specific fact. It
does not describe ChatGPT, Codex, Claude, Grok, Gemini, another product, or a
browser page without the documented trace.

NIST's AI RMF Playbook says that measurement should be appropriate to context
and that limitations and uncertainty should be documented [O5].

**Bounded project inference:** a beginner research activity should preserve a
question, the requested source constraints, the available trace, and a
claim-by-claim record of what was actually opened or supplied. A generated
citation, summary, confidence label, or URL alone remains a lead until a
reader can inspect the relevant source and its scope. If the trace is partial,
the record should say `partial` or `unknown`, rather than infer complete
coverage.

## Candidate activity shapes

These are original Prysai descriptions, not vendor prompt text or a claim that
any model follows them.

### 1. Assisted typed rehearsal receipt

Use only fictional, non-sensitive everyday material. The learner supplies:

- one written situation and one observable response target;
- their own first response before requesting an example;
- a maximum number of requested changes; and
- a stop condition, such as one revision and one unresolved point to check.

Keep: the stated target, first response, model feedback, learner-authored
revision, disclosed help, and any unresolved item. Describe this record only
as one assisted typed rehearsal under stated conditions. Do not infer language
level, independent ability, spoken skill, retention, transfer, or real-world
readiness.

Stop if the request becomes a placement judgment, a claim about proficiency,
or a request involving personal, consequential, or source-dependent content.

### 2. Source-aware research receipt

Before accepting a research-shaped answer, retain:

```text
question and decision:
source constraints: owner/type | language | jurisdiction | date | domains
available trace: opened sources | supplied sources | visible citations only | unknown

claim | source URL or "missing" | exact supporting location | source scope |
conflict or limitation | status: supported / unresolved / out_of_scope

stop: do not make the decision-critical claim when the source, relevant
location, scope, or available trace is missing
```

This is a planning and inspection record. It neither makes an LLM browse nor
validates a citation, source, claim, research result, or decision. A source can
meet selection constraints while still being outdated, irrelevant, incomplete,
or unsuitable for the claim at hand.

## Claims excluded by the evidence

This record does **not** establish that:

- prompt-based practice teaches, improves, accelerates, or measures language
  learning;
- a person can learn, master, or become fluent in a language in seven days or
  through a fixed number of prompts;
- an LLM's correction, example, citation, or summary is correct or appropriate;
- a cited LLM response represents every source consulted, all relevant sources,
  or a complete search;
- any product browses, stores context, follows constraints, exposes sources, or
  behaves the same way as another product;
- the candidate receipts are safe for private material or consequential use; or
- a Prysai learner, prompt, Skill, or workflow has an observed learning,
  research-quality, efficiency, productivity, or safety outcome.

## Source, reuse, and review boundary

This file is an original Prysai synthesis. It links to and paraphrases source
owners at a high level; it does not copy their prose, prompts, assessment
items, code, images, data, credentials, or user material. Each linked source
remains subject to its owner's terms, scope, availability, and future changes.

The record intentionally introduces no reader-facing book material and no
new Skill. A future adaptation must separately confirm the target product
surface, source freshness, license/reuse boundary, task risk, and the evidence
needed for every proposed claim.

## Source ledger

All sources below were accessed on **2026-08-16**.

| ID | Evidence class | Owner and authoritative URL | Scoped use | Does not prove |
| --- | --- | --- | --- | --- |
| O1 | official instructional guidance | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | Published guidance on study and instructional practices including spacing and quizzing/retrieval. | LLM tutoring effectiveness, a language-learning outcome, one optimal schedule, or the candidate rehearsal. |
| O2 | official product guidance | OpenAI, [*Prompt engineering*](https://developers.openai.com/api/docs/guides/prompt-engineering) | Product-owner developer guidance on prompt evaluation as prompts and models change. | Language learning, output correctness, another product's behavior, or the effectiveness of a prompt. |
| O3 | official instructional guidance | Association of College and Research Libraries, [*Framework for Information Literacy for Higher Education*](https://www.ala.org/acrl/standards/ilframework) | Published information-literacy frames for examining authority, inquiry, and strategic searching. | A source's authority, a claim's correctness, complete discovery, or an LLM research result. |
| O4 | official product guidance | OpenAI, [*Web search*](https://developers.openai.com/api/docs/guides/tools-web-search) | The documented Responses API web-search trace/citation distinction and listed controls. | Behavior in ChatGPT, Codex, another API, another provider, a complete source record, or answer correctness. |
| O5 | official risk-management guidance | NIST, [AI RMF Playbook: Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure) | Context-appropriate measurement and documentation of limitations and uncertainty. | Conformance to NIST AI RMF, a validated metric, safety, efficacy, or release readiness. |

## Stop receipt and missing evidence

Research stopped after two authoritative instructional/information-literacy
sources, two product-owner documentation sources, and one primary
risk-management source were checked. No external text was incorporated beyond
brief original paraphrase, and no user forum signal was needed for this narrow
record.

The following evidence is still missing: an authorized task protocol; learner
eligibility and consent where people participate; a declared product, model,
and surface; original attempts and assistance logs; source-opening records;
changed and delayed tasks; fit-for-purpose independent checking; and a
predeclared analysis plan. Until such evidence exists, this record remains
`candidate / not_run`.
