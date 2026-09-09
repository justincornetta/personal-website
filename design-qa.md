# Design QA — Market & Investment Research

final result: passed

## Visual target and approved revisions

Archive reference: `/Users/jcornetta/.codex/generated_images/01a08316-49d5-7a43-b025-4e7aa0010ad9/exec-241cd07e-0ca3-4518-bf61-c219aa4613b7.png` (1122 × 1402).
Homepage horizontal-feature reference: `/Users/jcornetta/.codex/generated_images/01a08316-49d5-7a43-b025-4e7aa0010ad9/exec-bc2b6a07-2b75-479d-a4d5-b90d48a41e8b.png` (1756 × 896).
The user's later decisions override mock copy: Home / Projects / About, Initiatives & AI Use Cases, Market & Investment Research, supplied descriptions, no placeholders, one horizontal homepage feature, vertical archive cards.

## Evidence

Local implementation: http://127.0.0.1:4317
Screenshots are under `/Users/jcornetta/Code/personal-website-research/qa/`:

- `projects-desktop-top.png`: focused desktop title, navigation, initiative cards.
- `projects-desktop-full.png`: full archive after scrolling through reveal animations (1107 × 2525).
- `projects-research-desktop.png`: focused research category and article card.
- `home-research-desktop.png`: horizontal homepage feature and links.
- `home-research-mobile.png`: stacked homepage feature.
- `projects-research-mobile.png`: mobile archive research card.
- `article-desktop.png` and `article-mobile.png`: historical screenshots of the summary removed by the latest revision.

Desktop CSS viewport 1122 × 1402, mobile 390 × 844. Also checked 768 × 1024 and 320 × 740. Desktop screenshot content width is 1107 pixels after scrollbar exclusion, not a 2× density capture. Reference and implementation were opened together in the same comparison call, including a focused research capture. The full archive is longer than the reference because it preserves the already-published Travel Planner project and the existing closing contact section. It is not a pixel-identical content state; comparisons therefore use corresponding sections and actual site tokens, not full-image height.

## Findings and fidelity review

No actionable P0/P1/P2 findings remain for the approved scope.

- Typography: existing Geist, black semibold headings, tighter display tracking, and readable gray body text retained. Archive section headings remain subordinate to the page title. Long titles wrap without clipping.
- Layout: three equal desktop columns, two on tablet, one on mobile. Cover/title/summary/Read More order is shared across initiative and research cards. One research card retains one column width. Homepage feature uses two columns on desktop and stacks below 800px. No horizontal overflow at tested sizes.
- Colors: existing warm sand/paper/surface tokens reused; approved article artwork retains its own cream/navy/teal brand within the cover.
- Imagery: real existing project images and the approved article cover used. Cover artwork is contained rather than cropped in the archive. Browser checks found no broken images on the homepage. Existing source screenshots are retained rather than AI-generated approximations.
- Copy: final category labels and descriptions applied centrally. EOSE and draft placeholder content are absent. Research cards link directly to Substack with one Read More CTA. The series landing page is removed; the old local article URL redirects to Substack.
- Interaction: primary navigation, initiative card, research card, homepage Read More, View All Research, direct article-to-Substack, and legacy Writing redirect verified in browser. The latest homepage CTA was clicked and opened the correct Substack article.

## Review history

Initial viewport capture happened during reveal animation; captured again after animation and normal scrolling. No animation defect found. Full-page evidence was recaptured from the top after visiting all sections, avoiding hidden offscreen reveal content in the screenshot.
The browser flagged an above-the-fold initiative image as lazy-loaded. Added eager loading for the first archive card; lint and production build rerun successfully. No layout fix was required after the final comparison.

## Verification

- `npm ci`: passed. No repo-provided browser runtime or QA command exists; used Codex in-app browser.
- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript and static route generation.
- `git diff --check`: passed.
- Homepage, Projects archive and sitemap return HTTP 200. Removed series route returns 404; legacy article route returns 308 to Substack.
- Draft and unknown article slugs return HTTP 404.
- Sitemap excludes external articles, the removed series page, and drafts.
- Browser console error check: no errors returned. No framework error overlay observed.
- Responsive checks: 1122, 768, 390 and 320 CSS-pixel widths.

## Caveats and follow-up

This is a local build; no push, PR, or deployment has occurred. Existing dependency audit findings and Next.js's parent-lockfile workspace-root warning are outside this content/layout change. The build completes successfully. Original project thumbnails contain small UI text that is naturally unreadable at card size, as on the existing site. The extended article remains on Substack.

## Implementation checklist

- [x] Agreed labels and descriptions
- [x] Horizontal homepage research feature
- [x] Shared vertical archive cards
- [x] Direct Substack article links; removed series page
- [x] Mobile and desktop browser review
- [x] Lint, production build, and route checks
- [ ] User review and publishing approval

## Latest requested edits

Updated initiative subtitle and research summary exactly as supplied. Homepage and Projects research cards use the original article URL; removed Explore the series. Lint and production build passed again. Desktop/mobile browser checks verified one feature CTA, correct copy, no horizontal overflow, no console errors, and successful navigation to the Substack article.
