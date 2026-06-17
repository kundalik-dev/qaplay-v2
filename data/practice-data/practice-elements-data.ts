/**
 * Practice Elements — single source of truth for the /practice page cards.
 *
 * Each entry drives the card UI: icon (SVG from /public/icons/), title,
 * description, difficulty level, route href, and the short tag badge.
 *
 * Add new practice elements here; the grid picks them up automatically.
 */

export type PracticeLevel = "Beginner" | "Intermediate" | "Advanced";

export interface PracticeCard {
  /** Route the card links to. Use the full path, e.g. /practice/buttons */
  href: string;
  /** Absolute path to the SVG icon inside /public, e.g. /icons/buttons.svg */
  iconSrc: string;
  /** Accessible alt text for the icon */
  iconAlt: string;
  /** Card heading */
  title: string;
  /** One-sentence description shown on the card */
  description: string;
  /** Difficulty level — drives the coloured badge */
  level: PracticeLevel;
  /** Short uppercase tag shown as a pill in the card footer, e.g. FORM */
  tag: string;
  /** Set true for cards that open an external URL */
  isExternal?: boolean;
  /** data-testid suffix — auto-derived from title if omitted */
  testId?: string;
}

export const practiceCards: PracticeCard[] = [
  {
    href: "/practice/input-fields",
    iconSrc: "/mainicons/edit.svg",
    iconAlt: "Input Fields icon",
    title: "Input Fields",
    description:
      "Practice typing, clearing, validation states, and different input field types.",
    level: "Beginner",
    tag: "FORM",
    testId: "input-fields",
  },
  {
    href: "/practice/buttons",
    iconSrc: "/mainicons/buttons.svg",
    iconAlt: "Buttons icon",
    title: "Buttons",
    description:
      "Click, double-click, right-click, and test disabled button behavior.",
    level: "Beginner",
    tag: "CLICKS",
    testId: "buttons",
  },
  {
    href: "/practice/forms",
    iconSrc: "/mainicons/sign-form.svg",
    iconAlt: "Forms icon",
    title: "Forms",
    description:
      "Work through fill, submit, error, and validation scenarios in one place.",
    level: "Intermediate",
    tag: "FLOW",
    testId: "forms",
  },
  {
    href: "/practice/dropdowns",
    iconSrc: "/mainicons/select.svg",
    iconAlt: "Dropdowns icon",
    title: "Dropdowns",
    description:
      "Handle single and multi-option dropdown selection patterns cleanly.",
    level: "Beginner",
    tag: "SELECT",
    testId: "dropdowns",
  },
  {
    href: "/practice/data-table",
    iconSrc: "/mainicons/advtable.svg",
    iconAlt: "Data Table icon",
    title: "Data Table",
    description:
      "Read, sort, filter, and assert table data like real test cases do.",
    level: "Intermediate",
    tag: "TABLE",
    testId: "data-table",
  },
  {
    href: "/practice/alerts-dialogs",
    iconSrc: "/mainicons/alert.svg",
    iconAlt: "Alerts & Dialogs icon",
    title: "Alerts & Dialogs",
    description:
      "Handle confirm, alert, and prompt dialogs with predictable outcomes.",
    level: "Intermediate",
    tag: "BROWSER",
    testId: "alerts-dialogs",
  },
  {
    href: "/practice/radio-checkbox",
    iconSrc: "/mainicons/radio.svg",
    iconAlt: "Radio & Checkbox icon",
    title: "Radio & Checkbox",
    description:
      "Toggle radio buttons and checkboxes across different states and groups.",
    level: "Beginner",
    tag: "TOGGLE",
    testId: "radio-checkbox",
  },
  {
    href: "/practice/date-picker",
    iconSrc: "/mainicons/calendar.svg",
    iconAlt: "Date Picker icon",
    title: "Date Picker",
    description:
      "Interact with date pickers and time selection elements end-to-end.",
    level: "Intermediate",
    tag: "DATE",
    testId: "date-picker",
  },
  {
    href: "/practice/links",
    iconSrc: "/mainicons/frame.svg",
    iconAlt: "Links icon",
    title: "Links",
    description:
      "Interact with different types of links and navigation patterns.",
    level: "Beginner",
    tag: "NAV",
    testId: "links",
  },
  {
    href: "/practice/tabs-windows",
    iconSrc: "/mainicons/window.svg",
    iconAlt: "Tabs & Windows icon",
    title: "Tabs & Windows",
    description:
      "Switch between browser tabs and pop-up windows in your test suites.",
    level: "Intermediate",
    tag: "WINDOWS",
    testId: "tabs-windows",
  },
  {
    href: "/practice/dynamic-waits",
    iconSrc: "/mainicons/waits.svg",
    iconAlt: "Dynamic Waits icon",
    title: "Dynamic Waits",
    description:
      "Practice explicit and implicit waits for dynamic content loading.",
    level: "Advanced",
    tag: "ASYNC",
    testId: "dynamic-waits",
  },
  {
    href: "/practice/multi-select",
    iconSrc: "/mainicons/selectable.svg",
    iconAlt: "Multi Select icon",
    title: "Multi Select",
    description:
      "Practice selecting multiple items from lists and dropdown menus.",
    level: "Intermediate",
    tag: "SELECT",
    testId: "multi-select",
  },
  {
    href: "/practice/file-upload",
    iconSrc: "/mainicons/download.svg",
    iconAlt: "File Upload icon",
    title: "File Upload",
    description:
      "Practice file upload and download automation in realistic scenarios.",
    level: "Intermediate",
    tag: "UPLOAD",
    testId: "file-upload",
  },
  {
    href: "/bank",
    iconSrc: "/mainicons/mario.svg",
    iconAlt: "Bank Demo App icon",
    title: "Bank App",
    description:
      "End-to-end POM practice with a realistic bank demo application.",
    level: "Advanced",
    tag: "E2E",
    testId: "bank-app",
  },
];
