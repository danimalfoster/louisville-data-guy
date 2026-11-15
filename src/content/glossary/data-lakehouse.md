---
term: 'Data lakehouse'
short: 'An architecture that adds warehouse features, like transactions, schemas, and fast SQL, on top of low-cost data lake storage.'
category: 'Data warehousing'
related: ['data-lake', 'data-warehouse', 'etl-vs-elt']
---

For a long time, a lot of companies ran two systems side by side. They had a
[data lake](/glossary/data-lake/) for cheap storage of raw data and a
[data warehouse](/glossary/data-warehouse/) for clean, reliable reporting, with a nightly process
copying data from one to the other. That meant two copies of the data, two bills, and every so often,
two numbers that didn't agree. A data lakehouse is an attempt to do both jobs in one place.

The data still lives in open file formats on inexpensive cloud storage, like a lake. What changes is a
table format layered on top, usually Delta Lake, Apache Iceberg, or Apache Hudi. That layer adds the
things you used to need a warehouse for. Updates either fully succeed or fully fail, so nobody queries
a half-loaded table. Tables have defined columns and data types. You can look at a table as it was
yesterday or roll back a bad load. And SQL engines like Databricks, Snowflake, Trino, and Spark can all
query the same tables, so your analysts can write SQL while your data scientists work in Python against
the exact same data.

Lakehouse is an architecture, not a product. Several vendors sell platforms for it, but the idea isn't
tied to any one of them, and that matters more than it might seem. I've worked in situations where
different parts of the business ran on completely different cloud platforms, one on Microsoft, one on
Google, one on Oracle. In that kind of environment, my advice is to settle the long-term platform plan
before starting any major new data project. If everything is eventually moving to one platform, you
should probably build there from the start. Open table formats help here because they make it easier to
move or share data later, but they don't replace having a plan.

I'd also push back on the idea that a lakehouse means you can skip data modeling. The storage changed,
not the need for well-designed tables. Most lakehouses still organize data into layers, often called
bronze, silver, and gold, and the gold layer ends up looking a lot like a traditional
[dimensional model](/glossary/dimensional-modeling/).
