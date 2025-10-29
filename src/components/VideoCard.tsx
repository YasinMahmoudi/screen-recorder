"use client";

import Image from "next/image";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import EyeIcon from "../assets/icons/eye.svg";

import Link from "next/link";
import React from "react";
import CopyLinkButton from "@/components/CopyLinkButton";

export type VideoCardProps = {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
  views: number;
  duration: number;
};

export default function VideoCard({ video }: { video: VideoCardProps }) {
  return (
    <div className="aspect-video w-full rounded-2xl border border-gray-300 pb-6">
      <div className="relative h-40">
        <Image
          width={100}
          height={100}
          src={video.thumbnail}
          alt={video.title}
          priority
          className="h-full w-full rounded-t-2xl object-cover"
        />

        <span className="absolute right-2.5 bottom-4 rounded-full bg-gray-900 px-2.5 py-1 text-xs font-medium tracking-tighter text-gray-50">
          {" "}
          {video.duration} min{" "}
        </span>

        <VideoCardActions>
          <CopyLinkButton id={video.id} />
        </VideoCardActions>
      </div>

      <div className="flex justify-between px-3 py-4">
        <div className="flex items-center gap-2">
          <Image
            width={30}
            height={30}
            src={video.author.image}
            alt={video.author.name}
            className="h-[34px] w-[34px] rounded-full"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium"> {video.author.name}</span>
              <div className="h-1 w-1 rounded-full bg-gray-500"></div>
              <span className="text-xs text-gray-400"> 2mo</span>
            </div>

            <p className="flex gap-0.5">
              <span className="text-xs text-gray-500"> Not shared</span>
              <Image
                src={ArrowDownIcon}
                alt="Arrow Down"
                width={15}
                height={15}
                className="h-[15px] w-[15px]"
              />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <Image src={EyeIcon} alt="Eye Icon" width={16} height={16} />
          <span className="text-xs text-gray-500">{video.views}</span>
        </div>
      </div>

      <VideoCardTitle video={video} />
    </div>
  );
}

function VideoCardTitle({ video }: { video: VideoCardProps }) {
  const title = `${video.title} ${String.fromCharCode(8212)} ${new Intl.DateTimeFormat(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(new Date(video.createdAt))}
    `;

  return (
    <h1
      className="mr-2 ml-3.5 line-clamp-2 font-semibold tracking-[-0.8px] text-gray-900 hover:text-gray-700"
      title={title}
    >
      <Link href={`/video/${video.id}`}>{title}</Link>
    </h1>
  );
}

function VideoCardActions({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-4 right-2.5">{children}</div>;
}

