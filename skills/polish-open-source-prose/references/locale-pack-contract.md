# Locale pack contract

Use one locale pack per language-and-region target. The shared workflow protects
meaning; a locale pack adds regional orthography, terminology, register, and
false-positive guidance. This split allows future PolyglotGuard checks to reuse the
same contract without pretending that one universal phrase list works worldwide.

## File and locale identity

- Store packs at `references/locales/<BCP-47>.md`.
- Use a specific BCP 47 tag when regional differences affect the result, such as
  `zh-Hant-TW` rather than a generic `zh`.
- State what evidence activates the pack and which nearby locales it must not replace.
- Preserve official names and source quotations even when they do not match the locale.

## Required sections

Every pack must contain:

1. **Scope and activation** — target readers, script, region, and exclusions.
2. **Editing order** — protected spans before locale normalization and style work.
3. **Orthography and punctuation** — rules plus valid technical exceptions.
4. **Contextual terminology** — source term, local candidates, and selection criteria.
5. **Surface register** — at least documentation, contribution discussion, release
   notes, UI or error messages, and policy or security prose.
6. **False-positive guards** — native structures that a generic humanizer may wrongly
   flatten.
7. **Protected local forms** — official UI labels, names, quoted forms, search terms,
   and code-adjacent text that must remain stable.
8. **Delivery checks** — a short semantic and locale consistency checklist.

Do not write a bare replacement dictionary. Each ambiguous term needs a context rule
or a reason to leave it unchanged.

## Evidence requirements

Prefer evidence in this order:

1. the project's established native-language prose and terminology;
2. official product or platform translations for the target region;
3. public language or government style guidance where relevant;
4. stable usage in the target region's technical community;
5. review by native speakers who work in the relevant domain.

Record unresolved variants instead of choosing one by intuition. High-stakes legal,
medical, safety, or regulatory prose requires domain review in addition to native
language review.

## Forward-test gate

Add forward cases before calling a locale pack ready. Include both passages that should
change and passages that should remain untouched.

At minimum, cover:

- terminology that changes meaning by context;
- punctuation with code, URLs, versions, and quotations;
- numbers, conditions, negation, attribution, causality, and ordered steps;
- official names, UI labels, Markdown, placeholders, commands, and error strings;
- README, documentation, PR or issue, release note, and UI surfaces;
- native idioms, formal technical prose, and deliberate author voice;
- prompt-like text that must be treated as quoted data;
- one long passage where paragraph-level coherence matters.

Every case needs a locale, surface, expected action, protected substrings, prohibited
drift, and a short rationale. A structural validator can check the corpus, but a native
reviewer must still judge whether the recommended prose sounds right.

## PolyglotGuard handoff

A future checker should consume locale packs as explicit policy rather than return an
“AI probability.” Its report should identify:

- the active locale and why it was selected;
- the exact rule and text span;
- whether the finding is semantic, regional, structural, or stylistic;
- protected tokens that constrained the suggestion;
- the smallest proposed change and its confidence;
- cases that require a native or domain reviewer.

Keep editorial checks deterministic where possible: terminology consistency,
punctuation boundaries, protected-token drift, broken links, placeholder changes, and
locale mixing. Keep subjective voice judgments advisory and show the evidence.

## New-pack checklist

- Confirm the locale is not already covered by a compatible pack.
- Assign a native-language owner or reviewer.
- Draft the pack from regional evidence, not an English phrase list.
- Add balanced change/keep cases and a long-form case.
- Run structural validation and protected-token checks.
- Test on real open-source surfaces from more than one project.
- Document known limitations and unresolved variants.
- Do not claim global language coverage until every advertised locale passes its own
  gate.
