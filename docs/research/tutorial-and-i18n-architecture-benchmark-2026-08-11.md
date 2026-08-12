# Tutorial and i18n architecture benchmark

**Research date:** 2026-08-11 (America/Los_Angeles)
**Repository in scope:** `C:\Users\Administrator\Documents\ChatGPT\My Github`
**Status:** candidate / reference-only
**Question:** What information-architecture patterns from public tutorial and documentation projects are useful for this repository's file structure, table of contents, previous/next navigation, locale switching, search, and GitHub Pages publication?

## Boundary and method

This is an independent architecture study. It records observable repository
and documentation-system behavior, then derives recommendations for this
repository. It does not reproduce external prose, templates, code, CSS,
images, logos, fonts, or branded UI. External examples are treated as
reference material for structure and configuration concepts only.

The comparison is deliberately narrow:

- WorkBuddyGuide: a comparable public tutorial repository and its deployed
  documentation surface.
- VitePress: the framework used by WorkBuddyGuide and a direct reference for
  sidebar, locale routing, search, and Pages deployment.
- Docusaurus: a documentation framework with explicit sidebar, versioning,
  i18n, search, and GitHub Pages guidance.
- mdBook: a book-oriented static documentation system with a canonical
  `SUMMARY.md`, built-in search, and static hosting guidance.
- The local repository: its current source tree, governance contracts,
  generated navigation, reader shell, and Pages workflow.

The result is a design benchmark, not a recommendation to migrate frameworks.

## Executive finding

The local repository already has the strongest architectural seam needed for
its current scale: authored governance data is separated from generated
reader data, and the public reader is separate from the Markdown source. The
most useful benchmark result is therefore selective adoption:

1. Keep one canonical ordered chapter source and make every reading surface
   consume it.
2. Keep stable content identity separate from locale-specific file paths and
   translation status.
3. Treat the table of contents, learning paths, current-page outline, and
   previous/next pagination as different reader jobs.
4. Add search as a generated index over the same canonical content identity,
   with locale and availability metadata; do not make search a second content
   catalog.
5. Keep GitHub Pages publication artifact-bounded and verify the deployed URL
   separately from a successful build.

VitePress and Docusaurus demonstrate mature navigation and search surfaces.
mdBook demonstrates the cleanest book-order contract. WorkBuddyGuide
demonstrates a practical dual-entry tutorial: sequential reading plus
problem/case entry points. None of these patterns justify replacing the local
contracts before the content and translation model stabilizes.

## Local architecture baseline

### Source and presentation layers

The local directory map assigns distinct jobs:

| Area | Current role | Information-architecture implication |
| --- | --- | --- |
| `book/` | Reader-facing chapters, table of contents, preface, and labs | Content source and GitHub-readable reading surface |
| `docs/` | Research, governance, quality, sources, and decisions | Control plane; not a second reader book |
| `site/` | Dependency-free showcase and reader shell | Presentation layer consuming generated data |
| `scripts/` | Validators and generators | Reproducible projections, not authored content |
| `.github/workflows/` | Quality and Pages automation | Release and verification boundary |

The authoritative local contracts currently relevant to this study are:

- `docs/governance/book-navigation.yaml` for ordered chapter identity,
  part membership, titles, paths, and migration state.
- `docs/governance/locale-matrix.yaml` for locale identity, suffixes, URL
  tokens, HTML language values, and translation state.
- `docs/governance/content-status.yaml` for reader-facing content status.
- `site/content-catalog.json` for the site's reader labels and content catalog.
- `site/locale-manifest.js` as generated content identity, route, locale, and
  availability data.
- `site/learning-path-data.js` as generated learning-path data.

This is a useful four-way separation: ordered reading, translation identity,
content status, and presentation labels answer different questions. A future
framework adapter should consume these sources rather than create a parallel
sidebar or locale database.

### Navigation and pagination

The local generator writes marked previous/next blocks into the Markdown
chapter sources. The reader shell projects the same ordered chapter array into
its sidebar and adjacent-chapter controls. The first chapter has only a next
link, the last only a previous link, and middle chapters have both. The table
of contents remains a route/index surface rather than another footer control.

