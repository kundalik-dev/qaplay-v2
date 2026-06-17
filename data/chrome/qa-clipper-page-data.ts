import type {
  ChromeBadge,
  ChromeFaqItem,
  ChromeFeature,
  ChromeFormatCard,
  ChromeLinkItem,
  ChromeStat,
  ChromeStep,
  ChromeUseCase,
} from "./types";

export const qaClipperPageTitle =
  "QA Playground Clipper Chrome Extension for Study Tracker";

export const qaClipperPageDescription =
  "QA Playground Clipper is a free Chrome extension that lets QA engineers clip articles, videos, courses, and docs directly into their Study Tracker with one click.";

export const qaClipperChromeWebStoreUrl =
  "https://chromewebstore.google.com/detail/jegdkegbomfbmhhimfjgacdblcoodfpd?utm_source=item-share-cb";

export const qaClipperHeroBadges: ChromeBadge[] = [
  { icon: "chrome", label: "Chrome Extension", tone: "blue" },
  { icon: "check-circle", label: "Free to Install", tone: "emerald" },
  {
    icon: "bookmark",
    label: "Study Tracker Connected",
    tone: "violet",
  },
];

export const qaClipperHeroStats: ChromeStat[] = [
  { value: "7", label: "Resource Types" },
  { value: "1", label: "Click to Clip" },
  { value: "0", label: "Third-Party Cloud" },
];

export const qaClipperFeatures: ChromeFeature[] = [
  {
    icon: "zap",
    tone: "blue",
    title: "One-Click Clip",
    description:
      "Click the extension icon on any tab and your resource is ready to save. Title, description, and image are auto-extracted without copy-pasting.",
  },
  {
    icon: "globe",
    tone: "violet",
    title: "Smart Resource Type Detection",
    description:
      "The extension detects VIDEO, TOOL, COURSE, and DOCUMENTATION patterns automatically, while still letting you override the result before saving.",
  },
  {
    icon: "tag",
    tone: "emerald",
    title: "Review and Edit Before Saving",
    description:
      "Edit the title, type, description, tags, and image URL before saving so your library stays clean and searchable.",
  },
  {
    icon: "key",
    tone: "orange",
    title: "API Key Connection",
    description:
      "Use your personal qapg_ API key from the Study Tracker so clips save directly into your account with no sync delay.",
  },
  {
    icon: "settings",
    tone: "slate",
    title: "Settings with Connection Test",
    description:
      "Store your name and API key once, then use Test Connection to confirm the extension is linked to the correct account.",
  },
  {
    icon: "shield-check",
    tone: "teal",
    title: "Privacy First",
    description:
      "Your API key stays in chrome.storage.local and is sent only to the QA Playground API when you save a resource.",
  },
];

export const qaClipperHowItWorks: ChromeStep[] = [
  {
    step: "01",
    tone: "blue",
    title: "Install and Sign In",
    description:
      "Install QA Playground Clipper from the Chrome Web Store, then sign in or create a free account on qaplayground.com.",
  },
  {
    step: "02",
    tone: "violet",
    title: "Generate Your API Key",
    description:
      "Open Study Tracker, go to Resources, then create an API key that starts with qapg_ and copy it.",
  },
  {
    step: "03",
    tone: "emerald",
    title: "Paste the Key into the Extension",
    description:
      "Open Settings in the extension, paste the key, and run Test Connection so you know the extension is linked before clipping.",
  },
  {
    step: "04",
    tone: "orange",
    title: "Clip Anything Instantly",
    description:
      "Open any article, course, video, or doc page, review the auto-filled fields, add tags, and save it directly to your tracker.",
  },
];

