<!-- content_id: chapter-17-marketing-track | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-12 -->

# Chapter 17: Marketing Track — From Product Understanding to Growth Experiments

## The problem this chapter solves

Marketing work becomes vague when the request omits the product, audience, positioning, proof, and desired action. It also becomes risky when a team collects a large event stream or produces an attractive dashboard before deciding what the data should change. A more serious failure is allowing a marketing skill to bring personal data, customer lists, organization permissions, or publishing access into an experiment that does not need them.

This chapter treats marketing as a reviewable decision system: establish a versioned product context, state a hypothesis, define the smallest useful measurement plan, and then produce content or an action while respecting privacy, sample limits, and attribution uncertainty.

## Learning objectives

By the end of this chapter, you should be able to:

1. Create a product context covering the product, audience, problem, alternatives, differentiation, objections, customer language, voice, proof, and desired action.
2. Work backward from a decision to the smallest useful events, metrics, denominators, sample, time window, naming scheme, and stopping rule.
3. Identify sampling bias, over-attribution, selective reporting, privacy risks, and uncertainty in marketing conclusions.
4. Design a growth experiment with a marketing skill without exposing personal data, bypassing platform permissions, or publishing automatically.

## A real-world entry point: identity, organization, and data need context

- **FP-03**: An enterprise-only user was reportedly probed at `github.com` even though the relevant entry point was an Enterprise host. This illustrates why a default host or default audience must not be treated as a user fact.
- **FP-04**: A connector was reportedly reused for the first of two organizations to which the same user had access. This illustrates why account access is not the same as authorization to use a particular organization’s data for a particular experiment.

These are field-study user reports, not official confirmations or local reproductions. In this chapter they train the distinction between identity, organization, installation scope, and permitted data use. They are not universal claims about connector behavior.

## Core concepts and decisions

### 1. A product context is a shared, versioned asset

A product context is more useful than a one-off prompt because it makes assumptions visible and reviewable. At minimum, record:

```text
Product and version; explicit non-goals:
Target audience and excluded audience:
Core problem and usage situation:
Alternatives and switching costs:
Differentiated claims and available proof:
Common objections and anonymized customer language:
Brand voice, prohibited expressions, and compliance boundaries:
Desired action and prerequisites for that action:
Channel, region, language, and time range:
Version, change reason, owner, and review date:
```

### Synthetic Product Context: a training fixture, not a customer record

The exercise in this chapter uses a **synthetic Product Context**. It is invented for practice. It does not describe a real company, customer, inventory position, audience size, price, conversion rate, testimonial, or campaign result.

```yaml
context_id: synthetic-product-context-v1
product: "A local planning workspace for small project teams"
audience: "People who coordinate a small project across a shared task list"
non_goals: ["No claim about market share", "No claim about customer outcomes"]
problem: "The team loses track of decisions between meetings and task updates"
alternative: "A shared document plus manual reminders"
proof: "No customer proof supplied; product claims remain hypotheses"
objections: ["Setup effort", "Data access", "Another tool to maintain"]
desired_action: "Review a local sample workspace"
data_boundary: "Synthetic records only; no names, emails, IP addresses, or external IDs"
status: candidate
```

The point of this fixture is to demonstrate context fields and evidence boundaries. It is not permission to invent proof. A claim without evidence must remain a hypothesis, be softened, or be removed.

### 2. Measure for a decision

Write the decision before choosing the data:

```text
Decision to make:
Key hypothesis:
Smallest question that must be answered:
Metric definition and event name:
Denominator, sample, time window, and segments:
Deduplication, missing data, and delay handling:
Consent, privacy, retention, and access controls:
Stopping rule and next action:
```

“Variant B has a higher click-through rate” is not reviewable until the exposure condition, denominator, deduplication rule, population, window, and next action are stated. Do not make full email addresses, complete IP addresses, chat transcripts, or cross-site identifiers the default input. Prefer aggregate, de-identified, short-retention, test data.

### 3. An agent assists judgment; it does not own attribution

An agent can organize the product context, draft variants, inspect event names, calculate descriptive statistics, and suggest the next experiment. It cannot infer causation from a copy difference, hide sample bias in a chart, or publish to an advertising platform, CRM, email system, or social channel without a separately authorized, reviewable action. External writes require a test account or sandbox, human approval, a batch identifier, and a rollback or withdrawal path.

### 4. Use capability groups instead of a tool catalogue

Group candidate skills by the decision they support:

