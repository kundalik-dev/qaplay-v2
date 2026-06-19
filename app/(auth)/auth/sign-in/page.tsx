import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — QA Playground",
  description: "Sign in to your QA Playground account.",
};

export default function SignInPage() {
  return (
    // Suspense required because SignInForm calls useSearchParams()
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
