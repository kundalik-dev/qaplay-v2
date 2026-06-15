# QA Playground — Design System (Base Reference)

> **Source of truth:** `html/02-c-green-UI-advance-UI-changes.html`
> **Purpose:** This is the **master design file** for the whole app. Every new page, component, and screen should pull its tokens, typography, spacing, and component patterns from here so the product stays visually consistent. Copy the CSS variables block verbatim into the global stylesheet.

---

## 1. Brand & Theme Philosophy

- **Identity:** Developer/QA-engineer tooling — terminal-inspired, technical, "green-on-dark" hacker aesthetic with a calm light alternative.
- **Default theme:** Resolved on load from `localStorage("qap-theme")`, falling back to system `prefers-color-scheme`. Set on `<html data-theme="dark|light">`.
- **Accent system:** A primary green plus two supporting accents (purple, orange) used to color-code feature categories.
- **Texture:** A faint fixed grid overlay sits behind all content for a "blueprint / IDE" feel.

---

## 2. Color Tokens

Drop these into `:root` and `html[data-theme="light"]`. **Never hardcode hex values in components** — always reference the variable.

### Dark (default)

```css
:root {
  --bg: #0a0c10;
  --bg2: #0f1117;
  --surface: #161b24;
  --surface2: #1e2433;
  --border: rgba(255, 255, 255, 0.07);
  --border-glow: rgba(0, 255, 170, 0.25);

  --accent: #00ffaa; /* primary green   */
  --accent2: #7b61ff; /* purple          */
  --accent3: #ff6b35; /* orange          */

  --text: #e8edf5;
  --text-muted: #7a8499;
  --text-dim: #4a5266;

  --glow: 0 0 40px rgba(0, 255, 170, 0.15);
  --glow-strong: 0 0 60px rgba(0, 255, 170, 0.3);
  --grid-line: rgba(0, 255, 170, 0.03);
  --nav-bg: rgba(10, 12, 16, 0.85);
  --hero-glow-1: rgba(0, 255, 170, 0.08);
  --hero-glow-2: rgba(123, 97, 255, 0.05);
  --trust-bg: var(--bg2);
}
```

### Light

```css
html[data-theme="light"] {
  --bg: #f3f7f4;
  --bg2: #e9f0eb;
  --surface: #ffffff;
  --surface2: #f4f8f5;
  --border: rgba(18, 28, 22, 0.1);
  --border-glow: rgba(18, 116, 76, 0.18);

  --accent: #0b8f62;
  --accent2: #6758dd;
  --accent3: #d9652f;

  --text: #111a14;
  --text-muted: #516158;
  --text-dim: #7b8a81;

  --glow: 0 18px 42px rgba(22, 67, 44, 0.08);
  --glow-strong: 0 24px 54px rgba(11, 143, 98, 0.16);
  --grid-line: rgba(11, 143, 98, 0.05);
  --nav-bg: rgba(243, 247, 244, 0.84);
  --trust-bg: rgba(255, 255, 255, 0.6);
}
```

### Semantic / Status Colors

| Meaning           | Color                   | Used for                                 |
| ----------------- | ----------------------- | ---------------------------------------- |
| Success / pass    | `#27c93f`               | Test pass, "Beginner" level, live dots   |
| Warning / pending | `#ffbd2e`               | "Intermediate" level, stars, "HR opened" |
| Danger / error    | `#ff5f56`               | Terminal red dot                         |
| Info / applied    | `#44d9e8`               | "Applied" stage, cyan category           |
| Advanced          | `var(--accent3)` orange | "Advanced" difficulty                    |

### Color-coding convention

Feature cards set `--card-color` (alias `--c`) per category and the card derives its icon, glow, top-bar, and hover tint from it via `color-mix()`:

```css
.feature-card {
  --c: var(--card-color, var(--accent));
}
/* icon bg */
background: color-mix(in srgb, var(--c) 11%, transparent);
/* icon border*/
border: 1px solid color-mix(in srgb, var(--c) 24%, transparent);
```

Use this pattern for any new categorized card — only swap `--card-color`.

---

## 3. Typography

```css
--font-display: "Syne", sans-serif; /* headings, numbers, buttons */
--font-body: "DM Sans", sans-serif; /* paragraphs, body copy      */
--font-mono: "JetBrains Mono", monospace; /* labels, tags, code, stats  */
```

Google Fonts import:

```
Syne:400,600,700,800 · DM Sans:300,400,500 + italic 300 · JetBrains Mono:400,500,700
```

### Type Scale

