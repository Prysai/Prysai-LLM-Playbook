# DeepSeek API adapter: source receipt and teaching boundary

**Accessed:** 2026-08-17 (America/Los_Angeles)  
**Status:** `candidate` / `source-checked` / `not_run`  
**Owner:** platform-adapter maintainer  
**Next review:** 2026-09-17, or before this record is used for an API run,
model comparison, account advice, pricing statement, or production decision.

## Question and scope

What can the Playbook safely teach about the DeepSeek **API** without turning
current API documentation into a claim about DeepSeek's web chat, mobile app,
an account's entitlement, or another vendor's product?

This receipt covers only the public API documentation pages listed below. It is
not a runtime test: no API key, request, model call, tool execution, account
action, or billing action was performed. The pages are first-party sources for
the narrow claims in this record; they do not grant permission to transmit a
learner's data or to run code.

## First-party sources

| Source | Narrow fact supported | Boundary |
|---|---|---|
| [Your First API Call](https://api-docs.deepseek.com/) | The documentation presents a DeepSeek API surface and an API quick-start path. | It does not establish access, pricing, privacy terms, or feature availability for every account or non-API surface. |
| [`GET /models`](https://api-docs.deepseek.com/api/list-models) | The API exposes a `GET /models` operation that lists currently available models and basic fields such as model identifier and owner. | A documentation example is not a guarantee that a named model, region, quota, or account entitlement is current. Query the authorized endpoint when a real run is approved. |
| [Tool Calls](https://api-docs.deepseek.com/guides/tool_calls) | The API guide describes a response in which a model requests an external tool and the application appends a tool result before asking for the next response. | A tool-call request is not authorization or execution. The application and human owner still define the schema, permissions, execution, returned data, and verification. |
| [Thinking Mode](https://api-docs.deepseek.com/guides/thinking_mode) | The API guide documents API parameters for enabling or controlling a thinking/reasoning mode on the documented surface. | Do not treat a returned reasoning field as a complete, faithful, or safe explanation of hidden model computation. Do not infer the same controls in web chat or another vendor. |
| [Rate Limit & Isolation](https://api-docs.deepseek.com/quick_start/rate_limit) | The API guide describes account-level concurrency handling and an optional `user_id` field for application-side isolation. | Limits, model names, and account behavior are volatile. Never copy a quota into a lesson without a dated, scoped check of the official page and the authorized account. |

## What belongs in the reader route

The adapter may teach this narrow sequence:

1. Keep the transferable text-only task from the [platform adapter
   guide](../../book/routes/platform-adapter-guide-EN.md); do not start with a
   key, payment, upload, or real customer data.
2. If an API experiment is explicitly authorized, identify the exact surface,
   endpoint, account scope, model identifier, date, and data allowed to leave
   the local environment.
3. Use the official model-list operation to record what the authorized account
   actually reports. Do not hard-code a model name, context size, price,
   concurrency limit, or availability claim from an old example.
4. If a response contains a tool-call request, treat it as a proposed action.
   Validate the schema and arguments, apply a separate permission decision,
   execute only the smallest approved operation, and record the returned
   evidence. A model response alone is not evidence that an external action
   happened.
5. Record the request, response, errors, and unverified items without storing a
   secret. Stop before sending, publishing, changing an account, or using
   private data if the scope is unclear.

This is a project inference from the source boundaries and the Playbook's
general evidence contract. It is not a DeepSeek-endorsed prompt, SDK wrapper,
or safety guarantee.

## Explicit non-claims

This receipt does **not** prove:

- that DeepSeek's web chat, app, API, or any named model is available to a
  particular learner;
- a current model name, context window, price, free tier, quota, concurrency,
  retention policy, region, or default setting beyond the scoped page text;
- that OpenAI-format or Anthropic-format compatibility means behavioral,
  safety, tool, permission, privacy, or output equivalence;
- that a thinking/reasoning field is a chain of thought, a complete explanation,
  or an audit trail;
- that a tool-call request was authorized, executed, correct, reversible, or
  safe; or
- prompt effectiveness, learning gain, productivity, reliability, security,
  cross-platform success, or production readiness.

## Adapter acceptance gate

The route remains `candidate / not_run` until a separately authorized, low-risk
API run records the exact surface and model, redacted input/output, tool-free
baseline, error path, cost or quota scope where relevant, and an independent
review. A static source receipt is enough to bound wording; it is not enough to
admit a production adapter.

