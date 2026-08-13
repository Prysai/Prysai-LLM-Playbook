# Live documentation trust and provenance benchmark

**Accessed:** 2026-08-12 (America/Los_Angeles)
**Status:** candidate / reference-only research with a local three-page governance pilot
**Scope:** information architecture, version and update governance, search, multilingual state, examples and exercises, and reader-visible source/license boundaries in active first-party documentation repositories.
**Evidence boundary:** fixed repository URLs establish the inspected implementation at one revision. Hosted documentation is volatile. A repository license is a reuse-screening signal, not proof that every linked, generated, contributed, branded, or nested asset has the same terms. No external prose, code, schema, page template, workflow, image, or configuration was copied.
## Executive decision

The project already has credible machinery for navigation, locale identity,
search indexing, content status, volatile-fact impact, update ownership, URL
auditing, executable examples, and release evidence. Adding another index or a
framework migration would duplicate work.

The missing professional mechanism is a **page trust contract**: one validated
record that tells a reader and maintainer, for a specific canonical page:

```text
identity + maturity + applicability + fact risk + review window
         + authoritative sources + reuse boundary + known limitations
```

Today these facts exist in different layers, and some chapters state them in
different prose forms. The public reader can show source path and content
status, but it cannot yet resolve a uniform page-level answer to “what does this
page apply to, when was it checked, which sources support it, and what may be
reused?”

This record implements a deliberately narrow governance pilot for Chapters 1,
5, and 22 in `docs/governance/page-trust-registry.yaml`, with an independent
validator and negative fixtures. It does not change the reader UI or claim
coverage for all 22 chapters.

## Live source set