This makes the local model closer to mdBook's explicit order contract than to
a raw filesystem listing, while retaining the GitHub-readable Markdown
surface that framework-generated sites often hide behind their build output.

### Locale switching

The local site exposes six URL tokens (`en`, `zh`, `es`, `ja`, `ko`, `de`). An
explicit `?lang=` value is shareable state; local storage is only a convenience
when the URL has no explicit language. Ordinary content links preserve the
selected locale where a source exists. Missing translations resolve to an
available source with visible pending/fallback status. The locale manifest
uses content identity to avoid treating `-EN.md` and `-ZH.md` as different
learning objects.

This is a migration-aware model rather than a claim of six fully translated
interfaces. The current site copy is reviewed for English and Simplified
Chinese; other route tokens have explicit UI fallback as recorded by the
repository's own site documentation and locale matrix.

### Search and GitHub Pages

The current static site contains a reader catalog and route manifest, but its
information architecture does not yet establish a dedicated full-text search
index comparable to the built-in or hosted search systems in the benchmarks.
That distinction matters: a catalog can power labels and links without
providing heading-level, body-text, locale-aware search.

The local Pages workflow builds a bounded artifact from selected directories,
adds a root entry with a relative `site/` base, rejects known work directories
and sensitive filenames, uploads the artifact, and deploys it through the
GitHub Pages Actions path. The repository's ADR correctly leaves “workflow
ran” distinct from “Pages is enabled and the public URL is reachable.”

## Comparable architecture observations

### WorkBuddyGuide

#### File structure and entry points

At the fixed public commit `abd61e82188fc57ef542756312e06175fc70b8b0`, the
repository separates the VitePress source under `docs/bluebook/`, community
cases under `docs/cases/submissions/`, site configuration under
`docs/.vitepress/`, and deployment/runtime material elsewhere. Chapter-like
content is organized by part directories; case submissions have their own
directory and `index.md` entry.

The deployed surface has multiple reader jobs: a sequential “start reading”
path, a case collection, problem-oriented help, and a reading guide. This is
the most relevant pattern for a practical tutorial: a book spine can coexist
with direct task entry points without duplicating the book's chapters.

#### Sidebar, table of contents, and pagination

The public VitePress configuration supplies a global navigation bar, a path-
scoped sidebar, a current-page outline, and localized previous/next footer
labels. The sidebar source groups chapters by part and can build case entries
from case metadata. The resulting architecture has both a macro table of
contents (parts and chapters) and a micro outline (headings on the current
page).

The transferable principle is “spine plus routes”: the sequential book order
is stable, while task/case entry points link back into that spine. The case
directory convention also gives each case a stable URL boundary and a place
for local assets.

#### Search and publication

The configuration uses VitePress local search and a GitHub edit link. The
official deployment guidance uses a build output directory, a Pages base path
for project sites, the Pages artifact upload action, and a separate deployment
job. WorkBuddyGuide itself should not be treated as evidence of a particular
hosting backend beyond the public repository and site configuration observed
at the fixed commit; the benchmark uses its public structure and configuration
as evidence, not hidden operational assumptions.

#### Reusable lesson

Keep “case” as an adjacent content type with its own lifecycle and metadata,
but do not let cases become a second ungoverned chapter order. Cases should
link to chapters, labs, or evidence records by stable identity.

### VitePress

#### File structure and sidebar

VitePress maps Markdown files to routes and supports a sidebar configured as a
single array or as path-scoped sidebars. Sidebar groups can be nested and
collapsible, and a group can carry a base path to avoid repeating prefixes.
The default theme also supports a current-page outline and configurable
previous/next footer labels.

This is a good presentation adapter for the local repository, but its sidebar
configuration is not automatically the same thing as the editorial source of
truth. The local `book-navigation.yaml` should remain authoritative, with a
VitePress sidebar generated or adapted from it if VitePress is adopted later.

#### Locale model

The official i18n guide supports a root locale plus locale directories such as
`docs/es/` and `docs/fr/`, locale-specific configuration, and optional locale
links. The default theme's i18n routing can map the current route to a target
locale while preserving the page-relative path and hash, or it can be
customized. A separate-directory-per-locale layout requires hosting/server
behavior if the root should redirect based on language.

