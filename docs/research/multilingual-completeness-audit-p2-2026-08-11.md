# Multilingual completeness audit (P2)

**Audit date:** 2026-08-11

**Repository:** `Prysai/Codex-Field-Guide`

**Auditor scope:** reader-facing Markdown naming, locale matrix coverage, same-language links, unsuffixed legacy paths, and the Pages reader's `lang`/`path`/fallback contract.
**Change boundary:** this audit adds this file only. It does not move or rename files and does not modify an existing script. The exact unsuffixed filename is intentional because the requested path is a locale-neutral research record under `docs/research/`; it is not a translated reader-facing content identity.

## 1. Executive conclusion

The repository has a useful migration foundation, but it is not yet a complete six-language reading product.

The current state is best described as:

> **English source plus six registered route tokens, with a small multilingual content slice and explicit English fallback.**

It must not yet be described as “the whole book is available in six languages” or “switching language keeps the entire site in that language.”

The highest-priority gaps are:

1. **The language contract is split across three scopes.** `locale-matrix.yaml` registers 17 content identities, while `content-status.yaml` routes 22 chapters and 13 labs. The latter contains 35 route items, of which 35 are not yet represented as matrix content identities.
2. **The filename convention is only partially applied.** The book still contains unsuffixed chapter/lab files, while only a subset has `-EN`, `-ZH`, `-ES`, `-JA`, `-KO`, and `-DE` siblings.
3. **No non-English matrix entry is runtime-ready under the current readiness rule.** The existing non-English files are marked `in-progress`; missing entries are also `in-progress` in the migration matrix. The reader therefore deliberately serves the English source with a visible fallback message.
4. **The Pages reader does not reliably preserve an explicit `lang` query across Markdown links.** `readerHref()` creates `reader.html?path=...` without carrying the current `lang`; the reader then consults `localStorage` or defaults to English. A copied direct URL can therefore change language after the reader link is followed.
5. **The reader document keeps a static `<html lang="en">`.** `site/reader.js` selects the requested/effective locale but does not update the reader document's HTML language attribute. This is incorrect for a real translated page and ambiguous for a fallback page.
6. **Chapter navigation is still an EN/legacy-ZH contract.** The navigation source has `default_locale: EN` and `legacy_locale: ZH`, and `validate_book_navigation.py` reports `locales=EN,ZH`; it is not a six-locale navigation check.
7. **Existing link checks prove existence, not language correctness.** `check_local_links.py` passed with `checked=1633`, but it does not assert content identity, source locale, effective locale, or same-language targets.

The correct migration target is not “make every Markdown file have six copies.” It is:

- classify every public Markdown file as localized, locale-neutral, or internal;
- give every localized reader-facing identity one stable `content_id` and six explicit locale records;
- make every localized link resolve through that identity map;
- preserve requested locale and effective locale separately when fallback occurs;
- generate TOC, sidebar, previous/next, language switcher, canonical, and alternate links from the same source;
- keep migration and release gates distinct.

## 2. Current evidence baseline

### 2.1 Repository and tracked Markdown inventory

The audit began at commit `9566009` (`Publish the Field Guide reading surface`) with a clean worktree. The tracked Markdown inventory, excluding temporary paths by rule, is:

| Area | Tracked Markdown | With a supported locale suffix | Without a suffix | Current interpretation |
|---|---:|---:|---:|---|
| Root Markdown (`README*.md`, `AGENTS.md`, `CONTEXT.md`) | 9 | 6 | 3 | localized project entry plus GitHub facade and two locale-neutral project files |
| `book/` entry files | 21 | 18 | 3 | three entry identities have six files each plus legacy paths |
| `book/chapters/` | 42 | 19 | 23 | 22 chapters plus a chapter index; only 9 chapters have `-EN` sources and only 2 have six-language siblings |
| `book/labs/` | 28 | 14 | 14 | 13 labs plus an index; only 4 labs are in the matrix and only 2 have six-language siblings |
| `docs/` | 111 | 1 | 110 | declared locale-neutral governance/research area; one explicitly suffixed project map exists |
| `skills/` | 8 | 0 | 8 | declared locale-neutral implementation/skill source |
| `examples/` | 5 | 0 | 5 | public examples currently without locale identities |
| `assets/` | 3 | 0 | 3 | asset/readme metadata currently without locale identities |
| `evals/` | 2 | 0 | 2 | evaluation source currently without locale identities |
| `tasks/` | 3 | 0 | 3 | project planning source currently without locale identities |
| `scripts/` | 1 | 0 | 1 | implementation documentation |
| `site/` | 1 | 0 | 1 | implementation/readme documentation |
| **Total** | **234** | **58** | **176** | 57 suffixed files are outside the declared neutral paths; `docs/project-map-EN.md` is under a neutral path |

