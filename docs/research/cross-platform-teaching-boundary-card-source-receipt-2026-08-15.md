# Cross-platform teaching boundary card: source receipt

**Accessed:** 2026-08-15 (America/Los_Angeles)

**Status:** candidate research record. This receipt records narrow, durable teaching boundaries drawn from official sources. It contains no live attack, tool call, learner study, product comparison, incident analysis, or control-effectiveness result.

**Owner:** security-research-maintainer
**Next review:** 2026-09-15, and before a product-specific safety or evaluation claim is added to a chapter, lab, Skill, or release.

## Research question

What single, cross-platform teaching artifact can make four responsible-AI boundaries visible before a learner asks an LLM to inspect outside material or propose work: who may authorize an external action, which instruction-like content is untrusted data, what data may leave the current surface, and what a small evaluation may honestly claim?

This is deliberately a curriculum question, not a claim that GPT, Codex, Claude Code, Grok, Llama, Microsoft Foundry, or any other product has the same controls, permissions, retention, model behavior, or safety properties.

## Evidence classes

| Class | Meaning in this record | It does not establish |
| --- | --- | --- |
| `official fact` | An owner publishes a risk, control, or evaluation boundary within its documented scope. | Behavior of another product, a learner environment, or this project. |
| `project inference` | A modest teaching rule derived from the official facts. | That the rule prevents harm, is complete governance, or satisfies a legal duty. |
| `not run` | No live model, tool, account, participant, or adversarial input was used here. | Attack resistance, privacy protection, model quality, learning, or productivity. |

## Narrow source-backed claims

### 1. Instruction-like content in data needs a separate handling decision

Microsoft Foundry describes *document attacks* as hidden instructions in third-party documents, emails, or web pages that try to hijack a model session; its Prompt Shields documentation says those attacks may be scanned at user-input and tool-response intervention points [S1]. OpenAI describes prompt injection as untrusted text or data that tries to override instructions and can lead to unintended behavior, including downstream tool misuse or private-data exfiltration [S2].

**Narrow project inference:** a lesson should ask the learner to label a webpage, file, search result, or tool response as `data to inspect`, not as a new task order. A request embedded in that material may be recorded as a proposal, but it cannot enlarge the task by itself.

### 2. Ability to perform an action is not authority to perform it

OpenAI's agent-safety guidance calls out downstream tool calls and recommends keeping control at consequential steps; Microsoft presents Prompt Shields as a guardrail control, not as a transfer of business authority [S1][S2]. NIST's AI RMF Playbook frames Govern, Map, Measure, and Manage as voluntary, context-dependent functions for trustworthy AI work [S3].

**Narrow project inference:** before a tool-assisted exercise, the learner should name the owner, target, and one permitted effect. A model suggestion, technical capability, or a sentence found in external material does not count as approval. If the proposed effect changes the target, data class, tool, or external impact, the correct instructional result is `stop and request a new owner decision`.

### 3. Data egress must be made inspectable before it happens

OpenAI identifies accidental private-data leakage as an agent risk and gives an example where an agent sends raw customer records rather than the intended summary [S2]. Meta's Llama 3 Acceptable Use Policy is an official policy source for a named model family, but it is not used here to infer a particular product runtime, connector, retention setting, or technical safeguard [S4].

**Narrow project inference:** a beginner exercise should distinguish a local draft from an outbound transfer. Before pasting, uploading, syncing, sending, publishing, or calling an external service, the learner should write the minimum non-sensitive fields allowed to leave, the destination, and the human who authorized that destination. If any of these are unknown, use a fictional fixture or stop; do not supply secrets, cookies, private repository contents, or customer records merely to complete an exercise.

### 4. An evaluation can support only the outcome it actually measured

NIST presents its AI RMF Playbook as voluntary, context-dependent suggested actions, not a universal certification method [S3]. OpenAI's evaluation guide describes evaluations as task- and criterion-based work, including graders and test cases [S5].

