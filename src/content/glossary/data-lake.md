---
term: 'Data lake'
short: 'A low-cost storage repository that holds large amounts of raw data in its original format until someone needs it.'
category: 'Data warehousing'
related: ['data-warehouse', 'data-lakehouse', 'etl-vs-elt', 'data-catalog']
---

A data lake is a place to store data of any kind (database extracts, log files, JSON from APIs, images,
PDFs) without deciding up front how it will be used. Data usually lands in cloud object storage such as
Amazon S3, Azure Data Lake Storage, or Google Cloud Storage, in open file formats like Parquet, CSV, or
JSON.

The idea is "store now, structure later." A [data warehouse](/glossary/data-warehouse/) requires you to
design tables before loading data. A lake lets you keep everything cheaply and apply structure only when
you read it, which is called *schema-on-read*.

## An example

A software company streams every click from its app into a data lake, around a billion events a month.
Nobody reports on raw clicks directly. But when the product team wants to study how a new feature is
used, data engineers can go back to the full history in the lake and build exactly the tables they need.
Storing the same volume in a traditional warehouse would have cost far more.

## Where people get it wrong

**"Put everything in the lake and analysts will find it."** Without a
[data catalog](/glossary/data-catalog/), naming standards, and ownership, a lake turns into a "data
swamp": lots of files nobody can find, understand, or trust.

**"A lake replaces a warehouse."** Lakes are good at cheap storage and data science work. Business
reporting still needs cleaned, modeled, documented data. Many organizations now combine the two in a
[data lakehouse](/glossary/data-lakehouse/).

**"Raw means we don't need governance."** Lakes often hold the most sensitive data in the company,
because nothing has been filtered out yet. Access controls and
[data governance](/glossary/data-governance/) matter more here, not less.
