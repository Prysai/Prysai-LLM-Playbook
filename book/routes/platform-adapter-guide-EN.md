<!-- content_id: platform-adapter-guide-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: 2026-09-03-platform-encyclopedia -->

# Choose your LLM platform: the same core, then one adapter at a time

**Status:** `candidate`. **Run status:** `not_run`.

ChatGPT, Claude, Gemini, DeepSeek, Grok, Codex, and Claude Code may all
appear to start with a chat box. That similarity is useful, but it can hide
the decision that matters: are you using a model in a chat, a desktop client,
an editor, a terminal agent, or a hosted computer? Each surface has different
files, permissions, account rules, and failure modes.

This route is a practical encyclopedia entry, not a product ranking. Use it to
choose one small starting surface, install only what you need, and keep the
transferable method from the
[Universal Core Foundations route](universal-core-foundations-EN.md). Commands,
plans, availability, and client support are volatile facts. The dated source
receipts linked below record what the official documentation supported on
2026-09-03; they do not prove that an installer, account, or task works for you.

## How to use this page

Start with the question you actually have.

| If you want to... | Start with... | Do not assume... |
| --- | --- | --- |
| Ask, draft, compare, or learn with supplied text | A web or mobile chat | The chat can inspect local files or act outside the conversation |
| Work with a local codebase and review edits | An IDE or terminal agent in a disposable project | It has permission to change every file, run every command, or publish work |
| Keep a long-running task on a hosted machine | A documented cloud-agent surface | Hosted files, sessions, identity, and approval rules are the same as your laptop's |
| Use a model from your own software | The vendor API documentation | An API is the same product as a consumer app or coding agent |

If two products share a name, pause before treating them as one thing. Product
marketing often groups them together; safe operation requires separating them.

## The four layers to keep separate

1. **Model:** the system that generates an answer or proposes an action.
2. **Product:** the vendor experience that provides the model, account, and
   policy layer.
3. **Client:** the thing you open: a browser, phone app, desktop app, IDE
   extension, or terminal program.
4. **Runtime:** where work occurs: your device, a container, a hosted machine,
   or a vendor service.

The same product can have several clients and more than one runtime. Installing
a desktop application does not prove that its web version, CLI, and cloud
agent share the same tools or permissions.

## The one-page platform and client map

| Product or family | Documented client choices in this guide | Useful when | Boundary to keep visible |
| --- | --- | --- | --- |
| ChatGPT | web, mobile, desktop, API | You need a general-purpose conversation surface | A chat session is not automatically a local coding environment |
| Codex | CLI, IDE, desktop app, Codex Web/Cloud | You need a coding workflow with project context | Local, desktop, and cloud work are separate surfaces |
| Claude Code | CLI, IDE, desktop app, browser/cloud surfaces | You want an Anthropic coding-agent workflow | Desktop and CLI are not feature-equivalent |
| Gemini | web, mobile, API, named integrations | You already work in the Google ecosystem | Extensions can create a different data and action scope |
| DeepSeek | chat/API surfaces; DeepSeek Harness Web and profile-based runtime | You need a documented DeepSeek developer tool | Harness is developer-preview software, not a general safety guarantee |
| Grok | Grok web/mobile; Grok Bot desktop/mobile; Grok Build terminal | You need a Grok conversation, hosted teammate, or terminal coding agent | These are related names, not interchangeable products |

This table is orientation, not equivalence. It deliberately leaves out price,
model choice, quotas, and account eligibility because those details can change
without changing the stable advice on this page.

## Before you install anything

Use this five-minute preflight before running an installer or opening a real
repository:

1. Pick a **disposable folder** with no credentials, production data, or
   important uncommitted work.
2. Confirm the **official product name and download page**. Avoid search ads,
   look-alike packages, and copied commands from social posts.
3. Read the installer command before you run it. A command that downloads and
   executes a script changes your machine and needs your approval.
4. Decide what the first task may do. For a first run, reading, drafting, and
   showing a diff are enough; sending, publishing, purchasing, deleting, and
   changing permissions are not.
5. Record the client, version if visible, operating system, date, and result.
   "Installed" and "completed a safe task" are different pieces of evidence.

## Names people routinely mix up

### Grok, Grok Bot, Grok Build, `@grok`, and the xAI API

