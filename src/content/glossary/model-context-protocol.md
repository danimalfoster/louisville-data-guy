---
term: 'Model Context Protocol (MCP)'
short: 'An open standard that lets AI assistants connect to tools and data sources, such as databases, file systems, and business apps, through a common interface.'
category: 'AI'
related: ['ai-agent', 'large-language-model', 'text-to-sql', 'retrieval-augmented-generation']
---

The Model Context Protocol is an open standard, introduced by Anthropic in late 2024 and since adopted
widely across the industry, that defines how AI applications connect to outside systems. Before MCP,
every AI tool needed custom code for every system it talked to. MCP works more like a universal plug:
build one connector for a system, and any AI application that supports MCP can use it.

The pieces:

- **MCP server:** a small program that exposes a system's capabilities, like "run a read-only SQL query,"
  "search tickets," or "read a file," in a standard format.
- **MCP client:** the AI application (a chat assistant, coding tool, or [agent](/glossary/ai-agent/))
  that discovers those capabilities and calls them.
- **Tools, resources, and prompts:** the three kinds of things a server can offer. Tools take actions or
  run queries, resources provide data to read, and prompts are reusable templates.

## An example

A data team builds an MCP server for its [data warehouse](/glossary/data-warehouse/). It exposes three
tools: list the available tables with descriptions, describe a table's columns, and run a read-only
query with a row limit. Business users connect the server to their AI assistant and ask, "How did
renewals trend by region last quarter?" The assistant looks up the right tables, writes the SQL, runs it
through the server, and explains the results, all within the permissions the server allows.

## Where people get it wrong

**"MCP gives the AI access to everything."** An MCP server exposes only what its builder chooses. The
server is where you enforce guardrails: read-only access, row limits, approved tables, query checks,
and the user's own permissions. Design those deliberately.

**"MCP makes the answers correct."** MCP solves the connection problem, not the meaning problem. An
assistant querying poorly documented tables will still guess. Pairing MCP with a
[semantic layer](/glossary/semantic-layer/) or good [catalog](/glossary/data-catalog/) metadata is what
makes the answers trustworthy.
