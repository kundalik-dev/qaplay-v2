/**
 * New Practice Playground — single source of truth for the /new-practice cards.
 *
 * Each entry drives a card on the playground index: icon, title, description,
 * difficulty level, route href, and the short tag badge.
 *
 * Add new playground entries here; the grid picks them up automatically.
 */

export type NewPracticeLevel = "Beginner" | "Intermediate" | "Advanced";

export interface NewPracticeCard {
  /** Route the card links to, e.g. /new-practice/alert-practice */
  href: string;
  /** Absolute path to the SVG icon inside /public, e.g. /mainicons/alert.svg */
  iconSrc: string;
  /** Accessible alt text for the icon */
  iconAlt: string;
  /** Card heading */
  title: string;
  /** One-sentence description shown on the card */
  description: string;
  /** Difficulty level — drives the coloured badge */
  level: NewPracticeLevel;
  /** Short uppercase tag shown as a pill in the card footer, e.g. BROWSER */
  tag: string;
  /** Set true for cards that open an external URL */
  isExternal?: boolean;
  /** data-testid suffix — auto-derived from title if omitted */
  testId?: string;
}

export const newPracticeCards: NewPracticeCard[] = [
  {
    href: "/new-practice/alert-practice",
    iconSrc: "/mainicons/alert.svg",
    iconAlt: "Alert Practice icon",
    title: "Alert Practice",
    description:
      "Trigger and handle browser dialogs — alert, confirm, and prompt — with predictable outcomes.",
    level: "Beginner",
    tag: "BROWSER",
    testId: "alert-practice",
  },
  // ── Dummy placeholders below — wire up real routes as you build them ──────
  {
    href: "/new-practice/keyboard-actions",
    iconSrc: "/mainicons/buttons-v2.svg",
    iconAlt: "Keyboard Actions icon",
    title: "Keyboard Actions",
    description:
      "Practice key presses, shortcuts, and modifier combinations across inputs.",
    level: "Intermediate",
    tag: "KEYBOARD",
    testId: "keyboard-actions",
  },
  {
    href: "/new-practice/network-mock",
    iconSrc: "/mainicons/frame.svg",
    iconAlt: "Network Mock icon",
    title: "Network Mocking",
    description:
      "Intercept requests and return mocked responses to test edge-case UI states.",
    level: "Advanced",
    tag: "NETWORK",
    testId: "network-mock",
  },
  {
    href: "/new-practice/date-time",
    iconSrc: "/mainicons/calendar.svg",
    iconAlt: "Date & Time icon",
    title: "Date & Time",
    description:
      "Work with date pickers, calendars, and time selection components end-to-end.",
    level: "Intermediate",
    tag: "DATE",
    testId: "date-time",
  },
];