Evidence: `git ls-files '*.md'`, with path separators normalized to `/`, and the suffix pattern `-(EN|ZH|ES|JA|KO|DE).md`.

The important boundary is classification, not raw file count. The current matrix explicitly treats `AGENTS.md`, `CONTEXT.md`, `docs/`, `evals/`, `scripts/`, `site/`, and `skills/` as locale-neutral (`docs/governance/locale-matrix.yaml:16-23`). That is a defensible implementation boundary, but it is not enough by itself: the public homepage links readers from localized entry pages into `docs/`, `skills/`, `book/labs/`, and `book/chapters/`. Each such destination needs an explicit classification visible to readers.

### 2.2 Locale registration and content matrix

The matrix declares exactly six locales and English as default:

| Suffix | URL token | HTML language | Display name |
|---|---|---|---|
| `EN` | `en` | `en` | English |
| `ZH` | `zh` | `zh-CN` | 简体中文 |
| `ES` | `es` | `es` | Español |
| `JA` | `ja` | `ja` | 日本語 |
| `KO` | `ko` | `ko` | 한국어 |
| `DE` | `de` | `de` | Deutsch |

Evidence: `docs/governance/locale-matrix.yaml:2-23`; generated copy: `site/locale-manifest.js:8-45`.

The matrix has **17 `content_id` records**, and every record declares all six locale objects. Actual file presence is uneven:

| Matrix identity group | Identities | Actual six-file sets | Missing locale files |
|---|---:|---:|---:|
| Project/book entry, preface, table of contents, chapters 1 and 4, labs 7 and 11 | 8 | 8 | 0 |
| Chapters 2, 3, 5, 6, 7, 8, 9; labs 1 and 2 | 9 | 0 | 45 non-English files |
| **Total in matrix** | **17** | **8** | **45 non-English files** |

All 40 existing non-English files in the eight complete sets are marked `translation_status: in-progress`; they are not considered ready by the reader's `ready()` function. Thus “file exists” and “reader will serve it as the selected translation” are currently different facts.

The matrix command passes in migration mode:

```text
LOCALIZATION_OK mode=migration content_ids=17
files=EN:17,ZH:8,ES:8,JA:8,KO:8,DE:8
registered_paths=102
```

This is evidence that the migration matrix is internally parseable. It is not evidence that all reader-facing content has six translated files. Running the same validator with release semantics would be a different gate and is expected to fail until the declared release scope is complete.

### 2.3 Chapter/lab route coverage

`docs/governance/content-status.yaml` contains 22 chapter items and 13 lab items. The generated site manifest bridges 13 of those route items to existing matrix paths and creates **22 additional status-only content records** for the remaining items. The current manifest therefore contains 39 content records, 35 aliases, and 251 indexed paths. That bridge makes the site navigable during migration, but it also means two identity sources still coexist; the 13 path matches do not yet share the same human-readable ID between the two sources.

The unlocalized primary content currently includes:

- 22 unsuffixed chapter sources (`book/chapters/01...22-*.md` without a locale suffix), alongside `-EN` files for chapters 1–9;
- 13 unsuffixed lab sources, alongside `-EN` files for labs 1, 2, 7, and 11;
- unsuffixed book entry paths (`book/README.md`, `book/preface.md`, `book/table-of-contents.md`) and the root `README.md` facade;
- `book/chapters/README.md` and `book/labs/README.md`, which are index files rather than chapter identities.

The exact paths are visible from `git ls-files 'book/chapters/*.md' 'book/labs/*.md'`. The matrix's explicitly registered legacy paths currently cover only the 17 matrix identities (`docs/governance/locale-matrix.yaml`, each `legacy_paths` field); the remaining status items are handled by generated migration entries rather than by matrix entries.

## 3. Naming and language-matrix audit

### 3.1 What is correct

