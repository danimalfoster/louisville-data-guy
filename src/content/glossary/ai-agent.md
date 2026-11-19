---
term: 'AI Agent'
short: 'An AI system that works toward a goal by planning steps, using tools, checking results, and adjusting, rather than giving a single one-shot answer.'
category: 'AI'
related: ['model-context-protocol', 'large-language-model', 'text-to-sql', 'hallucination']
---

A chatbot answers one message at a time. An AI agent takes a goal and works on it over several steps. It
uses a [large language model](/glossary/large-language-model/) to decide what to do next, calls a tool to
do it (run a query, search documents, read a file), looks at what came back, and then decides on the next
step. It keeps going until the goal is met or it needs a person to weigh in. The tools are often
connected through a standard like the [Model Context Protocol](/glossary/model-context-protocol/).

Here's what that can look like. A finance analyst asks an agent why gross margin dropped in October. The
agent queries the warehouse for margin by product line and finds the drop is mostly in one category. It
queries again by supplier and finds a cost increase from one vendor. Then it searches the procurement
documents, finds a price change notice dated late September, and writes up a summary with the queries
and the document attached. The analyst spends ten minutes checking the work instead of an afternoon
pulling the data.

The thing I'd think hardest about is access. It's tempting to give an agent broad access and let it
figure things out, but I'd give it the least access it needs. That means read-only wherever possible,
a limited set of tables, spending limits, and a person approving anything that can't be undone, like
sending an email, changing records, or making a payment. Every tool an agent can call is something that
can go wrong, and it can go wrong a lot faster than a person would.

I'd also be realistic about what agents can do today. They're very good at the legwork, like gathering
data, drafting, and double-checking. But they still make mistakes, and on a multi-step task, an early
mistake can carry through everything after it (see [hallucination](/glossary/hallucination/)). The
setups I've seen work best keep a person reviewing both the result and the steps that led to it.

One last thing. A lot of products use the word "agent" pretty loosely right now. If the system isn't
choosing its own steps and tools, it's really a workflow with some AI in it, and honestly, for a lot of
business processes, that's the more reliable option anyway.
