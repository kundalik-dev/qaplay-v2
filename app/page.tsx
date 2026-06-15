import { HomeHero } from "@/components/home/home-hero";
// import { HomeFeaturePreview } from "@/components/home/home-feature-preview";
import { PracticeSection } from "@/components/home/practice-section";
import { TrustSection } from "@/components/trust-section";

export default function Home() {
  return (
    <>
      <HomeHero />
      {/* <HomeFeaturePreview /> */}
      <TrustSection />
      <PracticeSection />
    </>
  );
}
