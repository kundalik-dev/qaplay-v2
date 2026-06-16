import type { MetadataRoute } from "next";

import { basicDetails } from "@/data/meta-data/basic-details-data";

export default function robots(): MetadataRoute.Robots {
  // Use the canonical origin so robots, sitemap, and canonical tags all agree.
  const siteUrl = basicDetails.websiteURL.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/auth/"],
      },
      // Explicitly allow major AI crawlers
      { userAgent: "GPTBot", allow: "/" }, // OpenAI / ChatGPT
      { userAgent: "ClaudeBot", allow: "/" }, // Anthropic / Claude
      { userAgent: "PerplexityBot", allow: "/" }, // Perplexity AI
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" }, // Google AI training
      { userAgent: "Applebot-Extended", allow: "/" }, // Apple AI
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
