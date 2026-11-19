Art for the "My Multi-AI Agent Setup" section.

What the chart shows now:

- `avatars/*.webp`: real profile photos for the 10 Grok Bots (cornbot, noah, forge, designer, chief-editor, beyond-approval, jmj-capital, eos-mafia, neoclouds, neuronetics). Lossless WebP copies of `/workspace/design/multi-ai-agent-setup/avatars/*.png` (256x256). Eye coordinates for the pupil overlays live in `src/data/multi-ai-agent-setup.ts` (`avatarEyes`).
- `v2/raster/*.webp`: the 512px images embedded in the other 8 nodes (justin, claude-code, codex, cursor, grok-bot-hub, grok-bot-computer, agent-tin-can, notion), extracted losslessly from `v2/*.svg`. The component inlines an SVG per node (raster + the original `pupil-left` / `pupil-right` groups, geometry in `v2Pupils`).
- `v2/*.svg`: the original v2 files, kept as the source for the rasters and pupil geometry. They are not loaded by the page (each embeds a base64 PNG, about 500 KB).

Not shown:

- The top-level `*.svg` files here are Codex's v1 sketch robots. They are left in the tree but nothing references them.
- The v2 drawings of the 10 Grok Bots (`/workspace/design/multi-ai-agent-setup/art/v2/{cornbot,noah,...}.svg`) are not used; the photos replace them.

IPN leadership area (below the personal chart):

- `v3/raster/ipn-leadership.webp`, `grok-bot.webp`, `ipn-agents.webp`: the three IPN icons by Codex, 512px lossless WebP from the 1024px PNGs in `/workspace/design/multi-ai-agent-setup/ipn-art-v1/`. Pupils in `v2Pupils` are centred in the eye whites from each `<name>.eyes.json`, scaled to the 128 viewBox, with `max` about 75% of the room. The two group pictures have one pair per character: the centre character is `left`/`right`, the others are in `extra`, and every pair moves.
- The IPN Cursor, Claude Code, Codex, Notion and Justin nodes reuse the existing art and pupils; the second Noah reuses Noah's photo and eyes.
