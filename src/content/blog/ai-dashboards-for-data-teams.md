---
title: 'AI-Generated Dashboards: When a One-Off HTML Page Is Enough and When to Build an App'
description: 'How I build dashboards with Claude and an MCP server, the difference between a one-off HTML page and a hosted web app, and how to decide which one a request needs.'
pubDate: '2026-11-18'
terms: ['model-context-protocol', 'data-governance', 'data-dictionary']
draft: true
---

AI can build you a dashboard in a few minutes now, but there are two very different things people mean
when they say that. One is a single HTML page, built in a conversation, that shows the data as it was
when you asked. The other is a hosted web app that people sign into and that refreshes with live data.
My rule of thumb is to use the HTML page for a question someone needs answered once, and to build the
hosted app for anything people are going to come back to. The rest of this post explains how I build
both and why that distinction matters.

This is the third post in a series. The [first one](/blog/agentic-ai-for-data-teams/) covered agentic AI
and guardrails, and the [second](/blog/mcp-servers-for-data-teams/) covered the MCP servers that connect
AI to our data. Dashboards are where those two come together, so if you haven't read the MCP post, it's
worth a look first.

## How one gets made

All of my dashboards are built with Claude Code or Claude Desktop, and the data comes from one of our
[MCP servers](/glossary/model-context-protocol/). That's what makes this work as well as it does. The
MCP server already knows how our tables join, how things should be aggregated, and what people mean by
the terms they use, so when I ask for a dashboard, the numbers come from the same place, and follow the
same rules, as every other answer the AI gives.

From there, the process is a conversation. I describe what I want to see, the AI pulls the data through
the MCP server, and it builds the page. I look at it, ask for changes ("break this out by region," "add
the prior period for comparison," "the labels on that chart are crowded"), and it updates the page.
Most of the time I'm looking at a working dashboard after a few rounds of that.

To show what this looks like, I had Claude build a sample dashboard for this post. The company and every
number in it are made up, but the layout is typical of what I'd build for a weekly sales review: a few
headline numbers, a trend line, a ranking by location, and a table you can open if you want the detail.
The filters and the hover details work, so feel free to click around.

<iframe id="sample-dashboard" src="/samples/sample-dashboard.html" title="Sample sales dashboard with made-up data" loading="lazy" style="width: 100%; height: 1300px; border: 1px solid var(--border); border-radius: 8px;"></iframe>
<script>
  window.addEventListener("message", (e) => {
    const h = e.origin === location.origin && e.data && e.data.sampleDashboardHeight;
    if (h) document.getElementById("sample-dashboard").style.height = h + 2 + "px";
  });
</script>

You can also [open the sample dashboard on its own page](/samples/sample-dashboard.html), which gives
it more room.

## One-off HTML pages

The simplest version is a single HTML file. You ask a question, the AI pulls the data and builds the
page, and you end up with a file you can open in any browser, save, or send to someone. There's nothing
to host and nothing to install.

These are great for the kind of request that used to turn into a spreadsheet and an email. Someone
wants to see how a group of locations performed after a price change, or leadership wants a quick
picture of a quarter before a meeting. You build the page, they look at it, and the question is
answered. If it takes ten minutes to make, it doesn't matter much if nobody opens it again next month.

The catch is that an HTML page is a snapshot. It shows the data as it was at the moment it was built,
and if the underlying data changes, the page doesn't know about it. One-off pages can get out of date
quickly, and the real risk is that someone keeps using one after it has. That's why the sample above
says right at the top when its data is from and that it won't update. I'd put a note like that on
every one-off page.

It's also worth remembering that the data is inside the file. When you send someone an HTML dashboard,
you're sending them the data behind it too, and it will go wherever they forward it. For anything
sensitive, that alone can be a reason to build a hosted app instead.

## Hosted web apps

The other version is a web app that lives on a server and pulls live data every time someone opens it.
That's what our online apps are. They sit behind an Entra sign-in, so access is tied to a specific
person, and the numbers are current whenever someone looks.

A hosted app is the right choice when people will come back to the dashboard regularly, when the data
changes often enough that a snapshot would go stale, or when the data is sensitive enough that you want
control over who sees it. Since everyone signs in, you can also shut off one person's access without
affecting anyone else, the same way we handle the MCP servers.

A big advantage is cost. Most BI tools charge per user, and those licenses add up fast once you try to
give dashboards to a whole company. A web app doesn't need a license for every viewer. If you don't
want to pay for licenses, a web app is a great option, and with AI doing most of the building, it's a
much smaller project than it used to be.

That said, a hosted app is something you now own. It needs a place to run, it needs to be kept up to
date, and somebody has to fix it when something changes in the data underneath it. That's a fair
trade for a dashboard people use every week. It's probably not worth it for a question that only gets
asked once.

## Picking between them

When a request comes in, I ask myself a few questions. Will this person need to see it again, or is it
answering one question? Does the data change often enough that a snapshot would be misleading in a
week? Is the data sensitive enough that I don't want copies of it floating around in people's inboxes?
Is this something more than one team is going to rely on?

If the answer to all of those is no, I build the HTML page. If the answer to any of them is yes, it's
probably a hosted app. And sometimes one turns into the other. A one-off page that people keep asking
me to update is a pretty good sign that it should have been an app.

## A few things to watch for

Right now, I'm the one building these, and I think that's the right setup for a team starting out. Even
though the AI does most of the work, someone still needs to look at every dashboard before people rely
on it, and check that the numbers match what they should. The same benchmarks you use to test an MCP
server work here too. If the dashboard says revenue was a certain amount last week, compare it to a
number you already trust.

The guardrails from the first post all still apply. The dashboard gets its data through the same MCP
server, with the same per-person access and the same checks on every query, so building a dashboard
doesn't open up a back door to data someone couldn't already see.

It also helps to keep the design consistent. If every dashboard looks different, people spend their
time figuring out the layout instead of reading the numbers. I'd keep a short set of instructions for
the AI, things like which colors to use, where the filters go, and that every page needs a date at the
top, the same way I keep standing notes for the MCP work.

## Where to start

If you already have an MCP server connected to your data, try asking for a dashboard the next time
someone asks you a question that would normally turn into a spreadsheet. Build it as a one-off page,
put the date on it, and see how it lands. Once you find the ones people keep coming back to, those are
your candidates for a hosted app.

Next in the series, I'll get into case studies on what AI integration looks like at companies with
different levels of AI adoption. If you have questions about any of this, you can find me on
[LinkedIn](https://www.linkedin.com/in/daniel-foster-04536a75).
