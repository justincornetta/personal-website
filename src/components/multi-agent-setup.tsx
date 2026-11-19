"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  groupLabels,
  storageLinkLabels,
  storageTitle,
  lede,
  nodes,
  sectionTitle,
} from "@/data/multi-ai-agent-setup";
import type { AgentNode, PhotoEye, V2Pupil } from "@/data/multi-ai-agent-setup";
import styles from "./multi-agent-setup.module.css";

// Layout is a plain top-down tree built from normal flow (no coordinates). DOM order is the tab
// order and the mobile stacking order: Justin, Grok Bot branch, links, tools, storage.
// Cornbot's direct reports, left to right. JMJ Capital sits in the middle, so its drop to the scan bots
// lines up with Cornbot's stem and lands on the centre of the scans box.
const reportIds = ["forge", "designer", "jmj-capital", "beyond-approval", "chief-editor"];
const scanIds = ["eos-mafia", "neoclouds", "neuronetics"];
const toolIds = ["claude-code", "codex", "cursor"];
// Storage row, left to right: Google Drive, then Noah as the gate in front of Notion, then local files and
// GitHub (the two that Noah checks Notion against for drift sit next to it).
const storesBefore = ["google-drive"];
const storesAfter = ["local-files", "github"];

// --- Connection lines (desktop and tablet) ---------------------------------------------------------------
// Drawn in one SVG over the tree from the measured positions of each node's picture, so they follow the
// layout at any width. "relay" = Agent Tincan (dashed), "cli" = runs on Grok Bot's computer (dotted).
// `arrow`: which ends get an arrowhead ("end" = at the second node, "both" = a two-way link).
// "brace" = the solid bracket over the storage row.
type Wire = { d: string; kind: "relay" | "cli" | "brace"; arrow?: "end" | "both" };
// A hand-lettered label on a connection. Several `lines` stack downward from y.
type WireLabel = { x: number; y: number; lines: string[]; anchor: "start" | "middle" | "end" };
type Wiring = { wires: Wire[]; labels: WireLabel[] };
const WIRE_PAD = 4; // gap between a line end and the picture it points at

