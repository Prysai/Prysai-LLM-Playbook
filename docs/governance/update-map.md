# Update map

This is the maintenance map for the project. When a fact, lesson, lab, Skill,
evaluation, source, or public-page element changes, start here and follow the
matching row. The map keeps stable teaching principles separate from volatile
product facts and external assets.

## The update loop

```text
Locate → classify → gather evidence → edit → validate → independent review
       → publish → keep rollback evidence
```

An update is not complete because a file changed. It is complete only when the
affected contract, source boundary, validation result, review status, and
unverified scope are recorded.

## Where each kind of change belongs

| If you are changing… | Start in… | Canonical content | Required evidence | Finish with… |
|---|---|---|---|---|
| A project term or boundary | `CONTEXT.md`, then `docs/charter.md` | `CONTEXT.md` and the relevant chapter | Term boundary and affected links | `validate_project.py`, link check, independent terminology review |
| A stable teaching principle | `docs/book-architecture.md`, `docs/learning-model.md` | `book/chapters/` | Learning objective, experiment, failure case, acceptance checklist | Learning-contract validation and chapter review |
| The L0–L6 learning path or an asset's level assignment | `docs/governance/learning-path.yaml` | The path contract, then affected indexes and site panel | Level goal, prerequisites, primary assets, evaluation IDs, evidence gate, graduation gate, blocked condition | `validate_learning_path.py`, status validation, local links, independent path review |
| An OpenAI/Codex product fact | `docs/research/openai-codex-baseline.md` or the dated refresh record, then `docs/governance/fact-impact-registry.yaml` | The source record, the claim impact group, then affected chapters/labs/Skills/evaluations/pages | Claim ID, official URL, checked date, scope, owner, next review, evidence class, consumers and recheck level | Fact-impact validation plus affected-content checks; keep runtime/account gaps explicit |
| A chapter | `book/table-of-contents.md`, `docs/content-matrix.md` | One file in `book/chapters/` | Problem, concept, decision, action, evidence, failure, reflection | Chapter contract, local links, independent review |
| An experiment | `book/labs/README.md` | One file in `book/labs/` | Low-risk setup, observable output, failure variant, secret boundary, transfer task | Lab index, link check, runtime log when claiming verification |
| A project Skill | `docs/skill-registry.md`, `docs/quality/skill-quality-standard.md` | One directory in `skills/` | Trigger, inputs, boundaries, stop conditions, output, sources, tests | Project validator and official Skill validator; keep `candidate` until fresh-context evidence exists |
| An evaluation fixture | `evals/README.md`, `docs/quality/evaluation-framework.md` | `evals/task-set-v1.yaml` | Fixed input, context, permissions, expected evidence, forbidden behavior | `validate_eval_tasks.py`; add run logs before changing status |
| A source, archive, or borrowed asset | `docs/sources/asset-register.md` | Source record and, only if allowed, derived material | URL/archive, license, attribution, scope, hash, distribution decision | Archive audit and license review |
| The public page | `site/README.md`, `site/content-catalog.json`, `scripts/build_learning_path_site.py` | `site/index.html`, `site/app.js`, `site/styles.css`, generated `site/learning-path-data.js` | Counts, links, language coverage, accessibility behavior, status wording, generated learning-path data | `build_learning_path_site.py --check`, local link check, i18n check, and desktop/320px/390px browser review |
| The current status of the whole project | `docs/governance/content-status.yaml` | The status source and its validator | Counts, artifact status, run status, owner, review date, and evidence paths | `validate_content_status.py`; do not infer maturity from file presence |
| A release or rollback | `docs/release-checklist.md` | Release record and change log | Diff, validation output, reviewer, known gaps, rollback target | User-approved commit/push and a recoverable reference |

## Status vocabulary

Use artifact status and fact status separately.

- `draft`: still being written or missing the minimum check.
- `candidate`: structure and basic checks pass; the declared behavior still
  needs fresh-context, runtime, or migration evidence.
- `verified`: the declared scope has positive, boundary, failure, and transfer
  evidence with an independent review.
- `production-ready`: the additional safety, maintenance, version, license,
  and release gates pass.
- `current`, `stale`, `disputed`, and `removed` describe individual facts, not
  the maturity of a whole chapter, lab, or Skill.

## Before opening a pull request

- [ ] The registry row for the affected area is still accurate.
- [ ] The source and license boundary is recorded before external material is
      adapted.
- [ ] Counts and links are generated from the current tree or checked against
      it; no stale snapshot is presented as current.
- [ ] The change says what was not tested.
- [ ] `draft`/`candidate` has not been silently upgraded to `verified`.
- [ ] The next review date and responsible owner are clear.

For a product refresh that touches only part of the curriculum, record the
affected chapter range in the refresh file and link that file from the chapter,
content matrix, and `official-facts` registry row. Do not silently replace the
general baseline for claims outside that range.

The fact-impact registry is the required bridge between a volatile claim and
its consumers. A listed consumer is a recheck target, not proof that the
consumer has already run. Promote a claim or artifact only when the declared
recheck level has matching evidence.
