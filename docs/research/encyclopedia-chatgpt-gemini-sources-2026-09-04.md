# Official source receipt: ChatGPT and Gemini clients

**Status:** `candidate` research record supporting the candidate platform-adapter
route; it is not verification of runtime behavior, account access, or learner
outcomes.

**Research date:** 2026-09-04 (America/Los_Angeles)
**Scope:** Official OpenAI, Google Gemini, and Gemini CLI documentation checked
for web, mobile, desktop, terminal, IDE, installation, and authentication
boundaries.
**Repository boundary:** This record contains original factual paraphrases and
links to official sources. Vendor documentation remains reference-only and
volatile; no vendor copy, screenshot, credential, or model output is bundled.

**Owner:** Prysai Playbook maintainer/editor
**Next review:** 2026-10-04, or sooner if OpenAI or Google changes a client,
installation, authentication, or availability page.

## Executive finding

ChatGPT and Gemini each span several clients, but a familiar brand name does
not establish a shared runtime or permission model. ChatGPT's official
documentation separates the web experience, the desktop app, and Codex entry
points. Google's documentation separates the Gemini web and mobile apps from
Gemini CLI and IDE integrations. The encyclopedia should therefore teach a
reader to record the client and runtime before treating a task as reproducible.

## Evidence classification

- **Official fact:** Directly stated by an official vendor documentation page,
  official help center, or official repository.
- **Scoped inference:** A conservative synthesis used to organize the route;
  it is not a vendor claim.
- **Not verified:** Not established by the sources checked here, or blocked by
  an access limitation.

## ChatGPT fact cards

### C1 - ChatGPT has separate web and desktop entry points

**Fact:** OpenAI's Codex quickstart says ChatGPT is available across surfaces,
including the ChatGPT desktop app and ChatGPT on the web. It presents Codex CLI
and the Codex IDE extension as separate choices for developers who want a
terminal or code-editor workflow.