The useful rule is to preserve page identity across locale links and to make
the URL strategy explicit. The local content manifest already provides the
missing piece that a simple directory convention does not: whether the target
locale file exists and what fallback status it has.

#### Search

VitePress documents local search as a built-in provider and Algolia as a
hosted provider. Its theme configuration supports locale-specific Algolia
options. The local provider is attractive for a dependency-light static site;
the hosted provider is more suitable once content volume, indexing operations,
and external service ownership justify it.

The local repository should start with a generated static index over canonical
content IDs, titles, headings, excerpts, locale, status, and source path. This
keeps search inspectable and allows a later provider adapter without changing
links or content identity.

#### GitHub Pages

VitePress's official deployment guide requires a project-site base such as
`/repo/`, builds to `.vitepress/dist`, and shows a Pages workflow with
`configure-pages`, `upload-pages-artifact`, and `deploy-pages`. The guide also
emphasizes local preview before publication.

The local workflow follows the same broad artifact/deploy shape, but its
bounded copy step is more appropriate for a repository that intentionally
publishes source Markdown alongside a static reader. The base-path lesson is
directly reusable: every generated reader link and asset path must be tested
under the project-site prefix, not only at a domain root.

### Docusaurus

#### File structure and sidebar

Docusaurus supports explicit sidebars and filesystem-generated sidebars. Its
documentation describes sidebars as an ordered tree that also enables
paginated next/previous navigation. Autogenerated sidebars use folders as
categories and files as document links, with front matter and category files
available for labels, positions, collapsibility, and category index behavior.
It also supports multiple sidebar objects.

The important trade-off is explicit versus derived order. Filesystem
generation lowers maintenance cost for regular documentation, but editorial
order can become dependent on filename or metadata conventions. For this
repository's book, the existing governance order is stronger because it
records identity, part, locale paths, and migration state in one place. A
Docusaurus adapter should use explicit IDs or a custom sidebar generator,
rather than infer the book from directory order.

#### Versioning and locale model

Docusaurus treats translated Markdown/MDX as whole documents and stores locale
translation data under an `i18n/[locale]/[pluginName]/...` tree, alongside
separate JSON translation files for UI labels. Its documented goals include
static low-overhead delivery, independently buildable locales, SEO defaults
such as `hreflang`, and deployment flexibility. It intentionally does not
make automatic locale detection or translated slugs a core requirement.

This separation between document translation and UI translation is directly
useful. The local matrix already records content translation state, while the
site dictionary separately records reviewed UI locales. The local system
should retain that distinction and should not mark a route as complete merely
because a language option is visible.

Docusaurus versioning is a separate axis from localization: versioned docs
need stable version identities and navigation, while a locale is a language
variant of a version. If the local book later adds published editions, version
must become another explicit identity dimension rather than being encoded in a
locale suffix.

#### Search and GitHub Pages

Docusaurus documents search integrations such as Algolia and supports the
classic docs theme's navigation, breadcrumbs, and pagination around a docs
sidebar. Its GitHub Pages guidance distinguishes source and deployment
repositories/branches, requires a correct `baseUrl` for project pages, notes
the `.nojekyll` concern, and shows both the Pages artifact workflow and older
deployment-branch approaches.

The local project should prefer the current Actions artifact route and keep
the source/deployment boundary explicit. The older “push generated files to a
deployment branch” pattern is useful as historical context, not as a reason to
add a second publishing branch.

### mdBook

#### Canonical table of contents

mdBook requires a `SUMMARY.md` file to define which chapters exist, their
order, hierarchy, source paths, and part titles. It supports prefix and suffix
chapters, nested numbered chapters, draft chapters without a file, and
separators. This is the cleanest direct benchmark for a book rather than a
general docs portal.

The local `book-navigation.yaml` plays the same editorial role while adding
stable content IDs, English and legacy paths, translation/migration state, and
machine validation. The local design should keep those additional fields
because a plain file list cannot express migration and evidence status.

#### Reading navigation and search

