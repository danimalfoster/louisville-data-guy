---
term: 'Data lakehouse'
short: 'An architecture that adds warehouse features, like transactions, schemas, and fast SQL, on top of low-cost data lake storage.'
category: 'Data warehousing'
related: ['data-lake', 'data-warehouse', 'etl-vs-elt']
---

A data lakehouse tries to give you the best of both a [data lake](/glossary/data-lake/) and a
[data warehouse](/glossary/data-warehouse/) in one system. Data lives in open file formats on cheap cloud
storage, like a lake. A table format layer on top (Delta Lake, Apache Iceberg, or Apache Hudi) adds the
things that used to require a warehouse:

- **Reliable updates.** Changes either fully succeed or fully fail, so readers never see half-loaded data.
- **Schemas.** Tables have defined columns and types, and bad data can be rejected on the way in.
- **Time travel.** You can query a table as it looked yesterday or roll back a bad load.
- **Fast SQL.** Engines like Databricks SQL, Snowflake, Trino, and Spark can query the same tables.

Because the files are in an open format, different tools can work on the same data without copying it.
Data scientists can train models in Python while analysts run SQL reports on the same tables.

## An example

A healthcare company used to copy data from its lake into a separate warehouse every night, which meant
two copies, two bills, and numbers that occasionally disagreed. After moving to a lakehouse, it keeps one
copy of each table in Iceberg format. The reporting team queries it with SQL, and the data science team
reads the same tables to build models.

## Where people get it wrong

**"Lakehouse means we can skip data modeling."** The storage changed, not the need for clean, well-designed
tables. Most lakehouses still organize data into layers (often called bronze, silver, and gold), and the
gold layer looks a lot like a traditional [dimensional model](/glossary/dimensional-modeling/).

**"It's a product."** Lakehouse is an architecture. Several vendors sell platforms for it, but the
concept is not tied to any one of them.
