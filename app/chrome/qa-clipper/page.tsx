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

import { chromeIconMap } from "../_shared/chrome-page-helpers";
import {
  ApiKeyPreview,
  BadgeRow,
  CtaLink,
  FeatureCard,
  FooterLinks,
  ResourceTypeCard,
  SectionHeading,
  StatGrid,
  StepCard,
  UseCaseCard,
} from "./_components";

export const metadata = qaClipperPageMetadata;

export default function QAClipperPage() {
  const ArrowRightIcon = chromeIconMap["arrow-right"];
  const BookmarkIcon = chromeIconMap.bookmark;
  const CheckCircleIcon = chromeIconMap["check-circle"];
  const ExternalLinkIcon = chromeIconMap["external-link"];
  const GlobeIcon = chromeIconMap.globe;
  const LogInIcon = chromeIconMap["log-in"];
  const UserCheckIcon = chromeIconMap["user-check"];

  return (
    <>
      <JsonLd data={qaClipperWebPageJsonLd} />
      <JsonLd data={qaClipperBreadcrumbJsonLd} />
      <JsonLd data={qaClipperFaqJsonLd} />

      <div className="capture-page min-h-screen pb-12">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="capture-grid relative border-b border-border/80">
          <div className="capture-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,32rem)] xl:gap-14">
              {/* Left: text + CTAs */}
              <div className="max-w-[43rem] space-y-8">
                <BadgeRow badges={qaClipperHeroBadges} />

                <div className="space-y-5">
                  <p className="capture-kicker">
                    Chrome extension for QA learning resource management
                  </p>
                  <h1 className="font-heading text-[clamp(1.96rem,3.85vw,3.325rem)] leading-[var(--home-type-hero-line)] font-bold tracking-[var(--home-type-hero-tracking)] text-balance text-foreground">
                    Clip any webpage straight into your QA Study Tracker.
                  </h1>
                  <p className="capture-copy max-w-[39rem] text-pretty">
                    Spot a great testing article, Playwright tutorial, or
                    automation course and save it directly to your QA Playground
                    Study Tracker with one click — no copy-pasting, no lost
                    tabs. Also supports Telegram: send any URL to the bot and it
                    lands in your Resources automatically.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <CtaLink
                    href={qaClipperChromeWebStoreUrl}
                    iconStart={<GlobeIcon className="h-5 w-5" />}
                    iconEnd={
                      <ExternalLinkIcon className="h-4 w-4 opacity-70" />
                    }
                  >
                    Add to Chrome — Free
                  </CtaLink>
                  <CtaLink
                    href="#how-it-works"
                    variant="secondary"
                    iconEnd={<ArrowRightIcon className="h-4 w-4" />}
                  >
                    See how it works
                  </CtaLink>
                </div>

                <StatGrid stats={qaClipperHeroStats} />
              </div>

              {/* Right: clip preview card */}
              <div className="capture-card-strong self-start p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="capture-kicker">Clip Preview</p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      Find it. Clip it. Done.
                    </h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                    <BookmarkIcon className="h-5 w-5" />
                  </div>
                </div>

                <ol className="space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Browse and find a resource",
                      description:
                        "Open any article, tutorial, video, or doc. The extension auto-extracts the title, description, and thumbnail.",
                    },
                    {
                      step: "02",
                      title: "Review and tag before saving",
                      description:
                        "Edit the detected type, add tags like playwright or ci-cd, then hit save — the whole popup takes under ten seconds.",
                    },
                    {
                      step: "03",
                      title: "Find it in your Study Tracker",
                      description:
                        "The resource appears instantly in your QA Playground library, searchable and organised with everything else you have saved.",
                    },
                  ].map((item) => (
                    <li
                      key={item.step}
                      className="capture-card grid grid-cols-[auto_1fr] gap-4 px-5 py-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 rounded-[22px] border border-primary/20 bg-primary/10 px-5 py-4">
                  <p className="text-sm leading-7 text-muted-foreground">
                    Also works via{" "}
                    <span className="font-semibold text-foreground">
                      Telegram
                    </span>{" "}
                    — send any URL to the bot and it saves to your{" "}
                    <span className="font-semibold text-foreground">
                      Resources tab
                    </span>{" "}
                    without opening Chrome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────── */}
        <section
          id="how-it-works"
          aria-labelledby="clipper-how-it-works-title"
          className="border-y border-border/70 bg-muted/20 py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="clipper-how-it-works-title"
              eyebrow="Simple setup"
              title="From install to your first clip in four steps."
              description="The extension connects directly to your free QA Playground account via a personal API key — no third-party sync required."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {qaClipperHowItWorks.map((step) => (
                <StepCard key={step.step} {...step} />
              ))}
            </div>

            {/* Free account callout */}
            <div className="mt-8 flex items-start gap-3 rounded-[22px] border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
              <UserCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="mb-0.5 text-sm font-semibold text-amber-800 dark:text-amber-300">
                  Free Account Required
                </p>
                <p className="text-sm leading-7 text-amber-700 dark:text-amber-400">
                  The extension connects to your Study Tracker through a
                  personal API key, so you will need a free QA Playground
                  account to generate one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section
          aria-labelledby="clipper-features-title"
          className="py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="clipper-features-title"
              eyebrow="Built for QA engineers"
              title="Everything you need to build a personal QA library."
              description="Every feature is designed to help you save, organise, and rediscover the best QA resources without ever leaving the page you are reading."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {qaClipperFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Resource Types ───────────────────────────────────── */}
        <section
          aria-labelledby="clipper-resource-types-title"
          className="border-y border-border/70 bg-muted/20 py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="clipper-resource-types-title"
              eyebrow="Smart detection"
              title="Auto-detected resource types — always editable."
              description="The extension reads the current page and URL to identify what you are saving, while still letting you override the type before you save."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {qaClipperResourceTypes.map((type) => (
                <ResourceTypeCard key={type.label} {...type} />
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Everything else defaults to{" "}
              <span className="font-semibold text-foreground">ARTICLE</span>.
              You can still switch it to BOOK or OTHER before saving.
            </p>
          </div>
        </section>

        {/* ── API Key Setup ────────────────────────────────────── */}
        <section
          aria-labelledby="clipper-api-key-title"
          className="py-16 sm:py-20"
        >
          <div className="capture-shell">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,28rem)] lg:gap-14">
              <div className="space-y-6">
                <SectionHeading
                  id="clipper-api-key-title"
                  eyebrow="API key setup"
                  title="Your key. Your data. Nothing leaves your device."
                  description="QA Playground Clipper talks to your account through a personal API key you generate inside the Study Tracker. Paste it once, then clip resources straight into your library."
                  className="max-w-none"
                />

                <ul className="space-y-4">
                  {qaClipperApiKeyHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-7 text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ApiKeyPreview />
            </div>
          </div>
        </section>

        {/* ── Use Cases ────────────────────────────────────────── */}
        <section
          aria-labelledby="clipper-use-cases-title"
          className="border-y border-border/70 bg-muted/20 py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="clipper-use-cases-title"
              eyebrow="Real QA workflows"
              title="How QA engineers use QA Clipper every day."
              description="From building a learning library to never losing a great doc page again — the extension fits naturally into how QA engineers already browse."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {qaClipperUseCases.map((useCase) => (
                <UseCaseCard key={useCase.title} {...useCase} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="clipper-faq-title"
          className="py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="clipper-faq-title"
              eyebrow="FAQ"
              title="Common questions before you install."
              description="Short answers on accounts, API keys, storage, and what websites the extension works on."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="mx-auto max-w-4xl">
              <Accordion defaultValue={[]} className="space-y-3">
                {qaClipperFaqItems.map(({ question, answer }) => (
                  <AccordionItem
                    key={question}
                    value={question}
                    className="capture-card overflow-hidden px-5 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="py-5 text-left font-heading text-lg font-semibold tracking-[-0.03em] text-foreground hover:no-underline">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="clipper-cta-title"
          className="pt-4 pb-16 sm:pb-20"
        >
          <div className="capture-shell">
            <div className="capture-card-strong px-6 py-8 text-center sm:px-10 sm:py-12">
              <div className="mx-auto max-w-3xl">
                <p className="capture-kicker">Start clipping today</p>
                <h2
                  id="clipper-cta-title"
                  className="mt-4 font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-bold tracking-[-0.05em] text-balance text-foreground"
                >
                  Your QA learning library starts building itself as you browse.
                </h2>
                <p className="capture-copy mx-auto mt-5 max-w-2xl text-pretty">
                  Install QA Clipper, connect your API key, and clip your first
                  resource. Everything you save is instantly searchable in your
                  Study Tracker — no cloud sync, no subscriptions.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <CtaLink
                    href={qaClipperChromeWebStoreUrl}
                    iconStart={<GlobeIcon className="h-5 w-5" />}
                    iconEnd={
                      <ExternalLinkIcon className="h-4 w-4 opacity-70" />
                    }
                  >
                    Add to Chrome — It&apos;s Free
                  </CtaLink>
                  <CtaLink
                    href="/signup"
                    variant="secondary"
                    iconEnd={<LogInIcon className="h-4 w-4" />}
                  >
                    Create Free Account
                  </CtaLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer links ─────────────────────────────────────── */}
        <div className="border-t border-border/80 px-4 py-6">
          <div className="capture-shell">
            <FooterLinks links={qaClipperBackLinks} />
          </div>
        </div>
      </div>
    </>
  );
}
