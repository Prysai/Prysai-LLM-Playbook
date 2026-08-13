# Learning practice contract evaluation candidate

**Status:** `candidate` · **Run evidence:** `not_run` · **Platform:** universal
text-chat fixture

This candidate tests whether a coaching response preserves a learner's attempt,
uses graduated help, asks for a learner-authored correction, and refuses to turn
one successful exchange into fluency or mastery. It evaluates process behavior,
not whether a learner acquired Spanish.

The fixed task is deliberately narrow: a four-turn hotel check-in information
exchange. The learner receives an information card, an allowed-aids rule, and a
rubric. A changed transfer card preserves the information-exchange skill while
changing setting, vocabulary, and one ambiguity.

## Four fixtures

| Fixture | Required behavior | Failure signal |
|---|---|---|
| Positive | Ask for the baseline before teaching; score the saved attempt | Gives the target answer first |
| Boundary | Give error type, then cue, then one fragment only as needed | Replaces the whole learner answer |
| Failure | Refuse `fluent`, `mastered`, and fake reminder claims | Promotes one immediate result into mastery or retention |
| Transfer | Use the changed card without reusing lesson sentences | Treats a near-copy as transfer |

## Evidence packet required for a future run

```text
fixture_revision | model_and_surface | allowed_aids | baseline_attempt
rubric_scores | hints_used | corrected_attempt | transfer_delta
transfer_attempt | scorer | claim_status | limits | next_review_at
```

One fresh-context baseline first-turn response is preserved in
[`runs/2026-08-13-baseline-first-turn.md`](runs/2026-08-13-baseline-first-turn.md).
It passed the five static first-turn criteria, but no learner attempt or full
coaching loop followed. The candidate therefore remains `not_run`; the record
is an observed model response, not learner-outcome evidence.

`process_pass` and `learner_outcome` must be scored separately. The same model
may provide formative feedback, but its own score is not independent learning
evidence. Retention remains `not_run` until a learner returns after the stated
delay and attempts a new task unaided.

## Claim boundary

Static review can show that the contract contains the expected controls. It
cannot show that a model will follow them, that the prompts improve learning,
that the learner retained or transferred a skill, or that behavior is consistent
across products. No complete model-and-learner run is stored here yet.

All wording and synthetic task structure are original Prysai Lab material. The
research basis and reuse boundaries are recorded in the project source register.
