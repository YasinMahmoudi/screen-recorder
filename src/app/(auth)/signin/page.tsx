import React from "react";
import AuthImage from "../_components/AuthImage";
import SignInForm from "@/components/SignInForm";

export default function Page() {
  return (
    <div className="grid h-[calc(100dvh-48px)] grid-cols-1 md:grid-cols-2">
      <AuthImage />

      <SignInForm />
    </div>
  );
}
