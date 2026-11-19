// Copy + node data for the "My Multi-AI Agent Setup" section on /projects.
//
// Body copy started from Cornbot's approved file /workspace/website-ai-setup/use-cases.md and has since been
// rewritten at Justin's direction (see CHECKPOINT.md).
// Art:
//  - The 10 Grok Bots use real profile photos (public/images/multi-ai-agent-setup/avatars/*.webp),
//    shown in a hand-drawn sketch circle. The v2 drawings of those bots are not used.
//  - The drawn nodes sit in an inlined 128x128 SVG that carries movable pupil groups. Every drawing uses a
//    v3/raster/*.webp file cut to a fully transparent background (no paper or watercolor wash outside the
//    ink outline). Pictures whose pupils are drawn in (Cursor, Grok Bot, the storage icons) paint over them
//    (`cover`) so the moving pupil leaves no ghost.
//  - The v1 robot SVGs in public/images/multi-ai-agent-setup/ are no longer shown.
// Layout lives in src/components/multi-agent-setup.tsx.

// One pupil drawn over a profile photo. Coordinates are normalised 0-1 in the square photo
// (measured on the 256x256 sources in /workspace/design/multi-ai-agent-setup/avatars/).
export type PhotoEye = {
  cx: number;
  cy: number;
  rx: number; // radius, as a fraction of the photo width
  ry?: number; // defaults to rx
  fill?: string; // defaults to near-black
  cover?: string; // paint a disc of this colour over the original pupil so a moved pupil does not leave a ghost
  max?: number; // max travel as a fraction of the photo width (default PHOTO_MAX_TRAVEL in the component)
};

// One pupil of a v2 SVG, in its 128x128 viewBox. `rot` is the ellipse's own rotation, which is kept as a
// child transform. The component translates only the outer group.
export type V2Pupil = {
  cx: number; cy: number; rx: number; ry: number; rot: number; hx: number; hy: number; hr: number;
  cover?: string; // paint over a pupil drawn into the art, so the moving one leaves no ghost
};
// `max`: how far both pupils may travel, in viewBox units of 128. Set per picture from the measured room
// between each pupil and the edge of its eye white (about 75% of it).
// `extra`: more eye pairs, for pictures with several characters. Each pair keeps its own `max`.
export type V2Pupils = { left: V2Pupil; right: V2Pupil; max?: number; extra?: V2Pupils[] };

export type AgentNode = {
  id: string;
  name: string; // always visible on the chart
  role?: string;
  cardTitle?: string; // exact card heading from the approved copy, when it differs from name
  kind: "person" | "bot" | "tool" | "hub" | "link" | "machine" | "base" | "group";
  art: string; // photo (bots) or v2 raster (everything else); empty for a "group" heading with no picture
  eyes?: PhotoEye[] | "tilt"; // photo nodes: pupil overlays, or "tilt" for a subject with no eyes
  pupils?: V2Pupils; // v2 nodes
  oneLiner: string;
  useCases: string[]; // 3 or 4 bullets; empty when the copy is a label only
  link?: { href: string; label: string }; // optional outside link at the foot of the card (opens in a new tab)
};

const AVATARS = "/images/multi-ai-agent-setup/avatars";
const V3 = "/images/multi-ai-agent-setup/v3";

