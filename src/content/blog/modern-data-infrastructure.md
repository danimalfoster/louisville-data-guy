---
title: 'Building modern data infrastructure'
description: 'A deep dive on the parts of a modern data platform, from ingestion and storage to modeling, orchestration, governance, BI, and AI, and the questions a data leader should answer when building one from scratch.'
pubDate: '2026-11-20'
draft: true
deepDive: true
terms: ['data-warehouse', 'data-lake', 'data-lakehouse', 'etl-vs-elt', 'dimensional-modeling', 'star-schema', 'data-quality', 'data-governance', 'data-catalog', 'data-lineage', 'semantic-layer', 'data-dictionary']
---

This is the first of a new kind of post on the site, which I'm calling deep dives. My regular posts
are about how I've put AI and data to work, and they lean on my own experience and opinions. Deep dives
are more technical and more like a reference. This one is for a data leader who has been asked to build
data infrastructure from scratch, or to replace something that has outgrown itself, and wants to know
what all the pieces are and what decisions come with each one.

The short version is that a modern data platform has a handful of layers, and data moves through them
in order:

1. Source systems, where the data is created.
2. Ingestion, which copies data out of those systems.
3. Storage, usually a cloud data warehouse, data lake, or lakehouse.
4. Transformation and modeling, which turn raw data into tables people can use.
5. Orchestration, which runs everything in the right order on a schedule.
6. Data quality and observability, which tell you when something is wrong.
7. Governance and security, which control who can see what.
8. A semantic layer or data dictionary, which defines what the data means.
9. Consumption, meaning BI, self-service, applications, and AI.

Each section below covers one layer, what the common options are, and the questions to answer before
you choose. None of these decisions are permanent, but some (like your storage platform) are a lot more
expensive to change later than others.

## Source systems

Everything starts with the systems that create the data. For most companies that's a mix of:

- Application databases behind your own products, usually SQL Server, PostgreSQL, MySQL, or Oracle.
- SaaS applications like Salesforce, HubSpot, NetSuite, Workday, Zendesk, and your ad platforms.
- Files, such as CSV and Excel exports, vendor feeds over SFTP, and spreadsheets people maintain by
  hand.
- Event data, like clickstream from a website or app, IoT readings, or logs.
- Third-party APIs and data you purchase.

Before you design anything else, make an inventory. For each source, write down who owns it, how much
data it produces, how often it changes, how fresh the data needs to be downstream, and whether it holds
sensitive information like PII or payment data. That inventory drives almost every decision that
follows, and it's the first piece of documentation you'll keep adding to.

The one rule I'd hold to here is that you don't run analytics directly against production application
databases. Those databases are tuned for lots of small reads and writes, and a heavy reporting query can
slow down the application your customers are using. Copy the data somewhere built for analytics, which
is what the next layer is for.

## Ingestion

Ingestion is how data gets from the source systems into your platform. There are a few main patterns.

Batch loads copy data on a schedule, every night or every hour. They're the simplest to build and
reason about, and they're enough for most reporting. A batch load can be a full copy of a table or an
incremental load that only picks up rows changed since the last run, usually based on a modified date
column.

Change data capture (CDC) reads the source database's transaction log and copies every insert,
update, and delete as it happens. It puts almost no load on the source, catches deletes (which
incremental loads based on a modified date miss), and gets you data within minutes. It takes more setup
and usually needs a database administrator to turn on the right logging.

Streaming handles data that arrives as a continuous flow of events, using tools like Apache Kafka,
Amazon Kinesis, or Azure Event Hubs. It's the right choice for things like clickstream or fraud
detection, where minutes matter. For most internal reporting, it's more complexity than you need.

API pulls are how you get data out of most SaaS applications. These can be fiddly, because every API
has its own pagination, rate limits, and quirks, and vendors change them.

You also have a build-or-buy decision. Managed connector services like Fivetran, Airbyte, and the
connectors built into some platforms (Microsoft Fabric, Databricks, and Snowflake all have their own)
maintain hundreds of prebuilt connectors, so when Salesforce changes its API, it's their problem. They
usually charge by volume of data moved, which can add up quickly on large or frequently changing
tables. Custom pipelines written in Python or SQL cost nothing to license but need someone to maintain
them. A common middle ground is to buy connectors for the SaaS sources and build your own pipelines for
your internal databases and file feeds.

Questions to answer for ingestion:

- How fresh does each source need to be? Daily, hourly, or near real time?
- How will you handle schema changes, like a new column or a renamed field in the source?
- How will you capture deletes?
- How will you load history the first time, and how will you backfill if a load fails?
- What happens to sensitive fields on the way in?

