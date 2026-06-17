import Link from "next/link";
import {
  Camera,
  Download,
  FileText,
  History,
  Tag,
  CheckCircle,
  ArrowRight,
  Layers,
  Clock,
  BookOpen,
  Zap,
  ExternalLink,
  FileImage,
  Code2,
  Globe,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata = {
  title:
    "QA Capture — Chrome Extension for Continuous Screenshot Documentation",
  description:
    "QA Capture is a free Chrome extension that lets QA engineers capture screenshots continuously, name each step, and export sessions as PDF, Markdown, or HTML. Perfect for documenting test flows and bug reports.",
  keywords: [
    "QA screenshot tool",
    "Chrome extension screenshot",
    "continuous screenshot capture",
    "QA documentation tool",
    "export screenshots to PDF",
    "screenshot to markdown",
    "bug report screenshots",
    "QA process documentation",
    "test step screenshots",
    "QA engineer tools",
  ],
  openGraph: {
    title: "QA Capture — Chrome Extension for Screenshot Documentation",
    description:
      "Capture screenshots continuously, name each step, and export your QA sessions as PDF, Markdown, or HTML. Free Chrome extension for QA engineers.",
    type: "website",
    url: "https://www.qaplayground.com/chrome",
    siteName: "QA PlayGround",
  },
  twitter: {
    card: "summary_large_image",
    title: "QA Capture — Free Chrome Extension for QA Engineers",
    description:
      "Capture, name, and export test flow screenshots as PDF, Markdown, or HTML. Free Chrome extension.",
    site: "@qaplayground",
  },
  alternates: {
    canonical: "https://www.qaplayground.com/chrome",
  },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Camera,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    title: "Continuous Screenshot Capture",
    description:
      "Click once to start a session and capture as many screenshots as you need. Every capture is timestamped and stored in the current session automatically.",
  },
  {
    icon: Tag,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    title: "Name Each Step",
    description:
      "Label every screenshot with a descriptive step name — 'Login Page', 'Error on Submit', 'After API Response'. Makes exported documents readable without extra editing.",
  },
  {
    icon: Download,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    title: "Export in 3 Formats",
    description:
      "Export your session as a PDF report, a Markdown file ready for GitHub or Confluence, or a standalone HTML file you can open anywhere without internet.",
  },
  {
    icon: History,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    title: "Session History",
    description:
      "Every capture session is saved locally. Browse previous sessions by date, reopen them, add more screenshots, or re-export them in a different format anytime.",
  },
  {
    icon: Zap,
    color: "text-yellow-600",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    title: "One-Click Workflow",
    description:
      "Pin the extension icon — click to capture, type a name, move on. No popups, no configuration, no slowdowns. Designed to stay out of your way while you test.",
  },
  {
    icon: Layers,
    color: "text-slate-600",
    bg: "bg-slate-100 dark:bg-slate-800/40",
    title: "Full-Page & Viewport Capture",
    description:
      "Capture only the visible viewport for quick step documentation, or enable full-page mode to capture long scrollable pages in one shot for thorough bug reports.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    color: "bg-blue-600",
    title: "Install & Pin the Extension",
    description:
      "Install QA Capture from the Chrome Web Store. Pin it to your toolbar for one-click access while testing.",
  },
  {
    step: "02",
    color: "bg-violet-600",
    title: "Start a Session",
    description:
      "Click the extension icon and hit 'New Session'. Give it a name like 'Login Flow Bug' or 'Checkout Regression'. Your session is ready.",
  },
  {
    step: "03",
    color: "bg-emerald-600",
    title: "Capture & Name Each Step",
    description:
      "Navigate your test flow. Click 'Capture' at each important step and type a step name. Each screenshot is saved instantly — no upload, fully local.",
  },
  {
    step: "04",
    color: "bg-orange-600",
    title: "Export Your Session",
    description:
      "When done, hit Export and choose PDF, Markdown, or HTML. Your complete step-by-step documentation is ready to share with your team or attach to a Jira ticket.",
  },
];

