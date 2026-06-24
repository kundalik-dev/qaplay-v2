import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Blocks,
  BookOpenText,
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  Wrench,
} from "lucide-react";

export interface FeatureCard {
  badge?: string;
  className?: string;
  description: string;
  href: string;
  icon: LucideIcon;
  linkLabel: string;
  title: string;
}

export const featureCards: FeatureCard[] = [
  {
    className: "feature-bento-practice",
    badge: "Core Feature",
    icon: Blocks,
    title: "Practice Elements",
    description:
      "22+ interactive UI components for automation practice. Shadow DOM, iFrames, drag and drop, dynamic waits, and interview-style test targets.",
    href: "/practice",
    linkLabel: "Open practice area",
  },
  {
    className: "feature-bento-tracker",
    badge: "New",
    icon: ChartNoAxesCombined,
    title: "QA Study Tracker",
    description:
      "Track progress across focused QA syllabi with charts, streaks, checkpoints, and notes in one place.",
    href: "/study-tracker/dashboard",
    linkLabel: "Start tracking",
  },
  {
    className: "feature-bento-ai",
    badge: "New",
    icon: Bot,
    title: "AI Mock Interviews",
    description:
      "Practice recruiter and technical rounds with realtime AI agents and instant scored feedback.",
    href: "#interview",
    linkLabel: "Practice an interview",
  },
  {
    className: "feature-bento-bank",
    badge: "E2E Simulation",
    icon: Building2,
    title: "Bank Demo App",
    description:
      "A realistic multi-page banking workflow for building a full end-to-end automation suite like a real project.",
    href: "/demo/bank",
    linkLabel: "Open bank demo",
  },
  {
    className: "feature-bento-jobs",
    badge: "New",
    icon: BriefcaseBusiness,
    title: "Job Tracker & CRM",
    description:
      "Browse QA jobs, draft outreach with AI, and track every application through your pipeline.",
    href: "#jobs",
    linkLabel: "Explore hub",
  },
  {
    className: "feature-bento-ext",
    badge: "New",
    icon: AppWindow,
    title: "Browser Extensions",
    description:
      "Find Chrome tools that help QA in daily workflows, from capture helpers to workflow accelerators.",
    href: "/chrome",
    linkLabel: "Add to Chrome",
  },
  {
    className: "feature-bento-tools",
    badge: "Free",
    icon: Wrench,
    title: "QA Tools",
    description:
      "Data generators, selector helpers, and utility tools right when you need them.",
    href: "/qa-tools",
    linkLabel: "Explore tools",
  },
  {
    className: "feature-bento-blog",
    icon: BookOpenText,
    title: "Blog & Tutorials",
    description:
      "Practical QA guides and explainers written from real hands-on testing work.",
    href: "/blog",
    linkLabel: "Read articles",
  },
];
