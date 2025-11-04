import VideoCard, { type VideoCardProps } from "@/components/VideoCard";
import EmptyState from "./EmptyState";

export default function VideoList({
  videos = [],
}: {
  videos: VideoCardProps[];
}) {
  if (videos.length === 0) return <EmptyState />;

  return (
    <div className="xs:grid-cols-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((item: VideoCardProps) => (
        <VideoCard key={item.video.id} video={item} />
      ))}
    </div>
  );
}
