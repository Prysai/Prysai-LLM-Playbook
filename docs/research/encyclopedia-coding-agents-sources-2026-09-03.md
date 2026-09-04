<!-- content_id: encyclopedia-coding-agents-sources-2026-09-03 | locale: EN | source: research -->

# Official source receipt: OpenAI Codex and Anthropic Claude Code

**Status:** `candidate` research record supporting the candidate platform-adapter
route; it is not verification of runtime behavior, account access, or learner
outcomes.

**Research date:** 2026-09-03 (America/Los_Angeles)  
**Scope:** official OpenAI and Anthropic documentation plus the two vendors'
official GitHub repositories; Windows, macOS, terminal, desktop, and IDE
surfaces only where the source explicitly describes them.  
**Repository boundary:** this is an encyclopedia research input, not a claim
that the project already has a complete or verified cross-platform adapter.

## Terminology check: “Cloud Code”

**Verified observation:** The exact phrase **“Cloud Code”** does not occur in
the official OpenAI Codex pages or official Anthropic Claude Code pages checked
below. The official names found are **Codex Cloud / Codex Web** on the OpenAI
side and **Claude Code** (including its web/cloud surfaces) on the Anthropic
side.

**Judgment:** It is not safe to silently correct a user's “Cloud Code” to
“Claude Code.” The spelling may be a user typo, or it may refer to a cloud
coding-agent concept. The sources support asking for or preserving the intended
term; they do not establish that “Cloud Code” means Claude Code.

**Unverified:** No user context was supplied that identifies which product the
phrase intended. This receipt therefore treats **Claude Code** as the verified
Anthropic product name and records OpenAI's cloud surface separately.

## Executive boundary map

| Vendor/product | Officially documented surface | Installation/use boundary supported here | Not established by this receipt |
| --- | --- | --- | --- |
| OpenAI Codex CLI | Terminal; macOS/Linux, Windows; npm/Homebrew alternatives | Install the CLI, enter a project directory, run `codex`, and sign in. Windows has a native PowerShell path and a documented Windows sandbox. | Any specific local account, plan entitlement, command success, or feature parity on this machine. |
| OpenAI Codex IDE extension | VS Code-compatible editors; Cursor; Windsurf; VS Code Insiders; Xcode and JetBrains integrations linked by OpenAI | Use the editor integration, sign in, and start a chat with open-file/selection context. | That every listed IDE integration is an OpenAI-maintained extension; the page explicitly links some integrations to the IDE vendor. |
| OpenAI ChatGPT desktop app / Codex app experience | macOS, Windows, Linux desktop app; the Codex repository also points to `codex app` and Codex Web | Download ChatGPT for macOS/Windows (Linux has a separate guide), sign in, and use local projects/files or other documented desktop workflows. | That “desktop app” and “Codex Web/cloud” are the same execution environment. They are documented as separate surfaces. |
| Anthropic Claude Code CLI | Terminal; macOS/Linux/WSL and native Windows PowerShell/CMD install | Install with the native installer, enter a project directory, run `claude`; Git for Windows is recommended on native Windows for Bash, otherwise PowerShell is used as the shell tool. | Runtime success, account access, shell profile, or local tool availability on this machine. |
| Anthropic Claude Code IDE | VS Code/Cursor extension; JetBrains plugin | Install the official-linked IDE integration and open Claude Code in the editor; the page describes inline diffs, mentions, plan review, and history for VS Code. | Support for an arbitrary IDE, or that IDE integration equals the full standalone CLI. |
| Anthropic Claude Code Desktop | macOS Intel/Apple Silicon, Windows x64/ARM64, Ubuntu/Debian beta | Download the desktop app, sign in, select the Code tab; the app includes Claude Code, so the CLI need not be installed separately. | Desktop/CLI feature parity; the official desktop page lists unavailable or different features. |

## OpenAI Codex: official facts

### O1 — Codex is split across explicit product surfaces

**Fact:** OpenAI's quickstart points developers who want Codex in a terminal or
code editor to **Codex CLI** or the **Codex IDE extension**. The same page
describes the ChatGPT desktop app as a separate surface.  
**URL:** <https://developers.openai.com/codex/quickstart.md>  
**Accessed:** 2026-09-03  
**Applies to:** OpenAI documentation's product-surface overview.  
**Not verified:** Whether a particular account or operating system exposes every
surface.

### O2 — CLI installation methods and first use

**Fact:** The Codex CLI page documents standalone installers for macOS/Linux
and Windows, plus npm and Homebrew alternatives. The documented commands are:

```text
macOS/Linux: curl -fsSL https://chatgpt.com/codex/install.sh | sh
Windows:     powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
npm:         npm install -g @openai/codex
Homebrew:    brew install --cask codex
```

