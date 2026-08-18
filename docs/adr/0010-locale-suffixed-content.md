# ADR-0010: Use locale-suffixed content with a canonical locale matrix

## Status

Accepted

## Date

2026-08-10

## Current amendment

The six-locale set below was the initial migration baseline. On 2026-08-18 the
canonical matrix added `ZHTW` (`zh-tw`, `zh-TW`) as the seventh registered
locale. Historical examples retain the original six-locale wording, but
current requirements such as matrix completeness, switchers, validation, and
release gates mean every locale registered in `docs/governance/locale-matrix.yaml`.

## Context

The project is a book-like knowledge base and practice system, not only a
single-language collection of Markdown files. Readers should be able to start
in English, switch languages, and continue through the same learning path
without being sent back to an unrelated language or to a missing page.

The current repository has unsuffixed content files and a public page with a
limited language switch. That is useful as a starting point, but it does not
yet provide a durable identity for the same chapter, lab, or governance page
across languages. It also makes several important states ambiguous:

- an unsuffixed file does not say which language it contains;
- a link can silently cross from a translated page to English;
- a language preference can be lost when the reader follows a link or a
  navigation item;
- a translation can be out of date while still looking complete;
- a machine checker cannot distinguish a missing translation from an
  intentionally locale-neutral source or governance file; and
- renaming every existing file at once would break bookmarks, external links,
  GitHub navigation, and in-progress work.

The project therefore needs a naming rule, a stable cross-language identity,
an explicit locale target, a link rule, a migration path, and machine-
readable translation status. The decision must also preserve the project's
existing evidence language: a file being present or a checker passing does not
prove that its content, translation, browser behavior, or volatile facts have
been verified.

## Decision

### 1. English is the default and the source locale

English (`EN`) is the default public locale and the first development priority.
Every localized content file, including the English source file, MUST include
an uppercase locale suffix before its extension. English is never represented
by an unsuffixed "main" file.

The initial supported locale set is exactly these six locales:

| Locale ID | File suffix | URL token | HTML `lang` | Display name | Role |
|---|---|---|---|---|---|
| `EN` | `-EN` | `en` | `en` | English | default source locale |
| `ZH` | `-ZH` | `zh` | `zh-CN` | 简体中文 | translation locale |
| `ES` | `-ES` | `es` | `es` | Español | translation locale |
| `JA` | `-JA` | `ja` | `ja` | 日本語 | translation locale |
| `KO` | `-KO` | `ko` | `ko` | 한국어 | translation locale |
| `DE` | `-DE` | `de` | `de` | Deutsch | translation locale |

`ZH` means Simplified Chinese for this decision. The file suffix is an
uppercase project identifier; the URL token and HTML value are lowercase or
BCP 47 values as shown in the matrix. New locales or aliases require a new
decision or an explicit amendment to the canonical matrix; contributors must
not introduce ad-hoc forms such as `-CN`, `-EN-US`, or `-GER`.

### 2. A locale-neutral content identity controls every translation

Each translatable artifact has one stable `content_id` and one shared filename
stem. The locale is added only as the final stem component:

```text
<stable-stem>-EN.<extension>
<stable-stem>-ZH.<extension>
<stable-stem>-ES.<extension>
<stable-stem>-JA.<extension>
<stable-stem>-KO.<extension>
<stable-stem>-DE.<extension>
```

For example, one chapter is represented as:

```text
book/chapters/01-first-safe-task-EN.md
book/chapters/01-first-safe-task-ZH.md
book/chapters/01-first-safe-task-ES.md
book/chapters/01-first-safe-task-JA.md
book/chapters/01-first-safe-task-KO.md
book/chapters/01-first-safe-task-DE.md
```

The stable stem and `content_id` identify the same learning object. A
translation is not a new chapter, lab, or evaluation fixture, and it must not
receive a language-specific content ID. Language-specific prose, headings,
examples, alt text, and reader-facing navigation may differ, but the content
identity, learning-level assignment, source relationship, and evidence scope
remain traceable.

The rule applies to reader-facing Markdown and other localized content assets,
including chapters, labs, Skills documentation where localized copies exist,
the table of contents, and localized site content. Files that are deliberately
locale-neutral, such as machine-readable governance data, source registers,
validators, and ADRs, are not forced into one translated copy per locale; they must be
marked as locale-neutral in the matrix or excluded from reader-facing locale
navigation.

### 3. The canonical locale matrix is the source of cross-language identity

The project will maintain one machine-readable locale matrix. The target
canonical location is `docs/governance/locale-matrix.yaml`; it will be added in
a later implementation slice. Until that file exists, the matrix in this ADR
is the normative target and no migration slice may invent a competing mapping.

