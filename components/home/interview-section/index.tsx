import { Mic, Sparkles } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ButtonContent } from "@/components/ui/button-components";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { interviewSectionContent } from "@/data/home/interview-section-data";

import { InterviewFeatureCard } from "./interview-feature-card";
import { InterviewVisualizer } from "./interview-visualizer";
import styles from "./interview-section.module.css";
import shared from "../shared/home-shared.module.css";

function toToken(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function InterviewSection() {
  const {
    cards,
    ctas,
    description,
    score,
    sectionTag,
    titleAccent,
    titleLineOne,
    visualizer,
  } = interviewSectionContent;

  return (
    <section
      id="interview"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
        styles.section,
      )}
      aria-labelledby="interview-title"
      data-testid="home-interview"
      data-section="interview"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={shared.sectionHeader}>
          <div className={shared.sectionTag}>{sectionTag}</div>
          <h2 id="interview-title" className={shared.sectionTitle}>
            <span className={shared.sectionTitleLine}>{titleLineOne}</span>
            <span className={shared.sectionTitleLine}>
              <span className={styles.titleAccent}>{titleAccent}</span>
            </span>
          </h2>
          <p className={shared.sectionDescription}>{description}</p>
        </div>

        <div className={styles.grid} data-testid="interview-grid">
          <div className={styles.left}>
            <div className={styles.cards} data-testid="interview-cards">
              {cards.map((card) => (
                <InterviewFeatureCard key={card.title} {...card} />
              ))}
            </div>

            <ButtonGroup
              variant="home"
              className={styles.actions}
              data-testid="interview-actions"
            >
              {ctas.map((cta) => {
                const token = toToken(cta.label);

                return (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={buttonVariants({
                      variant: cta.variant,
                      size: "home",
                    })}
                    data-testid={`interview-cta-${token}`}
                    data-cta={token}
                  >
                    <ButtonContent
                      icon={
                        cta.variant === "homePrimary" ? (
                          <Mic className="size-4" />
                        ) : (
                          <Sparkles className="size-4" />
                        )
                      }
                      iconPosition={
                        cta.variant === "homePrimary" ? "start" : "end"
                      }
                    >
                      {cta.label}
                    </ButtonContent>
                  </Link>
                );
              })}
            </ButtonGroup>
          </div>

          <div className={styles.right}>
            <div
              className={styles.scoreBar}
              role="group"
              aria-label={score.label}
              data-testid="interview-score-bar"
              data-score={score.value}
            >
              <span className={styles.scoreLabel}>{score.label}</span>
              <div
                className={styles.scoreTrack}
                role="progressbar"
                aria-valuenow={score.value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.scoreFill} />
              </div>
              <span className={styles.scoreValue}>{score.scoreOutOfTen}</span>
            </div>

            <InterviewVisualizer {...visualizer} />
          </div>
        </div>
      </div>
    </section>
  );
}
