# First-turn language practice and verification: source receipt

**Status:** research candidate; `not_run`

**Accessed:** 2026-08-15 (America/Los_Angeles)

**Owner:** Prysai Lab curriculum maintainer

**Next review:** 2026-11-15, or before this record is used in a reader-facing
language-practice card, a claim about a named product, or a claim about learner
outcomes.

## Question and scope

What do source-owner guidance, established assessment principles, and two
narrow public user reports support for a **low-risk, text-only first language
practice attempt with an LLM**? In particular, how should a curriculum handle
the claim shape “learn a language in seven days” without converting a short,
polished exchange into a learning result?

This receipt concerns a learner who types a short response to a fictional,
everyday scenario and inspects generated feedback. It excludes voice or
pronunciation assessment, placement, certification, medical/legal/financial
language, minors, personal or sensitive data, browsing, uploads, tools,
external actions, and a particular product's account limits. It is not a study
of LLM tutoring, a language program, or a safety assessment.

No Prysai learner session, model run, delayed check, transfer task, independent
score, or public-result collection was conducted for this receipt. A copy-ready
prompt below is therefore a **candidate practice card**, not a verified method.

## Evidence classes

| Class | Use in this receipt | Does not establish |
| --- | --- | --- |
| Official fact | Current guidance or material published by the organization that owns it. | Cross-product behavior, output correctness, or learning effectiveness. |
| Assessment principle | A standard for deciding whether evidence supports an intended interpretation. | That this informal activity is a valid assessment. |
| Public user report | One dated author's description of a problem or need in a public forum. | Frequency, cause, product-wide behavior, a current limit, or a working remedy. |
| Project inference | A Prysai-designed constraint or wording choice derived from the bounded record. | That the design is safe or useful until it is evaluated. |
| `not_run` | A needed observation was not performed. | The outcome that the missing observation would measure. |

## Claim-versus-evidence record

| Proposed statement | Evidence that can support it | Required boundary |
| --- | --- | --- |
| A model reply is not a stable guarantee merely because a prompt is detailed. | OpenAI describes generated content as non-deterministic and recommends tests/evaluation suites as prompts and model versions change [O1]. | This is product-scoped guidance, not evidence that every response is wrong or that all LLMs behave alike. |
| A first card can ask for one bounded response and a small output. | OpenAI's safety guidance recommends constraining inputs and output length as a risk-reduction measure in its application/agent context [O2]. | This is a project inference for a text-only card; it does not make a chat safe, prevent all errors, or cover tools, voice, personal data, or high-stakes use. |
| A learner should attempt an answer before receiving a model example, and return after a delay if making a later observation. | The IES practice guide addresses spacing learning over time and using quizzing; it also distinguishes immediate work from later review [O3]. | The guide is not an LLM, language-tutoring, or seven-day study. It does not validate this sequence or predict a learner outcome. |
| A result label needs evidence matched to its intended interpretation. | The *Standards for Educational and Psychological Testing* treats validity as evidence supporting proposed score interpretations and uses [O4]. | An LLM correction, a fluent-looking exchange, or a card completion is not a language score, placement decision, certification, or proof of proficiency. |
| “Learn a language in seven days” is an outcome claim, not a description of a chat schedule. | No inspected source defines that claim's learner baseline, target function, aids, criterion, delayed check, or transfer measure. [O3] and [O4] make those missing distinctions material. | A curriculum may say “a seven-day practice schedule” only when its activities and evidence are defined. It must not say fluent, mastered, certified, or learned a language in seven days. |

## Narrow public signals, not product facts

The following reports were accessed on 2026-08-15. They are paraphrased; no
forum prose, screenshots, prompts, or user data are copied.

| ID | Dated public report | Narrow signal | Candidate response | Limit |
| --- | --- | --- | --- | --- |
| R1 | An OpenAI Community post dated 2023-12-21 described generated reading material that did not consistently remain within the writer's requested beginner boundary. | A broad level label can be hard for a learner to inspect in generated material. | Ask for one short scenario, a maximum number of new words, and a sample before a longer practice set. | One report; it does not establish a model defect, prevalence, a language-level measure, or that these constraints solve the problem. |
| R2 | An OpenAI Community post dated 2024-12-03 asked about a perceived voice/message constraint while seeking extended multi-language practice. | A practice plan can fail if it assumes unlimited turns or a particular feature. | Make the first card text-only and finishable in a small turn budget; keep a learner-owned written record. | One report; it does not establish a present quota, entitlement, feature availability, or an outcome from voice practice. |

These two reports identify possible design friction only. They do not establish
user demand, safety, retention, platform behavior, or a remedy. They are not
used to claim that an LLM can assess a learner's level or that a model should
replace a teacher, qualified assessor, or appropriate human review.

## What can safely become a copy-ready prompt card

The following wording is an original **project inference**. It is suitable only
for a low-risk, text-only rehearsal using fictional or non-sensitive details.
It keeps the learner's attempt separate from model output and asks the model to
expose uncertainty. It does not rely on a named model feature, account tier, or
external tool.

