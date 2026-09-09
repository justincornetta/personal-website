import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { mdxComponents } from "@/components/mdx-components";
import { getPublishedWriting, getWritingBySlug } from "@/lib/content";

type WritingPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedWriting().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: entry.externalUrl ?? `/writing/${entry.slug}` },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      url: entry.externalUrl ?? `/writing/${entry.slug}`,
      publishedTime: entry.date,
      ...(entry.cover ? { images: [{ url: entry.cover, width: 1200, height: 630, alt: entry.title }] } : {}),
    },
  };
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const entry = getWritingBySlug(slug);
  if (!entry) notFound();
  if (entry.externalUrl) permanentRedirect(entry.externalUrl);
  return (
    <article className="research-article">
      <div className="research-article__inner">
        <Link href="/projects#research" className="research-back"><ArrowLeft size={18} aria-hidden="true" /> Market &amp; Investment Research</Link>
        <header>
          <p className="portfolio-label">{entry.series ?? entry.category}{entry.chapter ? ` · Chapter ${entry.chapter}` : ""}</p>
          <h1>{entry.title}</h1>
          <p className="research-lead">{entry.summary}</p>
          <p className="research-date">Justin Cornetta · <time dateTime={entry.date}>{new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time></p>
        </header>
        {entry.cover && <Image className="research-article__cover" src={entry.cover} alt={`Cover for ${entry.title}`} width={1200} height={630} priority sizes="(min-width: 850px) 800px, 94vw" />}
        <div className="research-article__body prose-content">
          {entry.disclosure && <p><strong>Disclosure:</strong> {entry.disclosure}</p>}
          <MDXRemote source={entry.body} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
