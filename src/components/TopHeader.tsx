"use client"

import Button from "@/components/ui/Button";
import Image from "next/image";
import UploadIcon from "../assets/icons/upload.svg";
import RecordModal from "@/components/RecordModal";

interface TopHeaderProps {
  imageSrc?: string;
  subTitle: string;
  title: string;
}

export default function TopHeader({
  imageSrc,
  subTitle,
  title,
}: TopHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <figure className="flex items-center gap-2.5">
        {imageSrc && (
          <Image
            src="/images/avatar.jpg"
            alt="Avatar"
            width={60}
            height={60}
            className="rounded-full"
          />
        )}

        <div className="space-y-2">
          <span className="text-[10px] font-medium text-gray-400 sm:text-sm">
            {" "}
            {subTitle}{" "}
          </span>
          <h3 className="text-base font-bold text-gray-900 capitalize sm:text-3xl">
            {" "}
            {title}{" "}
          </h3>
        </div>
      </figure>

      <div className="flex gap-2 sm:gap-4">
        <Button
          variant="outline"
          className="h-10 w-10 cursor-pointer rounded-full border-gray-300 hover:border-transparent hover:bg-gray-50 sm:h-auto sm:w-auto"
        >
          <Image src={UploadIcon} alt="Upload Icon" />
          <span className="hidden sm:block">Upload a video</span>
        </Button>

        <RecordModal/>
      </div>
    </div>
  );
}
