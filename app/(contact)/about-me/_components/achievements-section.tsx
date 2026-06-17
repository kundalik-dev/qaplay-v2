import { achievements } from "./about-me-data";

export function AchievementsSection() {
  return (
    <section
      data-testid="about-me-achievements"
      data-section="key-accomplishments"
      className="mt-6"
    >
      <h2 className="text-2xl font-semibold">Key Accomplishments</h2>
      <hr />
      <ul className="mt-4 space-y-4">
        {achievements.map((achievement, index) => (
          <li
            key={index}
            data-testid={`about-me-achievement-${index + 1}`}
            className="border-l-4 border-primary pl-4"
          >
            <p className="text-sm text-muted-foreground">{achievement}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
