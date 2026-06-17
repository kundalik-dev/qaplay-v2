import { Bird, Briefcase, Code, Globe, Mail, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Content for the personal About Me page (`/about-me`).
 *
 * Per request, this data is colocated inside the route's `_components` folder
 * instead of the top-level `data` folder. It is the single source of truth for
 * everything rendered on the page — update copy here and the components pick it
 * up, keeping each section purely presentational.
 */

export type SocialLink = {
  href: string;
  /** Lucide icon component reference (rendered by the section). */
  icon: LucideIcon;
  label: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  project: string;
};

export type SkillRow = {
  /** Stable id used for `data-skill` / `data-testid`. */
  id: string;
  label: string;
  value: string;
};

export type GithubProject = {
  /** Stable id used for `data-card` / `data-testid`. */
  id: string;
  name: string;
  description: string;
  url: string;
  liveUrl: string;
};

export const profile = {
  name: "Kundalik R. Jadhav",
} as const;

export const summaryParagraphs: string[] = [
  "I am a highly skilled and motivated Test Analyst with 5.5+ years of experience and a strong background in automation testing & API testing with CI/CD pipelines. Proficient in Selenium WebDriver (C# & Java) and framework development.",
  "I have a proven track record of delivering high-quality UK Pension software solutions and ensuring the reliability and performance of applications. My expertise includes various testing methodologies, tools, and frameworks, making me a valuable asset to any development team.",
];

export const socialLinks: SocialLink[] = [
  {
    href: "mailto:kundalik.dev@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://www.linkedin.com/in/kundalikjadhav1516",
    icon: Briefcase,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/kundalik-dev",
    icon: Code,
    label: "GitHub",
  },
  {
    href: "https://www.youtube.com/@qaplayground",
    icon: Video,
    label: "YouTube",
  },
  {
    href: "https://twitter.com/qaplayground",
    icon: Bird,
    label: "Twitter",
  },
  {
    href: "https://www.qaplayground.com/",
    icon: Globe,
    label: "Website",
  },
];

export const skills: SkillRow[] = [
  {
    id: "automation",
    label: "Automation",
    value: "Selenium, Playwright, NUnit, TestNG",
  },
  { id: "language", label: "Language", value: "C#, JavaScript, SQL" },
  {
    id: "framework",
    label: "Framework",
    value: "POM, Builder Pattern, Data-Driven, TestNG (JSON, NUnit)",
  },
  { id: "api", label: "API Testing", value: "RestAssured, Postman" },
  {
    id: "database",
    label: "Database Testing",
    value: "SQL Server, PostGresSQL",
  },
  { id: "ci-cd", label: "CI/CD Pipelines", value: "Git, Jenkins" },
  {
    id: "test-management",
    label: "Test Management",
    value: "JIRA, Azure Test Plans",
  },
  {
    id: "dev-skills",
    label: "Dev Skills",
    value: "Next.js, Tailwind CSS, JavaScript, Shadcn, HTML, CSS",
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Automation Tester",
    company: "Lumera",
    duration: "Jan 2025 - Present",
    project:
      "eMember Public & Admin Portal — a platform enabling users to track their pensions and retirement benefits. Designed and developed an automation framework using C#, Selenium, and NUnit with database integration for data-driven testing.",
  },
  {
    role: "Test Analyst",
    company: "ITM",
    duration: "Aug 2022 - Jan 2025",
    project:
      "Penscope (Pension Administration) — Designed and developed an automation framework using C#, Selenium, and NUnit with JSON-based data-driven testing, reducing manual testing effort by 60%.",
  },
  {
    role: "Junior Analyst",
    company: "Mindtree",
    duration: "Jun 2019 - Aug 2022",
    project:
      "Banking Admin — Performed manual and automation testing for banking applications, with a focus on quality assurance and application reliability.",
  },
];

export const achievements: string[] = [
  "Employee of the month and top performer.",
  "Successfully reduced manual testing effort by 60% through automation.",
  "Contributed to the development of a comprehensive automation framework.",
  "Implemented CI/CD pipelines for efficient software delivery.",
  "Recognized for delivering high-quality software solutions in the UK Pension domain.",
];

export const githubProjects: GithubProject[] = [
  {
    id: "ai-website-generator",
    name: "AI Website Generator",
    description:
      "Create stunning websites in minutes with our AI Website Generator. Powered by Next.js and Tailwind CSS, it offers customizable templates and seamless deployment.",
    url: "https://github.com/kundalik5545/ai-website-generator",
    liveUrl: "https://free-ai-website-generator.vercel.app/",
  },
  {
    id: "qa-playground",
    name: "QA PlayGround",
    description:
      "A comprehensive automation testing platform with interactive labs, real-world scenarios, and built-in UI components for hands-on learning.",
    url: "https://github.com/kundalik5545/qatesting",
    liveUrl: "https://qaplayground.com/",
  },
  {
    id: "qa-playground-clipper",
    name: "QA Playground Clipper",
    description:
      "Chrome extension that allows users to capture any web page, article, or YouTube video link and save it to QA Playground for future reference and learning.",
    url: "https://github.com/kundalik-dev/save-to-qa-playground",
    liveUrl:
      "https://chromewebstore.google.com/detail/jegdkegbomfbmhhimfjgacdblcoodfpd?utm_source=item-share-cb",
  },
  {
    id: "qa-capture",
    name: "QA Capture",
    description:
      "QA Capture is a Chrome extension that allows users to continuously capture screenshots and convert them into PDF, MD, or HTML files.",
    url: "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb",
    liveUrl:
      "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb",
  },
];

export const education = {
  title: "Education",
  body: "Bachelor of Engineering from Gov. College of Engineering & Research, Awsari Pune | 2017",
} as const;
