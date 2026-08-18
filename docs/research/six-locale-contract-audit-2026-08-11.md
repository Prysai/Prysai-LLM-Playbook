# Six-locale contract audit

**Date:** 2026-08-11  
**Scope:** repository state in the working tree
**Method:** read-only inspection of the locale matrix, generated manifest, build and validation scripts, Markdown filenames and links, README entry points, and the static reader/site code.  
**Change policy:** this audit does not modify product files. The audit itself is the only file added for this request.

## Executive verdict

The repository has a coherent **English-first migration contract**, but it does
not yet satisfy the final six-locale contract.

What is already true:

- English is the declared default in the matrix, generated manifest, public
  site, and reader fallback.
- The six locale IDs and suffixes are explicitly registered: `EN`, `ZH`, `ES`,
  `JA`, `KO`, and `DE`.
- Existing localized files that are represented as localized files use the
  required uppercase suffix.
- README language switchers expose the six registered locales. Cross-locale
  links inside the marked switcher block are intentional and valid exceptions.
- The home page stores a selected language in `localStorage`, carries it in
  `?lang=`, and rewrites many content links by content identity.

What is not yet true:

- The six locales do not have six physical versions of the claimed book and
  lab corpus.
- The public routed corpus is larger than the canonical locale matrix. The
  generated manifest synthesizes nine lab identities from `content-status.yaml`
  even though they are not in `locale-matrix.yaml`.
- Many public reader sources and links still use unsuffixed legacy paths. Some
  are explicitly labelled as migration paths, but that is not the final
  same-locale link contract.
- The chapter navigation generator validates and generates only `EN` and
  `ZH`; `ES`, `JA`, `KO`, and `DE` do not have generated six-locale chapter
  navigation.
- Choosing a language in the reader does not write the choice to
  `localStorage`, and the reader's “Back to overview” link drops `?lang=`.
  A reader-selected language can therefore disappear when the user returns to
  the home page.
- The runtime UI dictionaries contain only English and Simplified Chinese;
  the other four options are route tokens with English UI fallback, not four
  fully localized interfaces.

The current migration state is honestly visible in several places, so this is
not a claim that the project is silently pretending to be complete. It is,
however, a release-blocking gap if “six locale versions” means six actual,
same-language, navigable versions of every public reader artifact.

## Contract-by-contract result

| Contract | Result | Evidence |
|---|---|---|
| Default language is English | **Pass, with a compatibility exception** | `docs/governance/locale-matrix.yaml:4`; `site/locale-manifest.js:9`; `site/index.html:2`; `site/reader.js:577-580`; `README.md:1` |
| Every localized filename has `-LOCALE` | **Partial** | Matrix paths are suffixed, but unsuffixed legacy chapter/lab sources remain; routed lab records also point to unsuffixed files. |
| Locale links stay in the current locale | **Partial in migration; fail for final release** | README switcher links are valid exceptions; migration fallbacks and several same-locale links still point to legacy unsuffixed files. |
| Six locale versions where claimed | **Fail** | Matrix has 30 identities: `EN` exists for 30/30, each non-English locale exists for 8/30. The release validator fails. |
| Language choice persists across routes | **Partial** | Home page persists URL plus storage; reader preserves query on reader-to-reader links but does not persist a reader selection and drops it on the static back link. |
| Six-language public UI | **Fail / explicitly incomplete** | `site/app.js:247-260` defines UI locales as only `en` and `zh`; `site/reader.js:33-44` has reader copy only for `en` and `zh`. |

## Findings and prioritized fixes

### P0 — Do not treat migration mode as six-locale release readiness

**Evidence**

- `docs/governance/locale-matrix.yaml:3-14` declares `mode: migration`,
  `default_locale: EN`, and six locale records.
- The matrix contains 30 content identities. Direct file inspection found:
  `EN: 30`, `ZH: 8`, `ES: 8`, `JA: 8`, `KO: 8`, and `DE: 8` existing matrix
  paths.
- `scripts/validate_localization.py:163-170` allows missing files and
  `in-progress` translations in migration mode, but rejects them in release
  mode.
- `scripts/validate_localization.py --release` failed with missing files and
  non-release-ready `in-progress` entries across the non-English matrix
  records.

**Impact**

The green migration check proves that the six-locale *mapping* is explicit; it
does not prove six-locale *coverage*. A release or README badge must not use the
mapping as evidence that all six versions exist.

**Fix priority**

