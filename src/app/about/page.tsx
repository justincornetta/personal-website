import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Professional background and personal context for Justin Cornetta.",
};

const interests = [
  "AI tooling",
  "Psychedelic medicine",
  "Healthcare ops",
  "Bitcoin",
  "Energy storage",
  "Market research",
  "Company analysis",
  "Systems design",
];

export default function AboutPage() {
  return (
    <section className="page-shell about" style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
      <p className="eyebrow">About</p>
      <h1 className="page-title" style={{ maxWidth: "16ch" }}>
        I work in the space between strategy, systems, and emerging fields.
      </h1>

      <figure className="pullquote">
        <blockquote>
          <span className="q">&ldquo;</span>You invest in things everyone needs but nobody
          understands.<span className="q">&rdquo;</span>
        </blockquote>
        <figcaption>Michael Saylor</figcaption>
        <p className="pullquote__gloss">
          It&rsquo;s the line I keep coming back to. I&rsquo;m drawn to the edge of the newest,
          least-understood ideas (psychedelic medicine, Bitcoin, AI) well before the consensus
          catches up, and I like doing the work to understand them from the inside.
        </p>
      </figure>

      <div className="about__grid">
        <div className="prose">
          <p>
            My background is intentionally broad. I&rsquo;ve grown through client operations, program
            management, and performance operations at Teladoc Health, where I work across business
            performance, efficiency, and revenue-growth projects spanning clinical, member, and
            client operations.
          </p>
          <p>
            Outside my day job I help lead IPN, a nonprofit supporting students and young
            professionals in psychedelic medicine, building member experience, systems,
            partnerships, and analytics for sustainable growth.
          </p>
          <p>
            The common thread: I like learning complex spaces quickly, then building the systems that
            help people move. That can be an operating dashboard, a member portal, a research
            workflow, or a sharper way to understand where a market is going.
          </p>
        </div>
        <aside>
          <div className="aside-card">
            <h4>Current interests</h4>
            <div className="interests">
              {interests.map((interest) => (
                <span className="chip" key={interest}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div className="aside-card">
            <h4>Get in touch</h4>
            <a className="contact-line" href="mailto:justin.cornetta@gmail.com">
              justin.cornetta@gmail.com
            </a>
            <div className="socials" style={{ marginTop: "1.1rem" }}>
              <a className="social" href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
                <span className="dot" />
                X
              </a>
              <a
                className="social"
                href="https://www.linkedin.com/in/justin-cornetta/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="dot" />
                LinkedIn
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
