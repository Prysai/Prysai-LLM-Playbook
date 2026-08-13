# Public documentation social-preview delivery benchmark

**Accessed:** 2026-08-12 (America/Los_Angeles)

**Status:** candidate / reference-only; pre-implementation benchmark with a dated implementation note

**Scope:** GitHub Pages delivery, canonical URLs, Open Graph images, Twitter/X cards, raster dimensions, metadata generation, and artifact-level validation in active first-party projects.

**Change boundary:** this research did not modify visual assets, site metadata, the page-trust registry, Skills, workflows, or Git.
**Reuse boundary:** no external prose, source code, templates, tests, images, configuration, or brand expression was copied. Repository and file licenses below are screening records; linked assets, hosted pages, trademarks, generated output, and contributions may have different terms.

## Executive decision at research time

At the pre-implementation snapshot taken for this research, the social-preview implementation was not release-ready. Both
`site/index.html` and `site/reader.html` request a large card but provide only:

```html
<meta property="og:image" content="../assets/readme/codex-field-guide-header.svg" />
<meta name="twitter:card" content="summary_large_image" />
```

The referenced file is a `1600 x 480` SVG designed as a README header, not a
social card. The pages lack canonical URLs, `og:url`, `twitter:image`, image
type, dimensions, and alt metadata. The Pages artifact check proves that files
were copied and internal routes are structurally usable; it does not prove
that a crawler can resolve an absolute public URL, fetch a supported raster,
or render the expected card.

The minimum professional fix is one project-owned `1200 x 630` PNG, a canonical
production origin, a single metadata generator for the root/site/reader
entries, and an artifact validator that parses the generated HTML and image
bytes. Do not hand-edit three independent head blocks.

## Fixed source register

