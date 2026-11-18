"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  computerNote,
  groupLabels,
  justinLabel,
  justinToolsCallout,
  lede,
  nodes,
  sectionTitle,
  tinCanCaption,
} from "@/data/multi-ai-agent-setup";
import type { AgentNode, PhotoEye, V2Pupil } from "@/data/multi-ai-agent-setup";
import styles from "./multi-agent-setup.module.css";

// Layout is a plain top-down tree built from normal flow (no coordinates). DOM order is the tab
// order and the mobile stacking order: Justin, Grok Bot branch, Tin Can bridge, tools, Notion.
const specialistGroups = [
  { key: "workspace", label: groupLabels.workspace, ids: ["noah"] },
  { key: "builds", label: groupLabels.builds, ids: ["forge", "designer"] },
  { key: "editing", label: groupLabels.editing, ids: ["chief-editor"] },
  { key: "research", label: groupLabels.research, ids: ["beyond-approval"] },
  { key: "investing", label: groupLabels.investing, ids: ["jmj-capital", "eos-mafia", "neoclouds", "neuronetics"] },
];
const toolIds = ["claude-code", "codex", "cursor"];

const focusableSelector = "a[href], button:not([disabled])";

// --- Eye tracking limits -------------------------------------------------------------------------
// v2 SVGs: the two pupil groups never move more than this many viewBox units (of 128).
const V2_MAX_TRAVEL = 0.8;
// Photos: default pupil travel as a fraction of the photo width. Per-eye `max` overrides it.
const PHOTO_MAX_TRAVEL = 0.014;
// "tilt" subjects (no eyes): degrees of lean and viewBox units of shift (of 100).
const TILT_DEG = 4;
const TILT_SHIFT = 1.4;

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
      <g data-tilt={node.eyes === "tilt" ? "" : undefined}>
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
function V2PupilGroup({ pupil, side, uid }: { pupil: V2Pupil; side: "left" | "right"; uid: string }) {
  return (
    <g id={`${uid}-pupil-${side}`} data-pupil={side} data-cx={pupil.cx} data-cy={pupil.cy} data-max={V2_MAX_TRAVEL}>
      <ellipse cx={pupil.cx} cy={pupil.cy} rx={pupil.rx} ry={pupil.ry} transform={`rotate(${pupil.rot} ${pupil.cx} ${pupil.cy})`} fill="#103666" />
      <circle cx={pupil.hx} cy={pupil.hy} r={pupil.hr} fill="#F6F4EF" />
    </g>
  );
}

function V2Art({ node, uid }: { node: AgentNode; uid: string }) {
  if (!node.pupils) return null;
  return (
    <svg className={styles.artSvg} viewBox="0 0 128 128" data-vb="128" aria-hidden="true" focusable="false">
      <image href={node.art} width="128" height="128" />
      <V2PupilGroup pupil={node.pupils.left} side="left" uid={uid} />
      <V2PupilGroup pupil={node.pupils.right} side="right" uid={uid} />
    </svg>
  );
}

