import Link from "next/link";
import { Mic, Sparkles, Zap } from "lucide-react";

import { ButtonGroup } from "@/components/ui/button-group";
import { ButtonContent } from "@/components/ui/button-components";
import { buttonVariants } from "@/components/ui/button";

import styles from "./hero-section.module.css";
import shared from "../shared/home-shared.module.css";

const heroStats = [
  { value: "10K+", label: "Active Engineers" },
  { value: "22+", label: "Practice Elements" },
  { value: "AI x7", label: "Interview Agents" },
  { value: "100%", label: "Always Free" },
];

export function HomeHero() {
  return (
    <section className={styles.section} aria-labelledby="home-hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="home-shell">
        <div className={styles.copy}>
          <div className={shared.eyebrow}>
            <span className={shared.eyebrowDot} aria-hidden="true" />
            Free for QA Engineers - 10,000+ Practitioners
          </div>

          <h1 id="home-hero-title" className={styles.title}>
            The Only
            <br />
            <span className={styles.titleAccent}>Playground You</span>
            <br />
            Need to Get Hired
          </h1>

          <p className={styles.description}>
            Stop reading. Start doing. Practice Selenium, Playwright &amp;
            Cypress on real UI elements, sharpen your answers in AI-powered
            mock interviews, then track every job you apply to - all the way to
            the offer.
          </p>

          <ButtonGroup variant="home" className={styles.actions}>
            <Link
              href="/practice"
              className={buttonVariants({ variant: "homePrimary", size: "home" })}
            >
              <ButtonContent icon={<Zap className="size-4" />}>
                Start Practicing Free
              </ButtonContent>
            </Link>
            <Link
              href="#features"
              className={buttonVariants({
                variant: "homeSecondary",
                size: "home",
              })}
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
            >
              <ButtonContent icon={<Mic className="size-4" />}>
                Mock Interview
              </ButtonContent>
            </Link>
          </ButtonGroup>

          <div className={styles.stats} aria-label="QA Playground highlights">
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
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
