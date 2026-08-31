# Site visual and reading-experience upgrade audit

**Audit date:** 2026-08-11 (America/Los_Angeles)
**Status:** `candidate` / `project-audit` / `reference-only`
**Audit role:** site visual system and reading-experience review
**Repository state inspected:** `9566009 Publish the Field Guide reading surface`
**Write boundary:** this audit is the only file created for this task. No file
under `site/`, `README*`, `assets/`, or `examples/` was edited.

## Executive verdict

The project already has a credible visual point of view and unusually honest
evidence language for a learning repository. The Swiss-like editorial system in
`site/styles.css`, the explicit `candidate` / `draft` / `not_run` vocabulary,
the canonical chapter-order source, and the asset boundary notes are strong
foundations.

The main obstacle to a professional, highly bookmarkable documentation site is
not a lack of decoration. It is a mismatch between the visual surface and the
reader's next decision:

1. the homepage asks a new reader to choose among task entry points, levels,
   content types, repository layers, locales, research, and maintenance before
   giving one clearly dominant learning route;
2. the reader shell presents source metadata but not the book structure that
   makes a long chapter easy to navigate;
3. the same chapter order is not yet visibly expressed as a reader sidebar,
   progress indicator, and outer previous/next control;
4. prompts, code, screenshots, and evidence are not yet first-class teaching
   components with a consistent contract; and
5. the six-locale promise is structurally visible, but the effective language
   and content coverage are not yet equally truthful on every reader surface.

The recommended direction is a low-dependency, data-driven reading product:
keep the current static HTML/CSS/JavaScript approach, make one canonical
`content_id` plus locale map drive the homepage, reader, sidebar, and adjacent
navigation, and move governance detail below the primary learning path.

## Evidence boundary and method

This is a source audit, not a production usability study. I inspected the
current repository files and the existing project research records at the
commit named above. I also fetched the official documentation URLs listed in
the reference section on 2026-08-11; the pages were reachable and returned
HTTP 200 at that time.

This pass did **not** establish:

- a fresh browser rendering result for the local site;
- a fresh 320px, 390px, 200% zoom, screen-reader, print, or high-contrast run;
- a deployed GitHub Pages result, cache result, or cross-browser result;
- reader comprehension, task completion, conversion, or star growth;
- that any Skill was invoked to produce the existing case page or screenshots.

The local HTTP-server attempt for this pass did not produce a usable browser
session. The dated browser observations in
`docs/research/site-information-architecture-audit-2026-08-10.md` are treated
as prior evidence, not as a test rerun here. They should remain labelled with
their original date and scope.

External documentation below is used for structure and accessibility
principles only. No external prose, code, image, font, logo, or brand language
is copied into this report or recommended as a vendored asset.

## What is already working

| Strength | Current evidence | Why it matters |
|---|---|---|
| A deliberate visual anchor exists | `site/styles.css:1-18` defines a small palette, spacing token, shell width, Arial fallback, and text-rendering choices; `site/styles.css:33-80` establishes the header, hero, red action signal, and editorial grid. | The site has a recognizable system rather than an unstyled Markdown dump. |
| The homepage has a clear promise and a safe first task | `site/index.html:62-68` states the promise and links to “Start a 30-minute safe task”; `site/index.html:193-217` gives four steps and a task contract. | The raw learning intent is good; the issue is its position and competition with the index layer. |
| Status claims are more honest than typical showcase sites | `site/index.html:125-148` exposes `candidate`, `draft`, `not_run`, and locale fallback language; `site/index.html:376-378` defines the evidence boundary. | Trust is a product feature for this subject. Preserve it while making it easier to scan. |
| The repository has a navigation owner | `docs/governance/book-navigation.yaml:12-17` says the file owns chapter order and that the generated footer contains previous/next links. | This is the correct seam for a sidebar, progress state, and outer pagination. |
| Asset provenance is explicitly bounded | `assets/README.md:15-29` distinguishes a diagram from a screenshot and requires source, viewport, date, limits, alt text, and an asset-register record. | The project can add visuals without turning an attractive image into false evidence. |
| The examples are appropriately synthetic | `examples/README.md:3-15` and `examples/skill-sandbox/product-context-real-estate/README.md:3-15` state that the example is disposable, local, fictional, and not a live listing or production integration. | This is a strong teaching pattern for future Skill demonstrations. |
| Basic homepage accessibility hooks exist | `site/index.html:14` has a skip link; `site/styles.css:27-31` defines visible focus and skip-link behavior; `site/styles.css:323-326` handles reduced motion. | The existing baseline can be extended instead of replaced. |

