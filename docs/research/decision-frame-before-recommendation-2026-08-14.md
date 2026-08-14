# Decision framing before recommendation: a bounded beginner-gap record

**Status:** research candidate / `not_run`

**Accessed:** 2026-08-14 (America/Los_Angeles)

**Owner:** curriculum-maintainer

**Next review:** 2026-11-14, or before a proposed Skill or card is added to a
reader-facing route, evaluated with learners, or adapted to a named product.

## Question

What small, platform-neutral first attempt can help a beginner turn the vague
request “What should I do?” into something inspectable **without** asking an
LLM to make a recommendation, research facts, contact anyone, or act on the
decision?

## Finding: the unmet seam is a decision frame, not a decision

The repository has distinct routes for an unsent first message, a before-send
field check, an ongoing learning loop, research planning, and tasks that may
have effects. It does not currently have a route whose sole job is to expose
the difference between **facts supplied by the person**, **criteria the person
has actually named**, and **information still unknown before any
recommendation**.

That seam matters when a beginner starts with a normal but overbroad request
such as “Which weekend plan is better?” The safest useful first result is not
“choose A.” It is a short, user-reviewable decision frame: listed options,
preserved facts, stated priorities, conflicts, and unanswered questions. This
is a project inference, not a finding that such a frame improves decisions or
model responses.

## Existing-material boundary

The proposed seam is deliberately narrower than nearby material.

| Existing route | What it already owns | Why it does not own this proposed seam |
| --- | --- | --- |
| `prysai-dialogue-brief` | Drafting one unsent, low-risk first request from a roughly defined communication goal. | It helps word a request; it does not produce a bounded representation of alternatives or prohibit a recommendation. |
| `prysai-first-turn-check` | Inspecting the six visible fields of a request the reader already wrote. | It reviews whether a draft is sendable; it does not turn competing options and unknowns into a comparison artifact. |
| `prysai-learning-coach` and the Spanish card | A learner attempt, feedback, revision, and transfer practice. | A decision frame neither teaches a performance nor assesses a learner. |
| Bounded research card and Research Router | Claim/source planning before factual investigation. | The decision frame uses only supplied information and must stop rather than search, cite, or infer current facts. |
| `prysai-task-protocol` | Executable work with risk, authority, side effects, rollback, and acceptance evidence. | The decision frame must remain text-only and pre-action; a real task, purchase, publication, contact, file change, or account action leaves this route. |

The proposed contribution is therefore not a renamed prompt template or a
general-purpose “AI decision” Skill. It is a constrained pre-decision sorting
step for a very small class of R0 practice cases.

## Claim ledger

| ID | Claim | Evidence class | Support and limit |
| --- | --- | --- | --- |
| C1 | OpenAI publishes product-scoped prompt-engineering documentation. | official fact | The page exists and is owned by OpenAI [O1]. It does not establish behavior in another product, answer quality, or a preferred universal prompt structure. |
| C2 | Anthropic publishes a product-scoped prompt-engineering overview that includes a test-and-evaluate route. | official fact | The page exists and is owned by Anthropic [O2]. It does not establish behavior in another product, a valid decision method, or any user outcome. |
| C3 | NIST publishes the AI Risk Management Framework as a risk-management resource. | official fact | The framework exists and is owned by NIST [O3]. It is not a prompt guide, a model evaluation, or approval for this proposed contribution. |
| C4 | A public OpenAI Community author described using GPT-3 to think about a consequential family education choice and asked about dangers of an AI life-coach application. | public user report | This is one dated author's report and question [R1]. It is a symptom signal that people may direct broad life decisions to an LLM; it does not establish frequency, product behavior, safety, need, or an effective remedy. |
| C5 | A beginner-facing pre-decision frame should preserve supplied facts, show unknowns, and stop before a recommendation. | project inference | This is the proposed Prysai contribution below [P1]. It has no learner, model, or independent-evaluation evidence. |
| C6 | No local model exchange, learner session, platform comparison, or live decision was run for this record. | local reproduction | `not_run` [L1]. This note records a design boundary, not a response-quality or outcome result. |

