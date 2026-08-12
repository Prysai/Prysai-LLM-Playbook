# ADR-0018: Generate a dependency-free search index from canonical content

## Status

Accepted

## Date

2026-08-12

## Context

The public site needs a way to find chapters, labs, Skills, and field research
without making one network request per Markdown file or adding a second content
catalog. The project is intentionally a dependency-free static site. Its
existing locale manifest already gives each reader-facing item a stable
`content_id`, identifies available language paths, and records explicit
translation state.

Search must work from the repository site and the GitHub Pages artifact. It must
not silently duplicate one chapter for every language file or turn an English
fallback into a completed translation.

## Decision

1. Generate `site/search-index.js` with
   `scripts/build_site_search_index.py`.
2. Build the index from the locale manifest, canonical navigation, content
   status, and existing Markdown sources. Use `content_id` as the result
   identity, not a file path.
3. Store bounded title, snippet, and normalized searchable text per existing
   locale. An existing source may be searchable while its translation is still
   `in-progress`; the browser must display the available source and label the
   fallback when it is not a ready translation.
4. Match in the browser with deterministic title, snippet, body, and identity
   scoring. Keep the first version small enough to inspect and regenerate.
5. Route result links through the existing locale and Pages artifact helpers.
   The search index does not create a second navigation or fallback system.
6. Require `scripts/build_site_search_index.py --check` in CI and require
   `site/search-index.js` in the Pages source and artifact checks.

## Alternatives considered

### Fetch every Markdown file when the user searches

Rejected. It creates many requests, depends on the runtime serving paths
correctly, and makes a missing source look like a search failure.

### Add a third-party search library or hosted search service

Rejected for the first slice. The current corpus is small, and an additional
runtime dependency or external service would add license, network, build, and
release boundaries before the project has evidence that it needs them.

### Treat only ready translations as searchable

Rejected. A Chinese or other locale source can be useful for discovery while
still being marked as pending review. Hiding it produces false negatives for
readers during migration. Display and translation status remain separate.

### Add search data to the locale manifest

Rejected. Locale identity and full-text search have different ownership and
update rules. The search index consumes the manifest instead of turning it into
an overloaded contract.

## Consequences

- Search is local, fast, and usable in the Pages artifact without a backend.
- Generated output must be refreshed whenever canonical content or locale
  state changes.
- Search text increases the generated file size, so the builder bounds each
  locale's indexed text and can be revisited if the corpus grows materially.
- Search results can identify a source, but they do not prove that a lab ran,
  a translation was reviewed, or a product fact is current.
- Browser QA remains necessary for query parameters, fallback labels, keyboard
  access, console errors, and narrow viewports.

## Evidence boundary

This is a repository architecture decision. It establishes how the static site
is built; it does not establish search quality, user adoption, or public Pages
reachability. Those require the recorded build, browser, and deployment checks.
