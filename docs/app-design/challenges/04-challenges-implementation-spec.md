# Challenges Feature: Implementation Specification

**Purpose:** This document is the master blueprint for generating the React/Next.js code for the "Challenges" feature in QA Playground. 
**Target Audience:** An AI coding assistant. Feed this file to an AI to generate the complete architecture, components, and routing.

---

## 1. Architectural Overview

The Challenges feature consists of a Dashboard (Home) and individual Challenge Detail pages. It relies on a centralized "Challenges Registry" (JSON/TS object) to ensure scalability. We want to be able to add new challenges simply by adding an entry to the registry and creating a tiny isolated React component for its "Target UI".

### Routing Structure
- `app/challenges/page.tsx` -> The Dashboard Home.
- `app/challenges/[challengeId]/page.tsx` -> The Challenge Detail Page (Dynamic Route).

### Data & State (Local Storage)
For V1, all user progress is saved in the browser's `localStorage`.
- `qap_completed_challenges`: Array of string IDs `['ghost-element', 'impatient-user']`.
- `qap_user_streak`: Integer representing daily streak.
- `qap_byok_key`: The user's OpenAI API Key for validation.

---

## 2. The Challenges Framework (Data Registry)

Create a central data file: `data/challenges-registry.ts`.
This powers the Dashboard filters, grids, and feeds data into the individual challenge pages.

```typescript
export interface ChallengeMeta {
  id: string; // Used for URL routing
  title: string;
  summary: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  tags: string[];
  instructions: string[]; // Steps shown on left panel
  boilerplate: string; // Code template for the user
  validationPrompt: string; // Secret prompt sent to LLM to validate the solution
}

export const challenges: ChallengeMeta[] = [
  {
    id: "ghost-element",
    title: "The Ghost Element",
    summary: "Traverse the shadow DOM to interact with an encapsulated button.",
    description: "Dive into Web Components. Traverse the shadow DOM to find and interact with an encapsulated button. A must-know skill for modern web automation.",
    difficulty: "Hard",
    xp: 100,
    tags: ["Shadow DOM", "Advanced"],
    instructions: [
      "Open your local VS Code and start a Playwright script.",
      "Navigate to this page and locate the button labelled 'Reveal Secret'.",
      "The button is hidden inside a `#shadow-root`. Click it."
    ],
    boilerplate: "import { test } from '@playwright/test';\n\ntest('Find ghost', async ({ page }) => {\n  // your code\n});",
    validationPrompt: "Check if the playwright code successfully pierces the shadow root. Ensure they do not use exact xpaths, but rather modern locators."
  },
  // Add future challenges here effortlessly...
];
```

---

## 3. Reusable UI Components

To make adding new challenges effortless, create these strict reusable blocks:

### A. `<ChallengeDashboard />`
- Reads from `challenges-registry.ts`.
- Reads `localStorage` to check which IDs are completed.
- Renders the Top Stats Header, Filters (Easy/Medium/Hard/Completed), and the Challenge Grid.

### B. `<ChallengeWorkspaceLayout />`
- The wrapper component for `app/challenges/[challengeId]/page.tsx`.
- **Props:** `challenge: ChallengeMeta`
- **Layout:** Implements the Split-Screen CSS.
- **Left Panel:** Automatically renders instructions and boilerplate from the `ChallengeMeta` object. It also mounts the `<AiValidationBox />`.
- **Right Panel (Playground):** Renders `{children}`. This is where the specific challenge UI goes.

### C. `<AiValidationBox />`
- Manages the BYOK (Bring Your Own Key) input. Saves the key to `localStorage`.
- Provides a `<textarea>` for code submission.
- Calls OpenAI API (or a Next.js route handler that calls OpenAI) using the key + user code + `challenge.validationPrompt`.
- Displays the Pass/Fail state and LLM code review feedback. If passed, updates `localStorage` to mark the challenge as completed.

---

## 4. How to Create a New Challenge (Developer Flow)

Once the framework is built, adding a new challenge takes 5 minutes:

1. Add a new object to `data/challenges-registry.ts` with `id: 'new-challenge'`.
2. The dynamic route `app/challenges/[challengeId]/page.tsx` will automatically catch it.
3. Inside the dynamic route, use a `switch(challengeId)` or a component map to render the specific "Target UI" inside the right panel.

```tsx
// Inside app/challenges/[challengeId]/page.tsx
export default function ChallengeRoute({ params }: { params: { challengeId: string } }) {
  const meta = challenges.find(c => c.id === params.challengeId);
  
  return (
    <ChallengeWorkspaceLayout challenge={meta}>
      {/* Target UI renders on the right side */}
      {params.challengeId === 'ghost-element' && <GhostElementPlayground />}
      {params.challengeId === 'impatient-user' && <ImpatientUserPlayground />}
    </ChallengeWorkspaceLayout>
  );
}
```

---

## 5. Instructions for AI Code Generator

**AI Prompt to Execute this Spec:**
> "Read `docs/app-design/challenges/04-challenges-implementation-spec.md`. Implement the Challenges feature in Next.js using App Router. 
> 
> 1. Create `data/challenges-registry.ts`.
> 2. Create the reusable layout component `components/challenges/ChallengeWorkspaceLayout.tsx` using the CSS classes from `docs/modern-qaplay/html-app/style.css`.
> 3. Create `components/challenges/AiValidationBox.tsx` handling localStorage logic for API keys and completion states.
> 4. Build `app/challenges/page.tsx` (Dashboard).
> 5. Build `app/challenges/[challengeId]/page.tsx` (Dynamic route implementing the layout).
> 
> Use the HTML files in `docs/modern-qaplay/html-app/` as the exact structure and class references."
