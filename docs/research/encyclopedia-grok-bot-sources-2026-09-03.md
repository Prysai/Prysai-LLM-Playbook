# Encyclopedia route: Grok Bot official-source research

**Research date:** 2026-09-03  
**Status:** `candidate / source-checked`  
**Scope:** Official xAI/SpaceXAI product documentation, official xAI GitHub repositories, and the official web entry points reachable from this environment.  
**Repository boundary:** This is a source record supporting the candidate encyclopedia route. It contains original factual paraphrases and source links; it is not verification of runtime behavior, account access, or learner outcomes.  
**Purpose:** Establish a source-backed boundary for an encyclopedia route about Grok Bot: what the product is, which official surfaces are documented, and what must not be inferred from adjacent Grok products.

## Executive finding

The official documentation separates three related but different surfaces:

1. **Grok** is the general assistant. The official docs place it at `grok.com` and in the iOS and Android apps.
2. **Grok Bot** is a distinct AI-teammate product. Its documented work runs on a persistent cloud computer with a browser, filesystem, and terminal. The documented user clients are the Grok Bot desktop app for macOS, Windows, or Linux and a companion iOS/Android app.
3. **Grok Build** is a separate coding-agent product with an interactive terminal TUI, headless scripting mode, and ACP integration. It is evidence for an official Grok-related terminal entry, but not evidence that Grok Bot itself has a terminal client.

The safest encyclopedia wording is therefore: **“Grok Bot is a persistent cloud-computer AI-teammate product accessed through documented desktop and mobile clients; Grok Build is the separately documented terminal coding-agent surface.”** Do not collapse these into “Grok Bot CLI,” “Grok Bot for the web,” or a single interchangeable Grok product.

## Evidence classification

- **Official fact:** Directly stated by an official xAI/SpaceXAI documentation page or an official `xai-org` repository.
- **Scoped inference:** A conservative synthesis across official pages, useful for route design but not a verbatim product claim.
- **Not verified:** Not established by the sources checked here, or blocked by an access limitation. It must not be presented as an official fact.
- **Not used as evidence:** Friends' experiences, third-party reviews, search snippets, and assumptions about account access or rollout.

## Official fact cards

### F1 — Grok consumer assistant surfaces

