import PageWrapper from "@/components/PageWrapper";
import VideoDetailsHeader from "../_components/VideoDetailsHeader";
import VideoDetailsContent from "../_components/VideoDetailsContent";
import { getTranscript, getVideo } from "@/lib/actions/video";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const videoId = (await params).id;

  const videoDetails = await getVideo(videoId);

  if (!videoDetails) {
    return notFound();
  }

  const transcript = await getTranscript(videoId);

  return (
    <PageWrapper className="space-y-16">
      <VideoDetailsHeader
        id={videoDetails!.video.id}
        videoId={videoDetails!.video.videoId}
        thambnail={videoDetails!.video.thumbnailUrl}
        title={videoDetails!.video.title}
        description={videoDetails!.video.description}
        visibility={videoDetails!.video.visibility}
        user={videoDetails!.user}
        createdAt={videoDetails!.video.createdAt}
      />

      <VideoDetailsContent
        videoId={videoDetails!.video.videoId}
        description={videoDetails!.video.description}
        transcript={transcript}
      />
    </PageWrapper>
  );
}
