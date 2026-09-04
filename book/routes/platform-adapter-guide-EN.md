<!-- content_id: platform-adapter-guide-route | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: 2026-09-04-platform-encyclopedia -->

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
2026-09-04; they do not prove that an installer, account, or task works for you.

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

## A practical client matrix

| Client | How you start | Best first job | Runtime to record |
| --- | --- | --- | --- |
| ChatGPT web or mobile | Open the official entry and sign in when the task needs saved history or extra features | Rewrite or compare supplied text | Vendor service; note account and date |
| ChatGPT desktop | Install the official app, sign in, then choose a chat, project, or folder | Work with one small local file after checking the selected folder | Your computer plus the ChatGPT service |
| Gemini web or mobile | Open `gemini.google.com` or the official mobile app | Ask a text-only question with no extension enabled | Vendor service; note account and date |
| Codex or Claude Code IDE | Install the documented editor integration and open one workspace | Explain one file, then review a proposed diff | Local editor plus the agent service |
| Codex, Claude Code, Gemini CLI, or Grok Build | Install the official terminal entry, open a disposable folder, and run the command | Inspect a fixture and propose one small change | Local shell, workspace, and agent service |
| Grok Bot | Install the official desktop or companion mobile client and authenticate | Ask for a read-only summary or draft | Persistent hosted computer; do not call it local |
| DeepSeek Harness Web | Run the documented `dsh web` entry, choose a disposable workspace, then configure a model | Inspect a fixture with an explicit stop condition | Local Web server and the configured model service |

The matrix answers “where do I begin?” It does not say that the products are
interchangeable. For every row, keep four records: **installed**,
**authenticated**, **task run**, and **result accepted**. A green-looking answer
is not a substitute for the fourth record.

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
2026-09-03 or 2026-09-04, as noted in the linked receipts. They are not
commands that this project ran. Read the linked source
and the command before executing it, use a supported account, and stop if the
actual installer, package name, or permission prompt differs from the source.

### ChatGPT: web, mobile, and desktop

ChatGPT is the general conversation and work surface in this guide. It is not
automatically a local coding environment, and it is not another name for
Codex. OpenAI's current documentation separates ChatGPT on the web, the
desktop app, and the Codex CLI or IDE extension.

**Web:** Open the official [ChatGPT web entry](https://chatgpt.com/), sign in
when the task needs saved history or other account features, and start a new
chat. Keep the first exercise text-only. A web chat does not, by itself, grant
local file, shell, or desktop-app access.

**Mobile:** Use the official ChatGPT mobile-app entry, confirm the publisher,
account, region, and requested permissions, then begin with the same text-only
exercise. Do not infer that the mobile app has the same file, desktop, or coding
integrations as the web app.

**Desktop:** OpenAI's documented sequence is: install the ChatGPT desktop app,
sign in, choose a chat, project, or folder, then send a first message. The
desktop documentation covers macOS and Windows and links a separate Linux
installation guide. Choosing a folder changes the authority boundary because
the app may use files in that location and may be able to modify them. Start
with a disposable folder, ask for a read-only explanation, and inspect any
proposed change before accepting it.

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
feature is unavailable. See the [official Grok Build README](https://raw.githubusercontent.com/xai-org/grok-build/main/README.md)
and the [Grok Bot source receipt](../../docs/research/encyclopedia-grok-bot-sources-2026-09-03.md).

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

## Evidence states: four different claims

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
for ChatGPT, Gemini, Grok Bot, Grok Build, Codex, Claude Code, and DeepSeek
Harness, but it has no recorded learner run, cross-platform installation run,
account-eligibility check, independent language review, or
production-readiness review. The new English material has not been propagated
to the other locale routes.

- [ ] I identified the product, client, and runtime instead of relying on a familiar name.
- [ ] I used only an official source and a disposable or authorized workspace.
- [ ] I recorded the exact client, operating system, visible version if any, and date.
- [ ] I did not paste secrets, private messages, unpublished files, or API keys.
- [ ] I treated a proposed tool action as a proposal and stopped before external side effects.
- [ ] I did not treat one platform's behavior as proof of another's.
