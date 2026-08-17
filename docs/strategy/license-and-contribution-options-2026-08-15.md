# License and contribution options — 2026-08-15

**Status:** `adopted 2026-08-16 (attribution-first split)`
**Decision owner:** Prysai Lab
**Scope:** the repository's project-owned material only

## Problem (historical context)

Before this decision, the repository treated its project-owned material as a
single CC BY-NC 4.0 surface. That boundary protected against commercial reuse,
but created friction for enterprise learning, commercial training,
redistributors, and contributors who expected standard open-source reuse of
scripts and test infrastructure. It also treated curriculum text and
software-like artifacts as one licensing surface.

This proposal does **not** relicense third-party material or grant rights in
the Prysai name or logos. It is not legal advice. **Adoption record:** on
2026-08-16 the project owner adopted the attribution-first split (content CC
BY 4.0, code Apache-2.0). All historical commits are by the project owner, so
no external relicense permission was required; the change applies
retroactively to project-owned material.

## Options

| Option | Curriculum and teaching assets | Scripts, static-site code, and evaluation tooling | Adoption effect |
| --- | --- | --- | --- |
| Keep current policy | CC BY-NC 4.0 | CC BY-NC 4.0 | Lowest commercial reuse, highest friction for teams and external tooling contributors. |
| Split, attribution-first (recommended) | CC BY 4.0 | Apache-2.0 | Lets teams reuse and translate the curriculum with attribution while giving code contributors a standard patent-aware software license. |
| Split, reciprocity-first | CC BY-SA 4.0 | Apache-2.0 | Allows commercial reuse but asks adapted curriculum copies to retain the same sharing terms. |

The Prysai name, logos, and marks remain excluded from every option. The
adopted decision classifies project-authored Skill instructions as curriculum
under CC BY 4.0; they are not separately licensed executable libraries.

## Adoption record and remaining work

The project owner adopted the attribution-first split on 2026-08-16: project-
owned curriculum, diagrams, screenshots, Skill instructions, and other teaching
assets use CC BY 4.0; project-owned scripts, static-site code, evaluation
tooling, and build generators use Apache-2.0. The binding boundary is recorded
in [`docs/sources/licensing.md`](../sources/licensing.md), `LICENSE`, and
`LICENSE-CODE`.

Remaining release work is operational rather than a pending license choice:

1. Keep third-party and contributor-owned material under its own recorded
   terms; do not infer a relicense from the repository default.
2. Preserve source, attribution, and adaptation records in the asset register.
3. Add or retain file-level notices whenever a path cannot be classified by
   the default boundary.
4. Recheck the boundary when a new external Skill, asset, or contributor is
   admitted.

## Contribution ownership under the adopted boundary

Contributors must submit work they own or are authorized to adapt, disclose
material third-party restrictions, and state whether the contribution is
content (CC BY 4.0) or code/tooling (Apache-2.0). The fast test-material route
requires a commit sign-off and an explicit PR declaration of authorship, source
boundary, and license acceptance. Those declarations support review; they are
not an automatically enforced CLA, a transfer of trademark rights, or a
substitute for legal review.

## References

- Historical repository option: [CC BY-NC 4.0 legal code](https://creativecommons.org/licenses/by-nc/4.0/legalcode)
- Attribution-first option: [CC BY 4.0 legal code](https://creativecommons.org/licenses/by/4.0/legalcode)
- Reciprocity-first option: [CC BY-SA 4.0 legal code](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
- Code option: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
