---
term: 'Data lineage'
short: 'A map of where data comes from, how it is transformed, and where it goes, from source systems through to reports and models.'
category: 'Data management'
related: ['data-catalog', 'data-quality', 'data-governance', 'etl-vs-elt']
---

Data lineage traces data through its whole life. For any number on a dashboard, lineage shows you which
tables fed it, what transformations changed it along the way, and which source systems it originally
came from. It works in the other direction too, showing everything downstream that depends on a
particular table or column. It's usually displayed as a diagram, with boxes for tables, reports, and
models, and arrows showing how data flows between them.

Where it really earns its keep is when a number looks wrong. If you've ever had a stakeholder email you
asking why a report doesn't match what they expected, you know the first hour can go to just figuring out
where the number comes from. I've spent plenty of time tracing a figure back through reports and source
data to find where a discrepancy started. With good lineage, you start that conversation already knowing
where to look, which makes a real difference when someone is waiting on an answer.

It's just as useful before you change something. Say the finance team plans to rename a column in the
billing database. Lineage shows that column feeds four warehouse tables, eleven dashboards, and a
forecasting model. Now the change can be scheduled with the people who own those things, instead of being
discovered when month-end reports fail. Lineage also comes up more and more in audits and compliance
reviews, where you may need to show where a reported figure came from or where sensitive data like Social
Security numbers ends up.

My main advice is not to rely on documenting lineage by hand. Hand-drawn diagrams are out of date almost
as soon as they're finished. Lineage is most useful when it's captured automatically from query logs,
transformation tools like dbt, and your [data catalog](/glossary/data-catalog/).

I'd also make it available to business users, not just engineers. Being able to click on a metric in a
dashboard and see where it came from is one of the quickest ways I know to build trust in the data.
