"use client";

import { useRef, type CSSProperties } from "react";
import type { AboutMedia } from "@/lib/content";

const galleryImageStyle = (src?: string) =>
  src ? (({ "--prod-gallery-image": `url("${src}")` }) as CSSProperties) : undefined;

export function AboutCarousel({ items }: { items: AboutMedia[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".prod-gallery__slide");
    const amount = (slide?.offsetWidth ?? 560) + 16;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="prod-gallery" aria-label="Highlights">
      <div className="prod-about-carousel__controls">
        <button type="button" aria-label="Previous" onClick={() => scroll(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button type="button" aria-label="Next" onClick={() => scroll(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="prod-gallery__track" ref={trackRef} tabIndex={0} aria-label="Photos and video, scrollable">
        {items.map((item, i) => (
          <figure className="prod-gallery__slide" key={i}>
            {item.type === "video" ? (
              <a
                className="prod-gallery__frame prod-gallery__video"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={galleryImageStyle(item.thumb)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumb} alt={item.caption} loading="lazy" />
                <span className="prod-gallery__play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </a>
            ) : (
              <div className="prod-gallery__frame" style={galleryImageStyle(item.src)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.caption} loading="lazy" />
              </div>
            )}
            {item.caption ? <figcaption className="prod-gallery__caption">{item.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
