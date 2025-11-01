import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Link from "next/link";

export default function MainNav() {
  return (
    <header className="flex items-center justify-between border-b border-b-gray-200 px-4 py-3">
      <Logo />

      <div className="self-center rounded-sm border border-none bg-white p-1 shadow">
        <Link
          href="/test"
          className="block rounded-sm bg-linear-90 from-violet-700 to-indigo-600 p-1 text-sm text-white"
        >
          {" "}
          Test Page{" "}
        </Link>
      </div>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
