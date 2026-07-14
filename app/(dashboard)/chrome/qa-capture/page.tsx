import { JsonLd } from "@/components/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  qaCaptureBackLinks,
  qaCaptureChromeWebStoreUrl,
  qaCaptureExportFormats,
  qaCaptureFaqItems,
  qaCaptureFeatures,
  qaCaptureHeroBadges,
  qaCaptureHeroStats,
  qaCaptureSessionHistoryHighlights,
  qaCaptureSessionHistoryPreview,
  qaCaptureUseCases,
} from "@/data/chrome/qa-capture-page-data";
import { qaCapturePageMetadata } from "@/data/meta-data/chrome/qa-capture-page-meta-data";
import {
  qaCaptureBreadcrumbJsonLd,
  qaCaptureFaqJsonLd,
  qaCaptureWebPageJsonLd,
} from "@/data/meta-data/chrome/qa-capture-structured-jsonld-data";

import {
  BadgeRow,
  CtaLink,
  ExportFormatCard,
  FeatureCard,
  FooterLinks,
  SectionHeading,
  SessionPreviewCard,
  StatGrid,
  UseCaseCard,
} from "./components";
import { chromeIconMap } from "../_shared/chrome-page-helpers";

export const metadata = qaCapturePageMetadata;

export default function QACapturePage() {
  const ArrowRightIcon = chromeIconMap["arrow-right"];
  const CameraIcon = chromeIconMap.camera;
  const CheckCircleIcon = chromeIconMap["check-circle"];
  const DownloadIcon = chromeIconMap.download;
  const ExternalLinkIcon = chromeIconMap["external-link"];
  const GlobeIcon = chromeIconMap.globe;
  const TagIcon = chromeIconMap.tag;

  return (
    <>
      <JsonLd data={qaCaptureWebPageJsonLd} />
      <JsonLd data={qaCaptureBreadcrumbJsonLd} />
      <JsonLd data={qaCaptureFaqJsonLd} />

      <div className="capture-page min-h-screen pb-12">
        {/* hero section */}
        <section className="capture-grid relative border-b border-border/80">
          <div className="capture-shell relative z-10 py-20 sm:py-24 lg:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center">
              <BadgeRow badges={qaCaptureHeroBadges} />

              <div className="space-y-6">
                <p className="capture-kicker">Capture · Label · Export</p>
                <h1 className="font-heading text-5xl font-bold leading-[var(--home-type-hero-line)] tracking-[var(--home-type-hero-tracking)] text-balance text-foreground md:text-6xl">
                  QA Capture turns browser testing into clean, export-ready proof.
                </h1>
                <p className="capture-copy mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                  QA Capture stores every screenshot locally while you test,
                  lets you name each step as you capture it, and exports the
                  full session as HTML, Markdown, or PDF. It is free to use
                  and built for bug reports, regression evidence, and
                  repeatable QA documentation.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                <CtaLink
                  href={qaCaptureChromeWebStoreUrl}
                  iconStart={<GlobeIcon className="h-5 w-5" />}
                  iconEnd={<ExternalLinkIcon className="h-4 w-4 opacity-70" />}
                >
                  Add to Chrome - Free
                </CtaLink>
                <CtaLink
                  href="#how-it-works"
                  variant="secondary"
                  iconEnd={<ArrowRightIcon className="h-4 w-4" />}
                >
                  See how it works
                </CtaLink>
              </div>

              <div className="mt-8 pt-8">
                <StatGrid stats={qaCaptureHeroStats} />
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Preview (How it works) */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-title"
          className="py-20 sm:py-24"
        >
          <div className="capture-shell">
            <SectionHeading
              id="how-it-works-title"
              eyebrow="Workflow"
              title="Capture, Label & Export"
              description="A seamless workflow to document your testing sessions."
              align="center"
              className="mb-12 sm:mb-16"
            />
            
            <div className="grid gap-8 md:grid-cols-3">
               {[
                    {
                      step: "01",
                      Icon: CameraIcon,
                      title: "Capture the exact state",
                      description:
                        "Freeze the moment a bug appears, a form validates, or a flow reaches a key checkpoint.",
                    },
                    {
                      step: "02",
                      Icon: TagIcon,
                      title: "Name every screenshot",
                      description:
                        "Add step labels that explain what the developer or reviewer is looking at without extra back-and-forth.",
                    },
                    {
                      step: "03",
                      Icon: DownloadIcon,
                      title: "Export once the session is done",
                      description:
                        "Export the finished session as HTML, Markdown, or PDF for tickets, docs, sign-off, or handoff.",
                    },
                  ].map(({ step, Icon, title, description }) => (
                    <div
                      key={step}
                      className="flex flex-col items-center rounded-[var(--home-card-radius-lg)] border border-border bg-card p-8 text-center shadow-[var(--home-card-shadow)]"
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                          Step {step}
                        </div>
                        <h3 className="mb-3 font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
                          {title}
                        </h3>
                        <p className="text-base leading-7 text-muted-foreground">
                          {description}
                        </p>
                    </div>
               ))}
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-[22px] border border-primary/20 bg-primary/5 px-8 py-6 text-center">
              <p className="text-base leading-7 text-muted-foreground">
                Everything stays <span className="font-semibold text-foreground">local</span>, remains <span className="font-semibold text-foreground">free to use</span>, and works best for <span className="font-semibold text-foreground">bug reports</span>, <span className="font-semibold text-foreground">regression evidence</span>, and <span className="font-semibold text-foreground">reusable walkthroughs</span> that should not be recreated from scratch every sprint.
              </p>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section
          aria-labelledby="qa-capture-use-cases-title"
          className="border-y border-border/70 bg-muted/20 py-16 sm:py-20"
        >
          <div className="capture-shell">
            <SectionHeading
              id="qa-capture-use-cases-title"
              eyebrow="Real QA workflows"
              title="Where QA Capture fits into day-to-day testing work."
              description="The extension is especially useful when evidence needs to be clear, sequential, and easy for someone else to understand fast."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {qaCaptureUseCases.map((useCase) => (
                <UseCaseCard key={useCase.title} {...useCase} />
              ))}
            </div>
          </div>
        </section>

        {/* Built for qa engineers */}
        <section
          aria-labelledby="qa-capture-features-title"
          className="py-20 sm:py-24"
        >
          <div className="capture-shell">
            <SectionHeading
              id="qa-capture-features-title"
              eyebrow="Built for QA engineers"
              title="Features that make screenshots usable, not just collectable."
              description="The page, the export, and the session history are all designed around how QA teams explain issues and share evidence."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {qaCaptureFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Export Options */}
        <section
          aria-labelledby="qa-capture-export-title"
          className="border-y border-border/70 bg-muted/20 py-20 sm:py-24"
        >
          <div className="capture-shell">
            <SectionHeading
              id="qa-capture-export-title"
              eyebrow="Export options"
              title="One session, three output formats, zero duplicate work."
              description="Use the same capture session wherever it needs to go next: bug tickets, internal docs, team archives, or stakeholder review."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {qaCaptureExportFormats.map((format) => (
                <ExportFormatCard key={format.label} {...format} />
              ))}
            </div>
          </div>
        </section>

        {/* Session history */}
        <section
          aria-labelledby="qa-capture-history-title"
          className="py-20 sm:py-24"
        >
          <div className="capture-shell">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="capture-card p-6 sm:p-8">
                <SectionHeading
                  id="qa-capture-history-title"
                  eyebrow="Session history"
                  title="Your captures stay reusable long after the first export."
                  description="QA Capture stores sessions locally so you can reopen them, refine them, and export again when a bug comes back or a teammate needs context."
                  className="max-w-none"
                />

                <ul className="mt-8 space-y-4">
                  {qaCaptureSessionHistoryHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-base leading-7 text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <SessionPreviewCard sessions={qaCaptureSessionHistoryPreview} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="qa-capture-faq-title"
          className="py-20 sm:py-24"
        >
          <div className="capture-shell">
            <SectionHeading
              id="qa-capture-faq-title"
              eyebrow="FAQ"
              title="Common questions before you install QA Capture."
              description="Short answers on pricing, storage, limits, and how the extension behaves on real websites."
              align="center"
              className="mb-10 sm:mb-12"
            />

            <div className="mx-auto max-w-4xl">
              <Accordion defaultValue={[]} className="space-y-3">
                {qaCaptureFaqItems.map(({ question, answer }) => (
                  <AccordionItem
                    key={question}
                    value={question}
                    className="capture-card overflow-hidden px-5 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="py-5 text-left font-heading text-lg font-semibold tracking-[-0.03em] text-foreground hover:no-underline">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-7 text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          aria-labelledby="qa-capture-cta-title"
          className="pt-4 pb-16 sm:pb-20"
        >
          <div className="capture-shell">
            <div className="capture-card-strong px-6 py-8 text-center sm:px-10 sm:py-12">
              <div className="mx-auto max-w-3xl">
                <p className="capture-kicker">Start capturing today</p>
                <h2
                  id="qa-capture-cta-title"
                  className="mt-4 font-heading text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] font-bold tracking-[-0.05em] text-balance text-foreground"
                >
                  Give every bug report and test walkthrough a cleaner story.
                </h2>
                <p className="capture-copy mx-auto mt-5 max-w-2xl text-pretty">
                  Install QA Capture, pin it in Chrome, and start building
                  reusable visual documentation while you test instead of after
                  the context is already gone.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <CtaLink
                    href={qaCaptureChromeWebStoreUrl}
                    iconStart={<GlobeIcon className="h-5 w-5" />}
                    iconEnd={
                      <ExternalLinkIcon className="h-4 w-4 opacity-70" />
                    }
                  >
                    Add to Chrome - It&apos;s Free
                  </CtaLink>
                  <CtaLink
                    href="#qa-capture-use-cases-title"
                    variant="secondary"
                    iconEnd={<ArrowRightIcon className="h-4 w-4" />}
                  >
                    See real workflows
                  </CtaLink>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer nav */}
        <div className="border-t border-border/80 px-4 py-6">
          <div className="capture-shell">
            <FooterLinks links={qaCaptureBackLinks} />
          </div>
        </div>
      </div>
    </>
  );
}
