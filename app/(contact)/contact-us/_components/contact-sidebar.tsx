import Link from "next/link";
import { Clock, Code, Globe, Mail, Video, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  contactChannels,
  helpTopics,
  responseInfo,
  type ContactChannel,
} from "@/data/contact-us/contact-us-data";

import styles from "./contact-us.module.css";

// ── Icon map — keeps data files free of React/component imports ───────────────
const CHANNEL_ICONS: Record<ContactChannel["iconId"], LucideIcon> = {
  mail: Mail,
  youtube: Video,
  github: Code,
  twitter: X,
  linkedin: Globe,
};

export function ContactSidebar() {
  return (
    <aside
      className="flex flex-col gap-4"
      data-testid="contact-sidebar"
      data-section="contact-sidebar"
    >
      {/* Channels ────────────────────────────────────────────────────────── */}
      <div className={styles.sideCard}>
        <p className={styles.sideCardHeading}>Other Ways to Reach Us</p>

        <nav aria-label="Contact channels">
          {contactChannels.map(
            ({ id, iconId, label, display, href, external }) => {
              const Icon = CHANNEL_ICONS[iconId];
              return (
                <Link
                  key={id}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={styles.channelRow}
                  data-testid={`contact-channel-${id}`}
                  aria-label={`${label}: ${display}`}
                >
                  <span className={styles.channelIconWrap} aria-hidden="true">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className={styles.channelMeta}>
                    <p className={styles.channelLabel}>{label}</p>
                    <p className={styles.channelDisplay}>{display}</p>
                  </div>
                </Link>
              );
            },
          )}
        </nav>
      </div>

      {/* Response time ───────────────────────────────────────────────────── */}
      <div className={styles.sideCard} data-testid="contact-response-time">
        <div className={styles.responseCardInner}>
          <span className={styles.responseIconWrap} aria-hidden="true">
            <Clock className="h-4 w-4" />
          </span>
          <div>
            <p
              className="mb-1 text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {responseInfo.heading}
            </p>
            <p className={styles.responseBody}>
              Typically within{" "}
              <strong className={styles.responseHighlight}>
                {responseInfo.highlight}
              </strong>
              . For urgent matters, mention it in the subject.
            </p>
          </div>
        </div>
      </div>

      {/* What we help with ───────────────────────────────────────────────── */}
      <div className={styles.sideCard} data-testid="contact-help-topics">
        <p
          className="mb-3 text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          What We Can Help With
        </p>
        <ul className={styles.helpList} aria-label="Topics we help with">
          {helpTopics.map((item) => (
            <li key={item} className={styles.helpItem}>
              <span className={styles.helpDot} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
