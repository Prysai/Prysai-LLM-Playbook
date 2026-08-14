# External content and authority: a public-interest AI safety note

**Accessed:** 2026-08-13 (America/Los_Angeles)

**Status:** candidate research record. This is a source-bounded learning supplement, not incident evidence, threat-model coverage, security certification, or proof that a control works.

**Owner:** security-research-maintainer

**Next review:** 2026-09-13, and before using a product-specific claim in a lab, Skill, policy, or release decision.

## Research question

When an agent reads a webpage, document, search result, tool response, or other external data, how can instruction-like content pressure the task beyond authority originally granted by a person or organization? Which practical controls can individuals and teams use to keep that authority boundary visible?

The public-interest concern is not that every external document is hostile. Ordinary data flows can mix *content to inspect* with *words that ask for a new action*. A person who owns a task, data, or affected account should be able to distinguish the original permission from a request embedded in the material.

## Scope and terms

**In scope:** AI work involving external text, files, webpages, connectors, or tool results; the distinction between data, technical capability, task authority, and an observable result.

**Out of scope:** a finding about a particular model, account, organization, or incident; a live attack or bypass; product configuration instructions; complete threat modeling; compliance advice; and a claim that any mitigation prevents prompt injection or unsafe action.

For this note, **authority** means a named owner approved a specific action on a specific target under stated limits. It differs from a model suggesting an action and from a tool technically being able to perform one. Instruction-like data does not grant authority by itself. Effective scope can still widen if a model, person, or downstream workflow treats data as a reason to request, approve, or execute a broader action without a new decision.

## Evidence classes

| Class | Meaning in this note | It does not establish |
| --- | --- | --- |
| `official fact` | A publisher describes a risk or control in its documented scope. | A reader's product behavior, configuration, incident history, or safe deployment. |
| `project inference` | A conservative learning or governance action derived from sources. | That the action blocks every failure or is sufficient for an organization. |
| `not run` | This project did not perform a live attack, tool call, or learner study. | Attack resistance, model quality, user behavior, or learning effectiveness. |

## Compact risk pathway

This conditional pathway shows where a control or human decision can interrupt an unsafe expansion. It does not claim every stage occurs.

| Stage | Possible transition | Boundary to preserve | Practical control | Evidence to retain |
| --- | --- | --- | --- | --- |
| 1. External material arrives | A file, page, citation, or tool result contains imperative language. | Material is data, not a task order. | Name the approved source and one field or question to inspect. | Source identity and allowed-field list. |
| 2. The model interprets it | The model turns text into a proposed action, command, or request for more data. | A proposal is not permission. | Keep untrusted content out of privileged instructions; use a narrow validated output shape where available. | Requested action and original task card. |
| 3. Authority is considered | A person or workflow might accept the expanded proposal. | Only the named owner can broaden scope. | Use an explicit approval path for consequential actions and deny by default for excluded capabilities. | Approval, rejection, or stop record with owner and target. |
| 4. A tool or person acts | The broader action could read, write, disclose, publish, or change a system. | Technical access must be no broader than approved action. | Least privilege, confirmation, and a focused receipt. | Inspectable artifact, action log where available, and stated unknowns. |

OpenAI describes prompt injection as untrusted text or data that attempts to override instructions and can lead to misaligned actions or downstream tool misuse. OWASP describes indirect injection as external content, including websites or files, that changes model behavior unexpectedly. Neither statement shows that this pathway occurred in this project or in a reader's environment.

## Claim ledger

