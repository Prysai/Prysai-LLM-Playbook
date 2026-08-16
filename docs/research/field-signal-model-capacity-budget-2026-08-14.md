# Field signal: model capacity and task-budget boundaries — 2026-08-14

**Status:** candidate research record. This is a source-bounded field signal,
not a reproduction, incident analysis, product test, reliability finding,
support recommendation, or platform comparison.

**Access date:** 2026-08-14 (America/Los_Angeles)

**Question:** What may a learning product safely infer from one public Codex
capacity report, and from OpenAI's published API rate-limit boundary?

## Scope and method

This record reviewed the canonical public GitHub issue URL below and a
first-party OpenAI API guide that names a public, documented rate-limit
boundary. The issue was treated as author-supplied report data. Its narrative,
logs, proposed explanations, follow-up suggestions, and account or machine
details are deliberately not reproduced here.

No local Codex task was run. No model, subscription, account, retry, fallback,
queue, context window, capacity condition, or task was tested. The record does
not consult or infer non-public service telemetry.

## Source record

| ID | Class | Title | Owner | URL | Accessed | Precise use |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | public user report | GitHub issue #33865; issue title intentionally not transcribed | issue author on the public `openai/codex` repository | https://github.com/openai/codex/issues/33865 | 2026-08-14 | One dated public report about an unavailable selected model. Repository labels include `bug`, `rate-limits`, and `CLI`; labels are repository metadata, not a diagnosis. |
| O1 | official product documentation | Rate limits | OpenAI | https://platform.openai.com/docs/guides/rate-limits | 2026-08-14 | OpenAI's API guide describes rate limits as an API boundary, says limits are measured over time windows, and documents rate-limit response headers. The guide is API documentation, not a Codex incident report. |

## Facts, reports, and volatile facts

### Reported, not verified fact

F1 records that one public issue author reported a capacity-related inability to
use a selected model in a stated context. The issue remained open when this
record was accessed. This is an individual report, not an official service
status statement.

### Official fact within its stated scope

O1 documents that OpenAI API access is subject to rate limits and that the API
exposes rate-limit information through documented response headers. That is a
stable public **boundary class**: available capacity or request budget is not
unbounded. It is not an assertion about a particular Codex surface, plan,
model, account, request, time, or long-running task.

### Volatile facts

The issue state, labels, comments, product availability, model catalogue,
limits, tiers, windows, headers, and documentation wording can change. Recheck
both URLs before using them for a reader-facing product-specific statement.

| Volatile item | Owner | Next review |
| --- | --- | --- |
| F1 issue state and metadata | public issue author / OpenAI repository maintainers | before citing the report again, or 2026-09-14 |
| O1 API rate-limit details | OpenAI | before teaching a specific API limit, or 2026-09-14 |

## What the sources cannot establish

Neither source establishes:

- current Codex behavior or the behavior of any named model, plan, account, or
  client;
- prevalence, severity, duration, cause, root cause, capacity allocation,
  context-window exhaustion, a defect, a fix, or a workaround;
- local reproduction, a successful or unsuccessful retry, or a safe fallback;
- that an API rate limit explains a Codex capacity report;
- a numeric context limit, long-task limit, usage budget, or service-level
  guarantee for any learner;
- platform equivalence with ChatGPT, Claude Code, Grok, another OpenAI surface,
  or any other provider.

The public issue must not be promoted into evidence that a general user need is
common or that a particular recovery design works.

## Conservative teaching implication

Treat capacity, context, and task-budget interruptions as a **possible boundary
case to design for**, not as a predicted failure. A candidate lesson may ask a
learner to preserve the current goal, completed artifact, acceptance checks,
and next smallest reversible step before starting any long task. If a surface
becomes unavailable, the lesson should say to stop, keep that receipt, and use
the surface's current official status or help path. It must not prescribe a
retry cadence, model switch, quota tactic, queue behavior, or claim that the
work will resume correctly.

This implication is a project inference. It does not claim that this procedure
prevents loss, preserves context, resolves capacity, or applies beyond the
specific learner's chosen surface.

## License and quotation boundary

No issue narrative, comments, logs, command output, workaround, personal data,
or user-authored text was copied into this repository. The issue is cited only
by canonical URL and minimal metadata needed to identify its evidence class.
The OpenAI guide is cited as a link and summarized at high level; no extended
quotation, API content, or code was reproduced.

This record makes no license determination for either source. Before reusing
any source text, code, screenshots, or other assets, consult the applicable
source terms and record a separate source-and-license decision.

## Stop receipt

Research stopped after one directly named public issue and one directly
relevant first-party OpenAI boundary guide. That is sufficient for the narrow
teaching implication above. It is insufficient for operational guidance,
provider comparison, reliability scoring, or a claim about current service
behavior.
