"use client";

import { useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectMeta } from "@/lib/content";

export function ProjectCarousel({
  projects,
  title,
  subtitle,
}: {
  projects: ProjectMeta[];
  title: string;
  subtitle: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".card");
    const amount = (card?.offsetWidth ?? 340) + 18;
    rail.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div>
      <div className="rail-head">
        <div className="rail-head__lead">
          <h2 className="sec-title">{title}</h2>
          <p className="sec-sub">{subtitle}</p>
        </div>
        <div className="rail-controls">
          <button className="icon-btn" aria-label="Previous" onClick={() => scroll(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Next" onClick={() => scroll(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="rail" ref={railRef} tabIndex={0} aria-label="Selected work, scrollable">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
