import { MessageSquareText } from "lucide-react";

import { contactHero } from "@/data/contact-us/contact-us-data";

import styles from "./contact-us.module.css";

export function ContactHero() {
  return (
    <header
      className={styles.hero}
      data-testid="contact-hero"
      data-section="contact-hero"
    >
      {/* Decorative glows */}
      <div className={styles.heroGlow1} aria-hidden="true" />
      <div className={styles.heroGlow2} aria-hidden="true" />
      <div className={styles.heroDots} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroBadge}>
          <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
          {contactHero.eyebrow}
        </div>

        <h1 className={styles.heroTitle}>{contactHero.title}</h1>
        <p className={styles.heroSubtitle}>{contactHero.subtitle}</p>
      </div>
    </header>
  );
}
