# Naming and positioning transition: a general method with a Codex flagship

**Status:** superseded for reader-facing naming by
[ADR-0034](../adr/0034-prysai-llm-playbook-reader-identity.md). The
`Models at Work` proposal below is preserved as a decision input; it is not an
active public identity. At the time of this proposal, no repository identifier,
remote URL, tag, or deployment had changed; ADR-0035 records the later
repository rename.

> **Decision outcome (2026-08-14):** Prysai selected **Prysai LLM Playbook —
> From First Task to Reliable Work**. Codex remains the flagship practice track. See ADR-0034
> for the exact scope, compatibility boundary, and claims this decision does
> not make.

## Decision requested from Prysai at the time of this proposal

Approve, reject, or revise this recommended reader-facing identity:

> **Models at Work**
> *From first task to real work*
> A field guide for turning language-model output into checked work.

The recommendation keeps the proven phrase “From first task to real work” as
the outcome promise while removing `Codex` from the umbrella product name.
Codex remains the flagship, deepest practice track. This preserves the current
course's strongest material without pretending that Codex, Claude Code, or any
other platform shares identical controls or outcomes.

## Why this change is needed

The then-current title, **Codex: From First Task to Real Work**, was precise
for one track but narrower than the actual architecture. The project already
taught a general collaboration core and explicitly made platform lessons earn
admission through sources, bounded runs, failures, and review dates. A reader
who uses a different language-model product should be able to recognise the
core method without being promised a completed adapter.

`Models at Work` is intentionally plain:

- it describes practical use rather than product hype;
- it leaves room for research, language practice, design, and software work;
- it does not claim to be official, comprehensive, or cross-platform
  equivalent; and
- it makes the flagship/adapters boundary easier to explain in one sentence.

It is a recommendation, not a branding claim. “Models” here means language
models in the curriculum's defined scope; it does not expand the project into a
survey of every machine-learning system.

## Proposed reader-facing positioning (not adopted)

```text
Prysai Lab
MODELS AT WORK
From first task to real work

Learn a transferable method for turning a plausible answer into a bounded,
checkable result. Practise it most deeply in Codex. Other named platforms enter
only through a source-backed, runnable adapter.
```

The first paragraph should sound like a teacher, not an audit report: welcome
the reader with familiar names, name the first question, promise one small
result, then introduce evidence and boundaries. The Chapter 1 opening supplies
that pattern. It should not begin with plan names, menus, pricing, or a long
list of features.

## Scope boundaries at the time of proposal

- This proposal **did not itself** rename `Prysai/Codex-Field-Guide`, alter
  GitHub visibility, create a redirect, publish a release, or enable Pages.
- It **does not** claim that Codex and Claude Code are direct equivalents or
  that their tool, permission, context, Skill, Agent, or persistence behaviour
  is the same.
- It **does not** reclassify the candidate curriculum as verified or replace
  the need for learner evidence.
- It **does not** license, embed, or reproduce the supplied third-party video,
  transcript, screenshots, or image URLs.

## Staged migration after an owner decision

| Stage | Local change | Evidence needed before the next stage |
| --- | --- | --- |
| 1. Positioning | Update README, site title, social image text, and book preface; retain a clear “Codex flagship” label. | Owner approval of the final name and short promise. |
| 2. Content taxonomy | Rename the generic course layer and add a compact adapter index; preserve existing canonical IDs and redirects/aliases. | Source review for every named-platform statement; no broken navigation or localisation identity. |
| 3. Repository identity | Decide whether the remote repository and URLs should follow the new public name. | Explicit authorization, redirect plan, link audit, contributor notice, and release/rollback plan. |
| 4. Public release | Publish one stable reader path and disclose the candidate evidence boundary. | Version, changelog, tag, deployment evidence, maintenance owner, and a small learner pilot record. |

## Recommended order for GitHub Pages

Do **not** make the raw repository public merely to obtain a public URL and
then repair the identity afterwards. Pages is useful for the first public beta,
but its first impression should already have a clear name, a short promise, and
one working reader path.

1. Keep the current repository private while the candidate reader is checked
   locally from the bounded Pages artifact.
2. Approve the public name and the one-sentence positioning above. Update the
   reader-facing front door as one small, reviewable change.
3. Create a named candidate release with its status boundary, changelog,
   rollback target, and no sensitive material in the artifact.
4. Enable Pages using the existing build-and-artifact workflow, then inspect the
   deployed URL on desktop and mobile before announcing it.
5. Make the repository public and add the site URL only when the published
   surface and the repository promise agree.

GitHub's current documentation says a GitHub Free account or organisation must
use a **public** repository for Pages. It also notes that a Pages site is public
on the internet even when a paid plan permits a private source repository.
Publishing must therefore be treated as a real release decision, not a private
preview. The project already has a bounded Pages-artifact builder, but this
proposal does not enable Pages or publish anything.

Sources checked 2026-08-14: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

The exact public name is a product-owner decision because it affects discovery,
URLs, visual assets, repository identity, and future adapters. Until Prysai
approves a final name, this document is the sole place that treats `Models at
Work` as a proposed identity.
