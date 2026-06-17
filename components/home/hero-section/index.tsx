import { Mic, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ButtonContent } from "@/components/ui/button-components";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

import shared from "../shared/home-shared.module.css";
import styles from "./hero-section.module.css";
import { heroStats } from "@/data/home/hero-section-data";

export function HomeHero() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-hero-title"
      data-testid="home-hero"
      data-section="hero"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className="home-shell">
        <div className={styles.copy}>
          <div className={shared.eyebrow} data-testid="home-hero-eyebrow">
            <span className={shared.eyebrowDot} aria-hidden="true" />
            Free for QA Engineers - 10,000+ Practitioners
          </div>

          <h1 id="home-hero-title" className={styles.title}>
            The Only <br />
            <span className={styles.titleAccent}>Automation </span>
            <br />
            <span className={styles.titleAccent}>Playground </span>
            You <br />
            <span className={cn(styles.titleNowrap, "max-[364px]:text-[44px]")}>
              Need to Practice
            </span>
          </h1>

          <p className={styles.description}>
            Stop Reading. Start Automating. Practice Selenium, Playwright &amp;
            Cypress with 14+ interactive UI elements, demo apps and rehersal
            AI-powered mock interviews.
          </p>

          <ButtonGroup
            variant="home"
            className={styles.actions}
            data-testid="home-hero-actions"
          >
            <Link
              href="/practice"
              className={buttonVariants({
                variant: "homePrimary",
                size: "home",
              })}
              data-testid="hero-start-practicing"
              data-cta="start-practicing"
            >
              <ButtonContent icon={<Play className="size-4" />}>
                Start Practicing Free
              </ButtonContent>
            </Link>
            <Link
              href="#features"
              className={buttonVariants({
                variant: "homeSecondary",
                size: "home",
              })}
              data-testid="hero-see-features"
              data-cta="see-features"
            >
              <ButtonContent
                icon={<Sparkles className="size-4" />}
                iconPosition="end"
              >
                See what&apos;s inside
              </ButtonContent>
            </Link>
            <Link
              href="#interview"
              className={buttonVariants({ variant: "homeGhost", size: "home" })}
              data-testid="hero-mock-interview"
              data-cta="mock-interview"
            >
              <ButtonContent icon={<Mic className="size-4" />}>
                Mock Interview
              </ButtonContent>
            </Link>
          </ButtonGroup>

          <div
            className={styles.stats}
            aria-label="QA Playground highlights"
            data-testid="home-hero-stats"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className={styles.stat}
                data-testid={`hero-stat-${stat.label.toLowerCase().replaceAll(" ", "-")}`}
                data-stat-label={stat.label.toLowerCase().replaceAll(" ", "-")}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
