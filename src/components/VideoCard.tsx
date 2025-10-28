"use client";

import Image from "next/image";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import EyeIcon from "../assets/icons/eye.svg";
import LinkIcon from "../assets/icons/link.svg";
import CopyIcon from "../assets/icons/copy.svg";

import Link from "next/link";
import Button from "@/components/ui/Button";
import React, { Activity } from "react";

export interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description?: string;
    thumbnail: string;
    videoUrl?: string;
    createdAt: string;
    author: {
      name: string;
      image: string;
    };
    views: number;
    likes: number;
    comments: number;
    duration: number;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="aspect-square w-2xs rounded-2xl border border-gray-300">
      <div className="relative h-40">
        <Image
          width={100}
          height={100}
          src={video.thumbnail}
          alt={video.title}
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

function VideoCardTitle({ video }: VideoCardProps) {
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

function CopyLinkButton({ id }: { id: string }) {
  const [isCopied, setIsCopied] = React.useState(false);

  function handleCopyLink(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <>
      <Activity mode={isCopied ? "hidden" : "visible"}>
        <Button
          onClick={handleCopyLink}
          className="h-6 w-6 cursor-pointer rounded-full bg-white p-[3px] hover:bg-white/90"
          size="icon"
        >
          <Image src={LinkIcon} alt="Link Icon" width={18} height={18} />
        </Button>
      </Activity>

      <Activity mode={isCopied ? "visible" : "hidden"}>
        <div className="flex h-6 items-center space-x-0.5 rounded-2xl bg-white px-2 py-[3px]">
          <Image
            src={CopyIcon}
            alt="Link Icon"
            width={18}
            height={18}
            className="inline-block"
          />
          <span className="text-xs font-normal tracking-tighter">
            Link copied to clipboard
          </span>
        </div>
      </Activity>
    </>
  );
}
