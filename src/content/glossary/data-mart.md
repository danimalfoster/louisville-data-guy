---
term: 'Data mart'
short: 'A smaller, subject-focused slice of a data warehouse built for one department or business area, such as finance or marketing.'
category: 'Data warehousing'
related: ['data-warehouse', 'dimensional-modeling', 'dimension-table']
---

A data mart is a subset of data organized around one subject or team. Where a
[data warehouse](/glossary/data-warehouse/) covers the whole organization, a finance mart holds just the
general ledger, budgets, and cost centers, and a marketing mart holds campaigns, leads, and web traffic.
Marts are usually built as [star schemas](/glossary/star-schema/) so the department's analysts can find
what they need without wading through everything else.

There are two classic ways to build them:

- **Top-down (Inmon):** build an integrated enterprise warehouse first, then publish marts from it. Every
  mart draws from the same cleaned data.
- **Bottom-up (Kimball):** build marts one business process at a time, but share conformed
  [dimensions](/glossary/dimension-table/) like customer and date across them, so together they add up
  to an enterprise warehouse.

Both approaches work. What matters is that marts share definitions instead of each inventing its own.

## An example

A hospital system builds a revenue cycle mart for its billing department. It contains claims, payments,
denials, and payer details, modeled for questions like "What is our denial rate by payer this quarter?"
The quality team gets a separate clinical mart. Both use the same patient, provider, and date dimensions,
so a patient count means the same thing in each.

## Where people get it wrong

**"Each department should own its own mart, end to end."** Independent marts built from separate
extracts, with their own definitions, are how organizations end up with three different revenue numbers
in the same meeting. Department focus is fine. Department-specific definitions of shared things are not.

**"Marts are obsolete in the cloud."** The physical separation matters less now, since everything can
live on one platform. But the idea of curated, subject-focused data sets for each audience is alive and
well, often under names like "data products" or "gold layer."