- The six suffixes are uppercase and stable: `EN`, `ZH`, `ES`, `JA`, `KO`, `DE`.
- The suffix is separated from the stem by a hyphen, matching the requested naming rule for localized content.
- Each matrix path is required to end in the matching suffix by `scripts/validate_localization.py:19-22` and its per-locale path checks.
- The root `README.md` exception is explicit: GitHub needs an unsuffixed facade, while `README-EN.md` is the canonical English content identity (`scripts/validate_localization.py:23` and the comment around the root README exception).
- README language switchers are present in all seven root/readme facades checked: each has six targets and preserves the same `project-readme` identity. This is the part of the naming/link contract that is currently strongest.

### 3.2 What is incomplete

- The naming convention is not yet applied to all chapter and lab source files. The reader-facing book has 39 primary unsuffixed paths (root README, three book entries, 22 chapters, and 13 labs), before counting the two section index README files.
- The matrix only covers 17 of the 35 chapter/lab route identities.
- The current status generator synthesizes `-ZH`, `-ES`, `-JA`, `-KO`, and `-DE` paths for missing files. Those paths are useful as planned targets, but they must not be presented as existing translations.
- `skills/`, `examples/`, `assets/`, and `evals/` are not in the six-locale matrix. If they are reader-facing learning material, their English-only status needs to be explicit in the public information architecture. If they are implementation/source material, links to them should be labeled locale-neutral rather than implying a same-language page exists.
- `docs/project-map-EN.md` is an explicit suffix under a directory currently declared neutral. This is not automatically wrong, but it is an ambiguity: either `docs/project-map-EN.md` is a localized reader-facing identity and belongs in a matrix, or it is an English-only neutral document and should be classified as such. The current validator intentionally permits a suffixed file inside a neutral prefix.

### 3.3 Required invariant after migration

For every file classified as localized reader-facing:

```text
file = <stable stem>-<one of EN|ZH|ES|JA|KO|DE>.md
file -> exactly one content_id
content_id -> exactly one path per locale
path suffix == locale record suffix
```

For every file classified as locale-neutral:

```text
file is in an explicit neutral allowlist
file is not silently treated as a translation
localized pages linking to it identify it as locale-neutral or English-only
```

There must be no third, unclassified category.

## 4. Same-language link audit

### 4.1 Current checks and their boundary

The existing checks give three different kinds of evidence:

| Check | Current result | What it proves | What it does not prove |
|---|---|---|---|
| `scripts/check_local_links.py` | `LOCAL_LINKS_OK checked=1633` | relative Markdown targets exist inside the workspace | locale, content identity, canonical path, runtime reader route, or fallback correctness |
| `scripts/validate_localization.py` | `LOCALIZATION_OK ...` | registered matrix paths, README switchers, and migration-mode locale rules parse | unregistered chapters/labs, six-locale navigation, or all public Markdown files |
| `scripts/validate_book_navigation.py` | `BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH` | generated footer blocks match the current EN/legacy-ZH policy | ES/JA/KO/DE navigation or current reader query preservation |
| `scripts/validate_site_i18n.py` | `VALIDATION_OK html_keys=310 translated_keys=310` | required homepage UI keys are structurally covered by the current copy/fallback scheme | that ES/JA/KO/DE UI text is translated; runtime deliberately falls back to English |

The first command is a link-existence check, not a same-language check. The localization validator permits locale-neutral targets and migration-noticed legacy targets; it therefore passes without proving that every localized page points to a localized counterpart.

### 4.2 README switcher result

The seven checked README facades (`README.md` plus six `README-XX.md` files) each contain a complete language switcher with exactly these six targets:

```text
README-EN.md | README-ZH.md | README-ES.md | README-JA.md | README-KO.md | README-DE.md
```

For `book/README-XX.md`, the relative target resolves within `book/`, so the same syntax resolves to the corresponding `book/README-XX.md`. This is correct and is enforced as a same-identity exception in `validate_localization.py`.

This success must not be generalized to every book page. Chapter and lab pages do not have a six-locale language-switcher block, and their body links frequently target locale-neutral documents or unsuffixed migration paths.

### 4.3 Link rules that are still missing

The repository needs a distinction between four target classes:

