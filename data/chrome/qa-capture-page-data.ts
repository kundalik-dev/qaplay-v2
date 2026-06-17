import type {
  ChromeBadge,
  ChromeFaqItem,
  ChromeFeature,
  ChromeFormatCard,
  ChromeLinkItem,
  ChromeSessionPreviewItem,
  ChromeStat,
  ChromeStep,
  ChromeUseCase,
} from "./types";

export const qaCapturePageTitle =
  "QA Capture Chrome Extension for QA Screenshot Documentation";

export const qaCapturePageDescription =
  "QA Capture is a free Chrome extension for QA engineers to capture browser screenshots continuously, label each step while testing, and export clean documentation as HTML, Markdown, or PDF.";

export const qaCaptureChromeWebStoreUrl =
  "https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb";

export const qaCaptureHeroBadges: ChromeBadge[] = [
  { icon: "globe", label: "Chrome Extension", tone: "blue" },
  { icon: "check-circle", label: "Free Forever", tone: "emerald" },
  { icon: "bookmark", label: "No Account Needed", tone: "slate" },
];

export const qaCaptureHeroStats: ChromeStat[] = [
  { value: "3", label: "Export Formats" },
  { value: "100%", label: "Stored Locally" },
  { value: "0", label: "Server Uploads Required" },
];

export const qaCaptureOverviewHighlights = [
  "Capture the state of the page exactly when the bug, regression, or milestone appears.",
  "Add human-readable step names so developers, testers, and stakeholders can follow the flow without replaying it.",
  "Export polished evidence in the format that fits your workflow: PDF for tickets, Markdown for docs, or HTML for sharing.",
];

export const qaCaptureWorkflowHighlights = [
  "Pin the extension and start a session before you begin exploring the flow.",
  "Capture key checkpoints like form input, validation errors, API responses, and final success states.",
  "Keep every session reusable so regression evidence and onboarding docs are never one-time work.",
];

export const qaCaptureFeatures: ChromeFeature[] = [
  {
    icon: "camera",
    tone: "blue",
    title: "Continuous Screenshot Capture",
    description:
      "Click once to start a session and capture as many screenshots as you need. Every capture is timestamped and stored in the current session automatically.",
  },
  {
    icon: "tag",
    tone: "violet",
    title: "Name Each Step",
    description:
      "Label every screenshot with a descriptive step name like Login Page, Error on Submit, or After API Response so exported documents stay readable.",
  },
  {
    icon: "download",
    tone: "emerald",
    title: "Export in 3 Formats",
    description:
      "Export your session as a PDF report, GitHub-ready Markdown, or a standalone HTML file you can open anywhere without internet.",
  },
  {
    icon: "history",
    tone: "orange",
    title: "Session History",
    description:
      "Every capture session is saved locally. Browse previous sessions by date, reopen them, add more screenshots, or re-export them in a different format anytime.",
  },
  {
    icon: "zap",
    tone: "yellow",
    title: "One-Click Workflow",
    description:
      "Pin the extension icon, click to capture, type a name, and move on. No popups, no configuration, and no slowdown while you test.",
  },
  {
    icon: "layers",
    tone: "slate",
    title: "Full-Page and Viewport Capture",
    description:
      "Capture only the visible viewport for quick step documentation, or enable full-page mode for long scrollable pages in one shot.",
  },
];

export const qaCaptureHowItWorks: ChromeStep[] = [
  {
    step: "01",
    tone: "blue",
    title: "Install and Pin the Extension",
    description:
      "Install QA Capture from the Chrome Web Store and pin it to your toolbar for one-click access while testing.",
  },
  {
    step: "02",
    tone: "violet",
    title: "Start a Session",
    description:
      "Click the extension icon and create a new session with a clear name such as Login Flow Bug or Checkout Regression.",
  },
  {
    step: "03",
    tone: "emerald",
    title: "Capture and Name Each Step",
    description:
      "Move through your test flow, capture important states, and name each screenshot. Everything saves instantly and stays fully local.",
  },
  {
    step: "04",
    tone: "orange",
    title: "Export Your Session",
    description:
      "When the flow is complete, export the session as PDF, Markdown, or HTML and attach it to your ticket, doc, or handoff.",
  },
];