It then says to open a project directory, run `codex`, and choose “Sign in with
ChatGPT” or another available sign-in method on first run.  
**URL:** <https://developers.openai.com/codex/cli.md>  
**Accessed:** 2026-09-03  
**Applies to:** documented Codex CLI setup; shell/package-manager prerequisites
remain environment-specific.  
**Not verified:** Running any installer or authenticating in this workspace.

### O3 — CLI usage boundary is terminal-local workflow

**Fact:** OpenAI describes the CLI as inspecting code, making changes, running
commands, and automating repeatable work from the terminal. The page separately
links `codex exec` for scripts/CI and describes `codex cloud` as a way to browse
or submit cloud work from the terminal.  
**URL:** <https://developers.openai.com/codex/cli.md>  
**Accessed:** 2026-09-03  
**Applies to:** the CLI documentation's stated capabilities and command
surfaces.  
**Not verified:** That a successful process or a cloud submission makes the
requested code change correct or accepted.

### O4 — Windows has a native path and a distinct sandbox boundary

**Fact:** OpenAI says Codex on Windows can use the native ChatGPT desktop app,
CLI, or IDE extension. Its Windows guide says the app can run natively in
PowerShell with a Windows sandbox without requiring WSL or a virtual machine;
the guide documents `elevated` and `unelevated` native sandbox modes. It
recommends Windows 11 as the baseline and describes recent Windows 10 as best
effort, with Windows 10 version 1809 or newer required in practice for modern
console support.  
**URL:** <https://developers.openai.com/codex/windows.md>  
**Accessed:** 2026-09-03  
**Applies to:** OpenAI's native Windows Codex guidance and its stated version
matrix.  
**Not verified:** The local Windows version, administrator policy, sandbox
availability, or whether WSL is needed for a particular toolchain.

### O5 — IDE support is explicitly named, but integration ownership differs

**Fact:** The OpenAI IDE page says VS Code and compatible editors use the Codex
extension; it lists Visual Studio Code, Cursor, Windsurf, and VS Code Insiders,
and links Xcode and JetBrains IDEs to their own integrations. It describes
open-file/selection context and in-place review of edits.  
**URL:** <https://developers.openai.com/codex/ide.md>  
**Accessed:** 2026-09-03  
**Applies to:** only the named editors/integrations and the behavior described
by the page.  
**Not verified:** Installation or feature parity for any editor not named.

### O6 — Desktop app availability is not proof of cloud/local equivalence

**Fact:** OpenAI's desktop page documents a ChatGPT desktop app for macOS and
Windows, with a separate Linux installation guide. It describes projects,
files, browser/desktop apps, plugins, and scheduled tasks as desktop workflows.
The official `openai/codex` README separately describes Codex CLI as local,
points to `codex app`/the Codex App page for a desktop experience, and points to
Codex Web for the cloud-based agent.  
**URLs:** <https://developers.openai.com/codex/app.md> and
<https://github.com/openai/codex>  
**Accessed:** 2026-09-03  
**Applies to:** current official product documentation and repository README.  
**Not verified:** Which backend, worktree, network, or permissions apply to a
particular desktop or web session.

## Anthropic Claude Code: official facts

### A1 — The verified product name is “Claude Code”

**Fact:** Anthropic's overview defines **Claude Code** as an agentic coding
tool and says it is available in the terminal, IDE, desktop app, and browser.
The official repository README likewise says it lives in the terminal and
links the official documentation.  
**URLs:** <https://code.claude.com/docs/en/overview> and
<https://github.com/anthropics/claude-code>  
**Accessed:** 2026-09-03  
**Applies to:** Anthropic's named product and the surfaces explicitly listed.  
**Not verified:** Any product called “Cloud Code”; that exact name was absent
from the checked official pages/repository README.

### A2 — Native CLI installation covers macOS/Linux/WSL and Windows

**Fact:** The overview recommends a native installer. It documents the shell
installer for macOS/Linux/WSL, PowerShell and CMD installers for Windows,
Homebrew for macOS/Linux, and WinGet for Windows. It says native installations
auto-update, while Homebrew and WinGet installations do not auto-update and
should be upgraded explicitly. It also says Git for Windows is recommended on
native Windows for the Bash tool; without it, Claude Code uses PowerShell as the
shell tool; WSL does not need Git for Windows.  
**URL:** <https://code.claude.com/docs/en/overview>  
**Accessed:** 2026-09-03  
**Applies to:** Claude Code CLI installation guidance.  
**Not verified:** Whether installers, auto-update, Git, or shell detection work
on this machine.

### A3 — CLI first use and non-interactive boundary

**Fact:** The official repository README says to navigate to a project
directory and run `claude`. The CLI reference documents interactive and print
(`-p`/`--print`) modes, session continuation/resume flags, and permission-mode
configuration. The desktop documentation explicitly contrasts CLI use for
scripting/automation with Desktop's interactive-only behavior.  
**URLs:** <https://github.com/anthropics/claude-code>,
<https://code.claude.com/docs/en/cli-reference>, and
<https://code.claude.com/docs/en/desktop>  
**Accessed:** 2026-09-03  
**Applies to:** Claude Code CLI reference and official desktop comparison.  
**Not verified:** That any flag is supported by the installed version in this
workspace; CLI flags are version-sensitive.

