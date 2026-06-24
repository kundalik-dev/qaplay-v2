export type DemoAppFilter = "all" | "ui" | "api" | "e2e";

export interface DemoAppCard {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  filters: DemoAppFilter[];
  badge: string;
  eyebrow: string;
  highlights: string[];
}

export interface DemoAppFilterOption {
  label: string;
  value: DemoAppFilter;
  tone: "primary" | "secondary" | "warning" | "info";
}

export const demoAppFilters: DemoAppFilterOption[] = [
  { label: "All Categories", value: "all", tone: "primary" },
  { label: "UI", value: "ui", tone: "secondary" },
  { label: "API", value: "api", tone: "info" },
  { label: "E2E", value: "e2e", tone: "warning" },
];

export const demoAppCards: DemoAppCard[] = [
  {
    title: "Bank Demo App",
    description:
      "Practice realistic banking journeys with forms, validations, account workflows, and stable targets for automation coverage.",
    href: "/demo/bank",
    imageSrc: "/images/bank-demo-app.png",
    imageAlt: "Bank demo app preview",
    filters: ["all", "ui", "e2e"],
    badge: "New",
    eyebrow: "Web Automation",
    highlights: [
      "Account-style user journeys",
      "Reliable selectors for automation",
      "Multi-step validation practice",
    ],
  },
  // {
  //   title: "Shopping Demo App",
  //   description:
  //     "Test cart flows, product exploration, and checkout-style interactions in a compact retail demo built for QA practice.",
  //   href: "/demo/shopping",
  //   imageSrc: "/images/sauce-demo-app.png",
  //   imageAlt: "Shopping demo app preview",
  //   filters: ["all", "ui", "e2e"],
  //   badge: "Popular",
  //   eyebrow: "Web Automation",
  //   highlights: [
  //     "Product browse and cart coverage",
  //     "Checkout interaction practice",
  //     "Good fit for regression scenarios",
  //   ],
  // },
  {
    title: "Sauce Demo",
    description:
      "The go-to QA practice site by Sauce Labs — explore login flows, product listing, cart, and checkout on a real-world e-commerce UI built for automation.",
    href: "https://www.saucedemo.com/",
    imageSrc: "/images/sauce-demo-app.png",
    imageAlt: "Sauce Demo website preview",
    filters: ["all", "ui", "e2e"],
    badge: "Classic",
    eyebrow: "External Site",
    highlights: [
      "Login with multiple test user roles",
      "Product sort, filter, and cart flows",
      "Full checkout journey practice",
    ],
  },
];
