# ADR-0031: Project chapter title roles into one generated map

## Status

Accepted

## Date

2026-08-13

## Context

Chapter headings use two legitimate title roles. The canonical title is the
exact H1 body and source identity. The display title is a shorter label that
keeps the table of contents, Reader rail, and adjacent navigation readable.
The roles were described in `book-navigation.yaml`, but the English and
legacy tables of contents still carried hand-written headings and the Reader
and search builders independently read title fields from the navigation
document. That left title agreement accidental rather than generated.

## Decision

1. Keep `docs/governance/book-navigation.yaml` as the only editable source
   for chapter identifiers, order, title roles, and paths.
2. Generate `book/title-map.json` with one entry per chapter. Each entry
   contains the stable ID, number, part, canonical title, and display title in
   English and Simplified Chinese.
3. Generate the compact chapter headings in `book/table-of-contents-EN.md`
   from that map. The surrounding explanatory prose remains authored material.
4. Require `scripts/build_site_locale_manifest.py` to reject a stale map and
   use it when projecting Reader titles. The search builder consumes that
   manifest projection, so search headings use the same canonical title role.
5. Run the title-map check and negative fixtures in release evidence. A stale
   map, altered TOC display heading, or duplicate chapter ID is a failure.

## Alternatives considered

### Use H1 text everywhere

Rejected. Full titles are useful as source headings but make compact reading
surfaces harder to scan, especially on narrow screens.

### Keep title aliases hand-maintained in every surface

Rejected. It hides a synchronization obligation in prose and cannot show
which title role an individual renderer intended to use.

### Make the generated map another editable governance file

Rejected. A second editable title source would recreate the ambiguity this
decision removes.

## Consequences

- A chapter rename now begins in `book-navigation.yaml`, followed by title-map,
  navigation, manifest, and search regeneration.
- Raw Markdown, the Reader, and search have a testable relationship to one
  title projection without introducing a documentation framework.
- The projection proves title identity only. It says nothing about translation
  review, search relevance, accessibility, runtime behavior, or learner
  comprehension.

## Evidence boundary

This is a repository-local data-integrity decision. The output and fixture
checks verify the declared title contract, not user-facing effectiveness.
