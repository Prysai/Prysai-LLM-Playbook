# Old Codex demo content migration audit

**Status:** `candidate` / editorial intake only  
**Reviewed:** 2026-08-18  
**Owner:** curriculum maintainer  
**Source boundary:** user-provided local attachment; reference-only

## Why this record exists

The supplied demo is a 1,418-line Codex walkthrough with duplicated outline,
voiceover, and summary sections. It contains useful teaching nodes, but it also
contains old product wording, volatile plan and model claims, third-party
screenshots, video embeds, and links to a discontinued project. This record
keeps the useful coverage visible while giving each surviving idea one owner in
the current Prysai LLM Playbook.

The attachment is not a publication licence. No demo prose, screenshot, video,
thumbnail, logo, transcript, timestamp, or third-party prompt is copied into
the book. Reader-facing material is an original rewrite under the repository's
content licence.

## Source and rights decision

- **Local source:** user-provided local attachment (path intentionally omitted)
- **Observed source shape:** duplicated headings and voiceover blocks covering installation, project setup, permissions, Annotate, preview limits, model controls, Git, message editing, Fork, Worktree, Archive, `AGENTS.md`, Plan Mode, Side Chat, parallel sessions, Steer, Plugins, presentations, browser control, Computer Use, Skills, Automation, Mobile, workflow, FAQ, and summary.
- **Observed external targets:** the old video and summary links point to `https://aitodo.co/video/BV1c9EK6KEW4`, `https://aitodo.co/content/02d8858d-3acb-4b65-bcec-70afdce75a13`, Bilibili, and screenshot mirrors. They are retained here only as provenance; they must not appear in reader routes.
- **Rights classification:** `reference-only / rights-uncertain`. The local attachment did not provide a redistribution licence for its prose or media. The external targets are not treated as permission to copy.
- **Removal rule:** remove old project links, video embeds, screenshot URLs, timestamps, package prices, quota claims, model-speed claims, and UI promises from the new book. If a current product fact is still useful, re-check it against the product owner's official documentation and record an access date, surface, owner, and review trigger.

## Coverage map

| Demo node | Stable lesson retained | Current canonical owner | Rewrite boundary |
| --- | --- | --- | --- |
| Web coding introduction | A browser task is a deliverable with an audience, states, and acceptance checks | [Engineering track](../../book/chapters/16-engineering-track-EN.md) | Use a local, fictional, no-account example; do not promise one-shot app generation |
| Web coding quick start | Define the visible result, inspect the project, make a small change, run it in a real browser, and keep a receipt | [First Safe Change route](../../book/routes/first-safe-change-EN.md) and [Chapter 16](../../book/chapters/16-engineering-track-EN.md) | Replace old UI steps and screenshots with observable file, browser, and test evidence |
| AI programming learning route | Move from model boundaries to task contracts, vertical slices, tests, recovery, and transfer | [Engineering track](../../book/chapters/16-engineering-track-EN.md), [evaluation chapter](../../book/chapters/19-evaluate-models-and-workflows-EN.md), [personal work system](../../book/chapters/20-personal-codex-work-system-EN.md) | Learning progress is an evidence contract, not a seven-day or speed promise |
| Web coding resources | Search by question, source owner, version, and runnable example; record exclusions and stop conditions | [Research track](../../book/chapters/15-research-track-EN.md) | No unreviewed “resource大全” link dump; every external link needs a source role and review date |
| Model updates and project experience | Separate current facts, field reports, hypotheses, and local reproduction; compare fixed tasks rather than model hype | [Model selection](../../book/chapters/06-model-selection-EN.md), [evaluation](../../book/chapters/19-evaluate-models-and-workflows-EN.md), [future-proofing](../../book/chapters/22-continuous-update-and-future-proofing-EN.md) | Remove “best”, “fastest”, price, quota, and unscored productivity claims |
| Programming learning and product monetisation | Use AI for problem framing, prototypes, copy drafts, experiments, and review; validate demand, rights, costs, and conversion independently | [Marketing track](../../book/chapters/17-marketing-track-EN.md) | No income, conversion, or market-demand guarantee; use synthetic or authorised data in examples |
| AI application scenarios | Choose a deliverable first, then add the minimum capability, permission, verification, and rollback needed | [Content, design, data, and automation](../../book/chapters/18-content-design-data-automation-EN.md) | Keep content, design, data, automation, and external publishing as separate risk levels |
| DeepSeek technical and usage guide | Apply the transferable core, then verify DeepSeek-specific model, API, context, and account facts from current official sources | [LLM platform adapter guide](../../book/routes/platform-adapter-guide-EN.md) | Do not infer parity with ChatGPT, Codex, Claude, Gemini, or Grok; no stale model numbers |
| Installation and sign-in | A platform route begins with the exact surface, account scope, and current official setup page | [Platform adapter guide](../../book/routes/platform-adapter-guide-EN.md) | Do not retain old plan recommendations, quota claims, or undocumented login flows |
| Permissions and approval prompts | A model proposal, tool execution, authorization, test pass, and publication are different states | [Action boundaries](../../book/chapters/13-action-boundaries-EN.md) and [Chapter 4](../../book/chapters/04-context-permissions-and-agent-EN.md) | Keep permission choices generic unless a dated official Codex fact is recorded |
| Annotate and visual feedback | Point to the exact visible region, state the intended change, and verify the rendered result | [Engineering track](../../book/chapters/16-engineering-track-EN.md) and [content/design track](../../book/chapters/18-content-design-data-automation-EN.md) | Do not present Annotate as a universal or permanent product feature |
| Preview versus real runtime | A preview can have different storage, browser, network, or origin constraints; reproduce in the target runtime | [Engineering track](../../book/chapters/16-engineering-track-EN.md) and [verification/recovery](../../book/chapters/09-verification-and-recovery-EN.md) | Teach the diagnostic distinction, not the old incident as a product-wide rule |
| Git, message editing, Fork, Worktree, Archive | Conversation branching is not code rollback; commits, branches, worktrees, and archives have different recovery jobs | [Personal work system](../../book/chapters/20-personal-codex-work-system-EN.md) and [Chapter 9](../../book/chapters/09-verification-and-recovery-EN.md) | Avoid destructive reset instructions in beginner routes; require a verified backup and explicit scope |
| `AGENTS.md` and Plan Mode | Persist project rules in reviewed files; plan large changes before execution and acceptance testing | [Personal work system](../../book/chapters/20-personal-codex-work-system-EN.md) and [planning chapter](../../book/chapters/10-planning-and-slicing-EN.md) | Use the repository's `AGENTS.md` terminology; no claim that every client reads it identically |
| Side Chat, parallel sessions, and Steer | Separate exploration from the primary task and isolate concurrent writes | [Agent loop](../../book/chapters/12-agent-loop-and-stop-EN.md) and [action boundaries](../../book/chapters/13-action-boundaries-EN.md) | Treat names and UI behavior as volatile Codex facts, not cross-platform invariants |
| Plugins, browser, Computer Use, presentations | External capabilities expand authority and side effects; choose them by deliverable and verify the final form | [Skills/tools chapter](../../book/chapters/07-skills-plugins-and-tools-EN.md), [action boundaries](../../book/chapters/13-action-boundaries-EN.md), and [content/design track](../../book/chapters/18-content-design-data-automation-EN.md) | No copied plugin instructions or unconfirmed action guarantees |
| Skills | A Skill is a bounded, testable method with inputs, stops, outputs, and evidence | [Design a Skill](../../book/chapters/11-designing-a-skill-EN.md) and [external Skill audit](../../book/chapters/14-discover-and-audit-skills-EN.md) | Do not equate installation with reliability or reuse external Skill text without rights review |
| Automation and Mobile | Scheduled or remote work needs an explicit environment, permission, dry run, logs, and recovery plan | [Content/design/data/automation](../../book/chapters/18-content-design-data-automation-EN.md) and [team capability](../../book/chapters/21-team-capability-system-EN.md) | Current app availability and pairing steps belong in dated official adapter notes only |
| FAQ and recommended workflow | Define → plan → act → verify → review → deliver → maintain | [Full lifecycle workflow](../../book/chapters/08-full-lifecycle-workflow-EN.md) | Remove duplicated slogans; link to the canonical decision owner |

