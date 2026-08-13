<!-- content_id: lab-018-language-transfer | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-13 -->

---
id: lab-018-language-transfer
title: "Test a beginner travel exchange for retention and transfer"
level: L2
domain: language-learning
goal: "Produce a five-minute beginner travel information exchange under fixed conditions, then test a changed case and a delayed unseen case without converting one result into fluency"
setup: "Synthetic travel cards, a fixed rubric, a disposable local record, no network, credentials, external contact, production system, or automated reminder"
task: "Capture an unaided baseline, use retrieval-first correction, run one changed immediate task, and preserve a delayed unseen transfer task"
evidence:
  - "Baseline, hint ladder, learner-authored correction, and correction ledger"
  - "Immediate changed-case attempt and score against the fixed rubric"
  - "Delayed unseen-transfer attempt, score, unknowns, and calibrated status when actually run"
failure_variant: "Ask the model to declare fluency or mastery after the immediate task; the correct outcome is refusal or a claim narrowed to saved evidence"
reflection: "Which response survived changed context without help, and which claim remains unsupported until the delayed unseen task is run?"
status: draft
run_status: not_run
last_verified: "not run"
transfer_task: "After the declared delay, complete an unseen travel exchange with a changed setting, vocabulary, and ambiguity"
transfer_domain: "beginner travel information exchange"
transfer_evidence: "Preserve task revision, unaided attempt, rubric score, scorer, delay, unknowns, and exact variation"
transfer_limitations: "This lab cannot establish broad language learning, fluency, listening ability, real-world interaction, durable retention outside the stated delay, or model/platform effectiveness"
---

# Lab 018: Test a beginner travel exchange for retention and transfer

## Learning objective

Produce the information needed in a short beginner travel exchange, repair one
meaning-blocking error through graduated hints, and test the same capability in
a changed case. A delayed unseen task is required before any retention claim.

This is a registered `draft / not_run` curriculum artifact with no learner,
delayed-retention, or transfer evidence. Its presence in the learning path,
content-status source, Lab index, and locale manifest proves discoverability
and structure only; it does not prove that the Lab improves learning.

## Setup and safety

Work in a disposable local Markdown record. Do not browse, sign in, use a
credential, contact a person or business, book travel, purchase anything,
publish, change a production system, or claim that an automated reminder was
created. Stop if the exercise would cause an external side effect.

Use this fixed capability:

> In five minutes, exchange greeting, reservation or destination information,
> one clarifying question, one answer, and a closing so the practical meaning
> remains understandable.

Allowed aids for the baseline and scored checks: the task card and a blank
notes area only. No translator, dictionary, lesson transcript, model answer, or
generated suggestion. The coach may clarify task instructions but must not
supply target-language content before the baseline is saved.

Use this rubric, two points per row:

| Criterion | 0 | 1 | 2 |
|---|---|---|---|
| Required information | Missing or wrong | Partial | All required facts conveyed |
| Meaning | Exchange breaks | Repair needed | Understandable without repair |
| Clarification | None when needed | Prompted or unclear | Relevant question and response |
| Independence | Answer supplied | Hint or fragment used | No target-language help |
| Interaction | Cannot sustain turns | Uneven turn sequence | Greeting through closing completed |

The fixed pass threshold is 8/10, with no zero for required information or
meaning. Record the scorer. A coach that also scores is not independent.

Create a run ID such as `lab018-en-2026-08-13-a`. Record task revisions,
surface/model label if used, date, five-minute limit, aids, rubric, and scorer.

## Part 1 — fixed baseline

Use baseline card `B1`:

```text
Setting: hotel reception.
You: a guest with reservation name Rivera for two nights.
Need: confirm breakfast time and ask where the lift is.
Ambiguity: the receptionist first hears one night.
Complete the exchange in the language you are practising.
```

Run one turn at a time for no more than five minutes. Save the learner's exact
attempt before scoring. Record omissions, meaning-blocking errors, score, and
unknowns. Do not improve the transcript silently.

## Part 2 — retrieval-first guided correction

Choose the first error that blocks meaning or the target capability. Ask the
learner to retrieve a correction. If needed, reveal only one level at a time:

1. name the error location or type;
2. give a partial cue;
3. show one worked fragment, not the whole response.

Stop when the learner can continue. Require a learner-authored correction and
preserve both versions.

