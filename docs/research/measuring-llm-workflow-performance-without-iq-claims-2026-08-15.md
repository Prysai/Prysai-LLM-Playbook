# Measuring LLM workflow performance without IQ claims

**Status:** research candidate; no Prysai learner, model-output, productivity,
or intelligence result is recorded here.
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Decision owner:** Prysai Lab evaluation maintainer
**Next review:** 2026-11-15, or before publishing a pilot result or any
reader-facing efficiency claim.

## Question and claim boundary

What evidence would be needed to make a narrow, credible statement about a
Prysai method or Skill helping with a fixed LLM workflow task?

The project can test **task performance under declared conditions**. It must
not treat a faster answer, a better prompt, or a higher rubric score as an
increase in intelligence or IQ. Intelligence-test scores are a distinct
psychometric construct: the standards for educational and psychological
testing require validity evidence for the interpretation and use of scores
[T1]. Retesting and practice can also change cognitive-test scores independent
of any general ability change [R1].

Accordingly, this project will not test, chart, or market these claims:

- “This Playbook improves IQ.”
- “These Skills make users more intelligent.”
- “A small pilot proves general productivity, learning, safety, or model
  quality.”

The strongest future wording is task-scoped, version-scoped, and conditional,
for example:

> “In the declared pilot task set, with Playbook revision `<SHA>` and the
> recorded model surface, the intervention condition had `<observed result>`.
> This descriptive result is limited to the volunteer sample, tasks, and
> conditions; it does not measure IQ or establish a general efficiency,
> learning, safety, or platform effect.”

No placeholder in that sentence may be filled until the corresponding
de-identified record exists.

## What exists today

| Evidence stream | Current record | What is actually measured | What it does not measure |
| --- | --- | --- | --- |
| Local engineering stability | [five repeated verification runs](../quality/verification-stability-2026-08-15.md) | Seven named structural checks passed in five sequential local Windows runs | Reader time saved, Skill behavior, model performance, learning, safety, or IQ |
| Model-output process | [Shift Handoff fixture](../../evals/candidates/shift-handoff-v1/README.md) and [protocol](../quality/shift-handoff-pilot-protocol-v1.md) | A frozen fictional receipt task, once actual model records and two independent scores exist | A person's productivity, learning, real-work correctness, or cross-model result |
| Human task usability | [First Win pilot protocol](../quality/first-win-pilot-protocol-v2.md) | Whether a declared volunteer cohort can complete, check, recover, and attempt fixed transfer tasks | General teaching effectiveness, retention beyond its declared delayed check, demand, or IQ |

The first stream has raw timings and a chart. The other two are
`candidate / not_run`: their checked-in record templates contain no observed
model or participant results. Zero records are not a zero-percent result.

## Minimum design for a credible task-performance pilot

This is a Prysai research design inference informed by the sources below. It
does not itself authorize recruitment, data collection, model API calls, or a
publication claim.

1. **Freeze the intervention.** Record the exact repository commit SHA,
   task/fixture revision, model surface and identifier, visible settings, tool
   state, locale, and scoring rubric before the first run. OpenAI's evaluation
   guidance describes evaluating model outputs against specified criteria and
   then analysing and iterating [O1]; the project additionally retains its
   fixtures, conditions, and artifacts so a reviewer can inspect scope.
2. **Use an equal comparison.** Give each condition the same fictional facts,
   authority boundary, acceptance definition, and time limit. Vary only the
   method being studied, such as a conventional brief versus the Shift Handoff
   method. For a within-person human design, use equivalent task versions and
   counterbalance condition order so a second attempt is not silently counted
   as a method effect.
3. **Measure observable work, not traits.** Timestamp the start and first
   scorable submission; retain the first answer, revision count, fixed-rubric
   outcome, help used, failure/stop reason, and de-identified artifact
   reference. NIST's AI RMF Playbook says measurement choices need to fit the
   context and that limitations or unmeasured characteristics should be
   documented [N1][N2].
4. **Blind the score where practical.** Two different people score the
   de-identified artifacts without participant identity, condition, or order.
   Preserve both scores and the reason for disagreement. Do not replace a
   second scorer with the same author, the participant, or an undisclosed
   model judge.
5. **Keep every outcome.** Preserve included records, withdrawals,
   exclusions, condition deviations, safety stops, missing delayed sessions,
   and rubric disagreements. A missing record is missing; it is neither a
   pass nor a failure.
6. **Predeclare before collection.** Freeze the question, task set, primary
   outcome, sample source, inclusion/exclusion rules, analysis method, and
   stop rule in a time-stamped, read-only registration. OSF describes a
   preregistration as a frozen plan before data collection or analysis [C1].

For a first 5–8-person volunteer round, report individual or distributional
descriptions, medians, counts, and deviations. Do not report statistical
significance, leaderboards, universal percentage gains, or causal language.
That first round is instrument and usability debugging, not a powered efficacy
study.

## Measures, charts, and allowed language

