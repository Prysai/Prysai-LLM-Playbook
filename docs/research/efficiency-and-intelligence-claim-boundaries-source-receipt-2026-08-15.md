# Efficiency and intelligence claim boundaries: source receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)

**Status:** candidate research record. This is a source-backed study-design
receipt, not a measured pilot, psychometric assessment, learner study, model
comparison, productivity result, or safety result.

**Owner:** evaluation-maintainer
**Next review:** 2026-09-15, and before publishing any performance result.

## Question

Which measurements could support a narrow claim that a named LLM workflow or
Skill performed differently on a fixed task, and why must this project forbid
claims that a workflow or Skill improves IQ?

## Evidence classes

| Class | Meaning in this receipt | It does not establish |
| --- | --- | --- |
| `official fact` | An owner describes an evaluation, risk-management, preregistration, or testing-standard principle in its stated scope. | A result for this repository, model, Skill, or learner. |
| `project inference` | A conservative study-design choice derived from the cited sources. | A universal method, causal result, or legal/ethical approval. |
| `not run` | No task run, human participant, model result, or rater score was collected for this receipt. | Efficiency, quality, intelligence, learning, safety, or productivity. |

## What a defensible task-performance study can measure

OpenAI describes evaluations as tests of model outputs against specified style
and content criteria, and describes task cases and graders as components of
that work [S1]. NIST frames AI risk work through voluntary,
context-dependent Govern, Map, Measure, and Manage functions rather than a
single universal score [S2].

For a fixed, disclosed task set, the following can support narrowly worded
descriptive results when their definitions and conditions are preserved:

| Metric | Minimum operational definition | Narrow allowed claim |
| --- | --- | --- |
| Acceptance completion | Independent rubric marks the submitted artifact as meeting every predeclared acceptance criterion. | “On these fixtures, condition A had X/Y accepted submissions.” |
| Time to first scorable submission | Recorded elapsed time from the declared start to the first artifact eligible for the same rubric. | “Under these conditions, recorded time differed by …” |
| Controlled rework | Number of predeclared revision cycles or rubric failures before accepted completion. | “The recorded rework count differed on this task set.” |
| Unsupported-claim or authority error | Fixed rubric counts a named error, such as an unsupported factual assertion or an action beyond a stated envelope. | “Raters observed this error count under the stated rubric.” |
| Blinded quality score | Two independent raters score anonymized artifacts against a predeclared rubric; agreement and disagreement are reported. | “These raters assigned these scores on these artifacts.” |

These are **task-scoped observations**, not an overall capability score. A
passing output, faster timing, or better rubric score does not by itself show
why the difference occurred, whether it persists, whether it transfers to new
tasks, or whether it generalizes across users, models, platforms, languages,
or organizations.

## Why IQ-improvement claims are forbidden

The *Standards for Educational and Psychological Testing* frame validity around
the interpretation and use of test scores, not a label attached after the fact
[S3]. A workflow experiment that measures task completion, elapsed time, or a
project rubric neither administers an intelligence test nor supplies a validity
argument for interpreting its outcome as a change in intelligence.

Therefore this project must not claim, imply, graph, headline, or market any of
the following from a workflow/Skill pilot:

- “IQ increased,” “IQ gain,” “smarter users,” or an intelligence quotient;
- a general cognitive improvement, intelligence ranking, or aptitude diagnosis;
- a causal learning, retention, transfer, productivity, or safety effect unless
  the separately designed study actually measures that named outcome; or
- an estimate of population-level efficiency from a small, selected, or
  synthetic-fixture sample.

Tool assistance, repeated exposure, task familiarity, prompting, model changes,
scoring choices, and selection effects can all coexist with a task-score
difference. This receipt does not identify their causal contribution.

## Minimum experimental design for a candidate workflow/Skill pilot

OSF describes preregistration as a time-stamped, read-only study plan made
before data collection or analysis and recommends specifying hypotheses,
variables, analyses, exclusions, and outcomes [S4]. Combining that transparency
practice with task-and-grader evaluation yields the following **project
inference**:

1. Before collection, preregister the exact task fixtures, baseline and Skill
   conditions, primary metric, secondary metrics, exclusions, stopping rule,
   analysis, and permitted reporting language.
2. Use at least three fixed, synthetic tasks that represent the proposed Skill
   use. Preserve each task version, allowed inputs, model surface, date/version,
   tool availability, and external-action boundary.
3. Compare a defined baseline with the named Skill condition using randomized or
   counterbalanced order. Use fresh sessions where the protocol requires it and
   record all retries, failures, and missing runs.
4. Run at least three repetitions for each task-condition pair. This is a
   practical minimum for revealing run-to-run variation, not a power guarantee
   or a claim of statistical representativeness.
5. Blind two independent raters to condition when they score artifacts. Retain
   the rubric, raw scores, agreement/disagreement, adjudication method, and the
   final unblinded analysis.
6. Report counts, raw or suitably redacted receipts, summary statistics, every
   deviation, and uncertainty. State only the task, conditions, and population
   actually observed.

No credentials, private repositories, customer records, real production
actions, or unconsented human data are necessary for this candidate pilot.

## What this design supports—and what it cannot prove

| Design element | Can support | Cannot prove |
| --- | --- | --- |
| Fixed synthetic fixtures and preserved conditions | A reproducible description of the tested task. | Real-world representativeness or cross-platform equivalence. |
| Baseline/Skill comparison with counterbalancing | A bounded comparison under the stated protocol. | A general causal effect, absent a design and analysis that justify it. |
| Timing and acceptance metrics | Recorded performance differences on the declared fixtures. | Broad productivity, competence, learning, or intelligence. |
| Two blinded raters and a fixed rubric | Auditable scoring for the stated criteria. | Ground truth, complete correctness, or universal quality. |
| Preregistration and retained deviations | Transparency about planned versus changed analysis. | Elimination of bias, adequate sample size, or a positive result. |

## Source ledger

| ID | First-party source | Accessed | Scoped use and boundary |
| --- | --- | --- | --- |
| S1 | [OpenAI, “Working with evals”](https://developers.openai.com/api/docs/guides/evals/) | 2026-08-15 | Official guidance for testing outputs against specified criteria with task cases and graders. It does not report this project's results or define human intelligence. |
| S2 | [NIST, “AI RMF Playbook”](https://www.nist.gov/itl/ai-risk-management-framework/ai-rmf-playbook) | 2026-08-15 | Official description of voluntary, context-dependent Govern, Map, Measure, and Manage guidance. It is not certification, a sample-size rule, or a model-performance result. |
| S3 | [AERA, APA, and NCME, *Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf) | 2026-08-15 | Publisher-owned testing standard used only for the score-interpretation/validity boundary. It does not validate a project rubric as an intelligence measure. |
| S4 | [Center for Open Science, “Create a preregistration”](https://help.osf.io/article/330-create-a-preregistration) | 2026-08-15 | Official OSF guidance for time-stamped planning before data collection/analysis and explicit hypotheses, variables, outcomes, exclusions, and analyses. It does not confer study quality or ethics approval. |

## Source and license boundary

This is original project-authored synthesis. It includes links and brief
paraphrases only; it imports no assessment items, source prose, model output,
participant data, credentials, screenshots, or proprietary fixture. The sources
remain under their owners' terms. This receipt remains `candidate / not run`
until a separately authorized pilot produces the limited evidence described
above.
