# Multilingual routing and six-locale study

**Date:** 2026-08-11
**Scope:** this repository working tree
**Status:** research note; recommendations are not implementation or runtime verification
**Hard requirements under review:** English default; six locales; explicit locale suffixes on reader-facing files; same-language links; language state preserved across pages; visible missing-translation disclosure; chapter footer previous/next links.

## Executive conclusion

The repository already has a credible migration contract: English is the default and source locale; the matrix registers `EN`, `ZH`, `ES`, `JA`, `KO`, and `DE`; localized content uses an uppercase suffix; README switchers expose all six registered locales; and the book has one canonical chapter-order source that generates previous/next footers for the English and legacy Simplified Chinese paths.

The contract is not yet a six-locale reader experience. The matrix contains 17 content identities. All 17 have English source entries, but only 8 files currently exist for each non-English locale, and every non-English matrix entry is `in-progress`. The public site runtime exposes only `en` and `zh`, while its hard-coded content links are English-specific. The chapter navigation validator currently checks only `EN` and `ZH`, and its fallback for the legacy Chinese path is intentionally unsuffixed during migration. These facts should remain visible in the product status.

**Recommendation:** retain the current English-first, matrix-driven migration model, but make one content identity the join key across file, URL, site, language switcher, and chapter navigation. Add a route resolver that maps `content_id + locale` to an existing reviewed path or to an explicit missing-translation state. Preserve locale in the URL as the primary shareable state; use browser/storage preference only as a secondary convenience. Generate chapter navigation per locale from the same order source, with no silent cross-language fallback.

## 1. Evidence from the repository

### 1.1 Locale matrix

**Observed fact (local evidence, read 2026-08-11):** `docs/governance/locale-matrix.yaml` is JSON-compatible despite the `.yaml` extension. It declares:

| Locale | File suffix | URL token | HTML `lang` | Current role |
|---|---|---|---|---|
| EN | `-EN` | `en` | `en` | English default/source |
| ZH | `-ZH` | `zh` | `zh-CN` | Translation locale |
| ES | `-ES` | `es` | `es` | Translation locale |
| JA | `-JA` | `ja` | `ja` | Translation locale |
| KO | `-KO` | `ko` | `ko` | Translation locale |
| DE | `-DE` | `de` | `de` | Translation locale |

The matrix is in `migration` mode, has `default_locale: EN`, was last reviewed on 2026-08-11, and schedules the next review for 2026-11-09. It contains 17 identities: one project entry, three book entries, nine chapters, and four labs. The local Python inspection found 17/17 English files and 8/17 files for each of `ZH`, `ES`, `JA`, `KO`, and `DE`; all non-English entries are marked `in-progress`.

The matrix also declares locale-neutral paths for governance, evaluation, scripts, site, and skills. This is important: “every reader-facing file has a suffix” does not mean that machine-facing governance or implementation files should receive artificial translations. The requirement applies to reader-facing content identities, while the neutral-path boundary must stay explicit and tested.

### 1.2 Local validators

**Observed fact:** `scripts/validate_localization.py` defines the exact six-locale set, requires `default_locale == EN`, checks suffix/path/stem identity, requires every matrix content identity to declare all six locales, checks README language switchers, and rejects same-locale leakage outside the switcher. It supports migration mode and a stricter `--release` mode. On 2026-08-11 it passed:

```text
LOCALIZATION_OK mode=migration content_ids=17
files=EN:17,ZH:8,ES:8,JA:8,KO:8,DE:8
registered_paths=102
```

The validator therefore proves the migration contract and current file counts, not six-locale completeness. In particular, migration mode allows missing files and `in-progress` entries. Release mode is the appropriate gate for a claim that every matrix path is a reviewed, real translation.

**Observed fact:** `scripts/validate_site_i18n.py` checks that the public site defaults to `lang="en"`, has a language toggle, reads `?lang=`, uses `localStorage`, updates `document.documentElement.lang`, and has complete EN/ZH dictionary keys. It passed on 2026-08-11 with `html_keys=310 translated_keys=310`.

**Boundary:** this validator proves only the two implemented runtime dictionaries and the persistence mechanism. It does not prove six runtime languages, same-content route mapping, cross-page preservation, or missing-page disclosure.

