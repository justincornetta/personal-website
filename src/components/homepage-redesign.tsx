"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClosingContact, useRevealMotion } from "@/components/site-redesign-shared";
const heroImage = "/images/hero-portrait.png";
const aboutOne = "/images/about/01.jpg";
const aboutFour = "/images/about/04.jpg";
const aboutFive = "/images/about/05.jpg";
const aboutSeven = "/images/about/07.jpg";
const aboutEight = "/images/about/08.jpg";
const websiteCover = "/images/projects/personal-website/01.png";
const analyticsCover = "/images/projects/ipn-operations-analytics/01.png";
const ipnCover = "/images/projects/ipn-member-portal/cover.jpg";
const teladocLogo = "/images/experience/teladoc-health-transparent.png";
const ipnLogo = "/images/experience/ipn.png";
const somatixLogo = "/images/experience/somatix-transparent.png";
const pennMedicineLogo = "/images/experience/penn-medicine-transparent.png";
const pennWordmark = "/images/education/penn-wordmark.png";
const rutgersWordmark = "/images/education/rutgers-wordmark.png";
type ExperienceGroup = {
  org: string;
  logo?: string;
  logoAlt?: string;
  logoClass?: string;
  roles: Array<{ role: string; date: string; copy: string }>;
};
const slides = [{
  src: aboutFive,
  alt: "Justin presenting to students at Rutgers University",
  caption: "Presenting to students at Rutgers University, exploring the neuroscience behind psychedelics and mechanisms of action. December 2023."
}, {
  src: aboutOne,
  alt: "Justin volunteering at Real Vision's 2025 Crypto Conference in Miami",
  caption: "Volunteering at Real Vision’s 2025 Crypto Conference in Miami. January 2025."
}, {
  src: aboutFour,
  alt: "Justin representing the Intercollegiate Psychedelics Network at Psychedelic Science 2025",
  caption: "Psychedelic Science Conference 2025, representing the Intercollegiate Psychedelics Network in Denver, Colorado. June 2025."
}, {
  src: aboutEight,
  alt: "Psychedelic Seminar Series hosted by the Penn School of Nursing",
  caption: "Psychedelic Seminar Series hosted by the Penn School of Nursing. Listening to clinical trial participants about their experiences with psychedelic medicine and how it changed their lives. April 2022."
}, {
  src: aboutSeven,
  alt: "RU Psyched's first club meeting at Rutgers University",
  caption: "RU Psyched, Rutgers Psychedelic Society, first club meeting, sharing the driving factors behind the club’s origin and future directions of the field. September 2023."
}];
const experience: ExperienceGroup[] = [{
  org: "Teladoc Health",
  logo: teladocLogo,
  logoAlt: "Teladoc Health logo",
  logoClass: "experience-logo--teladoc",
  roles: [{
    role: "Performance Operations Manager",
    date: "Oct 2025 to May 2026",
    copy: "Built the Performance Operations function from the ground up for Teladoc's $1.6B ARR US Group Health business, creating end-to-end monitoring across Chronic Condition Management, Mental Health, Primary Care, and Virtual 24/7 Urgent Care. Led daily executive performance reviews that contributed to $15M in YTD revenue outperformance. Coordinated a cross-functional data governance program standardizing 500+ metrics for trusted analytics and responsible AI."
  }, {
    role: "Program Manager",
    date: "Sep 2024 to Oct 2025",
    copy: "Implemented AI clinical transcription, care gaps data integrations, and referral workflows into Teladoc's Care Delivery Platform, PRISM, that cut chart completion time 58%, produced $900K+ in annual savings, and drove $1.3M+ in revenue lift. Collaborated with the Chief Patient Experience Officer on Teladoc's patient experience strategy and governance spanning 100M+ members and seven service lines. Led a member access initiative delivering $3.6M+ in recurring savings and a 39-point improvement in member NPS."
  }, {
    role: "Client Operations Manager",
    date: "May 2022 to Sep 2024",
    copy: "Managed $187M+ in ARR and 10M+ lives across 14 employer and health plan clients, serving as the day-to-day operations lead. Led cross-functional remediation for an at-risk client that resulted in a $10M contract renewal and a $20M upsell opportunity within 12 months."
  }]
}, {
  org: "Intercollegiate Psychedelics Network (IPN)",
  logo: ipnLogo,
  logoAlt: "Intercollegiate Psychedelics Network logo",
  logoClass: "experience-logo--ipn",
  roles: [{
    role: "Director of Strategy, Operations & Technology",
    date: "Dec 2024 to Present",
    copy: "Lead strategy, operations, and technology for a 20+ person nonprofit serving 2,100+ members across 70+ countries, spanning governance, planning, systems, finances, recruitment, performance, partnerships, fundraising, and compliance. Built a member web application and organization-wide analytics infrastructure, and generated $15K+ through sponsorships, affiliate programs, fundraising campaigns, and grants."
  }]
}, {
  org: "RU Psyched: Rutgers Psychedelic Society",
  roles: [{
    role: "President",
    date: "Jan 2023 to May 2024",
    copy: "Re-launched Rutgers' psychedelic society, recruited a team of seven officers and more than 250 members, and facilitated nine educational events. The group's growth led to an invitation to join the New Jersey Psilocybin Coalition and support advocacy for NJS2283."
  }]
}, {
  org: "Somatix",
  logo: somatixLogo,
  logoAlt: "Somatix logo",
  roles: [{
    role: "Client Experience Intern",
    date: "Jan 2022 to Jun 2022",
    copy: "Led onboarding and implementation for five clients during the launch of an AI-powered remote patient monitoring platform, including a smoking cessation pilot with a top-ten global pharmaceutical company. Delivered live training and created documentation and tutorial videos to improve adoption."
  }]
}, {
  org: "Penn Medicine",
  logo: pennMedicineLogo,
  logoAlt: "Penn Medicine logo",
  roles: [{
    role: "Clinical Research Assistant",
    date: "Jun 2021 to Jan 2022",
    copy: "Supported a Penn and Children's Hospital of Philadelphia study evaluating wearable biosensors for early infection detection in adult and pediatric transplant patients. Helped implement a real-time detection algorithm and recruited and supported approximately 500 patients and family participants, improving communication and helping prevent study attrition."
  }]
}];
const education = [{
  school: "University of Pennsylvania",
  logo: pennWordmark,
  logoAlt: "University of Pennsylvania wordmark",
  logoClass: "education-logo--penn",
  degree: "Bachelor of Arts in Neuroscience, minor in Chemistry",
  graduation: "May 2022",
  activities: "Varsity Men's Track & Field and Cross Country; Penn Neuroscience Society; Wharton Undergraduate Healthcare Club"
}, {
  school: "Rutgers University",
  logo: rutgersWordmark,
  logoAlt: "Rutgers University wordmark",
  logoClass: "education-logo--rutgers",
  degree: "Graduate Certificate in Healthcare Analytics",
  graduation: "May 2023",
  activities: "Varsity Men's Track & Field and Cross Country Leadership Council; President, RU Psyched: Rutgers Psychedelic Society"
}];
const projects = [{
  title: "IPN Member Portal",
  copy: "Replaced a fragmented member experience with one purpose-built platform for a community spanning 2,100+ members across 70+ countries.",
  image: ipnCover,
  href: "/projects/ipn-member-portal"
}, {
  title: "IPN Analytics & Data Infrastructure",
  copy: "Company-wide analytics infrastructure providing daily insights into member growth, demographics, portal utilization, events, marketing, social media, and website performance and trends.",
  image: analyticsCover,
  href: "/projects/ipn-operations-analytics"
}, {
  title: "Personal Website & Portfolio Workflows",
  copy: "A personal site and repeatable publishing workflow that turns my experience and work into evidence-backed proof for employers and potential business partners.",
  image: websiteCover,
  href: "/projects/personal-website"
}];
function ArrowIcon({
  direction = "right"
}: {
  direction?: "left" | "right";
}) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>;
}
function ExternalIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>;
}
export function HomepageRedesign() {
  const [slide, setSlide] = useState(0);
  const siteRef = useRevealMotion();
  const showSlide = (next: number) => {
    setSlide((next + slides.length) % slides.length);
  };
  return <div className="concept-root">
      <div ref={siteRef} className="site-concept motion-stagger">
        <div>
          <section id="home" className="section section--paper hero-section">
            <div className="section__inner hero-grid">
              <div className="hero-copy">
                <h1 className="reveal reveal-2">Justin Cornetta</h1>
                <p className="hero-lede reveal reveal-3">
                  Versatile operator and strategist across healthcare, psychedelic medicine, and financial markets, passionate about learning and building alongside others.
                </p>
                <p className="hero-opportunity reveal reveal-4">
                  Open to ambitious roles, projects, and partnerships.
                </p>
              </div>
              <figure className="hero-image media-reveal reveal reveal-4">
                <Image src={heroImage} alt="" fill priority sizes="(min-width: 900px) 44vw, 100vw" />
              </figure>
            </div>
            <a className="hero-scroll-cue" href="#about" aria-label="Scroll to About Me">
              <span>Scroll</span>
              <span className="hero-scroll-cue__line" aria-hidden="true" />
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </a>
          </section>

          <section id="about" className="section section--sand about-section">
            <div className="section__inner">
              <div className="section-heading section-heading--single reveal reveal-1">
                <h2>About Me</h2>
              </div>
              <div className="about-grid">
                <div className="about-carousel media-reveal reveal reveal-2">
                  <div className="about-carousel__frame">
                    <Image key={slides[slide].src} src={slides[slide].src} alt={slides[slide].alt} fill sizes="(min-width: 900px) 52vw, 100vw" />
                    <div className="about-carousel__controls">
                      <button type="button" onClick={() => showSlide(slide - 1)} aria-label="Previous image">
                        <ArrowIcon direction="left" />
                      </button>
                      <button type="button" onClick={() => showSlide(slide + 1)} aria-label="Next image">
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                  <div className="about-carousel__meta">
                    <p>{slides[slide].caption}</p>
                    <span>{String(slide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
                  </div>
                  <div className="carousel-dots" role="group" aria-label="Choose carousel image">
                    {slides.map((item, index) => <button key={item.src} type="button" className={index === slide ? "is-current" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={index === slide ? "true" : undefined} />)}
                  </div>
                </div>

                <div className="about-copy">
                  <div className="about-body reveal reveal-2">
                    <p>I’m drawn to the edge of new and often misunderstood ideas. That instinct has led me to interests spanning healthcare, psychedelic medicine, Bitcoin, energy, technology, and AI. What connects them is a curiosity about ideas that could meaningfully change how people live, work, and understand the world.</p>
                    <p>The result has been a broad range of experiences. At Teladoc Health, I managed a $187M+ portfolio of health plan and employer clients and led cross-functional programs tied to C-suite priorities, coordinating work across product, engineering, clinical, and commercial teams. I also built a new performance operations function from the ground up. Beyond Teladoc, I’m building communities and systems to advance the psychedelic ecosystem, sharing investment research with an online community on X, and using AI to build tools and improve how I work.</p>
                    <p>Across these areas, I’ve learned to move quickly, connect ideas across disciplines, and turn complexity into practical action. Read more about my background, interests, and the work that shaped how I think.</p>
                  </div>
                  <Link className="text-link reveal reveal-3" href="/about">
                    Read more about me
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section section--paper experience-section">
            <div className="section__inner">
              <div className="section-heading section-heading--single reveal reveal-1">
                <h2>Experience &amp; Education</h2>
              </div>
              <h3 className="subsection-title reveal reveal-1">Experience</h3>
              <div className="timeline">
                {experience.map((group, index) => <article key={group.org} className={`timeline-row reveal reveal-${Math.min(index + 2, 6)}`}>
                    <div className="timeline-row__identity">
                      <p className="timeline-row__org">{group.org}</p>
                      {group.logo && <div className="experience-logo-frame">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={`experience-logo ${group.logoClass ?? ""}`} src={group.logo} alt={group.logoAlt ?? ""} />
                      </div>}
                    </div>
                    <div className="timeline-row__roles">
                      {group.roles.map(role => <div className="timeline-role" key={`${group.org}-${role.role}`}>
                          <div className="timeline-role__heading">
                            <h3>{role.role}</h3>
                            <p className="timeline-row__date">{role.date}</p>
                          </div>
                          <p>{role.copy}</p>
                        </div>)}
                    </div>
                  </article>)}
              </div>
              <h3 className="subsection-title education-heading reveal reveal-1">Education</h3>
                  <div className="education-list">
                {education.map((item, index) => <article className={`education-row reveal reveal-${index + 2}`} key={item.school}>
                    <div className="education-logo-frame">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={`education-logo ${item.logoClass}`} src={item.logo} alt={item.logoAlt} />
                    </div>
                    <div className="education-row__content">
                      <div className="education-row__heading">
                        <h3>{item.school}</h3>
                        <p>{item.graduation}</p>
                      </div>
                      <p className="education-row__degree">{item.degree}</p>
                      <p className="education-row__activities"><span>Activities:</span> {item.activities}</p>
                    </div>
                  </article>)}
              </div>
            </div>
          </section>

          <section id="projects" className="section section--sand projects-section">
            <div className="section__inner">
              <div className="section-heading section-heading--stacked reveal reveal-1">
                <h2>Projects &amp; Research</h2>
                <p>Personal projects consisting of web applications, AI workflows &amp; automations, industry reports, and investment analysis</p>
              </div>
              <div className="project-grid">
                {projects.map((project, index) => <Link key={project.title} className={`project-card reveal reveal-${index + 2}`} href={project.href} aria-label={`Read more about ${project.title}`}>
                    <div className="project-card__image media-reveal">
                      <Image src={project.image} alt="" fill sizes="(min-width: 900px) 33vw, 100vw" />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.copy}</p>
                    <span className="project-card__link">Read More <ExternalIcon /></span>
                  </Link>)}
              </div>
              <div className="projects-footer reveal reveal-5">
                <Link className="button button--primary" href="/projects">
                  View All Projects
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </section>

          <ClosingContact />
        </div>
      </div>
    </div>;
}
