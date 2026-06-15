type PracticeDifficultyCardProps = {
  count: string;
  description: string;
  tone: "beginner" | "intermediate" | "advanced";
  title: string;
};

export function PracticeDifficultyCard({
  count,
  description,
  tone,
  title,
}: PracticeDifficultyCardProps) {
  return (
    <article className={`practice-difficulty-card practice-difficulty-card-${tone}`}>
      <div className="practice-difficulty-top">
        <span className="practice-difficulty-dot" aria-hidden="true" />
        <span className="practice-difficulty-title">{title}</span>
        <span className="practice-difficulty-count">{count}</span>
      </div>

      <p className="practice-difficulty-description">{description}</p>
    </article>
  );
}
