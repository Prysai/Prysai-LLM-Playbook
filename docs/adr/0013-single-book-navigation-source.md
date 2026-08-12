# ADR-0013: Use one canonical source for chapter navigation

## Status

Accepted

## Date

2026-08-11

## Context

The repository has 22 chapters, English source files for all 22 chapters,
legacy unsuffixed Chinese source files, a human-readable table of
contents, a public learning-path page, and multiple README entry points. If
each page or index owns its own links, the visible order can drift from the
actual reading order. A reader then reaches the wrong chapter, skips a chapter,
or receives an apparently translated page that is still only a legacy source.

The project also needs a clear answer to a beginner's practical question:
"Where do I find the chapter, lab, Skill, research note, or validation rule?"
That is an information-architecture problem, not a request to add another
unstructured index.

## Decision

1. Keep `docs/governance/book-navigation.yaml` as the canonical ordered list
   of all 22 chapters. It records part membership, stable chapter identity,
   English title, Chinese title, English source path when available, legacy
   source path, and migration state.
2. Generate an idempotent footer block with
   `scripts/build_book_navigation.py`. The block is replaced only between
   `chapter-navigation:start` and `chapter-navigation:end` markers.
3. Generate navigation for the English source whenever it exists and for all
   current unsuffixed source files. The first chapter exposes only next; middle
   chapters expose previous and next; the last chapter exposes only previous.
   The table of contents remains a separate route index rather than a third
   footer button.
4. When an English next chapter does not yet exist, the generated English link
   points to the current legacy source and visibly says `migration pending`.
   A missing translation is never treated as a completed translation.
5. Keep the table of contents, learning path, locale matrix, status source,
   and project map separate. They may link to the navigation source, but each
   remains authoritative for its own question.

## Alternatives considered

### Hand-write previous and next links in every chapter

Rejected. It is easy to miss one file, and a reorder requires a broad manual
edit with no machine-checkable guarantee that the links agree.

### Infer order from filenames

Rejected. File names do not express parts, drafts, migration state, or future
nonlinear additions reliably. A directory listing is an implementation detail,
not the editorial order.

### Adopt a documentation framework immediately

Rejected for this slice. mdBook, Docusaurus, VitePress, and Starlight all show
that a shared sidebar/order source is valuable, but switching frameworks would
expand the build, deployment, and localization surface before the content
contract is settled. The small generator provides the useful invariant now and
can later feed a framework adapter.

### Let missing English pages silently fall back to Chinese

Rejected. This would create false bilingual completeness and make language
coverage impossible to audit. The current legacy source is linked only with an
explicit migration label.

## Consequences

- Reordering a chapter starts in one machine-readable file and can be checked
  before publication.
- Chapter footers remain visible in GitHub Markdown and do not require a
  JavaScript runtime.
- The repository now has a small generated surface that must be kept in sync by
  the validator.
- English navigation is continuous, and all 22 chapters now have English source
  routes. Non-English translations and experiment migrations remain tracked
  separately in the locale matrix and table of contents.
- If a future documentation framework is adopted, its sidebar and pagination
  adapter should consume this source rather than introduce a second order.

## Evidence boundary

This decision is informed by the structure study in
[`docs/research/book-navigation-architecture-study-2026-08-11.md`](../research/book-navigation-architecture-study-2026-08-11.md).
The study records public source URLs and fixed revisions where available. It
does not copy external code, prose, branding, or page templates.
