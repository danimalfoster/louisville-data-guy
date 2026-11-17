---
title: 'MCP Servers for Data Teams: How I Built Ours and Why the Data Dictionary Comes First'
description: 'How I use MCP servers to answer the business questions that used to land in my inbox, how they are set up, who uses them, and why a data dictionary is the first thing to build.'
pubDate: '2026-11-17'
terms: ['model-context-protocol', 'data-dictionary', 'text-to-sql', 'semantic-layer', 'data-quality', 'large-language-model', 'hallucination']
draft: true
---

If you're on a data team and you're thinking about building an MCP server, my advice is to start with a
data dictionary. Before you write a single tool, get your table definitions, join logic, aggregation
rules, and business terms written down somewhere the AI can read them. Everything else gets a lot
easier once you and the AI agree on how to search, connect, and interpret your data. I'll get into why
below, but I wanted to put that first, because it's the thing I'd most want someone to take away from
this post.

In my [last post](/blog/agentic-ai-for-data-teams/), I said I'd go deeper on MCP servers. This is that
post. I'll cover why I built the first one, how they're set up, what the tools actually do, who uses
them, and what I've learned along the way.

## Why I built the first one

Like a lot of people on data teams, I got a steady stream of ad-hoc questions from the business. "Brand
A's numbers look off today, can you look into it?" "What are the price book entries for this franchise?"
"How many active locations do we have across all brands?" None of these were hard. The answers were
already available in our BI reports. But I found that some of my coworkers just weren't going to open
a report, no matter how well it was built. They were going to send me a message, and I was going to run
a query or check the report for them.

So I started looking into how we could connect an AI chatbot to our data, and that's how I came across
MCP. The [Model Context Protocol](/glossary/model-context-protocol/) is an open standard for connecting
AI assistants to outside tools and data. Think of it as a menu you hand the AI. Each item on the menu is
a tool, with a description of what it does and what it needs, and the AI decides which ones to order
based on the question it's been asked.

With an MCP server in place, our users can ask the AI the exact same question they would have asked me,
and get the same answer, without me spending time running a SQL query or pulling up a report. That was
the whole goal. It wasn't to replace the reports. It was to meet people where they already were, which
for a lot of them is typing a question to somebody.

## How they're set up

Our servers are written in Python using FastMCP, a framework that takes care of most of the protocol
details so you can focus on the tools themselves. People connect to them through Claude Desktop and
Claude Code.

A tool in FastMCP is just a Python function with a decorator and a good description. Here's a
simplified example of the kind of thing I mean (not our actual code):

```python
from fastmcp import FastMCP

mcp = FastMCP("Reporting")

@mcp.tool
def active_location_count(brand: str | None = None) -> dict:
    """Count locations that are currently active.

    A location is active when it has opened and has no close date.
    If a brand is given, it is matched against the brand list. When the
    name does not match exactly, possible matches are returned instead
    of a count.
    """
    ...
```

That docstring matters more than it looks. It's what the AI reads when it decides whether to use the
tool and how to fill in the inputs. A vague description gets you vague tool choices.

## Two kinds of tools

The tools I've built fall into two groups, reporting tools for business users and automation tools for
our technical users.