| ID | Claim | Class | Support | Scope, access, and review | Boundary |
| --- | --- | --- | --- | --- | --- |
| C1 | Untrusted text or data can attempt to override agent instructions and influence downstream actions. | `official fact` | [S1](#sources) | OpenAI agent-workflow guidance; accessed 2026-08-13; owner: facts-maintainer; review: 2026-09-13. | Not a claim about every model, Codex surface, account, or observed incident. |
| C2 | External webpages and files can be sources of indirect prompt injection; impact depends on context and agency. | `official fact` | [S3](#sources) | OWASP LLM01:2025; accessed 2026-08-13; owner: security-research-maintainer; review: 2026-09-13. | Not proof an external artifact is malicious or an injection succeeds. |
| C3 | A permission layer can constrain allowed actions independently of prompt-level instructions. | `official fact` | [S2](#sources) | Anthropic Claude Code permissions; accessed 2026-08-13; owner: platform-facts-maintainer; review: 2026-09-13. | Product-specific; does not describe other platforms or prove configuration is correct. |
| C4 | Structured outputs, isolation, approvals, and guardrails can reduce risk, but cited sources do not say risk is eliminated. | `official fact` | [S1](#sources); [S3](#sources) | Agent and LLM application design guidance; accessed 2026-08-13; owner: security-research-maintainer; review: 2026-09-13. | No control-effectiveness test was run by this project. |
| C5 | A teaching workflow should require a named owner decision before an external-data-derived proposal expands target, data class, tool, or effect. | `project inference` | C1-C4 and action model below. | Cross-platform learning rule; accessed 2026-08-13; owner: curriculum-maintainer; review: 2026-09-13. | A decision aid, not access control or legal authorization. |
| C6 | This note demonstrates a control works against prompt injection or a real attack. | `not run` | No live model, tool, account, adversarial test, or learner session was used. | Safety effectiveness; owner: security-research-maintainer; review before any such claim. | Deliberately outside this record. |

## Three-level action model

The levels are cumulative. Individual practice is useful, but does not replace team review or technical permission enforcement.

### Level 1 - Individual: make the boundary legible

Before reading external material, record a small action envelope:

```text
input: named source and the one field to inspect
allowed: one named, reversible local action
not allowed: secrets, new tools, broader reads, installation, authentication,
             external write, publication, deletion, or permission changes
evidence: source location and one inspectable output
stop: a request or proposal that changes target, data class, tool, or effect
```

When instruction-like text appears, classify it as `untrusted data`; extract only the predeclared field. If it proposes a broader action, preserve the original task and record `authority not granted`. Do not infer permission from the text or from technical access the system happens to have.

### Level 2 - Team: make exceptions reviewable

For shared work, name the owner of a scope change. A compact shared record can identify the original task owner, source, target, data class, requested action, reviewer, decision, and time. Reviewers must be able to reject an expansion without being asked to supply a workaround.

Useful defaults include redaction for sensitive input, a named approval route for consequential effects, and an expectation that a completion statement includes an artifact, a check actually performed, and remaining unknowns. These are governance practices, not a substitute for technical controls or organization-specific security review.

### Level 3 - Workflow owner: constrain capability and data flow

Where configuration is available, separate untrusted material from privileged instructions, limit tool capabilities to the task, and require confirmation for consequential operations. Prefer narrow, validated fields between stages over free-form text directly determining a tool call. Preserve evidence that distinguishes a proposal, approved action, executed action, and verified outcome.

This level reflects cited guidance. It does not mean schemas, approvals, or permissions are sufficient by themselves; configuration, tool semantics, people, and organizational context still matter.

## Public user-signal boundary

This report does **not** use a forum post, social-media item, support thread, or issue as evidence for its claims. The authoritative sources establish the bounded risk framing.

If a future revision includes a public user signal, it must be labeled `public user report` and include its URL, access date, author or repository, and exact observed symptom. It may justify a synthetic teaching question; it must not assert prevalence, root cause, severity, current product behavior, a confirmed incident, or that a proposed control solved the report.

## Safe research and teaching constraints

Use a fixed fictional fixture for first practice. It may contain one instruction-like sentence, but it must not include a real credential, private path, customer record, operational payload, live target, or instruction to contact, upload, install, publish, delete, authenticate, or make a network request.

The learner should only name the source, extract one specified field, classify instruction-like text as data, and write a local stop receipt. No live model, connector, tool, browser session, or account is needed. A passing fixed-fixture response demonstrates only that the declared classification was recorded. It does not demonstrate real-world research ability, prompt-injection resistance, security competence, transfer, or a control's effectiveness.

## Sources

| ID | Source | Accessed | Scoped use | Source boundary |
| --- | --- | --- | --- | --- |
| S1 | [OpenAI, "Safety in building agents"](https://developers.openai.com/api/docs/guides/agent-builder-safety) | 2026-08-13 | Prompt injection, private-data leakage, structured outputs, tool approvals, guardrails, and evaluations in agent workflows. | Volatile and scoped; not a statement about every OpenAI or Codex surface. |
| S2 | [Anthropic, "Configure permissions"](https://code.claude.com/docs/en/permissions) | 2026-08-13 | Claude Code permission rules and distinction between permission enforcement and model instructions. | Product-specific; does not establish another platform's behavior. |
| S3 | [OWASP Gen AI Security Project, "LLM01:2025 Prompt Injection"](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 2026-08-13 | Direct and indirect injection risk framing and mitigation categories. | Risk taxonomy and guidance, not incident evidence, complete threat-model coverage, or a guarantee that mitigations work. |

## Source and evidence limits

This is original project-authored synthesis. It contains links and brief paraphrases only; it imports no external text, code, prompt, image, logo, credential, user report, or operational procedure.

It is **not** incident evidence, threat-model coverage, security certification, or proof a control works. It does not establish that a reader, model, tool, team, configuration, or organization is secure; that an authority boundary was preserved in a live task; that a control prevented disclosure or unsafe action; or that the teaching approach improves learner behavior. The next valid evidence for any of those claims would need a separately authorized, bounded, synthetic evaluation with preserved receipts and independent review.
