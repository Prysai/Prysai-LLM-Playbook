# Comparable tutorial and documentation architecture study

**Repository in scope:** `Prysai/Codex-Field-Guide`  
**Accessed:** 2026-08-11 (America/Los_Angeles)  
**Status:** `candidate` / `reference-only`  
**Research question:** How do strong tutorial and documentation projects organize
navigation, multilingual content, chapter pagination, generated sites, search,
and visual teaching material? What should this repository adopt?

This is a structure study, not a proposal to copy another project's text,
code, images, CSS, fonts, UI, brand expression, or content taxonomy verbatim.
The recommendations are an original synthesis for this repository.

## Executive conclusion

The best projects do not treat a repository README as the whole product. They
separate at least four reader jobs:

1. decide whether the project is worth reading;
2. choose a learning route or search for a task;
3. read a page inside a stable, navigable content tree; and
4. inspect evidence, examples, source, or contribution rules.

The common technical pattern is:

```text
content identity
    -> ordered navigation tree
        -> locale-specific route
            -> page outline and evidence
                -> previous / next destination
                    -> search index and contribution/update metadata
```

For the Field Guide, the highest-value direction is a small, inspectable
content system rather than an immediate framework migration:

- retain Markdown-first source files and the explicit `-EN`, `-ZH`, `-ES`,
  `-JA`, `-KO`, and `-DE` naming contract;
- make a stable `content_id` the join key for every language, route, chapter,
  lab, case, and search record;
- derive the table of contents, reader sidebar, language switcher, and
  previous/next links from explicit navigation data;
- keep the formal book, practical labs, field cases, research records, and
  Skills as distinct content families;
- make missing translations visible instead of silently presenting another
  language as complete; and
- use diagrams, annotated screenshots, step cards, and before/after evidence
  to teach a decision or workflow, not as decorative filler.

## 1. What was examined

The sources below are first-party documentation, source repositories, or the
published site owned by the project being studied. A source URL is evidence of
the public structure observed on the access date; it is not a claim that every
historical release behaved identically.

