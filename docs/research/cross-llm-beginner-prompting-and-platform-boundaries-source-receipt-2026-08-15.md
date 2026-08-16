# Cross-LLM beginner prompting and platform boundaries: source receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)
**Status:** candidate research record / `not_run`
**Owner:** curriculum-maintainer
**Next review:** 2026-09-15, or before this record is used for a named-product
lesson, a learner study, an effectiveness claim, or an account/API exercise.

## Research question and scope

What small, durable decisions can a beginner make when writing a **text-only**
request to an LLM, while keeping ChatGPT/OpenAI, Claude/Anthropic, and
Grok/xAI product surfaces distinct?

This receipt covers only an original Prysai teaching pattern for an ordinary,
low-risk text exchange: state the narrow result, supply only relevant material,
ask for an inspectable response shape, and compare the reply with the stated
request. It does not prescribe a universal prompt template or claim that a
model will follow it.

The exercise candidates below exclude personal, confidential, copyrighted, or
high-stakes material; secrets; payments; API keys; uploads; web search;
browsing; tools; code execution; account changes; messages to other people;
publishing; and purchases. A learner may enter the fictional or self-authored
text into a chat product, but must not enable or request any external action.

No model call, account action, learner session, forum search, public-user
report, output comparison, or independent review was run for this record.

## Evidence classes and claim boundary

| Class | Meaning in this receipt | Does not establish |
| --- | --- | --- |
| `official fact` | A statement limited to the named owner's current documentation at the cited canonical URL. | A property of another product, a correct response, or a learner outcome. |
| `project inference` | An original Prysai synthesis that turns compatible, product-scoped guidance into a minimal text-only teaching pattern. | Platform equivalence, prompt effectiveness, safety, learning, fluency, productivity, or research quality. |
| `not_run` | No local, model, account, or learner observation was performed. | Model behavior, cost, privacy, reliability, or a result in this repository. |

The official sources remain separate. Similar advice appearing in more than
one source does not make their models, chat interfaces, accounts, memory,
tools, data controls, pricing, availability, or outputs equivalent.

## Official facts kept in their product scopes

### ChatGPT and OpenAI

OpenAI's ChatGPT Help Center advises ChatGPT users to make a prompt clear and
specific, include enough context, and iteratively revise after reviewing the
response [O1]. Its API prompt-engineering guide separately says that different
model types and snapshots can need different prompting, and describes examples
and additional relevant context as mechanisms for steering an API response
[O2].

These statements support a limited observation: a beginner can keep their
purpose, supplied material, and requested response visible, then inspect the
reply before treating it as useful. They do not establish that the same fields
are sufficient for every ChatGPT plan, OpenAI API model, model snapshot, or
task.

### Claude and Anthropic

Anthropic's prompt-engineering overview directs an author to define success
criteria and a test before prompt optimization, and identifies clarity and
examples as prompting techniques in its documentation set [A1]. This is
product-scoped author guidance, not evidence that a particular Claude surface,
account, or model will produce a correct or comparable response.

For curriculum purposes, it supports asking a learner to write a small check
before they inspect a reply. It does not turn a self-check into an evaluation
result or prove that the task is appropriate for a beginner.

### Grok and xAI

xAI's API Quickstart documents a separate API path: creating an xAI account,
loading credits, creating an API key, and then making a first request [X1].
The same source is therefore a boundary for this record, not a reason to ask a
beginner to use the API: the proposed exercises deliberately require neither
an account configuration nor an API key, credit, or paid request.

xAI's multi-agent research guide recommends setting an explicit scope and
depth, requesting structured output, specifying valued sources or perspectives,
and supplying relevant context [X2]. Those recommendations are scoped to the
documented multi-agent research surface, which can use billed model and tool
calls [X2]. They do not establish a result for Grok's consumer chat surface or
license a beginner exercise to browse, research externally, or spend money.

## Project inference: four visible fields, not a magic prompt

The compatible part of the official guidance can be translated into four
visible fields for a low-risk text-only request:

1. **Result:** one narrow thing the learner wants to draft, explain, practise,
   or organize.
2. **Material:** the short, non-sensitive text or fictional scenario the model
   may rely on; say `none supplied` rather than imply that it can see a source.
3. **Response shape:** a reviewable limit such as a short dialogue, three
   bullets, a two-column comparison, or one question before an answer.
4. **Check:** one observable condition the learner will use to compare the
   reply with the request, plus a stop condition for missing facts or an
   unwanted external action.

