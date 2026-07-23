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
      <header className="projects-intro">
        <h1 className="page-title">Projects</h1>
        <p className="page-lead">
          Personal projects consisting of web applications, AI workflows &amp; automations, industry
          reports, and investment analysis, showcasing a wide range of skills, knowledge, and
          experience.
        </p>
      </header>
      <div className="grid projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {projects.length <= 2 ? (
        <div className="projects-more" aria-hidden="true">
          <span className="card__ghost-mark">+</span>
          <div>
            <p className="card__ghost-title">More on the way</p>
            <p className="card__ghost-text">New projects, research, and analysis are in progress.</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