## Eight requested theme routes

The eight themes are intentionally distributed instead of becoming a second
mega-chapter. Each route starts after the LLM Foundation Core and returns to a
small observable task:

1. Web coding: [Chapter 16](../../book/chapters/16-engineering-track-EN.md).
2. Web coding quick start: [First Safe Change](../../book/routes/first-safe-change-EN.md).
3. AI programming learning route: [Chapters 10, 16, 19, and 20](../../book/table-of-contents-EN.md).
4. Web coding resources: [Chapter 15](../../book/chapters/15-research-track-EN.md).
5. Model updates and project practice: [Chapters 6, 19, and 22](../../book/table-of-contents-EN.md).
6. Programming learning and product experiments: [Chapter 17](../../book/chapters/17-marketing-track-EN.md).
7. AI application scenarios: [Chapter 18](../../book/chapters/18-content-design-data-automation-EN.md).
8. DeepSeek usage and technical boundary: [Platform Adapter Guide](../../book/routes/platform-adapter-guide-EN.md).

The links above are source-level canonical links. The published site must
project them through the Reader with the selected locale; it must not expose
raw legacy project paths or old demo destinations.

## Editorial acceptance checks

- [ ] Every retained demo node has one canonical owner and one failure or
      boundary case.
- [ ] Every volatile product statement names its surface, owner URL, access
      date, scope, and review trigger.
- [ ] No reader-facing file contains the old demo URLs, screenshot mirrors,
      video timestamps, package prices, quota claims, or unsupported model
      performance claims.
- [ ] Web coding examples use fictional or authorised local material and are
      checked in a real target runtime.
- [ ] Monetisation language describes hypotheses and experiments, never
      guaranteed income or conversion.
- [ ] DeepSeek content remains an adapter and does not imply platform parity.
- [ ] The English rewrite is reviewed before six locale translations are
      updated; every localized link points to its same-language Reader route.
- [ ] New content remains `candidate / not_run` until learner and independent
      review evidence exists.

## Non-claims

This audit proves coverage and editorial routing only. It does not prove the
old demo's product facts, current Codex behavior, DeepSeek behavior, web-coding
success, learning speed, programming mastery, income, conversion, platform
equivalence, translation quality, learner outcomes, or production readiness.