Keep the public status as migration/candidate until the release gate passes,
or complete and independently review all six variants before switching the
matrix to release-ready state. Add the release invocation to CI so this cannot
be mistaken for a complete locale rollout.

### P1 — Complete the physical six-locale corpus or narrow the claim

**Evidence**

- `docs/governance/locale-matrix.yaml:25-506` declares six paths for each of
  the 30 matrix identities.
- Only these non-English reader-facing groups currently exist: root README,
  `book/README`, `book/preface`, `book/table-of-contents`, chapter 1, chapter
  4, lab 7, and lab 11. The other matrix rows have missing `-ZH`, `-ES`,
  `-JA`, `-KO`, and `-DE` files.
- All 22 English chapter sources exist as suffixed files:
  `book/chapters/01-gpt-and-codex-EN.md` through
  `book/chapters/22-continuous-update-and-future-proofing-EN.md`.
- The non-English chapter files currently present are only:
  `book/chapters/01-gpt-and-codex-ZH.md`, `-ES.md`, `-JA.md`, `-KO.md`,
  `-DE.md`, and the equivalent five files for
  `book/chapters/04-context-permissions-and-agent`.
- The only non-English lab groups currently present are
  `book/labs/lab-007-action-boundaries-{ZH,ES,JA,KO,DE}.md` and
  `book/labs/lab-011-gpt-codex-boundaries-{ZH,ES,JA,KO,DE}.md`.

**Impact**

Selecting `ES`, `JA`, `KO`, or `DE` can select a route token while the reader
shows English or an unsuffixed source. That is an explicitly disclosed
migration fallback, not a translated page.

**Fix priority**

Choose one of two honest release policies and encode it in the UI:

1. create and review the missing `-ZH`, `-ES`, `-JA`, `-KO`, and `-DE` files for
   every public chapter, lab, README, preface, and contents identity; or
2. stop presenting the incomplete items as six available versions and show a
   same-locale “translation pending” page with a separately labelled English
   source action.

### P1 — Reconcile the canonical matrix with the routed corpus

**Evidence**

- `docs/governance/locale-matrix.yaml` contains 30 identities: four project/book
  entries, 22 chapters, and four lab identities.
- `docs/governance/content-status.yaml` declares 22 chapters and 13 labs. The
  additional labs include `lab-003`, `lab-004`, `lab-005`, `lab-006`, `lab-008`,
  `lab-009`, `lab-010`, `lab-012`, and `lab-013`, whose status paths are
  unsuffixed, for example `book/labs/lab-003-evidence-review.md` and
  `book/labs/lab-013-l3-vertical-slice.md`.
- `scripts/build_site_locale_manifest.py:177-186` creates new manifest content
  identities from status entries when a path is not already in the matrix.
- The generated `site/locale-manifest.js` contains 39 content identities and
  reports `routed_status_counts: {"chapters": 22, "labs": 13}`; the matrix
  itself contains 30 identities.
- `scripts/validate_localization.py --release` additionally reported these
  localized files as missing from the matrix:

  - `book/labs/lab-014-resume-reconciliation-EN.md`
  - `book/labs/lab-015-evidence-delivery-EN.md`
  - `book/labs/lab-016-side-effect-boundary-EN.md`
  - `book/labs/lab-017-skill-discovery-audit-EN.md`

**Impact**

There are two identity systems: the matrix intended to own locale identity and
the status file used to grow the runtime manifest. A file can therefore be
reachable in the reader without having six locale records, a canonical suffix
contract, or a locale review state.

**Fix priority**

Make every public routed chapter and lab a matrix row before exposing it from
the reader. Either register labs 003–017 with six explicit records or keep
them out of the public routed corpus until registered. Remove the builder's
implicit identity creation after the migration is reconciled, and regenerate
the manifest from one canonical identity source.

### P1 — Generate chapter navigation for all six locales

**Evidence**

- `docs/governance/book-navigation.yaml:8-17` declares `default_locale: EN`,
  `legacy_locale: ZH`, and a policy that only names English and the legacy
  unsuffixed path.
- The same file says English navigation uses an English source or a legacy
  current source, and legacy navigation uses the unsuffixed source.
- `scripts/validate_book_navigation.py` passed as
  `BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH`, not six locales.
- `site/reader.js:123-134` can resolve the current manifest locale when a
  ready record exists, but its fallback chain is requested locale → English →
  legacy path. This cannot create missing locale navigation by itself.

**Impact**