| Capability group | Typical output | Boundary to record |
|---|---|---|
| Product context | Versioned context and claim register | Facts, hypotheses, owner, review date |
| Content and positioning | Variants tied to audience and objections | Proof, voice, prohibited claims |
| Conversion experiment | Hypothesis, exposure rule, and stopping rule | Sample, denominator, consent, window |
| Distribution and growth | Draft or sandbox batch | Channel scope, approval, rollback |
| Measurement and attribution | Aggregate report and limitations | Event schema, data quality, causal limits |

### 5. Programming learning and product experiments are one evidence loop

An LLM can help a learner move from an idea to a small prototype, but a
prototype is not a product and a polished landing page is not demand evidence.
Use the same loop for programming practice and an early product experiment:

```text
problem noticed → user and context described → smallest testable slice
→ learner or user attempts it → output and friction recorded
→ one hypothesis changed → next decision or stop
```

For programming practice, begin with a task the learner can inspect: explain a
function, change one visible state, add one focused test, or repair one known
failure. Require the learner to predict the result before asking for a full
solution, preserve the first attempt, and retest one changed input. The model
may explain, ask questions, or provide a small hint; it should not quietly
replace the evidence that the learner can make the change.

For a product experiment, write the decision before writing the pitch. A
useful one-page card names:

```text
Problem: whose repeated situation is painful, and what do they do now?
Smallest promise: one outcome the prototype could make visible.
Prototype: the minimum page, workflow, or manual service to test.
Signal: an observable action that would change the next decision.
Alternative explanation: what else could produce that signal?
Cost and boundary: time, data, permissions, rights, and who may be contacted.
Stop rule: what would make us delete, revise, or pause the experiment?
```

“People liked the demo,” “the page received clicks,” or “the model generated
the app” are observations that need a denominator, comparison, audience,
time window, and review record. They do not prove willingness to pay, product–
market fit, recurring revenue, or a learning outcome. Monetisation is a
hypothesis about a permitted exchange—such as a paid pilot, subscription,
one-time purchase, or service—not a promise of income. Before accepting money,
check the real offer, refund and support obligations, taxes, privacy, rights,
and delivery capacity with the appropriate human or professional owner.

Keep a short experiment receipt: versioned problem statement, prototype or
script, exact audience and recruitment boundary, observed actions, exclusions,
costs, objections, decision, and unknowns. If the only evidence is a generated
mockup or an unscored model response, keep the conclusion `candidate` and
choose a smaller test instead of increasing the claim.

## Concrete evidence table

| Evidence item | Concrete artifact | What it supports | What it does not support |
|---|---|---|---|
| Product context | `synthetic-product-context-v1` with change reason and owner | Which claims and audience the exercise used | That the product has real customers or results |
| Claim register | Rows labelled `fact`, `hypothesis`, `unverified`, or `not applicable` | Whether a statement has a stated evidence status | Proof of a claim labelled `unverified` |
| Measurement plan | Metric definition, denominator, window, sample rule, stopping rule | Whether the proposed measurement is reproducible | Statistical significance or causality by itself |
| Data dictionary | Aggregate fields, retention, access scope, missing-data rule | What data entered the analysis | Permission to collect additional personal data |
| Variant record | Inputs, output text, reviewer, and version | What was actually compared | That one variant caused an outcome |
| Distribution record | Sandbox or draft status, batch ID, approval, rollback path | Whether a controlled action was prepared | That anything was publicly sent |

## Observable small experiment: two requests for the same synthetic product

### Setup

Use the synthetic Product Context above. Prepare a redacted product description, three synthetic objections, no customer testimonial, no inventory, and no performance number. Create a local aggregate table containing only counts. It must not contain names, email addresses, complete IP addresses, device identifiers, or cross-platform IDs. Choose a short time window and two content variants, but do not claim that either variant has been run.

### Task

1. Give the agent request A: “Write a polished introduction for this product.” Save the output.
2. Give the agent request B with the versioned context, audience, objections, missing proof, desired action, and measurement plan. Ask for two variants, the hypothesis, primary metric, denominator, sample limitation, and next decision.
3. Compare A and B for specificity, audience fit, evidence status, and actionability. Mark every unsupported claim.
4. Ask the agent to inspect event names, deduplication, missing values, time windows, and privacy boundaries. Do not upload data or call a real channel.
5. If you use aggregate sample data, report it as a descriptive fixture only. Do not call a difference causal or announce a winner when the sample is insufficient.

### Evidence

Keep both requests, the context version, generated variants, hypothesis table, metric definitions, denominator and sample notes, the de-identified data dictionary, privacy decisions, data-quality checks, and the next-decision record. Each statement should be identifiable as a product fact, a marketing hypothesis, or an unverified claim.

### Failure variant

