# Translation language-quality audit — 2026-08-19

**Status:** candidate audit; not a native-language sign-off  
**Scope:** all seven Reader locales, with a first editorial pass on the
Simplified Chinese foundation route and shared Reader controls.  
**Owner:** localization-maintainer  
**Canonical source:** English (`-EN`) files

## Decision

The project does **not** currently have seven native-level translations. The
repository has localized files and same-language routing, but the governance
matrix still marks non-English content as `in-progress` or `candidate`, and no
locale has a named independent language reviewer with a completed review record.
Structural parity is therefore reported as routing coverage, not translation
quality.

This is an intentional release claim. It is more accurate to say:

> English is the canonical source. Six additional locales plus Traditional
> Chinese are readable candidate routes awaiting independent language review.

## Evidence collected

- `scripts/audit_translation_depth.py --verbose` reports 240 chapter/Lab locale
  pairs and 42 attention items. It is only a text-depth signal; it cannot judge
  idiom, terminology, cultural fit, or learner comprehension.
- `scripts/audit_translation_language_quality.py --verbose` reports 330
  localized Markdown files. The Simplified Chinese route triggered terminology
  and long-sentence attention across the core chapters; Traditional Chinese
  inherits several of the same issues and also needs a separate Taiwan/Hong
  Kong language pass.
- The locale matrix contains 56 non-English content identities per locale;
  ZH, ES, JA, KO and DE contain `in-progress` records, while ZHTW is entirely
  `in-progress`. This is incompatible with a claim of completed native review.
- The core-course contract explicitly excludes the claim that seven languages
  have completed independent native review.

## Editorial changes in this slice

The highest-traffic Chinese entry path was revised to use ordinary reader
language and define specialist words before using them:

- `book/guides/llm-fundamentals-ZH.md` now explains “承载产品（host）”、
  “可核对的记录（回执）”、 “使用入口（旧称工作面）” and “固定练习材料（fixture）”.
- The same guide replaces several opaque phrases with plain descriptions such
  as “重新查看并核对”, “查证路径”, and “从看见工具到确认结果的步骤”.
- `book/routes/universal-core-foundations-ZH.md` and
  `book/routes/first-safe-change-ZH.md` use “连接点” and
  “固定练习材料” instead of unexplained internal shorthand.
- Chapters 1–3 and 9 receive focused beginner wording fixes, while preserving
  content IDs, paths, code blocks, status labels and evidence boundaries.
- `site/app.js` and `site/reader.js` replace beginner-facing Chinese “回执”
  labels with “记录” where the UI means a locally saved note.
- The Traditional Chinese foundation guide receives a parallel terminology
  pass; it remains candidate text and is not presented as a native review.

## Remaining P1 work

1. Review the full Simplified Chinese core route with a native Chinese editor,
   then review the Traditional Chinese route separately rather than treating it
   as a character conversion.
2. Remove remaining unexplained internal terms from localized chapters and
   labs, or add a first-use definition. Pay special attention to “工作面”,
   “宿主”, “夹具”, “回执”, “竖向切片”, and long table sentences.
3. Review the shared Reader controls in Spanish, Japanese, Korean and German.
   Several current controls use literal technical renderings that need a
   native product-writer pass (for example “recibo/レシート/영수증” for a
   verification record).
4. Add a named reviewer, review date, source revision and unresolved-term list
   for each locale before changing any translation status to `verified`.
5. Run a small comprehension check with readers of each language. A green
   path/link validator cannot show that a sentence is understandable.

## What this audit does not prove

It does not prove learner outcomes, translation equivalence, cultural
appropriateness, model behavior, or production readiness. No machine score or
automated text comparison can substitute for an independent native-language
review and a short reader comprehension check.

## Current follow-up — 2026-08-26

The repository now registers eight locales: the English source plus seven
translation routes (ZH, ZHTW, ES, JA, KO, DE, and FR). The current structural
audits report all 56 locale-matrix units and all 103 Reader content identities
for every registered locale, with no missing locale records or files. This is
route and file coverage only; it is not evidence that the prose is equivalent,
native, or understood by learners.

The current depth audit covers 280 locale/content pairs and reports 25 editorial
attention items. Its character and heading ratios are triage signals, not
translation scores. A shorter target-language page is changed only when a
required concept, condition, example, failure branch, evidence field, or
acceptance step is actually missing. We do not add headings, sentences, or
visuals merely to match English length.

### Precision-first editorial rule

Until the five-unit beginner route has learner evidence, the project freezes
breadth. A proposed content or visual change must satisfy all of these checks:

1. It closes a named comprehension, accuracy, navigation, accessibility, or
   evidence gap.
2. It preserves the canonical facts, status tokens, paths, fixtures, and
   source/licence boundaries.
3. A reader can use it to make a decision, perform an observation, or retain a
   bounded artifact; decoration alone is not a reason to add it.
4. The change is reviewed in the target language in page context, not as an
   isolated sentence or a character-count exercise.

The non-English routes therefore remain `candidate`/`in-progress` until a
named independent language review and a small comprehension check exist. Green
validators establish structural contracts only; they do not upgrade this
status.

### Precision review slice — Japanese Chapter 15 (2026-08-26)

- **Files:** `book/chapters/15-research-track-JA.md`
- **Source revision:** English canonical content at the 2026-08-26 worktree
  baseline; change committed as `7d4b32a`.
- **Review type:** maintainer context review focused on native readability; no
  independent Japanese-language sign-off.
- **Changes:** replaced misleading or untranslated headings for the cutoff
  scope, research card, reverse check, ten-minute research/stop records,
  decision card, and source-owner sections. Contract field names inside fenced
  examples remain unchanged.
- **Unresolved boundary:** the page still contains deliberate English status
  values, file/fixture fields, and selected technical terms. Their presence is
  not evidence of a completed native review; a Japanese reader check remains
  required before changing the route from `in-progress`.
