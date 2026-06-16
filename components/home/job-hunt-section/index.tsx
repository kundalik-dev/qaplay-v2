import { cn } from "@/lib/utils";

import { JobCrmPanel } from "./job-crm-panel";
import { JobStepCard } from "./job-step-card";
import styles from "./job-hunt-section.module.css";
import shared from "../shared/home-shared.module.css";

const jobSteps = [
  {
    emoji: "01",
    title: "Track Latest Jobs",
    description:
      "Fresh QA, automation, and SDET openings in one feed with filters for role, location, and experience.",
  },
  {
    emoji: "02",
    title: "Read the JD",
    description:
      "Open any role to review the full description, required skills, and how closely it fits your profile.",
  },
  {
    emoji: "03",
    title: "AI Drafts Your Email",
    description:
      "AI reads your resume and the job description, then drafts a tailored application email you can refine.",
  },
  {
    emoji: "04",
    title: "Apply Directly",
    description:
      "Jump to the official apply link or send your drafted email without copy-pasting between tabs.",
  },
  {
    emoji: "05",
    title: "Track in Your CRM",
    description:
      "Every application gets logged in your personal job CRM so nothing slips through the cracks.",
  },
];

const crmItems = [
  { company: "SDET - Razorpay", stage: "Interview" as const },
  { company: "Automation QA - Swiggy", stage: "HR Opened" as const },
  { company: "QA Engineer - Zoho", stage: "Applied" as const },
  { company: "Lead SDET - Freshworks", stage: "AI Draft Ready" as const },
];

const futureChecklist = [
  "See which application emails you have sent",
  "Know if the recruiter opened your email",
  "Log calls and interview invites against each role",
  "Get smart reminders for silent threads and follow-ups",
];

export function JobHuntSection() {
  return (
    <section
      id="jobs"
      className={cn(
        shared.section,
        shared.sectionDefaultPadding,
        shared.sectionDivider,
        shared.sectionDividerBlend,
      )}
      aria-labelledby="jobs-title"
      data-testid="home-jobs"
      data-section="jobs"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className="home-shell">
        <div className={styles.header}>
          <div className={shared.sectionTag}>{"// job hunt hub"}</div>
          <h2 id="jobs-title" className={styles.title}>
            <span className={styles.titleLine}>From Job Opening</span>
            <span className={styles.titleLine}>to Offer Letter</span>
          </h2>
          <p className={styles.description}>
            Practice gets you ready. The job hub helps you get hired with
            searchable QA openings, AI-assisted outreach, and one place to
            track every application.
          </p>
        </div>

        <div
          className={styles.flow}
          role="list"
          aria-label="Job hunt workflow"
          data-testid="jobs-workflow"
        >
          {jobSteps.map((step) => (
            <div
              key={step.title}
              role="listitem"
              data-testid={`job-step-${step.emoji}`}
              data-step={step.emoji}
            >
              <JobStepCard {...step} />
            </div>
          ))}
        </div>

        <div className={styles.panels}>
          <JobCrmPanel items={crmItems} />

          <article className={cn(styles["jobs-panel"], styles["jobs-panel-future"])}>
            <div className={styles["jobs-future-badge"]}>Coming Soon</div>

            <div className={styles["jobs-panel-head"]}>
              <div
                className={styles["jobs-panel-icon"]}
                aria-hidden="true"
              >
                EM
              </div>
              <h3 className={styles["jobs-panel-title"]}>Email Tracking</h3>
            </div>

            <p className={styles["jobs-panel-description"]}>
              Go further after you hit send. Track recruiter engagement and
              follow up at the right moment without losing context.
            </p>

            <div className={styles["jobs-track-list"]}>
              {futureChecklist.map((item) => (
                <div key={item} className={styles["jobs-track-row"]}>
                  <span className={styles["jobs-track-tick"]} aria-hidden="true">
                    OK
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