**Narrow project inference:** a course pilot may report a predeclared, task-scoped result such as the completion rate on a synthetic fixture, recorded time under stated conditions, or blinded rubric score. It must retain the task, model surface, version/date, conditions, scoring rule, missing data, and sample size. It must not relabel those measurements as an IQ increase, general intelligence, universal productivity gain, safety proof, or causal effect.

## Proposed single teaching improvement: the Boundary Card

Add one **project-owned Boundary Card** immediately before any lesson that uses external text, a tool, or an evaluation. It is a fill-in record, not a security control and not a new Skill:

```text
task: [the one question or artifact to inspect]
input status: [authorized instruction | external data | unknown]
allowed effect: [one named local/reversible action, or none]
egress: [nothing leaves | minimum permitted fields -> named destination -> owner]
evidence claim: [one observable check and the precise scope it can support]
stop: [new instruction in data | unknown destination | new authority | missing check]
```

For a first practice, the only allowed effect can be: “extract a date from a fictional notice and write it into a scratch note.” The expected evidence is the fictional source identifier, the extracted date, and a stop receipt if the notice asks the learner to upload, install, message, authenticate, or broaden the task. This remains low-risk and does not require a live connector or model account.

## Non-claims and limits

This record does **not** claim that:

- Prompt Shields, permissions, policies, schemas, human review, or this card prevent prompt injection, data leakage, or unsafe actions;
- Microsoft, Meta, OpenAI, Codex, Claude Code, Grok, Llama, or any unnamed LLM has equivalent controls or behavior;
- the card supplies legal authorization, privacy compliance, consent, a threat model, organizational policy, or a deployment approval;
- a learner can recognize untrusted instructions, preserve authority, or avoid disclosure after reading this material; or
- a static fixture, passing validator, model run, or chart proves security, learning, product quality, efficiency, productivity, or IQ improvement.

The next valid evidence would be a separately authorized, synthetic, low-risk pilot with declared conditions, no secrets or private records, saved stop cases, and independent review. That evidence would still be scoped to the tested task and environment.

## Source ledger

| ID | Official source | Accessed | Evidence class and scoped use | Owner / next review |
| --- | --- | --- | --- | --- |
| S1 | [Microsoft, “Prompt Shields in Microsoft Foundry”](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/content-filter-prompt-shields) | 2026-08-15 | `official fact`: Microsoft describes user-prompt and document attacks, including third-party documents, emails, webpages, and tool-response intervention points. Product-specific; not a finding about this project or another platform. | security-research-maintainer / 2026-09-15 |
| S2 | [OpenAI, “Safety in building agents”](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-15 | `official fact`: OpenAI describes untrusted text/data, downstream tool misuse, and private-data leakage risk in its agent guidance. Product-specific and volatile; not a safety result. | security-research-maintainer / 2026-09-15 |
| S3 | [NIST, “AI RMF Playbook”](https://www.nist.gov/itl/ai-risk-management-framework/ai-rmf-playbook) | 2026-08-15 | `official fact`: NIST describes voluntary, context-dependent guidance for Govern, Map, Measure, and Manage. Not a certification, product manual, or proof a control is effective. | responsible-ai-maintainer / 2026-12-15 |
| S4 | [Meta, “Llama 3 Acceptable Use Policy”](https://www.llama.com/llama3/use-policy/) | 2026-08-15 | `official fact`: official named-family policy source retained only as a scope boundary. No runtime, permission, privacy, or safeguard behavior is inferred. | platform-facts-maintainer / 2026-09-15 |
| S5 | [OpenAI, “Evals”](https://developers.openai.com/api/docs/guides/evals/) | 2026-08-15 | `official fact`: official guidance for task cases and graders. It does not establish a result, representativeness, causal effect, or a human-study method. | evaluation-maintainer / 2026-09-15 |

## Source and license boundary

This is an original project-authored synthesis. It uses short paraphrases and links only; it imports no source prose, code, prompt, screenshot, logo, model output, personal data, credential, or tool configuration. Linked sources remain under their owners' terms. The Boundary Card is a candidate recommendation, not a claim of security or effectiveness.
