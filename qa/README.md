# Local review

Run `npm ci`, `npm run lint`, `npm run build`, then `npm run dev -- --hostname 127.0.0.1 --port 4317`.

Review `/`, `/#research`, `/projects`, and `/projects#research`. Research cards link directly to Substack. `/writing/approved-then-what` redirects to the original Substack article; the removed `/writing/series/beyond-approval` returns 404. `/writing` redirects to `/projects#research`. Draft `/writing/psychedelic-market-research` must stay 404.

Screenshots were captured with the Codex in-app browser. See `../design-qa.md` for verification and accepted differences from the selected mockup.

Publishing: add MDX files to `content/writing` using `approved-then-what.mdx` as the example. Only `status: published` entries are public. `featured: true` selects homepage research (up to three); a single featured article uses a horizontal feature, multiple entries use cards. Beyond Approval chapters use `seriesSlug: beyond-approval` and a positive `chapter` number. Cover paths belong under `public/images`. Draft investment research should remain `status: draft` until approved for publication.

Set `externalUrl` to link a research card directly to its original publication. Entries with an external URL redirect from their legacy local article route and are excluded from the local sitemap.
