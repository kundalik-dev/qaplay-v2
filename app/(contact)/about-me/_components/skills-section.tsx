import { skills } from "./about-me-data";

export function SkillsSection() {
  return (
    <section
      data-testid="about-me-skills"
      data-section="skills"
      className="mt-8 pb-3"
    >
      <h2 className="text-2xl font-semibold">Skills</h2>
      <hr />
      <dl className="mt-4 flex flex-col gap-2 border-primary pl-4 text-base text-muted-foreground">
        {skills.map((skill) => (
          <div
            key={skill.id}
            data-skill={skill.id}
            data-testid={`about-me-skill-${skill.id}`}
            className="flex"
          >
            <dt className="min-w-[150px] font-semibold text-primary">
              {skill.label}
            </dt>
            <dd className="ml-2">: {skill.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
