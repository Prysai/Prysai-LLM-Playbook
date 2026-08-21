# ADR-0015: Resolve public reader links by content identity and locale

## Status

Accepted for the migration phase

## Date

2026-08-11

## Context

The repository now has eight registered reader locales and a visible language
menu, but the public showcase also contains 22 chapters and 18 labs whose
translation files are being migrated at different speeds. A language toggle
alone is not enough: a reader who chooses Chinese and then opens a chapter can
still be sent to an English-specific hard-coded path. Conversely, a missing
translation must not be represented as if it were complete.

The structure and multilingual studies compare documentation systems that keep
content identity, ordered navigation, locale routing, and translation state as
separate concerns. The existing repository contracts already provide the
locale matrix and current content status; the missing seam is a generated
public-site route index that joins them.

## Decision

1. Treat `content_id` as the stable identity of a chapter, lab, book entry, or
   other routed reader artifact. A locale is a property of that identity, not a
   new content item.
2. Generate `site/locale-manifest.js` with
   `scripts/build_site_locale_manifest.py`. Its sources are
   `docs/governance/locale-matrix.yaml` and
   `docs/governance/content-status.yaml`.
3. Cover every chapter and lab in the status source, including items that are
   not yet present in the locale matrix. Missing locale files remain explicit
   `exists: false` records with a pending translation state.
4. Resolve ordinary chapter, lab, and learning-path links to the current
   locale when that file exists. If it does not exist, use the English source
   or the documented English migration path and expose a visible pending
   banner/title. A fallback is evidence of a missing translation, not a
   translation claim.
5. Keep `?lang=en|zh|es|ja|ko|de|zh-tw|fr` as the shareable language state. The URL is
   the only language source: an absent or invalid parameter resolves to the
   English default. Do not read a browser preference, because it can make a
   shared English URL render a different language.
6. Keep the language switcher as the only intentional cross-locale navigation.
   Ordinary links preserve the current locale and the current path/query/hash
   where applicable.
7. Keep one explicit UI dictionary for each registered locale. The current site
   exposes EN, ZH, ES, JA, KO, DE, and ZH-TW dictionaries; UI translation review
   and reader evidence remain separate from route/file availability.

## Alternatives considered

### Keep hard-coded `-EN.md` links

Rejected. It makes the language control cosmetic: the interface changes while
the next reading action changes language without saying so.

### Treat every missing translation as English without a notice

Rejected. Silent fallback creates a false completeness signal and makes a
translation gap hard to audit.

### Put all 39 routed items directly into the locale matrix immediately

Deferred. The matrix is the authored translation contract and should grow with
reviewed reader-facing migration units. The generated manifest can temporarily
project the chapter/lab status source into explicit route identities without
pretending that those files have entered the translation review queue.

### Use a documentation framework before the content contract is stable

Deferred. The manifest and validators provide the necessary seam now; an
eventual mdBook, Docusaurus, VitePress, or Starlight adapter should consume the
same contracts rather than introduce a second routing system.

## Consequences

- New contributors can find the source of truth for a chapter or lab in the
  project map, status source, and generated route manifest.
- Adding a chapter or lab to the status source makes it routable only after the
  manifest is regenerated and checked.
- The static showcase has a small amount of runtime logic, but the routing
  rules remain deterministic and inspectable without a network service.
- The site can truthfully show eight locale choices while still reporting that
  route/file availability and language review are separate claims.
- The manifest is generated output. Its JSON is not an editing surface.

## Evidence boundary

This decision is informed by the two multilingual routing studies:

- [`multilingual-routing-and-content-identity-2026-08-11.md`](../research/multilingual-routing-and-content-identity-2026-08-11.md)
- [`multilingual-routing-and-six-locale-study-2026-08-11.md`](../research/multilingual-routing-and-six-locale-study-2026-08-11.md)

The studies record public source URLs, dates, and reference-only/license
boundaries. The manifest check proves source/output consistency and route
coverage; it does not prove translation quality, runtime accessibility, or
deployment-level reader acceptance.
