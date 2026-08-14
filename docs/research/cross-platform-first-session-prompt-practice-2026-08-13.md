# Cross-platform first-session prompt practice: a bounded beginner contract

**Record label:** 2026-08-13

**Sources accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research record. No learner session, prompt execution,
model comparison, language assessment, delayed retention check, transfer task,
or independent scoring was run for this record.

**Owner:** curriculum-maintainer

**Next review:** 2026-09-13, or before using a hosted product document for a
platform-specific instruction or a claim about prompt behavior.

## Scope and question

This is a narrow, low-risk design note for a beginner's first text session with
an LLM: one small language-practice attempt, bounded feedback, and a saved
receipt. It does not instruct a model to browse, use voice, access an account,
handle personal records, grade a learner, or take an external action.

**Question:** Which prompt fields can remain useful across named LLM products
without claiming that those products behave identically or that a beginner has
learned a language?

Here, *cross-platform* means that proposed fields avoid product-specific syntax
and are compared against separately scoped official guidance. It does not mean
that models, plans, quotas, tools, accounts, languages, or outputs are
equivalent across platforms.

## Evidence classes and status

| Class | Use in this record | It does not establish |
| --- | --- | --- |
| official fact | A statement from the organization that owns a published guide. | Cross-platform behavior, learning efficacy, or a learner result. |
| public user report | One dated public author's stated goal or reported difficulty. | Prevalence, product state, root cause, or a validated remedy. |
| community suggestion | A public recommendation or preference, if separately retained. No such item is used here. | Official support, research evidence, or broad demand. |
| local reproduction | A locally declared attempt under recorded conditions. No reproduction was run here. | Behavior outside those conditions or learner improvement. |
| project inference | A conservative curriculum decision drawn from bounded sources. | That the decision works until an appropriate evaluation exists. |

not_run is a status, not evidence: this record contains no prompt execution,
learner observation, proficiency test, delayed check, or transfer task.

## Official guidance: shared fields, not shared product behavior

The three vendor guides below are hosted, product-specific, and subject to
change. Within their own scopes, the OpenAI guide discusses instructions,
context, examples, and testing prompt behavior; Anthropic asks users to define
success criteria and an empirical way to test them before optimizing a prompt;
and Google describes clear, specific instructions and examples as prompt-design
strategies.

These are official facts about their respective guidance. They support only this
project inference: a beginner's first prompt should make a target, starting
context, constraint, requested response, and completion check visible. They do
not show that this structure is optimal, works in every product, controls
generated difficulty, or causes learning.

The U.S. Institute of Education Sciences (IES) practice guide gives a stable
instructional boundary: it recommends quizzing and identifying material that
still needs learning. It is not an LLM-tutoring study, language-course
evaluation, or evidence for a seven-day schedule. In this record it supports
keeping an unassisted attempt and a later check distinct from a polished
assisted answer.

## Bounded demand and failure signals

The following are not product facts. They are dated reports from individual
authors, kept only because they identify concrete first-session needs that a
candidate prompt contract should make inspectable.

| ID | Dated public report | Narrow signal | Strict boundary |
| --- | --- | --- | --- |
| U1 | OpenAI Community, [*Learn languages at the same time*][U1], posted 2024-12-03; accessed 2026-08-13 | One author sought immersive practice across several languages and described a perceived use limit as a constraint. | One stated goal and perceived constraint; not a current quota, prevalence estimate, language result, or cross-platform need. |
| U2 | OpenAI Community, [*Prompt for language learning with stories*][U2], posted 2023-12-21; accessed 2026-08-13 | One author reported that generated stories did not reliably stay at the requested beginner difficulty, particularly outside English. | One reported experience; not a local reproduction, causal diagnosis, proficiency assessment, or product-wide conclusion. |

**Project inference:** set one observable target and one small output
constraint, then preserve a learner attempt. This responds to the reported
needs without claiming to solve access limits or difficulty control.

## Candidate durable prompt contract

The following is original project wording, not vendor syntax and not a prompt
proven to be effective. The fields are meant to remain understandable if a
reader changes products.

| Field | Reader records | Why it is retained | Do not infer |
| --- | --- | --- | --- |
| **Target** | One language, one real situation, and one observable can-do action. | Prevents a broad wish from masquerading as a completed task. | Fluency, a proficiency level, or a fixed time to mastery. |
| **Starting context** | Known words, a short self-authored sample, or unknown. | States what the task may assume. | A valid diagnosis of ability. |
| **Attempt** | One short response before feedback, where appropriate. | Creates a visible before/after artifact. | Independent learning or a reliable baseline. |
| **Boundary** | Maximum length, permitted help, prohibited personal data, and no external action. | Limits task scope and side effects. | Privacy, safety, or suitability in every setting. |
| **Feedback request** | One correction priority and a request for a revision. | Keeps feedback specific enough to inspect. | Correctness of feedback or a teacher's judgment. |
| **Check and stop** | What to save; a missing-source, unclear-feedback, or risk condition that ends the session. | Makes incompleteness visible. | Verified learning, source accuracy, or successful transfer. |

### Original first-session template

~~~
I am practising [language] for [one real situation].
Today I want to [one observable action].

Starting context: [known words, one short sample, or unknown].
Give one task of no more than [length]. Wait for my attempt before feedback.
Do not use personal records, browse, contact anyone, or assign a proficiency level.

