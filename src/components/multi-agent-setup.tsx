"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  claudeOnGrokBotCallout,
  groupLabels,
  justinLabel,
  justinToolsCallout,
  lede,
  nodes,
  notionCaption,
  sectionTitle,
  tinCanCaption,
} from "@/data/multi-ai-agent-setup";
import styles from "./multi-agent-setup.module.css";

// Layout only (no copy). x/y are percentages of the chart sheet (art centre for nodes,
// top-left for text). DOM order below is also the tab order and the mobile stacking order.
type Item =
  | { t: "node"; id: string; x: number; y: number; wide?: boolean; full?: boolean }
  | { t: "text"; key: string; text: string; x: number; y: number; w: number; cls: string };

const items: Item[] = [
  { t: "node", id: "justin", x: 50, y: 6, full: true },
  { t: "text", key: "tools-callout", text: justinToolsCallout, x: 3, y: 3, w: 28, cls: "callout" },
  { t: "node", id: "cornbot", x: 20, y: 22 },
  { t: "node", id: "claude-code", x: 88, y: 15 },
  { t: "node", id: "codex", x: 88, y: 28 },
  { t: "node", id: "cursor", x: 88, y: 41 },
  { t: "node", id: "grok-bot-hub", x: 20, y: 40, full: true },
  { t: "text", key: "workspace", text: groupLabels.workspace, x: 3, y: 49.5, w: 12, cls: "group" },
  { t: "node", id: "noah", x: 8, y: 59 },
  { t: "text", key: "builds", text: groupLabels.builds, x: 24, y: 49.5, w: 22, cls: "group" },
  { t: "node", id: "forge", x: 28, y: 59 },
  { t: "node", id: "designer", x: 42, y: 59 },
  { t: "text", key: "editing", text: groupLabels.editing, x: 52, y: 49.5, w: 12, cls: "group" },
  { t: "node", id: "chief-editor", x: 56, y: 59 },
  { t: "text", key: "research", text: groupLabels.research, x: 65, y: 49.5, w: 11, cls: "group" },
  { t: "node", id: "beyond-approval", x: 69, y: 59 },
  { t: "text", key: "investing", text: groupLabels.investing, x: 3, y: 67.5, w: 12, cls: "group" },
  { t: "node", id: "jmj-capital", x: 18, y: 80 },
  { t: "node", id: "eos-mafia", x: 34, y: 80 },
  { t: "node", id: "neoclouds", x: 50, y: 80 },
  { t: "node", id: "neuronetics", x: 66, y: 80 },
  { t: "node", id: "agent-tin-can", x: 88, y: 56, full: true },
  { t: "text", key: "tin-can-caption", text: tinCanCaption, x: 77, y: 64, w: 22, cls: "caption" },
  { t: "node", id: "grok-bot-computer", x: 88, y: 71, full: true },
  { t: "text", key: "claude-callout", text: claudeOnGrokBotCallout, x: 77, y: 78, w: 22, cls: "callout" },
  { t: "node", id: "notion", x: 50, y: 92, wide: true, full: true },
  { t: "text", key: "notion-caption", text: notionCaption, x: 25, y: 96.5, w: 50, cls: "caption" },
];

const pos = Object.fromEntries(items.flatMap((i) => (i.t === "node" ? [[i.id, i]] : [])));

const TOOLS = ["claude-code", "codex", "cursor"];
const SPECIALISTS = ["noah", "forge", "designer", "chief-editor", "beyond-approval"];
const edges: [string, string][] = [
  ["justin", "cornbot"],
  ...TOOLS.map((t): [string, string] => ["justin", t]),
  ["cornbot", "grok-bot-hub"],
  ...SPECIALISTS.map((s): [string, string] => ["grok-bot-hub", s]),
  ...["forge", "designer"].flatMap((b) => TOOLS.map((t): [string, string] => [b, t])),
  ["agent-tin-can", "grok-bot-computer"],
];

// Chart coordinate space: 1000 wide, 1200 tall (matches the sheet's aspect ratio).
const W = 10;
const H = 12;

