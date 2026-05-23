import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell section-pad">
      <div className="max-w-xl rounded-3xl border border-[var(--border)] bg-white/72 p-8">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--ink)]">This page is not published.</h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Draft and private MDX files are intentionally hidden from public routes.
        </p>
        <Link className="button-primary mt-8" href="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
