# Challenges Feature — Developer & Admin Guide

Everything you need to know to add, modify, or debug a challenge.

---

## 1. Architecture Overview

The challenges feature has three moving parts:

```
data/challenges-registry.ts          ← THE ONLY FILE YOU TOUCH to define a challenge
  └─ ChallengeMeta[]                 ← array of all challenges
  └─ buildValidationSystemPrompt()   ← converts config → full AI system prompt

app/(dashboard)/challenges/
  ├─ page.tsx                        ← Dashboard list (auto-reads registry, no edits needed)
  ├─ challenges.module.css           ← All challenge CSS
  ├─ _components/
  │   ├─ ChallengeWorkspaceLayout.tsx  ← Left/right panel shell (no edits needed)
  │   └─ AiValidationBox.tsx           ← AI submission UI (calls buildValidationSystemPrompt)
  └─ [challengeId]/
      ├─ page.tsx                    ← Detail page — ADD TO PLAYGROUNDS MAP HERE
      └─ _components/
          ├─ ghost-element-playground.tsx
          ├─ impatient-user-playground.tsx
          ├─ stubborn-api-playground.tsx
          ├─ drag-drop-playground.tsx
          └─ playground.module.css   ← Playground-specific styles
```

**Data flow at submission time:**

```
User pastes code
  → AiValidationBox calls buildValidationSystemPrompt(challenge)
  → Sends { system: <built prompt>, user: <pasted code> } to OpenRouter
  → AI returns { pass: boolean, feedback: string }
  → UI shows pass/fail + saves to localStorage if passed
```

---

## 2. How to Add a New Challenge

### Step 1 — Add to the registry

Open `data/challenges-registry.ts` and add a new object to the `challenges` array.
Copy an existing entry as a template. The minimum required fields:

```typescript
{
  id: "your-challenge-id",        // kebab-case, unique, becomes the URL slug
  title: "...",
  summary: "...",                  // one sentence, shown on dashboard card
  description: "...",              // 2-3 sentences, shown in challenge header
  difficulty: "Easy" | "Medium" | "Hard",
  xp: 10,                          // Easy=5, Medium=10, Hard=15 (convention)
  tags: ["Tag One", "Tag Two"],
  instructions: [
    "Step 1 ...",
    "Step 2 ...",
    "Step 3 ...",
  ],
  boilerplate: `import { test, expect } from '@playwright/test';
test('your test', async ({ page }) => {
  // starter code here
});`,
  validationConfig: { /* see Section 3 */ },
}
```

### Step 2 — Create the playground component

Create a new file:
```
app/(dashboard)/challenges/[challengeId]/_components/your-id-playground.tsx
```

This is the interactive UI on the right panel that the user's script runs against.
Keep it a `"use client"` component. Add `data-testid` attributes to every interactive
element — these are the selectors users will target in their scripts.

Minimal template:
```tsx
"use client";
import styles from "./playground.module.css";

export function YourIdPlayground() {
  return (
    <div className={styles.playground} data-testid="your-id-playground">
      {/* your interactive UI here */}
    </div>
  );
}
```

### Step 3 — Register the component in the page map

Open `app/(dashboard)/challenges/[challengeId]/page.tsx` and add one line to the
`PLAYGROUNDS` record:

```typescript
const PLAYGROUNDS: Record<string, ReactNode> = {
  "ghost-element":    <GhostElementPlayground />,
  "impatient-user":  <ImpatientUserPlayground />,
  "stubborn-api":    <StubbornApiPlayground />,
  "drag-drop-puzzle": <DragDropPlayground />,
  "your-challenge-id": <YourIdPlayground />,  // ← add this line
};
```

Also add the import at the top of the file.

### Step 4 — (Optional) Add an API route

If your playground needs a real network endpoint, create:
```
app/api/challenges/your-id/route.ts
```

Example for the Stubborn API pattern:
```typescript
export async function GET() {
  return Response.json({ error: "Internal Server Error" }, { status: 500 });
}
```

### Step 5 — Preview the AI validation prompt

Before shipping, verify the prompt looks correct. In a browser console on any
challenge page, run:
```javascript
// The prompt preview panel on the left panel shows the same thing
// Or paste this in the console:
console.log(document.querySelector('[data-testid="prompt-preview"]')?.textContent);
```

Or directly in Node/ts-node:
```typescript
import { buildValidationSystemPrompt, challenges } from '@/data/challenges-registry';
const c = challenges.find(c => c.id === 'your-id');
console.log(buildValidationSystemPrompt(c));
```

---

## 3. Writing the ValidationConfig

This is the most important part — it directly controls what the AI checks.

