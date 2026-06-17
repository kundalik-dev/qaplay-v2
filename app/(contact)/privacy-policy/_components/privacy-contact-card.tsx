import { ArrowRight, Globe, Mail, MessageSquareText } from "lucide-react";
import Link from "next/link";

import type {
  PrivacyContactMethod,
  privacyPolicyContact,
} from "@/data/privacy-policy/privacy-policy-data";

const iconMap = {
  mail: Mail,
  message: MessageSquareText,
  globe: Globe,
} as const;

// Static class maps — Tailwind needs full class names at build time.
const toneClasses: Record<
  PrivacyContactMethod["tone"],
  { iconWrap: string; hoverBorder: string }
> = {
  rose: {
    iconWrap: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
    hoverBorder: "hover:border-rose-300/60 dark:hover:border-rose-900/70",
  },
  sky: {
    iconWrap: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
    hoverBorder: "hover:border-sky-300/60 dark:hover:border-sky-900/70",
  },
  emerald: {
    iconWrap: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-300/60 dark:hover:border-emerald-900/70",
  },
};

function ContactMethod({ method }: { method: PrivacyContactMethod }) {
  const Icon = iconMap[method.icon];
  const tone = toneClasses[method.tone];

  return (
    <Link
      href={method.href}
      {...(method.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      data-testid={`privacy-contact-${method.id}`}
      className={`group rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md ${tone.hoverBorder}`}
    >
      <span
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${tone.iconWrap}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="block text-sm font-semibold text-foreground">
        {method.label}
      </span>
      {method.value ? (
        <span className="mt-2 block text-sm leading-6 break-words text-muted-foreground">
          {method.value}
        </span>
      ) : null}
      {method.cta ? (
        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
          {method.cta}
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      ) : null}
    </Link>
  );
}

export function PrivacyContactCard({
  data,
}: {
  data: typeof privacyPolicyContact;
}) {
  return (
    <section
      id={data.id}
      data-section={data.id}
      data-testid="privacy-contact"
      className="mt-12 scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="border-b border-border bg-muted/40 px-6 py-6 sm:px-8">
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">
          {data.eyebrow}
        </p>
        <h2 className="text-2xl font-bold text-foreground">{data.title}</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
          {data.description}
        </p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
        {data.methods.map((method) => (
          <ContactMethod key={method.id} method={method} />
        ))}
      </div>
    </section>
  );
}
