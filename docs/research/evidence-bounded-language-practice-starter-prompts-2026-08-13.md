# Evidence-Bounded LLM Language Practice and Six Starter Prompts

**Status:** candidate research note; no learner study, proficiency assessment,
or local model evaluation was run

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Scope:** beginner language-practice sessions assisted by an LLM; this note
does not evaluate a product as a tutor or certify learning outcomes

## Question

What can an evidence-bounded LLM language-practice workflow honestly claim,
and which beginner problems should six starter prompts address?

## Evidence classes used here

- **Official fact:** a statement made by the institution or product owner in
  its official material.
- **Research finding:** a result reported in the cited study, limited to that
  study's participants, tasks, conditions, and measures.
- **User report:** a public author's description of their own goal or symptom.
  It is not evidence of prevalence, root cause, or a general product behavior.
- **Project inference:** an original curriculum or workflow decision derived
  from the evidence. It remains a candidate until tested with learners.

## Concrete finding: claim the observed practice event, not learning in general

An evidence-bounded workflow can honestly claim only what its saved evidence
shows. The strongest routine claim after one session is:

> The learner completed this specified task, under these recorded conditions,
> with these aids, and produced this assessable response against this rubric.

Depending on what was actually retained, the workflow may also report:

| Evidence retained | Honest claim | Claim that is not supported |
| --- | --- | --- |
| First response before hints | An unaided or aid-bounded baseline was observed on this task | The learner's overall level is known |
| Original response, feedback, and learner-authored revision | A correction was produced after disclosed assistance | The correction was independently learned |
| A materially changed immediate task using the same target | Performance was observed on one immediate variation | Transfer to new settings or real conversation occurred |
| A previously unseen task after a recorded delay | Delayed performance was observed on that task under the stated aids | Permanent retention, fluency, or general proficiency |
| External rubric and identified scorer | The response received the recorded score under that rubric | A CEFR level was certified unless a valid assessment process did so |

**Official fact:** the Council of Europe says CEFR reference levels are defined
through structured illustrative “can-do” descriptors across categories [O2].
This supports specifying a communicative performance rather than a vague goal.
It does not authorize an LLM to award a CEFR level from a short exchange.

**Research finding:** in two prose-learning experiments, Roediger and Karpicke
reported that repeated studying performed better after five minutes, while
prior retrieval tests produced greater retention on tests after two days or
one week [R1]. The finding distinguishes immediate performance from delayed
retention under the studied conditions. It is not a language-learning or LLM
tutoring study.

**Research finding:** Cepeda and colleagues varied the gap between study and
review for more than 1,350 participants and found that the gap associated with
better final-test performance depended on the final retention interval [R2].
This argues against one universal review interval. It does not validate a
seven-day plan or establish durable language learning.

**Official fact:** the IES/What Works Clearinghouse practice guide recommends
spacing learning over time (moderate evidence), using quizzes to re-expose
learners to key content (strong evidence), and using tests or quizzes to
identify content that still needs learning (minimal evidence) [O1]. These are
instructional design inputs, not evidence that an LLM tutor or these prompts
are effective.

**Official fact:** OpenAI's prompt-engineering guidance says model output is
non-deterministic and recommends tests and evaluation suites to monitor prompt
behavior across iterations or model changes [O3]. Its eval guidance describes
specifying a task, running test inputs, and analysing results against stated
criteria [O4]. These facts support checking whether a prompt produces the
requested exercise format. They do not measure a learner's proficiency,
retention, or transfer.

## Decision: six starter prompts should solve six different problems

The six prompts below are original project patterns, not copied vendor or
community prompts. Each should ask one question at a time when information is
missing. A product implementation should preserve the learner's responses and
disclose hints instead of allowing the model to certify its own success.

### 1. Turn a broad wish into one observable performance

**Beginner problem:** “learn Spanish” or “practise speaking” does not identify
what the learner will attempt, in which situation, or what counts as enough
for one session.

**Starter-prompt purpose:** ask for the target language, one real situation,
one communicative action, and a short session limit. Restate the result as a
plain-language can-do target without assigning a CEFR level.

**Evidence to retain:** selected situation, target action, time/turn budget,
and learner confirmation.

**Project inference:** a narrow performance makes the session observable. It
does not itself improve learning.

### 2. Capture a baseline before teaching or correcting

**Beginner problem:** an immediate model answer can hide what the learner could
produce or understand without help.

