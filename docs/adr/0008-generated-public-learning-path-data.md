# ADR-0008: Generate public learning-path data from the contract

## Status

Accepted

## Context

The learning-path contract is the authoritative mapping for L0–L6, but the
public page also carried a hand-written JavaScript copy of the same chapter,
lab, Skill, evaluation, and gate relationships. That made a contract update
easy to miss on the page. It also allowed the public page to show only part of
the chapters assigned to L3 or L4.

## Decision

Keep `docs/governance/learning-path.yaml` as the only source of level
relationships. Keep bilingual display names in `site/content-catalog.json` so
presentation copy can be reviewed without changing governance. Generate
`site/learning-path-data.js` with `scripts/build_learning_path_site.py`.

The static page loads the generated file before `site/app.js`. CI runs the
generator in `--check` mode, so a stale generated file fails validation. The
runtime fallback in `site/app.js` exists only to keep a direct, partially
edited local page from crashing; it is not a maintained source of truth and
must not be used to justify a release.

## Alternatives considered

### Fetch the YAML in the browser

Rejected because the public page is intentionally static and must work from a
simple file server without a YAML parser, build server, or network dependency.

### Keep editing the page data by hand

Rejected because it recreates the synchronization failure that prompted this
decision.

### Generate the entire HTML page

Rejected for now because the current page has hand-authored editorial copy,
accessibility markup, and layout structure that should remain reviewable in
HTML. Only the repeated learning-path data is generated.

## Consequences

- A level or asset assignment changes in the contract first, then the site
  data is regenerated and checked.
- Display-name changes are made in the site catalog and are still required to
  be bilingual.
- `site/learning-path-data.js` is a tracked build artifact and must not be
  edited manually.
- The page can remain a no-dependency static site.