The previous/next footer is structurally complete for the current EN/ZH
migration bridge, but it is not a six-locale generated navigation contract.
For a missing translation, “next” can become English or an unsuffixed source;
the selected locale is not the content locale.

**Fix priority**

Generate previous/next links from `content_id + requested locale` for all six
locales. When the target is unavailable, render an explicit pending state and
an English source action rather than silently making the next chapter look
localized. Extend the navigation validator to require `EN,ZH,ES,JA,KO,DE` once
the release contract is intended.

### P1 — Persist a language selected inside the reader

**Evidence**

- `site/app.js:248-256` reads `?lang=` first and then
  `localStorage['codex-field-guide-language']`.
- `site/app.js:410-414` updates the URL and writes the home-page selection to
  `localStorage`.
- `site/reader.js:577-580` reads the URL or the same storage key, and
  `site/reader.js:628-634` carries the reader selection in the next reader URL.
- `site/reader.js` has no corresponding `localStorage.setItem` when the reader
  language select changes.
- `site/reader.html:17-24` uses a fixed `href="index.html"` for “Back to
  overview”, without a locale parameter.

**Impact**

Reader → next/previous preserves the locale in the query string. Reader →
overview does not reliably preserve a language selected in the reader. If the
user did not previously select that language on the home page, the home page
can return to its stored value or English.

**Fix priority**

Write the reader selection to the shared storage key and generate the overview
link with the current `?lang=` value. Add a browser test for:

`home → choose ES → chapter → next → previous → overview → another chapter`.

The test should assert both requested locale and effective locale, because a
persisted `ES` request that displays English is a fallback state, not a pass
for translated content.

### P1 — Separate six route tokens from six localized UI dictionaries

**Evidence**

- `site/app.js:240-247` requires six manifest tokens but defines
  `const uiLocales = new Set(['en', 'zh'])`.
- `site/app.js:259-260` selects UI copy only from English or Chinese.
- `site/reader.js:33-44` defines reader copy only for `en` and `zh`.
- `scripts/validate_site_i18n.py:145-153` compares only the English and
  Chinese dictionaries. Its passing result (`html_keys=317 translated_keys=317`)
  does not validate Spanish, Japanese, Korean, or German UI copy.

**Impact**

The six choices are useful route controls, but four are not full interface
locales. A user selecting one of those languages receives an English chrome
and an English fallback for missing content.

**Fix priority**

Either add and validate all six UI dictionaries, including reader chrome and
accessibility labels, or label the four route options as “content route;
interface currently English” and keep that limitation in the public status.
The validator should check the same six locale keys that the menu exposes.

### P2 — Remove or explicitly retire unsuffixed public reader sources

**Evidence**

- `book/chapters/` contains 22 unsuffixed chapter sources, including
  `book/chapters/02-first-safe-task.md` and
  `book/chapters/22-continuous-update-and-future-proofing.md`.
- `book/labs/` contains 13 unsuffixed lab sources, including
  `book/labs/lab-003-evidence-review.md` and
  `book/labs/lab-013-l3-vertical-slice.md`.
- `book/preface.md` and `book/table-of-contents.md` remain unsuffixed content
  paths. `book/README.md` is explicitly documented as a compatibility entry
  point, while `README.md` is an explicit GitHub-default compatibility facade.
- `docs/adr/0010-locale-suffixed-content.md:42-48` requires the English source
  itself to use `-EN`; its migration section permits legacy paths only during
  the compatibility window.

**Impact**

GitHub search, direct links, and local tools can still open a file whose
language is not visible in the filename. The two documented compatibility
exceptions are narrow, but the chapter/lab legacy set is large enough to
remain a second public content surface.

**Fix priority**

Rename or convert the public chapter/lab/preface/contents paths to explicit
locale files, then keep short redirect/stub compatibility files only where
external bookmarks require them. Mark any remaining neutral index pages in
the matrix instead of leaving their language implicit.

### P2 — Repair same-locale links where a same-locale file already exists

**Evidence**

The migration checker accepts labelled legacy links, so the ordinary check can
pass while the final same-locale rule is still unmet. Concrete links found in
the current worktree include:

- `README-EN.md:48` → `book/chapters/21-team-capability-system.md`, although
  `book/chapters/21-team-capability-system-EN.md` exists.
- `README-EN.md:155` → `book/chapters/11-designing-a-skill.md`, although
  `book/chapters/11-designing-a-skill-EN.md` exists.
- `README-EN.md:156` → `book/chapters/19-evaluate-models-and-workflows.md`,
  although `book/chapters/19-evaluate-models-and-workflows-EN.md` exists.
