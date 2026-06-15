---
version: v1
name: "QA Playground — Modern SaaS"
description: "Dark-first, glassmorphism SaaS design system for a QA engineer workflow product. Space Grotesk display type, Inter body, IBM Plex Mono labels, a green primary accent with purple/orange support, and an animated card-driven layout. Ships full dark + light themes via data-theme."
source: "Final-UI/05-modern-saas-design-UI/style.css"
target: "modern-qaplay/html-app/index.html (Next.js + shadcn/ui + Tailwind v4)"
themeStrategy: "data-theme on <html>; dark is default, light overrides"
fonts:
  display: '"Space Grotesk", "Syne", sans-serif'
  body: '"Inter", "DM Sans", sans-serif'
  mono: '"IBM Plex Mono", "JetBrains Mono", monospace'
  import: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
colors:
  dark:
    bg: "#0a0c10"
    bg2: "#0f1117"
    surface: "#161b24"
    surface2: "#1e2433"
    accent: "#00ffaa"
    accent2: "#7b61ff"
    accent3: "#ff6b35"
    text: "#e8edf5"
    text-muted: "#7a8499"
    text-dim: "#4a5266"
    success: "#27c93f"
    warning: "#ffbd2e"
    danger: "#ff5f56"
    info: "#44d9e8"
  light:
    bg: "#f4f8fb"
    bg2: "#edf3f7"
    surface: "rgba(255,255,255,0.82)"
    surface2: "#ffffff"
    accent: "#1f5f6b"
    accent2: "#6758dd"
    accent3: "#d9652f"
    text: "#17324d"
    text-muted: "#597187"
    text-dim: "#8fa5b5"
typography:
  display:
    fontFamily: '"Space Grotesk", sans-serif'
    fontSize: "clamp(42px, 5vw, 68px)"
    fontWeight: "800"
    lineHeight: "0.95"
    letterSpacing: "-0.04em"
  section-title:
    fontFamily: '"Space Grotesk", sans-serif'
    fontSize: "clamp(32px, 4vw, 48px)"
    fontWeight: "700"
    lineHeight: "1.05"
    letterSpacing: "-0.04em"
  body-large:
    fontFamily: '"Inter", sans-serif'
    fontSize: "17px"
    fontWeight: "400"
    lineHeight: "1.75"
  body-default:
    fontFamily: '"Inter", sans-serif'
    fontSize: "15px"
    fontWeight: "400"
    lineHeight: "1.65"
  label-mono:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "11px"
    fontWeight: "700"
    lineHeight: "1.4"
    letterSpacing: "0.1em"
  stat-display:
    fontFamily: '"Space Grotesk", sans-serif'
    fontSize: "clamp(24px, 3vw, 36px)"
    fontWeight: "800"
    lineHeight: "1"
rounded:
  radius-sm: "8px"
  radius-md: "12px"
  radius-lg: "20px"
  radius-xl: "28px"
  radius-pill: "100px"
  radius-full: "999px"
spacing:
  sp-1: "6px"
  sp-2: "8px"
  sp-3: "10px"
  sp-4: "12px"
  sp-5: "14px"
  sp-6: "16px"
  sp-7: "18px"
  sp-8: "20px"
  sp-9: "24px"
  sp-10: "28px"
  sp-11: "48px"
  sp-12: "60px"
shadows:
  shadow-sm: "0 4px 16px rgba(0,0,0,0.25)"
  shadow-card: "0 18px 48px rgba(0,0,0,0.35)"
  shadow-float: "0 22px 50px rgba(0,0,0,0.40)"
  glow: "0 0 40px rgba(0,255,170,0.15)"
transitions:
  t-fast: "0.15s ease"
  t-base: "0.22s ease"
  t-slow: "0.35s ease"
  t-spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
layout:
  content-max: "1180px"
  section-pad-x: "48px"
  section-pad-y: "100px"
---

## Overview

QA Playground (Modern SaaS) is a **dark-first** design system for a QA
engineer workflow product: practice elements, AI mock interviews, a job
hunt hub/CRM, a career roadmap, and resources. It pairs terminal-style
technical credibility with glassmorphism SaaS polish.

**Signature traits:**

- Deep near-black surfaces with a faint accent grid texture and radial hero glows
- Bright **green** primary accent, with **purple** and **orange** support roles
- Tight, bold **Space Grotesk** display type over highly readable **Inter** body text
- **IBM Plex Mono** for labels, tags, metadata, and code-flavored UI
- Card-first layout with spring hover lifts, accent top-bars, and glow blobs
- A fully matched **light theme** (teal/slate) toggled via `data-theme`