This is a **project inference** derived from the bounded sources above, not a
vendor-endorsed prompt format. A compact worksheet can be safer for a beginner
than a long "universal" role-play prompt because it makes missing inputs,
output limits, and uncertainty visible. That is a design hypothesis, not an
effectiveness result.

## Platform boundary card

| Surface in scope | What the reviewed official source supports | Boundary that must remain visible |
| --- | --- | --- |
| ChatGPT help guidance [O1] | Clear, specific requests; sufficient context; review-and-refine. | It does not document every ChatGPT feature, plan, memory behavior, data control, browsing state, or answer's correctness. |
| OpenAI API prompting [O2] | Product-specific API guidance about model/snapshot variation, examples, and relevant context. | It is not evidence that an API instruction field, message role, or model behavior exists in another product or in every ChatGPT surface. |
| Anthropic prompt-engineering overview [A1] | Product-specific prompt iteration framing, including success criteria, testing, clarity, and examples. | It is not a Claude run, a comparison with ChatGPT or Grok, or a guarantee of a response. |
| xAI API Quickstart and research guide [X1][X2] | A credential-and-credit API path, plus multi-agent research request-shaping guidance. | It is not a no-cost consumer-chat tutorial, a permission model, a privacy guarantee, or justification to activate web/tools for a beginner. |

The product name alone is therefore insufficient teaching context. Before a
future named-platform lesson is admitted, it needs a fresh source review of the
actual surface, account and permission path, tool state, data-egress boundary,
and a low-risk run. This receipt does not admit a ChatGPT, Claude, or Grok
platform adapter.

## Three candidate low-risk beginner exercises

These are original Prysai exercise candidates. They are deliberately small,
text-only, and reversible: the only artifact is the learner's prompt and a
brief inspection note. They do not require a secret, payment, browser, tool,
upload, file, account change, or factual claim from the model.

### 1. Spanish cafe micro-dialogue

**Problem:** "Help me learn Spanish" is too broad to inspect.

**Candidate request:**

~~~text
Result: practise one four-line fictional cafe exchange in beginner Spanish.
Material: I know "hola", "por favor", "gracias", and numbers 1 to 5.
Response shape: ask me for my first customer line; wait for my attempt; then
give one correction and one possible next line. Do not browse or claim a level.
Check: I can point to my original line, the single correction, and the next
line. Stop if the reply introduces more than three unfamiliar words.
~~~

**Acceptance evidence:** retained learner attempt, one identified correction,
and the stated unfamiliar-word count. **Failure boundary:** a claimed language
level, a fluent-learning promise, or a long lesson is out of scope; shorten or
restart with the visible limit. This is a practice interaction, not evidence of
Spanish proficiency or learning gain.

### 2. Fictional source-plan rehearsal

**Problem:** "Research this" can cause a learner to mistake a draft for a
source-checked answer.

**Candidate request:**

~~~text
Result: make a research plan for the fictional question, "Should a made-up
town add shaded benches at bus stops?"
Material: no sources are supplied.
Response shape: return a table with exactly three rows: claim to check, likely
source owner, and what would count as support. Do not browse, invent sources,
or answer the question.
Check: every row says who would own the evidence and none presents a result.
Stop: label any unsupported fact "unknown".
~~~

**Acceptance evidence:** three-row plan with no invented citation or conclusion.
**Failure boundary:** if the reply supplies an apparent fact, URL, statistic,
or policy conclusion, mark it `unresolved` rather than relying on it. This is
planning practice only; it does not perform research, validate a citation, or
establish a real-world answer.

### 3. Constraint-preserving rewrite

**Problem:** a helpful-sounding rewrite can silently add claims or miss the
intended audience.

**Candidate request:**

~~~text
Result: rewrite this fictional club notice for new members.
Material: "The club meets Tuesday at 6. Bring a notebook. The room will be
confirmed later."
Response shape: write two sentences, keep all stated facts, and put unknown
details in brackets. Then list the facts you preserved.
Check: compare the source and rewrite; no new time, room, fee, contact, or
promise may appear. Do not send, publish, or browse.
~~~

**Acceptance evidence:** the source text, rewrite, and a visible fact-by-fact
comparison. **Failure boundary:** if a rewritten sentence adds an unstated
detail, remove it or retain `[unknown]`. This is an editing check, not proof
of factual accuracy, audience suitability, or successful communication.

