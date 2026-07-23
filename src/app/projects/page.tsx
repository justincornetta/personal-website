import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Research, analysis, and AI use cases. Case studies from Justin Cornetta's work across web applications, AI workflows, industry reports, and investment analysis.",
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <section className="page-shell page-head" style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
      <h1 className="page-title">Projects</h1>
      <p className="page-lead">
        Research, analysis &amp; AI use cases. Personal projects consisting of web applications, AI
        workflows &amp; automations, industry reports, and investment analysis, showcasing a wide
        range of skills, knowledge, and experience. Each card opens into a full case study.
      </p>
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {projects.length <= 2 ? (
          <div className="card card--ghost" aria-hidden="true">
            <span className="card__ghost-mark">+</span>
            <p className="card__ghost-title">More on the way</p>
            <p className="card__ghost-text">New projects, research, and analysis are in progress.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
