---
term: 'Data catalog'
short: 'A searchable inventory of an organization''s data assets, with descriptions, owners, definitions, and usage, so people can find and understand data.'
category: 'Data management'
related: ['data-governance', 'data-lineage', 'semantic-layer', 'data-dictionary']
---

A data catalog works a lot like a library catalog, but for data. Instead of asking around to find out
which table has customer churn data, who owns it, and whether it can be trusted, you search the catalog.

A good catalog entry tells you what the data is (and what it isn't) in plain English, who owns it and who
to contact with questions, what each column means, where the data comes from and what depends on it (see
[data lineage](/glossary/data-lineage/)), when it was last refreshed and whether its quality checks
passed, and whether it contains sensitive information. Some of the popular options are Alation, Collibra,
Atlan, Microsoft Purview, and Unity Catalog in Databricks, along with open-source tools like DataHub and
OpenMetadata.

Here's the difference it makes. A new analyst needs patient readmission data. They search "readmission"
and find three tables. One is marked certified, owned by the quality department, refreshed daily, and
used by the official readmissions dashboard. The other two are marked deprecated. The analyst picks the
right one in five minutes, instead of spending two days emailing people, or worse, picking the wrong one
and building a report on it.

One thing to be realistic about is that a catalog won't fill itself in. Catalogs can automatically
collect the technical details, like table names, columns, and lineage. The business context, meaning the
descriptions, definitions, and who owns what, still has to come from people. That's where most of the
value is, and it's also the part that tends to get skipped.

I'd argue catalogs matter even more now because of AI. When I connect an AI assistant to a database, the
quality of its answers depends heavily on whether it can read good descriptions of the tables and columns.
Without them, it's guessing from names like "cust_stat_cd." With them, it can figure out which table to
use and what the fields actually mean (see [text-to-SQL](/glossary/text-to-sql/)).