1. **Same identity, same locale:** allowed in ordinary localized prose.
2. **Same identity, another locale:** allowed only inside a language switcher or an explicitly marked alternate-language control.
3. **Locale-neutral source:** allowed only when the target is in the declared neutral allowlist and the UI makes the English/neutral boundary clear.
4. **Legacy unsuffixed source:** allowed only during migration, with one deterministic identity mapping and an explicit migration marker; forbidden in release content.

The current implementation does not yet enforce this contract across all reader-facing files. In particular, `book-navigation.yaml` still deliberately uses `legacy_path` for the legacy-ZH route, and the status generator can represent unsuffixed source paths as temporary English routes. That is a valid migration mechanism, but it is not a completed same-language graph.

## 5. Legacy unsuffixed paths

### 5.1 Current role

Unsuffixed paths currently serve several different purposes:

- GitHub's default root README facade (`README.md`);
- compatibility paths for previously existing Chinese/book sources;
- pre-migration chapter and lab sources that have not yet acquired a suffixed English source;
- section index files (`book/chapters/README.md`, `book/labs/README.md`).

These roles must not be conflated. A legacy path is an alias/compatibility route; it is not a locale.

The matrix records legacy paths for 17 identities. The generated manifest indexes legacy paths alongside localized paths (`scripts/build_site_locale_manifest.py:38-70`, `:124-155`). For status-only chapters/labs, `status_content()` uses an unsuffixed source as the temporary route and synthesizes future locale paths (`scripts/build_site_locale_manifest.py:75-104`).

### 5.2 Required legacy policy

For each unsuffixed primary content path, record:

```yaml
legacy_path: book/chapters/10-planning-and-slicing.md
content_id: chapter-10-planning-and-slicing
canonical_locale: en
canonical_path: book/chapters/10-planning-and-slicing-EN.md
compatibility: redirect-or-stub
remove_after: <reviewed date or release milestone>
```

The exact compatibility choice can be a redirect, a thin canonical-link stub, or a reader alias. It must be deterministic, preserve anchors where possible, and never maintain two independent full copies. The migration should not delete a legacy path until a link crawl proves that no public page depends on it and the release notes document the change.

## 6. Pages reader audit: `lang`, `path`, and fallback

### 6.1 Current path and locale selection

The reader currently:

1. reads `lang` from the query if it is one of the manifest locale tokens (`site/reader.js:4-10`);
2. normalizes the requested `path` and applies an allowlist (`site/reader.js:325-333`);
3. resolves the requested path through `path_index` and the content identity manifest (`site/reader.js:299-314`);
4. serves the requested locale only if `exists` is true and `translation_status` is `source`, `verified`, or `production-ready` (`site/reader.js:304-305`);
5. otherwise fetches the English record and displays a visible banner (`site/reader.js:333-347`).

This is a sound migration shape: requested locale and effective source can be different, and the reader does not silently pretend a missing translation is complete.

### 6.2 Path preservation gap

`readerHref(path, hash)` returns only:

```text
reader.html?path=<encoded path><hash>
```

It does not include the current `lang` (`site/reader.js:58-60`). The Markdown inline-link and sanitized-HTML paths both call it without a locale (`site/reader.js:97`, `:171`). The homepage's Pages rewrite also generates a `reader.html?path=...` URL without appending `lang` (`site/app.js:226-231`, `:258-260`).

Therefore:

- a direct URL such as `reader.html?path=...&lang=zh` can lose its explicit language after following an internal reader link;
- the next page may use `localStorage` if another part of the site has set it, or default to English otherwise;
- a copied link is not self-contained evidence of the reader's requested language;
- the URL path can remain a legacy or English source path while the fetched source is selected through the manifest, so `path` alone does not identify effective locale.

This is a P1 contract gap for a multilingual reader. The URL should carry the requested locale on every generated internal reader link, while the page state should separately expose `requested_locale`, `effective_locale`, `content_id`, and `fallback_reason`.

### 6.3 HTML language gap

`site/reader.html:2` starts with `<html lang="en">`. Unlike the homepage's `applyLanguage()` (`site/app.js:299-305`), `site/reader.js` never updates `document.documentElement.lang`. The reader's language selector has all six options (`site/reader.html:19-25`), but the document language remains English even when a real `ZH`, `ES`, `JA`, `KO`, or `DE` source is served.

For fallback, the correct accessible behavior must be explicit:

```text
requested_locale = zh
effective_locale = en
html[lang] = en
banner = “Simplified Chinese is not available ... showing English source”
```

