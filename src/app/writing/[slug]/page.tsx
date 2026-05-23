import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { mdxComponents } from "@/components/mdx-components";
import { TagList } from "@/components/tags";
import { getPublishedWriting, getWritingBySlug } from "@/lib/content";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedWriting().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="page-shell section-pad">
      <Link href="/writing" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--ink)]">
        <ArrowLeft size={16} />
        Back to writing
      </Link>
      <header className="max-w-3xl">
        <p className="eyebrow">{entry.category}</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
          {entry.title}
        </h1>
        <p className="mt-6 text-xl leading-8 text-[var(--muted)]">{entry.summary}</p>
        <div className="mt-6">
          <TagList items={entry.tags} />
        </div>
      </header>
      {entry.disclosure ? (
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white/72 p-5 text-sm leading-6 text-[var(--muted)]">
          <strong className="text-[var(--ink)]">Disclosure:</strong> {entry.disclosure}
        </div>
      ) : null}
      <div className="prose-content mt-12 max-w-3xl">
        <MDXRemote source={entry.body} components={mdxComponents} />
      </div>
    </article>
  );
}
