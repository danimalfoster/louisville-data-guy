---
term: 'Dimensional modeling'
short: 'A way of designing warehouse tables around business processes, splitting data into measurable facts and descriptive dimensions.'
category: 'Data warehousing'
related: ['star-schema', 'fact-table', 'dimension-table', 'slowly-changing-dimension', 'data-mart']
---

Dimensional modeling is the most widely used method for designing a
[data warehouse](/glossary/data-warehouse/). It was popularized by Ralph Kimball in the 1990s and is
still the default today, including in modern cloud warehouses and lakehouses.

The method sorts data into two kinds of tables:

- **[Fact tables](/glossary/fact-table/)** record business events and the numbers that go with them: a
  sale and its amount, a claim and its paid value, a shipment and its weight.
- **[Dimension tables](/glossary/dimension-table/)** describe the who, what, where, and when of those
  events: customers, products, stores, dates.

Arranged together, these form a [star schema](/glossary/star-schema/). The design is deliberately simple
so business users can understand it and reporting tools can query it quickly.

## How a model gets designed

Kimball's four steps are still a good checklist:

1. **Choose the business process**, such as order fulfillment or patient visits.
2. **Declare the grain**: exactly what one row in the fact table represents (one order line, one visit).
3. **Identify the dimensions** that describe each row.
4. **Identify the facts**, the numbers you will add up or average.

The grain is the step most teams rush, and getting it wrong causes double counting later.

## An example

An insurance company models claims. One row per claim line is the grain. Dimensions are policyholder,
provider, date of service, and diagnosis. Facts are billed amount, allowed amount, and paid amount. An
analyst can now ask "paid amount by provider by month" without knowing how the claims system stores data.

## Where people get it wrong

**"Dimensional models are outdated."** Cheap storage changed some details, like how much you
pre-aggregate, but business users still think in facts and dimensions. A well-designed model also gives
AI tools a much clearer structure to query (see [text-to-SQL](/glossary/text-to-sql/)).
