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
    href: "/bank",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866421/bank-demo-app-new_uslyoh.webp",
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
  {
    title: "UI Practice Elements",
    description:
      "Practice interacting with various UI elements like buttons, forms, dropdowns, and more in a focused environment.",
    href: "/ui-practice",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866688/demo-qa_gttszl.webp",
    imageAlt: "UI Practice Elements preview",
    filters: ["all", "ui"],
    badge: "Popular",
    eyebrow: "Web Automation",
    highlights: [
      "22+ interactive elements",
      "Focused POM practice",
      "Stable targets for automation",
    ],
  },
  {
    title: "GitHub User Search",
    description:
      "Practice automation locators on a real GitHub API integration. Search for GitHub users, view profiles, and solve intentional locator challenges.",
    href: "/demo/github-user-search",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866422/github-user-search-app_sweeiv.webp",
    imageAlt: "GitHub User Search app preview",
    filters: ["all", "ui"],
    badge: "New",
    eyebrow: "Locator Practice",
    highlights: [
      "Intentional locator challenges",
      "Real GitHub API integration",
      "Positive & negative test scenarios",
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
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866422/sauce-demo-app_uw9sfg.webp",
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
  {
    title: "DemoQA",
    description:
      "A widget-heavy practice ground with forms, alerts, frames, draggable elements, and interactive UI controls built specifically for automation training.",
    href: "https://demoqa.com/",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866688/demo-qa_gttszl.webp",
    imageAlt: "DemoQA website preview",
    filters: ["all", "ui", "e2e"],
    badge: "Popular",
    eyebrow: "External Site",
    highlights: [
      "Forms, alerts, and modal dialogs",
      "Drag-and-drop and interactive widgets",
      "Frames, windows, and dynamic elements",
    ],
  },
  {
    title: "Academy Bugs",
    description:
      "An e-commerce style site seeded with intentional bugs — ideal for practicing exploratory testing, bug reporting, and regression test design.",
    href: "https://academybugs.com/",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866687/academy-bugs_vwhfew.webp",
    imageAlt: "Academy Bugs website preview",
    filters: ["all", "ui", "e2e"],
    badge: "New",
    eyebrow: "Bug Hunting",
    highlights: [
      "Intentionally seeded UI and logic bugs",
      "Realistic e-commerce browse and cart flows",
      "Great for exploratory testing practice",
    ],
  },
  {
    title: "Automation Testing Practice",
    description:
      "A registration and forms playground with checkboxes, radio buttons, dropdowns, and date pickers designed for hands-on form automation practice.",
    href: "https://demo.automationtesting.in/Register.html",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783866687/automation-testing-in_kjx56x.webp",
    imageAlt: "Automation Testing Practice registration page preview",
    filters: ["all", "ui"],
    badge: "New",
    eyebrow: "Form Practice",
    highlights: [
      "Full registration form with validations",
      "Dropdowns, checkboxes, and radio groups",
      "Date pickers and other form widgets",
    ],
  },
  {
    title: "Free APIs Directory",
    description:
      "A categorized directory of free public APIs — great for picking new endpoints to script API automation and contract test practice against.",
    href: "https://free-apis.github.io/#/categories",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783867162/free-apis-github-io_uqslir.webp",
    imageAlt: "Free APIs directory website preview",
    filters: ["all", "api"],
    badge: "New",
    eyebrow: "API Practice",
    highlights: [
      "Categorized list of free public APIs",
      "Fresh endpoints to script new API tests",
      "Good source for contract testing practice",
    ],
  },
  {
    title: "Apipheny Free API List",
    description:
      "A curated list of free, no-auth-required APIs across categories like finance, weather, and entertainment for building quick API test suites.",
    href: "https://apipheny.io/free-api/",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783867162/api-pheny-io_bbyymi.webp",
    imageAlt: "Apipheny free API list website preview",
    filters: ["all", "api"],
    badge: "New",
    eyebrow: "API Practice",
    highlights: [
      "No-auth public APIs across many categories",
      "Quick to wire up for smoke test practice",
      "Wide variety of response shapes to assert on",
    ],
  },
  {
    title: "JSONPlaceholder",
    description:
      "The classic fake REST API for testing and prototyping — posts, comments, albums, and users with full CRUD-style responses out of the box.",
    href: "https://jsonplaceholder.typicode.com/",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783867162/json-place-holder_iabx1o.webp",
    imageAlt: "JSONPlaceholder website preview",
    filters: ["all", "api"],
    badge: "Classic",
    eyebrow: "API Practice",
    highlights: [
      "Full CRUD-style REST resources",
      "Predictable, well-documented response schemas",
      "Zero setup — ready for GET/POST/PUT/DELETE tests",
    ],
  },
  {
    title: "ReqRes",
    description:
      "A hosted REST API with realistic user data and status codes — built specifically for practicing API test scripts against login, CRUD, and paging.",
    href: "https://reqres.in/",
    imageSrc:
      "https://res.cloudinary.com/xn7znfot/image/upload/v1783867163/regres_juftlc.webp",
    imageAlt: "ReqRes website preview",
    filters: ["all", "api"],
    badge: "Popular",
    eyebrow: "API Practice",
    highlights: [
      "Login and CRUD-style endpoints",
      "Realistic status codes and error responses",
      "Pagination and delayed-response scenarios",
    ],
  },
];