## Priority summary

The filename suffix `p2` identifies this second-pass audit; the priority labels
below are severity labels for implementation ordering.

| Priority | Problem to solve | Main surfaces |
|---|---|---|
| P0 | A first-time reader cannot immediately see one dominant route from problem to chapter to practice. | Homepage navigation, hero, project index |
| P0 | The reader shell does not expose the book tree, current location, progress, or reliable outer previous/next controls. | `reader.html`, `reader.js`, `reader.css`, navigation data |
| P0 | Locale identity is not consistently carried by the reader URL and document metadata, while six locale entries are visibly offered. | Homepage selector, reader selector, locale manifest, links |
| P1 | Evidence, prompts, code, and cases are links or ordinary blocks rather than reusable teaching components. | Reader renderer, chapter Markdown, case pages |
| P1 | Visual assets are high-resolution originals but are not embedded into the learning sequence, and the reader's semantic figure support is incomplete. | `assets/`, `README.md`, `reader.js`, chapters |
| P1 | The information architecture mixes audience tasks, content types, and maintainer/governance destinations at the same navigation level. | Homepage header and index layer |
| P1 | Mobile and keyboard foundations exist on the homepage but are incomplete and unproven on the reader. | `reader.html`, `reader.css`, language control, tables/code |
| P2 | Visual tokens, captions, locale-ready artwork, print/zoom evidence, and release-level visual QA need a maintained contract. | Assets, QA scripts, Pages artifact |

## Findings and recommendations

### P0-01 — The homepage's first decision is diluted by the index layer

**Current evidence.** The main navigation has eight ungrouped links covering
tasks, time, levels, repository indexing, reading routes, labs, Skills, and
maintenance (`site/index.html:40-48`). The hero then gives four equal-weight
brief items—Project index, Evidence ledger, Six-language route, and Field
problems (`site/index.html:78-98`). The next section is the repository map and
status/locale/research panels (`site/index.html:106-175`), while the practical
“Start with the problem” and “first 30 minutes” route begins later
(`site/index.html:178-217`). The hero H1 can grow to 9.5rem
(`site/styles.css:60-65`), so brand scale visually competes with the first
action.

**Why this affects professionalism.** A mature documentation homepage usually
answers three questions quickly: what is this, where do I start, and what will I
be able to do. The current page answers “where is everything in the repository”
with equal or greater visual force. That is useful for maintainers but makes the
public surface feel like a project index before it feels like a course.

**Low-dependency change.** Reorder existing material rather than adding more:

```text
Header: Start a task | Learn by level | Browse chapters | Practice & cases | Evidence & maintenance | Language
Hero: promise + one primary task picker + one recommended first slice
Trust strip: candidate · 22 chapters · 13 labs · 7 Skills · locale coverage
Choose by problem: 4 real problems mapped to content_id
Recommended slice: chapter 1 → lab 011 → evidence gate → stop boundary
Choose by level: compact L0–L6 contracts
Practice and cases: labs, Skills, failures, local screenshots
Evidence & maintenance: status source, research boundary, update map
Footer: source locale, project boundary, contribution/check links
```

Keep the repository map and six-locale matrix, but make them secondary
orientation panels. A new reader should not need to learn the words “ledger,”
“route token,” or “content identity” before beginning.

**Acceptance evidence.** In a fresh browser session, a reader should be able to
answer “what is this?”, “what should I click first?”, and “what will I leave
with?” from the first viewport. Every primary card must expose one primary
action and a real `content_id`; counts and governance labels should not be the
only prominent content.

### P0-02 — The reader shell is a source viewer, not yet a book reader

**Current evidence.** `site/reader.html:13-29` provides a brand, back link, and
language select. `site/reader.html:33-48` renders an article plus an aside with
only Source path, Content identity, and an Open source file link. The layout is
article plus a 220px metadata column (`site/reader.css:83-88` and
`site/reader.css:191-195`). `reader.js` generates heading IDs
(`site/reader.js:247-253`), but there is no code that builds a table of contents,
marks the current chapter, or displays reading progress. The chapter footer is
embedded in source Markdown and recognized through the generated navigation
markers (`site/reader.js:207-216`); it is not an outer reader component.

