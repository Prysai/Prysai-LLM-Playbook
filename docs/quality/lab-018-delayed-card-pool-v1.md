# Lab 018 delayed-check card pool v1

**Status:** project-authored measurement fixture; not a validated or equivalent
test instrument.

This file fixes the three delayed task prompts before a run. It does not make a
public repository file secret. An outcome may be labelled `unseen` only when
the scorer records that the learner did not access this pool or an equivalent
copy during practice. Otherwise call the result a **changed delayed task**.

## Freeze and assignment procedure

Before the B1 baseline, a scorer must:

1. save this exact card-pool revision and the local file hash or commit ID;
2. generate and record a random UUID before the learner begins;
3. assign `D1` for a first hexadecimal character `0–5`, `D2` for `6–A`, or
   `D3` for `B–F`; and
4. keep the selected full card outside the learner's practice record until the
   delayed check.

Record `pool_revision`, `assignment_uuid`, `card_id`, `card_author`,
`prepared_at`, `revealed_at`, and `learner_exposure` (`no`, `yes`, or
`unknown`). The random assignment and three variants reduce post-hoc choice;
they do not establish equal difficulty, rubric reliability, or a generalizable
comparison between learners.

## Fixed cards

### D1 — study-group schedule

```text
Setting: study-group message thread.
You: a student proposing a Wednesday 18:20 review session.
Need: confirm the meeting room and ask whether everyone should bring the practice questions.
Ambiguity: the other student first understands 18:50.
Complete the exchange in the target language.
```

### D2 — project-outline handoff

```text
Setting: course-project message thread.
You: a student coordinating a shared outline.
Need: confirm who owns the methods section and ask when the group will review it.
Ambiguity: the other student first assigns the results section.
Complete the exchange in the target language.
```

### D3 — class-discussion preparation

```text
Setting: class-discussion message thread.
You: a student preparing to discuss an assigned article at 10:30.
Need: confirm which question to prepare and ask whether a short example is required.
Ambiguity: the other student first refers to the 10:03 office-hour session.
Complete the exchange in the target language.
```

## Scoring handoff

Use Lab 018's unchanged five-row rubric. Each scorer writes one short
evidence note per row before seeing any other score. Preserve disagreement; a
score difference greater than one point on a row, or any pass/fail disagreement,
leaves the retention/transfer label unissued unless a third condition-blind
reviewer resolves it under the same recorded conditions.

This fixture is original project material and carries no external task text.
Its only source role is pre-authored task control for the candidate Lab.
