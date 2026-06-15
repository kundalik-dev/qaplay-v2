type JobCrmItem = {
  company: string;
  stage: "Applied" | "HR Opened" | "Interview" | "AI Draft Ready";
};

type JobCrmPanelProps = {
  items: JobCrmItem[];
};

const stageClassMap: Record<JobCrmItem["stage"], string> = {
  Applied: "applied",
  "HR Opened": "opened",
  Interview: "interview",
  "AI Draft Ready": "draft",
};

export function JobCrmPanel({ items }: JobCrmPanelProps) {
  return (
    <article className="jobs-panel">
      <div className="jobs-panel-head">
        <div className="jobs-panel-icon" aria-hidden="true">
          💼
        </div>
        <h3 className="jobs-panel-title">Your Job CRM</h3>
      </div>

      <p className="jobs-panel-description">
        A Kanban-style tracker for your QA job search. See where every
        application stands at a glance, from drafted to interview.
      </p>

      <div className="jobs-crm-list">
        {items.map((item) => (
          <div key={item.company} className="jobs-crm-row">
            <span className="jobs-crm-company">{item.company}</span>
            <span
              className={`jobs-crm-stage jobs-crm-stage-${stageClassMap[item.stage]}`}
            >
              {item.stage}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