**Why this affects professionalism.** Twenty-two chapters are a book-shaped
system. A reader needs stable orientation while reading a long page: part,
chapter number, current position, in-page headings, and adjacent chapters. A
source path and content ID are useful provenance, but they are maintainer
metadata, not navigation.

**Low-dependency change.** Use the already-authoritative
`docs/governance/book-navigation.yaml` as the only order source. Generate or
load a compact browser data file containing:

```text
part_id · chapter_id · number · title · canonical_path · locale paths · status
```

Then add these reader elements:

- a skip link to the article;
- a breadcrumb: Field Guide → Part → Chapter;
- a desktop `nav` with the current part and chapter list;
- a mobile `<details>` or disclosure-based “On this page” / “Chapters” control;
- a small `Chapter 4 of 22 · Part I` progress label;
- a generated in-page heading list from rendered `h2`/`h3` elements;
- an outer previous/next footer with one button at the beginning, two in the
  middle, and one at the end;
- `aria-current="page"` for the current chapter and a stable anchor for every
  heading.

The existing generated Markdown footer can remain as source fallback, but the
reader shell should own the visible pagination so a reader receives the same
behavior regardless of whether the page was reached from the homepage,
sidebar, search, or a shared URL.

**Acceptance evidence.** Test chapter 1, a middle chapter, a cross-part chapter,
and chapter 22. The visible sidebar, breadcrumb, progress label, and footer
must agree on chapter identity and order. The first page has only Next; the
middle has Previous and Next; the last has only Previous. The source path and
source link remain available but are visually secondary.

### P0-03 — Locale identity is exposed more widely than locale content is

**Current evidence.** The homepage exposes six language links
(`site/index.html:23-33`) and explicitly says EN/ZH UI is reviewed while other
locales use an English fallback (`site/index.html:137-148`). `app.js` correctly
uses URL language first, then local storage, then the default locale
(`site/app.js:196-204`), and it marks content fallback links
(`site/app.js:235-265`). However, the reader has a language select but its
labels are static in `reader.html:18-26`; `reader.js` chooses a localized path
or English fallback (`site/reader.js:308-315`) but does not set
`document.documentElement.lang` after choosing the effective locale. Its
`readerHref()` returns only `reader.html?path=...` (`site/reader.js:58-60`),
and the `load()` flow can derive locale from local storage
(`site/reader.js:325-347`).

**Why this affects professionalism.** A reader can arrive at a URL that
requests one locale while the page displays another. That is acceptable during
a stated migration only when the requested locale, effective locale, and
reason are explicit in the URL, banner, document language, title, and link
behavior. It is also an accessibility issue when assistive technology receives
the wrong language metadata.

**Low-dependency change.** Treat `content_id + locale` as the route identity:

1. Parse URL locale first; use storage only as a preference when the URL has no
   locale.
2. Preserve `lang` on every reader chapter, previous/next, source-return, and
   language-switch URL.
3. Set `document.documentElement.lang` to the effective locale, not merely the
   requested locale.
4. Display `Requested: Japanese · Showing: English · Translation: pending` (or
   the equivalent concise message) when a page falls back.
5. Use a visible language navigation group or a correctly implemented control;
   do not present incomplete locales as equivalent completed books.
6. Preserve a stable chapter anchor when the target locale has the same
   heading; otherwise land at the chapter top and say why.

**Acceptance evidence.** For a translated page and an untranslated page, check
the copied URL, refresh behavior, `html[lang]`, title, banner, effective source
path, previous/next links, and screen-reader name. A missing translation must be
visible without inspecting local storage or source code.

### P0-04 — The Pages artifact boundary needs one reader-facing route contract

**Current evidence.** `site/app.js:212-231` changes Markdown links into
`reader.html?path=...` only when `CODEX_PAGES_ARTIFACT` is enabled. In source
checkout mode, homepage links can remain direct `.md` links; in the generated
Pages artifact, the build script injects the mode flag
(`scripts/build_pages_artifact.py:35` and its validation checks at lines
73 onward). The homepage itself labels the site as a discovery layer in
`README.md:108-109`, while the reader labels its output a static reading view
(`site/reader.html:52-56`).

**Why this affects professionalism.** “Read chapter” and “open source file”
must not be visually or semantically interchangeable. A GitHub checkout, a
Pages artifact, and a raw Markdown source are different surfaces. If a user
shares a link, the recipient should land on a stable reading route rather than
on a server-dependent raw file response.

