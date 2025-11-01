import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo Image"
        width={2000}
        height={2000}
        className={cn("h-12 w-12", className)}
      />
    </Link>
  );
}
