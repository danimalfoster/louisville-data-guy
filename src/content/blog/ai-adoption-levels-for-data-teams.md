---
title: 'Four Levels of AI on a Data Team'
description: 'What data and reporting work looks like at four levels of AI adoption, from no approved tools to everyone connected to company data through governed MCP servers, and what it takes to move from one level to the next.'
pubDate: '2026-11-19'
draft: true
terms: ['model-context-protocol', 'data-dictionary', 'data-governance', 'large-language-model', 'hallucination']
---

I've worked at every one of the levels in this post, all at the same company, so I've seen what data
and reporting work looks like at each one. My short answer for anyone trying to figure out where to go
next is that you probably can't jump from the bottom straight to the top, but you can skip more than you
might think. Going from no approved tools straight to giving your data team a coding agent is very
doable, and that's where things start to get interesting. What you can't skip at any level is the due
diligence.

In the last three posts I covered [agentic AI](/blog/agentic-ai-for-data-teams/),
[MCP servers](/blog/mcp-servers-for-data-teams/), and
[building dashboards with AI](/blog/ai-dashboards-for-data-teams/). This one steps back and looks at
how those pieces fit together depending on how far along your company is. I'm using four levels:

1. No approved AI tools.
2. A company-approved chat tool for everyone, with no access to company data.
3. A coding agent like Claude Code for developers and the data team, with chat only for everyone else.
4. Everyone has Claude Desktop, plus Claude Code for the people who need it, connected to company data
   through governed MCP servers.

## Level 1: No Approved Tools

When I started at my current company, there were no approved AI tools. That didn't mean nobody was
using AI. It meant people were using it on their own, with free accounts, and the company had no say in
how.

What I mostly saw was people vibe coding. Someone would tell ChatGPT what they wanted to accomplish,
say a Python script that calls an API, and it would write some generic code. They'd copy and paste that
into a file, run it, copy and paste the error back into ChatGPT, and it would diagnose the error and
write a corrected version. Then they'd do it again until it worked.

That works okay. It's not great, and if you aren't careful you can expose something you shouldn't,
because the easiest way to get a better answer is to paste in your real code, your real error, or your
real data. Free consumer accounts may also use what you paste to train future models, which is one of
the main things a company agreement rules out. At this level, AI is basically Stack Overflow. It can help you troubleshoot, but it doesn't
know anything about your systems.

If you're a data leader stuck at Level 1, here's what I'd suggest. Without access to your systems, the
free versions are most useful for figuring out what's wrong when something breaks, so lean on them for
that, and keep anything real about your company out of them. More importantly, I'd pay for an AI license
myself, build a real project with it (this blog is one example), and then show it to my management team.
Make it a personal project, though, and keep company code and data out of it until a tool has been
approved. A working demo of something you built does a lot more to get tools approved than a slide about
what AI could do, and it won't help your case if the demo breaks the policy you're trying to change.

## Level 2: Chat for Everyone

The thing that surprised me most about Level 2 was how few people used it. Once an approved chat tool
was available to everyone, I expected a rush, and it didn't happen. I think a lot of people just didn't
trust it.

It got more useful once IT security cleared us to paste actual code into the chat sessions, not just
generic examples. It was still wrong a decent amount of the time, and it made assumptions it shouldn't
have, but it was a definite improvement. The biggest frustration was that its technical suggestions
were often wrong or incomplete. If you stuck with it and tried a few things, it would usually get there
in the end.

At this level, AI is like a developer with a lot of experience who has never seen your environment. If
you can describe your problem accurately, it can point you in the right direction, but without knowing
exactly what's going on, it won't always get it right. That's also the limit. It can help you write the
query, but it can't run it, and it can't see what the data actually looks like.

That's why Level 2 didn't reduce requests to the data team at all. The chat tool had no access to the
underlying data, so the business still had to come to us for numbers.

## Level 3: A Coding Agent for the Data Team

Once the data team had Claude Code, the AI could look
at our actual code, update it, or create a new project from scratch. It stopped being someone I
described problems to and became something that could look at the problem itself.

A few examples of what that looks like on a data team:

- With access to our database logging, it can quickly figure out why a query is running long, or which
  indexes would improve performance.
- It can look at an outdated API call and rebuild the same functionality on a newer, supported one.
- It can monitor job logs, alert on failures, diagnose what went wrong, and lay out options for fixing
  it, so I'm choosing a fix instead of starting an investigation.

