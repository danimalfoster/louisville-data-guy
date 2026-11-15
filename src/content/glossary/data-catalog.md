---
term: 'Data catalog'
short: 'A searchable inventory of an organization''s data assets, with descriptions, owners, definitions, and usage, so people can find and understand data.'
category: 'Data management'
related: ['data-governance', 'data-lineage', 'semantic-layer', 'data-lake']
---

A data catalog works like a library catalog for data. Instead of asking around to find out which table
has customer churn data, who owns it, and whether it can be trusted, you search the catalog.

A good catalog entry for a table includes:

- **A plain-English description** of what the data is and is not.
- **The owner and steward** to contact with questions.
- **Column definitions**, often linked to an agreed business glossary.
- **[Lineage](/glossary/data-lineage/)**, showing where the data comes from and what uses it.
- **Quality and freshness signals**, like when it last loaded and whether tests passed.
- **Usage**, such as who queries it most and which dashboards depend on it.
- **Sensitivity tags** that mark personal or regulated data.

Popular catalogs include Alation, Collibra, Atlan, Microsoft Purview, Unity Catalog in Databricks, and
open-source tools like DataHub and OpenMetadata.

## An example

A new analyst needs patient readmission data. Searching "readmission" in the catalog turns up three
tables. One is marked *certified*, owned by the quality department, refreshed daily, and used by the
official readmissions dashboard. The other two are marked *deprecated*. The analyst picks the right one
in five minutes instead of spending two days asking around.

## Where people get it wrong

**"Install the catalog and it fills itself."** Catalogs can automatically collect technical details like
table names, columns, and lineage. The business context, meaning descriptions, definitions, and
ownership, still has to come from people, and that is where most of the value is.

**"Catalogs are only for humans."** Catalog metadata is becoming essential for AI. An AI assistant that
writes SQL for business users (see [text-to-SQL](/glossary/text-to-sql/)) does much better when it can
read table descriptions and definitions instead of guessing from column names.