export const qaClipperResourceTypes: ChromeFormatCard[] = [
  {
    icon: "video",
    label: "VIDEO",
    tone: "red",
    description:
      "YouTube, Vimeo, and other video platforms are recognized automatically so tutorials and talks land in the right bucket.",
    items: ["YouTube", "Vimeo", "Loom"],
  },
  {
    icon: "book-open",
    label: "COURSE",
    tone: "violet",
    description:
      "Course platforms such as Udemy and Coursera are saved as COURSE resources, which helps keep your learning roadmap organized.",
    items: ["Udemy", "Coursera", "Pluralsight", "Frontend Masters"],
  },
  {
    icon: "code-2",
    label: "TOOL",
    tone: "slate",
    description:
      "GitHub repositories and tool pages are detected as TOOL resources so frameworks and utilities stay grouped together.",
    items: ["GitHub", "npm", "PyPI"],
  },
  {
    icon: "file-text",
    label: "DOCUMENTATION",
    tone: "blue",
    description:
      "Documentation-style URLs are auto-tagged so official references from Playwright, Selenium, and Cypress stay easy to find later.",
    items: ["Playwright Docs", "Selenium Docs", "Cypress Docs"],
  },
];

export const qaClipperApiKeyHighlights = [
  "API keys start with qapg_ for easy identification",
  "Stored only in chrome.storage.local on your device",
  "Test Connection validates the key before clipping starts",
  "Keys can be revoked and regenerated at any time",
  "Nothing is sent anywhere except qaplayground.com",
];

export const qaClipperUseCases: ChromeUseCase[] = [
  {
    icon: "check-circle",
    tone: "emerald",
    title: "Build Your QA Learning Library",
    description:
      "Clip useful Selenium, Playwright, or Cypress resources the moment you find them so your Study Tracker becomes your long-term reference library.",
  },
  {
    icon: "book-open",
    tone: "blue",
    title: "Curate a Tag-Based Reference System",
    description:
      "Tag every saved resource with topics like selenium, api-testing, or ci-cd so the right material is easy to surface later.",
  },
  {
    icon: "video",
    tone: "red",
    title: "Save Videos for Later Instead of Leaving Tabs Open",
    description:
      "Clip tutorials and course pages to your tracker so you can close the tab and return when you are ready to learn.",
  },
  {
    icon: "globe",
    tone: "violet",
    title: "Never Lose a Great Doc Page Again",
    description:
      "Clip valuable API references and setup guides into the Documentation bucket so they stay searchable and accessible forever.",
  },
];

export const qaClipperFaqItems: ChromeFaqItem[] = [
  {
    question: "Do I need a QA Playground account to use this extension?",
    answer:
      "Yes. A free QA Playground account is required because the extension saves resources directly into your Study Tracker through the API.",
  },
  {
    question: "Where do I get my API key?",
    answer:
      "Sign in to QA Playground, open Study Tracker, then go to the Resources settings or API Keys area and generate a key that starts with qapg_.",
  },
  {
    question: "Is the API key stored securely?",
    answer:
      "Yes. The key is stored in chrome.storage.local, isolated from page scripts, and used only when the extension talks to the QA Playground API.",
  },
  {
    question: "Can I edit the auto-detected fields before saving?",
    answer:
      "Yes. The auto-filled title, description, type, tags, and image URL are all editable before you save the resource.",
  },
  {
    question: "What happens if the extension cannot detect the resource type?",
    answer:
      "It falls back to ARTICLE. You can still switch it manually to VIDEO, COURSE, TOOL, DOCUMENTATION, BOOK, or OTHER before saving.",
  },
  {
    question: "Where do my clipped resources appear?",
    answer:
      "They appear immediately in the Resources section of your QA Playground Study Tracker without any background sync delay.",
  },
  {
    question: "Does this work on all websites?",
    answer:
      "It works on normal HTTP and HTTPS pages, including localhost. Chrome blocks the extension on browser-native pages such as chrome:// and the Chrome Web Store.",
  },
];

export const qaClipperBackLinks: ChromeLinkItem[] = [
  { label: "QA Playground Home", href: "/" },
  { label: "Study Tracker", href: "/study-tracker" },
  { label: "QA Capture Extension", href: "/chrome/qa-capture" },
  { label: "QA Tools", href: "/qa-tools" },
];
