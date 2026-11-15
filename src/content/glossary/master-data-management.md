---
term: 'Master data management (MDM)'
short: 'The practice of creating one trusted, shared record for core business entities, such as customers, products, and suppliers, across all systems.'
category: 'Data management'
related: ['data-governance', 'data-quality', 'dimension-table']
---

Master data is the core "nouns" of a business: customers, products, suppliers, employees, locations.
Unlike transactions, which happen once, master data gets referenced over and over by many different
systems. The trouble is that each system usually keeps its own copy, and over time those copies drift
apart. Master data management is the combination of process and technology used to create one trusted
version of each record, which you'll often hear called the golden record.

The process generally works like this. First, you match records across systems that refer to the same
real-world thing. Then you merge them, using rules about which values win when the records disagree, like
taking the most recent address or the billing system's legal name. Then you publish the golden record to
the [warehouse](/glossary/data-warehouse/) and, ideally, back to the operational systems. And finally,
people review the uncertain matches and fix errors as they come up.

A classic example is patient data at a healthcare provider. "Robert Smith, DOB 3/4/1961" in scheduling,
"Bob Smith, DOB 03/04/1961" in billing, and "R. Smith" with the same phone number in the patient portal
turn out to be the same person. Once MDM links them, the organization can see he has three upcoming
appointments and an unpaid balance, instead of treating him like three strangers.

Some of this is less about matching and more about keeping master data current. I recently put together
a list of locations that looked like they had permanently closed, so they could be cleaned out of our
system. A location made the list only if it met three criteria:

1. It had been inactive in our system for at least 60 days.
2. An AI web search found evidence that it had closed.
3. I verified the closure myself through Google and Yelp reviews.

Nobody's system tells you when a customer goes out of business, so somebody has to go looking.

If you're considering an MDM tool, keep in mind that the tool does the matching, but someone still has to
decide the rules and own the outcome. Without [data governance](/glossary/data-governance/), MDM
projects tend to stall while people argue over whose system is the source of truth. I'd also start with
one area, usually customer or product, prove the value, and expand from there.
