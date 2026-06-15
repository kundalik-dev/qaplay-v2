"use client";

import { useState } from "react";
import { faqItems, faqSideChips, faqSideCopy } from "@/data/faq-data";

const toneClass: Record<string, string> = {
  accent: "faq-chip-accent",
  accent2: "faq-chip-accent2",
  info: "faq-chip-info",
  warning: "faq-chip-warning",
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="faq-section pb-16" aria-labelledby="faq-title">
      <div className="home-shell">
        <div className="faq-layout">
          {/* ── Left: sticky lead ── */}
          <div className="faq-lead">
            <div className="home-section-tag">{"// frequently asked"}</div>
            <h2 id="faq-title" className="faq-heading">
              Questions?
              <br />
              Answered clearly.
            </h2>
            <p className="faq-subheading">
              Everything important before you start practicing, interviewing, or
              tracking jobs inside QA Playground.
            </p>

            <div className="faq-side-card">
              <div className="faq-side-title">Best fit for</div>
              <div className="faq-chip-list">
                {faqSideChips.map((chip) => (
                  <span
                    key={chip.label}
                    className={`faq-chip ${toneClass[chip.tone]}`}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>
              <p className="faq-side-copy">{faqSideCopy}</p>
            </div>
          </div>

          {/* ── Right: accordion ── */}
          <div
            className="faq-accordion"
            aria-label="Frequently asked questions"
          >
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.question}
                  className={`faq-item${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      +
                    </span>
                  </button>
                  <div
                    className="faq-body"
                    style={isOpen ? { maxHeight: "320px" } : undefined}
                  >
                    <div className="faq-inner">{item.answer}</div>
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
