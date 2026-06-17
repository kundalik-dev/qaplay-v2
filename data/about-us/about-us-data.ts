import { allUrls, basicDetails } from "@/data/meta-data/basic-details-data";

/**
 * Content for the About Us page.
 *
 * Single source of truth for everything rendered on `/about-us`. Update copy
 * here and the page picks it up — keeps the route components presentational.
 */

export type AboutSection = {
  /** Stable id used for the section anchor, `data-section`, and headings. */
  id: string;
  title: string;
  paragraphs: string[];
};

export type AboutOffering = {
  /** Stable id used for `data-card` / `data-testid`. */
  id: string;
  title: string;
  description: string;
};

export type AboutLink = {
  label: string;
  href: string;
  /** External links open in a new tab with safe rel attributes. */
  external?: boolean;
};

export const aboutHero = {
  eyebrow: "About Us",
  title: `About ${basicDetails.websiteName}`,
  subtitle: "Practice, learn, and excel in QA automation testing.",
} as const;

export const aboutSections: AboutSection[] = [
  {
    id: "mission",
    title: "Our Mission",
    paragraphs: [
      `${basicDetails.websiteName} is a free, purpose-built platform for QA automation engineers who want to sharpen their skills through hands-on practice. We believe the best way to learn automation is by doing — not just reading about it.`,
      "Most real-world applications are not designed with testability in mind. We built QA Playground to fill that gap: a dedicated space where every element, form, table, and interaction exists specifically to be automated.",
    ],
  },
  {
    id: "problem-we-solve",
    title: "The Problem We Solve",
    paragraphs: [
      "QA engineers at all levels — from beginners learning their first Selenium script to experienced engineers exploring Playwright — struggle to find realistic, stable environments to practice automation. Demo sites go down, real apps block bots, and basic tutorials don't cover the edge cases that come up in real work.",
      "QA Playground provides a consistent, always-available environment with elements that behave predictably, are rich with automation-friendly attributes (id, data-testid, data-action), and cover the scenarios you actually encounter on the job.",
    ],
  },
  {
    id: "who-we-are",
    title: "Who We Are",
    paragraphs: [
      "QA Playground was created and is maintained by Kundalik Jadhav, a QA automation engineer with hands-on experience in Selenium, Playwright, and Cypress across real-world projects. The platform was built out of a genuine frustration with the lack of high-quality, purpose-built practice environments for QA professionals.",
      "The platform launched in early 2025 and is actively maintained and improved based on community feedback. It is free to use and will remain so.",
      "We are not a corporation or VC-funded startup — just a QA engineer who wanted a better playground and decided to build it for everyone.",
    ],
  },
];

export const aboutOfferingsHeading = {
  id: "what-we-offer",
  title: "What We Offer",
} as const;

export const aboutOfferings: AboutOffering[] = [
  {
    id: "practice-elements",
    title: "22+ Practice Elements",
    description:
      "Interactive UI elements designed for Selenium, Playwright, and Cypress practice — including inputs, buttons, tables, calendars, drag-and-drop, alerts, file uploads, shadow DOM, and more.",
  },
  {
    id: "bank-demo",
    title: "Bank Demo Application",
    description:
      "A simulated banking app with login, dashboard, accounts, and transactions — built to practice end-to-end test automation scenarios in a realistic multi-page flow.",
  },
  {
    id: "study-tracker",
    title: "Study Tracker",
    description:
      "Track your QA learning progress across multiple syllabi — Manual Testing, Selenium, Playwright, Cypress, API Testing, and more — with daily logging and resource saving.",
  },
  {
    id: "tools-and-blog",
    title: "QA Tools & Blog",
    description:
      "Free tools for QA engineers (JSON converter, more coming soon) plus a blog with tutorials, best practices, and guides on automation frameworks and testing strategy.",
  },
];

export const aboutCommunity = {
  id: "community",
  title: "Join the Community",
  paragraphs: [
    "QA Playground is more than a toolset — it is a growing community of testers who are serious about their craft. Whether you are preparing for interviews, picking up a new framework, or just keeping your skills sharp, this is a place to practice without pressure.",
  ],
  /** Inline links rendered after the community copy. */
  links: {
    youtube: {
      label: "YouTube",
      href: allUrls.youtubeURL,
      external: true,
    } satisfies AboutLink,
    contact: {
      label: "reach out",
      href: "/contact-us",
    } satisfies AboutLink,
  },
} as const;

export const aboutCta = {
  id: "about-cta",
  title: "Have a question or idea?",
  description:
    "We would love to hear from you. Whether it is a bug report, a feature suggestion, or just a hello — get in touch.",
  button: {
    label: "Contact Us",
    href: "/contact-us",
  },
} as const;
