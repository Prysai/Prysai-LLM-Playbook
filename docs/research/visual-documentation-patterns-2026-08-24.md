# Visual documentation patterns for the LLM Playbook

**Audit date:** 2026-08-24 (America/Los_Angeles)
**Status:** `candidate` / `source-study` / `reference-only`
**Scope:** Read-only review of three first-party documentation projects and one
accessibility standard to inform visual explanations, route clarity, responsive
media, and progressive enhancement.

## Executive decision

The project does not need a gallery of decorative diagrams. It needs a small
number of explanatory visuals that answer a reader's next question: *what do I
do first, what changes after this step, and what evidence should I keep?*

Adopt the following patterns:

1. Put one dominant first action before the repository index, then expose the
   longer route as a visible sequence with progress and previous/next controls.
2. Treat every diagram as a teaching component: a specific question, a short
   caption, a text explanation, and a route to the next practice step.
3. Make the static HTML/list explanation the baseline. JavaScript may add an
   interactive mind map, but the learning path, labels, and links must remain
   usable when the enhancement does not run.
4. Give images intrinsic dimensions, responsive sizing, meaningful alternative
   text, and a mobile composition that does not force a wide desktop graphic
   into a narrow viewport.
5. Keep heading IDs and content identities stable enough for shared links, while
   keeping the visible labels localizable.

These are design recommendations, not evidence that any pattern improves
learner completion, comprehension, retention, or search traffic. No learner
study, accessibility conformance audit, or cross-browser measurement was run
for this note.

## Method and boundary

The cited pages and repositories were fetched over HTTPS and their document
structure and source-visible markup were inspected on the audit date.
The review records patterns that are visible in the official materials; it does
not reproduce their prose, images, logos, source code, or visual identity. The
recommendations below are project-owned design decisions, not endorsements by
MDN, Rust, Docusaurus, or W3C.

## Sources and observations

### 1. MDN: a learning route with an explicit starting question

