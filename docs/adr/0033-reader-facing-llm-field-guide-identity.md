# ADR-0033: Set the reader-facing identity to First Task, Real Work

## Status

Superseded by ADR-0034 for reader-facing naming.

## Date

2026-08-14

## Context

The project began with a Codex-specific public-name candidate in ADR-0004.
Its curriculum has since made a more durable distinction: a platform-neutral
language-model collaboration core owns transferable methods, while Codex is the
deepest current practice track. That architecture does not establish that
other product adapters exist or behave like Codex.

Prysai approved a new public-facing name because the previous title made the
whole course look like a product-specific Codex manual. The new name needs to
be clear to someone searching for practical AI or LLM guidance, preserve the
hard-won Codex depth, and avoid promising equal coverage of Claude Code or any
other named product.

ADR-0025 previously deferred a broad brand change until an adapter and a full
operational migration package existed. That gate remains in force for a remote
repository rename, a new slug, an expanded platform-coverage promise, or an
adapter claim. This decision makes the narrower, local reader-facing change:
it replaces a product name with a scope-accurate learning identity and keeps
the actual platform boundary visible.

## Decision

1. Use **First Task, Real Work — An LLM Field Guide** as the full
   reader-facing project name.
2. Use **FIRST TASK, REAL WORK** as the compact visual wordmark. Pair it with
   the descriptor **A field guide to working with language models** where the
   full title would be too long.
3. Keep **Codex Practice Track** as the name of the flagship, deepest current
   platform route. The course may discuss Claude Code or another named product
   only under the evidence-gated adapter rules in ADR-0025.
4. Update current entry pages, book entry points, site metadata, Reader chrome,
   original header/social assets, and contributor-facing vocabulary. Do not
   rewrite historical research, old ADRs, source records, or evaluation-suite
   identifiers merely to erase the former name.
5. Preserve the GitHub repository slug `Prysai/Codex-Field-Guide`, remote URL,
   package name, Skill directory names, stable content IDs, locale identities,
   and existing local paths. No repository rename, visibility change, release,
   redirect, domain claim, package claim, or social-handle claim is part of
   this decision.

The public one-sentence promise is:

> A practical LLM field guide: turn a first task into bounded, checkable real
> work, starting with the Codex Practice Track.

## Alternatives considered

### Keep `Codex: From First Task to Real Work`

Rejected. It keeps a strong outcome phrase but incorrectly makes the umbrella
look like a Codex-only product manual when the project has a separately owned
universal core.

### Use `Models at Work`

Rejected. It is a useful exploration recorded in the previous strategy note,
but it is less distinctive, loses the beginner-to-outcome promise, and omits
the search term `LLM` that makes the scope immediately legible.

### Rename the remote repository at the same time

Deferred. Changing a slug affects clone URLs, issue URLs, Pages defaults,
inbound links, release rollback, and contributor expectations. It requires
its own explicit authorization and migration evidence.

### Promise a Codex-and-Claude-Code guide now

Rejected. Product names alone cannot establish equivalent tools, permissions,
context handling, persistence, or verified learning paths.

## Consequences

- The first impression now names the learner outcome and the LLM category,
  while the current Codex depth remains easy to find.
- Search descriptions can use `AI`, `LLM`, `language models`, `Codex`, and
  `real work` without putting unearned platform breadth in the title.
- Existing URLs and identifiers remain valid, although an old internal slug
  will still be visible until Prysai separately approves a repository
  migration.
- `Models at Work` is retained as a superseded strategy proposal, not an
  alternate active brand.
- The project remains `candidate`; this is a copy and identity decision, not
  learner evidence, an adapter admission, public release, or product claim.

## Evidence boundary

This ADR records Prysai's naming decision and the local compatibility boundary.
It does not prove trademark availability, domain or handle availability,
search ranking, reader comprehension, platform equivalence, learner outcomes,
GitHub Pages deployment, repository visibility, release readiness, or
production readiness.
