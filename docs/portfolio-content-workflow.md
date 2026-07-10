# Portfolio Content Workflow

How project case studies are **drafted in Notion** and **published to the live site as MDX**.
Follow this whenever seeding a new project (e.g. from an internal workspace project folder) so
every project follows the same format, tone, and structure.

---

## Where things live

- **Notion workspace:** *Justin Cornetta's Notion* (personal, `justin.cornetta@gmail.com`).
  - ⚠️ The Notion MCP connector must be authed to the **personal** account. It is easy to be
    accidentally connected to the **IPN workspace** (`info@intercollegiatepsychedelics.net`).
    **Always verify first** with `notion-fetch { id: "self" }` and confirm the email before creating anything.
- **Container page — "Personal Website":** https://app.notion.com/p/3982386c248f815da4f9f59e5d398ef2
- **Database — "Portfolio Projects":** https://app.notion.com/p/8a48d4f21f0845c48381fb9db8ab52fa
  - data source id: `6835d17d-dbcc-496e-8d3f-fd2af819d201` (use as `data_source_id` parent when creating pages)
- **Seeded template page — "IPN Member Portal":** https://app.notion.com/p/3982386c248f818dae62c3a4a125243b
  (the canonical example — match its tone and section order exactly)
- **Live site repo:** this folder (`projects/personal-website`).
  - Project case studies → `content/projects/<slug>.mdx`
  - Writing/research → `content/writing/<slug>.mdx`
  - Project media → `public/images/projects/`
  - Only files with frontmatter `status: "published"` render on the site.

---

## Database schema (Notion properties)

| Property | Type | Purpose |
|---|---|---|
| Name | Title | Project name |
| Subtitle | Text | Page **hook** shown under the title on the detail page — punchy, not a summary |
| Content Type | Select | `Project` / `Writing` — drives the card tag on the site |
| Category | Select | `Web App` · `AI Workflow` · `Research & Analysis` · `Investment Analysis` · `Industry Report` |
| Skills | Multi-select | Transferable competencies — Product Management, Product Design, Requirements, Data Analysis… (recruiter keywords) |
| Tools | Multi-select | What it was built with — Claude Code, Codex, Cursor, Next.js, Supabase, Netlify, Vercel… |
| Published | Date | Month/Year |
| Timeline | Text | Duration / when built (e.g. "~6 weeks, Spring 2026") — signals shipping speed |
| Role | Text | Justin's specific role |
| Status | Select | `Draft → In Review → Ready to Publish → Published` |
| Featured | Checkbox | Surface on the homepage carousel |
| Order | Number | Carousel ordering |
| Summary | Text | Blurb on the carousel **card** — plain-English one-liner (distinct from Subtitle) |
| Live URL | URL | Deployed link/demo |
| Repo / Link | URL | Code or related link |
| Slug | Text | kebab-case; maps to the MDX filename |

---

## Page layout (body sections, in order)

This is the canonical section order, matched to the finalized IPN Member Portal page:

1. **Cover video / photo.** Top of the page. A YouTube link (auto-embeds, becomes a real player on the site) or a product screenshot.
2. **Overview & Problem Statement.** One short paragraph that sets the context and states the real problem in one place.
3. **Solution.** The approach that was chosen, in two to four sentences.
4. **Implementation Details.** A numbered list of the actual steps taken, from discovery through build and launch. Each step gets a bold lead-in label and a colon.
5. **Features (V1).** A bulleted list of the prominent features, each with a bold label and a one-line description. Close with a short "more to come" line if relevant.
6. **Outcomes & Impact.** A bulleted list, each bullet leading with the result and numbers first (cost, users, timing).
7. **Lessons Learned.** A short bulleted list of honest, first-person reflections on what the project taught and how it shaped Justin. Each bullet gets a bold label.
8. **Links.** Live site, repo, related writing.
9. **Gallery.** Screenshots dropped in order, each with a caption. Renders as an image carousel (captions become the per-slide subtitles) at the bottom of the published page.

The page **properties** carry the meta (Subtitle, Skills, Tools, Published, Role, Category) shown at the top in Notion. Skills competencies live in the **Skills** property, so there is intentionally no separate "Skills Demonstrated" body section. The draft callout at the very top of the Notion page is a working note only and is not published.

---

## Writing style (match Justin's voice)

The content should read like a sharp, practical operator wrote it, not an AI.

