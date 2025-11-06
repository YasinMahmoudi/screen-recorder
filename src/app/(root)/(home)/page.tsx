import Header from "@/components/header";
import TopHeader from "@/components/TopHeader";
import VideoList from "@/components/VideoList";
import Divider from "@/components/ui/Divider";
import Pagination from "@/components/ui/Pagination";
import PageWrapper from "@/components/PageWrapper";
import { getAllVideos } from "@/lib/actions/video";

declare interface SearchParams {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { query, filter, page } = await searchParams;

  const { videos, pagination } = await getAllVideos(
    query,
    filter,
    Number(page) || 1,
    8,
  );

  return (
    <PageWrapper>
      <TopHeader subTitle="Public Assets" title="All Videos" />

      <Header />

      <VideoList videos={videos} />

      {pagination.totalVideos > pagination.pageSize && (
        <>
          <Divider className="mt-8 mb-4 border-gray-200" />
          <div className="flex justify-center p-2">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        </>
      )}
    </PageWrapper>
  );
}
