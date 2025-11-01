import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        src="/logo.png"
        alt="Logo Image"
        width={2000}
        height={2000}
        className="h-12 w-12"
      />
    </Link>
  );
}
