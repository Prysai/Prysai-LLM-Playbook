# Durable beginner communication with text-first LLMs

**Record label:** 2026-08-13
**Access date:** 2026-08-13 (America/Los_Angeles)
**Status:** candidate research record; no model, prompt, account, learner, or
source-verification workflow was run for this record.
**Owner:** curriculum-maintainer
**Next review:** 2026-09-13, or before this record is used to make a
product-specific claim, added to a learner study, or converted into a new
teaching asset.

## Question and scope

**Question:** What durable, beginner-facing communication decisions are
supported by current product-scoped prompt guidance and narrowly bounded public
reports when a person uses a general, text-first LLM conversation?

This record concerns ordinary written requests and replies. It is useful to the
curriculum's general LLM collaboration core, not an adapter for any one named
product. It excludes tool calls, file changes, browser use, uploads, account
settings, agents, voice, code execution, purchases, publishing, and other
external effects. Those actions change the authority and evidence needed; they
are not treated as ordinary chat.

Here, *durable* means that a learner can retain the same **decision** after a
product, model, interface, or account setting changes: name the small outcome,
state what material is available, request a bounded response, inspect an
uncertain claim or mismatch, and choose the next safe route. It does **not**
mean that a model retains context, follows a request, gives correct information,
or behaves consistently across turns or products.

This is deliberately not another universal prompt template. The existing
universal first-turn record covers a bounded six-field first request. This note
asks a later, narrower curriculum question: when should a beginner keep a
text conversation small, change the kind of request, or hand the work to an
existing route with a stronger evidence boundary?

## Evidence classes and claim boundary

| Evidence class | What it is used for here | What it cannot establish |
| --- | --- | --- |
| official fact | A product owner's current, product-scoped prompt-design guidance. | A property of another product, a cross-product rule, or a correct response. |
| public user report | One author's dated description of a need or friction on a public forum. | Prevalence, root cause, an official defect, a current account condition, or an effective remedy. |
| community suggestion | None retained. The reports are not upgraded into recommendations. | Best practice or a supported curriculum intervention. |
| local reproduction | None; `not_run`. | Any product behavior, response quality, or learner result. |
| project inference | A conservative routing and teaching implication drawn from the bounded record. | Prompt effectiveness, learning, source quality, safety, or completion. |

The public reports are symptom signals, not a sample of users. The official
pages are separately owned and product-scoped. Reading them together does not
pool their products, features, data controls, availability, context handling,
or behavior into a single platform claim.

## Official guidance: source-owner facts kept separate

Four source owners currently publish prompt-design guidance. In their own
scopes, OpenAI discusses instructions, relevant context, examples, and
evaluation; Anthropic asks an author to define success criteria and an empirical
test before prompt optimization; Google discusses clear and specific
instructions, context, and examples; Microsoft describes instructions, primary
content, and examples as prompt components. See the source ledger for the
authoritative URLs and access dates.

These are not a proof that a particular field, wording, or order is necessary
or optimal. They support only this cautious **project inference**: a beginner
should be able to point to the outcome, supplied material, requested response,
and check before treating a reply as useful. When one of those elements cannot
be stated or inspected, the appropriate response may be to shrink the task or
change routes, not to add more persuasive wording.

## Publicly reported friction, retained as narrow signals

The following reports are paraphrased rather than copied. They are included to
make concrete needs visible, not as proof about a vendor or all LLMs.

### R1 — A broad learning wish can hide the first decision

One OpenAI Community author with a Python background reported confusion about
choosing among many learning courses. The narrow signal is **route-selection
uncertainty before a first practice action**. It does not show that courses,
LLMs, or a particular curriculum caused the uncertainty, nor which choice is
best.

**Conservative teaching implication:** ask for one observable outcome, one
known starting point, and one small artifact before recommending a learning
route. If the learner wants a low-risk practice loop rather than a course
recommendation, hand off to the existing [Learning Coach](../../skills/prysai-learning-coach/SKILL.md).
If they only need an untried, text-only first message, hand off to
[Dialogue Brief](../../skills/prysai-dialogue-brief/SKILL.md). Neither handoff
certifies the route or predicts learning.

### R2 — A level label may not control generated material

