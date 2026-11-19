---
term: 'Data Lake'
short: 'A low-cost storage repository that holds large amounts of raw data in its original format until someone needs it.'
category: 'Data warehousing'
related: ['data-warehouse', 'data-lakehouse', 'etl-vs-elt', 'data-catalog']
---

A data lake is a place to store large amounts of data in whatever form it shows up in: database
extracts, log files, JSON from APIs, text files, audio, images. It usually lives in cloud storage like
Amazon S3, Azure Data Lake Storage, or Google Cloud Storage, often in open file formats like Parquet or
CSV. The appeal is that you don't have to decide up front exactly how the data will be used. With a
[data warehouse](/glossary/data-warehouse/), you design the tables first and then load data into them.
With a lake, you store everything cheaply and add structure when you read it.

A good example is a project I recently sketched out for turning recorded phone calls into something
you could analyze. The first step would be transcribing the audio, which leaves you with a pile of text
files, one per call. Those raw transcripts need somewhere to live before you know exactly what you'll do
with them, and a lake (or a set of Parquet files) is a natural fit. Once that's in place, you can build
the more structured layer on top. Think of it as taking the whole conversation and pulling out just the
questions and answers, along with the details about the call like location, date, and time. That
structured layer is what people would actually report on. The raw transcripts stay in the lake in case
you need to go back and extract something different later.

The main thing I'd caution against is treating the lake as a dumping ground and assuming people will
find what they need. Without naming standards, owners, and a [data catalog](/glossary/data-catalog/),
a lake turns into what people call a data swamp, lots of files nobody can find or trust. I'd also keep
in mind that lakes often hold the most sensitive data in the company, because nothing has been filtered
out yet, so access controls matter more here, not less.

Lakes are good at cheap storage and at giving data scientists room to explore. Business reporting still
needs cleaned, modeled data on top, which is why a lot of organizations now combine the two in a
[data lakehouse](/glossary/data-lakehouse/).
