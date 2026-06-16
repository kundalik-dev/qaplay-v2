import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
