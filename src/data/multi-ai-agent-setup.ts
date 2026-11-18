// Copy + node data for the "My Multi-AI Agent Setup" section on /projects.
//
// Body copy is from Cornbot's approved file
// /workspace/website-ai-setup/use-cases.md, used word for word.
// Art:
//  - The 10 Grok Bots use real profile photos (public/images/multi-ai-agent-setup/avatars/*.webp),
//    shown in a hand-drawn sketch circle. The v2 drawings of those bots are not used.
//  - The other 8 nodes use v2 art: a 512px raster (v2/raster/*.webp) inside an inlined 128x128 SVG that
//    carries movable pupil groups. v2/*.svg are the original files; their pupil geometry is copied below.
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
export type V2Pupil = { cx: number; cy: number; rx: number; ry: number; rot: number; hx: number; hy: number; hr: number };
export type V2Pupils = { left: V2Pupil; right: V2Pupil };

export type AgentNode = {
  id: string;
  name: string; // always visible on the chart
  role?: string;
  cardTitle?: string; // exact card heading from the approved copy, when it differs from name
  kind: "person" | "bot" | "tool" | "hub" | "link" | "machine" | "base";
  art: string; // photo (bots) or v2 raster (everything else)
  eyes?: PhotoEye[] | "tilt"; // photo nodes: pupil overlays, or "tilt" for a subject with no eyes
  pupils?: V2Pupils; // v2 nodes
  oneLiner: string;
  useCases: string[]; // 3 or 4 bullets; empty when the copy is a label only
  readMoreHref?: string;
  readMoreLabel?: string; // defaults to "Read more"
  hasCard?: boolean; // default true; false = chart label only
};

const AVATARS = "/images/multi-ai-agent-setup/avatars";
const V2 = "/images/multi-ai-agent-setup/v2";
const READ_MORE = "/projects/ai-agent-avengers";

// Eye centres measured on the avatar sources (see the notes per bot).
const INK = "#0d0d0d";
const avatarEyes: Record<string, PhotoEye[] | "tilt"> = {
  // Square dark "screen" eyes with a lime dot. The overlay is that dot; the disc covers the original.
  cornbot: [
    { cx: 0.372, cy: 0.625, rx: 0.018, fill: "#d5ec63", cover: "#2a302d", max: 0.009 },
    { cx: 0.604, cy: 0.626, rx: 0.018, fill: "#d5ec63", cover: "#2a302d", max: 0.009 },
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
    left: { cx: 23.783, cy: 53.18, rx: 2.552, ry: 3.879, rot: 0, hx: 23.222, hy: 51.861, hr: 0.561 },
    right: { cx: 42.667, cy: 53.078, rx: 2.552, ry: 3.879, rot: 0, hx: 42.105, hy: 51.759, hr: 0.561 },
  },
  "claude-code": {
    left: { cx: 52.874, cy: 67.777, rx: 2.756, ry: 3.879, rot: 0, hx: 52.268, hy: 66.458, hr: 0.606 },
    right: { cx: 75.126, cy: 67.777, rx: 2.756, ry: 3.879, rot: 0, hx: 74.52, hy: 66.458, hr: 0.606 },
  },
  codex: {
    left: { cx: 71.247, cy: 67.675, rx: 2.45, ry: 4.593, rot: 0, hx: 70.708, hy: 66.113, hr: 0.539 },
    right: { cx: 90.233, cy: 66.041, rx: 2.45, ry: 4.593, rot: 0, hx: 89.694, hy: 64.48, hr: 0.539 },
  },
  cursor: {
    left: { cx: 46.954, cy: 56.753, rx: 2.858, ry: 4.389, rot: -15, hx: 46.325, hy: 55.26, hr: 0.629 },
    right: { cx: 67.675, cy: 53.282, rx: 2.858, ry: 4.389, rot: -12, hx: 67.046, hy: 51.79, hr: 0.629 },
  },
  "grok-bot-computer": {
    left: { cx: 63.49, cy: 44.81, rx: 1.735, ry: 2.858, rot: -12, hx: 63.108, hy: 43.838, hr: 0.382 },
    right: { cx: 75.228, cy: 41.85, rx: 1.735, ry: 2.858, rot: -12, hx: 74.846, hy: 40.878, hr: 0.382 },
  },
  "grok-bot-hub": {
    left: { cx: 67.981, cy: 51.037, rx: 2.858, ry: 5.716, rot: -25, hx: 67.352, hy: 49.093, hr: 0.629 },
    right: { cx: 86.354, cy: 45.729, rx: 2.858, ry: 5.716, rot: -25, hx: 85.725, hy: 43.785, hr: 0.629 },
  },
  justin: {
    left: { cx: 51.853, cy: 56.447, rx: 2.45, ry: 3.879, rot: 0, hx: 51.314, hy: 55.128, hr: 0.539 },
    right: { cx: 76.351, cy: 56.14, rx: 2.45, ry: 3.879, rot: 0, hx: 75.812, hy: 54.822, hr: 0.539 },
  },
  notion: {
    left: { cx: 50.118, cy: 47.158, rx: 3.368, ry: 5.104, rot: 0, hx: 49.377, hy: 45.423, hr: 0.741 },
    right: { cx: 80.332, cy: 47.158, rx: 3.368, ry: 5.104, rot: 0, hx: 79.591, hy: 45.423, hr: 0.741 },
  },
};

