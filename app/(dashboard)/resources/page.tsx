import type { Metadata } from "next";

import { ResourcesView } from "./_components/resources-view";

export const metadata: Metadata = {
  title: "Resources | QA Playground",
  description:
    "Save and organise articles, videos, courses, tools and references you are learning from - your personal QA resource library.",
  openGraph: {
    title: "Resources | QA Playground",
    description:
      "Save and organise articles, videos, courses, tools and references you are learning from - your personal QA resource library.",
    url: "https://qaplayground.dev/resources",
    siteName: "QA Playground",
    type: "website",
  },
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
