<!-- content_id: llm-fundamentals-guide | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-17-foundation-observations -->

# What an LLM is: the layers behind a useful answer

**Unit:** `core-llm-boundaries`  
**Status:** `candidate`. **Run status:** `not_run`.  
**Time:** about 25 minutes. **Prerequisite:** none. You do not need Codex,
Git, a paid account, or a tool.

This is the foundation for the rest of the Playbook. Before you choose a
platform, connect a file, install a Skill, or ask an Agent to act, you need a
small model of what is happening. The goal is not to memorise a list of
acronyms. It is to know which layer made a claim, which layer can take an
action, and what evidence would be needed before you trust the result.

Use four questions whenever a new AI feature is advertised:

1. **What is the model being asked to generate?**
2. **What context was actually supplied for this request?**
3. **What product or tool, if any, can observe or change something outside the
   model?**
4. **What receipt would let another person check the claim?**

If you cannot answer one of these, keep the result as a draft or hypothesis.
Do not fill the gap with a confident-sounding explanation.

## The result you should keep

By the end, write an explanation card in your own words and make two boundary
decisions. A useful card lets another person see:

- how a text LLM generates from the context supplied to one request;
- what **LLM**, **token**, **context**, **prompt**, **tool**, **MCP**, **Agent**,
  and **Skill** mean at the minimum needed for a safe first task;
- why fluent text is not, by itself, evidence of a true claim; and
- which parts belong to a model, a chat product, or an external tool.

This is a bounded explanation task, not a test of everything an AI product can
do. The detailed platform procedures come later.

## 0.1 One working sentence

A modern text LLM is a model trained to estimate and generate sequences of
tokens. Many autoregressive models generate by predicting a next token from the
available context, one step at a time. Additional training and product layers
shape how a deployed system responds.

That sentence is a useful working model, not a complete definition of every
language, multimodal, or deployed system called an LLM. It explains why a
system can continue text, translate, summarise, extract fields, or draft
without implying that every output is true or that every product has the same
capabilities.

The word **predict** matters. It describes how a generation is produced; it
does not say that the model has checked the world, understood a person, or
decided that an action is authorised. A response can be helpful and still need
inspection.

## 0.2 The stack: eight terms, kept in their lanes

The following map is deliberately short. It is a set of working definitions,
not a claim that every vendor uses the words in exactly the same way.

| Term | Minimum useful meaning | Do not infer |
|---|---|---|
| **LLM / model** | Learned parameters generate a response from an input context. A base model generates text; deployed products can add other layers. | A verified database, a person, or an actor with permission. |
| **Token / tokenizer** | A tokenizer maps text to model-specific token IDs and back. A token is often a word fragment, not a word or a fixed number of characters. | A universal token-to-word or token-to-character ratio. Counts, limits, cost, and speed depend on the tokenizer and product. |
| **Context** | The information made available for one request: instructions, conversation text, supplied material, retrieved passages, and tool results where present. A product may add **search, retrieval, files, memory, or tools** around the model. | That everything in the context is true, relevant, or used correctly. |
| **Context window** | The **finite context window** is the amount of tokenised input and output a particular model or product can handle in one interaction. | A stable number across models, accounts, or product surfaces. A larger window does not remove the need to select and check sources. |
| **Prompt** | The request and material you give the system, including a goal, constraints, and the shape of the answer you want. | A magic spell. A longer prompt is not automatically a better prompt. |
| **User prompt / system or developer instruction** | The user prompt states the immediate task. A host may also apply higher-priority system or developer instructions that shape the product's behaviour; they may not be visible or editable by the user. | That a user can override the host's rules, or that two products expose the same instruction layers. |
| **Tool / retrieval** | A host can make a calculator, search service, file reader, database, or other external capability available. The model may propose a call; the host or tool must execute it and return a result. | That a proposed call, a button, or a summary proves the external action happened or that its result is correct. |
| **MCP** | Model Context Protocol is a protocol for connecting a compatible host to tools or context providers. It can standardise parts of the connection, while authentication, approval, available tools, and data boundaries remain separate decisions. | Universal compatibility, trust, or unrestricted access. A configured MCP server is not automatically safe or approved. |
| **Agent / Skill** | An Agent is an observable multi-step loop around a model, context, tools, feedback, and stop conditions. A Skill is a reusable procedure or instruction package that a host may load for a task. | Hidden reasoning, human-like intent, permission from a Skill, or evidence that a loop completed successfully. |

Two distinctions are worth carrying forward:

1. **Capability, authority, and evidence are different.** A system may be able
   to propose an action, be authorised to attempt it, or actually complete it;
   those are three different observations.
2. **A layer can add capability without repairing the layer below it.** Search
   can return a stale page, a file tool can read the wrong file, an Agent can
   stop early, and a Skill can contain an unsuitable rule. The new layer needs
   its own check.

### The terms people most often collapse

**Context is not permanent memory.** Context is what the host makes available
for one request. A product may store conversation history, preferences, files,
or embeddings and select some of them later; that product feature is a separate
data store and retrieval decision. A remembered item can be stale, incomplete,
or outside the current request. Ask what was supplied this time.