**Low-dependency change.** Define one route helper and one link vocabulary:

- `Read chapter` → reader route;
- `Open Markdown source` → source file;
- `View case evidence` → case page or asset with caption;
- `View status/source record` → governance artifact.

Have the artifact builder and local source mode use the same logical route
contract, even if the physical URL differs. Add a validation fixture for one
chapter, one lab, one case, one locale fallback, and one anchor.

**Acceptance evidence.** Run the existing Pages artifact check and inspect
links in both local/source mode and `_site` artifact mode. Every public reading
CTA must land on a readable page, and every source CTA must be labelled as
source. A 404 or raw Markdown response is a route failure, not a styling issue.

## P1 findings

### P1-01 — The project has a task contract, but not a reusable prompt/code card

**Current evidence.** The homepage already contains a useful contract with
Goal, Context, Inputs, Allowed actions, Acceptance, Evidence, and Stop when
(`site/index.html:206-217`). The reader renders fenced code as a plain
`<pre><code>` block (`site/reader.js:219-231`), with only language class support;
the CSS supplies overflow, background, border, and monospace styling
(`site/reader.css:137-152`). There is no copy action, expected output, failure
signal, or check instruction attached to the block.

**Recommendation.** Create one native “teaching card” pattern for prompts and
code:

```text
TASK / what job is being attempted
CONTEXT / files, facts, and assumptions
ALLOWED / read, edit, run, external effects
PROMPT or CODE / copyable block with language label
EXPECTED / what a useful result should visibly contain
FAILURE SIGNAL / what means stop or recover
CHECK / the smallest acceptance command or observation
BOUNDARY / what this artifact cannot prove
```

Use a native button and `navigator.clipboard` with a small fallback; announce
copy success or failure through `aria-live`. Keep syntax highlighting optional:
language labels, line wrapping choices, and clear output states are more
valuable than a large dependency for this project.

**Acceptance evidence.** Every featured prompt/code block has a task label,
language or format label, copy feedback, expected output, failure signal, and
one check. A reader can use the card without guessing which surrounding prose
is part of the prompt.

### P1-02 — Evidence is described globally but not attached to the reading unit

**Current evidence.** The homepage status ledger and evidence-boundary section
are separate from most chapter actions (`site/index.html:125-135` and
`site/index.html:376-378`). The asset guidance says a screenshot proves only
recorded rendering conditions (`assets/README.md:15-20`), and the real-estate
example records what the page can and cannot prove
(`examples/skill-sandbox/product-context-real-estate/context-draft.md:63-104`).
The reader aside currently exposes only path and content identity
(`site/reader.html:38-48`).

**Recommendation.** Add a compact evidence card to chapters, labs, and cases:

```text
STATUS       candidate / draft / verified / production-ready
THIS PROVES  the exact claim supported here
SOURCE       file, URL, revision, or screenshot record
CONDITIONS   viewport, date, version, permissions, input
NOT PROVED   the adjacent claim readers might infer
NEXT CHECK   the smallest missing observation
```

Keep the full governance record in `docs/`; the reader card is a plain-language
summary linked to the canonical record. Never communicate status with color
alone; pair the badge with text and a sentence.

**Acceptance evidence.** A reader can distinguish content maturity, lab run
status, translation status, and claim/evidence status. A screenshot card cannot
be mistaken for live Skill execution, customer approval, or production proof.

### P1-03 — High-quality visual assets are indexed, not taught in sequence

**Current evidence.** The repository contains a README header SVG, four teaching
SVGs, and one desktop case screenshot. The assets are large enough for reuse:
the teaching diagrams use a 1600×900 viewBox, the header uses 1600×480, and
`assets/cases/product-context-real-estate-desktop.png` is 1425×1089. The SVGs
have accessible `title` and `desc` elements, for example the header
(`assets/readme/codex-field-guide-header.svg:1-3`) and teaching cards
(`assets/teaching/model-choice-is-a-test.svg:1-3`).

The homepage places the teaching diagrams and case behind links rather than
embedding them (`site/index.html:163-172`), and the root README also primarily
links to them (`README.md:50-58`). The case evidence is desktop-only; no mobile
capture or standardized caption appears in the public entry points.

**Recommendation.** Use the assets at the moment where the reader needs the
relationship they explain:

- Chapter 6: model-choice diagram immediately before the smoke-test exercise.
- Chapter 8: lifecycle diagram beside the checkpoint exercise.
- Chapter 9: evidence/recovery ladder beside the “first missing proof” case.
- Chapter 11: Skill-output diagram before the Skill builder lab.
- Case page: screenshot beside the synthetic brief and a visible evidence card.

Use semantic `<figure>` / `<figcaption>` with concise alt text, a source link,
creation/access date, viewport for screenshots, and an explicit limitation.
Use SVG for mechanism diagrams and PNG/WebP for captured browser states. Add a
mobile case image only after capturing it from the same source and recording the
viewport; do not crop a desktop screenshot and call it mobile evidence.

**Acceptance evidence.** Each image appears in a teaching sequence, has a
caption and accessible alternative, identifies whether it is a diagram or case
evidence, and links to its provenance. A fresh reader can understand why the
image is present without opening the asset directory.

### P1-04 — Figure semantics are recognized but not preserved by the reader sanitizer

**Current evidence.** The Markdown block detector recognizes `figure` in
`site/reader.js:151-153` and `site/reader.js:234-245`. However, the sanitizer's
allowed element set at `site/reader.js:155-158` contains `img` but not
`figure` or `figcaption`. The result can flatten a future figure wrapper and
caption into ordinary children, weakening semantics and styling hooks.

**Recommendation.** Extend the reader's allow-list and tests for `figure` and
`figcaption`, then retain only the attributes needed by the project. Add a
fixture containing a figure, caption, alt text, local image, external image
rejection, and a source link. This is a small native change and does not require
a Markdown framework.

**Acceptance evidence.** The rendered DOM contains a `figure` with a readable
`figcaption`; the image has non-empty alt text; unsafe attributes remain
removed; and the caption remains associated when JavaScript renders the source.

### P1-05 — The header mixes audience tasks, content types, and maintainer work

**Current evidence.** The eight links in `site/index.html:40-48` mix “Start with
a problem,” “First 30 minutes,” and “Learning path” with “Project index,”
“Reading routes,” “Labs,” “Skills,” and “Update map.” The project map itself is
well documented in `README.md:36-48` and `docs/project-map-EN.md`, but that
maintainer orientation is currently promoted into the public header.

**Recommendation.** Group the same destinations by user intent without adding
a framework:

```text
START       Start a task · First 30 minutes
LEARN       By level · Chapters
PRACTICE    Labs · Skills · Cases
TRUST       Evidence · Updates · Sources
```

On desktop, use four grouped labels or four compact links. On mobile, preserve
the same groups in the disclosure menu. Keep “Project map” and raw source paths
in a secondary “For contributors” area.

**Acceptance evidence.** A reader looking for a chapter, a lab, a case, or a
status record can predict the group before scanning the destination list. The
header contains no more than one primary action per group, and no maintainer
destination competes with “Start a task.”

### P1-06 — Mobile and keyboard foundations are asymmetric

**Current evidence.** The homepage has responsive breakpoints at 800, 480, and
360px and a reduced-motion rule (`site/styles.css:266-326`). The reader only
collapses its two-column layout at 820px and changes width/table behavior at
520px (`site/reader.css:202-218`). `reader.html` has no skip link
(`site/reader.html:12-33`), no current chapter navigation, and no reader-level
focus contract. The language selector on the homepage is a `div role="listbox"`
containing links with `role="option"` (`site/index.html:23-33`), which is a
navigation list being described as a widget without implementing the complete
listbox interaction model.

**Recommendation.**

- Add the same skip-link pattern to the reader.
- Use a normal language navigation list when each option is a link, or implement
  a complete keyboard listbox; the simpler navigation list is preferable here.
- Add `aria-current="page"` to the current chapter and a visible current
  position.
- Ensure every interactive target is at least 24×24 CSS px; prefer comfortable
  40–44px controls on touch surfaces.
- Give horizontally scrollable tables and code blocks a visible context label;
  do not rely on a reader discovering a scrollbar.
- Test long English, Chinese, Japanese, and Korean labels at 320px and 390px.
- Test keyboard order through skip link → header → language → chapter nav →
  content → copy buttons → previous/next → source link.

**Acceptance evidence.** A keyboard-only user can reach every action and see
focus. A 320px-wide viewport does not require two-dimensional scrolling for
ordinary prose. Tables/code may scroll horizontally only where their content
requires it and must announce that context. The reader remains understandable
when language labels expand.