- `docs/project-map-EN.md:36` → `book/README.md`, although
  `book/README-EN.md` exists.
- `book/table-of-contents-ZH.md:46-224` and the corresponding ES/JA/KO/DE
  contents paths link to unsuffixed chapter/lab paths because the requested
  variants are missing. These are honest migration fallbacks, but they remain
  final-contract failures until same-locale variants or explicit pending pages
  exist.

Links to `docs/`, `scripts/`, `skills/`, and other paths explicitly listed in
`docs/governance/locale-matrix.yaml:16-23` are locale-neutral implementation or
governance links and should not be mechanically translated.

**Fix priority**

Make the link generator resolve every matrix-backed target by content identity
and locale. Add a strict link check that fails when a same-locale variant
exists but the source links to its legacy path. Keep language-switcher links as
the only intentional cross-locale exception.

## README and entry-point audit

### Correct or acceptable

- `README.md:1-18` is a clearly marked English GitHub compatibility facade and
  points to the suffixed canonical `README-EN.md`.
- `README-EN.md:12-14` exposes all six registered locale targets. The
  cross-locale links there are inside the marked language-switcher block, which
  is the contractually permitted exception.
- `book/README.md:1-10` declares itself a language-neutral compatibility entry
  point and exposes the six suffixed book guides.
- `site/index.html:2` defaults the public showcase document to `lang="en"`.

### Gaps

- `docs/project-map-EN.md:36-39` presents a group of unsuffixed landing pages;
  this is acceptable for neutral directory indexes except for the
  content-bearing `book/README.md` link, which should point to
  `book/README-EN.md` for the English map.
- `book/chapters/README.md`, `book/labs/README.md`, and several directory
  README files are not represented as locale identities. If they are public
  reader entry points, they need either explicit neutral classification or the
  same six-locale naming/translation treatment.
- `README.md` and `README-EN.md` are intentionally not byte-for-byte copies.
  The repository documents this as facade versus detailed source, but release
  checks should continue to verify that their language links, status, and
  core route facts remain aligned.

## Verification performed

The following read-only checks were run against the current worktree:

```text
LOCALIZATION_OK mode=migration content_ids=30 files=EN:30,ZH:8,ES:8,JA:8,KO:8,DE:8 registered_paths=180
VALIDATION_OK html_keys=317 translated_keys=317
LOCAL_LINKS_OK checked=1741
SITE_LOCALE_MANIFEST_OK locales=6
BOOK_NAVIGATION_OK files=44
BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH
```

The stricter check was also run:

```text
scripts/validate_localization.py --release  # FAILED
```

Its failures include missing non-English matrix files, `in-progress`
translations, and four English lab files not registered in the matrix. The
failure is the expected evidence that the repository is still in migration,
not evidence that the migration check is broken.

## Recommended release acceptance checklist

Before claiming six-locale completion, require all of the following:

- [ ] `docs/governance/locale-matrix.yaml` contains every public chapter, lab,
      README, preface, and contents identity exactly once.
- [ ] Every public localized file ends in exactly one of `-EN`, `-ZH`, `-ES`,
      `-JA`, `-KO`, or `-DE`; remaining unsuffixed paths are explicit neutral
      indexes or compatibility stubs.
- [ ] Every matrix row has six existing, reviewed locale files, or the runtime
      renders a same-locale pending page instead of a silent fallback.
- [ ] `scripts/validate_localization.py --release` passes.
- [ ] Chapter navigation validates all six locales and preserves content
      identity, locale, and hash across previous/next links.
- [ ] The site and reader have six validated UI dictionaries, or their public
      status explicitly says that four route tokens still use English UI.
- [ ] A browser regression proves home → language selection → reader → next /
      previous → home → another reader route without losing the requested
      locale.
- [ ] A strict link audit passes for same-locale matrix targets, while allowing
      only the marked language switcher to cross locales.
- [ ] Generated `site/locale-manifest.js` and navigation artifacts are rebuilt
      from the reconciled canonical sources and checked for staleness.

## Bottom line

The project is structurally well on its way: the identity model, English
default, explicit suffix convention, migration notices, and URL/storage design
are real. The current evidence supports the statement **“six locales are
registered and being migrated”**. It does not support **“the project provides
six complete localized versions with same-locale navigation and persistent
language choice across every route.”** The P0/P1 items above should be closed
before that stronger statement is used in the README, Pages status, or release
metadata.