> I am practising one small written interaction in **[language]**. My target is
> **[one situation and one action]**, for example asking for a train time. I
> already know **[known words or forms]**. Keep the scenario to **[two turns]**
> and introduce no more than **[three]** new words. Do not use personal data,
> web sources, tools, files, or voice features.
>
> First, give me only the scenario and wait for my answer. After I reply:
>
> 1. identify at most two checkable differences from the stated target;
> 2. explain each difference briefly, and flag any uncertain correction as
>    uncertain;
> 3. ask me to write my own revision before showing an optional example; and
> 4. give one changed scenario for one more attempt.
>
> Label this as typed rehearsal with disclosed help. Do not assign a proficiency
> level or say that this proves fluency, learning, retention, or readiness for a
> real conversation.

### Card evidence and stop rule

| Keep | May be described as | Must not be inferred |
| --- | --- | --- |
| Learner's original typed reply, model response, learner-authored revision, stated target, aid level, and changed scenario. | One assisted typed practice attempt under stated conditions. | A language level, spoken ability, independent performance, retention, transfer, or a general learning outcome. |
| An unresolved or disputed correction. | `unresolved`; a reason to check an appropriate reference or human reviewer. | A correct correction because it is fluent, confident, or formatted as feedback. |
| A request that would add personal data, live voice, web claims, tools, uploads, or consequential advice. | `out_of_scope` for this card. | Permission to broaden the activity or an adequate safety review. |

The card should stop, rather than improvise, if the learner cannot state one
observable written target, asks for a placement/proficiency judgment, needs a
source-dependent factual answer, or introduces sensitive personal material.

## Claims that must not be made

Do not claim that this card, an LLM, or a short exchange:

- teaches, improves, accelerates, or measures language learning;
- enables a person to learn, master, or become fluent in a language in seven
  days, six prompts, or any other fixed period;
- raises IQ, productivity, motivation, retention, or transfer;
- accurately detects a learner's level, provides authoritative grammar
  correction, or replaces a qualified teacher or assessment process;
- establishes spoken conversation, pronunciation, listening comprehension, or
  real-world readiness from typed rehearsal;
- is safe for personal data, high-stakes decisions, voice, browsing, tools, or
  external actions; or
- works the same way across LLM products, model versions, account plans,
  languages, or user populations.

## Source ledger

All links below were accessed on **2026-08-15**. Product documentation and
community posts are volatile. Recheck them before a product-specific claim.
The external material remains with its owners; this is an original synthesis
and does not copy external prompt wording, forum prose, assessment items,
images, audio, code, or user data.

| ID | Evidence class | Owner, source, and access date | Scoped use | Does not prove |
| --- | --- | --- | --- | --- |
| O1 | Official fact | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering), accessed 2026-08-15 | Product-scoped statement that generated content is non-deterministic and recommendation to build tests/evaluation suites as prompts and models change. | Correctness, learner benefit, a universal prompting rule, or behavior of another product. |
| O2 | Official fact | OpenAI, [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices), accessed 2026-08-15 | Product-owner safety guidance concerning constrained input/output and human review in application/agent settings. | That this card is safe, that the guidance validates educational practice, or that a risk is removed. |
| O3 | Official fact | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), accessed 2026-08-15 | Published practice-guide recommendations concerning spacing and quizzing in study/instruction. | LLM tutoring efficacy, second-language outcomes, one schedule, or the candidate card. |
| O4 | Assessment principle | American Educational Research Association, American Psychological Association, and National Council on Measurement in Education, [*Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf), accessed 2026-08-15 | A standards-based lens for matching an interpretation to evidence appropriate to its intended use. | That the card is a test or that any LLM feedback creates a valid score. |
| R1 | Public user report | OpenAI Community, [*Prompt for language learning with stories*](https://community.openai.com/t/prompt-for-language-learning-with-stories/567389), post dated 2023-12-21; accessed 2026-08-15 | One reported difficulty with a requested language-material boundary. | Frequency, cause, current behavior, language assessment, or a validated fix. |
| R2 | Public user report | OpenAI Community, [*Learn languages at the same time*](https://community.openai.com/t/learn-languages-at-the-same-time/1040799), post dated 2024-12-03; accessed 2026-08-15 | One reported desire for extended multi-language practice and a perceived access constraint. | A current limit, product feature, account entitlement, or learning result. |

## Stop receipt and next evidence

Research stopped after four source-owner/standards sources and two dated,
narrow public reports had been checked. This is enough to bound a candidate
first-turn card, not enough to make an efficacy, speed, proficiency, safety,
or product claim.

Before promotion beyond `candidate / not_run`, an authorized evaluation would
need a defined learner population and written target; consent and data
minimization; predeclared allowed aids and turn budget; retained original
attempts and revisions; a changed and delayed task; a fit-for-purpose scoring
approach; and a claim inventory that matches the resulting evidence. None of
those outcome data exist in this receipt.