## P2 findings

### P2-01 — The visual language is coherent in principle but inconsistent across asset families

**Current evidence.** The site uses paper/ink/Swiss red tokens
(`site/styles.css:1-18`), while the four teaching cards use deep blue/teal,
cream/red, and multicolor checkpoint palettes. The real-estate screenshot is a
separate case surface. Each individual SVG is carefully composed, but there is
no shared asset token document defining title scale, caption scale, red/action
use, status colors, border radius, or evidence labels.

**Recommendation.** Keep the distinct teaching-card palettes where they carry
meaning, but standardize the surrounding language:

- one title/eyebrow/caption scale;
- one `diagram`, `case evidence`, `candidate`, and `not proved` label style;
- one caption format and source line;
- one status vocabulary shared by HTML, README, SVG footer text, and case pages;
- one minimum contrast rule and one long-label rule;
- one image width and crop policy for README, homepage, reader, and mobile.

Do not add another glass, neon, or decorative material system. The current
editorial grid and evidence rail are enough visual identity if their hierarchy
is consistent.

**Acceptance evidence.** A reader can identify whether an image is a mechanism
diagram or a rendered case before reading its body. A new asset can be added by
following a short checklist instead of inventing a new palette and caption
style.

### P2-02 — Screenshot evidence needs a responsive pair and a stable caption contract

**Current evidence.** The only raster case asset is
`assets/cases/product-context-real-estate-desktop.png` at 1425×1089. The case
README describes a local static page and a recorded browser screenshot
(`examples/skill-sandbox/product-context-real-estate/README.md:17-37`), and the
context draft explicitly limits the claim to rendering
(`examples/skill-sandbox/product-context-real-estate/context-draft.md:63-104`).

**Recommendation.** Keep the desktop image, and add a separately captured
mobile image only when there is a real mobile run. Put both in a case figure
with:

```text
Artifact: local static page
Viewport: 1425×1089 or recorded browser viewport
Captured: YYYY-MM-DD
Source: exact sandbox path and revision
Proves: rendered state under those conditions
Does not prove: Skill execution, user preference, inventory, conversion, or production readiness
```

The screenshot itself should not carry more claims than the nearby caption. A
thumbnail can link to the full image; do not make readers inspect a 1425px
image inside a narrow column.

### P2-03 — Accessibility and visual QA need an explicit release matrix

**Current evidence.** The homepage includes focus and reduced-motion CSS, but
the repository has no source evidence in the inspected site files for 200%/400%
zoom, print, forced-colors, screen-reader reading order, 320px reflow, or the
reader's complete keyboard loop. The existing dated review is scoped and
candidate, not a release sign-off.

**Recommendation.** Add a release-readiness validator or script output (without making
the audit itself claim it has passed) covering:

| View | Required observation |
|---|---|
| 1440px desktop | Hero hierarchy, sidebar/aside alignment, long code/table behavior |
| 820px | Reader nav collapse and content order |
| 390px / 320px | No ordinary-prose two-axis scrolling; labels and controls remain usable |
| 200% zoom | Reading order, no clipped CTA, no hidden current chapter |
| Keyboard | Visible focus, skip link, menu/language, sidebar, copy, pagination |
| Screen reader | Correct heading hierarchy, landmarks, language, current page, live feedback |
| Reduced motion | No required information depends on transition or scroll animation |
| Forced colors / high contrast | Status and focus remain distinguishable by text and structure |
| Print | Chapter content and source/citation context remain legible |
| Pages artifact | Route, asset, locale fallback, and source links work after packaging |

Record date, browser/viewport, commit, scope, and failures. Do not turn a
single screenshot into a general accessibility claim.

## Recommended target structure

### Homepage

```text
1. Header
   Start a task | Learn by level | Browse chapters | Practice & cases
   Evidence & maintenance | Language

2. Hero
   What the guide is
   Primary: choose a real problem
   Secondary: start the first safe task
   Compact status/evidence strip

3. Recommended first slice
   Chapter 1 → Lab 011 → four evidence types → stop boundary

4. Choose by problem
   Four to six cards, each with one content_id and one primary action

5. Choose by level
   L0–L6 contract: audience, prerequisite, time, output, evidence, stop

6. Browse capabilities
   Chapters, labs, Skills, cases, and evaluations grouped by capability

7. Evidence and maintenance
   Status source, field reports, asset register, update map, next review

8. Footer
   English source, locale coverage, repository map, contribution/check links
```

