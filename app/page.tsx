import {
  CtaSection,
  FaqSection,
  HomeFeaturePreview,
  HomeHero,
  JobHuntSection,
  PracticeNewSection,
  ReviewSection,
  RoadmapSection,
} from "@/components/home";
import { TrustSection } from "@/components/home/trust-section";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustSection />
      {/* <PracticeSection /> */}
      <PracticeNewSection />
      <HomeFeaturePreview />
      <JobHuntSection />
      <RoadmapSection />
      <ReviewSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