**Grok** is the general assistant documented for the web and mobile apps.
**Grok Bot** is a separate AI-teammate product: its work occurs on a persistent
cloud computer, while you use a desktop app on macOS, Windows, or Linux, or a
companion app on iOS or Android. A terminal inside that hosted computer does
not make Grok Bot a local CLI.

**Grok Build** is separately documented as a terminal coding agent. It has an
interactive TUI, headless scripting, and ACP integration. The `@grok` bot on X
and the **xAI API** are further, separate surfaces. Choose the product first;
do not install a `grok` command and assume it is Grok Bot.

Source: [Grok Bot source receipt](../../docs/research/encyclopedia-grok-bot-sources-2026-09-03.md).

### Codex, Codex Cloud, Codex Web, and "Cloud Code"

**Codex** has documented CLI, IDE, desktop, and cloud/web surfaces. They can
share a product identity without sharing a machine, filesystem, shell, or
approval state. Treat a cloud task as hosted work until its own documentation
says otherwise.

"**Cloud Code**" is not a verified synonym for a single product in the OpenAI
and Anthropic documentation checked for this route. If someone uses that name,
ask which vendor and surface they mean. The verified Anthropic product name is
**Claude Code**; OpenAI uses **Codex Cloud** and **Codex Web** for its own
cloud-facing surfaces.

Source: [Codex and Claude Code source receipt](../../docs/research/encyclopedia-coding-agents-sources-2026-09-03.md).

## Pick a client before you pick a workflow

### Web and mobile chat

Choose this when the task is supplied text, a question, a draft, or a small
comparison. It is the lowest-setup place to learn the core request-and-check
loop. Start with no tools, no uploads, and no external actions. If the UI
offers browsing, extensions, files, or sharing, those are extra surfaces to
decide about, not defaults you must enable.

### Desktop app

Choose a desktop client when you need a larger working view, local project
selection, or an interactive application experience. A desktop app is still a
client, not proof that automation, headless execution, every CLI flag, or every
desktop feature is available. Read its local-project and approval controls
before opening a non-disposable directory.

### IDE integration

Choose an IDE integration when code selection, inline diffs, and project
navigation are the main value. Start with a narrow request such as "explain
this file" or "propose a diff for this one typo." Review the diff yourself.
An IDE extension can surface more context than a plain chat, which makes a
small scope more important, not less.

### Terminal agent

Choose a terminal agent when you need a repeatable command-line workflow,
scripts, or source-controlled changes. The terminal is powerful because it can
inspect and change a real workspace. First learn it in a disposable folder,
with a clear stop condition and no secrets. A command prompt is not a reason to
give a model unrestricted authority.

### Cloud or hosted agent

Choose a cloud agent when the task genuinely needs a hosted environment or can
continue while your client is closed. First check where files, browser sessions,
credentials, and approvals live. A hosted computer may be useful, but it is not
your local machine and should not be treated as an isolated security boundary
unless the product documentation explicitly establishes one.

## Installation and first-use paths

The commands in this section are official installation entries captured on
2026-09-03. They are not commands that this project ran. Read the linked source
and the command before executing it, use a supported account, and stop if the
actual installer, package name, or permission prompt differs from the source.

### Grok Bot: desktop and companion mobile clients

Use **Grok Bot** when you want the documented persistent-cloud-computer
teammate experience, not a local terminal coding agent.

