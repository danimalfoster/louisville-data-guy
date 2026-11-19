---
term: 'Data Dictionary'
short: 'A written reference for a database that explains what each table and column means, how tables join, and the business rules for using the data correctly.'
category: 'Data management'
related: ['data-catalog', 'semantic-layer', 'model-context-protocol', 'text-to-sql']
---

A data dictionary is the reference you'd hand a new analyst on their first day. It explains what's in
each table, what each column means, how the tables connect, and the rules for using the data so the
numbers come out right. It can be a spreadsheet, a set of documents, or a file that lives in the same
repository as your code. The format matters a lot less than whether it's complete and kept up to date.

At a minimum, I'd want a data dictionary to cover table and column definitions, the join logic between
tables, and rules for aggregation (which columns can be summed, which need to be counted distinct, which
should never be added across days). The more useful ones also include business rules, like what makes a
location active, and a glossary of what people mean when they use certain terms. That last part is the
one most often skipped, and it's the one that saves the most back-and-forth, because the same word can
mean different things to different teams.

It's easy to confuse a data dictionary with a [data catalog](/glossary/data-catalog/) or a
[semantic layer](/glossary/semantic-layer/). A data catalog is usually a tool that inventories data
across many systems and helps people find it. A semantic layer defines metrics in a way that tools can
run directly. A data dictionary is simpler than both. It's the documentation that explains one database
well, and in my experience it's often the piece that's missing even when the other two exist.

Data dictionaries have become a lot more important with AI. When you connect an AI assistant to your
database, through an [MCP server](/glossary/model-context-protocol/) for example, the model can read
table and column names, but it has no idea what your business means by them. Without a dictionary, it
guesses, and it guesses confidently. With one, it has the same working knowledge a good analyst would.
When I built my first MCP server, we didn't have a data dictionary, so I built one along the way with
AI's help. It's turned out to be the most useful thing to come out of that work, because every project
since has started from it.

My recommendation is to start small. Document the tables people query most, check what AI drafts for
you against what you know to be true, and add to it every time someone asks a question it couldn't
answer.