| Project | Primary source examined | Structural evidence used |
|---|---|---|
| WorkBuddyGuide | [repository README](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/README.md), [VitePress config](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts), [sidebar source](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts), [deployment notes](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/DEPLOYMENT.md), [published reader](https://workbuddy.homes/) | README as project facade; online reader as the main reading surface; formal bluebook separated from cases, help, and community; explicit sidebar; local search, outline, dark mode, previous/next labels, edit links, and deployment configuration. |
| mdBook | [SUMMARY format](https://github.com/rust-lang/mdBook/blob/master/guide/src/format/summary.md), [reading guide](https://rust-lang.github.io/mdBook/guide/reading.html), [source repository](https://github.com/rust-lang/mdBook) | One strict ordered summary defines included chapters, hierarchy, and source paths; the rendered book uses sidebar, bottom arrows, keyboard navigation, search, and source links. |
| Docusaurus | [sidebar documentation](https://docusaurus.io/docs/sidebar), [internationalization](https://docusaurus.io/docs/i18n/introduction), [search documentation](https://docusaurus.io/docs/search), [versioning](https://docusaurus.io/docs/versioning) | Sidebar is an ordered tree shared by documents and used for pagination; i18n is filesystem/config based and can build locales independently; search is a separate indexed concern; versions are distinct from locales. |
| VitePress | [sidebar documentation](https://vitepress.dev/reference/default-theme-sidebar), [previous/next links](https://vitepress.dev/reference/default-theme-prev-next-links), [i18n guide](https://vitepress.dev/guide/i18n), [source repository](https://github.com/vuejs/vitepress) | Path-scoped or explicit sidebars; prev/next inferred from sidebar with page-level overrides; locale roots and locale-specific config; local/static reading surface with outline and search options. |
| Astro Starlight | [sidebar guide](https://starlight.astro.build/guides/sidebar/), [i18n guide](https://starlight.astro.build/guides/i18n/), [site search](https://starlight.astro.build/guides/site-search/), [project structure](https://starlight.astro.build/guides/project-structure/) | Explicit or autogenerated sidebar; locale-aware routing and UI translation; fallback content is documented as a deliberate behavior; Pagefind-powered static search by default; content, components, and public assets have clear homes. |
| Kubernetes documentation | [documentation home](https://kubernetes.io/docs/home/), [supported versions](https://kubernetes.io/docs/home/supported-doc-versions/), [localization guide](https://kubernetes.io/docs/contribute/localization/), [website repository](https://github.com/kubernetes/website) | Home page routes readers by intent (concepts, tutorials, setup, tasks, reference); version and language are separate controls; localization has team ownership, language directories, minimum content, and review expectations. |
| The Rust Programming Language | [published book](https://doc.rust-lang.org/book/), [source repository](https://github.com/rust-lang/book) | A stable, numbered reading path is presented as a book while source, release channels, and build instructions remain inspectable in the repository. |

## 2. What the comparable projects actually do

### 2.1 README is a front door, not the reading application

WorkBuddyGuide's README gives the project identity, links to the online reader,
explains the major parts, offers a recommended route, points users to a help
entry point, describes contribution requirements, and shows the directory map.
The repository itself remains useful for discovery and contribution, while the
published VitePress site provides the continuous reading experience. This is a
useful distinction for the Field Guide: a detailed English `README-EN.md` can
remain the canonical project explanation, but `site/` should be treated as a
reader product with its own navigation and interaction contracts.

**Transferable lesson:** the home page should answer “what is this, who is it
for, where should I start, and what will I be able to do?” It should not try to
contain every chapter or every case.

### 2.2 An ordered tree is the source of pagination

mdBook states that `SUMMARY.md` determines what chapters are included, their
order, hierarchy, and source files. Its reading guide describes the same tree
as a sidebar and exposes adjacent-page arrows and keyboard navigation.
Docusaurus explicitly describes a sidebar as a way to group an ordered tree,
share it across documents, and provide paginated next/previous navigation.
VitePress infers footer links from the sidebar unless a page overrides them.
WorkBuddyGuide keeps its formal bluebook sidebar explicit while deriving its
community-case entries separately from case directories.

**Transferable lesson:** the Field Guide's canonical navigation file should be
the owner of the formal chapter sequence. It should feed GitHub-facing chapter
footers, the public reader's sidebar, the TOC, and the progress indicator. A
case or research note should not accidentally become “Chapter 23” merely
because it exists in a directory.

### 2.3 Book pages and append-only cases are different content families

WorkBuddyGuide's sidebar contains a stable bluebook sequence and a separately
assembled cases section. Its README and case contribution material ask for a
problem, the Skill used, task description, execution process, actual effect,
and acceptance criteria before a case is considered useful. This separation
allows the formal teaching path to remain coherent while the practical case
library grows.

**Transferable lesson:** keep these Field Guide families separate:

| Family | Reader question | Suggested navigation behavior |
|---|---|---|
| Book chapter | “What concept or capability should I learn next?” | Ordered, paginated, part-aware |
| Lab | “What can I safely try now?” | Linked from a chapter and searchable by task |
| Field case | “Has someone solved a problem like mine?” | Filterable/indexed, not inserted into the book sequence |
| Skill | “What reusable operating method can I install or study?” | Registry entry plus quality/evidence links |
| Research record | “What source or volatile fact supports this?” | Dated, source-backed, usually not beginner navigation |

### 2.4 Locale is a route and identity problem, not only a label problem

Docusaurus documents locale-aware filesystem/configuration, independent locale
builds, and localized assets. VitePress documents a root locale plus explicit
locale directories and warns that a separate `/en/` structure needs a server
or redirect policy for the root route. Starlight documents multilingual
routing, fallback content, UI translation, and access to the current locale.
Kubernetes keeps language directories and localization contribution processes
explicit, including a minimum-content threshold before publishing a new
localization.

The important shared principle is that a translated page is a counterpart of
the same content identity. A language picker that changes only button labels
does not guarantee that the next link, sidebar, search result, or related
example remains in that language.

**Transferable lesson for the existing suffix contract:**

```text
content_id: chapter-07-skills-plugins-and-tools
locale: EN -> book/chapters/07-skills-plugins-and-tools-EN.md
locale: ZH -> book/chapters/07-skills-plugins-and-tools-ZH.md
locale: ES -> book/chapters/07-skills-plugins-and-tools-ES.md
```

The actual implementation may keep the current directory layout, but every
link resolver should work from `content_id + locale`, not from a translated
title or a guessed filename. If a counterpart is absent or not reviewed, show
an explicit “translation in progress” state and offer the English source as a
labeled fallback. Do not silently claim that fallback content is localized.

### 2.5 Search is an index over content metadata, not a text box bolted onto a home page

Docusaurus separates search providers and documents both hosted indexing and
local/community options. Starlight includes static full-text search through
Pagefind with no required application server. mdBook's reader presents search
as part of the book chrome. These systems differ in implementation, but they
all treat search as a site-wide reading capability rather than a chapter-only
feature.

**Transferable lesson:** search records for this repository should carry at
least:

- `content_id` and locale;
- title, part, content family, and headings;
- maturity (`draft`, `candidate`, `reproduced`, `accepted`, or equivalent);
- source/evidence status; and
- the canonical route.

Search should not hide the fact that a result is a research note, an
unreviewed case, or a missing translation. A useful result tells the reader
what kind of thing they found before they open it.

### 2.6 Visual teaching is structural when it reduces a decision's cognitive load

The strongest observed visual patterns are purposeful:

- WorkBuddyGuide uses a branded front-door banner and a published reader with
  outline, dark mode, diagrams, and mobile adaptation; its Markdown setup
  explicitly configures Mermaid and lazy-loaded images.
- Kubernetes routes the home page through intent cards, so readers choose
  “understand,” “try,” “set up,” “look up,” or “contribute” instead of scanning
  an undifferentiated file list.
- Starlight documents reusable teaching components such as cards, steps, tabs,
  asides, badges, and a file-tree presentation alongside its sidebar and
  search features.
- mdBook's reader makes progress visible through sidebar position, adjacent
  arrows, keyboard shortcuts, search, and source access.

These are observations of presentation roles, not permission to reuse the
projects' assets or visual identity.

**Transferable lesson:** each diagram or screenshot in the Field Guide should
answer one question, for example:

| Teaching need | Better visual form | Required annotation |
|---|---|---|
| Explain the agent loop | flow diagram | input, tool call, observation, stop condition |
| Compare GPT/Codex/Skill/Agent | layered map | ownership and boundary of each term |
| Show a Skill result | before/after or result card | prompt/context, runtime status, evidence limit |
| Teach a failure | annotated error timeline | trigger, observed symptom, diagnosis, recovery |
| Teach a safe workflow | numbered process strip | permission boundary and reversible checkpoint |
| Show a generated site | labeled screenshot | route, viewport, date, and whether it is local reproduction |

Decorative images should not compete with the evidence. Screenshots must carry
provenance and must not imply that a conceptual mockup was a real runtime
result.

## 3. Recommended architecture for Codex: From First Task to Real Work

### Priority 0 — preserve the identity and navigation invariants

1. Keep `docs/governance/book-navigation.yaml` as the sole ordered source for
   the formal 22-chapter path. Generate the reader sidebar, chapter footer,
   TOC projection, and progress metadata from it.
2. Define one stable `content_id` for every reader-facing unit. Map each
   `content_id` to locale, source path, route, title, status, and content family.
3. Keep English as the default route and suffix every reader-facing counterpart
   with the declared locale code. Retain any root `README.md` compatibility
   exception as a narrow, documented GitHub facade rather than a pattern for
   new content.
4. Resolve internal links by `(content_id, locale)`. Test that chapter links,
   language switches, TOC entries, footer pagination, related labs, and search
   results preserve the current locale or disclose a labeled fallback.
5. Keep missing translation, draft, and unverified case states visible in both
   the repository and the public reader.

### Priority 1 — make the learning product easier to enter and use

1. Give the home page five clear entry choices: **Start here**, **Choose a
   task**, **Read the book**, **Run a lab**, and **Inspect real cases**. Keep
   the project map one click away for contributors and technically curious
   readers.
2. Add a task/problem index that points to existing chapters, labs, cases, and
   Skills. Do not duplicate their teaching text in the index.
3. Add a reader-local outline and persistent chapter context: part, chapter
   number, learning objective, evidence status, and current locale.
4. Add a search index with content-family and maturity badges. Search should
   be generated from the content identity map, not hand-maintained in several
   unrelated files.
5. Keep a visible previous/next footer, but allow an explicit page override
   for an exception such as a part introduction or appendix.

### Priority 2 — raise information density without making pages harder to read

1. Require each chapter to include one real problem, one smallest experiment,
   one failure/boundary case, one evidence rule, and one acceptance checklist.
2. Add a compact “use this when / do not use this when” card to volatile or
   high-risk topics.
3. Turn real-world forum and issue research into short field-case records with
   source URL, date, claim type, reproduction status, and a link to the chapter
   or lab that teaches the response. A public report is a problem signal, not
   proof of the root cause.
4. Prefer annotated visuals over generic stock imagery: process maps, decision
   trees, labeled UI captures, and result comparisons. Keep each visual tied to
   a learning objective.
5. For a Skill showcase, separate the Skill contract, input fixture, local
   sandbox output, screenshot, acceptance check, and known limitations. Label
   a screenshot as `concept`, `local reproduction`, or `external runtime`
   according to the evidence actually available.

### Priority 3 — publish and maintain the reader as a product

1. Keep the static artifact bounded and inspectable. A framework can be added
   later if it consumes the existing navigation and locale contracts instead of
   replacing them with a second source of truth.
2. Add page metadata for title, description, locale, content family, last
   reviewed date, and edit/source link. Keep volatile product facts in dated
   research records with a next-review owner.
3. Add a release gate that distinguishes:
   - structural validation;
   - link and locale validation;
   - generated artifact validation;
   - browser visual validation; and
   - actual hosted Pages verification.
4. Record the deployment target, build command, output directory, and domain
   ownership in one deployment note. A locally generated Pages artifact is not
   evidence that GitHub Pages is enabled or live.

## 4. A practical page contract

The following is an original contract suitable for a Field Guide chapter or
case. It is intentionally content-focused and can be implemented in the
current Markdown/static-site architecture.

```text
front matter / identity
  content_id, locale, family, status, reviewed_at

reader header
  part -> chapter title -> one-sentence promise

orientation
  problem, audience, prerequisites, time, risk/permission boundary

teaching body
  concept -> decision -> smallest action -> observed result

evidence layer
  source links, local reproduction, screenshot/diagram, known limits

failure layer
  what commonly breaks, what the symptom means, recovery path

transfer layer
  acceptance checklist, next lab/case, next/previous chapter
```

This contract makes a chapter useful to a beginner, auditable to a reviewer,
and indexable by a future search or reader shell. It also prevents a visual
showcase from becoming a collection of attractive but unverifiable claims.

## 5. License and copying boundary

The following license observations are about the named source repositories as
observed on 2026-08-11. They do not grant permission to copy third-party
assets embedded in those repositories.

| Source | Repository-level license observed | Boundary for this study |
|---|---|---|
| WorkBuddyGuide at the fixed commit above | [MIT license](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/LICENSE) | Study structure and public behavior. Do not infer that banner art, fonts, icons, submitted cases, QR materials, or other embedded media are MIT-licensed without their own notice. |
| Docusaurus | [MIT license](https://raw.githubusercontent.com/facebook/docusaurus/main/LICENSE) | Use official documentation as a design reference; do not vendor its docs, theme assets, or source into this project without checking the applicable file/license. |
| VitePress | [MIT license](https://raw.githubusercontent.com/vuejs/vitepress/main/LICENSE) | The license covers the framework repository under its terms, not this project's adoption of another site's wording, theme, screenshots, or branding. |
| Astro Starlight | [MIT license](https://raw.githubusercontent.com/withastro/starlight/main/LICENSE) | Reuse the documented architectural idea only; inspect any copied implementation or asset separately. |
| mdBook | [Mozilla Public License 2.0](https://raw.githubusercontent.com/rust-lang/mdBook/master/LICENSE) | The license boundary is different from the MIT projects; this report copies no mdBook source. |
| Kubernetes website | [CC BY 4.0](https://github.com/kubernetes/website/blob/main/LICENSE) | Any future quotation, translation, screenshot, or adapted content needs its own attribution and asset review; repository structure alone is reference-only. |

For this repository, the safe default is **reference-only**: write original
explanations, diagrams, screenshots, and examples; cite the source that
informed the structural decision; and record any actual external asset or
copied code in [`docs/sources/asset-register.md`](../sources/asset-register.md)
before distribution. A project's open-source license does not automatically
clear its dependencies, user submissions, trademarks, photographs, fonts, or
third-party illustrations.

## 6. What this study does not prove

- It does not prove that any one framework is the right implementation for the
  Field Guide.
- It does not prove six-locale completeness for the current repository; that
  requires every registered content identity to have reviewed counterpart
  files and same-locale route checks.
- It does not prove that a local static artifact is deployed or reachable on
  GitHub Pages.
- It does not prove that a screenshot represents a real Skill runtime unless a
  reproducible local or external execution record accompanies it.
- It does not grant permission to copy external text, code, images, fonts,
  diagrams, brand language, or page templates.

## 7. Actionable next review

When this study is converted into implementation work, review these checks in
order:

1. Can a reader choose a locale on the home page and retain it through a TOC
   link, a chapter link, a lab link, search, and previous/next navigation?
2. Can a contributor locate the owner of a chapter, lab, case, image, source
   record, generated output, and validator within one or two clicks?
3. Does every chapter demonstrate a real decision or experiment, including a
   failure boundary and evidence limit?
4. Can a reader distinguish formal teaching, research evidence, a local
   reproduction, a conceptual mockup, and an unreviewed community report?
5. Can the release process prove structure, links, rendering, and hosted
   deployment separately?

Until those questions have evidence, the project should remain labeled
`candidate` rather than `production-ready`.

## Source list

All sources below were accessed on 2026-08-11.

1. [WorkBuddyGuide repository README at fixed commit](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/README.md)
2. [WorkBuddyGuide VitePress configuration at fixed commit](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/config.mts)
3. [WorkBuddyGuide sidebar source at fixed commit](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/docs/.vitepress/sidebar.ts)
4. [WorkBuddyGuide deployment notes at fixed commit](https://raw.githubusercontent.com/AlephAITech/WorkBuddyGuide/abd61e82188fc57ef542756312e06175fc70b8b0/DEPLOYMENT.md)
5. [WorkBuddyGuide published reader](https://workbuddy.homes/)
6. [mdBook `SUMMARY.md` format](https://github.com/rust-lang/mdBook/blob/master/guide/src/format/summary.md)
7. [mdBook reading guide](https://rust-lang.github.io/mdBook/guide/reading.html)
8. [Docusaurus sidebar](https://docusaurus.io/docs/sidebar)
9. [Docusaurus internationalization](https://docusaurus.io/docs/i18n/introduction)
10. [Docusaurus search](https://docusaurus.io/docs/search)
11. [Docusaurus versioning](https://docusaurus.io/docs/versioning)
12. [VitePress sidebar](https://vitepress.dev/reference/default-theme-sidebar)
13. [VitePress prev/next links](https://vitepress.dev/reference/default-theme-prev-next-links)
14. [VitePress internationalization](https://vitepress.dev/guide/i18n)
15. [Astro Starlight sidebar](https://starlight.astro.build/guides/sidebar/)
16. [Astro Starlight internationalization](https://starlight.astro.build/guides/i18n/)
17. [Astro Starlight site search](https://starlight.astro.build/guides/site-search/)
18. [Astro Starlight project structure](https://starlight.astro.build/guides/project-structure/)
19. [Kubernetes documentation home](https://kubernetes.io/docs/home/)
20. [Kubernetes supported documentation versions](https://kubernetes.io/docs/home/supported-doc-versions/)
21. [Kubernetes localization contribution guide](https://kubernetes.io/docs/contribute/localization/)
22. [The Rust Programming Language](https://doc.rust-lang.org/book/)
23. [Docusaurus license](https://raw.githubusercontent.com/facebook/docusaurus/main/LICENSE)
24. [VitePress license](https://raw.githubusercontent.com/vuejs/vitepress/main/LICENSE)
25. [Astro Starlight license](https://raw.githubusercontent.com/withastro/starlight/main/LICENSE)
26. [mdBook license](https://raw.githubusercontent.com/rust-lang/mdBook/master/LICENSE)
27. [Kubernetes website license](https://github.com/kubernetes/website/blob/main/LICENSE)

