import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

export type ProjectMeta = {
  title: string;
  slug: string;
  summary: string;
  capability: string;
  domain: string[];
  role: string;
  date: string;
  skills: string[];
  tools: string[];
  featured: boolean;
  status: "published" | "draft" | "private";
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

export type ContentEntry<T> = T & {
  body: string;
};

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

function readEntry<T>(filePath: string, normalize: (data: matter.GrayMatterFile<string>["data"]) => T) {
  const source = fs.readFileSync(filePath, "utf8");
  const parsed = matter(source);

  return {
    ...normalize(parsed.data),
    body: parsed.content,
  };
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function normalizeProject(data: matter.GrayMatterFile<string>["data"]): ProjectMeta {
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    summary: String(data.summary ?? ""),
    capability: String(data.capability ?? ""),
    domain: asArray(data.domain),
    role: String(data.role ?? ""),
    date: String(data.date ?? ""),
    skills: asArray(data.skills),
    tools: asArray(data.tools),
    featured: Boolean(data.featured),
    status: String(data.status ?? "draft") as ProjectMeta["status"],
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

export function getAllProjects() {
  return readDirectory("projects")
    .map((filePath) => readEntry<ProjectMeta>(filePath, normalizeProject))
    .sort(byDateDesc);
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

export function getAllWriting() {
  return readDirectory("writing")
    .map((filePath) => readEntry<WritingMeta>(filePath, normalizeWriting))
    .sort(byDateDesc);
}

export function getPublishedWriting() {
  return getAllWriting().filter((entry) => entry.status === "published");
}

export function getWritingBySlug(slug: string) {
  return getPublishedWriting().find((entry) => entry.slug === slug);
}
