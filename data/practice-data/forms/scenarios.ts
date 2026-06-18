import type { FrameworkMethods } from "@/data/practice-data/types";

export const frameworkMethods: Record<
  "selenium" | "playwright" | "cypress",
  FrameworkMethods
> = {
  selenium: {
    label: "Selenium (Java)",
    methods: [
      { color: "purple", label: "sendKeys()" },
      { color: "blue", label: "click()" },
      { color: "orange", label: "selectByVisibleText()" },
      { color: "green", label: "submit()" },
      { color: "yellow", label: "isDisplayed()" },
    ],
  },
  playwright: {
    label: "Playwright JS / PY",
    methods: [
      { color: "purple", label: "fill()" },
      { color: "blue", label: "check()" },
      { color: "orange", label: "selectOption()" },
      { color: "green", label: "click()" },
      { color: "yellow", label: "toBeVisible()" },
    ],
  },
  cypress: {
    label: "Cypress JS",
    methods: [
      { color: "purple", label: ".type()" },
      { color: "blue", label: ".check()" },
      { color: "orange", label: ".select()" },
      { color: "green", label: ".submit()" },
      { color: "yellow", label: "should('be.visible')" },
    ],
  },
};
