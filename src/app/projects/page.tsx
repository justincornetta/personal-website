import type { Metadata } from "next";
import Link from "next/link";
import { ClosingContact, RevealMotion } from "@/components/site-redesign-shared";
import { getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects & Research",
  description:
    "Personal projects consisting of web applications, AI workflows and automations, industry reports, and investment analysis.",
};

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <RevealMotion className="production-page production-page--enhanced motion-stagger">
      <section className="prod-project-intro-section">
        <header className="prod-shell prod-page-head prod-projects-intro">
          <h1 className="prod-page-title reveal reveal-2">Projects &amp; Research</h1>
          <p className="prod-page-lead reveal reveal-3">
            Personal projects consisting of web applications, AI workflows &amp; automations,
            industry reports, and investment analysis
          </p>
        </header>
      </section>

      <section className="prod-project-grid-section" aria-label="Project case studies">
        <div className="prod-shell prod-projects-grid">
          {projects.map((project, index) => (
            <div className={`prod-card-reveal reveal reveal-${Math.min(index + 2, 6)}`} key={project.slug}>
              <Link className="prod-card" href={`/projects/${project.slug}`}>
                <div className="prod-card__top">
                  <h2 className="prod-card__title">{project.title}</h2>
                  <span className="prod-card__year">{project.published}</span>
                </div>
                {project.cover ? (
                  <div className="prod-cover">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.cover} alt="" />
                  </div>
                ) : null}
                <p className="prod-card__desc">{project.summary}</p>
                <span className="prod-readmore">Read More <ExternalIcon /></span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ClosingContact />
    </RevealMotion>
  );
}
