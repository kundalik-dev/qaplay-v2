import { cn } from "@/lib/utils";

import { FeatureBentoCard } from "./feature-bento-card";
import styles from "./feature-section.module.css";
import shared from "../shared/home-shared.module.css";

const featureCards = [
  {
    className: "feature-bento-practice",
    badge: "Core Feature",
    emoji: "TL",
    title: "Practice Elements",
    description:
      "22+ interactive UI components for automation practice. Shadow DOM, iFrames, drag and drop, dynamic waits, and interview-style test targets.",
    href: "/practice",
    linkLabel: "Open practice area",
  },
  {
    className: "feature-bento-tracker",
    badge: "New",
    emoji: "TR",
    title: "QA Study Tracker",
    description:
      "Track progress across focused QA syllabi with charts, streaks, checkpoints, and notes in one place.",
    href: "/study-tracker/dashboard",
    linkLabel: "Start tracking",
  },
  {
    className: "feature-bento-ai",
    badge: "New",
    emoji: "AI",
    title: "AI Mock Interviews",
    description:
      "Practice recruiter and technical rounds with realtime AI agents and instant scored feedback.",
    href: "#interview",
    linkLabel: "Practice an interview",
  },
  {
    className: "feature-bento-bank",
    badge: "E2E Simulation",
    emoji: "BK",
    title: "Bank Demo App",
    description:
      "A realistic multi-page banking workflow for building a full end-to-end automation suite like a real project.",
    href: "/bank",
    linkLabel: "Open bank demo",
  },
  {
    className: "feature-bento-jobs",
    badge: "New",
    emoji: "JB",
    title: "Job Tracker & CRM",
    description:
      "Browse QA jobs, draft outreach with AI, and track every application through your pipeline.",
    href: "#jobs",
    linkLabel: "Explore hub",
  },
  {
    className: "feature-bento-ext",
    badge: "New",
    emoji: "EX",
    title: "Browser Extensions",
    description:
      "Free Chrome tools built for testers, from capture helpers to workflow accelerators.",
    href: "/chrome/qa-capture",
    linkLabel: "Add to Chrome",
  },
  {
    className: "feature-bento-tools",
    badge: "Free",
    emoji: "TS",
    title: "QA Tools",
    description:
      "Data generators, selector helpers, and utility tools right when you need them.",
    href: "/qa-tools",
    linkLabel: "Explore tools",
  },
  {
    className: "feature-bento-blog",
    emoji: "BL",
    title: "Blog & Tutorials",
    description:
      "Practical QA guides and explainers written from real hands-on testing work.",
    href: "/blog",
    linkLabel: "Read articles",
  },
] as const;

export function HomeFeaturePreview() {
  return (
    <section
      id="features"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
      )}
      aria-labelledby="features-title"
    >
      <div className="home-shell">
        <div className={shared.sectionHeader}>
          <div className={shared.sectionTag}>{"// what we offer"}</div>
          <h2 id="features-title" className={shared.sectionTitle}>
            <span className={shared.sectionTitleLine}>Everything You Need.</span>
            <span className={shared.sectionTitleLine}>
              Nothing You Do Not.
            </span>
          </h2>
          <p className={shared.sectionDescription}>
            Focused tools that cover the full QA journey: practice your skills,
            rehearse interviews with AI, and track every application until you
            sign the offer.
          </p>
        </div>

        <div className={styles["feature-bento-grid"]}>
          {featureCards.map((card) => (
            <FeatureBentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
