---
term: 'Data quality'
short: 'How well data fits its intended use, usually measured by accuracy, completeness, consistency, timeliness, validity, and uniqueness.'
category: 'Data management'
related: ['data-governance', 'data-lineage', 'master-data-management', 'etl-vs-elt']
---

When someone says a report is wrong, what they usually mean is that the data behind it has a quality
problem. A value is missing, a record got duplicated, last night's load didn't finish, or two systems
disagree about the same customer. Data quality is the term for how well your data holds up for what
you're using it for. That last part matters, because the data doesn't have to be perfect. A marketing
email list can live with a few bad addresses. Payroll and invoicing can't.

The standard way to break it down is into a handful of dimensions: accuracy (does the value match
reality), completeness (is anything missing), consistency (do the systems agree), timeliness (is it
current enough), validity (does it follow the rules, like a real state code), and uniqueness (is each
thing recorded once). You don't need to memorize these. I find them most useful as a checklist when
I'm trying to figure out what kind of problem I'm looking at.

The part I'd stress is what bad data does to trust. In my experience, the technical fix is usually the
easy part. The hard part is that once a business team catches a wrong number in a report, they stop
trusting every number in that report, and often the data team in general. I've spent a good part of my
career rebuilding that confidence, and it takes a lot longer to earn back than it took to lose. What
works is communicating often, being upfront when something is wrong, and then delivering what you said
you would, when you said you would, over and over.

That's why I recommend catching problems before the business does. Most data teams now test their data
the way software teams test code. Every time data loads, automated checks look for things like row
counts outside the normal range, empty key columns, duplicate IDs, or totals that don't match the
source system. Tools like dbt tests, Great Expectations, and Soda make this pretty routine. When a check
fails, the pipeline stops or someone gets an alert, and you're the one telling stakeholders about a
delay instead of them telling you the numbers look off.

A couple of things I'd caution against. First, it's tempting to clean everything up in the warehouse
and call it fixed. That treats the symptom. If the bad data starts with a free-text field on an entry
screen, the lasting fix is upstream, like making the field required or turning it into a dropdown, and
that takes someone on the business side who owns the data (this is where
[data governance](/glossary/data-governance/) comes in). Second, data quality isn't a one-time cleanup
project. People move, systems change, new sources get added, and quality slips unless someone is
keeping an eye on it.
