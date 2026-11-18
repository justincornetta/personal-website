# Checkpoint

## Current state
- "My Multi-AI Agent Setup" section is on `/projects`, directly under the "Projects & Research" h1 and above the project cards.
- Layout rebuilt as a two-branch hierarchy (normal-flow CSS grid, no absolute coordinates): Justin at the top; Grok Bot branch on the left (Grok Bot hub, Cornbot, then labelled specialist groups); Claude Code, Codex and Cursor on the right; Agent Tin Can is one horizontal link between the branches with Grok Bot's computer on it; Notion is a full-width base. Mobile stacks the same DOM order: Justin, Grok Bot branch, Tin Can bridge, Coding tools, Notion. DOM order is also the tab order.
- Art: the 10 Grok Bot nodes use real avatar photos (`public/images/multi-ai-agent-setup/avatars/*.webp`) in hand-drawn sketch-circle frames. The other 8 nodes (Justin, Claude Code, Codex, Cursor, Grok Bot hub, Grok Bot's computer, Agent Tin Can, Notion) use inlined v2 SVGs (512px raster plus `pupil-left` / `pupil-right` groups, max 0.8 viewBox units of travel). The v2 drawings of the 10 bots are not used. The v1 robot SVGs are not shown (files left in the tree, unreferenced).
- Eye tracking: fine pointer + hover only, off for touch and `prefers-reduced-motion`. Photo eye coordinates are stored per avatar in `src/data/multi-ai-agent-setup.ts` (`avatarEyes`). Designer has one pupil (open eye only; the other is a wink). Neuronetics has no eyes, so it leans toward the cursor instead.
- Copy in `src/data/multi-ai-agent-setup.ts` is Cornbot's approved text from `/workspace/website-ai-setup/use-cases.md`, unchanged, word for word. Justin is a short on-chart label, not a full card. Agent Tin Can and Notion are clickable cards. Grok Bot's hub and computer share the same Grok Bot card copy. "Coding tools" is an approved group label.
- Right column balanced: the Claude Code, Codex and Cursor icons are 1.1x the avatar circle size, and the Coding tools column is vertically centred beside the taller Grok Bot frame (desktop and tablet) with its dashed connector still reaching it. The line "My Grok Bots can also run Claude Code here." (`computerNote` in the data file) sits directly under Grok Bot's computer node in the Tin Can bridge, on desktop and in the mobile stack.
- v3 transparent art: still pending. `/workspace/design/multi-ai-agent-setup/art/v3-transparent/` was empty, so the v2 rasters and the `mix-blend-mode: darken` workaround are unchanged. Swap later (same filenames), then drop the blend mode and rounded tile.
- Spec (approved as briefed): `/workspace/design/multi-ai-agent-setup/spec.md`.

## Git
- Last merged PR on main: Update AI Agent Avengers title and cover (#22), `9f5de9e`.
- Open work: draft PR #23, branch `feature/multi-ai-agent-setup`. Claude Code wrote the first commit (`7fc7ed0`). Follow-up `7f0464d` wires approved copy and Codex v1 art. Layout rebuild with real avatar photos and inlined v2 SVGs: `894e7ad`. Lockfile-only commit so `npm ci` passes: `f9abf14`. Full-section review screenshots (1440 and 390) are in `/workspace/design/multi-ai-agent-setup/qa/v2/`. Layout follow-up (right column balance, computer line, copy status) is in the next commit on this branch, not pushed. Earlier preview still shows the old layout until this push deploys.

## Next steps
1. Justin reviews the layout follow-up and runs QA (push for a fresh preview when ready). Do not merge without his OK.
   Swap in v3 transparent art when Codex delivers it.
2. "Read more" on full cards currently points at the Avengers case study; the approved copy file did not specify destinations.
