"use client";

import { useRef } from "react";
import type { GalleryItem } from "@/lib/content";

export function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

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
          <h2 className="sec-title">Inside the portal</h2>
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
            <div className="gallery__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.caption || `Screenshot ${i + 1}`} loading="lazy" />
            </div>
            {item.caption ? <figcaption className="gallery__cap">{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
