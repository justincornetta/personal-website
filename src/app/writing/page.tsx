import { permanentRedirect } from "next/navigation";

// The research archive now lives alongside initiatives in the Projects destination.
export default function WritingPage() {
  permanentRedirect("/projects#research");
}