| Measure | Inspectable definition | Suitable chart or table | Allowed conclusion | Not allowed |
| --- | --- | --- | --- | --- |
| Acceptance completion | Count meeting the frozen checklist before the declared deadline | Per-condition count and denominator; individual record table | “`X/Y` records met this fixture's receipt checklist.” | “The Skill works for everyone.” |
| Recorded time | Timestamp difference from task start to first scorable submission | Dot plot plus median and range, never a machine-speed score | “Median recorded interface time was `A` versus `B` seconds in this round.” | “Users became `N%` more productive.” |
| Controlled rework | A rubric-required correction after the initial response | Count/rate with `not_observed` separately visible | “`X/Y` observed records needed a defined correction.” | “The method eliminates mistakes.” |
| Authority or fact boundary errors | A frozen-rubric flag for unsupported facts or ungranted action | Individual error matrix, plus condition counts | “The stated errors were observed in these fixture records.” | “The workflow is safe/secure.” |
| Double-blind rubric score | Two named scorer-role records, dimensions and disagreement reason retained | Paired score table and agreement/disagreement table | “Scores under this rubric were `…`; disagreement remained `…`.” | “The score objectively proves quality.” |
| Optional participant experience | Anonymous response to a narrow question such as “Was the next safe step clear?” | Response distribution with non-response count | “Participants reported `…` in this voluntary round.” | “Users learned” or “the workflow improved performance.” |

The existing Shift Handoff analyzer will generate JSON, Markdown, and an SVG
only after it receives authorized, de-identified records. With its checked-in
zero-record template, it generates an explicit `not_run` result and refuses to
compute a benefit. This prevents a visually persuasive chart from presenting
missing data as a negative or positive outcome.

## Privacy, consent, and stop conditions

Before a human pilot, name the privacy owner, moderator, independent scorer,
retention end, deletion owner, recruitment channel, and the exact candidate
revision. The existing First Win and Shift Handoff protocols already require
voluntary adults, data minimisation, de-identified records, two distinct
scorer roles, and a stop for private material or a changed condition.

The consent notice must say plainly that participation is voluntary; it is not
an intelligence, employment, grading, medical, or performance evaluation; and
that a participant may stop without penalty. It should list what is collected
(for example, task time, sanitized task artifact, rubric score, and optional
feedback), what is prohibited (secrets, client data, private chats, account
data, sensitive personal data, and real workplace material), retention period,
access roles, and deletion process. U.S. Common Rule consent guidance requires
information that a reasonable person can understand and focuses on the
information a person needs to decide whether to participate [H1][H2]. If a
round involves an institution, identifiable information, minors, employees,
or a publication claim broader than this project, its ethics, privacy, and
legal owners must decide what additional review applies.

## Immediate operational path

1. Run the existing local verification suite and retain the raw local timing
   record only as engineering evidence.
2. For the model-output question, run the fixed fictional Shift Handoff
   fixture with its frozen conditions: three tasks × three fresh runs × two
   conditions. A dedicated authorisation is still required before calling a
   model service; no API key, model call, or model result is stored in this
   repository today.
3. Have two independent human scorers use the existing rubric, then pass only
   de-identified run records to
   [`analyze_shift_handoff_pilot.py`](../../scripts/analyze_shift_handoff_pilot.py).
4. For a reader question, follow the separate First Win protocol and publish
   only its de-identified descriptive aggregate after the declared privacy and
   review gates are met.

Do not pool engineering timings, model-output records, and human observations
into one “efficiency” score. They answer different questions.

## Source ledger

All sources below were accessed on **2026-08-15**. They are reference-only
sources; no external instrument, test item, consent form, source prose, user
record, model output, or vendor configuration was copied into the project.

| ID | Evidence class | Source and owner | Narrow use in this record | Does not prove |
| --- | --- | --- | --- | --- |
| T1 | testing standard | AERA, APA, NCME, [*Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf) | Score interpretation and use require appropriate validity evidence. | That Prysai has a valid assessment, measures IQ, or may assess any participant. |
| R1 | scholarly study | National Library of Medicine index, [*Retesting in selection: a meta-analysis*](https://pubmed.ncbi.nlm.nih.gov/17371085/) | Practice/retest effects can confound before/after cognitive-test comparisons. | A causal effect of any Prysai method, or a result for any population. |
| O1 | official product guidance | OpenAI, [*Working with evals*](https://developers.openai.com/api/docs/guides/evals) | Evaluate model outputs against defined criteria, analyse results, and iterate. | A valid human study, a Prysai model result, or cross-platform behavior. |
| N1 | official risk-management guidance | NIST, [AI RMF Playbook: Map](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Map) | Context, users, impacts, and limitations should be identified for an evaluation. | That this project satisfies NIST AI RMF or is low risk. |
| N2 | official risk-management guidance | NIST, [AI RMF Playbook: Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure) | Use context-appropriate measurements and document limits/unmeasured characteristics. | That a metric is complete, valid, or sufficient for release. |
| C1 | official research-platform guidance | Center for Open Science, [Create a preregistration](https://help.osf.io/article/330-create-a-preregistration) | A time-stamped, read-only plan before data collection or analysis. | The quality, approval, ethical status, or result of a future study. |
| H1 | official regulation | U.S. eCFR, [45 CFR §46.102](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46/subpart-A/section-46.102) | Definitions and scope reference for human-subjects research. | That this pilot is regulated research, exempt, approved, or appropriate for every jurisdiction. |
| H2 | official regulation | U.S. eCFR, [45 CFR §46.116](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46/subpart-A/section-46.116) | Understandable informed-consent information and key-information requirements. | Legal advice, IRB approval, or compliance outside the source's scope. |

## Stop receipt

This record establishes a measurement and communication boundary, not a
Prysai outcome. At close, no authorized external model execution, volunteer
recruitment, participant session, independent scoring record, model-output
aggregate, productivity result, learner result, safety result, or IQ result
had been recorded. The status therefore remains `candidate / not_run` for
those claims.
