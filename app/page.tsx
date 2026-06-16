import {
  CtaSection,
  FaqSection,
  HomeFeaturePreview,
  HomeHero,
  InterviewSection,
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
      <InterviewSection />
      <RoadmapSection />
      <ReviewSection />
      <CtaSection />
      <FaqSection />
    </>
  );
}
