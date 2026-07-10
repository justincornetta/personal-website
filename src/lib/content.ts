import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type GalleryItem = { src: string; caption: string };

export type ProjectMeta = {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  category: string;
  contentType: "Project" | "Writing";
  role: string;
  date: string;
  published: string;
  skills: string[];
  tools: string[];
  featured: boolean;
  order: number;
  status: "published" | "draft" | "private";
  liveUrl?: string;
  externalUrl?: string;
  video?: string;
  cover?: string;
  gallery: GalleryItem[];
};

export type WritingMeta = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  date: string;
  tags: string[];
  featured: boolean;
  status: "published" | "draft" | "private";
  disclosure?: string;
};

export type ContentEntry<T> = T & { body: string };

function readDirectory(folder: string) {
  const dir = path.join(contentRoot, folder);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }
  if (typeof value === "string" && value.length > 0) {
    return [value];
  }
  return [];
}

function asGallery(value: unknown): GalleryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      src: String(item.src ?? ""),
      caption: String(item.caption ?? ""),
    }))
    .filter((item) => item.src.length > 0);
}

function readEntry<T>(filePath: string, normalize: (data: matter.GrayMatterFile<string>["data"]) => T) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);
  return { ...normalize(parsed.data), body: parsed.content };
}

function byOrderThenDate(a: ProjectMeta, b: ProjectMeta) {
  if (a.order !== b.order) {
    return a.order - b.order;
  }
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function normalizeProject(data: matter.GrayMatterFile<string>["data"]): ProjectMeta {
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    subtitle: String(data.subtitle ?? ""),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? ""),
    contentType: (String(data.contentType ?? "Project") as ProjectMeta["contentType"]),
    role: String(data.role ?? ""),
    date: String(data.date ?? ""),
    published: String(data.published ?? ""),
    skills: asArray(data.skills),
    tools: asArray(data.tools),
    featured: Boolean(data.featured),
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : 99,
    status: String(data.status ?? "draft") as ProjectMeta["status"],
    liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
    video: data.video ? String(data.video) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    gallery: asGallery(data.gallery),
  };
}

function normalizeWriting(data: matter.GrayMatterFile<string>["data"]): WritingMeta {
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    summary: String(data.summary ?? ""),
    category: String(data.category ?? ""),
    date: String(data.date ?? ""),
    tags: asArray(data.tags),
    featured: Boolean(data.featured),
    status: String(data.status ?? "draft") as WritingMeta["status"],
    disclosure: data.disclosure ? String(data.disclosure) : undefined,
  };
}

export function getAllProjects(): ContentEntry<ProjectMeta>[] {
  return readDirectory("projects")
    .map((filePath) => readEntry<ProjectMeta>(filePath, normalizeProject))
    .sort(byOrderThenDate);
}

export function getPublishedProjects() {
  return getAllProjects().filter((project) => project.status === "published");
}

export function getFeaturedProjects() {
  return getPublishedProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return getPublishedProjects().find((project) => project.slug === slug);
}

export function getAllWriting(): ContentEntry<WritingMeta>[] {
  return readDirectory("writing")
    .map((filePath) => readEntry<WritingMeta>(filePath, normalizeWriting))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPublishedWriting() {
  return getAllWriting().filter((entry) => entry.status === "published");
}

export function getWritingBySlug(slug: string) {
  return getPublishedWriting().find((entry) => entry.slug === slug);
}