- **No em dashes.** Use periods, commas, colons, or parentheses instead. Hard rule.
- **Punchy and to the point.** Keep the most important details, cut the rest. Short sentences, no filler, no throat-clearing openers.
- **First person, active voice.** "We built," "I led," "we held to a clear process." Use "we" for team work and "I" for Justin's own role and reflections.
- **Concrete and specific.** Lead with real numbers and names: "over 2,000 members across 70 countries," "$0/month," "50+ members in one week," "scored three paths across eight dimensions." Specifics beat adjectives.
- **Explain the why.** Show the judgment behind decisions, not just what happened.
- **Bold lead-in labels** on list items, then a colon, then a tight description.
- **No AI tells.** Avoid "leverage," "seamless," "robust," "cutting-edge," "delve," "it's worth noting," symmetrical "not only... but also" constructions, and tidy rule-of-three flourishes. If a phrase sounds like a brochure, rewrite it plainer.
- **Public-safe always.** No private member data, transcripts, Slack IDs, credentials, or collaborators' full names.

When in doubt, write it the way Justin would say it to a peer: direct, specific, a little understated.

---

## Seeding a new project from an internal workspace folder

1. **Locate the source folder** (e.g. `~/Desktop/IPN Workspace/projects/<Project>`). Read its
   `README.md`, `requirements.md`, decision/strategy docs, and launch docs — the real planning material.
2. **Extract** the narrative: problem → objective → solution/approach → the concrete steps taken →
   quantified outcomes → Justin's specific role → skills → lessons.
3. **Public-safe screening (critical).** EXCLUDE: private member/user data, meeting transcripts,
   Slack channel IDs / message timestamps, credentials, internal-only URLs, and collaborators' full
   names. Keep it about what Justin did and public-safe facts. **When in doubt, leave it out.**
4. **Voice & style.** First person, active voice, operator judgment (explain *why* decisions were
   made), **metrics-first** in Outcomes, concise. Mirror the seeded IPN Member Portal page.
5. **Media.**
   - Cover: a video thumbnail (`https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg`) or a product screenshot.
   - Walkthrough video: prefer a **YouTube link** in the page (Notion auto-embeds; becomes a real
     iframe on the site). To pull a poster frame from a local `.mp4` **without ffmpeg**, use
     `qlmanage -t -s 1600 -o <out_dir> "<file.mp4>"` (macOS Quick Look).
   - Screenshots / Gallery: in a `## Gallery` section at the bottom, the user drops images **in order** and gives **each a caption** (the per-slide subtitle). On publish, download each image (Notion image URLs are temporary), store under `public/images/projects/<slug>/`, preserve top-to-bottom order, and render the set as an image **carousel** with captions.
6. **Create the page** under the Portfolio Projects data source (`data_source_id` above). Set all
   properties: `Status = Draft`, `Slug` = kebab-case, `Featured`/`Order` as appropriate.
7. **Fill the body** using the section order above, matching the template.

### Notion API property notes
- Checkbox (`Featured`): value is `"__YES__"` / `"__NO__"`.
- Date (`Published`): use the expanded key `"date:Published:start"` = `"YYYY-MM-DD"`.
- Multi-select (`Skills`, `Tools`): value is a JSON-array string, e.g. `"[\"Product Strategy\",\"Requirements\"]"`. Keep **Skills** = competencies and **Tools** = tech/software, never mixed.
- Select values must match the option names exactly.

---

## Publishing: Notion → MDX

- **Trigger:** the user flips a project's **Status → "Ready to Publish"**.
- **Map Notion → MDX frontmatter:**

  | Notion | MDX frontmatter |
  |---|---|
  | Name | `title` |
  | Slug | `slug` |
  | Summary | `summary` |
  | Category | `capability` / `category` |
  | Skills | `skills` |
  | Tools | `tools` |
  | Published | `date` |
  | Timeline | `timeline` |
  | Role | `role` |
  | Featured | `featured` |
  | Content Type | routes to `content/projects/` vs `content/writing/` |
  | (on publish) | `status: "published"` ← the site only renders this |

- Create `content/projects/<slug>.mdx` (or `content/writing/<slug>.mdx`), body = the case study;
  place media in `public/images/projects/`.
- After porting, set the Notion **Status → Published**.

---

## Consistency checklist (every project)

- [ ] Same section order & headings as the template
- [ ] Outcomes lead with quantified metrics
- [ ] Explicit "My Role & Contribution"
- [ ] Public-safe (no private data, transcripts, credentials, or collaborators' names)
- [ ] Slug is kebab-case and matches the MDX filename
- [ ] Verified the Notion connection is the **personal** account before creating anything