// Eye centres measured on the avatar sources (see the notes per bot).
const INK = "#0d0d0d";
const avatarEyes: Record<string, PhotoEye[] | "tilt"> = {
  // Square dark "screen" eyes with a lime dot. The overlay is that dot; the disc covers the original.
  cornbot: [
    { cx: 0.372, cy: 0.625, rx: 0.018, fill: "#d5ec63", cover: "#2a302d", max: 0.016 },
    { cx: 0.604, cy: 0.626, rx: 0.018, fill: "#d5ec63", cover: "#2a302d", max: 0.016 },
  ],
  noah: [
    { cx: 0.449, cy: 0.383, rx: 0.018, ry: 0.02, fill: INK },
    { cx: 0.543, cy: 0.388, rx: 0.018, ry: 0.02, fill: INK },
  ],
  // Angry white eyes with no pupils in the art; pupils are added in the middle of each white.
  forge: [
    { cx: 0.455, cy: 0.468, rx: 0.014, ry: 0.014, fill: INK, max: 0.008 },
    { cx: 0.593, cy: 0.471, rx: 0.014, ry: 0.014, fill: INK, max: 0.008 },
  ],
  // One open eye (the viewer's left). The right eye is a wink, so it gets no pupil.
  designer: [{ cx: 0.418, cy: 0.514, rx: 0.023, ry: 0.025, fill: INK }],
  "chief-editor": [
    { cx: 0.445, cy: 0.441, rx: 0.023, ry: 0.025, fill: INK },
    { cx: 0.576, cy: 0.457, rx: 0.023, ry: 0.025, fill: INK },
  ],
  "beyond-approval": [
    { cx: 0.417, cy: 0.669, rx: 0.021, ry: 0.027, fill: "#2b1710" },
    { cx: 0.582, cy: 0.669, rx: 0.021, ry: 0.027, fill: "#2b1710" },
  ],
  "jmj-capital": [
    { cx: 0.453, cy: 0.371, rx: 0.011, ry: 0.014, fill: INK, max: 0.006 },
    { cx: 0.536, cy: 0.373, rx: 0.011, ry: 0.014, fill: INK, max: 0.006 },
  ],
  "eos-mafia": [
    { cx: 0.434, cy: 0.409, rx: 0.016, ry: 0.023, fill: "#101c10", max: 0.008 },
    { cx: 0.566, cy: 0.409, rx: 0.017, ry: 0.023, fill: "#101c10", max: 0.008 },
  ],
  neoclouds: [
    { cx: 0.411, cy: 0.462, rx: 0.026, ry: 0.032, fill: "#071329", max: 0.01 },
    { cx: 0.59, cy: 0.462, rx: 0.026, ry: 0.032, fill: "#071329", max: 0.01 },
  ],
  // A clinic building: no eyes, so no pupils. The whole picture leans toward the cursor instead.
  neuronetics: "tilt",
};