The reporting tools expose our reporting data to everyone, so all of our internal teams are working off
the same numbers. Behind the scenes, they carry the rules for how tables join, how things get
aggregated, how searches should work, and how to translate the way people normally talk ("our active
stores," "last month's revenue") into the right tool and the right filters. When a request is
ambiguous, the tool returns a list of candidates instead of guessing. If someone asks about a brand and
the name matches two or three things, the AI shows them the options and asks which one they meant.

The automation tools are different. Each one encodes a business process step by step, with validation
built into every step, so there's no guesswork about what happens next. They're closer to scenario 2
from the last post than to a free-roaming agent. This group also includes diagnostic tools that monitor
[data quality](/glossary/data-quality/) and database integrity. Those tools find problems and report
them. A person decides what to do about them.

## Who uses them

At this point, the servers cover a pretty wide range of teams, including accounting, account
management, executives, the call center, sales, and our analysts.

Most of those teams share one server, but the call center has its own, and the reason is a good example
of why role-specific servers make sense. The call center works with data that most of the organization
doesn't care about. They need reporting at the individual agent level, often broken out in 30-minute
increments. Everyone else is looking at data rolled up by brand, franchise, or location by day. Putting
both in one server would mean a lot of tools most users never need, and more chances for the AI to pick
the wrong one. Keeping them separate makes each server simpler and more accurate for the people using
it.

## The data dictionary

This is the part I'd spend the most time on if I were starting over, and it's the reason for the advice
at the top.

When I started building the first server, we didn't have a [data dictionary](/glossary/data-dictionary/).
I built one over time, with AI's help, while I was working on that server, and it has turned out to be
the most valuable thing to come out of the whole effort. Ours includes table and column definitions,
the join logic between tables, rules for aggregation, business rules, and a glossary of what users
typically mean when they use certain terms. That last part is easy to overlook. When an account manager
says "active," they may mean something slightly different than finance does, and the AI needs to know
that.

The reason it matters so much is that an AI model has no idea how your database works. It can read
table and column names, and it will make reasonable guesses from them, but reasonable guesses on data
are how you end up with a confident wrong answer. A good data dictionary gives the AI a working
knowledge of your database, the same way it would for a new analyst on their first week.

It also pays off well beyond the first project. Every project since then has started from that same
foundation, so I'm not explaining the database from scratch each time. If you've read about
[semantic layers](/glossary/semantic-layer/), a data dictionary covers a lot of the same ground, and
it's a much smaller project to get started on.

## Testing, and accepting that it's never finished

Before you put an MCP server in front of people, build a solid set of benchmarks and test cases. Take
the questions people actually ask, figure out the correct answers yourself, and check that the server
gets the same results. Run those again every time you change something.

That said, there will always be edge cases, things you missed, and things that need to be tweaked once
real people start using it. The important thing is to treat it as a living, iterative process rather
than a project you finish and hand off. The good news is that AI makes those updates fast. When
something needs to change, whether that's a tool description, a business rule, or a whole new tool, I
can usually make the change and test it quickly, and sometimes pivot entirely if the first approach
wasn't right.

## How people have taken to it

Honestly, it's been mixed. Some teams have really embraced it, and some haven't. My view is that people
who ignore AI tools do so at their own peril, because the gap between people who use them well and
people who don't is only going to grow.

What I can say is that a well-designed MCP server is very intuitive for the end user. You ask a question
and get an answer. There's no report to find, no filters to set, no SQL to write.

Where it really opens up is when you use an MCP server inside a Claude Desktop or Claude Code
conversation. Now you have the data, and you have an AI that can work with your files and your
computer. You can export the results, turn them into a presentation, or build an HTML dashboard from
them, all in the same conversation. At that point, your main constraints are your imagination and the
permissions your organization has given you. I'll get into the dashboard side of this in the next post.

## The guardrails still apply

I covered guardrails in detail in the [agentic AI post](/blog/agentic-ai-for-data-teams/), and all of
them apply here. Each user has their own API key, the servers are split by role, every query the AI
writes is checked before it runs, anything that changes data needs a person to approve it, and
everything gets logged. I won't repeat all of it, but I'd read that section before building anything
that connects AI to your production data.

## Where to start

If you want to try this at your company, start with the data dictionary. Document your most-used tables
first, how they join, how they should be aggregated, and what the business means by the terms it uses
most. Use AI to help you write it, and check what it writes. Once you have that, pick a handful of the
questions your team answers over and over, build tools for those, and test them against answers you
already know are right. You can grow it from there.

If you have questions about any of this, or you're working through something similar, I'd like to hear
about it. You can find me on [LinkedIn](https://www.linkedin.com/in/daniel-foster-04536a75).
