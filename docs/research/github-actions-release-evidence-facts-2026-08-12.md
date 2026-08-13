# GitHub Actions release-evidence dependency facts

**Access date:** 2026-08-12

**Owner:** release-maintainer

**Next review:** 2026-09-12

**Status:** `current / first-party / workflow dependency`

## Scope

This record supports only the major Action versions used by this repository's
quality and Pages workflows. It does not prove that a workflow run succeeded,
that GitHub Pages is available for the private repository, or that a future
major version remains compatible.

| Dependency | First-party release checked | Repository use |
|---|---|---|
| `actions/checkout` | [`v7.0.1`](https://github.com/actions/checkout/releases/tag/v7.0.1) | `actions/checkout@v7` |
| `actions/setup-python` | [`v7.0.0`](https://github.com/actions/setup-python/releases/tag/v7.0.0) | `actions/setup-python@v7` |
| `actions/upload-artifact` | [`v7.0.1`](https://github.com/actions/upload-artifact/releases/tag/v7.0.1) | `actions/upload-artifact@v7` |

The release tags were also queried through GitHub's first-party Releases API
on the access date. Major tags are used so upstream can deliver compatible
patches, while this dated record preserves the exact versions observed during
the decision. Recheck before publication, on a workflow warning, or when an
upstream major release appears.

## Evidence boundary

An available release tag proves that the referenced Action version exists. It
does not establish the result of this repository's workflow; only a run bound
to the candidate SHA can provide that evidence.
