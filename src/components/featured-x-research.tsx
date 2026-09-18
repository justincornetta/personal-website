import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredXResearch } from "@/lib/featured-x-research";

export function FeaturedXResearch({ surface }: { surface: "home" | "projects" }) {
  const isHome = surface === "home";
  const headingId = `${surface}-x-research-title`;
  return (
    <section className={`x-research x-research--${surface}`} aria-labelledby={headingId}>
      <header className="x-research__heading">
        <h3 id={headingId}>{isHome ? "Featured on X" : "Selected X Research"}</h3>
        <p>{isHome
          ? "Selected analysis and perspectives on companies, technologies, and macro themes."
          : "Substantive analysis across companies, industries, and macro themes."}</p>
      </header>
      <div className="x-research__grid">
        {featuredXResearch.map((post) => (
          <article className="x-research-card" key={post.id}>
            <a className="x-research-card__preview" href={post.href} aria-label={`View ${post.title} on X`}>
              <Image src={`/images/research/x/${post.id}-excerpt.webp`} alt={`Excerpt of Justin Cornetta’s X post about ${post.topic.split(" · ")[0]}`} width={410} height={650} sizes="(min-width: 1230px) 350px, (min-width: 901px) 30vw, (min-width: 651px) 44vw, 90vw" />
            </a>
            <div className="x-research-card__body">
              <div className="x-research-card__meta"><span>{post.topic}</span><time dateTime={post.date}>{post.displayDate}</time></div>
              <h4><a href={post.href}>{post.title}</a></h4>
              <p>{post.takeaway}</p>
              <a className="portfolio-card__link" href={post.href} aria-label={`Read ${post.title} on X`}>Read on X <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      {!isHome && <div className="x-research__footer"><a className="button button--primary" href="https://x.com/jmjcapital">See more insights on X <ArrowUpRight size={18} aria-hidden="true" /></a></div>}
    </section>
  );
}
