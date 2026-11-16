---
title: 'Agentic AI for Data Teams: What Counts, What Doesn''t, and the Guardrails That Matter'
description: 'What "agentic" actually means, five scenarios from plain automation to full agents, and the guardrails I use when AI touches real data.'
pubDate: '2026-11-16'
terms: ['ai-agent', 'model-context-protocol', 'text-to-sql', 'large-language-model', 'hallucination', 'prompt-engineering']
draft: true
---

When I sat down to write this post, I had a working definition of agentic AI in my head. To me, it meant
an automated workflow, often with a chatbot attached to the front of it. By that definition, most of the
automation I've built would count as agentic. I've built processes that handle invoicing, and others that
set up, launch, and close out customer locations in our database.

The more I thought about it, the less sure I was that my definition holds up. So instead of starting
with a definition, I want to walk through a few scenarios, from plain automation on one end to a fully
autonomous agent on the other, and figure out where the line actually is. I think the answer is useful,
because it changes how you build these things and how much you should trust them.

This is written for data professionals, so I'm going to assume you know your way around a database and
have at least played with an AI assistant. If you need a refresher on any of the terms, they link to the
[glossary](/glossary/).

## Five scenarios

### 1. Plain automation

A scheduled job runs every night. It pulls yesterday's transactions, applies a set of rules, generates
invoices, and emails a summary to finance. There's no AI anywhere in it. Every step was decided in
advance by whoever wrote the code, and if something unexpected shows up, the job either handles it the
way it was told to or it fails.

This is not agentic, and I want to be clear that it's not a lesser option either. A lot of what people
are trying to solve with AI right now could be solved with this, and it would be cheaper, faster, and
easier to troubleshoot.

### 2. Automation with an AI step

Same nightly job, but one step uses a [large language model](/glossary/large-language-model/). Maybe it
reads free-text notes on each account and sorts them into categories, or pulls a contract end date out
of a scanned PDF. The AI is doing real work, but the workflow around it is fixed. The code decides what
happens next, every time.

I'd call this AI-assisted automation. It's not really agentic, because the AI never decides what to do,
only how to answer the one question it's given.

### 3. A chatbot with tools

Now picture a business user typing "How did renewals trend by region last quarter?" into an AI
assistant that's connected to your reporting database through an
[MCP server](/glossary/model-context-protocol/). The assistant looks at the available tables, decides
which ones to query, writes the SQL, runs it, and explains the results.

This is where agency starts to show up. Nobody wrote code that says "for renewal questions, query these
three tables." The model chose which tools to call and in what order. It's a short chain, usually a few
steps, and a person is right there reading the answer, but the model is steering.

### 4. An agent working toward a goal

Give the same assistant a bigger ask: "Figure out why October's invoice totals don't match the billing
summary." Now it has to plan. It might compare totals by customer, find the customers that don't match,
dig into their transactions, notice a date range issue, and check whether the same thing happened in
September. Each step depends on what it found in the last one, and it decides when it's done.

This is an agent in the full sense. The model is choosing the path, not just the next query.

### 5. An agent that acts on its own

Last scenario. The same agent finds the problem and, instead of reporting it, fixes it. It updates the
records, regenerates the invoices, and emails the customers.

Technically, this is the most "agentic" of the five. It's also the one I would not build, and I'll get
into why below.

## So where's the line?

Looking at those five, the thing that separates agentic from not agentic isn't whether there's AI
involved, and it isn't whether there's a chatbot on the front. It's who decides what happens next. In
scenarios 1 and 2, the code decides. In 3 through 5, the model decides, with more freedom at each step.

That lines up with how a lot of people in the field have started describing it, including Anthropic,
which draws a distinction between workflows, where AI steps follow a predefined path, and agents, where
the model directs its own process and tool use. It also means agentic isn't a yes or no question. It's a
spectrum, and the real design decision is how far along that spectrum a given process should be.

So my original definition was partly right. A lot of agentic systems are automated workflows with a chat
interface. But an automated workflow with AI in it isn't automatically agentic, and most of the
automation I've built would land in scenarios 1 and 2. I'm fine with that.

## What surprised me

The thing that has surprised me most about working with these tools is how intuitive they can be when
they have enough context. The biggest lesson I've learned is to be as descriptive and thorough as
possible when writing [prompts](/glossary/prompt-engineering/) and instructions. Explain the business
rules. Explain what the tables mean. Explain what a good result looks like and what should never happen.
When the model has the context it needs, it makes surprisingly good decisions. When it doesn't, it
fills the gaps with guesses, and those guesses can look very convincing.

The other thing that's changed is where the time goes. Writing code is no longer the bottleneck.
Reviewing it is. AI can produce a working script, a set of SQL queries, or an entire MCP server in a
fraction of the time it used to take me, but every one of those still needs a person to read it and
make sure it does what it should and nothing else. If you're planning AI work and you budget all your
time for building and none for review, you're going to be behind.