What didn't change was the request queue from the business. It didn't get any shorter, because the
business still had chat only and still couldn't get to the data. What changed was everything else
competing for my time. The maintenance, troubleshooting, and cleanup work that used to pull me away
from those requests was now mostly being handled by AI, with me reviewing it. So the queue was the same
size, but I had a lot more room to work it. For me personally, Level 3 expanded what I was capable of
and easily made me five times more productive, probably more.

Level 3 needs its own guardrails, and they're easy to overlook because only the data team has the tool.
A coding agent can run commands, read logs, and connect to the database, which makes it a bigger step
than a chat tool. The rules from the [agentic AI post](/blog/agentic-ai-for-data-teams/) start here.
Anything that changes data gets reviewed by a person before it runs, the agent connects with the least
access it needs to do the job, and production credentials stay out of its reach unless there's a
specific reason for it.

## Level 4: Everyone Connected to the Data

At Level 4, business users can ask Claude questions about the data and get the answer I would give,
because the tools behind it use the same data, the same rules, and the same definitions I would. That
holds as long as the tools do the math and the AI reports the result, which is a big part of how ours
are built. They can also pull the raw data themselves instead of asking me for an extract, which saves
a lot of back and forth, but it also means the data can end up in spreadsheets and files I never see. I covered how that works in the
[MCP servers post](/blog/mcp-servers-for-data-teams/), so I'll focus here on what it changed for the
people using it.

Our account managers use it the most. One project I worked on with them was automating ticket creation
for our telecom and data teams. Account managers get a lot of emails from clients, and some of those
emails turn into tickets for another team once all the needed information has come in. I built a skill
and a scheduled routine that reads their incoming emails, and once everything needed for a ticket is
there, Claude asks the account manager to check the ticket and its attachments, then creates it for
them. Claude then keeps track of those tickets, and once one is closed, checks that the work was
actually done correctly. If something looks off, it reports the issue to the account manager, and they
decide what to do about it.

None of that work was hard, but it was tedious, and it ate into time they'd rather spend on their
client meetings. That's where Level 4 really pays off. The account manager still approves every
ticket, so the decisions stay with them, and Claude handles the busywork around those decisions.

That approval step isn't only about getting the ticket right. The routine reads email from outside the
company, has access to our data, and creates tickets, which is the combination I called out in the
[agentic AI post](/blog/agentic-ai-for-data-teams/) as the highest risk for prompt injection. Someone
could write instructions into an email, and the AI might try to follow them. Having a person look at
every ticket before it's created is what keeps that from turning into a real problem.

Getting people to use it took some planning, because the trust problem from Level 2 didn't go away on
its own. What worked was recruiting a few influential people as beta users to test the MCP server with
Claude Desktop and Claude Code. Once they realized how powerful it was, they started using it a lot.
Other people noticed them using it and started asking for access.

The gains at Level 4 are harder for me to put a number on than Level 3, because most of them show up on
other teams rather than mine.

Level 4 is also the one that takes the most work to get right. Before you connect everyone to your data,
you need to have a few things in place. You need a [data dictionary](/glossary/data-dictionary/), so the
AI understands your data the way your analysts do, and clean permissions, so people only see what
they're supposed to. You need a thorough vetting process to make sure the MCP server is actually giving
correct answers, which means testing it against questions you already know the answers to. And you need
security processes to protect the data, which I covered in the
[guardrails section of the agentic AI post](/blog/agentic-ai-for-data-teams/).

## Moving Up

When a team gets stuck at a level, it's usually not one thing. It's some mix of cost, security and
legal sign-off, leadership interest, and data that isn't ready. In my experience, it's been all of
them at one point or another, which is why the demo I suggested at Level 1 helps. It gives leadership
something concrete to react to, and it gives security and legal a specific use case to review instead
of "AI" in general.

I don't know that you could go from Level 1 to Level 4 smoothly. There's too much to put in place at
once, and the business would be relying on AI answers before the data team had any experience making
sure those answers were right. But you can go from Level 1 straight to Level 3, and then on
to Level 4. Nothing about Level 2 is a prerequisite for Level 3, and I don't see any benefit to adopting
AI slowly. Level 4 is different, because Level 3 is where you lay the foundation for it. Level 3 is where the data team learns how these tools behave, where they're strong, and
where they need watching, and that's the experience you need before you hand them to everyone else.

AI, applied correctly, can make a data team a lot more efficient and do better work. But you can't skip
the due diligence when you're getting started, at any level. If you're working through this at your
company and want to compare notes, you can find me on
[LinkedIn](https://www.linkedin.com/in/daniel-foster-04536a75).
