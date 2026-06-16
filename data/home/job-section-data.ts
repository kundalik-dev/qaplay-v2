import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  FileText,
  Rocket,
  Search,
  Sparkles,
  MailCheck,
} from "lucide-react";

export interface JobSectionStep {
  description: string;
  icon: LucideIcon;
  id: string;
  title: string;
}

export interface JobCrmItem {
  company: string;
  stage: "Applied" | "HR Opened" | "Interview" | "AI Draft Ready";
}

export interface JobSectionPanel {
  badge?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}

export interface JobSectionContent {
  crmItems: JobCrmItem[];
  crmPanel: JobSectionPanel;
  description: string;
  futureChecklist: string[];
  futurePanel: JobSectionPanel;
  sectionTag: string;
  steps: JobSectionStep[];
  titleLines: [string, string];
}

export const jobSectionContent: JobSectionContent = {
  sectionTag: "// job hunt hub",
  titleLines: ["From Job Opening", "to Offer Letter"],
  description:
    "Practice gets you ready. The Job Hub gets you hired. Track the latest QA openings and let AI handle the busywork of applying.",
  steps: [
    {
      id: "track-jobs",
      icon: Search,
      title: "Track Latest Jobs",
      description:
        "Fresh QA, automation & SDET openings in one feed - filter by role, location, and experience.",
    },
    {
      id: "read-jd",
      icon: FileText,
      title: "Read the JD",
      description:
        "Open any job to see the full description, required skills, and how well it matches your profile.",
    },
    {
      id: "draft-email",
      icon: Sparkles,
      title: "AI Drafts Your Email",
      description:
        "AI reads your resume and the JD, then writes a tailored application email you can tweak and send.",
    },
    {
      id: "apply-direct",
      icon: Rocket,
      title: "Apply Directly",
      description:
        "One click to the official apply link or send your drafted email - no copy-pasting between tabs.",
    },
    {
      id: "track-crm",
      icon: BriefcaseBusiness,
      title: "Track in Your CRM",
      description:
        "Every application logged in your personal job CRM so nothing slips through the cracks.",
    },
  ],
  crmPanel: {
    icon: BriefcaseBusiness,
    title: "Your Job CRM",
    description:
      "A Kanban-style tracker for your whole search. See where every application stands at a glance - from drafted to interview.",
  },
  crmItems: [
    { company: "SDET - Razorpay", stage: "Interview" },
    { company: "Automation QA - Swiggy", stage: "HR Opened" },
    { company: "QA Engineer - Zoho", stage: "Applied" },
    { company: "Lead SDET - Freshworks", stage: "AI Draft Ready" },
  ],
  futurePanel: {
    badge: "Coming Soon",
    icon: MailCheck,
    title: "Email Tracking",
    description:
      "Going further - know what happens after you hit send, so you can follow up at exactly the right moment.",
  },
  futureChecklist: [
    "See which application emails you've sent",
    "Know if the recruiter opened your email",
    "Log calls and interview invites against each role",
    "Smart reminders to follow up on silent threads",
  ],
};
