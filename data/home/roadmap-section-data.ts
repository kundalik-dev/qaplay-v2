import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  Building2,
  FlaskConical,
  Bot,
  Rocket,
} from "lucide-react";

export interface RoadmapStep {
  description: string;
  href: string;
  icon: LucideIcon;
  id: string;
  linkLabel: string;
  stage: string;
  title: string;
  tone: "success" | "warning" | "brand-tertiary" | "secondary" | "primary";
}

export interface RoadmapSectionContent {
  ctaHref: string;
  ctaLabel: string;
  ctaText: string;
  description: string;
  sectionTag: string;
  steps: RoadmapStep[];
  titleLines: [string, string];
}

export const roadmapSectionContent: RoadmapSectionContent = {
  sectionTag: "// your roadmap",
  titleLines: ["From Zero to", "QA Automation Engineer"],
  description:
    "A clear, structured path designed to take you from theory to hired without the overwhelm.",
  steps: [
    {
      id: "foundation",
      stage: "Foundation",
      title: "Learn the Basics",
      description:
        "Forms, buttons, selectors, and basic interactions. Follow a focused syllabus that builds real confidence before advancing.",
      href: "/study-tracker/dashboard",
      linkLabel: "Open Study Tracker",
      icon: BookOpenText,
      tone: "success",
    },
    {
      id: "practice",
      stage: "Hands-On Practice",
      title: "Practice Real Challenges",
      description:
        "iFrames, Shadow DOM, dynamic waits, drag and drop. Real UI targets that mirror what you'll face in interviews.",
      href: "/practice",
      linkLabel: "Browse 22+ Elements",
      icon: FlaskConical,
      tone: "warning",
    },
    {
      id: "portfolio",
      stage: "Build Portfolio",
      title: "Build an E2E Framework",
      description:
        "Build a full suite on the Bank Demo — page objects, assertions, and reporting you can show in interviews.",
      href: "/bank",
      linkLabel: "Open Bank Demo",
      icon: Building2,
      tone: "brand-tertiary",
    },
    {
      id: "interview-prep",
      stage: "Interview Prep",
      title: "Rehearse with AI",
      description:
        "Run technical and recruiter rounds with AI until your answers feel natural before the real thing.",
      href: "/#interview",
      linkLabel: "Start a Mock Interview",
      icon: Bot,
      tone: "secondary",
    },
    {
      id: "get-hired",
      stage: "Get Hired",
      title: "Track Jobs and Apply",
      description:
        "Spot roles, draft outreach with AI, and track every application in one pipeline.",
      href: "/#jobs",
      linkLabel: "Open Job Hub",
      icon: Rocket,
      tone: "primary",
    },
  ],
  ctaText:
    "Ready to start? It's 100% free and built to be useful from day one.",
  ctaLabel: "Start your roadmap",
  ctaHref: "/practice",
};
