import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected public-safe case studies from Justin Cornetta's work.",
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();
  const capabilities = Array.from(new Set(projects.map((project) => project.capability)));

  return (
    <section className="page-shell section-pad">
      <div className="max-w-3xl">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
          Case studies in operations, product thinking, and data infrastructure.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          V1 focuses on two IPN projects that show the kind of operating environment I like:
          ambiguous problems, fragmented workflows, and a clear need to turn strategy into a
          usable system.
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {capabilities.map((capability) => {
          const grouped = projects.filter((project) => project.capability === capability);

          return (
            <section key={capability}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-[var(--border)]" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">
                  {capability}
                </h2>
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {grouped.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
