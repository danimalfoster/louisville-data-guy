---
term: 'Retrieval-augmented generation (RAG)'
short: 'A technique that looks up relevant documents or data first, then gives them to a language model so its answer is grounded in your own information.'
category: 'AI'
related: ['embeddings', 'vector-database', 'large-language-model', 'hallucination']
---

A [large language model](/glossary/large-language-model/) only knows what it learned in training. It has
never seen your policy manual, your contracts, or last week's support tickets. Retrieval-augmented
generation, usually just called RAG, gets around that by adding a lookup step before the model answers.

It works in three stages. First, you prepare your documents by splitting them into chunks and indexing
them, usually as [embeddings](/glossary/embeddings/) stored in a
[vector database](/glossary/vector-database/), often alongside regular keyword search. Then, when someone
asks a question, the system finds the chunks most relevant to it. Finally, it sends the question and
those chunks to the model, with instructions to answer using only that material and to cite where the
answer came from. The model's language skills don't change. What changes is that its answer is based on
your current information instead of its memory.

An HR team is a good example. They load the benefits handbook, policy documents, and FAQ pages into a RAG
system. An employee asks whether they can carry unused PTO into next year. The system finds the PTO
policy section, and the model answers in plain English with a link to the exact paragraph. When the
policy changes, HR updates the document, and the answers change with it. Nobody has to retrain anything.

RAG cuts down on [hallucinations](/glossary/hallucination/) a lot, but it doesn't eliminate them. If the
lookup brings back the wrong passage, or nothing useful, the model may still give a confident wrong
answer. Good RAG systems keep an eye on how well the retrieval is working and tell the user when they
can't find an answer.

In my experience, most RAG problems aren't really AI problems. They're data problems. Outdated documents,
three versions of the same policy, documents split up in ways that lose their meaning, and permissions
that weren't carried over. The same things that decide whether any data project works, like ownership,
[data quality](/glossary/data-quality/), and access control, decide whether RAG works.

I'd also keep RAG to text. For questions like "What were sales last month?", you're better off querying
the structured data directly (see [text-to-SQL](/glossary/text-to-sql/)).
