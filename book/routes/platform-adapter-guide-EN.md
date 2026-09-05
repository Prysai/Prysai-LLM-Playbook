<!-- content_id: platform-adapter-guide-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: 2026-09-04-platform-encyclopedia-polish -->

# LLM platforms and clients: choose, install, and start safely

**Status:** `candidate`. **Run status:** `not_run`.

Most AI products look similar at first: type a request and receive a response.
That resemblance is where many setup mistakes begin. The same product family
may offer a browser chat, a phone app, a desktop client, an IDE integration, a
terminal agent, and a hosted computer. Those surfaces do not automatically
share files, credentials, permissions, or history.

Use this page as a field guide. It helps you identify the product in front of
you, choose the smallest surface that can do the job, follow the vendor's
current installation path, and record what actually worked. It is not a product
ranking or a promise that every account, operating system, region, or feature is
available to every reader.

The route keeps the transferable method from the
[Universal Core Foundations route](universal-core-foundations-EN.md) in view:
define the task, limit the authority, inspect the result, and keep the evidence.
Commands, plans, availability, and client support change. The linked source
receipts record what the official documentation said on 2026-09-03 or
2026-09-04; they do not prove that an installer, account, or task will work for
you.

## How to read a changing product story

This page deliberately keeps three kinds of information apart:

- **Method:** durable habits such as defining the result, limiting authority,
  and checking the output;
- **Product fact:** a vendor's current name, client, command, requirement, or
  feature, tied to an official source and an access date; and
- **Run evidence:** what happened on one named machine, account, workspace, or
  task.

A launch announcement can tell you what a vendor says it released. A friend's
  account can show why readers want a practical guide. Neither one proves that
  a feature is available to every account or that a workflow is reliable. For
  current releases and user reports, use the dated
  [timely-content policy](../../docs/governance/timely-content-policy.md) and
  the related [Grok Bot field note](../../docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md).
  That note is an original, source-bounded reference, not a product review or a
  learner result.

## Find the section you need

If you are new to LLMs, read the
[Universal Core Foundations route](universal-core-foundations-EN.md) first. It
teaches the model boundary and the check-before-trust habit before any product
setup. If you already know that foundation, use the table below to jump to the
surface you need. You do not need to install every client.

