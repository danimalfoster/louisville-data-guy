---
term: 'Hallucination'
short: 'When an AI model produces information that sounds confident and plausible but is false or not supported by its sources.'
category: 'AI'
related: ['large-language-model', 'retrieval-augmented-generation', 'prompt-engineering', 'text-to-sql']
---

A hallucination is an AI answer that is wrong but delivered as if it were right: a made-up statistic, a
citation to a paper that doesn't exist, a policy detail that was never in the handbook, or a SQL query
that references a column your database doesn't have.

It happens because a [large language model](/glossary/large-language-model/) generates the most likely
next words, not verified facts. When it lacks the information it needs, it doesn't naturally stop and
say "I don't know." It produces something that fits the pattern of a good answer. That's why
hallucinations are often fluent, specific, and convincing.

## How to reduce them

- **Ground the model in real data** with
  [retrieval-augmented generation](/glossary/retrieval-augmented-generation/) or direct access to
  systems, and instruct it to answer only from what it's given.
- **Require citations** so every claim can be traced to a source document or query.
- **Allow "I don't know."** Tell the model explicitly that it may say it can't find an answer, and
  reward that in testing.
- **Check outputs automatically.** For SQL, validate that tables and columns exist and run the query
  before showing results. For structured data, validate against a schema.
- **Keep humans in the loop** for high-stakes uses like medical, legal, or financial decisions.
- **Measure it.** Build a test set of questions with known answers and track how often the system gets
  them wrong as you change prompts, models, or data.

## An example

An AI assistant is asked for the company's Q3 customer churn rate. Without access to data, it replies
"Q3 churn was 4.2%," a number it invented. Connected to the warehouse through a governed
[semantic layer](/glossary/semantic-layer/), it runs the official churn metric, returns 5.1%, and shows
the query it used. The second answer can be checked. The first cannot.

## Where people get it wrong

**"Newer models don't hallucinate."** Rates have dropped substantially, but no model is immune. Design
systems assuming some answers will be wrong, and make errors easy to catch.