| Token              | Font    | Size                     | Weight | Notes                                                            |
| ------------------ | ------- | ------------------------ | ------ | ---------------------------------------------------------------- |
| Hero title         | Display | `clamp(42px, 5vw, 68px)` | 800    | line-height 1.05, letter-spacing -0.03em                         |
| Section title      | Display | `clamp(32px, 4vw, 48px)` | 800    | letter-spacing -0.03em                                           |
| CTA title          | Display | `clamp(36px, 5vw, 64px)` | 800    |                                                                  |
| Card / panel title | Display | 18–24px                  | 700    | letter-spacing -0.02em                                           |
| Body / sub         | Body    | 17px                     | 400    | line-height 1.6–1.7, color `--text-muted`                        |
| Card description   | Body    | 13–15px                  | 400    | line-height 1.65                                                 |
| Section tag        | Mono    | 11px                     | 400    | uppercase, letter-spacing 0.1em, color `--accent`, prefixed `//` |
| Eyebrow / badge    | Mono    | 10–11px                  | 400    | uppercase, letter-spacing 0.05–0.08em                            |
| Stat number        | Display | 28px                     | 800    | accent-colored `<span>` suffix                                   |

**Body defaults:** 16px, line-height 1.6, `overflow-x: hidden`.

---

## 4. Spacing, Radius & Layout

```css
--radius: 12px; /* inputs, pills, small cards */
--radius-lg: 20px; /* large cards, terminals, panels */
```

| Token                        | Value                                                           |
| ---------------------------- | --------------------------------------------------------------- |
| Content max-width            | `1200px`, centered                                              |
| Section side padding         | `0 48px` (desktop) → `0 24px` (≤900px)                          |
| Section vertical rhythm      | `100px 0` (most sections), `80–120px` hero                      |
| Section header bottom margin | `60px`                                                          |
| Grid gaps                    | features `2px` (border-revealing), cards `12–20px`, hero `80px` |
| Border radii for circles     | `50%` (avatars, step numbers, dots)                             |

**Layout primitives**

- `.section-inner` → `max-width:1200px; margin:0 auto; padding:0 48px`
- `.section-header` → tag + title + sub, `margin-bottom:60px`
- Grids: 3-col features, 4-col element pills, 5-col career/job steps, 2-col split sections.

---

## 5. Core Components

### 5.1 Navigation

- Fixed, full-width, `z-index:100`, `backdrop-filter: blur(20px)`, `--nav-bg`, bottom border.
- Padding `16px 48px`, **shrinks to `10px 48px` on scroll > 60px**.
- Logo: 32×32 accent badge (⚡) + display name. Links: mono 12px, hover → accent.
- Actions: 44×44 theme toggle + solid accent CTA.

### 5.2 Buttons

| Variant                     | Style                                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.btn-primary` / `.nav-cta` | Solid `--accent`, black text, display font 700, radius 8–10px. Hover: lift `-2px`, white bg, green glow shadow. _(Light theme: white text → dark on hover.)_ |
| `.btn-secondary`            | Transparent, `--text-muted`, 1px `--border`. Hover: border lightens, surface bg, text brightens.                                                             |

Buttons are inline-flex with `gap:8px` for leading icon/emoji.

### 5.3 Tag / Pill / Badge

- **Hero/CTA tag pill:** rounded-100px, faint accent bg + border, mono uppercase 11px, optional pulsing `.dot`.
- **Section tag:** mono 11px accent, prefixed with `//`.
- **Feature badge:** small rounded rect, `color-mix` of card color, mono uppercase 10px ("New", "Core Feature", "Free", "Coming Soon").

### 5.4 Card (the workhorse)

`.feature-card`:

- `--c` driven color; bg `--bg2`, hover → `--surface` + inset color ring.
- Animated top accent bar (`scaleX 0→1` on hover).
- Radial glow blob (`::after`) fades in on hover.
- Icon tile 52×52 (`color-mix` bg/border), springs up + scales on hover (`cubic-bezier(0.34,1.56,0.64,1)`).
- Title turns `--c` on hover; description muted; trailing mono link with arrow that widens its gap on hover.
- `.wide` modifier → `grid-column: span 2`, bigger icon/title.

Other card flavors reuse the same shell: `.testimonial-card`, `.jobs-panel`, `.offer-item`, `.chat-window`, `.terminal`, `.faq-item`. **All share:** `--surface` bg, 1px `--border`, `--radius-lg`, hover lift `-4px` + shadow + accent-tinted border.

### 5.5 Element Pill (compact link card)

`.element-pill`: surface bg, 12px gap, emoji icon + name + difficulty sub-label. Hover: lift `-2px`, accent border, shadow. Difficulty colors: Beginner green / Intermediate yellow / Advanced orange.

