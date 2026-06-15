import { HomeHero } from "@/components/home/home-hero";
import { HomeFeaturePreview } from "@/components/home/home-feature-preview";
import { JobHuntSection } from "@/components/home/job-hunt-section";
import { PracticeSection } from "@/components/home/practice-section";
import { TrustSection } from "@/components/trust-section";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustSection />
      <HomeFeaturePreview />
      <PracticeSection />
      <JobHuntSection />
    </>
  );
}
