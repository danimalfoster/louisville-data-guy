---
term: 'Embeddings'
short: 'Lists of numbers that represent the meaning of text, images, or other data, so a computer can measure how similar two things are.'
category: 'AI'
related: ['vector-database', 'retrieval-augmented-generation', 'large-language-model']
---

An embedding turns a piece of content, like a sentence, a paragraph, a product description, or an image,
into a long list of numbers called a vector. Most embeddings have somewhere between a few hundred and a
few thousand numbers. The individual numbers don't mean anything on their own. What matters is that
content with similar meaning ends up with similar numbers.

That's what lets a computer search by meaning instead of by exact words. "How do I reset my password?"
and "I'm locked out of my account" have almost no words in common, but their embeddings are close
together, so a search for one will find the other. Embeddings are created by embedding models, which
most AI providers offer and which are also available as open source. They're stored and searched in a
[vector database](/glossary/vector-database/) or in a regular database that supports vectors.

You'll find embeddings behind a lot of things. Semantic search is the obvious one. They're also how
[retrieval-augmented generation](/glossary/retrieval-augmented-generation/) decides what context to hand
the model. Recommendation engines use them for "customers who viewed this also viewed." And they're
useful for grouping things, like sorting thousands of survey comments into themes, or flagging customer
records that probably refer to the same company.

Here's a practical example. A support team creates embeddings for 50,000 past tickets. When a new ticket
comes in, the system finds the ten most similar past tickets and shows the agent how each one was
resolved. New agents get up to speed faster because they can see what worked before.

There are a couple of limitations to keep in mind. Embeddings capture general meaning well, but they can
miss exact details. Two contracts that differ only by a dollar amount or a date can look nearly identical,
which is why a lot of systems combine embedding search with keyword search and filters. And if you ever
switch embedding models, you'll have to regenerate all your stored vectors, because vectors from
different models can't be compared to each other.
