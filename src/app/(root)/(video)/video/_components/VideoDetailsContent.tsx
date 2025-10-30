import VideoDetailsInfo from "./VideoDetailsInfo";
import VideoPalyer from "./VideoPalyer";

export default function VideoDetailsContent() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 xmd:grid-cols-2 xmd:gap-y-0">
      <VideoPalyer/>

      <VideoDetailsInfo />
    </div>
  );
}
