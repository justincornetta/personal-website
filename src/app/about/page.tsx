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
      <h1 className="eyebrow">About</h1>

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

      <div className="aside-card about-contact">
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

      <AboutCarousel items={about.media} />
    </section>
  );
}
