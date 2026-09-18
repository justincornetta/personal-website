# Featured research design QA

final result: passed

## Scope and visual truth

Homepage reference: /Users/jcornetta/.codex/generated_images/01a0b168-ba31-7991-b641-ce118b953725/exec-f0d84220-67be-4764-b042-0e782c6f43eb.png (1073 × 1466).
Projects reference: /Users/jcornetta/.codex/generated_images/01a0b168-ba31-7991-b641-ce118b953725/exec-90e4aa04-ca88-48ea-bdef-63abb8e6d6a0.png (1048 × 1501).

Implementation: http://localhost:3016/#research and http://localhost:3016/projects#research. Light theme, research sections with all images loaded and three curated posts.

Desktop CSS viewports: 1073 × 1466 homepage, 1048 × 1501 Projects; devicePixelRatio 1. Browser captures are 1058 × 1446 and 1033 × 1480 respectively. The capture service slightly downsamples; full-view boards normalize both sides to 600px wide. Focused card comparison normalizes the Projects capture to its CSS dimensions before cropping. Mock navigation/canvas margins differ from the existing site's header and section placement; comparisons assess the research content region, not those surrounding areas.

## Evidence

- qa-artifacts/home-desktop.jpg
- qa-artifacts/projects-desktop.jpg
- qa-artifacts/comparison-home.png: reference and homepage together.
- qa-artifacts/comparison-projects.png: reference and Projects together.
- qa-artifacts/comparison-card.png: readable focused comparison of screenshot frame, metadata, headline, takeaway, and source link.
- qa-artifacts/projects-mobile.jpg and projects-mobile-card.jpg: stacked flagship and card captures.
- qa-artifacts/home-mobile.jpg and home-tablet.jpg: responsive supporting captures.

The focused comparison was necessary to assess the user-requested thin gray frame and screenshot readability; full-view boards alone are insufficient for those details.

## Comparison history and fixes

Initial board: qa-artifacts/comparison-before.png. Initial result blocked.

1. [P2, resolved] Desktop tweet captures made the text too dense. Recaptured authentic posts at a narrower width, extracted the post area, and optimized three WebP assets. Final full-view and focused boards show readable excerpts at the card width.
2. [P2, resolved] Main research and flagship headings were undersized. Increased responsive research heading scale and tuned the flagship body width and type so its title remains on one line at the reference desktop sizes.
3. [P2, resolved] Flagship cover region was too shallow. Added a 1.65 aspect-ratio cream frame containing the existing real cover without stretching or cutting its content.
4. [P2, resolved] Homepage CTA could be inside the viewport while hidden by the existing reveal observer's bottom margin. Removed the CTA's reveal class. Verified opacity 1 and successful navigation.
5. [P2, resolved] Small description text on beige had insufficient contrast. Darkened research section descriptions to #646159; card text retains the existing muted color on white.

Post-fix evidence: final homepage and Projects comparison boards plus focused card comparison. No actionable P0/P1/P2 issues remain.

## Required fidelity surfaces

- Typography: existing Geist, near-black headings, responsive hierarchy; long Eos/Bitcoin headlines wrap naturally without truncation. This is accepted over forcing generated mock text onto one line.
- Spacing/layout: full-width primary Beyond Approval feature; three desktop cards; two-column tablet grid with centered third card; single-column mobile. No horizontal overflow at 320, 390, 768, 1048, or 1073 CSS px.
- Colors/tokens: existing warm beige background and black pills; white modules with 1px #b6b0a6 outlines; screenshot frames 1px #b8b8b8 gray. Muted card text on white has approximately 4.87:1 contrast.
- Image quality: actual existing Beyond Approval cover and genuine X screenshots replace generated mock imagery. No fabricated tweet text or placeholder art. Excerpts crop vertically from the top; full posts remain linked.
- Copy/content: curated IREN, EOSE, and Bitcoin perspectives with company/industry, original date, editorial headline, and one-sentence takeaway. Homepage says Selected rather than Recent because curation spans dates.
- Icons: existing Lucide ArrowUpRight used for the new source links and external CTA. Existing global navigation/footer retained.

## Functional and accessibility verification

- Homepage View All Research click navigated to /projects#research.
- Read on Substack opened Approved, Then What? on Beyond Approval.
- Featured IREN link opened the exact source post; all three source hrefs match the captured posts.
- See more insights on X opened Justin Cornetta (@jmjcapital).
- All four research images loaded on both pages.
- Semantic sections, nested headings, article cards, descriptive link labels, image descriptions, and machine-readable dates verified. Keyboard Tab exposes the existing 2px violet focus outline.
- Mobile feature and cards stack; metadata wraps safely at 320px; existing reduced-motion styling applies.

## Build and runtime checks

- npm ci: passed; no repo-provided browser QA installer/script exists.
- npm run lint: passed.
- npm run build: passed, including TypeScript and static generation of all 13 routes.
- git diff --check: passed.
- Local dev server: npm run dev -- --port 3016.
- Console checked. One historical hydration warning is caused solely by Grammarly adding data-new-gr-c-s-check-loaded/data-gr-ext-installed to body before hydration. No application-origin runtime errors or broken workflows found. The earlier LCP image warning was addressed with eager cover loading.
- Next reports a workspace-root warning due to an unrelated parent lockfile; build succeeds. Configuration was kept within the research scope.
- In-app Browser capture was clipped/scaled incorrectly; Chrome fallback used under Product Design's documented browser rule. QA zoom normalized to 100%; temporary viewport overrides reset after verification.

## Accepted constraints and follow-up polish

- Existing site header, Projects initiatives, homepage sections, and closing contact remain; no new routes or mock breadcrumbs were introduced.
- Real cover artwork differs from the regenerated mock artwork; the original published asset is authoritative.
- [P3] Genuine owner-view screenshots include X's Boost control in two image headers. A future logged-out capture could remove that incidental platform UI.
- Detailed QA artifacts stay local and are gitignored; final desktop screenshots are included under docs/qa/featured-research for PR review.
- The user approved creating and merging the PR after reviewing the local implementation and preview-height adjustment.

## Implementation checklist

### Follow-up: match Projects preview height to homepage

Removed the Projects-only square preview override. Both pages now use the same 1.24 aspect ratio on desktop/tablet and retain the shared 1.1 mobile ratio. At a 1073px viewport, all three previews on both routes measure approximately 297.33px wide by 239.78px high. At 390px, Projects previews measure 288.18px high with no horizontal overflow or framework overlay. All preview images load; current console check returns no errors or warnings. Lint, production build, and git diff --check pass after this change.

Evidence: qa-artifacts/home-matched-preview-height.jpg and qa-artifacts/projects-matched-preview-height.jpg. This user-requested height adjustment supersedes the taller Projects preview in the original mockup.

- [x] Build shared featured-post component and curated content data.
- [x] Add flagship and selected posts to both existing pages.
- [x] Use approved subtle gray borders and real assets.
- [x] Verify responsive layouts, links, image loads, and keyboard focus.
- [x] Pass lint, production build, whitespace checks, and paired visual comparisons.
