"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import Image from "next/image";
import React from "react";
import HamburgerIcon from "../assets/icons/hamburger.svg";

export default function SortingSelect() {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  function handleChange(value: string) {
    setSelected(value);
  }

  const selectedItemClassNames = "bg-violet-500 text-white";

  return (
    <Select defaultValue={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] rounded-full border-gray-300 ring-offset-2 focus-visible:ring-gray-100">
        <div className="flex items-center gap-1">
          <Image src={HamburgerIcon} alt="Arrow Down Icon" />
          <SelectValue placeholder="Sort By" />
        </div>
      </SelectTrigger>
      <SelectContent className="border-gray-300">
        <SelectGroup>
          <SelectItem
            value="most-recent"
            className={selected === "most-recent" ? selectedItemClassNames : ""}
          >
            Most recent
          </SelectItem>
          <SelectItem
            value="oldest-first"
            className={
              selected === "oldest-first" ? selectedItemClassNames : ""
            }
          >
            Oldest first
          </SelectItem>
          <SelectItem
            value="most-viewed"
            className={selected === "most-viewed" ? selectedItemClassNames : ""}
          >
            Most viewed
          </SelectItem>
          <SelectItem
            value="last-viewed"
            className={selected === "last-viewed" ? selectedItemClassNames : ""}
          >
            Least viewed
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
