---
term: 'Data lineage'
short: 'A map of where data comes from, how it is transformed, and where it goes, from source systems through to reports and models.'
category: 'Data management'
related: ['data-catalog', 'data-quality', 'data-governance', 'etl-vs-elt']
---

Data lineage traces a piece of data through its whole life. For any number on a dashboard, lineage
shows which tables fed it, which transformations changed it, and which source systems it ultimately
came from. In the other direction, it shows everything downstream that depends on a given table or
column.

Lineage is typically shown as a graph: boxes for tables, reports, and models, with arrows showing how
data flows between them. It can be tracked at the table level (this table feeds that one) or at the
column level (this revenue column is calculated from these three source columns).

## Why it matters

- **Debugging.** When a number looks wrong, lineage tells you where to look instead of guessing.
- **Impact analysis.** Before changing or retiring a table, you can see every report and model that
  would break.
- **Compliance.** Regulators and auditors increasingly ask organizations to show where reported figures
  come from, and where sensitive data like Social Security numbers flows.
- **Trust.** Users are more willing to rely on a number when they can see how it was built.

## An example

The finance team plans to rename a column in the billing database. Lineage shows that column feeds 4
warehouse tables, 11 dashboards, and a churn prediction model. The change is scheduled with the
downstream owners instead of being discovered when month-end reports fail.

## Where people get it wrong

**"We'll document lineage by hand."** Hand-drawn lineage diagrams are out of date almost as soon as they
are finished. Lineage is most useful when it is captured automatically from query logs, transformation
tools like dbt, and a [data catalog](/glossary/data-catalog/).

**"Lineage is only for engineers."** Business users benefit just as much. Being able to click on a
dashboard metric and see its source is one of the fastest ways to build trust in data.
