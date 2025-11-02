"use client"
import SignInForm from "@/components/SignInForm";
import { authClient } from "@/lib/auth-client";
import AuthImage from "../_components/AuthImage";

export default function Page() {
  const handleSignIn = async () => {
    return await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="grid h-[calc(100dvh-64px)] grid-cols-1 md:grid-cols-2">
      <AuthImage />

      <SignInForm onSignIn={handleSignIn} />
    </div>
  );
}
