import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Link from "next/link";

export default function MainNav() {
  return (
    <header className="flex h-16 justify-between border-b border-b-gray-200 px-4 py-3">
      <span className="text-xl">Logo</span>

      <div className="border border-none shadow bg-white self-center rounded-sm p-1 ">
        <Link
          href="/test"
          className="bg-linear-90 from-violet-700 to-indigo-600 text-white block text-sm p-1 rounded-sm"
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
