<!-- content_id: llm-fundamentals-guide | locale: EN | language: en | default_locale: EN | translation_status: source | source_revision: worktree-2026-08-16 -->

# Chapter 0: What Is a Large Language Model?

**Reading time:** about 20 minutes. Start with the one-sentence model, then test its limits in a five-minute chat exercise.

This is the first lesson of the Playbook. If you are not sure what a "large
language model" (LLM) actually is — beyond the marketing — start here. We will
build one mental model, layer by layer, the way a professor would introduce a
new subject: first the essence, then the machinery, then the honest
boundaries. Everything in this lesson is a plain-language retelling of
public sources listed at the end; it is not a copy of any single document.

## 0.1 One sentence, then one picture

**A modern text LLM is a model trained to estimate and generate sequences of
tokens; many autoregressive LLMs do this by predicting a next token from a
context, then additional training and product layers shape how they respond.**

That is a useful working model, not a complete definition of every language,
multimodal, or deployed system that may be called an LLM.

The picture that makes this concrete: imagine the autocomplete on your phone,
but trained on a much broader and more varied collection of data and scaled up
enormously. The autocomplete suggests one word; an LLM can continue a
paragraph, answer a question, translate, outline, debug code, or hold a
conversation. For text generation, many of these behaviors can be produced by
repeatedly estimating what token should follow the available context, although
the training objective alone does not explain all of the behavior of a modern
product.

That single idea explains more than you might expect:

- why an LLM can write fluently across many domains (training exposes it to
  varied patterns, but fluency is not proof of expertise, coverage, or truth);
- why it sometimes invents facts (a base model predicts plausible text rather
  than independently looking facts up);
- why a chat product may handle more than the base model (it can add search,
  files, memory, retrieval, or tools — each with its own data and permission
  boundary);
- why behavior changes between versions or products (providers may change
  weights, post-training, system instructions, safety controls, retrieval,
  tools, routing, or the interface — not only the training text).

The most intuitive modern explanation of the machinery is Grant Sanderson's
(3Blue1Brown) animated series on GPT and attention; it is linked in the
sources. If you watch one thing, watch that.

## 0.2 Where LLMs came from: a thirty-year shortcut

A language model is not a new idea. The lineage:

