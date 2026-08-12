# Tutorial and Knowledge-Base Architecture Benchmark — 2026-08-11

**Status:** `candidate` / `reference-only`  
**Accessed:** 2026-08-11 (America/Los_Angeles)  
**Scope:** Information architecture and reading experience for a practical, book-like knowledge base: directories, chapters, labs, cases, versions, locale switching, previous/next navigation, search, version notices, and the home page.  
**Repository in scope:** `Prysai/Codex-Field-Guide`  

This record compares first-party documentation, first-party source repositories,
and the rendered sites of Docusaurus, Astro Starlight, VitePress, mdBook, The
Rust Programming Language, Kubernetes documentation, and WorkBuddyGuide. It
does not copy external prose, templates, source code, images, fonts, icons,
CSS, or brand expression.

## Executive conclusion

The strongest common pattern is not a particular framework. It is a content
contract:

```text
content identity
    -> ordered learning map
        -> locale-aware route
            -> page-local table of contents
                -> previous / next destination
                    -> search index and evidence links
```

The current Field Guide should keep its Markdown-first source and its explicit
`-EN`, `-ZH`, `-ES`, `-JA`, `-KO`, and `-DE` file naming rule. The rule is useful
for GitHub browsing, review, and downloads, but it is not by itself a complete
multilingual reading system. The public reader should additionally maintain a
stable content identity and resolve every ordinary internal link in the
reader's current locale.

The best near-term architecture is a deliberately small hybrid:

1. Keep one canonical ordered book map for chapters and stable learning units.
2. Keep labs, field cases, research notes, and skills as separate content
   families rather than mixing them into the chapter order.
3. Give every translated file the same content identity and an explicit
   translation status.
4. Generate the table of contents, sidebar, previous/next footer, language
   switcher, and search metadata from that identity map.
5. Keep English at the root/default route and make other locale routes
   explicit. A missing translation must show a visible fallback notice.
6. Treat product facts, model names, prices, UI labels, and availability as
   dated claims; do not create a new “book version” for every fact refresh.

This preserves the project's current strengths—plain source files, inspectable
validation, and a bounded static artifact—while borrowing the most useful
reading behaviors from mature documentation projects.

## 1. What was examined

### 1.1 First-party sources and access notes

