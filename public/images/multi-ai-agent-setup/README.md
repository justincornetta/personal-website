Art for the "My Multi-AI Agent Setup" section.

What the chart shows now:

- `avatars/*.webp`: real profile photos for the 10 Grok Bots (cornbot, noah, forge, designer, chief-editor, beyond-approval, jmj-capital, eos-mafia, neoclouds, neuronetics). Lossless WebP copies of `/workspace/design/multi-ai-agent-setup/avatars/*.png` (256x256). Eye coordinates for the pupil overlays live in `src/data/multi-ai-agent-setup.ts` (`avatarEyes`).
- `v2/raster/*.webp`: the 512px images embedded in the other 8 nodes (justin, claude-code, codex, cursor, grok-bot-hub, grok-bot-computer, agent-tin-can, notion), extracted losslessly from `v2/*.svg`. The component inlines an SVG per node (raster + the original `pupil-left` / `pupil-right` groups, geometry in `v2Pupils`).
- `v2/*.svg`: the original v2 files, kept as the source for the rasters and pupil geometry. They are not loaded by the page (each embeds a base64 PNG, about 500 KB).

Not shown:

- The top-level `*.svg` files here are Codex's v1 sketch robots. They are left in the tree but nothing references them.
- The v2 drawings of the 10 Grok Bots (`/workspace/design/multi-ai-agent-setup/art/v2/{cornbot,noah,...}.svg`) are not used; the photos replace them.

IPN leadership area (below the personal chart):

- `v3/raster/ipn-leadership.webp`, `grok-bot.webp`, `ipn-agents.webp`: the three new IPN icons. TEMPORARY: each is currently a copy of `grok-bot-hub.webp` (with the hub's pupil geometry in `v2Pupils`) until Codex's art lands in `/workspace/design/multi-ai-agent-setup/ipn-art-v1/`. To swap: convert each PNG to 512px lossless WebP over the same filename, then replace the matching `v2Pupils` entry with the measured `<name>.eyes.json` centres scaled to the 128 viewBox (`max` about 75% of the room).
- The IPN Cursor, Claude Code, Codex, Notion and Justin nodes reuse the existing art and pupils; the second Noah reuses Noah's photo and eyes.
