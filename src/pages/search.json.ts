import type { APIRoute } from 'astro';
import { getPosts, getTerms } from '../utils/posts';

// A small search index built at deploy time. The /search page loads it and searches in the browser,
// so there is no search server and nothing to pay for.
const plain = (md = '') =>
	md
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`|-]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

export const GET: APIRoute = async () => {
	const [posts, terms] = await Promise.all([getPosts(), getTerms()]);
	const termName = new Map(terms.map((t) => [t.id, t.data.term]));
	const items = [
		...posts.map((p) => ({
			type: 'Post',
			title: p.data.title,
			url: `/blog/${p.id}/`,
			summary: p.data.description,
			date: p.data.pubDate.toISOString().slice(0, 10),
			tags: (p.data.terms ?? []).map((t) => termName.get(t.id)).filter(Boolean),
			text: plain(p.body),
		})),
		...terms.map((t) => ({
			type: 'Glossary',
			title: t.data.term,
			url: `/glossary/${t.id}/`,
			summary: t.data.short,
			tags: [t.data.category],
			text: plain(t.body),
		})),
	];
	return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