## Primary-source interpretation kept in scope

The official pages are independently owned, volatile, and product-scoped.
OpenAI's and Anthropic's guides concern their own documented prompting
surfaces [O1][O2]. NIST's framework concerns risk management in its stated
organizational scope [O3]. None of them says that a short prompt frame makes a
recommendation correct, makes an LLM safe to rely on, or transfers unchanged
between products.

Together, they support only a conservative editorial choice: before a beginner
treats a model's response as useful, the request can make its purpose and an
inspectable check visible. For an everyday choice, the first check can be
whether the resulting frame preserved the supplied facts and kept unknowns
visible. That is a project design choice, not a universal prompting rule.

## Public symptom signal

The retained community report is intentionally narrow. In 2021, one author
described asking GPT-3 about a real family choice and explicitly raised the
possible dangers of an “AI life coach” app [R1]. The report is not copied into
this curriculum and is not treated as evidence about GPT-3, a current OpenAI
product, parenting, education, or any population of users.

Its only teaching signal is that a polished, empathetic-looking answer can be
tempting before a person has separated their own constraints from the model's
unstated assumptions. The proposed frame responds by declining to recommend at
all. It is not a life-coach method and must not be used for a consequential
personal decision.

## Proposed original project contribution: `Decision Frame`

**Candidate Skill purpose:** turn two to four user-supplied, low-stakes options
into a visible inventory before the user asks for advice. It is a candidate
idea only; no Skill directory, card, integration, or evaluation is created by
this research note.

### Strict admission boundary

Admit only an R0, text-only, reversible practice case where all of the
following are true:

1. The reader supplies two to four options and the facts to compare.
2. The reader asks for an inventory, not a recommendation, ranking, prediction,
   diagnosis, or persuasion.
3. No web search, files, tools, accounts, contacts, purchases, publication, or
   external action is needed.
4. The material contains no secrets, personal identifiers, private records, or
   third-party confidential information.
5. The choice is not medical, legal, financial, housing, employment, education,
   insurance, immigration, safety, relationship, or any other consequential
   decision.

If any condition fails, return `out_of_scope` and name the smallest missing
boundary or appropriate existing route. Do not turn a prohibited real decision
into a fictional one while claiming it is safe.

### Candidate output contract

For an admitted case, a future Skill could return exactly these sections:

```text
decision_frame_status: ready_to_review | needs_one_clarification | out_of_scope
purpose_in_the_reader_words:
options_as_supplied:
stated_facts_by_option:
stated_criteria_or_non_negotiables:
conflicts_or_tradeoffs_explicitly_stated:
unknown_or_not_provided:
one_clarifying_question_or_none:
recommendation: not_requested
next_safe_action: review the frame yourself, add one fact, or stop
evidence: reader-supplied text only
content_status: candidate
```

The output must never add a score, invented consequence, source, hidden
priority, diagnosis, or “best” option. If a claimed tradeoff does not appear in
the reader's supplied material, it belongs in `unknown_or_not_provided`, not
in the comparison.

### Candidate practical prompt card

This is original project wording, provided as a proposed future card rather
than a validated prompt. It is intentionally about a fictional, low-stakes
practice choice.

```text
I want to make a decision frame, not receive a recommendation.

Use only the options and notes below. Put every statement into one of these
headings: stated facts, stated priorities, or unknowns. Keep the wording close
to my notes. Do not search, add facts, score the options, predict outcomes, or
choose for me.

Options and notes:
- A: spend a free 30-minute break sketching; I already have paper and pencils.
- B: spend the break organising one desk drawer; it may make tomorrow morning
  easier, but I have not decided whether that matters more today.

End with one question that I, not you, need to answer before comparing the
options. Then stop.
```

