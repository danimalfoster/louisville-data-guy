---
term: 'Semantic layer'
short: 'A shared layer of business definitions, like metrics, dimensions, and joins, that sits between raw tables and the tools people use to ask questions.'
category: 'Data management'
related: ['data-catalog', 'star-schema', 'text-to-sql', 'data-governance']
---

You'll hear "semantic layer" a lot right now, mostly because of AI, but the idea has been around for a
while. It's a place where you define your business terms once, things like what counts as revenue or
an active customer and how the tables join together, so every report, spreadsheet, and tool uses the
same math. If you've ever sat in a meeting where sales and finance brought two different revenue
numbers, this is what's meant to fix that.

Here's a smaller version of the problem that I ran into recently. A team was working from a call
report with two columns that both sounded like "calls handled by an agent." One counted calls an agent
actually answered. The other counted calls the AI had tried to transfer to an agent, and some of those
never reached anyone, because the location didn't have agent support, it was after hours, or the
caller hung up. Both columns were correct. They just answered different questions, and picking the
wrong one would throw off your numbers. I explained the difference over email, which works once. A
semantic layer is how you explain it once for everybody.

Most semantic layers define four things. Metrics are the calculations themselves, with the exact
filters (net revenue excludes refunds, for example). Dimensions are the things you can slice those
metrics by, like region, product line, or fiscal quarter. Relationships tell the tool how tables join,
so users never have to write the joins themselves. And access rules control who can see which rows
and columns. Tools in this space include the dbt Semantic Layer, Cube, AtScale, LookML in Looker, and
semantic models in Power BI.

One thing to watch for is that the semantic model in a BI tool usually only works inside that tool. If
your people also pull data into Excel, Python, or an AI assistant, they won't get those definitions.
A universal semantic layer serves the same definitions to all of them.

The reason it's getting so much attention now is AI. When you ask an AI assistant a question about
your data, it has to figure out what you mean by revenue and which tables to use. Without a semantic
layer, it's guessing from table and column names, and it will guess wrong some of the time, with total
confidence. With one, it only has to pick the right metric and filters, and the definition stays the
one your business agreed on. If you're planning to let people query data with AI (see
[text-to-SQL](/glossary/text-to-sql/)), I'd put the semantic layer, or at least well-documented
definitions, ahead of picking a model.