This system ships **two themes**. Dark lives on `:root` (and
`[data-theme="dark"]`); light overrides under `[data-theme="light"]`.
Set the attribute on `<html>` before paint to avoid FOUC.

## Files in this folder

| File                | Purpose                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `css-variables.css` | Framework-agnostic source of truth — all tokens, both themes, plus shadcn semantic aliases. Original variable names preserved so existing component CSS works unchanged. |
| `tailwind.css`      | Tailwind v4 entry. Self-contained: ships the variables **and** maps them to utilities via `@theme inline`. Drop into `globals.css`.                                      |
| `design-token.md`   | Flat reference of every token with dark + light values and the Tailwind class each generates.                                                                            |
| `design.md`         | This guide.                                                                                                                                                              |

## Colors

A strong dark foundation with a bright green primary accent. In light
mode the green shifts to a deep teal and the surfaces become near-white
glass.

### Brand palette

| Role            | Dark      | Light     | Primary usage                                                       |
| --------------- | --------- | --------- | ------------------------------------------------------------------- |
| Primary brand   | `#00ffaa` | `#1f5f6b` | Main CTA, hero highlight, core brand emphasis                       |
| Secondary brand | `#7b61ff` | `#6758dd` | AI interview, secondary emphasis, alternate feature accents         |
| Tertiary brand  | `#ff6b35` | `#d9652f` | Advanced states, portfolio/bank-demo accents, supporting highlights |

The semantic mapping in `css-variables.css` is:

- `--primary` -> `var(--accent)`
- `--secondary` -> `var(--accent2)`
- `--accent-color` -> `var(--accent3)`

### Core palette (dark → light)

- **bg** `#0a0c10` → `#f4f8fb`: app background
- **bg2** `#0f1117` → `#edf3f7`: nested panels, top bars, terminal bodies
- **surface** `#161b24` → `rgba(255,255,255,0.82)`: default cards
- **surface2** `#1e2433` → `#ffffff`: inputs, badges, popovers
- **accent** `#00ffaa` → `#1f5f6b`: primary CTA, highlights, links
- **accent2** `#7b61ff` → `#6758dd`: secondary / interview accent
- **accent3** `#ff6b35` → `#d9652f`: advanced / tertiary accent
- **text** `#e8edf5` → `#17324d`: headings and key content
- **text-muted** `#7a8499` → `#597187`: body copy
- **text-dim** `#4a5266` → `#8fa5b5`: metadata, low-emphasis labels

### Status colors (shared in both themes)

- **success** `#27c93f`: pass, beginner, live presence
- **warning** `#ffbd2e`: intermediate, pending, alerts
- **danger** `#ff5f56`: destructive, failed, terminal red
- **info** `#44d9e8`: applied status, informational chips

### Accent mixing convention

Components tint accents with `color-mix(in srgb, var(--c) N%, transparent)`
and drive a local `--c` (or `--ic`, `--dc`, `--si`, `--ivv-color`) per card
so a single component shell can render in any accent role. Preserve this
pattern instead of hardcoding tinted hex values.

## Typography

Three functional families:

- **Space Grotesk** — display headings, stats, brand, buttons (falls back to Syne)
- **Inter** — body and interface copy (falls back to DM Sans)
- **IBM Plex Mono** — labels, tags, metadata, terminal/code (falls back to JetBrains Mono)

| Role             | Font          | Size                   | Weight  | Tracking        |
| ---------------- | ------------- | ---------------------- | ------- | --------------- |
| Display          | Space Grotesk | clamp(42px, 5vw, 68px) | 800     | -0.04em         |
| Section title    | Space Grotesk | clamp(32px, 4vw, 48px) | 700     | -0.04em         |
| Heading lg/md/sm | Space Grotesk | 36 / 20 / 16px         | 700     | -0.03 → -0.01em |
| Body large       | Inter         | 17px                   | 400     | —               |
| Body default     | Inter         | 15px                   | 400     | —               |
| Mono label       | IBM Plex Mono | 11–12px                | 400/700 | 0.06–0.12em     |
| Stat number      | Space Grotesk | clamp(24px, 3vw, 36px) | 800     | —               |

## Layout

Roomy spacing, layered glass surfaces, centered `1180px` content column,
and grid-driven sections (bento features, 2-col practice, 5-step flows,
vertical timeline, marquees).

### Spacing

