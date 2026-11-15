---
term: 'Text-to-SQL'
short: 'Using AI to turn a plain-English question into a SQL query, so people can get answers from a database without writing code.'
category: 'AI'
related: ['semantic-layer', 'model-context-protocol', 'large-language-model', 'hallucination', 'data-catalog']
---

Text-to-SQL lets someone type "What were our top ten products by revenue in Kentucky last quarter?" and
get an answer from the database. A [large language model](/glossary/large-language-model/) reads the
question, looks at the available tables and columns, writes a SQL query, runs it, and presents the
results, often with a chart and a plain-English explanation.

It has been a goal of business intelligence for decades. LLMs finally made it practical, because they
write SQL well and can handle the endless ways people phrase questions.

## What makes it work

Writing syntactically correct SQL is the easy part. The hard part is writing the *right* SQL for your
business:

- **Knowing the data.** Which of the four tables with "customer" in the name is the official one?
  Table and column descriptions from a [data catalog](/glossary/data-catalog/) help enormously.
- **Knowing the definitions.** Does "revenue" include refunds? A
  [semantic layer](/glossary/semantic-layer/) answers that once, so the model doesn't guess.
- **Clean models.** A clear [star schema](/glossary/star-schema/) with well-named columns is far easier
  for AI to query correctly than hundreds of raw source tables.
- **Guardrails.** Read-only access, row limits, query timeouts, approved tables, and the user's own
  permissions, often enforced through an
  [MCP server](/glossary/model-context-protocol/).
- **Validation.** Checking that the generated query runs and returns reasonable results before showing
  it, and showing the SQL so experts can verify it.

## An example

A hospital operations manager asks, "How many ER visits did we have last week compared with the same
week last year?" The assistant identifies the visits fact table and date dimension, applies the official
definition of an ER visit from the semantic layer, runs the query, and returns both numbers with the
percent change, plus the SQL behind them.

## Where people get it wrong

**"Point it at the database and you're done."** Without good metadata and definitions, text-to-SQL
produces answers that look right and aren't (see [hallucination](/glossary/hallucination/)). The data
foundation determines the quality of the answers far more than the choice of model.