### A4 — IDE integrations are explicitly scoped

**Fact:** Anthropic documents a VS Code extension with inline diffs,
`@`-mentions, plan review, and conversation history. It provides install links
for VS Code and Cursor, and documents a JetBrains plugin for IntelliJ IDEA,
PyCharm, WebStorm, and other JetBrains IDEs.  
**URL:** <https://code.claude.com/docs/en/overview>  
**Accessed:** 2026-09-03  
**Applies to:** named VS Code/Cursor/JetBrains integrations.  
**Not verified:** Support for other editors or parity with the standalone CLI.

### A5 — Desktop app includes Claude Code, but is not the full CLI

**Fact:** Anthropic documents desktop downloads for macOS Intel/Apple Silicon,
Windows x64/ARM64, and Ubuntu/Debian beta. After launch and sign-in, the user
selects the Code tab; the source says Claude Code is included and the CLI does
not need to be installed separately. The desktop comparison says Desktop is
interactive only for the listed scripting flags, while CLI supports scripting
and automation. It also says agent teams are available in CLI, not Desktop;
Desktop has its own dynamic workflows.  
**URLs:** <https://code.claude.com/docs/en/overview> and
<https://code.claude.com/docs/en/desktop>  
**Accessed:** 2026-09-03  
**Applies to:** Anthropic's current desktop app documentation.  
**Not verified:** Desktop account eligibility, local session startup, or any
feature not listed in the comparison.

### A6 — Desktop and CLI share some configuration, not identical execution

**Fact:** Anthropic says Desktop and CLI read the same project `CLAUDE.md` /
`CLAUDE.local.md` files and share settings, hooks, and skills in documented
locations. The same page separately says the standalone CLI does not read
`claude_desktop_config.json`, while local Desktop Code-tab sessions can load
MCP servers from it.  
**URL:** <https://code.claude.com/docs/en/desktop>  
**Accessed:** 2026-09-03  
**Applies to:** configuration behavior explicitly stated on the desktop page.  
**Not verified:** Actual precedence in a local setup or whether a configured
server is safe, reachable, or approved.

## Comparison: what the sources support teaching

| Teaching claim | Evidence status | Safe wording |
| --- | --- | --- |
| Both products have terminal workflows | Supported | Both vendors document a terminal-first or terminal-capable coding-agent surface, but commands and permissions are product-specific. |
| Both products have Windows and macOS paths | Supported, with different details | Both document Windows and macOS coverage for at least the named surfaces; do not imply identical installation, shell, sandbox, or update behavior. |
| Both have IDE support | Supported only for named integrations | Teach only the editors/integrations named by each vendor and retain the vendor's ownership boundary. |
| Desktop equals CLI | Refuted by Anthropic's explicit comparison; not supported for OpenAI | Desktop and CLI may share some concepts or configuration, but must be taught as separate surfaces until a source establishes parity. |
| “Cloud Code” means Claude Code | Not supported | Preserve as an unresolved user term; use “Claude Code” only when the intended Anthropic product is established. |
| Installing means usable/verified | Not supported | Separate installation instructions from local execution, authentication, entitlement, permissions, and task acceptance evidence. |

## Scope gaps and deliberate non-claims

- This is source research, not an installation or runtime test. No installer was
  executed, no account was authenticated, and no repository was modified beyond
  this research file.
- The sources do not establish universal support for every Windows edition,
  shell, architecture, IDE, plan, region, enterprise policy, or third-party
  provider. Those must be checked separately before becoming reader-facing
  instructions.
- URLs, commands, product names, feature matrices, update behavior, and plan
  requirements are volatile. Recheck them before admission to canonical
  content; the access date above is evidence of when this snapshot was read,
  not a permanence claim.
- The official pages contain installation shell commands. They are recorded as
  source facts only; this pass did not execute them. Readers should review
  downloaded scripts and their permissions/network implications before running
  them.
- No claim is made here about performance, safety, reliability, model quality,
  productivity, or cross-platform equivalence.

## Source and license boundary

This file records short factual paraphrases and links to official sources. It
does not copy vendor documentation, code, images, or skill instructions. The
OpenAI Codex repository identifies itself as Apache-2.0 in its README; the
Anthropic repository page was used as an official product reference, not as a
source of copied code or prose. License status does not turn this receipt into
permission to reproduce vendor assets or documentation verbatim. Any later
content admission should recheck the source terms and update the project's
asset/source register as required.

## Review metadata

**Owner:** research-maintainer  
**Next review:** 2026-10-03, or sooner if either vendor changes installation,
surface, or terminology documentation.  
**Canonical-content action:** The record supports the candidate platform-adapter
route in `book/routes/platform-adapter-guide-EN.md`; it does not verify runtime
behavior, account access, or learner outcomes.