| Project | First-party material read | Observed version or scope | Accessed |
|---|---|---|---|
| Docusaurus | [Docs introduction](https://docusaurus.io/docs/docs-introduction), [sidebar](https://docusaurus.io/docs/sidebar), [versioning](https://docusaurus.io/docs/versioning), [internationalization](https://docusaurus.io/docs/i18n/introduction), [search](https://docusaurus.io/docs/search), [source repository](https://github.com/facebook/docusaurus) | Rendered documentation displayed Docusaurus `3.10.2`; the site exposes docs, sidebar, version, locale, and search controls. | 2026-08-11 |
| Astro Starlight | [Getting started](https://starlight.astro.build/getting-started/), [project structure](https://starlight.astro.build/guides/project-structure/), [i18n](https://starlight.astro.build/guides/i18n/), [site search](https://starlight.astro.build/guides/site-search/), [source repository](https://github.com/withastro/starlight) | Current public Starlight documentation; language selector exposed many locales, including English, Simplified Chinese, Japanese, Korean, Spanish, French, German, and others. | 2026-08-11 |
| VitePress | [What is VitePress?](https://vitepress.dev/guide/what-is-vitepress), [i18n](https://vitepress.dev/guide/i18n), [default-theme search](https://vitepress.dev/reference/default-theme-search), [prev/next](https://vitepress.dev/reference/default-theme-prev-next-links), [source repository](https://github.com/vuejs/vitepress) | Rendered documentation displayed `2.0.0-alpha.19`; the page exposed a guide/reference split, language control, local search documentation, and pager controls. | 2026-08-11 |
| mdBook | [Rendered mdBook guide](https://rust-lang.github.io/mdBook/), [reading books](https://rust-lang.github.io/mdBook/guide/reading.html), [source repository](https://github.com/rust-lang/mdBook) | Rendered guide displayed mdBook `0.5.4`; the guide explicitly described chapters, sidebar navigation, bottom arrows, keyboard navigation, search, and source/edit links. | 2026-08-11 |
| The Rust Programming Language | [Rendered Rust Book](https://doc.rust-lang.org/book/), [source repository](https://github.com/rust-lang/book) | Current stable online book entry point; its table of contents uses numbered parts and nested subsections, and its repository describes stable, beta, and nightly online books. | 2026-08-11 |
| Kubernetes | [Documentation home](https://kubernetes.io/docs/home/), [supported documentation versions](https://kubernetes.io/docs/home/supported-doc-versions/), [localization contribution guide](https://kubernetes.io/docs/contribute/localization/), [website repository](https://github.com/kubernetes/website) | The home page stated that the site contains the current and previous four Kubernetes versions; it exposes language and version controls, search, and intent-based sections. | 2026-08-11 |
| WorkBuddyGuide | [Repository home](https://github.com/AlephAITech/WorkBuddyGuide), [online bluebook](https://workbuddy.homes/), [repository README](https://github.com/AlephAITech/WorkBuddyGuide/blob/main/README.md), [English README](https://github.com/AlephAITech/WorkBuddyGuide/blob/main/README_en.md) | Public repository on `main`; GitHub showed separate `docs/bluebook`, `docs/cases`, `docs/community`, `docs/help`, `docs/.vitepress`, `assets`, and scripts. README links to a fuller online reader. | 2026-08-11 |

The rendered pages are evidence of the published reading surface at the access
date. They are not proof that a particular option exists in every historical
release, nor proof that the same configuration is appropriate for this
repository.

### 1.2 Current Field Guide snapshot used for recommendations

The local snapshot was read-only. It contained:

- `book/` as the source book area, with `chapters/`, `labs/`, README files,
  prefaces, and tables of contents;
- `site/` as the static reader/application area;
- `scripts/` containing validators, navigation builders, locale checks, and
  the bounded Pages artifact builder;
- `docs/governance/book-navigation.yaml` as the named navigation source;
- `docs/governance/locale-matrix.yaml` and related content-status/source
  registries;
- `docs/research/` as a separate research record area;
- language-suffixed files already present for some content, but not an equal
  six-locale set for every chapter.

The local filename count at the time of this study was 9 chapter files ending
in `-EN.md`, and 2 each ending in `-ZH.md`, `-ES.md`, `-JA.md`, `-KO.md`, and
`-DE.md`. This is a repository snapshot, not a release claim. It demonstrates
why the language switcher must expose translation status rather than implying
that six-language parity already exists.

## 2. Facts from the benchmarked projects

This section records observed or explicitly documented behavior. Interpretive
conclusions are deferred to Section 3.

### 2.1 Docusaurus

#### Content and chapter structure

The official docs describe a hierarchy of individual pages, sidebars, versions,
and plugin instances. The rendered site shows a collapsible sidebar with
categories and nested pages. The docs introduction also documents a docs-only
mode in which the documentation route can be placed at the site root.

The official sidebar documentation treats the sidebar as an ordered tree of
documents and categories. It supports manually authored entries and generated
sections based on the content tree. The rendered page footer exposes previous
and next document links.

#### Versions and notices

Docusaurus versioning preserves a particular documentation set separately from
the current working documentation. Its documented model includes versioned
documents, versioned sidebars, a list of versions, and configurable labels and
paths. The documentation explicitly warns that versioning increases build and
maintenance complexity and is best suited to frequently changing,
high-traffic documentation.

The live Docusaurus docs display the current docs version near the article
heading and expose a version selector in the global navigation.

#### Languages

The i18n documentation describes a default locale plus alternative locales,
locale-specific filesystem locations, translated Markdown/MDX files, translated
UI JSON, and localized data files. It also documents locale-specific deployment
strategies and `hreflang` SEO output. Automatic locale detection is explicitly
listed as a non-goal; the project leaves that decision to the hosting layer.

#### Search

Docusaurus documents first-class Algolia DocSearch support, plus community
local-search and custom-search alternatives. Its contextual search model can
filter results by the language and documentation version represented by the
current URL.

#### Homepage information architecture

The docs-only mode shows that a documentation project can make the book itself
the primary home route. The public Docusaurus site then uses top-level product
areas—docs, API, blog, showcase, and community—rather than forcing every
visitor through one undifferentiated page.

### 2.2 Astro Starlight

#### Content and chapter structure

The project-structure guide places content in a content collection and treats
each Markdown/MDX/Markdoc file as a page. Its navigation guide supports
explicit sidebar entries and generated entries. The rendered site groups pages
under labeled sections such as Start Here, Guides, Components, Reference, and
Resources, with a separate page-local “On this page” outline.

The rendered article footer provides previous and next links. The i18n guide
states that pagination is based on the current locale's content/navigation
model, not on a global filename sort.

#### Languages and fallback

Starlight documents `locales` and `defaultLocale`, locale directories, an
optional root locale, translated UI strings, and right-to-left support. It
associates equivalent pages using the same filename in locale-specific content
directories. The documented fallback behavior is explicit: if a translated
page is missing, the default-language page may be shown with a notice that the
content is not yet available in the selected language.

The language selector is visible on the rendered site and the UI translation
system includes labels for search, navigation, previous/next links, and
untranslated content.

#### Search

The site-search guide states that Starlight sites include full-text search by
default through Pagefind, with no additional configuration required for the
basic static-site case. It also documents page-level and element-level search
exclusion and an optional Algolia DocSearch integration.

#### Homepage information architecture

The rendered home/documentation surface makes the primary routes visible as
named groups. It gives readers three levels of orientation: global section
navigation, the current page's outline, and adjacent-page pagination.

### 2.3 VitePress

#### Content, hierarchy, and navigation

The official introduction describes VitePress as a Markdown-to-static-HTML
site generator that becomes an SPA for later same-site navigation. The default
theme exposes separate Guide and Reference top-level areas, expandable sidebar
sections, a page-local outline, and footer pager links.

The default-theme reference documents sidebar configuration and previous/next
links. Previous/next can be inferred from sidebar order or overridden for a
specific page. This allows a stable editorial path with occasional exceptions.

#### Languages

The i18n guide documents locale directories, a root locale, per-locale labels
and HTML language attributes, and locale-specific theme configuration. It
notes that a locale directory alone does not automatically redirect the root
route; the hosting/server layer must provide that behavior if desired.

#### Search

The default theme supports local fuzzy full-text search using an in-browser
index. The search reference also documents multilingual search configuration,
search exclusion, custom content rendering, and an optional Algolia provider.

#### Performance and reading flow

The introduction explicitly distinguishes the initial static HTML load from
subsequent client-side navigation. It also describes prefetching visible link
targets as part of the post-load experience. This is a performance model, not
a requirement for every static reader.

#### Homepage information architecture

The default VitePress information hierarchy is intentionally compact: a small
top navigation, a sidebar for the current area, a page-local outline, and
configurable home-page components. It is well suited to a documentation site
whose stable categories are known in advance.

### 2.4 mdBook

#### Content and chapter order

The mdBook guide uses a `SUMMARY.md`-style ordered tree to define chapters and
nested chapters. The rendered guide shows numbered sections, nested entries,
and a consistent current-page position in the sidebar. The chapter model is
explicit rather than an accidental alphabetical directory listing.

#### Previous/next and keyboard navigation

The official reading guide states that the bottom arrow buttons move to the
previous or next chapter, and that left/right keyboard arrows do the same. A
first or last page therefore naturally has only one available adjacent
direction.

#### Search and source transparency

The rendered guide exposes built-in search, source repository access, a direct
edit link, and a print-book link. Search can match chapters and sections and
then highlight the matching terms in the page.

#### Versions and languages

The basic mdBook reading model is a book renderer, not a complete product
version or translation-management system. Versioned books and multilingual
sites can be built around it, but their route, content identity, fallback, and
release policy are external to the minimal chapter renderer.

### 2.5 The Rust Programming Language

#### Chapter design and route

The online book presents a title page, foreword, introduction, numbered major
chapters, nested subsections, projects, and appendices. The navigation tree
preserves editorial order and makes the progression visible before the reader
opens a page.

The repository README distinguishes stable, beta, and nightly online books and
explains that the source repository may be ahead of those published channels.
It also documents a build output and testing path for code listings.

#### Translation and release boundary

The repository README has a dedicated translations section and explains that
multiple-language integration depends on the book tooling and project policy.
This is a useful warning for the Field Guide: a translation folder or suffix is
not equivalent to a maintained, released translation.

#### Practical teaching pattern

The Rust Book combines conceptual chapters with progressively larger runnable
projects and appendices. The key transferable feature is the sequence from
basic concepts to a guided project, not the Rust-specific subject matter.

### 2.6 Kubernetes documentation

#### Homepage information architecture

The Kubernetes documentation home page does not ask every reader to guess a
chapter number. It presents intent-based entry points: understand concepts,
try tutorials, set up a cluster, perform tasks, look up reference information,
contribute, and inspect available versions.

The global navigation separately exposes Documentation, Getting started,
Concepts, Tasks, Tutorials, Reference, and Contribute. The page also exposes a
search box, version control, and a language control.

#### Content types

The Concepts / Tasks / Tutorials / Reference separation is a strong example of
different reading jobs receiving different content families:

- concepts explain the mental model;
- tasks provide short operational procedures;
- tutorials provide guided learning sequences;
- reference material provides lookup precision.

The categories are related but are not forced into one linear book.

#### Versions and localization

The home page states that the website contains the current and previous four
Kubernetes versions. The site exposes a version selector and a supported-
versions page. The project also maintains a formal documentation localization
contribution path.

#### Search and navigation

The public site exposes search at the documentation shell level. Pages include
breadcrumbs, section-level print support, and a large navigational tree. The
site is designed for both sequential learning and direct lookup.

### 2.7 WorkBuddyGuide

#### Repository and online-reader split

The repository README clearly tells readers that GitHub is useful for
understanding the project and contributing, while the online site provides the
full reading experience. The README links to an online reader, a case library,
a help/intake path, a reading guide, and contribution guidance.

#### Content families and user paths

The README separates a formal bluebook, community cases, help submissions,
community/contribution material, and website assets/configuration. It offers
different reading paths for first-time users, readers with a concrete task, and
teams preparing adoption.

It also distinguishes a stable book line from append-only or community-driven
cases. A case is expected to record its scenario, skill, task, execution,
actual result, and acceptance criteria before it is treated as a useful
contribution.

#### Language entry points

The repository root contains distinct Chinese and English README files, and the
Chinese README provides an English link and a link to the online reader. This
shows the value of a visible language entry point, but it does not by itself
prove that every linked page remains in the selected language.

#### Search, navigation, and deployment

The README describes the online site as providing a sidebar, full-text search,
chapter table of contents, dark mode, diagrams, and mobile adaptation. It also
states that the site is built with VitePress and deployed through a hosted
Pages workflow. These are project-level claims from the README; they should be
verified against the rendered site and current deployment configuration before
being treated as a general framework guarantee.

## 3. Cross-project comparison

The table below separates what the projects actually provide from what it means
for this repository.

| Capability | Mature patterns observed | Strong fit for Field Guide | Poor fit or premature choice |
|---|---|---|---|
| Directory structure | Content, assets, configuration, scripts, and contribution material have recognizable homes; book engines often keep one source directory plus a navigation file. | Keep `book/` for learning content, `book/labs/` for experiments, `examples/` for runnable demonstrations, `docs/research/` for source-backed studies, `skills/` for reusable capabilities, and `site/` for presentation. Explain these homes on the project front door. | One giant directory sorted by filename; mixing temporary renders, source notes, and public pages. |
| Chapter order | mdBook/Rust Book use an explicit ordered tree; Docusaurus/Starlight/VitePress use sidebar order or generated sections. | Keep `docs/governance/book-navigation.yaml` as the single order source and derive chapter footer links and the human-readable contents page from it. | Let each locale, sidebar, and footer maintain a separate hand-authored order. |
| Labs/experiments | Kubernetes separates tutorials and tasks; WorkBuddyGuide separates cases from the formal book; Rust Book uses guided projects. | Give every lab a small contract: problem, prerequisites, bounded action, expected observation, failure variant, evidence, recovery, and acceptance checklist. Link it from the chapter without making it a hidden chapter. | Calling screenshots or a polished mockup an experiment result without a reproducible procedure or evidence boundary. |
| Field cases | WorkBuddyGuide makes cases a distinct contribution surface with scenario, skill, execution, result, and acceptance criteria. | Maintain case pages under a separate family and tag them by task, skill, and evidence maturity. | Inserting unreviewed community anecdotes into the normative chapter path. |
| Page-local outline | Docusaurus, Starlight, VitePress, and mdBook expose headings or a page-local outline. | Keep a reliable “on this page” list for long chapters and labs; use headings as the anchor source. | A second manually maintained outline that can drift from headings. |
| Previous/next | All book-like examples expose adjacent navigation; mdBook also documents keyboard arrows. | Generate locale-aware previous/next links from the canonical content order. First page has only next; last page has only previous. | Replacing the full sidebar with only linear buttons; skipping a page silently because its translation is missing. |
| Language switch | Docusaurus, Starlight, and VitePress use a locale-aware site model; WorkBuddyGuide provides visible README entry links. | Keep suffix-named source files, pair them by `content_id`, and make the switcher point to the same content identity in the requested locale. | A plain string replacement in filenames that can land on an unrelated file or drop the current chapter/case. |
| Missing translation | Starlight explicitly shows default-language content with an untranslated notice; other systems expose locale-specific content/configuration but require project policy for missing pages. | Show `requested locale`, `effective locale`, and a clear fallback banner. Keep the page's language metadata truthful. | Silent English fallback while labeling the page as Chinese, Japanese, or another complete translation. |
| Six-language support | Frameworks generally use locale directories/routes and separate UI translations; coverage is a content-maintenance problem, not just a menu problem. | Treat the six locales as a matrix with per-file status: `complete`, `draft`, `review`, `missing`, or `fallback`. Default English remains the root language. | Claiming six-language support because six menu labels exist or because only the front door has six files. |
| Search | mdBook has built-in book search; Starlight uses Pagefind by default; VitePress can use local fuzzy search; Docusaurus documents first-class Algolia; Kubernetes exposes site search. | Make search a release acceptance criterion and index chapter headings, labs, cases, skills, and source status. Filter or label by locale and content family. | Adding a hosted search dependency before the public site, index scope, and privacy/maintenance boundary are settled. |
| Version selector | Docusaurus versions documentation and Kubernetes expose release/version choices; Rust Book distinguishes stable/beta/nightly channels. | Separate “guide edition” from dated volatile facts and source revisions. Add a version/source freshness banner only when it changes interpretation or safety. | Snapshotting every small edit as a versioned book; presenting a model name or price as a timeless edition. |
| Version notice | Docusaurus displays a version near the article; the benchmarked sites expose version controls in the shell. | Use concise notices for `draft`, `candidate`, `verified`, stale fact, fallback translation, and experimental content. Link each notice to a source/status record. | Decorative badges with no owner, date, scope, or acceptance meaning. |
| Home page | Kubernetes uses intent buckets; WorkBuddyGuide gives several reading paths; Docusaurus can make docs the root; Rust Book foregrounds a sequential book. | Combine both: “start here” paths for first task, real work, skills, and team adoption, plus a transparent map of files and current maturity. | A cover image and a long undifferentiated link list with no reader decision support. |
| Repository transparency | WorkBuddyGuide explains its directory map, local commands, contribution flow, and deployment; Rust Book explains build/test boundaries. | Keep the front door explicit about source, generated site, labs, research, skills, assets, validation, and temporary files excluded from publication. | Publishing internal work directories or making generated artifacts the apparent source of truth. |

## 4. Deductions from the evidence

The following are reasoned conclusions, not direct claims made by the external
projects.

### 4.1 A sidebar is a learning contract, not just a menu

When a sidebar also determines previous/next, it becomes the reader's implied
syllabus. Therefore it needs an owner, stable ordering, draft handling, and
locale-aware resolution. An automatically sorted directory is convenient for
small reference collections but is too weak as the sole editorial source for a
curriculum with chapters, tracks, labs, and future pages.

### 4.2 “Chapter” and “task” are different reading jobs

Kubernetes makes the distinction explicit at site scale, while WorkBuddyGuide
does it through book/case/help surfaces. The Field Guide should not force every
real-world problem into the linear chapter sequence. A chapter should teach a
concept and a repeatable method; a lab should make the method observable; a
case should show a bounded application and its evidence.

### 4.3 Locale is part of the destination identity

If a reader is on `content_id = chapter-07` in Japanese, “next” must resolve to
the Japanese version of the next content identity when that file exists. This
requires resolving links through a manifest or content matrix, not replacing
`-EN` with `-JA` in arbitrary strings. The same resolver should serve the
sidebar, footer, language switcher, related labs, and search results.

### 4.4 Fallback is a product state

A fallback page is useful, especially while translations are being built, but
it changes what the reader should believe about the page. The UI should expose
the requested language and the language actually being shown. This is more
honest and more useful than disabling the link or silently presenting a
different language.

### 4.5 Search must understand the content model

A single text index is not enough for this project. A reader may search for a
concept, a failure symptom, a lab, a Skill, or a source record. Search results
should retain content family, locale, maturity, and source freshness so a
polished case does not outrank a normative explanation merely because it has
more repeated keywords.

### 4.6 “Version” needs two meanings kept apart

Documentation frameworks use versioning to preserve a released documentation
surface. This repository also needs dated fact/source management for rapidly
changing products. Those are related but different:

- **Guide edition:** a deliberate, reader-facing curriculum snapshot;
- **Fact freshness:** source URL, access date, scope, owner, and next review;
- **Content maturity:** draft, candidate, verified, or production-ready;
- **Translation maturity:** missing, fallback, draft, review, or complete.

Combining all four into one version number would make maintenance harder to
understand.

## 5. Recommended target architecture for Codex Field Guide

This is the recommended design for the current project, derived from the facts
above and constrained by the existing Markdown-first repository.

### 5.1 Content families

```text
book/
├─ README-<LOCALE>.md                 # book front door for each locale
├─ preface-<LOCALE>.md
├─ table-of-contents-<LOCALE>.md      # generated or checked against the map
├─ chapters/
│  └─ <content-id>-<LOCALE>.md        # normative learning sequence
└─ labs/
   └─ <lab-id>-<LOCALE>.md            # bounded experiments

examples/
└─ <case-id>/                          # runnable or inspectable outputs

docs/
├─ research/                            # dated source-backed records
├─ quality/                             # reviews and acceptance evidence
├─ governance/                          # navigation, locale, status, facts
└─ adr/                                 # durable architectural decisions

skills/
└─ <skill-id>/                          # reusable capabilities with contracts

assets/
└─ ...                                  # original or separately licensed media

site/
├─ index.html                           # public front door
├─ reader.*                             # source-backed page reader
└─ *-manifest.*                         # generated identity/locale metadata
```

The names above describe the current project direction; they are not a request
to add files in this research-only task.

### 5.2 One identity map

Each learning object should have a stable identity independent of language and
filename suffix:

| Field | Purpose |
|---|---|
| `content_id` | Stable identity shared by all locales. |
| `kind` | `chapter`, `lab`, `case`, `skill`, `research`, or `reference`. |
| `order` / `part` | Position in the normative reading route, when applicable. |
| `source_files` | Explicit locale-to-file mapping, including missing entries. |
| `status` | Content maturity and verification state. |
| `translation_status` | Per-locale translation state. |
| `related` | Labs, cases, skills, research, and source records linked by identity. |
| `last_reviewed` | Date and scope of the last review, not a vague “updated” label. |

The existing navigation and locale governance files are the natural owners for
this data. The important invariant is that the generated public site must not
invent a second, contradictory identity model.

### 5.3 Locale-aware route behavior

The desired public URL model is:

```text
/                                  -> English front door
/chapters/07-skills...             -> English page
/zh/chapters/07-skills...          -> Simplified Chinese page, if available
/ja/chapters/07-skills...          -> Japanese page, if available
```

The exact route technology can remain a later implementation decision. The
behavior is the important part:

- English is the default/root language;
- the locale switch preserves `content_id` and page context;
- ordinary internal links remain in the current effective locale;
- missing translations produce an explicit fallback state;
- direct refresh and copied links preserve the same language choice;
- `html lang`, page metadata, search scope, and visible labels agree.

The current reader's query-based path mechanism can serve as a transitional
static artifact, but it should be treated as an implementation detail. It must
still enforce the same content-identity rules as a future generated route.

### 5.4 Chapter page contract

Every normative chapter should make the following visible near the beginning or
in a predictable metadata panel:

1. problem the chapter solves;
2. outcome the reader can demonstrate;
3. prerequisites and risk boundary;
4. concept model;
5. smallest safe experiment;
6. deliberate failure or boundary case;
7. real-work transfer or field case;
8. evidence and source boundary;
9. acceptance checklist;
10. status and last review;
11. same-locale links to related labs, skills, and sources;
12. previous/next links from the canonical order.

This contract borrows the sequential clarity of mdBook/Rust Book, the
intent-based separation of Kubernetes, and the case/evidence discipline visible
in WorkBuddyGuide without copying any of their content.

### 5.5 Search contract

Search should be accepted only when all of the following are true:

- a query can find chapter headings and substantive body text;
- labs and field cases are discoverable but visibly labeled;
- results identify locale and show a fallback badge when relevant;
- stable concepts and volatile facts can be distinguished;
- source records and evidence pages can be found by their identifiers;
- temporary directories and generated noise are excluded;
- keyboard navigation and mobile use are tested;
- the public index is rebuilt when content changes.

The project can start with a local/static index. A hosted provider should be a
later decision based on public deployment, index size, privacy, and maintenance
cost—not a prerequisite for a useful first release.

### 5.6 Homepage contract

The homepage should answer five questions within one screenful of scanning:

1. What is this project?
2. Who should start here?
3. Which path matches my goal?
4. What is complete, translated, and verified?
5. Where do I find source, labs, research, skills, and contribution rules?

Recommended primary paths:

| Reader intent | Entry point |
|---|---|
| First safe task | Start with the smallest observable experiment. |
| Real work | Jump to task definition, context, execution, verification, and delivery. |
| Skills and Agents | Learn selection, design, boundaries, evaluation, and maintenance. |
| Team adoption | Read shared context, permissions, evidence, contribution, and governance. |
| Specific problem | Search field cases, failure cards, and recovery procedures. |

Below those paths, the homepage should show the content map, language controls,
status legend, repository map, and a small “how this guide stays current” note.

## 6. What should not be copied or adopted blindly

### 6.1 Framework-specific complexity

Docusaurus version snapshots, hosted search integrations, VitePress SPA
enhancements, and Starlight component customization are valid tools, but none
is automatically a requirement for a Markdown-first Pages artifact. Introducing
them before the content contracts are stable would make the project harder to
audit.

### 6.2 Automatic locale detection

Docusaurus explicitly treats automatic locale detection as a non-goal. The
Field Guide should therefore use explicit user-visible switching and stable
URLs as the baseline. Server-side detection can be an optional convenience only
if it never overrides a deliberate URL or saved choice unexpectedly.

### 6.3 Silent translation parity

No project structure can turn missing translation files into finished content.
The Field Guide must not advertise six fully supported languages until the
corresponding content matrix, links, UI labels, and rendered pages have passed
the same-language checks.

### 6.4 Community content in the normative route

WorkBuddyGuide's separation of formal bluebook chapters and community cases is
useful. The Field Guide should not put every new case into the main chapter
sequence merely to increase page count. A case becomes normative only after a
separate review establishes reproducibility, source boundaries, and acceptance
criteria.

### 6.5 Popularity as quality evidence

Stars, repository size, visual polish, or a working search box do not establish
that a tutorial teaches the correct concept or that an example is reproducible.
Those signals can inform discovery, but the Field Guide's own evidence and
acceptance checks remain authoritative for its claims.

## 7. Implementation priorities

### Priority 0 — preserve the contracts

- Keep `content_id`, locale suffixes, status, source records, and canonical
  navigation aligned.
- Make the public reader's current locale explicit in every generated internal
  link.
- Ensure first/middle/last page navigation is checked for every published
  locale/source combination.

### Priority 1 — make the front door useful

- Put the four reader paths on the English homepage.
- Explain the purpose of `book/`, `docs/`, `skills/`, `examples/`, `assets/`,
  `site/`, and `scripts/`.
- Show translation and verification status instead of implying parity.
- Link readers to a short reading guide and the content map.

### Priority 2 — increase information density safely

- Add one real field problem and one deliberate failure to each core chapter.
- Give each lab observable inputs, outputs, evidence, and stop conditions.
- Connect each case to the skill, source record, and acceptance checklist that
  make it reusable.
- Use original diagrams and screenshots only when they explain a decision or
  observable result better than prose.

### Priority 3 — improve retrieval

- Add a tested static full-text index with locale and content-family metadata.
- Add result filters or labels for chapter, lab, case, skill, research, and
  reference.
- Exclude temporary work products and duplicate fallback bodies from the public
  index.

### Priority 4 — consider a larger docs framework

Evaluate Starlight, VitePress, or Docusaurus only after the content contracts
and acceptance tests above are stable. The choice should be based on:

- whether the framework can preserve the required suffix-named source files;
- whether locale-aware adjacent navigation is deterministic;
- whether static deployment is available for the chosen repository/plan;
- whether search can be built without exposing secrets or creating an
  unmaintained service dependency;
- whether generated output remains inspectable and excludes temporary content.

## 8. Verification plan for the eventual implementation

The benchmark suggests the following evidence, independent of framework choice:

| Check | Evidence required |
|---|---|
| Home orientation | Fresh browser render shows project purpose, reader paths, file map, status legend, and default English. |
| Chapter order | Generated contents, sidebar, and footer all agree with the canonical navigation source. |
| Adjacent navigation | First, middle, last, and cross-part pages show the correct available buttons. |
| Same-locale links | A page in each available locale links to the same locale for chapters, labs, cases, and research. |
| Language switch | Switching from any tested page preserves `content_id`, page context, and visible language state. |
| Fallback | A deliberately missing translation shows requested/effective locale and does not claim completion. |
| Search | Representative terms find chapters, failures, labs, skills, and cases with the correct locale/status labels. |
| Version/freshness | A volatile fact page displays source URL, access date, scope, owner, and review state. |
| Mobile reading | 320px and 390px checks show no horizontal overflow; sidebar and footer remain usable. |
| Publication boundary | Built artifact contains only intended public directories and no `.work/`, `tmp/`, `.codex-temp/`, or `_site/`. |
| Source transparency | Every public screenshot/diagram has an asset-register entry and a clear original/third-party boundary. |

## 9. Source, license, and reuse boundary

### 9.1 License observations

The following are the repository or site-level license signals observed from
first-party pages at the access date:

| Source | Observed license signal | What it permits for this study |
|---|---|---|
| Docusaurus | GitHub repository exposes an MIT license. See [LICENSE](https://github.com/facebook/docusaurus/blob/main/LICENSE). | Read and cite project structure; no copying of its docs prose, theme, images, or brand assets into this project. |
| Astro Starlight | GitHub repository exposes an MIT license. See [LICENSE](https://github.com/withastro/starlight/blob/main/LICENSE). | Read and cite architecture; no automatic license assumption for Astro, third-party plugins, docs content, or assets. |
| VitePress | GitHub repository exposes an MIT license. See [LICENSE](https://github.com/vuejs/vitepress/blob/main/LICENSE). | Read and cite architecture; do not vendor theme code or copy site expression without a separate review. |
| mdBook | The rendered official guide states that mdBook source and documentation are released under Mozilla Public License 2.0. See [license statement](https://rust-lang.github.io/mdBook/#license). | Study the book model; no copying of its guide text, theme assets, or examples into this repository. |
| Rust Book | GitHub repository exposes Apache-2.0 and MIT license files. See [repository license files](https://github.com/rust-lang/book). | Study chapter/project organization; Rust examples, book text, images, and third-party/print assets require their own file-level review. |
| Kubernetes website | The official documentation footer states that Kubernetes documentation is distributed under CC BY 4.0. See [website license](https://github.com/kubernetes/website/blob/main/LICENSE). | Study information architecture; do not copy Kubernetes text, diagrams, logos, trademarks, or other assets without preserving required attribution and checking their individual terms. |
| WorkBuddyGuide | GitHub repository exposes an MIT license and the README links to it. See [LICENSE](https://github.com/AlephAITech/WorkBuddyGuide/blob/main/LICENSE). | Study public repository/reader structure only; the project license does not automatically clear submitted cases, author cards, screenshots, fonts, third-party media, or brand expression for reuse. |

License labels above describe the project-level signals relevant to this
architecture study. They are not a legal determination for every file in each
repository.

### 9.2 Reuse boundary for Codex Field Guide

- This document is `reference-only`.
- External projects are cited for behavior, organization, and public
  documentation concepts, not as sources of text or implementation files.
- No external screenshot, logo, font, icon, diagram, template, or code is
  added by this study.
- Any future asset inspired by a pattern must be created independently or
  cleared in `docs/sources/asset-register.md` before publication.
- Official product facts and current framework behavior must be rechecked when
  they are used in reader-facing chapters, because the access date here does
  not make them permanent.

## 10. Open questions and review triggers

This benchmark does not decide:

- whether the project should migrate from the current static reader to
  Docusaurus, Starlight, or VitePress;
- whether GitHub Pages is available for the repository's current visibility and
  plan;
- whether every locale should have a dedicated generated route or remain a
  source-level suffix plus reader query during migration;
- which search provider is appropriate at the eventual public scale;
- whether a guide edition should be frozen or continuously published.

Revisit this benchmark when one of these changes occurs:

- a framework migration or major reader-shell rewrite;
- the first complete six-locale content slice;
- a public deployment becomes available;
- a versioned product release changes more than the source facts registry;
- search is introduced or its index scope changes;
- a new content family is added to the homepage or canonical navigation.

## Source index

The URLs below are the first-party references used for the comparison. They are
listed again so a future maintainer can recheck volatile claims without relying
on this summary alone.

1. [Docusaurus Docs Introduction](https://docusaurus.io/docs/docs-introduction)
2. [Docusaurus Sidebar](https://docusaurus.io/docs/sidebar)
3. [Docusaurus Versioning](https://docusaurus.io/docs/versioning)
4. [Docusaurus Internationalization](https://docusaurus.io/docs/i18n/introduction)
5. [Docusaurus Search](https://docusaurus.io/docs/search)
6. [Docusaurus source repository](https://github.com/facebook/docusaurus)
7. [Starlight Getting Started](https://starlight.astro.build/getting-started/)
8. [Starlight Project Structure](https://starlight.astro.build/guides/project-structure/)
9. [Starlight i18n](https://starlight.astro.build/guides/i18n/)
10. [Starlight Site Search](https://starlight.astro.build/guides/site-search/)
11. [Starlight source repository](https://github.com/withastro/starlight)
12. [VitePress introduction](https://vitepress.dev/guide/what-is-vitepress)
13. [VitePress i18n](https://vitepress.dev/guide/i18n)
14. [VitePress search](https://vitepress.dev/reference/default-theme-search)
15. [VitePress previous/next links](https://vitepress.dev/reference/default-theme-prev-next-links)
16. [VitePress source repository](https://github.com/vuejs/vitepress)
17. [mdBook rendered guide](https://rust-lang.github.io/mdBook/)
18. [mdBook reading guide](https://rust-lang.github.io/mdBook/guide/reading.html)
19. [mdBook source repository](https://github.com/rust-lang/mdBook)
20. [The Rust Programming Language](https://doc.rust-lang.org/book/)
21. [Rust Book source repository](https://github.com/rust-lang/book)
22. [Kubernetes documentation home](https://kubernetes.io/docs/home/)
23. [Kubernetes supported versions](https://kubernetes.io/docs/home/supported-doc-versions/)
24. [Kubernetes localization guide](https://kubernetes.io/docs/contribute/localization/)
25. [Kubernetes website source repository](https://github.com/kubernetes/website)
26. [WorkBuddyGuide repository](https://github.com/AlephAITech/WorkBuddyGuide)
27. [WorkBuddyGuide README](https://github.com/AlephAITech/WorkBuddyGuide/blob/main/README.md)
28. [WorkBuddyGuide English README](https://github.com/AlephAITech/WorkBuddyGuide/blob/main/README_en.md)
29. [WorkBuddyGuide online reader](https://workbuddy.homes/)

