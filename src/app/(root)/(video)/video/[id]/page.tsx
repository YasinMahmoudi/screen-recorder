import PageWrapper from "@/components/PageWrapper";
import VideoDetailsHeader from "../_components/VideoDetailsHeader";
import VideoDetailsContent from "../_components/VideoDetailsContent";
import { getVideo } from "@/lib/actions/video";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const videoId = (await params).id;

  const videoDetails = await getVideo(videoId);

  return (
    <PageWrapper className="space-y-16">
      <VideoDetailsHeader
        id={videoDetails!.video.id}
        title={videoDetails!.video.title}
        description={videoDetails!.video.description}
        visibility={videoDetails!.video.visibility}
        user={videoDetails!.user}
        createdAt={videoDetails!.video.createdAt}
      />

      <VideoDetailsContent />
    </PageWrapper>
  );
}
