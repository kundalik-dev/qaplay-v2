"use client";

import { useRef, useSyncExternalStore } from "react";

import styles from "./nav.module.css";

const THEME_REVEAL_DURATION = 760;
const THEME_ICON_DURATION = 620;

function dispatchThemeChange() {
  window.dispatchEvent(new Event("qap-theme-change"));
}

function setTheme(isDark: boolean) {
  const html = document.documentElement;
  html.classList.toggle("dark", isDark);

  try {
    const settings = JSON.parse(localStorage.getItem("qap_settings") || "{}");
    settings.theme = isDark ? "dark" : "light";
    localStorage.setItem("qap_settings", JSON.stringify(settings));
  } catch {}

  dispatchThemeChange();
}

function clearThemeTransitionLayers() {
  document.querySelectorAll(".theme-transition-layer").forEach((layer) => {
    layer.remove();
  });
}

function setThemeTransitionGeometry(button: HTMLButtonElement) {
  const html = document.documentElement;
  const rect = button.getBoundingClientRect();
  const originX =
    rect.left + rect.width / 2 >= window.innerWidth / 2 ? window.innerWidth : 0;
  const originY =
    rect.top + rect.height / 2 >= window.innerHeight / 2
      ? window.innerHeight
      : 0;
  const farthestX = Math.max(originX, window.innerWidth - originX);
  const farthestY = Math.max(originY, window.innerHeight - originY);
  const finalRadius = Math.hypot(farthestX, farthestY);

  html.style.setProperty("--theme-origin-x", `${originX}px`);
  html.style.setProperty("--theme-origin-y", `${originY}px`);
  html.style.setProperty("--theme-final-radius", `${finalRadius}px`);

  return { originX, originY, finalRadius };
}

function runThemeReveal(
  nextDark: boolean,
  button: HTMLButtonElement,
  timeoutRefs: { revealTimerRef: { current: number | null } },
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTheme(nextDark);
    return;
  }

  const html = document.documentElement;
  const geometry = setThemeTransitionGeometry(button);
  const nextThemeClass = nextDark ? "to-dark" : "to-light";

  if ("startViewTransition" in document) {
    html.classList.add("theme-transition-active");

    const transition = (
      document as Document & {
        startViewTransition?: (updateCallback: () => void) => {
          finished: Promise<void>;
        };
      }
    ).startViewTransition?.(() => {
      setTheme(nextDark);
    });

    if (transition) {
      transition.finished.finally(() => {
        html.classList.remove("theme-transition-active");
      });
      return;
    }
  }

  clearThemeTransitionLayers();

  const layer = document.createElement("span");
  layer.className = `theme-transition-layer ${nextThemeClass}`;
  layer.style.setProperty("--theme-origin-x", `${geometry.originX}px`);
  layer.style.setProperty("--theme-origin-y", `${geometry.originY}px`);
  layer.style.setProperty("--theme-final-radius", `${geometry.finalRadius}px`);
  document.body.appendChild(layer);

  requestAnimationFrame(() => {
    layer.classList.add("is-active");
  });

  if (timeoutRefs.revealTimerRef.current) {
    window.clearTimeout(timeoutRefs.revealTimerRef.current);
  }

  timeoutRefs.revealTimerRef.current = window.setTimeout(
    () => {
      setTheme(nextDark);
    },
    Math.round(THEME_REVEAL_DURATION * 0.38),
  );

  layer.addEventListener(
    "animationend",
    () => {
      layer.remove();
    },
    { once: true },
  );
}

function SunIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function NavThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);
  const isDark = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("qap-theme-change", onStoreChange);
      return () =>
        window.removeEventListener("qap-theme-change", onStoreChange);
    },
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  const toggle = () => {
    const button = buttonRef.current;
    if (!button) return;

    const nextDark = !document.documentElement.classList.contains("dark");

    button.classList.remove(styles.themeToggleSwitching);
    void button.offsetWidth;
    button.classList.add(styles.themeToggleSwitching);

    runThemeReveal(nextDark, button, { revealTimerRef });

    if (iconTimerRef.current) {
      window.clearTimeout(iconTimerRef.current);
    }
    iconTimerRef.current = window.setTimeout(() => {
      button.classList.remove(styles.themeToggleSwitching);
    }, THEME_ICON_DURATION);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      className={styles.themeToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={styles.themeToggleIcon}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}
