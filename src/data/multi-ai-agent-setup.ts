// Copy + node data for the "My Multi-AI Agent Setup" section on /projects.
//
// Body copy is from Cornbot's approved file
// /workspace/website-ai-setup/use-cases.md, used word for word.
// Art in public/images/multi-ai-agent-setup/ is Codex v1 (see the README there).
// Layout lives in src/components/multi-agent-setup.tsx.

export type AgentNode = {
  id: string;
  name: string; // always visible on the chart
  role?: string;
  cardTitle?: string; // exact card heading from the approved copy, when it differs from name
  kind: "person" | "bot" | "tool" | "hub" | "link" | "machine" | "base";
  art: string;
  oneLiner: string;
  useCases: string[]; // 3 or 4 bullets; empty when the copy is a label only
  readMoreHref?: string;
  readMoreLabel?: string; // defaults to "Read more"
  hasCard?: boolean; // default true; false = chart label only
};

const ART = "/images/multi-ai-agent-setup";
const READ_MORE = "/projects/ai-agent-avengers";

export const sectionTitle = "My Multi-AI Agent Setup";

export const lede =
  "This is how I work with AI day to day. Specialized Grok Bots handle writing, research, and builds, and I also work directly in Claude Code, Codex, and Cursor.";

export const tinCanCaption =
  "Agent Tin Can is the relay on Grok Bot's always-on computer. It lets my local coding tools and my bots ask each other for work.";

export const justinToolsCallout =
  "I work in Claude Code, Codex, and Cursor myself. The bots can also hand work to those tools.";

export const justinLabel =
  "I set the work, make the decisions, and approve anything that gets sent, published, or paid for.";

// These two callouts are not in the approved copy (the substance lives on the Grok Bot and Notion cards).
export const claudeOnGrokBotCallout = "";
export const notionCaption = "";

// Hand-lettered group labels drawn inside the chart. Not in the approved copy file.
export const groupLabels = {
  workspace: "Workspace",
  builds: "Builds and design",
  editing: "Editing",
  research: "Research",
  investing: "Investing",
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
    art: `${ART}/justin.svg`,
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
    art: `${ART}/cornbot.svg`,
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
    art: `${ART}/claude-code.svg`,
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
    art: `${ART}/codex.svg`,
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
    art: `${ART}/cursor.svg`,
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
    art: `${ART}/grok-bot-hub.svg`,
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
    art: `${ART}/noah.svg`,
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
    art: `${ART}/forge.svg`,
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
    art: `${ART}/designer.svg`,
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
    art: `${ART}/chief-editor.svg`,
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
    art: `${ART}/beyond-approval.svg`,
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
    art: `${ART}/jmj-capital.svg`,
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
    art: `${ART}/eos-mafia.svg`,
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
    art: `${ART}/neoclouds.svg`,
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
    art: `${ART}/neuronetics.svg`,
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
    art: `${ART}/agent-tin-can.svg`,
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
    art: `${ART}/grok-bot-computer.svg`,
    oneLiner: grokBotOneLiner,
    useCases: grokBotUseCases,
    readMoreHref: READ_MORE,
  },
  {
    id: "notion",
    name: "Notion",
    kind: "base",
    art: `${ART}/notion.svg`,
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
