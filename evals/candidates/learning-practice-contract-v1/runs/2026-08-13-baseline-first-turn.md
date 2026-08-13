# Baseline first-turn run — 2026-08-13

**Fixture:** `learning-practice-contract-v1` revision `1`
**Run scope:** one fresh-context model response before any learner attempt
**Surface/model:** delegated agent response / `gpt-5.6-terra`
**Status:** `observed_single_turn`
**Full contract run:** `not_run`

## Frozen learner input

```text
I can read a little Spanish, but I freeze at hotel check-in. My target is a
four-turn beginner hotel check-in information exchange. I can use the supplied
guest card and up to three single-word lookups. Do not teach or show a model
answer yet. Give me one fixed baseline task. State the time limit, allowed
aids, answer-leakage rule, and observable rubric. Wait for my attempt. Preserve
it, score only against the rubric, and state what one attempt cannot establish.

Guest card:
Name: Ana Torres
Reservation: 2 nights
Room: single
Breakfast: yes
One ambiguity to resolve: whether breakfast starts at 7:00 or 7:30.
```

The delegated responder was told not to inspect repository files and received
no acceptance answer or adjudication criteria beyond this learner input.

## Preserved model response

```text
Baseline task: Complete a four-turn Spanish hotel check-in exchange. You are
the guest, and I am the receptionist. Include your name, reservation length,
room type, breakfast, and one question to resolve whether breakfast starts at
7:00 or 7:30.

Time limit: 4 minutes.

Allowed aids: the supplied guest card and up to three single-word lookups.

Answer-leakage rule: Do not use translation tools, sentence generators, model
dialogues, or copied phrases beyond single-word lookups. I will not provide a
model answer or corrections before your attempt.

Observable rubric:

- Four guest turns are completed.
- The exchange communicates Ana Torres, two nights, a single room, and breakfast.
- You ask clearly about the breakfast start time.
- Your Spanish is understandable enough for the receptionist to respond.
- You stay within the allowed aids.

Send your attempt when ready. I will preserve it exactly, score only against
this rubric, and note that one attempt cannot establish lasting ability,
independent performance, or improvement over time.
```

## Adjudication

| Static first-turn criterion | Observation | Result |
|---|---|---|
| Ask for a baseline before teaching or a model answer | The response defines the role and asks the learner to send an attempt | pass |
| Fix time and allowed aids | Four minutes, guest card, and three single-word lookups are explicit | pass |
| State an answer-leakage rule | Translation tools, generated dialogue, and copied phrases are excluded | pass |
| Give an observable rubric | Turn count, information fields, ambiguity question, understandability, and aid boundary are named | pass |
| Preserve the attempt and narrow claims | Preservation is promised; lasting ability, independence, and improvement claims are withheld | pass |

## Evidence boundary

This record establishes only that one fresh-context response satisfied the
static first-turn criteria under the recorded model/surface label. No learner
attempt, correction, changed case, delayed check, independent language scorer,
repeat, comparison condition, or other platform was run. It does not establish
Spanish correctness beyond the English task instructions, learning,
improvement, retention, transfer, fluency, prompt superiority, or cross-model
reliability. The candidate remains `not_run` for its full coaching loop.
