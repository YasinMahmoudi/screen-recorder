import Spinner from "@/components/Spinner";
import React from "react";

export default function laoding() {
  return (
    <div className="flex h-screen items-center justify-center bg-violet-500">
      <Spinner />
    </div>
  );
}
