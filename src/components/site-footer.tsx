"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname === "/" || pathname === "/about" || pathname === "/projects") {
    return null;
  }

  return (
    <footer className="foot">
      <div className="page-shell foot__row">
        <span>© {year} Justin Cornetta</span>
        <div className="foot__links">
          <a href="mailto:justin.cornetta@gmail.com">Email</a>
          <a href="https://x.com/jmjcapital" target="_blank" rel="noreferrer">
            X
          </a>
          <a href="https://www.linkedin.com/in/justin-cornetta/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
