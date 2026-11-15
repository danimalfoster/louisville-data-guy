---
term: 'Dimension table'
short: 'A table that describes the people, places, things, and dates involved in business events, used to filter and group facts.'
category: 'Data warehousing'
related: ['fact-table', 'slowly-changing-dimension', 'star-schema', 'master-data-management']
---

If a [fact table](/glossary/fact-table/) tells you how much, dimension tables tell you "by what." By
customer, by product, by region, by month. Almost every filter, row label, and slicer you see on a report
comes from a dimension.

Dimensions are much smaller than fact tables but a lot wider. A customer dimension might have 50 columns,
including name, segment, industry, city, state, account manager, signup date, and so on. In my experience,
the richer your dimensions are, the more questions people can answer on their own without coming back to
the data team for a new report.

Each row in a dimension usually gets two keys. The natural key is the ID from the source system, like a
customer number. The surrogate key is a simple number the warehouse generates. Having both lets the
warehouse keep more than one version of the same customer over time (see
[slowly changing dimension](/glossary/slowly-changing-dimension/)) and combine customers from systems
whose IDs overlap.

Nearly every warehouse also has a date dimension, with one row per calendar day and columns like day of
week, fiscal quarter, holiday flag, and whether it's the last business day of the month. It can look
unnecessary when you're first building things out. Then finance asks for results by fiscal week, and
you're glad it's there.

The biggest issue I see with dimensions is when each department builds its own. Marketing has a customer
table, sales has one, finance has one, and each defines "customer" a little differently. Then everyone
shows up to the same meeting with different numbers, and the conversation turns into whose numbers are
right instead of what to do about them. Shared dimensions, sometimes called conformed dimensions, are what
make the numbers line up across departments. If your organization has a
[master data management](/glossary/master-data-management/) program, that's ideally where those shared
dimensions get their data.
