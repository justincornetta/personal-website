# Homepage Redesign Brief

Working brief for the homepage visual refresh. This document records approved design decisions and contact details so future design and implementation work uses the same source of truth.

## Working files

- MagicPath project: [Personal Website Edits](https://www.magicpath.ai/files/435818173586083840)
- Local runnable preview: `/Users/jcornetta/Code/personal-website-homepage-redesign-local`
- Notion draft: [Homepage About Me](https://app.notion.com/p/3b32386c248f81f5bc25d67f14e6188a)
- Notion project hub: [Personal Website](https://app.notion.com/p/3982386c248f815da4f9f59e5d398ef2)

## Approved homepage structure

1. Hero
2. About Me preview
3. Experience and Education
4. Projects
5. Closing contact banner

## Navigation and calls to action

- Restore the Projects navigation tab and use it to scroll to the homepage Projects section.
- Remove the hero buttons. Use a subtle animated downward scroll cue at the bottom of the hero to guide visitors into the homepage narrative.
- Remove the resume button entirely. The website already presents the relevant experience.
- Keep the About route and use **Read more about me** as the homepage About CTA.

## About Me preview

- Place a manual image carousel on the left and the copy on the right at desktop widths.
- Stack the carousel above the copy on smaller screens.
- Use previous and next arrows plus pagination indicators. Do not autoplay.
- Source the copy and images from the Notion draft linked above.
- Do not use the Michael Saylor quote in the homepage About Me preview. This decision applies only to the homepage preview.
- Preserve the complete existing About page. The header About link and **Read more about me** CTA should link to that separate page.

## Experience and education

- Preserve the detailed homepage presentation rather than shortening it into summary cards.
- Show every organization, role, date range, and full role description currently on the site.
- Give Education its own detailed subsection with school, degree, graduation date, and activities.
- Use one dominant section heading: **Experience & Education**. Use smaller, dark subsection headings for Experience and Education.

## Brand assets

- Preserve the organization and university logos already used on the latest `origin/main` when translating the homepage into MagicPath.
- Experience logos: Teladoc Health, Intercollegiate Psychedelics Network, Somatix, and Penn Medicine.
- Education wordmarks: University of Pennsylvania and Rutgers University.
- RU Psyched does not currently have a logo in the website design; keep its organization name text-only.
- Render logos with contained, uncropped sizing. Compensate for transparent image padding where needed so every wordmark remains legible.
- The logo restoration in MagicPath was verified against `origin/main` commit `305d19c738492bc09bfffee9df3a017cf26547a5`.

## Color direction

- Preserve the existing neutral tan palette.
- Separate homepage sections with tonal shifts from the same color family.
- Add one slightly darker tan as the primary alternating section background.
- Avoid unrelated section palettes that would weaken the visual cohesion.

## Motion

- Use the staggered reveal. Trigger each group as it enters the viewport so the motion continues naturally while the visitor scrolls down the page.
- Remove the motion comparison controls from the page.
- Animate the hero scroll cue with a restrained downward movement and respect reduced-motion preferences.

## Section headings

- Make the actual section names the dominant large, dark headings: **About Me**, **Experience & Education**, and **Projects & Research**.
- Supporting descriptions should be smaller and muted. Do not present a poetic subtitle as though it is the actual section title.

## Projects

- Keep the featured project card layout on the homepage.
- Add **View All Projects** beneath the cards and link it to the complete Projects page.
- Use this supporting copy: “Personal projects consisting of web applications, AI workflows & automations, industry reports, and investment analysis.”

## Closing contact banner

**Copy:** Have a project, role, or idea worth talking through? Let's connect.

- Email: [justin.cornetta@gmail.com](mailto:justin.cornetta@gmail.com)
- X: [x.com/jmjcapital](https://x.com/jmjcapital)
- LinkedIn: [linkedin.com/in/justin-cornetta](https://www.linkedin.com/in/justin-cornetta/)

## Content style

- First person and active voice.
- Direct, specific, and understated.
- No em dashes.
- Avoid brochure language and generic claims.
- Keep the homepage About summary concise and use the approved Notion draft as the source of truth.