mdBook's HTML renderer provides a sidebar, header navigation, and a built-in
search index with configurable result limits, teasers, weighting, heading
splitting, and per-chapter indexing controls. It also supports redirects for
moved or deleted pages.

These are useful requirements for a future local search contract: index the
document title, hierarchy, headings, and body with deterministic weighting;
link to heading fragments where possible; and support redirects when a source
path changes. Search should honor locale and translation availability rather
than returning an untranslated target without status.

#### GitHub Pages

mdBook's CI guidance builds a static `book` directory and transfers it to the
hosting service. Its renderer supports `site-url` for subdirectory hosting,
custom domains, a generated 404 page, and `.nojekyll`-compatible static Pages
deployment. This reinforces two local requirements: test the project-site
prefix and treat 404 behavior as part of navigation, not only a server detail.

#### Reusable lesson

Use one machine-readable order contract with explicit draft/missing states.
Do not infer the book from a directory listing. Keep the table of contents
and search index generated from the same content identities.

## Cross-project comparison

| Concern | WorkBuddyGuide | VitePress | Docusaurus | mdBook | Local implication |
| --- | --- | --- | --- | --- | --- |
| Primary structure | Part directories plus cases | Markdown route tree plus configured sidebars | Docs tree plus explicit/autogenerated sidebars | `SUMMARY.md` book order | Keep `book/` readable and governance order authoritative |
| Macro TOC | Sidebar grouped by book parts | Configured/collapsible/path-scoped sidebar | Explicit or filesystem-generated sidebar | Required ordered summary | Generate reader navigation from `book-navigation.yaml` |
| Micro TOC | Current-page outline | Default-theme outline | Breadcrumbs and docs navigation | Sidebar header navigation | Keep page outline separate from chapter order |
| Previous/next | Theme footer configuration | Theme footer configuration | Sidebar enables pagination | Built from summary order | Generate raw Markdown and reader links from one order |
| Problem entry | Help and case collection | Custom pages/sections | Docs/blog/pages can be combined | Primarily book navigation | Add problem/case indexes as links into the spine |
| Locale identity | No comparable locale contract observed in the fixed source slice | Locale directories/config and route mapping | `i18n/[locale]/[plugin]` plus UI JSON | No core i18n contract in this benchmark | Keep content ID, locale path, UI copy, and translation status distinct |
| Search | VitePress local search in site config | Local or Algolia provider | Provider/integration model | Built-in indexed search | Add a generated locale-aware index before external search |
| Pages path | Site-specific configuration | `base` for project pages | `baseUrl`, `.nojekyll`, artifact/branch options | `site-url`, 404, static output | Test prefix, 404, artifact contents, and public URL |
| Source boundary | Public repo plus separate cases/config | Framework source to static output | Source/deployment concepts | Source book to built `book` | Keep bounded artifact and do not expose work directories |

## Recommendations for this repository

### Preserve the current source boundaries

Do not introduce a second sidebar file, second chapter order, or second
locale registry. Keep the existing contracts authoritative and generate any
future framework configuration from them. A framework migration should be an
output-adapter decision, not a content-reorganization prerequisite.

### Treat navigation as four complementary surfaces

The public reader should make these distinct:

1. **Start/overview:** decide where to begin.
2. **Learning path:** choose a level and its required content.
3. **Book spine:** read the 22 chapters in editorial order.
4. **Problem/case index:** enter by task, then return to chapters, labs, and
   evidence.

Inside a chapter, keep the current-page outline separate from book-level
previous/next. Do not make one oversized sidebar carry all four jobs.

### Make search a projection of content identity

The first search implementation should be a deterministic generated asset,
not a hosted service dependency. Each record should minimally contain:

- `content_id` and kind (`chapter`, `lab`, `skill`, `research`, or case);
- locale token and source availability;
- title, part/route labels, headings, and a bounded excerpt;
- canonical source path and optional heading fragment;
- content and translation status;
- a flag indicating whether the result is the requested locale or an
  explicitly labeled fallback.

Indexing should be tested for duplicate identities, stale generated output,
missing files, and links that lose the locale query or heading fragment. Later
Algolia or another provider can consume the same record contract.

### Keep locale links honest and shareable