export const sectionTitle = "My Multi-AI Agent Setup";

export const lede =
  "This is how I work with AI day to day. Specialized Grok Bots handle writing, research, and builds, and I also work directly in Claude Code, Codex, and Cursor.";

export const tinCanCaption =
  "Agent Tin Can is the relay on Grok Bot's always-on computer. It lets my local coding tools and my bots ask each other for work.";

export const justinToolsCallout =
  "I work in Claude Code, Codex, and Cursor myself. The bots can also hand work to those tools.";

// Approved line shown beside Grok Bot's computer node (desktop and mobile).
export const computerNote = "My Grok Bots can also run Claude Code here.";

export const justinLabel =
  "I set the work, make the decisions, and approve anything that gets sent, published, or paid for.";

// These two callouts are not in the approved copy (the substance lives on the Grok Bot and Notion cards).
export const claudeOnGrokBotCallout = "";
export const notionCaption = "";

// Hand-lettered group labels drawn inside the chart. "Coding tools" is approved copy.
export const groupLabels = {
  workspace: "Workspace",
  builds: "Builds and design",
  editing: "Editing",
  research: "Research",
  investing: "Investing",
  tools: "Coding tools",
};

const grokBotOneLiner =
  "The always-on computer where the Grok Bots live, and where Agent Tin Can and Claude Code can run even when my laptop is off.";

const grokBotUseCases = [
  "Runs scheduled work, like the daily investment scans and Noah's weekday Notion audit, without my computer having to be on.",
  "Hosts Claude Code for the bots, signed in to my Claude subscription.",
  "Keeps the Agent Tin Can relay running so local coding tools and bots can pass work back and forth.",
];