**Starter-prompt purpose:** present one small task and wait for the learner's
response before examples, translations, corrections, or hints. Record any aid
the learner chooses to use.

**Evidence to retain:** exact task, first response, elapsed turns if relevant,
and aids used.

**Project inference from [O1] and [R1]:** retrieval before answer exposure
creates inspectable baseline evidence and is compatible with retrieval-practice
research. The cited research does not prove that this LLM-mediated baseline
causes language learning.

### 3. Keep input difficulty inspectable

**Beginner problem:** labels such as “easy” or “beginner” do not reliably bound
vocabulary, sentence form, speed, or the number of new items.

**Starter-prompt purpose:** ask for known words or a short sample, then generate
one bounded item with limits on length, grammar, new vocabulary, and response
mode. Mark new items and ask a comprehension question before continuing.

**Evidence to retain:** declared constraints, generated item, flagged new
material, and the learner's comprehension response.

**Project inference:** difficulty needs an auditable contract. The model's own
claim that material is “A1” or “beginner” is not independent assessment.

### 4. Give bounded feedback and require learner correction

**Beginner problem:** a polished model rewrite can replace the learner's work,
making recognition look like production.

**Starter-prompt purpose:** identify at most one or two high-value issues,
explain them briefly, and ask the learner to revise before showing a complete
model answer. Record the help level: location cue, partial hint, explanation,
or worked example.

**Evidence to retain:** original response, feedback, help level, and
learner-authored revision.

**Project inference:** keeping both versions distinguishes assisted correction
from the initial performance. It does not establish independent retention.

### 5. Check one immediate variation instead of repeating the answer

**Beginner problem:** repeating the corrected sentence can test short-term
imitation rather than use of the target in a changed situation.

**Starter-prompt purpose:** create one new scenario that preserves the target
function but changes names, details, and one communicative wrinkle. Do not
reuse the taught sentence. Score only predefined dimensions such as task
completion, comprehensibility, and the target form.

**Evidence to retain:** changed task, response, aids, rubric, scorer, and score.

**Project inference:** success supports “observed on one immediate variation.”
It must not be reported as broad transfer or real-world fluency.

### 6. Run a delayed unseen check and issue a claim receipt

**Beginner problem:** a good end-of-session response is easily mistaken for
retention, and arbitrary schedules are easily marketed as guarantees.

**Starter-prompt purpose:** propose—not falsely claim to schedule—a later,
previously hidden task. At the later session, record the actual delay, task,
response, aids, and rubric result. Finish with supported observations,
unresolved weaknesses, and prohibited claims.

**Evidence to retain:** planned and actual delay, proof the task was not shown
early where available, delayed response, aids, score, and claim receipt.

**Project inference from [O1], [R1], and [R2]:** delayed evidence is needed
before making even a narrow retention observation, and timing should be tied
to the intended check rather than one universal interval. One delayed success
does not establish permanent retention, general transfer, or fluency.

## Public user reports: symptoms only

This section is deliberately separate from research and official guidance. No
prompt text is copied. Each row records only what the public author reported.
These reports do not establish prevalence, root cause, product-wide behavior,
or instructional effectiveness.

