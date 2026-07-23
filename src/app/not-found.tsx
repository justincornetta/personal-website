import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell" style={{ padding: "clamp(4rem, 12vw, 8rem) 0" }}>
      <p className="eyebrow">404</p>
      <h1 className="page-title" style={{ maxWidth: "18ch" }}>
        This page isn&rsquo;t here.
      </h1>
      <p className="page-lead">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or it&rsquo;s a draft that hasn&rsquo;t
        been published yet.
      </p>
      <Link className="button-primary" href="/" style={{ marginTop: "2rem" }}>
        Back home
      </Link>
    </section>
  );
}