export function MultiAgentSetup() {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyes = useRef<HTMLElement | null>(null);
  const uidBase = useId().replace(/[^a-zA-Z0-9_-]/g, "");
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

  // Eye tracking: fine pointer + hover, no reduced motion, no open card. Only the pupil groups move (or, for
  // the clinic with no eyes, the whole picture leans). Touch and reduced motion never get here.
  const resetEyes = (node: HTMLElement | null) => {
    node?.querySelectorAll("[data-pupil], [data-tilt]").forEach((el) => el.removeAttribute("transform"));
  };

  const stopEyes = () => {
    resetEyes(eyes.current);
    eyes.current = null;
  };

  const trackEyes = (event: React.PointerEvent) => {
    if (event.pointerType === "touch" || openId) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = (event.target as HTMLElement).closest<HTMLElement>("[data-eyes]");
    if (!node) return stopEyes();
    if (eyes.current !== node) {
      resetEyes(eyes.current);
      eyes.current = node;
    }
    const svg = node.querySelector<SVGSVGElement>("svg[data-vb]");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const box = Number(svg.dataset.vb);
    const scale = rect.width / box || 1;
    const clamp = (n: number) => Math.max(-1, Math.min(1, n));

    svg.querySelectorAll<SVGGElement>("[data-pupil]").forEach((pupil) => {
      const cx = rect.left + Number(pupil.dataset.cx) * scale, cy = rect.top + Number(pupil.dataset.cy) * scale;
      const dx = event.clientX - cx, dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      // Ease in over the first ~40px so the pupil does not snap when the pointer is right on top of it.
      const move = Number(pupil.dataset.max) * Math.min(1, dist / 40);
      pupil.setAttribute("transform", `translate(${((dx / dist) * move).toFixed(3)} ${((dy / dist) * move).toFixed(3)})`);
    });

    const tilt = svg.querySelector<SVGGElement>("[data-tilt]");
    if (tilt) {
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      const half = box / 2;
      tilt.setAttribute("transform", `translate(${(clamp(dx) * TILT_SHIFT).toFixed(3)} ${(clamp(dy) * TILT_SHIFT).toFixed(3)}) rotate(${(clamp(dx) * TILT_DEG).toFixed(3)} ${half} ${half})`);
    }
  };

  const renderNode = (id: string) => {
    const node = nodes.find((n) => n.id === id)!;
    const hasEyes = Boolean(node.pupils || node.eyes);
    const uid = `${uidBase}-${node.id}`;
    const art = (
      <span className={`${styles.art} ${node.pupils ? styles.artV2 : ""}`}>
        {node.pupils ? <V2Art node={node} uid={uid} /> : <PhotoArt node={node} uid={uid} />}
      </span>
    );
    if (node.hasCard === false) {
      return (
        <div key={node.id} className={`${styles.node} ${styles.person}`} data-eyes={hasEyes ? node.id : undefined}>
          {art}
          <span className={styles.name}>{node.name}</span>
          <span className={styles.label}>{justinLabel}</span>
        </div>
      );
    }
    return (
      <button
        key={node.id}
        type="button"
        className={`${styles.node} ${styles[`k_${node.kind}`] ?? ""}`}
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
  };

  return (
    <section className={`portfolio-section ${styles.section}`} id="multi-ai-agent-setup" aria-labelledby="multi-ai-agent-setup-title">
      <header className="portfolio-section__header reveal reveal-1">
        <h2 id="multi-ai-agent-setup-title">{sectionTitle}</h2>
        <p>{lede}</p>
      </header>

      <div className={styles.sheet} inert={open ? true : undefined}>
        <div className={styles.tree} onPointerMove={trackEyes} onPointerLeave={stopEyes}>
          <div className={styles.top}>{renderNode("justin")}</div>

          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railStem} />
            <span className={styles.railL} />
            <span className={styles.railM} />
            <span className={styles.railR} />
          </div>

          <section className={`${styles.branch} ${styles.grok}`} aria-labelledby="mas-grok-title">
            <h3 id="mas-grok-title" className={styles.branchTitle}>{renderNode("grok-bot-hub")}</h3>
            <span className={styles.stem} aria-hidden="true" />
            {renderNode("cornbot")}
            <span className={styles.stem} aria-hidden="true" />
            <div className={styles.groups}>
              {specialistGroups.map((g) => (
                <div
                  key={g.key}
                  role="group"
                  aria-labelledby={`mas-group-${g.key}`}
                  className={`${styles.group} ${g.key === "investing" ? styles.groupWide : ""}`}
                >
                  <span id={`mas-group-${g.key}`} className={styles.groupLabel}>{g.label}</span>
                  <div className={styles.groupNodes}>{g.ids.map(renderNode)}</div>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.branch} ${styles.bridge}`} aria-label="Agent Tin Can bridge">
            <div className={styles.bridgeNodes}>
              {renderNode("grok-bot-computer")}
              {renderNode("agent-tin-can")}
            </div>
            <p className={styles.computerNote}>{computerNote}</p>
            <p className={styles.caption}>{tinCanCaption}</p>
          </section>

          <section className={`${styles.branch} ${styles.tools}`} aria-labelledby="mas-tools-title">
            <p className={styles.callout}>{justinToolsCallout}</p>
            <div className={styles.toolsPanel}>
              <h3 id="mas-tools-title" className={styles.groupLabel}>{groupLabels.tools}</h3>
              <div className={styles.toolNodes}>{toolIds.map(renderNode)}</div>
            </div>
          </section>

          <div className={styles.base}>{renderNode("notion")}</div>
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
