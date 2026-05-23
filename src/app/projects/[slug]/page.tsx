import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { mdxComponents } from "@/components/mdx-components";
import { TagList } from "@/components/tags";
import { getProjectBySlug, getPublishedProjects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="page-shell section-pad">
      <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]">
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <header className="grid gap-8 md:grid-cols-[1fr_0.42fr] md:items-end">
        <div>
          <p className="eyebrow">{project.capability}</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-[var(--muted)]">{project.summary}</p>
        </div>
        <aside className="rounded-3xl border border-[var(--border)] bg-white/72 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Role</p>
          <p className="mt-2 font-semibold text-[var(--ink)]">{project.role}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Tools</p>
          <div className="mt-3">
            <TagList items={project.tools} />
          </div>
        </aside>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-[0.24fr_0.76fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Domains</p>
            <div className="mt-3">
              <TagList items={project.domain} />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">Skills</p>
            <div className="mt-3">
              <TagList items={project.skills} tone="accent" />
            </div>
          </div>
        </div>

        <div className="prose-content">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