// Gentle hand-drawn curve between two nodes. Ends stop short of the art; a line leaving
// a node downward also clears its name.
function curve(a: string, b: string) {
  const p = pos[a], q = pos[b];
  const ax = p.x * W, ay = p.y * H, bx = q.x * W, by = q.y * H;
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  // Stop at the art's edge; leave extra room where the line runs under a node (its name).
  const sa = 50 + (uy > 0 ? 45 * uy : 0);
  const sb = 50 + (uy < 0 ? 45 * -uy : 0);
  const mx = (ax + bx) / 2 - uy * 22, my = (ay + by) / 2 + ux * 22;
  return `M${ax + ux * sa} ${ay + uy * sa} Q${mx} ${my} ${bx - ux * sb} ${by - uy * sb}`;
}

const dashed = [
  // Investing bus: hub down to a bar with a drop to each of the four bots.
  `M${20 * W} ${40 * H + 90} Q${16 * W} ${55 * H} ${18 * W} ${69 * H}`,
  `M${18 * W} ${69 * H} L${66 * W} ${69 * H}`,
  ...[18, 34, 50, 66].map((x) => `M${x * W} ${69 * H} Q${x * W + 6} ${73 * H} ${x * W} ${80 * H - 48}`),
  // Agent Tin Can bracket joining the three tools.
  `M${96 * W - 6} ${15 * H - 40} Q${99 * W} ${28 * H} ${96 * W - 6} ${41 * H + 40}`,
  `M${98.4 * W} ${28 * H} Q${99.2 * W} ${44 * H} ${88 * W + 40} ${56 * H - 42}`,
  // Everything sits on Notion.
  `M${40 * W} ${88.5 * H} L${40 * W + 4} ${91 * H - 36}`,
  `M${62 * W} ${88.5 * H} L${62 * W - 4} ${91 * H - 36}`,
  `M${88 * W} ${71 * H + 100} L${88 * W - 6} ${91 * H - 36}`,
];

const focusableSelector = "a[href], button:not([disabled])";

