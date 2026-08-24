# Korean language review — 2026-08-24

**Status:** candidate editorial pass; not a native-language sign-off  
**Scope:** Korean reader-facing chapter and Lab wording  
**Review base:** `f4871337a9b3828ed11a4a425e65f5dc3d5068e5`  
**Decision:** apply only high-confidence, meaning-preserving wording fixes; keep
stable file names, status values, YAML keys, and technical identifiers intact.

## Applied changes

- `book/chapters/07-skills-plugins-and-tools-KO.md` now introduces `작업 공백`
  before retaining the English reference `task gap`.
- `book/chapters/09-verification-and-recovery-KO.md` replaces the mixed
  `무도움 recall` phrase with the ordinary Korean wording `도움 없이 회상하는
  과제`.
- `book/labs/lab-004-skill-selection-KO.md` uses `작업 공백`, `도입 기록`, and
  `검토자 의견` in the transfer contract and acceptance checklist, with the
  English terms retained in parentheses for cross-locale traceability.

## Boundary and remaining work

The earlier Korean review rows for the first-safe-change route, Chapters 11, 12,
and 14, and Lab 018 were checked against the current worktree. The listed
high-confidence replacements are already present, so they were not duplicated.
This pass does not establish native fluency, independent reviewer approval,
learner comprehension, or runtime behavior. A Korean native-reader review and a
short comprehension check remain required before changing any locale status to
`verified`.
