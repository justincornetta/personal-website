export function TagList({ items, tone = "neutral" }: { items: string[]; tone?: "neutral" | "accent" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={
            tone === "accent"
              ? "rounded-full border border-[rgba(15,118,110,0.26)] bg-[rgba(15,118,110,0.08)] px-3 py-1 text-xs font-semibold text-[var(--accent-strong)]"
              : "rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--muted)]"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function SkillTags({ items }: { items: string[] }) {
  return (
    <div className="my-8 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] p-5">
      <p className="mb-4 text-sm font-semibold text-[var(--ink)]">Relevant skills</p>
      <TagList items={items} tone="accent" />
    </div>
  );
}
