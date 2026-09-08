<!-- content_id: platform-encyclopedia-sources-2026-09-05 | locale: EN | source: research -->

# Official source receipt: platform and client encyclopedia

**Research date:** 2026-09-05 (America/Los_Angeles)

**Status:** `candidate / source-checked / read-only`
**Scope:** Official first-party documentation, official vendor repositories, and
official package-registry metadata for Grok/Grok Bot, OpenAI Codex, Claude Code,
DeepSeek Harness, and a minimal ChatGPT/Gemini client taxonomy. This receipt
contains original factual paraphrases and links; it is not an installation,
account-access, runtime, learner, security, or production-readiness test.

## Terminology boundary

“Cloud Code” is ambiguous and is not silently rewritten as a confirmed product
identity. The sources checked here establish three different official names:

- **Claude Code** — Anthropic's coding-agent product, documented for terminal,
  IDE, desktop, and browser surfaces.
- **Codex cloud** — OpenAI's separately documented cloud work surface.
- **Cloud Code** — Google's real Cloud Code IDE-extension family.

For the requested Anthropic installation topic, this receipt uses **Claude Code**
as the verified product name. It does not claim that the user's phrase was
intended to mean Claude Code.

## Surface map supported by the sources

| Product or surface | Officially documented entry | Boundary supported here | Not established |
| --- | --- | --- | --- |
| Grok assistant | `grok.com`, iOS, Android | Consumer assistant web and mobile surfaces | Grok Bot's cloud-computer model |
| Grok Bot | Desktop app for macOS, Windows, Linux; companion app for iOS and Android | User clients for persistent Bots and synced work | A public Grok Bot web client or standalone Grok Bot CLI |
| Grok Bot hosted computer | Browser, filesystem, terminal inside a persistent cloud VM | Bot execution environment | A local terminal installer or per-Bot security boundary |
| Grok Build | Interactive TUI, headless CLI, ACP | Separate terminal coding-agent product | Equivalence with Grok Bot |
| OpenAI Codex | CLI, IDE extension, desktop app, Codex cloud | Separate local, editor, desktop, and cloud documentation surfaces | Universal account/plan access or local/cloud parity |
| Claude Code | Native CLI, IDE integrations, desktop Code tab, browser | Anthropic coding-agent surfaces and platform install paths | A product officially named “Cloud Code” |
| Google Cloud Code | VS Code, IntelliJ/JetBrains, Cloud Shell | Cloud-native IDE extension family | Equivalence with Claude Code or Codex cloud |
| DeepSeek Harness | `@deepseek-ai/dsh` launcher and source checkout | Web, headless, SDK, ACP, and conditional profile routes | Broad Windows/macOS support or successful installation |

## Source register

Each row records the URL, page title, access date, claim scope, and limitation
for one official source. Product facts are volatile and must be rechecked before
reader-facing publication.

