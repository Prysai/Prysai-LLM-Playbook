<!-- content_id: chapter-18-content-design-data-automation | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

# Chapter 18: Content, Design, Data, and Automation Track

## The problem this chapter solves

The external skills ecosystem covers writing, documents, websites, images, presentations, spreadsheets, data analysis, video, and SaaS automation. The more tools a workflow includes, the easier it is to mistake “the source file exists,” “the script ran,” or “the API connected” for a finished deliverable.

Other failures are less visible: broken layout, missing empty states, misleading charts, inaccessible output, unclear licensing, duplicate writes, excessive permissions, privacy leakage, and external actions that cannot be undone. This chapter provides one product–risk–verification method: define the final form and audience, enable capabilities in risk order, and inspect the rendered result, inputs and outputs, permissions, recovery behavior, and publication state.

## Learning objectives

By the end of this chapter, you should be able to:

1. Choose capabilities by deliverable and risk instead of accumulating tools by brand.
2. Define observable acceptance criteria for documents, websites, images, presentations, spreadsheets, PDFs, data flows, and automations.
3. Inspect the final form for hierarchy, readability, empty and error states, responsive behavior, accessibility, factual accuracy, licensing, and editability.
4. Record an automation’s input schema, transformations, external calls, retries, idempotency, logs, permissions, privacy boundary, and output validation.

## A real-world entry point: an intermediate step passing is not the deliverable passing

- **FP-10:** A formatting or validation command may remain in a Working state for a long time. “The command started” is not evidence that an output was produced or checked; use a timeout, exit status, and final artifact.
- **FP-11:** A report described source verification expanding into a persistent environment replacement. Creation, installation, publication, deployment, restart, and online verification are different side-effect levels and must not be bundled under “verification.”

These are field-study reports or analyses, not local reproductions. They require separate evidence for intermediate artifacts, final form, and permission state.

## Core concepts and decisions

### 1. Organize capabilities by deliverable

| Deliverable | Final-form checks | Typical risks |
|---|---|---|
| Document or PDF | Pagination, table of contents, links, fonts, readability, print/export | Reflow, missing fonts, citation or licensing errors |
| Website | Browser rendering, responsive behavior, interaction, empty/error states, keyboard and mobile paths | Source looks correct while the interface is unusable; requests exceed scope |
| Image or video | Dimensions, clarity, text, rights, captions or alt text, editability | Factual error, unclear license, inaccessible media |
| Presentation | Projection size, hierarchy, contrast, speaking order, notes | Overflow, low contrast, mismatch between slides and script |
| Spreadsheet or data report | Formulas, filters, units, blanks, summaries, export, recalculation | Shifted numbers, denominator drift, overwritten formulas |
| Automation | Schema, logs, retries, idempotency, permissions, rollback, output validation | Duplicate writes, data leakage, partial completion |

### 2. Start with the final form

Source files, templates, JSON, and scripts are production materials. Acceptance must ask what the reader will see, whether they can complete the intended action, whether the content is correct, whether layout is stable, whether empty and error states are understandable, and whether the output is accessible, editable, and reusable.

Render to PNG or PDF when layout matters, open a website in a browser, recalculate a spreadsheet, or run one controlled flow with a test account when those are the actual user-facing forms. A source diff cannot substitute for final-form evidence.

### 3. Automation must be reversible and repeatable

For each flow, write:

```text
Input schema and sample:
Sensitive fields and permitted use:
Transformation steps and versions:
External calls, targets, and minimum permissions:
Timeout, retry, backoff, and idempotency key:
Logs, trace ID, and error categories:
Output schema and validation:
Partial state, compensation, and rollback:
Human approval point and stop condition:
```

“The API connected” proves only connectivity. It does not prove field mapping, data completeness, duplicate behavior, permission scope, or downstream correctness. Before production writes, use test accounts, a sandbox, or a local simulation, and keep input/output hashes and a batch ID where appropriate.

### 4. Use four capability levels

