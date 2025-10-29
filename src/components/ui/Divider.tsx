import { cn } from "@/lib/utils";
import React from "react";

export default function Divider({
  className,
  mode = 'horizontal',
}: {
  className?: string;
  mode?: "vertical" | "horizontal";
}) {
  const styles = mode === "horizontal" ? "my-2 h-px w-full" : "h-6 border-t-0 w-px";

  return <hr className={cn(`${styles} bg-gray-200`, className)} />;
}
