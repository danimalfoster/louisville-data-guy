---
term: 'Prompt Engineering'
short: 'The practice of writing and refining the instructions and context given to an AI model so it produces accurate, consistent, useful output.'
category: 'AI'
related: ['large-language-model', 'hallucination', 'retrieval-augmented-generation']
---

A [large language model](/glossary/large-language-model/) responds to whatever you give it, so the
quality of what you put in has a lot to do with the quality of what you get back. Prompt engineering is
the work of designing that input: the instructions, the background information, examples, and the format
you want the answer in.

For a one-off question in a chat window, most of this is common sense. It gets more serious when the
prompt is part of a business process that runs thousands of times a day. At that point, you need to
version your prompts, test them, and measure how they're doing, just like any other part of a system.

A good prompt generally covers a few things. It explains the role and the goal, like "You're helping
claims adjusters summarize case notes for a supervisor." It includes the context the model needs, the
actual documents, data, or definitions, and in my experience missing context is the number one reason
for bad answers. It sets clear rules, like "Use only the information provided, and if the answer isn't
there, say so." It shows two or three examples of good output, which teaches format and tone faster than
paragraphs of description. And it asks for a specific format, which makes the results consistent and
easy to check.

Say a support team starts with "Summarize this ticket." They get summaries of every length and style. The
improved version asks for three labeled lines (the customer's issue, what's already been tried, and the
recommended next step), includes two examples, and says to write "Unknown" when something's missing. Now
the summaries are consistent enough to feed straight into the team's queue.

Prompts also get better when you look at real usage. One project I outlined involved transcribing
customer calls so we could see what people actually ask for, by time of day, region, and so on, and then
use that to direct how a voice AI's prompts were written. What customers really say is often different
from what you'd assume.

I'd be skeptical of anyone selling magic phrases. Modern models respond best to clear, specific
instructions and good context, which is the same thing a capable new employee would need. And no prompt
will make a model right about data it doesn't have, or data that's wrong.
