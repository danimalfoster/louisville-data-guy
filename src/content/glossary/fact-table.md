---
term: 'Fact Table'
short: 'The central table in a dimensional model, with one row per business event and the numeric measures for that event.'
category: 'Data warehousing'
related: ['dimension-table', 'star-schema', 'dimensional-modeling']
---

A fact table records things that happened, like a sale, a payment, a phone call, or a claim. Each row
has keys that point to [dimension tables](/glossary/dimension-table/) (which customer, which product,
which day) and measures, which are the numbers you'll analyze, like quantity, amount, or duration. Fact
tables are usually the biggest tables in a [data warehouse](/glossary/data-warehouse/), often running
into the billions of rows, but they tend to be narrow compared to the dimensions around them.

The most important decision about a fact table is its grain, meaning exactly what one row represents.
I've seen a lot of reporting problems trace back to a fact table that mixed grains, for example storing
the order total on every order line. Somebody sums that column, and the total comes out double or
triple what it should be. It's an easy mistake to make and a hard one to spot once a report is in
production, so it's worth being very explicit about the grain up front.

There are three common types you'll run into. Transaction fact tables have one row per event, like each
payment, and they're the most common. Periodic snapshots have one row per item per period, like every
account's balance at the end of each month, which is useful for things you measure rather than count.
Accumulating snapshots have one row per process that gets updated as it moves through its steps, like a
loan application with dates for when it was submitted, approved, and funded.

As an example, a hospital might have a patient visit fact table with one row per visit. The keys point
to patient, provider, department, and date. The measures are length of stay, charges, and a visit count
that's always 1, which sounds odd but makes "number of visits" a simple sum.

One more thing to watch for is that not every number can be added up. Revenue can be summed across
anything. Account balances can be summed across accounts but not across months, because adding January's
balance to February's doesn't mean anything. Percentages can't be summed at all. Knowing which of your
measures fall into which bucket will save you from a lot of wrong dashboards.