**Retrieval is an evidence path, not a truth guarantee.** A search or RAG
component chooses passages to add to the context. It can miss the best source,
select a copy, or return an old version. Keep the source URL, date, and the
claim-to-source match. A larger context window gives more capacity; it does
not make every included passage relevant or correct.

**A prompt is a contract, not a spell.** A useful first request names the
outcome, starting material, constraints, response shape, check, and stop line.
System or developer instructions may have higher priority than a user prompt,
and a quoted document can contain untrusted instructions. Treat supplied text
as data unless the task explicitly makes it an instruction.

**A tool call has two different authors.** The model can propose a structured
call. The host decides whether the call is allowed and the tool performs it.
Record the target, authority, intended effect, returned result, and read-back
or other evidence. A tool name in a response is not a receipt.

**MCP narrows an integration problem; it does not remove governance.** Model
Context Protocol can standardise parts of how a compatible host discovers and
uses context or tools. Authentication, server implementation, user approval,
network scope, data egress, and result checking remain separate. “Supports
MCP” never means “every MCP server is compatible or safe”.

**An Agent is a loop you can inspect, not a new kind of person.** For teaching,
describe the visible states: intake, plan, proposed action, approval or denial,
tool result, verification, retry, handoff, and stop. Do not claim to know a
hidden chain of thought. A loop that ends with prose has not necessarily
completed the external task.

**A Skill is a method package, not a capability grant.** A good Skill says when
it applies, what inputs it needs, what it must not do, how it stops, and what
evidence it returns. Progressive loading can keep a large method out of the
context until its trigger matches, but loading instructions does not grant a
file, terminal, browser, account, or publication permission.

## 0.3 What happens during one request

For a plain text exchange, a useful observable model is:

```text
your request + supplied material
          ↓
host assembles instructions and context
          ↓
model generates token sequence
          ↓
host may display text or propose a tool call
          ↓
tool runs only if the host and authority allow it
          ↓
returned text, tool result, and limits are checked by a person
```

The diagram is intentionally modest. It does not describe hidden chain of
thought, a vendor's internal routing, or every multimodal pipeline. It does
show where a common mistake happens: the model's words can describe a tool
call without the tool having run. Look for a tool event, returned data, file
diff, command output, or another appropriate receipt before calling an action
complete.

For a multi-step Agent, repeat the same check at every boundary:

```text
state observed → next action proposed → authority checked → action runs
→ result read back → acceptance checked → continue, hand off, or stop
```

If the state is unknown after a timeout or interruption, do not blindly repeat
an action that could send, publish, delete, pay, or change an account. Read the
target first or hand the uncertainty to a person.

![Six-field prompt contract: result, context, allowed help, limits, check, and stop](../../assets/teaching/prompt-contract-six-fields-red-black.svg)

![Observable action boundary: proposal, authority, execution, and human read-back](../../assets/teaching/observable-action-boundary-red-black.svg)

## 0.4 A little history, without turning history into a guarantee

The 2017 paper *Attention Is All You Need* introduced the Transformer
architecture that influenced much later language-model work. Attention made it
practical to relate tokens across a supplied sequence, but it did not make
context unlimited. Modern products also add data choices, optimisation,
instruction tuning, safety controls, routing, retrieval, tools, and interface
code. No single historical label explains the behaviour of every current
service.

## 0.5 What LLMs cannot establish by themselves

A text model can often help with a clear text-in/text-out target: rewrite
supplied text, explain a concept another way, draft an outline, extract fields,
or propose code that you can test. These are useful patterns, not guarantees.

Without an appropriate source or tool, it cannot by itself establish that a
citation is real, a website still exists, a current claim is true, or a
proposed action happened. A product may add search or retrieval, but returned
material can be stale, incomplete, or wrong. Before accepting a current claim,
**check the original source and date**.

The data boundary matters too. Before pasting, uploading, or enabling a
connection, check **what may leave the current surface and who authorized it**.
Do not turn a plausible draft into a payment, publication, deletion, account
change, or belief without an explicit action boundary and evidence.

Training shapes the model's parameters before use; the current request supplies
a new context. A training cutoff is not a live source, and a current answer
needs a source check **rather than relying on the cutoff alone**. Product
memory, retrieval, or search can add an evidence path, but each path has its own
freshness and permission boundary.

## 0.6 A five-minute boundary check

This is a text-only observation. Use a chat surface if you have one, but do not
enable search, upload a file, or provide private information.

First, complete this sentence without asking a model:

> The club meets Tuesday at 18:00, and the room number is ...

Write down two possible continuations and mark which one is supported by the
sentence. The correct answer is that neither room number is supplied. Your
brain can make a plausible completion too; plausibility and evidence are
different things.

Now send only this fictional notice and request:

