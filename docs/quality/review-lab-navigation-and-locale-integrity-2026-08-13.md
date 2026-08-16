# Lab navigation and locale integrity review — 2026-08-13

**Status:** scoped candidate review

**Surfaces:** 18 canonical English Labs, Lab indexes, Chapter 10/13/14/19
practice routes, locale matrix, Reader, release evidence

**Runtime:** local static server; headless Microsoft Edge; desktop 1280 × 900
and mobile 390 × 844

## Question

Can a reader move through every Lab without hand-maintained link drift, while
still seeing that numerical adjacency is not a prerequisite chain and missing
translations are not completed pages?

## Confirmed defects and disposition

| Defect | Evidence before repair | Disposition |
|---|---|---|
| Only six of 18 English Labs had adjacent footers | Lab 006 and Labs 014–018 contained hand-written blocks | Added one catalog-order contract, generator, validator, and fixtures for all 18 |
| Hand-written Lab blocks used chapter markers and inconsistent labels | Lab 014–017 said `Chapter navigation`; Lab 018 used an index link as Next | Migrated all English Labs to `lab-navigation` blocks with first/middle/last rules |
| Reader pagination recognized only chapters | Any Lab hid shell pagination and the Markdown block was stripped | Projected Lab order through the locale manifest and reused desktop/mobile pagination |
| Reader and search exposed Lab front matter as reader-facing text | A leading content-identity comment prevented first-line-only front-matter detection | Allowed leading HTML comments before the opening front-matter fence in both consumers and added regression assertions |
| Lab number looked like learning progression | Number order crosses L2, L3, L4, L5, and L6 placements | Added visible `catalog order, not a prerequisite chain` language and kept learning-path ownership separate |
| Lab index conflated exercise level with path placement | Labs 008 and 010 showed L3 while first used at L4 and L6 | Split `Exercise level` from `First used in path` |
| Labs 001, 002, 006, and 014–017 claimed nonexistent translations were `in-progress / full` | Locale records named missing files | Changed missing locales to `not-started / route-only`; the current Reader uses an explicit same-locale unavailable state, never an English-content fallback |
| Chinese indexes stopped before Lab 018 or claimed only 13 Labs | `book/labs/README.md` and Chinese TOC | Added 014–018 as English-source entries without claiming Chinese translation |
| New Labs lacked direct chapter practice routes | Governance mappings existed without reader-facing entry points | Linked Labs 014, 016, 017, and 015 from Chapters 10, 13, 14, and 19 |

## Browser evidence

At 1280 × 900, Lab 001 showed only Next, Lab 009 showed Previous and Next,
and Lab 018 showed only Previous. All three displayed `Lab N of 18 · Catalog
order, not a prerequisite chain`; the shell used `Lab catalog navigation`, no
embedded Lab footer was duplicated, and no horizontal overflow occurred.

At 390 × 844, Lab 009 exposed the pre-article Lab sequence, progress, Previous,
and Next controls without horizontal overflow. This historical observation was
superseded by the current same-locale Reader rule: a request for an unavailable
Chinese Lab now remains `zh`, shows an explicit unavailable state, and links
back to the Chinese overview instead of rendering English content. The browser
recorded no console or page errors during the original checks.

The repository-level `test_reader_lab_navigation.py` fixture now protects the
18-item manifest sequence, first/middle/last identities, desktop and mobile
pagination hooks, embedded navigation removal, catalog-order wording, and every
missing Lab translation route. This source contract complements the browser
record; it does not replace runtime or accessibility testing.

## Verification boundary

The checks establish deterministic source coverage, generated-link integrity,
one local Edge runtime, and honest fallback labels for this worktree. They do
not prove learner comprehension, Lab execution, delayed retention, transfer,
translation quality, screen-reader behavior, public deployment, or production
readiness. All 18 Labs remain `draft`; learner and transfer runs remain
`not_run`.
