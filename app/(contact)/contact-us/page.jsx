import {
  allUrls,
  basicDetails,
  socialHandles,
} from "@/data/meta-data/basic-details-data";
import Link from "next/link";
import React from "react";
import {
  Mail,
  Youtube,
  Github,
  Twitter,
  Clock,
  CheckCircle,
  MessageSquareText,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | QA Playground",
  description:
    "Have a question, suggestion, or want to collaborate? Reach out to the QA Playground team. We typically respond within 2 business days.",
  alternates: {
    canonical: `${basicDetails.websiteURL}/contact-us`,
  },
  openGraph: {
    title: "Contact Us | QA Playground",
    description:
      "Reach out to the QA Playground team for help with automation testing, collaboration, or general enquiries.",
    url: `${basicDetails.websiteURL}/contact-us`,
    siteName: basicDetails.websiteName,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | QA Playground",
    description:
      "Reach out to the QA Playground team for help with automation testing, collaboration, or general enquiries.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TOPICS_WE_HELP = [
  "Bug reports on any practice element",
  "Feature requests or suggestions",
  "Collaboration and partnerships",
  "Automation testing questions",
  "General platform feedback",
];

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    display: basicDetails.websiteEmail,
    href: `mailto:${basicDetails.websiteEmail}`,
    external: false,
  },
  {
    icon: Youtube,
    label: "YouTube",
    display: `@${socialHandles.youtubeId}`,
    href: allUrls.youtubeURL,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    display: socialHandles.githubId,
    href: allUrls.githubURL,
    external: true,
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    display: `@${socialHandles.twitterId}`,
    href: allUrls.twitterURL,
    external: true,
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp Community",
    display: "Join our community",
    href: allUrls.whatsappCommunityURL,
    external: true,
  },
];

const ContactUsPage = () => {
  return (
    <div className="space-y-10 bg-background text-foreground">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 px-8 py-12 text-white dark:from-slate-900 dark:to-black">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 translate-x-1/3 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 -translate-x-1/4 translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            <MessageSquareText className="h-3.5 w-3.5" />
            We reply within 2 business days
          </div>
          <h1 className="mb-3 text-3xl leading-tight font-bold sm:text-4xl">
            Get in Touch
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/70">
            Have a question, spotted a bug, or want to suggest a new practice
            element? We&apos;d love to hear from you. Fill in the form and
            we&apos;ll get back to you shortly.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form card — 2/3 width */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Send Us a Message</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                All fields marked <span className="text-red-500">*</span> are
                required.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Contact links */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-3">
              {CONTACT_LINKS.map(
                ({ icon: Icon, label, display, href, external }) => (
                  <Link
                    key={label}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group -mx-3 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                        {display}
                      </p>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Response time */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Response Time</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Typically within{" "}
              <strong className="text-foreground">2 business days</strong>. For
              urgent matters, mention it in the subject.
            </p>
          </div>

          {/* What we help with */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold">
              What We Can Help With
            </h3>
            <ul className="space-y-2">
              {TOPICS_WE_HELP.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
