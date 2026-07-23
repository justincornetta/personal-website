"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/lib/content";

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + items.length) % items.length,
        );
      } else if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % items.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  useEffect(() => {
    if (activeIndex === null) {
      lastTriggerRef.current?.focus();
    }
  }, [activeIndex]);

  if (!items.length) return null;

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  const stepLightbox = (direction: number) => {
    setActiveIndex((current) =>
      current === null ? null : (current + direction + items.length) % items.length,
    );
  };

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".gallery__slide");
    const amount = (slide?.offsetWidth ?? 560) + 16;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="gallery" aria-label="Gallery">
      <div className="gallery__head">
        <div>
          <p className="eyebrow">Gallery</p>
          <h2 className="sec-title">Project screenshots</h2>
        </div>
        <div className="rail-controls">
          <button className="icon-btn" aria-label="Previous image" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Next image" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="gallery__track" ref={trackRef} tabIndex={0} aria-label="Screenshots, scrollable">
        {items.map((item, i) => (
          <figure className="gallery__slide" key={item.src}>
            <button
              type="button"
              className="gallery__frame gallery__open"
              aria-label={`Open screenshot ${i + 1} in a larger view${item.caption ? `: ${item.caption}` : ""}`}
              onClick={(event) => openLightbox(i, event.currentTarget)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" loading="lazy" />
              <span className="gallery__hint" aria-hidden="true">Click to enlarge</span>
            </button>
            {item.caption ? <figcaption className="gallery__cap">{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${activeIndex + 1} of ${items.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="lightbox__panel">
            <div className="lightbox__toolbar">
              <p aria-live="polite">{activeIndex + 1} of {items.length}</p>
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-btn lightbox__close"
                aria-label="Close enlarged image"
                onClick={closeLightbox}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <figure className="lightbox__figure">
              <div className="lightbox__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={items[activeIndex].src} alt="" />
              </div>
              {items[activeIndex].caption ? (
                <figcaption className="lightbox__caption">{items[activeIndex].caption}</figcaption>
              ) : null}
            </figure>

            {items.length > 1 ? (
              <div className="lightbox__controls">
                <button type="button" className="icon-btn" aria-label="Previous enlarged image" onClick={() => stepLightbox(-1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button type="button" className="icon-btn" aria-label="Next enlarged image" onClick={() => stepLightbox(1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
