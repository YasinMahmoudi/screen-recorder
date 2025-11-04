import Input from "@/components/ui/Input";
import { useRef } from "react";
import { useController, type UseControllerProps } from "react-hook-form";
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
  options?: SelectItemType[];
  name: string;
  control: any;
};

const errorStateClassName = "border-rose-500  ring-rose-100!";

export default function Field({
  id,
  label,
  placeholder = "",
  as = "text",
  options = [],
  ...props
}: FieldProps) {
  const { control, name }: UseControllerProps = props;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const inputRef = useRef<any>(field.ref);

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
          ref={inputRef}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          className={`w-full ${error ? errorStateClassName : ""}`}
          aria-invalid={error ? "true" : "false"}
        />
      )}

      {as === "textarea" && (
        <textarea
          className={`min-h-30 resize-none rounded-xl border border-gray-200 p-3 font-normal outline-none placeholder:text-xs placeholder:text-gray-400 ${error?.message ? errorStateClassName : ""}`}
          id={id}
          placeholder={placeholder}
          ref={inputRef}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={error ? "true" : "false"}
        />
      )}

      {as === "select" && (
        <SelectWithIcon
          id={id}
          triggerClassName={`flex-[.75] sm:w-full sm:flex-initial ${error ? errorStateClassName : ""}`}
          items={options}
          selectTriggerRef={inputRef}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}

      {error && (
        <small
          className="mt-0.5 ml-2 text-[10px] font-normal text-rose-500"
          role="alert"
        >
          {error?.message}
        </small>
      )}
    </div>
  );
}
