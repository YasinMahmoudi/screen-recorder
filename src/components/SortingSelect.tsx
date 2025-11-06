"use client";

import React from "react";
import SelectWithIcon from "@/components/SelectWithIcon";
import HambergurIcon from "../assets/icons/hamburger.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const items = [
  {
    label: "Most recent",
    value: "moset-recent",
  },
  {
    label: "Oldest first",
    value: "oldest-first",
  },
  {
    label: "Most viewed",
    value: "most-viewed",
  },
  {
    label: "Least viewed",
    value: "least-viewed",
  },
];

export default function SortingSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(filter: string) {
    const params = new URLSearchParams(searchParams);

    params.set("filter", filter);
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <SelectWithIcon
      triggerClassName="flex-[.75] sm:w-[180px] sm:flex-initial "
      items={items}
      iconSrc={HambergurIcon}
      value={searchParams.get("filter")!}
      onChange={(value: unknown) => handleSearch(value as unknown as string)}
    />
  );
}
