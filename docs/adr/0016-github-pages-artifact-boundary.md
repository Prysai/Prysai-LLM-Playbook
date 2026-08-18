# ADR-0016: Publish a bounded GitHub Pages artifact

## Status

Accepted; deployment remains pending the repository's Pages availability.

## Date

2026-08-11

## Context

The repository has a visual static showcase in `site/`, but GitHub's default
repository view is not an online reading surface. A Pages workflow should make
the showcase shareable without publishing local work directories, archives,
tokens, or unrelated machine state.

The repository is currently private. GitHub's API reports that Pages is not
enabled, and the account plan may require the repository to be public before a
Pages site can be created. That product constraint must remain visible rather
than being hidden behind a successful workflow file.

## Decision

Use a GitHub Actions Pages workflow with the official Pages artifact and
deployment actions. Build the artifact with
`scripts/build_pages_artifact.py` and publish only:

- the visual `site/` source and its generated data;
- the `book/`, `docs/`, `skills/`, `assets/`, `examples/`, and `evals/`
  directories used by the showcase; and
- a root entry that loads the source site through `<base href="site/index.html">`.

The root entry keeps the public URL at the project site root while preserving
the existing `/site/` path for local debugging. Using an explicit document
base also prevents static hosts that redirect directory requests from sending
fragment-only navigation to a provider route. The builder rejects the
repository root as an output target and checks that `.git/`, `.work/`, `tmp/`,
and other machine-local directories do not enter the artifact.

Hosted wrappers add one more boundary: Hugging Face Static Spaces serve the
artifact inside a sandboxed iframe, while the same files remain reachable at
`/site/` for development. The homepage therefore writes its four section links
as `index.html#...`, making the document target explicit in both entry modes.
The header and footer wordmarks use `target="_top"` for the canonical Docs URL
on ordinary pages. When the runtime detects an embedding frame, it changes
only those brand links to a user-triggered `_blank` navigation with
`rel="noopener"`: the HF sandbox does not grant `allow-top-navigation`, so a
literal `_top` link can otherwise appear correct in source while doing nothing
on click. The in-page menu remains inside the Space.

## Alternatives considered

### Publish the whole repository

Rejected: this would expose working material and make the release boundary
depend on whatever happens to be present in the checkout.

### Move the source site into the repository root

Rejected: it would break the current local `/site/` development path and mix
the public presentation layer with the book's source tree.

### Use a third-party host

Deferred: GitHub Pages is the smallest change for a repository already hosted
on GitHub. A different host would add credentials, deployment ownership, and
another release surface.

## Consequences

- A push to `main` attempts to publish the current candidate showcase.
- A successful Actions run is evidence of artifact construction and deployment,
  not evidence that all chapters, labs, translations, or Skills are complete.
- The site is not called live until the Pages API and the public URL are both
  checked after deployment.
- If the private-repository plan blocks Pages, the owner must either enable an
  eligible GitHub plan or explicitly make the repository public before the
  workflow can become an online site.

## Sources

- GitHub Docs: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- GitHub Docs: [REST API endpoints for GitHub Pages](https://docs.github.com/en/rest/pages/pages)
- GitHub's [static Pages starter workflow](https://github.com/actions/starter-workflows/blob/main/pages/static.yml)
