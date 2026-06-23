// ─────────────────────────────────────────────
// Footer data — single source of truth for all
// footer content. Update here to reflect across
// every rendered section of the footer.
// ─────────────────────────────────────────────

// ── Types ──────────────────────────────────────

export interface FooterBrand {
  name: string;
  badge: string;
  description: string;
  href: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: "youtube" | "github" | "x-twitter" | "telegram";
}

export interface FooterNavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterNavColumn {
  title: string;
  links: FooterNavLink[];
}

export interface FooterBottomBar {
  year: number;
  authorName: string;
  authorHref: string;
  location: string;
  rights: string;
}

// ── Data ───────────────────────────────────────

export const footerBrand: FooterBrand = {
  name: "QA Playground",
  badge: "⚡",
  href: "/",
  description:
    "A purpose-built platform for QA engineers. Learn Selenium, Playwright and Cypress through practice on real UI elements, demo apps. Rehearse interviews with AI agents, and track every job application through to the offer.",
};

export const footerSocialLinks: FooterSocialLink[] = [
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: "youtube",
  },
  {
    label: "GitHub",
    href: "https://github.com/kundalik-dev",
    icon: "github",
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: "x-twitter",
  },
  {
    label: "Telegram",
    href: "https://t.me",
    icon: "telegram",
  },
];

export const footerNavColumns: FooterNavColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Practice Elements", href: "/practice" },
      { label: "AI Mock Interviews", href: "/interview-practice" },
      { label: "Job Hub & CRM", href: "/job-crm" },
      { label: "Bank Demo", href: "/demo/bank" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "QA Tools", href: "/qa-tools" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog & Tutorials", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Interview Questions", href: "/interview-questions" },
      {
        label: "Automation Framework",
        href: "https://github.com/kundalik5545/QA_PlayGround_Automation_Framework",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      {
        label: "Report an Issue",
        href: "https://github.com/kundalik-dev/qaplayground-support/issues",
        external: true,
      },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Login", href: "/auth/sign-in" },
    ],
  },
];

export const footerBottomBar: FooterBottomBar = {
  year: 2026,
  authorName: "Kundalik Jadhav",
  authorHref: "https://github.com/kundalik-dev",
  location: "Pune, India 🇮🇳",
  rights: "All rights reserved.",
};
