import { CalendarDays } from "lucide-react";

import { experience } from "./about-me-data";

export function ExperienceSection() {
  return (
    <section
      data-testid="about-me-experience"
      data-section="work-experience"
      className="mt-4"
    >
      <h2 className="text-2xl font-semibold">Work Experience</h2>
      <hr />
      <ul className="mt-4 space-y-4">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.role}`}
            data-testid={`about-me-experience-${job.company.toLowerCase()}`}
            className="border-l-4 border-primary pl-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {job.role} - {job.company}
              </h3>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays size={16} aria-hidden="true" />
                {job.duration}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground sm:max-w-sm md:min-w-[600px]">
              {job.project}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
