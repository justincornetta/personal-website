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
    <article
      className="page-shell case"
      style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}
    >
      <Link href="/writing" className="case__back">
        <ArrowLeft size={16} />
        Back to Writing
      </Link>
      <header>
        <p className="eyebrow" style={{ marginTop: "1.4rem" }}>
          {entry.category}
        </p>
        <h1 className="case__title" style={{ marginTop: "0.55rem" }}>
          {entry.title}
        </h1>
        <p className="case__sub">{entry.summary}</p>
        <div className="mt-6">
          <TagList items={entry.tags} />
        </div>
      </header>
      <div className="case__body prose-content">
        {entry.disclosure ? (
          <div className="mb-10 rounded-2xl border border-[var(--border)] bg-white/72 p-5 text-sm leading-6 text-[var(--muted)]">
            <strong className="text-[var(--ink)]">Disclosure:</strong> {entry.disclosure}
          </div>
        ) : null}
        <MDXRemote source={entry.body} components={mdxComponents} />
      </div>
    </article>
  );
}
