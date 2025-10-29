import React from "react";
import VideoIcon from "../assets/icons/video.svg";
import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="grid place-items-center gap-2 rounded-2xl border border-gray-200 p-8 sm:p-10 sm:gap-4">
      <figure className="asp flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 p-4 sm:h-20 sm:w-20">
        <Image src={VideoIcon} alt="Video Icon" width={60} height={60} />
      </figure>

      <article className="mt-2.5 sm:mt-5 space-y-1.5 sm:space-y-2.5 text-center">
        <h3 className="text-lg font-semibold sm:text-2xl">
          No Videos Available Yet
        </h3>

        <p className="text-xs font-normal text-gray-400 sm:text-sm">
          Videos will show up here once added.
        </p>
      </article>
    </div>
  );
}