export function MultiAgentSetup() {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyes = useRef<{ id: string; node: HTMLElement; svg: SVGSVGElement | null } | null>(null);
  const svgCache = useRef<Record<string, string>>({});
  const open = nodes.find((n) => n.id === openId) ?? null;

  const close = () => setOpenId(null);

  // Dialog behaviour: focus in, Escape, focus trap, scroll lock, restore focus.
  useEffect(() => {
    if (!openId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenId(null);
      } else if (event.key === "Tab") {
        const focusable = cardRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
        if (!focusable?.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!cardRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [openId]);

  // Eye tracking: fine pointer + hover, no reduced motion, no open card. Only the pupils move.
  const stopEyes = () => {
    const current = eyes.current;
    if (!current) return;
    current.svg?.remove();
    current.node.classList.remove(styles.tracking);
    eyes.current = null;
  };

  const trackEyes = (event: React.PointerEvent) => {
    if (event.pointerType === "touch" || openId) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = (event.target as HTMLElement).closest<HTMLElement>("[data-eyes]");
    if (!node) return stopEyes();
    const id = node.dataset.eyes as string;
    if (eyes.current?.id !== id) {
      stopEyes();
      eyes.current = { id, node, svg: null };
      const art = node.querySelector<HTMLElement>("[data-art]");
      const src = art?.dataset.art;
      if (!art || !src) return;
      const mount = (markup: string) => {
        if (eyes.current?.id !== id || eyes.current.svg) return;
        const svg = new DOMParser().parseFromString(markup, "image/svg+xml").documentElement as unknown as SVGSVGElement;
        if (!svg.querySelector("#pupil-left")) return;
        svg.removeAttribute("role");
        svg.setAttribute("aria-hidden", "true");
        svg.classList.add(styles.inlineArt);
        art.appendChild(svg);
        node.classList.add(styles.tracking);
        eyes.current.svg = svg;
      };
      if (svgCache.current[src]) mount(svgCache.current[src]);
      else fetch(src).then((r) => r.text()).then((text) => { svgCache.current[src] = text; mount(text); }).catch(() => {});
    }
    const svg = eyes.current?.svg;
    if (!svg) return;
    for (const side of ["pupil-left", "pupil-right"]) {
      const pupil = svg.querySelector<SVGElement>(`#${side}`);
      if (!pupil) continue;
      const box = pupil.getBoundingClientRect();
      // Undo the previous nudge so the centre we measure is the resting one.
      const rest = pupil.dataset.rest ? pupil.dataset.rest.split(",").map(Number) : [0, 0];
      const cx = box.left + box.width / 2 - rest[0], cy = box.top + box.height / 2 - rest[1];
      const dx = event.clientX - cx, dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const scale = svg.getBoundingClientRect().width / 128 || 1;
      const move = Math.min(3.2 * scale, dist);
      const mx = (dx / dist) * move, my = (dy / dist) * move;
      pupil.dataset.rest = `${mx},${my}`;
      pupil.setAttribute("transform", `translate(${mx / scale} ${my / scale})`);
    }
  };

  return (
    <section className={`portfolio-section ${styles.section}`} id="multi-ai-agent-setup" aria-labelledby="multi-ai-agent-setup-title">
      <header className="portfolio-section__header reveal reveal-1">
        <h2 id="multi-ai-agent-setup-title">{sectionTitle}</h2>
        <p>{lede}</p>
      </header>

      <div className={styles.sheet} inert={open ? true : undefined}>
        <div className={styles.canvas} onPointerMove={trackEyes} onPointerLeave={stopEyes}>
          <div className={styles.frame} aria-hidden="true" />
          <svg className={styles.lines} viewBox={`0 0 ${1000} ${1200}`} aria-hidden="true" focusable="false">
            {edges.map(([a, b]) => <path key={`${a}-${b}`} d={curve(a, b)} />)}
            {dashed.map((d) => <path key={d} d={d} />)}
          </svg>
          {items.map((item) => {
            if (item.t === "text") {
              if (!item.text) return null;
              const style = { "--x": item.x, "--y": item.y, "--w": item.w } as CSSProperties;
              return <p key={item.key} className={`${styles.text} ${styles[item.cls]}`} style={style}>{item.text}</p>;
            }
            const node = nodes.find((n) => n.id === item.id)!;
            const hasEyes = node.kind === "person" || node.kind === "bot" || node.kind === "hub" || node.kind === "tool";
            const style = { "--x": item.x, "--y": item.y } as CSSProperties;
            const className = `${styles.node}${item.wide ? ` ${styles.wide}` : ""}${item.full ? ` ${styles.full}` : ""}`;
            const art = (
              <span className={styles.art} data-art={node.art}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={node.art} alt="" loading="lazy" decoding="async" draggable={false} />
              </span>
            );
            if (node.hasCard === false) {
              return (
                <div key={node.id} className={className} style={style} data-eyes={hasEyes ? node.id : undefined}>
                  {art}
                  <span className={styles.name}>{node.name}</span>
                  {node.id === "justin" ? <span className={styles.label}>{justinLabel}</span> : null}
                </div>
              );
            }
            return (
              <button
                key={node.id}
                type="button"
                className={className}
                style={style}
                data-eyes={hasEyes ? node.id : undefined}
                aria-haspopup="dialog"
                onClick={(event) => {
                  stopEyes();
                  triggerRef.current = event.currentTarget;
                  setOpenId(node.id);
                }}
              >
                {art}
                <span className={styles.name}>{node.name}</span>
                {node.role ? <span className={styles.role}>{node.role}</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {open ? (
        <div
          className={styles.overlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={cardRef}
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby="multi-ai-agent-card-title"
          >
            <button ref={closeRef} type="button" className={styles.close} aria-label={`Close ${open.name} details`} onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <h3 id="multi-ai-agent-card-title">{open.cardTitle ?? open.name}</h3>
            <p className={styles.oneLiner}>{open.oneLiner}</p>
            {open.useCases.length > 0 ? (
              <ul>
                {open.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
              </ul>
            ) : null}
            {open.readMoreHref ? (
              <Link className={styles.readMore} href={open.readMoreHref} onClick={close}>
                {open.readMoreLabel ?? "Read more"}
                <span className="sr-only"> about {open.cardTitle ?? open.name}</span>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
