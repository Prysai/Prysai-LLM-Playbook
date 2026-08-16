# Visual asset independent audit

> **Historical snapshot.** This report records pixels inspected on 2026-08-12.
> It is not a current-state verdict for boards replaced or remediated after
> that date. See the [2026-08-14 current-board addendum](visual-asset-audit-addendum-2026-08-14.md)
> before relying on the P0/P1 calls below.

**Audit date:** 2026-08-12  
**Scope:** image and SVG assets referenced by the public READMEs, `site/`, and
`docs/`, plus their repository-local display derivatives  
**Mode:** read-only visual and reference audit; no asset or site modification  
**Target language:** red/black, hard-edged Swiss editorial system with visible
human typographic judgement, accurate instructional meaning, and no generic
AI-deck mannerisms

## Follow-up: 2026-08-14

The `field-signal-to-safe-degradation-red-black.svg` finding has been
remediated without changing the historical audit: live-looking issue numbers,
a snapshot date, and fixed case IDs were removed from the pixels. The board now
names durable failure patterns and points readers to source record S43, where
dated report identifiers, scope, and review conditions can be maintained. The
Reader's browser smoke now checks its desktop rendering, mobile full-size route,
and horizontal-overflow boundary. The 2026-08-14 readability pass also replaces
the dense three-by-three audit-table treatment with three short reading bands:
signal, unsupported inference, and first safe move. This follow-up is a visual
and static-route correction only; it does not reproduce the field reports,
establish their current status, or prove learner comprehension.

## Verdict

The visual system is not yet coherent enough for release. Its best work is
credible: the red/black evidence boards and the remediated real-estate case use
clear editorial grids, restrained color, real information, and explicit
evidence boundaries. The weakest work comes from an older visual generation:
blue/cyan gradients, rounded glassy cards, soft shadows, rainbow progress
colors, and decorative curves. That split makes the repository look assembled
from two unrelated design systems.

The highest-risk asset is the README header because it defines the brand while
using a glowing, unlabelled wave as decoration. The most obvious “AI-designed
deck” assets are `skill-to-observable-output.svg`,
`lifecycle-checkpoints.svg`, and `evidence-recovery-ladder.svg`. They are
structurally tidy but rely on the exact rounded-card, gradient, glow, and evenly
spaced-box vocabulary that has become a generative-design cliché.

The real-estate case is no longer the primary problem. Its current desktop and
mobile captures look like a deliberately art-directed institutional guide, not
a lifestyle-image mockup. It should be kept, with a separate site thumbnail so
the complete 3,861-pixel page is not forced into a small card.

## Method and grading

I inventoried the repository-local raster and SVG assets under `assets/`, then
searched the READMEs, `site/`, and `docs/` for references. I rendered all eight
SVGs in Edge at 1600×900 and visually inspected the resulting pixels. I also
viewed both real-estate captures at original resolution and the 512-pixel black
and white brand derivatives. SVG titles, descriptions, visible text, raster
dimensions, and reference locations were checked separately.

Grades mean:

- **keep** — visually and semantically sound; only delivery housekeeping may
  remain;
- **refine** — sound core idea, but one or more visible choices weaken the
  system;
- **rebuild** — the present visual grammar conflicts with the declared brand
  enough that incremental polish would preserve the wrong foundation.

Priority is based on public prominence, degree of visual mismatch, and teaching
risk: P0 before a public release, P1 in the first visual consolidation pass,
and P2 as distribution or maintenance cleanup.

## Asset decisions

