# Three-Task Smoke v1

**Status:** `candidate` fixture package · **Run evidence:** `not_run`

This shared offline task bundle supports Chapters 6 and 19. Give two candidate models or workflows the same three small tasks before deciding whether a larger evaluation is worth the cost.

Passing its local validator means only that one submitted answer matched this fixture's frozen schema and acceptance rules. It does **not** prove quality, price, safety, usefulness, learner outcomes, or an overall winner.

## Keep these conditions fixed

- task IDs, instructions, synthetic inputs, expected outputs, and hashes in `fixture.json`;
- one comparison variable per round: model, workflow, or surface;
- the same context, tools, permissions, network condition, time budget, and reviewer; and
- at most one declared controlled rework after the first attempt.

The teaching inputs are original and synthetic: no customer data, credentials, production records, or external source text.

## Run one task

1. Copy the task instruction and input to each candidate unchanged; save raw answers before human edits.
2. Save the answer locally under the required filename.
3. Validate it locally; the validator makes no network request and does not call a model.

```powershell
$py = (Get-Command python -ErrorAction Stop).Source
& $py evals\candidates\three-task-smoke-v1\validate_submission.py `
  --task extract-01 `
  --submission C:\temp\candidate-a-extract-01.json
```

| Task | Submit | Check |
| --- | --- | --- |
| `extract-01` | JSON array | structured extraction without invented facts |
| `markdown-02` | Markdown file | constrained transformation while preserving an unknown |
| `gap-review-03` | JSON object | evidence-gap review without downgrading existing evidence |

For two candidates, keep six independent submissions and record conditions and validator results in `run-record-template.yaml`. Its `not_run` fields are placeholders, not results.

## Stop honestly

Use `not_comparable` if an interruption, permission block, input-hash change, tool-version change, or another frozen-condition change affects one side. Do not replace an interrupted answer with a successful retry. Even six comparable answers support only a task-scoped decision, never a general model ranking.
