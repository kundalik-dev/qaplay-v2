export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSideChip = {
  label: string;
  tone: "accent" | "accent2" | "info" | "warning";
};

export const faqSideChips: FaqSideChip[] = [
  { label: "Beginners", tone: "accent" },
  { label: "Automation QA", tone: "accent2" },
  { label: "SDET Prep", tone: "info" },
  { label: "Interview Practice", tone: "warning" },
];

export const faqSideCopy =
  "The product is designed to be useful on day one, even if you are starting with forms and selectors and working toward full E2E frameworks.";

export const faqItems: FaqItem[] = [
  {
    question: "Is QA Playground really free?",
    answer:
      "Yes. The practice elements, interview prep, and core learning flows are built to be usable without signup friction. The goal is to help QA engineers start practicing immediately.",
  },
  {
    question: "Which automation frameworks does it support?",
    answer:
      "The UI targets are framework-agnostic. You can practice with Selenium, Playwright, Cypress, or Pytest using stable selectors, IDs, and realistic interaction patterns.",
  },
  {
    question: "Do I need to install anything before using it?",
    answer:
      "No setup is required to use the web experience itself. Open the practice area, choose a challenge, and start writing tests against live components directly in the browser.",
  },
  {
    question: "Is it suitable for complete beginners?",
    answer:
      "Yes. The experience is structured across beginner, intermediate, and advanced levels, and the Study Tracker style workflow helps learners move from basics to portfolio-ready practice.",
  },
  {
    question: "Will this help with interviews and job preparation?",
    answer:
      "That is one of the main goals. The product combines practice elements, realistic demo workflows, AI interview rehearsal, and job tracking so users can prepare in one connected flow.",
  },
  {
    question: "How do the AI mock interviews work?",
    answer:
      "You pick a round or role, the AI interviewer asks real-time questions and follow-ups, and the session provides structured feedback, model answers, and scoring after each response.",
  },
  {
    question: "Can it also help me manage job applications?",
    answer:
      "Yes. The Jobs Hub includes role discovery, JD review, AI-assisted application drafting, and a personal CRM layer so follow-ups and stages stay organised.",
  },
];
