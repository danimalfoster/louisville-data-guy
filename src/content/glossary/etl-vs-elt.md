---
term: 'ETL vs. ELT'
short: 'Two ways to move data into a warehouse: ETL transforms data before loading it, while ELT loads raw data first and transforms it inside the warehouse.'
category: 'Data warehousing'
related: ['data-warehouse', 'data-lakehouse', 'data-lineage', 'data-quality']
---

Both terms describe the same three steps, in a different order:

- **Extract:** pull data out of source systems.
- **Transform:** clean, combine, and reshape it.
- **Load:** write it into the [data warehouse](/glossary/data-warehouse/) or
  [lakehouse](/glossary/data-lakehouse/).

**ETL** (extract, transform, load) was the standard for decades. A separate tool, such as Informatica,
SSIS, or DataStage, transformed the data on its own servers and loaded only the finished result. This
made sense when warehouse storage and computing power were expensive.

**ELT** (extract, load, transform) became common with cloud warehouses. Raw data is loaded first, often
by a tool like Fivetran or Airbyte, and then transformed with SQL inside the warehouse, usually managed
with a tool like dbt. Cloud warehouses scale cheaply, so it is simpler to do the heavy lifting there.

## An example

A retailer needs daily sales by store. With ETL, a nightly job reads the point-of-sale database,
calculates totals, and loads one summary table. With ELT, every raw transaction is loaded into the
warehouse, and a SQL model builds the daily summary from it. When finance later asks for sales by hour,
the ELT team already has the raw data and only needs a new model. The ETL team has to change the
pipeline and reload history.

## Where people get it wrong

**"ELT is always better."** ELT is usually simpler in the cloud, but ETL still makes sense when data must
be masked or filtered before it lands (for example, removing patient identifiers), or when the
destination is expensive to compute in.

**"The T is the easy part."** Extraction and loading are mostly solved by off-the-shelf tools today.
Transformation is where the business rules live, and it is where most of the effort and most of the
[data quality](/glossary/data-quality/) problems are.