| Asset | Public references | Decision | Priority | Exact assessment |
|---|---|---:|---:|---|
| `assets/readme/prysai-llm-playbook-header.svg` (then `codex-field-guide-header.svg`) | Top of `README.md` and `README-EN.md`; `og:image` in `site/index.html` and `site/reader.html` | refine | P0 | Strong asymmetric split, excellent title hierarchy, useful problem→decision→action→evidence framing, and correct red/near-black direction. The glowing free-form wave on the left encodes no value, has detached dots in the related working board, and reads as an AI-added “tech signal.” Replace it with hard-edged rule/step geometry that carries an explicit sequence. The tiny “ENGLISH-FIRST / SIX LOCALES” line is volatile product metadata embedded in artwork and will age silently. |
| `assets/teaching/task-to-evidence-red-black.svg` | Inline in both public English READMEs; featured in `site/index.html` | refine | P1 | Good Swiss two-zone grid and strong claim/proof/limit panel. The four-stage copy is useful and accurately bounded. The glowing wave and floating dots are ornamental, visually softer than every other element, and imply data without a scale. Rebuild only that diagram region as a hard checkpoint sequence; retain the typography and right-hand proof model. “HAND OFF” should be reconciled with the project’s reader-facing use of “handoff.” |
| `assets/teaching/four-evidence-lenses-red-black.svg` | Inline in `README-EN.md`; featured in `site/index.html` | keep | — | The strongest teaching board. It has an immediate thesis, disciplined four-column grid, no decorative illustration, and a clear warning. It survives thumbnail reduction better than the other boards. Before localization, review the semantic boundary between `READY` (“reader can use it safely”) and release/production readiness; the visual itself does not overclaim. |
| `assets/teaching/field-signal-to-safe-degradation-red-black.svg` | Inline in both English READMEs; featured in `site/index.html` | refine | P0 | Strongest information design: every row maps observation→forbidden inference→safe action, with excellent hierarchy and no fake decoration. Accuracy is the issue. The artwork asserts “three public Codex issue signals” and “issues remain open” but shows neither issue IDs nor source URLs, while embedding a date that will become stale. Add human-readable source identifiers and a “checked on” boundary, or remove live status from the pixels and keep it in adjacent maintained text. |
| `assets/teaching/model-choice-is-a-test.svg` | Inline and table link in `README-EN.md`; inline in `README.md`; linked by ADR 0012 | rebuild | P1 | The four-step logic and evidence-boundary sentence are valuable. Visually it belongs to a different product: salmon-to-orange gradient type, alternating cream/navy rounded cards, multiple border colors, and connector arrows form a generic AI presentation template. Rebuild the same content in the red/black hard-edge board system with one accent, square regions, and less card chrome. |
| `assets/teaching/skill-to-observable-output.svg` | Inline and table link in `README-EN.md`; referenced from `README.md` and ADR 0012 | rebuild | P0 | Highest “generated slide” signature: large rounded cream sheet floating on navy, soft shadow, four evenly distributed rounded cards, repeated arrows, and a decorative dashed smile curve. The fourth card’s long question nearly touches its right edge at full render, showing that symmetry was chosen before copy fit. Preserve trigger→input→method→output and the four-case test, but rebuild as a strict editorial flow with variable-width regions determined by content. |
| `assets/teaching/lifecycle-checkpoints.svg` | Referenced by Chapter 8 research planning; registered as a teaching asset | rebuild | P1 | Content is useful and information-rich, but seven pastel/rainbow nodes, blue gradient cards, rounded outer canvas, and uniform repeated panels are unrelated to the header. At README-scale the exit-evidence copy becomes too small. Use a monochrome/red checkpoint spine, split the lifecycle into two reading bands or a vertical sequence, and make stop/recover an actual branch rather than a footer annotation. |
| `assets/teaching/evidence-recovery-ladder.svg` | Table link in `README-EN.md`; registered as a teaching asset | rebuild | P1 | The “stop at first missing proof” idea is strong and the yellow break marker is understandable. The asset repeats the same blue glass-card system as the lifecycle graphic and uses five near-identical boxes where claim strength should feel cumulative. Rebuild with a literal stepped ladder or increasing evidence stack in red/black; make the first missing proof visibly interrupt the structure. |
| `assets/cases/product-context-real-estate-desktop.png` | Inline in both English READMEs; featured in `site/index.html`; linked by the case record | keep | P2 delivery refinement | The 1440×3861 capture is convincingly human-directed: asymmetric hero, disciplined red/black rules, varied section rhythm, explicit synthetic-case warning, and no fabricated property photography. It communicates a real handoff artifact rather than aesthetic filler. The full-page image is a poor card thumbnail because text becomes illegible and the browser must decode a tall capture; create a purpose-cropped derivative for cards while retaining this evidence capture unchanged. |
| `assets/cases/product-context-real-estate-mobile.png` | Linked by `README.md` and the case record | keep | — | The 390×6063 capture is a credible responsive counterpart, not a desktop shrink. Sections stack logically, tables become readable stage rows, and no horizontal overflow is visible. Its role should remain evidence, not a promotional hero. |
| `assets/branding/prysai-lab-mark-black-96.png` and `-white-96.png` | Site favicon/header/footer/reader branding | keep | — | Crisp, distinctive, compact, and correctly switched by surface. Empty `alt` is appropriate where adjacent text names Prysai Lab. The black mark appeared blank on a black inspection canvas only because it is black artwork on transparency, not because the file is empty. |
| 512-pixel and 8334-pixel black/white brand masters | Registered locally; not decoded in public page layout | keep | P2 | The derivative strategy is correct: small files serve the site while masters remain archival. The 8,334-pixel masters should not be introduced into page markup. |

## Cross-system failures