- **1950s–1980s — rules and statistics.** Early systems used hand-written
  grammar rules or simple word-frequency statistics ("if the word `bank`
  follows `river`, it probably means the riverbank").
- **1990s–2010s — statistical language models.** Researchers built models that
  assign a probability to the next word given the previous few words. These
  powered early phone keyboards and machine translation. The weakness: they
  could only see a short window of context.
- **2017 — the Transformer.** A research paper called *Attention Is All You
  Need* introduced an architecture in which tokens can attend to other tokens
  in the available context. It made long-range relationships easier to model
  and scale, but did not remove context limits: practical models still have a
  finite context window.
- **2018–2022 — large Transformer language models.** Companies pre-trained
  Transformer models on large corpora, often with a next-token objective (a
  token is roughly a word fragment). New capabilities reflected an interaction
  among architecture, data quality and coverage, optimization, scale, and
  later training; scale and the objective alone are not a complete explanation.
- **2022–today — instruction tuning and alignment.** A raw pretrained model
  may continue text well, while request following depends on additional
  instruction, preference, and safety training. Providers may also add system
  prompts, policy layers, retrieval, or tools. This is why "a model that can
  complete a sentence" and "a product that follows a request" are different
  things.

The technical heart — attention — is explained visually by 3Blue1Brown's
*Transformer attention* lesson and in the original Transformer paper listed in
the sources. We do not need the math to use LLMs well, but it helps to remember
that next-token prediction is one important training objective, not a complete
explanation of every model or product. Architecture, data, optimization,
post-training, and the serving system all affect what users observe.

## 0.3 How a modern LLM is built: train, align, serve

Think of three stages:

1. **Pre-training.** The model is optimized on a large corpus to predict the
   next token and learn statistical regularities. Many associations used during
   generation are acquired here, but the result is not a database of verified
   facts. Data quality, coverage, filtering, optimization, and later training
   all matter; a model's blind spots cannot be inferred from a single date.
2. **Alignment / instruction tuning.** The model is further trained to follow
   requests, refuse harmful ones, and match human preferences. This is why two
   models with similar pre-training can feel very different in conversation.
3. **Serving and safety layers.** When you type into a chat window, your text
   is tokenized, passed through the model, and the provider may add filters,
   system prompts, retrieval, or tool access around it. What you experience is
   the model plus those layers.

Three practical consequences:

- **A provider may document a cutoff for a particular model or surface.** The
  meaning and scope of that date vary by provider and version. A product may
  later update the model or add retrieval, search, files, memory, or tools. If
  current evidence is not supplied, treat a time-sensitive claim as
  unestablished; check the product's current documentation, the source it used,
  and the date rather than relying on the cutoff alone.
- **Token accounting varies by product.** Many APIs meter input and output
  tokens for limits or billing, but pricing, caching, hidden instructions, and
  what counts can differ. Long context is useful and may not be free.
- **The same model can behave differently** depending on system prompts,
  settings (including decoding controls such as temperature), and surrounding
  tools. A change in behavior is not automatically a change in the model.

## 0.4 Four concepts you will meet everywhere

**Token.** A unit produced by a particular tokenizer and consumed or generated
by the model. A token is often a word fragment, not a whole word: "ChatGPT"
may be two or three tokens depending on the tokenizer. Prices, context limits,
and speed are often expressed in tokens, but the accounting is provider- and
surface-specific. The rule of thumb that 100 tokens is about 75 English words
is only a rough estimate for some English prose; other languages and formats
can differ substantially.

**Context window.** A model- and interface-specific token budget for the
information made available during a request — for example, instructions,
conversation, pasted documents, retrieved passages, and tool results. It is a
measure of working context, not intelligence, and remains a **finite context
window** even when it is large. Being in context does not make a passage true
or guarantee that the model will use it correctly.

**Temperature (and sampling).** A decoding control whose exact behavior is
provider-specific. Lower settings often make repeated outputs more predictable
and higher settings can increase variety, but temperature is not a factuality
switch: a low-temperature answer can still be wrong. For facts and code, make
the task checkable and verify the result; use higher variation when
brainstorming benefits from it.

**Parameters and scale.** "Billions of parameters" describes the size of the
model. Size correlates with capability but does not guarantee quality on your
task; a smaller model can beat a larger one on a narrow, well-defined job.
Judge models by results on your own tasks, not by the parameter count.

## 0.5 What LLMs are genuinely good at

Common useful patterns — not guarantees — include:

- **Rewriting and summarizing** text you supply, with a specified tone,
  length, or audience;
- **Explaining and tutoring**: breaking a concept into steps, giving examples,
  answering follow-ups in different words;
- **Drafting**: outlines, emails, plans, code skeletons, and first versions
  that you then edit;
- **Translating and language practice** between major languages at a useful
  quality level;
- **Structuring information**: turning notes into tables, lists, or
  summaries; extracting fields from text;
- **Generating code and debugging with you**: writing small functions,
  explaining errors, and reviewing snippets — always against your tests;
- **Planning and comparing**: enumerating options and criteria, as long as
  you supply the facts and do the decision.

The common thread: LLMs are strongest when the task is **text in, text out,
with a clear target you can check**. They are weakest when the task secretly
depends on facts, math precision, or actions in the real world.

## 0.6 What LLMs cannot do (the honest list)

These are boundaries of a text-generation model. A connected product can add
capabilities, but it does not remove the need to inspect sources, permissions,
and results. A model:

- **does not independently look facts up.** A base model generates text that
  is *consistent with* learned patterns; it does not thereby establish that a
  claim is true. A product may add search, retrieval, files, memory, or tools;
  those are separate surfaces, with separate data and permission boundaries.
  Returned material can still be stale, incomplete, or wrong, so check the
  original source and date.
- **does not automatically know the present or your private data.** A provider
  may document a cutoff for a model, but the response also depends on what you,
  a connected product, account memory, retrieval system, file, or tool provide.
  Before pasting, uploading, or enabling a connection, check what may leave the
  current surface and who authorized it.
- **may produce arithmetic errors.** Large models can solve some word problems
  by pattern, but exact or long calculations need a calculator, code, or a
  tool.
- **cannot independently verify a claim.** Text generation cannot establish
  that a citation is real, a website exists, or a statement is true. Search or
  another tool can provide evidence, but you still need to inspect the source,
  date, scope, and result.
- **cannot act on the world without an authorized tool or interface.** A chat
  model has no files, accounts, or permissions by itself. A login, button,
  tool-call proposal, or agent summary does not prove that an action happened.
- **has no inherent personal memory.** A base model does not remember you as a
  person between requests. A product may retain chat history or account
  memory; its privacy, retention, and deletion behavior depend on that product
  and its settings. Read the applicable policy rather than assuming that a
  chat is private or remembered.
- **is not, by itself, a search engine, calculator, database, or person.** A
  product can connect those capabilities, but a connection does not make every
  answer current, correct, authorized, or private.

A useful mental model: **a base LLM is a brilliant, well-read intern who can
draft but may confidently fill in gaps. A chat product may also hand that
intern search results, files, a calculator, memory, or tools.** You would
still decide what they may read or send, inspect the source and result, and
not publish a legal opinion unchecked. That is exactly how to use an LLM.

## 0.7 How this changes how you use one

The Playbook's method follows directly from Sections 0.5 and 0.6:

1. **Define the task in text** — what result, with which input, and which
   constraints (Chapter 3 teaches the full contract).
2. **Supply the context** — paste the material, name the audience, state the
   limits, and identify which sources or tools are allowed. A response depends
   on the context assembled by the interface: system or developer
   instructions, conversation history, user material, retrieval results, and
   tool outputs where available. These inputs can be incomplete or wrong, and
   the model may not use every item correctly.
3. **Ask for a checkable shape** — a table, a diff, a list, a rewritten
   paragraph; something you can inspect.
4. **Verify yourself** — check facts against sources, run tests on code, read
   the diff before you accept it.
5. **Keep the boundary** — do not let a plausible answer become an action, a
   payment, a publication, or a belief without evidence.

### A five-minute boundary check

Before you continue, use any text chat with this fictional claim. Do not turn
on search, upload a file, or give it private information.

```text
I received this claim: "The city library will close at 6 p.m. today."
Before you answer, I will label what a text-only model can and cannot establish.

Ask me for my labels first. Then point out only one boundary I missed:
generation, current facts, source checking, or an action in the real world.
Do not look anything up and do not invent a source.
```

Save your first labels and the one correction. The point is not to learn a
magic prompt or prove that a model is accurate. It is to observe the difference
between producing a plausible sentence and checking a present-world claim.

Then continue to
[Chapter 1: Understand GPT before you trust Codex](../chapters/01-gpt-and-codex-EN.md).

## 0.8 Sources and boundary

This lesson is an original plain-language retelling. The underlying public
sources (checked 2026-08-16) are:

- **Microsoft Learn — LLM Fundamentals** (agent framework journey):
  https://learn.microsoft.com/en-gb/agent-framework/journey/llm-fundamentals —
  describes what LLMs are, tokens, context, and what LLMs struggle with.
- **3Blue1Brown — How large language models work** (animated series):
  https://www.3blue1brown.com/lessons/attention — the clearest visual
  explanation of token prediction and attention.
- **Claude Platform Docs — Glossary**:
  https://platform.claude.com/docs/en/about-claude/glossary — official
  definitions of model, context window, token, and related terms.
- **Educative — Limitations of large language models**:
  https://www.educative.io/blog/limitations-of-llms — a readable summary of
  hallucination, staleness, and math limits.
- **NIST AI 600-1 — Artificial Intelligence Risk Management Framework:
  Generative Artificial Intelligence Profile**:
  https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf — a public risk
  management reference for confabulation, information integrity, and human
  oversight.
- **Attention Is All You Need** (Vaswani et al., 2017): the original
  Transformer paper:
  https://arxiv.org/abs/1706.03762.

Access dates, model versions, and product facts change; treat anything
product-specific in this lesson as `stale after 2026-11-09` until refreshed
against official sources. The lesson does not claim that any model, provider,
or benchmark result is best, fastest, or safest. This is a candidate lesson:
its sources and structure have been checked, but learner outcomes have not yet
been measured.