One OpenAI Community author reported that language-reading material generated
for a requested proficiency level did not consistently remain within the
requested difficulty. The narrow signal is **a broad difficulty label can leave
the learner unable to inspect whether the response fits the intended practice**.
It does not establish a model-wide behavior, a language-level measure, a cause,
or a remedy.

**Conservative teaching implication:** replace an undefined label such as
`beginner` with visible constraints the learner can review, such as one
situation, a small known-word list, a maximum response length, a limit on new
items, and one attempt before an example. Keep a response as a candidate
exercise until a learner or qualified reviewer checks it. Hand off to
[Learning Coach](../../skills/prysai-learning-coach/SKILL.md) for a bounded
practice loop; hand off to [First-Turn Check](../../skills/prysai-first-turn-check/SKILL.md)
only when the learner has already written an unsent, low-risk, text-only
request and wants its visible fields inspected.

### R3 — Repeated context can obscure the changing item

One OpenAI Community author described repeatedly supplying a long
categorization instruction and examples while changing only one feedback item
per request. The narrow signal is **a recurring conversation may mix stable
criteria with the one item that actually changes**. It does not establish a
cost issue, context-window behavior, persistence mechanism, automation need,
or preferred API or product configuration.

**Conservative teaching implication:** teach a reader to mark stable material,
the current item, and the requested output separately in their own notes. Do
not assume an earlier instruction remains available; provide the material that
the current turn must rely on and inspect the next response against the stated
criteria. If the work becomes a file, dataset, tool, account, or external
action task, stop treating it as general chat and hand off to
[Task Protocol](../../skills/prysai-task-protocol/SKILL.md). That handoff
defines a planning boundary; it does not make a batch result correct.

### R4 — Citation-shaped output can appear usable before it is inspectable

One OpenAI Community author reported receiving article titles and URLs that
they believed were fabricated despite requesting verification. The narrow
signal is **a request for verification does not itself give a beginner an
inspectable claim-to-source record**. It does not prove an incident, current
product behavior, source unreliability in general, or the accuracy of any
alternative process.

**Conservative teaching implication:** for a material factual claim, retain a
source owner, URL, access date, supporting location, and a statement of what
the source does not establish. Treat an unopenable link, unmatched quotation,
or unsupported claim as `unresolved`, not as a citation. Hand off to
[Source Investigator](../../skills/prysai-source-investigator/SKILL.md) for
source-led inquiry or [Research Router](../../skills/prysai-research-router/SKILL.md)
when the evidence type or workflow still needs choosing. These routes do not
verify a source merely by formatting a citation.

## A small durable decision loop

The following is a project inference, not a claimed prompt method or learner
intervention. It gives beginners a way to decide what a text conversation needs
next without assuming a named product's hidden state.

| Observable condition | Smallest conservative move | Stop or hand off when |
| --- | --- | --- |
| The desired result is a broad wish, recommendation request, or undefined course of study. | Reduce it to one performance, a starting point, and one artifact or attempted reply. | The learner wants an ongoing practice loop: Learning Coach. They need an initial draft only: Dialogue Brief. |
| The response needs to stay at a stated difficulty, tone, length, or format. | State the inspectable constraint and review the returned material against it before use. | The request is already drafted and only needs a before-send field check: First-Turn Check. The result affects a high-stakes decision: stop for suitable human or domain review. |
| A repeated task has stable criteria and one changing item. | Keep the criteria, current item, and requested response visibly distinct; do not assume prior turns persist. | Files, tools, permissions, accounts, data handling, or other effects enter scope: Task Protocol. |
| A reply contains material factual claims or citations. | Make a claim-to-source ledger; mark missing support as unresolved. | The question requires source selection or substantive investigation: Source Investigator or Research Router. |
| The actual reply conflicts with the stated request or visible constraints. | Preserve the original request, visible context, actual reply, and expected result; identify an observable mismatch. | The task was already attempted and needs a controlled repair: [Communication Failure Triage](../../skills/prysai-communication-failure-triage/SKILL.md). Do not invent a cause or silently broaden authority. |

The loop can end with `unknown`, `not_reviewable`, or `out_of_scope`. Those
states are useful receipts: they prevent a polished response from being treated
as a completed task.

## Non-claims

This record does **not** establish:

- that the proposed decisions improve prompting, communication, learning,
  productivity, language ability, research quality, or retention;
