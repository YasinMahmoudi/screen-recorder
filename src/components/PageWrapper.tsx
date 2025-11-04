import { cn } from "@/lib/utils";
import React from "react";

export default function PageWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "mx-auto my-4 max-w-7xl px-4 py-2 md:px-8 md:py-4",
        className,
      )}
    >
      {children}
    </main>
  );
}
