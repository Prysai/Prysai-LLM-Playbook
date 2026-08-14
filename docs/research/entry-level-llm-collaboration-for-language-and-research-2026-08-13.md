# Entry-level LLM collaboration for language practice and source-backed research

**Status:** candidate research record. No learner session, prompt evaluation,
proficiency assessment, model comparison, delayed retention check, or source
audit was run.

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Scope:** a product-neutral, low-risk first session in which a beginner uses
an LLM for a short language-practice activity *or* a bounded research question.
This is not a tutoring evaluation, a language course, a claim that a model can
verify research, or advice for assessment, placement, certification, medical,
legal, financial, or other consequential decisions.

## Question

What should an entry-level collaboration pattern ask of an LLM so that the
beginner keeps ownership of the goal, attempts language before receiving the
answer, and can trace factual research claims back to sources?

The immediate purpose is a useful, inspectable session. It is **not** to make a
person fluent, complete a language in seven days, establish a CEFR level, or
prove that a prompt or model causes learning.

## Evidence classes

| Class | Meaning in this record | Does not establish |
| --- | --- | --- |
| **Official fact** | A statement from an organization that owns the guidance. | Learning efficacy, cross-product behavior, or a particular user's result. |
| **Research finding** | A result reported by the cited study under its stated conditions. | That an LLM reproduces the result or that a language learner will obtain it. |
| **Public user report** | A traceable author's description of a goal or problem in a public forum. | Prevalence, root cause, product behavior, or a validated remedy. |
| **Project inference** | An original, conservative design choice derived from the sources. | That the design works until a suitable evaluation is run. |
| **`not_run`** | A needed test or evidence collection activity was not performed. | Any outcome that the missing test would have measured. |

## What the evidence supports—and what it does not

**Official fact:** the U.S. Institute of Education Sciences practice guide
recommends spacing learning over time and using quizzing to re-expose learners
to material and identify material that still needs learning [O1]. These are
instructional-design recommendations in the guide's stated scope. They do not
evaluate an LLM tutor, any prompt card, a seven-day schedule, or language
fluency.

**Research finding:** Roediger and Karpicke reported different immediate and
delayed recall patterns after retrieval practice versus restudy in two
prose-learning experiments [R1]. The result supports distinguishing an
immediate assisted response from a later, differently measured attempt. It is
not a study of second-language learning, LLM collaboration, or a universal
review schedule.

**Official fact:** the Council of Europe's CEFR describes reference levels
through structured illustrative descriptors for language activities and
competences [O2]. A short exchange with an LLM is not a CEFR assessment, and a
model must not label a learner's level or progress as certified on that basis.

**Official fact:** the ACRL Framework characterizes authority as contextual
and constructed, research as inquiry, and searching as strategic exploration
[O3]. This supports making the source owner, claim, scope, and unresolved
questions visible. It does not mean a model-generated citation is correct,
that a finite search is complete, or that a source is appropriate for every
claim.

**Official fact:** OpenAI's current prompt-engineering and evaluation guidance
states that model output is non-deterministic and recommends defining tasks,
testing representative inputs, and evaluating outputs against stated criteria
[O4][O5]. These are product-owner statements about building and evaluating
LLM behavior. They do not assess a learner, validate factual answers, or imply
that the following prompts work identically in another product.

## The seven-day claim: reject the promise, keep a modest first session

The statement “learn a language in seven days” has no defined target,
baseline, assessment method, retention interval, or independent scoring in this
record. It therefore cannot be evaluated, repeated, or honestly promised.

Seven days can contain useful practice, but a completed seven-day checklist is
not evidence of fluency, durable retention, real-world conversation ability,
or a CEFR level. The same boundary applies to claims such as “this prompt makes
you learn faster” or “the model understands your learning style.” **`not_run`:**
no participant study, comparison group, delayed unseen assessment, or external
language assessment was conducted here.

The appropriate beginner promise is smaller:

> In one session, create a bounded attempt or source ledger that another person
> can inspect. Keep the unanswered questions visible.

## Public user reports: use as symptom signals only

The following items are deliberately separated from research findings and
official guidance. No public prompt text is copied.