const v2Pupils: Record<string, V2Pupils> = {
  "agent-tin-can": {
    max: 1.8,
    left: { cx: 23.783, cy: 53.18, rx: 2.552, ry: 3.879, rot: 0, hx: 23.222, hy: 51.861, hr: 0.561 },
    right: { cx: 42.667, cy: 53.078, rx: 2.552, ry: 3.879, rot: 0, hx: 42.105, hy: 51.759, hr: 0.561 },
  },
  "claude-code": {
    max: 2.0,
    left: { cx: 52.874, cy: 67.777, rx: 2.756, ry: 3.879, rot: 0, hx: 52.268, hy: 66.458, hr: 0.606 },
    right: { cx: 75.126, cy: 67.777, rx: 2.756, ry: 3.879, rot: 0, hx: 74.52, hy: 66.458, hr: 0.606 },
  },
  codex: {
    max: 1.9,
    left: { cx: 71.247, cy: 67.675, rx: 2.45, ry: 4.593, rot: 0, hx: 70.708, hy: 66.113, hr: 0.539 },
    right: { cx: 90.233, cy: 66.041, rx: 2.45, ry: 4.593, rot: 0, hx: 89.694, hy: 64.48, hr: 0.539 },
  },
  // Faceted-cube Cursor drawn by Codex (Deliverables/multi-ai-agent-setup-cursor-art-v1); pupils are in the art.
  cursor: {
    max: 1.3,
    left: { cx: 46.12, cy: 72.38, rx: 2.0, ry: 3.25, rot: 0, hx: 45.52, hy: 71.24, hr: 0.56, cover: "#fcf4e4" },
    right: { cx: 59.25, cy: 72.38, rx: 2.12, ry: 3.5, rot: 0, hx: 58.61, hy: 71.16, hr: 0.59, cover: "#fdf5e5" },
  },
  "grok-bot-computer": {
    max: 0.95,
    left: { cx: 63.49, cy: 44.81, rx: 1.735, ry: 2.858, rot: -12, hx: 63.108, hy: 43.838, hr: 0.382 },
    right: { cx: 75.228, cy: 41.85, rx: 1.735, ry: 2.858, rot: -12, hx: 74.846, hy: 40.878, hr: 0.382 },
  },
  "grok-bot-hub": {
    max: 1.2,
    left: { cx: 67.981, cy: 51.037, rx: 2.858, ry: 5.716, rot: -25, hx: 67.352, hy: 49.093, hr: 0.629 },
    right: { cx: 86.354, cy: 45.729, rx: 2.858, ry: 5.716, rot: -25, hx: 85.725, hy: 43.785, hr: 0.629 },
  },
  // IPN pictures by Codex (/workspace/design/multi-ai-agent-setup/ipn-art-v1/). Pupils are centred in the eye
  // whites from <name>.eyes.json, scaled from 1024 to 128; `max` is about 75% of the room. The group pictures
  // have one eye pair per character: the centre character is `left`/`right`, the others are in `extra`.
  "ipn-leadership": {
    max: 1.24,
    left: { cx: 57.375, cy: 51.812, rx: 1.378, ry: 2.125, rot: 0, hx: 57.072, hy: 51.09, hr: 0.303 },
    right: { cx: 71.438, cy: 51.75, rx: 1.35, ry: 2.156, rot: 0, hx: 71.141, hy: 51.017, hr: 0.297 },
    extra: [
      {
        max: 1.13,
        left: { cx: 25.562, cy: 60.0, rx: 1.294, ry: 1.969, rot: 0, hx: 25.278, hy: 59.331, hr: 0.285 },
        right: { cx: 37.562, cy: 58.438, rx: 1.238, ry: 2.0, rot: 0, hx: 37.29, hy: 57.758, hr: 0.272 },
      },
      {
        max: 1.13,
        left: { cx: 94.188, cy: 56.312, rx: 1.238, ry: 1.875, rot: 0, hx: 93.915, hy: 55.675, hr: 0.272 },
        right: { cx: 107.062, cy: 57.0, rx: 1.238, ry: 1.906, rot: 0, hx: 106.79, hy: 56.352, hr: 0.272 },
      },
    ],
  },
  // Codex's watercolor sphere (Deliverables/multi-ai-agent-setup-grokbot-art-v1); pupils are in the art.
  "grok-bot": {
    max: 1.1,
    left: { cx: 73.25, cy: 47.5, rx: 3.12, ry: 3.88, rot: 0, hx: 72.31, hy: 46.14, hr: 0.87, cover: "#fdeed6" },
    right: { cx: 90.0, cy: 43.88, rx: 2.88, ry: 4.0, rot: 0, hx: 89.14, hy: 42.48, hr: 0.81, cover: "#fdeed7" },
  },
  "ipn-agents": {
    max: 1.75,
    left: { cx: 55.875, cy: 41.5, rx: 1.941, ry: 3.031, rot: 0, hx: 55.448, hy: 40.469, hr: 0.427 },
    right: { cx: 69.938, cy: 41.438, rx: 1.913, ry: 3.062, rot: 0, hx: 69.517, hy: 40.396, hr: 0.421 },
    extra: [
      {
        max: 1.44,
        left: { cx: 32.562, cy: 79.688, rx: 1.744, ry: 2.75, rot: 0, hx: 32.179, hy: 78.752, hr: 0.384 },
        right: { cx: 45.062, cy: 78.125, rx: 1.575, ry: 2.656, rot: 0, hx: 44.716, hy: 77.222, hr: 0.346 },
      },
      {
        max: 1.55,
        left: { cx: 85.5, cy: 72.562, rx: 1.772, ry: 2.812, rot: 0, hx: 85.11, hy: 71.606, hr: 0.39 },
        right: { cx: 98.188, cy: 74.062, rx: 1.688, ry: 2.812, rot: 0, hx: 97.816, hy: 73.106, hr: 0.371 },
      },
    ],
  },
  justin: {
    max: 1.9,
    left: { cx: 51.853, cy: 56.447, rx: 2.45, ry: 3.879, rot: 0, hx: 51.314, hy: 55.128, hr: 0.539 },
    right: { cx: 76.351, cy: 56.14, rx: 2.45, ry: 3.879, rot: 0, hx: 75.812, hy: 54.822, hr: 0.539 },
  },
  notion: {
    max: 3.0,
    left: { cx: 50.118, cy: 47.158, rx: 3.368, ry: 5.104, rot: 0, hx: 49.377, hy: 45.423, hr: 0.741 },
    right: { cx: 80.332, cy: 47.158, rx: 3.368, ry: 5.104, rot: 0, hx: 79.591, hy: 45.423, hr: 0.741 },
  },
  "google-drive": {
    max: 1.1,
    left: { cx: 50.83, cy: 68.63, rx: 3.38, ry: 6.38, rot: 0, hx: 49.82, hy: 66.4, hr: 0.95, cover: "#f8efe5" },
    right: { cx: 71.64, cy: 68.54, rx: 3.0, ry: 5.25, rot: 0, hx: 70.74, hy: 66.7, hr: 0.84, cover: "#fcf3e4" },
  },
  "github": {
    max: 1.1,
    left: { cx: 50.95, cy: 56.18, rx: 3.0, ry: 5.25, rot: 0, hx: 50.05, hy: 54.34, hr: 0.84, cover: "#fbefdb" },
    right: { cx: 74.23, cy: 56.14, rx: 3.0, ry: 5.12, rot: 0, hx: 73.33, hy: 54.35, hr: 0.84, cover: "#fbeeda" },
  },
  "local-files": {
    max: 1.1,
    left: { cx: 51.88, cy: 71.0, rx: 3.12, ry: 6.0, rot: 0, hx: 50.94, hy: 68.9, hr: 0.87, cover: "#fbefda" },
    right: { cx: 76.76, cy: 71.29, rx: 3.12, ry: 5.75, rot: 0, hx: 75.82, hy: 69.28, hr: 0.87, cover: "#faedd8" },
  },
};