```typescript
validationConfig: {
  // What skill is being tested (short phrase shown in the prompt header)
  skill: "Network interception and API response mocking",

  // 2-4 sentences: what does a CORRECT solution do?
  // The AI evaluates the pasted code against this description.
  scenario: "The user must write a Playwright script that intercepts...",

  // ALL of these must be present to pass.
  // Be specific — vague patterns produce inaccurate grading.
  requiredPatterns: [
    {
      pattern: "Calls page.route() with a URL pattern matching /api/user-stats",
      reason: "Without route(), no interception happens at all.",
    },
    // ... more rules
  ],

  // ANY of these = automatic fail, regardless of other correctness.
  // Use [] if there are no hard disqualifiers.
  forbiddenPatterns: [
    {
      pattern: "Calls page.goto() before setting up page.route()",
      reason: "The request fires on load — a late intercept misses it.",
    },
  ],

  // How strict the AI grades:
  // "strict"   → every required pattern must be present
  // "moderate" → minor variations OK if core concept is right
  // "lenient"  → beginner-friendly, forgive minor issues
  strictness: "strict",

  // Optional: extra context for the AI evaluator
  // Use for edge cases or framework-specific nuances
  evaluatorNotes: "Accept both glob patterns and exact URL strings...",
}
```

### Tips for writing good validation configs

**Be specific in `requiredPatterns`.**
Bad:  `"Uses page.route()"`
Good: `"Calls page.route() with a URL pattern matching /api/user-stats"`

The AI reads patterns as plain English. The more specific you are, the more
accurate the grading.

**Set `forbiddenPatterns` for common cheat paths.**
Always think: "how could someone pass this without learning the skill?" Then
add the shortcut as a forbidden pattern.

**Use `evaluatorNotes` for nuance.**
If two different approaches are both correct (e.g., `dragTo()` vs manual mouse
events), note that both are acceptable so the AI doesn't fail valid solutions.

**Choose strictness by audience.**
- Advanced/Hard challenges → `"strict"` (no excuses)
- Medium challenges → `"moderate"` (core concept matters most)
- Easy/beginner challenges → `"lenient"` (encourage, don't gatekeep)

---

## 4. Modifying an Existing Challenge

**Change the instructions, description, or tags:**
→ Edit the object in `data/challenges-registry.ts`. No other changes needed.

**Change what the AI validates:**
→ Edit `validationConfig` in the registry. The new prompt takes effect
immediately on the next submission — no code changes elsewhere.

**Change the playground UI:**
→ Edit the playground component in `[challengeId]/_components/`.

**Add/remove a challenge from the dashboard:**
→ Add/remove from the `challenges` array. The dashboard reads the array
directly and updates automatically.

---

## 5. How the AI Prompt Is Constructed

`buildValidationSystemPrompt(challenge)` in `data/challenges-registry.ts` builds
the complete LLM system prompt from the structured `validationConfig`. You never
write raw prompt strings anywhere.

The built prompt structure:
```
You are a Senior QA Engineer and code reviewer...

## Challenge
Title: {title}
Skill Under Test: {skill}

## What a Correct Solution Should Do
{scenario}

## Required Patterns — ALL must be present to PASS
  1. {pattern}
     Why: {reason}
  2. ...

## Forbidden Patterns — ANY present = automatic FAIL
  1. {pattern}
     Why: {reason}

## Evaluator Notes        ← only if evaluatorNotes is set
{evaluatorNotes}

## Grading Strictness: STRICT | MODERATE | LENIENT
{strictness explanation}

## Your Response
Respond ONLY with valid JSON: { "pass": boolean, "feedback": "..." }
```

The AI returns `{ pass: boolean, feedback: string }`. If `pass` is true,
`AiValidationBox` saves the challenge ID to `localStorage["qap_completed_challenges"]`.

**To inspect the live prompt for any challenge**, click the "AI Validation Prompt"
toggle at the bottom of the left panel on any challenge detail page. It shows
exactly what will be sent to the AI on your next submission.

---

## 6. localStorage Keys

All user progress is stored client-side:

| Key | Value | Used by |
|-----|-------|---------|
| `qap_completed_challenges` | `string[]` of challenge IDs | Dashboard stats, card status |
| `qap_user_streak` | integer | Streak pill in dashboard header |
| `qap_settings` | `{ openrouter_key, openrouter_model }` | AiValidationBox |

---

## 7. Checklist for a New Challenge

Before marking a challenge as done:

- [ ] Object added to `challenges` array in `data/challenges-registry.ts`
- [ ] `id` is unique, kebab-case, and matches the playground filename
- [ ] `validationConfig.scenario` clearly describes what a correct solution does
- [ ] `validationConfig.requiredPatterns` covers all non-negotiable techniques
- [ ] `validationConfig.forbiddenPatterns` covers obvious cheat paths
- [ ] Boilerplate code is a useful starting point (not just an empty stub)
- [ ] Playground component created in `[challengeId]/_components/`
- [ ] All interactive playground elements have `data-testid` attributes
- [ ] Component registered in `PLAYGROUNDS` map in `[challengeId]/page.tsx`
- [ ] Prompt preview reviewed via the toggle in the left panel
- [ ] Challenge navigates, plays, and validates correctly end-to-end
