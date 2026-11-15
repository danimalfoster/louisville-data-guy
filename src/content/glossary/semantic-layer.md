---
term: 'Semantic layer'
short: 'A shared layer of business definitions, like metrics, dimensions, and joins, that sits between raw tables and the tools people use to ask questions.'
category: 'Data management'
related: ['data-catalog', 'star-schema', 'text-to-sql', 'data-governance']
---

A semantic layer translates database structures into business terms. Instead of every analyst and
dashboard writing its own SQL to calculate "net revenue," the definition is written once, in the
semantic layer, and every tool that asks for net revenue gets the same answer.

A semantic layer typically defines:

- **Metrics:** net revenue, active customers, gross margin, with the exact calculation and filters.
- **Dimensions:** the attributes metrics can be sliced by, like region, product line, or fiscal quarter.
- **Relationships:** how tables join, so users never have to write joins themselves.
- **Access rules:** who can see which rows and columns.

Examples include the dbt Semantic Layer, Cube, AtScale, LookML in Looker, and semantic models in Power BI.

## An example

Before a semantic layer, the sales dashboard counted refunds in revenue and the finance dashboard didn't,
so they never matched. After the definition of net revenue moved into the semantic layer, both
dashboards, a weekly spreadsheet export, and the company's AI assistant all pull the same calculation.
A definition change is made once and shows up everywhere.

## Why it matters for AI

Semantic layers have become much more important with AI tools that answer questions in plain English.
A [large language model](/glossary/large-language-model/) writing SQL against raw tables has to guess
what "revenue" means and how tables join, and it will sometimes guess wrong. Pointing it at a semantic
layer means it only has to pick the right metric and filters, while the definitions stay governed. This
is one of the most reliable ways to make [text-to-SQL](/glossary/text-to-sql/) trustworthy.

## Where people get it wrong

**"Our BI tool already has one."** Many BI tools have a semantic model, but it only works inside that
tool. A *universal* semantic layer serves the same definitions to every tool, including spreadsheets,
notebooks, and AI agents.