export const nodes: AgentNode[] = [
  {
    id: "justin",
    name: "Justin",
    kind: "person",
    art: `${V2}/raster/justin.webp`,
    pupils: v2Pupils["justin"],
    oneLiner: justinLabel,
    useCases: [],
    hasCard: false,
  },
  {
    id: "cornbot",
    name: "Cornbot",
    role: "Chief of Staff",
    cardTitle: "Cornbot (Chief of Staff)",
    kind: "bot",
    art: `${AVATARS}/cornbot.webp`,
    eyes: avatarEyes["cornbot"],
    oneLiner: "My front door for personal and Intercollegiate Psychedelics Network (IPN) work. I drop a task in plain language, and it either does the work or briefs a specialist and brings back the result.",
    useCases: [
      "Triages new work, routes it to the right bot, and reports back with what changed or what I need to decide.",
      "Drafts IPN emails and Slack replies in my voice for me to send.",
      "Scans my personal and IPN inboxes for replies that can't wait.",
      "Turns meeting notes into action items and draft recaps.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "claude-code",
    name: "Claude Code",
    kind: "tool",
    art: `${V2}/raster/claude-code.webp`,
    pupils: v2Pupils["claude-code"],
    oneLiner: "The tool I use for most coding and front-end work. My bots can also run it on Grok Bot's computer, on my Claude subscription.",
    useCases: [
      "Most of the coding on the IPN member portal, the IPN website, and other software projects.",
      "Front-end work on those products.",
      "Tasks that I start myself, and tasks that Forge or another bot hands off through Agent Tin Can or on Grok Bot's computer.",
      "Feature work on a branch, with a preview I can review before anything is merged.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "codex",
    name: "Codex",
    kind: "tool",
    art: `${V2}/raster/codex.webp`,
    pupils: v2Pupils["codex"],
    oneLiner: "The tool I use alongside Claude Code for coding, and the one I go to for image generation.",
    useCases: [
      "Coding work that I alternate with Claude Code.",
      "Image generation, including visuals for diagrams and site graphics.",
      "Shared skill updates: it leaves a change request for Noah instead of editing Notion itself.",
      "Work that I start myself, and work that a bot hands off through Agent Tin Can.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "cursor",
    name: "Cursor",
    kind: "tool",
    art: `${V2}/raster/cursor.webp`,
    pupils: v2Pupils["cursor"],
    oneLiner: "The tool I use for some front-end work.",
    useCases: [
      "Occasional front-end work on product interfaces.",
      "Work I do in the tool myself.",
      "Work that a bot can hand off through Agent Tin Can.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "grok-bot-hub",
    name: "Grok Bot",
    cardTitle: "Grok Bot",
    kind: "hub",
    art: `${V2}/raster/grok-bot-hub.webp`,
    pupils: v2Pupils["grok-bot-hub"],
    oneLiner: grokBotOneLiner,
    useCases: grokBotUseCases,
    readMoreHref: READ_MORE,
  },
  {
    id: "noah",
    name: "Noah",
    role: "Notion",
    cardTitle: "Noah (Notion)",
    kind: "bot",
    art: `${AVATARS}/noah.webp`,
    eyes: avatarEyes["noah"],
    oneLiner: "The only bot allowed to edit my Personal and IPN Notion workspaces. It keeps the shared knowledge base and skills registry in order.",
    useCases: [
      "Keeps project pages, guides, and the skills registry current as decisions get made.",
      "Runs a weekday audit that compares Notion with GitHub and flags when they drift.",
      "Implements documentation and skill updates that other agents request, so every bot is not editing Notion on its own.",
      "Keeps code-project pages to a short summary and a link to the repo, so GitHub stays the source of truth for status.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "forge",
    name: "Forge",
    role: "Builds",
    cardTitle: "Forge (Builds)",
    kind: "bot",
    art: `${AVATARS}/forge.webp`,
    eyes: avatarEyes["forge"],
    oneLiner: "My engineering bot for personal and IPN product work. It owns the code, the data, and the product interface of anything that ships as software.",
    useCases: [
      "Builds and maintains the IPN member portal and the IPN website.",
      "Builds data tools from public sources, like insurance rate files and Medicare fee schedules.",
      "Opens pull requests with preview links and reviews the work before I approve a merge.",
      "Hands coding and front-end work to Claude Code, and sometimes to Codex or Cursor, then brings the result back.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "designer",
    name: "Designer",
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
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
    readMoreHref: READ_MORE,
  },
  {
    id: "agent-tin-can",
    name: "Agent Tin Can",
    kind: "link",
    art: `${V2}/raster/agent-tin-can.webp`,
    pupils: v2Pupils["agent-tin-can"],
    oneLiner: "The relay that lets my local coding tools and my Grok Bots ask each other for work. It runs on Grok Bot's always-on computer.",
    useCases: [
      "Connects Claude Code, Codex, and Cursor to the Grok Bots.",
      "Lets a bot request coding or image work from a local tool, and lets those tools ask a bot for help.",
      "Stays available on Grok Bot's computer, not only when my laptop is open.",
    ],
    readMoreHref: READ_MORE,
  },
  {
    id: "grok-bot-computer",
    name: "Grok Bot's computer",
    cardTitle: "Grok Bot",
    kind: "machine",
    art: `${V2}/raster/grok-bot-computer.webp`,
    pupils: v2Pupils["grok-bot-computer"],
    oneLiner: grokBotOneLiner,
    useCases: grokBotUseCases,
    readMoreHref: READ_MORE,
  },
  {
    id: "notion",
    name: "Notion",
    kind: "base",
    art: `${V2}/raster/notion.webp`,
    pupils: v2Pupils["notion"],
    oneLiner: "The shared knowledge base and skills registry for every agent I use. Noah is the only bot that edits it.",
    useCases: [
      "Holds the operating guide, workspace guides, and shared writing style that every agent reads at the start of a session.",
      "Stores the full instructions for reusable skills, so Claude Code, Codex, Grok Bot, and new tools follow the same recipes.",
      "Holds project homes and research databases, with local copies kept as short pointers back to Notion.",
      "Other agents request changes; Noah makes the edits and checks that Notion stays in sync with GitHub.",
    ],
    readMoreHref: READ_MORE,
  },
];
