import React from "react";
import SelectWithIcon from "@/components/SelectWithIcon";
import HambergurIcon from "../assets/icons/hamburger.svg";


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
  return (
    <SelectWithIcon
      triggerClassName="flex-[.75] sm:w-[180px] sm:flex-initial "
      items={items}
      iconSrc={HambergurIcon}
    />
  );
}