1. **Local, read-only, low risk:** drafting, parsing, static checks, and offline analysis.
2. **Reversible project work:** generating files, updating a branch, or producing a render without publishing.
3. **Controlled external connection:** a test account, minimum scope, human approval, and auditable logs.
4. **Production write or public release:** explicit authorization, privacy and license review, preview, rollback, and online verification.

Moving up a level requires a written reason, new permissions, new risks, new evidence, and a recovery plan. If the task does not need a higher level, do not enable it.

## Your first ten minutes: turn a vague request into a checkable draft

Do this before choosing a new tool or connecting an account. Use a fictional brief and a disposable local file. For example: “Write a one-page update about three invented event registrations.” The point is not to make the model sound impressive. The point is to see whether a small request can be made precise enough to check.

1. Write five lines: **reader**, **final form**, **facts supplied**, **forbidden data/actions**, and **what would count as acceptable**.
2. Give the model this bounded prompt, replacing the brackets:

   ```text
   Create a [final form] for [reader] using only these supplied facts: [facts].
   Do not invent numbers, sources, names, or results. If information is missing, mark it as [missing] and ask one question.
   Return a draft only; do not send, publish, log in, or call external services.
   Acceptance checks: [three observable checks].
   ```

3. Open the draft as the reader would. Check each supplied fact, each `[missing]` marker, the heading order, and the stated acceptance checks.
4. Save the brief, prompt, output, and a three-line note: **passed**, **failed**, and **unknown**. If the result needs real data, distribution, or a new permission, stop and write that as the next decision rather than silently expanding the task.

One clean draft does not show that a prompt is universally better, that work became faster, or that a workflow is safe for production. It gives you a small, inspectable comparison point for the next revision.

## Concrete evidence table

| Evidence item | Concrete artifact | What it supports | What it does not support |
|---|---|---|---|
| Final-form review | Rendered PDF/PNG, browser capture, recalculated sheet, or controlled output | What a reader or operator actually saw | That the source file alone was sufficient |
| Content and data review | Source list, data dictionary, formula check, and validation output | Factual and structural checks performed | That an attractive output is factually correct without sources |
| Accessibility and editability review | Keyboard path, alt-text record, captions, selectable text, editable-layer check | Whether stated access and reuse requirements were tested | Universal accessibility for every device or assistive technology |
| Automation contract | Input/output schemas, versioned transforms, error rules | Expected data shape and validation boundary | That an external service accepted the intended meaning |
| Side-effect record | Permission scope, test-account identity, batch ID, trace log, draft state | What external action was authorized or prepared | That a public release occurred |
| Recovery record | Idempotency key, status query, compensation or rollback evidence | How partial completion would be detected and repaired | That a timeout means no write occurred |

## Observable small experiment: capability groups, not a tool list

### Setup

Use a **synthetic product-report context** for training: an invented product description, a small de-identified structured fixture, and an intended audience. It is not a customer report, inventory record, account, revenue source, or publication request. Prepare four progressively broader plans: A document only; B document plus data analysis; C document plus chart rendering; D document plus external distribution. Add empty data, missing columns, an extreme value, and malformed input as failure fixtures.

### Task

1. For A–D, record the final form, inputs and outputs, minimum permissions, possible side effects, and rollback method.
2. Complete A: generate and export the document, then inspect pagination, heading hierarchy, links, facts, and empty states.
3. Add B: calculate descriptive values from the synthetic fixture and record the schema, denominator, missing-value handling, formulas, and output checks.
4. Add C: render at least one chart and inspect labels, units, contrast, fonts, narrow-screen behavior, and print behavior in the final form.
5. Add D only with a test account or draft endpoint. Check preview, batch ID, idempotency key, logs, retry behavior, and human approval. Do not publish.
6. Record the new permission, verification, recovery cost, and final status each time a capability is added.

### Evidence

The evidence package should contain the A–D design table, final document/chart/rendered output or reproducible output, data dictionary and validation results, responses to invalid inputs, call logs, permission scope, idempotency and retry records, sandbox or draft state, and explicit evidence that no public release occurred. A source file or script alone is insufficient.

### Failure variant

