# Justin Cornetta Personal Website

Personal portfolio and research hub for Justin Cornetta.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX content files
- Vercel deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

Projects live in `content/projects/*.mdx`.

Writing lives in `content/writing/*.mdx`.

Only files with this frontmatter are rendered publicly:

```yaml
status: "published"
```

Draft or private files are excluded from index pages, dynamic routes, and the sitemap.

## V1 Scope

V1 includes two public-safe IPN project case studies:

- IPN Member Portal
- IPN Analytics Dashboard

The consulting page is intentionally deferred.
