---
term: 'Data warehouse'
short: 'A central database built for reporting and analysis, holding cleaned, integrated data from many source systems.'
category: 'Data warehousing'
related: ['data-lake', 'data-lakehouse', 'etl-vs-elt', 'dimensional-modeling', 'data-mart']
---

A data warehouse is where an organization brings together data from its operational systems (billing,
CRM, ERP, web analytics, and so on) so people can analyze it in one place. The source systems are built
to run the business one transaction at a time. The warehouse is built to answer questions across
millions of transactions at once: what sold, where, to whom, and how that compares to last year.

Three things make a warehouse different from simply copying databases into one server:

- **Integration.** A customer who appears as "ACME Corp" in billing and "Acme Corporation" in the CRM
  becomes one customer.
- **History.** Source systems often overwrite old values. A warehouse keeps them, so you can report on
  what was true at any point in time (see [slowly changing dimension](/glossary/slowly-changing-dimension/)).
- **Structure for analysis.** Data is usually organized into
  [fact tables](/glossary/fact-table/) and [dimension tables](/glossary/dimension-table/) so queries are
  fast and easy to write.

## An example

A regional bank has loan data in one system, deposits in another, and branch information in a
spreadsheet. Its warehouse loads all three every night, standardizes branch codes, and lets an analyst
answer "Which branches grew both deposits and loans last quarter?" with one query instead of three
exports and a weekend in Excel.

## Where people get it wrong

**"The warehouse is a technology purchase."** Snowflake, BigQuery, Redshift, Databricks, and SQL Server
are platforms you can build a warehouse on. The warehouse itself is the modeled, trusted data, and most
of the work is in agreeing on definitions and keeping data quality high.

**"We have a data lake, so we don't need a warehouse."** A [data lake](/glossary/data-lake/) stores raw
data cheaply. Someone still has to clean and model it before business users can trust the numbers. That
modeled layer is a warehouse, whatever you call it.
