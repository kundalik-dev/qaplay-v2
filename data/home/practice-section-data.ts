import type { LucideIcon } from "lucide-react";
import {
  AlarmClock,
  ArrowDownWideNarrow,
  BellRing,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  FileStack,
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
    href: "/practice/input",
    icon: FileText,
    title: "Forms & Inputs",
    level: "Beginner",
  },
  {
    href: "/practice/alert",
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
    href: "/practice",
    icon: AlarmClock,
    title: "Dynamic Waits",
    level: "Advanced",
  },
  {
    href: "/practice/simple-table",
    icon: ChartNoAxesCombined,
    title: "Data Tables",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: ChevronDown,
    title: "Dropdowns",
    level: "Beginner",
  },
  {
    href: "/practice",
    icon: CalendarDays,
    title: "Date Pickers",
    level: "Intermediate",
  },
  {
    href: "/practice",
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
    href: "/practice",
    icon: GalleryHorizontalEnd,
    title: "Multi-Tab Windows",
    level: "Intermediate",
  },
];