const EXPORT_FORMATS = [
  {
    icon: FileImage,
    label: "PDF",
    color: "text-red-600",
    border: "border-red-200 dark:border-red-800",
    bg: "bg-red-50 dark:bg-red-950/30",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    description:
      "Professional report layout. One screenshot per page with step name, timestamp, and session metadata. Ready to attach to tickets or emails.",
    useCases: ["Bug reports", "Stakeholder sign-off", "Email attachments"],
  },
  {
    icon: Code2,
    label: "Markdown",
    color: "text-violet-600",
    border: "border-violet-200 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    description:
      "GitHub-flavoured Markdown with base64 inline images. Paste straight into a GitHub issue, Confluence page, or Notion doc — no image hosting needed.",
    useCases: ["GitHub Issues", "Confluence docs", "Notion pages"],
  },
  {
    icon: Globe,
    label: "HTML",
    color: "text-blue-600",
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    description:
      "Standalone HTML file with all images embedded. Open in any browser offline, share as a single file, or host on any static server.",
    useCases: ["Offline sharing", "Static hosting", "Team archives"],
  },
];

const USE_CASES = [
  {
    icon: CheckCircle,
    color: "text-emerald-600",
    title: "Document a Bug Step-by-Step",
    description:
      "Reproduce the bug, capture each click and error state with a label, export as PDF, and attach directly to your Jira ticket. Zero manual editing required.",
  },
  {
    icon: BookOpen,
    color: "text-blue-600",
    title: "Write Test Case Documentation",
    description:
      "Walk through a test case in your browser, name each step screenshot, and export as Markdown. Instant living documentation that always matches the current UI.",
  },
  {
    icon: Clock,
    color: "text-orange-600",
    title: "Onboard a New QA Engineer",
    description:
      "Capture a complete walkthrough of a complex flow — login, dashboard, edge cases — with named steps and export as HTML. A self-contained guide anyone can open.",
  },
  {
    icon: FileText,
    color: "text-violet-600",
    title: "Regression Testing Evidence",
    description:
      "Capture before-and-after screenshots for regression runs. Session history means you can always pull up last sprint's session and compare side-by-side.",
  },
];