After my attempt, identify at most [one or two] high-value changes, explain each
plainly, and ask for one revision. If you are uncertain, label the uncertainty.

End with: target, my attempt, my revision, help used, what remains unverified,
and the next smallest practice or stop condition.
~~~

The template is a project inference. A reader may adapt it to a product's
documented interface, but no adaptation is licensed or validated by this record.

## The "learn a language in 7 days" limit

This record does not establish that a person can—or cannot—learn a language in
seven days. The headline is not an evaluable efficacy claim here because it
does not state a learner baseline, target language capability, amount and kind
of practice, assistance, assessment task, scorer, delayed retention interval,
or transfer condition.

Seven calendar days can contain practice. Completing a seven-day checklist is
not evidence of fluency, durable retention, real-world communication ability,
a proficiency level, or that an LLM or prompt caused an observed result. The
IES guidance and vendor guides do not supply that missing outcome evidence.

An honest first-session result is smaller: a dated record can show that a
learner attempted one bounded task, received disclosed assistance, and revised
one response. It must not be described as language learning, mastery, a level,
or a seven-day outcome without separately declared and appropriate evidence.

## What is not established

This record does **not** establish:

- that any prompt, model, or platform improves language learning;
- that the candidate contract works across OpenAI, Anthropic, Google, or any
  other product;
- that a model can place, grade, teach, or certify a learner;
- that generated corrections are accurate, level-appropriate, culturally
  appropriate, or safe to rely on;
- that the two reports are common, current, caused by the named product, or
  resolvable through prompt wording;
- that seven days produces fluency, retention, transfer, or a proficiency
  level; or
- that this record has undergone learner testing, independent review, or a
  production-readiness assessment.

## Source and license boundary

This is an original Prysai Lab synthesis. It links to and briefly paraphrases
external sources; it does not copy their prompts, examples, assessment items,
forum prose, screenshots, code, images, logos, credentials, or user data.
Hosted vendor guidance and public forum content remain subject to their owners'
terms and may change. The public reports are reference-only; neither report is
adapted into a teaching asset.

## Source ledger

| ID | Evidence class | Source and access date | Scoped use | Owner / next review | Does not prove |
| --- | --- | --- | --- | --- | --- |
| O1 | official fact | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*][O1], accessed 2026-08-13 | Official practice-guide recommendations for quizzing and identifying material needing further learning. | curriculum-maintainer / 2027-08-13 | LLM tutoring efficacy, language learning, one best review interval, or a seven-day outcome. |
| O2 | official fact | OpenAI, [*Prompt engineering*][O2], accessed 2026-08-13 | Current OpenAI guidance on instructions, context, examples, and testing prompt behavior. | facts-maintainer / 2026-09-13 | Anthropic, Google, Codex, or general cross-platform behavior; learning or correctness. |
| O3 | official fact | Anthropic, [*Prompt engineering overview*][O3], accessed 2026-08-13 | Current Anthropic guidance to define success criteria and an empirical test before optimizing a prompt. | facts-maintainer / 2026-09-13 | OpenAI, Google, Codex, or general cross-platform behavior; educational efficacy. |
| O4 | official fact | Google AI for Developers, [*Prompt design strategies*][O4], accessed 2026-08-13 | Current Google guidance on clear, specific instructions and examples as prompt-design strategies. | facts-maintainer / 2026-09-13 | OpenAI, Anthropic, Codex, or general cross-platform behavior; language outcomes. |
| U1 | public user report | OpenAI Community, [*Learn languages at the same time*][U1], posted 2024-12-03; accessed 2026-08-13 | One traceable author's language-practice goal and perceived usage constraint. | curriculum-maintainer / 2026-09-13 | Prevalence, current product limits, learning outcome, or a remedy. |
| U2 | public user report | OpenAI Community, [*Prompt for language learning with stories*][U2], posted 2023-12-21; accessed 2026-08-13 | One traceable author's report about requested beginner-level stories. | curriculum-maintainer / 2026-09-13 | Cause, frequency, model behavior now, or validated level alignment. |
| P1 | project inference | This record's candidate durable prompt contract | Product-neutral fields for a bounded, inspectable first session. | curriculum-maintainer / not_run pending an authorized evaluation | Prompt effectiveness, learner outcome, product equivalence, or a seven-day claim. |
| L1 | local reproduction | None; not_run | No local product run or learner activity was performed. | curriculum-maintainer / not_run | Any runtime, model, or learner result. |
| C1 | community suggestion | None retained | Community suggestions were not needed for the bounded claim. | curriculum-maintainer / not_run | A demand, best practice, or effectiveness conclusion. |

## Stop record

Research stopped after checking one stable instructional guide, three separately
owned prompt-guidance pages, and two dated public reports. No prompt was run,
no account or user data was used, and no learner or platform comparison was
performed. A future evaluation would need a declared task, a consent and data
boundary appropriate to its setting, an independent scoring plan where claims
need scoring, and explicit not_run status until those activities occur.

[O1]: https://ies.ed.gov/ncee/wwc/PracticeGuide/1
[O2]: https://developers.openai.com/api/docs/guides/prompt-engineering
[O3]: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
[O4]: https://ai.google.dev/gemini-api/docs/prompting-strategies
[U1]: https://community.openai.com/t/learn-languages-at-the-same-time/1040799
[U2]: https://community.openai.com/t/prompt-for-language-learning-with-stories