- Project source: [mdn/content](https://github.com/mdn/content) - the official
  source for MDN Web Docs content.
- Learning hub: [Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)
- Relevant page structure: [Structuring content with HTML](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content)

The learning hub describes a structured set of tutorials, then exposes a
specific "Don't know where to get started?" decision and separate "Getting
started modules" and "Core modules" routes. The core module page states
prerequisites and links the module's tutorials, challenges, and skill tests.

**Transferable pattern:** Give a new visitor one plainly named starting
question and one recommended route before showing the full catalogue. Keep
practice/checkpoints visible inside the route rather than treating them as a
separate repository index.

**Adopt:** Use the homepage's primary task card and the dynamic route map to
show `first task -> concept -> lab -> evidence`. Keep a compact "browse all"
entry below it.

**Do not copy:** MDN's information architecture, copy, or branding wholesale;
the Playbook is a smaller, evidence-oriented course and should preserve its own
five-unit beginner path.

### 2. MDN and W3C WAI: images explain, and captions/alternatives carry meaning

- MDN image lesson: [HTML images](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images)
- MDN responsive-media guide: [Using responsive images in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images)
- W3C guidance: [Images Tutorial](https://www.w3.org/WAI/tutorials/images/)

The MDN lesson makes image use part of a learning sequence: it includes
prerequisites, learning outcomes, `<figure>`/caption treatment, intrinsic
`width`/`height`, asset optimisation, and licensing. Its responsive-images guide
distinguishes a wide image that fits a desktop layout from a mobile composition
where the important detail may need a crop (the "art direction" problem), and
describes `srcset`/`sizes` as a way to choose an appropriate source.

The W3C tutorial classifies informative, decorative, functional, text, complex,
and grouped images. For a complex graph or diagram it requires a complete text
equivalent of the information, not merely a vague `alt` string. It also says
that the alternative depends on the image's purpose and surrounding context.

**Transferable pattern:** A diagram is not complete when its pixels look clear
on a desktop screen. Its caption should state what question it answers, its
alternative should identify the main relationship, and nearby text or a
disclosure should expose the full sequence/data for readers who cannot inspect
the graphic.

**Adopt:** Put each new teaching SVG in a semantic `<figure>` with a localized
`figcaption`, a concise localized alternative, and a text/list explanation. Give
the image intrinsic dimensions and constrain it with `max-width: 100%`. Check
the 1280px, 736px, 390px, and 360px layouts; use a mobile-safe arrangement or
an alternate crop only when the information hierarchy genuinely changes.

**Do not copy:** Do not place instructional text only inside an image, and do
not treat a generic filename or "diagram" as sufficient alternative text.

### 3. Rust Book (mdBook): a book shell with static chapter navigation

- Project source: [rust-lang/book](https://github.com/rust-lang/book)
- Published book: [The Rust Programming Language](https://doc.rust-lang.org/book/)
- First chapter: [Getting Started](https://doc.rust-lang.org/book/ch01-00-getting-started.html)

The published chapter HTML exposes the article content and a page-navigation
`nav` with `Previous chapter` and `Next chapter` links, including mobile
navigation anchors. The page also provides keyboard shortcuts and a table of
contents/search enhancement through scripts, while the chapter prose, headings,
code, and adjacent navigation are present in the document HTML itself.

**Transferable pattern:** A long-form course should retain orientation while a
reader scrolls: current unit, local table of contents, adjacent route controls,
and a mobile-friendly navigation affordance. Enhancement scripts can improve
search or shortcuts but should not be the only way to reach the next lesson.

**Adopt:** Let the reader shell expose the current content identity, in-page
headings, and locale-preserving previous/next links. Add a compact mobile
disclosure/list rather than relying on a wide desktop sidebar.

**Do not infer:** The presence of a polished book shell does not prove that its
course is effective for this project's learners. It is a structural reference,
not a learning-outcome benchmark.

### 4. Docusaurus: authorable diagrams and configurable heading maps

- Project source: [facebook/docusaurus](https://github.com/facebook/docusaurus)
- Diagram guide: [Diagrams](https://docusaurus.io/docs/markdown-features/diagrams)
- Heading/TOC guide: [Headings and Table of contents](https://docusaurus.io/docs/markdown-features/headings)
- Asset guide: [Assets](https://docusaurus.io/docs/markdown-features/assets)

Docusaurus documents Mermaid diagrams authored as a fenced block and also
describes a dynamic Mermaid component, theme configuration, and optional layout
engines. Its heading guide shows automatic h2/h3 table-of-contents entries,
explicit heading IDs, configurable heading ranges, and inline TOCs. Its asset
guide documents Markdown images, co-located assets, SVGs, themed images, and
alternative text in image examples. The docs site itself also exposes a skip-to-
content link.

**Transferable pattern:** Keep a diagram's source data separate from its
presentation, let the reader open a focused explanation, and make heading
structure do navigation work instead of adding a second unrelated menu.

**Adopt carefully:** A small project-owned data model can drive both a static
ordered list and an enhanced mind map. Stable IDs can connect a node to a
reader route; localized labels and explanations should come from the eight
locale dictionaries, not from an English fallback.

**Do not make Mermaid the baseline:** The official guide requires a theme/plugin
and JavaScript configuration for Mermaid. That makes it a useful authoring
reference, but not a sufficient accessibility or offline fallback for this
static site. A canvas-only map or a JavaScript-only graph would hide the course
route from readers when scripts, network assets, or assistive technology behave
differently.

## Project decisions

### Dynamic mind map

Use a progressive-enhancement component on the homepage:

- the HTML baseline is an ordered list of the six work-loop steps, with real
  locale-specific reader links;
- enhanced mode presents the same steps as keyboard-focusable buttons or links;
- the selected node updates a short localized explanation and an `aria-live`
  status, while `aria-pressed` or an equivalent state communicates selection;
- the component has a visible "read the sequence as text" fallback and does not
  require a drag gesture, hover, or animation to discover the route;
- reduced-motion preferences disable movement; focus remains visible;
- every node answers "what do I do next?" rather than merely naming a concept.

### Static teaching image

Add at most one new original loop diagram in the first implementation slice.
Register its provenance and dimensions in `assets/teaching/README.md`, then
embed it next to the route explanation rather than as a gallery tile. The
diagram should show the relationship among understanding, bounded framing,
action, inspection, repair, and transfer; the surrounding localized text must
remain sufficient if the SVG is not loaded.

### Verification boundary

Before calling the visual work release-ready, verify separately:

1. the static list works with JavaScript disabled or failed;
2. keyboard users can reach and operate every node without a pointer;
3. each locale keeps its own labels, reader paths, captions, and alternatives;
4. the image scales without horizontal scrolling at 390px and 360px;
5. a heading/route link remains valid after switching locale; and
6. `alt`, caption, text-equivalent, source, and license records are present.

The checks above establish implementation properties only. They do not establish
visual preference, accessibility conformance at every assistive-technology
combination, learner success, retention, or product-market fit.

## Review status

`source_inspected` / `candidate`. This note records design inputs for the next
implementation pass; it is not a deployment check, a visual screenshot report,
an independent accessibility audit, or evidence that the Playbook's current
visuals have passed the verification boundary above.
