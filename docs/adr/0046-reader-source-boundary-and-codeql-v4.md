# ADR-0046: Constrain Reader source loading and maintain CodeQL v4

## Status

Accepted. The Reader remains a static, same-origin document view. CodeQL is a
required host-side analysis input for the repository Ruleset, while the local
security policy remains `candidate` until its declared evidence supports
promotion.

## Date

2026-08-18

## Context

The first successful CodeQL analysis of `main` created two JavaScript findings:

- a high-severity unvalidated dynamic method call in the localized Lab label;
- a medium-severity client-side request-forgery finding because a Reader URL
  parameter influenced the URL passed to `fetch()`.

The same analysis also proved that CodeQL was not previously configured for the
repository. The Ruleset therefore had a CodeQL requirement without a current
analysis record. The CodeQL Action v3 run also reported its upcoming v3
deprecation.

## Decision

1. Build a fixed `Map` of Reader Markdown sources from the generated locale
   manifest. A query parameter may select only a registered `.md` path; it may
   not select an arbitrary same-origin path.
2. Fetch the selected source through the fixed same-origin mapping. Keep
   external links available as links in rendered content, but never use them as
   Reader source-fetch targets.
3. Replace user-influenced dynamic method lookup for localized Lab labels with
   an explicit language switch and a safe default.
4. Run pinned CodeQL v4 analysis for JavaScript and Python on pull requests,
   `main`, a weekly schedule, and manual dispatch. The workflow has no secrets,
   disables persisted checkout credentials, and uses exactly `actions: read`,
   `contents: read`, `packages: read`, and `security-events: write`; the last
   permission is the sole controlled pull-request write exception because CodeQL
   must upload its own analysis results.
5. Keep the regression fixtures for the source allow-list and explicit label
   mapping so a later refactor cannot silently restore either CodeQL finding.

## Alternatives considered

### Keep the directory-prefix check

Rejected. A broad prefix and normalization check proves only that a path looks
like a repository path. It does not prove that the requested file is an
intended Reader source or prevent a future published file from becoming a
fetch target.

### Validate the dynamic label lookup with a property check

Rejected. The finite set of supported languages is small and stable enough for
an explicit switch, which makes the allowed behavior obvious to reviewers and
to static analysis.

### Ignore the findings because the site is static

Rejected. A static site still performs browser-side requests and processes
URL-controlled state. The browser is a trust boundary even when no login or
server API is present.

### Continue CodeQL v3 until its deprecation date

Rejected. The repository can move to the currently supported v4 action without
changing the analysis contract, so retaining a known-deprecated major version
adds avoidable maintenance risk.

## Consequences

- A Reader URL for an unregistered Markdown file now shows the existing invalid
  path error instead of attempting a fetch.
- Adding a new Reader source requires regenerating the locale manifest and
  updating its governing source records.
- CodeQL produces a real analysis record for both supported code languages and
  can satisfy the repository's host Ruleset check.
- The current CodeQL v4 analysis reports zero results for the fixed commit;
  this does not certify the repository against every scanner or future change.

## Evidence boundary

- [`.github/workflows/codeql.yml`](../../.github/workflows/codeql.yml)
- [`site/reader.js`](../../site/reader.js)
- [`scripts/validate_repository_security.py`](../../scripts/validate_repository_security.py)
- [`scripts/test_site_accessibility.py`](../../scripts/test_site_accessibility.py)
- [`docs/security/sensitive-information-audit-2026-08-18.md`](../security/sensitive-information-audit-2026-08-18.md)
- [CodeQL Action v4 commit](https://github.com/github/codeql-action/commit/ff2f1c621b7f889edc0d3c761ac2e6a3f8cdb0dd)
- [GitHub Actions security hardening guidance](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
