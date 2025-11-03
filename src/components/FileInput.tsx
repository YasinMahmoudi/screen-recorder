import Image from "next/image";
import { ChangeEvent } from "react";
import UploadIcon from "../assets/icons/upload.svg";
import CloseIcon from "../assets/icons/close.svg";
import Input from "@/components/ui/Input";

interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  previewUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  type?: "video" | "image";
}

export default function FileInput({
  id,
  label,
  accept,
  file,
  previewUrl,
  inputRef = { current: null },
  onChange,
  onReset,
  type = "image",
}: FileInputProps) {
  return (
    <section className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-gray-500 capitalize">
        {label}
      </label>
      <Input
        type="file"
        id={id}
        accept={accept}
        hidden
        ref={inputRef}
        onChange={onChange}
      />

      {!previewUrl ? (
        <figure
          className="relative flex h-64 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-300 px-3.5 py-1.5"
          onClick={() => inputRef.current?.click()}
        >
          <Image src={UploadIcon} alt="Upload Icon" width={24} height={24} />
          <p className="text-sm text-gray-400">click to upload your {id}</p>
        </figure>
      ) : (
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          {type === "video" ? (
            <video
              src={previewUrl}
              controls
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              className="object-contain"
              src={previewUrl}
              alt={`Selected ${id}`}
              fill
            />
          )}
          <button
            className="bg-gray-100 absolute top-2 right-2 cursor-pointer rounded-full p-2 text-white opacity-90 hover:opacity-100"
            type="button"
            onClick={onReset}
          >
            <Image src={CloseIcon} alt="Close Icon" width={16} height={16} />
          </button>
          <p className="bg-dark-100 absolute right-0 bottom-0 left-0 truncate px-3 py-1 text-sm text-white">
            {file?.name}
          </p>
        </div>
      )}
    </section>
  );
}