### 1. Two incompatible visual languages

The header, three red/black boards, and real-estate case form one plausible
system: near-black, cream, signal red, hard rules, asymmetric editorial grids,
and all-caps metadata. The model/skill/lifecycle/recovery cards form another:
navy, cyan, salmon, yellow, lavender, gradients, rounded cards, and soft depth.
This is not productive variation. It looks like material accumulated from
different prompt runs.

One system should win. The evidence supports the red/black Swiss direction
because it is already used at the highest-visibility surfaces and handles dense
technical content more honestly. Variation should come from grid and scale,
not from changing palette, corner language, glow, and illustration style per
asset.

### 2. Decorative graphs undermine evidence pedagogy

The header and request-to-evidence board use curves and dots that resemble data
visualization but have no axes, measures, legend, or semantic mapping. In a
book that repeatedly distinguishes claims from evidence, pseudo-data is not a
neutral flourish. It teaches the wrong visual habit. Every line or point should
either encode a named state transition or be removed.

### 3. Text is often designed for 1600-pixel inspection, not actual placement

The full SVGs are readable when opened alone. Several are not readable in the
README flow or the site's small visual-case cards. Lifecycle and recovery are
the worst because each contains many 15–17-pixel labels across a 1600-pixel
canvas. The site cards need purpose-built crops or simplified preview variants;
scaling a complete teaching board down is not responsive information design.

### 4. Volatile facts are frozen into pixels

The header freezes locale count; the field-signal board freezes date and issue
status; older cards freeze creation dates. A timestamp is useful provenance,
but a current-state claim needs its source and review boundary in the same
maintained record. Prefer stable principles in the image and volatile status in
adjacent HTML/Markdown, unless the image includes an explicit source identifier
and review date.

### 5. Public image coverage is English-only

`README.md` and `README-EN.md` carry the visual system, while the German,
Spanish, Japanese, Korean, and Chinese READMEs do not reference the teaching
assets. That is honest—there are no falsely localized images—but it creates a
materially different first impression across locales. Do not clone English
text-heavy SVGs into translated READMEs. Either create reviewed localized
variants or use language-neutral diagrams with translated captions outside the
image.

### 6. Social-preview delivery is not robust

Both site pages use a relative SVG as `og:image`. Many social crawlers expect an
absolute public URL and raster preview, and SVG support is inconsistent. This
does not make the header visually defective, but it means the intended first
image may not appear when shared. Export a dedicated 1200×630 PNG after the P0
header refinement and use an absolute deployed URL.

## Rebuild order

1. **P0 — rebuild Skill flow.** It is the clearest generic-AI-deck artifact and
   its copy currently strains its card.
2. **P0 — refine the README identity header.** Remove pseudo-data glow, move
   volatile locale metadata out of the pixels, and export a social raster.
3. **P0 — make field-signal sourcing visible.** Preserve the excellent table,
   but bind live claims to issue identifiers and a checked-on boundary.
4. **P1 — rebuild model choice.** Keep its experimental logic; discard the
   gradient rounded-card presentation.
5. **P1 — rebuild lifecycle and recovery as one family.** Use the same red,
   cream, near-black, rule weights, number blocks, and typography as the best
   evidence boards; make state transitions structural rather than decorative.
6. **P1 — remove the working-board glow curve.** Replace it with a labelled
   four-stage checkpoint rail.
7. **P2 — create derived previews.** Add a cropped real-estate card thumbnail
   and simplified board previews without altering the evidence originals.

## Non-negotiable acceptance checks for replacement assets

- The two-second squint test reveals one thesis and one reading path.
- Red is used for state, boundary, or emphasis—not atmospheric decoration.
- No gradient, glow, glass panel, floating shadow, or rounded card survives
  without a content-specific reason.
- No plotted line, point, bar, or arrow exists without a named semantic role.
- Copy fits at 100% without touching card edges and remains legible at its real
  README/site placement, not only when opened alone.
- Typography uses no more than three functional levels per region and aligns to
  a visible grid.
- Every factual or volatile statement has an adjacent source/review boundary.
- SVG `<title>` and `<desc>` remain accurate; raster derivatives have useful
  alt text at their reference site.
- Replacement artwork is recorded in the asset register, and evidence captures
  remain distinguishable from promotional crops.
- A human reviewer compares all replacements side by side before acceptance;
  passing an SVG parser or screenshot command is not a design approval.

## Boundary

This report grades the visible assets and how public project surfaces reference
them. It does not claim authorship detection: “AI-looking” is a judgement about
observable design conventions, not proof of which tool produced an image. No
asset, site file, source register, or prior visual review was changed by this
audit.