### 5.6 Terminal & Chat mockups

- **Terminal:** surface card with header (red/yellow/green dots + mono filename) and mono body; syntax tokens via `.t-green/.t-yellow/.t-purple`; blinking `.t-cursor`.
- **Chat window:** header (avatar + name + live dot + mode badge), body with `.chat-msg.ai` (left, surface) / `.chat-msg.user` (right, accent tint), `.chat-feedback` (purple-tinted), input row with mic.

Use these patterns whenever showing "proof"/demo content.

### 5.7 Stepper / Flow

`.career-steps` / `.jobs-flow`: equal columns over a horizontal gradient connector line (`::before`, hidden on mobile). Each step = circular/rounded number tile (lifts + glows on hover) + title + desc.

### 5.8 Accordion (FAQ)

`.faq-item`: surface card; `.faq-question` full-width button (display 700 16px) + `+` icon that rotates 45° → × when `.open`; `.faq-answer` animates `max-height 0 → scrollHeight`. Toggle also flips `aria-expanded`.

### 5.9 Stat block

`.stat-num` display 800 28px with accent `<span>` suffix; `.stat-label` mono 12px dim. Numbers **count up** on scroll into view.

### 5.10 Footer

4-col grid (`2fr 1fr 1fr 1fr`): brand blurb + 3 link columns; bottom bar mono 12px with copyright + accent links.

---

## 6. Effects & Motion

### Shadows / Glows

- Card shadow: `0 18px 48px rgba(0,0,0,0.35)` + `--glow` (dark) / soft green-tinted (light).
- Hover lift: `translateY(-2px to -4px)` + larger shadow.

### Keyframe library (reuse globally)

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
```

- **Scroll reveal:** add `.fade-up` (opacity 0 + translateY 28px); `IntersectionObserver` adds `.visible` with an 80ms stagger (threshold 0.1, rootMargin `0px 0px -40px 0px`).
- **Transitions:** standard `0.2–0.3s ease`; springy icon `cubic-bezier(0.34,1.56,0.64,1)`; accordion/bar `0.35–0.45s ease`.
- **Respect timing:** keep durations 200–600ms; avoid motion on large layout shifts.

### Decorative

- `body::before` fixed grid texture (40×40px, `--grid-line`).
- Section radial glows (`.hero-glow`, `.interview-glow`, `.cta-glow`) — large soft `radial-gradient` blobs, `pointer-events:none`, behind content.

---

## 7. Responsive Rules

Single breakpoint at **`max-width: 900px`**:

- Nav padding tightens; nav links hidden (mobile menu needed).
- All multi-col grids collapse: hero → 1col, features → 1col, elements → 2col, career/jobs → 2col, footer → 2col.
- Stepper connector lines (`::before`) hidden.
- Section padding → `24px`.

> When extending: design mobile-first from these collapse rules; add intermediate breakpoints (e.g. 600px) only where a 2-col grid still feels cramped.

---

## 8. Iconography & Voice

- **Icons:** Emoji-based (⚡🎯📊🎙️🏦💼🔌🛠️✍️🔍📄✨🚀). Keep one emoji per feature; pair with `--card-color`.
- **Section tags:** lowercase mono prefixed `//` (e.g. `// what we offer`).
- **Tone:** direct, confidence-building, action-led ("Stop reading. Start doing."). Short punchy headlines, benefit-driven subs. Always reinforce **free / no-login / in-browser**.

---

## 9. Accessibility Baseline

- `color-scheme` set per theme for native form/scrollbar theming.
- Theme toggle has `aria-label` + `title` that update with state.
- Accordion buttons use `aria-expanded`.
- Maintain text contrast: body copy uses `--text` / `--text-muted`, never `--text-dim` for long-form reading.
- Custom scrollbar: 6px, `--surface2` thumb.

---

## 10. How to Use This File

1. **Global stylesheet:** paste §2 tokens + §3 fonts + §6 keyframes + grid texture + scrollbar once.
2. **New page:** wrap content in `<section>` → `.section-inner` → `.section-header` (tag + title + sub), then a grid of the relevant card component.
3. **New component:** start from the closest existing shell (§5) — reuse `--surface`, `--border`, `--radius-lg`, hover-lift pattern, and `--card-color` for category color.
4. **Never** introduce a new raw hex, font, or radius without adding it as a token here first.
5. Keep both **dark and light** themes working — test every component under `data-theme="light"`.

---

### Related docs

- `02-c-green-UI-advance-UI-changes.md` — full content snapshot of the source page.
- `qaplayground-com-homepage-live.md` — live production homepage snapshot for comparison.
