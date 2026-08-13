# Architecture decisions

This directory records decisions that are expensive to rediscover: content
identity, navigation, evidence boundaries, generated views, and project
structure.

## How to use it

- Read the relevant ADR before changing a contract it owns.
- Keep the reasoning, alternatives, consequences, and evidence boundary in the
  record.
- Do not delete an old decision when the direction changes; add a new ADR that
  supersedes it.
- An accepted ADR explains the chosen design. It does not prove that every
  implementation or runtime behavior is complete.

Current entry points:

- [ADR-0010: locale-suffixed content](0010-locale-suffixed-content.md)
- [ADR-0013: one chapter navigation source](0013-single-book-navigation-source.md)
- [ADR-0014: canonical project directory map](0014-canonical-project-directory-map.md)
- [ADR-0015: locale-aware site routing](0015-locale-aware-site-routing.md)
- [ADR-0016: GitHub Pages artifact boundary](0016-github-pages-artifact-boundary.md)
- [ADR-0018: generated search index](0018-generated-search-index.md)
- [ADR-0019: content integrity gate](0019-content-integrity-gate.md)
- [ADR-0020: machine-readable quality register](0020-machine-readable-quality-register.md)
- [ADR-0021: commit-bound release evidence](0021-commit-bound-release-evidence.md)
- [ADR-0022: staged authoritative URL audit](0022-staged-authoritative-url-audit.md)
