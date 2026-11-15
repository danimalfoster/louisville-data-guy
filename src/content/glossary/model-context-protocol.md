---
term: 'Model Context Protocol (MCP)'
short: 'An open standard that lets AI assistants connect to tools and data sources, such as databases, file systems, and business apps, through a common interface.'
category: 'AI'
related: ['ai-agent', 'large-language-model', 'text-to-sql', 'semantic-layer']
---

The Model Context Protocol, or MCP, is an open standard for connecting AI assistants to other systems,
like databases, file shares, ticketing systems, and business apps. Anthropic introduced it in late 2024,
and most of the major AI tools support it now. Before MCP, connecting an AI tool to a system meant
writing custom code for each pairing. With MCP, you build one connector, called an MCP server, and any
AI app that supports MCP can use it.

An MCP server is a small program that tells the AI what it's allowed to do with a system. For a
database, that might be "list the tables," "describe this table's columns," and "run a read-only
query." The AI app sees those tools, decides when to use them, and calls them as it works through your
question.

This is a big part of what I do right now, so I'll tell you how it tends to play out. When a business
team asks for a new report, the simplest option is often to connect them to a reporting MCP server
instead of building the report myself. Once they're connected, they can pull data, build dashboards,
and run their own analysis by asking questions in plain English. Setup on their end is usually a
desktop AI app plus a couple of supporting installs like Node.js, and the connection itself takes
about ten minutes. I'd also suggest exposing more than just the one table they asked about. If they
can see the related tables too, they get a more complete picture and come back with fewer follow-up
requests.

That said, the server is where your guardrails live, and I'd think about those before anything else.
Mine are read-only, limit how many rows come back, and check each query before it runs. An MCP server
only exposes what you choose to expose, so design it the way you'd design any other access to your
data. If you're pointing it at a production database, I'd also consider a separate reporting copy, so
a big AI-generated query doesn't slow down the systems that run the business.

The other thing to keep in mind is that MCP solves the connection, not the meaning. If your tables are
poorly named and undocumented, the AI will still be guessing what "revenue" means. Good table and
column descriptions, or a [semantic layer](/glossary/semantic-layer/), are what make the answers
trustworthy.
