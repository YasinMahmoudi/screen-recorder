import VideoDetailsInfo from "./VideoDetailsInfo";
import VideoPalyer from "./VideoPalyer";

export default function VideoDetailsContent({ videoId , description }: { videoId: string , description?: string}) {
  return (
    <div className="xmd:grid-cols-2 xmd:gap-y-0 grid grid-cols-1 gap-x-8 gap-y-10">
      <VideoPalyer videoId={videoId} />

      <VideoDetailsInfo description={description} />
    </div>
  );
}
