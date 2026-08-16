# Model and workbench landscape: source receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)

**Status:** candidate research record. This is a map of the roles that owners
publicly describe. It is not a benchmark, product endorsement, availability
guarantee, price comparison, safety assessment, or claim that one model is
best.

**Owner:** platform-facts-maintainer
**Next review:** 2026-09-15, and before a reader-facing current-model claim.

## Why this record exists

New learners often see OpenAI, Answer.AI, xAI, Google DeepMind, and Moonshot AI
in the same conversation, then assume they all make the same kind of product.
They do not. A company can make foundation models, run a workbench, offer an
API, build applications, or teach applied practice. Those roles overlap but
are not interchangeable.

The useful first question is not “which one wins?” It is: *what task, input,
output, workbench, permission boundary, and check do I need today?* A vendor's
own positioning can suggest a test candidate. It cannot substitute for an
apples-to-apples run under the learner's conditions.

## Owner-described map

| Organisation | What the owner describes | Sensible teaching use | What this does not establish |
| --- | --- | --- | --- |
| OpenAI | The official API documentation publishes a model catalog, including text/code, reasoning, vision, audio, safety, and other model categories; its product documentation also distinguishes API, ChatGPT, and Codex surfaces. | Teach the difference between a model and the workbench or tools around it; use a task-specific candidate card before comparing models. | Which model is available to a learner, which surface has permission, cost, latency, safety, or better results for a task. |
| Answer.AI | Its site calls itself a practical AI R&D lab that creates end-user products from foundational research breakthroughs. | Use it as an example of applied research, products, education, and open-source work—not as a foundation-model picker. | That Answer.AI supplies a competing foundation model, or that a learner should choose it as a model provider. |
| xAI / Grok | The Grok 3 beta announcement emphasizes reasoning, knowledge, instruction following, and a lower-cost reasoning variant. | Treat reasoning-heavy or coding tasks as a testable Grok hypothesis when the learner has legitimate access. | A current ranking, account availability, benchmark transfer, or better real-world result than another model. |
| Google DeepMind / Gemini | The official Gemini page presents models and systems for intelligent agents, multimodal creation, audio, video, robotics, and other specialised uses. | Explain why input modality and ecosystem matter: a text-only task and an image/audio/video task do not need the same candidate set. | That every Gemini surface exposes every modality, tool, or integration, or that it is best for any one task. |
| Moonshot AI / Kimi | Moonshot's site presents Kimi models for coding, analysis, documents/spreadsheets/slides, and long-horizon knowledge work and reasoning. | Add Kimi to a fixed, lawful candidate set when these are the actual task needs and availability is confirmed. | Context, language, tool, cost, or quality superiority in the learner's environment. |

## A beginner-safe way to use the map

1. Choose one harmless task and one fixed input.
2. Define what a usable result must contain before you ask any model.
3. First compare a vague request with a checkable request in one available
   workbench.
4. Only then compare models, keeping the input, task, surface, tools,
   permissions, acceptance rubric, and retry rule fixed.
5. Record `not available`, `not comparable`, and `not run` rather than forcing
   every option into a score.

This order makes a common error visible: changing the prompt, model, tool,
conversation history, and acceptance rule at the same time, then calling the
preferred result “the best model.”

## Source ledger

| ID | First-party source | Accessed | Scoped use |
| --- | --- | --- | --- |
| M1 | [OpenAI API — Models](https://developers.openai.com/api/docs/models) | 2026-08-15 | Official model-catalog and product-surface context. Not an account-availability or performance result. |
| M2 | [Answer.AI — Practical AI R&D](https://www.answer.ai/) | 2026-08-15 | Official self-description of an applied AI R&D lab. Not a foundation-model catalogue. |
| M3 | [xAI — Grok 3 Beta](https://x.ai/news/grok-3) | 2026-08-15 | Owner-described 2025 beta positioning for Grok 3 and Grok 3 mini. Volatile and not a current comparative benchmark. |
| M4 | [Google DeepMind — Gemini](https://deepmind.google/models/gemini/) | 2026-08-15 | Owner-described Gemini product/model areas. Not an entitlement or feature matrix for a specific account. |
| M5 | [Moonshot AI](https://www.moonshot.ai/) | 2026-08-15 | Owner-described Kimi product/model areas. Not a task-performance result. |

## Source and claim boundary

This is original project-authored guidance using short paraphrases and links.
It imports no vendor prose, code, logo, screenshot, model output, account data,
or benchmark score. Product names, catalog entries, models, availability,
interfaces, pricing, and capabilities are volatile facts. Reopen the relevant
first-party source and verify the learner's actual account and workbench before
turning this map into a current operational recommendation.