12-step fixed scale `--sp-1 … --sp-12` (6px → 60px). In Tailwind these are
exposed as named utilities (`p-sp-6`, `gap-sp-4`) so the default numeric
scale is preserved.

### Responsive strategy

- **Desktop**: full multi-column bento + 2-col feature regions
- **≤ 900px**: nav collapses to hamburger; grids drop to 1–2 columns; bento → 2-col; padding tightens (`--section-pad-x: 24px`, `-y: 72px`)
- **≤ 600px**: most grids stack to 1 column; nav name hides; buttons full-width; padding tightens again (`16px / 56px`)

## Elevation & Motion

- Base transitions `0.15s` / `0.22s` / `0.35s`; springy hovers use `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Cards lift `2–4px` on hover with `shadow-card` + a 1px accent ring
- Icons scale `~1.06–1.12` with an accent-tinted drop shadow
- Accent **top-bars** scale in (`scaleX`), radial **glow blobs** fade in on hover
- Section entrances use `.fade-up` (opacity + 28px translate, toggled to `.visible` by an IntersectionObserver)
- Decorative `section-glow` / `hero-glow` blurred radials sit behind content at `z-index: 0`
- Honor `prefers-reduced-motion`: disable marquees, reveals, and toggle spins

## Shapes

- `radius-sm` 8px — small controls / badges
- `radius-md` 12px — inputs, icon boxes
- `radius-lg` 20px — mini cards, pills, panels
- `radius-xl` 28px — main cards, larger panels (CTA shell uses 32px)
- `radius-pill` 100px / `radius-full` 999px — tags, chips, dots, buttons

## Components

Patterns present in `index.html` and the source stylesheet:

- **Nav**: fixed floating blurred pill (`--nav-bg`), shrinks on scroll, animated theme toggle with a view-transition reveal, hamburger + mobile overlay
- **Buttons**: `btn-primary` (accent gradient), `btn-secondary` (bordered surface), `btn-ghost` (purple tint), `btn-danger`; `sm`/`lg` sizes
- **Tags/pills**: mono uppercase `eyebrow`, `badge`, `pill-*`, difficulty `chip-*`
- **Cards**: base `card`, `card-glass`, accent-driven `feature-card`, bento `fva-card` (grid placements), `mini-card`, `panel`
- **Practice**: 2-col `practice-layout` with difficulty cards + `element-pill` grid
- **Features**: `fva-grid` bento mosaic with explicit grid-area placements
- **Jobs**: 5-step `jobs-flow` with gradient connector + `jobs-panel` (incl. dashed "future" variant) and `crm-row` stages
- **AI Interview**: `iv1-grid` mini-bento + `iv-visualizer` (animated waveform bars, mic rings, score bar)
- **Career**: vertical `cp-timeline` with numbered nodes + connectors
- **Testimonials**: paused-on-hover `testi-marquee` with featured card variant
- **CTA**: glass `cta-shell` with radial accents, point list, metric tiles
- **FAQ**: sticky lead + glass `accordion`
- **Trust bar**: infinite `trustMarquee` with edge fade masks
- **Footer**: 4-col grid, masked SVG social icons

## shadcn/ui integration

`tailwind.css` maps the palette to shadcn's semantic tokens
(`--background`, `--foreground`, `--card`, `--primary`, `--secondary`,
`--muted`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`)
so generated shadcn components inherit the theme automatically. The
`dark:` variant is wired to `[data-theme="dark"]` via `@custom-variant`.

## Do's and Don'ts

| Do                                                       | Don't                                   |
| -------------------------------------------------------- | --------------------------------------- |
| Use tokens; tint accents via `color-mix` + a local `--c` | Hardcode tinted hex values              |
| Keep Space Grotesk for display, Inter for reading        | Set long body copy in mono or display   |
| Reuse card/panel/pill shells across modules              | Invent new accent colors or geometry    |
| Verify **both** themes before shipping a UI              | Assume dark-only; light is first-class  |
| Respect `prefers-reduced-motion`                         | Ship unconditional marquees/auto-motion |

## Agent prompt guide

1. Start from these tokens and theme variables — never raw hex.
2. Reuse the established card, bento, pill, and timeline patterns first.
3. Apply color by **semantic role** (primary/secondary/tertiary/status), not decoration.
4. Drive per-instance accent with a local `--c`-style variable + `color-mix`.
5. Keep the product feeling technical, structured, and credible.
6. Confirm dark **and** light rendering, plus reduced-motion, before calling a screen done.
