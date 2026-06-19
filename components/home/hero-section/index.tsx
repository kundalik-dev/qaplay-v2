import { Mic, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { ButtonContent } from "@/components/ui/button-components";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

import shared from "../shared/home-shared.module.css";
import styles from "./hero-section.module.css";
import { heroStats } from "@/data/home/hero-section-data";

export function HomeHero() {
  return (
    <section
      className={styles.section}
      aria-labelledby="home-hero-title"
      data-testid="home-hero"
      data-section="hero"
      data-supported-frameworks="playwright selenium cypress"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className="home-shell">
        <div className={styles.copy}>
          <TagLine />

          <HeroSectionMobile />
          <HeroSection />
          {/* <HeroSection4 /> */}

          <BtnStatsSection />
        </div>
      </div>
    </section>
  );
}

// Old Design Iteration of Hero Section - 1
const HeroSection = () => {
  return (
    <div className="hidden md:block">
      <h1 id="home-hero-title" className={styles.title}>
        The Only <br /> <span className="text-primary">Automation</span>
        <br />
        <span className="text-primary">Playground </span>
        You <br />
        <span className={cn(styles.titleNowrap, "max-[364px]:text-[44px]")}>
          Need to Practice
        </span>
      </h1>
      <p className={styles.description}>
        Stop Reading. Start Automating. Practice Selenium, Playwright &amp;
        Cypress with 14+ interactive UI elements, demo apps and rehersal
        AI-powered mock interviews.
      </p>{" "}
    </div>
  );
};

// Button group and Stats Old section

const BtnStatsSection = () => {
  return (
    <div>
      <ButtonGroup
        variant="home"
        className={cn(styles.actions, "lg:pb-4 2xl:pb-0")}
        data-testid="home-hero-actions"
      >
        <Link
          href="/practice"
          className={buttonVariants({
            variant: "homePrimary",
            size: "home",
          })}
          data-testid="hero-start-practicing"
          data-cta="start-practicing"
        >
          <ButtonContent icon={<Play className="size-4" />}>
            Start Practicing Free
          </ButtonContent>
        </Link>
        <Link
          href="#features"
          className={buttonVariants({
            variant: "homeSecondary",
            size: "home",
          })}
          data-testid="hero-see-features"
          data-cta="see-features"
        >
          <ButtonContent
            icon={<Sparkles className="size-4" />}
            iconPosition="end"
          >
            See what&apos;s inside
          </ButtonContent>
        </Link>
        <Link
          href="#interview"
          className={buttonVariants({ variant: "homeGhost", size: "home" })}
          data-testid="hero-mock-interview"
          data-cta="mock-interview"
        >
          <ButtonContent icon={<Mic className="size-4" />}>
            Mock Interview
          </ButtonContent>
        </Link>
      </ButtonGroup>

      <div
        className={styles.stats}
        aria-label="QA Playground highlights"
        data-testid="home-hero-stats"
      >
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className={styles.stat}
            data-testid={`hero-stat-${stat.label.toLowerCase().replaceAll(" ", "-")}`}
            data-stat-label={stat.label.toLowerCase().replaceAll(" ", "-")}
          >
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Old Tagline
const TagLine = () => {
  return (
    <div className="hidden md:block">
      {/* Tag line Old*/}
      <div className={cn(shared.eyebrow)} data-testid="home-hero-eyebrow">
        <span className={shared.eyebrowDot} aria-hidden="true" />
        Free for QA Engineers - 10,000+ Practitioners
      </div>
    </div>
  );
};

// My Design Iteration of Hero Section - 1
const HeroSection1 = () => {
  return (
    <div>
      {/* Tag line Old*/}
      <div className={shared.eyebrow} data-testid="home-hero-eyebrow">
        <span className={shared.eyebrowDot} aria-hidden="true" />
        Free for QA Engineers - 10,000+ Practitioners
      </div>
      <h1
        id="home-hero-title"
        className={cn(
          styles.title2,
          "pb-2 text-4xl leading-tight font-bold md:text-2xl lg:text-6xl",
        )}
        data-testid="home-hero-title"
      >
        The Only <br /> <span className="text-primary">Automation</span>
        <br />
        <span className="text-primary">Playground </span>
        <br />
        You <br />
        <span className="">Need to </span> <br /> Practice
      </h1>
      <p
        className="md:text-md pt-2 pb-2 text-sm lg:text-lg"
        data-testid="home-hero-description"
      >
        Stop Reading. Start Automating. Practice Selenium, Playwright &amp;
        Cypress with 14+ interactive UI elements, demo apps and rehersal
        AI-powered mock interviews.
      </p>
    </div>
  );
};

// New Design Iteration of Hero Section - 2 (Current Live Version)
const HeroSection2 = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        {/* Tagline Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D3E0EA] bg-[#EBF1F6] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#4E6178] uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10B981]"></span>
          Free for QA Engineers • 10,000+ Practitioners
        </div>

        {/* Optimized Logo-Type Heading */}
        <h1
          id="home-hero-title"
          className={cn(
            styles.title2,
            "font-black tracking-tight text-balance text-[#0F172A] select-none",
            "text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-[72px]",
          )}
          data-testid="home-hero-title"
        >
          The Only{" "}
          <span className="bg-gradient-to-r from-[#1f5f6b] to-[#2a7a8a] bg-clip-text text-[#1f5f6b] text-transparent">
            Automation
          </span>
          <br className="hidden sm:block" />
          <span className="relative mt-1 inline-block px-2 text-[#1f5f6b]">
            Playground
            <span className="absolute inset-0 -z-10 -rotate-1 rounded-md bg-[#1f5f6b]/5"></span>
          </span>{" "}
          You Need to Practice
        </h1>

        {/* Subtitle Description */}
        <p
          className="mt-6 max-w-2xl text-sm leading-relaxed font-normal text-balance text-[#475569] sm:text-base md:text-lg"
          data-testid="home-hero-description"
        >
          <span className="font-semibold text-[#0F172A]">
            Stop Reading. Start Automating.
          </span>{" "}
          Practice Selenium, Playwright &amp; Cypress with 14+ interactive UI
          elements, demo apps, and rehearsal AI-powered mock interviews.
        </p>

        {/* Primary CTA Action Grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f5f6b] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#1f5f6b]/20 transition-all hover:bg-[#16444d]">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Practicing Free
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition-all hover:border-[#CBD5E1]">
            See what's inside
            <svg
              className="h-4 w-4 text-[#64748B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C7D2FE]/50 bg-[#EEF2FF] px-5 py-3 text-sm font-medium text-[#4F46E5] transition-all hover:bg-[#E0E7FF]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Mock Interview
          </button>
        </div>

        {/* Metrics Board */}
        <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-[#E2E8F0]/60 pt-8 sm:grid-cols-4 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              10K+
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Active Engineers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              22+
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Practice Elements
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              AI x7
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Interview Agents
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              100%
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Always Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Third Herosection design

const HeroSection3 = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        {/* Tagline Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D3E0EA] bg-[#EBF1F6] px-3 py-1 text-[11px] font-semibold tracking-wider text-[#4E6178] uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#10B981]"></span>
          Free for QA Engineers • 10,000+ Practitioners
        </div>

        {/* Optimized Logo-Type Heading */}
        <h1
          id="home-hero-title"
          className={cn(
            styles.title2,
            "font-black tracking-tight text-balance text-[#0F172A] select-none",
            "text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-[72px]",
          )}
          data-testid="home-hero-title"
        >
          The Only{" "}
          <span className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-[#1E40AF] text-transparent">
            Automation
          </span>
          <br className="hidden sm:block" />
          <span className="relative mt-1 inline-block px-2 text-[#1E40AF]">
            Playground
            <span className="absolute inset-0 -z-10 -rotate-1 rounded-md bg-[#1E40AF]/5"></span>
          </span>{" "}
          You Need to Practice
        </h1>

        {/* Subtitle Description */}
        <p
          className="mt-6 max-w-2xl text-sm leading-relaxed font-normal text-balance text-[#475569] sm:text-base md:text-lg"
          data-testid="home-hero-description"
        >
          <span className="font-semibold text-[#0F172A]">
            Stop Reading. Start Automating.
          </span>{" "}
          Practice Selenium, Playwright &amp; Cypress with 14+ interactive UI
          elements, demo apps, and rehearsal AI-powered mock interviews.
        </p>

        {/* Primary CTA Action Grid */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E3A8A] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#1E3A8A]/20 transition-all hover:bg-[#1D4ED8]">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Practicing Free
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-medium text-[#334155] transition-all hover:border-[#CBD5E1]">
            See what's inside
            <svg
              className="h-4 w-4 text-[#64748B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#C7D2FE]/50 bg-[#EEF2FF] px-5 py-3 text-sm font-medium text-[#4F46E5] transition-all hover:bg-[#E0E7FF]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Mock Interview
          </button>
        </div>

        {/* Metrics Board */}
        <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-8 border-t border-[#E2E8F0]/60 pt-8 sm:grid-cols-4 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              10K+
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Active Engineers
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              22+
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Practice Elements
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              AI x7
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Interview Agents
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black tracking-tight text-[#0F172A] sm:text-3xl">
              100%
            </span>
            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#64748B] uppercase">
              Always Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fourt Herosection design - In Pr

const HeroSection4 = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-12 text-center selection:bg-[#1f5f6b]/10 selection:text-[#1f5f6b]">
        {/* Floating Feature Pill */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-slate-50 px-3.5 py-1.5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.02]">
          <span className="flex h-2 w-2 rounded-full bg-[#1f5f6b] shadow-[0_0_8px_#1f5f6b]"></span>
          <span className="font-mono text-[11px] font-bold tracking-widest text-slate-600 uppercase">
            v2.0 Platform • 10k+ Engineers
          </span>
        </div>

        {/* Editorial Typographic Heading */}
        <h1
          id="home-hero-title"
          className={cn(
            styles.title2,
            "max-w-4xl font-extrabold tracking-tight text-balance text-slate-900 select-none",
            "text-4xl leading-[1.02] sm:text-6xl lg:text-[76px]",
          )}
          data-testid="home-hero-title"
        >
          The Only
          <span className="relative mx-3 inline-block bg-gradient-to-r from-[#1f5f6b] to-[#2a7a8a] bg-clip-text text-transparent">
            Automation
          </span>
          <br className="hidden md:block" />
          <span className="mx-1 my-1 inline-block rounded-2xl bg-[#1f5f6b] px-4 py-1 text-white shadow-xl shadow-[#1f5f6b]/10 dark:shadow-none">
            Playground
          </span>
          You Need to Practice
        </h1>

        {/* Modern Minimal Description */}
        <p
          className="mt-8 max-w-2xl text-base leading-relaxed font-normal text-balance text-slate-500 sm:text-lg md:text-xl"
          data-testid="home-hero-description"
        >
          <span className="font-semibold text-slate-800 underline decoration-[#1f5f6b]/30 decoration-2 underline-offset-4">
            Stop Reading. Start Automating.
          </span>{" "}
          Practice Selenium, Playwright &amp; Cypress with 14+ interactive UI
          elements, demo apps, and rehearsal AI-powered mock interviews.
        </p>

        {/* Premium Segmented Controls / CTAs */}
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5f6b] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1f5f6b]/20 transition-all hover:bg-[#16444d] active:scale-[0.98] sm:w-auto">
            <svg
              className="h-4 w-4 fill-current text-white/80"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Practicing Free
          </button>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:w-auto">
            See what's inside
          </button>

          <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D3E0EA]/40 bg-[#EBF1F6] px-6 py-3.5 text-sm font-semibold text-[#1f5f6b] transition-all hover:bg-[#D3E0EA] active:scale-[0.98] sm:w-auto">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            Mock Interview
          </button>
        </div>

        {/* Flat High-Contrast Stats Banner */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-6 backdrop-blur-sm md:grid-cols-4 md:gap-4">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              10K+
            </span>
            <span className="mt-1.5 font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Engineers
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 max-md:border-none">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              22+
            </span>
            <span className="mt-1.5 font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              UI Elements
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 max-md:border-none">
            <span className="text-3xl font-extrabold tracking-tight text-[#1f5f6b]">
              AI ×7
            </span>
            <span className="mt-1.5 font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Agents
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-slate-200/60 p-2 max-md:border-none">
            <span className="text-3xl font-extrabold tracking-tight text-emerald-600">
              100%
            </span>
            <span className="mt-1.5 font-mono text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Always Free
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hero Section Design Iteration - 5
const HeroSection5 = () => {
  return (
    <div>
      <h1 id="home-hero-title" className={styles.title}>
        The Only <span className="text-primary">Automation</span>
        <br />
        <span className="text-primary">Playground </span>
        You <br />
        <span className={cn(styles.titleNowrap, "max-[364px]:text-[44px]")}>
          Need to Practice
        </span>
      </h1>
      <p className={styles.description}>
        Stop Reading. Start Automating. Practice Selenium, Playwright &amp;
        Cypress with 14+ interactive UI elements, demo apps and rehersal
        AI-powered mock interviews.
      </p>{" "}
    </div>
  );
};

// Hero Section Design Iteration - 5
const HeroSectionMobile = () => {
  return (
    <div className="md:hidden">
      <h1
        id="home-hero-mobile-title"
        className="pb-3 text-center text-[40px] leading-tight font-bold"
      >
        <span> The Only</span> <br />{" "}
        <span className="text-primary">Automation</span>
        <br />
        <span className="text-primary">Playground </span>
        You <span className="text-muted-foreground"> Need to Practice</span>
      </h1>
      <p className="text-sm md:text-lg">
        Stop Reading. Start Automating. Practice Selenium, Playwright &amp;
        Cypress with 14+ interactive UI elements, demo apps and rehersal
        AI-powered mock interviews.
      </p>
    </div>
  );
};
