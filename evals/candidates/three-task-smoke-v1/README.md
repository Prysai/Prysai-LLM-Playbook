# Three-Task Smoke v1

**Status:** `candidate` fixture package · **Run evidence:** `not_run`

This is the shared, offline task bundle for Chapter 6 and Chapter 19. It gives
two candidate models or workflows the same three small tasks before a team
decides whether a larger evaluation is worth the cost.

It is deliberately narrow. Passing the local validator means that one submitted
answer matched this fixture's frozen schema and acceptance rules. It does **not**
prove model quality, price, safety, general usefulness, learner outcomes, or a
winner between candidates.

## What is fixed

- task IDs, instructions, synthetic inputs, expected outputs, and SHA-256
  hashes in `fixture.json`;
- one comparison variable per round: model, workflow, or surface—not several
  at once;
- the same context, tools, permissions, network condition, time budget, and
  reviewer for both candidates; and
- at most one declared controlled rework after the initial attempt.

The inputs are original synthetic teaching material. They contain no customer
data, credentials, production records, or external source text. They are
covered by this repository's license.

## Run one task

1. Copy the task instruction and input to each candidate without editing it.
   Save each raw answer before a human changes it.
2. Save the answer to a local file. Use the required filename shown below.
3. Validate the file locally. The validator makes no network request and does
   not invoke a model.

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission C:\temp\candidate-a-extract-01.json
```

| Task | Submit | What it checks |
|---|---|---|
| `extract-01` | a JSON array | structured extraction without invented facts |
| `markdown-02` | a Markdown file | constrained transformation while preserving an unknown |
| `gap-review-03` | a JSON object | evidence-gap review without downgrading evidence that exists |

For a two-candidate smoke, create six independent submissions: A and B for
each task. Keep the initial output even if a declared rework later passes.
Record the actual surface, model/workflow IDs, timestamps, conditions, cost
basis, error category, reviewer, raw-output path, and validator result in
[`run-record-template.yaml`](run-record-template.yaml). Its `not_run` values are
placeholders, not results.

## Stop and mark the row honestly

Use `not_comparable` instead of a score if a capacity interruption, permission
block, input-hash change, tool-version change, or other frozen-condition change
affects one side. Preserve the event and state the smallest condition under
which a fair rerun could happen. Do not replace an interrupted answer with a
successful retry or the other candidate's answer.

An incomplete A/B pair supports only `continue_test`, `blocked`, or `not_run`.
Even six comparable answers can support only a task-scoped decision such as
`worth_expanding` or `do_not_expand_yet`; they cannot establish a general model
ranking.

## Origin and limits

This package implements the project method described in:

- [Chapter 6: Model Choice Is Not Model Worship](../../../book/chapters/06-model-selection-EN.md)
- [Chapter 19: Evaluate Models and Workflows](../../../book/chapters/19-evaluate-models-and-workflows-EN.md)

It is an executable fixture and validator, not a recorded evaluation. No model
or workflow run is included in this directory.
