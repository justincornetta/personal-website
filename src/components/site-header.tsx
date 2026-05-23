import Link from "next/link";
import { Mail } from "lucide-react";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(247,244,239,0.88)] backdrop-blur-xl">
      <div className="page-shell flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-sm font-semibold text-white">
            JC
          </span>
          <span className="text-sm font-semibold tracking-normal text-[var(--ink)]">
            Justin Cornetta
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-[var(--muted)] sm:gap-7">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--ink)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="button-primary hidden md:inline-flex" href="mailto:justin.cornetta@gmail.com">
          <Mail size={16} />
          Contact
        </a>
      </div>
    </header>
  );
}