If the product chooses to keep the requested locale in `html[lang]` for routing reasons, it must add a separate machine-readable effective-language field; using one attribute for both concepts is not acceptable.

### 6.4 Fallback status

The reader's fallback banner is visible and correctly distinguishes an unavailable page from a ready translation (`site/reader.js:344-347`). The homepage similarly exposes route/content fallback states (`site/app.js:238-263`, `:342-351`). This is good migration behavior.

The remaining gaps are:

- no structured `requested/effective/reason` state in the reader DOM or generated route metadata;
- no explicit `lang` preservation in generated reader links;
- no canonical/alternate policy tied to “ready” versus “fallback” content;
- all non-English matrix content is `in-progress`, so the fallback path is the practical path for every non-English identity at present;
- ES/JA/KO/DE use English UI copy because `site/app.js:195` defines `uiLocales` as only `en` and `zh`, and `:205-207` selects English copy for the other route tokens.

## 7. Official architecture comparison

The following are official primary sources accessed on **2026-08-11**. The comparison is about structure and behavior, not a request to copy their code or assets.

| System | Official behavior relevant here | Implication for this repository |
|---|---|---|
| Docusaurus | Declares `defaultLocale` and alternative `locales`; translated Markdown is placed at locale-specific filesystem locations; the default locale can omit its base-URL name while other locales use a locale base URL. It explicitly does not provide opinionated automatic locale detection. | Preserve an explicit locale in the URL. Do not rely on local storage as the canonical language state. A manifest-backed suffix store can work, but route identity and locale must be first-class. |
| Starlight | Configures `defaultLocale` and `locales`; creates one content directory per language; the same filename associates pages across languages; supports fallback content and translation notices; supports a root locale. | The stable identity should be the shared stem/content ID, not the translated title. The current visible fallback banner is directionally correct; it needs complete route and metadata coverage. |
| VitePress | Uses a root document plus locale directories such as `docs/es/foo.md` and `docs/fr/foo.md`; per-locale config supplies label and HTML `lang`; locale links can point to a corresponding route. | A single canonical navigation graph can resolve each content ID to a locale route. The current suffix strategy is acceptable as storage, but it must provide the same identity guarantees as locale directories. |
| MkDocs core | `theme.locale` localizes theme language; search has a language list, but core configuration is not a complete translated-content router. | Do not claim full content i18n from a theme/UI locale setting. Content identity and alternate routes still need an explicit layer. |
| Material for MkDocs | Provides site language configuration and an `extra.alternate` language selector whose entries have a name, absolute link, and ISO language code; alternate links are used for language/hreflang behavior. | A language switcher must point to the equivalent page, not merely to a language homepage. It should be generated from content identity and expose stable alternate URLs. |

### 7.1 Recommended architecture

Keep the current suffix-named files for the migration. Do not rename them as part of this audit. Adopt the following logical model:

```text
content_id
  ├── en -> <stem>-EN.md
  ├── zh -> <stem>-ZH.md
  ├── es -> <stem>-ES.md
  ├── ja -> <stem>-JA.md
  ├── ko -> <stem>-KO.md
  └── de -> <stem>-DE.md
```

At build time, map that identity to locale-aware reader routes. The storage convention may remain suffix-based; the public route should be self-describing and stable. A future framework migration may choose locale directories, but changing frameworks is not required to close the current correctness gaps.

## 8. Realistic migration order

### Phase 0 — Freeze the contract

Record one authoritative locale contract:

- six suffixes and URL tokens;
- English default and whether English uses a root route;
- `content_id`, stem, and route identity rules;
- the definition of “ready”;
- requested/effective locale behavior for fallback;
- the legacy path compatibility policy;
- the neutral-path allowlist and public labeling rule.

Acceptance evidence: one matrix schema, one route identity map, no undocumented locale behavior in runtime code.

### Phase 1 — Close classification and identity gaps

Add every chapter and lab route item to the same identity map used by the matrix, without moving files yet. For every public Markdown file, choose exactly one class:

- localized reader-facing content;
- locale-neutral English/source content;
- internal maintenance content.

Do not create six copies of internal governance, scripts, or generated metadata merely to satisfy a count. If `skills/`, examples, or research notes are intended as reader-facing lessons, promote them into explicit content identities; otherwise label them as English/neutral sources wherever localized pages link to them.