**Source:** [Codex quickstart](https://developers.openai.com/codex/quickstart.md)
**Accessed:** 2026-09-04
**Applies to:** The product-surface overview in the official OpenAI developer
documentation.
**Not verified:** Whether a particular account, country, plan, operating
system, or organization exposes every surface.

### C2 - The official desktop path is install, sign in, choose a place to work

**Fact:** OpenAI's desktop documentation instructs the reader to install the
ChatGPT app, sign in, choose a chat, project, or folder, and send a first
message. It documents downloads for macOS and Windows and links a separate
Linux installation guide. The same page says a chosen folder can provide local
file context and can allow file modification, so folder selection is an
authority decision rather than a cosmetic preference.

**Source:** [ChatGPT desktop app](https://developers.openai.com/codex/app.md)
**Accessed:** 2026-09-04
**Applies to:** The desktop workflow described by OpenAI's current page.
**Not verified:** Actual installer success, account eligibility, local policy,
file permissions, or feature parity with ChatGPT on the web.

### C3 - The download endpoint was not independently readable here

**Fact:** `https://chatgpt.com/download/` returned HTTP 403 from this research
environment. OpenAI's documentation still links that endpoint as the download
entry.

**Judgment:** The 403 is an access limitation, not evidence that the app is
unavailable. The route should link the official entry and instruct readers to
check the page in their own browser rather than reproduce an unverified
installer URL or claim universal availability.

**Sources:** [ChatGPT download](https://chatgpt.com/download/), [ChatGPT desktop
app](https://developers.openai.com/codex/app.md)
**Accessed:** 2026-09-04

The OpenAI Help Center pages for mobile installation were also not readable from
this environment at research time. This is why the route describes the mobile
path as an official-entry check instead of publishing a guessed store URL or
claiming a particular app-store listing.

## Gemini fact cards

### G1 - Gemini web and mobile are consumer chat clients

**Fact:** Google's Gemini help center identifies the Gemini web app at
`gemini.google.com` and says some web-app features can be used without signing
in, while additional features or saved activity require a Google Account. Its
mobile-app help page documents Gemini apps on Android and iOS, subject to the
availability and account conditions described there.

**Sources:** [What you need to sign in to Gemini Apps](https://support.google.com/gemini/answer/13278668),
[Gemini mobile app availability](https://support.google.com/gemini/answer/14579026)
**Accessed:** 2026-09-04
**Applies to:** The web and mobile availability and sign-in guidance on those
help pages.
**Not verified:** Regional rollout, age requirements, plan features, app-store
availability, or the behavior of any particular extension or integration.

### G2 - Gemini CLI is a separate terminal agent

**Fact:** The official Gemini CLI repository describes Gemini CLI as an
open-source AI agent for the terminal. Its documented quick-install entries
include `npx @google/gemini-cli`, global npm installation, Homebrew on macOS or
Linux, and MacPorts on macOS. The official installation page lists current
recommended system specifications including Node.js 20+, Bash, Zsh, or
PowerShell, and named operating-system baselines.

**Sources:** [Gemini CLI README](https://raw.githubusercontent.com/google-gemini/gemini-cli/main/README.md),
[Gemini CLI installation](https://geminicli.com/docs/get-started/installation)
**Accessed:** 2026-09-04
**Applies to:** The commands and system guidance returned by those official
sources on the research date.
**Not verified:** Installation, network access, quota, account eligibility, or
the compatibility of a specific machine or shell.

### G3 - Gemini CLI has documented authentication choices

**Fact:** The official README documents signing in with Google as one Gemini
CLI authentication path and also documents Gemini API key and Vertex AI paths.
The authentication guide treats API keys as sensitive credentials and shows
platform-specific environment-variable examples. The route therefore uses
Google sign-in for the first task and links the official guide for readers who
need a different account or billing arrangement.

**Sources:** [Gemini CLI authentication](https://geminicli.com/docs/get-started/authentication),
[Gemini CLI README](https://raw.githubusercontent.com/google-gemini/gemini-cli/main/README.md)
**Accessed:** 2026-09-04
**Applies to:** Authentication methods described in the current CLI
documentation.
**Not verified:** A particular key, project, quota, billing status, or provider
configuration.

### G4 - IDE integration is an additional context boundary

**Fact:** The official Gemini CLI IDE page documents a VS Code companion
extension that can provide context such as open files, cursor position, and
selection, and can provide a diffing interface. It also documents Agent Client
Protocol integrations used with tools such as JetBrains and Zed. This is a
larger context and action surface than a text-only chat.

**Source:** [Gemini CLI IDE integration](https://geminicli.com/docs/ide-integration)
**Accessed:** 2026-09-04
**Applies to:** The named integration routes and context behavior described by
the official page.
**Not verified:** Support for an arbitrary editor, the exact installed
extension version, or parity between the companion extension and ACP.

### G5 - The live CLI docs carry a product-transition notice

**Fact:** The current Gemini CLI documentation page displays a notice about a
live product transition for some users. The notice is a volatile page-level
fact and is not used here to make a permanent product or availability claim.

**Source:** [Gemini CLI getting started](https://geminicli.com/docs/get-started/)
**Accessed:** 2026-09-04
**Applies to:** The notice visible on the page at access time.
**Not verified:** Its future timing, affected users, replacement behavior, or
whether the notice remains when a reader opens the page.

## Sources not treated as proof

The supplied personal Grok Bot account is a useful demand signal for deciding
what readers may need, but it is not product evidence. Search snippets,
third-party installation guides, app-store claims, and this repository's own
static tests were not used to establish vendor behavior or successful
installation.

## Route-writing consequences

1. Explain ChatGPT web/mobile/desktop as client choices before discussing local
   files or Codex.
2. Explain Gemini web/mobile separately from Gemini CLI and from IDE context.
3. Put current commands, operating-system baselines, and availability behind a
   dated source link and a recheck warning.
4. Use a fictional, text-only first task before enabling file access, API keys,
   extensions, browsing, or external actions.
5. Record `installed`, `authenticated`, `ran a task`, and `accepted the result`
   as separate evidence states.

## Research stop condition

The official sources were sufficient to document the client boundaries,
installation entries, authentication choices, and first-use cautions. No
attempt was made to fill gaps with third-party tutorials, search snippets, or
personal anecdotes. A later release still needs controlled installation runs,
account-eligibility checks, independent language review, and learner evidence.
