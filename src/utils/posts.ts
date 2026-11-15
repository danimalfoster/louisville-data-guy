import { getCollection } from 'astro:content';

// Drafts are visible locally (`npm run dev`) and on Netlify deploy previews
// (the preview link on each pull request), but never on the live site.
const context = process.env.CONTEXT; // set by Netlify: production | deploy-preview | branch-deploy
const showDrafts = import.meta.env.DEV || context === 'deploy-preview' || context === 'branch-deploy';

export async function getPosts() {
	const posts = await getCollection('blog', ({ data }) => showDrafts || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
