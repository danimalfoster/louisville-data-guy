---
term: 'Star schema'
short: 'A table layout with one central fact table joined directly to several dimension tables, so the diagram looks like a star.'
category: 'Data warehousing'
related: ['dimensional-modeling', 'fact-table', 'dimension-table', 'semantic-layer']
---

A star schema is the shape a [dimensional model](/glossary/dimensional-modeling/) takes in the database.
A [fact table](/glossary/fact-table/) sits in the middle. Each [dimension table](/glossary/dimension-table/)
connects to it directly with a single key. Drawn on a whiteboard, the dimensions radiate out from the
fact like the points of a star.

Every query follows the same pattern: start at the fact table, join to the dimensions you need, filter
and group by dimension attributes, and add up the facts. That consistency is the point. Analysts learn
one pattern, reporting tools like Power BI and Tableau handle it well, and databases are optimized for it.

## An example

A sales star schema might have:

- **Fact:** `fact_sales` with one row per order line, holding quantity and revenue.
- **Dimensions:** `dim_date`, `dim_customer`, `dim_product`, and `dim_store`.

"Revenue by product category by month for Kentucky stores" is then three joins, one filter, and one sum.

## Star vs. snowflake schema

In a **snowflake schema**, dimensions are split further. Instead of storing category on the product
table, you would have a separate category table that the product table points to. This saves a little
storage and avoids repeating values, but it adds joins and makes the model harder for people to read.
For analytics, most teams flatten dimensions back into a star. (The Snowflake data platform is named
after the cloud, not the schema, and works fine with star schemas.)

## Where people get it wrong

**"Just make one big flat table."** Wide, pre-joined tables are convenient for a single dashboard, and
they have their place. But when every team builds its own, customer and product definitions drift apart.
Shared dimensions in a star keep everyone counting the same way.