| If you want to... | Start here |
| --- | --- |
| Understand the basic LLM workflow | [Universal Core Foundations](universal-core-foundations-EN.md) |
| Choose between web, mobile, desktop, IDE, terminal, or cloud | [Platform and client map](#platform-and-client-map) |
| Learn the product names people often confuse | [Names that are easy to confuse](#names-that-are-easy-to-confuse) |
| Install a product and make a safe first attempt | [Install and make a first safe attempt](#install-and-make-a-first-safe-attempt) |
| Choose a web, desktop, IDE, terminal, or hosted route | [Installation routes at a glance](#installation-routes-at-a-glance) |
| Set up a Windows or macOS machine | [Windows and macOS setup paths](#windows-and-macos-setup-paths) |
| Decide whether a result is actually acceptable | [Four evidence states](#evidence-states) |

The rest of this page follows that order: choose a surface, install it, make a
small first attempt, then record what actually happened.

## Choose your starting point

| You are... | Start with... | Your first useful result |
| --- | --- | --- |
| New to LLMs | [Universal Core Foundations route](universal-core-foundations-EN.md), then a web or mobile chat | A checked text-only answer with no tool or file access |
| Comfortable with chat, but new to coding agents | The client map, then an IDE or terminal agent in a disposable folder | An explanation of one fixture and a proposed, reviewable diff |
| Returning to a product after a break | The official source link, then the four evidence states below | A current client, version, and permission record instead of a memory-based assumption |
| Working with a team or real repository | The preflight and setup receipt before opening the shared workspace | A named owner, scope, stop condition, and reviewable evidence |

You do not need to install every product. Choose the smallest surface that can
complete the next task, and only move to a larger surface when the smaller one
cannot provide the context or control you need.

<span id="platform-and-client-map"></span>

## Platform and client map

### Choose by task

| If you want to... | Start with... | Do not assume... |
| --- | --- | --- |
| Ask, draft, compare, or learn with supplied text | A web or mobile chat | The chat can inspect local files or act outside the conversation |
| Work with a local codebase and review edits | An IDE or terminal agent in a disposable project | It has permission to change every file, run every command, or publish work |
| Keep a long-running task on a hosted machine | A documented cloud-agent surface | Hosted files, sessions, identity, and approval rules are the same as your laptop's |
| Use a model from your own software | The vendor API documentation | An API is the same product as a consumer app or coding agent |

When two products share a name, pause before treating them as one thing. A
shared brand does not imply a shared filesystem, shell, account, or permission
model.

### Keep these four layers separate

1. **Model:** the system that generates an answer or proposes an action.
2. **Product:** the vendor experience that provides the model, account, and
   policy layer.
3. **Client:** the thing you open: a browser, phone app, desktop app, IDE
   extension, or terminal program.
4. **Runtime:** where work occurs: your device, a container, a hosted machine,
   or a vendor service.

One product can have several clients and more than one runtime. Installing a
desktop application does not prove that its web version, CLI, and cloud agent
share the same tools or permissions.

### The products in this guide

| Product or family | What this guide treats it as | A sensible first use | Keep separate from |
| --- | --- | --- | --- |
| ChatGPT | A general-purpose web, mobile, and desktop conversation/work surface | Rewrite or compare supplied text without enabling extra tools | A chat session is not automatically a local coding environment |
| Codex | A family of terminal, IDE, desktop, and cloud/web coding surfaces | Explain one file, then inspect a proposed diff | Local, desktop, and cloud work are separate surfaces |
| Claude Code | Anthropic's coding-agent product across terminal, IDE, desktop, and browser/cloud surfaces | Explain a disposable project before requesting a small change | Desktop and CLI are not feature-equivalent |
| Google Cloud Code | Google's IDE extension family for cloud-native development | Open a sample and inspect its project and credential context | It is not Claude Code, Codex Cloud, or a universal terminal agent |
| Gemini | A web/mobile chat family with a separate Gemini CLI and IDE integrations | Start with text-only chat; use the CLI only when you need a terminal surface | Web/mobile, CLI, and IDE context are different surfaces |
| DeepSeek | DeepSeek Harness, a developer-preview runtime; DeepSeek API is a separate adapter | Launch `dsh web` against a disposable workspace | Harness is not the DeepSeek chat product or a general safety guarantee |
| Grok | Grok chat, Grok Bot's hosted teammate, and Grok Build's terminal agent | Choose the exact surface before you authenticate or share context | Grok, Grok Bot, and Grok Build are related names, not interchangeable products |

### Platform cards: the short version

#### ChatGPT: start with the conversation, then decide whether you need more

ChatGPT is the general-purpose conversation and work surface in this guide. It
is a sensible first stop for a question, rewrite, comparison, or lesson that
uses material you can safely provide in the conversation. The web, mobile, and
desktop experiences are client choices, not proof that the same files, tools,
or permissions are available in all three.

The desktop path deserves extra care: selecting a project or folder changes the
context you are offering to the application. Start with supplied text, then add
one deliberately chosen local file only when the task needs it. ChatGPT is not
another name for Codex, and a successful chat response is not a local coding
run.

#### Codex: a coding workflow with several surfaces

Codex is the coding-oriented family in this guide. Its documented surfaces
include a terminal CLI, IDE integrations, a desktop experience, and cloud/web
work. The useful distinction is not the brand name but the runtime: a local
terminal task, a desktop project task, and a hosted task may have different
files, shells, approvals, and network access.

Use Codex when the job needs project context, a proposed change, a focused
check, or a repeatable engineering workflow. Begin with one disposable project
and one inspectable result. Keep the cloud boundary explicit; a hosted Codex
task is not evidence that the same local checkout or shell is available.

#### Claude Code: Anthropic's coding agent

Claude Code is Anthropic's named coding-agent product. The official surfaces
covered here are the terminal, IDE integrations, desktop app, and browser/cloud
entry points. The terminal is the natural choice for scripting and automation;
the desktop app is an interactive Code-tab experience with its own feature
boundary.

On Windows, check the documented shell path before assuming Bash behavior. A
native installation can use PowerShell, while Git for Windows matters when the
agent needs its Bash tool. Treat `CLAUDE.md`, project settings, hooks, and
skills as visible project context that still needs review.

#### Google Cloud Code: an IDE extension family for Google Cloud

Google Cloud Code belongs to a different category. It is an IDE extension
family for cloud-native development, with documented paths for VS Code,
IntelliJ/JetBrains, and Cloud Shell. It is useful when the project is tied to
Google Cloud services such as GKE or Cloud Run and you need that context close
to the editor.

Do not use “Cloud Code” as shorthand for Claude Code or Codex Cloud/Web. Cloud
Code's installation path depends on the IDE or hosted shell you choose. Check
the active Google Cloud project and credentials before accepting any build,
deploy, secret, or resource action.

#### Gemini: consumer chat first, terminal agent second

Gemini is a family of surfaces rather than one universal runtime. The web and
mobile apps are consumer chat clients. Gemini CLI is a separate terminal agent,
and the documented IDE integrations add editor context such as an open file,
selection, or diff.

For a first session, use the web or mobile chat with supplied text and no
extension enabled. Choose Gemini CLI when you need a shell-based workflow, and
record its authentication path separately. A result from the web app does not
prove that the CLI or an IDE integration sees the same context.

#### DeepSeek Harness: a developer-preview runtime

DeepSeek Harness is a developer-preview agent harness, not the DeepSeek chat
product and not the DeepSeek API. Its documented Web entry is launched with
`npx @deepseek-ai/dsh web`; after the local Web UI opens, you select a workspace
and configure an authorized model before making a request.

The official safety statement says the project has not received a security
audit. Keep the first run in a disposable workspace with no secrets or
irreplaceable files. The launch command proves only that you attempted to start
the local Web surface; it does not prove model access, sandbox isolation, or a
safe task result.

#### Grok: three names, three boundaries

**Grok** is the consumer assistant surface. **Grok Bot** is the hosted-teammate
surface described in the xAI documentation: you operate it from a desktop or
companion mobile client, while its work takes place on a persistent cloud
computer. **Grok Build** is the separately documented terminal coding agent.

That distinction matters in practice. A terminal visible inside Grok Bot's
hosted computer is not the same thing as a local `grok` command, and installing
Grok Build does not give you control of the Bot's hosted computer. Pick one
surface, record where the files live, and keep sending, publishing, purchasing,
deleting, and settings changes behind explicit approval.

Use this table to orient yourself, not to compare products as if they were
equivalent. API surfaces are deliberately kept separate from consumer chat and
coding-agent clients. Prices, model choices, quotas, and account eligibility
change more often than the basic client boundaries do.

<span id="installation-routes-at-a-glance"></span>

## Installation routes at a glance

Do not install everything in this table. Start with the smallest client that
can complete the next task.

| Route | Use it for | Installation or access | First check |
| --- | --- | --- | --- |
| Web chat | Questions, drafting, comparison, and learning from supplied text | Open the vendor's official web entry | Confirm the account, region, and whether tools or extensions are enabled |
| Mobile app | Short reading, dictation, capture, and review away from the desk | Follow the vendor's official app or download page | Verify the publisher and check which settings remain desktop-only |
| Desktop app | A larger interactive workspace, local folders, or a hosted-computer client | Download the package for the operating system and CPU architecture | Confirm the selected folder or hosted runtime before sharing files |
| IDE integration | Code selection, editor context, inline diffs, and project navigation | Install the vendor-linked extension or plugin for the IDE you use | Check the workspace root, selected files, tools, and proposed diff |
| Terminal agent | Repeatable commands, scripts, and source-controlled changes | Use the official installer or package-manager entry | Run the version command in a disposable folder and inspect permission mode |
| Hosted or cloud agent | Work that belongs on a remote machine or should continue after the client closes | Enable the documented cloud surface | Record the remote repository, files, credentials, network, and approval boundary |
| DeepSeek Harness Web | A controlled local Web UI around an agent harness | Run the documented `@deepseek-ai/dsh` entry through `npx` | Confirm the loopback address, selected workspace, model configuration, and safety boundary |

The route determines where context and side effects live. A mobile app may be
able to review a task without exposing a local folder. A terminal agent may see
the current directory but not the files in a hosted session. A desktop app may
offer both local and remote work, depending on the product. Record the runtime
instead of inferring it from the brand name.

### A one-minute choice

- If the task is a question, rewrite, comparison, or lesson using supplied text,
  start with a web or mobile chat.
- If the task needs local files, a proposed diff, or project navigation, use a
  desktop app, IDE integration, or terminal agent in a disposable workspace.
- If the task needs repeatable scripts or command-line review, choose a terminal
  agent and keep its permission mode visible.
- If the task needs a hosted machine that can continue after the client closes,
  choose a documented cloud or hosted surface and record where its files and
  credentials live.
- If the task is specifically about Google Cloud resources from an IDE, choose
  Google Cloud Code; do not install a similarly named coding agent by mistake.

### Client matrix: what each surface is for

| Surface | Choose it when... | Best first job | Where the work happens |
| --- | --- | --- | --- |
| ChatGPT web or mobile | You need a low-setup conversation or lesson | Rewrite or compare supplied text | The vendor service; record account and date |
| ChatGPT desktop | You need a desktop workspace or a carefully selected local folder | Explain one small local file | Your computer plus the ChatGPT service |
| Gemini web or mobile | You want a text-first task in the Google ecosystem | Ask a text-only question with no extension enabled | The vendor service; record account and date |
| Codex or Claude Code IDE | You need code selection, inline review, and project navigation | Explain one file, then review a proposed diff | The local editor plus the agent service |
| Google Cloud Code | You are working on a Google Cloud-native project from an IDE | Open a sample and inspect its project and credential context | The IDE and Google Cloud context |
| Codex, Claude Code, Gemini CLI, or Grok Build | You need a repeatable shell workflow | Inspect a fixture and propose one small change | The local shell, workspace, and agent service |
| Grok Bot | You want the documented hosted-computer teammate experience | Ask for a read-only summary or draft | A persistent hosted computer; do not call it local |
| DeepSeek Harness Web | You want to inspect a fixture with a controlled local Web UI | Launch the Web UI, configure a model, and stop before side effects | A local Web server plus the configured model service |

Use the matrix to pick a starting point. The products are not interchangeable.
For every attempt, keep four separate records: **installed**,
**authenticated**, **task run**, and **result accepted**. A plausible answer is
not evidence that you accepted the result.

## Before you install anything

Before you run an installer or open a real repository, do this short preflight:

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

## Keep a setup receipt

A setup receipt turns a vague statement such as "I installed the tool" into a
record another person can inspect. Keep one receipt per product and client;
do not combine a web chat, desktop app, IDE integration, terminal agent, and
hosted runtime just because they share a brand name.

```text
Product and exact client:
Runtime: local computer, IDE, hosted computer, or vendor service
Operating system / architecture / shell:
Official installation or access page:
Version or visible build (if shown):
Workspace: disposable folder, supplied text, or named project
Authentication state: not attempted / authenticated / blocked
Task state: not run / ran / result accepted
Permission and network boundary:
Evidence kept: response, log, diff, screenshot, or review note
Stop condition or unresolved question:
Date and next review:
```

Do not put passwords, API keys, one-time codes, private messages, or sensitive
file contents in the receipt. A receipt records what you observed; it does not
turn an installation into proof of correctness, security, reliability, or
platform equivalence.

<span id="names-that-are-easy-to-confuse"></span>

## Names that are easy to confuse

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

For a dated, source-bounded discussion of moving from one-off chat to an
ongoing Grok Bot workflow, read [Grok Bot: from AI chat to an auditable ongoing
workflow](../../docs/research/grok-bot-from-ai-chat-to-auditable-ongoing-workflow-2026-09-02.md).
That field note treats a supplied personal account as a demand signal only; it
does not prove account access, reliability, complete auditability, or learning
outcomes.

Source: [Grok Bot source receipt](../../docs/research/encyclopedia-grok-bot-sources-2026-09-03.md).

### Codex, Claude Code, Google Cloud Code, and "Cloud Code"

**Codex** has documented CLI, IDE, desktop, and cloud/web surfaces. They can
share a product identity without sharing a machine, filesystem, shell, or
approval state. Treat a cloud task as hosted work until its own documentation
says otherwise.

**Claude Code** is Anthropic's named coding-agent product. Its terminal, IDE,
desktop, and browser/cloud surfaces have their own documented boundaries; the
name is not "Cloud Code."

**Google Cloud Code** is a different product family. Google's documentation
describes it as an IDE extension for Google Cloud development, with documented
paths for VS Code, IntelliJ/JetBrains, and Cloud Shell. It brings workflows for
services such as Google Kubernetes Engine and Cloud Run into the IDE and can
include Gemini Code Assist. It is not a synonym for Claude Code, Codex Cloud, or
a general-purpose terminal agent.

When someone says only "Cloud Code," ask which vendor and surface they mean.
Use **Claude Code** for the Anthropic agent, **Codex Cloud/Web** for OpenAI's
cloud-facing Codex surfaces, and **Google Cloud Code** for the Google Cloud IDE
extension family.

Sources: [Codex and Claude Code source receipt](../../docs/research/encyclopedia-coding-agents-sources-2026-09-03.md)
and [Google Cloud Code source receipt](../../docs/research/encyclopedia-cloud-code-sources-2026-09-04.md).

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

<span id="install-and-make-a-first-safe-attempt"></span>

## Install and make a first safe attempt

The commands in this section are official installation entries captured on
2026-09-03 or 2026-09-04, as noted in the linked receipts. They are not
commands that this project ran. Read the linked source
and the command before executing it, use a supported account, and stop if the
actual installer, package name, or permission prompt differs from the source.

Each product section answers four separate questions: where to get the client,
where the work runs, what a safe first task looks like, and what the setup does
not prove. If you only need a web chat, skip the terminal sections. If you need
a terminal workflow, do not treat a desktop login as terminal authentication.

### ChatGPT: web, mobile, and desktop

ChatGPT is the general conversation and work surface in this guide. It is not
automatically a local coding environment, and it is not another name for
Codex. OpenAI's current documentation separates ChatGPT on the web, the
desktop app, and the Codex CLI or IDE extension.

**Web:** Open the official [ChatGPT web entry](https://chatgpt.com/), sign in
when the task needs saved history or other account features, and start a new
chat. Keep the first exercise text-only. A web chat does not, by itself, grant
local file, shell, or desktop-app access.

**Mobile:** Start from OpenAI's official [ChatGPT download
page](https://chatgpt.com/download/) and follow its current mobile-app link.
Before installing, confirm the publisher, account, region, and requested
permissions. The research receipt did not independently verify a stable store
URL, so this guide does not hard-code one. Begin with the same text-only
exercise and do not infer that the mobile app has the same file, desktop, or
coding integrations as the web app.

**Desktop:** Follow OpenAI's [desktop-app guide](https://developers.openai.com/codex/app.md):
install the app for macOS or Windows (or follow its linked Linux guide), sign
in, choose a chat, project, or folder, and send a first message. Choosing a
folder changes the authority boundary because the app may use files in that
location and may be able to modify them. Start with a disposable folder, ask
for a read-only explanation, and inspect any proposed change before accepting
it.

Record the client you used. A successful desktop task is not evidence that the
web or mobile client can inspect the same local files. See the [ChatGPT and
Gemini source receipt](../../docs/research/encyclopedia-chatgpt-gemini-sources-2026-09-04.md)
for the access date and unresolved availability questions.

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

### Grok Build: a separate terminal coding agent

Grok Build is the xAI terminal product in this route. It is not the Grok Bot
desktop client, and it is not proof that a local `grok` command controls the
persistent computer described in the Grok Bot documentation. The official
Grok Build repository documents prebuilt binaries, an interactive terminal UI,
headless use, and ACP integration.

Install a prebuilt binary from the official source:

```sh
# macOS, Linux, or Git Bash
curl -fsSL https://x.ai/cli/install.sh | bash
```

```powershell
# Windows PowerShell
irm https://x.ai/cli/install.ps1 | iex
```

Then verify the command before opening a real repository:

```text
grok --version
```

For the first task, enter a disposable folder and ask Grok Build to list the
files, explain one fixture, and stop. If it proposes a change, review the diff
and the command scope before allowing it. The official source supports
prebuilt Windows binaries but describes Windows source builds as best-effort;
do not turn that source-build limitation into a claim that the binary or every
feature is unavailable. For a non-interactive, read-only inspection, the
official headless entry is:

```sh
grok -p "List the files in this disposable folder; do not edit anything or run commands." --output-format json
```

Treat the JSON output as a record to inspect, not as proof that the model
followed the requested boundary. See the [official Grok Build README](https://raw.githubusercontent.com/xai-org/grok-build/main/README.md)
and [headless and scripting reference](https://docs.x.ai/build/cli/headless-scripting).

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

For a repeatable read-only check, OpenAI documents `codex exec` as the
non-interactive entry. Its default sandbox is read-only; keep the prompt
explicit and save the JSONL output for review:

```sh
codex exec --json "Summarize the repository structure. Do not edit files or run commands."
```

Use `--sandbox workspace-write` only when a separately scoped task genuinely
needs edits. Do not use `danger-full-access` for a first exercise.

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

For a scriptable, read-only question, Anthropic documents print mode:

```sh
claude -p "Explain the purpose of this disposable fixture. Do not edit files or run commands."
```

Print mode exits after the response; it does not turn the response into an
acceptance decision. Keep the permission mode and any allowed tools visible
when a later task needs more than reading.

Anthropic also documents VS Code/Cursor and JetBrains integrations, plus a
desktop app. The desktop app includes Claude Code, but its documented
interactive experience is not a promise of CLI scripting or automation parity.
Native Windows users should also check the documented shell and Git-for-Windows
guidance before assuming Bash behavior. See the official [Claude Code overview](https://code.claude.com/docs/en/overview), [CLI reference](https://code.claude.com/docs/en/cli-reference), and [desktop guide](https://code.claude.com/docs/en/desktop).

### Google Cloud Code: choose the IDE surface that matches the project

Google Cloud Code is a family of AI-assisted IDE extensions for cloud-native
development. It is useful when a project involves Google Kubernetes Engine,
Cloud Run, or related Google Cloud services. It is not the same product as
Claude Code or Codex Cloud, and the official pages checked here do not provide
one universal `cloud-code` terminal installer.

Choose the installation path that matches the client you actually use:

- **VS Code:** follow Google's [Cloud Code for VS Code installation guide](https://cloud.google.com/code/docs/vscode/install).
- **IntelliJ or another supported JetBrains IDE:** follow the [Cloud Code for IntelliJ installation guide](https://cloud.google.com/code/docs/intellij/install).
- **Cloud Shell:** Cloud Code is built into the Cloud Shell Editor, so there is no separate extension install. Follow the [Cloud Code for Cloud Shell guide](https://cloud.google.com/code/docs/shell/overview) and record Cloud Shell as a hosted runtime, separate from a local IDE.

For a first attempt, open a sample or disposable cloud-native project, check
which Google Cloud project and credentials the IDE has selected, and review any
proposed build, deploy, secret, or resource action before accepting it. Gemini
Code Assist may be integrated with Cloud Code, but that does not turn the
extension into a general-purpose terminal agent or grant deployment
permission.

See the [Google Cloud Code source receipt](../../docs/research/encyclopedia-cloud-code-sources-2026-09-04.md)
for the dated source scope and unresolved account, project, and platform
availability questions.

### Gemini: web, mobile, CLI, and IDE

Gemini is a family of clients, not one universal execution environment. The
Gemini web app and mobile apps are consumer chat surfaces. Gemini CLI is a
separate open-source terminal agent, and its IDE integrations add editor
context. Keep those boundaries visible when writing a tutorial or comparing a
result.

**Web and mobile:** Open [Gemini](https://gemini.google.com/) in a browser or
use the official Gemini app for Android or iOS. Google's help center says some
web features can work without signing in, while additional features and saved
activity require a Google Account. Sign in with the account you intend to use,
check the visible region and permissions, and start with supplied text only.
Do not infer that the mobile app has the same integrations as the web app.

**CLI:** The official Gemini CLI entries are:

```sh
# Run once without a permanent global install
npx @google/gemini-cli

# Install globally with npm
npm install -g @google/gemini-cli
```

```sh
# macOS or Linux alternative
brew install gemini-cli

# macOS alternative
sudo port install gemini-cli
```

For a first launch after a global install, run `gemini` in a disposable project
and choose the documented Google sign-in flow. If you use the `npx` entry, the
`npx` command itself starts the session; do not assume that it has created a
permanent `gemini` command. If your environment requires an API key or Vertex
AI, follow the [official authentication guide](https://geminicli.com/docs/get-started/authentication)
and keep credentials in the environment or account mechanism it documents;
never paste a key into a prompt or commit it to the project. The current
installation page lists Node.js 20+, Bash, Zsh, or PowerShell, and named
operating-system baselines. These are dated product facts, not a promise about
every machine or organization policy.

**IDE:** The official [IDE integration guide](https://geminicli.com/docs/ide-integration)
documents a VS Code companion extension and ACP integrations used with tools
such as JetBrains and Zed. Open one workspace, start the CLI from that same
directory, and inspect the visible context before asking for a change. An IDE
selection, cursor position, or diff is additional context; it is not permission
to edit the whole repository.

See the [ChatGPT and Gemini source receipt](../../docs/research/encyclopedia-chatgpt-gemini-sources-2026-09-04.md)
for the access date, source scope, and current unknowns.

### DeepSeek Harness: a developer-preview Web and profile runtime

**DeepSeek Harness** is not the same thing as the DeepSeek chat product or API.
Its official repository calls it a developer-preview agent harness and says it
has not received a security audit. Use it only in a controlled workspace with
no secrets or irreplaceable files.

For the official npm Web entry, open a terminal on macOS, Windows, or Linux and
run:

```sh
npx @deepseek-ai/dsh web
```

The source documentation says this starts the Web UI at `http://127.0.0.1:3080`.
To start without opening a browser automatically:

```sh
npx @deepseek-ai/dsh web --no-open
```

Before using either command on a clean machine, confirm the runtime first:

```text
node --version
npm --version
npx --version
```

The published npm entry only requires the Node.js prerequisite stated by the
official README. The source checkout has a separate Node and pnpm requirement;
do not apply that source constraint to the published package without checking
the package metadata.

After the Web UI opens, follow the documented order: open **Settings → Models**
and configure an authorized DeepSeek API key through the UI; add and select a
disposable workspace; then use the session composer for the first task. A key
is a credential, not prompt content. If no workspace is selected, the composer
is not ready for a task. Start with a read-only fixture and inspect the
requested action before allowing any change.

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

### If installation stops halfway

Do not repair a vague failure by granting the client more access. Classify the
failure first:

| Symptom | Check next | Safe interpretation |
| --- | --- | --- |
| The command is not found after installation | Start a new shell, inspect `PATH`, and run the product's documented version command | The shell may not have reloaded the installer change; authentication has not been tested |
| The download does not match the machine | Recheck Windows x64/Arm64 or macOS Intel/Apple silicon, then return to the official download page | A wrong architecture is an installation mismatch, not evidence that the product is unavailable |
| Browser sign-in succeeds but the client cannot work | Check the client's own account, provider, workspace, and permission state | Browser identity and client authorization are separate observations |
| A local folder is missing or the hosted workspace is empty | Record the exact runtime and path before adding files or reconnecting a repository | The client may be looking at a different machine or checkout |
| The first task asks to send, publish, delete, pay, or change permissions | Stop and request explicit approval for that action | Installation and authentication do not authorize an external side effect |
| DeepSeek Harness starts but the session is unavailable | Check the loopback address, selected workspace, model configuration, and official profile documentation | A Web server launch is not model access, sandbox proof, or task success |

Keep the original error, client, version, operating system, working directory,
and date in the setup receipt. Do not paste credentials or private file
contents into an issue, source record, or troubleshooting example.

<span id="chatgpt-first-task"></span>

## ChatGPT first task

Open an authorized ChatGPT surface and run the safe first task below. Observe
only what the client actually shows: browsing, memory, file upload, or a share
link may be offered, but none is needed for this exercise. Record the surface
and date rather than assuming that another client behaves the same way.

If you use the desktop app, begin with a new chat rather than opening a real
project folder. Add a folder only for a later, separately scoped exercise, and
record the folder boundary before asking for a file-related result.

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

Run the safe first task in an authorized Gemini web or mobile chat. Note the
active account and whether the UI offers Google Workspace or other extensions.
Do not enable an extension for a text-only exercise: an integration may expand
the data and action scope beyond the task.

If you use Gemini CLI instead, start it from a disposable folder, record the
authentication method, and ask it to inspect no files for this first text-only
turn. The CLI and the web/mobile apps are separate clients; a result in one is
not evidence about the other.

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
boundary in the request. For Grok Build, start in a disposable local folder and
ask for inspection only. A current-looking answer or a connected account is
not proof that a post, message, payment, file change, or other external action
should happen.

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

## Windows and macOS setup paths

These are controlled first-use workflows, not a universal support promise. The
vendor's current documentation remains the authority for operating-system
versions, architecture, regional availability, account eligibility, and
installation changes.

### Windows: PowerShell first

1. Open a normal PowerShell window and record the shell, architecture, and
   tools already present:

   ```powershell
   $PSVersionTable.PSVersion
   [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
   Get-Command node,npm,git -ErrorAction SilentlyContinue
   ```

   These are local observations. A missing `node`, `npm`, or `git` command is
   not a problem for a desktop-only exercise, but it matters for a CLI path.
2. Choose the official download for the product and match x64 or Arm64 when the
   vendor offers both. Do not use a package name copied from a search result.
   For a terminal path, use the PowerShell command in the relevant product
   section above. Gemini CLI currently requires the Node.js/runtime conditions
   listed in its official installation page; DeepSeek Harness uses its own
   documented `npx` entry.
3. Close and reopen PowerShell if an installer changes `PATH`. Confirm that the
   intended command resolves before authenticating:

   ```powershell
   Get-Command codex,claude,gemini,grok -ErrorAction SilentlyContinue
   ```

   `dsh` started through `npx` need not appear as a permanent global command.
4. Authenticate only in the product's own sign-in or provider flow. Create or
   choose a disposable folder, run the safe first task, and record the visible
   result. Do not put an API key in the folder or in the prompt.

### macOS: check the chip before choosing a download

1. Open Terminal and record the macOS version, architecture, and available
   package tools:

   ```sh
   sw_vers
   uname -m
   command -v node npm git brew
   ```

2. Choose the official Apple-silicon or Intel download when the product lists
   both. If you use a terminal path, use the documented shell installer or the
   Homebrew/MacPorts alternative shown above; do not mix package-manager
   instructions from different products.
3. Start a new Terminal session if the installed command is not on `PATH`, then
   confirm the command resolves. Authenticate through the client, not through a
   value copied into a shell history or prompt.
4. Begin in a disposable folder, run the safe first task, and preserve the
   output or diff needed for review. A successful launch is only a local
   observation; it does not prove that another macOS release, chip, account, or
   product surface behaves the same way.

### Short comparison checklist

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

## Three first-use recipes

### Desktop app

1. Open the official app and sign in.
2. Start a new chat with supplied or fictional text only.
3. Ask for a short result with a visible boundary, such as “do not browse,
   upload, send, or edit files.”
4. Compare the response with the supplied material. Only then decide whether a
   project, folder, upload, or connected capability is necessary for the next
   task.

### IDE integration

1. Open one disposable workspace and one relevant file.
2. Check what the integration can see: open files, selection, cursor, project
   root, and any displayed tool or permission state.
3. Ask for an explanation before asking for a change.
4. Request a small proposed diff, inspect every changed line, and run the
   narrowest relevant check yourself.

An IDE's context window is not a grant to edit the entire repository. If the
integration cannot show what it selected or changed, stop and narrow the task.

### Terminal agent

1. Open a disposable folder in the shell and record the starting state:

   ```text
   cd <disposable-folder>
   git status --short
   ```

   On PowerShell, use `Set-Location <disposable-folder>` instead of `cd` if
   that is clearer in your environment.
2. Launch the intended agent and confirm the account, workspace, and visible
   permission mode.
3. Ask it to inspect or explain one fixture and stop. Do not begin with a
   publish, delete, dependency upgrade, credential, or production task.
4. If the result is useful, allow one small change. Review the diff, run the
   relevant test or checker, and record whether you accepted or rejected it.

<span id="evidence-states"></span>

## Four evidence states

| Claim | Minimum evidence | What it does not prove |
| --- | --- | --- |
| Installed | The app opens or the intended command resolves, with product and version recorded when visible | Authentication, model access, or a successful task |
| Authenticated | The product accepts the intended account or provider flow | Permission to use a chosen folder or perform an external action |
| Ran a task | A dated response, log, or proposed diff exists for the declared client and workspace | Correctness, safety, or user acceptance |
| Accepted the result | The user checked the result against a stated requirement and kept the output, diff, or review note | Long-term learning, platform equivalence, or production readiness |

## After the first task: which route should you follow?

- You want a text-only starter practice: [Beginner Practice Pack](../communication-clinic-EN.md).
- You want the deep flagship track with files and tools: [First Safe Change](first-safe-change-EN.md).
- You want the platform-neutral foundation first: [Universal Core Foundations](universal-core-foundations-EN.md).
- You want to compare two platforms fairly: [LLM Comparison Protocol](../../skills/prysai-llm-comparison-protocol/SKILL.md).
- You want to check a changing product claim: [Platform Fact Watch](../../skills/prysai-platform-fact-watch/SKILL.md).

## Evidence state and boundary

This route is `candidate / not_run`. It now has dated official-source coverage
for ChatGPT, Gemini, Grok Bot, Grok Build, Codex, Claude Code, Google Cloud
Code, and DeepSeek Harness, but it has no recorded learner run, cross-platform
installation run, account-eligibility check, independent language review, or
production-readiness review. The new English material has not been propagated
to the other locale routes.

- [ ] I identified the product, client, and runtime instead of relying on a familiar name.
- [ ] I used only an official source and a disposable or authorized workspace.
- [ ] I recorded the exact client, operating system, visible version if any, and date.
- [ ] I did not paste secrets, private messages, unpublished files, or API keys.
- [ ] I treated a proposed tool action as a proposal and stopped before external side effects.
- [ ] I did not treat one platform's behavior as proof of another's.
