---
term: 'Hallucination'
short: 'When an AI model produces information that sounds confident and plausible but is false or not supported by its sources.'
category: 'AI'
related: ['large-language-model', 'retrieval-augmented-generation', 'prompt-engineering', 'text-to-sql']
---

A hallucination is when an AI gives you an answer that's wrong but sounds completely sure of itself. It
might be a made-up statistic, a citation to a paper that doesn't exist, a policy detail that was never
in the handbook, or a SQL query that uses a column your database doesn't have.

It happens because a [large language model](/glossary/large-language-model/) generates the most likely
next words, not verified facts. When it doesn't have the information it needs, it doesn't naturally stop
and say "I don't know." It produces something that looks like a good answer. That's why hallucinations
tend to be fluent and specific, which is exactly what makes them convincing.

Here's a simple example. Someone asks an AI assistant for the company's Q3 customer churn rate. If the
assistant isn't connected to any data, it might reply "Q3 churn was 4.2%," a number it made up. If it's
connected to the warehouse through a governed [semantic layer](/glossary/semantic-layer/), it runs the
official churn calculation, comes back with 5.1%, and shows the query it used. The second answer is one
you can check.

There are several ways to reduce hallucinations, and in my experience you'll want more than one of them.
The biggest is grounding the model in real data, either with
[retrieval-augmented generation](/glossary/retrieval-augmented-generation/) or by connecting it directly
to your systems, and telling it to answer only from what it's given. It also helps to require citations,
so every claim can be traced back to a document or a query, and to tell the model explicitly that it's
okay to say it can't find an answer. For SQL, I check that the tables and columns actually exist and that
the query runs before anyone sees the result. And for anything high-stakes, like medical, legal, or
financial decisions, a person should review the output.

It's also worth measuring. Put together a set of questions with known answers and track how often your
system gets them wrong as you change prompts, models, or data. Newer models hallucinate a lot less than
earlier ones, but none of them are immune, so I'd design any system assuming some answers will be wrong
and make those mistakes easy to catch.
