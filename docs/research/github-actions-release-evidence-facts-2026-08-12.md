# GitHub Actions release-evidence dependency facts

**Access date:** 2026-08-18

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
| `actions/setup-node` | [`v6.5.0`](https://github.com/actions/setup-node/releases/tag/v6.5.0) | `actions/setup-node@v6` |
| `actions/upload-artifact` | [`v7.0.1`](https://github.com/actions/upload-artifact/releases/tag/v7.0.1) | `actions/upload-artifact@v7` |
| `actions/configure-pages` | [`v6.0.0`](https://github.com/actions/configure-pages/releases/tag/v6.0.0) | `actions/configure-pages@v6` |
| `actions/deploy-pages` | [`v5.0.0`](https://github.com/actions/deploy-pages/releases/tag/v5.0.0) | `actions/deploy-pages@v5` |
| `actions/download-artifact` | [`v8.0.1`](https://github.com/actions/download-artifact/releases/tag/v8.0.1) | `actions/download-artifact@v8` |
| `astral-sh/setup-uv` | [`v10.0.1`](https://github.com/astral-sh/setup-uv/releases/tag/v10.0.1) | `astral-sh/setup-uv@v10` |

The release tags were also queried through GitHub's first-party Releases API
on the access date. The repository pins full commit SHAs; the table names the
corresponding release tags for human review. Recheck before publication, on a
workflow warning, or when an upstream major release appears.

## Evidence boundary

An available release tag proves that the referenced Action version exists. It
does not establish the result of this repository's workflow; only a run bound
to the candidate SHA can provide that evidence.
