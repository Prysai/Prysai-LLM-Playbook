# Licensing and asset boundary

This repository is a mixed-content learning project. A single permissive code
license must not be inferred from the presence of scripts or Markdown files.
Two licenses apply, and third-party material keeps its own boundaries.

## Default content license: CC BY 4.0

Unless a file says otherwise, the curriculum text, diagrams, screenshots, Skill
instructions, and other project-owned teaching assets are released under
**CC BY 4.0** (Creative Commons Attribution 4.0 International). Reusers may
share and adapt the material for any purpose, even commercially, as long as
they give appropriate credit, link to the license, and indicate whether
changes were made.

The binding notice is the root [`LICENSE`](../../LICENSE) file. The Prysai name,
logos, and marks remain project-owned and are not licensed by that notice.

## Code license: Apache-2.0

Scripts, static-site code, evaluation tooling, build generators, and other
software-like files are licensed under the **Apache License, Version 2.0**
(`LICENSE-CODE`). This gives code contributors a standard patent-aware license
while the curriculum stays under CC BY 4.0.

Project-owned Markdown Skill instructions are curriculum material under CC BY
4.0. They are not separately licensed executable libraries, and a future
code-license split does not alter that treatment unless a file-level notice or
release decision says otherwise.

## Third-party material

Research records may link to or summarize external sources. A source record is
not permission to copy its prose, images, code, prompts, or branding. The
asset register records the allowed use for each source; unresolved or
reference-only material must stay outside vendored release assets. Changing
the project default license does not relicense third-party or contributor
material.

## Contributions

Contributors must submit work they own or are authorized to adapt, disclose
material third-party restrictions, and accept the repository's default license
for the submitted project-owned contribution: CC BY 4.0 for content and
Apache-2.0 for code. A contribution that cannot meet that boundary must not be
merged until its license is recorded explicitly. The Prysai Lab organization
holds copyright on project-owned material; attribution for reuse follows the
CC BY 4.0 terms.

## Release gate

The project cannot be called `production-ready` while an asset lacks a source,
license decision, attribution requirement, or owner. A green structural check
does not close this gate.

## Adoption record

On 2026-08-16 the project owner adopted the attribution-first split proposed in
[`docs/strategy/license-and-contribution-options-2026-08-15.md`](../strategy/license-and-contribution-options-2026-08-15.md):
content under CC BY 4.0, code under Apache-2.0. All historical commits are by
the project owner, so no external relicense permission was required. This
adoption does not relicense third-party assets listed in the asset register.
