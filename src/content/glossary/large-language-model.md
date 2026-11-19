---
term: 'Large Language Model (LLM)'
short: 'An AI model trained on huge amounts of text to predict the next word, which lets it write, summarize, answer questions, and generate code.'
category: 'AI'
related: ['hallucination', 'retrieval-augmented-generation', 'prompt-engineering', 'embeddings', 'ai-agent']
---

A large language model is the technology behind tools like ChatGPT, Claude, and Gemini. At its core, an
LLM does one thing. Given some text, it predicts what text should come next. It learns to do that by
training on an enormous amount of writing, everything from books to websites to code, and then gets
refined with human feedback. That one simple ability turns out to be enough to draft emails, summarize
documents, translate, explain concepts, and write SQL.

A few terms come up constantly when people talk about LLMs. The prompt is whatever you give the model,
including your instructions and any context. Tokens are the units the model reads and writes, roughly
three-quarters of a word each, and pricing and limits are measured in them. The context window is how
much text the model can take in at once, which ranges from a few pages to several books' worth depending
on the model. And the training cutoff is the date after which the model has no built-in knowledge.

LLMs are very good at language work, like summarizing, rewriting, sorting text into categories, pulling
structured fields out of messy notes, and writing a first draft of code. They're weaker at exact math, at
knowing anything specific about your organization, and at knowing when they don't know something. On
their own, they'll sometimes produce an answer that sounds right and isn't (see
[hallucination](/glossary/hallucination/)).

The biggest misunderstanding I run into is the assumption that the model already knows your data. It
doesn't. A general-purpose LLM knows nothing about your customers, products, or policies unless you give
it that information, usually through [retrieval-augmented generation](/glossary/retrieval-augmented-generation/)
or by connecting it to your systems with something like the
[Model Context Protocol](/glossary/model-context-protocol/). Most of my work with LLMs is really about
that connection, getting the right data in front of the model with the right guardrails around it.

People also tend to assume a bigger model gets better results. Sometimes it does, but for a lot of
business tasks, a smaller, faster, cheaper model with good context will beat a bigger model with poor
context. In my experience, the data you give the model matters more than which model you pick.
