import Link from "next/link";
import Image from "next/image";
import { ProjectCarousel } from "@/components/project-carousel";
import { getPublishedProjects } from "@/lib/content";

const experience = [
  {
    org: "Teladoc Health",
    logo: {
      src: "/images/experience/teladoc-health-transparent.png",
      alt: "Teladoc Health logo",
      width: 860,
      height: 574,
      className: "exp__logo--teladoc",
    },
    roles: [
      {
        pos: "Performance Operations Manager",
        dates: "Oct 2025 to May 2026",
        desc: "Built the Performance Operations function from the ground up for Teladoc's $1.6B ARR US Group Health business, creating end-to-end monitoring across our Chronic Condition Management, Mental Health, Primary Care, and Virtual 24/7 Urgent Care service lines. Led daily executive performance reviews that contributed to $15M in YTD revenue outperformance. Coordinated a cross-functional data governance program standardizing 500+ metrics for trusted analytics and responsible AI.",
      },
      {
        pos: "Program Manager",
        dates: "Sep 2024 to Oct 2025",
        desc: "Implemented AI clinical transcription, care gaps data integrations, and referral workflows into Teladoc's Care Delivery Platform, PRISM, that cut chart completion time 58%, produced $900K+ in annual savings, and drove $1.3M+ in revenue lift. Collaborated with the Chief Patient Experience Officer on Teladoc's patient experience strategy and governance spanning 100M+ members and seven service lines. Led a member access initiative delivering $3.6M+ in recurring savings and a 39-point improvement in member NPS.",
      },
      {
        pos: "Client Operations Manager",
        dates: "May 2022 to Sep 2024",
        desc: "Managed $187M+ in ARR and 10M+ lives across 14 employer and health plan clients, serving as the day-to-day operations lead. Led cross-functional remediation for an at-risk client that resulted in a $10M contract renewal and a $20M upsell opportunity within 12 months.",
      },
    ],
  },
  {
    org: "Intercollegiate Psychedelics Network (IPN)",
    logo: {
      src: "/images/experience/ipn.png",
      alt: "Intercollegiate Psychedelics Network logo",
      width: 512,
      height: 512,
      className: "exp__logo--ipn",
    },
    roles: [
      {
        pos: "Director of Strategy, Operations & Technology",
        dates: "Dec 2024 to Present",
        desc: "Lead strategy, operations, and technology for a 20+ person nonprofit serving 2,100+ members across 70+ countries, spanning governance, planning, systems, finances, recruitment, performance, partnerships, fundraising, and compliance. Built a member web application and organization-wide analytics infrastructure, and generated $15K+ through sponsorships, affiliate programs, fundraising campaigns, and grants.",
      },
    ],
  },
  {
    org: "RU Psyched: Rutgers Psychedelic Society",
    roles: [
      {
        pos: "President",
        dates: "Jan 2023 to May 2024",
        desc: "Re-launched Rutgers' psychedelic society, recruited a team of seven officers and more than 300 members, and facilitated nine educational events. The group's growth led to an invitation to join the New Jersey Psilocybin Coalition and support advocacy for NJS2283.",
      },
    ],
  },
  {
    org: "Somatix",
    logo: {
      src: "/images/experience/somatix-transparent.png",
      alt: "Somatix logo",
      width: 462,
      height: 135,
      className: "",
    },
    roles: [
      {
        pos: "Client Experience Intern",
        dates: "Jan 2022 to Jun 2022",
        desc: "Led onboarding and implementation for five clients during the launch of an AI-powered remote patient monitoring platform, including a smoking cessation pilot with a top-ten global pharmaceutical company. Delivered live training and created documentation and tutorial videos to improve adoption.",
      },
    ],
  },
  {
    org: "Penn Medicine",
    logo: {
      src: "/images/experience/penn-medicine-transparent.png",
      alt: "Penn Medicine logo",
      width: 750,
      height: 225,
      className: "",
    },
    roles: [
      {
        pos: "Clinical Research Assistant",
        dates: "Jun 2021 to Jan 2022",
        desc: "Supported a Penn and Children's Hospital of Philadelphia study evaluating wearable biosensors for early infection detection in adult and pediatric transplant patients. Helped implement a real-time detection algorithm and recruited and supported approximately 500 patients and family participants, improving communication and helping prevent study attrition.",
      },
    ],
  },
];

const education = [
  {
    school: "University of Pennsylvania",
    degree: "Bachelor of Arts in Neuroscience, minor in Chemistry",
    graduation: "May 2022",
    logo: "/images/education/penn-wordmark.png",
    logoAlt: "Penn, University of Pennsylvania",
    logoWidth: 1280,
    logoHeight: 595,
    logoClass: "edu__logo-image--penn",
    activities:
      "Varsity Men's Track & Field and Cross Country; Penn Neuroscience Society; Wharton Undergraduate Healthcare Club",
  },
  {
    school: "Rutgers University",
    degree: "Graduate Certificate in Healthcare Analytics",
    graduation: "May 2023",
    logo: "/images/education/rutgers-wordmark.png",
    logoAlt: "Rutgers, The State University of New Jersey",
    logoWidth: 1280,
    logoHeight: 449,
    logoClass: "edu__logo-image--rutgers",
    activities:
      "Varsity Men's Track & Field and Cross Country Leadership Council; President, RU Psyched: Rutgers Psychedelic Society",
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
            Versatile operator and strategist across healthcare, psychedelic medicine, and financial
            markets, passionate about learning and building alongside others.
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
              <div className="exp__org-block">
                <p className="exp__org">{group.org}</p>
                {group.logo ? (
                  <div className="exp__logo-frame">
                    <Image
                      className={`exp__logo ${group.logo.className}`}
                      src={group.logo.src}
                      alt={group.logo.alt}
                      width={group.logo.width}
                      height={group.logo.height}
                      sizes="(min-width: 760px) 160px, 130px"
                    />
                  </div>
                ) : null}
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

      {/* Education */}
      <section className="edu" aria-label="Education">
        <p className="eyebrow">Education</p>
        <h2 className="sec-title">Academic foundation</h2>
        <div className="edu__list">
          {education.map((item) => (
            <article className="edu__item" key={item.school}>
              <div className="edu__logo">
                <Image
                  className={item.logoClass}
                  src={item.logo}
                  alt={item.logoAlt}
                  width={item.logoWidth}
                  height={item.logoHeight}
                  sizes="(min-width: 760px) 150px, 90px"
                />
              </div>
              <div className="edu__content">
                <div className="edu__heading">
                  <h3 className="edu__school">{item.school}</h3>
                  <p className="edu__date">{item.graduation}</p>
                </div>
                <p className="edu__degree">{item.degree}</p>
                <p className="edu__activities">
                  <span>Activities:</span> {item.activities}
                </p>
              </div>
            </article>
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