The matrix MUST contain, for every translatable `content_id`:

- the stable content ID, kind, and shared filename stem;
- one entry for every required locale registered in the matrix;
- the exact canonical path for each entry, including the locale suffix;
- the English `source_revision` that translations were produced from;
- content maturity and translation status separately;
- coverage, reviewer, review date, and stale/blocked reasons where relevant;
- the canonical URL token and HTML language value; and
- a legacy path mapping when an older unsuffixed path exists.

The normative shape is:

```yaml
matrix_version: 1
default_locale: EN
locales:
  EN: {suffix: EN, url_token: en, html_lang: en}
  ZH: {suffix: ZH, url_token: zh, html_lang: zh-CN}
  ES: {suffix: ES, url_token: es, html_lang: es}
  JA: {suffix: JA, url_token: ja, html_lang: ja}
  KO: {suffix: KO, url_token: ko, html_lang: ko}
  DE: {suffix: DE, url_token: de, html_lang: de}
content:
  - content_id: chapter-01
    kind: chapter
    stem: book/chapters/01-first-safe-task
    source_locale: EN
    source_revision: <commit-or-source-revision>
    locales:
      EN:
        path: book/chapters/01-first-safe-task-EN.md
        content_status: candidate
        translation_status: source
      ZH:
        path: book/chapters/01-first-safe-task-ZH.md
        content_status: draft
        translation_status: not-started
```

The example is a schema illustration, not a claim that the shown chapter or
the example files already exist. A complete matrix row must include every
required locale key. During migration, an entry may be `not-started` or `in-progress`, but it
must still be explicit; an omitted locale is a matrix error. Release mode
requires a real path and an allowed status for every public translatable
artifact.

### 4. Reader-facing links stay in the current locale

The default link rule is strict: a localized page MUST link to the same
`content_id` in the same locale whenever the target has a locale variant.
The explicit language switcher described below is the only cross-locale
navigation exception.

Examples:

```text
01-first-safe-task-EN.md  -> 02-task-protocol-EN.md
01-first-safe-task-ZH.md  -> 02-task-protocol-ZH.md
01-first-safe-task-JA.md  -> 02-task-protocol-JA.md
```

This applies to table-of-contents links, previous/next links, learning-path
links, chapter-to-lab links, lab-to-chapter links, site cards, and generated
navigation. It also applies to links that point to a localized asset's anchor:
the target file must be the same-locale file before the `#anchor` fragment is
appended.

#### The language switcher is the only cross-locale exception

Every reader-facing README entry must contain one explicit, machine-checkable
switcher block:

```markdown
<!-- language-switcher:start -->
**Languages:** [English](../../README-EN.md) | [简体中文](../../README-ZH.md) | ...
<!-- language-switcher:end -->
```

Links inside this marked block MAY cross locales, but each target MUST:

1. belong to the same `content_id` as the page containing the switcher;
2. use one of the locales registered in the matrix; and
3. appear exactly once for every registered locale.

An unavailable translation is shown as an unlinked status such as
`繁體中文（尚未提供）`; it is not represented by a guessed path or a link to
an unrelated English page. A validator may therefore distinguish an honest
translation gap from a broken language switch.

The root `README.md` is a deliberate English (`EN`) GitHub facade retained for
GitHub's default rendering and existing bookmarks. It carries an explicit
`locale: EN` marker, exposes the registered-locale switcher, and points to the
suffixed `README-EN.md` as the canonical English source. It is not a second
independent English edition; changes to the facade and source must be reviewed
together. The unsuffixed `book/README.md` remains a language-neutral
compatibility entry point during migration and defaults to `book/README-EN.md`.
Both paths retain their compatibility identity in
`docs/governance/locale-matrix.yaml`.

The only permitted unsuffixed local targets are files explicitly classified as
locale-neutral by the matrix, such as a validator, an ADR, or a source/license
record. A locale-neutral link must not be presented as if it were translated
reader content. External URLs are not rewritten, but their surrounding label
and language status must remain honest.

There is no silent fallback from `ZH`, `ES`, `JA`, `KO`, or `DE` to English.
While a translation is missing, the page must either link to an explicit
same-locale placeholder/status page or show an explicit, machine-registered
notice that the English source is the available reading path. A default-
language link without that notice is a link-integrity failure.

### 5. Locale is a shareable page state and survives navigation

