import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, BriefcaseBusiness, LineChart, Mail, Network } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects, getPublishedWriting } from "@/lib/content";

const proofPoints = ["Teladoc Health", "IPN", "Penn Neuroscience", "Rutgers Analytics", "AI Workflows", "Investing Research"];

const themes = [
  {
    icon: BriefcaseBusiness,
    title: "Operations and strategy",
    text: "Cross-functional operator with experience across performance operations, client operations, program management, and nonprofit strategy.",
  },
  {
    icon: Brain,
    title: "AI-enabled execution",
    text: "Focused on using AI tools to move faster across research, workflow design, automation, content systems, and product planning.",
  },
  {
    icon: LineChart,
    title: "Markets and business research",
    text: "Active investor and writer connecting macro themes to company-level opportunities across energy, AI infrastructure, Bitcoin, and psychedelics.",
  },
  {
    icon: Network,
    title: "Psychedelic medicine",
    text: "Director of Operations and Strategy at IPN, building programs and systems for the next generation of psychedelic researchers and professionals.",
  },
];

const writingCategories = ["Psychedelic medicine", "AI and technology", "Energy", "Bitcoin and crypto", "Company research"];

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const writing = getPublishedWriting().slice(0, 3);

  return (
    <>
      <section className="page-shell grid gap-12 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
        <div>
          <p className="eyebrow">Operations / AI / Psychedelics / Markets</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[var(--ink)] md:text-7xl">
            Justin Cornetta
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--muted)]">
            I am a generalist operator with a bias toward learning fast, connecting ideas across
            domains, and turning ambiguity into practical systems. My work sits across healthcare
            operations, AI-enabled execution, psychedelic medicine, investing research, and
            technology.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href="mailto:justin.cornetta@gmail.com">
              <Mail size={17} />
              Contact me
            </a>
            <Link className="button-secondary" href="/projects">
              View projects
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="surface overflow-hidden rounded-[2rem] p-5">
          <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-[var(--panel-soft)]">
              <Image
                src="/images/justin-cornetta-headshot.jpg"
                alt="Justin Cornetta"
                fill
                priority
                sizes="(max-width: 768px) 70vw, 320px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between rounded-[1.4rem] bg-[var(--ink)] p-5 text-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                  Current focus
                </p>
                <p className="mt-3 text-2xl font-semibold leading-tight">
                  Building evidence that AI-literate operators can accelerate real organizations.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/8 p-3">
                  <p className="font-semibold">Teladoc</p>
                  <p className="mt-1 text-white/60">Performance operations</p>
                </div>
                <div className="rounded-2xl bg-white/8 p-3">
                  <p className="font-semibold">IPN</p>
                  <p className="mt-1 text-white/60">Operations and strategy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white/45">
        <div className="page-shell flex flex-wrap gap-3 py-5">
          {proofPoints.map((point) => (
            <span key={point} className="rounded-full border border-[var(--border)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--muted)]">
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="max-w-3xl">
          <p className="eyebrow">Working range</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--ink)] md:text-5xl">
            A portfolio built around operating range, not a single narrow lane.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {themes.map((theme) => {
            const Icon = theme.icon;

            return (
              <div key={theme.title} className="rounded-3xl border border-[var(--border)] bg-white/68 p-6">
                <Icon className="text-[var(--accent-strong)]" size={24} />
                <h3 className="mt-5 text-xl font-semibold text-[var(--ink)]">{theme.title}</h3>
                <p className="mt-3 leading-7 text-[var(--muted)]">{theme.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--panel-soft)] py-16">
        <div className="page-shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Featured projects</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--ink)]">
                Public-safe IPN case studies.
              </h2>
            </div>
            <Link className="button-secondary" href="/projects">
              All projects
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-pad grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Writing and research</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-[var(--ink)]">
            A public research hub for the themes I keep coming back to.
          </h2>
          <p className="mt-5 leading-7 text-[var(--muted)]">
            This section will collect polished notes, reports, and essays across psychedelic
            medicine, AI, energy, Bitcoin, macro, and company-specific research.
          </p>
        </div>
        <div className="grid gap-3">
          {writing.length > 0
            ? writing.map((entry) => (
                <Link key={entry.slug} href={`/writing/${entry.slug}`} className="rounded-2xl border border-[var(--border)] bg-white/72 p-5">
                  <p className="text-sm font-semibold text-[var(--accent-strong)]">{entry.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--ink)]">{entry.title}</h3>
                </Link>
              ))
            : writingCategories.map((category) => (
                <div key={category} className="rounded-2xl border border-[var(--border)] bg-white/72 p-5">
                  <p className="text-sm font-semibold text-[var(--ink)]">{category}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Publishing queue for future research.</p>
                </div>
              ))}
        </div>
      </section>
    </>
  );
}
