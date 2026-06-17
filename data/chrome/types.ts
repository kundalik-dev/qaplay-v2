export type ChromeIconName =
  | "arrow-right"
  | "book-open"
  | "bookmark"
  | "camera"
  | "check-circle"
  | "chrome"
  | "clock"
  | "code-2"
  | "download"
  | "external-link"
  | "file-image"
  | "file-text"
  | "globe"
  | "history"
  | "key"
  | "layers"
  | "log-in"
  | "settings"
  | "shield-check"
  | "tag"
  | "user-check"
  | "video"
  | "zap";

export type ChromeTone =
  | "blue"
  | "emerald"
  | "orange"
  | "red"
  | "slate"
  | "teal"
  | "violet"
  | "yellow";

export interface ChromeBadge {
  icon: ChromeIconName;
  label: string;
  tone: ChromeTone;
}

export interface ChromeStat {
  value: string;
  label: string;
}

export interface ChromeFeature {
  icon: ChromeIconName;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeStep {
  step: string;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeFormatCard {
  icon: ChromeIconName;
  label: string;
  description: string;
  items: string[];
  tone: ChromeTone;
}

export interface ChromeUseCase {
  icon: ChromeIconName;
  title: string;
  description: string;
  tone: ChromeTone;
}

export interface ChromeFaqItem {
  question: string;
  answer: string;
}

export interface ChromeLinkItem {
  label: string;
  href: string;
}
