# Localization review and document-language declaration — source receipt

**Date:** 2026-08-15
**Owner:** localization-maintainer
**Status:** source receipt; supports a candidate localization workflow, not a translation-quality result
**Next review:** before the first non-English locale is proposed as a complete course

## Question

What small, source-bounded rules help this repository distinguish a registered
language, a readable translation slice, and a reviewed localized course?

## First-party sources checked

| Source | Accessed | Evidence class | Narrow supported fact |
|---|---|---|---|
| [W3C: Declaring language in HTML](https://www.w3.org/International/questions/qa-html-language-declarations) | 2026-08-15 | Official standards guidance | For HTML served as `text/html`, the `lang` attribute identifies the language of the document or a range of text. |
| [GitHub Docs: Writing content to be translated](https://docs.github.com/en/contributing/writing-for-github-docs/writing-content-to-be-translated) | 2026-08-15 | Official documentation guidance | Clear, translation-friendly English improves the quality of later translations; translation is a separate concern from writing the source. |
| [GitHub Docs: Pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | 2026-08-15 | Official platform documentation | A pull request supports review states and review feedback before a change is merged. Repository policy determines which reviews or checks are required. |

The URLs returned HTTP `200` when read on the access date. This receipt
summarizes the sources in original wording; it does not copy their prose or
their implementation.

## Project decisions derived from the sources

| Decision | Why it follows here | Explicit limit |
|---|---|---|
| Set HTML document language from the language actually rendered, not from a menu label alone. | W3C distinguishes the language of a document/text range from unrelated metadata. | A correct `lang` value does not make prose accurate, natural, or complete. |
| Keep source identity, source revision, code blocks, URLs, and status vocabulary stable across one translation slice. | Translation-friendly source writing is easier to review and reduces silent meaning drift. | Stable structure does not prove semantic equivalence. |
| Use one locale and one `content_id` per pull request, with a target-language reviewer request. | A small PR creates a reviewable unit; GitHub provides review mechanics but does not define this repository's language policy. | A requested or completed GitHub review does not prove language expertise, learning value, or a release decision. |
| Publish course-unit counts in the selector as `available/40`, not as “six complete languages.” | File and route registration are distinct from complete, reviewed content. | A count does not measure reader comprehension, cultural fit, learner completion, or translation quality. |

## Contribution path

The executable procedure is [the translation contribution and review protocol](../governance/translation-contribution-protocol.md).
It requires a preserved identity comment, target-language review request,
same-locale links, source revision, focused locale/link checks, and an explicit
`in-progress` status until the stated evidence exists.

### Prioritized backlog

1. **Chinese:** complete the next continuous beginner pair, Chapter 6 plus its
   directly relevant Lab, then request an independent Simplified Chinese review
   of Chapters 2–5 and Labs 001/002/007.
2. **Spanish, Japanese, Korean, German:** accept only a reviewed Chapter 2 +
   Lab 001 pair per locale as the first new beginner slice. Do not expand to
   more chapters before the pair is read on desktop and narrow mobile and a
   target-language reviewer records unresolved terminology.
3. **All locales:** promote a translation status only after its source revision,
   file/link checks, named review evidence, and any affected generated
   artifacts agree. Keep learner and release claims separate.

## Non-claims

This record does not show that any translation is correct, that all six
languages are complete, that a reviewer has approved a translation, that a
reader can understand the material, or that a course has learning, adoption,
or release evidence. It is not a legal interpretation of any source's license
or GitHub policy.
