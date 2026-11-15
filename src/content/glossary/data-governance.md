---
term: 'Data governance'
short: 'The roles, rules, and decisions that determine who owns data, what it means, who can use it, and how its quality is maintained.'
category: 'Data management'
related: ['data-quality', 'master-data-management', 'data-catalog', 'data-lineage']
---

Data governance is how an organization decides things about its data, and makes those decisions stick.
It answers questions like:

- **Ownership:** who is accountable for customer data? For revenue figures?
- **Definitions:** what exactly counts as an "active customer"?
- **Access:** who may see salary data or patient records, and who approves that?
- **Quality:** what level of accuracy is acceptable, and who fixes problems?
- **Compliance:** how long must we keep data, and how do we meet rules like HIPAA, GDPR, or CCPA?

The core roles are usually a **data owner** (a business leader accountable for a data domain), **data
stewards** (people who maintain definitions and resolve issues day to day), and a **governance council**
that settles disputes across departments.

## An example

Sales reports 12,400 customers. Finance reports 9,800. Both are "right": sales counts anyone with an open
opportunity, finance counts anyone billed in the last 12 months. A governance process names an owner for
the customer definition, agrees on "active customer" (billed in the last 12 months) and "prospect" as
separate terms, documents both in the [data catalog](/glossary/data-catalog/), and updates dashboards to
match. The argument happens once instead of every quarter.

## Where people get it wrong

**"Governance is an IT project."** Tools help, but the hard decisions, like definitions and ownership,
are business decisions. Governance led only by IT tends to produce policies nobody follows.

**"Governance means saying no."** Done well, governance makes it faster and safer to say yes, because
people know what data exists, what it means, and whether they can use it.

**"We'll do governance once AI is in place."** It's the reverse. AI tools that answer questions from
company data are only as good as the definitions and quality behind them. Governance is what keeps an
AI assistant from confidently reporting the wrong customer count.