Make a formatter or renderer produce no output until a defined timeout. Make an external call time out after a simulated write. Give the report empty data and a missing column. Correct behavior is to stop, preserve the batch or trace ID, query whether a partial write exists, avoid a non-idempotent retry, and mark the deliverable incomplete. Do not force-reinstall, restart, or publish to “fix verification.” Empty data should produce an understandable empty state, not a blank chart or an invented zero.

### Reflection

- Which plan first required external permission, and why?
- Which defect could be found only in the final rendered form?
- After a timeout, what evidence would show whether a duplicate write occurred?
- What evidence separates “connected,” “draft generated,” “published,” and “online verified”?

## Failure and boundary cases

- **Correct source, broken render:** Check wrapping, overflow, fonts, layers, links, cropping, colors, printing, and mobile behavior. A render or live browser state is required evidence.
- **Beautiful output, false facts:** Review numbers, quotations, brand claims, and text inside generated media against sources. Do not publish images, fonts, code, or templates with unclear permission.
- **Inaccessible or uneditable output:** Check document structure, alt text, keyboard path, contrast, captions, selectable text, editable layers, and export format.
- **Partial automation success:** Inspect logs, status queries, batch IDs, and downstream state. Retry only with an idempotency key or compensation flow; a timeout alone does not prove failure.
- **Excessive external scope:** Reduce the scope, use a test account and draft endpoint, and request real publication authorization separately.
- **A validation command hangs:** Following FP-10, set an output boundary and timeout; after interruption, inspect files, processes, logs, and final form again.
- **Verification changes a persistent environment:** Following FP-11, separate creation, installation, publication, deployment, restart, and online verification. Record authorization and rollback for each.

## Transfer exercise

Choose an existing document, website, spreadsheet, image, or automation:

1. Write the reader, final format, successful action, empty/error states, and accessibility requirements.
2. Perform one final-form review and keep a screenshot, export, or browser/spreadsheet artifact.
3. Complete the automation contract with schema, sensitive fields, idempotency, logs, retries, validation, and rollback.
4. Replay one failure input using a test account or local simulation and classify the result as `draft`, `candidate`, `verified`, or `production-ready`.

## Acceptance checklist

- [ ] I chose capabilities by deliverable and risk, not by tool brand.
- [ ] I defined the reader, final format, successful action, empty state, and error state.
- [ ] I checked the final rendered or running form instead of only the source or command exit.
- [ ] I checked facts, copyright or license boundaries, accessibility, readability, and editability.
- [ ] I recorded input schema, transformations, external calls, retries, idempotency, logs, and output validation.
- [ ] I used synthetic or test data and a test account or sandbox, and recorded permission, batch, and rollback evidence.
- [ ] I can explain how FP-10 and FP-11 change the handling of a hang, partial success, or persistent environment change.
- [ ] I did not describe a draft, connection, or started command as a public release or online verification.
- [ ] I can point to concrete evidence for the final form, data checks, permissions, and recovery boundary.

## Sources and maintenance boundary

- **Field reports:** [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-10 and FP-11. These records are `candidate`, were accessed and organized on 2026-08-09, and were not locally reproduced.
- **External asset and license boundary:** [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md), S01, S03, and S06. Images, code, templates, or nested assets without a clear license are reference-only and must not be copied into a release.
- **Volatile tool facts:** Follow the official documentation for the document, PDF, spreadsheet, browser, rendering, and external-service tools actually used. Record URL, access date, version, and scope in the work record.
- **Maintenance owner:** Content and automation track maintainer. Review when a renderer, format, browser, API, license, or permission model changes, and no later than 2026-11-09.

Chapter status is `candidate`. A deliverable may be called `verified` or `production-ready` only after the relevant final-form, data-quality, privacy, license, rollback, and online evidence exists. This chapter reports no production run.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="17-marketing-track-EN.md" aria-label="Previous chapter: Chapter 17 · Marketing track: from product understanding to growth experiments">← Previous<br><strong>Chapter 17 · Marketing track: from product understanding to growth experiments</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="19-evaluate-models-and-workflows-EN.md" aria-label="Next chapter: Chapter 19 · Evaluate models and workflows">Next →<br><strong>Chapter 19 · Evaluate models and workflows</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
