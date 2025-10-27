import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

export default function MainNav() {
  return (
    <header className="flex justify-between border-b border-b-gray-200 h-16 px-4 py-3">
      <span className="text-xl">Logo</span>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