- that any wording produces a correct, complete, safe, private, unbiased, or
  policy-compliant response;
- that OpenAI, Anthropic, Google, and Microsoft products have equivalent
  models, interfaces, accounts, tools, memory, limits, data controls, or
  responses;
- that R1–R4 are common, current, reproducible, caused by a product, or fixed
  by the teaching implications;
- that an apparent citation, URL, self-check, or confidence statement proves a
  claim;
- that a learner can complete a task in a particular time or transfer the
  method to a new task; or
- that this candidate research record is a Skill, product adapter, safety
  assessment, release decision, or evidence of production readiness.

## Evidence still needed

Before any effectiveness claim, an authorized evaluation would need a defined
beginner population, a declared text-only task, original requests, visible
context, retained responses, independently checked criteria where appropriate,
and a later unseen task. It would also need consent and data-minimization
boundaries for any participant material. No such evaluation was performed for
this record.

Before any named-product teaching claim, inspect the current official
documentation for that product and surface. Before any action beyond text,
record the target, authority, side effect, stop condition, and receipt in the
relevant route. A text prompt cannot grant permission to change files, access
an account, contact someone, publish material, or make a high-stakes decision.

## Source ledger

All URLs below were accessed on **2026-08-13**. External pages remain with
their respective owners and may change. This is an original Prysai Lab
evidence synthesis: it copies no external prompt, forum prose, source text,
code, image, screenshot, user data, credential, or product configuration.

| ID | Evidence class | Source owner and authoritative URL | Accessed | Scoped use in this record | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 2026-08-13 | Product-scoped guidance about instructions, context, examples, and evaluating prompts. | Behavior of another product, an answer's correctness, or novice benefit. |
| O2 | official fact | Anthropic, [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | 2026-08-13 | Product-scoped guidance to set success criteria and a test before optimizing a prompt. | A general effectiveness result, platform equivalence, or a valid learner assessment. |
| O3 | official fact | Google AI for Developers, [Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | 2026-08-13 | Product-scoped guidance on clear, specific instructions, context, and examples. | Product behavior elsewhere, source correctness, or successful communication. |
| O4 | official fact | Microsoft Learn, [Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering) | 2026-08-13 | Product-scoped description of prompt components including instruction, primary content, and examples. | Product equivalence, accuracy, or an optimal prompt order. |
| R1 | public user report | OpenAI Community, [report on course-selection confusion](https://community.openai.com/t/beginner-looking-to-learn-ai-with-python-background/661367) | 2026-08-13 | One author's reported uncertainty among learning options. | Demand prevalence, course quality, the best route, or an LLM result. |
| R2 | public user report | OpenAI Community, [report on requested language difficulty](https://community.openai.com/t/prompt-for-language-learning-with-stories/567389) | 2026-08-13 | One author's reported mismatch between a requested proficiency level and generated reading material. | Cause, frequency, product-wide behavior, a language assessment, or a remedy. |
| R3 | public user report | OpenAI Community, [report on repeated long instructions and changing feedback items](https://community.openai.com/t/long-instruction-prompt-on-short-input-data/837381) | 2026-08-13 | One author's reported recurring categorization workflow concern. | A product memory claim, cost claim, context-limit diagnosis, or preferred configuration. |
| R4 | public user report | OpenAI Community, [report of allegedly fabricated titles and URLs](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893) | 2026-08-13 | One author's allegation about a web-enabled session. | A confirmed incident, current behavior, prevalence, or a complete citation remedy. |
| P1 | project inference | This record's routing loop and handoff table | 2026-08-13 | Candidate decision aid for keeping a beginner's next step inspectable. | Effectiveness, learning, model compliance, safety, or completion. |
| L1 | local reproduction | None; `not_run` | 2026-08-13 | Records that no model, product, or learner task was run. | Any behavioral or outcome result. |
| C1 | community suggestion | None retained | 2026-08-13 | Records that no public recommendation was elevated to guidance. | Demand, best practice, or intervention effectiveness. |

## Stop receipt

Research stopped after four current official source-owner pages and four
traceable public reports were inspected. The sources justify a bounded
curriculum question and conservative handoffs, not a performance claim. No
new Skill, prompt card, asset, model comparison, participant study, or product
configuration was created.
