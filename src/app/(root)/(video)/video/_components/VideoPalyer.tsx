"use client";

import Spinner from "@/components/Spinner";
import { getVideoProcessingStatus } from "@/lib/actions/video";
import { useEffect, useRef, useState } from "react";

const initialVideoState = {
  isLoaded: false,
  isProcessing: true,
};

export default function VideoPalyer({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState(initialVideoState);

  useEffect(() => {
    const checkProcessingStatus = async () => {
      const status = await getVideoProcessingStatus(videoId);

      setState((prev) => ({
        ...prev,
        isProcessing: !status.isProcessed,
      }));

      return status.isProcessed;
    };

    checkProcessingStatus();

    const intervalId = setInterval(async () => {
      const isProcessed = await checkProcessingStatus();
      if (isProcessed) {
        clearInterval(intervalId);
      }
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [videoId]);

  return (
    <div className="aspect-video w-full rounded-xl brightness-50">
      {state.isProcessing ? (
        <div className="flex h-full w-full items-center justify-center rounded-xl">
          <Spinner />
        </div>
      ) : (
        <iframe
          className="z-50 h-full w-full rounded-xl border-0"
          src={`https://iframe.mediadelivery.net/embed/529132/${videoId}`}
          loading="lazy"
          title="Video Player"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          ref={iframeRef}
          onLoad={() => setState((prev) => ({ ...prev, isLoaded: true }))}
        />
      )}
    </div>
  );
}
