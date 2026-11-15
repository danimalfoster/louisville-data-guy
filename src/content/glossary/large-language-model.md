---
term: 'Large language model (LLM)'
short: 'An AI model trained on huge amounts of text to predict the next word, which lets it write, summarize, answer questions, and generate code.'
category: 'AI'
related: ['hallucination', 'retrieval-augmented-generation', 'prompt-engineering', 'embeddings', 'ai-agent']
---

A large language model is the technology behind tools like ChatGPT, Claude, and Gemini. At its core, an
LLM does one thing: given some text, it predicts what text should come next. Trained on a vast amount of
writing, from books to websites to code, and then refined with human feedback, that simple ability turns
into something that can draft emails, summarize documents, explain concepts, translate, and write SQL.

A few terms that come up constantly:

- **Prompt:** the input you give the model, including instructions and any context.
- **Token:** the unit models read and write, roughly three-quarters of a word. Pricing and limits are
  measured in tokens.
- **Context window:** how much text the model can consider at once, from a few pages to several books'
  worth, depending on the model.
- **Training cutoff:** the date after which the model has no built-in knowledge.

## What LLMs are good and bad at

LLMs are strong at language tasks: summarizing, rewriting, classifying, extracting structured fields
from messy text, and generating first drafts of code. They are weaker at exact arithmetic, knowing facts
about your organization, and knowing when they don't know something. On their own, they can produce
answers that sound right but aren't (see [hallucination](/glossary/hallucination/)).

## An example

A claims team receives thousands of free-text notes a day. An LLM reads each note and extracts the
injury type, body part, and whether an attorney is involved into structured fields. Work that took
analysts hours now takes minutes, with humans reviewing the uncertain cases.

## Where people get it wrong

**"The model knows our data."** A general-purpose LLM knows nothing about your customers, products, or
policies unless you give it that information in the prompt, usually through
[retrieval-augmented generation](/glossary/retrieval-augmented-generation/) or tools like the
[Model Context Protocol](/glossary/model-context-protocol/).

**"Bigger model, better results."** For many business tasks, a smaller, faster, cheaper model with good
context outperforms a larger model with poor context. The data you give it usually matters more than
which model you pick.