Provide a simulated channel whose default host is `github.com` even though the exercise authorizes only an Enterprise host. Then provide aggregate data from two organizations while authorizing only one. Check whether the agent treats the default host or existing account access as sufficient. Correct behavior is to pause, confirm host, organization, and authorization scope, and use the smallest permitted or synthetic data. Next, provide a tiny sample with a large apparent difference and check whether the agent states the sample limitation and observational nature of the result.

### Reflection

- Which fields made request B more specific than request A?
- Which metric would actually change the next decision?
- Which fields could be aggregated or deleted without losing the answer?
- How do FP-03 and FP-04 change your assumptions about host, organization, audience, and data access?

## Failure and boundary cases

- **Invented proof or customer language:** An unsupported testimonial, customer number, or “market leader” claim must become a hypothesis or be removed.
- **A small sample declared a winner:** Record sample size, denominator, window, segments, and missing data. If the evidence cannot support a stable judgment, report a directional signal or continue collection.
- **Correlation written as causation:** If title, channel, price, and audience changed together, do not attribute an outcome to one variable. Isolate a variable or describe the result as observational.
- **Mismatched platform permissions:** Make host, organization, installation scope, and experiment authorization a preflight check. A cached connector or default account is not current approval.
- **Privacy overreach:** Do not default to personal information, sensitive attributes, private conversations, non-consenting contacts, or cross-context identifiers. Use minimization, aggregation, access control, and a retention limit.
- **Publishing without recovery:** Email sends, ad changes, CRM writes, social posts, and tracking changes require a draft or sandbox check, human approval, a batch ID, and a withdrawal or rollback method.
- **A polished chart hiding weak data:** Check duplicate events, time zones, delays, bots, denominator drift, missing values, and channel selection. A chart is not evidence by itself.

## Transfer exercise

Choose a real marketing decision, but use only redacted or aggregate data:

1. Write a one-page product context and label facts, hypotheses, and claims needing proof.
2. Choose one decision that could change and design the smallest measurement plan and stopping rule.
3. For each field, record its privacy reason, access scope, retention period, and deletion method.
4. Design a sandbox experiment and a failure variant that tests host, organization, and publishing authorization.

## Acceptance checklist

- [ ] I have a versioned product context with an owner, change reason, and review date.
- [ ] I distinguish product facts, marketing hypotheses, customer evidence, and unverified claims.
- [ ] I can derive the smallest useful metric, denominator, sample, window, and stopping rule from a decision.
- [ ] I checked duplication, missing data, delay, time zone, bot traffic, and selection bias where relevant.
- [ ] I did not turn correlation into causation or declare a stable winner from a small sample.
- [ ] I used minimization and de-identification or aggregation, access control, and retention limits.
- [ ] I can explain the difference between host, organization, connector, and experiment authorization for FP-03 or FP-04.
- [ ] I did not publish or write to an external platform without approval, sandbox evidence, and a recovery path.
- [ ] I can point to a concrete evidence artifact for each material claim in the exercise.

## Sources and maintenance boundary

- **Field reports:** [`docs/research/field-problems-codex.md`](../../docs/research/field-problems-codex.md), FP-03 and FP-04. The record is `candidate`; it was accessed and organized on 2026-08-09 by the Prysai LLM Playbook maintenance group. It is not local reproduction.
- **Marketing-method reference:** [`docs/sources/asset-register.md`](../../docs/sources/asset-register.md), S04. This chapter is an original synthesis of decision and evidence practices; it does not copy external marketing skill text.
- **Volatile platform and privacy facts:** Use the applicable platform’s official developer and privacy documentation, organization policy, and current configuration. Record the URL, access date, region, data owner, and retention policy in the experiment record.
- **Maintenance owner:** Marketing-track maintainer. Review when positioning, channels, permissions, privacy policy, event schema, or attribution method changes, and no later than 2026-11-09.

Chapter status is `candidate`. A marketing conclusion may be called `verified` only when the relevant data-quality, privacy, and human-review evidence exists. Nothing in this chapter supplies a customer, inventory, conversion-rate, or campaign result.

<!-- chapter-navigation:start -->
<hr>
<nav class="chapter-navigation" aria-label="Chapter navigation">
  <table role="presentation" width="100%">
    <tr>
      <td align="left"><a data-chapter-nav="previous" href="16-engineering-track-EN.md" aria-label="Previous chapter: Chapter 16 · Engineering track: from idea to reliable software">← Previous<br><strong>Chapter 16 · Engineering track: from idea to reliable software</strong></a></td>
      <td align="right"><a data-chapter-nav="next" href="18-content-design-data-automation-EN.md" aria-label="Next chapter: Chapter 18 · Content, design, data, and automation track">Next →<br><strong>Chapter 18 · Content, design, data, and automation track</strong></a></td>
    </tr>
  </table>
</nav>
<!-- chapter-navigation:end -->
