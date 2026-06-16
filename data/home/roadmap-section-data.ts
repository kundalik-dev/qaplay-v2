import type { LucideIcon } from "lucide-react";
import {
  BookOpenText,
  Building2,
  CircleGauge,
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
        "Start with forms, buttons, selectors, and basic interactions. Build confidence with a focused syllabus before you touch advanced automation patterns.",
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
        "Work through iFrames, Shadow DOM, dynamic waits, drag and drop, and realistic UI targets that mirror interview tasks and production edge cases.",
      href: "/practice",
      linkLabel: "Browse 22+ Elements",
      icon: CircleGauge,
      tone: "warning",
    },
    {
      id: "portfolio",
      stage: "Build Portfolio",
      title: "Build an E2E Framework",
      description:
        "Use the Bank Demo to shape a proper end-to-end suite with page objects, reusable utilities, assertions, and reporting you can showcase in interviews.",
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
        "Practice technical and recruiter rounds with realtime AI interviewers so your answers feel natural before the actual conversation starts.",
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
        "Move from preparation to momentum with role discovery, AI-assisted outreach, and a personal job pipeline that keeps every opportunity visible.",
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
