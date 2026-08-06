import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AboutCarousel } from "@/components/about-carousel";
import { mdxComponents } from "@/components/mdx-components";
import { ClosingContact, RevealMotion } from "@/components/site-redesign-shared";
import { getAbout } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Justin Cornetta on the fields he works across: healthcare operations, psychedelic medicine, and investing in Bitcoin, energy, and AI.",
};

export default function AboutPage() {
  const about = getAbout();
  const [intro, ...topics] = about.body.trim().split(/\n(?=## )/);

  return (
    <RevealMotion className="production-page production-page--enhanced motion-stagger">
      <section className="prod-shell prod-about-page">
        <h1 className="sr-only">About</h1>

        <div className="prod-about__highlights reveal reveal-1">
          <AboutCarousel items={about.media} />
        </div>

        <figure className="prod-pullquote reveal reveal-2">
          <blockquote>
            <span className="prod-pullquote__mark">&ldquo;</span>
            {about.quote}
            <span className="prod-pullquote__mark">&rdquo;</span>
          </blockquote>
          <figcaption>{about.quoteAuthor}</figcaption>
        </figure>

        <div className="prod-case-body prod-prose">
          <section className="prod-about-intro reveal reveal-2">
            <MDXRemote source={intro} components={mdxComponents} />
          </section>
          {topics.map((topic, index) => (
            <section className="prod-about-topic reveal reveal-2" key={`${index}-${topic.slice(0, 48)}`}>
              <MDXRemote source={topic} components={mdxComponents} />
            </section>
          ))}
        </div>
      </section>

      <ClosingContact />
    </RevealMotion>
  );
}