| ID | First-party source at fixed revision | Observed mechanism | License boundary |
| --- | --- | --- | --- |
| G1 | GitHub Docs [`assets/images/social-cards/default.png` at `729fe5d`](https://github.com/github/docs/blob/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/assets/images/social-cards/default.png) and its [social-card directory](https://github.com/github/docs/tree/729fe5d6b03b2c9a01e91a8d203b4b4c349d300b/assets/images/social-cards) | A default plus product-specific raster-card set. The inspected default is PNG, `1200 x 628`, 6,813 bytes. The live docs head returned absolute `og:image` and `twitter:image` URLs on the access date. | Repository prose is CC BY 4.0 and code is separately MIT. Image/trademark scope requires exact review. The asset is measurement/reference only and was not copied. |
| D1 | Docusaurus [`docusaurus.config.ts` at `3f483e8`](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/docusaurus.config.ts), [classic template config](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/examples/classic/docusaurus.config.js), and [social-card JPEG](https://github.com/facebook/docusaurus/blob/3f483e80e326cc646b54b83d564b3f0c4881b9a6/website/static/img/docusaurus-social-card.jpg) | Production `url`, deployment `baseUrl`, and a raster social image are configured together. The inspected JPEG is `1200 x 675`; the live page emitted absolute canonical, `og:url`, `og:image`, and `twitter:image`. | Documentation is CC BY 4.0; framework code is separately licensed. The card and configuration are not imported. |
| S1 | Starlight [`utils/head.ts` at `656ffd5`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/packages/starlight/utils/head.ts), [`format-canonical.test.ts`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/packages/starlight/__tests__/basics/format-canonical.test.ts), and [`omit-canonical.test.ts`](https://github.com/withastro/starlight/blob/656ffd54e5b27483f542c9eb8b12fd32f44372ae/packages/starlight/__tests__/basics/omit-canonical.test.ts) | Canonical and `og:url` are derived only when the production site origin exists; path formatting is tested across output modes; omission without site configuration is also tested. The live site used an absolute raster `og:image`. | Repository reports MIT. Hosted documentation, cards, plugins, and brand expression remain separate review surfaces. |
| N1 | Next.js [`metadata and OG images` at `fef4c28`](https://github.com/vercel/next.js/blob/fef4c28bba9f080fce9687a7a8ee7ac3784de57e/docs/01-app/01-getting-started/14-metadata-and-og-images.mdx), [`opengraph-image` reference](https://github.com/vercel/next.js/blob/fef4c28bba9f080fce9687a7a8ee7ac3784de57e/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.mdx), and [metadata-image test](https://github.com/vercel/next.js/blob/fef4c28bba9f080fce9687a7a8ee7ac3784de57e/test/e2e/app-dir/metadata-image-files/metadata-image-files.test.ts) | Static or generated raster images, explicit `1200 x 630` examples, MIME/dimensions/alt metadata, separate Twitter image support, build-time size limits, and browser tests for generated image sources. | Repository reports MIT. Documentation examples remain reference-only here; no framework migration is proposed. |
| J1 | Jekyll SEO Tag [`image_drop.rb` at `9eb0368`](https://github.com/jekyll/jekyll-seo-tag/blob/9eb0368516cd14539fa102fc52d88e634d0070dc/lib/jekyll-seo-tag/image_drop.rb) and [`drop.rb`](https://github.com/jekyll/jekyll-seo-tag/blob/9eb0368516cd14539fa102fc52d88e634d0070dc/lib/jekyll-seo-tag/drop.rb) | Canonical pages and image paths are normalized to absolute URLs using the site/page context instead of leaving crawler interpretation to relative HTML. | Project reports MIT. The Ruby implementation was inspected, not adapted. |
| O1 | [Open Graph protocol](https://ogp.me/) | The basic graph requires title, type, image, and URL; structured image properties include URL, MIME type, width, height, and alt text. | Hosted specification is cited as an interoperability reference. No claim is made about every crawler's support. |

Live page inspection on the access date found:

- GitHub Docs: absolute `og:image` and `twitter:image`;
- Docusaurus: absolute canonical, `og:url`, `og:image`, and `twitter:image`;
- Starlight: absolute canonical, `og:url`, raster `og:image`, and image alt;
- Next.js Docs: absolute canonical plus matching absolute Open Graph and Twitter
  image routes.

Live output is volatile and is not a substitute for the pinned implementation
records.

## What the mature systems have in common

### 1. Production origin and deployment path are input data

Docusaurus separates production origin from `baseUrl` (D1). Starlight refuses
to synthesize canonical/`og:url` without a configured site (S1). Jekyll SEO Tag
resolves images and pages against site/page context (J1).

The transferable principle is that a canonical or share URL must be generated
from a declared deployment identity. It must not be guessed from local paths,
the current working directory, or a relative asset reference.

### 2. A share card is a raster deliverable

The inspected GitHub Docs default is `1200 x 628` PNG; Docusaurus uses
`1200 x 675` raster cards; Next.js demonstrates `1200 x 630` PNG generation and
supports raster image file conventions (G1, D1, N1). These projects do not rely
on an arbitrary README SVG as their only social image.

`1200 x 630` is the appropriate project contract: it is explicit, testable,
close to the common 1.91:1 crop, and supported by an active first-party
framework example. This report does not claim it is the only valid dimension.

### 3. Metadata is generated as a set

Starlight and Next.js produce related tags from one route/site configuration
(S1, N1). A large-card declaration without `twitter:image` is incomplete. An
image without canonical page identity leaves duplicates and deployment aliases
unresolved.

A bounded set for this project is:

```text
canonical
og:type, og:title, og:description, og:url
og:image, og:image:type, og:image:width, og:image:height, og:image:alt
twitter:card, twitter:title, twitter:description, twitter:image, twitter:image:alt
```

The title/description can share canonical content, but the generator should
write the actual tags and test that every public entry has exactly one of each
required identity field.

### 4. Generated head output and image bytes are tested

Starlight tests canonical inclusion, omission, override, and output formatting
(S1). Next.js tests generated metadata image sources and has build-time image
constraints (N1). This is stronger than testing only source markup.

The Field Guide must validate the built `_site` artifact, because the root
entry is synthesized by `build_pages_artifact.py` and contains a `<base>` tag
that is absent from `site/index.html`.

## Pre-implementation Field Guide failure audit

The table below records the state inspected before the 2026-08-12 implementation. It is retained as decision evidence, not as a claim about the current worktree.

### Confirmed source/artifact failures

| Finding | Current evidence | Consequence |
| --- | --- | --- |
| Relative Open Graph image | All three built entries retain `../assets/readme/codex-field-guide-header.svg`. | The metadata does not itself identify an absolute public resource; correct resolution depends on document URL, `<base>`, and deployment path. |
| SVG instead of bounded raster | The file is SVG with `viewBox="0 0 1600 480"`. | Crawler support and rasterization are delegated externally; there is no byte-level PNG/JPEG dimension/MIME contract. |
| Wrong composition ratio | `1600:480` is 3.33:1, not the intended 1.91:1 large-card surface. | Likely crop, letterbox, small type, or fallback behavior even when fetched. |
| No canonical | Root, source site, and reader heads contain no canonical link. | Public aliases cannot declare one preferred URL. |
| No `og:url` | No inspected project entry declares it. | Open Graph page identity is incomplete. |
| No `twitter:image` | Only `twitter:card=summary_large_image` exists. | The large-card request has no Twitter-specific image declaration. |
| No image properties | MIME, width, height, and alt are absent. | Consumers receive less deterministic information; validators cannot compare tag claims to image bytes. |
| No production-origin contract | Pages workflow builds `_site`, but metadata generation takes no public origin/base-path input. | A local artifact cannot prove the final Pages URL or custom-domain identity. |
| No artifact social check | `build_pages_artifact.py` checks copied files, sensitive leaks, base routing, search, and accessibility integrity only. | Green artifact build can coexist with broken share metadata. |

### Risks, not confirmed crawler failures

- The relative SVG might resolve to the intended asset on a particular Pages
  URL because the inserted root `<base href="site/">` and repository path happen
  to align. That is not an absolute metadata contract.
- Some crawlers may support SVG; others may reject, rasterize differently, cache
  an earlier error, or choose a fallback. This research did not run every social
  crawler and therefore does not claim universal rejection.
- The repository is private and the Pages workflow is manually gated. A
  successful local `_site` build does not prove a deployed URL is public or
  fetchable.

### Why reusing the README hero is a design failure

The header was designed for an inline repository context where the surrounding
README supplies title, description, links, and responsive width. A social card
must carry recognizable identity within a cropped, cached preview whose text
may be unreadable and whose surrounding context is controlled by another
platform. Reusing one file saves asset work by moving uncertainty to every
consumer. That is not efficiency.

## Minimum implementation contract

The following was the complete target contract. The current worktree implements only a bounded subset:

1. Declare `production_origin` and `base_path` in one release configuration.
   Do not derive them from a developer machine or assume the repository name.
2. Create one project-owned `1200 x 630` PNG under a stable public asset path.
   Design within crop-safe margins and inspect it at thumbnail size. Keep the
   current SVG for README use if it remains useful; do not pretend it is the
   social artifact.
3. Store title, description, canonical route, image route, image alt, width,
   height, and MIME in one JSON-compatible metadata source.
4. Generate head tags for artifact root, `site/index.html`, and
   `site/reader.html`. Decide whether root or `/site/` is canonical; do not let
   both self-canonicalize as separate equivalents.
5. Give the reader route an honest canonical policy. If query/path state loads
   many documents into one shell without stable public URLs, canonicalize only
   to the reader shell and do not claim per-chapter social identity.
6. Add a social-delivery validator to the built artifact.
7. After deployment, fetch the canonical HTML and image without credentials,
   record status, final redirected URL, content type, content length, width,
   height, and a screenshot/card-debugger result where available.

### Implementation note — 2026-08-12 worktree

Implemented: a project-owned `1200 x 630` PNG; Open Graph image MIME, dimensions, and alt; Twitter image and alt; artifact inclusion; local full-size and thumbnail inspection. The checked-in PNG is the authoritative asset. `scripts/build_social_preview.py --check` proves only that the recorded Windows Arial/Pillow environment reproduces the committed bytes.

Still open: approved production origin and base path; canonical and `og:url`; absolute HTTPS image URLs; one metadata generator; an artifact-level social metadata validator; public unauthenticated fetch; and real social-platform preview evidence. The implementation therefore remains `candidate` and does not satisfy the full contract below.

## Minimum validator

The static artifact gate should reject:

- missing or duplicate canonical, `og:url`, `og:image`, `twitter:card`, or
  `twitter:image`;
- any canonical/image URL that is not absolute HTTPS;
- canonical/`og:url` disagreement after the declared trailing-slash policy;
- an image host/path outside the configured production origin unless explicitly
  allowlisted;
- SVG or an unexpected extension/MIME for the primary card;
- raster bytes whose decoded dimensions are not exactly `1200 x 630`;
- tag width/height/MIME that disagree with decoded bytes;
- missing image alt or an empty generic label;
- a referenced image absent from `_site` when it is project-hosted;
- root/source-site metadata disagreement where they represent the same page;
- production metadata that still contains localhost, filesystem paths, `..`,
  template tokens, or an unapproved repository slug.

Negative fixtures should cover at least: relative URL, SVG, wrong dimensions,
wrong MIME, missing `twitter:image`, duplicate canonical, base-path mismatch,
and a valid `1200 x 630` PNG package.

## Verification layers and honest claims

| Layer | Evidence | Supported claim |
| --- | --- | --- |
| Source | metadata config and image source exist | implementation candidate exists |
| Generated artifact | parsed tags + decoded image bytes pass | artifact is internally consistent for the declared origin |
| Static HTTP | local server returns correct HTML/image MIME | artifact is locally serveable |
| Public fetch | unauthenticated canonical/image requests return expected final URLs and bytes | deployed resources are publicly reachable at that time |
| Consumer preview | card debugger or actual platform refresh shows expected crop/text | that consumer rendered the tested revision at that time |

No lower layer proves the next one. A validator cannot invalidate third-party
caches, and one consumer preview cannot prove every platform.

## Recommended order

```text
approve public origin and canonical route
    -> design original 1200x630 PNG
    -> add canonical metadata source and generator
    -> validate built artifact and negative fixtures
    -> deploy intentionally
    -> fetch public HTML/image
    -> inspect real preview and cache refresh behavior
```

Do not create the raster before the canonical deployment identity is approved:
the image path and metadata generator need that boundary. Do not publish first
and use crawler failure as the validator.

## Claims this record does not support

This benchmark does not prove that the current SVG fails on every social
platform, that any proposed URL is the repository's final public URL, that
GitHub Pages is currently enabled, or that a future PNG will render correctly.
It does not authorize a visual redesign, metadata edit, deployment, DNS change,
cache purge, or public release.