| ID | Official URL and page title | Accessed | Claim scope | Limitations |
| --- | --- | --- | --- | --- |
| X1 | [Welcome to Grok — SpaceXAI Docs](https://docs.x.ai/grok/overview) | 2026-09-05 | xAI documents Grok at `grok.com` and in iOS/Android apps, with signed-in conversations, settings, and subscriptions kept in sync. | This is the general Grok assistant, not Grok Bot. Availability, plan, region, account, and feature eligibility are not established. |
| X2 | [Grok Bot — SpaceXAI Docs](https://docs.x.ai/grok-bot/overview) | 2026-09-05 | xAI describes Bots as AI teammates using a persistent cloud computer with a browser, filesystem, and terminal; Bots on one account share that computer's state. | The hosted terminal is not evidence of a local Grok Bot CLI. Connector, approval, computer-use, and rollout availability may vary. |
| X3 | [Get started — SpaceXAI Docs](https://docs.x.ai/grok-bot/get-started) | 2026-09-05 | Documents the Grok Bot desktop app for macOS, Windows, and Linux, architecture-specific downloads, browser-based authentication, and automatic updates. | Does not verify any reader's plan, Cursor-account eligibility, installer success, download hash, region, or organization policy. |
| X4 | [Grok Bot for Mobile — SpaceXAI Docs](https://docs.x.ai/grok-bot/mobile) | 2026-09-05 | Documents the iPhone/iOS and Android companion app, shared Bots and cloud work, iOS 18+ and Android 9+ requirements, and mobile setup. | The page's rollout, plan, country, store-listing, notification, and device behavior are not independently verified. It says the initial design is for phones rather than iPad. |
| X5 | [Frequently asked questions — SpaceXAI Docs](https://docs.x.ai/grok-bot/faq) | 2026-09-05 | Cross-checks Grok Bot desktop/mobile surfaces, sync, background cloud work, and named platform requirements. | FAQ availability and billing depend on account and plan; repeated documentation is still volatile and is not proof of access. |
| X6 | [Approvals, security, and privacy — SpaceXAI Docs](https://docs.x.ai/grok-bot/approvals-security-and-privacy) | 2026-09-05 | Documents approval boundaries for messages, publishing, purchases, deletion, permissions, production changes, credentials, and local-computer execution. | This is vendor guidance, not an independent security audit. Approval does not prove rollback, and linked account/retention terms require their own review. |
| X7 | [Grok Build: SpaceXAI's Coding Agent — SpaceXAI Docs](https://docs.x.ai/build/overview) | 2026-09-05 | Documents Grok Build as a separate coding agent with interactive TUI, headless scripting, ACP, and macOS/Linux/WSL/Windows installation entries. | It supports a Grok-related terminal surface, not a Grok Bot CLI claim. Commands, authentication, and platform behavior were not run here. |
| O1 | [Quickstart — ChatGPT Learn](https://developers.openai.com/codex/quickstart) | 2026-09-05 | OpenAI separates ChatGPT web/desktop entry points from Codex CLI and the Codex IDE extension; it lists desktop coverage for macOS, Windows, and Linux. | It does not establish universal account, plan, country, organization, or feature access. |
| O2 | [Codex CLI — ChatGPT Learn](https://developers.openai.com/codex/cli) | 2026-09-05 | Documents terminal installation for macOS/Linux and Windows, npm and Homebrew alternatives, `codex` first use, sign-in, `codex exec`, and a CLI route to Codex cloud. | Install commands and authentication were not executed. Shell prerequisites, package versions, account access, and task correctness remain unverified. |
| O3 | [Codex IDE extension — ChatGPT Learn](https://developers.openai.com/codex/ide) | 2026-09-05 | Names VS Code-compatible editors including VS Code, Cursor, Windsurf, and VS Code Insiders, and describes editor context such as open files and selections. | The page links some integrations to their own vendors; it does not establish support for arbitrary IDEs or parity with CLI/cloud. |
| O4 | [Codex cloud — ChatGPT Learn](https://developers.openai.com/codex/cloud) | 2026-09-05 | OpenAI documents Codex cloud as a distinct cloud work surface with its own concepts and workflows. | This receipt does not infer backend, worktree, network, permission, plan, region, or successful task behavior for a particular account. |
| O5 | [Windows sandbox — ChatGPT Learn](https://developers.openai.com/codex/windows) | 2026-09-05 | Documents native Windows Codex paths, PowerShell use, Windows sandbox modes, and the stated Windows version guidance. | Local Windows version, administrator policy, sandbox availability, WSL need, and toolchain compatibility were not checked. |
| O6 | [ChatGPT desktop app — ChatGPT Learn](https://developers.openai.com/codex/app) | 2026-09-05 | Documents the desktop app's project, local-file, and longer-task workflow and links macOS, Windows, and Linux paths. | A desktop app is not treated as the same runtime as Codex cloud. Download, sign-in, permissions, and feature parity were not tested. |
| A1 | [Overview — Claude Code Docs](https://code.claude.com/docs/en/overview) | 2026-09-05 | Establishes the official name **Claude Code** and documents terminal, IDE, desktop, and browser surfaces; it lists native shell installers for macOS/Linux/WSL and Windows PowerShell/CMD, plus Homebrew and WinGet. | The exact phrase “Cloud Code” is not established as an Anthropic product. Installation, auto-update, Git for Windows, shell selection, account access, and platform behavior were not run. |
| A2 | [Desktop application — Claude Code Docs](https://code.claude.com/docs/en/desktop) | 2026-09-05 | Documents Claude Code in the desktop Code tab, with macOS Intel/Apple Silicon, Windows x64/ARM64, and Ubuntu/Debian beta entries, and explains that desktop and CLI are not identical surfaces. | Beta status, account eligibility, feature availability, and desktop/CLI parity are not independently verified. |
| A3 | [CLI reference — Claude Code Docs](https://code.claude.com/docs/en/cli-reference) | 2026-09-05 | Documents interactive and print modes, session continuation/resume, and permission-related CLI options. | Flags are version-sensitive; no installed version or command execution was checked. |
| G1 | [Cloud Code extensions — Google Cloud Documentation](https://cloud.google.com/code/docs) | 2026-09-05 | Establishes **Cloud Code** as Google's cloud-native IDE extension family and distinguishes its IDE/Cloud Shell documentation from coding-agent products. | No Google Cloud project, credential, IDE installation, Cloud Shell session, or deployment was tested. This source does not make Cloud Code equivalent to Claude Code or Codex cloud. |
| D1 | [deepseek-harness README at master — deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md) | 2026-09-05 | Official README identifies DeepSeek Harness as a developer-preview project and documents `npx @deepseek-ai/dsh web`, the default `127.0.0.1:3080` Web UI, and source checkout steps. | The command was not executed. `master` and developer-preview content can change; no installation, browser, API-key, or runtime result is claimed. |
| D2 | [CLI README at master — deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md) | 2026-09-05 | Documents `dsh` as the Node launcher and distinguishes `web`, `headless`, `sdk`, `sdk-minimal`, `acp`, plugin management, and conditional profiles such as a TUI profile. | Profiles, stdio behavior, PTY behavior, plugins, and compatibility were not executed. A TUI example is not treated as proof of a default built-in TUI. |
| D3 | [CLI reference at master — deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/reference/README.md) | 2026-09-05 | Documents the `dsh web` alias, Web flags such as host/port/no-open, source-build requirements, and profile/plugin argument boundaries. | It is a documentation contract, not a local run. The default loopback address is not a public deployment guarantee, and broad cross-platform support is not inferred. |
| D4 | [package.json at master — deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/blob/master/package.json) | 2026-09-05 | The source checkout declares `pnpm@11.7.0` and Node `^22.19.0 || >=24.0.0`. | These constraints apply to the repository checkout; they are not automatically the compatibility contract of the published npm package. |
| D5 | [@deepseek-ai/dsh package metadata — npm registry](https://registry.npmjs.org/@deepseek-ai%2fdsh) | 2026-09-05 | The registry snapshot observed latest `0.1.2-rc.1`, `dsh` as the bin, MIT license, and the official repository directory `apps/cli`; the observed version had no `engines` field. | Registry metadata is time-sensitive. The tarball was not downloaded, installed, or run; no npm/npx version matrix or platform success is claimed. |
| M1 | [Gemini CLI installation, execution, and releases — Gemini CLI](https://geminicli.com/docs/get-started/installation) | 2026-09-05 | Used only for taxonomy: Google documents Gemini CLI as a separate terminal client with npm/Homebrew/MacPorts/other routes, named OS/runtime guidance, and a current scoped transition notice. | The notice, quotas, account eligibility, installation, and compatibility are volatile and were not independently run. It is not evidence about Codex, Claude Code, or Grok Bot. |
| M2 | [IDE Integration — Gemini CLI](https://geminicli.com/docs/ide-integration) | 2026-09-05 | Used only for taxonomy: documents the VS Code companion extension and ACP/IDE integration boundary. | No extension, IDE, sandbox, PID handoff, or arbitrary-editor compatibility was tested. |

## Not found or deliberately unverified

- The checked official Grok sources do not establish a public Grok Bot web URL or
  a standalone Grok Bot terminal installer. Grok Bot's hosted terminal and the
  separate Grok Build CLI must remain separate claims.
- The checked official OpenAI and Anthropic sources do not establish that
  “Cloud Code” means Claude Code. Google Cloud Code is an independently named
  official product.
- No source-only review proves installation success, authentication, account
  entitlement, plan/region availability, cross-platform equivalence, security,
  reliability, learning outcomes, or production readiness.
- DeepSeek Harness official sources document a developer preview and source/npm
  entry points, but this receipt does not claim comprehensive Windows/macOS
  support or a successful run.

## Source and licence boundary

This file contains short original paraphrases and links to official sources. It
does not copy vendor prose, code, screenshots, prompts, credentials, or packaged
assets. Any later reader-facing content needs an independent editorial review,
fresh source checks, and the project's source/licence register decision where
external assets or adapted material are involved.

**Next review:** Before this receipt becomes installation instructions, and no
later than 2026-10-05, or sooner when a cited vendor changes its client,
installation, platform, plan, or availability documentation.
