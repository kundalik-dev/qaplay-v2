import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Camera,
  CheckCircle,
  Clock,
  Code2,
  Download,
  ExternalLink,
  FileImage,
  FileText,
  Globe,
  History,
  Key,
  Layers,
  LogIn,
  Settings,
  ShieldCheck,
  Tag,
  UserCheck,
  Video,
  Zap,
} from "lucide-react";

import type { ChromeIconName, ChromeTone } from "@/data/chrome/types";

export const chromeIconMap = {
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  bookmark: Bookmark,
  camera: Camera,
  "check-circle": CheckCircle,
  chrome: Globe,
  clock: Clock,
  "code-2": Code2,
  download: Download,
  "external-link": ExternalLink,
  "file-image": FileImage,
  "file-text": FileText,
  globe: Globe,
  history: History,
  key: Key,
  layers: Layers,
  "log-in": LogIn,
  settings: Settings,
  "shield-check": ShieldCheck,
  tag: Tag,
  "user-check": UserCheck,
  video: Video,
  zap: Zap,
} satisfies Record<ChromeIconName, React.ComponentType<{ className?: string }>>;

export const chromeToneClasses = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    solid: "bg-blue-600",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    solid: "bg-emerald-600",
  },
  orange: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    solid: "bg-orange-600",
  },
  red: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    solid: "bg-red-600",
  },
  slate: {
    text: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-100 dark:bg-slate-800/40",
    border: "border-slate-200 dark:border-slate-700",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    solid: "bg-slate-600",
  },
  teal: {
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    border: "border-teal-200 dark:border-teal-800",
    badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    solid: "bg-teal-600",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    solid: "bg-violet-600",
  },
  yellow: {
    text: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    badge:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    solid: "bg-yellow-600",
  },
} satisfies Record<
  ChromeTone,
  {
    text: string;
    bg: string;
    border: string;
    badge: string;
    solid: string;
  }
>;
