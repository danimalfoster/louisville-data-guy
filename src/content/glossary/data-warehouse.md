---
term: 'Data Warehouse'
short: 'A central database built for reporting and analysis, holding cleaned, integrated data from many source systems.'
category: 'Data warehousing'
related: ['data-lake', 'data-lakehouse', 'etl-vs-elt', 'dimensional-modeling', 'data-mart']
---

A data warehouse is where an organization brings data together from all of its systems so people can
report on it in one place. Your billing system, CRM, phone system, and website each do their own job
well, but they're built to handle one transaction at a time. They aren't built to answer questions like
"How did this quarter compare to last year, by region and product line?" That's the warehouse's job.

Simply copying every database onto one server doesn't get you a warehouse, though. A few things make
it different. Data from different systems gets integrated, so the customer who's "ACME Corp" in billing
and "Acme Corporation" in the CRM becomes one customer. History gets kept, even when the source system
overwrites old values (see [slowly changing dimension](/glossary/slowly-changing-dimension/)). And the
data gets organized for analysis, usually into [fact tables](/glossary/fact-table/) and
[dimension tables](/glossary/dimension-table/), so queries are fast and reasonably easy to write.

I recently recommended something like this for a situation that's pretty common after companies merge
or grow by acquisition. Data was spread across several systems, some of them on different cloud
platforms, and reporting and invoicing meant pulling from each one separately. My suggestion was a
separate reporting server whose only purpose was to bring that data together into one structure and
report on it. Keeping it separate from the production servers also meant heavy reporting queries
wouldn't slow down the systems running the business, and it gave us a path to retire an older server
that existed mostly for reporting.

One thing I'd point out is that a warehouse isn't really a technology purchase. Snowflake, BigQuery,
Redshift, Databricks, and SQL Server are all platforms you can build a warehouse on. The warehouse
itself is the modeled, trusted data, and most of the effort goes into agreeing on definitions and
keeping the data quality high. I'd also be careful with the idea that a
[data lake](/glossary/data-lake/) replaces a warehouse. A lake can store raw data cheaply, but somebody
still has to clean and model it before business users can trust the numbers, and that cleaned, modeled
layer is a warehouse whatever you decide to call it.