```text
Notice: "The club meets Tuesday at 18:00. Bring a notebook. The room number
will be confirmed later."

Task: rewrite the notice for a new member in two sentences. Keep every stated
fact. Put missing details in [brackets]. Then list the facts you preserved.
Check: compare each statement with the notice. Do not add a room number, fee,
contact, promise, or new time.
Stop: do not browse, send, publish, or assume an unknown detail.
```

Keep the first request and first response. Mark each output statement:

| Check | What to look for |
|---|---|
| Source match | Can you point to the notice for every stated fact? |
| Shape | Did the response use two sentences and list preserved facts? |
| Unknown | Did it keep the room number as `[unknown]` rather than inventing one? |

If the response adds a room number, mark `FAIL` for that claim. Do not infer
that one response proves a model is always unreliable; this fixture shows only
one visible failure on one task.

For a second boundary check, write down what a text-only model can establish
about this sentence before you look anything up: **"The city library will
close at 6 p.m. today."** A model can discuss the wording, but the sentence's
current truth needs a source check. Do not ask it to invent a source.

### Three bounded observations

The checks above are small demonstrations, not evidence that a learner or a
model will behave the same way on every task. To practise the same boundaries
without using an account, private data, a tool, or a network request, use these
fictional-record protocols:

- [Context change and unknowns](../../evals/candidates/core-course-v1/observations/context-change-and-unknowns.md) — compare two supplied versions, label each claim `PASS`, `FAIL`, or `UNSURE`, and keep the room number unknown.
- [First-request contract and controlled repeat](../../evals/candidates/core-course-v1/observations/first-request-contract.md) — write the goal, material, constraints, response shape, and stop condition before an answer; when a text surface is available, repeat the same request twice and record shared and different observations.
- [Tool boundary, authority, and evidence](../../evals/candidates/core-course-v1/observations/tool-boundary-authority-evidence.md) — separate a proposed action, granted authority, tool execution, and read-back evidence.

Each protocol asks for the first artifact before a cue, records help and
unknowns, and defines a stop rule. Its status is `candidate / not_run`: a
future run can describe only the named task, conditions, and rubric. It cannot
establish course effectiveness, prompt superiority, model quality, retention,
general transfer, platform equivalence, or production readiness.

### A portable first-turn pattern

When you are ready to try a real, low-risk task, fill these six lines before
you ask for an answer. The labels work in any chat model; the product may add
other instructions that you cannot see.

```text
Outcome: [one observable result]
Starting context: [facts or text I am supplying]
Allowed help: [what the model may do]
Constraints: [what must stay true or must not happen]
Response and check: [the shape I will inspect and how I will inspect it]
Stop: [missing input, authority, source, or evidence that makes us pause]
```

For a first attempt, keep the context fictional or non-sensitive. Ask for a
draft or classification before asking the system to use a tool. Preserve the
first request and response; otherwise you cannot tell whether a later rewrite
fixed the original problem or merely hid it. The next unit turns this pattern
into a complete task card and a retained receipt: [Context, instruction, and a
first generation](../routes/llm-core-first-generation-EN.md).

## 0.7 The only completion check for this unit

Write a short explanation card without copying this page:

```text
My explanation:

LLM boundary:
Token or context boundary:
Prompt / product / tool boundary:
Context / memory boundary:
Tool / MCP / Agent / Skill boundary:
One reason a fluent answer can still be wrong:

Decision 1 (supported / not supported):
Evidence:
Decision 2 (model / product / tool):
Evidence:
```

Score your card against the unit rubric:

- `0` — it treats fluent text as proof, assigns agency to the model, or has no
  evidence for either decision;
- `1` — it mentions context-based generation but leaves a material boundary or
  verification reason unclear; and
- `2` — it uses your own words, separates model from product or tool, and names
  one reason to verify on this task.

Keep the card, the first response, and one sentence about what remains
unknown. Do not report a course completion or learning result from this
self-check. The route's next operation is [Context, instruction, and a first
generation](../routes/llm-core-first-generation-EN.md). The later Codex path
begins only after the foundation route, at [Chapter 1](../chapters/01-gpt-and-codex-EN.md).

## Sources and boundary

This lesson is an original, concise teaching rewrite. The following sources
are reference-only inputs; no source prose, prompt, diagram, or model output is
copied. Access date for this revision: 2026-08-17.

- Microsoft Learn, [LLM fundamentals](https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals) — plain-language concepts and limitations; product-scoped guidance.
- Anthropic, [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) — token and context terminology; product-scoped and volatile.
- Model Context Protocol, [Specification](https://modelcontextprotocol.io/specification/2025-06-18) — protocol scope; it does not prove a particular host or server is configured.
- OpenAI, [Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) — one vendor's current prompting guidance; not a cross-platform guarantee.
- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — historical Transformer paper.
- NIST, [AI 600-1 Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — risk and information-integrity context, not a product test.
- 3Blue1Brown, [Attention in transformers](https://www.3blue1brown.com/lessons/attention) — independent visual explanation; not an authority for product behavior.

Time-sensitive product facts need an owner, URL, access date, scope, and next
review in the relevant source record. This page does not claim a best model,
universal product behaviour, learner improvement, retention, transfer, or
production readiness.