Acceptance evidence: zero unclassified public Markdown files; matrix and status route IDs have one-to-one identity mapping; duplicate path and duplicate stem checks pass.

### Phase 2 — Finish the English source surface

Create the canonical `-EN` source for every chapter and lab that is currently only an unsuffixed source, preserving the old path as an alias/stub until the crawl proves it is safe to retire. This is the correct first content wave because English is the default and the source for translations.

Acceptance evidence: 22 chapter and 13 lab English entries exist with matching `content_id`, EN TOC/navigation, source revision, and content status. No link points to an unsuffixed primary source without a recorded migration reason.

### Phase 3 — Make reader routing self-contained

Before translating the rest, fix the route contract conceptually and then verify it:

- every internal reader link carries the requested `lang`;
- `path` resolves to one identity, while selected source path is separately exposed;
- reader sets `html[lang]` to effective language;
- fallback records requested locale, effective locale, and reason;
- refresh/copy/paste behavior does not depend on `localStorage`;
- hash fragments and relevant query state survive navigation.

Acceptance evidence: a fresh browser context can follow Home → Chapter 1 → Next → Chapter 2 in each locale request without changing requested locale unexpectedly.

### Phase 4 — Translate in controlled waves

Use the existing complete slices as terminology pilots. Finish ZH first if Chinese is the immediate maintenance language, then ES/JA/KO/DE in separately reviewable batches. Every batch must update source revision, coverage, translator/reviewer, review date, and fallback status. A file's existence is not enough to change `translation_status` to `verified`.

Acceptance evidence per locale: entry page, preface, TOC, first chapter, one middle chapter, one final chapter, one lab, UI strings, fallback/404, and link crawl reviewed by a language-capable reviewer.

### Phase 5 — Generate all navigation from content identity

Replace the EN/legacy-ZH special case in the logical contract with one ordered list of chapter IDs and one ordered list of lab IDs. For each locale, resolve previous/next, TOC, sidebar, learning path, and language switcher from that list. Missing translations must be labeled fallback or unavailable; they must not silently become a bare English link.

Acceptance evidence: first, middle, and final chapter boundaries pass for all six locales; every navigation target has the same content identity as the source page.

### Phase 6 — Six-locale runtime crawl and release gate

Build the Pages artifact and crawl it from clean browser contexts. Record for each sample:

```text
requested_locale
effective_locale
content_id
source_path
html_lang
fallback_reason
same_locale_link_violations
missing_targets
```

Only after the public scope passes should the matrix move from `migration` to `release`. A passing build or manifest generation alone is not a release claim.

## 9. Automatic verification rules

These are proposed rules for the existing validation layer. This audit does not implement them.

### Rule A — File and suffix integrity

For every localized reader-facing file:

- basename ends exactly in `-EN.md`, `-ZH.md`, `-ES.md`, `-JA.md`, `-KO.md`, or `-DE.md`;
- suffix matches the matrix locale;
- path maps to exactly one `content_id`;
- each `content_id` has exactly one path per declared locale;
- no localized file exists outside the matrix unless the validator reports it as an intentional new identity;
- UTF-8 and non-empty checks pass.

The root `README.md` and other legacy paths are allowed only through an explicit alias exception.

### Rule B — Matrix completeness

For every localized `content_id`, require six records even in migration mode. Each record must include:

```text
path, exists, content_status, translation_status, source_revision
```

For `release`, all public records must exist and have a reviewed ready status. For `migration`, missing records must have a reason, a fallback target, and a visible unavailable/fallback state.

### Rule C — Same-language Markdown links

Parse Markdown links and HTML `href`/`src` targets in all localized reader-facing files:

- localized-to-localized ordinary links must have the same locale and preserve content identity;
- cross-locale links are allowed only inside an explicit language-switcher block;
- neutral targets must match the neutral allowlist and be labeled English/neutral where reader-visible;
- legacy targets must map to exactly one identity and carry a migration marker;
- release mode rejects ordinary links to unsuffixed primary content;
- missing targets, directory-only targets, and asset targets must be classified rather than treated as Markdown success.

### Rule D — Language switcher equivalence

Every localized page with a language switcher must expose exactly six locale choices. Each target must:

