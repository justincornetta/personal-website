import { HomepageRedesign } from "@/components/homepage-redesign";
import { getFeaturedProjects, getPublishedWriting } from "@/lib/content";

export default function Home() {
  const projects = getFeaturedProjects().map((entry) => Object.fromEntries(Object.entries(entry).filter(([key]) => key !== "body")) as Omit<typeof entry, "body">);
  const writing = getPublishedWriting().filter((entry) => entry.featured).slice(0, 3).map((entry) => Object.fromEntries(Object.entries(entry).filter(([key]) => key !== "body")) as Omit<typeof entry, "body">);
  return <HomepageRedesign projects={projects} writing={writing} />;
}