const FAQ = [
  {
    q: "Is QA Capture free to use?",
    a: "Yes — QA Capture is completely free. No subscription, no account required, no usage limits. All screenshots and sessions are stored locally in your browser — nothing is sent to any server.",
  },
  {
    q: "Where are my screenshots and sessions stored?",
    a: "Everything is stored locally in Chrome's extension storage (chrome.storage.local). Your screenshots never leave your device. This means sessions persist across browser restarts but are tied to the browser profile — use the export feature to back up important sessions.",
  },
  {
    q: "How many screenshots can I capture in one session?",
    a: "There is no hard limit enforced by the extension. Very large sessions (100+ full-page screenshots) may be slower to export as PDF due to image size. For long testing sessions, consider splitting into multiple sessions by feature area or flow.",
  },
  {
    q: "Can I edit or delete a screenshot after capturing it?",
    a: "Yes. Inside a session you can rename any step, reorder screenshots, and delete individual captures before exporting. You can also delete an entire session from the history view.",
  },
  {
    q: "Does QA Capture work on all websites?",
    a: "QA Capture works on all standard HTTPS and HTTP pages. It cannot capture screenshots on browser-native pages (chrome://, chrome-extension://, or the Chrome Web Store) due to Chrome's extension security restrictions. All other websites — including local development servers on localhost — work normally.",
  },
  {
    q: "Can I re-export a past session in a different format?",
    a: "Yes. Open any previous session from the history view and use the Export button to choose a different format. The original screenshots and step names are preserved, so you can export the same session as PDF, Markdown, and HTML as many times as you want.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ChromeExtensionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 uppercase dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
              <Globe className="h-3.5 w-3.5" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-700 uppercase dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
              <CheckCircle className="h-3.5 w-3.5" />
              Free Forever
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wider text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              No Account Needed
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="gradient-title">QA Capture</span>
            <br />
            <span className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
              Screenshot Every Test Step
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Continuously capture screenshots during testing, name each step, and
            export your complete session as{" "}
            <span className="font-semibold text-foreground">PDF</span>,{" "}
            <span className="font-semibold text-foreground">Markdown</span>, or{" "}
            <span className="font-semibold text-foreground">HTML</span> — in one
            click.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Globe className="h-5 w-5" />
              Add to Chrome — It&apos;s Free
              <ExternalLink className="h-4 w-4 opacity-70" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted/80"
            >
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-4">
            {[
              { value: "3", label: "Export Formats" },
              { value: "∞", label: "Sessions Stored" },
              { value: "0", label: "Data Sent to Server" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm"
              >
                <div className="text-2xl font-extrabold text-foreground">
                  {value}
                </div>
                <div className="mt-0.5 text-xs leading-tight text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Simple Workflow
            </p>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              From install to exported report in four steps. No configuration,
              no learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {HOW_IT_WORKS.map(({ step, color, title, description }) => (
              <div
                key={step}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div
                  className={`${color} flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-extrabold text-white`}
                >
                  {step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Everything You Need
            </p>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Built for QA Engineers
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Every feature was designed around a real documentation pain point
              QA engineers face daily.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, color, bg, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`${bg} ${color} mb-4 flex h-10 w-10 items-center justify-center rounded-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPORT FORMATS ──────────────────────────────────────────────── */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Export Options
            </p>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Three Formats, One Session
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Export the same session in different formats depending on where
              it&apos;s going — ticket, docs, or archive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {EXPORT_FORMATS.map(
              ({
                icon: Icon,
                label,
                color,
                border,
                bg,
                badge,
                description,
                useCases,
              }) => (
                <div
                  key={label}
                  className={`border bg-card ${border} rounded-xl p-6 shadow-sm`}
                >
                  <div
                    className={`${bg} ${color} mb-4 flex h-11 w-11 items-center justify-center rounded-xl`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`mb-3 inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${badge} ${border}`}
                  >
                    {label}
                  </span>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <ul className="space-y-1">
                    {useCases.map((uc) => (
                      <li
                        key={uc}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SESSION HISTORY ─────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Text */}
            <div>
              <p className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Session History
              </p>
              <h2 className="mb-4 text-3xl leading-tight font-bold text-foreground">
                Every Session Saved.
                <br />
                Nothing Ever Lost.
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                QA Capture stores all your sessions locally in your browser.
                Browse your complete capture history by date — reopen any old
                session, rename steps, add new captures, or re-export in a
                different format.
              </p>
              <ul className="space-y-3">
                {[
                  "Browse sessions by date or custom name",
                  "Reopen and continue any previous session",
                  "Re-export old sessions in PDF, MD, or HTML",
                  "Delete sessions individually to free up space",
                  "All data stored locally — no cloud sync required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual mock */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
              {/* Header bar */}
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Session History
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  3 sessions
                </span>
              </div>
              {/* Session rows */}
              <div className="divide-y divide-border">
                {[
                  {
                    name: "Login Flow — Bug #1204",
                    date: "Today, 2:14 PM",
                    count: 8,
                    badge:
                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                    label: "PDF",
                  },
                  {
                    name: "Checkout Regression",
                    date: "Yesterday, 11:30 AM",
                    count: 14,
                    badge:
                      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
                    label: "MD",
                  },
                  {
                    name: "Dashboard Onboarding Guide",
                    date: "Mar 25, 9:05 AM",
                    count: 11,
                    badge:
                      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    label: "HTML",
                  },
                ].map(({ name, date, count, badge, label }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        {name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {date} · {count} screenshots
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${badge}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ───────────────────────────────────────────────────── */}
      <section className="bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              Real QA Workflows
            </p>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              How QA Engineers Use It
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {USE_CASES.map(({ icon: Icon, color, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 ${color} mt-0.5 flex-shrink-0`} />
                  <div>
                    <h3 className="mb-1.5 font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
              FAQ
            </p>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Common Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {FAQ.map(({ q, a }, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-5 transition-colors data-[state=open]:border-blue-300 dark:data-[state=open]:border-blue-700"
              >
                <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BOTTOM ──────────────────────────────────────────────────── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-10 text-white shadow-xl">
            <Globe className="mx-auto mb-4 h-10 w-10 opacity-90" />
            <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">
              Start Capturing in 30 Seconds
            </h2>
            <p className="mx-auto mb-7 max-w-md leading-relaxed text-blue-100">
              Install QA Capture, pin it to your toolbar, and you&apos;re ready.
              No configuration, no account, no cost.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/jhgkhnokloeklnagbkgkgcfphafifefg?utm_source=item-share-cb"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
            >
              <Globe className="h-5 w-5" />
              Add to Chrome — Free
              <ExternalLink className="h-4 w-4 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BACK LINKS ──────────────────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            ← QA Playground Home
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/practice"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Practice Elements
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/qa-tools"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            QA Tools
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/study-tracker"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Study Tracker
          </Link>
        </div>
      </div>
    </div>
  );
}
