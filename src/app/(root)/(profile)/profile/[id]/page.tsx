import Header from "@/components/header";
import PageWrapper from "@/components/PageWrapper";
import TopHeader from "@/components/TopHeader";
import VideoList from "@/components/VideoList";
import { getAllUserVideos } from "@/lib/actions/video";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ params, searchParams }: ProfilePageProps) {
  const { id } = await params;
  const { search, filter } = await searchParams;

  const { user, videos } = await getAllUserVideos(id, search, filter);

  if (!user) return notFound();

  return (
    <PageWrapper>
      <TopHeader
        subTitle={user.email}
        title={user.name}
        imageSrc={user.image ?? ""}
      />

      <Header />

      <VideoList videos={videos} />
    </PageWrapper>
  );
}
