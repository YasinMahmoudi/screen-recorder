import { cn } from "@/lib/utils";
import React from "react";

export default function Divider({ className }: { className?: string }) {
  return <hr className={cn(", h-px w-full border-gray-200 my-2", className)} />;
}
