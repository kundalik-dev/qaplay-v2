import type { LucideIcon } from "lucide-react";
import {
  AlarmClock,
  BellRing,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  FileText,
  GalleryHorizontalEnd,
  Infinity,
  MonitorCog,
  Move,
  PanelsTopLeft,
  ScanSearch,
} from "lucide-react";

export interface PracticeElement {
  href: string;
  icon: LucideIcon;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const practiceElements: PracticeElement[] = [
  {
    href: "/practice/input-fields",
    icon: FileText,
    title: "Forms & Inputs",
    level: "Beginner",
  },
  {
    href: "/practice/alerts-dialogs",
    icon: BellRing,
    title: "Alerts & Dialogs",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: Move,
    title: "Drag & Drop",
    level: "Advanced",
  },
  {
    href: "/practice",
    icon: PanelsTopLeft,
    title: "iFrames",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: ScanSearch,
    title: "Shadow DOM",
    level: "Advanced",
  },
  {
    href: "/practice/dynamic-waits",
    icon: AlarmClock,
    title: "Dynamic Waits",
    level: "Advanced",
  },
  {
    href: "/practice/data-table",
    icon: ChartNoAxesCombined,
    title: "Data Tables",
    level: "Intermediate",
  },
  {
    href: "/practice/dropdowns",
    icon: ChevronDown,
    title: "Dropdowns",
    level: "Beginner",
  },
  {
    href: "/practice/date-picker",
    icon: CalendarDays,
    title: "Date Pickers",
    level: "Intermediate",
  },
  {
    href: "/practice/",
    icon: MonitorCog,
    title: "Modal Windows",
    level: "Beginner",
  },
  {
    href: "/practice",
    icon: Infinity,
    title: "Infinite Scroll",
    level: "Advanced",
  },
  {
    href: "/practice/tabs-windows",
    icon: GalleryHorizontalEnd,
    title: "Multi-Tab Windows",
    level: "Intermediate",
  },
];
