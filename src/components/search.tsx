"use client";

import Input from "@/components/ui/Input";
import Icon from "../assets/icons/search.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("search")
    ? searchParams.get("search")
    : "";

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const searchQuery = e.currentTarget.value;

      const params = new URLSearchParams(searchParams);

      if (!searchQuery) {
        params.delete("search");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        return;
      }

      params.set("search", searchQuery);
      params.set('page', '1');

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <div className={cn("flex h-10 items-center", className)}>
      <Image
        src={Icon}
        alt="Search Icon"
        width={20}
        height={20}
        className="relative -right-0.5 aspect-square h-5 w-5"
      />
      <Input
        className="-ml-6 w-full py-2 pl-8"
        placeholder="Search to find a video "
        onKeyDown={handleSearch}
        defaultValue={searchQuery as string}
      />
    </div>
  );
}
