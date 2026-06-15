# Using Custom CSS in a Next.js App (from the `modern-qa` design system)

A practical guide — written from the real port of `modern-qaplay/html-app/index.html`
into `qaplay-v2-test-demo/app/page.tsx`. It explains **how to drop a hand-written
CSS design system into a Next.js + Tailwind v4 + shadcn app without the two
systems fighting each other.**

---

## 1. The core problem

The Next.js app already ships its own design tokens in `app/globals.css`:

```css
:root {
  --accent: var(--surface2); /* shadcn "accent" = neutral hover surface */
  --border: rgba(255, 255, 255, 0.07);
  --radius-sm: 8px;
  /* …many more, consumed by shadcn components */
}
```

Our hand-written `style.css` **redefines the same variable names** with different
meanings:

```css
:root {
  --accent: #00ffaa; /* brand green */
  --border: rgba(255, 255, 255, 0.07);
  --radius-sm: 8px;
}
```

If you import `style.css` globally, its `:root` block **overwrites** the shadcn
tokens for the entire app. Every shadcn `<Button>`, `<Card>`, etc. on every route
would suddenly render with brand-green "accent" and the wrong radii. That's the trap.

> **Rule:** Two global `:root` token sets with overlapping names cannot coexist.
> One must be scoped.

---

## 2. The solution: scope the design system under one wrapper class

Instead of defining tokens on `:root`, define them on a wrapper class — here `.qap`
(QA Playground). CSS custom properties **inherit**, so every descendant of `.qap`
resolves `var(--accent)` from the wrapper, while the rest of the app keeps the
shadcn tokens from `globals.css`.

### Before (global — breaks shadcn)

```css
:root            { --accent: #00ffaa; }
html[data-theme="light"] { --accent: #1f5f6b; }
body             { background: var(--bg); }
body::before     { /* grid overlay */ }
*, *::before     { box-sizing: border-box; }
.nav { … }       /* class selectors */
```

### After (scoped — safe)

```css
.qap                       { --accent: #00ffaa; }
.qap[data-theme="light"]   { --accent: #1f5f6b; }
.qap                       { background: var(--bg); }
.qap::before               { /* grid overlay */ }
.qap, .qap *, .qap *::before { box-sizing: border-box; }
.qap .nav { … }            /* every class selector is prefixed */
```

### The mechanical transformation

When porting an existing stylesheet, apply these find/replace rules:

| Original selector                       | Scoped selector                               |
| --------------------------------------- | --------------------------------------------- |
| `:root {`                               | `.qap {`                                      |
| `html[data-theme="light"]`              | `.qap[data-theme="light"]`                    |
| `html[data-theme="dark"]`               | `.qap[data-theme="dark"]`                     |
| `body {` / `body::before`               | `.qap {` / `.qap::before`                     |
| `*, *::before, *::after`                | `.qap, .qap *, .qap *::before, .qap *::after` |
| `.nav`, `.btn`, `.footer-*` (classes)   | `.qap .nav`, `.qap .btn`, …                   |
| element rules `a {}`, `ul {}`, `img {}` | `.qap a {}`, `.qap ul {}`, `.qap img {}`      |

Things you may **leave global** because they don't collide:

- `@keyframes` (but namespace them, e.g. `qap-pulse`, to avoid name clashes).
- A full-screen overlay element appended to `document.body` (e.g. the theme
  reveal layer) — it lives outside `.qap`, so style it with its own class.

---

## 3. Where to put the file and how to import it

```
app/
  globals.css      ← imported once in layout.tsx (Tailwind + shadcn)
  landing.css      ← the scoped design system
  layout.tsx
  page.tsx         ← import "./landing.css"
```

In Next.js App Router, **any `import "./x.css"` is global** (it is injected into the
document `<head>`, not scoped to the component). Importing it from `page.tsx`
vs `layout.tsx` does **not** scope it — scoping comes only from the `.qap`
selectors inside the file. Importing from the page just keeps the source near the markup.

```tsx
// app/page.tsx
"use client";
import "./landing.css";

export default function Home() {
  return (
    <div className="qap" data-theme="dark">
      {/* … */}
    </div>
  );
}
```

> If you need true component-level scoping instead, use **CSS Modules**
> (`landing.module.css` → `import styles from "./landing.module.css"` →
> `className={styles.nav}`). We did **not** use modules here because the design
> system relies on dozens of shared global class names (`.btn`, `.nav-link`,
> `.fade-up`) referenced by hand-written markup and by JS that toggles classes.
> A single scoped global stylesheet is the right tool for "port an existing
> hand-authored CSS file verbatim."

