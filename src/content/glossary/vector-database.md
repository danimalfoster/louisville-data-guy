---
term: 'Vector database'
short: 'A database designed to store embeddings and quickly find the items most similar to a given query, which powers semantic search and RAG.'
category: 'AI'
related: ['embeddings', 'retrieval-augmented-generation', 'data-lakehouse']
---

A vector database stores [embeddings](/glossary/embeddings/) (lists of numbers that represent meaning)
along with the original content and metadata. Its main job is *similarity search*: given a query
vector, return the stored items whose vectors are closest to it, fast, even among millions or billions
of items.

Ordinary databases are built for exact matches ("customer ID = 4521") and ranges ("orders over $500").
Vector databases are built for "find me things like this." They use special indexes that find
approximate nearest neighbors very quickly, trading a tiny amount of accuracy for big speed gains.

Options include purpose-built products like Pinecone, Weaviate, Qdrant, and Milvus, and vector features
added to existing databases, such as pgvector for PostgreSQL, plus vector search in Elasticsearch,
MongoDB, Snowflake, Databricks, and the major cloud platforms.

## An example

A legal team wants to search 200,000 contracts for indemnification clauses similar to one they
negotiated last year. Each contract is split into clauses, each clause is embedded, and the vectors are
stored with metadata like client, contract date, and contract type. A search returns the 20 most similar
clauses, filtered to contracts from the last three years. Keyword search alone would miss clauses that
used different wording.

## Where people get it wrong

**"We need a new specialized database."** For many organizations, the vector features in a database they
already run are enough. A dedicated vector database makes more sense at very large scale or when search
speed is critical. Starting with what you have avoids another system to secure and maintain.

**"Similarity search is all you need."** The best results usually combine vector similarity with keyword
matching and metadata filters, such as date ranges, departments, or the user's access permissions.
Forgetting permissions is a common and serious mistake: the search must never return documents the
person isn't allowed to see.
