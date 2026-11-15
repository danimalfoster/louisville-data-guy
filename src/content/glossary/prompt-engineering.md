---
term: 'Prompt engineering'
short: 'The practice of writing and refining the instructions and context given to an AI model so it produces accurate, consistent, useful output.'
category: 'AI'
related: ['large-language-model', 'hallucination', 'retrieval-augmented-generation']
---

A [large language model](/glossary/large-language-model/) does what its input suggests, so the quality of
the input shapes the quality of the output. Prompt engineering is the work of designing that input: the
instructions, background, examples, and format requirements.

For a one-off question in a chat window, this is mostly common sense. For an AI feature that runs
thousands of times a day inside a business process, it becomes real engineering, with versioning,
testing, and measurement.

## What makes a good prompt

- **A clear role and goal.** "You are helping claims adjusters summarize case notes for a supervisor."
- **The relevant context.** The actual documents, data, or definitions the model needs. Missing context
  is the most common cause of bad answers.
- **Explicit rules.** "Use only the information provided. If the answer isn't there, say so."
- **Examples.** Two or three examples of good output teach format and tone faster than paragraphs of
  description.
- **A defined output format.** A specific structure, like JSON fields or a fixed set of headings, makes
  results consistent and easy to check automatically.

## An example

A first attempt, "Summarize this support ticket," produces summaries of every length and style. The
improved prompt asks for three labeled lines (customer issue, steps already taken, recommended next
action), gives two examples, and says to write "Unknown" when information is missing. Summaries become
consistent enough to feed straight into the team's queue dashboard.

## Where people get it wrong

**"There's a magic phrase."** Tricks and templates matter much less than they used to. Modern models
respond best to clear, specific instructions and good context, the same things a capable new employee
would need.

**"Write it once and ship it."** Prompts should be tested against a set of real examples, with known
good answers, every time they change. A tweak that fixes one case can quietly break five others.

**"Prompting can fix bad data."** No prompt makes a model correct about data it doesn't have or data
that is wrong. Context engineering, meaning getting the right, accurate information into the prompt,
often matters more than wording.
