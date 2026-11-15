---
term: 'Fact table'
short: 'The central table in a dimensional model, with one row per business event and the numeric measures for that event.'
category: 'Data warehousing'
related: ['dimension-table', 'star-schema', 'dimensional-modeling']
---

A fact table records things that happened: a sale, a payment, a website visit, a claim. Each row holds
two kinds of columns:

- **Keys** that point to [dimension tables](/glossary/dimension-table/) (which customer, which product,
  which date).
- **Measures**, the numbers you analyze: quantity, amount, duration, count.

Fact tables are usually the largest tables in a [data warehouse](/glossary/data-warehouse/), often
billions of rows, and they are narrow compared with dimension tables.

## The grain

The most important decision about a fact table is its **grain**: what exactly one row represents. "One
row per order line" and "one row per order" produce very different tables. Mixing grains in one table,
for example storing order totals on every order line, is the most common cause of numbers that are
mysteriously double or triple what they should be.

## Three common types

- **Transaction facts:** one row per event, such as each payment. The most common type.
- **Periodic snapshots:** one row per item per period, such as every account's balance at month end.
  Useful for things you measure rather than count.
- **Accumulating snapshots:** one row per process that is updated as it moves through steps, such as a
  loan application with dates for submitted, approved, and funded.

## An example

A hospital's `fact_patient_visit` table has one row per visit. Keys point to patient, provider,
department, and date. Measures are length of stay, charges, and a visit count of 1 (which makes "number
of visits" a simple sum).

## Where people get it wrong

**"All numbers can be added up."** Revenue can be summed across any dimension. Account balances cannot
be summed across months, and percentages cannot be summed at all. Knowing which measures are additive,
semi-additive, or non-additive prevents a lot of wrong dashboards.
