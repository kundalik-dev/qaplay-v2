/**
 * Practice Elements — drives the small cards shown in the home
 * `practice-new-section`.
 *
 * Each entry uses an SVG icon from `/public/mainicons/` and links to the
 * matching `/practice/...` route. Keep titles, hrefs, and difficulty levels in
 * sync with the practice page source of truth in
 * `data/practice-data/practice-elements-data.ts`.
 */

export interface PracticeElement {
  /** Practice route the card links to, e.g. /practice/input-fields */
  href: string;
  /** Absolute path to the SVG icon inside /public, e.g. /mainicons/edit.svg */
  iconSrc: string;
  /** Accessible alt text for the icon */
  iconAlt: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const practiceElements: PracticeElement[] = [
  {
    href: "/practice/input-fields",
    iconSrc: "/mainicons/edit.svg",
    iconAlt: "Forms & Inputs icon",
    title: "Forms & Inputs",
    level: "Beginner",
  },
  {
    href: "/practice/alerts-dialogs",
    iconSrc: "/mainicons/alert.svg",
    iconAlt: "Alerts & Dialogs icon",
    title: "Alerts & Dialogs",
    level: "Intermediate",
  },
  {
    href: "/practice/drag-drop",
    iconSrc: "/mainicons/drag.svg",
    iconAlt: "Drag & Drop icon",
    title: "Drag & Drop",
    level: "Advanced",
  },
  {
    href: "/practice/iframes",
    iconSrc: "/mainicons/frame.svg",
    iconAlt: "iFrames icon",
    title: "iFrames",
    level: "Intermediate",
  },
  {
    href: "/practice/shadow-dom",
    iconSrc: "/mainicons/elements.svg",
    iconAlt: "Shadow DOM icon",
    title: "Shadow DOM",
    level: "Advanced",
  },
  {
    href: "/practice/dynamic-waits",
    iconSrc: "/mainicons/waits.svg",
    iconAlt: "Dynamic Waits icon",
    title: "Dynamic Waits",
    level: "Advanced",
  },
  {
    href: "/practice/data-table",
    iconSrc: "/mainicons/datatables-v2.svg",
    iconAlt: "Data Tables icon",
    title: "Data Tables",
    level: "Intermediate",
  },
  {
    href: "/practice/dropdowns",
    iconSrc: "/mainicons/dropdowns-v2.svg",
    iconAlt: "Dropdowns icon",
    title: "Dropdowns",
    level: "Beginner",
  },
  {
    href: "/practice/date-picker",
    iconSrc: "/mainicons/calendar.svg",
    iconAlt: "Date Pickers icon",
    title: "Date Pickers",
    level: "Intermediate",
  },
  {
    href: "/practice/modals",
    iconSrc: "/mainicons/window.svg",
    iconAlt: "Modal Windows icon",
    title: "Modal Windows",
    level: "Beginner",
  },
  {
    href: "/practice/infinite-scroll",
    iconSrc: "/mainicons/falling.svg",
    iconAlt: "Infinite Scroll icon",
    title: "Infinite Scroll",
    level: "Advanced",
  },
  {
    href: "/practice/tabs-windows",
    iconSrc: "/mainicons/tabs-v2.svg",
    iconAlt: "Multi-Tab Windows icon",
    title: "Multi-Tab Windows",
    level: "Intermediate",
  },
];