export const sectionTitle = "My Multi-AI Agent Setup";

export const lede =
  "This is how I work with AI day to day, across my personal and professional work: Grok Bots take delegated tasks, workflows, and research, and coding agents take complex builds and front-end design. A shared knowledge base and Agent Tincan connect them all.";

export const storageTitle = "Where the work lives";

// Short hand-lettered labels on the storage connections (drawn by the wire overlay).
export const storageLinkLabels = {
  read: "every agent reads the Agent Operating Guide",
  requests: "Notion edits are routed to Noah",
  edits: "edits",
  pointsTo: "points to",
  codeCopy: "local copy of the code",
  drift: "Noah checks for drift",
};

// IPN area (below the personal chart). Labels drawn on its connections by the wire overlay.
export const personalTitle = "Personal";
export const ipnTitle = "IPN";
// Short gloss after the heading, and where the heading links (opens in a new tab).
export const ipnNote = "my nonprofit";
export const ipnName = "Intercollegiate Psychedelics Network";
export const ipnHref = "https://www.intercollegiatepsychedelics.net/";
// Small hand-lettered lines under each area heading: each area has its own Notion workspace.
export const personalSubtitle = "my own Notion workspace, guide and Skills registry";
export const ipnSubtitle = "IPN's own Notion workspace, guide and Skills registry";
// Hand-lettered aside on the personal chart.
export const teamNote = "Shows part of the team. A few more bots handle legal, finances, calls and job search.";
export const ipnLinkLabels = {
  reads: "reads the IPN Agent Rules, Onboarding and Skills pages",
  changes: "every IPN Notion change",
  afterReview: "after my review",
  edits: "edits",
};

export const justinLabel =
  "I set the work, make the decisions, and approve anything that gets sent, published, or paid for. Bots draft, I send.";

// These two callouts are not in the approved copy (the substance lives on the Grok Bot and Notion cards).
export const claudeOnGrokBotCallout = "";
export const notionCaption = "";

// Hand-lettered group labels drawn inside the chart. Not in the approved copy file.
export const groupLabels = {
  investing: "JMJ Capital's scans",
};

const grokBotOneLiner =
  "The always-on computer where the Grok Bots live, and where Agent Tincan keeps running even when my laptop is off.";

const grokBotUseCases = [
  "Runs scheduled work, like the daily investment scans and Noah's weekday Notion audit, without my computer having to be on.",
  "Has Claude Code and Codex installed. Forge, my engineering bot, runs them there, and Cornbot does too when I ask.",
  "Keeps the Agent Tincan relay running so coding agents on my laptop and the Grok Bots can pass work back and forth.",
];

