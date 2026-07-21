import Link from "next/link";
import { ProjectCarousel } from "@/components/project-carousel";
import { getPublishedProjects } from "@/lib/content";

const experience = [
  {
    org: "Teladoc Health",
    tenure: "4 yrs 3 mos",
    roles: [
      {
        pos: "Performance Operations Manager",
        dates: "Oct 2025 to Present",
        desc: "Own end-to-end performance monitoring for Teladoc's $1.6B ARR US Group Health business across four service lines. Built the Performance Operations analytics function from the ground up and lead a cross-functional Enterprise Data & AI initiative to standardize metrics company-wide.",
      },
      {
        pos: "Program Manager",
        dates: "Sep 2024 to Oct 2025",
        desc: "Led C-suite initiatives across clinical, patient, client, and member operations behind a $480M operating plan, including AI clinical transcription and data integrations that drove $1M+ in savings and unlocked $50M+ in new revenue.",
      },
      {
        pos: "Client Operations Manager",
        dates: "Jan 2024 to Sep 2024",
        desc: "Managed $187M+ ARR and 10M+ lives across 14 employer and health-plan clients; led an at-risk-client remediation that preserved $10M in ARR.",
      },
      {
        pos: "Client Experience Associate · Client Management Analyst",
        dates: "May 2022 to Jan 2024",
        desc: "",
      },
    ],
  },
  {
    org: "Intercollegiate Psychedelics Network (IPN)",
    tenure: "2 yrs 10 mos",
    roles: [
      {
        pos: "Director of Strategy, Operations & Technology",
        dates: "Mar 2026 to Present",
        desc: "Lead strategy, operations, and technology for a national student and young-professional network in psychedelic medicine, building the systems, web applications, and AI workflows behind the organization.",
      },
      {
        pos: "Director of Operations",
        dates: "Dec 2024 to Mar 2026",
        desc: "Oversaw governance, systems, finances, recruitment, and compliance; built KPIs and accountability frameworks to measure organizational and program success.",
      },
      {
        pos: "Fundraising Coordinator",
        dates: "Oct 2023 to Apr 2025",
        desc: "Built revenue and fundraising calendars, secured donations and sponsorships, and won grants to fund operations.",
      },
    ],
  },
  {
    org: "Earlier",
    tenure: "",
    roles: [
      { pos: "Client Experience Intern at Somatix", dates: "2022", desc: "" },
      { pos: "Clinical Research Assistant at Penn Medicine", dates: "2021 to 2022", desc: "" },
    ],
  },
];

export default function Home() {
  const projects = getPublishedProjects();

  return (
    <section className="page-shell">
      {/* Hero */}
      <div className="hero">
        <div>
          <span className="status-pill">
            <span className="status-pill__dot" />
            Open to work
          </span>
          <h1 className="hero__name">Justin Cornetta</h1>
          <p className="hero__lede">
            Versatile operator and strategist passionate about learning and building alongside others
            who share the same energy.
          </p>
          <p className="hero__bio">
            I have spent my early career building a practical skillset across healthcare, psychedelic
            medicine, and financial markets. At Teladoc Health, I led multiple C-suite initiatives and
            built a $1.6B business unit&rsquo;s performance operations function from the ground up. I
            lead a psychedelic-medicine nonprofit, now grown to 2,100+ members across 70+ countries,
            and I publish independent market research on Bitcoin, AI/technology, and energy. This range
            provides me with foresight and a diverse perspective to navigate complexity and
            problem-solve.
          </p>
          <div className="hero__cta">
            <Link className="button-primary" href="/projects">
              Explore my work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a className="button-secondary" href="/justin-cornetta-resume.pdf" target="_blank" rel="noreferrer">
              R&eacute;sum&eacute;
            </a>
            <Link className="button-secondary" href="/about">
              About
            </Link>
          </div>
          <div className="hero__connect">
            <span className="hero__connect-label">Let&rsquo;s connect</span>
            <div className="socials">
              <a className="social" href="mailto:justin.cornetta@gmail.com">
                <span className="dot" />
                Email
              </a>
              <a className="social" href="https://www.linkedin.com/in/justin-cornetta/" target="_blank" rel="noreferrer">
                <span className="dot" />
                LinkedIn
              </a>
              <a className="social" href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
                <span className="dot" />
                X
              </a>
            </div>
          </div>
        </div>
        <figure className="hero__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/justin-cliffs-portrait.jpg" alt="Justin Cornetta" />
        </figure>
      </div>

      {/* Experience */}
      <section className="exp" aria-label="Experience">
        <p className="eyebrow">Experience</p>
        <h2 className="sec-title">Where I&rsquo;ve operated</h2>
        <div className="exp__list">
          {experience.map((group) => (
            <div className="exp__group" key={group.org}>
              <div>
                <p className="exp__org">{group.org}</p>
                {group.tenure ? <p className="exp__tenure">{group.tenure}</p> : null}
              </div>
              <div className="exp__roles">
                {group.roles.map((role) => (
                  <div key={role.pos}>
                    <div className="exp__role-head">
                      <span className="exp__pos">{role.pos}</span>
                      <span className="exp__dates">{role.dates}</span>
                    </div>
                    {role.desc ? <p className="exp__desc">{role.desc}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <div style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
        <ProjectCarousel
          projects={projects}
          title="Projects: Research, Analysis & AI Use Cases"
          subtitle="Personal projects consisting of web applications, AI workflows & automations, industry reports, and investment analysis, showcasing a wide range of skills, knowledge, and experience."
        />
      </div>
    </section>
  );
}
