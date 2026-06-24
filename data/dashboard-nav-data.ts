/**
 * Dashboard sidebar navigation — single source of truth.
 *
 * Items are grouped into named sections that render as labelled groups
 * in the sidebar.
 */

import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  BrainCircuit,
  HelpCircle,
  LayoutDashboard,
  LibraryBig,
  Trophy,
  Wrench,
  Globe,
  Settings,
  Home,
} from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** data-testid applied to the nav link */
  testId: string;
  /** If true, middleware will redirect unauthenticated users to sign-in */
  requiresAuth?: boolean;
}

export interface DashboardNavGroup {
  /** Section heading shown above the items */
  label: string;
  items: DashboardNavItem[];
}

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    label: "Main",
    items: [
      {
        label: "Home",
        href: "/",
        icon: Home,
        testId: "nav-home",
      },
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        testId: "nav-dashboard",
        requiresAuth: true,
      },
    ],
  },
  {
    label: "Practice",
    items: [
      {
        label: "Interview Practice",
        href: "/interview-practice",
        icon: BrainCircuit,
        testId: "nav-interview-practice",
        requiresAuth: true,
      },
      {
        label: "Challenges",
        href: "/challenges",
        icon: Trophy,
        testId: "nav-challenges",
        requiresAuth: true,
      },
      {
        label: "Interview Questions",
        href: "/interview-questions",
        icon: HelpCircle,
        testId: "nav-interview-questions",
      },
    ],
  },
  {
    label: "Tools & Career",
    items: [
      {
        label: "QA Tools",
        href: "/qa-tools",
        icon: Wrench,
        testId: "nav-qa-tools",
      },
      {
        label: "Job CRM",
        href: "/job-crm",
        icon: BriefcaseBusiness,
        testId: "nav-job-crm",
        requiresAuth: true,
      },
      {
        label: "Resources",
        href: "/resources",
        icon: LibraryBig,
        testId: "nav-resources",
        requiresAuth: true,
      },
      {
        label: "Chrome Extensions",
        href: "/chrome",
        icon: Globe,
        testId: "nav-chrome",
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        testId: "nav-settings",
      },
    ],
  },
];
