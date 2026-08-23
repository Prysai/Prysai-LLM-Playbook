# French copy review — 2026-08-22

**Status:** `candidate` · targeted editorial corrections applied; independent
French-language proofreading and learner evidence remain pending.

## Scope

This pass re-read the current French files before comparing them with their
English counterparts. It focused on terms that can mislead a French reader in
the first-task, Skill-design, action-boundary, recovery, and research routes.
It did not expand translated chapters merely to match English character counts.

## Corrections recorded

- `book/labs/lab-007-action-boundaries-FR.md` now explains `push` as sending to
  the remote repository, uses `restauration` for the reader-facing recovery
  concept, and keeps the English technical token in parentheses where useful.
- `book/chapters/02-first-safe-task-FR.md` distinguishes a commit, sending to a
  remote repository, publication, and transmission; disposable exercises are
  described as work in a temporary test directory; the delivery receipt is a
  `fiche` linked to evidence and a reread of the target.
- `book/chapters/11-designing-a-skill-FR.md` replaces the compressed
  *non-déclenchement* heading with an explicit explanation of when a Skill must
  not trigger, and uses `relecture` for checking a result.
- `book/chapters/13-action-boundaries-FR.md` explains `push` and `rollback` on
  first use, then uses the French terms consistently in the action contract,
  browser/terminal/GitHub cards, recovery branch, and acceptance checklist.
- `book/chapters/09-verification-and-recovery-FR.md`,
  `book/chapters/12-agent-loop-and-stop-FR.md`, and
  `book/chapters/15-research-track-FR.md` use `relecture` and `fiche` where the
  previous wording sounded like a literal translation of “read-back” or
  “receipt”. The research chapter retains code statuses such as
  `citation_unverified`, `candidate`, and `not_run` unchanged.

## Evidence and limits

- The edits are in commits `9d8da39`, `05dd75f`, `9114624`, `a6c1966`, and
  `86a54ca`, all pushed to `fork/prysai/french-locale-20260823`.
- The current branch is not the upstream `origin/main`; remote divergence and
  merge/deployment status must be checked separately.
- Structural and browser checks can establish route continuity, rendered
  strings, and fail-closed behavior. They cannot establish native-level
  fluency, regional adaptation, factual completeness, independent proofreading,
  learner comprehension, or learning outcomes.
- All French source files therefore remain `translation_status: in-progress` or
  their declared candidate status. The project remains `candidate`.

## Next review boundary

A French-speaking reviewer should blind-read the homepage, foundation guide,
Chapters 1–5, and the practice cards in context, then record concrete edits and
the reviewed scope before any status is changed to `reviewed` or
`production-ready`.
