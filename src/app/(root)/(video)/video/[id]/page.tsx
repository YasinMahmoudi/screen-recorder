import PageWrapper from "@/components/PageWrapper";
import VideoDetailsHeader from "../_components/VideoDetailsHeader";
import VideoDetailsContent from "../_components/VideoDetailsContent";

export default function Page() {
  return (
    <PageWrapper className="space-y-16">
      <VideoDetailsHeader />

      <VideoDetailsContent />
    </PageWrapper>
  );
}