Continue using explicit URL locale state for shareability. Preserve the
current path, query, and hash when switching language where the target content
identity is known. If the translation does not exist, retain the requested
locale in the URL but show the fallback source and migration state. This
prevents a language menu from becoming a cosmetic toggle.

Keep UI translation coverage independently auditable from content translation
coverage. The Docusaurus split between whole-document translation and UI JSON
is a useful conceptual model even though the local implementation is a static
manifest and dictionary rather than a Docusaurus plugin tree.

### Keep Pages artifact checks separate from deployment claims

Retain the existing bounded artifact builder and add future checks at the
same boundary:

- root and project-subpath entry behavior;
- `.nojekyll` and 404 behavior;
- all generated reader assets under the intended base path;
- no `.git`, worktrees, temporary directories, secrets, or private archives;
- locale links and reader links after artifact rewriting;
- Pages API state and public URL reachability after deployment.

A successful Actions workflow is evidence of build/deploy execution only. It
does not prove that Pages is enabled, that the public URL is reachable, or
that the content and translations are complete.

### Use framework adoption gates

Reconsider VitePress, Docusaurus, or mdBook only when at least one of these is
true:

- manual reader-shell maintenance is more costly than the framework boundary;
- search needs exceed a generated static index;
- versioned editions or many independently deployed locales are required;
- accessibility, SEO, or route-level guarantees need framework support that
  the static shell cannot maintain safely;
- the project can preserve its canonical identity, locale, status, and Pages
  artifact contracts through an adapter.

Until then, the current dependency-free reader is a valid deliberate choice:
it keeps the source visible, keeps generated data inspectable, and avoids a
second build ecosystem while the curriculum is still a candidate.

## Limitations and open questions

- This study did not perform a complete browser accessibility audit of every
  external site; it used official documentation and public source/configuration
  records for the stated IA concerns.
- WorkBuddyGuide's public repository license does not by itself establish the
  license of every third-party image, icon, font, screenshot, or contributed
  case asset. No such assets are copied here.
- Framework documentation describes supported mechanisms, not proof that every
  real deployment uses them correctly.
- Search ranking quality, multilingual stemming, and reader behavior require
  a local prototype and runtime evidence before a production claim.
- GitHub Pages availability and repository-plan behavior are account- and
  repository-dependent; they must be checked live at release time.

## Source and license register

All URLs below were accessed on 2026-08-11. The scope column states what was
used. The license boundary is intentionally conservative: this report uses
facts, structural observations, and short descriptive paraphrases only. It
does not copy external text, source code, templates, images, or brand assets.

