"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-nav">
      <Link href="/" className="brand" aria-label="Justin Cornetta home">
        <span className="brand__mark">JC</span>
        <span>Justin Cornetta</span>
      </Link>
      <nav aria-label="Primary">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
