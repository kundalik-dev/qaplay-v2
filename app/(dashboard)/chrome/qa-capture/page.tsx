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
  ArrowRight,
  Camera,
  CheckCircle,
  ChevronRight,
  Download,
  ExternalLink,
  Globe,
  History,
  Layers,
  Tag,
  Zap,
} from "lucide-react";
import Link from "next/link";
import styles from "./qa-capture.module.css";

export const metadata = qaCapturePageMetadata;

const FORMAT_ICONS: Record<string, string> = {
  PDF: "📄",
  Markdown: "📝",
  HTML: "🌐",
};

const FORMAT_GRADIENTS: Record<string, string> = {
  PDF: styles.cardGradientRed,
  Markdown: styles.cardGradientViolet,
  HTML: styles.cardGradientBlue,
};

const FEATURE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  camera: Camera,
  tag: Tag,
  download: Download,
  history: History,
  zap: Zap,
  layers: Layers,
};

export default function QACapturePage() {
  return (
    <>
      <JsonLd data={qaCaptureWebPageJsonLd} />
      <JsonLd data={qaCaptureBreadcrumbJsonLd} />
      <JsonLd data={qaCaptureFaqJsonLd} />

      <div className={styles.page}>
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.heroGlow1} />
            <div className={styles.heroGlow2} />
            <div className={styles.heroGrid} />
          </div>

          <div className={styles.shell}>
            <div className={styles.heroInner}>
              {/* Pill badge */}
              <div className={styles.heroPill}>
                <span className={styles.heroPillDot} />
                Free Chrome Extension &middot; No account needed
              </div>

              <h1 className={styles.heroTitle}>
                Turn browser testing into{" "}
                <span className={styles.heroAccent}>clean proof</span>
              </h1>

              <p className={styles.heroSub}>
                QA Capture stores every screenshot locally, lets you name each
                step, and exports your full session as PDF, Markdown, or HTML —
                instantly, for free.
              </p>

              <div className={styles.heroCtas}>
                <a
                  href={qaCaptureChromeWebStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnPrimary}
                  id="qa-capture-install-cta"
                >
                  <Globe className={styles.btnIcon} />
                  Add to Chrome — Free
                  <ExternalLink className={styles.btnIconSm} />
                </a>
                <a href="#how-it-works" className={styles.btnGhost}>
                  See how it works
                  <ArrowRight className={styles.btnIcon} />
                </a>
              </div>

              {/* Stats strip */}
              <div className={styles.statsRow}>
                {qaCaptureHeroStats.map(({ value, label }) => (
                  <div key={label} className={styles.statItem}>
                    <span className={styles.statValue}>{value}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ───────────────────────────────────── */}
        <section id="how-it-works" className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionLabel}>How it works</div>
            <h2 className={styles.sectionTitle}>
              Three steps. Zero friction.
            </h2>
            <p className={styles.sectionSub}>
              Capture → Label → Export. That&apos;s the entire workflow.
            </p>

            <div className={styles.stepsGrid}>
              {[
                {
                  num: "01",
                  icon: Camera,
                  title: "Capture the exact state",
                  desc: "One click freezes the moment — bug, form state, API response, or milestone.",
                  color: styles.stepBlue,
                },
                {
                  num: "02",
                  icon: Tag,
                  title: "Name every screenshot",
                  desc: "Add descriptive labels so anyone can follow the flow without re-running the test.",
                  color: styles.stepViolet,
                },
                {
                  num: "03",
                  icon: Download,
                  title: "Export & share",
                  desc: "Export as PDF for tickets, Markdown for docs, or HTML for offline sharing.",
                  color: styles.stepEmerald,
                },
              ].map(({ num, icon: Icon, title, desc, color }) => (
                <div key={num} className={`${styles.stepCard} ${color}`}>
                  <div className={styles.stepNum}>{num}</div>
                  <div className={styles.stepIconWrap}>
                    <Icon className={styles.stepIcon} />
                  </div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.shell}>
            <div className={styles.sectionLabel}>Built for QA engineers</div>
            <h2 className={styles.sectionTitle}>
              Features that make screenshots work harder
            </h2>

            <div className={styles.featuresGrid}>
              {qaCaptureFeatures.map((f) => {
                const Icon = FEATURE_ICON_MAP[f.icon] ?? Camera;
                return (
                  <article key={f.title} className={styles.featureCard}>
                    <div className={`${styles.featureIconWrap} ${styles[`tone_${f.tone}`]}`}>
                      <Icon className={styles.featureIcon} />
                    </div>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── USE CASES ───────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.sectionLabel}>Real QA workflows</div>
            <h2 className={styles.sectionTitle}>
              Where QA Capture fits in your day
            </h2>

            <div className={styles.useCasesGrid}>
              {qaCaptureUseCases.map((uc) => (
                <article key={uc.title} className={styles.useCaseCard}>
                  <ChevronRight className={styles.useCaseArrow} />
                  <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                  <p className={styles.useCaseDesc}>{uc.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPORT FORMATS ──────────────────────────────────── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.shell}>
            <div className={styles.sectionLabel}>Export options</div>
            <h2 className={styles.sectionTitle}>
              One session → three formats
            </h2>
            <p className={styles.sectionSub}>
              Same capture. Whatever format your workflow needs.
            </p>

            <div className={styles.formatsGrid}>
              {qaCaptureExportFormats.map((fmt) => (
                <article
                  key={fmt.label}
                  className={`${styles.formatCard} ${FORMAT_GRADIENTS[fmt.label] ?? ""}`}
                >
                  <div className={styles.formatEmoji}>{FORMAT_ICONS[fmt.label] ?? "📁"}</div>
                  <div className={styles.formatLabel}>{fmt.label}</div>
                  <p className={styles.formatDesc}>{fmt.description}</p>
                  <ul className={styles.formatItems}>
                    {fmt.items.map((item) => (
                      <li key={item} className={styles.formatItem}>
                        <CheckCircle className={styles.formatCheck} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SESSION HISTORY ─────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.shell}>
            <div className={styles.historyLayout}>
              <div className={styles.historyLeft}>
                <div className={styles.sectionLabel}>Session history</div>
                <h2 className={styles.sectionTitle}>
                  Every capture stays reusable
                </h2>
                <p className={styles.sectionSub}>
                  Sessions are stored locally and can be reopened, refined, and
                  re-exported whenever you need them.
                </p>
                <ul className={styles.historyList}>
                  {qaCaptureSessionHistoryHighlights.map((item) => (
                    <li key={item} className={styles.historyItem}>
                      <CheckCircle className={styles.historyCheck} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.historyRight}>
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <span className={styles.previewDot} style={{ background: "#ff5f56" }} />
                    <span className={styles.previewDot} style={{ background: "#ffbd2e" }} />
                    <span className={styles.previewDot} style={{ background: "#27c93f" }} />
                    <span className={styles.previewTitle}>Session History</span>
                  </div>
                  {qaCaptureSessionHistoryPreview.map((s, i) => (
                    <div key={s.name} className={`${styles.previewRow} ${i === 0 ? styles.previewRowActive : ""}`}>
                      <div className={styles.previewRowLeft}>
                        <div className={styles.previewSessionIcon}>
                          <Camera className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className={styles.previewSessionName}>{s.name}</p>
                          <p className={styles.previewSessionMeta}>{s.date} &middot; {s.count} screenshots</p>
                        </div>
                      </div>
                      <span className={`${styles.previewBadge} ${styles[`badge_${s.tone}`]}`}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.shell}>
            <div className={styles.sectionLabel}>FAQ</div>
            <h2 className={styles.sectionTitle}>Common questions</h2>
            <p className={styles.sectionSub}>
              Everything you need to know before you install.
            </p>

            <div className={styles.faqWrap}>
              <Accordion defaultValue={[]} className={styles.faqAccordion}>
                {qaCaptureFaqItems.map(({ question, answer }) => (
                  <AccordionItem
                    key={question}
                    value={question}
                    className={styles.faqItem}
                  >
                    <AccordionTrigger className={styles.faqTrigger}>
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className={styles.faqAnswer}>
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBg} aria-hidden="true">
            <div className={styles.ctaGlow} />
          </div>
          <div className={styles.shell}>
            <div className={styles.ctaInner}>
              <div className={styles.ctaLabel}>Start today</div>
              <h2 className={styles.ctaTitle}>
                Give every bug report a cleaner story
              </h2>
              <p className={styles.ctaSub}>
                Install QA Capture, pin it in Chrome, and build reusable visual
                documentation while you test — not after the context is gone.
              </p>
              <div className={styles.ctaButtons}>
                <a
                  href={qaCaptureChromeWebStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnPrimary}
                  id="qa-capture-final-cta"
                >
                  <Globe className={styles.btnIcon} />
                  Add to Chrome — It&apos;s Free
                  <ExternalLink className={styles.btnIconSm} />
                </a>
                <a href="#how-it-works" className={styles.btnGhost}>
                  See how it works
                  <ArrowRight className={styles.btnIcon} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER NAV ──────────────────────────────────────── */}
        <footer className={styles.footer}>
          <div className={styles.shell}>
            <nav className={styles.footerNav} aria-label="Related pages">
              {qaCaptureBackLinks.map(({ label, href }) => (
                <Link key={href} href={href} className={styles.footerLink}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
