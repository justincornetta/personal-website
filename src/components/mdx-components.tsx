import type { AnchorHTMLAttributes } from "react";

/**
 * Case-study and About bodies are plain Markdown (headings, lists, links),
 * styled by the `.prose-content` rules in globals.css. The only override is
 * links: external URLs open in a new tab, internal ones stay in-app.
 */
export const mdxComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    const external = /^https?:\/\//.test(href);
    return external ? <a {...props} target="_blank" rel="noreferrer" /> : <a {...props} />;
  },
};
