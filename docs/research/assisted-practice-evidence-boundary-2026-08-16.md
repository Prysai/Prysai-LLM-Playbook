# Assisted practice is not demonstrated learning: an evidence boundary for beginner LLM education

**Status:** research candidate / `not_run`

**Accessed:** 2026-08-16 (America/Los_Angeles)  
**Decision owner:** Prysai Lab curriculum and evaluation maintainers  
**Next review:** 2026-11-16, or before a reader-facing claim says that a
prompt, model, Skill, or course improves language ability, research ability,
or task performance.

## Question and narrow scope

What may a beginner LLM curriculum responsibly teach about a useful chat
interaction, and what additional evidence is needed before calling it learning
or an effective method?

This record covers low-risk, text-only practice: a learner makes an attempt,
receives bounded assistance, revises it, and inspects the result. It does not
evaluate a model, recruit learners, call a product, collect personal data, or
test a Prysai prompt. It excludes proficiency placement, diagnosis,
certification, speaking assessment, consequential advice, live web research,
uploads, tools, and external actions.

## Source-bounded findings

1. **A clear request is not a learning outcome.** OpenAI's prompt and evals
   guidance describes specifying criteria, evaluating outputs, and iterating
   as the prompt or model changes [O1][O2]. Google's Gemini guidance likewise
   treats clear instructions, response formats, examples, and observed
   revisions as product-specific prompting practice [G1]. These are
   product-owner methods for model-output work. They do not show that a
   learner acquired a skill or that an answer is correct.
2. **One assisted answer is not independent performance.** The IES practice
   guide identifies practices including spacing and quizzing/retrieval that
   matter to instructional design [I1]. A curriculum may therefore preserve a
   learner attempt before giving the answer and schedule a later changed task.
   That is a project design choice, not evidence that an LLM tutor is
   effective. In a foreign-language-vocabulary experiment, Karpicke and
   Roediger found a delayed-recall advantage for repeated retrieval practice
   under their study conditions [K1]; the result does not test LLM tutoring,
   spoken language, or a universal schedule.
3. **A score needs an intended interpretation and support.** The *Standards
   for Educational and Psychological Testing* state that validity concerns the
   interpretation and use of scores [T1]. An LLM correction, a self-score, or
   one project rubric must not be relabelled as a language-proficiency score.
   ACTFL's proficiency guidance can help describe a target performance, but it
   does not authorize this project or a model to award an ACTFL level [A1].
4. **Evaluation conditions and limits need to be visible.** NIST's AI RMF
   Measure guidance calls for measurement that fits the context and for
   documented limitations [N1]. A curriculum evaluation should therefore
   record task revision, assistance, model/product surface, rubric, scorer,
   missing data, and the claim limit.
5. **Human authority remains outside the chat.** UNESCO's education guidance
   identifies human agency, privacy protection, ethical validation, and
   pedagogical design as conditions for generative-AI use in education [U1].
   It does not validate this course or a particular model, but it rules out
   presenting unsupervised model feedback as a substitute for teaching,
   assessment, or accountable human judgment.

## Prysai decision: four evidence states

The following are project labels, not vendor, CEFR, ACTFL, or certification
levels.

| State | Minimum inspectable record | Permitted description | It must not become |
| --- | --- | --- | --- |
| `assisted_attempt` | target, learner attempt, disclosed help, reply, and learner revision | one assisted attempt under stated conditions | proficiency, mastery, or a learning gain |
| `immediate_changed_task` | preceding record plus a changed task and the same stated rubric | performance on one immediate changed task | retention or independent ability |
| `delayed_unseen_task` | recorded delay, unrevealed changed task, aids, response, rubric, and scorer | delayed performance on this task under stated aids | durable fluency or general transfer |
| `task_scoped_evaluation` | frozen method/task, inclusion and exclusions, retained outcomes, fit-for-purpose scoring, and declared limitations | a descriptive result for the recorded sample and task | a general course, model, or platform effect |

The labels make a useful beginner activity inspectable without promising that a
few prompts, a seven-day plan, or a fluent model response teaches a language
or any other skill.

## Minimum candidate protocol

1. Name one observable target (for example, a short fictional restaurant
   request), the allowed aids, and a small response constraint.
2. Preserve the learner's first attempt before the model displays a model
   answer or rewrite.
3. Ask for bounded feedback, then retain the learner-authored revision and the
   help actually used.
4. If the curriculum will make any learning statement, use a changed task;
   separately record any later unseen task and the delay.
