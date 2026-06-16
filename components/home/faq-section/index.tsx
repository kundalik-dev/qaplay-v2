"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { faqItems, faqSideChips, faqSideCopy } from "@/data/faq-data";

import styles from "./faq-section.module.css";
import shared from "../shared/home-shared.module.css";

const toneClass: Record<string, string> = {
  accent: styles.chipAccent,
  accent2: styles.chipAccent2,
  info: styles.chipInfo,
  warning: styles.chipWarning,
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="faq"
      className={cn(
        shared.section,
        shared.sectionDivider,
        shared.sectionDividerPrimary,
        styles.section,
      )}
      aria-labelledby="faq-title"
      data-testid="home-faq"
      data-section="faq"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={styles.layout}>
          <div className={styles.lead}>
            <div className={shared.sectionTag}>{"// frequently asked"}</div>
            <h2 id="faq-title" className={styles.heading}>
              Questions?
              <br />
              Answered clearly.
            </h2>
            <p className={styles.subheading}>
              Everything important before you start practicing, interviewing,
              or tracking jobs inside QA Playground.
            </p>

            <div className={styles.sideCard}>
              <div className={styles.sideTitle}>Best fit for</div>
              <div className={styles.chipList}>
                {faqSideChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={cn(styles.chip, toneClass[chip.tone])}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              <p className={styles.sideCopy}>{faqSideCopy}</p>
            </div>
          </div>

          <div
            className={styles.accordion}
            aria-label="Frequently asked questions"
            data-testid="faq-accordion"
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className={cn(styles.item, isOpen && styles.itemOpen)}
                  data-testid={`faq-item-${index + 1}`}
                  data-state={isOpen ? "open" : "closed"}
                >
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    onClick={() => toggle(index)}
                    data-testid={`faq-trigger-${index + 1}`}
                  >
                    <span>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    className={cn(styles.body, isOpen && styles.bodyOpen)}
                  >
                    <div className={styles.inner}>{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
