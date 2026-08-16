# License and contribution options — 2026-08-15

**Status:** `proposal / not adopted`
**Decision owner:** Prysai Lab
**Scope:** the repository's project-owned material only

## Problem

The current repository-wide default is CC BY-NC 4.0. It protects against
commercial reuse, but creates friction for enterprise learning, commercial
training, redistributors, and contributors who expect standard open-source
reuse of scripts and test infrastructure. It also treats curriculum text and
software-like artifacts as one licensing surface.

This proposal does **not** change the current license, relicense earlier
contributions, or grant rights in the Prysai name or logos. It is not legal
advice; adopt a choice only after the owner reviews the applicable rights and
the provenance of every affected file.

## Options

| Option | Curriculum and teaching assets | Scripts, static-site code, and evaluation tooling | Adoption effect |
| --- | --- | --- | --- |
| Keep current policy | CC BY-NC 4.0 | CC BY-NC 4.0 | Lowest commercial reuse, highest friction for teams and external tooling contributors. |
| Split, attribution-first (recommended) | CC BY 4.0 | Apache-2.0 | Lets teams reuse and translate the curriculum with attribution while giving code contributors a standard patent-aware software license. |
| Split, reciprocity-first | CC BY-SA 4.0 | Apache-2.0 | Allows commercial reuse but asks adapted curriculum copies to retain the same sharing terms. |

The Prysai name, logos, and marks should remain excluded from every option.
Skills need an explicit owner decision: retain them as curriculum under the
chosen content license, or classify them as reusable operational artifacts
under Apache-2.0. Do not leave that boundary implicit.

## Recommended adoption sequence

1. Choose one option in writing and create an accepted ADR; do not treat this
   proposal as permission to change the license.
2. Inventory project-owned versus third-party or contributor-owned paths.
3. Add `LICENSE-CONTENT`, `LICENSE-CODE`, and explicit directory notices;
   retain third-party notices separately.
4. Ask existing external contributors for the necessary relicense permission;
   do not assume a new license applies retroactively to their work.
5. Update `LICENSE`, `CONTRIBUTING.md`, `docs/sources/licensing.md`, the asset
   register, PR template, release review, and public description together.
6. Turn on the host-side protection configuration only when the organization
   plan actually supports enforcement, then verify its live state separately.

## Contribution ownership until a decision is adopted

Until the owner adopts a new policy, every contributor must have the right to
submit the work under the current repository default. The fast test-material
route requires a commit sign-off and an explicit PR declaration of authorship,
source boundary, and license acceptance. Those declarations support review;
they are not an automatically enforced CLA, a transfer of trademark rights, or
a substitute for legal review.

## References

- Current project license: [CC BY-NC 4.0 legal code](https://creativecommons.org/licenses/by-nc/4.0/legalcode)
- Attribution-first option: [CC BY 4.0 legal code](https://creativecommons.org/licenses/by/4.0/legalcode)
- Reciprocity-first option: [CC BY-SA 4.0 legal code](https://creativecommons.org/licenses/by-sa/4.0/legalcode)
- Code option: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