### ETL or ELT

The older pattern is ETL: extract the data, transform it on a separate server, then load the finished
result into the warehouse. The modern default is ELT: extract the data, load it into the platform as is,
and transform it there using the platform's own compute. You can read more about the difference in the
[ETL vs ELT glossary entry](/glossary/etl-vs-elt/).

I generally lean toward ELT, because I want as little friction as possible between the source and a
place where I can work with the data. Once the raw data has landed, I can query it, profile it, and
change my transformations without going back to the source. If a business rule changes, I rebuild the
downstream tables from the raw copy instead of reloading everything. Cloud platforms made this practical
because storage is cheap and compute scales up when you need it.

ETL still has a place. If you have data you aren't allowed to store in raw form, such as full card
numbers or certain health data, you may need to mask or drop it before it ever lands. Many teams end up
doing mostly ELT with a little transformation in flight for exactly those cases.

## Storage

This is the biggest decision on the list, and the one that's hardest to undo. The three main options are
a data warehouse, a data lake, and a lakehouse.

A [data warehouse](/glossary/data-warehouse/) stores structured data in tables and is built for fast SQL
queries. Snowflake, Google BigQuery, Amazon Redshift, and the warehouse in Microsoft Fabric
are common choices.

A [data lake](/glossary/data-lake/) stores files, such as Parquet, JSON, CSV, images, and logs, in
low-cost object storage like Amazon S3, Azure Data Lake Storage, or Google Cloud Storage. It can hold
anything, at almost any scale, but on its own it doesn't give you transactions, enforced schemas, or
fast SQL.

A [lakehouse](/glossary/data-lakehouse/) adds those warehouse features on top of data lake storage, using
open table formats like Delta Lake or Apache Iceberg. Databricks is the best-known lakehouse platform,
and Snowflake, BigQuery, and Fabric have all added support for open table formats, so the lines between
these options have blurred quite a bit.

| | Data warehouse | Data lake | Lakehouse |
| --- | --- | --- | --- |
| Best for | BI and SQL reporting on structured data | Raw and unstructured data at large scale | A mix of BI, data science, and AI on one copy of the data |
| Data types | Structured, some semi-structured (JSON) | Anything | Anything, with tables on top |
| Main users | Analysts, BI developers | Data engineers, data scientists | All of the above |
| Skills needed | SQL | Python or Spark, plus file and format management | SQL plus Python or Spark |
| Cost model | Pay for compute and storage, usually by usage | Very cheap storage, pay for whatever compute you attach | Cheap storage, pay for compute by usage |

Which one is right depends on a few things:

- How much data you have. If your data fits comfortably in a few terabytes, which covers a lot of
  companies, a cloud warehouse is simple and fast. At very large volumes, cheap lake storage starts to
  matter more.
- What kind of data it is. Mostly tables from business systems points to a warehouse. A lot of
  images, documents, audio, or raw logs points to a lake or lakehouse.
- How you want to use it. If the main use is BI and reporting, a warehouse is usually enough. If you
  also need data science, machine learning, or AI workloads on the same data, a lakehouse avoids keeping
  two copies.
- Who's on your team. A team that's strong in SQL will get value out of a warehouse quickly. A
  lakehouse gets the most out of people who are also comfortable with Python or Spark.
- What you already use. If your company runs on Microsoft 365 and Azure, Fabric or Azure-based
  options will fit with your sign-in, security, and billing. The same goes for AWS and Google Cloud. This
  often decides it more than any feature comparison.

### Cloud or on-premises

For a new build, cloud is the default for good reasons. You don't buy hardware, you can start small, and
storage and compute are separate, which means you can store a lot of data cheaply and only pay for
processing when you use it. You also get backups, high availability, and security features without
building them yourself.

The tradeoff is that cloud costs are variable. A badly written query or a pipeline that runs every five
minutes instead of every hour shows up on the bill. Set budgets and alerts on day one, tag spending by
team or workload, and review the bill monthly. On-premises can still make sense when regulations require
it, or when a company has large, steady workloads and existing hardware and staff, but it's the
exception now.

## Database structure

Once data lands, you need a plan for how it's organized. Most modern platforms use layers (sometimes
called zones), where each layer is cleaner and closer to what the business uses than the one before.
You'll see these called raw, staging, and marts, or bronze, silver, and gold in what's known as the
medallion architecture. The names don't matter much, as long as everyone uses the same ones.

