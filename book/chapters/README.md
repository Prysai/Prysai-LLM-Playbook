# Chapters

This directory contains the 22 chapter identities in the main reading route.
The route is a learning sequence, not an alphabetical file listing.

## Start here

- [English book guide](../README-EN.md)
- [English table of contents](../table-of-contents-EN.md)
- [Canonical chapter order](../../docs/governance/book-navigation.yaml)
- [Project map](../../docs/project-map-EN.md)

## File rules

- `*-EN.md` is the English source when that chapter has been migrated.
- Unsuffixed chapter drafts were removed during release cleanup; every
  chapter identity is now carried by its seven locale-suffixed files.
- `*-ZH`, `*-ES`, `*-JA`, `*-KO`, `*-DE`, and `*-ZHTW` are language-specific variants
  only when the locale matrix records them.
- The marked `chapter-navigation` block is generated. Change the navigation
  source and run `scripts/build_book_navigation.py` instead of editing that
  block by hand.

## Chapter contract

Every chapter should expose a real problem, learning objective, concept,
decision, small experiment, failure or boundary case, acceptance checklist,
transfer task, and sources for volatile facts. `candidate` means that structure
and basic checks exist; it does not mean a fresh run or independent review has
been completed.
