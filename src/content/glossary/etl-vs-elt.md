---
term: 'ETL vs. ELT'
short: 'Two ways to move data into a warehouse: ETL transforms data before loading it, while ELT loads raw data first and transforms it inside the warehouse.'
category: 'Data warehousing'
related: ['data-warehouse', 'data-lakehouse', 'data-lineage', 'data-quality']
---

Both terms describe the same three steps. You extract data from the source systems, transform it
(clean it, combine it, reshape it), and load it into a [data warehouse](/glossary/data-warehouse/) or
[lakehouse](/glossary/data-lakehouse/). The difference is the order.

ETL, extract, transform, load, was the standard for decades. A separate tool like Informatica, SSIS, or
DataStage did the transforming on its own servers, and only the finished result got loaded into the
warehouse. That made sense when warehouse storage and processing power were expensive, and a lot of my
early hands-on work, importing files, cleansing them, validating them, happened in exactly that kind
of setup.

ELT, extract, load, transform, took over with cloud warehouses. Raw data gets loaded first, often with
a tool like Fivetran or Airbyte, and then transformed with SQL inside the warehouse, usually managed
with something like dbt. Cloud warehouses scale up cheaply, so it's simpler to do the heavy lifting
there. The bigger advantage, in my opinion, is that you keep the raw data. Say a retailer has been
loading daily sales totals by store, and finance asks for sales by hour. With ETL, you have to change
the pipeline and reload history, if the source still has it. With ELT, the raw transactions are already
sitting in the warehouse, and you write a new model.

For most teams starting fresh in the cloud, I'd go with ELT. That said, ETL still makes sense in some
cases, especially when data has to be masked or filtered before it lands anywhere. Having worked in
healthcare, I've seen plenty of situations where patient identifiers shouldn't reach the warehouse at
all, and that's a transform you want to happen first.

The other thing I'd mention is that the extract and load steps are mostly a solved problem now, with
plenty of off-the-shelf tools. The transform is where your business rules live. It's where most of the
effort goes, and it's where most [data quality](/glossary/data-quality/) problems either get caught
or get created.
