import Link from "next/link";

import { JsonLd } from "@/components/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  qaClipperApiKeyHighlights,
  qaClipperBackLinks,
  qaClipperChromeWebStoreUrl,
  qaClipperFaqItems,
  qaClipperFeatures,
  qaClipperHeroBadges,
  qaClipperHeroStats,
  qaClipperHowItWorks,
  qaClipperResourceTypes,
  qaClipperUseCases,
} from "@/data/chrome/qa-clipper-page-data";
import { qaClipperPageMetadata } from "@/data/meta-data/chrome/qa-clipper-page-meta-data";
import {
  qaClipperBreadcrumbJsonLd,
  qaClipperFaqJsonLd,
  qaClipperWebPageJsonLd,
} from "@/data/meta-data/chrome/qa-clipper-structured-jsonld-data";
import {
  chromeIconMap,
  chromeToneClasses,
} from "../_shared/chrome-page-helpers";

export const metadata = qaClipperPageMetadata;

export default function QAClipperPage() {
  const ArrowRightIcon = chromeIconMap["arrow-right"];
  const BookmarkIcon = chromeIconMap.bookmark;
  const CheckCircleIcon = chromeIconMap["check-circle"];
  const ChromeIcon = chromeIconMap.chrome;
  const ExternalLinkIcon = chromeIconMap["external-link"];
  const LogInIcon = chromeIconMap["log-in"];
  const SettingsIcon = chromeIconMap.settings;
  const UserCheckIcon = chromeIconMap["user-check"];

  return (
    <>
      <JsonLd data={qaClipperWebPageJsonLd} />
      <JsonLd data={qaClipperBreadcrumbJsonLd} />
      <JsonLd data={qaClipperFaqJsonLd} />

      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] dark:opacity-[0.06]" />

          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              {qaClipperHeroBadges.map(({ icon, label, tone }) => {
                const Icon = chromeIconMap[icon];
                const toneClasses = chromeToneClasses[tone];

                return (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase ${toneClasses.bg} ${toneClasses.text} ${toneClasses.border}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                );
              })}
            </div>

            <h1 className="mb-5 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="gradient-title">QA Playground Clipper</span>
              <br />
              <span className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                Clip Any Webpage to Your Study Tracker
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Spot a great testing article, Playwright tutorial, or automation
              course and clip it directly to your{" "}
              <span className="font-semibold text-foreground">
                QA Playground Study Tracker
              </span>{" "}
              without breaking your flow.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={qaClipperChromeWebStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <ChromeIcon className="h-5 w-5" />
                Add to Chrome - It&apos;s Free
                <ExternalLinkIcon className="h-4 w-4 opacity-70" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted/80"
              >
                See How It Works
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-4">
              {qaClipperHeroStats.map(({ value, label }) => (
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

        <section id="how-it-works" className="bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Simple Setup
              </p>
              <h2 className="mb-3 text-3xl font-bold text-foreground">
                How It Works
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                From install to your first clip in four steps. This extension
                connects directly to a free QA Playground account.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {qaClipperHowItWorks.map(({ step, title, description, tone }) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <div
                    className={`${chromeToneClasses[tone].solid} flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-xs font-extrabold text-white`}
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

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
              <UserCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="mb-0.5 text-sm font-semibold text-amber-800 dark:text-amber-300">
                  Free Account Required
                </p>
                <p className="text-sm leading-relaxed text-amber-700 dark:text-amber-400">
                  The extension connects directly to your personal Study Tracker
                  by API key, so you will need a free QA Playground account to
                  generate that key.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                Every feature is designed to help you build a personal learning
                library without ever leaving the page you are reading.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {qaClipperFeatures.map(({ icon, title, description, tone }) => {
                const Icon = chromeIconMap[icon];
                const toneClasses = chromeToneClasses[tone];

                return (
                  <div
                    key={title}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className={`${toneClasses.bg} ${toneClasses.text} mb-4 flex h-10 w-10 items-center justify-center rounded-lg`}
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
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Smart Detection
              </p>
              <h2 className="mb-3 text-3xl font-bold text-foreground">
                Auto-Detected Resource Types
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                The extension reads the current page and URL to identify what
                you are saving, while still letting you override the type before
                submission.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {qaClipperResourceTypes.map(
                ({ icon, label, tone, description, items }) => {
                  const Icon = chromeIconMap[icon];
                  const toneClasses = chromeToneClasses[tone];

                  return (
                    <div
                      key={label}
                      className={`rounded-xl border bg-card p-6 shadow-sm ${toneClasses.border}`}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className={`${toneClasses.bg} ${toneClasses.text} flex h-10 w-10 items-center justify-center rounded-lg`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${toneClasses.badge} ${toneClasses.border}`}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                      <ul className="space-y-1">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <CheckCircleIcon className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                },
              )}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Everything else defaults to{" "}
              <span className="font-semibold text-foreground">ARTICLE</span>.
              You can still change it to BOOK or OTHER before saving.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  API Key Setup
                </p>
                <h2 className="mb-4 text-3xl leading-tight font-bold text-foreground">
                  Your Key.
                  <br />
                  Your Data.
                </h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  QA Playground Clipper talks to your account through a personal
                  API key you generate inside the Study Tracker. Paste it once,
                  then clip resources straight into your library.
                </p>
                <ul className="space-y-3">
                  {qaClipperApiKeyHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Extension Settings
                  </span>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Your Name
                    </label>
                    <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">
                      Jane QA Engineer
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      API Key
                    </label>
                    <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 font-mono text-sm tracking-wide text-muted-foreground">
                      qapg_********************
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30">
                    <CheckCircleIcon className="h-4 w-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        Connected
                      </p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400">
                        Signed in as Jane QA Engineer
                      </p>
                    </div>
                  </div>
                  <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                    Test Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              {qaClipperUseCases.map(({ icon, title, description, tone }) => {
                const Icon = chromeIconMap[icon];

                return (
                  <div
                    key={title}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${chromeToneClasses[tone].text}`}
                      />
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
                );
              })}
            </div>
          </div>
        </section>

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

            <Accordion defaultValue={[]} className="w-full space-y-2">
              {qaClipperFaqItems.map(({ question, answer }) => (
                <AccordionItem
                  key={question}
                  value={question}
                  className="rounded-xl border border-border bg-card px-5 transition-colors data-[state=open]:border-blue-300 dark:data-[state=open]:border-blue-700"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-10 text-white shadow-xl">
              <BookmarkIcon className="mx-auto mb-4 h-10 w-10 opacity-90" />
              <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl">
                Start Clipping in Minutes
              </h2>
              <p className="mx-auto mb-7 max-w-md leading-relaxed text-blue-100">
                Install the extension, connect your API key, and clip your first
                resource. Your QA learning library starts building itself as you
                browse.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={qaClipperChromeWebStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
                >
                  <ChromeIcon className="h-5 w-5" />
                  Add to Chrome - Free
                  <ExternalLinkIcon className="h-4 w-4 opacity-60" />
                </a>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/20"
                >
                  <LogInIcon className="h-4 w-4" />
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-border px-4 py-6">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4 text-sm">
            {qaClipperBackLinks.map((link, index) => (
              <div key={link.href} className="contents">
                {index === 0 ? (
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    ← {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )}
                {index < qaClipperBackLinks.length - 1 ? (
                  <span className="text-border">|</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
