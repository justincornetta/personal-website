# Checkpoint

## Current state
- "My Multi-AI Agent Setup" is on `/projects`, directly under the "Projects & Research" h1 and above the project cards. It is a cream paper sheet held by masking tape; the title and lede are handwritten on the sheet in black pen.
- Layout (Justin's live design pass, 2026-11-18): "Me" at the top, branching to Grok Bot (left) and Coding agents (right). Cornbot (Chief of Staff) oversees Forge, Designer, JMJ Capital, Beyond Approval and Chief Editor; JMJ Capital oversees Eos Mafia, Neoclouds and Neuronetics. Middle column: Grok Bot's virtual computer above Agent Tincan. Bottom: "Where the work lives" in five equal slots (Google Drive, Noah, Notion centred, local files, GitHub). No outlined boxes remain.
- Connections are one measured SVG overlay (`measureWires` in `src/components/multi-agent-setup.tsx`), redrawn on resize and when the chart scrolls into view; hidden below 720px, where the chart stacks. Dashed = Agent Tincan (coding agents to each other via one bracket, to Tincan, Tincan to Cornbot). Dotted = Grok Bot's virtual computer (CLI to Claude Code and Codex, and to Cornbot). Storage: a bracket under the chart drops "every change request goes to Noah" and "every agent reads the Agent Operating Guide" into Notion; Noah "edits" Notion; local files "points to" Notion and keep a "local copy of the code" with GitHub; a dotted rail shows "Noah checks for drift".
- Text lives behind the icons: every node, plus the "Grok Bot" and "Coding agents" headings, has a hover preview and a click-through card (no "Read more" links). Card bodies use the site sans; titles and chart labels keep the hand lettering.
- Art: the 10 Grok Bots are avatar photos in sketch circles. Justin, Claude Code, Codex, Grok Bot's computer, Agent Tincan and Notion use the v3 transparent rasters (`v3/raster/`). Cursor (faceted cube), Google Drive, GitHub and local files are newer Codex drawings in `v2/raster/` with whitened backgrounds and painted-over pupils; sources and prompts in `Deliverables/multi-ai-agent-setup-storage-art-v1/` and `-cursor-art-v1/` in the project folder.
- Eye tracking: while the pointer is anywhere over the chart, every icon follows it. Drawn icons use a per-picture travel (`max` in `v2Pupils`, about 75% of the measured eye-white room); photos also lean toward the pointer. Off for touch and `prefers-reduced-motion`.
- Copy: much of the card text was rewritten in this pass at Justin's direction (Me, Grok Bot, Coding agents, Cornbot, Cursor, Agent Tincan, Noah, Notion, storage cards) and is no longer word for word from Cornbot's approved file.

## Git
- PR #23 (`feature/multi-ai-agent-setup`) merged to main at Justin's request, no review. Earlier commits: first build `7fc7ed0`, approved copy `7f0464d`, layout rebuild `894e7ad`, lockfile `f9abf14`, another session's follow-ups `3a2a9b8` / `1760da0` / `998eb61` (its computer note and tools-column centring were superseded by the live pass; its v3 transparent art is kept). Live design pass: `5a920de` plus the merge commit.

## Next steps
1. Cornbot review of the rewritten card copy is still open (the Tin Can relay was offline during the pass). The Google Drive use cases are a guess.
2. The Canva copy of the diagram ("My Multi-AI Agent Setup – website diagram" in Justin's Beyond Approval Research folder) predates this pass.
