import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Professional background and personal context for Justin Cornetta.",
};

const roles = [
  {
    org: "Teladoc Health",
    title: "Performance Operations Manager",
    text: "Work across business performance, operational efficiency, revenue growth projects, issue resolution, and cross-functional execution across clinical, member, patient, and client operations.",
  },
  {
    org: "Intercollegiate Psychedelics Network",
    title: "Director of Operations and Strategy",
    text: "Lead operations and strategy for a student and young-professional network in psychedelic medicine, with work spanning member experience, systems, partnerships, analytics, and sustainable growth.",
  },
  {
    org: "Education",
    title: "University of Pennsylvania and Rutgers University",
    text: "Studied neuroscience with a chemistry minor at Penn, where my interest in psychedelic research began. Later completed healthcare analytics at Rutgers while continuing as an NCAA track and field athlete.",
  },
];

const interests = ["AI tooling", "Psychedelic medicine", "Healthcare operations", "Bitcoin", "Energy storage", "Market research", "Company analysis", "Systems design"];

export default function AboutPage() {
  return (
    <section className="page-shell section-pad">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="surface overflow-hidden rounded-[2rem] p-5 md:sticky md:top-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
            <Image
              src="/images/justin-cornetta-headshot.jpg"
              alt="Justin Cornetta"
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover"
            />
          </div>
          <div className="mt-5 rounded-[1.4rem] bg-[var(--ink)] p-5 text-white">
            <p className="text-sm text-white/60">Contact</p>
            <a className="mt-3 inline-flex items-center gap-2 font-semibold" href="mailto:justin.cornetta@gmail.com">
              <Mail size={16} />
              justin.cornetta@gmail.com
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">About</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-normal text-[var(--ink)] md:text-6xl">
            I am interested in the work that sits between strategy, systems, and emerging fields.
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-8 text-[var(--muted)]">
            <p>
              My background is intentionally broad. Professionally, I have grown through client
              operations, program management, and performance operations at Teladoc Health. Outside
              of my day job, I help lead IPN, a nonprofit focused on supporting students and young
              professionals in psychedelic medicine.
            </p>
            <p>
              The common thread is that I like learning complex spaces quickly and then building the
              systems that help people move. That can mean an operating dashboard, a member portal,
              a research workflow, a project plan, or a sharper way to understand where a market is
              going.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {roles.map((role) => (
              <div key={role.org} className="rounded-3xl border border-[var(--border)] bg-white/72 p-6">
                <p className="text-sm font-semibold text-[var(--accent-strong)]">{role.org}</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">{role.title}</h2>
                <p className="mt-3 leading-7 text-[var(--muted)]">{role.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--panel-soft)] p-6">
            <p className="eyebrow">Current interests</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span key={interest} className="rounded-full border border-[var(--border)] bg-white/72 px-3 py-1 text-sm font-semibold text-[var(--muted)]">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
