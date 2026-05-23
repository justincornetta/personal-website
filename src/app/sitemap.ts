import type { MetadataRoute } from "next";
import { getPublishedProjects, getPublishedWriting } from "@/lib/content";

const baseUrl = "https://personal-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/writing", "/about"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getPublishedProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
  }));

  const writingRoutes = getPublishedWriting().map((entry) => ({
    url: `${baseUrl}/writing/${entry.slug}`,
    lastModified: new Date(entry.date),
  }));

  return [...routes, ...projectRoutes, ...writingRoutes];
}
