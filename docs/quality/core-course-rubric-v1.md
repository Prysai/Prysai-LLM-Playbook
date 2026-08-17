# LLM Foundation Core v1 rubric

**Status:** `candidate`  
**Run status:** `not_run`  
**Scope:** formative scoring of five learner artifacts in the LLM Foundation Core route.

This rubric describes what a reviewer may observe in one named artifact. It is
not a certification instrument and does not measure intelligence, fluency,
productivity, safety, retention, or model quality. A passing static check only
shows that the contract and fixtures are internally complete; it is not a
learner result.

## Frozen outcomes

The route scores exactly five outcomes, in this order:

1. `explain` - explain an LLM and distinguish a model from a product, tool, or
   Agent without treating fluent text as proof.
2. `initiate` - write a bounded request with a goal, relevant context,
   constraints, and an observable response shape.
3. `identify` - point to an omission, unsupported addition, forced ambiguity,
   or overconfident claim using supplied evidence.
4. `repair` - apply a `PASS` / `FAIL` / `UNSURE` check, make the smallest safe
   correction, and state what remains unproven.
5. `transfer` - repeat the full method on an unseen task without receiving a
   complete prompt or answer template.

## Score scale

Use one integer for each outcome. Score the learner artifact, not the model's
answer and not the learner's confidence or writing style.

| Score | Meaning | Observable evidence |
| --- | --- | --- |
| `0` | Not demonstrated | Missing, contradictory, copied without an evidence link, or the artifact makes a forbidden claim. |
| `1` | Partly demonstrated | The main idea or action is present, but a material boundary, evidence link, correction, or limitation is missing. Reviewer can name the next smallest repair. |
| `2` | Independently demonstrated on this task | The artifact meets every named acceptance item without an unannounced answer leak or reviewer-supplied reasoning. |

An artifact may score `2` on this task while the learner's broader ability is
still unknown. A correct first model output never substitutes for the
learner's own check or explanation.

## Outcome-specific anchors

### Explain

- `0`: calls the model a database, person, or autonomous actor; or treats a
  polished sentence as evidence that it is true.
- `1`: describes context-based generation but leaves the model/product/tool
  boundary or the uncertainty boundary unclear.
- `2`: uses their own words to describe context-based generation, separates
  model from product and external tools, and names one reason to verify.

### Initiate

- `0`: asks for an unspecified result, supplies unsafe/private material, or
  requests an unbounded action.
- `1`: has a goal and some context but omits a material constraint or output
  shape.
- `2`: records goal, relevant material, constraints, output shape, and a stop
  line; the first input and first output are retained for comparison.

### Identify

- `0`: labels an answer correct or incorrect without quoting the supplied
  evidence, or generalizes from one response to a model.
- `1`: finds a visible mismatch but confuses an unknown with an error or misses
  a second material boundary.
- `2`: labels the failure type, quotes the exact supporting material, and says
  what the fixture cannot establish.

### Repair

- `0`: rewrites everything, adds an unsupported fact, or reports `verified`
  without a check.
- `1`: marks a check and proposes a correction but the change is broader than
  necessary or the remaining unknown is absent.
- `2`: records `PASS` / `FAIL` / `UNSURE`, makes the minimum correction, shows a
  before/after difference, and states one explicit limitation.

### Transfer

- `0`: repeats the demonstrated wording, sees the answer before attempting, or
  calls a single success mastery or retention.
- `1`: completes a changed task with substantial prompting or a near-copy, but
  exposes the help and one missing step.
- `2`: independently repeats define -> attempt -> check -> repair -> limit on
  a changed task, records any help, and does not overclaim what was learned.

## Allowed assistance and stopping rules

- Before the first attempt, show only the task, supplied material, and safety
  boundary. Do not show a complete prompt, answer, or scoring decision.
- A learner may ask for clarification of the task. Record that help.
- During repair, a reviewer may name the failure type, then give a cue, then
  one worked fragment; stop escalating after the first useful level.
- Stop and score `0` or `1` when required material is missing, the learner
  shares private or credential material, the task would cause an external
  side effect, or the artifact cannot be compared with the fixed rubric.
- Missing or withdrawn records stay `not_observed`; they are not converted to
  zero and are not counted as successful attempts.

## Reviewer record

Keep the original artifact, aid disclosure, rubric revision, score per outcome,
short evidence note, disagreement reason, and one limitation. Two reviewers
should score independently when a run is authorized. Preserve disagreement and
adjudication; never average it away.

## Claim boundary

The candidate fixtures are synthetic and `not_run`. Even a future passing run
would support only a bounded observation for the named task, conditions, and
rubric. It would not prove transfer to other domains, platforms, languages,
models, or time periods.
