import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AboutCarousel } from "@/components/about-carousel";
import { mdxComponents } from "@/components/mdx-components";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Justin Cornetta on the fields he works across: healthcare operations, psychedelic medicine, and investing in Bitcoin, energy, and AI.",
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <section className="page-shell about" style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
      <h1 className="sr-only">About</h1>

      <div className="about__highlights">
        <AboutCarousel items={about.media} />
      </div>

      <figure className="pullquote">
        <blockquote>
          <span className="q">&ldquo;</span>
          {about.quote}
          <span className="q">&rdquo;</span>
        </blockquote>
        <figcaption>{about.quoteAuthor}</figcaption>
      </figure>

      <div className="case__body prose-content">
        <MDXRemote source={about.body} components={mdxComponents} />
      </div>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <h2 id="about-contact-title">Have a project, role, or idea worth talking through?</h2>
        <div className="about-contact__links">
          <a
            className="about-contact__email"
            href="mailto:justin.cornetta@gmail.com"
          >
            justin.cornetta@gmail.com
            <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="about-contact__socials">
            <a href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
              X
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="https://www.linkedin.com/in/justin-cornetta/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
