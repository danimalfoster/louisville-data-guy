---
term: 'AI agent'
short: 'An AI system that works toward a goal by planning steps, using tools, checking results, and adjusting, rather than giving a single one-shot answer.'
category: 'AI'
related: ['model-context-protocol', 'large-language-model', 'text-to-sql', 'hallucination']
---

A chatbot answers one message at a time. An AI agent takes a goal and works on it over several steps.
It uses a [large language model](/glossary/large-language-model/) to decide what to do next, calls tools
to do it (search, run a query, read a file, send a request), looks at the result, and decides on the
next step, until the goal is met or it needs a human.

The basic loop is:

1. **Plan:** break the goal into steps.
2. **Act:** call a tool, often through a standard like the
   [Model Context Protocol](/glossary/model-context-protocol/).
3. **Observe:** read the tool's output.
4. **Adjust:** fix errors, try another approach, or move to the next step.

## An example

A finance analyst asks an agent, "Why did gross margin drop in October?" The agent:

- queries the warehouse for margin by product line and finds the drop is concentrated in one category,
- queries again by supplier and finds a cost increase from one vendor,
- searches procurement documents and finds a price change notice dated September 28,
- writes a summary with the queries and the document attached.

The analyst reviews and verifies it in ten minutes instead of spending an afternoon pulling data.

## Where people get it wrong

**"Give the agent broad access and let it figure things out."** Agents should get the least access
needed: read-only where possible, limited tables, spending caps, and human approval before anything
irreversible, like sending email, changing records, or making payments. Every tool an agent can call is
something that can go wrong at machine speed.

**"Agents replace analysts."** Today's agents are best at the legwork, like gathering data, drafting,
and checking. They still make mistakes that compound over steps (see
[hallucination](/glossary/hallucination/)). The most effective setups keep a person reviewing the
result and the steps that led to it.

**"Every AI feature is an agent."** Many products use the word loosely. If the system doesn't choose its
own steps and tools, it's a workflow with AI in it, which is often the more reliable choice.