**Observed fact:** `scripts/validate_book_navigation.py` passed on 2026-08-11:

```text
BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH
```

The source code explicitly targets the English path when it exists and a legacy unsuffixed path otherwise; the legacy path is treated as `ZH`. That is a coherent migration bridge, but it is not the final six-locale footer contract.

### 1.3 README and book routing

**Observed fact:** `README-EN.md` and the compatibility `README.md` identify English as the source/default, link all six registered locales, describe the five non-English entries as translation slices with review pending, and state that missing translations receive a migration notice and source link. `book/README-EN.md` repeats the same source-locale and same-identity rules.

**Observed fact:** README validation has a deliberate exception for root `README.md`: GitHub’s default repository page is an unsuffixed English facade, while `README-EN.md` is the canonical suffixed source. This is a compatibility exception, not evidence that unsuffixed reader-facing files are generally acceptable.

**Recommendation:** keep the exception machine-readable and narrow. New reader-facing files should use `-EN`, `-ZH`, `-ES`, `-JA`, `-KO`, or `-DE`; legacy unsuffixed paths should be treated as migration aliases with visible notices and a retirement plan.

### 1.4 Public site routing and state

**Observed fact:** `site/index.html` advertises six repository entry locales, but the runtime toggle contains only `EN / 中文`. The site copy itself says the other entry slices are not exposed and that the runtime showcase is not six-language complete.

**Observed fact:** `site/app.js` accepts `?lang=en|zh`, otherwise reads `localStorage`, defaults to `en`, updates `document.documentElement.lang`, title, description, ARIA text, and the URL query parameter, then persists the preference. This satisfies the current two-language state contract for a single page.

**Gap:** links in `site/index.html` and the learning-path data point directly to `-EN.md` files. The runtime language switch changes interface copy but does not resolve each linked content identity into the selected locale. A reader who chooses Chinese can still be sent to English chapter files. This violates the stronger requirement “same-language links” once the site is treated as a multilingual reader surface.

**Recommendation:** represent site links as `content_id` references or matrix-backed route records, then resolve them at render time using the current locale. If the target locale is absent or not release-ready, render a visible status such as “Spanish translation in progress; open English source” and make the English link a clearly labeled fallback action. Do not silently relabel English content as the target language.

## 2. Authoritative patterns

The following are facts about the cited systems as observed from their official documentation on 2026-08-11. The design recommendations below are this project’s synthesis, not claims that any external system mandates the repository’s exact suffix convention.

### 2.1 GitHub Docs

**Fact:** GitHub Docs documents a frontmatter schema for page metadata, including title, short title, versioning, children, layout, and redirects. Its content README states that the site’s Markdown links are transformed server-side to match the current page’s language and version, and that index pages know only about paths listed in `children`; an existing file omitted from that navigation can still 404 from the site’s routing perspective.

**Fact:** GitHub Docs’ translation-friendly writing guidance recommends clear, unambiguous English, limited inline links, and explicit context. Its findability guidance calls for discrete topics, clear headings, complete metadata, strategic links, accuracy, and periodic audits.

**Implication for this repository:** a stable content identity and explicit route/index data are more reliable than deriving identity from translated headings or filename guesses. A locale-aware link resolver should preserve the current language and content identity just as GitHub Docs’ link rewriting preserves page language/version context.

Sources:

