import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[rgba(255,255,255,0.42)]">
      <div className="page-shell flex flex-col gap-6 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>Justin Cornetta. Operations, strategy, AI-enabled execution, and research.</p>
        <div className="flex flex-wrap items-center gap-4 font-medium text-[var(--ink)]">
          <Link href="/projects">Projects</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/about">About</Link>
          <a href="https://www.linkedin.com/in/justin-cornetta/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </div>
    </footer>
  );
}
