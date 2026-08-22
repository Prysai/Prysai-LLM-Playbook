# French interface copy review — 2026-08-21

**Status:** `candidate` · high-exposure editorial pass recorded; independent
French-language review remains pending.

## What changed

The French homepage and its foundation-route labels were reviewed after the
responsive browser pass exposed literal or misleading wording in the generated
dictionary. The visible entry terms now use ordinary French phrasing such as
“les fondamentaux des LLM”, “requête délimitée”, “fichier sûr” and “mise en
pratique”. The learning-level accessibility label is explicitly “sept niveaux”;
it describes the seven learning levels and is unrelated to the eight interface
locales.

The edit is intentionally limited to high-exposure interface copy. It does not
rewrite the 55 French Markdown files or change their translation-status claims.

The follow-up pass also reviewed the foundation guide, Chapters 1–3, the
optional practice index, and the three copy-ready practice loops. It replaces
literal uses of *reçu* for an execution record with *trace*, uses *contrôle
d’acceptation* where the English means acceptance evidence, and replaces
*mise à jour de travail* with the ordinary French workplace expression *point
d’avancement*. The safety boundary and the underlying claims are unchanged.

## Evidence

- `npm run test:browser` → `BROWSER_SMOKE_OK` with desktop `1280px` and mobile
  `390px`; eight locale routes, five foundation boards, Reader continuation,
  lazy search, invalid paths and fail-closed missing translations included.
- `BOOK_NAVIGATION_OK chapters=22 locales=EN,ZH,ES,JA,KO,DE,ZHTW,FR`.
- `LOCALE_RELEASE_PATHS_OK` and `LLM_FUNDAMENTALS_BOUNDARIES_OK` cover the 40
  chapter/Lab route units in all eight locales.
- Visual captures reviewed locally:
  `output/playwright/hero-routes-desktop-fr.png`,
  `output/playwright/hero-routes-mobile-fr.png`,
  `output/playwright/foundation-visuals-mobile.png`, and
  `output/playwright/candidate-reader-mobile-chapter-02-fr.png`.

## What this does not establish

The pass checks rendered wording, route continuity, and layout. It does not
certify native-level fluency, regional idiom, cultural adaptation, factual
completeness, independent proofreading, learner comprehension, learning
outcomes, or production deployment. French content therefore remains
`translation_status: in-progress`, and the repository remains `candidate`.

## Next review

A French-speaking reviewer should read the homepage, foundation guide, first
five course units, and the practice cards in context. Record concrete edits and
the reviewer scope before changing the status to `reviewed`.
