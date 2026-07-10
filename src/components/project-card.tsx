import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";

const arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const glyph = (
  <svg className="cover__glyph" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="12" y="12" width="24" height="24" rx="3" transform="rotate(45 24 24)" />
    <rect x="19" y="19" width="10" height="10" transform="rotate(45 24 24)" fill="currentColor" stroke="none" />
  </svg>
);

export function ProjectCard({ project }: { project: ProjectMeta }) {
  const type = project.contentType === "Writing" ? "writing" : "project";
  const year =
    project.published || (project.date ? new Date(project.date).getFullYear().toString() : "");

  const cover = project.cover ? (
    <div className="cover">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.cover} alt="" />
    </div>
  ) : (
    <div className={`cover cover--brand cover--${type}`}>{glyph}</div>
  );

  const inner = (
    <>
      <div className="card__top">
        <span className={`tag tag--${type}`}>{project.contentType}</span>
        <span className="card__year">{year}</span>
      </div>
      <h3 className="card__title">{project.title}</h3>
      {cover}
      <p className="card__desc">{project.summary}</p>
      <span className="readmore">
        Read More {arrow}
      </span>
    </>
  );

  if (project.contentType === "Writing" && project.externalUrl) {
    return (
      <a className="card" href={project.externalUrl} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link className="card" href={`/projects/${project.slug}`}>
      {inner}
    </Link>
  );
}
