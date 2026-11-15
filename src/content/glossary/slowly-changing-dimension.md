---
term: 'Slowly changing dimension (SCD)'
short: 'A technique for handling changes to descriptive data, like a customer moving, so reports show either current values or history as needed.'
category: 'Data warehousing'
related: ['dimension-table', 'dimensional-modeling', 'data-warehouse']
---

Descriptive data changes over time. Customers move, products get recategorized, sales reps change
territories. A slowly changing dimension is a [dimension table](/glossary/dimension-table/) that's
designed to handle those changes on purpose, instead of letting the next load quietly overwrite history.

There are several types, but two cover most real needs. Type 1 simply overwrites the old value with the
new one. It's simple, but the history is gone, so it's best for corrections, like fixing a misspelled
name. Type 2 keeps the old row, marks it as expired, and adds a new row with the new value. Each row has
"effective from" and "effective to" dates and a flag showing which one is current. Type 2 is what you
want for anything you need to report on historically.

The easiest way to see the difference is with an example. Say a sales rep covered Kentucky until June,
then moved over to Ohio. Her Kentucky sales from January through June should still count toward
Kentucky. With Type 1, the warehouse updates her territory to Ohio, and all of her past sales move to
Ohio along with her. Kentucky's numbers for the first half of the year suddenly drop, and somebody in
sales is going to want to know why. With Type 2, she has two rows, one for Kentucky through June and one
for Ohio after that. Each sale links to whichever row was current when it happened, so both states keep
the right history.

You might be tempted to make everything Type 2 just to be safe. I'd avoid that. Tracking history on every
column bloats your tables and leaves users looking at five versions of the same customer, wondering which
one to use. It's better to go column by column and ask whether the business actually needs to see that
change over time.

I'd also be careful about assuming the source system keeps history for you. A lot of them don't. If the
warehouse doesn't capture a change when it happens, it may be gone for good.