function measureWires(tree: HTMLElement): Wiring {
  if (window.matchMedia("(max-width: 719px)").matches) return { wires: [], labels: [] };
  const origin = tree.getBoundingClientRect();
  const box = (id: string) => {
    const art = tree.querySelector<HTMLElement>(`[data-node="${id}"] [data-art]`);
    if (!art) return null;
    const r = art.getBoundingClientRect();
    // Not laid out yet (off screen or still hidden): draw nothing rather than lines collapsed at 0,0.
    if (!r.width || !r.height) return null;
    return { l: r.left - origin.left, r: r.right - origin.left, t: r.top - origin.top, cx: r.left - origin.left + r.width / 2, cy: r.top - origin.top + r.height / 2, h: r.height / 2 };
  };
  // The whole node (picture plus its name and role), for lines that run under the labels.
  const whole = (id: string) => {
    const el = tree.querySelector<HTMLElement>(`[data-node="${id}"]`);
    const r = el?.getBoundingClientRect();
    return r && r.width ? { b: r.bottom - origin.top } : null;
  };
  const f = (n: number) => n.toFixed(1);
  // Horizontal-ish S curve between two points.
  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const k = Math.max(30, Math.abs(x2 - x1) * 0.45);
    const dir = x2 >= x1 ? 1 : -1;
    return `M${f(x1)} ${f(y1)} C${f(x1 + k * dir)} ${f(y1)} ${f(x2 - k * dir)} ${f(y2)} ${f(x2)} ${f(y2)}`;
  };
  const can = box("agent-tin-can"), pc = box("grok-bot-computer"), corn = box("cornbot");
  const tools = ["claude-code", "codex", "cursor"].map(box);
  const wires: Wire[] = [];
  // Tincan to Cornbot: swing out past the right end of the reports row, then in to Cornbot, so the line
  // does not cross Chief Editor.
  const lastReport = box("chief-editor");
  if (can && corn) {
    const xm = Math.min(can.l - 12, (lastReport ? lastReport.r : corn.r) + 30);
    wires.push({ kind: "relay", arrow: "end", d: `M${f(can.l - WIRE_PAD)} ${f(can.cy)} C${f(xm)} ${f(can.cy)} ${f(xm)} ${f(corn.cy)} ${f(corn.r + WIRE_PAD)} ${f(corn.cy)}` });
  }
  tools.forEach((tool) => {
    if (can && tool) wires.push({ kind: "relay", d: curve(can.r + WIRE_PAD, can.cy, tool.l - WIRE_PAD, tool.cy + tool.h * 0.25) });
  });
  // Claude Code and Codex are installed on Grok Bot's computer.
  tools.slice(0, 2).forEach((tool) => {
    if (pc && tool) wires.push({ kind: "cli", arrow: "end", d: curve(pc.r + WIRE_PAD, pc.cy, tool.l - WIRE_PAD, tool.cy - tool.h * 0.25) });
  });
  if (pc && corn) wires.push({ kind: "cli", d: curve(pc.l - WIRE_PAD, pc.cy, corn.r + WIRE_PAD, corn.cy - corn.h * 0.35) });
  // The tools also talk to each other...
  const [cc, cx, cu] = tools;
  // ...drawn as one bracket on their right: a vertical line with a short arrow into each tool.
  if (cc && cx && cu) {
    const bx = Math.max(cc.r, cx.r, cu.r) + 30, r = 10;
    wires.push({ kind: "relay", d: `M${f(bx)} ${f(cc.cy + r)} L${f(bx)} ${f(cu.cy - r)}` });
    wires.push({ kind: "relay", arrow: "end", d: `M${f(bx)} ${f(cc.cy + r)} Q${f(bx)} ${f(cc.cy)} ${f(bx - r)} ${f(cc.cy)} L${f(cc.r + WIRE_PAD)} ${f(cc.cy)}` });
    wires.push({ kind: "relay", arrow: "end", d: `M${f(bx)} ${f(cx.cy)} L${f(cx.r + WIRE_PAD)} ${f(cx.cy)}` });
    wires.push({ kind: "relay", arrow: "end", d: `M${f(bx)} ${f(cu.cy - r)} Q${f(bx)} ${f(cu.cy)} ${f(bx - r)} ${f(cu.cy)} L${f(cu.r + WIRE_PAD)} ${f(cu.cy)}` });
  }

  // --- Storage row ---
  const labels: WireLabel[] = [];
  const notion = box("notion"), local = box("local-files"), hub = box("github"), noah = box("noah");
  const base = tree.querySelector<HTMLElement>("[data-base]")?.getBoundingClientRect();
  if (notion && base && base.width) {
    // Every agent reads the operating guide: a bracket under the whole chart, its point dropping into Notion.
    const baseTop = base.top - origin.top;
    const x0 = 28, x1 = origin.width - 28, tip = notion.cx, r = 14;
    const y0 = baseTop - 58, y1 = y0 + 11, y2 = y1 + 11;
    wires.push({
      kind: "brace",
      d: `M${f(x0)} ${f(y0)} Q${f(x0)} ${f(y1)} ${f(x0 + r)} ${f(y1)} L${f(tip - r)} ${f(y1)} Q${f(tip)} ${f(y1)} ${f(tip)} ${f(y2)} Q${f(tip)} ${f(y1)} ${f(tip + r)} ${f(y1)} L${f(x1 - r)} ${f(y1)} Q${f(x1)} ${f(y1)} ${f(x1)} ${f(y0)}`,
    });
    wires.push({ kind: "relay", arrow: "end", d: `M${f(tip)} ${f(y2 + 4)} L${f(tip)} ${f(notion.t - WIRE_PAD)}` });
    labels.push({ x: tip + 10, y: y2 + 16, lines: [storageLinkLabels.read], anchor: "start" });
    // ...and every change request (a skill update, a new database) drops off the same bracket to Noah.
    if (noah) {
      wires.push({ kind: "relay", arrow: "end", d: `M${f(noah.cx)} ${f(y1 + 1)} L${f(noah.cx)} ${f(noah.t - WIRE_PAD)}` });
      labels.push({ x: noah.cx - 10, y: y2 + 16, lines: [storageLinkLabels.requests], anchor: "end" });
    }
  }
  if (noah && notion) {
    // Noah is the only one who edits Notion. (On phones this arrow is plain HTML inside the row.)
    wires.push({ kind: "relay", arrow: "end", d: `M${f(noah.r + WIRE_PAD)} ${f(noah.cy)} L${f(notion.l - WIRE_PAD)} ${f(notion.cy)}` });
    labels.push({ x: (noah.r + notion.l) / 2, y: noah.cy - 10, lines: [storageLinkLabels.edits], anchor: "middle" });
  }
  if (local && notion) {
    // Local files point back to Notion for guides and skills.
    wires.push({ kind: "relay", arrow: "end", d: `M${f(local.l - WIRE_PAD)} ${f(local.cy)} L${f(notion.r + WIRE_PAD)} ${f(notion.cy)}` });
    labels.push({ x: (local.l + notion.r) / 2, y: local.cy - 10, lines: [storageLinkLabels.pointsTo], anchor: "middle" });
  }
  if (local && hub) {
    // Local files hold a copy of each repo's code (pulled down, pushed back up).
    wires.push({ kind: "relay", arrow: "both", d: `M${f(local.r + WIRE_PAD)} ${f(local.cy)} L${f(hub.l - WIRE_PAD)} ${f(hub.cy)}` });
    const [a, b] = storageLinkLabels.codeCopy.split(" of ");
    labels.push({ x: (local.r + hub.l) / 2, y: local.cy - 22, lines: [a, `of ${b}`], anchor: "middle" });
  }
  if (noah && notion && local && hub) {
    // Noah's drift check across Notion, local files and GitHub: a dotted rail under the row.
    const ids = ["noah", "notion", "local-files", "github"];
    const bottoms = ids.map(whole);
    if (bottoms.every(Boolean)) {
      const y = Math.max(...bottoms.map((b) => b!.b)) + 18;
      const xs = [noah.cx, notion.cx, local.cx, hub.cx];
      const drops = xs.map((x, i) => `M${f(x)} ${f(bottoms[i]!.b + 4)} L${f(x)} ${f(y)}`).join(" ");
      wires.push({ kind: "cli", d: `${drops} M${f(xs[0])} ${f(y)} L${f(xs[3])} ${f(y)}` });
      labels.push({ x: (xs[0] + xs[3]) / 2, y: y + 18, lines: [storageLinkLabels.drift], anchor: "middle" });
    }
  }
  return { wires, labels };
}

