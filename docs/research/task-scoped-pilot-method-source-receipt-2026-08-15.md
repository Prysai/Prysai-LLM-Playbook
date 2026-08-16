# Task-scoped pilot method: source receipt

**Status:** research candidate; this receipt records methods and boundaries,
not a Prysai outcome. No participant, model-output, efficiency, quality,
learning, safety, or IQ result is reported here.
**Accessed:** 2026-08-15 (America/Los_Angeles)
**Decision owner:** Prysai Lab evaluation maintainer
**Related record:** [Measuring LLM workflow performance without IQ claims](measuring-llm-workflow-performance-without-iq-claims-2026-08-15.md)

## Scope

This receipt answers one narrow design question: how can a future educational
or LLM-workflow pilot describe task-scoped time and rubric quality without
turning those observations into an IQ score, a general productivity claim, or
a causal claim? It does not authorise recruitment, collection, model calls,
or publication.

The measured unit must be a declared task under a declared condition: for
example, whether a de-identified response to a fixed fictional handoff
fixture meets a prewritten acceptance rubric before a stated deadline. A
better score or shorter recorded time is an observation about that task,
sample, revision, model surface, and procedure. It is not a measure of a
person's intelligence.

## Source-backed recommendations

### Pre-register before collecting records

Before the first run, freeze a read-only plan with the task versions,
intervention revision and commit SHA, model surface and settings, participant
eligibility, primary outcome, scoring rubric, exclusion and stop rules,
handling of missing records, and intended descriptive analysis. The Center
for Open Science describes preregistration as a time-stamped, read-only plan
created before data collection or analysis [S1]. A later change is allowed
only as a clearly dated amendment; it must not silently replace the original
plan.

### Separate scoring from delivery and analysis

Use de-identified artifacts. Where practical, give two independent scorers
the same frozen rubric without the condition label, participant identity, or
attempt order. Preserve both scores, any disagreement, its resolution rule,
and the original artifacts. This is a project safeguard against expectancy
and author bias; it is not evidence that a score is objective. NIST says
measurement should fit the context and that limitations, uncertainty, and
unmeasured characteristics need documentation [S2]. OpenAI's evaluation
guidance similarly frames evaluation around specified criteria and iterative
analysis of outputs [S3]. Neither source makes an unblinded single-author
score sufficient for a claim of learning or effectiveness.

### Design for practice effects rather than hiding them

Do not treat a participant's second attempt as a clean estimate of the
method. If the pilot compares two conditions within a person, create
equivalent task variants, counterbalance order, retain the order in the raw
record, and report it. If equivalence or counterbalancing is not feasible,
use a between-person comparison only as a descriptive feasibility exercise,
or avoid the comparative claim. This is a conservative design recommendation:
the relevant sources require that the intended interpretation and limits of a
score be supported and documented [S2][S4], not that a before/after score can
be casually attributed to the intervention.

### Obtain plain, voluntary consent before any human pilot

Use a short notice a reasonable person can understand. It should state that
participation is voluntary and may stop without penalty; that the activity is
not an IQ, employment, grading, medical, or performance assessment; exactly
what will be collected; what must never be entered (secrets, private chats,
client data, sensitive personal data, or real workplace material); who may
access de-identified records; the retention and deletion path; and how to
ask questions. U.S. Common Rule consent requirements emphasize information a
reasonable person would need to decide whether to participate [S5]. The rule
does not decide whether this specific project requires ethics review in a
given jurisdiction; institutional, legal, privacy, and ethics owners must
make that decision before recruitment where applicable.

## Allowed reporting form

Until actual, authorized records exist, use only process language:

> “The pilot protocol predeclares task-scoped completion, recorded time, and
> rubric outcomes. No Prysai participant or model-output result has been
> collected in this record.”

After records exist, report the denominator, task, conditions, revisions,
model surface, exclusions, missing records, scorer disagreement, and raw or
de-identified evidence location. Prefer counts, medians, ranges, and
individual-record tables for an early volunteer round. Do not calculate or
market an “IQ gain,” “intelligence improvement,” universal time saving, or
causal uplift from a small pilot.

## Official-source ledger

All sources below were accessed on **2026-08-15**. They are cited for their
narrow methodological support only; none supplies a result for Prysai.

| ID | Official source | What it supports here | What it does not support |
| --- | --- | --- | --- |
| S1 | Center for Open Science, [Create a preregistration](https://help.osf.io/article/330-create-a-preregistration) | A preregistration is a time-stamped, read-only plan made before data collection or analysis. | That a registered pilot is valid, approved, powered, or positive. |
| S2 | NIST, [AI RMF Playbook: Measure](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure) | Measures should be appropriate to context, with limitations and uncertainty documented. | That this project conforms to NIST AI RMF or that its measures prove efficacy or safety. |
| S3 | OpenAI, [Working with evals](https://developers.openai.com/api/docs/guides/evals) | Model-output evaluation uses defined criteria, analysis, and iteration. | A human-subjects protocol, an IQ assessment, or an observed Prysai result. |
| S4 | AERA, APA, and NCME, [*Standards for Educational and Psychological Testing*](https://www.testingstandards.net/uploads/7/6/6/4/76643089/standards_2014edition.pdf) | Score interpretation and use need appropriate validity evidence. | That a task rubric measures intelligence, general productivity, or a causal intervention effect. |
| S5 | U.S. eCFR, [45 CFR §46.116: General requirements for informed consent](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46/subpart-A/section-46.116) | Consent information must support a reasonable person's decision to participate. | Legal advice, IRB approval, or a determination that this pilot is regulated research. |

## Stop receipt

At close, this document contains no run records, participant data, model
outputs, scores, charts, estimates, or effect sizes. It therefore cannot be
used to claim that any Prysai method, Skill, or curriculum improves efficiency,
quality, intelligence, or IQ.
