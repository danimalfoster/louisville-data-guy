---
term: 'Data Mart'
short: 'A smaller, subject-focused slice of a data warehouse built for one department or business area, such as finance or marketing.'
category: 'Data warehousing'
related: ['data-warehouse', 'dimensional-modeling', 'dimension-table']
---

A data mart is a smaller set of data organized around one subject or team. Where a
[data warehouse](/glossary/data-warehouse/) covers the whole organization, a finance mart might hold just
the general ledger, budgets, and cost centers, and a marketing mart might hold campaigns, leads, and web
traffic. Marts are usually built as [star schemas](/glossary/star-schema/), so a department's analysts
can find what they need without wading through everything else.

There are two classic ways to build them. Bill Inmon's top-down approach says to build one integrated
enterprise warehouse first and then publish marts from it, so every mart draws from the same cleaned
data. Ralph Kimball's bottom-up approach says to build marts one business process at a time, but share
the common [dimensions](/glossary/dimension-table/), like customer and date, across all of them, so that
together they add up to an enterprise warehouse. People have argued about this for decades. In my
opinion, either one works, as long as the marts share definitions instead of each one inventing its own.

For example, a hospital system might build a revenue cycle mart for its billing team, with claims,
payments, denials, and payer details, set up to answer questions like "What's our denial rate by payer
this quarter?" The quality team gets its own clinical mart. Both use the same patient, provider, and
date dimensions, so a patient count means the same thing in both places.

Where this goes wrong is when each department owns its mart from end to end, built from its own extracts
with its own definitions. That's how an organization ends up with three different revenue numbers in the
same meeting, and the data team's credibility takes the hit for it. Focusing a mart on one department is
fine. Letting that department redefine things that are shared, like customer or revenue, is where the
trouble starts.

You'll also hear that marts don't matter anymore in the cloud. It's true that keeping them on separate
servers matters less now, since everything can live on one platform. But the idea of curated data sets
for a specific audience is still very much around, often under newer names like "data products" or the
"gold layer."
