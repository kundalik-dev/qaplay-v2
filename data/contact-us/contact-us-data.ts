import {
  allUrls,
  basicDetails,
  socialHandles,
} from "@/data/meta-data/basic-details-data";

// ── Topic options for the contact form select ────────────────────────────────

export interface ContactTopic {
  value: string;
  label: string;
  emoji: string;
}

export const contactTopics: ContactTopic[] = [
  { value: "Bug Report", label: "Bug Report — something is broken", emoji: "🐛" },
  { value: "Feature Request", label: "Feature Request — suggest an idea", emoji: "💡" },
  { value: "Collaboration", label: "Collaboration — work together", emoji: "🤝" },
  { value: "Automation Help", label: "Automation Help — testing question", emoji: "🤖" },
  { value: "Feedback", label: "Give Feedback — share your thoughts", emoji: "💬" },
  { value: "General Enquiry", label: "General Enquiry — anything else", emoji: "📩" },
];

// ── Sidebar: quick-reach channels ────────────────────────────────────────────
// Icons are NOT stored here — data files must stay free of React/component
// imports. The component maps `iconId` to the actual Lucide icon.

export interface ContactChannel {
  id: string;
  /** Key used by contact-sidebar to look up the correct Lucide icon. */
  iconId: "mail" | "youtube" | "github" | "twitter" | "linkedin";
  label: string;
  display: string;
  href: string;
  external: boolean;
}

export const contactChannels: ContactChannel[] = [
  {
    id: "email",
    iconId: "mail",
    label: "Email",
    display: basicDetails.websiteEmail,
    href: `mailto:${basicDetails.websiteEmail}`,
    external: false,
  },
  {
    id: "youtube",
    iconId: "youtube",
    label: "YouTube",
    display: `@${socialHandles.youtubeId}`,
    href: allUrls.youtubeURL,
    external: true,
  },
  {
    id: "github",
    iconId: "github",
    label: "GitHub",
    display: socialHandles.githubId,
    href: allUrls.githubURL,
    external: true,
  },
  {
    id: "twitter",
    iconId: "twitter",
    label: "X (Twitter)",
    display: `@${socialHandles.twitterId}`,
    href: allUrls.twitterURL,
    external: true,
  },
  {
    id: "linkedin",
    iconId: "linkedin",
    label: "LinkedIn",
    display: "Kundalik Jadhav",
    href: allUrls.linkedInURL,
    external: true,
  },
];

// ── Sidebar: topics we help with ─────────────────────────────────────────────

export const helpTopics: string[] = [
  "Bug reports on any practice element",
  "Feature requests or suggestions",
  "Collaboration and partnerships",
  "Automation testing questions",
  "General platform feedback",
];

// ── Static content / copy ────────────────────────────────────────────────────

export const contactHero = {
  eyebrow: "We reply within 2 business days",
  title: "Get in Touch",
  subtitle:
    "Have a question, spotted a bug, or want to suggest a new practice element? Fill in the form and we'll get back to you shortly.",
} as const;

export const responseInfo = {
  heading: "Response Time",
  body: "Typically within 2 business days. For urgent matters, mention it in the subject line.",
  highlight: "2 business days",
} as const;

export const MAX_MESSAGE_LENGTH = 1000;
