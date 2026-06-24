import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bot,
  ChartNoAxesColumnIncreasing,
  Drama,
  MessageSquareText,
  Mic,
} from "lucide-react";

export type InterviewCardAccent = "primary" | "secondary" | "info" | "success";

export interface InterviewFeatureCard {
  accent: InterviewCardAccent;
  description: string;
  icon: LucideIcon;
  title: string;
  wide?: boolean;
}

export interface InterviewCta {
  href: string;
  label: string;
  variant: "homePrimary" | "homeSecondary";
}

export interface InterviewScore {
  label: string;
  scoreOutOfTen: string;
  value: 85;
}

export interface InterviewFooterStat {
  key: string;
  value: string;
}

export interface InterviewVisualizer {
  aiIcon: LucideIcon;
  aiLabel: string;
  aiQuestion: string;
  aiRoundLabel: string;
  footerStats: InterviewFooterStat[];
  userIcon: LucideIcon;
  userLabel: string;
}

export interface InterviewSectionContent {
  cards: InterviewFeatureCard[];
  ctas: InterviewCta[];
  description: string;
  score: InterviewScore;
  sectionTag: string;
  titleAccent: string;
  titleLineOne: string;
  visualizer: InterviewVisualizer;
}

export const interviewSectionContent: InterviewSectionContent = {
  sectionTag: "// free ai interview practice",
  titleLineOne: "Stop Studying.",
  titleAccent: "Start Performing.",
  description:
    "Knowing the answer is not the same as saying it under pressure. Realtime AI agents role-play your interviewer — free to start, unlimited rounds. Sign up to track your scores.",
  cards: [
    {
      accent: "secondary",
      icon: Drama,
      title: "Role-Play Scenarios",
      description:
        "Choose your round - Manual QA, Automation, SDET, API, or Behavioral. The AI plays recruiter, hiring manager, or tech lead and stays in character throughout.",
      wide: true,
    },
    {
      accent: "info",
      icon: MessageSquareText,
      title: "Realtime Conversation",
      description:
        "Type or speak. The agent follows up exactly like a real interviewer - no canned lists.",
    },
    {
      accent: "primary",
      icon: ChartNoAxesColumnIncreasing,
      title: "Instant Feedback & Scoring",
      description:
        "After each answer: what landed, what was missing, a model answer, and a score out of 10. Track improvement round over round.",
      wide: true,
    },
    {
      accent: "success",
      icon: BadgeCheck,
      title: "Free to Start",
      description:
        "Jump in without an account. Sign up to save scores and track your improvement over time.",
    },
  ],
  ctas: [
    {
      href: "/interview-practice",
      label: "Start Interview",
      variant: "homePrimary",
    },
    {
      href: "/interview-practice",
      label: "Choose a role",
      variant: "homeSecondary",
    },
  ],
  score: {
    label: "Session Score",
    scoreOutOfTen: "8.5",
    value: 85,
  },
  visualizer: {
    aiIcon: Bot,
    aiLabel: "AI Interviewer",
    aiRoundLabel: "Automation Round",
    aiQuestion:
      '"Walk me through how you would design a Page Object Model for a login flow in Playwright. Why POM over plain scripts?"',
    userIcon: Mic,
    userLabel: "You",
    footerStats: [
      { key: "Score", value: "8.5" },
      { key: "Question", value: "Q3" },
      { key: "Always Free", value: "∞" },
    ],
  },
};