| ID | Public report and access date | Reported symptom | Strict evidence limit |
| --- | --- | --- | --- |
| U1 | [OpenAI Community: *Learn languages at the same time*](https://community.openai.com/t/learn-languages-at-the-same-time/1040799), accessed 2026-08-13 | The author wanted immersive practice across several languages and described message limits as a constraint. | One author's goal and perceived constraint; not prevalence, a current quota claim, a proficiency result, or proof of a remedy. |
| U2 | [OpenAI Community: *Prompt for language learning with stories*](https://community.openai.com/t/prompt-for-language-learning-with-stories/567389), accessed 2026-08-13 | The author reported difficulty keeping generated stories at a requested beginner level, especially outside English. | One reported experience; not a local reproduction, causal diagnosis, language-level assessment, or product-wide conclusion. |

**Project inference:** the first prompt should narrow a broad goal, and each
exercise should expose its difficulty constraints. The reports do not prove
that doing so prevents the reported problem.

## Decision: a reusable collaboration card needs five fields

A short request can be useful without pretending to be magic. The minimum
contract below works across language practice and source-backed research:

```text
Result: one observable attempt, explanation, or claim ledger
Context: only the information needed for this turn
Boundary: allowed help or sources; what must not happen
Check: evidence to return before calling the result complete
Stop: the ambiguity, missing source, or risk that ends the session
```

**Project inference:** these fields make a beginner's choice, the model's
assistance, and the next check easier to distinguish. They do not guarantee
good output, safety, comprehension, retention, source accuracy, or transfer.

## Five original reusable prompt cards

The cards are concise *templates*, not proprietary product syntax. Replace
bracketed text, remove any field that would cause unnecessary disclosure, and
do not paste credentials, private records, unpublished student work, or
consequential personal data. Each card asks for a result the learner can
inspect, rather than an assurance from the model.

### Card 1 — Make one language goal observable

```text
I am practising [language] for [one real situation]. In this session I want to
be able to [one communicative action] in [5–10] turns.

Ask up to two clarifying questions. Then state a plain-language can-do target.
Do not assign a proficiency level or promise that I will learn it today.
Wait for my attempt before giving examples, translations, or corrections.
At the end, list what I attempted, what help I used, and one next practice.
```

**Use when:** the request is as broad as “learn Spanish.”

**Keep:** chosen situation, target, first attempt, disclosed help, and next
practice.

**Stop when:** the situation requires professional advice, a sensitive real
conversation, or a claim about proficiency.

### Card 2 — Practise before seeing the answer

```text
Give me one short [language] task for [situation]. Limit it to [length],
[known grammar], and at most [number] new words. Mark new words but do not
explain them yet.

Ask me to answer first. After my answer, identify no more than two high-value
issues and ask me to revise. Show a full model answer only after my revision.
Label every hint you gave. Do not call the result fluent, mastered, or CEFR
assessed.
```

**Use when:** an example answer would otherwise replace the learner's work.

**Keep:** task constraints, first attempt, hint level, learner revision, and
any model answer kept separate from the learner response.

**Stop when:** the task's required vocabulary or difficulty cannot be bounded
from the supplied context.

### Card 3 — Test one changed situation, not memory of the wording

```text
Using the target function [for example: ask for directions], create one new
short situation that changes the names, place, and one practical detail. Do
not reuse the sentence you previously taught.

Before I answer, state the three checks: task completion, comprehensibility,
and [one target form]. After my response, report observations separately from
suggestions. Do not claim real-world transfer, retention, or proficiency.
```

**Use when:** the learner has corrected one response and needs a modest
immediate variation.

**Keep:** new task, response, aids, stated checks, and the distinction between
observation and model suggestion.

**Stop when:** the model cannot avoid recycling the taught wording, or scoring
criteria were not agreed before the attempt.

### Card 4 — Build a source-owner map before asking for an answer

```text
My research question is: [one bounded question]. Do not answer it yet.

First, split it into 3–5 atomic claims. For each claim, name the likely primary
source owner or source type, why it is appropriate, what date/version matters,
and what would remain uncertain. Mark any source you cannot inspect as
unverified. Do not invent links, titles, quotations, or access.
```

**Use when:** an answer needs evidence rather than a plausible summary.

**Keep:** question, atomic claims, source-owner map, access date, and
unresolved items.

**Stop when:** the question cannot be narrowed, the needed owner is unknown,
or the requested conclusion would affect a person without appropriate expert
review.

### Card 5 — Produce a claim receipt after source inspection

```text
Using only these sources that I provide or that we have directly inspected:
[source list with dates], draft a short answer to [question].

For every factual claim, attach the supporting source, exact scope, and any
qualification or disagreement. Separate facts, my provided context, and your
inference. Finish with: "Not established by these sources" and a stop receipt
that names the next smallest check. Do not describe the research as complete
or verified beyond the listed sources.
```

**Use when:** sources are already available and the learner needs a bounded
synthesis.

**Keep:** inspected sources, claim-to-source links, quoted scope in the
learner's notes where permitted, unresolved claims, and stop reason.

**Stop when:** a key claim has no source, a source is inaccessible, sources
disagree without a stated resolution rule, or private/copyrighted material
would need to be supplied unnecessarily.

## What a future reader guide may say

A concise reader guide can accurately say that these cards help a beginner
structure one practice or research session around a target, boundary, attempt,
and check. It should say they are **candidate patterns** and show how to keep a
small receipt.

It must not say that the cards teach a language in seven days, improve scores,
produce reliable sources, make an LLM a teacher or researcher, determine a
CEFR level, work across all models, or guarantee safety. **`not_run`:** no
prompt card was executed in this repository; no language or research outcome
has been measured.

## Source ledger

All source URLs below were accessed on **2026-08-13**. The referenced content
remains with its respective owners. This record is an original Prysai Lab
synthesis and copies no external prompt, assessment item, forum content,
image, or dataset.

| ID | Evidence class | Source | Scoped support | Does not prove |
| --- | --- | --- | --- | --- |
| O1 | Official fact | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | Published recommendations and ratings for spacing, quizzing, and identifying material still needing learning. | LLM tutoring effectiveness, language learning in seven days, or one best schedule. |
| O2 | Official fact | Council of Europe, [CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) | CEFR's illustrative descriptors and reference-level framing. | That a short LLM exchange certifies a CEFR level. |
| O3 | Official fact | Association of College and Research Libraries, [*Framework for Information Literacy for Higher Education*](https://www.ala.org/acrl/standards/ilframework) | Authority/context, inquiry, and strategic searching concepts. | Citation correctness, complete discovery, or the suitability of every source. |
| O4 | Official fact | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | Non-deterministic output and the need to test behavior as prompts or models change. | Learning, factual correctness, or cross-platform equivalence. |
| O5 | Official fact | OpenAI, [Working with evals](https://developers.openai.com/api/docs/guides/evals) | Specified tasks, test inputs, criteria, and iteration for product evaluation. | Valid assessment of a learner or a factual answer. |
| R1 | Research finding | Roediger and Karpicke (2006), [*Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*](https://pubmed.ncbi.nlm.nih.gov/16507066/), DOI 10.1111/j.1467-9280.2006.01693.x | Immediate versus delayed recall pattern in the reported prose-learning experiments. | Language proficiency, LLM tutor effects, or a universal learning method. |
| U1 | Public user report | Public OpenAI Community post listed above. | One author's stated multi-language practice goal and perceived usage constraint. | Prevalence, product state, or a learning outcome. |
| U2 | Public user report | Public OpenAI Community post listed above. | One author's report of difficulty constraints in generated language material. | Root cause, product-wide behavior, or effective remedy. |

**Volatility and review:** owner-managed product documentation and public
forum posts can change. The Council of Europe O2 page returned HTTP 403 when
this record was rechecked from the project environment on 2026-08-13; keep its
recorded access date, but do not treat that recheck as a fresh content fetch.
Recheck O2 and O4-O5 and U1-U2 before using them for any product-specific
reader claim. **Next review:** 2026-11-13, or before a candidate card becomes
a lab or receives learner evidence.

## Stop receipt

Research stopped after identifying source owners for instructional guidance,
language reference descriptors, information-literacy principles, and
prompt/evaluation guidance, then separating two traceable user reports as
symptom signals. No effort was made to prove that a prompt, model, or schedule
causes learning. **`not_run`:** a learner pilot, independent language scorer,
delayed unseen task, source-audit exercise, model comparison, and real-user
research session.
