<!-- content_id: platform-adapter-guide-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-16 -->

# Choose your LLM platform: the same core, then one adapter at a time

**Status:** `candidate`. **Run status:** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok, and Codex all speak to you in
conversation, but they are not the same product. This route keeps the
transferable core from the
[Universal Core Foundations route](universal-core-foundations-EN.md) and adds
one honest adapter at a time: what actually differs, what you can try safely
today on each platform, and what you must check in official sources before
trusting a platform-specific claim.

The Playbook's flagship practice track is Codex, but the method is not locked
to one vendor. Every named platform below is a **candidate adapter**: the
universal core applies, the platform-specific controls need their own dated,
first-party source before they become teaching facts.

## Rule zero: never infer equivalence from a name

A model name, a login, or a familiar button does not prove that two platforms
share tools, permissions, memory, accounts, prices, data controls, or Agent
behavior. Before you repeat a platform claim, ask three questions:

1. **Which product surface exactly** (web chat, app, CLI, IDE, API, agent)?
2. **Which first-party source, checked when**, says this is true today?
3. **What would visibly change** if the claim were wrong?

If you cannot answer all three, keep the claim as `unknown` and record the
next check. See the
[Platform Adapter Review Skill](../../skills/prysai-platform-adapter-review/SKILL.md)
and [Platform Fact Watch](../../skills/prysai-platform-fact-watch/SKILL.md) for
the maintenance method behind this rule.

## The one-page platform map

| Platform | Typical surfaces | What usually differs from the core | Safe first step on this page |
|---|---|---|---|
| ChatGPT | web chat, app, API | account scope, memory settings, file upload, browsing toggle, share links | [ChatGPT first task](#chatgpt-first-task) |
| Claude / Claude Code | web chat, CLI agent, IDE | terminal + file agent, permission prompts, CLAUDE.md project memory | [Claude Code first task](#claude-code-first-task) |
| Gemini | web chat, app, API | Google account scope, Google Workspace integration, app extension | [Gemini first task](#gemini-first-task) |
| DeepSeek | web chat, app, API | model choice and context window vary by release; check official model page | [DeepSeek first task](#deepseek-first-task) |
| Grok | web chat, app | X account integration, real-time posts access, model release cadence | [Grok first task](#grok-first-task) |
| Codex | desktop, CLI, IDE, cloud, API | the Playbook's flagship track: files, tools, Skills, Agents, permissions | [Codex path](../routes/first-safe-change-EN.md) |

This table is orientation, not equivalence. Each row still needs its own
current source before a lesson depends on it. Surface availability, pricing,
and permission defaults change frequently; treat them as volatile facts.

## The safe first task on any platform

Copy this request into the platform you chose. It uses fictional material, no
tools, and no account data — the same task works everywhere, which is exactly
the point of the core.

```text
Result: rewrite this fictional club notice for new members.
Material: "The club meets Tuesday at 6. Bring a notebook. The room will be
confirmed later."
Response shape: write two sentences. Keep every stated fact. Put any missing
detail in [brackets]. Then list the facts you preserved.
Check: compare the source and rewrite. No new time, room, fee, contact, or
promise may appear.
Stop: do not browse, send, publish, or assume an unknown detail.
```

Then check three things yourself:

1. Can you point to every statement in the rewrite in the supplied notice?
2. Did the reply obey the two-sentence limit and show what it preserved?
3. Did it add a detail that should remain `[unknown]`?

If the chat offers to search, send, publish, use a tool, or requests more
material than this small exercise needs, stop. The platform may be capable of
those actions; capability is not an instruction to use them.

## ChatGPT first task

Open any ChatGPT surface and run the safe first task above. Then note one
platform difference you can actually observe: does the reply mention browsing,
memory, or a share link? Record what you saw, not what you assume. For a
source-backed check of a ChatGPT claim, use the
[Source Investigator Skill](../../skills/prysai-source-investigator/SKILL.md)
with the official OpenAI help pages as the owner of product facts.

## Claude Code first task

Claude Code is a terminal agent: it can read and edit files in the project you
start it in. Before running anything, create a disposable folder and run the
safe first task there. Watch the permission prompt: does it ask before editing
files or running commands? That prompt is the difference between chat and
agent — it is also the point where you choose. For project memory, Claude Code
reads a `CLAUDE.md` file; treat anything written there as instructions a
model may follow, so review it like any project rule. Do not start Claude Code
in a real repository with credentials, production data, or destructive
commands until you have completed the
[First Safe Change route](first-safe-change-EN.md) discipline.

## Gemini first task

Run the safe first task in the Gemini chat surface. Note which account scope
is active and whether app extensions (Google Workspace, YouTube, Maps) are
offered in the UI. An extension is an external effect: it can read or write on
your behalf, so a Gemini lesson about extensions is a platform adapter topic,
not a core topic. Do not enable extensions for a text-only practice task.

## DeepSeek first task

Run the safe first task in the DeepSeek chat or app surface. Model naming,
context window, and availability change between releases; the official model
page is the owner of those facts. Record the model name you actually used and
the date, so the run stays reproducible. Do not paste API keys, private code,
or internal documents into a web chat.

## Grok first task

Run the safe first task in the Grok chat surface. If your account is linked to
X, note that posts and real-time content may be in scope for the conversation;
that is a platform difference, and it is also a privacy decision. Do not paste
private messages or drafts into a conversation that can reach a social graph.
A Grok answer that cites current posts is a claim about the platform's
retrieval behavior — check it against the official X/Grok help pages before
repeating it.

## Codex first task

Codex is the Playbook's flagship track because it exposes the full loop:
context, tools, permissions, Skills, Agents, and verification. Start with the
[First Safe Change route](first-safe-change-EN.md) and
[Lab 001](../labs/lab-001-first-safe-task-EN.md) in a disposable project.
Do not jump to a cloud surface or a real repository until the
inspect-before-edit habit is comfortable.

## After the first task: which track should you follow?

- You want a text-only starter practice: [Beginner Practice Pack](../communication-clinic-EN.md).
- You want the deep flagship track with files and tools: [First Safe Change](first-safe-change-EN.md).
- You want the platform-neutral foundation first: [Universal Core Foundations](universal-core-foundations-EN.md).
- You want to compare two platforms fairly: [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md).
- You want to know whether a platform lesson belongs in the curriculum:
  [Platform Adapter Review](../../skills/prysai-platform-adapter-review/SKILL.md).

## Evidence state and boundary

This route is `candidate / not_run`: the structure and checks exist, but no
learner run, cross-platform run, or independent review is recorded. The
per-platform descriptions above are orientation derived from first-party
documentation and dated research receipts
([cross-LLM beginner prompting source receipt](../../docs/research/cross-llm-beginner-prompting-and-platform-boundaries-source-receipt-2026-08-15.md),
[platform teaching boundary card](../../docs/research/cross-platform-teaching-boundary-card-source-receipt-2026-08-15.md)).
They are not evidence that any platform behaves identically, that a task will
succeed everywhere, or that product features are equivalent. Platform-specific
commands, permissions, prices, and availability are volatile facts: check the
official source with an access date before relying on them.

- [ ] I used only fictional, public, or authorized text.
- [ ] I recorded the exact surface, model name if visible, and date of my run.
- [ ] I did not treat one platform's behavior as proof of another's.
- [ ] I did not paste secrets, private messages, or unpublished files.
- [ ] I stopped when a tool, browsing, upload, send, or publish was offered.
