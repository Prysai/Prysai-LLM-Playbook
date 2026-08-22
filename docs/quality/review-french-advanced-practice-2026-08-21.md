# French advanced-practice editorial review — 2026-08-21

**Status:** `candidate` · structural and editorial pass completed; independent
French-language review and learner runs remain pending.

## Scope

This pass covers French Chapters 16–22 and the application-practice card that
appears in the public entry flow. The goal was to remove empty teaching
sections, make each exercise executable without oral explanation, and keep the
evidence boundary visible.

## Changes recorded

- Every French advanced chapter now gives concrete preparation material,
  bounded task steps, a receipt or evidence format, and reflection questions.
- The engineering exercise separates build, test, local runtime, user
  acceptance, and rollback evidence.
- The marketing, content, and evaluation exercises use fictitious or redacted
  inputs and explicitly reject invented metrics, sources, and rankings.
- The personal, team, and maintenance exercises preserve checkpoints,
  permissions, owners, hashes/diffs, unknowns, and rollback decisions.
- High-exposure French labels were edited toward ordinary usage (for example
  “les fondamentaux des LLM”, “consigne délimitée” and “mise en route”).

## Evidence

- `python -X utf8 scripts/validate_project.py` → `VALIDATION_OK`.
- `python -X utf8 scripts/validate_project_structure.py` →
  `PROJECT_STRUCTURE_OK`.
- `python -X utf8 scripts/validate_content_completeness.py` →
  `CONTENT_COMPLETENESS_OK`.
- `python -X utf8 scripts/validate_learning_contract.py --canonical-en` →
  `LEARNING_CONTRACT_OK chapters=22 labs=18`.
- `python -X utf8 scripts/validate_site_i18n.py` and its test → 590/590 keys,
  10 fixtures.
- `python -X utf8 scripts/audit_translation_depth.py --verbose` →
  `TRANSLATION_DEPTH_AUDIT_OK units=280 attention_items=64`. This is a depth
  signal only; it is not a language-quality score.
- `npm run test:browser` → `BROWSER_SMOKE_OK` with desktop `1280px`, mobile
  `390px`, eight locale routes, Reader navigation, visual boards, and
  fail-closed missing/invalid paths.

## Limits

The checks above prove file, route, rendered-shell, and exercise-contract
properties within the tested local candidate. They do not prove that the
French prose is native-level, culturally adapted, independently proofread, or
effective for learners. The French files therefore remain
`translation_status: in-progress`; the project remains `candidate`.

## Next review

A French-speaking reviewer should read Chapters 16–22 and the three practice
loops in context, record concrete edits and scope, and only then decide whether
the translation status can change.
