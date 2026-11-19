---
term: 'Star Schema'
short: 'A table layout with one central fact table joined directly to several dimension tables, so the diagram looks like a star.'
category: 'Data warehousing'
related: ['dimensional-modeling', 'fact-table', 'dimension-table', 'semantic-layer']
---

A star schema is what a [dimensional model](/glossary/dimensional-modeling/) looks like once it's built.
There's a [fact table](/glossary/fact-table/) in the middle, and each
[dimension table](/glossary/dimension-table/) connects to it directly with a single key. If you draw it
on a whiteboard, the dimensions point out from the center like a star, which is where the name comes
from.

A simple sales example would have a fact table with one row per order line, holding quantity and
revenue, surrounded by dimensions for date, customer, product, and store. A question like "revenue by
product category by month for our Kentucky stores" turns into three joins, one filter, and a sum.

What I like about the star schema is that every query follows the same pattern. You start at the fact
table, join out to whatever dimensions you need, filter and group by their attributes, and add up the
facts. Once an analyst learns that pattern, they can find their way around any star in the warehouse.
Reporting tools like Power BI and Tableau are built to work with it, and databases are optimized for it.

You'll also run into the term snowflake schema. In a snowflake, the dimensions get split up further.
Instead of keeping the product category on the product table, you'd have a separate category table that
the product table points to. It saves a little storage and avoids repeating values, but it adds joins
and makes the model harder for people to follow. For reporting, most teams flatten those back into a
star. (And just to clear up a common mix-up, the Snowflake data platform is named after the cloud, not
the schema, and works fine with star schemas.)

The alternative I see most often is the one big flat table, with everything pre-joined into a single
wide table for a specific dashboard. Those have their place, and they're convenient. The problem comes
when every team builds its own, because each one ends up with a slightly different idea of what a
customer or a product is. Shared dimensions in a star are what keep everyone counting the same way.
