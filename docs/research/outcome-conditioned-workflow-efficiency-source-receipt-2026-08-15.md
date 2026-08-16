# Workflow efficiency needs an accepted outcome and separate incident evidence

**Status:** candidate research receipt / `not_run`
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Owner:** evaluation-maintainer
**Next review:** before publishing any workflow-performance result.

## Question and narrow delta

How can a future LLM-workflow comparison report task completion, elapsed time,
quality, and error/incident rate without treating a faster draft as an
efficiency result—or any task score as an IQ result?

Existing Prysai records already require fixed tasks, rubrics, timing, rework,
and error flags. This receipt adds one narrow interpretation rule: **time may
be compared only beside the same-condition acceptance, quality, and incident
denominators.** A shorter time among accepted artifacts is not a speed claim
about all attempts if the conditions had different failure, blocking, or
incident rates.

No model call, participant session, score, incident, chart, or outcome was
collected for this record.

## Primary-source boundary

OpenAI describes evaluations as tests of model outputs against specified style
and content criteria, using test inputs followed by analysis and iteration
[O1]. NIST SP 800-55 Rev. 1 says performance measures should yield
quantifiable information, use readily obtainable data, be repeatable, and
track change using the same reference points [O2]. Those sources support
defined, repeatable task metrics; neither supplies an LLM-workflow result.

DORA separates software-delivery **throughput** from **instability**, including
time-oriented measures and ratios for failures requiring intervention or
unplanned rework [O3]. That is software-delivery guidance, not an LLM study.
Its limited lesson here is a project inference: a faster workflow output must
not hide a separate increase in fixed-category errors or remedial work.

The *Standards for Educational and Psychological Testing* treat validity as
evidence for the intended interpretation and use of a score [O4]. Completion,
elapsed time, a local quality rubric, and incident counts measure declared
task artifacts under declared conditions. They do not administer an
intelligence test or provide a validity argument for an IQ interpretation.

## Candidate reporting bundle

For one frozen task set and condition, retain these measures separately:

| Measure | Required denominator or boundary | Narrow permitted wording |
| --- | --- | --- |
| Acceptance completion | accepted attempts / all started attempts; show `blocked`, withdrawn, and missing separately | “`X/Y` declared attempts met this rubric.” |
| Elapsed time | start to first accepted artifact; show the accepted-attempt count and all non-accepted outcomes beside it | “Among `X` accepted attempts, median recorded time was `T`.” |
| Quality | fixed-rubric score for every scorable artifact, including scorer disagreement | “Under this rubric, these artifacts received these scores.” |
| Error or incident rate | fixed error taxonomy; affected attempts / all started attempts, with a separate count by category | “`E/Y` attempts had the named observed error.” |
| Rework or recovery | predeclared correction or recovery event / all started attempts | “`R/Y` attempts required the declared rework.” |

Do not convert missing records to failures or passes. Do not average time over
tasks with different acceptance definitions. Do not compress these rows into a
single “efficiency score” unless a future, predeclared decision rule explains
the units, trade-offs, weights, and what the composite cannot mean.

## Explicit non-claims

This receipt does not establish that any Prysai Skill, LLM, learner, or team:

- completes work faster, produces higher quality, reduces errors, or is safer;
- has a general productivity, learning, causal, or cross-platform benefit; or
- gains IQ, intelligence, aptitude, or any other psychological trait.

It does not validate the existing rubric, classify a real event as an
incident, supply a sample-size rule, or authorize model execution or human
data collection. A future result must preserve the exact task, revision,
condition, raw/de-identified records, exclusions, scoring process, and claim
limit.

## Source ledger and reuse boundary

| ID | Primary source | Accessed | Scoped use only |
| --- | --- | --- | --- |
| O1 | [OpenAI, “Working with evals”](https://developers.openai.com/api/docs/guides/evals) | 2026-08-15 | Defined output criteria, test inputs, analysis, and iteration for OpenAI evaluation work; not a Prysai or human-study result. |
| O2 | [NIST SP 800-55 Rev. 1, *Performance Measurement Guide for Information Security*](https://csrc.nist.gov/pubs/sp/800/55/r1/final) | 2026-08-15 | Quantifiable, obtainable, repeatable measures and same-reference-point trend tracking; security-program scope only. |
| O3 | [DORA, “DORA’s software delivery performance metrics”](https://dora.dev/guides/dora-metrics-four-keys/) | 2026-08-15 | Official DORA distinction between throughput and instability, including failure and rework ratios; software-delivery scope only. |
| O4 | [AERA, APA, and NCME, *Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf) | 2026-08-15 | Validity boundary for interpreting and using scores; does not make a workflow rubric an intelligence assessment. |

This is original Prysai Lab synthesis. It links and briefly paraphrases
sources only; it copies no test items, model output, participant data,
credentials, or external assets.
