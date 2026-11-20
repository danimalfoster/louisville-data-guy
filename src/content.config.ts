import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Glossary terms this post covers (file names in src/content/glossary, without .md).
			// Each listed term's page shows this post under "Posts about this term".
			terms: z.array(reference('glossary')).default([]),
			// Draft posts never appear on the live site. Flip to false (or delete) once approved.
			draft: z.boolean().default(false),
			// Deep dives are longer, more technical reference posts. They get a "Deep dive" label.
			deepDive: z.boolean().default(false),
		}),
});

const glossary = defineCollection({
	loader: glob({ base: './src/content/glossary', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		// Display name, e.g. "Slowly changing dimension (SCD)"
		term: z.string(),
		// One-sentence definition: shown on the A-Z page and used as the meta description.
		short: z.string(),
		category: z.enum(['Data warehousing', 'Data management', 'AI']),
		// Other glossary entries to link under "Related terms".
		related: z.array(reference('glossary')).default([]),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog, glossary };
