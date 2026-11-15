---
term: 'Master data management (MDM)'
short: 'The practice of creating one trusted, shared record for core business entities, such as customers, products, and suppliers, across all systems.'
category: 'Data management'
related: ['data-governance', 'data-quality', 'dimension-table']
---

Master data is the core "nouns" of a business: customers, products, suppliers, employees, locations.
Unlike transactions, which happen once, master data is referenced over and over by many systems. The
trouble is that each system usually keeps its own copy, and the copies drift apart.

Master data management is the combination of process and technology that produces a single trusted
version, often called the **golden record**, for each entity. The typical steps are:

1. **Match:** find records across systems that refer to the same real-world thing.
2. **Merge:** decide which values to keep when records disagree (the most recent address, the billing
   system's legal name, and so on). These are called *survivorship rules*.
3. **Publish:** share the golden record with the [warehouse](/glossary/data-warehouse/) and, ideally,
   back to the operational systems.
4. **Steward:** have people review uncertain matches and fix errors over time.

## An example

A healthcare provider finds that "Robert Smith, DOB 3/4/1961" in scheduling, "Bob Smith, DOB
03/04/1961" in billing, and "R. Smith" with the same phone number in the patient portal are the same
person. MDM links all three to one patient ID. Now the organization can see that he has three upcoming
appointments and an unpaid balance, instead of treating him as three strangers.

## Where people get it wrong

**"Buy an MDM tool and it's solved."** MDM tools do the matching, but someone has to decide the rules
and own the outcome. Without [data governance](/glossary/data-governance/), MDM projects stall arguing
over whose system is the source of truth.

**"Start with every domain at once."** Successful programs usually start with one domain, most often
customer or product, prove the value, and expand from there.
