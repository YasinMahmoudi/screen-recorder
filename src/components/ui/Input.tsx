import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  className?: string;
};

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "rounded-full border border-gray-300 px-3 py-1.5 text-xs w-60 font-normal text-gray-700 outline-0 placeholder:text-[10px] placeholder:text-gray-400 placeholder:font-extralight focus-visible:ring focus-visible:ring-gray-100 focus-visible:ring-offset-1 sm:text-sm sm:placeholder:text-sm",
        className,
      )}
      placeholder="Search anything..."
      {...props}
    />
  );
}
