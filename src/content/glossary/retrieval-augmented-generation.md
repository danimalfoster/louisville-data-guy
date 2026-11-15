---
term: 'Retrieval-augmented generation (RAG)'
short: 'A technique that looks up relevant documents or data first, then gives them to a language model so its answer is grounded in your own information.'
category: 'AI'
related: ['embeddings', 'vector-database', 'large-language-model', 'hallucination']
---

A [large language model](/glossary/large-language-model/) only knows what it learned in training. It has
never seen your policy manual, your contracts, or last week's incident reports. Retrieval-augmented
generation fixes that by adding a lookup step before the model answers.

How it works:

1. **Prepare:** split your documents into chunks and index them, usually as
   [embeddings](/glossary/embeddings/) stored in a [vector database](/glossary/vector-database/), often
   combined with ordinary keyword search.
2. **Retrieve:** when someone asks a question, find the chunks most relevant to it.
3. **Generate:** send the question plus those chunks to the LLM, with instructions to answer using only
   the provided material and to cite sources.

The model's general language skills stay the same. What changes is that its answer is based on your
current, specific information instead of its memory.

## An example

An HR team loads its benefits handbook, policy documents, and FAQ pages into a RAG system. An employee
asks, "Can I carry over unused PTO into next year?" The system retrieves the PTO policy section, and the
model answers in plain English with a link to the exact paragraph. When the policy changes, HR updates
the document and the answers change with it. No retraining is needed.

## Where people get it wrong

**"RAG eliminates hallucinations."** It reduces them a lot, but if retrieval brings back the wrong
passage, or nothing useful, the model may still produce a confident wrong answer. Good RAG systems
measure retrieval quality and tell users when they can't find an answer.

**"The model is the hard part."** In practice, most RAG problems are data problems: outdated documents,
duplicate versions, poor chunking, and missing permissions. The same disciplines as any data project,
like ownership, [quality](/glossary/data-quality/), and access control, decide whether it works.

**"RAG works for numbers, too."** RAG is designed for text. For questions like "What were sales last
month?", querying structured data directly (see [text-to-SQL](/glossary/text-to-sql/)) is usually the
better approach.
