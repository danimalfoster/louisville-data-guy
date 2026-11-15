---
term: 'Text-to-SQL'
short: 'Using AI to turn a plain-English question into a SQL query, so people can get answers from a database without writing code.'
category: 'AI'
related: ['semantic-layer', 'model-context-protocol', 'large-language-model', 'hallucination', 'data-catalog']
---

Text-to-SQL lets someone type a question like "What were our top ten products by revenue in Kentucky last
quarter?" and get an answer straight from the database. A
[large language model](/glossary/large-language-model/) reads the question, looks at the available tables
and columns, writes a SQL query, runs it, and shows the results, often with a chart and a short
explanation. Business intelligence has been chasing this for decades. LLMs finally made it practical,
because they write SQL well and can handle all the different ways people phrase questions.

This is a big part of my work right now, and the thing I tell people is that getting the SQL to run is
the easy part. Getting it to return the right answer for your business is the hard part. Which of the
four tables with "customer" in the name is the official one? Does "revenue" include refunds? Does "calls
handled" mean calls an agent answered, or calls the system tried to send to an agent? A model can't know
those things unless you tell it.

So most of the effort goes into the data around the model. Good table and column descriptions in a
[data catalog](/glossary/data-catalog/) help a lot. A [semantic layer](/glossary/semantic-layer/) helps
even more, because the definitions are already decided and the model just has to pick the right metric.
A clean [star schema](/glossary/star-schema/) with sensible column names is far easier for AI to query
correctly than hundreds of raw source tables. Then there are guardrails, usually enforced through
something like an [MCP server](/glossary/model-context-protocol/): read-only access, row limits, query
timeouts, approved tables, and the user's own permissions. And finally, I check that each query is valid
before it runs, and I show the SQL alongside the answer so anyone who knows the data can verify it.

When those pieces are in place, it works well. A hospital operations manager can ask how many ER visits
they had last week compared to the same week last year, and the assistant uses the official definition of
an ER visit, runs the query, and comes back with both numbers and the percent change.

When they aren't, you get answers that look right and aren't (see
[hallucination](/glossary/hallucination/)). The quality of the data foundation matters far more than which
model you choose.
