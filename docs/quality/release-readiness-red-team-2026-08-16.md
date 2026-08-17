# Release-readiness red-team audit — 2026-08-16

**Status:** current project-owned audit; not independent review or user
research.

## Decision

Do **not** call the Playbook production-ready, fully translated, proven to
teach LLM use, popular, or release-complete. The public repository and reading
site are useful candidate surfaces, but the evidence below blocks those
stronger claims.

## What was checked

- `Prysai/Prysai-LLM-Playbook` was queried on 2026-08-16: public repository,
  live site URL present.
- The site's English and Spanish home routes were inspected in a browser. The
  Spanish home route rendered Spanish navigation and hero copy; no sampled
  English text leaked in the visible main content.
- `scripts/audit_locale_release_paths.py` reported 40/40 addressable chapter
  and Lab routes for each of EN, ZH, ES, JA, KO, and DE.
- `scripts/validate_localization.py --release` failed because every
  non-English route is still marked `in-progress`; this is an intentional
  evidence boundary, not a file-missing defect.
- `scripts/audit_translation_depth.py` reported 26 current attention signals.
  It measures length and headings only, not translation quality.
- The core structural, completeness, learning-contract, reader-link, and test
  suite checks passed. The optional archive audit was incomplete because no
  input archive location was configured.

## Findings from hostile review lenses

| Lens | Blocking finding | Why it matters | Required closure evidence |
|---|---|---|---|
| Learning-science / university reviewer | All 18 Labs remain `draft` and learner/transfer runs are `not_run`. | A readable curriculum and fixture tests cannot show understanding, retention, or transfer. | Predeclared novice runs, preserved artifacts, delayed/changed-task checks, independent scoring, and failures. |
| Research reviewer | The claimed transferable core has no completed cross-platform adapter study. | Similar product names do not establish identical context, authority, tool, or persistence behavior. | At least two sourced platform adapters applying a common bounded task, with recorded deltas and failures. |
| Developer-platform reviewer | No immutable release tag, accepted commit-bound release evidence, rollback target, or rollback rehearsal. | A public URL is not a recoverable release process. | Tag, deployed-commit receipt, rollback target, rehearsal record, and a release decision. |
| Localization reviewer | Five language routes have every file but zero independent language reviews; 26 depth signals need triage. | File existence and automatic routing do not establish meaning, register, terminology, or reader comprehension. | Native-language review of the first path, repair/accepted-scope record for each signal, then a governed status update. |
| Product reviewer | No observed activation, completion, return, referral, or user-feedback result exists. | Popularity and actual value are market questions, not properties of prose, commits, or a polished landing page. | A consented first-task pilot with a fixed funnel, published anonymized outcomes, and retained negative feedback. |
| Security / trust reviewer | Optional source archives are unconfigured and the release license boundary needs continuing per-asset review. | Source provenance and reusable-code rights must be inspectable before wide reuse. | Archive receipt or explicit non-use decision, plus completed asset/license ledger review. |

## Immediate priorities

1. Recruit a small, consented first-reader pilot for the existing Chapter 0 →
   Chapter 1 → Chapter 2 route. Do not rewrite its outcome claims based on
   intuition; retain failures as data.
2. Have qualified reviewers assess the first path in ZH, ES, JA, KO, and DE;
   publish reviewer role, source revision, scope, and unresolved items.
3. Produce a release candidate only after the release tag and rollback
   rehearsal exist. Until then retain `candidate / not_ready`.
4. Keep the homepage focused on one goal selector and the ordered textbook
   route. Do not add Skill count, model lists, or more cards as a substitute
   for a first successful reader task.

## Boundaries

This audit confirms current repository, browser, and validator observations.
It does not prove that the English source is correct, that any translation is
good, that users learn, that the site is indexed, or that a release will gain
adoption.
