import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { WritingMeta } from "@/lib/content";

export function ResearchFeature({ entry }: { entry: WritingMeta }) {
  const href = entry.externalUrl ?? `/writing/${entry.slug}`;
  return (
    <article className="research-feature">
      {entry.cover && (
        <Link className="research-feature__cover" href={href} aria-label={`Read ${entry.title}`}>
          <Image src={entry.cover} alt="" width={1200} height={630} loading="eager" sizes="(min-width: 1230px) 650px, (min-width: 801px) 54vw, 92vw" />
        </Link>
      )}
      <div className="research-feature__body">
        {entry.series && <p className="portfolio-label">{entry.series}{entry.chapter ? ` · Chapter ${entry.chapter}` : ""}</p>}
        <h3><Link href={href}>{entry.title}</Link></h3>
        <p className="research-feature__summary">{entry.summary}</p>
        <div className="research-feature__links">
          <Link className="button button--primary" href={href}>{entry.externalUrl?.includes("substack.com") ? "Read on Substack" : "Read More"} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