const focusableSelector = "a[href], button:not([disabled])";

// --- Eye tracking limits -------------------------------------------------------------------------
// v2 SVGs: the two pupil groups never move more than this many viewBox units (of 128).
const V2_MAX_TRAVEL = 1.2; // default when a picture has no measured `max`
// Photos: default pupil travel as a fraction of the photo width. Per-eye `max` overrides it.
const PHOTO_MAX_TRAVEL = 0.014;
// Photos lean toward the cursor so their gaze reads clearly (their eyes have little white for the pupils to
// travel in). Degrees of lean and viewBox units of shift (of 100). "tilt" subjects (no eyes) lean fully;
// photos with eyes lean by PHOTO_LEAN of that, on top of their moving pupils.
const TILT_DEG = 4;
const TILT_SHIFT = 1.4;
const PHOTO_LEAN = 0.65;

// --- Photo in a hand-drawn circle ------------------------------------------------------------------
// Photos live in a 100x100 box: the picture is 92x92 at (4,4), clipped to a circle.
const PHOTO_BOX = 100, PHOTO_PAD = 4, PHOTO_SIZE = 92;

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A slightly imperfect ink circle: radius wobbles, the pen starts and finishes at different angles so the
// stroke overshoots, then a smooth Catmull-Rom curve is drawn through the points. Deterministic per seed.
function sketchCircle(seed: string, r: number, wobble: number, turn: number) {
  const rand = rng(hash(seed));
  const start = rand() * Math.PI * 2;
  const count = 13;
  const pts: [number, number][] = [];
  for (let i = 0; i <= count; i++) {
    const a = start + (i / count) * Math.PI * 2 * turn;
    const rr = r + (rand() - 0.5) * 2 * wobble;
    pts.push([PHOTO_BOX / 2 + Math.cos(a) * rr, PHOTO_BOX / 2 + Math.sin(a) * rr]);
  }
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

function PhotoPupil({ eye, side, uid }: { eye: PhotoEye; side: "left" | "right"; uid: string }) {
  const cx = PHOTO_PAD + eye.cx * PHOTO_SIZE, cy = PHOTO_PAD + eye.cy * PHOTO_SIZE;
  const rx = eye.rx * PHOTO_SIZE, ry = (eye.ry ?? eye.rx) * PHOTO_SIZE;
  const max = (eye.max ?? PHOTO_MAX_TRAVEL) * PHOTO_SIZE;
  return (
    <>
      {eye.cover ? <ellipse cx={cx} cy={cy} rx={rx * 1.25} ry={ry * 1.25} fill={eye.cover} /> : null}
      <g id={`${uid}-pupil-${side}`} data-pupil={side} data-cx={cx} data-cy={cy} data-max={max}>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={eye.fill ?? "#0d0d0d"} />
        <circle cx={cx - rx * 0.32} cy={cy - ry * 0.34} r={Math.max(rx * 0.26, 0.35)} fill="#f6f4ef" opacity="0.85" />
      </g>
    </>
  );
}

function PhotoArt({ node, uid }: { node: AgentNode; uid: string }) {
  const clip = `${uid}-clip`;
  const eyes = Array.isArray(node.eyes) ? node.eyes : [];
  return (
    <svg className={styles.artSvg} viewBox={`0 0 ${PHOTO_BOX} ${PHOTO_BOX}`} data-vb={PHOTO_BOX} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <circle cx={PHOTO_BOX / 2} cy={PHOTO_BOX / 2} r={PHOTO_SIZE / 2} />
        </clipPath>
      </defs>
      <g data-tilt={node.eyes === "tilt" ? 1 : PHOTO_LEAN}>
        <g clipPath={`url(#${clip})`}>
          <image href={node.art} x={PHOTO_PAD} y={PHOTO_PAD} width={PHOTO_SIZE} height={PHOTO_SIZE} preserveAspectRatio="xMidYMid slice" />
          {eyes.map((eye, i) => <PhotoPupil key={i} eye={eye} side={i === 0 ? "left" : "right"} uid={uid} />)}
        </g>
        <path className={styles.ink} d={sketchCircle(`${node.id}-a`, 47.2, 0.7, 1.04)} strokeWidth="2.3" />
        <path className={styles.ink} d={sketchCircle(`${node.id}-b`, 46.4, 0.9, 0.9)} strokeWidth="1" opacity="0.55" />
      </g>
    </svg>
  );
}

// --- v2 SVG, inlined ---------------------------------------------------------------------------------
// The raster is the 512px image from the v2 file; the pupil groups are copied from it. Only the outer
// group is translated, so each pupil keeps its own rotation.
function V2PupilGroup({ pupil, side, uid, max }: { pupil: V2Pupil; side: "left" | "right"; uid: string; max?: number }) {
  return (
    <>
    {pupil.cover ? (
      <ellipse cx={pupil.cx} cy={pupil.cy} rx={pupil.rx * 1.2} ry={pupil.ry * 1.12} fill={pupil.cover} />
    ) : null}
    <g id={`${uid}-pupil-${side}`} data-pupil={side} data-cx={pupil.cx} data-cy={pupil.cy} data-max={max ?? V2_MAX_TRAVEL}>
      <ellipse cx={pupil.cx} cy={pupil.cy} rx={pupil.rx} ry={pupil.ry} transform={`rotate(${pupil.rot} ${pupil.cx} ${pupil.cy})`} fill="#103666" />
      <circle cx={pupil.hx} cy={pupil.hy} r={pupil.hr} fill="#F6F4EF" />
    </g>
    </>
  );
}

function V2Art({ node, uid }: { node: AgentNode; uid: string }) {
  return (
    <svg className={styles.artSvg} viewBox="0 0 128 128" data-vb="128" aria-hidden="true" focusable="false">
      <image href={node.art} width="128" height="128" />
      {node.pupils ? <V2PupilGroup pupil={node.pupils.left} side="left" uid={uid} max={node.pupils.max} /> : null}
      {node.pupils ? <V2PupilGroup pupil={node.pupils.right} side="right" uid={uid} max={node.pupils.max} /> : null}
    </svg>
  );
}

export function MultiAgentSetup() {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const uidBase = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const treeRef = useRef<HTMLDivElement>(null);
  const [{ wires, labels }, setWiring] = useState<Wiring>({ wires: [], labels: [] });

  useLayoutEffect(() => {
    const tree = treeRef.current;
    if (!tree) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWiring(measureWires(tree)));
    };
    update();
    // Re-measure when the tree resizes, when it scrolls into view (its pictures may have had no size
    // before), and once fonts and images have settled.
    const observer = new ResizeObserver(update);
    observer.observe(tree);
    const visible = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && update());
    visible.observe(tree);
    document.fonts?.ready.then(update);
    window.addEventListener("load", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visible.disconnect();
      window.removeEventListener("load", update);
    };
  }, []);
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

  // Eye tracking: fine pointer + hover, no reduced motion, no open card. While the pointer is anywhere over
  // the chart, every picture follows it: pupils move within their eyes, and photos also lean toward it (the
  // clinic, with no eyes, only leans). Touch and reduced motion never get here. One update per frame.
  const eyeFrame = useRef(0);

  const stopEyes = () => {
    cancelAnimationFrame(eyeFrame.current);
    treeRef.current?.querySelectorAll("[data-pupil], [data-tilt]").forEach((el) => el.removeAttribute("transform"));
  };

  const aimNode = (node: HTMLElement, x: number, y: number) => {
    const svg = node.querySelector<SVGSVGElement>("svg[data-vb]");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const box = Number(svg.dataset.vb);
    const scale = rect.width / box || 1;
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));

    svg.querySelectorAll<SVGGElement>("[data-pupil]").forEach((pupil) => {
      const cx = rect.left + Number(pupil.dataset.cx) * scale, cy = rect.top + Number(pupil.dataset.cy) * scale;
      const dx = x - cx, dy = y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      // Ease in over the first ~30px so the pupil does not snap when the pointer is right on top of it.
      const move = Number(pupil.dataset.max) * Math.min(1, dist / 30);
      pupil.setAttribute("transform", `translate(${((dx / dist) * move).toFixed(3)} ${((dy / dist) * move).toFixed(3)})`);
    });

    const tilt = svg.querySelector<SVGGElement>("[data-tilt]");
    if (tilt) {
      // Lean toward the pointer, full strength once it is about two picture-widths away.
      const dx = (x - (rect.left + rect.width / 2)) / (rect.width * 2);
      const dy = (y - (rect.top + rect.height / 2)) / (rect.height * 2);
      const half = box / 2;
      const k = Number(tilt.dataset.tilt) || 1; // lean strength: 1 for subjects with no eyes, less for photos with eyes
      tilt.setAttribute("transform", `translate(${(clamp(dx) * TILT_SHIFT * k).toFixed(3)} ${(clamp(dy) * TILT_SHIFT * k).toFixed(3)}) rotate(${(clamp(dx) * TILT_DEG * k).toFixed(3)} ${half} ${half})`);
    }
  };

  const trackEyes = (event: React.PointerEvent) => {
    if (event.pointerType === "touch" || openId) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const { clientX: x, clientY: y } = event;
    cancelAnimationFrame(eyeFrame.current);
    eyeFrame.current = requestAnimationFrame(() => {
      treeRef.current?.querySelectorAll<HTMLElement>("[data-eyes]").forEach((node) => aimNode(node, x, y));
    });
  };

  const renderNode = (id: string) => {
    const node = nodes.find((n) => n.id === id)!;
    const hasEyes = Boolean(node.pupils || node.eyes);
    const uid = `${uidBase}-${node.id}`;
    const art = (
      <span className={`${styles.art} ${node.art.includes("/v2/") ? styles.artV2 : ""}`} data-art="">
        {node.art.includes("/v2/") ? <V2Art node={node} uid={uid} /> : <PhotoArt node={node} uid={uid} />}
      </span>
    );
    return (
      <button
        key={node.id}
        type="button"
        className={`${styles.node} ${node.kind === "person" ? styles.person : ""} ${styles[`k_${node.kind}`] ?? ""}`}
        data-node={node.id}
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
        {/* Hover/focus preview. The card repeats it, so screen readers get it there. */}
        <span className={styles.tip} aria-hidden="true">
          {node.oneLiner}
          <span className={styles.tipMore}>Click for more</span>
        </span>
      </button>
    );
  };

  // A hand-lettered group heading that works like a node: hover preview, click opens its card.
  const renderHeading = (id: string) => {
    const node = nodes.find((n) => n.id === id)!;
    return (
      <button
        type="button"
        className={`${styles.groupLabel} ${styles.headingButton}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          stopEyes();
          triggerRef.current = event.currentTarget;
          setOpenId(node.id);
        }}
      >
        {node.name}
        <span className={styles.tip} aria-hidden="true">
          {node.oneLiner}
          <span className={styles.tipMore}>Click for more</span>
        </span>
      </button>
    );
  };

  return (
    <section className={`portfolio-section ${styles.section}`} id="multi-ai-agent-setup" aria-labelledby="multi-ai-agent-setup-title">
      <div className={styles.sheetWrap}>
      {/* A strip of masking tape holding the sheet to the wall. Decorative only. */}
      <span className={styles.tape} aria-hidden="true" />
      <div className={styles.sheet} inert={open ? true : undefined}>
        {/* The title and lede are written on the sheet itself, in pen. */}
        <header className={styles.sheetHeader}>
          <h2 id="multi-ai-agent-setup-title" className={styles.sheetTitle}>{sectionTitle}</h2>
          <p className={styles.sheetLede}>{lede}</p>
        </header>
        <div ref={treeRef} className={styles.tree} onPointerMove={trackEyes} onPointerLeave={stopEyes}>
          {wires.length ? (
            <svg className={styles.wires} aria-hidden="true" focusable="false">
              <defs>
                {/* Open hand-drawn chevron; auto-start-reverse points it outward at either end. */}
                <marker id={`${uidBase}-arrow`} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="13" markerHeight="13" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                  <path d="M2 1.5 L10 6 L2 10.5" className={styles.arrowHead} />
                </marker>
              </defs>
              {wires.map((w, i) => (
                <path
                  key={i}
                  d={w.d}
                  className={w.kind === "cli" ? styles.wireCli : w.kind === "brace" ? styles.wireBrace : styles.wireRelay}
                  markerEnd={w.arrow ? `url(#${uidBase}-arrow)` : undefined}
                  markerStart={w.arrow === "both" ? `url(#${uidBase}-arrow)` : undefined}
                />
              ))}
              {labels.map((l, i) => (
                <text key={i} x={l.x} y={l.y} textAnchor={l.anchor} className={styles.wireLabel}>
                  {l.lines.map((line, j) => (
                    <tspan key={j} x={l.x} dy={j ? "1.15em" : 0}>{line}</tspan>
                  ))}
                </text>
              ))}
            </svg>
          ) : null}
          <div className={styles.top}>{renderNode("justin")}</div>

          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railStem} />
            <span className={styles.railL} />
            <span className={styles.railM} />
            <span className={styles.railR} />
          </div>

          <section className={`${styles.branch} ${styles.grok}`} aria-labelledby="mas-grok-title">
            <h3 id="mas-grok-title" className={styles.groupHeading}>{renderHeading("grok-bot-hub")}</h3>
            {renderNode("cornbot")}
            <span className={styles.stem} aria-hidden="true" />
            <ul className={styles.reports} aria-label="Cornbot oversees">
              {reportIds.map((id) => (
                <li key={id} className={`${styles.report} ${id === "jmj-capital" ? styles.reportLead : ""}`}>
                  {renderNode(id)}
                </li>
              ))}
            </ul>
            <div role="group" aria-labelledby="mas-group-investing" className={styles.scans}>
              <span id="mas-group-investing" className={styles.groupLabel}>{groupLabels.investing}</span>
              <div className={styles.groupNodes}>{scanIds.map(renderNode)}</div>
            </div>
          </section>

          <section className={`${styles.branch} ${styles.bridge}`} aria-label="How the coding tools and the bots connect">
            {renderNode("grok-bot-computer")}
            {renderNode("agent-tin-can")}
          </section>

          <section className={`${styles.branch} ${styles.tools}`} aria-labelledby="mas-tools-title">
            <div className={styles.toolsPanel}>
              <h3 id="mas-tools-title" className={styles.groupHeading}>{renderHeading("coding-agents")}</h3>
              <div className={styles.toolNodes}>{toolIds.map(renderNode)}</div>
            </div>
          </section>

          <section className={styles.base} data-base="" aria-labelledby="mas-storage-title">
            <h3 id="mas-storage-title" className={styles.groupLabel}>{storageTitle}</h3>
            <div className={styles.stores}>
              {storesBefore.map(renderNode)}
              <div className={styles.gate}>
                {renderNode("noah")}
                <span className={styles.gateArrow} aria-hidden="true">
                  <span className={styles.gateLabel}>{storageLinkLabels.edits}</span>
                </span>
                {renderNode("notion")}
              </div>
              {storesAfter.map(renderNode)}
            </div>
          </section>
        </div>
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
          </div>
        </div>
      ) : null}
    </section>
  );
}
