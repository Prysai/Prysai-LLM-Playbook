# ADR-0019: Add a cross-file content integrity gate

## Status

Accepted

## Date

2026-08-12

## Context

The project has separate source-of-truth files for content status, locale
identity, chapter navigation, the public reader, and generated site data. A
source can therefore exist while one of its reader links or generated views
still points at an older legacy path. Existing validators cover each contract
individually, but they did not make the cross-file identity relationship
explicit.

That gap is especially costly during English-first migration: a file named
`chapter-12-...-EN.md` can be authored and registered while a troubleshooting
link still opens the unsuffixed legacy file. The reader then appears complete
while maintenance and discovery follow different content.

## Decision

Add `scripts/validate_content_completeness.py` as a narrow cross-file gate. It
uses the locale matrix as the identity map, content status as the current
route registry, and book navigation as the 22-chapter order. It checks stable
file headers, canonical English paths, required public entries, and generated
file markers. Migration-pending sources remain explicit warnings until their
English source exists.

The gate is intentionally separate from the teaching-contract validator and
from browser/runtime checks. Each checker should answer one kind of question:
identity consistency, instructional structure, or observed behavior.

## Alternatives considered

### Rely on local-link checking alone

Rejected. A legacy file can exist and have a valid link while still being the
wrong source for an English reader.

### Treat every unsuffixed file as an error

Rejected. Unsuffixed files are still the intentional legacy path for the
Chinese reading route and for migration-pending entries. The matrix must keep
that distinction visible.

### Put all checks into the existing project validator

Rejected for now. The project validator is a broad minimum-file gate. A
focused integrity command is easier to run after content edits and easier to
interpret when it fails.

## Consequences

- New content identity changes must update status, locale, and reader entries
  together.
- Generated site files must be regenerated after source changes.
- Migration can continue incrementally without falsely claiming full
  translation coverage.
- The project gains a stronger CI signal, but still needs browser and content
  review evidence before release claims are upgraded.

## Evidence boundary

The gate proves cross-file identity and entry consistency for the checked
working tree. It does not prove runtime delivery, translation quality, lab
execution, or learning outcomes.
