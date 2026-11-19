---
term: 'Data Governance'
short: 'The roles, rules, and decisions that determine who owns data, what it means, who can use it, and how its quality is maintained.'
category: 'Data management'
related: ['data-quality', 'master-data-management', 'data-catalog', 'data-lineage']
---

Data governance is how an organization makes decisions about its data and then makes those decisions
stick. Who's accountable for customer data? What exactly counts as an "active customer"? Who gets to see
salary data or patient records, and who approves that access? How accurate does the data need to be, and
who fixes it when it isn't? How long do we have to keep it to stay compliant with rules like HIPAA, GDPR,
or CCPA? Governance is the set of roles and processes that answers those questions.

The roles usually look something like this. A data owner is a business leader who's accountable for a
data area, like customer or finance data. Data stewards handle the day-to-day work of maintaining
definitions and resolving issues. And a governance council, or some group like it, settles disputes when
departments disagree.

Here's the kind of situation governance is meant for. Sales reports 12,400 customers. Finance reports
9,800. Both are right, technically. Sales is counting anyone with an open opportunity, and finance is
counting anyone billed in the last 12 months. Without governance, that argument happens again every
quarter. With it, someone owns the definition, the business agrees that "active customer" means billed
in the last 12 months and "prospect" is a separate term, both get documented in the
[data catalog](/glossary/data-catalog/), and the dashboards get updated to match.

The most common mistake I see is treating governance as an IT project. Tools help, but the hard
decisions, like definitions and ownership, belong to the business. When IT drives governance alone, you
tend to get policies that nobody follows. I'd also push back on the idea that governance is mostly about
saying no. Done well, it makes it faster to say yes, because people know what data exists, what it means,
and whether they're allowed to use it.

This is getting more important with AI, not less. I've heard people say they'll get to governance once
their AI tools are in place, and I think that's backwards. An AI assistant answering questions from your
data is only as good as the definitions behind it. Governance is what keeps it from confidently giving
an executive the wrong customer count.
