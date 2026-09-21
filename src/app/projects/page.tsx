import type { Metadata } from "next";
import { ClosingContact, RevealMotion } from "@/components/site-redesign-shared";
import { PortfolioCard } from "@/components/portfolio-card";
import { ResearchFeature } from "@/components/research-feature";
import { FeaturedXResearch } from "@/components/featured-x-research";
import { getPublishedProjects, getPublishedWriting } from "@/lib/content";
import { initiatives, research } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projects & Research",
  description: `${initiatives.description} ${research.description}`,
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();
  const writing = getPublishedWriting();
  const featuredWriting = writing.filter((entry) => entry.seriesSlug === "beyond-approval");
  const remainingWriting = writing.filter((entry) => entry.seriesSlug !== "beyond-approval");
  return (
    <RevealMotion className="portfolio-page motion-stagger">
      <div className="section__inner">
        <header className="portfolio-page__header reveal reveal-1">
          <h1>Projects &amp; Research</h1>
        </header>
        <section className="portfolio-section" id="initiatives" aria-labelledby="initiatives-title">
          <header className="portfolio-section__header reveal reveal-1">
            <h2 id="initiatives-title">{initiatives.title}</h2>
            <p>{initiatives.description}</p>
          </header>
          <div className="portfolio-grid">
            {projects.map((project, index) => <PortfolioCard eager={index === 0} key={project.slug} title={project.title} summary={project.summary} cover={project.cover} href={`/projects/${project.slug}`} className={`reveal reveal-${Math.min(index + 2, 6)}`} />)}
          </div>
        </section>
        {writing.length > 0 && <section className="portfolio-section" id="research" aria-labelledby="research-title">
          <header className="portfolio-section__header reveal reveal-1">
            <h2 id="research-title">{research.title}</h2>
            <p>{research.description}</p>
          </header>
          <div className="reveal reveal-2"><ResearchFeature entries={featuredWriting.length > 0 ? featuredWriting : writing.slice(0, 1)} /></div>
          {remainingWriting.length > 0 && <div className="portfolio-grid">
            {remainingWriting.map((entry) => <PortfolioCard key={entry.slug} title={entry.title} summary={entry.summary} cover={entry.cover} href={entry.externalUrl ?? `/writing/${entry.slug}`} label={entry.series} containCover />)}
          </div>}
          <FeaturedXResearch surface="projects" />
        </section>}
      </div>
      <ClosingContact />
    </RevealMotion>
  );
}
