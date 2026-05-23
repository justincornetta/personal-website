import { ReactNode } from "react";
import { TagList } from "@/components/tags";

const metricPresets = {
  portal: [
    { label: "Decision", value: "Custom build", detail: "Next.js, Supabase, Mailchimp, and Vercel" },
    { label: "Launch posture", value: "Greenfield scaffold", detail: "Public-safe v0 deployed before deeper schema work" },
    { label: "Operating constraint", value: "$0/month target", detail: "Free-tier friendly stack for nonprofit sustainability" },
  ],
  dashboard: [
    { label: "Connected sources", value: "8", detail: "Mailchimp, Discord, Meta, GA4, Squarespace, Eventbrite, Zoom, and templates" },
    { label: "Dashboard tabs", value: "6", detail: "Members, Marketing/Social, Discord, Website, Events, and Glossary" },
    { label: "Refresh model", value: "Daily", detail: "Automated data refresh with logs and GitHub Actions support" },
  ],
};

const skillPresets = {
  portal: [
    "Product strategy",
    "Systems thinking",
    "Platform evaluation",
    "Stakeholder alignment",
    "AI-assisted product planning",
    "Nonprofit operations",
  ],
  dashboard: [
    "Data strategy",
    "Workflow automation",
    "KPI design",
    "Cross-channel analytics",
    "Nonprofit operations",
    "Executive-ready reporting",
  ],
};

export function MetricStrip({
  metrics,
  variant,
}: {
  metrics?: { label: string; value: string; detail?: string }[];
  variant?: "portal" | "dashboard";
}) {
  const items = metrics ?? (variant ? metricPresets[variant] : []);

  return (
    <div className="my-8 grid gap-3 md:grid-cols-3">
      {items.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-[var(--border)] bg-white/72 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            {metric.label}
          </p>
          <p className="mt-2 text-xl font-semibold leading-tight text-[var(--ink)]">{metric.value}</p>
          {metric.detail ? <p className="mt-2 text-sm text-[var(--muted)]">{metric.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function SkillTags({ variant, items }: { variant?: "portal" | "dashboard"; items?: string[] }) {
  return (
    <div className="my-8 rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)] p-5">
      <p className="mb-4 text-sm font-semibold text-[var(--ink)]">Relevant skills</p>
      <TagList items={items ?? (variant ? skillPresets[variant] : [])} tone="accent" />
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-[rgba(15,118,110,0.24)] bg-[rgba(15,118,110,0.08)] p-5">
      <p className="mb-2 text-sm font-semibold text-[var(--accent-strong)]">{title}</p>
      <div className="text-[var(--ink)]">{children}</div>
    </aside>
  );
}

export function ProjectVisual({ variant = "portal" }: { variant?: "portal" | "dashboard" }) {
  const rows = variant === "dashboard" ? ["Members", "Marketing", "Website", "Events"] : ["Directory", "Events", "Resources", "Careers"];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[#111817] p-5 text-white shadow-2xl">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-white/50">
            {variant === "dashboard" ? "Analytics surface" : "Member experience surface"}
          </p>
          <p className="mt-1 text-lg font-semibold">
            {variant === "dashboard" ? "IPN operations dashboard" : "IPN member portal"}
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2a65a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#60c4b4]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#84a4f4]" />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_1.35fr]">
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm">
              {row}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <div className="mb-4 h-3 w-1/2 rounded-full bg-white/18" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-24 rounded-xl bg-[rgba(96,196,180,0.25)]" />
            <div className="h-24 rounded-xl bg-[rgba(132,164,244,0.24)]" />
            <div className="h-24 rounded-xl bg-[rgba(242,166,90,0.24)]" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 rounded-full bg-white/16" />
            <div className="h-2 w-5/6 rounded-full bg-white/16" />
            <div className="h-2 w-2/3 rounded-full bg-white/16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  MetricStrip,
  ProjectVisual,
  SkillTags,
};
