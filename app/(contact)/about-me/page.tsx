import type { Metadata } from "next";

import {
  AchievementsSection,
  EducationSection,
  ExperienceSection,
  GithubProjectsSection,
  ProfileHeader,
  SkillsSection,
  SummarySection,
} from "./_components";

export const metadata: Metadata = {
  title: "About Me",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "http://qaplayground.com/about-me",
  },
};

export default function ProfilePage() {
  return (
    <div
      data-testid="about-me-page"
      className="bg-background px-6 py-12 text-foreground"
    >
      <div className="container mx-auto max-w-3xl">
        <ProfileHeader />
        <SummarySection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementsSection />
        <GithubProjectsSection />
        <EducationSection />
      </div>
    </div>
  );
}
