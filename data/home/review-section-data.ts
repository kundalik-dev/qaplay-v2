export interface ReviewItem {
  featured?: boolean;
  id: string;
  initials: string;
  name: string;
  quote: string;
  role: string;
  tone: "primary" | "warning" | "success";
}

export interface ReviewMetric {
  label: string;
  value: string;
}

export interface ReviewSectionContent {
  description: string;
  metrics: ReviewMetric[];
  reviews: ReviewItem[];
  sectionTag: string;
  titleLines: [string, string];
}

export const reviewSectionContent: ReviewSectionContent = {
  sectionTag: "// from the community",
  titleLines: ["Engineers Who", "Made the Jump"],
  description:
    "Real feedback from QA engineers using the platform to practice harder scenarios, prepare for interviews, and build hiring momentum.",
  reviews: [
    {
      id: "rahul-k",
      featured: true,
      initials: "RK",
      name: "Rahul K.",
      role: "SDET · Infosys - Pune",
      tone: "primary",
      quote:
        "The hands-on Selenium practice and the Bank Demo finally bridged the gap between theory and real-world automation. I used the iFrame and drag-drop exercises before my technical round and felt ready for every question.",
    },
    {
      id: "priya-s",
      initials: "PS",
      name: "Priya S.",
      role: "Automation Engineer · TCS",
      tone: "warning",
      quote:
        "The Shadow DOM and iFrame challenges were almost identical to what my interviewer asked. Practicing them directly, instead of only reading theory, cut my prep time dramatically.",
    },
    {
      id: "amit-m",
      initials: "AM",
      name: "Amit M.",
      role: "Junior QA to SDET in 2 months",
      tone: "success",
      quote:
        "The roadmap and study tracking gave me a path I could actually follow. Within weeks I had structure, better consistency, and enough confidence to apply for stronger roles.",
    },
  ],
  metrics: [
    { value: "10K+", label: "Active Engineers" },
    { value: "4.9", label: "Average Rating" },
    { value: "100%", label: "Free to use" },
  ],
};