- GitHub Docs, [Writing content to be translated](https://docs.github.com/en/contributing/writing-for-github-docs/writing-content-to-be-translated), accessed 2026-08-11.
- GitHub Docs, [Using YAML frontmatter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter), accessed 2026-08-11.
- GitHub Docs repository, [`content/README.md`](https://github.com/github/docs/blob/main/content/README.md), accessed 2026-08-11.
- GitHub Docs, [Making content findable in search](https://docs.github.com/en/contributing/writing-for-github-docs/making-content-findable-in-search), accessed 2026-08-11.
- GitHub Docs, [Markdown and Liquid](https://docs.github.com/en/contributing/writing-for-github-docs/using-markdown-and-liquid-in-github-docs), accessed 2026-08-11.

### 2.2 Docusaurus

**Fact:** Docusaurus’ official i18n tutorial models `defaultLocale` and an explicit `locales` list. Locale names determine translation-file locations and base URL behavior; the default locale may omit its URL prefix while alternative locales use a locale prefix. The tutorial describes configuring, translating, and deploying as separate steps and notes that a newly created locale can be mostly untranslated.

**Fact:** Docusaurus explicitly does not provide automatic locale detection and treats each locale as a distinct standalone site/build target. It also distinguishes whole Markdown/MDX document translations from JSON translations for React/theme UI.

**Fact:** the tutorial states that generic theme labels such as “Next” and “Previous” have default translations. This is a UI-label facility, not proof that every target document exists in every locale.

**Implication:** locale URL identity should be explicit and publishability should be separate from locale registration. The repository’s matrix already has the right conceptual separation; the site should expose it through route resolution and visible status.

Source:

- Docusaurus, [i18n introduction](https://docusaurus.io/docs/i18n/introduction), accessed 2026-08-11.
- Docusaurus, [i18n tutorial](https://docusaurus.io/docs/i18n/tutorial), accessed 2026-08-11.

### 2.3 MkDocs and Material for MkDocs

**Fact:** MkDocs uses an explicit `nav` configuration to define included pages and order; without it, navigation is discovered and sorted from documentation files. The official writing guide identifies `Previous` and `Next` as part of the rendered documentation navigation.

**Fact:** Material for MkDocs documents that HTML5 permits one canonical language per document, so one `mkdocs.yml` project has one canonical `theme.language`. Its recommended multi-language pattern is one project/subfolder per language, linked by a language selector. The selector’s `alternate` records carry a display name, URL, and ISO language code.

**Fact:** Material documents a “stay on page” behavior when two languages contain a page at the same path. This behavior depends on the alternate URL/path mapping; the system does not thereby guarantee that every page exists in every language.

**Fact:** Material also warns that translated language rules can affect anchor readability. A language switcher must therefore treat anchors as a separate mapping concern rather than blindly preserving every hash fragment.

**Implication:** use explicit alternate targets keyed by content identity, preserve the current page only when the target exists, and handle a missing target with a visible disclosure. Keep chapter order explicit and generate adjacent footer links from that order.

Sources:

- MkDocs, [Writing your docs](https://www.mkdocs.org/user-guide/writing-your-docs/), accessed 2026-08-11.
- Material for MkDocs, [Changing the language](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/), accessed 2026-08-11.

### 2.4 Sphinx and gettext/i18n

**Fact:** Sphinx’s internationalization documentation uses gettext message extraction. `sphinx-build -M gettext` produces `.pot` templates; translators produce `.po` catalogs; compiled `.mo` catalogs are placed under locale directories such as `locale/es/LC_MESSAGES/`; `locale_dirs` and the selected `language` make them discoverable. Sphinx translates generated messages and document messages, but its documented mechanism is a build/catalog workflow rather than a six-locale URL router.

**Implication:** separate UI translation from document identity and route mapping. A catalog system can help scale interface strings, but it does not remove the need for a content matrix, per-locale file/path checks, same-language link checks, or explicit missing-translation states.

Sources:

- Sphinx, [Internationalization](https://www.sphinx-doc.org/en/master/usage/advanced/intl.html), accessed 2026-08-11.
- Sphinx, [Configuration: `language` and internationalization options](https://www.sphinx-doc.org/en/master/usage/configuration.html#conf-language), accessed 2026-08-11.

## 3. Recommended target architecture

### 3.1 Identity and file contract

Use this conceptual key for every reader-facing content unit:

```text
content_id × locale × content_status × translation_status × source_revision
```

The physical file remains explicit:

```text
book/chapters/03-task-protocol-EN.md
book/chapters/03-task-protocol-ZH.md
book/chapters/03-task-protocol-ES.md
book/chapters/03-task-protocol-JA.md
book/chapters/03-task-protocol-KO.md
book/chapters/03-task-protocol-DE.md
```

The matrix, not a string replacement heuristic, should decide whether a target is present, published, stale, or missing. The route resolver should never infer a translation from a translated title.

### 3.2 URL and language-state contract

Recommended precedence:

```text
valid locale in URL
  > persisted reader preference
  > English default
```

The URL is the shareable identity. A query parameter can remain compatible with the current site (`?lang=en|zh`), but a future static documentation route should preferably make locale visible in the path or document filename. Storage/cookie state may remember preference; it must not override an explicit URL locale and must not determine the content identity.

When changing language on a page, preserve:

- `content_id`;
- locale-specific target path;
- version or source revision context when applicable;
- an anchor only when the target locale declares that anchor.

If no target file exists, preserve the selected locale in the status state and offer a labeled source-locale action. Do not navigate to an English file while leaving the page’s language label as the requested locale.

### 3.3 Missing-translation disclosure

The matrix needs to distinguish at least:

| State | Reader-facing behavior |
|---|---|
| `source` | Link normally in the source locale. |
| `in-progress` / `not-started` | Show the locale as unavailable or migration-pending; link to the English source only with an explicit label. |
| `candidate` | Show as available only within the project’s stated candidate scope; retain status wording. |
| `verified` | Allow normal localized navigation for the declared scope. |
| `stale` | Show a stale warning and identify the English revision that superseded it. |

Do not treat a file’s existence, a language selector entry, or a successful build as translation completeness. This matches the repository’s current ADR and the Docusaurus/Material boundaries.

### 3.4 Chapter footer navigation

Keep `docs/governance/book-navigation.yaml` as the single ordered chapter source. For each locale, generate a footer from the flattened chapter order:

- first chapter: next only;
- middle chapter: previous and next;
- last chapter: previous only;
- target locale file exists and is eligible: same-locale link;
- target locale file missing or not release-ready: visible migration/missing status and labeled English source action;
- no locale-specific footer should silently link to an unrelated language.

The current generator already handles first/middle/last boundaries and English migration-pending links. Extend its input/output contract from `EN` and legacy `ZH` to all six locales only when the matrix can resolve each target. The table of contents remains a route index, not a replacement for chapter footers.

## 4. Acceptance checklist for implementation

This checklist is a recommendation for the next implementation slice; it is not a claim that the repository currently passes it.

- [ ] English is the default for root, book, site, and generated indexes.
- [ ] The six locales are declared once in the matrix with suffix, URL token, HTML language, display name, status, and review metadata.
- [ ] Every reader-facing localized file, including English source files, has the explicit locale suffix; only the documented GitHub `README.md` compatibility facade remains unsuffixed.
- [ ] Every internal reader-facing link resolves through `content_id + locale`, and a localized page does not link to another locale outside an explicit language switcher or labeled source fallback.
- [ ] A valid locale URL wins over persisted preference; refresh and cross-page navigation preserve the locale.
- [ ] Site title, description, HTML `lang`, visible language label, ARIA labels, empty states, error states, search/index results, and route links agree with the active locale.
- [ ] Missing, in-progress, candidate, stale, and verified translation states are visible and machine-checkable.
- [ ] The language switcher does not imply full six-language coverage merely because six locales are registered.
- [ ] Chapter footers are generated from the canonical order and contain correct same-locale previous/next links, with first/middle/last boundary tests.
- [ ] Release validation rejects missing locale files, unresolved same-language links, unregistered suffixes, stale metadata without explanation, and untranslated footer targets.
- [ ] Browser verification separately tests direct locale URLs, language switching on a middle chapter, refresh, next/previous chapter navigation, a missing translation, and an anchor that does not exist in the target locale.

## 5. Evidence boundary and license/source note

The local statements above are repository observations from files and validators read on 2026-08-11. Passing `validate_localization.py`, `validate_site_i18n.py`, and `validate_book_navigation.py` proves only their stated static checks; it does not prove deployed routing, browser behavior, accessibility, translation quality, or production readiness.

The external sources were used for architecture facts and original comparison only. This note does not copy external prose, code, images, CSS, templates, or brand assets. The project’s source/license register should record this note as a reference-only comparison of GitHub Docs, Docusaurus, MkDocs/Material, and Sphinx official documentation.

**Research status:** verified as a repository/source study; implementation status: not started by this note; runtime status: not tested by this note.