| ID | Active first-party source at fixed revision | Mechanism inspected | License boundary observed |
| --- | --- | --- | --- |
| G1 | GitHub Docs [`using-yaml-frontmatter.md` at `729fe5d`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/content/contributing/writing-for-github-docs/using-yaml-frontmatter.md) and [`frontmatter-schema.ts`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/src/content-linter/lib/linting-rules/frontmatter-schema.ts) | Page metadata controls version applicability and layout; the repository validates frontmatter against a schema instead of trusting free-form authoring. | Prose repository license is [CC BY 4.0](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/LICENSE); code is separately [MIT](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/LICENSE-CODE). Reference-only here. |
| M1 | MDN Content [`front-matter-config.json` at `8a10694`](https://github.com/mdn/content/blob/8a10694edf44bde124fa8f18af65651855f632dc/front-matter-config.json) | A closed metadata schema requires page identity fields and rejects unknown attributes. MDN's broader platform also separates compatibility data from explanatory prose. | [`LICENSE.md`](https://github.com/mdn/content/blob/8a10694edf44bde124fa8f18af65651855f632dc/LICENSE.md) distinguishes prose and code-example licenses. Exact assets and data require their own review. |
| K1 | Kubernetes Website [`data/releases/schedule.yaml` at `6b59857`](https://github.com/kubernetes/website/blob/6b59857681ff542e3eaae953bd9f34464f90a9af/data/releases/schedule.yaml) and [localization guide](https://kubernetes.io/docs/contribute/localization/) | Version lifecycle is structured data rather than repeated prose; localization is an owned workflow with language-specific maintenance, not a route-count claim. | Repository content license is [CC BY 4.0](https://github.com/kubernetes/website/blob/6b59857681ff542e3eaae953bd9f34464f90a9af/LICENSE). Examples, generated reference, brands, and linked material need separate review. |
| D1 | Docusaurus [`docs/versioning.mdx` at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docs/guides/docs/versioning.mdx) | Frozen versions are available, but first-party guidance explicitly warns that versioning increases build and contribution complexity and is often unnecessary. | Documentation is [CC BY 4.0](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/LICENSE-docs); software licensing differs. Reference-only. |
| S1 | Astro Starlight [`frontmatter.md` at `656ffd5`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/docs/src/content/docs/reference/frontmatter.md), [i18n](https://starlight.astro.build/guides/i18n/), and repository locale/search guides at the same revision | Per-page metadata, localization, and site search are distinct surfaces. A documentation shell provides capabilities, but project governance still decides status and truth. | Repository reports [MIT](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/LICENSE). Hosted prose, translated pages, plugins, and brand assets are not assumed reusable from that signal alone. |
| R1 | Rust Book [translation appendix at `9175448`](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/src/appendix-06-translation.md) and repository listings at that revision | The canonical book can route to translations while openly stating many are in progress; executable listings are maintained separately from narrative source. | Repository includes [MIT](https://github.com/rust-lang/book/blob/917544888a55e4da7109bdba8c88c893c0da70f4/LICENSE-MIT) and Apache-2.0 licensing. Linked translations are separate projects with separate terms and quality. |

The revisions above were retrieved from the source-owner GitHub repositories on
the access date. Repository activity is not evidence that every page is fresh.

## Comparative findings

### Information architecture: identity must survive every projection

GitHub Docs, MDN, and Starlight attach structured metadata to a canonical page
before navigation, search, layout, or version filtering presents it (G1, M1,
S1). Kubernetes similarly keeps version lifecycle in a canonical data source
(K1). The transferable rule is not “use YAML frontmatter”; it is that the same
page identity must connect source, navigation, search, locale, applicability,
and maintenance data.

This project already has content IDs, but IDs are split between page comments,
book navigation, locale matrix, and content status. A page trust record should
join those systems without making the prose header the new source of truth.

### Version governance: applicability is more useful than snapshot volume

GitHub Docs uses page metadata to define product-version applicability (G1).
Kubernetes needs structured supported-release data because multiple product
series are operated concurrently (K1). Docusaurus provides frozen versioning
but explicitly warns about its cost (D1).

The Field Guide should therefore record **scope and review date per volatile
page** before creating full frozen editions. Git tags plus commit-bound release
evidence preserve releases. Page applicability answers the reader's immediate
question with much less duplication.

### Search: relevance must retain status and locale boundaries

Starlight treats search as its own capability, while its page metadata and i18n
systems remain separate (S1). This project's generated search index already
retains content identity, locale availability, translation status, and content
status. The missing field is not more text to search; it is a link from a search
result to the page's trust contract so a result does not look current merely
because it is discoverable.

### Multilingual: a route is not a reviewed translation

Kubernetes assigns localization work to language communities (K1). Rust's
canonical book links external translations while stating that many remain in
progress (R1). Starlight can route localized content, but the framework cannot
certify translation quality (S1).

The project's locale matrix and English fallback are the correct foundation.
A trust contract should identify the canonical locale and applicability scope;
it must not turn route availability, machine translation, or source presence
into reviewed parity.

### Examples and exercises: provenance and execution are independent

Rust maintains code listings as separate artifacts (R1), while the previously
implemented executable-example registry in this project correctly separates
static presence, deterministic execution, learner runs, and transfer. Page
trust metadata should point to those evidence records where relevant, not
repeat or inflate their result.

### Sources and licenses: show a boundary, not a badge

The reviewed repositories demonstrate why “licensed” is too coarse. GitHub
Docs separates prose and code licenses (G1); MDN explicitly distinguishes prose
and examples (M1); Docusaurus separates documentation licensing from software
(D1); Rust uses dual licensing and links independently governed translations
(R1). A page needs both source provenance and a plain-language reuse boundary.
A license string alone is not enough.

## Gap audit against this repository

| Capability | Current evidence | Remaining gap |
| --- | --- | --- |
| Information architecture | Stable IDs, book navigation, reader source links | No single page-level record joins identity, maturity, applicability, review, sources, and reuse boundary. |
| Version/update governance | Update registry, fact-impact registry, release evidence | Review dates are mainly area-level or fact-level; readers cannot resolve the page's combined currency boundary. |
| Search | Generated dependency-free index with locale/status fields | Search discovery has no page provenance/trust object to expose later. |
| Multilingual | Six route tokens, locale matrix, explicit fallback | No page trust record states canonical locale and warns that routing is not translation review. |
| Examples/exercises | Labs and executable-example registry | A page-level trust record must reference, not duplicate, run evidence. Pilot pages make no runtime claim. |
| Sources/licenses | Asset register and research records | Boundaries are repository-wide and research-oriented; ordinary reader pages lack a consistent concise disclosure. |

## Implemented mechanism: page trust registry pilot

The pilot registry covers three deliberately different pages:

- Chapter 1: stable conceptual teaching with no product-version promise;
- Chapter 5: high-volatility product/surface guidance requiring official-source
  refresh before publication;
- Chapter 22: maintenance method that mixes stable governance principles with
  volatile examples.

Each record requires:

- exact content ID, canonical path, locale, and content maturity;
- applicability statement and controlled fact-risk class;
- owner, reviewed date, and future review date;
- at least one HTTPS source with access date, role, and explicit license
  boundary;
- page-level reuse boundary and known limitations.

The validator checks the registry schema, controlled values, unique IDs/paths,
real files, source URLs, dates, fixed GitHub blob revisions, the page's embedded
content identity, and exact status agreement with `content-status.yaml`.
Negative tests reject status inflation, missing sources, expired review dates,
unpinned GitHub blob URLs, and mismatched page identity.

The mechanism is intentionally not wired into the public reader yet. UI work
should happen only after the registry covers enough pages to avoid a trust card
that appears authoritative on three pages and silently disappears elsewhere.

## Admission path for full coverage

1. Review the pilot fields with curriculum, source, localization, and release
   owners.
2. Add remaining canonical English chapters in small risk-based batches:
   volatile platform pages first, stable conceptual pages second.
3. Reuse claim/source IDs from `fact-impact-registry.yaml` rather than copying
   official facts into the trust registry.
4. Generate a reader projection only when coverage is complete for the route
   being published; label partial coverage explicitly during development.
5. Add search-result trust signals only after user testing shows which fields
   help selection rather than create metadata noise.
6. Keep translation review and executable-example evidence in their existing
   canonical registries; link them by content identity.

## What not to implement

- Do not freeze all 22 chapters per release merely to look versioned.
- Do not put mutable “last updated” prose independently into every translation.
- Do not infer freshness from Git commit time; a page can change cosmetically
  without refreshing its product facts.
- Do not show a license badge that implies all linked examples, screenshots,
  translations, or external sources share one license.
- Do not call a page verified because its metadata validates.
- Do not expand search with unreviewed translations merely to increase result
  count.

## Claims and limitations

This benchmark supports the architectural judgment that a validated page trust
contract is the next missing documentation-engineering mechanism. The local
pilot proves only that three records conform to the declared static schema and
agree with current repository identity/status data.

It does not prove source correctness, page freshness beyond the recorded
review, license compatibility for adaptation, translation quality, search
quality, reader comprehension, runtime examples, deployed GitHub Pages state,
or production readiness. No upstream project was built locally.

## Freshness

| Source class | Recheck owner | Trigger |
| --- | --- | --- |
| Fixed repository implementations | documentation-engineering maintainer | before adapting a mechanism or six months after access |
| Hosted i18n/product guidance | relevant platform or locale owner | before publication, on broken link, or material product change |
| Repository/file license boundary | release/source owner | immediately before copying, adapting, vendoring, or public release |
| Page trust pilot | documentation-engineering maintainer | after schema review, before reader integration, or by 2026-09-12 |
