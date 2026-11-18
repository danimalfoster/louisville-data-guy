import { getCollection } from 'astro:content';

// Drafts are visible locally (`npm run dev`) and on Netlify deploy previews
// (the preview link on each pull request), but never on the live site.
const context = process.env.CONTEXT; // set by Netlify: production | deploy-preview | branch-deploy
const isPreview = import.meta.env.DEV || context === 'deploy-preview' || context === 'branch-deploy';

export async function getPosts() {
	const posts = await getCollection('blog', ({ data }) => isPreview || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTerms() {
	const terms = await getCollection('glossary', ({ data }) => isPreview || !data.draft);
	return terms.sort((a, b) => a.data.term.localeCompare(b.data.term, 'en', { sensitivity: 'base' }));
}

/** Glossary terms that posts are tagged with, most-used first, with how many posts use each. */
export async function getTopics() {
	const [posts, terms] = await Promise.all([getPosts(), getTerms()]);
	const counts = new Map<string, number>();
	for (const p of posts) for (const t of p.data.terms ?? []) counts.set(t.id, (counts.get(t.id) ?? 0) + 1);
	return terms
		.filter((t) => counts.has(t.id))
		.map((t) => ({ id: t.id, term: t.data.term, count: counts.get(t.id)! }))
		.sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
}

/** Short display name for a term chip, e.g. "Retrieval-augmented generation (RAG)" -> "RAG". */
export function chipName(term: string) {
	const abbr = term.match(/\(([^)]+)\)\s*$/);
	return abbr ? abbr[1] : term;
}
