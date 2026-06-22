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
  description?: string | null;
  tags: string[];
  image?: string | null;
  source?: string;
  createdAt: string;
  updatedAt?: string;
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
