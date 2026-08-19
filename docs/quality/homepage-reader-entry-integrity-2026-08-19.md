# Homepage Reader entry integrity - 2026-08-19

**Status:** candidate route-integrity check
**Scope:** public showcase links that open registered chapters, Labs, Skills, and
research sources

## What changed

- Homepage reader-facing Markdown links now use an explicit
  `reader.html?path=...&lang=en` route instead of opening the raw source file.
- The existing runtime localization step still projects those routes into the
  selected interface language and keeps missing translations fail-closed.
- Governance files, source ledgers, and unindexed research notes remain direct
  source links; they are not silently presented as Reader pages.

## Checks

- `scripts/validate_homepage_reader_fragments.py` checks every homepage Reader
  source and fragment against the generated manifest and rendered IDs.
- The same validator rejects a registered Markdown source linked directly from
  the homepage, including a registered research source.
- `scripts/validate_content_completeness.py` accepts the canonical source when
  it is represented by the explicit Reader route.
- `npm run test:browser` passed with the Pages artifact at desktop 1280px and
  mobile 390px, including all seven interface locales and Reader routes.

## Boundary

This record establishes route and rendering checks only. It does not prove that
the content is correct, that a translation received independent native review,
that a reader learned the material, or that the public deployment has adopted
this candidate commit.