- Raw (bronze) holds data exactly as it came from the source, with load timestamps added. Nobody
  reports from it, but it lets you rebuild everything downstream without reloading from the source.
- Staging (silver) holds cleaned data: consistent column names, correct data types, duplicates
  removed, codes translated, and records from different sources matched up. This is where most of your
  business rules start to show up.
- Marts (gold) hold the tables people actually use, modeled around business processes and
  organized by subject area, such as sales, finance, or operations. A
  [data mart](/glossary/data-mart/) is one of these subject-focused slices.

For the marts, [dimensional modeling](/glossary/dimensional-modeling/) is still the most common approach,
and it's held up well for decades. You build [fact tables](/glossary/fact-table/) that record events or
measurements (an order, a call, a payment) and
[dimension tables](/glossary/dimension-table/) that describe them (customer, product, location, date),
usually arranged in a [star schema](/glossary/star-schema/). Star schemas are easy for people to
understand, they work well with every BI tool, and they're easy for AI to understand too, which matters
more now than it used to. For dimensions that change over time, like a customer moving to a new region,
you'll need to decide how to keep history, which is what
[slowly changing dimensions](/glossary/slowly-changing-dimension/) cover.

Some teams also build wide, denormalized tables, sometimes called "one big table," that combine facts
and dimensions into a single table for a specific report or tool. They're fast and simple to query. They
work best as an extra layer built from your star schemas, not as a replacement for them, because
otherwise the same business logic ends up copied into a dozen different tables.

Questions to answer for structure:

- What are your naming conventions for schemas, tables, and columns? Decide early, because renaming
  later is painful.
- Which layer does each team have access to?
- Where does [master data](/glossary/master-data-management/) live, meaning the one agreed-upon list of
  customers, products, or locations when different systems disagree?
- How long do you keep raw data, and what are your retention rules?

## Transformation

Transformation is the code that moves data from raw to staging to marts. In an ELT setup, it's mostly
SQL running inside the platform.

dbt has become the most common tool for this. It lets you write each transformation as a SQL select
statement, works out the order to run them in, and builds in tests and documentation. Other options
include stored procedures, Python or Spark notebooks, the transformation tools built into platforms like
Databricks and Fabric, and SQLMesh.

Whatever tool you use, treat transformation code like software. Keep it in version control (Git), review
changes before they go to production, keep separate development and production environments, and write
tests. A change to a revenue calculation deserves the same care as a change to an application.

## Orchestration

Orchestration is what runs everything in the right order. The ingestion has to finish before the staging
tables build, and the staging tables have to finish before the marts. If something fails, the steps
after it shouldn't run on bad data, and someone needs to find out.

Apache Airflow is the long-standing open-source option. Dagster and Prefect are newer tools built around
the same idea. Many platforms also have their own schedulers, like Azure Data Factory, Databricks
Workflows, and the scheduling in dbt Cloud, which are often enough for a smaller setup.

What you need from any of them is dependency management, retries, alerting on failure, and a history of
what ran and how long it took. Start with whatever comes with your platform, and move to a dedicated tool
when you outgrow it.

## Data quality and observability

The fastest way to lose trust in a data team is for a business leader to find a wrong number before you
do. [Data quality](/glossary/data-quality/) checks are how you find it first.

At a minimum, test for:

- Freshness. Did today's data arrive?
- Volume. Did roughly the expected number of rows load, or did a table suddenly drop by half?
- Uniqueness and nulls. Are your keys unique, and are required fields filled in?
- Referential integrity. Does every order point to a customer that exists?
- Business rules. Do totals reconcile to the source system or to finance's numbers?

Tools like dbt tests and Great Expectations cover rule-based checks. Data observability tools like
Monte Carlo, and similar features built into some platforms, watch for unusual changes automatically
without your writing a rule for each one. Either way, decide in advance who gets alerted, and
whether a failed check stops the pipeline or just raises a warning.

## Governance and security

[Data governance](/glossary/data-governance/) covers who owns data, who can see it, how it's defined,
and how it's protected. It's easier to build in from the start than to add after people already have
broad access.

On the security side:

- Use single sign-on with your company's identity provider (Microsoft Entra ID, Okta, Google), and
  manage access through roles and groups, not individual users.
- Give people the least access they need. Most business users should only see the marts.
- Use row-level security when different people should see different slices of the same table, like a
  regional manager seeing only their region.
- Mask or restrict sensitive columns, and know where your PII lives.
- Log who accessed what, and keep those logs.