export const nodes: AgentNode[] = [
  {
    id: "justin",
    name: "Me",
    kind: "person",
    art: `${V3}/raster/justin.webp`,
    pupils: v2Pupils["justin"],
    cardTitle: "Me",
    oneLiner: justinLabel,
    useCases: [
      "Cornbot, my Chief of Staff on Grok Bot, manages my Grok Bot team. I hand it a task in plain language, and it hands the work off to the right bot, which reports back to me in its own chat.",
      "For front-end and design work, I often work directly in my coding agents: Claude Code, Cursor, and Codex.",
      "I am giving the bots more autonomy over time as they earn my trust, and I still approve anything that leaves my hands.",
    ],
  },
  {
    id: "cornbot",
    name: "Cornbot",
    role: "Chief of Staff",
    cardTitle: "Cornbot (Chief of Staff)",
    kind: "bot",
    art: `${AVATARS}/cornbot.webp`,
    eyes: avatarEyes["cornbot"],
    oneLiner: "My front door for personal and Intercollegiate Psychedelics Network (IPN) work. I drop a task in plain language, and it either does the work or hands it off to a specialist, who reports back to me in its own chat.",
    useCases: [
      "Triages new work and hands it off to the right bot, which reports back to me in its own chat with what changed or what I need to decide.",
      "Drafts IPN emails and Slack replies in my voice. Bots draft, I send.",
      "Scans my personal and IPN inboxes for replies that can't wait.",
      "Turns meeting notes into action items and draft recaps.",
      "Manages my to-do list and takes the tedious tasks off it so I can focus on the work that needs me.",
    ],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    kind: "tool",
    art: `${V3}/raster/claude-code.webp`,
    pupils: v2Pupils["claude-code"],
    oneLiner: "The tool I use for most coding and front-end work. Forge also runs it on Grok Bot's computer, on my Claude subscription, and Cornbot does too when I ask.",
    useCases: [
      "Most of the coding on the IPN member portal, the IPN website, and other software projects.",
      "Front-end work on those products.",
      "Tasks that I start myself, tasks Forge runs on Grok Bot's computer, and work a bot hands off through Agent Tincan.",
      "Feature work on a branch, with a preview I can review before anything is merged.",
    ],
  },
  {
    id: "codex",
    name: "Codex",
    kind: "tool",
    art: `${V3}/raster/codex.webp`,
    pupils: v2Pupils["codex"],
    oneLiner: "The tool I use alongside Claude Code for coding, and the one I go to for image generation.",
    useCases: [
      "Coding work that I alternate with Claude Code.",
      "Image generation, including visuals for diagrams and site graphics.",
      "Shared skill updates: it messages Cornbot over Agent Tincan, and Cornbot routes the Notion edit to Noah.",
      "Work that I start myself, and work that a bot hands off through Agent Tincan.",
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    kind: "tool",
    art: `${V3}/raster/cursor.webp`,
    pupils: v2Pupils["cursor"],
    oneLiner: "Like Claude Code and Codex, a tool I use for front-end design and coding work.",
    useCases: [
      "I sometimes prefer it for its cloud agents.",
      "One main thread can spin up several subagents to work on parts of a task in parallel.",
      "It makes it easy to switch between models automatically.",
      "Work that a bot can hand off through Agent Tincan.",
    ],
  },
  {
    // The "Grok Bot" heading over the bot team. Text only (its old hub picture is no longer shown).
    id: "grok-bot-hub",
    name: "Grok Bot",
    kind: "group",
    art: "",
    oneLiner: "My team of specialized AI agents. They are always on, running 24/7 on virtual machines.",
    useCases: [
      "Cornbot, my main agent, is my Chief of Staff. It manages a team of specialist agents and routes each task to the one whose scope fits.",
      "Each specialist owns one area, like builds, design, editing, research, or investing.",
      "When a new use case or a new repetitive task comes up, I build a new bot for it with Dr. Eggbot (not pictured), the bot that specializes in building bots.",
      "Because they live on virtual machines, they keep working on schedules and requests even when my laptop is closed.",
    ],
  },
  {
    id: "noah",
    name: "Noah",
    role: "Notion Organizer",
    cardTitle: "Noah (Notion Organizer)",
    kind: "bot",
    art: `${AVATARS}/noah.webp`,
    eyes: avatarEyes["noah"],
    oneLiner: "My Notion Organizer and the default Notion editor, trained on my documentation guidelines. A few bots have narrow, audited write lanes.",
    useCases: [
      "Cornbot routes Notion edits from my other agents, like a skill update or a new Notion database, to Noah, so the knowledge base stays consistent.",
      "Checks for context drift between my GitHub repos, Notion, and local files, and flags anything that no longer matches.",
      "Keeps project pages, guides, and the Skills registry current as decisions get made.",
      "Keeps coding-project pages to a short summary and a link to the repo, so GitHub stays the source of truth for them.",
    ],
  },
  {
    id: "forge",
    name: "Forge",
    role: "Product & engineering",
    cardTitle: "Forge (Product & engineering)",
    kind: "bot",
    art: `${AVATARS}/forge.webp`,
    eyes: avatarEyes["forge"],
    oneLiner: "My engineering bot for personal and IPN product work. It owns the code, the data, and the product interface of anything that ships as software.",
    useCases: [
      "Builds and maintains the IPN member portal and the IPN website.",
      "Builds data tools from public sources, like insurance rate files and Medicare fee schedules.",
      "Opens pull requests with preview links and reviews the work before I approve a merge.",
      "Runs Claude Code and Codex on Grok Bot's computer for coding and front-end work, and sometimes hands work to Cursor through Agent Tincan.",
    ],
  },
  {
    id: "designer",
    name: "Designer",
    role: "Front-end & graphic design",
    cardTitle: "Designer (Front-end & graphic design)",
    kind: "bot",
    art: `${AVATARS}/designer.webp`,
    eyes: avatarEyes["designer"],
    oneLiner: "My visual designer for IPN and personal work. It owns the brand system and all non-code visuals.",
    useCases: [
      "Keeps the IPN and personal brand guidelines and design tokens current, which Forge uses in product builds.",
      "Drafts IPN social posts, event graphics, newsletter covers, and Instagram stories for me to review.",
      "Makes hand-drawn diagrams for my case studies and other personal writing.",
      "Reviews the look of major product interfaces and sends ranked fixes for Forge to implement.",
    ],
  },
  {
    id: "chief-editor",
    name: "Chief Editor",
    kind: "bot",
    art: `${AVATARS}/chief-editor.webp`,
    eyes: avatarEyes["chief-editor"],
    oneLiner: "Drafts my personal-brand writing, and one-off emails to IPN's audience, in my voice.",
    useCases: [
      "Drafts long-form case studies for my website.",
      "Drafts short posts for X and LinkedIn that summarize a case study and link to it.",
      "Drafts one-off IPN member emails in my voice, which I review and send myself.",
      "Keeps a content pipeline of ideas and drafts as projects move along.",
    ],
  },
  {
    id: "beyond-approval",
    name: "Beyond Approval",
    role: "Research",
    cardTitle: "Beyond Approval (Research)",
    kind: "bot",
    art: `${AVATARS}/beyond-approval.webp`,
    eyes: avatarEyes["beyond-approval"],
    oneLiner: "Researches how psychedelic medicines scale in practice after, or outside, Food and Drug Administration (FDA) approval, for my Beyond Approval series.",
    useCases: [
      "Scans a locked set of sources and sends me the items that might change how I think about real-world adoption.",
      "Writes a sourced evidence entry only for the items I choose to document.",
      "Finds clinic and policy people to interview and drafts outreach for me to send.",
      "Keeps an interview pipeline so I can see who I have contacted and what is still open.",
    ],
  },
  {
    id: "jmj-capital",
    name: "JMJ Capital",
    role: "Investments",
    cardTitle: "JMJ Capital (Investments)",
    kind: "bot",
    art: `${AVATARS}/jmj-capital.webp`,
    eyes: avatarEyes["jmj-capital"],
    oneLiner: "My lead investment research bot. It reviews the daily scans and keeps the research standard consistent across the companies I follow.",
    useCases: [
      "Reviews the daily scans from Eos Mafia, Neoclouds, and Neuronetics.",
      "Tests news and filings against my written theses, and logs only the items I include.",
      "Reviews earnings previews and post-call write-ups around each earnings call.",
      "Passes new company filings to the right scan bot the same day, so I see them in that bot's chat.",
    ],
  },
  {
    id: "eos-mafia",
    name: "Eos Mafia",
    role: "EOSE scan",
    cardTitle: "Eos Mafia (EOSE scan)",
    kind: "bot",
    art: `${AVATARS}/eos-mafia.webp`,
    eyes: avatarEyes["eos-mafia"],
    oneLiner: "Runs my daily news scan for Eos Energy Enterprises (EOSE) and tests each item against my written thesis.",
    useCases: [
      "Scans a locked set of company, filing, and trade sources every morning.",
      "Sends me a short list of items that may support or challenge the thesis, and a one-line note on items I reviewed but did not send.",
      "Writes a research-log entry only after I include an item and it has been checked against a primary source.",
      "Picks up new company filings the same day and prepares earnings previews before each call.",
    ],
  },
  {
    id: "neoclouds",
    name: "Neoclouds",
    role: "IREN, WULF, CIFR scan",
    cardTitle: "Neoclouds (IREN, WULF, CIFR scan)",
    kind: "bot",
    art: `${AVATARS}/neoclouds.webp`,
    eyes: avatarEyes["neoclouds"],
    oneLiner: "Runs my daily news scan for IREN, TeraWulf (WULF), and Cipher (CIFR), and tests each item against my Neoclouds thesis.",
    useCases: [
      "Scans a locked set of company, filing, and trade sources every morning.",
      "Sends me a short list of items that may support or challenge the thesis, and a one-line note on items I reviewed but did not send.",
      "Writes a research-log entry only after I include an item and it has been checked against a primary source.",
      "Picks up new company filings the same day and prepares earnings previews before each call.",
    ],
  },
  {
    id: "neuronetics",
    name: "Neuronetics",
    role: "STIM scan",
    cardTitle: "Neuronetics (STIM scan)",
    kind: "bot",
    art: `${AVATARS}/neuronetics.webp`,
    eyes: avatarEyes["neuronetics"],
    oneLiner: "Runs my daily news scan for Neuronetics (STIM), which owns Greenbrook TMS, and tests each item against my written thesis.",
    useCases: [
      "Scans a locked set of company, filing, and trade sources every morning.",
      "Sends me a short list of items that may support or challenge the thesis, and a one-line note on items I reviewed but did not send.",
      "Writes a research-log entry only after I include an item and it has been checked against a primary source.",
      "Picks up new company filings the same day and prepares earnings previews before each call.",
    ],
  },
  {
    id: "agent-tin-can",
    name: "Agent Tincan",
    kind: "link",
    link: { href: "https://agenttincan.com/#top", label: "Read more" },
    art: `${V3}/raster/agent-tin-can.webp`,
    pupils: v2Pupils["agent-tin-can"],
    oneLiner: "A private relay, over Tailscale, that lets the coding agents on my laptop and my Grok Bots message each other.",
    useCases: [
      "Coding agents on my laptop use it to pass work to the Grok Bots.",
      "They message Cornbot, who hands the request to the right Grok Bot and routes any Notion edits to Noah.",
      "Cornbot can also send a bot's request out to Claude Code, Codex, or Cursor.",
      "It runs on Grok Bot's always-on computer, so it works even when my laptop is closed.",
    ],
  },
  {
    id: "grok-bot-computer",
    name: "Grok Bot's virtual computer",
    cardTitle: "Grok Bot Virtual Computer",
    kind: "machine",
    art: `${V3}/raster/grok-bot-computer.webp`,
    pupils: v2Pupils["grok-bot-computer"],
    oneLiner: grokBotOneLiner,
    useCases: grokBotUseCases,
  },
  {
    id: "notion",
    name: "Notion",
    kind: "base",
    art: `${V3}/raster/notion.webp`,
    pupils: v2Pupils["notion"],
    oneLiner: "The shared knowledge base every agent reads. It holds my skills, my Agent Operating Guide, and the documentation and research for my non-coding projects.",
    useCases: [
      "Two separate workspaces, personal and IPN. Personal has my Agent Operating Guide; IPN has its own agent rules pages; each has its own Skills registry.",
      "Every agent is directed to read its workspace's agent rules before it starts work.",
      "54 reusable skills (41 personal, 20 IPN, 7 shared), each written once in Notion; every agent's local copy just points there.",
      "Holds project homes, documentation, and research for my non-coding projects.",
      "Noah is the default Notion editor; a few bots have narrow, audited write lanes.",
    ],
  },
  {
    id: "local-files",
    name: "Local files",
    kind: "base",
    art: `${V3}/raster/local-files.webp`,
    pupils: v2Pupils["local-files"],
    oneLiner: "The files on my Mac. They point back to Notion for guides and skills, and hold local copies of the code in my GitHub repos.",
    useCases: [
      "Short pointer files that link to the full guides and skills in Notion, instead of copying them.",
      "A local copy of each GitHub repo, where code gets edited before it is pushed.",
      "Drafts and generated files, like images and exports.",
    ],
  },
  {
    id: "github",
    name: "GitHub",
    kind: "base",
    art: `${V3}/raster/github.webp`,
    pupils: v2Pupils["github"],
    oneLiner: "The source of truth for code and project status on each of my coding projects.",
    useCases: [
      "Every coding project has a repository with its code, history, and pull requests.",
      "Code status lives in a CHECKPOINT file on main, and it wins over any other note.",
      "Notion holds a short summary and a link back to the repo instead of copying it.",
    ],
  },
  {
    id: "google-drive",
    name: "Google Drive",
    kind: "base",
    art: `${V3}/raster/google-drive.webp`,
    pupils: v2Pupils["google-drive"],
    oneLiner: "Where shared documents, spreadsheets, and files live when I am working on them with other people.",
    useCases: [
      "Documents and spreadsheets I share with collaborators.",
      "Files other people send me or need to edit.",
    ],
  },
  {
    // The "Coding agents" heading. Text only: it opens this card instead of showing a picture.
    id: "coding-agents",
    name: "Coding agents",
    kind: "group",
    art: "",
    oneLiner: "I work in Claude Code, Codex, and Cursor myself. The bots can also hand work to them.",
    useCases: [
      "I use them directly for coding and front-end design work.",
      "They pass work to the Grok Bots through Agent Tincan by messaging Cornbot.",
      "Claude Code and Codex are also installed on Grok Bot's computer. Forge runs them there, and Cornbot does too when I ask.",
    ],
  },
  // --- IPN leadership area (Intercollegiate Psychedelics Network) ---
  {
    id: "ipn-leadership",
    name: "IPN leadership team",
    kind: "person",
    art: `${V3}/raster/ipn-leadership.webp`,
    pupils: v2Pupils["ipn-leadership"],
    oneLiner: "IPN's leadership team runs its own AI agents for our nonprofit work, on the same rules as mine.",
    useCases: [
      "Reads IPN Agent Rules, IPN Agent Onboarding and IPN Skills in IPN's Notion before starting work.",
      "Uses the same agent types I do: Grok Bot, Cursor, Claude Code and Codex.",
      "Sends any change to IPN's Notion to me for review instead of editing it directly.",
    ],
  },
  {
    id: "ipn-agents",
    name: "Their agents",
    kind: "group",
    art: `${V3}/raster/ipn-agents.webp`,
    pupils: v2Pupils["ipn-agents"],
    oneLiner: "Each leader picks the agent that fits the job, and every one of them follows the IPN guides.",
    useCases: [],
  },
  {
    id: "ipn-grok-bot",
    name: "Grok Bot",
    kind: "tool",
    art: `${V3}/raster/grok-bot.webp`,
    pupils: v2Pupils["grok-bot"],
    oneLiner: "Always-on assistant for delegated tasks, research and recurring workflows.",
    useCases: [],
  },
  {
    id: "ipn-cursor",
    name: "Cursor",
    kind: "tool",
    art: `${V3}/raster/cursor.webp`,
    pupils: v2Pupils["cursor"],
    oneLiner: "Reviewing documents together and running several coding tasks at once.",
    useCases: [],
  },
  {
    id: "ipn-claude-code",
    name: "Claude Code",
    kind: "tool",
    art: `${V3}/raster/claude-code.webp`,
    pupils: v2Pupils["claude-code"],
    oneLiner: "Builds and front-end work on IPN's web projects.",
    useCases: [],
  },
  {
    id: "ipn-codex",
    name: "Codex",
    kind: "tool",
    art: `${V3}/raster/codex.webp`,
    pupils: v2Pupils["codex"],
    oneLiner: "Coding tasks and image generation.",
    useCases: [],
  },
  {
    id: "ipn-notion",
    name: "IPN Notion",
    kind: "base",
    art: `${V3}/raster/notion.webp`,
    pupils: v2Pupils["notion"],
    oneLiner: "IPN's own Notion workspace, kept separate from my personal one, with its own guide and Skills registry.",
    useCases: [
      "Holds IPN Agent Rules: Read this first, the rules every IPN agent follows.",
      "Holds IPN Agent Onboarding: Get connected, which sets up a new leader's agents.",
      "Holds IPN's skills: a read-first guide and the Skills registry, with the IPN skills plus the ones shared with my personal workspace.",
      "Noah is the default editor; a few bots have narrow, audited write lanes.",
    ],
  },
  {
    id: "ipn-review",
    name: "My review",
    kind: "person",
    art: `${V3}/raster/justin.webp`,
    pupils: v2Pupils["justin"],
    oneLiner: "Leaders send IPN Notion change requests to me for review; Noah makes the approved edit. Leaders don't edit IPN Notion directly.",
    useCases: [
      "I check the change against the guides and approve or adjust it.",
      "Once I approve, Noah makes the edit.",
    ],
  },
  {
    // A second Noah in the IPN area, so no wire has to cross the whole sheet. Same photo, eyes and copy.
    id: "ipn-noah",
    name: "Noah",
    role: "Notion Organizer",
    cardTitle: "Noah (Notion Organizer)",
    kind: "bot",
    art: `${AVATARS}/noah.webp`,
    eyes: avatarEyes["noah"],
    oneLiner: "My Notion Organizer and the default Notion editor, trained on my documentation guidelines. A few bots have narrow, audited write lanes.",
    useCases: [
      "Makes the edit to IPN's Notion once I have approved a change.",
      "Approved changes come to Noah, so the knowledge base stays consistent.",
      "Checks for context drift and flags anything that no longer matches.",
    ],
  },
];
