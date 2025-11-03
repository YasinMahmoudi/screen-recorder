import Input from "@/components/ui/Input";
import React from "react";
import SelectWithIcon from "./SelectWithIcon";

interface SelectItemType {
  icon?: string;
  label: string;
  value: string;
}

type FieldProps = {
  label: string;
  id: string;
  placeholder?: string;
  as?: "text" | "textarea" | "select";
  value?: string;
  options?: SelectItemType[];
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
};

export default function Field({
  id,
  label,
  placeholder = "",
  as = "text",
  value,
  onBlur,
  onChange,
  options = [],
}: FieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm text-gray-500 capitalize">
        {" "}
        {label}{" "}
      </label>

      {as === "text" && (
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full"
        />
      )}

      {as === "textarea" && (
        <textarea
          className="min-h-30 resize-none rounded-xl border border-gray-200 p-3 font-normal outline-none placeholder:text-xs placeholder:text-gray-400"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {as === "select" && (
        <SelectWithIcon
          id={id}
          triggerClassName="flex-[.75] sm:w-full sm:flex-initial "
          items={options}
        />
      )}
    </div>
  );
}