For the current static site, the canonical public locale state is
`?lang=<url_token>`, including `?lang=en` for an explicitly shareable English
URL. A URL without `lang` is a compatibility alias that resolves to the
English default. The implementation may later use locale-prefixed routes, but
it must preserve one canonical mapping and provide redirects from the old
form; two independently canonical URL schemes are not allowed.

The locale switcher and every generated reader-facing link MUST:

1. resolve the current page's `content_id` through the locale matrix;
2. retain the selected locale when moving to another page;
3. preserve a valid anchor and relevant shareable learning-path/filter state;
4. update the document `lang`, title, description, visible labels, and
   accessible names; and
5. make the resulting URL directly shareable and reloadable without relying
   on `localStorage` or an in-memory preference.

`localStorage` or a cookie may remember a reader's preference, but it is only a
convenience. An explicit URL locale always wins, and a fresh URL without a
locale always defaults to `EN`.

### 6. Migration is incremental and old links remain usable

The repository will migrate in small, reviewable slices:

1. **Inventory:** assign stable content IDs, record every existing unsuffixed
   path in the matrix's legacy map, and classify locale-neutral files.
2. **English source first:** create the authoritative `-EN` file for each
   public artifact. Existing Chinese content must not be silently re-labeled
   as English merely because it was previously the primary file.
3. **Translations:** add `-ZH`, `-ES`, `-JA`, `-KO`, and `-DE` from a recorded
   English `source_revision`; update each translated file's internal links to
   its own locale.
4. **Canonical navigation:** switch the table of contents, site, learning
   path, and cross-references to matrix-generated suffixed paths, one bounded
   group at a time.
5. **Compatibility window:** keep old unsuffixed paths as redirect rules where
   the host supports redirects, or as thin compatibility stubs where it does
   not. A stub must name the canonical `-EN` path and any explicit locale
   alternatives; it must not maintain a second full copy of the content.
6. **Strict release gate:** after all public artifacts have completed
   locale entries and link checks pass, deprecate legacy paths. Removing a
   legacy path requires a separate reviewed change with a link audit and a
   rollback plan.

Legacy behavior is deterministic:

- an old unsuffixed path without an explicit locale resolves to the `EN`
  canonical path;
- an old path with a valid explicit locale resolves to that locale only when
  the matrix has a corresponding file; otherwise it shows the registered
  translation-status notice;
- redirects and stubs preserve anchors where the target contains the anchor;
  a missing anchor is reported rather than silently discarded; and
- existing external bookmarks are not treated as evidence that migration is
  complete.

No mass rename, deletion, or compatibility break is part of this ADR. Each
migration slice must preserve unrelated user changes and must be independently
reviewable.

### 7. Content maturity and translation status are separate

The matrix records two dimensions. `content_status` uses the project's stable
status language: `draft`, `candidate`, `verified`, or `production-ready`.
`translation_status` uses this explicit vocabulary:

| Translation status | Meaning |
|---|---|
| `source` | The `EN` source entry; it is not a translation. |
| `not-started` | The locale is required but work has not begun. |
| `in-progress` | A translation exists or is being prepared, but coverage or review is incomplete. |
| `candidate` | The translation is structurally complete and has passed basic terminology/link review, but its stated acceptance evidence is incomplete. |
| `verified` | The declared coverage, terminology, same-locale links, source revision, and review checks passed for the stated scope. |
| `stale` | The English source or a relevant volatile fact changed after the last translation review. |

Every non-`EN` entry MUST record at least `translated_from: EN`,
`source_revision`, `coverage`, `reviewed_at` when reviewed, and a reason when
it is `not-started`, `in-progress`, or `stale`. Translation status does not
promote the underlying content to `verified`; a translated draft is still a
draft, and a passed structural check is not browser or runtime evidence.

The public site and generated indexes must show missing, candidate, and stale
translations honestly. They must not copy English into a locale file and label
it complete, and they must not treat machine translation as human review by
default.

### 8. Machine validation is a release requirement

The implementation will add or extend validators so that the architecture is
enforceable rather than a naming convention maintained by memory. At minimum,
the validation suite MUST check:

- the default locale is `EN` and the registered locale definitions match the matrix;
- every localized filename ends in exactly one allowed uppercase suffix,
  including `-EN`;
- every translatable content ID has one matrix entry per registered locale and no duplicate path;
- each matrix path matches its content ID, shared stem, and locale suffix;
- a claimed non-`not-started` file exists and is valid UTF-8 Markdown or the
  declared asset format;
- reader-facing local links resolve to the same locale's matrix path and
  preserve valid anchors;
- unsuffixed local links are allowed only for matrix-registered
  locale-neutral files;
