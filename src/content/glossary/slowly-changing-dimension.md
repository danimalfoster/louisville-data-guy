---
term: 'Slowly changing dimension (SCD)'
short: 'A technique for handling changes to descriptive data, like a customer moving, so reports show either current values or history as needed.'
category: 'Data warehousing'
related: ['dimension-table', 'dimensional-modeling', 'data-warehouse']
---

Descriptive data changes over time. Customers move, products get recategorized, sales reps change
territories. A slowly changing dimension is a [dimension table](/glossary/dimension-table/) designed to
handle those changes on purpose, instead of letting the latest load quietly rewrite history.

The two types you will see most often:

- **Type 1: overwrite.** Replace the old value with the new one. Simple, but history is lost. Good for
  corrections, like fixing a misspelled name.
- **Type 2: add a new row.** Keep the old row, mark it as expired, and add a new row with the new
  value. Each row has *effective from* and *effective to* dates and a *current* flag. Good for anything
  you want to report historically.

Other types exist (Type 3 keeps a "previous value" column, and there are hybrids), but Types 1 and 2
cover most real needs.

## An example

A sales rep, Maria, covered Kentucky until June, then moved to Ohio. Her Kentucky sales from January to
June should still count toward Kentucky.

- With **Type 1**, the warehouse updates her territory to Ohio, and all her past sales now show up under
  Ohio. Kentucky's first-half numbers suddenly drop.
- With **Type 2**, Maria has two rows: one for Kentucky (January to June) and one for Ohio (July onward).
  Each sale links to the row that was current when it happened, so both states' history stays correct.

## Where people get it wrong

**"Make everything Type 2 to be safe."** Tracking history on every column bloats tables and confuses
users with many versions of the same customer. Decide column by column which changes the business
actually needs to see over time.

**"The source system has history."** Many don't. If the warehouse doesn't capture a change when it
happens, it may be gone for good.
