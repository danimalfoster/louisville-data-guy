---
term: 'Data quality'
short: 'How well data fits its intended use, usually measured by accuracy, completeness, consistency, timeliness, validity, and uniqueness.'
category: 'Data management'
related: ['data-governance', 'data-lineage', 'master-data-management', 'etl-vs-elt']
---

Data quality is not about perfect data. It is about data that is good enough for the decision it
supports. A marketing email list can tolerate a few bad addresses. A regulatory report or a payroll run
cannot.

Quality is usually broken into a handful of dimensions:

- **Accuracy:** does the value match reality? (Is this the customer's real address?)
- **Completeness:** are required values present? (What share of orders has no ship date?)
- **Consistency:** do systems agree? (Does the order total match the sum of its lines?)
- **Timeliness:** is the data fresh enough? (Did last night's load finish?)
- **Validity:** does it follow the rules? (Is every state code a real state?)
- **Uniqueness:** is each thing recorded once? (Do we have duplicate customers?)

## Testing for quality

Modern data teams test data the way software teams test code. Automated checks run every time data
loads: row counts within expected ranges, no nulls in key columns, no duplicate IDs, totals that match
the source system. Tools like dbt tests, Great Expectations, Soda, and data observability platforms
make this routine. When a check fails, the pipeline stops or alerts someone before a bad number reaches
a dashboard.

## An example

A bank's daily deposit report suddenly shows a 40% drop. A row-count check would have caught it at
6 a.m.: one branch's file arrived empty because of an upstream outage. Without the check, the executive
team found it at 9 a.m. in a meeting, and trust in the report took weeks to recover.

## Where people get it wrong

**"Fix it in the warehouse."** Cleaning data downstream treats symptoms. The lasting fix is usually
upstream: a required field in the entry form, a validation rule in the source system, or a clear owner
through [data governance](/glossary/data-governance/).

**"Quality is a one-time cleanup project."** Data degrades constantly as people move, systems change,
and new sources arrive. Quality needs ongoing monitoring, not a single scrub.
