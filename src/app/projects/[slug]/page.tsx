import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { mdxComponents } from "@/components/mdx-components";
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

function youtubeEmbed(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/);
  return match?.[1] ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const embed = youtubeEmbed(project.video);
  const published =
    project.published ||
    (project.date
      ? new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "");

  return (
    <article className="page-shell case" style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
      <Link href="/projects" className="case__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Projects
      </Link>

      <h1 className="case__title">{project.title}</h1>
      {project.subtitle ? <p className="case__sub">{project.subtitle}</p> : null}

      <dl className="case__meta">
        {published ? (
          <div>
            <dt>Published</dt>
            <dd>{published}</dd>
          </div>
        ) : null}
        {project.role ? (
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
        ) : null}
        {project.skills.length ? (
          <div>
            <dt>Skills</dt>
            <dd>
              <div className="interests" style={{ marginTop: "0.15rem" }}>
                {project.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </dd>
          </div>
        ) : null}
        {project.tools.length ? (
          <div>
            <dt>Tools</dt>
            <dd>
              <div className="interests" style={{ marginTop: "0.15rem" }}>
                {project.tools.map((tool) => (
                  <span className="chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </dd>
          </div>
        ) : null}
      </dl>

      {!embed && project.cover ? (
        <figure className="case__cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.cover} alt={`${project.title} project interface`} />
        </figure>
      ) : null}

      {embed ? (
        <div className="video" style={{ marginTop: "2rem" }}>
          <iframe
            src={embed}
            title={`${project.title} walkthrough`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="case__body prose-content">
        <MDXRemote source={project.body} components={mdxComponents} />
      </div>

      <GalleryCarousel items={project.gallery} />
    </article>
  );
}
