export type ResourceType =
  | "ARTICLE"
  | "VIDEO"
  | "COURSE"
  | "BOOK"
  | "TOOL"
  | "DOCUMENTATION"
  | "OTHER";

export interface Resource {
  id: string;
  resourceType: ResourceType;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  image?: string;
  createdAt: string;
}

export const RESOURCE_TYPES: ResourceType[] = [
  "ARTICLE",
  "VIDEO",
  "COURSE",
  "BOOK",
  "TOOL",
  "DOCUMENTATION",
  "OTHER",
];

export const TYPE_LABELS: Record<ResourceType, string> = {
  ARTICLE: "Article",
  VIDEO: "Video",
  COURSE: "Course",
  BOOK: "Book",
  TOOL: "Tool",
  DOCUMENTATION: "Docs",
  OTHER: "Other",
};

export const TYPE_COLORS: Record<
  ResourceType,
  { background: string; color: string }
> = {
  ARTICLE: { background: "#eff6ff", color: "#2563eb" },
  VIDEO: { background: "#fef2f2", color: "#dc2626" },
  COURSE: { background: "#f0fdf4", color: "#16a34a" },
  BOOK: { background: "#fffbeb", color: "#d97706" },
  TOOL: { background: "#faf5ff", color: "#9333ea" },
  DOCUMENTATION: { background: "#f0f9ff", color: "#0284c7" },
  OTHER: { background: "#f9fafb", color: "#6b7280" },
};

export const EMPTY_FORM = {
  resourceType: "" as ResourceType | "",
  title: "",
  url: "",
  description: "",
  tags: [] as string[],
  image: "",
};

// ── Dummy data ────────────────────────────────────────────────────────────────

export const DUMMY_RESOURCES: Resource[] = [
  {
    id: "r1",
    resourceType: "TOOL",
    title: "- YouTube",
    url: "https://youtube.com",
    description:
      "Enjoy the videos and music you love, upload original content, and share it all with friends,…",
    tags: [],
    image: undefined,
    createdAt: "2026-04-27",
  },
  {
    id: "r2",
    resourceType: "TOOL",
    title: "iDocs — MarkItDown",
    url: "https://idocs.example.com",
    description:
      "idocs using markitdown to convert any document into markdown. It support PDF, excel…",
    tags: ["idocs", "md-convertor", "tool"],
    image: undefined,
    createdAt: "2026-04-24",
  },
  {
    id: "r3",
    resourceType: "TOOL",
    title: "Deploy LobeHub with database on Vercel · LobeHub Docs · LobeHub",
    url: "https://lobehub.com/docs",
    description:
      "Learn how to deploy LobeHub with database on Vercel with ease, including: database,…",
    tags: [],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    createdAt: "2026-04-20",
  },
  {
    id: "r4",
    resourceType: "TOOL",
    title: "Markdown to HTML Converter Online Free | QA Tools",
    url: "https://qatools.example.com/md-html",
    description:
      "Convert Markdown to beautifully styling HTML instantly. Preview live and download the final…",
    tags: [],
    image: undefined,
    createdAt: "2026-04-17",
  },
  {
    id: "r5",
    resourceType: "ARTICLE",
    title: "Software Engineer, AI/ML Systems",
    url: "https://lmstudio.ai/careers",
    description: "Open roles at LM Studio.",
    tags: ["job", "ai", "ml"],
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop",
    createdAt: "2026-04-16",
  },
  {
    id: "r6",
    resourceType: "TOOL",
    title: "All Features: AI Avatar & Voice Interview Platform",
    url: "https://jobmojito.com",
    description:
      "Explore the complete feature set for our AI interview platform, including real-time feedbac…",
    tags: ["saas", "iprep", "idea"],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
    createdAt: "2026-04-12",
  },
  {
    id: "r7",
    resourceType: "TOOL",
    title: "LockedIn AI - AI Interview Assistant & Meeting Copilot",
    url: "https://lockedinai.com",
    description:
      "LockedIn AI is the #1 real-time AI interview assistant for job seekers. Get live interview…",
    tags: ["saas", "iprep", "idea"],
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=200&fit=crop",
    createdAt: "2026-04-12",
  },
  {
    id: "r8",
    resourceType: "TOOL",
    title: "Yoodli | AI Roleplays",
    url: "https://yoodli.ai",
    description:
      "Enterprise AI roleplay platform for sales enablement, partner training, and L&D. Practic…",
    tags: ["saas", "iprep", "idea"],
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    createdAt: "2026-04-12",
  },
  {
    id: "r9",
    resourceType: "TOOL",
    title: "Elevate your interviews with AI",
    url: "https://interviewai.com",
    description:
      "Transform interviews with InterviewAI. Practice smarter, hire faster, and streamline your proces…",
    tags: ["saas", "idea", "iprep"],
    image: undefined,
    createdAt: "2026-04-12",
  },
  {
    id: "r10",
    resourceType: "DOCUMENTATION",
    title: "Process Adapter - Paperclip",
    url: "https://paperclip.dev",
    description:
      "Run local CLI agents like Claude Code and Codex as child processes",
    tags: ["iprep", "idea"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop",
    createdAt: "2026-04-11",
  },
  {
    id: "r11",
    resourceType: "ARTICLE",
    title: "TypeScript Deep Dive",
    url: "https://basarat.gitbook.io/typescript/",
    description:
      "The definitive guide to TypeScript — covers types, generics, decorators and more.",
    tags: ["typescript", "programming"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
    createdAt: "2026-04-08",
  },
  {
    id: "r12",
    resourceType: "COURSE",
    title: "Playwright: From Zero to Hero",
    url: "https://udemy.com/playwright",
    description:
      "Master Playwright end-to-end testing with real projects and CI/CD integration.",
    tags: ["playwright", "testing", "automation"],
    image: undefined,
    createdAt: "2026-04-05",
  },
  {
    id: "r13",
    resourceType: "VIDEO",
    title: "Cypress vs Playwright in 2026",
    url: "https://youtube.com/watch?v=abc123",
    description:
      "A comprehensive comparison of the two leading E2E testing frameworks, covering speed, DX, and ecosystem.",
    tags: ["cypress", "playwright", "testing"],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=200&fit=crop",
    createdAt: "2026-04-01",
  },
];
