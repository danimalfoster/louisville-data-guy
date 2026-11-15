---
term: 'Dimensional modeling'
short: 'A way of designing warehouse tables around business processes, splitting data into measurable facts and descriptive dimensions.'
category: 'Data warehousing'
related: ['star-schema', 'fact-table', 'dimension-table', 'slowly-changing-dimension', 'data-mart']
---

Dimensional modeling is the most common way to design the tables in a
[data warehouse](/glossary/data-warehouse/). Ralph Kimball popularized it in the 1990s, and it's still
the default today, including on modern cloud platforms. The basic idea is to sort data into two kinds
of tables. [Fact tables](/glossary/fact-table/) record business events and the numbers that go with
them, like a sale and its amount or a claim and what was paid. [Dimension tables](/glossary/dimension-table/)
describe the who, what, where, and when around those events, like the customer, the product, the store,
and the date. Put together, they form a [star schema](/glossary/star-schema/).

The design is intentionally simple. Business users can look at it and understand it, and reporting
tools can query it quickly. That simplicity is a big part of why it has lasted.

Kimball laid out four steps for designing a model, and they still make a good checklist:

1. Choose the business process you're modeling, like order fulfillment or patient visits.
2. Declare the grain, meaning exactly what one row in the fact table represents.
3. Identify the dimensions that describe each row.
4. Identify the facts, the numbers people will add up or average.

If I had to pick the step teams most often rush, it's the grain. "One row per order" and "one row per
order line" sound close, but they produce very different tables, and getting it wrong is how you end up
with numbers that are double what they should be.

Here's what that looks like for insurance claims. The grain is one row per claim line. The dimensions
are policyholder, provider, date of service, and diagnosis. The facts are billed amount, allowed amount,
and paid amount. Now an analyst can ask for paid amount by provider by month without knowing anything
about how the claims system stores its data.

You'll sometimes hear that dimensional models are outdated now that storage is cheap. Some of the
details have changed, like how much you pre-summarize, but business users still think in terms of
facts and dimensions. I'd also argue a clean dimensional model matters more now than it used to,
because it gives AI tools a much clearer structure to query (see [text-to-SQL](/glossary/text-to-sql/)).
