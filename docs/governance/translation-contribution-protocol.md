# Translation contribution and review protocol

**Status:** candidate governance record
**Owner:** localization-maintainer
**Last reviewed:** 2026-08-15
**Next review:** before the first external translation is accepted

## Purpose

This protocol turns a translation pull request into a small, reviewable change.
It does not allow a machine translation, a green check, or a bilingual
contributor's self-review to be described as independently reviewed or
release-ready.

English `-EN` files remain the canonical reader-facing source. A translation
preserves the same `content_id`; it is a localized projection, not a second
curriculum or a place to silently change product facts.

## Smallest valid translation pull request

Keep one pull request to one content identity and one locale. For example:

```text
book/chapters/03-task-protocol-ZH.md
docs/governance/locale-matrix.yaml
book/table-of-contents-ZH.md        (only when its visible entry changes)
site/locale-manifest.js             (generated)
site/search-index.js                (generated)
```

The translated file must begin with its identity comment and preserve the
source front matter. It must declare:

```text
content_id: <same identity as EN>
locale: <target suffix>
translation_status: in-progress
translated_from: EN
source_revision: <source commit or declared worktree revision>
```

Keep code blocks, paths, command names, status vocabulary, URLs, hashes,
product names, and evidence labels exact unless the canonical source itself
changes. Translate explanatory prose, link labels, table headings, image alt
text, and learner-facing acceptance language. Every link to an existing
localized content identity must stay in the same locale. If a localized target
does not exist, do not pretend it does: use an explicit English-fallback notice
or let the Reader present its visible fallback state.

## Pull-request description

Paste and complete this block in the standard PR template:

```text
Translation scope
- Canonical English source:
- Target locale and file:
- content_id:
- Source revision checked:
- Terms deliberately kept untranslated:
- Machine assistance, if any:
- Translator self-review performed:
- Independent language reviewer requested:
- Commands run:
- What remains in-progress or unreviewed:
```

Do not add real learner work, private conversations, raw model transcripts,
credentials, or a claim that the translation improves learning outcomes.

## Review and merge path

| Change | Review required | Merge result |
|---|---|---|
| Typo or unambiguous same-language link in an existing translation | One maintainer plus focused checks | Candidate wording correction |
| One original translation slice with no new facts, code, or generated-file drift | Translator self-review, one target-language reviewer, and locale/link checks | `in-progress` candidate translation |
| Product fact, safety instruction, license text, source interpretation, status claim, or policy | Standard content review; add subject-matter review when needed | Only the supported scoped change |
| Claim that a translation is reviewed, verified, complete, or release-ready | Named independent reviewer and review evidence | Only if the declared evidence supports that precise status |

A designated maintainer may use the small-slice path after the second row is
satisfied. It is a quick human review path, not automatic approval: checks
prove file and link contracts, not accuracy, naturalness, cultural fit, or
reader comprehension. Do not promote `translation_status` beyond
`in-progress` in that path.

## Required local checks

Run the focused commands first, then the affected site generators:

```powershell
& $py scripts\validate_localization.py
& $py scripts\check_local_links.py
& $py scripts\build_site_locale_manifest.py
& $py scripts\build_site_search_index.py
& $py scripts\validate_site_i18n.py
```

For a chapter or Lab, also run the relevant learning-contract check. A reviewer
should open the translated route at desktop and narrow-mobile widths, verify
that the Reader exposes an in-progress review notice, and confirm that the
next beginner link does not silently return to English when a target-language
file exists.

## Priority queue: deepen before widening

The first target is a continuous, reviewable beginner route, not six shallow
language menus. Work through this queue one small pull request at a time:

1. **Simplified Chinese:** independently review the existing Chapters 2–5 and
   Labs 001/002/007, then add the next chapter/Lab pair only after terminology
   and same-locale navigation issues are recorded.
2. **Spanish, Japanese, Korean, German:** use Chapter 2 + Lab 001 as the first
   proposed beginner pair for each locale. A pair is a candidate slice, never
   a claim that the course is complete.
3. **Any locale:** expand beyond its first pair only after a named
   target-language reviewer records the source revision, reviewed paths,
   unresolved terms, and focused-check evidence.

The selector's course-unit count is deliberately descriptive: it says how many
of the 22 chapters and 18 Labs have readable paths. It does not replace a
language review, learner run, transfer check, or release gate.

## Independent review record

Record the reviewer, locale, source revision, reviewed files, date, and any
unresolved terms in a small update record or the pull request. A reviewer who
only checks grammar has not verified product facts, learning outcomes, runtime
behavior, accessibility, or release readiness. Keep those evidence categories
separate.
