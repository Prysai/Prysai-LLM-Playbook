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

**An LLM is a machine that predicts the next piece of text, trained on an
enormous amount of human writing, and then tuned to follow instructions.**

The picture that makes this concrete: imagine the autocomplete on your phone,
but trained on a library of millions of books, articles, code repositories,
and conversations, and scaled up enormously. The autocomplete suggests one
word; an LLM can continue a paragraph, answer a question, translate, outline,
debug code, or hold a conversation — because all of those tasks can be
rephrased as "given the text so far, what comes next?"

That single idea explains more than you might expect:

- why an LLM can write fluently about almost anything (it has seen enormous
  amounts of text);
- why it sometimes invents facts (a base model predicts plausible text rather
  than independently looking facts up);
- why a chat product may handle more than the base model (it can add search,
  files, memory, retrieval, or tools — each with its own data and permission
  boundary);
- why it changes as models are updated (the training text changes).

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
- **2018–2022 — scale and the "next-token" trick.** Companies trained
  Transformer models on enormous corpora with one objective: predict the next
  token (a token is roughly a word fragment). With enough data and compute,
  models began to answer questions, write code, and follow instructions
  without being explicitly programmed for each task.
- **2022–today — instruction tuning and alignment.** Raw next-token models are
  good at continuing text but not at following requests. Providers then train
  models to follow instructions (instruction tuning) and to prefer helpful,
  harmless answers (alignment, often via human or AI feedback). This is the
  difference between "a model that can complete a sentence" and "a chatbot
  that does what you ask."

The technical heart — attention — is explained visually by 3Blue1Brown's
*Transformer attention* lesson and in plain text by the official model
documentation of OpenAI, Anthropic, and Google. We do not need the math to use
LLMs well, but knowing that the core is "predict the next token, then align
the behavior" explains most of what follows.

## 0.3 How a modern LLM is built: train, align, serve

Think of three stages:

1. **Pre-training.** The model reads a huge corpus and learns to predict the
   next token. This is where most of the "knowledge" (as statistical patterns)
   is stored. It is also where the model's blind spots are set: if the corpus
   ends in 2025, the model does not know 2026 events.
2. **Alignment / instruction tuning.** The model is further trained to follow
   requests, refuse harmful ones, and match human preferences. This is why two
   models with similar pre-training can feel very different in conversation.
3. **Serving and safety layers.** When you type into a chat window, your text
   is tokenized, passed through the model, and the provider may add filters,
   system prompts, retrieval, or tool access around it. What you experience is
   the model plus those layers.

Three practical consequences:

- **A particular model version has a training cutoff.** A product may later
  update that version or add retrieval, search, files, memory, or tools. For a
  time-sensitive answer, check the product's current documentation, the source
  it used, and the date rather than relying on the cutoff alone.
- **Every request costs tokens.** Both the input you provide and the output
  generated count. Long context is useful but not free.
- **The same model can behave differently** depending on system prompts,
  settings (temperature), and surrounding tools. A change in behavior is not
  automatically a change in the model.

## 0.4 Four concepts you will meet everywhere

**Token.** The unit the model reads and writes. A token is often a word
fragment, not a whole word: "ChatGPT" may be two or three tokens. Prices,
context limits, and speed are measured in tokens. Roughly, 100 tokens ≈ 75
English words.

**Context window.** The maximum amount of text the model can consider at once
— your instructions plus any conversation or document you paste. It is a
measure of working memory, not intelligence. A larger window lets you paste
longer documents, but the model still treats the whole window as "things to
attend to," not as verified facts.

**Temperature (and sampling).** A setting that controls how random the
output is. Low temperature → more predictable, repetitive; high temperature →
more varied, sometimes more creative. For facts and code, prefer low; for
brainstorming, higher can help.

**Parameters and scale.** "Billions of parameters" describes the size of the
model. Size correlates with capability but does not guarantee quality on your
task; a smaller model can beat a larger one on a narrow, well-defined job.
Judge models by results on your own tasks, not by the parameter count.

## 0.5 What LLMs are genuinely good at

Based on how these systems are used and described in official documentation
and teaching material, the reliable strengths are:

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

Every serious source — from Microsoft's LLM fundamentals to Anthropic's
glossary and independent teaching material — converges on the same limits.
A model:

- **does not independently look facts up.** A base model generates text that
  is *consistent with* its training data. A product may add search, retrieval,
  files, memory, or tools; those are separate surfaces, with separate data and
  permission boundaries. Returned material can still be stale, incomplete, or
  wrong, so check the original source and date.
- **does not automatically know the present or your private data.** It has a
  training cutoff and receives only what you, a connected product, account
  memory, retrieval system, file, or tool provides. Before pasting, uploading,
  or enabling a connection, check what may leave the current surface and who
  authorized it.
- **cannot do arithmetic reliably.** Large models solve word problems by
  pattern, not calculation; long or tricky math needs a calculator, code, or a
  tool.
- **cannot verify.** A model cannot tell you that a citation is real, a
  website exists, or a claim is true. Only you (or a tool acting for you) can
  check.
- **cannot act on the world by itself.** A chat model has no files, accounts,
  or permissions unless a tool layer explicitly provides them. A login, a
  button, or an agent summary does not prove an action happened.
- **has no inherent memory of you.** A product may retain chat history or
  account memory; its privacy, retention, and deletion behavior depend on that
  product and its settings. Read the applicable policy rather than assuming
  that a chat is private or remembered.
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
   limits. The model works with what you give it.
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
- **Attention Is All You Need** (Vaswani et al., 2017): the original
  Transformer paper, linked for the history section.

Access dates, model versions, and product facts change; treat anything
product-specific in this lesson as `stale after 2026-11-09` until refreshed
against official sources. The lesson does not claim that any model, provider,
or benchmark result is best, fastest, or safest. This is a candidate lesson:
its sources and structure have been checked, but learner outcomes have not yet
been measured.
