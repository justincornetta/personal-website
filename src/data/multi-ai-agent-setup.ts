// Copy + node data for the "My Multi-AI Agent Setup" section on /projects.
//
// EVERYTHING in this file is placeholder copy (strings start with "[placeholder]").
// Cornbot replaces strings here only; layout lives in src/components/multi-agent-setup.tsx.
// Art in public/images/multi-ai-agent-setup/ is placeholder too (see the README there).

export type AgentNode = {
  id: string;
  name: string; // always visible on the chart
  role?: string;
  kind: "person" | "bot" | "tool" | "hub" | "link" | "machine" | "base";
  art: string;
  oneLiner: string;
  useCases: string[]; // 3 or 4 bullets
  readMoreHref: string;
  readMoreLabel?: string; // defaults to "Read more"
};

const ART = "/images/multi-ai-agent-setup";
const READ_MORE = "/projects/ai-agent-avengers";

export const sectionTitle = "My Multi-AI Agent Setup";

export const lede =
  "[placeholder] One or two sentences about how Justin runs a team of AI agents and coding tools. Cornbot will write this.";

export const tinCanCaption =
  "[placeholder] Justin's local coding agents and his bots can ask each other for work.";
export const justinToolsCallout =
  "[placeholder] Justin uses these three tools himself, and the bots hand work to them too.";
export const claudeOnGrokBotCallout =
  "[placeholder] The bots run Claude Code on Grok Bot's computer, signed in to Justin's Claude subscription.";
export const notionCaption =
  "[placeholder] Shared knowledge base and skills registry.";

// Hand-lettered group labels drawn inside the chart.
export const groupLabels = {
  workspace: "Workspace",
  builds: "Builds and design",
  editing: "Editing",
  research: "Research",
  investing: "Investing",
};

const placeholderUses = (name: string) => [
  `[placeholder] ${name} use case one`,
  `[placeholder] ${name} use case two`,
  `[placeholder] ${name} use case three`,
];

export const nodes: AgentNode[] = [
  { id: "justin", name: "Justin", kind: "person", art: `${ART}/justin.svg`, oneLiner: "[placeholder] Justin runs the whole setup.", useCases: placeholderUses("Justin"), readMoreHref: READ_MORE },
  { id: "cornbot", name: "Cornbot", role: "Chief of Staff", kind: "bot", art: `${ART}/cornbot.svg`, oneLiner: "[placeholder] Cornbot leads the Grok Bot team.", useCases: placeholderUses("Cornbot"), readMoreHref: READ_MORE },
  { id: "claude-code", name: "Claude Code", kind: "tool", art: `${ART}/claude-code.svg`, oneLiner: "[placeholder] Most coding and front end.", useCases: placeholderUses("Claude Code"), readMoreHref: READ_MORE },
  { id: "codex", name: "Codex", kind: "tool", art: `${ART}/codex.svg`, oneLiner: "[placeholder] Alternates with Claude Code; go-to for image generation.", useCases: placeholderUses("Codex"), readMoreHref: READ_MORE },
  { id: "cursor", name: "Cursor", kind: "tool", art: `${ART}/cursor.svg`, oneLiner: "[placeholder] Some front end.", useCases: placeholderUses("Cursor"), readMoreHref: READ_MORE },
  { id: "grok-bot-hub", name: "Grok Bot", role: "Always-on hub", kind: "hub", art: `${ART}/grok-bot-hub.svg`, oneLiner: "[placeholder] The always-on hub the specialist bots work from.", useCases: placeholderUses("Grok Bot"), readMoreHref: READ_MORE },
  { id: "noah", name: "Noah", role: "Notion", kind: "bot", art: `${ART}/noah.svg`, oneLiner: "[placeholder] Noah works in Notion.", useCases: placeholderUses("Noah"), readMoreHref: READ_MORE },
  { id: "forge", name: "Forge", role: "Builds", kind: "bot", art: `${ART}/forge.svg`, oneLiner: "[placeholder] Forge builds and reviews code.", useCases: placeholderUses("Forge"), readMoreHref: READ_MORE },
  { id: "designer", name: "Designer", role: "Design", kind: "bot", art: `${ART}/designer.svg`, oneLiner: "[placeholder] Designer handles design work.", useCases: placeholderUses("Designer"), readMoreHref: READ_MORE },
  { id: "chief-editor", name: "Chief Editor", role: "Editing", kind: "bot", art: `${ART}/chief-editor.svg`, oneLiner: "[placeholder] Chief Editor edits writing.", useCases: placeholderUses("Chief Editor"), readMoreHref: READ_MORE },
  { id: "beyond-approval", name: "Beyond Approval", role: "Research", kind: "bot", art: `${ART}/beyond-approval.svg`, oneLiner: "[placeholder] Beyond Approval does research.", useCases: placeholderUses("Beyond Approval"), readMoreHref: READ_MORE },
  { id: "jmj-capital", name: "JMJ Capital", role: "Investing", kind: "bot", art: `${ART}/jmj-capital.svg`, oneLiner: "[placeholder] JMJ Capital covers investing.", useCases: placeholderUses("JMJ Capital"), readMoreHref: READ_MORE },
  { id: "eos-mafia", name: "Eos Mafia", role: "Investing", kind: "bot", art: `${ART}/eos-mafia.svg`, oneLiner: "[placeholder] Eos Mafia covers investing.", useCases: placeholderUses("Eos Mafia"), readMoreHref: READ_MORE },
  { id: "neoclouds", name: "Neoclouds", role: "Investing", kind: "bot", art: `${ART}/neoclouds.svg`, oneLiner: "[placeholder] Neoclouds covers investing.", useCases: placeholderUses("Neoclouds"), readMoreHref: READ_MORE },
  { id: "neuronetics", name: "Neuronetics", role: "Investing", kind: "bot", art: `${ART}/neuronetics.svg`, oneLiner: "[placeholder] Neuronetics covers investing.", useCases: placeholderUses("Neuronetics"), readMoreHref: READ_MORE },
  { id: "agent-tin-can", name: "Agent Tin Can", kind: "link", art: `${ART}/agent-tin-can.svg`, oneLiner: "[placeholder] The relay that lets agents ask each other for work.", useCases: placeholderUses("Agent Tin Can"), readMoreHref: READ_MORE },
  { id: "grok-bot-computer", name: "Grok Bot's computer", kind: "machine", art: `${ART}/grok-bot-computer.svg`, oneLiner: "[placeholder] The always-on machine running the Tin Can relay.", useCases: placeholderUses("Grok Bot's computer"), readMoreHref: READ_MORE },
  { id: "notion", name: "Notion", kind: "base", art: `${ART}/notion.svg`, oneLiner: "[placeholder] Shared knowledge base and skills registry.", useCases: placeholderUses("Notion"), readMoreHref: READ_MORE },
];
