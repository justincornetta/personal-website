import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectMeta } from "@/lib/content";
import { TagList } from "@/components/tags";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-[var(--border)] bg-white/76 p-6 shadow-[0_20px_60px_rgba(40,34,25,0.08)] transition hover:-translate-y-1 hover:border-[rgba(15,118,110,0.36)] hover:shadow-[0_24px_70px_rgba(40,34,25,0.12)]"
    >
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="rounded-full bg-[rgba(15,118,110,0.09)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]">
            {project.capability}
          </span>
          <ArrowUpRight
            size={20}
            className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-strong)]"
          />
        </div>
        <h3 className="text-2xl font-semibold tracking-normal text-[var(--ink)]">{project.title}</h3>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">{project.summary}</p>
      </div>

      <div className="mt-8 space-y-5">
        <TagList items={project.domain} />
        <div className="border-t border-[var(--border)] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            Role
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--ink)]">{project.role}</p>
        </div>
      </div>
    </Link>
  );
}
