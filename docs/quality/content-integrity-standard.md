# Content integrity standard

This standard protects the relationship between the book, the governance
records, and the public reader. It is a consistency gate, not a claim about
runtime behavior or learning outcomes.

## What the gate checks

`scripts/validate_content_completeness.py` checks that:

- the `content-status.yaml` chapter and lab counts, IDs, and paths are real;
- each registered English source is represented by the same stable
  `content_id` in the locale matrix and in the file header;
- the locale matrix has one identity per English path and records legacy paths
  separately;
- all 22 chapters appear once, in order, in `book-navigation.yaml`, with an
  English `-EN.md` path and a still-resolvable legacy path;
- the principal English reader entries use canonical paths for the migrated
  Chapter 12 and Lab 006 identities;
- the three generated site data files exist and carry their generator markers.

The validator reports migration-pending sources as warnings. It does not turn
an unsuffixed legacy file into an English source, and it does not fail merely
because a translation has not been authored.

## What the gate cannot prove

A passing result does not prove that:

- a lab or evaluation fixture has run;
- a translation is accurate or has received human review;
- a browser route works on GitHub Pages or at every viewport;
- a Skill, model, tool, or product fact is current;
- a reader understood or can transfer the material.

Those claims require the separate runtime, source, review, and learning
evidence recorded in `docs/governance/content-status.yaml` and the quality
records.

## When to run it

Run it after changing a chapter or lab identity, a language path, the chapter
order, a public reader entry, or any source record used by the generators. CI
runs it before generated-output and Pages checks.

The teaching-structure check has a matching focused mode:
`python scripts/validate_learning_contract.py --canonical-en`. It currently
covers all 22 English chapters and all 17 English lab sources declared in the
locale matrix. Legacy unsuffixed files remain available for migration history;
they are not canonical English sources.
