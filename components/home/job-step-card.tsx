type JobStepCardProps = {
  description: string;
  emoji: string;
  title: string;
};

export function JobStepCard({ description, emoji, title }: JobStepCardProps) {
  return (
    <article className="job-step-card">
      <div className="job-step-icon" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="job-step-title">{title}</h3>
      <p className="job-step-description">{description}</p>
    </article>
  );
}
