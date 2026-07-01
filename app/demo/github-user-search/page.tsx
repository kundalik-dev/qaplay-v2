import type { Metadata } from "next";
import { GithubSearchTabs } from "./_components/github-search-tabs";

export const metadata: Metadata = {
  title: "GitHub User Search App | QA Playground Demo",
  description:
    "A single page application to practice automation locators. Search for GitHub users and view their profiles with intentional locator challenges.",
  openGraph: {
    title: "GitHub User Search App | QA Playground Demo",
    description:
      "A single page application to practice automation locators. Search for GitHub users and view their profiles with intentional locator challenges.",
    url: "https://qaplayground.dev/demo/github-user-search",
    siteName: "QA Playground",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub User Search App | QA Playground Demo",
    description:
      "Practice automation locators on a real GitHub API integration.",
  },
};

export default function GithubSearchDemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GitHub User Search Demo App",
    operatingSystem: "Any",
    applicationCategory: "DeveloperApplication",
    description:
      "An interactive demo application for QA engineers to practice automation testing locators across different difficulty levels.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div data-testid="github-search-page" data-section="demo">
        <GithubSearchTabs />
      </div>
    </>
  );
}