export const qaCaptureExportFormats: ChromeFormatCard[] = [
  {
    icon: "file-image",
    label: "PDF",
    tone: "red",
    description:
      "Professional report layout with one screenshot per page, plus step names, timestamps, and session metadata.",
    items: ["Bug reports", "Stakeholder sign-off", "Email attachments"],
  },
  {
    icon: "code-2",
    label: "Markdown",
    tone: "violet",
    description:
      "GitHub-flavored Markdown with inline images so you can paste directly into GitHub, Confluence, or Notion.",
    items: ["GitHub Issues", "Confluence docs", "Notion pages"],
  },
  {
    icon: "globe",
    label: "HTML",
    tone: "blue",
    description:
      "A standalone HTML file with embedded images that opens offline and shares easily as a single file.",
    items: ["Offline sharing", "Static hosting", "Team archives"],
  },
];

export const qaCaptureSessionHistoryHighlights = [
  "Browse sessions by date or custom name",
  "Reopen and continue any previous session",
  "Re-export old sessions in PDF, Markdown, or HTML",
  "Delete sessions individually to free up space",
  "All data stored locally with no cloud sync required",
];

export const qaCaptureSessionHistoryPreview: ChromeSessionPreviewItem[] = [
  {
    name: "Login Flow - Bug #1204",
    date: "Jun 17, 2:14 PM",
    count: 8,
    label: "PDF",
    tone: "red",
  },
  {
    name: "Checkout Regression",
    date: "Jun 16, 11:30 AM",
    count: 14,
    label: "MD",
    tone: "violet",
  },
  {
    name: "Dashboard Onboarding Guide",
    date: "Mar 25, 9:05 AM",
    count: 11,
    label: "HTML",
    tone: "blue",
  },
];

export const qaCaptureUseCases: ChromeUseCase[] = [
  {
    icon: "check-circle",
    tone: "emerald",
    title: "Document a Bug Step by Step",
    description:
      "Reproduce the bug, capture each click and error state with a label, export as PDF, and attach directly to your Jira ticket.",
  },
  {
    icon: "book-open",
    tone: "blue",
    title: "Write Test Case Documentation",
    description:
      "Walk through a test case in the browser, name each screenshot, and export as Markdown for living documentation.",
  },
  {
    icon: "clock",
    tone: "orange",
    title: "Onboard a New QA Engineer",
    description:
      "Capture a complete walkthrough of a complex flow and export it as a self-contained HTML guide anyone can open.",
  },
  {
    icon: "file-text",
    tone: "violet",
    title: "Regression Testing Evidence",
    description:
      "Capture before-and-after screenshots for regression runs and use session history to compare against earlier runs.",
  },
];

export const qaCaptureFaqItems: ChromeFaqItem[] = [
  {
    question: "Is QA Capture free to use?",
    answer:
      "Yes. QA Capture is completely free with no subscription, no account requirement, and no usage limits. Everything is stored locally in your browser.",
  },
  {
    question: "Where are my screenshots and sessions stored?",
    answer:
      "Everything is stored locally in chrome.storage.local. Your screenshots never leave your device, so export important sessions if you want an extra backup.",
  },
  {
    question: "How many screenshots can I capture in one session?",
    answer:
      "There is no hard limit enforced by the extension. Very large sessions may take longer to export as PDF, so splitting huge flows into smaller sessions is still a good idea.",
  },
  {
    question: "Can I edit or delete a screenshot after capturing it?",
    answer:
      "Yes. You can rename steps, reorder screenshots, delete individual captures, or remove an entire session from history before exporting.",
  },
  {
    question: "Does QA Capture work on all websites?",
    answer:
      "It works on standard HTTP and HTTPS pages, including localhost. Chrome blocks extension capture on browser-native pages such as chrome://, chrome-extension://, and the Chrome Web Store.",
  },
  {
    question: "Can I re-export a past session in a different format?",
    answer:
      "Yes. Open any previous session from the history view and export it again as PDF, Markdown, or HTML without losing your original step names and screenshots.",
  },
];

export const qaCaptureBackLinks: ChromeLinkItem[] = [
  { label: "QA Playground Home", href: "/" },
  { label: "Practice Elements", href: "/practice" },
  { label: "QA Tools", href: "/qa-tools" },
  { label: "Study Tracker", href: "/study-tracker" },
];