## What the official sources do **not** prove about user or forum outcomes

This section is intentionally limited. No forum posts, social-media threads,
surveys, support tickets, or user interviews were selected or analyzed for this
receipt.

The official pages [O1][O2][A1][X1][X2] do **not** prove:

- how often beginners struggle with vague requests, language learning,
  research, or rewriting;
- that any forum-reported problem is common, current, caused by a named
  product, or fixed by a particular prompt pattern;
- that these exercises improve completion rate, confidence, fluency,
  retention, efficiency, safety, satisfaction, or any other learner outcome;
- that ChatGPT, Claude, and Grok users have comparable needs, account access,
  tool availability, privacy expectations, or observed results; or
- that a response with a neat structure, a confidence statement, a citation,
  or a self-check is factually correct.

Real-user needs require their own evidence path: an authorized sample, a
declared task, consent and data-minimization rules, preserved task artifacts,
defined scoring, and explicit limitations. No such study or outcome data exists
in this source receipt.

## Curriculum integration recommendation

Keep the four-field pattern in the **general LLM collaboration core** as a
candidate, not as a named-platform lesson. The three exercises could later be
evaluated as a short first-practice sequence only after their learner, scoring,
and privacy evidence is separately defined. Route a request involving live
research, a real external source, confidential material, a payment, an API
key, files, browsing, or an external action to the existing higher-boundary
curriculum paths rather than extending these exercises.

## Explicit non-claims

This record does **not** establish that:

- the four fields are necessary, sufficient, optimal, or durable for every
  model, surface, account, language, or task;
- a learner can finish any exercise, receive a correct response, detect an
  error, or transfer the method to a new task;
- any named product is safer, more private, more capable, cheaper, or more
  effective than another;
- the exercises are a language course, research method, citation checker,
  security control, privacy assessment, or platform adapter; or
- this candidate record is verified, production-ready, or evidence of project
  learning value.

## Source ledger and reuse boundary

All official URLs below were accessed on **2026-08-15**. They are current
documentation owned by their respective organizations and may change. This is
an original Prysai Lab synthesis: it does not copy vendor prose, source code,
screenshots, prompts, product assets, account data, credentials, or
configuration. Links are retained as references only; no source license grant
is inferred and no external asset is added to the repository.

| ID | Evidence class | Canonical source URL | Accessed | Scoped use in this receipt | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI Help Center, [Prompt engineering best practices for ChatGPT](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt) | 2026-08-15 | ChatGPT-scoped guidance on clarity, specificity, context, and iterative refinement. | Cross-platform behavior, a correct answer, user prevalence, or a learner result. |
| O2 | official fact | OpenAI Developers, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 2026-08-15 | API-scoped discussion of model/snapshot variation, examples, relevant context, and evaluation. | ChatGPT UI behavior, another vendor's implementation, or a universal prompt recipe. |
| A1 | official fact | Anthropic, [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | 2026-08-15 | Anthropic product documentation on defining success criteria/tests and prompt techniques including clarity and examples. | A Claude run, platform parity, a learner result, or an answer guarantee. |
| X1 | official fact | xAI, [API Quickstart](https://docs.x.ai/developers/quickstart) | 2026-08-15 | API onboarding boundary: account, credits, key, and first request. | Consumer-chat behavior, a no-cost path, account availability, or a project API run. |
| X2 | official fact | xAI, [Multi Agent](https://docs.x.ai/developers/model-capabilities/text/multi-agent) | 2026-08-15 | Multi-agent research guidance on scope, structured output, sources/perspectives, and context; it also documents billed model/tool use. | A general-chat result, free/no-tool behavior, research correctness, or a safe beginner run. |
| P1 | project inference | This record's four-field pattern and three exercise candidates | 2026-08-15 | Original, bounded curriculum design for text-only first practice. | Vendor endorsement, effectiveness, safety, or a user outcome. |
| L1 | `not_run` | None | 2026-08-15 | Records that no product, learner, or model test was performed. | Any operational, educational, or comparative result. |

## Stop receipt

Research stopped after direct review of five current primary official pages
covering ChatGPT guidance, OpenAI API prompting, Anthropic prompt engineering,
xAI API onboarding, and xAI multi-agent research. The resulting exercise
candidates preserve the smallest shared decision layer while retaining the
account, credit, API, tool, and surface differences as visible boundaries. No
forum material, new Skill, platform adapter, product configuration, live model
test, or outcome claim was created.