**Inspectable acceptance check:** the reader can point to the supplied sentence
behind each stated fact or priority; the response contains no recommendation;
and its one question names a genuine missing criterion rather than inventing a
fact. A polished table is not sufficient evidence that the frame is complete,
useful, correct, or appropriate for a real decision.

### Failure and handoff rules

| Observable condition | Required response |
| --- | --- |
| Only one option is supplied. | Ask for exactly one alternative or stop; do not manufacture alternatives. |
| The user asks “which is best?” but only supplied facts are in scope. | Restate the `no recommendation` boundary and return the frame or stop. |
| A needed claim is current, technical, legal, medical, or otherwise source-dependent. | Stop and hand off to Source Investigator or Research Router; do not fabricate a source plan as a factual answer. |
| The choice can affect another person, money, eligibility, health, housing, education, safety, or rights. | Return `out_of_scope`; this candidate has no authority to frame or advise on the decision. |
| The task acquires files, tools, accounts, contacts, publication, or a real action. | Hand off to Task Protocol before any action is planned or performed. |

## What evidence would be needed next

Before creating a Skill or reader-facing card, conduct an overlap review against
the current routing matrix and test the proposed trigger with original,
fictional R0 examples plus out-of-scope cases. Before claiming usefulness,
prompt quality, or learner benefit, run an authorized evaluation with a named
beginner population, consent and data-minimization rules, retained original
inputs and outputs, a declared independent check, and an unseen transfer case.
No such work has happened.

## Explicit non-claims

This record does **not** establish that:

- an LLM should make, rank, optimize, or explain a user's decision;
- the Decision Frame candidate improves decision quality, autonomy,
  productivity, safety, prompting, or learning;
- an LLM will preserve facts, disclose uncertainty, avoid assumptions, or
  follow a stop boundary;
- OpenAI, Anthropic, NIST, or a public forum author endorses this contribution;
- the candidate applies to any named product or that named products behave
  equivalently; or
- the candidate is a Skill, a release-ready asset, learner-validated, secure,
  or suitable for deployment.

## Source, access, and rights ledger

All cited pages were accessed on **2026-08-14**. Official documentation is
volatile and scoped to its owner. The public report is a reference-only public
statement. This file is an original Prysai Lab synthesis: it copies no external
prompt, prose, code, image, screenshot, user data, credential, or product
configuration. No source is imported as a teaching asset.

| ID | Evidence class | Source and URL | Accessed | Scoped use | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 2026-08-14 | OpenAI maintains product-scoped prompt-engineering documentation. | Another product's behavior, a universal method, response quality, or a learner outcome. |
| O2 | official fact | Anthropic, [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | 2026-08-14 | Anthropic maintains product-scoped prompt-engineering documentation and a test-and-evaluate route. | Another product's behavior, a valid decision frame, response quality, or a learner outcome. |
| O3 | official fact | NIST, [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) | 2026-08-14 | NIST publishes an AI risk-management framework. | A prompt prescription, system certification, safety result, or approval of this proposal. |
| R1 | public user report | OpenAI Developer Community, [GPT3 guides me in making an important decision](https://community.openai.com/t/gpt3-guides-me-in-making-an-important-decision/5500) | 2026-08-14 | One author's 2021 description of using GPT-3 to think about a consequential family choice and their question about AI-life-coach dangers. | Prevalence, product behavior, safety, a parenting conclusion, or a remedy. |
| P1 | project inference | This record's proposed Decision Frame and its boundaries | 2026-08-14 | A candidate original method for an inspectable R0 pre-decision inventory. | Need, effectiveness, model compliance, safety, or production readiness. |
| L1 | local reproduction | None; `not_run` | 2026-08-14 | Records the absence of a model run, learner run, and live decision. | Any behavioral, learning, or decision result. |

## Stop receipt

Research stopped after confirming the repository's adjacent boundaries, three
available primary-source pages, and one narrowly retained public symptom
signal. No prompt was executed; no participant, account, personal material,
external action, comparison, or recommendation was used. The proposed
contribution remains `candidate / not_run`.
