---
term: 'Embeddings'
short: 'Lists of numbers that represent the meaning of text, images, or other data, so a computer can measure how similar two things are.'
category: 'AI'
related: ['vector-database', 'retrieval-augmented-generation', 'large-language-model']
---

An embedding turns a piece of content, such as a sentence, a paragraph, a product description, or an
image, into a long list of numbers called a *vector*. Typical embeddings have hundreds to a few thousand
numbers. Those numbers aren't meaningful one by one. What matters is that content with similar meaning
ends up with similar vectors.

That makes it possible to search by meaning instead of by exact words. "How do I reset my password?" and
"I'm locked out of my account" share almost no words, but their embeddings are close together, so a
search for one finds the other.

Embeddings are created by specialized embedding models, offered by most AI providers and in open-source
form. They are stored and searched in a [vector database](/glossary/vector-database/) or a regular
database with vector support.

## Where they are used

- **Semantic search:** find documents that answer a question, even when the wording differs.
- **[Retrieval-augmented generation](/glossary/retrieval-augmented-generation/):** pick the right
  context to give a language model.
- **Recommendations:** "customers who viewed this also viewed" based on similar items.
- **Deduplication and matching:** spot near-duplicate support tickets, or likely matching customer
  records for [master data management](/glossary/master-data-management/).
- **Classification and clustering:** group thousands of survey comments by theme.

## An example

A support team embeds 50,000 past tickets. When a new ticket arrives, the system finds the ten most
similar past tickets and shows the agent how each was resolved. New agents solve problems faster
because they can see what worked before.

## Where people get it wrong

**"Embeddings understand everything."** Embeddings capture general meaning well but can miss exact
details. Two contracts that differ only in a dollar amount or a date may look nearly identical. That is
why many systems combine embedding search with keyword search and filters.

**"Embed once and forget it."** If you switch embedding models, all stored vectors must be regenerated,
because vectors from different models can't be compared.
