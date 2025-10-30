import React from "react";
import VideoDetailsInfo from "./VideoDetailsInfo";
import Image from "next/image";

export default function VideoDetailsContent() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 xmd:grid-cols-2 xmd:gap-y-0">
      <div className="w-full aspect-video rounded-xl"> 
      <Image src='/images/thambnail.jpg' width={652} height={360} quality={60} alt="Details Cover" className="w-full h-full rounded-xl object-cover" />  
      </div>

      <VideoDetailsInfo />
    </div>
  );
}
