import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WritingMeta } from "@/lib/content";
import { TagList } from "@/components/tags";

export function WritingCard({ entry }: { entry: WritingMeta }) {
  return (
    <Link
      href={`/writing/${entry.slug}`}
      className="group block rounded-3xl border border-[var(--border)] bg-white/72 p-6 transition hover:-translate-y-1 hover:border-[rgba(15,118,110,0.36)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="rounded-full bg-[var(--panel-soft)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
          {entry.category}
        </span>
        <ArrowUpRight size={18} className="text-[var(--muted)] transition group-hover:text-[var(--accent-strong)]" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--ink)]">{entry.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{entry.summary}</p>
      <div className="mt-6">
        <TagList items={entry.tags} />
      </div>
    </Link>
  );
}