On the governance side, assign an owner to each important dataset, someone who can answer questions
about it and approve changes. A [data catalog](/glossary/data-catalog/) helps people find data and
understand what's in it, and [data lineage](/glossary/data-lineage/) shows where each table came from and
what depends on it, which is what you need when someone asks "if we change this, what breaks?" Many
platforms now include both (Unity Catalog in Databricks, Microsoft Purview, Snowflake Horizon), and dbt
generates lineage for the models it builds.

## Semantic layer and data dictionary

Even with clean marts, two people can calculate "revenue" or "active customers" differently and both
believe they're right. The fix is to define your metrics and terms once, in one place.

A [semantic layer](/glossary/semantic-layer/) does that in code. It holds metric definitions, like how
revenue is calculated and which filters apply, and every tool that queries through it gets the same
answer. Examples include the dbt Semantic Layer, Cube, LookML in Looker, and semantic models in Power BI.

A [data dictionary](/glossary/data-dictionary/) does it in documentation. It describes your tables,
columns, joins, aggregation rules, and business terms. It's a smaller project than a semantic layer, and
it's where I'd start, because both people and AI tools can read it. I covered why in the
[MCP servers post](/blog/mcp-servers-for-data-teams/). Most mature platforms end up with both: the
dictionary explains the data, and the semantic layer makes sure the important calculations come out the
same everywhere.

## Consumption

This is the layer the business sees, and it's the one they'll judge the whole platform by.

BI and reporting. Power BI, Tableau, Looker, and lighter options like Metabase are the main tools.
The choice often follows the rest of your stack (Power BI with Microsoft, Looker with Google). Plan for
both certified dashboards that the data team builds and maintains, and a governed self-service area
where analysts can build their own.

Data extracts and applications. Some teams need data delivered to them, through scheduled exports,
data shared with partners, or internal web applications built on top of the marts.

Reverse ETL. This sends modeled data back into operational systems, such as pushing customer health
scores into Salesforce so the sales team sees them where they work. Hightouch and Census are common
tools for it.

AI. Increasingly, people get to data by asking an AI assistant instead of opening a dashboard. That
works through tools like MCP servers, text-to-SQL, or the AI features built into BI tools and data
platforms. I covered the MCP approach in detail in
[How I built our MCP servers](/blog/mcp-servers-for-data-teams/).

## Getting ready for AI

If AI is part of your plans, and for most companies it is now, a few things matter more than they used
to.

Documentation and metadata matter most. An AI model can only work out what your data means from what
you tell it, so table and column descriptions, a data dictionary, and clear metric definitions decide
whether it gives correct answers or confident wrong ones. Clean modeling helps too. A well-built star
schema with clear names is much easier for AI to query correctly than hundreds of loosely related raw
tables.

Permissions matter as well. Whatever AI tool you connect should run with each user's own permissions, not
a shared account that can see everything, so that the security rules you already set up still apply.

If you plan to let AI search documents like contracts, policies, or support tickets, you'll also need
somewhere to store [embeddings](/glossary/embeddings/), either in a dedicated
[vector database](/glossary/vector-database/) or in the vector search features that most data platforms
now include. That's what makes [retrieval-augmented generation](/glossary/retrieval-augmented-generation/)
possible.

## Building it in order

If you're starting from nothing, you don't need all of this on day one. A reasonable order looks like
this:

1. Pick a cloud platform and a storage option that fits your data and your team, and set up cost alerts
   right away.
2. Inventory your sources, then ingest the two or three that matter most to the business, landing them
   raw.
3. Build staging and a first set of marts for one subject area, with tests and version control from the
   start.
4. Put one BI tool on top and deliver a small set of reports people actually asked for.
5. Add orchestration and alerting so it runs reliably without you watching it.
6. Start the data dictionary, set up roles and access, and assign owners.
7. Expand to more sources and subject areas, then add a semantic layer, a catalog, and AI access as the
   platform grows.

Things that can usually wait: streaming, a dedicated observability tool, a standalone catalog, and
reverse ETL. They're all useful, but most teams get more value from getting the basics reliable first.

On staffing, a small platform can run with one or two data engineers and an analyst or BI developer,
especially if you use managed services for ingestion and storage. The more you build yourself, the more
people you need to maintain it.

The thing that matters most through all of this is trust. A platform is only worth what the business is
willing to rely on, so deliver something useful early, keep the numbers right, and tell people when
something breaks before they find it. If you're working through a build like this and want to compare
notes, you can find me on [LinkedIn](https://www.linkedin.com/in/daniel-foster-04536a75).