- resolve to the same `content_id`;
- select the requested locale or an explicit fallback;
- preserve the page anchor when it exists;
- preserve or deterministically regenerate query state;
- never point to a different chapter merely because the translated title or slug differs.

### Rule E — Legacy path safety

Every unsuffixed primary path must have one identity, one canonical locale/path, and one compatibility behavior. Reject:

- two identities claiming the same legacy path;
- legacy-to-legacy cycles;
- a full duplicate body that can drift from the canonical file;
- a release link that bypasses the canonical localized path.

### Rule F — Reader URL and DOM contract

For every reader navigation event, assert:

```text
URL lang == requested_locale
URL path -> content_id
source path -> effective_locale
html[lang] == effective_locale.html_lang
fallback banner visible iff requested_locale != effective_locale
```

Also assert that links created by Markdown parsing, chapter footer generation, homepage localization, language switching, and the source-file link all retain the same contract.

### Rule G — Navigation identity

For every locale and every ordered chapter:

- first chapter has only next;
- middle chapters have previous and next;
- final chapter has only previous;
- previous/next targets resolve to adjacent content IDs;
- unavailable translations are represented as fallback/unavailable records, not silent cross-locale links.

### Rule H — Runtime crawl

Run a clean-context crawl for all six locale tokens. At minimum sample root, README, preface, TOC, chapters 1/11/22, labs 1/7/13, a neutral source, a legacy path, and an invalid locale. Store the observed URL, HTTP result, `html.lang`, content ID, effective source, and console errors. Do not infer runtime correctness from static validator output.

## 10. Suggested migration/release status table

| Gate | Allowed state | Required evidence |
|---|---|---|
| `migration` | missing translations and legacy paths allowed | every gap is in the matrix, has a reason, and has a visible fallback/alias behavior |
| `candidate` | English route usable; selected translation slices usable | clean-browser route checks, link checks, source/review records, and known-gap report |
| `verified` | declared public scope works per locale | six-locale identity/link/navigation crawl plus language review for that scope |
| `release` | no undeclared fallback in public scope | all release identities have ready files, same-language links, route metadata, canonical/alternate policy, and browser evidence |

The current repository is **migration/candidate**, not release: the existing outputs support that statement, but do not prove more.

## 11. Sources and license boundary

The following official documentation was accessed on **2026-08-11**:

1. [Docusaurus — i18n introduction](https://docusaurus.io/docs/i18n/introduction) — goals, translation workflow, Markdown translation boundary, and the explicit non-goal of automatic locale detection.
2. [Docusaurus — i18n tutorial](https://docusaurus.io/docs/i18n/tutorial) — `defaultLocale`, `locales`, locale-specific configuration, HTML language, locale paths, and locale dropdown setup.
3. [Starlight — Internationalization (i18n)](https://starlight.astro.build/guides/i18n/) — locale directories, same-filename page association, root locale, fallback content, and translation notices.
4. [VitePress — Internationalization](https://vitepress.dev/guide/i18n) — root/locale directory structure, per-locale `lang`, labels, and translation links.
5. [MkDocs — Configuration](https://www.mkdocs.org/user-guide/configuration/) — theme locale and search-language configuration; used here to distinguish theme localization from a full content router.
6. [Material for MkDocs — Changing the language](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/) — site language, language selector, alternate entries, absolute links, and language metadata.

Only architecture facts, configuration concepts, and URLs are recorded here. No external prose, code, images, fonts, or repository assets were copied. This report does not change the project's asset license boundary; any future reused asset must still be recorded in `docs/sources/asset-register.md`.

## 12. Audit completion boundary

- [x] Audited suffix naming and the six-locale registration.
- [x] Counted current tracked Markdown and identified the localized/neutral boundary.
- [x] Compared matrix identities with 22 chapter and 13 lab route items.
- [x] Audited README switchers and documented the broader same-language-link gap.
- [x] Audited unsuffixed legacy paths and the two current identity sources.
- [x] Audited Pages reader `lang`, `path`, internal-link preservation, and fallback logic.
- [x] Compared Docusaurus, Starlight, VitePress, MkDocs, and Material for MkDocs using official sources.
- [x] Proposed a realistic no-big-bang migration order and automatic verification rules.
- [x] Kept this round to one new file; no existing file was moved, renamed, or edited.
- [ ] Six-language content, six-language navigation, reader URL preservation, and language-quality review remain open implementation work.
