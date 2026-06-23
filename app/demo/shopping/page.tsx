import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";

export default function ShoppingDemoPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        {/* Glow effect behind icon */}
        <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-500/20 blur-xl"></div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl ring-1 shadow-blue-500/10 ring-slate-900/5 dark:bg-slate-900 dark:shadow-blue-500/20 dark:ring-white/10">
          <ShoppingBag className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 animate-bounce text-yellow-400" />
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Coming Soon
        </span>
      </h1>

      <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        We are crafting the ultimate Shopping Demo App for QA engineers. Soon,
        you'll be able to practice cart flows, product exploration, and complex
        checkout automations!
      </p>

      <Link
        href="/demo"
        className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Demo Apps
      </Link>
    </div>
  );
}