- **Fact:** xAI's official Grok documentation says Grok is available on the web at `grok.com` and in the iOS and Android apps, with conversations, settings, and subscriptions synchronized across platforms after sign-in.
- **Surface:** General Grok assistant; this is not the Grok Bot product boundary.
- **Source:** [Welcome to Grok](https://docs.x.ai/grok/overview)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** The official documentation page's description of the general Grok assistant and its consumer surfaces. It does not prove that every feature, plan, country, account, or app-store listing is available to every reader.
- **Caveat:** The page was last updated 2026-08-11, so access, plan, and feature details need a fresh check before publication.

### F2 — Grok Bot product identity and cloud execution

- **Fact:** The official Grok Bot overview defines Bots as AI teammates that can do real work. It says a Bot can use apps and websites on a persistent cloud computer, continue work independently, coordinate with other Bots, and return when user approval is needed.
- **Fact:** The same page says each Bot has a browser, filesystem, and terminal on its persistent cloud VM; connectors/MCP and computer use are available where supported.
- **Fact:** The same page says all Bots for one user share one persistent cloud computer, including files, browser sessions, and app logins. Each Bot has its own screen, but the shared computer is not an individual-Bot security boundary.
- **Surface:** Grok Bot product model and hosted execution environment.
- **Source:** [Grok Bot overview](https://docs.x.ai/grok-bot/overview)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** The product behavior and architecture described by this official page. Availability of connectors, computer use, approvals, and account features can vary by plan or rollout.
- **Caveat:** “Terminal” here is a capability inside the hosted Bot computer. It is not evidence of a separately installable Grok Bot terminal client.

### F3 — Grok Bot desktop client entry

- **Fact:** The official getting-started page requires “the Grok Bot desktop app for macOS, Windows, or Linux” and instructs the user to download it, install it, open it, and authenticate in a browser.
- **Fact:** The page describes separate macOS Apple-silicon/Intel downloads, Windows x64/Arm64 downloads, and Linux x64/Arm64 packages (`.deb`, `.rpm`, or AppImage).
- **Fact:** The page says the desktop app checks for updates automatically and also exposes “Check for Updates” under Settings → Beta.
- **Surface:** Grok Bot desktop application.
- **Source:** [Get started](https://docs.x.ai/grok-bot/get-started)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** Installation instructions and platform labels shown on the official page; actual download availability, account eligibility, architecture support, and rollout can change.
- **Caveat:** This page lists eligible plans and Cursor-account sign-in requirements. It is not evidence that a reader's account is eligible.

### F4 — Grok Bot mobile client entry

- **Fact:** The official mobile page says Grok Bot is available on iPhone and Android, connects to the same Bots, conversations, routines, connectors, and shared cloud computer as desktop, and continues cloud work when the mobile app is closed.
- **Fact:** The documented requirements are iOS 18 or later, Android 9 or later, and an internet connection. The page says Grok Bot is designed for phones, not iPad.
- **Fact:** The page lists mobile actions including dictating, attaching photos/files, mentioning another Bot, replying in a thread, reacting, reviewing the computer, taking over for password/2FA/CAPTCHA steps, searching prior work, and reviewing routines. It also says editing routine schedules/instructions, viewing run history, testing, and deleting a routine currently require the desktop app.
- **Surface:** Grok Bot companion mobile app.
- **Source:** [Grok Bot for Mobile](https://docs.x.ai/grok-bot/mobile)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** The official mobile product description and stated minimum OS versions. Push notifications are described as still rolling out, so notification behavior is not universal evidence.
- **Caveat:** The page links to App Store and Google Play but does not, in the retrieved text, expose a stable store URL or establish country-by-country availability.

### F5 — Grok Bot FAQ's cross-device boundary

- **Fact:** The official FAQ answers “Where do I talk to Grok Bot?” with the Grok Bot desktop app on macOS, Windows, or Linux, or the companion app on iOS or Android; it says Bots and conversations sync across signed-in devices.
- **Fact:** The FAQ repeats that Bot work runs on the cloud computer and continues when the app, laptop, or phone is closed.
- **Fact:** The FAQ lists macOS Apple silicon/Intel, Windows x64/Arm64, Linux x64/Arm64 (`.deb`, `.rpm`, or AppImage), iOS 18+, and Android 9+; it says iPad is not supported at initial launch.
- **Surface:** Consolidated FAQ; use as a cross-check, not as proof of a current individual account's access.
- **Source:** [Frequently asked questions](https://docs.x.ai/grok-bot/faq)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** The product and platform scope stated by the FAQ.
- **Caveat:** The FAQ says availability and billing depend on account and plan; the list of eligible plans is volatile.

### F6 — Grok Bot's action and data boundaries

- **Fact:** The official approvals page recommends explicit stop conditions for sending messages, publishing, purchases/transfers, deletion or overwrite, permission changes, production changes, and legal-term acceptance.
- **Fact:** It says passwords, passkeys, two-factor codes, CAPTCHAs, and payment confirmations should be completed by the user through computer takeover rather than ordinary chat.
- **Fact:** It says local-computer execution is separate from the hosted shared cloud computer and defaults to “Ask every time” in the documented settings flow.
- **Fact:** It says Grok Bot uses Cursor authentication and account data settings, requires data storage, and does not support Legacy Privacy Mode; training opt-out follows applicable Cursor account and privacy settings.
- **Surface:** Safety, approval, and privacy boundary for Grok Bot.
- **Source:** [Approvals, security, and privacy](https://docs.x.ai/grok-bot/approvals-security-and-privacy)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** The controls and cautions stated in the official documentation. Contractual retention, encryption, and plan terms require the linked current Cursor materials and are not independently restated here.
- **Caveat:** An approval gate controls a proposed action; it does not reverse work already performed. Do not teach approval as rollback.

### F7 — Grok Bot files and result artifacts

- **Fact:** The official files page says users can attach or drag files into the composer and gives examples including images, audio, video, PDFs, plain-text documents, Word/Excel/PowerPoint, CSV/JSON/YAML, source code, HTML/email, and Jupyter notebooks.
- **Fact:** It states that the desktop composer accepts up to six attachments at a time; documents, images, and audio can be up to 25 MB each, and videos up to 200 MB each. It warns that large, encrypted, damaged, or unusual files may not be readable.
- **Fact:** The page recommends asking for reviewable results with source links, screenshots, timestamps/time zones, input/output filenames, an action log, and an explicit list of anything the Bot could not verify.
- **Surface:** Grok Bot input and result-review workflow.
- **Source:** [Files and results](https://docs.x.ai/grok-bot/files-and-results)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`.
- **Applicable scope:** Limits and examples stated by this page; these are volatile product facts and should be rechecked before use in an exercise.
- **Caveat:** A supported file type or documented size limit does not prove successful parsing of a particular file.

### F8 — Grok Build is a separate official terminal coding-agent surface

- **Fact:** The official documentation defines Grok Build as a coding agent usable through an interactive TUI, headlessly in scripts or bots, or through the Agent Client Protocol (ACP) in other apps.
- **Fact:** The official CLI reference says running `grok` with no arguments starts the interactive TUI. It documents `grok login`, `grok models`, session commands, MCP/plugin commands, worktrees, `grok agent stdio`, headless flags, and more.
- **Fact:** The official headless documentation gives `grok -p "Your prompt here"`, named/resumable headless sessions, JSON/streaming-JSON output, and ACP via `grok agent stdio`.
- **Fact:** The official Grok Build repository describes the product as a terminal-based AI coding agent with a full-screen TUI, headless scripting/CI, and ACP embedding. It publishes prebuilt binaries for macOS, Linux, and Windows and links its online documentation to `docs.x.ai/build/overview`.
- **Surface:** Grok Build terminal/CLI/TUI; not Grok Bot's desktop or mobile client.
- **Sources:** [Grok Build overview](https://docs.x.ai/build/overview), [CLI reference](https://docs.x.ai/build/cli/reference), [Headless & scripting](https://docs.x.ai/build/cli/headless-scripting), and [official `xai-org/grok-build` repository](https://github.com/xai-org/grok-build)
- **Accessed:** 2026-09-03; HTTP 200 from `docs.x.ai`, GitHub, and the raw repository README.
- **Applicable scope:** The separately named Grok Build product and its documented command-line surfaces.
- **Caveat:** This evidence supports “Grok Build has a terminal entry.” It does not support “Grok Bot has a CLI,” “Grok Bot can be installed by `grok`,” or behavior equivalence between Grok Build and Grok Bot.

### F9 — Official xAI repositories relevant to the boundary

- **Fact:** The official `xai-org` GitHub organization lists `grok-build` as SpaceXAI's coding-agent harness and TUI, `xai-sdk-python` as the official Python SDK for the xAI API, `xai-cookbook` as API examples, and `grok-prompts` as prompts for the Grok chat assistant and the `@grok` bot on X.
- **Fact:** The official `grok-prompts` README says its published prompts are used for the Grok chat assistant on `grok.com` and X, including a prompt specifically described as the prompt for the Grok bot on X. It is not documentation of Grok Bot's cloud-computer product.
- **Surface:** Source provenance and product separation; not a client download catalog for Grok Bot.
- **Sources:** [xAI GitHub organization](https://github.com/xai-org), [official `xai-org/grok-prompts` repository](https://github.com/xai-org/grok-prompts), [raw README](https://raw.githubusercontent.com/xai-org/grok-prompts/main/README.md)
- **Accessed:** 2026-09-03; HTTP 200 from GitHub and raw.githubusercontent.com.
- **Applicable scope:** Repository descriptions and README statements visible at access time.
- **Caveat:** A public repository's existence does not prove that its code or prompts are the current production implementation, nor does it prove a product feature beyond the README's stated scope.

## Official entry-point matrix

| Product/surface | Official entry documented | What the evidence supports | What it does not support |
|---|---|---|---|
| Grok assistant | `https://grok.com`; iOS; Android | General Grok web and mobile surfaces | Grok Bot identity or cloud-computer behavior |
| Grok Bot | Desktop app: macOS, Windows, Linux; companion app: iOS, Android | User-facing clients for persistent Bots and synced conversations | A public Grok Bot web URL, a Grok Bot CLI, or iPad support |
| Grok Bot hosted computer | Browser, filesystem, terminal inside a persistent cloud computer | Bot execution environment and shared-per-user state | A local terminal installer or independent per-Bot security boundary |
| Grok Build | `grok` interactive TUI; `grok -p`; `grok agent stdio` | Official terminal, headless, and ACP coding-agent surfaces | That Grok Build and Grok Bot are the same product |
| xAI API | `https://api.x.ai/v1` via official docs | Programmatic model/API access with API key and documented APIs | A consumer Grok Bot client or a Bot's persistent cloud computer |

## Access checks and unverified items

### Access checks

The following official-looking entry points were attempted on 2026-09-03:

- `https://x.ai/grok` — HTTP 403 in this environment.
- `https://x.ai/bot` — HTTP 403 in this environment.
- `https://help.x.com/en/using-x/grok` — HTTP 403 in this environment.

These results establish only an access limitation for this research environment. They do **not** establish that the pages do not exist, that their content agrees with or conflicts with the docs, or that a product surface is unavailable.

### Not verified by this note

- A stable public Grok Bot web-client URL or a browser-only Grok Bot entry.
- Exact download URLs, installer hashes, release versions, supported countries, regional restrictions, or app-store listing status.
- Whether the documented eligible plans and limits apply to a particular reader or organization.
- Whether all documented features are enabled for all accounts, operating systems, languages, or rollout cohorts.
- A standalone Grok Bot terminal/CLI. The official evidence found instead documents terminal capability inside the Bot's cloud computer and a separate Grok Build CLI/TUI.
- The current implementation, model assignment, backend architecture, retention period, or security certification beyond what the linked official pages explicitly state.
- Any claim that Grok Bot, Grok Build, Grok.com Grok, the X `@grok` bot, and the xAI API are behaviorally equivalent.
- User demand, reliability, productivity, safety, learning outcomes, or preference based on a friend's experience or any other anecdote.

## Suggested encyclopedia boundary

Use the following as a candidate route framing, subject to a later editorial review:

> Grok Bot is xAI's documented AI-teammate surface for work on a persistent cloud computer. You interact with it through its desktop app on macOS, Windows, or Linux, or through its iOS/Android companion app. The Bot's hosted computer may include a browser, files, and terminal, but that does not make Grok Bot a local terminal client. For a terminal coding-agent experience, xAI documents the separate Grok Build product.

Teaching should begin with a read-only or draft task, state the target and stop condition, and keep sending, publishing, purchasing, deletion, permission changes, and production changes behind explicit approval. The source pages support this as a safety boundary; they do not prove that a learner will follow it or that the product will complete a task successfully.

## Source and license boundary

- This record links to official pages and repository descriptions; it does not copy source text, screenshots, prompts, code, or packaged assets into the project.
- `xai-org/grok-build` identifies first-party code as Apache-2.0 and points to third-party notices. Any future code reuse requires a separate license and dependency review.
- `xai-org/grok-prompts` identifies the repository as AGPL-3.0. Do not copy its prompt files into the Playbook or treat them as project-owned teaching content without a separate rights decision.
- xAI/Cursor documentation and product names remain external references. Any later reader-facing rewrite must be original, link the relevant source, preserve the access date and scope, and be rechecked before publication.

## Review and maintenance

- **Next review trigger:** Before this note is converted into reader-facing content, and whenever a route claims a current client, platform, plan, price, limit, or feature.
- **Owner:** Prysai Playbook maintainer/editor.
- **Required recheck:** Reopen the cited official pages, record the new access date and HTTP/result state, verify desktop/mobile/terminal distinctions, and preserve unknowns instead of filling them from anecdotes or third-party summaries.
- **Current release implication:** This is a research receipt only. It is not a verified platform adapter, runnable lab, production guide, endorsement, account-eligibility check, or proof of user outcome.
