"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function useRevealMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    items.forEach((item) => item.classList.remove("is-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

export function RevealMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRevealMotion();
  return <div ref={rootRef} className={className}>{children}</div>;
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ContactIcon({ type }: { type: "email" | "x" | "linkedin" }) {
  if (type === "email") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7.5v.01M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4.2l9.8 16h-4.2L5 4Z" />
      <path d="M5 20 19 4" />
    </svg>
  );
}

export function ClosingContact() {
  return (
    <section className="section closing-section reveal reveal-2">
      <div className="section__inner closing-grid">
        <div>
          <h2>Have a project, role, or idea worth talking through? Let&rsquo;s connect.</h2>
        </div>
        <div className="closing-links">
          <a href="mailto:justin.cornetta@gmail.com">
            <span className="closing-link__label"><ContactIcon type="email" /> justin.cornetta@gmail.com</span>
            <ExternalIcon />
          </a>
          <a href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
            <span className="closing-link__label"><ContactIcon type="x" /> x.com/jmjcapital</span>
            <ExternalIcon />
          </a>
          <a href="https://www.linkedin.com/in/justin-cornetta/" target="_blank" rel="noreferrer">
            <span className="closing-link__label"><ContactIcon type="linkedin" /> linkedin.com/in/justin-cornetta</span>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