| ID | Public report and access date | Reported symptom | Evidence limit |
| --- | --- | --- | --- |
| U1 | [OpenAI Community: Learn languages at the same time](https://community.openai.com/t/learn-languages-at-the-same-time/1040799), accessed 2026-08-13 | The author wanted immersive practice in several languages and described message limits as constraining that use. | One person's goal and perceived constraint; no level, outcome, prevalence, current quota, or causal diagnosis was established. |
| U2 | [OpenAI Community: Prompt for language learning with stories](https://community.openai.com/t/prompt-for-language-learning-with-stories/567389), accessed 2026-08-13 | The author reported that requested beginner stories contained longer sentences and harder language, especially outside English. | One reported generation pattern; no local reproduction, frequency estimate, root cause, or validated proficiency alignment. |
| U3 | [OpenAI Community: Hallucinated URLs and fake article titles](https://community.openai.com/t/critical-hallucinated-urls-fake-article-titles-in-web-mode-despite-verification-requests/1253893), accessed 2026-08-13 | The author alleged that a web-enabled response supplied invented article titles and URLs despite a request for verification. | One unverified report, included because language practice may request explanations or sources; no official incident finding or current product-wide conclusion. |

**Project inference from U1-U3:** starter experiences should narrow the goal,
make difficulty inspectable, and treat generated factual explanations or links
as claims requiring external checking. The reports do not prove that the six
prompt patterns solve these problems.

## Evidence and assessment boundaries

The workflow may describe a task, conditions, attempts, aids, revisions,
scores, and delayed observations. It must not claim any of the following from
these artifacts alone:

- that LLM tutoring is effective;
- that a learner is fluent or has achieved a CEFR level;
- that learning occurred in seven days;
- that material was retained without a delayed measure;
- that performance transfers beyond the observed changed or unseen task;
- that model feedback, difficulty labels, explanations, or scores are correct
  without an appropriate external check;
- that a reminder or later session occurred merely because the model proposed
  one.

If the same LLM creates the task, teaches, and scores it, disclose that
dependence. For consequential placement, certification, accessibility, or
high-stakes feedback, use qualified human judgment and an appropriate
assessment process rather than this workflow.

## Source ledger

All sources were accessed on **2026-08-13**. Hosted text, papers, descriptors,
tables, assessment instruments, and community posts remain with their owners;
this note cites them as references and does not reproduce their prompt text or
assessment content.

| ID | Evidence class | Source | What it supports here | What it does not prove |
| --- | --- | --- | --- | --- |
| O1 | official fact | U.S. Institute of Education Sciences / What Works Clearinghouse, [*Organizing Instruction and Study to Improve Student Learning*](https://ies.ed.gov/ncee/wwc/PracticeGuide/1) | Published recommendations and evidence ratings for spacing, quizzing, and identifying material needing further study | LLM tutoring effectiveness, language proficiency, one optimal schedule, or these prompts' effectiveness |
| O2 | official fact | Council of Europe, [CEFR Descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) and linked 2020 Companion Volume | CEFR levels use structured illustrative can-do descriptors across categories | That an LLM exercise or project rubric can certify a CEFR level |
| O3 | official fact | OpenAI, [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) | Model output is non-deterministic; prompt behavior should be tested and monitored as prompts or models change | Educational effectiveness, correctness of generated language feedback, or cross-platform behavior |
| O4 | official fact | OpenAI, [Working with evals](https://developers.openai.com/api/docs/guides/evals) | Product evaluations connect a specified task, test inputs, criteria, analysis, and iteration | Learner assessment validity, language proficiency, retention, or transfer |
| R1 | research finding | Roediger and Karpicke (2006), [*Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*](https://pubmed.ncbi.nlm.nih.gov/16507066/), DOI 10.1111/j.1467-9280.2006.01693.x | Delayed prose recall differed after retrieval testing versus restudy under the reported experiments | Language fluency, universal effects, LLM tutoring effectiveness, or this workflow's outcomes |
| R2 | research finding | Cepeda et al. (2008), [*Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention*](https://pubmed.ncbi.nlm.nih.gov/19076480/), DOI 10.1111/j.1467-9280.2008.02209.x | Review timing interacted with the final test delay in the reported fact-learning study | One interval for every learner/task, seven-day learning, fluency, or permanent retention |
| U1-U3 | user report | Public community posts listed in the separated section above | Named authors reported the listed goals or symptoms | Prevalence, root cause, official product facts, or effectiveness of a remedy |

**Volatility:** OpenAI product guidance is owner-controlled and may change;
recheck O3-O4 before reader-facing product claims. **Next review:** 2026-11-13
or earlier if the prompt pack is piloted or the cited product guidance changes.

## Acceptance checklist for a future six-prompt pack

- [ ] Each prompt addresses exactly one of the six named beginner problems.
- [ ] The target, conditions, aids, and pass dimensions are stated before use.
- [ ] The baseline appears before examples or corrections.
- [ ] The learner's original response and authored revision are both retained.
- [ ] Immediate variation and delayed unseen checks are labeled separately.
- [ ] CEFR language is used for task description, not automatic certification.
- [ ] Model-output evaluation is not presented as learner-outcome assessment.
- [ ] User reports remain separated and are never converted into prevalence or
  root-cause claims.
- [ ] Final receipts state supported observations and explicit non-claims.

## Stop receipt

Research stopped when the requested claim types had primary owners: IES for
instructional recommendations, the Council of Europe for CEFR descriptors,
original retrieval and spacing studies for delayed-memory findings, and
OpenAI for current product prompting/evaluation guidance. Three public reports
were retained only as symptom evidence. No learner trial, independent scorer,
runtime prompt test, delayed language assessment, or transfer study was run;
the six-prompt design therefore remains a project inference and research
candidate.
