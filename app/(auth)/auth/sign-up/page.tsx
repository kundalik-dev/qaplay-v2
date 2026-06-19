import type { Metadata } from "next";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
  title: "Create account — QA Playground",
  description: "Sign up to start practising automation on QA Playground.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
