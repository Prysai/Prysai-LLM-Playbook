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

## Follow-up pass — 2026-08-22

The current French files were re-read before comparison; older compression notes
were not treated as a description of the present worktree. This pass made
targeted, reader-facing corrections in:

- `book/chapters/02-first-safe-task-FR.md`: natural wording for an isolated
  environment, retry, runtime state, secret identifiers, and the hand-off
  record;
- `book/chapters/09-verification-and-recovery-FR.md`: natural wording for
  retries, test fixtures, online checks, status tokens, and the evidence-review
  exercise;
- `book/chapters/13-action-boundaries-FR.md`: first-use explanations for
  `push`, pull requests, payloads, tokens, worktrees, and rollback cards;
- `book/README-FR.md`: restored the foundation-entry order and the optional
  practice boundary so the French book route passes the same structural guard;
- `tests/test_textbook_entry_path.py`: explicitly decode the validator's
  UTF-8 output so Windows' GBK default cannot turn a passing localized-entry
  check into a test-runner error.

The generated search index was refreshed after the reader-facing changes. The
targeted commits are `49476b6`, `55bd093`, `9c32f52`, `bdb8598`, `2f25214`,
`90a3a6c`, `dc00093`, and `d92f046`, pushed to the fork branch
`prysai/french-locale-20260823`. Structural checks and browser smoke cover
identity, links, locale continuity, rendered routes, and the stated fixtures;
they do not establish native-level fluency, independent proofreading,
learner comprehension, model behavior, or production readiness.

## Next review boundary

A French-speaking reviewer should blind-read the homepage, foundation guide,
Chapters 1–5, and the practice cards in context, then record concrete edits and
the reviewed scope before any status is changed to `reviewed` or
`production-ready`.

## Follow-up blind review — 2026-08-23

The follow-up pass read selected target-language passages before comparing them
with the English source. It treated terminology and meaning errors separately
from the compression signals emitted by the semantic audit.

| Locale | Surface | Resolution | Evidence boundary |
|---|---|---|---|
| FR | Chapter 13 field-case heading | Changed `Une entrée de terrain` to `Un cas observé sur le terrain`; the meaning remains a reported field case, not a literal data entry. | Editorial language correction; not proof of full French review. |
| ZH | Chapter 14 isolated test wording | Changed `小范围隔离环境` to `受限隔离环境` so the phrase describes a bounded test scope rather than a physically small space. | Editorial language correction; not a completeness or learning result. |
| ZHTW | Chapter 14 isolated test wording | Changed `小範圍隔離環境` to `受限隔離環境` for the same scope distinction. | Editorial language correction; not a completeness or learning result. |
| ZHTW | Chapter 14 approval and smoke-test terms | Retained the existing natural forms `一項核准不代表下一項也已獲核准` and `冒煙測試`. | Blind-read confirmation; no additional change was needed. |
| ES / DE / KO | Chapters 11–12 terminology | Confirmed the already-shipped `informe temporal`, `Laden`, and Korean reader-facing loop wording. | Confirmation of prior edits; not independent native certification. |

The targeted semantic audit still reports nine conservative compression signals
and zero missing deep concept groups. Those signals require a native-language
editorial review; they are not evidence that a translation has lost meaning.
All translated routes therefore remain `in-progress` or their declared
candidate state. The project remains `candidate`, and this pass does not claim
native-level fluency, cultural adaptation, learner comprehension, or production
readiness.