5. Before comparing methods, freeze the task, rubric, model/product surface,
   conditions, and stop rule. Retain exclusions, failures, and missing records
   rather than converting them into successes or failures.
6. Report only the evidence state actually reached. Stop and route elsewhere
   if the request becomes a proficiency judgment, a claim of learning speed,
   or a consequential decision.

## What this record does not establish

It does not establish that any LLM, prompt, Skill, teacher, or Prysai material
improves learning, fluency, retention, transfer, research quality, safety, or
productivity. It does not establish a valid assessment, a learner outcome,
cross-platform equivalence, or release readiness. No model call, learner
session, independent score, delayed task, or comparison was run.

## Source ledger and review boundary

This is an original Prysai synthesis. It paraphrases high-level source
guidance and does not copy source prose, tests, prompt text, images, code,
credentials, user material, or product configuration. Linked materials remain
under their owners' terms. Product documentation is volatile; its owner and
next review appear explicitly below.

| ID | Evidence class | Owner and authoritative URL | Accessed | Scoped use | Review boundary | Does not prove |
| --- | --- | --- | --- | --- | --- | --- |
| O1 | official product guidance | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | 2026-08-16 | Criteria, testing, and iteration for OpenAI prompt work. | Owner: OpenAI; volatile; review 2026-11-16. | A learner outcome, response correctness, or another platform's behavior. |
| O2 | official product guidance | OpenAI, [Working with evals](https://platform.openai.com/docs/guides/evals) | 2026-08-16 | Evaluate outputs against defined criteria and iterate. | Owner: OpenAI; volatile; review 2026-11-16. | A human-learning evaluation, valid rubric, or Prysai result. |
| G1 | official product guidance | Google, [Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | 2026-08-16 | Gemini-specific guidance on clear instructions, output format, examples, and iterative refinement. | Owner: Google; volatile; review 2026-11-16. | Other platforms' behavior, response correctness, or learner outcomes. |
| I1 | official instructional guidance | U.S. Institute of Education Sciences / What Works Clearinghouse, [Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | 2026-08-16 | Instructional-design consideration for retrieval and spacing. | Owner: U.S. Department of Education; review 2027-08-16 or when the guide changes. | LLM-tutoring effectiveness, an optimal schedule, or language fluency. |
| K1 | peer-reviewed primary study | Karpicke and Roediger, [The Critical Importance of Retrieval for Learning](https://doi.org/10.1126/science.1152408), *Science* (2008) | 2026-08-16 | Delayed-recall boundary for a studied foreign-language-vocabulary setting. | Authors and journal; reference only; review 2027-08-16 if a learning-effect claim is proposed. | LLM tutoring efficacy, spoken proficiency, a seven-day result, or an optimal practice interval. |
| T1 | professional testing standard | AERA, APA, and NCME, [Standards for Educational and Psychological Testing: Open Access Files](https://www.testingstandards.net/open-access-files.html) | 2026-08-16 | Validity boundary for interpretation and use of a score. | Owners: AERA, APA, NCME; review 2027-08-16 or upon a new edition. | That this curriculum has a valid assessment or may certify ability. |
| A1 | professional proficiency guidance | ACTFL, [ACTFL Proficiency Guidelines](https://www.actfl.org/educator-resources/actfl-proficiency-guidelines) | 2026-08-16 | Vocabulary for specifying a language-performance target. | Owner: ACTFL; review 2027-08-16 or upon a new edition. | That a chat exchange earns an ACTFL rating or measures spoken ability. |
| N1 | official risk-management guidance | NIST, [AI RMF Playbook: Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure) | 2026-08-16 | Context-fit measurement and documented limitations. | Owner: NIST; volatile web guidance; review 2026-11-16. | NIST conformance, safety, efficacy, or release readiness. |
| U1 | intergovernmental education guidance | UNESCO, [Guidance for generative AI in education and research](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research) | 2026-08-16 | Human agency, privacy, ethical validation, and pedagogical-design boundary. | Owner: UNESCO; review 2027-08-16 or upon material guidance revision. | A specific model's safety, pedagogical effectiveness, or project conformance. |

## Stop receipt

Research stopped after reviewing three product-owner records, one U.S.
instructional guide, one testing-standard entry point, one professional
proficiency reference, one U.S. risk-management record, and one
intergovernmental education-guidance record. The sources are sufficient only
for this narrow evidence boundary. Missing evidence includes an authorized
learner protocol, consent and data handling where required, frozen exercises,
model and surface records, independent scoring, delayed tasks, and an analysis
plan. Until those exist, this record remains `candidate / not_run`.
