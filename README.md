# LouisvilleDataGuy.com

Blog about data management and AI. Built with [Astro](https://astro.build), hosted on Netlify,
auto-deployed from the `main` branch.

## Local development

```
npm install
npm run dev      # http://localhost:4321 (drafts visible)
npm run build    # production build into dist/ (drafts hidden)
```

## Publishing workflow

1. Each new post is written on its own branch (`post/<slug>`) as `src/content/blog/<slug>.md`.
2. A pull request is opened; Netlify posts a **Deploy Preview** link on it. Drafts are visible there.
3. Review the preview. Request changes on the PR, or approve.
4. On approval: set `draft: false` (or remove the line) and merge to `main`. Netlify publishes it.

Posts with `draft: true` never appear on the live site, in the RSS feed, or in the sitemap,
even if merged by accident.

### Keeping Netlify credits down

The site is on Netlify's free plan, which has 300 credits a month and pauses the site if they run
out. Each production deploy (every merge to `main` that changes the site) costs 15 credits, so that's
about 20 deploys a month. Deploy Previews are free.

- Batch small changes. Fixes, revisions, and config changes wait on their branches and get merged into
  the next post's branch, so they go live in the same deploy as the post. Only merge something on its
  own when it can't wait.
- `netlify.toml` skips the build when a push only changes files that aren't part of the website
  (`docs/`, `README.md`, `AGENTS.md`, `.claude/`, `.gitignore`, `.github/`).
- Check the balance on the Netlify team's Usage page before a busy publishing week.

## Glossary

Terms live in `src/content/glossary/<slug>.md` and publish at `/glossary/<slug>/`, with an A-Z index
at `/glossary/`. Frontmatter: `term`, `short` (one-sentence definition), `category`
(`Data warehousing` | `Data management` | `AI`), optional `related` (other slugs) and `draft`.

To connect a blog post to terms, list their slugs in the post's frontmatter, e.g.
`terms: ['semantic-layer', 'text-to-sql']`. Each term page then lists the post under
"Posts about this term". In the post body, link the first mention: `[semantic layer](/glossary/semantic-layer/)`.
