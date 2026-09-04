<!-- content_id: encyclopedia-cloud-code-sources-2026-09-04 | locale: EN | source: research -->

# Official source receipt: Google Cloud Code

**Status:** `candidate` research record supporting the candidate platform-adapter
route; it is not verification of runtime behavior, account access, project
permissions, or learner outcomes.

**Research date:** 2026-09-04 (America/Los_Angeles)
**Scope:** Official Google Cloud documentation for Cloud Code's product
boundary, IDE surfaces, Cloud Shell path, and installation entry points.
**Repository boundary:** This record contains original factual paraphrases and
links to official sources. Google documentation, product names, and service
availability remain reference-only and volatile; no vendor prose, screenshot,
credential, or model output is bundled.

**Owner:** Prysai Playbook maintainer/editor
**Next review:** 2026-10-04, or sooner if Google changes Cloud Code's IDE,
Cloud Shell, installation, or Gemini Code Assist documentation.

## Executive finding

Google Cloud Code is an IDE extension family for developing cloud-native
applications. It is documented separately for VS Code, IntelliJ/JetBrains, and
Cloud Shell. The name must not be silently collapsed into Anthropic's Claude
Code, OpenAI's Codex Cloud, or a generic terminal coding agent.

## Fact cards

### GCO1 - Cloud Code is an IDE development extension

**Fact:** Google's overview describes Cloud Code as an extension that brings
Google Cloud services such as Google Kubernetes Engine and Cloud Run into an
IDE. It covers activities across the development cycle and integrates with
tools such as Skaffold, minikube, kubectl, and Google Cloud SDK.

**Source:** [Cloud Code overview](https://cloud.google.com/code/docs)
**Accessed:** 2026-09-04
**Applies to:** Google's overview of the Cloud Code extension family.
**Not verified:** A particular IDE installation, Google Cloud project,
credential, quota, deployment, or local toolchain.

### GCO2 - The installation path depends on the client

**Fact:** Google publishes separate Cloud Code documentation for VS Code,
IntelliJ/JetBrains, and Cloud Shell. The VS Code and IntelliJ/JetBrains pages
expose installation guides rather than one universal `cloud-code` command.
Cloud Code is built into the Cloud Shell Editor and does not require a separate
extension setup there.

**Sources:** [Cloud Code for VS Code](https://cloud.google.com/code/docs/vscode/overview),
[install Cloud Code for VS Code](https://cloud.google.com/code/docs/vscode/install),
[Cloud Code for IntelliJ](https://cloud.google.com/code/docs/intellij/overview),
[install Cloud Code for IntelliJ](https://cloud.google.com/code/docs/intellij/install),
[Cloud Code for Cloud Shell](https://cloud.google.com/code/docs/shell/overview),
[Cloud Shell getting started](https://docs.cloud.google.com/code/docs/shell/getting-started)
**Accessed:** 2026-09-04
**Applies to:** The named Google Cloud Code client routes.
**Not verified:** Installation success, account eligibility, regional
availability, local IDE version, or Cloud Shell project permissions.

### GCO3 - Gemini Code Assist is an adjacent capability, not a product merge

**Fact:** Google's Cloud Code overview says Cloud Code comes with Gemini Code
Assist, which can help with code problems, code generation, and inline
suggestions. This describes an AI-assisted IDE capability within the Google
Cloud development surface; it does not establish equivalence with Claude Code,
Codex, or Gemini CLI.

**Source:** [Cloud Code overview](https://cloud.google.com/code/docs)
**Accessed:** 2026-09-04
**Applies to:** The capability description visible in the official overview.
**Not verified:** Whether a particular account, IDE, plan, region, or rollout
exposes every Gemini Code Assist feature.

## Teaching boundary

| Claim | Evidence status | Safe wording |
|---|---|---|
| Cloud Code is a Google Cloud IDE extension family | Supported by official overview | Teach it as an IDE/cloud-development surface with client-specific installation paths. |
| Cloud Code is Claude Code or Codex Cloud | Not supported | Keep the vendor and runtime explicit; do not use the names interchangeably. |
| Installing the extension proves deployment access | Not supported | Separate installation, authentication, project selection, permission, action, and acceptance evidence. |
| Cloud Shell is the same runtime as a local IDE | Not supported | Record Cloud Shell as a hosted shell and local IDE work as a separate runtime. |

## Source and license boundary

This record links official Google Cloud documentation and contains original
editorial paraphrases. It does not copy vendor prose, screenshots, code,
credentials, project data, or model output. The linked documentation and
product names remain external, volatile references; no external asset is
adapted or bundled.

## Research stop condition

The official pages were sufficient to establish the product name, IDE and Cloud
Shell surfaces, installation routing, and the distinction from coding agents.
No extension was installed, no Google account or project was authenticated, no
deployment was attempted, and no learner or cross-platform result was claimed.
