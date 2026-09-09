import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type PortfolioCardProps = {
  title: string;
  summary: string;
  href: string;
  cover?: string;
  label?: string;
  className?: string;
  containCover?: boolean;
  eager?: boolean;
};

export function PortfolioCard({ title, summary, href, cover, label, className = "", containCover = false, eager = false }: PortfolioCardProps) {
  return (
    <Link href={href} className={`portfolio-card ${className}`} aria-label={`Read more about ${title}`}>
      {cover && (
        <div className={`portfolio-card__cover${containCover ? " portfolio-card__cover--contain" : ""}`}>
          <Image src={cover} alt="" fill loading={eager ? "eager" : "lazy"} sizes="(min-width: 1230px) 365px, (min-width: 901px) 31vw, (min-width: 651px) 46vw, 92vw" />
        </div>
      )}
      <div className="portfolio-card__body">
        {label && <p className="portfolio-label">{label}</p>}
        <h3>{title}</h3>
        <p className="portfolio-card__summary">{summary}</p>
        <span className="portfolio-card__link">Read More <ArrowUpRight size={18} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