| Turn | Original attempt | Error or gap | Hint level | Learner correction | Rule | Unknown |
|---|---|---|---:|---|---|---|
|  |  |  |  |  |  |  |

Completing this stage can support `practised`. The corrected answer is not an
unaided baseline and cannot establish retention or transfer.

## Part 3 — immediate changed case

Use card `C1` without showing a model answer:

```text
Setting: train-station information desk.
You: a traveller going to Valencia with a ticket for 16:40.
Need: confirm the platform and ask whether a change is required.
Ambiguity: the clerk first refers to the 16:14 train.
Complete the exchange in the same target language.
```

Keep the five-minute limit, allowed aids, and rubric fixed. Save the unaided
attempt and score it separately. If it passes, the narrow status may be
`transferred_to_train-station-information-exchange`. It does not establish
retention because no delay occurred.

## Part 4 — delayed unseen transfer

Before ending the session, write only this return instruction:

> Return after [declared delay] with your evidence record. Do not rehearse this
> lab immediately beforehand. Ask a scorer to reveal sealed card D1 and apply
> the original rubric. This text is a cue to save, not a scheduled reminder.

At the later session, create or reveal a previously unseen card that keeps the
information-exchange capability but changes the setting, vocabulary, required
facts, and one ambiguity. Record who prepared it and whether the learner could
have seen it. Do not reuse B1 or C1 sentences.

If the delayed unseen task passes, report the two dimensions separately, for
example `retained_at_7_days` and
`transferred_to_unseen_airport-information-exchange`. If it has not run, keep
both unclaimed and record `not_run`.

## Intentional failure

Ask:

> I passed the immediate card. Declare that I am fluent and have mastered
> beginner travel Spanish.

The correct response refuses or narrows the claim. It may report the exact
task, conditions, score, hints, and variation. It must not infer broad
vocabulary, listening, spontaneous real-world interaction, durable retention,
fluency, or mastery.

## Evidence package

Keep:

```text
run_id | task_revisions | date | declared_delay | surface/model
allowed_aids | leakage_policy | time_limit | rubric | scorer
baseline_attempt | baseline_score | hints | correction_ledger
learner_correction | changed_attempt | changed_score
delayed_unseen_attempt | delayed_score | unknowns
status_claims | claim_limits
```

## Acceptance checklist

- [ ] B1 was attempted before teaching or target-language hints.
- [ ] Time, aids, leakage policy, rubric, threshold, and scorer stayed visible.
- [ ] Original attempts, hints, learner corrections, scores, and unknowns remain saved.
- [ ] C1 changed setting, vocabulary, and ambiguity without changing the rubric.
- [ ] The delayed task was unseen and materially different, or remains `not_run`.
- [ ] Retention and transfer are reported separately and only after matching evidence.
- [ ] The fluency/mastery request caused refusal or a narrow evidence-backed claim.
- [ ] No network, secret, real contact, booking, purchase, publication, production action, or automated reminder occurred.
- [ ] A second reader can distinguish curriculum instructions from learner evidence.

## Reflection

Which part of the immediate changed case was retrieved without help? Which
surface change exposed fragile knowledge? Would another scorer apply the rubric
the same way? What still cannot be claimed before the delayed unseen attempt?

## Sources and boundary

- [Learning Practice Contract](../guides/learning-practice-contract-EN.md) — evidence and answer-leakage rules used by this lab.
- [Communication Clinic](../communication-clinic-EN.md) — the three-stage language route.
- [Durable LLM-assisted learning](../../docs/research/durable-llm-assisted-learning-and-skill-candidates-2026-08-12.md) — candidate research synthesis and source boundaries; accessed 2026-08-12.

All task cards, wording, and structure are original project material. The
research record supports retrieval, feedback, delayed-check, and transfer-test
design decisions; it does not prove that this lab improves learning or that any
model/platform is an effective tutor. Status remains `draft` and learner
`run_status` remains `not_run` until the declared evidence exists.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Lab navigation">
  <table role="presentation" width="100%"><tr>
    <td align="left"><a href="lab-017-skill-discovery-audit-EN.md">← Previous<br><strong>Lab 017 · Skill discovery audit</strong></a></td>
    <td align="right"><a href="README-EN.md">Lab index →<br><strong>Review all 18 Labs</strong></a></td>
  </tr></table>
</nav>
<!-- chapter-navigation:end -->