### Chapter reader

```text
Skip to content
Breadcrumb: Field Guide / Part I / Chapter 4
Chapter 4 of 22 · candidate · English source

Desktop sidebar: part groups → chapters → current aria-current
Mobile disclosure: Chapters / On this page
Main article: objective → concept → action → evidence → failure → reflection
Teaching card: prompt/code/output/check/boundary
Evidence card: status/proves/source/conditions/not proved/next check
Footer: Previous chapter | Table of contents | Next chapter
Secondary: Open Markdown source
```

### Canonical data seam

The existing `docs/governance/book-navigation.yaml` should remain the chapter
order owner. Do not make the homepage, Markdown footer, reader sidebar, and
search index each maintain a separate hand-authored order. Extend the existing
generated data path or add one small generated reader data artifact with:

```text
content_id
kind: chapter | lab | skill | case | research
locale
canonical_path
display_title
part
sequence
status
translation_status
source_revision
next_review
```

Learning-level ownership should continue to live in the learning-path source;
translation identity should continue to live in the locale matrix; content
order should continue to live in the navigation source. This separation keeps
the site maintainable and prevents a visual redesign from creating a second
governance system.

## Official reference notes

The following are first-party documentation or standards pages accessed on
2026-08-11. They are reference-only: they support design principles, not claims
that this project uses those frameworks or has achieved their behavior.

