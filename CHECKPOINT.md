# Checkpoint

## Current state
- "My Multi-AI Agent Setup" section is on `/projects`, directly under the "Projects & Research" h1 and above the project cards.
- Interactive sketchbook chart: 18 nodes, dashed connectors, detail cards (dialog), eye-tracking on fine-pointer hover only.
- Copy in `src/data/multi-ai-agent-setup.ts` is Cornbot's approved text from `/workspace/website-ai-setup/use-cases.md`, used word for word. Justin is a short on-chart label, not a full card. Agent Tin Can and Notion are clickable cards. Grok Bot's hub and computer share the same Grok Bot card copy (the approved file has one Grok Bot card, not a separate computer card).
- Art in `public/images/multi-ai-agent-setup/` is Codex v1 (sketch-robot family, with `pupil-left` / `pupil-right` on character icons). Source kit: `/workspace/design/multi-ai-agent-setup/art/` (18 SVGs, manifest.json, preview.png). A v2 revision was requested over Agent Tin Can (image-generated, Avengers-matched characters) and is pending in `/workspace/design/multi-ai-agent-setup/art/v2/`.
- Spec (approved as briefed): `/workspace/design/multi-ai-agent-setup/spec.md`.

## Git
- Last merged PR on main: Update AI Agent Avengers title and cover (#22), `9f5de9e`.
- Open work: draft PR #23, branch `feature/multi-ai-agent-setup`. Claude Code wrote the first commit (`7fc7ed0`). Follow-up `7f0464d` wires approved copy and Codex v1 art. Preview: https://personal-website-as7k077bm-justin-cornetta.vercel.app/projects (Vercel SSO).

## Next steps
1. If Codex v2 art arrives, drop it in (same filenames / pupil ids or raster + eye overlay) and recheck eye-tracking.
2. Justin reviews the preview. Do not merge without his OK.
3. "Read more" on full cards currently points at the Avengers case study; the approved copy file did not specify destinations.
