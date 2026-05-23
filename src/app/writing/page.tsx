import type { Metadata } from "next";
import { WritingCard } from "@/components/writing-card";
import { getPublishedWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Research themes and published writing from Justin Cornetta.",
};

const categories = [
  "Psychedelic medicine",
  "AI and technology",
  "Energy",
  "Bitcoin and crypto",
  "Company research",
];

export default function WritingPage() {
  const writing = getPublishedWriting();

  return (
    <section className="page-shell section-pad">
      <div className="max-w-3xl">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
          Research notes on the sectors and ideas I am tracking.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
          This is the long-form home for market research, investment notes, and essays across
          psychedelic medicine, AI, energy, Bitcoin, macro, and company-specific work.
        </p>
      </div>

      {writing.length > 0 ? (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {writing.map((entry) => (
            <WritingCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-white/72 p-8">
          <h2 className="text-2xl font-semibold text-[var(--ink)]">Published research is coming next.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            The site structure is ready. Drafts stay out of public routes until they are marked
            published in MDX frontmatter.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category} className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] p-5">
                <p className="font-semibold text-[var(--ink)]">{category}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Future publishing category</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