## The guardrails I use

Guardrails deserve their own post, and they'll get one. But I can't write about agentic AI without
covering them, because in my opinion they're what makes the difference between a useful agent and a
liability. Here's what I put in place.

Anything that can change data gets reviewed by a person. Any SQL query that could update or alter the
database is reviewed by a human before it runs. Outgoing emails are saved as drafts so someone can read
them first. Writes to tools like Jira and Confluence have to be confirmed. And configuration changes get
confirmed as their own separate step, not bundled in with other work where they're easy to miss.

There's no room for AI to guess. Fuzzy matching, like "this customer name is close enough to that one,"
isn't applied unless it has been specifically allowed for that case. If the AI isn't sure, I want it to
stop and say so, not pick the most likely answer.

AI finds problems. People decide how to fix them. This is probably the most important rule I have. I use
AI to detect issues in the data and the database, and it's very good at that. But I don't want it using
its best judgment on a data issue. I want it to surface the issue to me so I can use mine. That's why
scenario 5 above is one I wouldn't build.

Least privilege, for the AI and for the people using it. If the AI doesn't absolutely need a permission,
it doesn't get it. The same goes for users. Each person using our MCP servers has their own API key, and
our online apps sit behind an Entra sign-in, so access is tied to a specific person and can be shut off
for one person without affecting anyone else.

Smaller, role-specific MCP servers instead of one big one. In the past, I might have built one
catch-all MCP server that covered the full breadth of our data, because building and maintaining several
would have taken too long. Now that writing code isn't the bottleneck, it's practical to build separate
servers for different roles. Your accountants need different data than your call center supervisors, and
neither needs everything.

Every query gets checked before it runs. Any SQL the AI writes through our MCP tools is checked by
sqlglot, an open-source SQL parser, before it's executed. If the check fails, the query is blocked. That
catches things like write statements sneaking into a read-only tool, and queries against tables that
aren't on the approved list.

Log everything. Every tool you build should log what the AI did, what it asked for, and what came back.
Those logs are how you find weaknesses you didn't anticipate, and they're what you'll want when someone
asks why a number came out the way it did.

Write tool notices so they don't sound like instructions. This one is subtle. When a tool returns a
message to the model, like a warning that results were truncated, the model reads that text as part of
its context. If it's written as a command, the model may treat it as one. So I write those notices in
passive voice ("Results were limited to 500 rows") rather than as directions ("Tell the user to narrow
their query"). It's a small thing that makes the model's behavior more predictable.

Give the AI standing instructions and context. Most AI tools now support some form of memory or project
notes, files the AI reads every time it starts work. That's where I keep the context that doesn't change
much, like business rules, naming conventions, which tables are the trusted ones, and the guardrails
themselves. It means I'm not relying on remembering to type all of that into every prompt.

## What the hype gets wrong

There's a lot of noise around agents right now, and a few patterns are worth watching for if you're
evaluating tools or pitching a project internally.

The word "agent" is getting attached to almost everything right now. A lot of what's being sold as an
agent is scenario 2, a fixed workflow with an AI step in it. That's not a bad product, but you should know
what you're buying, because a fixed workflow and a real agent need very different levels of testing and
oversight.

Demos are built on clean data. An agent that looks great against a tidy sample database can fall apart
against fifteen years of real data, with duplicate customers, retired codes, and tables nobody has
touched since the person who built them left. The quality of your data and documentation will matter more
than the agent itself.

Autonomy is treated as the goal. The pitch is usually about how much the agent can do without a person
involved. For data work, I think that's the wrong measure. What matters is whether the result is correct
and whether you can tell when it isn't. An agent that does half as much but surfaces every issue for review
is more valuable to me than one that quietly fixes things.

Review time and running costs get left out. The build looks fast because the AI writes the code, but
someone still has to review it, monitor it, and look into it when something odd shows up. And agents that
take many steps per request use a lot of tokens, which adds up quickly at scale.

## Where to start

If a company asked me where to start with agentic AI for their data and reporting, I'd tell them to start
by reviewing their current data environment and reporting. What systems do they have, how is the data
modeled, what's documented, which reports do people actually use, and where does the time go today? Once
you have that picture, the next steps tend to become obvious, and they're often not agents.

That brings me to the point I most want to make. Agentic AI is great when it has the right guardrails
around it, but not everything needs to be agentic. There are a lot of cases where just automating a
process, without any AI at all, is enough. Before reaching for an agent, it's worth asking whether the
steps are already known. If they are, write the workflow. Save the agents for the work where the path
really does depend on what you find along the way.

Next up, I'll go deeper on MCP servers, including how I set them up and how the guardrails above work in
practice. If you have questions about any of this, or you're working through the same decisions at your
company, I'd like to hear about it. You can find me on
[LinkedIn](https://www.linkedin.com/in/daniel-foster-04536a75).
