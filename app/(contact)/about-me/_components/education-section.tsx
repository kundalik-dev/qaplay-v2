import { education } from "./about-me-data";

export function EducationSection() {
  return (
    <section
      data-testid="about-me-education"
      data-section="education"
      className="mt-6"
    >
      <h2 className="text-2xl font-semibold">{education.title}</h2>
      <hr />
      <p className="mt-2 text-sm text-muted-foreground">{education.body}</p>
    </section>
  );
}
