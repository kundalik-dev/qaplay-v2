import { JobCrmPanel } from "./job-crm-panel";
import { JobStepCard } from "./job-step-card";

const jobSteps = [
  {
    emoji: "🔍",
    title: "Track Latest Jobs",
    description:
      "Fresh QA, automation, and SDET openings in one feed with filters for role, location, and experience.",
  },
  {
    emoji: "📄",
    title: "Read the JD",
    description:
      "Open any role to review the full description, required skills, and how closely it fits your profile.",
  },
  {
    emoji: "✨",
    title: "AI Drafts Your Email",
    description:
      "AI reads your resume and the job description, then drafts a tailored application email you can refine.",
  },
  {
    emoji: "🚀",
    title: "Apply Directly",
    description:
      "Jump to the official apply link or send your drafted email without copy-pasting between tabs.",
  },
  {
    emoji: "📊",
    title: "Track in Your CRM",
    description:
      "Every application gets logged in your personal job CRM so nothing slips through the cracks.",
  },
];

const crmItems = [
  { company: "SDET · Razorpay", stage: "Interview" as const },
  { company: "Automation QA · Swiggy", stage: "HR Opened" as const },
  { company: "QA Engineer · Zoho", stage: "Applied" as const },
  { company: "Lead SDET · Freshworks", stage: "AI Draft Ready" as const },
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
      className="jobs-hunt-section"
      aria-labelledby="jobs-title"
    >
      <div className="home-shell">
        <div className="jobs-hunt-header">
          <div className="home-section-tag">{"// job hunt hub"}</div>
          <h2 id="jobs-title" className="jobs-hunt-title">
            <span className="jobs-hunt-title-line">From Job Opening</span>
            <span className="jobs-hunt-title-line">to Offer Letter</span>
          </h2>
          <p className="jobs-hunt-description">
            Practice gets you ready. The job hub helps you get hired with
            searchable QA openings, AI-assisted outreach, and one place to track
            every application.
          </p>
        </div>

        <div
          className="jobs-hunt-flow"
          role="list"
          aria-label="Job hunt workflow"
        >
          {jobSteps.map((step) => (
            <div key={step.title} role="listitem">
              <JobStepCard {...step} />
            </div>
          ))}
        </div>

        <div className="jobs-hunt-panels">
          <JobCrmPanel items={crmItems} />

          <article className="jobs-panel jobs-panel-future">
            <div className="jobs-future-badge">Coming Soon</div>

            <div className="jobs-panel-head">
              <div
                className="jobs-panel-icon jobs-panel-icon-future"
                aria-hidden="true"
              >
                📧
              </div>
              <h3 className="jobs-panel-title">Email Tracking</h3>
            </div>

            <p className="jobs-panel-description">
              Go further after you hit send. Track recruiter engagement and
              follow up at the right moment without losing context.
            </p>

            <div className="jobs-track-list">
              {futureChecklist.map((item) => (
                <div key={item} className="jobs-track-row">
                  <span className="jobs-track-tick" aria-hidden="true">
                    ✓
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