---

## 4. Fonts: wire real font families via `next/font`

The CSS references fonts by family name:

```css
.qap {
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

Do **not** add a `<link rel="stylesheet" href="fonts.googleapis…">` — `next/font`
is the idiomatic path (self-hosts, no layout shift, no extra network request).
`next/font` exposes each family as a **CSS variable**, then the design system
points its own tokens at those variables.

```tsx
// app/layout.tsx
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // non-variable font → weights are required
  variable: "--font-ibm-plex-mono",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html
      className={cn(
        spaceGrotesk.variable,
        ibmPlexMono.variable,
        inter.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
```

```css
/* landing.css — bridge next/font variables → design tokens */
.qap {
  --font-display: var(--font-space-grotesk), "Space Grotesk", sans-serif;
  --font-body: var(--font-sans), "Inter", sans-serif;
  --font-mono: var(--font-ibm-plex-mono), "IBM Plex Mono", monospace;
}
```

**Gotcha:** variable fonts (Space Grotesk, Inter) need only `subsets`. Static
fonts (IBM Plex Mono) **require an explicit `weight` array**, or the build fails.

---

## 5. Theme switching: `data-theme` on the wrapper, not `<html>`

The original HTML toggled `data-theme` on `<html>`. shadcn toggles a `.dark`
**class** on `<html>`. To avoid interfering with shadcn's theme, put the design
system's theme on the **wrapper**:

```tsx
const rootRef = useRef<HTMLDivElement>(null);
const applyTheme = (next: "dark" | "light") => {
  rootRef.current?.setAttribute("data-theme", next); // drives .qap[data-theme=…]
  localStorage.setItem("qap-theme", next);
};
```

The light/dark token overrides then key off `.qap[data-theme="light"]`. The two
theme systems are fully independent — flipping the landing theme never touches
shadcn components elsewhere.

---

## 6. Porting vanilla `app.js` behavior to React

Hand-written sites ship an IIFE that wires `addEventListener` / `IntersectionObserver`
against `document`. In React, move each concern into a `useEffect` and **always
return a cleanup** (React StrictMode runs effects twice in dev — without cleanup
you double-bind listeners):

```tsx
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll); // ← cleanup
}, []);
```

Mapping used in this port:

| vanilla `app.js`                    | React equivalent                              |
| ----------------------------------- | --------------------------------------------- |
| `nav.classList.toggle("scrolled")`  | `useState` + conditional `className`          |
| mobile menu open/close              | `useState(menuOpen)` + scroll-lock effect     |
| `IntersectionObserver` (scroll-spy) | effect that observes sections; `disconnect()` |
| `.fade-up` reveal observer          | effect querying `rootRef`; adds `.visible`    |
| animated stat counters              | effect + `requestAnimationFrame`              |
| smooth-scroll anchor links          | `onClick` handler computing scroll offset     |

Scope DOM queries to the wrapper (`rootRef.current.querySelectorAll(...)`) rather
than `document`, so the effects only touch the landing subtree.

> Note: direct DOM manipulation inside effects is fine for a faithful port. Where
> a value drives rendering (theme icon, `scrolled`, `menuOpen`) keep it in React
> state; where it's purely visual class-toggling on many nodes (`.fade-up`,
> `.active`), toggling `classList` is simpler than lifting it all into state.

---

## 7. Checklist for the next section / next port

- [ ] Add new CSS under `.qap …` selectors only — never bare `:root`/`body`/`.class`.
- [ ] Namespace any new `@keyframes` (`qap-*`).
- [ ] Reference tokens via `var(--…)`; they inherit from `.qap` automatically.
- [ ] Keep markup class names identical to the source HTML for 1:1 fidelity.
- [ ] Any new interactive behavior → a `useEffect` with a cleanup return.
- [ ] New fonts → `next/font` variable, bridged in the `.qap` token block.

---

## 8. Files involved in this project

| File              | Role                                                           |
| ----------------- | -------------------------------------------------------------- |
| `app/globals.css` | Tailwind v4 + shadcn tokens (untouched by the design system)   |
| `app/landing.css` | The `modern-qa` design system, scoped under `.qap`             |
| `app/layout.tsx`  | Loads fonts via `next/font`, exposes them as CSS variables     |
| `app/page.tsx`    | `<div className="qap">` markup + behavior ported from `app.js` |

**One-line summary:** _Keep your custom CSS in a normal global stylesheet, but
scope every selector under a single wrapper class (`.qap`) so its tokens inherit
to the subtree instead of overwriting the app's shadcn/Tailwind `:root` tokens._