- language switchers map the same content ID across locales and preserve URL
  state;
- legacy paths map to one deterministic canonical path and do not create
  loops;
- `verified` translations have complete declared coverage, a source revision,
  review metadata, and no stale marker; and
- reports expose per-locale counts and statuses instead of collapsing missing
  translations into the English count.

Validation has two explicit modes:

- **Migration mode** permits `not-started` and `in-progress` entries only when
  the matrix records them and no public navigation points to a missing file
  without a status notice.
- **Release mode** requires all registered locale files for every public translatable
  artifact, same-locale links, complete metadata, and no unregistered legacy
  path.

The eventual validator and the existing project checks are complementary:
locale validation covers identity, paths, status, and locale-aware links;
`check_local_links.py` covers ordinary local link resolution;
`validate_site_i18n.py` covers public UI dictionary coverage; and the normal
content, fact, learning-path, and browser checks still determine whether the
result is actually usable. A green locale check alone is not a production
claim.

## Alternatives considered

### Leave English files unsuffixed and suffix translations only

Rejected. It makes the source language implicit, prevents a uniform matrix,
and causes renames or link logic to behave differently for the default locale.
The main language file must follow the same `-EN` rule as every other locale.

### Use locale directories but keep identical filenames

Rejected for this repository's primary Markdown workflow. Directory-based
localization can work, but the user-facing requirement is that every file be
visibly labeled, and suffixed filenames remain unambiguous in GitHub search,
raw links, downloaded archives, and local editors. A future site build may
derive routes from the matrix, but it must not remove the filename identity.

### Keep only `?lang=` state and use unsuffixed Markdown links

Rejected. Runtime state does not make a repository file's language explicit,
and direct GitHub or downloaded-file navigation bypasses the site state. URL
locale and file suffixes are complementary safeguards.

### Silently fall back to English for missing translations

Rejected. It produces a false impression of translation completeness and
allows a reader to cross languages without noticing. Any fallback during
migration must be explicit, registered, and visible.

### Rename all existing files in one operation

Rejected. It creates a large, difficult-to-review break in external links and
can overwrite or mislabel existing content. The matrix, compatibility map, and
small migration slices make the change reversible and auditable.

## Consequences

### Benefits

- The language of every public content file is visible from its name.
- English-first development has a clear source revision for every translation.
- A reader can switch once and retain the locale through the whole learning
  path.
- Link audits can detect language leakage, missing translations, stale
  translations, and broken legacy paths mechanically.
- Translation work becomes reviewable and attributable rather than hidden in a
  runtime fallback.

### Costs and risks

- The repository will contain one file per registered locale for each public content identity, so
  navigation, search, and review volume will grow.
- A source change can make several translations stale and require a focused
  update cycle.
- The matrix becomes a critical governance file and must be updated in the
  same change as a new or renamed content identity.
- Compatibility stubs and redirects must be maintained during the migration
  window.
- Automated checks can prove structural consistency and declared status, but
  not translation quality, factual correctness, or reader comprehension.

## Implementation acceptance checklist

This ADR is accepted as a target architecture. It is not evidence that the
migration has already been performed. An implementation may claim completion
only when the following evidence exists:

- [ ] `docs/governance/locale-matrix.yaml` exists and is the only canonical
      locale mapping.
- [ ] Public English content has `-EN` filenames; no unsuffixed English source
      is used as the canonical file.
- [ ] Each public translatable content ID has `EN`, `ZH`, `ES`, `JA`, `KO`, and
      `DE` entries and files, or the repository is explicitly still in
      migration mode.
- [ ] Localized reader-facing links stay within the current locale.
- [ ] Switching locale preserves the locale, content identity, anchor, and
      supported shareable page state across navigation and reload.
- [ ] Legacy links resolve deterministically and are covered by a link audit.
- [ ] Translation coverage, source revision, review metadata, and stale state
      are machine-readable and visible.
- [ ] Migration-mode and release-mode validators both run in the documented
      quality workflow.
- [ ] The final report distinguishes `draft`, `candidate`, `verified`, and
      `production-ready`, and does not claim runtime or translation verification
      that was not performed.

## References

- [Project terminology and status language](../../CONTEXT.md)
- [Project charter](../charter.md)
- [Book architecture](../book-architecture.md)
- [ADR-0008: Generate public learning-path data from the contract](0008-generated-public-learning-path-data.md)
- [ADR-0009: Track volatile fact consumers in a machine-readable impact registry](0009-fact-impact-registry.md)
- [Bilingual documentation patterns research](../research/bilingual-docs-patterns-2026-08-09.md)
