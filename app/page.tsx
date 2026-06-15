import { HomeHero } from "@/components/home/home-hero";
import { HomeFeaturePreview } from "@/components/home/home-feature-preview";
import { JobHuntSection } from "@/components/home/job-hunt-section";
import { PracticeSection } from "@/components/home/practice-section";
import { TrustSection } from "@/components/trust-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustSection />
      <PracticeSection />
      <HomeFeaturePreview />
      <JobHuntSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
