import {
  CtaSection,
  FaqSection,
  HomeFeaturePreview,
  HomeHero,
  JobHuntSection,
  PracticeSection,
} from "@/components/home";
import { TrustSection } from "@/components/home/trust-section";

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
