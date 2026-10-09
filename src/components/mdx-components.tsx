import type { AnchorHTMLAttributes } from "react";
import { GalleryCarousel } from "./gallery-carousel";
import type { GalleryItem } from "@/lib/content";

/**
 * Case-study and About bodies are plain Markdown (headings, lists, links),
 * styled by the `.prose-content` rules in globals.css. Bodies can also include
 * a screenshot carousel. External links open in a new tab.
 */
export const mdxComponents = {
  ScreenshotCarousel: ({ items, title, subtitle }: { items: string; title: string; subtitle?: string }) => (
    <GalleryCarousel inline items={JSON.parse(items) as GalleryItem[]} title={title} subtitle={subtitle} />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    const external = /^https?:\/\//.test(href);
    return external ? <a {...props} target="_blank" rel="noreferrer" /> : <a {...props} />;
  },
};
