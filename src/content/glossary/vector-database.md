---
term: 'Vector database'
short: 'A database designed to store embeddings and quickly find the items most similar to a given query, which powers semantic search and RAG.'
category: 'AI'
related: ['embeddings', 'retrieval-augmented-generation', 'data-lakehouse']
---

A vector database stores [embeddings](/glossary/embeddings/), along with the original content and some
details about it, and its main job is finding the items that are most similar to whatever you're
searching for. It has to do that quickly, even across millions or billions of items.

Ordinary databases are built for exact matches, like "customer ID = 4521," and ranges, like "orders over
$500." Vector databases are built for "find me things like this one." They use special indexes that find
close matches very fast, giving up a tiny bit of accuracy in exchange for a lot of speed. Some products
are built just for this, like Pinecone, Weaviate, Qdrant, and Milvus. Many existing databases have added
vector support too, including PostgreSQL through pgvector, Elasticsearch, MongoDB, Snowflake, Databricks,
and the major cloud platforms.

A legal team is a good example. Say they want to search 200,000 contracts for indemnification clauses
similar to one they negotiated last year. Each contract gets split into clauses, each clause gets an
embedding, and those get stored with details like client, contract date, and contract type. A search
returns the 20 most similar clauses, filtered to the last three years. A keyword search alone would miss
the clauses that said the same thing in different words.

My suggestion for most organizations is to start with the vector features in a database you already run
before buying a specialized one. A dedicated vector database makes more sense at very large scale or
when search speed is critical. Starting with what you have means one less system to secure, pay for, and
maintain.

I'd also caution against relying on similarity alone. The best results usually come from combining
vector search with keyword matching and filters, like date ranges, departments, or the user's
permissions. That last one is easy to forget and a big deal when you do. The search should never return a
document the person isn't allowed to see.