| Source | Relevant official point | Transfer to this project |
|---|---|---|
| [Docusaurus sidebar](https://docusaurus.io/docs/sidebar) | An ordered sidebar groups related documents and can provide document pagination; generated sections still need deliberate order and structure. | Use one explicit chapter tree to drive sidebar and previous/next. |
| [Docusaurus internationalization](https://docusaurus.io/docs/i18n/introduction) | Locale-aware content and UI are separate concerns; translated files live in locale-specific locations and the system supports locale routing. | Keep UI locale, body translation, route identity, and fallback status separate. |
| [VitePress sidebar](https://vitepress.dev/reference/default-theme-sidebar) | The default theme supports explicit and path-scoped sidebars with active-page context. | Add a visible current chapter and part context to the reader. |
| [VitePress prev/next links](https://vitepress.dev/reference/default-theme-prev-next-links) | Adjacent page links can be configured or inferred from the sidebar order, with configurable labels. | Generate outer chapter pagination from the same order source. |
| [VitePress i18n](https://vitepress.dev/guide/i18n) | Locale configuration establishes labels and HTML language metadata; locale links can point to equivalent paths. | Preserve locale in the URL and set effective `html lang`. |
| [Material for MkDocs navigation](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/) | Navigation can express sections, breadcrumbs/path, expansion, and table-of-contents behavior. | Separate global route navigation from in-page headings and expose both at appropriate widths. |
| [Material for MkDocs language switching](https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/) | Language switching is a visible navigation concern, not merely a content-file convention. | Make incomplete locale state visible and usable in the reader. |
| [GitHub Docs frontmatter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter) | Page metadata can define titles, short titles, children, layout, versions, and redirects. | Keep reader metadata machine-readable and stable even if display titles change. |
| [GitHub Docs content structure](https://github.com/github/docs/blob/main/content/README.md) | The repository separates content organization and navigation concerns and documents how content is assembled. | Keep the repository map, canonical sources, and public reading route distinct. |
| [WCAG 2.2 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Ordinary content should reflow at a width equivalent to 320 CSS pixels without two-dimensional scrolling, except content that inherently needs it. | Test prose, navigation, cards, tables, and code separately at 320px. |
| [WCAG 2.2 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Keyboard users need a visible focus indicator for focusable items. | Extend the homepage focus baseline to reader navigation, language, copy, and pagination. |
| [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Pointer targets are at least 24×24 CSS pixels except for stated exceptions. | Use 24px as a floor and larger touch controls where practical. |

## Implementation sequence

This order minimizes rework and keeps each change reviewable:

1. **Navigation data and route contract.** Validate `content_id`, locale,
   sequence, chapter boundary, reader route, and Pages artifact links.
2. **Reader shell.** Add skip link, breadcrumb, chapter sidebar, current state,
   in-page TOC, progress, and generated previous/next.
3. **Homepage hierarchy.** Reorder existing sections, group navigation by
   intent, and make the first vertical slice the dominant route.
4. **Teaching components.** Add evidence cards and prompt/code cards using
   native HTML, CSS, and JavaScript.
5. **Asset integration.** Embed the existing diagrams at the relevant chapters;
   add figure semantics, captions, alt text, and provenance links.
6. **Responsive and accessibility QA.** Run the release matrix at 1440, 820,
   390, 320, 200% zoom, keyboard, screen reader, reduced motion, forced colors,
   print, and Pages artifact modes.
7. **Only then consider polish.** Adjust type scale, spacing, and crop rules
   from rendered evidence; do not add visual effects to compensate for route or
   hierarchy problems.

## Final acceptance checklist

### Information architecture

- [ ] A first-time reader can identify the guide, first action, expected output,
      and evidence boundary from the first viewport.
- [ ] Header groups task, learning, practice, and trust destinations without
      mixing maintainer paths into the primary reader route.
- [ ] Homepage cards, level panels, chapter lists, cases, and search results
      resolve to the same `content_id` rather than duplicated prose.
- [ ] Repository map and governance details remain discoverable but secondary.

### Reader navigation

- [ ] The desktop reader has a chapter sidebar and in-page heading navigation.
- [ ] The mobile reader has a usable disclosure-based chapter/TOC control.
- [ ] Breadcrumb, progress, current chapter, sidebar, and footer agree.
- [ ] First, middle, cross-part, and last chapter pagination are tested.
- [ ] “Read” and “Open source” have different labels and route contracts.

### Locale and content truth

- [ ] URL locale wins over stored preference; effective locale is reflected in
      `html lang`, title, banner, and selected control.
- [ ] Missing translations visibly identify requested and effective language.
- [ ] Chapter, lab, Skill, case, and source links preserve locale and stable
      identity where a target exists.
- [ ] The project does not call a route token a completed translation.

### Teaching and evidence

- [ ] Every featured prompt/code block states task, context, allowed action,
      expected result, failure signal, check, and boundary.
- [ ] Every case and screenshot states viewport, date, source, proves, and does
      not prove.
- [ ] Every diagram has a meaningful alt/caption pair and appears next to the
      concept it teaches.
- [ ] Status is communicated with text and structure, not color alone.

### Responsive and accessible behavior

- [ ] Reader has a skip link, landmarks, visible focus, and a complete keyboard
      path.
- [ ] Language control semantics match its behavior.
- [ ] Ordinary prose reflows at 320px; tables/code have explicit overflow
      context.
- [ ] Controls meet the 24px minimum target size and use comfortable touch
      spacing.
- [ ] 200% zoom, reduced motion, forced colors, print, and screen-reader order
      have dated evidence.

### Release boundary

- [ ] `scripts/build_pages_artifact.py --check` passes.
- [ ] The local/source and Pages artifact routes are both checked.
- [ ] The final visual review records commit, browser, viewport, date, and
      failures; it does not promote `candidate` to `verified` without the
      declared evidence.

## Sources and evidence records

### Local project evidence

- `site/index.html:14-48, 57-175, 178-217, 263-382`
- `site/styles.css:1-80, 266-326, 328-390`
- `site/reader.html:13-57`
- `site/reader.js:47-60, 129-187, 207-245, 247-264, 299-363`
- `site/reader.css:81-218`
- `site/app.js:196-271, 299-358`
- `docs/governance/book-navigation.yaml:1-17, 49-158`
- `README.md:36-58, 93-109, 111-165, 167-197`
- `assets/README.md:15-29`
- `examples/README.md:3-15`
- `examples/skill-sandbox/product-context-real-estate/README.md:3-40`
- `examples/skill-sandbox/product-context-real-estate/context-draft.md:63-104`
- `docs/research/site-information-architecture-audit-2026-08-10.md` (prior
  dated site review; not rerun in this pass)
- `docs/research/book-navigation-architecture-study-2026-08-11.md` (prior
  structure study; reference-only)
- `docs/research/tutorial-architecture-benchmark-p2-2026-08-11.md` (existing
  benchmark; not edited in this pass)

### Evidence boundary for this report

The report supports a code- and structure-grounded upgrade plan. It does not
support a claim that the proposed changes have been implemented, that the site
is accessible in every tested sense, that the Pages deployment is live, or that
the project will receive more stars. Those claims require the acceptance matrix
to be run after implementation and recorded with fresh evidence.
