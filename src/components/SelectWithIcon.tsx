"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SelectItemType {
  icon?: string;
  label: string;
  value: string;
}

interface SelectProps {
  selectLabel?: string;
  triggerClassName?: string;
  iconSrc?: string;
  items: SelectItemType[];
}

export default function SelectWithIcon({
  selectLabel='Select on option',
  triggerClassName,
  iconSrc,
  items,
}: SelectProps) {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  function handleChange(value: string) {
    setSelected(value);
  }

  const selectedItemClassNames = "bg-violet-500 text-white";

  return (
    <Select defaultValue={selected} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "w-[180px] rounded-full border-gray-300 py-2.5 text-xs ring-offset-2 focus-visible:ring-gray-100 sm:text-sm",
          triggerClassName,
        )}
      >
        <div className="flex items-center gap-1">
          {iconSrc && <Image src={iconSrc} alt="Icon Button" />}

          <SelectValue placeholder={selectLabel} />
        </div>
      </SelectTrigger>
      <SelectContent className="border-gray-300 bg-white">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className={selected === item.value ? selectedItemClassNames : ""}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