1. Open the official [Grok Bot getting-started guide](https://docs.x.ai/grok-bot/get-started).
2. Select the download that matches your architecture: macOS Apple silicon or
   Intel; Windows x64 or Arm64; or the documented Linux package. Authenticate
   in the browser when prompted.
3. On a phone, use the official companion-app route for iOS or Android. It
   connects to the same documented Bot and hosted computer, but some routine
   management remains desktop-only.
4. Make the first Bot request read-only: ask it to summarize a public page or
   draft a checklist. Require a result, sources, unknowns, and an explicit
   stop before sending, publishing, buying, deleting, or changing settings.

For passwords, two-factor codes, CAPTCHAs, and payment confirmations, use the
documented takeover flow rather than putting the secret in chat. Do not claim a
specific plan, download, or feature is available to your account until you can
check it yourself. See the [official approvals and privacy guidance](https://docs.x.ai/grok-bot/approvals-security-and-privacy).

### Codex: terminal, desktop, IDE, and cloud are different choices

Use **Codex CLI** when you want a terminal workflow in a local project. The
officially documented installation entries include:

```bash
# macOS or Linux standalone installer
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# npm alternative
npm install -g @openai/codex

# macOS Homebrew alternative
brew install --cask codex
```

```powershell
# Windows PowerShell standalone installer
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

After installation, change into a disposable project and run:

```text
codex
```

Sign in only through the product flow you intend to use. On Windows, OpenAI
documents native CLI, desktop, and IDE paths; you do not need to assume that
WSL or a virtual machine is required. That does not guarantee your Windows
edition, local policy, sandbox configuration, or toolchain will behave the
same way. For the current details, use the official [Codex CLI guide](https://developers.openai.com/codex/cli.md), [Windows guide](https://developers.openai.com/codex/windows.md), and [IDE guide](https://developers.openai.com/codex/ide.md).

If you prefer a desktop or IDE client, use its official installation path and
start with one file or a selection. If you choose Codex Web/Cloud, first check
the hosted-work boundary; it is not evidence that the same local files or shell
are available.

### Claude Code: terminal, IDE, and desktop do not have the same contract

Use **Claude Code CLI** when you want the documented Anthropic terminal agent.
The official installation entries include:

```bash
# macOS, Linux, or WSL
curl -fsSL https://claude.ai/install.sh | bash

# macOS or Linux Homebrew alternative
brew install --cask claude-code
```

```powershell
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows WinGet alternative
winget install Anthropic.ClaudeCode
```

Then enter a disposable project and run:

```text
claude
```

Anthropic also documents VS Code/Cursor and JetBrains integrations, plus a
desktop app. The desktop app includes Claude Code, but its documented
interactive experience is not a promise of CLI scripting or automation parity.
Native Windows users should also check the documented shell and Git-for-Windows
guidance before assuming Bash behavior. See the official [Claude Code overview](https://code.claude.com/docs/en/overview), [CLI reference](https://code.claude.com/docs/en/cli-reference), and [desktop guide](https://code.claude.com/docs/en/desktop).

### DeepSeek Harness: a developer-preview Web and profile runtime

**DeepSeek Harness** is not the same thing as the DeepSeek chat product or API.
Its official repository calls it a developer-preview agent harness and says it
has not received a security audit. Use it only in a controlled workspace with
no secrets or irreplaceable files.

For the official npm Web entry, open Terminal on macOS or PowerShell on Windows
and run:

```sh
npx @deepseek-ai/dsh web
```

The source documentation says this starts the Web UI at `http://127.0.0.1:3080`.
To start without opening a browser automatically:

```sh
npx @deepseek-ai/dsh web --no-open
```

The official source path is for contributors or readers who deliberately want
to inspect the repository before using it:

```sh
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

Harness has separate profiles, including `web`, `headless`, `sdk`,
`sdk-minimal`, and `acp`. Do not treat the documentation example for a
previously installed TUI profile as proof of a built-in default TUI. The Web UI
needs an authorized model configuration before it can make model requests; do
not paste an API key into a prompt, commit it to a project, or assume a sandbox
removes all network or plugin risk. Read the [official README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) and [safety statement](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md) before running it.

The source does not establish one complete Windows/macOS support promise for
every profile and configuration. Treat your first controlled launch as an
observation, not as platform certification. See the [DeepSeek Harness source receipt](../../docs/research/encyclopedia-deepseek-harness-sources-2026-09-03.md).

<span id="chatgpt-first-task"></span>

## ChatGPT first task

Open an authorized ChatGPT surface and run the safe first task below. Observe
only what the client actually shows: browsing, memory, file upload, or a share
link may be offered, but none is needed for this exercise. Record the surface
and date rather than assuming that another client behaves the same way.

<span id="claude-code-first-task"></span>

## Claude Code first task

In a disposable project, ask Claude Code to explain the project directory
without editing it or running a command. If it proposes an action, check the
scope and permission prompt yourself. Only after you can describe what it read
and what it did not read should you request a small, reviewable diff. Project
instructions such as `CLAUDE.md` are model-facing instructions; review them as
carefully as any other project rule.

<span id="gemini-first-task"></span>

## Gemini first task

Run the safe first task in an authorized Gemini chat. Note the active account
and whether the UI offers Google Workspace or other extensions. Do not enable
an extension for a text-only exercise: an integration may expand the data and
action scope beyond the task.

<span id="deepseek-first-task"></span>

## DeepSeek first task

For a text-only DeepSeek chat exercise, use the safe first task only in a
surface you are authorized to use. The existing [DeepSeek API source receipt](../../docs/research/deepseek-api-source-receipt-2026-08-17.md)
still applies to API-specific facts; it does not prove web-chat behavior.

For DeepSeek Harness, a successful controlled launch at `127.0.0.1:3080` is
only a local Web-server observation. Before giving it a model key or an agent
task, read the Harness safety boundary above, select a disposable workspace,
and inspect each requested action.

<span id="grok-first-task"></span>

## Grok first task

Use the generic safe task in the Grok consumer chat if that is the surface you
mean. Use Grok Bot only when you deliberately want its hosted-teammate model,
and use Grok Build only when you deliberately want a terminal coding agent.
For Grok Bot, start with a draft or read-only task and keep the approval
boundary in the request. A current-looking answer or a connected account is not
proof that a post, message, payment, or other external action should happen.

## The safe first task on any platform

Copy this request into the chat or agent you chose. It uses fictional material,
needs no tool, and makes the same core check work across platforms.

```text
Result: rewrite this fictional club notice for new members.
Material: "The club meets Tuesday at 6. Bring a notebook. The room will be
confirmed later."
Response shape: write two sentences. Keep every stated fact. Put any missing
detail in [brackets]. Then list the facts you preserved.
Check: compare the source and rewrite. No new time, room, fee, contact, or
promise may appear.
Stop: do not browse, send, publish, upload, run a command, or assume an
unknown detail.
```

Check three things yourself:

1. Can you point to every statement in the rewrite in the supplied notice?
2. Did the reply obey the two-sentence limit and show what it preserved?
3. Did it add a detail that should remain `[unknown]`?

If the client offers to browse, send, publish, use a tool, or requests more
material than this small exercise needs, stop. A capability is not an
instruction to use it.

## Windows and macOS: a short practical checklist

| Check | Windows | macOS |
| --- | --- | --- |
| Start in the right shell | Use PowerShell for the documented native install path unless the product says otherwise | Use Terminal for shell installers or Homebrew |
| Match your architecture | Check x64 versus Arm64 before choosing a desktop download | Check Apple silicon versus Intel before choosing a desktop download |
| Keep the first workspace safe | Use a new folder outside a real production checkout | Use a new folder outside a real production checkout |
| Treat remote installer scripts carefully | Review the source and expect policy, permission, or network differences | Review the source and expect package-manager, permission, or network differences |
| Record the result | Note the product, client, version, shell, date, and visible result | Note the product, client, version, shell, date, and visible result |

Do not turn this checklist into a claim that every named product supports every
Windows release, Mac model, corporate policy, region, account, or IDE. When the
official source is narrower, the source wins.

## After the first task: which route should you follow?

- You want a text-only starter practice: [Beginner Practice Pack](../communication-clinic-EN.md).
- You want the deep flagship track with files and tools: [First Safe Change](first-safe-change-EN.md).
- You want the platform-neutral foundation first: [Universal Core Foundations](universal-core-foundations-EN.md).
- You want to compare two platforms fairly: [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md).
- You want to check a changing product claim: [Platform Fact Watch](../../skills/prysai-platform-fact-watch/SKILL.md).

## Evidence state and boundary

This route is `candidate / not_run`. It now has dated official-source coverage
for Grok Bot, Grok Build, Codex, Claude Code, and DeepSeek Harness, but it has
no recorded learner run, cross-platform installation run, account-eligibility
check, independent language review, or production-readiness review. The new
English material has not been propagated to the other locale routes.

- [ ] I identified the product, client, and runtime instead of relying on a familiar name.
- [ ] I used only an official source and a disposable or authorized workspace.
- [ ] I recorded the exact client, operating system, visible version if any, and date.
- [ ] I did not paste secrets, private messages, unpublished files, or API keys.
- [ ] I treated a proposed tool action as a proposal and stopped before external side effects.
- [ ] I did not treat one platform's behavior as proof of another's.
