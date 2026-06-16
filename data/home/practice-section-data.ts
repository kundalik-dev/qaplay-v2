export interface PracticeElement {
  href: string;
  icon: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const practiceElements: PracticeElement[] = [
  {
    href: "/practice/input",
    icon: "📝",
    title: "Forms & Inputs",
    level: "Beginner",
  },
  {
    href: "/practice/alert",
    icon: "⚠️",
    title: "Alerts & Dialogs",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: "🖱️",
    title: "Drag & Drop",
    level: "Advanced",
  },
  {
    href: "/practice",
    icon: "🪟",
    title: "iFrames",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: "🟣",
    title: "Shadow DOM",
    level: "Advanced",
  },
  {
    href: "/practice",
    icon: "⏱️",
    title: "Dynamic Waits",
    level: "Advanced",
  },
  {
    href: "/practice/simple-table",
    icon: "📊",
    title: "Data Tables",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: "🔽",
    title: "Dropdowns",
    level: "Beginner",
  },
  {
    href: "/practice",
    icon: "🗓️",
    title: "Date Pickers",
    level: "Intermediate",
  },
  {
    href: "/practice",
    icon: "🪟",
    title: "Modal Windows",
    level: "Beginner",
  },
  {
    href: "/practice",
    icon: "🔁",
    title: "Infinite Scroll",
    level: "Advanced",
  },
  {
    href: "/practice",
    icon: "🔗",
    title: "Multi-Tab Windows",
    level: "Intermediate",
  },
];
