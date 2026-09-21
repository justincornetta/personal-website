"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { WritingMeta } from "@/lib/content";

const swipeThreshold = 48;

function bySeriesOrder(a: WritingMeta, b: WritingMeta) {
  const aOrder = a.seriesOrder ?? Number.MAX_SAFE_INTEGER;
  const bOrder = b.seriesOrder ?? Number.MAX_SAFE_INTEGER;
  if (aOrder !== bOrder) {
    return aOrder - bOrder;
  }
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function ResearchFeature({ entries }: { entries: WritingMeta[] }) {
  const orderedEntries = useMemo(() => [...entries].sort(bySeriesOrder), [entries]);
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const entry = orderedEntries[activeIndex];
  const hasMultipleEntries = orderedEntries.length > 1;

  if (!entry) {
    return null;
  }

  const href = entry.externalUrl ?? `/writing/${entry.slug}`;
  const isExternal = Boolean(entry.externalUrl);
  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < orderedEntries.length - 1;

  function goBack() {
    if (canGoBack) {
      setActiveIndex((current) => current - 1);
    }
  }

  function goForward() {
    if (canGoForward) {
      setActiveIndex((current) => current + 1);
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if ((event.target as Element).closest("a, button")) {
      return;
    }
    if (event.pointerType !== "mouse" || event.button === 0) {
      pointerStartX.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLElement>) {
    if (pointerStartX.current === null) {
      return;
    }
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (Math.abs(delta) < swipeThreshold) {
      return;
    }
    if (delta < 0) {
      goForward();
    } else {
      goBack();
    }
  }

  const seriesLabel = entry.seriesLabel ?? (entry.chapter ? `Chapter ${entry.chapter}` : undefined);

  return (
    <article
      className="research-feature"
      aria-roledescription="carousel"
      aria-label={entry.series ? `${entry.series} articles` : "Featured research"}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStartX.current = null; }}
      onDragStart={(event) => event.preventDefault()}
    >
      {entry.cover && (
        isExternal ? (
          <a
            key={`cover-${entry.slug}`}
            className="research-feature__cover research-feature__animate"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read ${entry.title} on Substack`}
          >
            <Image
              src={entry.cover}
              alt=""
              width={1200}
              height={630}
              loading="eager"
              sizes="(min-width: 1230px) 650px, (min-width: 801px) 54vw, 92vw"
              style={{
                objectFit: entry.coverFit ?? "contain",
                objectPosition: entry.coverPosition ?? "center",
              }}
            />
          </a>
        ) : (
          <Link
            key={`cover-${entry.slug}`}
            className="research-feature__cover research-feature__animate"
            href={href}
            aria-label={`Read ${entry.title}`}
          >
          <Image
            src={entry.cover}
            alt=""
            width={1200}
            height={630}
            loading="eager"
            sizes="(min-width: 1230px) 650px, (min-width: 801px) 54vw, 92vw"
            style={{
              objectFit: entry.coverFit ?? "contain",
              objectPosition: entry.coverPosition ?? "center",
            }}
          />
          </Link>
        )
      )}
      <div key={`body-${entry.slug}`} className="research-feature__body research-feature__animate" aria-live="polite">
        <div className="research-feature__topline">
          {entry.series ? (
            <p className="portfolio-label">
              {entry.series}{seriesLabel ? ` · ${seriesLabel}` : ""}
            </p>
          ) : <span />}
          {hasMultipleEntries ? (
            <div className="research-feature__nav" aria-label="Featured article navigation">
              <span className="research-feature__count" aria-label={`Article ${activeIndex + 1} of ${orderedEntries.length}`}>
                {activeIndex + 1} / {orderedEntries.length}
              </span>
              <button
                className="research-feature__nav-button"
                type="button"
                onClick={goBack}
                disabled={!canGoBack}
                aria-label="Previous article"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                className="research-feature__nav-button"
                type="button"
                onClick={goForward}
                disabled={!canGoForward}
                aria-label="Next article"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
        <h3>
          {isExternal ? (
            <a href={href} target="_blank" rel="noopener noreferrer">{entry.title}</a>
          ) : (
            <Link href={href}>{entry.title}</Link>
          )}
        </h3>
        <p className="research-feature__summary">{entry.summary}</p>
        <div className="research-feature__links">
          {isExternal ? (
            <a className="button button--primary" href={href} target="_blank" rel="noopener noreferrer">
              {entry.externalUrl?.includes("substack.com") ? "Read on Substack" : "Read More"}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ) : (
            <Link className="button button--primary" href={href}>
              Read More
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