| Source | Scope used | License / reuse boundary |
| --- | --- | --- |
| [WorkBuddyGuide repository](https://github.com/AlephAITech/WorkBuddyGuide) | Public repository identity and current public structure | Repository root advertises MIT at the fixed revision below; that does not clear third-party assets or every contribution for reuse |
| [WorkBuddyGuide fixed tree](https://github.com/AlephAITech/WorkBuddyGuide/tree/abd61e82188fc57ef542756312e06175fc70b8b0) | `docs/`, cases, configuration, and deployment structure at `main` commit `abd61e82188fc57ef542756312e06175fc70b8b0` | Observation only; no files or content copied |
| [WorkBuddyGuide VitePress config](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts) | Navigation, local search, outline, edit link, and footer configuration | Observation only; no configuration copied |
| [WorkBuddyGuide sidebar](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts) | Part grouping and case sidebar generation | Observation only; no code copied |
| [WorkBuddyGuide LICENSE](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/LICENSE) | Root license statement | MIT terms may permit reuse of covered work with notice, but this report does not reuse covered code/assets and does not assume third-party clearance |
| [VitePress routing](https://vitepress.dev/guide/routing) | Markdown-to-route behavior | Official documentation consulted as factual reference; no prose or code copied |
| [VitePress sidebar](https://vitepress.dev/reference/default-theme-sidebar) | Sidebar arrays, groups, path-scoped sidebars, collapse, and base paths | Official documentation consulted as factual reference; no prose or code copied |
| [VitePress default theme configuration](https://vitepress.dev/reference/default-theme-config) | Locale routing, outline, search options, and previous/next labels | Official documentation consulted as factual reference; no prose or code copied |
| [VitePress i18n](https://vitepress.dev/guide/i18n) | Locale directory layouts, locale config, route links, and fallback/server considerations | Official documentation consulted as factual reference; no prose or code copied |
| [VitePress search](https://vitepress.dev/reference/default-theme-search) | Local search and Algolia provider model | Official documentation consulted as factual reference; no external index or UI copied |
| [VitePress deployment](https://vitepress.dev/guide/deploy) | Project-site base paths and GitHub Pages Actions artifact workflow | Official documentation consulted as factual reference; no workflow copied |
| [VitePress LICENSE](https://github.com/vuejs/vitepress/blob/main/LICENSE) | Root framework license | MIT; no framework source, theme, or assets reused |
| [Docusaurus sidebar](https://docusaurus.io/docs/guides/docs/sidebar) | Ordered sidebars, pagination, explicit and multiple sidebars | Official documentation consulted as factual reference; no prose/templates copied |
| [Docusaurus autogenerated sidebar](https://docusaurus.io/docs/guides/docs/sidebar/autogenerated) | Filesystem categories, metadata, category indexes, and ordering trade-offs | Official documentation consulted as factual reference; no prose/templates copied |
| [Docusaurus versioning](https://docusaurus.io/docs/guides/docs/versioning) | Version identity as a separate docs concern | Official documentation consulted as factual reference; no content copied |
| [Docusaurus i18n introduction](https://docusaurus.io/docs/i18n/i18n-introduction) | Whole-document translation, UI translation files, locale paths, and i18n goals/non-goals | Official documentation consulted as factual reference; no prose/code copied |
| [Docusaurus search](https://docusaurus.io/docs/search) | Search integration model | Official documentation consulted as factual reference; no search configuration copied |
| [Docusaurus GitHub Pages](https://docusaurus.io/docs/deployment#deploying-to-github-pages) | `baseUrl`, `.nojekyll`, source/deployment distinction, and Actions deployment | Official documentation consulted as factual reference; no workflow copied |
| [Docusaurus LICENSE](https://github.com/facebook/docusaurus/blob/main/LICENSE) | Root framework license | MIT; no framework source, theme, or assets reused |
| [mdBook SUMMARY format](https://rust-lang.github.io/mdBook/format/summary.html) | Required ordered summary, hierarchy, parts, drafts, prefixes, and suffixes | Official documentation consulted as factual reference; no summary or prose copied |
| [mdBook renderer configuration](https://rust-lang.github.io/mdBook/format/configuration/renderers.html) | Static output, `site-url`, 404, redirects, sidebar folding, and built-in search controls | Official documentation consulted as factual reference; no theme/code copied |
| [mdBook continuous integration](https://rust-lang.github.io/mdBook/continuous-integration.html#github-pages) | Build-to-static-output and GitHub Pages considerations | Official documentation consulted as factual reference; no workflow copied |
| [mdBook LICENSE](https://github.com/rust-lang/mdBook/blob/master/LICENSE) | Root project license | MPL-2.0; no mdBook source, theme, or assets reused |
| [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) | Official Pages artifact, permissions, upload, and deploy concepts | GitHub documentation used as factual reference; no GitHub-provided prose/templates copied |

## Local evidence consulted

The local evidence for this report was read from the working tree on
2026-08-11. The report does not alter any of these files:

- `AGENTS.md`
- `CONTEXT.md`
- `docs/charter.md`
- `docs/book-architecture.md`
- `docs/governance/project-structure.yaml`
- `docs/governance/book-navigation.yaml`
- `docs/governance/locale-matrix.yaml`
- `docs/adr/0013-single-book-navigation-source.md`
- `docs/adr/0015-locale-aware-site-routing.md`
- `docs/adr/0016-github-pages-artifact-boundary.md`
- `docs/adr/0017-reader-shell-consumes-canonical-navigation.md`
- `site/README.md`
- `.github/workflows/pages.yml`
- `scripts/build_book_navigation.py`
- `scripts/build_site_locale_manifest.py`
- `scripts/build_pages_artifact.py`

This report is the only requested output of this research task.
