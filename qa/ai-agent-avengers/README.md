# AI Agent Avengers publishing QA

Validated `/`, `/projects`, and `/projects/ai-agent-avengers` in the Codex in-app browser on desktop and mobile.

- Approved Notion body, captions and video credit match the rendered copy.
- Cover and paragraph widths match; italic prose visibly renders.
- Example carousel has three equally sized previews, working navigation/count and disabled endpoints. First preview focuses on the document’s email section. Enlarged views show complete originals.
- Gallery/modal navigation, keyboard opening and closing, focus restoration, scroll unlocking and video playback pass.
- Homepage initiatives are limited to three cards; Projects-page initiatives are sorted by publication date, newest first.
- No page overflow, browser console errors or framework error overlays were observed.
- `npm ci`, `npm run lint`, `npm run build`, and `git diff --check` completed successfully.

The existing multiple-lockfile workspace-root warning and dependency audit findings are outside this content/UI change. No automated browser test script exists in the repository; interactive browser QA was performed.

Screenshots: [case-study carousel](desktop-case-study.jpg), [homepage initiatives](homepage.jpg).
